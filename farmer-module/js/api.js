/**
 * AgriNex Unified Client API SDK
 * Connects frontend pages to server.js REST backend
 */
const AgriNexAPI = {
  baseUrl: window.location.origin,

  async request(endpoint, options = {}) {
    try {
      const url = `${this.baseUrl}${endpoint}`;
      const defaultHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };
      const config = {
        ...options,
        headers: { ...defaultHeaders, ...(options.headers || {}) }
      };

      const res = await fetch(url, config);
      if (!res.ok) {
        throw new Error(`HTTP Error ${res.status}: ${res.statusText}`);
      }
      return await res.json();
    } catch (err) {
      console.warn(`[AgriNexAPI Error on ${endpoint}]:`, err.message);
      throw err;
    }
  },

  // 1. Dashboard Metrics
  async getDashboardStats() {
    return await this.request('/api/dashboard/stats');
  },

  // 2. Crops CRUD
  async getCrops(params = {}) {
    const query = new URLSearchParams(params).toString();
    const endpoint = query ? `/api/crops?${query}` : '/api/crops';
    return await this.request(endpoint);
  },

  async createCrop(cropData) {
    return await this.request('/api/crops', {
      method: 'POST',
      body: JSON.stringify(cropData)
    });
  },

  async deleteCrop(cropId) {
    return await this.request(`/api/crops/${cropId}`, {
      method: 'DELETE'
    });
  },

  // 3. Bids & Negotiation
  async getBids() {
    return await this.request('/api/bids');
  },

  async acceptBid(bidId) {
    return await this.request(`/api/bids/${bidId}/action`, {
      method: 'POST',
      body: JSON.stringify({ status: 'Accepted' })
    });
  },

  async counterBid(bidId, counterRateKg, note = "") {
    return await this.request(`/api/bids/${bidId}/action`, {
      method: 'POST',
      body: JSON.stringify({
        status: 'Countered',
        counter_rate_kg: Number(counterRateKg),
        counter_note: note
      })
    });
  },

  async rejectBid(bidId) {
    return await this.request(`/api/bids/${bidId}/action`, {
      method: 'POST',
      body: JSON.stringify({ status: 'Rejected' })
    });
  },

  // 4. Logistics & Shipments
  async getShipments() {
    return await this.request('/api/logistics/shipments');
  },

  // 5. Escrow Contracts
  async getEscrowContracts() {
    return await this.request('/api/escrow/contracts');
  },

  // 6. FPO Bulk Pooling
  async getFPOPools() {
    return await this.request('/api/fpo/pools');
  },

  async contributeFPO(poolId, quantityQt) {
    return await this.request('/api/fpo/contribute', {
      method: 'POST',
      body: JSON.stringify({
        pool_id: poolId,
        quantity_qt: Number(quantityQt)
      })
    });
  },

  // 7. Mandi AI Forecasts
  async getMandiForecasts() {
    return await this.request('/api/mandi/forecasts');
  },

  // 8. Profit Calculator
  async getProfitEstimate(params) {
    const query = new URLSearchParams(params).toString();
    return await this.request(`/api/calculator/estimate?${query}`);
  },

  // 9. Emergency Sale Salvage
  async activateEmergencySale(cropId) {
    return await this.request(`/api/crops/${cropId}/emergency`, {
      method: 'POST'
    });
  },

  async acceptEmergencyOffer(cropId, buyerId) {
    return await this.request(`/api/crops/${cropId}/emergency-accept`, {
      method: 'POST',
      body: JSON.stringify({ buyerId })
    });
  }
};

window.AgriNexAPI = AgriNexAPI;
