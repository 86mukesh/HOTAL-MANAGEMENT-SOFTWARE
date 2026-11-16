/**
 * ============================================================================
 * GRAND ROYAL PALACE - CENTRAL DATABASE SERVER & REST API
 * MySQL-backed database server with a JSON-file fallback
 * ============================================================================
 */

require('dotenv').config();

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const crypto = require('crypto');

const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'hotel_database.json');
const MENU_IMAGE_DIR = path.join(__dirname, 'uploads', 'menu-images');
const MAX_MENU_IMAGE_BYTES = 3 * 1024 * 1024;
const COLLECTIONS = ['rooms', 'bookings', 'orders', 'staff', 'partners', 'menu'];
const MYSQL_COLLECTION_TABLES = {
  rooms: 'hotel_rooms',
  bookings: 'hotel_bookings',
  orders: 'hotel_orders',
  staff: 'hotel_staff',
  partners: 'hotel_partners',
  menu: 'hotel_menu'
};
let mysqlPool = null;
let saveQueue = Promise.resolve();

// MIME types for static assets
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Initial Database Template
function getInitialDatabase() {
  return {
    version: '3.0',
    createdAt: new Date().toISOString(),
    lastModified: new Date().toISOString(),
    settings: {
      hotelName: 'Grand Royal Palace Hotel & Resort',
      gstin: '07AAAAA0000A1Z5',
      address: 'Palace Road, Marine Bay Boulevard, Mumbai - 400001',
      phone: '+91 22 8899 7700',
      email: 'concierge@grandroyalpalace.com'
    },
    rooms: [],
    bookings: [],
    orders: [],
    staff: [],
    partners: [],
    menu: []
  };
}

// Load or Initialize JSON fallback database
function loadDatabase() {
  if (!fs.existsSync(DB_FILE)) {
    console.log('[Database] hotel_database.json not found. Initializing new database file...');
    const initialDb = getInitialDatabase();
    fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), 'utf8');
    return initialDb;
  }
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('[Database Error] Failed to read database, creating fresh backup:', err);
    const backupDb = getInitialDatabase();
    fs.writeFileSync(DB_FILE, JSON.stringify(backupDb, null, 2), 'utf8');
    return backupDb;
  }
}

function hasStoredRecords(data) {
  return COLLECTIONS.some(collection => Array.isArray(data[collection]) && data[collection].length > 0);
}

async function initializeMySql() {
  if (!process.env.MYSQL_HOST) return null;
  if (!process.env.MYSQL_DATABASE || !process.env.MYSQL_USER) {
    throw new Error('MYSQL_DATABASE and MYSQL_USER are required when MYSQL_HOST is set.');
  }

  const mysql = require('mysql2/promise');
  mysqlPool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    charset: 'utf8mb4'
  });

  for (const table of Object.values(MYSQL_COLLECTION_TABLES)) {
    await mysqlPool.query(
      `CREATE TABLE IF NOT EXISTS \`${table}\` (
        record_key VARCHAR(191) NOT NULL PRIMARY KEY,
        payload JSON NOT NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`
    );
  }
  await mysqlPool.query(
    `CREATE TABLE IF NOT EXISTS hotel_settings (
      setting_key VARCHAR(64) NOT NULL PRIMARY KEY,
      payload JSON NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`
  );
  await mysqlPool.query(
    `CREATE TABLE IF NOT EXISTS hotel_metadata (
      metadata_key VARCHAR(64) NOT NULL PRIMARY KEY,
      metadata_value VARCHAR(255) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`
  );

  const loaded = getInitialDatabase();
  for (const [collection, table] of Object.entries(MYSQL_COLLECTION_TABLES)) {
    const [rows] = await mysqlPool.query(`SELECT payload FROM \`${table}\``);
    loaded[collection] = rows.map(row => typeof row.payload === 'string' ? JSON.parse(row.payload) : row.payload);
  }
  const [settingsRows] = await mysqlPool.query(
    'SELECT payload FROM hotel_settings WHERE setting_key = ?',
    ['hotelConfig']
  );
  if (settingsRows.length) {
    const value = settingsRows[0].payload;
    loaded.settings = typeof value === 'string' ? JSON.parse(value) : value;
  }
  const [metadataRows] = await mysqlPool.query(
    'SELECT metadata_value FROM hotel_metadata WHERE metadata_key = ?',
    ['lastModified']
  );
  if (metadataRows.length) loaded.lastModified = metadataRows[0].metadata_value;

  if (!hasStoredRecords(loaded)) {
    if (fs.existsSync(DB_FILE)) {
      const legacyData = loadDatabase();
      if (hasStoredRecords(legacyData)) {
        Object.assign(loaded, legacyData);
        console.log('[Database] Importing existing JSON data into MySQL.');
        await saveDatabase(loaded);
      }
    }
  }

  console.log(`[Database] Connected to MySQL database "${process.env.MYSQL_DATABASE}".`);
  return loaded;
}

