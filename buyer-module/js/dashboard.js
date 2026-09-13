/**
 * AgriNex Buyer Module - Controller & Bid Engine
 * Handles Standard Marketplace Bids + Emergency Salvage Buyouts (Breakeven Procurement)
 */

document.addEventListener("DOMContentLoaded", () => {
  renderBuyerEmergencyDesk();
  renderBuyerMarketplace();
  setupBuyerModals();
});

const DEFAULT_EMERGENCY_FEED = [
  {
    id: "EMG-LOT-TOM-99",
    crop: "Shimla Tomatoes (Perishable)",
    image: "../farmer-module/assets/images/tomato.jpg",
    farmerName: "Ramesh Kumar",
    mandi: "Erode Mandi Yard, TN",
    quantity: "45 Qt",
    floorPrice: "₹ 1,200 /Qt",
    breakevenPrice: "₹ 890 /Qt",
    targetUse: "Tomato Puree & Sauce",
    targetUseBadge: "buyer-type-processing",
    targetIcon: "🥫",
    shelfLife: "⚡ 24-36 Hours Left",
    status: "🚨 Active Salvage Call"
  },
  {
    id: "EMG-LOT-ONI-88",
    crop: "Bellary Red Onion Lot",
    image: "../farmer-module/assets/images/onion.jpg",
    farmerName: "Murugan Selvam",
    mandi: "Dindigul Yard, TN",
    quantity: "60 Qt",
    floorPrice: "₹ 950 /Qt",
    breakevenPrice: "₹ 710 /Qt",
    targetUse: "Bulk Kitchen Catering",
    targetUseBadge: "buyer-type-caterer",
    targetIcon: "🍲",
    shelfLife: "⚡ 48 Hours Left",
    status: "🚨 Active Salvage Call"
  }
];

function renderBuyerEmergencyDesk() {
  const tbody = document.getElementById("emergency-buyer-tbody");
  if (!tbody) return;

  // Retrieve any dynamic emergency lots triggered by farmers
  let dynamicEmergency = [];
  try {
    if (window.AgriNexEmergencySale) {
      dynamicEmergency = AgriNexEmergencySale.getEmergencyLots().filter(item => !item.isSold);
    }
  } catch(e) {}

  const allLots = [...dynamicEmergency.map(d => ({
    id: d.id,
    crop: `${d.crop} (${d.grade || 'Standard'})`,
    image: d.image.startsWith("../") ? d.image : `../${d.image}`,
    farmerName: "Ramesh Kumar (Farmer)",
    mandi: "Erode Yard, TN",
    quantity: d.quantity,
    floorPrice: d.expectedPrice,
    breakevenPrice: d.bestBid || "₹ 920 /Qt",
    targetUse: "Purees, Catering & Bio-Compost",
    targetUseBadge: "buyer-type-processing",
    targetIcon: "🥫",
    shelfLife: "⚡ 24-48 Hours Urgency",
    status: d.status
  })), ...DEFAULT_EMERGENCY_FEED];

  tbody.innerHTML = allLots.map(item => `
    <tr style="background-color: #fffdfa;">
      <td>
        <div class="crop-cell">
          <img src="${item.image}" alt="${item.crop}" class="crop-thumb" onerror="this.src='https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=150&auto=format&fit=crop&q=80'" />
          <div>
            <div class="crop-name" style="color: #991b1b; font-weight: 800;">${item.crop}</div>
            <span style="font-size: 0.72rem; color: #dc2626; font-weight: 700;">${item.status}</span>
          </div>
        </div>
      </td>
      <td>
        <div style="font-weight: 700; color: #0f172a; font-size: 0.88rem;">${item.farmerName}</div>
        <div style="font-size: 0.74rem; color: #64748b;">📍 ${item.mandi}</div>
      </td>
      <td>
        <strong style="color: #0f172a; font-size: 0.95rem;">${item.quantity}</strong>
      </td>
      <td>
        <div>
          <span style="font-size: 1.05rem; font-weight: 800; color: #15803d;">${item.breakevenPrice}</span>
          <div style="font-size: 0.72rem; color: #64748b; text-decoration: line-through;">Orig: ${item.floorPrice}</div>
        </div>
      </td>
      <td>
        <span class="badge-buyer-type ${item.targetUseBadge}">
          <span>${item.targetIcon}</span> ${item.targetUse}
        </span>
      </td>
      <td>
        <span class="badge badge-status-emergency" style="font-size: 0.72rem;">
          ${item.shelfLife}
        </span>
      </td>
      <td>
        <button class="btn btn-primary" style="background: #dc2626; font-size: 0.8rem; padding: 7px 14px; font-weight: 800; box-shadow: 0 2px 8px rgba(220,38,38,0.25);" onclick="executeEmergencyBuyout('${item.id}', '${item.crop}', '${item.breakevenPrice}')">
          ⚡ Instant Buyout
        </button>
      </td>
    </tr>
  `).join("");
}

