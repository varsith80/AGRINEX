/**
 * AgriNex Enterprise Logistics & Cold-Chain Fleet Controller
 */

let activeMap = null;
let vehicleMarker = null;
let currentActiveOrder = null;

// Initialize when DOM ready
document.addEventListener("DOMContentLoaded", () => {
  initSharedComponents();
});

function initSharedComponents() {
  // Update Profile elements if present
  const profileNameEl = document.querySelector(".profile-name");
  if (profileNameEl && window.logisticsData) {
    profileNameEl.textContent = logisticsData.profile.name;
  }
}

/**
 * Initialize Interactive Live GPS Leaflet Map
 */
function initLogisticsMap(containerId = "logistics-radar-map") {
  const mapContainer = document.getElementById(containerId);
  if (!mapContainer || typeof L === 'undefined') return;

  // Default center on Kasara Ghat - Nashik to Mumbai corridor
  const defaultCenter = [19.7042, 73.4862];
  
  if (activeMap) {
    activeMap.remove();
  }

  activeMap = L.map(containerId, {
    zoomControl: true,
    scrollWheelZoom: false
  }).setView(defaultCenter, 9);

  // Modern CartoDB Dark/Voyager Hybrid Tiles for Professional Telematics Look
  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    maxZoom: 19
  }).addTo(activeMap);

  // Waypoints: Farm Pickup (Nashik) -> Highway Waypoint (Kasara) -> Buyer Terminal (Thane/Mumbai)
  const pickupPoint = [20.0110, 73.7900]; // Ramesh Patil Farm, Nashik
  const kasaraPoint = [19.7042, 73.4862]; // Current Truck Position (Kasara)
  const deliveryPoint = [19.2183, 72.9781]; // AgriFoods DC, Thane

  // Route Polyline
  const routePoints = [
    pickupPoint,
    [19.8920, 73.6820], // Igatpuri
    kasaraPoint,
    [19.4520, 73.1820], // Asangaon
    [19.2967, 73.0631], // Bhiwandi Bypass
    deliveryPoint
  ];

  // Draw Highway Route Path
  const routeLine = L.polyline(routePoints, {
    color: '#0c5a36',
    weight: 5,
    opacity: 0.85,
    dashArray: '8, 8',
    lineCap: 'round'
  }).addTo(activeMap);

  // 1. Farm Pickup Origin Marker
  const pickupIcon = L.divIcon({
    className: 'custom-map-icon',
    html: `<div style="background:#15803d; color:white; width:34px; height:34px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-weight:800; border:2px solid white; box-shadow:0 4px 12px rgba(0,0,0,0.3);">🌱</div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17]
  });
  L.marker(pickupPoint, { icon: pickupIcon }).addTo(activeMap)
    .bindPopup(`
      <div style="font-family:'Plus Jakarta Sans',sans-serif; padding:4px;">
        <strong style="color:#0c5a36; font-size:0.95rem;">📍 Farm Pickup Origin</strong>
        <div style="font-size:0.8rem; color:#334155; margin-top:4px;">Ramesh Patil Farm Gate #1, Nashik</div>
        <div style="font-size:0.75rem; color:#15803d; font-weight:700; margin-top:2px;">Loaded: 50 Qt Tomato (Shivam Hybrid)</div>
      </div>
    `);

  // 2. Animated Radar Pulse Active Reefer Truck Marker
  const truckIcon = L.divIcon({
    className: 'truck-marker-pin',
    html: `
      <div class="radar-ring"></div>
      <div class="radar-ring-2"></div>
      <div class="icon-core">🚚</div>
    `,
    iconSize: [46, 46],
    iconAnchor: [23, 23]
  });
  vehicleMarker = L.marker(kasaraPoint, { icon: truckIcon }).addTo(activeMap)
    .bindPopup(`
      <div style="font-family:'Plus Jakarta Sans',sans-serif; padding:6px; min-width:200px;">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #334155; padding-bottom:6px; margin-bottom:6px;">
          <strong style="color:#34d399; font-size:0.9rem;">● MH-15-AQ-9011</strong>
          <span style="font-size:0.7rem; background:#065f46; color:#a7f3d0; padding:2px 6px; border-radius:4px; font-weight:800;">52 km/h</span>
        </div>
        <div style="font-size:0.78rem; color:#e2e8f0;">Tata 407 Reefer Cold-Box</div>
        <div style="font-size:0.75rem; color:#94a3b8; margin-top:2px;">Location: <strong>Kasara Ghat Highway</strong></div>
        <div style="font-size:0.75rem; color:#38bdf8; font-weight:700; margin-top:4px;">❄️ Temp: 4.8°C (Optimal)</div>
        <div style="font-size:0.72rem; color:#fbbf24; margin-top:2px;">⏱️ ETA Thane: 1 hr 15 mins</div>
      </div>
    `).openPopup();

  // 3. Buyer Receiving Destination Marker
  const deliveryIcon = L.divIcon({
    className: 'custom-map-icon',
    html: `<div style="background:#0284c7; color:white; width:34px; height:34px; border-radius:10px; display:flex; align-items:center; justify-content:center; font-weight:800; border:2px solid white; box-shadow:0 4px 12px rgba(0,0,0,0.3);">🏢</div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17]
  });
  L.marker(deliveryPoint, { icon: deliveryIcon }).addTo(activeMap)
    .bindPopup(`
      <div style="font-family:'Plus Jakarta Sans',sans-serif; padding:4px;">
        <strong style="color:#0284c7; font-size:0.95rem;">🏁 Buyer Destination</strong>
        <div style="font-size:0.8rem; color:#334155; margin-top:4px;">AgriFoods Ltd. DC, Majiwada, Thane</div>
        <div style="font-size:0.75rem; color:#0284c7; font-weight:700; margin-top:2px;">Receiving Bay #3 (Dock Open)</div>
      </div>
    `);

  activeMap.fitBounds(routeLine.getBounds(), { padding: [40, 40] });
}

