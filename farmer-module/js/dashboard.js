document.addEventListener("DOMContentLoaded", () => {
  // Sync registered farmer profile and exact coordinates if registered
  try {
    const storedUser = localStorage.getItem("agrinex_user");
    if (storedUser) {
      const u = JSON.parse(storedUser);
      if (u.name && farmerData && farmerData.profile) farmerData.profile.name = u.name;
      if (u.location && farmerData && farmerData.profile) farmerData.profile.location = u.location;
      if (u.latitude !== undefined && farmerData && farmerData.profile) {
        farmerData.profile.latitude = parseFloat(u.latitude);
      }
      if (u.longitude !== undefined && farmerData && farmerData.profile) {
        farmerData.profile.longitude = parseFloat(u.longitude);
      }
      if (farmerData && farmerData.profile && farmerData.profile.latitude && farmerData.profile.longitude) {
        farmerData.profile.coordinates = [farmerData.profile.latitude, farmerData.profile.longitude];
      }

      // Update UI elements with exact registered farmer details
      const nameEl = document.querySelector(".profile-name");
      if (nameEl && u.name) nameEl.textContent = u.name;
      const profileDisplayNameEl = document.getElementById("profile-display-name");
      if (profileDisplayNameEl && u.name) profileDisplayNameEl.textContent = u.name;
      const profileNameInput = document.getElementById("profile-input-name");
      if (profileNameInput && u.name) profileNameInput.value = u.name;
      const profileLocInput = document.getElementById("profile-input-location");
      if (profileLocInput && u.location) profileLocInput.value = u.location;
      const profileLatInput = document.getElementById("profile-input-latitude");
      if (profileLatInput && u.latitude) profileLatInput.value = u.latitude;
      const profileLngInput = document.getElementById("profile-input-longitude");
      if (profileLngInput && u.longitude) profileLngInput.value = u.longitude;
    }
  } catch (e) {}

  renderListings();
  syncListingsFromBackend();
  renderFPOHub();
  if (window.AgriNexFPOHub && typeof window.AgriNexFPOHub.syncFromServer === 'function') {
    window.AgriNexFPOHub.syncFromServer();
  }
  setupModals();
  setupNavigation();
  setupLocationChange();
  if (window.location.hash === '#profile') {
    setTimeout(openProfileModal, 100);
  }

  const createForm = document.getElementById("form-create-listing");
  if (createForm) {
    createForm.addEventListener("submit", async function(e) {
      e.preventDefault();
      const cropName = document.getElementById("new-crop-name").value;
      const grade = document.getElementById("new-crop-grade").value;
      const qty = parseFloat(document.getElementById("new-crop-qty").value) || 50;
      const price = parseFloat(document.getElementById("new-crop-price").value) || 2000;

      try {
        if (window.AgriNexAPI) {
          const res = await AgriNexAPI.createCrop({
            crop: cropName,
            variety: "Standard",
            grade: grade,
            quantity_qt: qty,
            price_per_qt: price
          });
          showToast("🎉 Crop lot published to marketplace!");
          await syncListingsFromBackend();

          // Broadcast to Buyer and Admin tabs immediately
          if (typeof BroadcastChannel !== 'undefined') {
            const syncChannel = new BroadcastChannel('agrinex_cross_module_sync');
            syncChannel.postMessage({ type: 'LOT_CREATED', crop: cropName });
          }

          document.getElementById("modal-create-listing").classList.remove("active");
          createForm.reset();
          return;
        }
      } catch (err) {
        console.error(err);
      }
    });
  }

});

/**
 * Render FPO Bulk Order Demand Cards
 */
