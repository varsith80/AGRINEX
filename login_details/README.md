# AgriNex - Multi-Module Authentication & Database Gateway

This directory contains the central authentication hub, credentials store, database schema, and dedicated login portals for all **4 AgriNex Modules**:

1. **🌾 Farmer Module** (`farmer_login.html` & `../farmer-module/`)
2. **🏢 Buyer & Mill Module** (`buyer_login.html`)
3. **🚚 Logistics & Fleet Module** (`logistics_login.html`)
4. **🛡️ Admin & Governance Module** (`admin_login.html`)

---

## 🔑 Demo Login Credentials

| Role | Name / Organization | Email | Phone | Password | Target Dashboard |
|---|---|---|---|---|---|
| **Farmer** | Ramesh Kumar | `farmer@agrinex.in` | `9876543210` | `Farmer@123` | `../farmer-module/index.html` |
| **Buyer** | Suresh Singhania (AgriFoods Ltd.) | `buyer@agrifoods.com` | `9841011223` | `Buyer@123` | `../farmer-module/index.html?role=buyer` |
| **Logistics** | Karthik Raja (GreenWays Transit) | `transit@greenwayslogistics.in` | `9822099887` | `Logistics@123` | `../farmer-module/index.html?role=logistics` |
| **Admin** | Dr. A. Venkatesh (Mandi Authority) | `admin@agrinex.gov.in` | `9000000001` | `Admin@123` | `../farmer-module/index.html?role=admin` |

---

## 🗄️ Database Architecture (`database_schema.sql`)

The schema establishes an enterprise-ready relational architecture:
- `users`: Core multi-tenant identities with role-based access control (RBAC).
- `roles`: Granular permission sets for Farmer, Buyer, Logistics, and Admin.
- `farmer_profiles`, `buyer_profiles`, `logistics_profiles`: Domain-specific metadata and verification records.
- `crop_lots`: Harvest listings with quality grade, quantity, expected floor price, and status.
- `bids`: Live buyer bids and floor matching logic.
- `orders_escrow`: Multi-stage escrow transactions with locked advance and dispatch settlement tracking.
