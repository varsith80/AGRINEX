/**
 * AgriNex Buyer Module - Marketplace Domain Module
 * Handles Verified Farmer Lots, Dual Units (Qt/kg), Filters, Search, and Catalog Views.
 */

// Global Filter State for Feature 4, Unit System & Buyer Perspective
let buyerFilterState = {
  search: '',
  grade: 'all',
  category: 'all',
  sort: 'default',
  unitDisplay: 'both', // 'both', 'kg', 'qt'
  buyerPersona: 'my-account' // 'my-account' or 'other-buyer'
};

function setBuyerPersona(persona, btnEl) {
  if (!buyerFilterState) return;
  buyerFilterState.buyerPersona = persona;

  const selfBtn = document.getElementById('btn-persona-self');
  const otherBtn = document.getElementById('btn-persona-other');
  const simBanner = document.getElementById('other-buyer-sim-banner');

  if (persona === 'my-account') {
    if (selfBtn) {
      selfBtn.classList.add('active');
      selfBtn.style.background = '#0c5a36';
      selfBtn.style.color = '#ffffff';
    }
    if (otherBtn) {
      otherBtn.classList.remove('active');
      otherBtn.style.background = 'transparent';
      otherBtn.style.color = '#475569';
    }
    if (simBanner) simBanner.style.display = 'none';
    showToast('🏢 Switched to My Account (BigBasket Procurement)', 'success');
  } else {
    if (otherBtn) {
      otherBtn.classList.add('active');
      otherBtn.style.background = '#dc2626';
      otherBtn.style.color = '#ffffff';
    }
    if (selfBtn) {
      selfBtn.classList.remove('active');
      selfBtn.style.background = 'transparent';
      selfBtn.style.color = '#475569';
    }
    if (simBanner) simBanner.style.display = 'flex';
    showToast('👥 Simulating Other Buyer View: Sold-out crops are locked & unavailable', 'info');
  }

  renderVerifiedLots();
  renderBuyerEmergencyDesk();
}
window.setBuyerPersona = setBuyerPersona;


// ==========================================
// FEATURE 4: INSTANT SEARCH, GRADE & KG UNIT FILTER
// ==========================================

