const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.resolve(__dirname);
const DATA_FILE = path.join(__dirname, 'backend', 'data.json');
const FORECAST_FILE = fs.existsSync(path.join(__dirname, 'ai_ml_engine', 'data', 'mandi_live_analytics.json'))
  ? path.join(__dirname, 'ai_ml_engine', 'data', 'mandi_live_analytics.json')
  : path.join(__dirname, 'ai_ml_engine', 'data', 'processed', 'latest_mandi_forecasts.json');

// Ensure backend data directory exists
if (!fs.existsSync(path.join(__dirname, 'backend'))) {
  fs.mkdirSync(path.join(__dirname, 'backend'), { recursive: true });
}

// Initial Database Seeds
const DEFAULT_DATA = {
  profile: {
    name: "Ramesh Patil",
    farmer_id: "FARM-88210",
    phone: "+91 98421 88390",
    location: "Nashik, Maharashtra",
    bank_name: "HDFC Bank Ltd.",
    account_no: "•••• •••• 8821",
    ifsc: "HDFC0001234",
    upi_id: "ramesh.patil@okhdfcbank"
  },
  crops: [
    {
        "id": "LOT-TOM-01",
        "farmer_name": "Ramesh Patil",
        "crop": "Tomato",
        "variety": "Shivam Hybrid",
        "category": "Vegetables",
        "shelf_life": "3 Days (Perishable)",
        "quantity_qt": 50,
        "quantity_kg": 5000,
        "quantity": "50 Qt (5,000 kg)",
        "quantityNumber": 50,
        "price_per_qt": 1200,
        "price_per_kg": 12.0,
        "expectedPrice": "\u20b9 12.00 /kg (\u20b9 1,200 /Qt)",
        "expectedPriceNumber": 1200,
        "bestBid": "\u20b9 12.50 /kg (\u20b9 1,250 /Qt)",
        "bestBidNumber": 1250,
        "buyerName": "AgriFoods Ltd.",
        "state": "Maharashtra",
        "district": "Nashik",
        "mandi": "Nashik APMC Mandi",
        "grade": "Grade A",
        "gradeBadgeClass": "badge-grade-a",
        "image": "assets/images/tomato.jpg",
        "status": "Active (Bids Open)",
        "statusBadgeClass": "badge-status-open",
        "created_at": "2026-09-13T14:30:00.000Z"
    },
    {
        "id": "LOT-ONI-02",
        "farmer_name": "Ramesh Patil",
        "crop": "Red Onion",
        "variety": "Nashik Quality",
        "category": "Vegetables",
        "shelf_life": "25 Days",
        "quantity_qt": 30,
        "quantity_kg": 3000,
        "quantity": "30 Qt (3,000 kg)",
        "quantityNumber": 30,
        "price_per_qt": 900,
        "price_per_kg": 9.0,
        "expectedPrice": "\u20b9 9.00 /kg (\u20b9 900 /Qt)",
        "expectedPriceNumber": 900,
        "bestBid": "\u20b9 9.50 /kg (\u20b9 950 /Qt)",
        "bestBidNumber": 950,
        "buyerName": "Global Grains Direct",
        "state": "Maharashtra",
        "district": "Nashik",
        "mandi": "Lasalgaon Mandi Yard",
        "grade": "Grade B",
        "gradeBadgeClass": "badge-grade-b",
        "image": "assets/images/onion.jpg",
        "status": "Negotiation",
        "statusBadgeClass": "badge-status-negotiation",
        "created_at": "2026-09-13T14:30:00.000Z"
    },
    {
        "id": "LOT-PAD-03",
        "farmer_name": "Ramesh Patil",
        "crop": "Paddy",
        "variety": "1121 Basmati",
        "category": "Grains & Cereals",
        "shelf_life": "180 Days",
        "quantity_qt": 100,
        "quantity_kg": 10000,
        "quantity": "100 Qt (10,000 kg)",
        "quantityNumber": 100,
        "price_per_qt": 2000,
        "price_per_kg": 20.0,
        "expectedPrice": "\u20b9 20.00 /kg (\u20b9 2,000 /Qt)",
        "expectedPriceNumber": 2000,
        "bestBid": "\u20b9 20.80 /kg (\u20b9 2,080 /Qt)",
        "bestBidNumber": 2080,
        "buyerName": "Fresh Mart Wholesale",
        "state": "Maharashtra",
        "district": "Nashik",
        "mandi": "Nashik Central Agro Warehouse",
        "grade": "Grade A",
        "gradeBadgeClass": "badge-grade-a",
        "image": "assets/images/paddy.jpg",
        "status": "Dispatched",
        "statusBadgeClass": "badge-status-dispatched",
        "created_at": "2026-09-13T14:30:00.000Z"
    },
    {
        "id": "LOT-CHL-04",
        "farmer_name": "Ramesh Patil",
        "crop": "Green Chilli",
        "variety": "G4 Spicy",
        "category": "Spices & High-Value",
        "shelf_life": "5 Days (Perishable)",
        "quantity_qt": 25,
        "quantity_kg": 2500,
        "quantity": "25 Qt (2,500 kg)",
        "quantityNumber": 25,
        "price_per_qt": 3200,
        "price_per_kg": 32.0,
        "expectedPrice": "\u20b9 32.00 /kg (\u20b9 3,200 /Qt)",
        "expectedPriceNumber": 3200,
        "bestBid": "\u20b9 33.50 /kg (\u20b9 3,350 /Qt)",
        "bestBidNumber": 3350,
        "buyerName": "Spices Exim Hub",
        "state": "Maharashtra",
        "district": "Nashik",
        "mandi": "Pimpalgaon APMC",
        "grade": "Grade A",
        "gradeBadgeClass": "badge-grade-a",
        "image": "assets/images/chilli.jpg",
        "status": "Active (Bids Open)",
        "statusBadgeClass": "badge-status-open",
        "created_at": "2026-09-13T14:30:00.000Z"
    },
    {
        "id": "LOT-COT-05",
        "farmer_name": "Ramesh Patil",
        "crop": "Raw Cotton",
        "variety": "MCU-5 Long Staple",
        "category": "Cash Crops",
        "shelf_life": "365 Days",
        "quantity_qt": 80,
        "quantity_kg": 8000,
        "quantity": "80 Qt (8,000 kg)",
        "quantityNumber": 80,
        "price_per_qt": 5800,
        "price_per_kg": 58.0,
        "expectedPrice": "\u20b9 58.00 /kg (\u20b9 5,800 /Qt)",
        "expectedPriceNumber": 5800,
        "bestBid": "\u20b9 59.50 /kg (\u20b9 5,950 /Qt)",
        "bestBidNumber": 5950,
        "buyerName": "Malegaon Cotton Textiles",
        "state": "Maharashtra",
        "district": "Nashik",
        "mandi": "Malegaon Mandi Yard",
        "grade": "Grade A",
        "gradeBadgeClass": "badge-grade-a",
        "image": "assets/images/cotton.jpg",
        "status": "Negotiation",
        "statusBadgeClass": "badge-status-negotiation",
        "created_at": "2026-09-13T14:30:00.000Z"
    },
    {
        "id": "LOT-OKR-06",
        "farmer_name": "Ramesh Patil",
        "crop": "Fresh Okra",
        "variety": "Ladyfinger",
        "category": "Vegetables",
        "shelf_life": "2 Days (Perishable)",
        "quantity_qt": 20,
        "quantity_kg": 2000,
        "quantity": "20 Qt (2,000 kg)",
        "quantityNumber": 20,
        "price_per_qt": 1600,
        "price_per_kg": 16.0,
        "expectedPrice": "\u20b9 16.00 /kg (\u20b9 1,600 /Qt)",
        "expectedPriceNumber": 1600,
        "bestBid": "\u20b9 16.80 /kg (\u20b9 1,680 /Qt)",
        "bestBidNumber": 1680,
        "buyerName": "Annapoorna Caterers",
        "state": "Maharashtra",
        "district": "Nashik",
        "mandi": "Nashik APMC Mandi",
        "grade": "Grade B",
        "gradeBadgeClass": "badge-grade-b",
        "image": "assets/images/okra.jpg",
        "status": "Active (Bids Open)",
        "statusBadgeClass": "badge-status-open",
        "created_at": "2026-09-13T14:30:00.000Z"
    },
    {
        "id": "LOT-TUR-07",
        "farmer_name": "Ramesh Patil",
        "crop": "Salem Turmeric Finger",
        "variety": "High Curcumin",
        "category": "Spices & High-Value",
        "shelf_life": "365 Days",
        "quantity_qt": 25,
        "quantity_kg": 2500,
        "quantity": "25 Qt (2,500 kg)",
        "quantityNumber": 25,
        "price_per_qt": 14100,
        "price_per_kg": 141.0,
        "expectedPrice": "\u20b9 141.00 /kg (\u20b9 14,100 /Qt)",
        "expectedPriceNumber": 14100,
        "bestBid": "\u20b9 143.00 /kg (\u20b9 14,300 /Qt)",
        "bestBidNumber": 14300,
        "buyerName": "Aroma Spices International",
        "state": "Maharashtra",
        "district": "Sangli",
        "mandi": "Sangli Spices Hub",
        "grade": "Grade A Export Quality",
        "gradeBadgeClass": "badge-grade-a",
        "image": "assets/images/turmeric.jpg",
        "status": "Active (Bids Open)",
        "statusBadgeClass": "badge-status-open",
        "created_at": "2026-09-13T14:30:00.000Z"
    }
],
  bids: [
    {
        "id": 101,
        "crop_id": "LOT-TOM-01",
        "crop": "Tomato (Shivam Hybrid)",
        "variety": "Shivam Hybrid",
        "buyer_name": "AgriFoods Ltd.",
        "buyer_phone": "+91 98234 11223",
        "buyer_type": "National Supermarket Retailer",
        "buyer_rating": "4.9 \u2605 (Verified Corporate)",
        "bid_rate_qt": 1250,
        "bid_rate_kg": 12.5,
        "mandi_ref_kg": 11.5,
        "mandi_ref_qt": 1150,
        "premium_pct": "+8.7%",
        "quantity_qt": 50,
        "quantity_kg": 5000,
        "total_value": 62500,
        "advance_35": 21875,
        "balance_65": 40625,
        "status": "Pending",
        "time_ago": "15 mins ago",
        "expires_in": "2 hours",
        "payment_terms": "100% Escrow Protected (35% on dispatch, 65% on delivery)"
    },
    {
        "id": 102,
        "crop_id": "LOT-ONI-02",
        "crop": "Red Onion (Nashik Quality)",
        "variety": "Nashik Quality",
        "buyer_name": "Global Grains Direct",
        "buyer_phone": "+91 98110 55432",
        "buyer_type": "Export Processing House",
        "buyer_rating": "4.8 \u2605 (Escrow Guaranteed)",
        "bid_rate_qt": 950,
        "bid_rate_kg": 9.5,
        "mandi_ref_kg": 9.0,
        "mandi_ref_qt": 900,
        "premium_pct": "+5.5%",
        "quantity_qt": 30,
        "quantity_kg": 3000,
        "total_value": 28500,
        "advance_35": 9975,
        "balance_65": 18525,
        "status": "Negotiation",
        "time_ago": "40 mins ago",
        "expires_in": "4 hours",
        "payment_terms": "100% Escrow Protected (35% on dispatch, 65% on delivery)"
    },
    {
        "id": 103,
        "crop_id": "LOT-PAD-03",
        "crop": "Paddy (1121 Basmati)",
        "variety": "1121 Basmati",
        "buyer_name": "Fresh Mart Wholesale",
        "buyer_phone": "+91 98765 43210",
        "buyer_type": "Rice Mill & Grain Exporter",
        "buyer_rating": "4.95 \u2605 (Verified Hub)",
        "bid_rate_qt": 2080,
        "bid_rate_kg": 20.8,
        "mandi_ref_kg": 20.0,
        "mandi_ref_qt": 2000,
        "premium_pct": "+4.0%",
        "quantity_qt": 100,
        "quantity_kg": 10000,
        "total_value": 208000,
        "advance_35": 72800,
        "balance_65": 135200,
        "status": "Accepted",
        "time_ago": "1 hour ago",
        "expires_in": "Confirmed",
        "payment_terms": "100% Escrow Protected (35% on dispatch, 65% on delivery)"
    },
    {
        "id": 104,
        "crop_id": "LOT-CHL-04",
        "crop": "Green Chilli (G4 Spicy)",
        "variety": "G4 Spicy",
        "buyer_name": "Spices Exim Hub",
        "buyer_phone": "+91 97654 32109",
        "buyer_type": "Spices Trading Consortium",
        "buyer_rating": "4.9 \u2605 (A Grade Buyer)",
        "bid_rate_qt": 3350,
        "bid_rate_kg": 33.5,
        "mandi_ref_kg": 32.0,
        "mandi_ref_qt": 3200,
        "premium_pct": "+4.7%",
        "quantity_qt": 25,
        "quantity_kg": 2500,
        "total_value": 83750,
        "advance_35": 29312,
        "balance_65": 54438,
        "status": "Pending",
        "time_ago": "25 mins ago",
        "expires_in": "3 hours",
        "payment_terms": "100% Escrow Protected (35% on dispatch, 65% on delivery)"
    },
    {
        "id": 105,
        "crop_id": "LOT-COT-05",
        "crop": "Raw Cotton (MCU-5 Long Staple)",
        "variety": "MCU-5 Long Staple",
        "buyer_name": "Malegaon Cotton Textiles",
        "buyer_phone": "+91 98220 77611",
        "buyer_type": "Textile Spinning Mills",
        "buyer_rating": "4.85 \u2605 (Verified)",
        "bid_rate_qt": 5950,
        "bid_rate_kg": 59.5,
        "mandi_ref_kg": 58.0,
        "mandi_ref_qt": 5800,
        "premium_pct": "+2.6%",
        "quantity_qt": 80,
        "quantity_kg": 8000,
        "total_value": 476000,
        "advance_35": 166600,
        "balance_65": 309400,
        "status": "Negotiation",
        "time_ago": "2 hours ago",
        "expires_in": "5 hours",
        "payment_terms": "100% Escrow Protected (35% on dispatch, 65% on delivery)"
    },
    {
        "id": 106,
        "crop_id": "LOT-OKR-06",
        "crop": "Fresh Okra (Ladyfinger)",
        "variety": "Ladyfinger",
        "buyer_name": "Annapoorna Caterers",
        "buyer_phone": "+91 94231 44556",
        "buyer_type": "Institutional Catering Supply",
        "buyer_rating": "4.8 \u2605 (Verified Direct)",
        "bid_rate_qt": 1680,
        "bid_rate_kg": 16.8,
        "mandi_ref_kg": 16.0,
        "mandi_ref_qt": 1600,
        "premium_pct": "+5.0%",
        "quantity_qt": 20,
        "quantity_kg": 2000,
        "total_value": 33600,
        "advance_35": 11760,
        "balance_65": 21840,
        "status": "Pending",
        "time_ago": "5 mins ago",
        "expires_in": "1 hour",
        "payment_terms": "100% Escrow Protected (35% on dispatch, 65% on delivery)"
    },
    {
        "id": 107,
        "crop_id": "LOT-TUR-07",
        "crop": "Salem Turmeric Finger (High Curcumin)",
        "variety": "High Curcumin",
        "buyer_name": "Aroma Spices International",
        "buyer_phone": "+91 94432 88190",
        "buyer_type": "Export Processing House",
        "buyer_rating": "4.95 \u2605 (Top Tier)",
        "bid_rate_qt": 14300,
        "bid_rate_kg": 143.0,
        "mandi_ref_kg": 141.0,
        "mandi_ref_qt": 14100,
        "premium_pct": "+1.4%",
        "quantity_qt": 25,
        "quantity_kg": 2500,
        "total_value": 357500,
        "advance_35": 125125,
        "balance_65": 232375,
        "status": "Pending",
        "time_ago": "10 mins ago",
        "expires_in": "6 hours",
        "payment_terms": "100% Escrow Protected (35% on dispatch, 65% on delivery)"
    }
],
  fpo_pools: [
    {
      id: "POOL-ONI-01",
      pool_name: "Nashik Red Onion Export Pool",
      crop: "Onion (Nashik Red)",
      buyer_name: "NatureFresh Gulf Exports",
      target_qt: 500,
      current_qt: 380,
      floor_price_qt: 2900,
      floor_price_kg: 29.00,
      min_contribution: "20 Qt",
      closing_date: "2026-09-20",
      destination: "JNPT Port Container Terminal, Mumbai",
      contributors_count: 14,
      status: "Open"
    },
    {
      id: "POOL-POT-02",
      pool_name: "Maharashtra Potato Processing Pool",
      crop: "Potato (Processing Jyoti)",
      buyer_name: "Balaji & Haldiram Snacks Consortium",
      target_qt: 800,
      current_qt: 620,
      floor_price_qt: 1950,
      floor_price_kg: 19.50,
      min_contribution: "30 Qt",
      closing_date: "2026-09-22",
      destination: "Navi Mumbai Processing Facility, Maharashtra",
      contributors_count: 22,
      status: "Open"
    },
    {
      id: "POOL-COT-03",
      pool_name: "Central Saurashtra Cotton Lot",
      crop: "Cotton (Medium Staple 29mm)",
      buyer_name: "Vardhman Spinning Mills",
      target_qt: 400,
      current_qt: 400,
      floor_price_qt: 7200,
      floor_price_kg: 72.00,
      min_contribution: "15 Qt",
      closing_date: "2026-09-15",
      destination: "Ahmedabad Textile Hub",
      contributors_count: 18,
      status: "Full"
    }
  ],
  escrow_contracts: [
    {
      contract_no: "ESC-2026-0891",
      bank_ref: "HDFC-ESC-908123",
      crop: "Potato",
      variety: "Jyoti Grade A (120 Qt / 12,000 kg)",
      buyer: "Balaji Wafers Procurement",
      total_amount: 222000,
      advance_amount: 77700,
      advance_status: "Disbursed (UTR: HDFC9901824)",
      balance_amount: 144300,
      balance_status: "Locked in Nodal Escrow",
      overall_status: "Advance Disbursed, Balance Locked",
      date: "Today, 09:30 AM"
    },
    {
      contract_no: "ESC-2026-0842",
      bank_ref: "HDFC-ESC-884102",
      crop: "Tomato",
      variety: "Hybrid Red (40 Qt / 4,000 kg)",
      buyer: "Swiggy Instamart Agri",
      total_amount: 96000,
      advance_amount: 33600,
      advance_status: "Disbursed (UTR: HDFC8829104)",
      balance_amount: 62400,
      balance_status: "Locked in Nodal Escrow (Transit)",
      overall_status: "In Transit Escrow",
      date: "Yesterday"
    },
    {
      contract_no: "ESC-2026-0799",
      bank_ref: "HDFC-ESC-772910",
      crop: "Wheat",
      variety: "Sharbati Lokwan (100 Qt / 10,000 kg)",
      buyer: "Aashirvaad ITC Foods",
      total_amount: 260000,
      advance_amount: 91000,
      advance_status: "Settled",
      balance_amount: 169000,
      balance_status: "Settled (UTR: HDFC7710291)",
      overall_status: "100% Settled & Released",
      date: "10 Sep 2026"
    }
  ],
  shipments: [
    {
      tracking_id: "TRK-9884",
      gate_pass: "GP-2026-9884",
      contract_no: "ESC-2026-0842",
      crop: "Tomato",
      variety: "Hybrid Red (Grade A)",
      quantity_qt: 40,
      quantity_kg: 4000,
      buyer: "Swiggy Instamart Agri",
      destination: "Swiggy Central DC, Bhiwandi, Maharashtra",
      driver: "Dinesh Yadav",
      phone: "+91 97230 44819",
      vehicle: "MH-12-AQ-9011 (Tata 407)",
      status: "transit",
      step: 3,
      current_loc: "Nashik-Mumbai Expressway KM 45",
      speed: "54 km/h",
      eta: "Tomorrow, 8:00 AM",
      total_value: 96000,
      advance_paid: 33600,
      image: "assets/images/tomato.jpg"
    },
    {
      tracking_id: "TRK-9921",
      gate_pass: "GP-2026-9921",
      contract_no: "ESC-2026-0891",
      crop: "Potato",
      variety: "Jyoti Grade A Processing Chip Grade",
      quantity_qt: 120,
      quantity_kg: 12000,
      buyer: "Balaji Wafers Procurement",
      destination: "Bhiwandi Agro Hub, Mumbai, Maharashtra",
      driver: "Sukhdev Singh",
      phone: "+91 98450 11992",
      vehicle: "GJ-05-BX-4412 (Eicher 14-ft)",
      status: "scheduled",
      step: 2,
      current_loc: "Vehicle Assigned • Arriving at Farm 02:00 PM",
      speed: "0 km/h",
      eta: "Today, 4:30 PM",
      total_value: 222000,
      image: "assets/images/potato.jpg"
    }
  ],
  grievances: [
    {
      id: "GRV-2026-104",
      farmer_name: "Ramesh Patil",
      category: "Logistics Pickup Schedule",
      lot_ref: "LOT-ONI-02 (Nashik Red Onion)",
      subject: "Truck gate pass delay at Nashik APMC Mandi Gate 2",
      description: "Produce has been packed and weighed. Logistics truck driver requested an updated digital gate pass for weighbridge clearance.",
      priority: "High",
      status: "Under Review",
      status_badge: "badge-status-emergency",
      filed_date: "Today, 10:15 AM",
      assigned_officer: "Nashik APMC Mandi Officer - V. Kulkarni",
      sla_hours: 24,
      steps: [
        { title: "Grievance Logged", done: true, time: "10:15 AM" },
        { title: "Mandi Officer Assigned", done: true, time: "10:45 AM" },
        { title: "Escrow & Logistics Audit", done: false, time: "In Progress" },
        { title: "Gate Pass Clearance", done: false, time: "Target: 02:00 PM" }
      ],
      created_at: new Date().toISOString()
    },
    {
      id: "GRV-2026-081",
      farmer_name: "Ramesh Patil",
      category: "Payment / Escrow Advance",
      lot_ref: "LOT-TOM-01 (Reliance Retail Hub)",
      subject: "Verification of 35% Advance Escrow Release",
      description: "Consignment dispatched yesterday. Requesting confirmation of 35% advance deposit in linked HDFC bank account.",
      priority: "Medium",
      status: "Resolved & Credited",
      status_badge: "badge-status-open",
      filed_date: "12 Sep 2026",
      assigned_officer: "AgriNex Nodal Escrow Desk - P. Sharma",
      sla_hours: 12,
      steps: [
        { title: "Grievance Logged", done: true, time: "12 Sep, 09:30 AM" },
        { title: "Nodal Desk Verified", done: true, time: "12 Sep, 10:00 AM" },
        { title: "Bank IMPS Release", done: true, time: "12 Sep, 11:15 AM" },
        { title: "Disbursed to Farmer A/C", done: true, time: "12 Sep, 11:20 AM" }
      ],
      resolution_note: "₹38,587 advance credited via IMPS (UTR: HDFC9901824). Remaining 65% locked under escrow.",
      created_at: new Date(Date.now() - 86400000).toISOString()
    }
  ]
};

