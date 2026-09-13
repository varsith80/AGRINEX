/**
 * AgriNex - Farmer Module Enterprise Data Store
 */

const farmerData = {
  profile: {
    name: "Ramesh Kumar",
    role: "Farmer",
    location: "Erode, Tamil Nadu",
    avatar: "assets/images/farmer-avatar.jpg",
    notificationsCount: 2,
    messagesCount: 1
  },
  stats: {
    totalLots: 6,
    activeListingsSubtitle: "Active listings",
    activeBids: 5,
    buyersSubtitle: "Buyers interested",
    pendingShipments: 1,
    shipmentSubtitle: "In transit",
    estimatedProfit: "₹ 7,42,500",
    profitSubtitle: "(Expected gross value)"
  },
  listings: [
    {
      id: "LOT-TOM-01",
      crop: "Tomato (Shivam Hybrid)",
      category: "Vegetables",
      shelfLife: "3 Days (Perishable)",
      harvestDate: "12 Sep 2026",
      image: "assets/images/tomato.jpg",
      grade: "Grade A",
      gradeBadgeClass: "badge-grade-a",
      quantity: "50 Qt",
      quantityNumber: 50,
      expectedPrice: "₹ 1,200 /Qt",
      expectedPriceNumber: 1200,
      bestBid: "₹ 1,250 /Qt",
      bestBidNumber: 1250,
      buyerName: "AgriFoods Ltd.",
      status: "Bids Open",
      statusBadgeClass: "badge-status-open",
      location: "Erode Mandi Yard, TN"
    },
    {
      id: "LOT-ONI-02",
      crop: "Red Onion (Nashik Quality)",
      category: "Vegetables",
      shelfLife: "25 Days",
      harvestDate: "10 Sep 2026",
      image: "assets/images/onion.jpg",
      grade: "Grade B",
      gradeBadgeClass: "badge-grade-b",
      quantity: "30 Qt",
      quantityNumber: 30,
      expectedPrice: "₹ 900 /Qt",
      expectedPriceNumber: 900,
      bestBid: "₹ 950 /Qt",
      bestBidNumber: 950,
      buyerName: "Global Grains",
      status: "Negotiation",
      statusBadgeClass: "badge-status-negotiation",
      location: "Erode Mandi Yard, TN"
    },
    {
      id: "LOT-PAD-03",
      crop: "Paddy (1121 Basmati)",
      category: "Grains",
      shelfLife: "180 Days",
      harvestDate: "05 Sep 2026",
      image: "assets/images/paddy.jpg",
      grade: "Grade A",
      gradeBadgeClass: "badge-grade-a",
      quantity: "100 Qt",
      quantityNumber: 100,
      expectedPrice: "₹ 2,000 /Qt",
      expectedPriceNumber: 2000,
      bestBid: "₹ 2,050 /Qt",
      bestBidNumber: 2050,
      buyerName: "Fresh Mart",
      status: "Dispatched",
      statusBadgeClass: "badge-status-dispatched",
      location: "Erode Central Warehouse, TN"
    },
    {
      id: "LOT-CHL-04",
      crop: "Green Chilli (G4 Spicy)",
      category: "Spices",
      shelfLife: "5 Days (Perishable)",
      harvestDate: "11 Sep 2026",
      image: "assets/images/chilli.jpg",
      grade: "Grade A",
      gradeBadgeClass: "badge-grade-a",
      quantity: "25 Qt",
      quantityNumber: 25,
      expectedPrice: "₹ 3,200 /Qt",
      expectedPriceNumber: 3200,
      bestBid: "₹ 3,350 /Qt",
      bestBidNumber: 3350,
      buyerName: "Spices Exim Hub",
      status: "Bids Open",
      statusBadgeClass: "badge-status-open",
      location: "Gobi Mandi, TN"
    },
    {
      id: "LOT-COT-05",
      crop: "Raw Cotton (MCU-5 Long Staple)",
      category: "Cash Crops",
      shelfLife: "365 Days",
      harvestDate: "01 Sep 2026",
      image: "assets/images/cotton.jpg",
      grade: "Grade A",
      gradeBadgeClass: "badge-grade-a",
      quantity: "80 Qt",
      quantityNumber: 80,
      expectedPrice: "₹ 5,800 /Qt",
      expectedPriceNumber: 5800,
      bestBid: "₹ 5,920 /Qt",
      bestBidNumber: 5920,
      buyerName: "Coimbatore Spinning Mills",
      status: "Negotiation",
      statusBadgeClass: "badge-status-negotiation",
      location: "Sathy Mandi, TN"
    },
    {
      id: "LOT-OKR-06",
      crop: "Fresh Okra (Ladyfinger)",
      category: "Vegetables",
      shelfLife: "2 Days (Perishable)",
      harvestDate: "13 Sep 2026",
      image: "assets/images/okra.jpg",
      grade: "Grade B",
      gradeBadgeClass: "badge-grade-b",
      quantity: "20 Qt",
      quantityNumber: 20,
      expectedPrice: "₹ 1,600 /Qt",
      expectedPriceNumber: 1600,
      bestBid: "₹ 1,620 /Qt",
      bestBidNumber: 1620,
      buyerName: "Annapoorna Caterers",
      status: "Bids Open",
      statusBadgeClass: "badge-status-open",
      location: "Erode Mandi Yard, TN"
    }
  ],
  mandiPrices: [
    {
      crop: "Tomato",
      currentPrice: "₹ 1,150",
      trendPercent: "+6.2%",
      direction: "up",
      trendPoints: [20, 16, 18, 12, 14, 8, 4]
    },
    {
      crop: "Onion",
      currentPrice: "₹ 900",
      trendPercent: "+4.8%",
      direction: "up",
      trendPoints: [22, 19, 16, 14, 11, 7, 5]
    },
    {
      crop: "Paddy",
      currentPrice: "₹ 2,000",
      trendPercent: "+3.5%",
      direction: "up",
      trendPoints: [18, 17, 19, 15, 12, 9, 7]
    },
    {
      crop: "Cotton",
      currentPrice: "₹ 5,800",
      trendPercent: "-1.2%",
      direction: "down",
      trendPoints: [5, 8, 12, 9, 14, 18, 22]
    }
  ],
  forecast: {
    crop: "Tomato",
    image: "assets/images/tomato.jpg",
    timeframe: "Next 7 days",
    percentage: "+8.5% *",
    subtext: "(Expected)",
    description: "Market trend is positive. Prices are expected to rise in the next 7 days."
  },
  shipmentTracking: {
    orderId: "#AG12345",
    crop: "Tomato",
    quantity: "50 Qt",
    image: "assets/images/tomato.jpg",
    status: "In Transit"
  }
};
