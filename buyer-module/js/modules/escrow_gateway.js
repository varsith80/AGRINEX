/**
 * AgriNex Buyer Module - Escrow Payment Gateway Engine
 * Handles multi-rail payments (UPI, NEFT/RTGS, Net Banking, Virtual Accounts, Receipts).
 */

function initBuyerPayments() {
  if (buyerData.payments && buyerData.payments.length > 0) return;
  try {
    const saved = localStorage.getItem('agrinex_buyer_payments');
    if (saved) {
      buyerData.payments = JSON.parse(saved);
      return;
    }
  } catch(e) {}

  buyerData.payments = [
    {
      payment_id: "TXN-ESC-9921-A",
      contract_no: "ESC-MH-9921",
      tracking_id: "TRK-MH-LOTONI01-9921",
      lot_id: "LOT-ONI-01",
      crop: "Red Onion (Garwa Export 80 Qt)",
      quantity_kg: 8000,
      quantity_qt: 80,
      farmer_name: "Patil Rameshwar",
      farmer_phone: "+91 98220-44911",
      farmer_location: "Lasalgaon, Nashik Yard, Maharashtra",
      farmer_bank_acc: "HDFC A/C ••8812 (Lasalgaon Branch)",
      total_val: 144000,
      adv_paid: 50400,
      balance_due: 93600,
      tranche_type: "advance",
      payment_rail: "UPI 2.0 (Dynamic Escrow QR)",
      gateway_txn_id: "TXN_AGR_99218412",
      bank_utr: "HDFC0001928471",
      escrow_cert: "ESC-CERT-MH-9921",
      status: "ESCROW_LOCKED_35",
      created_at: "2026-09-12T10:14:00Z",
      date_formatted: "12 Sep 2026, 10:14 AM"
    },
    {
      payment_id: "TXN-ESC-4412-A",
      contract_no: "ESC-MH-4412",
      tracking_id: "TRK-MH-LOTTOM02-4412",
      lot_id: "LOT-TOM-02",
      crop: "Tomato (Narayangaon Hybrid 60 Qt)",
      quantity_kg: 6000,
      quantity_qt: 60,
      farmer_name: "Sanjay Deshmukh",
      farmer_phone: "+91 98901-22440",
      farmer_location: "Junnar, Pune Yard, Maharashtra",
      farmer_bank_acc: "SBI A/C ••4491 (Narayangaon Branch)",
      total_val: 72000,
      adv_paid: 25200,
      balance_due: 46800,
      tranche_type: "advance",
      payment_rail: "Corporate NetBanking (VAN)",
      gateway_txn_id: "TXN_AGR_44129981",
      bank_utr: "SBIN0008891283",
      escrow_cert: "ESC-CERT-MH-4412",
      status: "ESCROW_LOCKED_35",
      created_at: "2026-09-11T16:30:00Z",
      date_formatted: "11 Sep 2026, 04:30 PM"
    },
    {
      payment_id: "TXN-ESC-7730-A",
      contract_no: "ESC-MH-7730",
      tracking_id: "TRK-MH-LOTBAN03-7730",
      lot_id: "LOT-BAN-03",
      crop: "Grand Naine Banana (100 Qt)",
      quantity_kg: 10000,
      quantity_qt: 100,
      farmer_name: "Rajesh Shinde",
      farmer_phone: "+91 97654-11882",
      farmer_location: "Raver, Jalgaon Yard, Maharashtra",
      farmer_bank_acc: "ICICI A/C ••7730 (Jalgaon Branch)",
      total_val: 140000,
      adv_paid: 49000,
      balance_due: 91000,
      tranche_type: "advance",
      payment_rail: "AgriNex Escrow Wallet",
      gateway_txn_id: "TXN_AGR_77301149",
      bank_utr: "ICICR52026091800881",
      escrow_cert: "ESC-CERT-MH-7730",
      status: "ESCROW_LOCKED_35",
      created_at: "2026-09-10T11:00:00Z",
      date_formatted: "10 Sep 2026, 11:00 AM"
    }
  ];

  try {
    localStorage.setItem('agrinex_buyer_payments', JSON.stringify(buyerData.payments));
  } catch(e) {}
}


// ==========================================
// AGRINEX ESCROW PAYMENT GATEWAY ENGINE
// ==========================================

let activePendingPayment = null;
let gatewayUpiTimerInterval = null;
let selectedGatewayRail = 'upi';
let lastCompletedPayment = null;

function openEscrowPaymentGateway(orderData) {
  activePendingPayment = orderData;
  selectedGatewayRail = 'upi';

  const modal = document.getElementById('modal-escrow-payment-gateway');
  if (!modal) return;

  const cropEl = document.getElementById('gateway-crop-label');
  const farmerEl = document.getElementById('gateway-farmer-label');
  const totalValEl = document.getElementById('gateway-total-lot-val');
  const advanceDueEl = document.getElementById('gateway-advance-due');
  const payBtnAmtEl = document.getElementById('gateway-pay-btn-amt');
  const debitReqEl = document.getElementById('gateway-wallet-debit-req');

  const tr = (txt) => (window.tText ? window.tText(txt) : txt);
  const tCrop = (c) => (window.tCrop ? window.tCrop(c) : c);

  if (cropEl) cropEl.textContent = `${tCrop(orderData.crop)} (${orderData.grade || 'Grade A'}) • ${orderData.qtyKg.toLocaleString('en-IN')} kg (${orderData.qtyQt || (orderData.qtyKg / 100).toFixed(1)} Qt)`;
  if (farmerEl) farmerEl.textContent = `${orderData.farmerName} • 📍 ${orderData.farmerLocation}`;
  if (totalValEl) totalValEl.textContent = `₹ ${orderData.totalVal.toLocaleString('en-IN')}`;
  if (advanceDueEl) advanceDueEl.textContent = `₹ ${orderData.advAmount.toLocaleString('en-IN')}`;
  if (payBtnAmtEl) payBtnAmtEl.textContent = `(₹ ${orderData.advAmount.toLocaleString('en-IN')})`;
  if (debitReqEl) debitReqEl.textContent = `₹ ${orderData.advAmount.toLocaleString('en-IN')}`;

  // Reset to screen 1 (Checkout)
  const screenCheckout = document.getElementById('gateway-screen-checkout');
  const screenProc = document.getElementById('gateway-screen-processing');
  const screenSucc = document.getElementById('gateway-screen-success');

  if (screenCheckout) screenCheckout.style.display = 'flex';
  if (screenProc) screenProc.classList.remove('active');
  if (screenSucc) screenSucc.classList.remove('active');

  // Activate UPI rail button by default
  const upiBtn = document.querySelector('.gateway-rail-btn');
  if (upiBtn) switchGatewayRail('upi', upiBtn);

  // Start UPI countdown timer (5 mins)
  startGatewayUpiTimer();

  modal.classList.add('active');
}

