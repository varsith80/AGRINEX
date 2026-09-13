/**
 * AgriNex - Wholesale Buyer Landed Cost & Margin Savings Calculator
 * Supports multiple units: Quintals (Qt), Kilograms (kg), and Metric Tonnes (MT)
 */

let calcState = {
  qtyUnit: 'qt', // 'qt', 'kg', 'mt'
  priceUnit: 'qt' // 'qt', 'kg'
};

function setCalcUnit(unit) {
  calcState.qtyUnit = unit;
  
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

  // Update input placeholder and step accordingly
  const qtyInput = document.getElementById('calc-buyer-qty');
  if (qtyInput) {
    const curr = parseFloat(qtyInput.value) || 50;
    if (unit === 'kg') {
      qtyInput.value = curr < 500 ? curr * 100 : curr;
      qtyInput.step = '100';
    } else if (unit === 'mt') {
      qtyInput.value = curr > 500 ? (curr / 1000).toFixed(1) : (curr / 10).toFixed(1);
      qtyInput.step = '0.5';
    } else {
      qtyInput.value = curr > 500 ? Math.round(curr / 100) : curr < 10 ? curr * 10 : curr;
      qtyInput.step = '5';
    }
  }

  recalculateBuyerCosts();
}

function setCalcPriceUnit(unit) {
  calcState.priceUnit = unit;
  
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

  const priceInput = document.getElementById('calc-buyer-price');
  if (priceInput) {
    const curr = parseFloat(priceInput.value) || 1200;
    if (unit === 'kg') {
      priceInput.value = curr > 100 ? (curr / 100).toFixed(2) : curr;
      priceInput.step = '0.5';
    } else {
      priceInput.value = curr < 100 ? Math.round(curr * 100) : curr;
      priceInput.step = '20';
    }
  }

  recalculateBuyerCosts();
}

function recalculateBuyerCosts() {
  const quantityInput = document.getElementById('calc-buyer-qty');
  const targetPriceInput = document.getElementById('calc-buyer-price');
  const distanceInput = document.getElementById('calc-buyer-distance');
  const vehicleSelect = document.getElementById('calc-buyer-vehicle');

  const purchaseCostEl = document.getElementById('calc-purchase-cost');
  const freightCostEl = document.getElementById('calc-freight-cost');
  const escrowFeeEl = document.getElementById('calc-escrow-fee');
  const landedCostEl = document.getElementById('calc-landed-total');
  const landedPerQtEl = document.getElementById('calc-landed-per-qt');
  const savingsVsMandiEl = document.getElementById('calc-savings-mandi');
  const priceHintEl = document.getElementById('calc-price-conversion-hint');

  if (!quantityInput || !targetPriceInput || !distanceInput || !vehicleSelect) return;

  const rawQty = parseFloat(quantityInput.value) || 50;
  const rawPrice = parseFloat(targetPriceInput.value) || 1200;
  const distanceKm = parseFloat(distanceInput.value) || 80;
  const vehicleType = vehicleSelect.value;

  // Normalize quantity into Quintals (Qt) and kg
  let qtyInQt = rawQty;
  let qtyInKg = rawQty * 100;
  if (calcState.qtyUnit === 'kg') {
    qtyInKg = rawQty;
    qtyInQt = rawQty / 100;
  } else if (calcState.qtyUnit === 'mt') {
    qtyInKg = rawQty * 1000;
    qtyInQt = rawQty * 10;
  }

  // Price per Quintal and Price per Kg
  let pricePerQt = rawPrice;
  let pricePerKg = rawPrice / 100;
  if (calcState.priceUnit === 'kg') {
    pricePerKg = rawPrice;
    pricePerQt = rawPrice * 100;
  }

  if (priceHintEl) {
    priceHintEl.textContent = calcState.priceUnit === 'kg' ? `= ₹ ${Math.round(pricePerQt).toLocaleString('en-IN')} /Qt` : `= ₹ ${pricePerKg.toFixed(2)} /kg`;
  }

  // Vehicle haulage rates
  let baseFare = 1200;
  let ratePerKm = 18;
  if (vehicleType === 'bolero') {
    baseFare = 1800;
    ratePerKm = 24;
  } else if (vehicleType === 'eicher') {
    baseFare = 3200;
    ratePerKm = 38;
  } else if (vehicleType === 'ev') {
    baseFare = 900;
    ratePerKm = 11.5;
  }

  // Farm Gate Purchase Cost
  const purchaseCost = Math.round(qtyInQt * pricePerQt);

  // Freight & Haulage
  const freightCost = Math.round(baseFare + (distanceKm * ratePerKm));

  // Direct Escrow Service Fee (0.75% fixed)
  const escrowFee = Math.round(purchaseCost * 0.0075);

  // Total Landed Cost
  const totalLandedCost = purchaseCost + freightCost + escrowFee;
  const landedPerQt = qtyInQt > 0 ? (totalLandedCost / qtyInQt).toFixed(1) : '0';
  const landedPerKg = qtyInKg > 0 ? (totalLandedCost / qtyInKg).toFixed(2) : '0';

  // Traditional Mandi Comparison (APMC commission ~6.5% + trader spread ~5% = +11.5% markup)
  const traditionalMandiCost = Math.round(purchaseCost * 1.115 + freightCost);
  const netSavings = Math.max(traditionalMandiCost - totalLandedCost, 0);

  // Update UI elements
  if (purchaseCostEl) {
    purchaseCostEl.innerHTML = `₹ ${purchaseCost.toLocaleString('en-IN')}<div style="font-size: 0.72rem; color: #64748b; font-weight: 600;">₹ ${pricePerKg.toFixed(2)}/kg • ${Math.round(qtyInKg).toLocaleString('en-IN')} kg</div>`;
  }
  if (freightCostEl) freightCostEl.textContent = `₹ ${freightCost.toLocaleString('en-IN')}`;
  if (escrowFeeEl) escrowFeeEl.textContent = `₹ ${escrowFee.toLocaleString('en-IN')}`;
  if (landedCostEl) landedCostEl.textContent = `₹ ${totalLandedCost.toLocaleString('en-IN')}`;
  if (landedPerQtEl) landedPerQtEl.textContent = `(₹ ${landedPerQt} / Qt • ₹ ${landedPerKg} / kg)`;
  if (savingsVsMandiEl) savingsVsMandiEl.textContent = `₹ ${netSavings.toLocaleString('en-IN')}`;
}

function initBuyerCalculator() {
  const quantityInput = document.getElementById('calc-buyer-qty');
  const targetPriceInput = document.getElementById('calc-buyer-price');
  const distanceInput = document.getElementById('calc-buyer-distance');
  const vehicleSelect = document.getElementById('calc-buyer-vehicle');

  if (quantityInput) quantityInput.addEventListener('input', recalculateBuyerCosts);
  if (targetPriceInput) targetPriceInput.addEventListener('input', recalculateBuyerCosts);
  if (distanceInput) distanceInput.addEventListener('input', recalculateBuyerCosts);
  if (vehicleSelect) vehicleSelect.addEventListener('change', recalculateBuyerCosts);

  recalculateBuyerCosts();
}

document.addEventListener('DOMContentLoaded', () => {
  initBuyerCalculator();
});


