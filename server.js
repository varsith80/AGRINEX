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
  crops: [
    {
      id: 1,
      farmer_name: "Ramesh Patel",
      crop_name: "Tomato",
      variety: "Hybrid Red",
      quantity_qt: 45,
      price_per_qt: 2400,
      price_per_kg: 24.0,
      state: "Gujarat",
      district: "Surat",
      mandi: "Surat Mandi",
      grade: "Grade A",
      image_url: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400",
      status: "Active",
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      farmer_name: "Ramesh Patel",
      crop_name: "Onion",
      variety: "Nashik Red",
      quantity_qt: 80,
      price_per_qt: 2800,
      price_per_kg: 28.0,
      state: "Maharashtra",
      district: "Nashik",
      mandi: "Lasalgaon Mandi",
      grade: "Grade A",
      image_url: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400",
      status: "Active",
      created_at: new Date().toISOString()
    },
    {
      id: 3,
      farmer_name: "Ramesh Patel",
      crop_name: "Potato",
      variety: "Jyoti Grade A",
      quantity_qt: 120,
      price_per_qt: 1800,
      price_per_kg: 18.0,
      state: "Uttar Pradesh",
      district: "Agra",
      mandi: "Agra Mandi",
      grade: "Grade A",
      image_url: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400",
      status: "Active",
      created_at: new Date().toISOString()
    },
    {
      id: 4,
      farmer_name: "Ramesh Patel",
      crop_name: "Wheat",
      variety: "Sharbati Lokwan",
      quantity_qt: 150,
      price_per_qt: 2600,
      price_per_kg: 26.0,
      state: "Madhya Pradesh",
      district: "Sehore",
      mandi: "Sehore Mandi",
      grade: "Grade A+",
      image_url: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400",
      status: "Active",
      created_at: new Date().toISOString()
    }
  ],
  bids: [
    {
      id: 101,
      crop_id: 1,
      crop_name: "Tomato (Hybrid Red)",
      buyer_name: "FreshCart Retail",
      buyer_phone: "+91 98234 11223",
      buyer_company: "FreshCart Supply Chain",
      bid_price_per_qt: 2450,
      bid_price_per_kg: 24.50,
      quantity_qt: 45,
      offered_total: 110250,
      status: "Pending",
      created_at: "10 mins ago"
    },
    {
      id: 102,
      crop_id: 1,
      crop_name: "Tomato (Hybrid Red)",
      buyer_name: "Reliance Retail Hub",
      buyer_phone: "+91 98990 44556",
      buyer_company: "Reliance Fresh Sourcing",
      bid_price_per_qt: 2380,
      bid_price_per_kg: 23.80,
      quantity_qt: 45,
      offered_total: 107100,
      status: "Pending",
      created_at: "25 mins ago"
    },
    {
      id: 103,
      crop_id: 2,
      crop_name: "Onion (Nashik Red)",
      buyer_name: "Mahyco Agro Traders",
      buyer_phone: "+91 97123 77889",
      buyer_company: "Mahyco Bulk Exporters",
      bid_price_per_qt: 2850,
      bid_price_per_kg: 28.50,
      quantity_qt: 80,
      offered_total: 228000,
      status: "Pending",
      created_at: "1 hour ago"
    },
    {
      id: 104,
      crop_id: 3,
      crop_name: "Potato (Jyoti Grade A)",
      buyer_name: "Balaji Wafers Procurement",
      buyer_phone: "+91 99001 22334",
      buyer_company: "Balaji Snack Foods",
      bid_price_per_qt: 1850,
      bid_price_per_kg: 18.50,
      quantity_qt: 120,
      offered_total: 222000,
      status: "Accepted",
      created_at: "Yesterday"
    }
  ],
  fpo_pools: [
    {
      id: 1,
      pool_name: "Surat Red Onion Export Pool",
      crop_name: "Onion",
      target_qt: 500,
      current_qt: 380,
      floor_price_qt: 2900,
      floor_price_kg: 29.00,
      status: "Open",
      closing_date: "2026-09-20",
      contributors_count: 14
    },
    {
      id: 2,
      pool_name: "North Gujarat Potato Chip Pool",
      crop_name: "Potato",
      target_qt: 800,
      current_qt: 620,
      floor_price_qt: 1950,
      floor_price_kg: 19.50,
      status: "Open",
      closing_date: "2026-09-22",
      contributors_count: 22
    },
    {
      id: 3,
      pool_name: "Central Saurashtra Cotton Lot",
      crop_name: "Cotton",
      target_qt: 400,
      current_qt: 400,
      floor_price_qt: 7200,
      floor_price_kg: 72.00,
      status: "Full",
      closing_date: "2026-09-15",
      contributors_count: 18
    }
  ],
  escrow_contracts: [
    {
      id: 1,
      contract_no: "ESC-2026-0891",
      crop_name: "Potato (Jyoti Grade A)",
      buyer_name: "Balaji Wafers Procurement",
      farmer_name: "Ramesh Patel",
      quantity_qt: 120,
      total_amount: 222000,
      advance_amount: 77700, // 35%
      balance_amount: 144300, // 65%
      status: "Advance Locked",
      gate_pass: "GP-89104",
      bank_ref: "HDFC-ESC-908123"
    },
    {
      id: 2,
      contract_no: "ESC-2026-0842",
      crop_name: "Tomato (Hybrid Red)",
      buyer_name: "Swiggy Instamart Agri",
      farmer_name: "Ramesh Patel",
      quantity_qt: 40,
      total_amount: 96000,
      advance_amount: 33600,
      balance_amount: 62400,
      status: "Dispatched",
      gate_pass: "GP-84219",
      bank_ref: "HDFC-ESC-884102"
    },
    {
      id: 3,
      contract_no: "ESC-2026-0799",
      crop_name: "Wheat (Sharbati)",
      buyer_name: "Aashirvaad ITC Foods",
      farmer_name: "Ramesh Patel",
      quantity_qt: 100,
      total_amount: 260000,
      advance_amount: 91000,
      balance_amount: 169000,
      status: "Settled",
      gate_pass: "GP-79901",
      bank_ref: "HDFC-ESC-772910"
    }
  ],
  shipments: [
    {
      id: 1,
      tracking_id: "TRK-9921",
      contract_no: "ESC-2026-0891",
      crop_name: "Potato (Jyoti Grade A)",
      quantity_qt: 120,
      driver_name: "Sukhdev Singh",
      driver_phone: "+91 98450 11992",
      vehicle_no: "GJ-05-BX-4412",
      origin: "Surat Farm Hub, Gujarat",
      destination: "Balaji Factory, Valsad",
      eta: "Today, 4:30 PM",
      status: "Scheduled",
      lat: 21.1702,
      lng: 72.8311
    },
    {
      id: 2,
      tracking_id: "TRK-9884",
      contract_no: "ESC-2026-0842",
      crop_name: "Tomato (Hybrid Red)",
      quantity_qt: 40,
      driver_name: "Dinesh Yadav",
      driver_phone: "+91 97230 44819",
      vehicle_no: "MH-12-AQ-9011",
      origin: "Surat Farm Hub, Gujarat",
      destination: "Swiggy Central DC, Bhiwandi",
      eta: "Tomorrow, 8:00 AM",
      status: "In Transit",
      lat: 20.3893,
      lng: 72.9106
    }
  ]
};

