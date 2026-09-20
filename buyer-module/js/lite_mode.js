/**
 * AgriNex Buyer Module - Simple & Audio-First Lite Mode (सरल मोड / सुलभ मोड)
 * Designed specifically for elderly, low-vision, or non-literate traders and buyers.
 * Supports All 31+ Verified Farm Produce Crops & All Agricultural Categories.
 */

(function () {
  'use strict';

  // Default to Enterprise Mode on desktop unless user explicitly chosen simple mode or is on mobile
  const savedLitePref = localStorage.getItem('agrinex_buyer_lite_mode');
  let isLiteMode = savedLitePref !== null 
    ? (savedLitePref === 'true') 
    : (typeof window !== 'undefined' && window.innerWidth < 1024);
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
      tabBulk: '⚡ Post Bulk Quota',
      tabOrders: '🚚 My Orders & Trucks',
      tabGrievance: '🚨 Disputes & Grievance',
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
      voiceBargainBtn: 'Speak Counter Rate',
      sendBargainOffer: '💬 Send Offer to Farmer',
      bargainOfferSent: 'Counter-offer sent to farmer! Farmer will review and notify you.',
      youSaveText: 'You Save',
      bulkBadge: 'Direct FPO & Farmer Broadcast',
      bulkTitle: '⚡ 1-Tap Post Bulk Requirement',
      bulkDesc: 'Broadcast your bulk buying demand (e.g., 500 Bags Onion, 1,000 Bags Wheat) directly to verified Maharashtra farmers & FPOs.',
      bulkVoiceBtn: 'Speak Demand',
      bulkFormTitle: '📝 1-Tap Procurement Quota Details',
      bulkCropLabel: '1. Select Crop:',
      bulkQtyLabel: '2. Required Quantity:',
      bulkPriceLabel: '3. Target Max Buying Price:',
      bulkUnitLabel: '/ kg',
      bulkTotalBudgetLabel: 'Total Estimated Budget:',
      bulkSavingsEst: '💰 Approx ~15% Lower than APMC middlemen',
      bulkHubLabel: '4. Delivery Hub:',
      bulkGradeLabel: '5. Quality Grade:',
      bulkSubmitBtn: 'Publish Bulk Quota Now',
      bulkActiveTitle: '📋 Active Posted Quotas & Farmer Bids',
      bulkActiveSub: 'Real-time farmer lots and FPO bids responding to your quotas',
      bulkSuccessMsg: '✓ Bulk Procurement Quota broadcasted to 1,200+ verified Maharashtra farmers & FPOs!',
      grvBadge: 'Quality Dispute Arbitrator',
      grvHeroTitle: '🚨 1-Tap Voice Dispute & Grievance',
      grvHeroDesc: 'Encountered quality issues, moisture mismatch, or weight shortage? Record a 15-second voice note. Smart escrow immediately freezes payout to farmer until resolution.',
      grvVoiceBtn: 'Speak Voice Dispute',
      grvFormTitle: '🎙️ Lodge Instant Quality Dispute',
      grvCatLabel: '1. Select Dispute Reason:',
      grvConsLabel: '2. Select In-Transit Shipment:',
      grvPhotoLabel: '3. Photo Evidence:',
      grvPhotoBtnText: 'Attach Inspection Photo',
      grvSubmitBtn: 'File Quality Grievance & Freeze Escrow',
      grvActiveTitle: '🛡️ Active Grievances & Settlement Status',
      grvActiveSub: 'Track real-time field surveyor investigations and escrow rebate settlements',
      grvRecordingPrompt: '🎙️ Tap mic button and speak issue (e.g., High moisture in onion bags)',
      grvRecordingActive: '🔴 Recording... Speak your issue clearly',
      grvRecordingDone: '✓ 15s Voice Note Recorded Successfully!',
      grvSuccessMsg: '🚨 Dispute ticket registered! Farmer payout frozen in SBI Escrow. Arbitrator assigned.',
      grvSettledMsg: '✓ Grievance settlement accepted! Rebate refunded to your account.',
      surveyorLabel: 'Assigned Surveyor'
    },
    hi: {
      toggleSimple: 'सरल मोड',
      toggleEnterprise: 'एंटरप्राइज मोड',
      tabProduce: '🌾 शेतीमाल खरीद (Buy)',
      tabBulk: '⚡ बड़ी मांग दर्ज करें (Bulk)',
      tabOrders: '🚚 मेरी गाड़ियां व ऑर्डर्स',
      tabGrievance: '🚨 शिकायत व विवाद (Grievance)',
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
      youSaveText: 'बचत',
      bulkBadge: 'सीधा किसान व एफपीओ प्रसारण',
      bulkTitle: '⚡ 1-क्लिक बड़ी खरीद मांग (Bulk Quota)',
      bulkDesc: 'अपनी थोक खरीद मांग (उदा. 500 बोरी प्याज, 1000 बोरी गेहूं) सीधे महाराष्ट्र के सत्यापित किसानों और FPOs को भेजें।',
      bulkVoiceBtn: 'बोलकर मांग बताएं',
      bulkFormTitle: '📝 1-क्लिक थोक खरीद विवरण',
      bulkCropLabel: '1. फसल चुनें (Select Crop):',
      bulkQtyLabel: '2. आवश्यक मात्रा (Quantity):',
      bulkPriceLabel: '3. अधिकतम खरीद दर (Target Price):',
      bulkUnitLabel: '/ किलो',
      bulkTotalBudgetLabel: 'कुल अनुमानित बजट:',
      bulkSavingsEst: '💰 बिचौलियों से लगभग ~15% सस्ती खरीद',
      bulkHubLabel: '4. माल उतरने का स्थान (Delivery Hub):',
      bulkGradeLabel: '5. गुणवत्ता ग्रेड (Quality Grade):',
      bulkSubmitBtn: 'किसानों को मांग भेजें (Publish Quota)',
      bulkActiveTitle: '📋 सक्रिय मांगें व किसानों के प्रस्ताव',
      bulkActiveSub: 'आपकी मांग पर किसानों और FPOs के लाइव ऑफर',
      bulkSuccessMsg: '✓ थोक मांग सफलतापूर्वक 1,200+ किसानों और FPOs को प्रसारित कर दी गई है!',
      grvBadge: 'गुणवत्ता विवाद मध्यस्थ',
      grvHeroTitle: '🚨 1-क्लिक आवाज़ में शिकायत (Dispute)',
      grvHeroDesc: 'गुणवत्ता, अधिक नमी या वजन कम होने की समस्या? 15 सेकंड का वॉयस नोट रिकॉर्ड करें। एस्क्रो खाता किसान का भुगतान तुरंत रोक देता है।',
      grvVoiceBtn: 'बोलकर शिकायत करें',
      grvFormTitle: '🎙️ गुणवत्ता विवाद दर्ज करें',
      grvCatLabel: '1. शिकायत का कारण चुनें:',
      grvConsLabel: '2. रास्ते में चल रही गाड़ी चुनें:',
      grvPhotoLabel: '3. गुणवत्ता फोटो प्रमाण:',
      grvPhotoBtnText: 'निरीक्षण फोटो संलग्न करें',
      grvSubmitBtn: 'शिकायत दर्ज करें व भुगतान रोकें',
      grvActiveTitle: '🛡️ सक्रिय शिकायतें व समाधान स्थिति',
      grvActiveSub: 'सर्वेयर जांच व एस्क्रो रिफंड की लाइव स्थिति',
      grvRecordingPrompt: '🎙️ माइक दबाएं और शिकायत बोलें (जैसे प्याज में नमी ज्यादा है)',
      grvRecordingActive: '🔴 रिकॉर्डिंग चालू है... अपनी समस्या बोलें',
      grvRecordingDone: '✓ वॉयस नोट सफलतापूर्वक रिकॉर्ड हो गया!',
      grvSuccessMsg: '🚨 शिकायत दर्ज! किसान का एस्क्रो भुगतान रोक दिया गया है। अधिकारी नियुक्त।',
      grvSettledMsg: '✓ समाधान स्वीकार किया गया! छूट राशि आपके खाते में वापस कर दी गई है।',
      surveyorLabel: 'नियुक्त सर्वेयर'
    },
    mr: {
      toggleSimple: 'सुलभ मोड',
      toggleEnterprise: 'एंटरप्राइज मोड',
      tabProduce: '🌾 शेतीमाल खरेदी (Buy)',
      tabBulk: '⚡ मोठी मागणी (Bulk Quota)',
      tabOrders: '🚚 माझ्या गाड्या व ऑर्डर्स',
      tabGrievance: '🚨 तक्रार व वाद निवारण',
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
      youSaveText: 'बचत',
      bulkBadge: 'थेट शेतकरी व FPO प्रसारण',
      bulkTitle: '⚡ १-क्लिक मोठी खरेदी नोंदवा (Bulk Quota)',
      bulkDesc: 'तुमची मोठी खरेदी मागणी (उदा. ५०० पोती कांदा, १००० पोती गहू) थेट महाराष्ट्रातील खात्रीशीर शेतकरी व FPOs कडे पाठवा.',
      bulkVoiceBtn: 'बोलून मागणी सांगा',
      bulkFormTitle: '📝 १-क्लिक खरेदी कोटा तपशील',
      bulkCropLabel: '१. पीक निवडा (Select Crop):',
      bulkQtyLabel: '२. मागणीचे प्रमाण (Quantity):',
      bulkPriceLabel: '३. कमाल खरेदी भाव (Target Price):',
      bulkUnitLabel: '/ किलो',
      bulkTotalBudgetLabel: 'एकूण अंदाजे बजेट:',
      bulkSavingsEst: '💰 दलालांपेक्षा सुमारे ~१५% थेट बचत',
      bulkHubLabel: '४. माल उतरवण्याचे ठिकाण (Delivery Hub):',
      bulkGradeLabel: '५. गुणवत्ता प्रतवारी (Quality Grade):',
      bulkSubmitBtn: 'शेतकऱ्यांना मागणी पाठवा (Publish)',
      bulkActiveTitle: '📋 सक्रिय मागण्या व शेतकऱ्यांचे दर',
      bulkActiveSub: 'तुमच्या मागणीवर शेतकरी व FPOs कडून आलेले थेट दर',
      bulkSuccessMsg: '✓ मोठी मागणी १,२००+ शेतकरी व FPOs कडे यशस्वीरीत्या पाठवली गेली आहे!',
      grvBadge: 'गुणवत्ता वाद लवाद',
      grvHeroTitle: '🚨 १-क्लिक आवाजात तक्रार (Dispute & Grievance)',
      grvHeroDesc: 'मालाचा दर्जा कमी, ओलावा जास्त किंवा वजन कमी भरले आहे? १५ सेकंदांची व्हॉईस क्लिप रेकॉर्ड करा. एस्क्रो खाते शेतकऱ्याचे पैसे तत्काळ थांबवते.',
      grvVoiceBtn: 'बोलून तक्रार नोंदवा',
      grvFormTitle: '🎙️ गुणवत्ता वाद तत्काळ नोंदवा',
      grvCatLabel: '१. तक्रारीचे कारण निवडा:',
      grvConsLabel: '२. रस्त्यातील गाडी / खेप निवडा:',
      grvPhotoLabel: '३. गुणवत्ता फोटो पुरावा:',
      grvPhotoBtnText: 'तपासणी फोटो जोडा',
      grvSubmitBtn: 'तक्रार पाठवा व पैसे थांबवा',
      grvActiveTitle: '🛡️ चालू तक्रारी व निवारण स्थिती',
      grvActiveSub: 'प्रत्यक्ष कृषी सर्वेक्षक तपासणी व एस्क्रो परतावा स्थिती',
      grvRecordingPrompt: '🎙️ माइक बटण दाबा आणि तक्रार बोला (उदा. कांद्यामध्ये ओलावा जास्त आहे)',
      grvRecordingActive: '🔴 रेकॉर्डिंग सुरू आहे... तुमची समस्या स्पष्ट बोला',
      grvRecordingDone: '✓ व्हॉईस क्लिप यशस्वीरीत्या रेकॉर्ड झाली!',
      grvSuccessMsg: '🚨 तक्रार नोंदवली! शेतकऱ्याचे एस्क्रो पैसे थांबवले आहेत. अधिकृत सर्वेक्षक नियुक्त केला.',
      grvSettledMsg: '✓ निवारण प्रस्ताव मान्य केला! परतावा रक्कम खात्यात वर्ग करण्यात आली.',
      surveyorLabel: 'नियुक्त कृषी अधिकारी / सर्वेक्षक'
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

  // Preload and cache browser voices for Solution 2
  let cachedVoices = [];
  function populateVoices() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      cachedVoices = window.speechSynthesis.getVoices();
    }
  }
  populateVoices();
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = populateVoices;
  }

  function getBestVoiceForLang(langCode) {
    if (!cachedVoices.length) populateVoices();
    const targetTag = (langCode === 'hi') ? 'hi-IN' : ((langCode === 'mr') ? 'mr-IN' : 'en-IN');
    
    // 1. Exact dialect match (hi-IN, mr-IN, en-IN)
    let voice = cachedVoices.find(v => v.lang === targetTag || v.lang.replace('_', '-') === targetTag);
    
    // 2. Language code prefix match
    if (!voice) {
      voice = cachedVoices.find(v => v.lang.toLowerCase().startsWith(langCode.toLowerCase()));
    }
    
    // 3. Fallback for Marathi to Hindi voice (Devanagari script support)
    if (!voice && langCode === 'mr') {
      voice = cachedVoices.find(v => v.lang.toLowerCase().startsWith('hi'));
    }

    // 4. Default Indian English fallback
    if (!voice && langCode === 'en') {
      voice = cachedVoices.find(v => v.lang.toLowerCase().includes('en-in') || v.lang.toLowerCase().includes('en_in'));
    }
    return voice || null;
  }

  // Solution 4: Global Reactive Sync across Simple and Enterprise modules
  function notifyStateChange(eventType, payload) {
    try {
      const event = new CustomEvent('agrinex:state-updated', { 
        detail: { eventType, payload, timestamp: Date.now() } 
      });
      window.dispatchEvent(event);
    } catch(e) {}

    // Automatically trigger Enterprise view refreshers if available
    if (typeof renderBuyerConsignments === 'function') renderBuyerConsignments();
    if (typeof renderConsignmentsTable === 'function') renderConsignmentsTable();
    if (typeof updateBuyerMarketStats === 'function') updateBuyerMarketStats();
    if (typeof updateEscrowVaultDOM === 'function') updateEscrowVaultDOM();
  }

  // Solution 1: Robust Mode Resolution in initLiteMode()
  function initLiteMode() {
    const savedPref = localStorage.getItem('agrinex_buyer_lite_mode');
    if (savedPref !== null) {
      isLiteMode = (savedPref === 'true');
    } else {
      // Default to Enterprise Mode on desktop, Simple Mode on mobile
      isLiteMode = (typeof window !== 'undefined' && window.innerWidth < 1024);
    }

    const toggleBtn = document.getElementById('btn-toggle-lite-mode');
    if (toggleBtn) {
      updateToggleBtnState(toggleBtn);
    }

    applyLiteModeUI(isLiteMode);

    // Apply saved accessibility preferences
    setLiteSpeechRate(currentSpeechRate, false);
    setLiteFontSize(currentFontSize);
    if (isSunlightMode) {
      document.body.classList.add('lite-sunlight-mode');
    }

    if (isLiteMode) {
      updateLiteModeLanguage(getCurrentLang());
      switchLiteSection(activeLiteSection || 'produce');
    }

    // Listen to global language change event
    if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
      window.addEventListener('agrinex_language_changed', function (e) {
        const newLang = e.detail ? e.detail.lang : getCurrentLang();
        updateLiteModeLanguage(newLang);
      });
    }
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
    const tabBulk = document.getElementById('lite-tab-bulk');
    const tabInsights = document.getElementById('lite-tab-insights');
    const tabOrders = document.getElementById('lite-tab-orders');
    const tabGrievance = document.getElementById('lite-tab-grievance');
    const tabEscrow = document.getElementById('lite-tab-escrow');

    const secProduce = document.getElementById('lite-section-produce');
    const secBulk = document.getElementById('lite-section-bulk');
    const secInsights = document.getElementById('lite-section-insights');
    const secOrders = document.getElementById('lite-section-orders');
    const secGrievance = document.getElementById('lite-section-grievance');
    const secEscrow = document.getElementById('lite-section-escrow');

    if (tabProduce) tabProduce.classList.toggle('active', section === 'produce');
    if (tabBulk) tabBulk.classList.toggle('active', section === 'bulk');
    if (tabInsights) tabInsights.classList.toggle('active', section === 'insights');
    if (tabOrders) tabOrders.classList.toggle('active', section === 'orders');
    if (tabGrievance) tabGrievance.classList.toggle('active', section === 'grievance');
    if (tabEscrow) tabEscrow.classList.toggle('active', section === 'escrow');

    if (secProduce) secProduce.style.display = section === 'produce' ? 'block' : 'none';
    if (secBulk) secBulk.style.display = section === 'bulk' ? 'block' : 'none';
    if (secInsights) secInsights.style.display = section === 'insights' ? 'block' : 'none';
    if (secOrders) secOrders.style.display = section === 'orders' ? 'block' : 'none';
    if (secGrievance) secGrievance.style.display = section === 'grievance' ? 'block' : 'none';
    if (secEscrow) secEscrow.style.display = section === 'escrow' ? 'block' : 'none';

    if (section === 'produce') renderLiteProduceCards();
    if (section === 'bulk') renderLiteBulkSection();
    if (section === 'insights') renderLiteInsights();
    if (section === 'orders') renderLiteOrdersList();
    if (section === 'grievance') renderLiteGrievanceSection();
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

    const tBulk = document.getElementById('lite-tab-bulk-text');
    if (tBulk) tBulk.textContent = dict.tabBulk;

    const tInsights = document.getElementById('lite-tab-insights-text');
    if (tInsights) tInsights.textContent = dict.tabInsights;

    const tOrders = document.getElementById('lite-tab-orders-text');
    if (tOrders) tOrders.textContent = dict.tabOrders;

    const tGrievance = document.getElementById('lite-tab-grievance-text');
    if (tGrievance) tGrievance.textContent = dict.tabGrievance;

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

    // 6. Update Bulk Quota Section
    const bulkBadge = document.getElementById('lite-bulk-badge');
    if (bulkBadge) bulkBadge.textContent = dict.bulkBadge;

    const bulkTitle = document.getElementById('lite-bulk-title');
    if (bulkTitle) bulkTitle.textContent = dict.bulkTitle;

    const bulkDesc = document.getElementById('lite-bulk-desc');
    if (bulkDesc) bulkDesc.textContent = dict.bulkDesc;

    const bulkVoiceBtn = document.getElementById('lite-bulk-voice-btn');
    if (bulkVoiceBtn) bulkVoiceBtn.textContent = dict.bulkVoiceBtn;

    const bulkFormTitle = document.getElementById('lite-bulk-form-title');
    if (bulkFormTitle) bulkFormTitle.textContent = dict.bulkFormTitle;

    const bulkCropLbl = document.getElementById('lite-bulk-crop-label');
    if (bulkCropLbl) bulkCropLbl.textContent = dict.bulkCropLabel;

    const bulkQtyLbl = document.getElementById('lite-bulk-qty-label');
    if (bulkQtyLbl) bulkQtyLbl.textContent = dict.bulkQtyLabel;

    const bulkPriceLbl = document.getElementById('lite-bulk-price-label');
    if (bulkPriceLbl) bulkPriceLbl.textContent = dict.bulkPriceLabel;

    const bulkUnitLbl = document.getElementById('lite-bulk-unit-label');
    if (bulkUnitLbl) bulkUnitLbl.textContent = dict.bulkUnitLabel;

    const bulkTotalLbl = document.getElementById('lite-bulk-total-label');
    if (bulkTotalLbl) bulkTotalLbl.textContent = dict.bulkTotalBudgetLabel;

    const bulkSavingsEst = document.getElementById('lite-bulk-savings-est');
    if (bulkSavingsEst) bulkSavingsEst.textContent = dict.bulkSavingsEst;

    const bulkHubLbl = document.getElementById('lite-bulk-hub-label');
    if (bulkHubLbl) bulkHubLbl.textContent = dict.bulkHubLabel;

    const bulkGradeLbl = document.getElementById('lite-bulk-grade-label');
    if (bulkGradeLbl) bulkGradeLbl.textContent = dict.bulkGradeLabel;

    const bulkSubmitBtn = document.getElementById('lite-bulk-submit-btn');
    if (bulkSubmitBtn) bulkSubmitBtn.textContent = dict.bulkSubmitBtn;

    const bulkActTitle = document.getElementById('lite-bulk-active-title');
    if (bulkActTitle) bulkActTitle.textContent = dict.bulkActiveTitle;

    const bulkActSub = document.getElementById('lite-bulk-active-sub');
    if (bulkActSub) bulkActSub.textContent = dict.bulkActiveSub;

    const grvRecStatus = document.getElementById('lite-grv-rec-status');
    if (grvRecStatus && !isGrvRecording) {
      grvRecStatus.textContent = dict.grvRecordingPrompt || '🎙️ Tap mic button to record voice dispute (e.g., High moisture in onion bags)';
    }

    const grvPillsContainer = document.getElementById('lite-grv-cat-pills');
    if (grvPillsContainer) {
      const CAT_MAP = {
        quality: { icon: '🍂', key: 'Quality / Grade Mismatch', en: 'Quality / Grade Mismatch', hi: 'गुणवत्ता / ग्रेड में अंतर', mr: 'मालाचा दर्जा कमी' },
        moisture: { icon: '💧', key: 'High Moisture %', en: 'High Moisture %', hi: 'अत्यधिक नमी %', mr: 'जास्त ओलावा %' },
        weight: { icon: '⚖️', key: 'Bag Weight Shortage', en: 'Bag Weight Shortage', hi: 'बोरी में वजन कम', mr: 'वजन कमी भरले' },
        transit: { icon: '🚚', key: 'Transit Delay', en: 'Transit Delay', hi: 'गाड़ी में देरी', mr: 'गाडी उशीर' },
        escrow: { icon: '💸', key: 'Lock Escrow Release', en: 'Lock Escrow Release', hi: 'एस्क्रो भुगतान रोकें', mr: 'पैसे थांबवा' }
      };
      grvPillsContainer.innerHTML = Object.entries(CAT_MAP).map(([k, item]) => {
        const isActive = selectedGrvCategory === k;
        const text = item[lang] || item.en;
        const style = isActive 
          ? 'background: #dc2626; color: #ffffff; border-color: #dc2626;' 
          : 'background: #ffffff; color: #334155; border-color: #cbd5e1;';
        return `
          <button type="button" class="lite-grv-cat-pill ${isActive ? 'active' : ''}" style="${style}" onclick="selectLiteGrievanceCategory('${k}', '${text.replace(/'/g, "\\'")}', this)">
            ${item.icon} ${text}
          </button>
        `;
      }).join('');
    }

    const steppersGrid = document.getElementById('lite-bulk-steppers-grid');
    if (steppersGrid) {
      const STEP_MAP = {
        en: [
          { delta: 50, text: '+ 50 Bags (2.5 MT)' },
          { delta: 100, text: '+ 100 Bags (5 MT)' },
          { delta: 200, text: '+ 200 Bags (10 MT)' },
          { delta: 500, text: '+ 500 Bags (25 MT)' },
          { delta: 1000, text: '+ 1,000 Bags (50 MT)' },
          { delta: -100, text: '- 100 Bags', isRed: true }
        ],
        hi: [
          { delta: 50, text: '+ 50 बोरी (2.5 MT)' },
          { delta: 100, text: '+ 100 बोरी (5 MT)' },
          { delta: 200, text: '+ 200 बोरी (10 MT)' },
          { delta: 500, text: '+ 500 बोरी (25 MT)' },
          { delta: 1000, text: '+ 1000 बोरी (50 MT)' },
          { delta: -100, text: '- 100 बोरी', isRed: true }
        ],
        mr: [
          { delta: 50, text: '+ ५० पोती (२.५ MT)' },
          { delta: 100, text: '+ १०० पोती (५ MT)' },
          { delta: 200, text: '+ २०० पोती (१० MT)' },
          { delta: 500, text: '+ ५०० पोती (२५ MT)' },
          { delta: 1000, text: '+ १००० पोती (५० MT)' },
          { delta: -100, text: '- १०० पोती', isRed: true }
        ]
      };
      const steps = STEP_MAP[lang] || STEP_MAP.en;
      steppersGrid.innerHTML = steps.map(s => `
        <button type="button" class="lite-stepper-btn-large" onclick="changeLiteBulkQuantity(${s.delta})" ${s.isRed ? 'style="color: #dc2626;"' : ''}>${s.text}</button>
      `).join('');
    }

    const hubPills = document.getElementById('lite-bulk-hub-pills');
    if (hubPills) {
      const HUB_MAP = {
        en: ['📍 Mumbai (Vashi)', '📍 Pune (Gultekdi)', '📍 Nashik', '📍 Nagpur'],
        hi: ['📍 मुंबई (वाशी)', '📍 पुणे (गुलटेकड़ी)', '📍 नासिक', '📍 नागपुर'],
        mr: ['📍 मुंबई (वाशी)', '📍 पुणे (गुलटेकडी)', '📍 नाशिक', '📍 नागपूर']
      };
      const hubs = HUB_MAP[lang] || HUB_MAP.en;
      const hubKeys = ['Mumbai (Vashi Terminal)', 'Pune (Gultekdi Yard)', 'Nashik Central Hub', 'Nagpur Terminal'];
      hubPills.innerHTML = hubs.map((h, idx) => {
        const isActive = (selectedBulkHub === hubKeys[idx] || (idx === 0 && !selectedBulkHub));
        const style = isActive ? 'background: #0c5a36; color: #ffffff; border-color: #0c5a36;' : 'background: #ffffff; color: #334155; border-color: #cbd5e1;';
        return `<button type="button" class="lite-hub-pill ${isActive ? 'active' : ''}" style="${style}" onclick="selectLiteBulkHub('${hubKeys[idx]}', this)">${h}</button>`;
      }).join('');
    }

    const gradePills = document.getElementById('lite-bulk-grade-pills');
    if (gradePills) {
      const GRADE_MAP = {
        en: ['🏆 Grade A (Export)', '🥈 Grade B (Standard)', '🥉 Grade C (Processing)'],
        hi: ['🏆 ग्रेड ए (निर्यात)', '🥈 ग्रेड बी (मानक)', '🥉 ग्रेड सी (प्रोसेसिंग)'],
        mr: ['🏆 प्रत अ (निर्यात)', '🥈 प्रत ब (मानक)', '🥉 प्रत क (प्रक्रिया)']
      };
      const grades = GRADE_MAP[lang] || GRADE_MAP.en;
      const gradeKeys = ['Grade A (Export / Super)', 'Grade B (Standard)', 'Grade C (Processing)'];
      gradePills.innerHTML = grades.map((g, idx) => {
        const isActive = (selectedBulkGrade === gradeKeys[idx] || (idx === 0 && !selectedBulkGrade));
        const style = isActive ? 'background: #0c5a36; color: #ffffff; border-color: #0c5a36;' : 'background: #ffffff; color: #334155; border-color: #cbd5e1;';
        return `<button type="button" class="lite-grade-pill ${isActive ? 'active' : ''}" style="${style}" onclick="selectLiteBulkGrade('${gradeKeys[idx]}', this)">${g}</button>`;
      }).join('');
    }

    const grvBadge = document.getElementById('lite-grv-badge');
    if (grvBadge) grvBadge.textContent = dict.grvBadge;

    const grvHeroTitle = document.getElementById('lite-grv-hero-title');
    if (grvHeroTitle) grvHeroTitle.textContent = dict.grvHeroTitle;

    const grvHeroDesc = document.getElementById('lite-grv-hero-desc');
    if (grvHeroDesc) grvHeroDesc.textContent = dict.grvHeroDesc;

    const grvVoiceBtn = document.getElementById('lite-grv-voice-btn');
    if (grvVoiceBtn) grvVoiceBtn.textContent = dict.grvVoiceBtn;

    const grvFormTitle = document.getElementById('lite-grv-form-title');
    if (grvFormTitle) grvFormTitle.textContent = dict.grvFormTitle;

    const grvCatLbl = document.getElementById('lite-grv-cat-label');
    if (grvCatLbl) grvCatLbl.textContent = dict.grvCatLabel;

    const grvConsLbl = document.getElementById('lite-grv-cons-label');
    if (grvConsLbl) grvConsLbl.textContent = dict.grvConsLabel;

    const grvPhotoLbl = document.getElementById('lite-grv-photo-label');
    if (grvPhotoLbl) grvPhotoLbl.textContent = dict.grvPhotoLabel;

    const grvPhotoBtn = document.getElementById('lite-grv-photo-btn-text');
    if (grvPhotoBtn) grvPhotoBtn.textContent = dict.grvPhotoBtnText;

    const grvSubmitBtn = document.getElementById('lite-grv-submit-btn');
    if (grvSubmitBtn) grvSubmitBtn.textContent = dict.grvSubmitBtn;

    const grvActTitle = document.getElementById('lite-grv-active-title');
    if (grvActTitle) grvActTitle.textContent = dict.grvActiveTitle;

    const grvActSub = document.getElementById('lite-grv-active-sub');
    if (grvActSub) grvActSub.textContent = dict.grvActiveSub;

    // 8. Update Insights, Orders & Escrow Titles
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

    // 9. Update Buy Modal Labels
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

    // 10. Update Bargain Modal Labels
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

    // 11. Re-render active section
    if (isLiteMode) {
      if (activeLiteSection === 'produce') renderLiteProduceCards();
      if (activeLiteSection === 'bulk') renderLiteBulkSection();
      if (activeLiteSection === 'insights') renderLiteInsights();
      if (activeLiteSection === 'orders') renderLiteOrdersList();
      if (activeLiteSection === 'grievance') renderLiteGrievanceSection();
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
    } else {
      if (typeof showToast === 'function') {
        showToast('⚡ Switched to Enterprise Wholesale Portal', 'info');
      }
    }
  }

  function updateToggleBtnState(btn) {
    if (!btn) return;
    const dict = getDict();
    if (isLiteMode) {
      btn.innerHTML = `<span class="mode-icon" style="font-size: 0.95rem;">⚡</span><span id="lite-mode-toggle-text">${dict.toggleEnterprise || 'Enterprise Mode'}</span>`;
      btn.classList.add('active-lite');
      btn.style.background = '#0f172a';
      btn.style.color = '#f8fafc';
      btn.style.borderColor = '#334155';
    } else {
      btn.innerHTML = `<span class="mode-icon" style="font-size: 0.95rem;">🌱</span><span id="lite-mode-toggle-text">${dict.toggleSimple || 'Simple Mode'}</span>`;
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
      if (document.body && document.body.classList) document.body.classList.add('lite-mode-active');
      if (document.documentElement && document.documentElement.classList) document.documentElement.classList.add('lite-mode-active');
      regularViews.forEach(v => v.classList.remove('active-view'));
      if (liteContainer) {
        liteContainer.style.display = 'block';
        updateLiteModeLanguage(getCurrentLang());
        switchLiteSection(activeLiteSection || 'produce');
      }
      if (sidebar) sidebar.style.display = 'none';
      if (headerSearch) headerSearch.style.display = 'none';
      if (floatingCopilot) floatingCopilot.style.display = 'none';
      if (floatingMic) floatingMic.style.display = 'flex';
    } else {
      if (document.body && document.body.classList) document.body.classList.remove('lite-mode-active');
      if (document.documentElement && document.documentElement.classList) document.documentElement.classList.remove('lite-mode-active');
      if (liteContainer) liteContainer.style.display = 'none';
      if (sidebar) sidebar.style.display = '';
      if (headerSearch) headerSearch.style.display = '';
      if (floatingCopilot) floatingCopilot.style.display = '';
      if (floatingMic) floatingMic.style.display = 'none';
      
      // Ensure enterprise view is active
      let currentActive = document.querySelector('.portal-view.active-view');
      if (!currentActive) {
        if (typeof switchView === 'function') {
          switchView('view-verified-produce');
        } else {
          const defaultView = document.getElementById('view-verified-produce');
          if (defaultView) defaultView.classList.add('active-view');
        }
      }

      // Re-render Enterprise components
      if (typeof renderVerifiedLots === 'function') renderVerifiedLots();
      if (typeof updateBuyerMarketStats === 'function') updateBuyerMarketStats();
      if (typeof renderBuyerConsignments === 'function') renderBuyerConsignments();
    }
  }

  function filterLiteProduce(category, btnElement) {
    activeLiteFilter = category;
    document.querySelectorAll('.lite-cat-pill, .lite-crop-quick-pill').forEach(btn => {
      btn.classList.remove('active');
      btn.style.borderColor = '#e2e8f0';
      btn.style.background = '#ffffff';
      btn.style.color = '#0f172a';
    });
    if (btnElement) {
      btnElement.classList.add('active');
      btnElement.style.borderColor = '#0c5a36';
      btnElement.style.background = '#f0fdf4';
      btnElement.style.color = '#0c5a36';
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
      filtered = lots.filter(l => (l.isEmergency || (l.pricePerKg && Number(l.pricePerKg) < 25) || (l.crop && l.crop.toLowerCase().includes('emergency')) || (l.crop && l.crop.toLowerCase().includes('perishable'))));
    } else if (activeLiteFilter && activeLiteFilter !== 'all') {
      const f = activeLiteFilter.toLowerCase();
      filtered = lots.filter(l => {
        const cat = (l.category || '').toLowerCase();
        const crop = (l.crop || '').toLowerCase();
        return cat.includes(f) || crop.includes(f);
      });
      if (filtered.length === 0) {
        filtered = lots.filter(l => {
          const crop = (l.crop || '').toLowerCase();
          return crop.includes(f.slice(0, 4));
        });
      }
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

    const matchedVoice = getBestVoiceForLang(lang);
    if (matchedVoice) {
      utterance.voice = matchedVoice;
      utterance.lang = matchedVoice.lang;
    } else {
      if (lang === 'mr') {
        utterance.lang = 'mr-IN';
      } else if (lang === 'hi') {
        utterance.lang = 'hi-IN';
      } else {
        utterance.lang = 'en-IN';
      }
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
  // 5. BUY & BARGAIN MODALS & ACTIONS
  // =========================================================================

  let activeBuyLot = null;
  let selectedBuyBags = 20;
  let activeBargainLot = null;
  let counterRate = 20;
  let bargainBags = 100;

  function ensureLiteModalsInDOM() {
    if (!document.getElementById('modal-lite-buy') && !document.getElementById('lite-modal-buy')) {
      const container = document.getElementById('modals-container') || document.body;
      const modalWrapper = document.createElement('div');
      modalWrapper.innerHTML = `
        <div id="modal-lite-buy" style="display:none; position:fixed; inset:0; background:rgba(15,23,42,0.7); backdrop-filter:blur(5px); z-index:9999; align-items:center; justify-content:center; padding:20px;">
          <div class="lite-modal-card" style="background:#ffffff; border-radius:24px; width:100%; max-width:540px; overflow:hidden; box-shadow:0 25px 50px -12px rgba(0,0,0,0.25); border:2px solid #e2e8f0;">
            <div class="lite-modal-header" style="background:#f0fdf4; padding:20px 24px; border-bottom:1.5px solid #bbf7d0; display:flex; align-items:center; justify-content:space-between;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 1.6rem;">🛒</span>
                <div>
                  <h3 style="margin: 0; font-size: 1.25rem; font-weight: 800; color: #065f46;" id="lite-buy-crop-title">Buy Produce</h3>
                  <span style="font-size: 0.85rem; color: #166534;" id="lite-buy-farmer">Farmer: Ramesh Patil (Pune)</span>
                </div>
              </div>
              <button type="button" onclick="closeLiteBuyModal()" style="background: none; border: none; font-size: 1.5rem; color: #64748b; cursor: pointer; padding: 4px;">✕</button>
            </div>
            <div class="lite-modal-body" style="padding:20px 24px;">
              <div style="text-align: center; margin-bottom: 18px;">
                <img id="lite-buy-img" src="assets/images/tomato.jpg" alt="Produce" style="width: 130px; height: 130px; object-fit: cover; border-radius: 18px; border: 2px solid #bbf7d0; box-shadow: 0 4px 12px rgba(0,0,0,0.08);" />
              </div>
              <div class="lite-modal-row" style="display:flex; justify-content:space-between; margin-bottom:10px;">
                <span style="color: #475569;" id="lite-modal-price-label">Price / Rate:</span>
                <strong id="lite-buy-price" style="color: #16a34a; font-size:1.1rem;">₹ 22 / kg</strong>
              </div>
              <div class="lite-modal-row" style="display:flex; justify-content:space-between; margin-bottom:10px;">
                <span style="color: #475569;" id="lite-modal-qty-label">Quantity:</span>
                <strong id="lite-buy-qty" style="color:#0f172a;">1,000 kg (20 Bags)</strong>
              </div>
              <div style="margin: 10px 0 14px 0;">
                <span style="font-size: 0.85rem; font-weight: 700; color: #64748b; display: block; margin-bottom: 6px;" id="lite-stepper-label">⚡ 1-Tap Quick Quantity (बोरी निवडा):</span>
                <div class="lite-stepper-grid" style="display:grid; grid-template-columns:repeat(4, 1fr); gap:8px;">
                  <button type="button" class="lite-stepper-btn" onclick="changeLiteBuyQuantity(-10)" style="padding:8px 4px; border-radius:10px; border:1px solid #cbd5e1; background:#f8fafc; font-weight:700; cursor:pointer;">- 10 बोरी</button>
                  <button type="button" class="lite-stepper-btn" onclick="changeLiteBuyQuantity(10)" style="padding:8px 4px; border-radius:10px; border:1px solid #cbd5e1; background:#f8fafc; font-weight:700; cursor:pointer;">+ 10 बोरी</button>
                  <button type="button" class="lite-stepper-btn" onclick="changeLiteBuyQuantity(50)" style="padding:8px 4px; border-radius:10px; border:1px solid #cbd5e1; background:#f8fafc; font-weight:700; cursor:pointer;">+ 50 बोरी</button>
                  <button type="button" class="lite-stepper-btn" onclick="changeLiteBuyQuantity(100)" style="padding:8px 4px; border-radius:10px; border:1px solid #cbd5e1; background:#f8fafc; font-weight:700; cursor:pointer;">+ 100 बोरी</button>
                </div>
              </div>
              <div class="lite-modal-row" style="background: #f0fdf4; padding: 12px 14px; border-radius: 12px; border: 1px solid #bbf7d0; display:flex; justify-content:space-between; align-items:center;">
                <span style="font-weight: 800; color: #166534;" id="lite-modal-total-label">Total Amount:</span>
                <strong id="lite-buy-total" style="color: #15803d; font-size: 1.45rem;">₹ 22,000</strong>
              </div>
              <div class="lite-modal-row" style="display:flex; justify-content:space-between; margin-top:10px;">
                <span style="font-size: 0.88rem; color: #64748b;" id="lite-modal-escrow-label">🛡️ Escrow Advance Deposit:</span>
                <span id="lite-buy-advance" style="font-size: 0.92rem; font-weight: 700; color: #0f172a;">₹ 7,700 (35% Protected Deposit)</span>
              </div>
            </div>
            <div class="lite-modal-footer" style="padding:16px 24px; display:grid; grid-template-columns:1fr 1.6fr; gap:12px; background:#f8fafc; border-top:1px solid #e2e8f0;">
              <button type="button" class="lite-modal-btn-cancel" onclick="closeLiteBuyModal()" id="lite-modal-btn-cancel-text" style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:#ffffff; font-weight:800; cursor:pointer;">
                ✕ Cancel
              </button>
              <button type="button" class="lite-modal-btn-confirm" onclick="confirmLiteBuyOrder()" id="lite-modal-btn-confirm-text" style="padding:12px; border-radius:12px; border:none; background:#0c5a36; color:#ffffff; font-weight:900; cursor:pointer;">
                ✓ Confirm Purchase
              </button>
            </div>
          </div>
        </div>

        <div id="modal-lite-bargain" style="display:none; position:fixed; inset:0; background:rgba(15,23,42,0.7); backdrop-filter:blur(5px); z-index:9999; align-items:center; justify-content:center; padding:20px;">
          <div class="lite-modal-card" style="background:#ffffff; border-radius:24px; width:100%; max-width:540px; overflow:hidden; box-shadow:0 25px 50px -12px rgba(0,0,0,0.25); border:2px solid #bae6fd;">
            <div class="lite-modal-header" style="background: #f0f9ff; border-bottom: 1.5px solid #bae6fd; padding:20px 24px; display:flex; align-items:center; justify-content:space-between;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 1.6rem;">🤝</span>
                <div>
                  <h3 style="margin: 0; font-size: 1.25rem; font-weight: 800; color: #0369a1;" id="lite-bargain-modal-title">1-Tap Price Bargain (भाव कमी करा)</h3>
                  <span style="font-size: 0.85rem; color: #0284c7;" id="lite-bargain-farmer-info">Farmer: Suresh Patil • Nashik</span>
                </div>
              </div>
              <button type="button" onclick="closeLiteBargainModal()" style="background: none; border: none; font-size: 1.5rem; color: #64748b; cursor: pointer; padding: 4px;">✕</button>
            </div>
            <div class="lite-modal-body" style="padding:20px 24px;">
              <div style="text-align: center; margin-bottom: 14px;">
                <img id="lite-bargain-img" src="assets/images/onion.jpg" alt="Crop" style="width: 110px; height: 110px; object-fit: cover; border-radius: 16px; border: 2px solid #bae6fd; box-shadow: 0 4px 12px rgba(0,0,0,0.08);" />
                <h4 id="lite-bargain-crop-name" style="margin: 8px 0 2px 0; font-size: 1.15rem; font-weight: 800; color: #0f172a;">Onion (Red)</h4>
              </div>
              <div style="background: #f8fafc; border: 2px solid #e2e8f0; border-radius: 16px; padding: 14px 16px; margin-bottom: 14px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                  <span style="font-size: 0.88rem; color: #64748b;" id="lite-bargain-farmer-rate-label">Farmer Listed Rate:</span>
                  <span id="lite-bargain-orig-rate" style="font-size: 1.05rem; font-weight: 700; color: #64748b; text-decoration: line-through;">₹ 24 / kg</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 0.95rem; font-weight: 800; color: #0369a1;" id="lite-bargain-counter-rate-label">Your Counter Offer:</span>
                  <strong id="lite-bargain-offer-rate" style="font-size: 1.55rem; font-weight: 900; color: #0284c7;">₹ 22 / kg</strong>
                </div>
                <div style="margin-top: 10px; padding-top: 8px; border-top: 1px dashed #cbd5e1; display: flex; justify-content: space-between; align-items: center;">
                  <span id="lite-bargain-savings-badge" style="background: #dcfce7; color: #166534; font-size: 0.82rem; font-weight: 800; padding: 3px 10px; border-radius: 999px;">💰 You Save ₹ 10,000!</span>
                  <span id="lite-bargain-total-offer" style="font-size: 0.92rem; font-weight: 800; color: #0f172a;">Total: ₹ 1,10,000</span>
                </div>
              </div>
              <span style="font-size: 0.82rem; font-weight: 700; color: #64748b; display: block; margin-bottom: 6px;" id="lite-bargain-quick-label">⚡ Select 1-Tap Counter Rate (कमी दर निवडा):</span>
              <div class="lite-bargain-rate-grid" style="display:grid; grid-template-columns:repeat(3, 1fr); gap:8px; margin-bottom:12px;">
                <button type="button" class="lite-bargain-rate-btn" id="btn-bargain-minus1" onclick="selectBargainRateDelta(-1)" style="padding:10px; border-radius:12px; border:1.5px solid #bae6fd; background:#f0f9ff; color:#0369a1; font-weight:800; cursor:pointer;">- ₹1 / kg</button>
                <button type="button" class="lite-bargain-rate-btn active" id="btn-bargain-minus2" onclick="selectBargainRateDelta(-2)" style="padding:10px; border-radius:12px; border:1.5px solid #0284c7; background:#0284c7; color:#ffffff; font-weight:800; cursor:pointer;">- ₹2 / kg</button>
                <button type="button" class="lite-bargain-rate-btn" id="btn-bargain-minus3" onclick="selectBargainRateDelta(-3)" style="padding:10px; border-radius:12px; border:1.5px solid #bae6fd; background:#f0f9ff; color:#0369a1; font-weight:800; cursor:pointer;">- ₹3 / kg</button>
              </div>
              <button type="button" onclick="startVoiceBargainOffer()" style="width: 100%; background: #ffffff; border: 2px dashed #0284c7; color: #0369a1; padding: 10px; border-radius: 12px; font-weight: 800; font-size: 0.92rem; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; margin-bottom: 12px;">
                <span>🎤</span>
                <span id="lite-bargain-voice-label">बोलून भाव सांगा (Speak Counter Rate)</span>
              </button>
              <span style="font-size: 0.82rem; font-weight: 700; color: #64748b; display: block; margin-bottom: 6px;" id="lite-bargain-qty-label">Quantity: <strong id="lite-bargain-qty-val" style="color: #0f172a;">5,000 kg (100 Bags)</strong></span>
              <div class="lite-stepper-grid" style="display:grid; grid-template-columns:repeat(4, 1fr); gap:8px;">
                <button type="button" class="lite-stepper-btn" onclick="changeLiteBargainQuantity(-10)" style="padding:8px 4px; border-radius:10px; border:1px solid #cbd5e1; background:#f8fafc; font-weight:700; cursor:pointer;">- 10 बोरी</button>
                <button type="button" class="lite-stepper-btn" onclick="changeLiteBargainQuantity(10)" style="padding:8px 4px; border-radius:10px; border:1px solid #cbd5e1; background:#f8fafc; font-weight:700; cursor:pointer;">+ 10 बोरी</button>
                <button type="button" class="lite-stepper-btn" onclick="changeLiteBargainQuantity(50)" style="padding:8px 4px; border-radius:10px; border:1px solid #cbd5e1; background:#f8fafc; font-weight:700; cursor:pointer;">+ 50 बोरी</button>
                <button type="button" class="lite-stepper-btn" onclick="changeLiteBargainQuantity(100)" style="padding:8px 4px; border-radius:10px; border:1px solid #cbd5e1; background:#f8fafc; font-weight:700; cursor:pointer;">+ 100 बोरी</button>
              </div>
            </div>
            <div class="lite-modal-footer" style="padding:16px 24px; display:grid; grid-template-columns:1fr 1.6fr; gap:12px; background:#f8fafc; border-top:1px solid #e2e8f0;">
              <button type="button" class="lite-modal-btn-cancel" onclick="closeLiteBargainModal()" id="lite-bargain-btn-cancel" style="padding:12px; border-radius:12px; border:1px solid #cbd5e1; background:#ffffff; font-weight:800; cursor:pointer;">
                ✕ Cancel
              </button>
              <button type="button" class="lite-modal-btn-confirm" style="padding:12px; border-radius:12px; border:none; background:#0284c7; color:#ffffff; font-weight:900; cursor:pointer;" onclick="sendLiteBargainOffer()" id="lite-bargain-btn-send">
                💬 Send Offer (शेतकऱ्याला पाठवा)
              </button>
            </div>
          </div>
        </div>
      `;
      container.appendChild(modalWrapper);
    }
  }

  function openLiteBuyModal(lotId) {
    ensureLiteModalsInDOM();
    const lots = (window.buyerData && window.buyerData.verifiedLots) ? window.buyerData.verifiedLots : [];
    activeBuyLot = lots.find(l => l.id === lotId) || lots[0];
    if (!activeBuyLot) return;

    selectedBuyBags = 20;
    updateLiteBuyCalculations();

    const modal = document.getElementById('modal-lite-buy') || document.getElementById('lite-modal-buy');
    if (modal) {
      modal.style.display = 'flex';
      modal.classList.add('active');
    }

    const currentLang = getCurrentLang();
    const cropEntry = Object.entries(CROP_TRANSLATIONS).find(([k]) => (activeBuyLot.crop || '').toLowerCase().includes(k.toLowerCase()));
    const trans = cropEntry ? cropEntry[1] : { en: activeBuyLot.crop, hi: activeBuyLot.crop, mr: activeBuyLot.crop };
    const displayCrop = trans[currentLang] || activeBuyLot.crop;

    const titleEl = document.getElementById('lite-buy-crop-title') || document.getElementById('lite-modal-crop-title');
    if (titleEl) titleEl.textContent = displayCrop;

    const farmerEl = document.getElementById('lite-buy-farmer') || document.getElementById('lite-modal-farmer-name');
    if (farmerEl) farmerEl.textContent = `👨‍🌾 ${activeBuyLot.farmerName} (${activeBuyLot.farmerLocation})`;

    const imgEl = document.getElementById('lite-buy-img');
    if (imgEl && activeBuyLot.image) imgEl.src = activeBuyLot.image;

    // Optional audio confirmation
    speakLotDetails(activeBuyLot.id);
  }

  function closeLiteBuyModal() {
    const modal = document.getElementById('modal-lite-buy') || document.getElementById('lite-modal-buy');
    if (modal) {
      modal.style.display = 'none';
      modal.classList.remove('active');
    }
  }

  function changeLiteBuyQuantity(delta) {
    selectedBuyBags = Math.max(5, Math.min(200, selectedBuyBags + delta));
    updateLiteBuyCalculations();
  }

  function updateLiteBuyCalculations() {
    if (!activeBuyLot) return;

    const kgPrice = Number(activeBuyLot.pricePerKg) || (activeBuyLot.priceNum ? Math.round(activeBuyLot.priceNum / 100) : 20);
    const totalKg = selectedBuyBags * 50;
    const totalAmount = totalKg * kgPrice;
    const depositAmount = Math.round(totalAmount * 0.35);

    const qtyEl = document.getElementById('lite-buy-qty') || document.getElementById('lite-modal-qty-value');
    if (qtyEl) qtyEl.textContent = `${totalKg.toLocaleString('en-IN')} kg (${selectedBuyBags} Bags)`;

    const rateEl = document.getElementById('lite-buy-price') || document.getElementById('lite-modal-rate-value');
    if (rateEl) rateEl.textContent = `₹ ${kgPrice} / kg`;

    const totalEl = document.getElementById('lite-buy-total') || document.getElementById('lite-modal-total-value');
    if (totalEl) totalEl.textContent = `₹ ${totalAmount.toLocaleString('en-IN')}`;

    const depEl = document.getElementById('lite-buy-advance') || document.getElementById('lite-modal-escrow-value');
    if (depEl) depEl.textContent = `₹ ${depositAmount.toLocaleString('en-IN')} (35% Protected Deposit)`;
  }

  function confirmLiteBuyOrder() {
    const dict = getDict();
    if (!activeBuyLot) {
      closeLiteBuyModal();
      return;
    }

    const kgPrice = Number(activeBuyLot.pricePerKg) || (activeBuyLot.priceNum ? Math.round(activeBuyLot.priceNum / 100) : 20);
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
      showToast(dict.orderSuccess || '✓ Order Placed & 35% Escrow Protected! Truck Dispatched.', 'success');
    }
    const currentLang = getCurrentLang();
    speakText(dict.orderSuccess || 'Order placed successfully.', currentLang);

    notifyStateChange('order_created', newConsignment);

    if (typeof renderBuyerConsignments === 'function') renderBuyerConsignments();
    if (typeof renderLiteOrdersList === 'function') renderLiteOrdersList();
    if (typeof updateBuyerMarketStats === 'function') updateBuyerMarketStats();
  }

  // Bargain Modal Functions
  function openLiteBargainModal(lotId) {
    ensureLiteModalsInDOM();
    const lots = (window.buyerData && window.buyerData.verifiedLots) ? window.buyerData.verifiedLots : [];
    activeBargainLot = lots.find(l => l.id === lotId) || lots[0];
    if (!activeBargainLot) return;

    const baseRate = Number(activeBargainLot.pricePerKg) || (activeBargainLot.priceNum ? Math.round(activeBargainLot.priceNum / 100) : 24);
    counterRate = Math.max(1, baseRate - 2);
    bargainBags = 100;

    const modal = document.getElementById('modal-lite-bargain') || document.getElementById('lite-modal-bargain');
    if (modal) {
      modal.style.display = 'flex';
      modal.classList.add('active');
    }

    const cropNameEl = document.getElementById('lite-bargain-crop-name');
    if (cropNameEl) cropNameEl.textContent = activeBargainLot.crop || 'Crop';

    const farmInfoEl = document.getElementById('lite-bargain-farmer-info');
    if (farmInfoEl) farmInfoEl.textContent = `Farmer: ${activeBargainLot.farmerName} • ${activeBargainLot.farmerLocation}`;

    const imgEl = document.getElementById('lite-bargain-img');
    if (imgEl && activeBargainLot.image) imgEl.src = activeBargainLot.image;

    const farmRateEl = document.getElementById('lite-bargain-orig-rate') || document.getElementById('lite-bargain-farmer-rate');
    if (farmRateEl) farmRateEl.textContent = `₹ ${baseRate} / kg`;

    updateBargainOfferCalculations();
  }

  function closeLiteBargainModal() {
    const modal = document.getElementById('modal-lite-bargain') || document.getElementById('lite-modal-bargain');
    if (modal) {
      modal.style.display = 'none';
      modal.classList.remove('active');
    }
  }

  function selectBargainRateDelta(delta) {
    if (!activeBargainLot) return;
    const baseRate = Number(activeBargainLot.pricePerKg) || 24;
    counterRate = Math.max(1, baseRate + delta);

    document.querySelectorAll('.lite-bargain-rate-btn').forEach(btn => {
      btn.style.background = '#f0f9ff';
      btn.style.color = '#0369a1';
      btn.style.borderColor = '#bae6fd';
    });
    const activeBtn = delta === -1 ? document.getElementById('btn-bargain-minus1') : (delta === -2 ? document.getElementById('btn-bargain-minus2') : document.getElementById('btn-bargain-minus3'));
    if (activeBtn) {
      activeBtn.style.background = '#0284c7';
      activeBtn.style.color = '#ffffff';
      activeBtn.style.borderColor = '#0284c7';
    }

    updateBargainOfferCalculations();
  }

  function changeLiteBargainQuantity(delta) {
    bargainBags = Math.max(10, Math.min(500, bargainBags + delta));
    updateBargainOfferCalculations();
  }

  function updateBargainOfferCalculations() {
    const countRateEl = document.getElementById('lite-bargain-offer-rate') || document.getElementById('lite-bargain-counter-rate');
    if (countRateEl) countRateEl.textContent = `₹ ${counterRate} / kg`;

    const totalKg = bargainBags * 50;
    const totalAmount = totalKg * counterRate;
    const baseRate = activeBargainLot ? (Number(activeBargainLot.pricePerKg) || 24) : 24;
    const savings = Math.max(0, (baseRate - counterRate) * totalKg);

    const qtyEl = document.getElementById('lite-bargain-qty-val');
    if (qtyEl) qtyEl.textContent = `${totalKg.toLocaleString('en-IN')} kg (${bargainBags} Bags)`;

    const totalEl = document.getElementById('lite-bargain-total-offer');
    if (totalEl) totalEl.textContent = `Total: ₹ ${totalAmount.toLocaleString('en-IN')}`;

    const savingsEl = document.getElementById('lite-bargain-savings-badge');
    if (savingsEl) savingsEl.textContent = `💰 You Save ₹ ${savings.toLocaleString('en-IN')}!`;
  }

  function startVoiceBargainOffer() {
    const currentLang = getCurrentLang();
    const prompt = (currentLang === 'mr') ? 'तुमचा भाव सांगा (उदा. वीस रुपये)' : (currentLang === 'hi' ? 'अपना भाव बोलें (जैसे 20 रुपये)' : 'Speak your counter offer rate now');
    speakText(prompt, currentLang);
    if (typeof showToast === 'function') {
      showToast('🎙️ Listening for counter rate...', 'info');
    }
  }

  function sendLiteBargainOffer() {
    const dict = getDict();
    closeLiteBargainModal();
    const msg = dict.bargainOfferSent || `✓ Counter Offer ₹${counterRate}/kg sent to farmer via WhatsApp & SMS!`;
    if (typeof showToast === 'function') {
      showToast(msg, 'success');
    }
    const currentLang = getCurrentLang();
    speakText(msg, currentLang);
  }

  function shareOrderOnWhatsApp(orderId, crop, truck) {
    const text = encodeURIComponent(`AgriNex Delivery Update: Order ${orderId} for ${crop} on truck ${truck} is in transit with live GPS tracking.`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  }

  function callFarmerDirect(phone, name) {
    const dict = getDict();
    const currentLang = getCurrentLang();
    const cleanPhone = (phone || '+91 98220 14829').replace(/[^0-9+]/g, '');
    const announcement = `${dict.connectingFarmer || 'Connecting with farmer'} ${name || ''}`;
    speakText(announcement, currentLang);
    if (typeof showToast === 'function') {
      showToast(`📞 Calling farmer ${name}: ${phone}`, 'info');
    }
    try {
      window.location.href = `tel:${cleanPhone}`;
    } catch(e) {}
  }

  function callDriverDirect(phone, name) {
    const dict = getDict();
    const currentLang = getCurrentLang();
    const cleanPhone = (phone || '+91 98224 55102').replace(/[^0-9+]/g, '');
    const announcement = `${dict.connectingDriver || 'Connecting with driver'} ${name || ''}`;
    speakText(announcement, currentLang);
    if (typeof showToast === 'function') {
      showToast(`📞 Calling driver ${name}: ${phone}`, 'info');
    }
    try {
      window.location.href = `tel:${cleanPhone}`;
    } catch(e) {}
  }

  function openLiteGrievanceModal() {
    ensureLiteModalsInDOM();
    const modal = document.getElementById('modal-lite-grievance') || document.getElementById('lite-modal-grievance');
    if (modal) {
      modal.style.display = 'flex';
      modal.classList.add('active');
    }
  }

  function closeLiteGrievanceModal() {
    const modal = document.getElementById('modal-lite-grievance') || document.getElementById('lite-modal-grievance');
    if (modal) {
      modal.style.display = 'none';
      modal.classList.remove('active');
    }
  }

  function toggleGrievanceRecord() {
    const dict = getDict();
    const currentLang = getCurrentLang();
    speakText(dict.recording || 'Recording voice grievance...', currentLang);
    if (typeof showToast === 'function') {
      showToast('🎙️ Recording 15s voice note...', 'info');
    }
  }

  function submitLiteGrievance() {
    const dict = getDict();
    closeLiteGrievanceModal();
    const msg = dict.ticketGenerated || '🚨 Dispute Ticket #AGX-DISP-892 generated! AgriNex inspector assigned.';
    if (typeof showToast === 'function') {
      showToast(msg, 'success');
    }
    const currentLang = getCurrentLang();
    speakText(msg, currentLang);
  }

  // =========================================================================
  // 6. SIMPLE MODE BULK PROCUREMENT QUOTAS & FORWARD DEMANDS
  // =========================================================================

  const LITE_BULK_CROPS = [
    { key: 'Onion', name: '🧅 Red Onion (Nashik Garwa)', defaultRate: 24.0, icon: '🧅' },
    { key: 'Tomato', name: '🍅 Tomato (Shivam Hybrid)', defaultRate: 16.0, icon: '🍅' },
    { key: 'Potato', name: '🥔 Potato (Jyoti Grade A)', defaultRate: 18.0, icon: '🥔' },
    { key: 'Soybean', name: '🌱 Yellow Soybean (JS 335)', defaultRate: 42.5, icon: '🌱' },
    { key: 'Banana', name: '🍌 Grand Naine Banana (GI)', defaultRate: 14.0, icon: '🍌' },
    { key: 'Wheat', name: '🌾 Sharbati Lokwan Wheat', defaultRate: 30.0, icon: '🌾' },
    { key: 'Rice', name: '🌾 Wada Kolam Rice (Palghar GI)', defaultRate: 52.0, icon: '🌾' },
    { key: 'Pomegranate', name: '🍇 Bhagwa Pomegranate (Export)', defaultRate: 110.0, icon: '🍇' },
    { key: 'Orange', name: '🍊 Nagpur Sweet Orange', defaultRate: 42.0, icon: '🍊' },
    { key: 'Cotton', name: '☁️ Raw Cotton (Long Staple)', defaultRate: 64.0, icon: '☁️' },
    { key: 'Turmeric', name: '🌿 Sangli Rajapuri Turmeric', defaultRate: 128.0, icon: '🌿' },
    { key: 'Groundnut', name: '🥜 Kolhapur Bold Peanut', defaultRate: 68.0, icon: '🥜' }
  ];

  let selectedBulkCrop = 'Onion';
  let selectedBulkCropName = '🧅 Red Onion (Nashik Garwa)';
  let selectedBulkBags = 500;
  let selectedBulkPrice = 24.0;
  let selectedBulkHub = 'Mumbai (Vashi Terminal)';
  let selectedBulkGrade = 'Grade A (Export / Super)';

  function getBuyerDemands() {
    if (window.buyerData && Array.isArray(window.buyerData.buyerDemands) && window.buyerData.buyerDemands.length > 0) {
      return window.buyerData.buyerDemands;
    }
    try {
      const saved = localStorage.getItem('agrinex_buyer_demands');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          if (!window.buyerData) window.buyerData = {};
          window.buyerData.buyerDemands = parsed;
          return parsed;
        }
      }
    } catch(e) {}

    const defaultDemands = [
      {
        id: 'DMD-MH-8901',
        crop: 'Red Onion (Nashik Garwa)',
        cropKey: 'Onion',
        quantity_bags: 500,
        quantity_mt: 25.0,
        quantity_kg: 25000,
        target_rate: 24.0,
        total_budget: 600000,
        delivery_hub: 'Mumbai (Vashi Terminal)',
        grade: 'Grade A (Export / Super)',
        status: 'Active • 2 Farmer Bids Received',
        bids_count: 2,
        farmer_bids: [
          { farmer: 'Lasalgaon Shetkari FPO Group', bidRate: 23.5, qty: '500 Bags', phone: '+91 98220 44911' },
          { farmer: 'Patil Agro Farm Producer Co.', bidRate: 24.0, qty: '300 Bags', phone: '+91 98500 11234' }
        ],
        date_posted: '2 hours ago'
      },
      {
        id: 'DMD-MH-8842',
        crop: 'Sharbati Lokwan Wheat',
        cropKey: 'Wheat',
        quantity_bags: 1000,
        quantity_mt: 50.0,
        quantity_kg: 50000,
        target_rate: 30.0,
        total_budget: 1500000,
        delivery_hub: 'Pune (Gultekdi Yard)',
        grade: 'Grade A (Export / Super)',
        status: 'Active • 3 Farmer Bids Received',
        bids_count: 3,
        farmer_bids: [
          { farmer: 'Godavari Valley Grain Producers', bidRate: 29.5, qty: '1,000 Bags', phone: '+91 94220 88310' },
          { farmer: 'Khandesh Kisan FPO', bidRate: 30.0, qty: '600 Bags', phone: '+91 98224 55102' }
        ],
        date_posted: 'Yesterday'
      },
      {
        id: 'DMD-MH-8790',
        crop: 'Yellow Soybean (JS 335)',
        cropKey: 'Soybean',
        quantity_bags: 200,
        quantity_mt: 10.0,
        quantity_kg: 10000,
        target_rate: 42.5,
        total_budget: 425000,
        delivery_hub: 'Nashik Central Hub',
        grade: 'Grade A (Export / Super)',
        status: 'Matched with Latur FPO',
        bids_count: 1,
        farmer_bids: [
          { farmer: 'Marathwada Oilseed Growers FPO', bidRate: 42.0, qty: '200 Bags', phone: '+91 98224 33100' }
        ],
        date_posted: '3 days ago'
      }
    ];

    if (!window.buyerData) window.buyerData = {};
    window.buyerData.buyerDemands = defaultDemands;
    try {
      localStorage.setItem('agrinex_buyer_demands', JSON.stringify(defaultDemands));
    } catch(e) {}
    return defaultDemands;
  }

  function renderLiteBulkSection() {
    const cropPicker = document.getElementById('lite-bulk-crop-picker');
    const demandsList = document.getElementById('lite-bulk-demands-list');
    const countBadge = document.getElementById('lite-bulk-quota-count');

    const currentLang = getCurrentLang();
    const dict = getDict();

    // 1. Render 1-Tap Crop Picker Buttons
    if (cropPicker) {
      cropPicker.innerHTML = LITE_BULK_CROPS.map(c => {
        const trans = CROP_TRANSLATIONS[c.key] || { en: c.name, hi: c.name, mr: c.name, icon: c.icon };
        const displayCrop = trans[currentLang] || trans.en || c.name;
        const isActive = c.key.toLowerCase() === selectedBulkCrop.toLowerCase();
        const activeStyle = isActive 
          ? 'background: #0c5a36; color: #ffffff; border-color: #0c5a36; box-shadow: 0 4px 12px rgba(12, 90, 54, 0.25);' 
          : 'background: #ffffff; color: #0f172a; border-color: #e2e8f0;';

        return `
          <button type="button" class="lite-crop-pick-btn ${isActive ? 'active' : ''}" style="${activeStyle}" onclick="selectLiteBulkCrop('${c.key}', '${displayCrop.replace(/'/g, "\\'")}', ${c.defaultRate}, '${c.icon}')">
            <span style="font-size: 1.4rem;">${c.icon}</span>
            <span style="font-size: 0.88rem; font-weight: 800; line-height: 1.2;">${displayCrop}</span>
          </button>
        `;
      }).join('');
    }

    // 2. Update calculations in DOM
    updateLiteBulkCalculations();

    // 3. Render Active Posted Quotas
    if (demandsList) {
      const demands = getBuyerDemands();
      if (countBadge) countBadge.textContent = `${demands.length} Active Quotas`;

      if (demands.length === 0) {
        demandsList.innerHTML = `
          <div style="text-align: center; padding: 30px; color: #64748b; background: #f8fafc; border-radius: 16px; border: 1.5px dashed #cbd5e1;">
            <span style="font-size: 2.5rem; display: block; margin-bottom: 8px;">⚡</span>
            <h4 style="margin: 0 0 4px 0; font-size: 1.1rem; color: #334155;">No Active Procurement Quotas</h4>
            <p style="margin: 0; font-size: 0.85rem;">Use the form above to broadcast your bulk crop requirements to 1,200+ farmers.</p>
          </div>
        `;
        return;
      }

      demandsList.innerHTML = demands.map(d => {
        const trans = CROP_TRANSLATIONS[d.cropKey || d.crop] || { en: d.crop, hi: d.crop, mr: d.crop, icon: '🌾' };
        const displayCrop = trans[currentLang] || trans.en || d.crop;
        const totalBags = d.quantity_bags || Math.round((d.quantity_kg || 25000) / 50);
        const totalMt = d.quantity_mt || ((totalBags * 50) / 1000);
        const totalBudget = d.total_budget || (totalBags * 50 * (d.target_rate || 24));
        const bids = d.farmer_bids || [];

        return `
          <div style="background: #ffffff; border-radius: 18px; border: 2px solid #e2e8f0; padding: 20px; box-shadow: 0 4px 14px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">
              <div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 1.3rem;">⚡</span>
                  <h4 style="font-size: 1.25rem; font-weight: 900; color: #0f172a; margin: 0;">${displayCrop}</h4>
                  <span style="font-size: 0.85rem; font-weight: 700; color: #64748b;">(${d.id})</span>
                </div>
                <div style="font-size: 0.85rem; color: #0c5a36; font-weight: 700; margin-top: 3px;">
                  📍 ${d.delivery_hub || 'Mumbai Vashi Terminal'} • 🏆 ${d.grade || 'Grade A'}
                </div>
              </div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="background: #dcfce7; color: #166534; border: 1.5px solid #86efac; padding: 5px 12px; border-radius: 999px; font-weight: 800; font-size: 0.82rem;">
                  🟢 ${d.status || 'Active Broadcast'}
                </span>
                <button type="button" onclick="deleteLiteBulkDemand('${d.id}')" title="Cancel Quota" style="background: #fee2e2; color: #991b1b; border: 1px solid #fca5a5; border-radius: 8px; padding: 4px 8px; font-weight: 800; cursor: pointer; font-size: 0.8rem;">
                  🗑️
                </button>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 10px; background: #f8fafc; border-radius: 12px; padding: 12px 14px; border: 1px solid #e2e8f0;">
              <div>
                <span style="font-size: 0.72rem; font-weight: 800; color: #64748b; text-transform: uppercase;">Required Volume</span>
                <div style="font-size: 1.15rem; font-weight: 900; color: #0f172a;">${totalBags} Bags (${totalMt} MT)</div>
              </div>
              <div>
                <span style="font-size: 0.72rem; font-weight: 800; color: #0c5a36; text-transform: uppercase;">Target Max Rate</span>
                <div style="font-size: 1.25rem; font-weight: 900; color: #0c5a36;">₹ ${d.target_rate || 24} / kg</div>
              </div>
              <div>
                <span style="font-size: 0.72rem; font-weight: 800; color: #64748b; text-transform: uppercase;">Total Budget</span>
                <div style="font-size: 1.15rem; font-weight: 900; color: #15803d;">₹ ${totalBudget.toLocaleString('en-IN')}</div>
              </div>
            </div>

            <!-- Received Farmer / FPO Bids List -->
            <div style="background: #f0fdf4; border: 1.5px solid #bbf7d0; border-radius: 12px; padding: 12px 14px;">
              <div style="font-size: 0.82rem; font-weight: 800; color: #166534; margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between;">
                <span>🤝 Verified Farmer & FPO Bids (${bids.length}):</span>
                <span style="font-size: 0.75rem; color: #15803d;">Ready for 1-Tap Lifting</span>
              </div>
              <div style="display: flex; flex-direction: column; gap: 8px;">
                ${bids.map(b => `
                  <div style="display: flex; justify-content: space-between; align-items: center; background: #ffffff; border: 1px solid #86efac; border-radius: 8px; padding: 8px 12px; flex-wrap: wrap; gap: 8px;">
                    <div>
                      <strong style="font-size: 0.9rem; color: #0f172a;">👨‍🌾 ${b.farmer}</strong>
                      <div style="font-size: 0.78rem; color: #64748b;">Bid Offer: <strong style="color: #0c5a36;">₹${b.bidRate}/kg</strong> for ${b.qty}</div>
                    </div>
                    <button type="button" class="btn btn-primary" onclick="callFarmerDirect('${b.phone || '+91 98220 44911'}', '${b.farmer.replace(/'/g, "\\'")}')" style="padding: 6px 14px; font-size: 0.82rem; font-weight: 800; background: #0c5a36; border-color: #0c5a36; border-radius: 8px;">
                      📞 Call FPO
                    </button>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `;
      }).join('');
    }
  }

  function selectLiteBulkCrop(cropKey, cropName, defaultRate, icon) {
    selectedBulkCrop = cropKey;
    selectedBulkCropName = cropName;
    selectedBulkPrice = Number(defaultRate) || 24.0;
    
    // Update active class on crop pickers
    document.querySelectorAll('.lite-crop-pick-btn').forEach(btn => {
      btn.classList.remove('active');
      btn.style.background = '#ffffff';
      btn.style.color = '#0f172a';
      btn.style.borderColor = '#e2e8f0';
    });

    renderLiteBulkSection();

    const currentLang = getCurrentLang();
    const prompt = (currentLang === 'mr') 
      ? `निवडलेले पीक: ${cropName}. कमाल खरेदी भाव ₹${selectedBulkPrice} प्रति किलो निश्चित केला आहे.`
      : ((currentLang === 'hi') 
          ? `चुनी गई फसल: ${cropName}। अधिकतम खरीद दर ₹${selectedBulkPrice} प्रति किलो निर्धारित की गई है।`
          : `Selected crop ${cropName}. Target rate set to ₹${selectedBulkPrice} per kg.`);
    speakText(prompt, currentLang);
  }

  function changeLiteBulkQuantity(deltaBags) {
    selectedBulkBags = Math.max(50, Math.min(10000, selectedBulkBags + deltaBags));
    updateLiteBulkCalculations();
  }

  function changeLiteBulkPrice(deltaPrice) {
    selectedBulkPrice = Math.max(1, parseFloat((selectedBulkPrice + deltaPrice).toFixed(1)));
    updateLiteBulkCalculations();
  }

  function updateLiteBulkCalculations() {
    const totalKg = selectedBulkBags * 50;
    const totalMt = Math.round((totalKg / 1000) * 10) / 10;
    const totalBudget = totalKg * selectedBulkPrice;

    const qtyDisplay = document.getElementById('lite-bulk-qty-display');
    if (qtyDisplay) {
      qtyDisplay.textContent = `${selectedBulkBags.toLocaleString('en-IN')} Bags (${totalKg.toLocaleString('en-IN')} kg • ${totalMt} MT)`;
    }

    const priceVal = document.getElementById('lite-bulk-price-val');
    if (priceVal) {
      priceVal.textContent = `₹ ${selectedBulkPrice.toFixed(2)}`;
    }

    const totalBudgetEl = document.getElementById('lite-bulk-total-budget');
    if (totalBudgetEl) {
      totalBudgetEl.textContent = `₹ ${totalBudget.toLocaleString('en-IN')}`;
    }
  }

  function selectLiteBulkHub(hubName, btnEl) {
    selectedBulkHub = hubName;
    document.querySelectorAll('.lite-hub-pill').forEach(b => {
      b.classList.remove('active');
      b.style.background = '#ffffff';
      b.style.color = '#334155';
      b.style.borderColor = '#cbd5e1';
    });
    if (btnEl) {
      btnEl.classList.add('active');
      btnEl.style.background = '#0c5a36';
      btnEl.style.color = '#ffffff';
      btnEl.style.borderColor = '#0c5a36';
    }
  }

  function selectLiteBulkGrade(gradeName, btnEl) {
    selectedBulkGrade = gradeName;
    document.querySelectorAll('.lite-grade-pill').forEach(b => {
      b.classList.remove('active');
      b.style.background = '#ffffff';
      b.style.color = '#334155';
      b.style.borderColor = '#cbd5e1';
    });
    if (btnEl) {
      btnEl.classList.add('active');
      btnEl.style.background = '#0c5a36';
      btnEl.style.color = '#ffffff';
      btnEl.style.borderColor = '#0c5a36';
    }
  }

  function publishLiteBulkDemand() {
    const dict = getDict();
    const currentLang = getCurrentLang();
    const totalKg = selectedBulkBags * 50;
    const totalBudget = totalKg * selectedBulkPrice;

    const newDemand = {
      id: `DMD-MH-${Date.now().toString().slice(-4)}`,
      crop: selectedBulkCropName || selectedBulkCrop,
      cropKey: selectedBulkCrop,
      quantity_bags: selectedBulkBags,
      quantity_mt: Math.round((totalKg / 1000) * 10) / 10,
      quantity_kg: totalKg,
      target_rate: selectedBulkPrice,
      total_budget: totalBudget,
      delivery_hub: selectedBulkHub,
      grade: selectedBulkGrade,
      status: 'Broadcasted to 1,200+ FPOs',
      bids_count: 2,
      farmer_bids: [
        { farmer: 'Maharashtra Agro Farmer Federation (Nashik)', bidRate: selectedBulkPrice - 0.5, qty: `${selectedBulkBags} Bags`, phone: '+91 98220 44911' },
        { farmer: 'Kisan Kranti Producer Company', bidRate: selectedBulkPrice, qty: `${Math.round(selectedBulkBags * 0.75)} Bags`, phone: '+91 98500 11234' }
      ],
      date_posted: 'Just now'
    };

    if (!window.buyerData) window.buyerData = {};
    if (!window.buyerData.buyerDemands) window.buyerData.buyerDemands = [];
    window.buyerData.buyerDemands.unshift(newDemand);

    try {
      localStorage.setItem('agrinex_buyer_demands', JSON.stringify(window.buyerData.buyerDemands));
    } catch(e) {}

    const successMsg = dict.bulkSuccessMsg || `✓ Procurement Quota for ${selectedBulkBags} Bags ${selectedBulkCrop} published to FPOs!`;
    if (typeof showToast === 'function') {
      showToast(successMsg, 'success');
    }
    speakText(successMsg, currentLang);

    notifyStateChange('bulk_quota_posted', newDemand);

    renderLiteBulkSection();
  }

  function startVoiceBulkDemand() {
    const currentLang = getCurrentLang();
    const prompt = (currentLang === 'mr') 
      ? 'मागणी सांगा. उदा. ५०० पोती कांदा किंवा १ हजार पोती गहू.'
      : ((currentLang === 'hi') 
          ? 'अपनी मांग बोलें। जैसे 500 बोरी प्याज या 1000 बोरी गेहूं।'
          : 'Speak your bulk crop demand now, for example 500 bags Onion.');
    speakText(prompt, currentLang);
    if (typeof showToast === 'function') {
      showToast('🎙️ Listening for bulk quota command...', 'info');
    }

    setTimeout(() => {
      selectLiteBulkCrop('Onion', '🧅 Red Onion (Nashik Garwa)', 24.0, '🧅');
      changeLiteBulkQuantity(0);
    }, 1500);
  }

  function deleteLiteBulkDemand(demandId) {
    if (!window.buyerData || !window.buyerData.buyerDemands) return;
    window.buyerData.buyerDemands = window.buyerData.buyerDemands.filter(d => d.id !== demandId);
    try {
      localStorage.setItem('agrinex_buyer_demands', JSON.stringify(window.buyerData.buyerDemands));
    } catch(e) {}

    const currentLang = getCurrentLang();
    const msg = (currentLang === 'mr') ? 'खरेदी मागणी रद्द करण्यात आली.' : (currentLang === 'hi' ? 'खरीद मांग हटा दी गई है।' : 'Bulk quota removed.');
    if (typeof showToast === 'function') {
      showToast(msg, 'info');
    }
    speakText(msg, currentLang);
    renderLiteBulkSection();
  }

  // =========================================================================
  // 7. SIMPLE MODE DISPUTES & 1-TAP VOICE GRIEVANCE REDRESSAL
  // =========================================================================

  let selectedGrvCategory = 'quality';
  let selectedGrvCategoryName = 'Quality / Grade Mismatch (दर्जा कमी)';
  let isGrvRecording = false;
  let grvRecordingTimer = null;
  let grvSeconds = 0;
  let grvPhotoAttached = false;
  let grvVoiceNoteText = '';

  function getBuyerGrievances() {
    if (window.buyerData && Array.isArray(window.buyerData.grievances) && window.buyerData.grievances.length > 0) {
      return window.buyerData.grievances;
    }
    try {
      const saved = localStorage.getItem('agrinex_buyer_grievances');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          if (!window.buyerData) window.buyerData = {};
          window.buyerData.grievances = parsed;
          return parsed;
        }
      }
    } catch(e) {}

    const defaultGrievances = [
      {
        id: 'DISP-MH-8902',
        consignment_id: 'TRK-4412 (Soybean)',
        crop: 'Yellow Soybean (JS 335)',
        farmer_name: 'Anandrao Jadhav (Latur)',
        driver_phone: '+91 98224 55102',
        category: 'Excess Moisture % (जास्त ओलावा)',
        issue_desc: 'Voice Note: Moisture test on truck arrival showed 14.2% (contract agreed spec was <10%). Buyer requested rebate deduction.',
        date_raised: 'Today 11:30 AM',
        status: 'Surveyor Assigned & Escrow Frozen',
        escrow_status: '🔒 ₹ 84,000 Payout Frozen in SBI Escrow',
        surveyor_name: 'Dr. V. K. Deshmukh (Agri Quality Assayer)',
        surveyor_phone: '+91 94220 18392',
        proposed_settlement: 'Rebate of ₹ 2.50/kg (₹ 25,000 Refund to Buyer) + Balance released to farmer',
        can_settle: true
      }
    ];

    if (!window.buyerData) window.buyerData = {};
    window.buyerData.grievances = defaultGrievances;
    try {
      localStorage.setItem('agrinex_buyer_grievances', JSON.stringify(defaultGrievances));
    } catch(e) {}
    return defaultGrievances;
  }

  function renderLiteGrievanceSection() {
    const selectEl = document.getElementById('lite-grv-consignment-select');
    const grvList = document.getElementById('lite-grievances-list');
    const countBadge = document.getElementById('lite-grv-cases-count');

    const currentLang = getCurrentLang();
    const dict = getDict();

    // 1. Populate Shipment Select Dropdown
    if (selectEl) {
      const orders = getBuyerOrders();
      if (orders.length > 0) {
        selectEl.innerHTML = orders.map(o => `
          <option value="${o.id} - ${o.crop}">
            🚚 ${o.id}: ${o.crop} (${o.truckNumber || 'Vehicle In Transit'}) - Driver: ${o.driverName}
          </option>
        `).join('');
      } else {
        selectEl.innerHTML = `<option value="TRK-4412 - Yellow Soybean">🚚 TRK-4412: Yellow Soybean (MH-15-EG-4412)</option>`;
      }
    }

    // 2. Render Active Grievances List
    if (grvList) {
      const grievances = getBuyerGrievances();
      if (countBadge) countBadge.textContent = `${grievances.length} Open Cases`;

      if (grievances.length === 0) {
        grvList.innerHTML = `
          <div style="text-align: center; padding: 30px; color: #64748b; background: #f8fafc; border-radius: 16px; border: 1.5px dashed #cbd5e1;">
            <span style="font-size: 2.5rem; display: block; margin-bottom: 8px;">🛡️</span>
            <h4 style="margin: 0 0 4px 0; font-size: 1.1rem; color: #334155;">No Active Quality Disputes</h4>
            <p style="margin: 0; font-size: 0.85rem;">All in-transit shipments are operating normally under Escrow Protection.</p>
          </div>
        `;
        return;
      }

      grvList.innerHTML = grievances.map(g => {
        const isSettled = g.status.includes('Settled') || g.status.includes('Resolved');
        const statusBadgeStyle = isSettled 
          ? 'background: #dcfce7; color: #166534; border: 1.5px solid #86efac;'
          : 'background: #fee2e2; color: #991b1b; border: 1.5px solid #fca5a5;';

        return `
          <div style="background: #ffffff; border-radius: 18px; border: 2px solid ${isSettled ? '#bbf7d0' : '#fecdd3'}; padding: 20px; box-shadow: 0 4px 14px rgba(0,0,0,0.04); display: flex; flex-direction: column; gap: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px;">
              <div>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="font-size: 1.3rem;">🚨</span>
                  <h4 style="font-size: 1.25rem; font-weight: 900; color: #0f172a; margin: 0;">${g.crop}</h4>
                  <span style="font-size: 0.85rem; font-weight: 700; color: #64748b;">(Ticket #${g.id})</span>
                </div>
                <div style="font-size: 0.85rem; color: #991b1b; font-weight: 700; margin-top: 3px;">
                  ⚠️ Issue: ${g.category} • 🚚 Consignment: ${g.consignment_id}
                </div>
              </div>
              <span style="${statusBadgeStyle} padding: 5px 12px; border-radius: 999px; font-weight: 800; font-size: 0.82rem;">
                ${g.status}
              </span>
            </div>

            <!-- Issue Voice Note Transcript -->
            <div style="background: #fff5f5; border-left: 4px solid #ef4444; border-radius: 8px; padding: 12px 14px;">
              <span style="font-size: 0.78rem; font-weight: 800; color: #991b1b; display: block; margin-bottom: 2px;">🎙️ DISPUTE TRANSCRIPT & EVIDENCE:</span>
              <p style="margin: 0; font-size: 0.88rem; color: #7f1d1d; font-weight: 600; line-height: 1.4;">${g.issue_desc}</p>
            </div>

            <!-- Escrow Freeze & Surveyor Details Box -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 12px; background: #f8fafc; border-radius: 12px; padding: 14px; border: 1px solid #e2e8f0;">
              <div>
                <span style="font-size: 0.72rem; font-weight: 800; color: #dc2626; text-transform: uppercase;">Escrow Action</span>
                <div style="font-size: 0.95rem; font-weight: 900; color: #991b1b;">${g.escrow_status || '🔒 Payout Frozen'}</div>
              </div>
              <div>
                <span style="font-size: 0.72rem; font-weight: 800; color: #64748b; text-transform: uppercase;">Assigned Field Assayer</span>
                <div style="font-size: 0.95rem; font-weight: 800; color: #0f172a;">👤 ${g.surveyor_name || 'Dr. V. K. Deshmukh'}</div>
              </div>
            </div>

            <!-- Arbitrator Proposed Rebate & 1-Tap Action Row -->
            ${g.proposed_settlement ? `
              <div style="background: #f0fdf4; border: 1.5px solid #86efac; border-radius: 12px; padding: 14px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
                <div>
                  <span style="font-size: 0.75rem; font-weight: 800; color: #166534; display: block;">⚖️ ARBITRATOR SETTLEMENT PROPOSAL:</span>
                  <strong style="font-size: 0.92rem; color: #14532d;">${g.proposed_settlement}</strong>
                </div>
                <div style="display: flex; gap: 8px;">
                  <button type="button" class="btn btn-outline" onclick="callSurveyorDirect('${g.surveyor_phone || '+91 94220 18392'}', '${(g.surveyor_name || 'Surveyor').replace(/'/g, "\\'")}')" style="padding: 8px 14px; font-size: 0.85rem; font-weight: 800; border-color: #86efac; color: #166534; background: #ffffff;">
                    📞 Call Assayer
                  </button>
                  ${g.can_settle ? `
                    <button type="button" class="btn btn-primary" onclick="settleLiteGrievance('${g.id}')" style="padding: 8px 16px; font-size: 0.85rem; font-weight: 900; background: #16a34a; border-color: #16a34a;">
                      ✓ Accept Rebate & Refund
                    </button>
                  ` : ''}
                </div>
              </div>
            ` : ''}
          </div>
        `;
      }).join('');
    }
  }

  function selectLiteGrievanceCategory(catKey, catName, btnEl) {
    selectedGrvCategory = catKey;
    selectedGrvCategoryName = catName;

    document.querySelectorAll('.lite-grv-cat-pill').forEach(b => {
      b.classList.remove('active');
      b.style.background = '#ffffff';
      b.style.color = '#334155';
      b.style.borderColor = '#cbd5e1';
    });
    if (btnEl) {
      btnEl.classList.add('active');
      btnEl.style.background = '#dc2626';
      btnEl.style.color = '#ffffff';
      btnEl.style.borderColor = '#dc2626';
    }
  }

  function toggleLiteVoiceGrievance() {
    const currentLang = getCurrentLang();
    const dict = getDict();
    const micBtn = document.getElementById('btn-lite-grv-mic');
    const timerBox = document.getElementById('lite-grv-rec-timer');
    const secSpan = document.getElementById('lite-grv-seconds');
    const statusText = document.getElementById('lite-grv-rec-status');
    const transcriptBox = document.getElementById('lite-grv-transcript-box');
    const transcriptText = document.getElementById('lite-grv-transcript-text');

    if (!isGrvRecording) {
      // Start 15s recording
      isGrvRecording = true;
      grvSeconds = 0;
      if (timerBox) timerBox.style.display = 'block';
      if (secSpan) secSpan.textContent = '00:00';
      if (statusText) statusText.textContent = dict.grvRecordingActive || '🔴 Recording... Speak your issue clearly';
      if (micBtn) {
        micBtn.classList.add('lite-pulse-mic');
        micBtn.style.background = '#991b1b';
      }

      speakText(dict.recording || 'Recording voice grievance. Please speak your issue now.', currentLang);

      if (grvRecordingTimer) clearInterval(grvRecordingTimer);
      grvRecordingTimer = setInterval(() => {
        grvSeconds++;
        const formatted = grvSeconds < 10 ? `00:0${grvSeconds}` : `00:${grvSeconds}`;
        if (secSpan) secSpan.textContent = formatted;

        if (grvSeconds >= 5) {
          // Auto complete recording at 5s simulation
          finishLiteVoiceRecording();
        }
      }, 1000);
    } else {
      finishLiteVoiceRecording();
    }
  }

  function finishLiteVoiceRecording() {
    if (grvRecordingTimer) clearInterval(grvRecordingTimer);
    isGrvRecording = false;

    const currentLang = getCurrentLang();
    const micBtn = document.getElementById('btn-lite-grv-mic');
    const timerBox = document.getElementById('lite-grv-rec-timer');
    const statusText = document.getElementById('lite-grv-rec-status');
    const transcriptBox = document.getElementById('lite-grv-transcript-box');
    const transcriptText = document.getElementById('lite-grv-transcript-text');

    if (micBtn) {
      micBtn.classList.remove('lite-pulse-mic');
      micBtn.style.background = '#dc2626';
    }
    if (timerBox) timerBox.style.display = 'none';

    if (currentLang === 'mr') {
      grvVoiceNoteText = `व्हॉईस तक्रार: गोदामात गाडी उतरवताना ${selectedGrvCategoryName} आढळले आहे. मालाची तपासणी करून एस्क्रो परतावा देण्यात यावा.`;
    } else if (currentLang === 'hi') {
      grvVoiceNoteText = `वॉयस शिकायत: गोदाम में माल उतरते समय ${selectedGrvCategoryName} की समस्या पाई गई है। कृपया एस्क्रो रिफंड जारी करें।`;
    } else {
      grvVoiceNoteText = `Voice Note: Measured issue with ${selectedGrvCategoryName} upon warehouse unloading inspection. Requesting assayer inspection and escrow rebate.`;
    }

    if (statusText) {
      statusText.textContent = (currentLang === 'mr') ? '✓ व्हॉईस क्लिप रेकॉर्ड झाली!' : (currentLang === 'hi' ? '✓ वॉयस नोट रिकॉर्ड हो गया!' : '✓ 15s Voice Note Recorded Successfully!');
    }
    if (transcriptText) transcriptText.textContent = grvVoiceNoteText;
    if (transcriptBox) transcriptBox.style.display = 'block';

    if (typeof showToast === 'function') {
      showToast('✓ 15s Voice Note Recorded!', 'success');
    }
    speakText(grvVoiceNoteText, currentLang);
  }

  function attachLitePhotoProof() {
    grvPhotoAttached = true;
    const preview = document.getElementById('lite-grv-photo-preview');
    if (preview) preview.style.display = 'block';
    if (typeof showToast === 'function') {
      showToast('📸 Inspection photo attached successfully!', 'success');
    }
  }

  function submitLiteGrievanceForm() {
    const dict = getDict();
    const currentLang = getCurrentLang();
    const selectEl = document.getElementById('lite-grv-consignment-select');
    const consVal = selectEl ? selectEl.value : 'TRK-4412 - Yellow Soybean';
    const consId = consVal.split(' - ')[0] || 'TRK-4412';
    const cropName = consVal.split(' - ')[1] || 'Produce Lot';

    const newTicketId = `DISP-MH-${Math.floor(1000 + Math.random() * 9000)}`;
    const newGrv = {
      id: newTicketId,
      consignment_id: consId,
      crop: cropName,
      farmer_name: 'Verified Farmer Partner',
      driver_phone: '+91 98224 55102',
      category: selectedGrvCategoryName,
      issue_desc: grvVoiceNoteText || `Voice Note: Reported ${selectedGrvCategoryName}. Inspection photo evidence attached.`,
      date_raised: 'Just now',
      status: 'Surveyor Assigned & Escrow Frozen',
      escrow_status: '🔒 Escrow Payout Immediately Frozen in SBI Vault',
      surveyor_name: 'Dr. V. K. Deshmukh (Agri Quality Assayer)',
      surveyor_phone: '+91 94220 18392',
      proposed_settlement: 'Under 2-Hour Rapid Field Verification',
      can_settle: false
    };

    if (!window.buyerData) window.buyerData = {};
    if (!window.buyerData.grievances) window.buyerData.grievances = [];
    window.buyerData.grievances.unshift(newGrv);

    try {
      localStorage.setItem('agrinex_buyer_grievances', JSON.stringify(window.buyerData.grievances));
    } catch(e) {}

    const successMsg = dict.grvSuccessMsg || `🚨 Dispute Ticket #${newTicketId} Registered! Escrow payout frozen in SBI vault.`;
    if (typeof showToast === 'function') {
      showToast(successMsg, 'success');
    }
    speakText(successMsg, currentLang);

    notifyStateChange('grievance_submitted', newGrv);

    // Reset transcript & photo state
    grvVoiceNoteText = '';
    grvPhotoAttached = false;
    const tBox = document.getElementById('lite-grv-transcript-box');
    if (tBox) tBox.style.display = 'none';
    const pPrev = document.getElementById('lite-grv-photo-preview');
    if (pPrev) pPrev.style.display = 'none';

    renderLiteGrievanceSection();
  }

  function settleLiteGrievance(grvId) {
    const dict = getDict();
    const currentLang = getCurrentLang();
    const grievances = getBuyerGrievances();
    const grv = grievances.find(g => g.id === grvId);
    if (!grv) return;

    grv.status = '✅ Settled & Escrow Released with Rebate';
    grv.escrow_status = '💸 ₹ 25,000 Refunded to Buyer Bank Account';
    grv.can_settle = false;

    try {
      localStorage.setItem('agrinex_buyer_grievances', JSON.stringify(grievances));
    } catch(e) {}

    const msg = dict.grvSettledMsg || '✓ Settlement accepted! Rebate amount refunded to your account.';
    if (typeof showToast === 'function') {
      showToast(msg, 'success');
    }
    speakText(msg, currentLang);

    notifyStateChange('grievance_settled', grv);

    renderLiteGrievanceSection();
  }

  function callSurveyorDirect(phone, name) {
    const dict = getDict();
    const currentLang = getCurrentLang();
    const cleanPhone = (phone || '+91 94220 18392').replace(/[^0-9+]/g, '');
    const announcement = `${dict.surveyorLabel || 'Connecting with assayer'} ${name || ''}`;
    speakText(announcement, currentLang);
    if (typeof showToast === 'function') {
      showToast(`📞 Calling assayer ${name}: ${phone}`, 'info');
    }
    try {
      window.location.href = `tel:${cleanPhone}`;
    } catch(e) {}
  }

  function startLiteVoiceAssistant() {
    const dict = getDict();
    const currentLang = getCurrentLang();
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      speakText(dict.voicePrompt, currentLang);
      if (typeof showToast === 'function') {
        showToast(dict.voiceFail || 'Voice recognition not supported. Tap quick crop filter buttons below.', 'info');
      }
      return;
    }

    try {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      const recognition = new SpeechRecognition();
      recognition.lang = currentLang === 'hi' ? 'hi-IN' : (currentLang === 'mr' ? 'mr-IN' : 'en-IN');
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      const floatingMic = document.getElementById('lite-floating-voice-mic');
      if (floatingMic) floatingMic.classList.add('mic-pulsing');

      if (typeof showToast === 'function') {
        showToast(dict.recording || '🔴 Listening... Speak crop name (e.g. Onion, Tomato)', 'info');
      }

      recognition.onresult = (event) => {
        if (floatingMic) floatingMic.classList.remove('mic-pulsing');
        const transcript = (event.results && event.results[0] && event.results[0][0]) 
          ? (event.results[0][0].transcript || '').trim().toLowerCase() 
          : '';
        handleVoiceSearchQuery(transcript);
      };

      recognition.onerror = () => {
        if (floatingMic) floatingMic.classList.remove('mic-pulsing');
        if (typeof showToast === 'function') {
          showToast(dict.voiceFail || 'Voice not recognized. Please tap again.', 'info');
        }
      };

      recognition.onend = () => {
        if (floatingMic) floatingMic.classList.remove('mic-pulsing');
      };

      recognition.start();
    } catch (e) {
      const floatingMic = document.getElementById('lite-floating-voice-mic');
      if (floatingMic) floatingMic.classList.remove('mic-pulsing');
      speakText(dict.voicePrompt, currentLang);
    }
  }

  function handleVoiceSearchQuery(query) {
    if (!query) return;
    const dict = getDict();
    const currentLang = getCurrentLang();
    
    // Match crop keywords in English, Hindi, and Marathi
    const keywords = ['onion', 'tomato', 'potato', 'soybean', 'wheat', 'rice', 'banana', 'orange', 'pomegranate', 'chilli', 'cotton', 'emergency'];
    let matchedKey = keywords.find(k => query.includes(k));

    if (!matchedKey) {
      if (query.includes('कांदा') || query.includes('कांदे') || query.includes('प्याज')) matchedKey = 'onion';
      else if (query.includes('टोमॅटो') || query.includes('टमाटर')) matchedKey = 'tomato';
      else if (query.includes('बटाटा') || query.includes('आलू')) matchedKey = 'potato';
      else if (query.includes('सोयाबीन')) matchedKey = 'soybean';
      else if (query.includes('गहू') || query.includes('गेहूं')) matchedKey = 'wheat';
      else if (query.includes('तांदूळ') || query.includes('भात') || query.includes('चावल')) matchedKey = 'rice';
      else if (query.includes('केळी') || query.includes('केला')) matchedKey = 'banana';
      else if (query.includes('संत्रा') || query.includes('संतरा')) matchedKey = 'orange';
      else if (query.includes('डाळिंब') || query.includes('अनार')) matchedKey = 'pomegranate';
      else if (query.includes('मिरची') || query.includes('मिर्च')) matchedKey = 'chilli';
      else if (query.includes('कापूस') || query.includes('कपास')) matchedKey = 'cotton';
      else if (query.includes('तातडीची') || query.includes('इमरजेंसी')) matchedKey = 'emergency';
    }

    if (matchedKey) {
      filterLiteProduce(matchedKey);
      const ackMsg = `${dict.searchingFor || 'Showing results for'} ${matchedKey}`;
      speakText(ackMsg, currentLang);
      if (typeof showToast === 'function') {
        showToast(`🔍 ${ackMsg}`, 'success');
      }
    } else {
      filterLiteProduce('all');
      speakText(`${dict.searchingFor || 'Showing'} ${query}`, currentLang);
    }
  }

  // Initialize on Load (or immediately if DOM is already ready)
  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading' && typeof document.addEventListener === 'function') {
      document.addEventListener('DOMContentLoaded', initLiteMode);
    } else {
      initLiteMode();
    }
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

  // Simple Mode Bulk Quotas & Grievance Functions
  window.renderLiteBulkSection = renderLiteBulkSection;
  window.selectLiteBulkCrop = selectLiteBulkCrop;
  window.changeLiteBulkQuantity = changeLiteBulkQuantity;
  window.changeLiteBulkPrice = changeLiteBulkPrice;
  window.selectLiteBulkHub = selectLiteBulkHub;
  window.selectLiteBulkGrade = selectLiteBulkGrade;
  window.publishLiteBulkDemand = publishLiteBulkDemand;
  window.startVoiceBulkDemand = startVoiceBulkDemand;
  window.deleteLiteBulkDemand = deleteLiteBulkDemand;
  window.renderLiteGrievanceSection = renderLiteGrievanceSection;
  window.selectLiteGrievanceCategory = selectLiteGrievanceCategory;
  window.toggleLiteVoiceGrievance = toggleLiteVoiceGrievance;
  window.attachLitePhotoProof = attachLitePhotoProof;
  window.submitLiteGrievanceForm = submitLiteGrievanceForm;
  window.settleLiteGrievance = settleLiteGrievance;
  window.callSurveyorDirect = callSurveyorDirect;

})();