function closeEscrowPaymentGateway() {
  if (gatewayUpiTimerInterval) {
    clearInterval(gatewayUpiTimerInterval);
    gatewayUpiTimerInterval = null;
  }
  const modal = document.getElementById('modal-escrow-payment-gateway');
  if (modal) modal.classList.remove('active');
}

function startGatewayUpiTimer() {
  if (gatewayUpiTimerInterval) clearInterval(gatewayUpiTimerInterval);
  let duration = 300; // 5 minutes
  const timerEl = document.getElementById('gateway-upi-timer');
  
  const updateDisplay = () => {
    const mins = Math.floor(duration / 60);
    const secs = duration % 60;
    if (timerEl) timerEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    if (duration <= 0) {
      clearInterval(gatewayUpiTimerInterval);
      if (timerEl) timerEl.textContent = 'Expired';
    }
    duration--;
  };

  updateDisplay();
  gatewayUpiTimerInterval = setInterval(updateDisplay, 1000);
}

function switchGatewayRail(rail, btn) {
  selectedGatewayRail = rail;
  document.querySelectorAll('.gateway-rail-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  document.querySelectorAll('.gateway-panel').forEach(p => p.classList.remove('active'));
  const targetPanel = document.getElementById(`gateway-panel-${rail}`);
  if (targetPanel) targetPanel.classList.add('active');

  const payBtn = document.getElementById('btn-gateway-process-pay');
  const amtStr = activePendingPayment ? `(₹ ${activePendingPayment.advAmount.toLocaleString('en-IN')})` : '';
  const railNames = {
    upi: 'via UPI 2.0',
    van: 'via Corporate RTGS/NEFT (VAN)',
    wallet: 'via Escrow Wallet',
    credit: 'via Agri-Credit PayLater',
    card: 'via Corporate Card'
  };

  if (payBtn) {
    payBtn.innerHTML = `<span>🔒 Lock 35% Escrow ${railNames[rail] || ''}</span> <span id="gateway-pay-btn-amt">${amtStr}</span>`;
  }
}

function simulateFastUpiPay(app) {
  showToast(`Initiating UPI payment with ${app}...`);
  setTimeout(() => {
    processEscrowGatewayPayment();
  }, 400);
}

function copyVirtualAccountDetails() {
  const vanDetails = "Beneficiary: AgriNex B2B Escrow Nodal Trustee\nVirtual Account Number: AGRI99201948\nIFSC Code: ICIC0000011\nBank: ICICI Bank Nodal Branch\nMode: RTGS / IMPS";
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(vanDetails).then(() => {
      showToast('✓ Virtual Account Details copied to clipboard! Paste in corporate ERP/Banking portal.');
    }).catch(() => {
      showToast('✓ Virtual Account: AGRI99201948 (IFSC: ICIC0000011)');
    });
  } else {
    showToast('✓ Virtual Account: AGRI99201948 (IFSC: ICIC0000011)');
  }
}

function processEscrowGatewayPayment() {
  if (!activePendingPayment) return;

  const screenCheckout = document.getElementById('gateway-screen-checkout');
  const screenProc = document.getElementById('gateway-screen-processing');
  const screenSucc = document.getElementById('gateway-screen-success');

  if (screenCheckout) screenCheckout.style.display = 'none';
  if (screenProc) screenProc.classList.add('active');

  const randSuffix = Math.floor(1000 + Math.random() * 9000);
  const txnId = `TXN_AGR_${Math.floor(10000000 + Math.random() * 90000000)}`;
  const utrNo = `ICICR52026091800${Math.floor(100 + Math.random() * 900)}`;
  const certNo = `ESC-CERT-MH-${randSuffix}`;
  const contractNo = `ESC-MH-${randSuffix}`;

  const railLabels = {
    upi: 'UPI 2.0 (Dynamic QR)',
    van: 'Corporate NetBanking (VAN)',
    wallet: 'AgriNex Escrow Wallet',
    credit: 'Agri-Credit PayLater (Arya.ag)',
    card: 'Corporate Card (3DS Verified)'
  };

  // If wallet, deduct balance
  if (selectedGatewayRail === 'wallet') {
    let walletBal = 150000;
    try {
      const saved = localStorage.getItem('agrinex_escrow_wallet_balance');
      if (saved !== null) walletBal = parseFloat(saved) || 0;
    } catch(e) {}
    walletBal = Math.max(0, walletBal - activePendingPayment.advAmount);
    try {
      localStorage.setItem('agrinex_escrow_wallet_balance', walletBal.toString());
    } catch(e) {}
  }

  const pDetails = {
    txnId: txnId,
    utr: utrNo,
    certNo: certNo,
    contractNo: contractNo,
    railName: railLabels[selectedGatewayRail] || 'UPI 2.0 (Dynamic QR)'
  };

  // Simulate gateway steps
  setTimeout(() => {
    const step2 = document.getElementById('proc-step-2');
    if (step2) step2.innerHTML = `✓ Lock 35% Advance (₹ ${activePendingPayment.advAmount.toLocaleString('en-IN')}) Earmarked`;
  }, 700);

  setTimeout(() => {
    const step3 = document.getElementById('proc-step-3');
    if (step3) {
      step3.innerHTML = `✓ UTR Generated: <span style="font-family: monospace;">${utrNo}</span>`;
      step3.style.color = '#166534';
    }
  }, 1300);

  setTimeout(() => {
    // Execute actual purchase & persistence
    executeBuyerLotPurchase(activePendingPayment.lotId, activePendingPayment.rateKg, activePendingPayment.qtyKg, pDetails);

    lastCompletedPayment = {
      ...activePendingPayment,
      ...pDetails
    };

    // Update Success Screen details
    const succTxn = document.getElementById('succ-gateway-txnid');
    const succUtr = document.getElementById('succ-gateway-utr');
    const succCert = document.getElementById('succ-gateway-cert');
    const succAmt = document.getElementById('succ-gateway-amt');

    if (succTxn) succTxn.textContent = txnId;
    if (succUtr) succUtr.textContent = utrNo;
    if (succCert) succCert.textContent = certNo;
    if (succAmt) succAmt.textContent = `₹ ${activePendingPayment.advAmount.toLocaleString('en-IN')}`;

    if (screenProc) screenProc.classList.remove('active');
    if (screenSucc) screenSucc.classList.add('active');

    showToast(`🎉 35% Escrow Advance (₹ ${activePendingPayment.advAmount.toLocaleString('en-IN')}) locked via ${railLabels[selectedGatewayRail]}!`, 'success');
  }, 1900);
}

