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

// Chat Messaging Data Store & Functionality (Dynamic for ALL Marketplace Farmers)
const chatConversations = {
  gowran: {
    name: "gowran",
    avatar: "assets/images/onion.jpg",
    status: "● Online • Erode, Tamil Nadu",
    lotId: "LOT-ONI-01",
    crop: "Onion (Grade A)",
    farmerPhone: "+91 98422-77102",
    offerText: "Farmer Ask Rate: <strong style=\"color: #0c5a36;\">₹ 30 /kg</strong> (₹ 3,000/Qt) for 15 kg (Near APMC Mandi)",
    counterRate: 3000,
    lockRateText: "Lock 35% Escrow (₹ 30/kg)",
    messages: [
      { type: "incoming", text: "Vanakkam Karthik sir! I have 15 kg export-graded red onions ready at Erode APMC gate." },
      { type: "outgoing", text: "Hello gowran! We are looking for immediate institutional dispatch. Can you load today?" },
      { type: "incoming", text: "Yes sir, weighing is completed. Once advance escrow is confirmed, truck can move immediately." }
    ]
  },
  raman: {
    name: "S. Raman",
    avatar: "assets/images/tomato.jpg",
    status: "● Online • Perundurai, Erode (2.4 km away)",
    lotId: "LOT-TOM-02",
    crop: "Roma Plum Tomato (Firm & Red)",
    farmerPhone: "+91 94431-22901",
    offerText: "Farmer countered at <strong style=\"color: #0c5a36;\">₹ 24 /kg</strong> (₹ 2,400/Qt) for 500 kg (Retail Ready)",
    counterRate: 2400,
    lockRateText: "Lock 35% Escrow (₹ 24/kg)",
    messages: [
      { type: "incoming", text: "Hello sir, my 500 kg Roma Plum harvest has 82% firmness index, perfect for retail packing." },
      { type: "outgoing", text: "Hi Raman, what is your floor price for full 500 kg lot?" },
      { type: "incoming", text: "I can offer ₹ 24/kg direct farm-gate price if payment is through AgriNex Escrow." }
    ]
  },
  selvaraj: {
    name: "K. Selvaraj",
    avatar: "assets/images/tomato.jpg",
    status: "● Online • Bhavani, Erode (4.1 km away)",
    lotId: "LOT-TOM-03",
    crop: "Organic Country Tomato (Naatu Thakkali)",
    farmerPhone: "+91 97890-33412",
    offerText: "Certified 100% Organic • Ask: <strong style=\"color: #0c5a36;\">₹ 32 /kg</strong> for 350 kg",
    counterRate: 3200,
    lockRateText: "Lock 35% Escrow (₹ 32/kg)",
    messages: [
      { type: "incoming", text: "Greetings Karthik! We have NPOP organic certified Naatu Thakkali harvest ready." },
      { type: "outgoing", text: "Great quality! We need digital test reports for residue certification." },
      { type: "incoming", text: "All lab assay slips uploaded on AgriNex ledger. Ready for dispatch!" }
    ]
  },
  dhanapal: {
    name: "M. Dhanapal",
    avatar: "assets/images/tomato.jpg",
    status: "● Online • Sathyamangalam (11.6 km away)",
    lotId: "LOT-TOM-04",
    crop: "Hybrid Red Salad Tomato – Bulk Harvest",
    farmerPhone: "+91 98421-55890",
    offerText: "Bulk Harvest: <strong style=\"color: #0c5a36;\">₹ 20 /kg</strong> for 2,000 kg",
    counterRate: 2000,
    lockRateText: "Lock 35% Escrow (₹ 20/kg)",
    messages: [
      { type: "incoming", text: "Vanakkam! 2,000 kg bulk tomato ready for institutional kitchen procurement." }
    ]
  },
  muthusamy: {
    name: "Muthusamy Soundar",
    avatar: "assets/images/onion.jpg",
    status: "● Online • Perundurai, Erode (2.8 km away)",
    lotId: "LOT-ONI-05",
    crop: "Premium Bellary Big Red Onion",
    farmerPhone: "+91 94433-88190",
    offerText: "Export Quality: <strong style=\"color: #0c5a36;\">₹ 32 /kg</strong> for 5,000 kg (50 Qt)",
    counterRate: 3200,
    lockRateText: "Lock 35% Escrow (₹ 32/kg)",
    messages: [
      { type: "incoming", text: "Namaste sir, 5 MT cured big red onion lot available for immediate dispatch." }
    ]
  },
  revathi: {
    name: "Revathi Balan",
    avatar: "assets/images/onion.jpg",
    status: "● Online • Anthiyur, Erode (15.2 km away)",
    lotId: "LOT-ONI-06",
    crop: "Sambar Shallots (Small Country Onion)",
    farmerPhone: "+91 97892-44102",
    offerText: "Traditional Sambar Grade: <strong style=\"color: #0c5a36;\">₹ 65 /kg</strong> for 600 kg",
    counterRate: 6500,
    lockRateText: "Lock 35% Escrow (₹ 65/kg)",
    messages: [
      { type: "incoming", text: "Hello Karthik sir, premium Anthiyur shallots graded and bagged in 25kg mesh sacks." }
    ]
  },
  kavitha: {
    name: "Kavitha Rajan",
    avatar: "assets/images/wheat-logo.png",
    status: "● Online • Salem (32 km away)",
    lotId: "LOT-TUR-07",
    crop: "Salem Turmeric Finger (High Curcumin)",
    farmerPhone: "+91 94432-88190",
    offerText: "Organic Desi A2: <strong style=\"color: #0c5a36;\">₹ 74 /kg</strong> for 2,500 kg",
    counterRate: 7400,
    lockRateText: "Lock 35% Escrow (₹ 74/kg)",
    messages: [
      { type: "incoming", text: "Vanakkam! 2.5 MT cured turmeric fingers with 4.8% curcumin content ready." }
    ]
  },
  venkatesh: {
    name: "Venkatesh Rao",
    avatar: "assets/images/paddy.jpg",
    status: "● Online • Karnal, HR ~ Direct Express Line",
    lotId: "LOT-PAD-08",
    crop: "1121 Basmati Paddy (Aromatic Long Grain)",
    farmerPhone: "+91 98120-33410",
    offerText: "Aged 1 Year: <strong style=\"color: #0c5a36;\">₹ 24 /kg</strong> for 12,000 kg (120 Qt)",
    counterRate: 2400,
    lockRateText: "Lock 35% Escrow (₹ 24/kg)",
    messages: [
      { type: "incoming", text: "Hello sir, 120 Qt 1121 Basmati paddy stored in moisture-controlled silos ready for train/container haulage." }
    ]
  },
  kaliamurthi: {
    name: "Kaliamurthi R",
    avatar: "assets/images/cotton.jpg",
    status: "● Online • Guntur, AP ~ Cotton Yard Hub",
    lotId: "LOT-COT-09",
    crop: "Long Staple Cotton (MCU-5 Fiber)",
    farmerPhone: "+91 98480-11234",
    offerText: "Grade A Export: <strong style=\"color: #0c5a36;\">₹ 56 /kg</strong> for 4,000 kg (40 Qt)",
    counterRate: 5600,
    lockRateText: "Lock 35% Escrow (₹ 56/kg)",
    messages: [
      { type: "incoming", text: "Greetings! 40 Qt MCU-5 pressed cotton bales ready for institutional textile sourcing." }
    ]
  }
};

