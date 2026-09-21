/**
 * AgriNex Admin Unified Shell & Interlink Engine
 * 1. Persistent Collapsible Sidebar Management
 * 2. Command Palette (Ctrl + K / Cmd + K) Global Search & Actions
 * 3. Centralized AgriNexBus Event System (Local + Cross-Tab Sync via Storage)
 * 4. Contextual Deep Linking & Real-Time Action Notifications
 */

const AGRINEX_WINDOW_ID = 'win_' + Math.random().toString(36).substring(2, 9);

/* =========================================================================
   1. CENTRALIZED EVENT BUS (AgriNexBus)
   ========================================================================= */
class AgriNexEventBus {
  constructor() {
    this.listeners = {};
    this.windowId = AGRINEX_WINDOW_ID;
    this.initStorageListener();
  }

  // Register listener
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
    return () => this.off(event, callback);
  }

  // Deregister listener
  off(event, callback) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
  }

  // Emit event locally and broadcast across tabs/windows
  emit(event, data = {}, options = { broadcast: true, showToast: true }) {
    const payload = {
      event,
      data,
      sourceId: this.windowId,
      timestamp: Date.now()
    };

    // 1. Invoke local in-memory listeners
    this._dispatchLocal(event, data);

    // 2. Broadcast across tabs via localStorage
    if (options.broadcast) {
      try {
        localStorage.setItem('agrinex_bus_sync', JSON.stringify(payload));
        // Append to event history log
        this._recordHistory(payload);
      } catch (e) {
        console.warn('AgriNexBus: LocalStorage broadcast error', e);
      }
    }

    // 3. Optional user feedback toast
    if (options.showToast) {
      this._autoToast(event, data);
    }
  }

  _dispatchLocal(event, data) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(cb => {
        try {
          cb(data);
        } catch (err) {
          console.error(`AgriNexBus handler error for "${event}":`, err);
        }
      });
    }

    // Also support wildcard '*' listeners
    if (this.listeners['*']) {
      this.listeners['*'].forEach(cb => {
        try {
          cb(event, data);
        } catch (err) {}
      });
    }
  }

  // Listen to events from other tabs / modules (Farmer, Buyer, Logistics, Admin)
  initStorageListener() {
    window.addEventListener('storage', (e) => {
      if (e.key === 'agrinex_bus_sync' && e.newValue) {
        try {
          const payload = JSON.parse(e.newValue);
          // Don't duplicate self-events
          if (payload.sourceId !== this.windowId) {
            this._dispatchLocal(payload.event, payload.data);
            this._autoToast(payload.event, payload.data, true);
          }
        } catch (err) {
          console.warn('AgriNexBus: Failed to parse sync event', err);
        }
      }
    });
  }

  _recordHistory(payload) {
    try {
      const historyStr = localStorage.getItem('agrinex_bus_history') || '[]';
      const history = JSON.parse(historyStr);
      history.unshift({
        event: payload.event,
        data: payload.data,
        time: new Date(payload.timestamp).toLocaleTimeString()
      });
      if (history.length > 30) history.pop();
      localStorage.setItem('agrinex_bus_history', JSON.stringify(history));
    } catch (e) {}
  }

  _autoToast(event, data, fromExternal = false) {
    const prefix = fromExternal ? '⚡ [Sync] ' : '✓ ';
    switch (event) {
      case 'escrow:released':
        AgriNexToast.show({
          icon: '💰',
          title: prefix + 'Dual-Key Escrow Payout Authorized',
          message: `Case ${data.caseId || 'ESC-0052'} cleared for ₹ ${data.amount || '12.4 Lakh'}. RTGS dispatched & fleet status updated.`,
          type: 'success'
        });
        break;
      case 'escrow:hold':
        AgriNexToast.show({
          icon: '⚠️',
          title: prefix + 'Escrow Payout On Hold',
          message: `Case ${data.caseId} placed on hold pending quality/tribunal review.`,
          type: 'warning'
        });
        break;
      case 'kyc:approved':
      case 'user:reactivated':
        AgriNexToast.show({
          icon: '🛡️',
          title: prefix + 'User Access Active & Sanctioned',
          message: `${data.userName || 'User'} (${data.userId || ''}) active with verified credentials.`,
          type: 'info'
        });
        break;
      case 'user:removed':
        AgriNexToast.show({
          icon: '🗑️',
          title: prefix + 'User De-listed & Removed',
          message: `${data.userName || 'User'} (${data.userId || ''}) de-listed. Reason: ${data.reason || 'Admin Action'}.`,
          type: 'warning'
        });
        break;
      case 'user:suspended':
        AgriNexToast.show({
          icon: '⛔',
          title: prefix + 'User Trading Access Suspended',
          message: `${data.userName || 'User'} (${data.userId || ''}) frozen. Reason: ${data.reason || 'Compliance Hold'}.`,
          type: 'warning'
        });
        break;
      case 'advisory:broadcast':
        AgriNexToast.show({
          icon: '📢',
          title: prefix + 'Crisis Advisory Dispatched',
          message: `Broadcast sent to ${data.reach || '18,450 farmers'} across 68 APMC mandis.`,
          type: 'info'
        });
        break;
      case 'logistics:updated':
        AgriNexToast.show({
          icon: '🚚',
          title: prefix + 'Logistics Fleet Telemetry Updated',
          message: `Trip ${data.shipmentId || 'SHP-0042'}: Status now ${data.status || 'Delivered & Verified'}.`,
          type: 'info'
        });
        break;
      case 'dispute:tribunal_order':
        AgriNexToast.show({
          icon: '⚖️',
          title: prefix + 'Dispute Tribunal Order Passed',
          message: `Binding order executed for Case ${data.caseId || 'GR-0091'}.`,
          type: 'warning'
        });
        break;
      default:
        break;
    }
  }
}

