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
});
