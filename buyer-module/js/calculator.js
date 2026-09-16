/**
 * AgriNex - Comprehensive Wholesale Agricultural Landed Cost, Mandi Arbitrage & Freight Intelligence Engine
 * Grounded in Maharashtra APMC Mandi Benchmarks, Origin-Destination Logistics Routes, Fleet Selection, and Direct Farm Sourcing.
 */

// Route Distance Matrix between Major Maharashtra APMC Mandis & Regional Buyer Hubs (in km)
const MANDI_ROUTE_MATRIX = {
  lasalgaon: {
    name: 'Lasalgaon APMC (Nashik, MH)',
    state: 'MH',
    distances: {
      vashi_hub: 225,
      pune_dc: 215,
      nashik_hub: 55,
      nagpur_hub: 620,
      csn_hub: 145,
      kolhapur_hub: 435
    },
    mandiPrices: {
      onion: 18.5,
      tomato: 12.8,
      banana: 14.2,
      soybean: 41.5,
      orange: 37.0,
      turmeric: 132.0,
      pomegranate: 86.0,
      cotton: 61.0,
      grapes: 52.0,
      chilli: 35.0,
      jowar: 33.5,
      mango: 175.0
    }
  },
  pune: {
    name: 'Pune APMC - Gultekdi (Maharashtra)',
    state: 'MH',
    distances: {
      vashi_hub: 145,
      pune_dc: 15,
      nashik_hub: 210,
      nagpur_hub: 710,
      csn_hub: 235,
      kolhapur_hub: 230
    },
    mandiPrices: {
      tomato: 13.0,
      onion: 19.2,
      banana: 14.8,
      soybean: 42.0,
      orange: 38.5,
      turmeric: 134.0,
      pomegranate: 88.0,
      cotton: 62.0,
      grapes: 54.0,
      chilli: 36.0,
      jowar: 34.0,
      mango: 180.0
    }
  },
  pimpalgaon: {
    name: 'Pimpalgaon Baswant APMC (Nashik, MH)',
    state: 'MH',
    distances: {
      vashi_hub: 205,
      pune_dc: 230,
      nashik_hub: 32,
      nagpur_hub: 645,
      csn_hub: 165,
      kolhapur_hub: 450
    },
    mandiPrices: {
      onion: 18.2,
      tomato: 12.5,
      grapes: 50.0,
      pomegranate: 85.0,
      soybean: 41.0,
      banana: 14.0,
      orange: 37.5,
      turmeric: 131.0,
      cotton: 60.5,
      chilli: 34.5,
      jowar: 33.0,
      mango: 175.0
    }
  },
  manchar: {
    name: 'Manchar / Narayangaon APMC (Pune, MH)',
    state: 'MH',
    distances: {
      vashi_hub: 155,
      pune_dc: 65,
      nashik_hub: 145,
      nagpur_hub: 680,
      csn_hub: 200,
      kolhapur_hub: 290
    },
    mandiPrices: {
      tomato: 12.6,
      onion: 18.8,
      chilli: 35.0,
      banana: 14.5,
      pomegranate: 87.0,
      soybean: 41.5,
      orange: 38.0,
      turmeric: 133.0,
      cotton: 61.5,
      grapes: 53.0,
      jowar: 33.5,
      mango: 178.0
    }
  },
  jalgaon: {
    name: 'Jalgaon APMC (Khandesh, MH)',
    state: 'MH',
    distances: {
      vashi_hub: 410,
      pune_dc: 390,
      nashik_hub: 245,
      nagpur_hub: 440,
      csn_hub: 160,
      kolhapur_hub: 610
    },
    mandiPrices: {
      banana: 14.5,
      cotton: 62.5,
      soybean: 41.8,
      onion: 18.0,
      tomato: 12.8,
      orange: 36.5,
      turmeric: 130.0,
      pomegranate: 85.0,
      grapes: 51.0,
      chilli: 35.5,
      jowar: 34.0,
      mango: 172.0
    }
  },
  latur: {
    name: 'Latur Mega APMC (Marathwada, MH)',
    state: 'MH',
    distances: {
      vashi_hub: 480,
      pune_dc: 330,
      nashik_hub: 440,
      nagpur_hub: 460,
      csn_hub: 240,
      kolhapur_hub: 340
    },
    mandiPrices: {
      soybean: 42.0,
      turmeric: 133.0,
      jowar: 33.0,
      cotton: 61.0,
      onion: 18.4,
      tomato: 13.2,
      banana: 14.6,
      orange: 37.0,
      pomegranate: 87.0,
      grapes: 53.0,
      chilli: 35.0,
      mango: 175.0
    }
  },
  nagpur: {
    name: 'Nagpur APMC (Vidarbha, MH)',
    state: 'MH',
    distances: {
      vashi_hub: 810,
      pune_dc: 710,
      nashik_hub: 640,
      nagpur_hub: 15,
      csn_hub: 490,
      kolhapur_hub: 890
    },
    mandiPrices: {
      orange: 38.0,
      cotton: 63.0,
      soybean: 42.5,
      chilli: 36.5,
      onion: 19.5,
      tomato: 13.5,
      banana: 15.0,
      turmeric: 134.0,
      pomegranate: 89.0,
      grapes: 55.0,
      jowar: 34.5,
      mango: 182.0
    }
  },
  kolhapur: {
    name: 'Kolhapur Shahu Market Yard (MH)',
    state: 'MH',
    distances: {
      vashi_hub: 370,
      pune_dc: 230,
      nashik_hub: 440,
      nagpur_hub: 890,
      csn_hub: 460,
      kolhapur_hub: 12
    },
    mandiPrices: {
      chilli: 36.0,
      turmeric: 136.0,
      jowar: 34.2,
      tomato: 12.9,
      onion: 19.0,
      banana: 14.7,
      soybean: 41.8,
      orange: 38.0,
      pomegranate: 88.0,
      cotton: 61.5,
      grapes: 53.5,
      mango: 176.0
    }
  },
  solapur: {
    name: 'Solapur APMC (Western MH)',
    state: 'MH',
    distances: {
      vashi_hub: 395,
      pune_dc: 250,
      nashik_hub: 410,
      nagpur_hub: 610,
      csn_hub: 310,
      kolhapur_hub: 235
    },
    mandiPrices: {
      pomegranate: 88.0,
      jowar: 33.5,
      onion: 18.2,
      chilli: 35.5,
      tomato: 13.0,
      banana: 14.5,
      soybean: 41.5,
      orange: 37.5,
      turmeric: 133.0,
      cotton: 61.0,
      grapes: 52.5,
      mango: 175.0
    }
  },
  sangli: {
    name: 'Sangli APMC (Turmeric & Raisins Yard, MH)',
    state: 'MH',
    distances: {
      vashi_hub: 380,
      pune_dc: 235,
      nashik_hub: 445,
      nagpur_hub: 870,
      csn_hub: 450,
      kolhapur_hub: 48
    },
    mandiPrices: {
      turmeric: 135.0,
      grapes: 52.0,
      pomegranate: 87.5,
      onion: 18.6,
      tomato: 12.8,
      banana: 14.6,
      soybean: 41.7,
      orange: 37.8,
      cotton: 61.2,
      chilli: 35.8,
      jowar: 34.0,
      mango: 174.0
    }
  },
  ahmednagar: {
    name: 'Ahmednagar / Rahuri APMC (MH)',
    state: 'MH',
    distances: {
      vashi_hub: 245,
      pune_dc: 125,
      nashik_hub: 155,
      nagpur_hub: 610,
      csn_hub: 115,
      kolhapur_hub: 350
    },
    mandiPrices: {
      pomegranate: 86.5,
      onion: 18.4,
      tomato: 12.7,
      soybean: 41.5,
      banana: 14.4,
      orange: 37.2,
      turmeric: 132.0,
      cotton: 61.0,
      grapes: 52.0,
      chilli: 35.2,
      jowar: 33.8,
      mango: 176.0
    }
  },
  amravati: {
    name: 'Amravati APMC (Cotton & Soy Yard, MH)',
    state: 'MH',
    distances: {
      vashi_hub: 660,
      pune_dc: 560,
      nashik_hub: 490,
      nagpur_hub: 155,
      csn_hub: 340,
      kolhapur_hub: 740
    },
    mandiPrices: {
      cotton: 62.0,
      soybean: 42.0,
      orange: 37.5,
      chilli: 36.0,
      onion: 19.0,
      tomato: 13.2,
      banana: 14.8,
      turmeric: 133.5,
      pomegranate: 88.5,
      grapes: 54.0,
      jowar: 34.2,
      mango: 180.0
    }
  },
  ratnagiri: {
    name: 'Ratnagiri APMC (Konkan Mango & Cashew, MH)',
    state: 'MH',
    distances: {
      vashi_hub: 325,
      pune_dc: 300,
      nashik_hub: 480,
      nagpur_hub: 980,
      csn_hub: 530,
      kolhapur_hub: 130
    },
    mandiPrices: {
      mango: 180.0,
      chilli: 37.0,
      banana: 15.2,
      onion: 19.8,
      tomato: 13.6,
      soybean: 42.5,
      orange: 39.0,
      turmeric: 135.0,
      pomegranate: 90.0,
      cotton: 63.0,
      grapes: 56.0,
      jowar: 35.0
    }
  },
  vashi: {
    name: 'Vashi APMC Terminal (Navi Mumbai, MH)',
    state: 'MH',
    distances: {
      vashi_hub: 10,
      pune_dc: 145,
      nashik_hub: 175,
      nagpur_hub: 810,
      csn_hub: 340,
      kolhapur_hub: 375
    },
    mandiPrices: {
      onion: 20.5,
      tomato: 15.0,
      banana: 16.8,
      soybean: 47.5,
      orange: 44.0,
      turmeric: 152.0,
      pomegranate: 102.0,
      cotton: 69.5,
      grapes: 62.0,
      chilli: 42.0,
      jowar: 38.0,
      mango: 210.0
    }
  }
};