function openPaymentReceiptFromSuccess() {
  closeEscrowPaymentGateway();
  if (lastCompletedPayment) {
    openPaymentReceiptModal(lastCompletedPayment.txnId || lastCompletedPayment.contractNo);
  }
}

function finishEscrowGatewaySuccess() {
  closeEscrowPaymentGateway();
  switchView('view-consignments');
}

// Payment Receipt Modal Controller
function openPaymentReceiptModal(refId) {
  let payment = null;
  if (buyerData && buyerData.payments) {
    payment = buyerData.payments.find(p => p.payment_id === refId || p.contract_no === refId || p.tracking_id === refId || p.gateway_txn_id === refId);
  }

  if (!payment) {
    payment = {
      payment_id: refId || "TXN-ESC-9921-A",
      contract_no: "ESC-MH-9921",
      crop: "Garwa Red Onion (Grade A)",
      quantity_kg: 5000,
      quantity_qt: 50,
      farmer_name: "Patil Rameshwar",
      farmer_bank_acc: "HDFC Bank A/C ••8812",
      farmer_location: "Lasalgaon, Nashik Yard, Maharashtra",
      total_val: 90000,
      adv_paid: 31500,
      balance_due: 58500,
      payment_rail: "UPI 2.0 (Dynamic Escrow QR)",
      gateway_txn_id: "TXN_AGR_99218412",
      bank_utr: "ICICR52026091800192",
      escrow_cert: "ESC-CERT-MH-8821",
      date_formatted: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    };
  }

  const modal = document.getElementById('modal-payment-receipt');
  if (!modal) return;

  const vNoEl = document.getElementById('rcpt-voucher-no');
  const dtEl = document.getElementById('rcpt-date-time');
  const farmerNameEl = document.getElementById('rcpt-farmer-name');
  const farmerAccEl = document.getElementById('rcpt-farmer-acc');
  const farmerLocEl = document.getElementById('rcpt-farmer-loc');
  const tCropEl = document.getElementById('rcpt-table-crop');
  const tQtyEl = document.getElementById('rcpt-table-qty');
  const tRateEl = document.getElementById('rcpt-table-rate');
  const tTotalEl = document.getElementById('rcpt-table-total');
  const trailTxnEl = document.getElementById('rcpt-trail-txnid');
  const trailUtrEl = document.getElementById('rcpt-trail-utr');
  const trailRailEl = document.getElementById('rcpt-trail-rail');
  const trailCertEl = document.getElementById('rcpt-trail-cert');
  const sumGrossEl = document.getElementById('rcpt-sum-gross');
  const sumAdvEl = document.getElementById('rcpt-sum-advance');
  const sumBalEl = document.getElementById('rcpt-sum-balance');

  const kgRate = payment.quantity_kg ? (payment.total_val / payment.quantity_kg).toFixed(2) : '18.00';

  if (vNoEl) vNoEl.textContent = `VOUCHER #${payment.payment_id || 'ESC-V-9921'}`;
  if (dtEl) dtEl.textContent = payment.date_formatted || new Date().toLocaleString();
  if (farmerNameEl) farmerNameEl.textContent = payment.farmer_name || 'Farmer Partner';
  if (farmerAccEl) farmerAccEl.textContent = payment.farmer_bank_acc || 'Aadhaar Linked DBT A/C ••8812';
  if (farmerLocEl) farmerLocEl.textContent = payment.farmer_location || 'Lasalgaon, Nashik Yard, Maharashtra';
  if (tCropEl) tCropEl.textContent = payment.crop || 'Produce Lot';
  if (tQtyEl) tQtyEl.textContent = `${(payment.quantity_kg || 5000).toLocaleString('en-IN')} kg (${payment.quantity_qt || 50} Qt)`;
  if (tRateEl) tRateEl.textContent = `₹ ${kgRate}`;
  if (tTotalEl) tTotalEl.textContent = `₹ ${(payment.total_val || 90000).toLocaleString('en-IN')}`;
  if (trailTxnEl) trailTxnEl.textContent = payment.gateway_txn_id || payment.payment_id || 'TXN_AGR_99218412';
  if (trailUtrEl) trailUtrEl.textContent = payment.bank_utr || 'ICICR52026091800192';
  if (trailRailEl) trailRailEl.textContent = payment.payment_rail || 'UPI 2.0 (Dynamic QR)';
  if (trailCertEl) trailCertEl.textContent = payment.escrow_cert || 'ESC-CERT-MH-8821';
  if (sumGrossEl) sumGrossEl.textContent = `₹ ${(payment.total_val || 90000).toLocaleString('en-IN')}`;
  if (sumAdvEl) sumAdvEl.textContent = `₹ ${(payment.adv_paid || 31500).toLocaleString('en-IN')}`;
  if (sumBalEl) sumBalEl.textContent = `₹ ${(payment.balance_due || 58500).toLocaleString('en-IN')}`;

  modal.classList.add('active');
}

function closePaymentReceiptModal() {
  const modal = document.getElementById('modal-payment-receipt');
  if (modal) modal.classList.remove('active');
}

// Escrow Capital Deposit Modal Controller
function openDepositEscrowModal() {
  const modal = document.getElementById('modal-deposit-escrow');
  if (modal) modal.classList.add('active');
}

function closeDepositEscrowModal() {
  const modal = document.getElementById('modal-deposit-escrow');
  if (modal) modal.classList.remove('active');
}

