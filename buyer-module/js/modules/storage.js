/**
 * AgriNex Buyer Module - Cold Storage & Hermetic Silos Module
 * Handles WDRA accredited facilities, 2D chamber slot visualizer, and e-NWR pledge loans.
 */

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

  const curLang = (typeof currentLang !== 'undefined' ? currentLang : (typeof AgriNexI18n !== 'undefined' && AgriNexI18n.getBuyerLanguage ? AgriNexI18n.getBuyerLanguage() : 'en'));

  container.innerHTML = facilities.map(f => {
    const typeBadgeBg = f.typeKey === 'cold-storage' ? '#e0f2fe' : f.typeKey === 'dry-silo' ? '#fef3c7' : '#ffedd5';
    const typeBadgeColor = f.typeKey === 'cold-storage' ? '#0369a1' : f.typeKey === 'dry-silo' ? '#92400e' : '#c2410c';
    const topAccentBorder = f.typeKey === 'cold-storage' ? '#0284c7' : f.typeKey === 'dry-silo' ? '#d97706' : '#ea580c';
    const typeIcon = f.typeKey === 'cold-storage' ? '❄️' : f.typeKey === 'dry-silo' ? '🌾' : '☀️';

    const typeTranslated = window.tWarehouse ? window.tWarehouse(f.type) : (window.tText ? window.tText(f.type) : f.type);
    const nameTranslated = window.tWarehouse ? window.tWarehouse(f.name) : (window.tText ? window.tText(f.name) : f.name);
    const locTranslated = window.tLocation ? window.tLocation(f.location) : (window.tText ? window.tText(f.location) : f.location);
    const tempTranslated = window.tWarehouse ? window.tWarehouse(f.tempRange) : (window.tText ? window.tText(f.tempRange) : f.tempRange);
    const humidityTranslated = window.tWarehouse ? window.tWarehouse(f.humidity) : (window.tText ? window.tText(f.humidity) : f.humidity);
    const availCapTranslated = window.tText ? window.tText(f.availableCapacity) : f.availableCapacity;
    const totalCapTranslated = window.tText ? window.tText(f.totalCapacity) : f.totalCapacity;
    const tariffTranslated = window.tText ? window.tText(f.tariff) : f.tariff;
    const tariffPerDayTranslated = window.tText ? window.tText(f.tariffPerDay) : f.tariffPerDay;

    const lblTemp = curLang === 'mr' ? 'तापमान सेन्सर' : (curLang === 'hi' ? 'तापमान टेलीमेट्री' : 'Temp Telemetry');
    const lblHumidity = curLang === 'mr' ? 'आर्द्रता (RH)' : (curLang === 'hi' ? 'आर्द्रता (RH)' : 'Humidity RH');
    const lblAvailSpace = curLang === 'mr' ? 'उपलब्ध शीतगृह जागा:' : (curLang === 'hi' ? 'उपलब्ध कक्ष क्षमता:' : 'Available Chamber Space:');
    const lblAvailPct = curLang === 'mr' ? `${f.availablePct}% उपलब्ध` : (curLang === 'hi' ? `${f.availablePct}% उपलब्ध` : `${f.availablePct}% Open`);
    const lblTotalVol = curLang === 'mr' ? 'एकूण सुविधा क्षमता:' : (curLang === 'hi' ? 'कुल सुविधा क्षमता:' : 'Total Facility Volume:');
    const lblSuitable = curLang === 'mr' ? 'अनुकूल कृषी जिन्नस:' : (curLang === 'hi' ? 'अनुकूल फसलें:' : 'Suitable Commodities:');
    const lblTariff = curLang === 'mr' ? 'भंडारण दर' : (curLang === 'hi' ? 'भंडारण टैरिफ' : 'Storage Tariff');
    const btnChambers = curLang === 'mr' ? '🔍 कक्ष विवरण' : (curLang === 'hi' ? '🔍 कक्ष विवरण' : '🔍 Chambers');
    const btnBook = curLang === 'mr' ? '❄️ जागा आरक्षित करा' : (curLang === 'hi' ? '❄️ स्थान बुक करें' : '❄️ Book Space');

    return `
      <div class="storage-facility-card" style="border-top: 4px solid ${topAccentBorder};">
        <div>
          <!-- Facility Card Top Header -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span class="badge" style="background: ${typeBadgeBg}; color: ${typeBadgeColor}; font-weight: 800; font-size: 0.74rem; padding: 4px 10px; border-radius: 6px;">
              ${typeIcon} ${typeTranslated}
            </span>
            <span style="font-weight: 800; font-size: 0.82rem; color: #0c5a36; background: #f0fdf4; border: 1px solid #bbf7d0; padding: 2px 8px; border-radius: 6px;">
              ⭐ ${f.rating}
            </span>
          </div>

          <h3 style="font-size: 1.08rem; font-weight: 800; color: #0f172a; margin-bottom: 4px; line-height: 1.35;">
            ${nameTranslated}
          </h3>
          <div style="font-size: 0.8rem; color: #64748b; margin-bottom: 14px; font-weight: 500;">
            📍 ${locTranslated}
          </div>

          <!-- IoT Climate Sensors & Specs -->
          <div class="telemetry-badge-box">
            <div>
              <span style="color: #64748b; display: block; font-size: 0.68rem; font-weight: 700; text-transform: uppercase;">
                <span class="pulse-live-dot"></span> ${lblTemp}
              </span>
              <strong style="color: #0c5a36; font-size: 0.85rem;">${tempTranslated}</strong>
            </div>
            <div>
              <span style="color: #64748b; display: block; font-size: 0.68rem; font-weight: 700; text-transform: uppercase;">${lblHumidity}</span>
              <strong style="color: #0284c7; font-size: 0.85rem;">${humidityTranslated}</strong>
            </div>
          </div>

          <!-- Capacity Bar -->
          <div style="margin-bottom: 14px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.78rem; margin-bottom: 5px;">
              <span style="color: #64748b; font-weight: 600;">${lblAvailSpace}</span>
              <strong style="color: #0c5a36; font-weight: 800;">${availCapTranslated} (${lblAvailPct})</strong>
            </div>
            <div style="width: 100%; height: 9px; background: #e2e8f0; border-radius: 999px; overflow: hidden;">
              <div style="width: ${f.availablePct}%; height: 100%; background: linear-gradient(90deg, #10b981 0%, #059669 100%); border-radius: 999px;"></div>
            </div>
            <div style="font-size: 0.72rem; color: #94a3b8; margin-top: 4px; font-weight: 500;">${lblTotalVol} ${totalCapTranslated}</div>
          </div>

          <!-- Suitable Crops Tags -->
          <div style="margin-bottom: 14px;">
            <span style="font-size: 0.7rem; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em;">${lblSuitable}</span>
            <div style="display: flex; flex-wrap: wrap; gap: 5px; margin-top: 5px;">
              ${f.suitableCrops.map(c => `<span style="font-size: 0.72rem; background: #f0fdf4; color: #166534; border: 1px solid #bbf7d0; padding: 2px 7px; border-radius: 5px; font-weight: 600;">${window.tCrop ? window.tCrop(c) : c}</span>`).join('')}
            </div>
          </div>
        </div>

        <!-- Tariff & Actions Footer -->
        <div style="border-top: 1px solid #f1f5f9; padding-top: 14px; margin-top: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 12px;">
            <div>
              <span style="font-size: 0.7rem; color: #64748b; display: block; font-weight: 600;">${lblTariff}</span>
              <span style="font-size: 1.1rem; font-weight: 900; color: #0c5a36;">${tariffTranslated}</span>
            </div>
            <span style="font-size: 0.76rem; color: #475569; font-weight: 600; background: #f8fafc; padding: 3px 8px; border-radius: 6px; border: 1px solid #e2e8f0;">${tariffPerDayTranslated}</span>
          </div>

          <div style="display: flex; gap: 8px;">
            <button class="btn btn-outline btn-sm" onclick="if (window.renderChamberVisualizerForFacility) { window.renderChamberVisualizerForFacility('${f.id}'); showToast('Inspecting 2D chamber slots for ${f.name}...'); }" style="flex: 1; font-size: 0.78rem; font-weight: 700; border-color: #cbd5e1; color: #334155;" title="Inspect Individual Chamber Slots">
              ${btnChambers}
            </button>
            <button class="btn btn-primary btn-sm" onclick="openBookStorageModal('${f.id}')" style="flex: 1.4; background: linear-gradient(135deg, #0c5a36 0%, #064e3b 100%); border-color: #0c5a36; font-weight: 800; box-shadow: 0 4px 10px rgba(12, 90, 54, 0.25);">
              ${btnBook}
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

  const isMr = typeof window.getBuyerLanguage === 'function' && window.getBuyerLanguage() === 'mr';
  const isHi = typeof window.getBuyerLanguage === 'function' && window.getBuyerLanguage() === 'hi';

  if (buyerData.activeStorageBookings.length === 0) {
    const emptyMsg = isMr ? 'सध्या कोणतीही सक्रिय साठवणूक नोंदणी नाही.' : (isHi ? 'वर्तमान में कोई सक्रिय भंडारण होल्डिंग पंजीकृत नहीं है।' : 'No active storage chamber holdings currently registered.');
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 24px; color: #64748b;">${emptyMsg}</td></tr>`;
    return;
  }

  const trW = (t) => (window.tWarehouse ? window.tWarehouse(t) : (window.tText ? window.tText(t) : t));
  const trT = (t) => (window.tText ? window.tText(t) : t);

  const lotRefLabel = isMr ? 'लॉट संदर्भ:' : (isHi ? 'लॉट संदर्भ:' : 'Lot Ref:');
  const costLabel = isMr ? 'खर्च:' : (isHi ? 'लागत:' : 'Cost:');
  const perMoLabel = isMr ? '/महिना' : (isHi ? '/माह' : '/mo');
  const loanLabel = isMr ? '⚡ कर्ज:' : (isHi ? '⚡ ऋण:' : '⚡ Loan:');
  const drawLoanBtn = isMr ? '⚡ ७०% कर्ज मिळवा' : (isHi ? '⚡ 70% ऋण प्राप्त करें' : '⚡ Draw 70% Loan');
  const releaseStockBtn = isMr ? '📦 साठा सोडवा' : (isHi ? '📦 स्टॉक रिलीज करें' : '📦 Release Stock');

  tbody.innerHTML = buyerData.activeStorageBookings.map(b => `
    <tr>
      <td>
        <div style="font-weight: 800; font-family: monospace; color: #0c5a36; font-size: 0.88rem;">${b.id}</div>
        <div style="font-size: 0.75rem; color: #0f172a; font-weight: 600;">${trW(b.warehouseName)}</div>
        <span style="font-size: 0.7rem; color: #64748b;">${trW(b.chamberNo)}</span>
      </td>
      <td>
        <strong style="color: #0f172a; font-size: 0.88rem;">${window.tCrop ? window.tCrop(b.crop) : b.crop}</strong>
        <div style="font-size: 0.72rem; color: #64748b;">${lotRefLabel} ${b.lotRef}</div>
      </td>
      <td>
        <strong style="color: #0c5a36; font-size: 0.95rem;">${trT(b.quantity)}</strong>
      </td>
      <td>
        <div style="font-size: 0.78rem; font-weight: 700; color: #0369a1;">🌡️ ${trW(b.tempCurrent)}</div>
        <div style="font-size: 0.72rem; color: #64748b;">💧 ${trW(b.humidityCurrent)}</div>
      </td>
      <td>
        <div style="font-size: 0.78rem; color: #0f172a; font-weight: 600;">${trT(b.expiryDate)}</div>
        <span style="font-size: 0.72rem; color: #64748b;">${costLabel} ${b.monthlyCost}${perMoLabel}</span>
      </td>
      <td>
        <div style="font-family: monospace; font-weight: 800; color: #2563eb; font-size: 0.78rem;">${b.eNwrReceiptNo}</div>
        <div style="font-size: 0.75rem; color: #166534; font-weight: 700;">${loanLabel} ${trT(b.pledgeLoanEligible)}</div>
      </td>
      <td>
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <button class="btn btn-primary btn-sm" onclick="openEnwrPledgeModal('${b.id}')" style="background: #2563eb; border-color: #2563eb; font-size: 0.72rem; padding: 4px 8px; font-weight: 700;">
            ${drawLoanBtn}
          </button>
          <button class="btn btn-outline btn-sm" onclick="showToast(window.tText ? window.tText('Dispatch release request submitted for ${b.id}! Gate pass generated.') : 'Dispatch release request submitted for ${b.id}! Gate pass generated.')" style="font-size: 0.72rem; padding: 4px 8px;">
            ${releaseStockBtn}
          </button>
        </div>
      </td>
    </tr>
  `).join('');
  if (typeof window.walkAndTranslateDOM === 'function') {
    window.walkAndTranslateDOM(tbody);
  }
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
    eNwrReceiptNo: receiptNo,
    pledgeLoanEligible: `₹ ${maxLoan.toLocaleString('en-IN')}`
  };

  if (!buyerData.activeStorageBookings) buyerData.activeStorageBookings = [];
  buyerData.activeStorageBookings.unshift(newBooking);

  try {
    localStorage.setItem('agrinex_buyer_storage_bookings', JSON.stringify(buyerData.activeStorageBookings));
  } catch (err) {
    console.warn('Could not persist storage bookings:', err);
  }

  closeBookStorageModal();
  renderStorageBookings();

  if (typeof showToast === 'function') {
    showToast(`✓ Chamber booked at ${facility.name}! Electronic Negotiable Warehouse Receipt #${receiptNo} generated.`, 'success');
  }
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
  if (typeof showToast === 'function') {
    showToast(`🏛️ Digital lien registered on WDRA registry in favor of ${bank.split('(')[0]}...`);
  }

  // Credit into Escrow Liquidity Pool
  if (window.buyerEscrowState) {
    window.buyerEscrowState.availableLiquidity = (window.buyerEscrowState.availableLiquidity || 0) + drawAmt;
    try {
      localStorage.setItem('agrinex_buyer_escrow', JSON.stringify(window.buyerEscrowState));
    } catch (err) {
      console.warn('Could not persist escrow state:', err);
    }
    if (typeof updateEscrowVaultDOM === 'function') {
      updateEscrowVaultDOM();
    }
  }

  setTimeout(() => {
    if (typeof showToast === 'function') {
      showToast(`✓ ₹ ${drawAmt.toLocaleString('en-IN')} pledge loan disbursed instantly to your AgriNex Escrow Account!`, 'success');
    }
  }, 900);
}

// Delegated Submit Listener for Storage Modals
document.addEventListener('submit', function (e) {
  if (!e.target) return;
  if (e.target.id === 'form-book-storage') {
    handleBookStorageSubmit(e);
  } else if (e.target.id === 'form-enwr-pledge') {
    handleEnwrPledgeSubmit(e);
  }
});

// Storage Window Bindings
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
