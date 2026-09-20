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

function getCropImage(cropName) {
  if (!cropName) return 'assets/images/onion.jpg';
  const c = String(cropName).toLowerCase();

  if (c.includes('onion') || c.includes('कांदा') || c.includes('kanda') || c.includes('pyaz') || c.includes('प्याज') || c.includes('garwa')) {
    return 'assets/images/onion.jpg';
  }
  if (c.includes('tomato') || c.includes('टोमॅटो') || c.includes('टमाटर') || c.includes('tamatar')) {
    return 'assets/images/tomato.jpg';
  }
  if (c.includes('banana') || c.includes('केळी') || c.includes('केला') || c.includes('kela') || c.includes('naine')) {
    return 'assets/images/banana.jpg';
  }
  if (c.includes('soybean') || c.includes('सोयाबीन') || c.includes('soya') || c.includes('js-335') || c.includes('js 335')) {
    return 'assets/images/soybean.jpg';
  }
  if (c.includes('orange') || c.includes('संत्रा') || c.includes('santra') || c.includes('mandarin') || c.includes('narangi') || c.includes('नारंगी')) {
    return 'assets/images/orange.jpg';
  }
  if (c.includes('turmeric') || c.includes('हळद') || c.includes('haldi') || c.includes('हल्दी') || c.includes('curcumin') || c.includes('rajapuri')) {
    return 'assets/images/turmeric.jpg';
  }
  if (c.includes('mango') || c.includes('आंबा') || c.includes('आम') || c.includes('aam') || c.includes('alphonso') || c.includes('hapus') || c.includes('हापूस')) {
    return 'assets/images/mango.jpg';
  }
  if (c.includes('pomegranate') || c.includes('डाळिंब') || c.includes('anar') || c.includes('अनार') || c.includes('bhagwa')) {
    return 'assets/images/pomegranate.jpg';
  }
  if (c.includes('cotton') || c.includes('कापूस') || c.includes('kapas') || c.includes('कपास')) {
    return 'assets/images/cotton.jpg';
  }
  if (c.includes('wheat') || c.includes('गहू') || c.includes('gehun') || c.includes('गेहूं') || c.includes('sharbati') || c.includes('lokwan')) {
    return 'assets/images/wheat.jpg';
  }
  if (c.includes('rice') || c.includes('तांदूळ') || c.includes('chawal') || c.includes('चावल') || c.includes('kolam') || c.includes('paddy') || c.includes('धान')) {
    return 'assets/images/rice.jpg';
  }
  if (c.includes('grapes') || c.includes('द्राक्षे') || c.includes('angur') || c.includes('अंगूर') || c.includes('thompson')) {
    return 'assets/images/grapes.jpg';
  }
  if (c.includes('potato') || c.includes('बटाटा') || c.includes('aloo') || c.includes('आलू') || c.includes('jyoti')) {
    return 'assets/images/potato.jpg';
  }
  if (c.includes('chilli') || c.includes('chili') || c.includes('मिरची') || c.includes('mirchi') || c.includes('मिर्च')) {
    return 'assets/images/green_chilli.jpg';
  }
  if (c.includes('bajra') || c.includes('बाजरी') || c.includes('millet')) {
    return 'assets/images/bajra.jpg';
  }
  if (c.includes('jowar') || c.includes('ज्वारी') || c.includes('sorghum') || c.includes('shalu')) {
    return 'assets/images/jowar.jpg';
  }
  if (c.includes('chana') || c.includes('हरभरा') || c.includes('चना') || c.includes('gram')) {
    return 'assets/images/chana.jpg';
  }
  if (c.includes('tur') || c.includes('तूर') || c.includes('arhar') || c.includes('अरहर') || c.includes('pigeon pea')) {
    return 'assets/images/tur.jpg';
  }
  if (c.includes('mung') || c.includes('moong') || c.includes('मूग') || c.includes('मूंग')) {
    return 'assets/images/mung.jpg';
  }
  if (c.includes('urad') || c.includes('उडीद') || c.includes('उडद')) {
    return 'assets/images/urad.jpg';
  }
  if (c.includes('groundnut') || c.includes('भुईमूग') || c.includes('peanut') || c.includes('मूंगफली')) {
    return 'assets/images/groundnut.jpg';
  }
  if (c.includes('sugarcane') || c.includes('ऊस') || c.includes('ganna') || c.includes('गन्ना')) {
    return 'assets/images/sugarcane.jpg';
  }
  if (c.includes('guava') || c.includes('पेरू') || c.includes('amrood') || c.includes('अमरूद')) {
    return 'assets/images/guava.jpg';
  }
  if (c.includes('papaya') || c.includes('पपई') || c.includes('पपीता')) {
    return 'assets/images/papaya.jpg';
  }
  if (c.includes('garlic') || c.includes('लसूण') || c.includes('lahsun') || c.includes('लहसुन')) {
    return 'assets/images/garlic.jpg';
  }
  if (c.includes('lemon') || c.includes('लिंबू') || c.includes('nimbu') || c.includes('नींबू')) {
    return 'assets/images/lemon.jpg';
  }
  if (c.includes('capsicum') || c.includes('ढोबळी') || c.includes('shimla')) {
    return 'assets/images/capsicum.jpg';
  }
  if (c.includes('cabbage') || c.includes('कोबी') || c.includes('patta gobhi')) {
    return 'assets/images/cabbage.jpg';
  }
  if (c.includes('cauliflower') || c.includes('फ्लॉवर') || c.includes('phool gobhi')) {
    return 'assets/images/cauliflower.jpg';
  }
  if (c.includes('brinjal') || c.includes('वांगी') || c.includes('baingan') || c.includes('बैंगन') || c.includes('eggplant')) {
    return 'assets/images/brinjal.jpg';
  }
  if (c.includes('cucumber') || c.includes('काकडी') || c.includes('kheera') || c.includes('खीरा')) {
    return 'assets/images/cucumber.jpg';
  }
  if (c.includes('watermelon') || c.includes('कलिंगड') || c.includes('tarbooj') || c.includes('तरबूज')) {
    return 'assets/images/watermelon.jpg';
  }

  return 'assets/images/onion.jpg';
}
if (typeof window !== 'undefined') {
  window.getCropImage = getCropImage;
}

