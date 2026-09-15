const http = require('http');
const fs = require('fs');
const path = require('path');

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
