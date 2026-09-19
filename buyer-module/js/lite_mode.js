/**
 * AgriNex Buyer Module - Simple & Audio-First Lite Mode (सरल मोड / सुलभ मोड)
 * Designed specifically for elderly, low-vision, or non-literate traders and buyers.
 * Supports All 31+ Verified Farm Produce Crops & All Agricultural Categories.
 */

(function () {
  'use strict';

  // Default to Simple Mode on initial entry unless user explicitly switched to false ('false')
  let isLiteMode = localStorage.getItem('agrinex_buyer_lite_mode') !== 'false';
  let activeLiteSection = 'produce'; // 'produce' | 'insights' | 'orders' | 'escrow'
  let activeLiteFilter = 'all';
  let activeLiteInsightFilter = 'all';
  let currentSpeechRate = parseFloat(localStorage.getItem('agrinex_lite_speech_rate')) || 0.90;
  let currentFontSize = localStorage.getItem('agrinex_lite_font_size') || 'md';
  let isSunlightMode = localStorage.getItem('agrinex_lite_sunlight_mode') === 'true';

  // Multilingual UI Dictionary for Simple Mode
  const LITE_I18N = {
    en: {
      toggleSimple: 'Simple Mode',
      toggleEnterprise: 'Enterprise Mode',
      tabProduce: '🌾 Buy Produce',
      tabOrders: '🚚 My Orders & Trucks',
      tabEscrow: '🛡️ Safe Escrow Vault',
      tabInsights: '📊 Market Insights',
      insightsTitle: '📊 All-Crop Market Insights & Mandi Arbitrage',
      insightsSubtitle: 'Compare current Mandi rates with direct farm prices for all crops, view 7-day price trends, and listen to voice buy/wait signals.',
      insightsBadge: 'Live Maharashtra Mandis',
      listenInsights: 'Listen Market Advisory',
      mandiBenchmarkLabel: 'MANDI BENCHMARK',
      farmDirectLabel: 'FARM-GATE DIRECT',
      saveLabel: 'Save',
      signalBuyText: '🟢 BUY TODAY (Rising Trend)',
      signalWaitText: '⏳ WAIT / HOLD (Softening Trend)',
      btnViewAndBuy: '🌾 View Farm Lots & Buy',
      btnListenInsight: '🔊 Listen Advice',
      statAvgSavings: 'Direct Mandi Savings',
      statTopGainer: 'Top Rising Crop',
      statTopOpportunity: 'Best Price Advantage',
      heroBadge: '🟢 Direct Farmer Procurement • 31+ Verified Produce Crops',
      heroTitle: '🌾 Direct Farmer Produce Market',
      heroDesc: 'Tap any large crop photo, listen to voice details in English, and buy directly from farmers in 1-click.',
      voiceBtnTitle: 'Voice Search',
      voiceBtnDesc: '"Show Tomatoes" / "Onion"',
      emergencyBtnTitle: 'Emergency Sales',
      emergencyBtnDesc: 'Discounted direct lots',
      catAll: 'All Crops (31+)',
      catVeg: 'Vegetables',
      catFruit: 'Fruits',
      catGrain: 'Grains & Pulses',
      catOilseed: 'Oilseeds & Spices',
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
      toggleSimple: 'सरल मोड',
      toggleEnterprise: 'एंटरप्राइज मोड',
      tabProduce: '🌾 शेतीमाल खरीद (Buy)',
      tabOrders: '🚚 मेरी गाड़ियां व ऑर्डर्स',
      tabEscrow: '🛡️ सुरक्षित एस्क्रो खाता',
      tabInsights: '📊 बाज़ार भाव व अंदाज',
      insightsTitle: '📊 सभी फसलों के बाज़ार भाव व खरीद सलाह',
      insightsSubtitle: 'सभी 31+ फसलों के मंडी भाव और सीधे किसान भाव की तुलना करें, 7 दिनों का रुझान देखें और आवाज़ में सलाह सुनें।',
      insightsBadge: 'महाराष्ट्र लाइव मंडियां',
      listenInsights: 'बाज़ार सलाह सुनें',
      mandiBenchmarkLabel: 'मंडी यार्ड भाव',
      farmDirectLabel: 'सीधा किसान भाव',
      saveLabel: 'बचत',
      signalBuyText: '🟢 आज खरीदें (भाव बढ़ेंगे)',
      signalWaitText: '⏳ रुकें / थांबा (भाव घटेंगे)',
      btnViewAndBuy: '🌾 माल देखें व खरीदें',
      btnListenInsight: '🔊 सलाह सुनें',
      statAvgSavings: 'औसत मंडी बचत',
      statTopGainer: 'सर्वाधिक तेजी वाली फसल',
      statTopOpportunity: 'सर्वश्रेष्ठ खरीद अवसर',
      heroBadge: '🟢 सीधा किसान खरीद केंद्र • 31+ सत्यापित फसलें',
      heroTitle: '🌾 किसान सीधा खरीद बाज़ार (सरल बाज़ार)',
      heroDesc: 'बड़ी तस्वीरों पर क्लिक करें, आवाज़ में जानकारी सुनें और 1-क्लिक में सीधे किसान से खात्रीशीर माल खरीदें।',
      voiceBtnTitle: 'बोलकर खोजें',
      voiceBtnDesc: '"टमाटर दिखाओ" / "प्याज"',
      emergencyBtnTitle: 'आपातकालीन बिक्री',
      emergencyBtnDesc: 'सस्ती दरों पर ताजा माल',
      catAll: 'सभी फसलें (31+)',
      catVeg: 'सब्जियां',
      catFruit: 'फल',
      catGrain: 'अनाज व दालें',
      catOilseed: 'तिलहन व मसाले',
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
      toggleSimple: 'सुलभ मोड',
      toggleEnterprise: 'एंटरप्राइज मोड',
      tabProduce: '🌾 शेतीमाल खरेदी (Buy)',
      tabOrders: '🚚 माझ्या गाड्या व ऑर्डर्स',
      tabEscrow: '🛡️ सुरक्षित एस्क्रो खाते',
      tabInsights: '📊 बाज़ार भाव व अंदाज',
      insightsTitle: '📊 सर्व शेतीमाल बाजार भाव व खरेदी सल्ला',
      insightsSubtitle: 'सर्व ३१+ शेतीमालांचे बाजार समिती भाव आणि थेट शेतकरी भावाची तुलना, ७ दिवसांचा कल आणि आवाजात खरेदी सल्ला ऐका.',
      insightsBadge: 'महाराष्ट्र थेट बाजार समित्या',
      listenInsights: 'बाजार सल्ला ऐका',
      mandiBenchmarkLabel: 'बाजार समिती भाव',
      farmDirectLabel: 'थेट शेतकरी भाव',
      saveLabel: 'बचत',
      signalBuyText: '🟢 आजच खरेदी करा (भाव वाढतील)',
      signalWaitText: '⏳ थांबा / प्रतिक्षा करा (भाव कमी होतील)',
      btnViewAndBuy: '🌾 शेतीमाल पहा व खरेदी करा',
      btnListenInsight: '🔊 सल्ला ऐका',
      statAvgSavings: 'थेट बाजार समिती बचत',
      statTopGainer: 'सर्वाधिक वाढणारे पीक',
      statTopOpportunity: 'उत्तम खरेदी संधी',
      heroBadge: '🟢 थेट शेतकरी खरेदी केंद्र • ३१+ खात्रीशीर पिके',
      heroTitle: '🌾 शेतकरी थेट शेतीमाल बाजार (सुलभ पद्धत)',
      heroDesc: 'मोठ्या फोटोवर क्लिक करा, मराठीत सविस्तर माहिती ऐका आणि १-क्लिकमध्ये थेट शेतकऱ्याकडून माल खरेदी करा.',
      voiceBtnTitle: 'बोलून शोधा',
      voiceBtnDesc: '"टोमॅटो दाखवा" / "कांदा"',
      emergencyBtnTitle: 'सवलत विक्री',
      emergencyBtnDesc: 'कमी दरात थेट शेतीमाल',
      catAll: 'सर्व शेतीमाल (31+)',
      catVeg: 'भाज्या',
      catFruit: 'फळे',
      catGrain: 'धान्य व कडधान्ये',
      catOilseed: 'तेलबिया व मसाले',
      catEmergency: 'सवलत विक्री',
      listen: 'ऐका',
      priceLabel: 'दर / भाव',
      perKg: '/ किलो',
      qtyLabel: 'उपलब्ध पोती / वजन',
      bags: 'पोती (Bags)',
      verifiedBadge: '🛡️ ॲग्रीनेक्स प्रमाणित',
      buyNow: '🟢 खरेदी करा (Buy)',
      bargainBtn: '🤝 भाव कमी करा',
      callFarmer: '📞 थेट फोन करा',
      callDriver: '📞 ड्रायव्हरला फोन करा',
      buyModalTitle: 'शेतीमाल खरेदी (थेट शेतकरी)',
      farmerLabel: 'शेतकरी',
      rateLabel: 'दर / भाव',
      qtyTextLabel: 'वजन / पोती',
      totalLabel: 'एकूण रक्कम',
      escrowNote: '🛡️ एस्क्रो सुरक्षित अनामत',
      escrowPercent: '३५% सुरक्षित अनामत रक्कम',
      cancel: '✕ रद्द करा (Cancel)',
      confirmBuy: '✓ खरेदी निश्चित करा (Confirm)',
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

  // Complete Regional Crop Names Dictionary for All 31+ Crops
  const CROP_TRANSLATIONS = {
    'Onion': { en: '🧅 Red Onion (Nashik Garwa)', hi: '🧅 लाल प्याज (नासिक गरवा)', mr: '🧅 लाल कांदा (नाशिक गरवा)', icon: '🧅' },
    'Tomato': { en: '🍅 Tomato (Shivam Hybrid)', hi: '🍅 टमाटर (शिवम हाइब्रिड)', mr: '🍅 टोमॅटो (शिवम संकरित)', icon: '🍅' },
    'Banana': { en: '🍌 Grand Naine Banana (GI)', hi: '🍌 ग्रँड नैन केला (जीआई)', mr: '🍌 ग्रँड नैन केळी (खानदेश जीआय)', icon: '🍌' },
    'Soybean': { en: '🌱 Yellow Soybean (JS 335)', hi: '🌱 पीला सोयाबीन (जेएस 335)', mr: '🌱 पिवळी सोयाबीन (जेएस ३३५)', icon: '🌱' },
    'Orange': { en: '🍊 Nagpur Sweet Orange (Santra)', hi: '🍊 नागपुर संतरा (जीआई)', mr: '🍊 नागपूर संत्रा (विदर्भ जीआय)', icon: '🍊' },
    'Turmeric': { en: '🌿 Sangli Rajapuri Turmeric', hi: '🌿 सांगली राजापुरी हल्दी', mr: '🌿 सांगली राजापुरी हळद', icon: '🌿' },
    'Pomegranate': { en: '🍇 Bhagwa Pomegranate (Export)', hi: '🍇 भगवा अनार (निर्यात ग्रेड)', mr: '🍇 भगवा डाळिंब (सोलापूर निर्यात)', icon: '🍇' },
    'Cotton': { en: '☁️ Raw Cotton (Long Staple)', hi: '☁️ कपास / रुई (विदर्भ लांग स्टेपल)', mr: '☁️ कापूस / सरकी (विदर्भ लांब धागा)', icon: '☁️' },
    'Rice': { en: '🌾 Wada Kolam Rice (Palghar GI)', hi: '🌾 वाडा कोलम चावल (पालघर जीआई)', mr: '🌾 वाडा कोलम भात (पालघर जीआय)', icon: '🌾' },
    'Kolam': { en: '🌾 Wada Kolam Rice (Palghar GI)', hi: '🌾 वाडा कोलम चावल (पालघर जीआई)', mr: '🌾 वाडा कोलम भात (पालघर जीआय)', icon: '🌾' },
    'Jowar': { en: '🌾 Solapur Maldandi Jowar', hi: '🌾 सोलापुर मालदांडी ज्वार', mr: '🌾 सोलापूर मालदांडी ज्वारी', icon: '🌾' },
    'Bajra': { en: '🌾 Dhule Hybrid Pearl Millet (Bajra)', hi: '🌾 धुले संकरित बाजरा', mr: '🌾 धुळे संकरित बाजरी', icon: '🌾' },
    'Wheat': { en: '🌾 Sharbati Lokwan Golden Wheat', hi: '🌾 शरबती लोकवान गेहूं', mr: '🌾 शरबती लोकवान गहू', icon: '🌾' },
    'Tur': { en: '🌱 Latur Red Tur (Pigeon Pea)', hi: '🌱 लातूर लाल अरहर / तूर', mr: '🌱 लातूर लाल तूर डाळ', icon: '🌱' },
    'Arhar': { en: '🌱 Latur Red Tur (Pigeon Pea)', hi: '🌱 लातूर लाल अरहर / तूर', mr: '🌱 लातूर लाल तूर डाळ', icon: '🌱' },
    'Chana': { en: '🌱 Akola Desi Chana (Bengal Gram)', hi: '🌱 अकोला देशी चना', mr: '🌱 अकोला देशी हरभरा', icon: '🌱' },
    'Mung': { en: '🌱 Jalgaon Green Mung Bean', hi: '🌱 जलगांव हरा मूंग', mr: '🌱 जळगाव हिरवा मूग', icon: '🌱' },
    'Moong': { en: '🌱 Jalgaon Green Mung Bean', hi: '🌱 जलगांव हरा मूंग', mr: '🌱 जळगाव हिरवा मूग', icon: '🌱' },
    'Urad': { en: '🌱 Nanded Black Urad Dal', hi: '🌱 नांदेड़ काला उड़द', mr: '🌱 नांदेड काळी उडीद', icon: '🌱' },
    'Groundnut': { en: '🥜 Kolhapur Bold Groundnut', hi: '🥜 कोल्हापुर बोल्ड मूंगफली', mr: '🥜 कोल्हापूर भुईमूग शेंगदाणा', icon: '🥜' },
    'Peanut': { en: '🥜 Kolhapur Bold Groundnut', hi: '🥜 कोल्हापुर बोल्ड मूंगफली', mr: '🥜 कोल्हापूर भुईमूग शेंगदाणा', icon: '🥜' },
    'Sunflower': { en: '🌻 Beed High-Oil Sunflower Seeds', hi: '🌻 बीड सूरजमुखी बीज', mr: '🌻 बीड सूर्यफूल बियाणे', icon: '🌻' },
    'Sugarcane': { en: '🎋 Kolhapur Co 86032 Sugarcane', hi: '🎋 कोल्हापुर गन्ना', mr: '🎋 कोल्हापूर ८६०३२ ऊस', icon: '🎋' },
    'Mango': { en: '🥭 Ratnagiri Alphonso (Hapus)', hi: '🥭 रत्नागिरी हापुस आम', mr: '🥭 रत्नागिरी हापूस आंबा', icon: '🥭' },
    'Alphonso': { en: '🥭 Ratnagiri Alphonso (Hapus)', hi: '🥭 रत्नागिरी हापुस आम', mr: '🥭 रत्नागिरी हापूस आंबा', icon: '🥭' },
    'Grapes': { en: '🍇 Nashik Thompson Grapes', hi: '🍇 नासिक थॉम्पसन अंगूर', mr: '🍇 नाशिक थॉम्पसन द्राक्षे', icon: '🍇' },
    'Mosambi': { en: '🍈 Jalna Sweet Lime (Mosambi)', hi: '🍈 जालना मौसमी', mr: '🍈 जालना मोसंबी', icon: '🍈' },
    'Custard Apple': { en: '🍏 Beed Balanagar Sitaphal', hi: '🍏 बीड बालनगर सीताफल', mr: '🍏 बीड बालनगर सीताफळ', icon: '🍏' },
    'Sitaphal': { en: '🍏 Beed Balanagar Sitaphal', hi: '🍏 बीड बालनगर सीताफल', mr: '🍏 बीड बालनगर सीताफळ', icon: '🍏' },
    'Maize': { en: '🌽 Yellow Corn / Maize', hi: '🌽 पीला मक्का', mr: '🌽 पिवळा मका', icon: '🌽' },
    'Corn': { en: '🌽 Yellow Corn / Maize', hi: '🌽 पीला मक्का', mr: '🌽 पिवळा मका', icon: '🌽' },
    'Safflower': { en: '🌼 Safflower (Kardi)', hi: '🌼 कुसुम / करडी', mr: '🌼 करडई तेलबिया', icon: '🌼' },
    'Kardi': { en: '🌼 Safflower (Kardi)', hi: '🌼 कुसुम / करडी', mr: '🌼 करडई तेलबिया', icon: '🌼' },
    'Sesame': { en: '⚪ White Sesame (Til)', hi: '⚪ सफेद तिल', mr: '⚪ पांढरा तीळ', icon: '⚪' },
    'Til': { en: '⚪ White Sesame (Til)', hi: '⚪ सफेद तिल', mr: '⚪ पांढरा तीळ', icon: '⚪' },
    'Chilli': { en: '🌶️ Nandurbar Dry Red Chilli', hi: '🌶️ नंदुरबार सूखी लाल मिर्च', mr: '🌶️ नंदुरबार कोरडी लाल मिरची', icon: '🌶️' },
    'Guava': { en: '🍈 Sardar L-49 Sweet Guava', hi: '🍈 सरदार एल-49 अमरूद', mr: '🍈 सरदार एल-४९ गोड पेरू', icon: '🍈' },
    'Peru': { en: '🍈 Sardar L-49 Sweet Guava', hi: '🍈 सरदार एल-49 अमरूद', mr: '🍈 सरदार एल-४९ गोड पेरू', icon: '🍈' },
    'Potato': { en: '🥔 Potato (Jyoti Grade A)', hi: '🥔 आलू (ज्योति ग्रेड ए)', mr: '🥔 बटाटा (ज्योती प्रत अ)', icon: '🥔' },
    'Brinjal': { en: '🍆 Manchar Purple Brinjal', hi: '🍆 मंचर बैंगन', mr: '🍆 मंचर जांभळी वांगी', icon: '🍆' },
    'Green Chilli': { en: '🌶️ G4 High-Pungency Green Chilli', hi: '🌶️ जी4 तीखी हरी मिर्च', mr: '🌶️ जी४ तिखट हिरवी मिरची', icon: '🌶️' }
  };

  // Comprehensive Market Insights for All Major Crops
  const LITE_MARKET_INSIGHTS_DATA = [
    {
      id: 'ins-onion',
      cropKey: 'Onion',
      cropName: 'Red Onion (Garwa Export)',
      mandi: 'Lasalgaon APMC, Nashik',
      image: 'assets/images/onion.jpg',
      mandiRate: 32.5,
      farmRate: 24.0,
      savingsKg: 8.5,
      savingsPct: '26.1%',
      trendPct: '+8.5%',
      signal: 'buy',
      reasonEn: 'Export quotas released. APMC rates spiking this week. Direct farm lot buying locks in ₹8.5/kg profit margin.',
      reasonHi: 'निर्यात कोटा खुला होने से मंडी भाव तेज हैं। सीधे किसान से खरीदने पर ₹8.5/किग्रा का भारी लाभ मिल रहा है।',
      reasonMr: 'कांदा निर्यात सुरू झाल्याने बाजारात तेजी आहे. थेट शेतकरी खरेदी केल्यास प्रति किलो ₹ ८.५ चा नफा मिळतो.'
    },
    {
      id: 'ins-tomato',
      cropKey: 'Tomato',
      cropName: 'Tomato (Shivam Hybrid)',
      mandi: 'Narayangaon APMC, Pune',
      image: 'assets/images/tomato.jpg',
      mandiRate: 22.0,
      farmRate: 16.0,
      savingsKg: 6.0,
      savingsPct: '27.2%',
      trendPct: '-4.2%',
      signal: 'wait',
      reasonEn: 'Heavy flush arriving from Junnar belt. Prices softening slightly over the next 48 hours. Buy selectively.',
      reasonHi: 'जुन्नर बेल्ट से भारी आवक शुरू। अगले 48 घंटों में भाव थोड़े नरम हो सकते हैं। आवश्यकतानुसार ही खरीदें।',
      reasonMr: 'जुन्नर भागातून टोमॅटोची मोठी आवक सुरू आहे. पुढील २ दिवसांत भाव थोडे कमी होण्याची शक्यता आहे.'
    },
    {
      id: 'ins-banana',
      cropKey: 'Banana',
      cropName: 'Grand Naine Banana (GI)',
      mandi: 'Raver APMC, Jalgaon',
      image: 'assets/images/banana.jpg',
      mandiRate: 18.5,
      farmRate: 14.0,
      savingsKg: 4.5,
      savingsPct: '24.3%',
      trendPct: '+5.0%',
      signal: 'buy',
      reasonEn: 'High demand from North Indian wholesale markets. 100% calibrated bunches ready for direct reefer loading.',
      reasonHi: 'उत्तर भारतीय मंडियों से भारी मांग। रीफर लोडिंग के लिए एक्सपोर्ट क्वालिटी गुच्छे उपलब्ध।',
      reasonMr: 'उत्तर भारतातून मोठी मागणी. उत्तम प्रतवारी केलेले घड थेट वाहतुकीसाठी तयार आहेत.'
    },
    {
      id: 'ins-soybean',
      cropKey: 'Soybean',
      cropName: 'Yellow Soybean (JS 335)',
      mandi: 'Latur APMC Yard',
      image: 'assets/images/soybean.jpg',
      mandiRate: 48.0,
      farmRate: 42.5,
      savingsKg: 5.5,
      savingsPct: '11.4%',
      trendPct: '+3.8%',
      signal: 'buy',
      reasonEn: 'Crushing mills active with steady institutional demand. Farm lots dry (<10% moisture) and ready for immediate dispatch.',
      reasonHi: 'तेल मिलों की मजबूत मांग। फार्म गेट पर 10% से कम नमी वाला सूखा माल उपलब्ध। तुरंत उठाव की सलाह।',
      reasonMr: 'ऑइल मिलकडून मोठी मागणी. थेट शेतकऱ्यांकडे उत्तम वाळलेला शेतीमाल उपलब्ध असून आजच खरेदी फायदेशीर आहे.'
    },
    {
      id: 'ins-orange',
      cropKey: 'Orange',
      cropName: 'Nagpur Sweet Orange (Santra)',
      mandi: 'Katol APMC, Nagpur',
      image: 'assets/images/orange.jpg',
      mandiRate: 52.0,
      farmRate: 42.0,
      savingsKg: 10.0,
      savingsPct: '19.2%',
      trendPct: '+7.4%',
      signal: 'buy',
      reasonEn: 'Mruga bahar crop harvesting in full swing. High juice content and excellent shelf life for retail chains.',
      reasonHi: 'मृग बहार की तुड़ाई जोरों पर। रसदार और लंबी शेल्फ लाइफ वाला माल उपलब्ध।',
      reasonMr: 'मृग बहाराची संत्री बाजारात दाखल. भरपूर रस आणि आकर्षक रंग असलेला दर्जेदार शेतीमाल उपलब्ध.'
    },
    {
      id: 'ins-turmeric',
      cropKey: 'Turmeric',
      cropName: 'Sangli Rajapuri Turmeric',
      mandi: 'Sangli APMC Market',
      image: 'assets/images/turmeric.jpg',
      mandiRate: 145.0,
      farmRate: 128.0,
      savingsKg: 17.0,
      savingsPct: '11.7%',
      trendPct: '+4.5%',
      signal: 'buy',
      reasonEn: 'Pharma and spice processors securing high-curcumin lots (>3.8%). Farm gate moisture verified at 8%.',
      reasonHi: 'मसाला व फार्मा कंपनियों की तेज मांग। 3.8% से अधिक करक्यूमिन वाले उच्च गुणवत्ता वाले लॉट उपलब्ध।',
      reasonMr: 'औषध व मसाला कंपन्यांकडून उच्च करक्युमिन मालाची मोठी खरेदी. उत्तम वाळलेली हळद उपलब्ध.'
    },
    {
      id: 'ins-pomegranate',
      cropKey: 'Pomegranate',
      cropName: 'Bhagwa Pomegranate (A-Grade)',
      mandi: 'Solapur APMC, Sangola',
      image: 'assets/images/pomegranate.jpg',
      mandiRate: 135.0,
      farmRate: 110.0,
      savingsKg: 25.0,
      savingsPct: '18.5%',
      trendPct: '+6.2%',
      signal: 'buy',
      reasonEn: 'Festive season demand rising in North India. High sugar content (Brix 15+) verified lots selling fast.',
      reasonHi: 'उत्तर भारत में त्योहारी मांग बढ़ रही है। 15+ ब्रिक्स मिठास वाला प्रीमियम माल तेजी से बिक रहा है।',
      reasonMr: 'उत्सवी हंगामामुळे डाळिंबाला मोठी मागणी. १५+ ब्रिक्स गोडी असलेला उत्कृष्ट माल वेगाने विकला जात आहे.'
    },
    {
      id: 'ins-cotton',
      cropKey: 'Cotton',
      cropName: 'Raw Cotton (Long Staple)',
      mandi: 'Amravati Cotton Yard',
      image: 'assets/images/cotton.jpg',
      mandiRate: 72.0,
      farmRate: 64.0,
      savingsKg: 8.0,
      savingsPct: '11.1%',
      trendPct: '+2.1%',
      signal: 'buy',
      reasonEn: 'Spinning mills securing 29mm+ staple fiber with low trash content (<3%). Direct procurement avoids mandi cess.',
      reasonHi: 'कताई मिलों की मजबूत मांग। 29 मिमी लंबा रेशा और कम कचरे वाला उच्च क्वालिटी कपास उपलब्ध।',
      reasonMr: 'कापड गिरण्यांकडून मोठी मागणी. २९ मिमी लांब धागा असलेला स्वच्छ कापूस थेट उपलब्ध.'
    },
    {
      id: 'ins-rice',
      cropKey: 'Rice',
      cropName: 'Wada Kolam Rice (Palghar GI)',
      mandi: 'Palghar APMC Yard',
      image: 'assets/images/rice.jpg',
      mandiRate: 62.0,
      farmRate: 52.0,
      savingsKg: 10.0,
      savingsPct: '16.1%',
      trendPct: '+3.5%',
      signal: 'buy',
      reasonEn: 'GI certified aromatic Kolam rice. Excellent cooking quality and high head rice recovery.',
      reasonHi: 'जीआई प्रमाणित सुगंधित वाडा कोलम चावल। उत्कृष्ट पकाने की गुणवत्ता।',
      reasonMr: 'जीआय मानांकन प्राप्त सुवासिक वाडा कोलम तांदूळ. उत्कृष्ट चव आणि आकर्षक दाणा.'
    },
    {
      id: 'ins-wheat',
      cropKey: 'Wheat',
      cropName: 'Sharbati Lokwan Wheat',
      mandi: 'Kalyan Grain Mandi',
      image: 'assets/images/wheat.jpg',
      mandiRate: 36.0,
      farmRate: 30.0,
      savingsKg: 6.0,
      savingsPct: '16.7%',
      trendPct: '+1.8%',
      signal: 'buy',
      reasonEn: 'Heavy lustrous grains with high gluten strength. Direct farm bags free from dust and stones.',
      reasonHi: 'चमकदार दानेदार शरबती गेहूं। मिलिंग और पैकेजिंग के लिए सर्वोत्तम गुणवत्ता।',
      reasonMr: 'सोनेरी चकाकी असलेला शरबती गहू. थेट शेतकऱ्यांकडून स्वच्छ व प्रतवारी केलेली पोती उपलब्ध.'
    },
    {
      id: 'ins-grapes',
      cropKey: 'Grapes',
      cropName: 'Thompson Seedless Grapes',
      mandi: 'Nashik Grape Yard, Pimpalgaon',
      image: 'assets/images/grapes.jpg',
      mandiRate: 95.0,
      farmRate: 75.0,
      savingsKg: 20.0,
      savingsPct: '21.1%',
      trendPct: '+9.2%',
      signal: 'buy',
      reasonEn: 'Export quality berries (18mm+ diameter) with high sugar content. Excellent demand across metro supermarkets.',
      reasonHi: '18 मिमी से बड़े दाने और उच्च मिठास वाले एक्सपोर्ट अंगूर। सुपरमार्केट के लिए सर्वोत्तम।',
      reasonMr: '१८ मिमी पेक्षा मोठे मणी आणि १८+ ब्रिक्स गोडी. सुपरमार्केट आणि निर्यातीसाठी उत्तम द्राक्षे.'
    },
    {
      id: 'ins-mango',
      cropKey: 'Mango',
      cropName: 'Ratnagiri Alphonso (Hapus)',
      mandi: 'APMC Vashi Fruit Terminal',
      image: 'assets/images/mango.jpg',
      mandiRate: 380.0,
      farmRate: 310.0,
      savingsKg: 70.0,
      savingsPct: '18.4%',
      trendPct: '+12.5%',
      signal: 'buy',
      reasonEn: 'Authentic GI tagged Konkan orchards. Naturally tree-ripened without carbide. Unmatched aroma.',
      reasonHi: 'प्राकृतिक रूप से पके जीआई टैग अल्फांसो आम। प्रीमियम रिटेल के लिए भारी मुनाफा।',
      reasonMr: 'अस्सल कोकणातील जीआय टॅग हापूस आंबा. नैसर्गिकरीत्या पिकवलेला अत्यंत सुवासिक शेतीमाल.'
    },
    {
      id: 'ins-potato',
      cropKey: 'Potato',
      cropName: 'Potato (Fresh Harvest Jyoti)',
      mandi: 'Manchar Potato APMC, Pune',
      image: 'assets/images/potato.jpg',
      mandiRate: 22.0,
      farmRate: 18.0,
      savingsKg: 4.0,
      savingsPct: '18.2%',
      trendPct: '-1.5%',
      signal: 'wait',
      reasonEn: 'Cold storage dispatches steady. Adequate supply in Pune/Mumbai. Stable price window expected.',
      reasonHi: 'कोल्ड स्टोरेज से पर्याप्त आवक। पुणे-मुंबई में आपूर्ति सामान्य। भाव स्थिर रहने का अनुमान।',
      reasonMr: 'कोल्ड स्टोरेजमधून नियमित पुरवठा सुरू. पुणे-मुंबई बाजारात भरपूर आवक असल्याने दर स्थिर राहतील.'
    },
    {
      id: 'ins-groundnut',
      cropKey: 'Groundnut',
      cropName: 'Kolhapur Bold Peanut',
      mandi: 'Kolhapur APMC Yard',
      image: 'assets/images/groundnut.jpg',
      mandiRate: 78.0,
      farmRate: 68.0,
      savingsKg: 10.0,
      savingsPct: '12.8%',
      trendPct: '+4.0%',
      signal: 'buy',
      reasonEn: 'High oil recovery (48%) and sweet taste. Clean dry pods ready for oil expellers and roasting units.',
      reasonHi: '48% तेल रिकवरी वाली मीठी मूंगफली। तेल मिलों और नमकीन निर्माताओं के लिए सर्वोत्तम।',
      reasonMr: '४८% तेलाचे प्रमाण असलेला गोड भुईमूग. तेल घाणी आणि भाजण्यासाठी उत्तम शेतीमाल.'
    },
    {
      id: 'ins-chilli',
      cropKey: 'Chilli',
      cropName: 'Nandurbar Dry Red Chilli',
      mandi: 'Nandurbar Chilli Market',
      image: 'assets/images/red-chilli.jpg',
      mandiRate: 210.0,
      farmRate: 180.0,
      savingsKg: 30.0,
      savingsPct: '14.3%',
      trendPct: '+6.5%',
      signal: 'buy',
      reasonEn: 'Deep red color and high ASTA color value. Clean sun-dried whole pods for spice brands.',
      reasonHi: 'गहरे लाल रंग और तीखे स्वाद वाली नंदुरबार मिर्च। मसाला उद्योग के लिए भारी मांग।',
      reasonMr: 'गडद लाल रंग आणि उत्तम तिखटपणा असलेली नंदुरबार मिरची. मसाला कंपन्यांसाठी फायदेशीर.'
    },
    {
      id: 'ins-maize',
      cropKey: 'Maize',
      cropName: 'Yellow Corn / Maize',
      mandi: 'Dhule APMC Yard',
      image: 'assets/images/maize.jpg',
      mandiRate: 24.5,
      farmRate: 20.5,
      savingsKg: 4.0,
      savingsPct: '16.3%',
      trendPct: '+2.8%',
      signal: 'buy',
      reasonEn: 'Starch industry and poultry feed manufacturers lifting bulk lots. Moisture strictly below 12%.',
      reasonHi: 'स्टार्च और पोल्ट्री फीड उद्योग से मजबूत मांग। 12% से कम नमी वाला सूखा मक्का उपलब्ध।',
      reasonMr: 'स्टार्च आणि कुक्कुटपालन खाद्य उत्पादकांकडून मोठी मागणी. उत्तम वाळलेला पिवळा मका उपलब्ध.'
    }
  ];

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
    const tabInsights = document.getElementById('lite-tab-insights');
    const tabOrders = document.getElementById('lite-tab-orders');
    const tabEscrow = document.getElementById('lite-tab-escrow');

    const secProduce = document.getElementById('lite-section-produce');
    const secInsights = document.getElementById('lite-section-insights');
    const secOrders = document.getElementById('lite-section-orders');
    const secEscrow = document.getElementById('lite-section-escrow');

    if (tabProduce) tabProduce.classList.toggle('active', section === 'produce');
    if (tabInsights) tabInsights.classList.toggle('active', section === 'insights');
    if (tabOrders) tabOrders.classList.toggle('active', section === 'orders');
    if (tabEscrow) tabEscrow.classList.toggle('active', section === 'escrow');

    if (secProduce) secProduce.style.display = section === 'produce' ? 'block' : 'none';
    if (secInsights) secInsights.style.display = section === 'insights' ? 'block' : 'none';
    if (secOrders) secOrders.style.display = section === 'orders' ? 'block' : 'none';
    if (secEscrow) secEscrow.style.display = section === 'escrow' ? 'block' : 'none';

    if (section === 'produce') renderLiteProduceCards();
    if (section === 'insights') renderLiteInsights();
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

    const tInsights = document.getElementById('lite-tab-insights-text');
    if (tInsights) tInsights.textContent = dict.tabInsights;

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

    // 6. Update Insights, Orders & Escrow Titles
    const inBadge = document.getElementById('lite-insights-badge');
    if (inBadge) inBadge.textContent = dict.insightsBadge;

    const inTitle = document.getElementById('lite-insights-title');
    if (inTitle) inTitle.textContent = dict.insightsTitle;

    const inDesc = document.getElementById('lite-insights-desc');
    if (inDesc) inDesc.textContent = dict.insightsSubtitle;

    const inAud = document.getElementById('lite-insights-audio-btn');
    if (inAud) inAud.textContent = dict.listenInsights;

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
      if (activeLiteSection === 'insights') renderLiteInsights();
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
      btn.innerHTML = `<span style="font-size: 0.9rem;">⚡</span><span>${dict.toggleEnterprise || 'Enterprise Mode'}</span>`;
      btn.classList.add('active-lite');
      btn.style.background = '#0f172a';
      btn.style.color = '#f8fafc';
      btn.style.borderColor = '#334155';
    } else {
      btn.innerHTML = `<span style="font-size: 0.9rem;">🌱</span><span>${dict.toggleSimple || 'Simple Mode'}</span>`;
      btn.classList.remove('active-lite');
      btn.style.background = '#f8fafc';
      btn.style.color = '#334155';
      btn.style.borderColor = '#cbd5e1';
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
      
      // Restore default verified produce view if none active
      const currentActive = document.querySelector('.portal-view.active-view');
      if (!currentActive) {
        const defaultView = document.getElementById('view-verified-produce');
        if (defaultView) defaultView.classList.add('active-view');
      }
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
  // 1. RENDER PRODUCE LOTS (ALL 31+ VERIFIED FARM PRODUCE LOTS)
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
    } else if (activeLiteFilter && activeLiteFilter !== 'all') {
      const f = activeLiteFilter.toLowerCase();
      filtered = lots.filter(l => {
        const cat = (l.category || '').toLowerCase();
        const crop = (l.crop || '').toLowerCase();
        return cat.includes(f) || crop.includes(f);
      });
    }

    if (filtered.length === 0) {
      filtered = lots;
    }

    grid.innerHTML = filtered.map(lot => {
      const kgPrice = lot.pricePerKg || (lot.priceNum ? (lot.priceNum / 100).toFixed(0) : '20');
      
      // Find matching localized crop entry
      const cropEntry = Object.entries(CROP_TRANSLATIONS).find(([k]) => lot.crop.toLowerCase().includes(k.toLowerCase()));
      const trans = cropEntry ? cropEntry[1] : { en: lot.crop, hi: lot.crop, mr: lot.crop, icon: '🌾' };
      const displayCropName = (currentLang === 'en') ? (lot.crop || trans.en) : (trans[currentLang] || trans.en || lot.crop);
      const bagsCount = Math.round((lot.availableQtyKg || lot.quantityKg || 5000) / 50);

      const farmerName = (currentLang === 'en') ? lot.farmerName : (
        (window.AgriNexI18n && typeof window.AgriNexI18n.tPerson === 'function') 
          ? window.AgriNexI18n.tPerson(lot.farmerName) : lot.farmerName
      );
      const farmerLocation = (currentLang === 'en') ? lot.farmerLocation : (
        (window.AgriNexI18n && typeof window.AgriNexI18n.tLocation === 'function')
          ? window.AgriNexI18n.tLocation(lot.farmerLocation) : lot.farmerLocation
      );

      const phone = lot.farmerPhone || '+91 98220 14829';
      const imgSrc = lot.image || 'assets/images/tomato.jpg';

      return `
        <div class="lite-produce-card" style="position: relative; background: #ffffff; border-radius: 20px; border: 2px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.06); display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.2s ease, box-shadow 0.2s ease;">
          <div>
            <div style="position: relative; height: 190px; width: 100%; overflow: hidden; background: #f1f5f9;">
              <img src="${imgSrc}" alt="${displayCropName}" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='assets/images/tomato.jpg'" />
              <div style="position: absolute; bottom: 8px; left: 10px; background: rgba(12, 90, 54, 0.9); color: #ffffff; padding: 4px 10px; border-radius: 999px; font-size: 0.75rem; font-weight: 800; display: flex; align-items: center; gap: 4px; backdrop-filter: blur(4px);">
                ${dict.verifiedBadge}
              </div>
            </div>

            <div style="padding: 16px 18px 8px 18px;">
              <h3 style="font-size: 1.35rem; font-weight: 900; color: #0f172a; margin: 0 0 6px 0; line-height: 1.2;">
                ${displayCropName}
              </h3>
              
              <div style="display: flex; align-items: center; gap: 6px; font-size: 0.9rem; color: #475569; font-weight: 700; margin-bottom: 12px;">
                <span>👨‍🌾 ${farmerName}</span>
                <span>•</span>
                <span>📍 ${farmerLocation}</span>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; background: #f8fafc; border-radius: 12px; padding: 12px; margin-bottom: 14px; border: 1px solid #e2e8f0;">
                <div>
                  <span style="display: block; font-size: 0.72rem; font-weight: 800; color: #64748b; text-transform: uppercase;">${dict.priceLabel}</span>
                  <div style="font-size: 1.35rem; font-weight: 900; color: #0c5a36; line-height: 1.1;">
                    ₹${kgPrice} <span style="font-size: 0.85rem; font-weight: 700; color: #475569;">${dict.perKg}</span>
                  </div>
                </div>
                <div>
                  <span style="display: block; font-size: 0.72rem; font-weight: 800; color: #64748b; text-transform: uppercase;">${dict.qtyLabel}</span>
                  <div style="font-size: 1.25rem; font-weight: 900; color: #0f172a; line-height: 1.1;">
                    ${bagsCount} <span style="font-size: 0.85rem; font-weight: 700; color: #475569;">${dict.bags}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style="padding: 0 18px 18px 18px; display: grid; grid-template-columns: 1.3fr 1fr 0.8fr; gap: 8px;">
            <button type="button" class="btn btn-primary lite-action-buy" style="background: #0c5a36; border-color: #0c5a36; padding: 12px 6px; font-size: 0.95rem; font-weight: 900; border-radius: 12px; justify-content: center; box-shadow: 0 3px 10px rgba(12, 90, 54, 0.25);" onclick="openLiteBuyModal('${lot.id}')">
              ${dict.buyNow}
            </button>
            <button type="button" class="btn btn-secondary lite-action-bargain" style="background: #fef3c7; color: #92400e; border: 1.5px solid #f59e0b; padding: 12px 4px; font-size: 0.88rem; font-weight: 800; border-radius: 12px; justify-content: center;" onclick="openLiteBargainModal('${lot.id}')">
              ${dict.bargainBtn}
            </button>
            <button type="button" class="btn btn-outline lite-action-call" style="background: #f8fafc; border: 1.5px solid #cbd5e1; color: #334155; padding: 12px 4px; font-size: 0.88rem; font-weight: 800; border-radius: 12px; justify-content: center;" onclick="callFarmerDirect('${phone}', '${farmerName}')">
              ${dict.callFarmer}
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // =========================================================================
  // 1.5 RENDER MARKET INSIGHTS SECTION (ALL CROPS)
  // =========================================================================

  function renderLiteInsights() {
    const statsContainer = document.getElementById('lite-insights-stats-row');
    const gridContainer = document.getElementById('lite-insights-grid');
    if (!gridContainer) return;

    const dict = getDict();
    const currentLang = getCurrentLang();

    // 1. Top KPI Summary Cards
    if (statsContainer) {
      statsContainer.innerHTML = `
        <div style="background: #ffffff; border: 1.5px solid #bbf7d0; border-radius: 16px; padding: 18px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); display: flex; align-items: center; gap: 14px;">
          <div style="width: 46px; height: 46px; border-radius: 12px; background: #dcfce7; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0;">
            💰
          </div>
          <div>
            <div style="font-size: 0.8rem; font-weight: 700; color: #166534; text-transform: uppercase;">${dict.statAvgSavings || 'Direct Mandi Savings'}</div>
            <div style="font-size: 1.45rem; font-weight: 800; color: #0c5a36;">~17.8% Lower</div>
            <div style="font-size: 0.75rem; color: #64748b;">vs APMC Terminal Yards across 31+ crops</div>
          </div>
        </div>

        <div style="background: #ffffff; border: 1.5px solid #fed7aa; border-radius: 16px; padding: 18px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); display: flex; align-items: center; gap: 14px;">
          <div style="width: 46px; height: 46px; border-radius: 12px; background: #ffedd5; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0;">
            📈
          </div>
          <div>
            <div style="font-size: 0.8rem; font-weight: 700; color: #9a3412; text-transform: uppercase;">${dict.statTopGainer || 'Top Rising Crop'}</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: #c2410c;">🥭 Hapus Mango (+12.5%)</div>
            <div style="font-size: 0.75rem; color: #64748b;">Konkan Export Procurement Peak</div>
          </div>
        </div>

        <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 16px; padding: 18px; box-shadow: 0 2px 8px rgba(0,0,0,0.04); display: flex; align-items: center; gap: 14px;">
          <div style="width: 46px; height: 46px; border-radius: 12px; background: #f1f5f9; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; flex-shrink: 0;">
            ⚡
          </div>
          <div>
            <div style="font-size: 0.8rem; font-weight: 700; color: #475569; text-transform: uppercase;">${dict.statTopOpportunity || 'Best Price Advantage'}</div>
            <div style="font-size: 1.25rem; font-weight: 800; color: #0f172a;">🍇 Pomegranate (Save ₹25/kg)</div>
            <div style="font-size: 0.75rem; color: #64748b;">Direct Sangola Farm Gate</div>
          </div>
        </div>
      `;
    }

    // 2. Filter Cards
    let filtered = LITE_MARKET_INSIGHTS_DATA;
    if (activeLiteInsightFilter === 'buy') {
      filtered = LITE_MARKET_INSIGHTS_DATA.filter(i => i.signal === 'buy');
    } else if (activeLiteInsightFilter === 'wait') {
      filtered = LITE_MARKET_INSIGHTS_DATA.filter(i => i.signal === 'wait');
    }

    // 3. Render Cards Grid
    gridContainer.innerHTML = filtered.map(item => {
      const trans = CROP_TRANSLATIONS[item.cropKey] || { en: item.cropName, hi: item.cropName, mr: item.cropName };
      const displayCrop = trans[currentLang] || item.cropName;
      const isBuy = item.signal === 'buy';
      const reasonText = (currentLang === 'mr') ? item.reasonMr : ((currentLang === 'hi') ? item.reasonHi : item.reasonEn);

      const signalBadgeStyle = isBuy 
        ? 'background: #dcfce7; color: #166534; border: 1.5px solid #86efac;' 
        : 'background: #fff7ed; color: #9a3412; border: 1.5px solid #fdba74;';
      const signalText = isBuy 
        ? (dict.signalBuyText || '🟢 BUY TODAY') 
        : (dict.signalWaitText || '⏳ WAIT / HOLD');

      return `
        <div style="background: #ffffff; border: 1.5px solid #e2e8f0; border-radius: 18px; padding: 20px; box-shadow: 0 3px 12px rgba(0,0,0,0.05); display: flex; flex-direction: column; justify-content: space-between; transition: transform 0.15s ease, box-shadow 0.15s ease;">
          <div>
            <!-- Crop Header Row -->
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
              <div style="display: flex; align-items: center; gap: 12px;">
                <img src="${item.image}" alt="${item.cropName}" style="width: 48px; height: 48px; border-radius: 12px; object-fit: cover; border: 1px solid #cbd5e1;" onerror="this.src='assets/images/tomato.jpg'" />
                <div>
                  <h4 style="font-size: 1.15rem; font-weight: 800; color: #0f172a; margin: 0 0 2px 0;">${displayCrop}</h4>
                  <span style="font-size: 0.78rem; color: #64748b; font-weight: 600;">📍 ${item.mandi}</span>
                </div>
              </div>
              <span style="padding: 4px 10px; border-radius: 8px; font-size: 0.74rem; font-weight: 800; ${signalBadgeStyle}">
                ${signalText}
              </span>
            </div>

            <!-- Price Comparison Box (Mandi Benchmark vs AgriNex Direct) -->
            <div style="background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 12px; padding: 12px 14px; margin-bottom: 12px;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px dashed #cbd5e1;">
                <div>
                  <span style="font-size: 0.72rem; color: #64748b; font-weight: 700; text-transform: uppercase; display: block;">${dict.mandiBenchmarkLabel || 'MANDI YARD BENCHMARK'}</span>
                  <strong style="font-size: 1.05rem; color: #475569;">₹ ${item.mandiRate.toFixed(2)} ${dict.perKg || '/kg'}</strong>
                </div>
                <div style="text-align: right;">
                  <span style="font-size: 0.72rem; color: #0c5a36; font-weight: 700; text-transform: uppercase; display: block;">${dict.farmDirectLabel || 'AGRINEX FARM DIRECT'}</span>
                  <strong style="font-size: 1.25rem; color: #0c5a36; font-weight: 900;">₹ ${item.farmRate.toFixed(2)} ${dict.perKg || '/kg'}</strong>
                </div>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; font-weight: 800; color: #065f46;">
                <span>💰 ${dict.saveLabel || 'Save'}: ₹ ${item.savingsKg.toFixed(2)}/kg</span>
                <span style="background: #dcfce7; color: #166534; padding: 2px 8px; border-radius: 6px;">${item.savingsPct} Lower</span>
              </div>
            </div>

            <!-- 7-Day Advisory Note -->
            <div style="background: #f0fdf4; border-left: 3.5px solid #16a34a; padding: 8px 12px; border-radius: 6px; margin-bottom: 16px;">
              <p style="font-size: 0.82rem; color: #14532d; margin: 0; line-height: 1.45; font-weight: 600;">
                ${reasonText}
              </p>
            </div>
          </div>

          <!-- 2 Action Buttons: Listen Advice & View Direct Farm Lots -->
          <div style="display: flex; gap: 8px;">
            <button type="button" class="btn btn-outline" onclick="speakCropInsight('${item.id}')" style="flex: 1; padding: 9px 12px; font-size: 0.82rem; font-weight: 800; border-color: #86efac; color: #0c5a36; background: #ffffff; border-radius: 10px; display: flex; align-items: center; justify-content: center; gap: 5px;">
              🔊 <span>${dict.btnListenInsight || 'Listen Advice'}</span>
            </button>
            <button type="button" class="btn btn-primary" onclick="viewCropLotsFromInsight('${item.cropKey}')" style="flex: 1.2; padding: 9px 12px; font-size: 0.82rem; font-weight: 800; background: #0c5a36; border-color: #0c5a36; border-radius: 10px; color: #ffffff; display: flex; align-items: center; justify-content: center; gap: 5px;">
              🌾 <span>${dict.btnViewAndBuy || 'View & Buy'}</span>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  function filterLiteInsights(type, btnElement) {
    activeLiteInsightFilter = type;
    document.querySelectorAll('.lite-insights-filter-btn').forEach(b => {
      b.classList.remove('active');
      b.style.background = '#f8fafc';
      b.style.color = '#475569';
      b.style.borderColor = '#cbd5e1';
    });
    if (btnElement) {
      btnElement.classList.add('active');
      btnElement.style.background = (type === 'buy') ? '#0c5a36' : ((type === 'wait') ? '#c2410c' : '#0c5a36');
      btnElement.style.color = '#ffffff';
      btnElement.style.borderColor = btnElement.style.background;
    }
    renderLiteInsights();
  }

  function speakMarketInsightsSummary() {
    const currentLang = getCurrentLang();
    let text = '';

    if (currentLang === 'mr') {
      text = 'महाराष्ट्र सर्व शेतीमाल बाजारभाव अंदाज. थेट शेतकरी खरेदीमुळे सर्व ३१ पिकांमध्ये सरासरी १७.८ टक्के बचत होत आहे. कांदा आणि हापूस आंब्यामध्ये मोठी तेजी असून आज खरेदी फायदेशीर आहे. डाळिंबामध्ये प्रति किलो २५ रुपयांची मोठी बचत उपलब्ध आहे.';
    } else if (currentLang === 'hi') {
      text = 'महाराष्ट्र सभी फसलों का मंडी भाव और खरीद सलाह। सीधे किसान से खरीद पर सभी 31+ फसलों में औसतन 17.8% की बचत हो रही है। प्याज और हापुस आम में तेजी है और आज खरीदना लाभकारी है। अनार में ₹25 प्रति किलो की सीधी बचत है।';
    } else {
      text = 'AgriNex All-Crop Market Intelligence briefing. Direct farmer procurement across all 31 crops is delivering an average 17.8% price savings over APMC Mandis. Red Onion and Alphonso Mango show strong upward price momentum. Pomegranate delivers the highest arbitrage savings of ₹25 per kg.';
    }

    speakText(text, currentLang);
  }

  function speakCropInsight(cropId) {
    const currentLang = getCurrentLang();
    const item = LITE_MARKET_INSIGHTS_DATA.find(i => i.id === cropId);
    if (!item) return;

    const trans = CROP_TRANSLATIONS[item.cropKey] || { en: item.cropName, hi: item.cropName, mr: item.cropName };
    const displayCrop = trans[currentLang] || item.cropName;
    let text = '';

    if (currentLang === 'mr') {
      text = `${displayCrop}. ${item.mandi} येथे बाजारभाव ₹ ${item.mandiRate} प्रति किलो आहे. थेट शेतकरी भाव ₹ ${item.farmRate} असून तुमची प्रति किलो ₹ ${item.savingsKg} बचत होईल. ${item.reasonMr}`;
    } else if (currentLang === 'hi') {
      text = `${displayCrop}। ${item.mandi} में मंडी भाव ₹ ${item.mandiRate} प्रति किलो है। सीधा किसान भाव ₹ ${item.farmRate} है, जिससे प्रति किलो ₹ ${item.savingsKg} की बचत होगी। ${item.reasonHi}`;
    } else {
      text = `${displayCrop}. Mandi rate at ${item.mandi} is Rupees ${item.mandiRate} per kg. Direct farm-gate price is Rupees ${item.farmRate}, saving you Rupees ${item.savingsKg} per kg. ${item.reasonEn}`;
    }

    speakText(text, currentLang);
  }

  function viewCropLotsFromInsight(cropKey) {
    stopLiteSpeech();
    filterLiteProduce(cropKey);
    switchLiteSection('produce');
    if (typeof showToast === 'function') {
      showToast(`🌾 Showing direct verified farm lots for ${cropKey}`, 'info');
    }
  }

  // =========================================================================
  // 2. RENDER ORDERS & LIVE TRUCKS
  // =========================================================================

  // Helper to retrieve and normalize orders from consignments data
  function getBuyerOrders() {
    if (window.buyerData && Array.isArray(window.buyerData.consignments) && window.buyerData.consignments.length > 0) {
      return window.buyerData.consignments.map(c => {
        const isDeliv = (c.status || '').toLowerCase() === 'delivered';
        const qtyKg = c.quantity_kg || (c.quantity_qt ? c.quantity_qt * 100 : 5000);
        return {
          id: c.tracking_id || c.id || '#ORD-8921',
          crop: c.crop || 'Produce Lot',
          quantityKg: qtyKg,
          status: isDeliv ? 'Delivered' : 'On Road',
          driverName: c.driver || 'Ramesh Shinde',
          driverPhone: c.driver_phone || '+91 94220 88310',
          truckNumber: c.vehicle || 'MH-15-EG-8291',
          currentLocation: c.loc || 'Samruddhi Mahamarg Corridor',
          eta: c.eta || 'Today 4:30 PM (Speed: 58 km/h)'
        };
      });
    }
    if (window.buyerData && Array.isArray(window.buyerData.activeOrders) && window.buyerData.activeOrders.length > 0) {
      return window.buyerData.activeOrders;
    }
    return [];
  }

  function renderLiteOrdersList() {
    const container = document.getElementById('lite-orders-list');
    if (!container) return;

    const dict = getDict();
    const currentLang = getCurrentLang();
    const orders = getBuyerOrders();

    if (orders.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px; color: #64748b;">
          <span style="font-size: 3rem; display: block; margin-bottom: 12px;">🚚</span>
          <h4 style="font-size: 1.2rem; font-weight: 800; color: #334155;">No Active Trucks Right Now</h4>
        </div>
      `;
      return;
    }

    container.innerHTML = orders.map(order => {
      const isDelivered = order.status === 'Delivered';
      const statusBadge = isDelivered 
        ? `<span style="background: #dcfce7; color: #166534; padding: 6px 14px; border-radius: 999px; font-weight: 800; font-size: 0.85rem; border: 1.5px solid #86efac;">${dict.arrived}</span>`
        : `<span style="background: #dbeafe; color: #1e40af; padding: 6px 14px; border-radius: 999px; font-weight: 800; font-size: 0.85rem; border: 1.5px solid #93c5fd; animation: pulse 2s infinite;">${dict.onRoad}</span>`;

      const driverPhone = order.driverPhone || '+91 94220 88310';
      const driverName = order.driverName || 'Ramesh Shinde';
      const truckNumber = order.truckNumber || 'MH-15-EG-8291';
      const currentLocation = order.currentLocation || 'Nashik-Mumbai Expressway (Ghoti Toll Plaza)';
      const crop = order.crop || 'Tomato Hybrid';
      const qty = order.quantityKg ? `${order.quantityKg} kg (${Math.round(order.quantityKg / 50)} Bags)` : '4,500 kg (90 Bags)';

      return `
        <div style="background: #ffffff; border-radius: 18px; border: 2px solid #e2e8f0; padding: 20px; box-shadow: 0 4px 14px rgba(0,0,0,0.05); display: flex; flex-direction: column; gap: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <h4 style="font-size: 1.3rem; font-weight: 900; color: #0f172a; margin: 0;">${crop}</h4>
                <span style="font-size: 0.9rem; color: #64748b; font-weight: 700;">(${order.id || '#ORD-8921'})</span>
              </div>
              <span style="font-size: 0.95rem; font-weight: 700; color: #0c5a36;">📦 ${qty}</span>
            </div>
            <div>
              ${statusBadge}
            </div>
          </div>

          <!-- GPS 3-Point Tracking Progress -->
          <div style="background: #f8fafc; border-radius: 14px; padding: 14px; border: 1px solid #e2e8f0;">
            <div style="display: flex; justify-content: space-between; position: relative; margin-bottom: 10px;">
              <div style="position: absolute; top: 14px; left: 10%; right: 10%; height: 4px; background: #e2e8f0; z-index: 1;">
                <div style="height: 100%; width: ${isDelivered ? '100%' : '60%'}; background: #16a34a; transition: width 0.5s ease;"></div>
              </div>

              <div style="position: relative; z-index: 2; text-align: center; width: 30%;">
                <div style="width: 32px; height: 32px; border-radius: 999px; background: #16a34a; color: #ffffff; display: flex; align-items: center; justify-content: center; margin: 0 auto 6px auto; font-size: 0.9rem; font-weight: 900; box-shadow: 0 2px 6px rgba(22, 163, 74, 0.3);">✓</div>
                <span style="font-size: 0.75rem; font-weight: 800; color: #0f172a; display: block;">${dict.mandiDispatch}</span>
              </div>

              <div style="position: relative; z-index: 2; text-align: center; width: 30%;">
                <div style="width: 32px; height: 32px; border-radius: 999px; background: ${isDelivered ? '#16a34a' : '#2563eb'}; color: #ffffff; display: flex; align-items: center; justify-content: center; margin: 0 auto 6px auto; font-size: 0.9rem; font-weight: 900; box-shadow: 0 2px 6px rgba(37, 99, 235, 0.3);">🚛</div>
                <span style="font-size: 0.75rem; font-weight: 800; color: #0f172a; display: block;">${dict.highwayCheck}</span>
              </div>

              <div style="position: relative; z-index: 2; text-align: center; width: 30%;">
                <div style="width: 32px; height: 32px; border-radius: 999px; background: ${isDelivered ? '#16a34a' : '#94a3b8'}; color: #ffffff; display: flex; align-items: center; justify-content: center; margin: 0 auto 6px auto; font-size: 0.9rem; font-weight: 900;">📍</div>
                <span style="font-size: 0.75rem; font-weight: 800; color: #64748b; display: block;">${dict.warehouseDest}</span>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; font-size: 0.88rem; margin-top: 12px; border-top: 1px dashed #cbd5e1; padding-top: 10px;">
              <div>
                <span style="font-size: 0.75rem; font-weight: 700; color: #64748b; display: block;">${dict.locationLabel}:</span>
                <strong style="color: #0f172a;">📍 ${currentLocation}</strong>
              </div>
              <div>
                <span style="font-size: 0.75rem; font-weight: 700; color: #64748b; display: block;">${dict.driverLabel}:</span>
                <strong style="color: #0f172a;">👤 ${driverName} (${truckNumber})</strong>
              </div>
              <div>
                <span style="font-size: 0.75rem; font-weight: 700; color: #64748b; display: block;">${dict.etaLabel}:</span>
                <strong style="color: #0c5a36;">⏱️ ${order.eta || 'Today 4:30 PM (2 hrs 15 mins away)'}</strong>
              </div>
            </div>
          </div>

          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <button type="button" class="btn btn-primary" style="flex: 1; padding: 12px; font-size: 0.95rem; font-weight: 800; background: #0c5a36; border-color: #0c5a36; border-radius: 12px;" onclick="callDriverDirect('${driverPhone}', '${driverName}')">
              📞 ${dict.callDriver}
            </button>
            <button type="button" class="btn btn-outline" style="flex: 1; padding: 12px; font-size: 0.95rem; font-weight: 800; border-color: #cbd5e1; border-radius: 12px;" onclick="speakTruckStatus('${order.id || ''}', '${crop}', '${driverName}', '${currentLocation}')">
              🔊 ${dict.listenStatus}
            </button>
            <button type="button" class="btn btn-secondary" style="padding: 12px 18px; font-size: 0.95rem; font-weight: 800; background: #25d366; color: #ffffff; border: none; border-radius: 12px;" onclick="shareOrderOnWhatsApp('${order.id || '#ORD-8921'}', '${crop}', '${truckNumber}')">
              💬 ${dict.whatsappShare}
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // =========================================================================
  // 3. RENDER ESCROW CARDS
  // =========================================================================

  function renderLiteEscrowCards() {
    const container = document.getElementById('lite-escrow-list');
    if (!container) return;

    const dict = getDict();
    const lots = (window.buyerData && window.buyerData.verifiedLots) ? window.buyerData.verifiedLots.slice(0, 4) : [];

    container.innerHTML = lots.map((lot, idx) => {
      const crop = lot.crop || 'Produce Lot';
      const farmer = lot.farmerName || 'Farmer Partner';
      const totalAmount = (lot.pricePerKg || 25) * (lot.availableQtyKg || 5000);
      const depositAmount = Math.round(totalAmount * 0.35);

      return `
        <div style="background: #ffffff; border-radius: 18px; border: 1.5px solid #e2e8f0; padding: 20px; box-shadow: 0 4px 14px rgba(0,0,0,0.05); display: flex; flex-direction: column; gap: 14px;">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 1.2rem;">🔒</span>
                <h4 style="font-size: 1.2rem; font-weight: 800; color: #0f172a; margin: 0;">${crop} (Lot #LOT-${1042 + idx})</h4>
              </div>
              <span style="font-size: 0.88rem; color: #64748b; font-weight: 600;">👨‍🌾 ${farmer}</span>
            </div>
            <span style="background: #ecfdf5; color: #065f46; border: 1.5px solid #a7f3d0; padding: 6px 14px; border-radius: 999px; font-weight: 800; font-size: 0.85rem;">
              🛡️ ${dict.step1Title}
            </span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; background: #f8fafc; border-radius: 12px; padding: 14px; border: 1px solid #e2e8f0;">
            <div>
              <span style="font-size: 0.75rem; font-weight: 800; color: #64748b; text-transform: uppercase;">Total Lot Value</span>
              <div style="font-size: 1.25rem; font-weight: 900; color: #0f172a;">₹ ${totalAmount.toLocaleString()}</div>
            </div>
            <div>
              <span style="font-size: 0.75rem; font-weight: 800; color: #0c5a36; text-transform: uppercase;">35% Protected Deposit</span>
              <div style="font-size: 1.25rem; font-weight: 900; color: #0c5a36;">₹ ${depositAmount.toLocaleString()}</div>
            </div>
            <div>
              <span style="font-size: 0.75rem; font-weight: 800; color: #64748b; text-transform: uppercase;">Escrow Trustee</span>
              <div style="font-size: 0.95rem; font-weight: 800; color: #334155;">🏛️ SBI Custody Bank</div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // =========================================================================
  // 4. TTS VOICE UTILITIES
  // =========================================================================

  function speakText(text, lang = 'en') {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = currentSpeechRate;
    utterance.pitch = 1.0;

    if (lang === 'mr') {
      utterance.lang = 'mr-IN';
    } else if (lang === 'hi') {
      utterance.lang = 'hi-IN';
    } else {
      utterance.lang = 'en-IN';
    }

    window.speechSynthesis.speak(utterance);
  }

  function stopLiteSpeech() {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }

  function speakLotDetails(lotId) {
    const lots = (window.buyerData && window.buyerData.verifiedLots) ? window.buyerData.verifiedLots : [];
    const lot = lots.find(l => l.id === lotId) || lots[0];
    if (!lot) return;

    const currentLang = getCurrentLang();
    const cropEntry = Object.entries(CROP_TRANSLATIONS).find(([k]) => lot.crop.toLowerCase().includes(k.toLowerCase()));
    const trans = cropEntry ? cropEntry[1] : { en: lot.crop, hi: lot.crop, mr: lot.crop };
    const displayCrop = (currentLang === 'en') ? lot.crop : (trans[currentLang] || lot.crop);
    const kgPrice = lot.pricePerKg || 20;
    const bags = Math.round((lot.availableQtyKg || 5000) / 50);

    let text = '';
    if (currentLang === 'mr') {
      text = `${displayCrop}. शेतकरी ${lot.farmerName}, ${lot.farmerLocation}. भाव ${kgPrice} रुपये प्रति किलो. उपलब्ध माल ${bags} पोती. ३५ टक्के सुरक्षित अनामत रकमेसह खरेदी करण्यासाठी हिरवे खरेदी बटण दाबा.`;
    } else if (currentLang === 'hi') {
      text = `${displayCrop}। किसान ${lot.farmerName}, ${lot.farmerLocation}। भाव ${kgPrice} रुपये प्रति किलो। उपलब्ध माल ${bags} बोरी। सुरक्षित एस्क्रो में खरीद के लिए हरा बटन दबाएं।`;
    } else {
      text = `${displayCrop}. Farmer ${lot.farmerName} from ${lot.farmerLocation}. Price is ${kgPrice} rupees per kg. Available quantity is ${bags} bags. Tap the green Buy Now button to place your order with escrow protection.`;
    }

    speakText(text, currentLang);
  }

  function speakOrdersSummary() {
    const currentLang = getCurrentLang();
    const orders = getBuyerOrders();
    
    if (orders.length === 0) {
      const msg = (currentLang === 'mr') ? 'सध्या कोणतीही गाडी रस्त्यात नाही.' : (currentLang === 'hi' ? 'वर्तमान में कोई गाड़ी रास्ते में नहीं है।' : 'No active truck shipments right now.');
      speakText(msg, currentLang);
      return;
    }

    const first = orders[0];
    let text = '';
    if (currentLang === 'mr') {
      text = `तुमची ${first.crop} घेऊन येणारी गाडी ${first.truckNumber} सध्या ${first.currentLocation} येथे आहे. चालक ${first.driverName} यांच्याशी थेट बोलण्यासाठी फोन बटण दाबा.`;
    } else if (currentLang === 'hi') {
      text = `आपकी ${first.crop} की गाड़ी ${first.truckNumber} वर्तमान में ${first.currentLocation} पर है। चालक ${first.driverName} से बात करने के लिए कॉल बटन दबाएं।`;
    } else {
      text = `Your shipment of ${first.crop} on truck ${first.truckNumber} is currently at ${first.currentLocation}. Tap the call button to contact driver ${first.driverName}.`;
    }

    speakText(text, currentLang);
  }

  function speakTruckStatus(orderId, crop, driverName, location) {
    const currentLang = getCurrentLang();
    let text = '';
    if (currentLang === 'mr') {
      text = `गाडीची स्थिती: ${crop}. चालक ${driverName}. सध्याचे ठिकाण ${location}. माल गोदामात सुखरूप पोहोचत आहे.`;
    } else if (currentLang === 'hi') {
      text = `गाड़ी स्थिति: ${crop}। चालक ${driverName}। वर्तमान स्थान ${location}।`;
    } else {
      text = `Truck Status: ${crop}. Driver is ${driverName}. Current location is ${location}.`;
    }

    speakText(text, currentLang);
  }

  // =========================================================================
  // 5. BUY & BARGAIN MODALS
  // =========================================================================

  let activeBuyLot = null;
  let selectedBuyBags = 20;

  function openLiteBuyModal(lotId) {
    const lots = (window.buyerData && window.buyerData.verifiedLots) ? window.buyerData.verifiedLots : [];
    activeBuyLot = lots.find(l => l.id === lotId) || lots[0];
    if (!activeBuyLot) return;

    selectedBuyBags = 20;
    updateLiteBuyCalculations();

    const modal = document.getElementById('lite-modal-buy');
    if (modal) modal.style.display = 'flex';

    const currentLang = getCurrentLang();
    const cropEntry = Object.entries(CROP_TRANSLATIONS).find(([k]) => activeBuyLot.crop.toLowerCase().includes(k.toLowerCase()));
    const trans = cropEntry ? cropEntry[1] : { en: activeBuyLot.crop, hi: activeBuyLot.crop, mr: activeBuyLot.crop };
    const displayCrop = trans[currentLang] || activeBuyLot.crop;

    const titleEl = document.getElementById('lite-modal-crop-title');
    if (titleEl) titleEl.textContent = displayCrop;

    const farmerEl = document.getElementById('lite-modal-farmer-name');
    if (farmerEl) farmerEl.textContent = `👨‍🌾 ${activeBuyLot.farmerName} (${activeBuyLot.farmerLocation})`;
  }

  function closeLiteBuyModal() {
    const modal = document.getElementById('lite-modal-buy');
    if (modal) modal.style.display = 'none';
  }

  function changeLiteBuyQuantity(delta) {
    selectedBuyBags = Math.max(5, Math.min(200, selectedBuyBags + delta));
    updateLiteBuyCalculations();
  }

  function updateLiteBuyCalculations() {
    if (!activeBuyLot) return;

    const kgPrice = activeBuyLot.pricePerKg || 20;
    const totalKg = selectedBuyBags * 50;
    const totalAmount = totalKg * kgPrice;
    const depositAmount = Math.round(totalAmount * 0.35);

    const qtyEl = document.getElementById('lite-modal-qty-value');
    if (qtyEl) qtyEl.textContent = `${selectedBuyBags} Bags (${totalKg.toLocaleString()} kg)`;

    const rateEl = document.getElementById('lite-modal-rate-value');
    if (rateEl) rateEl.textContent = `₹${kgPrice} / kg`;

    const totalEl = document.getElementById('lite-modal-total-value');
    if (totalEl) totalEl.textContent = `₹ ${totalAmount.toLocaleString()}`;

    const depEl = document.getElementById('lite-modal-escrow-value');
    if (depEl) depEl.textContent = `₹ ${depositAmount.toLocaleString()} (35% Protected)`;
  }

  function confirmLiteBuyOrder() {
    const dict = getDict();
    if (!activeBuyLot) {
      closeLiteBuyModal();
      return;
    }

    const kgPrice = Number(activeBuyLot.pricePerKg) || 20;
    const totalKg = selectedBuyBags * 50;
    const totalAmount = totalKg * kgPrice;
    const depositAmount = Math.round(totalAmount * 0.35);
    const balanceAmount = totalAmount - depositAmount;

    // 1. Lock 35% Escrow
    if (window.buyerEscrowState) {
      if (window.buyerEscrowState.availableLiquidity >= depositAmount) {
        window.buyerEscrowState.availableLiquidity -= depositAmount;
      }
      const currentAdv = window.buyerEscrowState.advanceLocked || window.buyerEscrowState.lockedAdvance || 0;
      window.buyerEscrowState.advanceLocked = currentAdv + depositAmount;
      window.buyerEscrowState.lockedAdvance = window.buyerEscrowState.advanceLocked;
      try {
        localStorage.setItem('agrinex_buyer_escrow', JSON.stringify(window.buyerEscrowState));
      } catch(e) {}
      if (typeof updateEscrowVaultDOM === 'function') updateEscrowVaultDOM();
    }

    // 2. Create Consignment
    const newConsignment = {
      id: `TRK-${Date.now().toString().slice(-4)}-LITE`,
      tracking_id: `TRK-${Date.now().toString().slice(-4)}-LITE`,
      contract_id: `ESC-MH-${Math.floor(1000 + Math.random() * 9000)}`,
      lot_id: activeBuyLot.id || `LOT-${Date.now().toString().slice(-4)}`,
      crop: activeBuyLot.crop || 'Produce',
      farmer_name: activeBuyLot.farmerName || 'Farmer Partner',
      farmer_location: activeBuyLot.farmerLocation || 'Nashik APMC',
      driver_name: 'Dnyaneshwar Shinde (AgriNex Express)',
      driver_phone: '+91 98224 55102',
      vehicle_no: 'MH-15-EG-4412',
      origin: activeBuyLot.farmerLocation || 'Nashik',
      destination: 'Buyer Central Hub, Mumbai',
      quantity_qt: Math.round((totalKg / 100) * 10) / 10,
      quantity_kg: totalKg,
      rate_kg: kgPrice,
      total_val: totalAmount,
      advance_paid: depositAmount,
      balance_due: balanceAmount,
      freight_fee: 4500,
      status: 'transit',
      status_label: 'Vehicle Dispatched',
      eta: 'Tomorrow, 9:00 AM',
      progress: 20,
      assay_grade: activeBuyLot.grade || 'Grade A',
      temp_celsius: 15.5
    };

    if (!window.buyerData) window.buyerData = {};
    if (!window.buyerData.consignments) window.buyerData.consignments = [];
    window.buyerData.consignments.unshift(newConsignment);

    try {
      localStorage.setItem('agrinex_buyer_consignments', JSON.stringify(window.buyerData.consignments));
    } catch(err) {}

    closeLiteBuyModal();
    if (typeof showToast === 'function') {
      showToast(dict.orderSuccess, 'success');
    }
    const currentLang = getCurrentLang();
    speakText(dict.orderSuccess, currentLang);

    if (typeof renderBuyerConsignments === 'function') renderBuyerConsignments();
    if (typeof renderLiteOrdersList === 'function') renderLiteOrdersList();
    if (typeof updateBuyerMarketStats === 'function') updateBuyerMarketStats();
  }

  // Bargain Modal
  let activeBargainLot = null;
  let counterRate = 20;

  function openLiteBargainModal(lotId) {
    const lots = (window.buyerData && window.buyerData.verifiedLots) ? window.buyerData.verifiedLots : [];
    activeBargainLot = lots.find(l => l.id === lotId) || lots[0];
    if (!activeBargainLot) return;

    const baseRate = Number(activeBargainLot.pricePerKg) || 24;
    counterRate = Math.max(1, baseRate - 2);

    const modal = document.getElementById('lite-modal-bargain');
    if (modal) modal.style.display = 'flex';

    const farmRateEl = document.getElementById('lite-bargain-farmer-rate');
    if (farmRateEl) farmRateEl.textContent = `₹ ${baseRate} / kg`;

    const countRateEl = document.getElementById('lite-bargain-counter-rate');
    if (countRateEl) countRateEl.textContent = `₹ ${counterRate} / kg`;
  }

  function closeLiteBargainModal() {
    const modal = document.getElementById('lite-modal-bargain');
    if (modal) modal.style.display = 'none';
  }

  function selectBargainRateDelta(delta) {
    if (!activeBargainLot) return;
    const baseRate = Number(activeBargainLot.pricePerKg) || 24;
    counterRate = Math.max(1, baseRate + delta);

    const countRateEl = document.getElementById('lite-bargain-counter-rate');
    if (countRateEl) countRateEl.textContent = `₹ ${counterRate} / kg`;
  }

  function changeLiteBargainQuantity(delta) {
    counterRate = Math.max(1, counterRate + delta);
    const countRateEl = document.getElementById('lite-bargain-counter-rate');
    if (countRateEl) countRateEl.textContent = `₹ ${counterRate} / kg`;
  }

  function startVoiceBargainOffer() {
    const currentLang = getCurrentLang();
    const prompt = (currentLang === 'mr') ? 'तुमचा भाव सांगा (उदा. वीस रुपये)' : (currentLang === 'hi' ? 'अपना भाव बोलें (जैसे 20 रुपये)' : 'Speak your counter offer rate now');
    speakText(prompt, currentLang);
  }

  function sendLiteBargainOffer() {
    const dict = getDict();
    closeLiteBargainModal();
    if (typeof showToast === 'function') {
      showToast(dict.bargainOfferSent, 'success');
    }
    const currentLang = getCurrentLang();
    speakText(dict.bargainOfferSent, currentLang);
  }

  function shareOrderOnWhatsApp(orderId, crop, truck) {
    const text = encodeURIComponent(`AgriNex Delivery Update: Order ${orderId} for ${crop} on truck ${truck} is in transit with live GPS tracking.`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  }

  function callFarmerDirect(phone, name) {
    const dict = getDict();
    const currentLang = getCurrentLang();
    speakText(`${dict.connectingFarmer} ${name}`, currentLang);
    window.location.href = `tel:${phone}`;
  }

  function callDriverDirect(phone, name) {
    const dict = getDict();
    const currentLang = getCurrentLang();
    speakText(`${dict.connectingDriver} ${name}`, currentLang);
    window.location.href = `tel:${phone}`;
  }

  function openLiteGrievanceModal() {
    const modal = document.getElementById('lite-modal-grievance');
    if (modal) modal.style.display = 'flex';
  }

  function closeLiteGrievanceModal() {
    const modal = document.getElementById('lite-modal-grievance');
    if (modal) modal.style.display = 'none';
  }

  function toggleGrievanceRecord() {
    const dict = getDict();
    const currentLang = getCurrentLang();
    speakText(dict.recording, currentLang);
  }

  function submitLiteGrievance() {
    const dict = getDict();
    closeLiteGrievanceModal();
    if (typeof showToast === 'function') {
      showToast(dict.ticketGenerated, 'success');
    }
    const currentLang = getCurrentLang();
    speakText(dict.ticketGenerated, currentLang);
  }

  function startLiteVoiceAssistant() {
    const dict = getDict();
    const currentLang = getCurrentLang();
    speakText(dict.voicePrompt, currentLang);
  }

  function initLiteMode() {
    isLiteMode = localStorage.getItem('agrinex_buyer_lite_mode') !== 'false';
    
    const toggleBtn = document.getElementById('btn-toggle-lite-mode');
    if (toggleBtn) updateToggleBtnState(toggleBtn);

    applyLiteModeUI(isLiteMode);

    if (isLiteMode) {
      updateLiteModeLanguage(getCurrentLang());
      switchLiteSection(activeLiteSection || 'produce');
    }
  }

  // Initialize on Load (or immediately if DOM is already ready)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLiteMode);
  } else {
    initLiteMode();
  }

  // Global window bindings
  window.initLiteMode = initLiteMode;
  window.toggleLiteMode = toggleLiteMode;
  window.switchLiteSection = switchLiteSection;
  window.updateLiteModeLanguage = updateLiteModeLanguage;
  window.filterLiteProduce = filterLiteProduce;
  window.renderLiteProduceCards = renderLiteProduceCards;
  window.renderLiteOrdersList = renderLiteOrdersList;
  window.renderLiteOrdersCards = renderLiteOrdersList;
  window.renderLiteEscrowCards = renderLiteEscrowCards;
  window.renderLiteInsights = renderLiteInsights;
  window.filterLiteInsights = filterLiteInsights;
  window.speakMarketInsightsSummary = speakMarketInsightsSummary;
  window.speakCropInsight = speakCropInsight;
  window.viewCropLotsFromInsight = viewCropLotsFromInsight;
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