let activeChatKey = 'gowran';

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
  renderGrievances();
  renderChatSidebar();
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

  // Book Farm-Gate Transport Fleet submit
  const transportForm = document.getElementById('form-book-transport');
  if (transportForm) {
    transportForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const lotRaw = document.getElementById('transport-lot-select')?.value || '';
      const [lotId, cropName, quantity, originAddr, farmerName, escrowAmt] = lotRaw.split('|');

      const destRaw = document.getElementById('transport-destination')?.value || 'Hosur Institutional Hub, TN|280 km';
      const [destName, distStr] = destRaw.split('|');

      const partnerRaw = document.getElementById('transport-partner')?.value || 'GreenWays Transit|K. Selvam|+91 94431-22901|TN 57 AH 4421';
      const [partnerName, driverName, driverPhone, vehicleNum] = partnerRaw.split('|');

      const selectedVehEl = document.querySelector('input[name="vehicle-type"]:checked');
      const vehRaw = selectedVehEl ? selectedVehEl.value : 'Bolero Maxi Truck (TN 57 AH 4421)|5800';
      const vehName = vehRaw.split('|')[0];

      const totalCostText = document.getElementById('transport-total-fee')?.textContent || '₹ 6,150';
      const newTrkId = `TRK-GW-${Math.floor(1000 + Math.random() * 9000)}-TN`;

      const container = document.getElementById('consignments-list-container');
      if (container) {
        const newCard = document.createElement('div');
        newCard.id = `consignment-card-${Date.now()}`;
        newCard.style.cssText = 'background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 12px; padding: 18px; box-shadow: 0 4px 12px rgba(12, 90, 54, 0.08); transition: all 0.3s ease;';
        newCard.innerHTML = `
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <strong style="font-size: 1.05rem; color: #0c5a36;">Consignment #${newTrkId}</strong>
                <span class="badge" style="background: #10b981; color: #ffffff; font-size: 0.7rem; font-weight: 700; padding: 2px 7px; border-radius: 4px;">JUST DISPATCHED</span>
              </div>
              <div style="font-size: 0.78rem; color: #475569; margin-top: 2px;">
                ${cropName || 'Direct Farm Lot'} • ${quantity || '50 Qt'} • Origin: <strong>${originAddr || 'Farm-Gate'}</strong> ➔ Destination: <strong>${destName}</strong>
              </div>
            </div>
            <span class="badge badge-status-transit">🚚 In Transit (Dispatched)</span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; background: #ffffff; padding: 12px; border-radius: 8px; border: 1px solid #bbf7d0; margin-bottom: 12px; font-size: 0.8rem;">
            <div>Vehicle: <strong>${vehName}</strong></div>
            <div>Driver: <strong>${driverName} (${driverPhone})</strong></div>
            <div>Landed Haulage: <strong style="color: #0c5a36;">${totalCostText}</strong></div>
          </div>

          <div style="display: flex; gap: 10px; justify-content: flex-end;">
            <button class="btn btn-outline btn-sm" onclick="openGatePassModal('${newTrkId}')">Download Gate Pass</button>
            <button class="btn btn-outline btn-sm" onclick="openLorryReceiptModal('${newTrkId}')">View Digital Lorry Receipt</button>
            <button class="btn btn-primary btn-sm" onclick="openGpsModal('${newTrkId}', '${vehName}', '${driverName}', '${originAddr || 'Farm-Gate'} ➔ ${destName}')">Live GPS Ping</button>
            <button class="btn btn-primary btn-sm" style="background: #0c5a36; border-color: #0c5a36;" onclick="openArrivalReleaseModal('${newTrkId}', '${cropName || 'Farm Lot'}', 45000, '${farmerName || 'Farmer'}')">Confirm Arrival & Release Escrow</button>
          </div>
        `;
        container.prepend(newCard);
      }

      // Update badge count
      const badge = document.getElementById('consignments-count-badge');
      if (badge) {
        const count = container ? container.children.length : 3;
        badge.textContent = `${count} In Transit`;
      }

      closeBookTransportModal();
      showToast(`🚚 Fleet booked successfully! Consignment #${newTrkId} dispatched for ${cropName || 'Farm Lot'}.`);
      switchView('view-consignments');
    });
  }
});

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

  if (refEl) refEl.textContent = `Contract Reference: #${contractId || 'ESC-TN-9921'}`;
  if (farmerEl) farmerEl.textContent = farmer || 'Murugan Palanisamy';
  if (lotEl) lotEl.textContent = crop || 'Tomato (Shivam Hybrid 50 Qt)';
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


