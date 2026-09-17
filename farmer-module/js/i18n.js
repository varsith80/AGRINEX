/**
 * AgriNex - Farmer Portal Multilingual Translation Engine (i18n)
 * Supported Languages:
 *  - en: English (Default)
 *  - hi: हिन्दी (Hindi)
 *  - mr: मराठी (Marathi)
 * Translates 100% of all UI text, person names, crop names, mandis, and agricultural trading terms.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'agrinex_farmer_language';

  // 1. PERSON / FARMER / DRIVER / BUYER TRANSLATIONS
  const PERSON_MAP = {
    'Patil Rameshwar': { hi: 'पाटिल रामेश्वर', mr: 'पाटील रामेश्वर' },
    'Rameshwar Patil': { hi: 'पाटिल रामेश्वर', mr: 'पाटील रामेश्वर' },
    'Ramesh Patel': { hi: 'रमेश पटेल', mr: 'रमेश पटेल' },
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
    'Selvam': { hi: 'सेल्वम', mr: 'सेल्वम' }
  };

  // 2. CROP & COMMODITY TRANSLATIONS
  const CROP_MAP = {
    'Red Onion (Nashik Garwa Quality)': { hi: 'लाल प्याज (नासिक गरवा)', mr: 'लाल कांदा (नाशिक गरवा)' },
    'Red Onion (Lasalgaon Garwa)': { hi: 'लाल प्याज (लासलगांव गरवा)', mr: 'लाल कांदा (लासलगाव गरवा)' },
    'Red Onion (Garwa Export)': { hi: 'लाल प्याज (गरवा निर्यात)', mr: 'लाल कांदा (गरवा निर्यात)' },
    'Red Onion': { hi: 'लाल प्याज', mr: 'लाल कांदा' },
    'Garwa Red Onion': { hi: 'गरवा लाल प्याज', mr: 'गरवा लाल कांदा' },
    'Onion': { hi: 'प्याज', mr: 'कांदा' },

    'Tomato (Shivam / Abhinav Hybrid)': { hi: 'टमाटर (शिवम / अभिनव हाइब्रिड)', mr: 'टोमॅटो (शिवम / अभिनव संकरित)' },
    'Hybrid Tomato (Narayangaon / Junnar)': { hi: 'हाइब्रिड टमाटर (नारायणगांव / जुन्नर)', mr: 'संकरित टोमॅटो (नारायणगाव / जुन्नर)' },
    'Tomato (Shivam Hybrid)': { hi: 'टमाटर (शिवम हाइब्रिड)', mr: 'टोमॅटो (शिवम संकरित)' },
    'Hybrid Tomato': { hi: 'हाइब्रिड टमाटर', mr: 'संकरित टोमॅटो' },
    'Tomato': { hi: 'टमाटर', mr: 'टोमॅटो' },
    'Tomatoes': { hi: 'टमाटर', mr: 'टोमॅटो' },

    'Grand Naine Banana (Jalgaon G9)': { hi: 'ग्रैंड नैन केला (जलगांव जी9)', mr: 'ग्रँड नैन केळी (जळगाव जी९)' },
    'Grand Naine Banana': { hi: 'ग्रैंड नैन केला', mr: 'ग्रँड नैन केळी' },
    'Banana': { hi: 'केला', mr: 'केळी' },

    'Yellow Soybean (Latur JS 335)': { hi: 'पीला सोयाबीन (लातूर जेएस 335)', mr: 'पिवळी सोयाबीन (लातूर जेएस ३३५)' },
    'Yellow Soybean': { hi: 'पीला सोयाबीन', mr: 'पिवळी सोयाबीन' },
    'Soybean': { hi: 'सोयाबीन', mr: 'सोयाबीन' },

    'Nagpur Orange / Santra (Table Export Grade)': { hi: 'नागपुर संतरा (टेबल निर्यात)', mr: 'नागपूर संत्री (टेबल निर्यात)' },
    'Nagpur Orange': { hi: 'नागपुर संतरा', mr: 'नागपूर संत्री' },
    'Orange': { hi: 'संतरा', mr: 'संत्री' },
    'Santra': { hi: 'संतरा', mr: 'संत्री' },

    'Sangli Rajapuri Turmeric Finger (High Curcumin)': { hi: 'सांगली राजापुरी हल्दी (उच्च करक्यूमिन)', mr: 'सांगली राजापुरी हळद (उच्च करक्युमिन)' },
    'Turmeric': { hi: 'हल्दी', mr: 'हळद' },

    'MCU-5 Raw Cotton (Amravati White Gold)': { hi: 'एमसीयू-5 कच्चा कपास (अमरावती सफेद सोना)', mr: 'एमसीयू-५ कच्चा कापूस (अमरावती पांढरे सोने)' },
    'Raw Cotton': { hi: 'कच्चा कपास', mr: 'कच्चा कापूस' },
    'Cotton': { hi: 'कपास', mr: 'कापूस' },

    'Thompson Seedless Grapes (Nashik Export Grade)': { hi: 'थॉमसन बीजहीन अंगूर (नासिक निर्यात ग्रेड)', mr: 'थॉमसन बिनबियांची द्राक्षे (नाशिक निर्यात प्रत)' },
    'Grapes': { hi: 'अंगूर', mr: 'द्राक्षे' },

    'Bhagwa Pomegranate (Solapur Export Grade)': { hi: 'भगवा अनार (सोलापुर निर्यात ग्रेड)', mr: 'भगवा डाळिंब (सोलापूर निर्यात प्रत)' },
    'Pomegranate': { hi: 'अनार', mr: 'डाळिंब' },

    'Devgad Alphonso Mango (GI Tagged Export)': { hi: 'देवगड हापुस आम (जीआई टैग)', mr: 'देवगड हापूस आंबा (GI प्रमाणित)' },
    'Ratnagiri Alphonso Mango': { hi: 'रत्नागिरी हापुस आम', mr: 'रत्नागिरी हापूस आंबा' },
    'Mango': { hi: 'आम', mr: 'आंबा' },

    'Green Chilli (G4 Spicy Dark Green)': { hi: 'हरी मिर्च (जी4 तीखी)', mr: 'हिरवी मिरची (जी४ तिखट)' },
    'Green Chilli': { hi: 'हरी मिर्च', mr: 'हिरवी मिरची' },
    'Chilli': { hi: 'मिर्च', mr: 'मिरची' },

    'Chana (Bengal Gram)': { hi: 'चना (देसी चना)', mr: 'हरभरा (चना)' },
    'Chana': { hi: 'चना', mr: 'हरभरा' },
    'Wheat': { hi: 'गेहूं', mr: 'गहू' },
    'Paddy': { hi: 'धान / चावल', mr: 'भात / तांदूळ' },
    'Rice': { hi: 'चावल', mr: 'तांदूळ' },
    'Maize': { hi: 'मक्का', mr: 'मका' },
    'Potato': { hi: 'आलू', mr: 'बटाटा' },
    'Okra': { hi: 'भिंडी', mr: 'भेंडी' },
    'Brinjal': { hi: 'बैंगन', mr: 'वांगी' },
    'Cabbage': { hi: 'पत्तागोभी', mr: 'कोबी' },
    'Cauliflower': { hi: 'फूलगोभी', mr: 'फ्लॉवर' },
    'Carrot': { hi: 'गाजर', mr: 'गाजर' },
    'Garlic': { hi: 'लहसुन', mr: 'लसूण' },
    'Ginger': { hi: 'अदरक', mr: 'आले' },
    'Papaya': { hi: 'पपीता', mr: 'पपई' },
    'Coconut': { hi: 'नारियल', mr: 'नारळ' },
    'Groundnut': { hi: 'मूंगफली', mr: 'भुईमूग' },
    'Jowar': { hi: 'ज्वार', mr: 'ज्वारी' },
    'Bajra': { hi: 'बाजरा', mr: 'बाजरी' }
  };

  // 3. MANDIS & APMC LOCATIONS
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
    'Devgad Coastal APMC': { hi: 'देवगड तटीय एपीएमसी', mr: 'देवगड हापूस बाजार समिती' },
    'Akola APMC Market': { hi: 'अकोला एपीएमसी बाजार', mr: 'अकोला बाजार समिती' },
    'Vashi Wholesale APMC': { hi: 'वाशी थोक एपीएमसी (नवी मुंबई)', mr: 'वाशी मुख्य बाजार समिती (नवी मुंबई)' },
    'Vashi APMC Market': { hi: 'वाशी एपीएमसी बाजार', mr: 'वाशी बाजार समिती' },
    'Gultekdi APMC': { hi: 'गुलटेकड़ी एपीएमसी (पुणे)', mr: 'गुलटेकडी बाजार समिती (पुणे)' },
    'Surat APMC': { hi: 'सूरत एपीएमसी मंडी', mr: 'सुरत बाजार समिती' }
  };

  // 4. DISTRICTS & STATES
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
    'Aurangabad': { hi: 'छत्रपति संभाजीनगर', mr: 'छत्रपती संभाजीनगर' },
    'Chhatrapati Sambhajinagar': { hi: 'छत्रपति संभाजीनगर', mr: 'छत्रपती संभाजीनगर' },
    'Maharashtra': { hi: 'महाराष्ट्र', mr: 'महाराष्ट्र' },
    'Gujarat': { hi: 'गुजरात', mr: 'गुजरात' },
    'Karnataka': { hi: 'कर्नाटक', mr: 'कर्नाटक' },
    'Tamil Nadu': { hi: 'तमिलनाडु', mr: 'तमिळनाडू' },
    'Madhya Pradesh': { hi: 'मध्य प्रदेश', mr: 'मध्य प्रदेश' }
  };

  // 5. QUALITY GRADES & LOT STATUSES
  const GRADE_MAP = {
    'Grade A Export Calibrated': { hi: 'ग्रेड ए निर्यात कैलिब्रेटेड', mr: 'ग्रेड अ निर्यात प्रमाणित' },
    'Grade A Export Quality': { hi: 'ग्रेड ए निर्यात गुणवत्ता', mr: 'ग्रेड अ निर्यात दर्जा' },
    'Grade A 55mm+ Bold': { hi: 'ग्रेड ए 55मिमी+ बोल्ड', mr: 'ग्रेड अ ५५मिमी+ जाड कांदा' },
    'Grade A 29mm+ Staple': { hi: 'ग्रेड ए 29मिमी+ स्टेपल', mr: 'ग्रेड अ २९मिमी+ लांब धागा' },
    'Grade A 250g+ Calibrated': { hi: 'ग्रेड ए 250ग्रा+ कैलिब्रेटेड', mr: 'ग्रेड अ २५०ग्रॅम+ डाळिंब' },
    'Grade A Cleaned Yellow': { hi: 'ग्रेड ए स्वच्छ पीला', mr: 'ग्रेड अ स्वच्छ पिवळी' },
    'Grade A Double Polished': { hi: 'ग्रेड ए डबल पॉलिश', mr: 'ग्रेड अ डबल पॉलिश हळद' },
    'Grade A Juicy Calibrated': { hi: 'ग्रेड ए रसीला संतरा', mr: 'ग्रेड अ रसाळ संत्री' },
    'Grade A Bold Grain': { hi: 'ग्रेड ए बोल्ड दाना', mr: 'ग्रेड अ टपोरा दाणा' },
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
    'Open': { hi: 'सक्रिय', mr: 'सुरू' },
    'Full': { hi: 'पूर्ण (फुल)', mr: 'पूर्ण' }
  };

  // 6. UI PHRASE REPLACEMENTS
  const PHRASE_MAP = [
    // Sidebar Navigation
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

    // Header Actions
    ['List New Crop', '+ नई फसल जोड़ें', '+ नवीन पीक जोडा'],
    ['Search vegetable, commodity, APMC mandi, state...', 'सब्जी, फसल, एपीएमसी मंडी, राज्य खोजें...', 'भाजीपाला, पीक, बाजार समिती, जिल्हा शोधा...'],
    ['Search crops, lots, buyers...', 'फसल, लॉट, खरीदार खोजें...', 'पिके, लॉट्स, खरेदीदार शोधा...'],
    ['Change Language', 'भाषा बदलें', 'भाषा बदला'],
    ['Support', 'मदद', 'मदत'],

    // Market Insights Ribbon & Controls
    ['Live Agmarknet (data.gov.in) API Feed', 'लाइव एगमार्कनेट (data.gov.in) सरकारी डेटा', 'थेट अ‍ॅगमार्कनेट (data.gov.in) सरकारी दर'],
    ['Daily Mandi Price Updates', 'दैनिक मंडी भाव अपडेट', 'दैनिक बाजार समिती भाव'],
    ['Update Rates', 'दर अपडेट करें', 'दर अपडेट करा'],
    ['Market Price Trend & 7-Day Forecast', 'मंडी भाव रुझान और 7-दिवसीय पूर्वानुमान', 'बाजार भाव कल आणि ७ दिवसांचा अंदाज'],
    ['Live Agmarknet', 'लाइव एगमार्कनेट', 'थेट अ‍ॅगमार्कनेट'],
    ['Clear daily prices in', 'स्पष्ट दैनिक मूल्य', 'स्पष्ट दैनिक दर'],
    ['with simple 7-day forward Expected price trends.', 'सरल 7-दिवसीय अपेक्षित मूल्य रुझान के साथ।', 'सरल ७ दिवसांच्या अंदाजित भावासह.'],
    ['Unit:', 'इकाई:', 'एकक:'],
    ['Today\'s Rate:', 'आज का दर:', 'आजचा दर:'],
    ['7-Day Target:', '7-दिवसीय लक्ष्य:', '७ दिवसांचे लक्ष्य:'],
    ['Solid Green: Past 7 Days Actual Price', 'ठोस हरा: पिछले 7 दिनों का वास्तविक मूल्य', 'हिरवी रेषा: मागील ७ दिवसांचे प्रत्यक्ष भाव'],
    ['Dashed Blue: Next 7 Days Forecast', 'नीली बिंदीदार: अगले 7 दिनों का पूर्वानुमान', 'निळी डॅश रेषा: पुढील ७ दिवसांचा अंदाज'],
    ['Official APMC Mandi Data (data.gov.in)', 'आधिकारिक एपीएमसी मंडी डेटा (data.gov.in)', 'अधिकृत कृषी उत्पन्न बाजार समिती डेटा'],

    // KPI Cards
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

    // Sections & Cards
    ['Top Demanded Produce', 'सर्वाधिक मांग वाली फसलें', 'सर्वाधिक मागणी असलेली पिके'],
    ['By Arrival Volume', 'आवक मात्रा के अनुसार', 'आवक प्रमाणानुसार'],
    ['7-Day Price Forecasts', '7-दिवसीय मूल्य पूर्वानुमान', '७ दिवसांचा भाव अंदाज'],
    ['Prices likely to increase', 'भाव बढ़ने की पूरी संभावना', 'भाव वाढण्याची दाट शक्यता'],
    ['Across Maharashtra APMC terminals over next 3–5 days', 'अगले 3-5 दिनों में महाराष्ट्र की प्रमुख मंडियों में', 'पुढील ३-५ दिवसांत महाराष्ट्रातील प्रमुख बाजारांत'],
    ['Live APMC Mandi Rates & Arbitrage Signals', 'लाइव मंडी दर और अंतर-मंडी मुनाफा (आर्बिट्रेज)', 'थेट बाजार भाव आणि आंतर-बाजार नफा संधी'],
    ['Verified feeds from Agmarknet API (data.gov.in) & e-NAM Mandis', 'एगमार्कनेट और ई-नाम सत्यापित सरकारी मंडी डेटा', 'अ‍ॅगमार्कनेट आणि ई-नाम प्रमाणित अधिकृत डेटा'],
    ['All Mandis', 'सभी मंडियां', 'सर्व बाजार समित्या'],
    ['Maharashtra Hubs', 'महाराष्ट्र मंडी हब', 'महाराष्ट्र केंद्रे'],
    ['National Benchmark', 'राष्ट्रीय बेंचमार्क', 'राष्ट्रीय बाजार'],

    // Table Headers
    ['PRODUCE', 'फसल / उपज', 'पीक / शेतमाल'],
    ['GRADE', 'ग्रेड / गुणवत्ता', 'प्रत / दर्जा'],
    ['MANDI / LOCATION', 'मंडी / स्थान', 'बाजार समिती / ठिकाण'],
    ['RATE (PER KG)', 'दर (प्रति किलो)', 'दर (प्रति किलो)'],
    ['RATE (PER QT)', 'दर (प्रति क्विंटल)', 'दर (प्रति क्विंटल)'],
    ['CHANGE (1W)', 'बदलाव (1 सप्ताह)', 'बदल (१ आठवडा)'],
    ['TREND SPARK', 'रुझान ग्राफ', 'भाव आलेख'],
    ['BEST OPTION', 'विकल्प', 'पर्याय'],
    ['View Sheet', 'विवरण पत्र', 'तपशील पहा'],

    // Modal Details
    ['MARKET ADVICE', 'बाजार सलाह (AI)', 'बाजार सल्ला (AI)'],
    ['7-Day Forward Price Projections (In ₹ per kg)', '7-दिवसीय अग्रिम मूल्य अनुमान (₹ प्रति किलो में)', '७ दिवसांचे अंदाजित भाव (₹ प्रति किलोमध्ये)'],
    ['Best Mandis to Sell (After Transport Cost)', 'माल बेचने के लिए सर्वश्रेष्ठ मंडियां (भाड़ा खर्च काटकर)', 'माल विकण्यासाठी सर्वोत्तम बाजार (वाहतूक खर्च वजा जाता)'],
    ['DESTINATION MANDI', 'गंतव्य मंडी', 'गंतव्य बाजार समिती'],
    ['DISTANCE', 'दूरी', 'अंतर'],
    ['MODAL RATE (KG / QT)', 'मॉडल दर (किलो / क्विंटल)', 'सरासरी दर (किलो / क्विंटल)'],
    ['FREIGHT COST', 'परिवहन भाड़ा', 'वाहतूक खर्च'],
    ['NET SPREAD / GAIN', 'शुद्ध अतिरिक्त लाभ', 'निव्वळ नफा'],
    ['ACTION', 'कार्रवाई', 'कृती'],
    ['Book Freight', 'भाड़ा बुक करें', 'वाहतूक बुक करा'],
    ['Monitor', 'निगरानी करें', 'निरीक्षण करा'],
    ['No net gain', 'कोई अतिरिक्त लाभ नहीं', 'अतिरिक्त नफा नाही'],
    ['Local Mandi is optimal; no regional arbitrage spread exceeds transit costs.', 'स्थानीय मंडी सर्वोत्तम है; किसी बाहरी मंडी में भाड़ा निकालकर अतिरिक्त लाभ नहीं है।', 'स्थानिक बाजार समिती सर्वोत्तम आहे; इतर बाजारातील भाववाढ वाहतूक खर्चापेक्षा कमी आहे.'],

    // Crop Listing & Forms
    ['Date of Harvest', 'कटाई की तिथि', 'कापणीची तारीख'],
    ['Harvest Date', 'कटाई की तिथि', 'कापणीची तारीख'],
    ['Posting Date', 'पोस्टिंग तिथि', 'नोंदणी तारीख'],
    ['Expected Price', 'अपेक्षित मूल्य', 'अपेक्षित भाव'],
    ['Best Bid', 'सर्वोत्तम बोली', 'सर्वोत्तम बोली'],
    ['Quantity', 'मात्रा', 'प्रमाण'],
    ['Shelf Life', 'भंडारण अवधि', 'टिकवण क्षमता'],
    ['Category', 'श्रेणी', 'प्रवर्ग'],
    ['Variety', 'किस्म / वेरायटी', 'वाण / जात'],
    ['Location', 'स्थान', 'ठिकाण'],
    ['Farmer Name', 'किसान का नाम', 'शेतकऱ्याचे नाव'],
    ['Emergency Sale', 'संकटकालीन त्वरित बिक्री', 'तातडीची संकट विक्री'],
    ['Emergency Distress Sale', 'आपातकालीन संकट बिक्री', 'तातडीची संकट विक्री'],
    ['Active Offer', 'सक्रिय प्रस्ताव', 'सक्रिय ऑफर'],

    // FPO & Escrow
    ['FPO Aggregation Pool', 'एफपीओ एकत्रीकरण पूल', 'एफपीओ संकलन गट'],
    ['Escrow Protected', 'एस्क्रो सुरक्षित', 'एस्क्रो सुरक्षित'],
    ['Advance Released (35%)', 'अग्रिम राशि जारी (35%)', 'अ‍ॅडव्हान्स जमा (३५%)'],
    ['Balance in Escrow (65%)', 'एस्क्रो में शेष (65%)', 'एस्क्रोमध्ये शिल्लक (६५%)'],
    ['Bank Transfer UTR', 'बैंक ट्रांसफर यूटीआर', 'बँक ट्रान्सफर UTR'],
    ['Payout Settled', 'भुगतान संपन्न', 'रक्कम वर्ग झाली'],

    // Notifications & Toasts
    ['Live Maharashtra Mandi Rates Updated!', 'लाइव महाराष्ट्र मंडी दर अपडेट हो गए!', 'महाराष्ट्रातील थेट बाजार भाव अपडेट झाले!'],
    ['Synced APMC yards across Nashik, Lasalgaon, Pune, Solapur & Latur.', 'नासिक, लासलगांव, पुणे, सोलापुर और लातूर मंडियों से सिंक किया गया।', 'नाशिक, लासलगाव, पुणे, सोलापूर आणि लातूर बाजार समित्यांचे भाव जुळवले.']
  ];

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
    if (!cropName) return cropName;
    const l = lang || getFarmerLanguage();
    if (l === 'en') return cropName;
    if (CROP_MAP[cropName] && CROP_MAP[cropName][l]) {
      return CROP_MAP[cropName][l];
    }
    for (const [k, v] of Object.entries(CROP_MAP)) {
      if (cropName.includes(k) && v[l]) {
        return cropName.replace(k, v[l]);
      }
    }
    return cropName;
  }

  function tPerson(name, lang) {
    if (!name) return name;
    const l = lang || getFarmerLanguage();
    if (l === 'en') return name;
    return (PERSON_MAP[name] && PERSON_MAP[name][l]) || name;
  }

  function tLocation(loc, lang) {
    if (!loc) return loc;
    const l = lang || getFarmerLanguage();
    if (l === 'en') return loc;
    if (MANDI_MAP[loc] && MANDI_MAP[loc][l]) return MANDI_MAP[loc][l];
    if (DISTRICT_MAP[loc] && DISTRICT_MAP[loc][l]) return DISTRICT_MAP[loc][l];
    let res = loc;
    for (const [k, v] of Object.entries(MANDI_MAP)) {
      if (res.includes(k) && v[l]) res = res.replace(k, v[l]);
    }
    for (const [k, v] of Object.entries(DISTRICT_MAP)) {
      if (res.includes(k) && v[l]) res = res.replace(k, v[l]);
    }
    return res;
  }

  function tGrade(grade, lang) {
    if (!grade) return grade;
    const l = lang || getFarmerLanguage();
    if (l === 'en') return grade;
    return (GRADE_MAP[grade] && GRADE_MAP[grade][l]) || grade;
  }

  function tStatus(status, lang) {
    if (!status) return status;
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
      if (row[0].length > 3 && res.includes(row[0])) {
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
  document.addEventListener('click', function (e) {
    const widget = document.querySelector('.lang-selector-widget');
    const menu = document.getElementById('language-dropdown-menu');
    if (menu && menu.style.display === 'block') {
      if (widget && !widget.contains(e.target)) {
        menu.style.display = 'none';
      }
    }
  });

  // Universal DOM Translation Walker
  function walkAndTranslateDOM(rootNode, lang) {
    if (!rootNode) return;
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

      // 1. Direct Crop map lookup
      for (const [k, v] of Object.entries(CROP_MAP)) {
        if (translated.includes(k) && v[l]) {
          translated = translated.replaceAll(k, v[l]);
        }
      }

      // 2. Direct Mandi map lookup
      for (const [k, v] of Object.entries(MANDI_MAP)) {
        if (translated.includes(k) && v[l]) {
          translated = translated.replaceAll(k, v[l]);
        }
      }

      // 3. Person map lookup
      for (const [k, v] of Object.entries(PERSON_MAP)) {
        if (translated.includes(k) && v[l]) {
          translated = translated.replaceAll(k, v[l]);
        }
      }

      // 4. District map lookup
      for (const [k, v] of Object.entries(DISTRICT_MAP)) {
        if (translated.includes(k) && v[l]) {
          translated = translated.replaceAll(k, v[l]);
        }
      }

      // 5. Grade map lookup
      for (const [k, v] of Object.entries(GRADE_MAP)) {
        if (translated.includes(k) && v[l]) {
          translated = translated.replaceAll(k, v[l]);
        }
      }

      // 6. Status map lookup
      for (const [k, v] of Object.entries(STATUS_MAP)) {
        if (translated.includes(k) && v[l]) {
          translated = translated.replaceAll(k, v[l]);
        }
      }

      // 7. General Phrase Maps
      for (let i = 0; i < PHRASE_MAP.length; i++) {
        const row = PHRASE_MAP[i];
        if (translated.includes(row[0])) {
          translated = translated.replaceAll(row[0], row[colIdx]);
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
    if (domObserver) return;
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
    domObserver.observe(document.body, { childList: true, subtree: true });
  }

  function setFarmerLanguage(lang) {
    if (!['en', 'hi', 'mr'].includes(lang)) lang = 'en';

    try {
      localStorage.setItem(STORAGE_KEY, lang);
      localStorage.setItem('agrinex_buyer_language', lang);
    } catch (e) {}

    // Update Dropdown UI & Checkmarks
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
    walkAndTranslateDOM(document.body, lang);
    startDOMObserver();

    // Re-render charts or dynamic templates if functions exist
    if (typeof window.renderDashboard === 'function') {
      window.renderDashboard();
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
  window.AgriNexFarmerI18n = {
    tCrop,
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

  window.setFarmerLanguage = setFarmerLanguage;
  window.getFarmerLanguage = getFarmerLanguage;
  window.toggleLanguageMenu = toggleLanguageMenu;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFarmerI18n);
  } else {
    initFarmerI18n();
  }
})();