function setDepositAmount(amt) {
  const customInput = document.getElementById('deposit-custom-amt');
  if (customInput) customInput.value = amt;
  document.querySelectorAll('#modal-deposit-escrow .btn-outline').forEach(b => {
    b.classList.toggle('active', b.textContent.includes(amt.toLocaleString('en-IN')));
  });
}

function submitDepositEscrowCapital() {
  const customInput = document.getElementById('deposit-custom-amt');
  const amt = parseFloat(customInput?.value) || 100000;
  closeDepositEscrowModal();

  let walletBal = 150000;
  try {
    const saved = localStorage.getItem('agrinex_escrow_wallet_balance');
    if (saved !== null) walletBal = parseFloat(saved) || 0;
  } catch(e) {}

  walletBal += amt;
  try {
    localStorage.setItem('agrinex_escrow_wallet_balance', walletBal.toString());
  } catch(e) {}

  showToast(`✓ ₹ ${amt.toLocaleString('en-IN')} deposited to your Liquid Escrow Reserves via Instant RTGS/UPI!`, 'success');
  renderBuyerEscrowVault();
}

// Confirm 35% Escrow from Negotiation modal -> routes to Payment Gateway

function openDepositEscrowModal() {
  const modal = document.getElementById('modal-deposit-escrow');
  if (modal) {
    modal.classList.add('active');
    const amtInput = document.getElementById('escrow-deposit-amount');
    updateEscrowGatewayAmount((amtInput && amtInput.value) || 50000);
  }
}

function closeDepositEscrowModal() {
  const modal = document.getElementById('modal-deposit-escrow');
  if (modal) modal.classList.remove('active');
}

function setEscrowDepositRail(rail) {
  const rails = ['upi', 'va', 'netbanking'];
  rails.forEach(r => {
    const tab = document.getElementById(`rail-tab-${r}`);
    const panel = document.getElementById(`rail-content-${r}`);
    if (r === rail) {
      if (tab) {
        tab.style.border = '1.5px solid #0c5a36';
        tab.style.background = '#f0fdf4';
        tab.style.color = '#0c5a36';
      }
      if (panel) panel.style.display = 'block';
    } else {
      if (tab) {
        tab.style.border = '1.5px solid #e2e8f0';
        tab.style.background = '#ffffff';
        tab.style.color = '#475569';
      }
      if (panel) panel.style.display = 'none';
    }
  });
}

function setEscrowPresetAmount(amount) {
  const input = document.getElementById('escrow-deposit-amount');
  if (input) {
    input.value = amount;
    updateEscrowGatewayAmount(amount);
  }
}

function updateEscrowGatewayAmount(val) {
  const num = parseFloat(val) || 0;
  const formatted = `₹ ${num.toLocaleString('en-IN')}`;
  const labels = document.querySelectorAll('.escrow-dyn-amt-label');
  labels.forEach(lbl => {
    lbl.textContent = formatted;
  });
}

function selectCorpBank(chipEl, bankName) {
  const allChips = document.querySelectorAll('.bank-select-chip');
  allChips.forEach(c => {
    c.classList.remove('active');
    c.style.borderColor = '#e2e8f0';
    c.style.background = '#ffffff';
    const title = c.querySelector('div');
    if (title) title.style.color = '#0f172a';
  });

  if (chipEl) {
    chipEl.classList.add('active');
    chipEl.style.borderColor = '#0c5a36';
    chipEl.style.background = '#f0fdf4';
    const title = chipEl.querySelector('div');
    if (title) title.style.color = '#0c5a36';
    const radio = chipEl.querySelector('input[type="radio"]');
    if (radio) radio.checked = true;
  }
}

function copyEscrowField(text, label) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`✓ Copied ${label || 'detail'} to clipboard: ${text}`, 'success');
    }).catch(() => {
      fallbackCopy(text, label);
    });
  } else {
    fallbackCopy(text, label);
  }
}

function fallbackCopy(text, label) {
  const ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  showToast(`✓ Copied ${label || 'detail'} to clipboard: ${text}`, 'success');
}