function loadDB() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const parsed = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
      // Ensure all top-level keys exist
      return Object.assign({}, DEFAULT_DATA, parsed);
    }
  } catch (e) {
    console.error('Error loading data.json:', e.message);
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(DEFAULT_DATA, null, 2), 'utf8');
  return DEFAULT_DATA;
}

function saveDB(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error('Error saving data.json:', e.message);
  }
}

let db = loadDB();

const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

function sendJSON(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Cache-Control': 'no-cache'
  });
  res.end(JSON.stringify(payload));
}

function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (e) {
        resolve({});
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end();
    return;
  }

  const [urlPath, queryString] = req.url.split('?');
  const queryParams = new URLSearchParams(queryString || '');

  // ================= API ROUTES =================
  if (urlPath.startsWith('/api/')) {
    db = loadDB();
    // 1. Health
    if (urlPath === '/api/health') {
      return sendJSON(res, 200, {
        status: 'online',
        app: 'AgriNex Unified Farmer API Backend',
        node_version: process.version,
        time: new Date().toISOString()
      });
    }

    // 2. Dashboard Unified Summary
    if (urlPath === '/api/dashboard/stats' || urlPath === '/api/dashboard/summary') {
      const totalEscrow = db.escrow_contracts.reduce((sum, c) => sum + (c.total_amount || 0), 0);
      const totalAdvance = db.escrow_contracts.reduce((sum, c) => sum + (c.advance_amount || 0), 0);

      return sendJSON(res, 200, {
        profile: db.profile,
        stats: {
          total_lots: db.crops.length,
          active_bids: db.bids.filter(b => b.status === 'Pending').length,
          in_transit_shipments: db.shipments.filter(s => s.status === 'transit').length,
          total_escrow_protected: totalEscrow,
          advance_disbursed: totalAdvance,
          estimated_profit: "₹ " + Math.round(totalEscrow * 0.88).toLocaleString()
        },
        recent_crops: db.crops.slice(0, 4),
        recent_bids: db.bids.slice(0, 4),
        recent_shipments: db.shipments.slice(0, 2)
      });
    }

    // 3. Crops Endpoints
    if (urlPath === '/api/crops') {
      if (req.method === 'GET') {
        let list = [...db.crops];
        const status = queryParams.get('status');
        const category = queryParams.get('category');
        if (status) list = list.filter(c => c.status.toLowerCase().includes(status.toLowerCase()));
        if (category) list = list.filter(c => c.category.toLowerCase() === category.toLowerCase());
        return sendJSON(res, 200, list);
      }
      if (req.method === 'POST') {
        const body = await parseBody(req);
        const qtyQt = Number(body.quantity_qt || body.quantityNumber || 50);
        const priceQt = Number(body.price_per_qt || body.expectedPriceNumber || 2000);
        const priceKg = Number((priceQt / 100).toFixed(2));
        const cropName = body.crop_name || body.crop || "Produce";
        const variety = body.variety || "Standard";

        // Auto-assign matching image
        let cropImage = body.image || body.image_url || "";
        if (!cropImage) {
          const lower = cropName.toLowerCase();
          if (lower.includes('tomato')) cropImage = 'assets/images/tomato.jpg';
          else if (lower.includes('onion')) cropImage = 'assets/images/onion.jpg';
          else if (lower.includes('potato')) cropImage = 'assets/images/potato.jpg';
          else if (lower.includes('wheat') || lower.includes('paddy')) cropImage = 'assets/images/paddy.jpg';
          else if (lower.includes('cotton')) cropImage = 'assets/images/cotton.jpg';
          else if (lower.includes('chilli')) cropImage = 'assets/images/chilli.jpg';
          else cropImage = 'assets/images/hero-field.jpg';
        }

        const newCrop = {
          id: "LOT-" + cropName.substring(0, 3).toUpperCase() + "-" + Math.floor(10 + Math.random() * 90),
          farmer_name: db.profile.name,
          crop: cropName,
          variety: variety,
          category: body.category || "Vegetables",
          shelf_life: body.shelf_life || "7 Days",
          quantity_qt: qtyQt,
          quantity_kg: qtyQt * 100,
          quantity: `${qtyQt} Qt (${(qtyQt * 100).toLocaleString()} kg)`,
          quantityNumber: qtyQt,
          price_per_qt: priceQt,
          price_per_kg: priceKg,
          expectedPrice: `₹ ${priceKg.toFixed(2)} /kg (₹ ${priceQt.toLocaleString()} /Qt)`,
          expectedPriceNumber: priceQt,
          bestBid: `₹ ${(priceKg * 1.02).toFixed(2)} /kg (₹ ${Math.round(priceQt * 1.02).toLocaleString()} /Qt)`,
          bestBidNumber: Math.round(priceQt * 1.02),
          buyerName: "Reliance Retail Hub",
          state: body.state || "Maharashtra",
          district: body.district || "Nashik",
          mandi: body.mandi || "Nashik APMC Mandi",
          grade: body.grade || "Grade A",
          gradeBadgeClass: body.grade === 'Grade B' ? 'badge-grade-b' : 'badge-grade-a',
          image: cropImage,
          status: "Active (Bids Open)",
          statusBadgeClass: "badge-status-open",
          created_at: new Date().toISOString()
        };

        db.crops.unshift(newCrop);
        saveDB(db);
        return sendJSON(res, 201, { success: true, crop: newCrop });
      }
    }

    // Emergency Sale Activation
    if (urlPath.startsWith('/api/crops/') && urlPath.endsWith('/emergency') && req.method === 'POST') {
      const id = urlPath.split('/')[3];
      const crop = db.crops.find(c => String(c.id) === String(id));
      if (!crop) return sendJSON(res, 404, { error: 'Crop lot not found' });

      crop.isEmergencySale = true;
      crop.status = "🚨 Emergency Sale Active";
      crop.statusBadgeClass = "badge-status-emergency";
      crop.emergencyActivatedAt = new Date().toISOString();
      
      const basePrice = crop.price_per_qt || 2000;
      crop.emergencyOffers = [
        {
          buyerId: "EMG_BUYER_01",
          buyerName: "Sri Balaji Food Processing & Purees",
          buyerType: "Food Processing Unit",
          icon: "🥫",
          location: "Erode SIPCOT, TN",
          offerPricePerQt: Math.round(basePrice * 0.76),
          offerPriceFormatted: `₹ ${(Math.round(basePrice * 0.76)/100).toFixed(2)} /kg (₹ ${Math.round(basePrice * 0.76).toLocaleString()} /Qt)`,
          status: "Active Offer",
          timestamp: "Just now"
        },
        {
          buyerId: "EMG_BUYER_02",
          buyerName: "Annapoorna Institutional Catering Network",
          buyerType: "Commercial Caterers",
          icon: "🍲",
          location: "Coimbatore Industrial Zone, TN",
          offerPricePerQt: Math.round(basePrice * 0.74),
          offerPriceFormatted: `₹ ${(Math.round(basePrice * 0.74)/100).toFixed(2)} /kg (₹ ${Math.round(basePrice * 0.74).toLocaleString()} /Qt)`,
          status: "Active Offer",
          timestamp: "Just now"
        },
        {
          buyerId: "EMG_BUYER_03",
          buyerName: "GreenEarth Organic Bio-Compost & Fertilizer Corp",
          buyerType: "Compost & Bio-Energy Manufacturer",
          icon: "🌱",
          location: "Salem Agricultural Park, TN",
          offerPricePerQt: Math.round(basePrice * 0.65),
          offerPriceFormatted: `₹ ${(Math.round(basePrice * 0.65)/100).toFixed(2)} /kg (₹ ${Math.round(basePrice * 0.65).toLocaleString()} /Qt)`,
          status: "Active Offer",
          timestamp: "Just now"
        }
      ];

      saveDB(db);
      return sendJSON(res, 200, { success: true, crop });
    }

    // Emergency Sale Accept Offer
    if (urlPath.startsWith('/api/crops/') && urlPath.endsWith('/emergency-accept') && req.method === 'POST') {
      const id = urlPath.split('/')[3];
      const body = await parseBody(req);
      const crop = db.crops.find(c => String(c.id) === String(id));
      if (!crop) return sendJSON(res, 404, { error: 'Crop lot not found' });

      const offer = (crop.emergencyOffers && crop.emergencyOffers.find(o => o.buyerId === body.buyerId)) || {
        buyerName: body.buyerName || "Sri Balaji Food Processing",
        offerPricePerQt: Math.round((crop.price_per_qt || 2000) * 0.76),
        offerPriceFormatted: `₹ ${Math.round((crop.price_per_qt || 2000) * 0.76).toLocaleString()} /Qt`
      };

      crop.status = "✅ Emergency Sold (Breakeven Cleared)";
      crop.statusBadgeClass = "badge-status-sold";
      crop.isSold = true;
      crop.isEmergencySale = false;
      crop.buyerName = offer.buyerName;
      crop.bestBid = offer.offerPriceFormatted;

      // Auto create escrow contract for emergency salvage
      const contractNo = "ESC-EMG-" + Math.floor(1000 + Math.random() * 9000);
      const total = (crop.quantity_qt || 50) * offer.offerPricePerQt;
      const advance = Math.round(total * 0.35);

      const escrow = {
        contract_no: contractNo,
        bank_ref: "HDFC-EMG-" + Math.floor(100000 + Math.random() * 900000),
        crop: crop.crop + " (Emergency Salvage)",
        buyer_name: offer.buyerName,
        total_amount: total,
        advance_amount: advance,
        balance_amount: total - advance,
        status: "Locked",
        payout_status: "Disbursed",
        delivery_status: "Pickup Arranged",
        created_at: new Date().toISOString()
      };
      db.escrow_contracts.unshift(escrow);
      saveDB(db);

      return sendJSON(res, 200, { success: true, crop, escrow });
    }

    // Update Crop Generic (PUT)
    if (urlPath.startsWith('/api/crops/') && req.method === 'PUT') {
      const id = urlPath.replace('/api/crops/', '');
      const body = await parseBody(req);
      const crop = db.crops.find(c => String(c.id) === String(id));
      if (!crop) return sendJSON(res, 404, { error: 'Crop not found' });

      Object.assign(crop, body);
      saveDB(db);
      return sendJSON(res, 200, { success: true, crop });
    }

    // Delete Crop
    if (urlPath.startsWith('/api/crops/') && req.method === 'DELETE') {
      const id = urlPath.replace('/api/crops/', '');
      db.crops = db.crops.filter(c => String(c.id) !== String(id));
      saveDB(db);
      return sendJSON(res, 200, { success: true, message: `Crop ${id} deleted` });
    }

    // 4. Bids Endpoints
    if (urlPath === '/api/bids') {
      if (req.method === 'GET') {
        return sendJSON(res, 200, db.bids);
      }
      if (req.method === 'POST') {
        const body = await parseBody(req);
        const rateQt = Number(body.bid_rate_qt || 2400);
        const qtyQt = Number(body.quantity_qt || 40);
        const rateKg = Number((rateQt / 100).toFixed(2));
        const total = rateQt * qtyQt;

        const newBid = {
          id: db.bids.length > 0 ? Math.max(...db.bids.map(b => b.id)) + 1 : 101,
          crop_id: body.crop_id || "LOT-TOM-01",
          crop: body.crop || "Tomato",
          variety: body.variety || "Hybrid Red",
          buyer_name: body.buyer_name || "Verified Corporate Buyer",
          buyer_phone: body.buyer_phone || "+91 98000 00000",
          buyer_type: body.buyer_type || "National Retailer",
          buyer_rating: "4.9 ★ (Verified Corporate)",
          bid_rate_qt: rateQt,
          bid_rate_kg: rateKg,
          mandi_ref_kg: rateKg * 0.92,
          mandi_ref_qt: rateQt * 0.92,
          premium_pct: "+8.7%",
          quantity_qt: qtyQt,
          quantity_kg: qtyQt * 100,
          total_value: total,
          advance_35: Math.round(total * 0.35),
          balance_65: Math.round(total * 0.65),
          status: "Pending",
          time_ago: "Just now",
          image: body.image || "assets/images/tomato.jpg"
        };
        db.bids.unshift(newBid);
        saveDB(db);
        return sendJSON(res, 201, { success: true, bid: newBid });
      }
    }

    // Bid Action (Accept / Counter / Reject)
    if (urlPath.startsWith('/api/bids/') && urlPath.endsWith('/action')) {
      const parts = urlPath.split('/');
      const bidId = Number(parts[3]);
      const body = await parseBody(req);
      const bid = db.bids.find(b => b.id === bidId);

      if (!bid) {
        return sendJSON(res, 404, { error: 'Bid not found' });
      }

      if (body.status === 'Accepted') {
        bid.status = 'Accepted';
        
        // AUTO-CREATE ESCROW CONTRACT
        const contractNo = "ESC-2026-" + Math.floor(1000 + Math.random() * 9000);
        const bankRef = "HDFC-ESC-" + Math.floor(100000 + Math.random() * 900000);
        const total = bid.total_value;
        const advance = bid.advance_35 || Math.round(total * 0.35);
        const balance = total - advance;

        const newContract = {
          contract_no: contractNo,
          bank_ref: bankRef,
          crop: bid.crop,
          variety: `${bid.variety} (${bid.quantity_qt} Qt / ${bid.quantity_kg || (bid.quantity_qt * 100)} kg)`,
          buyer: bid.buyer_name,
          total_amount: total,
          advance_amount: advance,
          advance_status: "Disbursed (UTR: HDFC" + Math.floor(1000000 + Math.random() * 9000000) + ")",
          balance_amount: balance,
          balance_status: "Locked in Nodal Escrow (Transit)",
          overall_status: "Advance Disbursed, Balance Locked",
          date: "Just now"
        };
        db.escrow_contracts.unshift(newContract);

        // AUTO-CREATE ACTIVE SHIPMENT
        const trkId = "TRK-" + Math.floor(1000 + Math.random() * 9000);
        const gpId = "GP-2026-" + Math.floor(1000 + Math.random() * 9000);

        const newShipment = {
          tracking_id: trkId,
          gate_pass: gpId,
          contract_no: contractNo,
          crop: bid.crop,
          variety: bid.variety,
          quantity_qt: bid.quantity_qt,
          quantity_kg: bid.quantity_qt * 100,
          buyer: bid.buyer_name,
          destination: `${bid.buyer_name} Central DC`,
          driver: "Dinesh Yadav",
          phone: "+91 97230 44819",
          vehicle: "MH-12-AQ-9011 (Tata 407)",
          status: "transit",
          step: 3,
          current_loc: "Farm Pickup Completed • Entering Highway KM 12",
          speed: "48 km/h",
          eta: "Tomorrow, 9:00 AM",
          total_value: total,
          advance_paid: advance,
          image: bid.image || "assets/images/tomato.jpg"
        };
        db.shipments.unshift(newShipment);

        // Update corresponding crop lot status
        const crop = db.crops.find(c => c.id === bid.crop_id);
        if (crop) {
          crop.status = "Sold (Under Escrow)";
          crop.statusBadgeClass = "badge-status-dispatched";
        }

        saveDB(db);
        return sendJSON(res, 200, {
          success: true,
          message: "Bid accepted. Escrow Contract and Shipment automatically generated!",
          bid,
          contract: newContract,
          shipment: newShipment
        });
      }

      if (body.status === 'Countered') {
        bid.status = 'Countered';
        bid.counter_rate_kg = Number(body.counter_rate_kg) || (bid.bid_rate_kg + 1.0);
        bid.counter_rate_qt = bid.counter_rate_kg * 100;
        bid.counter_note = body.counter_note || "Farmer requested adjusted floor price";
        saveDB(db);
        return sendJSON(res, 200, { success: true, bid });
      }

      if (body.status === 'Rejected') {
        bid.status = 'Rejected';
        saveDB(db);
        return sendJSON(res, 200, { success: true, bid });
      }

      saveDB(db);
      return sendJSON(res, 200, { success: true, bid });
    }

<<<<<<< HEAD

    // 5. Logistics & Dispatch Fulfillment Endpoints
    if (urlPath === '/api/logistics/shipments') {
      return sendJSON(res, 200, db.shipments || []);
=======
    // 5. Logistics & Shipments
    if (urlPath === '/api/logistics/shipments' || urlPath === '/api/shipments') {
      return sendJSON(res, 200, db.shipments);
>>>>>>> eb7b2131bbe40c41866443d60354b6bb55c668b5
    }

    if (urlPath === '/api/logistics/dispatch-orders') {
      let orders = db.logistics_dispatch_orders || [];
      const typeFilter = queryParams.type;
      const statusFilter = queryParams.status;
      if (typeFilter && typeFilter !== 'all') {
        orders = orders.filter(o => o.order_type === typeFilter);
      }
      if (statusFilter && statusFilter !== 'all') {
        orders = orders.filter(o => (o.delivery_status || '').toLowerCase() === statusFilter.toLowerCase());
      }
      return sendJSON(res, 200, orders);
    }

    if (urlPath === '/api/logistics/accept-order' && req.method === 'POST') {
      const body = await parseBody(req);
      const orderId = body.order_id || body.order_code;
      if (!orderId) {
        return sendJSON(res, 400, { error: 'Order ID or Code is required' });
      }

      if (!db.logistics_dispatch_orders) db.logistics_dispatch_orders = [];
      const order = db.logistics_dispatch_orders.find(o => 
        String(o.id) === String(orderId) || String(o.order_code).toUpperCase() === String(orderId).toUpperCase()
      );

      if (!order) {
        return sendJSON(res, 404, { error: `Order #${orderId} was not found in dispatch orders` });
      }

      // Check if already accepted
      if (order.delivery_status && order.delivery_status !== 'Available') {
        return sendJSON(res, 200, {
          success: true,
          alreadyAccepted: true,
          message: `Order #${order.order_code} is already accepted (${order.delivery_status}).`,
          order
        });
      }

      const assignedDriver = body.driver_name || 'Dinesh Yadav';
      const assignedPhone = body.driver_phone || '+91 97230 44819';
      const assignedVehicle = body.vehicle_no || 'MH-15-AQ-9011 (Tata 407 Reefer)';
      const deliveryPin = order.delivery_pin || Math.floor(1000 + Math.random() * 9000).toString();

      order.delivery_status = 'In Transit';
      order.driver_username = body.driver_username || 'driver_dinesh';
      order.driver_name = assignedDriver;
      order.driver_phone = assignedPhone;
      order.vehicle_no = assignedVehicle;
      order.delivery_pin = deliveryPin;
      order.accepted_at = new Date().toISOString();

      // Also create shipment tracking record if missing
      if (!db.shipments) db.shipments = [];
      const existingShipment = db.shipments.find(s => s.tracking_id === order.order_code);
      if (!existingShipment) {
        db.shipments.unshift({
          tracking_id: order.order_code,
          gate_pass: "GP-2026-" + Math.floor(1000 + Math.random() * 9000),
          crop: order.crop_name,
          quantity_qt: order.quantity_qt,
          quantity_kg: order.quantity_kg,
          buyer: order.buyer_name,
          destination: order.delivery_address,
          driver: assignedDriver,
          phone: assignedPhone,
          vehicle: assignedVehicle,
          status: 'transit',
          step: 3,
          current_loc: 'Farm Gate Pickup Complete • En Route on Highway',
          speed: '52 km/h',
          eta: order.eta_time || '2 hrs 45 mins',
          total_value: order.freight_fee * 10,
          advance_paid: Math.round(order.freight_fee * 3.5)
        });
      }

      saveDB(db);
      return sendJSON(res, 200, {
        success: true,
        message: `Consignment ${order.order_code} accepted successfully! Digital Gate Pass active.`,
        order
      });
    }

    if (urlPath === '/api/logistics/verify-pin' && req.method === 'POST') {
      const body = await parseBody(req);
      const orderCode = body.order_code || body.orderCode;
      const pin = body.delivery_pin || body.deliveryPin || body.pin;

      const order = (db.logistics_dispatch_orders || []).find(o => o.order_code === orderCode);
      if (!order) {
        return sendJSON(res, 404, { error: "Order not found in logistics registry." });
      }

      if (String(order.delivery_pin).trim() !== String(pin).trim()) {
        return sendJSON(res, 400, {
          success: false,
          error: "Invalid 4-digit Security PIN! Please ask receiving manager at unloading bay."
        });
      }

      order.delivery_status = "Delivered";
      order.escrow_status = "Released & Settled";
      order.delivered_at = new Date().toISOString();

      if (!db.logistics_passbook) db.logistics_passbook = [];
      const newTxn = {
        txId: "TXN-2026-" + Math.floor(100 + Math.random() * 900),
        orderCode: order.order_code,
        crop: `${order.crop_name} (${order.quantity_qt} Qt)`,
        buyer: order.buyer_name,
        amount: "₹ " + (order.freight_fee || 0).toLocaleString(),
        date: "Today, " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: "✓ Settled"
      };

      // Add to passbook
      db.logistics_passbook.unshift(newTxn);

      saveDB(db);
      return sendJSON(res, 200, {
        success: true,
        message: `Delivery confirmed for ${orderCode}! Freight payout ₹${(order.freight_fee || 0).toLocaleString()} credited to your bank account.`,
        order,
        txn: newTxn
      });
    }

    if (urlPath === '/api/logistics/telemetry') {
      return sendJSON(res, 200, {
        success: true,
        reefer_temp_c: 4.8,
        humidity_pct: 86,
        freshness_score: "98.4%",
        ev_battery_pct: 76,
        speed_kmh: 52,
        current_location: "Kasara Ghat Bypass, NH-160, Maharashtra",
        last_ping: new Date().toISOString()
      });
    }


    // 6. Escrow Contracts
    if (urlPath === '/api/escrow/contracts' || urlPath === '/api/escrow') {
      return sendJSON(res, 200, db.escrow_contracts);
    }

    // 7. FPO Bulk Pools
    if (urlPath === '/api/fpo/pools') {
      if (req.method === 'GET') {
        return sendJSON(res, 200, db.fpo_pools);
      }
      if (req.method === 'POST') {
        const body = await parseBody(req);
        const newPool = {
          id: "POOL-" + Math.floor(100 + Math.random() * 900),
          pool_name: body.pool_name || "New Collective Pool",
          crop: body.crop || "Produce",
          buyer_name: body.buyer_name || "Institutional Consortium",
          target_qt: Number(body.target_qt) || 500,
          current_qt: 0,
          floor_price_qt: Number(body.floor_price_qt) || 2500,
          floor_price_kg: Number((Number(body.floor_price_qt || 2500) / 100).toFixed(2)),
          min_contribution: "20 Qt",
          closing_date: body.closing_date || "2026-09-30",
          destination: body.destination || "Surat Central Agripark",
          contributors_count: 0,
          status: "Open"
        };
        db.fpo_pools.unshift(newPool);
        saveDB(db);
        return sendJSON(res, 201, { success: true, pool: newPool });
      }
    }

    // FPO Contribution
    if (urlPath === '/api/fpo/contribute') {
      const body = await parseBody(req);
      const pool = db.fpo_pools.find(p => 
        String(p.id) === String(body.pool_id) || 
        (body.pool_id && String(body.pool_id).toLowerCase().includes(p.crop_name ? p.crop_name.toLowerCase() : '')) ||
        (body.pool_id && p.pool_name && p.pool_name.toLowerCase().includes(String(body.pool_id).toLowerCase()))
      );
      if (!pool) {
        return sendJSON(res, 404, { error: 'Pool not found: ' + body.pool_id });
      }
      const qty = Number(body.quantity_qt) || 20;
      pool.current_qt = Math.min(pool.target_qt, pool.current_qt + qty);
      pool.contributors_count = (pool.contributors_count || 1) + 1;
      if (pool.current_qt >= pool.target_qt) {
        pool.status = "Full";
      }
      saveDB(db);
      return sendJSON(res, 200, {
        success: true,
        message: `Successfully pooled ${qty} Qt into ${pool.pool_name}!`,
        pool
      });
    }

    // 8. Mandi Forecasts Live Bridge
    if (urlPath === '/api/mandi/forecasts') {
      try {
        if (fs.existsSync(FORECAST_FILE)) {
          const forecastData = JSON.parse(fs.readFileSync(FORECAST_FILE, 'utf8'));
          return sendJSON(res, 200, forecastData);
        }
      } catch (e) {}
      return sendJSON(res, 200, { status: "cached", timestamp: new Date().toISOString() });
    }

    // 9. Profit Calculator Estimate API
    if (urlPath === '/api/calculator/estimate') {
      const crop = queryParams.get('crop') || 'Tomato';
      const qt = Number(queryParams.get('quantity') || 50);
      const kg = qt * 100;
      const baseMandiRate = Number(queryParams.get('mandiRate') || 2250); // per qt
      const dist = Number(queryParams.get('distance') || 45);
      const vehicleRate = Number(queryParams.get('vehicleRate') || 10);

      const mandiGross = baseMandiRate * qt;
      const mandiComm = mandiGross * 0.06;
      const mandiWeigh = mandiGross * 0.02;
      const mandiLabor = qt * 22;
      const mandiNet = mandiGross - (mandiComm + mandiWeigh + mandiLabor);

      const platformRate = baseMandiRate * 1.08;
      const platformGross = platformRate * qt;
      const totalFreight = dist * vehicleRate;
      const farmerFreight = totalFreight * 0.5;
      const platformNet = platformGross - farmerFreight;

      const extraProfit = platformNet - mandiNet;

      return sendJSON(res, 200, {
        crop,
        quantity_qt: qt,
        quantity_kg: kg,
        mandi_rate_per_qt: baseMandiRate,
        mandi_rate_per_kg: Number((baseMandiRate / 100).toFixed(2)),
        platform_rate_per_qt: Math.round(platformRate),
        platform_rate_per_kg: Number((platformRate / 100).toFixed(2)),
        mandi_net_take_home: Math.round(mandiNet),
        platform_net_take_home: Math.round(platformNet),
        extra_net_profit: Math.round(extraProfit),
        percent_gain: Number(((extraProfit / mandiNet) * 100).toFixed(1)),
        escrow_advance_35: Math.round(platformNet * 0.35),
        escrow_balance_65: Math.round(platformNet * 0.65)
      });
    }

    // 10. Grievances & Redressal Endpoints
    if (urlPath === '/api/grievances') {
      if (req.method === 'GET') {
        return sendJSON(res, 200, db.grievances || []);
      }
      if (req.method === 'POST') {
        const body = await parseBody(req);
        const grvId = "GRV-2026-" + Math.floor(100 + Math.random() * 900);
        const newGrv = {
          id: grvId,
          farmer_name: db.profile.name || "Ramesh Patel",
          category: body.category || "Payment / Escrow Redressal",
          lot_ref: body.lot_ref || "General Grievance",
          subject: body.subject || "Farmer Assistance Request",
          description: body.description || "",
          priority: body.priority || "High",
          status: "Under Review",
          status_badge: "badge-status-emergency",
          filed_date: "Today, " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          assigned_officer: "Nashik APMC Mandi Officer - V. Kulkarni",
          sla_hours: 24,
          steps: [
            { title: "Grievance Logged", done: true, time: "Just now" },
            { title: "Mandi Officer Assigned", done: true, time: "Within 2 Hours" },
            { title: "Escrow & Buyer Audit", done: false, time: "Pending Review" },
            { title: "Resolution & Payout Adjustment", done: false, time: "Target: 24h" }
          ],
          created_at: new Date().toISOString()
        };
        if (!db.grievances) db.grievances = [];
        db.grievances.unshift(newGrv);
        saveDB(db);
        return sendJSON(res, 201, { success: true, message: "Grievance lodged successfully!", grievance: newGrv });
      }
    }

<<<<<<< HEAD
    
    // ================= LOGISTICS DISPATCH & FLEXIBLE PICKUP APIS =================
    if (urlPath === '/api/logistics/dispatch-orders' && req.method === 'GET') {
      return sendJSON(res, 200, {
        success: true,
        dispatchOrders: db.logistics_dispatch_orders || []
      });
    }

    if (urlPath === '/api/logistics/schedule-pickup' && req.method === 'POST') {
      const body = await parseBody(req);
      const orderCode = body.order_code || body.orderCode;
      const slotTime = body.slot_time || body.slotTime;
      const driverNotes = body.driver_notes || body.driverNotes || null;

      if (!orderCode || !slotTime) {
        return sendJSON(res, 400, { error: "order_code and slot_time are required." });
      }

      const order = (db.logistics_dispatch_orders || []).find(o => o.order_code === orderCode);
      if (!order) {
        return sendJSON(res, 404, { error: "Order not found in logistics registry." });
      }

      order.driver_scheduled_slot = slotTime + (slotTime.includes("Confirmed") ? "" : " (Confirmed)");
      if (driverNotes) order.driver_notes = driverNotes;
      order.slot_updated_at = new Date().toISOString();

      saveDB(db);
      return sendJSON(res, 200, {
        success: true,
        message: `Pickup slot confirmed for ${order.driver_scheduled_slot}! Farm loading ramp alerted.`,
        order
      });
    }

    if (urlPath === '/api/logistics/accept-order' && req.method === 'POST') {
      const body = await parseBody(req);
      const orderCode = body.order_code || body.orderCode;
      const vehicleNo = body.vehicle_no || body.vehicleNo || "MH-15-AQ-9011 (Tata 407 Reefer 5°C)";
      const slotTime = body.slot_time || body.slotTime || null;

      const order = (db.logistics_dispatch_orders || []).find(o => o.order_code === orderCode);
      if (!order) {
        return sendJSON(res, 404, { error: "Order not found." });
      }

      order.delivery_status = "In Transit";
      order.driver_username = "driver_dinesh";
      order.driver_name = "Dinesh Yadav";
      order.driver_phone = "+91 97230 44819";
      order.vehicle_no = vehicleNo;
      order.accepted_at = new Date().toISOString();
      if (slotTime) {
        order.driver_scheduled_slot = slotTime + (slotTime.includes("Confirmed") ? "" : " (Confirmed)");
      }

      saveDB(db);
      return sendJSON(res, 200, {
        success: true,
        message: `Order ${orderCode} accepted for transit by Dinesh Yadav!`,
        order
      });
    }

    if (urlPath === '/api/logistics/verify-pin' && req.method === 'POST') {
      const body = await parseBody(req);
      const orderCode = body.order_code || body.orderCode;
      const pin = body.delivery_pin || body.deliveryPin || body.pin;

      const order = (db.logistics_dispatch_orders || []).find(o => o.order_code === orderCode);
      if (!order) {
        return sendJSON(res, 404, { error: "Order not found in logistics registry." });
      }

      if (String(order.delivery_pin).trim() !== String(pin).trim()) {
        return sendJSON(res, 400, {
          success: false,
          error: "Invalid 4-digit Security PIN! Please ask receiving manager at unloading bay."
        });
      }

      order.delivery_status = "Delivered";
      order.escrow_status = "Released & Settled";
      order.delivered_at = new Date().toISOString();

      if (!db.logistics_passbook) db.logistics_passbook = [];
      const newTxn = {
        txId: "TXN-2026-" + Math.floor(100 + Math.random() * 900),
        orderCode: order.order_code,
        crop: `${order.crop_name} (${order.quantity_qt} Qt)`,
        buyer: order.buyer_name,
        amount: "₹ " + (order.freight_fee || 0).toLocaleString(),
        date: "Today, " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: "✓ Settled"
      };

      // Add to passbook
      db.logistics_passbook.unshift(newTxn);

      saveDB(db);
      return sendJSON(res, 200, {
        success: true,
        message: `Delivery confirmed for ${orderCode}! Freight payout ₹${(order.freight_fee || 0).toLocaleString()} credited to your bank account.`,
        order,
        txn: newTxn
      });
    }

    if (urlPath.startsWith('/api/grievances/') && urlPath.endsWith('/resolve') && req.method === 'POST') {
      const parts = urlPath.split('/');
      const id = parts[3];
      const grv = (db.grievances || []).find(g => String(g.id) === String(id));
      if (!grv) return sendJSON(res, 404, { error: 'Grievance not found' });
      grv.status = "Resolved & Settled";
      grv.status_badge = "badge-status-open";
      if (grv.steps) grv.steps.forEach(s => s.done = true);
      saveDB(db);
      return sendJSON(res, 200, { success: true, message: "Grievance marked as resolved!", grievance: grv });
=======
    // 11. Admin & Governance REST APIs
    if (urlPath === '/api/admin/stats') {
      return sendJSON(res, 200, {
        verifiedFarmers: "14,280",
        enterpriseBuyers: "850",
        totalEscrowLocked: "₹ 18,45,00,000",
        dailyTradeVolume: "₹ 3,12,40,000",
        disputeRate: "0.14%",
        activeCommodities: 23,
        mandiJurisdiction: "305 APMC Mandis across Maharashtra"
      });
    }

    if (urlPath === '/api/admin/escrow/queue') {
      return sendJSON(res, 200, db.escrow_contracts || []);
    }

    if (urlPath === '/api/admin/mandi/prices') {
      return sendJSON(res, 200, db.crops.map(c => ({
        id: c.id,
        crop: c.crop,
        modal_rate_kg: c.price_per_kg,
        modal_rate_qt: c.price_per_qt,
        state: c.state,
        mandi: c.mandi
      })));
>>>>>>> eb7b2131bbe40c41866443d60354b6bb55c668b5
    }

    return sendJSON(res, 404, { error: "Endpoint not found" });
  }


  // ================= STATIC FILE SERVING =================
  let reqPath = decodeURI(urlPath);
  if (reqPath === '/') {
    reqPath = '/index.html';
  }

  const filePath = path.join(PUBLIC_DIR, reqPath);

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('403 Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
      return;
    }

    let finalPath = filePath;
    if (stats.isDirectory()) {
      finalPath = path.join(filePath, 'index.html');
    }

    fs.readFile(finalPath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
        return;
      }

      const ext = path.extname(finalPath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';

      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
      });
      res.end(data);
    });
  });
});

server.listen(PORT, () => {
  console.log(`AgriNex Platform & REST API server running at http://localhost:${PORT}/`);
  console.log(`REST API Available at http://localhost:${PORT}/api/`);
});
