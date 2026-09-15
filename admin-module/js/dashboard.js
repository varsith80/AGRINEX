/**
 * AgriNex Platform Governance & Admin Center - Main Dashboard Controller
 */

document.addEventListener("DOMContentLoaded", () => {
  renderOverviewStats();
  renderEscrowClearanceQueue();
  renderAuditLogs();
});

function renderOverviewStats() {
  const stats = AgriNexAdminGovernance.getStats();
  if (!stats) return;

  const verifiedFarmersEl = document.getElementById("stat-verified-farmers");
  const registeredBuyersEl = document.getElementById("stat-registered-buyers");
  const escrowVolumeEl = document.getElementById("stat-escrow-volume");
  const openDisputesEl = document.getElementById("stat-open-disputes");

  if (verifiedFarmersEl) verifiedFarmersEl.textContent = stats.verifiedFarmers;
  if (registeredBuyersEl) registeredBuyersEl.textContent = stats.enterpriseBuyers;
  if (escrowVolumeEl) escrowVolumeEl.textContent = stats.totalEscrowLocked;
  if (openDisputesEl) openDisputesEl.textContent = stats.disputeRate + " / " + stats.disputeSLA;
}

function renderEscrowClearanceQueue(filterQuery = "") {
  const tbody = document.getElementById("admin-queue-tbody");
  if (!tbody) return;

  let cases = AgriNexAdminGovernance.getEscrowCases();

  if (filterQuery) {
    const q = filterQuery.toLowerCase();
    cases = cases.filter(c => 
      c.id.toLowerCase().includes(q) || 
      c.crop.toLowerCase().includes(q) || 
      c.farmerName.toLowerCase().includes(q) || 
      c.buyerName.toLowerCase().includes(q) ||
      c.mandi.toLowerCase().includes(q)
    );
  }

  if (cases.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 28px; color: #64748b;">
          No pending escrow clearances matching your search.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = cases.map(c => {
    const isCleared = c.status.includes("Cleared");
    const isHold = c.status.includes("Quarantined");
    
    let badgeClass = "badge-gov-pending";
    if (isCleared) badgeClass = "badge-gov-clear";
    if (isHold) badgeClass = "badge-gov-hold";

    return `
      <tr>
        <td>
          <strong style="color: #0c5a36; font-size: 0.92rem;">${c.id}</strong>
          <div style="font-size: 0.74rem; color: #64748b; margin-top: 2px;">
            <span class="badge badge-fpo" style="font-size: 0.68rem; padding: 2px 6px;">${c.type}</span>
          </div>
        </td>
        <td>
          <div style="font-weight: 700; color: #0f172a; font-size: 0.88rem;">${c.crop}</div>
          <div style="font-size: 0.76rem; color: #475569;">🧑‍🌾 ${c.farmerName} ➔ 🏢 ${c.buyerName}</div>
          <div style="font-size: 0.72rem; color: #64748b;">📍 ${c.mandi}</div>
        </td>
        <td>
          <div style="font-weight: 800; color: #15803d; font-size: 0.95rem;">${c.payoutFormatted}</div>
          <div style="font-size: 0.72rem; color: #64748b;">Total: ₹ ${c.totalContractValue.toLocaleString('en-IN')}</div>
        </td>
        <td>
          <div style="font-size: 0.78rem; font-weight: 700; color: #334155;">${c.proof}</div>
          <div style="font-size: 0.72rem; color: #0284c7;">${c.stage}</div>
        </td>
        <td>
          <span class="${badgeClass}">${c.status}</span>
          <div style="font-size: 0.7rem; color: #64748b; margin-top: 3px;">Risk: <strong>${c.riskScore}</strong></div>
        </td>
        <td>
          <div style="display: flex; gap: 6px; flex-wrap: wrap;">
            ${!isCleared ? `
              <button class="btn-gov-reject" onclick="handleHoldEscrow('${c.id}')" title="Place on Quarantine Hold">
                ⚠️ Hold
              </button>
            ` : `
              <span style="font-size: 0.76rem; color: #059669; font-weight: 800; display: inline-flex; align-items: center; gap: 4px;">
                ✓ Dual-Key Cleared
              </span>
            `}
            <button class="btn-gov-inspect" onclick="openEscrowModal('${c.id}')" title="View Full Contract Audit">
              🔍 Inspect
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

function renderAuditLogs() {
  const container = document.getElementById("audit-logs-container");
  if (!container) return;

  const logs = AgriNexAdminGovernance.getAuditLogs();
  container.innerHTML = logs.slice(0, 10).map(l => `
    <div style="display: flex; justify-content: space-between; align-items: center; background: #ffffff; border: 1px solid #f1f5f9; padding: 10px 14px; border-radius: 8px; font-size: 0.8rem; margin-bottom: 6px;">
      <div>
        <strong style="color: #0c5a36;">${l.action}</strong>
        <div style="font-size: 0.74rem; color: #64748b;">Target: <strong>${l.targetId}</strong> • Amount: <strong>${l.amount}</strong></div>
      </div>
      <div style="text-align: right;">
        <span class="badge-gov-audit">${l.actor}</span>
        <div style="font-size: 0.7rem; color: #94a3b8; font-family: monospace; margin-top: 2px;">Tx: ${l.txHash} • ${l.timestamp}</div>
      </div>
    </div>
  `).join("");
}

function handleApproveEscrow(caseId) {
  if (confirm(`Authorize Dual-Key Escrow Release for ${caseId} and dispatch RTGS/NEFT payment?`)) {
    const res = AgriNexAdminGovernance.approveEscrow(caseId);
    if (res.success) {
      renderEscrowClearanceQueue();
      renderAuditLogs();
      alert(`🎉 ${res.message}`);
    } else {
      alert(res.message);
    }
  }
}

function handleHoldEscrow(caseId) {
  const reason = prompt("Enter quarantine reason for this escrow lot (e.g. Moisture / Transit Check):", "Quality verification hold");
  if (reason) {
    const res = AgriNexAdminGovernance.holdEscrow(caseId, reason);
    if (res.success) {
      renderEscrowClearanceQueue();
      renderAuditLogs();
      alert(`⚠️ ${res.message}`);
    }
  }
}

function openEscrowModal(caseId) {
  const cases = AgriNexAdminGovernance.getEscrowCases();
  const c = cases.find(item => item.id === caseId);
  if (!c) return;

  const modal = document.getElementById("modal-escrow-inspect");
  const content = document.getElementById("modal-escrow-content");
  if (modal && content) {
    content.innerHTML = `
      <div style="padding: 20px 24px; background: linear-gradient(135deg, #0c5a36 0%, #063c22 100%); color: #ffffff; display: flex; justify-content: space-between; align-items: center; border-radius: 16px 16px 0 0;">
        <div>
          <span style="background: rgba(74, 222, 128, 0.25); color: #86efac; border: 1px solid #4ade80; font-size: 0.72rem; font-weight: 800; padding: 2px 8px; border-radius: 999px;">
            Dual-Key Escrow Ledger Case
          </span>
          <h3 style="font-size: 1.25rem; font-weight: 800; margin-top: 4px; color: #ffffff;">${c.id} - ${c.crop}</h3>
        </div>
        <button onclick="closeEscrowModal()" style="font-size: 1.5rem; color: #ffffff; background: none; border: none; cursor: pointer;">&times;</button>
      </div>

      <div style="padding: 24px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 20px;">
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px;">
            <div style="font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Beneficiary Farmer (Payee)</div>
            <div style="font-size: 1.05rem; font-weight: 800; color: #0f172a; margin-top: 2px;">${c.farmerName}</div>
            <div style="font-size: 0.8rem; color: #334155; margin-top: 4px;">Bank: <strong>${c.farmerBank}</strong></div>
            <div style="font-size: 0.76rem; color: #059669; font-weight: 700; margin-top: 2px;">Mandi Cluster: ${c.mandi}</div>
          </div>

          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px;">
            <div style="font-size: 0.75rem; font-weight: 700; color: #64748b; text-transform: uppercase;">Enterprise Corporate Buyer (Payer)</div>
            <div style="font-size: 1.05rem; font-weight: 800; color: #0f172a; margin-top: 2px;">${c.buyerName}</div>
            <div style="font-size: 0.8rem; color: #334155; margin-top: 4px;">GSTIN: <strong>${c.buyerGstin}</strong></div>
            <div style="font-size: 0.76rem; color: #0284c7; font-weight: 700; margin-top: 2px;">Escrow Deposit: 100% Locked</div>
          </div>
        </div>

        <!-- Payout Math -->
        <div style="background: #f0fdf4; border: 1.5px solid #bbf7d0; border-radius: 12px; padding: 16px; margin-bottom: 20px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 0.85rem; font-weight: 700; color: #166534;">Payout Type: <strong>${c.type}</strong></span>
            <strong style="font-size: 1.25rem; font-weight: 800; color: #15803d;">${c.payoutFormatted}</strong>
          </div>
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; font-size: 0.8rem; color: #374151;">
            <div>Contract Volume: <strong>${c.volume}</strong></div>
            <div>Total Value: <strong>₹ ${c.totalContractValue.toLocaleString('en-IN')}</strong></div>
            <div>Risk Score: <strong style="color: #166534;">${c.riskScore}</strong></div>
          </div>
        </div>

        <!-- Verification Proof -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; margin-bottom: 20px; font-size: 0.82rem;">
          <div style="font-weight: 800; color: #0f172a; margin-bottom: 4px;">📑 Cryptographic Proof & Verification Artefacts:</div>
          <div style="color: #334155;">Proof: <strong>${c.proof}</strong></div>
          <div style="color: #64748b; margin-top: 2px;">Current Stage: <strong>${c.stage}</strong></div>
          <div style="color: #059669; font-weight: 700; margin-top: 2px;">Timestamp: ${c.timestamp}</div>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 10px;">
          <button class="btn btn-outline" onclick="closeEscrowModal()">Close</button>
        </div>
      </div>
    `;
    modal.classList.add("active");
  }
}

function closeEscrowModal() {
  const modal = document.getElementById("modal-escrow-inspect");
  if (modal) modal.classList.remove("active");
}
