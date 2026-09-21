const { test, describe } = require('node:test');
const assert = require('node:assert');

// 1. Farmer Module i18n
describe('Farmer Module i18n - No Word Mixing & Clean Language Switching', () => {
  const farmerI18n = require('../farmer-module/js/i18n.js');

  test('should cleanly translate composite phrases without partial word slicing', () => {
    const testCases = [
      { text: 'Overall Performance', hi: 'समग्र प्रदर्शन', mr: 'एकूण कामगिरी' },
      { text: 'Feedback Form', hi: 'प्रतिक्रिया प्रपत्र', mr: 'अभिप्राय अर्ज' },
      { text: 'Cancellation Policy', hi: 'रद्द करने की नीति', mr: 'रद्द करण्याचे धोरण' },
      { text: 'Reset All Filters', hi: 'सभी फ़िल्टर रीसेट करें', mr: 'सर्व फिल्टर्स पूर्ववत करा' },
      { text: 'Emergency Sell Desk', hi: 'आपातकालीन बिक्री डेस्क', mr: 'तातडीची विक्री डेस्क' }
    ];

    testCases.forEach(({ text, hi, mr }) => {
      const hiRes = farmerI18n.tText(text, 'hi');
      const mrRes = farmerI18n.tText(text, 'mr');
      const enResHi = farmerI18n.tText(hiRes, 'en');
      const enResMr = farmerI18n.tText(mrRes, 'en');

      // Check no partial English word fragments remain in Hindi / Marathi
      assert.ok(!/[a-zA-Z]{3,}/.test(hiRes), `Hindi for "${text}" contains English fragment: "${hiRes}"`);
      assert.ok(!/[a-zA-Z]{3,}/.test(mrRes), `Marathi for "${text}" contains English fragment: "${mrRes}"`);

      // Verify exact clean translations
      assert.strictEqual(hiRes, hi, `Hindi mismatch for ${text}`);
      assert.strictEqual(mrRes, mr, `Marathi mismatch for ${text}`);
    });
  });

  test('should handle repeated EN <-> HI <-> MR language flipping without text corruption', () => {
    const phrases = [
      'Overall Performance',
      'Feedback Form',
      'Cancellation Policy',
      'Fresh Lots Available',
      'Direct APMC Mandi Rates',
      'Dual-Key Protected'
    ];

    phrases.forEach(phrase => {
      let cur = phrase;
      for (let cycle = 0; cycle < 5; cycle++) {
        cur = farmerI18n.tText(cur, 'hi');
        assert.ok(/[\u0900-\u097F]/.test(cur), `Cycle ${cycle} HI should have Devanagari: ${cur}`);
        assert.ok(!/डेटा फीडback|के दौरानall|रद्द करेंlation/.test(cur), `Cycle ${cycle} HI corrupted: ${cur}`);

        cur = farmerI18n.tText(cur, 'mr');
        assert.ok(/[\u0900-\u097F]/.test(cur), `Cycle ${cycle} MR should have Devanagari: ${cur}`);
        assert.ok(!/डेटा फीडback|के दौरानall|रद्द करेंlation/.test(cur), `Cycle ${cycle} MR corrupted: ${cur}`);

        cur = farmerI18n.tText(cur, 'en');
        assert.ok(!/[\u0900-\u097F]/.test(cur), `Cycle ${cycle} EN should not have Devanagari: ${cur}`);
      }
    });
  });

  test('walkAndTranslateDOM should preserve sibling text nodes using textNode.__agxOrigText', () => {
    // Mock DOM environment
    const textNode1 = { nodeType: 3, nodeValue: '₹', __agxOrigText: undefined, parentElement: null };
    const textNode2 = { nodeType: 3, nodeValue: '2,500', __agxOrigText: undefined, parentElement: null };
    const textNode3 = { nodeType: 3, nodeValue: ' / Quintal', __agxOrigText: undefined, parentElement: null };

    const parentDiv = {
      nodeType: 1,
      tagName: 'DIV',
      getAttribute: () => null,
      setAttribute: () => {},
      childNodes: [textNode1, textNode2, textNode3]
    };
    textNode1.parentElement = parentDiv;
    textNode2.parentElement = parentDiv;
    textNode3.parentElement = parentDiv;

    // Simulate walkAndTranslateDOM on text nodes
    const translateNode = (node, lang) => {
      let orig = node.__agxOrigText;
      if (!orig) {
        orig = node.nodeValue;
        node.__agxOrigText = orig;
      }
      if (lang === 'en') {
        node.nodeValue = orig;
      } else {
        node.nodeValue = farmerI18n.tText(orig, lang);
      }
    };

    // Translate to Hindi
    [textNode1, textNode2, textNode3].forEach(n => translateNode(n, 'hi'));
    assert.strictEqual(textNode1.nodeValue, '₹');
    assert.strictEqual(textNode2.nodeValue, '2,500');
    assert.ok(textNode3.nodeValue.includes('क्विंटल'), `Node 3 should contain क्विंटल, got ${textNode3.nodeValue}`);

    // Flip to Marathi
    [textNode1, textNode2, textNode3].forEach(n => translateNode(n, 'mr'));
    assert.strictEqual(textNode1.nodeValue, '₹');
    assert.strictEqual(textNode2.nodeValue, '2,500');
    assert.ok(textNode3.nodeValue.includes('क्विंटल'), `Node 3 should contain क्विंटल, got ${textNode3.nodeValue}`);

    // Flip back to English
    [textNode1, textNode2, textNode3].forEach(n => translateNode(n, 'en'));
    assert.strictEqual(textNode1.nodeValue, '₹');
    assert.strictEqual(textNode2.nodeValue, '2,500');
    assert.strictEqual(textNode3.nodeValue, ' / Quintal');
  });
});