// Global Search handler // Search input handler
function handleBuyerSearch(query) {
  const rawQuery = query || '';
  buyerFilterState.search = rawQuery.trim().toLowerCase();

  const globalInput = document.getElementById('buyer-global-search');
  const marketInput = document.getElementById('marketplace-search-input');
  if (globalInput && globalInput.value !== rawQuery) globalInput.value = rawQuery;
  if (marketInput && marketInput.value !== rawQuery) marketInput.value = rawQuery;

  // If user is searching and not currently in verified produce view, switch to it
  const activeView = document.querySelector('.portal-view.active-view');
  if (buyerFilterState.search && activeView && activeView.id !== 'view-verified-produce') {
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

  const globalSearch = document.getElementById('buyer-global-search');
  if (globalSearch) globalSearch.value = '';

  const marketSearch = document.getElementById('marketplace-search-input');
  if (marketSearch) marketSearch.value = '';

  const sortSelect = document.getElementById('filter-sort');
  if (sortSelect) sortSelect.value = 'default';

  // Reset category pills
  const catPills = document.querySelectorAll('#market-category-pills .market-pill');
  catPills.forEach((p, idx) => {
    p.classList.remove('active');
    p.style.background = '#ffffff';
    p.style.color = '#334155';
    p.style.borderColor = '#cbd5e1';
    if (idx === 0) {
      p.classList.add('active');
      p.style.background = '#0c5a36';
      p.style.color = '#ffffff';
      p.style.borderColor = '#0c5a36';
    }
  });

  const allGradePill = document.querySelector('#grade-filter-group .filter-pill');
  if (allGradePill) filterByGrade('all', allGradePill);
  else applyFilters();

  showToast('Filters reset to show all lots');
}

// Render Verified Farmer Lots in Table (Full & Dashboard preview with KG unit support)
// Toggle between Grid and Table View in Marketplace
function setMarketViewMode(mode, btn) {
  const gridContainer = document.getElementById('market-lots-grid');
  const tableWrapper = document.getElementById('market-lots-table-wrapper');
  const gridBtn = document.getElementById('btn-view-grid');
  const tableBtn = document.getElementById('btn-view-table');

  if (mode === 'grid') {
    if (gridContainer) gridContainer.style.display = 'grid';
    if (tableWrapper) tableWrapper.style.display = 'none';
    if (gridBtn) {
      gridBtn.style.background = '#0c5a36';
      gridBtn.style.color = '#ffffff';
    }
    if (tableBtn) {
      tableBtn.style.background = 'transparent';
      tableBtn.style.color = '#475569';
    }
  } else {
    if (gridContainer) gridContainer.style.display = 'none';
    if (tableWrapper) tableWrapper.style.display = 'block';
    if (tableBtn) {
      tableBtn.style.background = '#0c5a36';
      tableBtn.style.color = '#ffffff';
    }
    if (gridBtn) {
      gridBtn.style.background = 'transparent';
      gridBtn.style.color = '#475569';
    }
  }
}

// Category filter pills on Marketplace hero
function filterByCategoryPill(category, btn) {
  const pills = document.querySelectorAll('#market-category-pills .market-pill');
  pills.forEach(p => {
    p.classList.remove('active');
    p.style.background = '#ffffff';
    p.style.color = '#334155';
    p.style.borderColor = '#cbd5e1';
  });

  if (btn) {
    btn.classList.add('active');
    btn.style.background = '#0c5a36';
    btn.style.color = '#ffffff';
    btn.style.borderColor = '#0c5a36';
  }

  buyerFilterState.category = category;
  applyFilters();
}

// Render Verified Farmer Lots in 3-Column Grid + Table + Dashboard preview
function renderVerifiedLots(lotsToRender = null) {
  const grid = document.getElementById('market-lots-grid');
  const tbody = document.getElementById('verified-lots-tbody');
  const dashTbody = document.getElementById('dashboard-lots-tbody');
  const countBadge = document.getElementById('lots-count-badge');
  const marketCountBadge = document.getElementById('market-lots-count');
  
  if (!buyerData.verifiedLots) return;
  const lots = lotsToRender !== null ? lotsToRender : buyerData.verifiedLots;
  const unitMode = buyerFilterState.unitDisplay || 'both';

  // Update badge count
  const countText = `${lots.length} Lots`;
  const showingStr = (window.t ? window.t('showing_lots', 'Showing {0} of {1} Verified Lots') : 'Showing {0} of {1} Verified Lots')
    .replace('{0}', lots.length).replace('{1}', buyerData.verifiedLots.length);
  const lotsAvailStr = `${lots.length} ${window.t ? window.t('lots_available', 'Lots Available') : 'Lots Available'}`;
  if (countBadge) countBadge.textContent = showingStr;
  if (marketCountBadge) marketCountBadge.textContent = lotsAvailStr;

  // 1. Render 3-Column Visual Grid (Screenshot Match)
  if (grid) {
    if (lots.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 48px 24px; text-align: center; color: #64748b;">
          <div style="font-size: 2.5rem; margin-bottom: 10px;">🌾</div>
          <strong style="font-size: 1.1rem; color: #0f172a; display: block; margin-bottom: 6px;">No farm-direct lots found matching your filter</strong>
          <p style="font-size: 0.85rem; margin-bottom: 16px;">Try adjusting your keyword search or selecting a different crop category.</p>
          <button class="btn btn-outline btn-sm" onclick="resetBuyerFilters()">Reset All Filters</button>
        </div>
      `;
    } else {
      const soldOutText = window.t ? window.t('sold_out', 'Sold Out') : 'Sold Out';
      const inTransitText = window.t ? window.t('your_order_transit', '0 kg (Your Order • In Transit)') : '0 kg (Your Order • In Transit)';
      const soldOutBannerText = window.t ? window.t('sold_out_overlay', '🚫 SOLD OUT') : '🚫 SOLD OUT';
      const soldOutSubText = window.t ? window.t('sold_out_subtext', '100% Crop Procured by Buyer') : '100% Crop Procured by Buyer';
      const farmerTagText = window.t ? window.t('lot_badge_farmer', '🌿 Farmer') : '🌿 Farmer';
      const compareText = window.t ? window.t('lot_compare', '⚖️ Compare') : '⚖️ Compare';
      const buyNowText = window.t ? window.t('buy_now', 'Buy Now') : 'Buy Now';
      const inTransitBtnText = window.t ? window.t('in_transit_btn', 'In Transit ➔') : 'In Transit ➔';
      const availQtyLabelText = window.t ? window.t('avail_qty_label', 'Available Qty:') : 'Available Qty:';

      grid.innerHTML = lots
        .map((lot) => {
          const kgRate = lot.pricePerKg || (lot.priceNum / 100).toFixed(0);
          const availKg = (lot.availableQtyKg !== undefined) ? lot.availableQtyKg : (lot.qtyNum ? lot.qtyNum * 100 : 5000);
          const isSoldOut = lot.isSoldOut || availKg <= 0;
          const isOwnedByMe = (lot.isPurchased || isSoldOut) && (lot.purchasedBy === 'my-account' || !lot.purchasedBy || (lot.purchasedByName && lot.purchasedByName.includes('BigBasket')));
          const isViewingAsOther = (buyerFilterState && buyerFilterState.buyerPersona === 'other-buyer');
          const gradeText = lot.grade || 'Grade A';

          let availQtyDisplay = `${availKg.toLocaleString('en-IN')} kg`;
          if (isSoldOut) {
            if (isViewingAsOther) {
              availQtyDisplay = `<span style="color:#fca5a5; font-weight:800;">0 kg (${soldOutText})</span>`;
            } else if (isOwnedByMe) {
              availQtyDisplay = `<span style="color:#bbf7d0; font-weight:800;">${inTransitText}</span>`;
            } else {
              availQtyDisplay = `<span style="color:#fca5a5; font-weight:800;">0 kg (${soldOutText})</span>`;
            }
          }

          return `
            <div class="farm-lot-card" id="card-${lot.id}" style="${isSoldOut && isViewingAsOther ? 'opacity: 0.94; border: 1.5px solid #fecdd3;' : ''}">
              <!-- Visual Image Box with Gradient Overlay & Badges -->
              <div class="lot-img-container" style="position: relative;">
                <img src="${lot.image}" alt="${lot.crop}" class="lot-img" onerror="this.src='assets/images/tomato.jpg'" style="${isSoldOut && isViewingAsOther ? 'filter: grayscale(20%) contrast(95%);' : ''}" />
                <div class="lot-img-gradient-overlay"></div>

                <!-- Sold Out Banner Overlay for other buyers -->
                ${isSoldOut && (isViewingAsOther || !isOwnedByMe) ? `
                  <div style="position: absolute; inset: 0; background: rgba(15, 23, 42, 0.65); backdrop-filter: blur(1.5px); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 4; border-radius: 12px 12px 0 0; text-align: center; padding: 12px;">
                    <span style="background: #dc2626; color: #ffffff; font-size: 0.82rem; font-weight: 900; padding: 6px 16px; border-radius: 20px; letter-spacing: 0.8px; box-shadow: 0 4px 14px rgba(220, 38, 38, 0.5); text-transform: uppercase;">${soldOutBannerText}</span>
                    <span style="color: #f1f5f9; font-size: 0.74rem; font-weight: 700; margin-top: 5px;">${soldOutSubText}</span>
                  </div>
                ` : ''}

                <!-- Top Badges -->
                <div class="lot-top-badges">
                  <span class="lot-badge-farmer-tag">${farmerTagText}</span>
                  <span class="lot-badge-grade-tag">${window.tGrade ? window.tGrade(gradeText) : gradeText}</span>
                  ${isSoldOut ? (
                    isViewingAsOther ? `
                      <span class="badge" style="background:#fee2e2; color:#991b1b; border:1.5px solid #fca5a5; font-weight:900; font-size:0.7rem;">${soldOutBannerText}</span>
                    ` : (
                      isOwnedByMe ? `
                        <span class="badge badge-grade-a" style="background:#dcfce7; color:#15803d; border:1px solid #86efac; font-weight:800; font-size:0.7rem;">${window.t ? window.t('your_order_badge', '🔒 Sold Out • Your Order') : '🔒 Sold Out • Your Order'}</span>
                      ` : `
                        <span class="badge" style="background:#fee2e2; color:#991b1b; border:1.5px solid #fca5a5; font-weight:900; font-size:0.7rem;">${soldOutBannerText}</span>
                      `
                    )
                  ) : (
                    lot.isPurchased ? `<span class="badge badge-grade-a" style="background:#dcfce7; color:#15803d; border:1px solid #86efac; font-weight:800;">${window.t ? window.t('escrow_locked_badge', '🔒 Escrow Locked') : '🔒 Escrow Locked'}</span>` : ''
                  )}
                  ${!isSoldOut || !isViewingAsOther ? `
                    <label style="margin-left: auto; background: rgba(0,0,0,0.65); color: #ffffff; padding: 2px 8px; border-radius: 6px; font-size: 0.68rem; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 4px; backdrop-filter: blur(4px);" onclick="event.stopPropagation()">
                      <input type="checkbox" class="lot-compare-checkbox" data-lot-id="${lot.id}" onchange="toggleLotComparison('${lot.id}', event)" style="cursor: pointer;" />
                      <span>${compareText}</span>
                    </label>
                  ` : ''}
                </div>

                <!-- Bottom Price & Quantity Overlay -->
                <div class="lot-bottom-overlay">
                  <div class="lot-overlay-price">
                    ₹${kgRate} <span>/ kg</span>
                  </div>
                  <div class="lot-overlay-qty">
                    ${availQtyLabelText} ${availQtyDisplay}
                  </div>
                </div>
              </div>

              <!-- Card Body Info -->
              <div class="lot-card-body">
                <div>
                  <div class="lot-title">${window.tCrop ? window.tCrop(lot.crop) : lot.crop}</div>
                  <div class="lot-farmer-meta">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2.2">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span><strong>${window.tPerson ? window.tPerson(lot.farmerName) : lot.farmerName}</strong> • ${lot.farmerRating || '4.9 ⭐'}</span>
                  </div>
                  <div class="lot-location-meta">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0c5a36" stroke-width="2.2">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>${window.tLocation ? window.tLocation(lot.farmerLocation) : lot.farmerLocation}</span>
                  </div>
                </div>

                <!-- Actions: Buy Now / Sold Out / In Transit -->
                <div class="lot-actions-row">
                  ${isSoldOut ? (
                    (isViewingAsOther || !isOwnedByMe) ? `
                      <button class="btn-lot-buy" disabled style="background:#e2e8f0; color:#64748b; border:1px solid #cbd5e1; cursor:not-allowed; opacity:0.9; font-weight:800;" title="Sold Out — This crop was fully procured by another institutional buyer">
                        <span>🚫</span>
                        <span>${soldOutText}</span>
                      </button>
                      <button class="btn-lot-whatsapp" disabled style="background:#f1f5f9; color:#94a3b8; cursor:not-allowed; border:1px solid #e2e8f0;" title="Produce is sold out">
                        ✕
                      </button>
                    ` : `
                      <button class="btn-lot-buy" onclick="switchView('view-consignments')" style="background:#0c5a36; color:#ffffff; font-weight:800;" title="Track your dispatched consignment">
                        <span>🚚</span>
                        <span>${inTransitBtnText}</span>
                      </button>
                      <button class="btn-lot-whatsapp" onclick="openFarmerChat('${lot.id}')" title="Direct Chat & Negotiation with ${lot.farmerName}">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.316 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.818-1.001z"/>
                        </svg>
                      </button>
                    `
                  ) : (
                    lot.isPurchased ? `
                      <button class="btn-lot-buy" onclick="switchView('view-consignments')" style="background:#0c5a36; color:#ffffff; font-weight:800;">
                        <span>🚚</span>
                        <span>${inTransitBtnText}</span>
                      </button>
                      <button class="btn-lot-whatsapp" onclick="openFarmerChat('${lot.id}')" title="Direct Chat & Negotiation with ${lot.farmerName}">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.316 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.818-1.001z"/>
                        </svg>
                      </button>
                    ` : `
                      <button class="btn-lot-buy" onclick="openDirectBuyModal('${lot.id}')">
                        <span>🛒</span>
                        <span>${buyNowText}</span>
                      </button>
                      <button class="btn-lot-whatsapp" onclick="openFarmerChat('${lot.id}')" title="Direct Chat & Negotiation with ${lot.farmerName}">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.316 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.818-1.001z"/>
                        </svg>
                      </button>
                    `
                  )}
                </div>
              </div>
            </div>
          `;
        })
        .join('');
    }
  }

  // 2. Render Tabular View (when table mode selected)
  if (tbody) {
    if (lots.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align: center; padding: 40px 20px; color: #64748b;">
            <div style="font-size: 2rem; margin-bottom: 8px;">🌾</div>
            <strong style="font-size: 1rem; color: #0f172a; display: block; margin-bottom: 4px;">No matching farmer lots found</strong>
            <p style="font-size: 0.82rem; margin-bottom: 12px;">Try adjusting your search query or category filter.</p>
            <button class="btn btn-outline btn-sm" onclick="resetBuyerFilters()">Reset All Filters</button>
          </td>
        </tr>
      `;
    } else {
      tbody.innerHTML = lots
        .map((lot) => {
          const kgRate = lot.pricePerKg || (lot.priceNum ? (lot.priceNum / 100).toFixed(0) : '12');
          const availKg = (lot.availableQtyKg !== undefined) ? lot.availableQtyKg : (lot.qtyNum ? lot.qtyNum * 100 : 5000);
          const isSoldOut = lot.isSoldOut || availKg <= 0;
          const isOwnedByMe = (lot.isPurchased || isSoldOut) && (lot.purchasedBy === 'my-account' || !lot.purchasedBy || (lot.purchasedByName && lot.purchasedByName.includes('BigBasket')));
          const isViewingAsOther = (buyerFilterState && buyerFilterState.buyerPersona === 'other-buyer');

          const mandiRateStr = lot.mandiRate || `₹ ${(parseFloat(kgRate) * 1.15 * 100).toFixed(0)} /Qt`;
          const gradeBadge = lot.gradeBadgeClass || 'badge-grade-a';
          const farmerRating = lot.farmerRating || '4.9 ⭐';
          const savingsText = lot.savings || '~15% Saved';

          let qtyColumnHtml = `
            <strong style="font-size: 0.92rem; color: #0f172a;">${availKg.toLocaleString('en-IN')} kg</strong>
            <span style="font-size: 0.72rem; color: #64748b; display: block;">(${lot.quantity || availKg.toLocaleString('en-IN') + ' kg'})</span>
          `;

          if (isSoldOut) {
            if (isViewingAsOther || !isOwnedByMe) {
              qtyColumnHtml = `
                <strong style="font-size: 0.92rem; color: #ef4444;">0 kg</strong>
                <span class="badge" style="background: #fee2e2; color: #991b1b; border: 1px solid #fca5a5; font-size: 0.68rem; padding: 2px 6px; font-weight: 800; display: block; width: fit-content; margin-top: 2px;">🚫 Sold Out</span>
              `;
            } else {
              qtyColumnHtml = `
                <strong style="font-size: 0.92rem; color: #15803d;">0 kg</strong>
                <span class="badge badge-grade-a" style="font-size: 0.68rem; padding: 2px 6px; font-weight: 800; display: block; width: fit-content; margin-top: 2px;">🔒 Procured by You</span>
              `;
            }
          }

          let actionColHtml = '';
          if (isSoldOut) {
            if (isViewingAsOther || !isOwnedByMe) {
              actionColHtml = `
                <button class="btn btn-secondary btn-sm" disabled style="padding: 5px 12px; font-size: 0.78rem; background:#e2e8f0; color:#64748b; border: 1px solid #cbd5e1; cursor:not-allowed; font-weight:700;">
                  🚫 Sold Out
                </button>
              `;
            } else {
              actionColHtml = `
                <button class="btn btn-primary btn-sm" onclick="switchView('view-consignments')" style="padding: 5px 10px; font-size: 0.78rem; background:#0c5a36; border-color:#0c5a36; font-weight:800;">
                  🚚 In Transit ➔
                </button>
              `;
            }
          } else if (lot.isPurchased) {
            actionColHtml = `
              <button class="btn btn-primary btn-sm" onclick="switchView('view-consignments')" style="padding: 5px 10px; font-size: 0.78rem; background:#0c5a36; border-color:#0c5a36; font-weight:800;">
                🚚 In Transit ➔
              </button>
            `;
          } else {
            actionColHtml = `
              <button class="btn btn-primary btn-sm" onclick="openDirectBuyModal('${lot.id}')" style="padding: 5px 10px; font-size: 0.78rem;">
                Buy Now
              </button>
              <button class="btn btn-outline btn-sm" onclick="openFarmerChat('${lot.id}')" style="padding: 5px 10px; font-size: 0.78rem; display: flex; align-items: center; gap: 4px;">
                <span>💬</span> Chat
              </button>
            `;
          }

          return `
            <tr style="${isSoldOut && isViewingAsOther ? 'background-color: #fff8f8;' : ''}">
              <td>
                <div class="crop-cell">
                  <img src="${lot.image}" alt="${lot.crop}" class="crop-thumb" onerror="this.src='assets/images/tomato.jpg'" />
                  <div>
                    <strong style="display: block; font-size: 0.88rem; color: #0f172a;">${window.tCrop ? window.tCrop(lot.crop) : lot.crop}</strong>
                    <span style="font-size: 0.72rem; color: #64748b;">${window.tLocation ? window.tLocation(lot.farmerLocation) : lot.farmerLocation}</span>
                  </div>
                </div>
              </td>
              <td>
                <span class="badge ${gradeBadge}">${window.tGrade ? window.tGrade(lot.grade || 'Grade A') : (lot.grade || 'Grade A')}</span>
                <div style="font-size: 0.7rem; color: #64748b; margin-top: 2px;">Moisture: ${lot.moisture || '13.5%'}</div>
              </td>
              <td>
                <strong>${window.tPerson ? window.tPerson(lot.farmerName) : lot.farmerName}</strong>
                <div style="font-size: 0.72rem; color: #d97706; font-weight: 700;">${farmerRating}</div>
              </td>
              <td>${qtyColumnHtml}</td>
              <td>
                <div style="display: flex; align-items: baseline; gap: 4px;">
                  <strong style="color: #0c5a36; font-size: 0.96rem;">₹ ${kgRate} /kg</strong>
                </div>
                <div style="font-size: 0.7rem; color: #64748b; margin-top: 2px;">
                  Mandi: <span style="text-decoration: line-through;">${mandiRateStr}</span>
                </div>
              </td>
              <td>
                <span class="badge badge-grade-a">${window.tText ? window.tText(savingsText) : savingsText}</span>
              </td>
              <td>
                <div style="display: flex; gap: 6px;">
                  ${actionColHtml}
                </div>
              </td>
            </tr>
          `;
        })
        .join('');
    }
  }

  // 3. Dashboard preview (always top 3)
  if (dashTbody) {
    dashTbody.innerHTML = buyerData.verifiedLots
      .slice(0, 3)
      .map((lot) => {
        const kgRate = lot.pricePerKg || (lot.priceNum / 100).toFixed(0);
        const availKg = (lot.availableQtyKg !== undefined) ? lot.availableQtyKg : (lot.qtyNum ? lot.qtyNum * 100 : 5000);
        const isSoldOut = lot.isSoldOut || availKg <= 0;
        const isOwnedByMe = (lot.isPurchased || isSoldOut) && (lot.purchasedBy === 'my-account' || !lot.purchasedBy || (lot.purchasedByName && lot.purchasedByName.includes('BigBasket')));
        const isViewingAsOther = (buyerFilterState && buyerFilterState.buyerPersona === 'other-buyer');

        let actionHtml = '';
        if (isSoldOut) {
          if (isViewingAsOther || !isOwnedByMe) {
            actionHtml = `<button class="btn btn-secondary btn-sm" disabled style="padding: 4px 8px; font-size: 0.75rem; background:#e2e8f0; color:#64748b; border: 1px solid #cbd5e1; cursor:not-allowed; font-weight:700;">🚫 Sold</button>`;
          } else {
            actionHtml = `<button class="btn btn-primary btn-sm" onclick="switchView('view-consignments')" style="padding: 4px 8px; font-size: 0.75rem; background:#0c5a36; border-color:#0c5a36; font-weight:800;">🚚 Transit</button>`;
          }
        } else if (lot.isPurchased) {
          actionHtml = `<button class="btn btn-primary btn-sm" onclick="switchView('view-consignments')" style="padding: 4px 8px; font-size: 0.75rem; background:#0c5a36; border-color:#0c5a36; font-weight:800;">🚚 Transit</button>`;
        } else {
          actionHtml = `<button class="btn btn-primary btn-sm" onclick="openDirectBuyModal('${lot.id}')" style="padding: 4px 8px; font-size: 0.75rem;">Buy</button>`;
        }

        return `
          <tr>
            <td>
              <div class="crop-cell">
                <img src="${lot.image}" alt="${lot.crop}" class="crop-thumb" onerror="this.src='assets/images/tomato.jpg'" />
                <div>
                  <strong style="display: block; font-size: 0.85rem; color: #0f172a;">${window.tCrop ? window.tCrop(lot.crop) : lot.crop}</strong>
                  <span style="font-size: 0.7rem; color: #64748b;">${window.tLocation ? window.tLocation(lot.farmerLocation) : lot.farmerLocation}</span>
                </div>
              </div>
            </td>
            <td><span class="badge ${lot.gradeBadgeClass || 'badge-grade-a'}">${window.tGrade ? window.tGrade(lot.grade || 'Grade A') : (lot.grade || 'Grade A')}</span></td>
            <td><strong>${window.tPerson ? window.tPerson(lot.farmerName) : lot.farmerName}</strong></td>
            <td>
              <strong style="color: ${isSoldOut ? '#ef4444' : '#0f172a'};">
                ${isSoldOut ? '0 kg (Sold Out)' : availKg.toLocaleString('en-IN') + ' kg'}
              </strong>
            </td>
            <td>
              <strong style="color: #0c5a36;">₹ ${kgRate}/kg</strong>
              <div style="font-size: 0.68rem; color: #64748b;">(${lot.askPrice})</div>
            </td>
            <td>${actionHtml}</td>
          </tr>
        `;
      })
      .join('');
  }
}


// Marketplace Window Bindings
window.buyerFilterState = buyerFilterState;
window.handleBuyerSearch = handleBuyerSearch;
window.setUnitDisplay = setUnitDisplay;
window.filterByGrade = filterByGrade;
window.applyFilters = applyFilters;
window.resetBuyerFilters = resetBuyerFilters;
window.setMarketViewMode = setMarketViewMode;
window.filterByCategoryPill = filterByCategoryPill;
window.renderVerifiedLots = renderVerifiedLots;
