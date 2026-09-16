/**
 * AgriNex Buyer Module - Controller & Bid Engine
 * Handles Standard Marketplace Bids + Emergency Salvage Buyouts (Breakeven Procurement)
 */

var buyerData = (typeof window !== 'undefined' && window.buyerData) ? window.buyerData : ((typeof buyerData !== 'undefined') ? buyerData : { verifiedLots: [], consignments: [], demands: [], storageFacilities: [], grievances: [] });

const DEFAULT_EMERGENCY_FEED = [
  {
    id: "EMG-LOT-TOM-99",
    crop: "Narayangaon Tomatoes (Perishable)",
    image: "assets/images/tomato.jpg",
    farmerName: "Sanjay Deshmukh",
    mandi: "Manchar / Narayangaon Yard, Pune, MH",
    quantity: "4,500 kg (45 Qt)",
    floorPrice: "₹ 12.00 /kg",
    breakevenPrice: "₹ 8.90 /kg",
    targetUse: "Tomato Puree & Sauce",
    targetUseBadge: "buyer-type-processing",
    targetIcon: "🥫",
    shelfLife: "⚡ 24-36 Hours Left",
    status: "🚨 Active Salvage Call"
  },
  {
    id: "EMG-LOT-ONI-88",
    crop: "Nashik Garwa Red Onion Lot",
    image: "assets/images/onion.jpg",
    farmerName: "Patil Rameshwar",
    mandi: "Lasalgaon APMC Yard, Nashik, MH",
    quantity: "6,000 kg (60 Qt)",
    floorPrice: "₹ 18.00 /kg",
    breakevenPrice: "₹ 13.50 /kg",
    targetUse: "Bulk Kitchen Catering",
    targetUseBadge: "buyer-type-caterer",
    targetIcon: "🍲",
    shelfLife: "⚡ 48 Hours Left",
    status: "🚨 Active Salvage Call"
  }
];

let currentEmergencyLot = null;

function renderBuyerEmergencyDesk() {
  const tbodies = [
    document.getElementById("emergency-buyer-tbody"),
    document.getElementById("emergency-buyer-tbody-marketplace")
  ].filter(Boolean);
  if (tbodies.length === 0) return;

  // Retrieve any dynamic emergency lots triggered by farmers
  let dynamicEmergency = [];
  try {
    if (window.AgriNexEmergencySale) {
      dynamicEmergency = AgriNexEmergencySale.getEmergencyLots().filter(item => !item.isSold);
    }
  } catch(e) {}

  // Load purchased emergency lot IDs
  let purchasedEmergency = [];
  try {
    const saved = localStorage.getItem('agrinex_emergency_purchased_ids');
    if (saved) purchasedEmergency = JSON.parse(saved);
  } catch(e) {}

  const allLots = [...dynamicEmergency.map(d => ({
    id: d.id,
    crop: `${d.crop} (${d.grade || 'Standard'})`,
    image: d.image && (d.image.startsWith("assets/") || d.image.startsWith("../")) ? d.image : (d.image && d.image.includes("onion") ? "assets/images/onion.jpg" : "assets/images/tomato.jpg"),
    farmerName: "Rameshwar Patil (Farmer)",
    mandi: "Narayangaon / Lasalgaon APMC, Pune, MH",
    quantity: d.quantity || "4,500 kg (45 Qt)",
    floorPrice: d.expectedPrice || "₹ 15.00 /kg",
    breakevenPrice: d.bestBid || "₹ 9.20 /kg",
    targetUse: "Purees, Catering & Bio-Compost",
    targetUseBadge: "buyer-type-processing",
    targetIcon: "🥫",
    shelfLife: "⚡ 24-48 Hours Urgency",
    status: d.status
  })), ...DEFAULT_EMERGENCY_FEED];

  const html = allLots.map(item => {
    const isPurchased = purchasedEmergency.includes(item.id) || (buyerData.verifiedLots && buyerData.verifiedLots.some(l => l.id === item.id && (l.isPurchased || l.isSoldOut)));
    const isViewingAsOther = (buyerFilterState && buyerFilterState.buyerPersona === 'other-buyer');

    let rowBg = '#fffdfa';
    let borderStyle = '';
    if (isPurchased) {
      rowBg = isViewingAsOther ? '#fef2f2' : '#f0fdf4';
      borderStyle = isViewingAsOther ? 'border-left: 4px solid #ef4444;' : 'border-left: 4px solid #16a34a;';
    }

    return `
      <tr style="background-color: ${rowBg}; ${borderStyle}">
        <td>
          <div class="crop-cell">
            <img src="${item.image}" alt="${item.crop}" class="crop-thumb" onerror="this.src='assets/images/tomato.jpg'" />
            <div>
              <div class="crop-name" style="color: #991b1b; font-weight: 800;">${window.tCrop ? window.tCrop(item.crop) : item.crop}</div>
              ${isPurchased ? (
                isViewingAsOther ? `
                  <span style="font-size: 0.72rem; color: #991b1b; font-weight: 800; background: #fee2e2; padding: 2px 6px; border-radius: 4px; border: 1px solid #fca5a5; display: inline-flex; align-items: center; gap: 4px; margin-top: 2px;">
                    ${window.t ? window.t('sold_out_salvage', '🚫 Sold Out (100% Breakeven Salvaged)') : '🚫 Sold Out (100% Breakeven Salvaged)'}
                  </span>
                ` : `
                  <span style="font-size: 0.72rem; color: #15803d; font-weight: 800; background: #dcfce7; padding: 2px 6px; border-radius: 4px; border: 1px solid #86efac; display: inline-flex; align-items: center; gap: 4px; margin-top: 2px;">
                    ${window.t ? window.t('procured_in_transit', '✓ Procured • In Transit') : '✓ Procured • In Transit'}
                  </span>
                `
              ) : `
                <span style="font-size: 0.72rem; color: #dc2626; font-weight: 700;">${window.tText ? window.tText(item.status) : item.status}</span>
              `}
            </div>
          </div>
        </td>
        <td>
          <div style="font-weight: 700; color: #0f172a; font-size: 0.88rem;">${window.tPerson ? window.tPerson(item.farmerName) : item.farmerName}</div>
          <div style="font-size: 0.74rem; color: #64748b;">📍 ${window.tLocation ? window.tLocation(item.mandi) : item.mandi}</div>
        </td>
        <td>
          <strong style="color: ${isPurchased && isViewingAsOther ? '#ef4444' : '#0f172a'}; font-size: 0.95rem;">
            ${isPurchased && isViewingAsOther ? (window.t ? window.t('sold_out_qty', '0 kg (Sold Out)') : '0 kg (Sold Out)') : item.quantity}
          </strong>
        </td>
        <td>
          <div>
            <span style="font-size: 1.05rem; font-weight: 800; color: #15803d;">${item.breakevenPrice}</span>
            <div style="font-size: 0.72rem; color: #64748b; text-decoration: line-through;">Orig: ${item.floorPrice}</div>
          </div>
        </td>
        <td>
          <span class="badge-buyer-type ${item.targetUseBadge}">
            <span>${item.targetIcon}</span> ${window.tText ? window.tText(item.targetUse) : item.targetUse}
          </span>
        </td>
        <td>
          <span class="badge badge-status-emergency" style="font-size: 0.72rem;">
            ${window.tText ? window.tText(item.shelfLife) : item.shelfLife}
          </span>
        </td>
        <td>
          ${isPurchased ? (
            isViewingAsOther ? `
              <button class="btn btn-secondary" disabled style="background: #e2e8f0; color: #64748b; font-size: 0.8rem; padding: 7px 14px; font-weight: 800; border: 1px solid #cbd5e1; cursor: not-allowed; border-radius: 8px;">
                ${window.t ? window.t('sold_out', '🚫 Sold Out') : '🚫 Sold Out'}
              </button>
            ` : `
              <button class="btn btn-primary" style="background: #0c5a36; font-size: 0.8rem; padding: 7px 14px; font-weight: 800; border: none; cursor: pointer; border-radius: 8px; box-shadow: 0 2px 8px rgba(12,90,54,0.25);" onclick="switchView('view-consignments')">
                ${window.t ? window.t('in_transit_btn', '🚚 In Transit ➔') : '🚚 In Transit ➔'}
              </button>
            `
          ) : `
            <button class="btn btn-primary" style="background: #dc2626; font-size: 0.8rem; padding: 7px 14px; font-weight: 800; box-shadow: 0 2px 8px rgba(220,38,38,0.25); border: none; cursor: pointer; border-radius: 8px;" onclick="openEmergencyBuyoutModal('${item.id}')">
              ${window.t ? window.t('insta_buyout', '⚡ Instant Buyout') : '⚡ Instant Buyout'}
            </button>
          `}
        </td>
      </tr>
    `;
  }).join("");

  tbodies.forEach(tb => {
    tb.innerHTML = html;
  });
}

function toggleEmergencySection(btn) {
  const container = document.getElementById('marketplace-emergency-table-container');
  if (!container) return;
  if (container.style.display === 'none') {
    container.style.display = 'block';
    if (btn) btn.innerHTML = 'Hide / Show ▾';
  } else {
    container.style.display = 'none';
    if (btn) btn.innerHTML = 'Expand ▴';
  }
}

function openEmergencyBuyoutModal(lotId) {
  let dynamicEmergency = [];
  try {
    if (window.AgriNexEmergencySale) {
      dynamicEmergency = AgriNexEmergencySale.getEmergencyLots().filter(item => !item.isSold);
    }
  } catch(e) {}

  const allLots = [...dynamicEmergency.map(d => ({
    id: d.id,
    crop: `${d.crop} (${d.grade || 'Standard'})`,
    image: d.image && (d.image.startsWith("assets/") || d.image.startsWith("../")) ? d.image : (d.image && d.image.includes("onion") ? "assets/images/onion.jpg" : "assets/images/tomato.jpg"),
    farmerName: "Rameshwar Patil (Farmer)",
    mandi: "Narayangaon / Lasalgaon APMC, Pune, MH",
    quantity: d.quantity || "4,500 kg (45 Qt)",
    floorPrice: d.expectedPrice || "₹ 15.00 /kg",
    breakevenPrice: d.bestBid || "₹ 9.20 /kg",
    targetUse: "Purees, Catering & Bio-Compost",
    targetUseBadge: "buyer-type-processing",
    targetIcon: "🥫",
    shelfLife: "⚡ 24-48 Hours Urgency",
    status: d.status
  })), ...DEFAULT_EMERGENCY_FEED];

  const lot = allLots.find(l => l.id === lotId) || allLots[0];
  if (!lot) return;

  currentEmergencyLot = lot;

  let numPrice = 9.00;
  const pMatch = (lot.breakevenPrice || '').match(/([0-9]+(?:\.[0-9]+)?)/);
  if (pMatch) numPrice = parseFloat(pMatch[1]);

  let qtyKg = 4500;
  const qMatch = (lot.quantity || '').match(/([0-9,]+)\s*kg/i);
  if (qMatch) qtyKg = parseFloat(qMatch[1].replace(/,/g, ''));

  const totalVal = Math.round(numPrice * qtyKg);
  const advAmount = Math.round(totalVal * 0.35);
  const balAmount = totalVal - advAmount;

  const modal = document.getElementById('modal-emergency-buyout');
  if (!modal) return;

  const imgEl = document.getElementById('emg-modal-img');
  const cropEl = document.getElementById('emg-modal-crop');
  const urgencyEl = document.getElementById('emg-modal-urgency');
  const farmerEl = document.getElementById('emg-modal-farmer');
  const qtyEl = document.getElementById('emg-modal-qty');
  const rateEl = document.getElementById('emg-modal-rate');
  const origRateEl = document.getElementById('emg-modal-orig-rate');
  const totalEl = document.getElementById('emg-modal-total-val');
  const advEl = document.getElementById('emg-modal-adv-val');
  const balEl = document.getElementById('emg-modal-bal-val');

  if (imgEl) imgEl.src = lot.image;
  if (cropEl) cropEl.textContent = lot.crop;
  if (urgencyEl) urgencyEl.textContent = lot.shelfLife;
  if (farmerEl) farmerEl.textContent = `Farmer: ${lot.farmerName} • 📍 ${lot.mandi}`;
  if (qtyEl) qtyEl.textContent = `${qtyKg.toLocaleString('en-IN')} kg (${(qtyKg / 100).toFixed(0)} Qt)`;
  if (rateEl) rateEl.textContent = `₹ ${numPrice.toFixed(2)} /kg`;
  if (origRateEl) origRateEl.textContent = `Orig: ${lot.floorPrice}`;
  if (totalEl) totalEl.textContent = `₹ ${totalVal.toLocaleString('en-IN')}`;
  if (advEl) advEl.textContent = `₹ ${advAmount.toLocaleString('en-IN')}`;
  if (balEl) balEl.textContent = `₹ ${balAmount.toLocaleString('en-IN')}`;

  modal.classList.add('active');
}

function closeEmergencyBuyoutModal() {
  const modal = document.getElementById('modal-emergency-buyout');
  if (modal) modal.classList.remove('active');
}

function executeEmergencyBuyoutConfirmed() {
  if (!currentEmergencyLot) return;
  const lot = currentEmergencyLot;

  let purchasedEmergency = [];
  try {
    const saved = localStorage.getItem('agrinex_emergency_purchased_ids');
    if (saved) purchasedEmergency = JSON.parse(saved);
  } catch(e) {}

  if (!purchasedEmergency.includes(lot.id)) {
    purchasedEmergency.push(lot.id);
    localStorage.setItem('agrinex_emergency_purchased_ids', JSON.stringify(purchasedEmergency));
  }

  // Settle in AgriNexEmergencySale if available
  try {
    if (window.AgriNexEmergencySale) {
      AgriNexEmergencySale.acceptEmergencyOffer(lot.id, "EMG_BUYER_01", []);
    }
  } catch(e) {}

  executeBuyerEmergencyPurchase(lot.id, lot.crop, lot.breakevenPrice, lot);
  renderBuyerEmergencyDesk();
  closeEmergencyBuyoutModal();

  showToast(`🎉 Instant Salvage Buyout Secured! 35% advance escrow locked for ${lot.crop}. Reefer dispatch assigned!`, 'success');
  switchView('view-consignments');
}

function executeEmergencyBuyout(lotId, cropName, price) {
  openEmergencyBuyoutModal(lotId);
}

// -------------------------------------------------------------
// REAL-TIME BUYER MODULE SYNCHRONIZATION ENGINE
// -------------------------------------------------------------
function loadPersistedBuyerState() {
  try {
    const savedLots = localStorage.getItem('agrinex_verified_lots');
    if (savedLots) {
      const parsed = JSON.parse(savedLots);
      if (Array.isArray(parsed) && parsed.length > 0) {
        buyerData.verifiedLots = parsed;
      }
    }
  } catch(e) {}

  try {
    const savedConsignments = localStorage.getItem('agrinex_buyer_consignments');
    if (savedConsignments) {
      const parsed = JSON.parse(savedConsignments);
      if (Array.isArray(parsed) && parsed.length > 0) {
        buyerData.consignments = parsed;
      }
    }
  } catch(e) {}
}

function updateBuyerMarketStats() {
  const consignments = (buyerData && buyerData.consignments) ? buyerData.consignments : [];
  const activeCount = consignments.filter(c => c.status === 'transit' || c.status === 'scheduled').length;
  const totalKg = consignments.reduce((sum, c) => sum + (c.quantity_kg || (c.quantity_qt * 100) || 0), 0);
  const totalVal = consignments.reduce((sum, c) => sum + (c.total_val || 0), 0);

  const ordersEl = document.getElementById('stat-active-orders-num');
  const volumeEl = document.getElementById('stat-total-volume-num');
  const procuredEl = document.getElementById('stat-total-procured-num');
  const savingsEl = document.getElementById('stat-direct-savings-num');

  const kgUnit = window.t ? window.t('units_kg', 'kg') : 'kg';
  const savedLabel = window.t ? window.t('saved_text', 'Saved') : 'Saved';

  if (ordersEl) ordersEl.textContent = activeCount.toLocaleString('en-IN');
  if (volumeEl) volumeEl.textContent = `${totalKg.toLocaleString('en-IN')} ${kgUnit}`;
  if (procuredEl) procuredEl.textContent = `₹ ${totalVal.toLocaleString('en-IN')}`;
  if (savingsEl) savingsEl.textContent = `~14.5% ${savedLabel}`;
}

function renderBuyerEscrowVault() {
  const consignments = (buyerData && buyerData.consignments) ? buyerData.consignments : [];
  const activeContractsCount = consignments.filter(c => c.status !== 'completed').length;
  const totalCommitted = consignments.reduce((sum, c) => sum + (c.total_val || 0), 0);
  const totalAdvance = consignments.reduce((sum, c) => sum + (c.adv_paid || Math.round((c.total_val || 0) * 0.35)), 0);
  const totalBalance = totalCommitted - totalAdvance;

  const countEl = document.getElementById('vault-contracts-count');
  const committedEl = document.getElementById('vault-committed-pool');
  const advEl = document.getElementById('vault-advance-locked');
  const balEl = document.getElementById('vault-delivery-hold');
  const tracksEl = document.getElementById('vault-tracks-count');

  if (countEl) countEl.textContent = `${activeContractsCount} Orders`;
  if (committedEl) committedEl.textContent = `₹ ${totalCommitted.toLocaleString('en-IN')}`;
  if (advEl) advEl.textContent = `₹ ${totalAdvance.toLocaleString('en-IN')}`;
  if (balEl) balEl.textContent = `₹ ${totalBalance.toLocaleString('en-IN')}`;
  if (tracksEl) tracksEl.textContent = `${activeContractsCount} Active Milestone Tracks`;
}

function executeBuyerLotPurchase(lotId, customPricePerKg = null, customQtyKg = null) {
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
  const contractNo = `ESC-MH-${randSuffix}`;
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
    tracking_id: trackingId,
    gate_pass: gatePass,
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
    balance_due: balAmount,
    assay_moisture: lot.moisture || "13.2% (Certified)",
    gross_wt: `${qtyKg + 3400} kg`,
    tare_wt: "3,400 kg",
    gate_seal: `#SEAL-${Math.floor(10000 + Math.random() * 90000)}`
  };

  if (!buyerData.consignments) buyerData.consignments = [];
  buyerData.consignments.unshift(newConsignment);
  try {
    localStorage.setItem('agrinex_buyer_consignments', JSON.stringify(buyerData.consignments));
  } catch(e) {}

  // 3. Prepend new Escrow contract card in Escrow Vault
  const escrowContainer = document.getElementById('vault-escrow-cards-container');
  if (escrowContainer) {
    const newCardHtml = `
      <div class="vault-contract-card" id="escrow-card-${trackingId}" style="border: 1.5px solid #86efac; animation: fadeIn 0.4s ease-out; margin-bottom: 20px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; flex-wrap: wrap; gap: 12px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <strong style="font-size: 1.02rem; color: #0f172a; font-weight: 800;">Contract #${contractNo} • ${lot.crop} (${qtyQt} Qt)</strong>
              <span class="badge badge-grade-a">${lot.grade || 'Grade A'}</span>
              ${lot.isEmergency ? `
                <span class="badge badge-status-emergency" style="background:#fee2e2; color:#991b1b; border-color:#fca5a5; font-weight:800;">⚡ Salvage Buyout</span>
              ` : `
                <span class="badge badge-status-emergency" style="background:#e0f2fe; color:#0369a1; border-color:#bae6fd;">🚀 Newly Booked</span>
              `}
            </div>
            <div style="font-size: 0.8rem; color: #64748b; margin-top: 3px;">
              Farmer: <strong style="color: #0f172a;">${lot.farmerName}</strong> (${lot.farmerLocation}) • Total Escrow: <strong style="color: #0c5a36; font-weight: 800;">₹ ${totalVal.toLocaleString('en-IN')}</strong> (₹ ${priceKg.toFixed(2)}/kg)
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="badge badge-grade-a" id="escrow-status-badge-${trackingId}" style="background: #e8f5ed; color: #0c5a36; border: 1px solid #bbf7d0; font-weight: 800; padding: 4px 10px;">35% Locked (₹ ${advAmount.toLocaleString('en-IN')})</span>
            <button class="btn btn-outline btn-sm" onclick="openEscrowDeedModal('${contractNo}', '${lot.crop} (${qtyQt} Qt)', '${lot.farmerName}', ${totalVal}, ${advAmount})" style="font-size: 0.78rem; font-weight: 700; border-radius: 8px;">View Agreement Deed</button>
          </div>
        </div>

        <!-- Stepper -->
        <div class="stepper-container" style="max-width: 720px; margin: 18px 0;">
          <div class="stepper-step">
            <div class="stepper-dot active">✓</div>
            <span class="stepper-label">Contract Created</span>
          </div>
          <div class="stepper-step">
            <div class="stepper-dot active">✓</div>
            <span class="stepper-label">35% Advance Locked</span>
          </div>
          <div class="stepper-step">
            <div class="stepper-dot active" id="stepper-dot-dispatch-${trackingId}">🚚</div>
            <span class="stepper-label">Dispatched (Eicher Pro 2049)</span>
          </div>
          <div class="stepper-step">
            <div class="stepper-dot" id="stepper-dot-settled-${trackingId}">4</div>
            <span class="stepper-label">Arrival QC & 100% Settled</span>
          </div>
        </div>

        <!-- Action Footer -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f1f5f9; padding-top: 14px; margin-top: 12px; font-size: 0.82rem; flex-wrap: wrap; gap: 10px;">
          <span style="color: #64748b;">Transit Vehicle: <strong style="color: #0f172a;">${newConsignment.vehicle}</strong> • Driver: <strong style="color: #0f172a;">${newConsignment.driver} (${newConsignment.driver_phone})</strong></span>
          <button class="btn btn-primary btn-sm" id="btn-escrow-vault-release-${trackingId}" onclick="openArrivalReleaseModal('${contractNo}', '${lot.crop}', ${balAmount}, '${lot.farmerName}', ${totalVal}, ${advAmount}, 'escrow-card-${trackingId}')" style="background: #0c5a36; border-color: #0c5a36; font-weight: 800; padding: 7px 16px; border-radius: 8px; box-shadow: 0 2px 8px rgba(12,90,54,0.2);">
            Release 65% Balance (₹ ${balAmount.toLocaleString('en-IN')})
          </button>
        </div>
      </div>
    `;
    escrowContainer.insertAdjacentHTML('afterbegin', newCardHtml);
  }

  // 4. Prepend Transaction Ledger Row
  const ledgerTbody = document.getElementById('escrow-ledger-tbody');
  if (ledgerTbody) {
    const txnRef = `TXN-ESC-${randSuffix}-A`;
    const newTxnRow = `
      <tr style="border-bottom: 1px solid #f1f5f9; background-color: #f0fdf4;" data-type="advance">
        <td style="padding: 14px 16px;">
          <strong style="color: #0f172a; font-weight: 800;">${txnRef}</strong>
          <div style="font-size: 0.72rem; color: #166534; font-weight: 700;">Just now</div>
        </td>
        <td style="padding: 14px 16px; font-weight: 700; color: #475569;">#${contractNo}</td>
        <td style="padding: 14px 16px;">
          <strong style="color: #0f172a;">${lot.farmerName}</strong>
          <div style="font-size: 0.72rem; color: #64748b;">HDFC A/C ••${randSuffix}</div>
        </td>
        <td style="padding: 14px 16px; font-weight: 600;">${lot.crop} (${qtyQt} Qt)</td>
        <td style="padding: 14px 16px;"><span style="color: #0c5a36; font-weight: 800;">35% Advance Locked</span></td>
        <td style="padding: 14px 16px;"><strong style="color: #0f172a; font-size: 0.92rem;">₹ ${advAmount.toLocaleString('en-IN')}</strong></td>
        <td style="padding: 14px 16px;"><code style="font-size: 0.75rem; background: #f1f5f9; padding: 3px 8px; border-radius: 6px; font-weight: 700; color: #334155;">HDFC000${randSuffix}</code></td>
        <td style="padding: 14px 16px;"><span class="badge badge-grade-a" style="background: #e8f5ed; color: #0c5a36; border: 1px solid #bbf7d0; font-weight: 800;">🔒 In Escrow</span></td>
        <td style="padding: 14px 16px; text-align: right;">
          <button class="btn btn-outline btn-sm" onclick="showToast('Downloading Escrow Deposit Receipt ${txnRef}...')" style="font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 6px;">📄 Receipt</button>
        </td>
      </tr>
    `;
    ledgerTbody.insertAdjacentHTML('afterbegin', newTxnRow);
  }

  // 5. Update Grievances Dropdown
  const grvSelect = document.getElementById('grv-lot-select');
  if (grvSelect) {
    const opt = document.createElement('option');
    opt.value = `${trackingId}|${lot.crop}|${lot.farmerName}`;
    if (typeof grvSelect.prepend === 'function') {
      grvSelect.prepend(opt);
    } else if (typeof grvSelect.insertBefore === 'function') {
      grvSelect.insertBefore(opt, grvSelect.firstChild);
    } else if (typeof grvSelect.appendChild === 'function') {
      grvSelect.appendChild(opt);
    }
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
  renderBuyerConsignments();
  renderVerifiedLots();
  renderBuyerEscrowVault();

  // 8. Backend Sync
  if (typeof fetch === 'function') {
    fetch('/api/bids', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        crop_id: lot.id,
        crop: lot.crop,
        variety: lot.crop,
        buyer_name: "Karthik Sundaram (BigBasket)",
        buyer_phone: "+91 98421 88390",
        buyer_type: "Wholesale Procurement Lead",
        bid_rate_qt: priceKg * 100,
        quantity_qt: qtyQt,
        image: lot.image
      })
    }).catch(e => {});
  }

  try {
    window.dispatchEvent(new Event('storage'));
  } catch(e) {}

  return newConsignment;
}

