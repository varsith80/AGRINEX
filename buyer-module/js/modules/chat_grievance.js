/**
 * AgriNex Buyer Module - Direct Chat Negotiation & Grievance Redressal
 * Handles in-app buyer-farmer messaging, counter-offers, and 4-stage dispute resolution.
 */

// 8 Verified Farmer Contacts for Direct APMC Negotiation
const INITIAL_CONVERSATIONS = {
  patil: {
    name: "Patil Rameshwar",
    avatar: "assets/images/onion.jpg",
    status: "● Online • Lasalgaon, Nashik, Maharashtra",
    lotId: "LOT-ONI-01",
    crop: "Red Onion (Nashik Garwa Quality)",
    farmerPhone: "+91 98220-44911",
    offerText: "Farmer Ask Rate: <strong style=\"color: #0c5a36;\">₹ 18.00 /kg</strong> for 10,000 kg (Lasalgaon APMC Gate)",
    counterRate: 18.00,
    lockRateText: "Lock 35% Escrow (₹ 18.00/kg)",
    messages: [
      { type: "incoming", text: "Namaste Karthik sir! I have 10,000 kg export-graded Garwa red onions cured and ready at Lasalgaon APMC yard." },
      { type: "outgoing", text: "Hello Patil ji! We are looking for immediate institutional dispatch to Navi Mumbai Terminal. Can you load today?" },
      { type: "incoming", text: "Yes sir, weighing is completed on electronic weighbridge. Once 35% advance escrow is locked, truck can move immediately via Samruddhi Expressway." }
    ]
  },
  deshmukh: {
    name: "Sanjay Deshmukh",
    avatar: "assets/images/tomato.jpg",
    status: "● Online • Manchar, Pune (18 km away)",
    lotId: "LOT-TOM-02",
    crop: "Tomato (Shivam / Abhinav Hybrid)",
    farmerPhone: "+91 98224-33100",
    offerText: "Farmer countered at <strong style=\"color: #0c5a36;\">₹ 13.00 /kg</strong> for 6,000 kg (Retail Ready)",
    counterRate: 13.00,
    lockRateText: "Lock 35% Escrow (₹ 13.00/kg)",
    messages: [
      { type: "incoming", text: "Hello sir, my 6,000 kg Narayangaon hybrid tomato harvest has 82% firmness index, packed in sanitized returnable crates." },
      { type: "outgoing", text: "Hi Sanjay ji, what is your best floor price for the entire lot?" },
      { type: "incoming", text: "I can offer ₹ 13.00/kg direct farm-gate price if payment is routed through AgriNex Smart Escrow." }
    ]
  },
  shinde: {
    name: "Rajesh Shinde",
    avatar: "assets/images/banana.jpg",
    status: "● Online • Raver, Jalgaon (Khandesh Banana Belt)",
    lotId: "LOT-BAN-03",
    crop: "Grand Naine Banana (GI Khandesh Export)",
    farmerPhone: "+91 98500-11234",
    offerText: "GI Certified Khandesh: <strong style=\"color: #0c5a36;\">₹ 14.50 /kg</strong> for 12,000 kg",
    counterRate: 14.50,
    lockRateText: "Lock 35% Escrow (₹ 14.50/kg)",
    messages: [
      { type: "incoming", text: "Namaskar! 12,000 kg Grand Naine bananas harvested at mature green stage with 7-8 hands per bunch ready for reefer transport." },
      { type: "outgoing", text: "Excellent quality! We need temperature-logged reefer transport at 13.5°C to Navi Mumbai." },
      { type: "incoming", text: "All pre-cooling and foam pad packaging done. Ready for loading at Raver hub." }
    ]
  },
  jadhav: {
    name: "Anandrao Jadhav",
    avatar: "assets/images/wheat-logo.png",
    status: "● Online • Latur Mega APMC Silo Yard",
    lotId: "LOT-SOY-04",
    crop: "Yellow Soybean (JS 335 / High Protein)",
    farmerPhone: "+91 98231-55890",
    offerText: "FPO Bulk Single-Origin: <strong style=\"color: #0c5a36;\">₹ 42 /kg</strong> for 150 Qt",
    counterRate: 4200,
    lockRateText: "Lock 35% Escrow (₹ 42/kg)",
    messages: [
      { type: "incoming", text: "Greetings Karthik! Latur FPO has 150 Qt clean JS-335 soybean with 19% oil content ready in 50kg jute bags." }
    ]
  },
  thorat: {
    name: "Kavita Thorat",
    avatar: "assets/images/turmeric.jpg",
    status: "● Online • Sangli APMC (Turmeric Market)",
    lotId: "LOT-TUR-06",
    crop: "Sangli Rajapuri Turmeric Finger",
    farmerPhone: "+91 98228-88190",
    offerText: "Lab Tested Curcumin 4.8%: <strong style=\"color: #0c5a36;\">₹ 135 /kg</strong> for 50 Qt",
    counterRate: 13500,
    lockRateText: "Lock 35% Escrow (₹ 135/kg)",
    messages: [
      { type: "incoming", text: "Namaste sir, 50 Qt double-polished Rajapuri turmeric fingers available for direct institutional spice procurement." }
    ]
  },
  wankhede: {
    name: "Vikas Wankhede",
    avatar: "assets/images/orange.jpg",
    status: "● Online • Katol, Nagpur (Vidarbha Citrus)",
    lotId: "LOT-ORG-05",
    crop: "Nagpur Orange / Santra (GI Vidarbha Quality)",
    farmerPhone: "+91 98222-33104",
    offerText: "GI Table Fruit: <strong style=\"color: #0c5a36;\">₹ 38 /kg</strong> for 80 Qt",
    counterRate: 3800,
    lockRateText: "Lock 35% Escrow (₹ 38/kg)",
    messages: [
      { type: "incoming", text: "Hello Karthik sir, fresh harvest Nagpur mandarins graded by electronic weight sizer ready at Katol packhouse." }
    ]
  },
  chavan: {
    name: "Sunil Chavan",
    avatar: "assets/images/pomegranate.jpg?v=2",
    status: "● Online • Pandharpur, Solapur (Pomegranate Belt)",
    lotId: "LOT-POM-07",
    crop: "Bhagwa Pomegranate (Solapur Export Grade)",
    farmerPhone: "+91 98226-44102",
    offerText: "Deep Red Arils: <strong style=\"color: #0c5a36;\">₹ 88 /kg</strong> for 40 Qt",
    counterRate: 8800,
    lockRateText: "Lock 35% Escrow (₹ 88/kg)",
    messages: [
      { type: "incoming", text: "Namaskar! 40 Qt export-grade Bhagwa pomegranates (250g+ fruit weight) boxed in 10kg corrugated cartons." }
    ]
  },
  more: {
    name: "Balasaheb More",
    avatar: "assets/images/cotton.jpg?v=2",
    status: "● Online • Amravati APMC (Vidarbha Cotton Yard)",
    lotId: "LOT-COT-08",
    crop: "Raw Cotton (Vidarbha Long Staple)",
    farmerPhone: "+91 98225-77890",
    offerText: "Staple >29mm: <strong style=\"color: #0c5a36;\">₹ 62 /kg</strong> for 90 Qt",
    counterRate: 6200,
    lockRateText: "Lock 35% Escrow (₹ 62/kg)",
    messages: [
      { type: "incoming", text: "Greetings! 90 Qt long staple cotton pressed bales ready for institutional textile & ginning delivery." }
    ]
  }
};

