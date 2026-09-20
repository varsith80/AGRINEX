const { describe, it } = require('node:test');
const assert = require('node:assert');
const i18n = require('../buyer-module/js/i18n.js');

describe('AgriNex i18n - Instant Translation & Reliability Check', () => {
  it('should translate phrases consistently without alternating or getting stuck on lastIndex', () => {
    i18n.setBuyerLanguage('hi');

    // Run tText multiple consecutive times on the same phrase
    const phrase = 'MSAMB Fast-Track Dispute Tribunal Arbitration';
    const first = i18n.tText(phrase);
    const second = i18n.tText(phrase);
    const third = i18n.tText(phrase);
    const fourth = i18n.tText(phrase);

    assert.ok(first.includes('न्यायाधिकरण'), `First pass should translate: ${first}`);
    assert.strictEqual(second, first, 'Second pass should match first pass');
    assert.strictEqual(third, first, 'Third pass should match first pass');
    assert.strictEqual(fourth, first, 'Fourth pass should match first pass');
  });

  it('should switch smoothly between Hindi and Marathi repeatedly without lag or state leakage', () => {
    const text = 'Lasalgaon APMC (Nashik)';

    i18n.setBuyerLanguage('hi');
    const hiText = i18n.tText(text);
    assert.ok(hiText.includes('लासलगांव'), `Hindi translation expected: ${hiText}`);

    i18n.setBuyerLanguage('mr');
    const mrText = i18n.tText(text);
    assert.ok(mrText.includes('लासलगाव'), `Marathi translation expected: ${mrText}`);

    i18n.setBuyerLanguage('hi');
    const hiAgain = i18n.tText(text);
    assert.strictEqual(hiAgain, hiText, 'Switching back to Hindi should match exactly');

    i18n.setBuyerLanguage('en');
    assert.strictEqual(i18n.getBuyerLanguage(), 'en');
  });
});
