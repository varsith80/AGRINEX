const fs = require('fs');
const path = require('path');

const newFarmerLots = [
  {
    id: "LOT-MAZ-24",
    crop: "Maize (Yellow Corn / Makka)",
    category: "Grains",
    shelfLife: "120 Days",
    harvestDate: "12 Sep 2026",
    image: "assets/images/maize.jpg",
    grade: "Grade A Hybrid Feed Grade",
    gradeBadgeClass: "badge-grade-a",
    quantity: "150 Qt (15,000 kg)",
    quantityNumber: 150,
    expectedPrice: "₹ 22.00 /kg (₹ 2,200 /Qt)",
    expectedPriceNumber: 2200,
    bestBid: "₹ 22.80 /kg (₹ 2,280 /Qt)",
    bestBidNumber: 2280,
    buyerName: "Cargill Animal Nutrition & Starch",
    status: "Bids Open",
    statusBadgeClass: "badge-status-open",
    location: "Malegaon APMC Yard, Nashik"
  },
  {
    id: "LOT-SAF-25",
    crop: "Safflower (Kardi)",
    category: "Oilseeds",
    shelfLife: "90 Days",
    harvestDate: "13 Sep 2026",
    image: "assets/images/safflower.jpg",
    grade: "High-Oil Cold Press Grade",
    gradeBadgeClass: "badge-grade-a",
    quantity: "80 Qt (8,000 kg)",
    quantityNumber: 80,
    expectedPrice: "₹ 56.00 /kg (₹ 5,600 /Qt)",
    expectedPriceNumber: 5600,
    bestBid: "₹ 58.50 /kg (₹ 5,850 /Qt)",
    bestBidNumber: 5850,
    buyerName: "Marico Saffola Oil Processing",
    status: "Bids Open",
    statusBadgeClass: "badge-status-open",
    location: "Solapur APMC Market Yard"
  },
  {
    id: "LOT-SES-26",
    crop: "Sesame (Til)",
    category: "Oilseeds",
    shelfLife: "180 Days",
    harvestDate: "14 Sep 2026",
    image: "assets/images/sesame.jpg",
    grade: "Natural White Bold Export Calibrated",
    gradeBadgeClass: "badge-grade-a",
    quantity: "50 Qt (5,000 kg)",
    quantityNumber: 50,
    expectedPrice: "₹ 135.00 /kg (₹ 13,500 /Qt)",
    expectedPriceNumber: 13500,
    bestBid: "₹ 142.00 /kg (₹ 14,200 /Qt)",
    bestBidNumber: 14200,
    buyerName: "Virdhara International Spices & Seeds",
    status: "Bids Open",
    statusBadgeClass: "badge-status-open",
    location: "Dhule APMC Yard"
  },
  {
    id: "LOT-CHL-27",
    crop: "Chilli (Nandurbar Dry Red Chilli)",
    category: "Spices",
    shelfLife: "150 Days",
    harvestDate: "14 Sep 2026",
    image: "assets/images/chilli.jpg",
    grade: "Teja High-Pungency Sun-Dried",
    gradeBadgeClass: "badge-grade-a",
    quantity: "60 Qt (6,000 kg)",
    quantityNumber: 60,
    expectedPrice: "₹ 180.00 /kg (₹ 18,000 /Qt)",
    expectedPriceNumber: 18000,
    bestBid: "₹ 188.00 /kg (₹ 18,800 /Qt)",
    bestBidNumber: 18800,
    buyerName: "Everest Spices Procurement Corp",
    status: "Bids Open",
    statusBadgeClass: "badge-status-open",
    location: "Nandurbar Chilli APMC Yard"
  },
  {
    id: "LOT-GUA-28",
    crop: "Guava (Sardar L-49 Sweet Guava)",
    category: "Fruits",
    shelfLife: "6 Days (Perishable)",
    harvestDate: "15 Sep 2026",
    image: "assets/images/guava.jpg",
    grade: "Table Grade Extra Sweet",
    gradeBadgeClass: "badge-grade-a",
    quantity: "90 Qt (9,000 kg)",
    quantityNumber: 90,
    expectedPrice: "₹ 32.00 /kg (₹ 3,200 /Qt)",
    expectedPriceNumber: 3200,
    bestBid: "₹ 34.50 /kg (₹ 3,450 /Qt)",
    bestBidNumber: 3450,
    buyerName: "Mother Dairy Safal Fresh Processing",
    status: "Bids Open",
    statusBadgeClass: "badge-status-open",
    location: "Rahata APMC Market, Ahmednagar"
  }
];

