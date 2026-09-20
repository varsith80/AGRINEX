const { describe, it } = require('node:test');
const assert = require('node:assert');
const { AgriNexFPOHub, FPO_COOPERATIVE_DATA } = require('../farmer-module/js/fpo_hub.js');

describe('AgriNex Cross-Module Synchronization Suite', () => {
  it('should auto-sync buyer demands into Farmer FPO Hub format', () => {
    // Mock buyer demand in localStorage simulation
    const mockBuyerDemands = [
      {
        id: 'DEM-TEST-SYNC-01',
        crop: 'Fresh Organic Alphonso Mangoes',
        category: 'Fruits',
        tonnage: '80 Qt (8,000 kg)',
        tonnageNum: 80,
        targetPrice: '₹ 45.00/kg',
        pricePerKg: 45.0,
        location: 'Ratnagiri APMC Central Yard',
        deadline: '5 Oct 2026'
      }
    ];

    global.localStorage = {
      getItem: (key) => {
        if (key === 'agrinex_buyer_demands') return JSON.stringify(mockBuyerDemands);
        if (key === 'agrinex_fpo_bulk_demands') return null;
        return null;
      },
      setItem: () => {}
    };

    const fpoDemands = AgriNexFPOHub.getBulkDemands();
    const syncedDemand = fpoDemands.find(d => d.id === 'DEM-TEST-SYNC-01');

    assert.ok(syncedDemand, 'Buyer demand must be dynamically mapped into Farmer FPO Hub');
    assert.strictEqual(syncedDemand.crop, 'Fresh Organic Alphonso Mangoes');
    assert.strictEqual(syncedDemand.image, 'assets/images/mango.jpg');
    assert.strictEqual(syncedDemand.totalRequiredNumber, 80);
    assert.strictEqual(syncedDemand.targetPriceNumber, 4500);
    assert.ok(syncedDemand.targetPricePerQt.includes('45.00'));
  });

  it('should verify Alphonso mango lots in backend data use assets/images/mango.jpg', () => {
    const fs = require('fs');
    const path = require('path');
    const dataJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../backend/data.json'), 'utf8'));

    const lot19 = dataJson.crops.find(c => c.id === 'LOT-FRE-19');
    const lot11 = dataJson.crops.find(c => c.id === 'LOT-FRE-11');

    assert.ok(lot19, 'LOT-FRE-19 must exist');
    assert.strictEqual(lot19.image, 'assets/images/mango.jpg', 'LOT-FRE-19 must use assets/images/mango.jpg');

    assert.ok(lot11, 'LOT-FRE-11 must exist');
    assert.strictEqual(lot11.image, 'assets/images/mango.jpg', 'LOT-FRE-11 must use assets/images/mango.jpg');
  });

  it('should audit Escrow, Payments, Logistics, and Grievances sync data contracts', () => {
    const fs = require('fs');
    const path = require('path');
    const dataJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../backend/data.json'), 'utf8'));

    // 1. Escrow Contracts & Payments Sync Integrity
    assert.ok(Array.isArray(dataJson.escrow_contracts), 'Escrow contracts array must exist');
    assert.ok(dataJson.escrow_contracts.length > 0, 'Must have active escrow contracts');
    const sampleContract = dataJson.escrow_contracts[0];
    assert.ok(sampleContract.contract_no, 'Escrow must have contract_no');
    assert.ok(sampleContract.advance_amount !== undefined, 'Escrow must track 35% advance amount');
    assert.ok(sampleContract.balance_amount !== undefined, 'Escrow must track 65% balance amount');

    // 2. Logistics Fleet Dispatches Sync Integrity
    assert.ok(Array.isArray(dataJson.logistics_dispatch_orders), 'Logistics dispatch orders array must exist');
    assert.ok(dataJson.logistics_dispatch_orders.length > 0, 'Must have logistics dispatches');
    const sampleDispatch = dataJson.logistics_dispatch_orders[0];
    assert.ok(sampleDispatch.order_code || sampleDispatch.orderCode, 'Dispatch must track order code');
    assert.ok(sampleDispatch.delivery_status || sampleDispatch.deliveryStatus, 'Dispatch must track delivery status');

    // 3. Grievance & Dispute Redressal Sync Integrity
    assert.ok(Array.isArray(dataJson.grievances), 'Grievances array must exist');
    assert.ok(dataJson.grievances.length > 0, 'Must have filed grievances');
    const sampleGrv = dataJson.grievances[0];
    assert.ok(sampleGrv.id, 'Grievance must have ID');
    assert.ok(sampleGrv.status, 'Grievance must have status');
    assert.ok(Array.isArray(sampleGrv.steps), 'Grievance must have resolution steps');
  });
});
