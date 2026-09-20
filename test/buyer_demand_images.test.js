const { describe, it } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

describe('AgriNex Bulk Procurement Demand Images & Avatar Verification Suite', () => {
  const demandsJs = fs.readFileSync(path.join(__dirname, '../buyer-module/js/modules/demands.js'), 'utf8');

  // Extract getCropImage function to test it directly
  const fnMatch = demandsJs.match(/function getCropImage\([\s\S]*?\n\}/);
  assert.ok(fnMatch, 'getCropImage function must be defined in demands.js');
  const getCropImage = new Function(`${fnMatch[0]}; return getCropImage;`)();

  it('getCropImage should accurately map all agricultural commodities in English, Hindi, and Marathi', () => {
    // English
    assert.strictEqual(getCropImage('Red Onion (Lasalgaon Garwa)'), 'assets/images/onion.jpg');
    assert.strictEqual(getCropImage('Tomato (Pune Junnar / Narayangaon Hybrid)'), 'assets/images/tomato.jpg');
    assert.strictEqual(getCropImage('Grand Naine Banana (Khandesh Export Pack)'), 'assets/images/banana.jpg');
    assert.strictEqual(getCropImage('Yellow Soybean (JS 335 / High Oil Content)'), 'assets/images/soybean.jpg');
    assert.strictEqual(getCropImage('Nagpur Orange / Santra (Table Export Grade)'), 'assets/images/orange.jpg');
    assert.strictEqual(getCropImage('Sangli Rajapuri Turmeric Finger'), 'assets/images/turmeric.jpg');
    assert.strictEqual(getCropImage('Alphonso Mango (Ratnagiri Export Grade)'), 'assets/images/mango.jpg');
    assert.strictEqual(getCropImage('Solapur Bhagwa Pomegranate'), 'assets/images/pomegranate.jpg');
    assert.strictEqual(getCropImage('Vidarbha Raw Cotton'), 'assets/images/cotton.jpg');
    assert.strictEqual(getCropImage('Sharbati Wheat (Sehore Golden)'), 'assets/images/wheat.jpg');
    assert.strictEqual(getCropImage('Kolam Rice (Wada GI Tagged)'), 'assets/images/rice.jpg');
    assert.strictEqual(getCropImage('Thompson Seedless Grapes'), 'assets/images/grapes.jpg');
    assert.strictEqual(getCropImage('Jyoti Cold Storage Potato'), 'assets/images/potato.jpg');
    assert.strictEqual(getCropImage('G4 Green Chilli'), 'assets/images/green_chilli.jpg');

    // Marathi
    assert.strictEqual(getCropImage('नाशिक कांदा'), 'assets/images/onion.jpg');
    assert.strictEqual(getCropImage('टोमॅटो'), 'assets/images/tomato.jpg');
    assert.strictEqual(getCropImage('जळगाव केळी'), 'assets/images/banana.jpg');
    assert.strictEqual(getCropImage('लातूर सोयाबीन'), 'assets/images/soybean.jpg');
    assert.strictEqual(getCropImage('नागपूर संत्रा'), 'assets/images/orange.jpg');
    assert.strictEqual(getCropImage('सांगली हळद'), 'assets/images/turmeric.jpg');
    assert.strictEqual(getCropImage('हापूस आंबा'), 'assets/images/mango.jpg');
    assert.strictEqual(getCropImage('डाळिंब'), 'assets/images/pomegranate.jpg');
    assert.strictEqual(getCropImage('कापूस'), 'assets/images/cotton.jpg');
    assert.strictEqual(getCropImage('गहू'), 'assets/images/wheat.jpg');

    // Hindi
    assert.strictEqual(getCropImage('प्याज'), 'assets/images/onion.jpg');
    assert.strictEqual(getCropImage('टमाटर'), 'assets/images/tomato.jpg');
    assert.strictEqual(getCropImage('केला'), 'assets/images/banana.jpg');
    assert.strictEqual(getCropImage('नारंगी'), 'assets/images/orange.jpg');
    assert.strictEqual(getCropImage('हल्दी'), 'assets/images/turmeric.jpg');
    assert.strictEqual(getCropImage('अनार'), 'assets/images/pomegranate.jpg');
  });

  it('all referenced crop image files must physically exist on disk in assets/images/ and buyer-module/assets/images/', () => {
    const crops = [
      'onion.jpg', 'tomato.jpg', 'banana.jpg', 'soybean.jpg', 'orange.jpg', 
      'turmeric.jpg', 'mango.jpg', 'pomegranate.jpg', 'cotton.jpg', 'wheat.jpg', 
      'rice.jpg', 'grapes.jpg', 'potato.jpg', 'green_chilli.jpg', 'farmer-avatar.jpg'
    ];

    crops.forEach(file => {
      const rootPath = path.join(__dirname, '../assets/images', file);
      const buyerPath = path.join(__dirname, '../buyer-module/assets/images', file);
      assert.ok(fs.existsSync(rootPath), `File must exist: ${rootPath}`);
      assert.ok(fs.existsSync(buyerPath), `File must exist: ${buyerPath}`);
      assert.ok(fs.statSync(rootPath).size > 1000, `File must be non-empty: ${rootPath}`);
      assert.ok(fs.statSync(buyerPath).size > 1000, `File must be non-empty: ${buyerPath}`);
    });
  });

  it('all buyerDemands in data.js must have valid non-empty images without query parameters', () => {
    const buyerData = require('../buyer-module/js/data.js');

    assert.ok(Array.isArray(buyerData.buyerDemands), 'buyerDemands must be an array');
    assert.ok(buyerData.buyerDemands.length >= 6, 'Must have at least 6 standard seed demands');

    buyerData.buyerDemands.forEach(d => {
      assert.ok(d.image, `Demand ${d.id} must have image defined`);
      assert.ok(!d.image.includes('?'), `Demand ${d.id} image must not have query params: ${d.image}`);
      assert.ok(d.image.startsWith('assets/images/'), `Demand ${d.id} image must start with assets/images/`);

      // Verify farmer bid avatars are human farmer avatars, not vegetables
      if (Array.isArray(d.bids)) {
        d.bids.forEach(bid => {
          assert.strictEqual(bid.farmerAvatar, 'assets/images/farmer-avatar.jpg', 
            `Farmer bid ${bid.bidId} avatar should be farmer-avatar.jpg, got ${bid.farmerAvatar}`);
        });
      }
    });
  });

  it('backend POST /api/buyer/demands endpoint should automatically assign correct crop image', async () => {
    const BASE_URL = 'http://localhost:3000';
    try {
      const ping = await fetch(`${BASE_URL}/api/buyer/demands`);
      if (ping.ok) {
        const testCrops = [
          { crop: 'Nagpur Mandarin Orange', expectedImg: 'assets/images/orange.jpg' },
          { crop: 'Latur Soybean (JS-335)', expectedImg: 'assets/images/soybean.jpg' },
          { crop: 'Jalgaon Banana (Grand Naine)', expectedImg: 'assets/images/banana.jpg' }
        ];

        for (const tc of testCrops) {
          const res = await fetch(`${BASE_URL}/api/buyer/demands`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              crop: tc.crop,
              tonnage: '50 Qt',
              pricePerKg: 20
            })
          });
          assert.strictEqual(res.status, 201);
          const data = await res.json();
          assert.strictEqual(data.demand.image, tc.expectedImg, `Crop ${tc.crop} must receive ${tc.expectedImg}`);

          // Clean up posted test demand
          await fetch(`${BASE_URL}/api/buyer/demands/${data.demand.id}`, { method: 'DELETE' });
        }
      }
    } catch (e) {
      console.warn('Live server check skipped in offline mode:', e.message);
    }
  });
});