// Commodity Intelligence & Perishability Factors for Maharashtra Staples
const COMMODITY_CATALOG = {
  onion: {
    name: 'Red Onion (Nashik Garwa Quality)',
    category: 'Vegetables',
    defaultMandi: 18.50,
    perishability: 'low',
    ambientTransitLossRate: 0.012,
    reeferTransitLossRate: 0.004,
    defaultPackaging: 'gunny',
    icon: '🧅'
  },
  tomato: {
    name: 'Tomato (Pune Junnar / Narayangaon Hybrid)',
    category: 'Vegetables',
    defaultMandi: 13.00,
    perishability: 'high',
    ambientTransitLossRate: 0.038,
    reeferTransitLossRate: 0.005,
    defaultPackaging: 'crates',
    icon: '🍅'
  },
  banana: {
    name: 'Grand Naine Banana (Jalgaon GI Khandesh)',
    category: 'Fruits',
    defaultMandi: 14.50,
    perishability: 'high',
    ambientTransitLossRate: 0.042,
    reeferTransitLossRate: 0.008,
    defaultPackaging: 'crates',
    icon: '🍌'
  },
  soybean: {
    name: 'Yellow Soybean (JS 335 / Latur Mega APMC)',
    category: 'Grains & Cereals',
    defaultMandi: 42.00,
    perishability: 'zero',
    ambientTransitLossRate: 0.000,
    reeferTransitLossRate: 0.000,
    defaultPackaging: 'gunny',
    icon: '🌾'
  },
  orange: {
    name: 'Nagpur Orange / Santra (GI Vidarbha Quality)',
    category: 'Fruits',
    defaultMandi: 38.00,
    perishability: 'medium',
    ambientTransitLossRate: 0.025,
    reeferTransitLossRate: 0.005,
    defaultPackaging: 'crates',
    icon: '🍊'
  },
  turmeric: {
    name: 'Sangli Rajapuri Turmeric Finger (High Curcumin)',
    category: 'Spices & High-Value',
    defaultMandi: 135.00,
    perishability: 'zero',
    ambientTransitLossRate: 0.001,
    reeferTransitLossRate: 0.001,
    defaultPackaging: 'gunny',
    icon: '🌿'
  },
  pomegranate: {
    name: 'Bhagwa Pomegranate (Solapur Export Grade)',
    category: 'Fruits',
    defaultMandi: 88.00,
    perishability: 'medium',
    ambientTransitLossRate: 0.018,
    reeferTransitLossRate: 0.004,
    defaultPackaging: 'boxes',
    icon: '🍈'
  },
  cotton: {
    name: 'Raw Cotton (Vidarbha / Khandesh Long Staple)',
    category: 'Cash Crops',
    defaultMandi: 62.00,
    perishability: 'zero',
    ambientTransitLossRate: 0.000,
    reeferTransitLossRate: 0.000,
    defaultPackaging: 'gunny',
    icon: '☁️'
  },
  grapes: {
    name: 'Thompson Seedless Grapes (Nashik / Sangli)',
    category: 'Fruits',
    defaultMandi: 52.00,
    perishability: 'high',
    ambientTransitLossRate: 0.045,
    reeferTransitLossRate: 0.006,
    defaultPackaging: 'boxes',
    icon: '🍇'
  },
  chilli: {
    name: 'Green Chilli (Kolhapur Jwala / G4 Spicy)',
    category: 'Spices & High-Value',
    defaultMandi: 36.00,
    perishability: 'medium',
    ambientTransitLossRate: 0.028,
    reeferTransitLossRate: 0.006,
    defaultPackaging: 'boxes',
    icon: '🌶️'
  },
  jowar: {
    name: 'Maldandi Jowar / Sorghum (Solapur Shalu)',
    category: 'Grains & Cereals',
    defaultMandi: 33.50,
    perishability: 'zero',
    ambientTransitLossRate: 0.000,
    reeferTransitLossRate: 0.000,
    defaultPackaging: 'gunny',
    icon: '🌾'
  },
  mango: {
    name: 'Alphonso Mango (Ratnagiri / Devgad Hapus)',
    category: 'Fruits',
    defaultMandi: 180.00,
    perishability: 'high',
    ambientTransitLossRate: 0.040,
    reeferTransitLossRate: 0.006,
    defaultPackaging: 'boxes',
    icon: '🥭'
  }
};

