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

async function createBuyerModuleWordDoc() {
  const primaryColor = "0C5A36";    // Deep Forest Green
  const secondaryColor = "166534";  // Emerald Green
  const darkTextColor = "0F172A";   // Slate 900
  const lightBgColor = "F0FDF4";    // Soft Mint Light
  const tableHeaderBg = "0C5A36";   // Table Header Green
  const borderColor = "CBD5E1";     // Slate 300

  // Helper function for standard paragraphs
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

  // Helper function for composite text paragraphs
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

  // Helper function for Callout Box
  function calloutBox(title, text) {
    return new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: {
        top: { style: BorderStyle.SINGLE, size: 4, color: primaryColor },
        bottom: { style: BorderStyle.SINGLE, size: 4, color: primaryColor },
        left: { style: BorderStyle.SINGLE, size: 12, color: primaryColor },
        right: { style: BorderStyle.SINGLE, size: 4, color: primaryColor },
      },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              shading: { type: ShadingType.CLEAR, fill: lightBgColor },
              margins: { top: 140, bottom: 140, left: 180, right: 180 },
              children: [
                new Paragraph({
                  spacing: { before: 40, after: 60 },
                  children: [
                    new TextRun({ text: `📌 ${title}`, bold: true, size: 22, color: primaryColor, font: "Plus Jakarta Sans" })
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

  // Helper function for Section Heading 1
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

  // Helper function for Heading 2
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

  // Helper for Bullet Point
  function bullet(label, text) {
    return new Paragraph({
      bullet: { level: 0 },
      spacing: { before: 60, after: 60, line: 260 },
      children: [
        new TextRun({ text: `${label}: `, bold: true, size: 21, color: darkTextColor, font: "Plus Jakarta Sans" }),
        new TextRun({ text: text, size: 21, color: darkTextColor, font: "Plus Jakarta Sans" })
      ]
    });
  }

  // Helper for creating simple styled tables
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
    styles: {
      default: {
        document: {
          run: { font: "Plus Jakarta Sans", size: 22, color: darkTextColor }
        }
      }
    },
    sections: [{
      properties: {
        page: {
          margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } // 1 inch margins
        }
      },
      children: [
        // =========================================================================
        // COVER / HEADER BLOCK
        // =========================================================================
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200, after: 60 },
          children: [
            new TextRun({
              text: "AGRINEX WHOLESALE BUYER PORTAL",
              font: "Plus Jakarta Sans",
              size: 44, // 22pt
              bold: true,
              color: primaryColor,
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 40, after: 200 },
          children: [
            new TextRun({
              text: "Comprehensive Enterprise Architecture, Functional Manual & Procurement Specification",
              font: "Plus Jakarta Sans",
              size: 24, // 12pt
              italics: true,
              color: secondaryColor,
            })
          ]
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 300 },
          children: [
            new TextRun({
              text: "Geography: Maharashtra Agro Corridors (Lasalgaon · Narayangaon · Latur · Jalgaon · Nagpur · Vashi)",
              font: "Plus Jakarta Sans",
              size: 18,
              color: "64748B",
            })
          ]
        }),

        calloutBox(
          "Executive Summary & Mission",
          "The AgriNex Wholesale Buyer Portal is a state-of-the-art institutional procurement platform connecting retail chains, food processors, exporters, and bulk buyers directly with certified Maharashtra farmers. By eliminating traditional multi-tier middlemen commissions, providing 100% principal-protected RBI-grade Smart Escrow, offering real-time APMC price forecasting, and deploying live cold-chain IoT telemetry, AgriNex delivers a 14% to 18% procurement cost reduction while guaranteeing Grade A produce traceability."
        ),

        // =========================================================================
        // SECTION 1: SYSTEM ARCHITECTURE & NAVIGATION
        // =========================================================================
        h1("1. System Architecture & Portal Layout"),
        p("The Buyer Module is engineered as a zero-latency, single-page application (SPA) optimized for enterprise procurement leads. It features seamless view switching across 9 specialized management modules, persistent WebSocket simulated status ribbons, and unified state synchronization."),
        
        h2("1.1 Portal Navigation & Core Tabs"),
        bullet("1. Overview & Dashboard (`#view-dashboard`)", "Unified high-level dashboard displaying active procurement capital, transit tracking, real-time APMC ticker, quick demand postings, and AI trade recommendations."),
        bullet("2. Marketplace Produce (`#view-verified-produce`)", "3-column visual card grid and tabular directory of certified farm-gate lots with live assays, moisture metrics, and direct buyout controls."),
        bullet("3. Quotas & Demand Engine (`#view-buyer-demands`)", "Institutional purchase quota management where buyers post forward demand orders, define target ceiling prices, and auto-match incoming farmer bids."),
        bullet("4. Emergency Salvage Desk (`#view-emergency-desk`)", "Dedicated breakeven clearinghouse for perishable crops with 24–48 hour urgency, enabling 30%+ discount procurement for puree, sauce, and food service buyers."),
        bullet("5. Consignments & Logistics (`#view-consignments`)", "End-to-end haulage management featuring digital Lorry Receipts (LR), gate pass generator, FASTag corridors, and satellite GPS telemetry."),
        bullet("6. Smart Escrow Vault (`#view-escrow-vault`)", "Financial clearinghouse managing the 35% advance deposit, 65% delivery release, digital lien deeds, and ICICI/SBI nodal escrow balances."),
        bullet("7. Cold Storage & Silos (`#view-storage`)", "Interactive WDRA warehouse directory, 2D chamber/silo slot visualizer, and 70% e-NWR pledge loan financing."),
        bullet("8. Market Insights & AI Analytics (`#view-insights`)", "Real-time Maharashtra APMC mandi rates, direct farm-gate arbitrage spreads, Chart.js interactive historical/forward forecasting, and regional inflow heatmaps."),
        bullet("9. Grievance & Dispute Redressal (`#view-grievance`)", "4-tier arbitration workflow with automated escrow hold mechanisms and photo/assay evidence upload."),

        // =========================================================================
        // SECTION 2: VERIFIED FARM-DIRECT PRODUCE MARKETPLACE
        // =========================================================================
        h1("2. Verified Farm-Direct Produce Marketplace"),
        p("The marketplace allows procurement teams to source produce with verifiable quality assays, avoiding traditional mandi wastage and terminal handling fees."),

        h2("2.1 Produce Card Specs & Standardized Units"),
        p("All crop lots are priced and measured strictly in both Quintals (Qt) and Kilograms (kg) with authentic Maharashtra mandi benchmarks:"),
        
        createTable(
          ["Crop Lot & Grade", "Origin Hub & Mandi", "Assay & Quality Metric", "Farm-Gate Ask Rate", "Landed Vashi Cost"],
          [
            ["Red Onion (Garwa Export - Gr A)", "Lasalgaon APMC, Nashik", "Moisture 11.8%, Size 55mm+", "₹ 18.00 /kg (₹ 1,800/Qt)", "₹ 19.20 /kg (Save 16.3%)"],
            ["Hybrid Tomato (Shivam - Gr A)", "Narayangaon APMC, Junnar", "Firmness 94%, Color 90% Red", "₹ 12.00 /kg (₹ 1,200/Qt)", "₹ 13.20 /kg (Save 17.2%)"],
            ["Grand Naine Banana (Export)", "Raver Mandi, Jalgaon", "Brix 18.5°, Caliber 39-44mm", "₹ 14.20 /kg (₹ 1,420/Qt)", "₹ 15.60 /kg (Save 14.5%)"],
            ["Yellow Soybean (JS-335)", "Latur Mega Yard, Latur", "Moisture 9.5%, Oil 19.2%", "₹ 41.50 /kg (₹ 4,150/Qt)", "₹ 43.00 /kg (Save 12.8%)"],
            ["Nagpur Mandarin (GI-Tag Santra)", "Katol APMC, Nagpur", "Brix 10.5°+, Juiciness 48%", "₹ 37.50 /kg (₹ 3,750/Qt)", "₹ 39.20 /kg (Save 15.0%)"]
          ]
        ),

        h2("2.2 Procurement Action Controls"),
        bullet("Direct Escrow Purchase (35% Advance)", "Locks 35% advance deposit in escrow; triggers automated harvest and loading instructions to the farmer."),
        bullet("Counter-Offer Bidding", "Allows the buyer to place a custom price bid (₹/Qt) with delivery date constraints and auto-computed kg valuation."),
        bullet("Direct In-App Farmer WhatsApp Negotiation", "Direct real-time communication channel with the farmer to negotiate packaging, grading, and dispatch slots."),

        // =========================================================================
        // SECTION 3: 5 ENTERPRISE IMPROVEMENT SUITE
        // =========================================================================
        h1("3. Enterprise Sourcing & Intelligence Suite (New Improvements)"),
        p("The 5 advanced enterprise features introduce institutional-grade decision support, legal automation, and cold-chain visibility."),

        h2("3.1 Feature 1: AI Sourcing Copilot & Arbitrage Hunter"),
        bullet("Floating AI Assistant Button", "Permanent bottom-right action trigger (`#btn-floating-copilot`) accessible across all views."),
        bullet("Mandi Spread Analyzer", "Scans Lasalgaon, Narayangaon, Latur, and Vashi APMC prices to identify positive price deviations exceeding 15%."),
        bullet("Prompt Quick-Chips", "Instant 1-click execution for Onion Arbitrage, High-Firmness Tomatoes, Salvage Clearance, and Latur Hermetic Silos."),
        bullet("Dynamic Lot Matching", "Auto-filters and presents qualified farmer lots directly inside the copilot dialogue with 1-click buy buttons."),

        h2("3.2 Feature 2: Enterprise Digital Purchase Order (PO) & Tax Invoice Generator"),
        bullet("Instant Legal Generation", "Constructs standard institutional POs (`PO-AGRI-XXXXX-MH`) compliant with Indian Contract Act & IT Act 2000."),
        bullet("Tax & Identity Metadata", "Embeds buyer/seller GSTIN, FSSAI registration number, weighbridge net weight, and quality parameters."),
        bullet("Escrow Split Tranches", "Explicitly documents the 35% advance lock (`₹ 31,500`) and 65% final settlement (`₹ 58,500`) upon arrival QC."),
        bullet("Print & PDF Ready", "Includes specialized `@media print` CSS stylesheet hiding UI chrome for crisp physical or PDF export."),

        h2("3.3 Feature 3: Side-by-Side Multi-Lot Comparative Matrix"),
        bullet("Multi-Select Mode", "Checkboxes on all lot cards (`⚖️ Compare`) allow selecting up to 3 lots simultaneously."),
        bullet("Floating Compare Bar", "Dynamic dark-mode bar (`#compare-floating-bar`) displaying selection count and compare trigger."),
        bullet("Comparative Matrix Modal", "Side-by-side comparison table benchmarking: Crop grade, Farmer reliability rating, Ask price, Estimated landed cost at Vashi Hub (incorporating freight/tolls), Transit lead time, and Advance Escrow requirement."),

        h2("3.4 Feature 4: Live GPS Fleet & Reefer Cold-Chain Telemetry"),
        bullet("Interactive Checkpoint Timeline", "Visual route map tracking haulage across Maharashtra express corridors (e.g. Samruddhi Expressway, NH 60, NH 53)."),
        bullet("FASTag & Weighbridge Integration", "Live logging of automated weigh-in-motion toll plazas and igatpuri corridor checkpoints."),
        bullet("Reefer Sensor Telemetry", "Continuous tracking of cargo temperature (e.g., 3.2°C for fruits/vegetables) and vehicle velocity (54 km/h)."),

        h2("3.5 Feature 5: Interactive 2D Warehouse Chamber & Silo Slot Visualizer"),
        bullet("2D Chamber Slot Grid", "Visual representation of individual storage chambers across Nashik, Pune, Latur, and Nagpur facilities."),
        bullet("Real-Time Climate Display", "Live readings for Temperature (e.g., 0°C–4°C for cold storage, 20°C for dry hermetic silos) and Humidity RH."),
        bullet("Capacity Utilization Bar", "Visual percentage occupancy indicators (Green < 60%, Amber 60–75%, Red > 75%)."),
        bullet("One-Click Slot Allocation", "Clicking any chamber immediately allocates that specific chamber and launches the booking pass generator."),

        // =========================================================================
        // SECTION 4: QUOTAS & PROCUREMENT DEMAND MATCHING
        // =========================================================================
        h1("4. Quotas & Procurement Demand Matching Engine"),
        p("Enables bulk buyers (e.g., BigBasket, Reliance Retail, Zomato Hyperpure) to post seasonal procurement quotas, establishing clear quantity targets and ceiling price constraints."),
        
        createTable(
          ["Demand / Quota ID", "Commodity Required", "Target Ceiling Rate", "Total Quota Volume", "Auto-Matched Farmer Bids", "Status"],
          [
            ["DEM-2026-001", "Garwa Red Onion (Export)", "₹ 18.20 /kg (₹ 1,820/Qt)", "120 Qt (12,000 kg)", "4 Bids (80 Qt Fulfilled)", "Active (66% Sourced)"],
            ["DEM-2026-002", "Hybrid Tomato (Firm)", "₹ 11.50 /kg (₹ 1,150/Qt)", "80 Qt (8,000 kg)", "3 Bids (60 Qt Fulfilled)", "Active (75% Sourced)"],
            ["DEM-2026-003", "Grand Naine Banana", "₹ 14.00 /kg (₹ 1,400/Qt)", "150 Qt (15,000 kg)", "2 Bids (50 Qt Fulfilled)", "Active (33% Sourced)"],
            ["DEM-2026-004", "Soybean (JS-335)", "₹ 41.00 /kg (₹ 4,100/Qt)", "200 Qt (20,000 kg)", "5 Bids (120 Qt Fulfilled)", "Active (60% Sourced)"]
          ]
        ),

        // =========================================================================
        // SECTION 5: EMERGENCY BREAKEVEN SALVAGE DESK
        // =========================================================================
        h1("5. Emergency Breakeven Salvage Procurement Desk"),
        p("When sudden gluts or climatic changes impact harvest shelf-life, farmers trigger emergency salvage calls. This desk matches perishable produce with commercial food processors (puree, pastes, powders) and large-scale caterers at breakeven salvage prices."),
        
        bullet("Breakeven Salvage Pricing", "Discounts ranging from 25% to 38% below daily APMC modal rates, allowing farmers to recover base cultivation costs while providing processors with unbeatable raw material prices."),
        bullet("Countdown Urgency Timers", "Real-time urgency indicators (24 to 48 hours remaining) to expedite instantaneous buyouts."),
        bullet("Processing Badges", "Categorized into Puree & Sauce (`🥫`), Bulk Catering (`🍲`), Dehydration & Powder (`🌾`), and Bio-Compost (`♻️`)."),

        // =========================================================================
        // SECTION 6: SMART ESCROW VAULT & FINANCIAL SETTLEMENT
        // =========================================================================
        h1("6. Smart Escrow Vault & Financial Clearinghouse"),
        p("AgriNex operates under a 2-stage milestone-based escrow clearinghouse complying with RBI Master Directions on Escrow Accounts and WDRA warehouse pledge standards."),

        createTable(
          ["Settlement Stage", "Percentage", "Trigger Event", "Protection Guarantee"],
          [
            ["Stage 1: Advance Tranche", "35% of Total Valuation", "Buyer initiates Purchase Order / Contract", "Locked in RBI-regulated trustee vault; farmer is notified to harvest and load."],
            ["Stage 2: Delivery Tranche", "65% Balance Tranche", "Arrival at Buyer Receiving Hub & Weighbridge QC signoff", "Auto-disbursed within 48 hours. If divergence > 5%, funds are frozen for tribunal review."]
          ]
        ),

        h2("6.1 Tri-Party Smart Escrow Deed"),
        p("Every transaction generates a legally binding, SHA256-cryptographically sealed Digital Escrow Agreement detailing arbitration clauses, dispute ceilings, and quality inspection protocols."),

        // =========================================================================
        // SECTION 7: COLD STORAGE, SILOS & e-NWR FINANCING
        // =========================================================================
        h1("7. Cold Storage, Hermetic Silos & e-NWR Financing"),
        p("Buyers can store bulk commodity purchases in WDRA-accredited facilities across Maharashtra to hedge against price volatility and unlock instant liquidity."),

        h2("7.1 Storage Hub Network"),
        createTable(
          ["Facility Name", "Location", "Chamber Type & Temperature", "Capacity", "e-NWR Eligibility"],
          [
            ["Lasalgaon Solar CA Agro Complex", "Lasalgaon, Nashik", "Solar Forced Air (20-25°C) & Cold (0-4°C)", "20,000 Qt", "✓ e-NWR Approved (WDRA)"],
            ["Shivneri Multi-Commodity Cold Chain", "Junnar / Narayangaon, Pune", "Controlled Atmosphere (1-4°C)", "15,000 Qt", "✓ e-NWR Approved (WDRA)"],
            ["Marathwada Hermetic Grain Silos", "MIDC Agro Park, Latur", "Aerated Dry Silos (< 10% RH)", "35,000 Qt", "✓ e-NWR Approved (WDRA)"],
            ["Nagpur Agro Cold & Packhouse", "Hingna Mega Food Park, Nagpur", "Multi-Chamber Cold (2-5°C)", "18,000 Qt", "✓ e-NWR Approved (WDRA)"]
          ]
        ),

        h2("7.2 e-NWR Pledge Loans (6.8% to 7.1% p.a.)"),
        p("Commodities stored in accredited hubs receive an electronic Negotiable Warehouse Receipt (e-NWR). Buyers can draw up to 70% Loan-to-Value (LTV) within 2 hours directly to their linked escrow pool through partner banks (State Bank of India, ICICI Bank, HDFC Bank)."),

        // =========================================================================
        // SECTION 8: APMC MARKET INSIGHTS & AI PRICE FORECASTING
        // =========================================================================
        h1("8. Maharashtra APMC Market Insights & AI Hedging"),
        p("Empowers buyers with live e-NAM integrated price tracking, historical curve analysis, and predictive procurement sentiment."),

        bullet("Interactive Chart.js Visualizer", "Renders historical realized mandi modal rates alongside a 7-day AI forward forecast curve, floor price, and ceiling price bands."),
        bullet("Timeframe & Unit Selectors", "Instant toggling across 7 Days (7D), 1 Month (1M), 3 Months (3M), and 1 Year (1Y), with live metric switches between ₹/Quintal and ₹/Kilogram."),
        bullet("Maharashtra Supply Inflow Heatmap", "Tracks daily arrival volumes across major regional APMC yards (Lasalgaon: 6,850 Qt, Narayangaon: 5,200 Qt, Latur: 8,400 Qt, Raver: 4,100 Qt)."),
        bullet("AI Sourcing Advisory Sentiment", "Real-time market sentiment index (Bullish / Bearish) trained on 5-year arrival trends, regional weather, and diesel freight tariffs."),

        // =========================================================================
        // SECTION 9: DISPUTE RESOLUTION & GRIEVANCE REDRESSAL
        // =========================================================================
        h1("9. Dispute Resolution & Grievance Redressal"),
        p("A fair, transparent mechanism for managing quality variances, transit damages, or moisture divergences."),

        bullet("Automated Escrow Lock", "Filing a claim immediately locks the 65% balance settlement in the AgriNex escrow vault."),
        bullet("Evidence Upload Protocol", "Supports digital weighbridge receipts, moisture assay slips, and geo-tagged cargo photos."),
        bullet("4-Stage Resolution Stepper", "Tracks progress in real time: Grievance Raised ➔ Escrow Settlement Frozen ➔ AI Assay & Photo Review ➔ Arbitrator Decision / Wallet Refund."),

        // =========================================================================
        // SECTION 10: IN-APP CHAT & BUYER PROFILE
        // =========================================================================
        h1("10. Direct Buyer-Farmer Negotiation Chat & Profile"),
        bullet("In-App Real-Time Chat (`#view-chat`)", "Built-in direct messaging suite with farmer contact list, message history, produce quote counters, and quick price negotiation."),
        bullet("Enterprise Profile Modal (`#modal-buyer-profile`)", "Institutional credential management storing buyer officer details, FSSAI licenses, corporate GSTIN, and receiving warehouse docks."),

        // =========================================================================
        // SECTION 11: TECHNICAL COMPLIANCE & SECURITY
        // =========================================================================
        h1("11. Technical Standards, Compliance & Quality Specs"),
        createTable(
          ["Feature Area", "Standard / Framework", "Implementation Detail"],
          [
            ["Escrow Framework", "RBI Master Directions (Escrow & Nodal)", "Tri-party digital settlement via ICICI/SBI nodal escrow rails"],
            ["Warehouse Accreditation", "WDRA e-NWR Portal Registry", "Digital lien marking with 70% LTV pledge credit"],
            ["Digital Invoicing", "IT Act 2000 & GST Invoice Rule 46", "Unique SHA-256 digital seals on all Purchase Orders"],
            ["Cold Chain Monitoring", "AIS-140 GPS & IoT Temperature Telemetry", "Real-time reefer temperature & FASTag corridor logging"],
            ["Produce Assaying", "AGMARK & e-NAM Quality Parameters", "Standardized Grade A assays with moisture & firmness metrics"]
          ]
        ),

        new Paragraph({
          spacing: { before: 300, after: 100 },
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: "— End of AgriNex Wholesale Buyer Portal Specification —",
              font: "Plus Jakarta Sans",
              size: 20,
              italics: true,
              color: "64748B"
            })
          ]
        })
      ]
    }]
  });

  const buffer = await Packer.toBuffer(doc);
  const outPath1 = path.join(__dirname, 'buyer-module', 'AgriNex_Buyer_Module_Comprehensive_Guide.docx');
  const outPath2 = path.join(__dirname, 'AgriNex_Buyer_Module_Comprehensive_Guide.docx');
  
  fs.writeFileSync(outPath1, buffer);
  fs.writeFileSync(outPath2, buffer);
  console.log(`✓ Generated Word Document successfully at:\n  1. ${outPath1}\n  2. ${outPath2}`);
}

createBuyerModuleWordDoc().catch(err => {
  console.error('Error creating Word Document:', err);
  process.exit(1);
});
