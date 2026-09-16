const fs = require('fs');
const path = require('path');

// 1. New backend crop objects
const newBackendCrops = [
  {
    id: "LOT-POT-29",
    farmer_name: "Patil Rameshwar",
    crop: "Potato (Jyoti / Chandramukhi Grade A)",
    variety: "Grade A Cold Storage Ready",
    category: "Vegetables",
    shelf_life: "45 Days",
    quantity_qt: 120,
    quantity_kg: 12000,
    quantity: "120 Qt (12,000 kg)",
    quantityNumber: 120,
    price_per_qt: 1600,
    price_per_kg: 16.00,
    expectedPrice: "₹ 16.00 /kg (₹ 1,600 /Qt)",
    expectedPriceNumber: 1600,
    bestBid: "₹ 16.80 /kg (₹ 1,680 /Qt)",
    bestBidNumber: 1680,
    buyerName: "McCain Foods Procurement",
    state: "Maharashtra",
    district: "Pune",
    mandi: "Manchar APMC Yard",
    grade: "Grade A Cold Storage Ready",
    gradeBadgeClass: "badge-grade-a",
    image: "assets/images/potato.jpg",
    status: "Active (Bids Open)",
    statusBadgeClass: "badge-status-open",
    created_at: new Date().toISOString()
  },
  {
    id: "LOT-BRN-30",
    farmer_name: "Patil Rameshwar",
    crop: "Brinjal (Manchar Purple Long / Baingan)",
    variety: "Grade A Fresh Picked",
    category: "Vegetables",
    shelf_life: "5 Days (Perishable)",
    quantity_qt: 50,
    quantity_kg: 5000,
    quantity: "50 Qt (5,000 kg)",
    quantityNumber: 50,
    price_per_qt: 2200,
    price_per_kg: 22.00,
    expectedPrice: "₹ 22.00 /kg (₹ 2,200 /Qt)",
    expectedPriceNumber: 2200,
    bestBid: "₹ 23.10 /kg (₹ 2,310 /Qt)",
    bestBidNumber: 2310,
    buyerName: "FreshToHome Produce",
    state: "Maharashtra",
    district: "Ahmednagar",
    mandi: "Rahuri APMC Market",
    grade: "Grade A Fresh Picked",
    gradeBadgeClass: "badge-grade-a",
    image: "assets/images/brinjal.jpg",
    status: "Active (Bids Open)",
    statusBadgeClass: "badge-status-open",
    created_at: new Date().toISOString()
  },
  {
    id: "LOT-GCH-31",
    farmer_name: "Patil Rameshwar",
    crop: "Green Chilli (G4 High-Pungency Fresh)",
    variety: "Grade A Export Calibrated",
    category: "Vegetables",
    shelf_life: "8 Days",
    quantity_qt: 40,
    quantity_kg: 4000,
    quantity: "40 Qt (4,000 kg)",
    quantityNumber: 40,
    price_per_qt: 4200,
    price_per_kg: 42.00,
    expectedPrice: "₹ 42.00 /kg (₹ 4,200 /Qt)",
    expectedPriceNumber: 4200,
    bestBid: "₹ 44.50 /kg (₹ 4,450 /Qt)",
    bestBidNumber: 4450,
    buyerName: "Everest Spices Direct Sourcing",
    state: "Maharashtra",
    district: "Nandurbar",
    mandi: "Nandurbar APMC Yard",
    grade: "Grade A Export Calibrated",
    gradeBadgeClass: "badge-grade-a",
    image: "assets/images/green_chilli.jpg",
    status: "Active (Bids Open)",
    statusBadgeClass: "badge-status-open",
    created_at: new Date().toISOString()
  }
];

