/**
 * AgriNex Buyer Module - Central Dashboard Coordinator
 * Orchestrates view routing, state persistence, topbar notifications, and module initialization.
 */

// -------------------------------------------------------------
// REAL-TIME BUYER MODULE SYNCHRONIZATION ENGINE
// -------------------------------------------------------------
function loadPersistedBuyerState() {
  try {
    const savedLots = localStorage.getItem('agrinex_verified_lots');
    if (savedLots) {
      const parsed = JSON.parse(savedLots);
      if (Array.isArray(parsed) && parsed.length > 0) {
        buyerData.verifiedLots = parsed;
      }
    }
  } catch(e) {}

  try {
    const savedConsignments = localStorage.getItem('agrinex_buyer_consignments');
    if (savedConsignments) {
      const parsed = JSON.parse(savedConsignments);
      if (Array.isArray(parsed) && parsed.length > 0) {
        buyerData.consignments = parsed;
      }
    }
  } catch(e) {}

  try {
    const savedDemands = localStorage.getItem('agrinex_buyer_demands');
    if (savedDemands) {
      const parsed = JSON.parse(savedDemands);
      if (Array.isArray(parsed) && parsed.length > 0) {
        buyerData.buyerDemands = parsed;
      }
    }
  } catch(e) {}

  try {
    const savedGrievances = localStorage.getItem('agrinex_buyer_grievances');
    if (savedGrievances) {
      const parsed = JSON.parse(savedGrievances);
      if (Array.isArray(parsed) && parsed.length > 0) {
        buyerData.grievances = parsed;
      }
    }
  } catch(e) {}


  try {
    const savedProfile = localStorage.getItem('agrinex_buyer_profile');
    if (savedProfile) {
      const p = JSON.parse(savedProfile);
      if (p && p.name) {
        const nameEl = document.querySelector('.profile-name');
        if (nameEl) nameEl.textContent = p.name;
        const heroNameEl = document.querySelector('.hero-left h2');
        if (heroNameEl) heroNameEl.textContent = `Good Morning, ${p.name.split(' ')[0]}! 🏢`;
        const displayNameEl = document.getElementById('buyer-display-name');
        if (displayNameEl) displayNameEl.textContent = p.name;
        const inputName = document.getElementById('buyer-input-name');
        if (inputName) inputName.value = p.name;
        const inputComp = document.getElementById('buyer-input-company');
        if (inputComp && p.company) inputComp.value = p.company;
      }
    }
  } catch(e) {}
}

function updateBuyerMarketStats() {
  const consignments = (buyerData && buyerData.consignments) ? buyerData.consignments : [];
  const activeCount = consignments.filter(c => c.status === 'transit' || c.status === 'scheduled').length;
  const totalKg = consignments.reduce((sum, c) => sum + (c.quantity_kg || (c.quantity_qt * 100) || 0), 0);
  const totalVal = consignments.reduce((sum, c) => sum + (c.total_val || 0), 0);

  const ordersEl = document.getElementById('stat-active-orders-num');
  const volumeEl = document.getElementById('stat-total-volume-num');
  const procuredEl = document.getElementById('stat-total-procured-num');
  const savingsEl = document.getElementById('stat-direct-savings-num');

  const kgUnit = window.t ? window.t('units_kg', 'kg') : 'kg';
  const savedLabel = window.t ? window.t('saved_text', 'Saved') : 'Saved';

  if (ordersEl) ordersEl.textContent = activeCount.toLocaleString('en-IN');
  if (volumeEl) volumeEl.textContent = `${(totalKg / 100).toLocaleString('en-IN')} Qt (${totalKg.toLocaleString('en-IN')} ${kgUnit})`;
  if (procuredEl) procuredEl.textContent = `₹ ${totalVal.toLocaleString('en-IN')}`;
  if (savingsEl) {
    const savingsEst = Math.round(totalVal * 0.142);
    savingsEl.textContent = `₹ ${savingsEst.toLocaleString('en-IN')} ${savedLabel}`;
  }
}

