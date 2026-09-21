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

  
  // 2. INSTITUTIONAL BUYERS & CORPORATE SOURCING
  const BUYER_MAP = {
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
    'Virdhara International Spices & Seeds': { hi: 'वीरधारा इंटरनेशनल मसाले और बीज', mr: 'वीरधारा इंटरनॅशनल मसाले व बियाणे' },
    'Everest Spices Procurement Corp': { hi: 'एवरेस्ट मसाले खरीद निगम', mr: 'एव्हरेस्ट मसाले खरेदी महामंडळ' },
    'Mother Dairy Safal Fresh Processing': { hi: 'मदर डेयरी सफल फ्रेश प्रोसेसिंग', mr: 'मदर डेअरी सफल फ्रेश प्रक्रिया' },
    'Sahyadri Food Processing & Purees': { hi: 'सह्याद्री फूड प्रोसेसिंग और प्यूरी', mr: 'सह्याद्री फूड प्रोसेसिंग व प्युरी' },
    'Annapoorna Commercial Catering Network': { hi: 'अन्नपूर्णा कमर्शियल कैटरिंग नेटवर्क', mr: 'अन्नपूर्णा व्यावसायिक केटरिंग नेटवर्क' },
    'MahaBio Organic Compost & Energy Corp': { hi: 'महाबायो ऑर्गेनिक कंपोस्ट और ऊर्जा निगम', mr: 'महाबायो सेंद्रिय खत व ऊर्जा महामंडळ' },
    'BigBasket': { hi: 'बिगबास्केट', mr: 'बिगबास्केट' },
    'Reliance Fresh': { hi: 'रिलायंस फ्रेश', mr: 'रिलायन्स फ्रेश' },
    'Reliance': { hi: 'रिलायंस', mr: 'रिलायन्स' },
    'Adani Wilmar': { hi: 'अदाणी विल्मर', mr: 'अदानी विल्मर' },
    'DMart Wholesale': { hi: 'डीमार्ट थोक', mr: 'डीमार्ट घाऊक' },
    'DMart': { hi: 'डीमार्ट', mr: 'डीमार्ट' },
    'Mother Dairy': { hi: 'मदर डेयरी', mr: 'मदर डेअरी' },
    'Mother Dairy Safal': { hi: 'मदर डेयरी सफल', mr: 'मदर डेअरी सफल' },
    'Safal': { hi: 'सफल', mr: 'सफल' },
    'LuLu Hypermarket': { hi: 'लुलु हाइपरमार्केट', mr: 'लुलु हायपरमार्केट' },
    'Everest Spices': { hi: 'एवरेस्ट मसाले', mr: 'एव्हरेस्ट मसाले' },
    'ITC Choupal Fresh': { hi: 'आईटीसी चौपाल फ्रेश', mr: 'आयटीसी चौपाल फ्रेश' },
    'ITC Agri-Business': { hi: 'आईटीसी कृषि-व्यवसाय', mr: 'आयटीसी कृषी-व्यवसाय' },
    'ITC': { hi: 'आईटीसी', mr: 'आयटीसी' },
    'Mahagrapes': { hi: 'महाग्रेप्स', mr: 'महाग्रेप्स' },
    'Marico Saffola': { hi: 'मैरिको सफोला', mr: 'मॅरिको सफोला' },
    'Swiggy DC': { hi: 'स्विगी डीसी', mr: 'स्विगी डीसी' },
    'Swiggy': { hi: 'स्विगी', mr: 'स्विगी' },
    'Zomato Hyperpure': { hi: 'ज़ोमैटो हाइपरप्योर', mr: 'झोमॅटो हायपरप्युअर' },
    'Zomato': { hi: 'ज़ोमैटो', mr: 'झोमॅटो' },
    'Blinkit': { hi: 'ब्लिंकइट', mr: 'ब्लिंकइट' },
    'Zepto': { hi: 'ज़ेप्टो', mr: 'झेप्टो' },
    'Kissan & Nestle India Procurements': { hi: 'किसान और नेस्ले इंडिया खरीद', mr: 'किसान आणि नेस्ले इंडिया खरेदी' },
    'Dubai Agro-Gulf Exporters Ltd.': { hi: 'दुबई एग्रो-गल्फ एक्सपोर्टर्स लिमिटेड', mr: 'दुबई अ‍ॅग्रो-गल्फ एक्सपोर्टर्स लि.' },
    'Raymond Textile Mills Consortium': { hi: 'रेमंड टेक्सटाइल मिल्स कंसोर्टियम', mr: 'रेमंड टेक्सटाईल मिल्स कन्सोर्टियम' },
    'Reliance Retail Hub': { hi: 'रिलायंस रिटेल हब', mr: 'रिलायन्स रिटेल हब' },
    'Matching Buyers...': { hi: 'खरीदारों का मिलान हो रहा है...', mr: 'खरेदीदार शोधत आहे...' },
    'Awaiting Bids': { hi: 'बोलियों की प्रतीक्षा है', mr: 'बोलीची प्रतीक्षा आहे' }
  };

  // 3. COMPLETE CROP & COMMODITY & VARIETY FULL PHRASES (Plurals and Singles)
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
    ["Facing payment delays, quality contestations, gate pass issues, or weighbridge discrepancies? Every crop transaction is 100% Escrow protected. Submit your grievance below for instant APMC Mandi Officer intervention.", "क्या आपको भुगतान में देरी, गुणवत्ता विवाद, गेट पास समस्या या वजन में अंतर का सामना करना पड़ रहा है? प्रत्येक सौदा 100% एस्क्रो सुरक्षित है। तुरंत सहायता के लिए शिकायत दर्ज करें।", "पेमेंट मिळण्यास उशीर, दर्जा वाद, गेट पास समस्या किंवा वजन काट्यात तफावत आहे का? प्रत्येक व्यवहार १००% एस्क्रो सुरक्षित आहे. तात्काळ मदतीसाठी आपली तक्रार नोंदवा."],
    ["Once submitted, an SMS acknowledgement is sent to your mobile. The designated APMC Mandi Officer reviews the consignment telemetry, weighbridge slip & escrow contract within 2 hours.", "शिकायत दर्ज होते ही आपके मोबाइल पर एसएमएस पावती भेजी जाती है। नियुक्त एपीएमसी अधिकारी 2 घंटे के भीतर टेलीमेट्री, वे-ब्रिज रसीद और अनुबंध की समीक्षा करते हैं।", "तक्रार दाखल करताच आपल्या मोबाईलवर SMS पोचपावती पाठवली जाते. नियुक्त अधिकारी २ तासांच्या आत वजन पावती व एस्क्रो कराराची तपासणी करतात."],
    ["Once a buyer accepts or matches your price, 35% advance is deposited instantly into escrow before transport dispatch.", "जैसे ही कोई खरीदार आपके मूल्य को स्वीकार या मैच करता है, परिवहन प्रेषण से पहले 35% अग्रिम राशि तुरंत एस्क्रो में जमा कर दी जाती है।", "खरेदीदाराने आपला दर मान्य करताच, वाहतुकीपूर्वी ३५% आगाऊ रक्कम तात्काळ एस्क्रो खात्यात जमा होते."],
    ["Track truck assignments, driver telemetry, weighbridge receipts, and live GPS transit from farm gate to destination.", "खेत से गंतव्य तक ट्रक आवंटन, ड्राइवर संपर्क, वजन रसीदें और लाइव जीपीएस ट्रैकिंग देखें।", "शेत-शिवारापासून गोदामापर्यंत ट्रक वाटप, चालक तपशील, वजन पावती आणि थेट GPS ट्रॅकिंग पहा."],
    ["Accurately calculate your seed, fertilizer, labor, transport costs vs direct corporate sale vs traditional mandi.", "पारंपरिक मंडी बनाम सीधी कॉर्पोरेट बिक्री में बीज, खाद, मजदूरी और परिवहन लागत की तुलना करें।", "पारंपरिक बाजार समिती विरूद्ध थेट खरेदीदार विक्रीत बियाणे, खते, मजुरी व वाहतूक खर्चाची अचूक तुलना करा."],
    ["Aggregate your harvest with nearby farmers to fulfill large corporate contracts at institutional premium prices.", "बड़ी कंपनियों के सीधे अनुबंधों को पूरा करने और प्रीमियम मूल्य पाने के लिए नजदीकी किसानों के साथ अपनी फसल जोड़ें।", "मोठ्या कॉर्पोरेट कंपन्यांना थेट पुरवठा करून जास्तीत जास्त दर मिळवण्यासाठी परिसरातील शेतकऱ्यांसोबत एकत्र या."],
    ["Review, counter, or accept direct procurement offers from verified supermarkets, food processors, and exporters.", "सत्यापित सुपरमार्केट्स, फूड प्रोसेसर्स और निर्यातकों से प्राप्त सीधी खरीद बोलियों की समीक्षा करें या स्वीकारें।", "प्रमाणित सुपरमार्केट्स, फूड प्रोसेसर्स आणि निर्यातकांकडून आलेल्या थेट खरेदी ऑफर्स तपासा व स्वीकारा."],
    ["Market trend is positive. Wholesale arrivals down 14%, prices are expected to rise steadily in the next 7 days.", "बाजार का रुख सकारात्मक है। थोक आवक में 14% की गिरावट आई है, अगले 7 दिनों में कीमतें लगातार बढ़ने की उम्मीद है।", "बाजार कल सकारात्मक आहे. घाऊक आवक १४% ने घटली असून पुढील ७ दिवसांत दर वाढण्याचा अंदाज आहे."],
    ["All buyer payments are pre-funded into institutional bank escrow accounts to guarantee 100% payout protection.", "किसानों के 100% सुरक्षित भुगतान के लिए खरीदार की राशि बैंक एस्क्रो खाते में अग्रिम जमा कराई जाती है।", "शेतकऱ्यांना १००% पेमेंट सुरक्षिततेची हमी देण्यासाठी खरेदीदाराची रक्कम बँकेच्या एस्क्रो खात्यात आधीच जमा असते."],
    ["Real-time APMC arrivals, modal rates, price projections, and crop-wise mandi comparisons across Maharashtra.", "महाराष्ट्र भर की मंडियों के वास्तविक आवक, मॉडल भाव, मूल्य पूर्वानुमान और तुलनात्मक विश्लेषण।", "महाराष्ट्रभरातील थेट बाजार समिती आवक, सरासरी दर, भावी किमतींचा अंदाज आणि तुलनात्मक विश्लेषण."],
    ["on any lot to broadcast to verified food processing plants & institutional caterers for instant payout.", "किसी भी लॉट पर तत्काल भुगतान के लिए खाद्य प्रसंस्करण व कैटरर्स को ब्रॉडकास्ट करें।", "कोणत्याही लॉटवर तात्काळ पेमेंटसाठी फूड प्रोसेसिंग व कॅटरर्सना पाठवा."],
    ["will be locked in bank and transferred to your account as soon as the truck arrives at your farm.", "बैंक में लॉक किया जाएगा और आपके खेत पर ट्रक पहुंचते ही आपके खाते में ट्रांसफर कर दिया जाएगा।", "बँकेत सुरक्षित लॉक केले जाईल आणि शेतात ट्रक पोहोचताच आपल्या खात्यात जमा केले जाईल."],
    ["Automatically released to your bank within 2 hours of delivery acceptance at buyer warehouse.", "खरीदार के गोदाम पर डिलीवरी स्वीकृत होने के 2 घंटे के भीतर स्वचालित रूप से आपके बैंक में जारी किया गया।", "खरेदीदाराच्या गोदामात माल पोहोचून तपासणी पूर्ण होताच २ तासांच्या आत आपोआप बँक खात्यात वर्ग केले जाते."],
    ["100% Escrow settled batches dispatched from Lasalgaon FPO Hub directly to industrial buyers", "लासलगांव एफपीओ हब से सीधे औद्योगिक खरीदारों को भेजे गए 100% एस्क्रो भुगतान प्राप्त बैच", "लासलगाव FPO हबमधून थेट औद्योगिक खरेदीदारांना पाठवलेले १००% एस्क्रो रक्कम जमा झालेले बॅचेस"],
    ["Paid directly to your bank via IMPS as soon as the truck arrives and loads your crop.", "ट्रक के खेत पर पहुंचने और फसल लोड होते ही आईएमपीएस (IMPS) के जरिए सीधे आपके बैंक खाते में भेजा गया।", "ट्रक शेतात पोहोचून माल भरताच IMPS द्वारे थेट आपल्या बँक खात्यात जमा केले जाते."],
    ["Your crop commitments currently pooled with fellow members for institutional delivery", "संस्थात्मक डिलीवरी के लिए साथी सदस्यों के साथ एकत्रित की गई आपकी फसल प्रतिबद्धताएं", "मोठ्या संस्थात्मक पुरवठ्यासाठी सहकारी शेतकऱ्यांसोबत एकत्र केलेली आपली पीक नोंदणी"],
    ["Safe bank-guaranteed payments: 35% advance at pickup and 65% balance on delivery", "सुरक्षित बैंक-गारंटीकृत भुगतान: उठान पर 35% अग्रिम और डिलीवरी पर 65% शेष", "सुरक्षित बँक हमी पेमेंट: शेतातून माल भरताना ३५% व पोहोचल्यावर ६५% शिल्लक"],
    ["Direct contact information for Nashik Agro Farmer Producer Company leadership", "नासिक एग्रो शेतकरी उत्पादक कंपनी नेतृत्व के लिए सीधा संपर्क विवरण", "नाशिक अ‍ॅग्रो शेतकरी उत्पादक कंपनी संचालक मंडळाचा थेट संपर्क"],
    ["AgriNex - FPO Collective Bulk Order Hub | Nashik Agro Farmer Producer Co.", "AgriNex - एफपीओ सामूहिक थोक मांग केंद्र | नासिक एग्रो शेतकरी उत्पादक कंपनी", "AgriNex - FPO थेट संस्थात्मक खरेदी केंद्र | नाशिक अ‍ॅग्रो शेतकरी उत्पादक कंपनी"],
    ["Prices projected to gain +13.7% over 7 days due to tightening arrivals.", "आवक कम होने के कारण 7 दिनों में कीमतों में +13.7% की बढ़ोतरी का अनुमान है।", "आवक घटल्यामुळे पुढील ७ दिवसांत दरात +१३.७% वाढ होण्याचा अंदाज आहे."],
    ["Verified Smallholder Farmer • Lasalgaon APMC Yard, Nashik, Maharashtra", "सत्यापित लघु किसान • लासलगांव एपीएमसी यार्ड, नासिक, महाराष्ट्र", "प्रमाणित अल्पभूधारक शेतकरी • लासलगाव बाजार समिती यार्ड, नाशिक, महाराष्ट्र"],
    ["Got perishable produce nearing shelf life (Tomatoes, Chillies)? Click", "क्या आपके पास जल्दी खराब होने वाली फसलें (टमाटर, मिर्च) हैं? क्लिक करें", "तुमच्याकडे नाशवंत शेतमाल (टोमॅटो, मिरची) शिल्लक आहे का? क्लिक करा"],
    ["Traditional Mandi Deductions (Commission 6% + Freight + Loading):", "पारंपरिक मंडी कटौती (कमीशन 6% + भाड़ा + तुलाई):", "पारंपरिक बाजार समिती कपात (आडत ६% + हमाली + तोलाई):"],
    ["dispatched from Lasalgaon FPO Hub directly to industrial buyers", "लासलगांव एफपीओ हब से सीधे औद्योगिक खरीदारों को भेजे गए", "लासलगाव FPO हबमधून थेट औद्योगिक खरेदीदारांना पाठवलेले"],
    ["Verified Member of Nashik Agro Farmer Producer Co. • Nashik, MH", "नासिक एग्रो शेतकरी उत्पादक कंपनी के सत्यापित सदस्य • नासिक, महाराष्ट्र", "नाशिक अ‍ॅग्रो शेतकरी उत्पादक कंपनीचे प्रमाणित सभासद • नाशिक, महाराष्ट्र"],
    ["NABARD Reg: FPO/MH/2023/8821 • Nashik Central Hub, Maharashtra", "नाबार्ड पंजी: FPO/MH/2023/8821 • नासिक मुख्य केंद्र, महाराष्ट्र", "नाबार्ड नोंदणी: FPO/MH/2023/8821 • नाशिक मध्यवर्ती केंद्र, महाराष्ट्र"],
    ["Verified feeds from Agmarknet API (data.gov.in) & e-NAM Mandis", "एगमार्कनेट एपीआई (data.gov.in) और ई-नाम मंडियों से सत्यापित डेटा", "अ‍ॅगमार्कनेट API (data.gov.in) व e-NAM बाजार समित्यांकडून प्रमाणित माहिती"],
    ["See how much more money you take home compared to local Mandi", "देखें कि स्थानीय मंडी की तुलना में आप कितना अधिक लाभ घर ले जाते हैं", "स्थानिक बाजार समितीपेक्षा आपणास किती जास्त नफा मिळतो ते पहा"],
    ["Guaranteed ~75% floor recovery via Food Processors & Caterers", "फूड प्रोसेसर्स और कैटरर्स के जरिए ~75% न्यूनतम मूल्य की गारंटी", "फूड प्रोसेसर्स व कॅटरर्समार्फत ~७५% किमान रक्कम मिळण्याची हमी"],
    ["AgriNex - Farmer Dashboard | Direct Trade · Better Tomorrow", "AgriNex - किसान डैशबोर्ड | सीधा व्यापार · बेहतर कल", "AgriNex - शेतकरी डॅशबोर्ड | थेट व्यापार · उज्ज्वल भविष्य"],
    ["AgriNex - My Crops & Lots | Direct Trade · Better Tomorrow", "AgriNex - मेरी फसलें और लॉट | सीधा व्यापार · बेहतर कल", "AgriNex - माझी पिके आणि लॉट्स | थेट व्यापार · उज्ज्वल भविष्य"],
    ["AgriNex - Market Insights | Direct Trade · Better Tomorrow", "AgriNex - मंडी अंतर्दृष्टि | सीधा व्यापार · बेहतर कल", "AgriNex - बाजार भाव अंतर्दृष्टी | थेट व्यापार · उज्ज्वल भविष्य"],
    ["AgriNex - Agricultural Profit & Net Realization Calculator", "AgriNex - कृषि शुद्ध लाभ और लागत प्राप्ति कैलकुलेटर", "AgriNex - शेतमाल निव्वळ नफा व उत्पन्न गणक"],
    ["Direct price offers from verified buyers for your produce", "आपकी फसल के लिए सत्यापित खरीदारों से सीधे मूल्य प्रस्ताव", "आपल्या शेतमालासाठी प्रमाणित खरेदीदारांकडून थेट दर ऑफर"],
    ["Track your crop pickup and truck delivery in real time", "अपनी फसल उठान और ट्रक डिलीवरी को रियल-टाइम में ट्रैक करें", "आपला शेतमाल उचल व वाहतूक थेट ट्रॅक करा"],
    ["Across Maharashtra APMC terminals over next 3–5 days", "अगले 3–5 दिनों में महाराष्ट्र भर की मंडियों में", "पुढील ३–५ दिवसांत महाराष्ट्रभरातील बाजार समित्यांमध्ये"],
    ["⚠️ Mandi Yard Commission / Intermediary Cut Issue", "⚠️ मंडी यार्ड कमीशन / बिचौलिया कटौती समस्या", "⚠️ बेकायदेशीर आडत / मध्यस्थ कमिशन कपात"],
    ["Incoming Corporate Bids & Institutional Contracts", "प्राप्त कॉर्पोरेट बोलियां और संस्थात्मक अनुबंध", "प्राप्त खरेदीदार बोली आणि संस्थात्मक करार"],
    ["Agricultural Net Profit & Cost Realization Engine", "कृषि शुद्ध लाभ और लागत प्राप्ति इंजन", "शेतमाल निव्वळ नफा आणि खर्च गणक यंत्र"],
    ["Grievance Redressal Desk - AgriNex Farmer Portal", "शिकायत निवारण डेस्क - AgriNex किसान पोर्टल", "तक्रार निवारण कक्ष - AgriNex शेतकरी पोर्टल"],
    ["with simple 7-day forward Expected price trends.", "सरल 7-दिवसीय भावी अपेक्षित मूल्य रुझानों के साथ।", "सोप्या ७ दिवसांच्या भावी अपेक्षित दर कलानुसार."],
    ["Successfully Fulfilled FPO Enterprise Contracts", "सफलतापूर्वक पूर्ण किए गए एफपीओ कॉर्पोरेट अनुबंध", "यशस्वीरीत्या पूर्ण केलेले FPO संस्थात्मक करार"],
    ["Input Costs (Seeds, Fertilizers, Irrigation):", "लागत खर्च (बीज, खाद, सिंचाई):", "लागवड खर्च (बियाणे, खते, पाणी):"],
    ["7-Day Forward Price Projections (In ₹ per kg)", "7-दिवसीय भावी मूल्य अनुमान (₹ प्रति किलो में)", "७ दिवसांचे भावी दर अंदाज (₹ प्रति किलो)"],
    ["Farmer Grievance & Dispute Redressal Portal", "किसान शिकायत और विवाद निवारण पोर्टल", "शेतकरी तक्रार व वाद निवारण कक्ष"],
    ["FPO Board of Directors & Field Coordinators", "एफपीओ निदेशक मंडल और क्षेत्र समन्वयक", "FPO संचालक मंडळ व क्षेत्रीय समन्वयक"],
    ["AgriNex - Escrow Vault & Payment Guarantee", "AgriNex - एस्क्रो वॉल्ट और भुगतान गारंटी", "AgriNex - एस्क्रो व्हॉल्ट आणि हमी रक्कम"],
    ["Registered Grievances & Redressal Timeline", "दर्ज शिकायतें और निवारण समय-सीमा", "नोंदवलेल्या तक्रारी आणि निवारण कालमर्यादा"],
    ["Search lots by crop, variety, or lot ID...", "फसल, किस्म या लॉट आईडी से खोजें...", "पीक, वाण किंवा लॉट आयडी शोधा..."],
    ["Historical APMC Price Trend vs AI Forecast", "ऐतिहासिक मंडी भाव बनाम एआई पूर्वानुमान", "ऐतिहासिक बाजार भाव विरूद्ध AI अंदाज"],
    ["Best Mandis to Sell (After Transport Cost)", "बेचने के लिए सर्वोत्तम मंडियां (परिवहन लागत घटाकर)", "विक्रीसाठी सर्वोत्तम बाजार समित्या (वाहतूक खर्च वजा जाता)"],
    ["Maharashtra APMC Mandi Price Intelligence", "महाराष्ट्र एपीएमसी मंडी भाव बुद्धिमत्ता", "महाराष्ट्र कृषी उत्पन्न बाजार समिती भाव विश्लेषण"],
    ["Live APMC Mandi Rates & Arbitrage Signals", "लाइव एपीएमसी मंडी भाव और मध्यस्थ लाभ संकेत", "थेट बाजार भाव आणि थेट नफा संकेत"],
    ["AgriNex - Dispute & Grievance Resolution", "AgriNex - विवाद और शिकायत निवारण", "AgriNex - शेतकरी तक्रार निवारण कक्ष"],
    ["🚛 Mandi Logistics / Truck Pickup Delay", "🚛 मंडी लॉजिस्टिक्स / ट्रक उठान में देरी", "🚛 शेतातून ट्रक माल उचलण्यास उशीर"],
    ["⚖️ Weighbridge / Net Weight Discrepancy", "⚖️ वे-ब्रिज / शुद्ध वजन में अंतर", "⚖️ वजन काटा / निव्वळ वजनात तफावत"],
    ["🛡️ Government Mandi & Escrow Ombudsman", "🛡️ सरकारी मंडी और एस्क्रो लोकपाल", "🛡️ शासकीय बाजार समिती व एस्क्रो लोकपाल"],
    ["Nashik Agro Farmer Producer Co. (NAFPO)", "नासिक एग्रो शेतकरी उत्पादक कंपनी (NAFPO)", "नाशिक अ‍ॅग्रो शेतकरी उत्पादक कंपनी (NAFPO)"],
    ["Board of Directors & Field Coordinators", "निदेशक मंडल और क्षेत्र समन्वयक", "संचालक मंडळ व क्षेत्रीय समन्वयक"],
    ["Official APMC Mandi Data (data.gov.in)", "आधिकारिक एपीएमसी मंडी डेटा (data.gov.in)", "अधिकृत कृषी उत्पन्न बाजार समिती माहिती (data.gov.in)"],
    ["Speed: 54 km/h • ETA: Tomorrow 8:00 AM", "गति: 54 किमी/घंटा • अपेक्षित समय: कल सुबह 8:00 बजे", "वेग: ५४ किमी/तास • अपेक्षित वेळ: उद्या सकाळी ८:०० वाजता"],
    ["My Harvest Lots Committed to FPO Pools", "एफपीओ पूल में शामिल मेरे फसल लॉट", "FPO पूलमधे जमा केलेले माझे पीक लॉट्स"],
    ["💰 Payment / 35% Advance Escrow Delay", "💰 भुगतान / 35% अग्रिम एस्क्रो में देरी", "💰 पेमेंट / ३५% आगाऊ एस्क्रो मिळण्यास उशीर"],
    ["Active Shipments & Dispatch Telemetry", "सक्रिय शिपमेंट और प्रेषण टेलीमेट्री", "सक्रिय ऑर्डर्स आणि थेट वाहतूक ट्रॅकिंग"],
    ["Direct Trade &middot; Better Tomorrow", "सीधा व्यापार · बेहतर कल", "थेट व्यापार · उज्ज्वल भविष्य"],
    ["Live Agmarknet (data.gov.in) API Feed", "लाइव एगमार्कनेट (data.gov.in) डेटा फीड", "थेट अ‍ॅगमार्कनेट (data.gov.in) डेटा फीड"],
    ["Solid Green: Past 7 Days Actual Price", "ठोस हरा: पिछले 7 दिनों का वास्तविक मूल्य", "हिरवी रेघ: मागील ७ दिवसांचे प्रत्यक्ष भाव"],
    ["AgriNex - Orders & Shipments Tracker", "AgriNex - ऑर्डर और शिपमेंट ट्रैकर", "AgriNex - ऑर्डर्स आणि वाहतूक ट्रॅकर"],
    ["Escrow 35% Advance + 65% on Delivery", "एस्क्रो 35% अग्रिम + डिलीवरी पर 65%", "एस्क्रो ३५% आगाऊ + पोचपावतीवर ६५%"],
    ["Escrow Vault & Guaranteed Settlement", "एस्क्रो वॉल्ट और सुरक्षित निपटान", "एस्क्रो व्हॉल्ट आणि सुरक्षित हमी पेमेंट"],
    ["Primary Farm Location / Mandi Region", "प्राथमिक खेत स्थान / मंडी क्षेत्र", "मुख्य शेती ठिकाण / बाजार विभाग"],
    ["Registered under Companies Act 2013", "कंपनी अधिनियम 2013 के तहत पंजीकृत", "कंपनी कायदा २०१३ अंतर्गत नोंदणीकृत"],
    ["🌾 FPO Bulk Order Cooperative Pool", "🌾 एफपीओ थोक मांग सहकारी पूल", "🌾 FPO थेट संस्थात्मक खरेदी पूल"],
    ["Direct Farm Gate vs APMC Arbitrage", "खेत से सीधा बनाम मंडी मध्यस्थ अंतर", "शेत-शिवार थेट दर विरूद्ध बाजार समिती फरक"],
    ["Expected Floor Price (₹ / Quintal)", "अपेक्षित न्यूनतम मूल्य (₹ / क्विंटल)", "अपेक्षित किमान दर (₹ / क्विंटल)"],
    ["Escrow Instant Payout Bank Account", "एस्क्रो तत्काल भुगतान बैंक खाता", "एस्क्रो तात्काळ जमा बँक खाते"],
    ["to verified food processing plants", "सत्यापित खाद्य प्रसंस्करण संयंत्रों को", "प्रमाणित फूड प्रोसेसिंग प्लांट्सना"],
    ["Valid for Tolls & Mandi Checkposts", "टोल और मंडी चेकपोस्ट के लिए मान्य", "टोल नाके व बाजार समिती तपासणीसाठी वैध"],
    ["HDFC Bank Nodal Escrow Certificate", "एचडीएफसी बैंक नोडल एस्क्रो प्रमाणपत्र", "HDFC बँक नोडल एस्क्रो प्रमाणपत्र"],
    ["Fulfilled FPO Enterprise Contracts", "पूर्ण किए गए एफपीओ अनुबंध", "पूर्ण झालेले FPO करार"],
    ["AgriNex - Bids & Corporate Offers", "AgriNex - बोलियां और कॉर्पोरेट प्रस्ताव", "AgriNex - खरेदीदार बोली व संस्थात्मक ऑफर्स"],
    ["AgriNex - Escrow Payment Tracking", "AgriNex - एस्क्रो भुगतान ट्रैकिंग", "AgriNex - एस्क्रो पेमेंट ट्रॅकिंग"],
    ["⚖️ Quality Grade Dispute by Buyer", "⚖️ खरीदार द्वारा गुणवत्ता ग्रेड पर विवाद", "⚖️ खरेदीदाराकडून शेतमाल प्रत / दर्जा वाद"],
    ["🚨 High (Immediate Mandi Officer)", "🚨 उच्च (तत्काल मंडी अधिकारी हस्तक्षेप)", "🚨 उच्च (तात्काळ अधिकारी हस्तक्षेप)"],
    ["⚡ Critical (Escrow Freeze Needed)", "⚡ गंभीर (एस्क्रो राशि रोकें)", "⚡ अति-गंभीर (एस्क्रो रक्कम स्थगित करा)"],
    ["📜 Completed & Paid Contracts (2)", "📜 पूर्ण और भुगतान किए गए अनुबंध (2)", "📜 पूर्ण झालेले व रक्कम जमा करार (२)"],
    ["Grade A (Premium Export / Retail)", "ग्रेड ए (प्रीमियम निर्यात / खुदरा)", "ग्रेड अ (उत्कृष्ट निर्यात / किरकोळ)"],
    ["Dashed Blue: Next 7 Days Forecast", "डैश वाली नीली: अगले 7 दिनों का पूर्वानुमान", "निळी तुटक रेघ: पुढील ७ दिवसांचा भाकीत अंदाज"],
    ["under APMC Mandi Protection Rule", "एपीएमसी मंडी संरक्षण नियम के अंतर्गत", "बाजार समिती शेतकरी संरक्षण नियमानुसार"],
    ["Submit Grievance to Mandi Desk →", "मंडी डेस्क को शिकायत भेजें →", "तक्रार निवारण कक्षाकडे पाठवा →"],
    ["Direct AgriNex Platform Benefit:", "AgriNex सीधा मंच लाभ:", "AgriNex थेट विक्री निव्वळ फायदा:"],
    ["Emergency Salvage Protocol Ready", "आपातकालीन त्वरित बिक्री प्रणाली तैयार", "तातडीची संकट विक्री प्रणाली सज्ज"],
    ["Mobile Number (WhatsApp Enabled)", "मोबाइल नंबर (व्हाट्सएप सक्षम)", "मोबाईल क्रमांक (व्हॉट्सअ‍ॅप)"],
    ["directly into your bank account!", "सीधे आपके बैंक खाते में!", "थेट आपल्या बँक खात्यात!"],
    ["Related Crop Lot / Contract Ref", "संबंधित फसल लॉट / अनुबंध संदर्भ", "संबंधित पीक लॉट / करार संदर्भ"],
    ["Total Harvest Yield (Quintals):", "कुल उपज (क्विंटल):", "एकूण उत्पादन (क्विंटल):"],
    ["Nashik Agro Farmer Producer Co.", "नासिक एग्रो शेतकरी उत्पादक कंपनी", "नाशिक अ‍ॅग्रो शेतकरी उत्पादक कंपनी"],
    ["LOT-ONI-02 (Red Onion - Nashik)", "LOT-ONI-02 (लाल प्याज - नासिक)", "LOT-ONI-02 (लाल कांदा - नाशिक)"],
    ["Harvest Mandi / Pickup Location", "कटाई मंडी / उठान स्थान", "कापणी बाजार / माल उचल ठिकाण"],
    ["Grade C (Industrial/Processing)", "ग्रेड सी (औद्योगिक / प्रसंस्करण)", "ग्रेड क (औद्योगिक / प्रक्रिया)"],
    ["directly into your bank account", "सीधे आपके बैंक खाते में", "थेट आपल्या बँक खात्यात"],
    ["Direct Trade · Better Tomorrow", "सीधा व्यापार · बेहतर कल", "थेट व्यापार · उज्ज्वल भविष्य"],
    ["Lodge Farmer Grievance / Claim", "किसान शिकायत / दावा दर्ज करें", "शेतकरी तक्रार / दावा दाखल करा"],
    ["LOT-TOM-01 (Tomato - Reliance)", "LOT-TOM-01 (टमाटर - रिलायंस फ्रेश)", "LOT-TOM-01 (टोमॅटो - रिलायन्स फ्रेश)"],
    ["🧑‍🌾 My Harvest Commitments (", "🧑‍🌾 मेरी फसल प्रतिबद्धताएं (", "🧑‍🌾 माझी पीक नोंदणी ("],
    ["View Detailed Forecast &nbsp;→", "विस्तृत पूर्वानुमान देखें &nbsp;→", "सविस्तर भाकीत अंदाज पहा &nbsp;→"],
    ["Total Farm Landholding (Acres)", "कुल कृषि जोत (एकड़)", "एकूण शेतजमीन (एकर)"],
    ["Akola Desi Chana (Bengal Gram)", "अकोला देसी चना (चना)", "अकोला देशी हरभरा / चणा"],
    ["📝 Other Farmer Support Issue", "📝 अन्य किसान सहायता समस्या", "📝 इतर शेतकरी मदत व अडचण"],
    ["AgriNex Redressal Commitment:", "AgriNex निवारण प्रतिबद्धता:", "AgriNex निवारण हमी:"],
    ["AgriNex - Buyer Bids & Offers", "AgriNex - खरीदार बोलियां और ऑफर्स", "AgriNex - खरेदीदार बोली आणि ऑफर्स"],
    ["🏦 HDFC Bank Escrow Protected", "🏦 एचडीएफसी बैंक एस्क्रो सुरक्षित", "🏦 HDFC बँक एस्क्रो सुरक्षित"],
    ["Farmer Profile & KYC Identity", "किसान प्रोफाइल और केवाईसी पहचान", "शेतकरी माहिती व केवायसी पडताळणी"],
    ["Expected Floor Price (₹ / Qt)", "अपेक्षित न्यूनतम मूल्य (₹/क्विंटल)", "अपेक्षित किमान दर (₹/क्विंटल)"],
    ["Message for Buyer (Optional):", "खरीदार के लिए संदेश (वैकल्पिक):", "खरेदीदारासाठी संदेश (ऐच्छिक):"],
    ["FPO Governance & Contacts (4)", "एफपीओ प्रबंधन एवं संपर्क (4)", "FPO संचालक मंडळ व संपर्क (४)"],
    ["Yellow Soybean (Latur JS 335)", "पीला सोयाबीन (लातूर जेएस 335)", "पिवळी सोयाबीन (लातूर जेएस ३३५)"],
    ["Beed High-Oil Sunflower Seeds", "बीड उच्च-तेल सूरजमुखी बीज", "बीड जास्त तेलाचे सूर्यफूल बियाणे"],
    ["Heavy Multi-Axle (15+ Tonnes)", "बड़ा मल्टी-एक्सल ट्रक (15+ टन)", "मोठा मल्टि-अ‍ॅक्सल ट्रक (१५+ टन)"],
    ["Verified Farmer • Nashik, MH", "सत्यापित किसान • नासिक, महाराष्ट्र", "प्रमाणित शेतकरी • नाशिक, महाराष्ट्र"],
    ["Lasalgaon APMC Mandi, Nashik", "लासलगांव एपीएमसी मंडी, नासिक", "लासलगाव बाजार समिती, नाशिक"],
    ["Expected Price (₹/kg & ₹/Qt)", "अपेक्षित मूल्य (₹/किलो और ₹/क्विंटल)", "अपेक्षित दर (₹/किलो आणि ₹/क्विंटल)"],
    ["LOT-POT-03 (Potato - Balaji)", "LOT-POT-03 (आलू - बालाजी वेफर्स)", "LOT-POT-03 (बटाटा - बालाजी वेफर्स)"],
    ["as soon as the truck arrives", "ट्रक पहुंचते ही", "ट्रक पोहोचताच"],
    ["Wada Kolam Rice (Palghar GI)", "वाडा कोलम चावल (पालघर जीआई)", "वाडा कोलम तांदूळ (पालघर GI)"],
    ["Download Escrow Certificate", "एस्क्रो प्रमाणपत्र डाउनलोड करें", "एस्क्रो प्रमाणपत्र डाउनलोड करा"],
    ["(After transport & charges)", "(परिवहन और शुल्क के बाद)", "(वाहतूक व खर्च वजा जाता)"],
    ["Current Price (₹/kg & ₹/Qt)", "वर्तमान मूल्य (₹/किलो और ₹/क्विंटल)", "चालू दर (₹/किलो आणि ₹/क्विंटल)"],
    ["Verified Smallholder Farmer", "सत्यापित लघु किसान", "प्रमाणित अल्पभूधारक शेतकरी"],
    ["Instant 35% Advance Enabled", "तत्काल 35% अग्रिम सक्रिय", "तात्काळ ३५% आगाऊ रक्कम सुरू"],
    ["Step 1: 35% Advance Payment", "चरण 1: 35% अग्रिम भुगतान", "टप्पा १: ३५% आगाऊ पेमेंट"],
    ["Step 2: 65% Balance Payment", "चरण 2: 65% शेष भुगतान", "टप्पा २: ६५% उर्वरित हिशोब"],
    ["FPO Registered Mandi Region", "एफपीओ पंजीकृत मंडी क्षेत्र", "FPO नोंदणीकृत बाजार समिती विभाग"],
    ["Kolhapur Co 86032 Sugarcane", "कोल्हापुर को 86032 गन्ना", "कोल्हापूर को ८६०३२ ऊस"],
    ["Price Trend (Last 30 Days)", "मूल्य रुझान (पिछले 30 दिन)", "दरातील चढ-उतार (मागील ३० दिवस)"],
    ["Buyer / Corporate Sourcing", "खरीदार / कॉर्पोरेट कंपनी", "खरेदीदार / संस्थात्मक कंपनी"],
    ["Confirm Delivery Gate Pass", "गेट पास पुष्टि करें", "गेट पास निश्चित करा"],
    ["Packaging & Bagging Costs:", "पैकेजिंग और बोरी खर्च:", "पॅकिंग व बारदान खर्च:"],
    ["Net Extra Farmer Earnings:", "किसान की शुद्ध अतिरिक्त आय:", "शेतकऱ्याचे निव्वळ जास्तीचे उत्पन्न:"],
    ["My Crop Listings (Produce)", "मेरी फसल लिस्टिंग (उत्पाद)", "माझी पीक नोंदणी (शेतमाल)"],
    ["HDFC Bank Escrow Protected", "एचडीएफसी बैंक एस्क्रो सुरक्षित", "HDFC बँक एस्क्रो सुरक्षित"],
    ["Instant Breakeven Salvage:", "तत्काल वसूली बिक्री:", "तात्काळ आधार भाव विक्री:"],
    ["Food Processors & Caterers", "खाद्य प्रसंस्करण संयंत्र और कैटरर्स", "फूड प्रोसेसिंग उद्योग व कॅटरर्स"],
    ["Completed & Paid Contracts", "पूर्ण और भुगतान किए गए अनुबंध", "पूर्ण झालेले व रक्कम जमा करार"],
    ["⚡ Salvage Tomatoes (50 Qt)", "⚡ टमाटर त्वरित बिक्री (50 क्विंटल)", "⚡ टोमॅटो तातडीची विक्री (५० क्विंटल)"],
    ["Grade C (Processing Grade)", "ग्रेड सी (प्रसंस्करण ग्रेड)", "ग्रेड क (प्रक्रिया उद्योग प्रत)"],
    ["Shelf Life / Perishability", "खराब होने की अवधि / शेल्फ लाइफ", "टिकाऊ कालावधी / नाशवंतता"],
    ["35% Advance Paid at Pickup", "उठान पर 35% अग्रिम भुगतान", "माल उचल करताना ३५% आगाऊ रक्कम"],
    ["65% Balance (On Delivery):", "65% शेष (डिलीवरी पर):", "६५% शिल्लक (पोहोचल्यावर):"],
    ["Enter Your Price (₹ / kg):", "अपना मूल्य दर्ज करें (₹/किलो):", "आपला दर भरा (₹/किलो):"],
    ["Surat-Mumbai Highway KM 84", "सूरत-मुंबई राष्ट्रीय राजमार्ग KM 84", "सुरत-मुंबई महामार्ग KM ८४"],
    ["Mandatory Resolution SLA:", "अनिवार्य निवारण समय (SLA):", "बंधनकारक निवारण मुदत (SLA):"],
    ["Labor & Harvesting Costs:", "मजदूरी और कटाई खर्च:", "मजुरी आणि काढणी खर्च:"],
    ["Collective Bulk Order Hub", "सामूहिक थोक मांग केंद्र", "थेट संस्थात्मक खरेदी केंद्र"],
    ["Daily Mandi Price Updates", "दैनिक मंडी भाव अपडेट्स", "रोजचे बाजार भाव अपडेट्स"],
    ["LOT-CHI-05 (Green Chilli)", "LOT-CHI-05 (हरी मिर्च)", "LOT-CHI-05 (हिरवी मिरची)"],
    ["🔥 Active Bulk Orders (6)", "🔥 सक्रिय थोक मांगें (6)", "🔥 सक्रिय संस्थात्मक खरेदी ऑर्डर्स (६)"],
    ["Price Forecast & Insights", "मूल्य पूर्वानुमान और अंतर्दृष्टि", "दर अंदाज आणि विश्लेषण"],
    ["Grade B (Standard Market)", "ग्रेड बी (मानक मंडी)", "ग्रेड ब (साधारण बाजार समिती)"],
    ["25 Days (Semi-perishable)", "25 दिन (मध्यम नाशवान)", "२५ दिवस (मध्यम नाशवंत)"],
    ["Prices likely to increase", "कीमतें बढ़ने की संभावना", "दर वाढण्याची शक्यता"],
    ["Enter Counter Offer Price", "जवाबी मूल्य दर्ज करें", "काऊंटर दर भरा"],
    ["FPO Governance & Contacts", "एफपीओ प्रबंधन एवं संपर्क", "FPO संचालक मंडळ व संपर्क"],
    ["Latur Red Tur (Arhar Dal)", "लातूर लाल अरहर (तूर दाल)", "लातूर लाल तूर डाळ"],
    ["Medium Truck (5-7 Tonnes)", "मध्यम ट्रक (5-7 टन)", "मध्यम ट्रक (५-७ टन)"],
    ["Verified Farmer • Nashik", "सत्यापित किसान • नासिक", "प्रमाणित शेतकरी • नाशिक"],
    ["🚨 Emergency Sale Active", "🚨 संकटकालीन बिक्री सक्रिय", "🚨 तातडीची विक्री सक्रिय"],
    ["Released to Bank Account", "बैंक खाते में जमा राशि", "बँक खात्यात जमा झालेली रक्कम"],
    ["&larr; Back to Dashboard", "&larr; डैशबोर्ड पर वापस जाएं", "&larr; डॅशबोर्डवर परत जा"],
    ["View Detailed Forecast →", "विस्तृत पूर्वानुमान देखें →", "सविस्तर भाकीत अंदाज पहा →"],
    ["Quantity (Quintals / Qt)", "मात्रा (क्विंटल / क्विंटल)", "प्रमाण (क्विंटल)"],
    ["Primary Cultivated Crops", "मुख्य उगाई जाने वाली फसलें", "मुख्य उत्पादित पिके"],
    ["3 Days (High Perishable)", "3 दिन (अति नाशवान)", "३ दिवस (अति नाशवंत)"],
    ["180 Days (Grains/Stable)", "180 दिन (अनाज / स्थिर)", "१८० दिवस (धान्य / टिकणारे)"],
    ["Past 7 Days Actual Price", "पिछले 7 दिनों का वास्तविक मूल्य", "मागील ७ दिवसांचे प्रत्यक्ष भाव"],
    ["35% Advance (At Pickup):", "35% अग्रिम (उठान पर):", "३५% आगाऊ (उचल करताना):"],
    ["✓ Accept & Confirm Order", "✓ स्वीकारें और ऑर्डर की पुष्टि करें", "✓ स्वीकारा आणि ऑर्डर निश्चित करा"],
    ["Nodal Escrow Certificate", "नोडल एस्क्रो प्रमाणपत्र", "नोडल एस्क्रो प्रमाणपत्र"],
    ["100% On-Time Fulfillment", "100% समय पर पूर्ति", "१००% वेळेवर पुरवठा"],
    ["Sangli Rajapuri Turmeric", "सांगली राजापुरी हल्दी", "सांगली राजापुरी हळद"],
    ["Desi Chana (Bengal Gram)", "देसी चना (चना)", "देशी हरभरा"],
    ["Jalgaon Shiny Green Mung", "जलगांव चमकीला हरा मूंग", "जळगाव चमकदार हिरवा मूग"],
    ["High-Oil Sunflower Seeds", "उच्च-तेल सूरजमुखी बीज", "जास्त तेलाचे सूर्यफूल बियाणे"],
    ["Small Truck (1-2 Tonnes)", "छोटा ट्रक (1-2 टन)", "छोटा ट्रक (१-२ टन)"],
    ["65% Balance on Delivery:", "डिलीवरी पर 65% शेष:", "पोहोचल्यावर ६५% शिल्लक:"],
    ["7-Day AI Price Forecast", "7-दिवसीय एआई मूल्य पूर्वानुमान", "७ दिवसांचा AI भाकीत दर"],
    ["Mandi Comparison Matrix", "मंडी तुलना मैट्रिक्स", "बाजार समिती दर तुलना तक्ता"],
    ["Modal Price (₹/Quintal)", "मॉडल भाव (₹/क्विंटल)", "सरासरी दर (₹/क्विंटल)"],
    ["Calculate Profit Spread", "लाभ अंतर की गणना करें", "निव्वळ नफा मोजा"],
    ["Escrow Payment Tracking", "एस्क्रो भुगतान ट्रैकिंग", "एस्क्रो पेमेंट ट्रॅकिंग"],
    ["Premium Export / Retail", "प्रीमियम निर्यात / खुदरा", "उत्कृष्ट निर्यात / किरकोळ"],
    ["Village & Mandi Cluster", "ग्राम एवं मंडी संकुल", "गाव व बाजार समिती संकुल"],
    ["Registered Mandi Region", "पंजीकृत मंडी क्षेत्र", "नोंदणीकृत बाजार समिती विभाग"],
    ["YOUR EXTRA CASH IN HAND", "आपके हाथ में शुद्ध अतिरिक्त नकद लाभ", "आपल्या हातात मिळणारा निव्वळ जास्तीचा रोख नफा"],
    ["65% Balance on Delivery", "डिलीवरी पर 65% शेष", "पोहोचल्यावर ६५% शिल्लक"],
    ["BEST BID (₹/KG & ₹/QT)", "सर्वोत्तम बोली (₹/किलो और ₹/क्विंटल)", "सर्वोत्तम बोली (₹/किलो आणि ₹/क्विंटल)"],
    ["Best Bid (₹/kg & ₹/Qt)", "सर्वोत्तम बोली (₹/किलो और ₹/क्विंटल)", "सर्वोत्तम बोली (₹/किलो आणि ₹/क्विंटल)"],
    ["🚨 Emergency Sale Mode", "🚨 संकटकालीन त्वरित बिक्री", "🚨 तातडीची संकट विक्री"],
    ["Medium (General Query)", "मध्यम (सामान्य पूछताछ)", "मध्यम (सर्वसाधारण चौकशी)"],
    ["Detailed Explanation *", "विस्तृत विवरण *", "सविस्तर स्पष्टीकरण *"],
    ["Select Mandi / Market:", "मंडी / बाजार चुनें:", "बाजार समिती निवडा:"],
    ["Nashik Central Hub, MH", "नासिक केंद्रीय केंद्र, महाराष्ट्र", "नाशिक मध्यवर्ती केंद्र, महाराष्ट्र"],
    ["🚨 Emergency Salvage (", "🚨 आपातकालीन त्वरित बिक्री (", "🚨 तातडीची संकट विक्री ("],
    ["My Harvest Commitments", "मेरी फसल प्रतिबद्धताएं", "माझी पीक नोंदणी"],
    ["Total Farm Landholding", "कुल कृषि जोत", "एकूण शेतजमीन"],
    ["institutional caterers", "संस्थात्मक कैटरर्स", "संस्थात्मक कॅटरर्स"],
    ["Extra Earning vs Mandi", "मंडी से अतिरिक्त कमाई", "बाजार समितीपेक्षा जास्तीचे उत्पन्न"],
    ["Calculate Extra Profit", "अतिरिक्त लाभ की गणना करें", "जास्तीचा नफा मोजा"],
    ["Enter Yield (Quintals)", "उपज दर्ज करें (क्विंटल)", "उत्पादन भरा (क्विंटल)"],
    ["Expected Selling Price", "अपेक्षित बिक्री मूल्य", "अपेक्षित विक्री दर"],
    ["Automatically released", "स्वचालित रूप से जारी", "आपोआप जमा"],
    ["Committed to FPO Pools", "एफपीओ पूल में शामिल", "FPO पूलमधे जमा"],
    ["institutional delivery", "संस्थात्मक डिलीवरी", "संस्थात्मक पुरवठा"],
    ["Successfully Fulfilled", "सफलतापूर्वक पूर्ण", "यशस्वीरीत्या पूर्ण"],
    ["Nashik Thompson Grapes", "नासिक थॉमसन अंगूर", "नाशिक थॉम्पसन द्राक्षे"],
    ["into your bank account", "आपके बैंक खाते में", "आपल्या बँक खात्यात"],
    ["35% Advance at Pickup:", "उठान पर 35% अग्रिम:", "उचल करताना ३५% आगाऊ:"],
    ["Lasalgaon, Nashik, MH", "लासलगांव, नासिक, महाराष्ट्र", "लासलगाव, नाशिक, महाराष्ट्र"],
    ["General Mandi Inquiry", "सामान्य मंडी पूछताछ", "सर्वसाधारण बाजार समिती चौकशी"],
    ["Bid Price per Quintal", "प्रति क्विंटल बोली दर", "प्रति क्विंटल बोली दर"],
    ["Logistics Arrangement", "लॉजिस्टिक्स / परिवहन व्यवस्था", "वाहतूक व वाहतूकदार व्यवस्था"],
    ["Primary Farm Location", "प्राथमिक खेत स्थान", "मुख्य शेती ठिकाण"],
    ["Clear daily prices in", "स्पष्ट दैनिक भाव", "स्पष्ट रोजचे भाव"],
    ["Delivery Confirmation", "डिलीवरी पुष्टि", "पोहोच खात्री"],
    ["35% Advance (In Bank)", "35% अग्रिम (बैंक में जमा)", "३५% आगाऊ (बँकेत जमा)"],
    ["ETA: Tomorrow 8:00 AM", "अपेक्षित समय: कल सुबह 8:00 बजे", "अपेक्षित वेळ: उद्या सकाळी ८:०० वाजता"],
    ["directly to your bank", "सीधे आपके बैंक खाते में", "थेट आपल्या बँक खात्यात"],
    ["Nanded Black Urad Dal", "नांदेड काला उड़द दाल", "नांदेड काळी उडीद डाळ"],
    ["35% Advance at Pickup", "उठान पर 35% अग्रिम", "उचल करताना ३५% आगाऊ"],
    ["Nashik Mandi Hub, MH", "नासिक मंडी हब, महाराष्ट्र", "नाशिक बाजार समिती केंद्र, महाराष्ट्र"],
    ["Active investigation", "सक्रिय जांच", "सक्रिय तपासणी"],
    ["Grievance Category *", "शिकायत की श्रेणी *", "तक्रारीचा प्रकार *"],
    ["Add New Crop Listing", "नई फसल लिस्टिंग जोड़ें", "नवीन पीक नोंदणी करा"],
    ["Live APMC Modal Rate", "लाइव एपीएमसी मॉडल भाव", "थेट बाजार समिती सरासरी भाव"],
    ["Arrival Volume Today", "आज की आवक मात्रा", "आजची एकूण आवक"],
    ["Accept & Lock Escrow", "स्वीकारें और एस्क्रो लॉक करें", "स्वीकारा आणि एस्क्रो लॉक करा"],
    ["Pending Gate Release", "डिलीवरी उपरांत लंबित", "पोचपावतीनंतर मिळणारी रक्कम"],
    ["65% Final Settlement", "65% अंतिम निपटान", "६५% अंतिम हिशोब"],
    ["⚡ Emergency Eligible", "⚡ आपातकालीन बिक्री पात्र", "⚡ तातडीच्या विक्रीस पात्र"],
    ["Next 7 days forecast", "अगले 7 दिनों का पूर्वानुमान", "पुढील ७ दिवसांचा अंदाज"],
    ["Expected Floor Price", "अपेक्षित न्यूनतम मूल्य", "अपेक्षित किमान दर"],
    ["Publish Crop Listing", "फसल लिस्टिंग प्रकाशित करें", "पीक नोंदणी प्रकाशित करा"],
    ["Save Profile Changes", "प्रोफाइल परिवर्तन सहेजें", "माहितीतील बदल जतन करा"],
    ["Buyer & Verification", "खरीदार और सत्यापन", "खरेदीदार आणि पडताळणी"],
    ["Top Demanded Produce", "सर्वाधिक मांग वाली फसलें", "सर्वाधिक मागणी असलेला शेतमाल"],
    ["Next 7 Days Forecast", "अगले 7 दिनों का पूर्वानुमान", "पुढील ७ दिवसांचा अंदाज"],
    ["HOLD / DELAY HARVEST", "रोकें / कटाई टालें", "थांबा / काढणी पुढे ढकला"],
    ["MODAL RATE (KG / QT)", "मॉडल दर (किलो / क्विंटल)", "सरासरी दर (किलो / क्विंटल)"],
    ["Pickup Scheduled (1)", "उठान निर्धारित (1)", "उचल नियोजित (१)"],
    ["Enterprise Contracts", "कॉर्पोरेट अनुबंध", "संस्थात्मक करार"],
    ["Total Contract Value", "कुल अनुबंध मूल्य", "एकूण करार मूल्य"],
    ["Shareholding Capital", "शेयर पूंजी", "भागभांडवल"],
    ["Lodge New Grievance", "नई शिकायत दर्ज करें", "+ नवीन तक्रार नोंदवा"],
    ["Total Claims Lodged", "कुल दर्ज शिकायतें", "एकूण दाखल तक्रारी"],
    ["All recorded issues", "सभी दर्ज मामले", "सर्व नोंदवलेल्या बाबी"],
    ["100% Payout cleared", "100% भुगतान जारी", "१००% रक्कम अदा"],
    ["Zero-loss guarantee", "शून्य नुकसान गारंटी", "शून्य नुकसान हमी"],
    ["Direct Gate Benefit", "सीधे बेचने पर लाभ", "थेट विक्रीचा निव्वळ फायदा"],
    ["Total Escrow Locked", "कुल एस्क्रो सुरक्षित राशि", "एकूण सुरक्षित एस्क्रो रक्कम"],
    ["35% Advance Cleared", "35% अग्रिम भुगतान सफल", "३५% आगाऊ रक्कम जमा"],
    ["Synced: Today, Live", "अपडेट: आज, लाइव", "अपडेट: आज, थेट"],
    ["Buyer Bids & Offers", "खरीदार बोलियां और ऑफर्स", "खरेदीदार बोली आणि ऑफर्स"],
    ["Direct price offers", "सीधे मूल्य प्रस्ताव", "थेट दर ऑफर्स"],
    ["65% Balance Pending", "65% शेष राशि लंबित", "६५% उर्वरित रक्कम प्रलंबित"],
    ["Harvest Commitments", "फसल प्रतिबद्धताएं", "पीक हमी नोंदणी"],
    ["Crop Name / Variety", "फसल का नाम / किस्म", "पिकाचे नाव / वाण"],
    ["Quantity (Quintals)", "मात्रा (क्विंटल)", "प्रमाण (क्विंटल)"],
    ["7 Days (Perishable)", "7 दिन (नाशवान)", "७ दिवस (नाशवंत)"],
    ["Best Mandis to Sell", "बेचने के लिए सर्वोत्तम मंडियां", "विक्रीसाठी सर्वोत्तम बाजार समित्या"],
    ["Weighbridge Receipt", "धर्मकांटा रसीद", "वजन काटा पावती"],
    ["Input Cost per Acre", "प्रति एकड़ लागत खर्च", "प्रति एकर खर्च"],
    ["Labor Cost per Acre", "प्रति एकड़ मजदूरी खर्च", "प्रति एकर मजुरी खर्च"],
    ["35% Advance Payment", "35% अग्रिम भुगतान", "३५% आगाऊ पेमेंट"],
    ["65% Balance Payment", "65% शेष भुगतान", "६५% उर्वरित हिशोब"],
    ["and loads your crop", "और फसल लोड होते ही", "आणि माल भरताच"],
    ["delivery acceptance", "डिलीवरी स्वीकृति", "पोहोच पावती स्वीकृती"],
    ["Enterprise Contract", "कॉर्पोरेट अनुबंध", "संस्थात्मक करार"],
    ["On-Time Fulfillment", "समय पर पूर्ति", "वेळेवर पुरवठा"],
    ["Contract / Batch ID", "अनुबंध / बैच आईडी", "करार / बॅच आयडी"],
    ["Pooled Batch Volume", "एकत्रित बैच मात्रा", "एकत्रित बॅच प्रमाण"],
    ["contact information", "संपर्क जानकारी", "संपर्क माहिती"],
    ["List This Crop at ₹", "इस फसल को ₹ पर लिस्ट करें", "हे पीक ₹ दराने नोंदवा"],
    ["🌐 Select Language", "🌐 भाषा चुनें", "🌐 भाषा निवडा"],
    ["Resolved & Settled", "निस्तारित और भुगतान संपन्न", "निवारण झालेले व रक्कम जमा"],
    ["Accepted Contracts", "स्वीकृत अनुबंध", "मंजूर करार"],
    ["Expired / Rejected", "समाप्त / अस्वीकृत", "कालबाह्य / नाकारलेले"],
    ["Bank Reference No.", "बैंक संदर्भ संख्या", "बँक संदर्भ क्रमांक"],
    ["Orders & Shipments", "ऑर्डर और शिपमेंट", "ऑर्डर्स आणि वाहतूक"],
    ["All Listed Crops (", "सभी सूचीबद्ध फसलें (", "सर्व नोंदणीकृत पिके ("],
    ["NAFPO Member #8821", "एनएएफपीओ सदस्य #8821", "NAFPO सदस्य #८८२१"],
    ["Red Onion - Nashik", "लाल प्याज - नासिक", "लाल कांदा - नाशिक"],
    ["Emergency Eligible", "आपातकालीन बिक्री पात्र", "तातडीच्या विक्रीस पात्र"],
    ["Active Bulk Orders", "सक्रिय थोक मांगें", "सक्रिय संस्थात्मक ऑर्डर्स"],
    ["Enter Crop Details", "फसल का विवरण दर्ज करें", "पिकाचा तपशील भरा"],
    ["ID: AGRI-FARM-8821", "आईडी: AGRI-FARM-8821", "आयडी: AGRI-FARM-8821"],
    ["Smallholder Farmer", "लघु सीमांत किसान", "अल्पभूधारक शेतकरी"],
    ["for instant payout", "तत्काल भुगतान के लिए", "तात्काळ रकमेसाठी"],
    ["in the next 7 days", "अगले 7 दिनों में", "पुढील ७ दिवसांत"],
    ["National Benchmark", "राष्ट्रीय मानक बेंचमार्क", "राष्ट्रीय मानक दर"],
    ["likely to increase", "बढ़ने की संभावना", "वाढण्याची शक्यता"],
    ["over next 3–5 days", "अगले 3–5 दिनों में", "पुढील ३–५ दिवसांत"],
    ["Send Counter Offer", "जवाबी प्रस्ताव भेजें", "काऊंटर ऑफर पाठवा"],
    ["Live GPS Telemetry", "लाइव जीपीएस टेलीमेट्री", "थेट GPS ट्रॅकिंग"],
    ["Estimated Delivery", "अनुमानित डिलीवरी समय", "अपेक्षित पोहोच वेळ"],
    ["Bank Payout Status", "बैंक भुगतान स्थिति", "बँक पेमेंट स्थिती"],
    ["Cooperative Demand", "सहकारी मांग", "सामूहिक मागणी"],
    ["Aggregated Harvest", "एकत्रित फसल", "एकत्रित शेतमाल"],
    ["Total Paid to Date", "अब तक कुल प्राप्त भुगतान", "आतापर्यंत मिळालेली एकूण रक्कम"],
    ["at buyer warehouse", "खरीदार के गोदाम पर", "खरेदीदाराच्या गोदामात"],
    ["Escrow Certificate", "एस्क्रो प्रमाणपत्र", "एस्क्रो प्रमाणपत्र"],
    ["+ Commit More Lots", "+ और लॉट जोड़ें", "+ आणखी लॉट्स जोडा"],
    ["Board of Directors", "निदेशक मंडल", "संचालक मंडळ"],
    ["Field Coordinators", "क्षेत्र समन्वयक", "क्षेत्रीय समन्वयक"],
    ["Companies Act 2013", "कंपनी अधिनियम 2013", "कंपनी कायदा २०१३"],
    ["Designation / Role", "पद / भूमिका", "पद / जबाबदारी"],
    ["Company leadership", "कंपनी नेतृत्व", "कंपनी संचालक मंडळ"],
    ["Verified Member of", "के सत्यापित सदस्य", "चे प्रमाणित सभासद"],
    ["Farmer Shareholder", "किसान शेयरधारक", "शेतकरी भागधारक"],
    ["Co 86032 Sugarcane", "को 86032 गन्ना", "को ८६०३२ ऊस"],
    ["EXTRA CASH IN HAND", "अतिरिक्त नकद लाभ", "जास्तीचा रोख नफा"],
    ["Mandi Cess (1.5%):", "मंडी उपकर (1.5%):", "बाजार समिती सेस (१.५%):"],
    ["Buyers interested", "इच्छुक खरीदार", "इच्छुक खरेदीदार"],
    ["Pending Shipments", "लंबित शिपमेंट", "वाहतुकीत असलेले"],
    ["Enterprise Demand", "कॉर्पोरेट मांग", "संस्थात्मक मागणी"],
    ["Escrow Guaranteed", "एस्क्रो गारंटीकृत", "एस्क्रो सुरक्षित रक्कम"],
    ["View Pool Summary", "पूल सारांश देखें", "पूल तपशील पहा"],
    ["🚨 Emergency Sale", "🚨 संकटकालीन त्वरित बिक्री", "🚨 तातडीची संकट विक्री"],
    ["🚨 Under Review (", "🚨 समीक्षाधीन (", "🚨 चौकशी सुरू ("],
    ["All Crop Listings", "सभी फसल लिस्टिंग", "सर्व पीक नोंदी"],
    ["Filter by Status:", "स्थिति अनुसार चुनें:", "स्थितीनुसार निवडा:"],
    ["Select Commodity:", "जिंस चुनें:", "शेतमाल निवडा:"],
    ["Arrivals (Tonnes)", "आवक (टन)", "आवक (टन)"],
    ["Total Order Value", "कुल ऑर्डर मूल्य", "एकूण ऑर्डर रक्कम"],
    ["Profit Calculator", "लाभ कैलकुलेटर", "नफा गणक"],
    ["Tomato - Reliance", "टमाटर - रिलायंस", "टोमॅटो - रिलायन्स"],
    ["Emergency Salvage", "आपातकालीन त्वरित बिक्री", "तातडीची संकट विक्री"],
    ["Instant Breakeven", "तत्काल वसूली", "तात्काळ आधार भाव"],
    ["Detailed Forecast", "विस्तृत पूर्वानुमान", "सविस्तर भाकीत अंदाज"],
    ["Date of Harvest *", "कटाई की तारीख *", "कापणीची तारीख *"],
    ["Good time to sell", "बेचने का अच्छा समय", "विक्रीसाठी योग्य वेळ"],
    ["By Arrival Volume", "आवक मात्रा के अनुसार", "आवक प्रमाणानुसार"],
    ["Price Projections", "मूल्य अनुमान", "दर अंदाज"],
    ["DESTINATION MANDI", "गंतव्य मंडी", "पोहोच बाजार समिती"],
    ["NET SPREAD / GAIN", "शुद्ध लाभ / अंतर", "निव्वळ नफा / फायदा"],
    ["Gross Realization", "सकल प्राप्ति", "एकूण प्राप्ती"],
    ["Net Profit Margin", "शुद्ध लाभ मार्जिन", "निव्वळ नफा टक्केवारी"],
    ["Message for Buyer", "खरीदार के लिए संदेश", "खरेदीदारासाठी संदेश"],
    ["Volume in Transit", "मार्ग में कुल मात्रा", "वाहतुकीत असलेले प्रमाण"],
    ["Digital Gate Pass", "डिजिटल गेट पास", "डिजिटल गेट पास"],
    ["Est. Total Payout", "अनुमानित कुल भुगतान", "अपेक्षित एकूण रक्कम"],
    ["industrial buyers", "औद्योगिक खरीदार", "औद्योगिक खरेदीदार"],
    ["Logistics Carrier", "परिवहन वाहक (कैरियर)", "वाहतूकदार (कॅरियर)"],
    ["Settlement Status", "निपटान स्थिति", "पेमेंट स्थिती"],
    ["Managing Director", "प्रबंध निदेशक", "व्यवस्थापकीय संचालक"],
    ["NAFPO Shareholder", "एनएएफपीओ शेयरधारक किसान", "NAFPO भागधारक शेतकरी"],
    ["Rajapuri Turmeric", "राजापुरी हल्दी", "राजापुरी हळद"],
    ["Distance to Buyer", "खरीदार की दूरी", "खरेदीदाराचे अंतर"],
    ["Transport Vehicle", "परिवहन वाहन प्रकार", "वाहतूक गाडी प्रकार"],
    ["List This Crop at", "इस फसल को लिस्ट करें दर", "हे पीक नोंदवा दर"],
    ["Estimated Profit", "अनुमानित लाभ", "अपेक्षित नफा"],
    ["Protected Escrow", "सुरक्षित एस्क्रो", "संरक्षित एस्क्रो"],
    ["Min Price (₹/Qt)", "न्यूनतम भाव (₹/क्विंटल)", "किमान दर (₹/क्विंटल)"],
    ["Max Price (₹/Qt)", "अधिकतम भाव (₹/क्विंटल)", "कमाल दर (₹/क्विंटल)"],
    ["Weighbridge Slip", "वजन कांटा रसीद", "वजन पावती"],
    ["Grievance Module", "शिकायत मॉड्यूल", "तक्रार निवारण"],
    ["&larr; Dashboard", "&larr; डैशबोर्ड", "&larr; डॅशबोर्ड"],
    ["Emergency Sale (", "आपातकालीन बिक्री (", "तातडीची विक्री ("],
    ["All Listed Crops", "सभी सूचीबद्ध फसलें", "सर्व नोंदणीकृत पिके"],
    ["Grains & Cereals", "अनाज और खाद्यान्न", "धान्य आणि अन्नधान्य"],
    ["Pulses & Legumes", "दालें और दलहन", "कडधान्ये व डाळी"],
    ["for your produce", "आपकी फसल के लिए", "आपल्या शेतमालासाठी"],
    ["Processing Grade", "प्रसंस्करण ग्रेड", "प्रक्रिया उद्योग प्रत"],
    ["WhatsApp Enabled", "व्हाट्सएप सक्षम", "व्हॉट्सअ‍ॅप चालू"],
    ["to rise steadily", "लगातार बढ़ने की", "सातत्याने वाढण्याची"],
    ["Current Best Bid", "वर्तमान सर्वोत्तम बोली", "सध्याची सर्वोत्तम बोली"],
    ["MANDI / LOCATION", "मंडी / स्थान", "बाजार समिती / ठिकाण"],
    ["DIRECT ARBITRAGE", "सीधा मुनाफा अंतर", "थेट नफा फायदा"],
    ["Enter Your Price", "अपना मूल्य दर्ज करें", "आपला दर भरा"],
    ["Download Receipt", "रसीद डाउनलोड करें", "पावती डाउनलोड करा"],
    ["Total Input Cost", "कुल लागत खर्च", "एकूण खर्च"],
    ["Delivery Success", "सफल डिलीवरी दर", "यशस्वी पोहोच"],
    ["Pickup Scheduled", "उठान निर्धारित", "उचल नियोजित"],
    ["Net Extra Income", "शुद्ध अतिरिक्त आय", "निव्वळ जास्तीचे उत्पन्न"],
    ["Mandi Checkposts", "मंडी चेकपोस्ट", "बाजार समिती तपासणी नाके"],
    ["Tomorrow 8:00 AM", "कल सुबह 8:00 बजे", "उद्या सकाळी ८:०० वाजता"],
    ["currently pooled", "वर्तमान में एकत्रित", "सध्या एकत्रित"],
    ["Commit More Lots", "और लॉट जोड़ें", "आणखी लॉट्स जोडा"],
    ["industrial buyer", "औद्योगिक खरीदार", "औद्योगिक खरेदीदार"],
    ["Enterprise Buyer", "कॉर्पोरेट खरीदार", "संस्थात्मक खरेदीदार"],
    ["Registered under", "के तहत पंजीकृत", "अंतर्गत नोंदणीकृत"],
    ["Registered Mandi", "पंजीकृत मंडी", "नोंदणीकृत बाजार समिती"],
    ["Shiny Green Mung", "चमकीला हरा मूंग", "चमकदार हिरवा मूग"],
    ["Transport Share:", "परिवहन हिस्सा / खर्च:", "वाहतूक हिस्सा / खर्च:"],
    ["Verified Farmer", "सत्यापित किसान", "प्रमाणित शेतकरी"],
    ["Total Crop Lots", "कुल फसल लॉट", "एकूण पीक लॉट्स"],
    ["Active listings", "सक्रिय लिस्टिंग", "सक्रिय नोंदी"],
    ["Pool My Harvest", "अपनी फसल पूल में जोड़ें", "माझे पीक पूलमधे जोडा"],
    ["Lodge Grievance", "शिकायत दर्ज करें", "तक्रार नोंदवा"],
    ["Issue Subject *", "मुद्दे का विषय *", "तक्रारीचा विषय *"],
    ["Filter by Crop:", "फसल अनुसार चुनें:", "पिकानुसार निवडा:"],
    ["Destination Hub", "गंतव्य केंद्र", "पोहचण्याचे ठिकाण"],
    ["Disputed / Held", "रोकी गई राशि", "राखीव / स्थगित रक्कम"],
    ["Milestone Stage", "चरण / पड़ाव", "टप्पा / स्थिती"],
    ["Patil Rameshwar", "पाटिल रामेश्वर", "पाटील रामेश्वर"],
    ["Rameshwar Patil", "पाटिल रामेश्वर", "पाटील रामेश्वर"],
    ["My Crops & Lots", "मेरी फसलें और लॉट", "माझी पिके आणि लॉट्स"],
    ["Market Insights", "मंडी अंतर्दृष्टि", "बाजार अंतर्दृष्टी"],
    ["Escrow Tracking", "एस्क्रो ट्रैकिंग", "एस्क्रो ट्रॅकिंग"],
    ["Better Tomorrow", "बेहतर कल", "उज्ज्वल भविष्य"],
    ["Acknowledgement", "पावती", "पोचपावती"],
    ["Select Language", "भाषा चुनें", "भाषा निवडा"],
    ["Potato - Balaji", "आलू - बालाजी", "बटाटा - बालाजी"],
    ["Food Processors", "खाद्य प्रसंस्करण संयंत्र", "फूड प्रोसेसिंग उद्योग"],
    ["verified buyers", "सत्यापित खरीदार", "प्रमाणित खरेदीदार"],
    ["Balance Pending", "शेष राशि लंबित", "उर्वरित रक्कम प्रलंबित"],
    ["Standard Market", "मानक मंडी", "साधारण बाजार समिती"],
    ["Date of Harvest", "कटाई की तारीख", "कापणीची तारीख"],
    ["Pickup Location", "उठान स्थान", "माल उचल ठिकाण"],
    ["(42 Dispatches)", "(42 प्रेषण / डिलीवरी)", "(४२ यशस्वी गाड्या)"],
    ["PM-KISAN Linked", "पीएम-किसान लिंक किया गया", "PM-किसान लिंक"],
    ["Top Rising Crop", "सर्वाधिक बढ़त वाली फसल", "सर्वाधिक तेजी असलेले पीक"],
    ["High Perishable", "अति नाशवान", "जास्त नाशवंत"],
    ["Semi-perishable", "मध्यम नाशवान", "मध्यम नाशवंत"],
    ["Over Mandi Rate", "मंडी दर से अधिक", "बाजार समिती दरापेक्षा जास्त"],
    ["Vehicle Details", "वाहन विवरण", "गाडी तपशील"],
    ["On The Road (2)", "मार्ग में (2)", "मार्गावर (२)"],
    ["Escrow Released", "एस्क्रो राशि जारी", "एस्क्रो रक्कम जमा"],
    ["Contract Status", "अनुबंध स्थिति", "करार स्थिती"],
    ["Valid for Tolls", "टोल के लिए मान्य", "टोलसाठी वैध"],
    ["loads your crop", "फसल लोड होते ही", "माल भरताच"],
    ["buyer warehouse", "खरीदार का गोदाम", "खरेदीदाराचे गोदाम"],
    ["Corporate Buyer", "कॉर्पोरेट खरीदार", "संस्थात्मक खरेदीदार"],
    ["My Contribution", "मेरा योगदान", "माझे योगदान"],
    ["Annual Dividend", "वार्षिक लाभांश", "वार्षिक लाभांश"],
    ["Patronage Bonus", "बोनस / अतिरिक्त लाभ", "बोनस"],
    ["Thompson Grapes", "थॉमसन अंगूर", "थॉम्पसन द्राक्षे"],
    ["Tur (Arhar Dal)", "तूर (अरहर दाल)", "तूर डाळ"],
    ["Sunflower Seeds", "सूरजमुखी बीज", "सूर्यफूल बियाणे"],
    ["YOUR EXTRA CASH", "आपकी अतिरिक्त कमाई", "आपले जास्तीचे उत्पन्न"],
    ["Wada Kolam Rice", "वाडा कोलम चावल", "वाडा कोलम तांदूळ"],
    ["Agent Cut (6%):", "बिचौलिया / आढ़तिया कटौती (6%):", "मध्यस्थ / आडत कपात (६%):"],
    ["Transport Share", "परिवहन हिस्सा", "वाहतूक हिस्सा"],
    ["Grievance Desk", "शिकायत डेस्क", "तक्रार कक्ष"],
    ["Crop & Variety", "फसल और किस्म", "पीक आणि वाण"],
    ["Expected Price", "अपेक्षित मूल्य", "अपेक्षित दर"],
    ["Moisture Level", "नमी का स्तर", "आर्द्रता / ओलावा"],
    ["Pending Review", "समीक्षा लंबित", "पडताळणी बाकी"],
    ["Vehicle Number", "वाहन क्रमांक", "गाडी क्रमांक"],
    ["Transaction ID", "लेनदेन आईडी", "व्यवहार आयडी"],
    ["All Categories", "सभी श्रेणियां", "सर्व वर्गवारी"],
    ["ID: FARM-88210", "आईडी: FARM-88210", "आयडी: FARM-88210"],
    ["Protocol Ready", "प्रणाली तैयार", "प्रणाली सज्ज"],
    ["Paid Contracts", "भुगतान किए गए अनुबंध", "रक्कम जमा करार"],
    ["Select Produce", "फसल / उत्पाद चुनें", "शेतमाल निवडा"],
    ["Premium Export", "प्रीमियम निर्यात", "उत्कृष्ट निर्यात"],
    ["✓ KYC Verified", "✓ केवाईसी सत्यापित", "✓ KYC प्रमाणित"],
    ["AGRI-FARM-8821", "AGRI-FARM-8821", "AGRI-FARM-8821"],
    ["NPOP Certified", "एनपीओपी प्रमाणित", "NPOP प्रमाणित"],
    ["HDFC Bank Ltd.", "एचडीएफसी बैंक लिमिटेड", "HDFC बँक लि."],
    ["PRICE FORECAST", "मूल्य पूर्वानुमान", "भाकीत दर"],
    ["Arrival Volume", "आवक मात्रा", "आवक प्रमाण"],
    ["94% Confidence", "94% सटीकता / विश्वसनीयता", "९४% अचूकता"],
    ["Paid at Pickup", "उठान पर भुगतान", "माल उचल करताना जमा"],
    ["Reliance Fresh", "रिलायंस फ्रेश", "रिलायन्स फ्रेश"],
    ["Driver Details", "ड्राइवर का विवरण", "चालकाचा तपशील"],
    ["Escrow Receipt", "एस्क्रो रसीद", "एस्क्रो पावती"],
    ["Speed: 54 km/h", "गति: 54 किमी/घंटा", "वेग: ५४ किमी/तास"],
    ["📞 Call Driver", "📞 ड्राइवर को कॉल करें", "📞 चालकाला फोन करा"],
    ["within 2 hours", "2 घंटे के भीतर", "२ तासांच्या आत"],
    ["FPO Governance", "एफपीओ प्रबंधन", "FPO संचालक मंडळ"],
    ["fellow members", "साथी सदस्य किसान", "सहकारी सदस्य शेतकरी"],
    ["Contract Value", "अनुबंध मूल्य", "करार मूल्य"],
    ["Executive Name", "अधिकारी / निदेशक का नाम", "अधिकारी / संचालकाचे नाव"],
    ["Direct contact", "सीधा संपर्क", "थेट संपर्क"],
    ["Elected Tenure", "निर्वाचित कार्यकाल", "निवडून आलेला कार्यकाळ"],
    ["Black Urad Dal", "काला उड़द दाल", "काळी उडीद डाळ"],
    ["Agent Cut (6%)", "बिचौलिया कटौती (6%)", "आडत कपात (६%)"],
    ["List This Crop", "इस फसल को लिस्ट करें", "हे पीक नोंदवा"],
    ["FARMER PORTAL", "किसान पोर्टल", "शेतकरी पोर्टल"],
    ["List New Crop", "नई फसल जोड़ें", "+ नवीन पीक नोंदणी"],
    ["+18% vs Mandi", "मंडी से +18% अधिक", "बाजार समितीपेक्षा +१८% जास्त"],
    ["WhatsApp Desk", "व्हाट्सएप सहायता", "व्हॉट्सअ‍ॅप मदत"],
    ["Urgency Level", "प्राथमिकता / तात्कालिकता स्तर", "तातडीची पातळी"],
    ["Farm Location", "खेत का स्थान", "शेताचे ठिकाण"],
    ["Payment Terms", "भुगतान की शर्तें", "पेमेंट अटी व शर्ती"],
    ["Counter Offer", "जवाबी प्रस्ताव दें", "काऊंटर ऑफर द्या"],
    ["View Live Map", "लाइव मैप देखें", "थेट नकाशा पहा"],
    ["Calculate Now", "गणना करें", "आता मोजा"],
    ["Bids & Offers", "बोलियां और ऑफर्स", "बोली आणि ऑफर्स"],
    ["Average Price", "औसत मूल्य / भाव", "सरासरी दर / भाव"],
    ["Enter Details", "विवरण दर्ज करें", "तपशील भरा"],
    ["1800-889-AGRI", "1800-889-AGRI", "1800-889-AGRI"],
    ["Quality Grade", "गुणवत्ता ग्रेड", "प्रत / दर्जा"],
    ["Current Price", "वर्तमान मूल्य", "चालू दर"],
    ["Mobile Number", "मोबाइल नंबर", "मोबाईल क्रमांक"],
    ["Email Address", "ईमेल पता", "ईमेल पत्ता"],
    ["Perishability", "नाशवानता", "नाशवंतता"],
    ["Grains/Stable", "अनाज / स्थिर", "धान्य / टिकणारे"],
    ["Instant Match", "तत्काल मिलान", "तात्काळ जुळवणी"],
    ["RATE (PER KG)", "भाव (प्रति किलो)", "दर (प्रति किलो)"],
    ["RATE (PER QT)", "भाव (प्रति क्विंटल)", "दर (प्रति क्विंटल)"],
    ["Today's Rate:", "आज का भाव:", "आजचा दर:"],
    ["7-Day Target:", "7-दिवसीय लक्ष्य:", "७ दिवसांचे उद्दिष्ट:"],
    ["MARKET ADVICE", "मंडी सलाह", "बाजार सल्ला"],
    ["DELAY HARVEST", "कटाई टालें", "काढणी पुढे ढकला"],
    ["Forward Price", "भावी मूल्य", "भावी दर"],
    ["Highest Offer", "सर्वोच्च प्रस्ताव", "सर्वोच्च ऑफर"],
    ["Countered (1)", "जवाबी प्रस्ताव दिया (1)", "काऊंटर ऑफर दिली (१)"],
    ["Total Amount:", "कुल राशि:", "एकूण रक्कम:"],
    ["Confirm Order", "ऑर्डर की पुष्टि करें", "ऑर्डर निश्चित करा"],
    ["View Contract", "अनुबंध देखें", "करार पहा"],
    ["GPS Telemetry", "जीपीएस टेलीमेट्री", "GPS ट्रॅकिंग"],
    ["Payout Status", "भुगतान स्थिति", "पेमेंट स्थिती"],
    ["Profit Margin", "लाभ मार्जिन", "नफा प्रमाण"],
    ["Pool Progress", "पूल प्रगति", "पूल प्रगती"],
    ["Companies Act", "कंपनी अधिनियम", "कंपनी कायदा"],
    ["Dispatch Date", "प्रेषण की तारीख", "रवाना दिनांक"],
    ["Mandi Cluster", "मंडी संकुल", "बाजार समिती संकुल"],
    ["Voting Rights", "मतदान अधिकार", "मतदान हक्क"],
    ["Weighing Fee:", "तुलाई शुल्क:", "तोलाई / वजन शुल्क:"],
    ["+18% vs APMC", "मंडी से +18% अधिक", "बाजार समितीपेक्षा +१८% जास्त"],
    ["Under Review", "समीक्षाधीन", "चौकशी सुरू"],
    ["All Claims (", "सभी दावे (", "सर्व तक्रारी ("],
    ["✅ Resolved (", "✅ निस्तारित (", "✅ निवारण झालेले ("],
    ["All Statuses", "सभी स्थितियां", "सर्व स्थिती"],
    ["Harvest Date", "कटाई की तारीख", "कापणीची तारीख"],
    ["Storage Type", "भंडारण का प्रकार", "साठवणूक प्रकार"],
    ["Edit Listing", "लिस्टिंग संपादित करें", "नोंदणी बदला"],
    ["Withdraw Lot", "लॉट वापस लें", "लॉट मागे घ्या"],
    ["Select Crop:", "फसल चुनें:", "पीक निवडा:"],
    ["Ramesh Patel", "रमेश पटेल", "रमेश पटेल"],
    ["Ramesh Patil", "रमेश पाटिल", "रमेश पाटील"],
    ["Direct Trade", "सीधा व्यापार", "थेट व्यापार"],
    ["Intermediary", "बिचौलिया", "मध्यस्थ"],
    ["Green Chilli", "हरी मिर्च", "हिरवी मिरची"],
    ["Update Rates", "दर अपडेट करें", "दर अपडेट करा"],
    ["price offers", "मूल्य प्रस्ताव", "दर ऑफर्स"],
    ["your produce", "आपकी फसल", "आपला शेतमाल"],
    ["KYC Verified", "केवाईसी सत्यापित", "KYC प्रमाणित"],
    ["KYC Identity", "केवाईसी पहचान", "KYC ओळख"],
    ["Bank Account", "बैंक खाता", "बँक खाते"],
    ["to broadcast", "ब्रॉडकास्ट करने के लिए", "प्रसारित करण्यासाठी"],
    ["are expected", "अपेक्षित हैं", "अपेक्षित आहेत"],
    ["Save Profile", "प्रोफाइल सहेजें", "माहिती जतन करा"],
    ["Verification", "सत्यापन", "पडताळणी"],
    ["24H ARRIVALS", "24 घंटे की आवक", "२४ तासांची आवक"],
    ["Today's Rate", "आज का भाव", "आजचा दर"],
    ["7-Day Target", "7-दिवसीय लक्ष्य", "७ दिवसांचे उद्दिष्ट"],
    ["Actual Price", "वास्तविक मूल्य", "प्रत्यक्ष भाव"],
    ["FREIGHT COST", "परिवहन भाड़ा खर्च", "वाहतूक खर्च"],
    ["Accepted (1)", "स्वीकृत (1)", "स्वीकृत (१)"],
    ["Accept Offer", "प्रस्ताव स्वीकारें", "ऑफर स्वीकारा"],
    ["Reject Offer", "प्रस्ताव अस्वीकार करें", "ऑफर नाकारा"],
    ["Send Counter", "जवाबी प्रस्ताव भेजें", "काऊंटर ऑफर पाठवा"],
    ["Confirmation", "पुष्टि", "खात्री"],
    ["Extra Income", "अतिरिक्त आय", "जास्तीचे उत्पन्न"],
    ["Paid to Date", "अब तक प्राप्त", "आतापर्यंत जमा"],
    ["Surat-Mumbai", "सूरत-मुंबई", "सुरत-मुंबई"],
    ["Destination:", "गंतव्य:", "पोहचण्याचे ठिकाण:"],
    ["Download PDF", "पीडीएफ डाउनलोड करें", "PDF डाउनलोड करा"],
    ["e-NAM Mandis", "ई-नाम मंडियां", "e-NAM बाजार समित्या"],
    ["Beneficiary:", "लाभार्थी:", "लाभार्थी:"],
    ["Save Receipt", "रसीद सहेजें", "पावती जतन करा"],
    ["Committed to", "में शामिल", "मधे जमा"],
    ["Contribution", "योगदान", "योगदान"],
    ["Total Payout", "कुल भुगतान", "एकूण रक्कम"],
    ["Batch Volume", "बैच मात्रा", "बॅच प्रमाण"],
    ["Pooled Batch", "एकत्रित बैच", "एकत्रित बॅच"],
    ["Coordinators", "समन्वयक", "समन्वयक"],
    ["Direct Phone", "सीधा फोन नंबर", "थेट फोन नंबर"],
    ["Medium Truck", "मध्यम ट्रक", "मध्यम ट्रक"],
    ["CASH IN HAND", "हाथ में नकद", "हातात मिळणारी रोख रक्कम"],
    ["bank account", "बैंक खाता", "बँक खाते"],
    ["Loading Fee:", "हमाली / लदाई शुल्क:", "हमाली / तोलाई शुल्क:"],
    ["Weighing Fee", "तुलाई शुल्क", "तोलाई / वजन शुल्क"],
    ["Active Bids", "सक्रिय बोलियां", "सक्रिय बोली"],
    ["24-Hour SLA", "24 घंटे का SLA", "२४ तासांची हमी"],
    ["Active Lots", "सक्रिय लॉट", "सक्रिय लॉट्स"],
    ["Under Offer", "प्रस्ताव प्राप्त", "प्रस्ताव सुरू"],
    ["Highest Bid", "सर्वोच्च बोली", "सर्वोच्च बोली"],
    ["Total Value", "कुल मूल्य", "एकूण मूल्य"],
    ["Driver Name", "ड्राइवर का नाम", "चालकाचे नाव"],
    ["Discrepancy", "अंतर", "तफावत"],
    ["Weighbridge", "धर्मकांटा", "वजन काटा"],
    ["Explanation", "विवरण", "स्पष्टीकरण"],
    ["Consignment", "खेप / कंसाइनमेंट", "शेतमाल माल"],
    ["Add New Lot", "नया लॉट जोड़ें", "+ नवीन लॉट जोडा"],
    ["NABARD Reg:", "नाबार्ड पंजी:", "नाबार्ड नोंदणी:"],
    ["Bulk Orders", "थोक ऑर्डर", "संस्थात्मक ऑर्डर्स"],
    ["data.gov.in", "data.gov.in", "data.gov.in"],
    ["Total Stock", "कुल स्टॉक", "एकूण साठा"],
    ["Commitments", "प्रतिबद्धताएं", "नोंदणी"],
    ["7 Day Trend", "7 दिनों का रुझान", "७ दिवसांचा कल"],
    ["Smallholder", "लघु / सीमांत", "अल्पभूधारक"],
    ["Landholding", "कृषि जोत", "शेतजमीन"],
    ["Volume (Qt)", "मात्रा (क्विंटल)", "प्रमाण (क्विंटल)"],
    ["Mandi Rates", "मंडी भाव", "बाजार भाव"],
    ["Solid Green", "ठोस हरा", "हिरवी रेघ"],
    ["Dashed Blue", "डैश नीला", "निळी तुटक रेघ"],
    ["CHANGE (1W)", "बदलाव (1 सप्ताह)", "बदल (१ आठवडा)"],
    ["TREND SPARK", "रुझान ग्राफ", "भाव कल आलेख"],
    ["BEST OPTION", "सर्वोत्तम विकल्प", "उत्कृष्ट पर्याय"],
    ["Projections", "अनुमान", "अंदाज"],
    ["Gate Passes", "गेट पास", "गेट पासेस"],
    ["On The Road", "मार्ग में", "मार्गावर"],
    ["Cooperative", "सहकारी", "सहकारी"],
    ["VERIFIED QR", "सत्यापित क्यूआर कोड", "प्रमाणित QR कोड"],
    ["Call Driver", "ड्राइवर को कॉल करें", "चालकाला फोन करा"],
    ["Destination", "गंतव्य", "पोहचण्याचे ठिकाण"],
    ["Certificate", "प्रमाणपत्र", "प्रमाणपत्र"],
    ["Beneficiary", "लाभार्थी", "लाभार्थी"],
    ["Commit Lots", "लॉट जोड़ें", "लॉट्स जोडा"],
    ["Fulfillment", "पूर्ति / पूर्तता", "पूर्तता"],
    ["Coordinator", "समन्वयक", "समन्वयक"],
    ["Designation", "पद", "पद"],
    ["information", "जानकारी", "माहिती"],
    ["Shareholder", "शेयरधारक", "भागधारक"],
    ["Bengal Gram", "चना", "हरभरा / चणा"],
    ["Small Truck", "छोटा ट्रक (पिकअप)", "छोटा ट्रक"],
    ["Heavy Truck", "बड़ा भारी ट्रक", "मोठा अवजड ट्रक"],
    ["Large Truck", "बड़ा ट्रक", "मोठा ट्रक"],
    ["Loading Fee", "हमाली / लदाई शुल्क", "हमाली / तोलाई शुल्क"],
    ["Mandi Cess:", "मंडी उपकर:", "बाजार समिती सेस:"],
    ["on Delivery", "डिलीवरी पर", "पोहोचल्यावर"],
    ["In transit", "मार्ग में", "मार्गावर"],
    ["Manage Lot", "लॉट प्रबंधित करें", "लॉट पहा"],
    ["Accept Bid", "बोली स्वीकारें", "बोली स्वीकारा"],
    ["Base Price", "आधार मूल्य", "मूळ आधार दर"],
    ["APMC Mandi", "एपीएमसी मंडी", "बाजार समिती"],
    ["Reject Bid", "बोली अस्वीकार करें", "बोली नाकारा"],
    ["Ahmednagar", "अहमदनगर", "अहमदनगर"],
    ["Collective", "सामूहिक", "सामूहिक"],
    ["Calculator", "कैलकुलेटर", "गणक"],
    ["Resolution", "निवारण", "निवारण"],
    ["Protection", "संरक्षण", "संरक्षण"],
    ["Commission", "कमीशन / आढ़त", "कमिशन / आडत"],
    ["Commitment", "प्रतिबद्धता", "हमी"],
    ["Government", "सरकारी", "शासकीय"],
    ["FARM-88210", "FARM-88210", "FARM-88210"],
    ["LOT-TOM-01", "LOT-TOM-01", "LOT-TOM-01"],
    ["LOT-ONI-02", "LOT-ONI-02", "LOT-ONI-02"],
    ["LOT-POT-03", "LOT-POT-03", "LOT-POT-03"],
    ["LOT-CHI-05", "LOT-CHI-05", "LOT-CHI-05"],
    ["Categories", "श्रेणियां", "वर्गवारी"],
    ["Cash Crops", "नकदी फसलें", "नगदी पिके"],
    ["Bulk Order", "थोक ऑर्डर", "संस्थात्मक ऑर्डर"],
    ["Processors", "प्रोसेसर्स", "प्रक्रिया उद्योग"],
    ["(Expected)", "(अपेक्षित)", "(अपेक्षित)"],
    ["Processing", "प्रसंस्करण", "प्रक्रिया"],
    ["Dispatches", "प्रेषण / गाड़ियां", "गाड्या"],
    ["Cultivated", "उगाई जाने वाली", "उत्पादित"],
    ["perishable", "जल्दी खराब होने वाली (नाशवान)", "नाशवंत"],
    ["shelf life", "खराब होने की अवधि", "टिकाऊ कालावधी"],
    ["on any lot", "किसी भी लॉट पर", "कोणत्याही लॉटवर"],
    ["Shelf Life", "शेल्फ लाइफ / टिकाऊपन", "टिकाऊ कालावधी"],
    ["Industrial", "औद्योगिक", "औद्योगिक"],
    ["Perishable", "नाशवान", "नाशवंत"],
    ["Mandi Yard", "मंडी यार्ड", "बाजार समिती यार्ड"],
    ["Confidence", "सटीकता / विश्वास", "अचूकता"],
    ["MODAL RATE", "मॉडल दर", "सरासरी दर"],
    ["NET SPREAD", "शुद्ध अंतर", "निव्वळ फरक"],
    ["Tightening", "कम होती", "घटती"],
    ["Your Price", "आपका मूल्य", "आपला दर"],
    ["Over Mandi", "मंडी से अधिक", "बाजार समितीपेक्षा जास्त"],
    ["in Transit", "मार्ग में", "वाहतुकीत"],
    ["Aggregated", "एकत्रित", "एकत्रित"],
    ["Net Profit", "शुद्ध लाभ", "निव्वळ नफा"],
    ["Checkposts", "चेकपोस्ट / नाके", "तपासणी नाके"],
    ["acceptance", "स्वीकृति", "स्वीकृती"],
    ["Governance", "प्रबंधन / संचालन", "प्रशासन / संचालन"],
    ["Enterprise", "कॉर्पोरेट / संस्थात्मक", "संस्थात्मक"],
    ["Desi Chana", "देसी चना", "देशी हरभरा"],
    ["Green Mung", "हरा मूंग", "हिरवा मूग"],
    ["Multi-Axle", "मल्टी-एक्सल", "मल्टि-अ‍ॅक्सल"],
    ["more money", "अधिक आय / पैसे", "जास्त उत्पन्न"],
    ["Wada Kolam", "वाडा कोलम", "वाडा कोलम"],
    ["Agent Cut:", "आढ़तिया कटौती:", "आडत कपात:"],
    ["Agent Fee:", "आढ़त / एजेंट शुल्क:", "आडत / दलाली शुल्क:"],
    ["Mandi Cess", "मंडी उपकर", "बाजार समिती सेस"],
    ["(Accurate)", "(सटीक / बिना कटौती)", "(अचूक / कपात नाही)"],
    ["View Bids", "बोलियां देखें", "बोली पहा"],
    ["Sold Lots", "बिक चुकी फसलें", "विक्री झालेले"],
    ["All Crops", "सभी फसलें", "सर्व पिके"],
    ["Lasalgaon", "लासलगांव", "लासलगाव"],
    ["Nandurbar", "नंदुरबार", "नंदुरबार"],
    ["Dashboard", "डैशबोर्ड", "डॅशबोर्ड"],
    ["Shipments", "शिपमेंट", "वाहतूक"],
    ["Redressal", "निवारण", "निवारण"],
    ["Mandatory", "अनिवार्य", "बंधनकारक"],
    ["Logistics", "लॉजिस्टिक्स", "वाहतूक"],
    ["Telemetry", "टेलीमेट्री", "ट्रॅकिंग"],
    ["Immediate", "तत्काल", "तात्काळ"],
    ["Protected", "सुरक्षित", "सुरक्षित"],
    ["Guarantee", "गारंटी", "हमी"],
    ["Ombudsman", "लोकपाल", "लोकपाल"],
    ["Vegetable", "सब्जी", "भाजीपाला"],
    ["Transport", "परिवहन", "वाहतूक"],
    ["Agmarknet", "एगमार्कनेट", "अ‍ॅगमार्कनेट"],
    ["↻ Refresh", "↻ रिफ्रेश", "↻ रिफ्रेश"],
    ["HDFC Bank", "एचडीएफसी बैंक", "HDFC बँक"],
    ["Emergency", "आपातकालीन", "तातडीची"],
    ["Rameshwar", "रामेश्वर", "रामेश्वर"],
    ["Breakeven", "वसूली मूल्य", "आधार भाव"],
    ["this week", "इस सप्ताह", "या आठवड्यात"],
    ["2 On Road", "2 मार्ग में", "२ मार्गावर"],
    ["Crop Name", "फसल का नाम", "पिकाचे नाव"],
    ["Certified", "प्रमाणित", "प्रमाणित"],
    ["Full Name", "पूरा नाम", "पूर्ण नाव"],
    ["Wholesale", "थोक", "घाऊक"],
    ["terminals", "टर्मिनल / मंडियां", "बाजार आवारे"],
    ["over next", "अगले", "पुढील"],
    ["Benchmark", "मानक संदर्भ", "मानक संदर्भ"],
    ["ARBITRAGE", "मुनाफा अंतर", "थेट नफा"],
    ["Projected", "अनुमानित", "अंदाजित"],
    ["Countered", "जवाबी प्रस्ताव", "काऊंटर ऑफर"],
    ["Gate Pass", "गेट पास", "गेट पास"],
    ["Scheduled", "निर्धारित", "नियोजित"],
    ["Checkpost", "चेकपोस्ट", "तपासणी नाका"],
    ["Valid for", "के लिए मान्य", "साठी वैध"],
    ["Truck No:", "ट्रक क्रमांक:", "ट्रक क्रमांक:"],
    ["Committed", "प्रतिबद्ध / शामिल", "नोंदणीकृत"],
    ["currently", "वर्तमान में", "सध्या"],
    ["Fulfilled", "पूर्ण किया गया", "पूर्ण झालेले"],
    ["Executive", "कार्यकारी / अधिकारी", "कार्यकारी"],
    ["Secretary", "सचिव", "सचिव"],
    ["Treasurer", "कोषाध्यक्ष", "खजिनदार"],
    ["Arhar Dal", "अरहर दाल", "तूर डाळ"],
    ["Sunflower", "सूरजमुखी", "सूर्यफूल"],
    ["Sugarcane", "गन्ना", "ऊस"],
    ["Agent Cut", "आढ़तिया कटौती", "आडत कपात"],
    ["Agent Fee", "आढ़त शुल्क", "आडत शुल्क"],
    ["This Crop", "यह फसल", "हे पीक"],
    ["at Pickup", "उठान पर", "उचल करताना"],
    ["Quantity", "मात्रा", "प्रमाण"],
    ["24 Hours", "24 घंटे", "२४ तास"],
    ["All Bids", "सभी बोलियां", "सर्व बोली"],
    ["Kolhapur", "कोल्हापुर", "कोल्हापूर"],
    ["Amravati", "अमरावती", "अमरावती"],
    ["Producer", "उत्पादक", "उत्पादक"],
    ["Tracking", "ट्रैकिंग", "ट्रॅकिंग"],
    ["Tomorrow", "कल (आने वाला)", "उद्या"],
    ["Resolved", "निस्तारित", "निवारण"],
    ["Category", "श्रेणी", "प्रकार"],
    ["Critical", "गंभीर", "अति-गंभीर"],
    ["Timeline", "समय-सीमा", "कालमर्यादा"],
    ["Contract", "अनुबंध", "करार"],
    ["Detailed", "विस्तृत", "सविस्तर"],
    ["Kilogram", "किलो", "किलो"],
    ["Reliance", "रिलायंस", "रिलायन्स"],
    ["Listings", "लिस्टिंग", "नोंदी"],
    ["Eligible", "पात्र", "पात्र"],
    ["Delivery", "डिलीवरी", "पोहोच"],
    ["Payments", "भुगतान", "पेमेंट"],
    ["Compared", "तुलना में", "तुलनेत"],
    ["View All", "सभी देखें", "सर्व पहा"],
    ["Caterers", "कैटरर्स", "कॅटरर्स"],
    ["Protocol", "प्रोटोकॉल / प्रणाली", "प्रणाली"],
    ["Recovery", "प्राप्ति / वसूली", "रक्कम प्राप्ती"],
    ["Expected", "अपेक्षित", "अपेक्षित"],
    ["Standard", "मानक", "साधारण"],
    ["Location", "स्थान", "ठिकाण"],
    ["PM-KISAN", "पीएम-किसान", "PM-किसान"],
    ["Tomatoes", "टमाटर", "टोमॅटो"],
    ["Chillies", "मिर्च", "मिरची"],
    ["Forecast", "पूर्वानुमान", "भाकीत"],
    ["Insights", "अंतर्दृष्टि", "विश्लेषण"],
    ["forecast", "पूर्वानुमान", "अंदाज"],
    ["positive", "सकारात्मक", "सकारात्मक"],
    ["arrivals", "आवक", "आवक"],
    ["Identity", "पहचान", "ओळख"],
    ["₹ per kg", "₹ प्रति किलो", "₹ प्रति किलो"],
    ["Official", "आधिकारिक", "अधिकृत"],
    ["Demanded", "मांग वाली", "मागणी असलेला"],
    ["increase", "बढ़ोतरी", "वाढ"],
    ["decrease", "गिरावट", "घट"],
    ["terminal", "टर्मिनल", "बाजार आवार"],
    ["National", "राष्ट्रीय", "राष्ट्रीय"],
    ["ARRIVALS", "आवक", "आवक"],
    ["FORECAST", "पूर्वानुमान", "भाकीत"],
    ["DISTANCE", "दूरी", "अंतर"],
    ["Accepted", "स्वीकृत", "मंजूर"],
    ["Advance:", "अग्रिम:", "आगाऊ:"],
    ["Balance:", "शेष:", "शिल्लक:"],
    ["Optional", "वैकल्पिक", "ऐच्छिक"],
    ["The Road", "सड़क / मार्ग", "मार्ग"],
    ["Released", "जारी किया गया", "जमा झाले"],
    ["VERIFIED", "सत्यापित", "प्रमाणित"],
    ["Truck No", "ट्रक क्रमांक", "ट्रक क्रमांक"],
    ["Download", "डाउनलोड करें", "डाउनलोड करा"],
    ["directly", "सीधे", "थेट"],
    ["via IMPS", "आईएमपीएस (IMPS) द्वारा", "IMPS द्वारे"],
    ["Contacts", "संपर्क", "संपर्क"],
    ["Progress", "प्रगति", "प्रगती"],
    ["Batch ID", "बैच आईडी", "बॅच आयडी"],
    ["Director", "निदेशक / संचालक", "संचालक"],
    ["Chairman", "अध्यक्ष", "अध्यक्ष"],
    ["Rajapuri", "राजापुरी", "राजापुरी"],
    ["Thompson", "थॉमसन", "थॉम्पसन"],
    ["Urad Dal", "उड़द दाल", "उडीद डाळ"],
    ["High-Oil", "उच्च-तेल", "जास्त तेल"],
    ["Oilseeds", "तिलहन", "गळीतधान्य / तेलबिया"],
    ["Co 86032", "को 86032", "को ८६०३२"],
    ["Distance", "दूरी", "अंतर"],
    ["You earn", "आप कमाते हैं", "आपण मिळवता"],
    ["Weighing", "तुलाई / वजन", "तोलाई"],
    ["Accurate", "सटीक", "अचूक"],
    ["Pooled:", "एकत्रित:", "एकत्रित:"],
    ["Actions", "कार्रवाई", "कृती"],
    ["AgriNex", "AgriNex", "AgriNex"],
    ["Jalgaon", "जलगांव", "जळगाव"],
    ["Solapur", "सोलापूर", "सोलापूर"],
    ["FPO Hub", "एफपीओ हब", "FPO हब"],
    ["Support", "सहायता", "मदत"],
    ["Payment", "भुगतान", "पेमेंट"],
    ["Advance", "अग्रिम", "आगाऊ"],
    ["Dispute", "विवाद", "वाद"],
    ["Subject", "विषय", "विषय"],
    ["Inquiry", "पूछताछ", "चौकशी"],
    ["Urgency", "तात्कालिकता", "तातडी"],
    ["Officer", "अधिकारी", "अधिकारी"],
    ["Settled", "भुगतान संपन्न / जमा", "रक्कम जमा"],
    ["Related", "संबंधित", "संबंधित"],
    ["General", "सामान्य", "सर्वसाधारण"],
    ["Quintal", "क्विंटल", "क्विंटल"],
    ["&times;", "&times;", "&times;"],
    ["Produce", "उत्पाद / फसल", "शेतमाल"],
    ["Listing", "लिस्टिंग", "नोंद"],
    ["Charges", "शुल्क / खर्च", "खर्च"],
    ["0% Middlemen Cut", "0% बिचौलिया कटौती", "०% दलाली कपात"],
    ["Direct farm-to-buyer sales", "खेत से सीधे खरीदार को बिक्री", "थेट शेतातून खरेदीदारास विक्री"],
    ["100% Escrow Protected", "100% एस्क्रो द्वारा सुरक्षित", "१००% एस्क्रो सुरक्षित"],
    ["Advance locked before dispatch", "गाड़ी रवानगी से पहले अग्रिम राशि सुरक्षित", "गाडी निघण्यापूर्वी आगाऊ रक्कम जमा"],
    ["APMC Mandi Premium", "एपीएमसी मंडी से बेहतर भाव", "APMC बाजार समितीपेक्षा जास्त दर"],
    ["Real-time wholesale benchmark", "थोक भावों की लाइव तुलना", "घाऊक बाजाराशी थेट तुलना"],
    ["Instant UPI / NEFT Payout", "त्वरित यूपीआई / एनईएफटी भुगतान", "त्वरित UPI / NEFT बँक खात्यात"],
    ["Direct to your bank account", "सीधे आपके बैंक खाते में", "थेट आपल्या बँक खात्यात"],
    ["Seller Commerce Actions:", "विक्रेता व्यापार विकल्प:", "शेतकरी विक्री पर्याय:"],
    ["List Fresh Harvest Lot", "नया फसल लॉट जोड़ें", "नवीन शेतमाल लॉट जोडा"],
    ["Live Mandi Benchmark", "लाइव मंडी भाव तुलना", "थेट बाजार भाव तुलना"],
    ["Book GPS Farm Pickup", "जीपीएस वाहन बुक करें", "GPS शेतमाल वाहन बुक करा"],
    ["FPO Bulk Pool", "एफपीओ सामूहिक पूल", "FPO गट विक्री"],
    ["Instant Salvage Liquidation", "त्वरित आपातकालीन निकासी", "तातडीची शेतमाल विक्री"],
    ["Updates", "अपडेट्स", "अपडेट्स"],
    ["Balance", "शेष राशि", "शिल्लक"],
    ["Central", "केंद्रीय / मुख्य", "मध्यवर्ती"],
    ["Salvage", "त्वरित बिक्री", "तातडीची विक्री"],
    ["Cereals", "खाद्यान्न", "अन्नधान्य"],
    ["Legumes", "दलहन", "कडधान्ये"],
    ["Average", "औसत", "सरासरी"],
    ["Refresh", "रिफ्रेश", "रिफ्रेश"],
    ["Details", "विवरण", "तपशील"],
    ["Quality", "गुणवत्ता", "प्रत / दर्जा"],
    ["On Road", "मार्ग में", "मार्गावर"],
    ["Premium", "प्रीमियम / उत्कृष्ट", "उत्कृष्ट / प्रीमियम"],
    ["Publish", "प्रकाशित करें", "प्रकाशित करा"],
    ["Address", "पता", "पत्ता"],
    ["Primary", "प्राथमिक / मुख्य", "मुख्य"],
    ["Account", "खाता", "खाते"],
    ["Enabled", "सक्षम / चालू", "सुरू"],
    ["nearing", "निकट", "जवळ आलेले"],
    ["Current", "वर्तमान", "चालू"],
    ["Variety", "किस्म", "वाण"],
    ["Harvest", "कटाई", "कापणी"],
    ["Instant", "तत्काल", "तात्काळ"],
    ["Falling", "गिरावट पर", "घटत आहे"],
    ["Changes", "बदलाव", "बदल"],
    ["Profile", "प्रोफाइल", "माहिती"],
    ["PRODUCE", "फसल", "शेतमाल"],
    ["Target:", "लक्ष्य:", "उद्दिष्ट:"],
    ["Arrival", "आवक", "आवक"],
    ["Signals", "संकेत", "संकेत"],
    ["forward", "अग्रिम / भावी", "भावी"],
    ["HARVEST", "कटाई", "काढणी"],
    ["FREIGHT", "भाड़ा / परिवहन", "वाहतूक भाडे"],
    ["ACTIONS", "कार्रवाइयां", "कृती"],
    ["Highest", "सर्वोच्च", "सर्वोच्च"],
    ["Options", "विकल्प", "पर्याय"],
    ["Amount:", "राशि:", "रक्कम:"],
    ["Message", "संदेश", "संदेश"],
    ["Counter", "जवाबी प्रस्ताव", "काऊंटर"],
    ["Success", "सफल", "यशस्वी"],
    ["Digital", "डिजिटल", "डिजिटल"],
    ["Transit", "परिवहन / मार्ग", "वाहतूक"],
    ["Confirm", "पुष्टि करें", "निश्चित करा"],
    ["Release", "जारी करें", "जमा करा"],
    ["Driver:", "ड्राइवर:", "चालक:"],
    ["Step 1:", "चरण 1:", "टप्पा १:"],
    ["Step 2:", "चरण 2:", "टप्पा २:"],
    ["In Bank", "बैंक में जमा", "बँकेत जमा"],
    ["Highway", "राजमार्ग / हाईवे", "महामार्ग"],
    ["Receipt", "रसीद", "पावती"],
    ["members", "सदस्य", "सदस्य"],
    ["On-Time", "समय पर", "वेळेवर"],
    ["Batches", "बैच", "बॅचेस"],
    ["batches", "बैच", "बॅचेस"],
    ["Carrier", "परिवहन वाहक", "वाहतूकदार / कॅरियर"],
    ["Village", "गांव / ग्राम", "गाव"],
    ["Cluster", "संकुल / समूह", "संकुल"],
    ["Elected", "निर्वाचित / निर्वाचित", "निवडलेले"],
    ["Oilseed", "तिलहन", "गळीतधान्य / तेलबिया"],
    ["Vehicle", "वाहन", "गाडी"],
    ["Loading", "लदाई / हमाली", "हमाली"],
    ["settled", "भुगतान संपन्न", "रक्कम जमा"],
    ["Filled", "पूर्ण हुआ", "भरले"],
    ["Status", "स्थिति", "स्थिती"],
    ["Action", "कार्रवाई", "कृती"],
    ["Cancel", "रद्द करें", "रद्द करा"],
    ["Lot ID", "लॉट आईडी", "लॉट आयडी"],
    ["Nashik", "नासिक", "नाशिक"],
    ["Nagpur", "नागपुर", "नागपूर"],
    ["Sangli", "सांगली", "सांगली"],
    ["Nanded", "नांदेड", "नांदेड"],
    ["Satara", "सातारा", "सातारा"],
    ["Escrow", "एस्क्रो", "एस्क्रो"],
    ["Direct", "सीधा", "थेट"],
    ["Better", "बेहतर", "उत्तम"],
    ["Offers", "प्रस्ताव", "ऑफर्स"],
    ["Orders", "ऑर्डर्स", "ऑर्डर्स"],
    ["Module", "मॉड्यूल", "विभाग"],
    ["Portal", "पोर्टल", "पोर्टल"],
    ["Farmer", "किसान", "शेतकरी"],
    ["Claims", "दावे", "तक्रारी"],
    ["Review", "समीक्षा", "तपासणी"],
    ["Pickup", "उठान", "उचल"],
    ["Freeze", "रोकें", "स्थगित करा"],
    ["Needed", "आवश्यक", "गरजेचे"],
    ["Medium", "मध्यम", "मध्यम"],
    ["Submit", "जमा करें", "सादर करा"],
    ["Active", "सक्रिय", "सक्रिय"],
    ["Weight", "वजन", "वजन"],
    ["Tomato", "टमाटर", "टोमॅटो"],
    ["Potato", "आलू", "बटाटा"],
    ["Chilli", "मिर्च", "मिरची"],
    ["Yellow", "पीला", "पिवळा"],
    ["Balaji", "बालाजी", "बालाजी"],
    ["Update", "अपडेट", "अपडेट"],
    ["Member", "सदस्य", "सदस्य"],
    ["Synced", "सिंक किया गया", "अपडेट झाले"],
    ["NABARD", "नाबार्ड", "नाबार्ड"],
    ["Listed", "सूचीबद्ध", "नोंदणीकृत"],
    ["Ramesh", "रमेश", "रमेश"],
    ["Select", "चुनें", "निवडा"],
    ["Export", "निर्यात", "निर्यात"],
    ["Retail", "खुदरा", "किरकोळ"],
    ["Market", "मंडी / बाजार", "बाजार"],
    ["Linked", "संबद्ध / लिंक", "लिंक"],
    ["Region", "क्षेत्र / इलाका", "विभाग / परिसर"],
    ["prices", "कीमतें / भाव", "दर / भाव"],
    ["Number", "नंबर / क्रमांक", "क्रमांक"],
    ["Payout", "भुगतान", "पेमेंट"],
    ["per kg", "प्रति किलो", "प्रति किलो"],
    ["Rising", "बढ़त", "वाढ"],
    ["Stable", "स्थिर", "स्थिर"],
    ["Volume", "मात्रा", "प्रमाण"],
    ["Target", "लक्ष्य", "उद्दिष्ट"],
    ["Dashed", "डैश युक्त", "तुटक"],
    ["Actual", "वास्तविक", "प्रत्यक्ष"],
    ["likely", "संभावित", "शक्यता"],
    ["Across", "भर में", "भर"],
    ["Signal", "संकेत", "संकेत"],
    ["simple", "सरल", "सोपे"],
    ["trends", "रुझान", "कल"],
    ["SPREAD", "अंतर / फैलाव", "फरक"],
    ["ACTION", "कार्रवाई", "कृती"],
    ["Lowest", "न्यूनतम", "किमान"],
    ["Option", "विकल्प", "पर्याय"],
    ["Advice", "सलाह", "सल्ला"],
    ["Change", "बदलाव", "बदल"],
    ["Due to", "के कारण", "च्या कारणाने"],
    ["Passes", "पास", "पासेस"],
    ["Income", "आय / कमाई", "उत्पन्न"],
    ["Margin", "मार्जिन", "प्रमाण"],
    ["Driver", "ड्राइवर", "चालक"],
    ["Mumbai", "मुंबई", "मुंबई"],
    ["Speed:", "गति / रफ्तार:", "वेग:"],
    ["fellow", "साथी", "सहकारी"],
    ["Commit", "प्रतिबद्ध / जोड़ें", "जोडा"],
    ["Tenure", "कार्यकाल / अवधि", "कार्यकाळ"],
    ["JS 335", "जेएस 335", "जेएस ३३५"],
    ["JS-335", "जेएस-335", "जेएस-३३५"],
    ["Share:", "हिस्सा:", "हिस्सा:"],
    ["(Free)", "(निःशुल्क / फ्री)", "(मोफत)"],
    ["Grade", "ग्रेड / गुणवत्ता", "प्रत / दर्जा"],
    ["Latur", "लातूर", "लातूर"],
    ["Akola", "अकोला", "अकोला"],
    ["Dhule", "धुले", "धुळे"],
    ["Trade", "व्यापार", "व्यापार"],
    ["Crops", "फसलें", "पिके"],
    ["Hours", "घंटे", "तास"],
    ["Delay", "देरी", "उशीर"],
    ["Issue", "मुद्दा / समस्या", "समस्या"],
    ["Level", "स्तर", "पातळी"],
    ["Query", "प्रश्न", "चौकशी"],
    ["Close", "बंद करें", "बंद करा"],
    ["Under", "के तहत", "खालील"],
    ["Total", "कुल", "एकूण"],
    ["Lodge", "दर्ज करें", "नोंदवा"],
    ["Mandi", "मंडी", "बाजार समिती"],
    ["Truck", "ट्रक", "ट्रक"],
    ["Gross", "सकल", "एकूण"],
    ["Other", "अन्य", "इतर"],
    ["Onion", "प्याज", "कांदा"],
    ["Green", "हरा", "हिरवा"],
    ["White", "सफेद", "पांढरा"],
    ["Black", "काला", "काळा"],
    ["Grain", "अनाज", "धान्य"],
    ["Pulse", "दाल", "कडधान्य"],
    ["Spice", "मसाला", "मसाले"],
    ["Fruit", "फल", "फळे"],
    ["Tonne", "टन", "टन"],
    ["Daily", "दैनिक", "रोजचे"],
    ["Track", "ट्रैक करें", "ट्रॅक करा"],
    ["Money", "पैसे / आय", "उत्पन्न"],
    ["Local", "स्थानीय", "स्थानिक"],
    ["NAFPO", "एनएएफपीओ", "NAFPO"],
    ["Rates", "दर / भाव", "दर"],
    ["Enter", "दर्ज करें", "भरा"],
    ["Order", "ऑर्डर", "ऑर्डर"],
    ["Offer", "प्रस्ताव", "ऑफर"],
    ["Price", "मूल्य / भाव", "दर / भाव"],
    ["Today", "आज", "आज"],
    ["Buyer", "खरीदार", "खरेदीदार"],
    ["Patil", "पाटिल", "पाटील"],
    ["Ready", "तैयार", "सज्ज"],
    ["Floor", "न्यूनतम", "किमान आधार"],
    ["Table", "तालिका दृश्य", "तक्ता"],
    ["Stock", "स्टॉक", "साठा"],
    ["Email", "ईमेल", "ईमेल"],
    ["Acres", "एकड़", "एकर"],
    ["IFSC:", "आईएफएससी कोड:", "IFSC कोड:"],
    ["shelf", "शेल्फ", "साठवणूक"],
    ["Click", "क्लिक करें", "क्लिक करा"],
    ["Trend", "रुझान", "कल"],
    ["today", "आज", "आज"],
    ["Match", "मिलान", "जुळवणी"],
    ["Clear", "स्पष्ट", "स्पष्ट"],
    ["GRADE", "ग्रेड", "प्रत"],
    ["Unit:", "इकाई:", "एकक:"],
    ["Solid", "ठोस", "ठळक"],
    ["Feeds", "डेटा", "माहिती"],
    ["feeds", "डेटा", "माहिती"],
    ["DELAY", "देरी / टालें", "पुढे ढकला"],
    ["MODAL", "मॉडल / औसत", "सरासरी"],
    ["Spark", "चार्ट", "आलेख"],
    ["Fresh", "ताजा", "ताजी / फ्रेश"],
    ["Tolls", "टोल नाके", "टोल नाके"],
    ["Valid", "मान्य / वैध", "वैध"],
    ["Surat", "सूरत", "सुरत"],
    ["Speed", "गति / रफ्तार", "वेग"],
    ["e-NAM", "ई-नाम", "e-NAM"],
    ["Nodal", "नोडल / मुख्य", "नोडल"],
    ["Batch", "बैच", "बॅच"],
    ["Phone", "फोन / संपर्क", "फोन"],
    ["Shiny", "चमकीला", "चमकदार"],
    ["Seeds", "बीज", "बियाणे"],
    ["Small", "छोटा", "लहान / छोटा"],
    ["Heavy", "भारी / बड़ा", "मोठा / अवजड"],
    ["Large", "बड़ा / भारी", "मोठा"],
    [" MORE", " अधिक लाभ", " जास्त नफा"],
    ["EXTRA", "अतिरिक्त", "जास्तीचे"],
    ["Agent", "आढ़तिया / बिचौलिया", "आडत्या / मध्यस्थ"],
    ["Share", "हिस्सा", "हिस्सा"],
    ["Min:", "न्यूनतम:", "किमान:"],
    ["Crop", "फसल", "पीक"],
    ["Pune", "पुणे", "पुणे"],
    ["Beed", "बीड", "बीड"],
    ["Lots", "लॉट", "लॉट्स"],
    ["Bids", "बोलियां", "बोली"],
    ["Desk", "डेस्क", "कक्ष"],
    ["Rule", "नियम", "नियम"],
    ["Zero", "शून्य", "शून्य"],
    ["Loss", "नुकसान", "नुकसान"],
    ["Hour", "घंटा", "तास"],
    ["Yard", "यार्ड", "यार्ड"],
    ["High", "उच्च", "उच्च"],
    ["Agri", "Agri", "Agri"],
    ["Safe", "सुरक्षित", "सुरक्षित"],
    ["Bank", "बैंक", "बँक"],
    ["Back", "वापस", "परत"],
    ["Home", "घर", "घर"],
    ["Take", "प्राप्त करें", "मिळवा"],
    ["Much", "कितना", "किती"],
    ["More", "अधिक", "जास्त"],
    ["Feed", "डेटा फीड", "डेटा फीड"],
    ["Cash", "नकदी", "नगदी"],
    ["HDFC", "एचडीएफसी", "HDFC"],
    ["Reg:", "पंजी:", "नोंदणी:"],
    ["Bulk", "थोक", "संस्थात्मक / मोठ्या प्रमाणात"],
    ["AGRI", "AGRI", "AGRI"],
    ["Sale", "बिक्री", "विक्री"],
    ["Live", "लाइव", "थेट"],
    ["View", "देखें", "पहा"],
    ["Grid", "ग्रिड दृश्य", "ग्रिड"],
    ["Road", "मार्ग", "मार्ग"],
    ["Paid", "भुगतान प्राप्त", "रक्कम जमा"],
    ["NPOP", "एनपीओपी", "NPOP"],
    ["Name", "नाम", "नाव"],
    ["Ltd.", "लिमिटेड", "लि."],
    ["IFSC", "आईएफएससी", "IFSC"],
    ["life", "आयु / अवधि", "टिकाऊ मुदत"],
    ["Next", "अगले", "पुढील"],
    ["days", "दिन", "दिवस"],
    ["down", "गिरावट", "घट"],
    ["Farm", "खेत / कृषि", "शेती"],
    ["Best", "सर्वोत्तम", "सर्वोत्तम"],
    ["Save", "सहेजें", "जतन करा"],
    ["Good", "अच्छा", "चांगले"],
    ["Time", "समय", "वेळ"],
    ["Sell", "बेचें", "विका"],
    ["Unit", "इकाई", "एकक"],
    ["Blue", "नीला", "निळा"],
    ["Data", "डेटा / आंकड़े", "माहिती / आकडेवारी"],
    ["RATE", "दर / भाव", "दर"],
    ["with", "के साथ", "सोबत"],
    ["HOLD", "रोकें", "थांबा"],
    ["GAIN", "लाभ", "फायदा"],
    ["Gain", "बढ़त / लाभ", "वाढ / नफा"],
    ["Over", "के दौरान", "दरम्यान"],
    ["Send", "भेजें", "पाठवा"],
    ["Pass", "पास", "पास"],
    ["Toll", "टोल", "टोल"],
    [" /Qt", " /क्विंटल", " /क्विंटल"],
    [" /kg", " /किलो", " /किलो"],
    ["Step", "चरण / पड़ाव", "टप्पा"],
    ["km/h", "किमी/घंटा", "किमी/तास"],
    ["Call", "कॉल करें", "फोन करा"],
    ["IMPS", "आईएमपीएस", "IMPS"],
    ["Est.", "अनुमानित", "अपेक्षित"],
    ["Role", "भूमिका", "जबाबदारी"],
    ["Desi", "देसी", "देशी"],
    ["Seed", "बीज", "बियाणे"],
    ["MORE", "अधिक", "जास्त"],
    ["HAND", "हाथ में", "हातात"],
    ["CASH", "नकद", "रोख"],
    ["YOUR", "आपकी / आपका", "आपले"],
    ["earn", "कमाते हैं / आय", "मिळवता / उत्पन्न"],
    ["Cess", "उपकर", "सेस"],
    ["Fee:", "शुल्क:", "शुल्क:"],
    ["Fees", "शुल्क", "शुल्क"],
    ["Cut:", "कटौती:", "कपात:"],
    ["Free", "निःशुल्क / फ्री", "मोफत"],
    ["This", "यह", "हे / या"],
    ["List", "लिस्ट करें / जोड़ें", "नोंदवा"],
    ["ETA", "अनुमानित समय (ETA)", "अपेक्षित वेळ (ETA)"],
    ["Hub", "हब", "केंद्र"],
    ["Net", "शुद्ध", "निव्वळ"],
    ["Cut", "कटौती", "कपात"],
    ["Ref", "संदर्भ", "संदर्भ"],
    ["Low", "निम्न", "कमी"],
    ["Red", "लाल", "लाल"],
    ["Nex", "Nex", "Nex"],
    ["Bid", "बोली", "बोली"],
    ["Lot", "लॉट", "लॉट"],
    ["All", "सभी", "सर्व"],
    ["New", "नया", "नवीन"],
    ["Add", "जोड़ें", "जोडा"],
    ["KYC", "केवाईसी", "KYC"],
    ["Ltd", "लिमिटेड", "लि."],
    ["Got", "प्राप्त हुआ", "मिळाले"],
    ["Day", "दिन", "दिवस"],
    ["/kg", "/किलो", "/किलो"],
    ["Top", "शीर्ष", "प्रमुख"],
    ["Buy", "खरीदें", "खरेदी करा"],
    ["Per", "प्रति", "प्रति"],
    ["PER", "प्रति", "प्रति"],
    ["NET", "शुद्ध", "निव्वळ"],
    ["No:", "क्रमांक:", "क्रमांक:"],
    ["/Qt", "/क्विंटल", "/क्विंटल"],
    [" Qt", " क्विंटल", " क्विंटल"],
    [" kg", " किलो", " किलो"],
    ["ESC", "ESC", "ESC"],
    ["Oil", "तेल", "तेल"],
    ["Fee", "शुल्क / खर्च", "शुल्क"],
    ["ID", "आईडी", "आयडी"],
    ["of", "का / की", "चा / ची"],
    ["KG", "किलो", "किलो"],
    ["QT", "क्विंटल", "क्विंटल"],
    ["AM", "पूर्वाह्न / सुबह", "सकाळी"],
    ["PM", "अपराह्न / शाम", "दुपारी / संध्याकाळी"],
    ["KM", "किमी", "किमी"],
    ["km", "किमी", "किमी"],
    ["GP", "GP", "GP"],
    ["AQ", "AQ", "AQ"],
    ["GI", "जीआई", "GI"]
  ];

  const PHRASE_MAP = RAW_PHRASES;

  // 10. REVERSE DICTIONARIES & BIDIRECTIONAL LOCALIZATION
  const REVERSE_FARMER_CORE = {};
  const REVERSE_FARMER_SUBSTRINGS = [];

  function buildFarmerReverseDictionaries() {
    for (let i = 0; i < PHRASE_MAP.length; i++) {
      const row = PHRASE_MAP[i];
      const en = row[0];
      const hi = row[1];
      const mr = row[2];
      if (hi) {
        REVERSE_FARMER_CORE[hi.toLowerCase().trim()] = en;
        REVERSE_FARMER_SUBSTRINGS.push({ foreign: hi.trim(), en: en });
      }
      if (mr && mr.toLowerCase().trim() !== (hi && hi.toLowerCase().trim())) {
        REVERSE_FARMER_CORE[mr.toLowerCase().trim()] = en;
        REVERSE_FARMER_SUBSTRINGS.push({ foreign: mr.trim(), en: en });
      }
    }

    function indexMap(sourceMap) {
      if (!sourceMap) return;
      for (const [en, v] of Object.entries(sourceMap)) {
        if (v.hi) {
          REVERSE_FARMER_CORE[v.hi.toLowerCase().trim()] = en;
          REVERSE_FARMER_SUBSTRINGS.push({ foreign: v.hi.trim(), en: en });
        }
        if (v.mr) {
          REVERSE_FARMER_CORE[v.mr.toLowerCase().trim()] = en;
          REVERSE_FARMER_SUBSTRINGS.push({ foreign: v.mr.trim(), en: en });
        }
      }
    }

    indexMap(CROP_MAP);
    indexMap(VARIETY_MAP);
    indexMap(MANDI_MAP);
    indexMap(BUYER_MAP);
    indexMap(PERSON_MAP);
    indexMap(CATEGORY_MAP);
    indexMap(GRADE_MAP);
    indexMap(STATUS_MAP);
    indexMap(DISTRICT_MAP);

    REVERSE_FARMER_SUBSTRINGS.sort((a, b) => b.foreign.length - a.foreign.length);
  }

  buildFarmerReverseDictionaries();

  function translateFarmerToEnglish(str) {
    if (!str || typeof str !== 'string') return str;
    if (!/[\u0900-\u097F]/.test(str)) return str;

    const trimmed = str.trim();
    const lowerTrimmed = trimmed.toLowerCase();

    if (REVERSE_FARMER_CORE[lowerTrimmed]) {
      return REVERSE_FARMER_CORE[lowerTrimmed];
    }

    let translated = trimmed;
    for (let i = 0; i < REVERSE_FARMER_SUBSTRINGS.length; i++) {
      const item = REVERSE_FARMER_SUBSTRINGS[i];
      if (item.foreign.length > 2 && translated.includes(item.foreign)) {
        translated = translated.split(item.foreign).join(item.en);
      }
    }
    return translated;
  }

  function getFarmerLanguage() {
    try {
      return localStorage.getItem(STORAGE_KEY) || localStorage.getItem('agrinex_language') || 'en';
    } catch (e) {
      return 'en';
    }
  }

  function tCrop(cropName, lang) {
    if (!cropName || typeof cropName !== 'string') return cropName;
    const l = lang || getFarmerLanguage();
    if (l === 'en') return translateFarmerToEnglish(cropName);

    let enName = cropName;
    if (/[\u0900-\u097F]/.test(cropName)) {
      enName = translateFarmerToEnglish(cropName);
    }

    if (CROP_MAP[enName] && CROP_MAP[enName][l]) {
      return CROP_MAP[enName][l];
    }

    let res = enName;
    for (const [k, v] of Object.entries(CROP_MAP)) {
      if (res.includes(k) && v[l]) {
        res = res.replaceAll(k, v[l]);
      }
    }
    return res;
  }

  function tVariety(varietyName, lang) {
    if (!varietyName || typeof varietyName !== 'string') return varietyName;
    const l = lang || getFarmerLanguage();
    if (l === 'en') return translateFarmerToEnglish(varietyName);

    let enName = varietyName;
    if (/[\u0900-\u097F]/.test(varietyName)) {
      enName = translateFarmerToEnglish(varietyName);
    }

    if (VARIETY_MAP[enName] && VARIETY_MAP[enName][l]) {
      return VARIETY_MAP[enName][l];
    }

    let res = enName;
    for (const [k, v] of Object.entries(VARIETY_MAP)) {
      if (res.includes(k) && v[l]) {
        res = res.replaceAll(k, v[l]);
      }
    }
    return res;
  }

  function tBuyer(buyerName, lang) {
    if (!buyerName || typeof buyerName !== 'string') return buyerName;
    const l = lang || getFarmerLanguage();
    if (l === 'en') return translateFarmerToEnglish(buyerName);

    let enName = buyerName;
    if (/[\u0900-\u097F]/.test(buyerName)) {
      enName = translateFarmerToEnglish(buyerName);
    }

    if (BUYER_MAP[enName] && BUYER_MAP[enName][l]) {
      return BUYER_MAP[enName][l];
    }
    let res = enName;
    for (const [k, v] of Object.entries(BUYER_MAP)) {
      if (res.includes(k) && v[l]) {
        res = res.replaceAll(k, v[l]);
      }
    }
    return res;
  }

  function tPerson(name, lang) {
    if (!name || typeof name !== 'string') return name;
    const l = lang || getFarmerLanguage();
    if (l === 'en') return translateFarmerToEnglish(name);
    let enName = name;
    if (/[\u0900-\u097F]/.test(name)) {
      enName = translateFarmerToEnglish(name);
    }
    return (PERSON_MAP[enName] && PERSON_MAP[enName][l]) || enName;
  }

  function tLocation(loc, lang) {
    if (!loc || typeof loc !== 'string') return loc;
    const l = lang || getFarmerLanguage();
    if (l === 'en') return translateFarmerToEnglish(loc);

    let enLoc = loc;
    if (/[\u0900-\u097F]/.test(loc)) {
      enLoc = translateFarmerToEnglish(loc);
    }

    if (MANDI_MAP[enLoc] && MANDI_MAP[enLoc][l]) return MANDI_MAP[enLoc][l];
    if (DISTRICT_MAP[enLoc] && DISTRICT_MAP[enLoc][l]) return DISTRICT_MAP[enLoc][l];
    let res = enLoc;
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
    if (l === 'en') return translateFarmerToEnglish(cat);
    return (CATEGORY_MAP[cat] && CATEGORY_MAP[cat][l]) || cat;
  }

  function tGrade(grade, lang) {
    if (!grade || typeof grade !== 'string') return grade;
    const l = lang || getFarmerLanguage();
    if (l === 'en') return translateFarmerToEnglish(grade);
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
    if (l === 'en') return translateFarmerToEnglish(status);
    return (STATUS_MAP[status] && STATUS_MAP[status][l]) || status;
  }

  function tText(str, lang) {
    if (!str || typeof str !== 'string') return str;
    const l = lang || getFarmerLanguage();
    if (l === 'en') return translateFarmerToEnglish(str);

    let enText = str;
    if (/[\u0900-\u097F]/.test(str)) {
      enText = translateFarmerToEnglish(str);
    }

    const colIdx = l === 'hi' ? 1 : 2;
    let res = enText;

    // STEP 1: Phrase Map (Longest to shortest)
    for (let i = 0; i < PHRASE_MAP.length; i++) {
      const row = PHRASE_MAP[i];
      if (res.includes(row[0])) {
        res = res.replaceAll(row[0], row[colIdx]);
      }
    }

    // STEP 2: Buyer Map
    for (const [k, v] of Object.entries(BUYER_MAP)) {
      if (res.includes(k) && v[l]) {
        res = res.replaceAll(k, v[l]);
      }
    }

    // STEP 3: Crop Map
    for (const [k, v] of Object.entries(CROP_MAP)) {
      if (res.includes(k) && v[l]) {
        res = res.replaceAll(k, v[l]);
      }
    }

    // STEP 4: Variety Map
    for (const [k, v] of Object.entries(VARIETY_MAP)) {
      if (res.includes(k) && v[l]) {
        res = res.replaceAll(k, v[l]);
      }
    }

    // STEP 5: Category Map
    for (const [k, v] of Object.entries(CATEGORY_MAP)) {
      if (res.includes(k) && v[l]) {
        res = res.replaceAll(k, v[l]);
      }
    }

    // STEP 6: Mandi Map
    for (const [k, v] of Object.entries(MANDI_MAP)) {
      if (res.includes(k) && v[l]) {
        res = res.replaceAll(k, v[l]);
      }
    }

    // STEP 7: Person Map
    for (const [k, v] of Object.entries(PERSON_MAP)) {
      if (res.includes(k) && v[l]) {
        res = res.replaceAll(k, v[l]);
      }
    }

    // STEP 8: District Map
    for (const [k, v] of Object.entries(DISTRICT_MAP)) {
      if (res.includes(k) && v[l]) {
        res = res.replaceAll(k, v[l]);
      }
    }

    // STEP 9: Grade Map
    for (const [k, v] of Object.entries(GRADE_MAP)) {
      if (res.includes(k) && v[l]) {
        res = res.replaceAll(k, v[l]);
      }
    }

    // STEP 10: Status Map
    for (const [k, v] of Object.entries(STATUS_MAP)) {
      if (res.includes(k) && v[l]) {
        res = res.replaceAll(k, v[l]);
      }
    }

    return res;
  }

  function t(key, defaultVal) {
    return tText(defaultVal || key);
  }

  function toggleLanguageMenu() {
    const menu = document.getElementById('language-dropdown-menu');
    if (!menu) return;
    const isShown = menu.style.display === 'block';
    menu.style.display = isShown ? 'none' : 'block';
  }

  // Close dropdown when clicked outside
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
    if (!rootNode || typeof document === 'undefined' || typeof document.createTreeWalker !== 'function') return;
    const l = lang || getFarmerLanguage();

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
          if (parent.closest && (parent.closest('#language-dropdown-menu') || parent.closest('#btn-language-selector'))) {
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

      const currentVal = textNode.nodeValue;
      let orig = parent.getAttribute('data-agx-orig');
      if (!orig) {
        if (!/[\u0900-\u097F]/.test(currentVal)) {
          orig = currentVal;
        } else {
          orig = translateFarmerToEnglish(currentVal);
        }
        if (orig) parent.setAttribute('data-agx-orig', orig);
      }

      if (l === 'en') {
        textNode.nodeValue = orig || translateFarmerToEnglish(currentVal);
        return;
      }

      textNode.nodeValue = tText(orig || currentVal, l);
    });

    // Translate Inputs placeholders
    const placeholders = rootNode.querySelectorAll ? rootNode.querySelectorAll('input[placeholder], textarea[placeholder]') : [];
    placeholders.forEach(input => {
      let orig = input.getAttribute('data-agx-orig-ph');
      if (!orig) {
        const curPh = input.getAttribute('placeholder') || '';
        orig = !/[\u0900-\u097F]/.test(curPh) ? curPh : translateFarmerToEnglish(curPh);
        if (orig) input.setAttribute('data-agx-orig-ph', orig);
      }
      input.setAttribute('placeholder', l === 'en' ? orig : tText(orig, l));
    });

    // Translate Select Options
    const options = rootNode.querySelectorAll ? rootNode.querySelectorAll('select option') : [];
    options.forEach(opt => {
      let orig = opt.getAttribute('data-agx-orig-opt');
      if (!orig) {
        const curOpt = opt.text || '';
        orig = !/[\u0900-\u097F]/.test(curOpt) ? curOpt : translateFarmerToEnglish(curOpt);
        if (orig) opt.setAttribute('data-agx-orig-opt', orig);
      }
      opt.text = l === 'en' ? orig : tText(orig, l);
    });
  }

  let domObserver = null;
  function startDOMObserver() {
    if (domObserver || typeof MutationObserver === 'undefined' || typeof document === 'undefined') return;
    domObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1 && !node.closest('#language-dropdown-menu')) {
              walkAndTranslateDOM(node);
            }
          });
        }
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
      localStorage.setItem('agrinex_language', lang);
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
        if (optBtn && typeof optBtn.querySelector === 'function') {
          const check = optBtn.querySelector('.lang-check');
          if (check) check.style.display = l === lang ? 'inline' : 'none';
          optBtn.style.background = l === lang ? '#e8f5ed' : 'transparent';
          optBtn.style.color = l === lang ? '#0c5a36' : '#0f172a';
        }
      });

      const menu = document.getElementById('language-dropdown-menu');
      if (menu) menu.style.display = 'none';
    }

    // Re-render dynamic views
    if (typeof window.renderDashboard === 'function') window.renderDashboard();
    if (typeof window.renderListings === 'function') window.renderListings();
    if (typeof window.renderFPOHub === 'function') window.renderFPOHub();
    if (typeof window.renderAllCrops === 'function') window.renderAllCrops();
    if (typeof window.renderMandiPrices === 'function') window.renderMandiPrices();
    if (typeof window.renderCropsTable === 'function') window.renderCropsTable();
    if (typeof window.renderLots === 'function') window.renderLots();
    if (typeof window.renderOffers === 'function') window.renderOffers();

    // Translate entire DOM immediately including newly rendered dynamic content
    if (typeof document !== 'undefined' && document.body) {
      walkAndTranslateDOM(document.body, lang);
      startDOMObserver();
    }

    // Trigger toast notification if showNotificationToast exists
    const toastMsgs = {
      en: 'Language set to English',
      hi: 'भाषा बदलकर हिन्दी कर दी गई है',
      mr: 'भाषा मराठीमध्ये बदलण्यात आली आहे'
    };
    if (typeof window.showNotificationToast === 'function') {
      window.showNotificationToast(toastMsgs[lang] || toastMsgs.en, 'success');
    }

    // Cross-tab and module broadcast
    if (typeof window !== 'undefined') {
      try {
        window.dispatchEvent(new CustomEvent('agrinex_language_changed', { detail: { lang: lang } }));
      } catch (e) {}
    }
  }

  function initFarmerI18n() {
    const saved = getFarmerLanguage();
    setFarmerLanguage(saved);
  }

  // Exports
  if (typeof window !== 'undefined') {
    window.AgriNexFarmerI18n = {
      t,
      tText,
      tCrop,
      tVariety,
      tBuyer,
      tPerson,
      tLocation,
      tCategory,
      tGrade,
      tStatus,
      setFarmerLanguage,
      getFarmerLanguage,
      toggleLanguageMenu,
      walkAndTranslateDOM
    };

    window.setFarmerLanguage = setFarmerLanguage;
    window.getFarmerLanguage = getFarmerLanguage;
    window.toggleLanguageMenu = toggleLanguageMenu;
    window.tFarmer = tText;

    if (typeof window.toggleFarmerLiteMode !== 'function') {
      window.toggleFarmerLiteMode = function () {
        const current = localStorage.getItem('agrinex_farmer_lite_mode') === 'true';
        localStorage.setItem('agrinex_farmer_lite_mode', (!current).toString());
        window.location.href = 'index.html';
      };
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      t,
      tText,
      tCrop,
      tVariety,
      tBuyer,
      tPerson,
      tLocation,
      tCategory,
      tGrade,
      tStatus,
      setFarmerLanguage,
      getFarmerLanguage,
      walkAndTranslateDOM
    };
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initFarmerI18n);
    } else {
      initFarmerI18n();
    }
  }
})();
