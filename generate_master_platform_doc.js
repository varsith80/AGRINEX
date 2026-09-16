const fs = require('fs');
const path = require('path');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  ShadingType
} = require('docx');

async function createMasterPlatformGuide() {
  const primaryColor = "0C5A36";    // Deep Forest Green
  const secondaryColor = "166534";  // Emerald Green
  const darkTextColor = "0F172A";   // Slate 900
  const lightBgColor = "F0FDF4";    // Soft Mint Light
  const tableHeaderBg = "0C5A36";   // Table Header Green
  const borderColor = "CBD5E1";     // Slate 300
  const accentGold = "D97706";      // Warm Amber Gold
  const navyColor = "0369A1";        // Ocean Blue
  const purpleColor = "6B21A8";      // Deep Purple

  function p(text, options = {}) {
    return new Paragraph({
      alignment: options.alignment || AlignmentType.LEFT,
      spacing: { before: options.before || 100, after: options.after || 100, line: 276 },
      children: [
        new TextRun({
          text: text,
          font: "Plus Jakarta Sans",
          size: options.size || 22, // 11pt
          bold: !!options.bold,
          italics: !!options.italics,
          color: options.color || darkTextColor,
        })
      ]
    });
  }

  function pComposite(runs, options = {}) {
    return new Paragraph({
      alignment: options.alignment || AlignmentType.LEFT,
      spacing: { before: options.before || 100, after: options.after || 100, line: 276 },
      children: runs.map(r => new TextRun({
        text: r.text,
        font: "Plus Jakarta Sans",
        size: r.size || 22,
        bold: !!r.bold,
        italics: !!r.italics,
        color: r.color || darkTextColor,
      }))
    });
  }

  function calloutBox(title, text, boxColor = primaryColor, fillBg = lightBgColor) {
    return new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: {
        top: { style: BorderStyle.SINGLE, size: 4, color: boxColor },
        bottom: { style: BorderStyle.SINGLE, size: 4, color: boxColor },
        left: { style: BorderStyle.SINGLE, size: 14, color: boxColor },
        right: { style: BorderStyle.SINGLE, size: 4, color: boxColor },
      },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              shading: { type: ShadingType.CLEAR, fill: fillBg },
              margins: { top: 140, bottom: 140, left: 180, right: 180 },
              children: [
                new Paragraph({
                  spacing: { before: 40, after: 60 },
                  children: [
                    new TextRun({ text: `📌 ${title}`, bold: true, size: 22, color: boxColor, font: "Plus Jakarta Sans" })
                  ]
                }),
                new Paragraph({
                  spacing: { before: 40, after: 40, line: 260 },
                  children: [
                    new TextRun({ text: text, size: 20, color: darkTextColor, font: "Plus Jakarta Sans" })
                  ]
                })
              ]
            })
          ]
        })
      ]
    });
  }

  function h1(title) {
    return new Paragraph({
      heading: HeadingLevel.HEADING_1,
      spacing: { before: 360, after: 140 },
      children: [
        new TextRun({
          text: title,
          font: "Plus Jakarta Sans",
          size: 32, // 16pt
          bold: true,
          color: primaryColor
        })
      ]
    });
  }

  function h2(title) {
    return new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 260, after: 100 },
      children: [
        new TextRun({
          text: title,
          font: "Plus Jakarta Sans",
          size: 26, // 13pt
          bold: true,
          color: secondaryColor
        })
      ]
    });
  }

  function h3(title) {
    return new Paragraph({
      heading: HeadingLevel.HEADING_3,
      spacing: { before: 180, after: 80 },
      children: [
        new TextRun({
          text: title,
          font: "Plus Jakarta Sans",
          size: 22, // 11pt
          bold: true,
          color: navyColor
        })
      ]
    });
  }

  function bullet(label, text) {
    return new Paragraph({
      bullet: { level: 0 },
      spacing: { before: 50, after: 50, line: 260 },
      children: [
        new TextRun({ text: `${label}: `, bold: true, size: 21, color: darkTextColor, font: "Plus Jakarta Sans" }),
        new TextRun({ text: text, size: 21, color: darkTextColor, font: "Plus Jakarta Sans" })
      ]
    });
  }

  function createTable(headers, rowsData) {
    return new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: {
        top: { style: BorderStyle.SINGLE, size: 2, color: borderColor },
        bottom: { style: BorderStyle.SINGLE, size: 2, color: borderColor },
        left: { style: BorderStyle.SINGLE, size: 2, color: borderColor },
        right: { style: BorderStyle.SINGLE, size: 2, color: borderColor },
        insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: borderColor },
        insideVertical: { style: BorderStyle.SINGLE, size: 1, color: borderColor },
      },
      rows: [
        new TableRow({
          children: headers.map(h => new TableCell({
            shading: { type: ShadingType.CLEAR, fill: tableHeaderBg },
            margins: { top: 100, bottom: 100, left: 120, right: 120 },
            children: [
              new Paragraph({
                alignment: AlignmentType.LEFT,
                children: [
                  new TextRun({ text: h, bold: true, size: 20, color: "FFFFFF", font: "Plus Jakarta Sans" })
                ]
              })
            ]
          }))
        }),
        ...rowsData.map((row, rIdx) => new TableRow({
          children: row.map(cell => new TableCell({
            shading: { type: ShadingType.CLEAR, fill: rIdx % 2 === 1 ? "F8FAFC" : "FFFFFF" },
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: cell, size: 19, color: darkTextColor, font: "Plus Jakarta Sans" })
                ]
              })
            ]
          }))
        }))
      ]
    });
  }

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          // Title Banner
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 300, after: 60 },
            children: [
              new TextRun({
                text: "AgriNex Unified Agricultural Platform",
                font: "Plus Jakarta Sans",
                size: 38,
                bold: true,
                color: primaryColor
              })
            ]
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0, after: 200 },
            children: [
              new TextRun({
                text: "Complete Specification & Operational Reference Manual\nAll Modules: Farmer, Buyer, Admin Governance, Logistics & AI/ML Engine",
                font: "Plus Jakarta Sans",
                size: 24,
                bold: true,
                color: secondaryColor
              })
            ]
          }),
          pComposite([
            { text: "Document Scope: ", bold: true },
            { text: "Complete 360° Platform Specification | " },
            { text: "Release: ", bold: true },
            { text: "v2.5 Enterprise | " },
            { text: "Date: ", bold: true },
            { text: "September 2026" }
          ], { alignment: AlignmentType.CENTER, before: 0, after: 300 }),

          calloutBox(
            "Master Platform Specification",
            "AgriNex is a state-grade digital agricultural ecosystem connecting producers, corporate buyers, logistics carriers, state warehousing corporations, and regulatory mandi boards. This document contains the exhaustive functional and technical specification for all 5 platform modules, microservices, REST APIs, and AI/ML engines."
          ),

          // SECTION 1: SYSTEM ARCHITECTURE
          h1("1. Master Architecture & Ecosystem Overview"),
          p("The AgriNex ecosystem is built as a multi-stakeholder agricultural trade network structured across 5 distinct specialized modules:"),
          bullet("1. Farmer Module (`farmer-module/`)", "Empowers agricultural producers to list produce, manage crops, evaluate incoming buyer bids, access mandi market intelligence, track escrow disbursements, join FPO collective pools, compute ROI, and log grievances."),
          bullet("2. Buyer Module (`buyer-module/`)", "Institutional wholesale terminal for FMCG firms, exporters, and retailers to discover produce, execute competitive bidding, lock 35% advance escrow deposits, access AI market forecasts, manage active shipments, and engage in FPO contract farming."),
          bullet("3. Admin Governance HQ (`admin-module/`)", "State regulatory portal for the Maharashtra APMC Mandi Board (MSAMB) to oversee state compliance, enforce statutory MSP prices, clear dual-key escrow payouts, monitor MSWC cold storage capacity, track IoT cold-chain telemetry, and run fast-track dispute tribunal awards."),
          bullet("4. Logistics & Fleet Carrier Portal (`logistics-module/`)", "Transport carrier desk for driver trip dispatches, reefer fleet IoT telemetry tracking, Kasara Ghat transit checkpoints, e-PoD digital signing, and bulk FPO haulage."),
          bullet("5. AI & ML Analytics Engine (`ai_ml_engine/`)", "Real-time data ingestion pipeline processing live data.gov.in mandi records to generate 7-day price forecasts, spatial inter-APMC arbitrage matrices, volume elasticity scores, and dynamic farmer advisories."),

          // SECTION 2: FARMER MODULE
          h1("2. Farmer Module — Detailed Specifications"),
          p("The Farmer Module (`farmer-module/`) provides an end-to-end producer portal structured into 9 dedicated pages:"),
          
          h2("2.1 Main Dashboard & Overview (`index.html`)"),
          bullet("Produce Summary Cards", "Live stats on total active crop lots, pending buyer bids, in-transit shipments, and total escrow value locked."),
          bullet("Weather & Harvest Advisory Banner", "Real-time regional weather warnings, humidity levels, and harvest timing advisories tailored to Maharashtra districts."),
          bullet("Quick Actions", "One-click access to list new produce, review incoming bids, or check market rates."),

          h2("2.2 Crop Listing & Farm Manager (`my-crops.html`)"),
          bullet("Add Produce Lot Modal", "Allows farmers to list produce with details: Crop name, variety, category (Grains, Veg, Fruits, Oilseeds), shelf life, quantity (Quintals & kg), expected price (₹/kg & ₹/Qt), district, APMC mandi yard, quality grade (Grade A+, A, B), and geotagged farm photos."),
          bullet("Lot Status Management", "Tracks status across 'Active (Bids Open)', 'Accepted (Escrow Active)', 'In-Transit', and 'Completed'."),

          h2("2.3 Bids & Offers Counter-Desk (`bids-offers.html`)"),
          bullet("Incoming Buyer Bids", "Inspect buyer bids per Quintal/kg, buyer corporate rating (5-star corporate, verified exporter), and premium percentage over APMC modal reference rate."),
          bullet("Accept / Counter-Offer / Reject", "Farmers can accept bids (triggering 35% advance escrow lock), submit a counter-offer rate, or decline low bids."),

          h2("2.4 Local Mandi Market Intelligence (`market-insights.html`)"),
          bullet("Daily APMC Mandi Rates", "Real-time tracking of minimum, maximum, and modal rates across 28 Maharashtra commodities in regional mandis (Lasalgaon, Latur, Narayangaon, Vashi)."),
          bullet("AI Crop Sourcing & Demand Signals", "Highlights high-demand crops with rising market trends to guide seasonal crop planning."),

          h2("2.5 Nodal Escrow Payment Ledger (`escrow-tracking.html`)"),
          bullet("Two-Stage Payout Tracker", "Stage 1 (35% Advance Farm-Gate Disbursement upon driver pickup) and Stage 2 (65% Final Settlement upon destination DC weighbridge receipt)."),
          bullet("Bank Account & IMPS Details", "Displays linked HDFC/SBI bank account, IFSC code, UPI ID, and UTR reference transaction numbers."),

          h2("2.6 Order Fulfillment & Dispatch Manager (`orders-shipments.html`)"),
          bullet("Driver Assignment & Gate Pass", "Shows assigned transport truck details, driver phone, scheduled pickup time, e-Way bill number, and mandi gate pass."),
          bullet("Digital e-PoD Verification", "OTP verification upon farm loading and receiving dock unloading."),

          h2("2.7 FPO Aggregation Hub (`fpo-hub.html`)"),
          bullet("Collective Pooling", "Smallholders combine crop volumes to meet high-volume buyer MOQs (e.g. 500 Qt export onion pool), achieving higher bargaining power."),

          h2("2.8 Net Profit & ROI Calculator (`profit-calculator.html`)"),
          bullet("Input Breakdown", "Calculator for seed cost, fertilizer, pesticide, labor, irrigation, and transport expenses."),
          bullet("ROI Estimation", "Computes net profit margin and return on investment based on expected mandi selling prices."),

          h2("2.9 Farmer Grievance & Helpdesk (`grievance.html`)"),
          bullet("Ticket Raising", "Log tickets for payment delays, weighbridge disputes, or transport gate pass issues with live SLA step tracking."),

          // SECTION 3: BUYER MODULE
          h1("3. Buyer Module — Detailed Specifications"),
          p("The Buyer Module (`buyer-module/`) provides an institutional wholesale trading suite:"),

          h2("3.1 Procurement Terminal (`index.html`)"),
          bullet("Wholesale Lot Discovery", "Filter by Verified Grade A, High Quantity (>50 Qt), and Direct FPO Pools. Multi-field search across crops, variety, district, and APMC yard."),
          bullet("35% Advance Escrow Payment Lock", "Automatically calculates 35% advance deposit upon bid acceptance, locking funds into Nodal Trustee Bank Escrow via NetBanking, UPI, or RTGS/NEFT."),

          h2("3.2 AI Market Insights Hub (`market-insights.html`)"),
          bullet("7-Day ML Price Forecasts", "Predictive price models for 28 crops with 7-day trendlines to time purchases."),
          bullet("Inter-APMC Spatial Arbitrage Matrix", "Calculates freight-adjusted price spreads across key mandis (Lasalgaon, Narayangaon, Latur, Vashi, Surat), recommending cost-optimal sourcing hubs."),

          h2("3.3 Active Orders & Escrow Ledger (`my-orders.html`)"),
          bullet("Shipment & Invoice Management", "Track locked escrow funds, view e-PoD weigh slips, download PDF tax invoices (1% APMC fee, rural cess, GST), and initiate quality dispute tickets."),

          h2("3.4 Contract Farming & FPO Sourcing (`contract-farming.html`)"),
          bullet("Pre-Harvest Contracting", "Lock seasonal procurement prices in advance with FPO cooperatives to hedge against price spikes."),

          // SECTION 4: ADMIN MODULE
          h1("4. Admin Governance HQ Module — Detailed Specifications"),
          p("The Admin Module (`admin-module/`) serves as the regulatory headquarters for the MSAMB Mandi Board:"),

          h2("4.1 Central Governance Overview (`index.html`)"),
          bullet("Executive KPI Telemetry", "State-wide indicators: 14,280 Verified Farmers, 850 Licensed Buyers, ₹18.45 Cr Locked Escrow, <2h Dispute SLA."),
          bullet("305 APMC Mandi Regional Compliance Grid", "Monitors arrivals, auction compliance, and modal rates across Lasalgaon, Vashi, Narayangaon, and Nagpur yards."),
          bullet("MSWC Cold Storage Capacity Tracker", "Live monitoring of 4 MSWC cold storage facilities (Narayangaon 79%, Nashik 86%, Latur 60%, Nagpur 73%) with temperature, humidity, and manager contacts."),
          bullet("Cryptographic Audit Trail", "Immutable SHA-256 event log recording escrow disbursements, price ceiling adjustments, and tribunal awards."),

          h2("4.2 Escrow Clearances & Dual-Key Release Desk (`escrow-governance.html`)"),
          bullet("Dual-Key Release Authorization", "Requires joint sign-off from Chief Mandi Commissioner and Nodal Bank Trustee before RTGS/NEFT disbursal."),
          bullet("IoT Cold-Chain Transport Telemetry", "Monitors reefer truck IoT logs (truck ID, driver info, current vs target temp, route waypoints, Kasara Ghat pass logs)."),

          h2("4.3 Mandi Price Indices & Statutory MSP Controls (`mandi-governance.html`)"),
          bullet("Statutory MSP Floor Price Protection", "Enforces MSP price floors across 28 commodities and monitors anti-hoarding regulatory ceiling caps."),

          h2("4.4 Grievance Redressal & Dispute Tribunal (`grievance-arbitration.html`)"),
          bullet("Fast-Track Auto-Arbitration Engine", "Evaluates claims < ₹50,000 against certified NABL lab assays (Brix, TSS, Moisture), instantly auto-executing binding awards."),
          bullet("Visual Geotagged Lightbox & Split Slider", "Inspects farm-gate pickup & dock intake photos, MPKV Rahuri lab certificates, and adjusts payout split sliders."),

          // SECTION 5: LOGISTICS MODULE
          h1("5. Logistics & Fleet Carrier Module — Detailed Specifications"),
          p("The Logistics Module (`logistics-module/`) manages carrier dispatches, fleet telemetry, and produce pickups:"),

          h2("5.1 Fleet Operator Dashboard (`index.html`)"),
          bullet("Haul Dispatches", "Active haul assignments, pickup schedules, driver allocations, and total logistics revenue."),

          h2("5.2 Real-Time Reefer Fleet GPS & IoT Telemetry (`gps-tracking.html`)"),
          bullet("Live GPS Tracking", "Interactive route telemetry showing reefer truck speed, GPS coordinates, Kasara Ghat pass checkpoints, and live refrigeration temperature readings."),

          h2("5.3 Individual Lot & FPO Haul Management (`individual-orders.html` & `fpo-hauls.html`)"),
          bullet("Farm Pickup & DC Intake", "Gate pass verification, digital OTP e-PoD signing upon farm loading and receiving dock unloading."),
          bullet("Heavy Bulk Freight", "Multi-farm aggregation hauls for FPO bulk produce shipments."),

          // SECTION 6: AI/ML ENGINE & BACKEND
          h1("6. AI/ML Engine, Backend Server & Authentication"),

          h2("6.1 Master AI & ML Pipeline (`ai_ml_engine/`)"),
          bullet("Data Ingestion (`data_collector.py`)", "Ingests 100% real live data.gov.in mandi feeds."),
          bullet("Price Forecasting (`forecast_model.py`)", "Generates 7-day ARIMA/Prophet price predictions with confidence intervals."),
          bullet("Spatial Arbitrage (`arbitrage_model.py`)", "Calculates freight-adjusted inter-APMC price spreads."),
          bullet("Arrival Elasticity & Advisory Engine", "Computes arrival volume impact and generates dynamic agricultural advisories."),

          h2("6.2 Unified Backend REST Server (`server.js` & `backend/data.json`)"),
          p("Node.js HTTP REST server serving static web assets and REST API endpoints:"),
          createTable(
            ["HTTP Endpoint", "Module", "Description & Payload"],
            [
              ["GET /api/health", "System", "Server status, Node.js version, system uptime"],
              ["GET /api/dashboard/stats", "All Modules", "Unified platform stats (escrow pool, active bids, trade volume)"],
              ["GET / POST /api/crops", "Farmer / Buyer", "Fetch listings or post new produce lot with auto-grade tagging"],
              ["GET / POST /api/bids", "Buyer Terminal", "Fetch bid ledger or submit buyer bid with 35% advance math"],
              ["GET /api/admin/overview", "Admin HQ", "Returns overview stats, MSWC cold storage capacities, and IoT telemetry"],
              ["GET /api/admin/warehouses", "Admin HQ", "Returns live MSWC cold storage occupancy, humidity, and temp ranges"],
              ["GET /api/admin/cold-chain-telemetry", "Admin / Buyer", "Fetches reefer truck IoT logs, route waypoints, and temp history"],
              ["POST /api/admin/disputes/auto-arbitrate", "Admin Tribunal", "Executes fast-track auto-arbitration rules engine on eligible claims"],
              ["POST /api/admin/escrow/action", "Admin Escrow", "Executes Dual-Key escrow payout release or quarantine hold"]
            ]
          ),

          h2("6.3 Role Switcher & Authentication (`login_details/`)"),
          bullet("Role Switcher Interface", "Provides instant switching between Farmer, Buyer Terminal, Admin Governance HQ, and Logistics Operator profiles for demo and administrative testing."),

          // SECTION 7: SUMMARY MATRIX
          h1("7. Master Platform Module Matrix"),
          createTable(
            ["Module", "Primary User Role", "Key Features & Interfaces", "Governance & Security Controls"],
            [
              ["Farmer Module", "Agricultural Producers & FPOs", "My Crops, Bids Desk, Mandi Rates, Escrow Tracker, Profit Calc", "Satbara 7/12 Land Authentication, Bank Account Verification"],
              ["Buyer Module", "Corporate Buyers, FMCG, Exporters", "Procurement Terminal, 7-Day ML Forecasts, Orders, FPO Contracts", "35% Advance Escrow Lock, GSTIN Authentication, Digital e-PoD"],
              ["Admin Module", "MSAMB Mandi Commissioners & Judges", "Governance HQ, Dual-Key Escrow Desk, MSP Controls, Tribunal Desk", "Dual-Key Sign-Off, MSWC Cold Storage Tracker, Auto-Arbitration Rules"],
              ["Logistics Module", "Fleet Carriers & Reefer Drivers", "Fleet Dashboard, IoT GPS Tracking, Pickup/Intake e-PoD, FPO Hauls", "IoT Temperature Telemetry, Kasara Checkpoint Verification"],
              ["AI/ML Engine", "Automated Analytics Service", "Data Collector, Price Forecasting, Spatial Arbitrage, Elasticity", "Live Data.gov.in Feed Ingestion, Automated Advisory Pipeline"]
            ]
          ),

          calloutBox(
            "Final Authorization",
            "This Master Specification Manual documents 100% of features present across all 5 AgriNex platform modules. Approved by Maharashtra State Agricultural Marketing Board (MSAMB) Platform Engineering & Regulatory Division."
          )
        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.join(__dirname, 'AgriNex_Complete_Platform_All_Modules_Guide.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Successfully generated master document at: ${outputPath}`);
}

createMasterPlatformGuide().catch(err => {
  console.error("Error generating master document:", err);
});
