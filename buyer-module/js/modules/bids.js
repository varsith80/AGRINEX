/**
 * AgriNex Buyer Module - Bidding & Direct Buyout Engine
 * Handles direct buyout execution, counter-bids, and WhatsApp negotiation simulation.
 */

function executeBuyerLotPurchase(lotId, customPricePerKg = null, customQtyKg = null, paymentDetails = null) {
  if (!buyerData.verifiedLots) return null;
  const lot = buyerData.verifiedLots.find(l => l.id === lotId) || buyerData.verifiedLots[0];
  if (!lot) return null;

  const priceKg = customPricePerKg !== null ? parseFloat(customPricePerKg) : (lot.pricePerKg || (lot.priceNum ? lot.priceNum / 100 : 18.0));
  const availableBefore = (lot.availableQtyKg !== undefined) ? parseFloat(lot.availableQtyKg) : (lot.qtyNum ? lot.qtyNum * 100 : 5000);
  const qtyKg = customQtyKg !== null ? Math.min(parseFloat(customQtyKg), availableBefore) : availableBefore;
  const remainingQty = Math.max(0, availableBefore - qtyKg);
  const qtyQt = parseFloat((qtyKg / 100).toFixed(1));
  const totalVal = Math.round(priceKg * qtyKg);
  const advAmount = Math.round(totalVal * 0.35);
  const balAmount = totalVal - advAmount;

  const randSuffix = Math.floor(1000 + Math.random() * 9000);
  const contractNo = paymentDetails?.contractNo || `ESC-MH-${randSuffix}`;
  const trackingId = `TRK-MH-${(lot.id || 'LOT').replace(/[^a-zA-Z0-9]/g, '')}-${randSuffix}`;
  const gatePass = `GP-2026-${randSuffix}-MH`;

  // 1. Mark Lot as purchased & adjust remaining volume
  lot.availableQtyKg = remainingQty;
  lot.isPurchased = true;
  lot.purchasedBy = "my-account";
  lot.purchasedByName = "Karthik Sundaram (BigBasket)";
  lot.purchasedQtyKg = (lot.purchasedQtyKg || 0) + qtyKg;

  if (remainingQty === 0) {
    lot.isSoldOut = true;
    lot.status = "🚫 Sold Out (In Transit)";
    lot.statusBadgeClass = "badge-status-sold";
  } else {
    lot.status = `✅ Partially Procured (${remainingQty.toLocaleString('en-IN')} kg left)`;
  }
  lot.purchasedAt = new Date().toISOString();
  lot.trackingId = trackingId;
  lot.contractNo = contractNo;

  try {
    localStorage.setItem('agrinex_verified_lots', JSON.stringify(buyerData.verifiedLots));
  } catch(e) {}

  // 2. Create and Prepend Consignment
  const newConsignment = {
    id: trackingId,
    tracking_id: trackingId,
    lot_id: lot.id,
    contract_no: contractNo,
    crop: `${lot.crop} (${lot.grade || 'Grade A'})`,
    quantity_qt: qtyQt,
    quantity_kg: qtyKg,
    farmer: lot.farmerName,
    farmer_phone: lot.farmerPhone || '+91 98220-44911',
    farmer_origin: lot.farmerLocation,
    destination: "BigBasket Distribution Terminal, Vashi / Navi Mumbai",
    driver: "Sanjay Patil",
    driver_phone: "+91 98220 44911",
    transporter: "Sahyadri Agro Logistics Lines",
    dl_no: "DL-MH-15-2022-4412",
    vehicle: "Eicher Pro 2049 (MH 15 DK 8810)",
    capacity: `${qtyQt} Qt Reefer`,
    fastag: "Active (₹ 2,800 Balance)",
    gps_device_id: `GPS-AIS140-${Math.floor(10000 + Math.random() * 90000)}`,
    temp: lot.isEmergency ? "14.5°C (Controlled Cold-Chain)" : "14.5°C (Controlled)",
    status: "transit",
    status_label: lot.isEmergency ? "On The Road (High-Priority Reefer)" : "On The Road",
    step: 3,
    loc: `${lot.farmerLocation} ➔ Central DC (${lot.isEmergency ? 'Express Salvage Dispatched' : 'Dispatched'})`,
    eta: lot.isEmergency ? "Today 3:30 PM (Perishable Rush)" : "Today 4:45 PM (Speed: 56 km/h)",
    total_val: totalVal,
    adv_paid: advAmount,
    advance_paid: advAmount,
    balance_due: balAmount,
    assay_moisture: lot.moisture || "13.2% (Certified)",
    gross_wt: `${qtyKg + 3400} kg`,
    tare_wt: "3,400 kg",
    gate_seal: `#SEAL-${Math.floor(10000 + Math.random() * 90000)}`,
    isEmergency: !!lot.isEmergency
  };

  if (!buyerData.consignments) buyerData.consignments = [];
  buyerData.consignments.unshift(newConsignment);
  try {
    localStorage.setItem('agrinex_buyer_consignments', JSON.stringify(buyerData.consignments));
  } catch(e) {}

  // Deduct 35% Advance from Available Liquidity & add to Locked Advance in buyerEscrowState
  if (window.buyerEscrowState) {
    if (window.buyerEscrowState.availableLiquidity >= advAmount) {
      window.buyerEscrowState.availableLiquidity -= advAmount;
    }
    const currentAdv = window.buyerEscrowState.advanceLocked || window.buyerEscrowState.lockedAdvance || 0;
    window.buyerEscrowState.advanceLocked = currentAdv + advAmount;
    window.buyerEscrowState.lockedAdvance = window.buyerEscrowState.advanceLocked;
    try {
      localStorage.setItem('agrinex_buyer_escrow', JSON.stringify(window.buyerEscrowState));
    } catch(e) {}
    if (typeof updateEscrowVaultDOM === 'function') updateEscrowVaultDOM();
  }

  // 3. Record Immutable Escrow Payment Record
  const now = new Date();
  const paymentRecord = {
    payment_id: paymentDetails?.txnId || `TXN-ESC-${randSuffix}-A`,
    contract_no: contractNo,
    tracking_id: trackingId,
    lot_id: lot.id,
    crop: `${lot.crop} (${lot.grade || 'Grade A'})`,
    quantity_kg: qtyKg,
    quantity_qt: qtyQt,
    farmer_name: lot.farmerName,
    farmer_phone: lot.farmerPhone || '+91 98220-44911',
    farmer_location: lot.farmerLocation || 'Maharashtra Regional Mandi',
    farmer_bank_acc: `HDFC A/C ••${Math.floor(1000 + Math.random() * 9000)} (${(lot.farmerLocation || 'Lasalgaon').split(',')[0]} Branch)`,
    total_val: totalVal,
    adv_paid: advAmount,
    balance_due: balAmount,
    tranche_type: 'advance',
    payment_rail: paymentDetails?.railName || 'UPI 2.0 (Dynamic QR)',
    gateway_txn_id: paymentDetails?.txnId || `TXN_AGR_${Math.floor(10000000 + Math.random() * 90000000)}`,
    bank_utr: paymentDetails?.utr || `ICICR52026091800${Math.floor(100 + Math.random() * 900)}`,
    escrow_cert: paymentDetails?.certNo || `ESC-CERT-MH-${randSuffix}`,
    status: 'ESCROW_LOCKED_35',
    status_label: '35% Advance Locked',
    created_at: now.toISOString(),
    date_formatted: now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  };

  if (!buyerData.payments) buyerData.payments = [];
  buyerData.payments.unshift(paymentRecord);
  try {
    localStorage.setItem('agrinex_buyer_payments', JSON.stringify(buyerData.payments));
  } catch(e) {}

  // 4. Re-render Escrow Vault
  try {
    renderBuyerEscrowVault();
  } catch(e) {}

  // 5. Update Grievances Dropdown
  const grvSelect = document.getElementById('grv-lot-select');
  if (grvSelect) {
    const opt = document.createElement('option');
    opt.value = `${lot.id}|${lot.crop}|${lot.farmerName}`;
    opt.textContent = `${lot.crop} - #${contractNo} (${lot.farmerName})`;
    grvSelect.appendChild(opt);
  }

  // 6. Update Messages / Chat thread
  if (window.chatContacts) {
    let contact = window.chatContacts.find(c => (c.name && c.name.includes(lot.farmerName)) || (c.lotId && c.lotId === lot.id));
    if (contact) {
      contact.messages.push({
        type: "outgoing",
        text: `🎉 Order Confirmed! Locked 35% advance escrow (₹ ${advAmount.toLocaleString('en-IN')}) for ${lot.crop} (${qtyKg.toLocaleString('en-IN')} kg) under Contract #${contractNo}. Consignment #${trackingId} is dispatched.`
      });
      if (typeof renderChatMessages === 'function') renderChatMessages();
    }
  }

  // 7. Update All Displays
  updateBuyerMarketStats();
  if (typeof renderBuyerConsignments === 'function') renderBuyerConsignments();
  if (typeof renderVerifiedLots === 'function') renderVerifiedLots();
  if (typeof renderBuyerEscrowVault === 'function') renderBuyerEscrowVault();
  if (typeof renderLiteProduceCards === 'function') renderLiteProduceCards();
  if (typeof renderLiteOrdersCards === 'function') renderLiteOrdersCards();
  if (typeof renderLiteEscrowCards === 'function') renderLiteEscrowCards();

  // 8. Backend Sync
  if (window.apiClient) {
    window.apiClient.directBuy({
      lot_id: lot.id,
      crop: lot.crop,
      grade: lot.grade || 'Grade A',
      farmer_name: lot.farmerName,
      qty_kg: qtyKg,
      rate_kg: priceKg,
      buyer_name: lot.purchasedByName || "Karthik Sundaram (BigBasket)"
    }).catch(e => console.warn('[AgriNex] directBuy offline fallback', e));
  }

  try {
    window.dispatchEvent(new Event('storage'));
  } catch(e) {}

  return newConsignment;
}