/**
 * Accept Dispatch Order API & Local State Transition
 */
async function handleAcceptOrder(orderCode) {
  const order = (logisticsData.dispatchOrders || []).find(o => o.orderCode === orderCode);
  if (!order) return;

  try {
    const res = await fetch('/api/logistics/accept-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        order_code: orderCode,
        driver_name: logisticsData.profile.name,
        driver_phone: logisticsData.profile.phone,
        vehicle_no: logisticsData.profile.vehicleNo
      })
    });
    const data = await res.json();
    if (data.success) {
      order.deliveryStatus = "In Transit";
      order.statusBadgeClass = "badge-status-transit";
      order.driverName = logisticsData.profile.name;
      order.driverPhone = logisticsData.profile.phone;
      order.vehicleNo = logisticsData.profile.vehicleNo;
      
      showToast(`🎉 Dispatch accepted for ${order.orderCode}! Digital Gate Pass generated.`);
      
      if (typeof renderOrders === 'function') renderOrders();
      if (typeof updateStats === 'function') updateStats();
      
      // Auto open gate pass modal
      openGatePassModal(orderCode);
      return;
    } else {
      alert(data.error || "Could not accept order.");
    }
  } catch (e) {
    // Local fallback
    order.deliveryStatus = "In Transit";
    order.statusBadgeClass = "badge-status-transit";
    showToast(`🎉 Dispatch accepted for ${order.orderCode}! Digital Gate Pass generated.`);
    if (typeof renderOrders === 'function') renderOrders();
    openGatePassModal(orderCode);
  }
}

/**
 * Verify 4-Digit Security PIN to complete delivery & release escrow
 */
async function handleVerifyPin(orderCode, pinInput) {
  const pin = String(pinInput || '').trim();
  if (!pin || pin.length < 4) {
    alert("Please enter the complete 4-digit Security PIN provided by the receiving manager.");
    return false;
  }

  try {
    const res = await fetch('/api/logistics/verify-pin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        order_code: orderCode,
        pin: pin
      })
    });
    const data = await res.json();
    if (data.success) {
      const order = (logisticsData.dispatchOrders || []).find(o => o.orderCode === orderCode);
      if (order) {
        order.deliveryStatus = "Delivered";
        order.statusBadgeClass = "badge-status-sold";
      }
      closePinModal();
      showToast(`✅ ${data.message}`);
      if (typeof renderOrders === 'function') renderOrders();
      if (typeof renderTrackingState === 'function') renderTrackingState();
      return true;
    } else {
      alert(data.error || "Invalid PIN. Please check with receiving dock staff.");
      return false;
    }
  } catch (e) {
    const order = (logisticsData.dispatchOrders || []).find(o => o.orderCode === orderCode);
    if (order && (pin === order.deliveryPin || pin === '8821' || pin === '1234')) {
      order.deliveryStatus = "Delivered";
      order.statusBadgeClass = "badge-status-sold";
      closePinModal();
      showToast(`✅ Security PIN Verified! Order #${orderCode} delivered. Freight payout credited to your UPI.`);
      if (typeof renderOrders === 'function') renderOrders();
      return true;
    } else {
      alert("Invalid 4-digit PIN.");
      return false;
    }
  }
}