// Logistics Fleet Specs
const FLEET_TYPES = {
  tata: {
    name: 'Tata Ace Mini (15 Qt / 1,500 kg)',
    capacityKg: 1500,
    baseFare: 1200,
    ratePerKm: 18.0,
    tollBase: 120,
    isReefer: false
  },
  dost: {
    name: 'Ashok Leyland Dost (25 Qt / 2,500 kg)',
    capacityKg: 2500,
    baseFare: 1800,
    ratePerKm: 22.0,
    tollBase: 180,
    isReefer: false
  },
  bolero: {
    name: 'Mahindra Bolero Maxi (30 Qt / 3,000 kg)',
    capacityKg: 3000,
    baseFare: 2200,
    ratePerKm: 25.0,
    tollBase: 220,
    isReefer: false
  },
  eicher: {
    name: 'Eicher Pro 1110 (75 Qt / 7,500 kg)',
    capacityKg: 7500,
    baseFare: 4000,
    ratePerKm: 34.0,
    tollBase: 450,
    isReefer: false
  },
  bharatbenz: {
    name: 'BharatBenz Heavy (160 Qt / 16,000 kg)',
    capacityKg: 16000,
    baseFare: 6500,
    ratePerKm: 48.0,
    tollBase: 950,
    isReefer: false
  },
  reefer: {
    name: '❄️ Cold-Chain Reefer Truck (80 Qt / 8,000 kg)',
    capacityKg: 8000,
    baseFare: 7000,
    ratePerKm: 52.0,
    tollBase: 500,
    isReefer: true
  },
  ev: {
    name: '⚡ Euler EV Cargo (12 Qt / 1,200 kg)',
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
  priceUnit: 'kg', // 'qt', 'kg'
  selectedMandiKey: 'lasalgaon',
  selectedHubKey: 'vashi_hub',
  selectedProductKey: 'onion',
  selectedGrade: 'grade_a', // 'grade_a', 'grade_b', 'grade_c'
  selectedVehicleKey: 'tata',
  selectedPackagingKey: 'gunny',
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
  const mandiSelect = document.getElementById('calc-buyer-origin') || document.getElementById('calc-mandi-origin');
  const hubSelect = document.getElementById('calc-buyer-destination') || document.getElementById('calc-buyer-hub');
  const distanceInput = document.getElementById('calc-buyer-distance');
  const routeBadge = document.getElementById('calc-route-duration-hint') || document.getElementById('calc-route-badge');

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
      const estHours = Math.round(distanceKm / 45);
      routeBadge.textContent = `⏱️ ~${estHours}h transit via Highway • ${distanceKm} km Route`;
    }
  }

  // Update Mandi Benchmark Price for selected product in this Mandi
  updateMandiPriceForSelection();
  recalculateBuyerCosts();
}

