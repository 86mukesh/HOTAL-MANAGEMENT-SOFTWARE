# 👑 Grand Royal Palace - Luxury 5-Star Hotel Management System (PMS)

A comprehensive, state-of-the-art **Property Management System (PMS)** and **Food & Beverage (F&B) Point of Sale (POS)** designed for luxury 5-star hotels, resorts, and boutique hospitality properties.

---

## 🌟 Key Features & Capabilities

### 1. 🎛️ Live Dashboard & Real-Time KPI Analytics
- **Live Occupancy Gauge**: Visual multi-segment bar displaying real-time occupancy percentages (`Available`, `Occupied`, `Housekeeping / Cleaning`, `Maintenance`).
- **Financial Metrics**: Real-time room revenue, dining sales, active bookings count, and monthly payroll tracking with Indian Rupee (`₹`) formatting.
- **Interactive 45-Room Matrix**:
  - 45 Luxury suites spread across 3 floors (Deluxe 101-115, Executive Suites 201-215, Presidential Suites 301-315).
  - Color-coded live status with guest name badges.
  - Live search by room number, suite type, or guest name.
  - Status quick filters (`All`, `Available`, `Occupied`, `Cleaning`).

### 2. 📅 Per-Day Income & Daily Revenue Tracker (प्रति दिन की कमाई)
- **Daily Financial Audit**: Real-time breakdown of total income earned on any chosen date.
- **Combined Tracking**: Room Bookings Revenue + Restaurant Dining Orders = Total Day Income.
- **Date Picker & Quick Filters**: Pick any date or use `[Today]` and `[Yesterday]` shortcuts.
- **Itemized Day Breakdown**: View every individual room booking and dining ticket recorded on that specific date.

### 3. 🛏️ Luxury Room Catalog, 360° Virtual Tour & Price Editor
- **Room Price Editing**: Change any room's price per night directly with the **"✏️ Edit Price"** button in the details modal or on room cards.
- **Bulk Category Tariffs**: Option to update standard pricing for all 15 rooms in a suite category (Deluxe, Executive Suite, Presidential Suite) with a single click.
- **High-Definition Imagery**: Curated high-resolution architectural photography for each category.
- **Interactive 360° Panorama Simulator**: HTML5 Canvas engine with drag-to-pan physics and ambient perspective rendering.
- **Housekeeping Quick-Switch**: Instantly mark rooms as `Available`, `Housekeeping`, `Maintenance`, or `Occupied`.
- **Suite Specifications**: Square footage, bed types, luxury amenities, and pricing per night.

### 4. 🍽️ Dining & Room Service POS & Menu Price Manager
- **Menu Price Manager**: Change any dish's price or add new custom dishes with description and category using **"✏️ Edit Menu Prices & Add Dish"**.
- **Categorized Menu**: Starters, Main Course, Luxury Desserts, and Artisanal Beverages with pricing and descriptions.
- **Folio Billing**: Direct room service charging linked to occupied guest rooms.
- **Date-Tracked Orders**: Orders are recorded with date and time stamps for daily revenue reporting.
- **Cart Controls**: Add items, adjust quantities (`+` / `-`), calculate subtotal in real-time.
- **Order Tickets**: Live order feed with timestamps and bill status.

### 4. 👥 Staff & Payroll Management
- **Staff Directory**: Roles (General Manager, Front Desk, Housekeeping, Executive Chef, Security), shift timings, and joining dates.
- **1-Click Salary Disbursement**: Easily toggle employee salary between `Paid` and `Pending`.
- **Financial Overview**: Total monthly payroll expenditure and paid/pending employee count.
- **CRUD Operations**: Add new staff members or remove records.

### 5. 🤝 Hotel Owners & Partners Management (होटल मालिक व पार्टनर)
- **Partner Registry**: Add, view, edit, and remove hotel business partners and owners.
- **Equity Share Allocation**: Set and adjust ownership percentage shares (%) with a real-time equity distribution visual bar.
- **Capital Investment Tracking**: Track capital invested by each partner.
- **Real-Time Revenue Distribution**: Automatic calculation of estimated revenue profit shares based on live hotel revenues (Rooms + Dining).
- **Edit & Management Modals**: Update partner roles, contact details, equity shares, and legal notes anytime with **"✏️ Edit"**.

