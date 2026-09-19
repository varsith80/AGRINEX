/**
 * AgriNex Enterprise Buyer Module - REST API Client & JWT Session Manager
 * Connects frontend domain modules to the persistent backend with offline fallback.
 */

(function(window) {
  'use strict';

  const API_BASE = '/api';
  const TOKEN_KEY = 'agrinex_jwt_token';
  const OFFICER_KEY = 'agrinex_buyer_officer';

  const apiClient = {
    // Session & Auth management
    getToken() {
      try {
        return localStorage.getItem(TOKEN_KEY) || null;
      } catch (e) {
        return null;
      }
    },

    setSession(token, officerData) {
      try {
        if (token) localStorage.setItem(TOKEN_KEY, token);
        if (officerData) localStorage.setItem(OFFICER_KEY, JSON.stringify(officerData));
      } catch (e) {
        console.warn('LocalStorage error saving session', e);
      }
    },

    clearSession() {
      try {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(OFFICER_KEY);
      } catch (e) {
        console.warn('LocalStorage error clearing session', e);
      }
    },

    getCurrentOfficer() {
      try {
        const raw = localStorage.getItem(OFFICER_KEY);
        return raw ? JSON.parse(raw) : {
          name: 'Karthik Sundaram',
          company: 'BigBasket Direct Farm Sourcing',
          gstin: '27AABCB2210M1Z2',
          fssai: '11522034000189',
          role: 'Corporate Procurement Lead'
        };
      } catch (e) {
        return null;
      }
    },

    isAuthenticated() {
      return !!this.getToken();
    },

    // Generic fetch helper with Authorization header
    async request(endpoint, options = {}) {
      const url = `${API_BASE}${endpoint}`;
      const headers = {
        'Content-Type': 'application/json',
        ...(options.headers || {})
      };

      const token = this.getToken();
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      try {
        const response = await fetch(url, {
          ...options,
          headers
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || `Request failed with status ${response.status}`);
        }
        return data;
      } catch (err) {
        console.warn(`[AgriNex API] Request to ${url} failed, using local handling:`, err.message);
        throw err;
      }
    },

    // ---------------- AUTH METHODS ----------------
    async loginBuyer(credentials) {
      const res = await this.request('/auth/buyer-login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      });
      if (res.token) {
        this.setSession(res.token, {
          name: res.officer,
          company: res.company,
          gstin: credentials.gstin,
          fssai: credentials.fssai,
          state: res.state
        });
      }
      return res;
    },

    async verifyGstin(gstin, fssai) {
      return await this.request('/auth/verify-gstin', {
        method: 'POST',
        body: JSON.stringify({ gstin, fssai })
      });
    },

    // ---------------- DEMANDS METHODS ----------------
    async getDemands() {
      return await this.request('/buyer/demands', { method: 'GET' });
    },

    async postDemand(demandData) {
      return await this.request('/buyer/demands', {
        method: 'POST',
        body: JSON.stringify(demandData)
      });
    },

    // ---------------- TRADING & ESCROW METHODS ----------------
    async directBuy(orderData) {
      return await this.request('/buyer/direct-buy', {
        method: 'POST',
        body: JSON.stringify(orderData)
      });
    },

    async counterBid(bidData) {
      return await this.request('/buyer/counter-bid', {
        method: 'POST',
        body: JSON.stringify(bidData)
      });
    },

    async releaseEscrow(contractNo) {
      return await this.request('/buyer/escrow/release', {
        method: 'POST',
        body: JSON.stringify({ contract_no: contractNo })
      });
    }
  };

  // Expose on window
  window.apiClient = apiClient;

})(window);
