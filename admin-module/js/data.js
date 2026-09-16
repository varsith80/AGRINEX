/**
 * AgriNex - Central Platform Governance & Admin Module Data Store
 * Grounded in Maharashtra APMC Mandis, State Escrow Clearances, KYC Verification, and Dispute Arbitration
 */

const ADMIN_GOVERNANCE_DATA = {
  profile: {
    name: "Dr. R. K. Shinde, IAS",
    role: "Chief Mandi Commissioner & Escrow Regulator",
    agency: "Maharashtra State Agricultural Marketing Board (MSAMB)",
    location: "MSAMB Central Governance HQ, Pune, Maharashtra",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80",
    notificationsCount: 7,
    mandiJurisdiction: "305 APMC Mandis across 36 Districts"
  },

  stats: {
    verifiedFarmers: "14,280",
    verifiedFarmersGrowth: "+12.4% this month",
    enterpriseBuyers: "850",
    enterpriseBuyersGrowth: "+8.1% licensed",
    totalEscrowLocked: "₹ 18,45,00,000",
    escrowSubtext: "100% Dual-Key Protected",
    dailyTradeVolume: "₹ 3,85,60,000",
    tradeVolumeSubtext: "Across 28 MH Commodities",
    disputeRate: "0.14%",
    disputeSLA: "Avg Resolution: 2.1 Hours"
  },

  // Escrow Clearance & Settlement Cases (Dual-Key Payouts)
  escrowClearances: [
    {
      id: "ESC-MH-2026-901",
      type: "35% Advance Escrow",
      crop: "Tomato (Shivam / Abhinav Hybrid)",
      volume: "50 Qt (5,000 kg)",
      mandi: "Narayangaon APMC, Pune",
      farmerName: "Patil Rameshwar",
      farmerBank: "HDFC Bank (A/C ••••8821)",
      buyerName: "Kissan & Nestle India Procurements",
      buyerGstin: "27AAACK1234F1Z8",
      totalContractValue: 110000,
      payoutAmount: 38500,
      payoutFormatted: "₹ 38,500",
      stage: "Pickup Scheduled (Driver Assigned)",
      proof: "Gate Pass GP-2026-901 & e-Way Bill",
      status: "Pending Dual-Key Release",
      riskScore: "Low Risk (98/100)",
      timestamp: "10 mins ago"
    },
    {
      id: "ESC-MH-2026-902",
      type: "65% Final Settlement",
      crop: "Red Onion (Nashik Garwa Quality)",
      volume: "100 Qt (10,000 kg)",
      mandi: "Lasalgaon APMC, Nashik",
      farmerName: "Kishor Ahire",
      farmerBank: "State Bank of India (A/C ••••4120)",
      buyerName: "BigBasket Direct Farm Sourcing",
      buyerGstin: "27AABCB9812M1ZK",
      totalContractValue: 180000,
      payoutAmount: 117000,
      payoutFormatted: "₹ 1,17,000",
      stage: "Delivered & Accepted at Vashi DC",
      proof: "Digital e-PoD Verified (OTP + Sign)",
      status: "Ready for Bank Payout",
      riskScore: "Verified (100/100)",
      timestamp: "25 mins ago"
    },
    {
      id: "ESC-MH-2026-903",
      type: "35% Advance Escrow",
      crop: "Yellow Soybean (JS 335 / High Protein)",
      volume: "200 Qt (20,000 kg)",
      mandi: "Latur APMC Yard, Marathwada",
      farmerName: "Govind Marathe",
      farmerBank: "Bank of Maharashtra (A/C ••••9912)",
      buyerName: "Adani Wilmar Agro Processing",
      buyerGstin: "27AACCA5541L1Z2",
      totalContractValue: 920000,
      payoutAmount: 322000,
      payoutFormatted: "₹ 3,22,000",
      stage: "Weight Bridge Calibration Approved",
      proof: "Latur Mandi Weigh Slip #8812",
      status: "Pending Dual-Key Release",
      riskScore: "Low Risk (95/100)",
      timestamp: "1 hour ago"
    },
    {
      id: "ESC-MH-2026-904",
      type: "65% Final Settlement",
      crop: "Alphonso / Hapus Mango (GI Ratnagiri)",
      volume: "30 Qt (3,000 kg / 150 Crates)",
      mandi: "Ratnagiri APMC Terminal",
      farmerName: "Mandar Sawant",
      farmerBank: "ICICI Bank (A/C ••••3319)",
      buyerName: "Reliance Retail Fresh Hub",
      buyerGstin: "27AABCR7712Q1ZX",
      totalContractValue: 750000,
      payoutAmount: 487500,
      payoutFormatted: "₹ 4,87,500",
      stage: "Quality Lab Checked (Brix 18°)",
      proof: "APEDA Export Phyto Certificate",
      status: "Ready for Bank Payout",
      riskScore: "Verified (100/100)",
      timestamp: "2 hours ago"
    },
    {
      id: "ESC-MH-2026-905",
      type: "Dispute Quarantine Hold",
      crop: "Thompson Seedless Grapes (Export Grade)",
      volume: "80 Qt (8,000 kg)",
      mandi: "Nashik APMC Fruit Terminal",
      farmerName: "Sunil Shinde",
      farmerBank: "HDFC Bank (A/C ••••7721)",
      buyerName: "Nature's Basket Wholesale",
      buyerGstin: "27AAACN4401P1Z9",
      totalContractValue: 640000,
      payoutAmount: 640000,
      payoutFormatted: "₹ 6,40,000",
      stage: "Brix Sugar Level Dispute",
      proof: "Third-Party MPKV Lab Test Pending",
      status: "Escrow Quarantined",
      riskScore: "Medium Alert (72/100)",
      timestamp: "3 hours ago"
    },
    {
      id: "ESC-MH-2026-906",
      type: "35% Advance Escrow",
      crop: "Chilli (Nandurbar Dry Red Chilli)",
      volume: "40 Qt (4,000 kg)",
      mandi: "Nandurbar Chilli APMC Yard",
      farmerName: "Vikas Patil",
      farmerBank: "Bank of Baroda (A/C ••••5521)",
      buyerName: "MDH & Everest Spices Procurements",
      buyerGstin: "27AAACE5521K1Z3",
      totalContractValue: 720000,
      payoutAmount: 252000,
      payoutFormatted: "₹ 2,52,000",
      stage: "Pickup Scheduled & Calibration Passed",
      proof: "Gate Pass GP-2026-906 & Nandurbar Mandi Tax Paid",
      status: "Pending Dual-Key Release",
      riskScore: "Low Risk (96/100)",
      timestamp: "15 mins ago"
    },
    {
      id: "ESC-MH-2026-907",
      type: "65% Final Settlement",
      crop: "Maize (Yellow Corn / Makka)",
      volume: "120 Qt (12,000 kg)",
      mandi: "Malegaon APMC Yard, Nashik",
      farmerName: "Sanjay Shirole",
      farmerBank: "Canara Bank (A/C ••••8192)",
      buyerName: "Godrej Agrovet Cattle & Poultry Feed",
      buyerGstin: "27AAACG4419N1ZL",
      totalContractValue: 264000,
      payoutAmount: 171600,
      payoutFormatted: "₹ 1,71,600",
      stage: "Delivered & Intake Moisture Verified (11.2%)",
      proof: "Digital e-PoD Verified (OTP + Geo-Stamp)",
      status: "Ready for Bank Payout",
      riskScore: "Verified (100/100)",
      timestamp: "45 mins ago"
    }
  ],

  // 28 Maharashtra Crop Mandi Price Benchmarks & MSP Controls
  mandiPriceIndices: [
    { id: "CROP-ONI", crop: "Red Onion (Nashik Garwa Quality)", msp: 12.00, modalPrice: 19.50, ceilingCap: 28.00, marketTrend: "Stable", keyMandis: "Lasalgaon, Pimpalgaon, Yeola", alert: "Normal" },
    { id: "CROP-TOM", crop: "Tomato (Shivam / Abhinav Hybrid)", msp: 10.00, modalPrice: 22.00, ceilingCap: 35.00, marketTrend: "+8.5% High Demand", keyMandis: "Narayangaon, Junnar, Sangamner", alert: "High Inflow" },
    { id: "CROP-BAN", crop: "Grand Naine Banana (GI Khandesh Export)", msp: 9.00, modalPrice: 17.50, ceilingCap: 24.00, marketTrend: "Strong Export", keyMandis: "Raver, Jalgaon, Bhusawal", alert: "Normal" },
    { id: "CROP-SOY", crop: "Yellow Soybean (JS 335 / High Protein)", msp: 48.92, modalPrice: 50.50, ceilingCap: 58.00, marketTrend: "Firm", keyMandis: "Latur, Hingoli, Akola", alert: "MSP Support Trigger" },
    { id: "CROP-ORG", crop: "Nagpur Orange / Santra (GI Vidarbha Quality)", msp: 24.00, modalPrice: 44.50, ceilingCap: 60.00, marketTrend: "Peak Harvest", keyMandis: "Nagpur, Katol, Morshi", alert: "Normal" },
    { id: "CROP-TUR-FNG", crop: "Sangli Rajapuri Turmeric Finger", msp: 85.00, modalPrice: 143.00, ceilingCap: 190.00, marketTrend: "Bullish", keyMandis: "Sangli, Basmat, Nanded", alert: "Spike Detected" },
    { id: "CROP-POM", crop: "Bhagwa Pomegranate (Solapur Export Grade)", msp: 60.00, modalPrice: 120.00, ceilingCap: 160.00, marketTrend: "Export Surge", keyMandis: "Solapur, Sangola, Pandharpur", alert: "Normal" },
    { id: "CROP-COT", crop: "Raw Cotton (Vidarbha Long Staple)", msp: 71.22, modalPrice: 74.80, ceilingCap: 82.00, marketTrend: "Bullish", keyMandis: "Amravati, Yavatmal, Jalna", alert: "CCI Procurement Active" },
    { id: "CROP-RIC", crop: "Wada Kolam Rice (Palghar GI Quality)", msp: 32.00, modalPrice: 48.00, ceilingCap: 62.00, marketTrend: "Stable", keyMandis: "Wada, Palghar, Manor", alert: "GI Demand" },
    { id: "CROP-JOW", crop: "Solapur Maldandi Jowar (Sorghum)", msp: 33.77, modalPrice: 42.00, ceilingCap: 52.00, marketTrend: "Stable", keyMandis: "Solapur, Mohol, Karmala", alert: "Normal" },
    { id: "CROP-BAJ", crop: "Dhule Hybrid Pearl Millet (Bajra)", msp: 26.25, modalPrice: 26.00, ceilingCap: 32.00, marketTrend: "Fair", keyMandis: "Dhule, Malegaon, Beed", alert: "Normal" },
    { id: "CROP-WHT", crop: "Sharbati Lokwan Golden Wheat", msp: 24.25, modalPrice: 28.50, ceilingCap: 36.00, marketTrend: "Steady", keyMandis: "Niphad, Akola, Washim", alert: "Normal" },
    { id: "CROP-TUR", crop: "Latur Red Tur (Pigeon Pea / Arhar)", msp: 75.50, modalPrice: 94.00, ceilingCap: 115.00, marketTrend: "Firm", keyMandis: "Latur, Solapur, Nanded", alert: "Normal" },
    { id: "CROP-CHA", crop: "Akola Desi Chana (Bengal Gram)", msp: 56.50, modalPrice: 60.50, ceilingCap: 72.00, marketTrend: "Firm", keyMandis: "Akola, Latur, Jalna", alert: "Normal" },
    { id: "CROP-MOO", crop: "Jalgaon Shiny Green Mung Bean", msp: 86.82, modalPrice: 92.00, ceilingCap: 110.00, marketTrend: "High Demand", keyMandis: "Jalgaon, Jalna, Ahmednagar", alert: "Normal" },
    { id: "CROP-URA", crop: "Nanded Black Urad Dal (Black Gram)", msp: 74.00, modalPrice: 82.00, ceilingCap: 98.00, marketTrend: "Steady", keyMandis: "Nanded, Hingoli, Latur", alert: "Normal" },
    { id: "CROP-GND", crop: "Kolhapur Bold Groundnut (Peanut)", msp: 67.83, modalPrice: 72.00, ceilingCap: 88.00, marketTrend: "Firm", keyMandis: "Kolhapur, Satara, Sangli", alert: "Normal" },
    { id: "CROP-SUN", crop: "Beed High-Oil Sunflower Seeds", msp: 72.80, modalPrice: 58.00, ceilingCap: 75.00, marketTrend: "Crushing Demand", keyMandis: "Beed, Osmanabad, Latur", alert: "Price Deficit Alert" },
    { id: "CROP-SUG", crop: "Kolhapur Co 86032 Sugarcane", msp: 3.15, modalPrice: 3.40, ceilingCap: 4.20, marketTrend: "Crushing Season FRP", keyMandis: "Shirol, Kolhapur, Sangli", alert: "FRP Benchmark" },
    { id: "CROP-MAN", crop: "Ratnagiri Alphonso (Hapus) Mango", msp: 120.00, modalPrice: 250.00, ceilingCap: 400.00, marketTrend: "Premium GI", keyMandis: "Ratnagiri, Devgad, Sindhudurg", alert: "Export Surge" },
    { id: "CROP-GRP", crop: "Nashik Thompson Seedless Grapes", msp: 40.00, modalPrice: 80.00, ceilingCap: 110.00, marketTrend: "High Demand", keyMandis: "Pimpalgaon, Nashik, Niphad", alert: "Normal" },
    { id: "CROP-MOS", crop: "Jalna Sweet Lime (Mosambi)", msp: 22.00, modalPrice: 34.00, ceilingCap: 48.00, marketTrend: "High Demand", keyMandis: "Badnapur, Jalna, Aurangabad", alert: "Normal" },
    { id: "CROP-CUS", crop: "Beed Balanagar Custard Apple (Sitaphal)", msp: 35.00, modalPrice: 75.00, ceilingCap: 110.00, marketTrend: "Seasonal Surge", keyMandis: "Dharur, Beed, Ambajogai", alert: "Peak Inflow" },
    { id: "CROP-MAZ", crop: "Maize (Yellow Corn / Makka)", msp: 22.25, modalPrice: 24.50, ceilingCap: 32.00, marketTrend: "Feed Mill Demand", keyMandis: "Malegaon, Dhule, Jalgaon", alert: "Normal" },
    { id: "CROP-SAF", crop: "Safflower (Kardi)", msp: 58.00, modalPrice: 64.00, ceilingCap: 76.00, marketTrend: "Crushing Demand", keyMandis: "Solapur, Latur, Beed", alert: "Oilseed Rally" },
    { id: "CROP-SES", crop: "Sesame (Til - Tapi White)", msp: 92.67, modalPrice: 138.00, ceilingCap: 165.00, marketTrend: "High Export Demand", keyMandis: "Dhule, Nandurbar, Jalgaon", alert: "Strong Demand" },
    { id: "CROP-CHL", crop: "Chilli (Nandurbar Dry Red Chilli)", msp: 120.00, modalPrice: 185.00, ceilingCap: 240.00, marketTrend: "Strong", keyMandis: "Nandurbar, Dondaicha, Shahada", alert: "Normal" },
    { id: "CROP-GUA", crop: "Guava (Sardar L-49 Sweet Guava)", msp: 22.00, modalPrice: 38.00, ceilingCap: 52.00, marketTrend: "Fresh Table Harvest", keyMandis: "Rahata, Nashik, Pune", alert: "Fresh Inflow" }
  ],

  // Grievance Redressal & Arbitration Tribunal Cases
  tribunalCases: [
    {
      ticketId: "DISP-MH-8812",
      title: "Quality Variance & TSS Moisture Dispute on Shivam Tomato Lot",
      crop: "Tomato (Shivam / Abhinav Hybrid)",
      farmer: "Patil Rameshwar (Lasalgaon)",
      farmerPhone: "+91 98221 44510",
      buyer: "FreshVeg Logistics & Processing Corp",
      buyerGstin: "27AAACK1234F1Z8",
      lotId: "LOT-TOM-02",
      disputedAmount: 44000,
      disputedFormatted: "₹ 44,000",
      totalContractValue: 110000,
      farmerClaim: "Farmer states 50 Qt tomatoes were harvested at perfect 4.8% TSS grade with zero rot at farm pickup.",
      buyerClaim: "Buyer claims 12% produce suffered transit squishing due to standard crates used instead of perforated plastic.",
      status: "Arbitration In Progress",
      hearingDate: "Today, 03:00 PM (Bench: Dr. Shinde)",
      proposedResolution: "Buyer accepts 92% volume (₹ 40,480); 8% logistics transit allowance (₹ 3,520) credited to Farmer from Logistics Transit Insurance.",
      pickupEvidence: {
        photo: "../farmer-module/assets/images/tomato.jpg",
        caption: "Farm Gate Pickup & Crating Inspection",
        gps: "19.1245° N, 73.9782° E (Lasalgaon Farm)",
        timestamp: "15-Sep-2026 06:30 AM",
        inspector: "Driver Sandeep Patil (MH-14-GH-8812)",
        condition: "150 crates loaded under shade. 0% squish, firm skin (Durometer: 74), stem intact."
      },
      intakeEvidence: {
        photo: "../buyer-module/assets/images/tomato.jpg",
        caption: "Vashi DC Intake Dock Inspection",
        gps: "19.0760° N, 73.0033° E (Vashi Cold DC)",
        timestamp: "15-Sep-2026 02:15 PM",
        inspector: "QA Head Rohit Kadam (Nestle Sourcing)",
        condition: "12 crates on bottom tier suffered compression damage over Kasara Ghat transit."
      },
      labAssay: {
        labName: "Mahatma Phule Krishi Vidyapeeth (MPKV) Rahuri Nodal Agro Lab",
        certNo: "MPKV-NABL-2026-9921",
        date: "15-Sep-2026",
        parameter: "Total Soluble Solids (TSS / Brix) & Acid Ratio",
        standardLimit: "≥ 4.50% TSS (Industrial Processing Grade)",
        measuredValue: "4.85% TSS (Passed Premium Grade A)",
        verdict: "Conforms to Grade-A Puree Processing Standards",
        labStatus: "PASSED (Certified NABL)"
      },
      weighSlip: {
        slipNo: "WB-LAS-2026-8812",
        station: "Lasalgaon Mandi Calibrated Electronic Weighbridge #03",
        grossWeight: "8,250 kg",
        tareWeight: "3,250 kg",
        netWeight: "5,000 kg (50.00 Qt)",
        calibrationValidity: "Valid till 31-Dec-2026"
      },
      recommendedSplit: {
        farmerPct: 92,
        farmerPayout: 40480,
        buyerPct: 0,
        buyerRefund: 0,
        insurancePct: 8,
        insuranceClaim: 3520
      }
    },
    {
      ticketId: "DISP-MH-8815",
      title: "Weight Bridge Discrepancy on Latur Soybean Batch",
      crop: "Yellow Soybean (JS 335 / High Protein)",
      farmer: "Govind Marathe (Latur)",
      farmerPhone: "+91 94230 11982",
      buyer: "Marathwada Solvents Extractor Ltd.",
      buyerGstin: "27AACCA5541L1Z2",
      lotId: "LOT-SOY-04",
      disputedAmount: 23000,
      disputedFormatted: "₹ 23,000",
      totalContractValue: 920000,
      farmerClaim: "APMC Weigh Slip states 200.5 Qt net produce at certified moisture levels.",
      buyerClaim: "Factory intake scale recorded 195.5 Qt (attempted 5 Qt tare moisture deduction).",
      status: "Ready for Binding Award",
      hearingDate: "Today, 04:30 PM",
      proposedResolution: "Disallow buyer's 5 Qt moisture penalty. Direct 100% contract payout of ₹ 23,000 released from buyer escrow to Farmer.",
      pickupEvidence: {
        photo: "../farmer-module/assets/images/soybean.jpg",
        caption: "Latur APMC Terminal Loading",
        gps: "18.4088° N, 76.5604° E (Latur Mega Yard)",
        timestamp: "15-Sep-2026 08:15 AM",
        inspector: "APMC Yard Officer D. K. Gaikwad",
        condition: "Clean dry golden yellow seed bags (Moisture: 9.8%, 0% foreign matter)."
      },
      intakeEvidence: {
        photo: "../buyer-module/assets/images/soybean.jpg",
        caption: "Solvent Extraction Intake Hopper",
        gps: "18.3950° N, 76.5412° E (Factory Yard)",
        timestamp: "15-Sep-2026 11:45 AM",
        inspector: "Intake Weigher A. V. Deshmukh",
        condition: "Unloading initiated; buyer sought arbitrary 2.5% moisture tare deduction."
      },
      labAssay: {
        labName: "MSAMB Central Commodity Testing Lab, Latur",
        certNo: "MSAMB-LT-2026-4402",
        date: "15-Sep-2026",
        parameter: "Seed Moisture & Oil Content",
        standardLimit: "Moisture ≤ 10.0% | Oil ≥ 18.5%",
        measuredValue: "Moisture 9.80% | Oil 19.40%",
        verdict: "Well within contract tolerance; deduction disallowed",
        labStatus: "PASSED (Certified)"
      },
      weighSlip: {
        slipNo: "WB-LAT-2026-4402",
        station: "Latur APMC Central Electronic Scale #01",
        grossWeight: "26,450 kg",
        tareWeight: "6,400 kg",
        netWeight: "20,050 kg (200.50 Qt)",
        calibrationValidity: "Calibrated & Stamp Verified (Govt of MH)"
      },
      recommendedSplit: {
        farmerPct: 100,
        farmerPayout: 23000,
        buyerPct: 0,
        buyerRefund: 0,
        insurancePct: 0,
        insuranceClaim: 0
      }
    },
    {
      ticketId: "DISP-MH-8819",
      title: "Brix Sugar & Cold-Chain Variance on Export Grape Lot",
      crop: "Nashik Thompson Seedless Grapes",
      farmer: "Sunil Shinde (Niphad)",
      farmerPhone: "+91 97654 88210",
      buyer: "Nature's Basket Wholesale Hub",
      buyerGstin: "27AAACN4401P1Z9",
      lotId: "LOT-GRP-21",
      disputedAmount: 64000,
      disputedFormatted: "₹ 64,000",
      totalContractValue: 640000,
      farmerClaim: "Farmer harvested at 18.2° Brix with pre-cooling done at Pimpalgaon Baswant cold chain center.",
      buyerClaim: "Buyer noted 4°C temperature rise on arrival at Bhiwandi logistics hub and sought 10% price discount.",
      status: "Arbitration In Progress",
      hearingDate: "Today, 05:15 PM",
      proposedResolution: "Reefer reefer-log data shows 95% compliance; 95% escrow released to farmer (₹ 60,800), 5% cold-chain transit insurance claim approved (₹ 3,200).",
      pickupEvidence: {
        photo: "../farmer-module/assets/images/grapes.jpg",
        caption: "Pre-Cooling Chamber Loading (Pimpalgaon)",
        gps: "20.1738° N, 73.9847° E (Niphad Yard)",
        timestamp: "14-Sep-2026 09:30 PM",
        inspector: "Reefer Logistics Pilot Mahesh Kale",
        condition: "Pre-cooled to 2.5°C in APEDA-approved punnets (500g each)."
      },
      intakeEvidence: {
        photo: "../buyer-module/assets/images/grapes.jpg",
        caption: "Bhiwandi Cold Storage Receiving",
        gps: "19.2969° N, 73.0628° E (Bhiwandi Hub)",
        timestamp: "15-Sep-2026 05:45 AM",
        inspector: "Cold Chain Supervisor P. R. Joshi",
        condition: "Punnets intact, berry sugar intact; minor condensation on door-tier pallets."
      },
      labAssay: {
        labName: "APEDA Export Quality Assessment Cell, Nashik",
        certNo: "APEDA-NSK-2026-1188",
        date: "14-Sep-2026",
        parameter: "Berry Brix Sugar Refractometry & Acidity",
        standardLimit: "≥ 17.5° Brix (Table Export)",
        measuredValue: "18.15° Brix (Premium Sweetness)",
        verdict: "Meets Export Sweetness & Residue Norms",
        labStatus: "PASSED (APEDA Phytosanitary)"
      },
      weighSlip: {
        slipNo: "WB-PIM-2026-9021",
        station: "Pimpalgaon APMC Calibrated Scale #04",
        grossWeight: "13,200 kg",
        tareWeight: "5,200 kg",
        netWeight: "8,000 kg (80.00 Qt)",
        calibrationValidity: "Valid till 30-Nov-2026"
      },
      recommendedSplit: {
        farmerPct: 95,
        farmerPayout: 60800,
        buyerPct: 0,
        buyerRefund: 0,
        insurancePct: 5,
        insuranceClaim: 3200
      }
    }
  ],

  // Immutable Audit Trail
  auditTrail: [
    { timestamp: "15 Sep 2026 11:30:12", action: "35% Advance Escrow Released", targetId: "ESC-MH-2026-899", amount: "₹ 52,500", actor: "Dr. R. K. Shinde (IAS)", txHash: "0x88f2a...91b4", status: "Success" },
    { timestamp: "15 Sep 2026 10:45:00", action: "Buyer KYC Approved & Credit Limit Set", targetId: "KYC-BUYER-1088", amount: "Limit: ₹ 50L", actor: "Mandi Board Registrar", txHash: "0x34c1b...77ae", status: "Success" },
    { timestamp: "15 Sep 2026 09:12:44", action: "APMC Price Ceiling Adjusted (+5%)", targetId: "CROP-ONI", amount: "Ceiling: ₹ 28/kg", actor: "State Mandi Price Committee", txHash: "0x9920d...11fe", status: "Success" },
    { timestamp: "14 Sep 2026 18:00:20", action: "Dispute Settled & Compensation Awarded", targetId: "DISP-MH-8809", amount: "₹ 18,000", actor: "Arbitration Tribunal Bench", txHash: "0xaa19c...55d0", status: "Success" }
  ],

  // MSWC & APMC Cold Storage Warehousing Data (2A)
  warehouses: [
    {
      id: "MSWC-PUNE-01",
      name: "MSWC Regional Logistics & Cold Hub",
      location: "Narayangaon APMC, Pune",
      totalCapacity: 15000,
      occupiedCapacity: 11850,
      occupiedPct: 79,
      primaryCrops: "Tomato, Exotic Greens, Potato",
      tempRange: "2°C - 8°C (Optimal)",
      status: "Active (79% Occupied)",
      humidity: "85% HR",
      manager: "R. V. Deshmukh"
    },
    {
      id: "MSWC-NSK-02",
      name: "Nashik Mega Cold Chain & Sorting Terminal",
      location: "Pimpalgaon Baswant, Nashik",
      totalCapacity: 25000,
      occupiedCapacity: 21500,
      occupiedPct: 86,
      primaryCrops: "Onion Garwa, Export Grapes",
      tempRange: "-1°C - 4°C (Pre-Cooling)",
      status: "High Occupancy Alert (86%)",
      humidity: "90% HR",
      manager: "K. S. Patil"
    },
    {
      id: "MSWC-LTR-03",
      name: "Marathwada Nodal Grain & Oilseed Silo Complex",
      location: "Latur APMC Mega Yard",
      totalCapacity: 40000,
      occupiedCapacity: 24000,
      occupiedPct: 60,
      primaryCrops: "Yellow Soybean, Chana, Red Tur",
      tempRange: "Ambient Dry Silo (18°C)",
      status: "Optimal (60% Occupied)",
      humidity: "45% HR",
      manager: "A. B. Gaikwad"
    },
    {
      id: "MSWC-NGP-04",
      name: "Vidarbha APMC Citrus & Cotton Cold Terminal",
      location: "Nagpur Kalmeshwar Yard",
      totalCapacity: 18000,
      occupiedCapacity: 13140,
      occupiedPct: 73,
      primaryCrops: "Nagpur Orange, Cotton Bales",
      tempRange: "4°C - 10°C",
      status: "Active (73% Occupied)",
      humidity: "80% HR",
      manager: "M. N. Joshi"
    }
  ],

  // IoT Cold-Chain Telemetry Log Map (2B)
  coldChainTelemetry: {
    "ESC-MH-2026-905": {
      reeferId: "MH-15-HH-9021",
      driverName: "Mahesh Kale (+91 98220 11200)",
      origin: "Pimpalgaon Pre-Cooling Center, Nashik",
      destination: "Bhiwandi Cold Hub, Thane",
      routeWaypoints: [
        { location: "Pimpalgaon APMC Yard", timestamp: "14-Sep 09:30 PM", temp: 2.5, status: "Pre-Cooled (OK)" },
        { location: "Kasara Ghat Pass Checkpoint", timestamp: "15-Sep 02:15 AM", temp: 3.2, status: "In Transit (OK)" },
        { location: "Bhiwandi Cold Storage Receiving", timestamp: "15-Sep 05:45 AM", temp: 4.2, status: "Door Tier Temp Rise (4.2°C)" }
      ],
      currentTemp: 4.2,
      targetTemp: 2.5,
      humidity: "88% HR",
      status: "Minor Door Tier Variance (4.2°C)"
    },
    "DISP-MH-8819": {
      reeferId: "MH-15-HH-9021",
      driverName: "Mahesh Kale (+91 98220 11200)",
      origin: "Pimpalgaon Pre-Cooling Center, Nashik",
      destination: "Bhiwandi Cold Hub, Thane",
      routeWaypoints: [
        { location: "Pimpalgaon APMC Yard", timestamp: "14-Sep 09:30 PM", temp: 2.5, status: "Pre-Cooled (OK)" },
        { location: "Kasara Ghat Pass Checkpoint", timestamp: "15-Sep 02:15 AM", temp: 3.2, status: "In Transit (OK)" },
        { location: "Bhiwandi Cold Storage Receiving", timestamp: "15-Sep 05:45 AM", temp: 4.2, status: "Door Tier Temp Rise (4.2°C)" }
      ],
      currentTemp: 4.2,
      targetTemp: 2.5,
      humidity: "88% HR",
      status: "Minor Door Tier Variance (4.2°C)"
    },
    "DISP-MH-8812": {
      reeferId: "MH-14-GH-8812",
      driverName: "Sandeep Patil (+91 98440 33112)",
      origin: "Lasalgaon Farm Gate, Nashik",
      destination: "Vashi DC, Navi Mumbai",
      routeWaypoints: [
        { location: "Lasalgaon Farm Gate Loading", timestamp: "15-Sep 06:30 AM", temp: 18.0, status: "Crated & Loaded" },
        { location: "Igatpuri Toll Plaza (NH-160)", timestamp: "15-Sep 10:45 AM", temp: 22.5, status: "Ventilated Transit" },
        { location: "Vashi Dock Dock #04 Intake", timestamp: "15-Sep 02:15 PM", temp: 26.0, status: "Casara Bumpy Transit Squish (12%)" }
      ],
      currentTemp: 26.0,
      targetTemp: 20.0,
      humidity: "72% HR",
      status: "Ventilated Produce Transit"
    }
  },

  // Fast-Track Auto-Arbitration Rules Configuration (4B)
  autoArbitrationRules: {
    maxDisputedAmount: 50000,
    requiredLabStatus: "PASSED",
    minBrixPct: 4.5,
    maxMoisturePct: 10.0
  }
};

