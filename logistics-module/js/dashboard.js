/**
 * AgriNex Logistics & Fleet Module Controller
 */

document.addEventListener("DOMContentLoaded", () => {
  renderConsignments();
});

function renderConsignments() {
  const tbody = document.getElementById("logistics-tbody");
  if (!tbody || !logisticsData || !logisticsData.consignments) return;

  tbody.innerHTML = logisticsData.consignments.map(item => `
    <tr>
      <td>
        <div class="crop-cell">
          <img src="${item.image}" alt="${item.crop}" class="crop-thumb" />
          <div>
            <div class="crop-name">${item.crop}</div>
            <div style="font-size: 0.74rem; color: #64748b;">${item.orderId}</div>
          </div>
        </div>
      </td>
      <td>
        <div style="font-size: 0.84rem; font-weight: 700; color: #0f172a;">${item.farmer}</div>
        <div style="font-size: 0.74rem; color: #64748b;">To: ${item.buyer}</div>
      </td>
      <td>
        <div style="font-size: 0.84rem; font-weight: 700;">${item.vehicleNo}</div>
        <div style="font-size: 0.74rem; color: #64748b;">Driver: ${item.driver}</div>
      </td>
      <td>
        <div style="font-size: 0.82rem; font-weight: 600; color: #0c5a36;">📍 ${item.gpsMilestone}</div>
      </td>
      <td>
        <span class="badge ${item.statusBadge}">${item.status}</span>
      </td>
      <td>
        <button class="btn btn-outline" style="font-weight: 700;" onclick="alert('Telemetry Sync: ${item.orderId} telemetry active. Live GPS coordinates updated.')">Update GPS Checkpoint</button>
      </td>
    </tr>
  `).join("");
}