function executeBuyerEmergencyPurchase(lotId, cropName, priceFormatted, emergencyDetails = null) {
  let numPrice = 9.0;
  const match = (priceFormatted || '').match(/([0-9]+(?:\.[0-9]+)?)/);
  if (match) numPrice = parseFloat(match[1]);

  let qtyKg = 4500;
  if (emergencyDetails && emergencyDetails.quantity) {
    const qMatch = emergencyDetails.quantity.match(/([0-9,]+)\s*kg/i);
    if (qMatch) qtyKg = parseFloat(qMatch[1].replace(/,/g, ''));
  }

  const farmer = (emergencyDetails && emergencyDetails.farmerName) || "Sanjay Deshmukh (Emergency Seller)";
  const mandi = (emergencyDetails && emergencyDetails.mandi) || "Narayangaon / Lasalgaon APMC, MH";
  const img = (emergencyDetails && emergencyDetails.image) || (cropName.toLowerCase().includes("onion") ? "assets/images/onion.jpg" : "assets/images/tomato.jpg");

  const emergencyLot = {
    id: lotId,
    crop: `${cropName} (Perishable Salvage)`,
    farmerName: farmer,
    farmerLocation: mandi,
    farmerPhone: "+91 98224-33100",
    grade: "Grade A (Perishable)",
    pricePerKg: numPrice,
    priceNum: numPrice * 100,
    qtyNum: qtyKg / 100,
    availableQtyKg: 0,
    isSoldOut: true,
    quantity: `${qtyKg.toLocaleString('en-IN')} kg (${(qtyKg / 100).toFixed(0)} Qt)`,
    image: img,
    moisture: "High Perishable (Express Reefer)",
    askPrice: priceFormatted,
    isPurchased: true,
    purchasedBy: "my-account",
    purchasedByName: "Karthik Sundaram (BigBasket)",
    isEmergency: true
  };

  if (!buyerData.verifiedLots) buyerData.verifiedLots = [];
  const existingIdx = buyerData.verifiedLots.findIndex(l => l.id === lotId);
  if (existingIdx >= 0) {
    buyerData.verifiedLots[existingIdx] = emergencyLot;
  } else {
    buyerData.verifiedLots.unshift(emergencyLot);
  }

  try {
    localStorage.setItem('agrinex_verified_lots', JSON.stringify(buyerData.verifiedLots));
  } catch(e) {}

  return executeBuyerLotPurchase(lotId, numPrice, qtyKg);
}

// Global Filter State for Feature 4, Unit System & Buyer Perspective
let buyerFilterState = {
  search: '',
  grade: 'all',
  category: 'all',
  sort: 'default',
  unitDisplay: 'both', // 'both', 'kg', 'qt'
  buyerPersona: 'my-account' // 'my-account' or 'other-buyer'
};

function setBuyerPersona(persona, btnEl) {
  if (!buyerFilterState) return;
  buyerFilterState.buyerPersona = persona;

  const selfBtn = document.getElementById('btn-persona-self');
  const otherBtn = document.getElementById('btn-persona-other');
  const simBanner = document.getElementById('other-buyer-sim-banner');

  if (persona === 'my-account') {
    if (selfBtn) {
      selfBtn.classList.add('active');
      selfBtn.style.background = '#0c5a36';
      selfBtn.style.color = '#ffffff';
    }
    if (otherBtn) {
      otherBtn.classList.remove('active');
      otherBtn.style.background = 'transparent';
      otherBtn.style.color = '#475569';
    }
    if (simBanner) simBanner.style.display = 'none';
    showToast('🏢 Switched to My Account (BigBasket Procurement)', 'success');
  } else {
    if (otherBtn) {
      otherBtn.classList.add('active');
      otherBtn.style.background = '#dc2626';
      otherBtn.style.color = '#ffffff';
    }
    if (selfBtn) {
      selfBtn.classList.remove('active');
      selfBtn.style.background = 'transparent';
      selfBtn.style.color = '#475569';
    }
    if (simBanner) simBanner.style.display = 'flex';
    showToast('👥 Simulating Other Buyer View: Sold-out crops are locked & unavailable', 'info');
  }

  renderVerifiedLots();
  renderBuyerEmergencyDesk();
}
window.setBuyerPersona = setBuyerPersona;

// Global Negotiation State for Feature 6
let currentNegotiation = {
  lotId: 'LOT-TOM-88',
  bidPrice: 1200,
  kgPrice: 12.00,
  escrowAmount: 21000
};

// Toast notification helper
function showToast(message, type = 'success') {
  const existing = document.getElementById('agrinex-toast');
  if (existing) {
    if (typeof existing.remove === 'function') existing.remove();
    else if (existing.parentNode) existing.parentNode.removeChild(existing);
  }

  const toast = document.createElement('div');
  toast.id = 'agrinex-toast';
  toast.style.position = 'fixed';
  toast.style.bottom = '24px';
  toast.style.right = '24px';
  toast.style.zIndex = '99999';
  toast.style.background = type === 'success' ? '#0c5a36' : '#991b1b';
  toast.style.color = '#ffffff';
  toast.style.padding = '12px 20px';
  toast.style.borderRadius = '10px';
  toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
  toast.style.fontWeight = '700';
  toast.style.fontSize = '0.88rem';
  toast.style.display = 'flex';
  toast.style.alignItems = 'center';
  toast.style.gap = '8px';
  toast.innerHTML = `<span>✓</span> <span>${message}</span>`;

  document.body.appendChild(toast);
  setTimeout(() => {
    if (toast && toast.parentNode) {
      toast.parentNode.removeChild(toast);
    } else if (toast && typeof toast.remove === 'function') {
      toast.remove();
    }
  }, 4000);
}

// Modular View Switcher
function switchView(viewId) {
  // Alias mapping
  if (viewId === 'view-marketplace') {
    viewId = 'view-verified-produce';
  }

  const views = document.querySelectorAll('.portal-view');
  views.forEach((v) => v.classList.remove('active-view'));

  const target = document.getElementById(viewId);
  if (target) {
    target.classList.add('active-view');
  }

  // Update sidebar active nav item
  const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
  navItems.forEach((item) => {
    if (item.getAttribute('data-view') === viewId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Trigger view-specific initializations
  if (viewId === 'view-insights' && typeof window.initBuyerMarketInsights === 'function') {
    window.initBuyerMarketInsights();
  }

  // Scroll to top of main wrapper
  if (typeof window.scrollTo === 'function') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Trigger i18n DOM translation pass for newly activated view
  if (typeof window.walkAndTranslateDOM === 'function') {
    setTimeout(() => {
      window.walkAndTranslateDOM(document.body);
    }, 20);
  }
}

// Setup Sidebar Click Handlers
function setupSidebarNav() {
  const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      const viewId = item.getAttribute('data-view');
      if (viewId) {
        switchView(viewId);
      }
    });
  });
}

// ==========================================
// FEATURE 4: INSTANT SEARCH, GRADE & KG UNIT FILTER
// ==========================================

// Global Search handler // Search input handler
function handleBuyerSearch(query) {
  const rawQuery = query || '';
  buyerFilterState.search = rawQuery.trim().toLowerCase();

  const globalInput = document.getElementById('buyer-global-search');
  const marketInput = document.getElementById('marketplace-search-input');
  if (globalInput && globalInput.value !== rawQuery) globalInput.value = rawQuery;
  if (marketInput && marketInput.value !== rawQuery) marketInput.value = rawQuery;

  // If user is searching and not currently in verified produce view, switch to it
  const activeView = document.querySelector('.portal-view.active-view');
  if (buyerFilterState.search && activeView && activeView.id !== 'view-verified-produce') {
    switchView('view-verified-produce');
  }

  applyFilters();
}

// Unit Display Toggle Handler (Qt vs kg vs Both)
function setUnitDisplay(unitMode, btnElement) {
  buyerFilterState.unitDisplay = unitMode;

  const btns = document.querySelectorAll('.unit-toggle-btn');
  btns.forEach((b) => {
    b.classList.remove('active');
    b.style.background = '#ffffff';
    b.style.color = '#334155';
    b.style.borderColor = '#cbd5e1';
  });

  if (btnElement) {
    btnElement.classList.add('active');
    btnElement.style.background = '#0c5a36';
    btnElement.style.color = '#ffffff';
    btnElement.style.borderColor = '#0c5a36';
  }

  applyFilters();
  showToast(`Produce catalog unit display changed to: ${unitMode === 'kg' ? 'Kilograms (kg)' : unitMode === 'qt' ? 'Quintals (Qt)' : 'Dual (Qt + kg)'}`);
}

// Grade Filter Pill Click Handler
function filterByGrade(gradeKey, btnElement) {
  buyerFilterState.grade = gradeKey;

  // Update pill active visual states
  const pills = document.querySelectorAll('#grade-filter-group .filter-pill');
  pills.forEach((pill) => {
    pill.classList.remove('active');
    pill.style.background = '#ffffff';
    pill.style.color = '#334155';
    pill.style.borderColor = '#cbd5e1';
  });

  if (btnElement) {
    btnElement.classList.add('active');
    btnElement.style.background = '#0c5a36';
    btnElement.style.color = '#ffffff';
    btnElement.style.borderColor = '#0c5a36';
  }

  applyFilters();
}

// Master Filter & Sorter Application
function applyFilters() {
  if (!buyerData.verifiedLots) return;

  const catSelect = document.getElementById('filter-category');
  const sortSelect = document.getElementById('filter-sort');

  if (catSelect) buyerFilterState.category = catSelect.value;
  if (sortSelect) buyerFilterState.sort = sortSelect.value;

  let filtered = [...buyerData.verifiedLots];

  // 1. Filter by Search Query
  if (buyerFilterState.search) {
    const q = buyerFilterState.search;
    filtered = filtered.filter((lot) => {
      return (
        lot.crop.toLowerCase().includes(q) ||
        lot.farmerName.toLowerCase().includes(q) ||
        lot.farmerLocation.toLowerCase().includes(q) ||
        lot.id.toLowerCase().includes(q) ||
        (lot.category && lot.category.toLowerCase().includes(q)) ||
        (lot.grade && lot.grade.toLowerCase().includes(q))
      );
    });
  }

  // 2. Filter by Grade Pill
  if (buyerFilterState.grade && buyerFilterState.grade !== 'all') {
    filtered = filtered.filter((lot) => lot.gradeKey === buyerFilterState.grade);
  }

  // 3. Filter by Category Dropdown
  if (buyerFilterState.category && buyerFilterState.category !== 'all') {
    filtered = filtered.filter((lot) => lot.category === buyerFilterState.category);
  }

  // 4. Sort
  if (buyerFilterState.sort === 'price-asc') {
    filtered.sort((a, b) => a.priceNum - b.priceNum);
  } else if (buyerFilterState.sort === 'price-desc') {
    filtered.sort((a, b) => b.priceNum - a.priceNum);
  } else if (buyerFilterState.sort === 'rating') {
    filtered.sort((a, b) => parseFloat(b.farmerRating) - parseFloat(a.farmerRating));
  } else if (buyerFilterState.sort === 'savings') {
    filtered.sort((a, b) => parseFloat(b.savings) - parseFloat(a.savings));
  }

  renderVerifiedLots(filtered);
}

// Reset all filters
function resetBuyerFilters() {
  buyerFilterState = {
    search: '',
    grade: 'all',
    category: 'all',
    sort: 'default',
    unitDisplay: 'both'
  };

  const globalSearch = document.getElementById('buyer-global-search');
  if (globalSearch) globalSearch.value = '';

  const marketSearch = document.getElementById('marketplace-search-input');
  if (marketSearch) marketSearch.value = '';

  const sortSelect = document.getElementById('filter-sort');
  if (sortSelect) sortSelect.value = 'default';

  // Reset category pills
  const catPills = document.querySelectorAll('#market-category-pills .market-pill');
  catPills.forEach((p, idx) => {
    p.classList.remove('active');
    p.style.background = '#ffffff';
    p.style.color = '#334155';
    p.style.borderColor = '#cbd5e1';
    if (idx === 0) {
      p.classList.add('active');
      p.style.background = '#0c5a36';
      p.style.color = '#ffffff';
      p.style.borderColor = '#0c5a36';
    }
  });

  const allGradePill = document.querySelector('#grade-filter-group .filter-pill');
  if (allGradePill) filterByGrade('all', allGradePill);
  else applyFilters();

  showToast('Filters reset to show all lots');
}

// Render Verified Farmer Lots in Table (Full & Dashboard preview with KG unit support)
// Toggle between Grid and Table View in Marketplace
function setMarketViewMode(mode, btn) {
  const gridContainer = document.getElementById('market-lots-grid');
  const tableWrapper = document.getElementById('market-lots-table-wrapper');
  const gridBtn = document.getElementById('btn-view-grid');
  const tableBtn = document.getElementById('btn-view-table');

  if (mode === 'grid') {
    if (gridContainer) gridContainer.style.display = 'grid';
    if (tableWrapper) tableWrapper.style.display = 'none';
    if (gridBtn) {
      gridBtn.style.background = '#0c5a36';
      gridBtn.style.color = '#ffffff';
    }
    if (tableBtn) {
      tableBtn.style.background = 'transparent';
      tableBtn.style.color = '#475569';
    }
  } else {
    if (gridContainer) gridContainer.style.display = 'none';
    if (tableWrapper) tableWrapper.style.display = 'block';
    if (tableBtn) {
      tableBtn.style.background = '#0c5a36';
      tableBtn.style.color = '#ffffff';
    }
    if (gridBtn) {
      gridBtn.style.background = 'transparent';
      gridBtn.style.color = '#475569';
    }
  }
}

// Category filter pills on Marketplace hero
function filterByCategoryPill(category, btn) {
  const pills = document.querySelectorAll('#market-category-pills .market-pill');
  pills.forEach(p => {
    p.classList.remove('active');
    p.style.background = '#ffffff';
    p.style.color = '#334155';
    p.style.borderColor = '#cbd5e1';
  });

  if (btn) {
    btn.classList.add('active');
    btn.style.background = '#0c5a36';
    btn.style.color = '#ffffff';
    btn.style.borderColor = '#0c5a36';
  }

  buyerFilterState.category = category;
  applyFilters();
}

