/**
 * AgriNex - Emergency Sale & Salvage Procurement Data Store
 * Coordinates between Farmer lots facing expiry/no-bids and Emergency Institutional Buyers in Maharashtra
 */

const EMERGENCY_BUYER_POOL = [
  {
    id: "EMG_BUYER_01",
    name: "Sahyadri Food Processing & Purees",
    type: "Food Processing Unit",
    typeBadge: "buyer-type-processing",
    icon: "🥫",
    location: "Narayangaon Food Park, Junnar, Pune",
    acceptedCrops: ["Tomato", "Onion", "Mango", "Pomegranate"],
    autoBidRatio: 0.75, // 75% of farmer floor to ensure breakeven recovery
    rating: "4.9 ★",
    paymentTime: "Instant 1-Hour Escrow"
  },
  {
    id: "EMG_BUYER_02",
    name: "Annapoorna Commercial Catering Network",
    type: "Commercial Caterers",
    typeBadge: "buyer-type-caterer",
    icon: "🍲",
    location: "Pimpri-Chinchwad Agro Hub, Pune",
    acceptedCrops: ["Tomato", "Onion", "Potato", "Rice", "Vegetables"],
    autoBidRatio: 0.78, // 78% breakeven recovery
    rating: "4.8 ★",
    paymentTime: "Instant 30-Min Escrow"
  },
  {
    id: "EMG_BUYER_03",
    name: "MahaBio Organic Compost & Energy Corp",
    type: "Compost & Bio-Energy Manufacturer",
    typeBadge: "buyer-type-compost",
    icon: "🌱",
    location: "Nashik Bio-Energy Industrial Park",
    acceptedCrops: ["Tomato", "Onion", "Rice", "Cotton", "Vegetables", "All Perishables"],
    autoBidRatio: 0.68, // 68% breakeven baseline
    rating: "5.0 ★",
    paymentTime: "Instant Mandi Clearance"
  }
];

class AgriNexEmergencySale {
  static getEmergencyLots() {
    let stored = [];
    try {
      const data = localStorage.getItem("agrinex_emergency_lots");
      if (data) stored = JSON.parse(data);
    } catch(e) {
      console.error(e);
    }
    return stored;
  }

  static saveEmergencyLots(lots) {
    localStorage.setItem("agrinex_emergency_lots", JSON.stringify(lots));
  }

  /**
   * Activate Emergency Sale for a specific lot
   */
  static triggerEmergencySale(lotId, farmerListings) {
    const lot = farmerListings.find(l => l.id === lotId);
    if (!lot) return null;

    // Parse floor price number (e.g., "₹ 1,800 /Qt" -> 1800)
    const basePrice = parseInt(lot.expectedPrice.replace(/[^0-9]/g, "")) || 1000;
    
    // Find matching emergency buyers
    const matchingBuyers = EMERGENCY_BUYER_POOL.filter(b => 
      b.acceptedCrops.some(c => lot.crop.toLowerCase().includes(c.toLowerCase())) || b.acceptedCrops.includes("All Perishables")
    );

    // Generate immediate emergency salvage offers ensuring breakeven
    const emergencyOffers = matchingBuyers.map(b => {
      const offerPrice = Math.round(basePrice * b.autoBidRatio);
      return {
        buyerId: b.id,
        buyerName: b.name,
        buyerType: b.type,
        icon: b.icon,
        location: b.location,
        offerPricePerQt: offerPrice,
        offerPriceFormatted: `₹ ${offerPrice.toLocaleString('en-IN')} /Qt`,
        status: "Active Offer",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    });

    const bestOffer = emergencyOffers.sort((a, b) => b.offerPricePerQt - a.offerPricePerQt)[0];

    // Update lot state
    lot.isEmergencySale = true;
    lot.emergencyActivatedAt = new Date().toISOString();
    lot.emergencyOffers = emergencyOffers;
    lot.status = "🚨 Emergency Sale Active";
    lot.statusBadgeClass = "badge-status-emergency";
    if (bestOffer) {
      lot.bestBid = bestOffer.offerPriceFormatted;
      lot.bestBidNumber = bestOffer.offerPricePerQt;
      lot.buyerName = bestOffer.buyerName;
    }

    const emergencyLots = this.getEmergencyLots();
    const existingIdx = emergencyLots.findIndex(l => l.id === lotId);
    if (existingIdx >= 0) {
      emergencyLots[existingIdx] = lot;
    } else {
      emergencyLots.push(lot);
    }
    this.saveEmergencyLots(emergencyLots);

    return { lot, bestOffer, matchingBuyersCount: emergencyOffers.length };
  }
}
