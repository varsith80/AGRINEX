/**
 * AgriNex FPO Hub (Farmer Producer Organization) Data Store & Aggregation Engine
 * Enables individual smallholders to pool lot volumes together to fulfill massive enterprise buyer bulk orders
 */

const FPO_COOPERATIVE_DATA = {
  fpoProfile: {


    fpoName: "MahaAgri Farmers Producer Co-op Ltd. (MAFPC)",
    fpoId: "FPO-MH-NASHIK-09",
    regNo: "FPO/MH/2023/8892",
    totalMemberFarmers: 450,
    activePoolsCount: 4,
    location: "Lasalgaon APMC Terminal, Nashik, Maharashtra",
    president: "Patil Rameshwar (Managing Director)",
    cooperativeSecretary: "Shetkari Suresh Bhalerao",
    fpoWalletLocked: "₹ 98,50,000",

 (Resolve all merge conflicts cleanly and harmonize logistics and admin endpoints)
    nabardStatus: "NABARD & SFAC Grade-A Certified",
    auditStatus: "FY 2025-26 Clean Audit ✓"
  },
  
  // High-Volume Enterprise Bulk Orders Open for Farmer Pooling
  bulkDemands: [
    {
      id: "BULK-DEM-TOM-01",
      crop: "Tomato (Shimla Red / Processing Grade)",
      image: "assets/images/tomato.jpg",
      buyerName: "Kissan & Nestle India Procurements",
      buyerLogo: "🍅",
      buyerCategory: "Food Processing Giant",
      totalRequiredQty: "500 Qt (50,000 kg)",
      totalRequiredNumber: 500,
      currentPooledQty: 380,
      targetPricePerQt: "₹ 13.50 /kg (₹ 1,350 /Qt)",
      targetPriceNumber: 1350,
      minContribution: "10 Qt (1,000 kg)",
      deadline: "2 Days Remaining",


      destination: "Nestle Agro Facility, Pune, Maharashtra",

 (Resolve all merge conflicts cleanly and harmonize logistics and admin endpoints)
      status: "Pooling Active (76% Filled)",
      qualitySpecs: "TSS > 4.5%, Uniform Red, Moisture < 88%, Zero Pest Damage",
      advancePercent: "35% Advance",
      farmerContributors: [


        { name: "Patil Rameshwar (You)", qty: 50, timestamp: "Today 10:15 AM", status: "Committed (Escrow Locked)" },
        { name: "Sanjay Deshmukh", qty: 120, timestamp: "Yesterday", status: "Verified" },
        { name: "Balasaheb More", qty: 110, timestamp: "2 days ago", status: "Verified" },
        { name: "Shankar Mhetre", qty: 100, timestamp: "3 days ago", status: "Verified" }

 (Resolve all merge conflicts cleanly and harmonize logistics and admin endpoints)
      ]
    },
    {
      id: "BULK-DEM-ONI-02",
      crop: "Red Onions (Export Quality Grade A)",
      image: "assets/images/onion.jpg",
      buyerName: "Dubai Agro-Gulf Exporters Ltd.",
      buyerLogo: "🧅",
      buyerCategory: "International Export Consortium",
      totalRequiredQty: "1,000 Qt (1,00,000 kg)",
      totalRequiredNumber: 1000,
      currentPooledQty: 650,
      targetPricePerQt: "₹ 11.00 /kg (₹ 1,100 /Qt)",
      targetPriceNumber: 1100,
      minContribution: "20 Qt (2,000 kg)",
      deadline: "4 Days Remaining",


      destination: "Vashi International Cargo Terminal, Navi Mumbai",

 (Resolve all merge conflicts cleanly and harmonize logistics and admin endpoints)
      status: "Pooling Active (65% Filled)",
      qualitySpecs: "Bulb Size 45-65mm, Clean Dried Outer Skin, Phyto-Certified",
      advancePercent: "35% Advance",
      farmerContributors: [


        { name: "Kishor Ahire", qty: 250, timestamp: "Yesterday", status: "Verified" },
        { name: "Lasalgaon Farmers Club (6 Farmers)", qty: 400, timestamp: "2 days ago", status: "Verified" }

 (Resolve all merge conflicts cleanly and harmonize logistics and admin endpoints)
      ]
    },
    {
      id: "BULK-DEM-PAD-03",
      crop: "Paddy / Rice (Sona Masoori A-Grade)",
      image: "assets/images/paddy.jpg",
      buyerName: "ITC Agri-Business Division",
      buyerLogo: "🌾",
      buyerCategory: "Institutional Corporate Buyer",
      totalRequiredQty: "2,000 Qt (2,00,000 kg)",
      totalRequiredNumber: 2000,
      currentPooledQty: 1850,
      targetPricePerQt: "₹ 21.50 /kg (₹ 2,150 /Qt)",
      targetPriceNumber: 2150,
      minContribution: "50 Qt (5,000 kg)",
      deadline: "1 Day Remaining",


      destination: "Latur Industrial Solvent Extraction Hub",

 (Resolve all merge conflicts cleanly and harmonize logistics and admin endpoints)
      status: "Near Completion (92.5% Filled)",
      qualitySpecs: "Moisture 13-14%, Grain Length > 6.6mm, Discolored Grains < 1%",
      advancePercent: "35% Advance",
      farmerContributors: [


        { name: "Marathwada Farmers Syndicate (14 Farmers)", qty: 1500, timestamp: "3 days ago", status: "Verified" },
        { name: "Govind Marathe", qty: 350, timestamp: "Yesterday", status: "Verified" }

 (Resolve all merge conflicts cleanly and harmonize logistics and admin endpoints)
      ]
    },
    {
      id: "BULK-DEM-COT-04",


      crop: "Raw Cotton (Yavatmal / Amravati Long Staple)",
      image: "assets/images/cotton.jpg?v=2",
      buyerName: "Raymond Textile Mills Consortium",

 (Resolve all merge conflicts cleanly and harmonize logistics and admin endpoints)
      buyerLogo: "☁️",
      buyerCategory: "Textile Mills Consortium",
      totalRequiredQty: "800 Qt (80,000 kg)",
      totalRequiredNumber: 800,
      currentPooledQty: 480,
      targetPricePerQt: "₹ 68.00 /kg (₹ 6,800 /Qt)",
      targetPriceNumber: 6800,
      minContribution: "15 Qt (1,500 kg)",
      deadline: "5 Days Remaining",


      destination: "Ichalkaranji Spinning Cluster, Kolhapur",

 (Resolve all merge conflicts cleanly and harmonize logistics and admin endpoints)
      status: "Pooling Active (60% Filled)",
      qualitySpecs: "Staple Length 32mm+, Micronaire 3.8-4.2, Trash Content < 3%",
      advancePercent: "35% Advance",
      farmerContributors: [


        { name: "Vidarbha Cotton Union (8 Farmers)", qty: 320, timestamp: "Yesterday", status: "Verified" },
        { name: "Prakash Patil", qty: 160, timestamp: "2 days ago", status: "Verified" }

 (Resolve all merge conflicts cleanly and harmonize logistics and admin endpoints)
      ]
    }
  ],

  // Historical Completed FPO Contracts
  completedShipments: [
    {
      id: "FPO-DISP-882",
      crop: "Tomato (Roma Hybrid)",
      buyer: "Hindustan Unilever (Kissan Factory)",
      totalQty: "600 Qt (Pooled from 18 Farmers)",
      contractValue: "₹ 8,10,000",
      settlementStatus: "100% Escrow Released to Farmers",
      dispatchDate: "04 Sep 2026",


      transportAgent: "GreenWays Agro Transit (MH-15-AX-8910)"

 (Resolve all merge conflicts cleanly and harmonize logistics and admin endpoints)
    },
    {
      id: "FPO-DISP-841",
      crop: "Basmati Paddy 1121",
      buyer: "Adani Wilmar Agri Foods",
      totalQty: "1,500 Qt (Pooled from 32 Farmers)",
      contractValue: "₹ 34,50,000",
      settlementStatus: "100% Escrow Released to Farmers",
      dispatchDate: "22 Aug 2026",


      transportAgent: "Southern Express Fleet (MH-12-BZ-4411)"

 (Resolve all merge conflicts cleanly and harmonize logistics and admin endpoints)
    }
  ],

  // Governance & Member Board
  boardMembers: [


 (Resolve all merge conflicts cleanly and harmonize logistics and admin endpoints)
    { name: "R. Shanmugam", role: "President & Managing Director", village: "Pimpalgaon, Nashik", phone: "+91 98421 11200", term: "2023 - 2028" },
    { name: "Vikas Shinde", role: "Vice President (Horticulture Lead)", village: "Niphad, Nashik", phone: "+91 98422 33411", term: "2023 - 2028" },
    { name: "Dr. S. Kulkarni", role: "NABARD Nodal Technical Advisor", village: "MPKV Rahuri Agricultural University", phone: "+91 94433 99881", term: "Permanent Nominee" },
    { name: "Ramesh Patil (You)", role: "Elected Farmer Executive (Nashik Zone)", village: "Dindori Taluk, Nashik", phone: "+91 98421 88390", term: "2024 - 2027" }


 (Resolve all merge conflicts cleanly and harmonize logistics and admin endpoints)
  ]
};