// Render Verified Farmer Lots in 3-Column Grid + Table + Dashboard preview
function renderVerifiedLots(lotsToRender = null) {
  const grid = document.getElementById('market-lots-grid');
  const tbody = document.getElementById('verified-lots-tbody');
  const dashTbody = document.getElementById('dashboard-lots-tbody');
  const countBadge = document.getElementById('lots-count-badge');
  const marketCountBadge = document.getElementById('market-lots-count');
  
  if (!buyerData.verifiedLots) return;
  const lots = lotsToRender !== null ? lotsToRender : buyerData.verifiedLots;
  const unitMode = buyerFilterState.unitDisplay || 'both';

  // Update badge count
  const countText = `${lots.length} Lots`;
  const showingStr = (window.t ? window.t('showing_lots', 'Showing {0} of {1} Verified Lots') : 'Showing {0} of {1} Verified Lots')
    .replace('{0}', lots.length).replace('{1}', buyerData.verifiedLots.length);
  const lotsAvailStr = `${lots.length} ${window.t ? window.t('lots_available', 'Lots Available') : 'Lots Available'}`;
  if (countBadge) countBadge.textContent = showingStr;
  if (marketCountBadge) marketCountBadge.textContent = lotsAvailStr;

  // 1. Render 3-Column Visual Grid (Screenshot Match)
  if (grid) {
    if (lots.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 48px 24px; text-align: center; color: #64748b;">
          <div style="font-size: 2.5rem; margin-bottom: 10px;">🌾</div>
          <strong style="font-size: 1.1rem; color: #0f172a; display: block; margin-bottom: 6px;">No farm-direct lots found matching your filter</strong>
          <p style="font-size: 0.85rem; margin-bottom: 16px;">Try adjusting your keyword search or selecting a different crop category.</p>
          <button class="btn btn-outline btn-sm" onclick="resetBuyerFilters()">Reset All Filters</button>
        </div>
      `;
    } else {
      const soldOutText = window.t ? window.t('sold_out', 'Sold Out') : 'Sold Out';
      const inTransitText = window.t ? window.t('your_order_transit', '0 kg (Your Order • In Transit)') : '0 kg (Your Order • In Transit)';
      const soldOutBannerText = window.t ? window.t('sold_out_overlay', '🚫 SOLD OUT') : '🚫 SOLD OUT';
      const soldOutSubText = window.t ? window.t('sold_out_subtext', '100% Crop Procured by Buyer') : '100% Crop Procured by Buyer';
      const farmerTagText = window.t ? window.t('lot_badge_farmer', '🌿 Farmer') : '🌿 Farmer';
      const compareText = window.t ? window.t('lot_compare', '⚖️ Compare') : '⚖️ Compare';
      const buyNowText = window.t ? window.t('buy_now', 'Buy Now') : 'Buy Now';
      const inTransitBtnText = window.t ? window.t('in_transit_btn', 'In Transit ➔') : 'In Transit ➔';
      const availQtyLabelText = window.t ? window.t('avail_qty_label', 'Available Qty:') : 'Available Qty:';

      grid.innerHTML = lots
        .map((lot) => {
          const kgRate = lot.pricePerKg || (lot.priceNum / 100).toFixed(0);
          const availKg = (lot.availableQtyKg !== undefined) ? lot.availableQtyKg : (lot.qtyNum ? lot.qtyNum * 100 : 5000);
          const isSoldOut = lot.isSoldOut || availKg <= 0;
          const isOwnedByMe = (lot.isPurchased || isSoldOut) && (lot.purchasedBy === 'my-account' || !lot.purchasedBy || (lot.purchasedByName && lot.purchasedByName.includes('BigBasket')));
          const isViewingAsOther = (buyerFilterState && buyerFilterState.buyerPersona === 'other-buyer');
          const gradeText = lot.grade || 'Grade A';

          let availQtyDisplay = `${availKg.toLocaleString('en-IN')} kg`;
          if (isSoldOut) {
            if (isViewingAsOther) {
              availQtyDisplay = `<span style="color:#fca5a5; font-weight:800;">0 kg (${soldOutText})</span>`;
            } else if (isOwnedByMe) {
              availQtyDisplay = `<span style="color:#bbf7d0; font-weight:800;">${inTransitText}</span>`;
            } else {
              availQtyDisplay = `<span style="color:#fca5a5; font-weight:800;">0 kg (${soldOutText})</span>`;
            }
          }

          return `
            <div class="farm-lot-card" id="card-${lot.id}" style="${isSoldOut && isViewingAsOther ? 'opacity: 0.94; border: 1.5px solid #fecdd3;' : ''}">
              <!-- Visual Image Box with Gradient Overlay & Badges -->
              <div class="lot-img-container" style="position: relative;">
                <img src="${lot.image}" alt="${lot.crop}" class="lot-img" onerror="this.src='assets/images/tomato.jpg'" style="${isSoldOut && isViewingAsOther ? 'filter: grayscale(20%) contrast(95%);' : ''}" />
                <div class="lot-img-gradient-overlay"></div>

                <!-- Sold Out Banner Overlay for other buyers -->
                ${isSoldOut && (isViewingAsOther || !isOwnedByMe) ? `
                  <div style="position: absolute; inset: 0; background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(1.5px); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 4; border-radius: 12px 12px 0 0; text-align: center; padding: 12px;">
                    <span style="background: #dc2626; color: #ffffff; font-size: 0.82rem; font-weight: 900; padding: 6px 16px; border-radius: 20px; letter-spacing: 0.8px; box-shadow: 0 4px 14px rgba(220, 38, 38, 0.5); text-transform: uppercase;">${soldOutBannerText}</span>
                    <span style="color: #f1f5f9; font-size: 0.74rem; font-weight: 700; margin-top: 5px;">${soldOutSubText}</span>
                  </div>
                ` : ''}

                <!-- Top Badges -->
                <div class="lot-top-badges">
                  <span class="lot-badge-farmer-tag">${farmerTagText}</span>
                  <span class="lot-badge-grade-tag">${window.tGrade ? window.tGrade(gradeText) : gradeText}</span>
                  ${isSoldOut ? (
                    isViewingAsOther ? `
                      <span class="badge" style="background:#fee2e2; color:#991b1b; border:1.5px solid #fca5a5; font-weight:900; font-size:0.7rem;">${soldOutBannerText}</span>
                    ` : (
                      isOwnedByMe ? `
                        <span class="badge badge-grade-a" style="background:#dcfce7; color:#15803d; border:1px solid #86efac; font-weight:800; font-size:0.7rem;">${window.t ? window.t('your_order_badge', '🔒 Sold Out • Your Order') : '🔒 Sold Out • Your Order'}</span>
                      ` : `
                        <span class="badge" style="background:#fee2e2; color:#991b1b; border:1.5px solid #fca5a5; font-weight:900; font-size:0.7rem;">${soldOutBannerText}</span>
                      `
                    )
                  ) : (
                    lot.isPurchased ? `<span class="badge badge-grade-a" style="background:#dcfce7; color:#15803d; border:1px solid #86efac; font-weight:800;">${window.t ? window.t('escrow_locked_badge', '🔒 Escrow Locked') : '🔒 Escrow Locked'}</span>` : ''
                  )}
                  ${!isSoldOut || !isViewingAsOther ? `
                    <label style="margin-left: auto; background: rgba(0,0,0,0.65); color: #ffffff; padding: 2px 8px; border-radius: 6px; font-size: 0.68rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 4px; backdrop-filter: blur(4px);" onclick="event.stopPropagation()">
                      <input type="checkbox" class="lot-compare-checkbox" data-lot-id="${lot.id}" onchange="toggleLotComparison('${lot.id}', event)" style="cursor: pointer;" />
                      <span>${compareText}</span>
                    </label>
                  ` : ''}
                </div>

                <!-- Bottom Price & Quantity Overlay -->
                <div class="lot-bottom-overlay">
                  <div class="lot-overlay-price">
                    ₹${kgRate} <span>/ kg</span>
                  </div>
                  <div class="lot-overlay-qty">
                    ${availQtyLabelText} ${availQtyDisplay}
                  </div>
                </div>
              </div>

              <!-- Card Body Info -->
              <div class="lot-card-body">
                <div>
                  <div class="lot-title">${window.tCrop ? window.tCrop(lot.crop) : lot.crop}</div>
                  <div class="lot-farmer-meta">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2.2">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span><strong>${window.tPerson ? window.tPerson(lot.farmerName) : lot.farmerName}</strong> • ${lot.farmerRating || '4.9 ⭐'}</span>
                  </div>
                  <div class="lot-location-meta">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0c5a36" stroke-width="2.2">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>${window.tLocation ? window.tLocation(lot.farmerLocation) : lot.farmerLocation}</span>
                  </div>
                </div>

                <!-- Actions: Buy Now / Sold Out / In Transit -->
                <div class="lot-actions-row">
                  ${isSoldOut ? (
                    (isViewingAsOther || !isOwnedByMe) ? `
                      <button class="btn-lot-buy" disabled style="background:#e2e8f0; color:#64748b; border:1px solid #cbd5e1; cursor:not-allowed; opacity:0.9; font-weight:800;" title="Sold Out — This crop was fully procured by another institutional buyer">
                        <span>🚫</span>
                        <span>${soldOutText}</span>
                      </button>
                      <button class="btn-lot-whatsapp" disabled style="background:#f1f5f9; color:#94a3b8; cursor:not-allowed; border:1px solid #e2e8f0;" title="Produce is sold out">
                        ✕
                      </button>
                    ` : `
                      <button class="btn-lot-buy" onclick="switchView('view-consignments')" style="background:#0c5a36; color:#ffffff; font-weight:800;" title="Track your dispatched consignment">
                        <span>🚚</span>
                        <span>${inTransitBtnText}</span>
                      </button>
                      <button class="btn-lot-whatsapp" onclick="openFarmerChat('${lot.id}')" title="Direct Chat & Negotiation with ${lot.farmerName}">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.316 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.818-1.001z"/>
                        </svg>
                      </button>
                    `
                  ) : (
                    lot.isPurchased ? `
                      <button class="btn-lot-buy" onclick="switchView('view-consignments')" style="background:#0c5a36; color:#ffffff; font-weight:800;">
                        <span>🚚</span>
                        <span>${inTransitBtnText}</span>
                      </button>
                      <button class="btn-lot-whatsapp" onclick="openFarmerChat('${lot.id}')" title="Direct Chat & Negotiation with ${lot.farmerName}">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.316 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.818-1.001z"/>
                        </svg>
                      </button>
                    ` : `
                      <button class="btn-lot-buy" onclick="openDirectBuyModal('${lot.id}')">
                        <span>🛒</span>
                        <span>${buyNowText}</span>
                      </button>
                      <button class="btn-lot-whatsapp" onclick="openFarmerChat('${lot.id}')" title="Direct Chat & Negotiation with ${lot.farmerName}">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.316 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.818-1.001z"/>
                        </svg>
                      </button>
                    `
                  )}
                </div>
              </div>
            </div>
          `;
        })
        .join('');
    }
  }

  // 2. Render Tabular View (when table mode selected)
  if (tbody) {
    if (lots.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 40px 20px; color: #64748b;">
            <div style="font-size: 2rem; margin-bottom: 8px;">🌾</div>
            <strong style="font-size: 1rem; color: #0f172a; display: block; margin-bottom: 4px;">No matching farmer lots found</strong>
            <p style="font-size: 0.82rem; margin-bottom: 12px;">Try adjusting your search query or category filter.</p>
            <button class="btn btn-outline btn-sm" onclick="resetBuyerFilters()">Reset All Filters</button>
          </td>
        </tr>
      `;
    } else {
      tbody.innerHTML = lots
        .map((lot) => {
          const kgRate = lot.pricePerKg || (lot.priceNum ? (lot.priceNum / 100).toFixed(0) : '12');
          const availKg = (lot.availableQtyKg !== undefined) ? lot.availableQtyKg : (lot.qtyNum ? lot.qtyNum * 100 : 5000);
          const isSoldOut = lot.isSoldOut || availKg <= 0;
          const isOwnedByMe = (lot.isPurchased || isSoldOut) && (lot.purchasedBy === 'my-account' || !lot.purchasedBy || (lot.purchasedByName && lot.purchasedByName.includes('BigBasket')));
          const isViewingAsOther = (buyerFilterState && buyerFilterState.buyerPersona === 'other-buyer');

          const mandiRateStr = lot.mandiRate || `₹ ${(parseFloat(kgRate) * 1.15 * 100).toFixed(0)} /Qt`;
          const gradeBadge = lot.gradeBadgeClass || 'badge-grade-a';
          const farmerRating = lot.farmerRating || '4.9 ⭐';
          const savingsText = lot.savings || '~15% Saved';

          let qtyColumnHtml = `
            <strong style="font-size: 0.92rem; color: #0f172a;">${availKg.toLocaleString('en-IN')} kg</strong>
            <span style="font-size: 0.72rem; color: #64748b; display: block;">(${lot.quantity || availKg.toLocaleString('en-IN') + ' kg'})</span>
          `;

          if (isSoldOut) {
            if (isViewingAsOther || !isOwnedByMe) {
              qtyColumnHtml = `
                <strong style="font-size: 0.92rem; color: #ef4444;">0 kg</strong>
                <span class="badge" style="background: #fee2e2; color: #991b1b; border: 1px solid #fca5a5; font-size: 0.68rem; padding: 2px 6px; font-weight: 800; display: block; width: fit-content; margin-top: 2px;">🚫 Sold Out</span>
              `;
            } else {
              qtyColumnHtml = `
                <strong style="font-size: 0.92rem; color: #15803d;">0 kg</strong>
                <span class="badge badge-grade-a" style="font-size: 0.68rem; padding: 2px 6px; font-weight: 800; display: block; width: fit-content; margin-top: 2px;">🔒 Procured by You</span>
              `;
            }
          }

          let actionColHtml = '';
          if (isSoldOut) {
            if (isViewingAsOther || !isOwnedByMe) {
              actionColHtml = `
                <button class="btn btn-secondary btn-sm" disabled style="padding: 5px 12px; font-size: 0.78rem; background:#e2e8f0; color:#64748b; border: 1px solid #cbd5e1; cursor:not-allowed; font-weight:700;">
                  🚫 Sold Out
                </button>
              `;
            } else {
              actionColHtml = `
                <button class="btn btn-primary btn-sm" onclick="switchView('view-consignments')" style="padding: 5px 10px; font-size: 0.78rem; background:#0c5a36; border-color:#0c5a36; font-weight:800;">
                  🚚 In Transit ➔
                </button>
              `;
            }
          } else if (lot.isPurchased) {
            actionColHtml = `
              <button class="btn btn-primary btn-sm" onclick="switchView('view-consignments')" style="padding: 5px 10px; font-size: 0.78rem; background:#0c5a36; border-color:#0c5a36; font-weight:800;">
                🚚 In Transit ➔
              </button>
            `;
          } else {
            actionColHtml = `
              <button class="btn btn-primary btn-sm" onclick="openDirectBuyModal('${lot.id}')" style="padding: 5px 10px; font-size: 0.78rem;">
                Buy Now
              </button>
              <button class="btn btn-outline btn-sm" onclick="openFarmerChat('${lot.id}')" style="padding: 5px 10px; font-size: 0.78rem; display: flex; align-items: center; gap: 4px;">
                <span>💬</span> Chat
              </button>
            `;
          }

          return `
            <tr style="${isSoldOut && isViewingAsOther ? 'background-color: #fff8f8;' : ''}">
              <td>
                <div class="crop-cell">
                  <img src="${lot.image}" alt="${lot.crop}" class="crop-thumb" onerror="this.src='assets/images/tomato.jpg'" />
                  <div>
                    <strong style="display: block; font-size: 0.88rem; color: #0f172a;">${window.tCrop ? window.tCrop(lot.crop) : lot.crop}</strong>
                    <span style="font-size: 0.72rem; color: #64748b;">${window.tLocation ? window.tLocation(lot.farmerLocation) : lot.farmerLocation}</span>
                  </div>
                </div>
              </td>
              <td>
                <span class="badge ${gradeBadge}">${window.tGrade ? window.tGrade(lot.grade || 'Grade A') : (lot.grade || 'Grade A')}</span>
                <div style="font-size: 0.7rem; color: #64748b; margin-top: 2px;">Moisture: ${lot.moisture || '13.5%'}</div>
              </td>
              <td>
                <strong>${window.tPerson ? window.tPerson(lot.farmerName) : lot.farmerName}</strong>
                <div style="font-size: 0.72rem; color: #d97706; font-weight: 700;">${farmerRating}</div>
              </td>
              <td>${qtyColumnHtml}</td>
              <td>
                <div style="display: flex; align-items: baseline; gap: 4px;">
                  <strong style="color: #0c5a36; font-size: 0.96rem;">₹ ${kgRate} /kg</strong>
                </div>
                <div style="font-size: 0.7rem; color: #64748b; margin-top: 2px;">
                  Mandi: <span style="text-decoration: line-through;">${mandiRateStr}</span>
                </div>
              </td>
              <td>
                <span class="badge badge-grade-a">${window.tText ? window.tText(savingsText) : savingsText}</span>
              </td>
              <td>
                <div style="display: flex; gap: 6px;">
                  ${actionColHtml}
                </div>
              </td>
            </tr>
          `;
        })
        .join('');
    }
  }

  // 3. Dashboard preview (always top 3)
  if (dashTbody) {
    dashTbody.innerHTML = buyerData.verifiedLots
      .slice(0, 3)
      .map((lot) => {
        const kgRate = lot.pricePerKg || (lot.priceNum / 100).toFixed(0);
        const availKg = (lot.availableQtyKg !== undefined) ? lot.availableQtyKg : (lot.qtyNum ? lot.qtyNum * 100 : 5000);
        const isSoldOut = lot.isSoldOut || availKg <= 0;
        const isOwnedByMe = (lot.isPurchased || isSoldOut) && (lot.purchasedBy === 'my-account' || !lot.purchasedBy || (lot.purchasedByName && lot.purchasedByName.includes('BigBasket')));
        const isViewingAsOther = (buyerFilterState && buyerFilterState.buyerPersona === 'other-buyer');

        let actionHtml = '';
        if (isSoldOut) {
          if (isViewingAsOther || !isOwnedByMe) {
            actionHtml = `<button class="btn btn-secondary btn-sm" disabled style="padding: 4px 8px; font-size: 0.75rem; background:#e2e8f0; color:#64748b; border: 1px solid #cbd5e1; cursor:not-allowed; font-weight:700;">🚫 Sold</button>`;
          } else {
            actionHtml = `<button class="btn btn-primary btn-sm" onclick="switchView('view-consignments')" style="padding: 4px 8px; font-size: 0.75rem; background:#0c5a36; border-color:#0c5a36; font-weight:800;">🚚 Transit</button>`;
          }
        } else if (lot.isPurchased) {
          actionHtml = `<button class="btn btn-primary btn-sm" onclick="switchView('view-consignments')" style="padding: 4px 8px; font-size: 0.75rem; background:#0c5a36; border-color:#0c5a36; font-weight:800;">🚚 Transit</button>`;
        } else {
          actionHtml = `<button class="btn btn-primary btn-sm" onclick="openDirectBuyModal('${lot.id}')" style="padding: 4px 8px; font-size: 0.75rem;">Buy</button>`;
        }

        return `
          <tr>
            <td>
              <div class="crop-cell">
                <img src="${lot.image}" alt="${lot.crop}" class="crop-thumb" onerror="this.src='assets/images/tomato.jpg'" />
                <div>
                  <strong style="display: block; font-size: 0.85rem; color: #0f172a;">${window.tCrop ? window.tCrop(lot.crop) : lot.crop}</strong>
                  <span style="font-size: 0.7rem; color: #64748b;">${window.tLocation ? window.tLocation(lot.farmerLocation) : lot.farmerLocation}</span>
                </div>
              </div>
            </td>
            <td><span class="badge ${lot.gradeBadgeClass || 'badge-grade-a'}">${window.tGrade ? window.tGrade(lot.grade || 'Grade A') : (lot.grade || 'Grade A')}</span></td>
            <td><strong>${window.tPerson ? window.tPerson(lot.farmerName) : lot.farmerName}</strong></td>
            <td>
              <strong style="color: ${isSoldOut ? '#ef4444' : '#0f172a'};">
                ${isSoldOut ? '0 kg (Sold Out)' : availKg.toLocaleString('en-IN') + ' kg'}
              </strong>
            </td>
            <td>
              <strong style="color: #0c5a36;">₹ ${kgRate}/kg</strong>
              <div style="font-size: 0.68rem; color: #64748b;">(${lot.askPrice})</div>
            </td>
            <td>${actionHtml}</td>
          </tr>
        `;
      })
      .join('');
  }
}

// ==========================================
// BULK PROCUREMENT DEMANDS & QUOTA BOARD
// ==========================================
let demandFilters = {
  searchQuery: '',
  status: 'all',
  hub: 'all'
};

function handleDemandSearch(val) {
  demandFilters.searchQuery = (val || '').toLowerCase().trim();
  renderBuyerDemands();
}

function filterDemandsByStatus(status, btnEl) {
  demandFilters.status = status;
  if (btnEl && btnEl.parentElement) {
    const btns = btnEl.parentElement.querySelectorAll('button');
    btns.forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
  }
  renderBuyerDemands();
}

function filterDemandsByHub(hub) {
  demandFilters.hub = hub;
  renderBuyerDemands();
}

function clearDemandFilters() {
  demandFilters = { searchQuery: '', status: 'all', hub: 'all' };
  const sInput = document.getElementById('demand-search-input');
  if (sInput) sInput.value = '';
  const hubSelect = document.getElementById('demand-hub-filter');
  if (hubSelect) hubSelect.value = 'all';
  const statusContainer = document.getElementById('demand-status-filters');
  if (statusContainer) {
    const btns = statusContainer.querySelectorAll('button');
    btns.forEach((b, i) => {
      if (i === 0) b.classList.add('active');
      else b.classList.remove('active');
    });
  }
  renderBuyerDemands();
}