let chatConversations = {};
try {
  const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('agrinex_buyer_chats') : null;
  if (saved) {
    const parsed = JSON.parse(saved);
    chatConversations = Object.assign({}, JSON.parse(JSON.stringify(INITIAL_CONVERSATIONS)), parsed);
  } else {
    chatConversations = JSON.parse(JSON.stringify(INITIAL_CONVERSATIONS));
  }
} catch(e) {
  chatConversations = JSON.parse(JSON.stringify(INITIAL_CONVERSATIONS));
}

let activeChatKey = 'patil';

function saveChatConversations() {
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('agrinex_buyer_chats', JSON.stringify(chatConversations));
    }
  } catch(e) {
    console.warn('Could not save chat conversations to localStorage:', e);
  }
}

window.chatConversations = chatConversations;
window.getActiveChatKey = function() { return typeof activeChatKey !== 'undefined' ? activeChatKey : 'patil'; };
window.saveChatConversations = saveChatConversations;


function filterChatContacts(query) {
  const q = (query || '').toLowerCase().trim();
  const contacts = document.querySelectorAll('.chat-contact');
  contacts.forEach(c => {
    const text = c.textContent.toLowerCase();
    if (!q || text.includes(q)) {
      c.style.display = 'flex';
    } else {
      c.style.display = 'none';
    }
  });
}

// Quick reply chip helper
function insertQuickChatMsg(text) {
  const input = document.getElementById('chat-input-field');
  if (input) {
    input.value = window.tText ? window.tText(text) : text;
    input.focus();
  }
}

// Render Dynamic Chat Sidebar with all active farmers
function renderChatSidebar() {
  const container = document.getElementById('chat-contacts-container');
  if (!container) return;

  const isMr = window.getBuyerLanguage && window.getBuyerLanguage() === 'mr';
  const isHi = window.getBuyerLanguage && window.getBuyerLanguage() === 'hi';
  const onlineText = isMr ? 'सक्रिय' : isHi ? 'सक्रिय' : 'Online';

  const keys = Object.keys(chatConversations);
  const badge = document.getElementById('chat-active-count-badge');
  if (badge) badge.textContent = `${keys.length} ${onlineText}`;

  container.innerHTML = keys
    .map(key => {
      const chat = chatConversations[key];
      const transName = window.tPerson ? window.tPerson(chat.name) : chat.name;
      const transCrop = window.tCrop ? window.tCrop(chat.crop) : chat.crop;
      const lastMsg = chat.messages && chat.messages.length > 0 
        ? (window.tText ? window.tText(chat.messages[chat.messages.length - 1].text) : chat.messages[chat.messages.length - 1].text)
        : `Ask: ${chat.offerText.replace(/<[^>]*>/g, '')}`;
      const isActive = key === activeChatKey ? 'active' : '';

      return `
        <div class="chat-contact ${isActive}" id="chat-contact-${key}" onclick="selectChatContact('${key}')">
          <div class="avatar-wrapper">
            <img src="${chat.avatar}" alt="${transName}" style="width: 42px; height: 42px; border-radius: 50%; object-fit: cover;" onerror="this.src='assets/images/tomato.jpg'" />
            <span class="avatar-online-dot"></span>
          </div>
          <div style="flex: 1; min-width: 0;">
            <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 2px;">
              <strong style="font-size: 0.88rem; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 140px;">${transName}</strong>
              <span style="font-size: 0.65rem; color: #166534; font-weight: 700; background: #f0fdf4; padding: 1px 5px; border-radius: 4px;">${onlineText}</span>
            </div>
            <div style="font-size: 0.72rem; color: #0c5a36; font-weight: 700;">${transCrop}</div>
            <span style="font-size: 0.72rem; color: #64748b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block; margin-top: 2px;">${lastMsg}</span>
          </div>
        </div>
      `;
    })
    .join('');
  if (activeChatKey && chatConversations[activeChatKey]) {
    selectChatContact(activeChatKey);
  }
}