function renderFPOHub() {
  const container = document.getElementById("fpo-demands-container");
  if (!container || !window.AgriNexFPOHub) return;

  const demands = AgriNexFPOHub.getBulkDemands();
  container.innerHTML = demands.map(d => {
    const percent = Math.min(100, Math.round((d.currentPooledQty / d.totalRequiredNumber) * 100));
    const isFull = percent >= 100;

    return `
      <div class="fpo-pool-card">
        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
          <div>
            <span style="font-size: 0.72rem; color: #15803d; font-weight: 700; background: #e8f5ed; padding: 2px 8px; border-radius: 4px; border: 1px solid #bbf7d0;">
              ${d.buyerLogo} Enterprise Demand
            </span>
            <h4 style="font-size: 1.05rem; font-weight: 800; color: #0f172a; margin-top: 6px;">${window.tCrop ? window.tCrop(d.crop) : d.crop}</h4>
            <div style="font-size: 0.76rem; color: #64748b;">Buyer: <strong>${window.tBuyer ? window.tBuyer(d.buyerName) : d.buyerName}</strong></div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 1.1rem; font-weight: 800; color: #15803d;">${d.targetPricePerQt}</div>
            <span style="font-size: 0.7rem; color: #64748b;">Escrow Guaranteed</span>
          </div>
        </div>

        <div>
          <div style="display: flex; justify-content: space-between; font-size: 0.78rem; font-weight: 700;">
            <span style="color: #334155;">Pooled: ${d.currentPooledQty} / ${d.totalRequiredQty}</span>
            <span style="color: ${isFull ? '#166534' : '#15803d'};">${percent}% Filled</span>
          </div>
          <div class="fpo-progress-bar-wrap">
            <div class="fpo-progress-bar-fill" style="width: ${percent}%;"></div>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 0.72rem; color: #64748b; margin-top: 4px;">
            <span>⏱️ ${d.deadline}</span>
            <span>📍 ${d.destination}</span>
          </div>
        </div>

        <div style="display: flex; gap: 8px; justify-content: space-between; align-items: center; border-top: 1px solid #f1f5f9; padding-top: 12px;">
          <span style="font-size: 0.74rem; color: #64748b;">Min: <strong>${d.minContribution}</strong></span>
          <button class="btn btn-primary" style="padding: 6px 14px; font-size: 0.8rem; background: ${isFull ? '#166534' : '#0c5a36'};" onclick="openFPOContributeModal('${d.id}')">
            <span>+</span> ${isFull ? 'View Pool Summary' : 'Pool My Harvest'}
          </button>
        </div>
      </div>
    `;
  }).join("");
}

