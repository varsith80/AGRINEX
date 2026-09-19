/**
 * AgriNex Enterprise Buyer Module - REST API Client, Security Guard & Reactive Store
 * Implements Anti-XSS Sanitization, Anti-CSRF/Idempotency, Reactive State Store & SSE Live Streaming.
 */

(function(window) {
  'use strict';

  const API_BASE = '/api';
  const TOKEN_KEY = 'agrinex_jwt_token';
  const OFFICER_KEY = 'agrinex_buyer_officer';

  // -------------------------------------------------------------
  // 1. SECURITY: STRICT ANTI-XSS ESCAPER & SANITIZER
  // -------------------------------------------------------------
  function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    if (typeof str !== 'string') str = String(str);
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function sanitizeObject(obj) {
    if (!obj || typeof obj !== 'object') return obj;
    if (Array.isArray(obj)) return obj.map(sanitizeObject);
    const clean = {};
    for (const [k, v] of Object.entries(obj)) {
      if (typeof v === 'string') {
        clean[k] = escapeHTML(v);
      } else if (typeof v === 'object' && v !== null) {
        clean[k] = sanitizeObject(v);
      } else {
        clean[k] = v;
      }
    }
    return clean;
  }

  // -------------------------------------------------------------
  // 2. REACTIVE STATE STORE (AGRINEX PUB/SUB EVENT BUS)
  // -------------------------------------------------------------
  const AgriNexStore = {
    state: {
      lots: [],
      consignments: [],
      demands: [],
      grievances: [],
      telemetry: {
        reefer_temp_c: 4.2,
        humidity_pct: 88,
        speed_kmh: 62,
        freshness_score: '96%',
        current_location: 'Samruddhi Corridor Toll #4'
      }
    },
    listeners: new Set(),
    subscribe(fn) {
      this.listeners.add(fn);
      return () => this.listeners.delete(fn);
    },
    setState(patch) {
      this.state = { ...this.state, ...patch };
      this.listeners.forEach(fn => {
        try { fn(this.state); } catch (err) { console.error('[AgriNexStore error]', err); }
      });
    },
    getState() {
      return this.state;
    }
  };

  // -------------------------------------------------------------
  // 3. ENTERPRISE REST API CLIENT & JWT SESSION MANAGER
  // -------------------------------------------------------------
  const apiClient = {
    escapeHTML,
    sanitizeObject,

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

    // Generic fetch helper with Authorization, Anti-CSRF & Idempotency Key
    async request(endpoint, options = {}) {
      const url = `${API_BASE}${endpoint}`;
      const idempotencyKey = `REQ-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      
      const headers = {
        'Content-Type': 'application/json',
        'X-Requested-With': 'AgriNex-Buyer-Client',
        'X-Idempotency-Key': idempotencyKey,
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

    // ---------------- MARKETPLACE & LOTS METHODS ----------------
    async getMarketplaceLots() {
      try {
        const liveLots = await this.request('/buyer/lots', { method: 'GET' });
        if (Array.isArray(liveLots) && liveLots.length > 0) {
          if (window.buyerData) {
            const existingMap = new Map((window.buyerData.verifiedLots || []).map(l => [l.id, l]));
            liveLots.forEach(l => existingMap.set(l.id, { ...existingMap.get(l.id), ...l }));
            window.buyerData.verifiedLots = Array.from(existingMap.values());
            localStorage.setItem('agrinex_verified_lots', JSON.stringify(window.buyerData.verifiedLots));
          }
          AgriNexStore.setState({ lots: liveLots });
          return liveLots;
        }
      } catch (err) {
        console.warn('[apiClient.getMarketplaceLots] Fallback to local state:', err.message);
      }
      return (window.buyerData && window.buyerData.verifiedLots) || [];
    },

    // ---------------- DEMANDS METHODS ----------------
    async getDemands() {
      const res = await this.request('/buyer/demands', { method: 'GET' });
      AgriNexStore.setState({ demands: res });
      return res;
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
    },

    // ---------------- REAL-TIME SERVER-SENT EVENTS (SSE) ----------------
    subscribeTelemetrySSE(callback) {
      if (typeof window.EventSource === 'undefined') {
        console.warn('SSE not supported in this environment');
        return null;
      }
      try {
        const evtSource = new EventSource('/api/logistics/stream-telemetry');
        evtSource.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            AgriNexStore.setState({ telemetry: data });
            if (typeof callback === 'function') callback(data);
          } catch (e) {
            console.warn('Error parsing SSE telemetry payload', e);
          }
        };
        evtSource.onerror = () => {
          // EventSource automatically retries
        };
        return evtSource;
      } catch (err) {
        console.warn('Failed to connect to SSE stream:', err);
        return null;
      }
    }
  };

  // Expose on window
  window.escapeHTML = escapeHTML;
  window.sanitizeObject = sanitizeObject;
  window.AgriNexStore = AgriNexStore;
  window.apiClient = apiClient;

})(window);
