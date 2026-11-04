/**
 * ============================================================================
 * GRAND ROYAL PALACE - LUXURY 5-STAR HOTEL MANAGEMENT SYSTEM (PMS)
 * Comprehensive Property Management System & POS Engine
 * ============================================================================
 */

// Storage keys
const STORAGE_KEY_ROOMS = 'grp_pms_rooms_v3';
const STORAGE_KEY_BOOKINGS = 'grp_pms_bookings_v3';
const STORAGE_KEY_ORDERS = 'grp_pms_orders_v3';
const STORAGE_KEY_STAFF = 'grp_pms_staff_v3';
const STORAGE_KEY_SETTINGS = 'grp_pms_settings_v3';
const STORAGE_KEY_MENU = 'grp_pms_menu_v3';
const STORAGE_KEY_PARTNERS = 'grp_pms_partners_v3';

// Curated high-resolution Unsplash interior photos
const ROOM_ASSETS = {
  Deluxe: {
    price: 4500,
    size: '380 sq.ft.',
    bed: 'King Size Plush Bed',
    photos: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=900&auto=format&fit=crop&q=80'
    ],
    features: ['City Skyline View', 'High-speed Wi-Fi 6', '4K Smart TV', 'Italian Marble Bath', 'Rain Shower', 'Espresso Bar']
  },
  'Executive Suite': {
    price: 9500,
    size: '620 sq.ft.',
    bed: 'Imperial California Bed',
    photos: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=900&auto=format&fit=crop&q=80'
    ],
    features: ['Ocean Sunset Balcony', 'Separate Living Lounge', 'Luxury Mini-Bar', 'Deep Soaking Tub', 'Executive Workstation', 'Butler Service']
  },
  'Presidential Suite': {
    price: 18000,
    size: '1,150 sq.ft.',
    bed: 'Royal Emperor Bed',
    photos: [
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&auto=format&fit=crop&q=80'
    ],
    features: ['Panoramic Penthouse Views', 'Private Jacuzzi & Spa', 'Dining Room for 8', 'Walk-in Dressing Suite', '24/7 Dedicated Butler', 'Limousine Airport Transfer']
  }
};

// Dining & Room Service Menu
const RESTAURANT_MENU = [
  { id: 1, name: 'Truffle Paneer Tikka', category: 'Starters', price: 420, desc: 'Cottage cheese marinated with black truffle glaze & mint relish' },
  { id: 2, name: 'Royal Galouti Kebab', category: 'Starters', price: 580, desc: 'Melt-in-mouth lamb kebabs served on saffron sheermal' },
  { id: 3, name: 'Crispy Calamari Peri-Peri', category: 'Starters', price: 620, desc: 'Golden batter calamari rings with lemon garlic aioli' },
  { id: 4, name: 'Caesar Salad with Smoked Herb', category: 'Starters', price: 390, desc: 'Crisp romaine, parmesan shavings, garlic croutons' },
  
  { id: 5, name: 'Dum Pukht Awadhi Biryani', category: 'Main Course', price: 650, desc: 'Fragrant basmati rice slow-cooked with spiced meat & saffron' },
  { id: 6, name: 'Paneer Makhani Grand Cru', category: 'Main Course', price: 520, desc: 'Slow simmered rich buttery tomato cream gravy with fresh herbs' },
  { id: 7, name: 'Murgh Lababdar', category: 'Main Course', price: 640, desc: 'Charcoal chicken tikka in spiced tomato and onion cashew gravy' },
  { id: 8, name: 'Dal Bukhara Special', category: 'Main Course', price: 460, desc: 'Overnight charcoal simmered black lentils finished with cream' },
  { id: 9, name: 'Wild Mushroom Risotto', category: 'Main Course', price: 680, desc: 'Arborio rice, porcini mushrooms, white wine & parmesan' },
  { id: 10, name: 'Pan-Seared Atlantic Salmon', category: 'Main Course', price: 1150, desc: 'Asparagus spear, mashed potato, lemon dill velouté' },

  { id: 11, name: 'Saffron Shahi Tukda & Rabdi', category: 'Desserts', price: 320, desc: 'Crisp brioche drenched in saffron cardamon reduced milk' },
  { id: 12, name: 'Belgian Dark Chocolate Mousse', category: 'Desserts', price: 380, desc: '70% Valrhona dark chocolate with gold leaf garnish' },
  { id: 13, name: 'New York Cheesecake', category: 'Desserts', price: 360, desc: 'Baked cream cheese with raspberry compote' },

  { id: 14, name: 'Imperial Masala Chai', category: 'Beverages', price: 180, desc: 'Organic Assam leaf tea brewed with fresh spices and milk' },
  { id: 15, name: 'Single Origin Espresso', category: 'Beverages', price: 220, desc: 'Artisanal roast Arabica double shot' },
  { id: 16, name: 'Fresh Mint Lime Soda', category: 'Beverages', price: 200, desc: 'Sweet & salted sparkling cooler with garden mint' },
  { id: 17, name: 'Royal Passion Fruit Mojito', category: 'Beverages', price: 340, desc: 'Crushed mint, passion fruit pulp, crushed ice & fizz' }
];

// Initial Staff Seed
const DEFAULT_STAFF = [
  { id: 101, name: 'Vikram Rajput', gender: 'Male', role: 'General Manager', join: '2021-03-15', timing: 'General: 9 AM - 6 PM', salary: 85000, status: 'Paid' },
  { id: 102, name: 'Ananya Deshmukh', gender: 'Female', role: 'Front Desk Manager', join: '2022-06-01', timing: 'Morning: 7 AM - 3 PM', salary: 42000, status: 'Paid' },
  { id: 103, name: 'Sunita Devi', gender: 'Female', role: 'Housekeeping Supervisor', join: '2022-10-12', timing: 'Morning: 7 AM - 3 PM', salary: 28000, status: 'Paid' },
  { id: 104, name: 'Chef Sanjeev Anand', gender: 'Male', role: 'Executive Chef', join: '2021-08-20', timing: 'General: 9 AM - 6 PM', salary: 75000, status: 'Paid' },
  { id: 105, name: 'Ramesh Kumar', gender: 'Male', role: 'Chief Security Officer', join: '2022-01-10', timing: 'Night: 11 PM - 7 AM', salary: 32000, status: 'Pending' },
  { id: 106, name: 'Pooja Verma', gender: 'Female', role: 'Receptionist', join: '2023-04-18', timing: 'Evening: 3 PM - 11 PM', salary: 30000, status: 'Paid' },
  { id: 107, name: 'Mahesh Patil', gender: 'Male', role: 'Housekeeping Staff', join: '2023-07-05', timing: 'Morning: 7 AM - 3 PM', salary: 18000, status: 'Pending' }
];

// Initial Hotel Partners / Owners Seed
const DEFAULT_PARTNERS = [
  { id: 1, name: 'Rajesh Singhania', role: 'Managing Partner', share: 50, investment: 5000000, phone: '+91 98200 11223', email: 'rajesh.singhania@grandroyal.com', joinDate: '2020-01-15', notes: 'Founder & Managing Director' },
  { id: 2, name: 'Vikramaditya Oberoi', role: 'Executive Director', share: 30, investment: 3000000, phone: '+91 98200 44556', email: 'vikram.oberoi@grandroyal.com', joinDate: '2021-06-01', notes: 'Operations & Strategy Head' },
  { id: 3, name: 'Sanjay Malhotra', role: 'Investor Partner', share: 20, investment: 2000000, phone: '+91 98200 77889', email: 'sanjay.malhotra@grandroyal.com', joinDate: '2022-03-10', notes: 'Capital Investment Partner' }
];

// Initial Rooms Generator (45 Luxury Rooms across 3 floors)
function generateInitialRooms() {
  const rooms = [];
  
  // Floor 1: Deluxe 101 - 115
  for (let i = 1; i <= 15; i++) {
    const no = 100 + i;
    rooms.push({
      room_no: no,
      floor: 1,
      type: 'Deluxe',
      price: ROOM_ASSETS['Deluxe'].price,
      size: ROOM_ASSETS['Deluxe'].size,
      bed: ROOM_ASSETS['Deluxe'].bed,
      photos: ROOM_ASSETS['Deluxe'].photos,
      features: ROOM_ASSETS['Deluxe'].features,
      status: i === 1 ? 'Occupied' : i === 2 ? 'Cleaning' : i === 5 ? 'Occupied' : 'Available',
      currentGuest: i === 1 ? 'Rajesh Mehra' : i === 5 ? 'Aarav Singhania' : null,
      bookingId: i === 1 ? 'BK-1001' : i === 5 ? 'BK-1002' : null
    });
  }

  // Floor 2: Executive Suite 201 - 215
  for (let i = 1; i <= 15; i++) {
    const no = 200 + i;
    rooms.push({
      room_no: no,
      floor: 2,
      type: 'Executive Suite',
      price: ROOM_ASSETS['Executive Suite'].price,
      size: ROOM_ASSETS['Executive Suite'].size,
      bed: ROOM_ASSETS['Executive Suite'].bed,
      photos: ROOM_ASSETS['Executive Suite'].photos,
      features: ROOM_ASSETS['Executive Suite'].features,
      status: i === 3 ? 'Occupied' : i === 7 ? 'Cleaning' : i === 12 ? 'Occupied' : 'Available',
      currentGuest: i === 3 ? 'Kavita Nair' : i === 12 ? 'Dr. Rohan Merchant' : null,
      bookingId: i === 3 ? 'BK-1003' : i === 12 ? 'BK-1004' : null
    });
  }

  // Floor 3: Presidential Suite 301 - 315
  for (let i = 1; i <= 15; i++) {
    const no = 300 + i;
    rooms.push({
      room_no: no,
      floor: 3,
      type: 'Presidential Suite',
      price: ROOM_ASSETS['Presidential Suite'].price,
      size: ROOM_ASSETS['Presidential Suite'].size,
      bed: ROOM_ASSETS['Presidential Suite'].bed,
      photos: ROOM_ASSETS['Presidential Suite'].photos,
      features: ROOM_ASSETS['Presidential Suite'].features,
      status: i === 1 ? 'Occupied' : i === 15 ? 'Maintenance' : 'Available',
      currentGuest: i === 1 ? 'Prince Al-Hussaini' : null,
      bookingId: i === 1 ? 'BK-1005' : null
    });
  }

  return rooms;
}

