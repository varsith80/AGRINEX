/**
 * AgriNex FPO Hub (Farmer Producer Organization) Data Store & Aggregation Engine
 * Enables individual smallholders to pool lot volumes together to fulfill massive enterprise buyer bulk orders across Maharashtra
 */

const FPO_COOPERATIVE_DATA = {
  fpoProfile: {
    fpoName: "Nashik Agro Farmer Producer Co. (NAFPO)",
    fpoId: "FPO-MH-NASHIK-8821",
    regNo: "FPO/MH/2023/8821",
    totalMemberFarmers: 450,
    activePoolsCount: 6,
    location: "Lasalgaon APMC Terminal, Nashik, Maharashtra",
    president: "Ramesh Patil (Managing Director)",
    cooperativeSecretary: "Shetkari Suresh Bhalerao",
    fpoWalletLocked: "₹ 98,50,000",
    nabardStatus: "NABARD & SFAC Grade-A Certified",
    auditStatus: "FY 2025-26 Clean Audit ✓"
  },
  
  // High-Volume Enterprise Bulk Orders Open for Farmer Pooling
  bulkDemands: [
    {
      id: "BULK-DEM-TOM-01",
      crop: "Tomato (Shivam Hybrid / Processing Grade)",
      image: "assets/images/tomato.jpg?v=2",
      buyerName: "Kissan & Nestle India Procurements",
      buyerLogo: "🍅",
      buyerCategory: "Food Processing Giant",
      totalRequiredQty: "500 Qt (50,000 kg)",
      totalRequiredNumber: 500,
      currentPooledQty: 380,
      targetPricePerQt: "₹ 22.00 /kg (₹ 2,200 /Qt)",
      targetPriceNumber: 2200,
      minContribution: "10 Qt (1,000 kg)",
      deadline: "2 Days Remaining",
      destination: "Narayangaon Food Park, Junnar, Pune",
      status: "Pooling Active (76% Filled)",
      qualitySpecs: "TSS > 4.5%, Uniform Red Firm, Moisture < 88%, Zero Pest Damage",
      advancePercent: "35% Advance",
      farmerContributors: [
        { name: "Ramesh Patil (You)", qty: 50, timestamp: "Today 10:15 AM", status: "Committed (Escrow Locked)" },
        { name: "Sanjay Deshmukh", qty: 120, timestamp: "Yesterday", status: "Verified" },
        { name: "Balasaheb More", qty: 110, timestamp: "2 days ago", status: "Verified" },
        { name: "Shankar Mhetre", qty: 100, timestamp: "3 days ago", status: "Verified" }
      ]
    },
    {
      id: "BULK-DEM-ONI-02",
      crop: "Red Onion (Nashik Export Grade)",
      image: "assets/images/onion.jpg",
      buyerName: "Dubai Agro-Gulf Exporters Ltd.",
      buyerLogo: "🧅",
      buyerCategory: "International Export Consortium",
      totalRequiredQty: "1,000 Qt (1,00,000 kg)",
      totalRequiredNumber: 1000,
      currentPooledQty: 650,
      targetPricePerQt: "₹ 18.00 /kg (₹ 1,800 /Qt)",
      targetPriceNumber: 1800,
      minContribution: "20 Qt (2,000 kg)",
      deadline: "4 Days Remaining",
      destination: "Vashi International Cargo Terminal, Navi Mumbai",
      status: "Pooling Active (65% Filled)",
      qualitySpecs: "Bulb Size 45-65mm, Clean Dried Outer Skin, Phyto-Certified",
      advancePercent: "35% Advance",
      farmerContributors: [
        { name: "Kishor Ahire", qty: 250, timestamp: "Yesterday", status: "Verified" },
        { name: "Lasalgaon Farmers Club (6 Farmers)", qty: 400, timestamp: "2 days ago", status: "Verified" }
      ]
    },
    {
      id: "BULK-DEM-PAD-05",
      crop: "Paddy (1121 Basmati)",
      image: "assets/images/rice.jpg?v=2",
      buyerName: "ITC Agri-Business Division",
      buyerLogo: "🌾",
      buyerCategory: "Institutional Grain Exporter",
      totalRequiredQty: "2,000 Qt (2,00,000 kg)",
      totalRequiredNumber: 2000,
      currentPooledQty: 1850,
      targetPricePerQt: "₹ 24.00 /kg (₹ 2,400 /Qt)",
      targetPriceNumber: 2400,
      minContribution: "25 Qt (2,500 kg)",
      deadline: "1 Day Remaining",
      destination: "Bhiwandi Central Grain Processing Terminal",
      status: "Near Completion (92.5% Filled)",
      qualitySpecs: "Moisture < 12%, Extra Long Grain 8.3mm+, Zero Discoloration",
      advancePercent: "35% Advance",
      farmerContributors: [
        { name: "Ramesh Patil (You)", qty: 100, timestamp: "2 days ago", status: "Committed (Escrow Locked)" },
        { name: "Gondia Farmers Co-op", qty: 1750, timestamp: "3 days ago", status: "Verified" }
      ]
    },
    {
      id: "BULK-DEM-COT-04",
      crop: "Raw Cotton (MCU-5 Long Staple)",
      image: "assets/images/cotton.jpg?v=2",
      buyerName: "Raymond Textile Mills Consortium",
      buyerLogo: "☁️",
      buyerCategory: "Textile Mills Consortium",
      totalRequiredQty: "800 Qt (80,000 kg)",
      totalRequiredNumber: 800,
      currentPooledQty: 480,
      targetPricePerQt: "₹ 62.00 /kg (₹ 6,200 /Qt)",
      targetPriceNumber: 6200,
      minContribution: "15 Qt (1,500 kg)",
      deadline: "5 Days Remaining",
      destination: "Amravati Textile Park, Vidarbha",
      status: "Pooling Active (60% Filled)",
      qualitySpecs: "Staple Length 29mm+, Micronaire 3.8-4.2, Trash Content < 3%",
      advancePercent: "35% Advance",
      farmerContributors: [
        { name: "Vidarbha Cotton Union (8 Farmers)", qty: 320, timestamp: "Yesterday", status: "Verified" },
        { name: "Prakash Patil", qty: 160, timestamp: "2 days ago", status: "Verified" }
      ]
    },
    {
      id: "BULK-DEM-CHI-06",
      crop: "Green Chilli (G4 Spicy)",
      image: "assets/images/chilli.jpg",
      buyerName: "Everest Spices & Food Processing",
      buyerLogo: "🌶️",
      buyerCategory: "Spices & Food Processor",
      totalRequiredQty: "300 Qt (30,000 kg)",
      totalRequiredNumber: 300,
      currentPooledQty: 190,
      targetPricePerQt: "₹ 34.00 /kg (₹ 3,400 /Qt)",
      targetPriceNumber: 3400,
      minContribution: "5 Qt (500 kg)",
      deadline: "3 Days Remaining",
      destination: "Turbhe Spice Terminal, Navi Mumbai",
      status: "Pooling Active (63% Filled)",
      qualitySpecs: "Pungency High G4, Fresh Stalk Attached, Moisture < 80%",
      advancePercent: "35% Advance",
      farmerContributors: [
        { name: "Sinnar Chilli Growers", qty: 190, timestamp: "Yesterday", status: "Verified" }
      ]
    },
    {
      id: "BULK-DEM-SOY-03",
      crop: "Yellow Soybean (Latur JS 335)",
      image: "assets/images/soybean.jpg?v=3",
      buyerName: "Adani Wilmar Agro Processing",
      buyerLogo: "🌻",
      buyerCategory: "Institutional Corporate Buyer",
      totalRequiredQty: "1,500 Qt (1,50,000 kg)",
      totalRequiredNumber: 1500,
      currentPooledQty: 1200,
      targetPricePerQt: "₹ 48.00 /kg (₹ 4,800 /Qt)",
      targetPriceNumber: 4800,
      minContribution: "20 Qt (2,000 kg)",
      deadline: "2 Days Remaining",
      destination: "Latur Industrial Solvent Extraction Hub",
      status: "Pooling Active (80% Filled)",
      qualitySpecs: "Moisture < 10%, Oil Content > 19.5%, Foreign Matter < 1%",
      advancePercent: "35% Advance",
      farmerContributors: [
        { name: "Marathwada Farmers Syndicate (14 Farmers)", qty: 1200, timestamp: "3 days ago", status: "Verified" }
      ]
    }
  ],

  // Historical Completed FPO Contracts
  completedShipments: [
    {
      id: "FPO-DISP-882",
      crop: "Red Onion (Nashik Export Grade)",
      buyer: "LuLu Hypermarket Gulf Procurement",
      totalQty: "800 Qt (Pooled from 24 Farmers)",
      contractValue: "₹ 14,40,000",
      settlementStatus: "100% Escrow Released to Farmers",
      dispatchDate: "04 Sep 2026",
      transportAgent: "GreenWays Agro Transit (MH-15-AX-8910)"
    },
    {
      id: "FPO-DISP-841",
      crop: "Wada Kolam Rice (Palghar GI)",
      buyer: "Avenue Supermarts (DMart Wholesale)",
      totalQty: "1,200 Qt (Pooled from 28 Farmers)",
      contractValue: "₹ 57,60,000",
      settlementStatus: "100% Escrow Released to Farmers",
      dispatchDate: "22 Aug 2026",
      transportAgent: "Konkan Agro Express (MH-04-BZ-4411)"
    }
  ],

  // Governance & Member Board
  boardMembers: [
    { name: "Ramesh Patil", role: "President & Managing Director", village: "Lasalgaon, Nashik", phone: "+91 98421 88390", term: "2023 - 2028" },
    { name: "Sanjay Deshmukh", role: "Vice President (Horticulture Lead)", village: "Narayangaon, Junnar", phone: "+91 98224 33100", term: "2023 - 2028" },
    { name: "Dr. Vijay Pawar", role: "MPKV Rahuri Nodal Technical Advisor", village: "MPKV Rahuri Campus", phone: "+91 94223 99881", term: "Permanent Nominee" },
    { name: "Govind Marathe", role: "Elected Farmer Executive (Marathwada Zone)", village: "Latur Mandi", phone: "+91 98228 11922", term: "2024 - 2027" }
  ]
};