// Select a specific Farmer Chat Contact
function selectChatContact(contactKey) {
  if (!chatConversations[contactKey]) return;
  activeChatKey = contactKey;
  const chat = chatConversations[contactKey];

  const isMr = window.getBuyerLanguage && window.getBuyerLanguage() === 'mr';
  const isHi = window.getBuyerLanguage && window.getBuyerLanguage() === 'hi';

  const transName = window.tPerson ? window.tPerson(chat.name) : chat.name;
  const transCrop = window.tCrop ? window.tCrop(chat.crop) : chat.crop;
  const transStatus = window.tLocation ? window.tLocation(chat.status) : chat.status;
  const counterBtnText = isMr ? 'प्रति-बोली द्या' : isHi ? 'प्रति-प्रस्ताव' : 'Counter Offer';
  const lockRateBtnText = window.tText ? window.tText(chat.lockRateText) : chat.lockRateText;
  const activeOfferLabel = isMr ? 'सक्रिय ऑफर:' : isHi ? 'सक्रिय ऑफर:' : 'Active Offer:';
  const acceptLockText = isMr ? '✓ स्वीकारा व सुरक्षित करा' : isHi ? '✓ स्वीकारें एवं लॉक करें' : '✓ Accept & Lock';
  const reCounterText = isMr ? 'पुन्हा बोली द्या' : isHi ? 'पुनः बोली लगाएं' : 'Re-counter';

  // Update active pill in sidebar
  document.querySelectorAll('.chat-contact').forEach(c => c.classList.remove('active'));
  const activeEl = document.getElementById(`chat-contact-${contactKey}`);
  if (activeEl) activeEl.classList.add('active');

  // Update Header
  const headerName = document.getElementById('chat-header-name');
  const headerStatus = document.getElementById('chat-header-status');
  const headerAvatar = document.getElementById('chat-header-avatar');
  if (headerName) headerName.textContent = transName;
  if (headerStatus) headerStatus.textContent = `${transStatus} • ${transCrop}`;
  if (headerAvatar) headerAvatar.src = chat.avatar;

  const headerActions = document.getElementById('chat-header-actions') || document.querySelector('.chat-main .chat-header > div:last-child');
  if (headerActions) {
    headerActions.innerHTML = `
      <button class="btn btn-outline btn-sm" onclick="openBidModal('${chat.lotId}')" style="font-weight: 700; border-color: #cbd5e1; color: #334155;">${counterBtnText}</button>
      <button class="btn btn-primary btn-sm" onclick="openDirectBuyModal('${chat.lotId}')" style="background: linear-gradient(135deg, #0c5a36 0%, #064e3b 100%); font-weight: 800; box-shadow: 0 4px 10px rgba(12, 90, 54, 0.25);">${lockRateBtnText}</button>
    `;
  }

  // Update Active Offer Banner
  const banner = document.querySelector('.chat-offer-banner');
  if (banner) {
    const transOfferText = window.tText ? window.tText(chat.offerText) : chat.offerText;
    banner.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px;">
        <span class="chat-offer-badge">⚡</span>
        <span class="chat-offer-text"><strong>${activeOfferLabel}</strong> ${transOfferText}</span>
      </div>
      <div style="display: flex; gap: 8px;">
        <button class="btn btn-offer-accept" onclick="acceptFarmerCounter('${chat.lotId}', ${chat.counterRate})">${acceptLockText}</button>
        <button class="btn btn-offer-recounter" onclick="openBidModal('${chat.lotId}')">${reCounterText}</button>
      </div>
    `;
  }

  // Render Messages
  const container = document.getElementById('chat-messages-container');
  if (container) {
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    container.innerHTML = chat.messages
      .map(m => `
        <div class="chat-bubble-group ${m.type}">
          <div class="chat-bubble ${m.type}">
            ${window.tText ? window.tText(m.text) : m.text}
          </div>
          <div class="chat-meta-bar ${m.type}">
            <span>${timeNow}</span>
            ${m.type === 'outgoing' ? '<span style="color: #16a34a; font-weight: 800;">✓✓</span>' : ''}
          </div>
        </div>
      `)
      .join('');
    container.scrollTop = container.scrollHeight;
  }
}

function acceptFarmerCounter(lotId, counterRate) {
  const lot = (buyerData && buyerData.verifiedLots && buyerData.verifiedLots.find(l => l.id === lotId)) || null;
  if (lot && counterRate) {
    lot.pricePerKg = parseFloat(counterRate);
    lot.askPrice = `₹ ${(counterRate * 100).toLocaleString('en-IN')}/qtl (₹${counterRate}/kg)`;
  }
  if (typeof showToast === 'function') {
    showToast(`✓ Farmer counter offer of ₹${counterRate}/kg accepted & locked!`, 'success');
  }
  if (typeof openDirectBuyModal === 'function') {
    openDirectBuyModal(lotId);
  }
}
window.acceptFarmerCounter = acceptFarmerCounter;

// Open Chat directly with any Farmer from Marketplace Lot Card
function openFarmerChat(lotId) {
  let matchedKey = 'patil';
  
  // Find matching key for lotId
  for (const [key, conv] of Object.entries(chatConversations)) {
    if (conv.lotId === lotId) {
      matchedKey = key;
      break;
    }
  }

  // If not found in presets, create dynamic session from buyerData.verifiedLots
  if (!chatConversations[matchedKey] || chatConversations[matchedKey].lotId !== lotId) {
    const lot = buyerData.verifiedLots.find(l => l.id === lotId);
    if (lot) {
      const slug = lot.farmerName.toLowerCase().replace(/[^a-z0-9]/g, '_');
      const kgPrice = lot.pricePerKg || (lot.priceNum / 100).toFixed(0);
      chatConversations[slug] = {
        name: lot.farmerName,
        avatar: lot.image || 'assets/images/farmer-avatar.jpg',
        status: `● Online • ${lot.farmerLocation}`,
        lotId: lot.id,
        crop: lot.crop,
        farmerPhone: lot.farmerPhone || '+91 98422-00000',
        offerText: `Farmer Ask: <strong style="color: #0c5a36;">₹ ${kgPrice} /kg</strong> (${lot.askPrice}) for ${lot.quantity}`,
        counterRate: lot.priceNum,
        lockRateText: `Lock 35% Escrow (₹ ${kgPrice}/kg)`,
        messages: [
          { type: "incoming", text: `Namaste Karthik sir! I am ${lot.farmerName}. My lot of ${lot.crop} (${lot.quantity}) is ready for immediate procurement.` }
        ]
      };
      matchedKey = slug;
    }
  }
  saveChatConversations();

  renderChatSidebar();
  selectChatContact(matchedKey);
  switchView('view-messages');

  const farmerObj = chatConversations[matchedKey];
  showToast(`💬 Direct negotiation room opened with ${farmerObj.name} (${farmerObj.crop})!`);
}

// Start direct chat negotiation from Demand Bids Modal
function startNegotiationWithFarmer(farmerName, crop, bidPriceNum, demandId) {
  closeDemandBidsModal();
  const cleanName = farmerName || 'Farmer Partner';
  const slug = cleanName.toLowerCase().replace(/[^a-z0-9]/g, '_');
  const kgPrice = bidPriceNum ? (bidPriceNum / 100).toFixed(0) : '20';

  if (!chatConversations[slug]) {
    chatConversations[slug] = {
      name: cleanName,
      avatar: 'assets/images/farmer-avatar.jpg',
      status: '● Online • APMC Verified Direct Farmer',
      lotId: demandId || 'DEMAND-BID',
      crop: crop || 'Produce',
      farmerPhone: '+91 98422-00000',
      offerText: `Farmer Quota Bid: <strong style="color: #0c5a36;">₹ ${kgPrice} /kg</strong> for ${crop || 'Produce'}`,
      counterRate: bidPriceNum || 2000,
      lockRateText: `Lock 35% Escrow (₹ ${kgPrice}/kg)`,
      messages: [
        { type: "incoming", text: `Namaste sir! I have placed a quotation bid on your demand #${demandId || ''} for ${crop || 'produce'} at ₹ ${kgPrice}/kg. Let's discuss delivery schedule!` }
      ]
    };
  }

  renderChatSidebar();
  selectChatContact(slug);
  switchView('view-messages');

  const farmerObj = chatConversations[slug];
  showToast(`💬 Direct negotiation room opened with ${farmerObj.name} (${farmerObj.crop})!`);
}

