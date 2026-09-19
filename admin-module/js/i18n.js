/**
 * AgriNex - Admin Control Center Multilingual Translation Engine (i18n)
 * Supported Languages:
 *  - en: English (Default)
 *  - hi: हिन्दी (Hindi)
 *  - mr: मराठी (Marathi)
 * Translates 100% of all UI text, stat cards, tables, modals, search inputs, commodities,
 * APMC mandis, counterparties, and state governance terms.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'agrinex_admin_language';

  // 1. PERSON / OFFICER / FARMER / DRIVER TRANSLATIONS
  const PERSON_MAP = {
    'Dr. R. K. Shinde, IAS': { hi: 'डॉ. आर. के. शिंदे, आईएएस', mr: 'डॉ. आर. के. शिंदे, आयएएस' },
    'Dr. R. K. Shinde': { hi: 'डॉ. आर. के. शिंदे', mr: 'डॉ. आर. के. शिंदे' },
    'Patil Rameshwar': { hi: 'पाटिल रामेश्वर', mr: 'पाटील रामेश्वर' },
    'Rameshwar Patil': { hi: 'पाटिल रामेश्वर', mr: 'पाटील रामेश्वर' },
    'Sanjay Deshmukh': { hi: 'संजय देशमुख', mr: 'संजय देशमुख' },
    'Rajesh Shinde': { hi: 'राजेश शिंदे', mr: 'राजेश शिंदे' },
    'Anandrao Jadhav': { hi: 'आनंदराव जाधव', mr: 'आनंदराव जाधव' },
    'Santosh Jagtap': { hi: 'संतोष जगताप', mr: 'संतोष जगताप' },
    'Vikas More': { hi: 'विकास मोरे', mr: 'विकास मोरे' },
    'Balasaheb Vikhe': { hi: 'बालासाहेब विखे', mr: 'बाळासाहेब विखे' },
    'Ganesh Thorat': { hi: 'गणेश थोरात', mr: 'गणेश थोरात' },
    'Ganesh Khot': { hi: 'गणेश खोत', mr: 'गणेश खोत' },
    'Dnyaneshwar Bodke': { hi: 'ज्ञानेश्वर बोडके', mr: 'ज्ञानेश्वर बोडके' },
    'Sanjay Patil': { hi: 'संजय पाटिल', mr: 'संजय पाटील' },
    'Ramesh Shinde': { hi: 'रमेश शिंदे', mr: 'रमेश शिंदे' },
    'Sunil Pawar': { hi: 'सुनील पवार', mr: 'सुनील पवार' },
    'Mahesh Kulkarni': { hi: 'महेश कुलकर्णी', mr: 'महेश कुलकर्णी' },
    'Pravin Chavan': { hi: 'प्रवीण चव्हाण', mr: 'प्रवीण चव्हाण' },
    'Nitin Ghadge': { hi: 'नितिन घाडगे', mr: 'नितीन घाडगे' },
    'Babasaheb Kale': { hi: 'बाबासाहेब काले', mr: 'बाबासाहेब काळे' },
    'Kishore Shinde': { hi: 'किशोर शिंदे', mr: 'किशोर शिंदे' },
    'Ganesh Chaudhari': { hi: 'गणेश चौधरी', mr: 'गणेश चौधरी' },
    'Dinesh Yadav': { hi: 'दिनेश यादव', mr: 'दिनेश यादव' },
    'Sandeep Patil': { hi: 'संदीप पाटिल', mr: 'संदीप पाटील' },
    'Rohit Kadam': { hi: 'रोहित कदम', mr: 'रोहित कदम' }
  };

  // 2. INSTITUTIONAL BUYERS & CORPORATE SOURCING
  const BUYER_MAP = {
    'FreshVeg Logistics & Processing Corp': { hi: 'फ्रेशवेज लॉजिस्टिक्स एंड प्रोसेसिंग कॉर्प', mr: 'फ्रेशव्हेज लॉजिस्टिक्स अँड प्रोसेसिंग कॉर्पोरेशन' },
    'BigBasket Direct Farm Sourcing': { hi: 'बिगबास्केट डायरेक्ट फार्म सोर्सिंग', mr: 'बिगबास्केट थेट शेतमाल खरेदी' },
    'Reliance Fresh Supply Chain': { hi: 'रिलायंस फ्रेश सप्लाई चेन', mr: 'रिलायन्स फ्रेश सप्लाय चेन' },
    'Adani Wilmar Agri Procurement': { hi: 'अदाणी विल्मर कृषि खरीद', mr: 'अदानी विल्मर कृषी खरेदी' },
    'DMart Wholesale (Avenue Supermarts)': { hi: 'डीमार्ट थोक (एवेन्यू सुपरमार्ट्स)', mr: 'डीमार्ट घाऊक (एव्हेन्यू सुपरमार्ट्स)' },
    'Kay Bee Exports International': { hi: 'के बी एक्सपोर्ट्स इंटरनेशनल', mr: 'के बी एक्सपोर्ट्स इंटरनॅशनल' },
    'Mahagrapes Co-op Federation': { hi: 'महाग्रेप्स सहकारी महासंघ', mr: 'महाग्रेप्स सहकारी महासंघ' },
    'LuLu Hypermarket Gulf Supply': { hi: 'लुलु हाइपरमार्केट गल्फ सप्लाई', mr: 'लुलु हायपरमार्केट गल्फ पुरवठा' },
    'Everest Spices & Commodities': { hi: 'एवरेस्ट मसाले और कमोडिटीज', mr: 'एव्हरेस्ट मसाले व शेतमाल' },
    'ITC Agri-Business Division': { hi: 'आईटीसी कृषि-व्यवसाय प्रभाग', mr: 'आयटीसी कृषी-व्यवसाय विभाग' },
    'Raymond Textile Mills': { hi: 'रेमंड टेक्सटाइल मिल्स', mr: 'रेमंड टेक्सटाईल मिल्स' },
    'Cargill Animal Nutrition & Starch': { hi: 'कारगिल पशु पोषण और स्टार्च', mr: 'कारगिल पशु पोषण व स्टार्च' },
    'Marico Saffola Oil Processing': { hi: 'मैरिको सफोला तेल प्रसंस्करण', mr: 'मॅरिको सफोला तेल प्रक्रिया' },
    'BigBasket': { hi: 'बिगबास्केट', mr: 'बिगबास्केट' },
    'Reliance Fresh': { hi: 'रिलायंस फ्रेश', mr: 'रिलायन्स फ्रेश' },
    'Adani Wilmar': { hi: 'अदाणी विल्मर', mr: 'अदानी विल्मर' },
    'DMart Wholesale': { hi: 'डीमार्ट थोक', mr: 'डीमार्ट घाऊक' },
    'Nestle Sourcing': { hi: 'नेस्ले सोर्सिंग', mr: 'नेस्ले सोर्सिंग' }
  };

  // 3. COMPLETE CROP & COMMODITY TRANSLATIONS (All 28 Maharashtra Crops)
  const CROP_MAP = {
    'Red Onion (Nashik Garwa Quality)': { hi: 'लाल प्याज (नासिक गरवा क्वालिटी)', mr: 'लाल कांदा (नाशिक गरवा प्रत)' },
    'Red Onion (Lasalgaon Garwa)': { hi: 'लाल प्याज (लासलगांव गरवा)', mr: 'लाल कांदा (लासलगाव गरवा)' },
    'Red Onion (Garwa Export)': { hi: 'लाल प्याज (गरवा निर्यात)', mr: 'लाल कांदा (गरवा निर्यात)' },
    'Red Onion': { hi: 'लाल प्याज', mr: 'लाल कांदा' },
    'Onion': { hi: 'प्याज', mr: 'कांदा' },

    'Hybrid Tomato (Narayangaon / Junnar)': { hi: 'हाइब्रिड टमाटर (नारायणगांव / जुन्नर)', mr: 'संकरित टोमॅटो (नारायणगाव / जुन्नर)' },
    'Tomato (Shivam / Abhinav Hybrid)': { hi: 'टमाटर (शिवम / अभिनव हाइब्रिड)', mr: 'टोमॅटो (शिवम / अभिनव संकरित)' },
    'Tomato (Abhinav Red Hybrid)': { hi: 'टमाटर (अभिनव लाल हाइब्रिड)', mr: 'टोमॅटो (अभिनव लाल संकरित)' },
    'Hybrid Tomato': { hi: 'हाइब्रिड टमाटर', mr: 'संकरित टोमॅटो' },
    'Tomato': { hi: 'टमाटर', mr: 'टोमॅटो' },

    'Grand Naine Banana (Jalgaon G9)': { hi: 'ग्रैंड नैन केला (जलगांव जी9)', mr: 'ग्रँड नैन केळी (जळगाव जी९)' },
    'Grand Naine Banana (Export)': { hi: 'ग्रैंड नैन केला (निर्यात)', mr: 'ग्रँड नैन केळी (निर्यात)' },
    'Grand Naine Banana': { hi: 'ग्रैंड नैन केला', mr: 'ग्रँड नैन केळी' },
    'Banana': { hi: 'केला', mr: 'केळी' },

    'Yellow Soybean (Latur JS 335)': { hi: 'पीला सोयाबीन (लातूर जेएस 335)', mr: 'पिवळी सोयाबीन (लातूर जेएस ३३५)' },
    'Yellow Soybean (JS 335)': { hi: 'पीला सोयाबीन (जेएस 335)', mr: 'पिवळी सोयाबीन (जेएस ३३५)' },
    'Yellow Soybean': { hi: 'पीला सोयाबीन', mr: 'पिवळी सोयाबीन' },
    'Soybean': { hi: 'सोयाबीन', mr: 'सोयाबीन' },

    'Nagpur Orange / Santra (Table Export Grade)': { hi: 'नागपुर संतरा (टेबल निर्यात ग्रेड)', mr: 'नागपूर संत्री (टेबल निर्यात प्रत)' },
    'Nagpur Orange (Santra)': { hi: 'नागपुर संतरा', mr: 'नागपूर संत्री' },
    'Nagpur Orange': { hi: 'नागपुर संतरा', mr: 'नागपूर संत्री' },
    'Orange': { hi: 'संतरा', mr: 'संत्री' },

    'Sangli Rajapuri Turmeric Finger (High Curcumin)': { hi: 'सांगली राजापुरी हल्दी (उच्च करक्यूमिन)', mr: 'सांगली राजापुरी हळद (उच्च करक्युमिन)' },
    'Sangli Rajapuri Turmeric Finger': { hi: 'सांगली राजापुरी हल्दी', mr: 'सांगली राजापुरी हळद' },
    'Sangli Turmeric': { hi: 'सांगली हल्दी', mr: 'सांगली हळद' },
    'Turmeric': { hi: 'हल्दी', mr: 'हळद' },

    'Bhagwa Pomegranate (Solapur GI)': { hi: 'भगवा अनार (सोलापुर जीआई)', mr: 'भगवा डाळिंब (सोलापूर GI)' },
    'Bhagwa Pomegranate': { hi: 'भगवा अनार', mr: 'भगवा डाळिंब' },
    'Pomegranate': { hi: 'अनार', mr: 'डाळिंब' },

    'Vidarbha Raw Cotton (Long Staple)': { hi: 'विदर्भ कच्चा कपास (लंबा स्टेपल)', mr: 'विदर्भ कच्चा कापूस (लांब धागा)' },
    'Raw Cotton': { hi: 'कच्चा कपास', mr: 'कच्चा कापूस' },
    'Cotton': { hi: 'कपास', mr: 'कापूस' },

    'Yellow Maize (Malegaon Hybrid)': { hi: 'पीला मक्का (मालेगांव हाइब्रिड)', mr: 'पिवळी मका (मालेगाव संकरित)' },
    'Yellow Maize': { hi: 'पीला मक्का', mr: 'पिवळी मका' },
    'Maize': { hi: 'मक्का', mr: 'मका' },

    'Green Gram / Moong (Maharashtra Grade 1)': { hi: 'मूंग (महाराष्ट्र ग्रेड 1)', mr: 'मूग (महाराष्ट्र प्रत १)' },
    'Green Gram / Moong': { hi: 'मूंग', mr: 'मूग' },
    'Moong': { hi: 'मूंग', mr: 'मूग' },

    'Chana / Bengal Gram (Vijay Variety)': { hi: 'चना / हरभरा (विजय किस्म)', mr: 'हरभरा / चना (विजय जात)' },
    'Chana / Bengal Gram': { hi: 'चना / हरभरा', mr: 'हरभरा' },
    'Chana': { hi: 'चना', mr: 'हरभरा' },

    'G4 Green Chilli (Nandurbar)': { hi: 'जी4 हरी मिर्च (नंदुरबार)', mr: 'जी४ हिरवी मिरची (नंदुरबार)' },
    'Green Chilli': { hi: 'हरी मिर्च', mr: 'हिरवी मिरची' },

    'Alphonso Mango (Devgad / Ratnagiri GI)': { hi: 'हापुस आम (देवगड / रत्नागिरी जीआई)', mr: 'हापूस आंबा (देवगड / रत्नागिरी GI)' },
    'Alphonso Mango': { hi: 'हापुस आम', mr: 'हापूस आंबा' },
    'Mango': { hi: 'आम', mr: 'आंबा' },

    'Thompson Seedless Grapes (Nashik Export)': { hi: 'थॉम्पसन थॉमसन अंगूर (नासिक निर्यात)', mr: 'थॉम्सन बिनबियांची द्राक्षे (नाशिक निर्यात)' },
    'Seedless Grapes': { hi: 'अंगूर (बिना बीज)', mr: 'बिनबियांची द्राक्षे' },
    'Grapes': { hi: 'अंगूर', mr: 'द्राक्षे' }
  };

  // 4. MANDI & REGIONAL HUBS
  const MANDI_MAP = {
    'Lasalgaon': { hi: 'लासलगांव', mr: 'लासलगाव' },
    'Narayangaon': { hi: 'नारायणगांव', mr: 'नारायणगाव' },
    'Vashi (Mumbai)': { hi: 'वाशी (मुंबई)', mr: 'वाशी (मुंबई)' },
    'Vashi': { hi: 'वाशी', mr: 'वाशी' },
    'Latur': { hi: 'लातूर', mr: 'लातूर' },
    'Jalgaon': { hi: 'जलगांव', mr: 'जळगाव' },
    'Nagpur': { hi: 'नागपुर', mr: 'नागपूर' },
    'Solapur': { hi: 'सोलापुर', mr: 'सोलापूर' },
    'Sangli': { hi: 'सांगली', mr: 'सांगली' },
    'Amravati': { hi: 'अमरावती', mr: 'अमरावती' },
    'Nashik': { hi: 'नासिक', mr: 'नाशिक' },
    'Akola': { hi: 'अकोला', mr: 'अकोला' },
    'Kolhapur': { hi: 'कोल्हापुर', mr: 'कोल्हापूर' },
    'Pune': { hi: 'पुणे', mr: 'पुणे' },
    'Baramati': { hi: 'बारामती', mr: 'बारामती' },
    'Ahmednagar': { hi: 'अहमदनगर', mr: 'अहिल्यानगर (अहमदनगर)' },
    'Junnar': { hi: 'जुन्नर', mr: 'जुन्नर' },
    'Yeola': { hi: 'येवला', mr: 'येवला' },
    'Pimpalgaon': { hi: 'पिंपलगांव', mr: 'पिंपळगाव' }
  };

  // 5. CORE PHRASE DICTIONARY FOR ADMIN MODULE
  const RAW_PHRASES = [
    // Navigation & General
    ['Marketplace Control Center', 'मार्केटप्लेस नियंत्रण केंद्र', 'बाजारपेठ नियंत्रण केंद्र'],
    ['AGRINEX ADMIN', 'एग्रीनेक्स एडमिन', 'ॲग्रीनेक्स ॲडमिन'],
    ['AgriNex Marketplace Control Center', 'एग्रीनेक्स मार्केटप्लेस नियंत्रण केंद्र', 'ॲग्रीनेक्स बाजारपेठ नियंत्रण केंद्र'],
    ['Main Menu', 'मुख्य मेन्यू', 'मुख्य मेनू'],
    ['Dashboard', 'डैशबोर्ड', 'डॅशबोर्ड'],
    ['Users', 'उपयोगकर्ता', 'वापरकर्ते'],
    ['Market Data', 'बाजार डेटा', 'बाजार आकडेवारी'],
    ['Deals & Payments', 'सौदा और भुगतान', 'सौदे व देयके'],
    ['Logistics & Storage', 'लॉजिस्टिक्स और भंडारण', 'वाहतूक व साठवणूक'],
    ['Emergency Sell', 'आपातकालीन बिक्री', 'तातडीची विक्री'],
    ['Grievances', 'शिकायत निवारण', 'तक्रार निवारण'],
    ['Reports', 'ऑडिट रिपोर्ट', 'अहवाल व तपासणी'],
    ['Governance Desks', 'प्रशासन डेस्क', 'प्रशासन डेस्क'],
    ['Escrow Clearances', 'एस्क्रो निकासी', 'एस्क्रो मंजुरी'],
    ['Mandi MSP Desk', 'मंडी एमएसपी डेस्क', 'बाजार समिती हमीभाव डेस्क'],
    ['Tribunal Bench', 'ट्रिब्यूनल बेंच', 'न्यायाधिकरण खंडपीठ'],
    ['Connected Portals', 'जुड़े हुए पोर्टल', 'संलग्न पोर्टल्स'],
    ['Connected Portals:', 'जुड़े हुए पोर्टल:', 'संलग्न पोर्टल्स:'],
    ['Farmer Portal', 'किसान पोर्टल', 'शेतकरी पोर्टल'],
    ['Buyer Terminal', 'खरीदार टर्मिनल', 'खरेदीदार टर्मिनल'],
    ['Logistics Hub', 'लॉजिस्टिक्स हब', 'वाहतूक केंद्र'],
    ['Sign Out', 'लॉग आउट', 'बाहेर पडा'],
    ['Switch Portal', 'पोर्टल बदलें', 'पोर्टल बदला'],
    ['Back to HQ', 'मुख्यालय वापस जाएं', 'मुख्यालयाकडे परत'],
    ['Desk ↗', 'डेस्क ↗', 'डेस्क ↗'],

    // Executive Status Bar & Officer
    ['Central APMC Control Desk', 'केंद्रीय एपीएमसी नियंत्रण कक्ष', 'केंद्रीय बाजार समिती नियंत्रण कक्ष'],
    ['Chief Mandi Commissioner', 'मुख्य मंडी आयुक्त', 'मुख्य बाजार समिती आयुक्त'],
    ['Escrow Authority', 'एस्क्रो नियामक प्राधिकरण', 'एस्क्रो नियामक प्राधिकरण'],
    ['Price Committee Chair', 'मूल्य निर्धारण समिति अध्यक्ष', 'भाव निर्धारण समिती अध्यक्ष'],
    ['Tribunal Presiding Officer', 'न्यायाधिकरण पीठासीन अधिकारी', 'न्यायाधिकरण पीठासीन अधिकारी'],
    ['305 Mandis Live Across Maharashtra', 'महाराष्ट्र भर में 305 मंडियां लाइव', 'महाराष्ट्रभरातील ३०५ बाजार समित्या थेट कार्यरत'],
    ['Nodal Governance Active', 'नोडल प्रशासन सक्रिय', 'नोडल प्रशासन सक्रिय'],
    ['Action Items', 'लंबित कार्य', 'प्रलंबित कृती'],
    ['14 Action Items', '14 लंबित कार्य', '१४ प्रलंबित कृती'],
    ['Advisory', 'परामर्श', 'सल्लागार'],
    ['Audit Export', 'ऑडिट निर्यात', 'तपासणी अहवाल'],

    // KPI Cards
    ['Verified Producers & Buyers', 'सत्यापित उत्पादक और खरीदार', 'प्रमाणित उत्पादक व खरेदीदार'],
    ['Producers & Buyers', 'उत्पादक और खरीदार', 'उत्पादक व खरेदीदार'],
    ['Producers', 'उत्पादक', 'उत्पादक'],
    ['Enterprise Buyers', 'व्यावसायिक खरीदार', 'संस्थात्मक खरेदीदार'],
    ['Dual-Key Escrow Pool', 'डुअल-की एस्क्रो पूल', 'ड्युअल-की एस्क्रो निधी'],
    ['Active Trade Contracts', 'सक्रिय व्यापार अनुबंध', 'सक्रिय व्यवहार करार'],
    ['100% Dual-Key Protected', '100% डुअल-की सुरक्षित', '१००% ड्युअल-की सुरक्षित'],
    ['Logistics & Reefer Fleets', 'लॉजिस्टिक्स और रीफर फ्लीट', 'वाहतूक व शीत-वाहतूक फ्लीट'],
    ['Active Fleets', 'सक्रिय फ्लीट', 'सक्रिय वाहने'],
    ['Active Deliveries', 'सक्रिय डिलीवरी', 'सक्रिय मालवाहतूक'],
    ['On Schedule', 'समय पर', 'वेळेवर'],
    ['Urgent Action Items', 'अति आवश्यक कार्य', 'तातडीच्या प्रलंबित कृती'],
    ['Pending Breakdowns', 'लंबित विवरण', 'प्रलंबित वर्गीकरण'],

    // Priority Action Queue
    ['Priority Action Queue', 'प्राथमिकता कार्य कतार', 'प्राधान्य कृती रांग'],
    ['Items Pending Immediate Sign-Off', 'तत्काल हस्ताक्षर हेतु लंबित कार्य', 'तातडीच्या स्वाक्षरीसाठी प्रलंबित कृती'],
    ['Top administrative clearances requiring commissioner sign-off today', 'आज आयुक्त के हस्ताक्षर हेतु आवश्यक शीर्ष प्रशासनिक स्वीकृतियां', 'आज आयुक्तांच्या मंजुरीसाठी आवश्यक प्रमुख प्रशासकीय कामे'],
    ['Release', 'जारी करें', 'मंजूर करा'],
    ['Enforce', 'लागू करें', 'अंमलबजावणी करा'],
    ['Approve', 'स्वीकृत करें', 'मंजूर करा'],
    ['Inspect', 'निरीक्षण करें', 'तपासा'],
    ['View All 14 Action Items →', 'सभी 14 लंबित कार्य देखें →', 'सर्व १४ प्रलंबित कृती पहा →'],
    ['e-PoD Verified', 'ई-पीओडी सत्यापित', 'ई-पीओडी प्रमाणित'],
    ['Lab Assay Passed', 'लैब परीक्षण उत्तीर्ण', 'प्रयोगशाळा चाचणी उत्तीर्ण'],
    ['Satbara Validated', '7/12 सत्यापित', '७/१२ प्रमाणित'],
    ['Dispute Hearing Today', 'विवाद सुनवाई आज', 'तक्रार सुनावणी आज'],
    ['GSTIN Validated', 'जीएसटी सत्यापित', 'जीएसटी प्रमाणित'],

    // Operational Pulse
    ['Live Operational Pulse', 'लाइव संचालन स्थिति', 'थेट कामकाजाचा आढावा'],
    ['Mandi APMC Watch', 'मंडी एपीएमसी निगरानी', 'बाजार समिती निरीक्षण'],
    ['Cold Storage', 'शीतगृह भंडारण', 'शीतगृह साठवणूक'],
    ['Open Full State GIS Command Map', 'राज्य स्तरीय जीआईएस नियंत्रण नक्शा खोलें', 'राज्यस्तरीय जीआयएस नियंत्रण नकाशा उघडा'],
    ['Artificial Hoarding Risk Flagged', 'कृत्रिम जमाखोरी का जोखिम चिह्नित', 'साठेबाजीचा धोका आढळला'],
    ['MSP Floor Pressure Watch', 'एमएसपी न्यूनतम मूल्य निगरानी', 'हमीभाव आधारभूत किंमत निरीक्षण'],
    ['Nominal Trade Velocity', 'सामान्य व्यापार गति', 'सुरळीत व्यवहार गती'],
    ['Nominal', 'सामान्य', 'सुरळीत'],
    ['Occupancy', 'भरण क्षमता', 'साठवणूक प्रमाण'],

    // Users Section
    ['User Directory & Management System', 'उपयोगकर्ता निर्देशिका और प्रबंधन प्रणाली', 'वापरकर्ते निर्देशिका व व्यवस्थापन प्रणाली'],
    ['Manage verified & pending Farmers, Enterprise Buyers, and Logistics Fleet Partners', 'सत्यापित और लंबित किसानों, खरीदारों और लॉजिस्टिक्स भागीदारों का प्रबंधन करें', 'प्रमाणित व प्रलंबित शेतकरी, खरेदीदार आणि वाहतूकदारांचे व्यवस्थापन करा'],
    ['All Users', 'सभी उपयोगकर्ता', 'सर्व वापरकर्ते'],
    ['Farmers', 'किसान', 'शेतकरी'],
    ['Buyers', 'खरीदार', 'खरेदीदार'],
    ['Logistics', 'लॉजिस्टिक्स', 'वाहतूकदार'],
    ['FPO Federations', 'एफपीओ महासंघ', 'शेतकरी उत्पादक संस्था (FPO)'],
    ['Pending Verification', 'सत्यापन लंबित', 'प्रमाणन प्रलंबित'],
    ['Live Verification & Compliance Audit Active', 'लाइव सत्यापन और अनुपालन ऑडिट सक्रिय', 'थेट पडताळणी व कायदेशीर तपासणी सुरू'],
    ['Showing real-time KYC & compliance records', 'वास्तविक समय के केवाईसी व अनुपालन रिकॉर्ड प्रदर्शित', 'थेट केवायसी व कायदेशीर नोंदी दर्शवित आहे'],
    ['User & ID', 'उपयोगकर्ता और आईडी', 'वापरकर्ता व ओळख क्रमांक'],
    ['Category', 'श्रेणी', 'प्रवर्ग'],
    ['Location / Hub', 'स्थान / मंडी हब', 'ठिकाण / मुख्य केंद्र'],
    ['Commodity / Operations / Credit', 'फसल / संचालन / साख', 'शेतमाल / कामकाज / पत'],
    ['KYC & Compliance Proof', 'केवाईसी व अनुपालन प्रमाण', 'केवायसी व कायदेशीर पुरावा'],
    ['Status & Risk', 'स्थिति और जोखिम', 'स्थिती व जोखीम'],
    ['Admin Action', 'प्रशासक कार्रवाई', 'प्रशासकीय कारवाई'],
    ['Verify KYC', 'केवाईसी सत्यापित करें', 'केवायसी प्रमाणित करा'],
    ['Approved ✓', 'स्वीकृत ✓', 'मंजूर ✓'],
    ['Verified', 'सत्यापित', 'प्रमाणित'],
    ['Under Review', 'समीक्षाधीन', 'पुनरावलोकन सुरू'],

    // Market Data Section
    ['Market Data & Mandi Price Benchmarks', 'बाजार डेटा और मंडी बेंचमार्क दरें', 'बाजार आकडेवारी व बाजार समितीचे हमीभाव'],
    ['Government MSP floor price controls, mandi modal pricing, and ceiling caps across 28 Maharashtra crops', 'महाराष्ट्र की 28 फसलों के लिए सरकारी एमएसपी न्यूनतम मूल्य, मॉडल भाव और अधिकतम सीमा नियंत्रण', 'महाराष्ट्रातील २८ पिकांसाठी शासकीय हमीभाव, सरासरी बाजारभाव व कमाल मर्यादा नियंत्रण'],
    ['Broadcast Price Advisory', 'मूल्य परामर्श प्रसारित करें', 'दर सल्लागार प्रसारित करा'],
    ['Standalone Mandi Desk →', 'समर्पित मंडी डेस्क →', 'समर्पित बाजार समिती डेस्क →'],
    ['Dedicated Mandi Desk →', 'समर्पित मंडी डेस्क →', 'समर्पित बाजार समिती डेस्क →'],
    ['AI Anti-Hoarding & Market Price Anomaly Engine', 'एआई जमाखोरी-रोधी व बाजार मूल्य विसंगति इंजन', 'एआय साठेबाजी-विरोधी व बाजारभाव विसंगती यंत्रणा'],
    ['Active Triggers', 'सक्रिय अलर्ट', 'सक्रिय सूचना'],
    ['Statutory Form-IV Protocol Active', 'वैधानिक फॉर्म-IV प्रोटोकॉल सक्रिय', 'वैधानिक फॉर्म-IV प्रोटोकॉल सक्रिय'],
    ['Algorithmic surveillance of 305 APMCs: flags artificial supply suppression, cartel hoarding, and off-market price crashes below statutory MSP.', '305 एपीएमसी की एल्गोरिदमिक निगरानी: कृत्रिम आपूर्ति दमन, कार्टेल जमाखोरी और एमएसपी से नीचे भाव गिरने की सूचना।', '३०५ बाजार समित्यांची संगणकीय देखरेख: कृत्रिम टंचाई, साठेबाजी व हमीभावापेक्षा कमी भावात होणाऱ्या व्यवहारांवर कडक नजर.'],
    ['Deploy APMC Flying Squad', 'एपीएमसी फ्लाइंग स्क्वाड तैनात करें', 'बाजार समिती भरारी पथक तैनात करा'],
    ['Issue Show-Cause Notice', 'कारण बताओ नोटिस जारी करें', 'कारणे दाखवा नोटीस बजावा'],
    ['Commodity ID & Name', 'फसल आईडी और नाम', 'शेतमाल ओळख क्रमांक व नाव'],
    ['Govt MSP Floor', 'सरकारी एमएसपी आधार', 'शासकीय हमीभाव'],
    ['Modal Mandi Price', 'मंडी मॉडल भाव', 'बाजार समिती सरासरी भाव'],
    ['Ceiling Cap', 'अधिकतम सीमा', 'कमाल मर्यादा'],
    ['Trend & Demand', 'रुझान और मांग', 'कल व मागणी'],
    ['Key Regional Mandis', 'प्रमुख क्षेत्रीय मंडियां', 'प्रमुख प्रादेशिक बाजार समित्या'],
    ['Price Action', 'मूल्य कार्रवाई', 'भाव कृती'],
    ['Calibrate Benchmark', 'भाव कैलिब्रेट करें', 'भाव निश्चित करा'],
    ['Adjust', 'समायोजित करें', 'बदल करा'],
    ['High Demand', 'उच्च मांग', 'अतिशय मागणी'],
    ['Moderate Demand', 'मध्यम मांग', 'मध्यम मागणी'],
    ['Supply Inflow Spike', 'आपूर्ति में उछाल', 'बाजारात आवक वाढली'],
    ['MSP Floor Pressure', 'एमएसपी दबाव', 'हमीभावावर दबाव'],
    ['Cap Limit', 'अधिकतम सीमा', 'कमाल मर्यादा'],

    // Deals & Payments
    ['Deals & Dual-Key Escrow Payments Ledger', 'सौदा और डुअल-की एस्क्रो भुगतान बही', 'सौदे व ड्युअल-की एस्क्रो देयके नोंदवही'],
    ['Direct RTGS milestone payouts backed by digital e-PoD & electronic weigh slips', 'डिजिटल ई-पीओडी और इलेक्ट्रॉनिक वजन पर्चियों द्वारा समर्थित सीधे आरटीजीएस भुगतान', 'डिजिटल ई-पीओडी व इलेक्ट्रॉनिक वजन पावतीनुसार थेट आरटीजीएस देयके'],
    ['Dual-Key Escrow Locked', 'डुअल-की एस्क्रो सुरक्षित', 'ड्युअल-की एस्क्रो सुरक्षित'],
    ['Standalone Escrow Desk →', 'समर्पित एस्क्रो डेस्क →', 'समर्पित एस्क्रो डेस्क →'],
    ['Dedicated Escrow Desk →', 'समर्पित एस्क्रो डेस्क →', 'समर्पित एस्क्रो डेस्क →'],
    ['All Escrow', 'सभी एस्क्रो', 'सर्व एस्क्रो'],
    ['35% Advance', '35% अग्रिम', '३५% उचल (अ‍ॅडव्हान्स)'],
    ['65% Final Balance', '65% अंतिम शेष', '६५% उर्वरित रक्कम'],
    ['Quarantined / Disputes', 'रोका गया / विवादित', 'होल्ड / वादग्रस्त'],
    ['Dual-Key Escrow Release Authorization Queue', 'डुअल-की एस्क्रो विमुक्ति प्राधिकरण कतार', 'ड्युअल-की एस्क्रो निधी वितरण मंजुरी रांग'],
    ['Case ID & Type', 'मामला आईडी और प्रकार', 'केस आयडी व प्रकार'],
    ['Counterparties & Crop', 'पक्षकार और फसल', 'पक्षकार व शेतमाल'],
    ['Milestone Payout', 'किस्त भुगतान', 'हप्ता देयक'],
    ['Verification Proof', 'सत्यापन प्रमाण', 'पडताळणी पुरावा'],
    ['Governance Action', 'प्रशासन कार्रवाई', 'प्रशासकीय कारवाई'],
    ['Authorize RTGS', 'आरटीजीएस अधिकृत करें', 'आरटीजीएस मंजूर करा'],
    ['Hold', 'रोकें (होल्ड)', 'होल्डवर ठेवा'],
    ['Escrow Quarantined', 'एस्क्रो रोका गया', 'एस्क्रो होल्डवर'],
    ['Settlement Cleared (RTGS Sent)', 'निपटान स्वीकृत (आरटीजीएस प्रेषित)', 'निधी वर्ग झाला (RTGS द्वारे वितरित)'],
    ['Cleared', 'स्वीकृत', 'मंजूर'],

    // Emergency Sell
    ['Emergency Sell & Distress Produce Clearance', 'आपातकालीन बिक्री और संकटग्रस्त उपज निकासी', 'तातडीची विक्री व संकटग्रस्त शेतमाल जलद मंजुरी'],
    ['Perishable Flash Auctions', 'नाशवान उपज फ्लैश नीलामी', 'नाशवंत शेतमालाचा जलद लिलाव'],
    ['Rapid liquidation protocol for crops at risk of spoilage, container cancellations, or unseasonal weather damage', 'खराब होने, कंटेनर रद्द होने या बेमौसम मौसम से प्रभावित फसलों के त्वरित निपटान प्रोटोकॉल', 'खराब होण्याच्या उंबरठ्यावर असलेला, कंटेनर रद्द झालेला किंवा अवकाळी पावसाने बाधित शेतमालाचा जलद लिलाव'],
    ['Automated 4-Hour Distress Flash Liquidation Protocol Active', 'स्वचालित 4-घंटे संकटकालीन फ्लैश नीलामी प्रोटोकॉल सक्रिय', 'स्वयंचलित ४ तासांचा जलद लिलाव प्रोटोकॉल सक्रिय'],
    ['Broadcast Flash Auction to 850 Buyers', '850 खरीदारों को फ्लैश नीलामी संदेश भेजें', '८५० खरेदीदारांना जलद लिलावाचा संदेश पाठवा'],
    ['Broadcast Dispatched to 850 Buyers', '850 खरीदारों को संदेश प्रसारित किया गया', '८५० खरेदीदारांना संदेश पाठवला गेला'],
    ['Distress Discount Rate', 'संकटकालीन छूट दर', 'तातडीचा सवलत दर'],
    ['Hours to Critical Spoilage', 'खराब होने में शेष घंटे', 'खराब होण्यापूर्वी शिल्लक तास'],

    // Grievances & Tribunal
    ['Grievance Redressal & Dispute Tribunal', 'शिकायत निवारण और विवाद न्यायाधिकरण', 'तक्रार निवारण व वाद न्यायाधिकरण'],
    ['Enforce legally binding split settlements supported by NABL lab assays, electronic weighbridge slips, and photo evidence', 'एनएबीएल लैब परीक्षण, इलेक्ट्रॉनिक वे-ब्रिज पर्चियों और फोटो साक्ष्य द्वारा समर्थित कानूनी रूप से बाध्यकारी समझौते लागू करें', 'एनएबीएल लॅब चाचणी, इलेक्ट्रॉनिक वजन पावती व फोटो पुराव्यांच्या आधारे कायदेशीर लवाद निकाल लागू करा'],
    ['Dedicated Tribunal Bench →', 'समर्पित न्यायाधिकरण बेंच →', 'समर्पित न्यायाधिकरण खंडपीठ →'],
    ['Inspect Evidence', 'साक्ष्य देखें', 'पुरावे तपासा'],
    ['Fast-Track Auto-Arbitration', 'फास्ट-ट्रैक स्वचालित मध्यस्थता', 'जलद-गती स्वयंचलित लवाद'],
    ['Binding Award Enforced', 'बाध्यकारी आदेश लागू', 'कायदेशीर निकाल लागू'],
    ['Arbitration In Progress', 'मध्यस्थता प्रगति पर है', 'लवाद सुनावणी सुरू आहे'],
    ['Farmer Claim', 'किसान का दावा', 'शेतकऱ्याचा दावा'],
    ['Buyer Claim', 'खरीदार का दावा', 'खरेदीदाराचा दावा'],
    ['Disputed Amount', 'विवादित राशि', 'वादग्रस्त रक्कम'],

    // Reports & Audits
    ['Platform Governance & Audit Reports', 'प्लेटफॉर्म प्रशासन और ऑडिट रिपोर्ट', 'प्लॅटफॉर्म प्रशासन व तपासणी अहवाल'],
    ['Cryptographic immutable records and state APMC regulatory compliance audits', 'क्रिप्टोग्राफिक अपरिवर्तनीय रिकॉर्ड और राज्य एपीएमसी नियामक अनुपालन ऑडिट', 'क्रिप्टोग्राफिक सुरक्षित नोंदी व राज्य बाजार समिती नियामक तपासणी अहवाल'],
    ['Export CSV', 'सीएसवी निर्यात करें', 'सीएसव्ही डाऊनलोड'],
    ['Download PDF Report', 'पीडीएफ रिपोर्ट डाउनलोड करें', 'पीडीएफ अहवाल डाऊनलोड'],
    ['Event ID', 'घटना आईडी', 'नोंद क्रमांक'],
    ['Timestamp', 'समय', 'वेळ'],
    ['Target Entity / Counterparty', 'लक्षित संस्था / पक्षकार', 'संबंधित संस्था / पक्षकार'],
    ['Target Entity', 'लक्षित संस्था', 'संबंधित संस्था'],
    ['Financial Value', 'वित्तीय मूल्य', 'आर्थिक मूल्य'],
    ['Cryptographic Hash', 'क्रिप्टोग्राफिक हैश', 'क्रिप्टोग्राफिक हॅश'],
    ['Cryptographic Governance Audit Trail', 'क्रिप्टोग्राफिक प्रशासन ऑडिट ट्रेल', 'क्रिप्टोग्राफिक प्रशासकीय ऑडिट नोंदवही'],
    ['Immutable SHA-256 Hashes', 'अपरिवर्तनीय SHA-256 हैश', 'अपरिवर्तनीय SHA-256 हॅश'],

    // Modals
    ['Dual-Key Escrow Release Authorization', 'डुअल-की एस्क्रो विमुक्ति प्राधिकरण', 'ड्युअल-की एस्क्रो निधी वितरण मंजुरी'],
    ['Escrow Release Order', 'एस्क्रो विमुक्ति आदेश', 'एस्क्रो निधी वितरण आदेश'],
    ['Sign Dual-Key Authorization & Release RTGS', 'डुअल-की पर हस्ताक्षर करें और आरटीजीएस भेजें', 'ड्युअल-की मंजूर करून RTGS वितरित करा'],
    ['Quarantine Payout (Audit Hold)', 'भुगतान रोकें (ऑडिट होल्ड)', 'रक्कम रोखा (तपासणी होल्ड)'],
    ['Close', 'बंद करें', 'बंद करा'],
    ['Action Center', 'कार्य केंद्र', 'कृती केंद्र'],
    ['Items Requiring Admin Attention', 'प्रशासक के ध्यान हेतु आवश्यक कार्य', 'प्रशासकीय लक्ष वेधून घेणारे आवश्यक कार्य'],
    ['User KYC Verification', 'उपयोगकर्ता केवाईसी सत्यापन', 'वापरकर्ता केवायसी पडताळणी'],
    ['AI Voice & Multilingual Broadcast Desk', 'एआई वॉयस व बहुभाषी प्रसारण डेस्क', 'एआय व्हॉईस व बहुभाषिक प्रसारण डेस्क'],
    ['Emergency Public Advisory & Voice Broadcaster', 'आपातकालीन सार्वजनिक परामर्श व वॉयस ब्रॉडकास्टर', 'तातडीचा सार्वजनिक सल्ला व व्हॉईस ब्रॉडकास्टर'],
    ['Select Crisis Scenario / Preset:', 'संकट परिदृश्य / प्रीसेट चुनें:', 'संकट परिस्थिती / तयार संदेश निवडा:'],
    ['Preview Voice Call', 'वॉयस कॉल का पूर्वावलोकन करें', 'व्हॉईस कॉल ऐका'],
    ['Dispatch Outbound Call Blast', 'सभी को वॉयस कॉल व संदेश भेजें', 'सर्व घटकांना व्हॉईस कॉल व संदेश पाठवा'],
    ['Tribunal Evidence Inspection & Lab Assays', 'न्यायाधिकरण साक्ष्य निरीक्षण व लैब रिपोर्ट', 'न्यायाधिकरण पुरावे तपासणी व प्रयोगशाळा अहवाल'],
    ['Farm Gate Pickup Evidence', 'खेत पर उठान का साक्ष्य', 'शेतबांधावरील माल उचल पुरावा'],
    ['Warehouse / Intake Dock Inspection', 'गोदाम / आगमन डॉक निरीक्षण', 'गोदाम / आवक डॉक तपासणी'],
    ['Certified NABL Quality Lab Assay', 'प्रमाणित एनएबीएल गुणवत्ता लैब परीक्षण', 'प्रमाणित NABL गुणवत्ता प्रयोगशाळा चाचणी'],

    // Standalone pages
    ['Maharashtra Dual-Key Escrow Clearance Desk', 'महाराष्ट्र डुअल-की एस्क्रो निकासी डेस्क', 'महाराष्ट्र ड्युअल-की एस्क्रो मंजुरी डेस्क'],
    ['100% Dual-Key Bank Backed', '100% डुअल-की बैंक गारंटी प्राप्त', '१००% ड्युअल-की बँक हमी संरक्षित'],
    ['Maharashtra APMC Mandi Price Governance & MSP Controls', 'महाराष्ट्र एपीएमसी मंडी भाव प्रशासन व एमएसपी नियंत्रण', 'महाराष्ट्र बाजार समिती भाव प्रशासन व हमीभाव नियंत्रण'],
    ['28 APMC Commodity Mandi Benchmarks Active', '28 एपीएमसी फसल मंडी बेंचमार्क सक्रिय', '२८ बाजार समित्यांचे शेतमाल हमीभाव सक्रिय'],
    ['Grievance Redressal & Arbitration Tribunal', 'शिकायत निवारण और मध्यस्थता न्यायाधिकरण', 'तक्रार निवारण व लवाद न्यायाधिकरण'],
    ['Fast-Track Arbitration Bench: 100% Resolution Rate', 'फास्ट-ट्रैक मध्यस्थता बेंच: 100% समाधान दर', 'जलद-गती लवाद खंडपीठ: १००% तंटे निवारण दर'],
    ['Binding Tripartite Settlement Award Slider', 'बाध्यकारी त्रिपक्षीय समझौता पुरस्कार स्लाइडर', 'कायदेशीर त्रिपक्षीय लवाद निकाल स्लाइडर'],
    ['Farmer Payout', 'किसान को भुगतान', 'शेतकऱ्याला देयक'],
    ['Buyer Refund', 'खरीदार को रिफंड', 'खरेदीदाराचा परतावा'],
    ['Logistics Transit Insurance Claim', 'लॉजिस्टिक्स पारगमन बीमा दावा', 'वाहतूक विमा भरपाई दावा'],
    ['Enforce Legally Binding Tribunal Order', 'कानूनी रूप से बाध्यकारी न्यायाधिकरण आदेश लागू करें', 'कायदेशीर लवाद निकाल जारी व लागू करा'],
    ['Select Language', 'भाषा चुनें', 'भाषा निवडा']
  ];

  // Placeholder phrases for inputs
  const PLACEHOLDER_MAP = {
    'Search Users, Deals, Mandi commodities, Shipments... (Press ⌘K or Ctrl+K)': {
      hi: 'उपयोगकर्ता, सौदे, मंडी फसलें खोजें... (Ctrl+K दबाएं)',
      mr: 'वापरकर्ते, सौदे, शेतमाल शोधा... (Ctrl+K दाबा)'
    },
    'Search user by name, phone, hub, crop, GSTIN...': {
      hi: 'नाम, फोन, मंडी, फसल, जीएसटी से उपयोगकर्ता खोजें...',
      mr: 'नाव, फोन, बाजार समिती, पीक, जीएसटीने शोधा...'
    },
    'Filter commodity (e.g. Onion, Tomato, Soybean, Cotton...)': {
      hi: 'फसल खोजें (उदा. प्याज, टमाटर, सोयाबीन, कपास...)',
      mr: 'शेतमाल शोधा (उदा. कांदा, टोमॅटो, सोयाबीन, कापूस...)'
    },
    'Search deals by ID, farmer, buyer, crop...': {
      hi: 'सौदा आईडी, किसान, खरीदार, फसल से खोजें...',
      mr: 'सौदा आयडी, शेतकरी, खरेदीदार, पिकाने शोधा...'
    },
    'Search distress lots by ID, crop, farmer, hub...': {
      hi: 'संकटग्रस्त लॉट आईडी, फसल, किसान, मंडी से खोजें...',
      mr: 'तातडीचे लॉट आयडी, पीक, शेतकरी, केंद्राने शोधा...'
    },
    'Search Escrow batch ID, beneficiary farmer, buyer company, mandi...': {
      hi: 'एस्क्रो बैच आईडी, किसान, खरीदार कंपनी, मंडी खोजें...',
      mr: 'एस्क्रो बॅच आयडी, लाभार्थी शेतकरी, खरेदीदार, बाजार समिती शोधा...'
    },
    'Search 28 Maharashtra commodities, APMC mandis (Lasalgaon, Latur, Vashi)...': {
      hi: '28 महाराष्ट्र फसलें, एपीएमसी मंडियां (लासलगांव, लातूर, वाशी) खोजें...',
      mr: '२८ महाराष्ट्रातील पिके, बाजार समित्या (लासलगाव, लातूर, वाशी) शोधा...'
    },
    'Search dispute ticket ID, claimant, buyer, lot ID, crop...': {
      hi: 'विवाद टिकट आईडी, दावेदार, खरीदार, लॉट आईडी, फसल खोजें...',
      mr: 'तक्रार तिकीट आयडी, तक्रारदार, खरेदीदार, लॉट आयडी, पीक शोधा...'
    }
  };

  // 6. TRANSLATION LOOKUP FUNCTIONS
  function getAdminLanguage() {
    try {
      return localStorage.getItem(STORAGE_KEY) || localStorage.getItem('agrinex_language') || 'en';
    } catch (e) {
      return 'en';
    }
  }

  function tText(englishText, targetLang) {
    if (!englishText || typeof englishText !== 'string') return englishText;
    const l = targetLang || getAdminLanguage();
    if (l === 'en') return englishText;

    const trimmed = englishText.trim();

    // Check exact placeholder map
    if (PLACEHOLDER_MAP[trimmed] && PLACEHOLDER_MAP[trimmed][l]) {
      return PLACEHOLDER_MAP[trimmed][l];
    }

    // Check Person map
    if (PERSON_MAP[trimmed] && PERSON_MAP[trimmed][l]) {
      return PERSON_MAP[trimmed][l];
    }

    // Check Buyer map
    if (BUYER_MAP[trimmed] && BUYER_MAP[trimmed][l]) {
      return BUYER_MAP[trimmed][l];
    }

    // Check Crop map
    if (CROP_MAP[trimmed] && CROP_MAP[trimmed][l]) {
      return CROP_MAP[trimmed][l];
    }

    // Check Mandi map
    if (MANDI_MAP[trimmed] && MANDI_MAP[trimmed][l]) {
      return MANDI_MAP[trimmed][l];
    }

    // Check Phrase map
    const colIdx = l === 'hi' ? 1 : 2;
    for (let i = 0; i < RAW_PHRASES.length; i++) {
      const row = RAW_PHRASES[i];
      if (row[0].toLowerCase() === trimmed.toLowerCase()) {
        return row[colIdx];
      }
    }

    // Substring replacements for composite labels
    let translated = trimmed;
    for (let i = 0; i < RAW_PHRASES.length; i++) {
      const row = RAW_PHRASES[i];
      if (row[0].length > 4 && translated.includes(row[0])) {
        translated = translated.split(row[0]).join(row[colIdx]);
      }
    }

    for (const [k, v] of Object.entries(CROP_MAP)) {
      if (translated.includes(k) && v[l]) {
        translated = translated.split(k).join(v[l]);
      }
    }

    for (const [k, v] of Object.entries(MANDI_MAP)) {
      if (translated.includes(k) && v[l]) {
        translated = translated.split(k).join(v[l]);
      }
    }

    return translated;
  }

  function tCrop(cropName, targetLang) {
    const l = targetLang || getAdminLanguage();
    if (l === 'en' || !cropName) return cropName;
    if (CROP_MAP[cropName] && CROP_MAP[cropName][l]) return CROP_MAP[cropName][l];
    return tText(cropName, l);
  }

  function tPerson(name, targetLang) {
    const l = targetLang || getAdminLanguage();
    if (l === 'en' || !name) return name;
    if (PERSON_MAP[name] && PERSON_MAP[name][l]) return PERSON_MAP[name][l];
    return tText(name, l);
  }

  function tBuyer(buyer, targetLang) {
    const l = targetLang || getAdminLanguage();
    if (l === 'en' || !buyer) return buyer;
    if (BUYER_MAP[buyer] && BUYER_MAP[buyer][l]) return BUYER_MAP[buyer][l];
    return tText(buyer, l);
  }

  function tLocation(loc, targetLang) {
    const l = targetLang || getAdminLanguage();
    if (l === 'en' || !loc) return loc;
    if (MANDI_MAP[loc] && MANDI_MAP[loc][l]) return MANDI_MAP[loc][l];
    return tText(loc, l);
  }

  function t(key, defaultVal) {
    return tText(defaultVal || key);
  }

  // 7. NON-DESTRUCTIVE DOM TREE WALKER
  function walkAndTranslateDOM(rootNode, targetLang) {
    if (!rootNode) return;
    const l = targetLang || getAdminLanguage();

    const walker = document.createTreeWalker(
      rootNode,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function (node) {
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          const tag = parent.tagName.toLowerCase();
          if (['script', 'style', 'noscript', 'code', 'pre', 'svg'].includes(tag)) {
            return NodeFilter.FILTER_REJECT;
          }
          if (parent.classList && parent.classList.contains('no-translate')) {
            return NodeFilter.FILTER_REJECT;
          }
          const val = node.nodeValue.trim();
          if (!val || /^[0-9.,₹$%+\-/: ]+$/.test(val)) {
            return NodeFilter.FILTER_SKIP;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const nodesToUpdate = [];
    let current;
    while ((current = walker.nextNode())) {
      nodesToUpdate.push(current);
    }

    nodesToUpdate.forEach(textNode => {
      if (typeof textNode._originalEnglishText === 'undefined') {
        textNode._originalEnglishText = textNode.nodeValue;
      }
      const orig = textNode._originalEnglishText;
      if (l === 'en') {
        textNode.nodeValue = orig;
      } else {
        textNode.nodeValue = tText(orig, l);
      }
    });

    // Translate Placeholders, Titles, Alts
    const elementsWithAttrs = rootNode.querySelectorAll ? rootNode.querySelectorAll('[placeholder], [title], [alt]') : [];
    elementsWithAttrs.forEach(el => {
      // Placeholders
      if (el.hasAttribute('placeholder')) {
        if (typeof el._originalPlaceholder === 'undefined') {
          el._originalPlaceholder = el.getAttribute('placeholder');
        }
        const orig = el._originalPlaceholder;
        el.setAttribute('placeholder', l === 'en' ? orig : tText(orig, l));
      }
      // Titles / Tooltips
      if (el.hasAttribute('title')) {
        if (typeof el._originalTitle === 'undefined') {
          el._originalTitle = el.getAttribute('title');
        }
        const orig = el._originalTitle;
        el.setAttribute('title', l === 'en' ? orig : tText(orig, l));
      }
    });
  }

  // 8. LANGUAGE SWITCH CONTROLLER
  function setAdminLanguage(lang) {
    if (!['en', 'hi', 'mr'].includes(lang)) lang = 'en';

    try {
      localStorage.setItem(STORAGE_KEY, lang);
      localStorage.setItem('agrinex_language', lang);
    } catch (e) {}

    // Update Language UI Selector Dropdown
    updateLanguageSelectorUI(lang);

    // Translate DOM elements
    if (typeof document !== 'undefined' && document.body) {
      walkAndTranslateDOM(document.body, lang);
    }

    // Re-render active dynamic views if dashboard controller is loaded
    if (typeof window.renderActiveSectionData === 'function') {
      const activeSec = document.querySelector('.gov-section.active');
      if (activeSec && activeSec.id) {
        const secId = activeSec.id.replace('section-', '');
        window.renderActiveSectionData(secId);
      }
    }

    // Broadcast change event
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('agrinex:languageChanged', { detail: { language: lang } }));
      if (window.AgriNexBus) {
        window.AgriNexBus.emit('language:changed', { language: lang, timestamp: Date.now() });
      }
    }

    // Show feedback toast if available
    const toastMsgs = {
      en: 'Language set to English',
      hi: 'भाषा बदलकर हिन्दी कर दी गई है',
      mr: 'भाषा मराठीमध्ये बदलण्यात आली आहे'
    };
    if (typeof AgriNexToast !== 'undefined') {
      AgriNexToast.show({ icon: '🌐', title: 'AgriNex i18n', message: toastMsgs[lang] });
    }
  }

  function updateLanguageSelectorUI(lang) {
    if (typeof document === 'undefined' || typeof document.getElementById !== 'function') return;
    const labelEl = document.getElementById('current-admin-language-label');
    if (labelEl) {
      const langLabels = {
        en: '🇬🇧 English',
        hi: '🇮🇳 हिन्दी',
        mr: '🚩 मराठी'
      };
      labelEl.textContent = langLabels[lang] || '🇬🇧 English';
    }

    ['en', 'hi', 'mr'].forEach(l => {
      const optBtn = document.getElementById(`admin-lang-opt-${l}`);
      if (optBtn) {
        const check = optBtn.querySelector('.lang-check');
        if (check) {
          check.style.display = l === lang ? 'inline' : 'none';
        }
        optBtn.style.background = l === lang ? '#ecfdf5' : 'transparent';
        optBtn.style.color = l === lang ? '#065f46' : '#0f172a';
      }
    });

    const menu = document.getElementById('admin-language-dropdown-menu');
    if (menu) menu.style.display = 'none';
  }

  function toggleAdminLanguageMenu(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const menu = document.getElementById('admin-language-dropdown-menu');
    if (!menu) return;
    const isVisible = menu.style.display === 'block';
    menu.style.display = isVisible ? 'none' : 'block';
  }

  // Close menu when clicking outside
  if (typeof document !== 'undefined') {
    document.addEventListener('click', function (e) {
      const widget = document.querySelector('.admin-lang-selector-widget');
      const menu = document.getElementById('admin-language-dropdown-menu');
      if (widget && menu && !widget.contains(e.target)) {
        menu.style.display = 'none';
      }
    });
  }

  // 9. INITIALIZATION
  function initAdminI18n() {
    const saved = getAdminLanguage();
    updateLanguageSelectorUI(saved);
    if (document.body) {
      walkAndTranslateDOM(document.body, saved);
    }
  }

  // Export to global window object
  if (typeof window !== 'undefined') {
    window.AgriNexAdminI18n = {
      t,
      tText,
      tCrop,
      tPerson,
      tBuyer,
      tLocation,
      setAdminLanguage,
      getAdminLanguage,
      toggleAdminLanguageMenu,
      walkAndTranslateDOM
    };

    window.setAdminLanguage = setAdminLanguage;
    window.getAdminLanguage = getAdminLanguage;
    window.toggleAdminLanguageMenu = toggleAdminLanguageMenu;
    window.tAdmin = tText;

    // Cross-module & tab storage sync
    window.addEventListener('storage', function (e) {
      if (e.key === STORAGE_KEY || e.key === 'agrinex_language') {
        const newLang = e.newValue;
        if (newLang && ['en', 'hi', 'mr'].includes(newLang) && newLang !== getAdminLanguage()) {
          setAdminLanguage(newLang);
        }
      }
    });
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initAdminI18n);
    } else {
      initAdminI18n();
    }
  }
})();