// Global Event Bus Singleton
window.AgriNexBus = new AgriNexEventBus();

/* =========================================================================
   2. TOAST NOTIFICATION SYSTEM
   ========================================================================= */
const AgriNexToast = {
  stackEl: null,

  init() {
    if (!document.getElementById('agrinex-toast-stack')) {
      const stack = document.createElement('div');
      stack.id = 'agrinex-toast-stack';
      document.body.appendChild(stack);
      this.stackEl = stack;
    } else {
      this.stackEl = document.getElementById('agrinex-toast-stack');
    }
  },

  show({ icon = '🔔', title, message, type = 'success', duration = 4200 }) {
    this.init();
    const toast = document.createElement('div');
    const typeClass = type === 'warning' ? 'toast-warning' : type === 'alert' ? 'toast-alert' : type === 'info' ? 'toast-info' : '';
    toast.className = `agrinex-toast ${typeClass}`;
    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-body">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close" onclick="this.parentElement.remove()">&times;</button>
    `;

    this.stackEl.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 250);
    }, duration);
  }
};

/* =========================================================================
   3. PERSISTENT COLLAPSIBLE SIDEBAR CONTROLLER
   ========================================================================= */
const AgriNexSidebar = {
  init() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;

    // Set tooltips on all nav items for collapsed mode
    const navItems = sidebar.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      const span = item.querySelector('span');
      if (span && !item.getAttribute('data-tooltip')) {
        item.setAttribute('data-tooltip', span.textContent.trim());
      }
    });

    // Inject toggle button into sidebar brand header if not present
    const brand = sidebar.querySelector('.sidebar-brand');
    if (brand && !brand.querySelector('.sidebar-toggle-btn')) {
      const toggleBtn = document.createElement('button');
      toggleBtn.className = 'sidebar-toggle-btn';
      toggleBtn.id = 'sidebar-toggle-btn';
      toggleBtn.title = 'Toggle Sidebar Collapse (Ctrl + B)';
      toggleBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      `;
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggle();
      });
      brand.appendChild(toggleBtn);
    }

    // Add keyboard shortcut Ctrl + B to toggle sidebar
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        this.toggle();
      }
    });

    // Restore persistent state from localStorage
    const isCollapsed = localStorage.getItem('agrinex_sidebar_collapsed') === 'true';
    if (isCollapsed) {
      this.collapse(false);
    }
  },

  toggle() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    if (sidebar.classList.contains('collapsed')) {
      this.expand();
    } else {
      this.collapse();
    }
  },

  collapse(animate = true) {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    sidebar.classList.add('collapsed');
    localStorage.setItem('agrinex_sidebar_collapsed', 'true');
    window.AgriNexBus.emit('sidebar:state', { collapsed: true }, { broadcast: false, showToast: false });
  },

  expand() {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    sidebar.classList.remove('collapsed');
    localStorage.setItem('agrinex_sidebar_collapsed', 'false');
    window.AgriNexBus.emit('sidebar:state', { collapsed: false }, { broadcast: false, showToast: false });
  }
};

/* =========================================================================
   4. COMMAND PALETTE (CTRL + K / CMD + K) ENGINE
   ========================================================================= */
