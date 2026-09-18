/**
 * AgriNex Admin - Marketplace Control Center Engine
 * State-Wide Mandi Governance, User Verification, Deals & Escrow Clearances,
 * Cold-Chain Logistics, Emergency Liquidation, and Dispute Tribunal Resolution
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  renderOverviewStats();
  renderDashboardQueue();
  renderDashboardWarehouses();
  renderDashboardDeliveries();
  renderUsersTable();
  renderMarketDataTable();
  renderDealsPaymentsTable();
  renderLogisticsFleetsTable();
  renderWarehouseCapacityGrid();
  renderEmergencySellGrid();
  renderGrievancesSection();
  renderReportsSection();
  renderAuditLogs();
});

/* =========================================================================
   1. NAVIGATION & ROUTING
   ========================================================================= */
function initNavigation() {
  const navItems = document.querySelectorAll(".sidebar-nav .nav-item");
  navItems.forEach(item => {
    item.addEventListener("click", (e) => {
      const section = item.getAttribute("data-section");
      if (section) {
        switchSection(section);
      }
    });
  });

  // Handle URL Hash navigation (e.g. index.html#users)
  window.addEventListener("hashchange", handleHashChange);
  handleHashChange();
}

function handleHashChange() {
  const hash = window.location.hash.replace("#", "");
  if (hash) {
    switchSection(hash, null, false);
  }
}