// Initial Sample Bookings
function generateInitialBookings() {
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0];
  const nextWeek = new Date(Date.now() + 86400000 * 4).toISOString().split('T')[0];

  return [
    {
      id: 'BK-1001',
      guest: 'Rajesh Mehra',
      phone: '+91 98201 44556',
      email: 'rajesh.mehra@corporation.com',
      room: 101,
      type: 'Deluxe',
      checkIn: today,
      checkOut: tomorrow,
      nights: 2,
      rate: 4500,
      roomAmount: 9000,
      diningAmount: 1170,
      idProof: 'Aadhaar Card',
      guestsCount: 2,
      status: 'Checked-In'
    },
    {
      id: 'BK-1002',
      guest: 'Aarav Singhania',
      phone: '+91 99887 11223',
      email: 'aarav.singhania@fintech.io',
      room: 105,
      type: 'Deluxe',
      checkIn: today,
      checkOut: tomorrow,
      nights: 1,
      rate: 4500,
      roomAmount: 4500,
      diningAmount: 520,
      idProof: 'Passport',
      guestsCount: 1,
      status: 'Checked-In'
    },
    {
      id: 'BK-1003',
      guest: 'Kavita Nair',
      phone: '+91 97123 45678',
      email: 'kavita.nair@voyages.org',
      room: 203,
      type: 'Executive Suite',
      checkIn: today,
      checkOut: nextWeek,
      nights: 4,
      rate: 9500,
      roomAmount: 38000,
      diningAmount: 1840,
      idProof: 'Driving License',
      guestsCount: 2,
      status: 'Checked-In'
    },
    {
      id: 'BK-1004',
      guest: 'Dr. Rohan Merchant',
      phone: '+91 98450 78901',
      email: 'rohan.merchant@medcare.org',
      room: 212,
      type: 'Executive Suite',
      checkIn: today,
      checkOut: tomorrow,
      nights: 2,
      rate: 9500,
      roomAmount: 19000,
      diningAmount: 0,
      idProof: 'Aadhaar Card',
      guestsCount: 2,
      status: 'Checked-In'
    },
    {
      id: 'BK-1005',
      guest: 'Prince Al-Hussaini',
      phone: '+971 50 1234567',
      email: 'delegation@royalholding.ae',
      room: 301,
      type: 'Presidential Suite',
      checkIn: today,
      checkOut: nextWeek,
      nights: 5,
      rate: 18000,
      roomAmount: 90000,
      diningAmount: 4200,
      idProof: 'Diplomatic Passport',
      guestsCount: 3,
      status: 'Checked-In'
    }
  ];
}

// Initial Sample Orders
function generateInitialOrders() {
  const today = new Date().toISOString().split('T')[0];
  return [
    {
      id: 'ORD-501',
      room: 101,
      items: [{ name: 'Dum Pukht Awadhi Biryani', qty: 1, price: 650 }, { name: 'Paneer Makhani Grand Cru', qty: 1, price: 520 }],
      total: 1170,
      date: today,
      time: '19:42',
      billedToRoom: true
    },
    {
      id: 'ORD-502',
      room: 105,
      items: [{ name: 'Paneer Makhani Grand Cru', qty: 1, price: 520 }],
      total: 520,
      date: today,
      time: '20:10',
      billedToRoom: true
    },
    {
      id: 'ORD-503',
      room: 203,
      items: [{ name: 'Royal Galouti Kebab', qty: 2, price: 1160 }, { name: 'Wild Mushroom Risotto', qty: 1, price: 680 }],
      total: 1840,
      date: today,
      time: '20:30',
      billedToRoom: true
    },
    {
      id: 'ORD-504',
      room: 301,
      items: [{ name: 'Pan-Seared Atlantic Salmon', qty: 2, price: 2300 }, { name: 'Belgian Dark Chocolate Mousse', qty: 5, price: 1900 }],
      total: 4200,
      date: today,
      time: '20:55',
      billedToRoom: true
    }
  ];
}

// Default Hotel Settings
const DEFAULT_SETTINGS = {
  hotelName: 'Grand Royal Palace Hotel & Resort',
  gstin: '07AAAAA0000A1Z5',
  address: 'Palace Road, Marine Bay Boulevard, Mumbai - 400001',
  phone: '+91 22 8899 7700',
  email: 'concierge@grandroyalpalace.com'
};

/* ============================================================================
   STATE CONTAINER
   ============================================================================ */
let state = {
  rooms: [],
  bookings: [],
  orders: [],
  staff: [],
  partners: [],
  menu: [],
  settings: DEFAULT_SETTINGS,
  posCart: [],
  activeModalRoom: null,
  editingPriceRoomNo: null,
  selectedIncomeDate: new Date().toISOString().split('T')[0],
  activeFilterCatalogType: 'All',
  activeFilterCatalogStatus: 'All',
  activeDashStatusFilter: 'ALL',
  activeMenuCat: 'All',
  dashSearchQuery: '',
  bookingSearchQuery: ''
};

// Initialize State from LocalStorage
function initState() {
  try {
    const r = localStorage.getItem(STORAGE_KEY_ROOMS);
    state.rooms = r ? JSON.parse(r) : generateInitialRooms();

    const b = localStorage.getItem(STORAGE_KEY_BOOKINGS);
    state.bookings = b ? JSON.parse(b) : generateInitialBookings();

    const o = localStorage.getItem(STORAGE_KEY_ORDERS);
    state.orders = o ? JSON.parse(o) : generateInitialOrders();

    const s = localStorage.getItem(STORAGE_KEY_STAFF);
    state.staff = s ? JSON.parse(s) : DEFAULT_STAFF;

    const p = localStorage.getItem(STORAGE_KEY_PARTNERS);
    state.partners = p ? JSON.parse(p) : DEFAULT_PARTNERS;

    const m = localStorage.getItem(STORAGE_KEY_MENU);
    state.menu = m ? JSON.parse(m) : RESTAURANT_MENU;

    const cfg = localStorage.getItem(STORAGE_KEY_SETTINGS);
    state.settings = cfg ? JSON.parse(cfg) : DEFAULT_SETTINGS;
  } catch (err) {
    console.error('Error reading localStorage, resetting to defaults:', err);
    state.rooms = generateInitialRooms();
    state.bookings = generateInitialBookings();
    state.orders = generateInitialOrders();
    state.staff = DEFAULT_STAFF;
    state.partners = DEFAULT_PARTNERS;
    state.menu = RESTAURANT_MENU;
    state.settings = DEFAULT_SETTINGS;
  }

  saveAllState();
}

function saveAllState() {
  localStorage.setItem(STORAGE_KEY_ROOMS, JSON.stringify(state.rooms));
  localStorage.setItem(STORAGE_KEY_BOOKINGS, JSON.stringify(state.bookings));
  localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(state.orders));
  localStorage.setItem(STORAGE_KEY_STAFF, JSON.stringify(state.staff));
  localStorage.setItem(STORAGE_KEY_PARTNERS, JSON.stringify(state.partners));
  localStorage.setItem(STORAGE_KEY_MENU, JSON.stringify(state.menu));
  localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(state.settings));

  // Sync to browser IndexedDB
  saveToIndexedDB();

  // If central server is connected, background sync to disk database
  if (state.serverConnected) {
    const payload = {
      rooms: state.rooms,
      bookings: state.bookings,
      orders: state.orders,
      staff: state.staff,
      partners: state.partners,
      menu: state.menu,
      settings: state.settings
    };
    fetch(`${state.serverUrl || ''}/api/data`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(err => console.warn('[Background Server Sync Warning]', err));
  }

  updateDatabaseConsole();
}

/* ============================================================================
   TAB NAVIGATION
   ============================================================================ */