const AgriNexCommandPalette = {
  isOpen: false,
  selectedIndex: 0,
  currentResults: [],
  container: null,

  init() {
    this.injectDOM();
    this.bindEvents();
  },

  injectDOM() {
    if (document.getElementById('agrinex-command-palette')) return;

    const backdrop = document.createElement('div');
    backdrop.id = 'agrinex-command-palette';
    backdrop.className = 'command-palette-backdrop';
    backdrop.innerHTML = `
      <div class="command-palette-modal" onclick="event.stopPropagation()">
        <div class="command-palette-header">
          <svg class="command-palette-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            id="command-palette-input" 
            class="command-palette-input" 
            placeholder="Type a command, user, deal, mandi, or jump to module..." 
            autocomplete="off" 
            spellcheck="false"
          />
          <span class="command-palette-esc-badge">ESC</span>
        </div>
        
        <div class="command-palette-results" id="command-palette-results">
          <!-- Results injected dynamically -->
        </div>

        <div class="command-palette-footer">
          <div class="command-palette-shortcuts">
            <span><kbd>↑</kbd> <kbd>↓</kbd> Navigate</span>
            <span><kbd>↵</kbd> Select</span>
            <span><kbd>ESC</kbd> Close</span>
          </div>
          <div style="font-weight: 700; color: #059669;">
            🛡️ AgriNex Unified Command Center
          </div>
        </div>
      </div>
    `;

    backdrop.addEventListener('click', () => this.close());
    document.body.appendChild(backdrop);
    this.container = backdrop;

    // Connect top navbar search input to also trigger command palette
    const globalSearchInput = document.getElementById('global-search-input');
    if (globalSearchInput) {
      // Add Ctrl+K badge next to it if not present
      const parent = globalSearchInput.parentElement;
      if (parent && !parent.querySelector('.search-ctrl-k-badge')) {
        const badge = document.createElement('span');
        badge.className = 'search-ctrl-k-badge';
        badge.innerHTML = '⌘K';
        badge.title = 'Open Command Palette (Ctrl + K)';
        badge.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          AgriNexCommandPalette.open();
        };
        parent.appendChild(badge);
      }

      globalSearchInput.addEventListener('focus', () => {
        this.open();
      });
    }
  },

  bindEvents() {
    window.addEventListener('keydown', (e) => {
      // Ctrl + K or Cmd + K
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        this.toggle();
        return;
      }

      if (!this.isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        this.close();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.moveSelection(1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.moveSelection(-1);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        this.executeSelected();
      }
    });

    const input = document.getElementById('command-palette-input');
    if (input) {
      input.addEventListener('input', (e) => {
        this.search(e.target.value);
      });
    }
  },

  open(initialQuery = '') {
    this.isOpen = true;
    const backdrop = document.getElementById('agrinex-command-palette');
    if (backdrop) {
      backdrop.classList.add('active');
    }
    const input = document.getElementById('command-palette-input');
    if (input) {
      input.value = initialQuery;
      input.focus();
      this.search(initialQuery);
    }
  },

  close() {
    this.isOpen = false;
    const backdrop = document.getElementById('agrinex-command-palette');
    if (backdrop) {
      backdrop.classList.remove('active');
    }
    // Return focus if needed
    const globalSearch = document.getElementById('global-search-input');
    if (globalSearch && document.activeElement === document.getElementById('command-palette-input')) {
      globalSearch.blur();
    }
  },

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  },

  // Index and search all items
  getAllCommands() {
    const isMainAdmin = window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/admin-module/') || window.location.pathname.endsWith('/admin-module');
    
    // Core Navigation
    const navItems = [
      {
        id: 'nav-dashboard',
        category: 'Navigation',
        title: 'Dashboard Overview',
        desc: 'Operational overview, KPIs, and regional mandi monitors',
        icon: '📊',
        action: () => this.jumpSection('dashboard')
      },
      {
        id: 'nav-users',
        category: 'Navigation',
        title: 'User Directory & Compliance',
        desc: 'Verified & pending Farmers, Corporate Buyers, and Logistics',
        icon: '👥',
        action: () => this.jumpSection('users')
      },
      {
        id: 'nav-market',
        category: 'Navigation',
        title: 'Market Data & Mandi Benchmarks',
        desc: 'MSP floor prices, modal rates, and anti-hoarding alerts',
        icon: '📈',
        action: () => this.jumpSection('market-data')
      },
      {
        id: 'nav-deals',
        category: 'Navigation',
        title: 'Deals & Dual-Key Escrow Ledger',
        desc: 'Active contracts, weigh slips, and RTGS milestone payouts',
        icon: '📜',
        action: () => this.jumpSection('deals-payments')
      },
      {
        id: 'nav-logistics',
        category: 'Navigation',
        title: 'Logistics Fleet & MSWC Warehouses',
        desc: '312 active transport orders, GPS reefer telemetry, and hubs',
        icon: '🚚',
        action: () => this.jumpSection('logistics-storage')
      },
      {
        id: 'nav-emergency',
        category: 'Navigation',
        title: 'Emergency Sell & Flash Auctions',
        desc: 'Rapid clearance for perishable distress crops at risk',
        icon: '⚡',
        action: () => this.jumpSection('emergency-sell')
      },
      {
        id: 'nav-grievance',
        category: 'Navigation',
        title: 'Grievance Tribunal & Arbitration',
        desc: 'Statutory dispute hearings, split settlements, lab assays',
        icon: '⚖️',
        action: () => {
          if (isMainAdmin) {
            this.jumpSection('grievances');
          } else {
            window.location.href = 'grievance-arbitration.html';
          }
        }
      },
      {
        id: 'nav-reports',
        category: 'Navigation',
        title: 'Governance Reports & Audit Trail',
        desc: 'Immutable cryptographic logs and CSV/PDF ledger export',
        icon: '📑',
        action: () => this.jumpSection('reports')
      }
    ];

    // Sub-Module Pages
    const subPages = [
      {
        id: 'sub-escrow',
        category: 'Specialized Sub-Modules',
        title: 'Escrow Governance & Dual-Key Releases',
        desc: 'Dedicated page for bank escrow disbursement controls',
        icon: '🔒',
        badge: 'Sub-Module',
        action: () => { window.location.href = 'escrow-governance.html'; }
      },
      {
        id: 'sub-tribunal',
        category: 'Specialized Sub-Modules',
        title: 'Dispute Arbitration Tribunal Bench',
        desc: 'Formal hearings, bench rulings, and compensation orders',
        icon: '⚖️',
        badge: 'Sub-Module',
        action: () => { window.location.href = 'grievance-arbitration.html'; }
      },
      {
        id: 'sub-mandi',
        category: 'Specialized Sub-Modules',
        title: 'Mandi Price Governance & MSP Controls',
        desc: 'Comprehensive statewide mandi regulatory desk',
        icon: '🌾',
        badge: 'Sub-Module',
        action: () => { window.location.href = 'mandi-governance.html'; }
      },
      {
        id: 'portal-farmer',
        category: 'Connected Stakeholder Portals',
        title: 'Switch to Farmer Portal',
        desc: 'Direct trade interface for verified producers and FPOs',
        icon: '🌾',
        badge: 'External',
        action: () => { window.location.href = '../farmer-module/index.html'; }
      },
      {
        id: 'portal-buyer',
        category: 'Connected Stakeholder Portals',
        title: 'Switch to Enterprise Buyer Terminal',
        desc: 'Bulk sourcing, e-auctions, and contract management',
        icon: '🏢',
        badge: 'External',
        action: () => { window.location.href = '../buyer-module/index.html'; }
      },
      {
        id: 'portal-logistics',
        category: 'Connected Stakeholder Portals',
        title: 'Switch to Logistics Fleet Hub',
        desc: 'Trip acceptances, reefer temperature monitor, e-weigh slips',
        icon: '🚚',
        badge: 'External',
        action: () => { window.location.href = '../logistics-module/index.html'; }
      }
    ];

    // Quick Admin Actions
    const quickActions = [
      {
        id: 'act-broadcast',
        category: 'Quick Actions',
        title: 'Broadcast Crisis Advisory (Voice & SMS)',
        desc: 'Dispatch emergency audio/SMS alert via Sarvam AI engine',
        icon: '📢',
        badge: 'Action',
        action: () => {
          this.close();
          if (typeof openBroadcastModal === 'function') {
            openBroadcastModal();
          } else {
            window.location.href = 'index.html#broadcast';
          }
        }
      },
      {
        id: 'act-pending',
        category: 'Quick Actions',
        title: 'Triage 14 Pending Actions',
        desc: 'Open the critical queue requiring dual-key, KYC, or dispute triage',
        icon: '⚠️',
        badge: 'Action',
        action: () => {
          this.close();
          if (typeof openPendingActionsModal === 'function') {
            openPendingActionsModal();
          } else {
            window.location.href = 'index.html#pending';
          }
        }
      },
      {
        id: 'act-sidebar',
        category: 'Quick Actions',
        title: 'Toggle Sidebar Collapse (Ctrl + B)',
        desc: 'Switch between full and icon-only sidebar navigation',
        icon: '📐',
        badge: 'Shortcut',
        action: () => {
          AgriNexSidebar.toggle();
          this.close();
        }
      },
      {
        id: 'act-export',
        category: 'Quick Actions',
        title: 'Export Platform Audit Trail CSV',
        desc: 'Generate immediate download of cryptographic governance log',
        icon: '📥',
        badge: 'Export',
        action: () => {
          this.close();
          if (typeof exportAuditLedgerCSV === 'function') {
            exportAuditLedgerCSV();
          } else {
            AgriNexToast.show({ icon: '📥', title: 'Exporting Audit Ledger', message: 'Downloading CSV format report...' });
          }
        }
      }
    ];

    // Data-backed search entries if AgriNexAdminGovernance exists
    let dynamicData = [];
    if (window.AgriNexAdminGovernance) {
      // 1. Escrow Cases
      const escrowCases = window.AgriNexAdminGovernance.getEscrowCases ? window.AgriNexAdminGovernance.getEscrowCases() : [];
      escrowCases.forEach(c => {
        dynamicData.push({
          id: `escrow-${c.id}`,
          category: 'Escrow & Clearances',
          title: `${c.id} — ${c.crop} (${c.farmerName} ➔ ${c.buyerName})`,
          desc: `Milestone: ${c.payoutFormatted} • Proof: ${c.proof} • Status: ${c.status}`,
          icon: '💰',
          badge: 'Escrow',
          action: () => {
            this.close();
            if (isMainAdmin) {
              if (typeof switchSection === 'function') switchSection('deals-payments');
              setTimeout(() => {
                if (typeof openEscrowModal === 'function') openEscrowModal(c.id);
              }, 200);
            } else {
              window.location.href = `escrow-governance.html?caseId=${c.id}`;
            }
          }
        });
      });

      // 2. Users
      const users = window.AgriNexAdminGovernance.getUsers ? window.AgriNexAdminGovernance.getUsers() : [];
      users.forEach(u => {
        dynamicData.push({
          id: `user-${u.id}`,
          category: 'Users & Compliance',
          title: `${u.name} (${u.role}) — ${u.location}`,
          desc: `${u.cropOrOps} • Status: ${u.status} • Compliance: ${u.kycDoc}`,
          icon: u.role === 'Farmer' ? '👨🌾' : u.role === 'Buyer' ? '🏢' : '🚚',
          badge: u.role,
          action: () => {
            this.close();
            if (isMainAdmin) {
              if (typeof switchSection === 'function') switchSection('users');
              setTimeout(() => {
                if (typeof openUserKycModal === 'function') openUserKycModal(u.id);
              }, 200);
            } else {
              window.location.href = `index.html#users?id=${u.id}`;
            }
          }
        });
      });

      // 3. Logistics & Fleets
      const fleets = window.AgriNexAdminGovernance.getDeliveries ? window.AgriNexAdminGovernance.getDeliveries() : [];
      fleets.forEach(f => {
        dynamicData.push({
          id: `fleet-${f.id}`,
          category: 'Logistics Fleets',
          title: `${f.id} — ${f.route} (${f.transporter})`,
          desc: `Cargo: ${f.cargo} • Temp: ${f.tempStatus} • Driver: ${f.driver}`,
          icon: '🚚',
          badge: 'Fleet',
          action: () => {
            this.close();
            if (isMainAdmin) {
              if (typeof switchSection === 'function') switchSection('logistics-storage');
              setTimeout(() => {
                const el = document.getElementById(`row-fleet-${f.id}`);
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  el.classList.add('deep-link-highlight');
                }
              }, 250);
            } else {
              window.location.href = `index.html#logistics-storage?filter=${f.id}`;
            }
          }
        });
      });
    }

    return [...navItems, ...quickActions, ...subPages, ...dynamicData];
  },

  jumpSection(sectionId) {
    this.close();
    if (typeof switchSection === 'function') {
      switchSection(sectionId);
    } else {
      window.location.href = `index.html#${sectionId}`;
    }
  },

  search(query) {
    const q = (query || '').toLowerCase().trim();
    const all = this.getAllCommands();
    
    if (!q) {
      // Default initial display: Navigation & Quick Actions
      this.currentResults = all.slice(0, 10);
    } else {
      this.currentResults = all.filter(item => {
        return item.title.toLowerCase().includes(q) ||
               item.desc.toLowerCase().includes(q) ||
               item.category.toLowerCase().includes(q);
      }).slice(0, 15);
    }

    this.selectedIndex = 0;
    this.renderResults();
  },

  renderResults() {
    const container = document.getElementById('command-palette-results');
    if (!container) return;

    if (this.currentResults.length === 0) {
      container.innerHTML = `
        <div style="padding: 24px 16px; text-align: center; color: #94a3b8;">
          <div style="font-size: 1.5rem; margin-bottom: 6px;">🔍</div>
          <div style="font-weight: 700; font-size: 0.88rem; color: #475569;">No results found</div>
          <div style="font-size: 0.76rem;">Try searching for "Ramesh", "Escrow", "Lasalgaon", or "Logistics"</div>
        </div>
      `;
      return;
    }

    // Group by category
    let html = '';
    let currentCategory = '';

    this.currentResults.forEach((item, index) => {
      if (item.category !== currentCategory) {
        currentCategory = item.category;
        html += `<div class="command-group-title">${currentCategory}</div>`;
      }

      const isSelected = index === this.selectedIndex;
      html += `
        <div 
          class="command-item ${isSelected ? 'selected' : ''}" 
          data-index="${index}"
          onclick="AgriNexCommandPalette.selectIndex(${index})"
        >
          <div class="command-item-icon">${item.icon || '⚡'}</div>
          <div class="command-item-info">
            <div class="command-item-title">${item.title}</div>
            <div class="command-item-desc">${item.desc}</div>
          </div>
          ${item.badge ? `<span class="command-item-badge">${item.badge}</span>` : ''}
        </div>
      `;
    });

    container.innerHTML = html;

    // Scroll active item into view
    const selectedEl = container.querySelector('.command-item.selected');
    if (selectedEl) {
      selectedEl.scrollIntoView({ block: 'nearest' });
    }
  },

  moveSelection(direction) {
    if (this.currentResults.length === 0) return;
    this.selectedIndex += direction;
    if (this.selectedIndex < 0) {
      this.selectedIndex = this.currentResults.length - 1;
    } else if (this.selectedIndex >= this.currentResults.length) {
      this.selectedIndex = 0;
    }
    this.renderResults();
  },

  selectIndex(index) {
    this.selectedIndex = index;
    this.executeSelected();
  },

  executeSelected() {
    const item = this.currentResults[this.selectedIndex];
    if (item && typeof item.action === 'function') {
      item.action();
    }
  }
};

