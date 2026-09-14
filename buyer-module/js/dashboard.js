/**
 * AgriNex Buyer Module - Controller & Bid Engine
 * Handles Standard Marketplace Bids + Emergency Salvage Buyouts (Breakeven Procurement)
 */

const DEFAULT_EMERGENCY_FEED = [
  {
    id: "EMG-LOT-TOM-99",
    crop: "Narayangaon Tomatoes (Perishable)",
    image: "../farmer-module/assets/images/tomato.jpg",
    farmerName: "Sanjay Deshmukh",
    mandi: "Manchar / Narayangaon Yard, Pune, MH",
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
    crop: "Nashik Garwa Red Onion Lot",
    image: "../farmer-module/assets/images/onion.jpg",
    farmerName: "Patil Rameshwar",
    mandi: "Lasalgaon APMC Yard, Nashik, MH",
    quantity: "60 Qt",
    floorPrice: "₹ 1,800 /Qt",
    breakevenPrice: "₹ 1,350 /Qt",
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
    farmerName: "Rameshwar Patil (Farmer)",
    mandi: "Narayangaon / Lasalgaon APMC, Pune, MH",
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
  // Alias mapping
  if (viewId === 'view-marketplace') {
    viewId = 'view-verified-produce';
  }

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

  // Trigger view-specific initializations
  if (viewId === 'view-insights' && typeof window.initBuyerMarketInsights === 'function') {
    window.initBuyerMarketInsights();
  }

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
  if (countBadge) countBadge.textContent = `Showing ${lots.length} of ${buyerData.verifiedLots.length} Verified Lots`;
  if (marketCountBadge) marketCountBadge.textContent = `${lots.length} Lots Available`;

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
      grid.innerHTML = lots
        .map((lot) => {
          const kgRate = lot.pricePerKg || (lot.priceNum / 100).toFixed(0);
          const availQty = lot.availableQtyKg ? `${lot.availableQtyKg.toLocaleString('en-IN')} kg` : `${(lot.qtyNum * 100).toLocaleString('en-IN')} kg`;
          const gradeText = lot.grade || 'Grade A';

          return `
            <div class="farm-lot-card" id="card-${lot.id}">
              <!-- Visual Image Box with Gradient Overlay & Badges -->
              <div class="lot-img-container">
                <img src="${lot.image}" alt="${lot.crop}" class="lot-img" onerror="this.src='assets/images/tomato.jpg'" />
                <div class="lot-img-gradient-overlay"></div>
                
                <!-- Top Badges -->
                <div class="lot-top-badges">
                  <span class="lot-badge-farmer-tag">🌿 Farmer</span>
                  <span class="lot-badge-grade-tag">${gradeText}</span>
                </div>

                <!-- Bottom Price & Quantity Overlay -->
                <div class="lot-bottom-overlay">
                  <div class="lot-overlay-price">
                    ₹${kgRate} <span>/ kg</span>
                  </div>
                  <div class="lot-overlay-qty">
                    Available Qty: ${availQty}
                  </div>
                </div>
              </div>

              <!-- Card Body Info -->
              <div class="lot-card-body">
                <div>
                  <div class="lot-title">${lot.crop}</div>
                  <div class="lot-farmer-meta">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2.2">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <span><strong>${lot.farmerName}</strong> • ${lot.farmerRating || '4.9 ⭐'}</span>
                  </div>
                  <div class="lot-location-meta">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0c5a36" stroke-width="2.2">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>${lot.farmerLocation}</span>
                  </div>
                </div>

                <!-- Actions: Buy Now + WhatsApp Chat -->
                <div class="lot-actions-row">
                  <button class="btn-lot-buy" onclick="openDirectBuyModal('${lot.id}')">
                    <span>🛒</span>
                    <span>Buy Now</span>
                  </button>
                  <button class="btn-lot-whatsapp" onclick="openFarmerChat('${lot.id}')" title="Direct Chat & Negotiation with ${lot.farmerName}">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.316 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.818-1.001z"/>
                    </svg>
                  </button>
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
          const kgRate = lot.pricePerKg || (lot.priceNum / 100).toFixed(0);
          const totalKg = lot.availableQtyKg ? lot.availableQtyKg.toLocaleString('en-IN') : (lot.qtyNum * 100).toLocaleString('en-IN');
          const mandiNum = parseFloat(lot.mandiRate.replace(/[^0-9.]/g, '')) || 0;
          const mandiKgRate = (mandiNum / 100).toFixed(0);

          return `
            <tr>
              <td>
                <div class="crop-cell">
                  <img src="${lot.image}" alt="${lot.crop}" class="crop-thumb" onerror="this.src='assets/images/tomato.jpg'" />
                  <div>
                    <strong style="display: block; font-size: 0.88rem; color: #0f172a;">${lot.crop}</strong>
                    <span style="font-size: 0.72rem; color: #64748b;">${lot.farmerLocation}</span>
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
                <strong style="font-size: 0.92rem; color: #0f172a;">${totalKg} kg</strong>
                <span style="font-size: 0.72rem; color: #64748b; display: block;">(${lot.quantity})</span>
              </td>
              <td>
                <div style="display: flex; align-items: baseline; gap: 4px;">
                  <strong style="color: #0c5a36; font-size: 0.96rem;">₹ ${kgRate} /kg</strong>
                </div>
                <div style="font-size: 0.7rem; color: #64748b; margin-top: 2px;">
                  Mandi: <span style="text-decoration: line-through;">${lot.mandiRate}</span>
                </div>
              </td>
              <td>
                <span class="badge badge-grade-a">${lot.savings}</span>
              </td>
              <td>
                <div style="display: flex; gap: 6px;">
                  <button class="btn btn-primary btn-sm" onclick="openDirectBuyModal('${lot.id}')" style="padding: 5px 10px; font-size: 0.78rem;">
                    Buy Now
                  </button>
                  <button class="btn btn-outline btn-sm" onclick="openFarmerChat('${lot.id}')" style="padding: 5px 10px; font-size: 0.78rem; display: flex; align-items: center; gap: 4px;">
                    <span>💬</span> Chat
                  </button>
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
              <strong>${lot.availableQtyKg ? lot.availableQtyKg.toLocaleString('en-IN') + ' kg' : lot.quantity}</strong>
            </td>
            <td>
              <strong style="color: #0c5a36;">₹ ${kgRate}/kg</strong>
              <div style="font-size: 0.68rem; color: #64748b;">(${lot.askPrice})</div>
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

// ==========================================
// BULK PROCUREMENT DEMANDS & QUOTA BOARD
// ==========================================
let demandFilters = {
  searchQuery: '',
  status: 'all',
  hub: 'all'
};

function handleDemandSearch(val) {
  demandFilters.searchQuery = (val || '').toLowerCase().trim();
  renderBuyerDemands();
}

function filterDemandsByStatus(status, btnEl) {
  demandFilters.status = status;
  if (btnEl && btnEl.parentElement) {
    const btns = btnEl.parentElement.querySelectorAll('button');
    btns.forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
  }
  renderBuyerDemands();
}

function filterDemandsByHub(hub) {
  demandFilters.hub = hub;
  renderBuyerDemands();
}

function clearDemandFilters() {
  demandFilters = { searchQuery: '', status: 'all', hub: 'all' };
  const sInput = document.getElementById('demand-search-input');
  if (sInput) sInput.value = '';
  const hubSelect = document.getElementById('demand-hub-filter');
  if (hubSelect) hubSelect.value = 'all';
  const statusContainer = document.getElementById('demand-status-filters');
  if (statusContainer) {
    const btns = statusContainer.querySelectorAll('button');
    btns.forEach((b, i) => {
      if (i === 0) b.classList.add('active');
      else b.classList.remove('active');
    });
  }
  renderBuyerDemands();
}

function renderBuyerDemands() {
  const container = document.getElementById('demands-list-container');
  if (!container || !buyerData.buyerDemands) return;

  const filtered = buyerData.buyerDemands.filter(dem => {
    // Search query
    if (demandFilters.searchQuery) {
      const q = demandFilters.searchQuery;
      const matchText = `${dem.id} ${dem.crop} ${dem.category || ''} ${dem.location} ${dem.grade || ''}`.toLowerCase();
      if (!matchText.includes(q)) return false;
    }
    // Status filter
    if (demandFilters.status !== 'all') {
      if (demandFilters.status === 'match-ready' && !dem.statusLabel.includes('Auto-Match')) return false;
      if (demandFilters.status === 'broadcasting' && !dem.statusLabel.includes('Broadcasting')) return false;
      if (demandFilters.status === 'fulfilled' && dem.fulfilledPct < 100) return false;
    }
    // Hub filter
    if (demandFilters.hub !== 'all' && dem.location !== demandFilters.hub) {
      return false;
    }
    return true;
  });

  // Update badge count
  const activeBadge = document.getElementById('demands-active-badge');
  if (activeBadge) {
    activeBadge.textContent = `${filtered.length} Quotas Displayed`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 48px 20px; background: #f8fafc; border-radius: 12px; border: 1.5px dashed #cbd5e1;">
        <div style="font-size: 2.2rem; margin-bottom: 8px;">🔍</div>
        <strong style="font-size: 1.05rem; color: #0f172a; display: block;">No matching procurement quotas found</strong>
        <p style="font-size: 0.8rem; color: #64748b; margin-top: 4px; margin-bottom: 14px;">Try adjusting your search keywords, status tabs, or hub filters.</p>
        <button class="btn btn-outline btn-sm" onclick="clearDemandFilters()">Reset All Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(dem => {
    const fulfilledPct = dem.fulfilledPct || 0;
    const progressColor = fulfilledPct >= 100 ? '#15803d' : (fulfilledPct >= 60 ? '#0c5a36' : '#d97706');
    const bidsCount = (dem.bids && dem.bids.length) || 0;
    const isFulfilled = fulfilledPct >= 100;

    return `
      <div style="background: #ffffff; border: 1.5px solid ${isFulfilled ? '#86efac' : '#e2e8f0'}; border-radius: 14px; padding: 20px; margin-bottom: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.02); transition: all 0.25s ease;" id="demand-card-${dem.id}">
        <!-- Top Bar: Crop Info + Status Badge -->
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 14px;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <img src="${dem.image}" alt="${dem.crop}" style="width: 52px; height: 52px; border-radius: 10px; object-fit: cover; border: 1px solid #e2e8f0; box-shadow: 0 2px 6px rgba(0,0,0,0.06);" onerror="this.src='assets/images/tomato.jpg'" />
            <div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                <strong style="font-size: 1.1rem; color: #0f172a;">${dem.crop}</strong>
                <span class="badge" style="background: #f1f5f9; color: #475569; font-size: 0.72rem; font-weight: 700; border: 1px solid #cbd5e1;">#${dem.id}</span>
                <span class="badge" style="background: #f0fdf4; color: #166534; font-size: 0.72rem; font-weight: 700; border: 1px solid #bbf7d0;">${dem.category || 'Agricultural Crop'}</span>
              </div>
              <div style="font-size: 0.78rem; color: #64748b; margin-top: 3px;">
                Destination: <strong style="color: #0f172a;">${dem.location}</strong> • Sourcing Deadline: <strong style="${dem.daysLeft <= 3 ? 'color: #dc2626;' : 'color: #0f172a;'}">${dem.deadline} ${dem.daysLeft > 0 ? `(${dem.daysLeft}d left)` : '(Completed)'}</strong>
              </div>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge" style="background: ${isFulfilled ? '#15803d' : '#e8f5ed'}; color: ${isFulfilled ? '#ffffff' : '#0c5a36'}; font-size: 0.78rem; font-weight: 700; padding: 4px 10px; border-radius: 20px; border: 1px solid ${isFulfilled ? '#15803d' : '#bbf7d0'};">
              ${dem.statusLabel || '● Broadcasting Quota'}
            </span>
          </div>
        </div>

        <!-- 4-Column Procurement Spec Grid -->
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px 14px; margin-bottom: 14px; font-size: 0.8rem;">
          <div>
            <span style="color: #64748b; font-size: 0.72rem; display: block;">TARGET QUOTA VOLUME</span>
            <strong style="color: #0f172a; font-size: 0.95rem;">${dem.tonnage}</strong>
          </div>
          <div>
            <span style="color: #64748b; font-size: 0.72rem; display: block;">CEILING TARGET PRICE</span>
            <strong style="color: #0c5a36; font-size: 0.95rem;">${dem.targetPrice}</strong>
          </div>
          <div>
            <span style="color: #64748b; font-size: 0.72rem; display: block;">MANDI BENCHMARK RATE</span>
            <div style="display: flex; align-items: center; gap: 6px;">
              <span style="color: #64748b; text-decoration: line-through;">${dem.mandiBenchmark || '₹ 1,400/Qt'}</span>
              <span style="color: #166534; font-weight: 700; font-size: 0.74rem;">${dem.savingsPct || '12% Saved'}</span>
            </div>
          </div>
          <div>
            <span style="color: #64748b; font-size: 0.72rem; display: block;">QUALITY & LOGISTICS SPEC</span>
            <span style="color: #0f172a; font-weight: 600; font-size: 0.75rem;">${dem.grade || 'Grade A'} • ${dem.deliveryMode || 'Farm-Gate'}</span>
          </div>
        </div>

        <!-- Sourcing Fulfillment Progress Bar -->
        <div style="margin-bottom: 14px;">
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.76rem; margin-bottom: 5px;">
            <span style="color: #64748b;">
              Sourced: <strong style="color: ${progressColor};">${dem.fulfilledTonnage || 0} / ${dem.tonnageNum || 150} ${dem.unit || 'Qt'}</strong> <span style="font-size: 0.72rem; color: #64748b;">(${((dem.fulfilledTonnage || 0) * 100).toLocaleString('en-IN')} / ${((dem.tonnageNum || 150) * 100).toLocaleString('en-IN')} kg)</span>
            </span>
            <strong style="color: ${progressColor};">${fulfilledPct}% Fulfilled</strong>
          </div>
          <div style="height: 7px; background: #e2e8f0; border-radius: 10px; overflow: hidden;">
            <div style="width: ${fulfilledPct}%; height: 100%; background: ${progressColor}; border-radius: 10px; transition: width 0.4s ease;"></div>
          </div>
        </div>

        <!-- Action Footer -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; padding-top: 12px; border-top: 1px solid #f1f5f9;">
          <div style="display: flex; align-items: center; gap: 8px; font-size: 0.76rem; color: #64748b;">
            <span>🛡️ ${dem.escrowAdvance || '35% Advance Escrow'}</span>
            <span>•</span>
            <span style="color: #0c5a36; font-weight: 700;">${dem.moistureLimit || 'QC Guaranteed'}</span>
          </div>

          <div style="display: flex; align-items: center; gap: 8px;">
            ${bidsCount > 0 ? `
              <button class="btn btn-primary btn-sm" onclick="openDemandBidsModal('${dem.id}')" style="background: #0c5a36; border-color: #0c5a36; font-weight: 700; display: flex; align-items: center; gap: 5px;">
                📋 Review Farmer Bids (${bidsCount})
              </button>
            ` : `
              <button class="btn btn-outline btn-sm" onclick="showToast('✓ Broadcasting active! New farmer proposals will appear here automatically.', 'info')" style="font-size: 0.76rem;">
                ● Broadcasting for Bids
              </button>
            `}

            <button class="btn btn-outline btn-sm" onclick="sourceFromMarketplaceForDemand('${dem.crop}')" style="font-size: 0.76rem;">
              ⚡ Auto-Match Lots &rarr;
            </button>

            <button class="btn btn-outline btn-sm" onclick="downloadPurchaseOrder('${dem.id}')" style="font-size: 0.76rem;" title="Download Institutional Purchase Order">
              📄 PO
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Open Review Matching Farmer Bids Modal
function openDemandBidsModal(demandId) {
  const modal = document.getElementById('modal-demand-bids');
  if (!modal) return;

  const demand = buyerData.buyerDemands.find(d => d.id === demandId) || buyerData.buyerDemands[0];
  if (!demand) return;

  const titleEl = document.getElementById('bids-modal-title');
  const subtitleEl = document.getElementById('bids-modal-subtitle');
  const ceilingEl = document.getElementById('bids-modal-ceiling');
  const destEl = document.getElementById('bids-modal-dest');
  const remainingEl = document.getElementById('bids-modal-remaining');
  const listContainer = document.getElementById('bids-list-container');

  if (titleEl) titleEl.textContent = `Matching Farmer Bids (${demand.bids ? demand.bids.length : 0})`;
  if (subtitleEl) subtitleEl.textContent = `Quota #${demand.id} • ${demand.crop} (${demand.tonnage})`;
  if (ceilingEl) ceilingEl.textContent = demand.targetPrice;
  if (destEl) destEl.textContent = demand.location;
  if (remainingEl) {
    const rem = Math.max(0, (demand.tonnageNum || 150) - (demand.fulfilledTonnage || 0));
    remainingEl.textContent = `${rem} ${demand.unit || 'Qt'} (${(rem * 100).toLocaleString('en-IN')} kg)`;
  }

  if (listContainer) {
    if (!demand.bids || demand.bids.length === 0) {
      listContainer.innerHTML = `
        <div style="text-align: center; padding: 24px; color: #64748b;">
          No incoming bids yet for this quota. Farmers are being alerted across the regional grid.
        </div>
      `;
    } else {
      listContainer.innerHTML = demand.bids.map(bid => {
        const isBetter = bid.bidPriceNum <= demand.targetPriceNum;
        return `
          <div style="background: #ffffff; border: 1.5px solid #bbf7d0; border-radius: 12px; padding: 14px 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.02);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <img src="${bid.farmerAvatar || 'assets/images/tomato.jpg'}" alt="${bid.farmerName}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 1.5px solid #86efac;" onerror="this.src='assets/images/tomato.jpg'" />
                <div>
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <strong style="font-size: 0.95rem; color: #0f172a;">${bid.farmerName}</strong>
                    <span style="font-size: 0.75rem; color: #0c5a36; font-weight: 700;">${bid.rating}</span>
                    <span class="badge" style="background: #f0fdf4; color: #166534; font-size: 0.7rem; font-weight: 700; padding: 2px 6px;">${bid.status || 'Verified Match'}</span>
                  </div>
                  <div style="font-size: 0.74rem; color: #64748b;">📍 ${bid.location} • Lead Time: <strong>${bid.leadTime || '6 Hours'}</strong></div>
                </div>
              </div>

              <div style="text-align: right;">
                <div style="font-size: 1.1rem; font-weight: 800; color: #0c5a36;">${bid.bidPrice}</div>
                <div style="font-size: 0.72rem; color: #166534; font-weight: 600;">₹ ${bid.pricePerKg.toFixed(2)}/kg • ${bid.offeredQty} offered</div>
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; background: #f8fafc; padding: 8px 12px; border-radius: 8px; margin-bottom: 10px; font-size: 0.76rem;">
              <span style="color: #475569;">Digital QC Score: <strong style="color: #15803d;">${bid.qcScore}</strong></span>
              <span style="color: #475569;">Price Advantage: <strong style="color: #0c5a36;">${isBetter ? '✓ At/Below Target Ceiling' : 'Slight Premium'}</strong></span>
            </div>

            <div style="display: flex; gap: 8px; justify-content: flex-end;">
              <button class="btn btn-outline btn-sm" onclick="startNegotiationWithFarmer('${bid.farmerName}', '${demand.crop}', ${bid.bidPriceNum}, '${demand.id}')" style="font-size: 0.75rem; padding: 4px 10px;">
                💬 Chat & Negotiate
              </button>
              <button class="btn btn-primary btn-sm" onclick="acceptDemandFarmerBid('${demand.id}', '${bid.bidId}')" style="background: #0c5a36; border-color: #0c5a36; font-size: 0.75rem; font-weight: 700; padding: 4px 12px;">
                ✓ Accept Bid & Lock 35% Escrow
              </button>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  modal.classList.add('active');
}

function closeDemandBidsModal() {
  const modal = document.getElementById('modal-demand-bids');
  if (modal) modal.classList.remove('active');
}

// Accept farmer bid directly from quota board
function acceptDemandFarmerBid(demandId, bidId) {
  const demand = buyerData.buyerDemands.find(d => d.id === demandId);
  if (!demand) return;

  const bid = demand.bids ? demand.bids.find(b => b.bidId === bidId) : null;
  const farmerName = bid ? bid.farmerName : 'Farmer';
  const bidPrice = bid ? bid.bidPrice : demand.targetPrice;
  const offeredQty = bid ? bid.offeredQty : '50 Qt (5,000 kg)';

  // Calculate 35% escrow
  const totalVal = (bid ? bid.bidPriceNum : 1200) * 50;
  const escrowAdv = Math.round(totalVal * 0.35);

  closeDemandBidsModal();
  showToast(`🔒 Authorizing 35% Escrow (₹ ${escrowAdv.toLocaleString('en-IN')}) for ${farmerName}...`);

  setTimeout(() => {
    // Increment fulfilled volume
    demand.fulfilledTonnage = Math.min(demand.tonnageNum, (demand.fulfilledTonnage || 0) + 50);
    demand.fulfilledPct = Math.round((demand.fulfilledTonnage / demand.tonnageNum) * 100);
    if (demand.fulfilledPct >= 100) {
      demand.statusLabel = '✓ 100% Contracted & Fulfilled';
    }

    renderBuyerDemands();
    showToast(`✓ Proposal accepted! Contract created with ${farmerName} for ${offeredQty} at ${bidPrice}. Escrow locked.`, 'success');
    switchView('view-escrow-vault');
  }, 800);
}

// Direct jump to Marketplace filtered for this crop
function sourceFromMarketplaceForDemand(cropName) {
  let keyword = cropName.split(' ')[0].replace(/[^a-zA-Z]/g, '');
  const searchInput = document.getElementById('marketplace-search-input');
  if (searchInput) {
    searchInput.value = keyword;
    handleBuyerSearch(keyword);
  }
  showToast(`Filtering marketplace lots for ${keyword}...`);
  switchView('view-verified-produce');
}

// Download Individual PO
function downloadPurchaseOrder(demandId) {
  const demand = buyerData.buyerDemands.find(d => d.id === demandId) || { crop: 'Produce Quota' };
  showToast(`Generating official Purchase Order (PO #${demandId}) PDF with digital stamp...`);
  setTimeout(() => {
    showToast(`✓ PO #${demandId} (${demand.crop}) downloaded successfully!`);
  }, 750);
}

// Download All POs
function downloadAllPurchaseOrders() {
  showToast('Generating institutional Master Procurement Demand Sheet (PDF) for all active quotas...');
  setTimeout(() => {
    showToast('✓ Master Procurement Report (6 Active Quotas) downloaded successfully!');
  }, 850);
}

// Refresh Auto-Match
function refreshDemandMatches() {
  showToast('🔄 Scanning real-time mandi feeds & regional farm-gate GPS clusters...');
  setTimeout(() => {
    buyerData.buyerDemands.forEach(d => {
      if (d.fulfilledPct < 100) {
        d.matchedCount = Math.floor(3 + Math.random() * 4);
      }
    });
    renderBuyerDemands();
    showToast('✓ Regional farmer clusters synced! 4 new farm-gate lots matched.', 'success');
  }, 900);
}

// Chat Messaging Data Store & Functionality (Dynamic for ALL Marketplace Farmers)
const chatConversations = {
  patil: {
    name: "Patil Rameshwar",
    avatar: "assets/images/onion.jpg",
    status: "● Online • Lasalgaon, Nashik, Maharashtra",
    lotId: "LOT-ONI-01",
    crop: "Red Onion (Nashik Garwa Quality)",
    farmerPhone: "+91 98220-44911",
    offerText: "Farmer Ask Rate: <strong style=\"color: #0c5a36;\">₹ 18 /kg</strong> (₹ 1,800/Qt) for 100 Qt (Lasalgaon APMC Gate)",
    counterRate: 1800,
    lockRateText: "Lock 35% Escrow (₹ 18/kg)",
    messages: [
      { type: "incoming", text: "Namaste Karthik sir! I have 100 Qt export-graded Garwa red onions cured and ready at Lasalgaon APMC yard." },
      { type: "outgoing", text: "Hello Patil ji! We are looking for immediate institutional dispatch to Navi Mumbai Terminal. Can you load today?" },
      { type: "incoming", text: "Yes sir, weighing is completed on electronic weighbridge. Once 35% advance escrow is locked, truck can move immediately via Samruddhi Expressway." }
    ]
  },
  deshmukh: {
    name: "Sanjay Deshmukh",
    avatar: "assets/images/tomato.jpg",
    status: "● Online • Manchar, Pune (18 km away)",
    lotId: "LOT-TOM-02",
    crop: "Tomato (Shivam / Abhinav Hybrid)",
    farmerPhone: "+91 98224-33100",
    offerText: "Farmer countered at <strong style=\"color: #0c5a36;\">₹ 13 /kg</strong> (₹ 1,300/Qt) for 60 Qt (Retail Ready)",
    counterRate: 1300,
    lockRateText: "Lock 35% Escrow (₹ 13/kg)",
    messages: [
      { type: "incoming", text: "Hello sir, my 60 Qt Narayangaon hybrid tomato harvest has 82% firmness index, packed in sanitized returnable crates." },
      { type: "outgoing", text: "Hi Sanjay ji, what is your best floor price for the entire 60 Qt lot?" },
      { type: "incoming", text: "I can offer ₹ 13/kg direct farm-gate price if payment is routed through AgriNex Smart Escrow." }
    ]
  },
  shinde: {
    name: "Rajesh Shinde",
    avatar: "assets/images/banana.jpg",
    status: "● Online • Raver, Jalgaon (Khandesh Banana Belt)",
    lotId: "LOT-BAN-03",
    crop: "Grand Naine Banana (GI Khandesh Export)",
    farmerPhone: "+91 98500-11234",
    offerText: "GI Certified Khandesh: <strong style=\"color: #0c5a36;\">₹ 14.50 /kg</strong> for 120 Qt",
    counterRate: 1450,
    lockRateText: "Lock 35% Escrow (₹ 14.50/kg)",
    messages: [
      { type: "incoming", text: "Namaskar! 120 Qt Grand Naine bananas harvested at mature green stage with 7-8 hands per bunch ready for reefer transport." },
      { type: "outgoing", text: "Excellent quality! We need temperature-logged reefer transport at 13.5°C to Navi Mumbai." },
      { type: "incoming", text: "All pre-cooling and foam pad packaging done. Ready for loading at Raver hub." }
    ]
  },
  jadhav: {
    name: "Anandrao Jadhav",
    avatar: "assets/images/wheat-logo.png",
    status: "● Online • Latur Mega APMC Silo Yard",
    lotId: "LOT-SOY-04",
    crop: "Yellow Soybean (JS 335 / High Protein)",
    farmerPhone: "+91 98231-55890",
    offerText: "FPO Bulk Single-Origin: <strong style=\"color: #0c5a36;\">₹ 42 /kg</strong> for 150 Qt",
    counterRate: 4200,
    lockRateText: "Lock 35% Escrow (₹ 42/kg)",
    messages: [
      { type: "incoming", text: "Greetings Karthik! Latur FPO has 150 Qt clean JS-335 soybean with 19% oil content ready in 50kg jute bags." }
    ]
  },
  thorat: {
    name: "Kavita Thorat",
    avatar: "assets/images/turmeric.jpg",
    status: "● Online • Sangli APMC (Turmeric Market)",
    lotId: "LOT-TUR-06",
    crop: "Sangli Rajapuri Turmeric Finger",
    farmerPhone: "+91 98228-88190",
    offerText: "Lab Tested Curcumin 4.8%: <strong style=\"color: #0c5a36;\">₹ 135 /kg</strong> for 50 Qt",
    counterRate: 13500,
    lockRateText: "Lock 35% Escrow (₹ 135/kg)",
    messages: [
      { type: "incoming", text: "Namaste sir, 50 Qt double-polished Rajapuri turmeric fingers available for direct institutional spice procurement." }
    ]
  },
  wankhede: {
    name: "Vikas Wankhede",
    avatar: "assets/images/orange.jpg",
    status: "● Online • Katol, Nagpur (Vidarbha Citrus)",
    lotId: "LOT-ORG-05",
    crop: "Nagpur Orange / Santra (GI Vidarbha Quality)",
    farmerPhone: "+91 98222-33104",
    offerText: "GI Table Fruit: <strong style=\"color: #0c5a36;\">₹ 38 /kg</strong> for 80 Qt",
    counterRate: 3800,
    lockRateText: "Lock 35% Escrow (₹ 38/kg)",
    messages: [
      { type: "incoming", text: "Hello Karthik sir, fresh harvest Nagpur mandarins graded by electronic weight sizer ready at Katol packhouse." }
    ]
  },
  chavan: {
    name: "Sunil Chavan",
    avatar: "assets/images/pomegranate.jpg",
    status: "● Online • Pandharpur, Solapur (Pomegranate Belt)",
    lotId: "LOT-POM-07",
    crop: "Bhagwa Pomegranate (Solapur Export Grade)",
    farmerPhone: "+91 98226-44102",
    offerText: "Deep Red Arils: <strong style=\"color: #0c5a36;\">₹ 88 /kg</strong> for 40 Qt",
    counterRate: 8800,
    lockRateText: "Lock 35% Escrow (₹ 88/kg)",
    messages: [
      { type: "incoming", text: "Namaskar! 40 Qt export-grade Bhagwa pomegranates (250g+ fruit weight) boxed in 10kg corrugated cartons." }
    ]
  },
  more: {
    name: "Balasaheb More",
    avatar: "assets/images/cotton.jpg",
    status: "● Online • Amravati APMC (Vidarbha Cotton Yard)",
    lotId: "LOT-COT-08",
    crop: "Raw Cotton (Vidarbha Long Staple)",
    farmerPhone: "+91 98225-77890",
    offerText: "Staple >29mm: <strong style=\"color: #0c5a36;\">₹ 62 /kg</strong> for 90 Qt",
    counterRate: 6200,
    lockRateText: "Lock 35% Escrow (₹ 62/kg)",
    messages: [
      { type: "incoming", text: "Greetings! 90 Qt long staple cotton pressed bales ready for institutional textile & ginning delivery." }
    ]
  }
};

let activeChatKey = 'patil';

// Render Dynamic Chat Sidebar with all active farmers
function renderChatSidebar() {
  const container = document.getElementById('chat-contacts-container');
  if (!container) return;

  const keys = Object.keys(chatConversations);
  const badge = document.getElementById('chat-active-count-badge');
  if (badge) badge.textContent = `${keys.length} Online`;

  container.innerHTML = keys
    .map(key => {
      const chat = chatConversations[key];
      const lastMsg = chat.messages && chat.messages.length > 0 
        ? chat.messages[chat.messages.length - 1].text 
        : `Ask: ${chat.offerText.replace(/<[^>]*>/g, '')}`;
      const isActive = key === activeChatKey ? 'active' : '';

      return `
        <div class="chat-contact ${isActive}" id="chat-contact-${key}" onclick="selectChatContact('${key}')">
          <img src="${chat.avatar}" alt="${chat.name}" style="width: 38px; height: 38px; border-radius: 50%; object-fit: cover; flex-shrink: 0;" onerror="this.src='assets/images/tomato.jpg'" />
          <div style="flex: 1; min-width: 0;">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <strong style="font-size: 0.85rem; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${chat.name}</strong>
              <span style="font-size: 0.65rem; color: #166534; font-weight: 700;">● Online</span>
            </div>
            <div style="font-size: 0.72rem; color: #0c5a36; font-weight: 700; margin-top: 1px;">${chat.crop}</div>
            <span style="font-size: 0.7rem; color: #64748b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block; margin-top: 1px;">${lastMsg}</span>
          </div>
        </div>
      `;
    })
    .join('');
}

// Select a specific Farmer Chat Contact
function selectChatContact(contactKey) {
  if (!chatConversations[contactKey]) return;
  activeChatKey = contactKey;
  const chat = chatConversations[contactKey];

  // Update active pill in sidebar
  document.querySelectorAll('.chat-contact').forEach(c => c.classList.remove('active'));
  const activeEl = document.getElementById(`chat-contact-${contactKey}`);
  if (activeEl) activeEl.classList.add('active');

  // Update Header
  const header = document.querySelector('.chat-main .chat-header');
  if (header) {
    header.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px;">
        <img src="${chat.avatar}" alt="${chat.name}" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover;" onerror="this.src='assets/images/tomato.jpg'" />
        <div>
          <strong style="font-size: 0.92rem; color: #0f172a;">${chat.name}</strong>
          <div style="font-size: 0.74rem; color: #166534; font-weight: 700;">${chat.status} • ${chat.crop}</div>
        </div>
      </div>
      <div style="display: flex; gap: 8px;">
        <button class="btn btn-outline btn-sm" onclick="openBidModal('${chat.lotId}')">Counter Offer</button>
        <button class="btn btn-primary btn-sm" onclick="openDirectBuyModal('${chat.lotId}')">${chat.lockRateText}</button>
      </div>
    `;
  }

  // Update Active Offer Banner
  const banner = document.querySelector('.chat-main [style*="background: #fefce8"]');
  if (banner) {
    banner.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="background: #eab308; color: #ffffff; width: 22px; height: 22px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 800;">⚡</span>
        <span><strong>Active Offer:</strong> ${chat.offerText}</span>
      </div>
      <div style="display: flex; gap: 6px;">
        <button class="btn btn-primary btn-sm" onclick="acceptFarmerCounter('${chat.lotId}', ${chat.counterRate})" style="padding: 5px 12px; font-size: 0.78rem;">✓ Accept & Lock</button>
        <button class="btn btn-outline btn-sm" onclick="openBidModal('${chat.lotId}')" style="padding: 5px 10px; font-size: 0.78rem;">Re-counter</button>
      </div>
    `;
  }

  // Render Messages
  const container = document.getElementById('chat-messages-container');
  if (container) {
    container.innerHTML = chat.messages
      .map(m => `<div class="chat-bubble ${m.type}">${m.text}</div>`)
      .join('');
    container.scrollTop = container.scrollHeight;
  }
}

// Open Chat directly with any Farmer from Marketplace Lot Card
function openFarmerChat(lotId) {
  let matchedKey = 'gowran';
  
  // Find matching key for lotId
  for (const [key, conv] of Object.entries(chatConversations)) {
    if (conv.lotId === lotId) {
      matchedKey = key;
      break;
    }
  }

  // If not found in presets, create dynamic session from buyerData.verifiedLots
  if (!chatConversations[matchedKey] || chatConversations[matchedKey].lotId !== lotId) {
    const lot = buyerData.verifiedLots.find(l => l.id === lotId);
    if (lot) {
      const slug = lot.farmerName.toLowerCase().replace(/[^a-z0-9]/g, '_');
      const kgPrice = lot.pricePerKg || (lot.priceNum / 100).toFixed(0);
      chatConversations[slug] = {
        name: lot.farmerName,
        avatar: lot.image || 'assets/images/farmer-avatar.jpg',
        status: `● Online • ${lot.farmerLocation}`,
        lotId: lot.id,
        crop: lot.crop,
        farmerPhone: lot.farmerPhone || '+91 98422-00000',
        offerText: `Farmer Ask: <strong style="color: #0c5a36;">₹ ${kgPrice} /kg</strong> (${lot.askPrice}) for ${lot.quantity}`,
        counterRate: lot.priceNum,
        lockRateText: `Lock 35% Escrow (₹ ${kgPrice}/kg)`,
        messages: [
          { type: "incoming", text: `Vanakkam Karthik sir! I am ${lot.farmerName}. My lot of ${lot.crop} (${lot.quantity}) is ready for immediate procurement.` }
        ]
      };
      matchedKey = slug;
    }
  }

  renderChatSidebar();
  selectChatContact(matchedKey);
  switchView('view-messages');

  const farmerObj = chatConversations[matchedKey];
  showToast(`💬 Direct negotiation room opened with ${farmerObj.name} (${farmerObj.crop})!`);
}

function sendChatMessage() {
  const input = document.getElementById('chat-input-field');
  const container = document.getElementById('chat-messages-container');
  if (!input || !container || !input.value.trim()) return;

  const msg = input.value.trim();
  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble outgoing';
  bubble.textContent = msg;
  container.appendChild(bubble);

  if (chatConversations[activeChatKey]) {
    chatConversations[activeChatKey].messages.push({ type: "outgoing", text: msg });
  }

  input.value = '';
  container.scrollTop = container.scrollHeight;

  // Auto farmer reply after 1s
  const currentKey = activeChatKey;
  const currentFarmer = chatConversations[currentKey] ? chatConversations[currentKey].name : 'Farmer';
  const currentCrop = chatConversations[currentKey] ? chatConversations[currentKey].crop : 'produce';

  setTimeout(() => {
    let replyText = `Thank you for your message! As agreed for ${currentCrop}, we will prepare the vehicle weighing pass once escrow advance is initiated.`;
    if (msg.toLowerCase().includes('price') || msg.toLowerCase().includes('rate') || msg.toLowerCase().includes('discount') || msg.toLowerCase().includes('offer')) {
      replyText = `Understood Karthik sir. I can offer an instant discount of ₹ 1.50/kg if you confirm bulk lifting with verified lorry receipt today!`;
    } else if (msg.toLowerCase().includes('sample') || msg.toLowerCase().includes('assay') || msg.toLowerCase().includes('quality')) {
      replyText = `Digital moisture and assay report is verified at ${chatConversations[currentKey]?.status?.split('•')[1] || 'farm gate'}. Quality is 100% guaranteed.`;
    }

    const reply = document.createElement('div');
    reply.className = 'chat-bubble incoming';
    reply.textContent = replyText;
    container.appendChild(reply);

    if (chatConversations[currentKey]) {
      chatConversations[currentKey].messages.push({ type: "incoming", text: replyText });
    }

    renderChatSidebar();
    container.scrollTop = container.scrollHeight;
  }, 900);
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

  const locations = ["Vashi Terminal, Navi Mumbai (MH)", "Pune APMC Central Hub, MH", "Nashik-Lasalgaon Yard, MH", "Nagpur Multi-Modal Terminal, MH", "Kolhapur Shahu Market Yard, MH", "Latur Mega Yard, MH"];
  let currIdx = 0;

  locBtn.addEventListener('click', () => {
    currIdx = (currIdx + 1) % locations.length;
    locText.textContent = locations[currIdx];
    showToast(`Active procurement hub updated to ${locations[currIdx]}`);
  });
}

// ==========================================
// LOGISTICS, ORDERS SHIPMENTS & ESCROW RELEASE
// ==========================================

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
  const readyGatePasses = consignments.filter(c => c.gate_pass).length;

  if (activeTrucksEl) activeTrucksEl.textContent = `${onRoadCount} On Road`;
  if (volumeTransitEl) volumeTransitEl.innerHTML = `${transitQt} Qt <span style="font-size:0.72rem; color:#64748b; font-weight:600;">(${transitKg.toLocaleString('en-IN')} kg)</span>`;
  if (gatePassesEl) gatePassesEl.textContent = `${readyGatePasses} Ready`;

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
        <div style="font-weight: 700; font-size: 1rem; color: #0f172a;">No Shipments Found in this Tab</div>
        <div style="font-size: 0.8rem; margin-top: 4px;">Book dedicated transport fleet or source from marketplace lots to create shipments.</div>
        <button class="btn btn-primary btn-sm" onclick="openBookTransportModal()" style="margin-top: 14px; background: #0c5a36; border-color: #0c5a36; font-weight: 700;">+ Book Transport Fleet</button>
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
            <strong style="color: #0f172a; font-size: 0.95rem;">Verified Driver & Fleet Telemetry Directory</strong>
            <span style="display: block; font-size: 0.75rem; color: #64748b;">Live GPS beacon tracking, commercial license status, weighbridge tare/gross load, and reefer temperatures</span>
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
          const statusLabel = isTransit ? 'On The Road' : (isDelivered ? 'Delivered & Released' : 'Pickup Scheduled');

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
                        <strong style="font-size: 1.02rem; color: #0f172a;">${s.driver}</strong>
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
                    <span style="color: #64748b; font-size: 0.68rem; display: block; text-transform: uppercase;">Vehicle & Model</span>
                    <strong style="color: #0f172a; font-size: 0.82rem;">${s.vehicle}</strong>
                  </div>
                  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 10px;">
                    <span style="color: #64748b; font-size: 0.68rem; display: block; text-transform: uppercase;">Commercial DL No.</span>
                    <strong style="color: #0f172a; font-size: 0.82rem;">${s.dl_no || 'MH-15-2019-0912'}</strong>
                  </div>
                  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 10px;">
                    <span style="color: #64748b; font-size: 0.68rem; display: block; text-transform: uppercase;">Payload Capacity</span>
                    <strong style="color: #0c5a36; font-size: 0.82rem;">${s.capacity || s.quantity_qt + ' Qt Payload'}</strong>
                  </div>
                  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 10px;">
                    <span style="color: #64748b; font-size: 0.68rem; display: block; text-transform: uppercase;">Cargo Temperature</span>
                    <strong style="color: #0284c7; font-size: 0.82rem;">${s.temp || '18.2°C (Optimal)'}</strong>
                  </div>
                </div>

                <!-- Route & Consignment Strip -->
                <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 9px 12px; font-size: 0.78rem; margin-bottom: 14px; color: #1e3a8a;">
                  <div style="display: flex; justify-content: space-between; margin-bottom: 2px;">
                    <span>📦 <strong>${s.crop}</strong> (${s.quantity_qt} Qt • ${qtyKg.toLocaleString('en-IN')} kg)</span>
                    <span style="font-family: monospace; font-weight: 700; color: #2563eb;">#${s.tracking_id}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px; font-size: 0.74rem; color: #3b82f6;">
                    <span>📍 ${s.loc}</span>
                    <span style="font-weight: 700; color: #1d4ed8;">⏱️ ${s.eta}</span>
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
    return;
  }

  container.innerHTML = filtered.map(s => {
    const qtyKg = s.quantity_kg || (s.quantity_qt * 100);
    const isTransit = s.status === 'transit';
    const isDelivered = s.status === 'delivered';
    const isScheduled = s.status === 'scheduled';

    const statusBadgeBg = isTransit ? '#eff6ff' : (isDelivered ? '#ecfdf5' : '#fefce8');
    const statusBadgeColor = isTransit ? '#1d4ed8' : (isDelivered ? '#047857' : '#a16207');
    const statusBadgeBorder = isTransit ? '#bfdbfe' : (isDelivered ? '#a7f3d0' : '#fef08a');
    const statusLabel = isTransit ? 'On The Road' : (isDelivered ? 'Delivered & QC Passed' : 'Pickup Scheduled');

    return `
      <div class="order-box">
        <div class="order-header-row">
          <div>
            <strong style="font-size:1.02rem; color:#0f172a;">${s.tracking_id}</strong>
            <span style="margin:0 8px; color:#cbd5e1;">|</span>
            <span style="font-size:0.82rem; color:#059669; font-weight:700;">Gate Pass: ${s.gate_pass}</span>
          </div>
          <span style="background:${statusBadgeBg}; color:${statusBadgeColor}; border:1px solid ${statusBadgeBorder}; padding:3px 10px; border-radius:999px; font-size:0.75rem; font-weight:800;">
            ● ${statusLabel}
          </span>
        </div>

        <!-- 4-Step Stepper (Exact match to Farmer Module) -->
        <div class="step-track">
          <div>
            <div class="step-dot done">✓</div>
            <div style="font-size:0.72rem; font-weight:700; color:#0f172a;">Confirmed</div>
          </div>
          <div>
            <div class="step-dot ${s.step >= 2 ? 'done' : ''}">${s.step >= 2 ? '✓' : '2'}</div>
            <div style="font-size:0.72rem; font-weight:700; color:#0f172a;">35% Advance Paid</div>
          </div>
          <div>
            <div class="step-dot ${s.step >= 3 ? (s.step === 3 ? 'active' : 'done') : ''}">${s.step > 3 ? '✓' : '3'}</div>
            <div style="font-size:0.72rem; font-weight:700; color:#0f172a;">In Truck</div>
          </div>
          <div>
            <div class="step-dot ${s.step >= 4 ? 'done' : ''}">${s.step === 4 ? '✓' : '4'}</div>
            <div style="font-size:0.72rem; font-weight:700; color:#0f172a;">Delivered</div>
          </div>
        </div>

        <!-- 3-Column Info Strip -->
        <div class="info-strip">
          <div>
            <div style="font-size:0.7rem; color:#64748b; font-weight:700; text-transform:uppercase;">PRODUCE & FARMER</div>
            <div style="font-weight:800; font-size:0.95rem; color:#0f172a;">${s.crop}</div>
            <div style="color:#059669; font-weight:700;">${s.quantity_qt} Qt (${qtyKg.toLocaleString('en-IN')} kg)</div>
            <div style="color:#64748b;">${s.farmer} (${s.farmer_origin})</div>
          </div>
          <div>
            <div style="font-size:0.7rem; color:#64748b; font-weight:700; text-transform:uppercase;">DRIVER & TRUCK</div>
            <div style="font-weight:800; color:#0f172a; display:flex; align-items:center; gap:6px;">
              <span>${s.driver}</span>
              <span style="font-size:0.68rem; background:#e0f2fe; color:#0369a1; padding:1px 5px; border-radius:3px; font-weight:700;">${s.transporter ? s.transporter.split(' ')[0] : 'Transit'}</span>
            </div>
            <div style="color:#334155; font-size:0.8rem; font-weight:600;">${s.vehicle}</div>
            <div style="font-size:0.78rem; display:flex; gap:8px; align-items:center; margin-top:2px;">
              <a href="tel:${s.driver_phone}" style="color:#0284c7; text-decoration:none; font-weight:700;">📞 ${s.driver_phone}</a>
              ${s.temp ? `<span style="color:#059669; font-size:0.72rem; font-weight:700;">🌡️ ${s.temp.split(' ')[0]}</span>` : ''}
            </div>
            ${s.dl_no ? `<div style="font-size:0.68rem; color:#64748b;">DL: ${s.dl_no}</div>` : ''}
          </div>
          <div>
            <div style="font-size:0.7rem; color:#64748b; font-weight:700; text-transform:uppercase;">DELIVERY STATUS</div>
            <div style="color:#0f172a; font-weight:700;">${s.destination}</div>
            <div style="color:#0284c7; font-weight:700;">📍 ${s.loc}</div>
            <div style="color:#d97706; font-weight:700;">⏱️ ${s.eta}</div>
          </div>
        </div>

        <!-- Actions -->
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
          <div style="font-size:0.82rem; color:#475569;">
            Total: <strong>₹ ${s.total_val.toLocaleString('en-IN')}</strong> • <span style="color:#059669; font-weight:700;">35% Advance ₹ ${s.adv_paid.toLocaleString('en-IN')} locked in escrow</span>
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap;">
            <button class="btn btn-outline btn-sm" onclick="openDriverFleetModal('${s.tracking_id}')" style="display:flex; align-items:center; gap:4px; font-weight:700; color:#0f172a; border-color:#94a3b8;">
              <span>🚚</span> Driver & Vehicle
            </button>
            <button class="btn btn-outline btn-sm" onclick="openLorryReceiptModal('${s.tracking_id}')">📑 Gate Pass</button>
            ${isTransit ? `
              <button class="btn btn-primary btn-sm" onclick="openGpsModal('${s.tracking_id}', '${s.vehicle}', '${s.driver}', '${s.loc}')">📍 Track Location</button>
              <button class="btn btn-outline btn-sm" onclick="openArrivalReleaseModal('${s.tracking_id}', '${s.crop}', ${s.balance_due}, '${s.farmer}', ${s.total_val}, ${s.adv_paid})" style="color:#0c5a36; border-color:#86efac; font-weight:700;">✓ Confirm Arrival & QC Release</button>
            ` : isScheduled ? `
              <a href="tel:${s.driver_phone}" class="btn btn-primary btn-sm" style="text-decoration:none;">📞 Call Driver</a>
            ` : `
              <button class="btn btn-primary btn-sm" disabled style="background:#15803d; border-color:#15803d; opacity:0.9; cursor:default;">✓ 100% Settled</button>
            `}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

let currentSelectedShipmentId = 'TRK-EXP-9921-MH';

function openDriverFleetModal(trackingId) {
  const modal = document.getElementById('modal-driver-fleet');
  if (!modal) return;

  const consignments = (buyerData && buyerData.consignments) ? buyerData.consignments : [];
  const s = consignments.find(c => c.tracking_id === trackingId) || consignments[0];
  if (!s) return;

  currentSelectedShipmentId = s.tracking_id;

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

  if (trkEl) trkEl.textContent = `Consignment #${s.tracking_id} • Gate Pass: ${s.gate_pass}`;
  if (nameEl) nameEl.textContent = s.driver;
  if (partnerEl) partnerEl.textContent = s.transporter || 'Sahyadri Kisan Logistics';
  if (callBtn) {
    callBtn.href = `tel:${s.driver_phone}`;
    callBtn.innerHTML = `<span>📞</span> Call (${s.driver_phone})`;
  }
  if (vehEl) vehEl.textContent = s.vehicle;
  if (dlEl) dlEl.textContent = s.dl_no || 'MH-15-2019-0912';
  const qtyKg = s.quantity_kg || (s.quantity_qt * 100);
  if (capEl) capEl.textContent = s.capacity || `${s.quantity_qt} Qt (${qtyKg.toLocaleString('en-IN')} kg Payload)`;
  if (fastagEl) fastagEl.textContent = s.fastag || 'Active (₹ 1,450 Balance)';
  if (sealEl) sealEl.textContent = s.gate_seal || '#SEAL-88912';
  if (tempEl) tempEl.textContent = s.temp || '18.2°C (Optimal)';
  if (locEl) locEl.textContent = s.loc;
  if (etaEl) etaEl.textContent = `ETA: ${s.eta}`;
  if (gpsIdEl) gpsIdEl.textContent = s.gps_device_id || 'GPS-AIS140-88120';

  modal.classList.add('active');
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

  if (s) {
    const titleEl = document.getElementById('lr-id-display');
    const subEl = document.getElementById('lr-tracking-subtitle');
    const cropEl = document.getElementById('lr-crop-title');
    const vehEl = document.getElementById('lr-vehicle-display');
    const driverEl = document.getElementById('lr-driver-display');

    if (titleEl) titleEl.textContent = s.tracking_id;
    if (subEl) subEl.textContent = `Gate Pass: ${s.gate_pass} • LR No: LR-${s.tracking_id.replace(/[^0-9]/g, '') || '9921'} • AgriNex Logistics`;
    if (cropEl) cropEl.textContent = `${s.quantity_qt} Qt ${s.crop}`;
    if (vehEl) vehEl.textContent = s.vehicle;
    if (driverEl) driverEl.textContent = `${s.driver} (${s.driver_phone})`;
  } else if (trackingId) {
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

  activeArrivalDisbursement = {
    trackingId: trackingId || 'ESC-MH-9921',
    crop: crop || 'Tomato (Narayangaon Hybrid 50 Qt)',
    amount: parsedAmt,
    farmer: farmer || 'Rameshwar Patil',
    totalVal: parsedTotal,
    advVal: parsedAdv,
    cardId: inferredCardId
  };

  const modal = document.getElementById('modal-confirm-arrival');
  if (!modal) return;

  const trackEl = document.getElementById('arrival-tracking-id');
  const releaseEl = document.getElementById('arrival-release-val');
  const totalEl = document.getElementById('arrival-total-val');
  const advEl = document.getElementById('arrival-adv-val');

  if (trackEl) trackEl.textContent = `Consignment #${activeArrivalDisbursement.trackingId} • ${activeArrivalDisbursement.crop}`;
  if (releaseEl) releaseEl.textContent = `₹ ${activeArrivalDisbursement.amount.toLocaleString('en-IN')}`;
  if (totalEl) totalEl.textContent = `₹ ${activeArrivalDisbursement.totalVal.toLocaleString('en-IN')}`;
  if (advEl) advEl.textContent = `₹ ${activeArrivalDisbursement.advVal.toLocaleString('en-IN')}`;

  modal.classList.add('active');
}

function closeArrivalReleaseModal() {
  const modal = document.getElementById('modal-confirm-arrival');
  if (modal) modal.classList.remove('active');
}

function confirmReleaseEscrowAction() {
  closeArrivalReleaseModal();
  const amtStr = `₹ ${activeArrivalDisbursement.amount.toLocaleString('en-IN')}`;
  const cardId = activeArrivalDisbursement.cardId;

  // Determine contract index
  let idx = '1';
  if (cardId === 'escrow-card-2' || activeArrivalDisbursement.trackingId.includes('4412')) idx = '2';
  else if (cardId === 'escrow-card-3' || activeArrivalDisbursement.trackingId.includes('7730')) idx = '3';

  // 1. Update status badge
  const statusBadge = document.getElementById(`escrow-status-badge-${idx}`) || document.getElementById('escrow-status-badge');
  if (statusBadge) {
    statusBadge.className = 'badge';
    statusBadge.style.background = '#15803d';
    statusBadge.style.color = '#ffffff';
    statusBadge.textContent = '✓ 100% Settled & Released';
  }

  // 2. Update Stepper dot 4
  const dotSettled = document.getElementById(`stepper-dot-settled-${idx}`) || document.getElementById('stepper-dot-settled');
  if (dotSettled) {
    dotSettled.className = 'stepper-dot active';
    dotSettled.textContent = '✓';
    dotSettled.style.background = '#15803d';
    dotSettled.style.borderColor = '#15803d';
    dotSettled.style.color = '#ffffff';
  }

  // 3. Update release button
  const btnVault = document.getElementById(`btn-escrow-vault-release-${idx}`) || document.getElementById('btn-escrow-vault-release');
  if (btnVault) {
    btnVault.disabled = true;
    btnVault.textContent = '✓ 100% Escrow Settled';
    btnVault.style.background = '#15803d';
    btnVault.style.borderColor = '#15803d';
    btnVault.style.color = '#ffffff';
    btnVault.style.cursor = 'default';
  }

  // Also check if card element has any remaining release button
  const cardEl = document.getElementById(cardId);
  if (cardEl) {
    const cardBtns = cardEl.querySelectorAll('button.btn-primary');
    cardBtns.forEach(b => {
      b.disabled = true;
      b.textContent = '✓ 100% Escrow Settled';
      b.style.background = '#15803d';
      b.style.borderColor = '#15803d';
      b.style.color = '#ffffff';
    });
  }

  // 4. Update Consignment arrival button if present
  const btnArrival = document.getElementById('btn-arrival-release-1');
  if (btnArrival && (idx === '1' || activeArrivalDisbursement.trackingId.includes('9921'))) {
    btnArrival.textContent = '✓ Delivered & Released';
    btnArrival.disabled = true;
    btnArrival.style.background = '#15803d';
    btnArrival.style.borderColor = '#15803d';
  }

  // 5. Update top aggregate metric
  const settledTotalEl = document.getElementById('escrow-settled-total');
  if (settledTotalEl) {
    const curVal = 580000 + (idx === '1' ? 60000 : (idx === '2' ? 144000 : 126000));
    settledTotalEl.textContent = `₹ ${curVal.toLocaleString('en-IN')}`;
  }

  // 6. Insert new transaction record in Audit Ledger Table
  const tbody = document.getElementById('escrow-ledger-tbody');
  if (tbody) {
    const newRow = document.createElement('tr');
    newRow.setAttribute('data-type', 'final');
    newRow.style.cssText = 'border-bottom: 1px solid #f1f5f9; background: #f0fdf4; transition: all 0.3s ease;';
    const randomUtr = `ICIC000${Math.floor(100000 + Math.random() * 900000)}`;
    const randomTxn = `TXN-REL-${Math.floor(1000 + Math.random() * 9000)}`;
    newRow.innerHTML = `
      <td style="padding: 10px 14px;"><strong>${randomTxn}</strong><br><span style="font-size: 0.72rem; color: #166534; font-weight: 700;">Just now (Live)</span></td>
      <td style="padding: 10px 14px;"><span style="font-family: monospace; font-weight: 700; color: #0c5a36;">#${activeArrivalDisbursement.trackingId}</span></td>
      <td style="padding: 10px 14px;"><strong>${activeArrivalDisbursement.farmer}</strong><br><span style="font-size: 0.72rem; color: #64748b;">${activeArrivalDisbursement.crop}</span></td>
      <td style="padding: 10px 14px; font-weight: 800; color: #0c5a36;">₹ ${activeArrivalDisbursement.amount.toLocaleString('en-IN')}</td>
      <td style="padding: 10px 14px;"><span class="badge" style="background: #15803d; color: #ffffff; font-size: 0.72rem; font-weight: 700;">✓ 100% Settled</span></td>
      <td style="padding: 10px 14px;"><span style="font-size: 0.75rem; color: #0c5a36; font-family: monospace; font-weight: 700;">${randomUtr}</span></td>
      <td style="padding: 10px 14px;"><button class="btn btn-outline btn-sm" onclick="showToast('✓ Stamped UTR Settlement Receipt #${activeArrivalDisbursement.trackingId} (PDF) downloaded!')" style="font-size: 0.72rem; padding: 2px 8px;">Receipt</button></td>
    `;
    tbody.insertBefore(newRow, tbody.firstChild);
  }

  // Update Consignments list status
  if (buyerData && buyerData.consignments) {
    const cItem = buyerData.consignments.find(c => c.tracking_id === activeArrivalDisbursement.trackingId || (activeArrivalDisbursement.trackingId && c.tracking_id.includes(activeArrivalDisbursement.trackingId.replace('ESC-', 'TRK-'))));
    if (cItem) {
      cItem.status = 'delivered';
      cItem.status_label = 'Delivered & QC Passed';
      cItem.step = 4;
      cItem.loc = 'Delivered & 100% Escrow Settled';
      cItem.eta = 'Completed • QC Passed 100%';
    }
  }
  if (typeof renderBuyerConsignments === 'function') {
    renderBuyerConsignments();
  }

  showToast(`🎉 Quality verified! ${amtStr} released to ${activeArrivalDisbursement.farmer}. Contract 100% Settled!`, 'success');
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

  if (trackNumEl) trackNumEl.textContent = trackingId || (s ? s.tracking_id : 'TRK-EXP-9921-MH');
  if (vehEl) vehEl.textContent = vehicle || (s ? s.vehicle : 'Tata 407 LPT (MH 15 AG 8842)');
  if (driverEl) driverEl.textContent = driver || (s ? s.driver : 'Sanjay Shinde');
  if (corridorEl) corridorEl.textContent = corridor || (s ? s.loc : 'Nashik-Mumbai Samruddhi Expressway');

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
  renderBuyerConsignments();
  renderGrievances();
  renderBuyerEmergencyDesk();
  renderChatSidebar();
  initLocationSwitcher();
  renderStorageFacilities();
  renderStorageBookings();

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
  const priceInput = document.getElementById('demand-price');
  if (priceInput) {
    priceInput.addEventListener('input', updateDemandPricePreview);
  }

// New Demand Form submit
const demandForm = document.getElementById('form-new-demand');
if (demandForm) {
  demandForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const crop = document.getElementById('demand-crop').value;
    const tonnage = parseFloat(document.getElementById('demand-tonnage').value) || 50;
    const unit = document.getElementById('demand-unit')?.value || 'Qt';
    const price = document.getElementById('demand-price').value;
    const priceUnit = document.getElementById('demand-price-unit')?.value || 'qt';
    const numPrice = parseFloat(price) || 1250;

    let pricePerQt = numPrice;
    let pricePerKg = (numPrice / 100).toFixed(2);
    if (priceUnit === 'kg') {
      pricePerKg = numPrice.toFixed(2);
      pricePerQt = Math.round(numPrice * 100);
    }

    const newId = `DEM-BB-${Math.floor(100 + Math.random() * 900)}`;
    const displayTonnage = unit === 'kg' ? `${tonnage.toLocaleString('en-IN')} kg (${(tonnage / 100).toFixed(1)} Qt)` : `${tonnage} Qt (${(tonnage * 100).toLocaleString('en-IN')} kg)`;
    const numQt = unit === 'kg' ? Math.round(tonnage / 100) : tonnage;

    buyerData.buyerDemands.unshift({
      id: newId,
      crop: crop,
      category: "Agricultural Crop",
      image: crop.toLowerCase().includes('onion') ? 'assets/images/onion.jpg' : 'assets/images/tomato.jpg',
      tonnage: displayTonnage,
      tonnageNum: numQt,
      unit: "Qt",
      targetPrice: `₹ ${pricePerKg}/kg (₹ ${pricePerQt.toLocaleString('en-IN')} /Qt)`,
      targetPriceNum: pricePerQt,
      pricePerKg: parseFloat(pricePerKg),
      mandiBenchmark: `₹ ${(pricePerQt * 1.14 / 100).toFixed(2)}/kg (₹ ${Math.round(pricePerQt * 1.14).toLocaleString('en-IN')} /Qt)`,
      savingsPct: "12.3% Savings",
      location: "Vashi APMC Central Terminal, Navi Mumbai, MH",
      deadline: "28 Sep 2026",
      daysLeft: 15,
      matchedCount: 2,
      fulfilledTonnage: 0,
      fulfilledPct: 0,
      status: "Broadcasting",
      statusClass: "badge-status-open",
      statusLabel: "● Broadcasting Quota",
      grade: "Grade A Commercial",
      moistureLimit: "QC Guaranteed",
      deliveryMode: "Farm-Gate Pickup",
      escrowAdvance: `35% Advance (₹ ${Math.round(pricePerQt * tonnage * 10 * 0.35).toLocaleString('en-IN')})`,
      bids: [
        {
          bidId: `BID-NEW-${Math.floor(100 + Math.random() * 900)}`,
          farmerName: "Regional Farm Cluster",
          farmerAvatar: "assets/images/tomato.jpg",
          farmerPhone: "+91 98221-55420",
          location: "Lasalgaon APMC Hub (Nashik, MH)",
          rating: "4.9 ⭐",
          offeredQty: `${Math.round(tonnage * 0.4)} ${unit}`,
          bidPrice: `₹ ${pricePerKg}/kg (₹ ${pricePerQt.toLocaleString('en-IN')} /Qt)`,
          bidPriceNum: pricePerQt,
          pricePerKg: parseFloat(pricePerKg),
          qcScore: "95% (Grade A)",
          leadTime: "6 Hours",
          status: "New Match"
        }
      ]
    });

    renderBuyerDemands();
    closePostDemandModal();
    showToast(`✓ Procurement quota for ${tonnage} ${unit} of ${crop} broadcasted to regional farmers!`, 'success');
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

  // Book Farm-Gate Transport Fleet submit
  const transportForm = document.getElementById('form-book-transport');
  if (transportForm) {
    transportForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const lotRaw = document.getElementById('transport-lot-select')?.value || '';
      const [lotId, cropName, quantity, originAddr, farmerName, escrowAmt] = lotRaw.split('|');

      const destRaw = document.getElementById('transport-destination')?.value || 'Vashi Central Hub, Navi Mumbai, MH|185 km';
      const [destName, distStr] = destRaw.split('|');

      const partnerRaw = document.getElementById('transport-partner')?.value || 'Sahyadri Kisan Logistics|Sanjay Shinde|+91 98221-55420|MH 15 AG 8842';
      const [partnerName, driverName, driverPhone, vehicleNum] = partnerRaw.split('|');

      const selectedVehEl = document.querySelector('input[name="vehicle-type"]:checked');
      const vehRaw = selectedVehEl ? selectedVehEl.value : 'Tata 407 LPT (MH 15 AG 8842)|5800';
      const vehName = vehRaw.split('|')[0];

      const newTrkId = `TRK-GW-${Math.floor(1000 + Math.random() * 9000)}-MH`;
      const newGatePass = `GP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      const parsedQt = parseFloat(quantity) || 50;
      const parsedKg = parsedQt * 100;
      const totalEstimatedVal = (parsedQt * 1200) || 60000;
      const advEstimated = Math.round(totalEstimatedVal * 0.35);
      const balEstimated = totalEstimatedVal - advEstimated;

      if (!buyerData.consignments) buyerData.consignments = [];

      buyerData.consignments.unshift({
        tracking_id: newTrkId,
        gate_pass: newGatePass,
        crop: cropName || 'Direct Farm Lot',
        quantity_qt: parsedQt,
        quantity_kg: parsedKg,
        farmer: farmerName || 'Rameshwar Patil',
        farmer_phone: '+91 98221-55420',
        farmer_origin: originAddr || 'Farm-Gate',
        destination: destName,
        driver: driverName || 'Sanjay Shinde',
        driver_phone: driverPhone || '+91 98221-55420',
        vehicle: `${vehName} (${vehicleNum || 'MH 15 AG 8842'})`,
        status: 'transit',
        status_label: 'On The Road',
        step: 3,
        loc: `${originAddr || 'Farm-Gate'} ➔ ${destName} (Dispatched)`,
        eta: 'Today 5:30 PM',
        total_val: totalEstimatedVal,
        adv_paid: advEstimated,
        balance_due: balEstimated,
        assay_moisture: '82.0% (Certified)',
        gross_wt: `${parsedKg + 2850} kg`,
        tare_wt: '2,850 kg',
        gate_seal: `#SEAL-${Math.floor(10000 + Math.random() * 90000)}`
      });

      renderBuyerConsignments();
      closeBookTransportModal();
      showToast(`🚚 Fleet booked successfully! Consignment #${newTrkId} dispatched for ${cropName || 'Farm Lot'}.`);
      switchView('view-consignments');
    });
  }
});

function updateDemandPricePreview() {
  const priceInput = document.getElementById('demand-price');
  const unitSelect = document.getElementById('demand-price-unit');
  const previewEl = document.getElementById('demand-price-preview');
  if (!priceInput || !previewEl) return;

  const rawVal = parseFloat(priceInput.value) || 0;
  const isKg = (unitSelect && unitSelect.value === 'kg');

  if (isKg) {
    const qtEquiv = (rawVal * 100).toLocaleString('en-IN');
    previewEl.innerHTML = `= <strong>₹ ${qtEquiv} /Qt</strong>`;
  } else {
    const kgEquiv = (rawVal / 100).toFixed(2);
    previewEl.innerHTML = `= <strong>₹ ${kgEquiv} /kg</strong>`;
  }
}

// ESCROW VAULT INTERACTION & AUDIT HELPERS
// ==========================================
function openDepositEscrowModal() {
  const modal = document.getElementById('modal-deposit-escrow');
  if (modal) modal.classList.add('active');
}

function closeDepositEscrowModal() {
  const modal = document.getElementById('modal-deposit-escrow');
  if (modal) modal.classList.remove('active');
}

function handleDepositEscrowSubmit(e) {
  if (e) e.preventDefault();
  const amtInput = document.getElementById('escrow-deposit-amount');
  const amount = parseFloat((amtInput && amtInput.value) || 50000);
  
  closeDepositEscrowModal();
  showToast(`🔒 Authorizing RBI Nodal Escrow Virtual Account transfer of ₹ ${amount.toLocaleString('en-IN')}...`);
  
  setTimeout(() => {
    showToast(`✓ Payment captured! ₹ ${amount.toLocaleString('en-IN')} added to Escrow Liquidity Pool. UTR: ICIC${Math.floor(10000000 + Math.random() * 90000000)}`, 'success');
  }, 900);
}

function openEscrowDeedModal(contractId, crop, farmer, totalVal, lockedVal) {
  const modal = document.getElementById('modal-escrow-deed');
  if (!modal) return;

  const refEl = document.getElementById('deed-contract-ref');
  const farmerEl = document.getElementById('deed-farmer-name');
  const lotEl = document.getElementById('deed-produce-lot');
  const totalEl = document.getElementById('deed-total-val');
  const lockedEl = document.getElementById('deed-locked-amt');

  if (refEl) refEl.textContent = `Contract Reference: #${contractId || 'ESC-MH-9921'}`;
  if (farmerEl) farmerEl.textContent = farmer || 'Rameshwar Patil';
  if (lotEl) lotEl.textContent = crop || 'Tomato (Narayangaon Hybrid 50 Qt)';
  if (totalEl) totalEl.textContent = `₹ ${(totalVal || 60000).toLocaleString('en-IN')}`;
  if (lockedEl) lockedEl.textContent = `₹ ${(lockedVal || 21000).toLocaleString('en-IN')}`;

  modal.classList.add('active');
}

function closeEscrowDeedModal() {
  const modal = document.getElementById('modal-escrow-deed');
  if (modal) modal.classList.remove('active');
}

function downloadEscrowStatement() {
  showToast('Generating official AgriNex Nodal Escrow Audit Ledger Statement (PDF)...');
  setTimeout(() => {
    showToast('✓ Escrow Audit Statement (Q3-2026) downloaded successfully!');
  }, 800);
}

function filterEscrowLedger(filterType, btnEl) {
  const tbody = document.getElementById('escrow-ledger-tbody');
  if (!tbody) return;

  if (btnEl && btnEl.parentElement) {
    const btns = btnEl.parentElement.querySelectorAll('button');
    btns.forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
  }

  const rows = tbody.querySelectorAll('tr');
  rows.forEach(r => {
    const rowType = r.getAttribute('data-type');
    if (filterType === 'all' || rowType === filterType) {
      r.style.display = '';
    } else {
      r.style.display = 'none';
    }
  });
}

// Buyer Profile Modal Handlers
function openBuyerProfileModal() {
  const modal = document.getElementById('modal-buyer-profile');
  if (modal) modal.classList.add('active');
}

function closeBuyerProfileModal() {
  const modal = document.getElementById('modal-buyer-profile');
  if (modal) modal.classList.remove('active');
}

function showNotification(msg, type = 'info') {
  showToast(msg, type === 'error' ? 'error' : 'success');
}

// Window bindings for global HTML accessibility
window.openDepositEscrowModal = openDepositEscrowModal;
window.closeDepositEscrowModal = closeDepositEscrowModal;
window.handleDepositEscrowSubmit = handleDepositEscrowSubmit;
window.openEscrowDeedModal = openEscrowDeedModal;
window.closeEscrowDeedModal = closeEscrowDeedModal;
window.downloadEscrowStatement = downloadEscrowStatement;
window.filterEscrowLedger = filterEscrowLedger;
window.openArrivalReleaseModal = openArrivalReleaseModal;
window.closeArrivalReleaseModal = closeArrivalReleaseModal;
window.confirmReleaseEscrowAction = confirmReleaseEscrowAction;
window.openBookTransportModal = openBookTransportModal;
window.closeBookTransportModal = closeBookTransportModal;
window.openGatePassModal = openGatePassModal;
window.closeGatePassModal = closeGatePassModal;
window.openLorryReceiptModal = openLorryReceiptModal;
window.closeLorryReceiptModal = closeLorryReceiptModal;
window.openGpsModal = openGpsModal;
window.closeGpsModal = closeGpsModal;
window.printLorryReceipt = printLorryReceipt;
window.renderBuyerConsignments = renderBuyerConsignments;
window.filterBuyerShipmentsTab = filterBuyerShipmentsTab;
window.handleBuyerShipmentSearch = handleBuyerShipmentSearch;

// Demand Board Window Bindings
window.openDemandBidsModal = openDemandBidsModal;
window.closeDemandBidsModal = closeDemandBidsModal;
window.acceptDemandFarmerBid = acceptDemandFarmerBid;
window.sourceFromMarketplaceForDemand = sourceFromMarketplaceForDemand;
window.downloadPurchaseOrder = downloadPurchaseOrder;
window.downloadAllPurchaseOrders = downloadAllPurchaseOrders;
window.refreshDemandMatches = refreshDemandMatches;
window.handleDemandSearch = handleDemandSearch;
window.filterDemandsByStatus = filterDemandsByStatus;
window.filterDemandsByHub = filterDemandsByHub;
window.clearDemandFilters = clearDemandFilters;
window.openPostDemandModal = openPostDemandModal;
window.closePostDemandModal = closePostDemandModal;
window.updateDemandPricePreview = updateDemandPricePreview;
window.openBuyerProfileModal = openBuyerProfileModal;
window.closeBuyerProfileModal = closeBuyerProfileModal;
window.showNotification = showNotification;

// ==========================================
// FEATURE 9: COLD STORAGE, HERMETIC SILOS & e-NWR FINANCING
// ==========================================

function renderStorageFacilities(filterType = 'all') {
  const container = document.getElementById('storage-facilities-grid');
  if (!container || !buyerData || !buyerData.storageFacilities) return;

  const facilities = buyerData.storageFacilities.filter(f => {
    if (filterType === 'all') return true;
    return f.typeKey === filterType;
  });

  if (facilities.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #64748b;">No storage facilities match the selected filter.</div>`;
    return;
  }

  container.innerHTML = facilities.map(f => {
    const typeBadgeBg = f.typeKey === 'cold-storage' ? '#e0f2fe' : f.typeKey === 'dry-silo' ? '#fef3c7' : '#ffedd5';
    const typeBadgeColor = f.typeKey === 'cold-storage' ? '#0369a1' : f.typeKey === 'dry-silo' ? '#92400e' : '#c2410c';
    const typeIcon = f.typeKey === 'cold-storage' ? '❄️' : f.typeKey === 'dry-silo' ? '🌾' : '☀️';

    return `
      <div class="card" style="display: flex; flex-direction: column; justify-content: space-between; border-radius: 12px; border: 1px solid var(--border-default); overflow: hidden; transition: transform 0.2s, box-shadow 0.2s;">
        <div>
          <!-- Facility Card Top Header -->
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
            <span class="badge" style="background: ${typeBadgeBg}; color: ${typeBadgeColor}; font-weight: 800; font-size: 0.72rem; padding: 3px 8px; border-radius: 6px;">
              ${typeIcon} ${f.type}
            </span>
            <span style="font-weight: 700; font-size: 0.82rem; color: #0c5a36;">${f.rating}</span>
          </div>

          <h3 style="font-size: 1.05rem; font-weight: 800; color: #0f172a; margin-bottom: 4px; line-height: 1.35;">
            ${f.name}
          </h3>
          <div style="font-size: 0.78rem; color: #64748b; margin-bottom: 14px;">
            📍 ${f.location}
          </div>

          <!-- IoT Climate Sensors & Specs -->
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 12px; margin-bottom: 14px; font-size: 0.78rem; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <div>
              <span style="color: #64748b; display: block; font-size: 0.7rem;">Temp Controlled:</span>
              <strong style="color: #0c5a36;">${f.tempRange}</strong>
            </div>
            <div>
              <span style="color: #64748b; display: block; font-size: 0.7rem;">Humidity Index:</span>
              <strong style="color: #0284c7;">${f.humidity}</strong>
            </div>
          </div>

          <!-- Capacity Bar -->
          <div style="margin-bottom: 14px;">
            <div style="display: flex; justify-content: space-between; font-size: 0.76rem; margin-bottom: 4px;">
              <span style="color: #64748b;">Available Chamber Space:</span>
              <strong style="color: #0c5a36;">${f.availableCapacity} (${f.availablePct}% Open)</strong>
            </div>
            <div style="width: 100%; height: 8px; background: #e2e8f0; border-radius: 999px; overflow: hidden;">
              <div style="width: ${f.availablePct}%; height: 100%; background: linear-gradient(90deg, #10b981, #0c5a36); border-radius: 999px;"></div>
            </div>
            <div style="font-size: 0.7rem; color: #94a3b8; margin-top: 2px;">Total Facility Volume: ${f.totalCapacity}</div>
          </div>

          <!-- Suitable Crops Tags -->
          <div style="margin-bottom: 14px;">
            <span style="font-size: 0.72rem; color: #64748b; font-weight: 700; text-transform: uppercase;">Suitable Commodities:</span>
            <div style="display: flex; flex-wrap: wrap; gap: 4px; margin-top: 4px;">
              ${f.suitableCrops.map(c => `<span style="font-size: 0.7rem; background: #e8f5ed; color: #0c5a36; padding: 2px 6px; border-radius: 4px; font-weight: 600;">${c}</span>`).join('')}
            </div>
          </div>
        </div>

        <!-- Tariff & Actions Footer -->
        <div style="border-top: 1px solid var(--border-subtle); padding-top: 12px; margin-top: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 10px;">
            <div>
              <span style="font-size: 0.7rem; color: #64748b; display: block;">Storage Tariff</span>
              <span style="font-size: 1.05rem; font-weight: 800; color: #0c5a36;">${f.tariff}</span>
            </div>
            <span style="font-size: 0.74rem; color: #475569; font-weight: 600;">${f.tariffPerDay}</span>
          </div>

          <div style="display: flex; gap: 8px;">
            <button class="btn btn-outline btn-sm" onclick="showToast('Calling Hub Manager ${f.manager}...', 'info')" style="flex: 1;" title="${f.manager}">
              📞 Contact
            </button>
            <button class="btn btn-primary btn-sm" onclick="openBookStorageModal('${f.id}')" style="flex: 2; background: #0c5a36; border-color: #0c5a36; font-weight: 700;">
              ❄️ Book Space
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function renderStorageBookings() {
  const tbody = document.getElementById('storage-bookings-tbody');
  if (!tbody || !buyerData || !buyerData.activeStorageBookings) return;

  if (buyerData.activeStorageBookings.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 24px; color: #64748b;">No active storage chamber holdings currently registered.</td></tr>`;
    return;
  }

  tbody.innerHTML = buyerData.activeStorageBookings.map(b => `
    <tr>
      <td>
        <div style="font-weight: 800; font-family: monospace; color: #0c5a36; font-size: 0.88rem;">${b.id}</div>
        <div style="font-size: 0.75rem; color: #0f172a; font-weight: 600;">${b.warehouseName}</div>
        <span style="font-size: 0.7rem; color: #64748b;">${b.chamberNo}</span>
      </td>
      <td>
        <strong style="color: #0f172a; font-size: 0.88rem;">${b.crop}</strong>
        <div style="font-size: 0.72rem; color: #64748b;">Lot Ref: ${b.lotRef}</div>
      </td>
      <td>
        <strong style="color: #0c5a36; font-size: 0.95rem;">${b.quantity}</strong>
      </td>
      <td>
        <div style="font-size: 0.78rem; font-weight: 700; color: #0369a1;">🌡️ ${b.tempCurrent}</div>
        <div style="font-size: 0.72rem; color: #64748b;">💧 ${b.humidityCurrent}</div>
      </td>
      <td>
        <div style="font-size: 0.78rem; color: #0f172a; font-weight: 600;">${b.expiryDate}</div>
        <span style="font-size: 0.72rem; color: #64748b;">Cost: ${b.monthlyCost}/mo</span>
      </td>
      <td>
        <div style="font-family: monospace; font-weight: 800; color: #2563eb; font-size: 0.78rem;">${b.eNwrReceiptNo}</div>
        <div style="font-size: 0.75rem; color: #166534; font-weight: 700;">⚡ Loan: ${b.pledgeLoanEligible}</div>
      </td>
      <td>
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <button class="btn btn-primary btn-sm" onclick="openEnwrPledgeModal('${b.id}')" style="background: #2563eb; border-color: #2563eb; font-size: 0.72rem; padding: 4px 8px; font-weight: 700;">
            ⚡ Draw 70% Loan
          </button>
          <button class="btn btn-outline btn-sm" onclick="showToast('Dispatch release request submitted for ${b.id}! Gate pass generated.')" style="font-size: 0.72rem; padding: 4px 8px;">
            📦 Release Stock
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function filterStorageFacilities(filterType, btnEl) {
  if (btnEl && btnEl.parentElement) {
    const btns = btnEl.parentElement.querySelectorAll('.storage-filter-btn');
    btns.forEach(b => {
      b.classList.remove('active');
      b.classList.remove('btn-primary');
      b.classList.add('btn-outline');
    });
    btnEl.classList.add('active');
    btnEl.classList.remove('btn-outline');
    btnEl.classList.add('btn-primary');
  }
  renderStorageFacilities(filterType);
}

function openBookStorageModal(facilityId) {
  const modal = document.getElementById('modal-book-storage');
  if (!modal) return;

  const facility = (buyerData.storageFacilities || []).find(f => f.id === facilityId) || buyerData.storageFacilities[0];
  if (facility) {
    const titleEl = document.getElementById('storage-modal-facility-title');
    const tempEl = document.getElementById('storage-modal-temp');
    const humEl = document.getElementById('storage-modal-humidity');
    const facIdInput = document.getElementById('storage-facility-id');

    if (titleEl) titleEl.textContent = `${facility.name} (${facility.location})`;
    if (tempEl) tempEl.textContent = facility.tempRange;
    if (humEl) humEl.textContent = facility.humidity;
    if (facIdInput) facIdInput.value = facility.id;
  }

  calculateStorageCostPreview();
  modal.classList.add('active');
}

function closeBookStorageModal() {
  const modal = document.getElementById('modal-book-storage');
  if (modal) modal.classList.remove('active');
}

function updateStorageBookingCrop(val) {
  calculateStorageCostPreview();
}

function calculateStorageCostPreview() {
  const facId = document.getElementById('storage-facility-id')?.value || 'WH-ERD-01';
  const facility = (buyerData.storageFacilities || []).find(f => f.id === facId) || buyerData.storageFacilities[0];

  const qtyInput = document.getElementById('storage-book-qty');
  const unitSelect = document.getElementById('storage-book-unit');
  const tenureSelect = document.getElementById('storage-book-tenure');

  const rawQty = parseFloat(qtyInput?.value || 50);
  const unit = unitSelect?.value || 'Qt';
  const days = parseInt(tenureSelect?.value || 30);

  // Convert to Qt
  const qtyInQt = unit === 'kg' ? rawQty / 100 : rawQty;
  const monthlyRatePerQt = facId === 'WH-ERD-01' ? 45 : facId === 'WH-SLM-02' ? 35 : facId === 'WH-NSK-03' ? 40 : 55;

  const totalCost = Math.round(qtyInQt * monthlyRatePerQt * (days / 30));

  const rateEl = document.getElementById('storage-rate-display');
  const feeEl = document.getElementById('storage-total-fee-display');

  if (rateEl) rateEl.textContent = `₹ ${monthlyRatePerQt} /Qt /Month (₹ ${(monthlyRatePerQt / 100).toFixed(2)} /kg)`;
  if (feeEl) feeEl.textContent = `₹ ${totalCost.toLocaleString('en-IN')}`;
}

function handleBookStorageSubmit(e) {
  if (e) e.preventDefault();

  const facId = document.getElementById('storage-facility-id')?.value || 'WH-NSK-01';
  const facility = (buyerData.storageFacilities || []).find(f => f.id === facId) || buyerData.storageFacilities[0];

  const lotRaw = document.getElementById('storage-lot-select')?.value || 'LOT-TOM-88|Tomato (Narayangaon Hybrid)|50 Qt (5,000 kg)';
  const [lotId, cropName, qtyText] = lotRaw.split('|');

  const rawQty = parseFloat(document.getElementById('storage-book-qty')?.value || 50);
  const unit = document.getElementById('storage-book-unit')?.value || 'Qt';
  const days = parseInt(document.getElementById('storage-book-tenure')?.value || 30);

  const newBookingId = `STR-2026-${Math.floor(100 + Math.random() * 900)}`;
  const receiptNo = `eNWR-MH-2026-${Math.floor(10000 + Math.random() * 90000)}`;

  const qtyInQt = unit === 'kg' ? rawQty / 100 : rawQty;
  const qtyInKg = unit === 'kg' ? rawQty : rawQty * 100;
  const monthlyRatePerQt = facId === 'WH-NSK-01' ? 40 : facId === 'WH-PUN-02' ? 50 : facId === 'WH-LAT-03' ? 35 : 45;
  const totalCost = Math.round(qtyInQt * monthlyRatePerQt * (days / 30));
  const benchmarkRateKg = 12.00;
  const maxLoan = Math.round(qtyInKg * benchmarkRateKg * 0.70);

  const newBooking = {
    id: newBookingId,
    warehouseId: facility.id,
    warehouseName: facility.name,
    crop: cropName || 'Agricultural Produce',
    quantity: `${qtyInQt} Qt (${qtyInKg.toLocaleString('en-IN')} kg)`,
    lotRef: lotId || 'LOT-PROD-01',
    chamberNo: `Chamber #${Math.floor(1 + Math.random() * 8)}-${String.fromCharCode(65 + Math.floor(Math.random() * 4))}`,
    tempCurrent: facility.tempRange.split(' ')[0] || '3.5°C',
    humidityCurrent: facility.humidity.split(' ')[0] || '88% RH',
    bookingDate: '13 Sep 2026',
    expiryDate: `${days} Days (${days <= 30 ? 'Active' : 'Extended'})`,
    monthlyCost: `₹ ${totalCost.toLocaleString('en-IN')}`,
    status: 'In Storage (Active)',
    statusBadgeClass: 'badge-status-open',
    eNwrReceiptNo: receiptNo,
    pledgeLoanEligible: `₹ ${maxLoan.toLocaleString('en-IN')} (70% LTV)`
  };

  buyerData.activeStorageBookings.unshift(newBooking);

  // Update KPI counters
  const spaceKpi = document.getElementById('storage-active-space');
  if (spaceKpi) {
    const totalBookedQt = buyerData.activeStorageBookings.reduce((sum, b) => sum + (parseFloat(b.quantity) || 50), 0);
    spaceKpi.textContent = `${totalBookedQt} Qt`;
  }

  closeBookStorageModal();
  renderStorageBookings();
  showToast(`❄️ Storage Chamber Booked! Receipt #${receiptNo} generated with ₹ ${maxLoan.toLocaleString('en-IN')} pledge loan eligibility.`, 'success');
  switchView('view-storage');
}

function openEnwrPledgeModal(bookingId) {
  const modal = document.getElementById('modal-enwr-pledge');
  if (!modal) return;

  const booking = (buyerData.activeStorageBookings || []).find(b => b.id === bookingId) || buyerData.activeStorageBookings[0];
  if (booking) {
    const recEl = document.getElementById('enwr-receipt-ref');
    const lotEl = document.getElementById('enwr-modal-lot');
    const valEl = document.getElementById('enwr-modal-val');
    const maxLoanEl = document.getElementById('enwr-modal-max-loan');
    const loanInput = document.getElementById('enwr-draw-amount');
    const bookIdInput = document.getElementById('enwr-booking-id');

    if (recEl) recEl.textContent = `WDRA Certificate #${booking.eNwrReceiptNo}`;
    if (lotEl) lotEl.textContent = `${booking.crop} • ${booking.quantity}`;
    if (bookIdInput) bookIdInput.value = booking.id;

    const qtyQt = parseFloat(booking.quantity) || 50;
    const estVal = qtyQt * 1200;
    const maxLoan = Math.round(estVal * 0.70);

    if (valEl) valEl.textContent = `₹ ${estVal.toLocaleString('en-IN')} (₹ 12.00 /kg Mandi Rate)`;
    if (maxLoanEl) maxLoanEl.textContent = `₹ ${maxLoan.toLocaleString('en-IN')}`;
    if (loanInput) {
      loanInput.value = maxLoan;
      loanInput.max = maxLoan;
    }
  }

  modal.classList.add('active');
}

function closeEnwrPledgeModal() {
  const modal = document.getElementById('modal-enwr-pledge');
  if (modal) modal.classList.remove('active');
}

function handleEnwrPledgeSubmit(e) {
  if (e) e.preventDefault();

  const drawAmt = parseFloat(document.getElementById('enwr-draw-amount')?.value || 42000);
  const bank = document.getElementById('enwr-bank-partner')?.value || 'State Bank of India (SBI) Agri Credit';

  closeEnwrPledgeModal();
  showToast(`🏛️ Digital lien registered on WDRA registry in favor of ${bank.split('(')[0]}...`);

  setTimeout(() => {
    showToast(`✓ ₹ ${drawAmt.toLocaleString('en-IN')} pledge loan disbursed instantly to your AgriNex Escrow Account!`, 'success');
  }, 900);
}

// Storage & Logistics Window Bindings
window.renderStorageFacilities = renderStorageFacilities;
window.renderStorageBookings = renderStorageBookings;
window.filterStorageFacilities = filterStorageFacilities;
window.openBookStorageModal = openBookStorageModal;
window.closeBookStorageModal = closeBookStorageModal;
window.updateStorageBookingCrop = updateStorageBookingCrop;
window.calculateStorageCostPreview = calculateStorageCostPreview;
window.handleBookStorageSubmit = handleBookStorageSubmit;
window.openEnwrPledgeModal = openEnwrPledgeModal;
window.closeEnwrPledgeModal = closeEnwrPledgeModal;
window.handleEnwrPledgeSubmit = handleEnwrPledgeSubmit;
window.openDriverFleetModal = openDriverFleetModal;
window.closeDriverFleetModal = closeDriverFleetModal;
window.openGpsFromDriverModal = openGpsFromDriverModal;
window.filterBuyerShipmentsTab = filterBuyerShipmentsTab;
window.handleBuyerShipmentSearch = handleBuyerShipmentSearch;
window.renderBuyerConsignments = renderBuyerConsignments;
window.openLorryReceiptModal = openLorryReceiptModal;
window.closeLorryReceiptModal = closeLorryReceiptModal;
window.openGpsModal = openGpsModal;
window.closeGpsModal = closeGpsModal;
window.openArrivalReleaseModal = openArrivalReleaseModal;
window.closeArrivalReleaseModal = closeArrivalReleaseModal;
window.confirmReleaseEscrowAction = confirmReleaseEscrowAction;
window.openBookTransportModal = openBookTransportModal;
window.closeBookTransportModal = closeBookTransportModal;
window.calculateTransportEstimate = calculateTransportEstimate;
window.updateTransportLotMeta = updateTransportLotMeta;

