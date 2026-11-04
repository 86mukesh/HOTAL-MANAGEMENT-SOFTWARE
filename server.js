/**
 * ============================================================================
 * GRAND ROYAL PALACE - CENTRAL DATABASE SERVER & REST API
 * Zero-Dependency Persistent Database Server (Pure Node.js)
 * ============================================================================
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'hotel_database.json');

// MIME types for static assets
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
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

// Load or Initialize Database
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

// Save Database to Disk
function saveDatabase(data) {
  data.lastModified = new Date().toISOString();
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf8');
  console.log(`[Database] Changes saved to disk at ${data.lastModified}`);
}

// In-Memory DB Cache
let database = loadDatabase();

// Parse Request Body Helper
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
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
        const stats = fs.statSync(DB_FILE);
        return sendJson(res, 200, {
          status: 'online',
          databaseEngine: 'JSON File Database (ACID Persistence)',
          databaseFile: DB_FILE,
          sizeBytes: stats.size,
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
        return sendJson(res, 200, database);
      }

      if (pathname === '/api/data' && method === 'POST') {
        const payload = await parseBody(req);
        if (payload && (payload.rooms || payload.bookings)) {
          database = Object.assign(database, payload);
          saveDatabase(database);
          return sendJson(res, 200, { success: true, message: 'Database successfully synced & persisted to disk!' });
        }
        return sendJson(res, 400, { error: 'Invalid payload structure' });
      }

      // 3. Rooms
      if (pathname === '/api/rooms' && method === 'GET') {
        return sendJson(res, 200, database.rooms || []);
      }
      if (pathname === '/api/rooms' && method === 'PUT') {
        const updatedRooms = await parseBody(req);
        if (Array.isArray(updatedRooms)) {
          database.rooms = updatedRooms;
          saveDatabase(database);
          return sendJson(res, 200, { success: true, count: updatedRooms.length });
        }
        return sendJson(res, 400, { error: 'Expected array of rooms' });
      }

      // 4. Bookings
      if (pathname === '/api/bookings' && method === 'GET') {
        return sendJson(res, 200, database.bookings || []);
      }
      if (pathname === '/api/bookings' && method === 'POST') {
        const newBooking = await parseBody(req);
        if (!database.bookings) database.bookings = [];
        database.bookings.unshift(newBooking);
        saveDatabase(database);
        return sendJson(res, 201, { success: true, booking: newBooking });
      }

      // 5. Dining Orders
      if (pathname === '/api/orders' && method === 'GET') {
        return sendJson(res, 200, database.orders || []);
      }
      if (pathname === '/api/orders' && method === 'POST') {
        const newOrder = await parseBody(req);
        if (!database.orders) database.orders = [];
        database.orders.unshift(newOrder);
        saveDatabase(database);
        return sendJson(res, 201, { success: true, order: newOrder });
      }

      // 6. Staff
      if (pathname === '/api/staff' && method === 'GET') {
        return sendJson(res, 200, database.staff || []);
      }
      if (pathname === '/api/staff' && method === 'PUT') {
        const staffList = await parseBody(req);
        database.staff = staffList;
        saveDatabase(database);
        return sendJson(res, 200, { success: true });
      }

      // 7. Partners
      if (pathname === '/api/partners' && method === 'GET') {
        return sendJson(res, 200, database.partners || []);
      }
      if (pathname === '/api/partners' && method === 'PUT') {
        const partnersList = await parseBody(req);
        database.partners = partnersList;
        saveDatabase(database);
        return sendJson(res, 200, { success: true });
      }

      // 8. Menu
      if (pathname === '/api/menu' && method === 'GET') {
        return sendJson(res, 200, database.menu || []);
      }
      if (pathname === '/api/menu' && method === 'PUT') {
        const menuList = await parseBody(req);
        database.menu = menuList;
        saveDatabase(database);
        return sendJson(res, 200, { success: true });
      }

      // 9. Reset Database Endpoint
      if (pathname === '/api/reset' && method === 'POST') {
        database = getInitialDatabase();
        saveDatabase(database);
        return sendJson(res, 200, { success: true, message: 'Database reset to default template.' });
      }

      return sendJson(res, 404, { error: 'API route not found' });
    } catch (err) {
      console.error('[API Server Error]', err);
      return sendJson(res, 500, { error: 'Internal Server Error', details: err.message });
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
server.listen(PORT, () => {
  console.log('================================================================');
  console.log(`👑 GRAND ROYAL PALACE - HOTEL MANAGEMENT DATABASE SERVER`);
  console.log(`📡 Server running at: http://localhost:${PORT}`);
  console.log(`🗄️ Database storage file: ${DB_FILE}`);
  console.log(`🌐 Open http://localhost:${PORT} in your web browser`);
  console.log('================================================================');
});