function openDirectBuyModal(lotId) {
  const lot = buyerData.verifiedLots.find((l) => l.id === lotId) || buyerData.verifiedLots[0];
  const modal = document.getElementById('modal-direct-buy');
  if (!modal || !lot) return;

  const availKg = (lot.availableQtyKg !== undefined) ? parseFloat(lot.availableQtyKg) : (lot.qtyNum ? lot.qtyNum * 100 : 5000);
  const kgRate = lot.pricePerKg || (lot.priceNum ? lot.priceNum / 100 : 12.0);

  const cropEl = document.getElementById('buy-modal-crop');
  const farmerEl = document.getElementById('buy-modal-farmer');
  const priceEl = document.getElementById('buy-modal-price');
  const lotIdInput = document.getElementById('buy-modal-lot-id');
  const thumbEl = document.getElementById('buy-modal-thumb');
  const allKgLabel = document.getElementById('buy-modal-all-kg-label');
  const availBadge = document.getElementById('buy-modal-avail-badge');
  const customInput = document.getElementById('buy-custom-qty-kg');
  const modeAll = document.getElementById('buy-mode-all');

  if (cropEl) cropEl.textContent = `${lot.crop} (${lot.quantity || availKg.toLocaleString('en-IN') + ' kg'})`;
  if (farmerEl) farmerEl.textContent = `Farmer: ${lot.farmerName} • 📍 ${lot.farmerLocation}`;
  if (priceEl) priceEl.innerHTML = `${lot.askPrice || '₹ ' + kgRate + ' /kg'} <span style="font-size: 0.8rem; background: #e8f5ed; color: #166534; padding: 2px 6px; border-radius: 4px; border: 1px solid #bbf7d0;">(₹ ${kgRate.toFixed(2)} /kg)</span>`;
  if (lotIdInput) lotIdInput.value = lot.id;
  if (thumbEl) thumbEl.src = lot.image || 'assets/images/tomato.jpg';
  if (allKgLabel) allKgLabel.textContent = `${availKg.toLocaleString('en-IN')} kg`;
  if (availBadge) availBadge.textContent = `Available: ${availKg.toLocaleString('en-IN')} kg`;
  if (customInput) {
    customInput.max = availKg;
    customInput.value = Math.min(availKg, 1000);
  }
  if (modeAll) modeAll.checked = true;

  updateDirectBuyCalculations();

  // Wire submit handler to form and button
  const form = document.getElementById('form-direct-buy');
  if (form && !form.__wired) {
    form.__wired = true;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      submitDirectBuy(e);
    });
  }
  const submitBtn = document.getElementById('btn-submit-direct-buy');
  if (submitBtn && !submitBtn.__wired) {
    submitBtn.__wired = true;
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      submitDirectBuy(e);
    });
  }

  modal.classList.add('active');
}