function handleDepositEscrowSubmit(e, railName = 'Instant UPI') {
  if (e) e.preventDefault();
  const amtInput = document.getElementById('escrow-deposit-amount');
  const amount = parseFloat((amtInput && amtInput.value) || 50000);

  if (amount < 1000) {
    showToast('⚠️ Minimum deposit amount is ₹ 1,000', 'error');
    return;
  }

  closeDepositEscrowModal();

  // Generate Bank UTR and Txn Ref
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  const dateStr = `${now.getDate()} ${now.toLocaleString('en-IN', { month: 'short' })} ${now.getFullYear()}, ${timeStr}`;
  const txnRef = `TXN-ESC-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  let bankUtr = '';
  if (railName.includes('UPI')) {
    bankUtr = `UPI/${Math.floor(100000000000 + Math.random() * 900000000000)}`;
  } else if (railName.includes('RTGS') || railName.includes('NEFT')) {
    bankUtr = `ICICR5202609${Math.floor(100000 + Math.random() * 900000)}`;
  } else {
    const selectedBank = document.querySelector('input[name="corp-bank"]:checked')?.value || 'HDFC Bank';
    bankUtr = `${selectedBank.substring(0, 4).toUpperCase()}000${Math.floor(100000 + Math.random() * 900000)}`;
  }

  showToast(`🔒 Authorizing ${railName} transfer of ₹ ${amount.toLocaleString('en-IN')}...`);

  setTimeout(() => {
    // Update State
    buyerEscrowState.availableLiquidity += amount;
    buyerEscrowState.committedPool += amount;
    updateEscrowVaultDOM();

    // Prepend to Escrow Ledger Table
    const tbody = document.getElementById('escrow-ledger-tbody');
    if (tbody) {
      const tr = document.createElement('tr');
      tr.style.borderBottom = '1px solid #f1f5f9';
      tr.style.background = '#f0fdf4';
      tr.setAttribute('data-type', 'deposit');
      tr.innerHTML = `
        <td style="padding: 12px 14px;">
          <strong>${txnRef}</strong>
          <div style="font-size: 0.7rem; color: #64748b;">${dateStr}</div>
        </td>
        <td style="padding: 12px 14px;">#TOPUP-VAULT</td>
        <td style="padding: 12px 14px;">
          <strong>AgriNex Nodal Trustee</strong>
          <div style="font-size: 0.7rem; color: #64748b;">ICICI Escrow A/C ••0104</div>
        </td>
        <td style="padding: 12px 14px;">Escrow Pool Liquidity</td>
        <td style="padding: 12px 14px;"><span style="color: #166534; font-weight: 700;">+ Liquidity Deposit</span></td>
        <td style="padding: 12px 14px;"><strong style="color: #0c5a36;">+ ₹ ${amount.toLocaleString('en-IN')}</strong></td>
        <td style="padding: 12px 14px;"><code style="font-size: 0.72rem; background: #e2e8f0; padding: 2px 6px; border-radius: 4px;">${bankUtr}</code></td>
        <td style="padding: 12px 14px;"><span class="badge badge-grade-a" style="background: #dcfce7; color: #15803d;">✓ Credited</span></td>
        <td style="padding: 12px 14px; text-align: right;">
          <button class="btn btn-outline btn-sm" onclick="openDepositReceiptModalFromRow('${txnRef}', '${bankUtr}', '${railName}', ${amount}, '${dateStr}')" style="font-size: 0.72rem; padding: 3px 8px;">📄 Receipt</button>
        </td>
      `;
      tbody.insertBefore(tr, tbody.firstChild);
    }

    // Populate Receipt Modal
    const rAmt = document.getElementById('receipt-deposit-amount');
    const rDate = document.getElementById('receipt-deposit-date');
    const rTxn = document.getElementById('receipt-deposit-txn');
    const rUtr = document.getElementById('receipt-deposit-utr');
    const rRail = document.getElementById('receipt-deposit-rail');
    const rBal = document.getElementById('receipt-updated-balance');

    if (rAmt) rAmt.textContent = `₹ ${amount.toLocaleString('en-IN')}`;
    if (rDate) rDate.textContent = dateStr;
    if (rTxn) rTxn.textContent = `#${txnRef}`;
    if (rUtr) rUtr.textContent = bankUtr;
    if (rRail) rRail.textContent = railName;
    if (rBal) rBal.textContent = `₹ ${(buyerEscrowState.advanceLocked + buyerEscrowState.availableLiquidity).toLocaleString('en-IN')}`;

    // Open Receipt Modal
    const receiptModal = document.getElementById('modal-deposit-receipt');
    if (receiptModal) receiptModal.classList.add('active');

    showToast(`✓ Payment captured! ₹ ${amount.toLocaleString('en-IN')} credited to Escrow Pool. UTR: ${bankUtr}`, 'success');
  }, 750);
}

function openDepositReceiptModalFromRow(txn, utr, rail, amount, date) {
  const rAmt = document.getElementById('receipt-deposit-amount');
  const rDate = document.getElementById('receipt-deposit-date');
  const rTxn = document.getElementById('receipt-deposit-txn');
  const rUtr = document.getElementById('receipt-deposit-utr');
  const rRail = document.getElementById('receipt-deposit-rail');
  const rBal = document.getElementById('receipt-updated-balance');

  if (rAmt) rAmt.textContent = `₹ ${parseFloat(amount || 0).toLocaleString('en-IN')}`;
  if (rDate) rDate.textContent = date || '14 Sep 2026, 12:45 PM';
  if (rTxn) rTxn.textContent = `#${txn || 'TXN-ESC-2026'}`;
  if (rUtr) rUtr.textContent = utr || 'ICIC091488129';
  if (rRail) rRail.textContent = rail || 'Instant UPI';
  if (rBal) rBal.textContent = `₹ ${(buyerEscrowState.advanceLocked + buyerEscrowState.availableLiquidity).toLocaleString('en-IN')}`;
    const amtInput = document.getElementById('escrow-deposit-amount');
    updateEscrowGatewayAmount((amtInput && amtInput.value) || 50000);
  }
}

function closeDepositEscrowModal() {
  const modal = document.getElementById('modal-deposit-escrow');
  if (modal) modal.classList.remove('active');
}

function setEscrowDepositRail(rail) {
  const rails = ['upi', 'va', 'netbanking'];
  rails.forEach(r => {
    const tab = document.getElementById(`rail-tab-${r}`);
    const panel = document.getElementById(`rail-content-${r}`);
    if (r === rail) {
      if (tab) {
        tab.style.border = '1.5px solid #0c5a36';
        tab.style.background = '#f0fdf4';
        tab.style.color = '#0c5a36';
      }
      if (panel) panel.style.display = 'block';
    } else {
      if (tab) {
        tab.style.border = '1.5px solid #e2e8f0';
        tab.style.background = '#ffffff';
        tab.style.color = '#475569';
      }
      if (panel) panel.style.display = 'none';
    }
  });
}

function setEscrowPresetAmount(amount) {
  const input = document.getElementById('escrow-deposit-amount');
  if (input) {
    input.value = amount;
    updateEscrowGatewayAmount(amount);
  }
}

function updateEscrowGatewayAmount(val) {
  const num = parseFloat(val) || 0;
  const formatted = `₹ ${num.toLocaleString('en-IN')}`;
  const labels = document.querySelectorAll('.escrow-dyn-amt-label');
  labels.forEach(lbl => {
    lbl.textContent = formatted;
  });
}

function selectCorpBank(chipEl, bankName) {
  const allChips = document.querySelectorAll('.bank-select-chip');
  allChips.forEach(c => {
    c.classList.remove('active');
    c.style.borderColor = '#e2e8f0';
    c.style.background = '#ffffff';
    const title = c.querySelector('div');
    if (title) title.style.color = '#0f172a';
  });

  if (chipEl) {
    chipEl.classList.add('active');
    chipEl.style.borderColor = '#0c5a36';
    chipEl.style.background = '#f0fdf4';
    const title = chipEl.querySelector('div');
    if (title) title.style.color = '#0c5a36';
    const radio = chipEl.querySelector('input[type="radio"]');
    if (radio) radio.checked = true;
  }
}

function copyEscrowField(text, label) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`✓ Copied ${label || 'detail'} to clipboard: ${text}`, 'success');
    }).catch(() => {
      fallbackCopy(text, label);
    });
  } else {
    fallbackCopy(text, label);
  }
}

