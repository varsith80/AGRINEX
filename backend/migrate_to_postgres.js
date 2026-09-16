/**
 * AgriNex Automated PostgreSQL Data Migration Script
 * Migrates all records from backend/data.json into PostgreSQL database tables
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const DATA_FILE = path.join(__dirname, 'data.json');
const SCHEMA_FILE = path.join(__dirname, 'schema.sql');

async function runMigration() {
  console.log('🚀 Starting AgriNex PostgreSQL Migration...');
  const connStr = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/agrinex';
  console.log(`Target Connection: ${connStr.replace(/:[^:@]+@/, ':****@')}`);

  // Step 0: Ensure target database exists
  try {
    const rootConnStr = connStr.replace(/\/agrinex(\?.*)?$/, '/postgres$1');
    const rootPool = new Pool({ connectionString: rootConnStr });
    const rootClient = await rootPool.connect();
    const checkDb = await rootClient.query("SELECT 1 FROM pg_database WHERE datname='agrinex'");
    if (checkDb.rows.length === 0) {
      console.log('🔨 Creating "agrinex" database...');
      await rootClient.query('CREATE DATABASE agrinex');
      console.log('✅ "agrinex" database created successfully.');
    }
    rootClient.release();
    await rootPool.end();
  } catch (e) {
    console.log('ℹ️ Root DB check note:', e.message);
  }

  const pool = new Pool({ connectionString: connStr });

  let client;
  try {
    client = await pool.connect();
    console.log('✅ Connected to PostgreSQL agrinex database successfully!');

    // 1. Run DDL Schema
    console.log('📦 Executing schema DDL (backend/schema.sql)...');
    try {
      await client.query('ALTER TABLE IF EXISTS bids DROP CONSTRAINT IF EXISTS bids_crop_id_fkey;');
    } catch(e) {}
    const schemaSql = fs.readFileSync(SCHEMA_FILE, 'utf8');
    await client.query(schemaSql);
    console.log('✅ All PostgreSQL tables & indexes verified/created.');

    // 2. Read Source Data
    if (!fs.existsSync(DATA_FILE)) {
      console.error('❌ Data file not found:', DATA_FILE);
      process.exit(1);
    }
    const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

    // 3. Migrate Profiles
    if (data.profile) {
      const p = data.profile;
      await client.query(`
        INSERT INTO profiles (id, farmer_id, name, phone, location, bank_name, account_no, ifsc, upi_id)
        VALUES (1, $1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          phone = EXCLUDED.phone,
          location = EXCLUDED.location,
          bank_name = EXCLUDED.bank_name,
          account_no = EXCLUDED.account_no,
          ifsc = EXCLUDED.ifsc,
          upi_id = EXCLUDED.upi_id;
      `, [p.farmer_id || 'FARM-88210', p.name || 'Ramesh Patel', p.phone || '', p.location || '', p.bank_name || '', p.account_no || '', p.ifsc || '', p.upi_id || '']);
      console.log('✅ Profile migrated.');
    }

    // 4. Migrate Crops / Lots
    if (Array.isArray(data.crops)) {
      let cropCount = 0;
      for (const c of data.crops) {
        await client.query(`
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
            status = EXCLUDED.status;
        `, [
          c.id, c.farmer_name || c.farmerName || 'Ramesh Patel', c.crop, c.variety || '', c.category || 'Vegetables',
          c.shelf_life || c.shelfLife || '', c.harvest_date || c.harvestDate || '',
          c.quantity_qt || c.quantityNumber || 0, c.quantity_kg || (c.quantity_qt || 0) * 100,
          c.quantity || '', c.quantityNumber || c.quantity_qt || 0,
          c.price_per_qt || c.pricePerQt || 0, c.price_per_kg || c.pricePerKg || 0,
          c.expected_price || c.expectedPrice || '', c.expected_price_number || c.expectedPriceNumber || 0,
          c.best_bid || c.bestBid || '', c.best_bid_number || c.bestBidNumber || 0,
          c.best_bid_qt || c.bestBidNumber || 0, c.best_bid_kg || 0,
          c.buyer_name || c.buyerName || '', c.state || 'Maharashtra', c.district || 'Nashik',
          c.mandi || 'Lasalgaon Mandi', c.grade || 'Grade A', c.grade_badge_class || c.gradeBadgeClass || 'badge-grade-a',
          c.image || 'assets/images/hero-field.jpg', c.status || 'Active (Bids Open)', c.status_badge_class || c.statusBadgeClass || 'badge-status-open'
        ]);
        cropCount++;
      }
      console.log(`✅ Migrated ${cropCount} crops/lots into PostgreSQL.`);
    }

    // 5. Migrate Bids
    if (Array.isArray(data.bids)) {
      let bidCount = 0;
      for (const b of data.bids) {
        await client.query(`
          INSERT INTO bids (
            id, crop_id, crop, variety, buyer_name, buyer_phone, buyer_type, buyer_rating,
            bid_rate_qt, bid_rate_kg, mandi_ref_kg, mandi_ref_qt, premium_pct,
            quantity_qt, quantity_kg, total_value, advance_35, balance_65, status, time_ago, image
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)
          ON CONFLICT (id) DO NOTHING;
        `, [
          b.id, b.crop_id, b.crop, b.variety || '', b.buyer_name, b.buyer_phone || '',
          b.buyer_type || 'Corporate', b.buyer_rating || '5.0 ★',
          b.bid_rate_qt || 0, b.bid_rate_kg || 0, b.mandi_ref_kg || 0, b.mandi_ref_qt || 0,
          b.premium_pct || '', b.quantity_qt || 0, b.quantity_kg || 0,
          b.total_value || 0, b.advance_35 || 0, b.balance_65 || 0,
          b.status || 'Pending', b.time_ago || 'Just now', b.image || ''
        ]);
        bidCount++;
      }
      console.log(`✅ Migrated ${bidCount} buyer bids into PostgreSQL.`);
    }

    // 6. Migrate FPO Pools
    const fpoPools = data.fpo_pools || data.bulk_demands || [];
    if (Array.isArray(fpoPools)) {
      let poolCount = 0;
      for (const poolItem of fpoPools) {
        await client.query(`
          INSERT INTO fpo_pools (
            id, crop, image, buyer_name, buyer_logo, buyer_category,
            total_required_qty, total_required_number, current_pooled_qty,
            target_price_per_qt, target_price_number, min_contribution, deadline, destination, status, quality_specs, advance_percent, farmer_contributors
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
          ON CONFLICT (id) DO UPDATE SET
            current_pooled_qty = EXCLUDED.current_pooled_qty,
            status = EXCLUDED.status,
            farmer_contributors = EXCLUDED.farmer_contributors;
        `, [
          poolItem.id, poolItem.crop, poolItem.image || '', poolItem.buyer_name || poolItem.buyerName || '',
          poolItem.buyer_logo || poolItem.buyerLogo || '🌾', poolItem.buyer_category || poolItem.buyerCategory || 'Enterprise Buyer',
          poolItem.total_required_qty || poolItem.totalRequiredQty || '', poolItem.total_required_number || poolItem.totalRequiredNumber || 0,
          poolItem.current_pooled_qty || poolItem.currentPooledQty || 0, poolItem.target_price_per_qt || poolItem.targetPricePerQt || '',
          poolItem.target_price_number || poolItem.targetPriceNumber || 0, poolItem.min_contribution || poolItem.minContribution || '',
          poolItem.deadline || '', poolItem.destination || '', poolItem.status || 'Pooling Active',
          poolItem.quality_specs || poolItem.qualitySpecs || '', poolItem.advance_percent || poolItem.advancePercent || '35% Advance',
          JSON.stringify(poolItem.farmer_contributors || poolItem.farmerContributors || [])
        ]);
        poolCount++;
      }
      console.log(`✅ Migrated ${poolCount} FPO bulk pools into PostgreSQL.`);
    }

    // 7. Migrate Escrow Contracts
    if (Array.isArray(data.escrow_contracts)) {
      let escrowCount = 0;
      for (const esc of data.escrow_contracts) {
        await client.query(`
          INSERT INTO escrow_contracts (
            contract_no, bank_ref, crop, variety, buyer,
            total_amount, advance_amount, advance_status, balance_amount, balance_status,
            overall_status, date_label
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
          ON CONFLICT (contract_no) DO UPDATE SET
            overall_status = EXCLUDED.overall_status;
        `, [
          esc.contract_no, esc.bank_ref || '', esc.crop, esc.variety || '', esc.buyer,
          esc.total_amount || 0, esc.advance_amount || 0, esc.advance_status || '',
          esc.balance_amount || 0, esc.balance_status || '', esc.overall_status, esc.date || ''
        ]);
        escrowCount++;
      }
      console.log(`✅ Migrated ${escrowCount} Escrow contracts into PostgreSQL.`);
    }

    // 8. Migrate Shipments
    if (Array.isArray(data.shipments)) {
      let shpCount = 0;
      for (const s of data.shipments) {
        await client.query(`
          INSERT INTO shipments (
            tracking_id, gate_pass, contract_no, crop, variety,
            quantity_qt, quantity_kg, buyer, destination, driver,
            phone, vehicle, status, step, current_loc, speed, eta, total_value, advance_paid, image
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
          ON CONFLICT (tracking_id) DO UPDATE SET
            status = EXCLUDED.status,
            current_loc = EXCLUDED.current_loc;
        `, [
          s.tracking_id, s.gate_pass || '', s.contract_no || '', s.crop, s.variety || '',
          s.quantity_qt || 0, s.quantity_kg || 0, s.buyer || '', s.destination || '', s.driver || '',
          s.phone || '', s.vehicle || '', s.status || 'scheduled', s.step || 1, s.current_loc || '',
          s.speed || '0 km/h', s.eta || '', s.total_value || 0, s.advance_paid || 0, s.image || ''
        ]);
        shpCount++;
      }
      console.log(`✅ Migrated ${shpCount} shipments into PostgreSQL.`);
    }

    // 9. Migrate Grievances
    if (Array.isArray(data.grievances)) {
      let grvCount = 0;
      for (const g of data.grievances) {
        await client.query(`
          INSERT INTO grievances (
            id, farmer_name, category, lot_ref, subject, description, priority,
            status, status_badge, filed_date, assigned_officer, sla_hours, steps, resolution_note
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
          ON CONFLICT (id) DO UPDATE SET
            status = EXCLUDED.status,
            resolution_note = EXCLUDED.resolution_note;
        `, [
          g.id, g.farmer_name || 'Ramesh Patel', g.category, g.lot_ref || '',
          g.subject, g.description || '', g.priority || 'Medium',
          g.status || 'Under Review', g.status_badge || 'badge-status-open',
          g.filed_date || 'Today', g.assigned_officer || '', g.sla_hours || 24,
          JSON.stringify(g.steps || []), g.resolution_note || ''
        ]);
        grvCount++;
      }
      console.log(`✅ Migrated ${grvCount} grievances into PostgreSQL.`);
    }

    // 10. Migrate Warehouses
    if (data.admin_governance && Array.isArray(data.admin_governance.warehouses)) {
      let whCount = 0;
      for (const w of data.admin_governance.warehouses) {
        await client.query(`
          INSERT INTO warehouses (
            id, name, location, total_capacity, occupied_capacity, occupied_pct, primary_crops, temp_range, status, humidity, manager
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
          ON CONFLICT (id) DO UPDATE SET
            occupied_capacity = EXCLUDED.occupied_capacity,
            occupied_pct = EXCLUDED.occupied_pct;
        `, [
          w.id, w.name, w.location || '', w.totalCapacity || 0, w.occupiedCapacity || 0,
          w.occupiedPct || 0, w.primaryCrops || '', w.tempRange || '', w.status || '',
          w.humidity || '', w.manager || ''
        ]);
        whCount++;
      }
      console.log(`✅ Migrated ${whCount} cold storage warehouses into PostgreSQL.`);
    }

    console.log('\n🎉 ALL AGRINEX DATA SUCCESSFULLY MIGRATED TO POSTGRESQL!');
  } catch (err) {
    console.error('❌ Migration Error:', err.message);
  } finally {
    if (client) client.release();
    await pool.end();
  }
}

if (require.main === module) {
  runMigration();
}

module.exports = runMigration;