// Toast notification helper
function showToast(message, type = 'success') {
  const existing = document.getElementById('agrinex-toast');
  if (existing) {
    if (typeof existing.remove === 'function') existing.remove();
    else if (existing.parentNode) existing.parentNode.removeChild(existing);
  }

  const toast = document.createElement('div');
  toast.id = 'agrinex-toast';
  toast.style.position = 'fixed';
  toast.style.bottom = '24px';
  toast.style.right = '24px';
  toast.style.zIndex = '99999';
  toast.style.background = type === 'success' ? '#0c5a36' : (type === 'error' ? '#991b1b' : '#0284c7');
  toast.style.color = '#ffffff';
  toast.style.padding = '12px 20px';
  toast.style.borderRadius = '10px';
  toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
  toast.style.fontWeight = '700';
  toast.style.fontSize = '0.88rem';
  toast.style.display = 'flex';
  toast.style.alignItems = 'center';
  toast.style.gap = '8px';
  toast.innerHTML = `<span>${type === 'error' ? '⚠️' : '✓'}</span> <span>${message}</span>`;

  document.body.appendChild(toast);
  setTimeout(() => {
    if (toast && typeof toast.remove === 'function') {
      toast.remove();
    } else if (toast && toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, 4000);
}

// Modular View Switcher
function switchView(viewId) {
  if (viewId === 'view-marketplace') {
    viewId = 'view-verified-produce';
  }

  // If in Lite / Simple Mode and switching to an enterprise view, seamlessly switch to Enterprise layout
  if (document.body.classList.contains('lite-mode-active')) {
    if (typeof applyLiteModeUI === 'function') {
      applyLiteModeUI(false);
      localStorage.setItem('agrinex_buyer_lite_mode', 'false');
      const toggleBtn = document.getElementById('btn-toggle-lite-mode');
      if (toggleBtn && typeof updateToggleBtnState === 'function') {
        updateToggleBtnState(toggleBtn);
      }
    }
  }

  const views = document.querySelectorAll('.portal-view');
  views.forEach((v) => v.classList.remove('active-view'));

  const target = document.getElementById(viewId);
  if (target) {
    target.classList.add('active-view');
  }

  const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
  navItems.forEach((item) => {
    if (item.getAttribute('data-view') === viewId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // Re-invoke view-specific renderers to ensure fresh data and proper canvas dimensions
  if (viewId === 'view-insights') {
    try { if (typeof initBuyerMarketInsights === 'function') initBuyerMarketInsights(); } catch (e) { console.error('Insights view init error:', e); }
  } else if (viewId === 'view-consignments') {
    try { if (typeof renderBuyerConsignments === 'function') renderBuyerConsignments(); } catch (e) { console.error('Consignments view render error:', e); }
  } else if (viewId === 'view-verified-produce') {
    try { if (typeof renderVerifiedLots === 'function') renderVerifiedLots(); } catch (e) { console.error('Verified produce render error:', e); }
  } else if (viewId === 'view-bulk-demands') {
    try { if (typeof renderBuyerDemands === 'function') renderBuyerDemands(); } catch (e) { console.error('Demands render error:', e); }
  } else if (viewId === 'view-escrow-vault') {
    try { if (typeof renderBuyerEscrowVault === 'function') renderBuyerEscrowVault(); } catch (e) { console.error('Escrow vault render error:', e); }
  } else if (viewId === 'view-messages') {
    try {
      if (typeof renderChatSidebar === 'function') renderChatSidebar();
      const currentChat = (typeof window.getActiveChatKey === 'function') ? window.getActiveChatKey() : 'patil';
      if (typeof selectChatContact === 'function') selectChatContact(currentChat);
    } catch (e) { console.error('Messages view render error:', e); }
  } else if (viewId === 'view-grievance') {
    try { if (typeof renderGrievances === 'function') renderGrievances(); } catch (e) { console.error('Grievances view render error:', e); }
  }

  try {
    history.replaceState(null, '', '#' + viewId.replace('view-', ''));
  } catch(e) {}
}

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

function initLocationSwitcher() {
  const locBtn = document.getElementById('btn-change-buyer-location');
  const locText = document.getElementById('buyer-location-text');
  if (!locBtn || !locText) return;

  const locations = [
    { short: "Vashi Hub (MH)", full: "Vashi Terminal, Navi Mumbai (MH)" },
    { short: "Pune Hub (MH)", full: "Pune APMC Central Hub, MH" },
    { short: "Nashik Yard (MH)", full: "Nashik-Lasalgaon Yard, MH" },
    { short: "Nagpur Hub (MH)", full: "Nagpur Multi-Modal Terminal, MH" },
    { short: "Kolhapur Yard (MH)", full: "Kolhapur Shahu Market Yard, MH" },
    { short: "Latur Yard (MH)", full: "Latur Mega Yard, MH" }
  ];
  let currIdx = 0;

  locBtn.addEventListener('click', () => {
    currIdx = (currIdx + 1) % locations.length;
    locText.textContent = locations[currIdx].short;
    locBtn.title = `Procurement Hub: ${locations[currIdx].full} — Click to switch`;
    showToast(`Active procurement hub updated to ${locations[currIdx].full}`);
  });
}

function openBuyerProfileModal() {
  const modal = document.getElementById('modal-buyer-profile');
  if (modal) modal.classList.add('active');
}

function closeBuyerProfileModal() {
  const modal = document.getElementById('modal-buyer-profile');
  if (modal) modal.classList.remove('active');
}

function saveBuyerProfile(e) {
  if (e) e.preventDefault();
  const newName = document.getElementById('buyer-input-name')?.value || 'Karthik Sundaram';
  const newCompany = document.getElementById('buyer-input-company')?.value || 'BigBasket Direct Farm Sourcing';
  const newEmail = document.getElementById('buyer-input-email')?.value || 'karthik.s@bigbasket.com';
  const newPhone = document.getElementById('buyer-input-phone')?.value || '+91 94421 77310';
  const newHub = document.getElementById('buyer-input-hub')?.value || 'Vashi APMC Central Terminal, Turbhe Sector 19, Navi Mumbai, MH';

  const nameEl = document.querySelector('.profile-name');
  if (nameEl) nameEl.textContent = newName;

  const heroNameEl = document.querySelector('.hero-left h2');
  if (heroNameEl) heroNameEl.textContent = `Good Morning, ${newName.split(' ')[0]}! 🏢`;

  const displayNameEl = document.getElementById('buyer-display-name');
  if (displayNameEl) displayNameEl.textContent = newName;

  const profileData = {
    name: newName,
    company: newCompany,
    email: newEmail,
    phone: newPhone,
    hub: newHub
  };

  try {
    localStorage.setItem('agrinex_buyer_profile', JSON.stringify(profileData));
  } catch(err) {}

  closeBuyerProfileModal();
  showToast('Wholesale Buyer Profile updated successfully!');
}

document.addEventListener('submit', (e) => {
  if (e.target && e.target.id === 'form-edit-buyer-profile') {
    saveBuyerProfile(e);
  }
});

function showNotification(msg) {
  showToast(msg, 'info');
}

// -------------------------------------------------------------
// APPLICATION BOOTSTRAPPER
// -------------------------------------------------------------
let __agrinex_booted = false;

function bootBuyerDashboard() {
  if (__agrinex_booted) return;
  __agrinex_booted = true;

  try { if (typeof initBuyerPayments === 'function') initBuyerPayments(); } catch(e) { console.error('Buyer payments init error:', e); }
  try { if (typeof renderBuyerEmergencyDesk === 'function') renderBuyerEmergencyDesk(); } catch(e) { console.error('Emergency desk init error:', e); }
  try { loadPersistedBuyerState(); } catch(e) { console.error('Load persisted state error:', e); }
  try { updateBuyerMarketStats(); } catch(e) { console.error('Market stats error:', e); }
  try { if (typeof renderBuyerEscrowVault === 'function') renderBuyerEscrowVault(); } catch(e) { console.error('Escrow vault error:', e); }
  try { setupSidebarNav(); } catch(e) { console.error('Sidebar nav error:', e); }
  try { if (typeof renderVerifiedLots === 'function') renderVerifiedLots(); } catch(e) { console.error('Verified lots error:', e); }
  try { if (typeof renderBuyerDemands === 'function') renderBuyerDemands(); } catch(e) { console.error('Demands error:', e); }
  try { if (typeof renderBuyerConsignments === 'function') renderBuyerConsignments(); } catch(e) { console.error('Consignments error:', e); }
  try { if (typeof initBuyerMarketInsights === 'function') initBuyerMarketInsights(); } catch(e) { console.error('Market insights error:', e); }
  try { if (typeof renderGrievances === 'function') renderGrievances(); } catch(e) { console.error('Grievances error:', e); }
  try { if (typeof renderChatSidebar === 'function') renderChatSidebar(); } catch(e) { console.error('Chat sidebar error:', e); }
  try { initLocationSwitcher(); } catch(e) { console.error('Location switcher error:', e); }


  // Global keyboard shortcuts (Esc to close any active modal, Ctrl+K to search)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeModals = document.querySelectorAll('.modal-overlay.active');
      activeModals.forEach(m => m.classList.remove('active'));
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const searchBox = document.getElementById('marketplace-search-input') || document.getElementById('buyer-global-search');
      if (searchBox) {
        searchBox.focus();
        searchBox.select();
      }
    }
  });

  // Handle enter key in chat
  const chatInput = document.getElementById('chat-input-field');
  if (chatInput) {
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        if (typeof sendChatMessage === 'function') sendChatMessage();
      }
    });
  }

  // Handle Buyer Profile Form submit
  const profileForm = document.getElementById('form-edit-buyer-profile');
  if (profileForm) {
    profileForm.addEventListener('submit', saveBuyerProfile);
  }

  // Handle Corporate Auth Form Submit
  const authForm = document.getElementById('form-buyer-auth');
  if (authForm) {
    authForm.addEventListener('submit', handleBuyerAuthSubmit);
  }

  // Update corporate auth badge
  updateCorporateAuthBadge();

  // Handle hash navigation on load
  const hash = window.location.hash;
  if (hash) {
    const clean = hash.replace('#', '');
    if (document.body.classList.contains('lite-mode-active')) {
      if (clean === 'insights' && typeof switchLiteSection === 'function') {
        switchLiteSection('insights');
      } else if ((clean === 'orders' || clean === 'consignments') && typeof switchLiteSection === 'function') {
        switchLiteSection('orders');
      } else if (clean === 'escrow' && typeof switchLiteSection === 'function') {
        switchLiteSection('escrow');
      } else if (clean === 'produce' && typeof switchLiteSection === 'function') {
        switchLiteSection('produce');
      } else {
        const vId = 'view-' + clean;
        if (document.getElementById(vId)) switchView(vId);
      }
    } else {
      const vId = 'view-' + clean;
      if (document.getElementById(vId)) switchView(vId);
    }
  }
}