// On Commodity or Grade Change
function onProductOrGradeChange() {
  const productSelect = document.getElementById('calc-buyer-produce') || document.getElementById('calc-product-select');
  const gradeSelect = document.getElementById('calc-buyer-grade') || document.getElementById('calc-product-grade');
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
  const mandiData = MANDI_ROUTE_MATRIX[mandiKey] || MANDI_ROUTE_MATRIX.lasalgaon;
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

  const curLang = (window.AgriNexI18n && typeof window.AgriNexI18n.getBuyerLanguage === 'function') ? window.AgriNexI18n.getBuyerLanguage() : 'en';
  const lowerCostSuffix = (curLang === 'mr') ? '% कमी खर्च' : (curLang === 'hi') ? '% कम लागत' : '% Lower Cost';
  const savedSuffix = (curLang === 'mr') ? '/कि.ग्रॅ. बचत' : (curLang === 'hi') ? '/किग्रा बचत' : '/kg Saved';
  const kgSuffix = (curLang === 'mr') ? ' /कि.ग्रॅ.' : (curLang === 'hi') ? ' /किग्रा' : ' /kg';

  if (directTotalEl) directTotalEl.textContent = `₹ ${directTotalLandedCost.toLocaleString('en-IN')}`;
  if (directPerKgEl) directPerKgEl.textContent = `₹ ${directLandedPerKg}${kgSuffix}`;
  if (mandiTotalEl) mandiTotalEl.textContent = `₹ ${traditionalTotalLandedCost.toLocaleString('en-IN')}`;
  if (mandiPerKgEl) mandiPerKgEl.textContent = `₹ ${traditionalLandedPerKg}${kgSuffix}`;
  if (netSavingsEl) netSavingsEl.textContent = `₹ ${netSavings.toLocaleString('en-IN')}`;
  if (netSavingsPctEl) netSavingsPctEl.textContent = `${netSavingsPct}${lowerCostSuffix}`;
  if (perKgSavingsEl) perKgSavingsEl.textContent = `₹ ${savingsPerKg} ${savedSuffix}`;

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

// Action: Prefill Post Demand Modal from Calculator Selection
function prefillDemandFromCalculator() {
  const productSelect = document.getElementById('calc-buyer-produce') || document.getElementById('calc-product-select');
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
    const modalCrop = document.getElementById('demand-crop');
    const modalQty = document.getElementById('demand-tonnage');
    const modalUnit = document.getElementById('demand-unit');
    const modalPrice = document.getElementById('demand-price');
    const modalPriceUnit = document.getElementById('demand-price-unit');

    if (modalCrop) {
      for (let opt of modalCrop.options) {
        if (opt.value.toLowerCase().includes(prod.name.toLowerCase().split(' ')[0])) {
          modalCrop.value = opt.value;
          break;
        }
      }
    }
    if (modalQty) modalQty.value = rawQty;
    if (modalUnit) modalUnit.value = comprehensiveCalcState.qtyUnit === 'kg' ? 'kg' : 'Qt';
    if (modalPrice) {
      if (modalPriceUnit && modalPriceUnit.value === 'kg') {
        modalPrice.value = comprehensiveCalcState.priceUnit === 'kg' ? rawPrice : (rawPrice / 100).toFixed(2);
      } else {
        modalPrice.value = comprehensiveCalcState.priceUnit === 'kg' ? Math.round(rawPrice * 100) : rawPrice;
      }
    }
    if (typeof updateDemandPricePreview === 'function') {
      updateDemandPricePreview();
    }
  }, 100);
}

