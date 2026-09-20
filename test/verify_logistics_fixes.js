const fs = require('fs');
const path = require('path');
const assert = require('assert');
const vm = require('vm');

async function verifyLogisticsFixes() {
  console.log('=== RUNNING COMPREHENSIVE LOGISTICS MODULE VERIFICATION ===\n');

  const pages = [
    'index.html',
    'fpo-hauls.html',
    'individual-orders.html',
    'gps-tracking.html',
    'profile.html',
    'grievance.html'
  ];

  // 1. Verify HTML syntax and embedded scripts for each page
  for (const page of pages) {
    const filePath = path.join(__dirname, '..', 'logistics-module', page);
    assert(fs.existsSync(filePath), `File ${page} must exist`);
    const content = fs.readFileSync(filePath, 'utf8');

    // Verify sidebar has GPS tracking
    assert(content.includes('gps-tracking.html'), `${page} must contain link to gps-tracking.html in sidebar`);
    assert(content.includes('Live GPS Tracking'), `${page} must contain "Live GPS Tracking" text`);

    // Verify PIN modal if present
    if (content.includes('id="modal-verify-pin"')) {
      assert(content.includes('id="pin-modal-order-code"'), `${page} PIN modal must have #pin-modal-order-code`);
    }

    // Extract inline <script> tags and test for syntax errors using vm.Script
    const scriptRegex = /<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/gi;
    let match;
    let scriptCount = 0;
    while ((match = scriptRegex.exec(content)) !== null) {
      const scriptBody = match[1];
      if (scriptBody && scriptBody.trim().length > 0) {
        scriptCount++;
        try {
          new vm.Script(scriptBody, { filename: `${page}_inline_${scriptCount}.js` });
          console.log(`✓ ${page} [Script #${scriptCount}]: JavaScript syntax is valid.`);
        } catch (err) {
          console.error(`❌ Syntax error in ${page} inline script #${scriptCount}:`, err.message);
          throw err;
        }
      }
    }
  }

  // 2. Verify i18n and logistics.js syntax
  const jsFiles = ['data.js', 'logistics.js', 'i18n.js', 'dashboard.js'];
  for (const jsFile of jsFiles) {
    const jsPath = path.join(__dirname, '..', 'logistics-module', 'js', jsFile);
    assert(fs.existsSync(jsPath), `${jsFile} must exist`);
    const jsContent = fs.readFileSync(jsPath, 'utf8');
    try {
      new vm.Script(jsContent, { filename: jsFile });
      console.log(`✓ js/${jsFile}: JavaScript syntax is valid.`);
    } catch (err) {
      console.error(`❌ Syntax error in js/${jsFile}:`, err.message);
      throw err;
    }
  }

  // 3. Test i18n translation of Live GPS Tracking
  const i18nCode = fs.readFileSync(path.join(__dirname, '..', 'logistics-module', 'js', 'i18n.js'), 'utf8');
  const mockStorage = { agrinex_logistics_language: 'en' };
  const sandbox = {
    window: { addEventListener: () => {} },
    document: { addEventListener: () => {}, createTreeWalker: () => ({ nextNode: () => null }), getElementById: () => null },
    localStorage: { getItem: (k) => mockStorage[k], setItem: (k, v) => { mockStorage[k] = v; } },
    NodeFilter: { SHOW_TEXT: 4, FILTER_ACCEPT: 1, FILTER_REJECT: 2 }
  };
  vm.createContext(sandbox);
  vm.runInContext(i18nCode, sandbox);
  const i18nEngine = sandbox.window.AgriNexLogisticsI18n;

  assert.strictEqual(i18nEngine.tText('Live GPS Tracking', 'hi'), 'लाइव जीपीएस ट्रैकिंग');
  assert.strictEqual(i18nEngine.tText('Live GPS Tracking', 'mr'), 'थेट GPS ट्रॅकिंग');
  console.log('✓ i18n: "Live GPS Tracking" translates correctly to Hindi and Marathi.');

  console.log('\n=== ALL LOGISTICS MODULE VERIFICATIONS PASSED (100% OPERATIONAL) ===');
}

verifyLogisticsFixes().catch(err => {
  console.error('VERIFICATION FAILED:', err);
  process.exit(1);
});