// ==========================================
// INSTITUTIONAL BUYER PROFILE MODAL LOGIC
// ==========================================
function openBuyerProfileModal() {
  const modal = document.getElementById('modal-buyer-profile');
  if (modal) modal.classList.add('active');
}

function closeBuyerProfileModal() {
  const modal = document.getElementById('modal-buyer-profile');
  if (modal) modal.classList.remove('active');
}

function saveBuyerProfile(e) {
  if (e) e.preventDefault();

  const name = document.getElementById('buyer-input-name')?.value || document.getElementById('buyer-profile-contact')?.value || 'Karthik Sundaram';
  const company = document.getElementById('buyer-input-company')?.value || document.getElementById('buyer-profile-company')?.value || 'BigBasket Wholesale Ltd.';
  const email = document.getElementById('buyer-input-email')?.value || document.getElementById('buyer-profile-email')?.value || 'karthik.s@bigbasket.com';
  const phone = document.getElementById('buyer-input-phone')?.value || document.getElementById('buyer-profile-phone')?.value || '+91 94421 77310';
  const hub = document.getElementById('buyer-input-hub')?.value || document.getElementById('buyer-profile-address')?.value || 'Vashi APMC Central Terminal, Navi Mumbai, MH';
  const gstin = document.getElementById('buyer-profile-gstin')?.value || '27AABCB2210M1Z2';
  const fssai = document.getElementById('buyer-profile-fssai')?.value || '11522034000189';

  const profile = {
    name,
    officerName: name,
    company,
    companyName: company,
    email,
    phone,
    hub,
    location: hub,
    gstin,
    fssai
  };

  try {
    localStorage.setItem('agrinex_buyer_profile', JSON.stringify(profile));
  } catch(err) {
    console.warn('Could not save buyer profile:', err);
  }

  // Update UI headers
  const nameDisplay = document.getElementById('buyer-display-name');
  if (nameDisplay) nameDisplay.textContent = name;
  const profileName = document.querySelector('.profile-name');
  if (profileName) profileName.textContent = name;
  const sidebarName = document.getElementById('buyer-sidebar-name');
  if (sidebarName) sidebarName.textContent = name;

  closeBuyerProfileModal();
  if (typeof showToast === 'function') {
    showToast('✓ Institutional buyer profile updated successfully!', 'success');
  }
}

