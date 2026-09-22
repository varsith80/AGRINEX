/**
 * AgriNex Cross-Module Bridge & URL Deep-Linking Router
 * Handles parameter-based jumps, row highlighting, auto-filtering,
 * and synchronized cross-module state updates.
 */

(function () {
  function initCrossModuleBridge() {
    const urlParams = new URLSearchParams(window.location.search);
    const hash = window.location.hash.replace('#', '');

    // 1. Check if opened with Admin Source tracking
    const source = urlParams.get('source');
    if (source === 'admin') {
      renderAdminReturnRibbon();
    }

    // 2. Handle Case / Filter Parameters
    const caseId = urlParams.get('caseId');
    const filter = urlParams.get('filter');
    const section = urlParams.get('section') || hash;
    const openModalParam = urlParams.get('openModal');

    // Section Switching if on main admin dashboard
    if (section && typeof window.switchSection === 'function') {
      window.switchSection(section, null, false);
    }

    // Auto-trigger search filter in current page table if filter exists
    if (filter) {
      applyFilterToActiveTable(filter);
    }

    // Auto-open modal if specified
    if (caseId) {
      handleTargetCaseId(caseId, openModalParam);
    }

    // 3. Listen for Real-Time State Events across Modules
    if (window.AgriNexBus) {
      // If an Escrow is Released in Admin, update logistics and deals tables
      window.AgriNexBus.on('escrow:released', (data) => {
        handleEscrowReleasedSync(data);
      });

      // If a shipment delivery status changes in Logistics, sync into Admin
      window.AgriNexBus.on('logistics:updated', (data) => {
        handleLogisticsSync(data);
      });
    }
  }

  // Render a slim, non-intrusive return ribbon if opened from Admin into Farmer/Buyer/Logistics
  function renderAdminReturnRibbon() {
    if (document.getElementById('agrinex-admin-ribbon')) return;

    const ribbon = document.createElement('div');
    ribbon.id = 'agrinex-admin-ribbon';
    ribbon.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 34px;
      background: linear-gradient(90deg, #064e3b 0%, #0c5a36 100%);
      color: #ffffff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      font-size: 0.75rem;
      font-weight: 700;
      z-index: 99999;
      box-shadow: 0 2px 10px rgba(0,0,0,0.15);
      border-bottom: 1px solid rgba(74, 222, 128, 0.3);
      font-family: 'Plus Jakarta Sans', sans-serif;
    `;

    ribbon.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #4ade80; animation: pulseDot 1.5s infinite;"></span>
        <span>🛡️ Admin Context Active — Live Interlink Connected</span>
      </div>
      <div style="display: flex; align-items: center; gap: 12px;">
        <a href="../admin-module/index.html" style="color: #4ade80; text-decoration: none; font-weight: 800; display: inline-flex; align-items: center; gap: 4px;">
          <span>&larr;</span> Return to Control Center
        </a>
        <button onclick="this.parentElement.parentElement.remove(); document.body.style.paddingTop='0';" style="background: none; border: none; color: rgba(255,255,255,0.7); cursor: pointer; font-size: 1rem; line-height: 1;">&times;</button>
      </div>
    `;

    document.body.prepend(ribbon);
    document.body.style.paddingTop = '34px';
  }

  function applyFilterToActiveTable(filterText) {
    setTimeout(() => {
      // 1. Search inputs (global or local)
      const searchInputs = document.querySelectorAll('input[type="text"], input[type="search"]');
      for (const input of searchInputs) {
        if (input.id && (input.id.includes('search') || input.id.includes('filter'))) {
          input.value = filterText;
          input.dispatchEvent(new Event('input', { bubbles: true }));
          break;
        }
      }

      // 2. Highlight matching row
      highlightMatchingRows(filterText);
    }, 350);
  }

  function highlightMatchingRows(query) {
    const q = query.toLowerCase();
    const rows = document.querySelectorAll('table tbody tr');
    let matched = null;

    rows.forEach(row => {
      if (row.textContent.toLowerCase().includes(q)) {
        row.classList.add('deep-link-highlight');
        if (!matched) matched = row;
      }
    });

    if (matched) {
      matched.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function handleTargetCaseId(caseId, shouldOpenModal) {
    setTimeout(() => {
      // If modal inspection exists in current page
      if (shouldOpenModal !== 'false') {
        if (typeof window.openEscrowModal === 'function') {
          window.openEscrowModal(caseId);
        } else if (typeof window.openGrievanceModal === 'function') {
          window.openGrievanceModal(caseId);
        }
      }
      highlightMatchingRows(caseId);
    }, 400);
  }

  // Cross-Module Synchronizer when Escrow is Released
  function handleEscrowReleasedSync(data) {
    const caseId = data.caseId;
    if (!caseId) return;

    // Update any matching row in the DOM
    const rows = document.querySelectorAll('table tbody tr');
    rows.forEach(row => {
      if (row.textContent.includes(caseId)) {
        row.classList.add('deep-link-highlight');
        // Find badge or action button
        const badge = row.querySelector('.badge, .badge-gov-clear, .badge-gov-pending, .badge-gov-hold');
        if (badge) {
          badge.className = 'badge badge-gov-clear';
          badge.textContent = '✓ Cleared & Dispatched';
        }
        const actionBtn = row.querySelector('.btn-gov-approve, .btn-primary');
        if (actionBtn && actionBtn.textContent.includes('Release')) {
          actionBtn.disabled = true;
          actionBtn.style.opacity = '0.6';
          actionBtn.style.cursor = 'not-allowed';
          actionBtn.textContent = '✓ Released';
        }
      }
    });

    // Update Overview stats if present
    const activeDeals = document.getElementById('stat-active-deals');
    if (activeDeals && window.AgriNexAdminGovernance) {
      // Refresh count
    }
  }

  // Cross-Module Synchronizer when Logistics Status Updates
  function handleLogisticsSync(data) {
    const shipmentId = data.shipmentId;
    if (!shipmentId) return;

    const rows = document.querySelectorAll('table tbody tr');
    rows.forEach(row => {
      if (row.textContent.includes(shipmentId)) {
        row.classList.add('deep-link-highlight');
        const badge = row.querySelector('.badge');
        if (badge && data.status) {
          badge.textContent = data.status;
        }
      }
    });
  }

  // Initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCrossModuleBridge);
  } else {
    initCrossModuleBridge();
  }
})();