class AgriNexFPOHub {
  static getBulkDemands() {
    let data = null;
    try {
      const stored = localStorage.getItem("agrinex_fpo_bulk_demands");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          data = parsed;
        }
      }
    } catch(e) {}
    return (data && data.length > 0) ? data : FPO_COOPERATIVE_DATA.bulkDemands;
  }

  static saveBulkDemands(demands) {
    try {
      localStorage.setItem("agrinex_fpo_bulk_demands", JSON.stringify(demands));
    } catch(e) {}
  }

  static contributeToPool(demandId, qtyQt, farmerName = "Ramesh Patil") {
    // Check argument order flexibility if called as (demandId, farmerName, qtyQt)
    let actualQty = qtyQt;
    let actualFarmer = farmerName;
    if (typeof qtyQt === "string" && isNaN(Number(qtyQt)) && !isNaN(Number(farmerName))) {
      actualFarmer = qtyQt;
      actualQty = farmerName;
    }

    const demands = this.getBulkDemands();
    const item = demands.find(d => d.id === demandId);
    if (!item) return { success: false, message: "Pool contract not found" };

    const qty = parseInt(actualQty);
    if (isNaN(qty) || qty <= 0) return { success: false, message: "Invalid quantity entered" };

    const remaining = item.totalRequiredNumber - item.currentPooledQty;
    if (qty > remaining) {
      return { success: false, message: `Exceeds max required quota. Only ${remaining} Qt remaining.` };
    }

    item.currentPooledQty += qty;
    if (!item.farmerContributors) item.farmerContributors = [];
    item.farmerContributors.unshift({
      name: actualFarmer || "Ramesh Patil (You)",
      qty: qty,
      timestamp: "Just Now",
      status: "Committed (Escrow Locked)"
    });

    const percent = Math.round((item.currentPooledQty / item.totalRequiredNumber) * 100);
    item.status = percent >= 100 ? "Pool Fulfilled (100%)" : `Pooling Active (${percent}% Filled)`;

    this.saveBulkDemands(demands);
    return { success: true, message: `Successfully committed ${qty} Qt to ${item.crop} FPO pool!` };
  }

  static getMyCommitments(farmerName = "Ramesh Patil") {
    const demands = this.getBulkDemands();
    const commitments = [];

    demands.forEach(d => {
      if (!d.farmerContributors) return;
      d.farmerContributors.forEach(c => {
        const isMe = c.name && (
          c.name.toLowerCase().includes("you") || 
          c.name.toLowerCase().includes("patil") || 
          c.name.toLowerCase().includes("ramesh")
        );
        if (isMe) {
          const totalVal = c.qty * d.targetPriceNumber;
          const advanceVal = Math.round(totalVal * 0.35);
          const percent = Math.min(100, Math.round((d.currentPooledQty / d.totalRequiredNumber) * 100));
          commitments.push({
            crop: d.crop,
            destination: d.destination,
            buyer: d.buyerName,
            myQty: `${c.qty} Qt (${(c.qty * 100).toLocaleString('en-IN')} kg)`,
            unitPrice: `₹ ${(d.targetPriceNumber / 100).toFixed(2)}/kg`,
            totalEstimatedPayout: `₹ ${totalVal.toLocaleString('en-IN')}`,
            advanceEscrow: `₹ ${advanceVal.toLocaleString('en-IN')}`,
            poolProgress: `${d.currentPooledQty}/${d.totalRequiredNumber} Qt`,
            poolPercent: percent,
            status: c.status || "Escrow Locked"
          });
        }
      });
    });

    return commitments;
  }

  static getCompletedShipments() {
    return FPO_COOPERATIVE_DATA.completedShipments || [];
  }

  static getBoardMembers() {
    return FPO_COOPERATIVE_DATA.boardMembers || [];
  }

  static getFPOProfile() {
    return FPO_COOPERATIVE_DATA.fpoProfile;
  }
}

// Global & Window Object Bindings
if (typeof window !== "undefined") {
  window.AgriNexFPOHub = AgriNexFPOHub;
  window.FPO_COOPERATIVE_DATA = FPO_COOPERATIVE_DATA;
}
if (typeof global !== "undefined") {
  global.AgriNexFPOHub = AgriNexFPOHub;
  global.FPO_COOPERATIVE_DATA = FPO_COOPERATIVE_DATA;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = { AgriNexFPOHub, FPO_COOPERATIVE_DATA };
}
