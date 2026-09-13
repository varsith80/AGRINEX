/**
 * AgriNex Admin Governance Controller
 */

document.addEventListener("DOMContentLoaded", () => {
  renderAdminQueue();
});

function renderAdminQueue() {
  const tbody = document.getElementById("admin-queue-tbody");
  if (!tbody || !adminData || !adminData.kycAndEscrowQueue) return;

  tbody.innerHTML = adminData.kycAndEscrowQueue.map(item => `
    <tr>
      <td>
        <div style="font-weight: 800; color: #0f172a;">${item.caseId}</div>
        <div style="font-size: 0.74rem; color: #64748b;">${item.type}</div>
      </td>
      <td>
        <div style="font-weight: 700;">${item.party}</div>
        <div style="font-size: 0.74rem; color: #64748b;">Details: ${item.crop}</div>
      </td>
      <td>
        <strong style="color: #0c5a36; font-size: 0.95rem;">${item.amount}</strong>
      </td>
      <td>
        <span style="font-size: 0.82rem; font-weight: 600; color: #0284c7;">✓ ${item.proofStatus}</span>
      </td>
      <td>
        <span class="badge ${item.statusBadge}">${item.status}</span>
      </td>
      <td>
        <button class="btn btn-primary" style="font-size: 0.78rem; padding: 6px 12px; background-color: #0c5a36;" onclick="approveAdminAction('${item.caseId}')">Approve & Settle</button>
      </td>
    </tr>
  `).join("");
}

function approveAdminAction(caseId) {
  const item = adminData.kycAndEscrowQueue.find(q => q.caseId === caseId);
  if (item) {
    item.status = "Cleared & Disbursed";
    item.statusBadge = "badge-status-open";
    renderAdminQueue();
    alert(`Admin Clearance Complete: ${caseId} processed. Escrow payment disbursed to Farmer bank account.`);
  }
}
