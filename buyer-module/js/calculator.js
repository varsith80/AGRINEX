/**
 * AgriNex - Comprehensive Wholesale Agricultural Landed Cost, Mandi Arbitrage & Freight Intelligence Engine
 * Grounded in Live APMC Mandi Benchmarks, Origin-Destination Logistics Routes, Fleet Selection, and Multi-Layer Sourcing Comparisons.
 */

// Route Distance Matrix between Major Agricultural APMC Mandis & Regional Buyer Hubs (in km)
const MANDI_ROUTE_MATRIX = {
  erode: {
    name: 'Erode APMC (Tamil Nadu)',
    state: 'TN',
    distances: {
      hosur_hub: 210,
      bengaluru_dc: 250,
      chennai_dc: 395,
      coimbatore_hub: 100,
      hyderabad_hub: 810,
      kochi_hub: 280,
      mumbai_pune_hub: 1220
    },
    mandiPrices: {
      turmeric: 138.0,
      tomato: 13.5,
      banana: 15.5,
      onion: 23.0,
      potato: 18.0,
      chilli: 41.5,
      ginger: 76.0,
      garlic: 142.0,
      rice: 79.0,
      wheat: 30.5,
      carrot: 26.0,
      cabbage: 11.5
    }
  },
  dindigul: {
    name: 'Dindigul APMC (Tamil Nadu)',
    state: 'TN',
    distances: {
      hosur_hub: 330,
      bengaluru_dc: 370,
      chennai_dc: 430,
      coimbatore_hub: 160,
      hyderabad_hub: 930,
      kochi_hub: 210,
      mumbai_pune_hub: 1340
    },
    mandiPrices: {
      tomato: 12.8,
      onion: 23.5,
      chilli: 41.0,
      banana: 15.0,
      turmeric: 135.0,
      potato: 18.5,
      ginger: 75.0,
      garlic: 140.0,
      rice: 80.0,
      wheat: 31.0,
      carrot: 27.0,
      cabbage: 11.0
    }
  },
  kolar: {
    name: 'Kolar APMC (Karnataka)',
    state: 'KA',
    distances: {
      hosur_hub: 75,
      bengaluru_dc: 65,
      chennai_dc: 290,
      coimbatore_hub: 390,
      hyderabad_hub: 550,
      kochi_hub: 590,
      mumbai_pune_hub: 1040
    },
    mandiPrices: {
      tomato: 14.2,
      capsicum: 36.0,
      potato: 18.5,
      onion: 24.5,
      chilli: 42.0,
      cabbage: 11.8,
      carrot: 28.0,
      banana: 16.5,
      turmeric: 136.0,
      ginger: 77.0,
      garlic: 144.0,
      rice: 81.0,
      wheat: 31.5
    }
  },
  nashik: {
    name: 'Nashik APMC (Maharashtra)',
    state: 'MH',
    distances: {
      hosur_hub: 1020,
      bengaluru_dc: 980,
      chennai_dc: 1280,
      coimbatore_hub: 1280,
      hyderabad_hub: 690,
      kochi_hub: 1480,
      mumbai_pune_hub: 170
    },
    mandiPrices: {
      onion: 24.0,
      tomato: 13.0,
      potato: 17.5,
      chilli: 39.0,
      garlic: 138.0,
      ginger: 74.0,
      turmeric: 132.0,
      banana: 14.5,
      rice: 80.0,
      wheat: 29.5,
      carrot: 25.0,
      cabbage: 10.5
    }
  },
  ottanchathiram: {
    name: 'Ottanchathiram Market (Tamil Nadu)',
    state: 'TN',
    distances: {
      hosur_hub: 310,
      bengaluru_dc: 350,
      chennai_dc: 450,
      coimbatore_hub: 125,
      hyderabad_hub: 910,
      kochi_hub: 195,
      mumbai_pune_hub: 1320
    },
    mandiPrices: {
      chilli: 43.0,
      tomato: 13.2,
      onion: 23.8,
      banana: 15.2,
      cabbage: 11.2,
      carrot: 26.5,
      potato: 18.2,
      turmeric: 136.0,
      ginger: 76.0,
      garlic: 141.0,
      rice: 80.0,
      wheat: 31.0
    }
  },
  hosur: {
    name: 'Hosur APMC (Tamil Nadu)',
    state: 'TN',
    distances: {
      hosur_hub: 15,
      bengaluru_dc: 40,
      chennai_dc: 310,
      coimbatore_hub: 340,
      hyderabad_hub: 605,
      kochi_hub: 540,
      mumbai_pune_hub: 1020
    },
    mandiPrices: {
      carrot: 27.5,
      cabbage: 11.5,
      tomato: 13.8,
      potato: 18.0,
      onion: 24.2,
      chilli: 42.0,
      banana: 16.0,
      turmeric: 137.0,
      ginger: 77.5,
      garlic: 143.0,
      rice: 81.5,
      wheat: 31.2
    }
  },
  chittoor: {
    name: 'Chittoor APMC (Andhra Pradesh)',
    state: 'AP',
    distances: {
      hosur_hub: 140,
      bengaluru_dc: 165,
      chennai_dc: 160,
      coimbatore_hub: 460,
      hyderabad_hub: 540,
      kochi_hub: 660,
      mumbai_pune_hub: 1140
    },
    mandiPrices: {
      tomato: 13.0,
      onion: 24.0,
      potato: 18.2,
      chilli: 43.5,
      turmeric: 136.0,
      banana: 15.8,
      ginger: 76.0,
      garlic: 142.0,
      rice: 82.0,
      wheat: 31.0,
      carrot: 27.0,
      cabbage: 11.5
    }
  },
  madurai: {
    name: 'Madurai APMC (Tamil Nadu)',
    state: 'TN',
    distances: {
      hosur_hub: 390,
      bengaluru_dc: 430,
      chennai_dc: 460,
      coimbatore_hub: 215,
      hyderabad_hub: 990,
      kochi_hub: 260,
      mumbai_pune_hub: 1400
    },
    mandiPrices: {
      banana: 16.0,
      onion: 24.5,
      chilli: 42.5,
      tomato: 13.4,
      potato: 18.8,
      turmeric: 137.5,
      ginger: 77.0,
      garlic: 143.0,
      rice: 81.0,
      wheat: 31.5,
      carrot: 27.8,
      cabbage: 12.0
    }
  },
  salem: {
    name: 'Salem APMC (Tamil Nadu)',
    state: 'TN',
    distances: {
      hosur_hub: 160,
      bengaluru_dc: 200,
      chennai_dc: 345,
      coimbatore_hub: 165,
      hyderabad_hub: 760,
      kochi_hub: 335,
      mumbai_pune_hub: 1170
    },
    mandiPrices: {
      turmeric: 140.0,
      tomato: 13.6,
      onion: 23.8,
      potato: 18.2,
      chilli: 41.5,
      banana: 15.8,
      ginger: 76.5,
      garlic: 142.5,
      rice: 80.5,
      wheat: 31.0,
      carrot: 26.8,
      cabbage: 11.8
    }
  },
  guntur: {
    name: 'Guntur APMC (Andhra Pradesh)',
    state: 'AP',
    distances: {
      hosur_hub: 560,
      bengaluru_dc: 590,
      chennai_dc: 390,
      coimbatore_hub: 870,
      hyderabad_hub: 275,
      kochi_hub: 1070,
      mumbai_pune_hub: 920
    },
    mandiPrices: {
      chilli: 185.0,
      turmeric: 135.0,
      onion: 24.2,
      tomato: 13.2,
      potato: 18.0,
      banana: 15.5,
      ginger: 75.0,
      garlic: 141.0,
      rice: 82.5,
      wheat: 30.5,
      carrot: 27.0,
      cabbage: 11.2
    }
  },
  karnal: {
    name: 'Karnal Mandi (Haryana)',
    state: 'HR',
    distances: {
      hosur_hub: 2200,
      bengaluru_dc: 2180,
      chennai_dc: 2220,
      coimbatore_hub: 2490,
      hyderabad_hub: 1620,
      kochi_hub: 2690,
      mumbai_pune_hub: 1450
    },
    mandiPrices: {
      rice: 82.0,
      wheat: 31.0,
      potato: 16.5,
      onion: 23.0,
      tomato: 14.0,
      chilli: 44.0,
      turmeric: 142.0,
      banana: 18.0,
      ginger: 80.0,
      garlic: 148.0,
      carrot: 24.0,
      cabbage: 10.0
    }
  },
  shimla: {
    name: 'Shimla / Solan Mandi (Himachal Pradesh)',
    state: 'HP',
    distances: {
      hosur_hub: 2420,
      bengaluru_dc: 2400,
      chennai_dc: 2440,
      coimbatore_hub: 2710,
      hyderabad_hub: 1840,
      kochi_hub: 2910,
      mumbai_pune_hub: 1670
    },
    mandiPrices: {
      tomato: 15.5,
      carrot: 29.0,
      cabbage: 13.0,
      potato: 17.5,
      onion: 25.0,
      chilli: 46.0,
      turmeric: 145.0,
      banana: 19.0,
      ginger: 82.0,
      garlic: 150.0,
      rice: 84.0,
      wheat: 32.0
    }
  }
};

