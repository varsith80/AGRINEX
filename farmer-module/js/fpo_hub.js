/**
 * AgriNex FPO Hub (Farmer Producer Organization) Data Store & Aggregation Engine
 * Enables individual smallholders to pool lot volumes together to fulfill massive enterprise buyer bulk orders
 */

const FPO_COOPERATIVE_DATA = {
  fpoProfile: {
    fpoName: "Kongu Farmers Producer Co. (KFPC)",
    fpoId: "FPO-TN-ERODE-09",
    regNo: "FPO/TN/2023/8892",
    totalMemberFarmers: 340,
    activePoolsCount: 3,
    location: "Erode Central Hub, Tamil Nadu",
    president: "R. Shanmugam",
    fpoWalletLocked: "₹ 48,50,000"
  },
  
  // High-Volume Enterprise Bulk Orders Open for Farmer Pooling
  bulkDemands: [
    {
      id: "BULK-DEM-TOM-01",
      crop: "Tomato (Shimla Red / Processing Grade)",
      buyerName: "Kissan & Nestle India Procurements",
      buyerLogo: "🍅",
      totalRequiredQty: "500 Qt",
      totalRequiredNumber: 500,
      currentPooledQty: 380,
      targetPricePerQt: "₹ 1,350 /Qt",
      targetPriceNumber: 1350,
      minContribution: "10 Qt",
      deadline: "2 Days Remaining",
      destination: "Nestle SIPCOT Agro Park, Tirupur",
      status: "Pooling Active (76% Filled)",
      farmerContributors: [
        { name: "Ramesh Kumar (You)", qty: 50, timestamp: "Today 10:15 AM", status: "Committed (Escrow Locked)" },
        { name: "K. Subramaniam", qty: 120, timestamp: "Yesterday", status: "Verified" },
        { name: "S. Murugan", qty: 110, timestamp: "2 days ago", status: "Verified" },
        { name: "P. Rangarajan", qty: 100, timestamp: "3 days ago", status: "Verified" }
      ]
    },
    {
      id: "BULK-DEM-ONI-02",
      crop: "Red Onions (Export Quality Grade A)",
      buyerName: "Dubai Agro-Gulf Exporters Ltd.",
      buyerLogo: "🧅",
      totalRequiredQty: "1,000 Qt",
      totalRequiredNumber: 1000,
      currentPooledQty: 650,
      targetPricePerQt: "₹ 1,100 /Qt",
      targetPriceNumber: 1100,
      minContribution: "20 Qt",
      deadline: "4 Days Remaining",
      destination: "Tuticorin Port Cold Terminal",
      status: "Pooling Active (65% Filled)",
      farmerContributors: [
        { name: "M. Velusamy", qty: 250, timestamp: "Yesterday", status: "Verified" },
        { name: "Dindigul Onion Club (6 Farmers)", qty: 400, timestamp: "2 days ago", status: "Verified" }
      ]
    },
    {
      id: "BULK-DEM-PAD-03",
      crop: "Paddy / Rice (Sona Masoori A-Grade)",
      buyerName: "ITC Agri-Business Division",
      buyerLogo: "🌾",
      totalRequiredQty: "2,000 Qt",
      totalRequiredNumber: 2000,
      currentPooledQty: 1850,
      targetPricePerQt: "₹ 2,150 /Qt",
      targetPriceNumber: 2150,
      minContribution: "50 Qt",
      deadline: "1 Day Remaining",
      destination: "ITC Rice Mill Hub, Salem",
      status: "Near Completion (92.5% Filled)",
      farmerContributors: [
        { name: "Thanjavur Delta Syndicate (14 Farmers)", qty: 1500, timestamp: "3 days ago", status: "Verified" },
        { name: "C. Ganesan", qty: 350, timestamp: "Yesterday", status: "Verified" }
      ]
    }
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
}

window.FPO_COOPERATIVE_DATA = FPO_COOPERATIVE_DATA;
window.AgriNexFPOHub = AgriNexFPOHub;
