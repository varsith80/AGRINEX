/**
 * AgriNex Buyer Module - Consignments & Logistics Telemetry Engine
 * Handles GPS fleet tracking, reefer temperature telemetry, Lorry Receipts (LR), and gate passes.
 */

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
  const verifiedOrdersCount = consignments.filter(c => c.status === 'transit' || c.status === 'delivered' || c.gate_pass).length;

  const isMr = typeof window.getBuyerLanguage === 'function' && window.getBuyerLanguage() === 'mr';
  const isHi = typeof window.getBuyerLanguage === 'function' && window.getBuyerLanguage() === 'hi';

  const onRoadLabel = isMr ? `${onRoadCount} रस्त्यावर` : (isHi ? `${onRoadCount} मार्गस्थ` : `${onRoadCount} On Road`);
  const verifiedLabel = isMr ? `${verifiedOrdersCount} प्रमाणित` : (isHi ? `${verifiedOrdersCount} प्रमाणित` : `${verifiedOrdersCount} Verified`);

  if (activeTrucksEl) activeTrucksEl.textContent = onRoadLabel;
  if (volumeTransitEl) {
    const qtSuffix = isMr ? 'क्विंटल' : (isHi ? 'क्विंटल' : 'Qt');
    const kgSuffix = isMr ? 'किग्रा' : (isHi ? 'किग्रा' : 'kg');
    volumeTransitEl.innerHTML = `${transitQt} ${qtSuffix} <span style="font-size:0.72rem; color:#64748b; font-weight:600;">(${transitKg.toLocaleString('en-IN')} ${kgSuffix})</span>`;
  }
  if (gatePassesEl) gatePassesEl.textContent = verifiedLabel;

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

  const trTab = (txt) => (typeof window.tText === 'function' ? window.tText(txt) : txt);
  if (tabAll) tabAll.textContent = `${trTab('All Active Orders')} (${allCount})`;
  if (tabTransit) tabTransit.textContent = `${trTab('On The Road')} (${transitCount})`;
  if (tabSched) tabSched.textContent = `${trTab('Scheduled')} (${schedCount})`;
  if (tabDeliv) tabDeliv.textContent = `${trTab('Delivered & Settled')} (${delivCount})`;
  if (tabDrivers) tabDrivers.textContent = `${trTab('Driver & Vehicle Telemetry')} (${allCount})`;

  if (typeof updateBuyerMarketStats === 'function') {
    try { updateBuyerMarketStats(); } catch(e) {}
  }

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
        <div style="font-weight: 700; font-size: 1rem; color: #0f172a;">${trTab('No Shipments Found in this Tab')}</div>
        <div style="font-size: 0.8rem; margin-top: 4px;">${trTab('Book dedicated transport fleet or source from marketplace lots to create shipments.')}</div>
        <button class="btn btn-primary btn-sm" onclick="openBookTransportModal()" style="margin-top: 14px; background: #0c5a36; border-color: #0c5a36; font-weight: 700;">${trTab('+ Book Transport Fleet')}</button>
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
            <strong style="color: #0f172a; font-size: 0.95rem;">${trTab('Verified Driver & Fleet Telemetry Directory')}</strong>
            <span style="display: block; font-size: 0.75rem; color: #64748b;">${trTab('Live GPS beacon tracking, commercial license status, weighbridge tare/gross load, and reefer temperatures')}</span>
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
          const rawStatusLabel = isTransit ? 'On The Road' : (isDelivered ? 'Delivered & Released' : 'Pickup Scheduled');
          const statusLabel = typeof window.tText === 'function' ? window.tText(rawStatusLabel) : rawStatusLabel;

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
                    <span style="color: #64748b; font-size: 0.68rem; display: block; text-transform: uppercase;">${window.tText ? window.tText('Vehicle & Model') : 'Vehicle & Model'}</span>
                    <strong style="color: #0f172a; font-size: 0.82rem;">${window.tVehicle ? window.tVehicle(s.vehicle) : s.vehicle}</strong>
                  </div>
                  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 10px;">
                    <span style="color: #64748b; font-size: 0.68rem; display: block; text-transform: uppercase;">${window.tText ? window.tText('Commercial DL No.') : 'Commercial DL No.'}</span>
                    <strong style="color: #0f172a; font-size: 0.82rem;">${s.dl_no || 'MH-15-2019-0912'}</strong>
                  </div>
                  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 10px;">
                    <span style="color: #64748b; font-size: 0.68rem; display: block; text-transform: uppercase;">${window.tText ? window.tText('Payload Capacity') : 'Payload Capacity'}</span>
                    <strong style="color: #0c5a36; font-size: 0.82rem;">${s.capacity || s.quantity_qt + ' Qt Payload'}</strong>
                  </div>
                  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 10px;">
                    <span style="color: #64748b; font-size: 0.68rem; display: block; text-transform: uppercase;">${window.tText ? window.tText('Cargo Temperature') : 'Cargo Temperature'}</span>
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
                    <span style="font-weight: 700; color: #1d4ed8;">⏱️ ${window.tText ? window.tText(s.eta) : s.eta}</span>
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
    if (typeof window.walkAndTranslateDOM === 'function') window.walkAndTranslateDOM(container);
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
            <span style="font-size: 0.82rem; color: #0c5a36; font-weight: 800; background: #f0fdf4; border: 1px solid #bbf7d0; padding: 2px 8px; border-radius: 6px;">🚛 ${window.tVehicle ? window.tVehicle(s.vehicle) : s.vehicle}</span>
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
            <div style="color: #0c5a36; font-weight: 800; font-size: 0.88rem;">${s.quantity_qt} ${isMr ? 'क्विंटल' : (isHi ? 'क्विंटल' : 'Qt')} (${qtyKg.toLocaleString('en-IN')} ${isMr ? 'किग्रा' : (isHi ? 'किग्रा' : 'kg')})</div>
            <div style="color: #475569; font-size: 0.78rem; font-weight: 600; margin-top: 2px;">📍 ${window.tPerson ? window.tPerson(s.farmer) : s.farmer} (${window.tLocation ? window.tLocation(s.farmer_origin) : s.farmer_origin})</div>
          </div>
          <div>
            <div style="font-size: 0.68rem; color: #64748b; font-weight: 800; text-transform: uppercase; letter-spacing: 0.03em;">${tr('Driver & Fleet Telemetry')}</div>
            <div style="font-weight: 800; color: #0f172a; display: flex; align-items: center; gap: 6px; margin: 2px 0;">
              <span>👨‍✈️ ${window.tPerson ? window.tPerson(s.driver) : s.driver}</span>
              <span style="font-size: 0.68rem; background: #e0f2fe; color: #0369a1; padding: 1px 6px; border-radius: 4px; font-weight: 800;">${s.transporter ? s.transporter.split(' ')[0] : 'Transit'}</span>
            </div>
            <div style="color: #334155; font-size: 0.82rem; font-weight: 700;">🚛 ${window.tVehicle ? window.tVehicle(s.vehicle) : s.vehicle}</div>
            <div style="font-size: 0.78rem; display: flex; gap: 8px; align-items: center; margin-top: 3px;">
              <a href="tel:${s.driver_phone}" style="color: #0284c7; text-decoration: none; font-weight: 800;">📞 ${s.driver_phone}</a>
              ${s.temp ? `<span style="color: #059669; font-size: 0.74rem; font-weight: 800; background: #ecfdf5; padding: 1px 6px; border-radius: 4px;">🌡️ ${s.temp.split(' ')[0]}</span>` : ''}
            </div>
          </div>
          <div>
            <div style="font-size: 0.68rem; color: #64748b; font-weight: 800; text-transform: uppercase; letter-spacing: 0.03em;">${tr('Delivery Destination & ETA')}</div>
            <div style="color: #0f172a; font-weight: 800; margin: 2px 0;">🏢 ${window.tLocation ? window.tLocation(s.destination) : s.destination}</div>
            <div style="color: #0284c7; font-weight: 800; font-size: 0.82rem;">📍 ${window.tLocation ? window.tLocation(s.loc) : s.loc}</div>
            <div style="color: #d97706; font-weight: 800; font-size: 0.82rem; margin-top: 2px;">⏱️ ${window.tText ? window.tText('ETA: ' + s.eta) : 'ETA: ' + s.eta}</div>
          </div>
        </div>

        <!-- Actions & Escrow Footer -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; border-top: 1px solid #f1f5f9; padding-top: 14px;">
          <div style="font-size: 0.84rem; color: #475569;">
            ${tr('Total Value')}: <strong style="color: #0f172a; font-weight: 800;">₹ ${(s.total_val || 0).toLocaleString('en-IN')}</strong> • <span style="color: #166534; font-weight: 800; background: #f0fdf4; padding: 2px 8px; border-radius: 6px; border: 1px solid #bbf7d0;">🔒 ${tr('35% Advance')} ₹ ${(s.adv_paid !== undefined ? s.adv_paid : (s.advance_paid !== undefined ? s.advance_paid : Math.round((s.total_val || 0) * 0.35))).toLocaleString('en-IN')} ${tr('locked in escrow')}</span>
          </div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button class="btn btn-outline btn-sm" onclick="openDriverFleetModal('${s.tracking_id}')" style="display: flex; align-items: center; gap: 4px; font-weight: 700; color: #334155; border-color: #cbd5e1;">
              <span>🚚</span> ${tr('Driver & Vehicle')}
            </button>
            <button class="btn btn-outline btn-sm" onclick="openLorryReceiptModal('${s.tracking_id}')" style="font-weight: 700; border-color: #cbd5e1; color: #334155;">📄 ${tr('Lorry Receipt')}</button>
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
  if (typeof window.walkAndTranslateDOM === 'function') window.walkAndTranslateDOM(container);
}