function renderBuyerDemands() {
  const container = document.getElementById('demands-list-container');
  if (!container || !buyerData.buyerDemands) return;

  const filtered = buyerData.buyerDemands.filter(dem => {
    // Search query
    if (demandFilters.searchQuery) {
      const q = demandFilters.searchQuery;
      const matchText = `${dem.id} ${dem.crop} ${dem.category || ''} ${dem.location} ${dem.grade || ''}`.toLowerCase();
      if (!matchText.includes(q)) return false;
    }
    // Status filter
    if (demandFilters.status !== 'all') {
      if (demandFilters.status === 'match-ready' && !dem.statusLabel.includes('Auto-Match')) return false;
      if (demandFilters.status === 'broadcasting' && !dem.statusLabel.includes('Broadcasting')) return false;
      if (demandFilters.status === 'fulfilled' && dem.fulfilledPct < 100) return false;
    }
    // Hub filter
    if (demandFilters.hub !== 'all' && dem.location !== demandFilters.hub) {
      return false;
    }
    return true;
  });

  // Update badge count
  const activeBadge = document.getElementById('demands-active-badge');
  if (activeBadge) {
    activeBadge.textContent = `${filtered.length} Quotas Displayed`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 48px 20px; background: #f8fafc; border-radius: 12px; border: 1.5px dashed #cbd5e1;">
        <div style="font-size: 2.2rem; margin-bottom: 8px;">🔍</div>
        <strong style="font-size: 1.05rem; color: #0f172a; display: block;">No matching procurement quotas found</strong>
        <p style="font-size: 0.8rem; color: #64748b; margin-top: 4px; margin-bottom: 14px;">Try adjusting your search keywords, status tabs, or hub filters.</p>
        <button class="btn btn-outline btn-sm" onclick="clearDemandFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(dem => {
    const fulfilledPct = dem.fulfilledPct || 0;
    const progressColor = fulfilledPct >= 100 ? 'linear-gradient(90deg, #16a34a 0%, #15803d 100%)' : (fulfilledPct >= 60 ? 'linear-gradient(90deg, #10b981 0%, #059669 100%)' : 'linear-gradient(90deg, #eab308 0%, #ca8a04 100%)');
    const progressTextColor = fulfilledPct >= 100 ? '#15803d' : (fulfilledPct >= 60 ? '#0c5a36' : '#a16207');
    const bidsCount = (dem.bids && dem.bids.length) || 0;
    const isFulfilled = fulfilledPct >= 100;

    return `
      <div class="bulk-quota-card" style="border-top: 4.5px solid ${isFulfilled ? '#16a34a' : '#0c5a36'};" id="demand-card-${dem.id}">
        <!-- Top Bar: Crop Info + Status Badge -->
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 16px;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <img src="${dem.image}" alt="${dem.crop}" style="width: 56px; height: 56px; border-radius: 12px; object-fit: cover; border: 1.5px solid #e2e8f0; box-shadow: 0 4px 10px rgba(0,0,0,0.06);" onerror="this.src='assets/images/tomato.jpg'" />
            <div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                <strong style="font-size: 1.15rem; color: #0f172a; font-weight: 900;">${window.tCrop ? window.tCrop(dem.crop) : dem.crop}</strong>
                <span class="badge" style="background: #f1f5f9; color: #475569; font-size: 0.74rem; font-weight: 800; border: 1px solid #cbd5e1; font-family: monospace;">#${dem.id}</span>
                <span class="badge" style="background: #f0fdf4; color: #166534; font-size: 0.74rem; font-weight: 800; border: 1px solid #bbf7d0;">${window.tText ? window.tText(dem.category || 'Agricultural Crop') : (dem.category || 'Agricultural Crop')}</span>
              </div>
              <div style="font-size: 0.8rem; color: #64748b; margin-top: 4px; font-weight: 500;">
                Destination: <strong style="color: #0f172a; font-weight: 700;">📍 ${window.tLocation ? window.tLocation(dem.location) : dem.location}</strong> • Sourcing Deadline: <strong style="${dem.daysLeft <= 3 ? 'color: #dc2626; font-weight: 800;' : 'color: #0f172a; font-weight: 700;'}">⏱️ ${dem.deadline} ${dem.daysLeft > 0 ? `(${dem.daysLeft}d left)` : '(Completed)'}</strong>
              </div>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge" style="background: ${isFulfilled ? '#15803d' : '#f0fdf4'}; color: ${isFulfilled ? '#ffffff' : '#166534'}; font-size: 0.78rem; font-weight: 800; padding: 5px 12px; border-radius: 999px; border: 1px solid ${isFulfilled ? '#15803d' : '#bbf7d0'};">
              ${window.tText ? window.tText(dem.statusLabel || '● Broadcasting Quota') : (dem.statusLabel || '● Broadcasting Quota')}
            </span>
          </div>
        </div>

        <!-- 4-Column Procurement Spec Grid -->
        <div class="quota-spec-box">
          <div>
            <span style="color: #64748b; font-size: 0.68rem; font-weight: 800; display: block; text-transform: uppercase; letter-spacing: 0.03em;">TARGET QUOTA VOLUME</span>
            <strong style="color: #0f172a; font-size: 1rem; font-weight: 900;">${dem.tonnage}</strong>
          </div>
          <div>
            <span style="color: #64748b; font-size: 0.68rem; font-weight: 800; display: block; text-transform: uppercase; letter-spacing: 0.03em;">CEILING TARGET PRICE</span>
            <strong style="color: #0c5a36; font-size: 1rem; font-weight: 900;">${dem.targetPrice}</strong>
          </div>
          <div>
            <span style="color: #64748b; font-size: 0.68rem; font-weight: 800; display: block; text-transform: uppercase; letter-spacing: 0.03em;">MANDI BENCHMARK RATE</span>
            <div style="display: flex; align-items: center; gap: 6px; margin-top: 2px;">
              <span style="color: #94a3b8; text-decoration: line-through; font-size: 0.85rem; font-weight: 600;">${dem.mandiBenchmark || '₹ 14.00 /kg'}</span>
              <span style="color: #166534; font-weight: 800; font-size: 0.76rem; background: #f0fdf4; padding: 1px 6px; border-radius: 4px; border: 1px solid #bbf7d0;">${dem.savingsPct || '12% Saved'}</span>
            </div>
          </div>
          <div>
            <span style="color: #64748b; font-size: 0.68rem; font-weight: 800; display: block; text-transform: uppercase; letter-spacing: 0.03em;">QUALITY & LOGISTICS SPEC</span>
            <span style="color: #0f172a; font-weight: 700; font-size: 0.82rem; margin-top: 2px; display: block;">${window.tGrade ? window.tGrade(dem.grade || 'Grade A') : (dem.grade || 'Grade A')} • ${dem.deliveryMode || 'Farm-Gate'}</span>
          </div>
        </div>

        <!-- Sourcing Fulfillment Progress Bar -->
        <div style="margin-bottom: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.78rem; margin-bottom: 6px;">
            <span style="color: #475569; font-weight: 600;">
              Sourced Volume: <strong style="color: ${progressTextColor}; font-weight: 800;">${dem.fulfilledTonnage || 0} / ${dem.tonnageNum || 150} ${dem.unit || 'Qt'}</strong> <span style="font-size: 0.74rem; color: #64748b;">(${((dem.fulfilledTonnage || 0) * 100).toLocaleString('en-IN')} / ${((dem.tonnageNum || 150) * 100).toLocaleString('en-IN')} kg)</span>
            </span>
            <strong style="color: ${progressTextColor}; font-weight: 800;">${fulfilledPct}% Sourced</strong>
          </div>
          <div style="height: 9px; background: #e2e8f0; border-radius: 999px; overflow: hidden;">
            <div style="width: ${fulfilledPct}%; height: 100%; background: ${progressColor}; border-radius: 999px; transition: width 0.4s ease;"></div>
          </div>
        </div>

        <!-- Action Footer -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; padding-top: 14px; border-top: 1px solid #f1f5f9;">
          <div style="display: flex; align-items: center; gap: 8px; font-size: 0.78rem; color: #475569;">
            <span style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 2px 8px; border-radius: 6px; font-weight: 600;">🛡️ ${dem.escrowAdvance || '35% Advance Escrow'}</span>
            <span style="color: #0c5a36; font-weight: 800; background: #f0fdf4; border: 1px solid #bbf7d0; padding: 2px 8px; border-radius: 6px;">${dem.moistureLimit || 'QC Guaranteed'}</span>
          </div>

          <div style="display: flex; align-items: center; gap: 8px;">
            ${bidsCount > 0 ? `
              <button class="btn btn-primary btn-sm" onclick="openDemandBidsModal('${dem.id}')" style="background: linear-gradient(135deg, #0c5a36 0%, #064e3b 100%); border-color: #0c5a36; font-weight: 800; display: flex; align-items: center; gap: 6px; box-shadow: 0 4px 10px rgba(12, 90, 54, 0.25);">
                📋 Review Farmer Bids (${bidsCount})
              </button>
            ` : `
              <button class="btn btn-outline btn-sm" onclick="showToast('✓ Broadcasting active! New farmer proposals will appear here automatically.', 'info')" style="font-size: 0.78rem; font-weight: 700; border-color: #cbd5e1; color: #475569;">
                ● Broadcasting for Bids
              </button>
            `}

            <button class="btn btn-outline btn-sm" onclick="sourceFromMarketplaceForDemand('${dem.crop}')" style="font-size: 0.78rem; font-weight: 700; border-color: #cbd5e1; color: #334155;">
              ⚡ Auto-Match Lots &rarr;
            </button>

            <button class="btn btn-outline btn-sm" onclick="downloadPurchaseOrder('${dem.id}')" style="font-size: 0.78rem; font-weight: 700; border-color: #cbd5e1; color: #334155;" title="Download Institutional Purchase Order">
              📄 PO
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Open Review Matching Farmer Bids Modal
function openDemandBidsModal(demandId) {
  const modal = document.getElementById('modal-demand-bids');
  if (!modal) return;

  const demand = buyerData.buyerDemands.find(d => d.id === demandId) || buyerData.buyerDemands[0];
  if (!demand) return;

  const titleEl = document.getElementById('bids-modal-title');
  const subtitleEl = document.getElementById('bids-modal-subtitle');
  const ceilingEl = document.getElementById('bids-modal-ceiling');
  const destEl = document.getElementById('bids-modal-dest');
  const remainingEl = document.getElementById('bids-modal-remaining');
  const listContainer = document.getElementById('bids-list-container');

  if (titleEl) titleEl.textContent = `Matching Farmer Bids (${demand.bids ? demand.bids.length : 0})`;
  if (subtitleEl) subtitleEl.textContent = `Quota #${demand.id} • ${window.tCrop ? window.tCrop(demand.crop) : demand.crop} (${demand.tonnage})`;
  if (ceilingEl) ceilingEl.textContent = demand.targetPrice;
  if (destEl) destEl.textContent = window.tLocation ? window.tLocation(demand.location) : demand.location;
  if (remainingEl) {
    const rem = Math.max(0, (demand.tonnageNum || 150) - (demand.fulfilledTonnage || 0));
    remainingEl.textContent = `${rem} ${demand.unit || 'Qt'} (${(rem * 100).toLocaleString('en-IN')} kg)`;
  }

  if (listContainer) {
    if (!demand.bids || demand.bids.length === 0) {
      listContainer.innerHTML = `
        <div style="text-align: center; padding: 24px; color: #64748b;">
          No incoming bids yet for this quota. Farmers are being alerted across the regional grid.
        </div>
      `;
    } else {
      listContainer.innerHTML = demand.bids.map(bid => {
        const isBetter = bid.bidPriceNum <= demand.targetPriceNum;
        return `
          <div style="background: #ffffff; border: 1.5px solid #bbf7d0; border-radius: 12px; padding: 14px 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.02);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <img src="${bid.farmerAvatar || 'assets/images/tomato.jpg'}" alt="${bid.farmerName}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 1.5px solid #86efac;" onerror="this.src='assets/images/tomato.jpg'" />
                <div>
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <strong style="font-size: 0.95rem; color: #0f172a;">${window.tPerson ? window.tPerson(bid.farmerName) : bid.farmerName}</strong>
                    <span style="font-size: 0.75rem; color: #0c5a36; font-weight: 700;">${bid.rating}</span>
                    <span class="badge" style="background: #f0fdf4; color: #166534; font-size: 0.7rem; font-weight: 700; padding: 2px 6px;">${bid.status || 'Verified Match'}</span>
                  </div>
                  <div style="font-size: 0.74rem; color: #64748b;">📍 ${window.tLocation ? window.tLocation(bid.location) : bid.location} • Lead Time: <strong>${bid.leadTime || '6 Hours'}</strong></div>
                </div>
              </div>

              <div style="text-align: right;">
                <div style="font-size: 1.1rem; font-weight: 800; color: #0c5a36;">${bid.bidPrice}</div>
                <div style="font-size: 0.72rem; color: #166534; font-weight: 600;">₹ ${bid.pricePerKg.toFixed(2)}/kg • ${bid.offeredQty} offered</div>
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; background: #f8fafc; padding: 8px 12px; border-radius: 8px; margin-bottom: 10px; font-size: 0.76rem;">
              <span style="color: #475569;">Digital QC Score: <strong style="color: #15803d;">${bid.qcScore}</strong></span>
              <span style="color: #475569;">Price Advantage: <strong style="color: #0c5a36;">${isBetter ? '✓ At/Below Target Ceiling' : 'Slight Premium'}</strong></span>
            </div>

            <div style="display: flex; gap: 8px; justify-content: flex-end;">
              <button class="btn btn-outline btn-sm" onclick="startNegotiationWithFarmer('${bid.farmerName}', '${demand.crop}', ${bid.bidPriceNum}, '${demand.id}')" style="font-size: 0.75rem; padding: 4px 10px;">
                💬 Chat & Negotiate
              </button>
              <button class="btn btn-primary btn-sm" onclick="acceptDemandFarmerBid('${demand.id}', '${bid.bidId}')" style="background: #0c5a36; border-color: #0c5a36; font-size: 0.75rem; font-weight: 700; padding: 4px 12px;">
                ✓ Accept Bid & Lock 35% Escrow
              </button>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  modal.classList.add('active');
}

function closeDemandBidsModal() {
  const modal = document.getElementById('modal-demand-bids');
  if (modal) modal.classList.remove('active');
}

// Accept farmer bid directly from quota board
function acceptDemandFarmerBid(demandId, bidId) {
  const demand = buyerData.buyerDemands.find(d => d.id === demandId);
  if (!demand) return;

  const bid = demand.bids ? demand.bids.find(b => b.bidId === bidId) : null;
  const farmerName = bid ? bid.farmerName : 'Farmer';
  const bidPrice = bid ? bid.bidPrice : demand.targetPrice;
  const offeredQty = bid ? bid.offeredQty : '50 Qt (5,000 kg)';

  // Calculate 35% escrow
  const totalVal = (bid ? bid.bidPriceNum : 1200) * 50;
  const escrowAdv = Math.round(totalVal * 0.35);

  closeDemandBidsModal();
  showToast(`🔒 Authorizing 35% Escrow (₹ ${escrowAdv.toLocaleString('en-IN')}) for ${farmerName}...`);

  setTimeout(() => {
    // Increment fulfilled volume
    demand.fulfilledTonnage = Math.min(demand.tonnageNum, (demand.fulfilledTonnage || 0) + 50);
    demand.fulfilledPct = Math.round((demand.fulfilledTonnage / demand.tonnageNum) * 100);
    if (demand.fulfilledPct >= 100) {
      demand.statusLabel = '✓ 100% Contracted & Fulfilled';
    }

    renderBuyerDemands();
    showToast(`✓ Proposal accepted! Contract created with ${farmerName} for ${offeredQty} at ${bidPrice}. Escrow locked.`, 'success');
    switchView('view-escrow-vault');
  }, 800);
}

// Direct jump to Marketplace filtered for this crop
function sourceFromMarketplaceForDemand(cropName) {
  let keyword = cropName.split(' ')[0].replace(/[^a-zA-Z]/g, '');
  const searchInput = document.getElementById('marketplace-search-input');
  if (searchInput) {
    searchInput.value = keyword;
    handleBuyerSearch(keyword);
  }
  showToast(`Filtering marketplace lots for ${keyword}...`);
  switchView('view-verified-produce');
}

// Download Individual PO
function downloadPurchaseOrder(demandId) {
  const demand = (buyerData && buyerData.buyerDemands) ? buyerData.buyerDemands.find(d => d.id === demandId) : null;
  if (window.generateAndOpenPO) {
    const cropName = demand ? demand.crop : 'Red Onion (Lasalgaon Garwa Export)';
    const qtyText = demand ? `${demand.totalQuantityQt} Qt (${(demand.totalQuantityQt * 100).toLocaleString('en-IN')} kg)` : '50 Qt (5,000 kg)';
    const totalVal = demand ? Math.round(demand.totalQuantityQt * demand.targetPriceNum) : 90000;
    window.generateAndOpenPO(demandId, cropName, qtyText, 'Patil Rameshwar', totalVal);
  } else {
    showToast(`Generating official Purchase Order (PO #${demandId}) PDF with digital stamp...`);
  }
}

// Download All POs
function downloadAllPurchaseOrders() {
  showToast('Generating institutional Master Procurement Demand Sheet (PDF) for all active quotas...');
  setTimeout(() => {
    showToast('✓ Master Procurement Report (6 Active Quotas) downloaded successfully!');
  }, 850);
}

// Refresh Auto-Match
function refreshDemandMatches() {
  showToast('🔄 Scanning real-time mandi feeds & regional farm-gate GPS clusters...');
  setTimeout(() => {
    buyerData.buyerDemands.forEach(d => {
      if (d.fulfilledPct < 100) {
        d.matchedCount = Math.floor(3 + Math.random() * 4);
      }
    });
    renderBuyerDemands();
    showToast('✓ Regional farmer clusters synced! 4 new farm-gate lots matched.', 'success');
  }, 900);
}

// Chat Messaging Data Store & Functionality (Dynamic for ALL Marketplace Farmers)
const chatConversations = {
  patil: {
    name: "Patil Rameshwar",
    avatar: "assets/images/onion.jpg",
    status: "● Online • Lasalgaon, Nashik, Maharashtra",
    lotId: "LOT-ONI-01",
    crop: "Red Onion (Nashik Garwa Quality)",
    farmerPhone: "+91 98220-44911",
    offerText: "Farmer Ask Rate: <strong style=\"color: #0c5a36;\">₹ 18.00 /kg</strong> for 10,000 kg (Lasalgaon APMC Gate)",
    counterRate: 18.00,
    lockRateText: "Lock 35% Escrow (₹ 18.00/kg)",
    messages: [
      { type: "incoming", text: "Namaste Karthik sir! I have 10,000 kg export-graded Garwa red onions cured and ready at Lasalgaon APMC yard." },
      { type: "outgoing", text: "Hello Patil ji! We are looking for immediate institutional dispatch to Navi Mumbai Terminal. Can you load today?" },
      { type: "incoming", text: "Yes sir, weighing is completed on electronic weighbridge. Once 35% advance escrow is locked, truck can move immediately via Samruddhi Expressway." }
    ]
  },
  deshmukh: {
    name: "Sanjay Deshmukh",
    avatar: "assets/images/tomato.jpg",
    status: "● Online • Manchar, Pune (18 km away)",
    lotId: "LOT-TOM-02",
    crop: "Tomato (Shivam / Abhinav Hybrid)",
    farmerPhone: "+91 98224-33100",
    offerText: "Farmer countered at <strong style=\"color: #0c5a36;\">₹ 13.00 /kg</strong> for 6,000 kg (Retail Ready)",
    counterRate: 13.00,
    lockRateText: "Lock 35% Escrow (₹ 13.00/kg)",
    messages: [
      { type: "incoming", text: "Hello sir, my 6,000 kg Narayangaon hybrid tomato harvest has 82% firmness index, packed in sanitized returnable crates." },
      { type: "outgoing", text: "Hi Sanjay ji, what is your best floor price for the entire lot?" },
      { type: "incoming", text: "I can offer ₹ 13.00/kg direct farm-gate price if payment is routed through AgriNex Smart Escrow." }
    ]
  },
  shinde: {
    name: "Rajesh Shinde",
    avatar: "assets/images/banana.jpg",
    status: "● Online • Raver, Jalgaon (Khandesh Banana Belt)",
    lotId: "LOT-BAN-03",
    crop: "Grand Naine Banana (GI Khandesh Export)",
    farmerPhone: "+91 98500-11234",
    offerText: "GI Certified Khandesh: <strong style=\"color: #0c5a36;\">₹ 14.50 /kg</strong> for 12,000 kg",
    counterRate: 14.50,
    lockRateText: "Lock 35% Escrow (₹ 14.50/kg)",
    messages: [
      { type: "incoming", text: "Namaskar! 12,000 kg Grand Naine bananas harvested at mature green stage with 7-8 hands per bunch ready for reefer transport." },
      { type: "outgoing", text: "Excellent quality! We need temperature-logged reefer transport at 13.5°C to Navi Mumbai." },
      { type: "incoming", text: "All pre-cooling and foam pad packaging done. Ready for loading at Raver hub." }
    ]
  },
  jadhav: {
    name: "Anandrao Jadhav",
    avatar: "assets/images/wheat-logo.png",
    status: "● Online • Latur Mega APMC Silo Yard",
    lotId: "LOT-SOY-04",
    crop: "Yellow Soybean (JS 335 / High Protein)",
    farmerPhone: "+91 98231-55890",
    offerText: "FPO Bulk Single-Origin: <strong style=\"color: #0c5a36;\">₹ 42 /kg</strong> for 150 Qt",
    counterRate: 4200,
    lockRateText: "Lock 35% Escrow (₹ 42/kg)",
    messages: [
      { type: "incoming", text: "Greetings Karthik! Latur FPO has 150 Qt clean JS-335 soybean with 19% oil content ready in 50kg jute bags." }
    ]
  },
  thorat: {
    name: "Kavita Thorat",
    avatar: "assets/images/turmeric.jpg",
    status: "● Online • Sangli APMC (Turmeric Market)",
    lotId: "LOT-TUR-06",
    crop: "Sangli Rajapuri Turmeric Finger",
    farmerPhone: "+91 98228-88190",
    offerText: "Lab Tested Curcumin 4.8%: <strong style=\"color: #0c5a36;\">₹ 135 /kg</strong> for 50 Qt",
    counterRate: 13500,
    lockRateText: "Lock 35% Escrow (₹ 135/kg)",
    messages: [
      { type: "incoming", text: "Namaste sir, 50 Qt double-polished Rajapuri turmeric fingers available for direct institutional spice procurement." }
    ]
  },
  wankhede: {
    name: "Vikas Wankhede",
    avatar: "assets/images/orange.jpg",
    status: "● Online • Katol, Nagpur (Vidarbha Citrus)",
    lotId: "LOT-ORG-05",
    crop: "Nagpur Orange / Santra (GI Vidarbha Quality)",
    farmerPhone: "+91 98222-33104",
    offerText: "GI Table Fruit: <strong style=\"color: #0c5a36;\">₹ 38 /kg</strong> for 80 Qt",
    counterRate: 3800,
    lockRateText: "Lock 35% Escrow (₹ 38/kg)",
    messages: [
      { type: "incoming", text: "Hello Karthik sir, fresh harvest Nagpur mandarins graded by electronic weight sizer ready at Katol packhouse." }
    ]
  },
  chavan: {
    name: "Sunil Chavan",
    avatar: "assets/images/pomegranate.jpg?v=2",
    status: "● Online • Pandharpur, Solapur (Pomegranate Belt)",
    lotId: "LOT-POM-07",
    crop: "Bhagwa Pomegranate (Solapur Export Grade)",
    farmerPhone: "+91 98226-44102",
    offerText: "Deep Red Arils: <strong style=\"color: #0c5a36;\">₹ 88 /kg</strong> for 40 Qt",
    counterRate: 8800,
    lockRateText: "Lock 35% Escrow (₹ 88/kg)",
    messages: [
      { type: "incoming", text: "Namaskar! 40 Qt export-grade Bhagwa pomegranates (250g+ fruit weight) boxed in 10kg corrugated cartons." }
    ]
  },
  more: {
    name: "Balasaheb More",
    avatar: "assets/images/cotton.jpg?v=2",
    status: "● Online • Amravati APMC (Vidarbha Cotton Yard)",
    lotId: "LOT-COT-08",
    crop: "Raw Cotton (Vidarbha Long Staple)",
    farmerPhone: "+91 98225-77890",
    offerText: "Staple >29mm: <strong style=\"color: #0c5a36;\">₹ 62 /kg</strong> for 90 Qt",
    counterRate: 6200,
    lockRateText: "Lock 35% Escrow (₹ 62/kg)",
    messages: [
      { type: "incoming", text: "Greetings! 90 Qt long staple cotton pressed bales ready for institutional textile & ginning delivery." }
    ]
  }
};

let activeChatKey = 'patil';

// Filter Chat Contacts in Sidebar
function filterChatContacts(query) {
  const q = (query || '').toLowerCase().trim();
  const contacts = document.querySelectorAll('.chat-contact');
  contacts.forEach(c => {
    const text = c.textContent.toLowerCase();
    if (!q || text.includes(q)) {
      c.style.display = 'flex';
    } else {
      c.style.display = 'none';
    }
  });
}

// Quick reply chip helper
function insertQuickChatMsg(text) {
  const input = document.getElementById('chat-input-field');
  if (input) {
    input.value = text;
    input.focus();
  }
}

// Render Dynamic Chat Sidebar with all active farmers
function renderChatSidebar() {
  const container = document.getElementById('chat-contacts-container');
  if (!container) return;

  const isMr = window.getBuyerLanguage && window.getBuyerLanguage() === 'mr';
  const isHi = window.getBuyerLanguage && window.getBuyerLanguage() === 'hi';
  const onlineText = isMr ? 'सक्रिय' : isHi ? 'सक्रिय' : 'Online';

  const keys = Object.keys(chatConversations);
  const badge = document.getElementById('chat-active-count-badge');
  if (badge) badge.textContent = `${keys.length} ${onlineText}`;

  container.innerHTML = keys
    .map(key => {
      const chat = chatConversations[key];
      const transName = window.tPerson ? window.tPerson(chat.name) : chat.name;
      const transCrop = window.tCrop ? window.tCrop(chat.crop) : chat.crop;
      const lastMsg = chat.messages && chat.messages.length > 0 
        ? (window.tText ? window.tText(chat.messages[chat.messages.length - 1].text) : chat.messages[chat.messages.length - 1].text)
        : `Ask: ${chat.offerText.replace(/<[^>]*>/g, '')}`;
      const isActive = key === activeChatKey ? 'active' : '';

      return `
        <div class="chat-contact ${isActive}" id="chat-contact-${key}" onclick="selectChatContact('${key}')">
          <div class="avatar-wrapper">
            <img src="${chat.avatar}" alt="${transName}" style="width: 42px; height: 42px; border-radius: 50%; object-fit: cover;" onerror="this.src='assets/images/tomato.jpg'" />
            <span class="avatar-online-dot"></span>
          </div>
          <div style="flex: 1; min-width: 0;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
              <strong style="font-size: 0.88rem; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 140px;">${transName}</strong>
              <span style="font-size: 0.65rem; color: #166534; font-weight: 700; background: #f0fdf4; padding: 1px 5px; border-radius: 4px;">${onlineText}</span>
            </div>
            <div style="font-size: 0.72rem; color: #0c5a36; font-weight: 700;">${transCrop}</div>
            <span style="font-size: 0.72rem; color: #64748b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block; margin-top: 2px;">${lastMsg}</span>
          </div>
        </div>
      `;
    })
    .join('');
}

// Select a specific Farmer Chat Contact
function selectChatContact(contactKey) {
  if (!chatConversations[contactKey]) return;
  activeChatKey = contactKey;
  const chat = chatConversations[contactKey];

  const isMr = window.getBuyerLanguage && window.getBuyerLanguage() === 'mr';
  const isHi = window.getBuyerLanguage && window.getBuyerLanguage() === 'hi';

  const transName = window.tPerson ? window.tPerson(chat.name) : chat.name;
  const transCrop = window.tCrop ? window.tCrop(chat.crop) : chat.crop;
  const transStatus = window.tLocation ? window.tLocation(chat.status) : chat.status;
  const counterBtnText = isMr ? 'प्रति-बोली द्या' : isHi ? 'प्रति-प्रस्ताव' : 'Counter Offer';
  const lockRateBtnText = window.tText ? window.tText(chat.lockRateText) : chat.lockRateText;
  const activeOfferLabel = isMr ? 'सक्रिय ऑफर:' : isHi ? 'सक्रिय ऑफर:' : 'Active Offer:';
  const acceptLockText = isMr ? '✓ स्वीकारा व सुरक्षित करा' : isHi ? '✓ स्वीकारें एवं लॉक करें' : '✓ Accept & Lock';
  const reCounterText = isMr ? 'पुन्हा बोली द्या' : isHi ? 'पुनः बोली लगाएं' : 'Re-counter';

  // Update active pill in sidebar
  document.querySelectorAll('.chat-contact').forEach(c => c.classList.remove('active'));
  const activeEl = document.getElementById(`chat-contact-${contactKey}`);
  if (activeEl) activeEl.classList.add('active');

  // Update Header
  const headerName = document.getElementById('chat-header-name');
  const headerStatus = document.getElementById('chat-header-status');
  const headerAvatar = document.getElementById('chat-header-avatar');
  if (headerName) headerName.textContent = transName;
  if (headerStatus) headerStatus.textContent = `${transStatus} • ${transCrop}`;
  if (headerAvatar) headerAvatar.src = chat.avatar;

  const headerActions = document.querySelector('.chat-main .chat-header div:last-child');
  if (headerActions) {
    headerActions.innerHTML = `
      <button class="btn btn-outline btn-sm" onclick="openBidModal('${chat.lotId}')" style="font-weight: 700; border-color: #cbd5e1; color: #334155;">${counterBtnText}</button>
      <button class="btn btn-primary btn-sm" onclick="openDirectBuyModal('${chat.lotId}')" style="background: linear-gradient(135deg, #0c5a36 0%, #064e3b 100%); font-weight: 800; box-shadow: 0 4px 10px rgba(12, 90, 54, 0.25);">${lockRateBtnText}</button>
    `;
  }

  // Update Active Offer Banner
  const banner = document.querySelector('.chat-offer-banner');
  if (banner) {
    const transOfferText = window.tText ? window.tText(chat.offerText) : chat.offerText;
    banner.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px;">
        <span style="background: #ca8a04; color: #ffffff; width: 22px; height: 22px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800; box-shadow: 0 2px 6px rgba(202,138,4,0.3);">⚡</span>
        <span style="color: #713f12;"><strong>${activeOfferLabel}</strong> ${transOfferText}</span>
      </div>
      <div style="display: flex; gap: 8px;">
        <button class="btn btn-primary btn-sm" onclick="acceptFarmerCounter('${chat.lotId}', ${chat.counterRate})" style="background: #15803d; border-color: #15803d; padding: 5px 12px; font-size: 0.76rem; font-weight: 800;">${acceptLockText}</button>
        <button class="btn btn-outline btn-sm" onclick="openBidModal('${chat.lotId}')" style="padding: 5px 10px; font-size: 0.76rem; font-weight: 700; background: #ffffff;">${reCounterText}</button>
      </div>
    `;
  }

  // Render Messages
  const container = document.getElementById('chat-messages-container');
  if (container) {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    container.innerHTML = chat.messages
      .map(m => `
        <div class="chat-bubble-group ${m.type}">
          <div class="chat-bubble ${m.type}">
            ${window.tText ? window.tText(m.text) : m.text}
          </div>
          <div class="chat-meta-bar ${m.type}">
            <span>${timeNow}</span>
            ${m.type === 'outgoing' ? '<span style="color: #16a34a; font-weight: 800;">✓✓</span>' : ''}
          </div>
        </div>
      `)
      .join('');
    container.scrollTop = container.scrollHeight;
  }
}

// Open Chat directly with any Farmer from Marketplace Lot Card
function openFarmerChat(lotId) {
  let matchedKey = 'patil';
  
  // Find matching key for lotId
  for (const [key, conv] of Object.entries(chatConversations)) {
    if (conv.lotId === lotId) {
      matchedKey = key;
      break;
    }
  }

  // If not found in presets, create dynamic session from buyerData.verifiedLots
  if (!chatConversations[matchedKey] || chatConversations[matchedKey].lotId !== lotId) {
    const lot = buyerData.verifiedLots.find(l => l.id === lotId);
    if (lot) {
      const slug = lot.farmerName.toLowerCase().replace(/[^a-z0-9]/g, '_');
      const kgPrice = lot.pricePerKg || (lot.priceNum / 100).toFixed(0);
      chatConversations[slug] = {
        name: lot.farmerName,
        avatar: lot.image || 'assets/images/farmer-avatar.jpg',
        status: `● Online • ${lot.farmerLocation}`,
        lotId: lot.id,
        crop: lot.crop,
        farmerPhone: lot.farmerPhone || '+91 98422-00000',
        offerText: `Farmer Ask: <strong style="color: #0c5a36;">₹ ${kgPrice} /kg</strong> (${lot.askPrice}) for ${lot.quantity}`,
        counterRate: lot.priceNum,
        lockRateText: `Lock 35% Escrow (₹ ${kgPrice}/kg)`,
        messages: [
          { type: "incoming", text: `Namaste Karthik sir! I am ${lot.farmerName}. My lot of ${lot.crop} (${lot.quantity}) is ready for immediate procurement.` }
        ]
      };
      matchedKey = slug;
    }
  }

  renderChatSidebar();
  selectChatContact(matchedKey);
  switchView('view-messages');

  const farmerObj = chatConversations[matchedKey];
  showToast(`💬 Direct negotiation room opened with ${farmerObj.name} (${farmerObj.crop})!`);
}

function sendChatMessage() {
  const input = document.getElementById('chat-input-field');
  const container = document.getElementById('chat-messages-container');
  if (!input || !container || !input.value.trim()) return;

  const msg = input.value.trim();
  const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const group = document.createElement('div');
  group.className = 'chat-bubble-group outgoing';
  group.innerHTML = `
    <div class="chat-bubble outgoing">${msg}</div>
    <div class="chat-meta-bar outgoing">
      <span>${timeNow}</span>
      <span style="color: #16a34a; font-weight: 800;">✓✓</span>
    </div>
  `;
  container.appendChild(group);

  if (chatConversations[activeChatKey]) {
    chatConversations[activeChatKey].messages.push({ type: "outgoing", text: msg });
  }

  input.value = '';
  container.scrollTop = container.scrollHeight;

  // Auto farmer reply after 1s
  const currentKey = activeChatKey;
  const currentCrop = chatConversations[currentKey] ? chatConversations[currentKey].crop : 'produce';

  setTimeout(() => {
    let replyText = `Thank you for your message! As agreed for ${currentCrop}, we will prepare the vehicle weighing pass once escrow advance is initiated.`;
    if (msg.toLowerCase().includes('price') || msg.toLowerCase().includes('rate') || msg.toLowerCase().includes('discount') || msg.toLowerCase().includes('offer')) {
      replyText = `Understood Karthik sir. I can offer an instant discount of ₹ 1.50/kg if you confirm bulk lifting with verified lorry receipt today!`;
    } else if (msg.toLowerCase().includes('sample') || msg.toLowerCase().includes('assay') || msg.toLowerCase().includes('quality') || msg.toLowerCase().includes('moisture')) {
      replyText = `Digital moisture and assay report is verified at ${chatConversations[currentKey]?.status?.split('•')[1] || 'farm gate'}. Quality is 100% guaranteed Grade A.`;
    }

    const replyGroup = document.createElement('div');
    replyGroup.className = 'chat-bubble-group incoming';
    const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    replyGroup.innerHTML = `
      <div class="chat-bubble incoming">${replyText}</div>
      <div class="chat-meta-bar incoming">
        <span>${replyTime}</span>
      </div>
    `;
    container.appendChild(replyGroup);

    if (chatConversations[currentKey]) {
      chatConversations[currentKey].messages.push({ type: "incoming", text: replyText });
    }

    renderChatSidebar();
    container.scrollTop = container.scrollHeight;
  }, 900);
}

window.filterChatContacts = filterChatContacts;
window.insertQuickChatMsg = insertQuickChatMsg;

// Direct Buy Escrow Modal
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

  modal.classList.add('active');
}

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

// Accept Counter Offer directly from In-Chat banner
function acceptFarmerCounter(lotId, agreedRate) {
  openNegotiationModal(lotId, agreedRate);
}

// Confirm 35% Escrow from Negotiation modal
function confirmEscrowFromCounter() {
  closeNegotiationModal();
  executeBuyerLotPurchase(currentNegotiation.lotId, currentNegotiation.bidPrice);
  showToast(`🎉 35% Advance Escrow (₹ ${currentNegotiation.escrowAmount.toLocaleString('en-IN')}) locked! Contract created with ${currentNegotiation.farmerName || 'Farmer'}.`, 'success');
  switchView('view-consignments');
}

// Post Demand Modal
function openPostDemandModal() {
  const modal = document.getElementById('modal-post-demand');
  if (modal) modal.classList.add('active');
}

function closePostDemandModal() {
  const modal = document.getElementById('modal-post-demand');
  if (modal) modal.classList.remove('active');
}

// Location Switcher
function initLocationSwitcher() {
  const locBtn = document.getElementById('btn-change-buyer-location');
  const locText = document.getElementById('buyer-location-text');
  if (!locBtn || !locText) return;

  const locations = ["Vashi Terminal, Navi Mumbai (MH)", "Pune APMC Central Hub, MH", "Nashik-Lasalgaon Yard, MH", "Nagpur Multi-Modal Terminal, MH", "Kolhapur Shahu Market Yard, MH", "Latur Mega Yard, MH"];
  let currIdx = 0;

  locBtn.addEventListener('click', () => {
    currIdx = (currIdx + 1) % locations.length;
    locText.textContent = locations[currIdx];
    showToast(`Active procurement hub updated to ${locations[currIdx]}`);
  });
}

// ==========================================
// LOGISTICS, ORDERS SHIPMENTS & ESCROW RELEASE
// ==========================================

let currentBuyerShipmentTab = 'all';
let buyerShipmentSearchQuery = '';

function handleBuyerShipmentSearch(query) {
  buyerShipmentSearchQuery = (query || '').trim().toLowerCase();
  renderBuyerConsignments();
}

function filterBuyerShipmentsTab(tab, btn) {
  currentBuyerShipmentTab = tab;
  document.querySelectorAll('.buyer-shipment-tab').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderBuyerConsignments();
}

function renderBuyerConsignments() {
  const container = document.getElementById('consignments-list-container');
  if (!container) return;

  const consignments = (buyerData && buyerData.consignments) ? buyerData.consignments : [];

  // Update top 4 KPI cards if present
  const activeTrucksEl = document.getElementById('buyer-stat-active-trucks');
  const volumeTransitEl = document.getElementById('buyer-stat-volume-transit');
  const gatePassesEl = document.getElementById('buyer-stat-gate-passes');

  const onRoadCount = consignments.filter(c => c.status === 'transit').length;
  const transitQt = consignments.filter(c => c.status === 'transit').reduce((sum, c) => sum + (c.quantity_qt || 0), 0);
  const transitKg = consignments.filter(c => c.status === 'transit').reduce((sum, c) => sum + (c.quantity_kg || (c.quantity_qt * 100)), 0);
  const readyGatePasses = consignments.filter(c => c.gate_pass).length;

  if (activeTrucksEl) activeTrucksEl.textContent = `${onRoadCount} On Road`;
  if (volumeTransitEl) volumeTransitEl.innerHTML = `${transitQt} Qt <span style="font-size:0.72rem; color:#64748b; font-weight:600;">(${transitKg.toLocaleString('en-IN')} kg)</span>`;
  if (gatePassesEl) gatePassesEl.textContent = `${readyGatePasses} Ready`;

  // Update Shipment Filter Tab Badges
  const allCount = consignments.length;
  const transitCount = onRoadCount;
  const schedCount = consignments.filter(c => c.status === 'scheduled').length;
  const delivCount = consignments.filter(c => c.status === 'delivered').length;

  const tabAll = document.getElementById('tab-shipments-all');
  const tabTransit = document.getElementById('tab-shipments-transit');
  const tabSched = document.getElementById('tab-shipments-scheduled');
  const tabDeliv = document.getElementById('tab-shipments-delivered');
  const tabDrivers = document.getElementById('tab-shipments-drivers');

  if (tabAll) tabAll.textContent = `All Active Orders (${allCount})`;
  if (tabTransit) tabTransit.textContent = `On The Road (${transitCount})`;
  if (tabSched) tabSched.textContent = `Scheduled (${schedCount})`;
  if (tabDeliv) tabDeliv.textContent = `Delivered & Settled (${delivCount})`;
  if (tabDrivers) tabDrivers.textContent = `Driver & Vehicle Telemetry (${allCount})`;

  updateBuyerMarketStats();

  // Filter list
  const filtered = consignments.filter(s => {
    if (currentBuyerShipmentTab !== 'all' && currentBuyerShipmentTab !== 'drivers' && s.status !== currentBuyerShipmentTab) return false;
    if (buyerShipmentSearchQuery) {
      const q = buyerShipmentSearchQuery;
      const matchTrk = (s.tracking_id || '').toLowerCase().includes(q);
      const matchGp = (s.gate_pass || '').toLowerCase().includes(q);
      const matchCrop = (s.crop || '').toLowerCase().includes(q);
      const matchDrv = (s.driver || '').toLowerCase().includes(q);
      const matchVeh = (s.vehicle || '').toLowerCase().includes(q);
      const matchFarmer = (s.farmer || '').toLowerCase().includes(q);
      const matchDst = (s.destination || '').toLowerCase().includes(q);
      if (!matchTrk && !matchGp && !matchCrop && !matchDrv && !matchVeh && !matchFarmer && !matchDst) {
        return false;
      }
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="background: #ffffff; border: 1px dashed #cbd5e1; border-radius: 12px; padding: 40px 20px; text-align: center; color: #64748b;">
        <div style="font-size: 2.2rem; margin-bottom: 8px;">🚚</div>
        <div style="font-weight: 700; font-size: 1rem; color: #0f172a;">No Shipments Found in this Tab</div>
        <div style="font-size: 0.8rem; margin-top: 4px;">Book dedicated transport fleet or source from marketplace lots to create shipments.</div>
        <button class="btn btn-primary btn-sm" onclick="openBookTransportModal()" style="margin-top: 14px; background: #0c5a36; border-color: #0c5a36; font-weight: 700;">+ Book Transport Fleet</button>
      </div>
    `;
    return;
  }

  // SPECIAL VIEW: Dedicated Driver & Vehicle Details Tab
  if (currentBuyerShipmentTab === 'drivers') {
    container.innerHTML = `
      <div style="margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 12px 18px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="font-size: 1.4rem;">🚚</span>
          <div>
            <strong style="color: #0f172a; font-size: 0.95rem;">Verified Driver & Fleet Telemetry Directory</strong>
            <span style="display: block; font-size: 0.75rem; color: #64748b;">Live GPS beacon tracking, commercial license status, weighbridge tare/gross load, and reefer temperatures</span>
          </div>
        </div>
        <span style="font-size: 0.75rem; background: #e8f5ed; color: #0c5a36; font-weight: 800; padding: 4px 10px; border-radius: 999px; border: 1px solid #bbf7d0;">
          ✓ 100% AIS-140 GPS Compliant
        </span>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 16px;">
        ${filtered.map(s => {
          const qtyKg = s.quantity_kg || (s.quantity_qt * 100);
          const isTransit = s.status === 'transit';
          const isDelivered = s.status === 'delivered';
          const statusBg = isTransit ? '#eff6ff' : (isDelivered ? '#ecfdf5' : '#fefce8');
          const statusColor = isTransit ? '#1d4ed8' : (isDelivered ? '#047857' : '#a16207');
          const statusBorder = isTransit ? '#bfdbfe' : (isDelivered ? '#a7f3d0' : '#fef08a');
          const statusLabel = isTransit ? 'On The Road' : (isDelivered ? 'Delivered & Released' : 'Pickup Scheduled');

          return `
            <div class="order-box" style="margin-bottom: 0; display: flex; flex-direction: column; justify-content: space-between;">
              <!-- Card Header -->
              <div>
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #f1f5f9;">
                  <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="width: 44px; height: 44px; border-radius: 50%; background: #0c5a36; color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; font-weight: 800;">
                      👨‍✈️
                    </div>
                    <div>
                      <div style="display: flex; align-items: center; gap: 6px;">
                        <strong style="font-size: 1.02rem; color: #0f172a;">${window.tPerson ? window.tPerson(s.driver) : s.driver}</strong>
                        <span style="font-size: 0.68rem; background: #e8f5ed; color: #0c5a36; font-weight: 800; padding: 1px 6px; border-radius: 4px;">✓ Verified</span>
                      </div>
                      <span style="font-size: 0.76rem; color: #64748b;">${s.transporter || 'GreenWays Transit'} • <strong style="color: #f59e0b;">4.9 ⭐</strong></span>
                    </div>
                  </div>
                  <span style="background: ${statusBg}; color: ${statusColor}; border: 1px solid ${statusBorder}; padding: 3px 9px; border-radius: 999px; font-size: 0.72rem; font-weight: 800;">
                    ● ${statusLabel}
                  </span>
                </div>

                <!-- 4 Telemetry Metrics Grid -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 0.8rem; margin-bottom: 14px;">
                  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 10px;">
                    <span style="color: #64748b; font-size: 0.68rem; display: block; text-transform: uppercase;">Vehicle & Model</span>
                    <strong style="color: #0f172a; font-size: 0.82rem;">${s.vehicle}</strong>
                  </div>
                  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 10px;">
                    <span style="color: #64748b; font-size: 0.68rem; display: block; text-transform: uppercase;">Commercial DL No.</span>
                    <strong style="color: #0f172a; font-size: 0.82rem;">${s.dl_no || 'MH-15-2019-0912'}</strong>
                  </div>
                  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 10px;">
                    <span style="color: #64748b; font-size: 0.68rem; display: block; text-transform: uppercase;">Payload Capacity</span>
                    <strong style="color: #0c5a36; font-size: 0.82rem;">${s.capacity || s.quantity_qt + ' Qt Payload'}</strong>
                  </div>
                  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 10px;">
                    <span style="color: #64748b; font-size: 0.68rem; display: block; text-transform: uppercase;">Cargo Temperature</span>
                    <strong style="color: #0284c7; font-size: 0.82rem;">${s.temp || '18.2°C (Optimal)'}</strong>
                  </div>
                </div>

                <!-- Route & Consignment Strip -->
                <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 9px 12px; font-size: 0.78rem; margin-bottom: 14px; color: #1e3a8a;">
                  <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
                    <span>📦 <strong>${window.tCrop ? window.tCrop(s.crop) : s.crop}</strong> (${s.quantity_qt} Qt • ${qtyKg.toLocaleString('en-IN')} kg)</span>
                    <span style="font-family: monospace; font-weight: 700; color: #2563eb;">#${s.tracking_id}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px; font-size: 0.74rem; color: #3b82f6;">
                    <span>📍 ${window.tLocation ? window.tLocation(s.loc) : s.loc}</span>
                    <span style="font-weight: 700; color: #1d4ed8;">⏱️ ${s.eta}</span>
                  </div>
                </div>
              </div>

              <!-- Action Buttons -->
              <div style="display: flex; gap: 6px; flex-wrap: wrap; justify-content: space-between; padding-top: 10px; border-top: 1px solid #f1f5f9;">
                <a href="tel:${s.driver_phone}" class="btn btn-primary btn-sm" style="flex: 1; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 4px; background: #0c5a36; border-color: #0c5a36; font-size: 0.78rem;">
                  <span>📞</span> Call
                </a>
                <button class="btn btn-outline btn-sm" onclick="openDriverFleetModal('${s.tracking_id}')" style="font-size: 0.78rem; font-weight: 700;">
                  🔍 Full Details
                </button>
                <button class="btn btn-outline btn-sm" onclick="openGpsModal('${s.tracking_id}', '${s.vehicle}', '${s.driver}', '${s.loc}')" style="font-size: 0.78rem; font-weight: 700; color: #0284c7; border-color: #7dd3fc;">
                  📍 Live GPS
                </button>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(s => {
    const qtyKg = s.quantity_kg || (s.quantity_qt * 100);
    const isTransit = s.status === 'transit';
    const isDelivered = s.status === 'delivered';
    const isScheduled = s.status === 'scheduled';

    const tr = (txt) => (window.tText ? window.tText(txt) : txt);
    const statusBadgeBg = isTransit ? '#eff6ff' : (isDelivered ? '#ecfdf5' : '#fefce8');
    const statusBadgeColor = isTransit ? '#1d4ed8' : (isDelivered ? '#047857' : '#a16207');
    const statusBadgeBorder = isTransit ? '#bfdbfe' : (isDelivered ? '#a7f3d0' : '#fef08a');
    const rawStatusLabel = isTransit ? 'On The Road' : (isDelivered ? 'Delivered & QC Passed' : 'Pickup Scheduled');
    const statusLabel = tr(rawStatusLabel);

    return `
      <div class="shipment-order-box">
        <div class="order-header-row" style="margin-bottom: 16px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <strong style="font-size: 1.05rem; color: #0f172a; font-family: monospace;">#${s.tracking_id}</strong>
            <span style="color: #cbd5e1;">|</span>
            <span style="font-size: 0.82rem; color: #0c5a36; font-weight: 800; background: #f0fdf4; border: 1px solid #bbf7d0; padding: 2px 8px; border-radius: 6px;">📑 ${tr('Gate Pass')}: ${s.gate_pass}</span>
          </div>
          <span style="background: ${statusBadgeBg}; color: ${statusBadgeColor}; border: 1px solid ${statusBadgeBorder}; padding: 4px 12px; border-radius: 999px; font-size: 0.76rem; font-weight: 800;">
            ● ${statusLabel}
          </span>
        </div>

        <!-- 4-Step Stepper -->
        <div class="step-track" style="margin: 16px 0 22px;">
          <div>
            <div class="step-dot done">✓</div>
            <div style="font-size: 0.74rem; font-weight: 800; color: #0f172a;">${tr('1. Confirmed')}</div>
          </div>
          <div>
            <div class="step-dot ${s.step >= 2 ? 'done' : ''}">${s.step >= 2 ? '✓' : '2'}</div>
            <div style="font-size: 0.74rem; font-weight: 800; color: #0f172a;">${tr('2. 35% Advance Paid')}</div>
          </div>
          <div>
            <div class="step-dot ${s.step >= 3 ? (s.step === 3 ? 'active' : 'done') : ''}">${s.step > 3 ? '✓' : '3'}</div>
            <div style="font-size: 0.74rem; font-weight: 800; color: #0f172a;">${tr('3. In Truck / Transit')}</div>
          </div>
          <div>
            <div class="step-dot ${s.step >= 4 ? 'done' : ''}">${s.step === 4 ? '✓' : '4'}</div>
            <div style="font-size: 0.74rem; font-weight: 800; color: #0f172a;">${tr('4. Delivered & Released')}</div>
          </div>
        </div>

        <!-- 3-Column Info Strip -->
        <div class="shipment-info-box">
          <div>
            <div style="font-size: 0.68rem; color: #64748b; font-weight: 800; text-transform: uppercase; letter-spacing: 0.03em;">${tr('Produce & Farmer')}</div>
            <div style="font-weight: 900; font-size: 1rem; color: #0f172a; margin: 2px 0;">${window.tCrop ? window.tCrop(s.crop) : s.crop}</div>
            <div style="color: #0c5a36; font-weight: 800; font-size: 0.88rem;">${s.quantity_qt} Qt (${qtyKg.toLocaleString('en-IN')} kg)</div>
            <div style="color: #475569; font-size: 0.78rem; font-weight: 600; margin-top: 2px;">📍 ${window.tPerson ? window.tPerson(s.farmer) : s.farmer} (${window.tLocation ? window.tLocation(s.farmer_origin) : s.farmer_origin})</div>
          </div>
          <div>
            <div style="font-size: 0.68rem; color: #64748b; font-weight: 800; text-transform: uppercase; letter-spacing: 0.03em;">${tr('Driver & Fleet Telemetry')}</div>
            <div style="font-weight: 800; color: #0f172a; display: flex; align-items: center; gap: 6px; margin: 2px 0;">
              <span>👨‍✈️ ${window.tPerson ? window.tPerson(s.driver) : s.driver}</span>
              <span style="font-size: 0.68rem; background: #e0f2fe; color: #0369a1; padding: 1px 6px; border-radius: 4px; font-weight: 800;">${s.transporter ? s.transporter.split(' ')[0] : 'Transit'}</span>
            </div>
            <div style="color: #334155; font-size: 0.82rem; font-weight: 700;">🚛 ${s.vehicle}</div>
            <div style="font-size: 0.78rem; display: flex; gap: 8px; align-items: center; margin-top: 3px;">
              <a href="tel:${s.driver_phone}" style="color: #0284c7; text-decoration: none; font-weight: 800;">📞 ${s.driver_phone}</a>
              ${s.temp ? `<span style="color: #059669; font-size: 0.74rem; font-weight: 800; background: #ecfdf5; padding: 1px 6px; border-radius: 4px;">🌡️ ${s.temp.split(' ')[0]}</span>` : ''}
            </div>
          </div>
          <div>
            <div style="font-size: 0.68rem; color: #64748b; font-weight: 800; text-transform: uppercase; letter-spacing: 0.03em;">${tr('Delivery Destination & ETA')}</div>
            <div style="color: #0f172a; font-weight: 800; margin: 2px 0;">🏢 ${window.tLocation ? window.tLocation(s.destination) : s.destination}</div>
            <div style="color: #0284c7; font-weight: 800; font-size: 0.82rem;">📍 ${window.tLocation ? window.tLocation(s.loc) : s.loc}</div>
            <div style="color: #d97706; font-weight: 800; font-size: 0.82rem; margin-top: 2px;">⏱️ ETA: ${s.eta}</div>
          </div>
        </div>

        <!-- Actions & Escrow Footer -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; border-top: 1px solid #f1f5f9; padding-top: 14px;">
          <div style="font-size: 0.84rem; color: #475569;">
            ${tr('Total Value')}: <strong style="color: #0f172a; font-weight: 800;">₹ ${s.total_val.toLocaleString('en-IN')}</strong> • <span style="color: #166534; font-weight: 800; background: #f0fdf4; padding: 2px 8px; border-radius: 6px; border: 1px solid #bbf7d0;">🔒 ${tr('35% Advance')} ₹ ${s.adv_paid.toLocaleString('en-IN')} ${tr('locked in escrow')}</span>
          </div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button class="btn btn-outline btn-sm" onclick="openDriverFleetModal('${s.tracking_id}')" style="display: flex; align-items: center; gap: 4px; font-weight: 700; color: #334155; border-color: #cbd5e1;">
              <span>🚚</span> ${tr('Driver & Vehicle')}
            </button>
            <button class="btn btn-outline btn-sm" onclick="openLorryReceiptModal('${s.tracking_id}')" style="font-weight: 700; border-color: #cbd5e1; color: #334155;">📑 ${tr('Gate Pass')}</button>
            ${isTransit ? `
              <button class="btn btn-primary btn-sm" onclick="openGpsModal('${s.tracking_id}', '${s.vehicle}', '${s.driver}', '${s.loc}')" style="background: #0284c7; border-color: #0284c7; font-weight: 800;">📍 ${tr('Track Location')}</button>
              <button class="btn btn-outline btn-sm" onclick="openArrivalReleaseModal('${s.tracking_id}', '${s.crop}', ${s.balance_due}, '${s.farmer}', ${s.total_val}, ${s.adv_paid})" style="color: #0c5a36; border-color: #86efac; font-weight: 800; background: #f0fdf4;">✓ ${tr('Confirm Arrival & QC Release')}</button>
            ` : isScheduled ? `
              <a href="tel:${s.driver_phone}" class="btn btn-primary btn-sm" style="text-decoration: none; background: #0c5a36; border-color: #0c5a36; font-weight: 800;">📞 ${tr('Call Driver')}</a>
            ` : `
              <button class="btn btn-primary btn-sm" disabled style="background: #15803d; border-color: #15803d; opacity: 0.9; cursor: default; font-weight: 800;">✓ ${tr('100% Settled & Released')}</button>
            `}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

let currentSelectedShipmentId = 'TRK-EXP-9921-MH';

function openDriverFleetModal(trackingId) {
  const modal = document.getElementById('modal-driver-fleet');
  if (!modal) return;

  const consignments = (buyerData && buyerData.consignments) ? buyerData.consignments : [];
  const s = consignments.find(c => c.tracking_id === trackingId) || consignments[0];
  if (!s) return;

  currentSelectedShipmentId = s.tracking_id;

  const trkEl = document.getElementById('drv-modal-tracking-id');
  const nameEl = document.getElementById('drv-modal-name');
  const partnerEl = document.getElementById('drv-modal-partner');
  const callBtn = document.getElementById('drv-modal-call-btn');
  const vehEl = document.getElementById('drv-modal-vehicle');
  const dlEl = document.getElementById('drv-modal-dl');
  const capEl = document.getElementById('drv-modal-capacity');
  const fastagEl = document.getElementById('drv-modal-fastag');
  const sealEl = document.getElementById('drv-modal-seal');
  const tempEl = document.getElementById('drv-modal-temp');
  const locEl = document.getElementById('drv-modal-loc');
  const etaEl = document.getElementById('drv-modal-eta');
  const gpsIdEl = document.getElementById('drv-modal-gps-id');

  if (trkEl) trkEl.textContent = `Consignment #${s.tracking_id} • Gate Pass: ${s.gate_pass}`;
  if (nameEl) nameEl.textContent = s.driver;
  if (partnerEl) partnerEl.textContent = s.transporter || 'Sahyadri Kisan Logistics';
  if (callBtn) {
    callBtn.href = `tel:${s.driver_phone}`;
    callBtn.innerHTML = `<span>📞</span> Call (${s.driver_phone})`;
  }
  if (vehEl) vehEl.textContent = s.vehicle;
  if (dlEl) dlEl.textContent = s.dl_no || 'MH-15-2019-0912';
  const qtyKg = s.quantity_kg || (s.quantity_qt * 100);
  if (capEl) capEl.textContent = s.capacity || `${s.quantity_qt} Qt (${qtyKg.toLocaleString('en-IN')} kg Payload)`;
  if (fastagEl) fastagEl.textContent = s.fastag || 'Active (₹ 1,450 Balance)';
  if (sealEl) sealEl.textContent = s.gate_seal || '#SEAL-88912';
  if (tempEl) tempEl.textContent = s.temp || '18.2°C (Optimal)';
  if (locEl) locEl.textContent = s.loc;
  if (etaEl) etaEl.textContent = `ETA: ${s.eta}`;
  if (gpsIdEl) gpsIdEl.textContent = s.gps_device_id || 'GPS-AIS140-88120';

  modal.classList.add('active');
}

function closeDriverFleetModal() {
  const modal = document.getElementById('modal-driver-fleet');
  if (modal) modal.classList.remove('active');
}

function openGpsFromDriverModal() {
  closeDriverFleetModal();
  const consignments = (buyerData && buyerData.consignments) ? buyerData.consignments : [];
  const s = consignments.find(c => c.tracking_id === currentSelectedShipmentId) || consignments[0];
  if (s) {
    openGpsModal(s.tracking_id, s.vehicle, s.driver, s.loc);
  } else {
    openGpsModal();
  }
}

function openLorryReceiptModal(trackingId) {
  const modal = document.getElementById('modal-lorry-receipt');
  if (!modal) return;

  const consignments = (buyerData && buyerData.consignments) ? buyerData.consignments : [];
  const s = consignments.find(c => c.tracking_id === trackingId) || consignments[0];

  if (s) {
    const titleEl = document.getElementById('lr-id-display');
    const subEl = document.getElementById('lr-tracking-subtitle');
    const cropEl = document.getElementById('lr-crop-title');
    const vehEl = document.getElementById('lr-vehicle-display');
    const driverEl = document.getElementById('lr-driver-display');

    if (titleEl) titleEl.textContent = s.tracking_id;
    if (subEl) subEl.textContent = `Gate Pass: ${s.gate_pass} • LR No: LR-${s.tracking_id.replace(/[^0-9]/g, '') || '9921'} • AgriNex Logistics`;
    if (cropEl) cropEl.textContent = `${s.quantity_qt} Qt ${s.crop}`;
    if (vehEl) vehEl.textContent = s.vehicle;
    if (driverEl) driverEl.textContent = `${s.driver} (${s.driver_phone})`;
  } else if (trackingId) {
    const titleEl = document.getElementById('lr-id-display');
    const subEl = document.getElementById('lr-tracking-subtitle');
    if (titleEl) titleEl.textContent = trackingId;
    if (subEl) subEl.textContent = `LR No: LR-${trackingId.slice(4)} • AgriNex Logistics System`;
  }
  modal.classList.add('active');
}

function closeLorryReceiptModal() {
  const modal = document.getElementById('modal-lorry-receipt');
  if (modal) modal.classList.remove('active');
}

function printLorryReceipt() {
  showToast('Generating official AgriNex Digital Lorry Receipt PDF with QR verification seal...');
  setTimeout(() => {
    closeLorryReceiptModal();
    showToast('✓ Lorry Receipt & Digital Gate Pass downloaded successfully!');
  }, 900);
}

let activeArrivalDisbursement = {
  trackingId: 'ESC-MH-9921',
  crop: 'Tomato (Narayangaon Hybrid 50 Qt)',
  amount: 39000,
  farmer: 'Rameshwar Patil',
  totalVal: 60000,
  advVal: 21000,
  cardId: 'escrow-card-1'
};

function openArrivalReleaseModal(trackingId, crop, amount, farmer, totalVal, advVal, cardId) {
  const parsedAmt = typeof amount === 'number' ? amount : parseFloat(amount) || 39000;
  const parsedTotal = typeof totalVal === 'number' ? totalVal : (parseFloat(totalVal) || Math.round(parsedAmt / 0.65));
  const parsedAdv = typeof advVal === 'number' ? advVal : (parseFloat(advVal) || (parsedTotal - parsedAmt));

  // Determine card ID if not supplied
  let inferredCardId = cardId;
  if (!inferredCardId) {
    if (String(trackingId).includes('9921')) inferredCardId = 'escrow-card-1';
    else if (String(trackingId).includes('4412')) inferredCardId = 'escrow-card-2';
    else if (String(trackingId).includes('7730')) inferredCardId = 'escrow-card-3';
    else inferredCardId = 'escrow-card-1';
  }

  activeArrivalDisbursement = {
    trackingId: trackingId || 'ESC-MH-9921',
    crop: crop || 'Tomato (Narayangaon Hybrid 50 Qt)',
    amount: parsedAmt,
    farmer: farmer || 'Rameshwar Patil',
    totalVal: parsedTotal,
    advVal: parsedAdv,
    cardId: inferredCardId
  };

  const modal = document.getElementById('modal-confirm-arrival');
  if (!modal) return;

  const trackEl = document.getElementById('arrival-tracking-id');
  const releaseEl = document.getElementById('arrival-release-val');
  const totalEl = document.getElementById('arrival-total-val');
  const advEl = document.getElementById('arrival-adv-val');

  if (trackEl) trackEl.textContent = `Consignment #${activeArrivalDisbursement.trackingId} • ${activeArrivalDisbursement.crop}`;
  if (releaseEl) releaseEl.textContent = `₹ ${activeArrivalDisbursement.amount.toLocaleString('en-IN')}`;
  if (totalEl) totalEl.textContent = `₹ ${activeArrivalDisbursement.totalVal.toLocaleString('en-IN')}`;
  if (advEl) advEl.textContent = `₹ ${activeArrivalDisbursement.advVal.toLocaleString('en-IN')}`;

  modal.classList.add('active');
}

function closeArrivalReleaseModal() {
  const modal = document.getElementById('modal-confirm-arrival');
  if (modal) modal.classList.remove('active');
}

function confirmReleaseEscrowAction() {
  closeArrivalReleaseModal();
  const amtStr = `₹ ${activeArrivalDisbursement.amount.toLocaleString('en-IN')}`;
  const cardId = activeArrivalDisbursement.cardId;

  // Determine contract index
  let idx = '1';
  if (cardId === 'escrow-card-2' || activeArrivalDisbursement.trackingId.includes('4412')) idx = '2';
  else if (cardId === 'escrow-card-3' || activeArrivalDisbursement.trackingId.includes('7730')) idx = '3';

  const tr = (txt) => (window.tText ? window.tText(txt) : txt);

  // 1. Update status badge
  const statusBadge = document.getElementById(`escrow-status-badge-${idx}`) || document.getElementById('escrow-status-badge');
  if (statusBadge) {
    statusBadge.className = 'badge';
    statusBadge.style.background = '#15803d';
    statusBadge.style.color = '#ffffff';
    statusBadge.textContent = '✓ ' + tr('100% Settled & Released');
  }

  // 2. Update Stepper dot 4
  const dotSettled = document.getElementById(`stepper-dot-settled-${idx}`) || document.getElementById('stepper-dot-settled');
  if (dotSettled) {
    dotSettled.className = 'stepper-dot active';
    dotSettled.textContent = '✓';
    dotSettled.style.background = '#15803d';
    dotSettled.style.borderColor = '#15803d';
    dotSettled.style.color = '#ffffff';
  }

  // 3. Update release button
  const btnVault = document.getElementById(`btn-escrow-vault-release-${idx}`) || document.getElementById('btn-escrow-vault-release');
  if (btnVault) {
    btnVault.disabled = true;
    btnVault.textContent = '✓ ' + tr('100% Escrow Settled');
    btnVault.style.background = '#15803d';
    btnVault.style.borderColor = '#15803d';
    btnVault.style.color = '#ffffff';
    btnVault.style.cursor = 'default';
  }

  // Also check if card element has any remaining release button
  const cardEl = document.getElementById(cardId);
  if (cardEl) {
    const cardBtns = cardEl.querySelectorAll('button.btn-primary');
    cardBtns.forEach(b => {
      b.disabled = true;
      b.textContent = '✓ ' + tr('100% Escrow Settled');
      b.style.background = '#15803d';
      b.style.borderColor = '#15803d';
      b.style.color = '#ffffff';
    });
  }

  // 4. Update Consignment arrival button if present
  const btnArrival = document.getElementById('btn-arrival-release-1');
  if (btnArrival && (idx === '1' || activeArrivalDisbursement.trackingId.includes('9921'))) {
    btnArrival.textContent = '✓ ' + tr('Delivered & Released');
    btnArrival.disabled = true;
    btnArrival.style.background = '#15803d';
    btnArrival.style.borderColor = '#15803d';
  }

  // 5. Update top aggregate metric
  const settledTotalEl = document.getElementById('escrow-settled-total');
  if (settledTotalEl) {
    const curVal = 580000 + (idx === '1' ? 60000 : (idx === '2' ? 144000 : 126000));
    settledTotalEl.textContent = `₹ ${curVal.toLocaleString('en-IN')}`;
  }

  // 6. Insert new transaction record in Audit Ledger Table
  const tbody = document.getElementById('escrow-ledger-tbody');
  if (tbody) {
    const newRow = document.createElement('tr');
    newRow.setAttribute('data-type', 'final');
    newRow.style.cssText = 'border-bottom: 1px solid #f1f5f9; background: #f0fdf4; transition: all 0.3s ease;';
    const randomUtr = `ICIC000${Math.floor(100000 + Math.random() * 900000)}`;
    const randomTxn = `TXN-REL-${Math.floor(1000 + Math.random() * 9000)}`;
    newRow.innerHTML = `
      <td style="padding: 10px 14px;"><strong>${randomTxn}</strong><br><span style="font-size: 0.72rem; color: #166534; font-weight: 700;">Just now (Live)</span></td>
      <td style="padding: 10px 14px;"><span style="font-family: monospace; font-weight: 700; color: #0c5a36;">#${activeArrivalDisbursement.trackingId}</span></td>
      <td style="padding: 10px 14px;"><strong>${activeArrivalDisbursement.farmer}</strong><br><span style="font-size: 0.72rem; color: #64748b;">${activeArrivalDisbursement.crop}</span></td>
      <td style="padding: 10px 14px; font-weight: 800; color: #0c5a36;">₹ ${activeArrivalDisbursement.amount.toLocaleString('en-IN')}</td>
      <td style="padding: 10px 14px;"><span class="badge" style="background: #15803d; color: #ffffff; font-size: 0.72rem; font-weight: 700;">✓ 100% Settled</span></td>
      <td style="padding: 10px 14px;"><span style="font-size: 0.75rem; color: #0c5a36; font-family: monospace; font-weight: 700;">${randomUtr}</span></td>
      <td style="padding: 10px 14px;"><button class="btn btn-outline btn-sm" onclick="showToast('✓ Stamped UTR Settlement Receipt #${activeArrivalDisbursement.trackingId} (PDF) downloaded!')" style="font-size: 0.72rem; padding: 2px 8px;">Receipt</button></td>
    `;
    tbody.insertBefore(newRow, tbody.firstChild);
  }

  // Update Consignments list status
  if (buyerData && buyerData.consignments) {
    const cItem = buyerData.consignments.find(c => c.tracking_id === activeArrivalDisbursement.trackingId || (activeArrivalDisbursement.trackingId && c.tracking_id.includes(activeArrivalDisbursement.trackingId.replace('ESC-', 'TRK-'))));
    if (cItem) {
      cItem.status = 'delivered';
      cItem.status_label = 'Delivered & QC Passed';
      cItem.step = 4;
      cItem.loc = 'Delivered & 100% Escrow Settled';
      cItem.eta = 'Completed • QC Passed 100%';
    }
  }
  if (typeof renderBuyerConsignments === 'function') {
    renderBuyerConsignments();
  }

  showToast(`🎉 Quality verified! ${amtStr} released to ${activeArrivalDisbursement.farmer}. Contract 100% Settled!`, 'success');
}

function openGatePassModal(trackingId) {
  openLorryReceiptModal(trackingId);
}

function closeGatePassModal() {
  closeLorryReceiptModal();
}

function openGpsModal(trackingId, vehicle, driver, corridor) {
  const modal = document.getElementById('modal-gps-tracker');
  if (!modal) return;

  const consignments = (buyerData && buyerData.consignments) ? buyerData.consignments : [];
  const s = consignments.find(c => c.tracking_id === trackingId) || consignments[0];

  const trackNumEl = document.getElementById('gps-tracking-num');
  const vehEl = document.getElementById('gps-vehicle-name');
  const driverEl = document.getElementById('gps-driver-name');
  const corridorEl = document.getElementById('gps-corridor-name');

  if (trackNumEl) trackNumEl.textContent = trackingId || (s ? s.tracking_id : 'TRK-EXP-9921-MH');
  if (vehEl) vehEl.textContent = vehicle || (s ? s.vehicle : 'Tata 407 LPT (MH 15 AG 8842)');
  if (driverEl) driverEl.textContent = driver || (s ? s.driver : 'Sanjay Shinde');
  if (corridorEl) corridorEl.textContent = corridor || (s ? s.loc : 'Nashik-Mumbai Samruddhi Expressway');

  if (window.renderGpsRouteVisualizer) {
    window.renderGpsRouteVisualizer(trackingId || (s ? s.tracking_id : 'TRK-EXP-9921-MH'));
  }

  modal.classList.add('active');
}

function closeGpsModal() {
  const modal = document.getElementById('modal-gps-tracker');
  if (modal) modal.classList.remove('active');
}

// Book Farm-Gate Transport Modal
function openBookTransportModal() {
  const modal = document.getElementById('modal-book-transport');
  if (modal) {
    modal.classList.add('active');
    calculateTransportEstimate();
  }
}

function closeBookTransportModal() {
  const modal = document.getElementById('modal-book-transport');
  if (modal) modal.classList.remove('active');
}

function updateTransportLotMeta(lotRaw) {
  if (!lotRaw) return;
  const parts = lotRaw.split('|');
  const origin = parts[3] || 'Farm-Gate Pickup';
  const originInput = document.getElementById('transport-origin');
  if (originInput) originInput.value = origin;
  calculateTransportEstimate();
}

function calculateTransportEstimate() {
  const vehicleChecked = document.querySelector('input[name="vehicle-type"]:checked');
  const destSelect = document.getElementById('transport-destination');
  const baseFeeEl = document.getElementById('transport-base-fee');
  const tollFeeEl = document.getElementById('transport-toll-fee');
  const totalFeeEl = document.getElementById('transport-total-fee');

  let baseRate = 5800;
  if (vehicleChecked) {
    const valParts = vehicleChecked.value.split('|');
    baseRate = parseFloat(valParts[1]) || 5800;
  }

  let distKm = 280;
  if (destSelect && destSelect.value) {
    const dParts = destSelect.value.split('|');
    distKm = parseInt(dParts[1]) || 280;
  }

  // Adjust freight by distance ratio (normalized to 280 km)
  const distMultiplier = distKm / 280;
  const calculatedBase = Math.round(baseRate * distMultiplier);
  const tollInsurance = Math.round(calculatedBase * 0.06);
  const totalLanded = calculatedBase + tollInsurance;

  if (baseFeeEl) baseFeeEl.textContent = `₹ ${calculatedBase.toLocaleString('en-IN')}`;
  if (tollFeeEl) tollFeeEl.textContent = `₹ ${tollInsurance.toLocaleString('en-IN')}`;
  if (totalFeeEl) totalFeeEl.textContent = `₹ ${totalLanded.toLocaleString('en-IN')}`;
}

// Grievances & Claims Redressal System
function openGrievanceModal() {
  const modal = document.getElementById('modal-file-grievance');
  if (modal) modal.classList.add('active');
}

function closeGrievanceModal() {
  const modal = document.getElementById('modal-file-grievance');
  if (modal) modal.classList.remove('active');
}

function handleGrievanceFileUpload(input) {
  const label = document.getElementById('grv-upload-label');
  if (input.files && input.files[0] && label) {
    label.innerHTML = `✅ Attached: <strong>${input.files[0].name}</strong> (${(input.files[0].size / 1024).toFixed(1)} KB)`;
    label.style.color = '#0c5a36';
  }
}

function filterGrievance(status, btnElement) {
  const buttons = document.querySelectorAll('.grv-filter-btn');
  buttons.forEach(btn => {
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-outline');
  });

  if (btnElement) {
    btnElement.classList.remove('btn-outline');
    btnElement.classList.add('btn-primary');
  }

  renderGrievances(status);
}

function acceptGrievanceResolution(grvId) {
  if (!buyerData.grievances) return;
  const grv = buyerData.grievances.find(g => g.id === grvId);
  if (grv) {
    grv.status = "Resolved & Refunded";
    grv.statusClass = "badge-grade-a";
    grv.resolutionEta = "Closed";
    grv.timeline = [
      { step: "Grievance Raised", done: true, time: "12 Sep, 10:15 AM" },
      { step: "Escrow Settlement Frozen", done: true, time: "12 Sep, 10:16 AM" },
      { step: "AI Assay & Photo Review", done: true, time: "12 Sep, 11:30 AM" },
      { step: "Settlement Agreed & Credited", done: true, time: "Just now" }
    ];
    showToast(`Dispute ${grvId} settled! ₹ 3,900 rebate credit disbursed to your AgriNex wallet.`);
    renderGrievances();
  }
}

function renderGrievances(filterStatus = 'all') {
  const container = document.getElementById('grievances-list-container');
  if (!container || !buyerData.grievances) return;

  let grievances = [...buyerData.grievances];
  if (filterStatus === 'open') {
    grievances = grievances.filter(g => g.status === 'Under Review');
  } else if (filterStatus === 'resolved') {
    grievances = grievances.filter(g => g.status.includes('Resolved'));
  }

  // Update Summary Counts
  const openCount = buyerData.grievances.filter(g => g.status === 'Under Review').length;
  const resolvedCount = buyerData.grievances.filter(g => g.status.includes('Resolved')).length;

  const countBadgeEl = document.getElementById('grv-active-count');
  if (countBadgeEl) countBadgeEl.textContent = `${openCount} Case${openCount === 1 ? '' : 's'}`;

  const resolvedBadgeEl = document.getElementById('grv-resolved-count');
  if (resolvedBadgeEl) resolvedBadgeEl.textContent = `${resolvedCount} Case${resolvedCount === 1 ? '' : 's'}`;

  if (grievances.length === 0) {
    container.innerHTML = `
      <div style="background: #ffffff; border-radius: 12px; border: 1px solid var(--border-default); padding: 40px 20px; text-align: center; color: #64748b;">
        <div style="font-size: 2.2rem; margin-bottom: 8px;">🛡️</div>
        <h4 style="font-size: 1.05rem; font-weight: 700; color: #0f172a; margin-bottom: 4px;">No Grievances Found</h4>
        <p style="font-size: 0.85rem;">All your consignments and quality assays are running smoothly without active disputes.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = grievances.map(grv => {
    const isUnderReview = grv.status === 'Under Review';
    const statusBg = isUnderReview ? 'rgba(234, 179, 8, 0.12)' : 'rgba(34, 197, 94, 0.12)';
    const statusColor = isUnderReview ? '#b45309' : '#15803d';
    const statusBorder = isUnderReview ? 'rgba(234, 179, 8, 0.3)' : 'rgba(34, 197, 94, 0.3)';
    const statusDot = isUnderReview ? '🟡' : '✅';

    const timelineHtml = (grv.timeline || []).map((tl, idx) => `
      <div class="stepper-step" style="flex: 1; text-align: center; position: relative;">
        <div class="stepper-dot ${tl.done ? 'active' : ''}" style="margin: 0 auto 6px auto; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.78rem; transition: all 0.2s; ${tl.done ? 'background: #059669; color: #fff; box-shadow: 0 2px 6px rgba(5,150,105,0.3);' : 'background: #f1f5f9; color: #94a3b8; border: 1.5px solid #cbd5e1;'}">
          ${tl.done ? '✓' : (idx + 1)}
        </div>
        <div class="stepper-label" style="font-size: 0.74rem; font-weight: 700; color: ${tl.done ? '#0f172a' : '#94a3b8'};">
          ${tl.step}
        </div>
        <div style="font-size: 0.65rem; color: #64748b; margin-top: 2px;">
          ${tl.time}
        </div>
      </div>
    `).join('');

    return `
      <div class="grv-claim-card" style="margin-bottom: 20px;">
        <!-- Top Row Header -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 16px; padding-bottom: 14px; border-bottom: 1px solid #f1f5f9;">
          <div>
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px; flex-wrap: wrap;">
              <span style="font-family: monospace; font-weight: 800; color: #0c5a36; font-size: 0.95rem; background: #e8f5e9; padding: 3px 10px; border-radius: 8px; border: 1px solid #c8e6c9;">
                ${grv.id}
              </span>
              <span style="background: ${statusBg}; color: ${statusColor}; border: 1px solid ${statusBorder}; font-weight: 800; font-size: 0.76rem; padding: 4px 12px; border-radius: 20px; display: inline-flex; align-items: center; gap: 5px;">
                ${statusDot} ${grv.status}
              </span>
              <span style="font-size: 0.76rem; color: #64748b; font-weight: 500;">
                Filed: ${grv.dateFiled}
              </span>
            </div>
            <div style="font-size: 0.88rem; color: #334155; font-weight: 600;">
              Consignment: <strong style="color: #0f172a;">${grv.consignmentId || 'LOT-CONS-992'}</strong> • <span style="color: #059669; font-weight: 700;">${window.tCrop ? window.tCrop(grv.crop) : grv.crop}</span>
            </div>
          </div>

          <div style="text-align: right; background: #f8fafc; padding: 8px 14px; border-radius: 10px; border: 1px solid #e2e8f0;">
            <span style="font-size: 0.72rem; color: #64748b; display: block; text-transform: uppercase; font-weight: 700; letter-spacing: 0.03em;">Farmer / Source</span>
            <strong style="font-size: 0.88rem; color: #0f172a;">${window.tPerson ? window.tPerson(grv.farmerName) : grv.farmerName}</strong>
          </div>
        </div>

        <!-- Issue Category & Description -->
        <div style="background: #f8fafc; border-left: 4px solid ${isUnderReview ? '#d97706' : '#059669'}; border-radius: 8px; padding: 14px 16px; margin-bottom: 18px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; flex-wrap: wrap; gap: 8px;">
            <span style="font-size: 0.78rem; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 0.04em;">
              Dispute Category: <span style="color: #0f172a;">${window.tText ? window.tText(grv.category) : grv.category}</span>
            </span>
            <span style="font-size: 0.78rem; font-weight: 800; color: #dc2626; background: #fee2e2; border: 1px solid #fecaca; padding: 3px 10px; border-radius: 6px; display: inline-flex; align-items: center; gap: 4px;">
              🔒 ${grv.amountUnderHold}
            </span>
          </div>
          <div style="font-size: 0.84rem; color: #1e293b; line-height: 1.5; font-weight: 500;">
            ${window.tText ? window.tText(grv.description) : grv.description}
          </div>
        </div>

        <!-- 4-Step Interactive Timeline Stepper -->
        <div style="margin-bottom: 20px; padding: 16px 12px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: inset 0 1px 3px rgba(0,0,0,0.02);">
          <div style="font-size: 0.72rem; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 14px; padding-left: 4px;">
            Redressal Progress & Smart Contract Milestones:
          </div>
          <div class="stepper" style="display: flex; justify-content: space-between; position: relative;">
            ${timelineHtml}
          </div>
        </div>

        <!-- Action Buttons -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; padding-top: 14px; border-top: 1px solid #f1f5f9;">
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <button class="btn btn-outline btn-sm" onclick="showToast('Loading digital assay certificate & weighbridge audit slip for ${grv.id}...', 'success')" style="border-radius: 8px; font-weight: 700; padding: 7px 14px;">
              📄 View Evidence Dossier
            </button>
            <button class="btn btn-outline btn-sm" onclick="switchView('view-messages'); showToast('Opening direct grievance chat channel with AgriNex QA Desk...');" style="border-radius: 8px; font-weight: 700; padding: 7px 14px;">
              💬 Message Arbitrator
            </button>
          </div>

          ${isUnderReview ? `
            <button class="btn btn-primary btn-sm" onclick="acceptGrievanceResolution('${grv.id}')" style="background: linear-gradient(135deg, #059669 0%, #047857 100%); border-color: #047857; border-radius: 8px; font-weight: 800; padding: 8px 16px; box-shadow: 0 3px 10px rgba(5,150,105,0.25);">
              ✓ Settle & Accept 5% Price Rebate (₹ 3,900)
            </button>
          ` : `
            <span style="font-size: 0.82rem; font-weight: 800; color: #15803d; background: #dcfce7; border: 1px solid #bbf7d0; padding: 6px 14px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
              ✓ Claim Settled & Escrow Released
            </span>
          `}
        </div>

      </div>
    `;
  }).join('');
}

// Form Handlers
document.addEventListener('DOMContentLoaded', () => {
  try { renderBuyerEmergencyDesk(); } catch(e) { console.error('Emergency desk init error:', e); }
  try { loadPersistedBuyerState(); } catch(e) { console.error('Load persisted state error:', e); }
  try { updateBuyerMarketStats(); } catch(e) { console.error('Market stats error:', e); }
  try { renderBuyerEscrowVault(); } catch(e) { console.error('Escrow vault error:', e); }
  try { setupSidebarNav(); } catch(e) { console.error('Sidebar nav error:', e); }
  try { renderVerifiedLots(); } catch(e) { console.error('Verified lots error:', e); }
  try { renderBuyerDemands(); } catch(e) { console.error('Demands error:', e); }
  try { renderBuyerConsignments(); } catch(e) { console.error('Consignments error:', e); }
  try { renderGrievances(); } catch(e) { console.error('Grievances error:', e); }
  try { renderChatSidebar(); } catch(e) { console.error('Chat sidebar error:', e); }
  try { initLocationSwitcher(); } catch(e) { console.error('Location switcher error:', e); }
  try { renderStorageFacilities(); } catch(e) { console.error('Storage facilities error:', e); }
  try { renderStorageBookings(); } catch(e) { console.error('Storage bookings error:', e); }

  // Global keyboard shortcuts (Esc to close any active modal, Ctrl+K to search)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModals = document.querySelectorAll('.modal-overlay.active');
      activeModals.forEach(m => m.classList.remove('active'));
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const searchBox = document.getElementById('marketplace-search-input') || document.getElementById('buyer-global-search');
      if (searchBox) {
        searchBox.focus();
        searchBox.select();
      }
    }
  });

  // Handle enter key in chat
  const chatInput = document.getElementById('chat-input-field');
  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendChatMessage();
      }
    });
  }

  // Handle Buyer Profile Form submit
  const profileForm = document.getElementById('form-edit-buyer-profile');
  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newName = document.getElementById('buyer-input-name')?.value || 'Karthik Sundaram';
      const newCompany = document.getElementById('buyer-input-company')?.value || 'BigBasket';

      const nameEl = document.querySelector('.profile-name');
      if (nameEl) nameEl.textContent = newName;

      const heroNameEl = document.querySelector('.hero-left h2');
      if (heroNameEl) heroNameEl.textContent = `Good Morning, ${newName.split(' ')[0]}! 🏢`;

      const displayNameEl = document.getElementById('buyer-display-name');
      if (displayNameEl) displayNameEl.textContent = newName;

      closeBuyerProfileModal();
      showToast('Wholesale Buyer Profile updated successfully!');
    });
  }

  // Live preview for Target Price in Post Demand Modal
  const priceInput = document.getElementById('demand-price');
  if (priceInput) {
    priceInput.addEventListener('input', updateDemandPricePreview);
  }

// New Demand Form submit
const demandForm = document.getElementById('form-new-demand');
if (demandForm) {
  demandForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const crop = document.getElementById('demand-crop')?.value || 'Tomato';
    const tonnage = parseFloat(document.getElementById('demand-tonnage')?.value) || 50;
    const unit = document.getElementById('demand-unit')?.value || 'Qt';
    const price = document.getElementById('demand-price')?.value;
    const priceUnit = document.getElementById('demand-price-unit')?.value || 'qt';
    const numPrice = parseFloat(price) || 1250;

    let pricePerQt = numPrice;
    let pricePerKg = (numPrice / 100).toFixed(2);
    if (priceUnit === 'kg') {
      pricePerKg = numPrice.toFixed(2);
      pricePerQt = Math.round(numPrice * 100);
    }

    const newId = `DEM-BB-${Math.floor(100 + Math.random() * 900)}`;
    const displayTonnage = unit === 'kg' ? `${tonnage.toLocaleString('en-IN')} kg (${(tonnage / 100).toFixed(1)} Qt)` : `${tonnage} Qt (${(tonnage * 100).toLocaleString('en-IN')} kg)`;
    const numQt = unit === 'kg' ? Math.round(tonnage / 100) : tonnage;

    buyerData.buyerDemands.unshift({
      id: newId,
      crop: crop,
      category: "Agricultural Crop",
      image: crop.toLowerCase().includes('onion') ? 'assets/images/onion.jpg' : 'assets/images/tomato.jpg',
      tonnage: displayTonnage,
      tonnageNum: numQt,
      unit: "Qt",
      targetPrice: `₹ ${pricePerKg}/kg`,
      targetPriceNum: pricePerQt,
      pricePerKg: parseFloat(pricePerKg),
      mandiBenchmark: `₹ ${(pricePerQt * 1.14 / 100).toFixed(2)}/kg`,
      savingsPct: "12.3% Savings",
      location: "Vashi APMC Central Terminal, Navi Mumbai, MH",
      deadline: "28 Sep 2026",
      daysLeft: 15,
      matchedCount: 2,
      fulfilledTonnage: 0,
      fulfilledPct: 0,
      status: "Broadcasting",
      statusClass: "badge-status-open",
      statusLabel: "● Broadcasting Quota",
      grade: "Grade A Commercial",
      moistureLimit: "QC Guaranteed",
      deliveryMode: "Farm-Gate Pickup",
      escrowAdvance: `35% Advance (₹ ${Math.round(pricePerQt * tonnage * 10 * 0.35).toLocaleString('en-IN')})`,
      bids: [
        {
          bidId: `BID-NEW-${Math.floor(100 + Math.random() * 900)}`,
          farmerName: "Regional Farm Cluster",
          farmerAvatar: "assets/images/tomato.jpg",
          farmerPhone: "+91 98221-55420",
          location: "Lasalgaon APMC Hub (Nashik, MH)",
          rating: "4.9 ⭐",
          offeredQty: `${Math.round(tonnage * 0.4)} ${unit}`,
          bidPrice: `₹ ${pricePerKg}/kg`,
          bidPriceNum: pricePerQt,
          pricePerKg: parseFloat(pricePerKg),
          qcScore: "95% (Grade A)",
          leadTime: "6 Hours",
          status: "New Match"
        }
      ]
    });

    renderBuyerDemands();
    closePostDemandModal();
    showToast(`✓ Procurement quota for ${tonnage} ${unit} of ${crop} broadcasted to regional farmers!`, 'success');
    switchView('view-bulk-demands');
  });
}

  // Direct Buy submit
  const buyForm = document.getElementById('form-direct-buy');
  if (buyForm) {
    buyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const lotId = document.getElementById('buy-modal-lot-id')?.value;
      const lot = (buyerData.verifiedLots && buyerData.verifiedLots.find(l => l.id === lotId)) || (buyerData.verifiedLots && buyerData.verifiedLots[0]);
      if (!lot) return;

      const availKg = (lot.availableQtyKg !== undefined) ? parseFloat(lot.availableQtyKg) : (lot.qtyNum ? lot.qtyNum * 100 : 5000);
      const isModeAll = document.getElementById('buy-mode-all')?.checked;
      let qtyKg = availKg;

      if (!isModeAll) {
        const customInput = document.getElementById('buy-custom-qty-kg');
        const customVal = parseFloat(customInput?.value);
        if (!isNaN(customVal) && customVal > 0) {
          qtyKg = Math.min(customVal, availKg);
        }
      }

      const kgRate = lot.pricePerKg || (lot.priceNum ? lot.priceNum / 100 : 12.0);

      closeDirectBuyModal();
      executeBuyerLotPurchase(lotId, kgRate, qtyKg);

      if (qtyKg >= availKg) {
        showToast(`🎉 100% Volume Procured (${qtyKg.toLocaleString('en-IN')} kg)! Lot is now SOLD OUT for all other buyers.`, 'success');
      } else {
        showToast(`🎉 Procured ${qtyKg.toLocaleString('en-IN')} kg! Remaining ${(availKg - qtyKg).toLocaleString('en-IN')} kg available in market.`, 'success');
      }
      switchView('view-consignments');
    });
  }

  // Counter Bid submit (Feature 6: Triggers WhatsApp Simulation Modal)
  const bidForm = document.getElementById('form-counter-bid');
  if (bidForm) {
    bidForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const lotId = document.getElementById('bid-modal-lot-id')?.value;
      const bidPrice = document.getElementById('counter-bid-price')?.value;
      if (!lotId || !bidPrice) return;
      
      closeBidModal();
      openNegotiationModal(lotId, bidPrice);
      showToast(`Counter-offer of ₹ ${parseFloat(bidPrice).toFixed(2)}/kg broadcasted to farmer!`);
    });
  }

  // File Grievance / Claim submit
  const grvForm = document.getElementById('form-new-grievance');
  if (grvForm) {
    grvForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const lotRaw = document.getElementById('grv-lot-select')?.value || '';
      const [lotId, cropName, farmerName] = lotRaw.split('|');
      const category = document.getElementById('grv-category')?.value || 'Quality Dispute';
      const amount = document.getElementById('grv-claim-amount')?.value || '12000';
      const desc = document.getElementById('grv-description')?.value || '';

      const numAmount = parseFloat(amount) || 12000;
      const newGrvId = `GRV-2026-${Math.floor(100 + Math.random() * 900)}`;

      if (!buyerData.grievances) buyerData.grievances = [];

      buyerData.grievances.unshift({
        id: newGrvId,
        consignmentId: lotId,
        crop: cropName || 'Direct Trade Lot',
        category: category,
        farmerName: farmerName || 'Producer Farmer',
        amountUnderHold: `₹ ${numAmount.toLocaleString('en-IN')} (65% Balance Frozen)`,
        status: "Under Review",
        statusClass: "badge-status-negotiation",
        dateFiled: "Today (Just now)",
        resolutionEta: "Within 4 Hours",
        description: desc,
        timeline: [
          { step: "Grievance Raised", done: true, time: "Just now" },
          { step: "Escrow Settlement Frozen", done: true, time: "Auto-locked" },
          { step: "AI Assay & Photo Review", done: false, time: "Queued" },
          { step: "Arbitrator Decision", done: false, time: "Pending" }
        ]
      });

      closeGrievanceModal();
      grvForm.reset();
      const uploadLabel = document.getElementById('grv-upload-label');
      if (uploadLabel) uploadLabel.textContent = '📄 Click to upload Digital Assay Slip / Weight Receipt / Photo Proof';

      renderGrievances();
      showToast(`🔒 Claim ${newGrvId} lodged! 65% escrow settlement auto-frozen in vault.`, 'error');
      switchView('view-grievance');
    });
  }

  // Book Farm-Gate Transport Fleet submit
  const transportForm = document.getElementById('form-book-transport');
  if (transportForm) {
    transportForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const lotRaw = document.getElementById('transport-lot-select')?.value || '';
      const [lotId, cropName, quantity, originAddr, farmerName, escrowAmt] = lotRaw.split('|');

      const destRaw = document.getElementById('transport-destination')?.value || 'Vashi Central Hub, Navi Mumbai, MH|185 km';
      const [destName, distStr] = destRaw.split('|');

      const partnerRaw = document.getElementById('transport-partner')?.value || 'Sahyadri Kisan Logistics|Sanjay Shinde|+91 98221-55420|MH 15 AG 8842';
      const [partnerName, driverName, driverPhone, vehicleNum] = partnerRaw.split('|');

      const selectedVehEl = document.querySelector('input[name="vehicle-type"]:checked');
      const vehRaw = selectedVehEl ? selectedVehEl.value : 'Tata 407 LPT (MH 15 AG 8842)|5800';
      const vehName = vehRaw.split('|')[0];

      const newTrkId = `TRK-GW-${Math.floor(1000 + Math.random() * 9000)}-MH`;
      const newGatePass = `GP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const parsedQt = parseFloat(quantity) || 50;
      const parsedKg = parsedQt * 100;
      const totalEstimatedVal = (parsedQt * 1200) || 60000;
      const advEstimated = Math.round(totalEstimatedVal * 0.35);
      const balEstimated = totalEstimatedVal - advEstimated;

      if (!buyerData.consignments) buyerData.consignments = [];

      buyerData.consignments.unshift({
        tracking_id: newTrkId,
        gate_pass: newGatePass,
        crop: cropName || 'Direct Farm Lot',
        quantity_qt: parsedQt,
        quantity_kg: parsedKg,
        farmer: farmerName || 'Rameshwar Patil',
        farmer_phone: '+91 98221-55420',
        farmer_origin: originAddr || 'Farm-Gate',
        destination: destName,
        driver: driverName || 'Sanjay Shinde',
        driver_phone: driverPhone || '+91 98221-55420',
        vehicle: `${vehName} (${vehicleNum || 'MH 15 AG 8842'})`,
        status: 'transit',
        status_label: 'On The Road',
        step: 3,
        loc: `${originAddr || 'Farm-Gate'} ➔ ${destName} (Dispatched)`,
        eta: 'Today 5:30 PM',
        total_val: totalEstimatedVal,
        adv_paid: advEstimated,
        balance_due: balEstimated,
        assay_moisture: '82.0% (Certified)',
        gross_wt: `${parsedKg + 2850} kg`,
        tare_wt: '2,850 kg',
        gate_seal: `#SEAL-${Math.floor(10000 + Math.random() * 90000)}`
      });

      renderBuyerConsignments();
      closeBookTransportModal();
      showToast(`🚚 Fleet booked successfully! Consignment #${newTrkId} dispatched for ${cropName || 'Farm Lot'}.`);
      switchView('view-consignments');
    });
  }

  // Synchronize persisted buyer language after all initial DOM renders
  if (window.AgriNexI18n && typeof window.AgriNexI18n.getBuyerLanguage === 'function') {
    const savedLang = window.AgriNexI18n.getBuyerLanguage();
    if (savedLang && savedLang !== 'en') {
      setTimeout(() => {
        window.AgriNexI18n.setBuyerLanguage(savedLang);
      }, 50);
    }
  }
});

function updateDemandPricePreview() {
  const priceInput = document.getElementById('demand-price');
  const unitSelect = document.getElementById('demand-price-unit');
  const previewEl = document.getElementById('demand-price-preview');
  if (!priceInput || !previewEl) return;

  const rawVal = parseFloat(priceInput.value) || 0;
  const isKg = (unitSelect && unitSelect.value === 'kg');

  if (isKg) {
    previewEl.innerHTML = `= <strong>₹ ${rawVal.toFixed(2)} /kg</strong>`;
  } else {
    const kgEquiv = (rawVal / 100).toFixed(2);
    previewEl.innerHTML = `= <strong>₹ ${kgEquiv} /kg</strong>`;
  }
}

// ESCROW VAULT INTERACTION & AUDIT HELPERS (MULTI-RAIL GATEWAY)
// ==========================================
let buyerEscrowState = {
  activeContracts: 3,
  committedPool: 204000,
  advanceLocked: 71400,
  deliveryHold: 132600,
  availableLiquidity: 150000,
  completedSettlements: 580000
};

function updateEscrowVaultDOM() {
  const commEl = document.getElementById('vault-committed-pool');
  const advEl = document.getElementById('vault-advance-locked');
  const holdEl = document.getElementById('vault-delivery-hold');
  const resEl = document.getElementById('escrow-liquid-reserves');
  const settledEl = document.getElementById('escrow-settled-total') || document.getElementById('grv-resolved-count');

  if (commEl) commEl.textContent = `₹ ${buyerEscrowState.committedPool.toLocaleString('en-IN')}`;
  if (advEl) advEl.textContent = `₹ ${buyerEscrowState.advanceLocked.toLocaleString('en-IN')}`;
  if (holdEl) holdEl.textContent = `₹ ${buyerEscrowState.deliveryHold.toLocaleString('en-IN')}`;
  if (resEl) resEl.textContent = `₹ ${buyerEscrowState.availableLiquidity.toLocaleString('en-IN')}`;
  if (settledEl && settledEl.id === 'escrow-settled-total') settledEl.textContent = `₹ ${buyerEscrowState.completedSettlements.toLocaleString('en-IN')}`;
}

function openDepositEscrowModal() {
  const modal = document.getElementById('modal-deposit-escrow');
  if (modal) {
    modal.classList.add('active');
    const amtInput = document.getElementById('escrow-deposit-amount');
    updateEscrowGatewayAmount((amtInput && amtInput.value) || 50000);
  }
}

function closeDepositEscrowModal() {
  const modal = document.getElementById('modal-deposit-escrow');
  if (modal) modal.classList.remove('active');
}

function setEscrowDepositRail(rail) {
  const rails = ['upi', 'va', 'netbanking'];
  rails.forEach(r => {
    const tab = document.getElementById(`rail-tab-${r}`);
    const panel = document.getElementById(`rail-content-${r}`);
    if (r === rail) {
      if (tab) {
        tab.style.border = '1.5px solid #0c5a36';
        tab.style.background = '#f0fdf4';
        tab.style.color = '#0c5a36';
      }
      if (panel) panel.style.display = 'block';
    } else {
      if (tab) {
        tab.style.border = '1.5px solid #e2e8f0';
        tab.style.background = '#ffffff';
        tab.style.color = '#475569';
      }
      if (panel) panel.style.display = 'none';
    }
  });
}

function setEscrowPresetAmount(amount) {
  const input = document.getElementById('escrow-deposit-amount');
  if (input) {
    input.value = amount;
    updateEscrowGatewayAmount(amount);
  }
}

function updateEscrowGatewayAmount(val) {
  const num = parseFloat(val) || 0;
  const formatted = `₹ ${num.toLocaleString('en-IN')}`;
  const labels = document.querySelectorAll('.escrow-dyn-amt-label');
  labels.forEach(lbl => {
    lbl.textContent = formatted;
  });
}

function selectCorpBank(chipEl, bankName) {
  const allChips = document.querySelectorAll('.bank-select-chip');
  allChips.forEach(c => {
    c.classList.remove('active');
    c.style.borderColor = '#e2e8f0';
    c.style.background = '#ffffff';
    const title = c.querySelector('div');
    if (title) title.style.color = '#0f172a';
  });

  if (chipEl) {
    chipEl.classList.add('active');
    chipEl.style.borderColor = '#0c5a36';
    chipEl.style.background = '#f0fdf4';
    const title = chipEl.querySelector('div');
    if (title) title.style.color = '#0c5a36';
    const radio = chipEl.querySelector('input[type="radio"]');
    if (radio) radio.checked = true;
  }
}

function copyEscrowField(text, label) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`✓ Copied ${label || 'detail'} to clipboard: ${text}`, 'success');
    }).catch(() => {
      fallbackCopy(text, label);
    });
  } else {
    fallbackCopy(text, label);
  }
}