function switchSection(sectionId, subFilter = null, updateHash = true) {
  const targetSec = document.getElementById(`section-${sectionId}`);
  if (!targetSec) return;

  // Deactivate all sections
  document.querySelectorAll(".gov-section").forEach(sec => sec.classList.remove("active"));
  targetSec.classList.add("active");

  // Deactivate all sidebar items
  document.querySelectorAll(".sidebar-nav .nav-item").forEach(item => {
    if (item.getAttribute("data-section") === sectionId) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  if (updateHash) {
    window.location.hash = sectionId;
  }

  // Scroll to top of content smoothly
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Handle sub-filters if provided
  if (sectionId === "users" && subFilter) {
    if (subFilter === "farmers") {
      filterUsers("Farmer");
    } else if (subFilter === "buyers") {
      filterUsers("Buyer");
    } else if (subFilter === "logistics") {
      filterUsers("Logistics");
    }
  }
}

/* =========================================================================
   2. TODAY'S OVERVIEW STATS (THE 5 KEY CARDS)
   ========================================================================= */
function renderOverviewStats() {
  const stats = AgriNexAdminGovernance.getStats();
  if (!stats) return;

  // Card 1: 👨🌾 Farmers
  const farmersVerifiedEl = document.getElementById("stat-farmers-verified");
  const farmersPendingEl = document.getElementById("stat-farmers-pending");
  if (farmersVerifiedEl) farmersVerifiedEl.textContent = stats.verifiedFarmers || "14,280";
  if (farmersPendingEl) farmersPendingEl.textContent = `⚠️ ${stats.pendingFarmers || 48} Pending`;

  // Card 2: 🏢 Buyers
  const buyersVerifiedEl = document.getElementById("stat-buyers-verified");
  const buyersPendingEl = document.getElementById("stat-buyers-pending");
  if (buyersVerifiedEl) buyersVerifiedEl.textContent = stats.enterpriseBuyers || stats.verifiedBuyers || "850";
  if (buyersPendingEl) buyersPendingEl.textContent = `⚠️ ${stats.pendingBuyers || 23} Pending`;

  // Card 3: 📦 Active Deals
  const activeDealsEl = document.getElementById("stat-active-deals");
  if (activeDealsEl) activeDealsEl.textContent = stats.activeDeals || "1,420";

  // Card 4: 🚚 Active Deliveries / Logistics
  const activeDeliveriesEl = document.getElementById("stat-active-deliveries");
  if (activeDeliveriesEl) activeDeliveriesEl.textContent = stats.activeDeliveries || "312";

  // Card 5: ⚠️ Pending Actions
  const pendingActionsEl = document.getElementById("stat-pending-actions");
  const headerPendingBadge = document.getElementById("header-pending-badge");
  const pendingCount = stats.pendingActions || 14;
  if (pendingActionsEl) pendingActionsEl.textContent = pendingCount;
  if (headerPendingBadge) headerPendingBadge.textContent = pendingCount;
}

/* =========================================================================
   3. DASHBOARD HIGHLIGHTS & QUEUES
   ========================================================================= */
function renderDashboardQueue() {
  const tbody = document.getElementById("dashboard-queue-tbody");
  if (!tbody) return;

  const cases = AgriNexAdminGovernance.getEscrowCases().slice(0, 4);
  tbody.innerHTML = cases.map(c => renderEscrowRow(c)).join("");
}

function renderDashboardWarehouses() {
  const list = document.getElementById("dashboard-warehouses-list");
  if (!list) return;

  const whs = AgriNexAdminGovernance.getWarehouses().slice(0, 4);
  list.innerHTML = whs.map(w => {
    const pct = Math.round((w.occupiedMT / w.totalCapacityMT) * 100);
    const color = pct >= 85 ? '#ef4444' : pct >= 65 ? '#f59e0b' : '#10b981';
    return `
      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 12px 14px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <strong style="color: #0f172a; font-size: 0.85rem;">${w.name}</strong>
          <span style="font-size: 0.72rem; color: #64748b; font-weight: 700;">${w.district}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #334155; margin-bottom: 4px;">
          <span>Capacity (${pct}%)</span>
          <strong>${w.occupiedMT.toLocaleString()} / ${w.totalCapacityMT.toLocaleString()} MT</strong>
        </div>
        <div style="width: 100%; height: 6px; background: #e2e8f0; border-radius: 999px; overflow: hidden;">
          <div style="width: ${pct}%; height: 100%; background: ${color}; border-radius: 999px;"></div>
        </div>
      </div>
    `;
  }).join("");
}

function renderDashboardDeliveries() {
  const list = document.getElementById("dashboard-deliveries-list");
  if (!list) return;

  const dels = AgriNexAdminGovernance.getDeliveries().slice(0, 3);
  list.innerHTML = dels.map(d => `
    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 12px 14px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
        <span style="font-weight: 800; font-size: 0.8rem; color: #0284c7;">${d.id} • ${d.transporter}</span>
        <span class="badge" style="background: #e0f2fe; color: #0369a1; font-size: 0.68rem; font-weight: 800;">${d.status}</span>
      </div>
      <div style="font-size: 0.82rem; font-weight: 700; color: #0f172a;">${d.route}</div>
      <div style="display: flex; justify-content: space-between; font-size: 0.76rem; color: #64748b; margin-top: 4px;">
        <span>📦 ${d.cargo}</span>
        <strong style="color: #0284c7;">🌡️ ${d.tempStatus}</strong>
      </div>
    </div>
  `).join("");
}

/* =========================================================================
   4. USERS MANAGEMENT (FARMERS, BUYERS, LOGISTICS)
   ========================================================================= */
function renderUsersTable(filterCategory = "all") {
  const tbody = document.getElementById("users-table-tbody");
  if (!tbody) return;

  let users = AgriNexAdminGovernance.getUsers();

  if (filterCategory === "Pending") {
    users = users.filter(u => u.status.includes("Pending"));
  } else if (filterCategory !== "all") {
    users = users.filter(u => u.category === filterCategory);
  }

  if (users.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 28px; color: #64748b;">
          No users found in this category.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = users.map(u => {
    const isPending = u.status.includes("Pending");
    let categoryBadge = "";
    if (u.category === "Farmer") {
      categoryBadge = `<span class="badge" style="background: #dcfce7; color: #166534; font-size: 0.72rem; font-weight: 800;">👨🌾 Farmer</span>`;
    } else if (u.category === "Buyer") {
      categoryBadge = `<span class="badge" style="background: #e0f2fe; color: #0369a1; font-size: 0.72rem; font-weight: 800;">🏢 Buyer</span>`;
    } else if (u.category === "Logistics") {
      categoryBadge = `<span class="badge" style="background: #fef3c7; color: #92400e; font-size: 0.72rem; font-weight: 800;">🚚 Logistics</span>`;
    } else {
      categoryBadge = `<span class="badge" style="background: #f1f5f9; color: #334155; font-size: 0.72rem; font-weight: 800;">${u.category}</span>`;
    }

    const statusBadge = isPending
      ? `<span class="badge-gov-pending">⚠️ ${u.status}</span>`
      : `<span class="badge-gov-clear">✓ Verified</span>`;

    return `
      <tr>
        <td>
          <div style="display: flex; align-items: center; gap: 10px;">
            <img src="${u.avatar}" alt="${u.name}" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover; border: 1.5px solid #cbd5e1;" />
            <div>
              <strong style="color: #0f172a; font-size: 0.9rem;">${u.name}</strong>
              <div style="font-size: 0.72rem; color: #64748b;">${u.id} • ${u.phone}</div>
            </div>
          </div>
        </td>
        <td>${categoryBadge}</td>
        <td>
          <div style="font-size: 0.82rem; font-weight: 700; color: #334155;">${u.location}</div>
          <div style="font-size: 0.72rem; color: #64748b;">Joined: ${u.joinedDate}</div>
        </td>
        <td>
          <div style="font-size: 0.82rem; color: #0f172a; font-weight: 600;">${u.crops || u.businessType || 'General Produce'}</div>
          ${u.creditLimit ? `<div style="font-size: 0.72rem; color: #059669; font-weight: 700;">Credit: ${u.creditLimit}</div>` : ''}
        </td>
        <td>
          <div style="font-size: 0.78rem; font-weight: 700; color: #334155;">${u.kycDoc}</div>
          ${u.gstin ? `<div style="font-size: 0.7rem; color: #64748b; font-family: monospace;">GSTIN: ${u.gstin}</div>` : ''}
        </td>
        <td>
          ${statusBadge}
          <div style="font-size: 0.7rem; color: #64748b; margin-top: 2px;">Risk: <strong>${u.riskScore}</strong></div>
        </td>
        <td>
          <div style="display: flex; gap: 6px; flex-wrap: wrap;">
            ${isPending ? `
              <button class="btn-gov-approve" onclick="handleApproveUser('${u.id}')" title="Approve KYC Authentication">
                ✓ Approve
              </button>
            ` : `
              <span style="font-size: 0.74rem; color: #059669; font-weight: 800;">✓ Active</span>
            `}
            <button class="btn-gov-inspect" onclick="openUserKycModal('${u.id}')">
              🔍 Inspect
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join("");
}

function filterUsers(category, el = null) {
  if (el) {
    document.querySelectorAll(".filter-pills-bar .filter-pill").forEach(p => p.classList.remove("active"));
    el.classList.add("active");
  } else {
    document.querySelectorAll(".filter-pills-bar .filter-pill").forEach(p => {
      const text = p.textContent.toLowerCase();
      if ((category === "all" && text.includes("all")) ||
          (category === "Farmer" && text.includes("farmer")) ||
          (category === "Buyer" && text.includes("buyer")) ||
          (category === "Logistics" && text.includes("logistic")) ||
          (category === "Pending" && text.includes("pending"))) {
        p.classList.add("active");
      } else {
        p.classList.remove("active");
      }
    });
  }
  renderUsersTable(category);
}

function handleApproveUser(userId) {
  if (confirm(`Approve KYC & authorize trading credentials for ${userId}?`)) {
    const res = AgriNexAdminGovernance.approveUser(userId);
    if (res.success) {
      renderUsersTable();
      renderOverviewStats();
      renderAuditLogs();
      alert(`🎉 ${res.message}`);
    } else {
      alert(res.message);
    }
  }
}

function openUserKycModal(userId) {
  const users = AgriNexAdminGovernance.getUsers();
  const u = users.find(x => x.id === userId);
  if (!u) return;

  const modal = document.getElementById("modal-user-kyc");
  const content = document.getElementById("modal-user-content");
  if (!modal || !content) return;

  content.innerHTML = `
    <div style="padding: 20px 24px; background: linear-gradient(135deg, #0c5a36 0%, #063c22 100%); color: #ffffff; display: flex; justify-content: space-between; align-items: center; border-radius: 16px 16px 0 0;">
      <div>
        <span style="background: rgba(255,255,255,0.2); color: #ffffff; font-size: 0.72rem; font-weight: 800; padding: 2px 8px; border-radius: 999px;">
          KYC Compliance Record
        </span>
        <h3 style="font-size: 1.25rem; font-weight: 800; margin-top: 4px; color: #ffffff;">${u.name}</h3>
      </div>
      <button onclick="closeUserKycModal()" style="font-size: 1.5rem; color: #ffffff; background: none; border: none; cursor: pointer;">&times;</button>
    </div>

    <div style="padding: 22px;">
      <div style="display: flex; gap: 14px; align-items: center; margin-bottom: 16px;">
        <img src="${u.avatar}" alt="${u.name}" style="width: 56px; height: 56px; border-radius: 50%; object-fit: cover; border: 2px solid #059669;" />
        <div>
          <div style="font-size: 1.1rem; font-weight: 800; color: #0f172a;">${u.name}</div>
          <div style="font-size: 0.8rem; color: #64748b;">${u.category} • ${u.location} • ID: ${u.id}</div>
        </div>
      </div>

      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; margin-bottom: 16px; font-size: 0.82rem;">
        <div style="font-weight: 800; color: #0f172a; margin-bottom: 6px;">📑 Uploaded Legal Credentials:</div>
        <div style="color: #334155; margin-bottom: 4px;">Verified Record: <strong>${u.kycDoc}</strong></div>
        ${u.gstin ? `<div style="color: #334155; margin-bottom: 4px;">Registered GSTIN: <strong>${u.gstin}</strong></div>` : ''}
        ${u.creditLimit ? `<div style="color: #059669; font-weight: 700;">Approved Working Credit: ${u.creditLimit}</div>` : ''}
        <div style="color: #64748b; margin-top: 4px;">Current Status: <strong>${u.status}</strong> (Risk: ${u.riskScore})</div>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 10px;">
        <button class="btn btn-outline" onclick="closeUserKycModal()">Close</button>
        ${u.status.includes("Pending") ? `
          <button class="btn btn-primary" onclick="handleApproveUser('${u.id}'); closeUserKycModal();">
            ✓ Approve KYC Document
          </button>
        ` : ''}
      </div>
    </div>
  `;

  modal.classList.add("active");
}

function closeUserKycModal() {
  const modal = document.getElementById("modal-user-kyc");
  if (modal) modal.classList.remove("active");
}

/* =========================================================================
   5. MARKET DATA (28 MAHARASHTRA COMMODITIES)
   ========================================================================= */
function renderMarketDataTable(filterQuery = "") {
  const tbody = document.getElementById("market-data-tbody");
  if (!tbody) return;

  let crops = AgriNexAdminGovernance.getMandiPrices();

  if (filterQuery) {
    const q = filterQuery.toLowerCase();
    crops = crops.filter(c => c.crop.toLowerCase().includes(q) || c.keyMandis.toLowerCase().includes(q));
  }

  tbody.innerHTML = crops.map(c => `
    <tr>
      <td>
        <strong style="color: #0f172a; font-size: 0.9rem;">${c.crop}</strong>
        <div style="font-size: 0.72rem; color: #64748b; font-family: monospace;">${c.id}</div>
      </td>
      <td>
        <div style="font-weight: 800; color: #059669; font-size: 0.9rem;">₹ ${c.msp.toFixed(2)} / kg</div>
        <div style="font-size: 0.7rem; color: #166534;">Statutory Floor</div>
      </td>
      <td>
        <div style="font-weight: 800; color: #0284c7; font-size: 0.92rem;">₹ ${c.modalPrice.toFixed(2)} / kg</div>
        <div style="font-size: 0.7rem; color: #64748b;">Live APMC Modal</div>
      </td>
      <td>
        <div style="font-weight: 700; color: #dc2626; font-size: 0.88rem;">₹ ${c.ceilingCap.toFixed(2)} / kg</div>
        <div style="font-size: 0.7rem; color: #64748b;">Anti-Hoarding Cap</div>
      </td>
      <td>
        <span class="badge" style="background: #f1f5f9; color: #334155; font-size: 0.74rem; font-weight: 700;">
          ${c.marketTrend}
        </span>
      </td>
      <td style="font-size: 0.78rem; color: #475569;">${c.keyMandis}</td>
      <td>
        <button class="btn-gov-inspect" onclick="promptPriceEdit('${c.id}', '${c.crop}', ${c.modalPrice})" style="font-size: 0.76rem; padding: 5px 10px;">
          ✏️ Edit Modal
        </button>
      </td>
    </tr>
  `).join("");
}

function filterMarketData(query) {
  renderMarketDataTable(query);
}

function promptPriceEdit(cropId, cropName, currentPrice) {
  const newPrice = prompt(`Enter updated APMC modal benchmark price for ${cropName} (current: ₹${currentPrice}/kg):`, currentPrice);
  if (newPrice) {
    const res = AgriNexAdminGovernance.updateMandiPrice(cropId, newPrice);
    if (res.success) {
      renderMarketDataTable();
      renderAuditLogs();
      alert(`🎉 ${res.message}`);
    } else {
      alert(res.message);
    }
  }
}

/* =========================================================================
   6. DEALS & PAYMENTS (DUAL-KEY ESCROW LEDGER)
   ========================================================================= */
function renderDealsPaymentsTable() {
  const tbody = document.getElementById("deals-payments-tbody");
  if (!tbody) return;

  const cases = AgriNexAdminGovernance.getEscrowCases();
  tbody.innerHTML = cases.map(c => renderEscrowRow(c)).join("");
}

function renderEscrowRow(c) {
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
        <div style="font-size: 0.72rem; color: #64748b;">Total Value: ₹ ${c.totalContractValue.toLocaleString('en-IN')}</div>
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
            <button class="btn-gov-approve" onclick="handleApproveEscrow('${c.id}')" title="Authorize Dual-Key Bank Payout">
              ✓ Clear
            </button>
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
}

function handleApproveEscrow(caseId) {
  if (confirm(`Authorize Dual-Key Escrow Release for ${caseId} and dispatch RTGS/NEFT payment?`)) {
    const res = AgriNexAdminGovernance.approveEscrow(caseId);
    if (res.success) {
      renderDashboardQueue();
      renderDealsPaymentsTable();
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
      renderDashboardQueue();
      renderDealsPaymentsTable();
      renderAuditLogs();
      alert(`⚠️ ${res.message}`);
    }
  }
}

function openEscrowModal(caseId) {
  const cases = AgriNexAdminGovernance.getEscrowCases();
  const c = cases.find(item => item.id === caseId);
  if (!c) return;

  const telemetry = AgriNexAdminGovernance.getColdChainTelemetry(caseId);

  let telemetryHtml = "";
  if (telemetry) {
    telemetryHtml = `
      <div style="background: #f0f9ff; border: 1.5px solid #bae6fd; border-radius: 12px; padding: 14px; margin-bottom: 20px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <span style="font-size: 0.85rem; font-weight: 800; color: #0369a1; display: flex; align-items: center; gap: 6px;">
            ❄️ Real-Time IoT Cold-Chain Transport Telemetry
          </span>
          <span class="badge" style="background: #e0f2fe; color: #0369a1; border: 1px solid #7dd3fc; font-size: 0.72rem; font-weight: 800;">
            Reefer #${telemetry.reeferId}
          </span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; font-size: 0.78rem; color: #334155; margin-bottom: 10px;">
          <div>Driver: <strong>${telemetry.driverName}</strong></div>
          <div>Current Temp: <strong style="color: #0284c7;">${telemetry.currentTemp}°C</strong> (Target: ${telemetry.targetTemp}°C)</div>
          <div>Status: <strong style="color: #b45309;">${telemetry.status}</strong></div>
        </div>

        <div style="font-size: 0.76rem; font-weight: 700; color: #475569; margin-bottom: 4px;">📍 Route Waypoint Telemetry Log:</div>
        <div style="display: flex; flex-direction: column; gap: 4px; font-size: 0.74rem;">
          ${telemetry.routeWaypoints.map(w => `
            <div style="display: flex; justify-content: space-between; background: #ffffff; padding: 6px 10px; border-radius: 6px; border: 1px solid #e0f2fe;">
              <span>📍 ${w.location} (${w.timestamp})</span>
              <span>Temp: <strong>${w.temp}°C</strong> — <em style="color: #0284c7;">${w.status}</em></span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

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

        ${telemetryHtml}

        <!-- Verification Proof -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; margin-bottom: 20px; font-size: 0.82rem;">
          <div style="font-weight: 800; color: #0f172a; margin-bottom: 4px;">📑 Cryptographic Proof & Verification Artefacts:</div>
          <div style="color: #334155;">Proof: <strong>${c.proof}</strong></div>
          <div style="color: #64748b; margin-top: 2px;">Current Stage: <strong>${c.stage}</strong></div>
          <div style="color: #059669; font-weight: 700; margin-top: 2px;">Timestamp: ${c.timestamp}</div>
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 10px;">
          <button class="btn btn-outline" onclick="closeEscrowModal()">Close</button>
          ${!c.status.includes("Cleared") ? `
            <button class="btn btn-primary" onclick="handleApproveEscrow('${c.id}'); closeEscrowModal();">
              ✓ Authorize Dual-Key Payout
            </button>
          ` : ''}
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

/* =========================================================================
   7. LOGISTICS & STORAGE FLEETS TABLE
   ========================================================================= */
function renderLogisticsFleetsTable() {
  const tbody = document.getElementById("logistics-fleets-tbody");
  if (!tbody) return;

  const deliveries = AgriNexAdminGovernance.getActiveDeliveries();
  tbody.innerHTML = deliveries.map(d => `
    <tr>
      <td>
        <strong style="color: #0f172a; font-size: 0.9rem;">${d.id}</strong>
        <div style="font-size: 0.74rem; color: #64748b;">${d.vehicleNo}</div>
        <span class="badge" style="background: #f1f5f9; color: #334155; font-size: 0.68rem; margin-top: 3px;">${d.vehicleType}</span>
      </td>
      <td>
        <div style="font-weight: 700; color: #0f172a; font-size: 0.84rem;">${d.driver}</div>
      </td>
      <td>
        <div style="font-weight: 700; color: #166534; font-size: 0.86rem;">${d.cargo}</div>
      </td>
      <td>
        <div style="font-size: 0.82rem; color: #334155;">📍 ${d.origin}</div>
        <div style="font-size: 0.76rem; color: #0284c7; font-weight: 700;">➔ ${d.destination}</div>
      </td>
      <td>
        <div style="font-weight: 800; color: #0284c7; font-size: 0.88rem;">🌡️ ${d.tempStatus}</div>
        <div style="font-size: 0.7rem; color: #64748b;">GPS: ${d.gpsStatus}</div>
      </td>
      <td>
        <div style="display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 700; margin-bottom: 2px;">
          <span>ETA: ${d.eta}</span>
          <span>${d.progressPct}%</span>
        </div>
        <div style="width: 100%; height: 6px; background: #e2e8f0; border-radius: 3px; overflow: hidden;">
          <div style="width: ${d.progressPct}%; height: 100%; background: #059669;"></div>
        </div>
      </td>
    </tr>
  `).join("");
}

function renderWarehouseCapacityGrid() {
  const container = document.getElementById("warehouse-capacity-grid");
  if (!container) return;

  const warehouses = AgriNexAdminGovernance.getWarehouses();
  if (!warehouses || warehouses.length === 0) return;

  container.innerHTML = warehouses.map(w => {
    let barColor = "#059669";
    if (w.occupiedPct >= 85) barColor = "#dc2626";
    else if (w.occupiedPct >= 75) barColor = "#d97706";

    return `
      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.03);">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
          <div>
            <strong style="font-size: 0.92rem; color: #0f172a;">${w.name}</strong>
            <div style="font-size: 0.76rem; color: #64748b;">📍 ${w.location} • Mgr: ${w.manager}</div>
          </div>
          <span class="badge" style="background: #f1f5f9; color: #334155; font-size: 0.7rem; font-weight: 700; padding: 2px 8px;">
            ${w.id}
          </span>
        </div>

        <div style="margin: 10px 0 6px;">
          <div style="display: flex; justify-content: space-between; font-size: 0.78rem; font-weight: 700; color: #334155; margin-bottom: 4px;">
            <span>Occupancy: ${w.occupiedCapacity.toLocaleString()} / ${w.totalCapacity.toLocaleString()} MT</span>
            <span style="color: ${barColor};">${w.occupiedPct}% Occupied</span>
          </div>
          <div style="width: 100%; height: 8px; background: #e2e8f0; border-radius: 4px; overflow: hidden;">
            <div style="width: ${w.occupiedPct}%; height: 100%; background: ${barColor}; transition: width 0.3s ease;"></div>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; color: #475569; margin-top: 10px; background: #f8fafc; padding: 6px 10px; border-radius: 6px;">
          <span>🌾 Produce: <strong>${w.primaryCrops}</strong></span>
          <span>🌡️ Temp: <strong style="color: #0284c7;">${w.tempRange}</strong></span>
        </div>
      </div>
    `;
  }).join("");
}

/* =========================================================================
   8. EMERGENCY SELL GRID
   ========================================================================= */
function renderEmergencySellGrid() {
  const container = document.getElementById("emergency-sell-grid");
  if (!container) return;

  const lots = AgriNexAdminGovernance.getEmergencySellLots();
  container.innerHTML = lots.map(l => `
    <div class="emergency-card">
      <div>
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 6px;">
          <span class="badge" style="background: #fee2e2; color: #b91c1c; font-weight: 800; font-size: 0.72rem; border: 1px solid #fca5a5;">
            ⏳ ${l.shelfLifeLeft}
          </span>
          <span style="font-size: 0.76rem; color: #64748b; font-family: monospace;">${l.id}</span>
        </div>

        <h3 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin: 4px 0 2px;">${l.crop}</h3>
        <div style="font-size: 0.8rem; color: #475569;">Volume: <strong>${l.volume}</strong> • Mandi: <strong>${l.mandi}</strong></div>
        <div style="font-size: 0.75rem; color: #64748b; margin-top: 2px;">Farmer: 🧑‍🌾 ${l.farmer}</div>

        <div style="background: #fff5f5; border: 1px solid #fecaca; border-radius: 8px; padding: 10px; margin: 12px 0;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 0.76rem; color: #64748b; text-decoration: line-through;">Original: ${l.originalPrice}</span>
            <span style="font-size: 0.76rem; color: #dc2626; font-weight: 800;">${l.discountPct} Flash Cut</span>
          </div>
          <div style="font-size: 1.35rem; font-weight: 900; color: #b91c1c; margin-top: 2px;">
            ${l.distressPrice}
          </div>
          <div style="font-size: 0.72rem; color: #7f1d1d; margin-top: 4px;">Reason: ${l.reason}</div>
        </div>

        <div style="font-size: 0.74rem; color: #0369a1; background: #f0f9ff; padding: 6px 10px; border-radius: 6px; margin-bottom: 12px;">
          ❄️ Allocated Storage: <strong>${l.allocatedColdStorage}</strong>
        </div>
      </div>

      <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f1f5f9; padding-top: 12px;">
        <span style="font-size: 0.74rem; color: #059669; font-weight: 700;">Status: ${l.status}</span>
        <button class="btn btn-primary btn-sm" onclick="handleBroadcastEmergency('${l.id}')" style="background: #dc2626; border-color: #dc2626; font-size: 0.78rem; padding: 6px 12px;">
          ⚡ Broadcast to 850 Buyers
        </button>
      </div>
    </div>
  `).join("");
}

function handleBroadcastEmergency(lotId) {
  const res = AgriNexAdminGovernance.broadcastEmergencyLot(lotId);
  if (res.success) {
    renderEmergencySellGrid();
    renderAuditLogs();
    alert(`📢 ${res.message}`);
  }
}

/* =========================================================================
   9. GRIEVANCES & ARBITRATION TRIBUNAL
   ========================================================================= */
function renderGrievancesSection() {
  const container = document.getElementById("grievances-container");
  if (!container) return;

  const cases = AgriNexAdminGovernance.getGrievances();
  container.innerHTML = cases.map(g => {
    const isSettled = g.status.includes("Settled");

    return `
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 18px; margin-bottom: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 8px; margin-bottom: 8px;">
          <div>
            <span class="badge" style="background: #f3e8ff; color: #7e22ce; font-weight: 800; font-size: 0.72rem; border: 1px solid #e9d5ff;">
              ${g.ticketId}
            </span>
            <h4 style="font-size: 1.05rem; font-weight: 800; color: #0f172a; margin: 4px 0 2px;">${g.title}</h4>
            <div style="font-size: 0.78rem; color: #64748b;">Counterparties: 🧑‍🌾 ${g.farmer} vs 🏢 ${g.buyer}</div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 1.15rem; font-weight: 800; color: #b91c1c;">${g.disputedFormatted}</div>
            <span class="badge ${isSettled ? 'badge-gov-clear' : 'badge-gov-hold'}">${g.status}</span>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 0.78rem; background: #ffffff; padding: 12px; border-radius: 8px; border: 1px solid #e2e8f0; margin: 10px 0;">
          <div><strong>Farmer Claim:</strong> <span style="color: #334155;">${g.farmerClaim}</span></div>
          <div><strong>Buyer Claim:</strong> <span style="color: #334155;">${g.buyerClaim}</span></div>
        </div>

        <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 10px; font-size: 0.76rem; color: #065f46; margin-bottom: 12px;">
          <strong>⚖️ Proposed Tribunal Award:</strong> ${g.proposedResolution}
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 8px;">
          ${!isSettled ? `
            <button class="btn btn-primary btn-sm" onclick="handleFastTrackArbitration('${g.ticketId}')" style="background: #059669; border-color: #059669; font-size: 0.78rem; padding: 6px 14px;">
              ⚡ Fast-Track Auto-Arbitrate & Award
            </button>
          ` : `
            <span style="font-size: 0.78rem; color: #059669; font-weight: 800;">✓ Legally Enforced by Mandi Tribunal</span>
          `}
        </div>
      </div>
    `;
  }).join("");
}

function handleFastTrackArbitration(ticketId) {
  if (confirm(`Enforce binding Tribunal award for dispute ticket ${ticketId}?`)) {
    const res = AgriNexAdminGovernance.evaluateFastTrackAutoArbitration(ticketId);
    if (res.success) {
      renderGrievancesSection();
      renderOverviewStats();
      renderAuditLogs();
      alert(`⚖️ ${res.message}`);
    } else {
      alert(res.message);
    }
  }
}

/* =========================================================================
   10. REPORTS & AUDIT TRAIL
   ========================================================================= */
function renderReportsSection() {
  const container = document.getElementById("reports-audit-container");
  if (!container) return;

  const logs = AgriNexAdminGovernance.getAuditLogs();
  container.innerHTML = `
    <div class="listings-table-container">
      <table class="data-table">
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Governance Action</th>
            <th>Target & Value</th>
            <th>Authorized Officer</th>
            <th>Tx Cryptographic Hash</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${logs.map(l => `
            <tr>
              <td style="font-size: 0.78rem; color: #64748b;">${l.timestamp}</td>
              <td style="font-weight: 700; color: #0c5a36; font-size: 0.85rem;">${l.action}</td>
              <td style="font-size: 0.8rem; color: #334155;">
                <strong>${l.targetId}</strong>
                <div style="color: #059669; font-weight: 700;">${l.amount}</div>
              </td>
              <td style="font-size: 0.78rem; color: #334155;">${l.actor}</td>
              <td style="font-family: monospace; font-size: 0.72rem; color: #6b21a8;">${l.txHash}</td>
              <td><span class="badge-gov-clear">${l.status}</span></td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderAuditLogs() {
  const container = document.getElementById("audit-logs-container");
  if (!container) return;

  const logs = AgriNexAdminGovernance.getAuditLogs();
  container.innerHTML = logs.slice(0, 8).map(l => `
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

/* =========================================================================
   11. PENDING ACTIONS TRIAGE MODAL
   ========================================================================= */
function openPendingActionsModal() {
  const modal = document.getElementById("modal-pending-actions");
  const container = document.getElementById("pending-actions-list-container");
  if (!modal || !container) return;

  const actions = AgriNexAdminGovernance.getPendingActions();
  if (actions.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 32px; color: #059669; font-weight: 700;">
        🎉 All pending governance actions have been triaged and resolved!
      </div>
    `;
  } else {
    container.innerHTML = actions.map(a => `
      <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 16px; display: flex; justify-content: space-between; align-items: center; gap: 12px;">
        <div>
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 3px;">
            <span class="badge ${a.badgeClass}" style="font-size: 0.68rem; font-weight: 800;">${a.category}</span>
            <strong style="font-size: 0.88rem; color: #0f172a;">${a.title}</strong>
          </div>
          <div style="font-size: 0.78rem; color: #475569;">${a.entity}</div>
          <div style="font-size: 0.74rem; color: #059669; font-weight: 700; margin-top: 2px;">${a.amount} • <span style="color: #b91c1c;">${a.urgency}</span></div>
        </div>
        <button class="btn btn-primary btn-sm" onclick="handleResolveAction('${a.id}')" style="font-size: 0.78rem; padding: 6px 14px; white-space: nowrap;">
          ✓ Resolve Now
        </button>
      </div>
    `).join("");
  }

  modal.classList.add("active");
}

function closePendingActionsModal() {
  const modal = document.getElementById("modal-pending-actions");
  if (modal) modal.classList.remove("active");
}

function handleResolveAction(actionId) {
  const res = AgriNexAdminGovernance.resolvePendingAction(actionId);
  if (res.success) {
    openPendingActionsModal();
    renderOverviewStats();
    renderDashboardQueue();
    renderUsersTable();
    renderGrievancesSection();
    renderEmergencySellGrid();
    renderAuditLogs();
    alert(`🎉 ${res.message}`);
  }
}

/* =========================================================================
   12. GLOBAL SEARCH
   ========================================================================= */
function handleGlobalSearch(query) {
  if (!query || query.trim() === "") {
    renderDashboardQueue();
    renderUsersTable();
    renderMarketDataTable();
    return;
  }

  const q = query.toLowerCase().trim();

  // If user searched a commodity, filter market data
  renderMarketDataTable(q);

  // Filter users table
  const users = AgriNexAdminGovernance.getUsers().filter(u => 
    u.name.toLowerCase().includes(q) || 
    u.location.toLowerCase().includes(q) || 
    (u.crops && u.crops.toLowerCase().includes(q))
  );
  const userTbody = document.getElementById("users-table-tbody");
  if (userTbody && users.length > 0) {
    userTbody.innerHTML = users.map(u => renderUserRowHtml(u)).join("");
  }

  // Filter escrow cases
  const cases = AgriNexAdminGovernance.getEscrowCases().filter(c =>
    c.id.toLowerCase().includes(q) ||
    c.crop.toLowerCase().includes(q) ||
    c.farmerName.toLowerCase().includes(q) ||
    c.buyerName.toLowerCase().includes(q)
  );
  const queueTbody = document.getElementById("dashboard-queue-tbody");
  if (queueTbody) {
    queueTbody.innerHTML = cases.map(c => renderEscrowRow(c)).join("");
  }
}