let currentSelectedShipmentId = 'TRK-EXP-9921-MH';

function openDriverFleetModal(trackingId) {
  const modal = document.getElementById('modal-driver-fleet');
  if (!modal) return;

  const consignments = (buyerData && buyerData.consignments) ? buyerData.consignments : [];
  const s = consignments.find(c => c.tracking_id === trackingId) || consignments[0];
  if (!s) return;

  currentSelectedShipmentId = s.tracking_id;

  const lang = (window.AgriNexBuyerI18n && window.AgriNexBuyerI18n.getCurrentLanguage()) || 'hi';
  const isHi = lang === 'hi';
  const isMr = lang === 'mr';
  const tLoc = window.tLocation || (v => v);
  const tP = window.tPerson || (v => v);
  const tT = window.tText || (v => v);

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
  const speedValEl = document.getElementById('drv-modal-speed-val');

  if (trkEl) {
    const consTxt = isMr ? 'खेप' : (isHi ? 'खेप' : 'Consignment');
    const lrTxt = isMr ? 'एलआर क्र' : (isHi ? 'एलआर नं' : 'LR No');
    trkEl.textContent = `${consTxt} #${s.tracking_id} • ${lrTxt}: LR-${s.tracking_id.replace(/[^0-9]/g, '') || '9921'}`;
  }
  if (nameEl) nameEl.textContent = tP(s.driver);
  if (partnerEl) partnerEl.textContent = tT(s.transporter || 'Sahyadri Agro Logistics Lines');
  if (callBtn) {
    callBtn.href = `tel:${s.driver_phone}`;
    const callTxt = isMr ? 'कॉल' : (isHi ? 'कॉल' : 'Call');
    callBtn.innerHTML = `<span>📞</span> ${callTxt} (${s.driver_phone})`;
  }
  if (vehEl) vehEl.textContent = window.tVehicle ? window.tVehicle(s.vehicle) : s.vehicle;
  if (dlEl) dlEl.textContent = s.dl_no || 'DL-MH-15-2022-4412';
  
  const qtyKg = s.quantity_kg || (s.quantity_qt * 100);
  const unitQt = isMr ? 'क्विंटल' : (isHi ? 'क्विंटल' : 'Qt');
  const unitKg = isMr ? 'किलो' : (isHi ? 'किग्रा' : 'kg');
  const payloadTxt = isMr ? 'पेलोड' : (isHi ? 'पेलोड' : 'Payload');
  if (capEl) {
    if (s.capacity) {
      capEl.textContent = tT(s.capacity);
    } else {
      capEl.textContent = `${s.quantity_qt} ${unitQt} (${qtyKg.toLocaleString('en-IN')} ${unitKg} ${payloadTxt})`;
    }
  }

  if (fastagEl) fastagEl.textContent = tT(s.fastag || 'Active (₹ 2,800 Balance)');
  if (sealEl) sealEl.textContent = s.gate_seal || '#SEAL-89913';
  if (tempEl) tempEl.textContent = tT(s.temp || '14.5°C (Controlled)');
  if (locEl) locEl.textContent = tLoc(s.loc);
  if (etaEl) {
    const etaStr = s.eta ? `ETA: ${s.eta}` : 'ETA: Today 4:45 PM (Speed: 56 km/h)';
    etaEl.textContent = tT(etaStr);
  }
  if (gpsIdEl) gpsIdEl.textContent = s.gps_device_id || 'GPS-AIS140-97334';
  if (speedValEl) {
    const spdUnit = isMr ? 'किमी/तास' : (isHi ? 'किमी/घंटा' : 'km/h');
    speedValEl.textContent = `54 ${spdUnit}`;
  }

  modal.classList.add('active');
  if (typeof window.walkAndTranslateDOM === 'function') window.walkAndTranslateDOM(modal);
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

  const lang = (window.AgriNexBuyerI18n && window.AgriNexBuyerI18n.getCurrentLanguage()) || 'hi';
  const isHi = lang === 'hi';
  const isMr = lang === 'mr';
  const tCrop = window.tCrop || (v => v);
  const tP = window.tPerson || (v => v);

  if (s) {
    const titleEl = document.getElementById('lr-id-display');
    const subEl = document.getElementById('lr-tracking-subtitle');
    const cropEl = document.getElementById('lr-crop-title');
    const vehEl = document.getElementById('lr-vehicle-display');
    const driverEl = document.getElementById('lr-driver-display');

    if (titleEl) titleEl.textContent = s.tracking_id;
    const lrTxt = isMr ? 'एलआर क्र' : (isHi ? 'एलआर नं' : 'LR No');
    const logTxt = isMr ? 'ॲग्रीनेक्स लॉजिस्टिक्स' : (isHi ? 'एग्रीनेक्स लॉजिस्टिक्स' : 'AgriNex Logistics');
    if (subEl) subEl.textContent = `${lrTxt}: LR-${s.tracking_id.replace(/[^0-9]/g, '') || '9921'} • ${logTxt}`;
    const unitQt = isMr ? 'क्विंटल' : (isHi ? 'क्विंटल' : 'Qt');
    if (cropEl) cropEl.textContent = `${s.quantity_qt} ${unitQt} ${tCrop(s.crop)}`;
    if (vehEl) vehEl.textContent = window.tVehicle ? window.tVehicle(s.vehicle) : s.vehicle;
    if (driverEl) driverEl.textContent = `${tP(s.driver)} (${s.driver_phone})`;
  } else if (trackingId) {
    const titleEl = document.getElementById('lr-id-display');
    const subEl = document.getElementById('lr-tracking-subtitle');
    if (titleEl) titleEl.textContent = trackingId;
    const lrTxt = isMr ? 'एलआर क्र' : (isHi ? 'एलआर नं' : 'LR No');
    const logSys = isMr ? 'ॲग्रीनेक्स लॉजिस्टिक्स प्रणाली' : (isHi ? 'एग्रीनेक्स लॉजिस्टिक्स प्रणाली' : 'AgriNex Logistics System');
    if (subEl) subEl.textContent = `${lrTxt}: LR-${trackingId.slice(4)} • ${logSys}`;
  }
  modal.classList.add('active');
  if (typeof window.walkAndTranslateDOM === 'function') window.walkAndTranslateDOM(modal);
}

