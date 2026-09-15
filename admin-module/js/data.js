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
    dailyTradeVolume: "₹ 3,12,40,000",
    tradeVolumeSubtext: "Across 23 MH Commodities",
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
    }
  ],

  // Farmer & Buyer KYC Verification Applications
  kycQueue: [
    {
      id: "KYC-FARM-8841",
      entityType: "Farmer",
      name: "Bhausaheb Thorat",
      location: "Sangamner, Ahmednagar, Maharashtra",
      phone: "+91 98224 81920",
      docType: "7/12 Land Record (Satbara) & Aadhaar",
      landHolding: "8.5 Acres (Irrigated Bagayat)",
      primaryCrops: "Pomegranate (Bhagwa), Onion",
      pmKisanStatus: "Active & PM-KISAN Verified (MH-AG-8819)",
      bankDetails: "State Bank of India (IFSC: SBIN0001824)",
      submittedDate: "Today, 09:30 AM",
      status: "Pending Review",
      riskAssessment: "Clean (0 Flags)"
    },
    {
      id: "KYC-BUYER-1092",
      entityType: "Enterprise Buyer",
      name: "Godrej Agrovet Sourcing Ltd.",
      location: "Vashi APMC Central Yard, Navi Mumbai",
      phone: "+91 98450 22100",
      docType: "GSTIN, Mandi License & FSSAI",
      gstin: "27AAACG9912K1Z5",
      fssaiLicense: "10022022001452 (Valid till 2028)",
      mandiLicense: "MSAMB/TRD/2024/7781",
      requestedCreditLimit: "₹ 75,00,000",
      bankGuarantee: "₹ 25,00,000 Escrow Deposit",
      submittedDate: "Today, 08:15 AM",
      status: "Pending Review",
      riskAssessment: "Tier-1 AAA Institutional"
    },
    {
      id: "KYC-FARM-8842",
      entityType: "Farmer",
      name: "Tukaram Jadhav",
      location: "Barsi, Solapur, Maharashtra",
      phone: "+91 98220 11400",
      docType: "7/12 Land Record & Bank Passbook",
      landHolding: "12 Acres",
      primaryCrops: "Tur / Pigeon Pea, Sunflower",
      pmKisanStatus: "Active (MH-SOL-4412)",
      bankDetails: "Bank of Maharashtra (IFSC: MAHB0000412)",
      submittedDate: "Yesterday, 04:00 PM",
      status: "Pending Review",
      riskAssessment: "Clean (0 Flags)"
    },
    {
      id: "KYC-BUYER-1093",
      entityType: "Processor Buyer",
      name: "Khandesh Edible Oil Refineries Pvt Ltd",
      location: "Jalgaon Industrial Area, Maharashtra",
      phone: "+91 98231 66700",
      docType: "GSTIN, Factory Inspector & Mandi Reg",
      gstin: "27AABCK8844D1ZP",
      fssaiLicense: "10023023000981",
      mandiLicense: "MSAMB/PRC/2025/1109",
      requestedCreditLimit: "₹ 50,00,000",
      bankGuarantee: "₹ 15,00,000 Escrow Deposit",
      submittedDate: "Yesterday, 02:30 PM",
      status: "Pending Review",
      riskAssessment: "Tier-2 Verified"
    }
  ],

  // 23 Maharashtra Crop Mandi Price Benchmarks & MSP Controls
  mandiPriceIndices: [
    { id: "CROP-ONI", crop: "Red Onion (Nashik Garwa)", msp: 12.00, modalPrice: 18.00, ceilingCap: 28.00, marketTrend: "Stable", keyMandis: "Lasalgaon, Pimpalgaon, Yeola", alert: "Normal" },
    { id: "CROP-TOM", crop: "Tomato (Shivam / Abhinav)", msp: 10.00, modalPrice: 22.00, ceilingCap: 35.00, marketTrend: "+8.5% High Demand", keyMandis: "Narayangaon, Junnar, Sangamner", alert: "High Inflow" },
    { id: "CROP-SOY", crop: "Yellow Soybean (JS 335)", msp: 48.92, modalPrice: 46.00, ceilingCap: 56.00, marketTrend: "Approaching MSP", keyMandis: "Latur, Hingoli, Akola", alert: "MSP Support Trigger" },
    { id: "CROP-COT", crop: "Raw Cotton (BT Staple)", msp: 71.22, modalPrice: 62.00, ceilingCap: 78.00, marketTrend: "Bullish", keyMandis: "Yavatmal, Amravati, Jalna", alert: "CCI Procurement Active" },
    { id: "CROP-BAN", crop: "Grand Naine Banana", msp: 9.00, modalPrice: 14.50, ceilingCap: 20.00, marketTrend: "Strong Export", keyMandis: "Raver, Jalgaon, Bhusawal", alert: "Normal" },
    { id: "CROP-ORA", crop: "Nagpur Orange (Santra)", msp: 24.00, modalPrice: 42.00, ceilingCap: 60.00, marketTrend: "Peak Harvest", keyMandis: "Nagpur, Kalmeshwar, Morshi", alert: "Normal" },
    { id: "CROP-GRA", crop: "Thompson Grapes", msp: 40.00, modalPrice: 80.00, ceilingCap: 110.00, marketTrend: "High Demand", keyMandis: "Nashik, Niphad, Dindori", alert: "Normal" },
    { id: "CROP-MAN", crop: "Alphonso / Hapus Mango", msp: 120.00, modalPrice: 250.00, ceilingCap: 400.00, marketTrend: "Premium GI", keyMandis: "Ratnagiri, Devgad, Sindhudurg", alert: "Export Surge" },
    { id: "CROP-TUR", crop: "Marathwada Red Tur Dal", msp: 75.50, modalPrice: 94.00, ceilingCap: 115.00, marketTrend: "Firm", keyMandis: "Latur, Solapur, Nanded", alert: "Normal" },
    { id: "CROP-RIC", crop: "Wada Kolam Rice", msp: 32.00, modalPrice: 48.00, ceilingCap: 62.00, marketTrend: "Stable", keyMandis: "Palghar, Manor, Wada", alert: "GI Demand" },
    { id: "CROP-CHI", crop: "Guntur / Nandurbar Red Chilli", msp: 120.00, modalPrice: 185.00, ceilingCap: 240.00, marketTrend: "Strong", keyMandis: "Nandurbar, Dondaicha", alert: "Normal" },
    { id: "CROP-JOW", crop: "Maldandi Jowar (Shalu)", msp: 33.77, modalPrice: 42.00, ceilingCap: 52.00, marketTrend: "Stable", keyMandis: "Solapur, Mohol, Karmala", alert: "Normal" },
    { id: "CROP-BAJ", crop: "Hybrid Pearl Millet / Bajra", msp: 26.25, modalPrice: 24.00, ceilingCap: 30.00, marketTrend: "Fair", keyMandis: "Dhule, Malegaon, Beed", alert: "Normal" },
    { id: "CROP-WHE", crop: "Lokwan / Sharbati Wheat", msp: 24.25, modalPrice: 28.50, ceilingCap: 36.00, marketTrend: "Steady", keyMandis: "Akola, Washim, Buldhana", alert: "Normal" },
    { id: "CROP-CHA", crop: "Desi Chana (Bengal Gram)", msp: 56.50, modalPrice: 58.00, ceilingCap: 70.00, marketTrend: "Firm", keyMandis: "Latur, Jalna, Parbhani", alert: "Normal" },
    { id: "CROP-MOO", crop: "Shiny Green Moong Dal", msp: 86.82, modalPrice: 92.00, ceilingCap: 110.00, marketTrend: "High Demand", keyMandis: "Jalna, Ahmednagar, Beed", alert: "Normal" },
    { id: "CROP-URA", crop: "Black Urad Dal (Maharashtra)", msp: 74.00, modalPrice: 82.00, ceilingCap: 98.00, marketTrend: "Steady", keyMandis: "Nanded, Hingoli, Latur", alert: "Normal" },
    { id: "CROP-SUN", crop: "High-Oil Sunflower Seeds", msp: 72.80, modalPrice: 58.00, ceilingCap: 75.00, marketTrend: "Crushing Demand", keyMandis: "Beed, Osmanabad, Latur", alert: "Price Deficit Alert" },
    { id: "CROP-GRO", crop: "Groundnut / Peanut (JL 24)", msp: 67.83, modalPrice: 72.00, ceilingCap: 88.00, marketTrend: "Firm", keyMandis: "Kolhapur, Satara, Sangli", alert: "Normal" },
    { id: "CROP-TUM", crop: "Rajapuri GI Turmeric (Curcumin 4%)", msp: 85.00, modalPrice: 145.00, ceilingCap: 190.00, marketTrend: "Bullish", keyMandis: "Sangli, Nanded, Basmat", alert: "Spike Detected" },
    { id: "CROP-GIN", crop: "Fresh Green Ginger (Ada)", msp: 25.00, modalPrice: 55.00, ceilingCap: 85.00, marketTrend: "High Demand", keyMandis: "Satara, Koregaon, Wai", alert: "Normal" },
    { id: "CROP-GAR", crop: "Garlic (Mahyco Extra Bold)", msp: 60.00, modalPrice: 130.00, ceilingCap: 180.00, marketTrend: "Volatile", keyMandis: "Rahuri, Sangamner, Nashik", alert: "Anti-Hoarding Watch" },
    { id: "CROP-POM", crop: "Bhagwa Pomegranate (GI Export)", msp: 60.00, modalPrice: 110.00, ceilingCap: 160.00, marketTrend: "Export Surge", keyMandis: "Solapur, Sangola, Pandharpur", alert: "Normal" }
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

  static getKYCQueue() {
    try {
      if (typeof localStorage !== "undefined") {
        const stored = localStorage.getItem("agrinex_admin_kyc");
        if (stored) return JSON.parse(stored);
      }
    } catch(e) {}
    return ADMIN_GOVERNANCE_DATA.kycQueue;
  }

  static saveKYCQueue(queue) {
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem("agrinex_admin_kyc", JSON.stringify(queue));
      }
    } catch(e) {}
  }

  static approveKYC(kycId, remarks = "7/12 & GSTIN Verified") {
    const queue = this.getKYCQueue();
    const item = queue.find(k => k.id === kycId);
    if (!item) return { success: false, message: "KYC Record not found" };

    item.status = "Verified & Approved ✓";
    item.riskAssessment = "Active Certified";
    this.saveKYCQueue(queue);

    this.addAuditLog(`KYC Approved (${item.entityType})`, item.id, item.name, "Mandi Board Registrar");
    return { success: true, message: `Approved KYC credentials for ${item.name}!` };
  }

  static rejectKYC(kycId, reason = "Document Discrepancy") {
    const queue = this.getKYCQueue();
    const item = queue.find(k => k.id === kycId);
    if (!item) return { success: false, message: "KYC Record not found" };

    item.status = `Rejected: ${reason}`;
    item.riskAssessment = "Flagged / Incomplete";
    this.saveKYCQueue(queue);

    this.addAuditLog(`KYC Rejected (${item.entityType})`, item.id, reason, "Mandi Board Registrar");
    return { success: true, message: `Rejected application for ${item.name}. Notification sent.` };
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

