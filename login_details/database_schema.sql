-- ==========================================================
-- AGRINEX ENTERPRISE DATABASE SCHEMA
-- Multi-Tenant Role-Based Authentication & Direct-Trade Core
-- Roles: FARMER | BUYER | LOGISTICS | ADMIN
-- ==========================================================

CREATE TABLE IF NOT EXISTS roles (
    role_id VARCHAR(30) PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO roles (role_id, role_name, description) VALUES
('ROLE_FARMER', 'Farmer', 'Harvest listings, direct bids, escrow payment settlement'),
('ROLE_BUYER', 'Buyer / Mill', 'Commodity procurement, bulk bidding, mandi contracts'),
('ROLE_LOGISTICS', 'Logistics Provider', 'Fleet dispatch, GPS route tracking, delivery confirmation'),
('ROLE_ADMIN', 'Platform Administrator', 'Mandi governance, KYC verification, dispute resolution, analytics')
ON CONFLICT (role_id) DO NOTHING;

-- USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    user_id VARCHAR(50) PRIMARY KEY,
    role_id VARCHAR(30) NOT NULL REFERENCES roles(role_id),
    email VARCHAR(120) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    avatar_url VARCHAR(255),
    kyc_status VARCHAR(20) DEFAULT 'VERIFIED', -- 'PENDING', 'VERIFIED', 'REJECTED'
    account_status VARCHAR(20) DEFAULT 'ACTIVE', -- 'ACTIVE', 'SUSPENDED'
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- FARMER PROFILES
CREATE TABLE IF NOT EXISTS farmer_profiles (
    farmer_id VARCHAR(50) PRIMARY KEY REFERENCES users(user_id),
    farm_name VARCHAR(120),
    mandi_location VARCHAR(120) NOT NULL,
    state VARCHAR(50) NOT NULL,
    total_land_acres DECIMAL(6,2),
    primary_crops TEXT[], -- Array of crops e.g. Tomato, Onion, Paddy
    bank_account_verified BOOLEAN DEFAULT TRUE
);

-- BUYER PROFILES
CREATE TABLE IF NOT EXISTS buyer_profiles (
    buyer_id VARCHAR(50) PRIMARY KEY REFERENCES users(user_id),
    company_name VARCHAR(150) NOT NULL,
    business_type VARCHAR(50), -- 'Wholesaler', 'Food Processor', 'Export Mill', 'Supermarket'
    gstin VARCHAR(20) UNIQUE,
    credit_limit DECIMAL(12,2) DEFAULT 5000000.00,
    escrow_balance DECIMAL(12,2) DEFAULT 1250000.00
);

-- LOGISTICS PROFILES
CREATE TABLE IF NOT EXISTS logistics_profiles (
    logistics_id VARCHAR(50) PRIMARY KEY REFERENCES users(user_id),
    fleet_name VARCHAR(120) NOT NULL,
    vehicle_types TEXT[], -- 'Mini Truck', 'Pickup', 'Tractor', 'Heavy 6-Wheel'
    active_vehicles INT DEFAULT 18,
    operating_regions TEXT[]
);

-- CROP LOT LISTINGS
CREATE TABLE IF NOT EXISTS crop_lots (
    lot_id VARCHAR(50) PRIMARY KEY,
    farmer_id VARCHAR(50) NOT NULL REFERENCES users(user_id),
    crop_name VARCHAR(80) NOT NULL,
    variety VARCHAR(80),
    grade VARCHAR(20) NOT NULL, -- 'Grade A', 'Grade B', 'Grade C'
    quantity_quintals DECIMAL(8,2) NOT NULL,
    expected_floor_price DECIMAL(10,2) NOT NULL,
    current_best_bid DECIMAL(10,2),
    harvest_date DATE,
    pickup_mandi VARCHAR(120),
    status VARCHAR(30) DEFAULT 'BIDS_OPEN', -- 'BIDS_OPEN', 'NEGOTIATION', 'DISPATCHED', 'SETTLED'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- BUYER BIDS
CREATE TABLE IF NOT EXISTS bids (
    bid_id VARCHAR(50) PRIMARY KEY,
    lot_id VARCHAR(50) NOT NULL REFERENCES crop_lots(lot_id),
    buyer_id VARCHAR(50) NOT NULL REFERENCES users(user_id),
    bid_price_per_qt DECIMAL(10,2) NOT NULL,
    total_bid_amount DECIMAL(12,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'ACTIVE', -- 'ACTIVE', 'ACCEPTED', 'REJECTED', 'EXPIRED'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ESCROW TRANSACTIONS & SHIPMENTS
CREATE TABLE IF NOT EXISTS orders_escrow (
    order_id VARCHAR(50) PRIMARY KEY,
    lot_id VARCHAR(50) NOT NULL REFERENCES crop_lots(lot_id),
    farmer_id VARCHAR(50) NOT NULL REFERENCES users(user_id),
    buyer_id VARCHAR(50) NOT NULL REFERENCES users(user_id),
    logistics_id VARCHAR(50) REFERENCES users(user_id),
    total_amount DECIMAL(12,2) NOT NULL,
    advance_locked_35 DECIMAL(12,2) NOT NULL,
    escrow_status VARCHAR(30) DEFAULT 'ADVANCE_LOCKED', -- 'ADVANCE_LOCKED', 'DISPATCHED', 'SETTLED'
    shipment_status VARCHAR(30) DEFAULT 'IN_TRANSIT',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