class AgriNexAdminGovernance {
  static getEscrowCases() {
    try {
      if (typeof localStorage !== "undefined") {
        const stored = localStorage.getItem("agrinex_admin_escrow");
        if (stored) return JSON.parse(stored);
      }
    } catch(e) {}
    return ADMIN_GOVERNANCE_DATA.escrowClearances;
  }

  static saveEscrowCases(cases) {
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("agrinex_admin_escrow", JSON.stringify(cases));
      }
    } catch(e) {}
  }

  static approveEscrow(caseId, note = "Mandi Board Dual-Key Authorized") {
    const cases = this.getEscrowCases();
    const item = cases.find(c => c.id === caseId);
    if (!item) return { success: false, message: "Escrow case not found" };

    item.status = "Settlement Cleared (RTGS Sent)";
    item.riskScore = "Verified (100/100)";
    this.saveEscrowCases(cases);

    this.addAuditLog(`Escrow Dual-Key Payout Approved (${item.type})`, item.id, item.payoutFormatted, "Dr. R. K. Shinde (IAS)");
    return { success: true, message: `Successfully authorized payout of ${item.payoutFormatted} to ${item.farmerName} via RTGS!` };
  }

  static holdEscrow(caseId, reason = "Dispute Audit Flagged") {
    const cases = this.getEscrowCases();
    const item = cases.find(c => c.id === caseId);
    if (!item) return { success: false, message: "Escrow case not found" };

    item.status = "Escrow Quarantined";
    item.riskScore = "Audit Flag (60/100)";
    this.saveEscrowCases(cases);

    this.addAuditLog(`Escrow Quarantined / On Hold`, item.id, item.payoutFormatted, "Dr. R. K. Shinde (IAS)");
    return { success: true, message: `Escrow payout for ${item.id} has been placed on quarantine hold.` };
  }

  static getMandiPrices() {
    try {
      if (typeof localStorage !== "undefined") {
        const stored = localStorage.getItem("agrinex_admin_mandi_prices");
        if (stored) return JSON.parse(stored);
      }
    } catch(e) {}
    return ADMIN_GOVERNANCE_DATA.mandiPriceIndices;
  }

  static saveMandiPrices(prices) {
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("agrinex_admin_mandi_prices", JSON.stringify(prices));
      }
    } catch(e) {}
  }

  static updateMandiPrice(cropId, newPrice) {
    const prices = this.getMandiPrices();
    const item = prices.find(p => p.id === cropId);
    if (!item) return { success: false, message: "Crop not found" };

    const p = parseFloat(newPrice);
    if (isNaN(p) || p <= 0) return { success: false, message: "Invalid price value" };

    item.modalPrice = p;
    this.saveMandiPrices(prices);

    this.addAuditLog(`APMC Modal Price Adjusted`, item.crop, `₹ ${p}/kg`, "Mandi Price Regulator");
    return { success: true, message: `Updated APMC Modal Benchmark for ${item.crop} to ₹ ${p}/kg` };
  }

  static getGrievances() {
    try {
      if (typeof localStorage !== "undefined") {
        const stored = localStorage.getItem("agrinex_admin_tribunal");
        if (stored) return JSON.parse(stored);
      }
    } catch(e) {}
    return ADMIN_GOVERNANCE_DATA.tribunalCases;
  }

  static saveGrievances(cases) {
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("agrinex_admin_tribunal", JSON.stringify(cases));
      }
    } catch(e) {}
  }

  static resolveGrievance(ticketId, verdict) {
    return this.resolveGrievanceWithSplit(ticketId, null, verdict);
  }

  static resolveGrievanceWithSplit(ticketId, splitData = null, awardText = null) {
    const cases = this.getGrievances();
    const item = cases.find(g => g.ticketId === ticketId);
    if (!item) return { success: false, message: "Tribunal ticket not found" };

    item.status = "Settled & Enforced by Tribunal ✓";
    
    if (splitData) {
      item.enforcedSplit = splitData;
      item.proposedResolution = awardText || `Enforced Award: Farmer Payout ₹${splitData.farmerPayout.toLocaleString('en-IN')} (${splitData.farmerPct}%), Buyer Refund ₹${splitData.buyerRefund.toLocaleString('en-IN')} (${splitData.buyerPct}%), Insurance Cover ₹${splitData.insuranceClaim.toLocaleString('en-IN')} (${splitData.insurancePct}%).`;
    } else if (awardText) {
      item.proposedResolution = awardText;
    }

    this.saveGrievances(cases);

    const logAmt = splitData ? `Farmer: ₹${splitData.farmerPayout.toLocaleString('en-IN')}` : item.disputedFormatted;
    this.addAuditLog(`Tribunal Binding Award Issued (${item.ticketId})`, item.lotId, logAmt, "Dr. R. K. Shinde (IAS)");
    return { success: true, message: `Legally binding MSAMB Tribunal award enforced for ${item.ticketId}!` };
  }

  static getAuditLogs() {
    try {
      if (typeof localStorage !== "undefined") {
        const stored = localStorage.getItem("agrinex_admin_audit");
        if (stored) return JSON.parse(stored);
      }
    } catch(e) {}
    return ADMIN_GOVERNANCE_DATA.auditTrail;
  }

  static addAuditLog(action, targetId, amount, actor) {
    const logs = this.getAuditLogs();
    const now = new Date();
    const dateStr = `${now.getDate()} Sep 2026 ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    const hash = '0x' + Math.random().toString(16).substring(2, 7) + '...' + Math.random().toString(16).substring(2, 6);

    logs.unshift({
      timestamp: dateStr,
      action: action,
      targetId: targetId,
      amount: amount || "N/A",
      actor: actor || "Dr. R. K. Shinde (IAS)",
      txHash: hash,
      status: "Success"
    });

    try {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("agrinex_admin_audit", JSON.stringify(logs.slice(0, 50)));
      }
    } catch(e) {}
  }

  static getPlatformProfile() {
    return ADMIN_GOVERNANCE_DATA.profile;
  }

  static getStats() {
    return ADMIN_GOVERNANCE_DATA.stats;
  }

  static getWarehouses() {
    try {
      if (typeof localStorage !== "undefined") {
        const stored = localStorage.getItem("agrinex_admin_warehouses");
        if (stored) return JSON.parse(stored);
      }
    } catch(e) {}
    return ADMIN_GOVERNANCE_DATA.warehouses;
  }

  static getColdChainTelemetry(caseId) {
    if (ADMIN_GOVERNANCE_DATA.coldChainTelemetry && ADMIN_GOVERNANCE_DATA.coldChainTelemetry[caseId]) {
      return ADMIN_GOVERNANCE_DATA.coldChainTelemetry[caseId];
    }
    return null;
  }

  static evaluateFastTrackAutoArbitration(ticketId) {
    const cases = this.getGrievances();
    const item = cases.find(g => g.ticketId === ticketId);
    if (!item) return { success: false, message: "Dispute ticket not found" };

    if (item.status.includes("Settled")) {
      return { success: false, message: "Ticket is already settled." };
    }

    const rules = ADMIN_GOVERNANCE_DATA.autoArbitrationRules;
    const amountOk = item.disputedAmount <= rules.maxDisputedAmount;
    const labOk = item.labAssay && item.labAssay.labStatus && item.labAssay.labStatus.includes("PASSED");

    if (!amountOk) {
      return { success: false, message: `Disputed amount (₹${item.disputedAmount.toLocaleString('en-IN')}) exceeds Fast-Track threshold of ₹${rules.maxDisputedAmount.toLocaleString('en-IN')}. Requires full Tribunal bench review.` };
    }

    if (!labOk) {
      return { success: false, message: "Lab assay verification pending or failed. Cannot auto-arbitrate." };
    }

    // Auto-execute binding award (100% payout to farmer based on passed lab assay)
    const splitData = item.recommendedSplit || {
      farmerPct: 100,
      farmerPayout: item.disputedAmount,
      buyerPct: 0,
      buyerRefund: 0,
      insurancePct: 0,
      insuranceClaim: 0
    };

    const awardText = `⚡ FAST-TRACK AUTO-ARBITRATION ENFORCED: 100% Payout (₹${splitData.farmerPayout.toLocaleString('en-IN')}) awarded to Farmer ${item.farmer} based on Certified ${item.labAssay.labName} (${item.labAssay.certNo}).`;

    return this.resolveGrievanceWithSplit(ticketId, splitData, awardText);
  }
}


