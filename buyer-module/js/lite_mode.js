/**
 * AgriNex Buyer Module - Simple & Audio-First Lite Mode (सरल मोड / सुलभ मोड)
 * Designed specifically for elderly, low-vision, or non-literate traders and buyers.
 * Supports:
 *  - English (en)
 *  - Hindi (hi - हिन्दी)
 *  - Marathi (mr - मराठी)
 *
 * Sections Supported:
 * 1. 🌾 Buy Farm Produce (26+ Verified Crop Lots with 1-Tap Voice Readout)
 * 2. 🚚 My Orders & Live Trucks (Live Shipments, Driver Phone, GPS Location & Audio Status)
 * 3. 🛡️ Safe Escrow Vault (Government-Supervised Safe Advances & Settlements)
 */

(function () {
  'use strict';

  let isLiteMode = localStorage.getItem('agrinex_buyer_lite_mode') === 'true';
  let activeLiteSection = 'produce'; // 'produce' | 'orders' | 'escrow'
  let activeLiteFilter = 'all';

  // Multilingual UI Dictionary for Simple Mode
  const LITE_I18N = {
    en: {
      toggleSimple: '👴 Simple Mode',
      toggleEnterprise: '⚡ Enterprise Mode',
      tabProduce: '🌾 Buy Produce',
      tabOrders: '🚚 My Orders & Trucks',
      tabEscrow: '🛡️ Safe Escrow Vault',
      heroBadge: '🟢 Direct Farmer Procurement • 100% Quality Verified',
      heroTitle: '🌾 Direct Farmer Produce Market',
      heroDesc: 'Tap any large crop photo, listen to voice details in English, and buy directly from farmers in 1-click.',
      voiceBtnTitle: 'Voice Search',
      voiceBtnDesc: '"Show Tomatoes" / "Onion"',
      emergencyBtnTitle: 'Emergency Sales',
      emergencyBtnDesc: 'Discounted direct lots',
      catAll: 'All Produce',
      catVeg: 'Vegetables',
      catFruit: 'Fruits',
      catGrain: 'Grains & Pulses',
      catEmergency: 'Emergency Sale',
      listen: 'Listen',
      priceLabel: 'PRICE / RATE',
      perKg: '/ kg',
      qtyLabel: 'AVAILABLE QUANTITY',
      bags: 'Bags',
      verifiedBadge: '🛡️ AgriNex Verified',
      buyNow: '🟢 Buy Now (Direct)',
      callFarmer: '📞 Call Farmer',
      callDriver: '📞 Call Driver',
      buyModalTitle: 'Buy Produce (Direct Farmer)',
      farmerLabel: 'Farmer',
      rateLabel: 'Price / Rate',
      qtyTextLabel: 'Quantity',
      totalLabel: 'Total Amount',
      escrowNote: '🛡️ Escrow Advance Deposit',
      escrowPercent: '35% Protected Deposit',
      cancel: '✕ Cancel',
      confirmBuy: '✓ Confirm Purchase',
      orderSuccess: 'Congratulations! Your order has been placed. Farmer and logistics partner will contact you shortly.',
      voicePrompt: 'Which crop are you looking for? Speak now.',
      searchingFor: 'Searching for',
      voiceFail: 'Could not recognize voice. Please try again.',
      connectingFarmer: 'Connecting phone call to farmer',
      connectingDriver: 'Connecting phone call to truck driver',
      tollFree: 'Toll-Free Helpline: 1800-AGRI-NEX',
      ordersTitle: '🚚 Live Shipments & Booked Trucks',
      ordersSubtitle: 'Track your delivery trucks on live GPS with 1-tap call to driver',
      listenStatus: 'Listen Status',
      escrowTitle: '🛡️ 100% Protected Escrow Vault',
      escrowSubtitle: 'Your money is kept safely in a government-supervised escrow account until your produce arrives at your warehouse.',
      onRoad: '🚚 On The Road (In Transit)',
      arrived: '✅ Delivered & Verified',
      etaLabel: 'Estimated Arrival (ETA)',
      locationLabel: 'Current Highway Location',
      driverLabel: 'Driver & Vehicle'
    },
    hi: {
      toggleSimple: '👴 सरल मोड',
      toggleEnterprise: '⚡ एंटरप्राइज मोड',
      tabProduce: '🌾 शेतीमाल खरीद (Buy)',
      tabOrders: '🚚 मेरी गाड़ियां व ऑर्डर्स',
      tabEscrow: '🛡️ सुरक्षित एस्क्रो खाता',
      heroBadge: '🟢 सीधा किसान खरीद केंद्र • 100% गुणवत्ता सत्यापित',
      heroTitle: '🌾 किसान सीधा खरीद बाज़ार (सरल बाज़ार)',
      heroDesc: 'बड़ी तस्वीरों पर क्लिक करें, आवाज़ में जानकारी सुनें और 1-क्लिक में सीधे किसान से खात्रीशीर माल खरीदें।',
      voiceBtnTitle: 'बोलकर खोजें',
      voiceBtnDesc: '"टमाटर दिखाओ" / "प्याज"',
      emergencyBtnTitle: 'आपातकालीन बिक्री',
      emergencyBtnDesc: 'सस्ती दरों पर ताजा माल',
      catAll: 'सभी फसलें',
      catVeg: 'सब्जियां',
      catFruit: 'फल',
      catGrain: 'अनाज व दालें',
      catEmergency: 'छूट बिक्री',
      listen: 'सुनें',
      priceLabel: 'दर / भाव',
      perKg: '/ किलो',
      qtyLabel: 'उपलब्ध मात्रा',
      bags: 'बोरी / Bags',
      verifiedBadge: '🛡️ एग्रीनेक्स सत्यापित',
      buyNow: '🟢 सीधे खरीदें (Buy Now)',
      callFarmer: '📞 किसान को कॉल करें',
      callDriver: '📞 ड्राइवर को कॉल करें',
      buyModalTitle: 'फसल खरीद (सीधा किसान)',
      farmerLabel: 'किसान',
      rateLabel: 'दर / भाव',
      qtyTextLabel: 'मात्रा',
      totalLabel: 'कुल राशि',
      escrowNote: '🛡️ एस्क्रो सुरक्षित अग्रिम',
      escrowPercent: '35% सुरक्षित अग्रिम जमा',
      cancel: '✕ रद्द करें (Cancel)',
      confirmBuy: '✓ खरीद पक्की करें (Confirm)',
      orderSuccess: 'बधाई हो! आपकी खरीद सफलतापूर्वक दर्ज हो गई है। किसान और वाहन चालक जल्द संपर्क करेंगे।',
      voicePrompt: 'आपको कौन सी फसल चाहिए? बोलिए।',
      searchingFor: 'ढूंढ रहे हैं',
      voiceFail: 'आवाज़ पहचान में नहीं आई। कृपया पुनः प्रयास करें।',
      connectingFarmer: 'किसान से फोन पर जोड़ रहे हैं',
      connectingDriver: 'गाड़ी चालक से फोन पर जोड़ रहे हैं',
      tollFree: 'टोल-फ्री हेल्पलाइन: 1800-AGRI-NEX',
      ordersTitle: '🚚 रास्ते में चल रही गाड़ियां व ऑर्डर्स',
      ordersSubtitle: 'अपनी गाड़ियों को लाइव जीपीएस पर देखें और सीधे ड्राइवर को फोन लगाएं',
      listenStatus: 'आवाज़ में स्थिति सुनें',
      escrowTitle: '🛡️ 100% सुरक्षित एस्क्रो खाता',
      escrowSubtitle: 'जब तक माल आपके गोदाम में नहीं पहुंचता, आपका पैसा सरकारी निगरानी वाले एस्क्रो खाते में पूरी तरह सुरक्षित रहता है।',
      onRoad: '🚚 गाड़ी रास्ते में है (Transit)',
      arrived: '✅ माल पहुंच गया है (Delivered)',
      etaLabel: 'पहुंचने का अनुमानित समय',
      locationLabel: 'वर्तमान हाइवे स्थान',
      driverLabel: 'ड्राइवर व गाड़ी नंबर'
    },
    mr: {
      toggleSimple: '👴 सरल मोड',
      toggleEnterprise: '⚡ एंटरप्राइज मोड',
      tabProduce: '🌾 शेतीमाल खरेदी (Buy)',
      tabOrders: '🚚 माझ्या गाड्या व ऑर्डर्स',
      tabEscrow: '🛡️ सुरक्षित एस्क्रो खाते',
      heroBadge: '🟢 थेट शेतकरी खरेदी केंद्र • 100% पडताळणी',
      heroTitle: '🌾 शेतकरी थेट खरेदी केंद्र (सुलभ बाजार)',
      heroDesc: 'मोठ्या चित्रांवर क्लिक करा, आवाजात माहिती ऐका आणि एका क्लिकवर थेट शेतकऱ्याकडून खात्रीशीर माल खरेदी करा.',
      voiceBtnTitle: 'बोलून शोधा',
      voiceBtnDesc: '"टोमॅटो दाखवा" / "कांदा"',
      emergencyBtnTitle: 'सवलत विक्री',
      emergencyBtnDesc: 'स्वस्त दरात थेट शेतमाल',
      catAll: 'सर्व शेतीमाल',
      catVeg: 'भाज्या',
      catFruit: 'फळे',
      catGrain: 'धान्य व कडधान्ये',
      catEmergency: 'सवलत विक्री',
      listen: 'ऐका',
      priceLabel: 'दर / भाव',
      perKg: '/ किलो',
      qtyLabel: 'उपलब्ध माल',
      bags: 'बोरी / Bags',
      verifiedBadge: '🛡️ AgriNex पडताळणी',
      buyNow: '🟢 थेट खरेदी करा (Buy Now)',
      callFarmer: '📞 फोनवर बोला',
      callDriver: '📞 ड्रायव्हरला फोन करा',
      buyModalTitle: 'शेतमाल खरेदी (थेट शेतकरी)',
      farmerLabel: 'शेतकरी',
      rateLabel: 'दर / भाव',
      qtyTextLabel: 'एकूण माल',
      totalLabel: 'एकूण रक्कम',
      escrowNote: '🛡️ एस्क्रो सुरक्षित अनामत',
      escrowPercent: '35% सुरक्षित ठेव',
      cancel: '✕ रद्द करा (Cancel)',
      confirmBuy: '✓ खरेदी नक्की करा (Confirm)',
      orderSuccess: 'अभिनंदन! तुमची खरेदी यशस्वीरीत्या नोंदवली गेली आहे. शेतकरी आणि गाडी चालक लवकरच संपर्क साधतील.',
      voicePrompt: 'तुम्हाला कोणते पीक पाहिजे? सांगा.',
      searchingFor: 'शोधत आहोत',
      voiceFail: 'आवाज ऐकू आला नाही. कृपया पुन्हा प्रयत्न करा.',
      connectingFarmer: 'शेतकऱ्यांशी फोनवर जोडत आहोत',
      connectingDriver: 'गाडी ड्रायव्हरशी फोनवर जोडत आहोत',
      tollFree: 'टोल-फ्री हेल्पलाइन: 1800-AGRI-NEX',
      ordersTitle: '🚚 रस्त्यात असलेल्या गाड्या व ऑर्डर्स',
      ordersSubtitle: 'तुमचा शेतीमाल घेऊन येणाऱ्या गाड्यांचा थेट जीपीएस मागोवा घ्या आणि १-क्लिकमध्ये ड्रायव्हरशी बोला',
      listenStatus: 'आवाजात ऐका',
      escrowTitle: '🛡️ 100% सुरक्षित एस्क्रो खाते',
      escrowSubtitle: 'माल तुमच्या गोदामात सुखरूप उतरेपर्यंत तुमचे सर्व पैसे शासनाच्या नियंत्रणाखालील एस्क्रो खात्यात पूर्णपणे सुरक्षित राहतात.',
      onRoad: '🚚 गाडी रस्त्यात आहे (In Transit)',
      arrived: '✅ माल गोदामात पोहोचला (Delivered)',
      etaLabel: 'पोहोचण्याची अंदाजे वेळ',
      locationLabel: 'सध्याचे महामार्ग ठिकाण',
      driverLabel: 'चालक व गाडी क्रमांक'
    }
  };

  // Regional Crop Names Dictionary for Simple Mode
  const CROP_TRANSLATIONS = {
    'Tomato': { en: '🍅 Tomato (Hybrid)', hi: '🍅 टमाटर (हाइब्रिड)', mr: '🍅 टोमॅटो (संकरित)', icon: '🍅' },
    'Onion': { en: '🧅 Red Onion (Export)', hi: '🧅 लाल प्याज (निर्यात)', mr: '🧅 लाल कांदा (निर्यात)', icon: '🧅' },
    'Potato': { en: '🥔 Potato (Fresh Harvest)', hi: '🥔 आलू / बटाटा', mr: '🥔 बटाटा (ताजा)', icon: '🥔' },
    'Banana': { en: '🍌 Banana (Grand Naine)', hi: '🍌 ग्रैंड नैन केला', mr: '🍌 ग्रँड नैन केळी', icon: '🍌' },
    'Orange': { en: '🍊 Orange (Nagpur Sweet)', hi: '🍊 नागपुर संतरा', mr: '🍊 नागपूर संत्रा', icon: '🍊' },
    'Soybean': { en: '🌱 Soybean (JS 335)', hi: '🌱 पीला सोयाबीन', mr: '🌱 पिवळी सोयाबीन', icon: '🌱' },
    'Wheat': { en: '🌾 Sharbati Wheat', hi: '🌾 शरबती गेहूं', mr: '🌾 शरबती गहू', icon: '🌾' },
    'Rice': { en: '🌾 Rice (Indrayani)', hi: '🌾 इंद्रायणी चावल', mr: '🌾 इंद्रायणी भात', icon: '🌾' },
    'Paddy': { en: '🌾 Rice / Paddy', hi: '🌾 धान / चावल', mr: '🌾 भात / तांदूळ', icon: '🌾' },
    'Pomegranate': { en: '🍇 Pomegranate (Bhagwa)', hi: '🍇 भगवा अनार', mr: '🍇 भगवा डाळिंब', icon: '🍇' },
    'Cotton': { en: '☁️ Raw Cotton', hi: '☁️ कपास / रुई', mr: '☁️ कापूस / सरकी', icon: '☁️' },
    'Turmeric': { en: '🌿 Turmeric (Salem/Waigaon)', hi: '🌿 हल्दी', mr: '🌿 हळद (वायगाव)', icon: '🌿' },
    'Jowar': { en: '🌾 Sorghum / Jowar', hi: '🌾 ज्वार (मालदांडी)', mr: '🌾 मालदांडी ज्वारी', icon: '🌾' },
    'Bajra': { en: '🌾 Pearl Millet / Bajra', hi: '🌾 संकरित बाजरा', mr: '🌾 संकरित बाजरी', icon: '🌾' },
    'Gram': { en: '🌱 Chana / Chickpea', hi: '🌱 चना (विशाल)', mr: '🌱 हरभरा (विशाल)', icon: '🌱' },
    'Maize': { en: '🌽 Yellow Corn / Maize', hi: '🌽 पीला मक्का', mr: '🌽 पिवळा मका', icon: '🌽' },
    'Safflower': { en: '🌼 Safflower (Kardi)', hi: '🌼 कुसुम / करडी', mr: '🌼 करडई', icon: '🌼' },
    'Sesame': { en: '⚪ Sesame (Til)', hi: '⚪ सफेद तिल', mr: '⚪ पांढरा तीळ', icon: '⚪' }
  };

  function getCurrentLang() {
    if (window.AgriNexI18n && typeof window.AgriNexI18n.getBuyerLanguage === 'function') {
      return window.AgriNexI18n.getBuyerLanguage();
    }
    return localStorage.getItem('agrinex_buyer_language') || 'en';
  }

  function getDict() {
    const lang = getCurrentLang();
    return LITE_I18N[lang] || LITE_I18N.en;
  }

  function initLiteMode() {
    const toggleBtn = document.getElementById('btn-toggle-lite-mode');
    if (toggleBtn) {
      updateToggleBtnState(toggleBtn);
    }

    if (isLiteMode) {
      applyLiteModeUI(true);
    }

    // Listen to global language change event
    window.addEventListener('agrinex_language_changed', function (e) {
      const newLang = e.detail ? e.detail.lang : getCurrentLang();
      updateLiteModeLanguage(newLang);
    });
  }

  function switchLiteSection(section) {
    activeLiteSection = section;
    const tabProduce = document.getElementById('lite-tab-produce');
    const tabOrders = document.getElementById('lite-tab-orders');
    const tabEscrow = document.getElementById('lite-tab-escrow');

    const secProduce = document.getElementById('lite-section-produce');
    const secOrders = document.getElementById('lite-section-orders');
    const secEscrow = document.getElementById('lite-section-escrow');

    if (tabProduce) tabProduce.classList.toggle('active', section === 'produce');
    if (tabOrders) tabOrders.classList.toggle('active', section === 'orders');
    if (tabEscrow) tabEscrow.classList.toggle('active', section === 'escrow');

    if (secProduce) secProduce.style.display = section === 'produce' ? 'block' : 'none';
    if (secOrders) secOrders.style.display = section === 'orders' ? 'block' : 'none';
    if (secEscrow) secEscrow.style.display = section === 'escrow' ? 'block' : 'none';

    if (section === 'produce') renderLiteProduceCards();
    if (section === 'orders') renderLiteOrdersList();
    if (section === 'escrow') renderLiteEscrowCards();
  }

  function updateLiteModeLanguage(lang) {
    const dict = LITE_I18N[lang] || LITE_I18N.en;
    
    // 1. Update Toggle Button Text
    const toggleBtn = document.getElementById('btn-toggle-lite-mode');
    if (toggleBtn) updateToggleBtnState(toggleBtn);

    // 2. Update Top Tabs
    const tProduce = document.getElementById('lite-tab-produce-text');
    if (tProduce) tProduce.textContent = dict.tabProduce;

    const tOrders = document.getElementById('lite-tab-orders-text');
    if (tOrders) tOrders.textContent = dict.tabOrders;

    const tEscrow = document.getElementById('lite-tab-escrow-text');
    if (tEscrow) tEscrow.textContent = dict.tabEscrow;

    // 3. Update Hero Banner Elements
    const badge = document.getElementById('lite-hero-badge');
    if (badge) badge.textContent = dict.heroBadge;

    const title = document.getElementById('lite-hero-title');
    if (title) title.textContent = dict.heroTitle;

    const desc = document.getElementById('lite-hero-desc');
    if (desc) desc.textContent = dict.heroDesc;

    const voiceTitle = document.getElementById('lite-voice-btn-title');
    if (voiceTitle) voiceTitle.textContent = dict.voiceBtnTitle;

    const voiceDesc = document.getElementById('lite-voice-btn-desc');
    if (voiceDesc) voiceDesc.textContent = dict.voiceBtnDesc;

    const emergTitle = document.getElementById('lite-emerg-btn-title');
    if (emergTitle) emergTitle.textContent = dict.emergencyBtnTitle;

    const emergDesc = document.getElementById('lite-emerg-btn-desc');
    if (emergDesc) emergDesc.textContent = dict.emergencyBtnDesc;

    // 4. Update Category Pills
    const catAll = document.getElementById('lite-cat-all');
    if (catAll) catAll.textContent = dict.catAll;

    const catVeg = document.getElementById('lite-cat-veg');
    if (catVeg) catVeg.textContent = dict.catVeg;

    const catFruit = document.getElementById('lite-cat-fruit');
    if (catFruit) catFruit.textContent = dict.catFruit;

    const catGrain = document.getElementById('lite-cat-grain');
    if (catGrain) catGrain.textContent = dict.catGrain;

    const catEmerg = document.getElementById('lite-cat-emerg');
    if (catEmerg) catEmerg.textContent = dict.catEmergency;

    // 5. Update Orders & Escrow Titles
    const ordTitle = document.getElementById('lite-orders-title');
    if (ordTitle) ordTitle.textContent = dict.ordersTitle;

    const ordSub = document.getElementById('lite-orders-subtitle');
    if (ordSub) ordSub.textContent = dict.ordersSubtitle;

    const ordAud = document.getElementById('lite-orders-audio-btn');
    if (ordAud) ordAud.textContent = dict.listenStatus;

    const escTitle = document.getElementById('lite-escrow-title');
    if (escTitle) escTitle.textContent = dict.escrowTitle;

    const escSub = document.getElementById('lite-escrow-subtitle');
    if (escSub) escSub.textContent = dict.escrowSubtitle;

    // 6. Re-render active section
    if (isLiteMode) {
      if (activeLiteSection === 'produce') renderLiteProduceCards();
      if (activeLiteSection === 'orders') renderLiteOrdersList();
      if (activeLiteSection === 'escrow') renderLiteEscrowCards();
    }
  }

  function toggleLiteMode() {
    isLiteMode = !isLiteMode;
    localStorage.setItem('agrinex_buyer_lite_mode', isLiteMode ? 'true' : 'false');
    
    const toggleBtn = document.getElementById('btn-toggle-lite-mode');
    if (toggleBtn) updateToggleBtnState(toggleBtn);

    applyLiteModeUI(isLiteMode);

    if (isLiteMode) {
      const lang = getCurrentLang();
      if (lang === 'hi') {
        speakText("सरल मोड चालू हो गया है। विवरण सुनने के लिए स्पीकर बटन दबाएं।", "hi");
      } else if (lang === 'mr') {
        speakText("सरल मोड चालू झाला आहे. पिकाची माहिती ऐकण्यासाठी स्पीकर बटण दाबा.", "mr");
      } else {
        speakText("Simple Mode is active. Tap the speaker icon to listen to produce details.", "en");
      }
    }
  }

  function updateToggleBtnState(btn) {
    const dict = getDict();
    if (isLiteMode) {
      btn.innerHTML = `<span style="font-size: 1.1rem;">⚡</span><span>${dict.toggleEnterprise}</span>`;
      btn.classList.add('active-lite');
      btn.style.background = '#0f172a';
      btn.style.color = '#f8fafc';
      btn.style.borderColor = '#475569';
    } else {
      btn.innerHTML = `<span style="font-size: 1.1rem;">👴</span><span>${dict.toggleSimple}</span>`;
      btn.classList.remove('active-lite');
      btn.style.background = '#fef3c7';
      btn.style.color = '#92400e';
      btn.style.borderColor = '#f59e0b';
    }
  }

  function applyLiteModeUI(enable) {
    const regularViews = document.querySelectorAll('.portal-view');
    const liteContainer = document.getElementById('lite-mode-container');
    const sidebar = document.querySelector('.sidebar');
    const headerSearch = document.querySelector('.navbar-search');
    const floatingCopilot = document.getElementById('btn-floating-copilot');

    if (enable) {
      document.body.classList.add('lite-mode-active');
      regularViews.forEach(v => v.classList.remove('active-view'));
      if (liteContainer) {
        liteContainer.style.display = 'block';
        updateLiteModeLanguage(getCurrentLang());
        switchLiteSection('produce');
      }
      if (sidebar) sidebar.style.display = 'none';
      if (headerSearch) headerSearch.style.display = 'none';
      if (floatingCopilot) floatingCopilot.style.display = 'none';
    } else {
      document.body.classList.remove('lite-mode-active');
      if (liteContainer) liteContainer.style.display = 'none';
      if (sidebar) sidebar.style.display = 'flex';
      if (headerSearch) headerSearch.style.display = 'flex';
      if (floatingCopilot) floatingCopilot.style.display = 'flex';
      
      // Restore default verified produce view
      const defaultView = document.getElementById('view-verified-produce');
      if (defaultView) defaultView.classList.add('active-view');
    }
  }

  function filterLiteProduce(category, btnElement) {
    activeLiteFilter = category;
    document.querySelectorAll('.lite-cat-pill').forEach(btn => {
      btn.classList.remove('active');
    });
    if (btnElement) {
      btnElement.classList.add('active');
    }
    renderLiteProduceCards();
  }

  // =========================================================================
  // 1. RENDER PRODUCE LOTS (All 26+ Verified Farm Lots)
  // =========================================================================

  function renderLiteProduceCards() {
    const grid = document.getElementById('lite-produce-grid');
    if (!grid) return;

    const dict = getDict();
    const currentLang = getCurrentLang();
    const lots = (window.buyerData && window.buyerData.verifiedLots) ? window.buyerData.verifiedLots : [];
    
    let filtered = lots;
    if (activeLiteFilter === 'emergency') {
      filtered = lots.filter(l => (l.isEmergency || (l.pricePerKg && Number(l.pricePerKg) < 25)));
    } else if (activeLiteFilter !== 'all') {
      const f = activeLiteFilter.toLowerCase();
      filtered = lots.filter(l => (l.category || '').toLowerCase().includes(f) || (l.crop || '').toLowerCase().includes(f));
    }

    if (filtered.length === 0) {
      filtered = lots;
    }

    grid.innerHTML = filtered.map(lot => {
      const kgPrice = lot.pricePerKg || (lot.priceNum ? (lot.priceNum / 100).toFixed(0) : '20');
      const cropKey = Object.keys(CROP_TRANSLATIONS).find(k => lot.crop.toLowerCase().includes(k.toLowerCase())) || 'Tomato';
      const trans = CROP_TRANSLATIONS[cropKey] || { en: lot.crop, hi: lot.crop, mr: lot.crop, icon: '🌾' };
      const displayCropName = trans[currentLang] || trans.en || lot.crop;
      const bagsCount = Math.round((lot.availableQtyKg || lot.quantityKg || 5000) / 50); // 50kg per bag

      // Localize farmer name & location if i18n engine is present
      const farmerName = (window.AgriNexI18n && typeof window.AgriNexI18n.tPerson === 'function') 
        ? window.AgriNexI18n.tPerson(lot.farmerName) : lot.farmerName;
      const farmerLocation = (window.AgriNexI18n && typeof window.AgriNexI18n.tLocation === 'function')
        ? window.AgriNexI18n.tLocation(lot.farmerLocation) : lot.farmerLocation;

      return `
        <div class="lite-produce-card">
          
          <!-- Top Badge Bar -->
          <div class="lite-card-topbar">
            <span class="lite-crop-tag">${displayCropName}</span>
            <span class="lite-grade-tag">✓ ${lot.grade || 'Grade A'}</span>
          </div>

          <!-- Large Crop Picture -->
          <div class="lite-img-container">
            <img src="${lot.image}" alt="${lot.crop}" class="lite-crop-img" onerror="this.src='assets/images/tomato.jpg'" />
            <button type="button" class="lite-audio-btn" onclick="speakLotDetails('${lot.id}')" title="Listen Audio Readout / आवाज़ में सुनें / आवाजात ऐका">
              🔊 <span style="font-size: 0.95rem; font-weight: 800;">${dict.listen}</span>
            </button>
          </div>

          <!-- Price & Quantity Banner -->
          <div class="lite-price-banner">
            <div class="lite-price-item">
              <span class="lite-price-label">${dict.priceLabel}</span>
              <strong class="lite-price-value">₹ ${kgPrice} <span style="font-size: 1rem;">${dict.perKg}</span></strong>
            </div>
            <div class="lite-price-item" style="text-align: right;">
              <span class="lite-price-label">${dict.qtyLabel}</span>
              <strong class="lite-qty-value">${lot.quantity}</strong>
              <span style="font-size: 0.82rem; color: #64748b; display: block;">(~ ${bagsCount} ${dict.bags})</span>
            </div>
          </div>

          <!-- Farmer Details Simple Box -->
          <div class="lite-farmer-box">
            <div style="font-size: 1.15rem;">👨‍🌾</div>
            <div style="flex: 1;">
              <strong style="font-size: 1.05rem; color: #0f172a; display: block;">${farmerName}</strong>
              <span style="font-size: 0.88rem; color: #475569;">📍 ${farmerLocation} • ${dict.verifiedBadge}</span>
            </div>
          </div>

          <!-- Big Action Buttons -->
          <div class="lite-card-actions">
            <button type="button" class="lite-btn-buy" onclick="openLiteBuyModal('${lot.id}')">
              ${dict.buyNow}
            </button>
            <button type="button" class="lite-btn-call" onclick="callFarmerDirect('${farmerName}')">
              ${dict.callFarmer}
            </button>
          </div>

        </div>
      `;
    }).join('');
  }

  // =========================================================================
  // 2. RENDER LIVE ORDERS & TRUCKS TRACKING
  // =========================================================================

  function renderLiteOrdersList() {
    const list = document.getElementById('lite-orders-list');
    if (!list) return;

    const dict = getDict();
    const consignments = (window.buyerData && window.buyerData.consignments) ? window.buyerData.consignments : [];

    list.innerHTML = consignments.map(c => {
      const farmerName = (window.AgriNexI18n && typeof window.AgriNexI18n.tPerson === 'function') ? window.AgriNexI18n.tPerson(c.farmer) : c.farmer;
      const driverName = (window.AgriNexI18n && typeof window.AgriNexI18n.tPerson === 'function') ? window.AgriNexI18n.tPerson(c.driver) : c.driver;
      const vehicleName = (window.AgriNexI18n && typeof window.AgriNexI18n.tVehicle === 'function') ? window.AgriNexI18n.tVehicle(c.vehicle) : c.vehicle;
      const cropName = (window.AgriNexI18n && typeof window.AgriNexI18n.tCrop === 'function') ? window.AgriNexI18n.tCrop(c.crop) : c.crop;

      return `
        <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 20px; padding: 22px; display: flex; flex-direction: column; gap: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; border-bottom: 1.5px solid #e2e8f0; padding-bottom: 14px;">
            <div>
              <span style="font-size: 1.25rem; font-weight: 800; color: #0f172a;">${cropName}</span>
              <span style="font-size: 0.95rem; font-weight: 700; color: #065f46; margin-left: 10px;">• ${c.quantity_kg.toLocaleString('en-IN')} kg (${c.quantity_qt} Qt)</span>
            </div>
            <span style="background: #dcfce7; color: #166534; font-size: 0.9rem; font-weight: 800; padding: 6px 14px; border-radius: 999px; border: 1px solid #bbf7d0;">
              ${dict.onRoad}
            </span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px;">
            <div style="background: #ffffff; padding: 14px; border-radius: 14px; border: 1px solid #e2e8f0;">
              <span style="font-size: 0.8rem; font-weight: 700; color: #64748b; text-transform: uppercase;">${dict.locationLabel}</span>
              <strong style="font-size: 1.05rem; color: #0f172a; display: block; margin-top: 4px;">📍 ${c.loc}</strong>
              <span style="font-size: 0.88rem; color: #16a34a; font-weight: 700;">🕒 ${c.eta}</span>
            </div>

            <div style="background: #ffffff; padding: 14px; border-radius: 14px; border: 1px solid #e2e8f0;">
              <span style="font-size: 0.8rem; font-weight: 700; color: #64748b; text-transform: uppercase;">${dict.driverLabel}</span>
              <strong style="font-size: 1.05rem; color: #0f172a; display: block; margin-top: 4px;">🚚 ${driverName} (${vehicleName})</strong>
              <span style="font-size: 0.88rem; color: #475569;">👨‍🌾 ${dict.farmerLabel}: ${farmerName}</span>
            </div>
          </div>

          <div style="display: flex; gap: 12px; justify-content: flex-end; flex-wrap: wrap;">
            <button type="button" class="lite-btn-call" style="padding: 12px 20px; font-size: 1rem;" onclick="callDriverDirect('${driverName}')">
              ${dict.callDriver}
            </button>
            <button type="button" class="lite-btn-buy" style="padding: 12px 20px; font-size: 1rem;" onclick="speakTruckStatus('${c.crop}', '${c.loc}', '${c.eta}')">
              🔊 ${dict.listenStatus}
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // =========================================================================
  // 3. RENDER SAFE ESCROW CARDS
  // =========================================================================

  function renderLiteEscrowCards() {
    const container = document.getElementById('lite-escrow-cards');
    if (!container) return;

    container.innerHTML = `
      <div style="background: #f0fdf4; border: 2px solid #bbf7d0; border-radius: 20px; padding: 24px;">
        <span style="font-size: 0.85rem; font-weight: 700; color: #166534; text-transform: uppercase;">🛡️ सुरक्षित शिल्लक (Total Escrow Vault)</span>
        <strong style="font-size: 2.2rem; font-weight: 900; color: #15803d; display: block; margin: 8px 0;">₹ 2,45,000</strong>
        <p style="font-size: 0.95rem; color: #166534; margin: 0;">100% सुरक्षित • माल गोदामात आल्यावरच शेतकऱ्याला पैसे मिळतात.</p>
      </div>

      <div style="background: #ffffff; border: 2px solid #e2e8f0; border-radius: 20px; padding: 24px;">
        <span style="font-size: 0.85rem; font-weight: 700; color: #64748b; text-transform: uppercase;">📦 चालू ऑर्डर्स अनामत (Active Advances)</span>
        <strong style="font-size: 2.2rem; font-weight: 900; color: #0f172a; display: block; margin: 8px 0;">₹ 1,01,500</strong>
        <p style="font-size: 0.95rem; color: #475569; margin: 0;">2 गाड्यांच्या 35% सुरक्षित ठेव खात्यात राखीव आहेत.</p>
      </div>

      <div style="background: #ffffff; border: 2px solid #e2e8f0; border-radius: 20px; padding: 24px;">
        <span style="font-size: 0.85rem; font-weight: 700; color: #64748b; text-transform: uppercase;">📄 कायदेशीर बिल व पावत्या (GST Invoices)</span>
        <strong style="font-size: 2.2rem; font-weight: 900; color: #0284c7; display: block; margin: 8px 0;">4 पावती तयार</strong>
        <p style="font-size: 0.95rem; color: #475569; margin: 0;">सर्व डिजिटल खरेदी पावत्या डाउनलोड करण्यासाठी तयार आहेत.</p>
      </div>
    `;
  }

  // =========================================================================
  // AUDIO ASSISTANT HELPERS
  // =========================================================================

  function speakLotDetails(lotId) {
    const lots = (window.buyerData && window.buyerData.verifiedLots) ? window.buyerData.verifiedLots : [];
    const lot = lots.find(l => l.id === lotId) || lots[0];
    if (!lot) return;

    const currentLang = getCurrentLang();
    const cropKey = Object.keys(CROP_TRANSLATIONS).find(k => lot.crop.toLowerCase().includes(k.toLowerCase())) || 'Tomato';
    const trans = CROP_TRANSLATIONS[cropKey] || { en: lot.crop, hi: lot.crop, mr: lot.crop };
    const kgPrice = lot.pricePerKg || (lot.priceNum ? (lot.priceNum / 100).toFixed(0) : '20');

    let speechText = '';
    if (currentLang === 'hi') {
      speechText = `किसान ${lot.farmerName}, ${lot.farmerLocation} से ${trans.hi}. भाव है ₹ ${kgPrice} रुपये प्रति किलो. कुल ${lot.quantity} माल उपलब्ध है. खरीदने के लिए हरा बटन दबाएं.`;
    } else if (currentLang === 'mr') {
      speechText = `शेतकरी ${lot.farmerName}, ${lot.farmerLocation} येथून ${trans.mr}. दर आहे ₹ ${kgPrice} रुपये प्रति किलो. एकूण ${lot.quantity} माल उपलब्ध आहे. खरेदी करण्यासाठी हिरवे बटण दाबा.`;
    } else {
      speechText = `Direct lot of ${lot.crop} from farmer ${lot.farmerName} in ${lot.farmerLocation}. Price is Rupees ${kgPrice} per kilogram. Total available quantity is ${lot.quantity}. Tap the green button to buy now.`;
    }

    speakText(speechText, currentLang);
  }

  function speakOrdersSummary() {
    const consignments = (window.buyerData && window.buyerData.consignments) ? window.buyerData.consignments : [];
    const currentLang = getCurrentLang();
    if (consignments.length === 0) return;

    const c = consignments[0];
    const cropName = (window.AgriNexI18n && typeof window.AgriNexI18n.tCrop === 'function') ? window.AgriNexI18n.tCrop(c.crop) : c.crop;
    const vehicleName = (window.AgriNexI18n && typeof window.AgriNexI18n.tVehicle === 'function') ? window.AgriNexI18n.tVehicle(c.vehicle) : c.vehicle;

    let msg = '';
    if (currentLang === 'hi') {
      msg = `आपकी ${cropName} की गाड़ी (${vehicleName}) वर्तमान में ${c.loc} के पास है। पहुंचने का समय ${c.eta} है।`;
    } else if (currentLang === 'mr') {
      msg = `तुमच्या ${cropName} ची गाडी (${vehicleName}) सध्या ${c.loc} जवळ आहे. पोहोचण्याची अंदाजे वेळ ${c.eta} आहे.`;
    } else {
      msg = `Your truck (${vehicleName}) of ${cropName} is currently near ${c.loc}. Estimated arrival is ${c.eta}.`;
    }
    speakText(msg, currentLang);
  }

  function speakTruckStatus(crop, loc, eta, vehicle) {
    const currentLang = getCurrentLang();
    const cropName = (window.AgriNexI18n && typeof window.AgriNexI18n.tCrop === 'function') ? window.AgriNexI18n.tCrop(crop) : crop;
    const vehicleName = (vehicle && window.AgriNexI18n && typeof window.AgriNexI18n.tVehicle === 'function') ? window.AgriNexI18n.tVehicle(vehicle) : (vehicle || '');

    let msg = '';
    if (currentLang === 'hi') {
      msg = `${cropName} की गाड़ी ${vehicleName ? '(' + vehicleName + ')' : ''} ${loc} पर है। आगमन ${eta}।`;
    } else if (currentLang === 'mr') {
      msg = `${cropName} ची गाडी ${vehicleName ? '(' + vehicleName + ')' : ''} ${loc} येथे आहे. पोहोचण्याची वेळ ${eta}।`;
    } else {
      msg = `Truck ${vehicleName} carrying ${cropName} is at ${loc}. Arrival time ${eta}.`;
    }
    speakText(msg, currentLang);
  }

  let activeLiteAudioObj = null;
  let currentLiteTTSRequestId = 0;
  let liteAbortController = null;

  async function speakText(text, langCode) {
    stopLiteSpeech();

    const requestId = ++currentLiteTTSRequestId;
    if (liteAbortController) {
      try { liteAbortController.abort(); } catch (e) {}
    }
    liteAbortController = new AbortController();

    // Try Sarvam AI Indian TTS API
    try {
      const resp = await fetch('/api/tts/speak', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: liteAbortController.signal,
        body: JSON.stringify({
          text: text,
          language_code: langCode === 'hi' ? 'hi-IN' : (langCode === 'mr' ? 'mr-IN' : 'en-IN'),
          speaker: 'meera'
        })
      });

      if (requestId !== currentLiteTTSRequestId) return;

      if (resp.ok) {
        const data = await resp.json();
        if (requestId !== currentLiteTTSRequestId) return;

        if (data && data.success && data.audio_base64) {
          if (activeLiteAudioObj) {
            try {
              activeLiteAudioObj.pause();
              activeLiteAudioObj.currentTime = 0;
            } catch (e) {}
            activeLiteAudioObj = null;
          }
          if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
          }

          const audio = new Audio('data:audio/wav;base64,' + data.audio_base64);
          activeLiteAudioObj = audio;
          audio.onended = () => {
            if (requestId === currentLiteTTSRequestId) activeLiteAudioObj = null;
          };
          audio.onerror = () => {
            if (requestId === currentLiteTTSRequestId) fallbackLiteBrowserTTS(text, langCode, requestId);
          };
          await audio.play();
          return;
        }
      }
    } catch (e) {
      if (e && e.name === 'AbortError') return;
      console.warn('Sarvam Indian TTS fallback to browser synthesis in Simple Mode:', e);
    }

    if (requestId !== currentLiteTTSRequestId) return;
    fallbackLiteBrowserTTS(text, langCode, requestId);
  }

  function fallbackLiteBrowserTTS(text, langCode, requestId) {
    if (!window.speechSynthesis) return;
    if (requestId && requestId !== currentLiteTTSRequestId) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const targetLang = langCode === 'hi' ? 'hi-IN' : (langCode === 'mr' ? 'mr-IN' : 'en-IN');
    utterance.lang = targetLang;
    utterance.rate = 0.90; // comfortable cadence for older users
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      const match = voices.find(v => v.lang === targetLang || v.lang.startsWith(langCode) || (langCode === 'en' && (v.lang === 'en-IN' || v.name.includes('India'))));
      if (match) utterance.voice = match;
    }

    utterance.onstart = () => {
      if (requestId && requestId !== currentLiteTTSRequestId) {
        window.speechSynthesis.cancel();
      }
    };

    window.speechSynthesis.speak(utterance);
  }

  function stopLiteSpeech() {
    currentLiteTTSRequestId++;
    if (liteAbortController) {
      try { liteAbortController.abort(); } catch (e) {}
      liteAbortController = null;
    }
    if (activeLiteAudioObj) {
      try {
        activeLiteAudioObj.pause();
        activeLiteAudioObj.currentTime = 0;
      } catch (e) {}
      activeLiteAudioObj = null;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }

  // =========================================================================
  // 1-TAP SIMPLIFIED BUY CONFIRMATION MODAL
  // =========================================================================

  let currentLiteLot = null;

  function openLiteBuyModal(lotId) {
    const lots = (window.buyerData && window.buyerData.verifiedLots) ? window.buyerData.verifiedLots : [];
    const lot = lots.find(l => l.id === lotId) || lots[0];
    if (!lot) return;

    currentLiteLot = lot;
    const modal = document.getElementById('modal-lite-buy');
    if (!modal) return;

    const dict = getDict();
    const currentLang = getCurrentLang();
    const cropKey = Object.keys(CROP_TRANSLATIONS).find(k => lot.crop.toLowerCase().includes(k.toLowerCase())) || 'Tomato';
    const trans = CROP_TRANSLATIONS[cropKey] || { en: lot.crop, hi: lot.crop, mr: lot.crop };
    const displayCrop = trans[currentLang] || lot.crop;

    const kgPrice = lot.pricePerKg || (lot.priceNum ? (lot.priceNum / 100).toFixed(0) : '20');
    const totalEst = Math.round((lot.availableQtyKg || lot.quantityKg || 5000) * Number(kgPrice));
    const advance35 = Math.round(totalEst * 0.35);

    const farmerName = (window.AgriNexI18n && typeof window.AgriNexI18n.tPerson === 'function') 
      ? window.AgriNexI18n.tPerson(lot.farmerName) : lot.farmerName;
    const farmerLocation = (window.AgriNexI18n && typeof window.AgriNexI18n.tLocation === 'function')
      ? window.AgriNexI18n.tLocation(lot.farmerLocation) : lot.farmerLocation;

    document.getElementById('lite-buy-img').src = lot.image;
    document.getElementById('lite-buy-crop-title').textContent = `${displayCrop}`;
    document.getElementById('lite-buy-farmer').textContent = `${dict.farmerLabel}: ${farmerName} (📍 ${farmerLocation})`;
    document.getElementById('lite-buy-price').textContent = `₹ ${kgPrice} ${dict.perKg}`;
    document.getElementById('lite-buy-qty').textContent = `${lot.quantity}`;
    document.getElementById('lite-buy-total').textContent = `₹ ${totalEst.toLocaleString('en-IN')}`;
    document.getElementById('lite-buy-advance').textContent = `₹ ${advance35.toLocaleString('en-IN')} (${dict.escrowPercent})`;

    const priceLbl = document.getElementById('lite-modal-price-label');
    if (priceLbl) priceLbl.textContent = `${dict.rateLabel}:`;

    const qtyLbl = document.getElementById('lite-modal-qty-label');
    if (qtyLbl) qtyLbl.textContent = `${dict.qtyTextLabel}:`;

    const totalLbl = document.getElementById('lite-modal-total-label');
    if (totalLbl) totalLbl.textContent = `${dict.totalLabel}:`;

    const escrowLbl = document.getElementById('lite-modal-escrow-label');
    if (escrowLbl) escrowLbl.textContent = `${dict.escrowNote}:`;

    const cancelBtn = document.getElementById('lite-modal-btn-cancel-text');
    if (cancelBtn) cancelBtn.textContent = dict.cancel;

    const confirmBtn = document.getElementById('lite-modal-btn-confirm-text');
    if (confirmBtn) confirmBtn.textContent = dict.confirmBuy;

    modal.classList.add('active');

    let promptSpeech = '';
    if (currentLang === 'hi') {
      promptSpeech = `${displayCrop} खरीद की पुष्टि करें। कुल राशि ₹ ${totalEst} रुपये। खरीद पक्की करने के लिए हरा बटन दबाएं।`;
    } else if (currentLang === 'mr') {
      promptSpeech = `${displayCrop} खरेदीची खात्री करा. एकूण रक्कम ₹ ${totalEst} रुपये. खरेदी नक्की करण्यासाठी हिरवे बटण दाबा.`;
    } else {
      promptSpeech = `Confirm purchase of ${lot.crop}. Total estimated amount is Rupees ${totalEst}. Tap the green button to confirm.`;
    }

    speakText(promptSpeech, currentLang);
  }

  function closeLiteBuyModal() {
    const modal = document.getElementById('modal-lite-buy');
    if (modal) modal.classList.remove('active');
    stopLiteSpeech();
  }

  function confirmLiteBuyOrder() {
    if (!currentLiteLot) return;
    
    closeLiteBuyModal();
    const dict = getDict();
    const currentLang = getCurrentLang();
    
    // Voice confirmation
    speakText(dict.orderSuccess, currentLang);
    
    if (typeof showToast === 'function') {
      showToast(`✓ ${currentLiteLot.crop} Order Placed Successfully!`, 'success');
    }

    // Direct to PO if available
    if (typeof generateAndOpenPO === 'function') {
      setTimeout(() => {
        const kgPrice = Number(currentLiteLot.pricePerKg || 20);
        const totalEst = Math.round((currentLiteLot.availableQtyKg || currentLiteLot.quantityKg || 5000) * kgPrice);
        generateAndOpenPO(currentLiteLot.id, currentLiteLot.crop, currentLiteLot.quantity, currentLiteLot.farmerName, totalEst);
      }, 1500);
    }
  }

  function callFarmerDirect(farmerName) {
    const dict = getDict();
    const currentLang = getCurrentLang();
    speakText(`${dict.connectingFarmer} ${farmerName}.`, currentLang);
    alert(`📞 Connecting Phone Call to Farmer: ${farmerName}\n${dict.tollFree}`);
  }

  function callDriverDirect(driverName) {
    const dict = getDict();
    const currentLang = getCurrentLang();
    speakText(`${dict.connectingDriver} ${driverName}.`, currentLang);
    alert(`📞 Connecting Phone Call to Driver: ${driverName}\nLogistics Helpline: 1800-AGRI-NEX`);
  }

  function startLiteVoiceAssistant() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice search is not supported on this browser.");
      return;
    }

    const dict = getDict();
    const currentLang = getCurrentLang();
    const recLang = currentLang === 'hi' ? 'hi-IN' : (currentLang === 'mr' ? 'mr-IN' : 'en-IN');

    speakText(dict.voicePrompt, currentLang);

    setTimeout(() => {
      const recognizer = new SpeechRecognition();
      recognizer.lang = recLang;
      recognizer.start();

      recognizer.onresult = function (event) {
        const speechQuery = event.results[0][0].transcript;
        if (speechQuery) {
          speakText(`${dict.searchingFor} ${speechQuery}.`, currentLang);
          filterLiteByVoice(speechQuery);
        }
      };

      recognizer.onerror = function () {
        speakText(dict.voiceFail, currentLang);
      };
    }, 1200);
  }

  function filterLiteByVoice(query) {
    const q = query.toLowerCase();
    const lots = (window.buyerData && window.buyerData.verifiedLots) ? window.buyerData.verifiedLots : [];
    
    // Voice Multilingual Matcher
    const VOICE_CROP_SYNONYMS = [
      { key: 'onion', words: ['onion', 'onions', 'कांदा', 'कांदे', 'कांद्या', 'प्याज', 'प्याज़', 'kanda', 'pyaz', 'dungri', 'vengayam', 'ullipaya'] },
      { key: 'tomato', words: ['tomato', 'tomatoes', 'टोमॅटो', 'टमाटर', 'tamatar', 'thakkali', 'tameta', 'shivam', 'abhinav'] },
      { key: 'potato', words: ['potato', 'potatoes', 'बटाटा', 'बटाटे', 'आलू', 'batata', 'aloo', 'bataka', 'jyoti'] },
      { key: 'banana', words: ['banana', 'bananas', 'केळी', 'केळे', 'केला', 'केले', 'keli', 'kele', 'kela', 'grand naine', 'g9', 'arati'] },
      { key: 'soybean', words: ['soybean', 'soya', 'soyabean', 'सोयाबीन', 'सोया', 'js 335'] },
      { key: 'wheat', words: ['wheat', 'गहू', 'गेहूं', 'gahu', 'gehu', 'sharbati', 'lokwan'] },
      { key: 'rice', words: ['rice', 'paddy', 'तांदूळ', 'भात', 'चावल', 'धान', 'chawal', 'dhan', 'tandul', 'bhat', 'indrayani', 'arisi'] },
      { key: 'cotton', words: ['cotton', 'कापूस', 'कपास', 'रुई', 'kapus', 'kapas', 'rui', 'paruthi'] },
      { key: 'turmeric', words: ['turmeric', 'हळद', 'हल्दी', 'haldi', 'halad', 'pasupu', 'waigaon', 'salem'] },
      { key: 'pomegranate', words: ['pomegranate', 'डाळिंब', 'अनार', 'dalimb', 'anar', 'bhagwa'] },
      { key: 'orange', words: ['orange', 'oranges', 'संत्रा', 'संत्री', 'संतरा', 'santra', 'santri', 'nagpur', 'mosambi'] },
      { key: 'maize', words: ['maize', 'corn', 'मका', 'मक्का', 'भूट्टा', 'maka', 'makka', 'bhutta'] },
      { key: 'jowar', words: ['jowar', 'sorghum', 'ज्वारी', 'ज्वार', 'jwari', 'maldandi'] },
      { key: 'bajra', words: ['bajra', 'millet', 'बाजरी', 'बाजरा', 'kambu', 'sajjalu'] },
      { key: 'gram', words: ['gram', 'chana', 'हरभरा', 'चना', 'छोले', 'harbhara', 'vishal'] },
      { key: 'grapes', words: ['grapes', 'द्राक्षे', 'द्राक्ष', 'अंगूर', 'draksha', 'angoor', 'tasgaon'] },
      { key: 'mango', words: ['mango', 'आंबा', 'आम', 'amba', 'aam', 'alphonso', 'hapus'] }
    ];

    let detectedKey = '';
    for (const syn of VOICE_CROP_SYNONYMS) {
      if (syn.words.some(w => q.includes(w.toLowerCase()))) {
        detectedKey = syn.key;
        break;
      }
    }

    let matched = lots.filter(l => {
      const c = (l.crop || '').toLowerCase();
      if (detectedKey && c.includes(detectedKey)) return true;
      return q.includes(c.split(' ')[0]) || (l.category && q.includes(l.category.toLowerCase()));
    });

    if (matched.length === 0) {
      matched = lots;
    }
    
    const grid = document.getElementById('lite-produce-grid');
    if (!grid) return;

    grid.innerHTML = '';
    window.buyerData.verifiedLots = matched;
    renderLiteProduceCards();
  }

  // Initialize on Load
  document.addEventListener('DOMContentLoaded', initLiteMode);

  // Bind to Window Global Object
  window.initLiteMode = initLiteMode;
  window.toggleLiteMode = toggleLiteMode;
  window.switchLiteSection = switchLiteSection;
  window.updateLiteModeLanguage = updateLiteModeLanguage;
  window.filterLiteProduce = filterLiteProduce;
  window.renderLiteProduceCards = renderLiteProduceCards;
  window.renderLiteOrdersList = renderLiteOrdersList;
  window.renderLiteEscrowCards = renderLiteEscrowCards;
  window.speakLotDetails = speakLotDetails;
  window.speakOrdersSummary = speakOrdersSummary;
  window.speakTruckStatus = speakTruckStatus;
  window.openLiteBuyModal = openLiteBuyModal;
  window.closeLiteBuyModal = closeLiteBuyModal;
  window.confirmLiteBuyOrder = confirmLiteBuyOrder;
  window.callFarmerDirect = callFarmerDirect;
  window.callDriverDirect = callDriverDirect;
  window.startLiteVoiceAssistant = startLiteVoiceAssistant;

})();