// Load or initialize DB
function loadDB() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
  } catch (e) {
    console.error('Error loading data.json, falling back to default:', e.message);
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
  // CORS Preflight
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
    // 1. Health
    if (urlPath === '/api/health') {
      return sendJSON(res, 200, {
        status: 'online',
        app: 'AgriNex Unified Backend',
        node_version: process.version,
        time: new Date().toISOString()
      });
    }

    // 2. Mandi AI Forecasts
    if (urlPath === '/api/mandi/forecasts') {
      try {
        if (fs.existsSync(FORECAST_FILE)) {
          const forecastData = JSON.parse(fs.readFileSync(FORECAST_FILE, 'utf8'));
          return sendJSON(res, 200, forecastData);
        }
      } catch (e) {}
      return sendJSON(res, 200, { status: "cached", timestamp: new Date().toISOString() });
    }

    // 3. Crops Endpoints
    if (urlPath === '/api/crops') {
      if (req.method === 'GET') {
        return sendJSON(res, 200, db.crops);
      }
      if (req.method === 'POST') {
        const body = await parseBody(req);
        const newCrop = {
          id: db.crops.length > 0 ? Math.max(...db.crops.map(c => c.id)) + 1 : 1,
          farmer_name: body.farmer_name || "Ramesh Patel",
          crop_name: body.crop_name || "Vegetable",
          variety: body.variety || "Standard",
          quantity_qt: Number(body.quantity_qt) || 10,
          price_per_qt: Number(body.price_per_qt) || 2000,
          price_per_kg: Number((Number(body.price_per_qt || 2000) / 100).toFixed(2)),
          state: body.state || "Gujarat",
          district: body.district || "Surat",
          mandi: body.mandi || "Surat Mandi",
          grade: body.grade || "Grade A",
          image_url: body.image_url || "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400",
          status: "Active",
          created_at: new Date().toISOString()
        };
        db.crops.unshift(newCrop);
        saveDB(db);
        return sendJSON(res, 201, { success: true, crop: newCrop });
      }
    }

    // 4. Bids Endpoints
    if (urlPath === '/api/bids') {
      if (req.method === 'GET') {
        return sendJSON(res, 200, db.bids);
      }
      if (req.method === 'POST') {
        const body = await parseBody(req);
        const newBid = {
          id: db.bids.length > 0 ? Math.max(...db.bids.map(b => b.id)) + 1 : 101,
          crop_id: Number(body.crop_id) || 1,
          crop_name: body.crop_name || "Produce Lot",
          buyer_name: body.buyer_name || "Verified Buyer",
          buyer_phone: body.buyer_phone || "+91 98000 00000",
          buyer_company: body.buyer_company || "Agro Trader",
          bid_price_per_qt: Number(body.bid_price_per_qt) || 2000,
          bid_price_per_kg: Number((Number(body.bid_price_per_qt || 2000) / 100).toFixed(2)),
          quantity_qt: Number(body.quantity_qt) || 10,
          offered_total: (Number(body.bid_price_per_qt) || 2000) * (Number(body.quantity_qt) || 10),
          status: "Pending",
          created_at: "Just now"
        };
        db.bids.unshift(newBid);
        saveDB(db);
        return sendJSON(res, 201, { success: true, bid: newBid });
      }
    }

    // 5. Bid Action (Accept / Reject / Counter)
    if (urlPath.startsWith('/api/bids/') && urlPath.endsWith('/action')) {
      const parts = urlPath.split('/');
      const bidId = Number(parts[3]);
      const body = await parseBody(req);
      const bid = db.bids.find(b => b.id === bidId);
      if (bid) {
        bid.status = body.status || bid.status;
        saveDB(db);
        return sendJSON(res, 200, { success: true, bid });
      }
      return sendJSON(res, 404, { error: 'Bid not found' });
    }

    // 6. FPO Pools Endpoints
    if (urlPath === '/api/fpo/pools') {
      if (req.method === 'GET') {
        return sendJSON(res, 200, db.fpo_pools);
      }
      if (req.method === 'POST') {
        const body = await parseBody(req);
        const newPool = {
          id: db.fpo_pools.length > 0 ? Math.max(...db.fpo_pools.map(p => p.id)) + 1 : 1,
          pool_name: body.pool_name || "New Collective Pool",
          crop_name: body.crop_name || "Produce",
          target_qt: Number(body.target_qt) || 500,
          current_qt: 0,
          floor_price_qt: Number(body.floor_price_qt) || 2500,
          floor_price_kg: Number((Number(body.floor_price_qt || 2500) / 100).toFixed(2)),
          status: "Open",
          closing_date: body.closing_date || "2026-09-30",
          contributors_count: 0
        };
        db.fpo_pools.unshift(newPool);
        saveDB(db);
        return sendJSON(res, 201, { success: true, pool: newPool });
      }
    }

    // 7. FPO Contribution
    if (urlPath === '/api/fpo/contribute') {
      const body = await parseBody(req);
      const pool = db.fpo_pools.find(p => p.id === Number(body.pool_id));
      if (pool) {
        pool.current_qt = Math.min(pool.target_qt, pool.current_qt + Number(body.quantity_qt || 10));
        pool.contributors_count = (pool.contributors_count || 1) + 1;
        if (pool.current_qt >= pool.target_qt) {
          pool.status = "Full";
        }
        saveDB(db);
        return sendJSON(res, 200, { success: true, pool });
      }
      return sendJSON(res, 404, { error: 'Pool not found' });
    }

    // 8. Escrow Contracts
    if (urlPath === '/api/escrow/contracts') {
      return sendJSON(res, 200, db.escrow_contracts);
    }

    if (urlPath.startsWith('/api/escrow/') && urlPath.includes('/action')) {
      const parts = urlPath.split('/');
      const contractId = Number(parts[3]);
      const body = await parseBody(req);
      const contract = db.escrow_contracts.find(c => c.id === contractId);
      if (contract) {
        contract.status = body.status || contract.status;
        saveDB(db);
        return sendJSON(res, 200, { success: true, contract });
      }
      return sendJSON(res, 404, { error: 'Contract not found' });
    }

    // 9. Shipments & Logistics
    if (urlPath === '/api/logistics/shipments') {
      return sendJSON(res, 200, db.shipments);
    }

    // 10. Calculator
    if (urlPath === '/api/calculator/estimate') {
      const crop = queryParams.get('crop') || 'Tomato';
      const qt = Number(queryParams.get('quantity') || 50);
      const baseMandiRate = Number(queryParams.get('mandiRate') || 2200); // per qt
      const platformPremiumRate = baseMandiRate * 1.08; // 8% direct buyer premium
      const freightPerKm = 12;
      const distanceKm = Number(queryParams.get('distance') || 45);
      const totalFreight = freightPerKm * distanceKm;

      const mandiGross = baseMandiRate * qt;
      const platformGross = platformPremiumRate * qt;
      const netPlatformProfit = platformGross - totalFreight;
      const netGain = netPlatformProfit - mandiGross;

      return sendJSON(res, 200, {
        crop,
        quantity_qt: qt,
        quantity_kg: qt * 100,
        mandi_rate_per_qt: baseMandiRate,
        mandi_rate_per_kg: Number((baseMandiRate / 100).toFixed(2)),
        platform_rate_per_qt: Math.round(platformPremiumRate),
        platform_rate_per_kg: Number((platformPremiumRate / 100).toFixed(2)),
        mandi_total: mandiGross,
        platform_gross: platformGross,
        freight_cost: totalFreight,
        platform_net_profit: netPlatformProfit,
        net_extra_gain: netGain
      });
    }

    return sendJSON(res, 404, { error: "Endpoint not found" });
  }

  // ================= STATIC FILE SERVING =================
  let reqPath = decodeURI(urlPath);
  if (reqPath === '/') {
    reqPath = '/index.html';
  }

  const filePath = path.join(PUBLIC_DIR, reqPath);

  // Prevent directory traversal
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
