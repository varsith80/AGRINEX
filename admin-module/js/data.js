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
      farmer: "Patil Rameshwar (Lasalgaon)",
      buyer: "FreshVeg Logistics & Processing Corp",
      lotId: "LOT-TOM-02",
      disputedAmount: 44000,
      disputedFormatted: "₹ 44,000",
      farmerClaim: "Farmer states 50 Qt tomatoes were harvested at perfect 4.8% TSS grade with zero rot at farm pickup.",
      buyerClaim: "Buyer claims 12% produce suffered transit squishing due to standard crates used instead of perforated plastic.",
      evidenceLab: "MPKV Rahuri Nodal Lab: 94% acceptable processing grade.",
      evidencePod: "Geotagged pickup photo showing undamaged crates at farm gate.",
      status: "Arbitration In Progress",
      hearingDate: "Today, 03:00 PM (Bench: Dr. Shinde)",
      proposedResolution: "Buyer accepts 92% volume; 8% logistics transit allowance credited to Farmer from Logistics Transit Insurance."
    },
    {
      ticketId: "DISP-MH-8815",
      title: "Weight Bridge Discrepancy on Latur Soybean Batch",
      farmer: "Govind Marathe (Latur)",
      buyer: "Marathwada Solvents Extractor Ltd.",
      lotId: "LOT-SOY-04",
      disputedAmount: 23000,
      disputedFormatted: "₹ 23,000",
      farmerClaim: "APMC Weigh Slip states 200.5 Qt net produce.",
      buyerClaim: "Factory intake scale recorded 195.5 Qt (5 Qt tare moisture deduction).",
      evidenceLab: "Moisture tested at 9.8% (well within 10.0% standard contract limit).",
      evidencePod: "Calibrated APMC Latur electronic slip verified.",
      status: "Ready for Binding Award",
      hearingDate: "Today, 04:30 PM",
      proposedResolution: "Disallow buyer's 5 Qt moisture penalty. Direct 100% contract payout of ₹23,000 released from buyer escrow."
    }
  ],

  // Immutable Audit Trail
  auditTrail: [
    { timestamp: "15 Sep 2026 11:30:12", action: "35% Advance Escrow Released", targetId: "ESC-MH-2026-899", amount: "₹ 52,500", actor: "Dr. R. K. Shinde (IAS)", txHash: "0x88f2a...91b4", status: "Success" },
    { timestamp: "15 Sep 2026 10:45:00", action: "Buyer KYC Approved & Credit Limit Set", targetId: "KYC-BUYER-1088", amount: "Limit: ₹ 50L", actor: "Mandi Board Registrar", txHash: "0x34c1b...77ae", status: "Success" },
    { timestamp: "15 Sep 2026 09:12:44", action: "APMC Price Ceiling Adjusted (+5%)", targetId: "CROP-ONI", amount: "Ceiling: ₹ 28/kg", actor: "State Mandi Price Committee", txHash: "0x9920d...11fe", status: "Success" },
    { timestamp: "14 Sep 2026 18:00:20", action: "Dispute Settled & Compensation Awarded", targetId: "DISP-MH-8809", amount: "₹ 18,000", actor: "Arbitration Tribunal Bench", txHash: "0xaa19c...55d0", status: "Success" }
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
    const cases = this.getGrievances();
    const item = cases.find(g => g.ticketId === ticketId);
    if (!item) return { success: false, message: "Tribunal ticket not found" };

    item.status = "Settled by Tribunal ✓";
    item.proposedResolution = verdict || item.proposedResolution;
    this.saveGrievances(cases);

    this.addAuditLog(`Tribunal Binding Award Issued`, item.ticketId, item.disputedFormatted, "Chief Mandi Commissioner");
    return { success: true, message: `Tribunal resolution issued for ticket ${item.ticketId}!` };
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
}