function fallbackCopy(text, label) {
  const ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  showToast(`✓ Copied ${label || 'detail'} to clipboard: ${text}`, 'success');
}

function handleDepositEscrowSubmit(e, railName = 'Instant UPI') {
  if (e) e.preventDefault();
  const amtInput = document.getElementById('escrow-deposit-amount');
  const amount = parseFloat((amtInput && amtInput.value) || 50000);

  if (amount < 1000) {
    showToast('⚠️ Minimum deposit amount is ₹ 1,000', 'error');
    return;
  }

  closeDepositEscrowModal();

  // Generate Bank UTR and Txn Ref
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  const dateStr = `${now.getDate()} ${now.toLocaleString('en-IN', { month: 'short' })} ${now.getFullYear()}, ${timeStr}`;
  const txnRef = `TXN-ESC-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  let bankUtr = '';
  if (railName.includes('UPI')) {
    bankUtr = `UPI/${Math.floor(100000000000 + Math.random() * 900000000000)}`;
  } else if (railName.includes('RTGS') || railName.includes('NEFT')) {
    bankUtr = `ICICR5202609${Math.floor(100000 + Math.random() * 900000)}`;
  } else {
    const selectedBank = document.querySelector('input[name="corp-bank"]:checked')?.value || 'HDFC Bank';
    bankUtr = `${selectedBank.substring(0, 4).toUpperCase()}000${Math.floor(100000 + Math.random() * 900000)}`;
  }

  showToast(`🔒 Authorizing ${railName} transfer of ₹ ${amount.toLocaleString('en-IN')}...`);

  setTimeout(() => {
    // Update State
    buyerEscrowState.availableLiquidity += amount;
    buyerEscrowState.committedPool += amount;
    updateEscrowVaultDOM();

    // Prepend to Escrow Ledger Table
    const tbody = document.getElementById('escrow-ledger-tbody');
    if (tbody) {
      const tr = document.createElement('tr');
      tr.style.borderBottom = '1px solid #f1f5f9';
      tr.style.background = '#f0fdf4';
      tr.setAttribute('data-type', 'deposit');
      tr.innerHTML = `
        <td style="padding: 12px 14px;">
          <strong>${txnRef}</strong>
          <div style="font-size: 0.7rem; color: #64748b;">${dateStr}</div>
        </td>
        <td style="padding: 12px 14px;">#TOPUP-VAULT</td>
        <td style="padding: 12px 14px;">
          <strong>AgriNex Nodal Trustee</strong>
          <div style="font-size: 0.7rem; color: #64748b;">ICICI Escrow A/C ••0104</div>
        </td>
        <td style="padding: 12px 14px;">Escrow Pool Liquidity</td>
        <td style="padding: 12px 14px;"><span style="color: #166534; font-weight: 700;">+ Liquidity Deposit</span></td>
        <td style="padding: 12px 14px;"><strong style="color: #0c5a36;">+ ₹ ${amount.toLocaleString('en-IN')}</strong></td>
        <td style="padding: 12px 14px;"><code style="font-size: 0.72rem; background: #e2e8f0; padding: 2px 6px; border-radius: 4px;">${bankUtr}</code></td>
        <td style="padding: 12px 14px;"><span class="badge badge-grade-a" style="background: #dcfce7; color: #15803d;">✓ Credited</span></td>
        <td style="padding: 12px 14px; text-align: right;">
          <button class="btn btn-outline btn-sm" onclick="openDepositReceiptModalFromRow('${txnRef}', '${bankUtr}', '${railName}', ${amount}, '${dateStr}')" style="font-size: 0.72rem; padding: 3px 8px;">📄 Receipt</button>
        </td>
      `;
      tbody.insertBefore(tr, tbody.firstChild);
    }

    // Populate Receipt Modal
    const rAmt = document.getElementById('receipt-deposit-amount');
    const rDate = document.getElementById('receipt-deposit-date');
    const rTxn = document.getElementById('receipt-deposit-txn');
    const rUtr = document.getElementById('receipt-deposit-utr');
    const rRail = document.getElementById('receipt-deposit-rail');
    const rBal = document.getElementById('receipt-updated-balance');

    if (rAmt) rAmt.textContent = `₹ ${amount.toLocaleString('en-IN')}`;
    if (rDate) rDate.textContent = dateStr;
    if (rTxn) rTxn.textContent = `#${txnRef}`;
    if (rUtr) rUtr.textContent = bankUtr;
    if (rRail) rRail.textContent = railName;
    if (rBal) rBal.textContent = `₹ ${(buyerEscrowState.advanceLocked + buyerEscrowState.availableLiquidity).toLocaleString('en-IN')}`;

    // Open Receipt Modal
    const receiptModal = document.getElementById('modal-deposit-receipt');
    if (receiptModal) receiptModal.classList.add('active');

    showToast(`✓ Payment captured! ₹ ${amount.toLocaleString('en-IN')} credited to Escrow Pool. UTR: ${bankUtr}`, 'success');
  }, 750);
}