// 2. Logistics Module i18n
describe('Logistics Module i18n - No Word Mixing & Clean Language Switching', () => {
  const logisticsI18n = require('../logistics-module/js/i18n.js');

  test('should cleanly translate phrases without partial word slicing', () => {
    const testCases = [
      { text: 'Overall Performance', hi: 'समग्र प्रदर्शन', mr: 'एकूण कामगिरी' },
      { text: 'Feedback Form', hi: 'प्रतिक्रिया प्रपत्र', mr: 'अभिप्राय अर्ज' },
      { text: 'Cancellation Policy', hi: 'रद्द करने की नीति', mr: 'रद्द करण्याचे धोरण' },
      { text: 'Active Shipments', hi: 'सक्रिय शिपमेंट', mr: 'सक्रिय वाहतूक' },
      { text: 'Digital Gate Pass', hi: 'डिजिटल गेट पास', mr: 'डिजिटल गेट पास' }
    ];

    testCases.forEach(({ text, hi, mr }) => {
      const hiRes = logisticsI18n.tText(text, 'hi');
      const mrRes = logisticsI18n.tText(text, 'mr');

      assert.strictEqual(hiRes, hi, `Logistics Hindi mismatch for ${text}`);
      assert.strictEqual(mrRes, mr, `Logistics Marathi mismatch for ${text}`);
    });
  });

  test('should switch languages repeatedly without text mixing', () => {
    const text = 'Overall Performance';
    let cur = text;
    for (let i = 0; i < 4; i++) {
      cur = logisticsI18n.tText(cur, 'hi');
      assert.strictEqual(cur, 'समग्र प्रदर्शन');
      cur = logisticsI18n.tText(cur, 'mr');
      assert.strictEqual(cur, 'एकूण कामगिरी');
      cur = logisticsI18n.tText(cur, 'en');
      assert.strictEqual(cur, 'Overall Performance');
    }
  });
});

// 3. Admin Module i18n
describe('Admin Module i18n - No Word Mixing & Clean Language Switching', () => {
  const adminI18n = require('../admin-module/js/i18n.js');

  test('should translate admin phrases accurately without chopped words', () => {
    const testCases = [
      { text: 'Manage Dispatches', hi: 'डिस्पैच प्रबंधन', mr: 'वाहतूक व्यवस्थापन' },
      { text: 'State-Wide APMC Dispatch Network', hi: 'राज्यव्यापी एपीएमसी डिस्पैच नेटवर्क', mr: 'राज्यव्यापी बाजार समिती वाहतूक जाळे' },
      { text: 'Open Live Driver Console ↗', hi: 'लाइव ड्राइवर कंसोल खोलें ↗', mr: 'थेट चालक कन्सोल उघडा ↗' },
      { text: 'Gate Pass', hi: 'गेट पास', mr: 'गेट पास' },
      { text: 'Overall Performance', hi: 'समग्र प्रदर्शन', mr: 'एकूण कामगिरी' }
    ];

    testCases.forEach(({ text, hi, mr }) => {
      const hiRes = adminI18n.tText(text, 'hi');
      const mrRes = adminI18n.tText(text, 'mr');

      assert.strictEqual(hiRes, hi, `Admin Hindi mismatch for ${text}`);
      assert.strictEqual(mrRes, mr, `Admin Marathi mismatch for ${text}`);
    });
  });

  test('should handle repeated language switching without degradation', () => {
    const text = 'Manage Dispatches';
    let cur = text;
    for (let i = 0; i < 4; i++) {
      cur = adminI18n.tText(cur, 'hi');
      assert.strictEqual(cur, 'डिस्पैच प्रबंधन');
      cur = adminI18n.tText(cur, 'mr');
      assert.strictEqual(cur, 'वाहतूक व्यवस्थापन');
      cur = adminI18n.tText(cur, 'en');
      assert.strictEqual(cur, 'Manage Dispatches');
    }
  });
});

// 4. Buyer Module i18n
describe('Buyer Module i18n - Vocabulary & Translation Integrity', () => {
  const buyerI18n = require('../buyer-module/js/i18n.js');

  test('should cleanly translate crops, mandis, and terms', () => {
    assert.strictEqual(buyerI18n.tCrop('Red Onion', 'hi'), 'लाल प्याज');
    assert.strictEqual(buyerI18n.tCrop('Red Onion', 'mr'), 'लाल कांदा');
    assert.strictEqual(buyerI18n.tCrop('Hybrid Tomato', 'hi'), 'हाइब्रिड टमाटर');
    assert.strictEqual(buyerI18n.tCrop('Hybrid Tomato', 'mr'), 'संकरित टोमॅटो');
  });
});