// Action: Filter Marketplace from Calculator Selection
function filterMarketplaceFromCalculator() {
  const productSelect = document.getElementById('calc-buyer-produce') || document.getElementById('calc-product-select');
  const prodKey = (productSelect && productSelect.value) || 'tomato';
  const prod = COMMODITY_CATALOG[prodKey] || COMMODITY_CATALOG.tomato;

  switchView('view-verified-produce');
  const searchInput = document.getElementById('marketplace-search-input') || document.getElementById('buyer-global-search');
  if (searchInput) {
    searchInput.value = prod.name.split(' ')[0];
    if (typeof handleBuyerSearch === 'function') {
      handleBuyerSearch(searchInput.value);
    }
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
  const mandiSelect = document.getElementById('calc-buyer-origin') || document.getElementById('calc-mandi-origin');
  const hubSelect = document.getElementById('calc-buyer-destination') || document.getElementById('calc-buyer-hub');
  const productSelect = document.getElementById('calc-buyer-produce') || document.getElementById('calc-product-select');
  const gradeSelect = document.getElementById('calc-buyer-grade') || document.getElementById('calc-product-grade');
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

// Global Window Exports
window.recalculateBuyerCosts = recalculateBuyerCosts;
window.setCalcUnit = setCalcUnit;
window.setCalcPriceUnit = setCalcPriceUnit;
window.prefillDemandFromCalculator = prefillDemandFromCalculator;
window.filterMarketplaceFromCalculator = filterMarketplaceFromCalculator;
window.printProcurementCostSheet = printProcurementCostSheet;
window.initComprehensiveCalculator = initComprehensiveCalculator;

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initComprehensiveCalculator);
} else {
  initComprehensiveCalculator();
}

