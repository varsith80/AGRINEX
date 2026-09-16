/**
 * AgriNex - High-Precision SVG Sparkline Charts Generator
 */

function generateSparkline(points, isPositive = true, width = 72, height = 28) {
  if (!points || points.length === 0) return '';

  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;

  const strokeColor = isPositive ? '#166534' : '#dc2626';
  const fillColor = isPositive ? 'rgba(22, 101, 52, 0.14)' : 'rgba(220, 38, 38, 0.14)';

  const pathPoints = points.map((val, idx) => {
    const x = (idx / (points.length - 1)) * (width - 6) + 3;
    const y = height - ((val - min) / range) * (height - 8) - 4;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  const linePath = `M ${pathPoints.join(' L ')}`;
  const areaPath = `M ${pathPoints[0]} L ${pathPoints.join(' L ')} L ${width - 3},${height} L 3,${height} Z`;

  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="${areaPath}" fill="${fillColor}" />
      <path d="${linePath}" stroke="${strokeColor}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `;
}

function renderMandiPrices() {
  const container = document.getElementById('mandi-sparklines-container');
  const intelContainer = document.getElementById('mandi-sparklines-intel-container');
  if (container) container.innerHTML = '';
  if (intelContainer) intelContainer.innerHTML = '';
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderMandiPrices);
} else {
  renderMandiPrices();
}

