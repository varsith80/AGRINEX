/**
 * AgriNex Enterprise Suite - Buyer Module REST API Integration Tests
 * Tests live endpoints on http://localhost:3000 using native fetch.
 */

const { describe, it } = require('node:test');
const assert = require('node:assert');

const BASE_URL = 'http://localhost:3000';

describe('AgriNex Buyer Module REST API Live Endpoints', () => {

  let authToken = null;
  let createdContractNo = null;

  describe('1. Authentication & Identity Verification Endpoints', () => {
    it('POST /api/auth/buyer-login - should authenticate corporate buyer and return HMAC-SHA256 JWT token', async () => {
      const payload = {
        officer_name: 'Karthik Sundaram',
        company: 'BigBasket Direct Farm Sourcing (Maharashtra)',
        gstin: '27AABCB2210M1Z2',
        fssai: '11522034000189'
      };

      const res = await fetch(`${BASE_URL}/api/auth/buyer-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(data.success, true);
      assert.ok(typeof data.token === 'string' && data.token.split('.').length === 3);
      assert.strictEqual(data.officer, payload.officer_name);
      assert.strictEqual(data.gstin_valid, true);
      assert.strictEqual(data.fssai_valid, true);
      assert.strictEqual(data.state, 'Maharashtra');

      authToken = data.token;
    });

    it('POST /api/auth/verify-gstin - should verify valid GSTIN and FSSAI license compliance', async () => {
      const res = await fetch(`${BASE_URL}/api/auth/verify-gstin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gstin: '27AABCB2210M1Z2',
          fssai: '11522034000189'
        })
      });

      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(data.compliant, true);
      assert.strictEqual(data.gstin.valid, true);
      assert.strictEqual(data.gstin.stateName, 'Maharashtra');
      assert.strictEqual(data.fssai.valid, true);
    });
  });

  describe('2. Bulk Demands & Forward Contracting Endpoints', () => {
    it('POST /api/buyer/demands - should create and broadcast new procurement quota', async () => {
      const newDemand = {
        crop: 'Red Onion (Lasalgaon Garwa Export Grade)',
        category: 'Fresh Farm Produce',
        tonnage: '50 Qt (5,000 kg)',
        tonnageNum: 50,
        targetPrice: '₹ 18.00/kg',
        pricePerKg: 18.0,
        location: 'Vashi APMC Central Terminal, Navi Mumbai, MH',
        deadline: '30 Sep 2026'
      };

      const res = await fetch(`${BASE_URL}/api/buyer/demands`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(newDemand)
      });

      assert.strictEqual(res.status, 201);
      const data = await res.json();
      assert.strictEqual(data.success, true);
      assert.ok(data.demand && data.demand.id);
      assert.strictEqual(data.demand.crop, newDemand.crop);
      assert.strictEqual(data.demand.pricePerKg, 18.0);
    });

    it('GET /api/buyer/demands - should return list of active procurement demands', async () => {
      const res = await fetch(`${BASE_URL}/api/buyer/demands`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${authToken}` }
      });

      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.ok(Array.isArray(data));
      assert.ok(data.length > 0, 'Expected at least 1 demand in system');
    });
  });

  describe('3. Spot Procurement, Escrow Locking & Settlement Endpoints', () => {
    it('POST /api/buyer/direct-buy - should atomically lock 35% advance in escrow and create transit consignment', async () => {
      const order = {
        lot_id: 'LOT-ONI-01',
        crop: 'Red Onion (Nashik Garwa Quality)',
        grade: 'Grade A',
        farmer_name: 'Patil Rameshwar',
        qty_kg: 5000,
        rate_kg: 18.0,
        buyer_name: 'Karthik Sundaram (BigBasket)'
      };

      const res = await fetch(`${BASE_URL}/api/buyer/direct-buy`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(order)
      });

      assert.strictEqual(res.status, 201);
      const data = await res.json();
      assert.strictEqual(data.success, true);
      assert.ok(data.contract && data.contract.contract_no);
      assert.strictEqual(data.contract.total_amount, 90000);
      assert.strictEqual(data.contract.advance_amount, 31500); // 35% of 90,000
      assert.strictEqual(data.contract.balance_amount, 58500); // 65% of 90,000
      assert.strictEqual(data.shipment.status, 'transit');
      assert.strictEqual(data.shipment.step, 3);

      createdContractNo = data.contract.contract_no;
    });

    it('POST /api/buyer/counter-bid - should register counter-offer bid for farmer review', async () => {
      const bid = {
        lot_id: 'LOT-TOM-02',
        crop: 'Tomato (Narayangaon Hybrid)',
        bid_rate_kg: 12.50,
        quantity_kg: 6000,
        buyer_name: 'Karthik Sundaram (BigBasket)'
      };

      const res = await fetch(`${BASE_URL}/api/buyer/counter-bid`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(bid)
      });

      assert.strictEqual(res.status, 201);
      const data = await res.json();
      assert.strictEqual(data.success, true);
      assert.strictEqual(data.bid.crop, bid.crop);
      assert.strictEqual(data.bid.bid_rate_kg, 12.50);
      assert.strictEqual(data.bid.total_value, 75000); // 6000 * 12.50
      assert.strictEqual(data.bid.advance_35, 26250); // 35% of 75,000
    });

    it('POST /api/buyer/escrow/release - should disburse remaining 65% balance and settle contract', async () => {
      assert.ok(createdContractNo, 'Contract number must be defined from prior step');

      const res = await fetch(`${BASE_URL}/api/buyer/escrow/release`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ contract_no: createdContractNo })
      });

      assert.strictEqual(res.status, 200);
      const data = await res.json();
      assert.strictEqual(data.success, true);
      assert.ok(data.message.includes(createdContractNo));
    });
  });

  describe('4. Market Insights & Landed Cost Endpoints', () => {
    it('GET /api/buyer/market-insights - should return Maharashtra APMC commodity benchmarks', async () => {
      const res = await fetch(`${BASE_URL}/api/buyer/market-insights`);
      assert.strictEqual(res.status, 200);
      const json = await res.json();
      assert.strictEqual(json.success, true);
      assert.ok(json.data && typeof json.data === 'object');
      assert.ok(json.commodities_count >= 28, 'Expected at least 28 commodity benchmarks');
      assert.ok(json.data.onion, 'Expected onion data in benchmarks');
      assert.strictEqual(json.data.onion.key, 'onion');
    });

    it('POST /api/buyer/mandi-sync - should dynamically synchronize APMC rates and arrival volumes', async () => {
      const res = await fetch(`${BASE_URL}/api/buyer/mandi-sync`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      assert.strictEqual(res.status, 200);
      const json = await res.json();
      assert.strictEqual(json.success, true);
      assert.ok(json.synced_at);
      assert.ok(json.data && json.data.onion);
    });

    it('POST /api/buyer/landed-cost-estimate - should calculate precise freight, statutory cess and net landed cost', async () => {
      const payload = {
        qtyKg: 5000,
        rateKg: 18.0,
        distanceKm: 210,
        terminalRateKg: 21.50
      };

      const res = await fetch(`${BASE_URL}/api/buyer/landed-cost-estimate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      assert.strictEqual(res.status, 200);
      const json = await res.json();
      assert.strictEqual(json.success, true);
      assert.strictEqual(json.farmGateCost, 90000);
      assert.ok(json.totalLandedCost > 90000);
      assert.ok(json.landedCostPerKg > 19 && json.landedCostPerKg < 21);
      assert.ok(json.netSavings > 0);
      assert.ok(json.arbitragePct > 0);
    });
  });

});