class AgriNexFPOHub {
  static getBulkDemands() {
    let data = null;
    try {
      const stored = localStorage.getItem("agrinex_fpo_bulk_demands");
      if (stored) data = JSON.parse(stored);
    } catch(e) {}
    return data || FPO_COOPERATIVE_DATA.bulkDemands;
  }

  static saveBulkDemands(demands) {
    localStorage.setItem("agrinex_fpo_bulk_demands", JSON.stringify(demands));
  }

  /**
   * Contribute farmer quantity into an existing FPO bulk pooling demand
   */
  static contributeToPool(demandId, farmerName, quantityQt) {
    const demands = this.getBulkDemands();
    const demand = demands.find(d => d.id === demandId);
    if (!demand) return { success: false, message: "Order pool not found." };

    const qtyNum = parseInt(quantityQt);
    if (isNaN(qtyNum) || qtyNum <= 0) {
      return { success: false, message: "Please enter a valid quantity in Quintals." };
    }

    demand.currentPooledQty += qtyNum;
    if (!demand.farmerContributors) demand.farmerContributors = [];

    demand.farmerContributors.unshift({
      name: `${farmerName} (You)`,
      qty: qtyNum,
      timestamp: "Just Now",
      status: "Committed (Escrow Locked)"
    });

    const percent = Math.min(100, Math.round((demand.currentPooledQty / demand.totalRequiredNumber) * 100));
    demand.status = percent >= 100 ? "✅ 100% Fully Pooled (Order Locked)" : `Pooling Active (${percent}% Filled)`;

    this.saveBulkDemands(demands);

    return {
      success: true,
      demand,
      percent,
      message: `Successfully pooled ${qtyNum} Qt of ${demand.crop}! Total pool is now ${demand.currentPooledQty}/${demand.totalRequiredQty} (${percent}%).`
    };
  }