function sendChatMessage() {
  const input = document.getElementById('chat-input-field');
  const container = document.getElementById('chat-messages-container');
  if (!input || !container || !input.value.trim()) return;

  const rawMsg = input.value.trim();
  const safeMsg = window.escapeHTML ? window.escapeHTML(rawMsg) : rawMsg;
  const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const group = document.createElement('div');
  group.className = 'chat-bubble-group outgoing';
  group.innerHTML = `
    <div class="chat-bubble outgoing">${safeMsg}</div>
    <div class="chat-meta-bar outgoing">
      <span>${timeNow}</span>
      <span style="color: #16a34a; font-weight: 800;">✓✓</span>
    </div>
  `;
  container.appendChild(group);

  if (chatConversations[activeChatKey]) {
    chatConversations[activeChatKey].messages.push({ type: "outgoing", text: rawMsg });
    saveChatConversations();
  }

  input.value = '';
  container.scrollTop = container.scrollHeight;

  // Auto farmer reply after 1s
  const currentKey = activeChatKey;
  const currentCrop = chatConversations[currentKey] ? chatConversations[currentKey].crop : 'produce';

  setTimeout(() => {
    let replyText = `Thank you for your message! As agreed for ${currentCrop}, we will prepare the vehicle weighing pass once escrow advance is initiated.`;
    const lower = rawMsg.toLowerCase();
    if (lower.includes('price') || lower.includes('rate') || lower.includes('discount') || lower.includes('offer') || rawMsg.includes('दर') || rawMsg.includes('भाव') || rawMsg.includes('सूट') || rawMsg.includes('किंमत') || rawMsg.includes('मूल्य')) {
      replyText = `Understood Karthik sir. I can offer an instant discount of ₹ 1.50/kg if you confirm bulk lifting with verified lorry receipt today!`;
    } else if (lower.includes('sample') || lower.includes('assay') || lower.includes('quality') || lower.includes('moisture') || rawMsg.includes('ओलावा') || rawMsg.includes('नमुना') || rawMsg.includes('दर्जा') || rawMsg.includes('नमी') || rawMsg.includes('जांच') || rawMsg.includes('गुणवत्ता')) {
      replyText = `Digital moisture and assay report is verified at ${chatConversations[currentKey]?.status?.split('•')[1] || 'farm gate'}. Quality is 100% guaranteed Grade A.`;
    }

    const translatedReply = window.tText ? window.tText(replyText) : replyText;
    const safeReply = window.escapeHTML ? window.escapeHTML(translatedReply) : translatedReply;
    const replyGroup = document.createElement('div');
    replyGroup.className = 'chat-bubble-group incoming';
    const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    replyGroup.innerHTML = `
      <div class="chat-bubble incoming">${safeReply}</div>
      <div class="chat-meta-bar incoming">
        <span>${replyTime}</span>
      </div>
    `;
    container.appendChild(replyGroup);

    if (chatConversations[currentKey]) {
      chatConversations[currentKey].messages.push({ type: "incoming", text: replyText });
      saveChatConversations();
    }

    renderChatSidebar();
    container.scrollTop = container.scrollHeight;
  }, 900);
}