### 6. 📋 Reservations & GST Tax Invoicing
- **Check-in Engine**: Guest registration with contact information, ID proof (Aadhaar, Passport, Driving License), guest count, check-in/out dates, and automated night/rate calculation.
- **Check-Out & Settlement**: Settle total room bill + all dining orders in one click; automatically releases the room to Housekeeping (`Cleaning`).
- **Official GST Tax Invoice**:
  - Printable guest and stay details, room tariff, and itemized room-service orders when order records are available.
  - Indian GST calculation: CGST (6%), SGST (6%), and Luxury Hospitality Cess (2%).
  - Selectable 10% and 20% invoice offers; the chosen discount is saved with the booking and applied before GST.
  - Draw and save a guest electronic signature with a mouse, stylus, or touch screen; the saved signature appears on the invoice and stays with its booking.
  - One-click print / save to PDF with dedicated responsive `@media print` styling.

### 7. 🗄️ Dual-Mode Database Engine & Central Server
- **Browser IndexedDB Engine**: High-performance, multi-megabyte structured database built into the browser (`GrandRoyalPalaceDB`). Supports ACID transactions across separate Object Stores (`rooms`, `bookings`, `orders`, `staff`, `partners`, `menu`, `settings`).
- **Browser storage**: The app also mirrors data in LocalStorage for quick startup and offline use. Browser-only mode stores data on that device and browser profile.
- **Central Node.js REST API Server (`server.js`)**:
  - Run the hotel database on a central machine so multiple computers, front-desk staff, and managers can access the exact same data simultaneously!
  - Optional MySQL persistence with separate tables for rooms, bookings, dining orders, staff, partners, menu items, hotel settings, and database metadata.
  - JSON file persistence (`hotel_database.json`) remains available when MySQL is not configured.
  - When the central server is connected, saved records (including booking signatures) are synced to the server's configured database.
  - Dining POS dish photos can be uploaded through `POST /api/menu-image`; uploaded files are stored under `uploads/menu-images/`, and their URLs are saved with menu items through the existing `/api/menu` and `/api/data` APIs. In browser-only mode, compressed photos stay in that browser's local data.
- **1-Click Server Launcher (`start-server.bat`)**: Double-click on Windows to start the database server instantly on `http://localhost:3000`.
- **Database Management Console**: Real-time table row counters, manual database synchronization, database optimization & vacuuming, JSON export & restore.

---

## 🚀 How to Run

### Option 1: Direct Offline Browser (Zero Setup)
1. Double-click `index.html` in any web browser.
2. The system automatically initializes the **Browser IndexedDB Database** with full offline persistence.

### Option 2: Central Database Server (Multi-Device / Network)
1. Install the project dependencies by running `npm install`.
2. To use MySQL, create a database and configure the connection in a `.env` file (see [MySQL setup](#mysql-setup)). Without MySQL settings, the server uses `hotel_database.json`.
3. Double-click **`start-server.bat`** (or run `npm start` in terminal).
4. Open `http://localhost:3000` in any web browser on your computer or local network!
5. The software connects to the central database and loads its saved data. When connecting to an empty server for the first time, the current browser data is copied to it.

### MySQL Setup
1. Create a database in MySQL, for example:
   ```sql
   CREATE DATABASE hotel_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
2. Copy `.env.example` to `.env` and set `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_DATABASE`, `MYSQL_USER`, and `MYSQL_PASSWORD` for your MySQL server.
3. Run `npm install` and then start the app. The server creates its required tables automatically. Keep `.env` private; it contains database credentials.
4. Existing records from `hotel_database.json` are imported automatically when the configured MySQL tables are empty.

---

## 📂 Project Architecture

```
Hotel Management Software/
├── index.html          # Clean HTML5 UI, modals, database management console
├── style.css           # Imperial Gold luxury styling, responsive grid & print stylesheet
├── script.js           # Core PMS logic, IndexedDB client database & REST API connector
├── server.js           # Central REST Database Server (MySQL or JSON-file storage)
├── start-server.bat    # 1-Click Windows launcher for the database server
├── package.json        # Node.js project configuration
├── .env.example        # MySQL connection settings template
└── README.md           # Documentation & user manual
```