function openDepositReceiptModalFromRow(txn, utr, rail, amount, date) {
  const rAmt = document.getElementById('receipt-deposit-amount');
  const rDate = document.getElementById('receipt-deposit-date');
  const rTxn = document.getElementById('receipt-deposit-txn');
  const rUtr = document.getElementById('receipt-deposit-utr');
  const rRail = document.getElementById('receipt-deposit-rail');
  const rBal = document.getElementById('receipt-updated-balance');

  if (rAmt) rAmt.textContent = `₹ ${parseFloat(amount || 0).toLocaleString('en-IN')}`;
  if (rDate) rDate.textContent = date || '14 Sep 2026, 12:45 PM';
  if (rTxn) rTxn.textContent = `#${txn || 'TXN-ESC-2026'}`;
  if (rUtr) rUtr.textContent = utr || 'ICIC091488129';
  if (rRail) rRail.textContent = rail || 'Instant UPI';
  if (rBal) rBal.textContent = `₹ ${(buyerEscrowState.advanceLocked + buyerEscrowState.availableLiquidity).toLocaleString('en-IN')}`;

  const receiptModal = document.getElementById('modal-deposit-receipt');
  if (receiptModal) receiptModal.classList.add('active');
}

function closeDepositReceiptModal() {
  const receiptModal = document.getElementById('modal-deposit-receipt');
  if (receiptModal) receiptModal.classList.remove('active');
}