function closeLorryReceiptModal() {
  const modal = document.getElementById('modal-lorry-receipt');
  if (modal) modal.classList.remove('active');
}

function printLorryReceipt() {
  showToast('Generating official AgriNex Digital Lorry Receipt PDF with QR verification seal...');
  setTimeout(() => {
    closeLorryReceiptModal();
    showToast('✓ Digital Lorry Receipt (LR) downloaded successfully!');
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

  // Normalize crop string to remove duplicate bracketed annotations
  let cleanCrop = (crop || 'Tomato (Narayangaon Hybrid 50 Qt)').trim();
  cleanCrop = cleanCrop.replace(/\s*\((?:Grade A|नाशवान|नाशवंत|Perishable|Perishable Salvage)\)\s*\((?:Grade A|नाशवान|नाशवंत|Perishable|Perishable Salvage)\)/gi, ' (Grade A)');

  activeArrivalDisbursement = {
    trackingId: trackingId || 'ESC-MH-9921',
    crop: cleanCrop,
    amount: parsedAmt,
    farmer: farmer || 'Rameshwar Patil',
    totalVal: parsedTotal,
    advVal: parsedAdv,
    cardId: inferredCardId
  };
  window.activeArrivalDisbursement = activeArrivalDisbursement;

  const modal = document.getElementById('modal-confirm-arrival');
  if (!modal) return;

  const lang = (window.AgriNexBuyerI18n && window.AgriNexBuyerI18n.getCurrentLanguage()) || (typeof window.getBuyerLanguage === 'function' ? window.getBuyerLanguage() : 'hi');
  const isHi = lang === 'hi';
  const isMr = lang === 'mr';
  const tCrop = window.tCrop || (v => v);

  const trackEl = document.getElementById('arrival-tracking-id');
  const releaseEl = document.getElementById('arrival-release-val');
  const totalEl = document.getElementById('arrival-total-val');
  const advEl = document.getElementById('arrival-adv-val');

  const consTxt = isMr ? 'खेप' : (isHi ? 'खेप' : 'Consignment');
  if (trackEl) trackEl.textContent = `${consTxt} #${activeArrivalDisbursement.trackingId} • ${tCrop(activeArrivalDisbursement.crop)}`;
  if (releaseEl) releaseEl.textContent = `₹ ${activeArrivalDisbursement.amount.toLocaleString('en-IN')}`;
  if (totalEl) totalEl.textContent = `₹ ${activeArrivalDisbursement.totalVal.toLocaleString('en-IN')}`;
  if (advEl) advEl.textContent = `₹ ${activeArrivalDisbursement.advVal.toLocaleString('en-IN')}`;

  modal.classList.add('active');
  if (typeof window.walkAndTranslateDOM === 'function') window.walkAndTranslateDOM(modal);
}

function closeArrivalReleaseModal() {
  const modal = document.getElementById('modal-confirm-arrival');
  if (modal) modal.classList.remove('active');
}

function confirmReleaseEscrowAction() {
  closeArrivalReleaseModal();

  // 0. Ensure activeArrivalDisbursement fallback
  if (!activeArrivalDisbursement || !activeArrivalDisbursement.trackingId) {
    const trkText = document.getElementById('arrival-tracking-id')?.textContent || '';
    const m = trkText.match(/#([A-Z0-9-]+)/i);
    const inferredTracking = m ? m[1] : 'ESC-MH-9920';
    activeArrivalDisbursement = {
      trackingId: inferredTracking,
      amount: 117000,
      totalVal: 180000,
      advVal: 63000,
      farmer: 'Patil Rameshwar',
      crop: 'Red Onion (Nashik Garwa Grade A)',
      cardId: 'escrow-card-1'
    };
  }

  const disburseAmt = typeof activeArrivalDisbursement.amount === 'number' ? activeArrivalDisbursement.amount : (parseFloat(activeArrivalDisbursement.amount) || 117000);
  const amtStr = `₹ ${disburseAmt.toLocaleString('en-IN')}`;
  const cardId = activeArrivalDisbursement.cardId;
  const targetRef = String(activeArrivalDisbursement.trackingId || '').trim();
  const cleanRef = targetRef.replace('ESC-', '').replace('TRK-', '');
  const cleanNum = (targetRef.match(/\d+/) || [''])[0];

  // 1. Locate matching consignment in buyerData.consignments
  let cItem = null;
  let itemIndex = -1;
  if (buyerData && Array.isArray(buyerData.consignments)) {
    cItem = buyerData.consignments.find((c, cIdx) => {
      if (!c) return false;
      // Direct contract / tracking match
      if (c.contract_no && c.contract_no === targetRef) { itemIndex = cIdx; return true; }
      if (c.tracking_id && c.tracking_id === targetRef) { itemIndex = cIdx; return true; }
      // Index-based contract fallback from escrow vault
      const generatedContract = c.contract_no || `ESC-MH-${9920 + cIdx}`;
      if (generatedContract === targetRef) { itemIndex = cIdx; return true; }
      // CardId matches
      if (cardId && (cardId === `escrow-card-${c.tracking_id}` || cardId === `escrow-card-${cIdx + 1}`)) { itemIndex = cIdx; return true; }
      if (cardId && c.tracking_id && cardId.includes(c.tracking_id)) { itemIndex = cIdx; return true; }
      // Numerical segment in ID
      if (cleanNum && cleanNum.length >= 3) {
        if (c.tracking_id && c.tracking_id.includes(cleanNum)) { itemIndex = cIdx; return true; }
        if (c.contract_no && c.contract_no.includes(cleanNum)) { itemIndex = cIdx; return true; }
        if (c.gate_pass && c.gate_pass.includes(cleanNum)) { itemIndex = cIdx; return true; }
      }
      // Matching by crop & farmer
      if (c.crop && activeArrivalDisbursement.crop) {
        const cropMatch = c.crop.includes(activeArrivalDisbursement.crop) || activeArrivalDisbursement.crop.includes(c.crop) ||
          c.crop.split(' ')[0] === activeArrivalDisbursement.crop.split(' ')[0];
        const farmerMatch = !activeArrivalDisbursement.farmer || (c.farmer && (c.farmer.includes(activeArrivalDisbursement.farmer) || activeArrivalDisbursement.farmer.includes(c.farmer)));
        if (cropMatch && farmerMatch) { itemIndex = cIdx; return true; }
      }
      return false;
    });
  }

  // 2. Mark Consignment as delivered & 100% settled
  if (cItem) {
    cItem.status = 'delivered';
    cItem.status_label = 'Delivered & QC Passed';
    cItem.step = 4;
    cItem.loc = 'Delivered & 100% Escrow Settled';
    cItem.eta = 'Completed • QC Passed 100%';
    cItem.balance_due = 0;
    cItem.contract_no = cItem.contract_no || targetRef;
    cItem.settled_at = new Date().toISOString();
  }

  // Persist consignments to localStorage
  try {
    localStorage.setItem('agrinex_buyer_consignments', JSON.stringify(buyerData.consignments));
  } catch(e) {}

  // 3. Record 65% Final Settlement in payments array
  const randomUtr = `ICICR52026091800${Math.floor(100 + Math.random() * 900)}`;
  const randomTxn = `TXN-REL-${Math.floor(1000 + Math.random() * 9000)}`;
  const now = new Date();

  const finalPaymentRecord = {
    payment_id: randomTxn,
    contract_no: (cItem && cItem.contract_no) || targetRef,
    tracking_id: (cItem && cItem.tracking_id) || targetRef,
    crop: (cItem && cItem.crop) || activeArrivalDisbursement.crop,
    farmer_name: (cItem && cItem.farmer) || activeArrivalDisbursement.farmer,
    farmer_bank_acc: `Aadhaar Linked DBT A/C ••${Math.floor(1000 + Math.random() * 9000)}`,
    farmer_location: (cItem && cItem.farmer_origin) || 'Lasalgaon Yard, Nashik, MH',
    total_val: (cItem && cItem.total_val) || activeArrivalDisbursement.totalVal || 180000,
    adv_paid: (cItem && cItem.adv_paid) || activeArrivalDisbursement.advVal || 63000,
    balance_due: 0,
    disbursed_amt: disburseAmt,
    tranche_type: 'final',
    payment_rail: 'Direct DBT / IMPS Real-Time Transfer',
    gateway_txn_id: randomTxn,
    bank_utr: randomUtr,
    escrow_cert: `SETTLE-${targetRef}`,
    status: 'SETTLED_100',
    status_label: '100% Settled & Released',
    created_at: now.toISOString(),
    date_formatted: now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  };

  if (!buyerData.payments) buyerData.payments = [];
  // Update existing payment record if present, otherwise unshift
  const existingPayment = buyerData.payments.find(p => 
    p.contract_no === targetRef || 
    p.tracking_id === targetRef || 
    (cItem && (p.contract_no === cItem.contract_no || p.tracking_id === cItem.tracking_id))
  );
  if (existingPayment) {
    existingPayment.status = 'SETTLED_100';
    existingPayment.status_label = '100% Settled & Released';
    existingPayment.balance_due = 0;
    existingPayment.bank_utr = randomUtr;
    existingPayment.settled_at = now.toISOString();
  }
  buyerData.payments.unshift(finalPaymentRecord);
  try {
    localStorage.setItem('agrinex_buyer_payments', JSON.stringify(buyerData.payments));
  } catch(e) {}

  // 4. Update contract index badge & static elements if still in DOM
  const tr = (txt) => (window.tText ? window.tText(txt) : txt);
  let idx = itemIndex >= 0 ? String(itemIndex + 1) : '1';
  if (cardId === 'escrow-card-2' || targetRef.includes('4412')) idx = '2';
  else if (cardId === 'escrow-card-3' || targetRef.includes('7730')) idx = '3';

  const statusBadge = document.getElementById(`escrow-status-badge-${idx}`) || document.getElementById('escrow-status-badge');
  if (statusBadge) {
    statusBadge.className = 'badge';
    statusBadge.style.background = '#15803d';
    statusBadge.style.color = '#ffffff';
    statusBadge.textContent = '✓ ' + tr('100% Settled & Released');
  }

  const dotSettled = document.getElementById(`stepper-dot-settled-${idx}`) || document.getElementById('stepper-dot-settled');
  if (dotSettled) {
    dotSettled.className = 'stepper-dot active';
    dotSettled.textContent = '✓';
    dotSettled.style.background = '#15803d';
    dotSettled.style.borderColor = '#15803d';
    dotSettled.style.color = '#ffffff';
  }

  const btnVault = document.getElementById(`btn-escrow-vault-release-${idx}`) || document.getElementById('btn-escrow-vault-release');
  if (btnVault) {
    btnVault.disabled = true;
    btnVault.textContent = '✓ ' + tr('100% Escrow Settled');
    btnVault.style.background = '#15803d';
    btnVault.style.borderColor = '#15803d';
    btnVault.style.color = '#ffffff';
    btnVault.style.cursor = 'default';
  }

  // 5. Re-render all buyer UI screens immediately
  if (typeof renderBuyerEscrowVault === 'function') {
    try { renderBuyerEscrowVault(); } catch(e) { console.warn('renderBuyerEscrowVault err', e); }
  }
  if (typeof renderBuyerConsignments === 'function') {
    try { renderBuyerConsignments(); } catch(e) { console.warn('renderBuyerConsignments err', e); }
  }
  if (typeof renderLiteOrdersCards === 'function') {
    try { renderLiteOrdersCards(); } catch(e) {}
  }
  if (typeof renderLiteEscrowCards === 'function') {
    try { renderLiteEscrowCards(); } catch(e) {}
  }
  if (typeof updateBuyerMarketStats === 'function') {
    try { updateBuyerMarketStats(); } catch(e) {}
  }

  // 6. Broadcast storage event across windows/tabs
  try {
    window.dispatchEvent(new Event('storage'));
  } catch(e) {}

  // 7. Persist escrow release to backend API
  if (window.apiClient) {
    const releaseContractId = (cItem && cItem.contract_no) || targetRef;
    window.apiClient.releaseEscrow(releaseContractId).catch(err => {
      console.warn('[AgriNex] Escrow release offline fallback', err);
    });
  }

  showToast(`🎉 Quality verified! ${amtStr} released to ${activeArrivalDisbursement.farmer || 'Farmer'}. Contract 100% Settled!`, 'success');
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

  const curLang = (typeof currentLang !== 'undefined' ? currentLang : 'en');

  if (trackNumEl) trackNumEl.textContent = trackingId || (s ? s.tracking_id : 'TRK-EXP-9921-MH');
  if (vehEl) {
    const rawVeh = vehicle || (s ? s.vehicle : 'Tata 407 LPT (MH 15 AG 8842)');
    vehEl.textContent = typeof tText === 'function' ? tText(rawVeh) : rawVeh;
  }
  if (driverEl) {
    const rawDrv = driver || (s ? s.driver : 'Sanjay Shinde');
    driverEl.textContent = typeof tText === 'function' ? tText(rawDrv) : rawDrv;
  }
  if (corridorEl) {
    const rawLoc = corridor || (s ? s.loc : 'Nashik-Mumbai Samruddhi Expressway');
    corridorEl.textContent = typeof tLocation === 'function' ? tLocation(rawLoc) : (typeof tText === 'function' ? tText(rawLoc) : rawLoc);
  }

  const distEl = document.getElementById('gps-distance-val');
  if (distEl) {
    const rawDist = (s && s.distance_remaining) || '142 km';
    distEl.textContent = typeof tText === 'function' ? tText(rawDist) : (curLang !== 'en' ? rawDist.replace(/\s*km/i, ' किमी') : rawDist);
  }

  const etaEl = document.getElementById('gps-eta-val');
  if (etaEl) {
    const rawEta = (s && s.eta) || 'Tomorrow 9:15 AM';
    etaEl.textContent = typeof tText === 'function' ? tText(rawEta) : rawEta;
  }

  if (window.renderGpsRouteVisualizer) {
    window.renderGpsRouteVisualizer(trackingId || (s ? s.tracking_id : 'TRK-EXP-9921-MH'));
  }

  if (typeof walkAndTranslateDOM === 'function') {
    walkAndTranslateDOM(modal);
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

function submitBookTransport(e) {
  if (e) e.preventDefault();

  const lotSelect = document.getElementById('transport-lot-select');
  const originInput = document.getElementById('transport-origin');
  const destSelect = document.getElementById('transport-destination');
  const vehicleChecked = document.querySelector('input[name="vehicle-type"]:checked');
  const partnerSelect = document.getElementById('transport-partner');
  const totalFeeEl = document.getElementById('transport-total-fee');

  const lotRaw = lotSelect ? lotSelect.value : '';
  const lotParts = lotRaw.split('|');
  const lotId = lotParts[0] || 'LOT-ONI-01';
  const cropName = lotParts[1] || 'Fresh Produce';
  const qtyStr = lotParts[2] || '50 Qt';
  const origin = originInput ? originInput.value : (lotParts[3] || 'Farm-Gate Pickup');
  const farmerName = lotParts[4] || 'Patil Rameshwar';
  const lotVal = parseFloat(lotParts[5]) || 50000;

  const destParts = (destSelect && destSelect.value) ? destSelect.value.split('|') : ['Vashi APMC Central Terminal, Navi Mumbai', '220 km'];
  const destination = destParts[0];

  const vehicleParts = vehicleChecked ? vehicleChecked.value.split('|') : ['Bolero Maxi Truck (MH 15 DK 8810)', '5800'];
  const vehicleName = vehicleParts[0];
  const vehicleNoMatch = vehicleName.match(/\(([^)]+)\)/);
  const vehicleNo = vehicleNoMatch ? vehicleNoMatch[1] : 'MH 15 DK 8810';

  const partnerParts = (partnerSelect && partnerSelect.value) ? partnerSelect.value.split('|') : ['Sahyadri Agro Logistics', 'Sanjay Patil', '+91 98220-44911', 'MH 15 DK 8810'];
  const transporterName = partnerParts[0];
  const driverName = partnerParts[1] || 'Sanjay Patil';
  const driverPhone = partnerParts[2] || '+91 98220-44911';

  const totalFreight = totalFeeEl ? parseInt(totalFeeEl.textContent.replace(/[^0-9]/g, '')) || 6150 : 6150;

  const newConsignment = {
    id: `TRK-${Date.now().toString().slice(-4)}-FLEET`,
    contract_id: `ESC-MH-${Math.floor(1000 + Math.random() * 9000)}`,
    lot_id: lotId,
    crop: cropName,
    farmer_name: farmerName,
    farmer_location: origin,
    driver_name: `${driverName} (${transporterName.split('(')[0].trim()})`,
    driver_phone: driverPhone,
    vehicle_no: vehicleNo,
    origin: origin,
    destination: destination,
    quantity_qt: parseFloat(qtyStr) || 50,
    quantity_kg: (parseFloat(qtyStr) || 50) * 100,
    rate_kg: Math.round((lotVal / ((parseFloat(qtyStr) || 50) * 100)) * 10) / 10 || 12,
    total_val: lotVal,
    adv_paid: Math.round(lotVal * 0.35),
    advance_paid: Math.round(lotVal * 0.35),
    balance_due: lotVal - Math.round(lotVal * 0.35),
    freight_fee: totalFreight,
    status: 'transit',
    status_label: 'Vehicle Dispatched',
    eta: 'Today, 8:30 PM',
    progress: 15,
    assay_grade: 'Grade A',
    temp_celsius: 16.2
  };

  if (!buyerData.consignments) buyerData.consignments = [];
  buyerData.consignments.unshift(newConsignment);

  try {
    localStorage.setItem('agrinex_buyer_consignments', JSON.stringify(buyerData.consignments));
  } catch(err) {}

  closeBookTransportModal();
  if (typeof updateBuyerMarketStats === 'function') updateBuyerMarketStats();
  if (typeof renderBuyerConsignments === 'function') renderBuyerConsignments();
  if (typeof showToast === 'function') {
    showToast(`🚚 Fleet booked! ${vehicleName.split('(')[0]} dispatched by ${transporterName.split('(')[0]}. Tracking ID: ${newConsignment.id}`, 'success');
  }

  if (typeof switchView === 'function') {
    switchView('view-orders-logistics');
  }
}

// Global delegated listener for transport booking form
document.addEventListener('submit', (e) => {
  if (e.target && e.target.id === 'form-book-transport') {
    submitBookTransport(e);
  }
});

// Logistics Window Bindings
window.handleBuyerShipmentSearch = handleBuyerShipmentSearch;
window.filterBuyerShipmentsTab = filterBuyerShipmentsTab;
window.renderBuyerConsignments = renderBuyerConsignments;
window.openDriverFleetModal = openDriverFleetModal;
window.closeDriverFleetModal = closeDriverFleetModal;
window.openGpsFromDriverModal = openGpsFromDriverModal;
window.openLorryReceiptModal = openLorryReceiptModal;
window.closeLorryReceiptModal = closeLorryReceiptModal;
window.printLorryReceipt = printLorryReceipt;
window.openArrivalReleaseModal = openArrivalReleaseModal;
window.closeArrivalReleaseModal = closeArrivalReleaseModal;
window.confirmReleaseEscrowAction = confirmReleaseEscrowAction;
window.openGatePassModal = openGatePassModal;
window.closeGatePassModal = closeGatePassModal;
window.openGpsModal = openGpsModal;
window.closeGpsModal = closeGpsModal;
window.openBookTransportModal = openBookTransportModal;
window.closeBookTransportModal = closeBookTransportModal;
window.updateTransportLotMeta = updateTransportLotMeta;
window.calculateTransportEstimate = calculateTransportEstimate;
window.submitBookTransport = submitBookTransport;