// Update backend/data.json
const dbPath = path.resolve(__dirname, '..', 'backend', 'data.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

if (!db.crops) db.crops = [];
for (const crop of newBackendCrops) {
  const existingIdx = db.crops.findIndex(c => c.id === crop.id);
  if (existingIdx >= 0) {
    db.crops[existingIdx] = crop;
  } else {
    db.crops.push(crop);
  }
}
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Updated backend/data.json with 3 new crops (Potato, Brinjal, Green Chilli). Total crops in DB:', db.crops.length);

// 2. New buyer marketplace lots
const newBuyerLots = [
  {
    id: "LOT-POT-29",
    crop: "Potato (Jyoti / Chandramukhi Grade A)",
    category: "Vegetables",
    farmerName: "Sambhaji Gaikwad",
    farmerLocation: "Manchar APMC Yard, Pune ~ 16.0 km away",
    farmerRating: "4.85 ⭐",
    farmerPhone: "+91 98221-33901",
    image: "assets/images/potato.jpg",
    grade: "Grade A Cold Storage Ready",
    gradeKey: "grade-a",
    gradeBadgeClass: "badge-grade-a",
    pricePerKg: 16.00,
    availableQtyKg: 12000,
    quantity: "12,000 kg (120 Qt)",
    qtyNum: 120,
    askPrice: "₹ 16.00 /kg",
    priceNum: 1600,
    mandiRate: "₹ 18.50 /kg",
    savings: "13.5% Lower",
    status: "Verified Available",
    statusBadgeClass: "badge-status-open",
    moisture: "78.0%"
  },
  {
    id: "LOT-BRN-30",
    crop: "Brinjal (Manchar Purple Long / Baingan)",
    category: "Vegetables",
    farmerName: "Dattatray Vhande",
    farmerLocation: "Rahuri APMC Market, Ahmednagar ~ 19.0 km away",
    farmerRating: "4.9 ⭐",
    farmerPhone: "+91 98225-88102",
    image: "assets/images/brinjal.jpg",
    grade: "Grade A Fresh Picked",
    gradeKey: "grade-a",
    gradeBadgeClass: "badge-grade-a",
    pricePerKg: 22.00,
    availableQtyKg: 5000,
    quantity: "5,000 kg (50 Qt)",
    qtyNum: 50,
    askPrice: "₹ 22.00 /kg",
    priceNum: 2200,
    mandiRate: "₹ 26.00 /kg",
    savings: "15.4% Lower",
    status: "Verified Available",
    statusBadgeClass: "badge-status-open",
    moisture: "85.0%"
  },
  {
    id: "LOT-GCH-31",
    crop: "Green Chilli (G4 High-Pungency Fresh)",
    category: "Vegetables",
    farmerName: "Jagdish Gavit",
    farmerLocation: "Nandurbar APMC Yard ~ 24.0 km away",
    farmerRating: "4.95 ⭐",
    farmerPhone: "+91 98230-11940",
    image: "assets/images/green_chilli.jpg",
    grade: "Grade A Export Calibrated",
    gradeKey: "grade-a",
    gradeBadgeClass: "badge-grade-a",
    pricePerKg: 42.00,
    availableQtyKg: 4000,
    quantity: "4,000 kg (40 Qt)",
    qtyNum: 40,
    askPrice: "₹ 42.00 /kg",
    priceNum: 4200,
    mandiRate: "₹ 48.00 /kg",
    savings: "12.5% Lower",
    status: "Verified Available",
    statusBadgeClass: "badge-status-open",
    moisture: "80.0%"
  }
];

// Update buyer-module/js/data.js
const buyerDataPath = path.resolve(__dirname, '..', 'buyer-module', 'js', 'data.js');
let buyerCode = fs.readFileSync(buyerDataPath, 'utf8');

for (const lot of newBuyerLots) {
  if (!buyerCode.includes(lot.id)) {
    const insertPoint = buyerCode.lastIndexOf('verifiedLots: [');
    const closingBracket = buyerCode.indexOf(']', insertPoint);
    if (closingBracket > 0) {
      const snippet = ',\n    ' + JSON.stringify(lot, null, 6).replace(/\n/g, '\n    ');
      buyerCode = buyerCode.slice(0, closingBracket) + snippet + '\n  ' + buyerCode.slice(closingBracket);
    }
  }
}
fs.writeFileSync(buyerDataPath, buyerCode, 'utf8');
console.log('Updated buyer-module/js/data.js with Potato, Brinjal, Green Chilli.');