function updateDirectBuyCalculations() {
  const lotId = document.getElementById('buy-modal-lot-id')?.value;
  const lot = (buyerData.verifiedLots && buyerData.verifiedLots.find(l => l.id === lotId)) || (buyerData.verifiedLots && buyerData.verifiedLots[0]);
  if (!lot) return;

  const kgRate = lot.pricePerKg || (lot.priceNum ? lot.priceNum / 100 : 12.0);
  const availKg = (lot.availableQtyKg !== undefined) ? parseFloat(lot.availableQtyKg) : (lot.qtyNum ? lot.qtyNum * 100 : 5000);

  const isModeAll = document.getElementById('buy-mode-all')?.checked;
  const customInput = document.getElementById('buy-custom-qty-kg');

  let targetQty = availKg;
  if (!isModeAll && customInput) {
    let entered = parseFloat(customInput.value);
    if (isNaN(entered) || entered <= 0) entered = Math.min(1000, availKg);
    if (entered > availKg) {
      entered = availKg;
      customInput.value = availKg;
    }
    targetQty = entered;
  }

  const remaining = Math.max(0, availKg - targetQty);
  const totalVal = Math.round(targetQty * kgRate);
  const advAmount = Math.round(totalVal * 0.35);

  const calcQty = document.getElementById('buy-modal-calc-qty');
  const calcTotal = document.getElementById('buy-modal-calc-total');
  const calcAdv = document.getElementById('buy-modal-calc-advance');
  const calcRemaining = document.getElementById('buy-modal-calc-remaining');
  const submitBtn = document.getElementById('btn-submit-direct-buy');

  if (calcQty) calcQty.textContent = `${targetQty.toLocaleString('en-IN')} kg (${(targetQty / 100).toFixed(1)} Qt)`;
  if (calcTotal) calcTotal.textContent = `₹ ${totalVal.toLocaleString('en-IN')}`;
  if (calcAdv) calcAdv.textContent = `₹ ${advAmount.toLocaleString('en-IN')}`;

  if (calcRemaining) {
    if (remaining === 0) {
      calcRemaining.innerHTML = `<span style="color:#dc2626; font-weight:800;">0 kg (🚫 Will be SOLD OUT for other buyers)</span>`;
    } else {
      calcRemaining.innerHTML = `<span style="color:#0c5a36; font-weight:700;">${remaining.toLocaleString('en-IN')} kg still available for others</span>`;
    }
  }

  if (submitBtn) {
    if (remaining === 0) {
      submitBtn.textContent = `🔒 Lock 35% Escrow (₹ ${advAmount.toLocaleString('en-IN')}) & Procure All`;
    } else {
      submitBtn.textContent = `🔒 Lock 35% Escrow (₹ ${advAmount.toLocaleString('en-IN')}) for ${targetQty.toLocaleString('en-IN')} kg`;
    }
  }
}
window.updateDirectBuyCalculations = updateDirectBuyCalculations;