window.filterChatContacts = filterChatContacts;
window.insertQuickChatMsg = insertQuickChatMsg;

// Direct Buy Escrow Modal

function openGrievanceModal() {
  const modal = document.getElementById('modal-file-grievance');
  if (modal) modal.classList.add('active');
}

function closeGrievanceModal() {
  const modal = document.getElementById('modal-file-grievance');
  if (modal) modal.classList.remove('active');
}

function handleGrievanceFileUpload(input) {
  const label = document.getElementById('grv-upload-label');
  if (input.files && input.files[0] && label) {
    label.innerHTML = `✅ Attached: <strong>${input.files[0].name}</strong> (${(input.files[0].size / 1024).toFixed(1)} KB)`;
    label.style.color = '#0c5a36';
  }
}

function filterGrievance(status, btnElement) {
  const buttons = document.querySelectorAll('.grv-filter-btn');
  buttons.forEach(btn => {
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-outline');
  });

  if (btnElement) {
    btnElement.classList.remove('btn-outline');
    btnElement.classList.add('btn-primary');
  }

  renderGrievances(status);
}

function acceptGrievanceResolution(grvId) {
  if (!buyerData.grievances) return;
  const grv = buyerData.grievances.find(g => g.id === grvId);
  if (grv) {
    grv.status = "Resolved & Refunded";
    grv.statusClass = "badge-grade-a";
    grv.resolutionEta = "Closed";
    grv.timeline = [
      { step: "Grievance Raised", done: true, time: "12 Sep, 10:15 AM" },
      { step: "Escrow Settlement Frozen", done: true, time: "12 Sep, 10:16 AM" },
      { step: "AI Assay & Photo Review", done: true, time: "12 Sep, 11:30 AM" },
      { step: "Settlement Agreed & Credited", done: true, time: "Just now" }
    ];
    showToast(`Dispute ${grvId} settled! ₹ 3,900 rebate credit disbursed to your AgriNex wallet.`);
    renderGrievances();
  }
}

