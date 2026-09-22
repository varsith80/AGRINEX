/**
 * AgriNex Farmer Module - Real-Time Buyer Messaging & Smart Negotiation Suite
 * Version: 2.4.0 (Enterprise APMC Direct Negotiation Edition)
 */

(function () {
  // Preset Active Buyer Conversations
  const INITIAL_CONVERSATIONS = {
    reliance: {
      id: 'reliance',
      company: 'Reliance Fresh Procurement',
      manager: 'Karthik Ramachandran (Sourcing Lead)',
      badge: 'Tier-1 Institutional Buyer',
      crop: 'Tomato (Hybrid Red)',
      quantity: '45 Qt (4,500 kg)',
      bidRateKg: 24.50,
      bidRateQt: 2450,
      mandiRefKg: 22.50,
      premium: '+8.9% over Mandi',
      escrowAdv: 38587,
      totalVal: 110250,
      status: '● Online • Mumbai & Pune Direct Fulfilment',
      location: 'Lasalgaon / Mumbai Hub',
      avatar: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=120',
      phone: '+91 98234-11223',
      unread: 2,
      offerText: 'Active Bid: <strong>₹ 24.50 /kg</strong> (₹ 2,450 /Qt) for 45 Qt Hybrid Tomato • 35% Advance: ₹ 38,587',
      messages: [
        {
          id: 'm1',
          type: 'incoming',
          text: 'Namaste Rameshwar ji! We reviewed your Grade A Tomato lot (45 Qt) listed from Lasalgaon. We are offering ₹ 24.50/kg with 35% advance bank escrow ready in AgriNex Vault.',
          time: '10:30 AM'
        },
        {
          id: 'm2',
          type: 'incoming',
          text: 'We can dispatch our 5-ton reefer container truck tomorrow morning 8:00 AM once you accept and confirm the gate pass.',
          time: '10:32 AM'
        }
      ]
    },
    dmart: {
      id: 'dmart',
      company: 'DMart Wholesale (Avenue Supermarts)',
      manager: 'Sanjay Deshmukh (Procurement Head)',
      badge: 'Supermart Retail Chain',
      crop: 'Onion (Nashik Red)',
      quantity: '80 Qt (8,000 kg)',
      bidRateKg: 28.50,
      bidRateQt: 2850,
      mandiRefKg: 26.00,
      premium: '+9.6% over Mandi',
      escrowAdv: 79800,
      totalVal: 228000,
      status: '● Online • Kalamboli & Thane Hub',
      location: 'Nashik / Kalamboli Mandi',
      avatar: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=120',
      phone: '+91 97123-77889',
      unread: 1,
      offerText: 'Active Bid: <strong>₹ 28.50 /kg</strong> (₹ 2,850 /Qt) for 80 Qt Nashik Red Onion • 35% Advance: ₹ 79,800',
      messages: [
        {
          id: 'm1',
          type: 'incoming',
          text: 'Jai Kisan Rameshwar ji! Regarding your 80 Quintal Nashik Red Onion lot, our quality assay team approved the size grading (55mm+). Our bid of ₹ 28.50/kg is locked in system.',
          time: '11:15 AM'
        },
        {
          id: 'm2',
          type: 'incoming',
          text: 'Can you confirm if electronic weighbridge slip from Lasalgaon APMC will be issued at the time of loading?',
          time: '11:16 AM'
        }
      ]
    },
    bigbasket: {
      id: 'bigbasket',
      company: 'BigBasket Farm Direct',
      manager: 'Pooja Nair (Supply Chain Director)',
      badge: 'Daily Direct Sourcing',
      crop: 'Green Chilli & Capsicum',
      quantity: '30 Qt (3,000 kg)',
      bidRateKg: 38.00,
      bidRateQt: 3800,
      mandiRefKg: 35.00,
      premium: '+8.6% over Mandi',
      escrowAdv: 39900,
      totalVal: 114000,
      status: '● Online • Bengaluru & Pune Express Hub',
      location: 'Pune / Baramati Sourcing Hub',
      avatar: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=120',
      phone: '+91 98450-23456',
      unread: 0,
      offerText: 'Active Bid: <strong>₹ 38.00 /kg</strong> for 30 Qt Capsicum / Chilli • 35% Advance: ₹ 39,900',
      messages: [
        {
          id: 'm1',
          type: 'incoming',
          text: 'Hello Patil ji, BigBasket wants to contract your upcoming 3,000 kg harvest for next Tuesday delivery. Automated direct UPI settlement is enabled.',
          time: 'Yesterday'
        }
      ]
    },
    itc: {
      id: 'itc',
      company: 'ITC Agri-Business Sourcing',
      manager: 'Vikram Verma (Central Grain Desk Lead)',
      badge: 'e-Choupal Verified Buyer',
      crop: 'Wheat (Sharbati Lokwan)',
      quantity: '150 Qt (15,000 kg)',
      bidRateKg: 26.50,
      bidRateQt: 2650,
      mandiRefKg: 24.80,
      premium: '+6.8% over Mandi',
      escrowAdv: 139125,
      totalVal: 397500,
      status: '● Online • Central Grain Sourcing Hub',
      location: 'Indore / Nagpur e-Choupal',
      avatar: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=120',
      phone: '+91 98990-44556',
      unread: 0,
      offerText: 'Active Bid: <strong>₹ 26.50 /kg</strong> (₹ 2,650 /Qt) for 150 Qt Sharbati Lokwan Wheat • 35% Advance: ₹ 1,39,125',
      messages: [
        {
          id: 'm1',
          type: 'incoming',
          text: 'Namaskar Rameshwar ji, ITC Aashirvaad sourcing team is ready to lift your 150 Qt Sharbati wheat lot directly from your storage godown with zero transport deductions.',
          time: '2 hours ago'
        }
      ]
    },
    balaji: {
      id: 'balaji',
      company: 'Balaji Wafers Procurement',
      manager: 'Hitesh Patel (Quality Officer)',
      badge: 'Processing Industry Partner',
      crop: 'Potato (Jyoti Grade A)',
      quantity: '120 Qt (12,000 kg)',
      bidRateKg: 18.50,
      bidRateQt: 1850,
      mandiRefKg: 17.20,
      premium: '+7.5% over Mandi',
      escrowAdv: 77700,
      totalVal: 222000,
      status: '● Online • Gujarat & Dhule Processing Plant',
      location: 'Dhule / Valsad Plant',
      avatar: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=120',
      phone: '+91 99001-22334',
      unread: 0,
      offerText: 'Offer Accepted & Locked: <strong>₹ 18.50 /kg</strong> for 120 Qt Jyoti Potato • 35% Escrow Released',
      messages: [
        {
          id: 'm1',
          type: 'incoming',
          text: 'Patil sir, our plant lab approved the specific gravity and fry-color test for your Jyoti potato lot. 35% advance (₹ 77,700) has been locked in AgriNex Vault.',
          time: 'Yesterday'
        },
        {
          id: 'm2',
          type: 'outgoing',
          text: 'Thank you Hitesh ji! Crates are arranged. Truck can report to Lasalgaon gate by 9:00 AM.',
          time: 'Yesterday'
        }
      ]
    },
    lulu: {
      id: 'lulu',
      company: 'LuLu Hypermarket International',
      manager: 'Anwar Al-Hassan (Gulf Export Desk)',
      badge: 'Middle East Export Partner',
      crop: 'Pomegranate (Bhagwa Grade A)',
      quantity: '25 Qt (2,500 kg)',
      bidRateKg: 145.00,
      bidRateQt: 14500,
      mandiRefKg: 130.00,
      premium: '+11.5% Export Premium',
      escrowAdv: 126875,
      totalVal: 362500,
      status: '● Online • JNPT Port & Dubai Air Cargo',
      location: 'Mumbai Port / Dubai Cargo',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120',
      phone: '+91 99887-55443',
      unread: 0,
      offerText: 'Export Bid: <strong>₹ 145.00 /kg</strong> for 25 Qt Bhagwa Pomegranate • 35% Escrow: ₹ 1,26,875',
      messages: [
        {
          id: 'm1',
          type: 'incoming',
          text: 'Salam Rameshwar ji! We are packing export pallet for Dubai flight this Friday. Please ensure CFB boxes with 4kg net weight and residual pesticide clearance certificate.',
          time: '3 hours ago'
        }
      ]
    },
    swiggy: {
      id: 'swiggy',
      company: 'Swiggy Instamart Agri Sourcing',
      manager: 'Rahul Roy (Quick Commerce Buyer)',
      badge: 'Quick-Commerce Express',
      crop: 'Tomato (Hybrid Red)',
      quantity: '40 Qt (4,000 kg)',
      bidRateKg: 24.00,
      bidRateQt: 2400,
      mandiRefKg: 22.50,
      premium: '+6.6% over Mandi',
      escrowAdv: 33600,
      totalVal: 96000,
      status: '● Online • Mumbai Dark Store Hub',
      location: 'Navi Mumbai / Thane',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120',
      phone: '+91 98234-11223',
      unread: 0,
      offerText: 'Active Counter: <strong>₹ 24.00 /kg</strong> for 40 Qt Tomato • Daily 100 Crate Dispatch',
      messages: [
        {
          id: 'm1',
          type: 'incoming',
          text: 'Hi Patil ji, we received your counter proposal. Can we finalize at ₹ 24.50/kg for daily 100-crate fresh pickup from your farm gate?',
          time: '4 hours ago'
        }
      ]
    }
  };

  // State Management
  let chatConversations = JSON.parse(localStorage.getItem('agrinex_farmer_chats')) || INITIAL_CONVERSATIONS;
  let activeChatKey = 'reliance';
  let speechRecognition = null;
  let isRecording = false;

  function saveChats() {
    try {
      localStorage.setItem('agrinex_farmer_chats', JSON.stringify(chatConversations));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }

  // Render Left Sidebar Contacts
  function renderChatSidebar(filterQuery = '') {
    const container = document.getElementById('chat-contacts-container');
    if (!container) return;

    const query = filterQuery.toLowerCase().trim();
    const keys = Object.keys(chatConversations);

    const filteredKeys = keys.filter(k => {
      const conv = chatConversations[k];
      return (
        conv.company.toLowerCase().includes(query) ||
        conv.crop.toLowerCase().includes(query) ||
        conv.manager.toLowerCase().includes(query) ||
        conv.location.toLowerCase().includes(query)
      );
    });

    if (filteredKeys.length === 0) {
      container.innerHTML = `
        <div style="padding: 24px 16px; text-align: center; color: #64748b; font-size: 0.82rem;">
          No matching buyer conversations found.
        </div>
      `;
      return;
    }

    container.innerHTML = filteredKeys.map(k => {
      const conv = chatConversations[k];
      const lastMsg = conv.messages[conv.messages.length - 1];
      const lastText = lastMsg ? (lastMsg.type === 'outgoing' ? 'You: ' : '') + lastMsg.text : 'No messages yet';
      const isActive = k === activeChatKey;

      return `
        <div class="chat-contact ${isActive ? 'active' : ''}" id="chat-contact-${k}" onclick="selectChatContact('${k}')">
          <div class="avatar-wrapper">
            <img src="${conv.avatar}" alt="${conv.company}" style="width: 42px; height: 42px; border-radius: 50%; object-fit: cover; border: 1.5px solid #ffffff; box-shadow: 0 2px 6px rgba(0,0,0,0.08);" onerror="this.src='https://images.unsplash.com/photo-1542838132-92c53300491e?w=100'" />
            <span class="avatar-online-dot"></span>
          </div>
          <div style="flex: 1; min-width: 0;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2px;">
              <strong style="font-size: 0.84rem; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 170px;">
                ${conv.company}
              </strong>
              <span style="font-size: 0.66rem; color: #94a3b8; white-space: nowrap;">${lastMsg ? lastMsg.time : ''}</span>
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 4px;">
              <div style="font-size: 0.72rem; color: #64748b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                ${lastText}
              </div>
              ${conv.unread > 0 ? `<span class="badge" style="background: #16a34a; color: #ffffff; font-size: 0.62rem; font-weight: 800; border-radius: 999px; padding: 1px 6px; min-width: 16px; text-align: center;">${conv.unread}</span>` : ''}
            </div>
            <div style="display: flex; align-items: center; gap: 6px; margin-top: 4px;">
              <span class="badge" style="background: #f0fdf4; color: #166534; font-size: 0.64rem; font-weight: 700; border: 1px solid #bbf7d0; padding: 1px 6px; border-radius: 4px;">${conv.crop.split('(')[0]}</span>
              <span style="font-size: 0.68rem; font-weight: 800; color: #0c5a36;">₹ ${conv.bidRateKg.toFixed(2)}/kg</span>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Select a Contact Thread
  function selectChatContact(contactKey) {
    if (!chatConversations[contactKey]) return;
    activeChatKey = contactKey;
    const chat = chatConversations[contactKey];
    chat.unread = 0;
    saveChats();

    // Update active highlight in list
    document.querySelectorAll('.chat-contact').forEach(c => c.classList.remove('active'));
    const activeEl = document.getElementById(`chat-contact-${contactKey}`);
    if (activeEl) activeEl.classList.add('active');

    // Update Header
    const headerName = document.getElementById('chat-header-name');
    const headerStatus = document.getElementById('chat-header-status');
    const headerAvatar = document.getElementById('chat-header-avatar');
    const headerBadge = document.getElementById('chat-header-badge');
    const headerCallBtn = document.getElementById('chat-header-call-btn');

    if (headerName) headerName.textContent = chat.company;
    if (headerStatus) headerStatus.textContent = `${chat.status} • ${chat.manager}`;
    if (headerAvatar) headerAvatar.src = chat.avatar;
    if (headerBadge) headerBadge.textContent = chat.badge;
    if (headerCallBtn) {
      headerCallBtn.href = `tel:${chat.phone.replace(/[^0-9+]/g, '')}`;
      headerCallBtn.title = `Call ${chat.manager} (${chat.phone})`;
    }

    // Update Header Action Buttons
    const headerActions = document.getElementById('chat-header-actions');
    if (headerActions) {
      headerActions.innerHTML = `
        <a href="tel:${chat.phone}" class="btn btn-outline-sm" style="display: inline-flex; align-items: center; gap: 5px; font-weight: 700; color: #0c5a36; border-color: #bbf7d0; background: #f0fdf4; text-decoration: none;">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          Direct Call
        </a>
        <button class="btn btn-outline-sm" onclick="openCounterOfferModal('${chat.id}')" style="font-weight: 700; border-color: #cbd5e1; color: #334155; background: #ffffff;">⚡ Counter Offer</button>
        <button class="btn btn-green" onclick="acceptBuyerOfferModal('${chat.id}')" style="background: linear-gradient(135deg, #0c5a36 0%, #064e3b 100%); font-weight: 800; padding: 7px 14px; box-shadow: 0 4px 10px rgba(12, 90, 54, 0.25);">
          ✓ Lock 35% Escrow (₹ ${chat.bidRateKg.toFixed(2)}/kg)
        </button>
      `;
    }

    // Update Active Offer Banner
    const banner = document.getElementById('chat-offer-banner');
    if (banner) {
      banner.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="background: #ca8a04; color: #ffffff; width: 24px; height: 24px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 800; box-shadow: 0 2px 6px rgba(202,138,4,0.3);">⚡</span>
          <span style="color: #713f12; font-size: 0.82rem;">
            <strong>Buyer Offer:</strong> <strong>${chat.company}</strong> offered <strong style="color: #14532d; font-size: 0.95rem;">₹ ${chat.bidRateKg.toFixed(2)}/kg</strong> (₹ ${chat.bidRateQt.toLocaleString()} /Qt) for ${chat.quantity}. <span style="background: #ecfdf5; color: #065f46; font-weight: 700; padding: 1px 6px; border-radius: 4px; border: 1px solid #a7f3d0;">${chat.premium}</span>
          </span>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-green" onclick="acceptBuyerOfferModal('${chat.id}')" style="background: #15803d; border-color: #15803d; padding: 5px 12px; font-size: 0.76rem; font-weight: 800;">✓ Accept & Lock Escrow</button>
          <button class="btn btn-outline-sm" onclick="openCounterOfferModal('${chat.id}')" style="padding: 5px 10px; font-size: 0.76rem; font-weight: 700; background: #ffffff;">Re-counter</button>
        </div>
      `;
    }

    // Render Messages Stream
    renderMessages(chat);
  }

  // Render Message Bubbles
  function renderMessages(chat) {
    const container = document.getElementById('chat-messages-container');
    if (!container) return;

    container.innerHTML = chat.messages.map(m => `
      <div class="chat-bubble-group ${m.type}">
        <div class="chat-bubble ${m.type}">
          ${m.text}
          ${m.type === 'incoming' ? `
            <div>
              <button class="chat-audio-btn" onclick="playMessageAudio('${escapeQuotes(m.text)}')">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                Listen (TTS)
              </button>
            </div>
          ` : ''}
        </div>
        <div class="chat-meta-bar ${m.type}">
          <span>${m.time || 'Just now'}</span>
          ${m.type === 'outgoing' ? '<span style="color: #16a34a; font-weight: 800;">✓✓ Read</span>' : ''}
        </div>
      </div>
    `).join('');

    container.scrollTop = container.scrollHeight;
  }

  function escapeQuotes(str) {
    return (str || '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
  }

  // Send Message from Input
  function sendChatMessage() {
    const input = document.getElementById('chat-input-field');
    const container = document.getElementById('chat-messages-container');
    if (!input || !container || !input.value.trim()) return;

    const msgText = input.value.trim();
    const timeNow = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Append to active conversation
    if (chatConversations[activeChatKey]) {
      chatConversations[activeChatKey].messages.push({
        id: 'msg_' + Date.now(),
        type: 'outgoing',
        text: msgText,
        time: timeNow
      });
      saveChats();
    }

    renderMessages(chatConversations[activeChatKey]);
    input.value = '';
    renderChatSidebar();

    // Realistic Context-Aware Automated Buyer Reply
    const currentKey = activeChatKey;
    const currentConv = chatConversations[currentKey];
    const cropName = currentConv ? currentConv.crop : 'produce';
    const buyerName = currentConv ? currentConv.manager.split(' ')[0] : 'Buyer';

    setTimeout(() => {
      let replyText = `Namaste Rameshwar ji! Received your update regarding ${cropName}. Our logistics coordinator is scheduling the vehicle pass.`;

      const lower = msgText.toLowerCase();
      if (lower.includes('rate') || lower.includes('price') || lower.includes('counter') || lower.includes('₹') || lower.includes('discount') || lower.includes('more')) {
        const revisedRate = (currentConv.bidRateKg + 0.50).toFixed(2);
        replyText = `Thank you for the counter request. After consulting our senior procurement desk, we can offer a special revised rate of ₹ ${revisedRate} /kg if lot moisture is under 12% and loading is completed before 11:00 AM!`;
      } else if (lower.includes('weigh') || lower.includes('moisture') || lower.includes('assay') || lower.includes('sample') || lower.includes('quality') || lower.includes('slip')) {
        replyText = `Verified electronic weighbridge slip from APMC Lasalgaon and FPO digital assay certificate are completely accepted. Full payment will be settled against the gross weight slip.`;
      } else if (lower.includes('dispatch') || lower.includes('truck') || lower.includes('vehicle') || lower.includes('tomorrow') || lower.includes('morning') || lower.includes('time')) {
        replyText = `Our designated transport vehicle (MH-15-EG-4821, 5-Ton Container) is confirmed to arrive at your farm gate tomorrow morning at 8:00 AM. Driver contact: Ramesh Shinde (+91 98220-44910).`;
      } else if (lower.includes('escrow') || lower.includes('advance') || lower.includes('bank') || lower.includes('payment') || lower.includes('vault')) {
        replyText = `35% Escrow advance (₹ ${currentConv.escrowAdv.toLocaleString()}) is already verified and protected in AgriNex Vault. Funds will be instantly credited to your linked SBI account upon truck gate check-in!`;
      } else if (lower.includes('accept') || lower.includes('confirm') || lower.includes('done') || lower.includes('deal')) {
        replyText = `Deal finalized! We have generated E-Way bill and Gate Dispatch Pass #AGX-${Math.floor(100000 + Math.random() * 900000)}. Thank you for partnering with ${currentConv.company}!`;
      }

      if (chatConversations[currentKey]) {
        chatConversations[currentKey].messages.push({
          id: 'reply_' + Date.now(),
          type: 'incoming',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        saveChats();
      }

      if (activeChatKey === currentKey) {
        renderMessages(chatConversations[currentKey]);
      }
      renderChatSidebar();

      // Audio notification chime if supported
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
        osc.frequency.setValueAtTime(880, audioCtx.currentTime + 0.08); // A5
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.25);
      } catch (e) {}

    }, 900);
  }

  // Quick Chat Suggestion Chip Helper
  function insertQuickChatMsg(msg) {
    const input = document.getElementById('chat-input-field');
    if (input) {
      input.value = msg;
      input.focus();
    }
  }

  // Filter Contacts
  function filterChatContacts(val) {
    renderChatSidebar(val);
  }

  // TTS Speech Synthesis for Farmer
  function playMessageAudio(text) {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const lang = (window.getFarmerLanguage && window.getFarmerLanguage()) || 'en';
    if (lang === 'hi') {
      utterance.lang = 'hi-IN';
    } else if (lang === 'mr') {
      utterance.lang = 'mr-IN';
    } else {
      utterance.lang = 'en-IN';
    }
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  }

  // Speech to Text (Mic Input)
  function toggleVoiceInput() {
    const micBtn = document.getElementById('btn-chat-mic');
    const input = document.getElementById('chat-input-field');

    if (isRecording) {
      if (speechRecognition) speechRecognition.stop();
      isRecording = false;
      if (micBtn) micBtn.classList.remove('recording');
      return;
    }

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRec) {
      alert('Voice dictation is supported in Google Chrome, Edge, and modern mobile browsers.');
      return;
    }

    speechRecognition = new SpeechRec();
    const lang = (window.getFarmerLanguage && window.getFarmerLanguage()) || 'en';
    speechRecognition.lang = lang === 'mr' ? 'mr-IN' : (lang === 'hi' ? 'hi-IN' : 'en-IN');
    speechRecognition.interimResults = false;
    speechRecognition.maxAlternatives = 1;

    speechRecognition.onstart = function () {
      isRecording = true;
      if (micBtn) micBtn.classList.add('recording');
    };

    speechRecognition.onresult = function (event) {
      const transcript = event.results[0][0].transcript;
      if (input) {
        input.value = (input.value + ' ' + transcript).trim();
        input.focus();
      }
    };

    speechRecognition.onerror = function () {
      isRecording = false;
      if (micBtn) micBtn.classList.remove('recording');
    };

    speechRecognition.onend = function () {
      isRecording = false;
      if (micBtn) micBtn.classList.remove('recording');
    };

    speechRecognition.start();
  }

  // Attachment Simulation (Share electronic weighbridge / assay certificate)
  function attachFileModal() {
    const input = document.getElementById('chat-input-field');
    const attachments = [
      '📋 [Attachment: Electronic Weighbridge Slip #WB-9941 - 4,500 kg Gross Weight]',
      '🔬 [Attachment: NABL Digital Quality Assay Certificate - Grade A+ (11.2% Moisture)]',
      '📷 [Attachment: Live Farm Gate Loading Photo - 150 Crates Standard CFB Pack]'
    ];
    const picked = attachments[Math.floor(Math.random() * attachments.length)];
    if (input) {
      input.value = picked;
      sendChatMessage();
    }
  }

  // Open Chat directly from Bids page, My Crops, or Lite Mode
  function openBuyerChat(buyerKeyOrId) {
    let targetKey = 'reliance';
    if (buyerKeyOrId) {
      const lower = String(buyerKeyOrId).toLowerCase();
      if (chatConversations[lower]) {
        targetKey = lower;
      } else {
        for (const [k, v] of Object.entries(chatConversations)) {
          if (
            v.company.toLowerCase().includes(lower) ||
            v.crop.toLowerCase().includes(lower) ||
            v.manager.toLowerCase().includes(lower) ||
            k.includes(lower)
          ) {
            targetKey = k;
            break;
          }
        }
      }
    }

    if (window.location.pathname.includes('messages.html')) {
      selectChatContact(targetKey);
    } else {
      window.location.href = `messages.html?buyer=${targetKey}`;
    }
  }

  // Accept Buyer Offer Action Modal
  function acceptBuyerOfferModal(chatId) {
    const chat = chatConversations[chatId] || chatConversations[activeChatKey];
    if (!chat) return;

    const modal = document.getElementById('acceptOfferModal');
    if (!modal) {
      alert(`✓ Offer of ₹ ${chat.bidRateKg.toFixed(2)}/kg from ${chat.company} accepted! 35% Advance (₹ ${chat.escrowAdv.toLocaleString()}) is locked in AgriNex Vault.`);
      return;
    }

    document.getElementById('m-accept-crop').textContent = chat.crop;
    document.getElementById('m-accept-buyer').textContent = chat.company;
    document.getElementById('m-accept-rate').textContent = `₹ ${chat.bidRateKg.toFixed(2)} /kg (₹ ${chat.bidRateQt.toLocaleString()} /Qt)`;
    document.getElementById('m-accept-qty').textContent = chat.quantity;
    document.getElementById('m-accept-total').textContent = `₹ ${chat.totalVal.toLocaleString()}`;
    document.getElementById('m-accept-adv').textContent = `₹ ${chat.escrowAdv.toLocaleString()}`;
    document.getElementById('m-accept-bal').textContent = `₹ ${(chat.totalVal - chat.escrowAdv).toLocaleString()}`;

    modal.classList.add('active');
  }

  function confirmAcceptOffer() {
    const chat = chatConversations[activeChatKey];
    if (!chat) return;

    const modal = document.getElementById('acceptOfferModal');
    if (modal) modal.classList.remove('active');

    // Add confirmation message to thread
    chat.messages.push({
      id: 'confirm_' + Date.now(),
      type: 'outgoing',
      text: `✓ Offer accepted for ₹ ${chat.bidRateKg.toFixed(2)}/kg! Advance Escrow of ₹ ${chat.escrowAdv.toLocaleString()} confirmed. We are preparing the lot for pickup.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    saveChats();
    renderMessages(chat);

    setTimeout(() => {
      chat.messages.push({
        id: 'reply_' + Date.now(),
        type: 'incoming',
        text: `Excellent news Patil ji! 35% Advance payment (₹ ${chat.escrowAdv.toLocaleString()}) has been securely transferred to your Escrow Vault. Truck #MH-15-EG-4821 scheduled for tomorrow.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      saveChats();
      renderMessages(chat);
      renderChatSidebar();
    }, 800);

    alert(`✓ Deal Confirmed with ${chat.company}! 35% Advance (₹ ${chat.escrowAdv.toLocaleString()}) locked in Escrow Vault.`);
  }

  // Counter Offer Action Modal
  function openCounterOfferModal(chatId) {
    const chat = chatConversations[chatId] || chatConversations[activeChatKey];
    if (!chat) return;

    const modal = document.getElementById('counterOfferModal');
    if (!modal) {
      const counterVal = prompt(`Enter your counter price in ₹ / kg for ${chat.crop} (Current: ₹ ${chat.bidRateKg.toFixed(2)}/kg):`, (chat.bidRateKg + 1.0).toFixed(2));
      if (counterVal && parseFloat(counterVal)) {
        submitCounterOfferDirect(parseFloat(counterVal));
      }
      return;
    }

    document.getElementById('m-counter-crop').textContent = chat.crop;
    document.getElementById('m-counter-buyer').textContent = chat.company;
    document.getElementById('m-counter-orig').textContent = `₹ ${chat.bidRateKg.toFixed(2)} /kg (₹ ${chat.bidRateQt.toLocaleString()} /Qt)`;
    
    const suggested = (chat.bidRateKg + 1.00).toFixed(2);
    const inputKg = document.getElementById('m-counter-input-kg');
    if (inputKg) {
      inputKg.value = suggested;
      syncCounterEquivalent(suggested);
    }

    modal.classList.add('active');
  }

  function syncCounterEquivalent(val) {
    const kg = parseFloat(val) || 0;
    const qtEl = document.getElementById('m-counter-equiv-qt');
    if (qtEl) {
      qtEl.textContent = `₹ ${Math.round(kg * 100).toLocaleString()} /Qt`;
    }
  }

  function submitCounterOffer() {
    const inputKg = document.getElementById('m-counter-input-kg');
    const noteInput = document.getElementById('m-counter-note');
    if (!inputKg) return;

    const val = parseFloat(inputKg.value);
    if (!val || val <= 0) {
      alert('Please enter a valid counter rate.');
      return;
    }

    const note = noteInput ? noteInput.value.trim() : '';
    submitCounterOfferDirect(val, note);

    const modal = document.getElementById('counterOfferModal');
    if (modal) modal.classList.remove('active');
  }

  function submitCounterOfferDirect(rateKg, note = '') {
    const chat = chatConversations[activeChatKey];
    if (!chat) return;

    const rateQt = Math.round(rateKg * 100);
    let msgText = `⚡ Counter Offer Sent: ₹ ${rateKg.toFixed(2)} /kg (₹ ${rateQt.toLocaleString()} /Qt) for ${chat.quantity}.`;
    if (note) msgText += ` Note: ${note}`;

    chat.messages.push({
      id: 'counter_' + Date.now(),
      type: 'outgoing',
      text: msgText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    saveChats();
    renderMessages(chat);

    setTimeout(() => {
      chat.messages.push({
        id: 'reply_' + Date.now(),
        type: 'incoming',
        text: `Understood Patil ji. We have received your counter-rate of ₹ ${rateKg.toFixed(2)}/kg. Our regional sourcing desk is reviewing it. We will confirm in 15 minutes!`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      saveChats();
      renderMessages(chat);
      renderChatSidebar();
    }, 900);

    alert(`Counter proposal of ₹ ${rateKg.toFixed(2)}/kg sent to ${chat.company}!`);
  }

  function closeChatModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  }

  // Initialize on page load
  document.addEventListener('DOMContentLoaded', () => {
    // Check URL parameters for active contact (e.g. ?buyer=dmart)
    const urlParams = new URLSearchParams(window.location.search);
    const buyerParam = urlParams.get('buyer');
    if (buyerParam && chatConversations[buyerParam]) {
      activeChatKey = buyerParam;
    }

    renderChatSidebar();
    selectChatContact(activeChatKey);
  });

  // Global Exports
  window.FarmerChat = {
    renderChatSidebar,
    selectChatContact,
    sendChatMessage,
    insertQuickChatMsg,
    filterChatContacts,
    playMessageAudio,
    toggleVoiceInput,
    attachFileModal,
    openBuyerChat,
    acceptBuyerOfferModal,
    confirmAcceptOffer,
    openCounterOfferModal,
    submitCounterOffer,
    syncCounterEquivalent,
    closeChatModal
  };

  // Expose handy root bindings
  window.selectChatContact = selectChatContact;
  window.sendChatMessage = sendChatMessage;
  window.insertQuickChatMsg = insertQuickChatMsg;
  window.filterChatContacts = filterChatContacts;
  window.playMessageAudio = playMessageAudio;
  window.toggleVoiceInput = toggleVoiceInput;
  window.attachFileModal = attachFileModal;
  window.openBuyerChat = openBuyerChat;
  window.acceptBuyerOfferModal = acceptBuyerOfferModal;
  window.confirmAcceptOffer = confirmAcceptOffer;
  window.openCounterOfferModal = openCounterOfferModal;
  window.submitCounterOffer = submitCounterOffer;
  window.syncCounterEquivalent = syncCounterEquivalent;
  window.closeChatModal = closeChatModal;

})();