  static getCompletedShipments() {
    return FPO_COOPERATIVE_DATA.completedShipments;
  }

  static getBoardMembers() {
    return FPO_COOPERATIVE_DATA.boardMembers;
  }

  static getMyCommitments(farmerName = "Ramesh Kumar") {
    const demands = this.getBulkDemands();
    const commitments = [];
    demands.forEach(d => {
      if (d.farmerContributors) {
        const found = d.farmerContributors.filter(c => c.name.includes(farmerName) || c.name.includes("You"));
        found.forEach(c => {
          const totalEarn = c.qty * d.targetPriceNumber;
          const advanceEarn = Math.round(totalEarn * 0.35);
          commitments.push({
            demandId: d.id,
            crop: d.crop,
            buyer: d.buyerName,
            myQty: `${c.qty} Qt`,
            qtyNumber: c.qty,
            unitPrice: d.targetPricePerQt,
            totalEstimatedPayout: `₹ ${totalEarn.toLocaleString('en-IN')}`,
            advanceEscrow: `₹ ${advanceEarn.toLocaleString('en-IN')} (35%)`,
            poolProgress: `${d.currentPooledQty} / ${d.totalRequiredQty}`,
            poolPercent: Math.min(100, Math.round((d.currentPooledQty / d.totalRequiredNumber) * 100)),
            status: c.status,
            destination: d.destination
          });
        });
      }
    });
    return commitments;
  }
}

window.FPO_COOPERATIVE_DATA = FPO_COOPERATIVE_DATA;
window.AgriNexFPOHub = AgriNexFPOHub;