function closeDirectBuyModal() {
  const modal = document.getElementById('modal-direct-buy');
  if (modal) modal.classList.remove('active');
}

function submitDirectBuy(e) {
  if (e) {
    if (typeof e.preventDefault === 'function') e.preventDefault();
    if (typeof e.stopPropagation === 'function') e.stopPropagation();
  }

  const lotId = document.getElementById('buy-modal-lot-id')?.value;
  const lot = (buyerData.verifiedLots && buyerData.verifiedLots.find(l => l.id === lotId)) || (buyerData.verifiedLots && buyerData.verifiedLots[0]);
  if (!lot) {
    if (typeof showToast === 'function') showToast('Error: Selected lot details not found.', 'error');
    return false;
  }

  const isModeAll = document.getElementById('buy-mode-all')?.checked;
  const customInput = document.getElementById('buy-custom-qty-kg');
  const availKg = (lot.availableQtyKg !== undefined) ? parseFloat(lot.availableQtyKg) : (lot.qtyNum ? lot.qtyNum * 100 : 5000);
  const kgRate = lot.pricePerKg || (lot.priceNum ? lot.priceNum / 100 : 12.0);

  let targetQty = availKg;
  if (!isModeAll && customInput) {
    let entered = parseFloat(customInput.value);
    if (isNaN(entered) || entered <= 0) entered = Math.min(1000, availKg);
    if (entered > availKg) {
      entered = availKg;
      customInput.value = availKg;
    }
    targetQty = entered;
  }

  const totalVal = Math.round(targetQty * kgRate);
  const advAmount = Math.round(totalVal * 0.35);
  const balAmount = totalVal - advAmount;

  closeDirectBuyModal();

  const orderData = {
    lotId: lot.id,
    crop: lot.crop,
    grade: lot.grade || 'Grade A',
    farmerName: lot.farmerName,
    farmerLocation: lot.farmerLocation || 'Regional APMC, Maharashtra',
    farmerPhone: lot.farmerPhone || '+91 98220-44911',
    qtyKg: targetQty,
    qtyQt: parseFloat((targetQty / 100).toFixed(1)),
    rateKg: kgRate,
    totalVal: totalVal,
    advAmount: advAmount,
    balAmount: balAmount,
    isEmergency: !!lot.isEmergency
  };

  if (typeof openEscrowPaymentGateway === 'function' && document.getElementById('modal-escrow-payment-gateway')) {
    openEscrowPaymentGateway(orderData);
  } else {
    // Immediate fallback execution if gateway modal not mounted
    executeBuyerLotPurchase(lot.id, kgRate, targetQty);
    if (typeof showToast === 'function') {
      showToast(`🎉 35% Escrow (₹ ${advAmount.toLocaleString('en-IN')}) locked! Consignment dispatched.`, 'success');
    }
    if (typeof switchView === 'function') {
      switchView('view-consignments');
    }
  }

  return false;
}
window.submitDirectBuy = submitDirectBuy;

