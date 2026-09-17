/**
 * AgriNex Buyer Module - Simple & Audio-First Lite Mode (सरल मोड / सुलभ मोड)
 * Designed specifically for elderly, low-vision, or non-literate traders and buyers.
 * Supports:
 *  - English (en)
 *  - Hindi (hi - हिन्दी)
 *  - Marathi (mr - मराठी)
 *
 * Sections Supported:
 * 1. 🌾 Buy Farm Produce (26+ Verified Crop Lots with 1-Tap Voice Readout & Stepper)
 * 2. 🤝 1-Tap Quick Bargain & Counter-Offer Modal (Option B: Dedicated Card Action)
 * 3. 🚚 My Orders & Live Trucks (Live Highway Milestones, Driver Phone, GPS Location & Audio Status)
 * 4. 🛡️ Safe Escrow Vault (3-Step Visual Protection, Safe Advances & Invoices)
 */

(function () {
  'use strict';

  let isLiteMode = localStorage.getItem('agrinex_buyer_lite_mode') === 'true';
  let activeLiteSection = 'produce'; // 'produce' | 'orders' | 'escrow'
  let activeLiteFilter = 'all';
  let currentSpeechRate = parseFloat(localStorage.getItem('agrinex_lite_speech_rate')) || 0.90;
  let currentFontSize = localStorage.getItem('agrinex_lite_font_size') || 'md';
  let isSunlightMode = localStorage.getItem('agrinex_lite_sunlight_mode') === 'true';

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
      buyNow: '🟢 Buy Now',
      bargainBtn: '🤝 Bargain',
      callFarmer: '📞 Call',
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
      driverLabel: 'Driver & Vehicle',
      sunlightMode: 'Sunlight Mode',
      normalMode: 'Normal Mode',
      quickQuantity: '⚡ 1-Tap Quick Quantity (Bags):',
      whatsappShare: 'Share on WhatsApp',
      step1Title: '🔒 35% Deposit Locked',
      step1Desc: 'Money stays secure in the bank escrow account during truck transit.',
      step2Title: '🚛 Produce Inspection',
      step2Desc: 'Inspect moisture, grade, and weight at your warehouse upon arrival.',
      step3Title: '💸 Payment Released',
      step3Desc: 'Farmer receives final balance instantly after your 1-tap approval.',
      voiceGrievanceBtn: 'Voice Dispute / Grievance',
      voiceGrievanceTitle: '1-Tap Voice Dispute',
      voiceGrievanceSub: 'Record a 15-second voice note about quality, moisture, or weight issue.',
      grievancePrompt: '🎙️ Tap mic button to speak issue',
      recording: '🔴 Recording... Speak your issue',
      ticketGenerated: '✓ Dispute Ticket Registered Successfully! An AgriNex arbitrator has been assigned.',
      submitTicket: '🚨 Submit Ticket',
      mandiDispatch: 'Mandi Yard',
      highwayCheck: 'Highway Checkpoint',
      warehouseDest: 'Your Warehouse',
      floatingMicText: 'Speak Command',
      bargainModalTitle: '1-Tap Price Bargain (Counter-Offer)',
      farmerListedRate: 'Farmer Listed Rate:',
      yourCounterRate: 'Your Counter Offer:',
      quickBargainPill: '⚡ Select 1-Tap Counter Rate:',
      voiceBargainBtn: 'बोलून भाव सांगा (Speak Counter Rate)',
      sendBargainOffer: '💬 Send Offer to Farmer',
      bargainOfferSent: 'Counter-offer sent to farmer! Farmer will review and notify you.',
      youSaveText: 'You Save'
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
      buyNow: '🟢 खरीदें (Buy)',
      bargainBtn: '🤝 भाव घटाएं',
      callFarmer: '📞 कॉल करें',
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
      driverLabel: 'ड्राइवर व गाड़ी नंबर',
      sunlightMode: 'धूप मोड (Sunlight)',
      normalMode: 'सामान्य थीम',
      quickQuantity: '⚡ 1-क्लिक बोरी मात्रा:',
      whatsappShare: 'व्हाट्सएप पर भेजें',
      step1Title: '🔒 35% अग्रिम सुरक्षित',
      step1Desc: 'गाड़ी के गोदाम पहुंचने तक पैसा बैंक एस्क्रो में पूरी तरह सुरक्षित रहता है।',
      step2Title: '🚛 माल व गुणवत्ता जांच',
      step2Desc: 'गोदाम में गाड़ी आने पर नमी, ग्रेड और वजन की स्वयं जांच करें।',
      step3Title: '💸 किसान को भुगतान',
      step3Desc: 'आपके 1-क्लिक सत्यापन के बाद किसान को शेष राशि तुरंत जारी होती है।',
      voiceGrievanceBtn: 'आवाज़ में शिकायत (Dispute)',
      voiceGrievanceTitle: '1-क्लिक आवाज़ में शिकायत',
      voiceGrievanceSub: 'गुणवत्ता, नमी या वजन की समस्या के लिए 15-सेकंड का वॉयस नोट रिकॉर्ड करें।',
      grievancePrompt: '🎙️ माइक दबाएं और शिकायत बोलें',
      recording: '🔴 रिकॉर्डिंग चालू है... बोलिए',
      ticketGenerated: '✓ शिकायत सफलतापूर्वक दर्ज हो गई है! मध्यस्थ अधिकारी नियुक्त किया गया है।',
      submitTicket: '🚨 शिकायत भेजें',
      mandiDispatch: 'मंडी प्रस्थान',
      highwayCheck: 'हाइवे चेकपॉइंट',
      warehouseDest: 'आपका गोदाम',
      floatingMicText: 'बोलकर आदेश दें',
      bargainModalTitle: '1-क्लिक मोलभाव (Counter-Offer)',
      farmerListedRate: 'किसान का निर्धारित भाव:',
      yourCounterRate: 'आपकी प्रस्तावित दर (ऑफर):',
      quickBargainPill: '⚡ 1-क्लिक कम भाव चुनें:',
      voiceBargainBtn: 'बोलकर भाव बताएं (Voice Rate)',
      sendBargainOffer: '💬 किसान को ऑफर भेजें',
      bargainOfferSent: 'किसान को कम भाव का प्रस्ताव भेज दिया गया है! किसान जल्द उत्तर देंगे।',
      youSaveText: 'बचत'
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
      buyNow: '🟢 खरेदी (Buy)',
      bargainBtn: '🤝 भाव करा',
      callFarmer: '📞 फोन करा',
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
      driverLabel: 'चालक व गाडी क्रमांक',
      sunlightMode: 'ऊन मोड (Sunlight)',
      normalMode: 'सामान्य थीम',
      quickQuantity: '⚡ १-क्लिक बोरी निवडा:',
      whatsappShare: 'WhatsApp वर पाठवा',
      step1Title: '🔒 ३५% अनामत सुरक्षित',
      step1Desc: 'गाडी गोदामात पोहोचेपर्यंत सर्व पैसे बँक एस्क्रोमध्ये पूर्ण सुरक्षित राहतात.',
      step2Title: '🚛 शेतीमाल व प्रत तपासणी',
      step2Desc: 'गोदामात गाडी आल्यावर ओलावा, प्रत आणि वजन स्वतः तपासा.',
      step3Title: '💸 शेतकऱ्याला पैसे वर्ग',
      step3Desc: 'तुमच्या १-क्लिक मान्यतेनंतर शेतकऱ्याला उरलेली रक्कम तत्काळ दिली जाते.',
      voiceGrievanceBtn: 'आवाजात तक्रार (Dispute)',
      voiceGrievanceTitle: '१-क्लिक आवाजात तक्रार',
      voiceGrievanceSub: 'प्रत, ओलावा किंवा वजनातील त्रुटीसाठी १५-सेकंदाची व्हॉईस क्लिप रेकॉर्ड करा.',
      grievancePrompt: '🎙️ माइक बटण दाबा आणि तक्रार बोला',
      recording: '🔴 रेकॉर्डिंग सुरू आहे... बोला',
      ticketGenerated: '✓ तक्रार यशस्वीरीत्या नोंदवली गेली आहे! अधिकृत लवादाकडे सोपवण्यात आली आहे.',
      submitTicket: '🚨 तक्रार पाठवा',
      mandiDispatch: 'मार्केट यार्ड',
      highwayCheck: 'टोल नाका / महामार्ग',
      warehouseDest: 'तुमचे गोदाम',
      floatingMicText: 'बोलून आदेश द्या',
      bargainModalTitle: '१-क्लिक भाव कमी करा (Counter-Offer)',
      farmerListedRate: 'शेतकऱ्याचा मूळ भाव:',
      yourCounterRate: 'तुमचा प्रस्तावित दर (ऑफर):',
      quickBargainPill: '⚡ १-क्लिक कमी दर निवडा:',
      voiceBargainBtn: 'बोलून भाव सांगा (Voice Rate)',
      sendBargainOffer: '💬 शेतकऱ्याला भाव पाठवा',
      bargainOfferSent: 'शेतकऱ्याकडे कमी दराचा प्रस्ताव पाठवला आहे! शेतकरी लवकरच प्रतिसाद देतील.',
      youSaveText: 'बचत'
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

    // Apply saved accessibility preferences
    setLiteSpeechRate(currentSpeechRate, false);
    setLiteFontSize(currentFontSize);
    if (isSunlightMode) {
      document.body.classList.add('lite-sunlight-mode');
    }

    // Listen to global language change event
    window.addEventListener('agrinex_language_changed', function (e) {
      const newLang = e.detail ? e.detail.lang : getCurrentLang();
      updateLiteModeLanguage(newLang);
    });
  }

  function setLiteSpeechRate(rate, announce = true) {
    currentSpeechRate = rate;
    localStorage.setItem('agrinex_lite_speech_rate', rate);

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

  function setLiteFontSize(size) {
    currentFontSize = size;
    localStorage.setItem('agrinex_lite_font_size', size);

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

  function toggleSunlightMode() {
    isSunlightMode = !isSunlightMode;
    localStorage.setItem('agrinex_lite_sunlight_mode', isSunlightMode ? 'true' : 'false');
    document.body.classList.toggle('lite-sunlight-mode', isSunlightMode);

    const dict = getDict();
    const txt = document.getElementById('lite-sunlight-text');
    if (txt) {
      txt.textContent = isSunlightMode ? dict.normalMode : dict.sunlightMode;
    }
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
    if (!lang) lang = getCurrentLang();
    const dict = LITE_I18N[lang] || LITE_I18N.en;
    
    // 1. Update Simple Mode Language Bar Pills
    const btnEn = document.getElementById('lite-lang-en');
    const btnHi = document.getElementById('lite-lang-hi');
    const btnMr = document.getElementById('lite-lang-mr');
    if (btnEn) {
      btnEn.style.background = (lang === 'en') ? '#0c5a36' : 'transparent';
      btnEn.style.color = (lang === 'en') ? '#ffffff' : '#475569';
    }
    if (btnHi) {
      btnHi.style.background = (lang === 'hi') ? '#0c5a36' : 'transparent';
      btnHi.style.color = (lang === 'hi') ? '#ffffff' : '#475569';
    }
    if (btnMr) {
      btnMr.style.background = (lang === 'mr') ? '#0c5a36' : 'transparent';
      btnMr.style.color = (lang === 'mr') ? '#ffffff' : '#475569';
    }

    // 2. Update Toggle Button Text
    const toggleBtn = document.getElementById('btn-toggle-lite-mode');
    if (toggleBtn) updateToggleBtnState(toggleBtn);

    // 3. Update Top Tabs
    const tProduce = document.getElementById('lite-tab-produce-text');
    if (tProduce) tProduce.textContent = dict.tabProduce;

    const tOrders = document.getElementById('lite-tab-orders-text');
    if (tOrders) tOrders.textContent = dict.tabOrders;

    const tEscrow = document.getElementById('lite-tab-escrow-text');
    if (tEscrow) tEscrow.textContent = dict.tabEscrow;

    // 4. Update Hero Banner Elements
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

    // 5. Update Category Pills
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

    // 6. Update Orders & Escrow Titles
    const ordTitle = document.getElementById('lite-orders-title');
    if (ordTitle) ordTitle.textContent = dict.ordersTitle;

    const ordSub = document.getElementById('lite-orders-subtitle');
    if (ordSub) ordSub.textContent = dict.ordersSubtitle;

    const ordAud = document.getElementById('lite-orders-audio-btn');
    if (ordAud) ordAud.textContent = dict.listenStatus;

    const grievBtn = document.getElementById('lite-grievance-btn-text');
    if (grievBtn) grievBtn.textContent = dict.voiceGrievanceBtn;

    const escTitle = document.getElementById('lite-escrow-title');
    if (escTitle) escTitle.textContent = dict.escrowTitle;

    const escSub = document.getElementById('lite-escrow-subtitle');
    if (escSub) escSub.textContent = dict.escrowSubtitle;

    // Escrow 3 Steps
    const s1Title = document.getElementById('lite-step1-title');
    if (s1Title) s1Title.textContent = dict.step1Title;
    const s1Desc = document.getElementById('lite-step1-desc');
    if (s1Desc) s1Desc.textContent = dict.step1Desc;

    const s2Title = document.getElementById('lite-step2-title');
    if (s2Title) s2Title.textContent = dict.step2Title;
    const s2Desc = document.getElementById('lite-step2-desc');
    if (s2Desc) s2Desc.textContent = dict.step2Desc;

    const s3Title = document.getElementById('lite-step3-title');
    if (s3Title) s3Title.textContent = dict.step3Title;
    const s3Desc = document.getElementById('lite-step3-desc');
    if (s3Desc) s3Desc.textContent = dict.step3Desc;

    // Floating mic
    const flMic = document.getElementById('lite-floating-mic-label');
    if (flMic) flMic.textContent = dict.floatingMicText;

    // Sunlight theme button
    const sunTxt = document.getElementById('lite-sunlight-text');
    if (sunTxt) sunTxt.textContent = isSunlightMode ? dict.normalMode : dict.sunlightMode;

    // 7. Update Buy Modal Labels
    const modalPriceLbl = document.getElementById('lite-modal-price-label');
    if (modalPriceLbl) modalPriceLbl.textContent = dict.rateLabel + ':';

    const modalQtyLbl = document.getElementById('lite-modal-qty-label');
    if (modalQtyLbl) modalQtyLbl.textContent = dict.qtyTextLabel + ':';

    const modalTotalLbl = document.getElementById('lite-modal-total-label');
    if (modalTotalLbl) modalTotalLbl.textContent = dict.totalLabel + ':';

    const modalEscrowLbl = document.getElementById('lite-modal-escrow-label');
    if (modalEscrowLbl) modalEscrowLbl.textContent = dict.escrowNote + ':';

    const modalCancelBtn = document.getElementById('lite-modal-btn-cancel-text');
    if (modalCancelBtn) modalCancelBtn.textContent = dict.cancel;

    const modalConfirmBtn = document.getElementById('lite-modal-btn-confirm-text');
    if (modalConfirmBtn) modalConfirmBtn.textContent = dict.confirmBuy;

    const stepLbl = document.getElementById('lite-stepper-label');
    if (stepLbl) stepLbl.textContent = dict.quickQuantity;

    // 8. Update Bargain Modal Labels
    const bTitle = document.getElementById('lite-bargain-modal-title');
    if (bTitle) bTitle.textContent = dict.bargainModalTitle;

    const bFarmRate = document.getElementById('lite-bargain-farmer-rate-label');
    if (bFarmRate) bFarmRate.textContent = dict.farmerListedRate;

    const bCountRate = document.getElementById('lite-bargain-counter-rate-label');
    if (bCountRate) bCountRate.textContent = dict.yourCounterRate;

    const bQuickLbl = document.getElementById('lite-bargain-quick-label');
    if (bQuickLbl) bQuickLbl.textContent = dict.quickBargainPill;

    const bVoiceLbl = document.getElementById('lite-bargain-voice-label');
    if (bVoiceLbl) bVoiceLbl.textContent = dict.voiceBargainBtn;

    const bSendBtn = document.getElementById('lite-bargain-btn-send');
    if (bSendBtn) bSendBtn.textContent = dict.sendBargainOffer;

    // 9. Re-render active section
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
    const floatingMic = document.getElementById('lite-floating-voice-mic');

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
      if (floatingMic) floatingMic.style.display = 'flex';
    } else {
      document.body.classList.remove('lite-mode-active');
      if (liteContainer) liteContainer.style.display = 'none';
      if (sidebar) sidebar.style.display = 'flex';
      if (headerSearch) headerSearch.style.display = 'flex';
      if (floatingCopilot) floatingCopilot.style.display = 'flex';
      if (floatingMic) floatingMic.style.display = 'none';
      
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
  // 1. RENDER PRODUCE LOTS (Option B: 3 Action Buttons - Buy / Bargain / Call)
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
      const displayCropName = (currentLang === 'en') ? (lot.crop || trans.en) : (trans[currentLang] || trans.en || lot.crop);
      const bagsCount = Math.round((lot.availableQtyKg || lot.quantityKg || 5000) / 50); // 50kg per bag

      // Localize farmer name & location if i18n engine is present
      const farmerName = (currentLang === 'en') ? lot.farmerName : (
        (window.AgriNexI18n && typeof window.AgriNexI18n.tPerson === 'function') 
          ? window.AgriNexI18n.tPerson(lot.farmerName) : lot.farmerName
      );
      const farmerLocation = (currentLang === 'en') ? lot.farmerLocation : (
        (window.AgriNexI18n && typeof window.AgriNexI18n.tLocation === 'function')
          ? window.AgriNexI18n.tLocation(lot.farmerLocation) : lot.farmerLocation
      );
      const displayGrade = (currentLang === 'en') ? (lot.grade || 'Grade A') : (
        (window.AgriNexI18n && typeof window.AgriNexI18n.tGrade === 'function')
          ? window.AgriNexI18n.tGrade(lot.grade || 'Grade A') : (lot.grade || 'Grade A')
      );

      return `
        <div class="lite-produce-card">
          
          <!-- Top Badge Bar -->
          <div class="lite-card-topbar">
            <span class="lite-crop-tag">${displayCropName}</span>
            <span class="lite-grade-tag">✓ ${displayGrade}</span>
          </div>

          <!-- Large Crop Picture -->
          <div class="lite-img-container">
            <img src="${lot.image}" alt="${lot.crop}" class="lite-crop-img" onerror="this.src='assets/images/tomato.jpg'" />
            <button type="button" class="lite-audio-btn" id="audio-btn-${lot.id}" onclick="speakLotDetails('${lot.id}', this)" title="Listen Audio Readout / आवाज़ में सुनें / आवाजात ऐका">
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

          <!-- OPTION B: 3 Action Buttons (Buy Now, 1-Tap Bargain, Call Farmer) -->
          <div class="lite-card-actions">
            <button type="button" class="lite-btn-buy" onclick="openLiteBuyModal('${lot.id}')">
              ${dict.buyNow}
            </button>
            <button type="button" class="lite-btn-bargain" onclick="openLiteBargainModal('${lot.id}')" title="1-Tap Bargain / भाव कमी करा">
              ${dict.bargainBtn}
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
  // 2. 1-TAP QUICK BARGAIN & COUNTER-OFFER WORKFLOW (OPTION B)
  // =========================================================================

  let currentBargainLot = null;
  let currentBargainDelta = -2;
  let currentBargainBags = 100;

  function openLiteBargainModal(lotId) {
    const lots = (window.buyerData && window.buyerData.verifiedLots) ? window.buyerData.verifiedLots : [];
    const lot = lots.find(l => l.id === lotId) || lots[0];
    if (!lot) return;

    currentBargainLot = lot;
    currentBargainDelta = -2;
    const maxKg = lot.availableQtyKg || lot.quantityKg || 5000;
    currentBargainBags = Math.round(maxKg / 50);

    const modal = document.getElementById('modal-lite-bargain');
    if (!modal) return;

    updateLiteBargainModalDisplay();
    modal.classList.add('active');

    const currentLang = getCurrentLang();
    const cropKey = Object.keys(CROP_TRANSLATIONS).find(k => lot.crop.toLowerCase().includes(k.toLowerCase())) || 'Tomato';
    const trans = CROP_TRANSLATIONS[cropKey] || { en: lot.crop, hi: lot.crop, mr: lot.crop };
    const displayCrop = trans[currentLang] || lot.crop;
    const origKgPrice = Number(lot.pricePerKg || (lot.priceNum ? (lot.priceNum / 100).toFixed(0) : '20'));
    const offerPrice = Math.max(1, origKgPrice + currentBargainDelta);

    let promptSpeech = '';
    if (currentLang === 'hi') {
      promptSpeech = `${displayCrop} के लिए किसान का भाव ₹ ${origKgPrice} रुपये है। ₹ ${offerPrice} रुपये का काउंटर ऑफर भेजने के लिए नीला बटन दबाएं।`;
    } else if (currentLang === 'mr') {
      promptSpeech = `${displayCrop} साठी शेतकऱ्याचा भाव ₹ ${origKgPrice} आहे. ₹ ${offerPrice} भावाची ऑफर देण्यासाठी निळे बटण दाबा.`;
    } else {
      promptSpeech = `Farmer's rate for ${lot.crop} is Rupees ${origKgPrice}. Tap the blue button to send a counter-offer of Rupees ${offerPrice}.`;
    }

    speakText(promptSpeech, currentLang);
  }

  function selectBargainRateDelta(delta) {
    currentBargainDelta = delta;
    document.querySelectorAll('.lite-bargain-rate-btn').forEach(btn => btn.classList.remove('active'));
    if (delta === -1) {
      const b = document.getElementById('btn-bargain-minus1');
      if (b) b.classList.add('active');
    } else if (delta === -2) {
      const b = document.getElementById('btn-bargain-minus2');
      if (b) b.classList.add('active');
    } else if (delta === -3) {
      const b = document.getElementById('btn-bargain-minus3');
      if (b) b.classList.add('active');
    }
    updateLiteBargainModalDisplay();
  }

  function changeLiteBargainQuantity(deltaBags) {
    if (!currentBargainLot) return;
    const maxBags = Math.round((currentBargainLot.availableQtyKg || currentBargainLot.quantityKg || 5000) / 50);
    currentBargainBags = Math.max(10, Math.min(maxBags, currentBargainBags + deltaBags));
    updateLiteBargainModalDisplay();
  }

  function updateLiteBargainModalDisplay() {
    if (!currentBargainLot) return;
    const dict = getDict();
    const currentLang = getCurrentLang();
    const cropKey = Object.keys(CROP_TRANSLATIONS).find(k => currentBargainLot.crop.toLowerCase().includes(k.toLowerCase())) || 'Tomato';
    const trans = CROP_TRANSLATIONS[cropKey] || { en: currentBargainLot.crop, hi: currentBargainLot.crop, mr: currentBargainLot.crop };
    const displayCrop = trans[currentLang] || currentBargainLot.crop;

    const origPrice = Number(currentBargainLot.pricePerKg || (currentBargainLot.priceNum ? (currentBargainLot.priceNum / 100).toFixed(0) : '20'));
    const offerPrice = Math.max(1, origPrice + currentBargainDelta);
    const totalKg = currentBargainBags * 50;
    const totalOffer = Math.round(totalKg * offerPrice);
    const savings = Math.round(totalKg * Math.abs(currentBargainDelta));

    const farmerName = (window.AgriNexI18n && typeof window.AgriNexI18n.tPerson === 'function') 
      ? window.AgriNexI18n.tPerson(currentBargainLot.farmerName) : currentBargainLot.farmerName;
    const farmerLocation = (window.AgriNexI18n && typeof window.AgriNexI18n.tLocation === 'function')
      ? window.AgriNexI18n.tLocation(currentBargainLot.farmerLocation) : currentBargainLot.farmerLocation;

    document.getElementById('lite-bargain-img').src = currentBargainLot.image;
    document.getElementById('lite-bargain-crop-name').textContent = displayCrop;
    document.getElementById('lite-bargain-farmer-info').textContent = `${dict.farmerLabel}: ${farmerName} • 📍 ${farmerLocation}`;
    document.getElementById('lite-bargain-orig-rate').textContent = `₹ ${origPrice} ${dict.perKg}`;
    document.getElementById('lite-bargain-offer-rate').textContent = `₹ ${offerPrice} ${dict.perKg}`;
    document.getElementById('lite-bargain-total-offer').textContent = `${dict.totalLabel}: ₹ ${totalOffer.toLocaleString('en-IN')}`;
    document.getElementById('lite-bargain-savings-badge').textContent = `💰 ${dict.youSaveText} ₹ ${savings.toLocaleString('en-IN')}!`;
    document.getElementById('lite-bargain-qty-val').textContent = `${totalKg.toLocaleString('en-IN')} kg (${currentBargainBags} ${dict.bags})`;
  }

  function closeLiteBargainModal() {
    const modal = document.getElementById('modal-lite-bargain');
    if (modal) modal.classList.remove('active');
    stopLiteSpeech();
  }

  function sendLiteBargainOffer() {
    if (!currentBargainLot) return;
    const dict = getDict();
    const currentLang = getCurrentLang();
    const origPrice = Number(currentBargainLot.pricePerKg || 20);
    const offerPrice = Math.max(1, origPrice + currentBargainDelta);
    const totalKg = currentBargainBags * 50;

    closeLiteBargainModal();

    speakText(dict.bargainOfferSent, currentLang);
    if (typeof showToast === 'function') {
      showToast(`🤝 ₹ ${offerPrice}/kg Offer sent to ${currentBargainLot.farmerName}!`, 'success');
    }

    // Open WhatsApp Counter Message
    const farmerName = (window.AgriNexI18n && typeof window.AgriNexI18n.tPerson === 'function') ? window.AgriNexI18n.tPerson(currentBargainLot.farmerName) : currentBargainLot.farmerName;
    let waMsg = '';
    if (currentLang === 'mr') {
      waMsg = `नमस्कार ${farmerName}जी,\n\nमी AgriNex वरून आपल्या ${currentBargainLot.crop} साठी ₹ ${offerPrice}/किलो दराने एकूण ${totalKg} किलो ( ${currentBargainBags} बोरी ) खरेदीचा प्रस्ताव पाठवत आहे.\nकृपया मान्यता द्या. ३५% एस्क्रो अग्रिम तयार आहे.\n\n🔗 थेट मान्यता लिंक: https://agrinex.in/offer`;
    } else if (currentLang === 'hi') {
      waMsg = `नमस्ते ${farmerName}जी,\n\nमैं AgriNex से आपकी ${currentBargainLot.crop} फसल के लिए ₹ ${offerPrice}/किलो के भाव से कुल ${totalKg} किलो (${currentBargainBags} बोरी) की खरीद का प्रस्ताव भेज रहा हूँ।\nकृपया स्वीकार करें। 35% एस्क्रो अग्रिम तैयार है।\n\n🔗 सीधा लिंक: https://agrinex.in/offer`;
    } else {
      waMsg = `Hello ${farmerName},\n\nI am sending a counter-offer of ₹ ${offerPrice}/kg for ${totalKg} kg (${currentBargainBags} bags) of ${currentBargainLot.crop} via AgriNex.\n35% Escrow advance is ready.\n\n🔗 Direct Approval Link: https://agrinex.in/offer`;
    }

    setTimeout(() => {
      window.open(`https://wa.me/?text=${encodeURIComponent(waMsg)}`, '_blank');
    }, 1200);
  }

  function startVoiceBargainOffer() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is not supported on this browser.");
      return;
    }

    const dict = getDict();
    const currentLang = getCurrentLang();
    const recLang = currentLang === 'hi' ? 'hi-IN' : (currentLang === 'mr' ? 'mr-IN' : 'en-IN');

    speakText("तुम्हाला काय भाव पाहिजे? बोला.", currentLang);

    setTimeout(() => {
      const recognizer = new SpeechRecognition();
      recognizer.lang = recLang;
      recognizer.start();

      recognizer.onresult = function (event) {
        const spoken = event.results[0][0].transcript;
        const numbers = spoken.match(/\d+/);
        if (numbers && numbers[0] && currentBargainLot) {
          const parsedRate = parseInt(numbers[0], 10);
          const origPrice = Number(currentBargainLot.pricePerKg || 20);
          if (parsedRate > 0 && parsedRate <= origPrice) {
            currentBargainDelta = parsedRate - origPrice;
            document.querySelectorAll('.lite-bargain-rate-btn').forEach(btn => btn.classList.remove('active'));
            updateLiteBargainModalDisplay();
            speakText(`तुमचा दर ₹ ${parsedRate} रुपये निवडला आहे.`, currentLang);
            return;
          }
        }
        speakText("आवाज समजला नाही. कृपया बटनांवर क्लिक करा.", currentLang);
      };
    }, 1000);
  }

  // =========================================================================
  // 3. RENDER LIVE ORDERS & TRUCKS TRACKING WITH HIGHWAY MILESTONES
  // =========================================================================

  function renderLiteOrdersList() {
    const list = document.getElementById('lite-orders-list');
    if (!list) return;

    const dict = getDict();
    const currentLang = getCurrentLang();
    const consignments = (window.buyerData && window.buyerData.consignments) ? window.buyerData.consignments : [];

    list.innerHTML = consignments.map(c => {
      const farmerName = (currentLang === 'en') ? c.farmer : (
        (window.AgriNexI18n && typeof window.AgriNexI18n.tPerson === 'function') ? window.AgriNexI18n.tPerson(c.farmer) : c.farmer
      );
      const driverName = (currentLang === 'en') ? c.driver : (
        (window.AgriNexI18n && typeof window.AgriNexI18n.tPerson === 'function') ? window.AgriNexI18n.tPerson(c.driver) : c.driver
      );
      const vehicleName = (currentLang === 'en') ? c.vehicle : (
        (window.AgriNexI18n && typeof window.AgriNexI18n.tVehicle === 'function') ? window.AgriNexI18n.tVehicle(c.vehicle) : c.vehicle
      );
      const cropName = (currentLang === 'en') ? c.crop : (
        (window.AgriNexI18n && typeof window.AgriNexI18n.tCrop === 'function') ? window.AgriNexI18n.tCrop(c.crop) : c.crop
      );
      const locName = (currentLang === 'en') ? c.loc : (
        (window.AgriNexI18n && typeof window.AgriNexI18n.tLocation === 'function') ? window.AgriNexI18n.tLocation(c.loc) : c.loc
      );

      const totalVal = Math.round(c.quantity_kg * 22);

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

          <!-- Visual Highway Journey Milestones -->
          <div class="lite-milestone-bar">
            <div class="lite-milestone-progress"></div>
            <div class="lite-milestone-node">
              <div class="lite-node-icon completed">🌾</div>
              <span class="lite-node-text">${dict.mandiDispatch}</span>
            </div>
            <div class="lite-milestone-node">
              <div class="lite-node-icon current">🚚</div>
              <span class="lite-node-text">${locName}</span>
            </div>
            <div class="lite-milestone-node">
              <div class="lite-node-icon">🏬</div>
              <span class="lite-node-text">${dict.warehouseDest}</span>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px;">
            <div style="background: #ffffff; padding: 14px; border-radius: 14px; border: 1px solid #e2e8f0;">
              <span style="font-size: 0.8rem; font-weight: 700; color: #64748b; text-transform: uppercase;">${dict.locationLabel}</span>
              <strong style="font-size: 1.05rem; color: #0f172a; display: block; margin-top: 4px;">📍 ${locName}</strong>
              <span style="font-size: 0.88rem; color: #16a34a; font-weight: 700;">🕒 ${c.eta}</span>
            </div>

            <div style="background: #ffffff; padding: 14px; border-radius: 14px; border: 1px solid #e2e8f0;">
              <span style="font-size: 0.8rem; font-weight: 700; color: #64748b; text-transform: uppercase;">${dict.driverLabel}</span>
              <strong style="font-size: 1.05rem; color: #0f172a; display: block; margin-top: 4px;">🚚 ${driverName} (${vehicleName})</strong>
              <span style="font-size: 0.88rem; color: #475569;">👨‍🌾 ${dict.farmerLabel}: ${farmerName}</span>
            </div>
          </div>

          <div style="display: flex; gap: 10px; justify-content: flex-end; flex-wrap: wrap; align-items: center;">
            <button type="button" class="lite-btn-whatsapp" onclick="shareOrderOnWhatsApp('${cropName}', '${c.quantity_kg} kg', '${driverName}', '${vehicleName}', '₹ ${totalVal.toLocaleString('en-IN')}', '${locName}')">
              <span>💬</span>
              <span>${dict.whatsappShare}</span>
            </button>
            <button type="button" class="lite-btn-call" style="padding: 12px 18px; font-size: 0.98rem;" onclick="callDriverDirect('${driverName}')">
              ${dict.callDriver}
            </button>
            <button type="button" class="lite-btn-buy" style="padding: 12px 18px; font-size: 0.98rem;" onclick="speakTruckStatus('${c.crop}', '${c.loc}', '${c.eta}', '${c.vehicle}', this)">
              🔊 ${dict.listenStatus}
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // =========================================================================
  // 4. RENDER SAFE ESCROW CARDS
  // =========================================================================

  function renderLiteEscrowCards() {
    const container = document.getElementById('lite-escrow-cards');
    if (!container) return;

    const currentLang = getCurrentLang();
    let escrow1Title = '🛡️ Total Escrow Vault';
    let escrow1Desc = '100% Protected • Funds released only after produce arrives at your warehouse.';
    let escrow2Title = '📦 Active Advances';
    let escrow2Desc = '2 shipments reserved at 35% protected advance.';
    let escrow3Title = '📄 GST & Tax Invoices';
    let escrow3Count = '4 Invoices Ready';
    let escrow3Desc = 'All digital purchase orders and invoices ready for download.';

    if (currentLang === 'hi') {
      escrow1Title = '🛡️ सुरक्षित कुल शेष (Total Escrow Vault)';
      escrow1Desc = '100% सुरक्षित • माल आपके गोदाम में पहुंचने पर ही किसान को भुगतान होता है।';
      escrow2Title = '📦 चालू ऑर्डर्स अग्रिम (Active Advances)';
      escrow2Desc = '2 गाड़ियों की 35% अग्रिम राशि सुरक्षित एस्क्रो में जमा है।';
      escrow3Title = '📄 जीएसटी व कर रसीद (GST Invoices)';
      escrow3Count = '4 रसीदें तैयार';
      escrow3Desc = 'सभी डिजिटल खरीद रसीदें डाउनलोड के लिए उपलब्ध हैं।';
    } else if (currentLang === 'mr') {
      escrow1Title = '🛡️ सुरक्षित शिल्लक (Total Escrow Vault)';
      escrow1Desc = '100% सुरक्षित • माल गोदामात आल्यावरच शेतकऱ्याला पैसे मिळतात.';
      escrow2Title = '📦 चालू ऑर्डर्स अनामत (Active Advances)';
      escrow2Desc = '2 गाड्यांच्या 35% सुरक्षित ठेव खात्यात राखीव आहेत.';
      escrow3Title = '📄 कायदेशीर बिल व पावत्या (GST Invoices)';
      escrow3Count = '4 पावती तयार';
      escrow3Desc = 'सर्व डिजिटल खरेदी पावत्या डाउनलोड करण्यासाठी तयार आहेत.';
    }

    container.innerHTML = `
      <div style="background: #f0fdf4; border: 2px solid #bbf7d0; border-radius: 20px; padding: 24px;">
        <span style="font-size: 0.85rem; font-weight: 700; color: #166534; text-transform: uppercase;">${escrow1Title}</span>
        <strong style="font-size: 2.2rem; font-weight: 900; color: #15803d; display: block; margin: 8px 0;">₹ 2,45,000</strong>
        <p style="font-size: 0.95rem; color: #166534; margin: 0;">${escrow1Desc}</p>
      </div>

      <div style="background: #ffffff; border: 2px solid #e2e8f0; border-radius: 20px; padding: 24px;">
        <span style="font-size: 0.85rem; font-weight: 700; color: #64748b; text-transform: uppercase;">${escrow2Title}</span>
        <strong style="font-size: 2.2rem; font-weight: 900; color: #0f172a; display: block; margin: 8px 0;">₹ 1,01,500</strong>
        <p style="font-size: 0.95rem; color: #475569; margin: 0;">${escrow2Desc}</p>
      </div>

      <div style="background: #ffffff; border: 2px solid #e2e8f0; border-radius: 20px; padding: 24px;">
        <span style="font-size: 0.85rem; font-weight: 700; color: #64748b; text-transform: uppercase;">${escrow3Title}</span>
        <strong style="font-size: 2.2rem; font-weight: 900; color: #0284c7; display: block; margin: 8px 0;">${escrow3Count}</strong>
        <p style="font-size: 0.95rem; color: #475569; margin: 0;">${escrow3Desc}</p>
      </div>
    `;
  }

  // =========================================================================
  // AUDIO ASSISTANT HELPERS
  // =========================================================================

  function speakLotDetails(lotId, btnElem) {
    const lots = (window.buyerData && window.buyerData.verifiedLots) ? window.buyerData.verifiedLots : [];
    const lot = lots.find(l => l.id === lotId) || lots[0];
    if (!lot) return;

    if (btnElem) btnElem.classList.add('speaking');

    const currentLang = getCurrentLang();
    const cropKey = Object.keys(CROP_TRANSLATIONS).find(k => lot.crop.toLowerCase().includes(k.toLowerCase())) || 'Tomato';
    const trans = CROP_TRANSLATIONS[cropKey] || { en: lot.crop, hi: lot.crop, mr: lot.crop };
    const kgPrice = lot.pricePerKg || (lot.priceNum ? (lot.priceNum / 100).toFixed(0) : '20');

    let speechText = '';
    if (currentLang === 'hi') {
      speechText = `किसान ${lot.farmerName}, ${lot.farmerLocation} से ${trans.hi}. भाव है ₹ ${kgPrice} रुपये प्रति किलो. कुल ${lot.quantity} माल उपलब्ध है. खरीदने के लिए हरा बटन या मोलभाव के लिए नीला बटन दबाएं.`;
    } else if (currentLang === 'mr') {
      speechText = `शेतकरी ${lot.farmerName}, ${lot.farmerLocation} येथून ${trans.mr}. दर आहे ₹ ${kgPrice} रुपये प्रति किलो. एकूण ${lot.quantity} माल उपलब्ध आहे. खरेदीसाठी हिरवे किंवा भाव करण्यासाठी निळे बटण दाबा.`;
    } else {
      speechText = `Direct lot of ${lot.crop} from farmer ${lot.farmerName} in ${lot.farmerLocation}. Price is Rupees ${kgPrice} per kilogram. Total available quantity is ${lot.quantity}. Tap green to buy or blue to bargain.`;
    }

    speakText(speechText, currentLang, () => {
      if (btnElem) btnElem.classList.remove('speaking');
    });
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

  function speakTruckStatus(crop, loc, eta, vehicle, btnElem) {
    if (btnElem) btnElem.classList.add('speaking');
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
    speakText(msg, currentLang, () => {
      if (btnElem) btnElem.classList.remove('speaking');
    });
  }

  let activeLiteAudioObj = null;
  let currentLiteTTSRequestId = 0;
  let liteAbortController = null;

  async function speakText(text, langCode, onComplete) {
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
          speaker: 'meera',
          pace: currentSpeechRate
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
          audio.playbackRate = currentSpeechRate;
          audio.onended = () => {
            if (requestId === currentLiteTTSRequestId) activeLiteAudioObj = null;
            if (typeof onComplete === 'function') onComplete();
          };
          audio.onerror = () => {
            if (requestId === currentLiteTTSRequestId) fallbackLiteBrowserTTS(text, langCode, requestId, onComplete);
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
    fallbackLiteBrowserTTS(text, langCode, requestId, onComplete);
  }

  function fallbackLiteBrowserTTS(text, langCode, requestId, onComplete) {
    if (!window.speechSynthesis) return;
    if (requestId && requestId !== currentLiteTTSRequestId) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const targetLang = langCode === 'hi' ? 'hi-IN' : (langCode === 'mr' ? 'mr-IN' : 'en-IN');
    utterance.lang = targetLang;
    utterance.rate = currentSpeechRate;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      const match = voices.find(v => v.lang === targetLang || v.lang.startsWith(langCode) || (langCode === 'en' && (v.lang === 'en-IN' || v.name.includes('India'))));
      if (match) utterance.voice = match;
    }

    utterance.onend = () => {
      if (typeof onComplete === 'function') onComplete();
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
    document.querySelectorAll('.lite-audio-btn').forEach(btn => btn.classList.remove('speaking'));
  }

  // =========================================================================
  // 1-TAP SIMPLIFIED BUY CONFIRMATION MODAL & STEPPER
  // =========================================================================

  let currentLiteLot = null;
  let currentLiteBuyBags = 100;

  function openLiteBuyModal(lotId) {
    const lots = (window.buyerData && window.buyerData.verifiedLots) ? window.buyerData.verifiedLots : [];
    const lot = lots.find(l => l.id === lotId) || lots[0];
    if (!lot) return;

    currentLiteLot = lot;
    const maxKg = lot.availableQtyKg || lot.quantityKg || 5000;
    currentLiteBuyBags = Math.round(maxKg / 50); // Default to full available bags

    const modal = document.getElementById('modal-lite-buy');
    if (!modal) return;

    updateLiteBuyModalCalculations();
    modal.classList.add('active');

    const dict = getDict();
    const currentLang = getCurrentLang();
    const cropKey = Object.keys(CROP_TRANSLATIONS).find(k => lot.crop.toLowerCase().includes(k.toLowerCase())) || 'Tomato';
    const trans = CROP_TRANSLATIONS[cropKey] || { en: lot.crop, hi: lot.crop, mr: lot.crop };
    const displayCrop = trans[currentLang] || lot.crop;

    let promptSpeech = '';
    if (currentLang === 'hi') {
      promptSpeech = `${displayCrop} खरीद की पुष्टि करें। मात्रा चुनने के लिए बोरी बटन दबाएं या हरी बटन दबाकर पुष्टि करें।`;
    } else if (currentLang === 'mr') {
      promptSpeech = `${displayCrop} खरेदीची खात्री करा. बोरींचे प्रमाण बदलण्यासाठी बटणे वापरा किंवा खरेदीसाठी हिरवे बटण दाबा.`;
    } else {
      promptSpeech = `Confirm purchase of ${lot.crop}. Tap bag buttons to change quantity or tap green button to confirm.`;
    }

    speakText(promptSpeech, currentLang);
  }

  function changeLiteBuyQuantity(deltaBags) {
    if (!currentLiteLot) return;
    const maxBags = Math.round((currentLiteLot.availableQtyKg || currentLiteLot.quantityKg || 5000) / 50);
    currentLiteBuyBags = Math.max(10, Math.min(maxBags, currentLiteBuyBags + deltaBags));
    updateLiteBuyModalCalculations();
  }

  function updateLiteBuyModalCalculations() {
    if (!currentLiteLot) return;
    const dict = getDict();
    const currentLang = getCurrentLang();
    const cropKey = Object.keys(CROP_TRANSLATIONS).find(k => currentLiteLot.crop.toLowerCase().includes(k.toLowerCase())) || 'Tomato';
    const trans = CROP_TRANSLATIONS[cropKey] || { en: currentLiteLot.crop, hi: currentLiteLot.crop, mr: currentLiteLot.crop };
    const displayCrop = trans[currentLang] || currentLiteLot.crop;

    const kgPrice = Number(currentLiteLot.pricePerKg || (currentLiteLot.priceNum ? (currentLiteLot.priceNum / 100).toFixed(0) : '20'));
    const totalKg = currentLiteBuyBags * 50;
    const totalEst = Math.round(totalKg * kgPrice);
    const advance35 = Math.round(totalEst * 0.35);

    const farmerName = (window.AgriNexI18n && typeof window.AgriNexI18n.tPerson === 'function') 
      ? window.AgriNexI18n.tPerson(currentLiteLot.farmerName) : currentLiteLot.farmerName;
    const farmerLocation = (window.AgriNexI18n && typeof window.AgriNexI18n.tLocation === 'function')
      ? window.AgriNexI18n.tLocation(currentLiteLot.farmerLocation) : currentLiteLot.farmerLocation;

    document.getElementById('lite-buy-img').src = currentLiteLot.image;
    document.getElementById('lite-buy-crop-title').textContent = `${displayCrop}`;
    document.getElementById('lite-buy-farmer').textContent = `${dict.farmerLabel}: ${farmerName} (📍 ${farmerLocation})`;
    document.getElementById('lite-buy-price').textContent = `₹ ${kgPrice} ${dict.perKg}`;
    document.getElementById('lite-buy-qty').textContent = `${totalKg.toLocaleString('en-IN')} kg (${currentLiteBuyBags} ${dict.bags})`;
    document.getElementById('lite-buy-total').textContent = `₹ ${totalEst.toLocaleString('en-IN')}`;
    document.getElementById('lite-buy-advance').textContent = `₹ ${advance35.toLocaleString('en-IN')} (${dict.escrowPercent})`;
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
      showToast(`✓ ${currentLiteLot.crop} (${currentLiteBuyBags} Bags) Order Placed!`, 'success');
    }

    // Direct to PO if available
    if (typeof generateAndOpenPO === 'function') {
      setTimeout(() => {
        const kgPrice = Number(currentLiteLot.pricePerKg || 20);
        const totalEst = Math.round(currentLiteBuyBags * 50 * kgPrice);
        generateAndOpenPO(currentLiteLot.id, currentLiteLot.crop, `${(currentLiteBuyBags * 50).toLocaleString('en-IN')} kg`, currentLiteLot.farmerName, totalEst);
      }, 1500);
    }
  }

  function shareOrderOnWhatsApp(crop, qty, driver, vehicle, total, loc) {
    const currentLang = getCurrentLang();
    let text = '';
    if (currentLang === 'hi') {
      text = `🌾 *एग्रीनेक्स खरीद व वाहन रसीद*\n\n` +
             `📦 *फसल:* ${crop}\n` +
             `⚖️ *मात्रा:* ${qty}\n` +
             `💰 *कुल राशि:* ${total}\n` +
             `🚚 *वाहन:* ${vehicle}\n` +
             `👨‍✈️ *चालक:* ${driver}\n` +
             `📍 *वर्तमान स्थिति:* ${loc}\n` +
             `🛡️ *एस्क्रो स्टेटस:* 100% सुरक्षित (Govt Supervised)\n\n` +
             `🌐 गेट पास व लाइव जीपीएस ट्रैकिंग लिंक: https://agrinex.in/track`;
    } else if (currentLang === 'mr') {
      text = `🌾 *AgriNex शेतीमाल खरेदी व गेट पास*\n\n` +
             `📦 *पीक:* ${crop}\n` +
             `⚖️ *वजन:* ${qty}\n` +
             `💰 *एकूण रक्कम:* ${total}\n` +
             `🚚 *गाडी क्रमांक:* ${vehicle}\n` +
             `👨‍✈️ *चालक:* ${driver}\n` +
             `📍 *सध्याचे ठिकाण:* ${loc}\n` +
             `🛡️ *एस्क्रो हमी:* १००% सुरक्षित (बँक खात्यात संरक्षित)\n\n` +
             `🌐 थेट जीपीएस ट्रॅकिंग लिंक: https://agrinex.in/track`;
    } else {
      text = `🌾 *AgriNex Purchase Slip & Gate Pass*\n\n` +
             `📦 *Crop:* ${crop}\n` +
             `⚖️ *Quantity:* ${qty}\n` +
             `💰 *Total Amount:* ${total}\n` +
             `🚚 *Vehicle:* ${vehicle}\n` +
             `👨‍✈️ *Driver:* ${driver}\n` +
             `📍 *Current Location:* ${loc}\n` +
             `🛡️ *Escrow Guarantee:* 100% Protected\n\n` +
             `🌐 Live GPS Tracking: https://agrinex.in/track`;
    }

    const waUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  }

  // =========================================================================
  // VOICE GRIEVANCE DISPUTE MODAL & AUDIO RECORDING SIMULATION
  // =========================================================================

  let isGrievanceRecording = false;
  let grievanceTimerInterval = null;
  let grievanceSeconds = 0;

  function openLiteGrievanceModal() {
    const modal = document.getElementById('modal-lite-grievance');
    if (!modal) return;

    modal.classList.add('active');
    const dict = getDict();
    const currentLang = getCurrentLang();
    
    document.getElementById('lite-grievance-status').textContent = dict.grievancePrompt;
    document.getElementById('lite-grievance-audio-timer').style.display = 'none';
    document.getElementById('lite-grievance-result-box').style.display = 'none';
    document.getElementById('btn-grievance-record').style.background = '#dc2626';

    speakText(dict.voiceGrievanceSub, currentLang);
  }

  function closeLiteGrievanceModal() {
    const modal = document.getElementById('modal-lite-grievance');
    if (modal) modal.classList.remove('active');
    if (grievanceTimerInterval) clearInterval(grievanceTimerInterval);
    isGrievanceRecording = false;
    stopLiteSpeech();
  }

  function toggleGrievanceRecord() {
    const dict = getDict();
    const currentLang = getCurrentLang();
    const btn = document.getElementById('btn-grievance-record');
    const status = document.getElementById('lite-grievance-status');
    const timerBox = document.getElementById('lite-grievance-audio-timer');
    const resultBox = document.getElementById('lite-grievance-result-box');
    const textOut = document.getElementById('lite-grievance-text');

    if (!isGrievanceRecording) {
      isGrievanceRecording = true;
      grievanceSeconds = 0;
      btn.style.background = '#15803d';
      btn.classList.add('speaking');
      status.textContent = dict.recording;
      timerBox.style.display = 'block';
      resultBox.style.display = 'none';

      grievanceTimerInterval = setInterval(() => {
        grievanceSeconds++;
        const s = grievanceSeconds < 10 ? '0' + grievanceSeconds : grievanceSeconds;
        document.getElementById('grievance-seconds').textContent = `00:${s}`;
        if (grievanceSeconds >= 15) {
          toggleGrievanceRecord();
        }
      }, 1000);
    } else {
      isGrievanceRecording = false;
      clearInterval(grievanceTimerInterval);
      btn.style.background = '#dc2626';
      btn.classList.remove('speaking');
      status.textContent = "✓ Voice Note Recorded (१५ सेकंद नोंदवले गेले)";

      resultBox.style.display = 'block';
      const sampleText = (currentLang === 'mr') 
        ? "नोंदवलेली तक्रार: 'गाडीतील टोमॅटोमध्ये ५% पेक्षा जास्त ओलावा व दाब लागल्यामुळे नुकसान झाले आहे. एस्क्रोतून तडजोड करावी.'"
        : (currentLang === 'hi' 
            ? "दर्ज शिकायत: 'गाड़ी के टमाटर में अधिक नमी और दबने से खराबी है। कृपया एस्क्रो से मध्यस्थता करें।'"
            : "Recorded voice grievance: '5% moisture variation and transit damage observed. Requesting arbitration from escrow.'");
      textOut.textContent = sampleText;
    }
  }

  function submitLiteGrievance() {
    closeLiteGrievanceModal();
    const dict = getDict();
    const currentLang = getCurrentLang();
    speakText(dict.ticketGenerated, currentLang);
    if (typeof showToast === 'function') {
      showToast(dict.ticketGenerated, 'success');
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
    const floatingMic = document.getElementById('lite-floating-voice-mic');
    if (floatingMic) floatingMic.classList.add('listening');

    speakText(dict.voicePrompt, currentLang);

    setTimeout(() => {
      const recognizer = new SpeechRecognition();
      recognizer.lang = recLang;
      recognizer.start();

      recognizer.onresult = function (event) {
        if (floatingMic) floatingMic.classList.remove('listening');
        const speechQuery = event.results[0][0].transcript;
        if (speechQuery) {
          speakText(`${dict.searchingFor} ${speechQuery}.`, currentLang);
          filterLiteByVoice(speechQuery);
        }
      };

      recognizer.onerror = function () {
        if (floatingMic) floatingMic.classList.remove('listening');
        speakText(dict.voiceFail, currentLang);
      };

      recognizer.onend = function () {
        if (floatingMic) floatingMic.classList.remove('listening');
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
  window.changeLiteBuyQuantity = changeLiteBuyQuantity;
  window.openLiteBargainModal = openLiteBargainModal;
  window.closeLiteBargainModal = closeLiteBargainModal;
  window.selectBargainRateDelta = selectBargainRateDelta;
  window.changeLiteBargainQuantity = changeLiteBargainQuantity;
  window.startVoiceBargainOffer = startVoiceBargainOffer;
  window.sendLiteBargainOffer = sendLiteBargainOffer;
  window.shareOrderOnWhatsApp = shareOrderOnWhatsApp;
  window.openLiteGrievanceModal = openLiteGrievanceModal;
  window.closeLiteGrievanceModal = closeLiteGrievanceModal;
  window.toggleGrievanceRecord = toggleGrievanceRecord;
  window.submitLiteGrievance = submitLiteGrievance;
  window.setLiteSpeechRate = setLiteSpeechRate;
  window.setLiteFontSize = setLiteFontSize;
  window.toggleSunlightMode = toggleSunlightMode;
  window.callFarmerDirect = callFarmerDirect;
  window.callDriverDirect = callDriverDirect;
  window.startLiteVoiceAssistant = startLiteVoiceAssistant;

})();