function openFPOContributeModal(demandId) {
  const demands = AgriNexFPOHub.getBulkDemands();
  const demand = demands.find(d => d.id === demandId);
  if (!demand) return;

  const percent = Math.min(100, Math.round((demand.currentPooledQty / demand.totalRequiredNumber) * 100));
  const detailModal = document.getElementById("modal-lot-detail");
  const detailBody = document.getElementById("modal-lot-detail-content");

  if (detailModal && detailBody) {
    detailBody.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <div>
          <span class="badge badge-fpo">🌾 FPO Bulk Order Cooperative Pool</span>
          <h3 style="font-size: 1.3rem; font-weight: 800; color: #0f172a; margin-top: 4px;">${demand.crop} - ${demand.totalRequiredQty} Bulk Order</h3>
        </div>
        <button style="font-size: 1.5rem; color: #64748b; cursor: pointer; border: none; background: none;" onclick="closeDetailModal()">&times;</button>
      </div>

      <div style="background: #f0fdf4; border: 1.5px solid #bbf7d0; border-radius: 12px; padding: 16px; margin-bottom: 18px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 0.88rem;">
          <span style="color: #166534; font-weight: 700;">Corporate Buyer: ${window.tBuyer ? window.tBuyer(demand.buyerName) : demand.buyerName}</span>
          <strong style="color: #15803d; font-size: 1.05rem;">Contract Price: ${demand.targetPricePerQt}</strong>
        </div>
        <p style="font-size: 0.8rem; color: #374151; line-height: 1.45; margin-bottom: 10px;">
          An individual farmer cannot supply <strong>${demand.totalRequiredQty}</strong> alone. By contributing your crop into this collective FPO batch, your volume gets aggregated with other farmers and sold at institutional premium rates.
        </p>
        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 700; color: #166534;">
          <span>Current Pool Progress:</span>
          <span>${demand.currentPooledQty} / ${demand.totalRequiredQty} (${percent}%)</span>
        </div>
        <div class="fpo-progress-bar-wrap" style="height: 10px;">
          <div class="fpo-progress-bar-fill" style="width: ${percent}%;"></div>
        </div>
      </div>

      <!-- Farmer Contribution Form -->
      <form onsubmit="submitFPOContribution(event, '${demand.id}')">
        <div class="form-group">
          <label class="form-label">Quantity You Want to Commit (in Quintals / Qt) *</label>
          <input type="number" id="fpo-contrib-qty" class="form-input" placeholder="e.g. 25" min="5" required />
          <span style="font-size: 0.72rem; color: #64748b; margin-top: 4px; display: block;">Minimum allowed commitment: ${demand.minContribution}</span>
        </div>

        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; margin-bottom: 18px;">
          <div style="font-size: 0.82rem; font-weight: 700; color: #0f172a; margin-bottom: 6px;">Cooperative Member Benefits:</div>
          <ul style="font-size: 0.78rem; color: #475569; padding-left: 18px; line-height: 1.5;">
            <li>Direct pickup arranged by AgriNex Logistics from your nearest mandi.</li>
            <li>35% Advance Escrow locked immediately upon pool completion.</li>
            <li>No intermediary middleman cuts — 100% contract rate paid to your bank account.</li>
          </ul>
        </div>

        <div style="display: flex; gap: 10px; justify-content: flex-end;">
          <button type="button" class="btn btn-outline" onclick="closeDetailModal()">Cancel</button>
          <button type="submit" class="btn btn-primary" style="background: #0c5a36;">
            🤝 Commit My Harvest to Pool
          </button>
        </div>
      </form>

      <!-- Active Contributors History -->
      <div style="margin-top: 20px; border-top: 1px solid #e2e8f0; padding-top: 14px;">
        <h5 style="font-size: 0.82rem; font-weight: 800; color: #334155; margin-bottom: 8px;">Current Farmer Contributions (${demand.farmerContributors.length} Farmers):</h5>
        <div style="max-height: 120px; overflow-y: auto; display: flex; flex-direction: column; gap: 6px;">
          ${demand.farmerContributors.map(c => `
            <div style="display: flex; justify-content: space-between; font-size: 0.76rem; background: #ffffff; border: 1px solid #f1f5f9; padding: 6px 10px; border-radius: 6px;">
              <span style="font-weight: 600; color: #0f172a;">🧑‍🌾 ${c.name}</span>
              <span style="font-weight: 700; color: #15803d;">+${c.qty} Qt (${c.status})</span>
            </div>
          `).join("")}
        </div>
      </div>
    `;
    detailModal.classList.add("active");
  }
}

function submitFPOContribution(e, demandId) {
  e.preventDefault();
  const qtyInput = document.getElementById("fpo-contrib-qty");
  const qty = qtyInput ? qtyInput.value : 20;

  const result = AgriNexFPOHub.contributeToPool(demandId, "Perumal", qty);
  if (result.success) {
    renderFPOHub();
    closeDetailModal();
    showToast(`🎉 ${result.message}`);
  } else {
    alert(result.message);
  }
}

function scrollToFPOHub() {
  window.location.href = 'fpo-hub.html';
}

window.currentProduceFilter = 'all';

function setProduceFilter(filterType) {
  window.currentProduceFilter = filterType;

  // Update tabs UI
  const tabAll = document.getElementById("tab-produce-all");
  const tabActive = document.getElementById("tab-produce-active");
  const tabEmergency = document.getElementById("tab-produce-emergency");

  if (tabAll) tabAll.classList.toggle("active", filterType === 'all');
  if (tabActive) tabActive.classList.toggle("active", filterType === 'active');
  if (tabEmergency) tabEmergency.classList.toggle("active", filterType === 'emergency');

  renderListings();
}

let currentProduceSearch = '';
function handleSearchCrops(val) {
  currentProduceSearch = (val || '').trim().toLowerCase();
  renderListings();
}
window.handleSearchCrops = handleSearchCrops;

function renderListings() {
  const tableBody = document.getElementById("listings-tbody");
  if (!tableBody || !farmerData || !farmerData.listings) return;

  // Compute live counters
  const allCount = farmerData.listings.length;
  const activeCount = farmerData.listings.filter(item => !item.status || !item.status.includes("Sold")).length;
  const emergencyEligibleCount = farmerData.listings.filter(item => 
    item.isEmergencySale || 
    (item.shelfLife && item.shelfLife.toLowerCase().includes("perishable")) || 
    (item.crop && (item.crop.toLowerCase().includes("tomato") || item.crop.toLowerCase().includes("chilli")))
  ).length;

  const countAllEl = document.getElementById("count-all-produce");
  if (countAllEl) countAllEl.textContent = allCount;

  const countActiveEl = document.getElementById("count-active-produce");
  if (countActiveEl) countActiveEl.textContent = activeCount;

  const countEmgEl = document.getElementById("count-emergency-produce");
  if (countEmgEl) countEmgEl.textContent = emergencyEligibleCount;

  const emgEligibleBtnEl = document.getElementById("emergency-eligible-count");
  if (emgEligibleBtnEl) emgEligibleBtnEl.textContent = emergencyEligibleCount;

  const statTotalLots = document.getElementById("stat-total-lots");
  if (statTotalLots) statTotalLots.textContent = activeCount;

  // Filter listings based on selected tab
  let items = farmerData.listings;
  if (currentProduceSearch) {
    items = items.filter(item => 
      (item.crop && item.crop.toLowerCase().includes(currentProduceSearch)) ||
      (item.grade && item.grade.toLowerCase().includes(currentProduceSearch)) ||
      (item.buyerName && item.buyerName.toLowerCase().includes(currentProduceSearch)) ||
      (item.id && item.id.toLowerCase().includes(currentProduceSearch))
    );
  }
  if (window.currentProduceFilter === 'active') {
    items = items.filter(item => !item.status || !item.status.includes("Sold"));
  } else if (window.currentProduceFilter === 'emergency') {
    items = items.filter(item => 
      item.isEmergencySale || 
      (item.shelfLife && item.shelfLife.toLowerCase().includes("perishable")) || 
      (item.crop && (item.crop.toLowerCase().includes("tomato") || item.crop.toLowerCase().includes("chilli")))
    );
  }

  if (items.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 28px; color: #64748b; font-size: 0.9rem;">
          No produce lots matching <strong>${window.currentProduceFilter}</strong> filter. 
          <button class="btn btn-outline" style="margin-left: 10px; padding: 4px 10px; font-size: 0.78rem;" onclick="setProduceFilter('all')">Show All</button>
        </td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = items.map(item => {
    const isEmergency = Boolean(item.isEmergencySale);
    const isSold = Boolean(item.status && item.status.includes("Sold"));
    const isPerishable = Boolean(item.shelfLife && item.shelfLife.toLowerCase().includes("perishable"));
    const dispCrop = window.tCrop ? window.tCrop(item.crop) : item.crop;
    const dispGrade = window.tGrade ? window.tGrade(item.grade) : item.grade;
    const dispStatus = window.tStatus ? window.tStatus(item.status) : item.status;
    const dispBuyer = window.tBuyer ? window.tBuyer(item.buyerName) : item.buyerName;

    return `
      <tr style="${isEmergency && !isSold ? 'background-color: #fffaf0; border-left: 4px solid #dc2626;' : ''}">
        <td>
          <div class="crop-cell">
            <img src="${item.image}" alt="${item.crop}" class="crop-thumb" onerror="this.src='https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=150&auto=format&fit=crop&q=80'" />
            <div>
              <div style="display: flex; align-items: center; gap: 6px;">
                <span class="crop-name">${dispCrop}</span>
                <span style="font-size: 0.68rem; font-weight: 700; color: #64748b; background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-family: monospace;">${item.id}</span>
              </div>
              ${isEmergency && !isSold ? `
                <span class="badge badge-status-emergency" style="font-size: 0.68rem; padding: 2px 6px; margin-top: 3px;">⚡ ${window.tText ? window.tText('Emergency Salvage Active') : 'Emergency Salvage Active'}</span>
              ` : (isPerishable && !isSold ? `
                <span style="font-size: 0.7rem; color: #dc2626; font-weight: 700; display: inline-flex; align-items: center; gap: 3px; margin-top: 2px;">⏳ ${item.shelfLife}</span>
              ` : '')}
            </div>
          </div>
        </td>
        <td>
          <span class="badge ${item.gradeBadgeClass}">${dispGrade}</span>
        </td>
        <td>
          <strong style="color: #0f172a; font-weight: 800; font-size: 0.94rem;">${item.quantity}</strong>
        </td>
        <td>
          <span class="price-main">${item.expectedPrice}</span>
        </td>
        <td>
          <div class="crop-details">
            <span class="price-main" style="${isEmergency ? 'color: #dc2626; font-weight: 800;' : 'color: #166534;'}">${item.bestBid}</span>
            <span class="price-subtext" style="display: flex; align-items: center; gap: 4px;">
              <span style="color: #15803d; font-weight: 800;">✓</span> ${dispBuyer}
            </span>
          </div>
        </td>
        <td>
          <span class="badge ${item.statusBadgeClass}">${dispStatus}</span>
        </td>
        <td>
          <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
            <button class="btn btn-outline btn-view-lot" style="padding: 6px 12px; font-size: 0.8rem; font-weight: 700;" onclick="openLotDetail('${item.id}')">${window.tText ? window.tText('View') : 'View'}</button>
            ${!isSold && !isEmergency ? `
              <button class="btn-emergency-action" onclick="openEmergencyModal('${item.id}')" title="No buyers? Activate instant breakeven sale with food processors, composters & caterers">
                <span>🚨</span> ${window.tText ? window.tText('Emergency Sale') : 'Emergency Sale'}
              </button>
            ` : ''}
            ${isEmergency && !isSold ? `
              <button class="btn-emergency-action" style="background: #0c5a36;" onclick="openEmergencyOffersModal('${item.id}')" title="Review live salvage bids">
                <span>⚡</span> ${window.tText ? window.tText('Offers') : 'Offers'} (${item.emergencyOffers ? item.emergencyOffers.length : 3})
              </button>
            ` : ''}
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

function openCreateListingModal() {
  const modalCreate = document.getElementById("modal-create-listing");
  if (modalCreate) {
    const dateInput = document.getElementById("new-crop-harvest-date");
    if (dateInput && !dateInput.value) {
      dateInput.value = new Date().toISOString().split('T')[0];
    }
    modalCreate.classList.add("active");
  }
}
function closeCreateListingModal() {
  const modalCreate = document.getElementById("modal-create-listing");
  if (modalCreate) modalCreate.classList.remove("active");
}
window.openCreateListingModal = openCreateListingModal;
window.closeCreateListingModal = closeCreateListingModal;

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
      const dateInput = document.getElementById("new-crop-harvest-date");
      if (dateInput && !dateInput.value) {
        dateInput.value = new Date().toISOString().split('T')[0];
      }
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
      const cropName = document.getElementById("new-crop-name") ? document.getElementById("new-crop-name").value : "Tomato";
      const grade = document.getElementById("new-crop-grade") ? document.getElementById("new-crop-grade").value : "Grade A";
      const quantity = document.getElementById("new-crop-qty") ? document.getElementById("new-crop-qty").value : "50";
      const price = document.getElementById("new-crop-price") ? document.getElementById("new-crop-price").value : "2000";
      const rawHarvestDate = document.getElementById("new-crop-harvest-date") ? document.getElementById("new-crop-harvest-date").value : "";

      let formattedDate = "";
      if (rawHarvestDate) {
        const parts = rawHarvestDate.split('-');
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        formattedDate = `${parts[2]} ${months[parseInt(parts[1], 10) - 1]} ${parts[0]}`;
      } else {
        formattedDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      }

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
        harvestDate: formattedDate,
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
      if (modalCreate) modalCreate.classList.remove("active");
      formCreate.reset();

      showToast(`Crop listing for "${cropName}" (Harvested: ${formattedDate}) published successfully!`);
    });
  }

  // Handle Profile Update Form
  if (formEditProfile) {
    formEditProfile.addEventListener("submit", (e) => {
      e.preventDefault();
      const newName = document.getElementById("profile-input-name") ? document.getElementById("profile-input-name").value : "";
      const newPhone = document.getElementById("profile-input-phone") ? document.getElementById("profile-input-phone").value : "";
      const newLocation = document.getElementById("profile-input-location") ? document.getElementById("profile-input-location").value : "";
      const newLat = document.getElementById("profile-input-latitude") ? parseFloat(document.getElementById("profile-input-latitude").value) : 20.1472;
      const newLng = document.getElementById("profile-input-longitude") ? parseFloat(document.getElementById("profile-input-longitude").value) : 74.2255;

      if (farmerData && farmerData.profile) {
        farmerData.profile.name = newName;
        farmerData.profile.location = newLocation;
        farmerData.profile.latitude = newLat;
        farmerData.profile.longitude = newLng;
        farmerData.profile.coordinates = [newLat, newLng];
      }

      // Persist to user session
      try {
        let user = JSON.parse(localStorage.getItem("agrinex_user") || "{}");
        user.name = newName;
        user.location = newLocation;
        user.latitude = newLat;
        user.longitude = newLng;
        user.coordinates = [newLat, newLng];
        localStorage.setItem("agrinex_user", JSON.stringify(user));
      } catch (err) {}

      // Update UI elements
      const nameEl = document.querySelector(".profile-name");
      if (nameEl) nameEl.textContent = newName;

      const heroNameEl = document.querySelector(".hero-title");
      if (heroNameEl) heroNameEl.textContent = `Good Morning, ${newName}! 👋`;

      const profileDisplayNameEl = document.getElementById("profile-display-name");
      if (profileDisplayNameEl) profileDisplayNameEl.textContent = newName;

      closeProfileModal();
      showToast("Farmer Profile, Registered Location & Coordinates updated successfully!");
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
          <strong style="color: #0f172a;">${window.tBuyer ? window.tBuyer(lot.buyerName) : lot.buyerName}</strong>
        </div>
      </div>
      <div style="display: flex; gap: 12px; justify-content: flex-end; flex-wrap: wrap;">
        <button class="btn btn-outline" onclick="closeDetailModal()">Close</button>
        ${!lot.status.includes("Sold") ? `
          <button class="btn btn-primary" onclick="acceptBid('${lot.id}')">Accept Regular Bid</button>
          <button class="btn-emergency-action" onclick="closeDetailModal(); openEmergencyModal('${lot.id}');">🚨 Emergency Sale Mode</button>
        ` : ''}
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
  const lot = farmerData.listings.find(l => l.id === lotId);
  if (lot) {
    lot.status = "Dispatched (Escrow Locked)";
    lot.statusBadgeClass = "badge-status-dispatched";
    renderListings();
  }
  showToast(`Bid accepted for ${lotId}! Generating Escrow Contract and Dispatch Order.`);
}

/**
 * Open Emergency Sale Confirmation Modal
 */
function openEmergencyModal(lotId) {
  const lot = farmerData.listings.find(l => l.id === lotId);
  if (!lot) return;

  const basePrice = parseInt(lot.expectedPrice.replace(/[^0-9]/g, "")) || 1000;
  const breakEvenEstimate = Math.round(basePrice * 0.75);

  const detailModal = document.getElementById("modal-lot-detail");
  const detailBody = document.getElementById("modal-lot-detail-content");

  if (detailModal && detailBody) {
    detailBody.innerHTML = `
      <div style="text-align: center; margin-bottom: 18px;">
        <div style="width: 56px; height: 56px; background: #fee2e2; color: #dc2626; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 28px; margin-bottom: 10px;">
          🚨
        </div>
        <h3 style="font-size: 1.35rem; font-weight: 800; color: #991b1b; margin-bottom: 4px;">Activate Emergency Sale</h3>
        <p style="font-size: 0.85rem; color: #64748b;">Instant Breakeven Recovery Protocol for Short Shelf-Life / Unsold Produce</p>
      </div>

      <div style="background: #fffbeb; border: 1.5px solid #fef3c7; border-radius: 12px; padding: 16px; margin-bottom: 18px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
          <span style="font-size: 0.88rem; font-weight: 700; color: #92400e;">Target Crop: ${lot.crop} (${lot.quantity})</span>
          <span class="badge" style="background: #fee2e2; color: #991b1b; font-weight: 800;">Low Shelf-Life</span>
        </div>
        <p style="font-size: 0.82rem; color: #78350f; line-height: 1.5; margin-bottom: 12px;">
          When standard buyers are not buying, activating this protocol broadcasts your lot to verified <strong>Food Processing Units</strong>, <strong>Institutional Caterers</strong>, and <strong>Bio-Compost Manufacturers</strong> who buy immediately to ensure you recover your production cost and achieve breakeven with zero loss.
        </p>

        <div style="background: #ffffff; padding: 12px; border-radius: 8px; border: 1px solid #fde68a; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.82rem;">
          <div>
            <span style="color: #64748b; display: block;">Original Expected:</span>
            <strong style="color: #0f172a; font-size: 1rem;">${lot.expectedPrice}</strong>
          </div>
          <div>
            <span style="color: #15803d; font-weight: 700; display: block;">Estimated Breakeven Offer:</span>
            <strong style="color: #15803d; font-size: 1rem;">~ ₹ ${breakEvenEstimate} /Qt (Guaranteed)</strong>
          </div>
        </div>
      </div>

      <div style="margin-bottom: 20px;">
        <h4 style="font-size: 0.85rem; font-weight: 800; color: #334155; margin-bottom: 8px;">Active Emergency Network on Standby:</h4>
        <div style="display: flex; flex-direction: column; gap: 6px; font-size: 0.8rem; color: #475569;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span>🥫</span> <strong>Food Processing Plants:</strong> Buy for pastes, purees & juices at ~75% breakeven.
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span>🍲</span> <strong>Institutional Caterers:</strong> Bulk daily consumption at ~72% breakeven.
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span>🌱</span> <strong>Bio-Compost & Fertilizer Units:</strong> Zero-waste purchase at ~65% breakeven.
          </div>
        </div>
      </div>

      <div style="display: flex; gap: 12px; justify-content: flex-end;">
        <button class="btn btn-outline" onclick="closeDetailModal()">Cancel</button>
        <button class="btn-emergency-action" style="padding: 10px 18px; font-size: 0.88rem;" onclick="confirmEmergencyActivation('${lot.id}')">
          ⚡ Broadcast Emergency Sale Now
        </button>
      </div>
    `;
    detailModal.classList.add("active");
  }
}

async function confirmEmergencyActivation(lotId) {
  const result = AgriNexEmergencySale.triggerEmergencySale(lotId, farmerData.listings);

  if (window.AgriNexAPI) {
    try {
      await AgriNexAPI.activateEmergencySale(lotId);
    } catch (err) {
      console.warn("Backend emergency activation fallback:", err.message);
    }
  }

  renderListings();
  closeDetailModal();
  showToast(`🚨 Emergency Sale Activated! ${result ? result.offersCount : 3} Instant Breakeven Offers Received.`);
  setTimeout(() => {
    openEmergencyOffersModal(lotId);
  }, 400);
}

/**
 * Open Emergency Offers Selection Modal
 */
function openEmergencyOffersModal(lotId) {
  const lot = farmerData.listings.find(l => l.id === lotId);
  if (!lot || !lot.emergencyOffers) return;

  const detailModal = document.getElementById("modal-lot-detail");
  const detailBody = document.getElementById("modal-lot-detail-content");

  if (detailModal && detailBody) {
    detailBody.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
        <div>
          <span class="badge badge-status-emergency">🚨 Emergency Salvage Mode Active</span>
          <h3 style="font-size: 1.3rem; font-weight: 800; color: #0f172a; margin-top: 4px;">${lot.crop} (${lot.quantity}) - Instant Salvage Offers</h3>
        </div>
        <button style="font-size: 1.5rem; color: #64748b; cursor: pointer; border: none; background: none;" onclick="closeDetailModal()">&times;</button>
      </div>

      <p style="font-size: 0.84rem; color: #64748b; margin-bottom: 16px;">
        Choose an instant emergency buyer below to lock payment and dispatch immediately to avoid crop spoilage loss:
      </p>

      <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px;">
        ${lot.emergencyOffers.map((o, idx) => `
          <div style="border: 1.5px solid ${idx === 0 ? '#15803d' : '#e2e8f0'}; background: ${idx === 0 ? '#f0fdf4' : '#ffffff'}; padding: 14px; border-radius: 12px; display: flex; align-items: center; justify-content: space-between; transition: transform 0.15s; flex-wrap: wrap; gap: 10px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="font-size: 24px;">${o.icon}</span>
              <div>
                <div style="display: flex; align-items: center; gap: 6px;">
                  <strong style="color: #0f172a; font-size: 0.92rem;">${window.tBuyer ? window.tBuyer(o.buyerName) : o.buyerName}</strong>
                  ${idx === 0 ? '<span class="badge badge-grade-a" style="font-size: 0.68rem; padding: 2px 6px;">Highest Breakeven</span>' : ''}
                </div>
                <div style="font-size: 0.76rem; color: #64748b; margin-top: 2px;">
                  ${o.buyerType} · 📍 ${o.location} · ⏱️ Instant Escrow Settlement
                </div>
              </div>
            </div>
            <div style="text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 6px;">
              <span style="font-size: 1.15rem; font-weight: 800; color: #15803d;">${o.offerPriceFormatted}</span>
              <button class="btn btn-primary" style="padding: 6px 12px; font-size: 0.78rem; background: ${idx === 0 ? '#15803d' : '#0c5a36'};" onclick="acceptEmergencyOffer('${lot.id}', '${o.buyerId}')">
                Accept & Settle Escrow →
              </button>
            </div>
          </div>
        `).join("")}
      </div>

      <div style="background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 0.78rem; color: #64748b; text-align: center;">
        🛡️ AgriNex Guarantee: All emergency buyers are pre-funded with locked escrow to protect farmers from zero-value waste.
      </div>
    `;
    detailModal.classList.add("active");
  }
}

async function acceptEmergencyOffer(lotId, buyerId) {
  const result = AgriNexEmergencySale.acceptEmergencyOffer(lotId, buyerId, farmerData.listings);

  if (window.AgriNexAPI) {
    try {
      await AgriNexAPI.acceptEmergencyOffer(lotId, buyerId);
    } catch (err) {
      console.warn("Backend emergency accept fallback:", err.message);
    }
  }

  renderListings();
  closeDetailModal();
  if (result && result.offer) {
    showToast(`✅ Emergency contract locked! ${result.offer.buyerName} has transferred ${result.offer.offerPriceFormatted} via Escrow.`);
  } else {
    showToast("✅ Emergency contract locked via Escrow!");
  }
}

function setupLocationChange() {
  const locChangeBtn = document.getElementById("btn-change-location");
  if (locChangeBtn) {
    locChangeBtn.addEventListener("click", () => {
      const newLoc = prompt("Enter your Mandi Location / Region:", "Lasalgaon, Nashik, Maharashtra");
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


async function syncListingsFromBackend() {
  try {
    if (window.AgriNexAPI) {
      const crops = await AgriNexAPI.getCrops();
      if (crops && crops.length > 0) {
        // Retrieve locally saved emergency state
        const storedEmergencyLots = window.AgriNexEmergencySale ? AgriNexEmergencySale.getEmergencyLots() : [];
        const emergencyMap = {};
        storedEmergencyLots.forEach(el => {
          if (el && el.id) emergencyMap[el.id] = el;
        });

        farmerData.listings = crops.map(c => {
          const emg = emergencyMap[c.id] || {};
          const isEmergency = Boolean(c.isEmergencySale || emg.isEmergencySale);
          const isSold = Boolean((c.status && c.status.includes("Sold")) || emg.isSold);
          const offers = c.emergencyOffers || emg.emergencyOffers || null;

          const cropTitle = (c.crop || c.crop_name || "Produce") + (c.variety ? ` (${c.variety})` : '');
          const qtyQt = c.quantity_qt || c.quantityNumber || 50;
          const priceQt = c.price_per_qt || c.expectedPriceNumber || 2000;
          const priceKg = c.price_per_kg ? c.price_per_kg : (priceQt / 100);

          let shelfLife = c.shelf_life || c.shelfLife || "14 Days";
          const lowerName = cropTitle.toLowerCase();
          if (lowerName.includes("tomato")) shelfLife = "3 Days (Perishable)";
          else if (lowerName.includes("chilli")) shelfLife = "5 Days (Perishable)";

          let currentStatus = c.status || "Active (Bids Open)";
          let currentStatusBadge = c.statusBadgeClass || "badge-status-open";
          let bestBidText = c.bestBid || `₹ ${(priceKg * 1.02).toFixed(2)} /kg (₹ ${Math.round(priceQt * 1.02).toLocaleString()} /Qt)`;
          let buyerText = c.buyerName || c.buyer_name || "Reliance Retail Hub";

          if (isSold) {
            currentStatus = c.status && c.status.includes("Sold") ? c.status : "✅ Sold (Under Escrow)";
            currentStatusBadge = "badge-status-dispatched";
          } else if (isEmergency) {
            currentStatus = "🚨 Emergency Sale Active";
            currentStatusBadge = "badge-status-emergency";
            if (emg.bestBid) bestBidText = emg.bestBid;
            if (emg.buyerName) buyerText = emg.buyerName;
          }

          return {
            id: c.id,
            crop: cropTitle,
            category: c.category || 'Vegetables',
            shelfLife: shelfLife,
            harvestDate: c.harvestDate || 'Current Season',
            image: c.image || c.image_url || 'assets/images/tomato.jpg',
            grade: c.grade || 'Grade A',
            gradeBadgeClass: c.grade === 'Grade B' ? 'badge-grade-b' : 'badge-grade-a',
            quantity: c.quantity || `${qtyQt} Qt (${(qtyQt * 100).toLocaleString()} kg)`,
            quantityNumber: qtyQt,
            expectedPrice: c.expectedPrice || `₹ ${priceKg.toFixed(2)} /kg (₹ ${priceQt.toLocaleString()} /Qt)`,
            expectedPriceNumber: priceQt,
            bestBid: bestBidText,
            bestBidNumber: Math.round(priceQt * 1.02),
            buyerName: buyerText,
            status: currentStatus,
            statusBadgeClass: currentStatusBadge,
            isEmergencySale: isEmergency && !isSold,
            emergencyOffers: offers,
            location: c.mandi || "Lasalgaon APMC Yard, Nashik"
          };
        });
        renderListings();
      }
    }
  } catch (e) {
    console.log("Using cached farmerData:", e.message);
  }
}

/**
 * Setup Navigation & Mobile Off-Canvas Drawer
 */
function setupNavigation() {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;

  // Create backdrop if not existing
  let backdrop = document.querySelector('.sidebar-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'sidebar-backdrop';
    document.body.appendChild(backdrop);
  }

  // Hamburger toggle click
  document.addEventListener('click', (e) => {
    const mobileToggle = e.target.closest('.mobile-sidebar-toggle') || e.target.closest('#mobile-sidebar-toggle');
    if (mobileToggle) {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = sidebar.classList.toggle('mobile-open');
      backdrop.classList.toggle('active', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      return;
    }

    // Backdrop click
    if (e.target.classList.contains('sidebar-backdrop')) {
      sidebar.classList.remove('mobile-open');
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
      return;
    }

    // Auto-close on nav item click on mobile
    if (window.innerWidth <= 1024 && e.target.closest('.sidebar .nav-item')) {
      sidebar.classList.remove('mobile-open');
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Escape key closes drawer
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('mobile-open')) {
      sidebar.classList.remove('mobile-open');
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