function printDepositReceipt() {
  window.print();
}

function openEscrowDeedModal(contractId, crop, farmer, totalVal, lockedVal) {
  const modal = document.getElementById('modal-escrow-deed');
  if (!modal) return;

  const refEl = document.getElementById('deed-contract-ref');
  const farmerEl = document.getElementById('deed-farmer-name');
  const lotEl = document.getElementById('deed-produce-lot');
  const totalEl = document.getElementById('deed-total-val');
  const lockedEl = document.getElementById('deed-locked-amt');

  if (refEl) refEl.textContent = `Contract Reference: #${contractId || 'ESC-MH-9921'}`;
  if (farmerEl) farmerEl.textContent = farmer || 'Rameshwar Patil';
  if (lotEl) lotEl.textContent = crop || 'Tomato (Narayangaon Hybrid 50 Qt)';
  if (totalEl) totalEl.textContent = `₹ ${(totalVal || 60000).toLocaleString('en-IN')}`;
  if (lockedEl) lockedEl.textContent = `₹ ${(lockedVal || 21000).toLocaleString('en-IN')}`;

  modal.classList.add('active');
}

function closeEscrowDeedModal() {
  const modal = document.getElementById('modal-escrow-deed');
  if (modal) modal.classList.remove('active');
}

function downloadEscrowStatement() {
  showToast('Generating official AgriNex Nodal Escrow Audit Ledger Statement (PDF)...');
  setTimeout(() => {
    showToast('✓ Escrow Audit Statement (Q3-2026) downloaded successfully!');
  }, 800);
}

function filterEscrowLedger(filterType, btnEl) {
  const tbody = document.getElementById('escrow-ledger-tbody');
  if (!tbody) return;

  if (btnEl && btnEl.parentElement) {
    const btns = btnEl.parentElement.querySelectorAll('button');
    btns.forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
  }

  const rows = tbody.querySelectorAll('tr');
  rows.forEach(r => {
    const rowType = r.getAttribute('data-type');
    if (filterType === 'all' || rowType === filterType) {
      r.style.display = '';
    } else {
      r.style.display = 'none';
    }
  });
}

// Buyer Profile Modal Handlers
function openBuyerProfileModal() {
  const modal = document.getElementById('modal-buyer-profile');
  if (modal) modal.classList.add('active');
}

function closeBuyerProfileModal() {
  const modal = document.getElementById('modal-buyer-profile');
  if (modal) modal.classList.remove('active');
}

function showNotification(msg, type = 'info') {
  showToast(msg, type === 'error' ? 'error' : 'success');
}