const newBuyerLots = [
  {
    id: "LOT-MAZ-24",
    crop: "Maize (Yellow Corn / Makka)",
    category: "Grains",
    farmerName: "Anil Shinde",
    farmerLocation: "Malegaon APMC Yard, Nashik ~ 12.0 km away",
    farmerRating: "4.8 ⭐",
    farmerPhone: "+91 98224-55011",
    image: "assets/images/maize.jpg",
    grade: "Grade A Hybrid Feed Grade",
    gradeKey: "grade-a",
    gradeBadgeClass: "badge-grade-a",
    pricePerKg: 22.00,
    availableQtyKg: 15000,
    quantity: "15,000 kg (150 Qt)",
    qtyNum: 150,
    askPrice: "₹ 22.00 /kg",
    priceNum: 2200,
    mandiRate: "₹ 24.50 /kg",
    savings: "10.2% Lower",
    status: "Verified Available",
    statusBadgeClass: "badge-status-open",
    moisture: "12.0%"
  },
  {
    id: "LOT-SAF-25",
    crop: "Safflower (Kardi)",
    category: "Oilseeds",
    farmerName: "Basavaraj Birajdar",
    farmerLocation: "Solapur APMC Market Yard ~ 18.5 km away",
    farmerRating: "4.9 ⭐",
    farmerPhone: "+91 98231-88402",
    image: "assets/images/safflower.jpg",
    grade: "High-Oil Cold Press Grade",
    gradeKey: "grade-a",
    gradeBadgeClass: "badge-grade-a",
    pricePerKg: 56.00,
    availableQtyKg: 8000,
    quantity: "8,000 kg (80 Qt)",
    qtyNum: 80,
    askPrice: "₹ 56.00 /kg",
    priceNum: 5600,
    mandiRate: "₹ 61.00 /kg",
    savings: "8.2% Lower",
    status: "Verified Available",
    statusBadgeClass: "badge-status-open",
    moisture: "7.5%"
  },
  {
    id: "LOT-SES-26",
    crop: "Sesame (Til)",
    category: "Oilseeds",
    farmerName: "Pravin Chaudhari",
    farmerLocation: "Dhule APMC Yard ~ 14.0 km away",
    farmerRating: "4.95 ⭐",
    farmerPhone: "+91 98901-77210",
    image: "assets/images/sesame.jpg",
    grade: "Natural White Bold Export Calibrated",
    gradeKey: "grade-a",
    gradeBadgeClass: "badge-grade-a",
    pricePerKg: 135.00,
    availableQtyKg: 5000,
    quantity: "5,000 kg (50 Qt)",
    qtyNum: 50,
    askPrice: "₹ 135.00 /kg",
    priceNum: 13500,
    mandiRate: "₹ 148.00 /kg",
    savings: "8.8% Lower",
    status: "Verified Available",
    statusBadgeClass: "badge-status-open",
    moisture: "6.0%"
  },
  {
    id: "LOT-CHL-27",
    crop: "Chilli (Nandurbar Dry Red Chilli)",
    category: "Spices",
    farmerName: "Raju Gavit",
    farmerLocation: "Nandurbar Chilli APMC Yard ~ 22.0 km away",
    farmerRating: "4.9 ⭐",
    farmerPhone: "+91 98229-44119",
    image: "assets/images/chilli.jpg",
    grade: "Teja High-Pungency Sun-Dried",
    gradeKey: "grade-a",
    gradeBadgeClass: "badge-grade-a",
    pricePerKg: 180.00,
    availableQtyKg: 6000,
    quantity: "6,000 kg (60 Qt)",
    qtyNum: 60,
    askPrice: "₹ 180.00 /kg",
    priceNum: 18000,
    mandiRate: "₹ 198.00 /kg",
    savings: "9.1% Lower",
    status: "Verified Available",
    statusBadgeClass: "badge-status-open",
    moisture: "9.0%"
  },
  {
    id: "LOT-GUA-28",
    crop: "Guava (Sardar L-49 Sweet Guava)",
    category: "Fruits",
    farmerName: "Gorakh Tambe",
    farmerLocation: "Rahata APMC Market, Ahmednagar ~ 15.0 km away",
    farmerRating: "4.85 ⭐",
    farmerPhone: "+91 98223-11090",
    image: "assets/images/guava.jpg",
    grade: "Table Grade Extra Sweet",
    gradeKey: "grade-a",
    gradeBadgeClass: "badge-grade-a",
    pricePerKg: 32.00,
    availableQtyKg: 9000,
    quantity: "9,000 kg (90 Qt)",
    qtyNum: 90,
    askPrice: "₹ 32.00 /kg",
    priceNum: 3200,
    mandiRate: "₹ 36.00 /kg",
    savings: "11.1% Lower",
    status: "Verified Available",
    statusBadgeClass: "badge-status-open",
    moisture: "82.0%"
  }
];

