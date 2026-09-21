/**
 * AgriNex - Admin Control Center Multilingual Translation Engine (i18n)
 * Supported Languages:
 *  - en: English (Default)
 *  - hi: हिन्दी (Hindi)
 *  - mr: मराठी (Marathi)
 * Complete trilingual translation engine across 100% of UI elements, tables,
 * stat cards, modals, search inputs, commodities, mandis, counterparties, and state governance terms.
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
    'Kishor Ahire': { hi: 'किशोर अहिरे', mr: 'किशोर अहिरे' },
    'Govind Marathe': { hi: 'गोविंद मराठे', mr: 'गोविंद मराठे' },
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
    'FreshVeg Logistics & Processing Corp': { hi: 'फ्रेशवेज लॉजिस्टिक्स एंड प्रोसेसिंग कॉर्प', mr: 'फ्रेशव्हेज लॉजिस्टिक्स अँड प्रोसेसिंग कॉर्प' },
    'FreshVeg Logistics & Processing': { hi: 'फ्रेशवेज लॉजिस्टिक्स एंड प्रोसेसिंग', mr: 'फ्रेशव्हेज लॉजिस्टिक्स अँड प्रोसेसिंग' },
    'Kissan & Nestle India Procurements': { hi: 'किसान और नेस्ले इंडिया खरीद', mr: 'किसान व नेस्ले इंडिया खरेदी' },
    'Kissan & Nestle India': { hi: 'किसान और नेस्ले इंडिया', mr: 'किसान व नेस्ले इंडिया' },
    'BigBasket Direct Farm Sourcing': { hi: 'बिगबास्केट डायरेक्ट फार्म सोर्सिंग', mr: 'बिगबास्केट थेट शेतमाल खरेदी' },
    'Reliance Fresh Supply Chain': { hi: 'रिलायंस फ्रेश सप्लाई चेन', mr: 'रिलायन्स फ्रेश सप्लाय चेन' },
    'Adani Wilmar Agri Procurement': { hi: 'अदाणी विल्मर कृषि खरीद', mr: 'अदानी विल्मर कृषी खरेदी' },
    'Adani Wilmar Agro Processing': { hi: 'अदाणी विल्मर कृषि प्रसंस्करण', mr: 'अदानी विल्मर कृषी प्रक्रिया' },
    'DMart Wholesale (Avenue Supermarts)': { hi: 'डीमार्ट थोक (एवेन्यू सुपरमार्ट्स)', mr: 'डीमार्ट घाऊक (एव्हेन्यू सुपरमार्ट्स)' },
    'Kay Bee Exports International': { hi: 'के बी एक्सपोर्ट्स इंटरनेशनल', mr: 'के बी एक्सपोर्ट्स इंटरनॅशनल' },
    'Mahagrapes Co-op Federation': { hi: 'महाग्रेप्स सहकारी महासंघ', mr: 'महाग्रेप्स सहकारी महासंघ' },
    'LuLu Hypermarket Gulf Supply': { hi: 'लुलु हाइपरमार्केट गल्फ सप्लाई', mr: 'लुलु हायपरमार्केट गल्फ पुरवठा' },
    'Everest Spices & Commodities': { hi: 'एवरेस्ट मसाले और कमोडिटीज', mr: 'एव्हरेस्ट मसाले व शेतमाल' },
    'ITC Agri-Business Division': { hi: 'आईटीसी कृषि-व्यवसाय प्रभाग', mr: 'आयटीसी कृषी-व्यवसाय विभाग' },
    'Raymond Textile Mills': { hi: 'रेमंड टेक्सटाइल Mills', mr: 'रेमंड टेक्सटाईल मिल्स' },
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

    'Yellow Soybean (JS 335 / High Protein)': { hi: 'पीला सोयाबीन (जेएस 335 / उच्च प्रोटीन)', mr: 'पिवळी सोयाबीन (जेएस ३३५ / उच्च प्रथिने)' },
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
    'Grapes': { hi: 'अंगूर', mr: 'द्राक्षे' },

    'Bajra (Pearl Millet)': { hi: 'बाजरा', mr: 'बाजरी' },
    'Bajra': { hi: 'बाजरा', mr: 'बाजरी' },
    'Jowar (Sorghum)': { hi: 'ज्वार', mr: 'ज्वारी' },
    'Jowar': { hi: 'ज्वार', mr: 'ज्वारी' },
    'Wheat (Lokwan)': { hi: 'गेहूं (लोकवन)', mr: 'गहू (लोकवन)' },
    'Wheat': { hi: 'गेहूं', mr: 'गहू' },
    'Paddy / Rice': { hi: 'धान / चावल', mr: 'भात / तांदूळ' },
    'Paddy': { hi: 'धान', mr: 'भात' },
    'Rice': { hi: 'चावल', mr: 'तांदूळ' },
    'Sugarcane': { hi: 'गन्ना', mr: 'ऊस' },
    'Groundnut': { hi: 'मूंगफली', mr: 'भुईमूग' },
    'Sunflower': { hi: 'सूरजमुखी', mr: 'सूर्यफूल' },
    'Ginger': { hi: 'अदरक', mr: 'आले' },
    'Garlic': { hi: 'लहसुन', mr: 'लसूण' }
  };

  // 4. MANDI & REGIONAL HUBS
  const MANDI_MAP = {
    'Lasalgaon APMC, Nashik': { hi: 'लासलगांव एपीएमसी, नासिक', mr: 'लासलगाव बाजार समिती, नाशिक' },
    'Narayangaon APMC, Pune': { hi: 'नारायणगांव एपीएमसी, पुणे', mr: 'नारायणगाव बाजार समिती, पुणे' },
    'Latur APMC Yard, Marathwada': { hi: 'लातूर एपीएमसी यार्ड, मराठवाड़ा', mr: 'लातूर बाजार समिती यार्ड, मराठवाडा' },
    'Vashi APMC, Navi Mumbai': { hi: 'वाशी एपीएमसी, नवी मुंबई', mr: 'वाशी बाजार समिती, नवी मुंबई' },
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

  // 5. WAREHOUSE & FLEET HUBS
  const WAREHOUSE_MAP = {
    'MSWC Nashik Hub': { hi: 'एमएसडब्ल्यूसी नासिक हब', mr: 'एमएसडब्ल्यूसी नाशिक केंद्र' },
    'MSWC Pune Central': { hi: 'एमएसडब्ल्यूसी पुणे सेंट्रल', mr: 'एमएसडब्ल्यूसी पुणे मध्यवर्ती केंद्र' },
    'MSWC Latur Cold Hub': { hi: 'एमएसडब्ल्यूसी लातूर कोल्ड हब', mr: 'एमएसडब्ल्यूसी लातूर शीत केंद्र' },
    'MSWC Nagpur Agro-Logistics': { hi: 'एमएसडब्ल्यूसी नागपुर कृषि-लॉजिस्टिक्स', mr: 'एमएसडब्ल्यूसी नागपूर कृषी-वाहतूक केंद्र' },
    'MSWC Vashi Cold Storage': { hi: 'एमएसडब्ल्यूसी वाशी कोल्ड स्टोरेज', mr: 'एमएसडब्ल्यूसी वाशी शीतगृह' },
    'Maharashtra State Warehousing Corporation (MSWC) Regional Hubs': { hi: 'महाराष्ट्र राज्य भंडारण निगम (एमएसडब्ल्यूसी) क्षेत्रीय हब', mr: 'महाराष्ट्र राज्य वखार महामंडळ (MSWC) प्रादेशिक केंद्रे' },
    'Maharashtra State Warehousing Corporation (MSWC)': { hi: 'महाराष्ट्र राज्य भंडारण निगम (एमएसडब्ल्यूसी)', mr: 'महाराष्ट्र राज्य वखार महामंडळ (MSWC)' },
    'Maharashtra State Warehousing Corporation': { hi: 'महाराष्ट्र राज्य भंडारण निगम', mr: 'महाराष्ट्र राज्य वखार महामंडळ' },
    'MSWC Regional Hubs': { hi: 'एमएसडब्ल्यूसी क्षेत्रीय हब', mr: 'एमएसडब्ल्यूसी प्रादेशिक केंद्रे' },
    'MSWC Hubs': { hi: 'एमएसडब्ल्यूसी हब', mr: 'एमएसडब्ल्यूसी केंद्रे' },
    'Maharashtra Agro Cold-Logistics': { hi: 'महाराष्ट्र एग्रो कोल्ड-लॉजिस्टिक्स', mr: 'महाराष्ट्र ॲग्रो कोल्ड-लॉजिस्टिक्स' },
    'Sahyadri Reefer Transport': { hi: 'सह्याद्री रीफर ट्रांसपोर्ट', mr: 'सह्याद्री शीत-वाहतूक' },
    'Kisan Express Logistics': { hi: 'किसान एक्सप्रेस लॉजिस्टिक्स', mr: 'किसान एक्सप्रेस वाहतूक' },
    'Deccan Cold-Chain Carriers': { hi: 'डेक्कन कोल्ड-चेन कैरियर्स', mr: 'डेक्कन शीत-साखळी वाहक' },
    'Khandesh Agro Freight': { hi: 'खानदेश एग्रो फ्रेट', mr: 'खानदेश ॲग्रो फ्रेट' },
    'Vidarbha Express Movers': { hi: 'विदर्भ एक्सप्रेस मूवर्स', mr: 'विदर्भ एक्सप्रेस मूव्हर्स' }
  };

  // 6. CORE PHRASE DICTIONARY FOR ADMIN MODULE
  const RAW_PHRASES = [
    // Navigation & General Brand
    ['Marketplace Control Center', 'मार्केटप्लेस नियंत्रण केंद्र', 'बाजारपेठ नियंत्रण केंद्र'],
    ['Control Center', 'नियंत्रण केंद्र', 'नियंत्रण केंद्र'],
    ['AgriNex Marketplace Control Center', 'एग्रीनेक्स मार्केटप्लेस नियंत्रण केंद्र', 'ॲग्रीनेक्स बाजारपेठ नियंत्रण केंद्र'],
    ['AGRINEX ADMIN - Marketplace Control Center', 'एग्रीनेक्स एडमिन - मार्केटप्लेस नियंत्रण केंद्र', 'ॲग्रीनेक्स ॲडमिन - बाजारपेठ नियंत्रण केंद्र'],
    ['AGRINEX ADMIN', 'एग्रीनेक्स एडमिन', 'ॲग्रीनेक्स ॲडमिन'],
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
    ['Switch Module:', 'मॉड्यूल बदलें:', 'विभाग बदला:'],
    ['Back to HQ', 'मुख्यालय वापस जाएं', 'मुख्यालयाकडे परत'],
    ['Desk ↗', 'डेस्क ↗', 'डेस्क ↗'],
    ['Desk →', 'डेस्क →', 'डेस्क →'],
    ['Fleet →', 'फ्लीट →', 'वाहतूक →'],
    ['Fleet Hub →', 'फ्लीट हब →', 'वाहतूक केंद्र →'],
    ['Directory →', 'निर्देशिका →', 'निर्देशिका →'],
    ['Ledger →', 'नोंदवही →', 'नोंदवही →'],
    ['Track →', 'ट्रैक करें →', 'मागोवा घ्या →'],
    ['Triage →', 'समीक्षा करें →', 'निवारण करा →'],
    ['Triage All', 'सभी की समीक्षा करें', 'सर्वांचे निवारण करा'],
    ['Mandi Desk →', 'मंडी डेस्क →', 'बाजार समिती डेस्क →'],
    ['Dedicated Mandi Desk →', 'समर्पित मंडी डेस्क →', 'समर्पित बाजार समिती डेस्क →'],
    ['Dedicated Escrow Desk →', 'समर्पित एस्क्रो डेस्क →', 'समर्पित एस्क्रो डेस्क →'],
    ['Dedicated Tribunal Bench →', 'समर्पित न्यायाधिकरण बेंच →', 'समर्पित न्यायाधिकरण खंडपीठ →'],
    ['Dedicated Bench →', 'समर्पित बेंच →', 'समर्पित खंडपीठ →'],

    // Executive Status Bar & Officer
    ['ADMIN', 'प्रशासक', 'प्रशासक'],
    ['Admin', 'प्रशासक', 'प्रशासक'],
    ['Central APMC Control Desk', 'केंद्रीय एपीएमसी नियंत्रण कक्ष', 'केंद्रीय बाजार समिती नियंत्रण कक्ष'],
    ['Chief Mandi Commissioner & Escrow Regulator', 'मुख्य मंडी आयुक्त और एस्क्रो नियामक', 'मुख्य बाजार समिती आयुक्त व एस्क्रो नियामक'],
    ['Chief Mandi Commissioner', 'मुख्य मंडी आयुक्त', 'मुख्य बाजार समिती आयुक्त'],
    ['Escrow Authority', 'एस्क्रो नियामक प्राधिकरण', 'एस्क्रो नियामक प्राधिकरण'],
    ['Price Committee Chair', 'मूल्य निर्धारण समिति अध्यक्ष', 'भाव निर्धारण समिती अध्यक्ष'],
    ['Tribunal Presiding Officer', 'न्यायाधिकरण पीठासीन अधिकारी', 'न्यायाधिकरण पीठासीन अधिकारी'],
    ['Authorized Officer', 'अधिकृत अधिकारी', 'अधिकृत अधिकारी'],
    ['305 Mandis Live Across Maharashtra', 'महाराष्ट्र भर में 305 मंडियां लाइव', 'महाराष्ट्रभरातील ३०५ बाजार समित्या थेट कार्यरत'],
    ['Nodal Governance Active', 'नोडल प्रशासन सक्रिय', 'नोडल प्रशासन सक्रिय'],
    ['Action Items', 'लंबित कार्य', 'प्रलंबित कृती'],
    ['14 Action Items', '14 लंबित कार्य', '१४ प्रलंबित कृती'],
    ['Advisory', 'परामर्श', 'सल्लागार'],
    ['Audit Export', 'ऑडिट निर्यात', 'तपासणी अहवाल'],
    ['Pending Breakdowns', 'लंबित विवरण', 'प्रलंबित वर्गीकरण'],

    // KPI Cards
    ['Verified Producers & Buyers', 'सत्यापित उत्पादक और खरीदार', 'प्रमाणित उत्पादक व खरेदीदार'],
    ['Producers & Buyers', 'उत्पादक और खरीदार', 'उत्पादक व खरेदीदार'],
    ['Producers', 'उत्पादक', 'उत्पादक'],
    ['Enterprise Buyers', 'व्यावसायिक खरीदार', 'संस्थात्मक खरेदीदार'],
    ['Dual-Key Escrow Pool', 'डुअल-की एस्क्रो पूल', 'ड्युअल-की एस्क्रो निधी'],
    ['Active Trade Contracts', 'सक्रिय व्यापार अनुबंध', 'सक्रिय व्यवहार करार'],
    ['100% Dual-Key Protected', '100% डुअल-की सुरक्षित', '१००% ड्युअल-की सुरक्षित'],
    ['Dual-Key Protected', 'डुअल-की सुरक्षित', 'ड्युअल-की सुरक्षित'],
    ['Escrow Locked', 'एस्क्रो सुरक्षित', 'एस्क्रो सुरक्षित'],
    ['RTGS / NSDL Escrow Vault', 'आरटीजीएस / एनएसडीएल एस्क्रो वॉल्ट', 'RTGS / NSDL एस्क्रो तिजोरी'],
    ['Logistics & Reefer Fleets', 'लॉजिस्टिक्स और रीफर फ्लीट', 'वाहतूक व शीत-वाहतूक फ्लीट'],
    ['Active Fleets', 'सक्रिय फ्लीट', 'सक्रिय वाहने'],
    ['Active Deliveries', 'सक्रिय डिलीवरी', 'सक्रिय मालवाहतूक'],
    ['On Schedule', 'समय पर', 'वेळेवर'],
    ['Orders in Transport across MH', 'महाराष्ट्र भर में परिवहन में ऑर्डर', 'महाराष्ट्रभरात वाहतुकीतील माल'],
    ['Live IoT Reefer Telemetry', 'लाइव आईओटी रीफर टेलीमेट्री', 'थेट आयओटी शीत-वाहतूक माहिती'],
    ['Urgent Action Items', 'अति आवश्यक कार्य', 'तातडीच्या प्रलंबित कृती'],
    ['Action Required', 'कार्रवाई आवश्यक', 'तातडीची कारवाई आवश्यक'],
    ['Pending Dual-Key & Tribunal Triage', 'लंबित डुअल-की और ट्रिब्यूनल समीक्षा', 'प्रलंबित ड्युअल-की व लवाद निवारण'],
    ['5 Escrow · 3 Disputes · 6 KYC', '5 एस्क्रो · 3 विवाद · 6 केवाईसी', '५ एस्क्रो · ३ वाद · ६ केवायसी'],
    ['Top 3 Requiring Today\'s Sign-Off', 'आज हस्ताक्षर हेतु आवश्यक शीर्ष 3', 'आज स्वाक्षरीसाठी आवश्यक प्रमुख ३ बाबी'],
    ['Immediate dual-key payouts, tribunal bench orders, and buyer KYC verifications', 'तत्काल डुअल-की भुगतान, ट्रिब्यूनल बेंच आदेश और खरीदार केवाईसी सत्यापन', 'तातडीची ड्युअल-की देयके, लवाद खंडपीठ निकाल आणि खरेदीदार केवायसी पडताळणी'],

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
    ['Unified telemetry across APMC mandis, reefer transit & cold chain', 'एपीएमसी मंडियों, रीफर पारगमन और कोल्ड चेन में एकीकृत टेलीमेट्री', 'बाजार समित्या, शीत-वाहतूक व साठवणुकीची एकत्रित माहिती'],
    ['Mandi APMC Watch', 'मंडी एपीएमसी निगरानी', 'बाजार समिती निरीक्षण'],
    ['Cold Storage', 'शीतगृह भंडारण', 'शीतगृह साठवणूक'],
    ['Open Full State GIS Command Map', 'राज्य स्तरीय जीआईएस नियंत्रण नक्शा खोलें', 'राज्यस्तरीय जीआयएस नियंत्रण नकाशा उघडा'],
    ['Artificial Hoarding Risk Flagged', 'कृत्रिम जमाखोरी का जोखिम चिह्नित', 'साठेबाजीचा धोका आढळला'],
    ['MSP Floor Pressure Watch', 'एमएसपी न्यूनतम मूल्य निगरानी', 'हमीभाव आधारभूत किंमत निरीक्षण'],
    ['Nominal Trade Velocity', 'सामान्य व्यापार गति', 'सुरळीत व्यवहार गती'],
    ['Nominal', 'सामान्य', 'सुरळीत'],
    ['Occupancy', 'भरण क्षमता', 'साठवणूक प्रमाण'],
    ['Reefer Fleets', 'रीफर फ्लीट', 'शीत-वाहतूक फ्लीट'],
    ['Primary Belt:', 'प्राथमिक क्षेत्र:', 'प्रमुख पट्टा:'],
    ['Hoarding Alert', 'जमाखोरी अलर्ट', 'साठेबाजी सूचना'],
    ['MSP Watch', 'एमएसपी निगरानी', 'हमीभाव निरीक्षण'],
    ['Modal:', 'मॉडल भाव:', 'सरासरी भाव:'],
    ['Arrivals:', 'आवक:', 'आवक:'],
    ['Consolidated Produce & Veg', 'समेकित उपज व सब्जियां', 'एकत्रित शेतमाल व भाजीपाला'],
    ['Manage MSWC Hubs in Storage Section', 'भंडारण अनुभाग में एमएसडब्ल्यूसी हब प्रबंधित करें', 'साठवणूक विभागात एमएसडब्ल्यूसी केंद्र व्यवस्थापित करा'],
    ['Shipment ID & Vehicle', 'शिपमेंट आईडी और वाहन', 'वाहतूक आयडी व वाहन क्रमांक'],
    ['Driver & Contact', 'चालक और संपर्क', 'चालक व संपर्क क्रमांक'],
    ['Cargo & Volume', 'माल और मात्रा', 'शेतमाल व प्रमाण'],
    ['Route (Origin ➔ Destination)', 'मार्ग (उद्गम ➔ गंतव्य)', 'मार्ग (उगम ➔ गंतव्य)'],
    ['Temperature Status', 'तापमान स्थिति', 'तापमान स्थिती'],
    ['Progress & ETA', 'प्रगति और अपेक्षित समय (ETA)', 'प्रगती व अपेक्षित आगमन वेळ (ETA)'],

    // Users Section
    ['User Directory & Management System', 'उपयोगकर्ता निर्देशिका और प्रबंधन प्रणाली', 'वापरकर्ते निर्देशिका व व्यवस्थापन प्रणाली'],
    ['Manage verified & pending Farmers, Enterprise Buyers, and Logistics Fleet Partners', 'सत्यापित और लंबित किसानों, खरीदारों और लॉजिस्टिक्स भागीदारों का प्रबंधन करें', 'प्रमाणित व प्रलंबित शेतकरी, खरेदीदार आणि वाहतूकदारांचे व्यवस्थापन करा'],
    ['Monitor verified Farmers, Enterprise Buyers, and Logistics Partners with instant suspension and removal controls', 'सत्यापित किसानों, खरीदारों और लॉजिस्टिक्स भागीदारों की निगरानी करें और तत्काल निलंबन या निष्कासन नियंत्रण लागू करें', 'प्रमाणित शेतकरी, खरेदीदार व वाहतूकदारांवर देखरेख ठेवा आणि तातडीने निलंबन किंवा निष्कासन कारवाई करा'],
    ['All Users', 'सभी उपयोगकर्ता', 'सर्व वापरकर्ते'],
    ['Farmers', 'किसान', 'शेतकरी'],
    ['Buyers', 'खरीदार', 'खरेदीदार'],
    ['Logistics', 'लॉजिस्टिक्स', 'वाहतूकदार'],
    ['FPO Federations', 'एफपीओ महासंघ', 'शेतकरी उत्पादक संस्था (FPO)'],
    ['Pending Verification', 'सत्यापन लंबित', 'प्रमाणन प्रलंबित'],
    ['Suspended / Flagged', 'निलंबित / चिह्नित', 'निलंबित / संशयित'],
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
    ['Active', 'सक्रिय', 'सक्रिय'],
    ['Suspended', 'निलंबित', 'निलंबित'],
    ['De-listed', 'सूची से हटाया गया', 'यादीतून वगळले'],
    ['Suspend', 'निलंबित करें', 'निलंबित करा'],
    ['Remove', 'हटाएं', 'काढून टाका'],
    ['De-list', 'सूची से हटाएं', 'यादीतून वगळा'],
    ['Restore', 'पुनर्स्थापित करें', 'पूर्ववत करा'],
    ['Unsuspend', 'निलंबन हटाएं', 'निलंबन मागे घ्या'],
    ['Details', 'विवरण', 'तपशील'],
    ['Under Review', 'समीक्षाधीन', 'पुनरावलोकन सुरू'],
    ['Cluster Hub', 'क्लस्टर हब', 'मुख्य केंद्र'],
    ['Credit Desk', 'क्रेडिट डेस्क', 'पतपुरवठा डेस्क'],
    ['No users found matching current filters.', 'वर्तमान फ़िल्टर से मेल खाने वाले कोई उपयोगकर्ता नहीं मिले।', 'सध्याच्या फिल्टरनुसार कोणतेही वापरकर्ते आढळले नाहीत.'],
    ['KYC Compliance Record', 'केवाईसी अनुपालन रिकॉर्ड', 'केवायसी कायदेशीर नोंद'],
    ['User Compliance & Governance Dossier', 'उपयोगकर्ता अनुपालन और शासन दस्तावेज़', 'वापरकर्ता कायदेशीर व प्रशासकीय नोंद'],
    ['Uploaded Legal Credentials:', 'अपलोड किए गए कानूनी दस्तावेज:', 'अपलोड केलेली कायदेशीर कागदपत्रे:'],
    ['Uploaded Legal & Operating Credentials:', 'अपलोड किए गए कानूनी और परिचालन प्रमाण पत्र:', 'अपलोड केलेली कायदेशीर व कामकाजाची कागदपत्रे:'],
    ['Registered GSTIN:', 'पंजीकृत जीएसटी:', 'नोंदणीकृत जीएसटी:'],
    ['Registered Record:', 'पंजीकृत रिकॉर्ड:', 'नोंदणीकृत माहिती:'],
    ['Current Status:', 'वर्तमान स्थिति:', 'सध्याची स्थिती:'],
    ['Suspend Account', 'खाता निलंबित करें', 'खाते निलंबित करा'],
    ['De-list & Remove', 'सूची से हटाएं व निष्कासित करें', 'यादीतून वगळा व काढून टाका'],
    ['Re-activate Account', 'खाता पुनः सक्रिय करें', 'खाते पुन्हा सक्रिय करा'],
    ['Farmer', 'किसान', 'शेतकरी'],
    ['Buyer', 'खरीदार', 'खरेदीदार'],
    ['Risk:', 'जोखिम:', 'जोखीम:'],
    ['FPO Federation & Reg CIN', 'एफपीओ महासंघ और पंजीकरण सीआईएन', 'शेतकरी उत्पादक संस्था (FPO) व नोंदणी क्रमांक'],
    ['Lead District & HQ', 'प्रमुख जिला और मुख्यालय', 'प्रमुख जिल्हा व मुख्यालय'],
    ['Member Base & Land', 'सदस्य संख्या और भूमि', 'शेतकरी सदस्य व जमीन धारणा'],
    ['Core Commodities', 'प्रमुख फसलें', 'प्रमुख शेतमाल'],
    ['NABARD Rating', 'नाबार्ड रेटिंग', 'नाबार्ड मानांकन'],
    ['Working Capital & Subsidy', 'कार्यशील पूंजी और सब्सिडी', 'खेळते भांडवल व अनुदान'],
    ['Sanction Credit / Subsidy', 'क्रेडिट / सब्सिडी स्वीकृत करें', 'पतपुरवठा / अनुदान मंजूर करा'],

    // Market Data Section
    ['Market Data & Mandi Price Benchmarks', 'बाजार डेटा और मंडी बेंचमार्क दरें', 'बाजार आकडेवारी व बाजार समितीचे हमीभाव'],
    ['Government MSP floor price controls, mandi modal pricing, and ceiling caps across 28 Maharashtra crops', 'महाराष्ट्र की 28 फसलों के लिए सरकारी एमएसपी न्यूनतम मूल्य, मॉडल भाव और अधिकतम सीमा नियंत्रण', 'महाराष्ट्रातील २८ पिकांसाठी शासकीय हमीभाव, सरासरी बाजारभाव व कमाल मर्यादा नियंत्रण'],
    ['Broadcast Price Advisory', 'मूल्य परामर्श प्रसारित करें', 'दर सल्लागार प्रसारित करा'],
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
    ['Statutory Floor', 'वैधानिक आधार', 'वैधानिक हमीभाव'],
    ['Live APMC Modal', 'लाइव एपीएमसी मॉडल', 'थेट बाजार समिती सरासरी'],
    ['Anti-Hoarding Cap', 'जमाखोरी-रोधी सीमा', 'साठेबाजी-विरोधी कमाल मर्यादा'],
    ['Edit Modal', 'संपादित करें', 'बदल करा'],

    // Deals & Payments
    ['Deals & Dual-Key Escrow Payments Ledger', 'सौदा और डुअल-की एस्क्रो भुगतान बही', 'सौदे व ड्युअल-की एस्क्रो देयके नोंदवही'],
    ['Direct RTGS milestone payouts backed by digital e-PoD & electronic weigh slips', 'डिजिटल ई-पीओडी और इलेक्ट्रॉनिक वजन पर्चियों द्वारा समर्थित सीधे आरटीजीएस भुगतान', 'डिजिटल ई-पीओडी व इलेक्ट्रॉनिक वजन पावतीनुसार थेट आरटीजीएस देयके'],
    ['Dual-Key Escrow Locked', 'डुअल-की एस्क्रो सुरक्षित', 'ड्युअल-की एस्क्रो सुरक्षित'],
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
    ['No escrow clearances matching your current filter.', 'आपके वर्तमान फ़िल्टर से मेल खाने वाली कोई एस्क्रो निकासी नहीं है।', 'सध्याच्या फिल्टरनुसार कोणतीही एस्क्रो मंजुरी उपलब्ध नाही.'],
    ['Dual-Key Escrow Ledger Case', 'डुअल-की एस्क्रो लेजर मामला', 'ड्युअल-की एस्क्रो नोंदवही प्रकरण'],
    ['Beneficiary Farmer (Payee)', 'लाभार्थी किसान (प्राप्तकर्ता)', 'लाभार्थी शेतकरी (रक्कम मिळणारा)'],
    ['Enterprise Corporate Buyer (Payer)', 'व्यावसायिक कॉर्पोरेट खरीदार (भुगतानकर्ता)', 'संस्थात्मक कॉर्पोरेट खरेदीदार (रक्कम देणारा)'],
    ['Escrow Deposit: 100% Locked', 'एस्क्रो जमा: 100% सुरक्षित', 'एस्क्रो ठेव: १००% सुरक्षित'],
    ['Payout Type:', 'भुगतान प्रकार:', 'देयक प्रकार:'],
    ['Contract Volume:', 'अनुबंध मात्रा:', 'करार शेतमाल प्रमाण:'],
    ['Total Value:', 'कुल मूल्य:', 'एकूण मूल्य:'],
    ['Risk Score:', 'जोखिम स्कोर:', 'जोखीम गुणांक:'],
    ['Cryptographic Proof & Verification Artefacts:', 'क्रिप्टोग्राफिक साक्ष्य और सत्यापन दस्तावेज:', 'क्रिप्टोग्राफिक पुरावे व पडताळणी कागदपत्रे:'],
    ['Current Stage:', 'वर्तमान चरण:', 'सध्याचा टप्पा:'],
    ['Authorize Dual-Key Payout', 'डुअल-की भुगतान अधिकृत करें', 'ड्युअल-की देयक मंजूर करा'],
    ['Total Escrow In Pool', 'पूल में कुल एस्क्रो', 'एकूण जमा एस्क्रो निधी'],
    ['100% Nodal Escrow Protected', '100% नोडल एस्क्रो सुरक्षित', '१००% नोडल एस्क्रो सुरक्षित'],
    ['Farm Gate', 'खेत खलिहान (फार्म गेट)', 'शेतबांधावर (फार्म गेट)'],
    ['Disbursed Upon Bid Lock', 'बोली लॉक होने पर संवितरित', 'सौदा निश्चित झाल्यावर वर्ग'],
    ['65% Final Settlements', '65% अंतिम निपटान', '६५% अंतिम हप्ता देयके'],
    ['Quarantined Disputes', 'रोके गए विवादित मामले', 'होल्डवरील वादग्रस्त प्रकरणे'],
    ['Arbitrage Hold', 'मध्यस्थता होल्ड', 'लवाद होल्ड'],
    ['Frozen Under QA Audit', 'गुणवत्ता ऑडिट के तहत फ्रीज', 'गुणवत्ता तपासणीमुळे स्थगित'],
    ['All Settlements', 'सभी निपटान', 'सर्व देयके'],
    ['Trigger Batch RTGS Payout', 'बैच आरटीजीएस भुगतान ट्रिगर करें', 'एकत्रित RTGS देयके वितरित करा'],
    ['Audit Report (PDF)', 'ऑडिट रिपोर्ट (पीडीएफ)', 'तपासणी अहवाल (PDF)'],
    ['Escrow Ledger ID', 'एस्क्रो लेजर आईडी', 'एस्क्रो नोंदवही आयडी'],
    ['Commodity & Mandi', 'फसल और मंडी', 'शेतमाल व बाजार समिती'],
    ['Payee Farmer & Account', 'लाभार्थी किसान और बैंक खाता', 'लाभार्थी शेतकरी व बँक खाते'],
    ['Payer Buyer & GSTIN', 'भुगतानकर्ता खरीदार और जीएसटी', 'खरेदीदार कंपनी व जीएसटी'],
    ['Clearance Amount', 'निकासी राशि', 'मंजूर देयक रक्कम'],
    ['Proof of Delivery', 'डिलीवरी प्रमाण (PoD)', 'पोहोच पावती पुरावा (PoD)'],
    ['Status', 'स्थिति', 'स्थिती'],
    ['Action', 'कार्रवाई', 'कृती'],

    // Emergency Sell
    ['Emergency Sell & Distress Produce Clearance', 'आपातकालीन बिक्री और संकटग्रस्त उपज निकासी', 'तातडीची विक्री व संकटग्रस्त शेतमाल जलद मंजुरी'],
    ['Perishable Flash Auctions', 'नाशवान उपज फ्लैश नीलामी', 'नाशवंत शेतमालाचा जलद लिलाव'],
    ['Rapid liquidation protocol for crops at risk of spoilage, container cancellations, or unseasonal weather damage', 'खराब होने, कंटेनर रद्द होने या बेमौसम मौसम से प्रभावित फसलों के त्वरित निपटान प्रोटोकॉल', 'खराब होण्याच्या उंबरठ्यावर असलेला, कंटेनर रद्द झालेला किंवा अवकाळी पावसाने बाधित शेतमालाचा जलद लिलाव'],
    ['Automated 4-Hour Distress Flash Liquidation Protocol Active', 'स्वचालित 4-घंटे संकटकालीन फ्लैश नीलामी प्रोटोकॉल सक्रिय', 'स्वयंचलित ४ तासांचा जलद लिलाव प्रोटोकॉल सक्रिय'],
    ['Broadcast Flash Auction to 850 Buyers', '850 खरीदारों को फ्लैश नीलामी संदेश भेजें', '८५० खरेदीदारांना जलद लिलावाचा संदेश पाठवा'],
    ['Broadcast Dispatched to 850 Buyers', '850 खरीदारों को संदेश प्रसारित किया गया', '८५० खरेदीदारांना संदेश पाठवला गेला'],
    ['Distress Discount Rate', 'संकटकालीन छूट दर', 'तातडीचा सवलत दर'],
    ['Hours to Critical Spoilage', 'खराब होने में शेष घंटे', 'खराब होण्यापूर्वी शिल्लक तास'],
    ['Produce:', 'उपज:', 'शेतमाल:'],
    ['No emergency clearance lots matching your search criteria.', 'आपके खोज मानदंडों से मेल खाने वाले कोई आपातकालीन लॉट नहीं मिले।', 'तुमच्या शोध निकषांनुसार कोणतेही तातडीचे लॉट आढळले नाहीत.'],
    ['Allocated Storage:', 'आवंटित भंडारण:', 'राखीव साठवणूक:'],
    ['Volume:', 'मात्रा:', 'प्रमाण:'],

    // Grievances & Tribunal
    ['Grievance Redressal & Dispute Tribunal', 'शिकायत निवारण और विवाद न्यायाधिकरण', 'तक्रार निवारण व वाद न्यायाधिकरण'],
    ['Enforce legally binding split settlements supported by NABL lab assays, electronic weighbridge slips, and photo evidence', 'एनएबीएल लैब परीक्षण, इलेक्ट्रॉनिक वे-ब्रिज पर्चियों और फोटो साक्ष्य द्वारा समर्थित कानूनी रूप से बाध्यकारी समझौते लागू करें', 'एनएबीएल लॅब चाचणी, इलेक्ट्रॉनिक वजन पावती व फोटो पुराव्यांच्या आधारे कायदेशीर लवाद निकाल लागू करा'],
    ['Inspect Evidence', 'साक्ष्य देखें', 'पुरावे तपासा'],
    ['Open Evidence', 'साक्ष्य देखें', 'पुरावे तपासा'],
    ['Fast-Track Auto-Arbitration', 'फास्ट-ट्रैक स्वचालित मध्यस्थता', 'जलद-गती स्वयंचलित लवाद'],
    ['Fast-Track Auto-Arbitrate & Award', 'फास्ट-ट्रैक स्वचालित मध्यस्थता और फैसला', 'जलद-गती स्वयंचलित लवाद व निकाल'],
    ['Auto-Arbitrate', 'स्वचालित मध्यस्थता', 'स्वयंचलित लवाद'],
    ['Enforce Award', 'फैसला लागू करें', 'निकाल लागू करा'],
    ['Binding Award Enforced', 'बाध्यकारी आदेश लागू', 'कायदेशीर निकाल लागू'],
    ['Arbitration In Progress', 'मध्यस्थता प्रगति पर है', 'लवाद सुनावणी सुरू आहे'],
    ['Farmer Claim', 'किसान का दावा', 'शेतकऱ्याचा दावा'],
    ['Buyer Claim', 'खरीदार का दावा', 'खरेदीदाराचा दावा'],
    ['Disputed Amount', 'विवादित राशि', 'वादग्रस्त रक्कम'],
    ['Disputed Escrow Pool:', 'विवादित एस्क्रो पूल:', 'वादग्रस्त एस्क्रो निधी:'],
    ['Statutory Mandi Tribunal Evidence Dossier', 'वैधानिक मंडी न्यायाधिकरण साक्ष्य दस्तावेज', 'वैधानिक बाजार समिती लवाद पुरावे संच'],
    ['Claimant Farmer', 'दावेदार किसान', 'तक्रारदार शेतकरी'],
    ['Respondent Buyer', 'प्रतिवादी खरीदार', 'प्रतिवादी खरेदीदार'],
    ['Quarantined Disputed Escrow Pool:', 'रोका गया विवादित एस्क्रो पूल:', 'होल्डवरील वादग्रस्त एस्क्रो निधी:'],
    ['Certified NABL Lab Quality Assay', 'प्रमाणित एनएबीएल लैब गुणवत्ता परीक्षण', 'प्रमाणित NABL प्रयोगशाळा गुणवत्ता चाचणी'],
    ['Testing Lab:', 'परीक्षण प्रयोगशाला:', 'तपासणी प्रयोगशाळा:'],
    ['Parameter Measured:', 'मापा गया पैरामीटर:', 'मोजलेला निकष:'],
    ['Proposed Tribunal Order:', 'प्रस्तावित ट्रिब्यूनल आदेश:', 'प्रस्तावित लवाद आदेश:'],
    ['Proposed Tribunal Award:', 'प्रस्तावित ट्रिब्यूनल फैसला:', 'प्रस्तावित लवाद निकाल:'],
    ['Maharashtra Fast-Track Agricultural Dispute Tribunal', 'महाराष्ट्र फास्ट-ट्रैक कृषि विवाद न्यायाधिकरण', 'महाराष्ट्र जलद-गती कृषी वाद न्यायाधिकरण'],
    ['Statutory dispute arbitration with side-by-side photographic evidence inspection, certified NABL lab quality assays, and binding escrow settlement ratifications.', 'आमने-सामने फोटोग्राफिक साक्ष्य निरीक्षण, प्रमाणित एनएबीएल लैब गुणवत्ता परीक्षण और बाध्यकारी एस्क्रो निपटान अनुमोदन के साथ वैधानिक विवाद मध्यस्थता।', 'प्रत्यक्ष फोटो पुरावे तपासणी, प्रमाणित एनएबीएल प्रयोगशाळा चाचणी व कायदेशीर लवाद निकालाच्या आधारे वैधानिक तंटे निवारण.'],
    ['Precedents Register', 'न्यायिक मिसाल रजिस्टर', 'मागील लवाद निकाल नोंदवही'],
    ['Under Fast-Track Tribunal Review', 'फास्ट-ट्रैक ट्रिब्यूनल समीक्षाधीन', 'जलद-गती न्यायाधिकरण पुनरावलोकनाखाली'],
    ['Quarantined Escrow Funds', 'रोका गया एस्क्रो फंड', 'होल्डवरील एस्क्रो निधी'],
    ['Settlement Ratification Rate', 'निपटान अनुमोदन दर', 'तडजोड मंजुरी प्रमाण'],
    ['Avg Hearing SLA Turnaround', 'औसत सुनवाई एसएलए टर्नअराउंड', 'सरासरी सुनावणी निकाल वेळ'],
    ['MSAMB Arbitration Bench', 'एमएसएएमबी मध्यस्थता बेंच', 'महाराष्ट्र राज्य कृषी पणन मंडळ लवाद खंडपीठ'],
    ['1. Visual Evidence Lightbox', '1. दृश्य साक्ष्य निरीक्षण', '१. प्रत्यक्ष फोटो पुरावे'],
    ['2. Certified Lab Assay & Weighbridge', '2. प्रमाणित लैब रिपोर्ट और वे-ब्रिज', '२. प्रमाणित लॅब अहवाल व वजन पावती'],
    ['3. Compensation Splitter & Award', '3. मुआवजा विभाजन और फैसला', '३. नुकसानभरपाई वाटप व निकाल'],
    ['Origin: Farm Gate Loading', 'मूल स्रोत: खेत पर लोडिंग', 'उगम: शेतबांधावर माल भरणे'],
    ['Destination: DC Intake Receiving', 'गंतव्य: डीसी इनटेक प्राप्ति', 'गंतव्य: वितरण केंद्र (DC) आवक'],
    ['Claimed Discrepancy', 'दावा की गई विसंगति', 'दाखवलेली तफावत'],
    ['Damage Log:', 'नुकसान विवरण:', 'नुकसान नोंद:'],
    ['Proceed to Lab Assays →', 'लैब रिपोर्ट पर जाएं →', 'प्रयोगशाळा चाचणीकडे जा →'],
    ['Third-Party Quality Assay', 'तृतीय-पक्ष गुणवत्ता परीक्षण', 'त्रयस्थ प्रयोगशाळा गुणवत्ता चाचणी'],
    ['Parameter Tested:', 'परीक्षण किया गया पैरामीटर:', 'तपासलेला निकष:'],
    ['Standard Contract Norm:', 'मानक अनुबंध मानक:', 'करारानुसार ठरलेला दर्जा:'],
    ['Actual Tested Value:', 'वास्तविक परीक्षण मान:', 'चाचणीत आढळलेले प्रत्यक्ष मूल्य:'],
    ['Official Lab Finding:', 'आधिकारिक लैब निष्कर्ष:', 'अधिकृत लॅबचा निष्कर्ष:'],
    ['APMC Calibrated Weigh Scale', 'एपीएमसी कैलिब्रेटेड वजन कांटा', 'बाजार समिती प्रमाणित वजन काटा'],
    ['Gross Vehicle Weight:', 'कुल वाहन भार (सकल):', 'वाहनाचे एकूण वजन (Gross):'],
    ['Tare Unladen Weight:', 'खाली वाहन भार (टेयर):', 'रिकाम्या वाहनाचे वजन (Tare):'],
    ['Certified Net Weight:', 'प्रमाणित शुद्ध भार (नेट):', 'प्रमाणित निव्वळ वजन (Net):'],
    ['Calibration Status:', 'कैलिब्रेशन स्थिति:', 'काटा प्रमाणीकरण स्थिती:'],
    ['Interactive Escrow Allocation Sliders', 'इंटरैक्टिव एस्क्रो आवंटन स्लाइडर', 'परस्परसंवादी एस्क्रो वाटप स्लायडर'],
    ['Total Disputed Pool:', 'कुल विवादित पूल:', 'एकूण वादग्रस्त निधी:'],
    ['MSAMB Statutory Binding Arbitration Order (Section 42-A)', 'एमएसएएमबी वैधानिक बाध्यकारी मध्यस्थता आदेश (धारा 42-ए)', 'पणन मंडळ वैधानिक कायदेशीर लवाद आदेश (कलम ४२-अ)'],
    ['Seal: MSAMB-ARB-2026', 'मुहर: एमएसएएमबी-एआरबी-2026', 'शिक्का: MSAMB-ARB-2026'],
    ['Presiding Officer:', 'पीठासीन अधिकारी:', 'पीठासीन अधिकारी:'],
    ['Arbitration SLA:', 'मध्यस्थता एसएलए:', 'लवाद निकाल मुदत:'],

    // Reports & Audits
    ['Platform Governance & Audit Reports', 'प्लेटफॉर्म प्रशासन और ऑडिट रिपोर्ट', 'प्लॅटफॉर्म प्रशासन व तपासणी अहवाल'],
    ['Cryptographic immutable records and state APMC regulatory compliance audits', 'क्रिप्टोग्राफिक अपरिवर्तनीय रिकॉर्ड और राज्य एपीएमसी नियामक अनुपालन ऑडिट', 'क्रिप्टोग्राफिक सुरक्षित नोंदी व राज्य बाजार समिती नियामक तपासणी अहवाल'],
    ['Export CSV', 'सीएसवी निर्यात करें', 'सीएसव्ही डाऊनलोड'],
    ['Download PDF Report', 'पीडीएफ रिपोर्ट डाउनलोड करें', 'पीडीएफ अहवाल डाऊनलोड'],
    ['Event ID', 'घटना आईडी', 'नोंद क्रमांक'],
    ['Timestamp', 'समय', 'वेळ'],
    ['Target Entity / Counterparty', 'लक्षित संस्था / पक्षकार', 'संबंधित संस्था / पक्षकार'],
    ['Target Entity', 'लक्षित संस्था', 'संबंधित संस्था'],
    ['Target & Value', 'लक्ष्य और मूल्य', 'संबंधित घटक व मूल्य'],
    ['Financial Value', 'वित्तीय मूल्य', 'आर्थिक मूल्य'],
    ['Cryptographic Hash', 'क्रिप्टोग्राफिक हैश', 'क्रिप्टोग्राफिक हॅश'],
    ['Cryptographic Governance Audit Trail', 'क्रिप्टोग्राफिक प्रशासन ऑडिट ट्रेल', 'क्रिप्टोग्राफिक प्रशासकीय ऑडिट नोंदवही'],
    ['Immutable SHA-256 Hashes', 'अपरिवर्तनीय SHA-256 हैश', 'अपरिवर्तनीय SHA-256 हॅश'],
    ['Print / Save as PDF', 'प्रिंट करें / पीडीएफ के रूप में सहेजें', 'प्रिंट करा / पीडीएफ म्हणून सेव्ह करा'],
    ['Click above or press Ctrl+P to save as official PDF', 'आधिकारिक पीडीएफ के रूप में सहेजने के लिए ऊपर क्लिक करें या Ctrl+P दबाएं', 'अधिकृत पीडीएफ जतन करण्यासाठी वर क्लिक करा किंवा Ctrl+P दाबा'],
    ['Government of Maharashtra • MSAMB', 'महाराष्ट्र शासन • एमएसएएमबी', 'महाराष्ट्र शासन • महाराष्ट्र राज्य कृषी पणन मंडळ'],
    ['AgriNex Regulatory Compliance & Audit Certificate', 'एग्रीनेक्स नियामक अनुपालन और ऑडिट प्रमाण पत्र', 'ॲग्रीनेक्स नियामक कायदेशीर तपासणी प्रमाणपत्र'],
    ['Cryptographic Seal', 'क्रिप्टोग्राफिक मुहर', 'क्रिप्टोग्राफिक अधिकृत शिक्का'],
    ['Dispute Resolution SLA', 'विवाद समाधान एसएलए', 'तक्रार निवारण मुदत (SLA)'],

    // Common Status & Labels
    ['Active', 'सक्रिय', 'सक्रिय'],
    ['Optimal', 'इष्टतम', 'उत्तम स्थिती'],
    ['Normal', 'सामान्य', 'सुरळीत'],
    ['Near Peak / Watch', 'अधिकतम के निकट / निगरानी', 'कमाल क्षमतेजवळ / देखरेख'],
    ['Anomaly / Alert', 'विसंगति / चेतावनी', 'तफावत / धोक्याचा इशारा'],
    ['Driver:', 'चालक:', 'चालक:'],
    ['Bank:', 'बैंक खाता:', 'बँक खाते:'],
    ['GSTIN:', 'जीएसटी नंबर:', 'जीएसटी क्रमांक:'],
    ['Proof:', 'सत्यापन प्रमाण:', 'पडताळणी पुरावा:'],
    ['Temp:', 'तापमान:', 'तापमान:'],
    ['Humidity:', 'आर्द्रता:', 'हवेतील आर्द्रता:'],
    ['Current Temp:', 'वर्तमान तापमान:', 'सध्याचे तापमान:'],
    ['Reefer Temp:', 'रीफर तापमान:', 'शीत-तापमान:'],
    ['Checkpoint:', 'चेकपॉइंट:', 'तपासणी नाका:'],
    ['Surveillance Signal:', 'निगरानी संकेत:', 'देखरेख इशारा:'],
    ['Members:', 'सदस्य:', 'सदस्य:'],
    ['Land Base:', 'भूमि क्षेत्र:', 'जमीन धारणा:'],
    ['Sanctioned Line:', 'स्वीकृत क्रेडिट सीमा:', 'मंजूर पत मर्यादा:'],
    ['Utilized:', 'उपयोग किया गया:', 'वापरलेले भांडवल:'],
    ['Capacity:', 'क्षमता:', 'क्षमता:'],
    ['Temp / Humidity:', 'तापमान / आर्द्रता:', 'तापमान / हवेतील आर्द्रता:'],
    ['Cargo:', 'माल (कार्गो):', 'शेतमाल (कार्गो):'],
    ['Crops:', 'फसलें:', 'शेतमाल:'],
    ['Modal Rate:', 'मॉडल दर:', 'सरासरी दर:'],
    ['Arrivals Today:', 'आज की आवक:', 'आजची आवक:'],
    ['Target:', 'लक्ष्य:', 'संबंधित घटक:'],
    ['Amount:', 'राशि:', 'रक्कम:'],
    ['Condition:', 'स्थिति:', 'स्थिती:'],
    ['Resolve Now', 'अभी हल करें', 'आत्ताच निकाली काढा'],
    ['All pending governance actions have been triaged and resolved!', 'सभी लंबित प्रशासनिक कार्रवाइयों का समाधान कर दिया गया है!', 'सर्व प्रलंबित प्रशासकीय कामांचा निपटारा झाला आहे!'],
    ['All urgent dual-key releases, tribunal bench hearings, and KYC authorizations are complete.', 'सभी आवश्यक डुअल-की भुगतान, ट्रिब्यूनल सुनवाई और केवाईसी सत्यापन पूर्ण हो चुके हैं।', 'सर्व आवश्यक ड्युअल-की देयके, लवाद सुनावण्या आणि केवायसी मंजुरी पूर्ण झाली आहे.'],
    ['40% State Bulk Transport Subsidy', '40% राज्य थोक परिवहन सब्सिडी', '४०% राज्य घाऊक वाहतूक अनुदान'],
    ['Disburse Subsidy via Direct DBT', 'प्रत्यक्ष डीबीटी द्वारा सब्सिडी संवितरित करें', 'थेट बँक खात्यात (DBT) अनुदान वर्ग करा'],
    ['Enhance Working Capital Line', 'कार्यशील पूंजी सीमा बढ़ाएं', 'खेळत्या भांडवलाची मर्यादा वाढवा'],
    ['Issue Form-IV Notice', 'फॉर्म-IV नोटिस जारी करें', 'फॉर्म-IV नोटीस बजावा'],
    ['Form-IV Dispatched & Buffer Active', 'फॉर्म-IV प्रेषित व बफर सक्रिय', 'फॉर्म-IV पाठवले व बफर स्टॉक सुरू'],
    ['Connected to Maharashtra Telecom Gateway (IVR + SMS)', 'महाराष्ट्र टेलीकॉम गेटवे (आईवीआर + एसएमएस) से जुड़ा', 'महाराष्ट्र टेलिकॉम गेटवे (IVR + SMS) शी जोडले'],
    ['Unseasonal Rain & Hailstorm', 'बेमौसम बारिश और ओलावृष्टि', 'अवकाळी पाऊस आणि गारपीट'],
    ['MSP Emergency Procurement', 'एमएसपी आपातकालीन खरीद', 'हमीभाव तातडीची शासकीय खरेदी'],
    ['Fall Armyworm Pest Alert', 'फॉल आर्मीवर्म कीट चेतावनी', 'लष्करी अळी (फॉली आर्मीवर्म) कीड इशारा'],
    ['Broadcast Language:', 'प्रसारण भाषा:', 'प्रसारण भाषा:'],
    ['Target Scope:', 'लक्षित दायरा:', 'लक्षित कार्यक्षेत्र:'],
    ['Powered by Sarvam AI Bulbul (v3 Indian Voice)', 'सर्वम एआई बुलबुल (v3 भारतीय वॉयस) द्वारा संचालित', 'सर्व्हम AI बुलबुल (v3 भारतीय आवाज) द्वारे संचालित'],
    ['Preview Natural Voice Call', 'प्राकृतिक वॉयस कॉल का पूर्वावलोकन करें', 'नैसर्गिक आवाजातील कॉल ऐका'],
    ['Ready to synthesize audio', 'ऑडियो संश्लेषित करने के लिए तैयार', 'ऑडिओ तयार करण्यासाठी सज्ज'],
    ['Voice Engine: Sarvam Bulbul v3 / Priya', 'वॉयस इंजन: सर्वम बुलबुल v3 / प्रिया', 'व्हॉईस इंजिन: सर्व्हम बुलबुल v3 / प्रिया'],
    ['Estimated Reach:', 'अनुमानित पहुंच:', 'अपेक्षित पोहोच:'],
    ['Cancel', 'रद्द करें', 'रद्द करा'],
    ['Dispatch Multilingual Blast (IVR + SMS)', 'बहुभाषी संदेश भेजें (आईवीआर + एसएमएस)', 'सर्व घटकांना बहुभाषिक संदेश पाठवा (IVR + SMS)'],
    ['[TRANSMISSION DESK]', '[प्रसारण डेस्क]', '[प्रसारण डेस्क]'],
    ['Initializing gateway queues...', 'गेटवे कतार आरंभ की जा रही है...', 'गेटवे रांग सुरू केली जात आहे...'],
    ['FPO Federation Governance', 'एफपीओ महासंघ प्रशासन', 'शेतकरी उत्पादक संस्था (FPO) प्रशासन'],
    ['Maharashtra State APMC GIS Command Map', 'महाराष्ट्र राज्य एपीएमसी जीआईएस नियंत्रण नक्शा', 'महाराष्ट्र राज्य बाजार समिती जीआयएस नियंत्रण नकाशा'],
    ['305 APMC Mandis · 4 MSWC Cold Hubs · Live Transit Corridors Telemetry', '305 एपीएमसी मंडियां · 4 एमएसडब्ल्यूसी कोल्ड हब · लाइव ट्रांजिट कॉरिडोर टेलीमेट्री', '३०५ बाजार समित्या · ४ MSWC शीत केंद्रे · थेट वाहतूक कॉरिडॉर माहिती'],
    ['All Nodes', 'सभी नोड्स', 'सर्व केंद्रे'],
    ['APMC Mandis', 'एपीएमसी मंडियां', 'बाजार समित्या'],
    ['MSWC Cold Hubs', 'एमएसडब्ल्यूसी कोल्ड हब', 'MSWC शीत केंद्रे'],
    ['Mandi', 'मंडी', 'बाजार समिती'],
    ['Clear', 'स्वीकृत', 'मंजूर'],
    ['Hold', 'रोकें (होल्ड)', 'होल्डवर ठेवा'],
    ['Dual-Key', 'डुअल-की', 'ड्युअल-की'],
    ['Commodity Name', 'फसल का नाम', 'शेतमालाचे नाव'],
    ['MSP Floor Price', 'एमएसपी न्यूनतम मूल्य', 'शासकीय हमीभाव'],
    ['Modal APMC Price (₹/kg)', 'मंडी मॉडल भाव (₹/किलो)', 'बाजार समिती सरासरी भाव (₹/किलो)'],
    ['Market Trend', 'बाजार का रुख', 'बाजाराचा कल'],
    ['Primary APMC Mandis', 'प्रमुख एपीएमसी मंडियां', 'प्रमुख बाजार समित्या'],
    ['Governance Alert', 'प्रशासन अलर्ट', 'प्रशासकीय सूचना'],
    ['Statutory Benchmarks Tracked', 'वैधानिक बेंचमार्क ट्रैक किए गए', 'वैधानिक हमीभाव नोंदवले'],
    ['Avg MSP Floor Protection', 'औसत एमएसपी न्यूनतम सुरक्षा', 'सरासरी हमीभाव आधारभूत संरक्षण'],
    ['APMC Mandi Compliance Index', 'एपीएमसी मंडी अनुपालन सूचकांक', 'बाजार समिती नियम पालन निर्देशांक'],
    ['Download MSP Index', 'एमएसपी सूचकांक डाउनलोड करें', 'हमीभाव निर्देशांक डाऊनलोड करा'],
    ['28 Maharashtra Commodity Mandi Benchmark Indices (₹/kg & ₹/Qt)', '28 महाराष्ट्र फसल मंडी बेंचमार्क सूचकांक (₹/किलो और ₹/क्विंटल)', '२८ महाराष्ट्र शेतमाल बाजार समिती भाव निर्देशांक (₹/किलो व ₹/क्विंटल)'],
    ['Live MSAMB Feed • Standardized in ₹/kg', 'लाइव एमएसएएमबी फीड • ₹/किलो में मानकीकृत', 'थेट पणन मंडळ आकडेवारी • ₹/किलोमध्ये प्रमाणित'],
    ['Statutory MSP floor price enforcement, modal rate calibrations, and anti-hoarding ceiling monitoring across 305 APMC mandis.', '305 एपीएमसी मंडियों में वैधानिक एमएसपी न्यूनतम मूल्य प्रवर्तन, मॉडल दर कैलिब्रेशन और जमाखोरी विरोधी सीमा निगरानी।', '३०५ बाजार समित्यांमध्ये वैधानिक हमीभाव अंमलबजावणी, सरासरी दर निश्चिती व साठेबाजी प्रतिबंधक कमाल मर्यादा देखरेख.'],
    ['Statutory MSP floor price enforcement, modal rate calibrations, and anti-hoarding ceiling monitoring across 305 APMC mandis', '305 एपीएमसी मंडियों में वैधानिक एमएसपी न्यूनतम मूल्य प्रवर्तन, मॉडल दर कैलिब्रेशन और जमाखोरी विरोधी सीमा निगरानी', '३०५ बाजार समित्यांमध्ये वैधानिक हमीभाव अंमलबजावणी, सरासरी दर निश्चिती व साठेबाजी प्रतिबंधक कमाल मर्यादा देखरेख'],
    ['14 Items Requiring Admin Attention', '14 कार्य जिन पर प्रशासक का ध्यान आवश्यक है', '१४ प्रलंबित कृती ज्यांवर लक्ष देणे आवश्यक आहे'],
    ['Items Requiring Admin Attention', 'प्रशासक के ध्यान हेतु आवश्यक कार्य', 'प्रशासकीय लक्ष वेधून घेणारे आवश्यक कार्य'],
    ['AI Voice & Multilingual Broadcast Desk', 'एआई वॉयस व बहुभाषी प्रसारण डेस्क', 'एआय व्हॉईस व बहुभाषिक प्रसारण डेस्क'],
    ['Select Crisis Scenario / Preset:', 'संकट परिदृश्य / प्रीसेट चुनें:', 'संकट परिस्थिती / तयार संदेश निवडा:'],
    ['Select Crisis Scenario / Preset', 'संकट परिदृश्य / प्रीसेट चुनें', 'संकट परिस्थिती / तयार संदेश निवडा'],
    ['Live Escrow Pool: ₹ 18.45 Cr (Protected)', 'लाइव एस्क्रो पूल: ₹ 18.45 करोड़ (सुरक्षित)', 'थेट एस्क्रो निधी: ₹ १८.४५ कोटी (सुरक्षित)'],
    ['Maharashtra Dual-Key Escrow Clearance Desk', 'महाराष्ट्र डुअल-की एस्क्रो निकासी डेस्क', 'महाराष्ट्र ड्युअल-की एस्क्रो मंजुरी डेस्क'],
    ['100% Dual-Key Bank Backed', '100% डुअल-की बैंक गारंटी प्राप्त', '१००% ड्युअल-की बँक हमी संरक्षित'],
    ['Regulated release of 35% advance farm-gate payouts and 65% destination settlement clearances under Nodal Trustee Bank (ICICI/SBI) oversight with instant IMPS/RTGS disbursal.', 'नोडल ट्रस्टी बैंक (आईसीआईसीआई/एसबीआई) की देखरेख में तत्काल आईएमपीएस/आरटीजीएस वितरण के साथ 35% अग्रिम खेत-गेट भुगतान और 65% गंतव्य निपटान निकासी का विनियमित विमोचन।', 'नोडल ट्रस्टी बँक (ICICI/SBI) च्या देखरेखीखाली तात्काळ IMPS/RTGS वितरणासह ३५% उचल शेतबांधावर व ६५% अंतिम देयकांचे नियमन केलेले वितरण.'],
    ['AgriNex - Maharashtra APMC Mandi Price Governance & MSP Controls', 'एग्रीनेक्स - महाराष्ट्र एपीएमसी मंडी भाव प्रशासन व एमएसपी नियंत्रण', 'ॲग्रीनेक्स - महाराष्ट्र बाजार समिती भाव प्रशासन व हमीभाव नियंत्रण'],
    ['AgriNex - Grievance Redressal & Arbitration Tribunal', 'एग्रीनेक्स - शिकायत निवारण और मध्यस्थता न्यायाधिकरण', 'ॲग्रीनेक्स - तक्रार निवारण व लवाद न्यायाधिकरण'],
    ['Fast-Track Arbitration Bench: 100% Resolution Rate', 'फास्ट-ट्रैक मध्यस्थता बेंच: 100% समाधान दर', 'जलद-गती लवाद खंडपीठ: १००% तंटे निवारण दर'],
    ['Fast-Track SLA (< 2.1h)', 'फास्ट-ट्रैक एसएलए (< 2.1 घंटे)', 'जलद-गती SLA (< २.१ तास)'],
    ['Fast-Track SLA (&lt; 2.1h)', 'फास्ट-ट्रैक एसएलए (< 2.1 घंटे)', 'जलद-गती SLA (< २.१ तास)'],
    ['Back to Visual Lightbox', 'दृश्य साक्ष्य पर वापस', 'फोटो पुराव्यांकडे परत'],
    ['Back to Lab Assays', 'लैब रिपोर्ट पर वापस', 'प्रयोगशाळा चाचणीकडे परत'],
    ['Real-Time IoT Cold-Chain Transport Telemetry', 'वास्तविक समय आईओटी शीत-शृंखला परिवहन टेलीमेट्री', 'थेट आयओटी शीत-वाहतूक माहिती'],
    ['Route Waypoint Telemetry Log:', 'मार्ग वेपॉइंट टेलीमेट्री लॉग:', 'वाहतूक मार्ग तपासणी नोंद:'],
    ['Route Waypoint Telemetry Log', 'मार्ग वेपॉइंट टेलीमेट्री लॉग', 'वाहतूक मार्ग तपासणी नोंद'],
    ['Playing Sarvam AI Bulbul Voice', 'सर्वम एआई बुलबुल वॉयस बज रहा है', 'सर्व्हम AI बुलबुल आवाज वाजत आहे'],
    ['Playing via Local Voice Synthesizer', 'स्थानीय वॉयस सिंथेसाइज़र द्वारा बज रहा है', 'स्थानिक व्हॉईस सिंथेसायझरद्वारे वाजत आहे'],
    ['+ ₹ 50 Lakhs', '+ ₹ 50 लाख', '+ ₹ ५० लाख'],
    ['+ ₹ 1.00 Crore', '+ ₹ 1.00 करोड़', '+ ₹ १.०० कोटी'],
    ['+ ₹ 2.00 Crores', '+ ₹ 2.00 करोड़', '+ ₹ २.०० कोटी'],
    ['MSAMB Regulatory Compliance & Audit Report - AgriNex', 'एमएसएएमबी नियामक अनुपालन और ऑडिट रिपोर्ट - एग्रीनेक्स', 'पणन मंडळ नियामक कायदेशीर तपासणी अहवाल - ॲग्रीनेक्स'],
    ['This audit report is cryptographically sealed under statutory authority of the Maharashtra Agricultural Produce Marketing (Development and Regulation) Act.', 'यह ऑडिट रिपोर्ट महाराष्ट्र कृषि उपज विपणन (विकास और विनियमन) अधिनियम के वैधानिक अधिकार के तहत क्रिप्टोग्राफिक रूप से मुहरबंद है।', 'हा तपासणी अहवाल महाराष्ट्र कृषी उत्पन्न पणन (विकास व नियमन) कायद्याच्या वैधानिक अधिकारांतर्गत क्रिप्टोग्राफिक पद्धतीने अधिकृत प्रमाणित आहे.'],
    ['Digital Signature: 0x7f2a99...msamb', 'डिजिटल हस्ताक्षर: 0x7f2a99...msamb', 'डिजिटल स्वाक्षरी: 0x7f2a99...msamb'],
    ['100% OK', '100% ठीक', '१००% सुरळीत'],
    ['Triage and resolve critical platform actions across Dual-Key Escrow payouts, Tribunal dispute hearings, User KYC verifications, and Emergency clearance authorizations.', 'डुअल-की एस्क्रो भुगतान, ट्रिब्यूनल विवाद सुनवाई, उपयोगकर्ता केवाईसी सत्यापन और आपातकालीन निकासी प्राधिकरणों की तत्काल समीक्षा और समाधान करें।', 'ड्युअल-की एस्क्रो देयके, लवाद वाद सुनावण्या, वापरकर्ता केवायसी पडताळणी आणि तातडीच्या लिलाव मंजुरी प्रलंबित कृतींचे त्वरित निवारण करा.'],
    ['Proceed to Compensation Splitter', 'मुआवजा विभाजन पर जाएं', 'नुकसानभरपाई वाटपाकडे जा'],
    ['Proceed to Compensation Splitter →', 'मुआवजा विभाजन पर जाएं →', 'नुकसानभरपाई वाटपाकडे जा →'],
    ['Statutory MSP & Benchmark Control Desk', 'वैधानिक एमएसपी व बेंचमार्क नियंत्रण डेस्क', 'वैधानिक हमीभाव व बेंचमार्क नियंत्रण डेस्क'],
    ['Select Language', 'भाषा चुनें', 'भाषा निवडा'],
    ['Close', 'बंद करें', 'बंद करा'],
    ['7/12 Land Record', '7/12 भूमि अभिलेख', '७/१२ सातबारा उतारा'],
    ['NABL Accredited', 'एनएबीएल मान्यता प्राप्त', 'NABL मान्यताप्राप्त'],
    ['Under Arbitration', 'मध्यस्थता / न्यायाधिकरण समीक्षाधीन', 'लवाद न्यायाधिकरणाधीन'],
    ['Settled', 'निपटारा संपन्न', 'निवारण पूर्ण'],
    ['Quarantined / Disputed', 'संगरोधित / विवादित', 'क्वारंटाइन / विवादित'],
    ['Dual-geotagged origin pickup & destination DC photos on record', 'दोहरे जियोटैग वाले मूल पिकअप और गंतव्य डीसी फोटो रिकॉर्ड पर', 'दुहेरी जिओटॅग केलेले मूळ पिकअप आणि गंतव्य डीसी फोटो नोंदीवर'],
    ['Cold Chain Integrity Preserved', 'कोल्ड चेन अखंडता संरक्षित', 'शीत-साखळी अखंडता सुरक्षित'],
    ['Temperature Breach Warning', 'तापमान उल्लंघन चेतावनी', 'तापमान उल्लंघन इशारा'],
    ['FPO Credit Underwriting & Working Capital', 'एफपीओ ऋण हामीदारी और कार्यशील पूंजी', 'एफपीओ कर्ज हमी व खेळते भांडवल'],
    ['Please enter or select advisory text to preview audio.', 'ऑडियो पूर्वावलोकन के लिए कृपया परामर्श पाठ दर्ज करें या चुनें।', 'ऑडिओ पूर्वावलोकनसाठी कृपया सल्ला मजकूर प्रविष्ट करा किंवा निवडा.'],
    ['Audio preview ready.', 'ऑडियो पूर्वावलोकन तैयार है।', 'ऑडिओ पूर्वावलोकन तयार आहे.'],
    ['Please enter message content before dispatching.', 'भेजने से पहले कृपया संदेश सामग्री दर्ज करें।', 'पाठवण्यापूर्वी कृपया संदेश मजकूर प्रविष्ट करा.'],
    ['Please allow popups to generate the official audit report.', 'आधिकारिक ऑडिट रिपोर्ट तैयार करने के लिए कृपया पॉपअप की अनुमति दें।', 'अधिकृत ऑडिट अहवाल तयार करण्यासाठी कृपया पॉपअपची परवानगी द्या.']
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

  // 6.5. DEDICATED SHELL PHRASES (For guaranteed Admin Sidebar, Nav & Banner localization)
  const SHELL_PHRASES = [
    ['Marketplace Control Center', 'मार्केटप्लेस नियंत्रण केंद्र', 'बाजारपेठ नियंत्रण केंद्र'],
    ['Control Center', 'नियंत्रण केंद्र', 'नियंत्रण केंद्र'],
    ['Governance Desks', 'प्रशासन डेस्क', 'प्रशासन डेस्क'],
    ['Connected Portals:', 'कनेक्टेड पोर्टल:', 'जोडलेली दालने:'],
    ['Farmer Portal', 'किसान पोर्टल', 'शेतकरी दालन'],
    ['Buyer Terminal', 'खरीदार टर्मिनल', 'खरेदीदार टर्मिनल'],
    ['Logistics Hub', 'लॉजिस्टिक्स हब', 'वाहतूक केंद्र'],
    ['Dashboard', 'डैशबोर्ड', 'डॅशबोर्ड'],
    ['Users', 'उपयोगकर्ता और केवायसी', 'वापरकर्ते व केवायसी'],
    ['Users & KYC', 'उपयोगकर्ता और केवायसी', 'वापरकर्ते व केवायसी'],
    ['Market Data', 'मार्केट डेटा', 'बाजार आकडेवारी'],
    ['Deals & Payments', 'सौदे और भुगतान', 'सौदे व देयके'],
    ['Logistics & Storage', 'लॉजिस्टिक्स और भंडारण', 'वाहतूक व साठवणूक'],
    ['Emergency Sell', 'आपातकालीन बिक्री', 'तातडीची विक्री'],
    ['Grievances', 'शिकायतें', 'तक्रारी'],
    ['Reports', 'रिपोर्ट और ऑडिट', 'अहवाल व तपासणी'],
    ['Escrow Clearances', 'एस्क्रो निकासी', 'एस्क्रो मंजुरी'],
    ['Mandi MSP Desk', 'मंडी एमएसपी डेस्क', 'बाजार समिती हमीभाव डेस्क'],
    ['Tribunal Bench', 'न्यायाधिकरण बेंच', 'लवाद खंडपीठ'],
    ['🛡️ AgriNex Marketplace Control Center', '🛡️ एग्रीनेक्स मार्केटप्लेस नियंत्रण केंद्र', '🛡️ अ‍ॅग्रीनेक्स बाजारपेठ नियंत्रण केंद्र'],
    ['AgriNex Marketplace Control Center', 'एग्रीनेक्स मार्केटप्लेस नियंत्रण केंद्र', 'अ‍ॅग्रीनेक्स बाजारपेठ नियंत्रण केंद्र'],
    ['Sign Out', 'लॉग आउट', 'बाहेर पडा'],
    ['Switch Portal', 'पोर्टल बदलें', 'दालन बदला'],
    ['Directory →', 'निर्देशिका →', 'निर्देशिका →'],
    ['Ledger →', 'खाताबही →', 'नोंदवही →'],
    ['Track →', 'ट्रैक करें →', 'मागोवा घ्या →'],
    ['Triage →', 'कार्यवाही →', 'निवारण करा →'],
    ['Triage All', 'सभी की समीक्षा करें', 'सर्व निवारण करा'],
    ['Dr. R. K. Shinde, IAS', 'डॉ. आर. के. शिंदे, आईएएस', 'डॉ. आर. के. शिंदे, आयएएस'],
    ['Central APMC Control Desk', 'केंद्रीय एपीएमसी नियंत्रण कक्ष', 'केंद्रीय बाजार समिती नियंत्रण कक्ष'],
    ['305 Mandis Live Across Maharashtra', 'महाराष्ट्र भर में 305 मंडियां लाइव', 'महाराष्ट्रभरातील ३०५ बाजार समित्या थेट कार्यरत'],
    ['Nodal Governance Active', 'नोडल प्रशासन सक्रिय', 'नोडल प्रशासन सक्रिय'],
    ['14,280 Producers · 850 Enterprise Buyers', '14,280 उत्पादक · 850 कॉर्पोरेट खरीदार', '१४,२८० उत्पादक · ८५० संस्थात्मक खरेदीदार'],
    ['1,420 Active Trade Contracts', '1,420 सक्रिय व्यापार अनुबंध', '१,४२० सक्रिय व्यवहार करार'],
    ['Orders in Transport across MH', 'महाराष्ट्र भर में परिवहन में ऑर्डर', 'महाराष्ट्रभरात वाहतुकीतील माल'],
    ['5 Escrow · 3 Disputes · 6 KYC', '5 एस्क्रो · 3 विवाद · 6 केवाईसी', '५ एस्क्रो · ३ वाद · ६ केवायसी'],
    ['✓ Satbara 7/12 & GSTIN Verified', '✓ सातबारा 7/12 और जीएसटी सत्यापित', '✓ ७/१२ व जीएसटी प्रमाणित'],
    ['Search Users, Deals, Mandi commodities, Shipments... (Press ⌘K or Ctrl+K)', 'उपयोगकर्ता, सौदे, मंडी कृषि उत्पाद, शिपमेंट खोजें... (⌘K या Ctrl+K दबाएं)', 'वापरकर्ते, सौदे, बाजार समिती शेतमाल, वाहतूक शोधा... (⌘K किंवा Ctrl+K दाबा)']
  ];

  // 7. REVERSE DICTIONARIES & BIDIRECTIONAL LOCALIZATION
  const REVERSE_CORE_MAP = {};
  const REVERSE_SUBSTRINGS = [];
  const REVERSE_CROPS = {};
  const REVERSE_PERSONS = {};
  const REVERSE_BUYERS = {};
  const REVERSE_MANDIS = {};
  const REVERSE_WAREHOUSES = {};
  const REVERSE_PLACEHOLDERS = {};

  function buildReverseDictionaries() {
    // 1. Merge SHELL_PHRASES into RAW_PHRASES
    if (typeof SHELL_PHRASES !== 'undefined' && Array.isArray(SHELL_PHRASES)) {
      for (let i = 0; i < SHELL_PHRASES.length; i++) {
        RAW_PHRASES.push(SHELL_PHRASES[i]);
      }
    }

    // 2. Core phrases
    for (let i = 0; i < RAW_PHRASES.length; i++) {
      const row = RAW_PHRASES[i];
      const en = row[0];
      const hi = row[1];
      const mr = row[2];
      if (hi) {
        REVERSE_CORE_MAP[hi.toLowerCase().trim()] = en;
        REVERSE_SUBSTRINGS.push({ foreign: hi.trim(), en: en });
      }
      if (mr && mr.toLowerCase().trim() !== (hi && hi.toLowerCase().trim())) {
        REVERSE_CORE_MAP[mr.toLowerCase().trim()] = en;
        REVERSE_SUBSTRINGS.push({ foreign: mr.trim(), en: en });
      }
    }

    // 3. Maps helper
    function indexMap(sourceMap, targetReverse) {
      for (const [en, v] of Object.entries(sourceMap)) {
        if (v.hi) {
          targetReverse[v.hi.toLowerCase().trim()] = en;
          REVERSE_CORE_MAP[v.hi.toLowerCase().trim()] = en;
          REVERSE_SUBSTRINGS.push({ foreign: v.hi.trim(), en: en });
        }
        if (v.mr) {
          targetReverse[v.mr.toLowerCase().trim()] = en;
          REVERSE_CORE_MAP[v.mr.toLowerCase().trim()] = en;
          REVERSE_SUBSTRINGS.push({ foreign: v.mr.trim(), en: en });
        }
      }
    }

    indexMap(CROP_MAP, REVERSE_CROPS);
    indexMap(PERSON_MAP, REVERSE_PERSONS);
    indexMap(BUYER_MAP, REVERSE_BUYERS);
    indexMap(MANDI_MAP, REVERSE_MANDIS);
    indexMap(WAREHOUSE_MAP, REVERSE_WAREHOUSES);
    indexMap(PLACEHOLDER_MAP, REVERSE_PLACEHOLDERS);

    // Sort substrings by descending length to prevent partial word collision
    REVERSE_SUBSTRINGS.sort((a, b) => b.foreign.length - a.foreign.length);
  }

  buildReverseDictionaries();

  function getAdminLanguage() {
    try {
      return localStorage.getItem(STORAGE_KEY) || localStorage.getItem('agrinex_language') || 'en';
    } catch (e) {
      return 'en';
    }
  }

  // Helper to peel leading/trailing emojis, symbols, colons, arrows
  function decomposeText(str) {
    let prefix = '';
    let suffix = '';
    let core = str.trim();

    const prefixRegex = /^([\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F900}-\u{1F9FF}✓⚠️⚡📍❄️🌐🎯>•·]+\s*)+/u;
    const pMatch = core.match(prefixRegex);
    if (pMatch) {
      prefix = pMatch[0];
      core = core.slice(prefix.length).trim();
    }

    const suffixRegex = /([:→➔←↗\s·•]+)$/;
    const sMatch = core.match(suffixRegex);
    if (sMatch) {
      suffix = sMatch[0];
      core = core.slice(0, -suffix.length).trim();
    }

    return { prefix, core, suffix };
  }

  // Helper: translate any Hindi or Marathi string back to canonical English
  function translateToEnglish(str) {
    if (!str || typeof str !== 'string') return str;
    if (!/[\u0900-\u097F]/.test(str)) return str;

    const trimmed = str.trim()
      .replace(/&larr;/g, '←')
      .replace(/&rarr;/g, '→')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&');

    const lowerTrimmed = trimmed.toLowerCase();

    // Direct placeholder map lookup
    if (REVERSE_PLACEHOLDERS[lowerTrimmed]) {
      return REVERSE_PLACEHOLDERS[lowerTrimmed];
    }

    // Direct whole phrase lookup
    if (REVERSE_CORE_MAP[lowerTrimmed]) {
      return REVERSE_CORE_MAP[lowerTrimmed];
    }

    // Decompose into prefix (emojis), core, and suffix
    const { prefix, core, suffix } = decomposeText(trimmed);
    const lowerCore = core.toLowerCase();

    // Direct core lookup
    if (REVERSE_CORE_MAP[lowerCore]) {
      return prefix + REVERSE_CORE_MAP[lowerCore] + suffix;
    }

    // Dynamic patterns in reverse
    if (/^इस सप्ताह \+([0-9.,%]+)$/i.test(core) || /^या आठवड्यात \+([0-9.,%]+)$/i.test(core)) {
      const num = core.match(/\+([0-9.,%]+)/)[1];
      return prefix + '+' + num + ' this week' + suffix;
    }
    if (/^इस महीने \+([0-9.,%]+)$/i.test(core) || /^या महिन्यात \+([0-9.,%]+)$/i.test(core)) {
      const num = core.match(/\+([0-9.,%]+)/)[1];
      return prefix + '+' + num + ' this month' + suffix;
    }
    if (/\+([0-9.,%]+)\s*(लाइसेंस प्राप्त|परवानाधारक)/i.test(core)) {
      const num = core.match(/\+([0-9.,%]+)/)[1];
      return prefix + '+' + num + ' licensed' + suffix;
    }
    if (/शीर्ष\s*([0-9]+)\s*कार्य तत्काल हस्ताक्षर हेतु/i.test(core) || /प्रमुख\s*([0-9]+)\s*कृती तात्काळ स्वाक्षरीसाठी/i.test(core) || /आज हस्ताक्षर हेतु आवश्यक शीर्ष\s*([0-9]+)/i.test(core) || /आज स्वाक्षरीसाठी आवश्यक प्रमुख\s*([0-9]+)/i.test(core)) {
      const num = core.match(/([0-9]+)/)[1];
      return prefix + `Top ${num} Requiring Today's Sign-Off` + suffix;
    }
    if (/सभी\s*([0-9]+)\s*लंबित कार्य देखें/i.test(core) || /सर्व\s*([0-9]+)\s*प्रलंबित कृती पहा/i.test(core)) {
      const num = core.match(/([0-9]+)/)[1];
      return prefix + `View All ${num} Action Items in Full Triage Desk` + suffix;
    }
    if (/^([0-9]+)\s*(लंबित कार्य|प्रलंबित कृती)$/i.test(core)) {
      const num = core.match(/([0-9]+)/)[1];
      return prefix + num + ' Action Items' + suffix;
    }
    if (/([0-9]+)\s*(सक्रिय मामले|सक्रिय प्रकरणे)/i.test(core)) {
      const num = core.match(/([0-9]+)/)[1];
      return prefix + num + ' Active Cases' + suffix;
    }
    if (/([0-9.]+)\s*(घंटे|तास)/i.test(core)) {
      const num = core.match(/([0-9.]+)/)[1];
      return prefix + num + ' Hours' + suffix;
    }
    if (/([0-9]+)\s*(प्रमुख फसलें|प्रमुख शेतमाल)/i.test(core)) {
      const num = core.match(/([0-9]+)/)[1];
      return prefix + num + ' Commodities' + suffix;
    }
    if (/([0-9.,]+)\s*(मीट्रिक टन कुल ट्रैक की गई क्षमता|मेट्रिक टन एकूण नोंदवलेली साठवणूक क्षमता)/i.test(core)) {
      const num = core.match(/([0-9.,]+)/)[1];
      return prefix + num + ' MT Total Capacity Tracked' + suffix;
    }
    if (/^(\(\+38% उछाल\)|\(\+३८% वाढ\))$/.test(core)) return '(+38% spike)';
    if (/^\(स्थिर\)$/.test(core)) return '(Stable)';
    if (core.startsWith('(खेत ₹') || core.startsWith('(शेतबांधावर ₹')) {
      const pr = core.replace(/[^0-9.]/g, '');
      return `(Gate ₹${pr})`;
    }

    // Substring replacements across all registered translations
    let translated = trimmed;
    for (let i = 0; i < REVERSE_SUBSTRINGS.length; i++) {
      const item = REVERSE_SUBSTRINGS[i];
      if (item.foreign.length > 2 && translated.includes(item.foreign)) {
        translated = translated.split(item.foreign).join(item.en);
      }
    }

    return translated;
  }

  function tText(text, targetLang) {
    if (!text || typeof text !== 'string') return text;
    const l = targetLang || getAdminLanguage();

    const trimmed = text.trim()
      .replace(/&larr;/g, '←')
      .replace(/&rarr;/g, '→')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&');
    if (!trimmed || /^[0-9.,₹$%+\-\/:#\s]+$/.test(trimmed)) return text;

    // If target is English: convert any Devanagari text back to English
    if (l === 'en') {
      return translateToEnglish(text);
    }

    // If source is currently in Devanagari, convert to canonical English first
    let englishText = text;
    if (/[\u0900-\u097F]/.test(text)) {
      englishText = translateToEnglish(text);
    }

    // Direct Placeholder map
    if (PLACEHOLDER_MAP[trimmed] && PLACEHOLDER_MAP[trimmed][l]) {
      return PLACEHOLDER_MAP[trimmed][l];
    }
    if (PLACEHOLDER_MAP[englishText.trim()] && PLACEHOLDER_MAP[englishText.trim()][l]) {
      return PLACEHOLDER_MAP[englishText.trim()][l];
    }

    // Decompose into prefix (emojis), core, and suffix
    const { prefix, core, suffix } = decomposeText(englishText.trim());
    const colIdx = l === 'hi' ? 1 : 2;

    // Check Person map
    if (PERSON_MAP[core] && PERSON_MAP[core][l]) return prefix + PERSON_MAP[core][l] + suffix;
    if (PERSON_MAP[englishText.trim()] && PERSON_MAP[englishText.trim()][l]) return PERSON_MAP[englishText.trim()][l];

    // Check Buyer map
    if (BUYER_MAP[core] && BUYER_MAP[core][l]) return prefix + BUYER_MAP[core][l] + suffix;
    if (BUYER_MAP[englishText.trim()] && BUYER_MAP[englishText.trim()][l]) return BUYER_MAP[englishText.trim()][l];

    // Check Crop map
    if (CROP_MAP[core] && CROP_MAP[core][l]) return prefix + CROP_MAP[core][l] + suffix;
    if (CROP_MAP[englishText.trim()] && CROP_MAP[englishText.trim()][l]) return CROP_MAP[englishText.trim()][l];

    // Check Mandi map
    if (MANDI_MAP[core] && MANDI_MAP[core][l]) return prefix + MANDI_MAP[core][l] + suffix;
    if (MANDI_MAP[englishText.trim()] && MANDI_MAP[englishText.trim()][l]) return MANDI_MAP[englishText.trim()][l];

    // Check Warehouse map
    if (WAREHOUSE_MAP[core] && WAREHOUSE_MAP[core][l]) return prefix + WAREHOUSE_MAP[core][l] + suffix;
    if (WAREHOUSE_MAP[englishText.trim()] && WAREHOUSE_MAP[englishText.trim()][l]) return WAREHOUSE_MAP[englishText.trim()][l];

    // Exact Phrase Match on core or trimmed
    for (let i = 0; i < RAW_PHRASES.length; i++) {
      const row = RAW_PHRASES[i];
      if (row[0].toLowerCase() === core.toLowerCase()) {
        return prefix + row[colIdx] + suffix;
      }
      if (row[0].toLowerCase() === englishText.trim().toLowerCase()) {
        return row[colIdx];
      }
    }

    // Dynamic template patterns
    if (/^\+([0-9.,%]+)\s+this\s+week$/i.test(core)) {
      const num = core.match(/^\+([0-9.,%]+)/)[1];
      return prefix + (l === 'hi' ? `इस सप्ताह +${num}` : `या आठवड्यात +${num}`) + suffix;
    }
    if (/^\+([0-9.,%]+)\s+this\s+month$/i.test(core)) {
      const num = core.match(/^\+([0-9.,%]+)/)[1];
      return prefix + (l === 'hi' ? `इस महीने +${num}` : `या महिन्यात +${num}`) + suffix;
    }
    if (/^\+([0-9.,%]+)\s+licensed$/i.test(core)) {
      const num = core.match(/^\+([0-9.,%]+)/)[1];
      return prefix + (l === 'hi' ? `+${num} लाइसेंस प्राप्त` : `+${num} परवानाधारक`) + suffix;
    }
    if (/active orders in transport with IoT temperature telemetry/i.test(core)) {
      return prefix + (l === 'hi'
        ? '312 सक्रिय परिवहन ऑर्डर लाइव आईओटी तापमान टेलीमेट्री और राज्य भंडारण क्षमता के साथ'
        : '३१२ सक्रिय वाहतूक ऑर्डर्स थेट आयओटी तापमान माहिती व राज्य साठवणूक क्षमतेसह') + suffix;
    }
    if (/([0-9.,]+)\s*MT Total Capacity Tracked/i.test(core)) {
      const num = core.match(/([0-9.,]+)/)[1];
      return prefix + (l === 'hi' ? `${num} मीट्रिक टन कुल ट्रैक की गई क्षमता` : `${num} मेट्रिक टन एकूण नोंदवलेली साठवणूक क्षमता`) + suffix;
    }
    if (/Active Orders in Transport/i.test(core)) {
      return prefix + (l === 'hi' ? 'परिवहन में सक्रिय ऑर्डर (लाइव रीफर और मल्टी-एक्सल फ्लीट)' : 'वाहतुकीतील सक्रिय ऑर्डर्स (थेट शीत-वाहतूक व बहु-अ‍ॅक्सल फ्लीट)') + suffix;
    }
    if (/([0-9]+)\s*Commodities/i.test(core)) {
      const num = core.match(/([0-9]+)/)[1];
      return prefix + (l === 'hi' ? `${num} प्रमुख फसलें` : `${num} प्रमुख शेतमाल`) + suffix;
    }
    if (/([0-9]+)\s*Volatility Alerts/i.test(core)) {
      const num = core.match(/([0-9]+)/)[1];
      return prefix + (l === 'hi' ? `${num} मूल्य अस्थिरता चेतावनी` : `${num} बाजारभाव चढ-उतार इशारे`) + suffix;
    }
    if (/([0-9]+)\s*Active Cases/i.test(core)) {
      const num = core.match(/([0-9]+)/)[1];
      return prefix + (l === 'hi' ? `${num} सक्रिय मामले` : `${num} सक्रिय प्रकरणे`) + suffix;
    }
    if (/([0-9.]+)\s*Hours/i.test(core)) {
      const num = core.match(/([0-9.]+)/)[1];
      return prefix + (l === 'hi' ? `${num} घंटे` : `${num} तास`) + suffix;
    }
    if (/View All\s*([0-9]+)\s*Action Items in Full Triage Desk/i.test(core)) {
      const num = core.match(/([0-9]+)/)[1];
      return prefix + (l === 'hi' ? `सभी ${num} लंबित कार्य देखें` : `सर्व ${num} प्रलंबित कृती पहा`) + suffix;
    }
    if (/Top\s*([0-9]+)\s*Requiring Today's Sign-Off/i.test(core)) {
      const num = core.match(/([0-9]+)/)[1];
      return prefix + (l === 'hi' ? `शीर्ष ${num} कार्य तत्काल हस्ताक्षर हेतु` : `प्रमुख ${num} कृती तात्काळ स्वाक्षरीसाठी`) + suffix;
    }
    if (/([0-9]+)\s*Action Items/i.test(core)) {
      const num = core.match(/([0-9]+)/)[1];
      return prefix + (l === 'hi' ? `${num} लंबित कार्य` : `${num} प्रलंबित कृती`) + suffix;
    }
    if (core === '(+38% spike)') return l === 'hi' ? '(+38% उछाल)' : '(+३८% वाढ)';
    if (core === '(-46%)') return '(-46%)';
    if (core === '(Stable)') return l === 'hi' ? '(स्थिर)' : '(स्थिर)';
    if (core.startsWith('(Gate ₹')) {
      const pr = core.replace(/[^0-9.]/g, '');
      return l === 'hi' ? `(खेत ₹${pr})` : `(शेतबांधावर ₹${pr})`;
    }

    // Substring replacements for composite phrases
    let translated = englishText.trim();
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
    for (const [k, v] of Object.entries(BUYER_MAP)) {
      if (translated.includes(k) && v[l]) {
        translated = translated.split(k).join(v[l]);
      }
    }
    for (const [k, v] of Object.entries(PERSON_MAP)) {
      if (translated.includes(k) && v[l]) {
        translated = translated.split(k).join(v[l]);
      }
    }
    for (const [k, v] of Object.entries(WAREHOUSE_MAP)) {
      if (translated.includes(k) && v[l]) {
        translated = translated.split(k).join(v[l]);
      }
    }

    return translated;
  }

  function tCrop(cropName, targetLang) {
    const l = targetLang || getAdminLanguage();
    if (!cropName) return cropName;
    if (l === 'en') {
      const lower = cropName.toLowerCase().trim();
      return REVERSE_CROPS[lower] || translateToEnglish(cropName);
    }
    let enName = cropName;
    if (/[\u0900-\u097F]/.test(cropName)) {
      enName = REVERSE_CROPS[cropName.toLowerCase().trim()] || translateToEnglish(cropName);
    }
    if (CROP_MAP[enName] && CROP_MAP[enName][l]) return CROP_MAP[enName][l];
    return tText(enName, l);
  }

  function tPerson(name, targetLang) {
    const l = targetLang || getAdminLanguage();
    if (!name) return name;
    if (l === 'en') {
      const lower = name.toLowerCase().trim();
      return REVERSE_PERSONS[lower] || translateToEnglish(name);
    }
    let enName = name;
    if (/[\u0900-\u097F]/.test(name)) {
      enName = REVERSE_PERSONS[name.toLowerCase().trim()] || translateToEnglish(name);
    }
    if (PERSON_MAP[enName] && PERSON_MAP[enName][l]) return PERSON_MAP[enName][l];
    return tText(enName, l);
  }

  function tBuyer(buyer, targetLang) {
    const l = targetLang || getAdminLanguage();
    if (!buyer) return buyer;
    if (l === 'en') {
      const lower = buyer.toLowerCase().trim();
      return REVERSE_BUYERS[lower] || translateToEnglish(buyer);
    }
    let enName = buyer;
    if (/[\u0900-\u097F]/.test(buyer)) {
      enName = REVERSE_BUYERS[buyer.toLowerCase().trim()] || translateToEnglish(buyer);
    }
    if (BUYER_MAP[enName] && BUYER_MAP[enName][l]) return BUYER_MAP[enName][l];
    return tText(enName, l);
  }

  function tLocation(loc, targetLang) {
    const l = targetLang || getAdminLanguage();
    if (!loc) return loc;
    if (l === 'en') {
      const lower = loc.toLowerCase().trim();
      return REVERSE_MANDIS[lower] || translateToEnglish(loc);
    }
    let enLoc = loc;
    if (/[\u0900-\u097F]/.test(loc)) {
      enLoc = REVERSE_MANDIS[loc.toLowerCase().trim()] || translateToEnglish(loc);
    }
    if (MANDI_MAP[enLoc] && MANDI_MAP[enLoc][l]) return MANDI_MAP[enLoc][l];
    return tText(enLoc, l);
  }

  function t(key, defaultVal) {
    return tText(defaultVal || key);
  }

  // 8. DIRECT SHELL TRANSLATION ENGINE (Guarantees 100% Sidebar, Header, & Banner instant updates)
  function applyShellTranslations(lang) {
    if (typeof document === 'undefined') return;
    const l = lang || getAdminLanguage();

    // 1. Sidebar Brand & Title
    const brandAccent = document.querySelector('.brand-title .brand-accent');
    if (brandAccent) brandAccent.textContent = l === 'en' ? 'ADMIN' : 'प्रशासक';

    const brandTagline = document.querySelector('.brand-tagline');
    if (brandTagline) brandTagline.textContent = tText('Marketplace Control Center', l);

    // Sidebar Headings
    document.querySelectorAll('.sidebar-menu-heading').forEach(el => {
      const txt = el.textContent.trim();
      if (txt.includes('Control Center') || txt.includes('नियंत्रण केंद्र')) {
        el.textContent = tText('Control Center', l);
      } else if (txt.includes('Governance Desks') || txt.includes('प्रशासन डेस्क')) {
        el.textContent = tText('Governance Desks', l);
      }
    });

    const connectedPortalsHeading = document.querySelector('.connected-portals-box div:first-child');
    if (connectedPortalsHeading) connectedPortalsHeading.textContent = tText('Connected Portals:', l);

    // 2. Sidebar Navigation Items
    const navItemMap = [
      { sec: 'dashboard', en: 'Dashboard' },
      { sec: 'users', en: 'Users' },
      { sec: 'market-data', en: 'Market Data' },
      { sec: 'deals-payments', en: 'Deals & Payments' },
      { sec: 'logistics-storage', en: 'Logistics & Storage' },
      { sec: 'emergency-sell', en: 'Emergency Sell' },
      { sec: 'grievances', en: 'Grievances' },
      { sec: 'reports', en: 'Reports' }
    ];

    navItemMap.forEach(({ sec, en }) => {
      const item = document.querySelector(`.sidebar-nav .nav-item[data-section="${sec}"] a span:last-child`);
      if (item) {
        item.textContent = tText(en, l);
        if (item.parentElement) item.parentElement.setAttribute('data-agx-orig', en);
      }
    });

    // Governance Desks Links
    const deskEscrow = document.querySelector('.sidebar-nav .nav-item[data-tooltip*="Escrow"] a span:last-child');
    if (deskEscrow) {
      deskEscrow.textContent = tText('Escrow Clearances', l);
      if (deskEscrow.parentElement) deskEscrow.parentElement.setAttribute('data-agx-orig', 'Escrow Clearances');
    }

    const deskMandi = document.querySelector('.sidebar-nav .nav-item[data-tooltip*="Mandi"] a span:last-child');
    if (deskMandi) {
      deskMandi.textContent = tText('Mandi MSP Desk', l);
      if (deskMandi.parentElement) deskMandi.parentElement.setAttribute('data-agx-orig', 'Mandi MSP Desk');
    }

    const deskTribunal = document.querySelector('.sidebar-nav .nav-item[data-tooltip*="Tribunal"] a span:last-child');
    if (deskTribunal) {
      deskTribunal.textContent = tText('Tribunal Bench', l);
      if (deskTribunal.parentElement) deskTribunal.parentElement.setAttribute('data-agx-orig', 'Tribunal Bench');
    }

    // Connected Portals Links
    const portalLinks = document.querySelectorAll('.connected-portals-box a');
    portalLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      if (href.includes('farmer-module')) {
        link.innerHTML = `<span>🌾</span> ${tText('Farmer Portal', l)}`;
      } else if (href.includes('buyer-module')) {
        link.innerHTML = `<span>🏢</span> ${tText('Buyer Terminal', l)}`;
      } else if (href.includes('logistics-module')) {
        link.innerHTML = `<span>🚚</span> ${tText('Logistics Hub', l)}`;
      }
    });

    // 3. Top Navbar
    const searchInput = document.getElementById('global-search-input');
    if (searchInput) {
      searchInput.setAttribute('placeholder', tText('Search Users, Deals, Mandi commodities, Shipments... (Press ⌘K or Ctrl+K)', l));
      searchInput.setAttribute('data-agx-orig-ph', 'Search Users, Deals, Mandi commodities, Shipments... (Press ⌘K or Ctrl+K)');
    }

    const badgeControlCenter = document.querySelector('.navbar-left div:last-child span');
    if (badgeControlCenter) {
      badgeControlCenter.textContent = tText('🛡️ AgriNex Marketplace Control Center', l);
    }

    const btnSignOut = document.querySelector('.navbar-right a[href*="admin_login.html"]');
    if (btnSignOut) {
      btnSignOut.innerHTML = `<span>🚪</span> ${tText('Sign Out', l)}`;
    }

    const btnSwitchPortal = document.querySelector('.navbar-right a[href*="login_details/index.html"]');
    if (btnSwitchPortal) {
      btnSwitchPortal.textContent = `🔀 ${tText('Switch Portal', l)}`;
    }

    // 4. Executive Banner
    const execName = document.querySelector('.executive-name');
    if (execName) execName.textContent = tText('Dr. R. K. Shinde, IAS', l);

    const execRole = document.querySelector('.executive-role-pill');
    if (execRole) execRole.textContent = tText('Central APMC Control Desk', l);

    const execSub = document.querySelector('.executive-subtext span:nth-child(2)');
    if (execSub) execSub.textContent = tText('305 Mandis Live Across Maharashtra', l);

    const execNodal = document.querySelector('.status-sub-highlight');
    if (execNodal) execNodal.textContent = tText('Nodal Governance Active', l);

    const pillPending = document.getElementById('pill-pending-count');
    if (pillPending) {
      const numMatch = pillPending.textContent.match(/\d+/);
      const count = numMatch ? numMatch[0] : '14';
      pillPending.textContent = tText(`${count} Action Items`, l);
    }

    const btnAdvisory = document.querySelector('.btn-pill-advisory span:last-child');
    if (btnAdvisory) btnAdvisory.textContent = tText('Advisory', l);

    const btnAudit = document.querySelector('.btn-pill-audit span:last-child');
    if (btnAudit) btnAudit.textContent = tText('Audit Export', l);

    // 5. KPI Cards
    const counterpartiesCard = document.querySelector('.kpi-card-counterparties');
    if (counterpartiesCard) {
      const chip = counterpartiesCard.querySelector('.kpi-tag-chip');
      if (chip) chip.textContent = tText('+142 this week', l);
      const label = counterpartiesCard.querySelector('.kpi-label');
      if (label) label.textContent = tText('Producers & Buyers', l);
      const caption = counterpartiesCard.querySelector('.kpi-caption');
      if (caption) caption.textContent = tText('14,280 Producers · 850 Enterprise Buyers', l);
      const note = counterpartiesCard.querySelector('.kpi-footer-note');
      if (note) note.textContent = tText('✓ Satbara 7/12 & GSTIN Verified', l);
      const link = counterpartiesCard.querySelector('.kpi-footer-link');
      if (link) link.textContent = tText('Directory →', l);
    }

    const escrowCard = document.querySelector('.kpi-card-escrow');
    if (escrowCard) {
      const chip = escrowCard.querySelector('.kpi-tag-chip');
      if (chip) chip.textContent = tText('Dual-Key Protected', l);
      const label = escrowCard.querySelector('.kpi-label');
      if (label) label.textContent = tText('Escrow Locked', l);
      const caption = escrowCard.querySelector('.kpi-caption');
      if (caption) caption.textContent = tText('1,420 Active Trade Contracts', l);
      const note = escrowCard.querySelector('.kpi-footer-note');
      if (note) note.textContent = tText('RTGS / NSDL Escrow Vault', l);
      const link = escrowCard.querySelector('.kpi-footer-link');
      if (link) link.textContent = tText('Ledger →', l);
    }

    const fleetsCard = document.querySelector('.kpi-card-fleets');
    if (fleetsCard) {
      const chip = fleetsCard.querySelector('.kpi-tag-chip');
      if (chip) chip.textContent = tText('98.4% On Schedule', l);
      const label = fleetsCard.querySelector('.kpi-label');
      if (label) label.textContent = tText('Active Fleets', l);
      const caption = fleetsCard.querySelector('.kpi-caption');
      if (caption) caption.textContent = tText('Orders in Transport across MH', l);
      const note = fleetsCard.querySelector('.kpi-footer-note');
      if (note) note.textContent = tText('Live IoT Reefer Telemetry', l);
      const link = fleetsCard.querySelector('.kpi-footer-link');
      if (link) link.textContent = tText('Track →', l);
    }

    const actionsCard = document.querySelector('.kpi-card-actions');
    if (actionsCard) {
      const chip = actionsCard.querySelector('.kpi-tag-chip');
      if (chip) chip.textContent = tText('Action Required', l);
      const label = actionsCard.querySelector('.kpi-label');
      if (label) label.textContent = tText('Action Items', l);
      const caption = actionsCard.querySelector('.kpi-caption');
      if (caption) caption.textContent = tText('Pending Dual-Key & Tribunal Triage', l);
      const note = actionsCard.querySelector('.kpi-footer-note');
      if (note) note.textContent = tText('5 Escrow · 3 Disputes · 6 KYC', l);
      const link = actionsCard.querySelector('.kpi-footer-link');
      if (link) link.textContent = tText('Triage →', l);
    }

    // 6. Cockpit Panels
    const queueTitle = document.querySelector('.cockpit-panel-queue .panel-title');
    if (queueTitle) queueTitle.textContent = tText('Priority Action Queue', l);

    const queueSubtitle = document.querySelector('.cockpit-panel-queue .panel-subtitle');
    if (queueSubtitle) queueSubtitle.textContent = tText('Immediate dual-key payouts, tribunal bench orders, and buyer KYC verifications', l);

    const queueBadge = document.getElementById('queue-badge-count');
    if (queueBadge) {
      const m = queueBadge.textContent.match(/\d+/);
      const n = m ? m[0] : '3';
      queueBadge.textContent = tText(`Top ${n} Requiring Today's Sign-Off`, l);
    }

    const btnTriageAll = document.querySelector('.cockpit-panel-queue .btn-panel-action span:first-child');
    if (btnTriageAll) btnTriageAll.textContent = tText('Triage All', l);

    const footerActionsLabel = document.getElementById('footer-actions-label');
    if (footerActionsLabel) {
      const m = footerActionsLabel.textContent.match(/\d+/);
      const n = m ? m[0] : '14';
      footerActionsLabel.textContent = tText(`View All ${n} Action Items in Full Triage Desk`, l);
    }

    const pulseTitle = document.querySelector('.cockpit-panel-pulse .panel-title');
    if (pulseTitle) pulseTitle.textContent = tText('Live Operational Pulse', l);

    const pulseSubtitle = document.querySelector('.cockpit-panel-pulse .panel-subtitle');
    if (pulseSubtitle) pulseSubtitle.textContent = tText('Unified telemetry across APMC mandis, reefer transit & cold chain', l);

    // Pulse Tabs
    const tabMandi = document.getElementById('pulse-tab-mandi');
    if (tabMandi) tabMandi.innerHTML = `<span>🗺️ ${tText('Mandi APMC Watch', l)}</span>`;

    const tabFleets = document.getElementById('pulse-tab-fleets');
    if (tabFleets) tabFleets.innerHTML = `<span>🚚 ${tText('Reefer Fleets', l)}</span>`;

    const tabStorage = document.getElementById('pulse-tab-storage');
    if (tabStorage) tabStorage.innerHTML = `<span>🏭 ${tText('Cold Storage', l)}</span>`;

    const btnGis = document.querySelector('.btn-gis-modal-trigger span:first-child');
    if (btnGis) btnGis.textContent = `🗺️ ${tText('Open Full State GIS Command Map', l)} (305 Mandis)`;
  }

  // 9. ROBUST BI-DIRECTIONAL DOM TREE WALKER
  let _isTranslating = false;

  function walkAndTranslateDOM(rootNode, targetLang) {
    if (!rootNode || typeof document === 'undefined' || typeof document.createTreeWalker !== 'function') return;
    const l = targetLang || getAdminLanguage();
    _isTranslating = true;

    try {
      const showText = typeof NodeFilter !== 'undefined' ? NodeFilter.SHOW_TEXT : 4;
      const fReject = typeof NodeFilter !== 'undefined' ? NodeFilter.FILTER_REJECT : 2;
      const fSkip = typeof NodeFilter !== 'undefined' ? NodeFilter.FILTER_SKIP : 3;
      const fAccept = typeof NodeFilter !== 'undefined' ? NodeFilter.FILTER_ACCEPT : 1;

      const walker = document.createTreeWalker(
        rootNode,
        showText,
        {
          acceptNode: function (node) {
            const parent = node.parentElement;
            if (!parent) return fReject;
            const tag = parent.tagName.toLowerCase();
            if (['script', 'style', 'noscript', 'code', 'pre', 'svg'].includes(tag)) {
              return fReject;
            }
            if (parent.classList && parent.classList.contains('no-translate')) {
              return fReject;
            }
            if (parent.closest && (parent.closest('#admin-language-dropdown-menu') || parent.closest('#btn-admin-language-selector'))) {
              return fReject;
            }
            const val = node.nodeValue.trim();
            if (!val || /^[0-9.,₹$%+\-\/:#\s]+$/.test(val)) {
              return fSkip;
            }
            return fAccept;
          }
        }
      );

      const nodesToUpdate = [];
      let current;
      while ((current = walker.nextNode())) {
        nodesToUpdate.push(current);
      }

      nodesToUpdate.forEach(textNode => {
        const parent = textNode.parentElement;
        if (!parent) return;

        const currentVal = textNode.nodeValue;
        let origEnglish = parent.getAttribute('data-agx-orig');

        if (!origEnglish) {
          if (!/[\u0900-\u097F]/.test(currentVal)) {
            origEnglish = currentVal;
          } else {
            origEnglish = translateToEnglish(currentVal);
          }
          if (origEnglish) {
            parent.setAttribute('data-agx-orig', origEnglish);
          }
        }

        if (l === 'en') {
          textNode.nodeValue = origEnglish || translateToEnglish(currentVal);
        } else {
          textNode.nodeValue = tText(origEnglish || currentVal, l);
        }
      });

      // Translate Placeholders, Titles, Alts
      const elementsWithAttrs = rootNode.querySelectorAll ? rootNode.querySelectorAll('[placeholder], [title], [alt]') : [];
      elementsWithAttrs.forEach(el => {
        // Placeholders
        if (el.hasAttribute('placeholder')) {
          let origPh = el.getAttribute('data-agx-orig-ph');
          if (!origPh) {
            const curPh = el.getAttribute('placeholder') || '';
            origPh = !/[\u0900-\u097F]/.test(curPh) ? curPh : translateToEnglish(curPh);
            if (origPh) el.setAttribute('data-agx-orig-ph', origPh);
          }
          el.setAttribute('placeholder', l === 'en' ? origPh : tText(origPh, l));
        }
        // Titles / Tooltips
        if (el.hasAttribute('title')) {
          let origT = el.getAttribute('data-agx-orig-title');
          if (!origT) {
            const curT = el.getAttribute('title') || '';
            origT = !/[\u0900-\u097F]/.test(curT) ? curT : translateToEnglish(curT);
            if (origT) el.setAttribute('data-agx-orig-title', origT);
          }
          el.setAttribute('title', l === 'en' ? origT : tText(origT, l));
        }
      });
    } finally {
      _isTranslating = false;
    }
  }

  // 10. AUTOMATIC MUTATION OBSERVER
  function setupMutationObserver() {
    if (typeof MutationObserver === 'undefined' || typeof document === 'undefined' || !document.body) return;

    let debounceTimer = null;
    const observer = new MutationObserver(mutations => {
      if (_isTranslating) return;
      const currentLang = getAdminLanguage();

      let hasNewNodes = false;
      for (const m of mutations) {
        if (m.addedNodes && m.addedNodes.length > 0) {
          hasNewNodes = true;
          break;
        }
      }

      if (hasNewNodes) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          if (!_isTranslating) {
            walkAndTranslateDOM(document.body, currentLang);
          }
        }, 30);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // 11. LANGUAGE SWITCH CONTROLLER
  function setAdminLanguage(lang) {
    if (!['en', 'hi', 'mr'].includes(lang)) lang = 'en';

    try {
      localStorage.setItem(STORAGE_KEY, lang);
      localStorage.setItem('agrinex_admin_language', lang);
      localStorage.setItem('agrinex_buyer_language', lang);
      localStorage.setItem('agrinex_farmer_language', lang);
      localStorage.setItem('agrinex_logistics_language', lang);
      localStorage.setItem('agrinex_language', lang);
    } catch (e) {}

    // 1. Update Language UI Selector Dropdown
    updateLanguageSelectorUI(lang);

    // 2. Direct Shell Elements Update (Guaranteed Sidebar & Header refresh)
    applyShellTranslations(lang);

    // 3. Re-render active dynamic views FIRST so DOM has fresh full elements
    if (typeof window.renderActiveSectionData === 'function') {
      const activeSec = document.querySelector('.gov-section.active');
      if (activeSec && activeSec.id) {
        const secId = activeSec.id.replace('section-', '');
        window.renderActiveSectionData(secId);
      }
    }

    // 4. Walk and translate entire document body
    if (typeof document !== 'undefined' && document.body) {
      walkAndTranslateDOM(document.body, lang);
    }

    // 5. Broadcast change event
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('agrinex:languageChanged', { detail: { language: lang } }));
      window.dispatchEvent(new CustomEvent('agrinex_language_changed', { detail: { lang: lang } }));
      if (window.AgriNexBus) {
        window.AgriNexBus.emit('language:changed', { language: lang, timestamp: Date.now() });
      }
    }

    // 6. Show feedback toast if available
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

  // 12. INITIALIZATION
  function initAdminI18n() {
    const saved = getAdminLanguage();
    updateLanguageSelectorUI(saved);
    applyShellTranslations(saved);
    if (document.body) {
      walkAndTranslateDOM(document.body, saved);
    }
    setupMutationObserver();
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
      applyShellTranslations,
      walkAndTranslateDOM,
      translateToEnglish
    };

    window.setAdminLanguage = setAdminLanguage;
    window.getAdminLanguage = getAdminLanguage;
    window.toggleAdminLanguageMenu = toggleAdminLanguageMenu;
    window.tAdmin = tText;

    // Cross-module & tab storage sync
    window.addEventListener('storage', function (e) {
      if (e.key === STORAGE_KEY || e.key === 'agrinex_language' || e.key === 'agrinex_admin_language') {
        const newLang = e.newValue;
        if (newLang && ['en', 'hi', 'mr'].includes(newLang) && newLang !== getAdminLanguage()) {
          setAdminLanguage(newLang);
        }
      }
    });
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      t,
      tText,
      tCrop,
      tPerson,
      tBuyer,
      tLocation,
      setAdminLanguage,
      getAdminLanguage,
      applyShellTranslations,
      walkAndTranslateDOM,
      translateToEnglish
    };
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initAdminI18n);
    } else {
      initAdminI18n();
    }
  }
})();
