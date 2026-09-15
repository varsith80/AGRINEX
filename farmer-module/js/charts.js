/**
 * AgriNex Farmer Module - Sparklines & Trend Rendering
 */

function generateSparklineSVG(points, isPositive = true) {
  const width = 65;
  const height = 24;
  const strokeColor = isPositive ? "#16a34a" : "#dc2626";
  const fillColor = isPositive ? "rgba(22, 163, 74, 0.08)" : "rgba(220, 38, 38, 0.08)";

  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;

  const coords = points.map((val, idx) => {
    const x = (idx / (points.length - 1)) * width;
    const y = height - ((val - min) / range) * (height - 8) - 4;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  // Smooth path construction
  let pathD = `M ${coords[0]}`;
  for (let i = 1; i < coords.length; i++) {
    pathD += ` L ${coords[i]}`;
  }

  const areaD = `${pathD} L ${width},${height} L 0,${height} Z`;

  return `
    <svg class="sparkline-svg" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <path d="${areaD}" fill="${fillColor}" />
      <path d="${pathD}" fill="none" stroke="${strokeColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `;
}

function renderMandiPrices() {
  const container = document.getElementById("mandi-prices-container");
  if (!container || !farmerData || !farmerData.mandiPrices) return;

  container.innerHTML = farmerData.mandiPrices.map(item => {
    const isUp = item.direction === "up";
    const arrow = isUp ? "↑" : "↓";
    const trendClass = isUp ? "trend-up" : "trend-down";
    const sparkline = generateSparklineSVG(item.trendPoints, isUp);

    return `
      <div class="mandi-row">
        <div class="mandi-crop-name">${item.crop}</div>
        <div class="mandi-price">${item.currentPrice}</div>
        <div class="mandi-trend ${trendClass}">
          <span>${arrow} ${item.trendPercent}</span>
          ${sparkline}
        </div>
      </div>
    `;
  }).join("");
}

document.addEventListener("DOMContentLoaded", renderMandiPrices);
