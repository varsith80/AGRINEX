/**
 * AgriNex - Wholesale Buyer Portal Multilingual Translation Engine (i18n)
 * Supported Languages:
 *  - en: English (Default)
 *  - hi: हिन्दी (Hindi)
 *  - mr: मराठी (Marathi)
 * Translates all UI text, person names, crop names, mandis, and agricultural trading terms.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'agrinex_buyer_language';

  // 1. PERSON / FARMER / DRIVER / BUYER TRANSLATIONS
  const PERSON_MAP = {
    'Karthik Sundaram': { hi: 'कार्तिक सुंदरम', mr: 'कार्तिक सुंदरम' },
    'Patil Rameshwar': { hi: 'पाटिल रामेश्वर', mr: 'पाटील रामेश्वर' },
    'Rameshwar Patil': { hi: 'पाटिल रामेश्वर', mr: 'पाटील रामेश्वर' },
    'Rameshwar Patil (Farmer)': { hi: 'रामेश्वर पाटिल (किसान)', mr: 'रामेश्वर पाटील (शेतकरी)' },
    'Sanjay Deshmukh': { hi: 'संजय देशमुख', mr: 'संजय देशमुख' },
    'Rajesh Shinde': { hi: 'राजेश शिंदे', mr: 'राजेश शिंदे' },
    'Anandrao Jadhav': { hi: 'आनंदराव जाधव', mr: 'आनंदराव जाधव' },
    'Santosh Jagtap': { hi: 'संतोष जगताप', mr: 'संतोष जगताप' },
    'Vikas More': { hi: 'विकास मोरे', mr: 'विकास मोरे' },
    'Balasaheb Vikhe': { hi: 'बालासाहेब विखे', mr: 'बाळासाहेब विखे' },
    'Ganesh Thorat': { hi: 'गणेश थोरात', mr: 'गणेश थोरात' },
    'Dnyaneshwar Bodke': { hi: 'ज्ञानेश्वर बोडके', mr: 'ज्ञानेश्वर बोडके' },
    'Sanjay Patil': { hi: 'संजय पाटिल', mr: 'संजय पाटील' },
    'Ramesh Shinde': { hi: 'रमेश शिंदे', mr: 'रमेश शिंदे' },
    'Sunil Pawar': { hi: 'सुनील पवार', mr: 'सुनील पवार' },
    'Mahesh Kulkarni': { hi: 'महेश कुलकर्णी', mr: 'महेश कुलकर्णी' },
    'Pravin Chavan': { hi: 'प्रवीण चव्हाण', mr: 'प्रवीण चव्हाण' },
    'Nitin Ghadge': { hi: 'नितिन घाडगे', mr: 'नितीन घाडगे' },
    'Babasaheb Kale': { hi: 'बाबासाहेब काले', mr: 'बाबासाहेब काळे' }
  };

  // 2. CROP & COMMODITY TRANSLATIONS (All 28 Maharashtra Commodities + Variations)
  const CROP_MAP = {
    // Onion
    'Red Onion (Nashik Garwa Quality)': { hi: 'लाल प्याज (नासिक गरवा)', mr: 'लाल कांदा (नाशिक गरवा)' },
    'Red Onion (Lasalgaon Garwa)': { hi: 'लाल प्याज (लासलगांव गरवा)', mr: 'लाल कांदा (लासलगाव गरवा)' },
    'Nashik Garwa Red Onion Lot': { hi: 'नासिक गरवा लाल प्याज लॉट', mr: 'नाशिक गरवा लाल कांदा लॉट' },
    'Red Onion (Nashik Garwa Grade A)': { hi: 'लाल प्याज (नासिक गरवा ग्रेड ए)', mr: 'लाल कांदा (नाशिक गरवा ग्रेड अ)' },
    'Red Onion': { hi: 'लाल प्याज', mr: 'लाल कांदा' },
    'Garwa Red Onion': { hi: 'गरवा लाल प्याज', mr: 'गरवा लाल कांदा' },
    'Onion': { hi: 'प्याज', mr: 'कांदा' },

    // Tomato
    'Hybrid Tomato (Narayangaon / Junnar)': { hi: 'हाइब्रिड टमाटर (नारायणगांव / जुन्नर)', mr: 'संकरित टोमॅटो (नारायणगाव / जुन्नर)' },
    'Tomato (Shivam / Abhinav Hybrid)': { hi: 'टमाटर (शिवम / अभिनव हाइब्रिड)', mr: 'टोमॅटो (शिवम / अभिनव संकरित)' },
    'Narayangaon Tomatoes (Perishable)': { hi: 'नारायणगांव टमाटर (नाशवान)', mr: 'नारायणगाव टोमॅटो (नाशवंत)' },
    'Tomato (Pune Junnar / Narayangaon Hybrid)': { hi: 'टमाटर (पुणे जुन्नर / नारायणगांव हाइब्रिड)', mr: 'टोमॅटो (पुणे जुन्नर / नारायणगाव संकरित)' },
    'Hybrid Tomato, Cabbage': { hi: 'हाइब्रिड टमाटर, पत्तागोभी', mr: 'संकरित टोमॅटो, कोबी' },
    'Hybrid Tomato': { hi: 'हाइब्रिड टमाटर', mr: 'संकरित टोमॅटो' },
    'Tomato': { hi: 'टमाटर', mr: 'टोमॅटो' },
    'Tomatoes': { hi: 'टमाटर', mr: 'टोमॅटो' },

    // Banana
    'Grand Naine Banana (Jalgaon G9)': { hi: 'ग्रैंड नैन केला (जलगांव जी9)', mr: 'ग्रँड नैन केळी (जळगाव जी९)' },
    'Grand Naine Banana (GI Khandesh Export)': { hi: 'ग्रैंड नैन केला (खानदेश निर्यात)', mr: 'ग्रँड नैन केळी (खानदेश निर्यात)' },
    'Grand Naine Banana (Jalgaon GI Khandesh)': { hi: 'ग्रैंड नैन केला (जलगांव खानदेश)', mr: 'ग्रँड नैन केळी (जळगाव खानदेश)' },
    'Grand Naine Banana': { hi: 'ग्रैंड नैन केला', mr: 'ग्रँड नैन केळी' },
    'Banana': { hi: 'केला', mr: 'केळी' },

    // Soybean
    'Yellow Soybean (Latur JS 335)': { hi: 'पीला सोयाबीन (लातूर जेएस 335)', mr: 'पिवळी सोयाबीन (लातूर जेएस ३३५)' },
    'Yellow Soybean (JS 335 / High Protein)': { hi: 'पीला सोयाबीन (जेएस 335)', mr: 'पिवळी सोयाबीन (जेएस ३३५)' },
    'Yellow Soybean (JS 335 / Latur Mega APMC)': { hi: 'पीला सोयाबीन (लातूर मुख्य मंडी)', mr: 'पिवळी सोयाबीन (लातूर मुख्य बाजार समिती)' },
    'Soybean (JS 335 / Latur)': { hi: 'सोयाबीन (जेएस 335 / लातूर)', mr: 'सोयाबीन (जेएस ३३५ / लातूर)' },
    'Yellow Soybean': { hi: 'पीला सोयाबीन', mr: 'पिवळी सोयाबीन' },
    'Soybean, Pulses, Jowar': { hi: 'सोयाबीन, दालें, ज्वार', mr: 'सोयाबीन, कडधान्ये, ज्वारी' },
    'Soybean': { hi: 'सोयाबीन', mr: 'सोयाबीन' },

    // Orange / Santra
    'Nagpur Orange (Santra GI)': { hi: 'नागपुर संतरा (जीआई)', mr: 'नागपूर संत्री (GI)' },
    'Nagpur Orange / Santra (GI Vidarbha Quality)': { hi: 'नागपुर संतरा (विदर्भ गुणवत्ता)', mr: 'नागपूर संत्री (विदर्भ प्रत)' },
    'Nagpur Santra (GI Grade A)': { hi: 'नागपुर संतरा (ग्रेड ए)', mr: 'नागपूर संत्री (ग्रेड अ)' },
    'Nagpur Orange, Raw Cotton': { hi: 'नागपुर संतरा, कच्चा कपास', mr: 'नागपूर संत्री, कच्चा कापूस' },
    'Nagpur Orange': { hi: 'नागपुर संतरा', mr: 'नागपूर संत्री' },
    'Orange': { hi: 'संतरा', mr: 'संत्री' },
    'Santra': { hi: 'संतरा', mr: 'संत्री' },

    // Turmeric
    'Sangli Rajapuri Turmeric Finger (High Curcumin)': { hi: 'सांगली राजापुरी हल्दी (उच्च करक्यूमिन)', mr: 'सांगली राजापुरी हळद (उच्च करक्युमिन)' },
    'Sangli Rajapuri Turmeric Finger': { hi: 'सांगली राजापुरी हल्दी', mr: 'सांगली राजापुरी हळद' },
    'Sangli Rajapuri Turmeric': { hi: 'सांगली राजापुरी हल्दी', mr: 'सांगली राजापुरी हळद' },
    'Rajapuri Turmeric': { hi: 'राजापुरी हल्दी', mr: 'राजापुरी हळद' },
    'Salem Pure Turmeric Fingers': { hi: 'सालेम शुद्ध हल्दी', mr: 'सालेम शुद्ध हळद' },
    'Turmeric': { hi: 'हल्दी', mr: 'हळद' },

    // Pomegranate
    'Bhagwa Pomegranate (Solapur GI)': { hi: 'भगवा अनार (सोलापुर जीआई)', mr: 'भगवा डाळिंब (सोलापूर GI)' },
    'Bhagwa Pomegranate (Solapur Export Grade)': { hi: 'भगवा अनार (सोलापुर निर्यात स्तर)', mr: 'भगवा डाळिंब (सोलापूर निर्यात प्रत)' },
    'Bhagwa Pomegranate (Export Caliber)': { hi: 'भगवा अनार (निर्यात ग्रेड)', mr: 'भगवा डाळिंब (निर्यात प्रत)' },
    'Bhagwa Pomegranate': { hi: 'भगवा अनार', mr: 'भगवा डाळिंब' },
    'Pomegranate': { hi: 'अनार', mr: 'डाळिंब' },

    // Cotton
    'Vidarbha Raw Cotton (Long Staple)': { hi: 'विदर्भ कच्चा कपास (लंबा स्टेपल)', mr: 'विदर्भ कच्चा कापूस (लांब धागा)' },
    'Raw Cotton (Vidarbha / Khandesh Long Staple)': { hi: 'कपास (विदर्भ / खानदेश लंबा स्टेपल)', mr: 'कापूस (विदर्भ / खानदेश लांब धागा)' },
    'Vidarbha Raw Cotton': { hi: 'विदर्भ कच्चा कपास', mr: 'विदर्भ कच्चा कापूस' },
    'Raw Cotton': { hi: 'कच्चा कपास', mr: 'कच्चा कापूस' },
    'BT Cotton (Medium Staple)': { hi: 'कपास (मध्यम स्टेपल)', mr: 'कापूस (मध्यम धागा)' },
    'Cotton': { hi: 'कपास', mr: 'कापूस' },

    // Maize
    'Yellow Maize (Malegaon Hybrid)': { hi: 'पीला मक्का (मालेगांव हाइब्रिड)', mr: 'पिवळी मका (मालेगाव संकरित)' },
    'Yellow Maize': { hi: 'पीला मक्का', mr: 'पिवळी मका' },
    'Maize': { hi: 'मक्का', mr: 'मका' },

    // Safflower
    'Safflower Seeds (Kardi High-Oil)': { hi: 'कुसुम बीज / करडी (उच्च तेल)', mr: 'करडई बियाणे (जास्त तेल)' },
    'Safflower Seeds': { hi: 'कुसुम / करडी बीज', mr: 'करडई बियाणे' },
    'Safflower': { hi: 'कुसुम / करडी', mr: 'करडई' },

    // Sesame
    'White Sesame (Til Export Grade)': { hi: 'सफेद तिल (निर्यात स्तर)', mr: 'पांढरे तीळ (निर्यात प्रत)' },
    'White Sesame': { hi: 'सफेद तिल', mr: 'पांढरे तीळ' },
    'Sesame': { hi: 'तिल', mr: 'तीळ' },

    // Chilli
    'Dry Red Chilli (Nandurbar Teja)': { hi: 'सूखी लाल मिर्च (नंदुरबार तेजा)', mr: 'सुकी लाल मिरची (नंदुरबार तेजा)' },
    'Dry Red Chilli': { hi: 'सूखी लाल मिर्च', mr: 'सुकी लाल मिरची' },
    'Fresh Green Chilli (G4 High-Pungency)': { hi: 'ताजा हरी मिर्च (जी4 तीखी)', mr: 'ताजी हिरवी मिरची (G4 तिखट)' },
    'Fresh Green Chilli': { hi: 'ताजा हरी मिर्च', mr: 'ताजी हिरवी मिरची' },
    'Green Chilli (Kolhapur Jwala / G4 Spicy)': { hi: 'हरी मिर्च (कोल्हापुर ज्वाला / जी4)', mr: 'हिरवी मिरची (कोल्हापूर ज्वाला / जी४)' },
    'Kolhapur Lavangi Hot Chilli': { hi: 'कोल्हापुर लवंगी तीखी मिर्च', mr: 'कोल्हापूर लवंगी तिखट मिरची' },
    'Green Chilli': { hi: 'हरी मिर्च', mr: 'हिरवी मिरची' },
    'Chilli': { hi: 'मिर्च', mr: 'मिरची' },

    // Guava
    'Sweet Guava (Rahata L-49)': { hi: 'मीठा अमरूद (राहाता एल-49)', mr: 'गोड पेरू (राहाता L-४९)' },
    'Sweet Guava': { hi: 'मीठा अमरूद', mr: 'गोड पेरू' },
    'Guava': { hi: 'अमरूद', mr: 'पेरू' },

    // Wheat
    'Lokwan Golden Wheat (Sharbati)': { hi: 'लोकवान शरबती गेहूं', mr: 'लोकवान शरबती गहू' },
    'Lokwan Golden Wheat': { hi: 'लोकवान सुनहरा गेहूं', mr: 'लोकवान सोनेरी गहू' },
    'Sharbati Wheat': { hi: 'शरबती गेहूं', mr: 'शरबती गहू' },
    'Wheat': { hi: 'गेहूं', mr: 'गहू' },

    // Rice
    'Wada Kolam Rice (Palghar GI)': { hi: 'वाडा कोलम चावल (जीआई)', mr: 'वाडा कोलम तांदूळ (GI)' },
    'Wada Kolam Rice': { hi: 'वाडा कोलम चावल', mr: 'वाडा कोलम तांदूळ' },
    'Rice': { hi: 'चावल', mr: 'तांदूळ' },

    // Jowar / Sorghum
    'Maldandi Jowar (Solapur Sorghum)': { hi: 'मालदांडी ज्वार (सोलापुर शाळू)', mr: 'मालदांडी ज्वारी (सोलापूर शाळू)' },
    'Maldandi Jowar / Sorghum (Solapur Shalu)': { hi: 'मालदांडी ज्वार (सोलापुर शालू)', mr: 'मालदांडी ज्वारी (सोलापूर शाळू)' },
    'Maldandi Jowar': { hi: 'मालदांडी ज्वार', mr: 'मालदांडी ज्वारी' },
    'Jowar': { hi: 'ज्वार', mr: 'ज्वारी' },

    // Pearl Millet / Bajra
    'Pearl Millet (Dhule Hybrid Bajra)': { hi: 'बाजरा (धुले हाइब्रिड)', mr: 'बाजरी (धुळे संकरित)' },
    'Pearl Millet': { hi: 'बाजरा', mr: 'बाजरी' },
    'Bajra': { hi: 'बाजरा', mr: 'बाजरी' },

    // Pulses / Dals
    'Latur Red Tur (Arhar Dal)': { hi: 'लातूर लाल अरहर / तूर दाल', mr: 'लातूर लाल तूर डाळ' },
    'Latur Red Tur': { hi: 'लातूर लाल तूर', mr: 'लातूर लाल तूर' },
    'Tur Dal': { hi: 'तूर / अरहर दाल', mr: 'तूर डाळ' },
    'Arhar Dal': { hi: 'अरहर दाल', mr: 'तूर डाळ' },
    'Desi Chana (Akola Bengal Gram)': { hi: 'देसी चना (अकोला चना)', mr: 'देशी हरभरा / चणा (अकोला)' },
    'Desi Chana': { hi: 'देसी चना', mr: 'देशी हरभरा' },
    'Chana': { hi: 'चना', mr: 'हरभरा / चणा' },
    'Green Mung Bean (Jalgaon Shiny)': { hi: 'हरा मूंग (जलगांव चमकीला)', mr: 'हिरवा मूग (जळगाव चमकदार)' },
    'Green Mung Bean': { hi: 'हरा मूंग', mr: 'हिरवा मूग' },
    'Mung Bean': { hi: 'मूंग', mr: 'मूग' },
    'Black Urad Dal (Nanded Black Gram)': { hi: 'काला उड़द दाल (नांदेड)', mr: 'काळी उडीद डाळ (नांदेड)' },
    'Black Urad Dal': { hi: 'काला उड़द दाल', mr: 'काळी उडीद डाळ' },
    'Urad Dal': { hi: 'उड़द दाल', mr: 'उडीद डाळ' },

    // Groundnut / Peanut
    'Kolhapur Bold Groundnut': { hi: 'कोल्हापुर बोल्ड मूंगफली', mr: 'कोल्हापूर जाड भुईमूग' },
    'Bold Groundnut': { hi: 'बोल्ड मूंगफली', mr: 'जाड भुईमूग' },
    'Groundnut': { hi: 'मूंगफली', mr: 'भुईमूग' },

    // Sunflower
    'Beed Sunflower Seeds': { hi: 'बीड सूरजमुखी बीज', mr: 'बीड सूर्यफूल बियाणे' },
    'Sunflower Seeds': { hi: 'सूरजमुखी बीज', mr: 'सूर्यफूल बियाणे' },
    'Sunflower': { hi: 'सूरजमुखी', mr: 'सूर्यफूल' },

    // Sugarcane
    'Kolhapur Co 86032 Sugarcane': { hi: 'कोल्हापुर को-86032 गन्ना', mr: 'कोल्हापूर को-८६०३२ ऊस' },
    'Sugarcane': { hi: 'गन्ना', mr: 'ऊस' },

    // Grapes
    'Nashik Thompson Seedless Grapes': { hi: 'नासिक थॉमसन बीजहीन अंगूर', mr: 'नाशिक थॉम्पसन बेदाणा द्राक्षे' },
    'Thompson Seedless Grapes (Nashik / Sangli)': { hi: 'थॉम्पसन बीजहीन अंगूर (नासिक / सांगली)', mr: 'थॉम्पसन बेदाणा द्राक्षे (नाशिक / सांगली)' },
    'Thompson Seedless Grapes': { hi: 'थॉमसन अंगूर', mr: 'थॉम्पसन द्राक्षे' },
    'Red Onion, Grapes': { hi: 'लाल प्याज, अंगूर', mr: 'लाल कांदा, द्राक्षे' },
    'Grapes': { hi: 'अंगूर', mr: 'द्राक्षे' },

    // Sweet Lime / Mosambi
    'Jalna Sweet Lime (Mosambi)': { hi: 'जालना मीठा मौसंबी', mr: 'जालना गोड मोसंबी' },
    'Jalna Sweet Lime': { hi: 'जालना मौसंबी', mr: 'जालना मोसंबी' },
    'Sweet Lime': { hi: 'मौसंबी', mr: 'मोसंबी' },
    'Mosambi': { hi: 'मौसंबी', mr: 'मोसंबी' },

    // Custard Apple
    'Beed Balanagar Custard Apple': { hi: 'बीड बालनगर शरीफा / सीताफल', mr: 'बीड बाळानगर सीताफळ' },
    'Balanagar Custard Apple': { hi: 'बालनगर शरीफा', mr: 'बाळानगर सीताफळ' },
    'Custard Apple': { hi: 'शरीफा / सीताफल', mr: 'सीताफळ' },
    'Sitaphal': { hi: 'सीताफल', mr: 'सीताफळ' },

    // Mango
    'Ratnagiri Alphonso (Hapus GI)': { hi: 'रत्नागिरी हापुस आम (जीआई)', mr: 'रत्नागिरी हापूस आंबा (GI)' },
    'Alphonso Mango (Ratnagiri / Devgad Hapus)': { hi: 'हापुस आम (रत्नागिरी / देवगढ़)', mr: 'हापूस आंबा (रत्नागिरी / देवगड)' },
    'Ratnagiri Alphonso': { hi: 'रत्नागिरी हापुस आम', mr: 'रत्नागिरी हापूस आंबा' },
    'Alphonso Mango': { hi: 'हापुस आम', mr: 'हापूस आंबा' },
    'Hapus': { hi: 'हापुस आम', mr: 'हापूस आंबा' },
    'Mango': { hi: 'आम', mr: 'आंबा' },

    // Potato
    'Grade A Potato (Manchar Jyoti)': { hi: 'ग्रेड ए आलू (मंचर ज्योति)', mr: 'ग्रेड अ बटाटा (मंचर ज्योती)' },
    'Grade A Potato': { hi: 'ग्रेड ए आलू', mr: 'ग्रेड अ बटाटा' },
    'Potato': { hi: 'आलू', mr: 'बटाटा' },

    // Brinjal / Eggplant
    'Purple Brinjal (Baingan / Eggplant)': { hi: 'बैंगन (गोल/लंबा)', mr: 'जांभळे वांगे (वांगी)' },
    'Purple Brinjal': { hi: 'बैंगन', mr: 'जांभळे वांगे' },
    'Brinjal': { hi: 'बैंगन', mr: 'वांगे' },
    'Eggplant': { hi: 'बैंगन', mr: 'वांगे' },

    // Vegetables & Others
    'Fresh Green Ginger': { hi: 'ताजा अदरक', mr: 'ताजे आले' },
    'Ginger': { hi: 'अदरक', mr: 'आले' },
    'Cabbage': { hi: 'पत्तागोभी', mr: 'कोबी' },
    'Cauliflower': { hi: 'फूलगोभी', mr: 'फ्लॉवर' },
    'Garlic': { hi: 'लहसुन', mr: 'लसूण' }
  };

  // 3. LOCATION & MANDI TRANSLATIONS
  const LOCATION_MAP = {
    // Exact hubs with APMC suffix
    'Lasalgaon APMC (Nashik)': { hi: 'लासलगांव मंडी (नासिक)', mr: 'लासलगाव बाजार समिती (नाशिक)' },
    'Narayangaon APMC (Pune)': { hi: 'नारायणगांव मंडी (पुणे)', mr: 'नारायणगाव बाजार समिती (पुणे)' },
    'Manchar APMC (Pune)': { hi: 'मंचर मंडी (पुणे)', mr: 'मंचर बाजार समिती (पुणे)' },
    'Rahuri APMC (Ahmednagar)': { hi: 'राहुरी मंडी (अहमदनगर)', mr: 'राहुरी बाजार समिती (अहमदनगर)' },
    'Raver & Jalgaon APMC': { hi: 'रावेर व जलगांव मंडी', mr: 'रावेर व जळगाव बाजार समिती' },
    'Latur APMC Mega Silos': { hi: 'लातूर मुख्य सायलो मंडी', mr: 'लातूर मुख्य सायलो बाजार समिती' },
    'Katol & Amravati APMC': { hi: 'काटोल व अमरावती मंडी', mr: 'काटोल व अमरावती बाजार समिती' },
    'Sangli Spices APMC': { hi: 'सांगली मसाला मंडी', mr: 'सांगली मसाला बाजार समिती' },
    'Solapur APMC Market Yard': { hi: 'सोलापुर मंडी यार्ड', mr: 'सोलापूर बाजार समिती' },
    'Yavatmal & Amravati APMC': { hi: 'यवतमाळ व अमरावती मंडी', mr: 'यवतमाळ व अमरावती बाजार समिती' },
    'Malegaon APMC Yard': { hi: 'मालेगांव मंडी यार्ड', mr: 'मालेगाव बाजार समिती' },
    'Dhule APMC Yard': { hi: 'धुले मंडी यार्ड', mr: 'धुळे बाजार समिती' },
    'Nandurbar Chilli Yard': { hi: 'नंदुरबार मिर्च यार्ड', mr: 'नंदुरबार मिरची बाजार समिती' },
    'Rahata APMC Market': { hi: 'राहाता मंडी बाजार', mr: 'राहाता बाजार समिती' },
    'Akola & Washim APMC': { hi: 'अकोला व वाशिम मंडी', mr: 'अकोला व वाशीम बाजार समिती' },
    'Palghar & Wada APMC': { hi: 'पालघर व वाडा मंडी', mr: 'पालघर व वाडा बाजार समिती' },
    'Solapur & Barshi APMC': { hi: 'सोलापुर व बार्शी मंडी', mr: 'सोलापूर व बार्शी बाजार समिती' },
    'Dhule & Malegaon APMC': { hi: 'धुले व मालेगांव मंडी', mr: 'धुळे व मालेगाव बाजार समिती' },
    'Latur Pulses APMC': { hi: 'लातूर दलहन मंडी', mr: 'लातूर कडधान्य बाजार समिती' },
    'Akola & Khamgaon APMC': { hi: 'अकोला व खामगांव मंडी', mr: 'अकोला व खामगाव बाजार समिती' },
    'Jalgaon & Jalna APMC': { hi: 'जलगांव व जालना मंडी', mr: 'जळगाव व जालना बाजार समिती' },
    'Nanded & Latur APMC': { hi: 'नांदेड व लातूर मंडी', mr: 'नांदेड व लातूर बाजार समिती' },
    'Kolhapur & Sangli APMC': { hi: 'कोल्हापुर व सांगली मंडी', mr: 'कोल्हापूर व सांगली बाजार समिती' },
    'Beed & Dharashiv APMC': { hi: 'बीड व धाराशिव मंडी', mr: 'बीड व धाराशिव बाजार समिती' },
    'Kolhapur & Karad APMC': { hi: 'कोल्हापुर व कराड मंडी', mr: 'कोल्हापूर व कराड बाजार समिती' },
    'Pimpalgaon & Nashik APMC': { hi: 'पिंपलगांव व नासिक मंडी', mr: 'पिंपळगाव व नाशिक बाजार समिती' },
    'Jalna & Aurangabad APMC': { hi: 'जालना व संभाजीनगर मंडी', mr: 'जालना व संभाजीनगर बाजार समिती' },
    'Ratnagiri & Devgad APMC': { hi: 'रत्नागिरी व देवगढ़ मंडी', mr: 'रत्नागिरी व देवगड बाजार समिती' },
    'Nandurbar APMC': { hi: 'नंदुरबार मंडी', mr: 'नंदुरबार बाजार समिती' },

    // Short/Clean APMC Hub Names
    'Lasalgaon APMC': { hi: 'लासलगांव मंडी', mr: 'लासलगाव बाजार समिती' },
    'Narayangaon APMC': { hi: 'नारायणगांव मंडी', mr: 'नारायणगाव बाजार समिती' },
    'Manchar APMC': { hi: 'मंचर मंडी', mr: 'मंचर बाजार समिती' },
    'Rahuri APMC': { hi: 'राहुरी मंडी', mr: 'राहुरी बाजार समिती' },
    'Pimpalgaon APMC': { hi: 'पिंपलगांव मंडी', mr: 'पिंपळगाव बाजार समिती' },
    'Karad APMC': { hi: 'कराड मंडी', mr: 'कराड बाजार समिती' },
    'Sangamner APMC': { hi: 'संगमनेर मंडी', mr: 'संगमनेर बाजार समिती' },
    'Raver APMC Yard': { hi: 'रावेर मंडी यार्ड', mr: 'रावेर बाजार समिती' },
    'Ardhapur APMC': { hi: 'अर्धापूर मंडी', mr: 'अर्धापूर बाजार समिती' },
    'Pandharpur APMC': { hi: 'पंढरपूर मंडी', mr: 'पंढरपूर बाजार समिती' },
    'Indapur APMC': { hi: 'इंदापूर मंडी', mr: 'इंदापूर बाजार समिती' },
    'Dhule Market Yard': { hi: 'धुले मंडी यार्ड', mr: 'धुळे बाजार समिती' },

    // Additional Yards & Locations
    'Lasalgaon APMC Yard, Nashik': { hi: 'लासलगांव मंडी, नासिक', mr: 'लासलगाव बाजार समिती, नाशिक' },
    'Narayangaon Mandi Yard, Junnar, Pune': { hi: 'नारायणगांव मंडी, जुन्नर, पुणे', mr: 'नारायणगाव बाजार समिती, जुन्नर, पुणे' },
    'Manchar / Narayangaon Yard, Pune, MH': { hi: 'मंचर / नारायणगांव यार्ड, पुणे', mr: 'मंचर / नारायणगाव बाजार, पुणे' },
    'Raver APMC Hub, Jalgaon': { hi: 'रावेर मंडी, जलगांव', mr: 'रावेर बाजार समिती, जळगाव' },
    'Latur Mega APMC Yard, Marathwada': { hi: 'लातूर मुख्य मंडी, मराठवाड़ा', mr: 'लातूर मुख्य बाजार समिती, मराठवाडा' },
    'Sangli Turmeric Yard, MH': { hi: 'सांगली हल्दी मंडी, महाराष्ट्र', mr: 'सांगली हळद बाजार, महाराष्ट्र' },
    'Pimpalgaon Yard, Nashik': { hi: 'पिंपलगांव मंडी, नासिक', mr: 'पिंपळगाव बाजार समिती, नाशिक' },
    'Kolhapur Jaggery & Spice Yard': { hi: 'कोल्हापुर गुड़ व मसाला मंडी', mr: 'कोल्हापूर गूळ व मसाला बाजार' },
    'Pandharpur APMC Hub, Solapur': { hi: 'पंढरपुर मंडी, सोलापुर', mr: 'पंढरपूर बाजार समिती, सोलापूर' },
    'Solapur APMC Yard': { hi: 'सोलापुर मंडी यार्ड', mr: 'सोलापूर बाजार समिती' },
    'Nagpur Orange APMC Yard': { hi: 'नागपुर संतरा मंडी यार्ड', mr: 'नागपूर संत्रा बाजार समिती' },
    'Katol Mandi Yard, Vidarbha': { hi: 'काटोल मंडी, विदर्भ', mr: 'काटोल बाजार समिती, विदर्भ' },
    'Vashi APMC Central Terminal, Navi Mumbai, Maharashtra': { hi: 'वाशी मंडी सेंट्रल टर्मिनल, नवी मुंबई, महाराष्ट्र', mr: 'वाशी बाजार समिती मध्यवर्ती टर्मिनल, नवी मुंबई, महाराष्ट्र' },
    'Vashi APMC Central Terminal, Navi Mumbai': { hi: 'वाशी मंडी सेंट्रल टर्मिनल, नवी मुंबई', mr: 'वाशी बाजार समिती मध्यवर्ती टर्मिनल, नवी मुंबई' },
    'Vashi Terminal, Navi Mumbai (MH)': { hi: 'वाशी टर्मिनल, नवी मुंबई (महा.)', mr: 'वाशी टर्मिनल, नवी मुंबई (महा.)' },
    'BigBasket Distribution Terminal, Navi Mumbai, MH': { hi: 'बिगबास्केट वितरण टर्मिनल, नवी मुंबई, महा.', mr: 'बिगबास्केट वितरण केंद्र, नवी मुंबई, महाराष्ट्र' },
    'Reliance Fresh Central Distribution Hub, Thane': { hi: 'रिलायंस फ्रेश सेंट्रल हब, ठाणे', mr: 'रिलायन्स फ्रेश वितरण केंद्र, ठाणे' },
    'Nature Basket Fulfillment Center, Kurla': { hi: 'नेचर्स बास्केट पूर्ति केंद्र, कुर्ला', mr: 'नेचर्स बास्केट वितरण केंद्र, कुर्ला' },
    'Zomato Hyperpure Aggregation Hub, Bhiwandi': { hi: 'ज़ोमैटो हाइपरप्योर हब, भिवंडी', mr: 'झोमॅटो हायपरप्युअर संकलन केंद्र, भिवंडी' },

    // Maharashtra Districts & Cities
    'Pune': { hi: 'पुणे', mr: 'पुणे' },
    'Nashik': { hi: 'नासिक', mr: 'नाशिक' },
    'Jalgaon': { hi: 'जलगांव', mr: 'जळगाव' },
    'Ahmednagar': { hi: 'अहमदनगर', mr: 'अहमदनगर' },
    'Solapur': { hi: 'सोलापुर', mr: 'सोलापूर' },
    'Kolhapur': { hi: 'कोल्हापुर', mr: 'कोल्हापूर' },
    'Sangli': { hi: 'सांगली', mr: 'सांगली' },
    'Latur': { hi: 'लातूर', mr: 'लातूर' },
    'Nagpur': { hi: 'नागपुर', mr: 'नागपूर' },
    'Dhule': { hi: 'धुले', mr: 'धुळे' },
    'Amravati': { hi: 'अमरावती', mr: 'अमरावती' },
    'Satara': { hi: 'सातारा', mr: 'सातारा' },
    'Akola': { hi: 'अकोला', mr: 'अकोला' },
    'Washim': { hi: 'वाशिम', mr: 'वाशीम' },
    'Nanded': { hi: 'नांदेड', mr: 'नांदेड' },
    'Nandurbar': { hi: 'नंदुरबार', mr: 'नंदुरबार' },
    'Beed': { hi: 'बीड', mr: 'बीड' },
    'Dharashiv': { hi: 'धाराशिव', mr: 'धाराशिव' },
    'Jalna': { hi: 'जालना', mr: 'जालना' },
    'Palghar': { hi: 'पालघर', mr: 'पालघर' },
    'Ratnagiri': { hi: 'रत्नागिरी', mr: 'रत्नागिरी' },
    'Sindhudurg': { hi: 'सिंधुदुर्ग', mr: 'सिंधुदुर्ग' },
    'Raigad': { hi: 'रायगढ़', mr: 'रायगड' },
    'Wardha': { hi: 'वर्धा', mr: 'वर्धा' },
    'Hingoli': { hi: 'हिंगोली', mr: 'हिंगोली' },
    'Bhandara': { hi: 'भंडारा', mr: 'भंडारा' },
    'Gondia': { hi: 'गोंदिया', mr: 'गोंदिया' },
    'Chandrapur': { hi: 'चंद्रपुर', mr: 'चंद्रपूर' },
    'Gadchiroli': { hi: 'गढ़चिरौली', mr: 'गडचिरोली' },
    'Yavatmal': { hi: 'यवतमाल', mr: 'यवतमाळ' },
    'Buldhana': { hi: 'बुलढाणा', mr: 'बुलढाणा' },
    'Parbhani': { hi: 'परभणी', mr: 'परभणी' },
    'Chhatrapati Sambhajinagar': { hi: 'छत्रपति संभाजीनगर', mr: 'छत्रपती संभाजीनगर' },
    'Aurangabad': { hi: 'छत्रपति संभाजीनगर', mr: 'छत्रपती संभाजीनगर' },

    // Belts & Corridors
    'Nashik Onion & Grape Belt': { hi: 'नासिक प्याज व अंगूर क्षेत्र', mr: 'नाशिक कांदा व द्राक्ष पट्टा' },
    'Pune Junnar Tomato Corridor': { hi: 'पुणे जुन्नर टमाटर गलियारा', mr: 'पुणे जुन्नर टोमॅटो पट्टा' },
    'Khandesh Banana Belt': { hi: 'खानदेश केला क्षेत्र', mr: 'खानदेश केळी पट्टा' },
    'Marathwada Oilseed Cluster': { hi: 'मराठवाड़ा तिलहन संकुल', mr: 'मराठवाडा गळित धान्य संकुल' },
    'Vidarbha Citrus & Cotton': { hi: 'विदर्भ संतरा व कपास क्षेत्र', mr: 'विदर्भ संत्री व कापूस पट्टा' },
    'Lasalgaon & Pimpalgaon': { hi: 'लासलगांव और पिंपलगांव', mr: 'लासलगाव आणि पिंपळगाव' },
    'Narayangaon & Manchar': { hi: 'नारायणगांव और मंचर', mr: 'नारायणगाव आणि मंचर' },
    'Latur Mega Silos': { hi: 'लातूर मुख्य सायलो', mr: 'लातूर मुख्य सायलो संकुल' },
    'Katol, Amravati, Kalamna': { hi: 'काटोल, अमरावती, कलमना', mr: 'काटोल, अमरावती, कळमना' },

    // Single Towns / Mandi names
    'Lasalgaon': { hi: 'लासलगांव', mr: 'लासलगाव' },
    'Narayangaon': { hi: 'नारायणगांव', mr: 'नारायणगाव' },
    'Manchar': { hi: 'मंचर', mr: 'मंचर' },
    'Junnar': { hi: 'जुन्नर', mr: 'जुन्नर' },
    'Raver': { hi: 'रावेर', mr: 'रावेर' },
    'Katol': { hi: 'काटोल', mr: 'काटोल' },
    'Rahuri': { hi: 'राहुरी', mr: 'राहुरी' },
    'Rahata': { hi: 'राहाता', mr: 'राहाता' },
    'Pimpalgaon': { hi: 'पिंपलगांव', mr: 'पिंपळगाव' },
    'Malegaon': { hi: 'मालेगांव', mr: 'मालेगाव' },
    'Pandharpur': { hi: 'पंढरपुर', mr: 'पंढरपूर' },
    'Barshi': { hi: 'बार्शी', mr: 'बार्शी' },
    'Sangamner': { hi: 'संगमनेर', mr: 'संगमनेर' },
    'Khamgaon': { hi: 'खामगांव', mr: 'खामगाव' },
    'Devgad': { hi: 'देवगढ़', mr: 'देवगड' },
    'Karad': { hi: 'कराड', mr: 'कराड' },
    'Wada': { hi: 'वाडा', mr: 'वाडा' },
    'Kalamna': { hi: 'कलमना', mr: 'कळमना' },
    'Bhiwapur': { hi: 'भिवापुर', mr: 'भिवापूर' }
  };

  // 4. GRADE TRANSLATIONS
  const GRADE_MAP = {
    'Grade A Export Calibrated': { hi: 'ग्रेड ए (निर्यात स्तर)', mr: 'ग्रेड अ (निर्यात प्रत)' },
    'Grade A': { hi: 'ग्रेड ए', mr: 'ग्रेड अ' },
    'Grade B': { hi: 'ग्रेड बी', mr: 'ग्रेड ब' },
    'Grade C': { hi: 'ग्रेड सी', mr: 'ग्रेड क' },
    'Standard': { hi: 'मानक गुणवत्ता', mr: 'मानक प्रत' }
  };

  // 5. MASTER UI DICTIONARIES
  const TRANSLATIONS = {
    en: {
      lang_name: 'English',
      flag: '🇬🇧',
      
      // Brand & Navigation
      buyer_portal: 'BUYER PORTAL',
      nav_marketplace: 'Marketplace Lots',
      nav_insights: 'Market Insights',
      nav_demands: 'Bulk Demands',
      nav_consignments: 'Orders & Shipments',
      nav_storage: 'Cold Storage & Silos',
      nav_calculator: 'Landed Cost Calc',
      nav_messages: 'Messages',
      nav_escrow: 'Escrow Vault',
      nav_grievances: 'Grievances / Claims',
      nav_logistics: 'Fleet Logistics',
      viewing_as: 'Viewing as:',
      persona_self: '🏢 You (BigBasket)',
      persona_other: '👥 Other Buyer (Simulate)',
      
      // Header & Profile
      person_karthik_sundaram: 'Karthik Sundaram',
      procurement_lead_company: 'Procurement Lead (BigBasket)',
      search_placeholder: 'Search crops, farmers, mandis...',
      search_produce_placeholder: 'Search crops, varieties, farmers, or keywords (e.g. Tomato, Onion, Potato, 500kg)...',
      buyer_location_text: 'Vashi Terminal, Navi Mumbai (MH)',
      enterprise_verified: 'Enterprise Verified',
      
      // Marketplace Top Metrics
      active_orders: 'ACTIVE ORDERS',
      total_volume: 'TOTAL VOLUME',
      total_procured: 'TOTAL PROCURED',
      direct_savings: 'DIRECT SAVINGS',
      saved_text: 'Saved',
      orders_sub: 'Direct Farm Shipments',
      volume_sub: 'Maharashtra Verified',
      procured_sub: 'Institutional Volume',
      savings_sub: '~14% Saved vs APMC Mandi',
      
      // Emergency Salvage Exchange
      salvage_title: 'Emergency Salvage Exchange (Breakeven Procurement)',
      salvage_badge: '⚡ Instant Escrow Match',
      salvage_desc: 'Direct sourcing stream for Food Processors, Commercial Caterers & Bio-Compost Manufacturers to purchase low shelf-life harvests immediately.',
      salvage_recovery_badge: '🛡️ Guaranteed 65%–75% Farmer Recovery',
      salvage_col_crop: 'Emergency Crop Lot',
      salvage_col_farmer: 'Farmer & Mandi',
      salvage_col_qty: 'Quantity',
      salvage_col_rate: 'Breakeven Buyout Price',
      salvage_col_target: 'Target Salvage Use',
      salvage_col_window: 'Shelf-Life Urgency',
      salvage_col_action: 'Immediate Buy Action',
      insta_buyout: '⚡ Instant Buyout',
      procured_in_transit: '✓ Procured • In Transit',
      sold_out_salvage: '🚫 Sold Out (100% Breakeven Salvaged)',
      sold_out_qty: '0 kg (Sold Out)',
      hours_left: 'Hours Left',
      
      // Category Filter Pills
      filter_all_crops: '🌾 All Crops',
      filter_vegetables: '🍅 Vegetables',
      filter_spices: '🌶️ Spices & High-Value',
      filter_grains: '🌾 Grains & Cereals',
      filter_pulses: '🌱 Pulses & Legumes',
      filter_oilseeds: '🌻 Oilseeds',
      filter_fruits: '🍌 Fruits',
      filter_cash_crops: '☁️ Cash Crops',
      filter_fpo: '📦 FPO Bulk Lots',
      
      // Section Header & View Mode
      available_lots_title: '🌾 Available Farm-Direct Lots',
      lots_available: 'Lots Available',
      showing_lots: 'Showing {0} of {1} Verified Lots',
      view_as_label: '👤 View as:',
      view_grid: '⊞ Grid',
      view_table: '☰ Table',
      sort_default: 'Recommended ⌵',
      sort_price_low: 'Price: Low to High',
      sort_price_high: 'Price: High to Low',
      sort_rating: 'Farmer Trust Rating',
      sort_savings: 'Highest Mandi Savings',
      
      // Lot Cards
      lot_badge_farmer: '🌿 Farmer',
      lot_compare: '⚖️ Compare',
      buy_now: 'Buy Now',
      procure_lot: 'Procure Lot',
      counter_bid: 'Counter Bid',
      sold_out: '🚫 Sold Out',
      sold_out_overlay: '🚫 SOLD OUT',
      sold_out_subtext: '100% Crop Procured by Buyer',
      procured_by_you: '🔒 Procured by You',
      in_transit_btn: 'In Transit ➔',
      avail_qty_label: 'Available Qty:',
      your_order_transit: '0 kg (Your Order • In Transit)',
      escrow_locked_badge: '🔒 Escrow Locked',
      your_order_badge: '🔒 Sold Out • Your Order',
      units_label: 'Units:',
      units_both: 'Both',
      units_kg: 'kg',
      units_qt: 'Qt',
      
      // AI Floating Copilot
      ai_sourcing_copilot: 'AI Sourcing Copilot',
      
      // Calculator View
      calc_header_title: 'Agricultural Landed Cost, Mandi Arbitrage & Freight Intelligence Engine',
      calc_header_subtitle: 'Grounded in Maharashtra APMC benchmarks, origin-destination logistics routes, fleet capacities, and zero-intermediary farm gate trade.',
      btn_calc_post_demand: 'Post Procurement Demand',
      btn_calc_view_lots: 'View Matching Lots',
      btn_print_sheet: 'Print Cost Sheet',
      
      // Insights View
      insights_header_title: 'Maharashtra APMC Market Insights & AI Hedging',
      insights_header_subtitle: 'Real-time APMC mandi modal rates, direct farm-gate arbitrage spreads, arrival volumes across Maharashtra agricultural belts, and AI forward price forecasting.',
      insights_enam_live: 'e-NAM Live Feed',
      insights_sync_btn: 'Sync Mandi Rates',
      insights_select_benchmark: 'Select Maharashtra Commodity Benchmark:',
      insights_select_benchmark_sub: 'Click crop to inspect APMC historical curves & AI 7-day projection',
      insights_cat_all: 'All (28)',
      insights_cat_veg: '🥬 Vegetables',
      insights_cat_fruits: '🍎 Fruits',
      insights_cat_grains: '🌾 Grains & Millets',
      insights_cat_pulses: '🫘 Pulses',
      insights_cat_spices: '🌿 Spices & Oilseeds',
      kpi_modal_label: 'Mandi Benchmark Modal',
      kpi_arbitrage_label: 'Direct Farm Arbitrage',
      kpi_arrivals_label: '24H Mandi Arrival Volume',
      kpi_sentiment_label: 'AI Procurement Sentiment',
      vs_last_week: 'vs last week',
      insights_btn_matrix: 'Compare All District Rates',
      insights_legend_modal: 'Mandi Modal (Realized)',
      insights_legend_forecast: 'AI 7-Day Forward Forecast',
      insights_legend_ceiling: 'Mandi Ceiling',
      insights_legend_floor: 'Mandi Floor',
      insights_legend_note: '⚡ Model trained on 5-year APMC arrivals, weather indices & diesel freight data',
      insights_supply_belts_title: 'Maharashtra Sourcing Belts & Inflow Pressure',
      insights_ai_strategy_title: 'AI Procurement Strategy & Direct Hedging',
      insights_live_volume: 'Live Volume',
      insights_zero_middlemen: 'Zero Middlemen',
      insights_mandis_table_title: '🏛️ Maharashtra APMC Mandis Live Auction Benchmark Table',
      insights_mandis_table_sub: 'Compare major regulated mandis (Lasalgaon, Narayangaon, Raver, Latur, Katol, Sangli, Pandharpur, Pimpalgaon, Kolhapur, Solapur) vs Direct Farm Sourcing to maximize institutional arbitrage.',
      insights_quick_districts: 'Quick Districts:',
      insights_all_apmcs: '🌾 All APMCs',
      quick_dist_nashik: '🧅 Nashik',
      quick_dist_pune: '🍅 Pune',
      quick_dist_jalgaon: '🍌 Jalgaon',
      quick_dist_nagpur: '🍊 Nagpur',
      quick_dist_latur: '🫘 Latur',
      quick_dist_sangli: '🌶️ Sangli',
      th_dist_mandi: 'District & Mandi Yard',
      th_modal_price_kg: 'Modal Price (₹/kg)',
      th_modal_price_qt: 'Modal Rate (₹/Qt)',
      th_min_max_range: 'Min – Max Range',
      th_24h_arrivals_col: '24h Arrivals',
      th_arbitrage_spread: 'Arbitrage Spread',
      ph_search_dist_mandi: 'Search district or mandi yard...',
      matrix_footer_note: '* Live e-NAM & APMC auction feeds updated every 15 mins.',
      btn_close_matrix: 'Close Matrix',
      th_commodity_hub: 'APMC Mandi & Crop',
      th_24h_arrivals: 'Arrival Volume (Qt & kg)',
      th_min_price: 'Min Price',
      th_modal_price: 'Modal Price (Live)',
      th_max_price: 'Max Price',
      th_direct_arbitrage: 'Direct Arbitrage (Spread)',
      th_action: 'Sourcing Actions',
      btn_districts: '🗺️ Districts',
      btn_chart: '📈 Chart',
      btn_direct_buy: 'Direct Buy',
      btn_show_more_crops: 'Show More Crops (+5)',
      btn_show_less: '▲ Show Less (-5)',
      showing_all_entries: '✓ Showing all {0} APMC entries',
      
      // Orders & Consignments View
      orders_header_title: 'Direct Farm Consignments & GPS Fleet Telemetry',
      orders_header_subtitle: 'Real-time transit monitoring with AIS-140 GPS beacons, calibrated temperature sensors, and dual-key escrow release triggers.',
      tab_all_orders: 'All Active Orders',
      tab_on_road: 'On The Road',
      tab_scheduled: 'Scheduled',
      tab_delivered: 'Delivered & Settled',
      tab_telemetry: 'Driver & Vehicle Telemetry',
      btn_confirm_arrival: 'Confirm Arrival & QC Pass',
      btn_view_invoice: 'View Digital PO / Invoice',
      btn_raise_claim: 'Raise Quality Inspection Hold',
      
      // Escrow Vault View
      escrow_header_title: 'RBI Compliant Dual-Key Escrow Vault',
      escrow_header_subtitle: 'Bank-grade escrow account with automated nodal disbursement and 48-hour dispute freezes.',
      btn_deposit_capital: '+ Deposit Escrow Capital',
      btn_release_balance: 'Release 65% Balance',
      btn_view_agreement: 'View Agreement Deed',
      
      // Grievances View
      grv_header_title: 'Claims, Grievances & Escrow Protection Protocol',
      grv_header_subtitle: 'MSAMB statutory arbitration tribunal for quality assay variations and weighbridge shortages.',
      btn_file_claim: '+ File New Quality Claim',
      
      // Storage View
      storage_header_title: 'Cold Storage, Hermetic Silos & e-NWR Warehouse Network',
      storage_header_subtitle: 'Book climate-controlled cold chambers, dry grain silos, and unlock WDRA-regulated electronic Negotiable Warehouse Receipts (e-NWR) for 70% instant pledge loans.',
      btn_book_storage: '+ Book Chamber Space',
      
      // Logistics View
      logistics_header_title: 'Multi-Modal Logistics & Fleet Booking Hub',
      logistics_header_subtitle: 'Book verified reefer containers, multi-axle trucks, and pick-up vans with AIS-140 GPS tracking across Maharashtra farm gates.',
      btn_book_fleet: '+ Book Dedicated Freight Vehicle',
      
      // Common UI & Toast
      btn_cancel: 'Cancel',
      btn_submit: 'Submit',
      btn_close: 'Close',
      btn_save: 'Save Changes',
      btn_confirm: 'Confirm',
      toast_lang_updated: 'Language updated to English 🇬🇧'
    },

    hi: {
      lang_name: 'हिन्दी',
      flag: '🇮🇳',
      
      // Brand & Navigation
      buyer_portal: 'खरीदार पोर्टल',
      nav_marketplace: 'मार्केटप्लेस लॉट्स',
      nav_insights: 'बाजार विश्लेषण',
      nav_demands: 'थोक मांग',
      nav_consignments: 'ऑर्डर और खेप',
      nav_storage: 'शीतगृह और सायलो',
      nav_calculator: 'लागत कैलकुलेटर',
      nav_messages: 'संदेश',
      nav_escrow: 'एस्क्रो सुरक्षित तिजोरी',
      nav_grievances: 'दावे और शिकायतें',
      nav_logistics: 'फ्लीट और परिवहन',
      viewing_as: 'रूप में देखें:',
      persona_self: '🏢 आप (बिगबास्केट)',
      persona_other: '👥 अन्य खरीदार (सिम्युलेट)',
      
      // Header & Profile
      person_karthik_sundaram: 'कार्तिक सुंदरम',
      procurement_lead_company: 'खरीद प्रमुख (बिगबास्केट)',
      search_placeholder: 'फसलें, किसान, मंडियां खोजें...',
      search_produce_placeholder: 'फसलें, किस्में, किसान या मात्रा खोजें (जैसे टमाटर, प्याज, 500 किग्रा)...',
      buyer_location_text: 'वाशी टर्मिनल, नवी मुंबई (महा.)',
      enterprise_verified: 'प्रमाणित उद्यम खरीदार',
      
      // Marketplace Top Metrics
      active_orders: 'सक्रिय ऑर्डर',
      total_volume: 'कुल मात्रा',
      total_procured: 'कुल खरीद राशि',
      direct_savings: 'प्रत्यक्ष बचत',
      saved_text: 'बचत',
      orders_sub: 'सीधे खेत से खेप',
      volume_sub: 'महाराष्ट्र प्रमाणित',
      procured_sub: 'संस्थागत खरीद मात्रा',
      savings_sub: '~14% मंडी की तुलना में बचत',
      
      // Emergency Salvage Exchange
      salvage_title: 'आपातकालीन बचाव केंद्र (नो-लॉस खरीद)',
      salvage_badge: '⚡ त्वरित एस्क्रो भुगतान',
      salvage_desc: 'फूड प्रोसेसर्स, कमर्शियल कैटरर्स और बायो-कंपोस्ट निर्माताओं के लिए कम शेल्फ-लाइफ वाली फसलों की तुरंत खरीद का सीधा मंच।',
      salvage_recovery_badge: '🛡️ गारंटीकृत 65%–75% किसान लागत वसूली',
      salvage_col_crop: 'आपातकालीन फसल लॉट',
      salvage_col_farmer: 'किसान और मंडी',
      salvage_col_qty: 'मात्रा',
      salvage_col_rate: 'नो-लॉस खरीद भाव',
      salvage_col_target: 'उपयोग श्रेणी',
      salvage_col_window: 'समय सीमा',
      salvage_col_action: 'त्वरित खरीद',
      insta_buyout: '⚡ त्वरित खरीद',
      procured_in_transit: '✓ क्रय पूर्ण • रास्ते में',
      sold_out_salvage: '🚫 बिक गया (100% बचाव पूर्ण)',
      sold_out_qty: '0 किग्रा (बिक गया)',
      hours_left: 'घंटे शेष',
      
      // Category Filter Pills
      filter_all_crops: '🌾 सभी फसलें',
      filter_vegetables: '🍅 सब्जियां',
      filter_spices: '🌶️ मसाले और नकदी',
      filter_grains: '🌾 अनाज',
      filter_pulses: '🌱 दलहन',
      filter_oilseeds: '🌻 तिलहन',
      filter_fruits: '🍌 फल',
      filter_cash_crops: '☁️ नकदी फसलें',
      filter_fpo: '📦 एफपीओ थोक लॉट',
      
      // Section Header & View Mode
      available_lots_title: '🌾 उपलब्ध प्रमाणित कृषि लॉट्स',
      lots_available: 'लॉट उपलब्ध',
      showing_lots: '{1} में से {0} प्रमाणित लॉट प्रदर्शित',
      view_as_label: '👤 रूप में देखें:',
      view_grid: '⊞ ग्रिड',
      view_table: '☰ तालिका',
      sort_default: 'अनुशंसित ⌵',
      sort_price_low: 'मूल्य: कम से ज्यादा',
      sort_price_high: 'मूल्य: ज्यादा से कम',
      sort_rating: 'किसान रेटिंग',
      sort_savings: 'अधिकतम बचत',
      
      // Lot Cards
      lot_badge_farmer: '🌿 किसान',
      lot_compare: '⚖️ तुलना करें',
      buy_now: 'अभी खरीदें',
      procure_lot: 'लॉट खरीदें',
      counter_bid: 'काउंटर बोली',
      sold_out: '🚫 बिक गया',
      sold_out_overlay: '🚫 बिक गया',
      sold_out_subtext: '100% फसल खरीदार द्वारा क्रय',
      procured_by_you: '🔒 आपका ऑर्डर • रास्ते में',
      in_transit_btn: 'रास्ते में ➔',
      avail_qty_label: 'उपलब्ध मात्रा:',
      your_order_transit: '0 किग्रा (आपका ऑर्डर • रास्ते में)',
      escrow_locked_badge: '🔒 एस्क्रो सुरक्षित',
      your_order_badge: '🔒 क्रय पूर्ण • आपका ऑर्डर',
      units_label: 'इकाई:',
      units_both: 'दोनों',
      units_kg: 'किग्रा',
      units_qt: 'क्विंटल',
      
      // AI Floating Copilot
      ai_sourcing_copilot: 'एआई खरीद सहायक',
      
      // Calculator View
      calc_header_title: 'कृषि उतराई लागत, मंडी मध्यस्थता एवं परिवहन विश्लेषण',
      calc_header_subtitle: 'महाराष्ट्र एपीएमसी बाजार भाव, परिवहन मार्ग, वाहन क्षमता एवं सीधे खेत से खरीद पर आधारित।',
      btn_calc_post_demand: 'खरीद मांग पोस्ट करें',
      btn_calc_view_lots: 'मिलते-जुलते लॉट देखें',
      btn_print_sheet: 'लागत शीट प्रिंट करें',
      
      // Insights View
      insights_header_title: 'महाराष्ट्र एपीएमसी बाजार विश्लेषण और एआई हेजिंग',
      insights_header_subtitle: 'रीयल-टाइम एपीएमसी मंडी भाव, सीधे खेत से खरीद बचत, आवक मात्रा और 7-दिवसीय एआई मूल्य पूर्वानुमान।',
      insights_enam_live: 'ई-नाम लाइव फीड',
      insights_sync_btn: 'मंडी भाव सिंक करें',
      insights_select_benchmark: 'महाराष्ट्र कृषि कमोडिटी बेंचमार्क चुनें:',
      insights_select_benchmark_sub: 'मंडी के ऐतिहासिक भाव और 7-दिवसीय एआई अनुमान देखने के लिए फसल पर क्लिक करें',
      insights_cat_all: 'सभी (28)',
      insights_cat_veg: '🥬 सब्जियां',
      insights_cat_fruits: '🍎 फल',
      insights_cat_grains: '🌾 अनाज व मिलेट्स',
      insights_cat_pulses: '🫘 दलहन',
      insights_cat_spices: '🌿 मसाले व तिलहन',
      kpi_modal_label: 'मंडी मॉडल भाव',
      kpi_arbitrage_label: 'सीधे खेत से खरीद लाभ',
      kpi_arrivals_label: '24 घंटे में मंडी आवक',
      kpi_sentiment_label: 'एआई खरीद रुझान अनुमान',
      vs_last_week: 'पिछले सप्ताह की तुलना में',
      insights_btn_matrix: 'सभी जिलों के भाव देखें',
      insights_legend_modal: 'मंडी मॉडल भाव (वास्तविक)',
      insights_legend_forecast: 'एआई 7-दिवसीय पूर्वानुमान',
      insights_legend_ceiling: 'मंडी अधिकतम भाव',
      insights_legend_floor: 'मंडी न्यूनतम भाव',
      insights_legend_note: '⚡ मॉडल 5-वर्षीय मंडी आवक, मौसम सूचकांक और परिवहन दरों पर प्रशिक्षित',
      insights_supply_belts_title: 'महाराष्ट्र आवक क्षेत्र और आपूर्ति दबाव',
      insights_ai_strategy_title: 'एआई खरीद रणनीति और सीधा हेजिंग मार्गदर्शन',
      insights_live_volume: 'लाइव आवक',
      insights_zero_middlemen: 'शून्य बिचौलिया',
      insights_mandis_table_title: '🏛️ महाराष्ट्र एपीएमसी मंडियों की लाइव नीलामी बेंचमार्क तालिका',
      insights_mandis_table_sub: 'प्रमुख मंडियों की तुलना सीधे खेत से खरीद से करें और अधिकतम संस्थागत लाभ प्राप्त करें।',
      insights_quick_districts: 'प्रमुख जिले:',
      insights_all_apmcs: '🌾 सभी मंडियां',
      quick_dist_nashik: '🧅 नासिक',
      quick_dist_pune: '🍅 पुणे',
      quick_dist_jalgaon: '🍌 जलगांव',
      quick_dist_nagpur: '🍊 नागपुर',
      quick_dist_latur: '🫘 लातूर',
      quick_dist_sangli: '🌶️ सांगली',
      th_dist_mandi: 'जिला व मंडी यार्ड',
      th_modal_price_kg: 'मॉडल भाव (₹/किग्रा)',
      th_modal_price_qt: 'मॉडल दर (₹/क्विंटल)',
      th_min_max_range: 'न्यूनतम – अधिकतम रेंज',
      th_24h_arrivals_col: '24 घंटे आवक',
      th_arbitrage_spread: 'सीधी खरीद बचत',
      ph_search_dist_mandi: 'जिला या मंडी यार्ड खोजें...',
      matrix_footer_note: '* लाइव ई-नाम व मंडी नीलामी डेटा प्रति 15 मिनट अपडेट होता है।',
      btn_close_matrix: 'तालिका बंद करें',
      th_commodity_hub: 'मंडी एवं फसल',
      th_24h_arrivals: 'आवक मात्रा (क्विंटल व किग्रा)',
      th_min_price: 'न्यूनतम भाव',
      th_modal_price: 'मॉडल भाव (लाइव)',
      th_max_price: 'अधिकतम भाव',
      th_direct_arbitrage: 'सीधी खरीद बचत',
      th_action: 'खरीद कार्रवाई',
      btn_districts: '🗺️ जिले',
      btn_chart: '📈 चार्ट',
      btn_direct_buy: 'सीधी खरीद',
      btn_show_more_crops: 'और फसलें देखें (+5)',
      btn_show_less: '▲ कम दिखाएं (-5)',
      showing_all_entries: '✓ सभी {0} मंडी प्रविष्टियां प्रदर्शित',
      
      // Orders & Consignments View
      orders_header_title: 'प्रत्यक्ष फार्म कंसाइनमेंट और जीपीएस फ्लीट ट्रैकिंग',
      orders_header_subtitle: 'AIS-140 जीपीएस बीकन, तापमान सेंसर और दोहरी कुंजी एस्क्रो रिलीज के साथ लाइव निगरानी।',
      tab_all_orders: 'सभी सक्रिय ऑर्डर',
      tab_on_road: 'मार्ग में',
      tab_scheduled: 'निर्धारित',
      tab_delivered: 'वितरित एवं निपटान पूर्ण',
      tab_telemetry: 'वाहन व चालक विवरण',
      btn_confirm_arrival: 'आगमन की पुष्टि एवं गुणवत्ता पास',
      btn_view_invoice: 'डिजिटल इनवॉइस देखें',
      btn_raise_claim: 'गुणवत्ता जांच रोक दर्ज करें',
      
      // Escrow Vault View
      escrow_header_title: 'आरबीआई अनुपालन दोहरी-कुंजी एस्क्रो सुरक्षित तिजोरी',
      escrow_header_subtitle: 'स्वचालित भुगतान एवं 48 घंटे के विवाद समाधान सुरक्षा के साथ बैंक-स्तरीय एस्क्रो खाता।',
      btn_deposit_capital: '+ एस्क्रो राशि जमा करें',
      btn_release_balance: '65% शेष राशि जारी करें',
      btn_view_agreement: 'अनुबंध पत्र देखें',
      
      // Grievances View
      grv_header_title: 'दावे, शिकायतें और एस्क्रो सुरक्षा प्रोटोकॉल',
      grv_header_subtitle: 'गुणवत्ता भिन्नता और वजन कमी के लिए पणन महामंडळ मध्यस्थता प्रणाली।',
      btn_file_claim: '+ नया गुणवत्ता दावा दर्ज करें',
      
      // Storage View
      storage_header_title: 'शीतगृह, सीलबंद सायलो और ई-एनडब्ल्यूआर गोदाम नेटवर्क',
      storage_header_subtitle: 'वातानुकूलित शीतगृह और सायलो बुक करें तथा 70% त्वरित ऋण के लिए ई-एनडब्ल्यूआर रसीद प्राप्त करें।',
      btn_book_storage: '+ शीतगृह कक्ष आरक्षित करें',
      
      // Logistics View
      logistics_header_title: 'मल्टी-मॉडल लॉजिस्टिक्स और फ्लीट बुकिंग केंद्र',
      logistics_header_subtitle: 'सीधे खेत से खरीद के लिए AIS-140 जीपीएस सक्षम रीफर कंटेनर और ट्रक बुक करें।',
      btn_book_fleet: '+ समर्पित मालवाहन बुक करें',
      
      // Common UI & Toast
      btn_cancel: 'रद्द करें',
      btn_submit: 'जमा करें',
      btn_close: 'बंद करें',
      btn_save: 'बदलें सहेजें',
      btn_confirm: 'पुष्टि करें',
      toast_lang_updated: 'भाषा हिन्दी में बदली गई 🇮🇳'
    },

    mr: {
      lang_name: 'मराठी',
      flag: '🚩',
      
      // Brand & Navigation
      buyer_portal: 'खरेदीदार पोर्टल',
      nav_marketplace: 'मार्केटप्लेस लॉट्स',
      nav_insights: 'बाजार विश्लेषण',
      nav_demands: 'मोठ्या प्रमाणातील मागणी',
      nav_consignments: 'ऑर्डर्स आणि वाहतूक',
      nav_storage: 'शीतगृह आणि सायलो',
      nav_calculator: 'खर्च कॅल्क्युलेटर',
      nav_messages: 'संदेश',
      nav_escrow: 'एस्क्रो सुरक्षित तिजोरी',
      nav_grievances: 'तक्रारी आणि दावे',
      nav_logistics: 'वाहतूक व फ्लीट',
      viewing_as: 'स्वरूपात पहा:',
      persona_self: '🏢 आपण (बिगबास्केट)',
      persona_other: '👥 इतर खरेदीदार (डेमो)',
      
      // Header & Profile
      person_karthik_sundaram: 'कार्तिक सुंदरम',
      procurement_lead_company: 'खरेदी प्रमुख (बिगबास्केट)',
      search_placeholder: 'पिके, शेतकरी, बाजार समित्या शोधा...',
      search_produce_placeholder: 'पिके, वाण, शेतकरी किंवा प्रमाण शोधा (उदा. टोमॅटो, कांदा, बटाटा, ५०० किलो)...',
      buyer_location_text: 'वाशी टर्मिनल, नवी मुंबई (महा.)',
      enterprise_verified: 'प्रमाणित संस्थात्मक खरेदीदार',
      
      // Marketplace Top Metrics
      active_orders: 'सक्रिय ऑर्डर्स',
      total_volume: 'एकूण प्रमाण',
      total_procured: 'एकूण खरेदी रक्कम',
      direct_savings: 'थेट बचत',
      saved_text: 'बचत',
      orders_sub: 'थेट शेतातील आवक',
      volume_sub: 'महाराष्ट्र प्रमाणित',
      procured_sub: 'संस्थात्मक खरेदी प्रमाण',
      savings_sub: '~१४% बाजार समितीपेक्षा बचत',
      
      // Emergency Salvage Exchange
      salvage_title: 'तातडीचे बचाव केंद्र (खर्च-आधारित खरेदी)',
      salvage_badge: '⚡ त्वरित एस्क्रो पूर्तता',
      salvage_desc: 'अन्न प्रक्रियादार, केटरर्स आणि खत उत्पादकांसाठी नाशवंत शेतीमालाची थेट आणि तातडीची खरेदी.',
      salvage_recovery_badge: '🛡️ हमीभाव ६५%–७५% शेतकरी खर्च वसुली',
      salvage_col_crop: 'तातडीचा पीक लॉट',
      salvage_col_farmer: 'शेतकरी आणि बाजार समिती',
      salvage_col_qty: 'प्रमाण',
      salvage_col_rate: 'खर्च-आधारित खरेदी भाव',
      salvage_col_target: 'वापर प्रकार',
      salvage_col_window: 'कालावधीची निकड',
      salvage_col_action: 'तातडीने खरेदी करा',
      insta_buyout: '⚡ त्वरित खरेदी',
      procured_in_transit: '✓ खरेदी पूर्ण • मार्गावर',
      sold_out_salvage: '🚫 विकले गेले (१००% बचाव पूर्ण)',
      sold_out_qty: '० किलो (विकले गेले)',
      hours_left: 'तास शिल्लक',
      
      // Category Filter Pills
      filter_all_crops: '🌾 सर्व पिके',
      filter_vegetables: '🍅 भाज्या',
      filter_spices: '🌶️ मसाले आणि नगदी पिके',
      filter_grains: '🌾 अन्नधान्य',
      filter_pulses: '🌱 कडधान्ये',
      filter_oilseeds: '🌻 गळित धान्ये',
      filter_fruits: '🍌 फळे',
      filter_cash_crops: '☁️ बागायती पिके',
      filter_fpo: '📦 एफपीओ मोठे लॉट्स',
      
      // Section Header & View Mode
      available_lots_title: '🌾 थेट शेतातून उपलब्ध लॉट्स',
      lots_available: 'लॉट्स उपलब्ध',
      showing_lots: '{1} पैकी {0} प्रमाणित लॉट्स',
      view_as_label: '👤 स्वरूपात पहा:',
      view_grid: '⊞ ग्रिड',
      view_table: '☰ तक्ता',
      sort_default: 'शिफारस केलेले ⌵',
      sort_price_low: 'किंमत: कमी ते जास्त',
      sort_price_high: 'किंमत: जास्त ते कमी',
      sort_rating: 'शेतकरी विश्वासार्हता',
      sort_savings: 'कमाल बाजार बचत',
      
      // Lot Cards
      lot_badge_farmer: '🌿 शेतकरी',
      lot_compare: '⚖️ तुलना करा',
      buy_now: 'आता खरेदी करा',
      procure_lot: 'लॉट खरेदी करा',
      counter_bid: 'प्रति-बोली द्या',
      sold_out: '🚫 विकले गेले',
      sold_out_overlay: '🚫 पूर्ण विकले गेले',
      sold_out_subtext: '१००% पीक खरेदीदाराने खरेदी केले',
      procured_by_you: '🔒 तुमची ऑर्डर • मार्गावर',
      in_transit_btn: 'मार्गावर आहे ➔',
      avail_qty_label: 'उपलब्ध प्रमाण:',
      your_order_transit: '० किलो (तुमची ऑर्डर • मार्गावर)',
      escrow_locked_badge: '🔒 एस्क्रो सुरक्षित',
      your_order_badge: '🔒 पूर्ण खरेदी • तुमची ऑर्डर',
      units_label: 'एकक:',
      units_both: 'दोन्ही',
      units_kg: 'किलो',
      units_qt: 'क्विंटल',
      
      // AI Floating Copilot
      ai_sourcing_copilot: 'एआय खरेदी सहाय्यक',
      
      // Calculator View
      calc_header_title: 'शेतीमालाचा पोहोच खर्च, बाजार फरक व वाहतूक विश्लेषण प्रणाली',
      calc_header_subtitle: 'महाराष्ट्र बाजार समिती भाव, थेट शेतावरून खरेदी आणि थेट वाहतूक मार्गांवर आधारित.',
      btn_calc_post_demand: 'खरेदी मागणी नोंदवा',
      btn_calc_view_lots: 'जुळणारे लॉट्स पहा',
      btn_print_sheet: 'खर्च पत्रक प्रिंट करा',
      
      // Insights View
      insights_header_title: 'महाराष्ट्र बाजार समित्यांमधील थेट लिलाव दर तक्ता',
      insights_header_subtitle: 'प्रमुख बाजार समित्यांची (लासलगाव, नारायणगाव, रावेर, लातूर इत्यादी) थेट शेतीमाल खरेदीशी तुलना करा आणि कमाल नफा मिळवा.',
      insights_enam_live: 'e-NAM थेट प्रक्षेपण',
      insights_sync_btn: 'बाजार भाव सिंक करा',
      insights_select_benchmark: 'महाराष्ट्र शेतमाल निर्देशांक निवडा:',
      insights_select_benchmark_sub: 'बाजार समितीचे ऐतिहासिक दर आणि ७ दिवसांचा AI अंदाज पाहण्यासाठी पिकावर क्लिक करा',
      insights_cat_all: 'सर्व (२८)',
      insights_cat_veg: '🥬 भाज्या',
      insights_cat_fruits: '🍎 फळे',
      insights_cat_grains: '🌾 अन्नधान्य आणि भरडधान्ये',
      insights_cat_pulses: '🫘 कडधान्ये',
      insights_cat_spices: '🌿 मसाले आणि गळित धान्ये',
      kpi_modal_label: 'बाजार समिती सरासरी दर',
      kpi_arbitrage_label: 'थेट शेतातील दर फरक (नफा)',
      kpi_arrivals_label: '२४ तासांतील बाजार समिती आवक',
      kpi_sentiment_label: 'AI खरेदी विश्लेषण कल',
      vs_last_week: 'मागील आठवड्याच्या तुलनेत',
      insights_btn_matrix: 'सर्व जिल्ह्यांमधील दर तपासा',
      insights_legend_modal: 'बाजार समिती सरासरी दर (प्राप्त)',
      insights_legend_forecast: 'AI पुढील ७ दिवसांचा अंदाज',
      insights_legend_ceiling: 'बाजार समिती कमाल दर',
      insights_legend_floor: 'बाजार समिती किमान दर',
      insights_legend_note: '⚡ मॉडेल ५ वर्षांची बाजार समिती आवक, हवामान निर्देशांक आणि वाहतूक इंधन दरांवर प्रशिक्षित',
      insights_supply_belts_title: 'महाराष्ट्रातील शेतीमाल आवक पट्टे आणि पुरवठा दबाव',
      insights_ai_strategy_title: 'AI खरेदी रणनीती व थेट नफा मार्गदर्शन',
      insights_live_volume: 'थेट आवक',
      insights_zero_middlemen: 'शून्य मध्यस्थ',
      insights_mandis_table_title: '🏛️ महाराष्ट्र बाजार समित्यांमधील थेट लिलाव दर तक्ता',
      insights_mandis_table_sub: 'प्रमुख बाजार समित्यांची (लासलगाव, नारायणगाव, रावेर, लातूर इत्यादी) थेट शेतीमाल खरेदीशी तुलना करा आणि कमाल नफा मिळवा.',
      insights_quick_districts: 'प्रमुख जिल्हे:',
      insights_all_apmcs: '🌾 सर्व बाजार समित्या',
      quick_dist_nashik: '🧅 नाशिक',
      quick_dist_pune: '🍅 पुणे',
      quick_dist_jalgaon: '🍌 जळगाव',
      quick_dist_nagpur: '🍊 नागपूर',
      quick_dist_latur: '🫘 लातूर',
      quick_dist_sangli: '🌶️ सांगली',
      th_dist_mandi: 'जिल्हा व बाजार समिती यार्ड',
      th_modal_price_kg: 'सरासरी दर (₹/किलो)',
      th_modal_price_qt: 'सरासरी दर (₹/क्विंटल)',
      th_min_max_range: 'किमान – कमाल मर्यादा',
      th_24h_arrivals_col: '२४ तास आवक',
      th_arbitrage_spread: 'थेट खरेदी नफा (बचत)',
      ph_search_dist_mandi: 'जिल्हा किंवा बाजार समिती शोधा...',
      matrix_footer_note: '* थेट ई-नाम व बाजार समिती लिलाव माहिती दर १५ मिनिटांनी अद्ययावत केली जाते.',
      btn_close_matrix: 'तक्ता बंद करा',
      th_commodity_hub: 'शेतमाल व बाजार समिती',
      th_24h_arrivals: '२४ तासांतील आवक (क्विंटल व किलो)',
      th_min_price: 'किमान दर',
      th_modal_price: 'सरासरी दर (थेट)',
      th_max_price: 'कमाल दर',
      th_direct_arbitrage: 'थेट खरेदीतील नफा (बचत)',
      th_action: 'खरेदी कृती',
      btn_districts: '🗺️ जिल्हे',
      btn_chart: '📈 आलेख',
      btn_direct_buy: 'थेट खरेदी',
      btn_show_more_crops: 'आणखी पिके पहा (+५)',
      btn_show_less: '▲ कमी दाखवा (-५)',
      showing_all_entries: '✓ सर्व {0} बाजार समिती नोंदी दर्शवित आहे',
      
      // Orders & Consignments View
      orders_header_title: 'थेट शेतातील शेतीमाल वाहतूक व जीपीएस ट्रॅकिंग',
      orders_header_subtitle: 'AIS-140 जीपीएस व शीतकरण यंत्रणेसह थेट शेतावरून गोदामापर्यंत रिअल-टाइम ट्रॅकिंग.',
      tab_all_orders: 'सर्व सक्रिय ऑर्डर्स',
      tab_on_road: 'रस्त्यावर',
      tab_scheduled: 'नियोजित',
      tab_delivered: 'वितरित आणि हिशोब पूर्ण',
      tab_telemetry: 'वाहन व चालक माहिती',
      btn_confirm_arrival: 'आगमन नोंद व प्रतवारी मंजुरी',
      btn_view_invoice: 'डिजिटल इनव्हॉइस पहा',
      btn_raise_claim: 'गुणवत्ता आक्षेप नोंदवा',
      
      // Escrow Vault View
      escrow_header_title: 'आरबीआय नियमांनुसार सुरक्षित ड्युएल-की एस्क्रो तिजोरी',
      escrow_header_subtitle: 'शेतकरी व खरेदीदार दोघांच्या सुरक्षेसाठी ४८ तासांच्या विवाद निवारणासह बँक एस्क्रो खाते.',
      btn_deposit_capital: '+ एस्क्रो निधी जमा करा',
      btn_release_balance: '६५% उर्वरित रक्कम द्या',
      btn_view_agreement: 'खरेदी करारनामा पहा',
      
      // Grievances View
      grv_header_title: 'तक्रार निवारण, दावे आणि एस्क्रो संरक्षण',
      grv_header_subtitle: 'गुणवत्ता फरक आणि वजन तुटीसाठी पणन महामंडळ लवाद प्रणाली.',
      btn_file_claim: '+ नवीन गुणवत्ता दावा दाखल करा',
      
      // Storage View
      storage_header_title: 'शीतगृह, साठवणूक सायलो व ई-एनडब्ल्यूआर गोदाम नेटवर्क',
      storage_header_subtitle: 'वातानुकूलित शीतगृह, धान्य सायलो आरक्षित करा आणि ७०% त्वरित कर्ज मिळवण्यासाठी ई-एनडब्ल्यूआर पावती मिळवा.',
      btn_book_storage: '+ शीतगृह जागा आरक्षित करा',
      
      // Logistics View
      logistics_header_title: 'मल्टी-मॉडल वाहतूक आणि वाहन आरक्षण केंद्र',
      logistics_header_subtitle: 'महाराष्ट्रातील थेट शेतांवरून AIS-140 जीपीएस ट्रॅकिंग असलेली रीफर वाहने आणि ट्रक्स बुक करा.',
      btn_book_fleet: '+ समर्पित मालवाहतूक वाहन बुक करा',
      
      // Common UI & Toast
      btn_cancel: 'रद्द करा',
      btn_submit: 'सादर करा',
      btn_close: 'बंद करा',
      btn_save: 'बदल जतन करा',
      btn_confirm: 'पुष्टी करा',
      toast_lang_updated: 'भाषा मराठीमध्ये बदलली आहे 🚩'
    }
  };

  // Static element mapping: CSS selector -> translation dictionary key
  const SELECTOR_MAP = [
    // Brand & Sidebar Nav
    { sel: '.brand-tagline', key: 'buyer_portal' },
    { sel: 'li[data-view="view-verified-produce"] .nav-item-left span', key: 'nav_marketplace' },
    { sel: 'li[data-view="view-verified-produce"] .nav-label', key: 'nav_marketplace' },
    { sel: 'li[data-view="view-insights"] .nav-item-left span', key: 'nav_insights' },
    { sel: 'li[data-view="view-insights"] .nav-label', key: 'nav_insights' },
    { sel: 'li[data-view="view-bulk-demands"] .nav-item-left span', key: 'nav_demands' },
    { sel: 'li[data-view="view-bulk-demands"] .nav-label', key: 'nav_demands' },
    { sel: 'li[data-view="view-consignments"] .nav-item-left span', key: 'nav_consignments' },
    { sel: 'li[data-view="view-consignments"] .nav-label', key: 'nav_consignments' },
    { sel: 'li[data-view="view-storage"] .nav-item-left span', key: 'nav_storage' },
    { sel: 'li[data-view="view-storage"] .nav-label', key: 'nav_storage' },
    { sel: 'li[data-view="view-calculator"] .nav-item-left span', key: 'nav_calculator' },
    { sel: 'li[data-view="view-calculator"] .nav-label', key: 'nav_calculator' },
    { sel: 'li[data-view="view-messages"] .nav-item-left span', key: 'nav_messages' },
    { sel: 'li[data-view="view-messages"] .nav-label', key: 'nav_messages' },
    { sel: 'li[data-view="view-escrow-vault"] .nav-item-left span', key: 'nav_escrow' },
    { sel: 'li[data-view="view-escrow-vault"] .nav-label', key: 'nav_escrow' },
    { sel: 'li[data-view="view-escrow-ledger"] .nav-label', key: 'nav_escrow' },
    { sel: 'li[data-view="view-grievance"] .nav-item-left span', key: 'nav_grievances' },
    { sel: 'li[data-view="view-grievance"] .nav-label', key: 'nav_grievances' },
    
    // Header Profile & Location
    { sel: '.profile-name', key: 'person_karthik_sundaram' },
    { sel: '.profile-role', key: 'procurement_lead_company' },
    { sel: '#buyer-location-text', key: 'buyer_location_text' },
    
    // Top 4 Metric Pills
    { sel: '.market-stats-row .market-stat-pill:nth-child(1) .market-stat-label', key: 'active_orders' },
    { sel: '.market-stats-row .market-stat-pill:nth-child(2) .market-stat-label', key: 'total_volume' },
    { sel: '.market-stats-row .market-stat-pill:nth-child(3) .market-stat-label', key: 'total_procured' },
    { sel: '.market-stats-row .market-stat-pill:nth-child(4) .market-stat-label', key: 'direct_savings' },
    
    // Emergency Salvage Section Header & Table
    { sel: '#marketplace-emergency-salvage-section .card-title', key: 'salvage_title' },
    { sel: '#marketplace-emergency-salvage-section .badge-status-emergency', key: 'salvage_badge' },
    { sel: '#marketplace-emergency-salvage-section thead th:nth-child(1)', key: 'salvage_col_crop' },
    { sel: '#marketplace-emergency-salvage-section thead th:nth-child(2)', key: 'salvage_col_farmer' },
    { sel: '#marketplace-emergency-salvage-section thead th:nth-child(3)', key: 'salvage_col_qty' },
    { sel: '#marketplace-emergency-salvage-section thead th:nth-child(4)', key: 'salvage_col_rate' },
    { sel: '#marketplace-emergency-salvage-section thead th:nth-child(5)', key: 'salvage_col_target' },
    { sel: '#marketplace-emergency-salvage-section thead th:nth-child(6)', key: 'salvage_col_window' },
    { sel: '#marketplace-emergency-salvage-section thead th:nth-child(7)', key: 'salvage_col_action' },
    
    // Category Filter Pills
    { sel: '#market-category-pills .market-pill:nth-child(1)', key: 'filter_all_crops' },
    { sel: '#market-category-pills .market-pill:nth-child(2)', key: 'filter_vegetables' },
    { sel: '#market-category-pills .market-pill:nth-child(3)', key: 'filter_spices' },
    { sel: '#market-category-pills .market-pill:nth-child(4)', key: 'filter_grains' },
    { sel: '#market-category-pills .market-pill:nth-child(5)', key: 'filter_pulses' },
    { sel: '#market-category-pills .market-pill:nth-child(6)', key: 'filter_oilseeds' },
    { sel: '#market-category-pills .market-pill:nth-child(7)', key: 'filter_fruits' },
    { sel: '#market-category-pills .market-pill:nth-child(8)', key: 'filter_cash_crops' },
    { sel: '#market-category-pills .market-pill:nth-child(9)', key: 'filter_fpo' },
    
    // Section Header & Perspective
    { sel: '#view-verified-produce h2', key: 'available_lots_title' },
    { sel: '#btn-persona-self', key: 'persona_self' },
    { sel: '#btn-persona-other', key: 'persona_other' },
    { sel: '#btn-view-grid', key: 'view_grid' },
    { sel: '#btn-view-table', key: 'view_table' },
    
    // AI Floating Copilot
    { sel: '#btn-floating-copilot span:nth-child(2)', key: 'ai_sourcing_copilot' },

    // Calculator View
    { sel: '#view-calculator .dash-title', key: 'calc_header_title' },
    { sel: '#view-calculator .dash-subtitle', key: 'calc_header_subtitle' },
    { sel: '#btn-calc-post-demand', key: 'btn_calc_post_demand' },
    { sel: '#view-calculator .btn-outline[onclick*="printProcurementCostSheet"]', key: 'btn_print_sheet' },
    { sel: '#view-calculator .btn-primary[onclick*="filterMarketplaceFromCalculator"]', key: 'btn_calc_view_lots' },
    
    // Insights View Header & Benchmark Controls
    { sel: '#view-insights .dash-title', key: 'insights_header_title' },
    { sel: '#view-insights .dash-subtitle', key: 'insights_header_subtitle' },
    { sel: '#view-insights .badge-grade-a', key: 'insights_enam_live' },
    { sel: '#view-insights button[onclick="triggerMandiSync()"] span:nth-child(2)', key: 'insights_sync_btn' },
    { sel: '#view-insights span[data-i18n="insights_select_benchmark"]', key: 'insights_select_benchmark' },
    { sel: '#view-insights span[data-i18n="insights_select_benchmark_sub"]', key: 'insights_select_benchmark_sub' },
    { sel: '#insight-cat-tabs button[data-cat="all"]', key: 'insights_cat_all' },
    { sel: '#insight-cat-tabs button[data-cat="vegetables"]', key: 'insights_cat_veg' },
    { sel: '#insight-cat-tabs button[data-cat="fruits"]', key: 'insights_cat_fruits' },
    { sel: '#insight-cat-tabs button[data-cat="grains"]', key: 'insights_cat_grains' },
    { sel: '#insight-cat-tabs button[data-cat="pulses"]', key: 'insights_cat_pulses' },
    { sel: '#insight-cat-tabs button[data-cat="spices"]', key: 'insights_cat_spices' },

    // Insights Top 4 KPI Cards
    { sel: '.stats-grid .insight-kpi-card:nth-child(1) .stat-label', key: 'kpi_modal_label' },
    { sel: '.stats-grid .insight-kpi-card:nth-child(2) .stat-label', key: 'kpi_arbitrage_label' },
    { sel: '.stats-grid .insight-kpi-card:nth-child(3) .stat-label', key: 'kpi_arrivals_label' },
    { sel: '.stats-grid .insight-kpi-card:nth-child(4) .stat-label', key: 'kpi_sentiment_label' },
    { sel: '.stats-grid .insight-kpi-card:nth-child(1) .stat-change span:nth-child(2)', key: 'vs_last_week' },

    // Insights 2-Column Section Titles
    { sel: '#view-insights .card:has(#insight-producing-belts) .card-title span:nth-child(2)', key: 'insights_supply_belts_title' },
    { sel: '#view-insights .card:has(#insight-producing-belts) .badge', key: 'insights_live_volume' },
    { sel: '#view-insights .card:has(#insight-ai-advisory) .card-title span:nth-child(2)', key: 'insights_ai_strategy_title' },
    { sel: '#view-insights .card:has(#insight-ai-advisory) .badge', key: 'insights_zero_middlemen' },

    // Insights Full Table Section
    { sel: '#view-insights .card h3:has(+ span)', key: 'insights_mandis_table_title' },
    { sel: '#view-insights .card:has(#insights-mandis-tbody) thead th:nth-child(1)', key: 'th_commodity_hub' },
    { sel: '#view-insights .card:has(#insights-mandis-tbody) thead th:nth-child(2)', key: 'th_24h_arrivals' },
    { sel: '#view-insights .card:has(#insights-mandis-tbody) thead th:nth-child(3)', key: 'th_min_price' },
    { sel: '#view-insights .card:has(#insights-mandis-tbody) thead th:nth-child(4)', key: 'th_modal_price' },
    { sel: '#view-insights .card:has(#insights-mandis-tbody) thead th:nth-child(5)', key: 'th_max_price' },
    { sel: '#view-insights .card:has(#insights-mandis-tbody) thead th:nth-child(6)', key: 'th_direct_arbitrage' },
    { sel: '#view-insights .card:has(#insights-mandis-tbody) thead th:nth-child(7)', key: 'th_action' },
    
    // Orders / Consignments View
    { sel: '#view-consignments .dash-title', key: 'orders_header_title' },
    { sel: '#view-consignments .dash-subtitle', key: 'orders_header_subtitle' },
    
    // Escrow View
    { sel: '#view-escrow-vault .dash-title', key: 'escrow_header_title' },
    { sel: '#view-escrow-vault .dash-subtitle', key: 'escrow_header_subtitle' },
    
    // Grievance View
    { sel: '#view-grievance .dash-title', key: 'grv_header_title' },
    { sel: '#view-grievance .dash-subtitle', key: 'grv_header_subtitle' },
    
    // Storage & Logistics Views
    { sel: '#view-storage .dash-title', key: 'storage_header_title' },
    { sel: '#view-storage .dash-subtitle', key: 'storage_header_subtitle' },
    { sel: '#view-logistics .dash-title', key: 'logistics_header_title' },
    { sel: '#view-logistics .dash-subtitle', key: 'logistics_header_subtitle' }
  ];

  let currentLang = 'en';

  // Get active language
  function getBuyerLanguage() {
    return currentLang;
  }

  // Translation function for UI keys
  function t(key, fallback = '') {
    const dict = TRANSLATIONS[currentLang] || TRANSLATIONS.en;
    if (dict && dict[key] !== undefined) {
      return dict[key];
    }
    const enDict = TRANSLATIONS.en;
    if (enDict && enDict[key] !== undefined) {
      return enDict[key];
    }
    return fallback || key;
  }

  // Pre-sort keys by length descending to match longest phrases first
  const sortedCropKeys = Object.keys(CROP_MAP).sort((a, b) => b.length - a.length);
  const sortedLocationKeys = Object.keys(LOCATION_MAP).sort((a, b) => b.length - a.length);
  const sortedPersonKeys = Object.keys(PERSON_MAP).sort((a, b) => b.length - a.length);

  // Translate Crop Names
  function tCrop(crop) {
    if (!crop || currentLang === 'en') return crop;
    
    // Exact match
    if (CROP_MAP[crop] && CROP_MAP[crop][currentLang]) {
      return CROP_MAP[crop][currentLang];
    }

    // Cleaned string (without parentheses or trailing notes)
    const cleaned = crop.replace(/\(.*?\)/g, '').trim();
    if (CROP_MAP[cleaned] && CROP_MAP[cleaned][currentLang]) {
      return CROP_MAP[cleaned][currentLang];
    }

    // Longest substring replacement
    let res = crop;
    for (const k of sortedCropKeys) {
      const trans = CROP_MAP[k];
      if (res.includes(k) && trans && trans[currentLang]) {
        res = res.replaceAll(k, trans[currentLang]);
      }
    }

    // Common descriptive tokens
    if (currentLang === 'mr') {
      res = res.replace(/\bHybrid\b/gi, 'संकरित')
               .replace(/\bGrade A\b/gi, 'ग्रेड अ')
               .replace(/\bGrade B\b/gi, 'ग्रेड ब')
               .replace(/\bGrade C\b/gi, 'ग्रेड क')
               .replace(/\bExport\b/gi, 'निर्यात')
               .replace(/\bRaw\b/gi, 'कच्चा')
               .replace(/\bDry\b/gi, 'सुकी')
               .replace(/\bFresh\b/gi, 'ताजी')
               .replace(/\bYellow\b/gi, 'पिवळी')
               .replace(/\bRed\b/gi, 'लाल')
               .replace(/\bGreen\b/gi, 'हिरवी')
               .replace(/\bWhite\b/gi, 'पांढरे')
               .replace(/\bSeeds\b/gi, 'बियाणे')
               .replace(/\bBold\b/gi, 'जाड')
               .replace(/\bSweet\b/gi, 'गोड')
               .replace(/\bGolden\b/gi, 'सोनेरी')
               .replace(/\bHigh-Oil\b/gi, 'जास्त तेल')
               .replace(/\bHigh-Curcumin\b/gi, 'उच्च करक्युमिन')
               .replace(/\bHigh-Pungency\b/gi, 'जास्त तिखट')
               .replace(/\bPerishable\b/gi, 'नाशवंत')
               .replace(/\bLots\b/gi, 'लॉट्स')
               .replace(/\bLot\b/gi, 'लॉट');
    } else if (currentLang === 'hi') {
      res = res.replace(/\bHybrid\b/gi, 'हाइब्रिड')
               .replace(/\bGrade A\b/gi, 'ग्रेड ए')
               .replace(/\bGrade B\b/gi, 'ग्रेड बी')
               .replace(/\bGrade C\b/gi, 'ग्रेड सी')
               .replace(/\bExport\b/gi, 'निर्यात')
               .replace(/\bRaw\b/gi, 'कच्चा')
               .replace(/\bDry\b/gi, 'सूखी')
               .replace(/\bFresh\b/gi, 'ताजा')
               .replace(/\bYellow\b/gi, 'पीला')
               .replace(/\bRed\b/gi, 'लाल')
               .replace(/\bGreen\b/gi, 'हरी')
               .replace(/\bWhite\b/gi, 'सफेद')
               .replace(/\bSeeds\b/gi, 'बीज')
               .replace(/\bBold\b/gi, 'बोल्ड')
               .replace(/\bSweet\b/gi, 'मीठा')
               .replace(/\bGolden\b/gi, 'सुनहरा')
               .replace(/\bHigh-Oil\b/gi, 'उच्च तेल')
               .replace(/\bPerishable\b/gi, 'नाशवान')
               .replace(/\bLots\b/gi, 'लॉट्स')
               .replace(/\bLot\b/gi, 'लॉट');
    }
    return res;
  }

  // Translate Person / Farmer Names
  function tPerson(person) {
    if (!person || currentLang === 'en') return person;
    if (PERSON_MAP[person] && PERSON_MAP[person][currentLang]) {
      return PERSON_MAP[person][currentLang];
    }
    let res = person;
    for (const k of sortedPersonKeys) {
      const trans = PERSON_MAP[k];
      if (res.includes(k) && trans && trans[currentLang]) {
        res = res.replaceAll(k, trans[currentLang]);
      }
    }
    return res;
  }

  // Translate Mandi / Location Names
  function tLocation(loc) {
    if (!loc || currentLang === 'en') return loc;
    if (LOCATION_MAP[loc] && LOCATION_MAP[loc][currentLang]) {
      return LOCATION_MAP[loc][currentLang];
    }

    let res = loc;
    for (const k of sortedLocationKeys) {
      const trans = LOCATION_MAP[k];
      if (res.includes(k) && trans && trans[currentLang]) {
        res = res.replaceAll(k, trans[currentLang]);
      }
    }

    if (currentLang === 'mr') {
      res = res.replace(/APMC Market Yard/gi, 'बाजार समिती')
               .replace(/APMC Yard/gi, 'बाजार समिती')
               .replace(/APMC Market/gi, 'बाजार समिती')
               .replace(/Market Yard/gi, 'बाजार समिती')
               .replace(/Mandi Yard/gi, 'बाजार समिती')
               .replace(/APMC/gi, 'बाजार समिती')
               .replace(/Mandi/gi, 'बाजार समिती')
               .replace(/Market/gi, 'बाजार')
               .replace(/Spices/gi, 'मसाला')
               .replace(/Mega Silos/gi, 'सायलो संकुल')
               .replace(/Silos/gi, 'सायलो')
               .replace(/Chilli Yard/gi, 'मिरची बाजार')
               .replace(/Paddy Hub/gi, 'धान्य केंद्र')
               .replace(/Hub/gi, 'केंद्र')
               .replace(/Yard/gi, '')
               .replace(/District/gi, 'जिल्हा')
               .replace(/\b&\b/g, 'व')
               .replace(/km away/gi, 'किमी अंतरावर')
               .replace(/बाजार समिती\s+बाजार समिती/g, 'बाजार समिती')
               .replace(/बाजार समिती\s+Market/g, 'बाजार समिती')
               .replace(/Market\s+बाजार समिती/g, 'बाजार समिती')
               .replace(/  +/g, ' ')
               .trim();
    } else if (currentLang === 'hi') {
      res = res.replace(/APMC Market Yard/gi, 'मंडी')
               .replace(/APMC Yard/gi, 'मंडी')
               .replace(/APMC Market/gi, 'मंडी')
               .replace(/Market Yard/gi, 'मंडी')
               .replace(/Mandi Yard/gi, 'मंडी')
               .replace(/APMC/gi, 'मंडी')
               .replace(/Market/gi, 'बाजार')
               .replace(/Spices/gi, 'मसाला')
               .replace(/Mega Silos/gi, 'सायलो')
               .replace(/Hub/gi, 'केंद्र')
               .replace(/Yard/gi, '')
               .replace(/District/gi, 'जिला')
               .replace(/\b&\b/g, 'और')
               .replace(/km away/gi, 'किमी दूर')
               .replace(/मंडी\s+मंडी/g, 'मंडी')
               .replace(/  +/g, ' ')
               .trim();
    }
    return res;
  }

  // Translate Quality Grades
  function tGrade(grade) {
    if (!grade || currentLang === 'en') return grade;
    if (GRADE_MAP[grade] && GRADE_MAP[grade][currentLang]) {
      return GRADE_MAP[grade][currentLang];
    }
    for (const [k, trans] of Object.entries(GRADE_MAP)) {
      if (grade.includes(k) && trans[currentLang]) {
        return grade.replace(k, trans[currentLang]);
      }
    }
    return grade;
  }

  // Translate General Terms & Statuses
  function tText(text) {
    if (!text || currentLang === 'en') return text;
    let res = text;
    
    // Status & Trading terms
    if (currentLang === 'mr') {
      res = res.replace(/Verified Available/g, 'प्रमाणित उपलब्ध')
               .replace(/On The Road/g, 'रस्त्यावर')
               .replace(/Pickup Scheduled/g, 'नियोजित')
               .replace(/Delivered & QC Passed/g, 'वितरित आणि तपासणी पूर्ण')
               .replace(/Delivered & Settled/g, 'वितरित आणि हिशोब पूर्ण')
               .replace(/Delivered & Released/g, 'वितरित आणि रक्कम सुपूर्द')
               .replace(/Under Review/g, 'चौकशी सुरू')
               .replace(/Resolved & Refunded/g, 'निवारण आणि परतावा')
               .replace(/Active Salvage Call/g, 'सक्रिय बचाव कॉल')
               .replace(/Hours Left/g, 'तास शिल्लक')
               .replace(/Urgency/g, 'तातडीचे')
               .replace(/Bullish \(Export Demand Peak\)/gi, 'तेजी (कमाल निर्यात मागणी)')
               .replace(/Bearish \(Heavy Mandi Inflow\)/gi, 'मंदी (बाजार समितीत भरपूर आवक)')
               .replace(/Stable \(Steady Industrial Offtake\)/gi, 'स्थिर (औद्योगिक मागणी स्थिर)')
               .replace(/High Volatility/gi, 'अस्थिर (दरात चढ-उतार)')
               .replace(/Bullish/gi, 'तेजी')
               .replace(/Bearish/gi, 'मंदी')
               .replace(/Stable/gi, 'स्थिर')
               .replace(/Export Peak/gi, 'निर्यात उच्चांक')
               .replace(/Surge Arrival/gi, 'भरपूर आवक')
               .replace(/Heavy Supply/gi, 'मोठा पुरवठा')
               .replace(/Steady Inflow/gi, 'स्थिर आवक')
               .replace(/Storage Peak/gi, 'साठवणूक उच्चांक')
               .replace(/Fresh Harvest/gi, 'ताजी काढणी')
               .replace(/vs last week/gi, 'मागील आठवड्यापेक्षा')
               .replace(/vs Vashi Middlemen/gi, 'वाशी दलालांपेक्षा')
               .replace(/vs Vashi APMC middleman rate/gi, 'वाशी बाजार समिती दलालांच्या दरापेक्षा')
               .replace(/Direct Farm Arbitrage/gi, 'थेट शेतातील दर फरक (नफा)')
               .replace(/Mandi Benchmark Modal/gi, 'बाजार समिती सरासरी दर')
               .replace(/24h Mandi Arrival Volume/gi, '२४ तासांतील बाजार समिती आवक')
               .replace(/AI Procurement Sentiment/gi, 'AI खरेदी विश्लेषण कल')
               .replace(/Save ₹/gi, 'बचत ₹')
               .replace(/Index:/gi, 'निर्देशांक:')
               .replace(/Next 3–5 Days/gi, 'पुढील ३–५ दिवस')
               .replace(/Before festive demand uptick/gi, 'सणासुदीच्या मागणीपूर्वी')
               .replace(/Direct Sourcing Spread/gi, 'थेट खरेदीतील नफा/बचत')
               .replace(/Optimal Sourcing Window/gi, 'खरेदीसाठी सर्वोत्तम कालावधी')
               .replace(/AI Procurement Action Plan:/gi, 'AI खरेदी कृती आराखडा:')
               .replace(/Browse Verified/gi, 'प्रमाणित शेतीमाल पहा')
               .replace(/All District Rates for/gi, 'सर्व जिल्ह्यांमधील दर -');
    } else if (currentLang === 'hi') {
      res = res.replace(/Verified Available/g, 'प्रमाणित उपलब्ध')
               .replace(/On The Road/g, 'मार्ग में')
               .replace(/Pickup Scheduled/g, 'निर्धारित')
               .replace(/Delivered & QC Passed/g, 'वितरित एवं पास')
               .replace(/Delivered & Settled/g, 'वितरित एवं निपटान पूर्ण')
               .replace(/Delivered & Released/g, 'वितरित एवं जारी')
               .replace(/Under Review/g, 'समीक्षाधीन')
               .replace(/Resolved & Refunded/g, 'समाधान एवं धनवापसी')
               .replace(/Active Salvage Call/g, 'सक्रिय बचाव कॉल')
               .replace(/Hours Left/g, 'घंटे शेष')
               .replace(/Urgency/g, 'आपातकाल')
               .replace(/Bullish \(Export Demand Peak\)/gi, 'तेजी (उच्च निर्यात मांग)')
               .replace(/Bearish \(Heavy Mandi Inflow\)/gi, 'मंदी (मंडी में भारी आवक)')
               .replace(/Stable \(Steady Industrial Offtake\)/gi, 'स्थिर (मांग स्थिर)')
               .replace(/High Volatility/gi, 'अस्थिर')
               .replace(/Bullish/gi, 'तेजी')
               .replace(/Bearish/gi, 'मंदी')
               .replace(/Stable/gi, 'स्थिर')
               .replace(/Export Peak/gi, 'निर्यात पीक')
               .replace(/Surge Arrival/gi, 'भारी आवक')
               .replace(/Heavy Supply/gi, 'अधिक आपूर्ति')
               .replace(/Steady Inflow/gi, 'स्थिर आवक')
               .replace(/Storage Peak/gi, 'भंडारण पीक')
               .replace(/Fresh Harvest/gi, 'ताजा फसल')
               .replace(/vs last week/gi, 'पिछले सप्ताह की तुलना में')
               .replace(/vs Vashi Middlemen/gi, 'वाशी बिचौलियों की तुलना में')
               .replace(/vs Vashi APMC middleman rate/gi, 'वाशी मंडी दलालों के भाव से')
               .replace(/Direct Farm Arbitrage/gi, 'सीधे खेत से खरीद लाभ')
               .replace(/Mandi Benchmark Modal/gi, 'मंडी मॉडल भाव')
               .replace(/24h Mandi Arrival Volume/gi, '24 घंटे में मंडी आवक')
               .replace(/AI Procurement Sentiment/gi, 'एआई खरीद रुझान अनुमान')
               .replace(/Save ₹/gi, 'बचत ₹')
               .replace(/Index:/gi, 'इंडेक्स:')
               .replace(/Next 3–5 Days/gi, 'अगले 3–5 दिन')
               .replace(/Before festive demand uptick/gi, 'त्योहारी मांग से पहले')
               .replace(/Direct Sourcing Spread/gi, 'सीधी खरीद बचत')
               .replace(/Optimal Sourcing Window/gi, 'खरीद का सही समय')
               .replace(/AI Procurement Action Plan:/gi, 'एआई खरीद कार्य योजना:')
               .replace(/Browse Verified/gi, 'प्रमाणित फसलें देखें')
               .replace(/All District Rates for/gi, 'सभी जिलों के भाव -');
    }
    return res;
  }

  const tStatus = tText;

  // Toggle Language Selector Dropdown Menu
  function toggleLanguageMenu() {
    const menu = document.getElementById('language-dropdown-menu');
    if (!menu) return;
    const isShown = menu.style.display === 'block';
    menu.style.display = isShown ? 'none' : 'block';
  }

  // Close dropdown on outside click
  document.addEventListener('click', function (e) {
    const selectorWidget = document.querySelector('.lang-selector-widget');
    const menu = document.getElementById('language-dropdown-menu');
    if (menu && selectorWidget && !selectorWidget.contains(e.target)) {
      menu.style.display = 'none';
    }
  });

  // Master Language Switcher: Sets language and updates DOM everywhere in buyer module
  function setBuyerLanguage(lang) {
    if (!TRANSLATIONS[lang]) {
      lang = 'en';
    }
    currentLang = lang;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}

    // 1. Update Dropdown Checkmarks & Header Label
    const dict = TRANSLATIONS[lang];
    const labelEl = document.getElementById('current-language-label');
    if (labelEl) {
      labelEl.textContent = `${dict.flag} ${dict.lang_name}`;
    }

    ['en', 'hi', 'mr'].forEach(l => {
      const opt = document.getElementById(`lang-opt-${l}`);
      if (opt) {
        const check = opt.querySelector('.lang-check');
        if (check) {
          check.style.display = l === lang ? 'inline-block' : 'none';
        }
        if (l === lang) {
          opt.style.background = '#e8f5ed';
          opt.style.color = '#0c5a36';
        } else {
          opt.style.background = 'transparent';
          opt.style.color = '#0f172a';
        }
      }
    });

    const menu = document.getElementById('language-dropdown-menu');
    if (menu) menu.style.display = 'none';

    // 2. Translate Selector-mapped static DOM elements
    SELECTOR_MAP.forEach(({ sel, key }) => {
      try {
        const el = document.querySelector(sel);
        if (el && dict[key]) {
          el.textContent = dict[key];
        }
      } catch (e) {}
    });

    // 3. Translate elements explicitly decorated with data-i18n attributes
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const k = el.getAttribute('data-i18n');
      if (k && dict[k]) {
        el.textContent = dict[k];
      }
    });

    // Translate placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const k = el.getAttribute('data-i18n-placeholder');
      if (k && dict[k]) {
        el.placeholder = dict[k];
      }
    });

    // Update global and marketplace search input placeholders
    const globalSearch = document.getElementById('buyer-global-search');
    if (globalSearch && dict.search_placeholder) {
      globalSearch.placeholder = dict.search_placeholder;
    }
    const marketSearch = document.getElementById('marketplace-search-input');
    if (marketSearch && dict.search_produce_placeholder) {
      marketSearch.placeholder = dict.search_produce_placeholder;
    }
    const mandiSearch = document.getElementById('mandis-table-search');
    if (mandiSearch && dict.insights_search_mandi_ph) {
      mandiSearch.placeholder = dict.insights_search_mandi_ph;
    }

    // 4. Update Sort Dropdown Options
    const sortSelect = document.getElementById('filter-sort');
    if (sortSelect && sortSelect.options.length >= 5) {
      sortSelect.options[0].text = dict.sort_default;
      sortSelect.options[1].text = dict.sort_price_low;
      sortSelect.options[2].text = dict.sort_price_high;
      sortSelect.options[3].text = dict.sort_rating;
      sortSelect.options[4].text = dict.sort_savings;
    }

    // Update District Dropdown in Mandis Benchmark Table
    const distSelect = document.getElementById('mandis-table-district');
    if (distSelect && distSelect.options) {
      const DISTRICT_SELECT_MAP = {
        en: {
          'all': '📍 All Districts (Maharashtra APMCs)',
          'Nashik': 'Nashik (Lasalgaon / Pimpalgaon / Malegaon)',
          'Pune': 'Pune (Narayangaon / Manchar / Indapur)',
          'Jalgaon': 'Jalgaon (Raver / Pachora / Chopda)',
          'Latur': 'Latur (Mega Silos / Pulses Yard)',
          'Nagpur': 'Nagpur (Kalamna / Bhiwapur)',
          'Sangli': 'Sangli (Spices APMC / Tasgaon)',
          'Solapur': 'Solapur (Sangola / Barshi / Pandharpur)',
          'Ahmednagar': 'Ahmednagar (Rahata / Rahuri / Sangamner)',
          'Amravati': 'Amravati (Warud / Dhamangaon)',
          'Akola': 'Akola (Grain & Pulses Hub)',
          'Nanded': 'Nanded (Ardhapur / Degloor)',
          'Satara': 'Satara (Karad / Phaltan)',
          'Kolhapur': 'Kolhapur (Vadgaon / Shirol)',
          'Dhule': 'Dhule (Shirpur / Sakri)',
          'Nandurbar': 'Nandurbar (Chilli Yard / Shahada)',
          'Beed': 'Beed (Kaij / Dharur / Majalgaon)',
          'Washim': 'Washim (Washim & Karanja APMC)',
          'Palghar': 'Palghar (Wada Paddy Hub)',
          'Dharashiv': 'Dharashiv (Omerga / Kalamb)',
          'Chhatrapati Sambhajinagar': 'Chhatrapati Sambhajinagar (Paithan / Kannad)',
          'Hingoli': 'Hingoli (Basmat Turmeric Hub)',
          'Wardha': 'Wardha (Hinganghat Cotton APMC)',
          'Ratnagiri': 'Ratnagiri (Alphonso Mango Hub)',
          'Sindhudurg': 'Sindhudurg (Devgad Hapus Yard)',
          'Raigad': 'Raigad (Alibaug APMC)'
        },
        hi: {
          'all': '📍 सभी जिले (महाराष्ट्र मंडियां)',
          'Nashik': 'नासिक (लासलगांव / पिंपलगांव / मालेगांव)',
          'Pune': 'पुणे (नारायणगांव / मंचर / इंदापुर)',
          'Jalgaon': 'जलगांव (रावेर / पाचोरा / चोपड़ा)',
          'Latur': 'लातूर (मुख्य सायलो / दलहन यार्ड)',
          'Nagpur': 'नागपुर (कलमना / भिवापुर)',
          'Sangli': 'सांगली (मसाला मंडी / तासगांव)',
          'Solapur': 'सोलापुर (सांगोला / बार्शी / पंढरपुर)',
          'Ahmednagar': 'अहमदनगर (राहाता / राहुरी / संगमनेर)',
          'Amravati': 'अमरावती (वरुड / धामनगांव)',
          'Akola': 'अकोला (अनाज व दलहन केंद्र)',
          'Nanded': 'नांदेड (अर्धापुर / देगलूर)',
          'Satara': 'सातारा (कराड / फलटण)',
          'Kolhapur': 'कोल्हापुर (वडगांव / शिरोल)',
          'Dhule': 'धुले (शिरपुर / साक्री)',
          'Nandurbar': 'नंदुरबार (मिर्च यार्ड / शहादा)',
          'Beed': 'बीड (केज / धारूर / माजलगांव)',
          'Washim': 'वाशिम (वाशिम व कारंजा मंडी)',
          'Palghar': 'पालघर (वाडा धान केंद्र)',
          'Dharashiv': 'धाराशिव (उमरगा / कलंब)',
          'Chhatrapati Sambhajinagar': 'छत्रपति संभाजीनगर (पैठन / कन्नड़)',
          'Hingoli': 'हिंगोली (बसमत हल्दी केंद्र)',
          'Wardha': 'वर्धा (हिंगणघाट कपास मंडी)',
          'Ratnagiri': 'रत्नागिरी (हापुस आम केंद्र)',
          'Sindhudurg': 'सिंधुदुर्ग (देवगढ़ हापुस यार्ड)',
          'Raigad': 'रायगढ़ (अलिबाग मंडी)'
        },
        mr: {
          'all': '📍 सर्व जिल्हे (महाराष्ट्र बाजार समित्या)',
          'Nashik': 'नाशिक (लासलगाव / पिंपळगाव / मालेगाव)',
          'Pune': 'पुणे (नारायणगाव / मंचर / इंदापूर)',
          'Jalgaon': 'जळगाव (रावेर / पाचोरा / चोपडा)',
          'Latur': 'लातूर (मुख्य सायलो / कडधान्य यार्ड)',
          'Nagpur': 'नागपूर (कळमना / भिवापूर)',
          'Sangli': 'सांगली (मसाला बाजार / तासगाव)',
          'Solapur': 'सोलापूर (सांगोला / बार्शी / पंढरपूर)',
          'Ahmednagar': 'अहमदनगर (राहाता / राहुरी / संगमनेर)',
          'Amravati': 'अमरावती (वरुड / धामणगाव)',
          'Akola': 'अकोला (अन्नधान्य व कडधान्य केंद्र)',
          'Nanded': 'नांदेड (अर्धापूर / देगलूर)',
          'Satara': 'सातारा (कराड / फलटण)',
          'Kolhapur': 'कोल्हापूर (वडगाव / शिरोळ)',
          'Dhule': 'धुळे (शिरपूर / साक्री)',
          'Nandurbar': 'नंदुरबार (मिरची यार्ड / शहादा)',
          'Beed': 'बीड (केज / धारूर / माजलगाव)',
          'Washim': 'वाशीम (वाशीम व कारंजा बाजार समिती)',
          'Palghar': 'पालघर (वाडा भात खरेदी केंद्र)',
          'Dharashiv': 'धाराशिव (उमरगा / कळंब)',
          'Chhatrapati Sambhajinagar': 'छत्रपती संभाजीनगर (पैठण / कन्नड)',
          'Hingoli': 'हिंगोली (वसमत हळद केंद्र)',
          'Wardha': 'वर्धा (हिंगणघाट कापूस बाजार)',
          'Ratnagiri': 'रत्नागिरी (हापूस आंबा केंद्र)',
          'Sindhudurg': 'सिंधुदुर्ग (देवगड हापूस यार्ड)',
          'Raigad': 'रायगड (अलिबाग बाजार समिती)'
        }
      };
      const map = DISTRICT_SELECT_MAP[lang] || DISTRICT_SELECT_MAP.en;
      Array.from(distSelect.options).forEach(opt => {
        if (map[opt.value]) {
          opt.text = map[opt.value];
        }
      });
    }

    // 5. Trigger Re-render of Dynamic Portal Views with Person, Crop, and Location translations
    if (typeof window.updateBuyerMarketStats === 'function') {
      window.updateBuyerMarketStats();
    }
    if (typeof window.renderVerifiedLots === 'function') {
      window.renderVerifiedLots();
    }
    if (typeof window.renderBuyerEmergencyDesk === 'function') {
      window.renderBuyerEmergencyDesk();
    }
    if (typeof window.renderBuyerDemands === 'function') {
      window.renderBuyerDemands();
    }
    if (typeof window.renderBuyerConsignments === 'function') {
      window.renderBuyerConsignments();
    }
    if (typeof window.renderBuyerEscrowVault === 'function') {
      window.renderBuyerEscrowVault();
    }
    if (typeof window.renderGrievances === 'function') {
      window.renderGrievances();
    }
    if (typeof window.renderProduceSelectorChips === 'function') {
      window.renderProduceSelectorChips();
    }
    if (typeof window.renderInsightChart === 'function') {
      window.renderInsightChart();
    }
    if (typeof window.renderInsightSummaryCards === 'function') {
      window.renderInsightSummaryCards();
    }
    if (typeof window.renderSupplyInflowHeatmap === 'function') {
      window.renderSupplyInflowHeatmap();
    }
    if (typeof window.renderAiProcurementAdvisories === 'function') {
      window.renderAiProcurementAdvisories();
    }
    if (typeof window.renderMaharashtraMandisTable === 'function') {
      window.renderMaharashtraMandisTable();
    }
    if (typeof window.recalculateBuyerCosts === 'function') {
      window.recalculateBuyerCosts();
    }

    // Dispatch global custom event for other listeners
    window.dispatchEvent(new CustomEvent('agrinex_language_changed', { detail: { lang: lang } }));

    // 6. User Feedback Notification Toast
    if (typeof window.showToast === 'function') {
      window.showToast(dict.toast_lang_updated, 'success');
    }
  }

  // Initialize Language on Startup
  function initBuyerI18n() {
    let saved = 'en';
    try {
      saved = localStorage.getItem(STORAGE_KEY) || 'en';
    } catch (e) {}
    setBuyerLanguage(saved);
  }

  // Export to Global Scope for Buyer Module
  window.AgriNexI18n = {
    t,
    tCrop,
    tPerson,
    tLocation,
    tGrade,
    tStatus,
    tText,
    setBuyerLanguage,
    getBuyerLanguage,
    toggleLanguageMenu,
    TRANSLATIONS
  };

  window.t = t;
  window.tCrop = tCrop;
  window.tPerson = tPerson;
  window.tLocation = tLocation;
  window.tGrade = tGrade;
  window.tStatus = tStatus;
  window.tText = tText;
  window.setBuyerLanguage = setBuyerLanguage;
  window.getBuyerLanguage = getBuyerLanguage;
  window.toggleLanguageMenu = toggleLanguageMenu;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBuyerI18n);
  } else {
    initBuyerI18n();
  }
})();