function fallbackCopy(text, label) {
  const ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  showToast(`✓ Copied ${label || 'detail'} to clipboard: ${text}`, 'success');
}

function handleDepositEscrowSubmit(e, railName = 'Instant UPI') {
  if (e) e.preventDefault();
  const amtInput = document.getElementById('escrow-deposit-amount');
  const amount = parseFloat((amtInput && amtInput.value) || 50000);

  if (amount < 1000) {
    showToast('⚠️ Minimum deposit amount is ₹ 1,000', 'error');
    return;
  }

  closeDepositEscrowModal();

  // Generate Bank UTR and Txn Ref
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  const dateStr = `${now.getDate()} ${now.toLocaleString('en-IN', { month: 'short' })} ${now.getFullYear()}, ${timeStr}`;
  const txnRef = `TXN-ESC-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  let bankUtr = '';
  if (railName.includes('UPI')) {
    bankUtr = `UPI/${Math.floor(100000000000 + Math.random() * 900000000000)}`;
  } else if (railName.includes('RTGS') || railName.includes('NEFT')) {
    bankUtr = `ICICR5202609${Math.floor(100000 + Math.random() * 900000)}`;
  } else {
    const selectedBank = document.querySelector('input[name="corp-bank"]:checked')?.value || 'HDFC Bank';
    bankUtr = `${selectedBank.substring(0, 4).toUpperCase()}000${Math.floor(100000 + Math.random() * 900000)}`;
  }

  showToast(`🔒 Authorizing ${railName} transfer of ₹ ${amount.toLocaleString('en-IN')}...`);

  setTimeout(() => {
    // Update State
    buyerEscrowState.availableLiquidity += amount;
    buyerEscrowState.committedPool += amount;
    updateEscrowVaultDOM();

    // Prepend to Escrow Ledger Table
    const tbody = document.getElementById('escrow-ledger-tbody');
    if (tbody) {
      const tr = document.createElement('tr');
      tr.style.borderBottom = '1px solid #f1f5f9';
      tr.style.background = '#f0fdf4';
      tr.setAttribute('data-type', 'deposit');
      tr.innerHTML = `
        <td style="padding: 12px 14px;">
          <strong>${txnRef}</strong>
          <div style="font-size: 0.7rem; color: #64748b;">${dateStr}</div>
        </td>
        <td style="padding: 12px 14px;">#TOPUP-VAULT</td>
        <td style="padding: 12px 14px;">
          <strong>AgriNex Nodal Trustee</strong>
          <div style="font-size: 0.7rem; color: #64748b;">ICICI Escrow A/C ••0104</div>
        </td>
        <td style="padding: 12px 14px;">Escrow Pool Liquidity</td>
        <td style="padding: 12px 14px;"><span style="color: #166534; font-weight: 700;">+ Liquidity Deposit</span></td>
        <td style="padding: 12px 14px;"><strong style="color: #0c5a36;">+ ₹ ${amount.toLocaleString('en-IN')}</strong></td>
        <td style="padding: 12px 14px;"><code style="font-size: 0.72rem; background: #e2e8f0; padding: 2px 6px; border-radius: 4px;">${bankUtr}</code></td>
        <td style="padding: 12px 14px;"><span class="badge badge-grade-a" style="background: #dcfce7; color: #15803d;">✓ Credited</span></td>
        <td style="padding: 12px 14px; text-align: right;">
          <button class="btn btn-outline btn-sm" onclick="openDepositReceiptModalFromRow('${txnRef}', '${bankUtr}', '${railName}', ${amount}, '${dateStr}')" style="font-size: 0.72rem; padding: 3px 8px;">📄 Receipt</button>
        </td>
      `;
      tbody.insertBefore(tr, tbody.firstChild);
    }

    // Populate Receipt Modal
    const rAmt = document.getElementById('receipt-deposit-amount');
    const rDate = document.getElementById('receipt-deposit-date');
    const rTxn = document.getElementById('receipt-deposit-txn');
    const rUtr = document.getElementById('receipt-deposit-utr');
    const rRail = document.getElementById('receipt-deposit-rail');
    const rBal = document.getElementById('receipt-updated-balance');

    if (rAmt) rAmt.textContent = `₹ ${amount.toLocaleString('en-IN')}`;
    if (rDate) rDate.textContent = dateStr;
    if (rTxn) rTxn.textContent = `#${txnRef}`;
    if (rUtr) rUtr.textContent = bankUtr;
    if (rRail) rRail.textContent = railName;
    if (rBal) rBal.textContent = `₹ ${(buyerEscrowState.advanceLocked + buyerEscrowState.availableLiquidity).toLocaleString('en-IN')}`;

    // Open Receipt Modal
    const receiptModal = document.getElementById('modal-deposit-receipt');
    if (receiptModal) receiptModal.classList.add('active');

    showToast(`✓ Payment captured! ₹ ${amount.toLocaleString('en-IN')} credited to Escrow Pool. UTR: ${bankUtr}`, 'success');
  }, 750);
}

function openDepositReceiptModalFromRow(txn, utr, rail, amount, date) {
  const rAmt = document.getElementById('receipt-deposit-amount');
  const rDate = document.getElementById('receipt-deposit-date');
  const rTxn = document.getElementById('receipt-deposit-txn');
  const rUtr = document.getElementById('receipt-deposit-utr');
  const rRail = document.getElementById('receipt-deposit-rail');
  const rBal = document.getElementById('receipt-updated-balance');

  if (rAmt) rAmt.textContent = `₹ ${parseFloat(amount || 0).toLocaleString('en-IN')}`;
  if (rDate) rDate.textContent = date || '14 Sep 2026, 12:45 PM';
  if (rTxn) rTxn.textContent = `#${txn || 'TXN-ESC-2026'}`;
  if (rUtr) rUtr.textContent = utr || 'ICIC091488129';
  if (rRail) rRail.textContent = rail || 'Instant UPI';
  if (rBal) rBal.textContent = `₹ ${(buyerEscrowState.advanceLocked + buyerEscrowState.availableLiquidity).toLocaleString('en-IN')}`;

  const receiptModal = document.getElementById('modal-deposit-receipt');
  if (receiptModal) receiptModal.classList.add('active');
}

function closeDepositReceiptModal() {
  const receiptModal = document.getElementById('modal-deposit-receipt');
  if (receiptModal) receiptModal.classList.remove('active');
}

