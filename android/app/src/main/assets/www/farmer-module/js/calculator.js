/**
 * AgriNex Farmer Module - Profit Calculator Engine
 */

function calculateFarmerProfit() {
  const distanceInput = document.getElementById("calc-distance");
  const vehicleInput = document.getElementById("calc-vehicle");
  const fuelCostInput = document.getElementById("calc-fuel");
  const tollInput = document.getElementById("calc-toll");
  const profitDisplay = document.getElementById("calc-profit-display");
  const qtyDisplay = document.getElementById("calc-qty-display");

  if (!distanceInput || !fuelCostInput || !tollInput || !profitDisplay) return;

  const distance = parseFloat(distanceInput.value) || 0;
  const fuelPrice = parseFloat(fuelCostInput.value) || 0;
  const toll = parseFloat(tollInput.value) || 0;
  const vehicleType = vehicleInput ? vehicleInput.value : "mini_truck";

  // Vehicle fuel economy (km per liter) and standard payload capacity
  const vehicleSpecs = {
    mini_truck: { mileage: 12, capacityQt: 50, baseRent: 1200 },
    pickup: { mileage: 14, capacityQt: 35, baseRent: 900 },
    tractor: { mileage: 8, capacityQt: 80, baseRent: 1500 },
    heavy_truck: { mileage: 6, capacityQt: 150, baseRent: 2800 }
  };

  const spec = vehicleSpecs[vehicleType] || vehicleSpecs.mini_truck;

  // Assume standard benchmark commodity selling price for calculation (e.g. Tomato @ ₹1,250/Qt)
  const ratePerQt = 1250;
  const quantityQt = spec.capacityQt;
  const grossRevenue = ratePerQt * quantityQt; // e.g. 50 * 1250 = 62,500

  // Cost calculations
  const fuelUsed = (distance * 2) / spec.mileage; // Round trip
  const totalFuelCost = fuelUsed * fuelPrice;
  const mandiCess = grossRevenue * 0.015; // 1.5% mandi & platform handling
  const packagingLabor = quantityQt * 35; // ₹35/Qt
  const totalTransportCharges = spec.baseRent + totalFuelCost + toll;
  const totalDeductions = totalTransportCharges + mandiCess + packagingLabor;

  let netProfit = grossRevenue - totalDeductions;
  if (netProfit < 0) netProfit = 0;

  // Format currency in Indian numbering format
  const formattedProfit = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0
  }).format(Math.round(netProfit));

  profitDisplay.textContent = `₹ ${formattedProfit}`;
  if (qtyDisplay) {
    qtyDisplay.textContent = `/ ${quantityQt} Qt`;
  }
}

// Attach listener on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  const calcBtn = document.getElementById("btn-calculate-profit");
  if (calcBtn) {
    calcBtn.addEventListener("click", (e) => {
      e.preventDefault();
      calculateFarmerProfit();
    });
  }

  // Auto calculate on input changes
  const inputs = document.querySelectorAll("#calc-distance, #calc-vehicle, #calc-fuel, #calc-toll");
  inputs.forEach(input => {
    input.addEventListener("input", calculateFarmerProfit);
    input.addEventListener("change", calculateFarmerProfit);
  });
});