const backendCrops = newFarmerLots.map(f => ({
  id: f.id,
  farmer_name: "Patil Rameshwar",
  crop: f.crop,
  variety: f.grade,
  category: f.category,
  shelf_life: f.shelfLife,
  quantity_qt: f.quantityNumber,
  quantity_kg: f.quantityNumber * 100,
  quantity: f.quantity,
  quantityNumber: f.quantityNumber,
  price_per_qt: f.expectedPriceNumber,
  price_per_kg: f.expectedPriceNumber / 100,
  expectedPrice: f.expectedPrice,
  expectedPriceNumber: f.expectedPriceNumber,
  bestBid: f.bestBid,
  bestBidNumber: f.bestBidNumber,
  buyerName: f.buyerName,
  state: "Maharashtra",
  district: f.location.split(',')[1]?.trim() || "Nashik",
  mandi: f.location,
  grade: f.grade,
  gradeBadgeClass: f.gradeBadgeClass,
  image: f.image,
  status: "Active (Bids Open)",
  statusBadgeClass: "badge-status-open",
  created_at: new Date().toISOString()
}));

// 1. Update backend/data.json
const dbPath = path.resolve(__dirname, '..', 'backend', 'data.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

if (!db.crops) db.crops = [];
for (const crop of backendCrops) {
  const existingIdx = db.crops.findIndex(c => c.id === crop.id);
  if (existingIdx >= 0) {
    db.crops[existingIdx] = crop;
  } else {
    db.crops.push(crop);
  }
}
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log('Updated backend/data.json with 5 new crops. Total crops in DB:', db.crops.length);

// 2. Update farmer-module/js/data.js
const farmerDataPath = path.resolve(__dirname, '..', 'farmer-module', 'js', 'data.js');
let farmerCode = fs.readFileSync(farmerDataPath, 'utf8');

for (const lot of newFarmerLots) {
  if (!farmerCode.includes(lot.id)) {
    // Insert before the closing bracket of listings
    const insertPoint = farmerCode.lastIndexOf(']');
    if (insertPoint > 0) {
      const isFirst = farmerCode.trim().endsWith('[]');
      const snippet = (isFirst ? '' : ',\n    ') + JSON.stringify(lot, null, 8).replace(/\n/g, '\n    ');
      farmerCode = farmerCode.slice(0, insertPoint) + snippet + '\n  ' + farmerCode.slice(insertPoint);
    }
  }
}
farmerCode = farmerCode.replace(/totalLots:\s*\d+/, `totalLots: ${db.crops.length}`);
fs.writeFileSync(farmerDataPath, farmerCode, 'utf8');
console.log('Updated farmer-module/js/data.js with new crops.');

// 3. Update buyer-module/js/data.js
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
console.log('Updated buyer-module/js/data.js with new crops.');

console.log('ALL CROPS SYNCHRONIZED SUCCESSFULLY!');