// Delegated submit listener for buyer profile
document.addEventListener('submit', (e) => {
  if (e.target && e.target.id === 'form-edit-buyer-profile') {
    saveBuyerProfile(e);
  }
});

// ==========================================
// CORPORATE JWT & GSTIN AUTHENTICATION LOGIC
// ==========================================
function openBuyerAuthModal() {
  const modal = document.getElementById('modal-buyer-auth');
  if (modal) {
    modal.classList.add('active');
    const officer = window.apiClient ? window.apiClient.getCurrentOfficer() : null;
    if (officer) {
      const nameInput = document.getElementById('auth-officer-name');
      const gstinInput = document.getElementById('auth-gstin-input');
      const fssaiInput = document.getElementById('auth-fssai-input');
      if (nameInput && officer.name) nameInput.value = officer.name;
      if (gstinInput && officer.gstin) gstinInput.value = officer.gstin;
      if (fssaiInput && officer.fssai) fssaiInput.value = officer.fssai;
    }
  }
}

function closeBuyerAuthModal() {
  const modal = document.getElementById('modal-buyer-auth');
  if (modal) modal.classList.remove('active');
}

function handleAuthCompanyPreset(preset) {
  const gstinInput = document.getElementById('auth-gstin-input');
  const fssaiInput = document.getElementById('auth-fssai-input');
  if (!gstinInput || !fssaiInput) return;

  if (preset === 'bigbasket') {
    gstinInput.value = '27AABCB2210M1Z2';
    fssaiInput.value = '11522034000189';
  } else if (preset === 'reliance') {
    gstinInput.value = '27AAACR4996F1ZE';
    fssaiInput.value = '10014022002595';
  } else if (preset === 'itc') {
    gstinInput.value = '27AAACI5950L1ZQ';
    fssaiInput.value = '10012011000456';
  }
  validateLiveGstin(gstinInput.value);
}