async function persistMySql(data) {
  const connection = await mysqlPool.getConnection();
  try {
    await connection.beginTransaction();
    for (const [collection, table] of Object.entries(MYSQL_COLLECTION_TABLES)) {
      await connection.query(`DELETE FROM \`${table}\``);
      const records = data[collection] || [];
      if (records.length) {
        const values = records.map(record => [
          String(collection === 'rooms' ? record.room_no : record.id),
          JSON.stringify(record)
        ]);
        await connection.query(
          `INSERT INTO \`${table}\` (record_key, payload) VALUES ?`,
          [values]
        );
      }
    }
    await connection.query(
      'INSERT INTO hotel_settings (setting_key, payload) VALUES (?, ?) ON DUPLICATE KEY UPDATE payload = VALUES(payload)',
      ['hotelConfig', JSON.stringify(data.settings || {})]
    );
    await connection.query(
      'INSERT INTO hotel_metadata (metadata_key, metadata_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE metadata_value = VALUES(metadata_value)',
      ['lastModified', data.lastModified]
    );
    await connection.commit();
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
}

// Persist each complete snapshot atomically to the configured storage engine.
function saveDatabase(data) {
  data.lastModified = new Date().toISOString();
  const snapshot = JSON.parse(JSON.stringify(data));
  const persist = async () => {
    if (mysqlPool) {
      await persistMySql(snapshot);
    } else {
      fs.writeFileSync(DB_FILE, JSON.stringify(snapshot, null, 2), 'utf8');
    }
    console.log(`[Database] Changes saved at ${snapshot.lastModified}`);
  };
  saveQueue = saveQueue.catch(() => {}).then(persist);
  return saveQueue;
}

// In-Memory DB Cache
let database = getInitialDatabase();
const databaseReady = initializeMySql().then(mysqlDatabase => {
  database = mysqlDatabase || loadDatabase();
});

// Parse Request Body Helper
function parseBody(req, maxBytes = 10 * 1024 * 1024) {
  return new Promise((resolve, reject) => {
    let body = '';
    let bytes = 0;
    let tooLarge = false;
    req.on('data', chunk => {
      bytes += chunk.length;
      if (bytes > maxBytes) {
        tooLarge = true;
        return;
      }
      body += chunk.toString();
    });
    req.on('end', () => {
      if (tooLarge) {
        const error = new Error('Request body is too large');
        error.statusCode = 413;
        return reject(error);
      }
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

// Send JSON Response Helper
function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

// Create HTTP Server
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Handle CORS Pre-flight
  if (method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  // ================= REST API ROUTES =================
  if (pathname.startsWith('/api/')) {
    try {
      // 1. Health & Server Info
      if (pathname === '/api/status' && method === 'GET') {
        await databaseReady;
        const stats = mysqlPool ? null : fs.statSync(DB_FILE);
        return sendJson(res, 200, {
          status: 'online',
          databaseEngine: mysqlPool ? 'MySQL Database (Transactional Persistence)' : 'JSON File Database (Disk Persistence)',
          databaseFile: mysqlPool ? null : DB_FILE,
          databaseName: mysqlPool ? process.env.MYSQL_DATABASE : null,
          sizeBytes: stats ? stats.size : null,
          lastModified: database.lastModified,
          tables: {
            rooms: (database.rooms || []).length,
            bookings: (database.bookings || []).length,
            orders: (database.orders || []).length,
            staff: (database.staff || []).length,
            partners: (database.partners || []).length,
            menu: (database.menu || []).length
          }
        });
      }

      // 2. Full Database Sync (GET all / POST all)
      if (pathname === '/api/data' && method === 'GET') {
        await databaseReady;
        return sendJson(res, 200, database);
      }

      if (pathname === '/api/data' && method === 'POST') {
        await databaseReady;
        const payload = await parseBody(req);
        if (payload && (payload.rooms || payload.bookings)) {
          database = Object.assign(database, payload);
          await saveDatabase(database);
          return sendJson(res, 200, { success: true, message: 'Database successfully synced & persisted to disk!' });
        }
        return sendJson(res, 400, { error: 'Invalid payload structure' });
      }

      // 3. Rooms
      if (pathname === '/api/rooms' && method === 'GET') {
        await databaseReady;
        return sendJson(res, 200, database.rooms || []);
      }
      if (pathname === '/api/rooms' && method === 'PUT') {
        const updatedRooms = await parseBody(req);
        if (Array.isArray(updatedRooms)) {
          await databaseReady;
          database.rooms = updatedRooms;
          await saveDatabase(database);
          return sendJson(res, 200, { success: true, count: updatedRooms.length });
        }
        return sendJson(res, 400, { error: 'Expected array of rooms' });
      }

      // 4. Bookings
      if (pathname === '/api/bookings' && method === 'GET') {
        await databaseReady;
        return sendJson(res, 200, database.bookings || []);
      }
      if (pathname === '/api/bookings' && method === 'POST') {
        await databaseReady;
        const newBooking = await parseBody(req);
        if (!database.bookings) database.bookings = [];
        database.bookings.unshift(newBooking);
        await saveDatabase(database);
        return sendJson(res, 201, { success: true, booking: newBooking });
      }

      // 5. Dining Orders
      if (pathname === '/api/orders' && method === 'GET') {
        await databaseReady;
        return sendJson(res, 200, database.orders || []);
      }
      if (pathname === '/api/orders' && method === 'POST') {
        await databaseReady;
        const newOrder = await parseBody(req);
        if (!database.orders) database.orders = [];
        database.orders.unshift(newOrder);
        await saveDatabase(database);
        return sendJson(res, 201, { success: true, order: newOrder });
      }

      // 6. Staff
      if (pathname === '/api/staff' && method === 'GET') {
        await databaseReady;
        return sendJson(res, 200, database.staff || []);
      }
      if (pathname === '/api/staff' && method === 'PUT') {
        await databaseReady;
        const staffList = await parseBody(req);
        if (!Array.isArray(staffList)) return sendJson(res, 400, { error: 'Expected array of staff' });
        database.staff = staffList;
        await saveDatabase(database);
        return sendJson(res, 200, { success: true });
      }

      // 7. Partners
      if (pathname === '/api/partners' && method === 'GET') {
        await databaseReady;
        return sendJson(res, 200, database.partners || []);
      }
      if (pathname === '/api/partners' && method === 'PUT') {
        await databaseReady;
        const partnersList = await parseBody(req);
        if (!Array.isArray(partnersList)) return sendJson(res, 400, { error: 'Expected array of partners' });
        database.partners = partnersList;
        await saveDatabase(database);
        return sendJson(res, 200, { success: true });
      }

      // 8. Menu
      if (pathname === '/api/menu' && method === 'GET') {
        await databaseReady;
        return sendJson(res, 200, database.menu || []);
      }
      if (pathname === '/api/menu' && method === 'PUT') {
        await databaseReady;
        const menuList = await parseBody(req);
        if (!Array.isArray(menuList)) return sendJson(res, 400, { error: 'Expected array of menu items' });
        database.menu = menuList;
        await saveDatabase(database);
        return sendJson(res, 200, { success: true });
      }

      if (pathname === '/api/menu-image' && method === 'POST') {
        const payload = await parseBody(req, Math.ceil(MAX_MENU_IMAGE_BYTES * 4 / 3) + 1024);
        const match = typeof payload.image === 'string'
          ? payload.image.match(/^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+/]+={0,2})$/)
          : null;
        if (!match) return sendJson(res, 400, { error: 'Expected a JPEG, PNG, or WebP image as a base64 data URL' });

        const imageBuffer = Buffer.from(match[2], 'base64');
        if (imageBuffer.length === 0 || imageBuffer.length > MAX_MENU_IMAGE_BYTES) {
          return sendJson(res, 413, { error: 'Menu images must be smaller than 3 MB' });
        }

        const isJpeg = match[1] === 'jpeg' && imageBuffer[0] === 0xff && imageBuffer[1] === 0xd8;
        const isPng = match[1] === 'png' && imageBuffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
        const isWebp = match[1] === 'webp' && imageBuffer.toString('ascii', 0, 4) === 'RIFF' &&
          imageBuffer.toString('ascii', 8, 12) === 'WEBP';
        if (!isJpeg && !isPng && !isWebp) {
          return sendJson(res, 400, { error: 'Image data does not match the declared format' });
        }

        const extension = match[1] === 'jpeg' ? 'jpg' : match[1];
        const fileName = `${crypto.randomUUID()}.${extension}`;
        await fs.promises.mkdir(MENU_IMAGE_DIR, { recursive: true });
        await fs.promises.writeFile(path.join(MENU_IMAGE_DIR, fileName), imageBuffer, { flag: 'wx' });
        return sendJson(res, 201, { success: true, imageUrl: `/uploads/menu-images/${fileName}` });
      }

      // 9. Reset Database Endpoint
      if (pathname === '/api/reset' && method === 'POST') {
        await databaseReady;
        database = getInitialDatabase();
        await saveDatabase(database);
        return sendJson(res, 200, { success: true, message: 'Database reset to default template.' });
      }

      return sendJson(res, 404, { error: 'API route not found' });
    } catch (err) {
      console.error('[API Server Error]', err);
      return sendJson(res, err.statusCode || 500, { error: err.message || 'Internal Server Error' });
    }
  }

  // ================= STATIC FILE SERVING =================
  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);
  const ext = path.extname(filePath).toLowerCase();

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
      return res.end('404 Not Found: ' + pathname);
    }

    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  });
});

// Start Server
databaseReady.then(() => server.listen(PORT, () => {
  console.log('================================================================');
  console.log(`👑 GRAND ROYAL PALACE - HOTEL MANAGEMENT DATABASE SERVER`);
  console.log(`📡 Server running at: http://localhost:${PORT}`);
  console.log(mysqlPool
    ? `🗄️ MySQL database: ${process.env.MYSQL_DATABASE}`
    : `🗄️ Database storage file: ${DB_FILE}`);
  console.log(`🌐 Open http://localhost:${PORT} in your web browser`);
  console.log('================================================================');
})).catch(err => {
  console.error('[Database Error] Failed to initialize configured database:', err);
  process.exitCode = 1;
});
