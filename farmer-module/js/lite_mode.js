/**
 * AgriNex Farmer Module - Simple & Audio-First Lite Mode (सरल शेतकरी मोड / सुलभ मोड)
 * Designed specifically for rural, elderly, low-vision, or non-literate farmers.
 * Supports All Verified Crops, Direct 1-Tap Selling, Voice Narration, and Multilingual Support.
 */

(function () {
  'use strict';

  // Default to Simple Mode on initial entry unless user explicitly switched to false ('false')
  let isLiteMode = localStorage.getItem('agrinex_farmer_lite_mode') !== 'false';
  let activeLiteSection = 'produce'; // 'produce' | 'bids' | 'orders' | 'escrow' | 'insights'
  let activeLiteFilter = 'all';
  let currentSpeechRate = parseFloat(localStorage.getItem('agrinex_farmer_lite_speech_rate')) || 0.90;
  let currentFontSize = localStorage.getItem('agrinex_farmer_lite_font_size') || 'md';
  let isSunlightMode = localStorage.getItem('agrinex_farmer_lite_sunlight_mode') === 'true';

  // Market Insights Graph & Analytics State in Simple Mode
  let liteMarketData = null;
  let activeLiteCropId = 'tomato-nashik-apmc';
  let selectedLiteUnit = 'kg'; // 'kg' or 'qt'
  let liteChartInstance = null;

  function ensureChartJs(callback) {
    if (typeof window.Chart !== 'undefined') {
      callback();
      return;
    }
    const existing = document.querySelector('script[src*="chart.umd.min.js"]');
    if (existing) {
      existing.addEventListener('load', callback);
      return;
    }
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js';
    s.onload = () => callback();
    document.head.appendChild(s);
  }

  // Multilingual UI Dictionary for Farmer Simple Mode
  const LITE_I18N = {
    en: {
      toggleSimple: '👴 Simple Mode',
      toggleEnterprise: '⚡ Enterprise Mode',
      tabProduce: '🌾 My Crops & Sell',
      tabBids: '💰 Buyer Bids & Offers',
      tabOrders: '🚚 Shipments & Trucks',
      tabEscrow: '🛡️ Safe Escrow & Payout',
      tabInsights: '📊 Market Insights & Rates',

      // Hero Banner
      heroBadge: '🟢 Direct Farm Commerce • 0% Brokerage',
      heroTitle: '🌾 Farmer Direct Selling Market',
      heroDesc: 'Tap large buttons, listen to clear voice advice, list your harvest in 1-tap, and get guaranteed bank payouts.',
      voiceBtnTitle: 'Voice Command',
      voiceBtnDesc: '"Sell Tomatoes" / "Mandi Price"',
      addNewCropBtn: '+ 1-Tap List Fresh Crop',
      emergencyBtnTitle: 'Emergency Salvage',
      emergencyBtnDesc: 'Fast liquidation for perishables',

      // Categories
      catAll: 'All Crops',
      catVeg: 'Vegetables',
      catFruit: 'Fruits',
      catGrain: 'Grains & Pulses',
      catOilseed: 'Oilseeds & Spices',
      catEmerg: 'Emergency Lots',

      // Common labels
      listen: 'Listen',
      priceLabel: 'EXPECTED RATE',
      bestBidLabel: 'HIGHEST BUYER BID',
      qtyLabel: 'AVAILABLE LOT SIZE',
      bags: 'Bags',
      verifiedBadge: '🛡️ AgriNex Verified',
      statusLabel: 'STATUS',
      callHelpline: '📞 Krishi Helpline',
      editPrice: '✏️ Change Rate',
      emergencySellBtn: '🚨 Quick Salvage Sale',

      // Bids Section
      bidsTitle: '💰 Direct Incoming Buyer Offers',
      bidsSubtitle: 'Review genuine corporate and wholesale bids. Accept in 1-tap to lock 35% advance escrow immediately.',
      listenBids: 'Listen Offers',
      acceptBidBtn: '🟢 1-Tap Accept Offer',
      bargainBidBtn: '🤝 Counter-Offer / Bargain',
      callBuyerBtn: '📞 Call Buyer',
      offeredRate: 'OFFERED RATE',
      totalPayout: 'TOTAL PAYOUT',
      advanceLockedBadge: '🔒 35% Advance Ready',

      // Orders & Logistics Section
      ordersTitle: '🚚 Booked Trucks & Live Shipments',
      ordersSubtitle: 'Track your produce transport on live GPS with 1-tap call to the truck driver.',
      listenOrders: 'Listen Transit Status',
      callDriverBtn: '📞 Call Driver',
      driverInfoLabel: 'Driver & Vehicle',
      mandiLocationLabel: 'Pickup Location',
      destinationLabel: 'Destination Terminal',
      etaLabel: 'Estimated Arrival (ETA)',
      onRoad: '🚚 On The Highway (In Transit)',
      delivered: '✅ Successfully Delivered',

      // Escrow & Bank Payout Section
      escrowTitle: '🛡️ 100% Guaranteed Escrow & Bank Vault',
      escrowSubtitle: 'Your sales earnings are safe in a government-supervised escrow account and deposited directly to your bank account via UPI/IMPS.',
      listenEscrow: 'Listen Escrow Balance',
      totalEarned: 'Total Platform Sales',
      bankBalance: 'Liquid Bank Account',
      lockedEscrow: 'Locked In Transit (35% Escrow)',
      readyWithdraw: 'Available for Instant Payout',
      withdrawBtn: '💸 1-Tap Withdraw to Bank / UPI',
      step1Title: '🔒 35% Advance Locked',
      step1Desc: 'Buyer deposits 35% advance in bank escrow before truck dispatch.',
      step2Title: '🚛 Quality & Weight Verification',
      step2Desc: 'Automated digital slip generation at warehouse weighing bridge.',
      step3Title: '💸 Instant 100% Payout',
      step3Desc: 'Full payment released directly into your bank account within minutes.',

      // Insights Section
      insightsTitle: '📊 APMC Mandi Benchmark & AI Advisory',
      insightsSubtitle: 'Compare current Mandi rates with your direct farm prices, view price trends, and listen to AI Sell/Hold advice.',
      listenInsights: 'Listen Market Advice',
      mandiBenchmarkLabel: 'APMC MANDI BENCHMARK',
      farmDirectLabel: 'DIRECT FARM-GATE',
      signalSellText: '🟢 SELL TODAY (Prices Peaking)',
      signalHoldText: '⏳ HOLD / STORE (Prices Expected to Rise)',

      // Modals
      addCropModalTitle: '1-Tap List Fresh Crop Harvest',
      selectCropLabel: '1. Select Crop (टॅप करा):',
      selectQtyLabel: '2. Select Quantity:',
      enterRateLabel: '3. Expected Price (₹ / Quintal):',
      voiceAddBtn: '🎤 Speak Harvest Details to Fill Form',
      confirmListBtn: '✓ Publish Crop Listing',
      cancelBtn: '✕ Cancel',

      bargainModalTitle: '1-Tap Counter-Offer (भाव वाढवून मागा)',
      buyerOfferedRate: 'Buyer Offered Rate:',
      yourDemandRate: 'Your Counter Demand:',
      quickBargainPill: '⚡ Select 1-Tap Higher Demand Rate:',
      sendCounterBtn: '💬 Send Counter Offer to Buyer',

      withdrawModalTitle: 'Instant Bank Withdrawal (पैसे खात्यात घ्या)',
      withdrawPrompt: 'Transfer your cleared earnings directly to your verified bank account:',
      linkedBank: 'Linked Bank Account:',
      confirmWithdrawBtn: '💸 Confirm Instant Transfer',

      sunlightMode: 'Sunlight Mode',
      normalMode: 'Normal Mode',
      floatingMicText: 'Speak Command'
    },
    hi: {
      toggleSimple: '👴 सरल मोड',
      toggleEnterprise: '⚡ एंटरप्राइज मोड',
      tabProduce: '🌾 मेरी फसलें व बिक्री',
      tabBids: '💰 खरीदार ऑफर्स व बोलियां',
      tabOrders: '🚚 गाड़ियां व ट्रांसपोर्ट',
      tabEscrow: '🛡️ सुरक्षित बैंक व एस्क्रो',
      tabInsights: '📊 मंडी भाव अंतर्दृष्टि (Market Insights)',

      heroBadge: '🟢 सीधा किसान व्यापार • 0% बिचौलिया कटौती',
      heroTitle: '🌾 किसान सीधा फसल बिक्री केंद्र (सरल बाज़ार)',
      heroDesc: 'बटन दबाएं, आवाज़ में स्पष्ट जानकारी सुनें, 1-क्लिक में फसल दर्ज करें और सीधे बैंक में 100% सुरक्षित भुगतान पाएं।',
      voiceBtnTitle: 'बोलकर आदेश दें',
      voiceBtnDesc: '"टमाटर बेचो" / "मंडी भाव"',
      addNewCropBtn: '+ 1-क्लिक नई फसल बेचें',
      emergencyBtnTitle: 'आपातकालीन बिक्री',
      emergencyBtnDesc: 'जल्दी खराब होने वाली फसल की त्वरित बिक्री',

      catAll: 'सभी फसलें',
      catVeg: 'सब्जियां',
      catFruit: 'फल',
      catGrain: 'अनाज व दालें',
      catOilseed: 'तिलहन व मसाले',
      catEmerg: 'सवलत लॉट',

      listen: 'सुनें',
      priceLabel: 'अपेक्षित दर / भाव',
      bestBidLabel: 'उच्चतम खरीदार बोली',
      qtyLabel: 'उपलब्ध मात्रा (बोरी / क्विंटल)',
      bags: 'बोरी',
      verifiedBadge: '🛡️ एग्रीनेक्स सत्यापित',
      statusLabel: 'स्थिति',
      callHelpline: '📞 किसान हेल्पलाइन',
      editPrice: '✏️ भाव बदलें',
      emergencySellBtn: '🚨 त्वरित बिक्री करें',

      bidsTitle: '💰 खरीदारों की सीधी बोलियां व ऑफर्स',
      bidsSubtitle: 'थोक खरीदारों और कंपनियों की बोलियां देखें। 1-क्लिक में स्वीकार कर 35% सुरक्षित अग्रिम तुरंत बैंक में लॉक करें।',
      listenBids: 'बोलियां सुनें',
      acceptBidBtn: '🟢 1-क्लिक ऑफर स्वीकार करें',
      bargainBidBtn: '🤝 भाव बढ़ाकर मांगें (मोलभाव)',
      callBuyerBtn: '📞 खरीदार को फोन लगाएं',
      offeredRate: 'खरीदार का भाव',
      totalPayout: 'कुल भुगतान राशि',
      advanceLockedBadge: '🔒 35% अग्रिम तैयार',

      ordersTitle: '🚚 रास्ते में चल रही गाड़ियां व ट्रांसपोर्ट',
      ordersSubtitle: 'अपनी फसल ले जाने वाली गाड़ियों का लाइव जीपीएस देखें और 1-क्लिक में सीधे ड्राइवर से फोन पर बात करें।',
      listenOrders: 'गाड़ी की स्थिति सुनें',
      callDriverBtn: '📞 ड्राइवर को फोन लगाएं',
      driverInfoLabel: 'ड्राइवर व गाड़ी नंबर',
      mandiLocationLabel: 'लोडिंग मंडी स्थान',
      destinationLabel: 'गंतव्य गोदाम / टर्मिनल',
      etaLabel: 'पहुंचने का समय (ETA)',
      onRoad: '🚚 गाड़ी रास्ते में है (In Transit)',
      delivered: '✅ सुरक्षित पहुंच गया (Delivered)',

      escrowTitle: '🛡️ 100% सुरक्षित एस्क्रो व बैंक खाता',
      escrowSubtitle: 'आपकी फसल की पूरी कमाई सरकारी निगरानी वाले एस्क्रो खाते में सुरक्षित रहती है और 1-क्लिक में सीधे आपके बैंक खाते या UPI में जमा होती है।',
      listenEscrow: 'खाता शेष सुनें',
      totalEarned: 'कुल फसल बिक्री',
      bankBalance: 'बैंक खाता राशि',
      lockedEscrow: 'रास्ते में सुरक्षित (35% एस्क्रो)',
      readyWithdraw: 'बैंक में निकालने हेतु उपलब्ध',
      withdrawBtn: '💸 1-क्लिक सीधे बैंक में पैसे लें',
      step1Title: '🔒 35% अग्रिम सुरक्षित',
      step1Desc: 'गाड़ी निकलने से पहले खरीदार का 35% अग्रिम बैंक एस्क्रो में लॉक होता है।',
      step2Title: '🚛 वजन व गुणवत्ता जांच',
      step2Desc: 'गोदाम के वे-ब्रिज पर इलेक्ट्रॉनिक वजन और ग्रेड की पर्ची बनती है।',
      step3Title: '💸 तुरंत 100% बैंक भुगतान',
      step3Desc: 'जांच पूर्ण होते ही शेष राशि सीधे आपके बैंक खाते में जमा हो जाती है।',

      insightsTitle: '📊 मंडी भाव तुलना व AI फसल सलाह',
      insightsSubtitle: 'मंडी के भाव और सीधे किसान भाव की तुलना करें और आवाज़ में सलाह सुनें कि आज फसल बेचें या रोकें।',
      listenInsights: 'बाजार सलाह सुनें',
      mandiBenchmarkLabel: 'मंडी यार्ड भाव',
      farmDirectLabel: 'सीधा किसान भाव',
      signalSellText: '🟢 आज ही बेचें (भाव चरम पर हैं)',
      signalHoldText: '⏳ रोकें / साठवा (भाव बढ़ने की संभावना)',

      addCropModalTitle: '1-क्लिक नई फसल बिक्री नोंदणी',
      selectCropLabel: '1. फसल चुनें (टैप करें):',
      selectQtyLabel: '2. मात्रा चुनें (बोरी / क्विंटल):',
      enterRateLabel: '3. अपेक्षित भाव (₹ / क्विंटल):',
      voiceAddBtn: '🎤 बोलकर फसल की जानकारी भरें',
      confirmListBtn: '✓ फसल बिक्री प्रकाशित करें',
      cancelBtn: '✕ रद्द करें',

      bargainModalTitle: '1-क्लिक भाव बढ़ाकर मांगें (Counter-Offer)',
      buyerOfferedRate: 'खरीदार का प्रस्तावित भाव:',
      yourDemandRate: 'आपकी मांग (नया भाव):',
      quickBargainPill: '⚡ 1-क्लिक अधिक भाव चुनें:',
      sendCounterBtn: '💬 खरीदार को नया भाव भेजें',

      withdrawModalTitle: 'सीधे बैंक खाते में पैसे लें (Instant Payout)',
      withdrawPrompt: 'अपनी सुरक्षित बिक्री राशि तुरंत अपने बैंक खाते में ट्रांसफर करें:',
      linkedBank: 'लिंक्ड बैंक खाता:',
      confirmWithdrawBtn: '💸 पैसे बैंक में ट्रांसफर करें',

      sunlightMode: 'धूप मोड (Sunlight)',
      normalMode: 'सामान्य थीम',
      floatingMicText: 'बोलकर आदेश दें'
    },
    mr: {
      toggleSimple: '👴 सरल शेतकरी मोड',
      toggleEnterprise: '⚡ प्रो डॅशबोर्ड',
      tabProduce: '🌾 माझी पिके व विक्री',
      tabBids: '💰 खरेदीदार ऑफर्स व सौदे',
      tabOrders: '🚚 गाड्या व शेतीमाल वाहतूक',
      tabEscrow: '🛡️ बँक पेमेंट व एस्क्रो',
      tabInsights: '📊 बाजार भाव अंतर्दृष्टी (Market Insights)',

      heroBadge: '🟢 थेट शेतकरी विक्री केंद्र • ०% दलाली',
      heroTitle: '🌾 शेतकरी थेट शेतीमाल विक्री (सुलभ व सोपा बाजार)',
      heroDesc: 'मोठी बटणे दाबा, मराठीत स्पष्ट माहिती ऐका, १-क्लिकमध्ये शेतीमालाची नोंद करा आणि थेट बँक खात्यात १००% खात्रीशीर पैसे मिळवा.',
      voiceBtnTitle: 'बोलून सांगा',
      voiceBtnDesc: '"टोमॅटो विका" / "कांद्याचा भाव"',
      addNewCropBtn: '+ १-क्लिक नवीन पीक विका',
      emergencyBtnTitle: 'आणीबाणी सवलत विक्री',
      emergencyBtnDesc: 'नाशवंत मालाची तत्काळ विक्री',

      catAll: 'सर्व पिके',
      catVeg: 'भाज्या',
      catFruit: 'फळे',
      catGrain: 'धान्य व कडधान्ये',
      catOilseed: 'तेलबिया व मसाले',
      catEmerg: 'सवलत लॉट',

      listen: 'ऐका',
      priceLabel: 'अपेक्षित दर / भाव',
      bestBidLabel: 'सर्वोच्च खरेदीदार बोली',
      qtyLabel: 'उपलब्ध माल (पोती / क्विंटल)',
      bags: 'पोती',
      verifiedBadge: '🛡️ ॲग्रीनेक्स प्रमाणित',
      statusLabel: 'स्थिती',
      callHelpline: '📞 कृषी मित्र हेल्पलाइन',
      editPrice: '✏️ भाव बदला',
      emergencySellBtn: '🚨 तत्काळ विक्री करा',

      bidsTitle: '💰 खरेदीदारांच्या थेट ऑफर्स व बोली',
      bidsSubtitle: 'कंपन्या आणि घाऊक व्यापाऱ्यांच्या ऑफर्स पहा. १-क्लिकमध्ये मान्यता देऊन ३५% सुरक्षित अनामत तत्काळ बँक एस्क्रोमध्ये लॉक करा.',
      listenBids: 'ऑफर्स ऐका',
      acceptBidBtn: '🟢 १-क्लिक ऑफर मान्य करा',
      bargainBidBtn: '🤝 भाव वाढवून मागा (मोलभाव)',
      callBuyerBtn: '📞 खरेदीदारास थेट फोन करा',
      offeredRate: 'खरेदीदाराचा भाव',
      totalPayout: 'एकूण मिळणारी रक्कम',
      advanceLockedBadge: '🔒 ३५% अनामत तयार',

      ordersTitle: '🚚 रस्त्यात असलेल्या गाड्या व वाहतूक',
      ordersSubtitle: 'तुमचा शेतीमाल घेऊन जाणाऱ्या गाड्यांचा थेट जीपीएस पहा आणि १-क्लिकमध्ये थेट ड्रायव्हरशी फोनवर बोला.',
      listenOrders: 'गाडीची स्थिती ऐका',
      callDriverBtn: '📞 ड्रायव्हरला फोन करा',
      driverInfoLabel: 'ड्रायव्हर व गाडी क्रमांक',
      mandiLocationLabel: 'शेत / लोडिंग ठिकाण',
      destinationLabel: 'खरेदीदार गोदाम / टर्मिनल',
      etaLabel: 'पोहोचण्याची वेळ (ETA)',
      onRoad: '🚚 गाडी रस्त्यात आहे (In Transit)',
      delivered: '✅ माल सुखरूप पोहोचला (Delivered)',

      escrowTitle: '🛡️ १००% सुरक्षित बँक पेमेंट व एस्क्रो',
      escrowSubtitle: 'तुमच्या शेतीमालाचे सर्व पैसे शासनाच्या देखरेखीखालील सुरक्षित एस्क्रो खात्यात असतात आणि १-क्लिकमध्ये थेट तुमच्या बँक खात्यात किंवा UPI मध्ये जमा होतात.',
      listenEscrow: 'खात्यातील शिल्लक ऐका',
      totalEarned: 'एकूण शेतीमाल विक्री',
      bankBalance: 'बँक खात्यातील रक्कम',
      lockedEscrow: 'रस्त्यात सुरक्षित (३५% एस्क्रो)',
      readyWithdraw: 'बँकेत काढण्यासाठी उपलब्ध रक्कम',
      withdrawBtn: '💸 १-क्लिक थेट बँकेत पैसे घ्या',
      step1Title: '🔒 ३५% अनामत सुरक्षित',
      step1Desc: 'गाडी भरण्यापूर्वी खरेदीदाराचे ३५% आगाऊ पैसे बँक एस्क्रोमध्ये सुरक्षित राहतात.',
      step2Title: '🚛 वजन व प्रत तपासणी',
      step2Desc: 'गोदामातील इलेक्ट्रॉनिक वजनकाट्यावर वजन व प्रतवारीची डिजिटल पावती बनते.',
      step3Title: '💸 तत्काळ १००% बँक खात्यात जमा',
      step3Desc: 'तपासणी होताच उर्वरित ६५% रक्कम काही मिनिटांत तुमच्या बँक खात्यात वर्ग होते.',

      insightsTitle: '📊 बाजार समिती भाव व AI शेती सल्ला',
      insightsSubtitle: 'बाजार समितीचे भाव आणि थेट शेतकरी भावाची तुलना करा आणि आवाजात सल्ला ऐका की आज पीक विकावे की थांबावे.',
      listenInsights: 'बाजार सल्ला ऐका',
      mandiBenchmarkLabel: 'बाजार समिती भाव',
      farmDirectLabel: 'थेट शेतकरी भाव',
      signalSellText: '🟢 आजच विका (भाव सर्वाधिक आहेत)',
      signalHoldText: '⏳ थांबा / साठवा (भाव वाढण्याची शक्यता)',

      addCropModalTitle: '१-क्लिक नवीन पीक विक्री नोंदणी',
      selectCropLabel: '१. पीक निवडा (टॅप करा):',
      selectQtyLabel: '२. वजन / पोती निवडा:',
      enterRateLabel: '३. अपेक्षित भाव (₹ / क्विंटल):',
      voiceAddBtn: '🎤 बोलून पिकाची माहिती भरा',
      confirmListBtn: '✓ शेतीमाल विक्रीसाठी प्रकाशित करा',
      cancelBtn: '✕ रद्द करा',

      bargainModalTitle: '१-क्लिक भाव वाढवून मागा (Counter-Offer)',
      buyerOfferedRate: 'खरेदीदाराने दिलेला भाव:',
      yourDemandRate: 'तुमची मागणी (नवीन भाव):',
      quickBargainPill: '⚡ १-क्लिक जादा भाव निवडा:',
      sendCounterBtn: '💬 खरेदीदारास नवीन भाव पाठवा',

      withdrawModalTitle: 'थेट बँक खात्यात पैसे घ्या (Instant Payout)',
      withdrawPrompt: 'तुमची विक्री रक्कम तत्काळ तुमच्या बँक खात्यात ट्रान्सफर करा:',
      linkedBank: 'जोडलेले बँक खाते:',
      confirmWithdrawBtn: '💸 पैसे बँकेत ट्रान्सफर करा',

      sunlightMode: 'ऊन मोड (Sunlight)',
      normalMode: 'सामान्य थीम',
      floatingMicText: 'बोलून आदेश द्या'
    },
    ta: {
      toggleSimple: '👴 எளிய முறை (Simple Mode)',
      toggleEnterprise: '⚡ தொழில்முறை (Enterprise)',
      tabProduce: '🌾 என் பயிர்கள் & விற்பனை',
      tabBids: '💰 வாங்குபவர் ஏலங்கள்',
      tabOrders: '🚚 வாகனங்கள் & போக்குவரத்து',
      tabEscrow: '🛡️ வங்கி எஸ்க்ரோ பாதுகாப்பு',
      tabInsights: '📊 சந்தை விலை & வரைபடம் (Market Insights)',
      heroBadge: '🟢 நேரடி விவசாய விற்பனை • 0% தரகு',
      heroTitle: '🌾 விவசாயி நேரடி விற்பனை சந்தை',
      heroDesc: 'எளிதான பொத்தான்கள், தெளிவான குரல் வழிகாட்டல், 1-கிளிக் விற்பனை மற்றும் வங்கிக்கு நேரடி பணம்.',
      voiceBtnTitle: 'குரல் கட்டளை',
      voiceBtnDesc: '"தக்காளி விற்க" / "சந்தை விலை"',
      addNewCropBtn: '+ 1-கிளிக் புதிய பயிர் விற்க',
      emergencyBtnTitle: 'அவசர விற்பனை',
      emergencyBtnDesc: 'அழுகும் பயிர்களுக்கு உடனடி விற்பனை',
      catAll: 'அனைத்து பயிர்கள்',
      catVeg: 'காய்கறிகள்',
      catFruit: 'பழங்கள்',
      catGrain: 'தானியங்கள்',
      catOilseed: 'எண்ணெய் வித்துக்கள்',
      catEmerg: 'அவசர லாட்கள்',
      listen: 'கேட்க',
      priceLabel: 'எதிர்பார்க்கும் விலை',
      bestBidLabel: 'உயர்ந்த வாங்குபவர் விலை',
      qtyLabel: 'இருப்பு அளவு',
      bags: 'மூட்டைகள்',
      verifiedBadge: '🛡️ அக்ரிநெக்ஸ் சரிபார்க்கப்பட்டது',
      statusLabel: 'நிலை',
      callHelpline: '📞 உதவி எண்',
      editPrice: '✏️ விலை மாற்ற',
      emergencySellBtn: '🚨 அவசர விற்பனை',
      bidsTitle: '💰 நேரடி வாங்குபவர் சலுகைகள்',
      bidsSubtitle: 'வாங்குபவர் ஏலங்களை பாருங்கள். 35% முன்பணத்தை உடனே பெற 1-கிளிக்கில் ஏற்கவும்.',
      listenBids: 'ஏலங்களை கேட்க',
      acceptBidBtn: '🟢 1-கிளிக் ஏற்பு',
      bargainBidBtn: '🤝 விலை பேரம்',
      callBuyerBtn: '📞 வாங்குபவரை அழைக்க',
      offeredRate: 'வாங்குபவர் விலை',
      totalPayout: 'மொத்த தொகை',
      advanceLockedBadge: '🔒 35% முன்பணம் தயார்',
      ordersTitle: '🚚 நேரடி ஜிபிஎஸ் வாகன கண்காணிப்பு',
      ordersSubtitle: 'உங்கள் பயிரை ஏற்றிச் செல்லும் லாரியை கண்காணித்து ஓட்டுநருக்கு நேரடியாக அழைக்கவும்.',
      listenOrders: 'நிலவரம் கேட்க',
      callDriverBtn: '📞 ஓட்டுநரை அழைக்க',
      driverInfoLabel: 'ஓட்டுநர் & லாரி எண்',
      mandiLocationLabel: 'ஏற்றுமிடம்',
      destinationLabel: 'சேருமிடம்',
      etaLabel: 'வரும் நேரம் (ETA)',
      onRoad: '🚚 லாரி பயணத்தில் உள்ளது',
      delivered: '✅ பாதுகாப்பாக சேர்ந்தது',
      escrowTitle: '🛡️ 100% பாதுகாப்பான வங்கி எஸ்க்ரோ',
      escrowSubtitle: 'உங்கள் பணம் அரசாங்க கண்காணிப்பில் உள்ள எஸ்க்ரோவில் பாதுகாப்பாக உள்ளது.',
      listenEscrow: 'இருப்பு கேட்க',
      totalEarned: 'மொத்த விற்பனை',
      bankBalance: 'வங்கி இருப்பு',
      lockedEscrow: 'பயணத்தில் உள்ளது (35%)',
      readyWithdraw: 'வங்கியில் எடுக்க தயார்',
      withdrawBtn: '💸 1-கிளிக் வங்கிக்கு மாற்றவும்',
      step1Title: '🔒 35% முன்பணம் பாதுகாப்பு',
      step1Desc: 'வண்டி கிளம்பும் முன் 35% வங்கி எஸ்க்ரோவில் பூட்டப்படும்.',
      step2Title: '🚛 எடை & தரம் சரிபார்ப்பு',
      step2Desc: 'கிடங்கு எடைமேடையில் டிஜிட்டல் ரசீது உருவாக்கப்படும்.',
      step3Title: '💸 உடனடி 100% வங்கி வரவு',
      step3Desc: 'சரிபார்த்தவுடன் மீதித் தொகை உடனடியாக வங்கி கணக்கில் சேரும்.',
      insightsTitle: '📊 மண்டி விலை & AI பயிர் ஆலோசனை',
      insightsSubtitle: 'மண்டி விலைகளை ஒப்பிட்டு AI விற்பனை ஆலோசனையை குரலில் கேட்கவும்.',
      listenInsights: 'ஆலோசனை கேட்க',
      mandiBenchmarkLabel: 'மண்டி விலை',
      farmDirectLabel: 'நேரடி பண்ணை விலை',
      signalSellText: '🟢 இன்றே விற்கவும் (உயர் விலை)',
      signalHoldText: '⏳ காத்திருக்கவும் (விலை உயரும்)',
      addCropModalTitle: '1-கிளிக் புதிய பயிர் விற்பனை',
      selectCropLabel: '1. பயிரை தேர்வு செய்க:',
      selectQtyLabel: '2. அளவை தேர்வு செய்க:',
      enterRateLabel: '3. எதிர்பார்க்கும் விலை (₹/குவிண்டால்):',
      voiceAddBtn: '🎤 குரல் மூலம் விவரம் பதிவு செய்க',
      confirmListBtn: '✓ விற்பனையை உறுதி செய்க',
      cancelBtn: '✕ ரத்து செய்க',
      bargainModalTitle: '1-கிளிக் விலை பேரம்',
      buyerOfferedRate: 'வாங்குபவர் விலை:',
      yourDemandRate: 'உங்கள் புதிய விலை:',
      quickBargainPill: '⚡ கூடுதல் விலையை தேர்வு செய்க:',
      sendCounterBtn: '💬 புதிய விலையை அனுப்பவும்',
      withdrawModalTitle: 'உடனடி வங்கி பரிமாற்றம்',
      withdrawPrompt: 'உங்கள் விற்பனைத் தொகையை உடனடியாக வங்கி கணக்கிற்கு மாற்றவும்:',
      linkedBank: 'இணைக்கப்பட்ட வங்கி கணக்கு:',
      confirmWithdrawBtn: '💸 பணத்தை மாற்றவும்',
      sunlightMode: 'சூரிய ஒளி முறை',
      normalMode: 'வழக்கமான முறை',
      floatingMicText: 'குரல் கட்டளை'
    },
    te: {
      toggleSimple: '👴 సరళ మోడ్ (Simple Mode)',
      toggleEnterprise: '⚡ ఎంటర్‌ప్రైజ్ మోడ్',
      tabProduce: '🌾 నా పంటలు & అమ్మకం',
      tabBids: '💰 కొనుగోలుదారు బిడ్లు',
      tabOrders: '🚚 లారీలు & రవాణా',
      tabEscrow: '🛡️ సురక్షిత బ్యాంక్ ఎస్క్రో',
      tabInsights: '📊 మార్కెట్ ధరలు & గ్రాఫ్ (Market Insights)',
      heroBadge: '🟢 ప్రత్యక్ష రైతు విక్రయం • 0% దళారీ కమీషన్',
      heroTitle: '🌾 రైతు ప్రత్యక్ష విక్రయ మార్కెట్',
      heroDesc: 'పెద్ద బటన్లు, స్పష్టమైన వాయిస్ సలహా, 1-క్లిక్ పంట నమోదు మరియు బ్యాంకుకు ప్రత్యక్ష నగదు బదిలీ.',
      voiceBtnTitle: 'వాయిస్ కమాండ్',
      voiceBtnDesc: '"టమోటా అమ్మండి" / "మార్కెట్ రేటు"',
      addNewCropBtn: '+ 1-క్లిక్ కొత్త పంట అమ్మండి',
      emergencyBtnTitle: 'త్వరిత విక్రయం',
      emergencyBtnDesc: 'పాడయ్యే సరుకు తక్షణ విక్రయం',
      catAll: 'అన్ని పంటలు',
      catVeg: 'కూరగాయలు',
      catFruit: 'పండ్లు',
      catGrain: 'ధాన్యాలు & పప్పులు',
      catOilseed: 'నూనె గింజలు',
      catEmerg: 'త్వరిత లాట్లు',
      listen: 'వినండి',
      priceLabel: 'ఆశించిన ధర',
      bestBidLabel: 'అత్యధిక బిడ్ రేటు',
      qtyLabel: 'అందుబాటులో ఉన్న పరిమాణం',
      bags: 'బస్తాలు',
      verifiedBadge: '🛡️ అగ్రినెక్స్ ధృవీకరించబడింది',
      statusLabel: 'స్థితి',
      callHelpline: '📞 కిసాన్ హెల్ప్‌లైన్',
      editPrice: '✏️ రేటు మార్చండి',
      emergencySellBtn: '🚨 తక్షణ విక్రయం',
      bidsTitle: '💰 కొనుగోలుదారుల ప్రత్యక్ష ఆఫర్లు',
      bidsSubtitle: 'బిడ్లను చూడండి. 35% ముందస్తు నగదును లాక్ చేయడానికి 1-క్లిక్‌తో ఆమోదించండి.',
      listenBids: 'ఆఫర్లను వినండి',
      acceptBidBtn: '🟢 1-క్లిక్ ఆమోదం',
      bargainBidBtn: '🤝 బేరం ఆడండి',
      callBuyerBtn: '📞 కొనుగోలుదారుకు కాల్ చేయండి',
      offeredRate: 'కొనుగోలుదారు రేటు',
      totalPayout: 'మొత్తం చెల్లింపు',
      advanceLockedBadge: '🔒 35% ముందస్తు సిద్ధం',
      ordersTitle: '🚚 లైవ్ జీపీఎస్ వాహన రవాణా',
      ordersSubtitle: 'మీ సరుకు తీసుకెళ్లే లారీని లైవ్ జీపీఎస్‌లో చూసి డ్రైవర్‌తో నేరుగా మాట్లాడండి.',
      listenOrders: 'స్థితిని వినండి',
      callDriverBtn: '📞 డ్రైవర్‌కు కాల్ చేయండి',
      driverInfoLabel: 'డ్రైవర్ & వాహనం నంబర్',
      mandiLocationLabel: 'లోడింగ్ ప్రాంతం',
      destinationLabel: 'చేరవలసిన గిడ్డంగి',
      etaLabel: 'చేరే సమయం (ETA)',
      onRoad: '🚚 లారీ మార్గంలో ఉంది',
      delivered: '✅ సురక్షితంగా చేరింది',
      escrowTitle: '🛡️ 100% సురక్షిత బ్యాంక్ ఎస్క్రో',
      escrowSubtitle: 'మీ మొత్తం సొమ్ము ప్రభుత్వ పర్యవేక్షణలోని ఎస్క్రో ఖాతాలో సురక్షితంగా ఉంటుంది.',
      listenEscrow: 'బ్యాలెన్స్ వినండి',
      totalEarned: 'మొత్తం పంట అమ్మకాలు',
      bankBalance: 'బ్యాంక్ బ్యాలెన్స్',
      lockedEscrow: 'రవాణాలో రక్షణ (35%)',
      readyWithdraw: 'బ్యాంకులోకి తీసుకోవడానికి సిద్ధం',
      withdrawBtn: '💸 1-క్లిక్ బ్యాంక్ బదిలీ',
      step1Title: '🔒 35% ముందస్తు భద్రత',
      step1Desc: 'లారీ బయలుదేరే ముందే 35% బ్యాంక్ ఎస్క్రోలో లాక్ అవుతుంది.',
      step2Title: '🚛 బరువు & నాణ్యత తనిఖీ',
      step2Desc: 'గిడ్డంగి వద్ద డిజిటల్ వేబిల్ మరియు నాణ్యత రశీదు రూపొందుతుంది.',
      step3Title: '💸 తక్షణ 100% బ్యాంక్ చెల్లింపు',
      step3Desc: 'తనిఖీ ముగియగానే మిగిలిన సొమ్ము నేరుగా మీ ఖాతాలో జమ అవుతుంది.',
      insightsTitle: '📊 మార్కెట్ యార్డ్ ధరలు & AI సలహా',
      insightsSubtitle: 'మార్కెట్ ధరలతో సరిపోల్చి పంట అమ్మాలా వద్దా అని వాయిస్ సలహా వినండి.',
      listenInsights: 'సలహాను వినండి',
      mandiBenchmarkLabel: 'మార్కెట్ యార్డ్ ధర',
      farmDirectLabel: 'ప్రత్యక్ష రైతు ధర',
      signalSellText: '🟢 ఈరోజే అమ్మండి (గరిష్ట ధర)',
      signalHoldText: '⏳ వేచి ఉండండి (ధర పెరిగే అవకాశం)',
      addCropModalTitle: '1-క్లిక్ కొత్త పంట నమోదు',
      selectCropLabel: '1. పంటను ఎంచుకోండి:',
      selectQtyLabel: '2. పరిమాణాన్ని ఎంచుకోండి:',
      enterRateLabel: '3. ఆశించిన ధర (₹/క్వింటాల్):',
      voiceAddBtn: '🎤 వాయిస్ ద్వారా వివరాలు నమోదు చేయండి',
      confirmListBtn: '✓ పంట విక్రయాన్ని ప్రచురించండి',
      cancelBtn: '✕ రద్దు చేయండి',
      bargainModalTitle: '1-క్లిక్ ధర బేరం (Counter-Offer)',
      buyerOfferedRate: 'కొనుగోలుదారు రేటు:',
      yourDemandRate: 'మీ నూతన ధర డిమాండ్:',
      quickBargainPill: '⚡ అదనపు ధరను ఎంచుకోండి:',
      sendCounterBtn: '💬 నూతన ధరను పంపండి',
      withdrawModalTitle: 'తక్షణ బ్యాంక్ చెల్లింపు',
      withdrawPrompt: 'మీ విక్రయ సొమ్మును నేరుగా మీ బ్యాంకు ఖాతాలోకి బదిలీ చేసుకోండి:',
      linkedBank: 'లింక్ చేయబడిన బ్యాంక్ ఖాతా:',
      confirmWithdrawBtn: '💸 బ్యాంకులోకి బదిలీ చేయండి',
      sunlightMode: 'ఎండ మోడ్ (Sunlight)',
      normalMode: 'సాధారణ మోడ్',
      floatingMicText: 'వాయిస్ కమాండ్'
    }
  };

  // Pre-configured popular crops for 1-Tap Quick Add Crop
  const POPULAR_CROPS = [
    { key: 'Tomato', name: 'Tomato (टोमॅटो)', image: 'assets/images/tomato.jpg', defRate: 1300, cat: 'Vegetables' },
    { key: 'Onion', name: 'Red Onion (कांदा)', image: 'assets/images/onion.jpg', defRate: 1800, cat: 'Vegetables' },
    { key: 'Soybean', name: 'Soybean (सोयाबीन)', image: 'assets/images/soybean.jpg', defRate: 4200, cat: 'Grains & Cereals' },
    { key: 'Cotton', name: 'Cotton (कापूस)', image: 'assets/images/cotton.jpg', defRate: 6200, cat: 'Oilseeds' },
    { key: 'Wheat', name: 'Wheat (गहू)', image: 'assets/images/wheat.jpg', defRate: 2850, cat: 'Grains & Cereals' },
    { key: 'Rice', name: 'Kolam Rice (तांदूळ)', image: 'assets/images/rice.jpg', defRate: 4800, cat: 'Grains & Cereals' },
    { key: 'Pomegranate', name: 'Pomegranate (डाळिंब)', image: 'assets/images/pomegranate.jpg', defRate: 8800, cat: 'Fruits' },
    { key: 'Banana', name: 'Banana (केळी)', image: 'assets/images/banana.jpg', defRate: 1600, cat: 'Fruits' },
    { key: 'Grapes', name: 'Grapes (द्राक्षे)', image: 'assets/images/grapes.jpg', defRate: 6500, cat: 'Fruits' },
    { key: 'Potato', name: 'Potato (बटाटा)', image: 'assets/images/potato.jpg', defRate: 1500, cat: 'Vegetables' },
    { key: 'Chilli', name: 'Dry Chilli (मिरची)', image: 'assets/images/chilli.jpg', defRate: 18000, cat: 'Spices' },
    { key: 'Turmeric', name: 'Turmeric (हळद)', image: 'assets/images/turmeric.jpg', defRate: 13500, cat: 'Spices' },
    { key: 'Sugarcane', name: 'Sugarcane (ऊस)', image: 'assets/images/sugarcane.jpg', defRate: 340, cat: 'Cash Crops' },
    { key: 'Groundnut', name: 'Groundnut (भुईमूग)', image: 'assets/images/groundnut.jpg', defRate: 6800, cat: 'Oilseeds' }
  ];

  // Helper to get active language
  function getCurrentLang() {
    return localStorage.getItem('agrinex_farmer_language') || 'mr';
  }

  function getDict() {
    const lang = getCurrentLang();
    return LITE_I18N[lang] || LITE_I18N.mr || LITE_I18N.en;
  }

  // Native & Sarvam Speech Synthesis
  let currentUtterance = null;

  async function speakText(text, langCode) {
    if (!langCode) langCode = getCurrentLang();

    // Cancel any active speech
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }

    // Try Sarvam AI Bulbul TTS if available via API
    try {
      const resp = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: text,
          language_code: langCode,
          speaker: 'priya'
        })
      });

      if (resp.ok) {
        const resData = await resp.json();
        if (resData.success && resData.audio_base64) {
          const snd = new Audio(`data:${resData.format || 'audio/wav'};base64,${resData.audio_base64}`);
          snd.playbackRate = currentSpeechRate;
          snd.play();
          return;
        }
      }
    } catch (e) {
      // Fallback to browser Web Speech API
    }

    if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(text);
      const voiceLangMap = {
        'hi': 'hi-IN',
        'mr': 'mr-IN',
        'ta': 'ta-IN',
        'te': 'te-IN',
        'en': 'en-IN'
      };
      utter.lang = voiceLangMap[langCode] || 'mr-IN';
      utter.rate = currentSpeechRate;
      utter.pitch = 1.0;
      currentUtterance = utter;
      window.speechSynthesis.speak(utter);
    }
  }

  // Init Simple Mode DOM and Container
  function initFarmerLiteMode() {
    // 1. Inject Simple Mode Container if not already in DOM
    let container = document.getElementById('lite-mode-container');
    if (!container) {
      const mainWrapper = document.querySelector('.main-wrapper') || document.querySelector('.app-container') || document.body;
      container = document.createElement('div');
      container.id = 'lite-mode-container';
      container.className = 'lite-mode-wrapper';
      mainWrapper.appendChild(container);
    }

    // 2. Inject Floating Voice Mic Button if not in DOM
    if (!document.getElementById('lite-floating-voice-mic')) {
      const micBtn = document.createElement('button');
      micBtn.id = 'lite-floating-voice-mic';
      micBtn.className = 'lite-floating-mic';
      micBtn.setAttribute('type', 'button');
      micBtn.innerHTML = `
        <span style="font-size: 1.4rem;">🎙️</span>
        <span id="lite-floating-mic-label">${getDict().floatingMicText}</span>
      `;
      micBtn.onclick = startFarmerFloatingVoiceCommand;
      document.body.appendChild(micBtn);
    }

    // 3. Inject Modals for Simple Mode
    injectFarmerLiteModals();

    // 4. Inject Simple Mode Toggle Button into Navbar if missing
    injectNavbarToggle();

    // 5. Apply saved states
    setFarmerLiteSpeechRate(currentSpeechRate, false);
    setFarmerLiteFontSize(currentFontSize);
    if (isSunlightMode) {
      document.body.classList.add('lite-sunlight-mode');
    }

    // 6. Check initial mode state
    applyFarmerLiteModeUI(isLiteMode);

    // 7. Listen for global language change
    window.addEventListener('agrinex_language_changed', function (e) {
      const newLang = e.detail ? e.detail.lang : getCurrentLang();
      updateFarmerLiteLanguage(newLang);
    });
  }

  function injectNavbarToggle() {
    const navbarRight = document.querySelector('.navbar-right') || document.querySelector('.top-navbar');
    if (navbarRight && !document.getElementById('btn-toggle-lite-mode')) {
      const toggleBtn = document.createElement('button');
      toggleBtn.type = 'button';
      toggleBtn.id = 'btn-toggle-lite-mode';
      toggleBtn.className = 'btn-toggle-lite-mode';
      toggleBtn.onclick = toggleFarmerLiteMode;
      toggleBtn.style.cssText = `
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: linear-gradient(135deg, #15803d 0%, #0c5a36 100%);
        color: #ffffff;
        font-weight: 800;
        font-size: 0.85rem;
        padding: 8px 16px;
        border-radius: 999px;
        border: 2px solid #86efac;
        box-shadow: 0 4px 12px rgba(12, 90, 54, 0.25);
        cursor: pointer;
        transition: all 0.2s ease;
      `;
      updateToggleBtnState(toggleBtn);
      navbarRight.insertBefore(toggleBtn, navbarRight.firstChild);
    }
  }

  function updateToggleBtnState(btn) {
    if (!btn) btn = document.getElementById('btn-toggle-lite-mode');
    if (!btn) return;
    const dict = getDict();
    if (isLiteMode) {
      btn.innerHTML = `<span>⚡</span> <span>${dict.toggleEnterprise}</span>`;
      btn.style.background = 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)';
      btn.style.borderColor = '#94a3b8';
    } else {
      btn.innerHTML = `<span>👴</span> <span>${dict.toggleSimple}</span>`;
      btn.style.background = 'linear-gradient(135deg, #15803d 0%, #0c5a36 100%)';
      btn.style.borderColor = '#86efac';
    }
  }

  function applyFarmerLiteModeUI(active) {
    document.documentElement.classList.toggle('lite-mode-active', active);
    document.body.classList.toggle('lite-mode-active', active);

    const toggleBtn = document.getElementById('btn-toggle-lite-mode');
    if (toggleBtn) updateToggleBtnState(toggleBtn);

    const container = document.getElementById('lite-mode-container');
    const micBtn = document.getElementById('lite-floating-voice-mic');

    if (active) {
      if (container) container.style.display = 'block';
      if (micBtn) micBtn.style.display = 'flex';
      renderFarmerLiteInterface();
    } else {
      if (container) container.style.display = 'none';
      if (micBtn) micBtn.style.display = 'none';
    }
  }

  function toggleFarmerLiteMode() {
    isLiteMode = !isLiteMode;
    localStorage.setItem('agrinex_farmer_lite_mode', isLiteMode ? 'true' : 'false');
    applyFarmerLiteModeUI(isLiteMode);

    if (isLiteMode) {
      const lang = getCurrentLang();
      if (lang === 'hi') {
        speakText("सरल किसान मोड चालू हो गया है। आवाज सुनने के लिए स्पीकर बटन दबाएं।", "hi");
      } else if (lang === 'mr') {
        speakText("सरल शेतकरी मोड चालू झाला आहे. शेतीमालाची माहिती ऐकण्यासाठी स्पीकर बटण दाबा.", "mr");
      } else {
        speakText("Farmer Simple Mode activated. Tap the speaker icon to listen.", "en");
      }
    }
  }

  // Accessibility Functions
  function setFarmerLiteSpeechRate(rate, announce = true) {
    currentSpeechRate = rate;
    localStorage.setItem('agrinex_farmer_lite_speech_rate', rate);

    const btnSlow = document.getElementById('btn-speed-slow');
    const btnNormal = document.getElementById('btn-speed-normal');
    if (btnSlow && btnNormal) {
      btnSlow.style.background = (rate < 0.95) ? '#0c5a36' : 'transparent';
      btnSlow.style.color = (rate < 0.95) ? '#ffffff' : '#475569';
      btnNormal.style.background = (rate >= 0.95) ? '#0c5a36' : 'transparent';
      btnNormal.style.color = (rate >= 0.95) ? '#ffffff' : '#475569';
    }

    if (announce && isLiteMode) {
      const lang = getCurrentLang();
      const msg = (rate < 0.95)
        ? (lang === 'mr' ? 'आवाजाचा वेग मंद केला आहे.' : (lang === 'hi' ? 'आवाज़ की गति धीमी कर दी गई है।' : 'Speech rate set to slow.'))
        : (lang === 'mr' ? 'आवाजाचा वेग सामान्य केला आहे.' : (lang === 'hi' ? 'आवाज़ की गति सामान्य कर दी गई है।' : 'Speech rate set to normal.'));
      speakText(msg, lang);
    }
  }

  function setFarmerLiteFontSize(size) {
    currentFontSize = size;
    localStorage.setItem('agrinex_farmer_lite_font_size', size);

    const wrapper = document.getElementById('lite-mode-container');
    if (wrapper) {
      wrapper.classList.remove('lite-font-lg', 'lite-font-xl');
      if (size === 'lg') wrapper.classList.add('lite-font-lg');
      if (size === 'xl') wrapper.classList.add('lite-font-xl');
    }

    const btnMd = document.getElementById('btn-font-md');
    const btnLg = document.getElementById('btn-font-lg');
    if (btnMd) {
      btnMd.style.background = (size === 'md') ? '#0c5a36' : 'transparent';
      btnMd.style.color = (size === 'md') ? '#ffffff' : '#475569';
    }
    if (btnLg) {
      btnLg.style.background = (size === 'lg' || size === 'xl') ? '#0c5a36' : 'transparent';
      btnLg.style.color = (size === 'lg' || size === 'xl') ? '#ffffff' : '#475569';
    }
  }

  function toggleFarmerSunlightMode() {
    isSunlightMode = !isSunlightMode;
    localStorage.setItem('agrinex_farmer_lite_sunlight_mode', isSunlightMode ? 'true' : 'false');
    document.body.classList.toggle('lite-sunlight-mode', isSunlightMode);

    const dict = getDict();
    const txt = document.getElementById('lite-sunlight-text');
    if (txt) {
      txt.textContent = isSunlightMode ? dict.normalMode : dict.sunlightMode;
    }
  }

  function setFarmerLanguage(lang) {
    localStorage.setItem('agrinex_farmer_language', lang);
    if (window.setFarmerLanguageGlobal) {
      window.setFarmerLanguageGlobal(lang);
    }
    updateFarmerLiteLanguage(lang);
    window.dispatchEvent(new CustomEvent('agrinex_language_changed', { detail: { lang } }));
  }

  function updateFarmerLiteLanguage(lang) {
    renderFarmerLiteInterface();
  }

  // Switch Sections
  function switchFarmerLiteSection(sec) {
    activeLiteSection = sec;
    renderFarmerLiteInterface();
    if (sec === 'insights') {
      ensureChartJs(() => {
        initLiteMarketChart();
      });
    }
  }

  // Main Render of Simple Mode UI
  function renderFarmerLiteInterface() {
    const container = document.getElementById('lite-mode-container');
    if (!container) return;

    const dict = getDict();
    const currentLang = getCurrentLang();

    container.innerHTML = `
      <!-- 1. Top Accessibility & Language Controls Bar -->
      <div class="lite-accessibility-bar" style="display: flex; justify-content: space-between; align-items: center; background: #ffffff; border: 2px solid #e2e8f0; border-radius: 16px; padding: 10px 18px; margin-bottom: 18px; box-shadow: 0 4px 12px rgba(0,0,0,0.04); flex-wrap: wrap; gap: 10px;">
        
        <!-- Language Switcher Pills -->
        <div style="display: flex; align-items: center; gap: 6px;">
          <span style="font-size: 0.8rem; font-weight: 800; color: #64748b;">🌐 भाषा:</span>
          <button type="button" onclick="setFarmerLiteLang('mr')" class="lite-pill-btn ${currentLang === 'mr' ? 'active' : ''}">🚩 मराठी</button>
          <button type="button" onclick="setFarmerLiteLang('hi')" class="lite-pill-btn ${currentLang === 'hi' ? 'active' : ''}">🇮🇳 हिन्दी</button>
          <button type="button" onclick="setFarmerLiteLang('en')" class="lite-pill-btn ${currentLang === 'en' ? 'active' : ''}">🇬🇧 English</button>
          <button type="button" onclick="setFarmerLiteLang('ta')" class="lite-pill-btn ${currentLang === 'ta' ? 'active' : ''}">தமிழ்</button>
          <button type="button" onclick="setFarmerLiteLang('te')" class="lite-pill-btn ${currentLang === 'te' ? 'active' : ''}">తెలుగు</button>
        </div>

        <!-- Audio Speed, Font Size & Sunlight Theme -->
        <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 4px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 10px; padding: 3px 6px;">
            <span style="font-size: 0.76rem; font-weight: 800; color: #475569;">🔊 वेग:</span>
            <button type="button" id="btn-speed-slow" onclick="setFarmerLiteSpeechRate(0.8)" style="border: none; background: ${currentSpeechRate < 0.95 ? '#0c5a36' : 'transparent'}; color: ${currentSpeechRate < 0.95 ? '#ffffff' : '#475569'}; border-radius: 6px; padding: 3px 8px; font-weight: 800; font-size: 0.76rem; cursor: pointer;">मंद (0.8x)</button>
            <button type="button" id="btn-speed-normal" onclick="setFarmerLiteSpeechRate(1.0)" style="border: none; background: ${currentSpeechRate >= 0.95 ? '#0c5a36' : 'transparent'}; color: ${currentSpeechRate >= 0.95 ? '#ffffff' : '#475569'}; border-radius: 6px; padding: 3px 8px; font-weight: 800; font-size: 0.76rem; cursor: pointer;">सामान्य (1x)</button>
          </div>

          <div style="display: flex; align-items: center; gap: 4px; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 10px; padding: 3px 6px;">
            <span style="font-size: 0.76rem; font-weight: 800; color: #475569;">🔍 अक्षर:</span>
            <button type="button" id="btn-font-md" onclick="setFarmerLiteFontSize('md')" style="border: none; background: ${currentFontSize === 'md' ? '#0c5a36' : 'transparent'}; color: ${currentFontSize === 'md' ? '#ffffff' : '#475569'}; border-radius: 6px; padding: 3px 8px; font-weight: 800; font-size: 0.76rem; cursor: pointer;">A (मध्यम)</button>
            <button type="button" id="btn-font-lg" onclick="setFarmerLiteFontSize('lg')" style="border: none; background: ${currentFontSize !== 'md' ? '#0c5a36' : 'transparent'}; color: ${currentFontSize !== 'md' ? '#ffffff' : '#475569'}; border-radius: 6px; padding: 3px 8px; font-weight: 800; font-size: 0.76rem; cursor: pointer;">A+ (मोठे)</button>
          </div>

          <button type="button" onclick="toggleFarmerSunlightMode()" style="display: flex; align-items: center; gap: 6px; background: #fef08a; color: #713f12; border: 1.5px solid #ca8a04; border-radius: 10px; padding: 5px 12px; font-weight: 800; font-size: 0.78rem; cursor: pointer;">
            <span>☀️</span>
            <span id="lite-sunlight-text">${isSunlightMode ? dict.normalMode : dict.sunlightMode}</span>
          </button>

          <a href="tel:18002474639" style="display: flex; align-items: center; gap: 6px; background: #f0fdf4; color: #166534; border: 1.5px solid #86efac; border-radius: 10px; padding: 5px 12px; font-weight: 800; font-size: 0.78rem; text-decoration: none;">
            <span>📞</span>
            <span>1800-AGRI-NEX</span>
          </a>
        </div>
      </div>

      <!-- 2. Top Large Navigation Tabs (Produce, Bids, Orders, Escrow, Insights) -->
      <div class="lite-nav-tabs-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; margin-bottom: 20px;">
        <button type="button" class="lite-nav-tab ${activeLiteSection === 'produce' ? 'active' : ''}" onclick="switchFarmerLiteSection('produce')">
          <span style="font-size: 1.5rem;">🌾</span>
          <span>${dict.tabProduce}</span>
        </button>
        <button type="button" class="lite-nav-tab ${activeLiteSection === 'bids' ? 'active' : ''}" onclick="switchFarmerLiteSection('bids')">
          <span style="font-size: 1.5rem;">💰</span>
          <span>${dict.tabBids}</span>
          <span style="background: #ef4444; color: #ffffff; font-size: 0.72rem; padding: 1px 7px; border-radius: 999px; font-weight: 900; margin-left: 4px;">5</span>
        </button>
        <button type="button" class="lite-nav-tab" onclick="window.location.href='messages.html'" style="border-color: #86efac; background: #f0fdf4;">
          <span style="font-size: 1.5rem;">💬</span>
          <span>${currentLang === 'mr' ? 'खरेदीदार चॅट' : (currentLang === 'hi' ? 'व्यापारी चैट' : 'Buyer Chat')}</span>
          <span style="background: #16a34a; color: #ffffff; font-size: 0.72rem; padding: 1px 7px; border-radius: 999px; font-weight: 900; margin-left: 4px;">3</span>
        </button>
        <button type="button" class="lite-nav-tab ${activeLiteSection === 'orders' ? 'active' : ''}" onclick="switchFarmerLiteSection('orders')">
          <span style="font-size: 1.5rem;">🚚</span>
          <span>${dict.tabOrders}</span>
        </button>
        <button type="button" class="lite-nav-tab ${activeLiteSection === 'escrow' ? 'active' : ''}" onclick="switchFarmerLiteSection('escrow')">
          <span style="font-size: 1.5rem;">🛡️</span>
          <span>${dict.tabEscrow}</span>
        </button>
        <button type="button" class="lite-nav-tab ${activeLiteSection === 'insights' ? 'active' : ''}" onclick="switchFarmerLiteSection('insights')">
          <span style="font-size: 1.5rem;">📊</span>
          <span>${dict.tabInsights}</span>
        </button>
      </div>

      <!-- 3. Section View Content -->
      <div id="lite-active-section-body">
        ${renderActiveSectionContent(dict, currentLang)}
      </div>
    `;

    // Apply font sizing classes to container
    setFarmerLiteFontSize(currentFontSize);

    // Initialize Market Insights Chart if active
    if (activeLiteSection === 'insights') {
      setTimeout(() => {
        ensureChartJs(() => {
          initLiteMarketChart();
        });
      }, 40);
    }
  }

  function renderActiveSectionContent(dict, currentLang) {
    if (activeLiteSection === 'produce') {
      return renderProduceSectionHTML(dict, currentLang);
    } else if (activeLiteSection === 'bids') {
      return renderBidsSectionHTML(dict, currentLang);
    } else if (activeLiteSection === 'orders') {
      return renderOrdersSectionHTML(dict, currentLang);
    } else if (activeLiteSection === 'escrow') {
      return renderEscrowSectionHTML(dict, currentLang);
    } else if (activeLiteSection === 'insights') {
      return renderInsightsSectionHTML(dict, currentLang);
    }
    return '';
  }

  // ==========================================
  // SECTION 1: MY CROPS & SELL PRODUCE
  // ==========================================
  function renderProduceSectionHTML(dict, currentLang) {
    const listings = (window.farmerData && window.farmerData.listings) ? window.farmerData.listings : [];

    const filtered = listings.filter(item => {
      if (activeLiteFilter === 'all') return true;
      if (activeLiteFilter === 'veg') return item.category && item.category.toLowerCase().includes('veg');
      if (activeLiteFilter === 'fruit') return item.category && item.category.toLowerCase().includes('fruit');
      if (activeLiteFilter === 'grain') return item.category && (item.category.toLowerCase().includes('grain') || item.category.toLowerCase().includes('pulse') || item.category.toLowerCase().includes('cereal'));
      if (activeLiteFilter === 'oilseed') return item.category && (item.category.toLowerCase().includes('oil') || item.category.toLowerCase().includes('spice'));
      if (activeLiteFilter === 'emerg') return item.shelfLife && item.shelfLife.toLowerCase().includes('perishable');
      return true;
    });

    return `
      <!-- Hero Banner -->
      <div class="lite-hero-card" style="background: linear-gradient(135deg, #0c5a36 0%, #064e3b 100%); border-radius: 20px; padding: 24px; color: #ffffff; margin-bottom: 20px; box-shadow: 0 8px 24px rgba(12, 90, 54, 0.25); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <div style="flex: 1; min-width: 280px;">
          <span style="background: #facc15; color: #000000; font-size: 0.8rem; font-weight: 900; padding: 4px 12px; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.5px; display: inline-block; margin-bottom: 10px;">${dict.heroBadge}</span>
          <h2 style="font-size: 1.65rem; font-weight: 900; margin: 0 0 6px 0; color: #ffffff;">${dict.heroTitle}</h2>
          <p style="font-size: 0.95rem; color: #bbf7d0; margin: 0; line-height: 1.4;">${dict.heroDesc}</p>
        </div>

        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <button type="button" onclick="openFarmerLiteAddCropModal()" style="background: #22c55e; color: #ffffff; border: 2px solid #86efac; border-radius: 14px; padding: 14px 20px; font-weight: 900; font-size: 1.05rem; cursor: pointer; box-shadow: 0 4px 16px rgba(34, 197, 94, 0.4); display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 1.3rem;">➕</span>
            <span>${dict.addNewCropBtn}</span>
          </button>
          <button type="button" onclick="openFarmerLiteVoiceSearch()" style="background: #ffffff; color: #0c5a36; border: 2px solid #bbf7d0; border-radius: 14px; padding: 12px 18px; font-weight: 800; font-size: 0.95rem; cursor: pointer; display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 1.2rem;">🎙️</span>
            <span>${dict.voiceBtnTitle}</span>
          </button>
        </div>
      </div>

      <!-- Filter Category Buttons -->
      <div class="lite-cat-pills-row" style="display: flex; gap: 8px; margin-bottom: 18px; overflow-x: auto; padding-bottom: 4px;">
        <button type="button" class="lite-cat-pill ${activeLiteFilter === 'all' ? 'active' : ''}" onclick="filterFarmerProduce('all')">${dict.catAll} (${listings.length})</button>
        <button type="button" class="lite-cat-pill ${activeLiteFilter === 'veg' ? 'active' : ''}" onclick="filterFarmerProduce('veg')">🥬 ${dict.catVeg}</button>
        <button type="button" class="lite-cat-pill ${activeLiteFilter === 'fruit' ? 'active' : ''}" onclick="filterFarmerProduce('fruit')">🍎 ${dict.catFruit}</button>
        <button type="button" class="lite-cat-pill ${activeLiteFilter === 'grain' ? 'active' : ''}" onclick="filterFarmerProduce('grain')">🌾 ${dict.catGrain}</button>
        <button type="button" class="lite-cat-pill ${activeLiteFilter === 'oilseed' ? 'active' : ''}" onclick="filterFarmerProduce('oilseed')">🌻 ${dict.catOilseed}</button>
        <button type="button" class="lite-cat-pill ${activeLiteFilter === 'emerg' ? 'active' : ''}" onclick="filterFarmerProduce('emerg')">🚨 ${dict.catEmerg}</button>
      </div>

      <!-- Produce Lots Grid -->
      <div class="lite-produce-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 18px;">
        ${filtered.map(lot => renderFarmerProduceCardHTML(lot, dict, currentLang)).join('')}
      </div>
    `;
  }

  function renderFarmerProduceCardHTML(lot, dict, currentLang) {
    const speechText = (currentLang === 'mr')
      ? `${lot.crop}, शिल्लक वजन ${lot.quantity}, अपेक्षित भाव ${lot.expectedPrice}, सर्वोच्च खरेदीदार बोली ${lot.bestBid || 'अजून नाही'}. माहितीसाठी टॅप करा.`
      : (currentLang === 'hi')
      ? `${lot.crop}, उपलब्ध मात्रा ${lot.quantity}, अपेक्षित भाव ${lot.expectedPrice}, उच्चतम बोली ${lot.bestBid || 'उपलब्ध नहीं'}.`
      : `${lot.crop}, lot quantity ${lot.quantity}, expected rate ${lot.expectedPrice}, highest buyer bid ${lot.bestBid || 'None yet'}.`;

    return `
      <div class="lite-produce-card" style="background: #ffffff; border: 2.5px solid #e2e8f0; border-radius: 20px; overflow: hidden; box-shadow: 0 6px 18px rgba(0,0,0,0.06); display: flex; flex-direction: column; transition: all 0.2s;">
        <!-- Top Image with Badges -->
        <div style="position: relative; height: 180px; width: 100%; background: #f1f5f9; overflow: hidden;">
          <img src="${lot.image}" alt="${lot.crop}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='assets/images/tomato.jpg'" />
          <span style="position: absolute; top: 12px; left: 12px; background: #0c5a36; color: #ffffff; font-weight: 800; font-size: 0.78rem; padding: 4px 10px; border-radius: 999px; box-shadow: 0 2px 8px rgba(0,0,0,0.2);">${lot.grade || 'Grade A'}</span>
          <span style="position: absolute; top: 12px; right: 12px; background: rgba(15, 23, 42, 0.85); color: #ffffff; font-weight: 800; font-size: 0.74rem; padding: 4px 10px; border-radius: 999px;">ID: ${lot.id}</span>
        </div>

        <!-- Card Content Body -->
        <div style="padding: 16px; flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
              <h3 style="font-size: 1.25rem; font-weight: 900; color: #0f172a; margin: 0; line-height: 1.3;">${lot.crop}</h3>
              <button type="button" class="lite-audio-btn" onclick="speakText('${speechText.replace(/'/g, "\\'")}', '${currentLang}')" title="Listen Audio" style="background: #e8f5ed; border: 1.5px solid #bbf7d0; color: #0c5a36; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; cursor: pointer; flex-shrink: 0;">
                🔊
              </button>
            </div>

            <!-- Price & Quantity Matrix -->
            <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 12px; margin-bottom: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span style="font-size: 0.82rem; font-weight: 700; color: #64748b;">${dict.priceLabel}:</span>
                <strong style="font-size: 1.15rem; font-weight: 900; color: #0c5a36;">${lot.expectedPrice}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <span style="font-size: 0.82rem; font-weight: 700; color: #64748b;">${dict.qtyLabel}:</span>
                <strong style="font-size: 1.05rem; font-weight: 800; color: #0f172a;">${lot.quantity}</strong>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 6px; border-top: 1px dashed #cbd5e1;">
                <span style="font-size: 0.82rem; font-weight: 700; color: #0284c7;">${dict.bestBidLabel}:</span>
                <strong style="font-size: 1.1rem; font-weight: 900; color: #0284c7;">${lot.bestBid || '₹ 0'}</strong>
              </div>
            </div>

            <div style="font-size: 0.78rem; color: #64748b; margin-bottom: 14px; display: flex; align-items: center; gap: 6px;">
              <span>📍</span> <span>${lot.location || 'Lasalgaon Mandi Yard, Nashik'}</span>
            </div>
          </div>

          <!-- Bottom Actions -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <button type="button" onclick="openFarmerLiteBidsForLot('${lot.id}')" style="background: #0c5a36; color: #ffffff; border: none; border-radius: 12px; padding: 10px; font-weight: 800; font-size: 0.9rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;">
              <span>💰</span> <span>${dict.tabBids}</span>
            </button>
            <button type="button" onclick="openEmergencyModal('${lot.id}')" style="background: #fee2e2; color: #991b1b; border: 1.5px solid #fca5a5; border-radius: 12px; padding: 10px; font-weight: 800; font-size: 0.82rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 4px;">
              <span>🚨</span> <span>${dict.emergencySellBtn}</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================
  // SECTION 2: BUYER BIDS & OFFERS
  // ==========================================
  function renderBidsSectionHTML(dict, currentLang) {
    const bidsList = [
      {
        id: 'BID-881',
        crop: 'Tomato (Shivam / Abhinav Hybrid)',
        image: 'assets/images/tomato.jpg',
        buyer: 'Reliance Fresh Supply Chain',
        location: 'Mumbai Central Hub',
        qty: '60 Qt (6,000 kg)',
        offeredRate: '₹ 1,391 / Qt (₹ 13.91 / kg)',
        offeredRateNum: 1391,
        origRate: '₹ 1,300 / Qt',
        totalAmt: '₹ 83,460',
        advanceDeposit: '₹ 29,211 (35% Escrow)',
        status: 'Active'
      },
      {
        id: 'BID-882',
        crop: 'Yellow Soybean (JS 335)',
        image: 'assets/images/soybean.jpg',
        buyer: 'DMart Wholesale (Avenue Supermarts)',
        location: 'Latur Mega APMC Yard',
        qty: '150 Qt (15,000 kg)',
        offeredRate: '₹ 4,662 / Qt (₹ 46.62 / kg)',
        offeredRateNum: 4662,
        origRate: '₹ 4,200 / Qt',
        totalAmt: '₹ 6,99,300',
        advanceDeposit: '₹ 2,44,755 (35% Escrow)',
        status: 'Active'
      },
      {
        id: 'BID-883',
        crop: 'Bhagwa Pomegranate (Solapur)',
        image: 'assets/images/pomegranate.jpg',
        buyer: 'LuLu Hypermarket Gulf Supply',
        location: 'Solapur Terminal Yard',
        qty: '40 Qt (4,000 kg)',
        offeredRate: '₹ 9,592 / Qt (₹ 95.92 / kg)',
        offeredRateNum: 9592,
        origRate: '₹ 8,800 / Qt',
        totalAmt: '₹ 3,83,680',
        advanceDeposit: '₹ 1,34,288 (35% Escrow)',
        status: 'Active'
      },
      {
        id: 'BID-884',
        crop: 'Sharbati Lokwan Golden Wheat',
        image: 'assets/images/wheat.jpg',
        buyer: 'ITC Agri-Business Division',
        location: 'Niphad Mandi Yard',
        qty: '200 Qt (20,000 kg)',
        offeredRate: '₹ 3,164 / Qt (₹ 31.64 / kg)',
        offeredRateNum: 3164,
        origRate: '₹ 2,850 / Qt',
        totalAmt: '₹ 6,32,800',
        advanceDeposit: '₹ 2,21,480 (35% Escrow)',
        status: 'Active'
      },
      {
        id: 'BID-885',
        crop: 'Kolhapur Bold Groundnut (Peanut)',
        image: 'assets/images/groundnut.jpg',
        buyer: 'Everest Spices Procurement Corp',
        location: 'Kolhapur APMC Yard',
        qty: '90 Qt (9,000 kg)',
        offeredRate: '₹ 7,140 / Qt (₹ 71.40 / kg)',
        offeredRateNum: 7140,
        origRate: '₹ 6,800 / Qt',
        totalAmt: '₹ 6,42,600',
        advanceDeposit: '₹ 2,24,910 (35% Escrow)',
        status: 'Active'
      }
    ];

    return `
      <!-- Bids Header -->
      <div style="background: #ffffff; border: 2px solid #e2e8f0; border-radius: 18px; padding: 20px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div>
          <h2 style="font-size: 1.45rem; font-weight: 900; color: #0f172a; margin: 0 0 4px 0;">${dict.bidsTitle}</h2>
          <p style="font-size: 0.9rem; color: #64748b; margin: 0;">${dict.bidsSubtitle}</p>
        </div>
        <button type="button" onclick="speakText('${dict.bidsSubtitle}', '${currentLang}')" class="lite-audio-btn" style="background: #e8f5ed; color: #0c5a36; border: 1.5px solid #86efac; border-radius: 12px; padding: 10px 16px; font-weight: 800; font-size: 0.88rem; cursor: pointer; display: flex; align-items: center; gap: 8px;">
          <span>🔊</span> <span>${dict.listenBids}</span>
        </button>
      </div>

      <!-- Bids Cards List -->
      <div style="display: flex; flex-direction: column; gap: 16px;">
        ${bidsList.map(bid => renderBidCardHTML(bid, dict, currentLang)).join('')}
      </div>
    `;
  }

  function renderBidCardHTML(bid, dict, currentLang) {
    const speechMsg = (currentLang === 'mr')
      ? `${bid.buyer} यांनी ${bid.crop} साठी ${bid.offeredRate} भाव दिला आहे. एकूण रक्कम ${bid.totalAmt}. ३५ टक्के आगाऊ अनामत तयार आहे.`
      : (currentLang === 'hi')
      ? `${bid.buyer} ने ${bid.crop} के लिए ${bid.offeredRate} का ऑफर दिया है। कुल भुगतान ${bid.totalAmt}।`
      : `${bid.buyer} offered ${bid.offeredRate} for ${bid.crop}. Total payout ${bid.totalAmt}. 35% escrow ready.`;

    return `
      <div class="lite-orders-card" style="background: #ffffff; border: 2px solid #e2e8f0; border-radius: 18px; padding: 18px; box-shadow: 0 4px 14px rgba(0,0,0,0.05); display: grid; grid-template-columns: 140px 1fr auto; gap: 18px; align-items: center;">
        
        <!-- Crop Photo -->
        <div style="text-align: center;">
          <img src="${bid.image}" alt="${bid.crop}" style="width: 120px; height: 120px; object-fit: cover; border-radius: 14px; border: 2px solid #cbd5e1;" onerror="this.src='assets/images/tomato.jpg'" />
          <span style="background: #dcfce7; color: #166534; font-size: 0.72rem; font-weight: 800; padding: 2px 8px; border-radius: 999px; display: inline-block; margin-top: 6px;">${dict.advanceLockedBadge}</span>
        </div>

        <!-- Offer Details -->
        <div>
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 4px;">
            <h3 style="font-size: 1.25rem; font-weight: 900; color: #0f172a; margin: 0;">${bid.crop}</h3>
            <button type="button" onclick="speakText('${speechMsg.replace(/'/g, "\\'")}', '${currentLang}')" class="lite-audio-btn" style="background: #e8f5ed; border: none; border-radius: 50%; width: 32px; height: 32px; cursor: pointer;">🔊</button>
          </div>
          <div style="font-size: 0.88rem; font-weight: 700; color: #0284c7; margin-bottom: 8px;">🏢 ${bid.buyer} • 📍 ${bid.location}</div>

          <div style="display: flex; gap: 20px; flex-wrap: wrap; background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 10px 14px;">
            <div>
              <span style="font-size: 0.76rem; color: #64748b; font-weight: 700; display: block;">${dict.offeredRate}</span>
              <strong style="font-size: 1.25rem; font-weight: 900; color: #16a34a;">${bid.offeredRate}</strong>
            </div>
            <div style="border-left: 1px solid #cbd5e1; padding-left: 16px;">
              <span style="font-size: 0.76rem; color: #64748b; font-weight: 700; display: block;">${dict.totalPayout}</span>
              <strong style="font-size: 1.25rem; font-weight: 900; color: #0f172a;">${bid.totalAmt}</strong>
            </div>
            <div style="border-left: 1px solid #cbd5e1; padding-left: 16px;">
              <span style="font-size: 0.76rem; color: #64748b; font-weight: 700; display: block;">${dict.qtyLabel}</span>
              <strong style="font-size: 1.05rem; font-weight: 800; color: #334155;">${bid.qty}</strong>
            </div>
          </div>
        </div>

        <!-- 1-Tap Action Buttons -->
        <div style="display: flex; flex-direction: column; gap: 8px; min-width: 200px;">
          <button type="button" onclick="acceptFarmerLiteBid('${bid.id}', '${bid.crop}', '${bid.totalAmt}')" style="background: #16a34a; color: #ffffff; border: none; border-radius: 12px; padding: 12px; font-weight: 900; font-size: 0.98rem; cursor: pointer; box-shadow: 0 4px 12px rgba(22, 163, 74, 0.35); display: flex; align-items: center; justify-content: center; gap: 6px;">
            <span>✓</span> <span>${dict.acceptBidBtn}</span>
          </button>
          <button type="button" onclick="openFarmerLiteCounterOfferModal('${bid.id}', '${bid.crop}', '${bid.offeredRateNum || 1400}')" style="background: #f0f9ff; color: #0284c7; border: 1.5px solid #bae6fd; border-radius: 12px; padding: 10px; font-weight: 800; font-size: 0.88rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;">
            <span>🤝</span> <span>${dict.bargainBidBtn}</span>
          </button>
          <button type="button" onclick="window.location.href='messages.html?buyer=' + encodeURIComponent('${bid.buyer.toLowerCase().includes('reliance') ? 'reliance' : (bid.buyer.toLowerCase().includes('dmart') ? 'dmart' : (bid.buyer.toLowerCase().includes('lulu') ? 'lulu' : (bid.buyer.toLowerCase().includes('itc') ? 'itc' : (bid.buyer.toLowerCase().includes('everest') ? 'everest' : 'reliance'))))}')" style="background: #f0fdf4; color: #166534; border: 1.5px solid #86efac; border-radius: 12px; padding: 8px; font-weight: 800; font-size: 0.82rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;">
            <span>💬</span> <span>${currentLang === 'mr' ? 'खरेदीदाराशी थेट चॅट' : (currentLang === 'hi' ? 'व्यापारी से चैट करें' : 'Chat with Buyer')}</span>
          </button>
          <a href="tel:+919822012345" style="background: #f8fafc; color: #475569; border: 1px solid #cbd5e1; border-radius: 12px; padding: 7px; font-weight: 700; font-size: 0.8rem; text-decoration: none; text-align: center; display: flex; align-items: center; justify-content: center; gap: 6px;">
            <span>📞</span> <span>${dict.callBuyerBtn}</span>
          </a>
        </div>
      </div>
    `;
  }

  // ==========================================
  // SECTION 3: ORDERS & LIVE SHIPMENTS
  // ==========================================
  function renderOrdersSectionHTML(dict, currentLang) {
    const ordersList = [
      {
        id: 'SHP-9021',
        crop: 'Red Onion (Nashik Garwa)',
        image: 'assets/images/onion.jpg',
        buyer: 'Reliance Fresh Supply Chain',
        truck: 'MH-15-EG-4421 (Tata 407 4-Ton)',
        driver: 'Kishore Shinde',
        driverPhone: '+91 98221 44520',
        pickup: 'Lasalgaon Mandi Yard, Nashik',
        drop: 'Vashi APMC Terminal, Navi Mumbai',
        eta: 'Today, 6:30 PM (2 hrs 15 mins)',
        status: 'In Transit',
        progressPct: 65,
        totalVal: '₹ 1,80,000'
      },
      {
        id: 'SHP-9022',
        crop: 'Yellow Soybean (JS 335)',
        image: 'assets/images/soybean.jpg',
        buyer: 'DMart Wholesale (Avenue Supermarts)',
        truck: 'MH-24-B-8830 (Eicher Pro 10-Ton)',
        driver: 'Dinesh Yadav',
        driverPhone: '+91 94230 88910',
        pickup: 'Latur Mega APMC Yard',
        drop: 'Thane Central Fulfillment Hub',
        eta: 'Tomorrow, 8:00 AM',
        status: 'In Transit',
        progressPct: 40,
        totalVal: '₹ 6,99,300'
      }
    ];

    return `
      <!-- Orders Header -->
      <div style="background: #ffffff; border: 2px solid #e2e8f0; border-radius: 18px; padding: 20px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div>
          <h2 style="font-size: 1.45rem; font-weight: 900; color: #0f172a; margin: 0 0 4px 0;">${dict.ordersTitle}</h2>
          <p style="font-size: 0.9rem; color: #64748b; margin: 0;">${dict.ordersSubtitle}</p>
        </div>
        <button type="button" onclick="speakText('${dict.ordersSubtitle}', '${currentLang}')" class="lite-audio-btn" style="background: #e8f5ed; color: #0c5a36; border: 1.5px solid #86efac; border-radius: 12px; padding: 10px 16px; font-weight: 800; font-size: 0.88rem; cursor: pointer; display: flex; align-items: center; gap: 8px;">
          <span>🔊</span> <span>${dict.listenOrders}</span>
        </button>
      </div>

      <!-- Orders List -->
      <div style="display: flex; flex-direction: column; gap: 18px;">
        ${ordersList.map(ord => renderShipmentCardHTML(ord, dict, currentLang)).join('')}
      </div>
    `;
  }

  function renderShipmentCardHTML(ord, dict, currentLang) {
    const speechMsg = (currentLang === 'mr')
      ? `${ord.crop} गाडी क्रमांक ${ord.truck}, ड्रायव्हर ${ord.driver}. गाडी रस्त्यात असून आज संध्याकाळी पोहोचेल.`
      : (currentLang === 'hi')
      ? `${ord.crop} गाड़ी ${ord.truck}, चालक ${ord.driver}। गाड़ी रास्ते में है।`
      : `${ord.crop} shipment on vehicle ${ord.truck}, driver ${ord.driver}. Status in transit.`;

    return `
      <div class="lite-orders-card" style="background: #ffffff; border: 2.5px solid #e2e8f0; border-radius: 20px; padding: 20px; box-shadow: 0 6px 18px rgba(0,0,0,0.06);">
        <!-- Card Header -->
        <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <img src="${ord.image}" alt="${ord.crop}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 14px; border: 2px solid #cbd5e1;" onerror="this.src='assets/images/onion.jpg'" />
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <h3 style="font-size: 1.3rem; font-weight: 900; color: #0f172a; margin: 0;">${ord.crop}</h3>
                <button type="button" onclick="speakText('${speechMsg.replace(/'/g, "\\'")}', '${currentLang}')" class="lite-audio-btn" style="background: #e8f5ed; border: none; border-radius: 50%; width: 32px; height: 32px; cursor: pointer;">🔊</button>
              </div>
              <span style="font-size: 0.85rem; color: #64748b;">Buyer: <strong>${ord.buyer}</strong> • Value: <strong style="color: #0c5a36;">${ord.totalVal}</strong></span>
            </div>
          </div>

          <span style="background: #dcfce7; color: #166534; font-weight: 900; font-size: 0.88rem; padding: 6px 14px; border-radius: 999px; border: 1.5px solid #86efac; display: inline-flex; align-items: center; gap: 6px;">
            <span>🚚</span> <span>${dict.onRoad}</span>
          </span>
        </div>

        <!-- Milestone Highway Bar -->
        <div class="lite-milestone-bar" style="margin: 20px 0 16px 0;">
          <div class="lite-milestone-progress" style="width: ${ord.progressPct}%;"></div>
          <div class="lite-milestone-node">
            <div class="lite-node-icon completed">🏡</div>
            <span class="lite-node-text">${ord.pickup.split(',')[0]}</span>
          </div>
          <div class="lite-milestone-node">
            <div class="lite-node-icon current">🚚</div>
            <span class="lite-node-text">Highway Check</span>
          </div>
          <div class="lite-milestone-node">
            <div class="lite-node-icon">🏢</div>
            <span class="lite-node-text">${ord.drop.split(',')[0]}</span>
          </div>
        </div>

        <!-- Driver & ETA Matrix -->
        <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 14px; padding: 14px; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; align-items: center; margin-top: 14px;">
          <div>
            <span style="font-size: 0.76rem; color: #64748b; font-weight: 700; display: block;">${dict.driverInfoLabel}:</span>
            <strong style="font-size: 0.95rem; color: #0f172a;">${ord.driver} • ${ord.truck}</strong>
          </div>
          <div>
            <span style="font-size: 0.76rem; color: #64748b; font-weight: 700; display: block;">${dict.etaLabel}:</span>
            <strong style="font-size: 0.95rem; color: #0284c7;">${ord.eta}</strong>
          </div>
          <div style="display: flex; gap: 8px; justify-content: flex-end;">
            <a href="tel:${ord.driverPhone}" style="background: #15803d; color: #ffffff; border: none; border-radius: 12px; padding: 10px 18px; font-weight: 900; font-size: 0.92rem; text-decoration: none; display: inline-flex; align-items: center; gap: 6px; box-shadow: 0 4px 10px rgba(21, 128, 61, 0.3);">
              <span>📞</span> <span>${dict.callDriverBtn}</span>
            </a>
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================
  // SECTION 4: ESCROW & BANK PAYOUT
  // ==========================================
  function renderEscrowSectionHTML(dict, currentLang) {
    return `
      <!-- Escrow Header -->
      <div style="background: #ffffff; border: 2px solid #e2e8f0; border-radius: 18px; padding: 20px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
        <div>
          <h2 style="font-size: 1.45rem; font-weight: 900; color: #0f172a; margin: 0 0 4px 0;">${dict.escrowTitle}</h2>
          <p style="font-size: 0.9rem; color: #64748b; margin: 0;">${dict.escrowSubtitle}</p>
        </div>
        <button type="button" onclick="speakText('${dict.escrowSubtitle}', '${currentLang}')" class="lite-audio-btn" style="background: #e8f5ed; color: #0c5a36; border: 1.5px solid #86efac; border-radius: 12px; padding: 10px 16px; font-weight: 800; font-size: 0.88rem; cursor: pointer; display: flex; align-items: center; gap: 8px;">
          <span>🔊</span> <span>${dict.listenEscrow}</span>
        </button>
      </div>

      <!-- 4 Stat Balance Cards -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-bottom: 24px;">
        <div style="background: #f0fdf4; border: 2px solid #86efac; border-radius: 18px; padding: 18px;">
          <span style="font-size: 0.82rem; font-weight: 800; color: #166534; display: block; margin-bottom: 4px;">${dict.readyWithdraw}</span>
          <strong style="font-size: 1.85rem; font-weight: 900; color: #0c5a36; display: block; margin-bottom: 12px;" id="lite-ready-balance">₹ 4,85,000</strong>
          <button type="button" onclick="openFarmerLiteWithdrawModal()" style="width: 100%; background: #0c5a36; color: #ffffff; border: none; border-radius: 12px; padding: 12px; font-weight: 900; font-size: 0.95rem; cursor: pointer; box-shadow: 0 4px 12px rgba(12, 90, 54, 0.3);">
            ${dict.withdrawBtn}
          </button>
        </div>

        <div style="background: #f0f9ff; border: 2px solid #bae6fd; border-radius: 18px; padding: 18px;">
          <span style="font-size: 0.82rem; font-weight: 800; color: #0369a1; display: block; margin-bottom: 4px;">${dict.lockedEscrow}</span>
          <strong style="font-size: 1.85rem; font-weight: 900; color: #0284c7; display: block; margin-bottom: 6px;">₹ 3,08,175</strong>
          <span style="font-size: 0.78rem; color: #0284c7; font-weight: 700;">🔒 Auto-releasing upon warehouse delivery</span>
        </div>

        <div style="background: #ffffff; border: 2px solid #e2e8f0; border-radius: 18px; padding: 18px;">
          <span style="font-size: 0.82rem; font-weight: 800; color: #64748b; display: block; margin-bottom: 4px;">${dict.totalEarned}</span>
          <strong style="font-size: 1.85rem; font-weight: 900; color: #0f172a; display: block; margin-bottom: 6px;">₹ 28,45,000</strong>
          <span style="font-size: 0.78rem; color: #16a34a; font-weight: 700;">✓ 42 Dispatches Completed</span>
        </div>

        <div style="background: #ffffff; border: 2px solid #e2e8f0; border-radius: 18px; padding: 18px;">
          <span style="font-size: 0.82rem; font-weight: 800; color: #64748b; display: block; margin-bottom: 4px;">${dict.bankBalance}</span>
          <strong style="font-size: 1.4rem; font-weight: 900; color: #0f172a; display: block; margin-bottom: 4px;">HDFC Bank • 8821</strong>
          <span style="font-size: 0.78rem; color: #64748b;">UPI: <strong style="color: #0c5a36;">ramesh.farmer@okhdfcbank</strong></span>
        </div>
      </div>

      <!-- 3-Step Visual Escrow Flow -->
      <div style="background: #ffffff; border: 2px solid #e2e8f0; border-radius: 20px; padding: 24px;">
        <h3 style="font-size: 1.25rem; font-weight: 900; color: #0f172a; margin: 0 0 16px 0;">🛡️ 3-Step Government-Supervised Escrow Guarantee</h3>
        <div class="lite-escrow-flow">
          <div class="lite-escrow-step active-step">
            <span class="lite-step-badge">1</span>
            <h4 style="font-size: 1.05rem; font-weight: 900; color: #0f172a; margin: 0 0 6px 0;">${dict.step1Title}</h4>
            <p style="font-size: 0.85rem; color: #475569; margin: 0;">${dict.step1Desc}</p>
          </div>
          <div class="lite-escrow-step active-step">
            <span class="lite-step-badge">2</span>
            <h4 style="font-size: 1.05rem; font-weight: 900; color: #0f172a; margin: 0 0 6px 0;">${dict.step2Title}</h4>
            <p style="font-size: 0.85rem; color: #475569; margin: 0;">${dict.step2Desc}</p>
          </div>
          <div class="lite-escrow-step active-step">
            <span class="lite-step-badge">3</span>
            <h4 style="font-size: 1.05rem; font-weight: 900; color: #0f172a; margin: 0 0 6px 0;">${dict.step3Title}</h4>
            <p style="font-size: 0.85rem; color: #475569; margin: 0;">${dict.step3Desc}</p>
          </div>
        </div>
      </div>
    `;
  }

  // ==========================================
  // SECTION 5: MARKET BENCHMARK, GRAPH & AI ADVICE
  // ==========================================
  const LITE_FALLBACK_COMMODITIES = [
    {
      id: "tomato-nashik-apmc",
      commodity: "Tomato",
      variety: "Shivam / Abhinav Hybrid",
      market: "Pimpalgaon Baswant APMC",
      district: "Nashik",
      state: "Maharashtra",
      grade: "Grade A Export Calibrated",
      modal_price: 1830,
      arrivals_qt: 80605,
      history_7d: [1865, 1850, 1882, 1825, 1825, 1808, 1830],
      change_1w_pct: -1.9,
      forecast: {
        target_price_7d: 1762,
        pct_change_7d: -3.7,
        confidence_pct: 79,
        forecast_points: [
          { day_offset: 1, forecast_price: 1812 },
          { day_offset: 2, forecast_price: 1804 },
          { day_offset: 3, forecast_price: 1795 },
          { day_offset: 4, forecast_price: 1787 },
          { day_offset: 5, forecast_price: 1779 },
          { day_offset: 6, forecast_price: 1770 },
          { day_offset: 7, forecast_price: 1762 }
        ]
      },
      advisory: {
        verdict: "SELL TODAY (Prices Peaking)",
        rationale: "Surplus arrivals from Junnar and Sangamner. Wholesale inventory clearing in Pimpalgaon yard."
      }
    },
    {
      id: "onion-lasalgaon-apmc",
      commodity: "Red Onion",
      variety: "Garwa Quality (Export Grade)",
      market: "Lasalgaon APMC Yard",
      district: "Nashik",
      state: "Maharashtra",
      grade: "Grade A 55mm+ Bold",
      modal_price: 2139,
      arrivals_qt: 122888,
      history_7d: [2114, 2138, 2120, 2104, 2126, 2129, 2139],
      change_1w_pct: 1.2,
      forecast: {
        target_price_7d: 2145,
        pct_change_7d: 0.3,
        confidence_pct: 78,
        forecast_points: [
          { day_offset: 1, forecast_price: 2133 },
          { day_offset: 2, forecast_price: 2135 },
          { day_offset: 3, forecast_price: 2137 },
          { day_offset: 4, forecast_price: 2139 },
          { day_offset: 5, forecast_price: 2141 },
          { day_offset: 6, forecast_price: 2143 },
          { day_offset: 7, forecast_price: 2145 }
        ]
      },
      advisory: {
        verdict: "HOLD / STEADY HARVEST",
        rationale: "Stable buffer stock operations and balanced pan-India freight dispatches maintain steady pricing."
      }
    },
    {
      id: "chilli-sinnar-apmc",
      commodity: "Green Chilli",
      variety: "G4 Spicy Dark Green",
      market: "Sinnar Agro Hub",
      district: "Nashik",
      state: "Maharashtra",
      grade: "Grade A Export Quality",
      modal_price: 3550,
      arrivals_qt: 29333,
      history_7d: [3610, 3575, 3559, 3668, 3590, 3537, 3550],
      change_1w_pct: -1.7,
      forecast: {
        target_price_7d: 3510,
        pct_change_7d: -1.1,
        confidence_pct: 78,
        forecast_points: [
          { day_offset: 1, forecast_price: 3555 },
          { day_offset: 2, forecast_price: 3548 },
          { day_offset: 3, forecast_price: 3540 },
          { day_offset: 4, forecast_price: 3533 },
          { day_offset: 5, forecast_price: 3525 },
          { day_offset: 6, forecast_price: 3517 },
          { day_offset: 7, forecast_price: 3510 }
        ]
      },
      advisory: {
        verdict: "SELL TODAY (High Premium)",
        rationale: "Direct retail chains paying premium over mandi baseline."
      }
    },
    {
      id: "cotton-jalgaon-apmc",
      commodity: "Raw Cotton",
      variety: "BT Cotton Super Fine",
      market: "Jalgaon APMC Market",
      district: "Jalgaon",
      state: "Maharashtra",
      grade: "Grade A Extra Long Staple",
      modal_price: 7162,
      arrivals_qt: 65420,
      history_7d: [7050, 7080, 7100, 7120, 7140, 7150, 7162],
      change_1w_pct: 1.6,
      forecast: {
        target_price_7d: 7350,
        pct_change_7d: 2.6,
        confidence_pct: 82,
        forecast_points: [
          { day_offset: 1, forecast_price: 7190 },
          { day_offset: 2, forecast_price: 7215 },
          { day_offset: 3, forecast_price: 7245 },
          { day_offset: 4, forecast_price: 7270 },
          { day_offset: 5, forecast_price: 7300 },
          { day_offset: 6, forecast_price: 7325 },
          { day_offset: 7, forecast_price: 7350 }
        ]
      },
      advisory: {
        verdict: "HOLD (Prices Rising)",
        rationale: "Spinning mills increasing procurement for upcoming textile export orders."
      }
    },
    {
      id: "grapes-nashik-apmc",
      commodity: "Grapes",
      variety: "Thomson Seedless Export",
      market: "Dindori APMC Yard",
      district: "Nashik",
      state: "Maharashtra",
      grade: "Grade A Export Calibrated",
      modal_price: 7600,
      arrivals_qt: 45200,
      history_7d: [7400, 7450, 7500, 7520, 7550, 7580, 7600],
      change_1w_pct: 2.7,
      forecast: {
        target_price_7d: 7850,
        pct_change_7d: 3.3,
        confidence_pct: 85,
        forecast_points: [
          { day_offset: 1, forecast_price: 7635 },
          { day_offset: 2, forecast_price: 7670 },
          { day_offset: 3, forecast_price: 7710 },
          { day_offset: 4, forecast_price: 7750 },
          { day_offset: 5, forecast_price: 7780 },
          { day_offset: 6, forecast_price: 7820 },
          { day_offset: 7, forecast_price: 7850 }
        ]
      },
      advisory: {
        verdict: "HOLD / PARTIAL HARVEST",
        rationale: "European and Gulf export packaging contracts offering top tier rates."
      }
    },
    {
      id: "pomegranate-solapur-apmc",
      commodity: "Pomegranate",
      variety: "Bhagwa Super Red",
      market: "Solapur APMC Yard",
      district: "Solapur",
      state: "Maharashtra",
      grade: "Grade A Bold 300g+",
      modal_price: 10840,
      arrivals_qt: 38900,
      history_7d: [10500, 10600, 10650, 10700, 10750, 10800, 10840],
      change_1w_pct: 3.2,
      forecast: {
        target_price_7d: 11150,
        pct_change_7d: 2.9,
        confidence_pct: 84,
        forecast_points: [
          { day_offset: 1, forecast_price: 10890 },
          { day_offset: 2, forecast_price: 10930 },
          { day_offset: 3, forecast_price: 10980 },
          { day_offset: 4, forecast_price: 11020 },
          { day_offset: 5, forecast_price: 11060 },
          { day_offset: 6, forecast_price: 11110 },
          { day_offset: 7, forecast_price: 11150 }
        ]
      },
      advisory: {
        verdict: "SELL TODAY",
        rationale: "Export packing houses aggressively buying high-brix Bhagwa lots."
      }
    },
    {
      id: "soybean-latur-apmc",
      commodity: "Soybean",
      variety: "Yellow Soybean (JS 335)",
      market: "Latur Mega APMC",
      district: "Latur",
      state: "Maharashtra",
      grade: "Grade A Cleaned & Machine Screened",
      modal_price: 4535,
      arrivals_qt: 98700,
      history_7d: [4420, 4450, 4480, 4500, 4510, 4520, 4535],
      change_1w_pct: 2.6,
      forecast: {
        target_price_7d: 4680,
        pct_change_7d: 3.2,
        confidence_pct: 86,
        forecast_points: [
          { day_offset: 1, forecast_price: 4555 },
          { day_offset: 2, forecast_price: 4580 },
          { day_offset: 3, forecast_price: 4600 },
          { day_offset: 4, forecast_price: 4625 },
          { day_offset: 5, forecast_price: 4650 },
          { day_offset: 6, forecast_price: 4665 },
          { day_offset: 7, forecast_price: 4680 }
        ]
      },
      advisory: {
        verdict: "HOLD / STORE (Oil Mill Demand)",
        rationale: "Solvent extraction plants ramping up crushing capacity next week."
      }
    },
    {
      id: "turmeric-sangli-apmc",
      commodity: "Turmeric",
      variety: "Rajapuri Whole Finger",
      market: "Sangli APMC Yard",
      district: "Sangli",
      state: "Maharashtra",
      grade: "Grade A High Curcumin (3.8%+)",
      modal_price: 14965,
      arrivals_qt: 28400,
      history_7d: [14600, 14700, 14750, 14800, 14880, 14920, 14965],
      change_1w_pct: 2.5,
      forecast: {
        target_price_7d: 15450,
        pct_change_7d: 3.2,
        confidence_pct: 88,
        forecast_points: [
          { day_offset: 1, forecast_price: 15040 },
          { day_offset: 2, forecast_price: 15110 },
          { day_offset: 3, forecast_price: 15190 },
          { day_offset: 4, forecast_price: 15260 },
          { day_offset: 5, forecast_price: 15330 },
          { day_offset: 6, forecast_price: 15390 },
          { day_offset: 7, forecast_price: 15450 }
        ]
      },
      advisory: {
        verdict: "SELL TODAY (Record Highs)",
        rationale: "Pharmaceutical and spice brand contracts locking lots at historic peak rates."
      }
    },
    {
      id: "orange-nagpur-apmc",
      commodity: "Orange",
      variety: "Nagpur Santra Table/Export",
      market: "Nagpur Central APMC",
      district: "Nagpur",
      state: "Maharashtra",
      grade: "Grade A Export Calibrated",
      modal_price: 4898,
      arrivals_qt: 48200,
      history_7d: [4750, 4780, 4810, 4840, 4860, 4880, 4898],
      change_1w_pct: 3.1,
      forecast: {
        target_price_7d: 5120,
        pct_change_7d: 4.5,
        confidence_pct: 83,
        forecast_points: [
          { day_offset: 1, forecast_price: 4930 },
          { day_offset: 2, forecast_price: 4965 },
          { day_offset: 3, forecast_price: 5000 },
          { day_offset: 4, forecast_price: 5040 },
          { day_offset: 5, forecast_price: 5070 },
          { day_offset: 6, forecast_price: 5095 },
          { day_offset: 7, forecast_price: 5120 }
        ]
      },
      advisory: {
        verdict: "HOLD / STEADY HARVEST",
        rationale: "Festive retail demand pushing fruit markets up across metro cities."
      }
    },
    {
      id: "banana-jalgaon-apmc",
      commodity: "Banana",
      variety: "Grand Naine Export Calibrated",
      market: "Jalgaon APMC Yard",
      district: "Jalgaon",
      state: "Maharashtra",
      grade: "Grade A 7-8 Inch Hands",
      modal_price: 1617,
      arrivals_qt: 74500,
      history_7d: [1580, 1590, 1600, 1605, 1610, 1612, 1617],
      change_1w_pct: 2.3,
      forecast: {
        target_price_7d: 1665,
        pct_change_7d: 3.0,
        confidence_pct: 81,
        forecast_points: [
          { day_offset: 1, forecast_price: 1625 },
          { day_offset: 2, forecast_price: 1632 },
          { day_offset: 3, forecast_price: 1640 },
          { day_offset: 4, forecast_price: 1648 },
          { day_offset: 5, forecast_price: 1655 },
          { day_offset: 6, forecast_price: 1660 },
          { day_offset: 7, forecast_price: 1665 }
        ]
      },
      advisory: {
        verdict: "SELL TODAY",
        rationale: "Cold chain reefer dispatches active to Delhi and North India hubs."
      }
    }
  ];

  async function loadLiteMarketData() {
    if (liteMarketData && liteMarketData.commodities && liteMarketData.commodities.length > 0) {
      return liteMarketData;
    }
    try {
      let res = await fetch("/api/mandi/forecasts?t=" + Date.now());
      if (!res.ok) {
        res = await fetch("data/mandi_live_analytics.json?t=" + Date.now());
      }
      if (res.ok) {
        liteMarketData = await res.json();
        return liteMarketData;
      }
    } catch (err) {
      try {
        const fallbackRes = await fetch("data/mandi_live_analytics.json?t=" + Date.now());
        if (fallbackRes.ok) {
          liteMarketData = await fallbackRes.json();
          return liteMarketData;
        }
      } catch (e) {}
    }

    liteMarketData = {
      metadata: {
        generated_at: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        data_source: "MSAMB Live API & Agmarknet Verified",
        total_mandi_volume_qt: 718017,
        avg_modal_price: 4575,
        overall_market_trend: "Steady",
        top_gainer: { commodity: "Orange", gain_pct: 4.5, current_price: 4898 },
        chart_days: ["Day -6", "Day -5", "Day -4", "Day -3", "Day -2", "Day -1", "Today"],
        forecast_days: ["Day +1", "Day +2", "Day +3", "Day +4", "Day +5", "Day +6", "Day +7"]
      },
      commodities: LITE_FALLBACK_COMMODITIES
    };
    return liteMarketData;
  }

  function getLiteProduceImage(cropName) {
    if (!cropName) return 'assets/images/hero-field.jpg';
    const name = cropName.toLowerCase();
    if (name.includes('pomegranate') || name.includes('डाळिंब')) return 'assets/images/pomegranate.jpg';
    if (name.includes('mango') || name.includes('आंबा')) return 'assets/images/mango.jpg';
    if (name.includes('orange') || name.includes('santra') || name.includes('संत्रे')) return 'assets/images/orange.jpg';
    if (name.includes('soybean') || name.includes('सोयाबीन')) return 'assets/images/soybean.jpg';
    if (name.includes('chana') || name.includes('gram') || name.includes('हरभरा')) return 'assets/images/chana.jpg';
    if (name.includes('grapes') || name.includes('द्राक्षे')) return 'assets/images/grapes.jpg';
    if (name.includes('turmeric') || name.includes('हळद')) return 'assets/images/turmeric.jpg';
    if (name.includes('cotton') || name.includes('कापूस')) return 'assets/images/cotton.jpg';
    if (name.includes('green chilli') || name.includes('chilli') || name.includes('मिरची')) return 'assets/images/chilli.jpg';
    if (name.includes('onion') || name.includes('कांदा')) return 'assets/images/onion.jpg';
    if (name.includes('tomato') || name.includes('टोमॅटो')) return 'assets/images/tomato.jpg';
    if (name.includes('banana') || name.includes('केळी')) return 'assets/images/banana.jpg';
    if (name.includes('rice') || name.includes('तांदूळ')) return 'assets/images/rice.jpg';
    if (name.includes('wheat') || name.includes('गहू')) return 'assets/images/wheat.jpg';
    if (name.includes('potato') || name.includes('बटाटा')) return 'assets/images/potato.jpg';
    if (name.includes('groundnut') || name.includes('भुईमूग')) return 'assets/images/groundnut.jpg';
    return 'assets/images/tomato.jpg';
  }

  function getLiteCropDisplay(c) {
    if (!c) return { name: '', variety: '', market: '', grade: '' };
    const crop = c.commodity || '';
    const variety = c.variety || '';
    const market = c.market || '';
    const grade = c.grade || 'Grade A';
    if (window.AgriNexFarmerI18n) {
      return {
        name: window.AgriNexFarmerI18n.tCrop ? window.AgriNexFarmerI18n.tCrop(crop) : crop,
        variety: window.AgriNexFarmerI18n.tVariety ? window.AgriNexFarmerI18n.tVariety(variety) : variety,
        market: window.AgriNexFarmerI18n.tLocation ? window.AgriNexFarmerI18n.tLocation(market) : market,
        grade: window.AgriNexFarmerI18n.tGrade ? window.AgriNexFarmerI18n.tGrade(grade) : grade
      };
    }
    return { name: crop, variety, market, grade };
  }

  function renderInsightsSectionHTML(dict, currentLang) {
    const defaultCards = [
      {
        crop: 'Red Onion (Nashik Garwa)',
        image: 'assets/images/onion.jpg',
        mandiRate: '₹ 1,800 / Qt',
        farmDirectRate: '₹ 1,980 / Qt',
        trendPct: '+8.5%',
        signal: 'sell',
        reason: (currentLang === 'mr')
          ? 'बांग्लादेश व आखाती देशांत मोठी निर्यात मागणी. भाव सर्वोच्च पातळीवर असल्याने आजच माल विका.'
          : (currentLang === 'hi')
          ? 'निर्यात मांग में भारी तेजी। भाव अपने उच्चतम स्तर पर हैं, आज ही माल बेचें।'
          : 'Strong export demand to Gulf & Bangladesh. Prices are peaking, optimal window to sell today.'
      },
      {
        crop: 'Tomato (Shivam / Abhinav)',
        image: 'assets/images/tomato.jpg',
        mandiRate: '₹ 1,300 / Qt',
        farmDirectRate: '₹ 1,420 / Qt',
        trendPct: '+4.8%',
        signal: 'sell',
        reason: (currentLang === 'mr')
          ? 'नारायणगाव व पिंपळगाव मंडईत आवक संतुलित. थेट खरेदीदारांकडून चांगला भाव मिळत आहे.'
          : (currentLang === 'hi')
          ? 'मंडी में आवक सामान्य। सीधे खरीदारों से अच्छा प्रीमियम मिल रहा है।'
          : 'Healthy wholesale demand. Direct buyers paying ₹120/Qt premium over mandi.'
      },
      {
        crop: 'Yellow Soybean (Latur)',
        image: 'assets/images/soybean.jpg',
        mandiRate: '₹ 4,200 / Qt',
        farmDirectRate: '₹ 4,660 / Qt',
        trendPct: '+3.5%',
        signal: 'hold',
        reason: (currentLang === 'mr')
          ? 'तेल कंपन्यांची मोठी मागणी पुढील आठवड्यात अपेक्षित. २-३ दिवस माल साठवल्यास भाव वाढतील.'
          : (currentLang === 'hi')
          ? 'अगले सप्ताह तेल मिलों की बड़ी मांग संभव। कुछ दिन रुकने पर अधिक भाव मिलेगा।'
          : 'Crushing mills expected to ramp procurement next week. Holding 3-5 days recommended.'
      },
      {
        crop: 'Sangli Rajapuri Turmeric',
        image: 'assets/images/turmeric.jpg',
        mandiRate: '₹ 13,500 / Qt',
        farmDirectRate: '₹ 14,800 / Qt',
        trendPct: '+7.4%',
        signal: 'sell',
        reason: (currentLang === 'mr')
          ? 'औषध व मसाला कंपन्यांकडून ३.८% पेक्षा जास्त करक्युमिन असलेल्या मालाची मोठी खरेदी सुरू आहे.'
          : (currentLang === 'hi')
          ? 'मसाला कंपनियों की भारी मांग। आज माल बेचने पर अधिकतम मुनाफा मिलेगा।'
          : 'Pharma & spice processors securing high-curcumin lots at record prices.'
      }
    ];

    return `
      <!-- 1. Provenance & Live Mandi Sync Ribbon -->
      <div style="background: linear-gradient(90deg, #ecfdf5 0%, #f0fdf4 100%); border: 1.5px solid #a7f3d0; border-radius: 16px; padding: 14px 20px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; box-shadow: 0 2px 8px rgba(12, 90, 54, 0.05);">
        <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
          <span style="display: inline-flex; align-items: center; gap: 6px; background: #064e3b; color: #ffffff; font-size: 0.76rem; font-weight: 800; padding: 5px 12px; border-radius: 999px; letter-spacing: 0.3px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
            Live Agmarknet (data.gov.in) API Feed
          </span>
          <span style="font-size: 0.86rem; color: #065f46; font-weight: 800;">
            ${currentLang === 'mr' ? 'दैनिक थेट बाजार समिती भाव व पूर्वानुमान' : (currentLang === 'hi' ? 'दैनिक लाइव मंडी भाव व पूर्वानुमान' : 'Daily Mandi Price Updates & 7-Day Forecast')}
          </span>
        </div>

        <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
          <span style="font-size: 0.8rem; color: #047857; font-weight: 700;" id="lite-live-timestamp">
            Synced: Today, Live
          </span>
          <button type="button" onclick="speakLiteMarketOverview()" class="lite-audio-btn" style="background: #e8f5ed; color: #0c5a36; border: 1.5px solid #86efac; border-radius: 999px; padding: 6px 14px; font-weight: 800; font-size: 0.82rem; cursor: pointer; display: flex; align-items: center; gap: 6px;">
            <span>🔊</span> <span>${dict.listenInsights || 'Listen Market Advice'}</span>
          </button>
          <button type="button" onclick="triggerLiteMandiRefresh()" class="btn-sync-refresh" style="background: #ffffff; border: 1.5px solid #059669; color: #059669; font-size: 0.8rem; font-weight: 800; padding: 6px 14px; border-radius: 999px; cursor: pointer; display: inline-flex; align-items: center; gap: 6px;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" id="lite-refresh-icon">
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"></path>
            </svg>
            <span>Update Rates</span>
          </button>
        </div>
      </div>

      <!-- 2. 4 Metric KPI Stat Cards -->
      <section class="insights-stats-grid">
        <!-- Average Price -->
        <div class="insight-stat-card">
          <div class="stat-icon-square stat-icon-green">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              <polyline points="17 6 23 6 23 12"></polyline>
            </svg>
          </div>
          <div style="min-width: 0;">
            <div style="font-size: 0.78rem; font-weight: 700; color: #64748b; margin-bottom: 2px;">${currentLang === 'mr' ? 'सरासरी बाजार भाव' : (currentLang === 'hi' ? 'औसत मंडी भाव' : 'Average Mandi Price')}</div>
            <div style="font-size: 1.35rem; font-weight: 900; color: #0f172a; margin-bottom: 2px; white-space: nowrap;" id="lite-kpi-avg-price">₹ 45.75 <span style="font-size: 0.75rem; font-weight: 600; color: #64748b;">/kg</span></div>
            <div style="font-size: 0.74rem; font-weight: 800; color: #10b981;" id="lite-kpi-avg-delta">
              ↑ 6.2% <span style="color: #64748b; font-weight: 600;">this week</span>
            </div>
          </div>
        </div>

        <!-- Total Stock -->
        <div class="insight-stat-card">
          <div class="stat-icon-square stat-icon-purple">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
          </div>
          <div style="min-width: 0;">
            <div style="font-size: 0.78rem; font-weight: 700; color: #64748b; margin-bottom: 2px;">${currentLang === 'mr' ? 'एकूण बाजार आवक' : (currentLang === 'hi' ? 'कुल मंडी आवक' : 'Total Mandi Stock')}</div>
            <div style="font-size: 1.35rem; font-weight: 900; color: #0f172a; margin-bottom: 2px; white-space: nowrap;" id="lite-kpi-total-demand">7,18,017 <span style="font-size: 0.75rem; font-weight: 600; color: #64748b;">Quintals</span></div>
            <div style="font-size: 0.74rem; font-weight: 800; color: #10b981;">
              ↑ 8.7% <span style="color: #64748b; font-weight: 600;">today</span>
            </div>
          </div>
        </div>

        <!-- Top Rising Crop -->
        <div class="insight-stat-card">
          <div class="stat-icon-square stat-icon-orange">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"></path>
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
              <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"></path>
              <path d="M2 7h20"></path>
            </svg>
          </div>
          <div style="min-width: 0;">
            <div style="font-size: 0.78rem; font-weight: 700; color: #64748b; margin-bottom: 2px;">${currentLang === 'mr' ? 'सर्वाधिक तेजीचे पीक' : (currentLang === 'hi' ? 'सर्वाधिक तेजी वाली फसल' : 'Top Rising Crop')}</div>
            <div style="font-size: 1.35rem; font-weight: 900; color: #0f172a; margin-bottom: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" id="lite-kpi-top-crop">Orange (संत्रे)</div>
            <div style="font-size: 0.74rem; font-weight: 800; color: #d97706;" id="lite-kpi-top-delta">
              +4.5% today
            </div>
          </div>
        </div>

        <!-- Market Trend -->
        <div class="insight-stat-card">
          <div class="stat-icon-square stat-icon-blue">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              <polyline points="17 6 23 6 23 12"></polyline>
            </svg>
          </div>
          <div style="min-width: 0;">
            <div style="font-size: 0.78rem; font-weight: 700; color: #64748b; margin-bottom: 2px;">${currentLang === 'mr' ? 'बाजारपेठ कल' : (currentLang === 'hi' ? 'बाज़ार का रुख' : 'Market Trend')}</div>
            <div style="font-size: 1.35rem; font-weight: 900; color: #0f172a; margin-bottom: 2px; white-space: nowrap;" id="lite-kpi-market-trend">Steady (स्थिर)</div>
            <div style="font-size: 0.74rem; font-weight: 700; color: #15803d;" id="lite-kpi-market-trend-sub">
              ${currentLang === 'mr' ? 'माल विकण्यास अनुकूल' : (currentLang === 'hi' ? 'बिक्री हेतु अनुकूल समय' : 'Good time to sell')}
            </div>
          </div>
        </div>
      </section>

      <!-- 3. INTERACTIVE GRAPH HERO CARD (THE MAIN CHART) -->
      <section class="graph-hero-card">
        <!-- Top Controls Bar -->
        <div class="graph-top-bar">
          <div>
            <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
              <h3 style="font-size: 1.35rem; font-weight: 900; color: #0f172a; margin: 0;">
                📈 ${currentLang === 'mr' ? 'बाजार भाव कल व ७ दिवसांचा अंदाज आलेख' : (currentLang === 'hi' ? 'मंडी भाव व 7-दिवसीय मूल्य पूर्वानुमान ग्राफ' : 'Market Price Trend & 7-Day Forecast')}
              </h3>
              <span style="font-size: 0.76rem; font-weight: 800; background: #ecfdf5; color: #047857; border: 1.5px solid #a7f3d0; padding: 3px 10px; border-radius: 999px;">
                Live Agmarknet
              </span>
            </div>
            <p style="font-size: 0.88rem; color: #64748b; margin: 4px 0 0 0;">
              ${currentLang === 'mr' ? 'दैनंदिन थेट भाव व पुढील ७ दिवसांच्या संभाव्य बाजार दरांचा अचूक आलेख.' : (currentLang === 'hi' ? 'दैनिक वास्तविक भाव व अगले 7 दिनों के संभावित मूल्यों का सटीक आलेख।' : 'Clear daily prices in ₹ per kg with simple 7-day forward Expected price trends.')}
            </p>
          </div>

          <!-- Unit Switcher (kg vs Quintal) -->
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 0.82rem; color: #64748b; font-weight: 800;">${currentLang === 'mr' ? 'एकक:' : (currentLang === 'hi' ? 'इकाई:' : 'Unit:')}</span>
            <div class="unit-toggle-wrap">
              <button type="button" class="unit-toggle-btn ${selectedLiteUnit === 'kg' ? 'active' : ''}" id="lite-unit-btn-kg" onclick="setLitePriceUnit('kg')">₹ / kg</button>
              <button type="button" class="unit-toggle-btn ${selectedLiteUnit === 'qt' ? 'active' : ''}" id="lite-unit-btn-qt" onclick="setLitePriceUnit('qt')">₹ / Quintal</button>
            </div>
          </div>
        </div>

        <!-- Produce Selection Chips Carousel with Real Photos -->
        <div class="produce-chips-scroll" id="lite-produce-chips-container">
          <!-- Dynamically populated with respective crop images & rates -->
        </div>

        <!-- Quick Summary Bar for Active Crop -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 14px 20px; margin-bottom: 18px; flex-wrap: wrap; gap: 14px;">
          <div style="display: flex; align-items: center; gap: 14px;">
            <img id="lite-active-crop-img" src="assets/images/tomato.jpg" style="width: 46px; height: 46px; border-radius: 50%; object-fit: cover; border: 2.5px solid #0c5a36; box-shadow: 0 2px 8px rgba(0,0,0,0.15);" />
            <div>
              <strong style="font-size: 1.15rem; color: #0f172a; display: block;" id="lite-active-crop-title">Tomato (Shivam / Abhinav Hybrid)</strong>
              <div style="font-size: 0.8rem; color: #64748b;" id="lite-active-crop-location">Pimpalgaon Baswant APMC, Nashik • Grade A Export Calibrated</div>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
            <div>
              <span style="color: #64748b; font-size: 0.76rem; font-weight: 700; display: block;">${dict.priceLabel || "Today's Rate"}:</span>
              <strong style="color: #15803d; font-size: 1.25rem; font-weight: 900;" id="lite-active-spot-rate">₹ 18.30 / kg</strong>
            </div>
            <div>
              <span style="color: #64748b; font-size: 0.76rem; font-weight: 700; display: block;">${currentLang === 'mr' ? '७ दिवसांचे लक्ष्य:' : '7-Day Target:'}</span>
              <strong style="color: #2563eb; font-size: 1.25rem; font-weight: 900;" id="lite-active-forecast-target">₹ 17.62 / kg (-3.7%)</strong>
            </div>

            <div style="display: flex; align-items: center; gap: 8px;">
              <span id="lite-active-ai-badge" style="background: #dcfce7; color: #166534; border: 1.5px solid #86efac; border-radius: 999px; padding: 6px 12px; font-weight: 900; font-size: 0.78rem;">
                SELL TODAY (Prices Peaking)
              </span>
              <button type="button" onclick="speakLiteActiveCropAdvice()" class="lite-audio-btn" title="Listen Audio Advice" style="background: #e8f5ed; border: 1.5px solid #86efac; color: #0c5a36; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; cursor: pointer;">
                🔊
              </button>
            </div>

            <button type="button" id="lite-btn-list-active-crop" style="background: #0c5a36; color: #ffffff; border: none; border-radius: 12px; padding: 10px 18px; font-weight: 900; font-size: 0.92rem; cursor: pointer; display: flex; align-items: center; gap: 6px; box-shadow: 0 4px 12px rgba(12, 90, 54, 0.25);">
              <span>🌾</span> <span>1-Tap List This Crop</span>
            </button>
          </div>
        </div>

        <!-- High-DPI Clean Canvas Chart -->
        <div style="position: relative; height: 340px; width: 100%; margin-bottom: 12px;">
          <canvas id="liteMarketSimpleChart"></canvas>
        </div>

        <!-- Simple Chart Legend -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 14px; padding-top: 14px; border-top: 1px solid #f1f5f9; font-size: 0.82rem; color: #64748b; flex-wrap: wrap; gap: 10px;">
          <div style="display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
            <span style="display: flex; align-items: center; gap: 8px; font-weight: 700;">
              <span style="width: 18px; height: 4px; background: #059669; display: inline-block; border-radius: 2px;"></span>
              Solid Green: Past 7 Days Actual Price (मागील ७ दिवसांचा प्रत्यक्ष भाव)
            </span>
            <span style="display: flex; align-items: center; gap: 8px; font-weight: 700;">
              <span style="width: 18px; height: 3px; border-top: 3px dashed #2563eb; display: inline-block;"></span>
              Dashed Blue: Next 7 Days AI Forecast (पुढील ७ दिवसांचा AI अंदाज)
            </span>
          </div>
          <span style="font-weight: 700; color: #0c5a36;">✓ Official APMC Mandi Data (data.gov.in)</span>
        </div>
      </section>

      <!-- 4. 2-COLUMN LOWER SECTION: DEMAND SHARE & FORECASTS -->
      <section class="insights-bottom-grid">
        <!-- Column 1: Top Demanded Produce -->
        <div class="insight-card">
          <div class="card-header-clean">
            <div class="card-title-text">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.2">
                <path d="M12 20V10"></path>
                <path d="M18 20V4"></path>
                <path d="M6 20v-4"></path>
              </svg>
              ${currentLang === 'mr' ? 'सर्वाधिक मागणी असलेला शेतीमाल' : (currentLang === 'hi' ? 'उच्चतम मांग वाली फसलें' : 'Top Demanded Produce')}
            </div>
            <span style="font-size: 0.78rem; color: #64748b; font-weight: 700;">By Arrival Volume</span>
          </div>
          <div id="lite-demand-items-container" style="display: flex; flex-direction: column; gap: 6px;">
            <!-- Rendered dynamically -->
          </div>
        </div>

        <!-- Column 2: 7-Day Price Forecasts -->
        <div class="insight-card">
          <div class="card-header-clean">
            <div class="card-title-text">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              ${currentLang === 'mr' ? '७ दिवसांचे अपेक्षित दर (Forecast)' : (currentLang === 'hi' ? '7-दिवसीय मूल्य पूर्वानुमान' : '7-Day Price Forecasts')}
            </div>
          </div>

          <!-- Green Banner Box -->
          <div style="background: #f0fdf4; border: 1.5px solid #bbf7d0; border-radius: 14px; padding: 12px 16px; margin-bottom: 12px; display: flex; align-items: center; gap: 12px;">
            <div style="width: 32px; height: 32px; border-radius: 50%; background: #dcfce7; display: flex; align-items: center; justify-content: center; color: #166534; font-weight: 900; font-size: 1.1rem; flex-shrink: 0;">
              ↗
            </div>
            <div>
              <strong style="font-size: 0.88rem; color: #166534; display: block;">Prices likely to increase</strong>
              <span style="font-size: 0.76rem; color: #15803d;">Across Maharashtra APMC terminals over next 3–5 days</span>
            </div>
          </div>

          <div id="lite-forecast-items-container" style="display: flex; flex-direction: column; gap: 6px;">
            <!-- Rendered dynamically -->
          </div>
        </div>
      </section>

      <!-- 5. APMC MANDI BENCHMARK & AI ADVISORY CARDS -->
      <div style="margin-top: 10px;">
        <h3 style="font-size: 1.25rem; font-weight: 900; color: #0f172a; margin-bottom: 14px; display: flex; align-items: center; gap: 8px;">
          <span>⚖️</span> <span>${currentLang === 'mr' ? 'बाजार समिती भाव तुलना व थेट शेतकरी विक्री फायदा' : (currentLang === 'hi' ? 'मंडी भाव तुलना व सीधा किसान प्रीमियम' : 'APMC Mandi Yard Benchmark vs Direct Farm-Gate')}</span>
        </h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 18px;">
          ${defaultCards.map(item => renderInsightCardHTML(item, dict, currentLang)).join('')}
        </div>
      </div>
    `;
  }

  function renderInsightCardHTML(item, dict, currentLang) {
    const isSell = item.signal === 'sell';
    const speechMsg = `${item.crop}. ${isSell ? dict.signalSellText : dict.signalHoldText}. ${item.reason}`;

    return `
      <div class="lite-produce-card" style="background: #ffffff; border: 2px solid #e2e8f0; border-radius: 18px; padding: 18px; box-shadow: 0 4px 14px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 12px;">
              <img src="${item.image}" alt="${item.crop}" style="width: 54px; height: 54px; object-fit: cover; border-radius: 12px; border: 1.5px solid #cbd5e1;" onerror="this.src='assets/images/onion.jpg'" />
              <div>
                <h4 style="font-size: 1.15rem; font-weight: 900; color: #0f172a; margin: 0;">${item.crop}</h4>
                <span style="font-size: 0.82rem; font-weight: 800; color: #16a34a;">Trend: ${item.trendPct} 📈</span>
              </div>
            </div>
            <button type="button" onclick="speakText('${speechMsg.replace(/'/g, "\\'")}', '${currentLang}')" class="lite-audio-btn" style="background: #e8f5ed; border: none; border-radius: 50%; width: 34px; height: 34px; cursor: pointer;">🔊</button>
          </div>

          <!-- Price Comparison Bar -->
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 10px 14px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <span style="font-size: 0.74rem; color: #64748b; font-weight: 700; display: block;">${dict.mandiBenchmarkLabel}</span>
              <strong style="font-size: 1.05rem; font-weight: 800; color: #64748b; text-decoration: line-through;">${item.mandiRate}</strong>
            </div>
            <div style="text-align: right;">
              <span style="font-size: 0.74rem; color: #166534; font-weight: 700; display: block;">${dict.farmDirectLabel}</span>
              <strong style="font-size: 1.25rem; font-weight: 900; color: #16a34a;">${item.farmDirectRate}</strong>
            </div>
          </div>

          <!-- AI Signal Badge -->
          <div style="background: ${isSell ? '#dcfce7' : '#fef9c3'}; border: 1.5px solid ${isSell ? '#86efac' : '#fde047'}; border-radius: 10px; padding: 8px 12px; margin-bottom: 10px;">
            <strong style="font-size: 0.88rem; color: ${isSell ? '#166534' : '#854d0e'}; display: block;">
              ${isSell ? dict.signalSellText : dict.signalHoldText}
            </strong>
            <p style="font-size: 0.82rem; color: #334155; margin: 4px 0 0 0; line-height: 1.35;">${item.reason}</p>
          </div>
        </div>

        <button type="button" onclick="openFarmerLiteAddCropModal('${item.crop}')" style="width: 100%; background: #0c5a36; color: #ffffff; border: none; border-radius: 10px; padding: 10px; font-weight: 800; font-size: 0.88rem; cursor: pointer; margin-top: 10px;">
          🌾 1-Tap List This Crop
        </button>
      </div>
    `;
  }

  // ==========================================
  // MARKET INSIGHTS LOGIC & CHART CONTROLLER
  // ==========================================
  async function initLiteMarketChart() {
    const data = await loadLiteMarketData();
    if (!data || !data.commodities) return;

    const commodities = data.commodities;
    const meta = data.metadata || {};

    // 1. Update KPI header stats if elements exist
    const kpiAvgEl = document.getElementById('lite-kpi-avg-price');
    const kpiAvgDeltaEl = document.getElementById('lite-kpi-avg-delta');
    const kpiTotalEl = document.getElementById('lite-kpi-total-demand');
    const kpiTopCropEl = document.getElementById('lite-kpi-top-crop');
    const kpiTopDeltaEl = document.getElementById('lite-kpi-top-delta');
    const kpiTrendEl = document.getElementById('lite-kpi-market-trend');
    const kpiTrendSubEl = document.getElementById('lite-kpi-market-trend-sub');
    const liveTimeEl = document.getElementById('lite-live-timestamp');

    const avgPrice = meta.avg_modal_price || Math.round(commodities.reduce((a, b) => a + (b.modal_price || 0), 0) / (commodities.length || 1));
    if (kpiAvgEl) {
      const avgKg = (avgPrice / 100.0).toFixed(2);
      kpiAvgEl.innerHTML = `₹ ${avgKg} <span style="font-size: 0.76rem; font-weight: 600; color: #64748b;">/kg (₹ ${avgPrice.toLocaleString('en-IN')}/Qt)</span>`;
    }

    const totalChanges = commodities.reduce((acc, c) => acc + (c.change_1w_pct || 0), 0);
    const avgDelta = (totalChanges / (commodities.length || 1)).toFixed(1);
    const isAvgUp = avgDelta >= 0;
    if (kpiAvgDeltaEl) {
      kpiAvgDeltaEl.innerHTML = `<span style="color: ${isAvgUp ? '#10b981' : '#ef4444'}; font-weight: 800;">${isAvgUp ? '↑' : '↓'} ${Math.abs(avgDelta)}%</span> <span style="color: #64748b; font-weight: 600;">this week</span>`;
    }

    const totalVol = meta.total_mandi_volume_qt || 718017;
    if (kpiTotalEl) {
      kpiTotalEl.innerHTML = `${totalVol.toLocaleString('en-IN')} <span style="font-size: 0.76rem; font-weight: 600; color: #64748b;">Quintals</span>`;
    }

    const topGainer = meta.top_gainer || { commodity: "Orange", gain_pct: 4.5 };
    if (kpiTopCropEl) kpiTopCropEl.textContent = topGainer.commodity;
    if (kpiTopDeltaEl) kpiTopDeltaEl.textContent = `+${topGainer.gain_pct}% today`;

    if (kpiTrendEl) kpiTrendEl.textContent = meta.overall_market_trend || 'Rising';
    if (kpiTrendSubEl) kpiTrendSubEl.textContent = (meta.overall_market_trend === 'Falling') ? 'Supply pressure across mandis' : 'Good time to sell';

    if (liveTimeEl && meta.generated_at) {
      liveTimeEl.textContent = `Synced: ${meta.generated_at}`;
    }

    // 2. Populate Produce Chips Carousel
    renderLiteProduceChips(commodities);

    // 3. Update Active Crop Summary Bar
    updateLiteActiveCropSummary();

    // 4. Draw the Chart.js canvas graph
    renderLiteSimpleChart();

    // 5. Populate Lower Section: Demanded Crops & Forecasts
    renderLiteDemandedProduce(commodities);
    renderLiteForecastList(commodities);
  }

  function renderLiteProduceChips(commodities) {
    const container = document.getElementById('lite-produce-chips-container');
    if (!container) return;
    container.innerHTML = '';

    const distinct = [];
    const seen = new Set();
    commodities.forEach(c => {
      if (!seen.has(c.commodity) && distinct.length < 14) {
        seen.add(c.commodity);
        distinct.push(c);
      }
    });

    if (!distinct.some(d => d.id === activeLiteCropId) && distinct.length > 0) {
      activeLiteCropId = distinct[0].id;
    }

    distinct.forEach(c => {
      const isActive = c.id === activeLiteCropId;
      const imgUrl = getLiteProduceImage(c.commodity);
      const disp = getLiteCropDisplay(c);
      const priceKg = (c.modal_price / 100.0).toFixed(2);
      const priceQt = Math.round(c.modal_price).toLocaleString('en-IN');

      const card = document.createElement('div');
      card.className = `produce-chip ${isActive ? 'active' : ''}`;
      card.id = `lite-chip-${c.id}`;
      card.innerHTML = `
        <img src="${imgUrl}" alt="${c.commodity}" class="produce-chip-thumb" onerror="this.src='assets/images/tomato.jpg'" />
        <div>
          <div style="font-size: 0.88rem; font-weight: 800; color: #0f172a;">${disp.name}</div>
          <div style="font-size: 0.74rem; font-weight: 800; color: #15803d;">₹ ${priceKg}/kg <span style="font-size: 0.68rem; color: #64748b; font-weight: 600;">(₹${priceQt}/Qt)</span></div>
        </div>
      `;
      card.onclick = () => selectLiteCrop(c.id);
      container.appendChild(card);
    });
  }

  function selectLiteCrop(cropId) {
    activeLiteCropId = cropId;
    if (!liteMarketData || !liteMarketData.commodities) return;
    const commodities = liteMarketData.commodities;
    const c = commodities.find(item => item.id === cropId);
    if (!c) return;

    // Update active class on chips
    document.querySelectorAll('#lite-produce-chips-container .produce-chip').forEach(el => {
      el.classList.remove('active');
    });
    const selectedEl = document.getElementById(`lite-chip-${cropId}`);
    if (selectedEl) {
      selectedEl.classList.add('active');
      selectedEl.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
    }

    updateLiteActiveCropSummary();
    renderLiteSimpleChart();

    // Voice announcement for the newly selected crop
    const lang = getCurrentLang();
    const disp = getLiteCropDisplay(c);
    const spotKg = (c.modal_price / 100.0).toFixed(2);
    const targetKg = ((c.forecast?.target_price_7d || c.modal_price) / 100.0).toFixed(2);
    const msg = (lang === 'mr')
      ? `${disp.name}, आजचा भाव ₹ ${spotKg} प्रति किलो, ७ दिवसांचा अंदाज ₹ ${targetKg} प्रति किलो.`
      : (lang === 'hi')
      ? `${disp.name}, आज का भाव ₹ ${spotKg} प्रति किलो, ७ दिन का लक्ष्य ₹ ${targetKg} प्रति किलो।`
      : `${disp.name}, today's rate ₹ ${spotKg} per kg, 7-day target ₹ ${targetKg} per kg.`;
    speakText(msg, lang);
  }

  function updateLiteActiveCropSummary() {
    if (!liteMarketData || !liteMarketData.commodities) return;
    const c = liteMarketData.commodities.find(item => item.id === activeLiteCropId) || liteMarketData.commodities[0];
    if (!c) return;

    const imgEl = document.getElementById('lite-active-crop-img');
    const titleEl = document.getElementById('lite-active-crop-title');
    const locEl = document.getElementById('lite-active-crop-location');
    const spotEl = document.getElementById('lite-active-spot-rate');
    const forecastEl = document.getElementById('lite-active-forecast-target');
    const aiBadgeEl = document.getElementById('lite-active-ai-badge');
    const listBtnEl = document.getElementById('lite-btn-list-active-crop');

    const disp = getLiteCropDisplay(c);
    const spotKg = (c.modal_price / 100.0).toFixed(2);
    const spotQt = Math.round(c.modal_price).toLocaleString('en-IN');
    const targetPrice = c.forecast?.target_price_7d || c.modal_price;
    const targetKg = (targetPrice / 100.0).toFixed(2);
    const targetQt = Math.round(targetPrice).toLocaleString('en-IN');
    const pctChange = c.forecast?.pct_change_7d || 0;
    const isUp = pctChange >= 0;

    if (imgEl) imgEl.src = getLiteProduceImage(c.commodity);
    if (titleEl) titleEl.textContent = disp.variety ? `${disp.name} (${disp.variety})` : disp.name;
    if (locEl) locEl.textContent = `${disp.market}, ${c.district || 'MH'} • ${disp.grade}`;
    if (spotEl) {
      spotEl.innerHTML = (selectedLiteUnit === 'kg')
        ? `₹ ${spotKg} /kg <span style="font-size: 0.74rem; font-weight: 600; color: #64748b;">(₹ ${spotQt} /Qt)</span>`
        : `₹ ${spotQt} /Qt <span style="font-size: 0.74rem; font-weight: 600; color: #64748b;">(₹ ${spotKg} /kg)</span>`;
    }
    if (forecastEl) {
      const formattedTarget = (selectedLiteUnit === 'kg') ? `₹ ${targetKg} /kg` : `₹ ${targetQt} /Qt`;
      forecastEl.innerHTML = `${formattedTarget} <span style="font-size: 0.8rem; font-weight: 900; color: ${isUp ? '#16a34a' : '#ef4444'};">(${isUp ? '+' : ''}${pctChange}%)</span>`;
    }
    if (aiBadgeEl) {
      const verdict = c.advisory?.verdict || (isUp ? 'HOLD (Prices Rising)' : 'SELL TODAY (Prices Peaking)');
      const isSell = verdict.toLowerCase().includes('sell');
      aiBadgeEl.style.background = isSell ? '#dcfce7' : '#fef9c3';
      aiBadgeEl.style.borderColor = isSell ? '#86efac' : '#fde047';
      aiBadgeEl.style.color = isSell ? '#166534' : '#854d0e';
      aiBadgeEl.textContent = verdict;
    }
    if (listBtnEl) {
      listBtnEl.onclick = () => openFarmerLiteAddCropModal(c.commodity);
    }
  }

  function setLitePriceUnit(unit) {
    selectedLiteUnit = unit;
    const btnKg = document.getElementById('lite-unit-btn-kg');
    const btnQt = document.getElementById('lite-unit-btn-qt');
    if (btnKg) btnKg.classList.toggle('active', unit === 'kg');
    if (btnQt) btnQt.classList.toggle('active', unit === 'qt');

    updateLiteActiveCropSummary();
    renderLiteSimpleChart();
  }

  function renderLiteSimpleChart() {
    if (!liteMarketData || !liteMarketData.commodities) return;
    const canvas = document.getElementById('liteMarketSimpleChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const c = liteMarketData.commodities.find(item => item.id === activeLiteCropId) || liteMarketData.commodities[0];
    if (!c) return;

    if (liteChartInstance) {
      try {
        liteChartInstance.destroy();
      } catch (e) {}
      liteChartInstance = null;
    }

    const histLabels = liteMarketData.metadata?.chart_days || ['Day -6', 'Day -5', 'Day -4', 'Day -3', 'Day -2', 'Day -1', 'Today'];
    const foreLabels = liteMarketData.metadata?.forecast_days || ['Day +1', 'Day +2', 'Day +3', 'Day +4', 'Day +5', 'Day +6', 'Day +7'];
    const allLabels = [...histLabels, ...foreLabels];

    const formatPriceVal = (p) => selectedLiteUnit === 'kg' ? Number((p / 100.0).toFixed(2)) : Math.round(p);

    const historyArr = (c.history_7d && c.history_7d.length >= 7)
      ? c.history_7d
      : [c.modal_price * 0.96, c.modal_price * 0.97, c.modal_price * 0.98, c.modal_price * 0.975, c.modal_price * 0.99, c.modal_price * 0.995, c.modal_price];

    const histPrices = historyArr.map(p => formatPriceVal(p));
    const histSeries = [...histPrices, ...new Array(7).fill(null)];

    const forecastSeries = new Array(6).fill(null);
    forecastSeries.push(histPrices[histPrices.length - 1]); // Anchor at today's rate

    const forecastPoints = c.forecast?.forecast_points || [];
    forecastPoints.forEach(pt => forecastSeries.push(formatPriceVal(pt.forecast_price)));

    const unitLabel = selectedLiteUnit === 'kg' ? '₹/kg' : '₹/Qt';

    let gradientFill = 'rgba(5, 150, 105, 0.12)';
    try {
      const gradient = ctx.createLinearGradient(0, 0, 0, 300);
      gradient.addColorStop(0, 'rgba(5, 150, 105, 0.28)');
      gradient.addColorStop(1, 'rgba(5, 150, 105, 0.02)');
      gradientFill = gradient;
    } catch (e) {}

    liteChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: allLabels,
        datasets: [
          {
            label: `Past Actual Price (${unitLabel})`,
            data: histSeries,
            borderColor: '#059669',
            backgroundColor: gradientFill,
            fill: true,
            borderWidth: 3.5,
            tension: 0.35,
            pointRadius: 6,
            pointHoverRadius: 8,
            pointBackgroundColor: '#059669',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2.5
          },
          {
            label: `7-Day AI Forecast (${unitLabel})`,
            data: forecastSeries,
            borderColor: '#2563eb',
            borderDash: [7, 6],
            borderWidth: 3,
            tension: 0.35,
            pointRadius: 5.5,
            pointHoverRadius: 8,
            pointBackgroundColor: '#2563eb',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2.5,
            fill: false
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              boxWidth: 16,
              padding: 16,
              font: { family: 'Plus Jakarta Sans', weight: '700', size: 12 }
            }
          },
          tooltip: {
            backgroundColor: '#0f172a',
            padding: 12,
            cornerRadius: 10,
            titleFont: { family: 'Plus Jakarta Sans', weight: '800', size: 13 },
            bodyFont: { family: 'Plus Jakarta Sans', size: 12 },
            callbacks: {
              label: ctx => {
                if (ctx.parsed.y === null || isNaN(ctx.parsed.y)) return '';
                const val = ctx.parsed.y;
                if (selectedLiteUnit === 'kg') {
                  const inQt = Math.round(val * 100);
                  return `${ctx.dataset.label}: ₹ ${val} /kg (₹ ${inQt.toLocaleString('en-IN')} /Qt)`;
                } else {
                  const inKg = (val / 100.0).toFixed(2);
                  return `${ctx.dataset.label}: ₹ ${val.toLocaleString('en-IN')} /Qt (₹ ${inKg} /kg)`;
                }
              }
            }
          }
        },
        scales: {
          x: {
            grid: { color: '#f1f5f9' },
            ticks: { font: { family: 'Plus Jakarta Sans', weight: '700', size: 11 } }
          },
          y: {
            grid: { color: '#f1f5f9' },
            ticks: {
              font: { family: 'Plus Jakarta Sans', weight: '700', size: 11 },
              callback: val => `₹ ${val}`
            }
          }
        }
      }
    });
  }

  function renderLiteDemandedProduce(commodities) {
    const container = document.getElementById('lite-demand-items-container');
    if (!container) return;
    container.innerHTML = '';

    const sorted = [...commodities].sort((a, b) => (b.arrivals_qt || 0) - (a.arrivals_qt || 0)).slice(0, 6);
    const totalVol = liteMarketData?.metadata?.total_mandi_volume_qt || 718017;

    sorted.forEach(c => {
      const share = Math.round(((c.arrivals_qt || 0) / totalVol) * 100);
      const imgUrl = getLiteProduceImage(c.commodity);
      const disp = getLiteCropDisplay(c);
      const priceKg = (c.modal_price / 100.0).toFixed(2);
      const priceQt = Math.round(c.modal_price).toLocaleString('en-IN');

      container.innerHTML += `
        <div class="demand-item" onclick="selectLiteCrop('${c.id}')" style="cursor: pointer;">
          <div style="display: flex; align-items: center; gap: 10px; min-width: 140px;">
            <img src="${imgUrl}" alt="${c.commodity}" class="demand-thumb" onerror="this.src='assets/images/tomato.jpg'" />
            <div>
              <div style="font-weight: 800; font-size: 0.88rem; color: #0f172a;">${disp.name}</div>
              <div style="font-size: 0.74rem; font-weight: 800; color: #15803d;">₹ ${priceKg}/kg <span style="font-size: 0.68rem; color: #64748b; font-weight: 600;">(₹${priceQt}/Qt)</span></div>
            </div>
          </div>
          <div class="demand-track">
            <div class="demand-fill" style="width: ${Math.max(share, 10)}%;"></div>
          </div>
          <div style="font-size: 0.82rem; font-weight: 800; color: #64748b; min-width: 38px; text-align: right;">${share}%</div>
        </div>
      `;
    });
  }

  function renderLiteForecastList(commodities) {
    const container = document.getElementById('lite-forecast-items-container');
    if (!container) return;
    container.innerHTML = '';

    commodities.slice(0, 5).forEach(c => {
      const imgUrl = getLiteProduceImage(c.commodity);
      const disp = getLiteCropDisplay(c);
      const pct = c.forecast?.pct_change_7d || 0;
      const isUp = pct >= 0;
      const sign = isUp ? "+" : "";
      const targetPrice = c.forecast?.target_price_7d || c.modal_price;
      const targetKg = (targetPrice / 100.0).toFixed(2);
      const targetQt = Math.round(targetPrice).toLocaleString('en-IN');

      container.innerHTML += `
        <div class="forecast-row" onclick="selectLiteCrop('${c.id}')">
          <div style="display: flex; align-items: center; gap: 10px;">
            <img src="${imgUrl}" alt="${c.commodity}" class="demand-thumb" onerror="this.src='assets/images/tomato.jpg'" />
            <div>
              <span style="font-weight: 800; font-size: 0.88rem; color: #0f172a; display: block;">${disp.name}</span>
              <span style="font-size: 0.74rem; color: #64748b;">Target: <strong style="color: #0f172a;">₹ ${targetKg}/kg</strong> <span style="font-size: 0.68rem;">(₹${targetQt}/Qt)</span></span>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 0.86rem; font-weight: 900; color: ${isUp ? '#10b981' : '#ef4444'};">${sign}${pct}%</span>
            <span style="color: #94a3b8; font-size: 1.1rem; font-weight: 800;">&rsaquo;</span>
          </div>
        </div>
      `;
    });
  }

  function speakLiteActiveCropAdvice() {
    if (!liteMarketData || !liteMarketData.commodities) return;
    const c = liteMarketData.commodities.find(item => item.id === activeLiteCropId) || liteMarketData.commodities[0];
    if (!c) return;

    const lang = getCurrentLang();
    const disp = getLiteCropDisplay(c);
    const spotKg = (c.modal_price / 100.0).toFixed(2);
    const targetPrice = c.forecast?.target_price_7d || c.modal_price;
    const targetKg = (targetPrice / 100.0).toFixed(2);
    const verdict = c.advisory?.verdict || '';
    const rationale = c.advisory?.rationale || '';

    const msg = (lang === 'mr')
      ? `${disp.name}, आजचा भाव ₹ ${spotKg} प्रति किलो आहे. ७ दिवसांचा अंदाजित भाव ₹ ${targetKg} प्रति किलो आहे. कृषी सल्ला: ${verdict}. ${rationale}`
      : (lang === 'hi')
      ? `${disp.name}, आज का मंडी भाव ₹ ${spotKg} प्रति किलो है। ७ दिनों का लक्षित भाव ₹ ${targetKg} प्रति किलो है। सलाह: ${verdict}। ${rationale}`
      : `${disp.name}, today's spot rate is ₹ ${spotKg} per kg. 7-day projected price is ₹ ${targetKg} per kg. Recommendation: ${verdict}. ${rationale}`;

    speakText(msg, lang);
  }

  function speakLiteMarketOverview() {
    const lang = getCurrentLang();
    const meta = liteMarketData?.metadata || {};
    const topGainer = meta.top_gainer || { commodity: "Orange", gain_pct: 4.5 };
    const avgKg = ((meta.avg_modal_price || 4575) / 100.0).toFixed(2);

    const msg = (lang === 'mr')
      ? `आजचा सरासरी बाजार समिती भाव ₹ ${avgKg} प्रति किलो आहे. सर्वाधिक तेजी ${topGainer.commodity} मध्ये असून भाव ${topGainer.gain_pct} टक्क्यांनी वाढले आहेत. बाजारपेठ स्थिर असून माल विकण्यासाठी अनुकूल वेळ आहे.`
      : (lang === 'hi')
      ? `आज का औसत मंडी भाव ₹ ${avgKg} प्रति किलो है। सबसे ज्यादा तेजी ${topGainer.commodity} में ${topGainer.gain_pct} प्रतिशत की है। बाजार की स्थिति स्थिर व बिक्री के अनुकूल है।`
      : `Today's average mandi benchmark rate is ₹ ${avgKg} per kg. Top rising crop is ${topGainer.commodity} up ${topGainer.gain_pct} percent. Overall market trend is steady.`;

    speakText(msg, lang);
  }

  async function triggerLiteMandiRefresh() {
    const icon = document.getElementById('lite-refresh-icon');
    if (icon) {
      icon.style.transition = 'transform 0.8s ease';
      icon.style.transform = 'rotate(360deg)';
    }

    try {
      const res = await fetch("/api/mandi/update-rates", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      const json = await res.json();
      if (json.success && json.data) {
        liteMarketData = json.data;
      } else {
        await loadLiteMarketData();
      }
    } catch (e) {
      await loadLiteMarketData();
    } finally {
      if (icon) {
        setTimeout(() => { icon.style.transform = 'rotate(0deg)'; }, 800);
      }
      initLiteMarketChart();
      const lang = getCurrentLang();
      const msg = (lang === 'mr') ? 'बाजार समितीचे थेट भाव ताजे झाले आहेत!' : (lang === 'hi' ? 'ताज़ा मंडी भाव अपडेट हो गए हैं!' : 'Live Mandi rates updated successfully!');
      speakText(msg, lang);
    }
  }

  // ==========================================
  // MODALS FOR FARMER SIMPLE MODE
  // ==========================================
  function injectFarmerLiteModals() {
    if (document.getElementById('modal-farmer-lite-container')) return;

    const modalHost = document.createElement('div');
    modalHost.id = 'modal-farmer-lite-container';
    modalHost.innerHTML = `
      <!-- 1. 1-Tap Add / List Crop Modal -->
      <div id="modal-farmer-lite-add-crop" class="lite-modal-backdrop" style="display: none; position: fixed; inset: 0; background: rgba(15, 23, 42, 0.75); backdrop-filter: blur(6px); z-index: 99999; align-items: center; justify-content: center; padding: 16px;">
        <div class="lite-modal-card" style="background: #ffffff; border-radius: 24px; max-width: 580px; width: 100%; max-height: 90vh; overflow-y: auto; padding: 24px; box-shadow: 0 25px 50px rgba(0,0,0,0.3); border: 2px solid #0c5a36;">
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; border-bottom: 2px solid #f1f5f9; padding-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 1.8rem;">🌾</span>
              <div>
                <h3 style="margin: 0; font-size: 1.35rem; font-weight: 900; color: #0c5a36;" id="lite-modal-add-title">१-क्लिक पीक विक्री नोंदवा (1-Tap Sell)</h3>
                <span style="font-size: 0.82rem; color: #64748b;">AgriNex Direct Farmer Procurement</span>
              </div>
            </div>
            <button type="button" onclick="closeFarmerLiteAddCropModal()" style="border: none; background: none; font-size: 1.6rem; color: #64748b; cursor: pointer; font-weight: 700;">✕</button>
          </div>

          <!-- Step 1: Select Popular Crop (Big Touch Pills) -->
          <label style="font-size: 0.9rem; font-weight: 800; color: #0f172a; display: block; margin-bottom: 8px;">1. Select Crop (पीक निवडा):</label>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(110px, 1fr)); gap: 8px; margin-bottom: 18px;" id="lite-crop-picker-grid">
            ${POPULAR_CROPS.map((c, i) => `
              <button type="button" class="lite-crop-pick-btn ${i === 0 ? 'active' : ''}" onclick="selectFarmerLiteCrop('${c.key}', '${c.name}', ${c.defRate})" style="display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 8px 6px; border-radius: 12px; border: 2px solid ${i === 0 ? '#0c5a36' : '#cbd5e1'}; background: ${i === 0 ? '#f0fdf4' : '#ffffff'}; cursor: pointer;">
                <img src="${c.image}" alt="${c.key}" style="width: 44px; height: 44px; object-fit: cover; border-radius: 8px;" onerror="this.src='assets/images/tomato.jpg'" />
                <span style="font-size: 0.74rem; font-weight: 800; color: #0f172a; text-align: center;">${c.name.split('(')[0]}</span>
              </button>
            `).join('')}
          </div>

          <!-- Step 2: 1-Tap Quantity Stepper -->
          <label style="font-size: 0.9rem; font-weight: 800; color: #0f172a; display: block; margin-bottom: 8px;">2. Quantity (वजन / पोती): <strong id="lite-add-qty-display" style="color: #0c5a36;">50 Quintal (500 Bags)</strong></label>
          <div class="lite-stepper-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 18px;">
            <button type="button" class="lite-stepper-btn" onclick="setFarmerLiteQty(20)">20 Qt</button>
            <button type="button" class="lite-stepper-btn" onclick="setFarmerLiteQty(50)">50 Qt</button>
            <button type="button" class="lite-stepper-btn" onclick="setFarmerLiteQty(100)">100 Qt</button>
            <button type="button" class="lite-stepper-btn" onclick="setFarmerLiteQty(200)">200 Qt</button>
          </div>

          <!-- Step 3: Expected Price / Rate -->
          <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 14px; margin-bottom: 18px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <span style="font-size: 0.88rem; font-weight: 800; color: #0f172a;">Expected Floor Rate (अपेक्षित भाव):</span>
              <strong id="lite-add-rate-display" style="font-size: 1.45rem; font-weight: 900; color: #0c5a36;">₹ 1,300 / Qt</strong>
            </div>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;">
              <button type="button" class="lite-stepper-btn" onclick="adjustFarmerLiteRate(-50)">- ₹50</button>
              <button type="button" class="lite-stepper-btn" onclick="adjustFarmerLiteRate(+50)">+ ₹50</button>
              <button type="button" class="lite-stepper-btn" onclick="adjustFarmerLiteRate(+100)">+ ₹100</button>
            </div>
          </div>

          <!-- Voice Fill Trigger -->
          <button type="button" onclick="startVoiceCropListing()" style="width: 100%; background: #ffffff; border: 2px dashed #0c5a36; color: #0c5a36; padding: 12px; border-radius: 14px; font-weight: 800; font-size: 0.95rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 18px;">
            <span>🎤</span> <span>बोलून पीक नोंदवा (Speak to Auto-Fill)</span>
          </button>

          <!-- Action Buttons -->
          <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 12px;">
            <button type="button" onclick="closeFarmerLiteAddCropModal()" style="background: #f1f5f9; color: #475569; border: none; border-radius: 14px; padding: 14px; font-weight: 800; font-size: 1rem; cursor: pointer;">
              ✕ रद्द करा
            </button>
            <button type="button" onclick="submitFarmerLiteAddCrop()" style="background: #16a34a; color: #ffffff; border: none; border-radius: 14px; padding: 14px; font-weight: 900; font-size: 1.05rem; cursor: pointer; box-shadow: 0 4px 16px rgba(22, 163, 74, 0.4);">
              ✓ पीक विक्री नोंदवा (Publish)
            </button>
          </div>
        </div>
      </div>

      <!-- 2. 1-Tap Counter-Offer / Bargain Modal -->
      <div id="modal-farmer-lite-counter" class="lite-modal-backdrop" style="display: none; position: fixed; inset: 0; background: rgba(15, 23, 42, 0.75); backdrop-filter: blur(6px); z-index: 99999; align-items: center; justify-content: center; padding: 16px;">
        <div class="lite-modal-card" style="background: #ffffff; border-radius: 24px; max-width: 520px; width: 100%; padding: 24px; border: 2px solid #0284c7;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 1.8rem;">🤝</span>
              <h3 style="margin: 0; font-size: 1.3rem; font-weight: 900; color: #0369a1;">१-क्लिक भाव वाढवून मागा (Counter-Offer)</h3>
            </div>
            <button type="button" onclick="closeFarmerLiteCounterModal()" style="border: none; background: none; font-size: 1.5rem; color: #64748b; cursor: pointer;">✕</button>
          </div>

          <div style="background: #f0f9ff; border: 1.5px solid #bae6fd; border-radius: 16px; padding: 16px; margin-bottom: 16px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="font-size: 0.88rem; color: #64748b;">Buyer Offered Rate:</span>
              <strong id="lite-counter-orig-rate" style="font-size: 1.1rem; color: #64748b; text-decoration: line-through;">₹ 1,391 / Qt</strong>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-size: 0.95rem; font-weight: 800; color: #0369a1;">Your Counter Demand:</span>
              <strong id="lite-counter-demanded-rate" style="font-size: 1.6rem; font-weight: 900; color: #0284c7;">₹ 1,491 / Qt</strong>
            </div>
          </div>

          <label style="font-size: 0.85rem; font-weight: 800; color: #64748b; display: block; margin-bottom: 8px;">⚡ Select 1-Tap Higher Rate (+ भाव निवडा):</label>
          <div class="lite-bargain-rate-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 16px;">
            <button type="button" class="lite-bargain-rate-btn" onclick="selectFarmerCounterDelta(50)">+ ₹50 / Qt</button>
            <button type="button" class="lite-bargain-rate-btn active" onclick="selectFarmerCounterDelta(100)">+ ₹100 / Qt</button>
            <button type="button" class="lite-bargain-rate-btn" onclick="selectFarmerCounterDelta(200)">+ ₹200 / Qt</button>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 10px;">
            <button type="button" onclick="closeFarmerLiteCounterModal()" style="background: #f1f5f9; color: #475569; border: none; border-radius: 12px; padding: 12px; font-weight: 800; cursor: pointer;">✕ रद्द करा</button>
            <button type="button" onclick="submitFarmerCounterOffer()" style="background: #0284c7; color: #ffffff; border: none; border-radius: 12px; padding: 12px; font-weight: 900; font-size: 1rem; cursor: pointer;">💬 नवीन भाव पाठवा</button>
          </div>
        </div>
      </div>

      <!-- 3. 1-Tap Instant Bank Withdrawal Modal -->
      <div id="modal-farmer-lite-withdraw" class="lite-modal-backdrop" style="display: none; position: fixed; inset: 0; background: rgba(15, 23, 42, 0.75); backdrop-filter: blur(6px); z-index: 99999; align-items: center; justify-content: center; padding: 16px;">
        <div class="lite-modal-card" style="background: #ffffff; border-radius: 24px; max-width: 500px; width: 100%; padding: 24px; border: 2px solid #16a34a; text-align: center;">
          <div style="font-size: 3rem; margin-bottom: 10px;">🏦</div>
          <h3 style="font-size: 1.35rem; font-weight: 900; color: #0c5a36; margin: 0 0 6px 0;">१-क्लिक बँक ट्रान्सफर (Instant Payout)</h3>
          <p style="font-size: 0.88rem; color: #64748b; margin: 0 0 16px 0;">Available Cleared Balance: <strong style="color: #16a34a; font-size: 1.2rem;">₹ 4,85,000</strong></p>

          <div style="background: #f0fdf4; border: 1.5px solid #bbf7d0; border-radius: 16px; padding: 14px; text-align: left; margin-bottom: 18px;">
            <div style="font-size: 0.85rem; color: #166534; font-weight: 700; margin-bottom: 4px;">Verified Bank Account:</div>
            <div style="font-size: 1.05rem; font-weight: 900; color: #0f172a;">HDFC Bank Ltd. •••• 8821</div>
            <div style="font-size: 0.8rem; color: #64748b; margin-top: 4px;">IFSC: HDFC0001234 • UPI: ramesh.farmer@okhdfcbank</div>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 10px;">
            <button type="button" onclick="closeFarmerLiteWithdrawModal()" style="background: #f1f5f9; color: #475569; border: none; border-radius: 12px; padding: 12px; font-weight: 800; cursor: pointer;">✕ रद्द करा</button>
            <button type="button" onclick="executeFarmerInstantBankTransfer()" style="background: #16a34a; color: #ffffff; border: none; border-radius: 12px; padding: 12px; font-weight: 900; font-size: 1.05rem; cursor: pointer; box-shadow: 0 4px 14px rgba(22, 163, 74, 0.4);">💸 पैसे खात्यात पाठवा</button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modalHost);
  }

  // Active form states for 1-Tap Add Crop
  let selectedCropKey = 'Tomato';
  let selectedCropName = 'Tomato (टोमॅटो)';
  let selectedCropRate = 1300;
  let selectedCropQty = 50;

  function selectFarmerLiteCrop(key, name, defRate) {
    selectedCropKey = key;
    selectedCropName = name;
    selectedCropRate = defRate;

    const btns = document.querySelectorAll('.lite-crop-pick-btn');
    btns.forEach(btn => {
      btn.classList.remove('active');
      btn.style.borderColor = '#cbd5e1';
      btn.style.background = '#ffffff';
    });

    const rateDisplay = document.getElementById('lite-add-rate-display');
    if (rateDisplay) rateDisplay.textContent = `₹ ${defRate.toLocaleString()} / Qt`;
  }

  function setFarmerLiteQty(qty) {
    selectedCropQty = qty;
    const qtyDisplay = document.getElementById('lite-add-qty-display');
    if (qtyDisplay) qtyDisplay.textContent = `${qty} Quintal (${qty * 10} Bags)`;
  }

  function adjustFarmerLiteRate(delta) {
    selectedCropRate = Math.max(100, selectedCropRate + delta);
    const rateDisplay = document.getElementById('lite-add-rate-display');
    if (rateDisplay) rateDisplay.textContent = `₹ ${selectedCropRate.toLocaleString()} / Qt`;
  }

  function openFarmerLiteAddCropModal(preselectCrop) {
    injectFarmerLiteModals();
    const modal = document.getElementById('modal-farmer-lite-add-crop');
    if (modal) {
      modal.style.display = 'flex';
      if (preselectCrop) {
        const found = POPULAR_CROPS.find(c => c.name.toLowerCase().includes(preselectCrop.toLowerCase()) || c.key.toLowerCase().includes(preselectCrop.toLowerCase()));
        if (found) selectFarmerLiteCrop(found.key, found.name, found.defRate);
      }
    }
  }

  function closeFarmerLiteAddCropModal() {
    const modal = document.getElementById('modal-farmer-lite-add-crop');
    if (modal) modal.style.display = 'none';
  }

  function submitFarmerLiteAddCrop() {
    const newLot = {
      id: `LOT-${selectedCropKey.slice(0, 3).toUpperCase()}-${Math.floor(10 + Math.random() * 89)}`,
      crop: selectedCropName,
      category: 'Produce',
      shelfLife: '10 Days',
      harvestDate: 'Today',
      image: `assets/images/${selectedCropKey.toLowerCase()}.jpg`,
      grade: 'Grade A Export',
      quantity: `${selectedCropQty} Qt (${selectedCropQty * 100} kg)`,
      quantityNumber: selectedCropQty,
      expectedPrice: `₹ ${(selectedCropRate / 100).toFixed(2)} /kg (₹ ${selectedCropRate} /Qt)`,
      expectedPriceNumber: selectedCropRate,
      bestBid: `₹ ${((selectedCropRate * 1.05) / 100).toFixed(2)} /kg (₹ ${Math.round(selectedCropRate * 1.05)} /Qt)`,
      status: 'Bids Open',
      location: 'Lasalgaon Mandi Hub, Nashik'
    };

    if (window.farmerData && window.farmerData.listings) {
      window.farmerData.listings.unshift(newLot);
    }

    closeFarmerLiteAddCropModal();
    renderFarmerLiteInterface();

    const lang = getCurrentLang();
    const msg = (lang === 'mr')
      ? `अभिनंदन! तुमचे ${selectedCropName} विक्रीसाठी यशस्वीरीत्या नोंदवले गेले आहे.`
      : (lang === 'hi')
      ? `बधाई हो! आपकी फसल ${selectedCropName} सफलतापूर्वक दर्ज हो गई है।`
      : `Success! Your crop ${selectedCropName} has been published for buyers.`;

    speakText(msg, lang);
    alert(`✓ ${msg}`);
  }

  // Counter Offer Handling
  let currentCounterOrigRate = 1400;
  let currentCounterDelta = 100;

  function openFarmerLiteCounterOfferModal(bidId, cropName, origRateNum) {
    injectFarmerLiteModals();
    currentCounterOrigRate = parseFloat(origRateNum) || 1400;
    currentCounterDelta = 100;

    const modal = document.getElementById('modal-farmer-lite-counter');
    const origRateEl = document.getElementById('lite-counter-orig-rate');
    const demandEl = document.getElementById('lite-counter-demanded-rate');

    if (origRateEl) origRateEl.textContent = `₹ ${currentCounterOrigRate.toLocaleString()} / Qt`;
    if (demandEl) demandEl.textContent = `₹ ${(currentCounterOrigRate + currentCounterDelta).toLocaleString()} / Qt`;

    if (modal) modal.style.display = 'flex';
  }

  function closeFarmerLiteCounterModal() {
    const modal = document.getElementById('modal-farmer-lite-counter');
    if (modal) modal.style.display = 'none';
  }

  function selectFarmerCounterDelta(delta) {
    currentCounterDelta = delta;
    const demandEl = document.getElementById('lite-counter-demanded-rate');
    if (demandEl) demandEl.textContent = `₹ ${(currentCounterOrigRate + delta).toLocaleString()} / Qt`;

    const btns = document.querySelectorAll('.lite-bargain-rate-btn');
    btns.forEach(b => b.classList.remove('active'));
    if (event && event.target) event.target.classList.add('active');
  }

  function submitFarmerCounterOffer() {
    closeFarmerLiteCounterModal();
    const lang = getCurrentLang();
    const newRate = currentCounterOrigRate + currentCounterDelta;
    const msg = (lang === 'mr')
      ? `खरेदीदारास ₹ ${newRate} चा नवीन भाव पाठवला आहे!`
      : (lang === 'hi')
      ? `खरीदार को ₹ ${newRate} का नया भाव भेज दिया गया है!`
      : `Counter offer of ₹ ${newRate} sent to buyer!`;

    speakText(msg, lang);
    alert(`✓ ${msg}`);
  }

  // Accept Bid
  function acceptFarmerLiteBid(bidId, crop, totalAmt) {
    const lang = getCurrentLang();
    const msg = (lang === 'mr')
      ? `अभिनंदन! तुम्ही ${crop} चा ${totalAmt} चा सौदा मान्य केला आहे. खरेदीदाराची ३५% अनामत बँक एस्क्रोमध्ये सुरक्षित झाली आहे.`
      : (lang === 'hi')
      ? `बधाई हो! आपने ${crop} का सौदा स्वीकार कर लिया है। 35% अग्रिम एस्क्रो में सुरक्षित है।`
      : `Congratulations! You accepted the offer for ${crop}. 35% advance deposit locked in escrow.`;

    speakText(msg, lang);
    alert(`🎉 ${msg}`);
  }

  // Bank Withdrawal
  function openFarmerLiteWithdrawModal() {
    injectFarmerLiteModals();
    const modal = document.getElementById('modal-farmer-lite-withdraw');
    if (modal) modal.style.display = 'flex';
  }

  function closeFarmerLiteWithdrawModal() {
    const modal = document.getElementById('modal-farmer-lite-withdraw');
    if (modal) modal.style.display = 'none';
  }

  function executeFarmerInstantBankTransfer() {
    closeFarmerLiteWithdrawModal();
    const lang = getCurrentLang();
    const msg = (lang === 'mr')
      ? `पैसे बँक खात्यात यशस्वीरीत्या वर्ग झाले आहेत! संदर्भ क्रमांक: UPI-AGRI-882109`
      : (lang === 'hi')
      ? `पैसे सफलतापूर्वक आपके बैंक खाते में ट्रांसफर हो गए हैं!`
      : `₹ 4,85,000 transferred instantly to your HDFC bank account!`;

    speakText(msg, lang);
    alert(`✓ ${msg}`);
  }

  // Filter Helper
  function filterFarmerProduce(cat) {
    activeLiteFilter = cat;
    renderFarmerLiteInterface();
  }

  // Floating Voice Mic Speech Recognition
  function startFarmerFloatingVoiceCommand() {
    const micBtn = document.getElementById('lite-floating-voice-mic');
    if (micBtn) micBtn.classList.add('listening');

    const lang = getCurrentLang();
    const voiceLang = lang === 'mr' ? 'mr-IN' : (lang === 'hi' ? 'hi-IN' : 'en-IN');

    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      speakText(lang === 'mr' ? 'तुमचा ब्राऊझर व्हॉईस सपोर्ट करत नाही.' : 'Voice recognition not supported.', lang);
      if (micBtn) micBtn.classList.remove('listening');
      return;
    }

    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognizer = new SpeechRec();
    recognizer.lang = voiceLang;
    recognizer.interimResults = false;

    recognizer.onstart = () => {
      speakText(lang === 'mr' ? 'मी ऐकत आहे, बोला.' : (lang === 'hi' ? 'बोलिए, मैं सुन रहा हूँ।' : 'Listening, speak now.'), lang);
    };

    recognizer.onresult = (event) => {
      const text = event.results[0][0].transcript.toLowerCase();
      if (micBtn) micBtn.classList.remove('listening');
      processFarmerVoiceCommand(text);
    };

    recognizer.onerror = () => {
      if (micBtn) micBtn.classList.remove('listening');
      speakText(lang === 'mr' ? 'आवाज ऐकू आला नाही, पुन्हा बोला.' : 'Could not understand, please try again.', lang);
    };

    recognizer.onend = () => {
      if (micBtn) micBtn.classList.remove('listening');
    };

    recognizer.start();
  }

  function startVoiceCropListing() {
    startFarmerFloatingVoiceCommand();
  }

  function openFarmerLiteVoiceSearch() {
    startFarmerFloatingVoiceCommand();
  }

  function processFarmerVoiceCommand(text) {
    const lang = getCurrentLang();

    if (text.includes('पिक') || text.includes('फसल') || text.includes('crop') || text.includes('माझी पिके')) {
      switchFarmerLiteSection('produce');
      speakText(lang === 'mr' ? 'माझी पिके विभाग उघडला आहे.' : 'Showing your crops.', lang);
    } else if (text.includes('भाव') || text.includes('बाजार') || text.includes('मंडी') || text.includes('rate') || text.includes('price')) {
      switchFarmerLiteSection('insights');
      speakText(lang === 'mr' ? 'थेट बाजार भाव आणि सल्ला.' : 'Showing live mandi benchmark.', lang);
    } else if (text.includes('ऑफर') || text.includes('बोली') || text.includes('bid') || text.includes('व्यापारी')) {
      switchFarmerLiteSection('bids');
      speakText(lang === 'mr' ? 'खरेदीदारांच्या ऑफर्स.' : 'Showing buyer offers.', lang);
    } else if (text.includes('गाडी') || text.includes('वाहतूक') || text.includes('ड्रायव्हर') || text.includes('truck') || text.includes('order')) {
      switchFarmerLiteSection('orders');
      speakText(lang === 'mr' ? 'वाहतूक व गाड्यांची माहिती.' : 'Showing shipment trucks.', lang);
    } else if (text.includes('पैसे') || text.includes('बँक') || text.includes('एस्क्रो') || text.includes('payment') || text.includes('खाते')) {
      switchFarmerLiteSection('escrow');
      speakText(lang === 'mr' ? 'तुमचे बँक आणि एस्क्रो खाते.' : 'Showing escrow and payouts.', lang);
    } else if (text.includes('विक') || text.includes('sell') || text.includes('नोंद') || text.includes('add')) {
      openFarmerLiteAddCropModal();
      speakText(lang === 'mr' ? 'नवीन पीक विक्री फॉर्म उघडला आहे.' : 'Opening sell crop form.', lang);
    } else {
      speakText(lang === 'mr' ? `मी समजलो: ${text}` : `Recognized: ${text}`, lang);
    }
  }

  // Expose Global functions
  window.toggleFarmerLiteMode = toggleFarmerLiteMode;
  window.setFarmerLiteSpeechRate = setFarmerLiteSpeechRate;
  window.setFarmerLiteFontSize = setFarmerLiteFontSize;
  window.toggleFarmerSunlightMode = toggleFarmerSunlightMode;
  window.setFarmerLiteLang = setFarmerLanguage;
  window.switchFarmerLiteSection = switchFarmerLiteSection;
  window.openFarmerLiteAddCropModal = openFarmerLiteAddCropModal;
  window.closeFarmerLiteAddCropModal = closeFarmerLiteAddCropModal;
  window.selectFarmerLiteCrop = selectFarmerLiteCrop;
  window.setFarmerLiteQty = setFarmerLiteQty;
  window.adjustFarmerLiteRate = adjustFarmerLiteRate;
  window.submitFarmerLiteAddCrop = submitFarmerLiteAddCrop;
  window.openFarmerLiteCounterOfferModal = openFarmerLiteCounterOfferModal;
  window.closeFarmerLiteCounterModal = closeFarmerLiteCounterModal;
  window.selectFarmerCounterDelta = selectFarmerCounterDelta;
  window.submitFarmerCounterOffer = submitFarmerCounterOffer;
  window.acceptFarmerLiteBid = acceptFarmerLiteBid;
  window.openFarmerLiteWithdrawModal = openFarmerLiteWithdrawModal;
  window.closeFarmerLiteWithdrawModal = closeFarmerLiteWithdrawModal;
  window.executeFarmerInstantBankTransfer = executeFarmerInstantBankTransfer;
  window.filterFarmerProduce = filterFarmerProduce;
  window.startFarmerFloatingVoiceCommand = startFarmerFloatingVoiceCommand;
  window.startVoiceCropListing = startVoiceCropListing;
  window.openFarmerLiteVoiceSearch = openFarmerLiteVoiceSearch;
  window.openFarmerLiteBidsForLot = (lotId) => {
    switchFarmerLiteSection('bids');
  };
  window.speakText = speakText;
  window.setLitePriceUnit = setLitePriceUnit;
  window.selectLiteCrop = selectLiteCrop;
  window.speakLiteActiveCropAdvice = speakLiteActiveCropAdvice;
  window.speakLiteMarketOverview = speakLiteMarketOverview;
  window.triggerLiteMandiRefresh = triggerLiteMandiRefresh;
  window.initLiteMarketChart = initLiteMarketChart;

  // Auto initialize on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFarmerLiteMode);
  } else {
    initFarmerLiteMode();
  }

})();