function renderGrievances(filterStatus = 'all') {
  const container = document.getElementById('grievances-list-container');
  if (!container || !buyerData.grievances) return;

  const isMr = typeof window.getBuyerLanguage === 'function' && window.getBuyerLanguage() === 'mr';
  const isHi = typeof window.getBuyerLanguage === 'function' && window.getBuyerLanguage() === 'hi';

  let grievances = [...buyerData.grievances];
  if (filterStatus === 'open') {
    grievances = grievances.filter(g => g.status === 'Under Review');
  } else if (filterStatus === 'resolved') {
    grievances = grievances.filter(g => g.status.includes('Resolved'));
  }

  // Update Summary Counts & Filter Tab Labels
  const openCount = buyerData.grievances.filter(g => g.status === 'Under Review').length;
  const resolvedCount = buyerData.grievances.filter(g => g.status.includes('Resolved')).length;
  const allCount = buyerData.grievances.length;

  const countBadgeEl = document.getElementById('grv-active-count');
  if (countBadgeEl) {
    const caseSuffix = isMr ? 'प्रकरण' : (isHi ? 'मामला' : 'Case');
    const casesSuffix = isMr ? 'प्रकरणे' : (isHi ? 'मामले' : 'Cases');
    countBadgeEl.textContent = `${openCount} ${openCount === 1 ? caseSuffix : casesSuffix}`;
  }

  const resolvedBadgeEl = document.getElementById('grv-resolved-count');
  if (resolvedBadgeEl) {
    const caseSuffix = isMr ? 'प्रकरण' : (isHi ? 'मामला' : 'Case');
    const casesSuffix = isMr ? 'प्रकरणे' : (isHi ? 'मामले' : 'Cases');
    resolvedBadgeEl.textContent = `${resolvedCount} ${resolvedCount === 1 ? caseSuffix : casesSuffix}`;
  }

  const filterAllBtn = document.getElementById('filter-grv-all');
  if (filterAllBtn) filterAllBtn.textContent = `${isMr ? 'सर्व दावे' : (isHi ? 'सभी दावे' : 'All Claims')} (${allCount})`;

  const filterOpenBtn = document.getElementById('filter-grv-open');
  if (filterOpenBtn) filterOpenBtn.textContent = `${isMr ? 'चौकशी सुरू' : (isHi ? 'समीक्षाधीन' : 'Under Review')} (${openCount})`;

  const filterResolvedBtn = document.getElementById('filter-grv-resolved');
  if (filterResolvedBtn) filterResolvedBtn.textContent = `${isMr ? 'निवारण पूर्ण' : (isHi ? 'निपटान पूर्ण' : 'Resolved & Settled')} (${resolvedCount})`;

  if (grievances.length === 0) {
    const emptyTitle = isMr ? 'कोणतीही तक्रार आढळली नाही' : (isHi ? 'कोई शिकायत नहीं मिली' : 'No Grievances Found');
    const emptyDesc = isMr ? 'तुमच्या सर्व खेपा आणि गुणवत्ता तपासण्या कोणत्याही सक्रिय वादाशिवाय सुरळीत सुरू आहेत.' : (isHi ? 'आपकी सभी खेप और गुणवत्ता परीक्षण बिना किसी सक्रिय विवाद के सुचारू रूप से चल रहे हैं।' : 'All your consignments and quality assays are running smoothly without active disputes.');
    container.innerHTML = `
      <div style="background: #ffffff; border-radius: 12px; border: 1px solid var(--border-default); padding: 40px 20px; text-align: center; color: #64748b;">
        <div style="font-size: 2.2rem; margin-bottom: 8px;">🛡️</div>
        <h4 style="font-size: 1.05rem; font-weight: 700; color: #0f172a; margin-bottom: 4px;">${emptyTitle}</h4>
        <p style="font-size: 0.85rem;">${emptyDesc}</p>
      </div>
    `;
    return;
  }

  const trT = (t) => (window.tText ? window.tText(t) : t);
  const trS = (t) => (window.tStatus ? window.tStatus(t) : (window.tText ? window.tText(t) : t));

  const filedLabel = isMr ? 'दाखल:' : (isHi ? 'दाखिल:' : 'Filed:');
  const consignmentLabel = isMr ? 'खेप:' : (isHi ? 'खेप:' : 'Consignment:');
  const farmerSourceLabel = isMr ? 'शेतकरी / स्रोत' : (isHi ? 'किसान / स्रोत' : 'Farmer / Source');
  const disputeCatLabel = isMr ? 'तक्रार वर्ग:' : (isHi ? 'विवाद श्रेणी:' : 'Dispute Category:');
  const stepperTitle = isMr ? 'निवारण प्रगती व स्मार्ट करार टप्पे:' : (isHi ? 'निवारण प्रगति एवं स्मार्ट अनुबंध चरण:' : 'Redressal Progress & Smart Contract Milestones:');
  const btnDossier = isMr ? '📄 पुरावा संचिका पहा' : (isHi ? '📄 साक्ष्य दस्तावेज देखें' : '📄 View Evidence Dossier');
  const btnMsg = isMr ? '💬 लवादांशी संवाद साधा' : (isHi ? '💬 मध्यस्थ को संदेश भेजें' : '💬 Message Arbitrator');
  const btnSettle = isMr ? '✓ ५% भाव सूट स्वीकारा (₹ ३,९००)' : (isHi ? '✓ 5% मूल्य छूट स्वीकार करें (₹ 3,900)' : '✓ Settle & Accept 5% Price Rebate (₹ 3,900)');
  const settledBadge = isMr ? '✓ तक्रार निवारण पूर्ण व एस्क्रो मुक्त' : (isHi ? '✓ दावा निपटारा पूर्ण एवं एस्क्रो जारी' : '✓ Claim Settled & Escrow Released');

  container.innerHTML = grievances.map(grv => {
    const isUnderReview = grv.status === 'Under Review';
    const statusBg = isUnderReview ? 'rgba(234, 179, 8, 0.12)' : 'rgba(34, 197, 94, 0.12)';
    const statusColor = isUnderReview ? '#b45309' : '#15803d';
    const statusBorder = isUnderReview ? 'rgba(234, 179, 8, 0.3)' : 'rgba(34, 197, 94, 0.3)';
    const statusDot = isUnderReview ? '🟡' : '✅';
    const statusText = trS(grv.status);

    const timelineHtml = (grv.timeline || []).map((tl, idx) => `
      <div class="stepper-step" style="flex: 1; text-align: center; position: relative;">
        <div class="stepper-dot ${tl.done ? 'active' : ''}" style="margin: 0 auto 6px auto; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.78rem; transition: all 0.2s; ${tl.done ? 'background: #059669; color: #fff; box-shadow: 0 2px 6px rgba(5,150,105,0.3);' : 'background: #f1f5f9; color: #94a3b8; border: 1.5px solid #cbd5e1;'}">
          ${tl.done ? '✓' : (idx + 1)}
        </div>
        <div class="stepper-label" style="font-size: 0.74rem; font-weight: 700; color: ${tl.done ? '#0f172a' : '#94a3b8'};">
          ${trT(tl.step)}
        </div>
        <div style="font-size: 0.65rem; color: #64748b; margin-top: 2px;">
          ${trT(tl.time)}
        </div>
      </div>
    `).join('');

    return `
      <div class="grv-claim-card" style="margin-bottom: 20px;">
        <!-- Top Row Header -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 12px; margin-bottom: 16px; padding-bottom: 14px; border-bottom: 1px solid #f1f5f9;">
          <div>
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px; flex-wrap: wrap;">
              <span style="font-family: monospace; font-weight: 800; color: #0c5a36; font-size: 0.95rem; background: #e8f5e9; padding: 3px 10px; border-radius: 8px; border: 1px solid #c8e6c9;">
                ${grv.id}
              </span>
              <span style="background: ${statusBg}; color: ${statusColor}; border: 1px solid ${statusBorder}; font-weight: 800; font-size: 0.76rem; padding: 4px 12px; border-radius: 20px; display: inline-flex; align-items: center; gap: 5px;">
                ${statusDot} ${statusText}
              </span>
              <span style="font-size: 0.76rem; color: #64748b; font-weight: 500;">
                ${filedLabel} ${trT(grv.dateFiled)}
              </span>
            </div>
            <div style="font-size: 0.88rem; color: #334155; font-weight: 600;">
              ${consignmentLabel} <strong style="color: #0f172a;">${grv.consignmentId || 'LOT-CONS-992'}</strong> • <span style="color: #059669; font-weight: 700;">${window.tCrop ? window.tCrop(grv.crop) : grv.crop}</span>
            </div>
          </div>

          <div style="text-align: right; background: #f8fafc; padding: 8px 14px; border-radius: 10px; border: 1px solid #e2e8f0;">
            <span style="font-size: 0.72rem; color: #64748b; display: block; text-transform: uppercase; font-weight: 700; letter-spacing: 0.03em;">${farmerSourceLabel}</span>
            <strong style="font-size: 0.88rem; color: #0f172a;">${window.tPerson ? window.tPerson(grv.farmerName) : grv.farmerName}</strong>
          </div>
        </div>

        <!-- Issue Category & Description -->
        <div style="background: #f8fafc; border-left: 4px solid ${isUnderReview ? '#d97706' : '#059669'}; border-radius: 8px; padding: 14px 16px; margin-bottom: 18px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; flex-wrap: wrap; gap: 8px;">
            <span style="font-size: 0.78rem; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 0.04em;">
              ${disputeCatLabel} <span style="color: #0f172a;">${trT(grv.category)}</span>
            </span>
            <span style="font-size: 0.78rem; font-weight: 800; color: #dc2626; background: #fee2e2; border: 1px solid #fecaca; padding: 3px 10px; border-radius: 6px; display: inline-flex; align-items: center; gap: 4px;">
              🔒 ${trT(grv.amountUnderHold)}
            </span>
          </div>
          <div style="font-size: 0.84rem; color: #1e293b; line-height: 1.5; font-weight: 500;">
            ${trT(grv.description)}
          </div>
        </div>

        <!-- 4-Step Interactive Timeline Stepper -->
        <div style="margin-bottom: 20px; padding: 16px 12px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: inset 0 1px 3px rgba(0,0,0,0.02);">
          <div style="font-size: 0.72rem; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 14px; padding-left: 4px;">
            ${stepperTitle}
          </div>
          <div class="stepper" style="display: flex; justify-content: space-between; position: relative;">
            ${timelineHtml}
          </div>
        </div>

        <!-- Action Buttons -->
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; padding-top: 14px; border-top: 1px solid #f1f5f9;">
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <button class="btn btn-outline btn-sm" onclick="showToast('${isMr ? 'डिजिटल लॅब प्रमाणपत्र लोड करत आहे...' : (isHi ? 'डिजिटल प्रयोगशाला प्रमाण पत्र लोड हो रहा है...' : 'Loading digital assay certificate...')}', 'success')" style="border-radius: 8px; font-weight: 700; padding: 7px 14px;">
              ${btnDossier}
            </button>
            <button class="btn btn-outline btn-sm" onclick="switchView('view-messages'); showToast('${isMr ? 'AgriNex QA लवादांशी संवाद सुरू करत आहे...' : (isHi ? 'AgriNex QA मध्यस्थ डेस्क से संवाद खोल रहे हैं...' : 'Opening direct grievance chat...') }');" style="border-radius: 8px; font-weight: 700; padding: 7px 14px;">
              ${btnMsg}
            </button>
          </div>

          ${isUnderReview ? `
            <button class="btn btn-primary btn-sm" onclick="acceptGrievanceResolution('${grv.id}')" style="background: linear-gradient(135deg, #059669 0%, #047857 100%); border-color: #047857; border-radius: 8px; font-weight: 800; padding: 8px 16px; box-shadow: 0 3px 10px rgba(5,150,105,0.25);">
              ${btnSettle}
            </button>
          ` : `
            <span style="font-size: 0.82rem; font-weight: 800; color: #15803d; background: #dcfce7; border: 1px solid #bbf7d0; padding: 6px 14px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
              ${settledBadge}
            </span>
          `}
        </div>

      </div>
    `;
  }).join('');

  if (typeof window.walkAndTranslateDOM === 'function') {
    window.walkAndTranslateDOM(container);
  }
}


