/**
 * AgriNex Buyer Module - Enterprise Intelligence & Sourcing Suite
 * Features:
 * 1. AI Sourcing Copilot & Arbitrage Hunter
 * 2. Enterprise Digital Purchase Order (PO) & Tax Invoice Generator
 * 3. Side-by-Side Multi-Lot Comparative Matrix
 * 4. Live GPS Fleet & Reefer Cold-Chain Telemetry Visualizer
 * 5. Interactive 2D Warehouse Chamber & Silo Slot Visualizer
 */

(function () {
  'use strict';

  const showToast = (msg, type) => (typeof window !== 'undefined' && typeof window.showToast === 'function') ? window.showToast(msg, type) : console.log('[Toast]', msg);

  // State Management
  const selectedCompareLots = new Set();

  // =========================================================================
  // 1. AI SOURCING COPILOT & ARBITRAGE HUNTER
  // =========================================================================

  const COPILOT_KNOWLEDGE = [
    {
      keywords: ["onion", "lasalgaon", "garwa", "kanda", "export onion"],
      cropKey: "onion",
      title: "🧅 Lasalgaon Red Onion Sourcing Advisory",
      recommendation: "Lasalgaon APMC modal price is ₹ 18.50 /kg. Farm-gate verified lots are available at ₹ 18.00 /kg with 96% Grade A export assay. Sourcing direct saves ₹ 3.50 /kg vs Vashi APMC middleman terminal.",
      matchedLotIds: ["LOT-ONI-01", "LOT-ONI-02"],
      arbitrageSpread: "+16.3% Margin Advantage",
      optimalWindow: "Next 48 Hours before export quota rush"
    },
    {
      keywords: ["tomato", "narayangaon", "shivam", "tamatar", "junnar"],
      cropKey: "tomato",
      title: "🍅 Narayangaon Hybrid Tomato Sourcing Advisory",
      recommendation: "High arrival volumes in Junnar/Narayangaon belt (6,200 Qt today). Farm-gate lots offered at ₹ 12.00 /kg with 94% firmness. Vashi terminal selling at ₹ 14.50 /kg.",
      matchedLotIds: ["LOT-TOM-88", "LOT-TOM-89"],
      arbitrageSpread: "+17.2% Margin Advantage",
      optimalWindow: "Immediate procurement (Heavy harvest inflow)"
    },
    {
      keywords: ["banana", "jalgaon", "raver", "grand naine", "kela"],
      cropKey: "banana",
      title: "🍌 Khandesh Grand Naine Banana Advisory",
      recommendation: "Raver APMC benchmark is ₹ 14.80 /kg. Farm-gate export cluster offering 150 Qt at ₹ 14.20 /kg with automated ethylene ripening chambers available at Jalgaon hub.",
      matchedLotIds: ["LOT-BAN-03"],
      arbitrageSpread: "+14.5% Margin Advantage",
      optimalWindow: "3–5 Days lead time recommended"
    },
    {
      keywords: ["soybean", "latur", "js-335", "oilseed", "pulse"],
      cropKey: "soybean",
      title: "🌱 Latur Yellow Soybean & Hermetic Silos Advisory",
      recommendation: "Latur Mega Yard trading JS-335 at ₹ 44.50 /kg. Direct FPO procurement at ₹ 41.50 /kg with max 9.5% moisture assay. Eligible for 70% WDRA e-NWR pledge loan at 6.8% p.a.",
      matchedLotIds: ["LOT-SOY-04"],
      arbitrageSpread: "+12.8% Margin Advantage",
      optimalWindow: "Store in Latur Silo for post-harvest peak"
    },
    {
      keywords: ["orange", "nagpur", "santra", "katol", "citrus"],
      cropKey: "orange",
      title: "🍊 Nagpur Mandarin Orange Sourcing Advisory",
      recommendation: "Katol APMC modal rate is ₹ 39.50 /kg. GI-tagged Nagpur Santra lots available at ₹ 37.50 /kg with Brix > 10.5%. Direct refrigerated transit to Vashi terminal takes 14 hours.",
      matchedLotIds: ["LOT-ORG-05"],
      arbitrageSpread: "+15.0% Margin Advantage",
      optimalWindow: "Book dedicated reefer fleet today"
    },
    {
      keywords: ["emergency", "salvage", "discount", "processing", "puree", "urgent"],
      cropKey: "emergency",
      title: "🚨 Emergency Breakeven Salvage Opportunities",
      recommendation: "4 emergency harvest lots are active with 24–48 hr urgency. Best buyouts: Narayangaon Tomato at ₹ 9.20 /kg (Orig: ₹ 14.00 /kg) and Nashik Onion at ₹ 12.50 /kg. Ideal for food processors and commercial caterers.",
      matchedLotIds: ["LOT-EMG-TOM-01", "LOT-EMG-ONI-02"],
      arbitrageSpread: "Up to 38% Salvage Discount",
      optimalWindow: "Instant buyout before shelf-life expiry"
    }
  ];

  function openCopilotModal() {
    const modal = document.getElementById('modal-ai-copilot');
    if (modal) {
      modal.classList.add('active');
      renderCopilotDefault();
    }
  }

  function closeCopilotModal() {
    const modal = document.getElementById('modal-ai-copilot');
    if (modal) modal.classList.remove('active');
  }

  function renderCopilotDefault() {
    const container = document.getElementById('copilot-response-container');
    if (!container) return;

    container.innerHTML = `
      <div style="background: #f8fafc; border: 1.5px dashed #cbd5e1; border-radius: 12px; padding: 24px; text-align: center;">
        <div style="font-size: 2.4rem; margin-bottom: 8px;">🤖</div>
        <strong style="font-size: 1.05rem; color: #0f172a; display: block;">AgriNex AI Institutional Procurement Assistant</strong>
        <p style="font-size: 0.82rem; color: #64748b; margin: 6px auto 16px auto; max-width: 480px;">
          Ask for real-time Maharashtra APMC arbitrage spreads, lowest landed freight costs, farmer quality assays, or salvage procurement deals.
        </p>
        <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
          <button class="copilot-chip" onclick="askCopilot('Best Onion Arbitrage in Lasalgaon')">🧅 Onion Arbitrage (Lasalgaon)</button>
          <button class="copilot-chip" onclick="askCopilot('High Grade Tomato Narayangaon under 14/kg')">🍅 Tomato Lots (Narayangaon)</button>
          <button class="copilot-chip" onclick="askCopilot('Emergency Salvage processing deals')">🚨 Salvage Lots (30%+ Off)</button>
          <button class="copilot-chip" onclick="askCopilot('Latur Soybean Silos e-NWR')">🌱 Soybean & Silos (Latur)</button>
        </div>
      </div>
    `;
  }

  function askCopilot(queryText) {
    const input = document.getElementById('copilot-query-input');
    if (input) input.value = queryText;
    executeCopilotQuery(queryText);
  }

  function handleCopilotSubmit(e) {
    if (e) e.preventDefault();
    const input = document.getElementById('copilot-query-input');
    if (!input || !input.value.trim()) return;
    executeCopilotQuery(input.value.trim());
  }

  function executeCopilotQuery(query) {
    const container = document.getElementById('copilot-response-container');
    if (!container) return;

    const lower = query.toLowerCase();

    // Loading state
    container.innerHTML = `
      <div style="padding: 30px; text-align: center; color: #0c5a36;">
        <div style="font-size: 2rem; animation: pulse 1s infinite;">⚡</div>
        <div style="font-weight: 700; margin-top: 6px;">Scanning 12 Maharashtra APMC Mandis & Verified Lots...</div>
        <div style="font-size: 0.78rem; color: #64748b;">Computing landed cost, transport tolls & 35% escrow requirements</div>
      </div>
    `;

    setTimeout(() => {
      // Find matching knowledge or fallback
      let matched = COPILOT_KNOWLEDGE.find(k => k.keywords.some(kw => lower.includes(kw)));
      if (!matched) matched = COPILOT_KNOWLEDGE[0]; // fallback to onion

      // Find matching lots from buyerData
      const lots = (window.buyerData && window.buyerData.verifiedLots) ? window.buyerData.verifiedLots : [];
      const relevantLots = lots.filter(l => 
        matched.matchedLotIds.includes(l.id) || 
        l.crop.toLowerCase().includes(matched.cropKey) ||
        lower.includes(l.crop.toLowerCase().split(' ')[0])
      );

      container.innerHTML = `
        <div style="animation: fadeInView 0.25s ease;">
          
          <!-- AI Advisory Header Box -->
          <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border: 1.5px solid #86efac; border-radius: 12px; padding: 18px; margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 10px; margin-bottom: 8px;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 1.3rem;">🧠</span>
                <strong style="color: #064e3b; font-size: 1rem;">${matched.title}</strong>
              </div>
              <span class="badge badge-grade-a" style="background: #0c5a36; color: #fff;">${matched.arbitrageSpread}</span>
            </div>
            
            <p style="font-size: 0.85rem; color: #14532d; line-height: 1.5; margin: 0 0 12px 0;">
              ${matched.recommendation}
            </p>

            <div style="display: flex; gap: 14px; font-size: 0.76rem; color: #166534; font-weight: 700; flex-wrap: wrap; border-top: 1px dashed #86efac; padding-top: 8px;">
              <span>⏱️ Optimal Timing: <strong>${matched.optimalWindow}</strong></span>
              <span>•</span>
              <span>🛡️ Zero-Risk Escrow: <strong>35% Advance Lock</strong></span>
              <span>•</span>
              <span>📍 Delivery: <strong>Vashi Central Hub, Navi Mumbai</strong></span>
            </div>
          </div>

          <!-- Matched Verified Lots -->
          <div style="margin-bottom: 12px;">
            <strong style="font-size: 0.88rem; color: #0f172a; display: block; margin-bottom: 8px;">Recommended Verified Farm-Gate Lots:</strong>
            
            <div style="display: flex; flex-direction: column; gap: 10px;">
              ${(relevantLots.length > 0 ? relevantLots : lots.slice(0, 2)).map(lot => {
                const kgPrice = lot.pricePerKg || (lot.priceNum / 100).toFixed(2);
                return `
                  <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; box-shadow: 0 1px 4px rgba(0,0,0,0.03);">
                    <div style="display: flex; align-items: center; gap: 12px;">
                      <img src="${lot.image}" alt="${lot.crop}" style="width: 44px; height: 44px; border-radius: 8px; object-fit: cover;" onerror="this.src='assets/images/tomato.jpg'" />
                      <div>
                        <div style="display: flex; align-items: center; gap: 6px;">
                          <strong style="font-size: 0.92rem; color: #0f172a;">${lot.crop}</strong>
                          <span class="badge ${lot.gradeBadgeClass || 'badge-grade-a'}" style="font-size: 0.68rem; padding: 1px 6px;">${lot.grade}</span>
                        </div>
                        <span style="font-size: 0.74rem; color: #64748b;">Farmer: <strong>${lot.farmerName}</strong> • 📍 ${lot.farmerLocation} • Rating: <strong>${lot.trustScore || '4.9 ⭐'}</strong></span>
                      </div>
                    </div>

                    <div style="display: flex; align-items: center; gap: 16px;">
                      <div style="text-align: right;">
                        <strong style="font-size: 1.05rem; color: #0c5a36;">₹ ${kgPrice} /kg</strong>
                        <div style="font-size: 0.72rem; color: #64748b;">${lot.askPrice} • Qty: <strong>${lot.quantity}</strong></div>
                      </div>
                      
                      <div style="display: flex; gap: 6px;">
                        <button class="btn btn-outline btn-sm" onclick="closeCopilotModal(); openFarmerChat('${lot.id}')" style="font-size: 0.75rem; padding: 5px 9px;">💬 Chat</button>
                        <button class="btn btn-primary btn-sm" onclick="closeCopilotModal(); openDirectBuyModal('${lot.id}')" style="font-size: 0.75rem; padding: 5px 12px; background: #0c5a36; border-color: #0c5a36; font-weight: 700;">⚡ Direct Buy</button>
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 16px; padding-top: 12px; border-top: 1px solid #f1f5f9;">
            <button class="btn btn-outline btn-sm" onclick="renderCopilotDefault()" style="font-size: 0.78rem;">&larr; Ask Another Query</button>
            <button class="btn btn-primary btn-sm" onclick="closeCopilotModal(); switchView('view-insights');" style="font-size: 0.78rem; background: #0284c7; border-color: #0284c7;">📈 Open Full APMC Market Insights</button>
          </div>

        </div>
      `;
    }, 600);
  }

  // =========================================================================
  // 2. ENTERPRISE DIGITAL PURCHASE ORDER (PO) & TAX INVOICE GENERATOR
  // =========================================================================

  function generateAndOpenPO(refId, customCrop, customQty, customFarmer, customTotal) {
    const modal = document.getElementById('modal-digital-po');
    if (!modal) return;

    const poNumber = `PO-AGRI-${refId ? refId.replace(/[^0-9A-Z]/gi, '') : Math.floor(10000 + Math.random() * 90000)}-MH`;
    const todayStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    
    // Find consignment or verified lot
    const lot = (window.buyerData && window.buyerData.verifiedLots) ? window.buyerData.verifiedLots[0] : null;
    const cropName = customCrop || (lot ? lot.crop : 'Red Onion (Lasalgaon Garwa Export)');
    const qtyText = customQty || (lot ? lot.quantity : '50 Qt (5,000 kg)');
    const farmerName = customFarmer || (lot ? lot.farmerName : 'Rameshwar Patil');
    const totalVal = customTotal || 90000;
    const escrow35 = Math.round(totalVal * 0.35);
    const balance65 = totalVal - escrow35;

    // Fill DOM elements in PO modal
    const elPoNum = document.getElementById('po-doc-number');
    const elDate = document.getElementById('po-doc-date');
    const elFarmer = document.getElementById('po-farmer-name');
    const elCrop = document.getElementById('po-item-crop');
    const elQty = document.getElementById('po-item-qty');
    const elTotal = document.getElementById('po-total-amount');
    const elEscrowAdv = document.getElementById('po-escrow-adv');
    const elEscrowBal = document.getElementById('po-escrow-bal');

    if (elPoNum) elPoNum.textContent = poNumber;
    if (elDate) elDate.textContent = todayStr;
    if (elFarmer) elFarmer.textContent = farmerName;
    if (elCrop) elCrop.textContent = cropName;
    if (elQty) elQty.textContent = qtyText;
    if (elTotal) elTotal.textContent = `₹ ${totalVal.toLocaleString('en-IN')}`;
    if (elEscrowAdv) elEscrowAdv.textContent = `₹ ${escrow35.toLocaleString('en-IN')} (35% Locked)`;
    if (elEscrowBal) elEscrowBal.textContent = `₹ ${balance65.toLocaleString('en-IN')} (65% on Delivery)`;

    modal.classList.add('active');
  }

  function closeDigitalPOModal() {
    const modal = document.getElementById('modal-digital-po');
    if (modal) modal.classList.remove('active');
  }

  function printDigitalPO() {
    window.print();
  }

  // =========================================================================
  // 3. SIDE-BY-SIDE MULTI-LOT COMPARISON MATRIX
  // =========================================================================

  function toggleLotComparison(lotId, event) {
    if (event) event.stopPropagation();

    if (selectedCompareLots.has(lotId)) {
      selectedCompareLots.delete(lotId);
    } else {
      if (selectedCompareLots.size >= 3) {
        showToast('You can compare up to 3 lots simultaneously.', 'info');
        return;
      }
      selectedCompareLots.add(lotId);
    }

    updateCompareFloatingBar();
    updateCompareCheckboxes();
  }

  function updateCompareCheckboxes() {
    document.querySelectorAll('.lot-compare-checkbox').forEach(cb => {
      const id = cb.getAttribute('data-lot-id');
      cb.checked = selectedCompareLots.has(id);
    });
  }

  function updateCompareFloatingBar() {
    let bar = document.getElementById('compare-floating-bar');
    if (selectedCompareLots.size === 0) {
      if (bar) bar.style.display = 'none';
      return;
    }

    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'compare-floating-bar';
      bar.className = 'compare-bar-float';
      document.body.appendChild(bar);
    }

    bar.style.display = 'flex';
    bar.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px;">
        <span style="background: #4ade80; color: #064e3b; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800;">
          ${selectedCompareLots.size}
        </span>
        <span style="color: #ffffff; font-weight: 700; font-size: 0.88rem;">
          ${selectedCompareLots.size} Lot${selectedCompareLots.size > 1 ? 's' : ''} Selected for Side-by-Side Comparison
        </span>
      </div>
      <div style="display: flex; gap: 8px;">
        <button class="btn btn-outline btn-sm" onclick="clearLotComparison()" style="color: #fff; border-color: rgba(255,255,255,0.4); font-size: 0.78rem;">Clear</button>
        <button class="btn btn-primary btn-sm" onclick="openLotComparisonModal()" style="background: #4ade80; color: #064e3b; border-color: #4ade80; font-weight: 800; font-size: 0.82rem;">
          ⚖️ Compare Lots Side-by-Side
        </button>
      </div>
    `;
  }

  function clearLotComparison() {
    selectedCompareLots.clear();
    updateCompareFloatingBar();
    updateCompareCheckboxes();
  }

  function openLotComparisonModal() {
    const modal = document.getElementById('modal-lot-comparison');
    if (!modal) return;

    const lots = (window.buyerData && window.buyerData.verifiedLots) ? window.buyerData.verifiedLots : [];
    const selected = lots.filter(l => selectedCompareLots.has(l.id));

    if (selected.length === 0) {
      showToast('Select at least 2 lots to compare.', 'info');
      return;
    }

    const tbody = document.getElementById('comparison-matrix-tbody');
    if (tbody) {
      tbody.innerHTML = `
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 12px; font-weight: 700; background: #f8fafc; width: 180px;">Crop & Quality Grade</td>
          ${selected.map(l => `
            <td style="padding: 12px; text-align: center;">
              <img src="${l.image}" alt="${l.crop}" style="width: 50px; height: 50px; border-radius: 8px; object-fit: cover; margin-bottom: 4px;" onerror="this.src='assets/images/tomato.jpg'" />
              <strong style="display: block; font-size: 0.95rem; color: #0f172a;">${l.crop}</strong>
              <span class="badge ${l.gradeBadgeClass || 'badge-grade-a'}" style="font-size: 0.7rem;">${l.grade}</span>
            </td>
          `).join('')}
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 12px; font-weight: 700; background: #f8fafc;">Farmer & Location</td>
          ${selected.map(l => `
            <td style="padding: 12px; text-align: center; font-size: 0.84rem;">
              <strong>${l.farmerName}</strong>
              <div style="font-size: 0.75rem; color: #64748b;">📍 ${l.farmerLocation}</div>
              <div style="color: #ea580c; font-weight: 700; font-size: 0.75rem; margin-top: 2px;">${l.trustScore || '4.9 ⭐ (98% Reliability)'}</div>
            </td>
          `).join('')}
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 12px; font-weight: 700; background: #f8fafc;">Quantity Available</td>
          ${selected.map(l => `
            <td style="padding: 12px; text-align: center; font-size: 0.95rem; font-weight: 800; color: #0f172a;">
              ${l.quantity}
            </td>
          `).join('')}
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 12px; font-weight: 700; background: #f8fafc;">Ask Rate (Farm-Gate)</td>
          ${selected.map(l => `
            <td style="padding: 12px; text-align: center;">
              <strong style="font-size: 1.1rem; color: #0c5a36;">₹ ${l.pricePerKg || (l.priceNum / 100).toFixed(2)} /kg</strong>
              <div style="font-size: 0.74rem; color: #64748b;">(${l.askPrice})</div>
            </td>
          `).join('')}
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 12px; font-weight: 700; background: #f8fafc;">Estimated Landed Cost @ Vashi Hub</td>
          ${selected.map(l => {
            const kg = parseFloat(l.pricePerKg || (l.priceNum / 100));
            const landedKg = (kg + 1.20).toFixed(2);
            return `
              <td style="padding: 12px; text-align: center; background: #f0fdf4;">
                <strong style="font-size: 1.05rem; color: #166534;">₹ ${landedKg} /kg</strong>
                <div style="font-size: 0.7rem; color: #15803d;">Incl. ₹ 1.20/kg Freight & Tolls</div>
              </td>
            `;
          }).join('')}
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 12px; font-weight: 700; background: #f8fafc;">Transit Lead Time</td>
          ${selected.map(l => `
            <td style="padding: 12px; text-align: center; font-size: 0.82rem; color: #0369a1; font-weight: 700;">
              ⏱️ 4–6 Hours (Samruddhi Expressway)
            </td>
          `).join('')}
        </tr>
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 12px; font-weight: 700; background: #f8fafc;">35% Advance Escrow</td>
          ${selected.map(l => {
            const total = Math.round(l.priceNum * l.qtyNum);
            const adv = Math.round(total * 0.35);
            return `
              <td style="padding: 12px; text-align: center; font-size: 0.85rem; font-weight: 700; color: #0c5a36;">
                ₹ ${adv.toLocaleString('en-IN')}
              </td>
            `;
          }).join('')}
        </tr>
        <tr>
          <td style="padding: 12px; font-weight: 700; background: #f8fafc;">Procurement Action</td>
          ${selected.map(l => `
            <td style="padding: 12px; text-align: center;">
              <button class="btn btn-primary btn-sm" onclick="closeLotComparisonModal(); openDirectBuyModal('${l.id}')" style="width: 100%; background: #0c5a36; border-color: #0c5a36; font-weight: 700; font-size: 0.8rem;">
                ✓ Select & Buy
              </button>
            </td>
          `).join('')}
        </tr>
      `;
    }

    modal.classList.add('active');
  }

  function closeLotComparisonModal() {
    const modal = document.getElementById('modal-lot-comparison');
    if (modal) modal.classList.remove('active');
  }

  // =========================================================================
  // 4. LIVE GPS FLEET & REEFER TELEMETRY ROUTE VISUALIZER
  // =========================================================================

  function renderGpsRouteVisualizer(trackingId) {
    const container = document.getElementById('gps-route-checkpoints-container');
    if (!container) return;

    const checkpoints = [
      { name: "Farm Gate Loading Point", loc: "Lasalgaon Mandi Yard, Nashik", time: "06:30 AM", status: "completed", tag: "QC Passed & Weighed" },
      { name: "Samruddhi Expressway Toll #04", loc: "Igatpuri Corridor Checkpoint", time: "09:45 AM", status: "completed", tag: "Fastag Automated Weigh-In-Motion" },
      { name: "Bhiwandi Agro Logistics Hub", loc: "Mumbai Inward Entry Corridor", time: "01:15 PM", status: "active", tag: "Live GPS Speed: 54 km/h • Temp: 3.2°C" },
      { name: "Destination Delivery Hub", loc: "Vashi APMC Central Terminal, Navi Mumbai", time: "03:30 PM (ETA)", status: "pending", tag: "Dock #4 Bay Assigned" }
    ];

    container.innerHTML = checkpoints.map((cp, idx) => {
      const isDone = cp.status === 'completed';
      const isActive = cp.status === 'active';
      const dotColor = isDone ? '#15803d' : (isActive ? '#2563eb' : '#94a3b8');
      const dotIcon = isDone ? '✓' : (isActive ? '🚚' : (idx + 1));
      const bgCard = isActive ? '#eff6ff' : (isDone ? '#f8fafc' : '#ffffff');
      const borderCard = isActive ? '#bfdbfe' : '#e2e8f0';

      return `
        <div style="display: flex; gap: 14px; margin-bottom: 12px; position: relative;">
          <!-- Left Timeline Line & Dot -->
          <div style="display: flex; flex-direction: column; align-items: center;">
            <div style="width: 28px; height: 28px; border-radius: 50%; background: ${dotColor}; color: #ffffff; display: flex; align-items: center; justify-content: center; font-size: 0.78rem; font-weight: 800; box-shadow: 0 2px 6px rgba(0,0,0,0.15); z-index: 2;">
              ${dotIcon}
            </div>
            ${idx < checkpoints.length - 1 ? `<div style="width: 2px; flex: 1; background: ${isDone ? '#86efac' : '#e2e8f0'}; min-height: 36px;"></div>` : ''}
          </div>

          <!-- Right Checkpoint Details -->
          <div style="flex: 1; background: ${bgCard}; border: 1px solid ${borderCard}; border-radius: 10px; padding: 10px 14px; margin-bottom: 4px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;">
              <strong style="font-size: 0.88rem; color: #0f172a;">${cp.name}</strong>
              <span style="font-size: 0.74rem; font-weight: 700; color: ${isActive ? '#1d4ed8' : '#64748b'};">${cp.time}</span>
            </div>
            <div style="font-size: 0.75rem; color: #64748b;">${cp.loc}</div>
            <div style="margin-top: 4px; font-size: 0.72rem; color: ${isActive ? '#1e40af' : '#166534'}; font-weight: 600;">
              ${cp.tag}
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // =========================================================================
  // 5. INTERACTIVE 2D WAREHOUSE CHAMBER & SILO SLOT VISUALIZER
  // =========================================================================

  const WAREHOUSE_CHAMBERS_MAP = {
    "WH-NSK-01": [
      { chamber: "Chamber 1-A", type: "Solar Forced Air", temp: "24°C", humidity: "65%", capacity: "5,000 Qt", available: "1,800 Qt", occPct: 64, suitability: "Garwa Red Onion", status: "available" },
      { chamber: "Chamber 1-B", type: "Solar Forced Air", temp: "24°C", humidity: "65%", capacity: "5,000 Qt", available: "2,200 Qt", occPct: 56, suitability: "Export Red Onion", status: "available" },
      { chamber: "Chamber 2-A", type: "Cold Chamber", temp: "3.5°C", humidity: "88%", capacity: "5,000 Qt", available: "1,200 Qt", occPct: 76, suitability: "Thompson Grapes", status: "available" },
      { chamber: "Chamber 2-B", type: "Cold Chamber", temp: "3.0°C", humidity: "90%", capacity: "5,000 Qt", available: "1,000 Qt", occPct: 80, suitability: "Pomegranate / Veg", status: "available" }
    ],
    "WH-PUN-02": [
      { chamber: "CA Chamber A1", type: "Controlled Atmosphere", temp: "1.5°C", humidity: "92%", capacity: "4,000 Qt", available: "1,600 Qt", occPct: 60, suitability: "Hybrid Tomato", status: "available" },
      { chamber: "CA Chamber A2", type: "Controlled Atmosphere", temp: "2.0°C", humidity: "92%", capacity: "4,000 Qt", available: "1,400 Qt", occPct: 65, suitability: "Capsicum / Exotic", status: "available" },
      { chamber: "Reefer Bay B1", type: "Refrigerated Bay", temp: "4.0°C", humidity: "88%", capacity: "3,500 Qt", available: "1,100 Qt", occPct: 68, suitability: "Green Chillies", status: "available" },
      { chamber: "Reefer Bay B2", type: "Pre-Cooling Tunnel", temp: "0.5°C", humidity: "94%", capacity: "3,500 Qt", available: "1,300 Qt", occPct: 62, suitability: "Export Grapes", status: "available" }
    ],
    "WH-LAT-03": [
      { chamber: "Hermetic Silo #1", type: "Aerated Dry Silo", temp: "20°C", humidity: "< 10%", capacity: "10,000 Qt", available: "3,500 Qt", occPct: 65, suitability: "Yellow Soybean", status: "available" },
      { chamber: "Hermetic Silo #2", type: "Aerated Dry Silo", temp: "20°C", humidity: "< 10%", capacity: "10,000 Qt", available: "4,200 Qt", occPct: 58, suitability: "Tur Dal / Pulses", status: "available" },
      { chamber: "Hermetic Silo #3", type: "Aerated Dry Silo", temp: "21°C", humidity: "< 10%", capacity: "8,000 Qt", available: "2,100 Qt", occPct: 74, suitability: "Wheat / Grain", status: "available" },
      { chamber: "Hermetic Silo #4", type: "Aerated Dry Silo", temp: "21°C", humidity: "< 10%", capacity: "7,000 Qt", available: "2,000 Qt", occPct: 71, suitability: "Chana / Chickpea", status: "available" }
    ],
    "WH-NGP-04": [
      { chamber: "Citrus Packhouse 1", type: "Multi-Chamber Cold", temp: "4.5°C", humidity: "90%", capacity: "5,000 Qt", available: "2,100 Qt", occPct: 58, suitability: "Nagpur Mandarin", status: "available" },
      { chamber: "Citrus Packhouse 2", type: "Multi-Chamber Cold", temp: "4.0°C", humidity: "90%", capacity: "5,000 Qt", available: "2,400 Qt", occPct: 52, suitability: "Table Orange", status: "available" },
      { chamber: "Cold Chamber C3", type: "Cold Chamber", temp: "2.5°C", humidity: "88%", capacity: "4,000 Qt", available: "1,300 Qt", occPct: 67, suitability: "Turmeric / Ginger", status: "available" },
      { chamber: "Cold Chamber C4", type: "Cold Chamber", temp: "3.0°C", humidity: "89%", capacity: "4,000 Qt", available: "1,300 Qt", occPct: 67, suitability: "Banana / Papaya", status: "available" }
    ]
  };

  function renderChamberVisualizerForFacility(facilityId) {
    const container = document.getElementById('facility-chambers-visualizer');
    if (!container) return;

    const facId = facilityId || 'WH-NSK-01';
    const chambers = WAREHOUSE_CHAMBERS_MAP[facId] || WAREHOUSE_CHAMBERS_MAP["WH-NSK-01"];

    container.innerHTML = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px;">
        ${chambers.map(ch => {
          const occColor = ch.occPct > 75 ? '#dc2626' : (ch.occPct > 60 ? '#d97706' : '#166534');
          return `
            <div class="chamber-slot-card" onclick="selectChamberSlot('${ch.chamber}', '${ch.type}', '${ch.available}')" style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 10px; padding: 12px; cursor: pointer; transition: all 0.2s ease;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <strong style="font-size: 0.88rem; color: #0f172a;">${ch.chamber}</strong>
                <span style="font-size: 0.68rem; font-weight: 800; background: #e8f5ed; color: #0c5a36; padding: 1px 6px; border-radius: 4px;">● Live Slot</span>
              </div>
              
              <div style="font-size: 0.74rem; color: #64748b; margin-bottom: 8px;">
                ${ch.type} • <strong>${ch.temp}</strong> (${ch.humidity} RH)
              </div>

              <!-- Occupancy Progress Bar -->
              <div style="margin-bottom: 6px;">
                <div style="display: flex; justify-content: space-between; font-size: 0.7rem; color: #64748b; margin-bottom: 2px;">
                  <span>Capacity: ${ch.capacity}</span>
                  <span style="font-weight: 700; color: ${occColor};">${ch.occPct}% Filled</span>
                </div>
                <div style="background: #f1f5f9; height: 6px; border-radius: 999px; overflow: hidden;">
                  <div style="width: ${ch.occPct}%; height: 100%; background: ${occColor}; border-radius: 999px;"></div>
                </div>
              </div>

              <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.72rem; color: #166534; font-weight: 700; background: #f0fdf4; padding: 4px 8px; border-radius: 6px;">
                <span>Avail: ${ch.available}</span>
                <span>Select &rarr;</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function selectChamberSlot(chamberName, chamberType, availableQty) {
    showToast(`✓ Selected ${chamberName} (${chamberType}) with ${availableQty} space!`);
    openBookStorageModal('WH-NSK-01');
  }

  // Bind to Window Global Object
  window.openCopilotModal = openCopilotModal;
  window.closeCopilotModal = closeCopilotModal;
  window.askCopilot = askCopilot;
  window.handleCopilotSubmit = handleCopilotSubmit;
  window.openDigitalPOModal = generateAndOpenPO;
  window.generateAndOpenPO = generateAndOpenPO;
  window.closeDigitalPOModal = closeDigitalPOModal;
  window.printDigitalPO = printDigitalPO;
  window.toggleLotComparison = toggleLotComparison;
  window.clearLotComparison = clearLotComparison;
  window.openLotComparisonModal = openLotComparisonModal;
  window.closeLotComparisonModal = closeLotComparisonModal;
  window.renderGpsRouteVisualizer = renderGpsRouteVisualizer;
  window.renderChamberVisualizerForFacility = renderChamberVisualizerForFacility;
  window.selectChamberSlot = selectChamberSlot;

})();