// Commodity Intelligence & Perishability Factors
const COMMODITY_CATALOG = {
  tomato: {
    name: 'Tomato (Hybrid / Shivam)',
    category: 'Vegetables',
    defaultMandi: 14.50,
    perishability: 'high',
    ambientTransitLossRate: 0.038, // 3.8% loss in traditional ambient
    reeferTransitLossRate: 0.005,  // 0.5% in reefer
    defaultPackaging: 'crates',
    icon: '🍅'
  },
  onion: {
    name: 'Red Onion (Nashik Medium Garwa)',
    category: 'Vegetables',
    defaultMandi: 24.00,
    perishability: 'low',
    ambientTransitLossRate: 0.012,
    reeferTransitLossRate: 0.004,
    defaultPackaging: 'gunny',
    icon: '🧅'
  },
  potato: {
    name: 'Potato (Jyoti / Chipsona)',
    category: 'Vegetables',
    defaultMandi: 18.00,
    perishability: 'low',
    ambientTransitLossRate: 0.008,
    reeferTransitLossRate: 0.003,
    defaultPackaging: 'gunny',
    icon: '🥔'
  },
  chilli: {
    name: 'Green Chilli (G4 / Teja)',
    category: 'Spices & High-Value',
    defaultMandi: 42.00,
    perishability: 'medium',
    ambientTransitLossRate: 0.028,
    reeferTransitLossRate: 0.006,
    defaultPackaging: 'boxes',
    icon: '🌶️'
  },
  turmeric: {
    name: 'Turmeric Finger (Salem / Erode Gold)',
    category: 'Spices & High-Value',
    defaultMandi: 138.00,
    perishability: 'zero',
    ambientTransitLossRate: 0.001,
    reeferTransitLossRate: 0.001,
    defaultPackaging: 'gunny',
    icon: '🌿'
  },
  banana: {
    name: 'Banana (Robusta / G9 Cavendish)',
    category: 'Fruits',
    defaultMandi: 16.00,
    perishability: 'high',
    ambientTransitLossRate: 0.042,
    reeferTransitLossRate: 0.008,
    defaultPackaging: 'crates',
    icon: '🍌'
  },
  ginger: {
    name: 'Fresh Ginger (Cochin Washed)',
    category: 'Spices & High-Value',
    defaultMandi: 78.00,
    perishability: 'low',
    ambientTransitLossRate: 0.015,
    reeferTransitLossRate: 0.004,
    defaultPackaging: 'gunny',
    icon: '🫚'
  },
  garlic: {
    name: 'Garlic (Ooty Big Bulb)',
    category: 'Spices & High-Value',
    defaultMandi: 145.00,
    perishability: 'zero',
    ambientTransitLossRate: 0.002,
    reeferTransitLossRate: 0.001,
    defaultPackaging: 'gunny',
    icon: '🧄'
  },
  rice: {
    name: 'Basmati Rice (1121 Premium)',
    category: 'Grains & Cereals',
    defaultMandi: 82.00,
    perishability: 'zero',
    ambientTransitLossRate: 0.000,
    reeferTransitLossRate: 0.000,
    defaultPackaging: 'gunny',
    icon: '🌾'
  },
  wheat: {
    name: 'Wheat (Sharbati MP Gold)',
    category: 'Grains & Cereals',
    defaultMandi: 31.00,
    perishability: 'zero',
    ambientTransitLossRate: 0.000,
    reeferTransitLossRate: 0.000,
    defaultPackaging: 'gunny',
    icon: '🌾'
  },
  carrot: {
    name: 'Carrot (Ooty Hill Fresh)',
    category: 'Vegetables',
    defaultMandi: 28.00,
    perishability: 'medium',
    ambientTransitLossRate: 0.024,
    reeferTransitLossRate: 0.005,
    defaultPackaging: 'crates',
    icon: '🥕'
  },
  cabbage: {
    name: 'Cabbage / Cauliflower',
    category: 'Vegetables',
    defaultMandi: 12.00,
    perishability: 'medium',
    ambientTransitLossRate: 0.030,
    reeferTransitLossRate: 0.006,
    defaultPackaging: 'gunny',
    icon: '🥬'
  }
};