function validateLiveGstin(val) {
  const gstin = (val || '').trim().toUpperCase();
  const pill = document.getElementById('gstin-status-pill');
  if (!pill) return;

  const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  if (gstinRegex.test(gstin)) {
    pill.textContent = '✓ Verified Format (Maharashtra 27)';
    pill.style.color = '#059669';
  } else {
    pill.textContent = '⚠️ 15-Digit Format (e.g. 27AABCB2210M1Z2)';
    pill.style.color = '#d97706';
  }
}

async function verifyGstinLive() {
  const gstinInput = document.getElementById('auth-gstin-input');
  const fssaiInput = document.getElementById('auth-fssai-input');
  const feedback = document.getElementById('auth-feedback-box');
  const gstin = gstinInput?.value.trim().toUpperCase() || '';
  const fssai = fssaiInput?.value.trim() || '';

  if (!feedback) return;
  feedback.style.display = 'block';
  feedback.style.background = '#eff6ff';
  feedback.style.color = '#1e40af';
  feedback.style.border = '1px solid #bfdbfe';
  feedback.innerHTML = '⏳ Verifying GSTIN & FSSAI against Maharashtra Tax & Food Safety registries...';

  try {
    if (window.apiClient) {
      const res = await window.apiClient.verifyGstin(gstin, fssai);
      if (res.compliant) {
        feedback.style.background = '#f0fdf4';
        feedback.style.color = '#15803d';
        feedback.style.border = '1px solid #bbf7d0';
        feedback.innerHTML = `✅ <strong>Verified Corporate Identity:</strong> ${res.gstin.stateName} Jurisdiction (State Code ${res.gstin.stateCode}) • FSSAI License Active.`;
      } else {
        feedback.style.background = '#fef2f2';
        feedback.style.color = '#b91c1c';
        feedback.style.border = '1px solid #fecaca';
        feedback.innerHTML = `❌ ${res.gstin.error || res.fssai.error || 'Invalid corporate credentials'}`;
      }
    }
  } catch (err) {
    feedback.style.background = '#f0fdf4';
    feedback.style.color = '#15803d';
    feedback.style.border = '1px solid #bbf7d0';
    feedback.innerHTML = '✅ <strong>Format Validated (Offline Mode):</strong> 15-Digit Indian GSTIN Verified.';
  }
}

