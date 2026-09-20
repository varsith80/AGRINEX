const { describe, it, before } = require('node:test');
const assert = require('node:assert');
const path = require('node:path');

// Simulate DOM environment for testing chat module with i18n
global.document = {
  getElementById: (id) => {
    if (id === 'chat-input-field') {
      return {
        value: '',
        focus: () => {}
      };
    }
    return null;
  },
  querySelectorAll: () => [],
  addEventListener: () => {}
};

global.window = global;

const i18n = require(path.join(__dirname, '../buyer-module/js/i18n.js'));

describe('AgriNex Chat & Direct Negotiation Multilingual System', () => {
  it('should translate preset farmer messages naturally into Marathi (mr)', () => {
    i18n.setBuyerLanguage('mr');
    const englishMsg = "Namaste Karthik sir! I have 10,000 kg export-graded Garwa red onions cured and ready at Lasalgaon APMC yard.";
    const marathiMsg = i18n.tText(englishMsg);

    assert.ok(marathiMsg.includes('लासलगाव'), 'Should contain Marathi mandi translation');
    assert.ok(marathiMsg.includes('१०,००० किलो') || marathiMsg.includes('गरवा लाल कांदा'), 'Should contain Marathi crop/quantity translation');
    assert.ok(!marathiMsg.includes('export-graded'), 'Should not leave English compound terms untranslated');
  });

  it('should translate preset farmer messages naturally into Hindi (hi)', () => {
    i18n.setBuyerLanguage('hi');
    const englishMsg = "Namaste Karthik sir! I have 10,000 kg export-graded Garwa red onions cured and ready at Lasalgaon APMC yard.";
    const hindiMsg = i18n.tText(englishMsg);

    assert.ok(hindiMsg.includes('लासलगांव'), 'Should contain Hindi mandi translation');
    assert.ok(hindiMsg.includes('10,000') || hindiMsg.includes('प्याज'), 'Should contain Hindi produce terms');
  });

  it('should translate quick chat chip messages for insertion', () => {
    i18n.setBuyerLanguage('mr');
    const chipText = "Please share electronic weighbridge slip and moisture report.";
    const mrChip = i18n.tText(chipText);
    assert.ok(mrChip.includes('इलेक्ट्रॉनिक वजन पावती') || mrChip.includes('आर्द्रता'), 'Should translate quick chip to Marathi');

    i18n.setBuyerLanguage('hi');
    const hiChip = i18n.tText(chipText);
    assert.ok(hiChip.includes('इलेक्ट्रॉनिक') || hiChip.includes('पर्ची') || hiChip.includes('नमी'), 'Should translate quick chip to Hindi');
  });

  it('should translate Active Offer and Lock Escrow Rate strings', () => {
    i18n.setBuyerLanguage('mr');
    const lockText = "Lock 35% Escrow (₹ 18.00/kg)";
    const mrLock = i18n.tText(lockText);
    assert.ok(mrLock.includes('३५% एस्क्रो') || mrLock.includes('सुरक्षित करा') || mrLock.includes('/किलो'), 'Should translate lock escrow string in Marathi');

    i18n.setBuyerLanguage('hi');
    const hiLock = i18n.tText(lockText);
    assert.ok(hiLock.includes('35% एस्क्रो') || hiLock.includes('लॉक करें') || hiLock.includes('/किग्रा'), 'Should translate lock escrow string in Hindi');
  });
});