// Delegate document-level submit for dynamically loaded modals
document.addEventListener('submit', (e) => {
  if (e.target && e.target.id === 'form-direct-buy') {
    e.preventDefault();
    submitDirectBuy(e);
  }
});

// ==========================================
// FEATURE 6: BID COUNTER-NEGOTIATION WORKFLOW
// ==========================================

// Open Counter Bid Modal with dynamic KG price preview
function openBidModal(lotId) {
  const lot = buyerData.verifiedLots.find((l) => l.id === lotId) || buyerData.verifiedLots[0];
  const modal = document.getElementById('modal-counter-bid');
  if (!modal) return;

  const baseKg = lot.pricePerKg || (lot.priceNum ? lot.priceNum / 100 : 18.0);
  const totalKg = (lot.qtyNum * 100).toLocaleString('en-IN');

  const elCrop = document.getElementById('bid-modal-crop');
  const elAsk = document.getElementById('bid-modal-ask');
  const elId = document.getElementById('bid-modal-lot-id');

  if (elCrop) elCrop.textContent = `${lot.crop} (${lot.quantity} • ${totalKg} kg)`;
  if (elAsk) elAsk.innerHTML = `Farmer Ask Price: <strong style="color: #0c5a36;">${lot.askPrice}</strong>`;
  if (elId) elId.value = lot.id;

  // Suggest a counter price ~6% below ask price in ₹/kg
  const suggestedCounter = (baseKg * 0.94).toFixed(2);
  const counterInput = document.getElementById('counter-bid-price');
  if (counterInput) {
    counterInput.value = suggestedCounter;
    counterInput.step = "0.10";
  }
  updateBidKgPreview(suggestedCounter);

  const form = document.getElementById('form-counter-bid');
  if (form && !form.__wired) {
    form.__wired = true;
    form.addEventListener('submit', submitCounterBid);
  }

  modal.classList.add('active');
}

