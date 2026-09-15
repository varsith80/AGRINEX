/**
 * AgriNex - Emergency Sale & Salvage Procurement Data Store
 * Coordinates between Farmer lots facing expiry/no-bids and Emergency Institutional Buyers
 */

const EMERGENCY_BUYER_POOL = [
  {
    id: "EMG_BUYER_01",
    name: "Sri Balaji Food Processing & Purees",
    type: "Food Processing Unit",
    typeBadge: "buyer-type-processing",
    icon: "🥫",


    location: "Narayangaon Food Park, Junnar, Pune",
    acceptedCrops: ["Tomato", "Onion", "Mango", "Pomegranate"],
    autoBidRatio: 0.75, // 75% of farmer floor to ensure breakeven recovery

 (Resolve all merge conflicts cleanly and harmonize logistics and admin endpoints)
    rating: "4.9 ★",
    paymentTime: "Instant 1-Hour Escrow"
  },
  {
    id: "EMG_BUYER_02",
    name: "Annapoorna Institutional Catering Network",
    type: "Commercial Caterers",
    typeBadge: "buyer-type-caterer",
    icon: "🍲",


    location: "Pimpri-Chinchwad Agro Hub, Pune",
    acceptedCrops: ["Tomato", "Onion", "Potato", "Rice", "Vegetables"],
    autoBidRatio: 0.78, // 78% breakeven recovery

 (Resolve all merge conflicts cleanly and harmonize logistics and admin endpoints)
    rating: "4.8 ★",
    paymentTime: "Instant 30-Min Escrow"
  },
  {
    id: "EMG_BUYER_03",
    name: "GreenEarth Organic Bio-Compost & Fertilizer Corp",
    type: "Compost & Bio-Energy Manufacturer",
    typeBadge: "buyer-type-compost",
    icon: "🌱",


    location: "Nashik Bio-Energy Industrial Park",
    acceptedCrops: ["Tomato", "Onion", "Rice", "Cotton", "Vegetables", "All Perishables"],
    autoBidRatio: 0.68, // 68% breakeven baseline

 (Resolve all merge conflicts cleanly and harmonize logistics and admin endpoints)
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

    // Parse floor price number (e.g., "₹ 1,200 /Qt" -> 1200)
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
      lot.buyerName = `${bestOffer.buyerName} (${bestOffer.buyerType})`;
    }

    // Persist in global emergency pool for buyers to see
    const allEmergency = this.getEmergencyLots();
    const existingIdx = allEmergency.findIndex(item => item.id === lot.id);
    if (existingIdx >= 0) {
      allEmergency[existingIdx] = lot;
    } else {
      allEmergency.unshift(lot);
    }
    this.saveEmergencyLots(allEmergency);

    return {
      lot,
      bestOffer,
      offersCount: emergencyOffers.length
    };
  }

  /**
   * Complete instant emergency salvage sale
   */
  static acceptEmergencyOffer(lotId, buyerId, farmerListings) {
    const lot = farmerListings.find(l => l.id === lotId);
    if (!lot || !lot.emergencyOffers) return null;

    const offer = lot.emergencyOffers.find(o => o.buyerId === buyerId) || lot.emergencyOffers[0];
    lot.status = "✅ Emergency Sold (Breakeven Cleared)";
    lot.statusBadgeClass = "badge-status-sold";
    lot.soldTo = offer;
    lot.bestBid = offer.offerPriceFormatted;
    lot.buyerName = offer.buyerName;

    // Remove from active emergency pool or mark sold
    const allEmergency = this.getEmergencyLots();
    const existingIdx = allEmergency.findIndex(item => item.id === lot.id);
    if (existingIdx >= 0) {
      allEmergency[existingIdx].status = lot.status;
      allEmergency[existingIdx].isSold = true;
    }
    this.saveEmergencyLots(allEmergency);

    return { lot, offer };
  }
}

window.EMERGENCY_BUYER_POOL = EMERGENCY_BUYER_POOL;
window.AgriNexEmergencySale = AgriNexEmergencySale;
