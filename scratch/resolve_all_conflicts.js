const fs = require('fs');
const path = require('path');

const filesWithConflicts = [
  'server.js',
  'backend/data.json',
  'buyer-module/index.html',
  'farmer-module/profit-calculator.html',
  'farmer-module/orders-shipments.html',
  'farmer-module/my-crops.html',
  'farmer-module/market-insights.html',
  'farmer-module/js/dashboard.js',
  'farmer-module/index.html',
  'farmer-module/js/data.js',
  'farmer-module/js/emergency_sale.js',
  'farmer-module/js/fpo_hub.js',
  'farmer-module/grievance.html',
  'farmer-module/fpo-hub.html',
  'farmer-module/escrow-tracking.html',
  'farmer-module/bids-offers.html'
];

console.log('Resolving conflicts for', filesWithConflicts.length, 'files...');

for (const relPath of filesWithConflicts) {
  const fullPath = path.resolve(__dirname, '..', relPath);
  if (!fs.existsSync(fullPath)) {
    console.log('File not found:', relPath);
    continue;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  if (!content.includes('<<<<<<<')) {
    console.log('No conflict markers in:', relPath);
    continue;
  }

  console.log('Processing:', relPath);
  
  // Custom resolutions for specific files
  if (relPath === 'server.js') {
    // In server.js:
    // Conflict 1: urlPath === '/api/logistics/shipments' || urlPath === '/api/shipments'
    content = content.replace(
      /<<<<<<< HEAD[\s\S]*?\/\/ 5\. Logistics & Dispatch Fulfillment Endpoints[\s\S]*?=======[\s\S]*?\/\/ 5\. Logistics & Shipments[\s\S]*?>>>>>>> [a-f0-9]+/g,
      `    // 5. Logistics & Dispatch Fulfillment Endpoints & Shipments
    if (urlPath === '/api/logistics/shipments' || urlPath === '/api/shipments') {
      return sendJSON(res, 200, db.shipments || []);
    }`
    );

    // Conflict 2: Merge the logistics endpoints AND the admin endpoints
    content = content.replace(
      /<<<<<<< HEAD([\s\S]*?)=======([\s\S]*?)>>>>>>> [a-f0-9]+/g,
      (match, p1, p2) => {
        return p1 + '\n\n' + p2;
      }
    );
  } else if (relPath === 'backend/data.json') {
    // For backend/data.json, prefer the richer eb7b213 branch (Maharashtra dataset with Patil Rameshwar and 12 crops, plus logistics dispatch orders)
    content = content.replace(
      /<<<<<<< HEAD[\s\S]*?=======([\s\S]*?)>>>>>>> [a-f0-9]+/g,
      (match, p2) => p2
    );
  } else {
    // For HTML and JS files in farmer-module and buyer-module:
    // Prefer the newer version with rich features, or whichever side is non-empty/complete
    content = content.replace(
      /<<<<<<< HEAD([\s\S]*?)=======([\s\S]*?)>>>>>>> [a-f0-9]+/g,
      (match, p1, p2) => {
        // If one side has more code/rich content, use it, or if both have content, inspect
        if (p1.trim().length > p2.trim().length) {
          return p1;
        } else {
          return p2;
        }
      }
    );
  }

  // Double check any remaining conflict markers
  if (content.includes('<<<<<<<') || content.includes('=======' ) || content.includes('>>>>>>>')) {
    console.warn('WARNING: Remaining markers in', relPath);
    // Generic cleanup
    content = content.replace(/<<<<<<< HEAD\r?\n([\s\S]*?)\r?\n=======\r?\n([\s\S]*?)\r?\n>>>>>>> [a-f0-9]+\r?\n/g, '$2');
  }

  fs.writeFileSync(fullPath, content, 'utf8');
  console.log('Resolved:', relPath);
}

console.log('Conflict resolution step complete.');
