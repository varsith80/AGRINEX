/**
 * AgriNex Buyer Module - Emergency Salvage Desk Domain Module
 * Handles breakeven liquidation, salvage urgency tickers, and quick buyout actions.
 */

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
        <td data-label="${window.t ? window.t('col_crop_lot', 'Crop Lot') : 'Crop Lot'}">
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
        <td data-label="${window.t ? window.t('col_farmer_mandi', 'Farmer & Mandi') : 'Farmer & Mandi'}">
          <div style="font-weight: 700; color: #0f172a; font-size: 0.88rem;">${window.tPerson ? window.tPerson(item.farmerName) : item.farmerName}</div>
          <div style="font-size: 0.74rem; color: #64748b;">📍 ${window.tLocation ? window.tLocation(item.mandi) : item.mandi}</div>
        </td>
        <td data-label="${window.t ? window.t('col_quantity', 'Quantity') : 'Quantity'}">
          <strong style="color: ${isPurchased && isViewingAsOther ? '#ef4444' : '#0f172a'}; font-size: 0.95rem;">
            ${isPurchased && isViewingAsOther ? (window.t ? window.t('sold_out_qty', '0 kg (Sold Out)') : '0 kg (Sold Out)') : item.quantity}
          </strong>
        </td>
        <td data-label="${window.t ? window.t('col_buyout_price', 'Buyout Price') : 'Buyout Price'}">
          <div>
            <span style="font-size: 1.05rem; font-weight: 800; color: #15803d;">${item.breakevenPrice}</span>
            <div style="font-size: 0.72rem; color: #64748b; text-decoration: line-through;">Orig: ${item.floorPrice}</div>
          </div>
        </td>
        <td data-label="${window.t ? window.t('col_target_use', 'Target Use') : 'Target Use'}">
          <span class="badge-buyer-type ${item.targetUseBadge}">
            <span>${item.targetIcon}</span> ${window.tText ? window.tText(item.targetUse) : item.targetUse}
          </span>
        </td>
        <td data-label="${window.t ? window.t('col_urgency', 'Urgency') : 'Urgency'}">
          <span class="badge badge-status-emergency" style="font-size: 0.72rem;">
            ${window.tText ? window.tText(item.shelfLife) : item.shelfLife}
          </span>
        </td>
        <td data-label="${window.t ? window.t('col_action', 'Action') : 'Action'}">
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

  let qtyKg = 5000;
  const qMatch = (lot.quantity || '').match(/([0-9,]+)\s*kg/i);
  if (qMatch) qtyKg = parseFloat(qMatch[1].replace(/,/g, ''));
  const numPrice = parseFloat(lot.breakevenPrice.replace(/[^0-9.]/g, '')) || 12;
  const totalVal = Math.round(numPrice * qtyKg);
  const advAmount = Math.round(totalVal * 0.35);
  const balAmount = totalVal - advAmount;

  closeEmergencyBuyoutModal();
  openEscrowPaymentGateway({
    lotId: lot.id,
    crop: lot.crop,
    grade: 'Grade A',
    farmerName: lot.farmerName,
    farmerLocation: lot.mandi || 'Maharashtra APMC',
    farmerPhone: '+91 98220-44911',
    qtyKg: qtyKg,
    qtyQt: parseFloat((qtyKg / 100).toFixed(1)),
    rateKg: numPrice,
    totalVal: totalVal,
    advAmount: advAmount,
    balAmount: balAmount,
    isEmergency: true
  });
}

function executeEmergencyBuyout(lotId, cropName, price) {
  openEmergencyBuyoutModal(lotId);
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

// Window Bindings for Emergency Module
window.renderBuyerEmergencyDesk = renderBuyerEmergencyDesk;
window.toggleEmergencySection = toggleEmergencySection;
window.openEmergencyBuyoutModal = openEmergencyBuyoutModal;
window.closeEmergencyBuyoutModal = closeEmergencyBuyoutModal;
window.executeEmergencyBuyoutConfirmed = executeEmergencyBuyoutConfirmed;
window.executeEmergencyBuyout = executeEmergencyBuyout;
window.executeBuyerEmergencyPurchase = executeBuyerEmergencyPurchase;