function submitGrievance(e) {
  if (e) e.preventDefault();

  const lotSelect = document.getElementById('grv-lot-select');
  const catSelect = document.getElementById('grv-category');
  const amtInput = document.getElementById('grv-claim-amount');
  const descInput = document.getElementById('grv-description');

  const lotVal = lotSelect ? lotSelect.value : '';
  const lotParts = lotVal.split('|');
  const lotId = lotParts[0] || 'LOT-ONI-01';
  const crop = lotParts[1] || 'Fresh Produce';
  const farmer = lotParts[2] || 'Farmer Partner';

  const category = catSelect ? catSelect.value : 'Quality Assay Deviation';
  const claimAmt = amtInput ? parseFloat(amtInput.value) || 15000 : 15000;
  const rawDesc = descInput ? descInput.value.trim() : 'Quality variance reported by receiving hub.';
  const safeDesc = window.escapeHTML ? window.escapeHTML(rawDesc) : rawDesc;
  const safeCat = window.escapeHTML ? window.escapeHTML(category) : category;
  const safeCrop = window.escapeHTML ? window.escapeHTML(crop) : crop;
  const safeFarmer = window.escapeHTML ? window.escapeHTML(farmer) : farmer;

  const grvId = `GRV-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const now = new Date();
  const timeFormatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const newGrievance = {
    id: grvId,
    lotId: lotId,
    crop: safeCrop,
    farmer: safeFarmer,
    category: safeCat,
    amount: `₹ ${claimAmt.toLocaleString('en-IN')}`,
    amountNum: claimAmt,
    description: safeDesc,
    status: 'Under Review',
    statusClass: 'badge-status-emergency',
    resolutionEta: 'Within 24 Hours',
    date: `Today, ${timeFormatted}`,
    timeline: [
      { step: 'Grievance Raised', done: true, time: `${timeFormatted}` },
      { step: 'Escrow Settlement Frozen', done: true, time: `${timeFormatted}` },
      { step: 'AI Assay & Photo Review', done: false, time: 'In Progress' },
      { step: 'Settlement Disbursed', done: false, time: 'Pending' }
    ]
  };

  if (!buyerData.grievances) buyerData.grievances = [];
  buyerData.grievances.unshift(newGrievance);
  buyerData.activeGrievances = buyerData.grievances;
  if (window.AgriNexStore) {
    window.AgriNexStore.setState({ grievances: buyerData.grievances });
  }

  try {
    localStorage.setItem('agrinex_buyer_grievances', JSON.stringify(buyerData.grievances));
  } catch(err) {}

  if (buyerData.consignments) {
    const matched = buyerData.consignments.find(c => c.id === lotId || c.tracking_id === lotId || c.lot_id === lotId) ||
                    buyerData.consignments.find(c => c.crop && c.crop.includes(crop.split(' ')[0]));
    if (matched) {
      matched.escrow_frozen = true;
      matched.grievance_status = 'grievance_hold';
      matched.grievance_id = grvId;
      try {
        localStorage.setItem('agrinex_buyer_consignments', JSON.stringify(buyerData.consignments));
      } catch(err) {}
    }
  }

  closeGrievanceModal();
  renderGrievances();
  if (typeof showToast === 'function') {
    showToast(`⚠️ Escrow frozen! Grievance ${grvId} filed for ${crop}. 65% balance held in nodal custody.`, 'error');
  }

  if (typeof switchView === 'function') {
    switchView('view-messages');
  }
}

// Global delegated listener for grievance form
document.addEventListener('submit', (e) => {
  if (e.target && e.target.id === 'form-new-grievance') {
    submitGrievance(e);
  }
});

// Chat & Grievance Window Bindings
window.filterChatContacts = filterChatContacts;
window.insertQuickChatMsg = insertQuickChatMsg;
window.renderChatSidebar = renderChatSidebar;
window.selectChatContact = selectChatContact;
window.getActiveChatKey = function() { return typeof activeChatKey !== 'undefined' ? activeChatKey : 'patil'; };
window.acceptFarmerCounter = acceptFarmerCounter;
window.openFarmerChat = openFarmerChat;
window.startNegotiationWithFarmer = startNegotiationWithFarmer;
window.sendChatMessage = sendChatMessage;
window.openGrievanceModal = openGrievanceModal;
window.closeGrievanceModal = closeGrievanceModal;
window.submitGrievance = submitGrievance;
window.handleGrievanceFileUpload = handleGrievanceFileUpload;
window.filterGrievance = filterGrievance;
window.acceptGrievanceResolution = acceptGrievanceResolution;
window.renderGrievances = renderGrievances;