// Logistics Fleet Specs
const FLEET_TYPES = {
  tata: {
    name: 'Tata Ace Mini (1.5 MT)',
    capacityKg: 1500,
    baseFare: 1200,
    ratePerKm: 18.0,
    tollBase: 120,
    isReefer: false
  },
  dost: {
    name: 'Ashok Leyland Dost (2.5 MT)',
    capacityKg: 2500,
    baseFare: 1800,
    ratePerKm: 22.0,
    tollBase: 180,
    isReefer: false
  },
  bolero: {
    name: 'Mahindra Bolero Maxi (3.0 MT)',
    capacityKg: 3000,
    baseFare: 2200,
    ratePerKm: 25.0,
    tollBase: 220,
    isReefer: false
  },
  eicher: {
    name: 'Eicher Pro 1110 (7.5 MT)',
    capacityKg: 7500,
    baseFare: 4000,
    ratePerKm: 34.0,
    tollBase: 450,
    isReefer: false
  },
  bharatbenz: {
    name: 'BharatBenz Heavy (16.0 MT)',
    capacityKg: 16000,
    baseFare: 6500,
    ratePerKm: 48.0,
    tollBase: 950,
    isReefer: false
  },
  reefer: {
    name: '❄️ Cold-Chain Reefer Truck (8.0 MT)',
    capacityKg: 8000,
    baseFare: 7000,
    ratePerKm: 52.0,
    tollBase: 500,
    isReefer: true
  },
  ev: {
    name: '⚡ Euler EV Cargo (1.2 MT)',
    capacityKg: 1200,
    baseFare: 900,
    ratePerKm: 11.5,
    tollBase: 80,
    isReefer: false
  }
};

// Packaging Costs
const PACKAGING_MODES = {
  crates: {
    name: 'Returnable Plastic Crates (25 kg • ₹12/rental & wash)',
    costPerKg: 0.48
  },
  boxes: {
    name: 'Corrugated Export Boxes (10 kg • ₹35/box)',
    costPerKg: 3.50
  },
  gunny: {
    name: 'Jute Gunny Bags (50 kg • ₹18/bag)',
    costPerKg: 0.36
  },
  loose: {
    name: 'Bulk Loose Loading (₹0 Crate Cost)',
    costPerKg: 0.00
  }
};

