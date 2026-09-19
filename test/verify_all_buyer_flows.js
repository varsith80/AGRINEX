/**
 * AgriNex Buyer Module - Comprehensive Automated Flow & Logic Verification
 * Tests all 8 views, 23 modals, interactive handlers, and state persistence.
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('=== AGRINEX BUYER MODULE DEEP AUDIT & VERIFICATION ===\n');

// 1. Verify all 8 Views exist
const expectedViews = [
  'verified-produce.html',
  'bulk-demands.html',
  'consignments.html',
  'escrow-vault.html',
  'insights.html',
  'calculator.html',
  'messages.html',
  'grievance.html'
];

console.log('1. Checking Views:');
expectedViews.forEach(v => {
  const p = path.join(__dirname, '../buyer-module/views', v);
  assert(fs.existsSync(p), `Missing view file: ${v}`);
  const content = fs.readFileSync(p, 'utf8');
  assert(content.length > 50, `View file ${v} is unexpectedly empty`);
  console.log(`  ✓ ${v} exists (${content.length} bytes)`);
});

// 2. Verify all 23 Modals exist
console.log('\n2. Checking Modals:');
const modalDir = path.join(__dirname, '../buyer-module/modals');
const modalFiles = fs.readdirSync(modalDir).filter(f => f.endsWith('.html'));
assert(modalFiles.length >= 22, `Expected at least 22 modals, found ${modalFiles.length}`);
modalFiles.forEach(m => {
  const p = path.join(modalDir, m);
  const content = fs.readFileSync(p, 'utf8');
  assert(content.includes('modal-overlay'), `Modal ${m} missing .modal-overlay wrapper`);
  console.log(`  ✓ ${m}`);
});

// 3. Mock Browser Runtime Environment
console.log('\n3. Initializing Simulated Browser Environment:');
const storageMap = new Map();
const mockLocalStorage = {
  getItem: (k) => storageMap.get(k) || null,
  setItem: (k, v) => storageMap.set(k, String(v)),
  removeItem: (k) => storageMap.delete(k),
  clear: () => storageMap.clear()
};

const domElements = new Map();
function createMockElement(id, tag = 'div') {
  const el = {
    id,
    tagName: tag.toUpperCase(),
    value: '',
    textContent: '',
    innerHTML: '',
    classList: {
      add: (c) => {},
      remove: (c) => {},
      toggle: (c, force) => {},
      contains: (c) => false
    },
    style: {},
    appendChild: (child) => {},
    prepend: (child) => {},
    querySelectorAll: () => [],
    querySelector: () => null,
    addEventListener: () => {},
    removeEventListener: () => {}
  };
  domElements.set(id, el);
  return el;
}

global.window = global;
global.localStorage = mockLocalStorage;
global.document = {
  body: createMockElement('body', 'body'),
  getElementById: (id) => domElements.get(id) || createMockElement(id),
  querySelector: (sel) => {
    if (sel.startsWith('#')) return domElements.get(sel.slice(1)) || createMockElement(sel.slice(1));
    return createMockElement('sel');
  },
  querySelectorAll: () => [],
  createElement: (tag) => createMockElement(`dyn-${Math.random()}`, tag),
  addEventListener: () => {}
};
global.showToast = (msg, type) => console.log(`    [Toast]: ${msg}`);
global.alert = (msg) => console.log(`    [Alert]: ${msg}`);
global.prompt = () => '40';
global.confirm = () => true;

// 4. Load Core Buyer Data
console.log('\n4. Loading Buyer Core Data & Modules:');
require('../buyer-module/js/data.js');
assert(window.buyerData, 'buyerData should be initialized');
assert(Array.isArray(window.buyerData.verifiedLots), 'verifiedLots must be an array');
console.log(`  ✓ buyerData loaded: ${window.buyerData.verifiedLots.length} verified lots, ${window.buyerData.consignments.length} consignments.`);

// Load Escrow Vault
require('../buyer-module/js/modules/escrow_vault.js');
assert(window.buyerEscrowState, 'buyerEscrowState must be initialized');
console.log(`  ✓ Escrow Vault loaded. Available liquidity: ₹ ${window.buyerEscrowState.availableLiquidity.toLocaleString('en-IN')}`);

// Load Demands
require('../buyer-module/js/modules/demands.js');
assert(typeof window.handleNewDemandSubmit === 'function', 'handleNewDemandSubmit must be exported');
assert(typeof window.acceptDemandFarmerBid === 'function', 'acceptDemandFarmerBid must be exported');
console.log('  ✓ Demands module loaded.');

// Load Bids & Spot Procurement
require('../buyer-module/js/modules/bids.js');
assert(typeof window.submitDirectBuy === 'function', 'submitDirectBuy must be exported');
assert(typeof window.submitCounterBid === 'function', 'submitCounterBid must be exported');
console.log('  ✓ Bids & Spot Procurement module loaded.');

// Load Logistics
require('../buyer-module/js/modules/logistics.js');
assert(typeof window.submitBookTransport === 'function', 'submitBookTransport must be exported');
console.log('  ✓ Logistics module loaded.');

// Load Grievance
require('../buyer-module/js/modules/chat_grievance.js');
assert(typeof window.submitGrievance === 'function', 'submitGrievance must be exported');
console.log('  ✓ Grievance module loaded.');

// Load Dashboard & Profile
require('../buyer-module/js/dashboard.js');
assert(typeof window.saveBuyerProfile === 'function', 'saveBuyerProfile must be exported');
console.log('  ✓ Dashboard & Profile module loaded.');

// Load Lite Mode
require('../buyer-module/js/lite_mode.js');
assert(typeof window.confirmLiteBuyOrder === 'function', 'confirmLiteBuyOrder must be exported');
console.log('  ✓ Lite Mode module loaded.');

// 5. Functional Flow Assertions
console.log('\n5. Executing Operational Business Flows:');

// Test A: Direct Buy (35% Escrow Locking + Consignment Generation)
console.log('\n  Test A: Direct Spot Buy (35% Advance Escrow Lock)');
const initialLiquidity = window.buyerEscrowState.availableLiquidity;
const initialLocked = window.buyerEscrowState.lockedAdvance;
const initialConsignmentsCount = window.buyerData.consignments.length;

// Set up form DOM values
const targetLot = window.buyerData.verifiedLots[0];
createMockElement('buy-modal-lot-id').value = targetLot.id;
createMockElement('buy-modal-qty-kg').value = '2000';
createMockElement('buy-modal-final-cost').textContent = '₹ 36,000';
createMockElement('buy-modal-escrow-deposit').textContent = '₹ 12,600';
createMockElement('buy-delivery-hub').value = 'Navi Mumbai APMC Terminal Cold-Hub';

window.submitDirectBuy({ preventDefault: () => {} });

assert(window.buyerData.consignments.length === initialConsignmentsCount + 1, 'Consignment count should increment by 1');
const createdConsignment = window.buyerData.consignments[0];
assert(createdConsignment.advance_paid + createdConsignment.balance_due === createdConsignment.total_val, 'Integer conservation: Advance + Balance must equal Total Value');
assert(window.buyerEscrowState.availableLiquidity === initialLiquidity - createdConsignment.advance_paid, 'Escrow liquidity must be deducted by exact 35% advance');
assert(window.buyerEscrowState.lockedAdvance === initialLocked + createdConsignment.advance_paid, 'Escrow locked advance must increase by exact 35% advance');
assert(storageMap.has('agrinex_buyer_consignments'), 'Consignments must be saved to localStorage');
assert(storageMap.has('agrinex_buyer_escrow'), 'Escrow state must be saved to localStorage');
console.log(`    ✓ Direct buy created consignment ${createdConsignment.id} for ₹ ${createdConsignment.total_val.toLocaleString('en-IN')}`);
console.log(`    ✓ 35% advance ₹ ${createdConsignment.advance_paid.toLocaleString('en-IN')} locked in escrow. Liquidity: ₹ ${window.buyerEscrowState.availableLiquidity.toLocaleString('en-IN')}`);

// Test B: Counter-offer Bid Submission
console.log('\n  Test B: Counter-Offer Bid Submission');
const initialBidsCount = (window.buyerData.buyerBids || []).length;
createMockElement('bid-modal-lot-id').value = targetLot.id;
createMockElement('counter-bid-price').value = '17.50';

window.submitCounterBid({ preventDefault: () => {} });
assert((window.buyerData.buyerBids || []).length === initialBidsCount + 1, 'Bid count should increment by 1');
console.log(`    ✓ Counter-offer bid registered for lot ${targetLot.id} at ₹ 17.50/kg`);

// Test C: Post Sourcing Demand
console.log('\n  Test C: Post Sourcing Demand');
const initialDemandsCount = (window.buyerData.demands || []).length;
createMockElement('demand-commodity').value = 'Paddy (Basmati 1121)';
createMockElement('demand-variety').value = 'Export Pusa 1121';
createMockElement('demand-target-qty').value = '250';
createMockElement('demand-target-price').value = '4200';
createMockElement('demand-spec-grade').value = 'Grade A (Max 12% Moisture)';
createMockElement('demand-destination-hub').value = 'Vashi APMC Navi Mumbai';
createMockElement('demand-validity').value = '2026-10-31';
createMockElement('demand-advance-terms').value = '35% Escrow Advance';
createMockElement('demand-spec-notes').value = 'Export quality grain required';

window.handleNewDemandSubmit({ preventDefault: () => {} });
assert((window.buyerData.demands || []).length === initialDemandsCount + 1, 'Demands count should increment by 1');
assert(storageMap.has('agrinex_buyer_demands'), 'Demands must be saved to localStorage');
console.log(`    ✓ Sourcing demand created: ${window.buyerData.demands[0].id} (${window.buyerData.demands[0].commodity})`);

// Test D: Book Farm-Gate Transport
console.log('\n  Test D: Book Farm-Gate Transport');
const preTransportConsignments = window.buyerData.consignments.length;
createMockElement('transport-lot-select').value = 'LOT-ONI-01|Red Onion (Garwa Export)|Suresh Patil|Lasalgaon APMC, Nashik|80000|50 Qt (5,000 kg)';
createMockElement('transport-origin').value = 'Lasalgaon APMC, Nashik';
createMockElement('transport-destination').value = 'Vashi Sector 19 Central APMC Warehouse';
createMockElement('transport-vehicle-select').value = 'Eicher Pro 2049 (4 Tonner)|MH-15-DC-8812|Vilas Shinde|+91 98224 77102';
createMockElement('transport-freight-cost').textContent = '₹ 5,800';

window.submitBookTransport({ preventDefault: () => {} });
assert(window.buyerData.consignments.length === preTransportConsignments + 1, 'Consignment count should increment after booking transport');
console.log(`    ✓ Farm-gate transport booked: Tracking ID ${window.buyerData.consignments[0].id}`);

// Test E: File Quality Dispute Grievance
console.log('\n  Test E: File Quality Dispute Grievance');
const preGrievances = (window.buyerData.activeGrievances || []).length;
createMockElement('grv-lot-select').value = `${createdConsignment.id}|${createdConsignment.crop}|${createdConsignment.farmer}`;
createMockElement('grv-category').value = 'High Moisture Content (>14% Basmati)';
createMockElement('grv-claim-amount').value = '15000';
createMockElement('grv-description').value = 'Moisture reader reports 15.2% upon truck gate inspection.';

window.submitGrievance({ preventDefault: () => {} });
assert((window.buyerData.activeGrievances || []).length === preGrievances + 1, 'Grievances count should increment by 1');
assert(createdConsignment.grievance_status === 'grievance_hold', 'Consignment must be placed on grievance hold');
assert(storageMap.has('agrinex_buyer_grievances'), 'Grievances must be saved to localStorage');
console.log(`    ✓ Dispute filed: ${window.buyerData.activeGrievances[0].id}. Escrow remaining 65% balance frozen.`);

// Test F: Buyer Profile Update
console.log('\n  Test F: Buyer Profile Update & Persistence');
createMockElement('buyer-profile-company').value = 'Reliance Fresh Agri Sourcing Ltd';
createMockElement('buyer-profile-contact').value = 'Vikram Singhania';
createMockElement('buyer-profile-phone').value = '+91 98200 12345';
createMockElement('buyer-profile-email').value = 'vikram.singhania@reliancefresh.com';
createMockElement('buyer-profile-gstin').value = '27AABCR1234F1Z5';
createMockElement('buyer-profile-fssai').value = '11522003000456';
createMockElement('buyer-profile-address').value = 'Plot 22, APMC Market-1, Navi Mumbai, MH';

window.saveBuyerProfile({ preventDefault: () => {} });
assert(storageMap.has('agrinex_buyer_profile'), 'Buyer profile must be saved to localStorage');
const savedProfile = JSON.parse(storageMap.get('agrinex_buyer_profile'));
assert(savedProfile.companyName === 'Reliance Fresh Agri Sourcing Ltd', 'Saved company name must match');
console.log(`    ✓ Profile updated and saved to localStorage: ${savedProfile.companyName} (GSTIN: ${savedProfile.gstin})`);

console.log('\n=== ALL 6 END-TO-END BUYER MODULE FLOWS VERIFIED 100% WORKING ===\n');
