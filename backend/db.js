/**
 * AgriNex Database Adapter - PostgreSQL with Fallback Engine
 * Provides resilient connection pooling, auto-schema initialization, and CRUD services.
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const DATA_FILE = path.join(__dirname, 'data.json');
const SCHEMA_FILE = path.join(__dirname, 'schema.sql');

let isPostgresConnected = false;
let pool = null;

// Database Connection String
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/agrinex';

try {
  pool = new Pool({
    connectionString: connectionString,
    connectionTimeoutMillis: 3000,
    idleTimeoutMillis: 30000,
    max: 20
  });

  // Handle unexpected idle client errors
  pool.on('error', (err) => {
    console.warn('[PostgreSQL Pool Warning]', err.message);
  });
} catch (e) {
  console.warn('[PostgreSQL Init]', 'Running in local file-store mode:', e.message);
}

// File database backup / fallback loader
function loadLocalDB() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
    }
  } catch (e) {
    console.error('[DB Local Fallback Error]', e.message);
  }
  return {};
}

function saveLocalDB(data) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.error('[DB Local Save Error]', e.message);
  }
}

/**
 * Initialize PostgreSQL Schema and Test Connection
 */
async function initDatabase() {
  if (!pool) return false;
  try {
    const client = await pool.connect();
    try {
      if (fs.existsSync(SCHEMA_FILE)) {
        const schemaSql = fs.readFileSync(SCHEMA_FILE, 'utf8');
        await client.query(schemaSql);
      }
      isPostgresConnected = true;
      console.log('✅ PostgreSQL connected successfully to:', connectionString.replace(/:[^:@]+@/, ':****@'));
      return true;
    } finally {
      client.release();
    }
  } catch (err) {
    isPostgresConnected = false;
    console.log('ℹ️  PostgreSQL server is offline or unreachable. AgriNex is seamlessly running with local persistent data store.');
    console.log('   (To connect PostgreSQL, update DATABASE_URL in .env and start PostgreSQL service)');
    return false;
  }
}

/**
 * Execute generic SQL query on PostgreSQL
 */
async function query(text, params = []) {
  if (!isPostgresConnected || !pool) {
    return { rows: [], rowCount: 0 };
  }
  return await pool.query(text, params);
}

// ==========================================
// UNIFIED CRUD DATA LAYER (PostgreSQL + Sync)
// ==========================================

