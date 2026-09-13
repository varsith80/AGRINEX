/**
 * AgriNex Buyer Module - Controller & Bid Engine
 */

document.addEventListener("DOMContentLoaded", () => {
  renderBuyerMarketplace();
  setupBuyerModals();
});

function renderBuyerMarketplace() {
  const tbody = document.getElementById("buyer-lots-tbody");
  if (!tbody || !buyerData || !buyerData.marketplaceLots) return;

  tbody.innerHTML = buyerData.marketplaceLots.map(item => `
    <tr>
      <td>
        <div class="crop-cell">
          <img src="${item.image}" alt="${item.crop}" class="crop-thumb" />
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
        <img src="${lot.image}" alt="${lot.crop}" style="width: 64px; height: 64px; border-radius: 12px; object-fit: cover; border: 1px solid #e2e8f0;" />
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