// State Object
let comprehensiveCalcState = {
  qtyUnit: 'qt', // 'qt', 'kg', 'mt'
  priceUnit: 'qt', // 'qt', 'kg'
  selectedMandiKey: 'erode',
  selectedHubKey: 'hosur_hub',
  selectedProductKey: 'tomato',
  selectedGrade: 'grade_a', // 'grade_a', 'grade_b', 'grade_c'
  selectedVehicleKey: 'tata',
  selectedPackagingKey: 'crates',
  manualDistanceOverride: false,
  manualMandiPriceOverride: false,
  manualFarmPriceOverride: false
};

// Toggle Volume Units
function setCalcUnit(unit) {
  comprehensiveCalcState.qtyUnit = unit;
  
  const btns = document.querySelectorAll('.calc-unit-btn');
  btns.forEach((b) => {
    b.classList.remove('active');
    b.style.background = 'transparent';
    b.style.color = '#475569';
  });

  const activeBtn = document.getElementById(`calc-unit-${unit}`);
  if (activeBtn) {
    activeBtn.classList.add('active');
    activeBtn.style.background = '#0c5a36';
    activeBtn.style.color = '#ffffff';
  }

  const qtyInput = document.getElementById('calc-buyer-qty');
  if (qtyInput) {
    const curr = parseFloat(qtyInput.value) || 50;
    if (unit === 'kg') {
      qtyInput.value = curr < 500 ? Math.round(curr * 100) : curr;
      qtyInput.step = '100';
    } else if (unit === 'mt') {
      qtyInput.value = curr > 500 ? (curr / 1000).toFixed(1) : (curr / 10).toFixed(1);
      qtyInput.step = '0.5';
    } else {
      qtyInput.value = curr > 500 ? Math.round(curr / 100) : curr < 10 ? Math.round(curr * 10) : curr;
      qtyInput.step = '5';
    }
  }

  recalculateBuyerCosts();
}

// Toggle Price Units
function setCalcPriceUnit(unit) {
  comprehensiveCalcState.priceUnit = unit;
  
  const btns = document.querySelectorAll('.calc-price-unit-btn');
  btns.forEach((b) => {
    b.classList.remove('active');
    b.style.background = 'transparent';
    b.style.color = '#475569';
  });

  const activeBtn = document.getElementById(`calc-price-unit-${unit}`);
  if (activeBtn) {
    activeBtn.classList.add('active');
    activeBtn.style.background = '#0c5a36';
    activeBtn.style.color = '#ffffff';
  }

  const farmPriceInput = document.getElementById('calc-buyer-price');
  if (farmPriceInput) {
    const curr = parseFloat(farmPriceInput.value) || 1200;
    if (unit === 'kg') {
      farmPriceInput.value = curr > 100 ? (curr / 100).toFixed(2) : curr;
      farmPriceInput.step = '0.5';
    } else {
      farmPriceInput.value = curr < 100 ? Math.round(curr * 100) : curr;
      farmPriceInput.step = '20';
    }
  }

  recalculateBuyerCosts();
}

// On Mandi or Destination Hub Change
function onMandiOrHubChange() {
  const mandiSelect = document.getElementById('calc-mandi-origin');
  const hubSelect = document.getElementById('calc-buyer-hub');
  const distanceInput = document.getElementById('calc-buyer-distance');
  const routeBadge = document.getElementById('calc-route-badge');

  if (!mandiSelect || !hubSelect) return;

  const mandiKey = mandiSelect.value;
  const hubKey = hubSelect.value;
  comprehensiveCalcState.selectedMandiKey = mandiKey;
  comprehensiveCalcState.selectedHubKey = hubKey;

  const mandiData = MANDI_ROUTE_MATRIX[mandiKey];
  if (mandiData && mandiData.distances[hubKey]) {
    const distanceKm = mandiData.distances[hubKey];
    if (distanceInput) {
      distanceInput.value = distanceKm;
    }
    if (routeBadge) {
      routeBadge.textContent = `${distanceKm} km Highway Transit`;
    }
  }

  // Update Mandi Benchmark Price for selected product in this Mandi
  updateMandiPriceForSelection();
  recalculateBuyerCosts();
}

// On Commodity or Grade Change
function onProductOrGradeChange() {
  const productSelect = document.getElementById('calc-product-select');
  const gradeSelect = document.getElementById('calc-product-grade');
  const packagingSelect = document.getElementById('calc-packaging-mode');

  if (productSelect) {
    comprehensiveCalcState.selectedProductKey = productSelect.value;
    const prod = COMMODITY_CATALOG[productSelect.value];
    if (prod && packagingSelect && !comprehensiveCalcState.manualPackagingOverride) {
      packagingSelect.value = prod.defaultPackaging;
    }
  }

  if (gradeSelect) {
    comprehensiveCalcState.selectedGrade = gradeSelect.value;
  }

  updateMandiPriceForSelection();
  recalculateBuyerCosts();
}

