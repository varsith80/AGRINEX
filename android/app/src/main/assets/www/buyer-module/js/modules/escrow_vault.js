/**
 * AgriNex Buyer Module - Escrow Vault & Financial Clearinghouse
 * Handles nodal escrow balances, milestone contracts, audit ledger, and digital deeds.
 */

function renderBuyerEscrowVault() {
  const consignments = (buyerData && buyerData.consignments) ? buyerData.consignments : [];
  const payments = (buyerData && buyerData.payments) ? buyerData.payments : [];

  const activeContractsCount = consignments.filter(c => c.status !== 'completed' && c.status !== 'delivered').length;
  const totalCommitted = consignments.reduce((sum, c) => sum + (c.total_val || 0), 0);
  const totalAdvance = consignments.reduce((sum, c) => sum + (c.adv_paid || Math.round((c.total_val || 0) * 0.35)), 0);
  const totalBalance = consignments.filter(c => c.status !== 'completed' && c.status !== 'delivered').reduce((sum, c) => sum + (c.balance_due || Math.round((c.total_val || 0) * 0.65)), 0);
  
  let walletBal = 150000;
  try {
    const savedBal = localStorage.getItem('agrinex_escrow_wallet_balance');
    if (savedBal !== null) walletBal = parseFloat(savedBal) || 0;
  } catch(e) {}

  const countEl = document.getElementById('vault-contracts-count');
  const committedEl = document.getElementById('vault-committed-pool');
  const advEl = document.getElementById('vault-advance-locked');
  const balEl = document.getElementById('vault-delivery-hold');
  const tracksEl = document.getElementById('vault-tracks-count');
  const walletEl = document.getElementById('escrow-liquid-reserves');
  const railWalletBalEl = document.getElementById('gateway-rail-wallet-bal');
  const walletDisplayBalEl = document.getElementById('gateway-wallet-display-bal');

  if (countEl) countEl.textContent = `${activeContractsCount} Orders`;
  if (committedEl) committedEl.textContent = `₹ ${totalCommitted.toLocaleString('en-IN')}`;
  if (advEl) advEl.textContent = `₹ ${totalAdvance.toLocaleString('en-IN')}`;
  if (balEl) balEl.textContent = `₹ ${totalBalance.toLocaleString('en-IN')}`;
  if (walletEl) walletEl.textContent = `₹ ${walletBal.toLocaleString('en-IN')}`;
  if (tracksEl) tracksEl.textContent = `${activeContractsCount} Active Milestone Tracks`;
  if (railWalletBalEl) railWalletBalEl.textContent = `Bal: ₹ ${walletBal.toLocaleString('en-IN')}`;
  if (walletDisplayBalEl) walletDisplayBalEl.textContent = `₹ ${walletBal.toLocaleString('en-IN')}`;

  // Render Escrow Contract Cards dynamically
  const escrowContainer = document.getElementById('vault-escrow-cards-container');
  if (escrowContainer && consignments.length > 0) {
    const tr = (txt) => (window.tText ? window.tText(txt) : txt);
    const tCrop = (c) => (window.tCrop ? window.tCrop(c) : c);

    escrowContainer.innerHTML = consignments.map((c, idx) => {
      const isDelivered = c.status === 'delivered' || c.status === 'completed';
      const contractId = c.contract_no || `ESC-MH-${9920 + idx}`;
      const cardId = `escrow-card-${c.tracking_id || idx}`;
      const totalAmt = c.total_val || (c.quantity_kg ? c.quantity_kg * 18 : 100000);
      const advAmt = c.adv_paid || Math.round(totalAmt * 0.35);
      const balAmt = c.balance_due !== undefined ? c.balance_due : (totalAmt - advAmt);
      const kgPrice = c.quantity_kg ? (totalAmt / c.quantity_kg).toFixed(2) : '18.00';

      return `
        <div class="vault-contract-card" id="${cardId}" style="margin-bottom: 20px; border: 1.5px solid ${isDelivered ? '#e2e8f0' : '#86efac'};">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; flex-wrap: wrap; gap: 12px;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <strong style="font-size: 1.02rem; color: #0f172a; font-weight: 800;">Contract #${contractId} • ${tCrop(c.crop)}</strong>
                <span class="badge badge-grade-a">Grade A</span>
                ${c.isEmergency ? `<span class="badge badge-status-emergency" style="background:#fee2e2; color:#991b1b; font-weight:800;">⚡ Salvage Buyout</span>` : ''}
              </div>
              <div style="font-size: 0.8rem; color: #64748b; margin-top: 3px;">
                Farmer: <strong style="color: #0f172a;">${c.farmer || 'Farmer Partner'}</strong> (${c.farmer_origin || 'Maharashtra'}) • Total Escrow: <strong style="color: #0c5a36; font-weight: 800;">₹ ${totalAmt.toLocaleString('en-IN')}</strong> (₹ ${kgPrice}/kg)
              </div>
            </div>
            <div style="display: flex; align-items: center; gap: 10px;">
              <span class="badge" id="escrow-status-badge-${idx + 1}" style="background: ${isDelivered ? '#15803d' : '#e8f5ed'}; color: ${isDelivered ? '#ffffff' : '#0c5a36'}; border: 1px solid ${isDelivered ? '#15803d' : '#bbf7d0'}; font-weight: 800; padding: 4px 10px;">
                ${isDelivered ? '✓ ' + tr('100% Settled & Released') : `35% Locked (₹ ${advAmt.toLocaleString('en-IN')})`}
              </span>
              <button class="btn btn-outline btn-sm" onclick="openPaymentReceiptModal('${c.tracking_id || contractId}')" style="font-size: 0.78rem; font-weight: 700; border-radius: 8px;">📄 View Payment Deed</button>
            </div>
          </div>

          <!-- Stepper -->
          <div class="stepper-container" style="max-width: 720px; margin: 18px 0;">
            <div class="stepper-step">
              <div class="stepper-dot active">✓</div>
              <span class="stepper-label">Contract Created</span>
            </div>
            <div class="stepper-step">
              <div class="stepper-dot active">✓</div>
              <span class="stepper-label">35% Advance Locked</span>
            </div>
            <div class="stepper-step">
              <div class="stepper-dot active" id="stepper-dot-dispatch-${idx + 1}">${isDelivered ? '✓' : '🚚'}</div>
              <span class="stepper-label">${isDelivered ? 'Inward Weighbridge Pass' : (c.loc || 'Dispatched in Transit')}</span>
            </div>
            <div class="stepper-step">
              <div class="stepper-dot ${isDelivered ? 'active' : ''}" id="stepper-dot-settled-${idx + 1}" style="${isDelivered ? 'background: #15803d; border-color: #15803d; color: #ffffff;' : ''}">${isDelivered ? '✓' : '4'}</div>
              <span class="stepper-label">${isDelivered ? 'Arrival QC & 100% Settled' : 'Arrival QC & 65% Payout'}</span>
            </div>
          </div>

          <!-- Action Footer -->
          <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f1f5f9; padding-top: 14px; margin-top: 12px; font-size: 0.82rem; flex-wrap: wrap; gap: 10px;">
            <span style="color: #64748b;">Transit Vehicle: <strong style="color: #0f172a;">${c.vehicle || 'Eicher Pro (MH 15 DK 8810)'}</strong> • Driver: <strong style="color: #0f172a;">${c.driver || 'Sanjay Patil'} (${c.driver_phone || '+91 98220-44911'})</strong></span>
            <button class="btn btn-primary btn-sm" id="btn-escrow-vault-release-${idx + 1}" ${isDelivered ? 'disabled' : ''} onclick="openArrivalReleaseModal('${contractId}', '${c.crop}', ${balAmt}, '${c.farmer}', ${totalAmt}, ${advAmt}, '${cardId}')" style="background: ${isDelivered ? '#15803d' : '#0c5a36'}; border-color: ${isDelivered ? '#15803d' : '#0c5a36'}; font-weight: 800; padding: 7px 16px; border-radius: 8px; box-shadow: 0 2px 8px rgba(12,90,54,0.2); cursor: ${isDelivered ? 'default' : 'pointer'};">
              ${isDelivered ? '✓ ' + tr('100% Escrow Settled') : `Release 65% Balance (₹ ${balAmt.toLocaleString('en-IN')})`}
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // Render Ledger Table dynamically
  renderEscrowLedgerTable(currentLedgerFilter || 'all');
}

let currentLedgerFilter = 'all';

function filterEscrowLedger(type, btn) {
  currentLedgerFilter = type;
  document.querySelectorAll('.vault-ledger-card .btn-outline').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  renderEscrowLedgerTable(type);
}

function renderEscrowLedgerTable(filterType = 'all') {
  const tbody = document.getElementById('escrow-ledger-tbody');
  if (!tbody) return;

  let payments = (buyerData && buyerData.payments) ? buyerData.payments : [];
  if (!payments || payments.length === 0) {
    initBuyerPayments();
    payments = buyerData.payments || [];
  }

  let filtered = [...payments];
  if (filterType === 'advance') {
    filtered = filtered.filter(p => p.tranche_type === 'advance' || p.status === 'ESCROW_LOCKED_35');
  } else if (filterType === 'final') {
    filtered = filtered.filter(p => p.tranche_type === 'final' || p.status === 'SETTLED_100');
  } else if (filterType === 'completed') {
    filtered = filtered.filter(p => p.status === 'SETTLED_100');
  }

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" style="text-align: center; padding: 30px; color: #64748b; font-size: 0.88rem;">
          No settlement transactions matching "<strong>${filterType}</strong>".
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(p => {
    const isSettled = p.status === 'SETTLED_100';
    const isAdvance = p.tranche_type === 'advance' || p.status === 'ESCROW_LOCKED_35';
    const amt = isAdvance ? (p.adv_paid || Math.round(p.total_val * 0.35)) : (p.balance_due || (p.total_val - (p.adv_paid || 0)));
    const trancheLabel = isAdvance ? '35% Advance Locked' : '65% Final Payout Released';

    return `
      <tr style="border-bottom: 1px solid #f1f5f9; ${isSettled ? 'background: #f8fafc;' : ''}" data-type="${isAdvance ? 'advance' : 'final'}">
        <td style="padding: 14px 16px;">
          <strong style="color: #0f172a; font-weight: 800;">${p.payment_id || p.gateway_txn_id || 'TXN-AGR-9921'}</strong>
          <div style="font-size: 0.72rem; color: #64748b;">${p.date_formatted || '18 Sep 2026, 00:30 AM'}</div>
        </td>
        <td style="padding: 14px 16px; font-weight: 700; color: #475569;">#${p.contract_no || 'ESC-MH-9921'}</td>
        <td style="padding: 14px 16px;">
          <strong style="color: #0f172a;">${p.farmer_name || 'Farmer Beneficiary'}</strong>
          <div style="font-size: 0.72rem; color: #64748b;">${p.farmer_bank_acc || 'HDFC A/C ••8812'}</div>
        </td>
        <td style="padding: 14px 16px; font-weight: 600;">${p.crop || 'Produce Lot'}</td>
        <td style="padding: 14px 16px;">
          <span style="color: ${isAdvance ? '#0c5a36' : '#1d4ed8'}; font-weight: 800;">${trancheLabel}</span>
          <div style="font-size: 0.7rem; color: #64748b;">${p.payment_rail || 'UPI 2.0 (Dynamic QR)'}</div>
        </td>
        <td style="padding: 14px 16px;"><strong style="color: #0f172a; font-size: 0.92rem;">₹ ${amt.toLocaleString('en-IN')}</strong></td>
        <td style="padding: 14px 16px;"><code style="font-size: 0.75rem; background: #f1f5f9; padding: 3px 8px; border-radius: 6px; font-weight: 700; color: #334155;">${p.bank_utr || 'ICICR52026091800'}</code></td>
        <td style="padding: 14px 16px;">
          <span class="badge" style="background: ${isSettled ? '#15803d' : '#e8f5ed'}; color: ${isSettled ? '#ffffff' : '#0c5a36'}; border: 1px solid ${isSettled ? '#15803d' : '#bbf7d0'}; font-weight: 800;">
            ${isSettled ? '✓ Settled' : '🔒 In Escrow'}
          </span>
        </td>
        <td style="padding: 14px 16px; text-align: right;">
          <button class="btn btn-outline btn-sm" onclick="openPaymentReceiptModal('${p.payment_id || p.contract_no}')" style="font-size: 0.75rem; font-weight: 700; padding: 4px 10px; border-radius: 6px;">📄 Receipt</button>
        </td>
      </tr>
    `;
  }).join('');
}

// ==========================================
// ESCROW STATE MANAGEMENT & PERSISTENCE
// ==========================================
let buyerEscrowState = {
  activeContracts: 3,
  committedPool: 204000,
  advanceLocked: 71400,
  lockedAdvance: 71400,
  deliveryHold: 132600,
  availableLiquidity: 150000,
  completedSettlements: 580000
};

try {
  const savedEscrow = localStorage.getItem('agrinex_buyer_escrow');
  if (savedEscrow) {
    const parsed = JSON.parse(savedEscrow);
    if (parsed && typeof parsed === 'object') {
      Object.assign(buyerEscrowState, parsed);
    }
  }
} catch(e) {}

function updateEscrowVaultDOM() {
  const commEl = document.getElementById('vault-committed-pool');
  const advEl = document.getElementById('vault-advance-locked');
  const holdEl = document.getElementById('vault-delivery-hold');
  const resEl = document.getElementById('escrow-liquid-reserves');
  const settledEl = document.getElementById('escrow-settled-total') || document.getElementById('grv-resolved-count');

  if (commEl) commEl.textContent = `₹ ${buyerEscrowState.committedPool.toLocaleString('en-IN')}`;
  if (advEl) advEl.textContent = `₹ ${buyerEscrowState.advanceLocked.toLocaleString('en-IN')}`;
  if (holdEl) holdEl.textContent = `₹ ${buyerEscrowState.deliveryHold.toLocaleString('en-IN')}`;
  if (resEl) resEl.textContent = `₹ ${buyerEscrowState.availableLiquidity.toLocaleString('en-IN')}`;
  if (settledEl && settledEl.id === 'escrow-settled-total') settledEl.textContent = `₹ ${buyerEscrowState.completedSettlements.toLocaleString('en-IN')}`;

  try {
    localStorage.setItem('agrinex_buyer_escrow', JSON.stringify(buyerEscrowState));
  } catch(e) {}
}

function openEscrowDeedModal(contractId, crop, farmer, totalVal, lockedVal) {
  const modal = document.getElementById('modal-escrow-deed');
  if (!modal) return;

  const refEl = document.getElementById('deed-contract-ref');
  const farmerEl = document.getElementById('deed-farmer-name');
  const lotEl = document.getElementById('deed-produce-lot');
  const totalEl = document.getElementById('deed-total-val');
  const lockedEl = document.getElementById('deed-locked-amt');

  if (refEl) refEl.textContent = `Contract Reference: #${contractId || 'ESC-MH-9921'}`;
  if (farmerEl) farmerEl.textContent = farmer || 'Rameshwar Patil';
  if (lotEl) lotEl.textContent = crop || 'Tomato (Narayangaon Hybrid 50 Qt)';
  if (totalEl) totalEl.textContent = `₹ ${(totalVal || 60000).toLocaleString('en-IN')}`;
  if (lockedEl) lockedEl.textContent = `₹ ${(lockedVal || 21000).toLocaleString('en-IN')}`;

  modal.classList.add('active');
}

function closeEscrowDeedModal() {
  const modal = document.getElementById('modal-escrow-deed');
  if (modal) modal.classList.remove('active');
}

function downloadEscrowStatement() {
  showToast('Generating official AgriNex Nodal Escrow Audit Ledger Statement (PDF)...');
  setTimeout(() => {
    showToast('✓ Escrow Audit Statement (Q3-2026) downloaded successfully!');
  }, 800);
}

// Escrow Vault Window Bindings
window.renderBuyerEscrowVault = renderBuyerEscrowVault;
window.filterEscrowLedger = filterEscrowLedger;
window.renderEscrowLedgerTable = renderEscrowLedgerTable;
window.updateEscrowVaultDOM = updateEscrowVaultDOM;
window.openEscrowDeedModal = openEscrowDeedModal;
window.closeEscrowDeedModal = closeEscrowDeedModal;
window.downloadEscrowStatement = downloadEscrowStatement;
window.buyerEscrowState = buyerEscrowState;