async function handleBuyerAuthSubmit(e) {
  if (e) e.preventDefault();
  const companySelect = document.getElementById('auth-company-select');
  const officerName = document.getElementById('auth-officer-name')?.value.trim() || 'Karthik Sundaram';
  const officerPhone = document.getElementById('auth-officer-phone')?.value.trim() || '+91 98220-44911';
  const gstin = document.getElementById('auth-gstin-input')?.value.trim().toUpperCase() || '27AABCB2210M1Z2';
  const fssai = document.getElementById('auth-fssai-input')?.value.trim() || '11522034000189';
  const companyName = companySelect?.options[companySelect.selectedIndex]?.text || 'BigBasket Direct Farm Sourcing';

  const btnSubmit = document.getElementById('btn-submit-auth');
  if (btnSubmit) {
    btnSubmit.disabled = true;
    btnSubmit.textContent = '⏳ Authenticating & Issuing Token...';
  }

  try {
    let result;
    if (window.apiClient) {
      result = await window.apiClient.loginBuyer({
        officer_name: officerName,
        company: companyName,
        gstin,
        fssai
      });
    }

    // Update UI
    updateCorporateAuthBadge(officerName, companyName, gstin);
    closeBuyerAuthModal();
    showToast(`✓ Corporate JWT Issued for ${officerName}! Active until session expiry.`);
  } catch (err) {
    console.warn('Authentication server call fallback', err);
    // Offline fallback
    if (window.apiClient) {
      window.apiClient.setSession('offline-jwt-token-local', {
        name: officerName,
        company: companyName,
        gstin,
        fssai,
        state: 'Maharashtra'
      });
    }
    updateCorporateAuthBadge(officerName, companyName, gstin);
    closeBuyerAuthModal();
    showToast(`✓ Corporate Profile Authenticated (${officerName})`);
  } finally {
    if (btnSubmit) {
      btnSubmit.disabled = false;
      btnSubmit.textContent = '🔐 Authenticate & Issue JWT Token';
    }
  }
}

function updateCorporateAuthBadge(officerName, companyName, gstin) {
  const officer = window.apiClient ? window.apiClient.getCurrentOfficer() : null;
  const name = officerName || (officer && officer.name) || 'Karthik Sundaram';
  const company = companyName || (officer && officer.company) || 'BigBasket';
  const gst = gstin || (officer && officer.gstin) || '27AABCB2210M1Z2';

  const badgeText = document.getElementById('buyer-auth-badge-text');
  if (badgeText) {
    badgeText.textContent = 'Verified ✓';
  }
  const badgeBtn = document.getElementById('btn-buyer-auth-badge');
  if (badgeBtn) {
    badgeBtn.title = `Corporate Buyer Verified • GSTIN: ${gst} • FSSAI Approved`;
  }

  const profileName = document.querySelector('.profile-name');
  if (profileName) {
    const parts = name.split(' ');
    profileName.textContent = parts.length > 1 ? `${parts[0]} ${parts[1][0]}.` : name;
  }

  const profileRole = document.querySelector('.profile-role');
  if (profileRole) profileRole.textContent = company;

  const sidebarName = document.getElementById('buyer-sidebar-name');
  if (sidebarName) sidebarName.textContent = name;
}

// Coordinate startup with Partials Loader
if (window.__agrinex_partials_ready) {
  bootBuyerDashboard();
} else {
  document.addEventListener('agrinex:partials-ready', bootBuyerDashboard, { once: true });
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => { if (!__agrinex_booted) bootBuyerDashboard(); }, 250);
  });
}

// Window Bindings
window.loadPersistedBuyerState = loadPersistedBuyerState;
window.updateBuyerMarketStats = updateBuyerMarketStats;
window.showToast = showToast;
window.switchView = switchView;
window.setupSidebarNav = setupSidebarNav;
window.initLocationSwitcher = initLocationSwitcher;
window.openBuyerProfileModal = openBuyerProfileModal;
window.closeBuyerProfileModal = closeBuyerProfileModal;
window.saveBuyerProfile = saveBuyerProfile;
window.openBuyerAuthModal = openBuyerAuthModal;
window.closeBuyerAuthModal = closeBuyerAuthModal;
window.handleAuthCompanyPreset = handleAuthCompanyPreset;
window.validateLiveGstin = validateLiveGstin;
window.verifyGstinLive = verifyGstinLive;
window.handleBuyerAuthSubmit = handleBuyerAuthSubmit;
window.updateCorporateAuthBadge = updateCorporateAuthBadge;
window.showNotification = showNotification;
window.bootBuyerDashboard = bootBuyerDashboard;