function renderBuyerDemands() {
  const container = document.getElementById('demands-list-container');
  if (!container || !buyerData.buyerDemands) return;

  // Auto-deduplicate and filter out redundant identical test duplicates
  const seenIds = new Set();
  const seenSignatures = new Map();
  buyerData.buyerDemands = buyerData.buyerDemands.filter(dem => {
    if (!dem || !dem.id) return false;
    if (seenIds.has(dem.id)) return false;
    seenIds.add(dem.id);
    const sig = `${dem.crop}|${dem.tonnage}|${dem.targetPrice}|${dem.location}`.toLowerCase();
    const count = seenSignatures.get(sig) || 0;
    if (count >= 2) return false;
    seenSignatures.set(sig, count + 1);
    return true;
  });

  // Auto-normalize image and bid avatar paths to avoid broken or fallback images
  buyerData.buyerDemands.forEach(dem => {
    if (!dem.image || (dem.image.includes('tomato.jpg') && !dem.crop.toLowerCase().includes('tomato') && !dem.crop.toLowerCase().includes('टोमॅटो') && !dem.crop.toLowerCase().includes('टमाटर'))) {
      dem.image = getCropImage(dem.crop);
    } else if (dem.image.includes('?')) {
      dem.image = dem.image.split('?')[0];
    }
    if (Array.isArray(dem.bids)) {
      dem.bids.forEach(b => {
        if (!b.farmerAvatar || b.farmerAvatar.includes('onion') || b.farmerAvatar.includes('tomato') || b.farmerAvatar.includes('banana') || b.farmerAvatar.includes('soybean') || b.farmerAvatar.includes('turmeric')) {
          b.farmerAvatar = 'assets/images/farmer-avatar.jpg';
        } else if (b.farmerAvatar.includes('?')) {
          b.farmerAvatar = b.farmerAvatar.split('?')[0];
        }
      });
    }
  });

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
    const cropImg = dem.image || getCropImage(dem.crop);

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
            <img src="${cropImg}" alt="${dem.crop}" style="width: 56px; height: 56px; border-radius: 12px; object-fit: cover; border: 1.5px solid #e2e8f0; box-shadow: 0 4px 10px rgba(0,0,0,0.06);" onerror="this.onerror=null; this.src=getCropImage('${(dem.crop || '').replace(/'/g, "\\'")}');" />
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

            <button class="btn btn-outline btn-sm" onclick="deleteDemandQuota('${dem.id}')" style="font-size: 0.78rem; font-weight: 700; border-color: #fecdd3; color: #e11d48; background: #fff1f2;" title="Cancel & Remove Quota">
              🗑️
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
                <img src="${bid.farmerAvatar || 'assets/images/farmer-avatar.jpg'}" alt="${bid.farmerName}" style="width: 40px; height: 40px; border-radius: 50%; object-fit: cover; border: 1.5px solid #86efac;" onerror="this.onerror=null; this.src='assets/images/farmer-avatar.jpg';" />
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
    image: getCropImage(crop),
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
    
    // Cross-tab real-time broadcast to Farmer & Admin modules
    if (typeof BroadcastChannel !== 'undefined') {
      const syncChannel = new BroadcastChannel('agrinex_cross_module_sync');
      syncChannel.postMessage({ type: 'DEMANDS_UPDATED', demand: newDemand });
    }
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
        let added = false;
        serverDemands.forEach(sd => {
          if (!existingIds.has(sd.id)) {
            buyerData.buyerDemands.push({
              ...sd,
              image: sd.image || getCropImage(sd.crop),
              statusLabel: sd.statusLabel || '● Broadcasting Quota',
              statusClass: sd.statusClass || 'badge-status-open'
            });
            existingIds.add(sd.id);
            added = true;
          }
        });
        if (added) {
          try {
            localStorage.setItem('agrinex_buyer_demands', JSON.stringify(buyerData.buyerDemands));
          } catch (e) {}
          renderBuyerDemands();
        }
      }
    } catch (err) {
      console.warn('Backend demands fetch skipped, using local store', err);
    }
  }
}

  // Allow deleting/cancelling any unwanted or duplicate quotas
  async function deleteDemandQuota(demandId) {
    if (!buyerData.buyerDemands) return;
    const idx = buyerData.buyerDemands.findIndex(d => d.id === demandId);
    if (idx === -1) return;

    const cropName = buyerData.buyerDemands[idx].crop;
    if (confirm(`Are you sure you want to cancel and remove procurement quota #${demandId} (${cropName})?`)) {
      buyerData.buyerDemands.splice(idx, 1);
      buyerData.demands = buyerData.buyerDemands;
      try {
        localStorage.setItem('agrinex_buyer_demands', JSON.stringify(buyerData.buyerDemands));
        if (typeof BroadcastChannel !== 'undefined') {
          const syncChannel = new BroadcastChannel('agrinex_cross_module_sync');
          syncChannel.postMessage({ type: 'DEMANDS_UPDATED', deletedId: demandId });
        }
      } catch(err) {}

      // Delete from backend API
      try {
        if (window.apiClient && typeof window.apiClient.deleteDemand === 'function') {
          window.apiClient.deleteDemand(demandId).catch(e => console.warn('[AgriNex] Backend delete failed', e));
        } else {
          fetch(`/api/buyer/demands/${demandId}`, { method: 'DELETE' }).catch(() => {});
        }
      } catch (err) {}

      renderBuyerDemands();
      if (typeof showToast === 'function') {
        showToast(`✓ Quota #${demandId} canceled and removed from active board.`);
      }
    }
  }
  window.deleteDemandQuota = deleteDemandQuota;

  // Reset buyer demands back to clean default quotas (removing old test duplicates)
  async function resetBuyerDemandsToDefault() {
    if (confirm('Reset and clean all procurement quotas back to the standard institutional seed contracts? All test duplicates will be cleared.')) {
      localStorage.removeItem('agrinex_buyer_demands');
      localStorage.removeItem('agrinex_fpo_bulk_demands');

      // Call backend reset
      try {
        if (window.apiClient && typeof window.apiClient.resetDemands === 'function') {
          await window.apiClient.resetDemands();
        } else {
          await fetch('/api/buyer/demands/reset', { method: 'POST' });
        }
      } catch (err) {
        console.warn('Backend reset failed', err);
      }

      // Revert to initial template from data.js
      if (typeof BUYER_DATA !== 'undefined' && BUYER_DATA.buyerDemands) {
        buyerData.buyerDemands = JSON.parse(JSON.stringify(BUYER_DATA.buyerDemands));
      } else {
        buyerData.buyerDemands = (buyerData.buyerDemands || []).slice(0, 6);
      }
      buyerData.demands = buyerData.buyerDemands;

      try {
        localStorage.setItem('agrinex_buyer_demands', JSON.stringify(buyerData.buyerDemands));
        if (typeof BroadcastChannel !== 'undefined') {
          const syncChannel = new BroadcastChannel('agrinex_cross_module_sync');
          syncChannel.postMessage({ type: 'DEMANDS_UPDATED' });
        }
      } catch(err) {}
      renderBuyerDemands();
      if (typeof showToast === 'function') {
        showToast('🧹 Cleaned all accumulated test quotas! Reset to standard active board.', 'success');
      }
    }
  }
  window.resetBuyerDemandsToDefault = resetBuyerDemandsToDefault;

  document.addEventListener('agrinex:partials-ready', () => {
    const form = document.getElementById('form-new-demand');
    if (form && !form.__wired) {
      form.__wired = true;
      form.addEventListener('submit', handleNewDemandSubmit);
    }
    syncDemandsFromBackend();
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