function downloadPaymentReceiptPdf() {
  const curLang = (window.AgriNexI18n && typeof window.AgriNexI18n.getBuyerLanguage === 'function') ? window.AgriNexI18n.getBuyerLanguage() : 'en';
  const isMr = curLang === 'mr';
  const isHi = curLang === 'hi';

  const vNo = document.getElementById('rcpt-voucher-no')?.textContent || 'VOUCHER #ESC-V-9921';
  const dt = document.getElementById('rcpt-date-time')?.textContent || new Date().toLocaleString();
  const farmerName = document.getElementById('rcpt-farmer-name')?.textContent || 'Farmer Partner';
  const farmerAcc = document.getElementById('rcpt-farmer-acc')?.textContent || 'Aadhaar DBT A/C ••8812';
  const farmerLoc = document.getElementById('rcpt-farmer-loc')?.textContent || 'Lasalgaon, Nashik Yard';
  const crop = document.getElementById('rcpt-table-crop')?.textContent || 'Produce Lot';
  const qty = document.getElementById('rcpt-table-qty')?.textContent || '50 Qt';
  const rate = document.getElementById('rcpt-table-rate')?.textContent || '₹ 18.00/kg';
  const total = document.getElementById('rcpt-table-total')?.textContent || '₹ 90,000';
  const adv = document.getElementById('rcpt-sum-advance')?.textContent || '₹ 31,500';
  const bal = document.getElementById('rcpt-sum-balance')?.textContent || '₹ 58,500';
  const txnid = document.getElementById('rcpt-trail-txnid')?.textContent || 'TXN_AGR_99218412';
  const utr = document.getElementById('rcpt-trail-utr')?.textContent || 'ICICR52026091800192';
  const rail = document.getElementById('rcpt-trail-rail')?.textContent || 'UPI 2.0 Dynamic Escrow QR';
  const cert = document.getElementById('rcpt-trail-cert')?.textContent || 'ESC-CERT-MH-8821';

  const docId = vNo.replace(/[^a-zA-Z0-9-_]/g, '');

  const pdfHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${docId} - AgriNex Escrow Payment Receipt & Tax Voucher</title>
  <style>
    body { font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif; padding: 36px; color: #0f172a; background: #ffffff; margin: 0; }
    .receipt-box { max-width: 800px; margin: auto; border: 2px solid #0c5a36; border-radius: 12px; padding: 28px; box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
    .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #0c5a36; padding-bottom: 14px; margin-bottom: 16px; }
    .title { font-size: 22px; font-weight: 800; color: #0c5a36; }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; background: #f8fafc; padding: 14px; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 13px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 13px; }
    th { background: #0c5a36; color: #ffffff; padding: 10px 12px; text-align: left; }
    td { padding: 10px 12px; border-bottom: 1px solid #e2e8f0; }
    .escrow-summary { background: #ecfdf5; border: 1.5px solid #a7f3d0; border-radius: 8px; padding: 14px; margin-bottom: 16px; font-size: 13px; }
    .footer { border-top: 1px solid #e2e8f0; padding-top: 12px; display: flex; justify-content: space-between; font-size: 11px; color: #64748b; }
  </style>
</head>
<body>
  <div class="receipt-box">
    <div class="header">
      <div>
        <div class="title">AGRINEX NODAL ESCROW • OFFICIAL PAYMENT RECEIPT</div>
        <div style="font-size: 12px; color: #64748b;">Direct Farm-Gate Procurement Clearing & Settlement Receipt</div>
      </div>
      <div style="text-align: right;">
        <div style="font-weight: 800; font-size: 15px; color: #0f172a;">${vNo}</div>
        <div style="font-size: 11px; color: #64748b;">Date: ${dt}</div>
        <div style="font-size: 11px; color: #0c5a36; font-weight: 800; margin-top: 2px;">✓ Dual-Key Escrow Protected</div>
      </div>
    </div>

    <div class="grid-2">
      <div>
        <div style="font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase;">Beneficiary Farmer</div>
        <div style="font-size: 14px; font-weight: 800; color: #0f172a;">${farmerName}</div>
        <div style="color: #64748b;">${farmerAcc}</div>
        <div style="color: #64748b;">${farmerLoc}</div>
      </div>
      <div>
        <div style="font-size: 11px; font-weight: 800; color: #64748b; text-transform: uppercase;">Payment Reference & Audit</div>
        <div>Txn ID: <strong>${txnid}</strong></div>
        <div>Bank UTR: <strong>${utr}</strong></div>
        <div>Payment Rail: <strong>${rail}</strong></div>
        <div>Cert ID: <strong>${cert}</strong></div>
      </div>
    </div>

    <table>
      <thead>
        <tr>
          <th>Commodity Description</th>
          <th>Procured Qty</th>
          <th>Agreed Rate</th>
          <th>Total Invoice Value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>${crop}</strong></td>
          <td>${qty}</td>
          <td>${rate}</td>
          <td><strong style="color: #0c5a36;">${total}</strong></td>
        </tr>
      </tbody>
    </table>

    <div class="escrow-summary">
      <div style="display: flex; justify-content: space-between; font-weight: 700; margin-bottom: 4px;">
        <span>🔒 Advance Escrow Locked (35% Nodal Deposit):</span>
        <span style="color: #0c5a36;">${adv}</span>
      </div>
      <div style="display: flex; justify-content: space-between; color: #64748b;">
        <span>⚖️ Delivery Balance (65% on Weighbridge Clearance):</span>
        <span>${bal}</span>
      </div>
    </div>

    <div class="footer">
      <div>Digitally Signed by AgriNex Nodal Clearing Trustee • ICICI Bank Escrow Division</div>
      <div>Statutory Compliant under MSAMB & Indian Contract Act</div>
    </div>
  </div>
</body>
</html>`;

  const blob = new Blob([pdfHtml], { type: 'application/pdf;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${docId || 'Payment-Receipt'}.pdf`;
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 200);

  const toastMsg = isMr
    ? `✓ पेमेंट पावती (${docId}.pdf) डाऊनलोड झाली!`
    : isHi
    ? `✓ भुगतान रसीद (${docId}.pdf) डाउनलोड हो गई!`
    : `✓ Official Payment Receipt (${docId}.pdf) downloaded successfully!`;

  if (typeof showToast === 'function') {
    showToast(toastMsg, 'success');
  }
}

function downloadDepositReceiptPdf() {
  const curLang = (window.AgriNexI18n && typeof window.AgriNexI18n.getBuyerLanguage === 'function') ? window.AgriNexI18n.getBuyerLanguage() : 'en';
  const isMr = curLang === 'mr';
  const isHi = curLang === 'hi';

  const amount = document.getElementById('receipt-deposit-amount')?.textContent || '₹ 50,000';
  const dateStr = document.getElementById('receipt-deposit-date')?.textContent || new Date().toLocaleString();
  const txn = document.getElementById('receipt-deposit-txn')?.textContent || '#TXN-ESC-2026-8812';
  const utr = document.getElementById('receipt-deposit-utr')?.textContent || 'ICIC091488129';
  const rail = document.getElementById('receipt-deposit-rail')?.textContent || 'Instant UPI (VPA)';
  const bal = document.getElementById('receipt-updated-balance')?.textContent || '₹ 1,21,400';

  const docId = txn.replace(/[^a-zA-Z0-9-_]/g, '');

  const pdfHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${docId} - AgriNex Escrow Top-Up & Deposit Certificate</title>
  <style>
    body { font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, sans-serif; padding: 36px; color: #0f172a; background: #ffffff; margin: 0; }
    .card { max-width: 680px; margin: auto; border: 2px solid #0c5a36; border-radius: 12px; padding: 28px; box-shadow: 0 4px 16px rgba(0,0,0,0.06); }
    .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #0c5a36; padding-bottom: 14px; margin-bottom: 18px; }
    .title { font-size: 20px; font-weight: 800; color: #0c5a36; }
    .amount-box { background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 8px; padding: 18px; text-align: center; margin-bottom: 18px; }
    .amount-title { font-size: 11px; font-weight: 800; color: #166534; text-transform: uppercase; }
    .amount-val { font-size: 28px; font-weight: 800; color: #0c5a36; margin-top: 4px; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; background: #f8fafc; padding: 14px; border-radius: 8px; border: 1px solid #e2e8f0; font-size: 13px; margin-bottom: 18px; }
    .footer { border-top: 1px solid #e2e8f0; padding-top: 12px; display: flex; justify-content: space-between; font-size: 11px; color: #64748b; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <div>
        <div class="title">AGRINEX NODAL ESCROW • TOP-UP RECEIPT</div>
        <div style="font-size: 12px; color: #64748b;">Buyer Working Capital Deposit Certificate</div>
      </div>
      <div style="text-align: right;">
        <div style="font-weight: 800; font-size: 14px; color: #0f172a;">${txn}</div>
        <div style="font-size: 11px; color: #64748b;">${dateStr}</div>
      </div>
    </div>

    <div class="amount-box">
      <div class="amount-title">Credited Working Capital</div>
      <div class="amount-val">${amount}</div>
      <div style="font-size: 12px; color: #15803d; font-weight: 700; margin-top: 2px;">✓ Verified in Escrow Liquidity Pool</div>
    </div>

    <div class="grid">
      <div>Transaction Ref: <strong>${txn}</strong></div>
      <div>Bank UTR: <strong>${utr}</strong></div>
      <div>Payment Rail: <strong>${rail}</strong></div>
      <div>Available Escrow Balance: <strong style="color: #0c5a36;">${bal}</strong></div>
    </div>

    <div class="footer">
      <div>Trustee: ICICI Nodal Services • Client: AGRI-BUY-4402</div>
      <div>Secured via 256-Bit Escrow Ledger</div>
    </div>
  </div>
</body>
</html>`;

  const blob = new Blob([pdfHtml], { type: 'application/pdf;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${docId || 'Escrow-Deposit'}.pdf`;
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 200);

  const toastMsg = isMr
    ? `✓ एस्क्रो ठेव पावती (${docId}.pdf) डाऊनलोड झाली!`
    : isHi
    ? `✓ एस्क्रो जमा रसीद (${docId}.pdf) डाउनलोड हो गई!`
    : `✓ Escrow Deposit Receipt (${docId}.pdf) downloaded successfully!`;

  if (typeof showToast === 'function') {
    showToast(toastMsg, 'success');
  }
}

function printDepositReceipt() {
  downloadDepositReceiptPdf();
}


// Escrow Gateway Window Bindings
window.initBuyerPayments = initBuyerPayments;
window.openEscrowPaymentGateway = openEscrowPaymentGateway;
window.closeEscrowPaymentGateway = closeEscrowPaymentGateway;
window.startGatewayUpiTimer = startGatewayUpiTimer;
window.switchGatewayRail = switchGatewayRail;
window.simulateFastUpiPay = simulateFastUpiPay;
window.copyVirtualAccountDetails = copyVirtualAccountDetails;
window.processEscrowGatewayPayment = processEscrowGatewayPayment;
window.openPaymentReceiptFromSuccess = openPaymentReceiptFromSuccess;
window.finishEscrowGatewaySuccess = finishEscrowGatewaySuccess;
window.openPaymentReceiptModal = openPaymentReceiptModal;
window.closePaymentReceiptModal = closePaymentReceiptModal;
window.openDepositEscrowModal = openDepositEscrowModal;
window.closeDepositEscrowModal = closeDepositEscrowModal;
window.setDepositAmount = setDepositAmount;
window.submitDepositEscrowCapital = submitDepositEscrowCapital;
window.setEscrowDepositRail = setEscrowDepositRail;
window.setEscrowPresetAmount = setEscrowPresetAmount;
window.updateEscrowGatewayAmount = updateEscrowGatewayAmount;
window.selectCorpBank = selectCorpBank;
window.copyEscrowField = copyEscrowField;
window.fallbackCopy = fallbackCopy;
window.handleDepositEscrowSubmit = handleDepositEscrowSubmit;
window.openDepositReceiptModalFromRow = openDepositReceiptModalFromRow;
window.closeDepositReceiptModal = closeDepositReceiptModal;
window.printDepositReceipt = printDepositReceipt;
window.downloadPaymentReceiptPdf = downloadPaymentReceiptPdf;
window.downloadDepositReceiptPdf = downloadDepositReceiptPdf;