const dbService = {
  isPostgres: () => isPostgresConnected,
  query: query,
  initDatabase: initDatabase,

  // --- Profile ---
  async getProfile() {
    if (isPostgresConnected) {
      try {
        const res = await query('SELECT * FROM profiles ORDER BY id LIMIT 1');
        if (res.rows.length > 0) return res.rows[0];
      } catch (e) {
        console.warn('PG getProfile fallback:', e.message);
      }
    }
    const local = loadLocalDB();
    return local.profile || {};
  },

  async updateProfile(updates) {
    const local = loadLocalDB();
    local.profile = Object.assign(local.profile || {}, updates);
    saveLocalDB(local);

    if (isPostgresConnected) {
      try {
        const p = local.profile;
        await query(`
          INSERT INTO profiles (id, farmer_id, name, phone, location, bank_name, account_no, ifsc, upi_id, updated_at)
          VALUES (1, $1, $2, $3, $4, $5, $6, $7, $8, NOW())
          ON CONFLICT (id) DO UPDATE SET
            name = EXCLUDED.name,
            phone = EXCLUDED.phone,
            location = EXCLUDED.location,
            bank_name = EXCLUDED.bank_name,
            account_no = EXCLUDED.account_no,
            ifsc = EXCLUDED.ifsc,
            upi_id = EXCLUDED.upi_id,
            updated_at = NOW();
        `, [p.farmer_id || 'FARM-88210', p.name || '', p.phone || '', p.location || '', p.bank_name || '', p.account_no || '', p.ifsc || '', p.upi_id || '']);
      } catch (e) {
        console.warn('PG updateProfile error:', e.message);
      }
    }
    return local.profile;
  },

  // --- Crops / Lots ---
  async getCrops(filter = {}) {
    if (isPostgresConnected) {
      try {
        let sql = 'SELECT * FROM crops WHERE 1=1';
        const params = [];
        if (filter.status) {
          params.push(`%${filter.status}%`);
          sql += ` AND status ILIKE $${params.length}`;
        }
        if (filter.category) {
          params.push(filter.category);
          sql += ` AND category = $${params.length}`;
        }
        sql += ' ORDER BY created_at DESC';
        const res = await query(sql, params);
        if (res.rows.length > 0) return res.rows;
      } catch (e) {
        console.warn('PG getCrops fallback:', e.message);
      }
    }
    let list = loadLocalDB().crops || [];
    if (filter.status) list = list.filter(c => c.status && c.status.toLowerCase().includes(filter.status.toLowerCase()));
    if (filter.category) list = list.filter(c => c.category && c.category.toLowerCase() === filter.category.toLowerCase());
    return list;
  },

  async addCrop(crop) {
    const local = loadLocalDB();
    if (!local.crops) local.crops = [];
    local.crops.unshift(crop);
    saveLocalDB(local);

    if (isPostgresConnected) {
      try {
        await query(`
          INSERT INTO crops (
            id, farmer_name, crop, variety, category, shelf_life, harvest_date,
            quantity_qt, quantity_kg, quantity, quantity_number,
            price_per_qt, price_per_kg, expected_price, expected_price_number,
            best_bid, best_bid_number, best_bid_qt, best_bid_kg, buyer_name,
            state, district, mandi, grade, grade_badge_class, image, status, status_badge_class
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7,
            $8, $9, $10, $11,
            $12, $13, $14, $15,
            $16, $17, $18, $19, $20,
            $21, $22, $23, $24, $25, $26, $27, $28
          ) ON CONFLICT (id) DO UPDATE SET
            quantity_qt = EXCLUDED.quantity_qt,
            price_per_qt = EXCLUDED.price_per_qt,
            status = EXCLUDED.status,
            updated_at = NOW();
        `, [
          crop.id, crop.farmer_name || crop.farmerName || 'Ramesh Patel', crop.crop, crop.variety || '', crop.category || 'Vegetables',
          crop.shelf_life || crop.shelfLife || '', crop.harvest_date || crop.harvestDate || '',
          crop.quantity_qt || crop.quantityNumber || 0, crop.quantity_kg || (crop.quantity_qt || 0) * 100,
          crop.quantity || '', crop.quantityNumber || crop.quantity_qt || 0,
          crop.price_per_qt || crop.pricePerQt || 0, crop.price_per_kg || crop.pricePerKg || 0,
          crop.expected_price || crop.expectedPrice || '', crop.expected_price_number || crop.expectedPriceNumber || 0,
          crop.best_bid || crop.bestBid || '', crop.best_bid_number || crop.bestBidNumber || 0,
          crop.best_bid_qt || crop.bestBidNumber || 0, crop.best_bid_kg || 0,
          crop.buyer_name || crop.buyerName || '', crop.state || 'Maharashtra', crop.district || 'Nashik',
          crop.mandi || 'Lasalgaon Mandi', crop.grade || 'Grade A', crop.grade_badge_class || crop.gradeBadgeClass || 'badge-grade-a',
          crop.image || 'assets/images/hero-field.jpg', crop.status || 'Active (Bids Open)', crop.status_badge_class || crop.statusBadgeClass || 'badge-status-open'
        ]);
      } catch (e) {
        console.warn('PG addCrop error:', e.message);
      }
    }
    return crop;
  },

  async deleteCrop(id) {
    const local = loadLocalDB();
    if (local.crops) {
      local.crops = local.crops.filter(c => c.id !== id);
      saveLocalDB(local);
    }
    if (isPostgresConnected) {
      try {
        await query('DELETE FROM crops WHERE id = $1', [id]);
      } catch (e) {
        console.warn('PG deleteCrop error:', e.message);
      }
    }
    return true;
  },

  // --- Bids ---
  async getBids() {
    if (isPostgresConnected) {
      try {
        const res = await query('SELECT * FROM bids ORDER BY created_at DESC');
        if (res.rows.length > 0) return res.rows;
      } catch (e) {
        console.warn('PG getBids fallback:', e.message);
      }
    }
    return loadLocalDB().bids || [];
  },

  async addBid(bid) {
    const local = loadLocalDB();
    if (!local.bids) local.bids = [];
    local.bids.unshift(bid);
    saveLocalDB(local);

    if (isPostgresConnected) {
      try {
        await query(`
          INSERT INTO bids (
            crop_id, crop, variety, buyer_name, buyer_phone, buyer_type, buyer_rating,
            bid_rate_qt, bid_rate_kg, mandi_ref_kg, mandi_ref_qt, premium_pct,
            quantity_qt, quantity_kg, total_value, advance_35, balance_65, status, time_ago, image
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
        `, [
          bid.crop_id, bid.crop, bid.variety || '', bid.buyer_name, bid.buyer_phone || '',
          bid.buyer_type || 'Corporate', bid.buyer_rating || '5.0 ★',
          bid.bid_rate_qt || 0, bid.bid_rate_kg || 0, bid.mandi_ref_kg || 0, bid.mandi_ref_qt || 0,
          bid.premium_pct || '', bid.quantity_qt || 0, bid.quantity_kg || 0,
          bid.total_value || 0, bid.advance_35 || 0, bid.balance_65 || 0,
          bid.status || 'Pending', bid.time_ago || 'Just now', bid.image || ''
        ]);
      } catch (e) {
        console.warn('PG addBid error:', e.message);
      }
    }
    return bid;
  },

  async updateBid(id, updates) {
    const local = loadLocalDB();
    if (local.bids) {
      const idx = local.bids.findIndex(b => b.id === id || b.id === parseInt(id));
      if (idx !== -1) {
        local.bids[idx] = Object.assign(local.bids[idx], updates);
        saveLocalDB(local);
      }
    }
    if (isPostgresConnected) {
      try {
        if (updates.status) {
          await query('UPDATE bids SET status = $1, updated_at = NOW() WHERE id = $2', [updates.status, id]);
        }
      } catch (e) {
        console.warn('PG updateBid error:', e.message);
      }
    }
    return true;
  },

  // --- FPO Pools ---
  async getFPOPools() {
    if (isPostgresConnected) {
      try {
        const res = await query('SELECT * FROM fpo_pools ORDER BY id ASC');
        if (res.rows.length > 0) return res.rows;
      } catch (e) {
        console.warn('PG getFPOPools fallback:', e.message);
      }
    }
    return loadLocalDB().fpo_pools || loadLocalDB().bulk_demands || [];
  },

  // --- Escrow Contracts ---
  async getEscrowContracts() {
    if (isPostgresConnected) {
      try {
        const res = await query('SELECT * FROM escrow_contracts ORDER BY created_at DESC');
        if (res.rows.length > 0) return res.rows;
      } catch (e) {
        console.warn('PG getEscrowContracts fallback:', e.message);
      }
    }
    return loadLocalDB().escrow_contracts || [];
  },

  async addEscrowContract(escrow) {
    const local = loadLocalDB();
    if (!local.escrow_contracts) local.escrow_contracts = [];
    local.escrow_contracts.unshift(escrow);
    saveLocalDB(local);

    if (isPostgresConnected) {
      try {
        await query(`
          INSERT INTO escrow_contracts (
            contract_no, bank_ref, crop, variety, buyer,
            total_amount, advance_amount, advance_status, balance_amount, balance_status,
            overall_status, date_label
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
          ON CONFLICT (contract_no) DO UPDATE SET
            advance_status = EXCLUDED.advance_status,
            balance_status = EXCLUDED.balance_status,
            overall_status = EXCLUDED.overall_status,
            updated_at = NOW();
        `, [
          escrow.contract_no, escrow.bank_ref || '', escrow.crop, escrow.variety || '', escrow.buyer,
          escrow.total_amount || 0, escrow.advance_amount || 0, escrow.advance_status || '',
          escrow.balance_amount || 0, escrow.balance_status || '', escrow.overall_status, escrow.date || ''
        ]);
      } catch (e) {
        console.warn('PG addEscrowContract error:', e.message);
      }
    }
    return escrow;
  },

  // --- Shipments ---
  async getShipments() {
    if (isPostgresConnected) {
      try {
        const res = await query('SELECT * FROM shipments ORDER BY created_at DESC');
        if (res.rows.length > 0) return res.rows;
      } catch (e) {
        console.warn('PG getShipments fallback:', e.message);
      }
    }
    return loadLocalDB().shipments || [];
  },

  // --- Grievances ---
  async getGrievances() {
    if (isPostgresConnected) {
      try {
        const res = await query('SELECT * FROM grievances ORDER BY created_at DESC');
        if (res.rows.length > 0) return res.rows;
      } catch (e) {
        console.warn('PG getGrievances fallback:', e.message);
      }
    }
    return loadLocalDB().grievances || [];
  },

  async addGrievance(grv) {
    const local = loadLocalDB();
    if (!local.grievances) local.grievances = [];
    local.grievances.unshift(grv);
    saveLocalDB(local);

    if (isPostgresConnected) {
      try {
        await query(`
          INSERT INTO grievances (
            id, farmer_name, category, lot_ref, subject, description, priority,
            status, status_badge, filed_date, assigned_officer, sla_hours, steps, resolution_note
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
          ON CONFLICT (id) DO UPDATE SET
            status = EXCLUDED.status,
            resolution_note = EXCLUDED.resolution_note,
            updated_at = NOW();
        `, [
          grv.id, grv.farmer_name || 'Ramesh Patel', grv.category, grv.lot_ref || '',
          grv.subject, grv.description || '', grv.priority || 'Medium',
          grv.status || 'Under Review', grv.status_badge || 'badge-status-open',
          grv.filed_date || 'Today', grv.assigned_officer || '', grv.sla_hours || 24,
          JSON.stringify(grv.steps || []), grv.resolution_note || ''
        ]);
      } catch (e) {
        console.warn('PG addGrievance error:', e.message);
      }
    }
    return grv;
  },

  // --- Admin Governance & Warehouses ---
  async getAdminGovernance() {
    if (isPostgresConnected) {
      try {
        const resWarehouses = await query('SELECT * FROM warehouses ORDER BY id ASC');
        const local = loadLocalDB();
        const gov = local.admin_governance || {};
        if (resWarehouses.rows.length > 0) {
          gov.warehouses = resWarehouses.rows;
        }
        return gov;
      } catch (e) {
        console.warn('PG getAdminGovernance fallback:', e.message);
      }
    }
    return loadLocalDB().admin_governance || {};
  }
};

module.exports = dbService;