function executeEmergencyBuyout(lotId, cropName, price) {
  if (confirm(`Execute Immediate Salvage Purchase for ${cropName} at ${price}?\n\nEscrow payment will be locked instantly and transit dispatch triggered.`)) {
    // Settle in localStorage if active
    try {
      if (window.AgriNexEmergencySale) {
        AgriNexEmergencySale.acceptEmergencyOffer(lotId, "EMG_BUYER_01", []);
      }
    } catch(e) {}

    renderBuyerEmergencyDesk();
    alert(`🎉 Success! Salvage purchase locked for ${cropName} at ${price}.\nEscrow payment released to farmer. Logistics dispatch assigned automatically!`);
  }
}

function renderBuyerMarketplace() {
  const tbody = document.getElementById("buyer-lots-tbody");
  if (!tbody || !buyerData || !buyerData.marketplaceLots) return;

  tbody.innerHTML = buyerData.marketplaceLots.map(item => `
    <tr>
      <td>
        <div class="crop-cell">
          <img src="${item.image}" alt="${item.crop}" class="crop-thumb" onerror="this.src='https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=150&auto=format&fit=crop&q=80'" />
          <div>
            <div class="crop-name">${item.crop}</div>
            <div style="font-size: 0.74rem; color: #64748b;">Farmer: ${item.farmerName} · 📍 ${item.mandi}</div>
          </div>
        </div>
      </td>
      <td>
        <span class="badge ${item.gradeBadge}">${item.grade}</span>
      </td>
      <td>
        <strong style="color: #0f172a; font-weight: 700;">${item.quantity}</strong>
      </td>
      <td>
        <span class="price-main">${item.floorPrice}</span>
      </td>
      <td>
        <div class="crop-details">
          <span class="price-main" style="color: #0c5a36;">${item.highestBid}</span>
          <span class="price-subtext">Status: ${item.myBidStatus}</span>
        </div>
      </td>
      <td>
        <span class="badge ${item.statusBadge}">${item.status}</span>
      </td>
      <td>
        <button class="btn btn-outline" style="font-weight: 700;" onclick="openBidModal('${item.id}')">Submit Bid</button>
      </td>
    </tr>
  `).join("");
}

function openBidModal(lotId) {
  const lot = buyerData.marketplaceLots.find(l => l.id === lotId);
  if (!lot) return;

  const modal = document.getElementById("modal-bid-submit");
  const content = document.getElementById("modal-bid-content");
  if (modal && content) {
    content.innerHTML = `
      <div style="display: flex; gap: 16px; margin-bottom: 20px; align-items: center;">
        <img src="${lot.image}" alt="${lot.crop}" style="width: 64px; height: 64px; border-radius: 12px; object-fit: cover; border: 1px solid #e2e8f0;" onerror="this.src='https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=150&auto=format&fit=crop&q=80'" />
        <div>
          <h3 style="font-size: 1.2rem; font-weight: 800; color: #1d4ed8;">${lot.crop} (${lot.quantity})</h3>
          <p style="font-size: 0.8rem; color: #64748b;">Farmer: <strong>${lot.farmerName}</strong> · Floor: <strong>${lot.floorPrice}</strong></p>
        </div>
      </div>
      <form onsubmit="submitBuyerBid(event, '${lot.id}')">
        <div class="form-group">
          <label class="form-label">Your Bid Price (₹ per Quintal)</label>
          <input type="number" id="bid-price-input" class="form-input" placeholder="e.g. 1300" required />
        </div>
        <div class="form-group">
          <label class="form-label">Preferred Mandi Delivery Depot</label>
          <input type="text" class="form-input" value="AgriFoods Central Mill, Coimbatore" required />
        </div>
        <div style="background: #eff6ff; padding: 12px; border-radius: 8px; border: 1px solid #bfdbfe; font-size: 0.8rem; color: #1e40af; margin-bottom: 18px;">
          🛡️ Escrow Guarantee: Upon bid acceptance, 35% advance will be locked from your Escrow Wallet automatically.
        </div>
        <div style="display: flex; justify-content: flex-end; gap: 10px;">
          <button type="button" class="btn btn-outline" onclick="closeBidModal()">Cancel</button>
          <button type="submit" class="btn btn-primary" style="background-color: #1d4ed8;">Confirm & Lock Escrow Bid</button>
        </div>
      </form>
    `;
    modal.classList.add("active");
  }
}

function closeBidModal() {
  const modal = document.getElementById("modal-bid-submit");
  if (modal) modal.classList.remove("active");
}

function submitBuyerBid(e, lotId) {
  e.preventDefault();
  const bidPrice = document.getElementById("bid-price-input").value;
  const lot = buyerData.marketplaceLots.find(l => l.id === lotId);
  if (lot) {
    lot.highestBid = `₹ ${bidPrice} /Qt`;
    lot.myBidStatus = "Winning (AgriFoods Ltd.)";
    renderBuyerMarketplace();
    closeBidModal();
    alert(`Bid of ₹ ${bidPrice}/Qt submitted for ${lot.crop}! Farmer ${lot.farmerName} has been notified.`);
  }
}

function setupBuyerModals() {
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      e.target.classList.remove("active");
    }
  });
}

