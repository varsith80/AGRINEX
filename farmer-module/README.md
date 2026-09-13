# AgriNex - Farmer Module Dashboard

A modern, responsive, and pixel-perfect Farmer Dashboard UI for the **AgriNex** agricultural direct-trade platform.

---

## 🌾 Module Architecture

```
farmer-module/
├── index.html                # Farmer Dashboard Main View
├── css/
│   ├── variables.css         # Design tokens, color palette, typography & spacing
│   ├── components.css        # Reusable UI components (buttons, badges, modals, form inputs)
│   └── dashboard.css         # Grid layout, hero banner, stat cards, tables, right rail
├── js/
│   ├── data.js               # Structured mock state (listings, mandi trends, forecast, tracking)
│   ├── calculator.js         # Real-time interactive profit calculator engine
│   ├── charts.js             # High-precision SVG sparklines generator for Mandi price trends
│   └── dashboard.js          # Modal managers, dynamic listing renderer, location switcher & toast system
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
   - Interactive navigation items with notification counters.
   - Promotional banner card highlighting *"Real Buyers. Better Prices. Direct to You."*

2. **Farmer Hero Section:**
   - Personalized greeting *"Good Morning, Ramesh! 👋"*.
   - Dynamic location indicator (e.g. *Erode, Tamil Nadu*) with in-place location switching.
   - Callout badge: *"Better prices for your hard work"*.

3. **Overview Metric Cards:**
   - **Total Crop Lots:** 3 Active listings
   - **Active Bids:** 2 Buyers interested
   - **Pending Shipments:** 1 In transit
   - **Estimated Profit:** ₹ 18,450 (After transport & charges)

4. **Crop Listings Table:**
   - Full lot information displaying Crop, Grade badge, Quantity, Floor Price, Best Bid & Buyer, Status pill, and Action modal.

5. **Live Mandi Prices & Sparklines:**
   - Real-time 7-day trend sparklines for Tomato, Onion, Paddy, and Cotton with indicator arrows and percentage shifts.

6. **Interactive Profit Calculator:**
   - Live calculations based on Distance, Vehicle Type, Fuel Price, and Toll Charges with automatic take-home profit updates.

7. **Escrow & Shipment Tracking:**
   - Multi-stage stepper progress: *Advance Locked (35%)* ➔ *Dispatched (In Transit)* ➔ *Settled (Payment Released)*.

8. **Listing Creation & Lot Modals:**
   - Full modal workflows to add new crop listings and review buyer bids in real time.
