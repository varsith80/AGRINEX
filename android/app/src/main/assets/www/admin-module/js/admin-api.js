/**
 * AgriNex Admin Module - Centralized REST API Service Layer
 * Bridges the Admin Control Center UI with the Node.js / PostgreSQL / SQLite backend.
 * Provides JWT auth injection, real-time sync, dual-key crypto requests, and fallback handling.
 */

(function (window) {
  'use strict';

  const AdminAPI = {
    // 1. Token & Session Management
    getAuthToken() {
      let token = localStorage.getItem('agrinex_token') || sessionStorage.getItem('agrinex_token');
      if (!token) {
        try {
          const sess = JSON.parse(localStorage.getItem('agrinex_active_session') || '{}');
          if (sess && sess.token) token = sess.token;
        } catch(e) {}
      }
      return token || '';
    },

    getCurrentUser() {
      try {
        const userStr = localStorage.getItem('agrinex_user') || sessionStorage.getItem('agrinex_user');
        if (userStr) return JSON.parse(userStr);
        const sess = JSON.parse(localStorage.getItem('agrinex_active_session') || '{}');
        if (sess && sess.user) return sess.user;
        return null;
      } catch (e) {
        return null;
      }
    },

    setSession(token, user) {
      if (token) localStorage.setItem('agrinex_token', token);
      if (user) localStorage.setItem('agrinex_user', JSON.stringify(user));
    },

    clearSession() {
      localStorage.removeItem('agrinex_token');
      localStorage.removeItem('agrinex_user');
      localStorage.removeItem('agrinex_active_session');
      sessionStorage.removeItem('agrinex_token');
      sessionStorage.removeItem('agrinex_user');
    },

    // 2. Base HTTP Request Handler with Automatic Auth & Graceful Fallback
    async request(endpoint, options = {}) {
      const token = this.getAuthToken();
      const headers = {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...(options.headers || {})
      };

      try {
        const response = await fetch(endpoint, {
          ...options,
          headers
        });

        if (response.status === 401 || response.status === 403) {
          console.warn(`[AdminAPI] Unauthorized or Session Expired on ${endpoint}. Status: ${response.status}`);
          if (options.requireAuth !== false && !endpoint.includes('/api/auth/demo-login')) {
            const currentPath = encodeURIComponent(window.location.pathname + window.location.hash);
            window.location.replace(`../index.html?redirect=${currentPath}&error=session_expired`);
          }
          return { success: false, status: response.status, error: 'Unauthorized' };
        }

        const data = await response.json();
        return data;
      } catch (err) {
        console.warn(`[AdminAPI] Network/Server fallback for ${endpoint}:`, err.message);
        return { success: false, fallback: true, error: err.message };
      }
    },

    // 3. Overview Statistics
    async getOverviewStats() {
      const res = await this.request('/api/admin/overview');
      if (res && res.success && res.data) {
        return res.data;
      }
      return {
        stats: window.ADMIN_GOVERNANCE_DATA ? window.ADMIN_GOVERNANCE_DATA.stats : {}
      };
    },

    // 4. User Directory & KYC Verification
    async getUsers(filter = 'all', query = '') {
      const params = new URLSearchParams({ filter, query });
      const res = await this.request(`/api/admin/users?${params.toString()}`);
      if (res && res.success && res.users) {
        return res.users;
      }
      return null;
    },

    async updateKYCStatus(userId, status, notes = '') {
      return this.request('/api/admin/kyc/action', {
        method: 'POST',
        body: JSON.stringify({ userId, status, notes })
      });
    },

    // 5. Escrow Clearance & Dual-Key Release
    async getEscrowContracts() {
      const res = await this.request('/api/admin/escrow/contracts');
      if (res && res.success && res.contracts) {
        return res.contracts;
      }
      return null;
    },

    async releaseDualKeyEscrow(caseId, officerA, officerB, otp, payoutAmount) {
      return this.request('/api/admin/escrow/dual-key-release', {
        method: 'POST',
        body: JSON.stringify({
          caseId,
          officerA,
          officerB,
          otp,
          payoutAmount
        })
      });
    },

    async holdEscrowContract(caseId, reason) {
      return this.request('/api/admin/escrow/hold', {
        method: 'POST',
        body: JSON.stringify({ caseId, reason })
      });
    },

    // 6. APMC Mandi Price Ceiling & Anti-Hoarding Governance
    async adjustMandiPriceCeiling(crop, newCeilingRate, reason) {
      return this.request('/api/admin/mandi/adjust-ceiling', {
        method: 'POST',
        body: JSON.stringify({ crop, newCeilingRate, reason })
      });
    },

    async broadcastMarketAdvisory(mandi, advisoryText, priority = 'HIGH') {
      return this.request('/api/admin/mandi/broadcast-advisory', {
        method: 'POST',
        body: JSON.stringify({ mandi, advisoryText, priority })
      });
    },

    // 7. Dispute Tribunal Arbitration Rulings
    async settleDisputeCase(disputeId, ruling, settlementAmount, notes) {
      return this.request('/api/admin/disputes/action', {
        method: 'POST',
        body: JSON.stringify({ disputeId, ruling, settlementAmount, notes })
      });
    },

    // 8. Emergency Produce Liquidation
    async triggerEmergencyFlashAuction(lotId, markdownPct, durationHours) {
      return this.request('/api/admin/emergency/flash-auction', {
        method: 'POST',
        body: JSON.stringify({ lotId, markdownPct, durationHours })
      });
    },

    // 9. Real-Time Telemetry SSE Listener
    initTelemetryStream(onMessageCallback, onErrorCallback) {
      if (!window.EventSource) {
        console.warn('[AdminAPI] EventSource not supported in this browser.');
        return null;
      }

      try {
        const sse = new EventSource('/api/admin/telemetry-stream');
        
        sse.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (typeof onMessageCallback === 'function') {
              onMessageCallback(data);
            }
          } catch (e) {
            console.error('[AdminAPI] Telemetry JSON parse error:', e);
          }
        };

        sse.onerror = (err) => {
          if (typeof onErrorCallback === 'function') {
            onErrorCallback(err);
          }
        };

        return sse;
      } catch (e) {
        console.warn('[AdminAPI] Could not initialize telemetry stream:', e);
        return null;
      }
    }
  };

  // Expose globally to window
  window.AdminAPI = AdminAPI;
})(window);
