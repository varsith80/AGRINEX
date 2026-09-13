/**
 * AgriNex Farmer Module - Dashboard Controller & Interactions
 */

document.addEventListener("DOMContentLoaded", () => {
  renderListings();
  setupModals();
  setupNavigation();
  setupLocationChange();
});

function renderListings() {
  const tableBody = document.getElementById("listings-tbody");
  if (!tableBody || !farmerData || !farmerData.listings) return;

  tableBody.innerHTML = farmerData.listings.map(item => `
    <tr>
      <td>
        <div class="crop-cell">
          <img src="${item.image}" alt="${item.crop}" class="crop-thumb" onerror="this.src='https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=150&auto=format&fit=crop&q=80'" />
          <span class="crop-name">${item.crop}</span>
        </div>
      </td>
      <td>
        <span class="badge ${item.gradeBadgeClass}">${item.grade}</span>
      </td>
      <td>
        <strong style="color: #0f172a; font-weight: 700;">${item.quantity}</strong>
      </td>
      <td>
        <span class="price-main">${item.expectedPrice}</span>
      </td>
      <td>
        <div class="crop-details">
          <span class="price-main">${item.bestBid}</span>
          <span class="price-subtext">(${item.buyerName})</span>
        </div>
      </td>
      <td>
        <span class="badge ${item.statusBadgeClass}">${item.status}</span>
      </td>
      <td>
        <button class="btn btn-outline btn-view-lot" onclick="openLotDetail('${item.id}')">View</button>
      </td>
    </tr>
  `).join("");
}

function openProfileModal() {
  const modalProfile = document.getElementById("modal-profile");
  if (modalProfile) modalProfile.classList.add("active");
}

function closeProfileModal() {
  const modalProfile = document.getElementById("modal-profile");
  if (modalProfile) modalProfile.classList.remove("active");
}

function setupModals() {
  const createBtn = document.getElementById("btn-open-create-modal");
  const modalCreate = document.getElementById("modal-create-listing");
  const closeCreateBtn = document.getElementById("btn-close-create-modal");
  const formCreate = document.getElementById("form-create-listing");

  const formEditProfile = document.getElementById("form-edit-profile");

  if (createBtn && modalCreate) {
    createBtn.addEventListener("click", () => {
      modalCreate.classList.add("active");
    });
  }

  if (closeCreateBtn && modalCreate) {
    closeCreateBtn.addEventListener("click", () => {
      modalCreate.classList.remove("active");
    });
  }

  // Handle modal background click to close
  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      e.target.classList.remove("active");
    }
  });

  if (formCreate) {
    formCreate.addEventListener("submit", (e) => {
      e.preventDefault();
      const cropName = document.getElementById("new-crop-name").value;
      const grade = document.getElementById("new-crop-grade").value;
      const quantity = document.getElementById("new-crop-qty").value;
      const price = document.getElementById("new-crop-price").value;

      let img = "assets/images/tomato.jpg";
      if (cropName.toLowerCase().includes("onion")) img = "assets/images/onion.jpg";
      if (cropName.toLowerCase().includes("paddy") || cropName.toLowerCase().includes("rice")) img = "assets/images/paddy.jpg";
      if (cropName.toLowerCase().includes("cotton")) img = "assets/images/cotton.jpg";

      const newListing = {
        id: `LOT-${Date.now().toString().slice(-4)}`,
        crop: cropName,
        image: img,
        grade: grade,
        gradeBadgeClass: grade === "Grade A" ? "badge-grade-a" : "badge-grade-b",
        quantity: `${quantity} Qt`,
        expectedPrice: `₹ ${price} /Qt`,
        bestBid: "Awaiting Bids",
        buyerName: "Matching Buyers...",
        status: "Bids Open",
        statusBadgeClass: "badge-status-open"
      };

      farmerData.listings.unshift(newListing);
      farmerData.stats.totalLots += 1;

      const totalLotsEl = document.getElementById("stat-total-lots");
      if (totalLotsEl) totalLotsEl.textContent = farmerData.stats.totalLots;

      renderListings();
      modalCreate.classList.remove("active");
      formCreate.reset();

      showToast(`Crop listing for "${cropName}" published successfully! Buyers are being notified.`);
    });
  }

  // Handle Profile Update Form
  if (formEditProfile) {
    formEditProfile.addEventListener("submit", (e) => {
      e.preventDefault();
      const newName = document.getElementById("profile-input-name").value;
      const newPhone = document.getElementById("profile-input-phone").value;
      const newLocation = document.getElementById("profile-input-location").value;

      if (farmerData && farmerData.profile) {
        farmerData.profile.name = newName;
        farmerData.profile.location = newLocation;
      }

      // Update UI elements
      const nameEl = document.querySelector(".profile-name");
      if (nameEl) nameEl.textContent = newName;

      const heroNameEl = document.querySelector(".hero-title");
      if (heroNameEl) heroNameEl.textContent = `Good Morning, ${newName}! 👋`;

      const profileDisplayNameEl = document.getElementById("profile-display-name");
      if (profileDisplayNameEl) profileDisplayNameEl.textContent = newName;

      closeProfileModal();
      showToast("Farmer Profile & KYC Information updated successfully!");
    });
  }
}

