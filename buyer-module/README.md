# AgriNex - Wholesale Buyer Module Dashboard

A modern, responsive, and pixel-perfect Wholesale Buyer Dashboard UI for the **AgriNex** agricultural direct-trade platform.

---

## 🏢 Module Architecture

```
buyer-module/
├── index.html                # Buyer Dashboard Main View
├── buyerdashboard.html       # Redirect alias
├── css/
│   ├── variables.css         # Design tokens, color palette, typography & spacing
│   ├── components.css        # Reusable UI components (buttons, badges, modals, form inputs)
│   └── dashboard.css         # Grid layout, hero banner, stat cards, tables, right rail
├── js/
│   ├── data.js               # Structured mock state (verified lots, demands, mandi trends, contracts)
│   ├── calculator.js         # Interactive bulk procurement landed cost & savings calculator
│   ├── charts.js             # High-precision SVG sparklines generator for Mandi price trends
│   └── dashboard.js          # Modal managers, dynamic verified lot renderer, location switcher & toast system
└── assets/
    └── images/               # High-res SVG & vector crop visuals, avatar, and promo banners
        ├── farmer-avatar.png
        ├── farmer-banner.jpg
        ├── tomato.png
        ├── onion.png
        ├── paddy.png
        └── cotton.png
```

---

## 🚀 Key Features

1. **Brand Navigation & Sidebar:**
   - Dual-leaf AgriNex branding with tagline *"Direct Trade · Better Tomorrow"*.
   - Direct switch button: *"Switch to Farmer Portal 🌾"*.
   - Interactive navigation items with notification counters.
   - Promotional procurement banner highlighting *"Verified Quality. Zero Commission."*

2. **Buyer Hero Section:**
   - Personalized greeting *"Good Morning, Karthik! 🏢"*.
   - Dynamic location indicator (e.g. *Hosur Hub, Tamil Nadu*) with in-place location switching.
   - Quick action CTA buttons.

3. **Overview Metric Cards:**
   - **Active Demands:** 4 Quotas
   - **Matched Lots:** 8 Lots in radius
   - **In Transit:** 2 Shipments
   - **Middleman Savings:** ₹ 46,200 (Saved vs traditional mandi brokers)

4. **Verified Farmer Produce Lots Table:**
   - Verified crop lot catalog with Grade badges (A/B), Moisture ratings, Farmer trust scores, Floor ask prices, Mandi saving badges, and instant *"Buy (Escrow)"* and *"Bid"* actions.

5. **Bulk Procurement Demands Manager:**
   - Real-time broadcasted quotas with auto-matched farmer lots count in radius.

6. **Live Mandi Prices & Sparklines:**
   - Real-time 7-day trend sparklines for Tomato, Onion, Paddy, and Cotton with indicator arrows and percentage shifts.

7. **Interactive Landed Cost & Savings Calculator:**
   - Live calculations based on Sourcing Volume, Farmer Floor Rate, Haulage Distance, Vehicle Fleet type, and Escrow fee with automatic middleman savings updates.

8. **Escrow & Shipment Tracking:**
   - Multi-stage stepper progress: *Contract Signed* ➔ *Advance Locked (35%)* ➔ *Dispatched (In Transit)* ➔ *Settled (Payment Released)*.

9. **Procurement Modals:**
   - Modal to post new bulk sourcing quotas.
   - Modal for Direct Escrow Purchases (35% advance lock).
   - Modal to submit Custom Counter-Offer Bids to farmers.
