/**
 * AgriNex Buyer Module - Bulk Procurement Demands & Quota Engine
 * Handles forward demand broadcasting, farmer bid matching, and quota management.
 */

// ==========================================
// BULK PROCUREMENT DEMANDS & QUOTA BOARD
// ==========================================
let demandFilters = {
  searchQuery: '',
  status: 'all',
  hub: 'all'
};

function handleDemandSearch(val) {
  demandFilters.searchQuery = (val || '').toLowerCase().trim();
  renderBuyerDemands();
}

function filterDemandsByStatus(status, btnEl) {
  demandFilters.status = status;
  if (btnEl && btnEl.parentElement) {
    const btns = btnEl.parentElement.querySelectorAll('button');
    btns.forEach(b => b.classList.remove('active'));
    btnEl.classList.add('active');
  }
  renderBuyerDemands();
}

function filterDemandsByHub(hub) {
  demandFilters.hub = hub;
  renderBuyerDemands();
}

function clearDemandFilters() {
  demandFilters = { searchQuery: '', status: 'all', hub: 'all' };
  const sInput = document.getElementById('demand-search-input');
  if (sInput) sInput.value = '';
  const hubSelect = document.getElementById('demand-hub-filter');
  if (hubSelect) hubSelect.value = 'all';
  const statusContainer = document.getElementById('demand-status-filters');
  if (statusContainer) {
    const btns = statusContainer.querySelectorAll('button');
    btns.forEach((b, i) => {
      if (i === 0) b.classList.add('active');
      else b.classList.remove('active');
    });
  }
  renderBuyerDemands();
}