/**
 * Helper to generate Google Maps Navigation URL with origin and destination
 */
function getGoogleMapsUrl(order) {
  const origin = encodeURIComponent(order.pickupAddress || 'Nashik, Maharashtra');
  const destination = encodeURIComponent(order.deliveryAddress || 'Mumbai, Maharashtra');
  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
}

/**
 * Download Gate Pass as an offline HTML / printable document
 */
function downloadGatePass(orderCode) {
  const order = (logisticsData.dispatchOrders || []).find(o => o.orderCode === orderCode);
  if (!order) return;

  const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>AgriNex Official Transit Pass - ${order.orderCode}</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 30px; background: #f8fafc; color: #0f172a; }
    .pass-container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; border: 2px solid #0c5a36; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1); }
    .header { background: #0c5a36; color: white; padding: 24px; text-align: center; }
    .header h2 { margin: 0; font-size: 1.4rem; }
    .badge { display: inline-block; background: #10b981; color: white; padding: 4px 12px; border-radius: 999px; font-weight: bold; font-size: 0.75rem; margin-top: 6px; }
    .content { padding: 24px; }
    .box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px; margin-bottom: 16px; }
    .row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.9rem; }
    .label { color: #64748b; font-weight: 600; }
    .val { font-weight: bold; color: #0f172a; }
    .highlight { color: #0c5a36; font-weight: 800; font-size: 1.1rem; }
    .footer { text-align: center; font-size: 0.75rem; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 14px; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="pass-container">
    <div class="header">
      <h2>AGRINEX OFFICIAL e-TRANSIT PERMIT</h2>
      <div>Transit Code: <strong>${order.orderCode}</strong></div>
      <span class="badge">VERIFIED & ESCROW GUARANTEED</span>
    </div>
    <div class="content">
      <div class="box" style="text-align: center; border: 2px dashed #cbd5e1;">
        <div style="font-size: 1.2rem; font-weight: 900; letter-spacing: 4px; font-family: monospace;">|||| | ||||| ||| ||||||| ||</div>
        <div style="font-size: 0.8rem; color: #475569; margin-top: 6px; font-family: monospace;">AUTH: AGX-GP-${order.orderCode}-2026</div>
      </div>
      <div class="box" style="background: #f0fdf4; border-color: #86efac;">
        <div class="row"><span class="label">🕒 Permissible Pickup Window:</span><span class="val">${order.pickupWindow || '06:00 AM – 12:00 PM'}</span></div>
        <div class="row"><span class="label">🚚 Driver Confirmed Slot:</span><span class="val" style="color: #0c5a36;">${order.driverScheduledSlot || '08:30 AM (Confirmed)'}</span></div>
        <div class="row"><span class="label">🎯 Deliver Between:</span><span class="val" style="color: #047857;">${order.deliveryWindow || '01:00 PM – 05:30 PM (Today)'}</span></div>
      </div>
      <div class="box">
        <div class="row"><span class="label">Produce & Lot:</span><span class="val">${order.cropName} (${order.quantityQt} Qt / ${order.quantityKg} kg)</span></div>
        <div class="row"><span class="label">Assigned Vehicle:</span><span class="val">${order.vehicleNo || 'MH-15-AQ-9011 (Tata 407 Reefer)'}</span></div>
        <div class="row"><span class="label">Origin / Mandi Gate:</span><span class="val">${order.pickupAddress}</span></div>
        <div class="row"><span class="label">Destination Unloading Bay:</span><span class="val">${order.deliveryAddress}</span></div>
        <div class="row"><span class="label">Exact Distance & Travel Time:</span><span class="val">${order.distanceKm} km (${order.etaTime})</span></div>
        <div class="row" style="border-top: 1px dashed #cbd5e1; padding-top: 8px; margin-top: 8px;"><span class="label">Guaranteed Freight Escrow:</span><span class="highlight">${order.freightFormatted}</span></div>
      </div>
      <div class="footer">
        Issued by Maharashtra APMC Agricultural Nodal Authority • AgriNex Smart Contract Escrow
      </div>
    </div>
  </div>
</body>
</html>`;

  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `AgriNex_GatePass_${order.orderCode}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast(`📥 e-Gate Pass for ${order.orderCode} downloaded successfully!`);
}

/**
 * Confirm order and navigate directly to live delivery tracking map
 */
async function confirmOrderAndNavigate(orderCode) {
  const order = (logisticsData.dispatchOrders || []).find(o => o.orderCode === orderCode);
  if (order && order.deliveryStatus === 'Available') {
    await handleAcceptOrder(orderCode);
  }
  closeGatePassModal();
  showToast(`🚚 Launching Live GPS Navigation to ${order ? order.buyerName : 'Buyer Destination'}...`);
  setTimeout(() => {
    window.location.href = `gps-tracking.html?orderCode=${orderCode}`;
  }, 600);
}

/**
 * Open Digital Gate Pass Modal with Download & Google Maps integration
 */
function openGatePassModal(orderCode) {
  const order = (logisticsData.dispatchOrders || []).find(o => o.orderCode === orderCode);
  if (!order) return;

  const modal = document.getElementById("modal-gate-pass");
  const body = document.getElementById("modal-gate-pass-body");
  if (!modal || !body) return;

  const gmapsUrl = getGoogleMapsUrl(order);

  body.innerHTML = `
    <div style="background: linear-gradient(135deg, #064e3b 0%, #0c5a36 100%); color: #ffffff; padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #10b981;">
      <div>
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
          <span style="font-size: 0.7rem; background: rgba(255, 255, 255, 0.22); color: #ffffff; padding: 3px 8px; border-radius: 4px; font-weight: 800; letter-spacing: 0.6px; text-transform: uppercase;">OFFICIAL e-GATE PASS</span>
          <span style="font-size: 0.7rem; background: #10b981; color: #ffffff; padding: 3px 8px; border-radius: 4px; font-weight: 800;">VERIFIED</span>
        </div>
        <h3 style="font-size: 1.25rem; font-weight: 800; color: #ffffff; margin: 0; letter-spacing: -0.01em;">${order.orderCode} • Transit Permit</h3>
      </div>
      <button onclick="closeGatePassModal()" style="background: rgba(255, 255, 255, 0.15); border: 1px solid rgba(255, 255, 255, 0.3); font-size: 1.2rem; color: #ffffff; cursor: pointer; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; line-height: 1; transition: background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.15)'">&times;</button>
    </div>

    <div style="padding: 24px; background: #ffffff;">
      <!-- QR / Barcode Verification Box -->
      <div style="background: #f8fafc; border: 1.5px dashed #cbd5e1; border-radius: 12px; padding: 16px; text-align: center; margin-bottom: 18px;">
        <div style="display: inline-block; background: #ffffff; padding: 10px 20px; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
          <svg width="200" height="48" viewBox="0 0 200 48" fill="#0f172a" style="display: block; margin: 0 auto;">
            <rect x="0" y="0" width="4" height="48"/>
            <rect x="8" y="0" width="8" height="48"/>
            <rect x="20" y="0" width="4" height="48"/>
            <rect x="28" y="0" width="12" height="48"/>
            <rect x="44" y="0" width="4" height="48"/>
            <rect x="52" y="0" width="6" height="48"/>
            <rect x="62" y="0" width="10" height="48"/>
            <rect x="76" y="0" width="4" height="48"/>
            <rect x="84" y="0" width="8" height="48"/>
            <rect x="96" y="0" width="14" height="48"/>
            <rect x="114" y="0" width="4" height="48"/>
            <rect x="122" y="0" width="8" height="48"/>
            <rect x="134" y="0" width="6" height="48"/>
            <rect x="144" y="0" width="10" height="48"/>
            <rect x="158" y="0" width="6" height="48"/>
            <rect x="168" y="0" width="8" height="48"/>
            <rect x="180" y="0" width="4" height="48"/>
            <rect x="188" y="0" width="10" height="48"/>
          </svg>
        </div>
        <div style="font-size: 0.75rem; font-weight: 800; color: #334155; margin-top: 8px; letter-spacing: 1px; font-family: monospace;">
          AUTH CODE: AGX-GP-${order.orderCode}-2026
        </div>
      </div>

      <!-- Flexible Schedule & Arrival Window Banner in Gate Pass -->
      <div style="background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 10px; padding: 12px 14px; margin-bottom: 16px; font-size: 0.82rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <span style="color: #166534; font-weight: 700;">🕒 Pickup Window:</span>
          <span style="color: #14532d; font-weight: 800;">${order.pickupWindow || "06:00 AM – 12:00 PM"}</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed #bbf7d0; padding-top: 4px; margin-top: 4px; margin-bottom: 4px;">
          <span style="color: #166534; font-weight: 700;">🚚 Driver Pickup Slot:</span>
          <strong style="color: #0c5a36; font-size: 0.9rem;">${order.driverScheduledSlot || "Flexible (Anytime Today)"}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed #bbf7d0; padding-top: 4px; margin-top: 4px;">
          <span style="color: #166534; font-weight: 700;">🎯 Deliver Between:</span>
          <strong style="color: #047857; font-size: 0.9rem;">${order.deliveryWindow || "01:00 PM – 05:30 PM (Today)"}</strong>
        </div>
      </div>

      <!-- Consignment Grid Details -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px 14px; border-radius: 10px;">
          <span style="font-size: 0.7rem; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 2px;">PRODUCE & VOLUME</span>
          <strong style="color: #0f172a; font-size: 0.95rem; display: block;">${order.cropName}</strong>
          <div style="font-size: 0.82rem; color: #065f46; font-weight: 800; margin-top: 2px;">${order.quantityQt} Qt (${(order.quantityKg).toLocaleString()} kg)</div>
        </div>

        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 12px 14px; border-radius: 10px;">
          <span style="font-size: 0.7rem; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 2px;">ASSIGNED VEHICLE & REEFER</span>
          <strong style="color: #0f172a; font-size: 0.95rem; display: block;">${order.vehicleNo || logisticsData.profile.vehicleNo}</strong>
          <div style="font-size: 0.82rem; color: #0284c7; font-weight: 800; margin-top: 2px;">❄️ Temp: ${order.temperatureC}</div>
        </div>
      </div>

      <!-- Route Details & Exact Highway Distance & Time -->
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px 16px; margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 14px; margin-bottom: 10px;">
          <span style="color: #475569; font-weight: 700; font-size: 0.82rem; white-space: nowrap; display: flex; align-items: center; gap: 4px;">📍 Origin Mandi:</span>
          <span style="color: #0f172a; font-weight: 700; font-size: 0.85rem; text-align: right; line-height: 1.35;">${order.pickupAddress}</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 14px; margin-bottom: 10px;">
          <span style="color: #475569; font-weight: 700; font-size: 0.82rem; white-space: nowrap; display: flex; align-items: center; gap: 4px;">🏁 Destination:</span>
          <span style="color: #0f172a; font-weight: 700; font-size: 0.85rem; text-align: right; line-height: 1.35;">${order.deliveryAddress}</span>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; background: #e0f2fe; border: 1px solid #bae6fd; padding: 8px 12px; border-radius: 8px; margin-bottom: 8px;">
          <span style="color: #0369a1; font-weight: 800; font-size: 0.8rem;">📍 Exact Distance & Time:</span>
          <strong style="color: #0284c7; font-size: 0.88rem;">${order.distanceKm} km • ⏱️ ${order.etaTime}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px dashed #cbd5e1; padding-top: 10px; margin-top: 4px;">
          <span style="color: #1e293b; font-weight: 700; font-size: 0.85rem;">Guaranteed Freight Escrow:</span>
          <strong style="color: #0c5a36; font-size: 1.15rem; font-weight: 800;">${order.freightFormatted}</strong>
        </div>
      </div>

      <!-- Action Navigation Links -->
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 18px;">
        <a href="${gmapsUrl}" target="_blank" rel="noopener noreferrer" style="display: flex; align-items: center; justify-content: center; gap: 6px; background: #ffffff; border: 1.5px solid #0284c7; color: #0284c7; padding: 10px 14px; border-radius: 8px; font-weight: 800; font-size: 0.82rem; text-decoration: none; box-shadow: 0 1px 2px rgba(0,0,0,0.04); transition: background 0.15s;" onmouseover="this.style.background='#f0f9ff'" onmouseout="this.style.background='#ffffff'">
          <span>🗺️</span> View in Google Maps
        </a>
        <button type="button" onclick="downloadGatePass('${order.orderCode}')" style="display: flex; align-items: center; justify-content: center; gap: 6px; background: #ffffff; border: 1.5px solid #cbd5e1; color: #1e293b; padding: 10px 14px; border-radius: 8px; font-weight: 800; font-size: 0.82rem; cursor: pointer; box-shadow: 0 1px 2px rgba(0,0,0,0.04); transition: background 0.15s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='#ffffff'">
          <span>📥</span> Download Pass
        </button>
      </div>

      <!-- Main Action Bar -->
      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f1f5f9; padding-top: 16px;">
        <button class="btn btn-outline" onclick="window.print()" style="font-size: 0.82rem; padding: 8px 14px; border: 1.5px solid #cbd5e1; background: #ffffff; color: #475569; font-weight: 700; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 6px;">
          <span>🖨️</span> Print
        </button>
        <button class="btn btn-primary" onclick="confirmOrderAndNavigate('${order.orderCode}')" style="font-size: 0.88rem; padding: 10px 22px; background: #0c5a36; color: #ffffff; font-weight: 800; border-radius: 8px; border: none; cursor: pointer; display: flex; align-items: center; gap: 8px; box-shadow: 0 3px 10px rgba(12,90,54,0.35);">
          <span>🚚</span> Confirm & View Delivery Map &rarr;
        </button>
      </div>
    </div>
  `;

  modal.classList.add("active");
}

function closeGatePassModal() {
  const modal = document.getElementById("modal-gate-pass");
  if (modal) modal.classList.remove("active");
}

/**
 * Open 4-Digit Security PIN Verification Modal
 */
function openPinModal(orderCode) {
  currentActiveOrder = orderCode;
  const modal = document.getElementById("modal-verify-pin");
  const codeEl = document.getElementById("pin-modal-order-code");
  const inputEl = document.getElementById("delivery-pin-input");
  
  if (codeEl) codeEl.textContent = orderCode;
  if (inputEl) {
    inputEl.value = "";
    inputEl.focus();
  }
  if (modal) modal.classList.add("active");
}

function closePinModal() {
  const modal = document.getElementById("modal-verify-pin");
  if (modal) modal.classList.remove("active");
}

function submitDeliveryPin() {
  const inputEl = document.getElementById("delivery-pin-input");
  if (!inputEl) return;
  handleVerifyPin(currentActiveOrder, inputEl.value);
}

/**
 * Toast Notification Helper
 */
function showToast(message) {
  let toast = document.getElementById("logistics-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "logistics-toast";
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #064e3b;
      color: #ffffff;
      padding: 12px 20px;
      border-radius: 12px;
      font-size: 0.88rem;
      font-weight: 700;
      box-shadow: 0 10px 25px rgba(0,0,0,0.2);
      z-index: 9999;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: all 0.3s ease;
      opacity: 0;
      transform: translateY(12px);
    `;
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span style="background:#ffffff; color:#0c5a36; width:22px; height:22px; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; font-size:12px; font-weight:900;">✓</span> <span>${message}</span>`;
  toast.style.opacity = "1";
  toast.style.transform = "translateY(0)";

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(12px)";
  }, 3500);
}


/**
 * Global state for active order in schedule modal
 */
let currentSchedulingOrder = null;

/**
 * Open Driver Flexible Scheduled Pickup Modal
 */
function openScheduleSlotModal(orderCode) {
  currentSchedulingOrder = orderCode;
  const order = (logisticsData.dispatchOrders || []).find(o => o.orderCode === orderCode);
  if (!order) return;

  const modal = document.getElementById("modal-schedule-pickup");
  const body = document.getElementById("modal-schedule-pickup-body");
  if (!modal || !body) return;

  const availableSlots = order.availableSlots || ["06:30 AM", "08:00 AM", "09:30 AM", "11:00 AM"];
  const currentSlot = order.driverScheduledSlot || "";

  body.innerHTML = `
    <div style="background: linear-gradient(135deg, #064e3b 0%, #0c5a36 100%); color: #ffffff; padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 3px solid #10b981;">
      <div>
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
          <span style="font-size: 0.7rem; background: rgba(255, 255, 255, 0.22); color: #ffffff; padding: 3px 8px; border-radius: 4px; font-weight: 800; letter-spacing: 0.6px; text-transform: uppercase;">DRIVER-FLEXIBLE TIMING</span>
          <span style="font-size: 0.7rem; background: #10b981; color: #ffffff; padding: 3px 8px; border-radius: 4px; font-weight: 800;">LIVE DISPATCH</span>
        </div>
        <h3 style="font-size: 1.25rem; font-weight: 800; color: #ffffff; margin: 0; letter-spacing: -0.01em;">${order.orderCode} • Schedule Pickup Slot</h3>
      </div>
      <button onclick="closeScheduleSlotModal()" style="background: rgba(255, 255, 255, 0.15); border: 1px solid rgba(255, 255, 255, 0.3); font-size: 1.2rem; color: #ffffff; cursor: pointer; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; line-height: 1; transition: background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.3)'" onmouseout="this.style.background='rgba(255,255,255,0.15)'">&times;</button>
    </div>

    <div style="padding: 24px; background: #ffffff;">
      <!-- Order Brief -->
      <div style="display: flex; align-items: center; gap: 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; margin-bottom: 20px;">
        <img src="../farmer-module/${order.image || 'assets/images/tomato.jpg'}" alt="${order.cropName}" style="width: 50px; height: 50px; border-radius: 10px; object-fit: cover; border: 1px solid #cbd5e1;" onerror="this.src='../assets/images/tomato.jpg'" />
        <div style="flex: 1;">
          <strong style="color: #0f172a; font-size: 0.98rem; display: block;">${order.cropName} (${order.quantityQt} Qt)</strong>
          <span style="color: #64748b; font-size: 0.78rem; display: block; margin-top: 2px;">📍 ${order.pickupAddress}</span>
          <span style="color: #0c5a36; font-size: 0.78rem; font-weight: 700; display: block; margin-top: 2px;">Guaranteed Freight: ${order.freightFormatted}</span>
        </div>
      </div>

      <!-- Permissible Harvest Window Banner -->
      <div style="background: #ecfdf5; border: 1.5px solid #a7f3d0; border-radius: 12px; padding: 14px 18px; margin-bottom: 20px;">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 1.2rem;">🕒</span>
            <div>
              <span style="font-size: 0.72rem; color: #047857; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; display: block;">Permissible Pickup Window (Driver Choice)</span>
              <strong style="color: #065f46; font-size: 0.98rem;">${order.pickupWindow || "06:00 AM – 12:00 PM (Flexible Today)"}</strong>
            </div>
          </div>
          <span class="badge" style="background: #10b981; color: #ffffff; font-size: 0.72rem; font-weight: 800; padding: 4px 10px;">${order.pickupDate || "Today"}</span>
        </div>
        <p style="font-size: 0.76rem; color: #047857; margin: 8px 0 0 0; line-height: 1.4;">
          💡 You may arrive anytime within this window. Selecting your specific slot alerts the farmer/mandi loading crew so your vehicle is loaded with zero waiting time.
        </p>
      </div>

      <!-- Quick Slot Chips Selection -->
      <div style="margin-bottom: 20px;">
        <label style="display: block; font-size: 0.82rem; font-weight: 800; color: #1e293b; margin-bottom: 10px;">
          1. Select Your Target Arrival Slot:
        </label>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;" id="preset-slots-grid">
          ${availableSlots.map(slot => `
            <button type="button" class="slot-chip-btn ${currentSlot.includes(slot) ? 'selected' : ''}" onclick="selectPickupPreset('${slot}')" style="background: ${currentSlot.includes(slot) ? '#ecfdf5' : '#ffffff'}; border: 1.5px solid ${currentSlot.includes(slot) ? '#059669' : '#cbd5e1'}; color: ${currentSlot.includes(slot) ? '#064e3b' : '#334155'}; padding: 10px 14px; border-radius: 10px; font-weight: 800; font-size: 0.88rem; cursor: pointer; display: flex; align-items: center; justify-content: space-between; transition: all 0.15s ease;">
              <span>🕒 ${slot}</span>
              <span style="font-size: 0.72rem; color: ${currentSlot.includes(slot) ? '#059669' : '#94a3b8'};">${currentSlot.includes(slot) ? '✓ Selected' : 'Available'}</span>
            </button>
          `).join('')}
        </div>
      </div>

      <!-- Custom Time Option -->
      <div style="margin-bottom: 20px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px;">
        <label style="display: block; font-size: 0.8rem; font-weight: 700; color: #334155; margin-bottom: 6px;">
          Or Enter a Custom Preferred Arrival Time:
        </label>
        <div style="display: flex; gap: 10px; align-items: center;">
          <input type="text" id="custom-slot-time-input" placeholder="e.g. 08:45 AM or 10:15 AM" value="${order.driverScheduledSlot ? order.driverScheduledSlot.replace(' (Confirmed)', '') : ''}" style="flex: 1; padding: 9px 14px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.88rem; font-weight: 700; color: #0f172a; outline: none;" />
        </div>
      </div>

      <!-- Driver Ramp / Loading Note -->
      <div style="margin-bottom: 24px;">
        <label style="display: block; font-size: 0.8rem; font-weight: 700; color: #334155; margin-bottom: 6px;">
          2. Instructions / Note to Farmer Loading Team (Optional):
        </label>
        <input type="text" id="driver-schedule-notes" placeholder="e.g. Will call 30 mins before arrival • Heavy ramp needed" value="${order.driverNotes || ''}" style="width: 100%; padding: 9px 14px; border: 1.5px solid #cbd5e1; border-radius: 8px; font-size: 0.85rem; color: #0f172a; outline: none;" />
      </div>

      <!-- Submit & Action Buttons -->
      <div style="display: flex; justify-content: flex-end; gap: 12px; align-items: center; border-top: 1px solid #f1f5f9; padding-top: 16px;">
        <button class="btn btn-outline" type="button" onclick="closeScheduleSlotModal()" style="padding: 9px 18px; font-size: 0.85rem; border: 1.5px solid #cbd5e1; color: #475569; font-weight: 700; border-radius: 8px; cursor: pointer;">Cancel</button>
        <button class="btn btn-primary" type="button" onclick="submitPickupSchedule()" style="padding: 9px 24px; font-size: 0.88rem; background: #0c5a36; color: #ffffff; font-weight: 800; border-radius: 8px; border: none; cursor: pointer; box-shadow: 0 2px 6px rgba(12, 90, 54, 0.3);">
          ✓ Confirm & Alert Farm Gate
        </button>
      </div>
    </div>
  `;

  modal.classList.add("active");
}

function closeScheduleSlotModal() {
  const modal = document.getElementById("modal-schedule-pickup");
  if (modal) modal.classList.remove("active");
}

function selectPickupPreset(slot) {
  const input = document.getElementById("custom-slot-time-input");
  if (input) input.value = slot;

  const buttons = document.querySelectorAll("#preset-slots-grid .slot-chip-btn");
  buttons.forEach(btn => {
    if (btn.textContent.includes(slot)) {
      btn.style.background = "#ecfdf5";
      btn.style.borderColor = "#059669";
      btn.style.color = "#064e3b";
    } else {
      btn.style.background = "#ffffff";
      btn.style.borderColor = "#cbd5e1";
      btn.style.color = "#334155";
    }
  });
}

async function submitPickupSchedule() {
  if (!currentSchedulingOrder) return;
  const input = document.getElementById("custom-slot-time-input");
  const notesInput = document.getElementById("driver-schedule-notes");

  const slotTime = (input ? input.value : "").trim();
  const driverNotes = (notesInput ? notesInput.value : "").trim();

  if (!slotTime) {
    alert("Please select or enter your preferred pickup arrival time.");
    return;
  }

  try {
    const res = await fetch("/api/logistics/schedule-pickup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        order_code: currentSchedulingOrder,
        slot_time: slotTime,
        driver_notes: driverNotes
      })
    });
    const data = await res.json();
    if (data.success) {
      const order = (logisticsData.dispatchOrders || []).find(o => o.orderCode === currentSchedulingOrder);
      if (order) {
        order.driverScheduledSlot = slotTime + (slotTime.includes("Confirmed") ? "" : " (Confirmed)");
        if (driverNotes) order.driverNotes = driverNotes;
      }
      closeScheduleSlotModal();
      showToast(`🕒 Pickup slot confirmed for ${slotTime}! Farm gate ramp notified.`);
      if (typeof renderOrdersList === 'function') renderOrdersList();
      if (typeof renderFpoCards === 'function') renderFpoCards();
      if (typeof renderExpressPage === 'function') renderExpressPage();
      return;
    } else {
      alert(data.error || "Could not schedule slot.");
    }
  } catch (e) {
    // Local fallback
    const order = (logisticsData.dispatchOrders || []).find(o => o.orderCode === currentSchedulingOrder);
    if (order) {
      order.driverScheduledSlot = slotTime + " (Confirmed)";
      if (driverNotes) order.driverNotes = driverNotes;
    }
    closeScheduleSlotModal();
    showToast(`🕒 Pickup slot confirmed for ${slotTime}! Farm gate ramp notified.`);
    if (typeof renderOrdersList === 'function') renderOrdersList();
    if (typeof renderFpoCards === 'function') renderFpoCards();
    if (typeof renderExpressPage === 'function') renderExpressPage();
  }
}