function submitCounterBid(e) {
  if (e) e.preventDefault();
  const currentLotId = document.getElementById('bid-modal-lot-id')?.value;
  const counterPrice = parseFloat(document.getElementById('counter-bid-price')?.value) || 12.20;
  const targetLot = (buyerData.verifiedLots && buyerData.verifiedLots.find(l => l.id === currentLotId)) || buyerData.verifiedLots[0];
  closeBidModal();

  const newBid = {
    id: `BID-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    lot_id: currentLotId || (targetLot ? targetLot.id : 'LOT-01'),
    crop: targetLot ? targetLot.crop : 'Produce',
    bid_rate_kg: counterPrice,
    quantity_kg: targetLot ? (targetLot.qtyNum * 100) : 5000,
    buyer_name: 'Karthik Sundaram (BigBasket)',
    status: 'Pending Farmer Acceptance',
    timestamp: new Date().toISOString()
  };

  if (!buyerData.buyerBids) buyerData.buyerBids = [];
  buyerData.buyerBids.unshift(newBid);

  try {
    localStorage.setItem('agrinex_buyer_bids', JSON.stringify(buyerData.buyerBids));
  } catch(e) {}
  
  if (window.apiClient) {
    window.apiClient.counterBid({
      lot_id: newBid.lot_id,
      crop: newBid.crop,
      bid_rate_kg: counterPrice,
      quantity_kg: newBid.quantity_kg,
      buyer_name: newBid.buyer_name
    }).catch(err => console.warn('Offline counter bid', err));
  }

  openNegotiationModal(currentLotId, counterPrice);
}

document.addEventListener('submit', (e) => {
  if (e.target && e.target.id === 'form-counter-bid') {
    submitCounterBid(e);
  }
});

function updateBidKgPreview(bidVal) {
  const lotId = document.getElementById('bid-modal-lot-id')?.value;
  const lot = buyerData.verifiedLots.find((l) => l.id === lotId) || buyerData.verifiedLots[0];
  let num = parseFloat(bidVal) || 0;
  if (num > 100) num = num / 100; // safety fallback for old quintal inputs
  const totalKg = (lot.qtyNum * 100);
  const totalCost = Math.round(num * totalKg);
  const previewEl = document.getElementById('counter-bid-kg-preview');
  if (previewEl) {
    previewEl.innerHTML = `<span>⚖️ <strong>₹ ${num.toFixed(2)} /kg</strong> • Total Lot Value: <strong>₹ ${totalCost.toLocaleString('en-IN')}</strong> (${totalKg.toLocaleString('en-IN')} kg)</span>`;
  }
}

function closeBidModal() {
  const modal = document.getElementById('modal-counter-bid');
  if (modal) modal.classList.remove('active');
}

// Open WhatsApp / SMS Live Negotiation Modal with KG breakdown
function openNegotiationModal(lotId, bidPrice) {
  const lot = buyerData.verifiedLots.find((l) => l.id === lotId) || buyerData.verifiedLots[0];
  const modal = document.getElementById('modal-negotiation-feedback');
  if (!modal) return;

  let numericKg = parseFloat(bidPrice);
  if (!numericKg || isNaN(numericKg)) numericKg = lot.pricePerKg || (lot.priceNum ? lot.priceNum / 100 : 18.0);
  if (numericKg > 100) numericKg = numericKg / 100; // normalize if passed in quintal

  const totalKg = lot.qtyNum * 100;
  const escrowAdvance = Math.round(totalKg * numericKg * 0.35);

  currentNegotiation = {
    lotId: lot.id,
    lotCrop: lot.crop,
    farmerName: lot.farmerName,
    bidPrice: numericKg,
    kgPrice: numericKg.toFixed(2),
    totalKg: totalKg.toLocaleString('en-IN'),
    escrowAmount: escrowAdvance
  };

  // Populate dynamic fields
  const nameEl = document.getElementById('sim-farmer-name');
  if (nameEl) nameEl.textContent = lot.farmerName;

  const phoneEl = document.getElementById('sim-farmer-phone');
  if (phoneEl) phoneEl.textContent = `${lot.farmerPhone} • ${lot.farmerLocation}`;

  const msgEl = document.getElementById('sim-farmer-msg');
  if (msgEl) {
    msgEl.innerHTML = `&ldquo;Namaste Karthik sir! I received your counter-bid of <strong>₹ ${numericKg.toFixed(2)} /kg</strong> for ${lot.quantity} (${totalKg.toLocaleString('en-IN')} kg) ${lot.crop}. I am ready to dispatch if you lock the 35% advance escrow (<strong>₹ ${escrowAdvance.toLocaleString('en-IN')}</strong>) today.&rdquo;`;
  }

  const rateEl = document.getElementById('sim-agreed-rate');
  if (rateEl) rateEl.innerHTML = `₹ ${numericKg.toFixed(2)} /kg`;

  const escrowEl = document.getElementById('sim-escrow-amount');
  if (escrowEl) escrowEl.textContent = `₹ ${escrowAdvance.toLocaleString('en-IN')}`;

  const dateEl = document.getElementById('sim-delivery-date');
  if (dateEl) dateEl.textContent = '22 Sep 2026 (Ready at Farm-Gate)';

  modal.classList.add('active');
}

function closeNegotiationModal() {
  const modal = document.getElementById('modal-negotiation-feedback');
  if (modal) modal.classList.remove('active');
}


function confirmEscrowFromCounter() {
  closeNegotiationModal();
  const lot = (buyerData.verifiedLots && buyerData.verifiedLots.find(l => l.id === currentNegotiation.lotId)) || buyerData.verifiedLots[0];
  const totalKg = lot ? (lot.qtyNum * 100) : 5000;
  const totalVal = Math.round(totalKg * currentNegotiation.bidPrice);
  const advAmount = Math.round(totalVal * 0.35);
  const balAmount = totalVal - advAmount;

  openEscrowPaymentGateway({
    lotId: currentNegotiation.lotId,
    crop: currentNegotiation.lotCrop,
    grade: lot ? lot.grade || 'Grade A' : 'Grade A',
    farmerName: currentNegotiation.farmerName || 'Farmer',
    farmerLocation: lot ? lot.farmerLocation : 'Lasalgaon, Nashik',
    farmerPhone: lot ? lot.farmerPhone : '+91 98220-44911',
    qtyKg: totalKg,
    qtyQt: parseFloat((totalKg / 100).toFixed(1)),
    rateKg: currentNegotiation.bidPrice,
    totalVal: totalVal,
    advAmount: advAmount,
    balAmount: balAmount,
    isEmergency: false
  });
}

// Post Demand Modal

// Bids Window Bindings
window.openDirectBuyModal = openDirectBuyModal;
window.updateDirectBuyCalculations = updateDirectBuyCalculations;
window.closeDirectBuyModal = closeDirectBuyModal;
window.executeBuyerLotPurchase = executeBuyerLotPurchase;
window.openBidModal = openBidModal;
window.updateBidKgPreview = updateBidKgPreview;
window.closeBidModal = closeBidModal;
window.openNegotiationModal = openNegotiationModal;
window.closeNegotiationModal = closeNegotiationModal;
window.confirmEscrowFromCounter = confirmEscrowFromCounter;
window.submitDirectBuy = submitDirectBuy;
window.submitCounterBid = submitCounterBid;
