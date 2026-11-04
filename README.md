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
  - Itemized breakdown of room tariff and room service dining charges.
  - Indian GST calculation: CGST (6%), SGST (6%), and Luxury Hospitality Cess (2%).
  - One-click print / save to PDF with dedicated `@media print` styling (no headers, footers, or UI buttons on paper).

### 7. 🗄️ Dual-Mode Database Engine & Central Server
- **Browser IndexedDB Engine**: High-performance, multi-megabyte structured database built into the browser (`GrandRoyalPalaceDB`). Supports ACID transactions across separate Object Stores (`rooms`, `bookings`, `orders`, `staff`, `partners`, `menu`, `settings`).
- **Central Node.js REST API Server (`server.js`)**:
  - Run the hotel database on a central machine so multiple computers, front-desk staff, and managers can access the exact same data simultaneously!
  - Persistent disk file: `hotel_database.json`.
  - Zero-dependency architecture (pure Node.js standard library, no npm install required).
- **1-Click Server Launcher (`start-server.bat`)**: Double-click on Windows to start the database server instantly on `http://localhost:3000`.
- **Database Management Console**: Real-time table row counters, manual database synchronization, database optimization & vacuuming, JSON export & restore.

---

## 🚀 How to Run

### Option 1: Direct Offline Browser (Zero Setup)
1. Double-click `index.html` in any web browser.
2. The system automatically initializes the **Browser IndexedDB Database** with full offline persistence.

### Option 2: Central Database Server (Multi-Device / Network)
1. Double-click **`start-server.bat`** (or run `node server.js` in terminal).
2. Open `http://localhost:3000` in any web browser on your computer or local network!
3. The software will connect to the central persistent disk database (`hotel_database.json`).

---

## 📂 Project Architecture

```
Hotel Management Software/
├── index.html          # Clean HTML5 UI, modals, database management console
├── style.css           # Imperial Gold luxury styling, responsive grid & print stylesheet
├── script.js           # Core PMS logic, IndexedDB client database & REST API connector
├── server.js           # Pure Node.js Central REST Database Server (zero-dependency)
├── start-server.bat    # 1-Click Windows launcher for the database server
├── package.json        # Node.js project configuration
└── README.md           # Documentation & user manual
```