// Update live APMC Mandi Price benchmark based on selected mandi + commodity + grade
function updateMandiPriceForSelection() {
  const mandiKey = comprehensiveCalcState.selectedMandiKey;
  const prodKey = comprehensiveCalcState.selectedProductKey;
  const mandiData = MANDI_ROUTE_MATRIX[mandiKey] || MANDI_ROUTE_MATRIX.erode;
  const prodData = COMMODITY_CATALOG[prodKey] || COMMODITY_CATALOG.tomato;

  let baseMandiPerKg = (mandiData.mandiPrices && mandiData.mandiPrices[prodKey]) || prodData.defaultMandi;

  // Grade adjustments: Grade A (+5%), Grade B (Base), Grade C (-15%)
  if (comprehensiveCalcState.selectedGrade === 'grade_a') {
    baseMandiPerKg = baseMandiPerKg * 1.05;
  } else if (comprehensiveCalcState.selectedGrade === 'grade_c') {
    baseMandiPerKg = baseMandiPerKg * 0.85;
  }

  const mandiPriceInput = document.getElementById('calc-mandi-benchmark-price');
  const farmPriceInput = document.getElementById('calc-buyer-price');

  if (mandiPriceInput) {
    mandiPriceInput.value = baseMandiPerKg.toFixed(2);
  }

  // Direct Farm Gate price is roughly 12% lower than APMC modal price (zero middleman commission)
  if (farmPriceInput && !comprehensiveCalcState.manualFarmPriceOverride) {
    const directFarmGatePerKg = baseMandiPerKg * 0.88; // 12% direct discount
    if (comprehensiveCalcState.priceUnit === 'kg') {
      farmPriceInput.value = directFarmGatePerKg.toFixed(2);
    } else {
      farmPriceInput.value = Math.round(directFarmGatePerKg * 100);
    }
  }
}

