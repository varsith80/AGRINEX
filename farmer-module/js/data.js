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
    totalLots: 3,
    activeListingsSubtitle: "Active listings",
    activeBids: 2,
    buyersSubtitle: "Buyers interested",
    pendingShipments: 1,
    shipmentSubtitle: "In transit",
    estimatedProfit: "₹ 18,450",
    profitSubtitle: "(After transport & charges)"
  },
  listings: [
    {
      id: "LOT-TOM-01",
      crop: "Tomato",
      image: "assets/images/tomato.jpg",
      grade: "Grade A",
      gradeBadgeClass: "badge-grade-a",
      quantity: "50 Qt",
      expectedPrice: "₹ 1,200 /Qt",
      bestBid: "₹ 1,250 /Qt",
      buyerName: "AgriFoods Ltd.",
      status: "Bids Open",
      statusBadgeClass: "badge-status-open"
    },
    {
      id: "LOT-ONI-02",
      crop: "Onion",
      image: "assets/images/onion.jpg",
      grade: "Grade B",
      gradeBadgeClass: "badge-grade-b",
      quantity: "30 Qt",
      expectedPrice: "₹ 900 /Qt",
      bestBid: "₹ 950 /Qt",
      buyerName: "Global Grains",
      status: "Negotiation",
      statusBadgeClass: "badge-status-negotiation"
    },
    {
      id: "LOT-PAD-03",
      crop: "Paddy",
      image: "assets/images/paddy.jpg",
      grade: "Grade A",
      gradeBadgeClass: "badge-grade-a",
      quantity: "100 Qt",
      expectedPrice: "₹ 2,000 /Qt",
      bestBid: "₹ 2,050 /Qt",
      buyerName: "Fresh Mart",
      status: "Dispatched",
      statusBadgeClass: "badge-status-dispatched"
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