function renderBuyerDemands() {
  const container = document.getElementById('demands-list-container');
  if (!container || !buyerData.buyerDemands) return;

  const filtered = buyerData.buyerDemands.filter(dem => {
    // Search query
    if (demandFilters.searchQuery) {
      const q = demandFilters.searchQuery;
      const matchText = `${dem.id} ${dem.crop} ${dem.category || ''} ${dem.location} ${dem.grade || ''}`.toLowerCase();
      if (!matchText.includes(q)) return false;
    }
    // Status filter
    if (demandFilters.status !== 'all') {
      if (demandFilters.status === 'match-ready' && !dem.statusLabel.includes('Auto-Match')) return false;
      if (demandFilters.status === 'broadcasting' && !dem.statusLabel.includes('Broadcasting')) return false;
      if (demandFilters.status === 'fulfilled' && dem.fulfilledPct < 100) return false;
    }
    // Hub filter
    if (demandFilters.hub !== 'all' && dem.location !== demandFilters.hub) {
      return false;
    }
    return true;
  });

  // Update badge count
  const activeBadge = document.getElementById('demands-active-badge');
  if (activeBadge) {
    const isMr = window.getBuyerLanguage && window.getBuyerLanguage() === 'mr';
    const isHi = window.getBuyerLanguage && window.getBuyerLanguage() === 'hi';
    const count = filtered.length;
    if (isMr) {
      activeBadge.textContent = `${count} कोटा प्रदर्शित`;
    } else if (isHi) {
      activeBadge.textContent = `${count} कोटा प्रदर्शित`;
    } else {
      activeBadge.textContent = `${count} Quotas Displayed`;
    }
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state-card" style="padding: 48px 28px; text-align: center; max-width: 540px; margin: 28px auto; background: #ffffff; border: 1.5px dashed #cbd5e1; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.03);">
        <div style="width: 80px; height: 80px; margin: 0 auto 20px; background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); border: 2px solid #bfdbfe; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.08);">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
        </div>
        <h4 style="font-size: 1.18rem; font-weight: 800; color: #0f172a; margin-bottom: 8px;">No Matching Procurement Quotas Found</h4>
        <p style="font-size: 0.88rem; color: #64748b; margin-bottom: 22px; line-height: 1.55; max-width: 420px; margin-left: auto; margin-right: auto;">Try adjusting your search keywords, status tabs, or broadcast a new forward contract quota directly to verified farmer FPOs.</p>
        <div style="display: inline-flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
          <button type="button" class="btn btn-primary" onclick="openDemandModal ? openDemandModal() : null" style="padding: 9px 20px; font-weight: 700; border-radius: 10px; display: inline-flex; align-items: center; gap: 8px;">
            <span>⚡</span>
            <span>+ Broadcast New Quota</span>
          </button>
          <button type="button" class="btn btn-outline" onclick="clearDemandFilters()" style="padding: 9px 18px; font-weight: 700; border-radius: 10px; display: inline-flex; align-items: center; gap: 8px;">
            <span>🔄</span>
            <span>Reset Quota Filters</span>
          </button>
        </div>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(dem => {
    const fulfilledPct = dem.fulfilledPct || 0;
    const progressColor = fulfilledPct >= 100 ? 'linear-gradient(90deg, #16a34a 0%, #15803d 100%)' : (fulfilledPct >= 60 ? 'linear-gradient(90deg, #10b981 0%, #059669 100%)' : 'linear-gradient(90deg, #eab308 0%, #ca8a04 100%)');
    const progressTextColor = fulfilledPct >= 100 ? '#15803d' : (fulfilledPct >= 60 ? '#0c5a36' : '#a16207');
    const bidsCount = (dem.bids && dem.bids.length) || 0;
    const isFulfilled = fulfilledPct >= 100;

    const destinationLbl = window.t ? window.t('demand_destination_lbl', 'Destination:') : 'Destination:';
    const deadlineLbl = window.t ? window.t('demand_deadline_lbl', 'Sourcing Deadline:') : 'Sourcing Deadline:';
    const daysLeftText = dem.daysLeft > 0 ? `(${dem.daysLeft} ${window.t ? window.t('demand_days_left', 'd left') : 'd left'})` : `(${window.t ? window.t('demand_completed', 'Completed') : 'Completed'})`;
    const targetQuotaVolLbl = window.t ? window.t('demand_target_quota_vol', 'TARGET QUOTA VOLUME') : 'TARGET QUOTA VOLUME';
    const ceilingPriceLbl = window.t ? window.t('demand_ceiling_target_price', 'CEILING TARGET PRICE') : 'CEILING TARGET PRICE';
    const mandiRateLbl = window.t ? window.t('demand_mandi_benchmark_rate', 'MANDI BENCHMARK RATE') : 'MANDI BENCHMARK RATE';
    const qualityLogisticsLbl = window.t ? window.t('demand_quality_logistics_spec', 'QUALITY & LOGISTICS SPEC') : 'QUALITY & LOGISTICS SPEC';
    const sourcedVolLbl = window.t ? window.t('demand_sourced_vol', 'Sourced Volume:') : 'Sourced Volume:';
    const sourcedStatusLbl = window.t ? window.t('demand_sourced_status', 'Sourced') : 'Sourced';
    const reviewBidsLbl = window.t ? window.t('demand_review_bids', 'Review Farmer Bids') : 'Review Farmer Bids';
    const broadcastingBidsLbl = window.t ? window.t('demand_broadcasting_bids', '● Broadcasting for Bids') : '● Broadcasting for Bids';
    const autoMatchLbl = window.t ? window.t('demand_auto_match', '⚡ Auto-Match Lots →') : '⚡ Auto-Match Lots →';

    return `
      <div class="bulk-quota-card" style="border-top: 4.5px solid ${isFulfilled ? '#16a34a' : '#0c5a36'};" id="demand-card-${dem.id}">
        <!-- Top Bar: Crop Info + Status Badge -->
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 16px;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <img src="${dem.image}" alt="${dem.crop}" style="width: 56px; height: 56px; border-radius: 12px; object-fit: cover; border: 1.5px solid #e2e8f0; box-shadow: 0 4px 10px rgba(0,0,0,0.06);" onerror="this.src='assets/images/tomato.jpg'" />
            <div>
              <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                <strong style="font-size: 1.15rem; color: #0f172a; font-weight: 900;">${window.tCrop ? window.tCrop(dem.crop) : dem.crop}</strong>
                <span class="badge" style="background: #f1f5f9; color: #475569; font-size: 0.74rem; font-weight: 800; border: 1px solid #cbd5e1; font-family: monospace;">#${dem.id}</span>
                <span class="badge" style="background: #f0fdf4; color: #166534; font-size: 0.74rem; font-weight: 800; border: 1px solid #bbf7d0;">${window.tText ? window.tText(dem.category || 'Agricultural Crop') : (dem.category || 'Agricultural Crop')}</span>
              </div>
              <div style="font-size: 0.8rem; color: #64748b; margin-top: 4px; font-weight: 500;">
                ${destinationLbl} <strong style="color: #0f172a; font-weight: 700;">📍 ${window.tLocation ? window.tLocation(dem.location) : dem.location}</strong> • ${deadlineLbl} <strong style="${dem.daysLeft <= 3 ? 'color: #dc2626; font-weight: 800;' : 'color: #0f172a; font-weight: 700;'}">⏱️ ${dem.deadline} ${daysLeftText}</strong>
              </div>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="badge" style="background: ${isFulfilled ? '#15803d' : '#f0fdf4'}; color: ${isFulfilled ? '#ffffff' : '#166534'}; font-size: 0.78rem; font-weight: 800; padding: 5px 12px; border-radius: 999px; border: 1px solid ${isFulfilled ? '#15803d' : '#bbf7d0'};">
              ${window.tText ? window.tText(dem.statusLabel || '● Broadcasting Quota') : (dem.statusLabel || '● Broadcasting Quota')}
            </span>
          </div>
        </div>

        <!-- 4-Column Procurement Spec Grid -->
        <div class="quota-spec-box">
          <div>
            <span style="color: #64748b; font-size: 0.68rem; font-weight: 800; display: block; text-transform: uppercase; letter-spacing: 0.03em;">${targetQuotaVolLbl}</span>
            <strong style="color: #0f172a; font-size: 1rem; font-weight: 900;">${window.tText ? window.tText(dem.tonnage) : dem.tonnage}</strong>
          </div>
          <div>
            <span style="color: #64748b; font-size: 0.68rem; font-weight: 800; display: block; text-transform: uppercase; letter-spacing: 0.03em;">${ceilingPriceLbl}</span>
            <strong style="color: #0c5a36; font-size: 1rem; font-weight: 900;">${window.tText ? window.tText(dem.targetPrice) : dem.targetPrice}</strong>
          </div>
          <div>
            <span style="color: #64748b; font-size: 0.68rem; font-weight: 800; display: block; text-transform: uppercase; letter-spacing: 0.03em;">${mandiRateLbl}</span>
            <div style="display: flex; align-items: center; gap: 6px; margin-top: 2px;">
              <span style="color: #94a3b8; text-decoration: line-through; font-size: 0.85rem; font-weight: 600;">${window.tText ? window.tText(dem.mandiBenchmark || '₹ 14.00 /kg') : (dem.mandiBenchmark || '₹ 14.00 /kg')}</span>
              <span style="color: #166534; font-weight: 800; font-size: 0.76rem; background: #f0fdf4; padding: 1px 6px; border-radius: 4px; border: 1px solid #bbf7d0;">${window.tText ? window.tText(dem.savingsPct || '12% Saved') : (dem.savingsPct || '12% Saved')}</span>
            </div>
          </div>
          <div>
            <span style="color: #64748b; font-size: 0.68rem; font-weight: 800; display: block; text-transform: uppercase; letter-spacing: 0.03em;">${qualityLogisticsLbl}</span>
            <span style="color: #0f172a; font-weight: 700; font-size: 0.82rem; margin-top: 2px; display: block;">${window.tGrade ? window.tGrade(dem.grade || 'Grade A') : (dem.grade || 'Grade A')} • ${window.tText ? window.tText(dem.deliveryMode || 'Farm-Gate') : (dem.deliveryMode || 'Farm-Gate')}</span>
          </div>
        </div>

        <!-- Sourcing Fulfillment Progress Bar -->
        <div style="margin-bottom: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.78rem; margin-bottom: 6px;">
            <span style="color: #475569; font-weight: 600;">
              ${sourcedVolLbl} <strong style="color: ${progressTextColor}; font-weight: 800;">${dem.fulfilledTonnage || 0} / ${dem.tonnageNum || 150} ${window.t ? window.t('unit_qt', 'Qt') : 'Qt'}</strong> <span style="font-size: 0.74rem; color: #64748b;">(${((dem.fulfilledTonnage || 0) * 100).toLocaleString('en-IN')} / ${((dem.tonnageNum || 150) * 100).toLocaleString('en-IN')} kg)</span>
            </span>
            <strong style="color: ${progressTextColor}; font-weight: 800;">${fulfilledPct}% ${sourcedStatusLbl}</strong>
          </div>
          <div style="height: 9px; background: #e2e8f0; border-radius: 999px; overflow: hidden;">
            <div style="width: ${fulfilledPct}%; height: 100%; background: ${progressColor}; border-radius: 999px; transition: width 0.4s ease;"></div>
          </div>
        </div>

        <!-- Action Footer -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; padding-top: 14px; border-top: 1px solid #f1f5f9;">
          <div style="display: flex; align-items: center; gap: 8px; font-size: 0.78rem; color: #475569;">
            <span style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 2px 8px; border-radius: 6px; font-weight: 600;">🛡️ ${window.tText ? window.tText(dem.escrowAdvance || '35% Advance Escrow') : (dem.escrowAdvance || '35% Advance Escrow')}</span>
            <span style="color: #0c5a36; font-weight: 800; background: #f0fdf4; border: 1px solid #bbf7d0; padding: 2px 8px; border-radius: 6px;">${window.tText ? window.tText(dem.moistureLimit || 'QC Guaranteed') : (dem.moistureLimit || 'QC Guaranteed')}</span>
          </div>

          <div style="display: flex; align-items: center; gap: 8px;">
            ${bidsCount > 0 ? `
              <button class="btn btn-primary btn-sm" onclick="openDemandBidsModal('${dem.id}')" style="background: linear-gradient(135deg, #0c5a36 0%, #064e3b 100%); border-color: #0c5a36; font-weight: 800; display: flex; align-items: center; gap: 6px; box-shadow: 0 4px 10px rgba(12, 90, 54, 0.25);">
                ${reviewBidsLbl} (${bidsCount})
              </button>
            ` : `
              <button class="btn btn-outline btn-sm" onclick="showToast('✓ Broadcasting active! New farmer proposals will appear here automatically.', 'info')" style="font-size: 0.78rem; font-weight: 700; border-color: #cbd5e1; color: #475569;">
                ${broadcastingBidsLbl}
              </button>
            `}

            <button class="btn btn-outline btn-sm" onclick="sourceFromMarketplaceForDemand('${dem.crop}')" style="font-size: 0.78rem; font-weight: 700; border-color: #cbd5e1; color: #334155;">
              ${autoMatchLbl}
            </button>

            <button class="btn btn-outline btn-sm" onclick="downloadPurchaseOrder('${dem.id}')" style="font-size: 0.78rem; font-weight: 700; border-color: #cbd5e1; color: #334155;" title="Download Institutional Purchase Order">
              📄 PO
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Open Review Matching Farmer Bids Modal
function openDemandBidsModal(demandId) {
  const modal = document.getElementById('modal-demand-bids');
  if (!modal) return;

  const demand = buyerData.buyerDemands.find(d => d.id === demandId) || buyerData.buyerDemands[0];
  if (!demand) return;

  const titleEl = document.getElementById('bids-modal-title');
  const subtitleEl = document.getElementById('bids-modal-subtitle');
  const ceilingEl = document.getElementById('bids-modal-ceiling');
  const destEl = document.getElementById('bids-modal-dest');
  const remainingEl = document.getElementById('bids-modal-remaining');
  const listContainer = document.getElementById('bids-list-container');

  if (titleEl) titleEl.textContent = `Matching Farmer Bids (${demand.bids ? demand.bids.length : 0})`;
  if (subtitleEl) subtitleEl.textContent = `Quota #${demand.id} • ${window.tCrop ? window.tCrop(demand.crop) : demand.crop} (${demand.tonnage})`;
  if (ceilingEl) ceilingEl.textContent = demand.targetPrice;
  if (destEl) destEl.textContent = window.tLocation ? window.tLocation(demand.location) : demand.location;
  if (remainingEl) {
    const rem = Math.max(0, (demand.tonnageNum || 150) - (demand.fulfilledTonnage || 0));
    remainingEl.textContent = `${rem} ${demand.unit || 'Qt'} (${(rem * 100).toLocaleString('en-IN')} kg)`;
  }

  if (listContainer) {
    if (!demand.bids || demand.bids.length === 0) {
      listContainer.innerHTML = `
        <div style="text-align: center; padding: 24px; color: #64748b;">
          No incoming bids yet for this quota. Farmers are being alerted across the regional grid.
        </div>
      `;
    } else {
      listContainer.innerHTML = demand.bids.map(bid => {
        const isBetter = bid.bidPriceNum <= demand.targetPriceNum;
        const isMr = window.getBuyerLanguage && window.getBuyerLanguage() === 'mr';
        const isHi = window.getBuyerLanguage && window.getBuyerLanguage() === 'hi';
        
        let transOfferedQty = bid.offeredQty || '';
        if (isMr) {
          transOfferedQty = transOfferedQty.replace(/kg/gi, 'किलो').replace(/Qt/gi, 'क्विंटल');
        } else if (isHi) {
          transOfferedQty = transOfferedQty.replace(/kg/gi, 'किग्रा').replace(/Qt/gi, 'क्विंटल');
        }
        const transOfferedWord = isMr ? 'प्रस्तावित' : isHi ? 'प्रस्तावित' : 'offered';
        const transUnitKg = isMr ? 'किलो' : isHi ? 'किग्रा' : 'kg';
        const transLeadTimeLbl = isMr ? 'पूर्तता वेळ:' : isHi ? 'प्रमुख समय:' : 'Lead Time:';
        const transLeadTimeVal = isMr ? (bid.leadTime ? bid.leadTime.replace(/Hours?/gi, 'तास') : '६ तास') : isHi ? (bid.leadTime ? bid.leadTime.replace(/Hours?/gi, 'घंटे') : '6 घंटे') : (bid.leadTime || '6 Hours');
        const transQcLbl = isMr ? 'डिजिटल गुणवत्ता नियंत्रण स्कोअर:' : isHi ? 'डिजिटल गुणवत्ता नियंत्रण स्कोर:' : 'Digital QC Score:';
        const transPriceAdvLbl = isMr ? 'दर फायदा:' : isHi ? 'मूल्य लाभ:' : 'Price Advantage:';
        const transPriceAdvVal = isBetter ? (isMr ? '✓ कमाल मर्यादेपेक्षा कमी/सुसंगत' : isHi ? '✓ लक्षित अधिकतम मूल्य के बराबर/कम' : '✓ At/Below Target Ceiling') : (isMr ? 'किंचित जास्त' : isHi ? 'हल्का प्रीमियम' : 'Slight Premium');
        const transChatBtn = isMr ? '💬 संवाद आणि चर्चा' : isHi ? '💬 चैट & बातचीत करें' : '💬 Chat & Negotiate';
        const transAcceptBtn = isMr ? '✓ स्वीकारा आणि ३५% एस्क्रो सुरक्षित करा' : isHi ? '✓ स्वीकारें बोली & लॉक करें 35% एस्क्रो सुरक्षित' : '✓ Accept Bid & Lock 35% Escrow';
        const transMatchBadge = isMr ? 'सत्यापित जुळणी' : isHi ? 'सत्यापित शीर्ष मिलान' : (bid.status || 'Verified Match');

        return `
          <div style="background: #ffffff; border: 1.5px solid #bbf7d0; border-radius: 12px; padding: 14px 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.02);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <img src="${bid.farmerAvatar || 'assets/images/tomato.jpg'}" alt="${bid.farmerName}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 1.5px solid #86efac;" onerror="this.src='assets/images/tomato.jpg'" />
                <div>
                  <div style="display: flex; align-items: center; gap: 6px;">
                    <strong style="font-size: 0.95rem; color: #0f172a;">${window.tPerson ? window.tPerson(bid.farmerName) : bid.farmerName}</strong>
                    <span style="font-size: 0.75rem; color: #0c5a36; font-weight: 700;">${bid.rating}</span>
                    <span class="badge" style="background: #f0fdf4; color: #166534; font-size: 0.7rem; font-weight: 700; padding: 2px 6px;">${transMatchBadge}</span>
                  </div>
                  <div style="font-size: 0.74rem; color: #64748b;">📍 ${window.tLocation ? window.tLocation(bid.location) : bid.location} • ${transLeadTimeLbl} <strong>${transLeadTimeVal}</strong></div>
                </div>
              </div>

              <div style="text-align: right;">
                <div style="font-size: 1.1rem; font-weight: 800; color: #0c5a36;">${bid.bidPrice}</div>
                <div style="font-size: 0.72rem; color: #166534; font-weight: 600;">₹ ${bid.pricePerKg.toFixed(2)}/${transUnitKg} • ${transOfferedQty} ${transOfferedWord}</div>
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; background: #f8fafc; padding: 8px 12px; border-radius: 8px; margin-bottom: 10px; font-size: 0.76rem;">
              <span style="color: #475569;">${transQcLbl} <strong style="color: #15803d;">${bid.qcScore}</strong></span>
              <span style="color: #475569;">${transPriceAdvLbl} <strong style="color: #0c5a36;">${transPriceAdvVal}</strong></span>
            </div>

            <div style="display: flex; gap: 8px; justify-content: flex-end;">
              <button class="btn btn-outline btn-sm" onclick="startNegotiationWithFarmer('${bid.farmerName}', '${demand.crop}', ${bid.bidPriceNum}, '${demand.id}')" style="font-size: 0.75rem; padding: 4px 10px;">
                ${transChatBtn}
              </button>
              <button class="btn btn-primary btn-sm" onclick="acceptDemandFarmerBid('${demand.id}', '${bid.bidId}')" style="background: #0c5a36; border-color: #0c5a36; font-size: 0.75rem; font-weight: 700; padding: 4px 12px;">
                ${transAcceptBtn}
              </button>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  modal.classList.add('active');
  if (typeof window.walkAndTranslateDOM === 'function') {
    window.walkAndTranslateDOM(modal);
  }
}

function closeDemandBidsModal() {
  const modal = document.getElementById('modal-demand-bids');
  if (modal) modal.classList.remove('active');
}

// Accept farmer bid directly from quota board
function acceptDemandFarmerBid(demandId, bidId) {
  const demand = buyerData.buyerDemands.find(d => d.id === demandId);
  if (!demand) return;

  const bid = demand.bids ? demand.bids.find(b => b.bidId === bidId) : null;
  const farmerName = bid ? bid.farmerName : 'Farmer';
  const bidPrice = bid ? bid.bidPrice : demand.targetPrice;
  const offeredQty = bid ? bid.offeredQty : '50 Qt (5,000 kg)';

  // Calculate 35% escrow
  const totalVal = (bid ? bid.bidPriceNum : 1200) * 50;
  const escrowAdv = Math.round(totalVal * 0.35);

  closeDemandBidsModal();
  showToast(`🔒 Authorizing 35% Escrow (₹ ${escrowAdv.toLocaleString('en-IN')}) for ${farmerName}...`);

  setTimeout(() => {
    demand.fulfilledTonnage = Math.min(demand.tonnageNum, (demand.fulfilledTonnage || 0) + 50);
    demand.fulfilledPct = Math.round((demand.fulfilledTonnage / demand.tonnageNum) * 100);
    if (demand.fulfilledPct >= 100) {
      demand.statusLabel = '✓ 100% Contracted & Fulfilled';
    }

    try {
      localStorage.setItem('agrinex_buyer_demands', JSON.stringify(buyerData.buyerDemands));
    } catch(err) {}

    renderBuyerDemands();
    showToast(`✓ Proposal accepted! Contract created with ${farmerName} for ${offeredQty} at ${bidPrice}. Escrow locked.`, 'success');
    switchView('view-escrow-vault');
  }, 800);
}

// Direct jump to Marketplace filtered for this crop
function sourceFromMarketplaceForDemand(cropName) {
  let keyword = cropName.split(' ')[0].replace(/[^a-zA-Z]/g, '');
  const searchInput = document.getElementById('marketplace-search-input');
  if (searchInput) {
    searchInput.value = keyword;
    handleBuyerSearch(keyword);
  }
  showToast(`Filtering marketplace lots for ${keyword}...`);
  switchView('view-verified-produce');
}

// Download Individual PO
function downloadPurchaseOrder(demandId) {
  const demand = (buyerData && buyerData.buyerDemands) ? buyerData.buyerDemands.find(d => d.id === demandId) : null;
  if (window.generateAndOpenPO) {
    const cropName = demand ? demand.crop : 'Red Onion (Lasalgaon Garwa Export)';
    const qtyText = demand ? `${demand.totalQuantityQt} Qt (${(demand.totalQuantityQt * 100).toLocaleString('en-IN')} kg)` : '50 Qt (5,000 kg)';
    const totalVal = demand ? Math.round(demand.totalQuantityQt * demand.targetPriceNum) : 90000;
    window.generateAndOpenPO(demandId, cropName, qtyText, 'Patil Rameshwar', totalVal);
  } else {
    showToast(`Generating official Purchase Order (PO #${demandId}) PDF with digital stamp...`);
  }
}

// Download All POs
function downloadAllPurchaseOrders() {
  showToast('Generating institutional Master Procurement Demand Sheet (PDF) for all active quotas...');
  setTimeout(() => {
    showToast('✓ Master Procurement Report (6 Active Quotas) downloaded successfully!');
  }, 850);
}

// Refresh Auto-Match
function refreshDemandMatches() {
  showToast('🔄 Scanning real-time mandi feeds & regional farm-gate GPS clusters...');
  setTimeout(() => {
    buyerData.buyerDemands.forEach(d => {
      if (d.fulfilledPct < 100) {
        d.matchedCount = Math.floor(3 + Math.random() * 4);
      }
    });
    renderBuyerDemands();
    showToast('✓ Regional farmer clusters synced! 4 new farm-gate lots matched.', 'success');
  }, 900);
}

function openPostDemandModal() {
  const modal = document.getElementById('modal-post-demand');
  if (modal) {
    modal.classList.add('active');
    const form = document.getElementById('form-new-demand');
    if (form && !form.__wired) {
      form.__wired = true;
      form.addEventListener('submit', handleNewDemandSubmit);
    }
  }
}

function closePostDemandModal() {
  const modal = document.getElementById('modal-post-demand');
  if (modal) modal.classList.remove('active');
}

async function handleNewDemandSubmit(e) {
  if (e) e.preventDefault();
  const cropSelect = document.getElementById('demand-crop');
  const tonnageInput = document.getElementById('demand-tonnage');
  const unitSelect = document.getElementById('demand-unit');
  const priceInput = document.getElementById('demand-price');
  const priceUnitSelect = document.getElementById('demand-price-unit');
  
  const crop = cropSelect ? cropSelect.value : 'Red Onion (Lasalgaon Garwa)';
  const tonnageVal = tonnageInput ? parseFloat(tonnageInput.value) || 50 : 50;
  const unit = unitSelect ? unitSelect.value : 'Qt';
  const priceVal = priceInput ? parseFloat(priceInput.value) || 18.0 : 18.0;
  const priceUnit = priceUnitSelect ? priceUnitSelect.value : 'kg';

  const pricePerKg = priceUnit === 'kg' ? priceVal : (priceVal / 100);
  const tonnageQt = unit === 'Qt' ? tonnageVal : (tonnageVal / 100);
  const totalKg = tonnageQt * 100;

  const newDemand = {
    id: `DEM-MH-${Math.floor(1000 + Math.random() * 9000)}`,
    crop: crop,
    category: 'Fresh Farm Produce',
    tonnage: `${tonnageQt} Qt (${totalKg.toLocaleString('en-IN')} kg)`,
    tonnageNum: tonnageQt,
    targetPrice: `₹ ${pricePerKg.toFixed(2)}/kg`,
    pricePerKg: pricePerKg,
    location: 'Vashi APMC Central Terminal, Navi Mumbai, MH',
    deadline: '28 Sep 2026',
    statusLabel: '● Broadcasting (Matching FPOs)',
    statusClass: 'badge-status-broadcasting',
    fulfilledPct: 0,
    bids: []
  };

  if (!buyerData.buyerDemands) buyerData.buyerDemands = [];
  buyerData.buyerDemands.unshift(newDemand);
  try {
    localStorage.setItem('agrinex_buyer_demands', JSON.stringify(buyerData.buyerDemands));
  } catch(err) {}

  if (window.apiClient) {
    window.apiClient.postDemand(newDemand).catch(err => {
      console.warn('[AgriNex] Offline demand saved locally', err);
    });
  }

  closePostDemandModal();
  renderBuyerDemands();
  if (typeof showToast === 'function') {
    showToast(`✓ Procurement Quota for ${crop} broadcasted across 48 APMC Mandis!`);
  }
}

async function syncDemandsFromBackend() {
  if (window.apiClient) {
    try {
      const serverDemands = await window.apiClient.getDemands();
      if (Array.isArray(serverDemands) && serverDemands.length > 0) {
        const existingIds = new Set((buyerData.buyerDemands || []).map(d => d.id));
        serverDemands.forEach(sd => {
          if (!existingIds.has(sd.id)) {
            buyerData.buyerDemands.unshift({
              ...sd,
              statusLabel: sd.statusLabel || '● Broadcasting',
              statusClass: sd.statusClass || 'badge-status-open'
            });
          }
        });
        renderBuyerDemands();
      }
    } catch(err) {
      console.warn('Backend demands fetch skipped, using local store', err);
    }
  }
}

function handleNewDemandSubmit(e) {
  if (e) e.preventDefault();

  const crop = document.getElementById('demand-crop')?.value || 'Red Onion (Lasalgaon Garwa)';
  const tonnage = parseFloat(document.getElementById('demand-tonnage')?.value) || 50;
  const unit = document.getElementById('demand-unit')?.value || 'Qt';
  const price = parseFloat(document.getElementById('demand-price')?.value) || 18.00;
  const priceUnit = document.getElementById('demand-price-unit')?.value || 'kg';

  const qtyQt = unit === 'kg' ? tonnage / 100 : tonnage;
  const qtyKg = unit === 'kg' ? tonnage : tonnage * 100;
  const pricePerKg = priceUnit === 'qt' ? price / 100 : price;

  const newDemandId = `DEM-MH-${Math.floor(100 + Math.random() * 900)}`;

  const newDemand = {
    id: newDemandId,
    commodity: crop,
    crop: crop,
    category: 'Vegetables',
    image: 'assets/images/onion.jpg',
    targetQtyNum: qtyQt,
    targetQty: `${qtyQt} Qt (${qtyKg.toLocaleString('en-IN')} kg)`,
    targetVolume: `${qtyQt} Qt`,
    sourcedVolume: 0,
    sourcedVolumeText: '0 Qt',
    fulfilledPct: 0,
    ceilingPriceKg: pricePerKg,
    ceilingPrice: `₹ ${pricePerKg.toFixed(2)} /kg`,
    mandiBenchmark: `₹ ${(pricePerKg * 0.95).toFixed(2)} /kg`,
    location: 'Vashi APMC Central Terminal, Navi Mumbai, MH',
    destination: 'Vashi APMC Central Terminal, Navi Mumbai, MH',
    deadline: '31 Oct 2026',
    daysLeft: 42,
    status: 'broadcasting',
    statusLabel: '● Broadcasting Quota',
    spec: 'Grade A (Export / Supermarket >= 70%)',
    bids: []
  };

  if (!buyerData.buyerDemands) buyerData.buyerDemands = [];
  buyerData.buyerDemands.unshift(newDemand);
  buyerData.demands = buyerData.buyerDemands;

  try {
    localStorage.setItem('agrinex_buyer_demands', JSON.stringify(buyerData.buyerDemands));
  } catch (err) {
    console.warn('Could not persist buyer demands:', err);
  }

  closePostDemandModal();
  renderBuyerDemands();

  if (window.apiClient) {
    window.apiClient.createDemand({
      commodity: newDemand.commodity,
      target_qty: newDemand.targetQty,
      target_price: newDemand.ceilingPrice,
      deadline: newDemand.deadline
    }).catch(err => console.warn('Offline demand sync skipped', err));
  }

  if (typeof showToast === 'function') {
    showToast(`✓ Sourcing quota #${newDemandId} posted! Broadcasting to 1,200+ FPOs & verified farmers.`, 'success');
  }
}

document.addEventListener('agrinex:partials-ready', () => {
  const form = document.getElementById('form-new-demand');
  if (form && !form.__wired) {
    form.__wired = true;
    form.addEventListener('submit', handleNewDemandSubmit);
  }
  syncDemandsFromBackend();
});

// Global delegated listener for post demand form
document.addEventListener('submit', (e) => {
  if (e.target && e.target.id === 'form-new-demand') {
    handleNewDemandSubmit(e);
  }
});

// Location Switcher
function updateDemandPricePreview() {
  const priceInput = document.getElementById('demand-price');
  const unitSelect = document.getElementById('demand-price-unit');
  const previewEl = document.getElementById('demand-price-preview');
  if (!priceInput || !previewEl) return;

  const rawVal = parseFloat(priceInput.value) || 0;
  const isKg = (unitSelect && unitSelect.value === 'kg');

  if (isKg) {
    previewEl.innerHTML = `= <strong>₹ ${rawVal.toFixed(2)} /kg</strong>`;
  } else {
    const kgEquiv = (rawVal / 100).toFixed(2);
    previewEl.innerHTML = `= <strong>₹ ${kgEquiv} /kg</strong>`;
  }
}

// Demands Window Bindings
window.demandFilters = demandFilters;
window.handleDemandSearch = handleDemandSearch;
window.filterDemandsByStatus = filterDemandsByStatus;
window.filterDemandsByHub = filterDemandsByHub;
window.clearDemandFilters = clearDemandFilters;
window.renderBuyerDemands = renderBuyerDemands;
window.openDemandBidsModal = openDemandBidsModal;
window.closeDemandBidsModal = closeDemandBidsModal;
window.acceptDemandFarmerBid = acceptDemandFarmerBid;
window.sourceFromMarketplaceForDemand = sourceFromMarketplaceForDemand;
window.downloadPurchaseOrder = downloadPurchaseOrder;
window.downloadAllPurchaseOrders = downloadAllPurchaseOrders;
window.refreshDemandMatches = refreshDemandMatches;
window.updateDemandPricePreview = updateDemandPricePreview;
window.openPostDemandModal = openPostDemandModal;
window.closePostDemandModal = closePostDemandModal;
window.handleNewDemandSubmit = handleNewDemandSubmit;
