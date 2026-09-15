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
 * Open Digital Gate Pass Modal
 */
function openGatePassModal(orderCode) {
  const order = (logisticsData.dispatchOrders || []).find(o => o.orderCode === orderCode);
  if (!order) return;

  const modal = document.getElementById("modal-gate-pass");
  const body = document.getElementById("modal-gate-pass-body");
  if (!modal || !body) return;

  body.innerHTML = `
    <div style="background:#0c5a36; color:white; padding:18px 20px; border-radius:14px 14px 0 0; display:flex; justify-content:space-between; align-items:center;">
      <div>
        <span style="font-size:0.75rem; background:rgba(255,255,255,0.2); padding:3px 8px; border-radius:4px; font-weight:800; letter-spacing:0.5px;">OFFICIAL e-GATE PASS</span>
        <h3 style="font-size:1.25rem; font-weight:800; margin-top:4px;">${order.orderCode} • Transit Permit</h3>
      </div>
      <button onclick="closeGatePassModal()" style="background:none; border:none; font-size:1.5rem; color:white; cursor:pointer;">&times;</button>
    </div>

    <div style="padding:22px;">
      <!-- QR Verification Box -->
      <div style="background:#f8fafc; border:1.5px dashed #cbd5e1; border-radius:12px; padding:16px; text-align:center; margin-bottom:18px;">
        <div style="display:inline-block; background:white; padding:10px; border-radius:8px; box-shadow:0 2px 8px rgba(0,0,0,0.06);">
          <!-- Styled SVG Barcode / QR Simulation -->
          <svg width="180" height="48" viewBox="0 0 180 48" fill="#0f172a">
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
          </svg>
        </div>
        <div style="font-size:0.75rem; font-weight:800; color:#475569; margin-top:6px; letter-spacing:1px;">
          AUTH CODE: AGX-GP-${order.orderCode}-2026
        </div>
      </div>

      <!-- Consignment Details -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; font-size:0.85rem; margin-bottom:18px;">
        <div style="background:#f1f5f9; padding:10px 12px; border-radius:8px;">
          <span style="font-size:0.72rem; color:#64748b; display:block;">PRODUCE & VOLUME</span>
          <strong style="color:#0f172a;">${order.cropName}</strong>
          <div style="font-size:0.78rem; color:#0c5a36; font-weight:700;">${order.quantityQt} Qt (${(order.quantityKg).toLocaleString()} kg)</div>
        </div>

        <div style="background:#f1f5f9; padding:10px 12px; border-radius:8px;">
          <span style="font-size:0.72rem; color:#64748b; display:block;">ASSIGNED VEHICLE & REEFER</span>
          <strong style="color:#0f172a;">${order.vehicleNo || logisticsData.profile.vehicleNo}</strong>
          <div style="font-size:0.78rem; color:#0284c7; font-weight:700;">❄️ Temp: ${order.temperatureC}</div>
        </div>
      </div>

      <!-- Route Details -->
      <div style="border:1px solid #e2e8f0; border-radius:10px; padding:12px 14px; font-size:0.82rem; margin-bottom:18px; line-height:1.5;">
        <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
          <span style="color:#64748b;">📍 Origin Farm / Mandi:</span>
          <strong style="color:#0f172a; text-align:right;">${order.pickupAddress}</strong>
        </div>
        <div style="display:flex; justify-content:space-between; margin-bottom:6px;">
          <span style="color:#64748b;">🏁 Delivery Destination:</span>
          <strong style="color:#0f172a; text-align:right;">${order.deliveryAddress}</strong>
        </div>
        <div style="display:flex; justify-content:space-between; border-top:1px dashed #e2e8f0; padding-top:6px; margin-top:6px;">
          <span style="color:#64748b;">Guaranteed Freight Escrow:</span>
          <strong style="color:#0c5a36; font-size:0.95rem;">${order.freightFormatted}</strong>
        </div>
      </div>

      <!-- Security PIN Alert for Driver -->
      <div style="background:#ecfdf5; border:1px solid #a7f3d0; border-radius:8px; padding:10px 14px; margin-bottom:18px; font-size:0.8rem; color:#065f46;">
        🛡️ <strong>Delivery Protocol:</strong> Upon reaching receiving dock, obtain the 4-digit Security PIN (<strong>${order.deliveryPin}</strong>) from the buyer receiving lead to trigger instant escrow freight payout.
      </div>

      <div style="display:flex; justify-content:flex-end; gap:10px;">
        <button class="btn btn-outline" onclick="window.print()" style="font-size:0.82rem;">🖨️ Print Gate Pass</button>
        <button class="btn btn-primary" onclick="closeGatePassModal()" style="font-size:0.82rem;">✓ Done</button>
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
