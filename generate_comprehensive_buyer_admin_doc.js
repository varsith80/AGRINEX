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

async function createComprehensiveGuide() {
  const primaryColor = "0C5A36";    // Deep Forest Green
  const secondaryColor = "166534";  // Emerald Green
  const darkTextColor = "0F172A";   // Slate 900
  const lightBgColor = "F0FDF4";    // Soft Mint Light
  const tableHeaderBg = "0C5A36";   // Table Header Green
  const borderColor = "CBD5E1";     // Slate 300
  const accentGold = "D97706";      // Warm Amber Gold
  const navyColor = "0369A1";        // Ocean Blue

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
          // Header Banner Title
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 300, after: 60 },
            children: [
              new TextRun({
                text: "AgriNex Agricultural Platform",
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
                text: "Comprehensive Specification & Feature Reference Guide\nBuyer Module Terminal & Central Mandi Governance Admin HQ",
                font: "Plus Jakarta Sans",
                size: 24,
                bold: true,
                color: secondaryColor
              })
            ]
          }),
          pComposite([
            { text: "Document Release: ", bold: true },
            { text: "v2.5 Enterprise Governance Release | " },
            { text: "Jurisdiction: ", bold: true },
            { text: "Maharashtra APMC Mandi Regulatory Board (MSAMB) | " },
            { text: "Date: ", bold: true },
            { text: "September 2026" }
          ], { alignment: AlignmentType.CENTER, before: 0, after: 300 }),

          calloutBox(
            "System Executive Overview",
            "AgriNex is a state-grade digital agricultural trade ecosystem designed to bridge wholesale buyers, food processing enterprises, export houses, and regional agricultural producers across 305 Maharashtra APMC mandis. It combines direct farm-gate procurement, 100% Nodal Escrow protection, real-time AI/ML price forecasting, MSWC cold storage telemetry tracking, and statutory dispute tribunal arbitration."
          ),

          // SECTION 1: SYSTEM OVERVIEW
          h1("1. System Architecture & Dual-Module Ecosystem"),
          p("The AgriNex platform operates on a unified micro-service backend architecture anchored by two primary user-facing portals:"),
          bullet("1. Enterprise Buyer Module (`buyer-module/`)", "An institutional procurement terminal empowering FMCG buyers, retail chains, food processors, and exporters to discover verified produce, execute instant bidding, lock 35% advance escrow deposits, access AI market intelligence, manage active orders, and participate in direct FPO contract farming."),
          bullet("2. Central Mandi Governance Admin HQ (`admin-module/`)", "A state regulatory dashboard used by the Maharashtra State Agricultural Marketing Board (MSAMB) to oversee state-wide trade compliance, regulate statutory MSP floor prices, clear dual-key escrow payouts, track MSWC cold storage occupancy, monitor IoT cold-chain transport telemetry, and execute fast-track dispute tribunal awards."),

          // SECTION 2: BUYER MODULE FEATURES
          h1("2. AgriNex Buyer Module — Detailed Feature Specifications"),
          p("The Buyer Module (`buyer-module/`) provides an institutional wholesale trading suite structured into four specialized core interfaces:"),

          h2("2.1 Procurement & Bidding Terminal (`buyer-module/index.html`)"),
          p("The main procurement engine enables buyers to discover, bid on, and lock high-grade agricultural lots across 28 Maharashtra commodities."),
          bullet("Real-Time Lot Discovery & Filtering", "Filter produce listings by Verified Grade-A lots, High Volume consignments (>50 Qt), and Direct FPO Aggregate Pools. Multi-column search supports crop name, variety, district, and APMC mandi yard."),
          bullet("Interactive Bidding & Price Benchmarking", "Place competitive bids per Quintal (Qt) or Kilogram (kg). Every listing displays live reference market rates and highlights the premium/discount percentage relative to regional APMC modal averages."),
          bullet("35% Advance Escrow Payment Lock", "Upon bid acceptance, the system automatically calculates the required 35% advance farm-gate escrow deposit. Buyers can instantly lock funds into the ICICI/SBI Nodal Trustee Escrow Account via UPI, NetBanking, or RTGS/NEFT."),
          bullet("Seller Credentials & Quality Ratings", "Exposes verified farmer and FPO profiles, past trade history, land record authentication (Satbara 7/12), and quality grade badges (Grade A+, Grade A, Export Quality)."),

          h2("2.2 AI Market Insights & Price Intelligence Hub (`buyer-module/market-insights.html`)"),
          p("Powered by `ai_ml_engine/pipeline.py`, this module equips corporate buyers with predictive analytics to optimize purchasing timing and spatial sourcing."),
          bullet("28-Crop 7-Day ML Price Forecasting", "Machine learning forecasting models ingest real-time data.gov.in mandi feeds to predict modal prices 7 days in advance with confidence bounds, advising buyers when to lock forward contracts."),
          bullet("Inter-APMC Spatial Arbitrage Matrix", "Calculates freight-adjusted price spreads across key hubs (Lasalgaon, Narayangaon, Latur, Vashi, Surat, Guntur), recommending cost-optimal sourcing locations."),
          bullet("Arrival Volume & Price Elasticity Tracker", "Displays daily arrival quantities in Quintals alongside arrival elasticity indicators, alerting buyers to sudden inflow floods or scarcity squeezes."),
          bullet("AI Procurement Advisor & Demand Aggregation", "Generates automated strategic advisories recommending whether to 'Procure Immediately', 'Hold for Price Dip', or 'Join FPO Sourcing Pool'."),

          h2("2.3 Active Orders, Consignments & Escrow Ledger (`buyer-module/my-orders.html`)"),
          p("A post-trade execution dashboard tracking locked escrow funds, transport logistics, and destination intake clearances."),
          bullet("Milestone Payout Tracker", "Tracks the two-stage disbursement lifecycle: Stage 1 (35% Advance released upon loading verification) and Stage 2 (65% Final Settlement released upon destination weighbridge confirmation)."),
          bullet("Digital e-PoD & Weigh Slip Verification", "Displays verified electronic Proof of Delivery (e-PoD) containing driver OTP signatures, geo-stamped photo proofs, and APMC electronic weighbridge slips."),
          bullet("Tax Breakdown & Invoice Export", "Generates compliant tax invoices displaying base commodity value, mandatory 1% APMC market fee, rural infrastructure cess, and GST surcharges with one-click PDF export."),
          bullet("Dispute & Quality Claim Launcher", "Allows buyers to initiate quality variance tickets (e.g., moisture discrepancy or transit squishing) directly sending the lot into Admin Tribunal Quarantine."),

          h2("2.4 Contract Farming & Direct FPO Sourcing (`buyer-module/contract-farming.html`)"),
          p("Facilitates direct corporate contract farming agreements with Farmer Producer Organizations (FPOs)."),
          bullet("Pre-Harvest Forward Fixed Contracting", "Enables enterprise buyers to lock fixed seasonal procurement prices prior to harvest, mitigating crop price volatility."),
          bullet("Minimum Order Quantity (MOQ) Aggregation", "FPOs pool smallholder farmer acreage into unified bulk lots (e.g. 500 Qt export red onion pool), reducing procurement fragmentation."),

          // SECTION 3: ADMIN MODULE FEATURES
          h1("3. AgriNex Admin Governance HQ — Detailed Feature Specifications"),
          p("The Admin Module (`admin-module/`) provides regulatory oversight and supervisory controls for the MSAMB Mandi Board across four dedicated governance portals:"),

          h2("3.1 Central Governance HQ Overview (`admin-module/index.html`)"),
          p("The executive control panel providing state-wide operational telemetry and compliance monitoring."),
          bullet("Executive KPI Telemetry", "Monitors state-wide metrics: 14,280 Verified Farmers, 850 Licensed Corporate Buyers, ₹18.45 Cr Locked Escrow Pool, 0.14% Dispute Rate, and <2h Resolution SLA."),
          bullet("305 APMC Mandi Regional Compliance Grid", "Real-time compliance monitoring across major APMC hubs (Lasalgaon Nashik, Vashi Terminal, Narayangaon Pune, Nagpur Yard), tracking arrival volumes and modal rate compliance."),
          bullet("MSWC & APMC Cold Storage Capacity Tracker", "Live capacity monitoring across Maharashtra State Warehousing Corporation (MSWC) cold hubs (Narayangaon 79%, Nashik 86%, Latur 60%, Nagpur 73%), displaying temperature ranges, humidity (% HR), and site manager contacts."),
          bullet("Cryptographic Governance Audit Trail", "Immutable event ledger recording all escrow releases, price ceiling adjustments, KYC approvals, and tribunal awards with unique SHA-256 transaction hashes."),

          h2("3.2 Escrow Clearances & Dual-Key Release Desk (`admin-module/escrow-governance.html`)"),
          p("Supervises the regulated disbursement of locked escrow funds from nodal trustee bank accounts."),
          bullet("Dual-Key Release Workflow", "Requires joint approval from the Chief Mandi Commissioner and Nodal Bank Trustee before releasing RTGS/NEFT milestone payments to farmer bank accounts."),
          bullet("IoT Cold-Chain Transport Telemetry", "Inspects live telemetry logs for refrigerated transport trucks (reefer truck ID, driver contacts, target vs actual temp, route waypoints, and Kasara Ghat checkpoint logs)."),
          bullet("Quarantine Holds & Batch RTGS Triggers", "Allows administrators to place disputed lots on quarantine hold or trigger automated batch RTGS payouts to clearing bank gateways."),

          h2("3.3 Mandi Price Indices & Statutory MSP Controls (`admin-module/mandi-governance.html`)"),
          p("Enforces price stability and minimum support price compliance across 28 agricultural commodities."),
          bullet("Statutory MSP Floor Price Protection", "Monitors modal auction prices against Minimum Support Price (MSP) benchmarks, preventing distress sales by producers."),
          bullet("Anti-Hoarding Regulatory Ceiling Caps", "Tracks upper market price ceilings to detect artificial inflation and trader hoarding."),
          bullet("State-Wide Advisory Broadcast", "Enables regulators to issue instant advisory bulletins to all 305 APMC mandi yards and trigger emergency price stabilization freezes."),

          h2("3.4 Grievance Redressal & Dispute Tribunal (`admin-module/grievance-arbitration.html`)"),
          p("An online agricultural dispute tribunal resolving buyer-farmer quality and transit disagreements."),
          bullet("Fast-Track Auto-Arbitration Rules Engine", "Automatically evaluates minor claims (< ₹50,000) against certified lab assay parameters (Brix, TSS, Moisture), instantly executing binding awards without requiring a full bench hearing."),
          bullet("Visual Evidence Lightbox", "Inspects geotagged farm-gate pickup photos, driver loading logs, and destination receiving dock photos with embedded GPS coordinates."),
          bullet("Certified Lab Assay & Weighbridge Inspector", "Reviews lab test certificates from Mahatma Phule Krishi Vidyapeeth (MPKV) Rahuri, APEDA Phytosanitary cells, and calibrated APMC electronic weighbridge slips."),
          bullet("Interactive Compensation Splitter", "Provides custom sliders to adjust award percentages between Farmer Payout %, Buyer Refund %, and Logistics Transit Insurance Claims."),

          // SECTION 4: TECHNICAL ARCHITECTURE & APIS
          h1("4. Technical Architecture, REST APIs & Data Persistence"),
          p("The platform relies on a Node.js lightweight server engine (`server.js`) backed by structured JSON data persistence (`backend/data.json`) and client-side `localStorage` caching."),

          h2("4.1 Core REST API Specification"),
          createTable(
            ["HTTP Method & Endpoint", "Target Module", "Function & Data Payload"],
            [
              ["GET /api/health", "System", "Server status, uptime, node version, timestamp"],
              ["GET /api/dashboard/stats", "Buyer / Admin", "Unified stats summary (escrow pool, active bids, trade volume)"],
              ["GET / POST /api/crops", "Buyer / Farmer", "Fetch all produce listings or post new farmer produce lot"],
              ["GET / POST /api/bids", "Buyer Terminal", "Fetch bid history or submit new buyer bid with 35% advance math"],
              ["GET /api/admin/overview", "Admin HQ", "Returns stats, MSWC cold storage capacities, and IoT telemetry"],
              ["GET /api/admin/warehouses", "Admin HQ", "Returns live occupancy MT, temp ranges, and humidity across cold hubs"],
              ["GET /api/admin/cold-chain-telemetry", "Admin / Buyer", "Fetches reefer transport IoT logs, route waypoints, and temp history"],
              ["POST /api/admin/disputes/auto-arbitrate", "Admin Tribunal", "Executes fast-track auto-arbitration rules engine on eligible claims"],
              ["POST /api/admin/escrow/action", "Admin Escrow", "Executes Dual-Key escrow payout approval or quarantine hold"]
            ]
          ),

          // SECTION 5: FEATURE MATRIX SUMMARY
          h1("5. Comprehensive Feature Comparison Matrix"),
          createTable(
            ["Feature Area", "Buyer Module Capability", "Admin Module Capability"],
            [
              ["Marketplace & Bidding", "Submit bids, compare APMC rates, filter Grade A & FPO lots", "Monitor 305 mandis, adjust modal benchmarks & MSP floor prices"],
              ["Escrow & Payments", "Lock 35% advance deposit, track payout stage", "Authorize Dual-Key RTGS release, place quarantine holds"],
              ["Logistics & Cold Storage", "Track consignment status, view e-PoD weigh slips", "Monitor MSWC cold storage occupancy % & IoT reefer telemetry"],
              ["Disputes & Claims", "File quality variance claims & upload intake proof", "Execute Fast-Track Auto-Arbitration or slide award split"],
              ["Market Intelligence", "Access 7-day ML forecasts & spatial arbitrage matrix", "Issue state-wide APMC advisories & trigger mandi price freeze"]
            ]
          ),

          calloutBox(
            "Document Authorization",
            "This document represents the complete operational and technical baseline for AgriNex Platform Release 2.5. Approved by Chief Mandi Commissioner, Maharashtra State Agricultural Marketing Board (MSAMB)."
          )
        ]
      }
    ]
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = path.join(__dirname, 'AgriNex_Comprehensive_Buyer_and_Admin_Modules_Guide.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log(`Successfully generated document at: ${outputPath}`);
}

createComprehensiveGuide().catch(err => {
  console.error("Error generating document:", err);
});
