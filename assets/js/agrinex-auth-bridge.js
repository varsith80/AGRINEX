/**
 * AgriNex Universal Authentication & Session Bridge
 * Provides background session continuity and JWT API handling without any floating UI bars.
 */

(function () {
  'use strict';

  const DEFAULT_ROLES = {
    farmer: {
      id: 'USR_FARMER_001',
      name: 'Ramesh Kumar',
      role: 'Farmer & FPO Lead',
      roleKey: 'farmer',
      roleId: 'ROLE_FARMER',
      location: 'Erode, Tamil Nadu',
      moduleDir: 'farmer-module',
      redirectUrl: 'farmer-module/index.html',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80'
    },
    buyer: {
      id: 'USR_BUYER_001',
      name: 'Suresh Singhania (AgriFoods Ltd.)',
      role: 'Procurement Buyer',
      roleKey: 'buyer',
      roleId: 'ROLE_BUYER',
      location: 'Coimbatore, Tamil Nadu',
      moduleDir: 'buyer-module',
      redirectUrl: 'buyer-module/index.html',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
    },
    logistics: {
      id: 'USR_LOGISTICS_001',
      name: 'Karthik Raja (GreenWays Transit)',
      role: 'Fleet & Cold-Chain Lead',
      roleKey: 'logistics',
      roleId: 'ROLE_LOGISTICS',
      location: 'Salem Regional Hub, TN',
      moduleDir: 'logistics-module',
      redirectUrl: 'logistics-module/index.html',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80'
    },
    admin: {
      id: 'USR_ADMIN_001',
      name: 'Dr. A. Venkatesh',
      role: 'Mandi Governance Admin',
      roleKey: 'admin',
      roleId: 'ROLE_ADMIN',
      location: 'AgriNex HQ, Chennai',
      moduleDir: 'admin-module',
      redirectUrl: 'admin-module/index.html',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80'
    }
  };

  class AgriNexAuthBridge {
    constructor() {
      this.currentRole = this.detectCurrentRole();
      this.initSession();
      this.cleanupAnyExistingSwitcher();
    }

    detectCurrentRole() {
      const p = window.location.pathname.toLowerCase();
      if (p.includes('buyer-module')) return 'buyer';
      if (p.includes('logistics-module')) return 'logistics';
      if (p.includes('admin-module')) return 'admin';
      if (p.includes('farmer-module')) return 'farmer';
      return 'farmer';
    }

    getRootPrefix() {
      const p = window.location.pathname.toLowerCase();
      if (p.includes('/views/') || p.includes('/modals/')) return '../../';
      if (p.includes('-module') || p.includes('login_details')) return '../';
      return './';
    }

    initSession() {
      try {
        let session = JSON.parse(localStorage.getItem('agrinex_active_session') || 'null');
        if (!session || !session.user) {
          const defaultUser = DEFAULT_ROLES[this.currentRole] || DEFAULT_ROLES.farmer;
          session = {
            user: defaultUser,
            token: `AGX_AUTH_${Date.now()}_AUTO`,
            loginTime: new Date().toISOString()
          };
          localStorage.setItem('agrinex_active_session', JSON.stringify(session));
        }
        this.session = session;
      } catch (e) {
        this.session = { user: DEFAULT_ROLES.farmer, token: 'DEFAULT' };
      }
    }

    getUser() {
      return this.session?.user || DEFAULT_ROLES[this.currentRole];
    }

    getToken() {
      return this.session?.token || '';
    }

    async switchRole(roleKey) {
      const target = DEFAULT_ROLES[roleKey] || DEFAULT_ROLES.farmer;
      const root = this.getRootPrefix();

      this.session = {
        user: target,
        token: `AGX_AUTH_${Date.now()}_${roleKey.toUpperCase()}`,
        loginTime: new Date().toISOString()
      };
      localStorage.setItem('agrinex_active_session', JSON.stringify(this.session));

      try {
        await fetch('/api/auth/demo-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ role: roleKey })
        });
      } catch (err) {}

      window.location.href = `${root}${target.moduleDir}/index.html`;
    }

    logout() {
      localStorage.removeItem('agrinex_active_session');
      const root = this.getRootPrefix();
      window.location.href = `${root}index.html`;
    }

    cleanupAnyExistingSwitcher() {
      const existing = document.getElementById('agrinex-universal-switcher-root');
      if (existing) existing.remove();
    }
  }

  // Expose global bridge
  window.AgriNexBridge = new AgriNexAuthBridge();
})();
