const fs = require('fs');
const path = require('path');
const assert = require('assert');

const farmerI18n = require(path.resolve('farmer-module/js/i18n.js'));
const logisticsI18n = require(path.resolve('logistics-module/js/i18n.js'));
const adminI18n = require(path.resolve('admin-module/js/i18n.js'));
const buyerI18n = require(path.resolve('buyer-module/js/i18n.js'));

const allowedWords = new Set([
  'APMC', 'MSAMB', 'MSWC', 'UPI', 'IFSC', 'HDFC', 'GSTIN', 'FPO', 'IoT', 'GPS',
  'ETA', 'SMS', 'PDF', 'NAFPO', 'PIN', 'kg', 'Qt', 'MT', 'AI', 'QR', 'ID', 'FASTag',
  'AgriNex', 'AGRINEX', 'AGRIFLEX', 'RTGS', 'POD', 'GIS', 'IVR', 'NSDL', 'NPOP',
  'NABL', 'IAS', 'QC', 'QA', 'DC', 'PO', 'IV', 'PM', 'AM', 'Marathi', 'Hindi',
  'English', 'Ctrl', 'GP'
]);

function validateModule(name, dir, translateFn) {
  console.log(`\n========================================`);
  console.log(`Validating Module: ${name.toUpperCase()}`);
  console.log(`========================================`);

  const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
  const allStrings = new Set();

  htmlFiles.forEach(file => {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    // Extract text nodes
    const matches = content.match(/>([^<>{}\n\r\t]+)</g) || [];
    matches.forEach(m => {
      let t = m.slice(1, -1).trim().replace(/\s+/g, ' ');
      if (t.length >= 2 && /[a-zA-Z]/.test(t) && !t.startsWith('http') && !t.includes('function(') && !t.includes('var ') && !t.includes('const ') && !t.includes('let ') && !t.includes('return ')) {
        t = t.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&nbsp;/g, ' ').replace(/&rarr;/g, '→').replace(/&larr;/g, '←');
        if (!/^[0-9.,₹$%+\-\/:#\s]+$/.test(t)) {
          allStrings.add(t);
        }
      }
    });

    // Extract placeholders and titles
    const phMatches = content.match(/placeholder=["']([^"']+)["']/g) || [];
    phMatches.forEach(m => {
      let t = m.replace(/placeholder=["']/, '').slice(0, -1).trim();
      if (t.length >= 2 && /[a-zA-Z]/.test(t)) allStrings.add(t);
    });
    const titleMatches = content.match(/title=["']([^"']+)["']/g) || [];
    titleMatches.forEach(m => {
      let t = m.replace(/title=["']/, '').slice(0, -1).trim();
      if (t.length >= 2 && /[a-zA-Z]/.test(t)) allStrings.add(t);
    });
  });

  console.log(`Extracted ${allStrings.size} unique UI text strings from ${htmlFiles.length} HTML files.`);

  let mixedCountHI = 0;
  let mixedCountMR = 0;
  const mixedList = [];

  allStrings.forEach(s => {
    ['hi', 'mr'].forEach(lang => {
      const trans = translateFn(s, lang);
      if (!trans || !/[\u0900-\u097F]/.test(trans)) return;
      const eng = (trans.match(/\b[a-zA-Z]{2,}\b/g) || []).filter(w => !allowedWords.has(w));
      if (eng.length > 0) {
        if (lang === 'hi') mixedCountHI++;
        if (lang === 'mr') mixedCountMR++;
        mixedList.push({ original: s, lang, translated: trans, engWords: eng });
      }
    });
  });

  console.log(`Mixed words in Hindi: ${mixedCountHI}`);
  console.log(`Mixed words in Marathi: ${mixedCountMR}`);

  if (mixedList.length > 0) {
    console.log(`Found ${mixedList.length} mixed occurrences:`);
    mixedList.slice(0, 10).forEach(x => {
      console.log(`  [${x.lang.toUpperCase()}] "${x.original}" -> "${x.translated}" (words: ${x.engWords.join(', ')})`);
    });
  } else {
    console.log(`PASS: ZERO mixed language words detected in ${name} module!`);
  }

  return mixedList;
}

// 1. Validate Farmer
const farmerMixed = validateModule('Farmer', 'farmer-module', (str, lang) => farmerI18n.tText(str, lang));

// 2. Validate Logistics
const logisticsMixed = validateModule('Logistics', 'logistics-module', (str, lang) => logisticsI18n.tText(str, lang));

// 3. Validate Admin
const adminMixed = validateModule('Admin', 'admin-module', (str, lang) => adminI18n.tText(str, lang));

// 4. Validate Buyer
const buyerMixed = validateModule('Buyer', 'buyer-module', (str, lang) => {
  buyerI18n.setBuyerLanguage(lang);
  return buyerI18n.tText(str);
});

console.log(`\n========================================`);
console.log(`FINAL SUMMARY OF MIXED WORDS:`);
console.log(`Farmer mixed: ${farmerMixed.length}`);
console.log(`Logistics mixed: ${logisticsMixed.length}`);
console.log(`Admin mixed: ${adminMixed.length}`);
console.log(`Buyer mixed: ${buyerMixed.length}`);
console.log(`Total across ALL modules: ${farmerMixed.length + logisticsMixed.length + adminMixed.length + buyerMixed.length}`);
console.log(`========================================\n`);

assert.strictEqual(farmerMixed.length, 0, `Farmer has ${farmerMixed.length} mixed strings!`);
assert.strictEqual(logisticsMixed.length, 0, `Logistics has ${logisticsMixed.length} mixed strings!`);
assert.strictEqual(adminMixed.length, 0, `Admin has ${adminMixed.length} mixed strings!`);
assert.strictEqual(buyerMixed.length, 0, `Buyer has ${buyerMixed.length} mixed strings!`);

console.log('ALL MODULE VALIDATION CHECKS PASSED WITH 0 MIXED STRINGS!');
