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
    pendingFarmers: 48,
    enterpriseBuyers: "850",
    enterpriseBuyersGrowth: "+8.1% licensed",
    pendingBuyers: 23,
    activeDeals: "1,420",
    activeDealsVolume: "₹ 18.45 Cr",
    totalEscrowLocked: "₹ 18,45,00,000",
    escrowSubtext: "100% Dual-Key Protected",
    activeDeliveries: "312",
    deliveriesOnSchedule: "98.4%",
    pendingActions: 14,
    pendingBreakdown: {
      escrow: 5,
      disputes: 3,
      kyc: 6
    },
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
  },

  // Users Directory (Farmers, Buyers, Logistics)
  users: [
    {
      id: "USR-FRM-01",
      name: "Patil Rameshwar",
      category: "Farmer",
      phone: "+91 98221 44510",
      location: "Lasalgaon, Nashik",
      crops: "Tomato (Shivam), Red Onion",
      kycDoc: "Satbara 7/12 Land Record #4412",
      status: "Verified",
      riskScore: "Low Risk (98/100)",
      joinedDate: "12-Jan-2026",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80"
    },
    {
      id: "USR-LOG-01",
      name: "MahaKisan Cold-Chain Logistics Ltd.",
      category: "Logistics",
      phone: "+91 98230 55120",
      location: "Nashik - Mumbai Expressway Hub",
      crops: "45 Reefer Cold Trucks (IoT GPS & Temp)",
      kycDoc: "National Transport Permit & VAHAN Commercial Fleet RC #MH-15-TC-8890",
      status: "Verified",
      riskScore: "Verified (100/100)",
      joinedDate: "05-Nov-2025",
      avatar: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=80&auto=format&fit=crop&q=80"
    },
    {
      id: "USR-FRM-02",
      name: "Govind Marathe",
      category: "Farmer",
      phone: "+91 94230 11982",
      location: "Latur Mega Yard, Marathwada",
      crops: "Yellow Soybean, Chana",
      kycDoc: "Satbara 7/12 Land Record #1088",
      status: "Verified",
      riskScore: "Low Risk (95/100)",
      joinedDate: "18-Feb-2026",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80"
    },
    {
      id: "USR-FRM-03",
      name: "Ganesh Khot",
      category: "Farmer",
      phone: "+91 98229 33011",
      location: "Tasgaon, Sangli",
      crops: "Turmeric, Raisins",
      kycDoc: "Satbara 7/12 Uploaded (Pending Land OCR)",
      status: "Pending Verification",
      riskScore: "Review Required",
      joinedDate: "Yesterday",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80"
    },
    {
      id: "USR-FRM-04",
      name: "Tukaram Jadhav",
      category: "Farmer",
      phone: "+91 97631 88450",
      location: "Pandharpur, Solapur",
      crops: "Bhagwa Pomegranate, Jowar",
      kycDoc: "Aadhaar e-KYC Pending Biometric Match",
      status: "Pending Verification",
      riskScore: "Review Required",
      joinedDate: "Today, 08:30 AM",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&auto=format&fit=crop&q=80"
    },
    {
      id: "USR-LOG-02",
      name: "Sahyadri Agro Transporters & Express",
      category: "Logistics",
      phone: "+91 94211 44890",
      location: "Pune - Latur Transit Yard",
      crops: "28 Heavy Multi-Axle Freight Carriers",
      kycDoc: "All-India Goods Permit & Fastag Fleet KYC",
      status: "Pending Verification",
      riskScore: "Review Required",
      joinedDate: "Today, 09:15 AM",
      avatar: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=80&auto=format&fit=crop&q=80"
    },
    {
      id: "USR-LOG-03",
      name: "Vashi Express Agro Carriers",
      category: "Logistics",
      phone: "+91 98220 99411",
      location: "Navi Mumbai APMC Terminal",
      crops: "16 Temperature-Controlled Reefer Vans",
      kycDoc: "APMC Transporter License & Commercial Insurance",
      status: "Verified",
      riskScore: "Verified (99/100)",
      joinedDate: "14-Jan-2026",
      avatar: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=80&auto=format&fit=crop&q=80"
    },
    {
      id: "USR-BYR-01",
      name: "BigBasket Direct Farm Sourcing",
      category: "Buyer",
      phone: "+91 80 4455 6600",
      location: "Vashi DC, Navi Mumbai",
      businessType: "Corporate E-Commerce",
      gstin: "27AABCB9812M1ZK",
      kycDoc: "APMC State Wholesale License #MH-APMC-8821",
      creditLimit: "₹ 75,00,000",
      status: "Verified",
      riskScore: "Verified (100/100)",
      joinedDate: "10-Oct-2025",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"
    },
    {
      id: "USR-BYR-02",
      name: "Adani Wilmar Agro Processing",
      category: "Buyer",
      phone: "+91 22 6620 9900",
      location: "Latur Processing Unit",
      businessType: "Industrial Food Processor",
      gstin: "27AACCA5541L1Z2",
      kycDoc: "Corporate ROC & Mandi Direct Purchase License",
      creditLimit: "₹ 2,50,00,000",
      status: "Verified",
      riskScore: "Verified (100/100)",
      joinedDate: "15-Aug-2025",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&auto=format&fit=crop&q=80"
    },
    {
      id: "USR-BYR-03",
      name: "Kissan & Nestle India Procurements",
      category: "Buyer",
      phone: "+91 124 234 1288",
      location: "Narayangaon Pulping Station",
      businessType: "FMCG Processing Corp",
      gstin: "27AAACK1234F1Z8",
      kycDoc: "FSSAI Mega License & APMC Compliance Bond",
      creditLimit: "₹ 1,20,00,000",
      status: "Verified",
      riskScore: "Verified (100/100)",
      joinedDate: "01-Sep-2025",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=80&auto=format&fit=crop&q=80"
    },
    {
      id: "USR-BYR-04",
      name: "Sahyadri Fresh Agro Exports LLP",
      category: "Buyer",
      phone: "+91 98220 77123",
      location: "Nashik Export Hub",
      businessType: "Export Merchant",
      gstin: "27AAACS8841F1ZL",
      kycDoc: "APEDA Export Certification (Awaiting Mandi Guarantee)",
      creditLimit: "₹ 40,00,000",
      status: "Pending Verification",
      riskScore: "Review Required",
      joinedDate: "Today, 07:45 AM",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80"
    },
    {
      id: "USR-BYR-05",
      name: "Mahamandi Retailers Pvt Ltd",
      category: "Buyer",
      phone: "+91 98231 99201",
      location: "Pune Market Yard",
      businessType: "Wholesale Supermarket",
      gstin: "27AABCM3312R1ZZ",
      kycDoc: "GSTIN Tax Clearance Certificate Pending",
      creditLimit: "₹ 25,00,000",
      status: "Pending Verification",
      riskScore: "Review Required",
      joinedDate: "Today, 08:10 AM",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&auto=format&fit=crop&q=80"
    }
  ],

  // Active Deals (Current Transactions)
  activeDealsList: [
    {
      id: "DEAL-MH-2026-401",
      crop: "Red Onion (Nashik Garwa Quality)",
      farmer: "Kishor Ahire",
      buyer: "BigBasket Direct Farm Sourcing",
      volume: "100 Qt (10,000 kg)",
      totalValue: 180000,
      escrowLocked: 180000,
      escrowStage: "35% Advance Cleared, 65% Pending Delivery",
      status: "In Transit",
      date: "16-Sep-2026",
      mandi: "Lasalgaon APMC"
    },
    {
      id: "DEAL-MH-2026-402",
      crop: "Yellow Soybean (JS 335)",
      farmer: "Govind Marathe",
      buyer: "Adani Wilmar Agro Processing",
      volume: "200 Qt (20,000 kg)",
      totalValue: 920000,
      escrowLocked: 920000,
      escrowStage: "100% Escrow Deposited",
      status: "Weighbridge Verified",
      date: "16-Sep-2026",
      mandi: "Latur Mega Yard"
    },
    {
      id: "DEAL-MH-2026-403",
      crop: "Tomato (Shivam / Abhinav Hybrid)",
      farmer: "Patil Rameshwar",
      buyer: "Kissan & Nestle India",
      volume: "50 Qt (5,000 kg)",
      totalValue: 110000,
      escrowLocked: 110000,
      escrowStage: "Pending Dual-Key Release",
      status: "Pickup Scheduled",
      date: "17-Sep-2026",
      mandi: "Narayangaon APMC"
    },
    {
      id: "DEAL-MH-2026-404",
      crop: "Nagpur Orange / Santra (GI)",
      farmer: "Vidarbha Agro FPO",
      buyer: "Reliance Retail Fresh Hub",
      volume: "150 Qt (15,000 kg)",
      totalValue: 667500,
      escrowLocked: 667500,
      escrowStage: "100% Escrow Deposited",
      status: "Cold-Chain Transit",
      date: "17-Sep-2026",
      mandi: "Nagpur Terminal"
    },
    {
      id: "DEAL-MH-2026-405",
      crop: "Sangli Rajapuri Turmeric Finger",
      farmer: "Sahyadri Farmers Co.",
      buyer: "MDH & Everest Spices",
      volume: "80 Qt (8,000 kg)",
      totalValue: 1144000,
      escrowLocked: 1144000,
      escrowStage: "Lab Quality Tested (Curcumin 4.2%)",
      status: "Dispatched",
      date: "17-Sep-2026",
      mandi: "Sangli Mandi"
    }
  ],

  // Active Deliveries (Orders in Transport)
  activeDeliveriesList: [
    {
      id: "DEL-MH-881",
      vehicleNo: "MH-15-HH-9021",
      vehicleType: "Reefer Cold-Chain (10T)",
      driver: "Mahesh Kale (+91 98220 11200)",
      cargo: "Nashik Thompson Export Grapes (80 Qt)",
      origin: "Pimpalgaon Pre-Cooling Center",
      destination: "Bhiwandi Cold Hub, Thane",
      tempStatus: "3.2°C (Optimal)",
      eta: "Today, 11:30 AM",
      progressPct: 75,
      gpsStatus: "En-Route Kasara Ghat"
    },
    {
      id: "DEL-MH-882",
      vehicleNo: "MH-14-GH-8812",
      vehicleType: "Ventilated Heavy Truck (16T)",
      driver: "Sandeep Patil (+91 98440 33112)",
      cargo: "Tomato Shivam Hybrid (50 Qt)",
      origin: "Narayangaon APMC Yard",
      destination: "Vashi DC, Navi Mumbai",
      tempStatus: "21.5°C (Ventilated)",
      eta: "Today, 01:15 PM",
      progressPct: 45,
      gpsStatus: "Passing Igatpuri"
    },
    {
      id: "DEL-MH-883",
      vehicleNo: "MH-24-AA-4410",
      vehicleType: "Tarpaulin Covered Multi-Axle (25T)",
      driver: "Dinesh Shinde (+91 94220 88123)",
      cargo: "Yellow Soybean Seed JS-335 (200 Qt)",
      origin: "Latur Mega Yard",
      destination: "Baramati Crushing Plant",
      tempStatus: "Ambient Dry Silo Grade",
      eta: "Today, 04:00 PM",
      progressPct: 30,
      gpsStatus: "NH-548B In-Transit"
    },
    {
      id: "DEL-MH-884",
      vehicleNo: "MH-31-CB-1288",
      vehicleType: "Insulated Reefer Truck (12T)",
      driver: "Anil Wankhede (+91 97640 12099)",
      cargo: "Nagpur Orange GI Sweet Grade (120 Qt)",
      origin: "Kalmeshwar APMC Yard",
      destination: "Pune Market Yard DC",
      tempStatus: "6.5°C (Controlled)",
      eta: "Tomorrow, 06:00 AM",
      progressPct: 20,
      gpsStatus: "Samruddhi Expressway"
    }
  ],

  // Emergency Sell (Distress Produce Rapid Clearance)
  emergencySellList: [
    {
      id: "EMG-LOT-101",
      crop: "Tomato (Abhinav Red Hybrid)",
      volume: "80 Qt (8,000 kg)",
      mandi: "Narayangaon Mandi Yard",
      farmer: "Rameshwar Patil",
      originalPrice: "₹ 22.00 / kg",
      distressPrice: "₹ 14.00 / kg",
      discountPct: "-36%",
      shelfLifeLeft: "18 Hours (Perishable)",
      reason: "Heavy sudden rainfall harvest; rapid clearance required",
      status: "Broadcast Active",
      allocatedColdStorage: "MSWC Narayangaon Hub"
    },
    {
      id: "EMG-LOT-102",
      crop: "Grand Naine Banana (Export)",
      volume: "120 Qt (12,000 kg)",
      mandi: "Raver APMC, Jalgaon",
      farmer: "Khandesh Banana Growers FPO",
      originalPrice: "₹ 17.50 / kg",
      distressPrice: "₹ 12.00 / kg",
      discountPct: "-31%",
      shelfLifeLeft: "28 Hours (Ripening Fast)",
      reason: "Export container cancellation; seeking domestic processors",
      status: "Broadcast Active",
      allocatedColdStorage: "MSWC Bhusawal Unit"
    },
    {
      id: "EMG-LOT-103",
      crop: "Thompson Seedless Grapes",
      volume: "60 Qt (6,000 kg)",
      mandi: "Pimpalgaon Baswant, Nashik",
      farmer: "Sanjay Shinde",
      originalPrice: "₹ 80.00 / kg",
      distressPrice: "₹ 52.00 / kg",
      discountPct: "-35%",
      shelfLifeLeft: "36 Hours",
      reason: "Pre-cooling chamber maintenance; seeking rapid bulk dispatch",
      status: "Matching Processors",
      allocatedColdStorage: "Nashik Mega Cold Chain"
    }
  ],

  // Items Requiring Admin Attention (14 Priority Items)
  pendingActionsList: [
    {
      id: "ACT-01",
      category: "Escrow Release",
      badgeClass: "badge-gov-pending",
      title: "Dual-Key Advance Clearance: ESC-MH-2026-901",
      entity: "Patil Rameshwar ➔ Kissan & Nestle (Tomato 50 Qt)",
      amount: "₹ 38,500",
      urgency: "Immediate (Pickup Ready)",
      targetAction: "approve-escrow",
      targetId: "ESC-MH-2026-901"
    },
    {
      id: "ACT-02",
      category: "Escrow Release",
      badgeClass: "badge-gov-pending",
      title: "Dual-Key Advance Clearance: ESC-MH-2026-903",
      entity: "Govind Marathe ➔ Adani Wilmar (Soybean 200 Qt)",
      amount: "₹ 3,22,000",
      urgency: "High Priority",
      targetAction: "approve-escrow",
      targetId: "ESC-MH-2026-903"
    },
    {
      id: "ACT-03",
      category: "Escrow Release",
      badgeClass: "badge-gov-pending",
      title: "Dual-Key Advance Clearance: ESC-MH-2026-906",
      entity: "Vikas Patil ➔ MDH Spices (Chilli 40 Qt)",
      amount: "₹ 2,52,000",
      urgency: "Normal",
      targetAction: "approve-escrow",
      targetId: "ESC-MH-2026-906"
    },
    {
      id: "ACT-04",
      category: "Tribunal Dispute",
      badgeClass: "badge-gov-hold",
      title: "Hearing & Binding Award: DISP-MH-8812",
      entity: "Patil Rameshwar vs FreshVeg Corp (Tomato Transit Squish)",
      amount: "Disputed: ₹ 44,000",
      urgency: "Scheduled 03:00 PM Today",
      targetAction: "resolve-dispute",
      targetId: "DISP-MH-8812"
    },
    {
      id: "ACT-05",
      category: "Tribunal Dispute",
      badgeClass: "badge-gov-hold",
      title: "Tare Deduction Challenge: DISP-MH-8815",
      entity: "Govind Marathe vs Marathwada Solvents (Moisture Tare)",
      amount: "Disputed: ₹ 23,000",
      urgency: "Lab Assay Passed",
      targetAction: "resolve-dispute",
      targetId: "DISP-MH-8815"
    },
    {
      id: "ACT-06",
      category: "Tribunal Dispute",
      badgeClass: "badge-gov-hold",
      title: "Brix Sugar Variance: DISP-MH-8819",
      entity: "Sunil Shinde vs Nature's Basket (Export Grapes)",
      amount: "Disputed: ₹ 64,000",
      urgency: "Scheduled 05:15 PM Today",
      targetAction: "resolve-dispute",
      targetId: "DISP-MH-8819"
    },
    {
      id: "ACT-07",
      category: "User KYC",
      badgeClass: "badge-gov-pending",
      title: "Farmer Land Record Approval: Ganesh Khot",
      entity: "Satbara 7/12 Tasgaon, Sangli (#4412)",
      amount: "Crop: Turmeric",
      urgency: "Awaiting Admin Sign",
      targetAction: "approve-user",
      targetId: "USR-FRM-03"
    },
    {
      id: "ACT-08",
      category: "User KYC",
      badgeClass: "badge-gov-pending",
      title: "Farmer Aadhaar Verification: Tukaram Jadhav",
      entity: "Pandharpur, Solapur Land Holding 4.5 Ha",
      amount: "Crop: Pomegranate",
      urgency: "Biometric Uploaded",
      targetAction: "approve-user",
      targetId: "USR-FRM-04"
    },
    {
      id: "ACT-09",
      category: "Logistics KYC",
      badgeClass: "badge-gov-pending",
      title: "Logistics Fleet Clearance: Sahyadri Agro Transporters",
      entity: "Pune Transit Yard (28 Multi-Axle Fleet, VAHAN Verified)",
      amount: "Heavy Freight Fleet",
      urgency: "All-India Goods Permit Verification",
      targetAction: "approve-user",
      targetId: "USR-LOG-02"
    },
    {
      id: "ACT-10",
      category: "Buyer KYC",
      badgeClass: "badge-gov-pending",
      title: "Buyer Trade License: Sahyadri Fresh Agro Exports",
      entity: "APEDA Export License & Mandi Guarantee Bond",
      amount: "Credit Limit: ₹ 40L",
      urgency: "Pending License Seal",
      targetAction: "approve-user",
      targetId: "USR-BYR-04"
    },
    {
      id: "ACT-11",
      category: "Buyer KYC",
      badgeClass: "badge-gov-pending",
      title: "Buyer Corporate Clearance: Mahamandi Retailers",
      entity: "GSTIN Verification & APMC License #MH-PUN-99",
      amount: "Credit Limit: ₹ 25L",
      urgency: "Tax Clearance Verified",
      targetAction: "approve-user",
      targetId: "USR-BYR-05"
    },
    {
      id: "ACT-12",
      category: "Emergency Clearance",
      badgeClass: "badge-gov-hold",
      title: "Perishable Distress Sale: Tomato Lot EMG-LOT-101",
      entity: "80 Qt Narayangaon Tomato (18h Shelf Life)",
      amount: "Floor: ₹ 14/kg (-36%)",
      urgency: "Flash Liquidation Required",
      targetAction: "broadcast-emergency",
      targetId: "EMG-LOT-101"
    },
    {
      id: "ACT-13",
      category: "Emergency Clearance",
      badgeClass: "badge-gov-hold",
      title: "Cold-Chain Reefer Allocation: EMG-LOT-103",
      entity: "60 Qt Export Grapes (Pimpalgaon Baswant)",
      amount: "₹ 52/kg (-35%)",
      urgency: "Chamber Switchover Alert",
      targetAction: "broadcast-emergency",
      targetId: "EMG-LOT-103"
    },
    {
      id: "ACT-14",
      category: "Price Oversight",
      badgeClass: "badge-gov-pending",
      title: "Sunflower Oilseed MSP Deficit Check",
      entity: "Beed APMC Mandi Modal ₹ 58/kg (MSP: ₹ 72.80)",
      amount: "MSP Deficit Trigger",
      urgency: "Price Support Trigger",
      targetAction: "market-check",
      targetId: "CROP-SUN"
    }
  ]
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

  static getUsers() {
    try {
      if (typeof localStorage !== "undefined") {
        const stored = localStorage.getItem("agrinex_admin_users");
        if (stored) return JSON.parse(stored);
      }
    } catch(e) {}
    return ADMIN_GOVERNANCE_DATA.users;
  }

  static saveUsers(users) {
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("agrinex_admin_users", JSON.stringify(users));
      }
    } catch(e) {}
  }

  static approveUser(userId) {
    const users = this.getUsers();
    const u = users.find(x => x.id === userId);
    if (!u) return { success: false, message: "User not found" };

    u.status = "Verified";
    u.riskScore = "Verified (100/100)";
    this.saveUsers(users);

    this.addAuditLog(`KYC Verification Approved`, `${u.name} (${u.id})`, u.category, "Dr. R. K. Shinde (IAS)");
    return { success: true, message: `Successfully verified and approved ${u.name}!` };
  }

  static getActiveDeals() {
    return ADMIN_GOVERNANCE_DATA.activeDealsList;
  }

  static getActiveDeliveries() {
    return ADMIN_GOVERNANCE_DATA.activeDeliveriesList;
  }

  static getEmergencySellLots() {
    try {
      if (typeof localStorage !== "undefined") {
        const stored = localStorage.getItem("agrinex_admin_emergency_sell");
        if (stored) return JSON.parse(stored);
      }
    } catch(e) {}
    return ADMIN_GOVERNANCE_DATA.emergencySellList;
  }

  static saveEmergencySellLots(lots) {
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("agrinex_admin_emergency_sell", JSON.stringify(lots));
      }
    } catch(e) {}
  }

  static broadcastEmergencyLot(lotId) {
    const lots = this.getEmergencySellLots();
    const item = lots.find(l => l.id === lotId);
    if (!item) return { success: false, message: "Emergency lot not found" };

    item.status = "Broadcast Dispatched to 850 Buyers";
    this.saveEmergencySellLots(lots);

    this.addAuditLog(`Emergency Flash Auction Broadcasted`, item.id, item.distressPrice, "Marketplace Admin");
    return { success: true, message: `Emergency sale broadcast sent for ${item.crop} (${item.volume}) at ${item.distressPrice}!` };
  }

  static getPendingActions() {
    try {
      if (typeof localStorage !== "undefined") {
        const stored = localStorage.getItem("agrinex_admin_pending_actions");
        if (stored) return JSON.parse(stored);
      }
    } catch(e) {}
    return ADMIN_GOVERNANCE_DATA.pendingActionsList;
  }

  static savePendingActions(actions) {
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("agrinex_admin_pending_actions", JSON.stringify(actions));
      }
    } catch(e) {}
  }

  static resolvePendingAction(actionId) {
    const actions = this.getPendingActions();
    const item = actions.find(a => a.id === actionId);
    if (!item) return { success: false, message: "Action not found" };

    // Execute corresponding underlying action
    if (item.targetAction === "approve-escrow") {
      this.approveEscrow(item.targetId);
    } else if (item.targetAction === "resolve-dispute") {
      this.evaluateFastTrackAutoArbitration(item.targetId);
    } else if (item.targetAction === "approve-user") {
      this.approveUser(item.targetId);
    } else if (item.targetAction === "broadcast-emergency") {
      this.broadcastEmergencyLot(item.targetId);
    }

    const filtered = actions.filter(a => a.id !== actionId);
    this.savePendingActions(filtered);

    // Decrement pendingActions count
    if (ADMIN_GOVERNANCE_DATA.stats.pendingActions > 0) {
      ADMIN_GOVERNANCE_DATA.stats.pendingActions--;
    }

    return { success: true, message: `Action resolved: ${item.title}` };
  }
}