function switchTab(tabId, el) {
  // Hide all sections
  document.querySelectorAll('.tab-content').forEach(section => {
    section.classList.add('hidden');
  });

  const target = document.getElementById(tabId);
  if (target) {
    target.classList.remove('hidden');
  }

  // Update desktop nav
  document.querySelectorAll('.nav-desktop .nav-item').forEach(item => {
    item.classList.remove('active');
  });
  const desktopItem = document.querySelector(`.nav-desktop .nav-item[onclick*="${tabId}"]`);
  if (desktopItem) {
    desktopItem.classList.add('active');
  }

  // Update mobile bottom nav
  document.querySelectorAll('.bottom-nav .b-item').forEach(item => {
    item.classList.remove('active');
  });
  if (el && el.classList.contains('b-item')) {
    el.classList.add('active');
  } else {
    const bottomItem = document.querySelector(`.bottom-nav .b-item[onclick*="${tabId}"]`);
    if (bottomItem) {
      bottomItem.classList.add('active');
    }
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Re-render components that might have changed
  renderDashboard();
  renderCatalog();
  renderRestaurantPOS();
  renderStaff();
  renderBookings();
  renderPartners();
}

/* ============================================================================
   CLOCK & HEADER UTILITY
   ============================================================================ */
function startLiveClock() {
  const clockEl = document.getElementById('clockDisplay');
  function tick() {
    const now = new Date();
    if (clockEl) {
      clockEl.innerText = now.toLocaleTimeString('en-IN', { hour12: true });
    }
  }
  tick();
  setInterval(tick, 1000);
}

/* ============================================================================
   TOAST NOTIFICATION ENGINE
   ============================================================================ */
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = 'ℹ️';
  if (type === 'success') icon = '✅';
  if (type === 'error') icon = '⚠️';

  toast.innerHTML = `<span style="font-size:1.1rem">${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'toastFadeOut 0.3s forwards';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

/* ============================================================================
   DASHBOARD LOGIC & RENDERING
   ============================================================================ */
function renderDashboard() {
  const rooms = state.rooms;
  const bookings = state.bookings;
  const orders = state.orders;

  let availCount = 0;
  let occCount = 0;
  let cleanCount = 0;
  let maintCount = 0;

  rooms.forEach(r => {
    if (r.status === 'Available') availCount++;
    else if (r.status === 'Occupied') occCount++;
    else if (r.status === 'Cleaning') cleanCount++;
    else if (r.status === 'Maintenance') maintCount++;
  });

  const totalRooms = rooms.length;
  const occupancyPct = totalRooms > 0 ? Math.round((occCount / totalRooms) * 100) : 0;

  // Revenue calculation
  const roomRevenue = bookings.reduce((sum, b) => sum + (Number(b.roomAmount) || 0), 0);
  const restRevenue = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
  const totalRevenue = roomRevenue + restRevenue;

  // Update DOM KPI elements
  document.getElementById('statTotalRooms').innerText = totalRooms;
  document.getElementById('statAvailable').innerText = availCount;
  document.getElementById('statOccupied').innerText = occCount;
  document.getElementById('statOccupancyPct').innerText = `${occupancyPct}% Occupancy Rate`;
  document.getElementById('statCleaning').innerText = cleanCount + maintCount;
  document.getElementById('statRoomRevenue').innerText = `₹${roomRevenue.toLocaleString('en-IN')}`;
  document.getElementById('statBookingsCount').innerText = `${bookings.length} Registered Bookings`;
  document.getElementById('statTotalRevenue').innerText = `₹${totalRevenue.toLocaleString('en-IN')}`;
  document.getElementById('statRestSales').innerText = `Dining: ₹${restRevenue.toLocaleString('en-IN')}`;

  // Occupancy Progress Segments
  const availPct = (availCount / totalRooms) * 100;
  const occProgressPct = (occCount / totalRooms) * 100;
  const cleanPct = ((cleanCount + maintCount) / totalRooms) * 100;

  const progAvail = document.getElementById('progAvail');
  const progOcc = document.getElementById('progOcc');
  const progClean = document.getElementById('progClean');
  const occupancyText = document.getElementById('occupancyTextSummary');

  if (progAvail && progOcc && progClean) {
    progAvail.style.width = `${availPct}%`;
    progOcc.style.width = `${occProgressPct}%`;
    progClean.style.width = `${cleanPct}%`;
  }
  if (occupancyText) {
    occupancyText.innerText = `${occCount} Occupied (${occupancyPct}%) • ${availCount} Ready • ${cleanCount + maintCount} Under Turnover`;
  }

  // Render Dashboard Room Grid
  renderDashboardGrid();

  // Render Daily Income Tracker
  loadDailyIncome(state.selectedIncomeDate);
}

function renderDashboardGrid() {
  const grid = document.getElementById('roomGridDash');
  if (!grid) return;
  grid.innerHTML = '';

  const filter = state.activeDashStatusFilter;
  const query = state.dashSearchQuery.trim().toLowerCase();

  const filteredRooms = state.rooms.filter(r => {
    // Status Filter
    if (filter !== 'ALL' && r.status !== filter) return false;

    // Search Query
    if (query) {
      const matchNo = r.room_no.toString().includes(query);
      const matchType = r.type.toLowerCase().includes(query);
      const matchGuest = r.currentGuest && r.currentGuest.toLowerCase().includes(query);
      if (!matchNo && !matchType && !matchGuest) return false;
    }

    return true;
  });

  if (filteredRooms.length === 0) {
    grid.innerHTML = `<div style="grid-column: 1 / -1; text-align: center; padding: 30px; color: var(--text-muted);">
      No suites match the filter criteria "${filter}" ${query ? `or search "${query}"` : ''}.
    </div>`;
    return;
  }

  filteredRooms.forEach(room => {
    let statusClass = 'r-available';
    if (room.status === 'Occupied') statusClass = 'r-occupied';
    else if (room.status === 'Cleaning') statusClass = 'r-cleaning';
    else if (room.status === 'Maintenance') statusClass = 'r-maintenance';

    const card = document.createElement('div');
    card.className = `room-box ${statusClass}`;
    card.onclick = () => openRoomModal(room.room_no);

    const guestDisplay = room.currentGuest ? `<div class="room-guest-tag">👤 ${room.currentGuest.split(' ')[0]}</div>` : '';

    card.innerHTML = `
      <div class="room-no">${room.room_no}</div>
      <div class="room-type-tag">${room.type.replace(' Suite', '')}</div>
      ${guestDisplay}
    `;

    grid.appendChild(card);
  });
}

function handleDashSearch(val) {
  state.dashSearchQuery = val;
  renderDashboardGrid();
}

function filterDashGrid(status, btn) {
  state.activeDashStatusFilter = status;
  if (btn) {
    document.querySelectorAll('.room-matrix-controls .filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }
  renderDashboardGrid();
}

/* ============================================================================
   ROOM CATALOG TAB
   ============================================================================ */
function renderCatalog() {
  const container = document.getElementById('luxuryRooms');
  if (!container) return;
  container.innerHTML = '';

  const typeFilter = state.activeFilterCatalogType;
  const statusFilter = state.activeFilterCatalogStatus;

  const filtered = state.rooms.filter(r => {
    if (typeFilter !== 'All' && r.type !== typeFilter) return false;
    if (statusFilter === 'Available' && r.status !== 'Available') return false;
    return true;
  });

  filtered.forEach(room => {
    let badgeClass = 'badge-available';
    if (room.status === 'Occupied') badgeClass = 'badge-occupied';
    else if (room.status === 'Cleaning') badgeClass = 'badge-cleaning';
    else if (room.status === 'Maintenance') badgeClass = 'badge-maintenance';

    const featuresHtml = room.features.slice(0, 3).map(f => `<span class="feature-pill">✦ ${f}</span>`).join('');

    const card = document.createElement('div');
    card.className = 'luxury-card';
    card.innerHTML = `
      <div class="luxury-img-wrap" onclick="openRoomModal(${room.room_no})">
        <img src="${room.photos[0]}" alt="${room.type} ${room.room_no}" loading="lazy">
        <span class="badge ${badgeClass} luxury-status-badge">${room.status}</span>
        <div class="luxury-room-tag">Room ${room.room_no} • Floor ${room.floor}</div>
      </div>
      <div class="luxury-info">
        <div>
          <div class="luxury-title-row">
            <h3 class="luxury-title">${room.type} ${room.room_no}</h3>
            <div style="display:flex;align-items:center;gap:6px;">
              <div class="luxury-price">₹${room.price.toLocaleString('en-IN')}<span>/night</span></div>
              <button class="price-edit-tag" title="Edit Tariff" onclick="openEditRoomPriceModal(${room.room_no})">✏️</button>
            </div>
          </div>
          <div style="font-size:0.75rem; color:var(--text-secondary); margin-bottom: 6px;">
            📐 ${room.size} &nbsp;|&nbsp; 🛏️ ${room.bed}
          </div>
          <div class="luxury-features">
            ${featuresHtml}
          </div>
        </div>
        <div class="luxury-actions">
          <button class="btn btn-secondary btn-sm flex-1" onclick="openRoomModal(${room.room_no})">
            🔍 Details & 360°
          </button>
          ${room.status === 'Available' 
            ? `<button class="btn btn-gold btn-sm flex-1" onclick="prefillBookingForRoom(${room.room_no})">Book Suite</button>`
            : `<button class="btn btn-secondary btn-sm flex-1" style="opacity:0.6" onclick="openRoomModal(${room.room_no})">${room.status}</button>`
          }
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function filterCatalogType(type, btn) {
  state.activeFilterCatalogType = type;
  state.activeFilterCatalogStatus = 'All';
  document.querySelectorAll('.filter-bar .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderCatalog();
}

function filterCatalogStatus(status, btn) {
  state.activeFilterCatalogStatus = status;
  renderCatalog();
}

/* ============================================================================
   RESTAURANT & ROOM SERVICE POS
   ============================================================================ */
function renderRestaurantPOS() {
  renderMenuGrid();
  renderPosCart();
  renderOccupiedRoomSelect();
  renderRecentOrders();

  const totalRestRevenue = state.orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
  const totalRestEl = document.getElementById('restHeaderTotal');
  if (totalRestEl) {
    totalRestEl.innerText = `₹${totalRestRevenue.toLocaleString('en-IN')}`;
  }
}

function renderMenuGrid() {
  const container = document.getElementById('menuItemsGrid');
  if (!container) return;
  container.innerHTML = '';

  const cat = state.activeMenuCat;
  const filtered = cat === 'All' ? state.menu : state.menu.filter(m => m.category === cat);

  filtered.forEach(item => {
    const card = document.createElement('div');
    card.className = 'menu-item-card';
    card.onclick = () => addPosItem(item);
    card.innerHTML = `
      <div>
        <div class="menu-item-name">${item.name}</div>
        <div class="menu-item-desc">${item.desc}</div>
      </div>
      <div class="menu-item-bottom">
        <span class="menu-item-price">₹${item.price}</span>
        <button class="btn btn-gold btn-sm" style="padding:3px 8px;">+ Add</button>
      </div>
    `;
    container.appendChild(card);
  });
}

function filterMenuCat(cat, btn) {
  state.activeMenuCat = cat;
  document.querySelectorAll('.menu-category-tabs .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderMenuGrid();
}

function addPosItem(item) {
  const existing = state.posCart.find(i => i.id === item.id);
  if (existing) {
    existing.qty++;
  } else {
    state.posCart.push({ id: item.id, name: item.name, price: item.price, qty: 1 });
  }
  renderPosCart();
}

function changeCartQty(id, delta) {
  const item = state.posCart.find(i => i.id === id);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    state.posCart = state.posCart.filter(i => i.id !== id);
  }
  renderPosCart();
}

function clearPosCart() {
  state.posCart = [];
  renderPosCart();
}

function renderPosCart() {
  const container = document.getElementById('posCartItems');
  const subtotalEl = document.getElementById('posCartSubtotal');
  if (!container) return;

  if (state.posCart.length === 0) {
    container.innerHTML = `
      <div style="text-align:center;padding:24px 0;color:var(--text-muted);font-size:0.85rem;">
        No items added yet.<br>Click any menu item on the left to add to cart.
      </div>
    `;
    if (subtotalEl) subtotalEl.innerText = '₹0';
    return;
  }

  let subtotal = 0;
  container.innerHTML = state.posCart.map(item => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;
    return `
      <div class="cart-row">
        <div>
          <div><b>${item.name}</b></div>
          <div style="color:var(--gold-400);font-size:0.75rem;">₹${item.price} each</div>
        </div>
        <div class="cart-qty-ctrl">
          <button class="cart-qty-btn" onclick="changeCartQty(${item.id}, -1)">-</button>
          <span style="font-weight:700;min-width:18px;text-align:center;">${item.qty}</span>
          <button class="cart-qty-btn" onclick="changeCartQty(${item.id}, 1)">+</button>
          <span style="margin-left:8px;font-weight:600;min-width:55px;text-align:right;">₹${itemTotal}</span>
        </div>
      </div>
    `;
  }).join('');

  if (subtotalEl) {
    subtotalEl.innerText = `₹${subtotal.toLocaleString('en-IN')}`;
  }
}

function renderOccupiedRoomSelect() {
  const select = document.getElementById('restRoomSelect');
  if (!select) return;

  const occupiedRooms = state.rooms.filter(r => r.status === 'Occupied');
  select.innerHTML = '<option value="">-- Select Occupied Room --</option>' +
    occupiedRooms.map(r => `<option value="${r.room_no}">Room ${r.room_no} (${r.currentGuest || 'Guest'})</option>`).join('');
}

function submitRoomOrder() {
  const select = document.getElementById('restRoomSelect');
  const roomNo = parseInt(select.value, 10);

  if (!roomNo) {
    showToast('Please select an occupied room for this order.', 'error');
    return;
  }

  if (state.posCart.length === 0) {
    showToast('Please add at least one menu item to the cart.', 'error');
    return;
  }

  const subtotal = state.posCart.reduce((s, i) => s + (i.price * i.qty), 0);
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  const orderId = `ORD-${Math.floor(100 + Math.random() * 900)}`;

  const newOrder = {
    id: orderId,
    room: roomNo,
    items: JSON.parse(JSON.stringify(state.posCart)),
    total: subtotal,
    date: dateStr,
    time: timeStr,
    billedToRoom: true
  };

  state.orders.unshift(newOrder);

  // Link dining charge to the active booking of that room
  const booking = state.bookings.find(b => b.room === roomNo && b.status === 'Checked-In');
  if (booking) {
    booking.diningAmount = (Number(booking.diningAmount) || 0) + subtotal;
  }

  saveAllState();
  clearPosCart();
  renderRestaurantPOS();
  renderBookings();
  renderDashboard();

  showToast(`Order ${orderId} charged to Room ${roomNo} folio (₹${subtotal.toLocaleString('en-IN')})!`, 'success');
}

function renderRecentOrders() {
  const container = document.getElementById('restOrdersList');
  const countBadge = document.getElementById('orderCountBadge');
  if (!container) return;

  if (countBadge) {
    countBadge.innerText = `${state.orders.length} Orders`;
  }

  if (state.orders.length === 0) {
    container.innerHTML = '<div style="color:var(--text-muted);font-size:0.8rem;padding:10px 0;">No active dining orders.</div>';
    return;
  }

  container.innerHTML = state.orders.map(order => {
    const summary = order.items.map(i => `${i.name} (x${i.qty})`).join(', ');
    return `
      <div style="padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.06); font-size:0.8rem; display:flex; justify-content:space-between; align-items:center;">
        <div>
          <b style="color:var(--gold-300);">Room ${order.room}</b> • <span style="color:var(--text-secondary);font-size:0.75rem;">${summary}</span>
        </div>
        <div style="text-align:right;">
          <b style="color:var(--gold-400);">₹${order.total.toLocaleString('en-IN')}</b>
          <div style="font-size:0.7rem;color:var(--text-muted);">${order.time}</div>
        </div>
      </div>
    `;
  }).join('');
}

/* ============================================================================
   STAFF & PAYROLL
   ============================================================================ */
function renderStaff() {
  const tbody = document.getElementById('empTable');
  if (!tbody) return;

  const totalStaff = state.staff.length;
  let totalPayroll = 0;
  let paidCount = 0;
  let pendingCount = 0;

  state.staff.forEach(s => {
    totalPayroll += Number(s.salary) || 0;
    if (s.status === 'Paid') paidCount++;
    else pendingCount++;
  });

  document.getElementById('payrollTotalStaff').innerText = totalStaff;
  document.getElementById('payrollTotalAmt').innerText = `₹${totalPayroll.toLocaleString('en-IN')}`;
  document.getElementById('payrollPaidCount').innerText = `${paidCount} Paid`;
  document.getElementById('payrollPendingCount').innerText = `${pendingCount} Pending`;

  tbody.innerHTML = state.staff.map(emp => {
    const isPaid = emp.status === 'Paid';
    const statusBadge = isPaid
      ? `<span class="badge badge-available" style="cursor:pointer;" onclick="toggleStaffPayment(${emp.id})">✓ Paid</span>`
      : `<span class="badge badge-cleaning" style="cursor:pointer;" onclick="toggleStaffPayment(${emp.id})">⏳ Pending</span>`;

    const genderIcon = emp.gender === 'Female' ? '👩 Female' : '👨 Male';

    return `
      <tr>
        <td><b>${emp.name}</b></td>
        <td>${genderIcon}</td>
        <td><span style="color:var(--gold-300);">${emp.role}</span></td>
        <td>${emp.join}</td>
        <td>${emp.timing}</td>
        <td><b>₹${Number(emp.salary).toLocaleString('en-IN')}</b></td>
        <td>${statusBadge}</td>
        <td>
          <button class="btn btn-danger btn-sm" onclick="deleteStaffMember(${emp.id})">Delete</button>
        </td>
      </tr>
    `;
  }).join('');
}

function toggleStaffPayment(id) {
  const emp = state.staff.find(e => e.id === id);
  if (!emp) return;

  emp.status = emp.status === 'Paid' ? 'Pending' : 'Paid';
  saveAllState();
  renderStaff();
  showToast(`${emp.name}'s salary marked as ${emp.status}`, 'info');
}

function deleteStaffMember(id) {
  const emp = state.staff.find(e => e.id === id);
  if (!emp) return;

  if (confirm(`Are you sure you want to remove ${emp.name} from staff directory?`)) {
    state.staff = state.staff.filter(e => e.id !== id);
    saveAllState();
    renderStaff();
    showToast(`Staff member removed.`, 'info');
  }
}

function openStaffModal() {
  document.getElementById('sName').value = '';
  document.getElementById('sSalary').value = '';
  document.getElementById('sJoinDate').value = new Date().toISOString().split('T')[0];
  document.getElementById('staffModal').classList.add('active');
}

function closeStaffModal() {
  document.getElementById('staffModal').classList.remove('active');
}

function saveStaffMember() {
  const name = document.getElementById('sName').value.trim();
  const gender = document.getElementById('sGender').value;
  const role = document.getElementById('sRole').value;
  const join = document.getElementById('sJoinDate').value || new Date().toISOString().split('T')[0];
  const timing = document.getElementById('sTiming').value;
  const salary = parseInt(document.getElementById('sSalary').value, 10);

  if (!name || isNaN(salary)) {
    showToast('Please provide a valid staff name and salary amount.', 'error');
    return;
  }

  const newStaff = {
    id: Date.now(),
    name,
    gender,
    role,
    join,
    timing,
    salary,
    status: 'Pending'
  };

  state.staff.push(newStaff);
  saveAllState();
  closeStaffModal();
  renderStaff();
  showToast(`Staff member ${name} added successfully!`, 'success');
}

/* ============================================================================
   BOOKINGS & RESERVATIONS
   ============================================================================ */
function renderBookings() {
  const tbody = document.getElementById('bookTable');
  if (!tbody) return;

  const query = state.bookingSearchQuery.trim().toLowerCase();

  const filtered = state.bookings.filter(b => {
    if (!query) return true;
    const matchGuest = b.guest.toLowerCase().includes(query);
    const matchRoom = b.room.toString().includes(query);
    const matchPhone = b.phone && b.phone.includes(query);
    return matchGuest || matchRoom || matchPhone;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="10" style="text-align:center;padding:24px;color:var(--text-muted);">No reservations found.</td></tr>';
    return;
  }

  tbody.innerHTML = filtered.map(b => {
    const isCheckedIn = b.status === 'Checked-In';
    const statusBadge = isCheckedIn
      ? '<span class="badge badge-occupied">In-House</span>'
      : '<span class="badge badge-available">Settled</span>';

    const grandTotal = (Number(b.roomAmount) || 0) + (Number(b.diningAmount) || 0);

    return `
      <tr>
        <td><span style="font-family:monospace;color:var(--gold-400);">${b.id}</span></td>
        <td><b>${b.guest}</b><div style="font-size:0.75rem;color:var(--text-muted);">${b.guestsCount || 1} Guest(s)</div></td>
        <td>${b.phone}</td>
        <td><b style="color:#fff;">Room ${b.room}</b><div style="font-size:0.75rem;color:var(--text-secondary);">${b.type}</div></td>
        <td><div style="font-size:0.8rem;">${b.checkIn}</div><div style="font-size:0.72rem;color:var(--text-muted);">to ${b.checkOut} (${b.nights}n)</div></td>
        <td>₹${Number(b.roomAmount).toLocaleString('en-IN')}</td>
        <td style="color:var(--gold-300);">₹${(Number(b.diningAmount) || 0).toLocaleString('en-IN')}</td>
        <td><b style="color:var(--gold-400);font-size:0.95rem;">₹${grandTotal.toLocaleString('en-IN')}</b></td>
        <td>${statusBadge}</td>
        <td>
          <div style="display:flex;gap:6px;">
            <button class="btn btn-gold btn-sm" onclick="openInvoiceModal('${b.id}')">Tax Invoice</button>
            ${isCheckedIn 
              ? `<button class="btn btn-danger btn-sm" onclick="checkoutBooking('${b.id}')">Check-Out</button>`
              : ''
            }
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function handleBookingSearch(val) {
  state.bookingSearchQuery = val;
  renderBookings();
}

function openBookingModal(prefillRoomNo = null) {
  const modal = document.getElementById('bookingModal');
  const roomSelect = document.getElementById('bRoomSelect');
  const checkIn = document.getElementById('bCheckIn');
  const checkOut = document.getElementById('bCheckOut');

  // Populate available rooms dropdown
  const availableRooms = state.rooms.filter(r => r.status === 'Available');

  roomSelect.innerHTML = '<option value="">-- Choose an Available Suite --</option>' +
    availableRooms.map(r => `<option value="${r.room_no}">${r.room_no} - ${r.type} (₹${r.price.toLocaleString('en-IN')}/night)</option>`).join('');

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  checkIn.value = today;
  checkOut.value = tomorrow;

  document.getElementById('bGuestName').value = '';
  document.getElementById('bPhone').value = '';
  document.getElementById('bEmail').value = '';

  if (prefillRoomNo) {
    roomSelect.value = prefillRoomNo;
    handleRoomSelectChange(prefillRoomNo);
  } else {
    document.getElementById('bAmount').value = '';
  }

  modal.classList.add('active');
}

function prefillBookingForRoom(roomNo) {
  closeRoomModal();
  openBookingModal(roomNo);
}

function handleRoomSelectChange(roomNo) {
  const room = state.rooms.find(r => r.room_no === parseInt(roomNo, 10));
  const amountField = document.getElementById('bAmount');
  if (room && amountField) {
    amountField.value = room.price;
  }
}

function closeBookingModal() {
  document.getElementById('bookingModal').classList.remove('active');
}

function confirmBooking() {
  const guest = document.getElementById('bGuestName').value.trim();
  const phone = document.getElementById('bPhone').value.trim();
  const email = document.getElementById('bEmail').value.trim();
  const roomNo = parseInt(document.getElementById('bRoomSelect').value, 10);
  const checkIn = document.getElementById('bCheckIn').value;
  const checkOut = document.getElementById('bCheckOut').value;
  const guestsCount = parseInt(document.getElementById('bGuestsCount').value, 10) || 2;
  const idProof = document.getElementById('bIdProof').value;

  if (!guest || !phone || !roomNo || !checkIn || !checkOut) {
    showToast('Please fill all required booking fields.', 'error');
    return;
  }

  const room = state.rooms.find(r => r.room_no === roomNo);
  if (!room) {
    showToast('Invalid room selected.', 'error');
    return;
  }

  // Calculate nights
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const diffTime = d2.getTime() - d1.getTime();
  let nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  if (nights <= 0) nights = 1;

  const roomAmount = room.price * nights;
  const bookingId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;

  const newBooking = {
    id: bookingId,
    guest,
    phone,
    email: email || `${guest.toLowerCase().replace(/\s+/g, '.')}@guest.com`,
    room: roomNo,
    type: room.type,
    checkIn,
    checkOut,
    nights,
    rate: room.price,
    roomAmount,
    diningAmount: 0,
    idProof,
    guestsCount,
    status: 'Checked-In'
  };

  // Update room state
  room.status = 'Occupied';
  room.currentGuest = guest;
  room.bookingId = bookingId;

  state.bookings.unshift(newBooking);

  saveAllState();
  closeBookingModal();
  renderDashboard();
  renderCatalog();
  renderBookings();
  renderRestaurantPOS();

  showToast(`Booking ${bookingId} confirmed for ${guest} in Room ${roomNo}!`, 'success');
}

function checkoutBooking(bookingId) {
  const booking = state.bookings.find(b => b.id === bookingId);
  if (!booking) return;

  const grandTotal = (Number(booking.roomAmount) || 0) + (Number(booking.diningAmount) || 0);

  const confirmMsg = `Confirm Check-out for ${booking.guest} (Room ${booking.room})?\n\nTotal Room Charges: ₹${booking.roomAmount}\nDining Room Service: ₹${booking.diningAmount || 0}\nGrand Total Settle: ₹${grandTotal.toLocaleString('en-IN')}`;

  if (confirm(confirmMsg)) {
    // Settle booking
    booking.status = 'Checked-Out';

    // Free up room and mark for housekeeping
    const room = state.rooms.find(r => r.room_no === booking.room);
    if (room) {
      room.status = 'Cleaning';
      room.currentGuest = null;
      room.bookingId = null;
    }

    saveAllState();
    renderDashboard();
    renderCatalog();
    renderBookings();
    renderRestaurantPOS();

    showToast(`Guest checked out successfully! Room ${booking.room} assigned to Housekeeping.`, 'success');
    openInvoiceModal(bookingId);
  }
}

/* ============================================================================
   TAX INVOICE GENERATOR
   ============================================================================ */
function openInvoiceModal(bookingId) {
  const booking = state.bookings.find(b => b.id === bookingId);
  if (!booking) return;

  const cfg = state.settings;

  // Hotel details
  document.getElementById('invHotelName').innerText = cfg.hotelName;
  document.getElementById('invHotelDetails').innerHTML = `
    5-Star Luxury Property & Heritage Resort<br>
    ${cfg.address}<br>
    GSTIN: ${cfg.gstin} | Phone: ${cfg.phone}
  `;

  // Invoice particulars
  document.getElementById('invNumber').innerText = `INV-${booking.id.replace('BK-', '')}-${new Date().getFullYear()}`;
  document.getElementById('invDate').innerText = `Date: ${new Date().toLocaleDateString('en-IN')}`;

  document.getElementById('invGuestName').innerText = booking.guest;
  document.getElementById('invGuestPhone').innerText = booking.phone;
  document.getElementById('invGuestId').innerText = booking.idProof || 'Verified Govt ID';

  document.getElementById('invRoomNo').innerText = booking.room;
  document.getElementById('invRoomType').innerText = booking.type;
  document.getElementById('invCheckIn').innerText = booking.checkIn;
  document.getElementById('invCheckOut').innerText = booking.checkOut;
  document.getElementById('invNights').innerText = booking.nights;

  // Invoice Items
  const itemsTbody = document.getElementById('invItemsBody');
  const roomTotal = Number(booking.roomAmount) || 0;
  const diningTotal = Number(booking.diningAmount) || 0;

  let rowsHtml = `
    <tr>
      <td><b>Room Tariff: ${booking.type} - Room ${booking.room}</b></td>
      <td style="text-align:center;">${booking.nights} night(s)</td>
      <td style="text-align:right;">₹${booking.rate.toLocaleString('en-IN')}</td>
      <td style="text-align:right;">₹${roomTotal.toLocaleString('en-IN')}</td>
    </tr>
  `;

  if (diningTotal > 0) {
    rowsHtml += `
      <tr>
        <td><b>Room Service Dining & Beverage Folio</b></td>
        <td style="text-align:center;">Folio</td>
        <td style="text-align:right;">₹${diningTotal.toLocaleString('en-IN')}</td>
        <td style="text-align:right;">₹${diningTotal.toLocaleString('en-IN')}</td>
      </tr>
    `;
  }

  itemsTbody.innerHTML = rowsHtml;

  // Taxes
  const subtotal = roomTotal + diningTotal;
  const cgst = Math.round(subtotal * 0.06);
  const sgst = Math.round(subtotal * 0.06);
  const cess = Math.round(subtotal * 0.02);
  const grandTotal = subtotal + cgst + sgst + cess;

  document.getElementById('invSubtotal').innerText = `₹${subtotal.toLocaleString('en-IN')}`;
  document.getElementById('invCgst').innerText = `₹${cgst.toLocaleString('en-IN')}`;
  document.getElementById('invSgst').innerText = `₹${sgst.toLocaleString('en-IN')}`;
  document.getElementById('invCess').innerText = `₹${cess.toLocaleString('en-IN')}`;
  document.getElementById('invGrandTotal').innerText = `₹${grandTotal.toLocaleString('en-IN')}`;

  document.getElementById('invoiceModal').classList.add('active');
}

function closeInvoiceModal() {
  document.getElementById('invoiceModal').classList.remove('active');
}

/* ============================================================================
   ROOM DETAILS & 360 PANORAMA TOUR SIMULATOR
   ============================================================================ */
let tourAnimId = null;
let tourRotation = 0;
let isDraggingTour = false;
let tourStartX = 0;

function openRoomModal(roomNo) {
  const room = state.rooms.find(r => r.room_no === roomNo);
  if (!room) return;

  state.activeModalRoom = room;

  document.getElementById('roomModalTitle').innerText = `${room.type} • Room ${room.room_no}`;
  document.getElementById('roomMainImg').src = room.photos[0];

  // Status Badge
  let badgeClass = 'badge-available';
  if (room.status === 'Occupied') badgeClass = 'badge-occupied';
  else if (room.status === 'Cleaning') badgeClass = 'badge-cleaning';
  else if (room.status === 'Maintenance') badgeClass = 'badge-maintenance';

  document.getElementById('roomModalStatusBadge').innerHTML = `<span class="badge ${badgeClass}">${room.status}</span>`;

  // Thumbs
  const thumbsRow = document.getElementById('roomThumbsRow');
  thumbsRow.innerHTML = room.photos.map(p => `
    <img src="${p}" style="width:72px;height:48px;object-fit:cover;border-radius:6px;cursor:pointer;border:1px solid var(--border-gold);" onclick="document.getElementById('roomMainImg').src='${p}'">
  `).join('');

  // Specs
  const specs = document.getElementById('roomDetailSpecs');
  const activeBooking = room.bookingId ? state.bookings.find(b => b.id === room.bookingId) : null;

  specs.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
      <div style="display:flex;align-items:center;gap:10px;">
        <span style="font-size:1.15rem;font-weight:700;color:var(--gold-400);">₹${room.price.toLocaleString('en-IN')} <small style="font-size:0.75rem;color:var(--text-muted)">/ night</small></span>
        <button class="price-edit-tag" onclick="openEditRoomPriceModal(${room.room_no})">✏️ Edit Price</button>
      </div>
      <span style="font-size:0.8rem;color:var(--text-secondary);">Floor ${room.floor}</span>
    </div>
    <div style="font-size:0.82rem;line-height:1.7;">
      <div><b>Dimensions:</b> ${room.size} &nbsp;|&nbsp; <b>Bedding:</b> ${room.bed}</div>
      <div><b>Amenities:</b> ${room.features.join(' • ')}</div>
    </div>
    ${activeBooking ? `
      <div style="margin-top:12px;padding:10px;background:rgba(239,68,68,0.12);border:1px solid rgba(239,68,68,0.3);border-radius:8px;font-size:0.8rem;">
        <b style="color:#ef4444;">Current In-House Guest:</b><br>
        👤 ${activeBooking.guest} (${activeBooking.phone})<br>
        📅 Stay: ${activeBooking.checkIn} to ${activeBooking.checkOut} (${activeBooking.nights} nights)
      </div>
    ` : ''}
  `;

  // Action Buttons
  const actionsWrap = document.getElementById('roomModalActions');
  if (room.status === 'Available') {
    actionsWrap.innerHTML = `
      <button class="btn btn-gold btn-block" onclick="prefillBookingForRoom(${room.room_no})">
        + Reserve This Suite Now
      </button>
    `;
  } else if (room.status === 'Occupied' && activeBooking) {
    actionsWrap.innerHTML = `
      <div style="display:flex;gap:8px;">
        <button class="btn btn-gold flex-1" onclick="openInvoiceModal('${activeBooking.id}')">View Current Bill</button>
        <button class="btn btn-danger flex-1" onclick="closeRoomModal(); checkoutBooking('${activeBooking.id}')">Check-Out Guest</button>
      </div>
    `;
  } else if (room.status === 'Cleaning') {
    actionsWrap.innerHTML = `
      <button class="btn btn-success btn-block" onclick="setModalRoomStatus('Available')">
        ✓ Mark Cleaning Complete (Make Available)
      </button>
    `;
  } else {
    actionsWrap.innerHTML = `
      <button class="btn btn-secondary btn-block" onclick="setModalRoomStatus('Available')">
        Set Back to Available
      </button>
    `;
  }

  document.getElementById('roomModal').classList.add('active');

  // Start 360 Virtual Canvas Simulator
  start360VirtualCanvas();
}

function closeRoomModal() {
  document.getElementById('roomModal').classList.remove('active');
  if (tourAnimId) {
    cancelAnimationFrame(tourAnimId);
    tourAnimId = null;
  }
}

function setModalRoomStatus(newStatus) {
  if (!state.activeModalRoom) return;

  state.activeModalRoom.status = newStatus;
  if (newStatus !== 'Occupied') {
    state.activeModalRoom.currentGuest = null;
    state.activeModalRoom.bookingId = null;
  }

  saveAllState();
  renderDashboard();
  renderCatalog();
  renderRestaurantPOS();
  openRoomModal(state.activeModalRoom.room_no);
  showToast(`Room ${state.activeModalRoom.room_no} status updated to ${newStatus}`, 'info');
}

/* ============================================================================
   INTERACTIVE 360° PANORAMA CANVAS SIMULATION
   ============================================================================ */
function start360VirtualCanvas() {
  const canvas = document.getElementById('virtualTourCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = canvas.parentElement.clientWidth || 400;
  canvas.height = 280;

  // Mouse & Touch listeners for drag rotation
  canvas.onmousedown = (e) => {
    isDraggingTour = true;
    tourStartX = e.clientX;
  };
  window.onmouseup = () => { isDraggingTour = false; };
  canvas.onmousemove = (e) => {
    if (isDraggingTour) {
      const dx = e.clientX - tourStartX;
      tourRotation += dx * 0.006;
      tourStartX = e.clientX;
    }
  };

  canvas.ontouchstart = (e) => {
    if (e.touches.length > 0) {
      isDraggingTour = true;
      tourStartX = e.touches[0].clientX;
    }
  };
  canvas.ontouchmove = (e) => {
    if (isDraggingTour && e.touches.length > 0) {
      const dx = e.touches[0].clientX - tourStartX;
      tourRotation += dx * 0.008;
      tourStartX = e.touches[0].clientX;
    }
  };
  canvas.ontouchend = () => { isDraggingTour = false; };

  function renderPanorama() {
    if (!document.getElementById('roomModal').classList.contains('active')) return;

    if (!isDraggingTour) {
      tourRotation += 0.002; // Gentle auto-pan
    }

    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    // Dynamic Horizon and Perspective
    const horizon = h * 0.52;

    // Floor Gradient (Polished Dark Wood & Marble)
    const floorGrad = ctx.createLinearGradient(0, horizon, 0, h);
    floorGrad.addColorStop(0, '#1c1611');
    floorGrad.addColorStop(1, '#0b0806');
    ctx.fillStyle = floorGrad;
    ctx.fillRect(0, horizon, w, h - horizon);

    // Ceiling & Upper Walls Gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, horizon);
    skyGrad.addColorStop(0, '#0a0d14');
    skyGrad.addColorStop(0.7, '#1b2234');
    skyGrad.addColorStop(1, '#2c354e');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, horizon);

    // Panoramic Wall Elements based on angle
    const numPillars = 8;
    for (let i = 0; i < numPillars; i++) {
      const angle = (i / numPillars) * Math.PI * 2 + tourRotation;
      const x = (Math.sin(angle) * 0.5 + 0.5) * w;
      const depth = Math.cos(angle);

      if (depth > -0.2) {
        // Luxury Balcony Window View
        if (i % 2 === 0) {
          ctx.fillStyle = 'rgba(212, 175, 55, 0.15)';
          ctx.fillRect(x - 50 * depth, horizon - 90 * depth, 100 * depth, 110 * depth);
          ctx.strokeStyle = 'rgba(197, 160, 89, 0.4)';
          ctx.lineWidth = 2 * depth;
          ctx.strokeRect(x - 50 * depth, horizon - 90 * depth, 100 * depth, 110 * depth);

          // Balcony view glow
          ctx.fillStyle = 'rgba(255, 230, 180, 0.08)';
          ctx.beginPath();
          ctx.arc(x, horizon - 40 * depth, 30 * depth, 0, Math.PI * 2);
          ctx.fill();
        }

        // Luxury Headboard / Bed / Art Piece
        if (i === 1) {
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(x - 60 * depth, horizon - 40 * depth, 120 * depth, 50 * depth);
          ctx.fillStyle = '#c5a059';
          ctx.fillRect(x - 55 * depth, horizon - 35 * depth, 110 * depth, 6 * depth);
        }

        // Architectural Pillars
        ctx.fillStyle = 'rgba(10, 14, 23, 0.85)';
        ctx.fillRect(x - 10 * depth, 0, 20 * depth, h);
        ctx.strokeStyle = 'rgba(197, 160, 89, 0.25)';
        ctx.strokeRect(x - 10 * depth, 0, 20 * depth, h);
      }
    }

    // Modern Chandelier in Center Ceiling
    ctx.strokeStyle = 'rgba(212, 175, 55, 0.8)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(w / 2, 0);
    ctx.lineTo(w / 2, 45);
    ctx.stroke();

    const chGrad = ctx.createRadialGradient(w / 2, 48, 2, w / 2, 48, 26);
    chGrad.addColorStop(0, '#fff4cc');
    chGrad.addColorStop(0.4, 'rgba(212, 175, 55, 0.6)');
    chGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = chGrad;
    ctx.beginPath();
    ctx.arc(w / 2, 48, 26, 0, Math.PI * 2);
    ctx.fill();

    tourAnimId = requestAnimationFrame(renderPanorama);
  }

  if (tourAnimId) cancelAnimationFrame(tourAnimId);
  tourAnimId = requestAnimationFrame(renderPanorama);
}

function resetTourView() {
  tourRotation = 0;
}

/* ============================================================================
   SETTINGS & DATA BACKUP ENGINE
   ============================================================================ */
function saveHotelSettings() {
  state.settings.hotelName = document.getElementById('cfgHotelName').value.trim();
  state.settings.gstin = document.getElementById('cfgGstin').value.trim();
  state.settings.address = document.getElementById('cfgAddress').value.trim();
  state.settings.phone = document.getElementById('cfgPhone').value.trim();
  state.settings.email = document.getElementById('cfgEmail').value.trim();

  saveAllState();
  showToast('Hotel profile information updated successfully!', 'success');
}

function exportDataJson() {
  const data = {
    version: '3.0',
    exportedAt: new Date().toISOString(),
    settings: state.settings,
    rooms: state.rooms,
    bookings: state.bookings,
    orders: state.orders,
    staff: state.staff,
    partners: state.partners,
    menu: state.menu
  };

  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Grand_Royal_Palace_PMS_Backup_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);

  showToast('PMS Database successfully exported to JSON!', 'success');
}

function importDataJson(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (data.rooms && data.bookings) {
        state.rooms = data.rooms;
        state.bookings = data.bookings;
        state.orders = data.orders || [];
        state.staff = data.staff || DEFAULT_STAFF;
        state.partners = data.partners || DEFAULT_PARTNERS;
        state.menu = data.menu || RESTAURANT_MENU;
        if (data.settings) state.settings = data.settings;

        saveAllState();
        renderDashboard();
        renderCatalog();
        renderRestaurantPOS();
        renderStaff();
        renderBookings();
        renderPartners();

        showToast('Database imported successfully!', 'success');
      } else {
        showToast('Invalid backup file structure.', 'error');
      }
    } catch (err) {
      showToast('Error parsing JSON backup file.', 'error');
    }
  };
  reader.readAsText(file);
}

function resetToDemoData() {
  if (confirm('Are you sure you want to reset all data back to original 5-Star Luxury demo records? Any unsaved changes will be lost.')) {
    localStorage.removeItem(STORAGE_KEY_ROOMS);
    localStorage.removeItem(STORAGE_KEY_BOOKINGS);
    localStorage.removeItem(STORAGE_KEY_ORDERS);
    localStorage.removeItem(STORAGE_KEY_STAFF);
    localStorage.removeItem(STORAGE_KEY_PARTNERS);
    localStorage.removeItem(STORAGE_KEY_MENU);
    localStorage.removeItem(STORAGE_KEY_SETTINGS);

    initState();
    renderDashboard();
    renderCatalog();
    renderRestaurantPOS();
    renderStaff();
    renderBookings();
    renderPartners();

    showToast('Reset back to default luxury property records.', 'info');
  }
}

/* ============================================================================
   PER-DAY INCOME & DAILY REVENUE TRACKER
   ============================================================================ */
function loadDailyIncome(dateStr) {
  if (!dateStr) {
    dateStr = new Date().toISOString().split('T')[0];
  }
  state.selectedIncomeDate = dateStr;

  const picker = document.getElementById('incomeDayPicker');
  if (picker && picker.value !== dateStr) {
    picker.value = dateStr;
  }

  // 1. Room Income on this day:
  let dayRoomRevenue = 0;
  let dayRoomBookings = [];

  state.bookings.forEach(b => {
    // If guest checked in today or active stay covers this day
    if (b.checkIn === dateStr) {
      dayRoomRevenue += Number(b.rate) || 0;
      dayRoomBookings.push({
        id: b.id,
        guest: b.guest,
        room: b.room,
        type: b.type,
        time: 'Check-in Day',
        amount: Number(b.rate) || 0
      });
    } else if (b.checkIn < dateStr && b.checkOut >= dateStr) {
      dayRoomRevenue += Number(b.rate) || 0;
      dayRoomBookings.push({
        id: b.id,
        guest: b.guest,
        room: b.room,
        type: b.type,
        time: 'In-House Stay',
        amount: Number(b.rate) || 0
      });
    }
  });

  // 2. Restaurant Orders on this day:
  let dayRestRevenue = 0;
  let dayOrders = [];

  state.orders.forEach(o => {
    const orderDate = o.date || new Date().toISOString().split('T')[0];
    if (orderDate === dateStr) {
      dayRestRevenue += Number(o.total) || 0;
      const itemsSummary = o.items ? o.items.map(i => `${i.name} (x${i.qty})`).join(', ') : 'Dining Order';
      dayOrders.push({
        id: o.id,
        room: o.room,
        time: o.time || '--:--',
        particulars: itemsSummary,
        amount: Number(o.total) || 0
      });
    }
  });

  const dayTotal = dayRoomRevenue + dayRestRevenue;

  // Update DOM elements
  const elTotal = document.getElementById('dayTotalIncome');
  const elRoom = document.getElementById('dayRoomIncome');
  const elRoomCount = document.getElementById('dayRoomCount');
  const elRest = document.getElementById('dayRestIncome');
  const elRestCount = document.getElementById('dayRestCount');
  const elTitle = document.getElementById('breakdownDateTitle');

  if (elTotal) elTotal.innerText = `₹${dayTotal.toLocaleString('en-IN')}`;
  if (elRoom) elRoom.innerText = `₹${dayRoomRevenue.toLocaleString('en-IN')}`;
  if (elRoomCount) elRoomCount.innerText = `${dayRoomBookings.length} Room(s) Active`;
  if (elRest) elRest.innerText = `₹${dayRestRevenue.toLocaleString('en-IN')}`;
  if (elRestCount) elRestCount.innerText = `${dayOrders.length} Dining Orders`;
  if (elTitle) elTitle.innerText = dateStr;

  // Render Table Breakdown
  const tbody = document.getElementById('dailyBreakdownTableBody');
  if (tbody) {
    if (dayRoomBookings.length === 0 && dayOrders.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;padding:20px;color:var(--text-muted);">No room check-ins or dining orders recorded for ${dateStr}.</td></tr>`;
    } else {
      let rows = '';
      dayRoomBookings.forEach(rb => {
        rows += `
          <tr>
            <td><span style="font-family:monospace;color:var(--gold-400);">${rb.id}</span> <small style="color:var(--text-muted);">(${rb.time})</small></td>
            <td><span class="badge badge-available">🛏️ Room Tariff</span></td>
            <td><b>${rb.guest}</b> (${rb.type})</td>
            <td><b>Room ${rb.room}</b></td>
            <td style="text-align:right;font-weight:700;color:#60a5fa;">₹${rb.amount.toLocaleString('en-IN')}</td>
          </tr>
        `;
      });
      dayOrders.forEach(ord => {
        rows += `
          <tr>
            <td><span style="font-family:monospace;color:var(--gold-300);">${ord.id}</span> <small style="color:var(--text-muted);">(${ord.time})</small></td>
            <td><span class="badge badge-cleaning">🍽️ Restaurant Order</span></td>
            <td>${ord.particulars}</td>
            <td><b>Room ${ord.room}</b></td>
            <td style="text-align:right;font-weight:700;color:var(--status-cleaning);">₹${ord.amount.toLocaleString('en-IN')}</td>
          </tr>
        `;
      });
      tbody.innerHTML = rows;
    }
  }
}

function handleDailyIncomeDateChange(val) {
  loadDailyIncome(val);
}

function setIncomeDateToday() {
  const today = new Date().toISOString().split('T')[0];
  loadDailyIncome(today);
}

function setIncomeDateYesterday() {
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  loadDailyIncome(yesterday);
}

function toggleDailyBreakdown() {
  const wrap = document.getElementById('dailyBreakdownWrap');
  const btn = document.getElementById('btnToggleDailyBreakdown');
  if (!wrap) return;

  const isHidden = wrap.classList.contains('hidden');
  wrap.classList.toggle('hidden');
  if (btn) {
    btn.innerHTML = isHidden ? '<span>▲</span> Hide Details' : '<span>📋</span> Details';
  }
}

/* ============================================================================
   ROOM PRICE & TARIFF EDITING ENGINE
   ============================================================================ */
function openEditRoomPriceModal(roomNo) {
  const room = state.rooms.find(r => r.room_no === roomNo);
  if (!room) return;

  state.editingPriceRoomNo = roomNo;
  document.getElementById('editPriceRoomTitle').innerText = `Room ${room.room_no} (${room.type})`;
  document.getElementById('editPriceInput').value = room.price;
  document.getElementById('editPriceApplyAll').checked = false;
  document.getElementById('editPriceApplyAllLabel').innerText = `Apply new price to ALL 15 ${room.type} rooms`;

  document.getElementById('editRoomPriceModal').classList.add('active');
}

function closeEditRoomPriceModal() {
  document.getElementById('editRoomPriceModal').classList.remove('active');
  state.editingPriceRoomNo = null;
}

function saveRoomPrice() {
  if (!state.editingPriceRoomNo) return;

  const targetRoom = state.rooms.find(r => r.room_no === state.editingPriceRoomNo);
  if (!targetRoom) return;

  const newPrice = parseInt(document.getElementById('editPriceInput').value, 10);
  if (isNaN(newPrice) || newPrice <= 0) {
    showToast('Please enter a valid room price per night.', 'error');
    return;
  }

  const applyAll = document.getElementById('editPriceApplyAll').checked;

  if (applyAll) {
    const categoryType = targetRoom.type;
    state.rooms.forEach(r => {
      if (r.type === categoryType) {
        r.price = newPrice;
      }
    });
    if (ROOM_ASSETS[categoryType]) {
      ROOM_ASSETS[categoryType].price = newPrice;
    }
    showToast(`All ${categoryType} rooms updated to ₹${newPrice.toLocaleString('en-IN')}/night!`, 'success');
  } else {
    targetRoom.price = newPrice;
    showToast(`Room ${targetRoom.room_no} price updated to ₹${newPrice.toLocaleString('en-IN')}/night!`, 'success');
  }

  saveAllState();
  closeEditRoomPriceModal();

  renderDashboard();
  renderCatalog();
  if (state.activeModalRoom && state.activeModalRoom.room_no === targetRoom.room_no) {
    openRoomModal(targetRoom.room_no);
  }
}

/* Bulk Category Tariffs */
function openBulkPriceModal() {
  const deluxeSample = state.rooms.find(r => r.type === 'Deluxe');
  const execSample = state.rooms.find(r => r.type === 'Executive Suite');
  const presSample = state.rooms.find(r => r.type === 'Presidential Suite');

  document.getElementById('bulkPriceDeluxe').value = deluxeSample ? deluxeSample.price : 4500;
  document.getElementById('bulkPriceExecutive').value = execSample ? execSample.price : 9500;
  document.getElementById('bulkPricePresidential').value = presSample ? presSample.price : 18000;

  document.getElementById('bulkPriceModal').classList.add('active');
}

function closeBulkPriceModal() {
  document.getElementById('bulkPriceModal').classList.remove('active');
}

function saveBulkPrices() {
  const pDeluxe = parseInt(document.getElementById('bulkPriceDeluxe').value, 10);
  const pExec = parseInt(document.getElementById('bulkPriceExecutive').value, 10);
  const pPres = parseInt(document.getElementById('bulkPricePresidential').value, 10);

  if (isNaN(pDeluxe) || isNaN(pExec) || isNaN(pPres)) {
    showToast('Please enter valid numeric amounts for all categories.', 'error');
    return;
  }

  state.rooms.forEach(r => {
    if (r.type === 'Deluxe') r.price = pDeluxe;
    else if (r.type === 'Executive Suite') r.price = pExec;
    else if (r.type === 'Presidential Suite') r.price = pPres;
  });

  if (ROOM_ASSETS['Deluxe']) ROOM_ASSETS['Deluxe'].price = pDeluxe;
  if (ROOM_ASSETS['Executive Suite']) ROOM_ASSETS['Executive Suite'].price = pExec;
  if (ROOM_ASSETS['Presidential Suite']) ROOM_ASSETS['Presidential Suite'].price = pPres;

  saveAllState();
  closeBulkPriceModal();

  renderDashboard();
  renderCatalog();
  showToast('All 45 room category tariffs updated successfully!', 'success');
}

/* ============================================================================
   RESTAURANT MENU & PRICING MANAGER
   ============================================================================ */
function openMenuManagerModal() {
  renderMenuManagerTable();
  document.getElementById('menuManagerModal').classList.add('active');
}

function closeMenuManagerModal() {
  document.getElementById('menuManagerModal').classList.remove('active');
}

function renderMenuManagerTable() {
  const tbody = document.getElementById('menuEditTableBody');
  if (!tbody) return;

  tbody.innerHTML = state.menu.map(item => `
    <tr>
      <td><b>${item.name}</b></td>
      <td><span style="font-size:0.75rem;color:var(--text-secondary);">${item.category}</span></td>
      <td>
        <input type="number" id="menuPriceInput_${item.id}" value="${item.price}" min="10" step="10">
      </td>
      <td>
        <button class="btn btn-sm btn-gold" onclick="updateMenuItemPrice(${item.id})">Save</button>
      </td>
    </tr>
  `).join('');
}

function updateMenuItemPrice(id) {
  const input = document.getElementById(`menuPriceInput_${id}`);
  if (!input) return;

  const newPrice = parseInt(input.value, 10);
  if (isNaN(newPrice) || newPrice <= 0) {
    showToast('Please enter a valid price.', 'error');
    return;
  }

  const item = state.menu.find(m => m.id === id);
  if (!item) return;

  item.price = newPrice;
  saveAllState();
  renderRestaurantPOS();
  renderMenuManagerTable();
  showToast(`Updated price for "${item.name}" to ₹${newPrice}!`, 'success');
}

function addNewDishToMenu() {
  const name = document.getElementById('newDishName').value.trim();
  const category = document.getElementById('newDishCategory').value;
  const price = parseInt(document.getElementById('newDishPrice').value, 10);
  const desc = document.getElementById('newDishDesc').value.trim();

  if (!name || isNaN(price) || price <= 0) {
    showToast('Please provide a valid dish name and price.', 'error');
    return;
  }

  const newId = Date.now();
  const newItem = {
    id: newId,
    name,
    category,
    price,
    desc: desc || `${category} delicacy prepared fresh`
  };

  state.menu.push(newItem);
  saveAllState();

  document.getElementById('newDishName').value = '';
  document.getElementById('newDishPrice').value = '';
  document.getElementById('newDishDesc').value = '';

  renderRestaurantPOS();
  renderMenuManagerTable();
  showToast(`Dish "${name}" added to menu successfully!`, 'success');
}

/* ============================================================================
   HOTEL OWNERS & PARTNERS MANAGEMENT
   ============================================================================ */
const PARTNER_COLORS = [
  '#d4af37', // Gold
  '#3b82f6', // Blue
  '#10b981', // Green
  '#f59e0b', // Amber
  '#8b5cf6', // Purple
  '#ec4899', // Pink
  '#06b6d4', // Cyan
  '#f97316'  // Orange
];

function renderPartners() {
  const tbody = document.getElementById('partnersTableBody');
  const progBar = document.getElementById('equityProgressBar');
  const legend = document.getElementById('equityLegend');
  if (!tbody) return;

  const partners = state.partners;
  const count = partners.length;

  let totalEquity = 0;
  let totalInvestment = 0;

  partners.forEach(p => {
    totalEquity += Number(p.share) || 0;
    totalInvestment += Number(p.investment) || 0;
  });

  // Calculate Total Hotel Revenue Pool
  const roomRev = state.bookings.reduce((sum, b) => sum + (Number(b.roomAmount) || 0), 0);
  const diningRev = state.orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
  const totalRevenue = roomRev + diningRev;

  // KPI DOM updates
  document.getElementById('kpiTotalPartners').innerText = count;
  document.getElementById('kpiTotalEquity').innerText = `${totalEquity}%`;
  
  const statusEl = document.getElementById('kpiEquityStatus');
  if (statusEl) {
    if (totalEquity === 100) statusEl.innerText = '100% Fully Allocated';
    else if (totalEquity > 100) statusEl.innerText = `⚠️ Overallocated by ${totalEquity - 100}%`;
    else statusEl.innerText = `${100 - totalEquity}% Unallocated / Treasury`;
  }

  document.getElementById('kpiTotalInvestment').innerText = `₹${totalInvestment.toLocaleString('en-IN')}`;
  document.getElementById('kpiPartnerRevPool').innerText = `₹${totalRevenue.toLocaleString('en-IN')}`;

  // Equity Progress Bar & Legend
  if (progBar && legend) {
    progBar.innerHTML = partners.map((p, idx) => {
      const color = PARTNER_COLORS[idx % PARTNER_COLORS.length];
      return `<div style="width:${p.share}%;background:${color};height:100%;transition:width 0.4s ease;" title="${p.name}: ${p.share}%"></div>`;
    }).join('');

    legend.innerHTML = partners.map((p, idx) => {
      const color = PARTNER_COLORS[idx % PARTNER_COLORS.length];
      return `
        <div class="legend-item">
          <div class="legend-dot" style="background:${color};"></div>
          <b>${p.name}</b> (${p.share}%)
        </div>
      `;
    }).join('');
  }

  // Render Table
  if (partners.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;padding:24px;color:var(--text-muted);">No partners registered. Click "+ Add New Partner / Owner" above to add one.</td></tr>';
    return;
  }

  tbody.innerHTML = partners.map(p => {
    const initials = p.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    const estShareRev = Math.round(totalRevenue * ((Number(p.share) || 0) / 100));

    return `
      <tr>
        <td>
          <div class="partner-info-cell">
            <div class="partner-avatar">${initials}</div>
            <div>
              <b>${p.name}</b>
              ${p.notes ? `<div style="font-size:0.72rem;color:var(--text-muted);">${p.notes}</div>` : ''}
            </div>
          </div>
        </td>
        <td><span style="color:var(--gold-300);font-weight:600;">${p.role}</span></td>
        <td>
          <span class="partner-equity-badge">🏆 ${p.share}%</span>
        </td>
        <td>₹${Number(p.investment || 0).toLocaleString('en-IN')}</td>
        <td><b style="color:var(--status-available);">₹${estShareRev.toLocaleString('en-IN')}</b></td>
        <td>
          <div style="font-size:0.8rem;">${p.phone || '--'}</div>
          <div style="font-size:0.72rem;color:var(--text-secondary);">${p.email || '--'}</div>
        </td>
        <td>${p.joinDate || '--'}</td>
        <td>
          <div style="display:flex;gap:6px;">
            <button class="btn btn-gold btn-sm" onclick="openEditPartnerModal(${p.id})">✏️ Edit</button>
            <button class="btn btn-danger btn-sm" onclick="deletePartner(${p.id})">🗑️</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function openAddPartnerModal() {
  document.getElementById('partnerModalTitle').innerText = 'Add New Partner / Owner (नया पार्टनर)';
  document.getElementById('partnerEditId').value = '';
  document.getElementById('pName').value = '';
  document.getElementById('pRole').value = 'Managing Partner';
  document.getElementById('pShare').value = '';
  document.getElementById('pInvestment').value = '';
  document.getElementById('pJoinDate').value = new Date().toISOString().split('T')[0];
  document.getElementById('pPhone').value = '';
  document.getElementById('pEmail').value = '';
  document.getElementById('pNotes').value = '';

  document.getElementById('partnerModal').classList.add('active');
}

function openEditPartnerModal(id) {
  const partner = state.partners.find(p => p.id === id);
  if (!partner) return;

  document.getElementById('partnerModalTitle').innerText = `Edit Partner: ${partner.name}`;
  document.getElementById('partnerEditId').value = partner.id;
  document.getElementById('pName').value = partner.name;
  document.getElementById('pRole').value = partner.role;
  document.getElementById('pShare').value = partner.share;
  document.getElementById('pInvestment').value = partner.investment || '';
  document.getElementById('pJoinDate').value = partner.joinDate || '';
  document.getElementById('pPhone').value = partner.phone || '';
  document.getElementById('pEmail').value = partner.email || '';
  document.getElementById('pNotes').value = partner.notes || '';

  document.getElementById('partnerModal').classList.add('active');
}

function closePartnerModal() {
  document.getElementById('partnerModal').classList.remove('active');
}

function savePartner() {
  const editId = document.getElementById('partnerEditId').value;
  const name = document.getElementById('pName').value.trim();
  const role = document.getElementById('pRole').value;
  const share = parseFloat(document.getElementById('pShare').value);
  const investment = parseInt(document.getElementById('pInvestment').value, 10) || 0;
  const joinDate = document.getElementById('pJoinDate').value || new Date().toISOString().split('T')[0];
  const phone = document.getElementById('pPhone').value.trim();
  const email = document.getElementById('pEmail').value.trim();
  const notes = document.getElementById('pNotes').value.trim();

  if (!name || isNaN(share) || share <= 0 || share > 100) {
    showToast('Please provide a valid Partner Name and Equity Share (1% to 100%).', 'error');
    return;
  }

  if (editId) {
    const partner = state.partners.find(p => p.id === parseInt(editId, 10));
    if (partner) {
      partner.name = name;
      partner.role = role;
      partner.share = share;
      partner.investment = investment;
      partner.joinDate = joinDate;
      partner.phone = phone;
      partner.email = email;
      partner.notes = notes;
      showToast(`Partner "${name}" updated successfully!`, 'success');
    }
  } else {
    const newPartner = {
      id: Date.now(),
      name,
      role,
      share,
      investment,
      joinDate,
      phone,
      email,
      notes
    };
    state.partners.push(newPartner);
    showToast(`Partner "${name}" added with ${share}% equity share!`, 'success');
  }

  saveAllState();
  closePartnerModal();
  renderPartners();
}

function deletePartner(id) {
  const partner = state.partners.find(p => p.id === id);
  if (!partner) return;

  if (confirm(`Are you sure you want to remove partner "${partner.name}" (${partner.share}% share)?`)) {
    state.partners = state.partners.filter(p => p.id !== id);
    saveAllState();
    renderPartners();
    showToast(`Partner "${partner.name}" removed from registry.`, 'info');
  }
}

/* ============================================================================
   DATABASE ENGINE (INDEXEDDB + SERVER REST API DUAL-MODE)
   ============================================================================ */
let dbInstance = null;
const IDB_NAME = 'GrandRoyalPalaceDB';
const IDB_VERSION = 3;

function initIndexedDB() {
  if (!window.indexedDB) {
    console.warn('[Database] IndexedDB not supported by browser. Falling back to LocalStorage.');
    return;
  }

  const req = window.indexedDB.open(IDB_NAME, IDB_VERSION);

  req.onupgradeneeded = (e) => {
    const db = e.target.result;
    console.log('[IndexedDB] Upgrading schema tables...');
    
    // Create Object Stores / Tables if not present
    if (!db.objectStoreNames.contains('rooms')) {
      db.createObjectStore('rooms', { keyPath: 'room_no' });
    }
    if (!db.objectStoreNames.contains('bookings')) {
      db.createObjectStore('bookings', { keyPath: 'id' });
    }
    if (!db.objectStoreNames.contains('orders')) {
      db.createObjectStore('orders', { keyPath: 'id' });
    }
    if (!db.objectStoreNames.contains('staff')) {
      db.createObjectStore('staff', { keyPath: 'id' });
    }
    if (!db.objectStoreNames.contains('partners')) {
      db.createObjectStore('partners', { keyPath: 'id' });
    }
    if (!db.objectStoreNames.contains('menu')) {
      db.createObjectStore('menu', { keyPath: 'id' });
    }
    if (!db.objectStoreNames.contains('settings')) {
      db.createObjectStore('settings', { keyPath: 'key' });
    }
  };

  req.onsuccess = (e) => {
    dbInstance = e.target.result;
    console.log('[IndexedDB] Database connected successfully!');
    saveToIndexedDB();
    updateDatabaseConsole();
  };

  req.onerror = (e) => {
    console.error('[IndexedDB Error]', e.target.error);
  };
}

function saveToIndexedDB() {
  if (!dbInstance) return;

  try {
    const tx = dbInstance.transaction(['rooms', 'bookings', 'orders', 'staff', 'partners', 'menu', 'settings'], 'readwrite');
    
    // 1. Rooms
    const roomStore = tx.objectStore('rooms');
    state.rooms.forEach(r => roomStore.put(r));

    // 2. Bookings
    const bookStore = tx.objectStore('bookings');
    state.bookings.forEach(b => bookStore.put(b));

    // 3. Orders
    const orderStore = tx.objectStore('orders');
    state.orders.forEach(o => orderStore.put(o));

    // 4. Staff
    const staffStore = tx.objectStore('staff');
    state.staff.forEach(s => staffStore.put(s));

    // 5. Partners
    const partStore = tx.objectStore('partners');
    state.partners.forEach(p => partStore.put(p));

    // 6. Menu
    const menuStore = tx.objectStore('menu');
    state.menu.forEach(m => menuStore.put(m));

    // 7. Settings
    const setStore = tx.objectStore('settings');
    setStore.put({ key: 'hotelConfig', data: state.settings });

    tx.oncomplete = () => {
      updateDatabaseConsole();
    };
  } catch (err) {
    console.warn('[IndexedDB Sync Warning]', err);
  }
}

// Check Server Connection
async function checkServerConnection() {
  const serverUrl = window.location.protocol.startsWith('http') ? '' : 'http://localhost:3000';
  try {
    const res = await fetch(`${serverUrl}/api/status`, { method: 'GET' });
    if (res.ok) {
      const info = await res.json();
      state.serverConnected = true;
      state.serverUrl = serverUrl;
      const badge = document.getElementById('dbStatusBadge');
      const desc = document.getElementById('dbEngineDescription');
      if (badge) {
        badge.className = 'badge badge-available';
        badge.innerHTML = '🟢 Central Server Database Connected';
      }
      if (desc) {
        desc.innerHTML = `Central Database Engine: <b>Node.js Persistent File DB (${info.databaseFile || 'hotel_database.json'})</b>. Connected at <code>${serverUrl || window.location.origin}</code> with client-side IndexedDB cache.`;
      }
    }
  } catch (err) {
    state.serverConnected = false;
    const badge = document.getElementById('dbStatusBadge');
    if (badge) {
      badge.className = 'badge badge-available';
      badge.innerHTML = '🟢 Browser IndexedDB Active';
    }
  }
}

function updateDatabaseConsole() {
  const elRooms = document.getElementById('dbCountRooms');
  const elBookings = document.getElementById('dbCountBookings');
  const elOrders = document.getElementById('dbCountOrders');
  const elStaff = document.getElementById('dbCountStaff');
  const elPartners = document.getElementById('dbCountPartners');
  const elMenu = document.getElementById('dbCountMenu');

  if (elRooms) elRooms.innerText = `${(state.rooms || []).length} rows`;
  if (elBookings) elBookings.innerText = `${(state.bookings || []).length} rows`;
  if (elOrders) elOrders.innerText = `${(state.orders || []).length} rows`;
  if (elStaff) elStaff.innerText = `${(state.staff || []).length} rows`;
  if (elPartners) elPartners.innerText = `${(state.partners || []).length} rows`;
  if (elMenu) elMenu.innerText = `${(state.menu || []).length} rows`;
}

function syncDatabaseManual() {
  saveAllState();
  if (state.serverConnected) {
    const payload = {
      rooms: state.rooms,
      bookings: state.bookings,
      orders: state.orders,
      staff: state.staff,
      partners: state.partners,
      menu: state.menu,
      settings: state.settings
    };
    fetch(`${state.serverUrl || ''}/api/data`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(r => r.json()).then(data => {
      showToast('Database synchronized to central server & local IndexedDB!', 'success');
    }).catch(() => {
      showToast('Saved to browser IndexedDB and LocalStorage database.', 'success');
    });
  } else {
    showToast('Saved to browser IndexedDB and LocalStorage database.', 'success');
  }
  updateDatabaseConsole();
}

function vacuumDatabase() {
  // Re-verify room references
  state.rooms.forEach(r => {
    if (r.status === 'Occupied' && !r.bookingId) {
      const b = state.bookings.find(bk => bk.room === r.room_no && bk.status === 'Checked-In');
      if (b) {
        r.bookingId = b.id;
        r.currentGuest = b.guest;
      } else {
        r.status = 'Available';
        r.currentGuest = null;
      }
    }
  });

  saveAllState();
  updateDatabaseConsole();
  showToast('Database vacuumed, re-indexed and optimized with 100% integrity!', 'success');
}

/* ============================================================================
   GLOBAL KEYBOARD SHORTCUTS & EVENT LISTENERS
   ============================================================================ */
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeRoomModal();
    closeBookingModal();
    closeStaffModal();
    closeInvoiceModal();
    closeEditRoomPriceModal();
    closeBulkPriceModal();
    closeMenuManagerModal();
    closePartnerModal();
  }
});

// Window resize handler for canvas
window.addEventListener('resize', () => {
  const canvas = document.getElementById('virtualTourCanvas');
  if (canvas && canvas.parentElement) {
    canvas.width = canvas.parentElement.clientWidth;
  }
});

/* ============================================================================
   BOOTSTRAP APPLICATION
   ============================================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initState();
  initIndexedDB();
  checkServerConnection();
  startLiveClock();
  renderDashboard();
  renderCatalog();
  renderRestaurantPOS();
  renderStaff();
  renderBookings();
  renderPartners();
  updateDatabaseConsole();
});

// Run directly in case DOMContentLoaded has already fired
if (document.readyState === 'complete' || document.readyState === 'interactive') {
  initState();
  initIndexedDB();
  checkServerConnection();
  startLiveClock();
  renderDashboard();
  renderCatalog();
  renderRestaurantPOS();
  renderStaff();
  renderBookings();
  renderPartners();
  updateDatabaseConsole();
}
