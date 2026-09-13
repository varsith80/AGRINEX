/**
 * AgriNex - Wholesale Buyer Dashboard Controller & Navigation
 * Includes Feature 4 (Real-Time Instant Search & Grade Filter), Feature 6 (Bid Counter-Negotiation Workflow), and KG Unit Integration
 */

// Global Filter State for Feature 4 & Unit System
let buyerFilterState = {
  search: '',
  grade: 'all',
  category: 'all',
  sort: 'default',
  unitDisplay: 'both' // 'both', 'kg', 'qt'
};

// Global Negotiation State for Feature 6
let currentNegotiation = {
  lotId: 'LOT-TOM-88',
  bidPrice: 1200,
  kgPrice: 12.00,
  escrowAmount: 21000
};

// Toast notification helper
function showToast(message, type = 'success') {
  const existing = document.getElementById('agrinex-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'agrinex-toast';
  toast.style.position = 'fixed';
  toast.style.bottom = '24px';
  toast.style.right = '24px';
  toast.style.zIndex = '99999';
  toast.style.background = type === 'success' ? '#0c5a36' : '#991b1b';
  toast.style.color = '#ffffff';
  toast.style.padding = '12px 20px';
  toast.style.borderRadius = '10px';
  toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
  toast.style.fontWeight = '700';
  toast.style.fontSize = '0.88rem';
  toast.style.display = 'flex';
  toast.style.alignItems = 'center';
  toast.style.gap = '8px';
  toast.innerHTML = `<span>✓</span> <span>${message}</span>`;

  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 4000);
}

// Modular View Switcher
function switchView(viewId) {
  const views = document.querySelectorAll('.portal-view');
  views.forEach((v) => v.classList.remove('active-view'));

  const target = document.getElementById(viewId);
  if (target) {
    target.classList.add('active-view');
  }

  // Update sidebar active nav item
  const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
  navItems.forEach((item) => {
    if (item.getAttribute('data-view') === viewId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Scroll to top of main wrapper
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Setup Sidebar Click Handlers
function setupSidebarNav() {
  const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      const viewId = item.getAttribute('data-view');
      if (viewId) {
        switchView(viewId);
      }
    });
  });
}

// ==========================================
// FEATURE 4: INSTANT SEARCH, GRADE & KG UNIT FILTER
// ==========================================

// Global Search handler from Top Navbar
function handleBuyerSearch(query) {
  buyerFilterState.search = (query || '').trim().toLowerCase();
  
  // If user is searching and not currently in verified produce view, switch to it
  const activeView = document.querySelector('.portal-view.active-view');
  if (buyerFilterState.search && activeView && activeView.id !== 'view-verified-produce' && activeView.id !== 'view-dashboard') {
    switchView('view-verified-produce');
  }

  applyFilters();
}

// Unit Display Toggle Handler (Qt vs kg vs Both)
function setUnitDisplay(unitMode, btnElement) {
  buyerFilterState.unitDisplay = unitMode;

  const btns = document.querySelectorAll('.unit-toggle-btn');
  btns.forEach((b) => {
    b.classList.remove('active');
    b.style.background = '#ffffff';
    b.style.color = '#334155';
    b.style.borderColor = '#cbd5e1';
  });

  if (btnElement) {
    btnElement.classList.add('active');
    btnElement.style.background = '#0c5a36';
    btnElement.style.color = '#ffffff';
    btnElement.style.borderColor = '#0c5a36';
  }

  applyFilters();
  showToast(`Produce catalog unit display changed to: ${unitMode === 'kg' ? 'Kilograms (kg)' : unitMode === 'qt' ? 'Quintals (Qt)' : 'Dual (Qt + kg)'}`);
}

// Grade Filter Pill Click Handler
function filterByGrade(gradeKey, btnElement) {
  buyerFilterState.grade = gradeKey;

  // Update pill active visual states
  const pills = document.querySelectorAll('#grade-filter-group .filter-pill');
  pills.forEach((pill) => {
    pill.classList.remove('active');
    pill.style.background = '#ffffff';
    pill.style.color = '#334155';
    pill.style.borderColor = '#cbd5e1';
  });

  if (btnElement) {
    btnElement.classList.add('active');
    btnElement.style.background = '#0c5a36';
    btnElement.style.color = '#ffffff';
    btnElement.style.borderColor = '#0c5a36';
  }

  applyFilters();
}

// Master Filter & Sorter Application
function applyFilters() {
  if (!buyerData.verifiedLots) return;

  const catSelect = document.getElementById('filter-category');
  const sortSelect = document.getElementById('filter-sort');

  if (catSelect) buyerFilterState.category = catSelect.value;
  if (sortSelect) buyerFilterState.sort = sortSelect.value;

  let filtered = [...buyerData.verifiedLots];

  // 1. Filter by Search Query
  if (buyerFilterState.search) {
    const q = buyerFilterState.search;
    filtered = filtered.filter((lot) => {
      return (
        lot.crop.toLowerCase().includes(q) ||
        lot.farmerName.toLowerCase().includes(q) ||
        lot.farmerLocation.toLowerCase().includes(q) ||
        lot.id.toLowerCase().includes(q) ||
        (lot.category && lot.category.toLowerCase().includes(q)) ||
        (lot.grade && lot.grade.toLowerCase().includes(q))
      );
    });
  }

  // 2. Filter by Grade Pill
  if (buyerFilterState.grade && buyerFilterState.grade !== 'all') {
    filtered = filtered.filter((lot) => lot.gradeKey === buyerFilterState.grade);
  }

  // 3. Filter by Category Dropdown
  if (buyerFilterState.category && buyerFilterState.category !== 'all') {
    filtered = filtered.filter((lot) => lot.category === buyerFilterState.category);
  }

  // 4. Sort
  if (buyerFilterState.sort === 'price-asc') {
    filtered.sort((a, b) => a.priceNum - b.priceNum);
  } else if (buyerFilterState.sort === 'price-desc') {
    filtered.sort((a, b) => b.priceNum - a.priceNum);
  } else if (buyerFilterState.sort === 'rating') {
    filtered.sort((a, b) => parseFloat(b.farmerRating) - parseFloat(a.farmerRating));
  } else if (buyerFilterState.sort === 'savings') {
    filtered.sort((a, b) => parseFloat(b.savings) - parseFloat(a.savings));
  }

  renderVerifiedLots(filtered);
}