// Window bindings for global HTML accessibility
window.openDepositEscrowModal = openDepositEscrowModal;
window.closeDepositEscrowModal = closeDepositEscrowModal;
window.setEscrowDepositRail = setEscrowDepositRail;
window.setEscrowPresetAmount = setEscrowPresetAmount;
window.updateEscrowGatewayAmount = updateEscrowGatewayAmount;
window.selectCorpBank = selectCorpBank;
window.copyEscrowField = copyEscrowField;
window.handleDepositEscrowSubmit = handleDepositEscrowSubmit;
window.openDepositReceiptModalFromRow = openDepositReceiptModalFromRow;
window.closeDepositReceiptModal = closeDepositReceiptModal;
window.printDepositReceipt = printDepositReceipt;
window.openEscrowDeedModal = openEscrowDeedModal;
window.closeEscrowDeedModal = closeEscrowDeedModal;
window.downloadEscrowStatement = downloadEscrowStatement;
window.filterEscrowLedger = filterEscrowLedger;
window.updateEscrowVaultDOM = updateEscrowVaultDOM;
window.openArrivalReleaseModal = openArrivalReleaseModal;
window.closeArrivalReleaseModal = closeArrivalReleaseModal;
window.confirmReleaseEscrowAction = confirmReleaseEscrowAction;
window.openBookTransportModal = openBookTransportModal;
window.closeBookTransportModal = closeBookTransportModal;
window.openGatePassModal = openGatePassModal;
window.closeGatePassModal = closeGatePassModal;
window.openLorryReceiptModal = openLorryReceiptModal;
window.closeLorryReceiptModal = closeLorryReceiptModal;
window.openGpsModal = openGpsModal;
window.closeGpsModal = closeGpsModal;
window.printLorryReceipt = printLorryReceipt;
window.renderBuyerConsignments = renderBuyerConsignments;
window.filterBuyerShipmentsTab = filterBuyerShipmentsTab;
window.handleBuyerShipmentSearch = handleBuyerShipmentSearch;

// Demand Board Window Bindings
window.openDemandBidsModal = openDemandBidsModal;
window.closeDemandBidsModal = closeDemandBidsModal;
window.acceptDemandFarmerBid = acceptDemandFarmerBid;
window.sourceFromMarketplaceForDemand = sourceFromMarketplaceForDemand;
window.downloadPurchaseOrder = downloadPurchaseOrder;
window.downloadAllPurchaseOrders = downloadAllPurchaseOrders;
window.refreshDemandMatches = refreshDemandMatches;
window.handleDemandSearch = handleDemandSearch;
window.filterDemandsByStatus = filterDemandsByStatus;
window.filterDemandsByHub = filterDemandsByHub;
window.clearDemandFilters = clearDemandFilters;
window.openPostDemandModal = openPostDemandModal;
window.closePostDemandModal = closePostDemandModal;
window.updateDemandPricePreview = updateDemandPricePreview;
window.openBuyerProfileModal = openBuyerProfileModal;
window.closeBuyerProfileModal = closeBuyerProfileModal;
window.showNotification = showNotification;

// ==========================================
// FEATURE 9: COLD STORAGE, HERMETIC SILOS & e-NWR FINANCING
// ==========================================

function renderStorageFacilities(filterType = 'all') {
  const container = document.getElementById('storage-facilities-grid');
  if (!container || !buyerData || !buyerData.storageFacilities) return;

  const facilities = buyerData.storageFacilities.filter(f => {
    if (filterType === 'all') return true;
    return f.typeKey === filterType;
  });

  if (facilities.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #64748b;">No storage facilities match the selected filter.</div>`;
    return;
  }

  container.innerHTML = facilities.map(f => {
    const typeBadgeBg = f.typeKey === 'cold-storage' ? '#e0f2fe' : f.typeKey === 'dry-silo' ? '#fef3c7' : '#ffedd5';
    const typeBadgeColor = f.typeKey === 'cold-storage' ? '#0369a1' : f.typeKey === 'dry-silo' ? '#92400e' : '#c2410c';
    const topAccentBorder = f.typeKey === 'cold-storage' ? '#0284c7' : f.typeKey === 'dry-silo' ? '#d97706' : '#ea580c';
    const typeIcon = f.typeKey === 'cold-storage' ? '❄️' : f.typeKey === 'dry-silo' ? '🌾' : '☀️';

    return `
      <div class="storage-facility-card" style="border-top: 4px solid ${topAccentBorder};">
        <div>
          <!-- Facility Card Top Header -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span class="badge" style="background: ${typeBadgeBg}; color: ${typeBadgeColor}; font-weight: 800; font-size: 0.74rem; padding: 4px 10px; border-radius: 6px;">
              ${typeIcon} ${f.type}
            </span>
            <span style="font-weight: 800; font-size: 0.82rem; color: #0c5a36; background: #f0fdf4; border: 1px solid #bbf7d0; padding: 2px 8px; border-radius: 6px;">
              ⭐ ${f.rating}
            </span>
          </div>

          <h3 style="font-size: 1.08rem; font-weight: 800; color: #0f172a; margin-bottom: 4px; line-height: 1.35;">
            ${f.name}
          </h3>
          <div style="font-size: 0.8rem; color: #64748b; margin-bottom: 14px; font-weight: 500;">
            📍 ${window.tLocation ? window.tLocation(f.location) : f.location}
          </div>

          <!-- IoT Climate Sensors & Specs -->
          <div class="telemetry-badge-box">
            <div>
              <span style="color: #64748b; display: block; font-size: 0.68rem; font-weight: 700; text-transform: uppercase;">
                <span class="pulse-live-dot"></span> Temp Telemetry
              </span>
              <strong style="color: #0c5a36; font-size: 0.85rem;">${f.tempRange}</strong>
            </div>
            <div>
              <span style="color: #64748b; display: block; font-size: 0.68rem; font-weight: 700; text-transform: uppercase;">Humidity RH</span>
              <strong style="color: #0284c7; font-size: 0.85rem;">${f.humidity}</strong>
            </div>
          </div>

          <!-- Capacity Bar -->
          <div style="margin-bottom: 14px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.78rem; margin-bottom: 5px;">
              <span style="color: #64748b; font-weight: 600;">Available Chamber Space:</span>
              <strong style="color: #0c5a36; font-weight: 800;">${f.availableCapacity} (${f.availablePct}% Open)</strong>
            </div>
            <div style="width: 100%; height: 9px; background: #e2e8f0; border-radius: 999px; overflow: hidden;">
              <div style="width: ${f.availablePct}%; height: 100%; background: linear-gradient(90deg, #10b981 0%, #059669 100%); border-radius: 999px;"></div>
            </div>
            <div style="font-size: 0.72rem; color: #94a3b8; margin-top: 4px; font-weight: 500;">Total Facility Volume: ${f.totalCapacity}</div>
          </div>

          <!-- Suitable Crops Tags -->
          <div style="margin-bottom: 14px;">
            <span style="font-size: 0.7rem; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em;">Suitable Commodities:</span>
            <div style="display: flex; flex-wrap: wrap; gap: 5px; margin-top: 5px;">
              ${f.suitableCrops.map(c => `<span style="font-size: 0.72rem; background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; padding: 2px 7px; border-radius: 5px; font-weight: 600;">${window.tCrop ? window.tCrop(c) : c}</span>`).join('')}
            </div>
          </div>
        </div>

        <!-- Tariff & Actions Footer -->
        <div style="border-top: 1px solid #f1f5f9; padding-top: 14px; margin-top: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 12px;">
            <div>
              <span style="font-size: 0.7rem; color: #64748b; display: block; font-weight: 600;">Storage Tariff</span>
              <span style="font-size: 1.1rem; font-weight: 900; color: #0c5a36;">${f.tariff}</span>
            </div>
            <span style="font-size: 0.76rem; color: #475569; font-weight: 600; background: #f8fafc; padding: 3px 8px; border-radius: 6px; border: 1px solid #e2e8f0;">${f.tariffPerDay}</span>
          </div>

          <div style="display: flex; gap: 8px;">
            <button class="btn btn-outline btn-sm" onclick="if (window.renderChamberVisualizerForFacility) { window.renderChamberVisualizerForFacility('${f.id}'); showToast('Inspecting 2D chamber slots for ${f.name}...'); }" style="flex: 1; font-size: 0.78rem; font-weight: 700; border-color: #cbd5e1; color: #334155;" title="Inspect Individual Chamber Slots">
              🔍 Chambers
            </button>
            <button class="btn btn-primary btn-sm" onclick="openBookStorageModal('${f.id}')" style="flex: 1.4; background: linear-gradient(135deg, #0c5a36 0%, #064e3b 100%); border-color: #0c5a36; font-weight: 800; box-shadow: 0 4px 10px rgba(12, 90, 54, 0.25);">
              ❄️ Book Space
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (window.renderChamberVisualizerForFacility) {
    window.renderChamberVisualizerForFacility(facilities[0]?.id || 'WH-NSK-01');
  }
}

function renderStorageBookings() {
  const tbody = document.getElementById('storage-bookings-tbody');
  if (!tbody || !buyerData || !buyerData.activeStorageBookings) return;

  if (buyerData.activeStorageBookings.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 24px; color: #64748b;">No active storage chamber holdings currently registered.</td></tr>`;
    return;
  }

  tbody.innerHTML = buyerData.activeStorageBookings.map(b => `
    <tr>
      <td>
        <div style="font-weight: 800; font-family: monospace; color: #0c5a36; font-size: 0.88rem;">${b.id}</div>
        <div style="font-size: 0.75rem; color: #0f172a; font-weight: 600;">${b.warehouseName}</div>
        <span style="font-size: 0.7rem; color: #64748b;">${b.chamberNo}</span>
      </td>
      <td>
        <strong style="color: #0f172a; font-size: 0.88rem;">${window.tCrop ? window.tCrop(b.crop) : b.crop}</strong>
        <div style="font-size: 0.72rem; color: #64748b;">Lot Ref: ${b.lotRef}</div>
      </td>
      <td>
        <strong style="color: #0c5a36; font-size: 0.95rem;">${b.quantity}</strong>
      </td>
      <td>
        <div style="font-size: 0.78rem; font-weight: 700; color: #0369a1;">🌡️ ${b.tempCurrent}</div>
        <div style="font-size: 0.72rem; color: #64748b;">💧 ${b.humidityCurrent}</div>
      </td>
      <td>
        <div style="font-size: 0.78rem; color: #0f172a; font-weight: 600;">${b.expiryDate}</div>
        <span style="font-size: 0.72rem; color: #64748b;">Cost: ${b.monthlyCost}/mo</span>
      </td>
      <td>
        <div style="font-family: monospace; font-weight: 800; color: #2563eb; font-size: 0.78rem;">${b.eNwrReceiptNo}</div>
        <div style="font-size: 0.75rem; color: #166534; font-weight: 700;">⚡ Loan: ${b.pledgeLoanEligible}</div>
      </td>
      <td>
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <button class="btn btn-primary btn-sm" onclick="openEnwrPledgeModal('${b.id}')" style="background: #2563eb; border-color: #2563eb; font-size: 0.72rem; padding: 4px 8px; font-weight: 700;">
            ⚡ Draw 70% Loan
          </button>
          <button class="btn btn-outline btn-sm" onclick="showToast('Dispatch release request submitted for ${b.id}! Gate pass generated.')" style="font-size: 0.72rem; padding: 4px 8px;">
            📦 Release Stock
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function filterStorageFacilities(filterType, btnEl) {
  if (btnEl && btnEl.parentElement) {
    const btns = btnEl.parentElement.querySelectorAll('.storage-filter-btn');
    btns.forEach(b => {
      b.classList.remove('active');
      b.classList.remove('btn-primary');
      b.classList.add('btn-outline');
    });
    btnEl.classList.add('active');
    btnEl.classList.add('btn-primary');
    btnEl.classList.remove('btn-outline');
  }
  renderStorageFacilities(filterType);
}

function openBookStorageModal(facilityId) {
  const modal = document.getElementById('modal-book-storage');
  if (!modal) return;

  const facility = (buyerData.storageFacilities || []).find(f => f.id === facilityId) || buyerData.storageFacilities[0];
  if (facility) {
    const titleEl = document.getElementById('storage-modal-facility-title');
    const tempEl = document.getElementById('storage-modal-temp');
    const humEl = document.getElementById('storage-modal-humidity');
    const facIdInput = document.getElementById('storage-facility-id');

    if (titleEl) titleEl.textContent = `${facility.name} (${facility.location})`;
    if (tempEl) tempEl.textContent = facility.tempRange;
    if (humEl) humEl.textContent = facility.humidity;
    if (facIdInput) facIdInput.value = facility.id;
  }

  calculateStorageCostPreview();
  modal.classList.add('active');
}

function closeBookStorageModal() {
  const modal = document.getElementById('modal-book-storage');
  if (modal) modal.classList.remove('active');
}

function updateStorageBookingCrop(val) {
  calculateStorageCostPreview();
}

function calculateStorageCostPreview() {
  const facId = document.getElementById('storage-facility-id')?.value || 'WH-ERD-01';
  const facility = (buyerData.storageFacilities || []).find(f => f.id === facId) || buyerData.storageFacilities[0];

  const qtyInput = document.getElementById('storage-book-qty');
  const unitSelect = document.getElementById('storage-book-unit');
  const tenureSelect = document.getElementById('storage-book-tenure');

  const rawQty = parseFloat(qtyInput?.value || 50);
  const unit = unitSelect?.value || 'Qt';
  const days = parseInt(tenureSelect?.value || 30);

  // Convert to Qt
  const qtyInQt = unit === 'kg' ? rawQty / 100 : rawQty;
  const monthlyRatePerQt = facId === 'WH-ERD-01' ? 45 : facId === 'WH-SLM-02' ? 35 : facId === 'WH-NSK-03' ? 40 : 55;

  const totalCost = Math.round(qtyInQt * monthlyRatePerQt * (days / 30));

  const rateEl = document.getElementById('storage-rate-display');
  const feeEl = document.getElementById('storage-total-fee-display');

  if (rateEl) rateEl.textContent = `₹ ${(monthlyRatePerQt / 100).toFixed(2)} /kg /month (₹ ${(monthlyRatePerQt / 3000).toFixed(3)} /kg /day)`;
  if (feeEl) feeEl.textContent = `₹ ${totalCost.toLocaleString('en-IN')}`;
}

function handleBookStorageSubmit(e) {
  if (e) e.preventDefault();

  const facId = document.getElementById('storage-facility-id')?.value || 'WH-NSK-01';
  const facility = (buyerData.storageFacilities || []).find(f => f.id === facId) || buyerData.storageFacilities[0];

  const lotRaw = document.getElementById('storage-lot-select')?.value || 'LOT-TOM-88|Tomato (Narayangaon Hybrid)|50 Qt (5,000 kg)';
  const [lotId, cropName, qtyText] = lotRaw.split('|');

  const rawQty = parseFloat(document.getElementById('storage-book-qty')?.value || 50);
  const unit = document.getElementById('storage-book-unit')?.value || 'Qt';
  const days = parseInt(document.getElementById('storage-book-tenure')?.value || 30);

  const newBookingId = `STR-2026-${Math.floor(100 + Math.random() * 900)}`;
  const receiptNo = `eNWR-MH-2026-${Math.floor(10000 + Math.random() * 90000)}`;

  const qtyInQt = unit === 'kg' ? rawQty / 100 : rawQty;
  const qtyInKg = unit === 'kg' ? rawQty : rawQty * 100;
  const monthlyRatePerQt = facId === 'WH-NSK-01' ? 40 : facId === 'WH-PUN-02' ? 50 : facId === 'WH-LAT-03' ? 35 : 45;
  const totalCost = Math.round(qtyInQt * monthlyRatePerQt * (days / 30));
  const benchmarkRateKg = 12.00;
  const maxLoan = Math.round(qtyInKg * benchmarkRateKg * 0.70);

  const newBooking = {
    id: newBookingId,
    warehouseId: facility.id,
    warehouseName: facility.name,
    crop: cropName || 'Agricultural Produce',
    quantity: `${qtyInQt} Qt (${qtyInKg.toLocaleString('en-IN')} kg)`,
    lotRef: lotId || 'LOT-PROD-01',
    chamberNo: `Chamber #${Math.floor(1 + Math.random() * 8)}-${String.fromCharCode(65 + Math.floor(Math.random() * 4))}`,
    tempCurrent: facility.tempRange.split(' ')[0] || '3.5°C',
    humidityCurrent: facility.humidity.split(' ')[0] || '88% RH',
    bookingDate: '13 Sep 2026',
    expiryDate: `${days} Days (${days <= 30 ? 'Active' : 'Extended'})`,
    monthlyCost: `₹ ${totalCost.toLocaleString('en-IN')}`,
    status: 'In Storage (Active)',
    statusBadgeClass: 'badge-status-open',
    eNwrReceiptNo: receiptNo,
    pledgeLoanEligible: `₹ ${maxLoan.toLocaleString('en-IN')} (70% LTV)`
  };

  buyerData.activeStorageBookings.unshift(newBooking);

  // Update KPI counters
  const spaceKpi = document.getElementById('storage-active-space');
  if (spaceKpi) {
    const totalBookedQt = buyerData.activeStorageBookings.reduce((sum, b) => sum + (parseFloat(b.quantity) || 50), 0);
    spaceKpi.textContent = `${totalBookedQt} Qt`;
  }

  closeBookStorageModal();
  renderStorageBookings();
  showToast(`❄️ Storage Chamber Booked! Receipt #${receiptNo} generated with ₹ ${maxLoan.toLocaleString('en-IN')} pledge loan eligibility.`, 'success');
  switchView('view-storage');
}

function openEnwrPledgeModal(bookingId) {
  const modal = document.getElementById('modal-enwr-pledge');
  if (!modal) return;

  const booking = (buyerData.activeStorageBookings || []).find(b => b.id === bookingId) || buyerData.activeStorageBookings[0];
  if (booking) {
    const recEl = document.getElementById('enwr-receipt-ref');
    const lotEl = document.getElementById('enwr-modal-lot');
    const valEl = document.getElementById('enwr-modal-val');
    const maxLoanEl = document.getElementById('enwr-modal-max-loan');
    const loanInput = document.getElementById('enwr-draw-amount');
    const bookIdInput = document.getElementById('enwr-booking-id');

    if (recEl) recEl.textContent = `WDRA Certificate #${booking.eNwrReceiptNo}`;
    if (lotEl) lotEl.textContent = `${booking.crop} • ${booking.quantity}`;
    if (bookIdInput) bookIdInput.value = booking.id;

    const qtyQt = parseFloat(booking.quantity) || 50;
    const estVal = qtyQt * 1200;
    const maxLoan = Math.round(estVal * 0.70);

    if (valEl) valEl.textContent = `₹ ${estVal.toLocaleString('en-IN')} (₹ 12.00 /kg Mandi Rate)`;
    if (maxLoanEl) maxLoanEl.textContent = `₹ ${maxLoan.toLocaleString('en-IN')}`;
    if (loanInput) {
      loanInput.value = maxLoan;
      loanInput.max = maxLoan;
    }
  }

  modal.classList.add('active');
}

function closeEnwrPledgeModal() {
  const modal = document.getElementById('modal-enwr-pledge');
  if (modal) modal.classList.remove('active');
}

function handleEnwrPledgeSubmit(e) {
  if (e) e.preventDefault();

  const drawAmt = parseFloat(document.getElementById('enwr-draw-amount')?.value || 42000);
  const bank = document.getElementById('enwr-bank-partner')?.value || 'State Bank of India (SBI) Agri Credit';

  closeEnwrPledgeModal();
  showToast(`🏛️ Digital lien registered on WDRA registry in favor of ${bank.split('(')[0]}...`);

  setTimeout(() => {
    showToast(`✓ ₹ ${drawAmt.toLocaleString('en-IN')} pledge loan disbursed instantly to your AgriNex Escrow Account!`, 'success');
  }, 900);
}

// Storage & Logistics & Dashboard Window Bindings
window.switchView = switchView;
window.showToast = showToast;
window.showNotification = showNotification;
window.applyFilters = applyFilters;
window.filterByCategoryPill = filterByCategoryPill;
window.setMarketViewMode = setMarketViewMode;
window.setBuyerPersona = setBuyerPersona;
window.handleBuyerSearch = handleBuyerSearch;
window.resetBuyerFilters = resetBuyerFilters;
window.updateBuyerMarketStats = updateBuyerMarketStats;
window.openBidModal = openBidModal;
window.closeBidModal = closeBidModal;
window.updateBidKgPreview = updateBidKgPreview;
window.openDirectBuyModal = openDirectBuyModal;
window.closeDirectBuyModal = closeDirectBuyModal;
window.updateDirectBuyCalculations = updateDirectBuyCalculations;
window.executeBuyerLotPurchase = executeBuyerLotPurchase;
window.openPostDemandModal = openPostDemandModal;
window.closePostDemandModal = closePostDemandModal;
window.updateDemandPricePreview = updateDemandPricePreview;
window.openDemandBidsModal = openDemandBidsModal;
window.closeDemandBidsModal = closeDemandBidsModal;
window.handleDemandSearch = handleDemandSearch;
window.filterDemandsByStatus = filterDemandsByStatus;
window.filterDemandsByHub = filterDemandsByHub;
window.refreshDemandMatches = refreshDemandMatches;
window.openEmergencyBuyoutModal = openEmergencyBuyoutModal;
window.closeEmergencyBuyoutModal = closeEmergencyBuyoutModal;
window.executeEmergencyBuyoutConfirmed = executeEmergencyBuyoutConfirmed;
window.openBuyerProfileModal = openBuyerProfileModal;
window.closeBuyerProfileModal = closeBuyerProfileModal;
window.openNegotiationModal = openNegotiationModal;
window.closeNegotiationModal = closeNegotiationModal;
window.acceptFarmerCounter = acceptFarmerCounter;
window.confirmEscrowFromCounter = confirmEscrowFromCounter;
window.openGrievanceModal = openGrievanceModal;
window.closeGrievanceModal = closeGrievanceModal;
window.handleGrievanceFileUpload = handleGrievanceFileUpload;
window.filterGrievance = filterGrievance;
window.openDepositEscrowModal = openDepositEscrowModal;
window.closeDepositEscrowModal = closeDepositEscrowModal;
window.updateEscrowGatewayAmount = updateEscrowGatewayAmount;
window.setEscrowPresetAmount = setEscrowPresetAmount;
window.setEscrowDepositRail = setEscrowDepositRail;
window.copyEscrowField = copyEscrowField;
window.handleDepositEscrowSubmit = handleDepositEscrowSubmit;
window.selectCorpBank = selectCorpBank;
window.printDepositReceipt = printDepositReceipt;
window.closeDepositReceiptModal = closeDepositReceiptModal;
window.openEscrowDeedModal = openEscrowDeedModal;
window.closeEscrowDeedModal = closeEscrowDeedModal;
window.downloadAllPurchaseOrders = downloadAllPurchaseOrders;
window.downloadEscrowStatement = downloadEscrowStatement;
window.renderStorageFacilities = renderStorageFacilities;
window.renderStorageBookings = renderStorageBookings;
window.filterStorageFacilities = filterStorageFacilities;
window.openBookStorageModal = openBookStorageModal;
window.closeBookStorageModal = closeBookStorageModal;
window.updateStorageBookingCrop = updateStorageBookingCrop;
window.calculateStorageCostPreview = calculateStorageCostPreview;
window.handleBookStorageSubmit = handleBookStorageSubmit;
window.openEnwrPledgeModal = openEnwrPledgeModal;
window.closeEnwrPledgeModal = closeEnwrPledgeModal;
window.handleEnwrPledgeSubmit = handleEnwrPledgeSubmit;
window.openDriverFleetModal = openDriverFleetModal;
window.closeDriverFleetModal = closeDriverFleetModal;
window.openGpsFromDriverModal = openGpsFromDriverModal;
window.filterBuyerShipmentsTab = filterBuyerShipmentsTab;
window.handleBuyerShipmentSearch = handleBuyerShipmentSearch;
window.renderBuyerConsignments = renderBuyerConsignments;
window.openLorryReceiptModal = openLorryReceiptModal;
window.closeLorryReceiptModal = closeLorryReceiptModal;
window.openGpsModal = openGpsModal;
window.closeGpsModal = closeGpsModal;
window.openArrivalReleaseModal = openArrivalReleaseModal;
window.closeArrivalReleaseModal = closeArrivalReleaseModal;
window.confirmReleaseEscrowAction = confirmReleaseEscrowAction;
window.openBookTransportModal = openBookTransportModal;
window.closeBookTransportModal = closeBookTransportModal;
window.calculateTransportEstimate = calculateTransportEstimate;
window.updateTransportLotMeta = updateTransportLotMeta;
window.renderBuyerEmergencyDesk = renderBuyerEmergencyDesk;
window.renderBuyerEscrowVault = renderBuyerEscrowVault;
window.renderVerifiedLots = renderVerifiedLots;
window.renderBuyerDemands = renderBuyerDemands;
window.renderGrievances = renderGrievances;


