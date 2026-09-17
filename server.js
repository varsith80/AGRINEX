require('dotenv').config();
const http = require('http');
const fs = require('fs');
const path = require('path');
const dbService = require('./backend/db');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.resolve(__dirname);
const DATA_FILE = path.join(__dirname, 'backend', 'data.json');
const FORECAST_FILE = path.join(__dirname, 'ai_ml_engine', 'data', 'processed', 'latest_mandi_forecasts.json');

// Ensure backend data directory exists
if (!fs.existsSync(path.join(__dirname, 'backend'))) {
  fs.mkdirSync(path.join(__dirname, 'backend'), { recursive: true });
}

// Initial Database Seeds
const DEFAULT_DATA = {
  profile: {
    name: "Ramesh Patel",
    farmer_id: "FARM-88210",
    phone: "+91 98421 88390",
    location: "Surat, Gujarat",
    bank_name: "HDFC Bank Ltd.",
    account_no: "•••• •••• 8821",
    ifsc: "HDFC0001234",
    upi_id: "ramesh.farmer@okhdfcbank"
  },
  crops: [
    {
      id: "LOT-TOM-01",
      farmer_name: "Ramesh Patel",
      crop: "Tomato",
      variety: "Hybrid Red (Shivam)",
      category: "Vegetables",
      shelf_life: "3 Days (Perishable)",
      quantity_qt: 50,
      quantity_kg: 5000,
      price_per_qt: 2400,
      price_per_kg: 24.0,
      state: "Gujarat",
      district: "Surat",
      mandi: "Surat Mandi Yard",
      grade: "Grade A",
      image: "assets/images/tomato.jpg",
      status: "Active (Bids Open)",
      best_bid_qt: 2450,
      best_bid_kg: 24.50,
      buyer_name: "FreshCart Supply Chain",
      created_at: new Date().toISOString()
    },
    {
      id: "LOT-ONI-02",
      farmer_name: "Ramesh Patel",
      crop: "Onion",
      variety: "Nashik Red Export Grade",
      category: "Vegetables",
      shelf_life: "25 Days",
      quantity_qt: 80,
      quantity_kg: 8000,
      price_per_qt: 2800,
      price_per_kg: 28.0,
      state: "Maharashtra",
      district: "Nashik",
      mandi: "Lasalgaon Mandi",
      grade: "Grade A",
      image: "assets/images/onion.jpg",
      status: "Active (Bids Open)",
      best_bid_qt: 2850,
      best_bid_kg: 28.50,
      buyer_name: "Mahyco Bulk Exporters",
      created_at: new Date().toISOString()
    },
    {
      id: "LOT-POT-03",
      farmer_name: "Ramesh Patel",
      crop: "Potato",
      variety: "Jyoti Grade A Processing Chip Grade",
      category: "Vegetables",
      shelf_life: "60 Days",
      quantity_qt: 120,
      quantity_kg: 12000,
      price_per_qt: 1800,
      price_per_kg: 18.0,
      state: "Gujarat",
      district: "Surat",
      mandi: "Surat Mandi Yard",
      grade: "Grade A",
      image: "assets/images/potato.jpg",
      status: "Accepted (Escrow Active)",
      best_bid_qt: 1850,
      best_bid_kg: 18.50,
      buyer_name: "Balaji Wafers Procurement",
      created_at: new Date().toISOString()
    },
    {
      id: "LOT-WHT-04",
      farmer_name: "Ramesh Patel",
      crop: "Wheat",
      variety: "Sharbati Lokwan Golden Wheat",
      category: "Grains",
      shelf_life: "180 Days",
      quantity_qt: 150,
      quantity_kg: 15000,
      price_per_qt: 2600,
      price_per_kg: 26.0,
      state: "Madhya Pradesh",
      district: "Sehore",
      mandi: "Sehore Mandi",
      grade: "Grade A+",
      image: "assets/images/hero-field.jpg",
      status: "Active (Bids Open)",
      best_bid_qt: 2650,
      best_bid_kg: 26.50,
      buyer_name: "ITC Aashirvaad Sourcing",
      created_at: new Date().toISOString()
    }
  ],
  bids: [
    {
      id: 101,
      crop_id: "LOT-TOM-01",
      crop: "Tomato",
      variety: "Hybrid Red (Shivam)",
      buyer_name: "FreshCart Supply Chain",
      buyer_phone: "+91 98234 11223",
      buyer_type: "National Supermarket Retailer",
      buyer_rating: "4.9 ★ (Verified Corporate)",
      bid_rate_qt: 2450,
      bid_rate_kg: 24.50,
      mandi_ref_kg: 22.50,
      mandi_ref_qt: 2250,
      premium_pct: "+8.9%",
      quantity_qt: 45,
      quantity_kg: 4500,
      total_value: 110250,
      advance_35: 38587,
      balance_65: 71663,
      status: "Pending",
      time_ago: "15 mins ago",
      image: "assets/images/tomato.jpg"
    },
    {
      id: 102,
      crop_id: "LOT-ONI-02",
      crop: "Onion",
      variety: "Nashik Red Export Grade",
      buyer_name: "Mahyco Bulk Exporters",
      buyer_phone: "+91 97123 77889",
      buyer_type: "Agricultural Export House",
      buyer_rating: "4.8 ★ (Verified Exporter)",
      bid_rate_qt: 2850,
      bid_rate_kg: 28.50,
      mandi_ref_kg: 26.00,
      mandi_ref_qt: 2600,
      premium_pct: "+9.6%",
      quantity_qt: 80,
      quantity_kg: 8000,
      total_value: 228000,
      advance_35: 79800,
      balance_65: 148200,
      status: "Pending",
      time_ago: "40 mins ago",
      image: "assets/images/onion.jpg"
    },
    {
      id: 103,
      crop_id: "LOT-POT-03",
      crop: "Potato",
      variety: "Jyoti Grade A Processing Chip Grade",
      buyer_name: "Balaji Wafers Procurement",
      buyer_phone: "+91 99001 22334",
      buyer_type: "Food Processing Enterprise",
      buyer_rating: "5.0 ★ (Anchor Buyer)",
      bid_rate_qt: 1850,
      bid_rate_kg: 18.50,
      mandi_ref_kg: 17.20,
      mandi_ref_qt: 1720,
      premium_pct: "+7.5%",
      quantity_qt: 120,
      quantity_kg: 12000,
      total_value: 222000,
      advance_35: 77700,
      balance_65: 144300,
      status: "Accepted",
      time_ago: "Yesterday",
      image: "assets/images/potato.jpg"
    },
    {
      id: 104,
      crop_id: "LOT-WHT-04",
      crop: "Wheat",
      variety: "Sharbati Lokwan Golden Wheat",
      buyer_name: "ITC Aashirvaad Sourcing",
      buyer_phone: "+91 98990 44556",
      buyer_type: "FMCG Conglomerate",
      buyer_rating: "5.0 ★ (Anchor Buyer)",
      bid_rate_qt: 2650,
      bid_rate_kg: 26.50,
      mandi_ref_kg: 24.80,
      mandi_ref_qt: 2480,
      premium_pct: "+6.8%",
      quantity_qt: 150,
      quantity_kg: 15000,
      total_value: 397500,
      advance_35: 139125,
      balance_65: 258375,
      status: "Pending",
      time_ago: "2 hours ago",
      image: "assets/images/hero-field.jpg"
    }
  ],
  fpo_pools: [
    {
      id: "POOL-ONI-01",
      pool_name: "Surat Red Onion Export Pool",
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
      pool_name: "North Gujarat Potato Chip Pool",
      crop: "Potato (Processing Jyoti)",
      buyer_name: "Balaji & Haldiram Snacks Consortium",
      target_qt: 800,
      current_qt: 620,
      floor_price_qt: 1950,
      floor_price_kg: 19.50,
      min_contribution: "30 Qt",
      closing_date: "2026-09-22",
      destination: "Valsad Processing Facility, Gujarat",
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
      current_loc: "Surat-Mumbai Expressway KM 84",
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
      destination: "Balaji Factory Hub, Valsad, Gujarat",
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
      farmer_name: "Ramesh Patel",
      category: "Logistics Pickup Schedule",
      lot_ref: "LOT-ONI-02 (Nashik Red Onion)",
      subject: "Truck gate pass delay at Surat Mandi Yard Gate 2",
      description: "Produce has been packed and weighed. Logistics truck driver requested an updated digital gate pass for weighbridge clearance.",
      priority: "High",
      status: "Under Review",
      status_badge: "badge-status-emergency",
      filed_date: "Today, 10:15 AM",
      assigned_officer: "Surat APMC Mandi Officer - K. Mehta",
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
      farmer_name: "Ramesh Patel",
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
  ],
  admin_governance: {
    stats: {
      verifiedFarmers: "14,280",
      enterpriseBuyers: "850",
      totalEscrowLocked: "₹ 18,45,00,000",
      disputeRate: "0.14%",
      disputeSLA: "<2h"
    },
    warehouses: [
      {
        id: "MSWC-PUNE-01",
        name: "MSWC Regional Logistics & Cold Hub",
        location: "Narayangaon APMC, Pune",
        totalCapacity: 15000,
        occupiedCapacity: 11850,
        occupiedPct: 79,
        primaryCrops: "Tomato, Exotic Greens, Potato",
        tempRange: "2°C - 8°C (Optimal)",
        status: "Active (79% Occupied)",
        humidity: "85% HR",
        manager: "R. V. Deshmukh"
      },
      {
        id: "MSWC-NSK-02",
        name: "Nashik Mega Cold Chain & Sorting Terminal",
        location: "Pimpalgaon Baswant, Nashik",
        totalCapacity: 25000,
        occupiedCapacity: 21500,
        occupiedPct: 86,
        primaryCrops: "Onion Garwa, Export Grapes",
        tempRange: "-1°C - 4°C (Pre-Cooling)",
        status: "High Occupancy Alert (86%)",
        humidity: "90% HR",
        manager: "K. S. Patil"
      },
      {
        id: "MSWC-LTR-03",
        name: "Marathwada Nodal Grain & Oilseed Silo Complex",
        location: "Latur APMC Mega Yard",
        totalCapacity: 40000,
        occupiedCapacity: 24000,
        occupiedPct: 60,
        primaryCrops: "Yellow Soybean, Chana, Red Tur",
        tempRange: "Ambient Dry Silo (18°C)",
        status: "Optimal (60% Occupied)",
        humidity: "45% HR",
        manager: "A. B. Gaikwad"
      },
      {
        id: "MSWC-NGP-04",
        name: "Vidarbha APMC Citrus & Cotton Cold Terminal",
        location: "Nagpur Kalmeshwar Yard",
        totalCapacity: 18000,
        occupiedCapacity: 13140,
        occupiedPct: 73,
        primaryCrops: "Nagpur Orange, Cotton Bales",
        tempRange: "4°C - 10°C",
        status: "Active (73% Occupied)",
        humidity: "80% HR",
        manager: "M. N. Joshi"
      }
    ],
    coldChainTelemetry: {
      "ESC-MH-2026-905": {
        reeferId: "MH-15-HH-9021",
        driverName: "Mahesh Kale (+91 98220 11200)",
        origin: "Pimpalgaon Pre-Cooling Center, Nashik",
        destination: "Bhiwandi Cold Hub, Thane",
        routeWaypoints: [
          { location: "Pimpalgaon APMC Yard", timestamp: "14-Sep 09:30 PM", temp: 2.5, status: "Pre-Cooled (OK)" },
          { location: "Kasara Ghat Pass Checkpoint", timestamp: "15-Sep 02:15 AM", temp: 3.2, status: "In Transit (OK)" },
          { location: "Bhiwandi Cold Storage Receiving", timestamp: "15-Sep 05:45 AM", temp: 4.2, status: "Door Tier Temp Rise (4.2°C)" }
        ],
        currentTemp: 4.2,
        targetTemp: 2.5,
        humidity: "88% HR",
        status: "Minor Door Tier Variance (4.2°C)"
      },
      "DISP-MH-8812": {
        reeferId: "MH-14-GH-8812",
        driverName: "Sandeep Patil (+91 98440 33112)",
        origin: "Lasalgaon Farm Gate, Nashik",
        destination: "Vashi DC, Navi Mumbai",
        routeWaypoints: [
          { location: "Lasalgaon Farm Gate Loading", timestamp: "15-Sep 06:30 AM", temp: 18.0, status: "Crated & Loaded" },
          { location: "Igatpuri Toll Plaza (NH-160)", timestamp: "15-Sep 10:45 AM", temp: 22.5, status: "Ventilated Transit" },
          { location: "Vashi Dock Dock #04 Intake", timestamp: "15-Sep 02:15 PM", temp: 26.0, status: "Casara Bumpy Transit Squish (12%)" }
        ],
        currentTemp: 26.0,
        targetTemp: 20.0,
        humidity: "72% HR",
        status: "Ventilated Produce Transit"
      }
    }
  }
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
    // 1. Health & Database Status
    if (urlPath === '/api/health') {
      return sendJSON(res, 200, {
        status: 'online',
        app: 'AgriNex Unified Agricultural Platform API',
        database: dbService.isPostgres() ? 'PostgreSQL (Connected & Active)' : 'Local Persistent Storage (PostgreSQL Ready)',
        postgres_connected: dbService.isPostgres(),
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
          harvest_date: body.harvest_date || body.harvestDate || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
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
          state: body.state || "Gujarat",
          district: body.district || "Surat",
          mandi: body.mandi || "Surat Mandi Yard",
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

    // 5. Logistics & Shipments
    if (urlPath === '/api/logistics/shipments' || urlPath === '/api/shipments') {
      return sendJSON(res, 200, db.shipments);
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
          assigned_officer: "Surat APMC Mandi Officer - K. Mehta",
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

    // ================= LOGISTICS DISPATCH & FLEXIBLE PICKUP APIS =================
    if (urlPath === '/api/logistics/dispatch-orders') {
      let orders = db.logistics_dispatch_orders || [];
      const typeFilter = queryParams.get('type');
      const statusFilter = queryParams.get('status');
      if (typeFilter && typeFilter !== 'all') {
        orders = orders.filter(o => o.order_type === typeFilter);
      }
      if (statusFilter && statusFilter !== 'all') {
        orders = orders.filter(o => (o.delivery_status || '').toLowerCase() === statusFilter.toLowerCase());
      }
      return sendJSON(res, 200, orders);
    }

    if (urlPath === '/api/logistics/schedule-pickup' && req.method === 'POST') {
      const body = await parseBody(req);
      const orderCode = body.order_code || body.orderCode;
      const slotTime = body.slot_time || body.slotTime;
      const driverNotes = body.driver_notes || body.driverNotes || null;

      if (!orderCode || !slotTime) {
        return sendJSON(res, 400, { error: "order_code and slot_time are required." });
      }

      const order = (db.logistics_dispatch_orders || []).find(o => 
        (o.order_code && String(o.order_code).trim() === String(orderCode).trim()) ||
        (o.orderCode && String(o.orderCode).trim() === String(orderCode).trim()) ||
        (o.id && String(o.id).trim() === String(orderCode).trim())
      );
      if (!order) {
        return sendJSON(res, 404, { error: "Order not found in logistics registry." });
      }

      order.driver_scheduled_slot = slotTime + (slotTime.includes("Confirmed") ? "" : " (Confirmed)");
      order.driverScheduledSlot = order.driver_scheduled_slot;
      if (driverNotes) {
        order.driver_notes = driverNotes;
        order.driverNotes = driverNotes;
      }
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

      const order = (db.logistics_dispatch_orders || []).find(o => 
        (o.order_code && String(o.order_code).trim() === String(orderCode).trim()) ||
        (o.orderCode && String(o.orderCode).trim() === String(orderCode).trim()) ||
        (o.id && String(o.id).trim() === String(orderCode).trim())
      );
      if (!order) {
        return sendJSON(res, 404, { error: "Order not found." });
      }

      order.delivery_status = "In Transit";
      order.deliveryStatus = "In Transit";
      order.statusBadgeClass = "badge-status-transit";
      order.driver_username = "driver_dinesh";
      order.driver_name = body.driver_name || "Dinesh Yadav";
      order.driverName = order.driver_name;
      order.driver_phone = body.driver_phone || "+91 97230 44819";
      order.driverPhone = order.driver_phone;
      order.vehicle_no = vehicleNo;
      order.vehicleNo = vehicleNo;
      order.accepted_at = new Date().toISOString();
      if (slotTime) {
        order.driver_scheduled_slot = slotTime + (slotTime.includes("Confirmed") ? "" : " (Confirmed)");
        order.driverScheduledSlot = order.driver_scheduled_slot;
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

      const order = (db.logistics_dispatch_orders || []).find(o => 
        (o.order_code && String(o.order_code).trim() === String(orderCode).trim()) ||
        (o.orderCode && String(o.orderCode).trim() === String(orderCode).trim()) ||
        (o.id && String(o.id).trim() === String(orderCode).trim())
      );
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
    }

    // ================= MANDI LIVE RATES & AI FORECAST APIS =================
    if (urlPath === '/api/mandi/update-rates' && req.method === 'POST') {
      const analyticsFile = path.join(__dirname, 'farmer-module', 'data', 'mandi_live_analytics.json');
      const engineFile = path.join(__dirname, 'ai_ml_engine', 'data', 'mandi_live_analytics.json');
      let analyticsData = {};
      try {
        if (fs.existsSync(analyticsFile)) {
          analyticsData = JSON.parse(fs.readFileSync(analyticsFile, 'utf-8'));
        }
      } catch (e) {}

      // Commodity APMC Benchmark Knowledge Base & Microeconomic Profiles
      const COMMODITY_PROFILES = {
        "Tomato": {
          baseModal: 1850,
          minBand: 1300,
          maxBand: 2400,
          elasticity: -0.65,
          avgArrivals: 42000,
          hubs: [
            { target_mandi: "Vashi Wholesale APMC", state: "Maharashtra", distance_km: 195, freight_cost_qt: 180, priceDiff: 220 },
            { target_mandi: "Gultekdi APMC", state: "Maharashtra", distance_km: 210, freight_cost_qt: 190, priceDiff: 140 }
          ],
          bullishRationale: "High institutional demand from tomato puree & paste processing plants in Nashik MIDC. Heavy rains in southern growing belts reduced supply.",
          bearishRationale: "Surplus arrivals from Junnar and Sangamner belts. Wholesale inventory clearing in Pimpalgaon yard.",
          neutralRationale: "Daily arrivals matched by steady retail procurement across western Maharashtra mandis."
        },
        "Red Onion": {
          baseModal: 2150,
          minBand: 1500,
          maxBand: 2800,
          elasticity: -0.45,
          avgArrivals: 85000,
          hubs: [
            { target_mandi: "Vashi APMC Market", state: "Maharashtra", distance_km: 220, freight_cost_qt: 220, priceDiff: 280 },
            { target_mandi: "Surat APMC", state: "Gujarat", distance_km: 260, freight_cost_qt: 250, priceDiff: 310 }
          ],
          bullishRationale: "High export container demand at JNPT Port for Gulf shipments. Lasalgaon mandi volume up with strong institutional buyer bidding.",
          bearishRationale: "High kharif arrivals landing across Lasalgaon and Pimpalgaon yards, creating temporary warehouse buildup.",
          neutralRationale: "Stable buffer stock operations and balanced pan-India freight dispatches maintain steady pricing."
        },
        "Green Chilli": {
          baseModal: 3650,
          minBand: 2800,
          maxBand: 4600,
          elasticity: -0.55,
          avgArrivals: 18000,
          hubs: [
            { target_mandi: "Vashi Spices Terminal", state: "Maharashtra", distance_km: 190, freight_cost_qt: 180, priceDiff: 290 }
          ],
          bullishRationale: "Spice extraction and oleoresin buyers active in Turbhe MIDC & Bhiwandi hubs.",
          bearishRationale: "Increased local plucking arrivals from Sinnar & Niphad tehsils expanding yard inventory.",
          neutralRationale: "Consistent daily despatches to Mumbai and Thane suburban retail markets."
        },
        "Raw Cotton": {
          baseModal: 7250,
          minBand: 6400,
          maxBand: 7900,
          elasticity: -0.30,
          avgArrivals: 32000,
          hubs: [
            { target_mandi: "Rajkot APMC", state: "Gujarat", distance_km: 740, freight_cost_qt: 450, priceDiff: 520 }
          ],
          bullishRationale: "Spinning mills from Vidarbha & Coimbatore issuing fresh procurement tenders above MSP benchmark.",
          bearishRationale: "Global ICE cotton futures softened; local ginning units operating at planned capacity.",
          neutralRationale: "Government MSP procurement centers maintaining standard floor price equilibrium."
        },
        "Grapes": {
          baseModal: 8400,
          minBand: 6500,
          maxBand: 9900,
          elasticity: -0.70,
          avgArrivals: 14000,
          hubs: [
            { target_mandi: "APMC Vashi Cold Storage", state: "Maharashtra", distance_km: 195, freight_cost_qt: 250, priceDiff: 600 }
          ],
          bullishRationale: "High brix export grade lots witnessing intense bidding by European and UK export consignors.",
          bearishRationale: "Table grape domestic arrivals peaking in Nashik belt; cold storage space utilization at 90%.",
          neutralRationale: "Export packaging units maintaining regular daily harvest intake quotas."
        },
        "Pomegranate": {
          baseModal: 10800,
          minBand: 8500,
          maxBand: 13200,
          elasticity: -0.50,
          avgArrivals: 16000,
          hubs: [
            { target_mandi: "Bengaluru APMC Yard", state: "Karnataka", distance_km: 480, freight_cost_qt: 380, priceDiff: 850 }
          ],
          bullishRationale: "Bhagwa variety prime export grade experiencing tight orchard arrivals and Middle East air cargo demand.",
          bearishRationale: "Higher arrivals of medium-grade fruit from Solapur and Sangola orchards.",
          neutralRationale: "Regular institutional supply contracts keeping farmgate realizations steady."
        },
        "Soybean": {
          baseModal: 4600,
          minBand: 4100,
          maxBand: 5200,
          elasticity: -0.35,
          avgArrivals: 48000,
          hubs: [
            { target_mandi: "Indore Mandi Terminal", state: "Madhya Pradesh", distance_km: 560, freight_cost_qt: 340, priceDiff: 410 }
          ],
          bullishRationale: "Solvent extraction plants in Latur & Nanded operating at high crushing margins.",
          bearishRationale: "Global soy oil imports and domestic meal exports remaining subdued.",
          neutralRationale: "Crushing plant demand matches current farmgate arrivals smoothly."
        },
        "Mango": {
          baseModal: 14500,
          minBand: 11000,
          maxBand: 18000,
          elasticity: -0.75,
          avgArrivals: 9500,
          hubs: [
            { target_mandi: "Crawford Market Mumbai", state: "Maharashtra", distance_km: 340, freight_cost_qt: 420, priceDiff: 1100 }
          ],
          bullishRationale: "GI-tagged Devgad Alphonso with export quality packaging commanding premium institutional bidding.",
          bearishRationale: "Peak season arrivals arriving in coastal mandis.",
          neutralRationale: "Steady high-end domestic gifting and retail demand."
        },
        "Chana (Bengal Gram)": {
          baseModal: 5400,
          minBand: 4800,
          maxBand: 6100,
          elasticity: -0.30,
          avgArrivals: 25000,
          hubs: [
            { target_mandi: "Gultekdi Pune APMC", state: "Maharashtra", distance_km: 440, freight_cost_qt: 310, priceDiff: 380 }
          ],
          bullishRationale: "Dal millers aggressively stocking high-protein deshi chana ahead of festive demand.",
          bearishRationale: "NAFED buffer stock release in central markets tempering spot bids.",
          neutralRationale: "Balanced miller off-take and regulated procurement keeping prices range-bound."
        },
        "Turmeric": {
          baseModal: 14200,
          minBand: 12500,
          maxBand: 16000,
          elasticity: -0.40,
          avgArrivals: 21000,
          hubs: [
            { target_mandi: "Erode Spices Market", state: "Tamil Nadu", distance_km: 780, freight_cost_qt: 450, priceDiff: 650 }
          ],
          bullishRationale: "High curcumin Rajapuri variety active buyers from pharmaceutical & nutraceutical exporters.",
          bearishRationale: "Surplus arrivals from Marathwada producing districts.",
          neutralRationale: "Steady industrial demand sustaining spot market rates."
        },
        "Orange": {
          baseModal: 4800,
          minBand: 3800,
          maxBand: 5800,
          elasticity: -0.60,
          avgArrivals: 36000,
          hubs: [
            { target_mandi: "Bhopal Mandi Yard", state: "Madhya Pradesh", distance_km: 350, freight_cost_qt: 280, priceDiff: 390 }
          ],
          bullishRationale: "Strong juice processing plant demand and north Indian wholesale dispatches from Nagpur.",
          bearishRationale: "Bulk Mrig crop arrivals increasing daily across Katol & Kalmeshwar mandis.",
          neutralRationale: "Wholesale consignments moving at steady volume."
        },
        "Banana": {
          baseModal: 1850,
          minBand: 1400,
          maxBand: 2400,
          elasticity: -0.50,
          avgArrivals: 56000,
          hubs: [
            { target_mandi: "Surat APMC", state: "Gujarat", distance_km: 290, freight_cost_qt: 210, priceDiff: 270 }
          ],
          bullishRationale: "Grand Naine export packaging for Middle East reefers maintaining strong procurement price.",
          bearishRationale: "Increased daily truck arrivals in Raver & Chopda yards.",
          neutralRationale: "Domestic north-bound train and road rakes lifting standard daily quotas."
        }
      };

      // Holt-Winters Exponential Smoothing & Linear Trend ML Forecast Function
      function calculateMLForecast(history7d) {
        const alpha = 0.40;
        let ema = [history7d[0]];
        for (let i = 1; i < history7d.length; i++) {
          ema.push(alpha * history7d[i] + (1 - alpha) * ema[ema.length - 1]);
        }

        const n = history7d.length;
        let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
        for (let i = 0; i < n; i++) {
          sumX += i;
          sumY += history7d[i];
          sumXY += i * history7d[i];
          sumX2 += i * i;
        }
        const denom = (n * sumX2 - sumX * sumX);
        const slope = denom !== 0 ? (n * sumXY - sumX * sumY) / denom : 0;
        const intercept = (sumY - slope * sumX) / n;

        let ssRes = 0;
        for (let i = 0; i < n; i++) {
          const fitted = intercept + slope * i;
          ssRes += Math.pow(history7d[i] - fitted, 2);
        }
        const stdErr = Math.sqrt(ssRes / Math.max(n - 1, 1));
        const currentPrice = history7d[n - 1];
        const forecastPoints = [];

        for (let day = 1; day <= 7; day++) {
          const trendProj = intercept + slope * (n - 1 + day);
          const emaProj = ema[ema.length - 1] + (slope * day * 0.85);
          const blended = Math.round(trendProj * 0.6 + emaProj * 0.4);
          const margin = Math.round(1.96 * Math.max(stdErr, currentPrice * 0.015) * Math.sqrt(day / 2.0));

          forecastPoints.push({
            day_offset: day,
            forecast_price: blended,
            lower_bound: blended - margin,
            upper_bound: blended + margin
          });
        }

        const targetPrice7d = forecastPoints[6].forecast_price;
        const pctChange7d = Number((((targetPrice7d - currentPrice) / currentPrice) * 100).toFixed(1));

        let signal = "NEUTRAL";
        if (pctChange7d >= 2.5) signal = "BULLISH";
        else if (pctChange7d <= -2.5) signal = "BEARISH";

        const meanY = sumY / n;
        let ssTot = 0;
        for (let i = 0; i < n; i++) {
          ssTot += Math.pow(history7d[i] - meanY, 2);
        }
        const r2 = ssTot > 0 ? Math.max(0, 1 - (ssRes / ssTot)) : 0.95;
        const confidencePct = Math.min(98, Math.max(78, Math.round(r2 * 40 + 58)));

        return {
          target_price_7d: targetPrice7d,
          pct_change_7d: pctChange7d,
          confidence_pct: confidencePct,
          forecast_points: forecastPoints,
          signal: signal
        };
      }

      const now = new Date();
      const dateStr = now.getFullYear() + '-' +
        String(now.getMonth() + 1).padStart(2, '0') + '-' +
        String(now.getDate()).padStart(2, '0') + ' ' +
        String(now.getHours()).padStart(2, '0') + ':' +
        String(now.getMinutes()).padStart(2, '0') + ':' +
        String(now.getSeconds()).padStart(2, '0');

      if (analyticsData.metadata) {
        analyticsData.metadata.generated_at = dateStr;
      }

      if (analyticsData.commodities && Array.isArray(analyticsData.commodities)) {
        analyticsData.commodities.forEach(c => {
          // Find commodity profile or default
          const profileKey = Object.keys(COMMODITY_PROFILES).find(k => 
            c.commodity && (c.commodity.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(c.commodity.toLowerCase()))
          );
          const profile = profileKey ? COMMODITY_PROFILES[profileKey] : {
            baseModal: c.modal_price || 2000,
            minBand: Math.round((c.modal_price || 2000) * 0.75),
            maxBand: Math.round((c.modal_price || 2000) * 1.30),
            elasticity: -0.50,
            avgArrivals: c.arrivals_qt || 25000,
            hubs: [],
            bullishRationale: "Institutional buyer demand steady across western APMC terminals.",
            bearishRationale: "Higher inbound arrivals from neighboring producing clusters.",
            neutralRationale: "Market trading in balanced equilibrium range."
          };

          const oldPrice = (c.modal_price && c.modal_price > 0 && c.modal_price < 50000) ? c.modal_price : profile.baseModal;
          const currentArrivals = c.arrivals_qt || profile.avgArrivals;

          // Realistic supply arrival variance (-12% to +15%)
          const deltaArrivalsPct = (Math.random() * 0.27) - 0.12;
          const newArrivals = Math.max(1000, Math.round(currentArrivals * (1 + deltaArrivalsPct * 0.4)));
          c.arrivals_qt = newArrivals;

          // Microeconomic Price Elasticity Impact: dP = -(dQ * |elasticity|)
          const elasticityImpact = -(deltaArrivalsPct * Math.abs(profile.elasticity) * 0.25);

          // Mean-reversion drift pull to stabilize around genuine APMC benchmark
          const meanReversionDrift = ((profile.baseModal - oldPrice) / profile.baseModal) * 0.35;

          // Small stochastic market noise (-1.0% to +1.0%)
          const marketNoise = (Math.random() * 0.02) - 0.01;

          // Net price movement percentage
          const totalPctMove = elasticityImpact + meanReversionDrift + marketNoise;
          let newPrice = Math.round(oldPrice * (1 + totalPctMove));

          // Ensure price stays strictly within realistic APMC benchmark bands
          newPrice = Math.max(profile.minBand, Math.min(profile.maxBand, newPrice));
          c.modal_price = newPrice;

          // Update trailing 7-day history array
          if (Array.isArray(c.history_7d) && c.history_7d.length >= 7) {
            c.history_7d.shift();
            c.history_7d.push(newPrice);
          } else {
            c.history_7d = [
              Math.round(newPrice * 0.95),
              Math.round(newPrice * 0.96),
              Math.round(newPrice * 0.97),
              Math.round(newPrice * 0.98),
              Math.round(newPrice * 0.99),
              Math.round(newPrice * 0.995),
              newPrice
            ];
          }

          // Compute 1-week percentage change
          c.change_1w_pct = Number((((c.history_7d[c.history_7d.length - 1] - c.history_7d[0]) / c.history_7d[0]) * 100).toFixed(1));

          // Execute Holt-Winters Time-Series ML Model
          const mlForecast = calculateMLForecast(c.history_7d);
          c.forecast = mlForecast;

          // Dynamic Actionable Advisory based on genuine ML momentum signal
          if (mlForecast.signal === "BULLISH") {
            c.advisory = {
              verdict: "STRONG HOLD — PRICE FIRMING UP",
              rationale: profile.bullishRationale
            };
          } else if (mlForecast.signal === "BEARISH") {
            c.advisory = {
              verdict: "SELL IMMEDIATELY — SUPPLY PRESSURE",
              rationale: profile.bearishRationale
            };
          } else {
            c.advisory = {
              verdict: "HOLD / REGULAR DISPATCH",
              rationale: profile.neutralRationale
            };
          }

          // Recalculate Inter-APMC Spatial Arbitrage Matrix
          if (profile.hubs && profile.hubs.length > 0) {
            c.arbitrage_matrix = profile.hubs.map(hub => {
              const mandiModal = newPrice + hub.priceDiff;
              const netGain = mandiModal - newPrice - hub.freight_cost_qt;
              const isViable = netGain > 0;
              const roiPct = Number(((netGain / newPrice) * 100).toFixed(1));
              return {
                target_mandi: hub.target_mandi,
                state: hub.state,
                distance_km: hub.distance_km,
                mandi_modal_price: mandiModal,
                freight_cost_qt: hub.freight_cost_qt,
                net_gain_qt: Math.max(0, netGain),
                roi_pct: Math.max(0, roiPct),
                is_viable: isViable
              };
            });
          }

          // Synchronize with database crops if matching crop name
          if (db.crops) {
            const dbCrop = db.crops.find(dc => 
              (dc.crop && c.commodity && dc.crop.toLowerCase().includes(c.commodity.toLowerCase())) || 
              (c.commodity && dc.crop && c.commodity.toLowerCase().includes(dc.crop.toLowerCase()))
            );
            if (dbCrop) {
              dbCrop.price_per_qt = newPrice;
              dbCrop.price_per_kg = Number((newPrice / 100.0).toFixed(2));
              dbCrop.expectedPrice = `₹ ${dbCrop.price_per_kg.toFixed(2)} /kg (₹ ${dbCrop.price_per_qt.toLocaleString()} /Qt)`;
              dbCrop.expectedPriceNumber = newPrice;
              dbCrop.bestBidNumber = Math.round(newPrice * 1.05);
              dbCrop.bestBid = `₹ ${(dbCrop.bestBidNumber / 100.0).toFixed(2)} /kg (₹ ${dbCrop.bestBidNumber.toLocaleString()} /Qt)`;
            }
          }
        });

        // Recalculate Macro Market Metadata & KPIs
        const totalVol = analyticsData.commodities.reduce((acc, curr) => acc + (curr.arrivals_qt || 0), 0);
        const sumPrice = analyticsData.commodities.reduce((acc, curr) => acc + (curr.modal_price || 0), 0);
        const avgPrice = Math.round(sumPrice / analyticsData.commodities.length);

        const bullishCount = analyticsData.commodities.filter(c => c.forecast && c.forecast.signal === "BULLISH").length;
        const bearishCount = analyticsData.commodities.filter(c => c.forecast && c.forecast.signal === "BEARISH").length;
        
        let overallTrend = "Stable";
        if (bullishCount >= analyticsData.commodities.length / 2) overallTrend = "Bullish";
        else if (bearishCount >= analyticsData.commodities.length / 2) overallTrend = "Bearish";

        let topGainer = analyticsData.commodities[0];
        let maxGain = -999;
        analyticsData.commodities.forEach(c => {
          if (c.change_1w_pct > maxGain) {
            maxGain = c.change_1w_pct;
            topGainer = c;
          }
        });

        if (analyticsData.metadata) {
          analyticsData.metadata.total_mandi_volume_qt = totalVol;
          analyticsData.metadata.avg_modal_price = avgPrice;
          analyticsData.metadata.overall_market_trend = overallTrend;
          if (topGainer) {
            analyticsData.metadata.top_gainer = {
              commodity: topGainer.commodity,
              gain_pct: topGainer.change_1w_pct,
              current_price: topGainer.modal_price
            };
          }
        }
      }

      // Save analytics file to both farmer-module and ai_ml_engine & DB
      try {
        fs.writeFileSync(analyticsFile, JSON.stringify(analyticsData, null, 2), 'utf-8');
        if (fs.existsSync(path.dirname(engineFile))) {
          fs.writeFileSync(engineFile, JSON.stringify(analyticsData, null, 2), 'utf-8');
        }
      } catch (e) {}
      saveDB(db);

      return sendJSON(res, 200, {
        success: true,
        message: "AgriNex AI & ML Analytics synced with latest Maharashtra APMC (MSAMB & e-NAM) feeds with arrival elasticity and Holt-Winters forecasting.",
        updated_at: dateStr,
        data: analyticsData
      });
    }

    if (urlPath === '/api/mandi/forecasts') {
      const analyticsFile = path.join(__dirname, 'farmer-module', 'data', 'mandi_live_analytics.json');
      try {
        if (fs.existsSync(analyticsFile)) {
          const analyticsData = JSON.parse(fs.readFileSync(analyticsFile, 'utf-8'));
          return sendJSON(res, 200, analyticsData);
        }
      } catch (e) {}
      return sendJSON(res, 200, { commodities: [] });
    }

    // 11. Admin & Governance REST APIs
    if (urlPath === '/api/admin/stats' || urlPath === '/api/admin/overview') {
      return sendJSON(res, 200, {
        stats: db.admin_governance ? db.admin_governance.stats : {
          verifiedFarmers: "14,280",
          enterpriseBuyers: "850",
          totalEscrowLocked: "₹ 18,45,00,000",
          disputeRate: "0.14%",
          disputeSLA: "<2h"
        },
        warehouses: db.admin_governance ? db.admin_governance.warehouses : [],
        coldChainTelemetry: db.admin_governance ? db.admin_governance.coldChainTelemetry : {}
      });
    }

    if (urlPath === '/api/admin/warehouses') {
      return sendJSON(res, 200, db.admin_governance ? db.admin_governance.warehouses : []);
    }

    if (urlPath === '/api/admin/cold-chain-telemetry') {
      const ticketId = queryParams.get('case_id') || queryParams.get('ticket_id');
      const telemetry = (db.admin_governance && db.admin_governance.coldChainTelemetry) || {};
      if (ticketId && telemetry[ticketId]) {
        return sendJSON(res, 200, telemetry[ticketId]);
      }
      return sendJSON(res, 200, telemetry);
    }

    if (urlPath === '/api/admin/disputes/auto-arbitrate' && req.method === 'POST') {
      const body = await parseBody(req);
      const ticketId = body.ticketId || body.ticket_id;
      
      return sendJSON(res, 200, {
        success: true,
        ticketId: ticketId,
        autoAwardExecuted: true,
        awardSummary: `Fast-Track Auto-Arbitration Enforced: 100% Payout Awarded based on NABL Lab Assay & Calibrated Weighbridge Clearance.`,
        executedAt: new Date().toISOString()
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

server.listen(PORT, async () => {
  console.log(`AgriNex Platform & REST API server running at http://localhost:${PORT}/`);
  console.log(`REST API Available at http://localhost:${PORT}/api/`);
  await dbService.initDatabase();
});
