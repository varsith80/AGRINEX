document.addEventListener("DOMContentLoaded", () => {
  renderListings();
  renderFPOHub();
  setupModals();
  setupNavigation();
  setupLocationChange();
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
            <h4 style="font-size: 1.05rem; font-weight: 800; color: #0f172a; margin-top: 6px;">${d.crop}</h4>
            <div style="font-size: 0.76rem; color: #64748b;">Buyer: <strong>${d.buyerName}</strong></div>
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
          <span style="color: #166534; font-weight: 700;">Corporate Buyer: ${demand.buyerName}</span>
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

  const result = AgriNexFPOHub.contributeToPool(demandId, "Ramesh Kumar", qty);
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

function renderListings() {
  const tableBody = document.getElementById("listings-tbody");
  if (!tableBody || !farmerData || !farmerData.listings) return;

  tableBody.innerHTML = farmerData.listings.map(item => {
    const isEmergency = item.isEmergencySale;
    const isSold = item.status && item.status.includes("Sold");

    return `
      <tr style="${isEmergency && !isSold ? 'background-color: #fffaf0;' : ''}">
        <td>
          <div class="crop-cell">
            <img src="${item.image}" alt="${item.crop}" class="crop-thumb" onerror="this.src='https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=150&auto=format&fit=crop&q=80'" />
            <div>
              <div class="crop-name">${item.crop}</div>
              ${isEmergency && !isSold ? '<span style="font-size: 0.7rem; color: #dc2626; font-weight: 800;">⚡ Emergency Salvage Active</span>' : ''}
            </div>
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
            <span class="price-main" style="${isEmergency ? 'color: #dc2626; font-weight: 800;' : ''}">${item.bestBid}</span>
            <span class="price-subtext">(${item.buyerName})</span>
          </div>
        </td>
        <td>
          <span class="badge ${item.statusBadgeClass}">${item.status}</span>
        </td>
        <td>
          <div style="display: flex; gap: 6px; align-items: center;">
            <button class="btn btn-outline btn-view-lot" onclick="openLotDetail('${item.id}')">View</button>
            ${!isSold && !isEmergency ? `
              <button class="btn-emergency-action" onclick="openEmergencyModal('${item.id}')" title="No buyers? Activate instant breakeven sale with food processors, composters & caterers">
                <span>🚨</span> Emergency Sale
              </button>
            ` : ''}
            ${isEmergency && !isSold ? `
              <button class="btn-emergency-action" style="background: #0c5a36;" onclick="openEmergencyOffersModal('${item.id}')" title="Review live salvage bids">
                <span>⚡</span> Offers (${item.emergencyOffers ? item.emergencyOffers.length : 3})
              </button>
            ` : ''}
          </div>
        </td>
      </tr>
    `;
  }).join("");
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

function confirmEmergencyActivation(lotId) {
  const result = AgriNexEmergencySale.triggerEmergencySale(lotId, farmerData.listings);
  if (result) {
    renderListings();
    closeDetailModal();
    showToast(`🚨 Emergency Sale Activated! ${result.offersCount} Instant Breakeven Offers Received.`);
    setTimeout(() => {
      openEmergencyOffersModal(lotId);
    }, 600);
  }
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
          <div style="border: 1.5px solid ${idx === 0 ? '#15803d' : '#e2e8f0'}; background: ${idx === 0 ? '#f0fdf4' : '#ffffff'}; padding: 14px; border-radius: 12px; display: flex; align-items: center; justify-content: space-between; transition: transform 0.15s;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <span style="font-size: 24px;">${o.icon}</span>
              <div>
                <div style="display: flex; align-items: center; gap: 6px;">
                  <strong style="color: #0f172a; font-size: 0.92rem;">${o.buyerName}</strong>
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

function acceptEmergencyOffer(lotId, buyerId) {
  const result = AgriNexEmergencySale.acceptEmergencyOffer(lotId, buyerId, farmerData.listings);
  if (result) {
    renderListings();
    closeDetailModal();
    showToast(`✅ Emergency contract locked! ${result.offer.buyerName} has transferred ${result.offer.offerPriceFormatted} via Escrow.`);
  }
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
