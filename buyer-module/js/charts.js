/**
 * AgriNex - High-Precision SVG Sparkline Charts Generator
 */

function generateSparkline(points, isPositive = true, width = 64, height = 24) {
  if (!points || points.length === 0) return '';

  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;

  const strokeColor = isPositive ? '#166534' : '#991b1b';
  const fillColor = isPositive ? 'rgba(22, 101, 52, 0.12)' : 'rgba(153, 27, 27, 0.12)';

  const pathPoints = points.map((val, idx) => {
    const x = (idx / (points.length - 1)) * (width - 4) + 2;
    const y = height - ((val - min) / range) * (height - 6) - 3;
    return `${x},${y}`;
  });

  const linePath = `M ${pathPoints.join(' L ')}`;
  const areaPath = `M ${pathPoints[0]} L ${pathPoints.join(' L ')} L ${width - 2},${height} L 2,${height} Z`;

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="${areaPath}" fill="${fillColor}" />
      <path d="${linePath}" stroke="${strokeColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `;
}

function renderMandiPrices() {
  const container = document.getElementById('mandi-sparklines-container');
  const intelContainer = document.getElementById('mandi-sparklines-intel-container');
  if (!buyerData.mandiPrices) return;

  const html = buyerData.mandiPrices
    .map((item) => {
      const isUp = item.direction === 'up';
      const sparkSvg = generateSparkline(item.trendPoints, isUp);

      return `
        <div class="mandi-item">
          <div class="mandi-info">
            <h4>${item.crop}</h4>
            <div class="mandi-price">${item.currentPrice}</div>
            <div class="${isUp ? 'mandi-trend-up' : 'mandi-trend-down'}">
              ${isUp ? '▲' : '▼'} ${item.trendPercent}
            </div>
          </div>
          <div>${sparkSvg}</div>
        </div>
      `;
    })
    .join('');

  if (container) container.innerHTML = html;
  if (intelContainer) intelContainer.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', () => {
  renderMandiPrices();
});

