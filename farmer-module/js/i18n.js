/**
 * AgriNex - Farmer Portal Multilingual Translation Engine (i18n)
 * Supported Languages:
 *  - en: English (Default)
 *  - hi: हिन्दी (Hindi)
 *  - mr: मराठी (Marathi)
 * Translates 100% of all UI text, stat cards, tabs, banners, person names, crop names, varieties, mandis, quality grades, and agricultural trading terms.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'agrinex_farmer_language';

  // 1. PERSON / FARMER / DRIVER / BUYER TRANSLATIONS
  const PERSON_MAP = {
    'Patil Rameshwar': { hi: 'पाटिल रामेश्वर', mr: 'पाटील रामेश्वर' },
    'Rameshwar Patil': { hi: 'पाटिल रामेश्वर', mr: 'पाटील रामेश्वर' },
    'Ramesh Patel': { hi: 'रमेश पटेल', mr: 'रमेश पटेल' },
    'Ramesh Kumar': { hi: 'रमेश कुमार', mr: 'रमेश कुमार' },
    'Karthik Sundaram': { hi: 'कार्तिक सुंदरम', mr: 'कार्तिक सुंदरम' },
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
    'Nitin Shinde': { hi: 'नितिन शिंदे', mr: 'नितीन शिंदे' },
    'Babasaheb Kale': { hi: 'बाबासाहेब काले', mr: 'बाबासाहेब काळे' },
    'Kishore Shinde': { hi: 'किशोर शिंदे', mr: 'किशोर शिंदे' },
    'Ganesh Chaudhari': { hi: 'गणेश चौधरी', mr: 'गणेश चौधरी' },
    'Dinesh Yadav': { hi: 'दिनेश यादव', mr: 'दिनेश यादव' },
    'Selvam': { hi: 'सेल्वम', mr: 'सेल्वम' }
  };

  // 2. COMPLETE CROP & COMMODITY & VARIETY FULL PHRASES (Plurals and Singles)
  const CROP_MAP = {
    // Exact Full Titles
    'Red Onion (Nashik Garwa Quality)': { hi: 'लाल प्याज (नासिक गरवा क्वालिटी)', mr: 'लाल कांदा (नाशिक गरवा प्रत)' },
    'Red Onion (Lasalgaon Garwa)': { hi: 'लाल प्याज (लासलगांव गरवा)', mr: 'लाल कांदा (लासलगाव गरवा)' },
    'Red Onion (Garwa Export)': { hi: 'लाल प्याज (गरवा निर्यात)', mr: 'लाल कांदा (गरवा निर्यात)' },
    'Red Onion (Nashik Export Grade)': { hi: 'लाल प्याज (नासिक निर्यात ग्रेड)', mr: 'लाल कांदा (नाशिक निर्यात प्रत)' },
    'Red Onion (Nashik Garwa)': { hi: 'लाल प्याज (नासिक गरवा)', mr: 'लाल कांदा (नाशिक गरवा)' },
    'Nashik Garwa Red Onion': { hi: 'नासिक गरवा लाल प्याज', mr: 'नाशिक गरवा लाल कांदा' },
    'Red Onion': { hi: 'लाल प्याज', mr: 'लाल कांदा' },
    'Garwa Red Onion': { hi: 'गरवा लाल प्याज', mr: 'गरवा लाल कांदा' },
    'Garwa Onion': { hi: 'गरवा प्याज', mr: 'गरवा कांदा' },
    'Onions': { hi: 'प्याज', mr: 'कांदा' },
    'Onion': { hi: 'प्याज', mr: 'कांदा' },

    'Tomato (Shivam / Abhinav Hybrid)': { hi: 'टमाटर (शिवम / अभिनव हाइब्रिड)', mr: 'टोमॅटो (शिवम / अभिनव संकरित)' },
    'Hybrid Tomato (Narayangaon / Junnar)': { hi: 'हाइब्रिड टमाटर (नारायणगांव / जुन्नर)', mr: 'संकरित टोमॅटो (नारायणगाव / जुन्नर)' },
    'Tomato (Shivam Hybrid)': { hi: 'टमाटर (शिवम हाइब्रिड)', mr: 'टोमॅटो (शिवम संकरित)' },
    'Tomato (Hybrid Red)': { hi: 'टमाटर (हाइब्रिड लाल)', mr: 'टोमॅटो (संकरित लाल)' },
    'Hybrid Tomato': { hi: 'हाइब्रिड टमाटर', mr: 'संकरित टोमॅटो' },
    'Salvage Tomatoes': { hi: 'बचाव टमाटर (इमर्जेंसी)', mr: 'त्वरित विक्री टोमॅटो' },
    'Tomatoes': { hi: 'टमाटर', mr: 'टोमॅटो' },
    'Tomato': { hi: 'टमाटर', mr: 'टोमॅटो' },

    'Grand Naine Banana (GI Khandesh Export)': { hi: 'ग्रैंड नैन केला (जीआई खानदेश निर्यात)', mr: 'ग्रँड नैन केळी (GI खान्देश निर्यात)' },
    'Grand Naine Banana (Jalgaon G9)': { hi: 'ग्रैंड नैन केला (जलगांव जी9)', mr: 'ग्रँड नैन केळी (जळगाव जी९)' },
    'Grand Naine Banana (Jalgaon)': { hi: 'ग्रैंड नैन केला (जलगांव)', mr: 'ग्रँड नैन केळी (जळगाव)' },
    'Grand Naine Banana': { hi: 'ग्रैंड नैन केला', mr: 'ग्रँड नैन केळी' },
    'Grand Naine Tissue Culture': { hi: 'ग्रैंड नैन टिशू कल्चर', mr: 'ग्रँड नैन उती संवर्धन' },
    'Bananas': { hi: 'केले', mr: 'केळी' },
    'Banana': { hi: 'केला', mr: 'केळी' },

    'Yellow Soybean (JS 335 / High Protein)': { hi: 'पीला सोयाबीन (जेएस 335 / उच्च प्रोटीन)', mr: 'पिवळी सोयाबीन (जेएस ३३५ / उच्च प्रथिने)' },
    'Yellow Soybean (Latur JS 335)': { hi: 'पीला सोयाबीन (लातूर जेएस 335)', mr: 'पिवळी सोयाबीन (लातूर जेएस ३३५)' },
    'Yellow Soybean': { hi: 'पीला सोयाबीन', mr: 'पिवळी सोयाबीन' },
    'Soybeans': { hi: 'सोयाबीन', mr: 'सोयाबीन' },
    'Soybean': { hi: 'सोयाबीन', mr: 'सोयाबीन' },
    'Soyabean': { hi: 'सोयाबीन', mr: 'सोयाबीन' },

    'Nagpur Orange / Santra (GI Vidarbha Quality)': { hi: 'नागपुर संतरा (जीआई विदर्भ क्वालिटी)', mr: 'नागपूर संत्री (GI विदर्भ दर्जा)' },
    'Nagpur Orange / Santra (Table Export Grade)': { hi: 'नागपुर संतरा (टेबल निर्यात)', mr: 'नागपूर संत्री (टेबल निर्यात)' },
    'Nagpur Orange': { hi: 'नागपुर संतरा', mr: 'नागपूर संत्री' },
    'Nagpur Santra': { hi: 'नागपुर संतरा', mr: 'नागपूर संत्री' },
    'Nagpur Santra Juicy Grade A': { hi: 'नागपुर संतरा रसीला ग्रेड ए', mr: 'नागपूर संत्री रसाळ प्रत ग्रेड अ' },
    'Oranges': { hi: 'संतरे', mr: 'संत्री' },
    'Orange': { hi: 'संतरा', mr: 'संत्री' },
    'Santra': { hi: 'संतरा', mr: 'संत्री' },

    'Sangli Rajapuri Turmeric Finger (High Curcumin)': { hi: 'सांगली राजापुरी हल्दी (उच्च करक्यूमिन)', mr: 'सांगली राजापुरी हळद (उच्च करक्युमिन)' },
    'Sangli Rajapuri Turmeric Finger': { hi: 'सांगली राजापुरी हल्दी फिंगर', mr: 'सांगली राजापुरी हळद कांडी' },
    'Sangli Rajapuri Turmeric': { hi: 'सांगली राजापुरी हल्दी', mr: 'सांगली राजापुरी हळद' },
    'Salem Finger (High Curcumin)': { hi: 'सलेम फिंगर (उच्च करक्यूमिन)', mr: 'सलेम हळद कांडी (उच्च करक्युमिन)' },
    'Turmeric Finger': { hi: 'हल्दी फिंगर (कांडी)', mr: 'हळद कांडी' },
    'Turmeric': { hi: 'हल्दी', mr: 'हळद' },

    'MCU-5 Raw Cotton (Amravati White Gold)': { hi: 'एमसीयू-5 कच्चा कपास (अमरावती सफेद सोना)', mr: 'एमसीयू-५ कच्चा कापूस (अमरावती पांढरे सोने)' },
    'Raw Cotton (Vidarbha Long Staple)': { hi: 'कच्चा कपास (विदर्भ लंबा स्टेपल)', mr: 'कच्चा कापूस (विदर्भ लांब धागा)' },
    'Raw Cotton (Vidarbha Staple)': { hi: 'कच्चा कपास (विदर्भ स्टेपल)', mr: 'कच्चा कापूस (विदर्भ स्टेपल)' },
    'MCU-5 Long Staple': { hi: 'एमसीयू-5 लंबा धागा (स्टेपल)', mr: 'एमसीयू-५ लांब धागा' },
    'Raw Cotton': { hi: 'कच्चा कपास', mr: 'कच्चा कापूस' },
    'Cotton': { hi: 'कपास', mr: 'कापूस' },

    'Thompson Seedless Grapes (Nashik Export Grade)': { hi: 'थॉमसन बीजहीन अंगूर (नासिक निर्यात ग्रेड)', mr: 'थॉमसन बिनबियांची द्राक्षे (नाशिक निर्यात प्रत)' },
    'Nashik Thompson Seedless Grapes': { hi: 'नासिक थॉमसन बीजहीन अंगूर', mr: 'नाशिक थॉमसन बिनबियांची द्राक्षे' },
    'Nashik Thompson Grapes': { hi: 'नासिक थॉमसन अंगूर', mr: 'नाशिक थॉमसन द्राक्षे' },
    'Thompson Seedless Export Grade': { hi: 'थॉमसन बीजहीन निर्यात ग्रेड', mr: 'थॉमसन बिनबियांची निर्यात प्रत' },
    'Thompson Seedless': { hi: 'थॉमसन बीजहीन', mr: 'थॉमसन बिनबियांची' },
    'Grapes': { hi: 'अंगूर', mr: 'द्राक्षे' },
    'Grape': { hi: 'अंगूर', mr: 'द्राक्षे' },

    'Bhagwa Pomegranate (Solapur Export Grade)': { hi: 'भगवा अनार (सोलापुर निर्यात ग्रेड)', mr: 'भगवा डाळिंब (सोलापूर निर्यात प्रत)' },
    'Bhagwa Pomegranate (Solapur)': { hi: 'भगवा अनार (सोलापुर)', mr: 'भगवा डाळिंब (सोलापूर)' },
    'Bhagwa Ruby Red': { hi: 'भगवा रूबी लाल', mr: 'भगवा रक्तवर्णी डाळिंब' },
    'Bhagwa Pomegranate': { hi: 'भगवा अनार', mr: 'भगवा डाळिंब' },
    'Pomegranates': { hi: 'अनार', mr: 'डाळिंब' },
    'Pomegranate': { hi: 'अनार', mr: 'डाळिंब' },

    'Devgad Alphonso Mango (GI Tagged Export)': { hi: 'देवगड हापुस आम (जीआई टैग)', mr: 'देवगड हापूस आंबा (GI प्रमाणित)' },
    'Ratnagiri Alphonso (Hapus) Mango': { hi: 'रत्नागिरी हापुस आम', mr: 'रत्नागिरी हापूस आंबा' },
    'Ratnagiri Alphonso (GI Tagged)': { hi: 'रत्नागिरी हापुस (जीआई टैग)', mr: 'रत्नागिरी हापूस (GI प्रमाणित)' },
    'Ratnagiri Alphonso Mango': { hi: 'रत्नागिरी हापुस आम', mr: 'रत्नागिरी हापूस आंबा' },
    'Alphonso Mango': { hi: 'हापुस आम', mr: 'हापूस आंबा' },
    'Mangoes': { hi: 'आम', mr: 'आंबे' },
    'Mangos': { hi: 'आम', mr: 'आंबे' },
    'Mango': { hi: 'आम', mr: 'आंबा' },

    'Green Chilli (G4 Spicy Dark Green)': { hi: 'हरी मिर्च (जी4 तीखी गहरी हरी)', mr: 'हिरवी मिरची (जी४ तिखट गडद हिरवी)' },
    'Green Chilli (G4 Spicy)': { hi: 'हरी मिर्च (जी4 तीखी)', mr: 'हिरवी मिरची (जी४ तिखट)' },
    'G4 Spicy Dark Green': { hi: 'जी4 तीखी गहरी हरी', mr: 'जी४ तिखट गडद हिरवी' },
    'Green Chillies': { hi: 'हरी मिर्च', mr: 'हिरवी मिरची' },
    'Green Chilli': { hi: 'हरी मिर्च', mr: 'हिरवी मिरची' },
    'Chilli (Nandurbar Dry Red Chilli)': { hi: 'नंदुरबार सूखी लाल मिर्च', mr: 'नंदुरबार सुकी लाल मिरची' },
    'Dry Red Chilli': { hi: 'सूखी लाल मिर्च', mr: 'सुकी लाल मिरची' },
    'Red Chilli': { hi: 'लाल मिर्च', mr: 'लाल मिरची' },
    'Chillies': { hi: 'मिर्च', mr: 'मिरची' },
    'Chilis': { hi: 'मिर्च', mr: 'मिरची' },
    'Chilli': { hi: 'मिर्च', mr: 'मिरची' },

    'Akola Desi Chana (Bengal Gram)': { hi: 'अकोला देसी चना', mr: 'अकोला देशी हरभरा' },
    'Digvijay Bold Grade A': { hi: 'दिग्विजय मोटा दाना ग्रेड ए', mr: 'दिग्विजय टपोरा दाणा ग्रेड अ' },
    'Chana (Bengal Gram)': { hi: 'चना (देसी चना)', mr: 'हरभरा (चना)' },
    'Desi Chana': { hi: 'देसी चना', mr: 'देशी हरभरा' },
    'Bengal Gram': { hi: 'देसी चना', mr: 'हरभरा' },
    'Chana': { hi: 'चना', mr: 'हरभरा' },

    'Wada Kolam Rice (Palghar GI Quality)': { hi: 'वाडा कोलम चावल (पालघर जीआई)', mr: 'वाडा कोलम भात/तांदूळ (पालघर GI प्रत)' },
    'Wada Kolam Rice (Palghar GI)': { hi: 'वाडा कोलम चावल (पालघर जीआई)', mr: 'वाडा कोलम भात (पालघर GI)' },
    'Wada Kolam Rice': { hi: 'वाडा कोलम चावल', mr: 'वाडा कोलम भात' },
    '1121 Paddy': { hi: '1121 धान', mr: '११२१ भात' },
    '1121 Basmati': { hi: '1121 बासमती धान', mr: '११२१ बासमती भात' },
    'Paddy (1121 Basmati)': { hi: 'धान (1121 बासमती)', mr: 'भात (११२१ बासमती)' },
    'Paddy': { hi: 'धान / चावल', mr: 'भात / तांदूळ' },
    'Rice': { hi: 'चावल', mr: 'तांदूळ' },

    'Sharbati Lokwan Golden Wheat': { hi: 'शरबती लोकवान सुनहरा गेहूं', mr: 'शरबती लोकवान सोनेरी गहू' },
    'Lokwan Wheat': { hi: 'लोकवान गेहूं', mr: 'लोकवान गहू' },
    'Wheat': { hi: 'गेहूं', mr: 'गहू' },

    'Solapur Maldandi Jowar (Sorghum)': { hi: 'सोलापुर मालदांडी ज्वार', mr: 'सोलापूर मालदांडी ज्वारी' },
    'Maldandi Jowar': { hi: 'मालदांडी ज्वार', mr: 'मालदांडी ज्वारी' },
    'Jowar': { hi: 'ज्वार', mr: 'ज्वारी' },
    'Sorghum': { hi: 'ज्वार', mr: 'ज्वारी' },

    'Dhule Hybrid Pearl Millet (Bajra)': { hi: 'धुले हाइब्रिड बाजरा', mr: 'धुळे संकरित बाजरी' },
    'Pearl Millet (Bajra)': { hi: 'बाजरा', mr: 'बाजरी' },
    'Pearl Millet': { hi: 'बाजरा', mr: 'बाजरी' },
    'Bajra': { hi: 'बाजरा', mr: 'बाजरी' },

    'Latur Red Tur (Pigeon Pea / Arhar)': { hi: 'लातूर लाल तूर (अरहर दाल)', mr: 'लातूर लाल तूर (अरहर)' },
    'Red Tur': { hi: 'लाल तूर', mr: 'लाल तूर' },
    'Tur': { hi: 'तूर दाल', mr: 'तूर डाळ' },
    'Arhar': { hi: 'अरहर दाल', mr: 'तूर डाळ' },

    'Jalgaon Shiny Green Mung Bean': { hi: 'जलगांव चमकदार हरा मूंग', mr: 'जळगाव चमकदार हिरवा मूग' },
    'Green Mung Bean': { hi: 'हरा मूंग', mr: 'हिरवा मूग' },
    'Mung Bean': { hi: 'मूंग दाल', mr: 'मूग' },
    'Mung': { hi: 'मूंग', mr: 'मूग' },

    'Nanded Black Urad Dal (Black Gram)': { hi: 'नांदेड काली उड़द दाल', mr: 'नांदेड काळी उडीद डाळ' },
    'Black Urad Dal': { hi: 'काली उड़द दाल', mr: 'काळी उडीद डाळ' },
    'Black Gram': { hi: 'उड़द', mr: 'उडीद' },
    'Urad': { hi: 'उड़द', mr: 'उडीद' },

    'Kolhapur Bold Groundnut (Peanut)': { hi: 'कोल्हापुर मोटा मूंगफली दाना', mr: 'कोल्हापूर टपोरी भुईमूग शेंग' },
    'Bold Groundnut': { hi: 'मोटा मूंगफली', mr: 'टपोरी भुईमूग' },
    'Groundnut (Peanut)': { hi: 'मूंगफली', mr: 'भुईमूग' },
    'Groundnut': { hi: 'मूंगफली', mr: 'भुईमूग' },
    'Peanut': { hi: 'मूंगफली', mr: 'भुईमूग' },

    'Beed High-Oil Sunflower Seeds': { hi: 'बीड उच्च तेल सूरजमुखी बीज', mr: 'बीड उच्च तेल सूर्यफूल बियाणे' },
    'Sunflower Seeds': { hi: 'सूरजमुखी बीज', mr: 'सूर्यफूल बियाणे' },
    'Sunflower': { hi: 'सूरजमुखी', mr: 'सूर्यफूल' },

    'Kolhapur Co 86032 Sugarcane': { hi: 'कोल्हापुर को 86032 गन्ना', mr: 'कोल्हापूर को ८६०३२ ऊस' },
    'Sugarcane': { hi: 'गन्ना', mr: 'ऊस' },

    'Jalna Sweet Lime (Mosambi)': { hi: 'जालना मौसंबी (मीठा नींबू)', mr: 'जालना मोसंबी' },
    'Sweet Lime (Mosambi)': { hi: 'मौसंबी', mr: 'मोसंबी' },
    'Mosambi': { hi: 'मौसंबी', mr: 'मोसंबी' },

    'Beed Balanagar Custard Apple (Sitaphal)': { hi: 'बीड बालनगर सीताफल', mr: 'बीड बाळानगर सीताफळ' },
    'Custard Apple (Sitaphal)': { hi: 'सीताफल', mr: 'सीताफळ' },
    'Custard Apple': { hi: 'सीताफल', mr: 'सीताफळ' },
    'Sitaphal': { hi: 'सीताफल', mr: 'सीताफळ' },

    'Maize (Yellow Corn / Makka)': { hi: 'मक्का (पीला भुट्टा / मकई)', mr: 'मका (पिवळा मका)' },
    'Yellow Corn': { hi: 'पीला मक्का', mr: 'पिवळा मका' },
    'Maize': { hi: 'मक्का', mr: 'मका' },
    'Corn': { hi: 'मक्का', mr: 'मका' },

    'Safflower (Kardi)': { hi: 'कुसुम (करडी)', mr: 'करडई (कुसुम)' },
    'Safflower': { hi: 'कुसुम / करडी', mr: 'करडई' },
    'Kardi': { hi: 'करडी', mr: 'करडई' },

    'Sesame (Til)': { hi: 'तिल', mr: 'तीळ' },
    'Sesame': { hi: 'तिल', mr: 'तीळ' },
    'Til': { hi: 'तिल', mr: 'तीळ' },

    'Guava (Sardar L-49 Sweet Guava)': { hi: 'अमरूद (सरदार एल-49 मीठा)', mr: 'पेरू (सरदार एल-४९ गोड पेरू)' },
    'Sweet Guava': { hi: 'मीठा अमरूद', mr: 'गोड पेरू' },
    'Guava': { hi: 'अमरूद', mr: 'पेरू' },

    'Potatoes': { hi: 'आलू', mr: 'बटाटा' },
    'Potato': { hi: 'आलू', mr: 'बटाटा' },
    'Bottle Gourd': { hi: 'लौकी', mr: 'दुधी भोपळा' },
    'Okra': { hi: 'भिंडी', mr: 'भेंडी' },
    'Bhindi': { hi: 'भिंडी', mr: 'भेंडी' },
    'Ladies Finger': { hi: 'भिंडी', mr: 'भेंडी' },
    'Brinjal': { hi: 'बैंगन', mr: 'वांगी' },
    'Eggplant': { hi: 'बैंगन', mr: 'वांगी' },
    'Cabbage': { hi: 'पत्तागोभी', mr: 'कोबी' },
    'Cauliflower': { hi: 'फूलगोभी', mr: 'फ्लॉवर' },
    'Carrot': { hi: 'गाजर', mr: 'गाजर' },
    'Garlic': { hi: 'लहसुन', mr: 'लसूण' },
    'Ginger': { hi: 'अदरक', mr: 'आले' },
    'Papaya': { hi: 'पपीता', mr: 'पपई' },
    'Coconut': { hi: 'नारियल', mr: 'नारळ' },
    'Watermelon': { hi: 'तरबूज', mr: 'कलिंगड' },
    'Melon': { hi: 'खरबूजा', mr: 'खरबूज' },
    'Spinach': { hi: 'पालक', mr: 'पालक' },
    'Cucumber': { hi: 'खीरा', mr: 'काकडी' },
    'Beetroot': { hi: 'चुकंदर', mr: 'बीट' },
    'Capsicum': { hi: 'शिमला मिर्च', mr: 'ढोबळी मिरची' },
    'Drumstick': { hi: 'सहजन (सहजन की फली)', mr: 'शेवगा' }
  };

  // 3. VARIETIES & DESCRIPTIVE QUALIFIERS (Sub-phrases & Tokens)
  const VARIETY_MAP = {
    'Shivam / Abhinav Hybrid': { hi: 'शिवम / अभिनव हाइब्रिड', mr: 'शिवम / अभिनव संकरित' },
    'Garwa Quality (Export Grade)': { hi: 'गरवा गुणवत्ता (निर्यात ग्रेड)', mr: 'गरवा प्रत (निर्यात दर्जा)' },
    'Garwa Quality': { hi: 'गरवा गुणवत्ता', mr: 'गरवा प्रत' },
    'Garwa Export': { hi: 'गरवा निर्यात', mr: 'गरवा निर्यात' },
    'Garwa': { hi: 'गरवा', mr: 'गरवा' },
    'G4 Spicy Dark Green': { hi: 'जी4 तीखी गहरी हरी', mr: 'जी४ तिखट गडद हिरवी' },
    'G4 Spicy': { hi: 'जी4 तीखी', mr: 'जी४ तिखट' },
    'MCU-5 Long Staple': { hi: 'एमसीयू-5 लंबा धागा (स्टेपल)', mr: 'एमसीयू-५ लांब धागा' },
    'Thompson Seedless Export Grade': { hi: 'थॉमसन बीजहीन निर्यात ग्रेड', mr: 'थॉमसन बिनबियांची निर्यात प्रत' },
    'Bhagwa Ruby Red': { hi: 'भगवा रूबी लाल', mr: 'भगवा रक्तवर्णी डाळिंब' },
    'JS 335 High Oil': { hi: 'जेएस 335 उच्च तेल', mr: 'जेएस ३३५ उच्च तेल' },
    'Ratnagiri Alphonso (GI Tagged)': { hi: 'रत्नागिरी हापुस (जीआई टैग)', mr: 'रत्नागिरी हापूस (GI प्रमाणित)' },
    'Digvijay Bold Grade A': { hi: 'दिग्विजय मोटा दाना ग्रेड ए', mr: 'दिग्विजय टपोरा दाणा ग्रेड अ' },
    'Salem Finger (High Curcumin)': { hi: 'सलेम फिंगर (उच्च करक्यूमिन)', mr: 'सलेम हळद कांडी (उच्च करक्युमिन)' },
    'Nagpur Santra Juicy Grade A': { hi: 'नागपुर संतरा रसीला ग्रेड ए', mr: 'नागपूर संत्री रसाळ प्रत ग्रेड अ' },
    'Grand Naine Tissue Culture': { hi: 'ग्रैंड नैन टिशू कल्चर', mr: 'ग्रँड नैन उती संवर्धन' },
    'Hybrid Red': { hi: 'हाइब्रिड लाल', mr: 'संकरित लाल' },
    'Shivam Hybrid': { hi: 'शिवम हाइब्रिड', mr: 'शिवम संकरित' },
    'Nashik Garwa': { hi: 'नासिक गरवा', mr: 'नाशिक गरवा' },
    'Nashik Export Grade': { hi: 'नासिक निर्यात ग्रेड', mr: 'नाशिक निर्यात प्रत' },
    'Long Staple': { hi: 'लंबा धागा (स्टेपल)', mr: 'लांब धागा' },
    'Ruby Red': { hi: 'रूबी लाल', mr: 'रक्तवर्णी / लाल' },
    'High Oil': { hi: 'उच्च तेल', mr: 'उच्च तेल' },
    'GI Tagged': { hi: 'जीआई टैग', mr: 'GI प्रमाणित' },
    'GI Tagged Export': { hi: 'जीआई निर्यात', mr: 'GI निर्यात' },
    'GI Quality': { hi: 'जीआई गुणवत्ता', mr: 'GI दर्जा' },
    'High Curcumin': { hi: 'उच्च करक्यूमिन', mr: 'उच्च करक्युमिन' },
    'High Protein': { hi: 'उच्च प्रोटीन', mr: 'उच्च प्रथिने' },
    'Tissue Culture': { hi: 'टिशू कल्चर', mr: 'उती संवर्धन (टिशू कल्चर)' },
    'Table Export Grade': { hi: 'टेबल निर्यात ग्रेड', mr: 'टेबल निर्यात प्रत' },
    'Juicy Grade A': { hi: 'रसीला ग्रेड ए', mr: 'रसाळ ग्रेड अ' },
    'Export Grade': { hi: 'निर्यात ग्रेड', mr: 'निर्यात प्रत' },
    'Export Quality': { hi: 'निर्यात गुणवत्ता', mr: 'निर्यात दर्जा' },
    'Bold Grade A': { hi: 'मोटा दाना ग्रेड ए', mr: 'टपोरा दाणा ग्रेड अ' },
    'Cleaned Yellow': { hi: 'साफ पीला', mr: 'स्वच्छ पिवळी' },
    'Double Polished': { hi: 'डबल पॉलिश', mr: 'डबल पॉलिश' },
    'Spicy Dark Green': { hi: 'तीखी गहरी हरी', mr: 'तिखट गडद हिरवी' },
    'Hybrid': { hi: 'हाइब्रिड', mr: 'संकरित' },
    'Seedless': { hi: 'बीजहीन', mr: 'बिनबियांची' }
  };

  // 4. MANDIS & APMC LOCATIONS
  const MANDI_MAP = {
    'Lasalgaon APMC Yard': { hi: 'लासलगांव एपीएमसी यार्ड', mr: 'लासलगाव बाजार समिती यार्ड' },
    'Lasalgaon APMC': { hi: 'लासलगांव मंडी', mr: 'लासलगाव बाजार समिती' },
    'Lasalgaon Mandi': { hi: 'लासलगांव मंडी', mr: 'लासलगाव मंडी' },
    'Pimpalgaon Baswant APMC': { hi: 'पिंपलगांव बसवंत एपीएमसी', mr: 'पिंपळगाव बसवंत बाजार समिती' },
    'Pimpalgaon APMC': { hi: 'पिंपलगांव मंडी', mr: 'पिंपळगाव बाजार समिती' },
    'Sinnar Agro Hub': { hi: 'सिन्नर एग्रो हब', mr: 'सिन्नर कृषी केंद्र' },
    'Amravati Textile APMC': { hi: 'अमरावती टेक्सटाइल एपीएमसी', mr: 'अमरावती कापूस बाजार समिती' },
    'Latur APMC Yard': { hi: 'लातूर एपीएमसी यार्ड', mr: 'लातूर बाजार समिती यार्ड' },
    'Sangola APMC Yard': { hi: 'सांगोला एपीएमसी यार्ड', mr: 'सांगोला बाजार समिती यार्ड' },
    'Sangli Spices APMC': { hi: 'सांगली मसाला एपीएमसी', mr: 'सांगली हळद व मसाला बाजार समिती' },
    'Nagpur APMC Central Market': { hi: 'नागपुर एपीएमसी मुख्य बाजार', mr: 'नागपूर मुख्य बाजार समिती' },
    'Raver APMC Yard': { hi: 'रावेर एपीएमसी यार्ड', mr: 'रावेर केळी बाजार समिती यार्ड' },
    'Raver APMC Hub': { hi: 'रावेर एपीएमसी हब', mr: 'रावेर बाजार समिती केंद्र' },
    'Devgad Coastal APMC': { hi: 'देवगड तटीय एपीएमसी', mr: 'देवगड हापूस बाजार समिती' },
    'Akola APMC Market': { hi: 'अकोला एपीएमसी बाजार', mr: 'अकोला बाजार समिती' },
    'Vashi Wholesale APMC': { hi: 'वाशी थोक एपीएमसी (नवी मुंबई)', mr: 'वाशी मुख्य बाजार समिती (नवी मुंबई)' },
    'Vashi APMC Market': { hi: 'वाशी एपीएमसी बाजार', mr: 'वाशी बाजार समिती' },
    'Gultekdi APMC': { hi: 'गुलटेकड़ी एपीएमसी (पुणे)', mr: 'गुलटेकडी बाजार समिती (पुणे)' },
    'Narayangaon Mandi Yard': { hi: 'नारायणगांव मंडी यार्ड', mr: 'नारायणगाव बाजार समिती यार्ड' },
    'Surat APMC': { hi: 'सूरत एपीएमसी मंडी', mr: 'सुरत बाजार समिती' }
  };

  // 5. DISTRICTS & STATES
  const DISTRICT_MAP = {
    'Nashik': { hi: 'नासिक', mr: 'नाशिक' },
    'Pune': { hi: 'पुणे', mr: 'पुणे' },
    'Jalgaon': { hi: 'जलगांव', mr: 'जळगाव' },
    'Latur': { hi: 'लातूर', mr: 'लातूर' },
    'Solapur': { hi: 'सोलापुर', mr: 'सोलापूर' },
    'Nagpur': { hi: 'नागपुर', mr: 'नागपूर' },
    'Amravati': { hi: 'अमरावती', mr: 'अमरावती' },
    'Sangli': { hi: 'सांगली', mr: 'सांगली' },
    'Ratnagiri': { hi: 'रत्नागिरी', mr: 'रत्नागिरी' },
    'Sindhudurg': { hi: 'सिंधुदुर्ग', mr: 'सिंधुदुर्ग' },
    'Akola': { hi: 'अकोला', mr: 'अकोला' },
    'Kolhapur': { hi: 'कोल्हापुर', mr: 'कोल्हापूर' },
    'Ahmednagar': { hi: 'अहमदनगर', mr: 'अहमदनगर' },
    'Satara': { hi: 'सातारा', mr: 'सातारा' },
    'Jalna': { hi: 'जालना', mr: 'जालना' },
    'Beed': { hi: 'बीड', mr: 'बीड' },
    'Nanded': { hi: 'नांदेड', mr: 'नांदेड' },
    'Dhule': { hi: 'धुले', mr: 'धुळे' },
    'Nandurbar': { hi: 'नंदुरबार', mr: 'नंदुरबार' },
    'Palghar': { hi: 'पालघर', mr: 'पालघर' },
    'Junnar': { hi: 'जुन्नर', mr: 'जुन्नर' },
    'Aurangabad': { hi: 'छत्रपति संभाजीनगर', mr: 'छत्रपती संभाजीनगर' },
    'Chhatrapati Sambhajinagar': { hi: 'छत्रपति संभाजीनगर', mr: 'छत्रपती संभाजीनगर' },
    'Maharashtra': { hi: 'महाराष्ट्र', mr: 'महाराष्ट्र' },
    'Gujarat': { hi: 'गुजरात', mr: 'गुजरात' },
    'Karnataka': { hi: 'कर्नाटक', mr: 'कर्नाटक' },
    'Tamil Nadu': { hi: 'तमिलनाडु', mr: 'तमिळनाडू' },
    'Madhya Pradesh': { hi: 'मध्य प्रदेश', mr: 'मध्य प्रदेश' }
  };

  // 6. CATEGORIES
  const CATEGORY_MAP = {
    'Vegetables': { hi: 'सब्जियां', mr: 'भाजीपाला' },
    'Fruits': { hi: 'फल', mr: 'फळे' },
    'Grains & Cereals': { hi: 'अनाज और दालें', mr: 'धान्य आणि कडधान्ये' },
    'Spices & High-Value': { hi: 'मसाले और नकदी फसलें', mr: 'मसाले व उच्च मूल्य पिके' },
    'Cash Crops': { hi: 'नकदी फसलें', mr: 'नगदी पिके' },
    'Pulses & Legumes': { hi: 'दालें और दलहन', mr: 'कडधान्ये व डाळी' },
    'Oilseeds': { hi: 'तिलहन', mr: 'गळीत धान्य (तेलबिया)' },
    'Grains': { hi: 'अनाज', mr: 'धान्य' },
    'Spices': { hi: 'मसाले', mr: 'मसाले' }
  };

  // 7. QUALITY GRADES & LOT STATUSES
  const GRADE_MAP = {
    'Grade A Export Calibrated (Brix >18°)': { hi: 'ग्रेड ए निर्यात कैलिब्रेटेड (ब्रिक्स >18°)', mr: 'ग्रेड अ निर्यात प्रमाणित (ब्रिक्स >१८°)' },
    'Grade A Export Calibrated': { hi: 'ग्रेड ए निर्यात कैलिब्रेटेड', mr: 'ग्रेड अ निर्यात प्रमाणित' },
    'Grade A Export Quality': { hi: 'ग्रेड ए निर्यात गुणवत्ता', mr: 'ग्रेड अ निर्यात दर्जा' },
    'Grade A Table / Export': { hi: 'ग्रेड ए टेबल / निर्यात', mr: 'ग्रेड अ टेबल / निर्यात' },
    'Double Polished Export Grade': { hi: 'डबल पॉलिश निर्यात ग्रेड', mr: 'डबल पॉलिश निर्यात दर्जा' },
    'Grade A (250g+ Calibrated)': { hi: 'ग्रेड ए (250ग्रा+ कैलिब्रेटेड)', mr: 'ग्रेड अ (२५०ग्रॅम+ डाळिंब)' },
    'Grade A 55mm+ Bold': { hi: 'ग्रेड ए 55मिमी+ बोल्ड', mr: 'ग्रेड अ ५५मिमी+ जाड कांदा' },
    'Grade A 29mm+ Staple': { hi: 'ग्रेड ए 29मिमी+ लंबा स्टेपल', mr: 'ग्रेड अ २९मिमी+ लांब धागा' },
    'Grade A Staple >29mm': { hi: 'ग्रेड ए स्टेपल >29मिमी', mr: 'ग्रेड अ लांब धागा >२९मिमी' },
    'Grade A 250g+ Calibrated': { hi: 'ग्रेड ए 250ग्रा+ कैलिब्रेटेड', mr: 'ग्रेड अ २५०ग्रॅम+ डाळिंब' },
    'Grade A Cleaned Yellow': { hi: 'ग्रेड ए स्वच्छ पीला', mr: 'ग्रेड अ स्वच्छ पिवळी' },
    'Grade A Bold Grain': { hi: 'ग्रेड ए मोटा दाना', mr: 'ग्रेड अ टपोरा दाणा' },
    'Grade A Double Polished': { hi: 'ग्रेड ए डबल पॉलिश', mr: 'ग्रेड अ डबल पॉलिश हळद' },
    'Grade A Juicy Calibrated': { hi: 'ग्रेड ए रसीला संतरा', mr: 'ग्रेड अ रसाळ संत्री' },
    'Grade A Aged Aromatic': { hi: 'ग्रेड ए सुगंधित परिपक्व', mr: 'ग्रेड अ सुवासिक जुना तांदूळ' },
    'Grade A Bold White': { hi: 'ग्रेड ए सफेद मोटा दाना', mr: 'ग्रेड अ पांढरा टपोरा दाणा' },
    'Grade A Machine Cleaned': { hi: 'ग्रेड ए मशीन से साफ', mr: 'ग्रेड अ यंत्राने स्वच्छ' },
    'Grade A+ Luster Golden': { hi: 'ग्रेड ए+ चमकदार सुनहरा', mr: 'ग्रेड अ+ चमकदार सोनेरी' },
    'Grade A Maruti Premium': { hi: 'ग्रेड ए मारुति प्रीमियम', mr: 'ग्रेड अ मारुती प्रीमियम' },
    'Grade A Bold Digvijay': { hi: 'ग्रेड ए मोटा दिग्विजय चना', mr: 'ग्रेड अ टपोरा दिग्विजय हरभरा' },
    'Grade A Bold Luster': { hi: 'ग्रेड ए चमकदार मोटा दाना', mr: 'ग्रेड अ चमकदार टपोरा दाणा' },
    'Grade A Machine Polished': { hi: 'ग्रेड ए मशीन पॉलिश', mr: 'ग्रेड अ यंत्र पॉलिश' },
    'Grade A Bold 80/90 Count': { hi: 'ग्रेड ए मोटा 80/90 काउंट', mr: 'ग्रेड अ टपोरा ८०/९० काउंट' },
    'Grade A Oil >40%': { hi: 'ग्रेड ए तेल >40%', mr: 'ग्रेड अ तेल >४०%' },
    'Grade A High-Brix (>21°)': { hi: 'ग्रेड ए उच्च-ब्रिक्स (>21°)', mr: 'ग्रेड अ उच्च-ब्रिक्स (>२१°)' },
    'GI Tagged Export Grade (220g+)': { hi: 'जीआई टैग निर्यात ग्रेड (220ग्रा+)', mr: 'GI प्रमाणित निर्यात प्रत (२२०ग्रॅम+)' },
    'Grade A Premium Pulp (300g+)': { hi: 'ग्रेड ए प्रीमियम गूदा (300ग्रा+)', mr: 'ग्रेड अ प्रीमियम गर (३००ग्रॅम+)' },
    'Grade A Hybrid Feed Grade': { hi: 'ग्रेड ए हाइब्रिड फीड ग्रेड', mr: 'ग्रेड अ संकरित पशुखाद्य दर्जा' },
    'High-Oil Cold Press Grade': { hi: 'उच्च तेल कोल्ड प्रेस ग्रेड', mr: 'उच्च तेल कोल्ड प्रेस प्रत' },
    'Natural White Bold Export Calibrated': { hi: 'प्राकृतिक सफेद मोटा निर्यात कैलिब्रेटेड', mr: 'नैसर्गिक पांढरा टपोरा निर्यात प्रत' },
    'Teja High-Pungency Sun-Dried': { hi: 'तेजा उच्च तीखा धूप में सुखाया', mr: 'तेजा अति-तिखट उन्हात वाळवलेली' },
    'Table Grade Extra Sweet': { hi: 'टेबल ग्रेड अतिरिक्त मीठा', mr: 'टेबल प्रत अति गोड' },
    'Grade A (Premium Export / Retail)': { hi: 'ग्रेड ए (प्रीमियम निर्यात / खुदरा)', mr: 'ग्रेड अ (प्रीमियम निर्यात / किरकोळ)' },
    'Grade B (Standard Market)': { hi: 'ग्रेड बी (मानक बाजार)', mr: 'ग्रेड ब (सर्वसाधारण बाजार)' },
    'Grade C (Processing Grade)': { hi: 'ग्रेड सी (प्रसंस्करण ग्रेड)', mr: 'ग्रेड क (प्रक्रिया दर्जा)' },
    'Grade A': { hi: 'ग्रेड ए (सर्वोत्तम)', mr: 'ग्रेड अ (उत्कृष्ट)' },
    'Grade B': { hi: 'ग्रेड बी (मध्यम)', mr: 'ग्रेड ब (मध्यम)' },
    'Grade C': { hi: 'ग्रेड सी (साधारण)', mr: 'ग्रेड क (साधारण)' }
  };

  const STATUS_MAP = {
    'Active (Bids Open)': { hi: 'सक्रिय (बोलियां खुली हैं)', mr: 'सक्रिय (बोली सुरू आहे)' },
    'Verified & Ready': { hi: 'सत्यापित और तैयार', mr: 'तपासलेले आणि तयार' },
    'Pending Inspection': { hi: 'निरीक्षण लंबित', mr: 'तपासणी बाकी' },
    'Sold & Locked in Escrow': { hi: 'बिक्री संपन्न (एस्क्रो लॉक)', mr: 'विक्री पूर्ण (एस्क्रो सुरक्षित)' },
    'In Transit': { hi: 'मार्ग में (ट्रांजिट)', mr: 'वाहतुकीत (मार्गावर)' },
    'Delivered': { hi: 'वितरित (डिलीवर)', mr: 'पोहोचवले (डिलिव्हर)' },
    'Payment Released': { hi: 'भुगतान जारी', mr: 'रक्कम जमा झाली' },
    'Bids Open': { hi: 'बोलियां खुली हैं', mr: 'बोली सुरू आहे' },
    'Negotiation': { hi: 'बातचीत जारी', mr: 'चर्चा सुरू आहे' },
    'Dispatched': { hi: 'भेज दिया गया', mr: 'रवाना झाले' },
    'Open': { hi: 'सक्रिय', mr: 'सुरू' },
    'Full': { hi: 'पूर्ण (फुल)', mr: 'पूर्ण' }
  };

  // 8. UI PHRASE REPLACEMENTS (High Precision Ordering - Longest Strings First)
  const RAW_PHRASES = [
    // Long Sentences & Paragraphs
    ['Got perishable produce nearing shelf life (Tomatoes, Chillies)? Click 🚨 Emergency Sale on any lot to broadcast to verified food processing plants & institutional caterers for instant payout.', 'क्या आपके पास जल्दी खराब होने वाली फसलें (टमाटर, मिर्च) हैं? किसी भी लॉट पर 🚨 संकटकालीन त्वरित बिक्री पर क्लिक करें और तत्काल भुगतान के लिए खाद्य प्रसंस्करण व कैटरर्स को भेजें।', 'तुमच्याकडे नाशवंत शेतमाल (टोमॅटो, मिरची) शिल्लक आहे का? तात्काळ रकमेसाठी कोणत्याही लॉटवर 🚨 तातडीची संकट विक्री वर क्लिक करा व फूड प्रोसेसिंग प्लांट्सना पाठवा.'],
    ['Got perishable produce nearing shelf life (Tomatoes, Chillies)? Click', 'क्या आपके पास जल्दी खराब होने वाली फसलें (टमाटर, मिर्च) हैं? क्लिक करें', 'तुमच्याकडे नाशवंत शेतमाल (टोमॅटो, मिरची) शिल्लक आहे का? क्लिक करा'],
    ['on any lot to broadcast to verified food processing plants & institutional caterers for instant payout.', 'किसी भी लॉट पर क्लिक करें और तत्काल भुगतान के लिए खाद्य प्रसंस्करण व कैटरर्स को भेजें।', 'वर क्लिक करा व फूड प्रोसेसिंग प्लांट्सना पाठवा.'],
    ['Got perishable produce nearing shelf life', 'क्या आपके पास जल्दी खराब होने वाली फसलें हैं', 'तुमच्याकडे नाशवंत शेतमाल शिल्लक आहे का'],
    ['Instant Breakeven Salvage: Guaranteed ~75% floor recovery via Food Processors & Caterers', 'त्वरित न्यूनतम मूल्य बचाव: खाद्य प्रसंस्करण और कैटरर्स के माध्यम से ~75% मूल्य वसूली', 'तातडीची संकट विक्री: फूड प्रोसेसर्स व केटरर्सद्वारे ~७५% हमीभाव प्राप्ती'],
    ['Guaranteed ~75% floor recovery via Food Processors & Caterers', 'खाद्य प्रसंस्करण और कैटरर्स के माध्यम से ~75% मूल्य वसूली', 'फूड प्रोसेसर्स व केटरर्सद्वारे ~७५% हमीभाव प्राप्ती'],
    ['Direct price offers from verified buyers for your produce', 'आपकी उपज के लिए सत्यापित खरीदारों से सीधे मूल्य प्रस्ताव', 'तुमच्या शेतमालासाठी प्रमाणित खरेदीदारांकडून थेट दर ऑफर्स'],
    ['Market trend is positive. Wholesale arrivals down 14%, prices are expected to rise steadily in the next 7 days.', 'बाजार का रुख सकारात्मक है। थोक आवक 14% घटी है, अगले 7 दिनों में भाव बढ़ने की संभावना है।', 'बाजार कल तेजीचा आहे. घाऊक आवक १४% कमी झाली असून पुढील ७ दिवसांत भाव वाढण्याची शक्यता आहे.'],
    ['Across Maharashtra APMC terminals over next 3–5 days', 'अगले 3-5 दिनों में महाराष्ट्र की प्रमुख मंडियों में', 'पुढील ३-५ दिवसांत महाराष्ट्रातील प्रमुख बाजारांत'],
    ['Local Mandi is optimal; no regional arbitrage spread exceeds transit costs.', 'स्थानीय मंडी सर्वोत्तम है; किसी बाहरी मंडी में भाड़ा निकालकर अतिरिक्त लाभ नहीं है।', 'स्थानिक बाजार समिती सर्वोत्तम आहे; इतर बाजारातील भाववाढ वाहतूक खर्चापेक्षा कमी आहे.'],
    ['Prices projected to gain +13.7% over 7 days due to tightening arrivals.', 'आवक कम होने के कारण 7 दिनों में भाव में +13.7% की बढ़त की संभावना है।', 'आवक घटल्याने पुढील ७ दिवसांत भावात +१३.७% वाढ अपेक्षित आहे.'],
    ['Direct pickup arranged by AgriNex Logistics from your nearest mandi.', 'आपकी निकटतम मंडी से एग्रीनेक्स लॉजिस्टिक्स द्वारा सीधा पिकअप।', 'तुमच्या जवळच्या बाजार समितीमधून अ‍ॅग्रीनेक्सद्वारे थेट वाहतूक.'],
    ['35% Advance Escrow locked immediately upon pool completion.', 'पूल पूरा होते ही 35% अग्रिम राशि तुरंत एस्क्रो में लॉक की जाती है।', 'संकलन पूर्ण होताच ३५% अ‍ॅडव्हान्स रक्कम लगेच एस्क्रोमध्ये सुरक्षित होते.'],
    ['No intermediary middleman cuts — 100% contract rate paid to your bank account.', 'कोई बिचौलिया या दलाल नहीं — पूरा 100% अनुबंध मूल्य सीधे आपके बैंक खाते में।', 'कोणतीही दलाली नाही — १००% संपूर्ण करार भाव थेट तुमच्या बँक खात्यात.'],
    ['An individual farmer cannot supply', 'एक अकेला किसान आपूर्ति नहीं कर सकता', 'एकटा शेतकरी पुरवठा करू शकत नाही'],
    ['alone. By contributing your crop into this collective FPO batch, your volume gets aggregated with other farmers and sold at institutional premium rates.', 'अकेले। अपनी फसल को इस सामूहिक एफपीओ बैच में शामिल करके, आपकी मात्रा अन्य किसानों के साथ जुड़ जाती है और प्रीमियम दरों पर बेची जाती है।', 'एकटे. या सामूहिक एफपीओ गटामध्ये शेतमाल देऊन, तुमचा माल इतर शेतकऱ्यांसोबत एकत्र केला जातो आणि चांगल्या भावात विकला जातो.'],
    ['Synced APMC yards across Nashik, Lasalgaon, Pune, Solapur & Latur.', 'नासिक, लासलगांव, पुणे, सोलापुर और लातूर मंडियों से सिंक किया गया।', 'नाशिक, लासलगाव, पुणे, सोलापूर आणि लातूर बाजार समित्यांचे भाव जुळवले.'],
    ['Live Maharashtra Mandi Rates Updated!', 'लाइव महाराष्ट्र मंडी दर अपडेट हो गए!', 'महाराष्ट्रातील थेट बाजार भाव अपडेट झाले!'],
    ['7-Day Forward Price Projections (In ₹ per kg)', '7-दिवसीय अग्रिम मूल्य अनुमान (₹ प्रति किलो में)', '७ दिवसांचे अंदाजित भाव (₹ प्रति किलोमध्ये)'],
    ['Best Mandis to Sell (After Transport Cost)', 'माल बेचने के लिए सर्वश्रेष्ठ मंडियां (भाड़ा खर्च काटकर)', 'माल विकण्यासाठी सर्वोत्तम बाजार (वाहतूक खर्च वजा जाता)'],
    ['Live Agmarknet (data.gov.in) API Feed', 'लाइव एगमार्कनेट (data.gov.in) सरकारी डेटा', 'थेट अ‍ॅगमार्कनेट (data.gov.in) सरकारी दर'],
    ['Verified feeds from Agmarknet API (data.gov.in) & e-NAM Mandis', 'एगमार्कनेट और ई-नाम सत्यापित सरकारी मंडी डेटा', 'अ‍ॅगमार्कनेट आणि ई-नाम प्रमाणित अधिकृत डेटा'],
    ['Official APMC Mandi Data (data.gov.in)', 'आधिकारिक एपीएमसी मंडी डेटा (data.gov.in)', 'अधिकृत कृषी उत्पन्न बाजार समिती डेटा'],
    ['Solid Green: Past 7 Days Actual Price', 'ठोस हरा: पिछले 7 दिनों का वास्तविक मूल्य', 'हिरवी रेषा: मागील ७ दिवसांचे प्रत्यक्ष भाव'],
    ['Dashed Blue: Next 7 Days Forecast', 'नीली बिंदीदार: अगले 7 दिनों का पूर्वानुमान', 'निळी डॅश रेषा: पुढील ७ दिवसांचा अंदाज'],
    ['Clear daily prices in', 'स्पष्ट दैनिक मूल्य', 'स्पष्ट दैनिक दर'],
    ['with simple 7-day forward Expected price trends.', 'सरल 7-दिवसीय अपेक्षित मूल्य रुझान के साथ।', 'सरल ७ दिवसांच्या अंदाजित भावासह.'],

    // Stat Cards & Headers
    ['Total Crop Lots', 'कुल फसल लॉट', 'एकूण पीक लॉट्स'],
    ['Active listings', 'सक्रिय लिस्टिंग', 'सक्रिय लॉट्स'],
    ['Active Bids', 'सक्रिय बोलियां', 'सक्रिय बोली'],
    ['Buyers interested', 'इच्छुक खरीदार', 'उत्सुक खरेदीदार'],
    ['Pending Shipments', 'लंबित शिपमेंट', 'प्रलंबित वाहतूक'],
    ['In transit', 'मार्ग में (ट्रांजिट)', 'वाहतुकीत (मार्गावर)'],
    ['Estimated Profit', 'अनुमानित लाभ', 'अंदाजित नफा'],
    ['(After transport & charges)', '(परिवहन और शुल्क काटकर)', '(वाहतूक व खर्च वजा जाता)'],
    ['After transport & charges', 'परिवहन और शुल्क काटकर', 'वाहतूक व खर्च वजा जाता'],

    // Sections, Tabs & Banners
    ['My Crop Listings (Produce)', 'मेरी फसल लिस्टिंग (उपज)', 'माझी पीक नोंदणी (शेतमाल)'],
    ['My Crop Listings', 'मेरी फसल लिस्टिंग', 'माझी पीक नोंदणी'],
    ['Crop Listings', 'फसल लिस्टिंग', 'पीक नोंदणी'],
    ['+ Add New Lot', '+ नया लॉट जोड़ें', '+ नवीन लॉट जोडा'],
    ['Add New Lot', 'नया लॉट जोड़ें', 'नवीन लॉट जोडा'],
    ['View All', 'सभी देखें', 'सर्व पहा'],
    ['All Crops', 'सभी फसलें', 'सर्व पिके'],
    ['Emergency Salvage Protocol Ready', 'संकटकालीन त्वरित बिक्री प्रोटोकॉल तैयार', 'तातडीची संकट विक्री यंत्रणा सज्ज'],
    ['Emergency Salvage Active', 'संकटकालीन त्वरित बिक्री सक्रिय', 'तातडीची संकट विक्री सुरू'],
    ['Emergency Salvage', 'संकटकालीन त्वरित बिक्री', 'तातडीची संकट विक्री'],
    ['Instant Breakeven Salvage:', 'त्वरित न्यूनतम मूल्य बचाव:', 'तातडीची संकट विक्री:'],
    ['Instant Breakeven Salvage', 'त्वरित न्यूनतम मूल्य बचाव', 'तातडीची संकट विक्री'],
    ['Salvage Tomatoes (50 Qt)', 'बचाव टमाटर (50 क्विंटल)', 'त्वरित विक्री टोमॅटो (५० क्विंटल)'],
    ['Salvage Tomatoes', 'बचाव टमाटर', 'त्वरित विक्री टोमॅटो'],
    ['Emergency Distress Sale', 'आपातकालीन संकट बिक्री', 'तातडीची संकट विक्री'],
    ['Emergency Sale', 'संकटकालीन त्वरित बिक्री', 'तातडीची संकट विक्री'],
    ['⚡ Emergency Eligible', '⚡ संकटकालीन पात्र', '⚡ तातडीच्या विक्रीस पात्र'],
    ['⚡ Active Salvage Bids', '⚡ सक्रिय बचाव बोलियां', '⚡ सक्रिय मदत बोली'],

    // Navigation & Portals
    ['FARMER PORTAL', 'किसान पोर्टल', 'शेतकरी पोर्टल'],
    ['Dashboard', 'डैशबोर्ड', 'डॅशबोर्ड'],
    ['My Crops & Lots', 'मेरी फसलें और लॉट', 'माझी पिके आणि लॉट्स'],
    ['Market Insights', 'बाजार अंतर्दृष्टि', 'बाजार भाव व अंदाज'],
    ['FPO Hub', 'एफपीओ हब', 'एफपीओ केंद्र'],
    ['Bids & Offers', 'बोलियां और प्रस्ताव', 'बोली आणि ऑफर्स'],
    ['Orders & Shipments', 'ऑर्डर और शिपमेंट', 'ऑर्डर्स आणि वाहतूक'],
    ['Escrow Tracking', 'एस्क्रो ट्रैकिंग', 'एस्क्रो ट्रॅकिंग (पेमेंट)'],
    ['Profit Calculator', 'लाभ कैलकुलेटर', 'नफा कॅल्क्युलेटर'],
    ['Grievance Module', 'शिकायत निवारण', 'तक्रार निवारण कक्ष'],
    ['Grievance Desk', 'शिकायत डेस्क', 'तक्रार निवारण'],
    ['Verified Farmer', 'सत्यापित किसान', 'प्रमाणित शेतकरी'],

    // Top Bar & Controls
    ['List New Crop Lot', '+ नया फसल लॉट जोड़ें', '+ नवीन पीक लॉट जोडा'],
    ['List New Crop', '+ नई फसल जोड़ें', '+ नवीन पीक जोडा'],
    ['Update Rates', 'दर अपडेट करें', 'दर अपडेट करा'],
    ['Change Language', 'भाषा बदलें', 'भाषा बदला'],
    ['Support', 'मदद', 'मदत'],
    ['Search crop lots, mandi rates, buyer bids, orders...', 'फसल लॉट, मंडी भाव, खरीदार बोली, ऑर्डर खोजें...', 'पीक लॉट्स, बाजार भाव, खरेदीदार बोली शोधा...'],
    ['Search vegetable, commodity, APMC mandi, state...', 'सब्जी, फसल, एपीएमसी मंडी, राज्य खोजें...', 'भाजीपाला, पीक, बाजार समिती, जिल्हा शोधा...'],
    ['Search crops, lots, buyers...', 'फसल, लॉट, खरीदार खोजें...', 'पिके, लॉट्स, खरेदीदार शोधा...'],
    ['Maharashtra Hubs', 'महाराष्ट्र मंडी हब', 'महाराष्ट्र केंद्रे'],
    ['National Benchmark', 'राष्ट्रीय बेंचमार्क', 'राष्ट्रीय बाजार'],
    ['All Mandis', 'सभी मंडियां', 'सर्व बाजार समित्या'],

    // Forecast & Table Headers
    ['Price Forecast & Insights', 'मूल्य पूर्वानुमान और अंतर्दृष्टि', 'भाव अंदाज आणि विश्लेषण'],
    ['Next 7 days forecast', 'अगले 7 दिनों का पूर्वानुमान', 'पुढील ७ दिवसांचा अंदाज'],
    ['View Detailed Forecast', 'विस्तृत पूर्वानुमान देखें', 'सविस्तर अंदाज पहा'],
    ['Live Mandi Prices', 'लाइव मंडी भाव', 'थेट बाजार भाव'],
    ['Current Price (₹/kg & ₹/Qt)', 'वर्तमान दर (₹/किलो और ₹/क्विंटल)', 'सध्याचा दर (₹/किलो आणि ₹/क्विंटल)'],
    ['Current Price', 'वर्तमान दर', 'सध्याचा दर'],
    ['7 Day Trend', '7-दिवसीय रुझान', '७ दिवसांचा भाव कल'],
    ['PRODUCE', 'फसल / उपज', 'पीक / शेतमाल'],
    ['GRADE', 'ग्रेड / गुणवत्ता', 'प्रत / दर्जा'],
    ['MANDI / LOCATION', 'मंडी / स्थान', 'बाजार समिती / ठिकाण'],
    ['RATE (PER KG)', 'दर (प्रति किलो)', 'दर (प्रति किलो)'],
    ['RATE (PER QT)', 'दर (प्रति क्विंटल)', 'दर (प्रति क्विंटल)'],
    ['CHANGE (1W)', 'बदलाव (1 सप्ताह)', 'बदल (१ आठवडा)'],
    ['TREND SPARK', 'रुझान ग्राफ', 'भाव आलेख'],
    ['BEST OPTION', 'विकल्प', 'पर्याय'],
    ['View Sheet', 'विवरण पत्र', 'तपशील पहा'],
    ['DESTINATION MANDI', 'गंतव्य मंडी', 'गंतव्य बाजार समिती'],
    ['DISTANCE', 'दूरी', 'अंतर'],
    ['MODAL RATE (KG / QT)', 'मॉडल दर (किलो / क्विंटल)', 'सरासरी दर (किलो / क्विंटल)'],
    ['FREIGHT COST', 'परिवहन भाड़ा', 'वाहतूक खर्च'],
    ['NET SPREAD / GAIN', 'शुद्ध अतिरिक्त लाभ', 'निव्वळ नफा'],
    ['ACTION', 'कार्रवाई', 'कृती'],
    ['Actions', 'कार्रवाई', 'कृती'],
    ['Action', 'कार्रवाई', 'कृती'],
    ['Book Freight', 'भाड़ा बुक करें', 'वाहतूक बुक करा'],
    ['Monitor', 'निगरानी करें', 'निरीक्षण करा'],
    ['No net gain', 'कोई अतिरिक्त लाभ नहीं', 'अतिरिक्त नफा नाही'],
    ['MARKET ADVICE', 'बाजार सलाह (AI)', 'बाजार सल्ला (AI)'],
    ['HOLD / DELAY HARVEST', 'रोकें / कटाई में देरी करें', 'माल राखून ठेवा / थांबवा'],
    ['SELL NOW / DISPATCH TODAY', 'तुरंत बेचें / आज ही भेजें', 'लगेच विका / आजच पाठवा'],
    ['MODERATE HARVEST', 'संतुलित बिक्री करें', 'हप्त्या-हप्त्याने विक्री करा'],
    ['Confidence', 'विश्वसनीयता', 'विश्वासार्हता'],
    ['ML Confidence', 'मशीन लर्निंग विश्वसनीयता', 'ML विश्वासार्हता'],

    // KPI Summary Details
    ['Average Price', 'औसत मूल्य', 'सरासरी भाव'],
    ['Total Stock', 'कुल आवक / स्टॉक', 'एकूण आवक / साठा'],
    ['Top Rising Crop', 'सर्वाधिक बढ़त वाली फसल', 'सर्वाधिक तेजी असलेले पीक'],
    ['Market Trend', 'बाजार का रुझान', 'बाजार कल'],
    ['Rising', 'तेजी (बढ़त)', 'तेजी'],
    ['Falling', 'मंदी (गिरावट)', 'मंदी'],
    ['Steady', 'स्थिर', 'स्थिर'],
    ['Good time to sell', 'बिक्री का उत्तम समय', 'माल विकण्यासाठी उत्तम वेळ'],
    ['Supply pressure across mandis', 'मंडियों में आवक का दबाव', 'बाजारात आवक वाढल्याने भाव नरम'],
    ['Balanced market equilibrium', 'संतुलित बाजार स्तर', 'संतुलित बाजारभाव'],
    ['this week', 'इस सप्ताह', 'या आठवड्यात'],
    ['today', 'आज', 'आज'],
    ['Quintals', 'क्विंटल', 'क्विंटल'],
    ['Top Demanded Produce', 'सर्वाधिक मांग वाली फसलें', 'सर्वाधिक मागणी असलेली पिके'],
    ['By Arrival Volume', 'आवक मात्रा के अनुसार', 'आवक प्रमाणानुसार'],
    ['7-Day Price Forecasts', '7-दिवसीय मूल्य पूर्वानुमान', '७ दिवसांचा भाव अंदाज'],
    ['Prices likely to increase', 'भाव बढ़ने की पूरी संभावना', 'भाव वाढण्याची दाट शक्यता'],

    // Forms & Fields
    ['Farmer Profile & KYC Identity', 'किसान प्रोफ़ाइल और केवाईसी पहचान', 'शेतकरी प्रोफाईल आणि केवायसी ओळख'],
    ['KYC Verified', 'केवाईसी सत्यापित', 'केवायसी प्रमाणित'],
    ['Save Profile Changes', 'प्रोफ़ाइल परिवर्तन सहेजें', 'प्रोफाईल बदल जतन करा'],
    ['Publish Crop Listing', 'फसल लिस्टिंग प्रकाशित करें', 'पीक नोंदणी प्रसिद्ध करा'],
    ['Date of Harvest *', 'कटाई की तिथि *', 'कापणीची तारीख *'],
    ['Date of Harvest', 'कटाई की तिथि', 'कापणीची तारीख'],
    ['Harvest Date', 'कटाई की तिथि', 'कापणीची तारीख'],
    ['Posting Date', 'पोस्टिंग तिथि', 'नोंदणी तारीख'],
    ['Expected Price (₹/kg & ₹/Qt)', 'अपेक्षित मूल्य (₹/किलो और ₹/क्विंटल)', 'अपेक्षित हमीभाव (₹/किलो आणि ₹/क्विंटल)'],
    ['Best Bid (₹/kg & ₹/Qt)', 'सर्वोत्तम बोली (₹/किलो और ₹/क्विंटल)', 'सर्वोत्तम बोली (₹/किलो आणि ₹/क्विंटल)'],
    ['Expected Price', 'अपेक्षित मूल्य', 'अपेक्षित भाव'],
    ['Expected Floor Price (₹ / Quintal)', 'अपेक्षित न्यूनतम मूल्य (₹ / क्विंटल)', 'अपेक्षित हमीभाव (₹ / क्विंटल)'],
    ['Expected Floor Price (₹ / Qt)', 'अपेक्षित न्यूनतम मूल्य (₹ / क्विंटल)', 'अपेक्षित हमीभाव (₹ / क्विंटल)'],
    ['Expected Floor Price:', 'अपेक्षित न्यूनतम मूल्य:', 'अपेक्षित हमीभाव:'],
    ['Expected Floor Price', 'अपेक्षित न्यूनतम मूल्य', 'अपेक्षित हमीभाव'],
    ['Original Floor Price:', 'मूल न्यूनतम मूल्य:', 'मूळ हमीभाव:'],
    ['Original Floor Price', 'मूल न्यूनतम मूल्य', 'मूळ हमीभाव'],
    ['Current Best Buyer Bid:', 'वर्तमान सर्वोत्तम खरीदार बोली:', 'सध्याची सर्वोत्तम खरेदीदार बोली:'],
    ['Current Best Buyer Bid', 'वर्तमान सर्वोत्तम खरीदार बोली', 'सध्याची सर्वोत्तम खरेदीदार बोली:'],
    ['Listed Volume', 'सूचीबद्ध मात्रा', 'नोंदवलेले प्रमाण'],
    ['Best Bid', 'सर्वोत्तम बोली', 'सर्वोत्तम बोली'],
    ['Quantity (Quintals / Qt)', 'मात्रा (क्विंटल / Qt)', 'प्रमाण (क्विंटल / Qt)'],
    ['Quantity', 'मात्रा', 'प्रमाण'],
    ['Shelf Life', 'भंडारण अवधि', 'टिकवण क्षमता'],
    ['Category', 'श्रेणी', 'प्रवर्ग'],
    ['Quality Grade', 'गुणवत्ता ग्रेड', 'दर्जा प्रत'],
    ['Grade', 'ग्रेड', 'प्रत'],
    ['Crop Name / Variety', 'फसल का नाम / किस्म', 'पिकाचे नाव / जात'],
    ['Crop Name & Variety', 'फसल का नाम और किस्म', 'पिकाचे नाव आणि जात'],
    ['Crop & Lot Details', 'फसल और लॉट विवरण', 'पीक आणि लॉट तपशील'],
    ['Enter Crop Details', 'फसल विवरण दर्ज करें', 'पिकाचा तपशील प्रविष्ट करा'],
    ['Harvest Mandi / Pickup Location', 'कटाई मंडी / पिकअप स्थान', 'कापणी बाजार समिती / पिकअप ठिकाण'],
    ['Location', 'स्थान', 'ठिकाण'],
    ['Farmer Name', 'किसान का नाम', 'शेतकऱ्याचे नाव'],
    ['Farmer', 'किसान', 'शेतकरी'],
    ['Buyer', 'खरीदार', 'खरेदीदार'],
    ['Price', 'मूल्य', 'दर'],
    ['Status', 'स्थिति', 'स्थिती'],
    ['Active Offer', 'सक्रिय प्रस्ताव', 'सक्रिय ऑफर'],
    ['Active Offers', 'सक्रिय प्रस्ताव', 'सक्रिय ऑफर्स'],
    ['Contract Rate:', 'अनुबंध दर:', 'करार दर:'],
    ['Contract Rate', 'अनुबंध दर', 'करार दर'],
    ['Contract Price:', 'अनुबंध मूल्य:', 'करार किंमत:'],
    ['Contract Price', 'अनुबंध मूल्य', 'करार किंमत'],
    ['Enter Your Price (₹ / kg):', 'अपना मूल्य दर्ज करें (₹ / किलो):', 'तुमचा भाव प्रविष्ट करा (₹ / किलो):'],
    ['OFFERED PRICE', 'प्रस्तावित मूल्य', 'ऑफर केलेला दर'],
    ['Available', 'उपलब्ध', 'उपलब्ध'],
    ['Harvested', 'काटा गया', 'कापणी झालेली'],
    ['Days', 'दिन', 'दिवस'],
    ['Target:', 'लक्ष्य:', 'लक्ष्य:'],
    ['Spot Rate:', 'स्पॉट रेट:', 'थेट दर:'],
    ['Unit:', 'इकाई:', 'एकक:'],
    ["Today's Rate:", 'आज का दर:', 'आजचा दर:'],
    ['7-Day Target:', '7-दिवसीय लक्ष्य:', '७ दिवसांचे लक्ष्य:'],
    ['View Lot', 'लॉट देखें', 'लॉट पहा'],
    ['View', 'देखें', 'पहा'],
    ['Offers', 'प्रस्ताव / बोलियां', 'ऑफर्स'],
    ['Cancel', 'रद्द करें', 'रद्द करा'],
    ['Close', 'बंद करें', 'बंद करा']
  ];

  // Sort phrases strictly by descending character length to ensure maximum greediness
  const PHRASE_MAP = RAW_PHRASES.sort((a, b) => b[0].length - a[0].length);

  const TRANSLATIONS = {
    en: {
      lang_name: 'English',
      flag: '🇬🇧',
      toast_lang_updated: 'Language changed to English.'
    },
    hi: {
      lang_name: 'हिन्दी',
      flag: '🇮🇳',
      toast_lang_updated: 'भाषा बदलकर हिन्दी कर दी गई है।'
    },
    mr: {
      lang_name: 'मराठी',
      flag: '🚩',
      toast_lang_updated: 'भाषा बदलून मराठी करण्यात आली आहे.'
    }
  };

  function getFarmerLanguage() {
    try {
      return localStorage.getItem(STORAGE_KEY) || localStorage.getItem('agrinex_buyer_language') || 'en';
    } catch (e) {
      return 'en';
    }
  }

  function tCrop(cropName, lang) {
    if (!cropName || typeof cropName !== 'string') return cropName;
    const l = lang || getFarmerLanguage();
    if (l === 'en') return cropName;

    if (CROP_MAP[cropName] && CROP_MAP[cropName][l]) {
      return CROP_MAP[cropName][l];
    }

    let res = cropName;
    for (const [k, v] of Object.entries(CROP_MAP)) {
      if (res.includes(k) && v[l]) {
        res = res.replaceAll(k, v[l]);
      }
    }
    for (const [k, v] of Object.entries(VARIETY_MAP)) {
      if (res.includes(k) && v[l]) {
        res = res.replaceAll(k, v[l]);
      }
    }
    for (const [k, v] of Object.entries(DISTRICT_MAP)) {
      if (res.includes(k) && v[l]) {
        res = res.replaceAll(k, v[l]);
      }
    }
    return res;
  }

  function tVariety(varietyName, lang) {
    if (!varietyName || typeof varietyName !== 'string') return varietyName;
    const l = lang || getFarmerLanguage();
    if (l === 'en') return varietyName;

    if (VARIETY_MAP[varietyName] && VARIETY_MAP[varietyName][l]) {
      return VARIETY_MAP[varietyName][l];
    }

    let res = varietyName;
    for (const [k, v] of Object.entries(VARIETY_MAP)) {
      if (res.includes(k) && v[l]) {
        res = res.replaceAll(k, v[l]);
      }
    }
    return res;
  }

  function tPerson(name, lang) {
    if (!name || typeof name !== 'string') return name;
    const l = lang || getFarmerLanguage();
    if (l === 'en') return name;
    return (PERSON_MAP[name] && PERSON_MAP[name][l]) || name;
  }

  function tLocation(loc, lang) {
    if (!loc || typeof loc !== 'string') return loc;
    const l = lang || getFarmerLanguage();
    if (l === 'en') return loc;
    if (MANDI_MAP[loc] && MANDI_MAP[loc][l]) return MANDI_MAP[loc][l];
    if (DISTRICT_MAP[loc] && DISTRICT_MAP[loc][l]) return DISTRICT_MAP[loc][l];
    let res = loc;
    for (const [k, v] of Object.entries(MANDI_MAP)) {
      if (res.includes(k) && v[l]) res = res.replaceAll(k, v[l]);
    }
    for (const [k, v] of Object.entries(DISTRICT_MAP)) {
      if (res.includes(k) && v[l]) res = res.replaceAll(k, v[l]);
    }
    return res;
  }

  function tCategory(cat, lang) {
    if (!cat || typeof cat !== 'string') return cat;
    const l = lang || getFarmerLanguage();
    if (l === 'en') return cat;
    return (CATEGORY_MAP[cat] && CATEGORY_MAP[cat][l]) || cat;
  }

  function tGrade(grade, lang) {
    if (!grade || typeof grade !== 'string') return grade;
    const l = lang || getFarmerLanguage();
    if (l === 'en') return grade;
    if (GRADE_MAP[grade] && GRADE_MAP[grade][l]) return GRADE_MAP[grade][l];
    let res = grade;
    for (const [k, v] of Object.entries(GRADE_MAP)) {
      if (res.includes(k) && v[l]) res = res.replaceAll(k, v[l]);
    }
    return res;
  }

  function tStatus(status, lang) {
    if (!status || typeof status !== 'string') return status;
    const l = lang || getFarmerLanguage();
    if (l === 'en') return status;
    return (STATUS_MAP[status] && STATUS_MAP[status][l]) || status;
  }

  function tText(str, lang) {
    if (!str || typeof str !== 'string') return str;
    const l = lang || getFarmerLanguage();
    if (l === 'en') return str;
    const colIdx = l === 'hi' ? 1 : 2;

    for (let i = 0; i < PHRASE_MAP.length; i++) {
      const row = PHRASE_MAP[i];
      if (str.trim() === row[0]) {
        return row[colIdx];
      }
    }
    let res = str;
    for (let i = 0; i < PHRASE_MAP.length; i++) {
      const row = PHRASE_MAP[i];
      if (row[0].length > 2 && res.includes(row[0])) {
        res = res.replaceAll(row[0], row[colIdx]);
      }
    }
    return res;
  }

  function toggleLanguageMenu() {
    const menu = document.getElementById('language-dropdown-menu');
    if (!menu) return;
    const isShown = menu.style.display === 'block';
    menu.style.display = isShown ? 'none' : 'block';
  }

  // Close dropdown on outside click
  if (typeof document !== 'undefined') {
    document.addEventListener('click', function (e) {
      const widget = document.querySelector('.lang-selector-widget');
      const menu = document.getElementById('language-dropdown-menu');
      if (menu && menu.style.display === 'block') {
        if (widget && !widget.contains(e.target)) {
          menu.style.display = 'none';
        }
      }
    });
  }

  // Universal DOM Translation Walker
  function walkAndTranslateDOM(rootNode, lang) {
    if (!rootNode || typeof document === 'undefined') return;
    const l = lang || getFarmerLanguage();
    const colIdx = l === 'hi' ? 1 : (l === 'mr' ? 2 : 0);

    const walker = document.createTreeWalker(
      rootNode,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function (node) {
          if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          const tag = parent.tagName.toLowerCase();
          if (tag === 'script' || tag === 'style' || tag === 'svg' || tag === 'path' || tag === 'code') {
            return NodeFilter.FILTER_REJECT;
          }
          if (parent.closest('#language-dropdown-menu') || parent.closest('#btn-language-selector')) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      },
      false
    );

    const nodesToUpdate = [];
    let currentNode = walker.nextNode();
    while (currentNode) {
      nodesToUpdate.push(currentNode);
      currentNode = walker.nextNode();
    }

    nodesToUpdate.forEach(textNode => {
      const parent = textNode.parentElement;
      if (!parent) return;

      if (!textNode._originalEnglishText) {
        textNode._originalEnglishText = textNode.nodeValue;
      }

      const orig = textNode._originalEnglishText;
      if (l === 'en') {
        textNode.nodeValue = orig;
        return;
      }

      let translated = orig;

      // STEP 1: Process full phrases and sentence blocks FIRST
      for (let i = 0; i < PHRASE_MAP.length; i++) {
        const row = PHRASE_MAP[i];
        if (translated.includes(row[0])) {
          translated = translated.replaceAll(row[0], row[colIdx]);
        }
      }

      // STEP 2: Crop map lookup
      for (const [k, v] of Object.entries(CROP_MAP)) {
        if (translated.includes(k) && v[l]) {
          translated = translated.replaceAll(k, v[l]);
        }
      }

      // STEP 3: Variety map lookup
      for (const [k, v] of Object.entries(VARIETY_MAP)) {
        if (translated.includes(k) && v[l]) {
          translated = translated.replaceAll(k, v[l]);
        }
      }

      // STEP 4: Category map lookup
      for (const [k, v] of Object.entries(CATEGORY_MAP)) {
        if (translated.includes(k) && v[l]) {
          translated = translated.replaceAll(k, v[l]);
        }
      }

      // STEP 5: Mandi map lookup
      for (const [k, v] of Object.entries(MANDI_MAP)) {
        if (translated.includes(k) && v[l]) {
          translated = translated.replaceAll(k, v[l]);
        }
      }

      // STEP 6: Person map lookup
      for (const [k, v] of Object.entries(PERSON_MAP)) {
        if (translated.includes(k) && v[l]) {
          translated = translated.replaceAll(k, v[l]);
        }
      }

      // STEP 7: District map lookup
      for (const [k, v] of Object.entries(DISTRICT_MAP)) {
        if (translated.includes(k) && v[l]) {
          translated = translated.replaceAll(k, v[l]);
        }
      }

      // STEP 8: Grade map lookup
      for (const [k, v] of Object.entries(GRADE_MAP)) {
        if (translated.includes(k) && v[l]) {
          translated = translated.replaceAll(k, v[l]);
        }
      }

      // STEP 9: Status map lookup
      for (const [k, v] of Object.entries(STATUS_MAP)) {
        if (translated.includes(k) && v[l]) {
          translated = translated.replaceAll(k, v[l]);
        }
      }

      textNode.nodeValue = translated;
    });

    // Translate Inputs placeholders
    document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(input => {
      if (!input._origPlaceholder) {
        input._origPlaceholder = input.getAttribute('placeholder') || '';
      }
      if (l === 'en') {
        input.setAttribute('placeholder', input._origPlaceholder);
      } else {
        let ph = input._origPlaceholder;
        for (let i = 0; i < PHRASE_MAP.length; i++) {
          const row = PHRASE_MAP[i];
          if (ph.includes(row[0])) {
            ph = ph.replaceAll(row[0], row[colIdx]);
          }
        }
        input.setAttribute('placeholder', ph);
      }
    });
  }

  let domObserver = null;
  function startDOMObserver() {
    if (domObserver || typeof MutationObserver === 'undefined' || typeof document === 'undefined') return;
    domObserver = new MutationObserver(mutations => {
      const lang = getFarmerLanguage();
      if (lang === 'en') return;
      mutations.forEach(mut => {
        mut.addedNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            walkAndTranslateDOM(node, lang);
          }
        });
      });
    });
    if (document.body) {
      domObserver.observe(document.body, { childList: true, subtree: true });
    }
  }

  function setFarmerLanguage(lang) {
    if (!['en', 'hi', 'mr'].includes(lang)) lang = 'en';

    try {
      localStorage.setItem(STORAGE_KEY, lang);
      localStorage.setItem('agrinex_buyer_language', lang);
    } catch (e) {}

    // Update Dropdown UI & Checkmarks
    if (typeof document !== 'undefined') {
      const labelEl = document.getElementById('current-language-label');
      if (labelEl) {
        if (lang === 'en') labelEl.innerHTML = '🇬🇧 English';
        else if (lang === 'hi') labelEl.innerHTML = '🇮🇳 हिन्दी';
        else if (lang === 'mr') labelEl.innerHTML = '🚩 मराठी';
      }

      ['en', 'hi', 'mr'].forEach(l => {
        const optBtn = document.getElementById(`lang-opt-${l}`);
        if (optBtn) {
          const check = optBtn.querySelector('.lang-check');
          if (check) check.style.display = l === lang ? 'inline' : 'none';
          optBtn.style.background = l === lang ? '#e8f5ed' : 'transparent';
          optBtn.style.color = l === lang ? '#0c5a36' : '#0f172a';
        }
      });

      const menu = document.getElementById('language-dropdown-menu');
      if (menu) menu.style.display = 'none';

      // Translate DOM
      if (document.body) {
        walkAndTranslateDOM(document.body, lang);
        startDOMObserver();
      }
    }

    // Re-render charts or dynamic templates if functions exist
    if (typeof window.renderDashboard === 'function') {
      window.renderDashboard();
    }
    if (typeof window.renderListings === 'function') {
      window.renderListings();
    }
    if (typeof window.renderFPOHub === 'function') {
      window.renderFPOHub();
    }
    if (typeof window.renderCropsTable === 'function') {
      window.renderCropsTable();
    }
    if (typeof window.renderLots === 'function') {
      window.renderLots();
    }
    if (typeof window.renderOffers === 'function') {
      window.renderOffers();
    }

    // Trigger toast notification if showNotificationToast exists
    if (typeof window.showNotificationToast === 'function') {
      window.showNotificationToast(TRANSLATIONS[lang].toast_lang_updated);
    }
  }

  function initFarmerI18n() {
    let saved = 'en';
    try {
      saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('agrinex_buyer_language') || 'en';
    } catch (e) {}
    setFarmerLanguage(saved);
  }

  // Export to global window object
  if (typeof window !== 'undefined') {
    window.AgriNexFarmerI18n = {
      tCrop,
      tVariety,
      tCategory,
      tPerson,
      tLocation,
      tGrade,
      tStatus,
      tText,
      setFarmerLanguage,
      getFarmerLanguage,
      toggleLanguageMenu,
      walkAndTranslateDOM
    };

    window.tCrop = tCrop;
    window.tVariety = tVariety;
    window.tCategory = tCategory;
    window.tPerson = tPerson;
    window.tLocation = tLocation;
    window.tGrade = tGrade;
    window.tStatus = tStatus;
    window.tText = tText;
    window.setFarmerLanguage = setFarmerLanguage;
    window.getFarmerLanguage = getFarmerLanguage;
    window.toggleLanguageMenu = toggleLanguageMenu;
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initFarmerI18n);
    } else {
      initFarmerI18n();
    }
  }
})();
