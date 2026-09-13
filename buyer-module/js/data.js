/**
 * AgriNex Buyer & Mill Procurement Module Data
 */

const buyerData = {
  profile: {
    name: "Suresh Singhania",
    company: "AgriFoods Ltd.",
    role: "Head of Procurement",
    location: "Coimbatore Hub, TN",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
  },
  stats: {
    activeOrders: "8 Lots",
    activeBids: "5 Bids",
    inboundShipments: "2 In-Transit",
    escrowLocked: "₹ 18,45,000"
  },
  marketplaceLots: [
    {
      id: "LOT-TOM-01",
      crop: "Tomato (Shimla Red)",
      image: "../farmer-module/assets/images/tomato.jpg",
      farmerName: "Ramesh Kumar",
      mandi: "Erode Yard, TN",
      grade: "Grade A",
      gradeBadge: "badge-grade-a",
      quantity: "50 Qt",
      floorPrice: "₹ 1,200 /Qt",
      highestBid: "₹ 1,250 /Qt",
      myBidStatus: "Winning (AgriFoods Ltd.)",
      status: "Bidding Open",
      statusBadge: "badge-status-open"
    },
    {
      id: "LOT-ONI-02",
      crop: "Red Onion (Nashik Quality)",
      image: "../farmer-module/assets/images/onion.jpg",
      farmerName: "Murugan Selvam",
      mandi: "Dindigul Mandi, TN",
      grade: "Grade B",
      gradeBadge: "badge-grade-b",
      quantity: "30 Qt",
      floorPrice: "₹ 900 /Qt",
      highestBid: "₹ 950 /Qt",
      myBidStatus: "Outbid (Global Grains)",
      status: "Negotiation",
      statusBadge: "badge-status-negotiation"
    },
    {
      id: "LOT-PAD-03",
      crop: "Paddy (Sona Masoori)",
      image: "../farmer-module/assets/images/paddy.jpg",
      farmerName: "P. Rangarajan",
      mandi: "Thanjavur Mandi, TN",
      grade: "Grade A",
      gradeBadge: "badge-grade-a",
      quantity: "100 Qt",
      floorPrice: "₹ 2,000 /Qt",
      highestBid: "₹ 2,050 /Qt",
      myBidStatus: "Order Dispatched",
      status: "Dispatched",
      statusBadge: "badge-status-dispatched"
    },
    {
      id: "LOT-COT-04",
      crop: "Cotton (Long Staple)",
      image: "../farmer-module/assets/images/cotton.jpg",
      farmerName: "Velusamy K.",
      mandi: "Tiruppur Yard, TN",
      grade: "Grade A",
      gradeBadge: "badge-grade-a",
      quantity: "80 Qt",
      floorPrice: "₹ 5,750 /Qt",
      highestBid: "₹ 5,820 /Qt",
      myBidStatus: "Placed ₹ 5,800",
      status: "Bidding Open",
      statusBadge: "badge-status-open"
    }
  ]
};