// Comprehensive Recalculation Engine
function recalculateBuyerCosts() {
  const quantityInput = document.getElementById('calc-buyer-qty');
  const farmPriceInput = document.getElementById('calc-buyer-price');
  const mandiPriceInput = document.getElementById('calc-mandi-benchmark-price');
  const distanceInput = document.getElementById('calc-buyer-distance');
  const vehicleSelect = document.getElementById('calc-buyer-vehicle');
  const packagingSelect = document.getElementById('calc-packaging-mode');
  const hamaliInput = document.getElementById('calc-hamali-rate');

  if (!quantityInput || !farmPriceInput || !distanceInput || !vehicleSelect) return;

  const rawQty = parseFloat(quantityInput.value) || 50;
  const rawFarmPrice = parseFloat(farmPriceInput.value) || 1200;
  const distanceKm = parseFloat(distanceInput.value) || 80;
  const vehicleKey = vehicleSelect.value;
  const packagingKey = (packagingSelect && packagingSelect.value) || 'crates';
  const hamaliRatePerQt = parseFloat((hamaliInput && hamaliInput.value) || 15);

  const productKey = comprehensiveCalcState.selectedProductKey || 'tomato';
  const prodData = COMMODITY_CATALOG[productKey] || COMMODITY_CATALOG.tomato;
  const fleetData = FLEET_TYPES[vehicleKey] || FLEET_TYPES.tata;
  const packData = PACKAGING_MODES[packagingKey] || PACKAGING_MODES.crates;

  // 1. Normalize Quantity into Quintals (Qt), kg, and MT
  let qtyInQt = rawQty;
  let qtyInKg = rawQty * 100;
  let qtyInMt = rawQty / 10;
  if (comprehensiveCalcState.qtyUnit === 'kg') {
    qtyInKg = rawQty;
    qtyInQt = rawQty / 100;
    qtyInMt = rawQty / 1000;
  } else if (comprehensiveCalcState.qtyUnit === 'mt') {
    qtyInMt = rawQty;
    qtyInKg = rawQty * 1000;
    qtyInQt = rawQty * 10;
  }

  // 2. Normalize Direct Farm Gate Price (₹/Qt & ₹/kg)
  let farmPricePerQt = rawFarmPrice;
  let farmPricePerKg = rawFarmPrice / 100;
  if (comprehensiveCalcState.priceUnit === 'kg') {
    farmPricePerKg = rawFarmPrice;
    farmPricePerQt = rawFarmPrice * 100;
  }

  // 3. APMC Benchmark Price
  const rawMandiPriceKg = parseFloat((mandiPriceInput && mandiPriceInput.value) || (farmPricePerKg * 1.135));
  const mandiPricePerKg = rawMandiPriceKg;
  const mandiPricePerQt = mandiPricePerKg * 100;

  // Conversion hints
  const farmPriceHint = document.getElementById('calc-price-conversion-hint');
  if (farmPriceHint) {
    farmPriceHint.textContent = comprehensiveCalcState.priceUnit === 'kg' 
      ? `= ₹ ${Math.round(farmPricePerQt).toLocaleString('en-IN')} /Qt` 
      : `= ₹ ${farmPricePerKg.toFixed(2)} /kg`;
  }

  // Direct Discount Tag vs APMC Mandi
  const discountTag = document.getElementById('calc-direct-discount-tag');
  if (discountTag && mandiPricePerKg > 0) {
    const discPct = Math.max(((mandiPricePerKg - farmPricePerKg) / mandiPricePerKg) * 100, 0);
    discountTag.textContent = `${discPct.toFixed(1)}% Direct Farm Discount`;
  }

  // Fleet Capacity Warning
  const fleetWarning = document.getElementById('calc-fleet-capacity-warning');
  if (fleetWarning) {
    if (qtyInKg > fleetData.capacityKg * 1.05) {
      const neededTrucks = Math.ceil(qtyInKg / fleetData.capacityKg);
      fleetWarning.style.display = 'block';
      fleetWarning.innerHTML = `⚠️ Total volume (<strong>${qtyInKg.toLocaleString('en-IN')} kg</strong>) exceeds single ${fleetData.name} capacity (<strong>${fleetData.capacityKg.toLocaleString('en-IN')} kg</strong>). Requires <strong>${neededTrucks} vehicles</strong> or larger fleet (e.g. Eicher/BharatBenz).`;
    } else {
      fleetWarning.style.display = 'none';
    }
  }

  const numVehicles = Math.max(Math.ceil(qtyInKg / fleetData.capacityKg), 1);

  // -------------------------------------------------------------------------
  // CALCULATION 1: DIRECT FARM-GATE PROCUREMENT (AgriNex Ecosystem)
  // -------------------------------------------------------------------------
  // A. Produce Base Cost
  const directProduceCost = Math.round(qtyInKg * farmPricePerKg);

  // B. Packaging & Crate Cost
  const directPackagingCost = Math.round(qtyInKg * packData.costPerKg);

  // C. Vehicle Haulage Freight (Base Fare + km * rate * vehicles)
  const directFreightCost = Math.round((fleetData.baseFare + (distanceKm * fleetData.ratePerKm)) * numVehicles);

  // D. Tolls & State Border Transit Permit
  const directTollsCost = Math.round((fleetData.tollBase + (distanceKm > 100 ? (distanceKm - 100) * 0.9 : 0)) * numVehicles);

  // E. Farm Gate Loading / Weighbridge Hamali
  const directHamaliCost = Math.round(qtyInQt * hamaliRatePerQt);

  // F. AgriNex Smart Escrow Fee (0.75% of produce purchase)
  const directEscrowFee = Math.round(directProduceCost * 0.0075);

  // G. Farm Gate Digital QC & Lot Inspection (₹0.10/kg = ₹10/Qt)
  const directQcFee = Math.round(qtyInKg * 0.10);

  // H. Transit Spoilage / Shrinkage Estimate
  const transitLossRate = fleetData.isReefer ? prodData.reeferTransitLossRate : prodData.ambientTransitLossRate;
  const directTransitLoss = Math.round(directProduceCost * (transitLossRate * 0.35)); // AgriNex calibrated packaging reduces loss by 65%

  // Total Landed Direct Cost
  const directTotalLandedCost = directProduceCost + directPackagingCost + directFreightCost + directTollsCost + directHamaliCost + directEscrowFee + directQcFee + directTransitLoss;
  const directLandedPerKg = qtyInKg > 0 ? (directTotalLandedCost / qtyInKg).toFixed(2) : '0';
  const directLandedPerQt = qtyInQt > 0 ? (directTotalLandedCost / qtyInQt).toFixed(1) : '0';

  // -------------------------------------------------------------------------
  // CALCULATION 2: TRADITIONAL APMC MANDI PROCUREMENT (Middleman Model)
  // -------------------------------------------------------------------------
  // A. Mandi Produce Modal Base Cost
  const mandiProduceCost = Math.round(qtyInKg * mandiPricePerKg);

  // B. APMC Mandi Cess / Tax (2.0%)
  const mandiCessFee = Math.round(mandiProduceCost * 0.020);

  // C. Arhatiya / Commission Agent Cut (6.0%)
  const arhatiyaFee = Math.round(mandiProduceCost * 0.060);

  // D. Intermediary Trader Secondary Brokerage Spread (3.5%)
  const brokerSpread = Math.round(mandiProduceCost * 0.035);

  // E. Mandi Hamali & Weighbridge (₹18 / Qt)
  const mandiHamaliCost = Math.round(qtyInQt * 18.0);

  // F. Traditional Freight & Logistics (Standard market truck without fleet discount)
  const traditionalFreightCost = Math.round((fleetData.baseFare * 1.15 + (distanceKm * (fleetData.ratePerKm + 3))) * numVehicles);

  // G. Traditional Tolls
  const traditionalTollsCost = directTollsCost;

  // H. Traditional Ambient Transit Spoilage & Wastage Loss (Unmonitored)
  const traditionalTransitLoss = Math.round(mandiProduceCost * transitLossRate);

  // Total Traditional Landed Cost
  const traditionalTotalLandedCost = mandiProduceCost + mandiCessFee + arhatiyaFee + brokerSpread + mandiHamaliCost + traditionalFreightCost + traditionalTollsCost + traditionalTransitLoss;
  const traditionalLandedPerKg = qtyInKg > 0 ? (traditionalTotalLandedCost / qtyInKg).toFixed(2) : '0';
  const traditionalLandedPerQt = qtyInQt > 0 ? (traditionalTotalLandedCost / qtyInQt).toFixed(1) : '0';

  // Net Middleman Savings
  const netSavings = Math.max(traditionalTotalLandedCost - directTotalLandedCost, 0);
  const netSavingsPct = traditionalTotalLandedCost > 0 ? ((netSavings / traditionalTotalLandedCost) * 100).toFixed(1) : '0';
  const savingsPerKg = Math.max(parseFloat(traditionalLandedPerKg) - parseFloat(directLandedPerKg), 0).toFixed(2);
  const savingsPerQt = Math.max(parseFloat(traditionalLandedPerQt) - parseFloat(directLandedPerQt), 0).toFixed(1);

  // -------------------------------------------------------------------------
  // UPDATE UI ELEMENTS
  // -------------------------------------------------------------------------
  // Top 4 Metric Highlight Cards
  const directTotalEl = document.getElementById('calc-summary-direct-total');
  const directPerKgEl = document.getElementById('calc-summary-direct-perkg');
  const mandiTotalEl = document.getElementById('calc-summary-mandi-total');
  const mandiPerKgEl = document.getElementById('calc-summary-mandi-perkg');
  const netSavingsEl = document.getElementById('calc-summary-net-savings');
  const netSavingsPctEl = document.getElementById('calc-summary-savings-pct');
  const perKgSavingsEl = document.getElementById('calc-summary-perkg-savings');

  if (directTotalEl) directTotalEl.textContent = `₹ ${directTotalLandedCost.toLocaleString('en-IN')}`;
  if (directPerKgEl) directPerKgEl.textContent = `₹ ${directLandedPerKg}/kg • ₹ ${parseFloat(directLandedPerQt).toLocaleString('en-IN')}/Qt`;
  if (mandiTotalEl) mandiTotalEl.textContent = `₹ ${traditionalTotalLandedCost.toLocaleString('en-IN')}`;
  if (mandiPerKgEl) mandiPerKgEl.textContent = `₹ ${traditionalLandedPerKg}/kg • ₹ ${parseFloat(traditionalLandedPerQt).toLocaleString('en-IN')}/Qt`;
  if (netSavingsEl) netSavingsEl.textContent = `₹ ${netSavings.toLocaleString('en-IN')}`;
  if (netSavingsPctEl) netSavingsPctEl.textContent = `${netSavingsPct}% Lower Cost`;
  if (perKgSavingsEl) perKgSavingsEl.textContent = `₹ ${savingsPerKg} / kg Saved`;

  // Direct Line Items
  setText('calc-item-direct-produce', `₹ ${directProduceCost.toLocaleString('en-IN')}`);
  setText('calc-item-direct-packaging', `₹ ${directPackagingCost.toLocaleString('en-IN')}`);
  setText('calc-item-direct-freight', `₹ ${directFreightCost.toLocaleString('en-IN')}`);
  setText('calc-item-direct-tolls', `₹ ${directTollsCost.toLocaleString('en-IN')}`);
  setText('calc-item-direct-hamali', `₹ ${directHamaliCost.toLocaleString('en-IN')}`);
  setText('calc-item-direct-escrow', `₹ ${directEscrowFee.toLocaleString('en-IN')}`);
  setText('calc-item-direct-qc', `₹ ${directQcFee.toLocaleString('en-IN')}`);
  setText('calc-item-direct-shrinkage', `₹ ${directTransitLoss.toLocaleString('en-IN')}`);
  setText('calc-item-direct-total-final', `₹ ${directTotalLandedCost.toLocaleString('en-IN')}`);
  setText('calc-item-direct-rate-final', `₹ ${directLandedPerKg} / kg`);

  // Traditional Mandi Line Items
  setText('calc-item-mandi-produce', `₹ ${mandiProduceCost.toLocaleString('en-IN')}`);
  setText('calc-item-mandi-cess', `₹ ${mandiCessFee.toLocaleString('en-IN')}`);
  setText('calc-item-mandi-arhatiya', `₹ ${arhatiyaFee.toLocaleString('en-IN')}`);
  setText('calc-item-mandi-brokerage', `₹ ${brokerSpread.toLocaleString('en-IN')}`);
  setText('calc-item-mandi-hamali', `₹ ${mandiHamaliCost.toLocaleString('en-IN')}`);
  setText('calc-item-mandi-freight', `₹ ${traditionalFreightCost.toLocaleString('en-IN')}`);
  setText('calc-item-mandi-tolls', `₹ ${traditionalTollsCost.toLocaleString('en-IN')}`);
  setText('calc-item-mandi-loss', `₹ ${traditionalTransitLoss.toLocaleString('en-IN')}`);
  setText('calc-item-mandi-total-final', `₹ ${traditionalTotalLandedCost.toLocaleString('en-IN')}`);
  setText('calc-item-mandi-rate-final', `₹ ${traditionalLandedPerKg} / kg`);

  // Waterfall Split Bar
  const producePct = directTotalLandedCost > 0 ? ((directProduceCost / directTotalLandedCost) * 100).toFixed(1) : '75';
  const freightPct = directTotalLandedCost > 0 ? (((directFreightCost + directTollsCost) / directTotalLandedCost) * 100).toFixed(1) : '15';
  const packPct = directTotalLandedCost > 0 ? ((directPackagingCost / directTotalLandedCost) * 100).toFixed(1) : '5';
  const servicePct = (100 - parseFloat(producePct) - parseFloat(freightPct) - parseFloat(packPct)).toFixed(1);

  const barProduce = document.getElementById('calc-bar-produce');
  const barFreight = document.getElementById('calc-bar-freight');
  const barPack = document.getElementById('calc-bar-pack');
  const barService = document.getElementById('calc-bar-service');

  if (barProduce) { barProduce.style.width = `${producePct}%`; barProduce.title = `Raw Produce: ${producePct}%`; }
  if (barFreight) { barFreight.style.width = `${freightPct}%`; barFreight.title = `Logistics & Tolls: ${freightPct}%`; }
  if (barPack) { barPack.style.width = `${packPct}%`; barPack.title = `Packaging & Crates: ${packPct}%`; }
  if (barService) { barService.style.width = `${servicePct}%`; barService.title = `Escrow, QC & Hamali: ${servicePct}%`; }

  // Action Button Context
  const btnPostDemand = document.getElementById('btn-calc-post-demand');
  if (btnPostDemand) {
    btnPostDemand.setAttribute('data-qty', qtyInKg);
    btnPostDemand.setAttribute('data-target-price', farmPricePerKg);
    btnPostDemand.setAttribute('data-crop', prodData.name);
  }
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

// Action: Prefill Bulk Demand from Calculator
function prefillDemandFromCalculator() {
  const productSelect = document.getElementById('calc-product-select');
  const qtyInput = document.getElementById('calc-buyer-qty');
  const farmPriceInput = document.getElementById('calc-buyer-price');

  const prodKey = (productSelect && productSelect.value) || 'tomato';
  const prod = COMMODITY_CATALOG[prodKey] || COMMODITY_CATALOG.tomato;
  const rawQty = parseFloat((qtyInput && qtyInput.value) || 50);
  const rawPrice = parseFloat((farmPriceInput && farmPriceInput.value) || 12);

  // Switch to bulk demands tab and open modal
  switchView('view-bulk-demands');
  openPostDemandModal();

  // Prefill fields in modal
  setTimeout(() => {
    const modalCrop = document.getElementById('demand-crop-type');
    const modalQty = document.getElementById('demand-qty-kg');
    const modalPrice = document.getElementById('demand-target-price');

    if (modalCrop) modalCrop.value = prod.name;
    if (modalQty) modalQty.value = comprehensiveCalcState.qtyUnit === 'kg' ? rawQty : Math.round(rawQty * 100);
    if (modalPrice) modalPrice.value = comprehensiveCalcState.priceUnit === 'kg' ? rawPrice : (rawPrice / 100).toFixed(2);
  }, 100);
}

// Action: Filter Marketplace from Calculator Selection
function filterMarketplaceFromCalculator() {
  const productSelect = document.getElementById('calc-product-select');
  const prodKey = (productSelect && productSelect.value) || 'tomato';
  const prod = COMMODITY_CATALOG[prodKey] || COMMODITY_CATALOG.tomato;

  switchView('view-verified-produce');
  const searchInput = document.getElementById('marketplace-search-input');
  if (searchInput) {
    searchInput.value = prod.name.split(' ')[0];
    handleBuyerSearch(searchInput.value);
  }
}

// Action: Print / Export Procurement Cost Sheet
function printProcurementCostSheet() {
  window.print();
}

// Initialize Interactive Events
function initComprehensiveCalculator() {
  const qtyInput = document.getElementById('calc-buyer-qty');
  const farmPriceInput = document.getElementById('calc-buyer-price');
  const mandiPriceInput = document.getElementById('calc-mandi-benchmark-price');
  const distanceInput = document.getElementById('calc-buyer-distance');
  const vehicleSelect = document.getElementById('calc-buyer-vehicle');
  const mandiSelect = document.getElementById('calc-mandi-origin');
  const hubSelect = document.getElementById('calc-buyer-hub');
  const productSelect = document.getElementById('calc-product-select');
  const gradeSelect = document.getElementById('calc-product-grade');
  const packagingSelect = document.getElementById('calc-packaging-mode');
  const hamaliInput = document.getElementById('calc-hamali-rate');

  if (mandiSelect) mandiSelect.addEventListener('change', onMandiOrHubChange);
  if (hubSelect) hubSelect.addEventListener('change', onMandiOrHubChange);
  if (productSelect) productSelect.addEventListener('change', onProductOrGradeChange);
  if (gradeSelect) gradeSelect.addEventListener('change', onProductOrGradeChange);

  if (packagingSelect) {
    packagingSelect.addEventListener('change', () => {
      comprehensiveCalcState.manualPackagingOverride = true;
      recalculateBuyerCosts();
    });
  }

  if (qtyInput) qtyInput.addEventListener('input', recalculateBuyerCosts);
  if (farmPriceInput) {
    farmPriceInput.addEventListener('input', () => {
      comprehensiveCalcState.manualFarmPriceOverride = true;
      recalculateBuyerCosts();
    });
  }
  if (mandiPriceInput) {
    mandiPriceInput.addEventListener('input', () => {
      comprehensiveCalcState.manualMandiPriceOverride = true;
      recalculateBuyerCosts();
    });
  }
  if (distanceInput) {
    distanceInput.addEventListener('input', () => {
      comprehensiveCalcState.manualDistanceOverride = true;
      recalculateBuyerCosts();
    });
  }
  if (vehicleSelect) vehicleSelect.addEventListener('change', recalculateBuyerCosts);
  if (hamaliInput) hamaliInput.addEventListener('input', recalculateBuyerCosts);

  // Initial calculation trigger
  onMandiOrHubChange();
  recalculateBuyerCosts();
}

document.addEventListener('DOMContentLoaded', () => {
  initComprehensiveCalculator();
});
