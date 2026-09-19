const fs = require('fs');
const path = require('path');
const assert = require('assert');

async function testLogisticsMultilingual() {
  console.log('=== VERIFYING LOGISTICS & TRANSIT MULTILINGUAL (EN, HI, MR) ===\n');

  const pages = [
    'index.html',
    'fpo-hauls.html',
    'individual-orders.html',
    'gps-tracking.html',
    'grievance.html',
    'profile.html'
  ];

  // 1. Check file existence & markup in all 6 HTML pages
  for (const page of pages) {
    const fullPath = path.join(__dirname, '..', 'logistics-module', page);
    assert(fs.existsSync(fullPath), `Page ${page} must exist`);
    const content = fs.readFileSync(fullPath, 'utf8');

    assert(content.includes('id="btn-language-selector"'), `${page} must include #btn-language-selector`);
    assert(content.includes('id="language-dropdown-menu"'), `${page} must include #language-dropdown-menu`);
    assert(content.includes('setLogisticsLanguage(\'hi\')'), `${page} must include Hindi option`);
    assert(content.includes('setLogisticsLanguage(\'mr\')'), `${page} must include Marathi option`);
    assert(content.includes('js/i18n.js'), `${page} must load js/i18n.js`);
    console.log(`✓ ${page}: Language dropdown and i18n script verified.`);
  }

  // 2. Check HTTP 200 live server responses
  for (const page of pages) {
    const url = `http://localhost:3000/logistics-module/${page}`;
    const res = await fetch(url);
    assert.strictEqual(res.status, 200, `Expected 200 OK from ${url}, got ${res.status}`);
    console.log(`✓ HTTP 200 OK: ${url}`);
  }

  // 3. Test i18n engine logic in Node.js
  const i18nCode = fs.readFileSync(path.join(__dirname, '..', 'logistics-module', 'js', 'i18n.js'), 'utf8');
  
  // Create mock environment
  const mockStorage = { agrinex_logistics_language: 'en' };
  const mockWindow = {
    addEventListener: () => {}
  };
  const mockDocument = {
    addEventListener: () => {},
    createTreeWalker: () => ({ nextNode: () => null }),
    getElementById: (id) => ({
      innerHTML: '',
      style: {},
      querySelector: () => ({ style: {} })
    })
  };

  const sandbox = {
    window: mockWindow,
    document: mockDocument,
    localStorage: {
      getItem: (k) => mockStorage[k],
      setItem: (k, v) => { mockStorage[k] = v; }
    },
    NodeFilter: { SHOW_TEXT: 4, FILTER_ACCEPT: 1, FILTER_REJECT: 2 }
  };

  const vm = require('vm');
  vm.createContext(sandbox);
  vm.runInContext(i18nCode, sandbox);

  const t = sandbox.window.AgriNexLogisticsI18n;
  assert(t, 'AgriNexLogisticsI18n must be exported to window');

  // Test translations
  const testPhrases = [
    { en: 'Dashboard', hi: 'डैशबोर्ड', mr: 'डॅशबोर्ड' },
    { en: 'Bulk FPO Hauls', hi: 'थोक एफपीओ ढुलाई', mr: 'घाऊक एफपीओ वाहतूक' },
    { en: 'Express Orders', hi: 'एक्सप्रेस ऑर्डर', mr: 'एक्स्प्रेस ऑर्डर्स' },
    { en: 'Connected Trucks', hi: 'कनेक्टेड ट्रक', mr: 'जोडलेले ट्रक्स' },
    { en: 'Trips In Transit', hi: 'मार्ग में ट्रिप', mr: 'मार्गावरील ट्रिप्स' },
    { en: 'Grievance Module', hi: 'शिकायत निवारण', mr: 'तक्रार निवारण' },
    { en: 'Red Onion (Nashik Export Grade)', hi: 'लाल प्याज (नासिक निर्यात ग्रेड)', mr: 'लाल कांदा (नाशिक निर्यात प्रत)' },
    { en: 'Tata 407 High-Deck Cold-Chain Reefer', hi: 'टाटा 407 हाई-डेक कोल्ड-चेन रीफर', mr: 'टाटा ४०७ हाय-डेक शीतगृह रीफर' },
    { en: 'Kasara Ghat Highway Bypass, NH-160, MH', hi: 'कसारा घाट हाईवे बाईपास, NH-160, महाराष्ट्र', mr: 'कसारा घाट महामार्ग बायपास, NH-१६०, महाराष्ट्र' },
    { en: 'Ask the buyer receiving manager for their 4-digit PIN to confirm delivery and receive your freight payout.',
      hi: 'डिलीवरी की पुष्टि करने और अपना मालभाड़ा एस्क्रो भुगतान तुरंत प्राप्त करने के लिए खरीदार रिसीविंग मैनेजर से उनका 4-अंकीय पिन मांगें।',
      mr: 'माल पोहोचल्याची खात्री करण्यासाठी आणि आपले वाहतूक भाडे लगेच खात्यात जमा करण्यासाठी खरेदीदार व्यवस्थापकाकडून ४-अंकी पिन घ्या.' }
  ];

  console.log('\n--- Testing Translation Accuracy ---');
  for (const item of testPhrases) {
    const hiResult = t.tText(item.en, 'hi');
    const mrResult = t.tText(item.en, 'mr');

    assert.strictEqual(hiResult, item.hi, `Hindi translation failed for "${item.en}". Got: "${hiResult}"`);
    assert.strictEqual(mrResult, item.mr, `Marathi translation failed for "${item.en}". Got: "${mrResult}"`);
    console.log(`✓ [${item.en}] \n    HI: ${hiResult}\n    MR: ${mrResult}`);
  }

  console.log('\n=== ALL MULTILINGUAL VERIFICATIONS PASSED SUCCESSFULLY ===');
}

testLogisticsMultilingual().catch(err => {
  console.error('FAILED:', err);
  process.exit(1);
});
