/**
 * AgriNex - Farmer Module Enterprise Data Store
 */

const farmerData = {
  "profile": {
    "name": "Perumal",
    "role": "Progressive Farmer & FPO Director",
    "location": "Lasalgaon APMC Yard, Nashik, Maharashtra",
    "latitude": 20.1472,
    "longitude": 74.2255,
    "coordinates": [
      20.1472,
      74.2255
    ],
    "calculationMethod": "Haversine Spherical Geodesic (Latitude & Longitude Coordinates)",
    "avatar": "assets/images/farmer-avatar.jpg",
    "notificationsCount": 5,
    "messagesCount": 3
  },
  "stats": {
    "totalLots": 5,
    "activeListingsSubtitle": "Active verified listings",
    "activeBids": 5,
    "buyersSubtitle": "Buyers interested across Maharashtra",
    "pendingShipments": 2,
    "shipmentSubtitle": "In transit to Vashi & Pune APMC",
    "estimatedProfit": "₹ 15,20,000",
    "profitSubtitle": "(Expected gross value)"
  },
  "listings": [
    {
      "id": "LOT-TOM-02",
      "crop": "Tomato (Shivam / Abhinav Hybrid)",
      "category": "Vegetables",
      "shelfLife": "4 Days (Perishable)",
      "harvestDate": "11 Sep 2026",
      "image": "assets/images/tomato.jpg?v=2",
      "grade": "Grade A",
      "gradeBadgeClass": "badge-grade-a",
      "quantity": "60 Qt (6,000 kg)",
      "quantityNumber": 60,
      "expectedPrice": "₹ 13.00 /kg (₹ 1,300 /Qt)",
      "expectedPriceNumber": 1300,
      "bestBid": "₹ 13.91 /kg (₹ 1,391 /Qt)",
      "bestBidNumber": 1391,
      "buyerName": "Reliance Fresh Supply Chain",
      "status": "Negotiation",
      "statusBadgeClass": "badge-status-negotiation",
      "location": "Narayangaon Mandi Yard, Junnar, Pune"
    },
    {
      "id": "LOT-SOY-04",
      "crop": "Yellow Soybean (JS 335 / High Protein)",
      "category": "Grains & Cereals",
      "shelfLife": "180 Days",
      "harvestDate": "13 Sep 2026",
      "image": "assets/images/soybean.jpg?v=3",
      "grade": "Grade A",
      "gradeBadgeClass": "badge-grade-a",
      "quantity": "150 Qt (15,000 kg)",
      "quantityNumber": 150,
      "expectedPrice": "₹ 42.00 /kg (₹ 4,200 /Qt)",
      "expectedPriceNumber": 4200,
      "bestBid": "₹ 46.62 /kg (₹ 4,662 /Qt)",
      "bestBidNumber": 4662,
      "buyerName": "DMart Wholesale (Avenue Supermarts)",
      "status": "Dispatched",
      "statusBadgeClass": "badge-status-dispatched",
      "location": "Latur Mega APMC Yard, Marathwada"
    },
    {
      "id": "LOT-POM-07",
      "crop": "Bhagwa Pomegranate (Solapur Export Grade)",
      "category": "Fruits",
      "shelfLife": "20 Days",
      "harvestDate": "11 Sep 2026",
      "image": "assets/images/pomegranate.jpg?v=2",
      "grade": "Grade A (250g+ Calibrated)",
      "gradeBadgeClass": "badge-grade-a",
      "quantity": "40 Qt (4,000 kg)",
      "quantityNumber": 40,
      "expectedPrice": "₹ 88.00 /kg (₹ 8,800 /Qt)",
      "expectedPriceNumber": 8800,
      "bestBid": "₹ 95.92 /kg (₹ 9,592 /Qt)",
      "bestBidNumber": 9592,
      "buyerName": "LuLu Hypermarket Gulf Supply",
      "status": "Negotiation",
      "statusBadgeClass": "badge-status-negotiation",
      "location": "Pandharpur Yard, Solapur"
    },
    {
      "id": "LOT-RIC-09",
      "crop": "Wada Kolam Rice (Palghar GI Quality)",
      "category": "Grains & Cereals",
      "shelfLife": "180 Days",
      "harvestDate": "13 Sep 2026",
      "image": "assets/images/rice.jpg?v=1",
      "grade": "Grade A Aged Aromatic",
      "gradeBadgeClass": "badge-grade-a",
      "quantity": "120 Qt (12,000 kg)",
      "quantityNumber": 120,
      "expectedPrice": "₹ 48.00 /kg (₹ 4,800 /Qt)",
      "expectedPriceNumber": 4800,
      "bestBid": "₹ 50.40 /kg (₹ 5,040 /Qt)",
      "bestBidNumber": 5040,
      "buyerName": "ITC Agri-Business Division",
      "status": "Dispatched",
      "statusBadgeClass": "badge-status-dispatched",
      "location": "Wada APMC Yard, Palghar"
    },
    {
      "id": "LOT-WHT-12",
      "crop": "Sharbati Lokwan Golden Wheat",
      "category": "Grains & Cereals",
      "shelfLife": "180 Days",
      "harvestDate": "11 Sep 2026",
      "image": "assets/images/wheat.jpg?v=1",
      "grade": "Grade A+ Luster Golden",
      "gradeBadgeClass": "badge-grade-a",
      "quantity": "200 Qt (20,000 kg)",
      "quantityNumber": 200,
      "expectedPrice": "₹ 28.50 /kg (₹ 2,850 /Qt)",
      "expectedPriceNumber": 2850,
      "bestBid": "₹ 31.64 /kg (₹ 3,164 /Qt)",
      "bestBidNumber": 3164,
      "buyerName": "Reliance Fresh Supply Chain",
      "status": "Negotiation",
      "statusBadgeClass": "badge-status-negotiation",
      "location": "Niphad APMC Hub, Nashik"
    }
  ],
  "mandiPrices": [
    {
      "crop": "Red Onion (Nashik)",
      "currentPrice": "₹ 18.00 /kg (₹ 1,800 /Qt)",
      "trendPercent": "+6.2%",
      "direction": "up",
      "trendPoints": [
        20,
        16,
        18,
        12,
        14,
        8,
        4
      ]
    },
    {
      "crop": "Tomato (Narayangaon)",
      "currentPrice": "₹ 13.00 /kg (₹ 1,300 /Qt)",
      "trendPercent": "+4.8%",
      "direction": "up",
      "trendPoints": [
        22,
        19,
        16,
        14,
        11,
        7,
        5
      ]
    },
    {
      "crop": "Yellow Soybean (Latur)",
      "currentPrice": "₹ 42.00 /kg (₹ 4,200 /Qt)",
      "trendPercent": "+3.5%",
      "direction": "up",
      "trendPoints": [
        18,
        17,
        19,
        15,
        12,
        9,
        7
      ]
    },
    {
      "crop": "Raw Cotton (Amravati)",
      "currentPrice": "₹ 62.00 /kg (₹ 6,200 /Qt)",
      "trendPercent": "-1.2%",
      "direction": "down",
      "trendPoints": [
        5,
        8,
        12,
        9,
        14,
        18,
        22
      ]
    },
    {
      "crop": "Sangli Rajapuri Turmeric",
      "currentPrice": "₹ 135.00 /kg (₹ 13,500 /Qt)",
      "trendPercent": "+7.4%",
      "direction": "up",
      "trendPoints": [
        12,
        15,
        18,
        20,
        24,
        28,
        32
      ]
    },
    {
      "crop": "Alphonso Mango (Ratnagiri)",
      "currentPrice": "₹ 180.00 /kg (₹ 18,000 /Qt)",
      "trendPercent": "+9.1%",
      "direction": "up",
      "trendPoints": [
        8,
        12,
        16,
        21,
        25,
        29,
        35
      ]
    }
  ],
  "forecast": {
    "crop": "Red Onion (Nashik Garwa)",
    "image": "assets/images/onion.jpg",
    "timeframe": "Next 7 days",
    "percentage": "+8.5% *",
    "subtext": "(Expected)",
    "description": "Market trend is positive. Prices expected to rise across Lasalgaon & Vashi APMC mandis due to strong export demand."
  },
  "shipmentTracking": {
    "orderId": "#AG12345",
    "crop": "Red Onion",
    "quantity": "100 Qt",
    "image": "assets/images/onion.jpg",
    "status": "In Transit to Vashi Terminal"
  }
};

if (typeof window !== 'undefined') window.farmerData = farmerData;
if (typeof module !== 'undefined') module.exports = farmerData;
