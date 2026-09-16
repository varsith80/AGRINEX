-- ==========================================================
-- AgriNex PostgreSQL Database Schema
-- Production-ready schema for Direct Trade Agricultural Platform
-- ==========================================================

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS profiles (
    id SERIAL PRIMARY KEY,
    farmer_id VARCHAR(64) UNIQUE NOT NULL DEFAULT 'FARM-88210',
    name VARCHAR(128) NOT NULL,
    role VARCHAR(128) DEFAULT 'Progressive Farmer & FPO Director',
    phone VARCHAR(32),
    location VARCHAR(256),
    bank_name VARCHAR(128),
    account_no VARCHAR(64),
    ifsc VARCHAR(32),
    upi_id VARCHAR(64),
    notifications_count INT DEFAULT 5,
    messages_count INT DEFAULT 3,
    avatar VARCHAR(256) DEFAULT 'assets/images/farmer-avatar.jpg',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Crops / Lots Table
CREATE TABLE IF NOT EXISTS crops (
    id VARCHAR(64) PRIMARY KEY,
    farmer_name VARCHAR(128) NOT NULL,
    crop VARCHAR(128) NOT NULL,
    variety VARCHAR(128),
    category VARCHAR(64) DEFAULT 'Vegetables',
    shelf_life VARCHAR(64),
    harvest_date VARCHAR(64),
    quantity_qt NUMERIC(10, 2) NOT NULL DEFAULT 0,
    quantity_kg NUMERIC(12, 2) NOT NULL DEFAULT 0,
    quantity VARCHAR(128),
    quantity_number NUMERIC(10, 2) DEFAULT 0,
    price_per_qt NUMERIC(10, 2) NOT NULL DEFAULT 0,
    price_per_kg NUMERIC(10, 2) NOT NULL DEFAULT 0,
    expected_price VARCHAR(128),
    expected_price_number NUMERIC(10, 2) DEFAULT 0,
    best_bid VARCHAR(128),
    best_bid_number NUMERIC(10, 2) DEFAULT 0,
    best_bid_qt NUMERIC(10, 2),
    best_bid_kg NUMERIC(10, 2),
    buyer_name VARCHAR(128),
    state VARCHAR(64) DEFAULT 'Maharashtra',
    district VARCHAR(64) DEFAULT 'Nashik',
    mandi VARCHAR(128) DEFAULT 'Lasalgaon Mandi',
    grade VARCHAR(64) DEFAULT 'Grade A',
    grade_badge_class VARCHAR(64) DEFAULT 'badge-grade-a',
    image VARCHAR(256) DEFAULT 'assets/images/hero-field.jpg',
    status VARCHAR(64) DEFAULT 'Active (Bids Open)',
    status_badge_class VARCHAR(64) DEFAULT 'badge-status-open',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Bids Table
CREATE TABLE IF NOT EXISTS bids (
    id SERIAL PRIMARY KEY,
    crop_id VARCHAR(64),
    crop VARCHAR(128) NOT NULL,
    variety VARCHAR(128),
    buyer_name VARCHAR(128) NOT NULL,
    buyer_phone VARCHAR(32),
    buyer_type VARCHAR(128),
    buyer_rating VARCHAR(64),
    bid_rate_qt NUMERIC(10, 2) NOT NULL DEFAULT 0,
    bid_rate_kg NUMERIC(10, 2) NOT NULL DEFAULT 0,
    mandi_ref_kg NUMERIC(10, 2),
    mandi_ref_qt NUMERIC(10, 2),
    premium_pct VARCHAR(32),
    quantity_qt NUMERIC(10, 2) NOT NULL DEFAULT 0,
    quantity_kg NUMERIC(12, 2) NOT NULL DEFAULT 0,
    total_value NUMERIC(14, 2) NOT NULL DEFAULT 0,
    advance_35 NUMERIC(14, 2) NOT NULL DEFAULT 0,
    balance_65 NUMERIC(14, 2) NOT NULL DEFAULT 0,
    status VARCHAR(64) DEFAULT 'Pending',
    time_ago VARCHAR(64) DEFAULT 'Just Now',
    image VARCHAR(256) DEFAULT 'assets/images/hero-field.jpg',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. FPO Cooperative Bulk Pools Table
CREATE TABLE IF NOT EXISTS fpo_pools (
    id VARCHAR(64) PRIMARY KEY,
    crop VARCHAR(128) NOT NULL,
    image VARCHAR(256),
    buyer_name VARCHAR(128) NOT NULL,
    buyer_logo VARCHAR(32),
    buyer_category VARCHAR(128),
    total_required_qty VARCHAR(64),
    total_required_number NUMERIC(10, 2) NOT NULL DEFAULT 0,
    current_pooled_qty NUMERIC(10, 2) NOT NULL DEFAULT 0,
    target_price_per_qt VARCHAR(64),
    target_price_number NUMERIC(10, 2) NOT NULL DEFAULT 0,
    min_contribution VARCHAR(64),
    deadline VARCHAR(64),
    destination VARCHAR(256),
    status VARCHAR(64) DEFAULT 'Pooling Active',
    quality_specs TEXT,
    advance_percent VARCHAR(32) DEFAULT '35% Advance',
    farmer_contributors JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Escrow Governance & Contracts Table
CREATE TABLE IF NOT EXISTS escrow_contracts (
    contract_no VARCHAR(64) PRIMARY KEY,
    bank_ref VARCHAR(64),
    crop VARCHAR(128) NOT NULL,
    variety VARCHAR(128),
    buyer VARCHAR(128) NOT NULL,
    total_amount NUMERIC(14, 2) NOT NULL DEFAULT 0,
    advance_amount NUMERIC(14, 2) NOT NULL DEFAULT 0,
    advance_status VARCHAR(128),
    balance_amount NUMERIC(14, 2) NOT NULL DEFAULT 0,
    balance_status VARCHAR(128),
    overall_status VARCHAR(128) NOT NULL,
    date_label VARCHAR(64),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Logistics & Shipments Table
CREATE TABLE IF NOT EXISTS shipments (
    tracking_id VARCHAR(64) PRIMARY KEY,
    gate_pass VARCHAR(64),
    contract_no VARCHAR(64),
    crop VARCHAR(128) NOT NULL,
    variety VARCHAR(128),
    quantity_qt NUMERIC(10, 2),
    quantity_kg NUMERIC(12, 2),
    buyer VARCHAR(128) NOT NULL,
    destination VARCHAR(256),
    driver VARCHAR(128),
    phone VARCHAR(32),
    vehicle VARCHAR(64),
    status VARCHAR(64) DEFAULT 'scheduled',
    step INT DEFAULT 1,
    current_loc VARCHAR(256),
    speed VARCHAR(32) DEFAULT '0 km/h',
    eta VARCHAR(64),
    total_value NUMERIC(14, 2),
    advance_paid NUMERIC(14, 2),
    image VARCHAR(256),
    waypoints JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Grievances & Redressal Table
CREATE TABLE IF NOT EXISTS grievances (
    id VARCHAR(64) PRIMARY KEY,
    farmer_name VARCHAR(128) NOT NULL,
    category VARCHAR(128) NOT NULL,
    lot_ref VARCHAR(128),
    subject VARCHAR(256) NOT NULL,
    description TEXT,
    priority VARCHAR(32) DEFAULT 'Medium',
    status VARCHAR(64) DEFAULT 'Under Review',
    status_badge VARCHAR(64) DEFAULT 'badge-status-open',
    filed_date VARCHAR(64),
    assigned_officer VARCHAR(128),
    sla_hours INT DEFAULT 24,
    steps JSONB DEFAULT '[]'::jsonb,
    resolution_note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Warehouses & Governance Storage Table
CREATE TABLE IF NOT EXISTS warehouses (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(256) NOT NULL,
    location VARCHAR(256),
    total_capacity NUMERIC(12, 2) DEFAULT 0,
    occupied_capacity NUMERIC(12, 2) DEFAULT 0,
    occupied_pct NUMERIC(5, 2) DEFAULT 0,
    primary_crops VARCHAR(256),
    temp_range VARCHAR(64),
    status VARCHAR(64),
    humidity VARCHAR(32),
    manager VARCHAR(128),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Cold-Chain IoT Telemetry Table
CREATE TABLE IF NOT EXISTS cold_chain_telemetry (
    id SERIAL PRIMARY KEY,
    contract_or_disp_id VARCHAR(64) NOT NULL,
    reefer_id VARCHAR(64) NOT NULL,
    driver_name VARCHAR(128),
    origin VARCHAR(256),
    destination VARCHAR(256),
    current_temp NUMERIC(5, 2),
    target_temp NUMERIC(5, 2),
    humidity VARCHAR(32),
    status VARCHAR(128),
    route_waypoints JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for high query performance
CREATE INDEX IF NOT EXISTS idx_crops_farmer ON crops(farmer_name);
CREATE INDEX IF NOT EXISTS idx_crops_category ON crops(category);
CREATE INDEX IF NOT EXISTS idx_bids_crop_id ON bids(crop_id);
CREATE INDEX IF NOT EXISTS idx_bids_status ON bids(status);
CREATE INDEX IF NOT EXISTS idx_escrow_buyer ON escrow_contracts(buyer);
CREATE INDEX IF NOT EXISTS idx_shipments_status ON shipments(status);
CREATE INDEX IF NOT EXISTS idx_grievances_status ON grievances(status);