/* =========================================================================
   5. CONTEXTUAL DEEP-LINKING BRIDGE
   ========================================================================= */
const AgriNexDeepLink = {
  // Jump between modules with contextual pre-filtered parameters
  jumpTo(targetModule, param = '') {
    switch (targetModule) {
      case 'logistics':
        window.location.href = `../logistics-module/index.html?filter=${encodeURIComponent(param)}&source=admin`;
        break;
      case 'farmer':
        window.location.href = `../farmer-module/index.html?ref=${encodeURIComponent(param)}&source=admin`;
        break;
      case 'buyer':
        window.location.href = `../buyer-module/index.html?deal=${encodeURIComponent(param)}&source=admin`;
        break;
      case 'escrow':
        window.location.href = `escrow-governance.html?caseId=${encodeURIComponent(param)}`;
        break;
      case 'tribunal':
        window.location.href = `grievance-arbitration.html?caseId=${encodeURIComponent(param)}`;
        break;
      case 'mandi':
        window.location.href = `mandi-governance.html?market=${encodeURIComponent(param)}`;
        break;
      case 'deals':
        if (typeof switchSection === 'function') {
          switchSection('deals-payments');
          setTimeout(() => {
            const searchBox = document.querySelector('#section-deals-payments input');
            if (searchBox) {
              searchBox.value = param;
              searchBox.dispatchEvent(new Event('input'));
            }
          }, 200);
        } else {
          window.location.href = `index.html#deals-payments?filter=${encodeURIComponent(param)}`;
        }
        break;
      default:
        console.warn('Unknown target module:', targetModule);
    }
  }
};

window.AgriNexDeepLink = AgriNexDeepLink;
window.AgriNexCommandPalette = AgriNexCommandPalette;
window.AgriNexSidebar = AgriNexSidebar;
window.AgriNexToast = AgriNexToast;

// Auto-initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  AgriNexToast.init();
  AgriNexSidebar.init();
  AgriNexCommandPalette.init();
});