// Reset all filters
function resetBuyerFilters() {
  buyerFilterState = {
    search: '',
    grade: 'all',
    category: 'all',
    sort: 'default',
    unitDisplay: 'both'
  };

  const searchInput = document.getElementById('buyer-global-search');
  if (searchInput) searchInput.value = '';

  const catSelect = document.getElementById('filter-category');
  if (catSelect) catSelect.value = 'all';

  const sortSelect = document.getElementById('filter-sort');
  if (sortSelect) sortSelect.value = 'default';

  const allPill = document.querySelector('#grade-filter-group .filter-pill');
  if (allPill) filterByGrade('all', allPill);
  else applyFilters();

  showToast('Filters reset to show all lots');
}

// Render Verified Farmer Lots in Table (Full & Dashboard preview with KG unit support)
function renderVerifiedLots(lotsToRender = null) {
  const tbody = document.getElementById('verified-lots-tbody');
  const dashTbody = document.getElementById('dashboard-lots-tbody');
  const countBadge = document.getElementById('lots-count-badge');
  
  if (!buyerData.verifiedLots) return;
  const lots = lotsToRender !== null ? lotsToRender : buyerData.verifiedLots;
  const unitMode = buyerFilterState.unitDisplay || 'both';

  // Update badge count
  if (countBadge) {
    countBadge.textContent = `Showing ${lots.length} of ${buyerData.verifiedLots.length} Verified Lots`;
  }

  if (tbody) {
    if (lots.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 40px 20px; color: #64748b;">
            <div style="font-size: 2rem; margin-bottom: 8px;">🌾</div>
            <strong style="font-size: 1rem; color: #0f172a; display: block; margin-bottom: 4px;">No matching farmer lots found</strong>
            <p style="font-size: 0.82rem; margin-bottom: 12px;">Try adjusting your search query, grade tier, or category filter.</p>
            <button class="btn btn-outline btn-sm" onclick="resetBuyerFilters()">Reset All Filters</button>
          </td>
        </tr>
      `;
    } else {
      tbody.innerHTML = lots
        .map((lot) => {
          const kgRate = (lot.priceNum / 100).toFixed(2);
          const totalKg = (lot.qtyNum * 100).toLocaleString('en-IN');
          const mandiNum = parseFloat(lot.mandiRate.replace(/[^0-9.]/g, '')) || 0;
          const mandiKgRate = (mandiNum / 100).toFixed(2);

          // Quantity Cell formatting based on active unit mode
          let qtyHtml = '';
          if (unitMode === 'kg') {
            qtyHtml = `<strong style="font-size: 0.92rem; color: #0f172a;">${totalKg} kg</strong><span style="font-size: 0.72rem; color: #64748b; display: block;">(${lot.quantity})</span>`;
          } else if (unitMode === 'qt') {
            qtyHtml = `<strong style="font-size: 0.92rem; color: #0f172a;">${lot.quantity}</strong>`;
          } else {
            qtyHtml = `<strong style="font-size: 0.92rem; color: #0f172a;">${lot.quantity}</strong><span style="font-size: 0.72rem; color: #64748b; font-weight: 600; display: block;">(${totalKg} kg)</span>`;
          }

          // Price Cell formatting based on active unit mode
          let priceHtml = '';
          if (unitMode === 'kg') {
            priceHtml = `
              <strong style="color: #0c5a36; font-size: 0.96rem;">₹ ${kgRate} /kg</strong>
              <div style="font-size: 0.7rem; color: #64748b; text-decoration: line-through;">Mandi: ₹ ${mandiKgRate} /kg</div>
              <span style="font-size: 0.68rem; color: #64748b;">(${lot.askPrice})</span>
            `;
          } else if (unitMode === 'qt') {
            priceHtml = `
              <strong style="color: #0c5a36; font-size: 0.96rem;">${lot.askPrice}</strong>
              <div style="font-size: 0.7rem; color: #64748b; text-decoration: line-through;">Mandi: ${lot.mandiRate}</div>
            `;
          } else {
            priceHtml = `
              <div style="display: flex; align-items: baseline; gap: 4px; flex-wrap: wrap;">
                <strong style="color: #0c5a36; font-size: 0.96rem;">${lot.askPrice}</strong>
                <span style="background: #e8f5ed; color: #166534; font-size: 0.72rem; font-weight: 800; padding: 1px 6px; border-radius: 4px; border: 1px solid #bbf7d0;">₹ ${kgRate} /kg</span>
              </div>
              <div style="font-size: 0.7rem; color: #64748b; margin-top: 2px;">
                Mandi: <span style="text-decoration: line-through;">${lot.mandiRate}</span> <span style="color: #64748b;">(₹ ${mandiKgRate}/kg)</span>
              </div>
            `;
          }

          return `
            <tr>
              <td>
                <div class="crop-cell">
                  <img src="${lot.image}" alt="${lot.crop}" class="crop-thumb" onerror="this.src='assets/images/tomato.jpg'" />
                  <div>
                    <strong style="display: block; font-size: 0.88rem; color: #0f172a;">${lot.crop}</strong>
                    <span style="font-size: 0.72rem; color: #64748b;">${lot.id} • ${lot.farmerLocation}</span>
                  </div>
                </div>
              </td>
              <td>
                <span class="badge ${lot.gradeBadgeClass}">${lot.grade}</span>
                <div style="font-size: 0.7rem; color: #64748b; margin-top: 2px;">Moisture: ${lot.moisture}</div>
              </td>
              <td>
                <strong>${lot.farmerName}</strong>
                <div style="font-size: 0.72rem; color: #d97706; font-weight: 700;">${lot.farmerRating}</div>
              </td>
              <td>
                ${qtyHtml}
              </td>
              <td>
                ${priceHtml}
              </td>
              <td>
                <span class="badge badge-grade-a">${lot.savings}</span>
              </td>
              <td>
                <div style="display: flex; gap: 6px;">
                  <button class="btn btn-primary btn-sm" onclick="openDirectBuyModal('${lot.id}')" style="padding: 5px 10px; font-size: 0.78rem;">
                    Buy (Escrow)
                  </button>
                  <button class="btn btn-outline btn-sm" onclick="openBidModal('${lot.id}')" style="padding: 5px 10px; font-size: 0.78rem;">
                    Bid
                  </button>
                </div>
              </td>
            </tr>
          `;
        })
        .join('');
    }
  }

  // Dashboard preview (always top 3)
  if (dashTbody) {
    dashTbody.innerHTML = buyerData.verifiedLots
      .slice(0, 3)
      .map((lot) => {
        const kgRate = (lot.priceNum / 100).toFixed(2);
        return `
          <tr>
            <td>
              <div class="crop-cell">
                <img src="${lot.image}" alt="${lot.crop}" class="crop-thumb" onerror="this.src='assets/images/tomato.jpg'" />
                <div>
                  <strong style="display: block; font-size: 0.85rem; color: #0f172a;">${lot.crop}</strong>
                  <span style="font-size: 0.7rem; color: #64748b;">${lot.farmerLocation}</span>
                </div>
              </div>
            </td>
            <td><span class="badge ${lot.gradeBadgeClass}">${lot.grade}</span></td>
            <td><strong>${lot.farmerName}</strong></td>
            <td>
              <strong>${lot.quantity}</strong>
              <div style="font-size: 0.68rem; color: #64748b;">${(lot.qtyNum * 100).toLocaleString('en-IN')} kg</div>
            </td>
            <td>
              <strong style="color: #0c5a36;">${lot.askPrice}</strong>
              <div style="font-size: 0.68rem; color: #166534; font-weight: 700;">₹ ${kgRate}/kg</div>
            </td>
            <td>
              <button class="btn btn-primary btn-sm" onclick="openDirectBuyModal('${lot.id}')" style="padding: 4px 8px; font-size: 0.75rem;">
                Buy
              </button>
            </td>
          </tr>
        `;
      })
      .join('');
  }
}


// Render Active Bulk Procurement Demands
function renderBuyerDemands() {
  const container = document.getElementById('demands-list-container');
  if (!container || !buyerData.buyerDemands) return;

  container.innerHTML = buyerData.buyerDemands
    .map((dem) => {
      return `
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 12px; display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <img src="${dem.image}" alt="${dem.crop}" style="width: 44px; height: 44px; border-radius: 8px; object-fit: cover; border: 1px solid #e2e8f0;" onerror="this.src='assets/images/tomato.jpg'" />
            <div>
              <strong style="font-size: 0.95rem; color: #0f172a;">${dem.crop} (${dem.tonnage})</strong>
              <div style="font-size: 0.76rem; color: #64748b; margin-top: 2px;">
                Target: <strong style="color: #0c5a36;">${dem.targetPrice}</strong> • Destination: ${dem.location} • Deadline: ${dem.deadline}
              </div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="badge badge-grade-a" style="font-size: 0.76rem;">${dem.matchedCount} Matching Lots in Radius</span>
            <button class="btn btn-outline btn-sm" onclick="switchView('view-verified-produce')" style="font-size: 0.78rem;">
              Source from Lots &rarr;
            </button>
          </div>
        </div>
      `;
    })
    .join('');
}

// Chat Messaging Functionality
function sendChatMessage() {
  const input = document.getElementById('chat-input-field');
  const container = document.getElementById('chat-messages-container');
  if (!input || !container || !input.value.trim()) return;

  const msg = input.value.trim();
  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble outgoing';
  bubble.textContent = msg;
  container.appendChild(bubble);

  input.value = '';
  container.scrollTop = container.scrollHeight;

  // Auto farmer reply after 1s
  setTimeout(() => {
    const reply = document.createElement('div');
    reply.className = 'chat-bubble incoming';
    reply.textContent = "Thank you for confirming! I am preparing the dispatch consignment and loading the vehicle.";
    container.appendChild(reply);
    container.scrollTop = container.scrollHeight;
  }, 1000);
}

// Direct Buy Escrow Modal
function openDirectBuyModal(lotId) {
  const lot = buyerData.verifiedLots.find((l) => l.id === lotId) || buyerData.verifiedLots[0];
  const modal = document.getElementById('modal-direct-buy');
  if (!modal) return;

  const totalKg = (lot.qtyNum * 100).toLocaleString('en-IN');
  const kgRate = (lot.priceNum / 100).toFixed(2);

  document.getElementById('buy-modal-crop').textContent = `${lot.crop} (${lot.quantity} • ${totalKg} kg)`;
  document.getElementById('buy-modal-farmer').textContent = `Farmer: ${lot.farmerName} (${lot.farmerLocation})`;
  document.getElementById('buy-modal-price').innerHTML = `${lot.askPrice} <span style="font-size: 0.8rem; background: #e8f5ed; color: #166534; padding: 2px 6px; border-radius: 4px; border: 1px solid #bbf7d0;">(₹ ${kgRate} /kg)</span>`;
  document.getElementById('buy-modal-lot-id').value = lot.id;

  modal.classList.add('active');
}

function closeDirectBuyModal() {
  const modal = document.getElementById('modal-direct-buy');
  if (modal) modal.classList.remove('active');
}

// ==========================================
// FEATURE 6: BID COUNTER-NEGOTIATION WORKFLOW
// ==========================================

// Open Counter Bid Modal with dynamic KG price preview
function openBidModal(lotId) {
  const lot = buyerData.verifiedLots.find((l) => l.id === lotId) || buyerData.verifiedLots[0];
  const modal = document.getElementById('modal-counter-bid');
  if (!modal) return;

  const kgRate = (lot.priceNum / 100).toFixed(2);
  const totalKg = (lot.qtyNum * 100).toLocaleString('en-IN');

  document.getElementById('bid-modal-crop').textContent = `${lot.crop} (${lot.quantity} • ${totalKg} kg)`;
  document.getElementById('bid-modal-ask').innerHTML = `Farmer Ask: <strong>${lot.askPrice}</strong> <span style="color: #0c5a36;">(₹ ${kgRate} /kg)</span>`;
  document.getElementById('bid-modal-lot-id').value = lot.id;

  // Suggest a counter price ~6% below ask price
  const suggestedCounter = Math.round(lot.priceNum * 0.94);
  const counterInput = document.getElementById('counter-bid-price');
  if (counterInput) {
    counterInput.value = suggestedCounter;
  }
  updateBidKgPreview(suggestedCounter);

  modal.classList.add('active');
}

function updateBidKgPreview(bidVal) {
  const lotId = document.getElementById('bid-modal-lot-id')?.value;
  const lot = buyerData.verifiedLots.find((l) => l.id === lotId) || buyerData.verifiedLots[0];
  const num = parseFloat(bidVal) || 0;
  const kgRate = (num / 100).toFixed(2);
  const totalCost = Math.round(num * lot.qtyNum);
  const totalKg = (lot.qtyNum * 100).toLocaleString('en-IN');
  const previewEl = document.getElementById('counter-bid-kg-preview');
  if (previewEl) {
    previewEl.innerHTML = `<span>⚖️ <strong>₹ ${kgRate} /kg</strong> • Total Lot Value: <strong>₹ ${totalCost.toLocaleString('en-IN')}</strong> (${totalKg} kg)</span>`;
  }
}

function closeBidModal() {
  const modal = document.getElementById('modal-counter-bid');
  if (modal) modal.classList.remove('active');
}

// Open WhatsApp / SMS Live Negotiation Modal with KG breakdown
function openNegotiationModal(lotId, bidPrice) {
  const lot = buyerData.verifiedLots.find((l) => l.id === lotId) || buyerData.verifiedLots[0];
  const modal = document.getElementById('modal-negotiation-feedback');
  if (!modal) return;

  const numericPrice = Number(bidPrice) || lot.priceNum;
  const kgRate = (numericPrice / 100).toFixed(2);
  const totalKg = (lot.qtyNum * 100).toLocaleString('en-IN');
  const escrowAdvance = Math.round(lot.qtyNum * numericPrice * 0.35);

  currentNegotiation = {
    lotId: lot.id,
    lotCrop: lot.crop,
    farmerName: lot.farmerName,
    bidPrice: numericPrice,
    kgPrice: kgRate,
    totalKg: totalKg,
    escrowAmount: escrowAdvance
  };

  // Populate dynamic fields
  const nameEl = document.getElementById('sim-farmer-name');
  if (nameEl) nameEl.textContent = lot.farmerName;

  const phoneEl = document.getElementById('sim-farmer-phone');
  if (phoneEl) phoneEl.textContent = `${lot.farmerPhone} • ${lot.farmerLocation}`;

  const msgEl = document.getElementById('sim-farmer-msg');
  if (msgEl) {
    msgEl.innerHTML = `&ldquo;Namaste Karthik sir! I received your counter-bid of <strong>₹ ${numericPrice.toLocaleString('en-IN')}/Qt (₹ ${kgRate}/kg)</strong> for ${lot.quantity} (${totalKg} kg) ${lot.crop}. I am ready to dispatch if you lock the 35% advance escrow (<strong>₹ ${escrowAdvance.toLocaleString('en-IN')}</strong>) today.&rdquo;`;
  }

  const rateEl = document.getElementById('sim-agreed-rate');
  if (rateEl) rateEl.innerHTML = `₹ ${numericPrice.toLocaleString('en-IN')} /Qt <span style="font-size: 0.76rem; color: #166534; font-weight: 700;">(₹ ${kgRate} /kg)</span>`;

  const escrowEl = document.getElementById('sim-escrow-amount');
  if (escrowEl) escrowEl.textContent = `₹ ${escrowAdvance.toLocaleString('en-IN')}`;

  const dateEl = document.getElementById('sim-delivery-date');
  if (dateEl) dateEl.textContent = '22 Sep 2026 (Ready at Farm-Gate)';

  modal.classList.add('active');
}

function closeNegotiationModal() {
  const modal = document.getElementById('modal-negotiation-feedback');
  if (modal) modal.classList.remove('active');
}

// Accept Counter Offer directly from In-Chat banner
function acceptFarmerCounter(lotId, agreedRate) {
  openNegotiationModal(lotId, agreedRate);
}

// Confirm 35% Escrow from Negotiation modal
function confirmEscrowFromCounter() {
  closeNegotiationModal();
  showToast(`35% Advance Escrow (₹ ${currentNegotiation.escrowAmount.toLocaleString('en-IN')}) locked! Contract created with ${currentNegotiation.farmerName || 'Farmer'}.`);
  switchView('view-consignments');
}

// Post Demand Modal
function openPostDemandModal() {
  const modal = document.getElementById('modal-post-demand');
  if (modal) modal.classList.add('active');
}

function closePostDemandModal() {
  const modal = document.getElementById('modal-post-demand');
  if (modal) modal.classList.remove('active');
}

// Location Switcher
function initLocationSwitcher() {
  const locBtn = document.getElementById('btn-change-buyer-location');
  const locText = document.getElementById('buyer-location-text');
  if (!locBtn || !locText) return;

  const locations = ["Hosur Hub, TN", "Navi Mumbai Hub", "Kolar Hub, KA", "Guntur Yard, AP", "Azadpur Terminal, DL"];
  let currIdx = 0;

  locBtn.addEventListener('click', () => {
    currIdx = (currIdx + 1) % locations.length;
    locText.textContent = locations[currIdx];
    showToast(`Active procurement hub updated to ${locations[currIdx]}`);
  });
}

// ==========================================
// LOGISTICS, LORRY RECEIPT & ESCROW RELEASE
// ==========================================

// Global state for active arrival release
let activeArrivalDisbursement = {
  trackingId: 'TRK-EXP-9921-TN',
  crop: 'Tomato (Shivam Hybrid)',
  amount: 39000,
  farmer: 'Murugan Palanisamy'
};

function openLorryReceiptModal(trackingId) {
  const modal = document.getElementById('modal-lorry-receipt');
  if (!modal) return;
  if (trackingId) {
    const titleEl = document.getElementById('lr-id-display');
    const subEl = document.getElementById('lr-tracking-subtitle');
    if (titleEl) titleEl.textContent = trackingId;
    if (subEl) subEl.textContent = `LR No: LR-${trackingId.slice(4)} • AgriNex Logistics System`;
  }
  modal.classList.add('active');
}

function closeLorryReceiptModal() {
  const modal = document.getElementById('modal-lorry-receipt');
  if (modal) modal.classList.remove('active');
}

function printLorryReceipt() {
  showToast('Generating official AgriNex Digital Lorry Receipt PDF with QR verification seal...');
  setTimeout(() => {
    closeLorryReceiptModal();
    showToast('✓ Lorry Receipt & Digital Gate Pass downloaded successfully!');
  }, 900);
}

function openArrivalReleaseModal(trackingId, crop, amount, farmer) {
  activeArrivalDisbursement = {
    trackingId: trackingId || 'TRK-EXP-9921-TN',
    crop: crop || 'Tomato (Shivam Hybrid)',
    amount: amount || 39000,
    farmer: farmer || 'Murugan Palanisamy'
  };

  const modal = document.getElementById('modal-confirm-arrival');
  if (!modal) return;

  const trackEl = document.getElementById('arrival-tracking-id');
  const releaseEl = document.getElementById('arrival-release-val');
  if (trackEl) trackEl.textContent = `Consignment #${activeArrivalDisbursement.trackingId} • ${activeArrivalDisbursement.crop}`;
  if (releaseEl) releaseEl.textContent = `₹ ${activeArrivalDisbursement.amount.toLocaleString('en-IN')}`;

  modal.classList.add('active');
}

function closeArrivalReleaseModal() {
  const modal = document.getElementById('modal-confirm-arrival');
  if (modal) modal.classList.remove('active');
}

function confirmReleaseEscrowAction() {
  closeArrivalReleaseModal();
  const amtStr = `₹ ${activeArrivalDisbursement.amount.toLocaleString('en-IN')}`;

  // Update Escrow status and Stepper if present
  const statusBadge = document.getElementById('escrow-status-badge');
  if (statusBadge) {
    statusBadge.className = 'badge badge-grade-a';
    statusBadge.textContent = '100% Settled & Released';
  }

  const dotSettled = document.getElementById('stepper-dot-settled');
  if (dotSettled) {
    dotSettled.className = 'stepper-dot active';
    dotSettled.textContent = '✓';
  }

  const btnVault = document.getElementById('btn-escrow-vault-release');
  if (btnVault) {
    btnVault.disabled = true;
    btnVault.textContent = '✓ 100% Escrow Settled';
    btnVault.style.background = '#15803d';
    btnVault.style.borderColor = '#15803d';
  }

  const btnArrival = document.getElementById('btn-arrival-release-1');
  if (btnArrival) {
    btnArrival.textContent = '✓ Delivered & Released';
    btnArrival.disabled = true;
    btnArrival.style.background = '#15803d';
    btnArrival.style.borderColor = '#15803d';
  }

  const settledTotalEl = document.getElementById('escrow-settled-total');
  if (settledTotalEl) {
    settledTotalEl.textContent = '₹ 6,40,000';
  }

  showToast(`🎉 Quality verified! ${amtStr} released to ${activeArrivalDisbursement.farmer}. Contract 100% Settled!`, 'success');
}

function openGatePassModal(trackingId) {
  openLorryReceiptModal(trackingId);
  const cropEl = document.getElementById('lr-crop-title');
  const vehEl = document.getElementById('lr-vehicle-display');
  const driverEl = document.getElementById('lr-driver-display');
  if (cropEl) cropEl.textContent = '80 Qt Red Onion (Nashik Export Quality)';
  if (vehEl) vehEl.textContent = 'Eicher Pro 2049 (MH 15 DK 8810)';
  if (driverEl) driverEl.textContent = 'Sanjay Patil (+91 98220-44911)';
}

function openGpsModal(trackingId, vehicle, driver, corridor) {
  const modal = document.getElementById('modal-gps-tracker');
  if (!modal) return;

  const trackNumEl = document.getElementById('gps-tracking-num');
  const vehEl = document.getElementById('gps-vehicle-name');
  const driverEl = document.getElementById('gps-driver-name');
  const corridorEl = document.getElementById('gps-corridor-name');

  if (trackNumEl) trackNumEl.textContent = trackingId || 'TRK-MH-4412-EICHER';
  if (vehEl) vehEl.textContent = vehicle || 'Eicher Pro 2049 (MH 15 DK 8810)';
  if (driverEl) driverEl.textContent = driver || 'Sanjay Patil';
  if (corridorEl) corridorEl.textContent = corridor || 'NH 48 Pune-Bengaluru Corridor';

  modal.classList.add('active');
}

function closeGpsModal() {
  const modal = document.getElementById('modal-gps-tracker');
  if (modal) modal.classList.remove('active');
}

// Grievances & Claims Redressal System
function openGrievanceModal() {
  const modal = document.getElementById('modal-file-grievance');
  if (modal) modal.classList.add('active');
}

function closeGrievanceModal() {
  const modal = document.getElementById('modal-file-grievance');
  if (modal) modal.classList.remove('active');
}

function handleGrievanceFileUpload(input) {
  const label = document.getElementById('grv-upload-label');
  if (input.files && input.files[0] && label) {
    label.innerHTML = `✅ Attached: <strong>${input.files[0].name}</strong> (${(input.files[0].size / 1024).toFixed(1)} KB)`;
    label.style.color = '#0c5a36';
  }
}

function filterGrievance(status, btnElement) {
  const buttons = document.querySelectorAll('.grv-filter-btn');
  buttons.forEach(btn => {
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-outline');
  });

  if (btnElement) {
    btnElement.classList.remove('btn-outline');
    btnElement.classList.add('btn-primary');
  }

  renderGrievances(status);
}

function acceptGrievanceResolution(grvId) {
  if (!buyerData.grievances) return;
  const grv = buyerData.grievances.find(g => g.id === grvId);
  if (grv) {
    grv.status = "Resolved & Refunded";
    grv.statusClass = "badge-grade-a";
    grv.resolutionEta = "Closed";
    grv.timeline = [
      { step: "Grievance Raised", done: true, time: "12 Sep, 10:15 AM" },
      { step: "Escrow Settlement Frozen", done: true, time: "12 Sep, 10:16 AM" },
      { step: "AI Assay & Photo Review", done: true, time: "12 Sep, 11:30 AM" },
      { step: "Settlement Agreed & Credited", done: true, time: "Just now" }
    ];
    showToast(`Dispute ${grvId} settled! ₹ 3,900 rebate credit disbursed to your AgriNex wallet.`);
    renderGrievances();
  }
}

function renderGrievances(filterStatus = 'all') {
  const container = document.getElementById('grievances-list-container');
  if (!container || !buyerData.grievances) return;

  let grievances = [...buyerData.grievances];
  if (filterStatus === 'open') {
    grievances = grievances.filter(g => g.status === 'Under Review');
  } else if (filterStatus === 'resolved') {
    grievances = grievances.filter(g => g.status.includes('Resolved'));
  }

  // Update Summary Counts
  const openCount = buyerData.grievances.filter(g => g.status === 'Under Review').length;
  const resolvedCount = buyerData.grievances.filter(g => g.status.includes('Resolved')).length;

  const countBadgeEl = document.getElementById('grv-active-count');
  if (countBadgeEl) countBadgeEl.textContent = `${openCount} Case${openCount === 1 ? '' : 's'}`;

  const resolvedBadgeEl = document.getElementById('grv-resolved-count');
  if (resolvedBadgeEl) resolvedBadgeEl.textContent = `${resolvedCount} Case${resolvedCount === 1 ? '' : 's'}`;

  if (grievances.length === 0) {
    container.innerHTML = `
      <div style="background: #ffffff; border-radius: 12px; border: 1px solid var(--border-default); padding: 40px 20px; text-align: center; color: #64748b;">
        <div style="font-size: 2.2rem; margin-bottom: 8px;">🛡️</div>
        <h4 style="font-size: 1.05rem; font-weight: 700; color: #0f172a; margin-bottom: 4px;">No Grievances Found</h4>
        <p style="font-size: 0.85rem;">All your consignments and quality assays are running smoothly without active disputes.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = grievances.map(grv => {
    const isUnderReview = grv.status === 'Under Review';
    const statusBg = isUnderReview ? '#fef3c7' : '#dcfce7';
    const statusColor = isUnderReview ? '#b45309' : '#15803d';
    const statusDot = isUnderReview ? '🟡' : '✅';

    const timelineHtml = (grv.timeline || []).map((tl, idx) => `
      <div class="stepper-step" style="flex: 1; text-align: center; position: relative;">
        <div class="stepper-dot ${tl.done ? 'active' : ''}" style="margin: 0 auto 6px auto; ${tl.done ? 'background: #0c5a36; color: #fff;' : 'background: #e2e8f0; color: #64748b;'}">
          ${tl.done ? '✓' : (idx + 1)}
        </div>
        <div class="stepper-label" style="font-size: 0.72rem; font-weight: 700; color: ${tl.done ? '#0f172a' : '#94a3b8'};">
          ${tl.step}
        </div>
        <div style="font-size: 0.65rem; color: #64748b; margin-top: 2px;">
          ${tl.time}
        </div>
      </div>
    `).join('');

    return `
      <div class="stat-card" style="padding: 20px; border: 1px solid var(--border-default); background: #ffffff; border-radius: 14px; box-shadow: var(--shadow-sm);">
        <!-- Top Row Header -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px; margin-bottom: 14px; padding-bottom: 12px; border-bottom: 1px solid var(--border-subtle);">
          <div>
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
              <span style="font-family: monospace; font-weight: 800; color: #0c5a36; font-size: 0.95rem; background: #e8f5e9; padding: 2px 8px; border-radius: 6px;">
                ${grv.id}
              </span>
              <span style="background: ${statusBg}; color: ${statusColor}; font-weight: 700; font-size: 0.75rem; padding: 3px 10px; border-radius: 20px; display: inline-flex; align-items: center; gap: 4px;">
                ${statusDot} ${grv.status}
              </span>
              <span style="font-size: 0.75rem; color: #64748b;">
                Filed: ${grv.dateFiled}
              </span>
            </div>
            <div style="font-size: 0.85rem; color: #334155; font-weight: 600;">
              Consignment: <strong>${grv.consignmentId || 'LOT-CONS-992'}</strong> • ${grv.crop}
            </div>
          </div>

          <div style="text-align: right;">
            <span style="font-size: 0.75rem; color: #64748b; display: block;">Farmer / Source</span>
            <strong style="font-size: 0.88rem; color: #0f172a;">${grv.farmerName}</strong>
          </div>
        </div>

        <!-- Issue Category & Description -->
        <div style="background: #f8fafc; border-left: 4px solid ${isUnderReview ? '#f59e0b' : '#10b981'}; border-radius: 6px; padding: 12px 14px; margin-bottom: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span style="font-size: 0.78rem; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 0.04em;">
              Dispute Category: <span style="color: #0f172a;">${grv.category}</span>
            </span>
            <span style="font-size: 0.78rem; font-weight: 700; color: #dc2626; background: #fee2e2; padding: 2px 8px; border-radius: 4px;">
              🔒 ${grv.amountUnderHold}
            </span>
          </div>
          <div style="font-size: 0.82rem; color: #1e293b; line-height: 1.45;">
            ${grv.description}
          </div>
        </div>

        <!-- 4-Step Interactive Timeline Stepper -->
        <div style="margin-bottom: 18px; padding: 12px 6px; background: #fdfefe; border: 1px solid #f1f5f9; border-radius: 10px;">
          <div style="font-size: 0.72rem; font-weight: 700; color: #64748b; text-transform: uppercase; margin-bottom: 12px; padding-left: 8px;">
            Redressal Progress & Smart Contract Milestones:
          </div>
          <div class="stepper" style="display: flex; justify-content: space-between; position: relative;">
            ${timelineHtml}
          </div>
        </div>

        <!-- Action Buttons -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; padding-top: 10px; border-top: 1px solid var(--border-subtle);">
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-outline btn-sm" onclick="showToast('Loading digital assay certificate & weighbridge audit slip for ${grv.id}...', 'success')">
              📄 View Evidence Dossier
            </button>
            <button class="btn btn-outline btn-sm" onclick="switchView('view-messages'); showToast('Opening direct grievance chat channel with AgriNex QA Desk...');">
              💬 Message Arbitrator
            </button>
          </div>

          ${isUnderReview ? `
            <button class="btn btn-primary btn-sm" onclick="acceptGrievanceResolution('${grv.id}')" style="background: #059669; border-color: #059669;">
              ✓ Settle & Accept 5% Price Rebate (₹ 3,900)
            </button>
          ` : `
            <span style="font-size: 0.8rem; font-weight: 700; color: #15803d; display: flex; align-items: center; gap: 4px;">
              ✓ Claim Settled & Escrow Released
            </span>
          `}
        </div>

      </div>
    `;
  }).join('');
}

// Form Handlers
document.addEventListener('DOMContentLoaded', () => {
  setupSidebarNav();
  renderVerifiedLots();
  renderBuyerDemands();
  renderGrievances();
  initLocationSwitcher();

  // Handle enter key in chat
  const chatInput = document.getElementById('chat-input-field');
  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendChatMessage();
      }
    });
  }

  // Handle Buyer Profile Form submit
  const profileForm = document.getElementById('form-edit-buyer-profile');
  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const newName = document.getElementById('buyer-input-name').value;
      const newCompany = document.getElementById('buyer-input-company').value;

      const nameEl = document.querySelector('.profile-name');
      if (nameEl) nameEl.textContent = newName;

      const heroNameEl = document.querySelector('.hero-left h2');
      if (heroNameEl) heroNameEl.textContent = `Good Morning, ${newName.split(' ')[0]}! 🏢`;

      const displayNameEl = document.getElementById('buyer-display-name');
      if (displayNameEl) displayNameEl.textContent = newName;

      closeBuyerProfileModal();
      showToast('Wholesale Buyer Profile updated successfully!');
    });
  }

// Live preview for Target Price in Post Demand Modal
function updateDemandPricePreview() {
  const priceInput = document.getElementById('demand-price');
  const unitSelect = document.getElementById('demand-price-unit');
  const previewEl = document.getElementById('demand-price-preview');
  if (!priceInput || !unitSelect || !previewEl) return;

  const rawVal = parseFloat(priceInput.value) || 0;
  const unit = unitSelect.value; // 'qt' or 'kg'

  if (unit === 'kg') {
    const qtEquiv = Math.round(rawVal * 100);
    previewEl.textContent = `= ₹ ${qtEquiv.toLocaleString('en-IN')} /Qt`;
  } else {
    const kgEquiv = (rawVal / 100).toFixed(2);
    previewEl.textContent = `= ₹ ${kgEquiv} /kg`;
  }
}

// New Demand Form submit
const demandForm = document.getElementById('form-new-demand');
if (demandForm) {
  demandForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const crop = document.getElementById('demand-crop').value;
    const tonnage = document.getElementById('demand-tonnage').value;
    const unit = document.getElementById('demand-unit')?.value || 'MT';
    const price = document.getElementById('demand-price').value;
    const priceUnit = document.getElementById('demand-price-unit')?.value || 'qt';
    const numPrice = parseFloat(price) || 0;

    let pricePerQt = numPrice;
    let pricePerKg = (numPrice / 100).toFixed(2);
    if (priceUnit === 'kg') {
      pricePerKg = numPrice.toFixed(2);
      pricePerQt = Math.round(numPrice * 100);
    }

    buyerData.buyerDemands.unshift({
      id: `DEM-BB-${Math.floor(100 + Math.random() * 900)}`,
      crop: crop,
      image: crop.toLowerCase().includes('onion') ? 'assets/images/onion.jpg' : 'assets/images/tomato.jpg',
      tonnage: `${tonnage} ${unit}`,
      targetPrice: `₹ ${pricePerQt.toLocaleString('en-IN')} /Qt (₹ ${pricePerKg}/kg)`,
      location: "Hosur Hub, TN",
      deadline: "25 Sep 2026",
      matchedCount: 2,
      status: "Active"
    });

    renderBuyerDemands();
    closePostDemandModal();
    showToast(`Procurement quota for ${tonnage} ${unit} of ${crop} broadcasted to farmers!`);
    switchView('view-bulk-demands');
  });
}

  // Direct Buy submit
  const buyForm = document.getElementById('form-direct-buy');
  if (buyForm) {
    buyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeDirectBuyModal();
      showToast(`35% Advance Escrow locked! Dispatch consignment tracking initiated.`);
      switchView('view-consignments');
    });
  }

  // Counter Bid submit (Feature 6: Triggers WhatsApp Simulation Modal)
  const bidForm = document.getElementById('form-counter-bid');
  if (bidForm) {
    bidForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const lotId = document.getElementById('bid-modal-lot-id').value;
      const bidPrice = document.getElementById('counter-bid-price').value;
      
      closeBidModal();
      openNegotiationModal(lotId, bidPrice);
      showToast(`Counter-offer of ₹ ${bidPrice}/Qt broadcasted to farmer!`);
    });
  }

  // File Grievance / Claim submit
  const grvForm = document.getElementById('form-new-grievance');
  if (grvForm) {
    grvForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const lotRaw = document.getElementById('grv-lot-select').value;
      const [lotId, cropName, farmerName] = lotRaw.split('|');
      const category = document.getElementById('grv-category').value;
      const amount = document.getElementById('grv-claim-amount').value;
      const desc = document.getElementById('grv-description').value;

      const numAmount = parseFloat(amount) || 12000;
      const newGrvId = `GRV-2026-${Math.floor(100 + Math.random() * 900)}`;

      if (!buyerData.grievances) buyerData.grievances = [];

      buyerData.grievances.unshift({
        id: newGrvId,
        consignmentId: lotId,
        crop: cropName || 'Direct Trade Lot',
        category: category,
        farmerName: farmerName || 'Producer Farmer',
        amountUnderHold: `₹ ${numAmount.toLocaleString('en-IN')} (65% Balance Frozen)`,
        status: "Under Review",
        statusClass: "badge-status-negotiation",
        dateFiled: "Today (Just now)",
        resolutionEta: "Within 4 Hours",
        description: desc,
        timeline: [
          { step: "Grievance Raised", done: true, time: "Just now" },
          { step: "Escrow Settlement Frozen", done: true, time: "Auto-locked" },
          { step: "AI Assay & Photo Review", done: false, time: "Queued" },
          { step: "Arbitrator Decision", done: false, time: "Pending" }
        ]
      });

      closeGrievanceModal();
      grvForm.reset();
      const uploadLabel = document.getElementById('grv-upload-label');
      if (uploadLabel) uploadLabel.textContent = '📄 Click to upload Digital Assay Slip / Weight Receipt / Photo Proof';

      renderGrievances();
      showToast(`🔒 Claim ${newGrvId} lodged! 65% escrow settlement auto-frozen in vault.`, 'error');
      switchView('view-grievance');
    });
  }
});

