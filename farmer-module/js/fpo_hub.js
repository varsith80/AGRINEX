/**
 * AgriNex FPO Hub (Farmer Producer Organization) Data Store & Aggregation Engine
 * Enables individual smallholders to pool lot volumes together to fulfill massive enterprise buyer bulk orders across Maharashtra
 */

const FPO_COOPERATIVE_DATA = {
  fpoProfile: {
    fpoName: "MahaAgri Farmers Producer Co-op Ltd. (MAFPC)",
    fpoId: "FPO-MH-NASHIK-09",
    regNo: "FPO/MH/2023/8892",
    totalMemberFarmers: 450,
    activePoolsCount: 10,
    location: "Lasalgaon APMC Terminal, Nashik, Maharashtra",
    president: "Patil Rameshwar (Managing Director)",
    cooperativeSecretary: "Shetkari Suresh Bhalerao",
    fpoWalletLocked: "₹ 1,85,50,000",
    nabardStatus: "NABARD & SFAC Grade-A Certified",
    auditStatus: "FY 2025-26 Clean Audit ✓"
  },
  
  // High-Volume Enterprise Bulk Orders Open for Farmer Pooling (10 Diverse Bulk Orders)
  bulkDemands: [
    {
      id: "BULK-DEM-TOM-01",
      crop: "Tomato (Shivam / Abhinav Hybrid)",
      image: "assets/images/tomato.jpg?v=2",
      buyerName: "Kissan & Nestle India Procurements",
      buyerLogo: "🍅",
      buyerCategory: "Food Processing Giant",
      totalRequiredQty: "500 Qt (50,000 kg)",
      totalRequiredNumber: 500,
      currentPooledQty: 380,
      targetPricePerQt: "₹ 15.00 /kg (₹ 1,500 /Qt)",
      targetPriceNumber: 1500,
      minContribution: "10 Qt (1,000 kg)",
      deadline: "2 Days Remaining",
      destination: "Narayangaon Food Park, Junnar, Pune",
      status: "Pooling Active (76% Filled)",
      qualitySpecs: "TSS > 4.5%, Uniform Red Firm, Moisture < 88%, Zero Pest Damage",
      advancePercent: "35% Advance",
      farmerContributors: [
        { name: "Patil Rameshwar (You)", qty: 50, timestamp: "Today 10:15 AM", status: "Committed (Escrow Locked)" },
        { name: "Sanjay Deshmukh", qty: 120, timestamp: "Yesterday", status: "Verified" },
        { name: "Balasaheb More", qty: 110, timestamp: "2 days ago", status: "Verified" },
        { name: "Shankar Mhetre", qty: 100, timestamp: "3 days ago", status: "Verified" }
      ]
    },
    {
      id: "BULK-DEM-ONI-02",
      crop: "Red Onions (Nashik Garwa Grade A Export)",
      image: "assets/images/onion.jpg",
      buyerName: "Dubai Agro-Gulf Exporters Ltd.",
      buyerLogo: "🧅",
      buyerCategory: "International Export Consortium",
      totalRequiredQty: "1,000 Qt (1,00,000 kg)",
      totalRequiredNumber: 1000,
      currentPooledQty: 650,
      targetPricePerQt: "₹ 20.50 /kg (₹ 2,050 /Qt)",
      targetPriceNumber: 2050,
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
      id: "BULK-DEM-SOY-03",
      crop: "Yellow Soybean (Latur JS 335 / High Protein)",
      image: "assets/images/soybean.jpg?v=3",
      buyerName: "Adani Wilmar Solvent Extraction",
      buyerLogo: "🌻",
      buyerCategory: "Institutional Corporate Buyer",
      totalRequiredQty: "2,000 Qt (2,00,000 kg)",
      totalRequiredNumber: 2000,
      currentPooledQty: 1850,
      targetPricePerQt: "₹ 47.50 /kg (₹ 4,750 /Qt)",
      targetPriceNumber: 4750,
      minContribution: "50 Qt (5,000 kg)",
      deadline: "1 Day Remaining",
      destination: "Latur Industrial Solvent Extraction Complex",
      status: "Near Completion (92.5% Filled)",
      qualitySpecs: "Moisture < 10%, Oil Content > 19.5%, Foreign Matter < 1%",
      advancePercent: "35% Advance",
      farmerContributors: [
        { name: "Marathwada Farmers Syndicate (14 Farmers)", qty: 1500, timestamp: "3 days ago", status: "Verified" },
        { name: "Govind Marathe", qty: 350, timestamp: "Yesterday", status: "Verified" }
      ]
    },
    {
      id: "BULK-DEM-COT-04",
      crop: "Raw Cotton (Vidarbha Long Staple >29mm)",
      image: "assets/images/cotton.jpg?v=2",
      buyerName: "Raymond Textile Mills Consortium",
      buyerLogo: "☁️",
      buyerCategory: "Textile Mills Consortium",
      totalRequiredQty: "800 Qt (80,000 kg)",
      totalRequiredNumber: 800,
      currentPooledQty: 480,
      targetPricePerQt: "₹ 69.50 /kg (₹ 6,950 /Qt)",
      targetPriceNumber: 6950,
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
      id: "BULK-DEM-TUR-05",
      crop: "Sangli Rajapuri Turmeric Finger (GI Grade)",
      image: "assets/images/turmeric.jpg",
      buyerName: "Everest & MDH Spices Export Guild",
      buyerLogo: "✨",
      buyerCategory: "Spices FMCG Conglomerate",
      totalRequiredQty: "400 Qt (40,000 kg)",
      totalRequiredNumber: 400,
      currentPooledQty: 290,
      targetPricePerQt: "₹ 145.00 /kg (₹ 14,500 /Qt)",
      targetPriceNumber: 14500,
      minContribution: "10 Qt (1,000 kg)",
      deadline: "3 Days Remaining",
      destination: "Sangli APMC Spices Export Terminal",
      status: "Pooling Active (72.5% Filled)",
      qualitySpecs: "Curcumin > 4.5%, Deep Orange-Yellow Core, Moisture < 10%",
      advancePercent: "35% Advance",
      farmerContributors: [
        { name: "Sangli Haldi Growers (5 Farmers)", qty: 200, timestamp: "2 days ago", status: "Verified" },
        { name: "Tukaram Shinde", qty: 90, timestamp: "Yesterday", status: "Verified" }
      ]
    },
    {
      id: "BULK-DEM-RIC-06",
      crop: "Wada Kolam Rice (Palghar GI Quality)",
      image: "assets/images/rice.jpg?v=1",
      buyerName: "DMart Wholesale (Avenue Supermarts)",
      buyerLogo: "🌾",
      buyerCategory: "National Retail Chain",
      totalRequiredQty: "1,500 Qt (1,50,000 kg)",
      totalRequiredNumber: 1500,
      currentPooledQty: 1100,
      targetPricePerQt: "₹ 54.00 /kg (₹ 5,400 /Qt)",
      targetPriceNumber: 5400,
      minContribution: "25 Qt (2,500 kg)",
      deadline: "4 Days Remaining",
      destination: "Bhiwandi Central Mega Warehouse, Thane",
      status: "Pooling Active (73.3% Filled)",
      qualitySpecs: "1-Year Aged, Aromatic Short Grain, Broken Grains < 2%",
      advancePercent: "35% Advance",
      farmerContributors: [
        { name: "Palghar Kolam Union (10 Farmers)", qty: 850, timestamp: "3 days ago", status: "Verified" },
        { name: "Balaram Patil", qty: 250, timestamp: "Yesterday", status: "Verified" }
      ]
    },
    {
      id: "BULK-DEM-MAN-07",
      crop: "Ratnagiri Alphonso (Hapus) Mango Export Grade",
      image: "assets/images/mango.jpg?v=2",
      buyerName: "Kay Bee Exports International",
      buyerLogo: "🥭",
      buyerCategory: "Air-Cargo Fruit Exporters",
      totalRequiredQty: "300 Qt (30,000 kg)",
      totalRequiredNumber: 300,
      currentPooledQty: 240,
      targetPricePerQt: "₹ 195.00 /kg (₹ 19,500 /Qt)",
      targetPriceNumber: 19500,
      minContribution: "5 Qt (500 kg)",
      deadline: "2 Days Remaining",
      destination: "Mumbai Air Cargo Cold Chain Terminal",
      status: "Pooling Active (80% Filled)",
      qualitySpecs: "GI Tag Certified, 250-300g per fruit, Hot Water Treated",
      advancePercent: "35% Advance",
      farmerContributors: [
        { name: "Devgad Hapus Co-op (4 Farmers)", qty: 160, timestamp: "Yesterday", status: "Verified" },
        { name: "Anand Deshpande", qty: 80, timestamp: "Today 9:00 AM", status: "Verified" }
      ]
    },
    {
      id: "BULK-DEM-GRP-08",
      crop: "Nashik Thompson Seedless Grapes (Cold Chain)",
      image: "assets/images/grapes.jpg?v=2",
      buyerName: "Mahagrapes Co-op Export Federation",
      buyerLogo: "🍇",
      buyerCategory: "Horticulture Export Guild",
      totalRequiredQty: "600 Qt (60,000 kg)",
      totalRequiredNumber: 600,
      currentPooledQty: 420,
      targetPricePerQt: "₹ 72.00 /kg (₹ 7,200 /Qt)",
      targetPriceNumber: 7200,
      minContribution: "15 Qt (1,500 kg)",
      deadline: "3 Days Remaining",
      destination: "Pimpalgaon Baswant Pre-cooling Facility, Nashik",
      status: "Pooling Active (70% Filled)",
      qualitySpecs: "Brix > 17°, Berry Diameter 16mm+, Zero SO2 Residue",
      advancePercent: "35% Advance",
      farmerContributors: [
        { name: "Dindori Grape Growers (7 Farmers)", qty: 300, timestamp: "2 days ago", status: "Verified" },
        { name: "Sunil Wagh", qty: 120, timestamp: "Yesterday", status: "Verified" }
      ]
    },
    {
      id: "BULK-DEM-GRA-09",
      crop: "Akola Desi Chana (Bengal Gram Bold)",
      image: "assets/images/chana.jpg?v=1",
      buyerName: "Tata Sampann Pulses Division",
      buyerLogo: "🌰",
      buyerCategory: "Packaged Food Enterprise",
      totalRequiredQty: "1,200 Qt (1,20,000 kg)",
      totalRequiredNumber: 1200,
      currentPooledQty: 950,
      targetPricePerQt: "₹ 65.50 /kg (₹ 6,550 /Qt)",
      targetPriceNumber: 6550,
      minContribution: "20 Qt (2,000 kg)",
      deadline: "5 Days Remaining",
      destination: "Akola Industrial Pulses Milling Hub",
      status: "Pooling Active (79.2% Filled)",
      qualitySpecs: "Digvijay Bold Variety, Machine Cleaned, Moisture < 9%",
      advancePercent: "35% Advance",
      farmerContributors: [
        { name: "Akola Pulses FPO Club (8 Farmers)", qty: 700, timestamp: "3 days ago", status: "Verified" },
        { name: "Vijay Deshmukh", qty: 250, timestamp: "Yesterday", status: "Verified" }
      ]
    },
    {
      id: "BULK-DEM-SUN-10",
      crop: "Beed High-Oil Sunflower Seeds",
      image: "assets/images/sunflower.jpg?v=2",
      buyerName: "Fortune Sunlite Edible Oils Ltd.",
      buyerLogo: "🌻",
      buyerCategory: "Edible Oil Refining Enterprise",
      totalRequiredQty: "750 Qt (75,000 kg)",
      totalRequiredNumber: 750,
      currentPooledQty: 520,
      targetPricePerQt: "₹ 61.00 /kg (₹ 6,100 /Qt)",
      targetPriceNumber: 6100,
      minContribution: "15 Qt (1,500 kg)",
      deadline: "4 Days Remaining",
      destination: "Beed Industrial Solvent Plant, Marathwada",
      status: "Pooling Active (69.3% Filled)",
      qualitySpecs: "Oil Content > 40%, Moisture < 8%, Foreign Seeds < 1%",
      advancePercent: "35% Advance",
      farmerContributors: [
        { name: "Beed Oilseed Syndicate (6 Farmers)", qty: 380, timestamp: "2 days ago", status: "Verified" },
        { name: "Dnyaneshwar Tate", qty: 140, timestamp: "Yesterday", status: "Verified" }
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
      contractValue: "₹ 16,40,000",
      settlementStatus: "100% Escrow Released to Farmers",
      dispatchDate: "04 Sep 2026",
      transportAgent: "MahaTrans Logistics (MH-15-AX-8910)"
    },
    {
      id: "FPO-DISP-841",
      crop: "Wada Kolam Rice (Palghar GI)",
      buyer: "Avenue Supermarts (DMart Wholesale)",
      totalQty: "1,200 Qt (Pooled from 28 Farmers)",
      contractValue: "₹ 64,80,000",
      settlementStatus: "100% Escrow Released to Farmers",
      dispatchDate: "22 Aug 2026",
      transportAgent: "Konkan Agro Express (MH-04-BZ-4411)"
    },
    {
      id: "FPO-DISP-799",
      crop: "Yellow Soybean (Latur JS 335)",
      buyer: "Adani Wilmar Solvent Extraction",
      totalQty: "1,500 Qt (Pooled from 35 Farmers)",
      contractValue: "₹ 71,25,000",
      settlementStatus: "100% Escrow Released to Farmers",
      dispatchDate: "15 Aug 2026",
      transportAgent: "Marathwada Fast Freight (MH-24-CC-1902)"
    }
  ],

  // Governance & Member Board
  boardMembers: [
    { name: "Patil Rameshwar", role: "President & Managing Director", village: "Lasalgaon, Nashik", phone: "+91 98220 44911", term: "2023 - 2028" },
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
      if (stored) data = JSON.parse(stored);
    } catch(e) {}
    return data || FPO_COOPERATIVE_DATA.bulkDemands;
  }

  static saveBulkDemands(demands) {
    localStorage.setItem("agrinex_fpo_bulk_demands", JSON.stringify(demands));
  }

  static contributeToPool(demandId, qtyQt, farmerName = "Patil Rameshwar") {
    const demands = this.getBulkDemands();
    const item = demands.find(d => d.id === demandId);
    if (!item) return { success: false, message: "Pool contract not found" };

    const qty = parseInt(qtyQt);
    if (isNaN(qty) || qty <= 0) return { success: false, message: "Invalid quantity entered" };

    const remaining = item.totalRequiredNumber - item.currentPooledQty;
    if (qty > remaining) {
      return { success: false, message: `Exceeds max required quota. Only ${remaining} Qt remaining.` };
    }

    item.currentPooledQty += qty;
    item.farmerContributors.unshift({
      name: farmerName,
      qty: qty,
      timestamp: "Just Now",
      status: "Committed (Escrow Locked)"
    });

    const percent = Math.round((item.currentPooledQty / item.totalRequiredNumber) * 100);
    item.status = percent >= 100 ? "Pool Fulfilled (100%)" : `Pooling Active (${percent}% Filled)`;

    this.saveBulkDemands(demands);
    return { success: true, message: `Successfully committed ${qty} Qt to ${item.crop} FPO pool!` };
  }
}