function openLotDetail(lotId) {
  const lot = farmerData.listings.find(l => l.id === lotId);
  if (!lot) return;

  const detailModal = document.getElementById("modal-lot-detail");
  const detailBody = document.getElementById("modal-lot-detail-content");

  if (detailModal && detailBody) {
    detailBody.innerHTML = `
      <div style="display: flex; gap: 16px; margin-bottom: 20px; align-items: center;">
        <img src="${lot.image}" alt="${lot.crop}" style="width: 68px; height: 68px; border-radius: 12px; object-fit: cover; border: 1px solid #e2e8f0;" onerror="this.src='https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=150&auto=format&fit=crop&q=80'" />
        <div>
          <h3 style="font-size: 1.25rem; font-weight: 800; color: #0c5a36;">${lot.crop} - ${lot.quantity}</h3>
          <div style="margin-top: 4px;">
            <span class="badge ${lot.gradeBadgeClass}">${lot.grade}</span>
            <span class="badge ${lot.statusBadgeClass}" style="margin-left: 6px;">${lot.status}</span>
          </div>
        </div>
      </div>
      <div style="background: #f8fafc; padding: 16px; border-radius: 12px; font-size: 0.88rem; line-height: 1.6; border: 1px solid #e2e8f0; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span style="color: #64748b;">Lot ID:</span>
          <strong style="color: #0f172a;">${lot.id}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span style="color: #64748b;">Expected Floor Price:</span>
          <strong style="color: #0f172a;">${lot.expectedPrice}</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span style="color: #64748b;">Current Best Buyer Bid:</span>
          <strong style="color: #0c5a36; font-size: 1.05rem;">${lot.bestBid}</strong>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: #64748b;">Interested Buyer / Mill:</span>
          <strong style="color: #0f172a;">${lot.buyerName}</strong>
        </div>
      </div>
      <div style="display: flex; gap: 12px; justify-content: flex-end;">
        <button class="btn btn-outline" onclick="closeDetailModal()">Close</button>
        <button class="btn btn-primary" onclick="acceptBid('${lot.id}')">Accept Bid & Generate Order</button>
      </div>
    `;
    detailModal.classList.add("active");
  }
}

function closeDetailModal() {
  const detailModal = document.getElementById("modal-lot-detail");
  if (detailModal) detailModal.classList.remove("active");
}

function acceptBid(lotId) {
  closeDetailModal();
  showToast(`Bid accepted for ${lotId}! Generating Escrow Contract and Dispatch Order.`);
}

function setupLocationChange() {
  const locChangeBtn = document.getElementById("btn-change-location");
  if (locChangeBtn) {
    locChangeBtn.addEventListener("click", () => {
      const newLoc = prompt("Enter your Mandi Location / Region:", "Erode, Tamil Nadu");
      if (newLoc && newLoc.trim()) {
        document.getElementById("hero-location-text").textContent = newLoc.trim();
        showToast(`Mandi location switched to ${newLoc.trim()}`);
      }
    });
  }
}

function setupNavigation() {
  const navItems = document.querySelectorAll(".nav-item");
  navItems.forEach(item => {
    item.addEventListener("click", function() {
      navItems.forEach(n => n.classList.remove("active"));
      this.classList.add("active");
    });
  });
}

function showToast(message) {
  let toast = document.getElementById("app-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "app-toast";
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: #0c5a36;
      color: #ffffff;
      padding: 14px 22px;
      border-radius: 12px;
      font-weight: 600;
      font-size: 0.88rem;
      box-shadow: 0 12px 28px rgba(0,0,0,0.18);
      z-index: 99999;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      opacity: 0;
      transform: translateY(12px);
    `;
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span style="background: #ffffff; color: #0c5a36; width: 20px; height: 20px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800;">✓</span> <span>${message}</span>`;
  toast.style.opacity = "1";
  toast.style.transform = "translateY(0)";

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(12px)";
  }, 3500);
}
