/**
 * AgriNex - Logistics & Transit Portal Multilingual Translation Engine (i18n)
 * Supported Languages:
 *  - en: English (Default)
 *  - hi: हिन्दी (Hindi)
 *  - mr: मराठी (Marathi)
 * Covers 100% of all UI text, navigation, driver profiles, metrics, dispatch orders,
 * bulk FPO hauls, express local orders, live GPS telemetry, Kasara Ghat checkpoints,
 * gate pass modal, delivery PIN verification, grievances, and passbook ledgers.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'agrinex_logistics_language';

  // 1. EXACT & PARTIAL PHRASE TRANSLATION DICTIONARY
  const PHRASE_MAP = {
    "Change Language / भाषा बदला / भाषा बदलें": { hi: "भाषा बदलें", mr: "भाषा बदला" },
    "AgriNex Fleet & Cold-Chain Logistics": { hi: "एग्रीनेक्स फ्लीट और कोल्ड-चेन लॉजिस्टिक्स", mr: "अ‍ॅग्रीनेक्स वाहतूक ताफा व शीत-गृह वाहतूक" },
    "3-Village Tomato Collection": { hi: "3-गांव टमाटर संग्रह", mr: "३-गाव टोमॅटो संकलन" },
    "Nashik Onion Growers Consortium ➔ Mumbai APMC Terminal": { hi: "नासिक प्याज उत्पादक संघ ➔ मुंबई एपीएमसी टर्मिनल", mr: "नाशिक कांदा उत्पादक शेतकरी गट ➔ मुंबई एपीएमसी टर्मिनल" },
    "Lasalgaon Mandi Yard, Aggregation Bay 3, Nashik, MH 422306": { hi: "लासलगांव मंडी यार्ड, एकत्रीकरण बे 3, नासिक, महाराष्ट्र 422306", mr: "लासलगाव बाजार समिती यार्ड, एकत्रीकरण बे ३, नाशिक, महाराष्ट्र ४२२३०६" },
    "Vashi APMC Wholesale Market, Sector 19, Navi Mumbai, MH 400703": { hi: "वाशी एपीएमसी थोक बाजार, सेक्टर 19, नवी मुंबई, महाराष्ट्र 400703", mr: "वाशी एपीएमसी घाऊक बाजार, सेक्टर १९, नवी मुंबई, महाराष्ट्र ४००७०३" },
    "Sangli Spices Producer Co. ➔ JNPT Port Export Terminal": { hi: "सांगली मसाला उत्पादक कंपनी ➔ जेएनपीटी बंदर निर्यात टर्मिनल", mr: "सांगली मसाले उत्पादक कंपनी ➔ जेएनपीटी बंदर निर्यात टर्मिनल" },
    "Tomato & Green Chilli (Cold-Chain Reefer)": { hi: "टमाटर और हरी मिर्च (कोल्ड-चेन रीफर)", mr: "टोमॅटो आणि हिरवी मिरची (शीत-गृह रीफर)" },
    "Lasalgaon Mandi Yard ➔ Global Grains Direct Bhiwandi": { hi: "लासलगांव मंडी यार्ड ➔ ग्लोबल ग्रेन्स डायरेक्ट भिवंडी", mr: "लासलगाव बाजार समिती यार्ड ➔ ग्लोबल ग्रेन्स थेट भिवंडी" },
    "Red Onion (Nashik Quality)": { hi: "लाल प्याज (नासिक क्वालिटी)", mr: "लाल कांदा (नाशिक प्रत)" },
    "Global Grains Direct Logistics Hub": { hi: "ग्लोबल ग्रेन्स डायरेक्ट लॉजिस्टिक्स हब", mr: "ग्लोबल ग्रेन्स थेट वाहतूक केंद्र" },
    "Raw Cotton (80 Qt)": { hi: "कच्चा कपास (80 क्विंटल)", mr: "कापूस (८० क्विंटल)" },
    "Malegaon Cotton Textiles": { hi: "मालेगांव कॉटन टेक्सटाइल्स", mr: "मालेगाव कापूस वस्त्रोद्योग" },
    "Released & Settled": { hi: "जारी और भुगतान पूर्ण", mr: "वितरित व जमा झाले" },
    "Invalid 4-digit PIN. Security verification failed.": { hi: "अमान्य 4-अंकीय पिन। सुरक्षा सत्यापन विफल हुआ।", mr: "अवैध ४-अंकी पिन. सुरक्षा पडताळणी अयशस्वी झाली." },    "AgriNex - Logistics Dashboard | Direct Trade · Better Tomorrow": { hi: "एग्रीनेक्स - लॉजिस्टिक्स डैशबोर्ड | सीधा व्यापार · बेहतर कल", mr: "अ‍ॅग्रीनेक्स - वाहतूक डॅशबोर्ड | थेट व्यापार · चांगले भविष्य" },
    "Fleet Dashboard": { hi: "फ्लीट डैशबोर्ड", mr: "वाहतूक ताफा डॅशबोर्ड" },
    "Available Pickups (5)": { hi: "उपलब्ध पिकअप (5)", mr: "उपलब्ध पिकअप्स (५)" },
    "Status & Delivery Time": { hi: "स्थिति और डिलीवरी समय", mr: "स्थिती आणि पोहोच वेळ" },
    "AgriNex Driver & Fleet Console | Live Navigation & Telemetry": { hi: "एग्रीनेक्स ड्राइवर और फ्लीट कंसोल | लाइव नेविगेशन और टेलीमेट्री", mr: "अ‍ॅग्रीनेक्स चालक व वाहतूक कन्सोल | थेट दिशादर्शन व टेलिमेट्री" },
    "← Fleet Dashboard": { hi: "← फ्लीट डैशबोर्ड", mr: "← वाहतूक डॅशबोर्ड" },
    "AgriNex Driver & Fleet Console": { hi: "एग्रीनेक्स ड्राइवर और फ्लीट कंसोल", mr: "अ‍ॅग्रीनेक्स चालक आणि वाहतूक कन्सोल" },
    "CLUSTER-AGX-801 • 3-Village Tomato Collection": { hi: "क्लस्टर-एजीएक्स-801 • 3-गांव टमाटर संग्रह", mr: "क्लस्टर-एजीएक्स-८०१ • ३-गाव टोमॅटो संकलन" },
    "🔐 Proof of Delivery (POD) & Gate Pass": { hi: "🔐 डिलीवरी प्रमाण (पीओडी) और गेट पास", mr: "🔐 पोहोच पावती (पीओडी) आणि गेट पास" },
    "📑 View e-Gate Pass": { hi: "📑 ई-गेट पास देखें", mr: "📑 ई-गेट पास पहा" },
    "✍️ Receiver Digital Signature (On-Screen Touch / Mouse):": { hi: "✍️ प्राप्तकर्ता के डिजिटल हस्ताक्षर (स्क्रीन स्पर्श / माउस):", mr: "✍️ स्वीकारणाऱ्याची डिजिटल स्वाक्षरी (स्क्रीन स्पर्श / माउस):" },
    "✓ Save Digital Signature & Record POD": { hi: "✓ डिजिटल हस्ताक्षर सहेजें और पीओडी दर्ज करें", mr: "✓ डिजिटल स्वाक्षरी जतन करा आणि पीओडी नोंदवा" },
    "Grievance Redressal Desk - AgriNex Logistics Portal": { hi: "शिकायत निवारण डेस्क - एग्रीनेक्स लॉजिस्टिक्स पोर्टल", mr: "तक्रार निवारण कक्ष - अ‍ॅग्रीनेक्स वाहतूक पोर्टल" },
    "(Tomato - 50 Qt) • Vehicle:": { hi: "(टमाटर - 50 क्विंटल) • वाहन:", mr: "(टोमॅटो - ५० क्विंटल) • वाहन:" },
    "AgriNex Logistics - Fleet Command & Telematics Operations": { hi: "एग्रीनेक्स लॉजिस्टिक्स - फ्लीट कमांड और टेलीमैटिक्स संचालन", mr: "अ‍ॅग्रीनेक्स वाहतूक - ताफा नियंत्रण व टेलिमेटिक्स कामकाज" },
    "100% Locked & Settled": { hi: "100% एस्क्रो सुरक्षित और भुगतान पूर्ण", mr: "१००% एस्क्रो सुरक्षित आणि जमा झाले" },
    "CLUSTER-AGX-801 • 3-Village Tomato Milk-Run": { hi: "क्लस्टर-एजीएक्स-801 • 3-गांव टमाटर संकलन फेरी", mr: "क्लस्टर-एजीएक्स-८०१ • ३-गाव टोमॅटो संकलन फेरी" },
    "Available for Pickup": { hi: "उठान के लिए उपलब्ध", mr: "उचलण्यासाठी उपलब्ध" },
    "⚡ Express Farm-to-Buyer Orders": { hi: "⚡ एक्सप्रेस खेत-से-खरीदार ऑर्डर", mr: "⚡ एक्स्प्रेस शेत-ते-खरेदीदार ऑर्डर्स" },
    "Buyer Destination": { hi: "खरीदार का गंतव्य", mr: "खरेदीदाराचे पोहोच ठिकाण" },
    "AgriNex - Logistics Passbook & Profile | Direct Trade · Better Tomorrow": { hi: "एग्रीनेक्स - लॉजिस्टिक्स पासबुक और प्रोफ़ाइल | सीधा व्यापार · बेहतर कल", mr: "अ‍ॅग्रीनेक्स - वाहतूक पासबुक आणि प्रोफाइल | थेट व्यापार · चांगले भविष्य" },
    "Fleet Captain • GreenWays Transit, Nashik Hub": { hi: "फ्लीट कैप्टन • ग्रीनवेज ट्रांजिट, नासिक केंद्र", mr: "वाहतूक कॅप्टन • ग्रीनवेज ट्रान्सिट, नाशिक केंद्र" },
    "📑 Print Passbook": { hi: "📑 पासबुक प्रिंट करें", mr: "📑 पासबुक प्रिंट करा" },
    "Crop & Quantity": { hi: "फसल और मात्रा", mr: "शेतमाल आणि प्रमाण" },
    "Print Passbook": { hi: "पासबुक प्रिंट करें", mr: "पासबुक प्रिंट करा" },
    "Print Pass": { hi: "पास प्रिंट करें", mr: "पास प्रिंट करा" },

    // Brand & Top Navigation
    "AgriNex": { hi: "एग्रीनेक्स", mr: "अ‍ॅग्रीनेक्स" },
    "Direct Trade · Better Tomorrow": { hi: "सीधा व्यापार · बेहतर कल", mr: "थेट व्यापार · चांगले भविष्य" },
    "Marketplace Control Center": { hi: "मार्केटप्लेस नियंत्रण केंद्र", mr: "मार्केटप्लेस नियंत्रण केंद्र" },
    "Dashboard": { hi: "डैशबोर्ड", mr: "डॅशबोर्ड" },
    "Bulk FPO Hauls": { hi: "थोक एफपीओ ढुलाई", mr: "घाऊक एफपीओ वाहतूक" },
    "Express Orders": { hi: "एक्सप्रेस ऑर्डर", mr: "एक्स्प्रेस ऑर्डर्स" },
    "LIVE": { hi: "लाइव", mr: "थेट" },
    "Passbook & Profile": { hi: "पासबुक और प्रोफ़ाइल", mr: "पासबुक आणि प्रोफाइल" },
    "Grievance Module": { hi: "शिकायत निवारण", mr: "तक्रार निवारण" },
    "Grievance Desk": { hi: "शिकायत डेस्क", mr: "तक्रार निवारण कक्ष" },
    "Support": { hi: "सहायता", mr: "मदत कक्ष" },
    "Search orders, crops, buyer locations...": { hi: "ऑर्डर, फसल, खरीदार का पता खोजें...", mr: "ऑर्डर्स, शेतमाल, खरेदीदारांचे ठिकाण शोधा..." },
    "Search crop lots, mandi rates, buyer bids, orders...": { hi: "फसल लॉट, मंडी भाव, बोलियां, ऑर्डर खोजें...", mr: "पिकांचे लॉट, बाजारभाव, खरेदीदार बोली शोधा..." },
    "Search consignments, waybills...": { hi: "कंसाइनमेंट, ई-वे बिल खोजें...", mr: "कन्साइनमेंट, ई-वे बिल शोधा..." },
    "Nashik Mandi Hub, Maharashtra": { hi: "नासिक मंडी हब, महाराष्ट्र", mr: "नाशिक कृषी बाजार केंद्र, महाराष्ट्र" },
    "Nashik Mandi Regional Logistics Hub, Maharashtra": { hi: "नासिक मंडी क्षेत्रीय लॉजिस्टिक्स हब, महाराष्ट्र", mr: "नाशिक बाजार प्रादेशिक वाहतूक केंद्र, महाराष्ट्र" },
    "Verified Fleet Partner • Nashik": { hi: "सत्यापित फ्लीट पार्टनर • नासिक", mr: "प्रमाणित वाहतूकदार • नाशिक" },
    "Verified Fleet Partner": { hi: "सत्यापित फ्लीट पार्टनर", mr: "प्रमाणित वाहतूकदार" },
    "Verified Nodal Fleet Partner": { hi: "सत्यापित नोडल फ्लीट पार्टनर", mr: "प्रमाणित नोडल वाहतूकदार" },
    "Logistics Partner": { hi: "लॉजिस्टिक्स पार्टनर", mr: "वाहतूक भागीदार" },
    "Senior Fleet Logistics Captain": { hi: "वरिष्ठ फ्लीट लॉजिस्टिक्स कैप्टन", mr: "वरिष्ठ वाहतूक फ्लीट कॅप्टन" },
    "Logout & Switch Role": { hi: "लॉगआउट और भूमिका बदलें", mr: "बाहेर पडा आणि भूमिका बदला" },
    "Connected Portals:": { hi: "जुड़े हुए पोर्टल:", mr: "जोडलेले पोर्टल्स:" },
    "Farmer Portal": { hi: "किसान पोर्टल", mr: "शेतकरी पोर्टल" },
    "Buyer Terminal": { hi: "खरीदार टर्मिनल", mr: "खरेदीदार टर्मिनल" },
    "Logistics Hub": { hi: "लॉजिस्टिक्स हब", mr: "वाहतूक केंद्र" },

    // Metric Stat Cards
    "Connected Trucks": { hi: "कनेक्टेड ट्रक", mr: "जोडलेले ट्रक्स" },
    "24 Vehicles": { hi: "24 वाहन", mr: "२४ वाहने" },
    "Ready for pickup": { hi: "लोडिंग के लिए तैयार", mr: "शेतमालाच्या लोडिंगसाठी तयार" },
    "Trips In Transit": { hi: "मार्ग में ट्रिप", mr: "मार्गावरील ट्रिप्स" },
    "4 Orders": { hi: "4 ऑर्डर", mr: "४ ऑर्डर्स" },
    "On highway right now": { hi: "अभी हाईवे पर सक्रिय", mr: "सध्या महामार्गावर धावत आहेत" },
    "On-Time Delivery": { hi: "समय पर डिलीवरी", mr: "वेळेवर पोहोच" },
    "Zero cold-chain spoilages": { hi: "शून्य कोल्ड-चेन खराबी", mr: "शून्य शेतमाल नासाडी" },
    "Zero transit spoilages": { hi: "शून्य परिवहन खराबी", mr: "वाहतुकीदरम्यान शून्य नुकसान" },
    "Freight Settled": { hi: "मालभाड़ा भुगतान", mr: "मिळालेले भाडे जमा" },
    "Freight Earned": { hi: "अर्जित मालभाड़ा", mr: "मिळालेले एकूण भाडे" },
    "100% Paid to bank account": { hi: "100% बैंक खाते में भुगतान", mr: "१००% बँक खात्यात जमा" },
    "On-Time Deliveries": { hi: "समय पर डिलीवरी", mr: "वेळेवर पोहोच" },
    "Zero transit damage": { hi: "परिवहन में शून्य नुकसान", mr: "वाहतुकीदरम्यान शून्य नुकसान" },
    "₹ 4.86 Lakh": { hi: "₹ 4.86 लाख", mr: "₹ ४.८६ लाख" },
    "Direct bank escrow": { hi: "सीधा बैंक एस्क्रो", mr: "थेट बँक एस्क्रो खात्यात" },
    "Smart escrow settlements": { hi: "स्मार्ट एस्क्रो भुगतान", mr: "स्मार्ट एस्क्रो सेटलमेंट" },
    "Active live highway trips": { hi: "सक्रिय लाइव हाईवे यात्राएं", mr: "सक्रिय महामार्ग फेऱ्या" },
    "Trucks connected via IoT GPS": { hi: "IoT GPS से जुड़े ट्रक", mr: "IoT GPS ने जोडलेले ट्रक्स" },

    // Tabs & Filters
    "All Dispatch Orders": { hi: "सभी प्रेषण ऑर्डर", mr: "सर्व डिस्पॅच ऑर्डर्स" },
    "Available Trips": { hi: "उपलब्ध ट्रिप", mr: "उपलब्ध ट्रिप्स" },
    "In Transit": { hi: "परिवहन में (सक्रिय)", mr: "मार्गावर (सुरू)" },
    "Available": { hi: "उपलब्ध", mr: "उपलब्ध" },
    "Delivered": { hi: "वितरित", mr: "वितरित झाले" },
    "Accepted": { hi: "स्वीकृत", mr: "स्वीकृत" },
    "Settled": { hi: "भुगतान पूर्ण", mr: "जमा झाले" },
    "✓ Settled": { hi: "✓ भुगतान पूर्ण", mr: "✓ जमा झाले" },
    "✓ Bank Escrow": { hi: "✓ बैंक एस्क्रो सुरक्षित", mr: "✓ बँक एस्क्रो सुरक्षित" },
    "Bank Escrow": { hi: "बैंक एस्क्रो", mr: "बँक एस्क्रो" },
    "Deliver Between:": { hi: "डिलीवरी समय:", mr: "वितरण वेळ:" },
    "DELIVER BETWEEN:": { hi: "डिलीवरी समय:", mr: "वितरण वेळ:" },
    "Delivery Window": { hi: "डिलीवरी समय सीमा", mr: "वितरण विंडो" },
    "Pickup Window": { hi: "लोडिंग समय सीमा", mr: "पिकअप वेळ" },
    "No orders in this tab.": { hi: "इस श्रेणी में कोई ऑर्डर नहीं है।", mr: "या विभागात कोणतीही ऑर्डर नाही." },

    // Table Headers
    "Crop & Order Code": { hi: "फसल और ऑर्डर कोड", mr: "शेतमाल व ऑर्डर कोड" },
    "Volume / Weight": { hi: "मात्रा / वजन", mr: "प्रमाण / वजन" },
    "Pickup Farm / Mandi": { hi: "पिकअप खेत / मंडी", mr: "पिकअप शेत / बाजार" },
    "Buyer & Destination": { hi: "खरीदार और गंतव्य", mr: "खरेदीदार व पोहोच ठिकाण" },
    "Freight Payment": { hi: "मालभाड़ा भुगतान", mr: "वाहतूक भाडे" },
    "Delivery Status & Window": { hi: "डिलीवरी स्थिति और समय", mr: "वितरण स्थिती व वेळ" },
    "Action": { hi: "कार्रवाई", mr: "कृती" },
    "Actions": { hi: "कार्रवाइयां", mr: "कृती" },

    // Action Buttons
    "Accept Trip": { hi: "ट्रिप स्वीकारें", mr: "ट्रिप स्वीकारा" },
    "Accept Haul": { hi: "ढुलाई स्वीकारें", mr: "वाहतूक स्वीकारा" },
    "Accept": { hi: "स्वीकारें", mr: "स्वीकारा" },
    "Gate Pass": { hi: "गेट पास", mr: "गेट पास" },
    "📑 Gate Pass": { hi: "📑 गेट पास", mr: "📑 गेट पास" },
    "Verify PIN": { hi: "पिन सत्यापित करें", mr: "पिन तपासा" },
    "Print Pass": { hi: "पास प्रिंट करें", mr: "पास प्रिंट करा" },
    "View in Google Maps": { hi: "गूगल मैप्स में देखें", mr: "गुगल मॅप्सवर पहा" },
    "Print / Save PDF": { hi: "प्रिंट / PDF सुरक्षित करें", mr: "प्रिंट / PDF सेव्ह करा" },
    "Confirm & View Delivery Map →": { hi: "पुष्टि करें और डिलीवरी मैप देखें →", mr: "निश्चित करा व वितरण नकाशा पहा →" },
    "Confirm & View Delivery Map": { hi: "पुष्टि करें और डिलीवरी मैप देखें", mr: "निश्चित करा व वितरण नकाशा पहा" },
    "Cancel": { hi: "रद्द करें", mr: "रद्द करा" },
    "Cancellation Policy and Terms": { hi: "रद्द करने की नीति और शर्तें", mr: "रद्द करण्याचे धोरण आणि अटी" },
    "Cancellation Policy": { hi: "रद्द करने की नीति", mr: "रद्द करण्याचे धोरण" },
    "Cancellation": { hi: "रद्दीकरण", mr: "रद्द करणे" },
    "Overall Performance Rating": { hi: "समग्र प्रदर्शन रेटिंग", mr: "एकूण कामगिरी गुणांकन" },
    "Overall Performance": { hi: "समग्र प्रदर्शन", mr: "एकूण कामगिरी" },
    "Performance": { hi: "प्रदर्शन", mr: "कामगिरी" },
    "Feedback": { hi: "प्रतिक्रिया", mr: "अभिप्राय" },
    "Close": { hi: "बंद करें", mr: "बंद करा" },
    "Update GPS Checkpoint": { hi: "GPS चेकपॉइंट अपडेट करें", mr: "GPS चेकपॉईंट अपडेट करा" },
    "Schedule Slot": { hi: "समय स्लॉट चुनें", mr: "वेळ स्लॉट निवडा" },
    "Select Pickup Slot": { hi: "पिकअप स्लॉट चुनें", mr: "पिकअप स्लॉट निवडा" },
    "Save & Confirm Slot": { hi: "स्लॉट सहेजें और पुष्टि करें", mr: "स्लॉट निश्चित करा" },

    // PIN Verification Modal
    "🔐 Complete Delivery": { hi: "🔐 डिलीवरी पूर्ण करें", mr: "🔐 माल पोहोच निश्चित करा" },
    "Ask the buyer receiving manager for their 4-digit PIN to confirm delivery and receive your freight payout.": {
      hi: "डिलीवरी की पुष्टि करने और अपना मालभाड़ा एस्क्रो भुगतान तुरंत प्राप्त करने के लिए खरीदार रिसीविंग मैनेजर से उनका 4-अंकीय पिन मांगें।",
      mr: "माल पोहोचल्याची खात्री करण्यासाठी आणि आपले वाहतूक भाडे लगेच खात्यात जमा करण्यासाठी खरेदीदार व्यवस्थापकाकडून ४-अंकी पिन घ्या."
    },
    "Ask the buyer receiving manager for their": { hi: "खरीदार रिसीविंग मैनेजर से उनका", mr: "खरेदीदार व्यवस्थापकाकडून" },
    "4-digit PIN": { hi: "4-अंकीय पिन", mr: "४-अंकी पिन" },
    "to confirm delivery and receive your freight payout.": { hi: "मांगकर डिलीवरी की पुष्टि करें और मालभाड़ा भुगतान पाएं।", mr: "घेऊन माल वितरणाची खात्री करा व भाडे मिळवा." },
    "Enter 4-Digit Delivery PIN": { hi: "4-अंकीय डिलीवरी पिन दर्ज करें", mr: "४-अंकी वितरण पिन टाका" },
    "e.g. 5519": { hi: "उदा. 5519", mr: "उदा. ५५१९" },
    "✓ Verify & Complete": { hi: "✓ सत्यापित करें और पूरा करें", mr: "✓ तपासा आणि पूर्ण करा" },

    // Digital Gate Pass Modal
    "DIGITAL MANDI TRANSIT GATE PASS": { hi: "डिजिटल मंडी पारगमन गेट पास", mr: "डिजिटल कृषी बाजार वाहतूक गेट पास" },
    "Official MSAMB Digital Transit Clear Pass": { hi: "महाराष्ट्र राज्य कृषि विपणन बोर्ड (MSAMB) आधिकारिक डिजिटल गेट पास", mr: "महाराष्ट्र राज्य कृषी पणन मंडळ (MSAMB) अधिकृत डिजिटल गेट पास" },
    "Digital Gate Pass": { hi: "डिजिटल गेट पास", mr: "डिजिटल गेट पास" },
    "Gate Pass": { hi: "गेट पास", mr: "गेट पास" },
    "Digital": { hi: "डिजिटल", mr: "डिजिटल" },
    "Feedback Form": { hi: "प्रतिक्रिया प्रपत्र", mr: "अभिप्राय अर्ज" },
    "Feedback": { hi: "प्रतिक्रिया", mr: "अभिप्राय" },
    "Form": { hi: "प्रपत्र", mr: "अर्ज" },
    "Active Shipments": { hi: "सक्रिय शिपमेंट", mr: "सक्रिय वाहतूक" },
    "e-Way Bill No:": { hi: "ई-वे बिल क्र:", mr: "ई-वे बिल क्र:" },
    "GATE PASS ID:": { hi: "गेट पास आईडी:", mr: "गेट पास क्रमांक:" },
    "PRODUCE & VOLUME": { hi: "शेतमाल और मात्रा", mr: "शेतमाल व वजन" },
    "ASSIGNED VEHICLE & REEFER": { hi: "आवंटित वाहन और रीफर", mr: "नेमलेले वाहन व शीतगृह" },
    "Origin Mandi:": { hi: "उत्पत्ति मंडी:", mr: "सुरुवातीची बाजार समिती:" },
    "Destination:": { hi: "गंतव्य स्थान:", mr: "पोहोचण्याचे ठिकाण:" },
    "Exact Distance & Time:": { hi: "सटीक दूरी और समय:", mr: "अचूक अंतर व वेळ:" },
    "Guaranteed Freight Escrow:": { hi: "गारंटीकृत मालभाड़ा एस्क्रो:", mr: "हमी दिलेले वाहतूक एस्क्रो भाडे:" },
    "Pickup Origin:": { hi: "पिकअप स्थान:", mr: "पिकअप ठिकाण:" },
    "Deliver to:": { hi: "डिलीवरी स्थान:", mr: "वितरण ठिकाण:" },
    "Weight / Volume:": { hi: "वजन / मात्रा:", mr: "वजन / प्रमाण:" },
    "Distance & Time:": { hi: "दूरी और समय:", mr: "अंतर व वेळ:" },
    "Freight Pay:": { hi: "मालभाड़ा देय:", mr: "मिळणारे भाडे:" },
    "Pickup:": { hi: "पिकअप:", mr: "पिकअप:" },

    // Bulk FPO Hauls Page (`fpo-hauls.html`)
    "Heavy Bulk Freight & Multi-Farm Sourcing": { hi: "भारी थोक माल ढुलाई और बहु-कृषि संकलन", mr: "मोठी घाऊक वाहतूक व थेट शेतकरी गट एकत्रीकरण" },
    "Bulk FPO Cooperative Hauls": { hi: "थोक एफपीओ सहकारी ढुलाई", mr: "घाऊक FPO सहकारी शेतमाल वाहतूक" },
    "Combined multi-farmer batches with guaranteed bulk freight payments": { hi: "गारंटीकृत थोक मालभाड़ा भुगतान के साथ कई किसानों के संयुक्त बैच", mr: "हमी दिलेल्या घाऊक भाडे रकमेसह एकत्रित शेतकरी बॅच वाहतूक" },
    "FPO Collective Hauls": { hi: "एफपीओ सामूहिक ढुलाई", mr: "FPO शेतकरी उत्पादक गट वाहतूक" },
    "High-tonnage aggregation hauls directly from farmer producer organizations (FPOs) across Maharashtra.": {
      hi: "महाराष्ट्र भर के किसान उत्पादक संगठनों (FPO) से सीधे उच्च टन भार वाली थोक उपज ढुलाई।",
      mr: "महाराष्ट्रातील शेतकरी उत्पादक कंपन्यांकडून (FPO) थेट मोठ्या क्षमतेची घाऊक शेतमाल वाहतूक."
    },
    "Bulk FPO Aggregation Haul": { hi: "थोक एफपीओ एकत्रीकरण ढुलाई", mr: "घाऊक एफपीओ संकलन वाहतूक" },
    "Export Port Haul": { hi: "निर्यात बंदर ढुलाई", mr: "निर्यात बंदर वाहतूक" },
    "Processing Plant Direct": { hi: "प्रसंस्करण संयंत्र सीधी ढुलाई", mr: "प्रक्रिया उद्योग थेट वाहतूक" },
    "Inter-State Corridor Haul": { hi: "अंतर्राज्यीय कॉरिडोर ढुलाई", mr: "आंतरराज्य कॉरिडोअर वाहतूक" },
    "Flexible FPO Aggregation Window (6 hrs)": { hi: "लचीली एफपीओ संकलन समय सीमा (6 घंटे)", mr: "लवचिक FPO एकत्रीकरण वेळ (६ तास)" },
    "Morning Harvest Window": { hi: "सुबह की फसल कटाई समय सीमा", mr: "सकाळची काढणी वेळ" },

    // Express Local Orders Page (`individual-orders.html`)
    "Individual Lot Pickups & Deliveries": { hi: "व्यक्तिगत लॉट पिकअप और डिलीवरी", mr: "वैयक्तिक शेतकरी लॉट पिकअप व वितरण" },
    "Express Local Orders": { hi: "लोकल एक्सप्रेस ऑर्डर", mr: "स्थानिक एक्स्प्रेस ऑर्डर्स" },
    "Same-day & next-morning farm pickups for perishable crops under 100 Quintals across Maharashtra APMC yards.": {
      hi: "महाराष्ट्र के एपीएमसी यार्डों में 100 क्विंटल से कम की खराब होने वाली फसलों के लिए उसी दिन और अगली सुबह खेत से पिकअप।",
      mr: "महाराष्ट्रातील बाजार समित्यांमध्ये १०० क्विंटलपर्यंतच्या नाशवंत शेतमालाची त्याच दिवशी किंवा दुसऱ्या दिवशी सकाळी थेट शेतातून वाहतूक."
    },
    "Express Farm Gate Dispatch": { hi: "एक्सप्रेस फार्म गेट प्रेषण", mr: "एक्स्प्रेस थेट शेतातून वाहतूक" },
    "Perishable Express Reefer": { hi: "नाशवान एक्सप्रेस रीफर", mr: "नाशवंत एक्स्प्रेस शीतवाहतूक" },
    "Processing Lot Dispatch": { hi: "प्रसंस्करण लॉट प्रेषण", mr: "प्रक्रिया लॉट वाहतूक" },

    // GPS Tracking Page (`gps-tracking.html`)
    "Real-Time Reefer Fleet GPS & IoT Telemetry": { hi: "रीफर फ्लीट लाइव जीपीएस और आईओटी टेलीमेट्री", mr: "रीफर वाहने थेट जीपीएस व आयओटी मॉनिटरिंग" },
    "Live GPS Tracking": { hi: "लाइव जीपीएस ट्रैकिंग", mr: "थेट GPS ट्रॅकिंग" },
    "Real-time sensor telemetry, refrigeration temp, waypoint transit milestones & digital signatures.": {
      hi: "रीयल-टाइम सेंसर टेलीमेट्री, प्रशीतन तापमान, मार्ग माइलस्टोन और डिजिटल हस्ताक्षर।",
      mr: "थेट सेन्सर माहिती, शीतगृह तापमान, महामार्ग टप्पे व डिजिटल स्वाक्षरी."
    },
    "Live Telemetry Stream": { hi: "लाइव टेलीमेट्री स्ट्रीम", mr: "थेट टेलीमेट्री माहिती" },
    "Trip In Transit": { hi: "मार्ग में ट्रिप (सक्रिय)", mr: "मार्गावर सुरू असलेली फेरी" },
    "Vehicle & Model": { hi: "वाहन और मॉडल", mr: "वाहन व मॉडेल" },
    "Tata 407 High-Deck Cold-Chain Reefer": { hi: "टाटा 407 हाई-डेक कोल्ड-चेन रीफर", mr: "टाटा ४०७ हाय-डेक शीतगृह रीफर" },
    "Temperature": { hi: "तापमान", mr: "तापमान" },
    "Optimal (4.0°C - 6.0°C)": { hi: "अनुकूल (4.0°C - 6.0°C)", mr: "उत्कृष्ट (४.०°C - ६.०°C)" },
    "Humidity": { hi: "आर्द्रता (नमी)", mr: "हवेतील आर्द्रता" },
    "Cargo Freshness": { hi: "उपज ताजगी स्कोर", mr: "शेतमाल ताजेपणा" },
    "Speed": { hi: "गति", mr: "वेग" },
    "EV Battery": { hi: "ईवी बैटरी", mr: "बॅटरी क्षमता" },
    "Fuel Range": { hi: "ईंधन रेंज", mr: "इंधन अंतर क्षमता" },
    "Current Location": { hi: "वर्तमान स्थान", mr: "सध्याचे ठिकाण" },
    "Last GPS Ping": { hi: "अंतिम जीपीएस सिग्नल", mr: "शेवटचे GPS लोकेशन" },
    "Just now (4G Telematics)": { hi: "अभी-अभी (4G टेलीमैटिक्स)", mr: "आत्ताच (४G टेलीमॅटिक्स)" },
    "Farm Gate Loaded": { hi: "खेत से लोड किया गया", mr: "शेतातून माल भरला" },
    "Advance Paid": { hi: "अग्रिम भुगतान प्राप्त", mr: "अ‍ॅडव्हान्स भाडे मिळाले" },
    "On Highway": { hi: "हाईवे पर जारी", mr: "महामार्गावर धावत आहे" },
    "Highway Delivered": { hi: "हाईवे पारगमन संपन्न", mr: "महामार्ग प्रवास पूर्ण" },
    "Delivered & Settled": { hi: "वितरित व पूर्ण भुगतान", mr: "पोहोचले व पूर्ण भाडे जमा" },
    "Kasara Ghat Highway Bypass, NH-160, MH": { hi: "कसारा घाट हाईवे बाईपास, NH-160, महाराष्ट्र", mr: "कसारा घाट महामार्ग बायपास, NH-१६०, महाराष्ट्र" },
    "Igatpuri": { hi: "इगतपुरी", mr: "इगतपुरी" },
    "Asangaon": { hi: "आसनगांव", mr: "आसनगाव" },
    "Bhiwandi Bypass": { hi: "भिवंडी बाईपास", mr: "भिवंडी बायपास" },
    "📍 Farm Pickup Origin": { hi: "📍 खेत पिकअप उद्गम", mr: "📍 शेतातून माल भरण्याचे मूळ ठिकाण" },
    "Farm Pickup Origin": { hi: "खेत पिकअप उद्गम", mr: "शेतातून माल भरण्याचे ठिकाण" },

    // Grievance Module Page (`grievance.html`)
    "Fleet Support Desk": { hi: "फ्लीट सहायता डेस्क", mr: "फ्लीट मदत कक्ष" },
    "Maharashtra Highway Logistics Redressal": { hi: "महाराष्ट्र हाईवे लॉजिस्टिक्स निवारण", mr: "महाराष्ट्र महामार्ग वाहतूक तक्रार निवारण" },
    "Logistics & Highway Transit Redressal": { hi: "लॉजिस्टिक्स और हाईवे पारगमन निवारण", mr: "वाहतूक आणि महामार्ग पारगमन तक्रार निवारण" },
    "File urgent disputes for buyer PIN refusal, loading dock detentions, tare weight discrepancies, or transit toll delays with instant APMC nodal escalation.": {
      hi: "खरीदार पिन इनकार, लोडिंग डॉक रोक, धर्मकांटा विसंगतियों या टोल देरी के लिए तत्काल एपीएमसी नोडल समाधान हेतु शिकायत दर्ज करें।",
      mr: "खरेदीदाराकडून पिन नकार, डॉकवरील अडवणूक, वजनकाटा तफावत किंवा टोल विलंब यावर तत्काळ APMC नोडल निवारणासाठी तक्रार दाखल करा."
    },
    "Highway Helpline: 1800-425-4490": { hi: "हाईवे हेल्पलाइन: 1800-425-4490", mr: "महामार्ग हेल्पलाईन: १८००-४२५-४४९०" },
    "📞 Highway Helpline: 1800-425-4490": { hi: "📞 हाईवे हेल्पलाइन: 1800-425-4490", mr: "📞 महामार्ग हेल्पलाईन: १८००-४२५-४४९०" },
    "+ Raise New Ticket": { hi: "+ नया टिकट दर्ज करें", mr: "+ नवीन तक्रार नोंदवा" },
    "+ File New Complaint": { hi: "+ नई शिकायत दर्ज करें", mr: "+ नवीन तक्रार नोंदवा" },
    "Active Disputes": { hi: "सक्रिय विवाद", mr: "सक्रिय तक्रारी" },
    "1 Ticket": { hi: "1 टिकट", mr: "१ तक्रार" },
    "Under Review": { hi: "समीक्षाधीन", mr: "तपासणी सुरू" },
    "Avg. Resolution": { hi: "औसत समाधान समय", mr: "सरासरी निवारण वेळ" },
    "4.2 Hours": { hi: "4.2 घंटे", mr: "४.२ तास" },
    "Fast Track Highway Redressal": { hi: "फास्ट ट्रैक हाईवे निवारण", mr: "जलद गती महामार्ग निवारण" },
    "Settled Tickets": { hi: "निस्तारित टिकटें", mr: "निकाली काढलेल्या तक्रारी" },
    "Resolved Tickets": { hi: "निस्तारित टिकटें", mr: "निकाली काढलेल्या तक्रारी" },
    "18 Resolved": { hi: "18 निस्तारित", mr: "१८ निकाली" },
    "100% Freight Recovered": { hi: "100% मालभाड़ा प्राप्त", mr: "१००% भाडे वसूल" },
    "Escrow Compensation": { hi: "एस्क्रो मुआवजा", mr: "एस्क्रो भरपाई" },
    "₹ 34,500": { hi: "₹ 34,500", mr: "₹ ३४,५००" },
    "Detention & waiting fees paid": { hi: "अनावश्यक रोक और प्रतीक्षा शुल्क भुगतान", mr: "थांबून राहिल्याबद्दल मिळालेली नुकसान भरपाई" },
    "Your Filed Grievance Tickets": { hi: "आपकी दर्ज शिकायतें", mr: "आपण दाखल केलेली तक्रार तिकिटे" },
    "Track live escalation status with APMC Highway Arbitration Team": { hi: "एपीएमसी हाईवे मध्यस्थता दल के साथ लाइव स्थिति ट्रैक करें", mr: "APMC महामार्ग लवाद पथकासह थेट निवारण स्थिती पहा" },
    "TICKET #LOG-GRV-8819 • UNDER INVESTIGATION": { hi: "टिकट #LOG-GRV-8819 • जांच जारी", mr: "तक्रार क्र #LOG-GRV-8819 • चौकशी सुरू" },
    "Receiving Dock Detention & PIN Delay at Thane DC": { hi: "ठाणे डीसी पर रिसीविंग डॉक रोक और पिन में देरी", mr: "ठाणे वितरण केंद्रात (DC) वाहनाची अडवणूक आणि पिन मिळण्यास विलंब" },
    "Pending Escrow Payout: ₹ 4,200": { hi: "लंबित एस्क्रो भुगतान: ₹ 4,200", mr: "प्रलंबित एस्क्रो भाडे: ₹ ४,२००" },
    "Filed 45 mins ago": { hi: "45 मिनट पहले दर्ज", mr: "४५ मिनिटांपूर्वी नोंदवले" },
    "Submitted": { hi: "दर्ज किया गया", mr: "नोंदवले" },
    "APMC Nodal Review": { hi: "एपीएमसी नोडल समीक्षा", mr: "APMC नोडल तपासणी" },
    "Dock Manager Notice": { hi: "डॉक मैनेजर को नोटिस", mr: "डॉक मॅनेजरला नोटीस" },
    "Escrow Auto-Release": { hi: "एस्क्रो स्वतः रिलीज", mr: "एस्क्रो खात्यातून थेट रक्कम जमा" },
    "Latest Nodal Action (10 mins ago):": { hi: "ताजा नोडल कार्रवाई (10 मिनट पहले):", mr: "नोडल अधिकाऱ्यांची ताजी कृती (१० मिनिटांपूर्वी):" },
    "APMC Officer Sunil More has issued an automated 30-minute notice to AgriFoods receiving manager. If the PIN is not confirmed or unloading completed within 30 mins, 100% freight payout plus ₹ 500/hr detention fee will be released automatically.": {
      hi: "एपीएमसी अधिकारी सुनील मोरे ने एग्रीफूड्स रिसीविंग मैनेजर को स्वचालित 30 मिनट का नोटिस जारी किया है। यदि 30 मिनट के भीतर पिन की पुष्टि नहीं की जाती है या अनलोडिंग पूरी नहीं होती है, तो 100% मालभाड़ा भुगतान और ₹ 500/घंटा की दर से रोक शुल्क स्वचालित रूप से जारी कर दिया जाएगा।",
      mr: "APMC अधिकारी सुनील मोरे यांनी अ‍ॅग्रीफूड्स व्यवस्थापकाला ३० मिनिटांची नोटीस बजावली आहे. ३० मिनिटांत पिन न दिल्यास किंवा अनलोडिंग न झाल्यास १००% भाडे अधिक ₹ ५००/तास विलंब शुल्क थेट चालकाच्या खात्यात जमा केले जाईल."
    },
    "Call Nodal Officer": { hi: "नोडल अधिकारी को कॉल करें", mr: "नोडल अधिकाऱ्यास कॉल करा" },
    "📞 Call Nodal Officer": { hi: "📞 नोडल अधिकारी को कॉल करें", mr: "📞 नोडल अधिकाऱ्यास कॉल करा" },
    "Add Photo Evidence": { hi: "फोटो साक्ष्य जोड़ें", mr: "फोटो पुरावा जोडा" },
    "TICKET #LOG-GRV-8410 • RESOLVED & PAID": { hi: "टिकट #LOG-GRV-8410 • निस्तारित और भुगतान संपन्न", mr: "तक्रार क्र #LOG-GRV-8410 • निवारण पूर्ण व भाडे जमा" },
    "Weighbridge Calibration Discrepancy (Lasalgaon Yard)": { hi: "धर्मकांटा अंशांकन विसंगति (लासलगांव यार्ड)", mr: "वजनकाटा कॅलिब्रेशन तफावत (लासलगाव यार्ड)" },
    "Compensated: ₹ 11,200": { hi: "मुआवजा प्राप्त: ₹ 11,200", mr: "नुकसान भरपाई: ₹ ११,२००" },
    "✓ Settled to UPI": { hi: "✓ यूपीआई में भुगतान संपन्न", mr: "✓ UPI खात्यात जमा" },
    "Mandi Tare weighbridge slip verified against certified digital scale. Full freight released to driver account within 2 hours.": {
      hi: "प्रमाणित डिजिटल तराजू के साथ मंडी खाली वजन (टियर वेट) पर्ची का सत्यापन किया गया। 2 घंटे के भीतर चालक के खाते में पूरा मालभाड़ा जारी कर दिया गया।",
      mr: "प्रमाणित डिजिटल स्केलवरून बाजार समितीची रिकाम्या वाहनाची वजन पावती तपासण्यात आली. २ तासांच्या आत चालकाच्या खात्यावर पूर्ण भाडे जमा करण्यात आले."
    },
    "Logistics Grievance & Helpdesk": { hi: "लॉजिस्टिक्स शिकायत निवारण व सहायता", mr: "वाहतूक तक्रार निवारण व मदत कक्ष" },
    "Grievance Redressal": { hi: "शिकायत निवारण", mr: "तक्रार निवारण कक्ष" },
    "Fast-track resolution for highway detentions, weighbridge disputes & payment releases": {
      hi: "हाईवे रोक, धर्मकांटा (वजन) विवाद और भुगतान रिलीज के लिए त्वरित समाधान",
      mr: "महामार्ग अडवणूक, वजनकाटा तफावत व भाडे मंजुरीसाठी जलद निवारण"
    },
    "File New Grievance": { hi: "नई शिकायत दर्ज करें", mr: "नवीन तक्रार नोंदवा" },
    "Call Toll-Free Helpline": { hi: "टोल-फ्री हेल्पलाइन कॉल करें", mr: "टोल-फ्री हेल्पलाईनवर कॉल करा" },
    "Active Dispute Tickets": { hi: "सक्रिय शिकायत टिकट", mr: "सक्रिय तक्रार तिकिटे" },
    "TICKET #": { hi: "टिकट #", mr: "तक्रार क्र #" },
    "UNDER INVESTIGATION": { hi: "जांच जारी", mr: "चौकशी सुरू" },
    "RESOLVED": { hi: "निस्तारित", mr: "निकाली काढले" },
    "Grievance Category *": { hi: "शिकायत श्रेणी *", mr: "तक्रारीचा प्रकार *" },
    "Consignment / Order ID *": { hi: "कंसाइनमेंट / ऑर्डर आईडी *", mr: "कन्साइनमेंट / ऑर्डर क्र *" },
    "Details of Issue & Location *": { hi: "समस्या का विवरण और स्थान *", mr: "समस्येचा तपशील व ठिकाण *" },
    "Buyer Refusal / Delay to Share 4-Digit Delivery PIN": { hi: "खरीदार द्वारा 4-अंकीय डिलीवरी पिन देने में देरी / इनकार", mr: "खरेदीदाराने ४-अंकी वितरण पिन देण्यास नकार / विलंब" },
    "Loading Dock Detention (>3 Hours Unloading Delay)": { hi: "लोडिंग डॉक पर अत्यधिक रोक (>3 घंटे अनलोडिंग में देरी)", mr: "डॉकवर वाहनाची अडवणूक (अनलोडिंगसाठी ३ तासांपेक्षा जास्त विलंब)" },
    "Weighbridge / Tare Weight Discrepancy": { hi: "धर्मकांटा / खाली वजन (टियर वेट) में विसंगति", mr: "वजनकाटा / वाहनाच्या रिकाम्या वजनात तफावत" },
    "Highway Breakdown / Mechanical Assistance": { hi: "हाईवे ब्रेकडाउन / यांत्रिक आपातकालीन सहायता", mr: "महामार्गावर वाहन बिघाड / मेकॅनिकल मदत" },
    "Freight Escrow Payout Delay": { hi: "मालभाड़ा एस्क्रो भुगतान में देरी", mr: "वाहतूक भाडे एस्क्रो खात्यातून मिळण्यास विलंब" },
    "Describe what happened, dock location, buyer name, delay hours...": {
      hi: "क्या हुआ, डॉक का स्थान, खरीदार का नाम, देरी के घंटे आदि का विवरण दें...",
      mr: "काय अडचण आली, गोदामाचे ठिकाण, खरेदीदाराचे नाव, विलंबाचे तास लिहा..."
    },
    "⚡ Urgent priority tickets are routed directly to the Maharashtra APMC Highway Flying Squad.": {
      hi: "⚡ आपातकालीन प्राथमिकता वाले टिकट सीधे महाराष्ट्र एपीएमसी हाईवे फ्लाइंग स्क्वाड को भेजे जाते हैं।",
      mr: "⚡ तातडीच्या तक्रारी थेट महाराष्ट्र कृषी पणन महामार्ग भरारी पथकाकडे वर्ग केल्या जातात."
    },
    "Submit Emergency Ticket": { hi: "आपातकालीन टिकट जमा करें", mr: "तातडीची तक्रार दाखल करा" },

    // Passbook & Profile Page (`profile.html`)
    "Logistics Operator Profile & Fleet Settings": { hi: "लॉजिस्टिक्स ऑपरेटर प्रोफ़ाइल व फ्लीट सेटिंग्स", mr: "वाहतूकदार प्रोफाइल व फ्लीट तपशील" },
    "Driver & Fleet Profile": { hi: "चालक और फ्लीट प्रोफ़ाइल", mr: "चालक व फ्लीट प्रोफाइल" },
    "Commercial carrier credentials, bank account link & digital freight ledger.": {
      hi: "व्यावसायिक वाहक प्रमाण पत्र, बैंक खाता लिंक और डिजिटल मालभाड़ा खाता।",
      mr: "व्यावसायिक वाहतूक परवाने, बँक खाते व डिजिटल भाडे पासबुक."
    },
    "Carrier Identity & Credentials": { hi: "वाहक पहचान और प्रमाण पत्र", mr: "वाहतूकदाराची ओळख व कागदपत्रे" },
    "Fleet Captain": { hi: "फ्लीट कैप्टन", mr: "फ्लीट कॅप्टन" },
    "Driving License (Commercial Heavy)": { hi: "ड्राइविंग लाइसेंस (कमर्शियल भारी वाहन)", mr: "वाहन चालवण्याचा परवाना (अवजड व्यावसायिक)" },
    "FASTag Commercial ID": { hi: "फास्टैग कमर्शियल आईडी", mr: "फास्टॅग व्यावसायिक आयडी" },
    "Reefer Calibration Certificate": { hi: "रीफर तापमान अंशांकन प्रमाण पत्र", mr: "शीतगृह तापमान प्रमाणिकरण दाखला" },
    "Settlement Bank Account": { hi: "भुगतान बैंक खाता", mr: "भाडे जमा होणारे बँक खाते" },
    "Bank Name": { hi: "बैंक का नाम", mr: "बँकेचे नाव" },
    "Account Number": { hi: "खाता संख्या", mr: "खाते क्रमांक" },
    "IFSC Code": { hi: "आईएफएससी कोड", mr: "IFSC कोड" },
    "UPI ID": { hi: "यूपीआई आईडी", mr: "UPI आयडी" },
    "Settlement Mode": { hi: "भुगतान प्रणाली", mr: "पैसे मिळण्याची पद्धत" },
    "Automatic Instant Escrow Settlement upon PIN Verification": {
      hi: "पिन सत्यापन होते ही स्वचालित त्वरित एस्क्रो भुगतान",
      mr: "पिन पडताळणी पूर्ण होताच थेट एस्क्रो खात्यातून खात्यात रक्कम जमा"
    },
    "Freight Payout Passbook": { hi: "मालभाड़ा भुगतान पासबुक", mr: "मिळालेल्या भाड्याचे पासबुक" },
    "Transaction ID": { hi: "लेनदेन आईडी", mr: "व्यवहार क्रमांक" },
    "Order Code": { hi: "ऑर्डर कोड", mr: "ऑर्डर कोड" },
    "Crop": { hi: "फसल", mr: "शेतमाल" },
    "Buyer": { hi: "खरीदार", mr: "खरेदीदार" },
    "Freight Payout": { hi: "मालभाड़ा राशि", mr: "मिळालेले भाडे" },
    "Settlement Date": { hi: "भुगतान तिथि", mr: "जमा झालेली तारीख" },
    "Status": { hi: "स्थिति", mr: "स्थिती" },

    // Agricultural Produce / Crops
    "Red Onion (Nashik Export Grade)": { hi: "लाल प्याज (नासिक निर्यात ग्रेड)", mr: "लाल कांदा (नाशिक निर्यात प्रत)" },
    "Red Onion (Lasalgaon Garwa)": { hi: "लाल प्याज (लासलगांव गरवा)", mr: "लाल कांदा (लासलगाव गरवा)" },
    "Red Onion": { hi: "लाल प्याज", mr: "लाल कांदा" },
    "Hybrid Tomato (Narayangaon / Junnar)": { hi: "हाइब्रिड टमाटर (नारायणगांव / जुन्नर)", mr: "संकरित टोमॅटो (नारायणगाव / जुन्नर)" },
    "Tomato (Shivam Hybrid)": { hi: "टमाटर (शिवम हाइब्रिड)", mr: "टोमॅटो (शिवम संकरित)" },
    "Hybrid Tomato": { hi: "हाइब्रिड टमाटर", mr: "संकरित टोमॅटो" },
    "Tomato": { hi: "टमाटर", mr: "टोमॅटो" },
    "Salem Turmeric Finger (High Curcumin)": { hi: "सेलम हल्दी फिंगर (उच्च करक्यूमिन)", mr: "सेलम हळद कांडी (उच्च करक्युमिन)" },
    "Salem Turmeric": { hi: "सेलम हल्दी", mr: "सेलम हळद" },
    "Turmeric": { hi: "हल्दी", mr: "हळद" },
    "Fresh Pomegranate (Bhagwa Super Grade)": { hi: "ताज़ा अनार (भगवा सुपर ग्रेड)", mr: "ताजी डाळिंब (भगवा सुपर प्रत)" },
    "Pomegranate (Bhagwa)": { hi: "अनार (भगवा)", mr: "डाळिंब (भगवा)" },
    "Pomegranate": { hi: "अनार", mr: "डाळिंब" },
    "Yellow Soybean (JS 335 / High Protein)": { hi: "पीला सोयाबीन (JS 335 / उच्च प्रोटीन)", mr: "पिवळी सोयाबीन (JS 335 / उच्च प्रथिने)" },
    "Yellow Soybean": { hi: "पीला सोयाबीन", mr: "पिवळी सोयाबीन" },
    "Soybeans": { hi: "सोयाबीन", mr: "सोयाबीन" },
    "Soybean": { hi: "सोयाबीन", mr: "सोयाबीन" },
    "Seed Cotton (Medium Staple 29mm)": { hi: "कपास (मध्यम स्टेपल 29mm)", mr: "कापूस (मध्यम धागा २९ मिमी)" },
    "Seed Cotton": { hi: "कपास", mr: "कापूस" },
    "Cotton": { hi: "कपास", mr: "कापूस" },
    "Grand Naine Banana (GI Khandesh Export)": { hi: "ग्रैंड नैन केला (जीआई खानदेश निर्यात)", mr: "ग्रँड नैन केळी (GI खान्देश निर्यात)" },
    "Banana": { hi: "केला", mr: "केळी" },

    // Farmers & Locations
    "Nashik Agro Farmer Producer Co. (NAFPO)": { hi: "नासिक एग्रो किसान उत्पादक कंपनी (NAFPO)", mr: "नाशिक अ‍ॅग्रो शेतकरी उत्पादक कंपनी (NAFPO)" },
    "Nashik Onion Growers Consortium": { hi: "नासिक प्याज उत्पादक संघ", mr: "नाशिक कांदा उत्पादक शेतकरी गट" },
    "Sangli Spices Producer Co.": { hi: "सांगली मसाला उत्पादक कंपनी", mr: "सांगली मसाले उत्पादक कंपनी" },
    "Junnar Tomato Farmers Collective": { hi: "जुन्नर टमाटर किसान समूह", mr: "जुन्नर टोमॅटो शेतकरी गट" },
    "Patil Rameshwar": { hi: "पाटिल रामेश्वर", mr: "पाटील रामेश्वर" },
    "Ramesh Patel": { hi: "रमेश पटेल", mr: "रमेश पटेल" },
    "Kishor Ahire": { hi: "किशोर अहिरे", mr: "किशोर अहिरे" },
    "Sanjay Deshmukh": { hi: "संजय देशमुख", mr: "संजय देशमुख" },
    "Rajesh Shinde": { hi: "राजेश शिंदे", mr: "राजेश शिंदे" },
    "Govind Marathe": { hi: "गोविंद मराठे", mr: "गोविंद मराठे" },
    "Dinesh Yadav": { hi: "दिनेश यादव", mr: "दिनेश यादव" },
    "Lasalgaon Mandi Yard": { hi: "लासलगांव मंडी यार्ड", mr: "लासलगाव बाजार समिती यार्ड" },
    "Narayangaon APMC": { hi: "नारायणगांव एपीएमसी", mr: "नारायणगाव बाजार समिती" },
    "Pimpalgaon Baswant APMC": { hi: "पिंपलगांव बसवंत एपीएमसी", mr: "पिंपळगाव बसवंत बाजार समिती" },
    "Sangli Turmeric Market Yard": { hi: "सांगली हल्दी मार्केट यार्ड", mr: "सांगली हळद मार्केट यार्ड" },
    "Mumbai Central APMC Terminal": { hi: "मुंबई सेंट्रल एपीएमसी टर्मिनल", mr: "मुंबई मध्यवर्ती APMC मार्केट" },
    "Vashi APMC Wholesale Market": { hi: "वाशी एपीएमसी थोक बाजार", mr: "वाशी APMC घाऊक बाजार" },
    "JNPT Port Export Terminal": { hi: "जेएनपीटी पोर्ट निर्यात टर्मिनल", mr: "JNPT बंदर निर्यात टर्मिनल" },
    "Balaji Wafers DC": { hi: "बालाजी वेफर्स वितरण केंद्र (DC)", mr: "बालाजी वेफर्स वितरण केंद्र" },
    "Reliance Fresh Supply Chain Hub": { hi: "रिलायंस फ्रेश सप्लाई चेन हब", mr: "रिलायन्स फ्रेश पुरवठा केंद्र" },
    "AgriFoods DC": { hi: "एग्रीफूड्स वितरण केंद्र (DC)", mr: "अ‍ॅग्रीफूड्स वितरण केंद्र" },
    "BigBasket Direct Farm Sourcing": { hi: "बिगबास्केट डायरेक्ट फार्म सोर्सिंग", mr: "बिगबास्केट थेट शेतमाल खरेदी" }
  };

  // REVERSE DICTIONARIES & BIDIRECTIONAL LOCALIZATION
  const REVERSE_LOGISTICS_MAP = {};
  const REVERSE_LOGISTICS_SUBSTRINGS = [];

  function buildLogisticsReverseMap() {
    for (const [en, v] of Object.entries(PHRASE_MAP)) {
      if (v.hi) {
        REVERSE_LOGISTICS_MAP[v.hi.toLowerCase().trim()] = en;
        REVERSE_LOGISTICS_SUBSTRINGS.push({ foreign: v.hi.trim(), en: en });
      }
      if (v.mr && v.mr.toLowerCase().trim() !== (v.hi && v.hi.toLowerCase().trim())) {
        REVERSE_LOGISTICS_MAP[v.mr.toLowerCase().trim()] = en;
        REVERSE_LOGISTICS_SUBSTRINGS.push({ foreign: v.mr.trim(), en: en });
      }
    }
    REVERSE_LOGISTICS_SUBSTRINGS.sort((a, b) => b.foreign.length - a.foreign.length);
  }
  buildLogisticsReverseMap();

  function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function replaceWordSafe(text, search, replacement) {
    if (!text || !search || !replacement || search === replacement) return text;
    if (!text.includes(search)) return text;
    if (/^[a-zA-Z0-9]+$/.test(search)) {
      const regex = new RegExp('\\b' + escapeRegex(search) + '\\b', 'g');
      return text.replace(regex, replacement);
    }
    return text.replaceAll(search, replacement);
  }

  function translateLogisticsToEnglish(text) {
    if (!text || typeof text !== 'string') return text;
    if (!/[\u0900-\u097F]/.test(text)) return text;
    const trimmed = text.trim().toLowerCase();
    if (REVERSE_LOGISTICS_MAP[trimmed]) return REVERSE_LOGISTICS_MAP[trimmed];

    const cleanCore = trimmed.replace(/^[^a-zA-Z0-9\u0900-\u097F]+/, '').replace(/[^a-zA-Z0-9\u0900-\u097F]+$/, '').trim().toLowerCase();
    if (cleanCore && REVERSE_LOGISTICS_MAP[cleanCore]) {
      return text.replace(new RegExp(escapeRegex(cleanCore), 'i'), REVERSE_LOGISTICS_MAP[cleanCore]);
    }

    let result = text;
    for (let i = 0; i < REVERSE_LOGISTICS_SUBSTRINGS.length; i++) {
      const item = REVERSE_LOGISTICS_SUBSTRINGS[i];
      if (item.foreign.length >= 4 && result.includes(item.foreign)) {
        result = result.replaceAll(item.foreign, item.en);
      }
    }
    return result;
  }

  function getLogisticsLanguage() {
    try {
      return localStorage.getItem('agrinex_language') || localStorage.getItem(STORAGE_KEY) || localStorage.getItem('agrinex_farmer_language') || 'en';
    } catch (e) {
      return 'en';
    }
  }


  const WORD_REPLACEMENTS = {
  "mr": [
    [
      "insights_search_mandi_ph",
      "बाजार समिती, जिल्हा किंवा पीक शोधा..."
    ],
    [
      "ph_search_dist_mandi",
      "जिल्हा किंवा बाजार समिती प्रांगण शोधा..."
    ],
    [
      "Quotas Displayed",
      "कोटा प्रदर्शित"
    ],
    [
      "Recommendation",
      "खरेदी शिफारस"
    ],
    [
      "recommendation",
      "शिफारस"
    ],
    [
      "Specifications",
      "तांत्रिक तपशील"
    ],
    [
      "specifications",
      "तपशील"
    ],
    [
      "Intermediaries",
      "मध्यस्थ दलाल"
    ],
    [
      "Active Quotas",
      "सक्रिय कोटा"
    ],
    [
      "Institutional",
      "संस्थात्मक"
    ],
    [
      "Manufacturers",
      "प्रक्रियादार उत्पादक"
    ],
    [
      "Authorization",
      "अधिकृतता"
    ],
    [
      "authorization",
      "अधिकृतता"
    ],
    [
      "Notifications",
      "सूचना"
    ],
    [
      "Cryptographic",
      "क्रिप्टोग्राफिक सुरक्षित"
    ],
    [
      "institutional",
      "संस्थात्मक"
    ],
    [
      "Certification",
      "प्रमाणपत्र"
    ],
    [
      "certification",
      "प्रमाणपत्र"
    ],
    [
      "Contributions",
      "योगदान"
    ],
    [
      "contributions",
      "योगदान"
    ],
    [
      "Agricultural",
      "कृषी शेती"
    ],
    [
      "agricultural",
      "कृषी"
    ],
    [
      "Consignments",
      "माल खेपा"
    ],
    [
      "Verification",
      "पडताळणी सत्यता"
    ],
    [
      "Certificates",
      "प्रमाणपत्रे"
    ],
    [
      "certificates",
      "प्रमाणपत्रे"
    ],
    [
      "Broadcasting",
      "प्रसारण सुरू आहे"
    ],
    [
      "Intermediary",
      "मध्यस्थ"
    ],
    [
      "Contribution",
      "योगदान"
    ],
    [
      "Multilingual",
      "बहुभाषिक"
    ],
    [
      "multilingual",
      "बहुभाषिक"
    ],
    [
      "Successfully",
      "यशस्वीरीत्या"
    ],
    [
      "successfully",
      "यशस्वीरीत्या"
    ],
    [
      "Navi Mumbai",
      "नवी मुंबई"
    ],
    [
      "navi mumbai",
      "नवी मुंबई"
    ],
    [
      "Commodities",
      "शेतीमाल प्रकार"
    ],
    [
      "Pomegranate",
      "डाळिंब"
    ],
    [
      "Supermarket",
      "सुपरमार्केट"
    ],
    [
      "Marketplace",
      "बाजारपेठ"
    ],
    [
      "Procurement",
      "खरेदी"
    ],
    [
      "procurement",
      "खरेदी"
    ],
    [
      "Negotiation",
      "दर वाटाघाटी"
    ],
    [
      "NEGOTIATION",
      "दर वाटाघाटी"
    ],
    [
      "negotiation",
      "वाटाघाटी"
    ],
    [
      "Arbitration",
      "लवाद मध्यस्थता"
    ],
    [
      "Settlements",
      "निकाली व्यवहार"
    ],
    [
      "settlements",
      "निकाली व्यवहार"
    ],
    [
      "Consignment",
      "माल खेप (कन्सॉइनमेंट)"
    ],
    [
      "Weighbridge",
      "इलेक्ट्रॉनिक धर्मकाटा"
    ],
    [
      "weighbridge",
      "धर्मकाटा"
    ],
    [
      "Temperature",
      "तापमान"
    ],
    [
      "Forecasting",
      "अंदाज वर्तवणे"
    ],
    [
      "forecasting",
      "अंदाज"
    ],
    [
      "Recommended",
      "शिफारस केलेले"
    ],
    [
      "Description",
      "वर्णन"
    ],
    [
      "description",
      "वर्णन"
    ],
    [
      "Perspective",
      "दृष्टिकोन"
    ],
    [
      "Information",
      "माहिती"
    ],
    [
      "Destination",
      "गंतव्य पोहोच ठिकाण"
    ],
    [
      "destination",
      "गंतव्य"
    ],
    [
      "Unallocated",
      "वाटप न केलेले"
    ],
    [
      "Unmonitored",
      "निरीक्षणाशिवाय"
    ],
    [
      "Checkpoints",
      "तपासणी नाके"
    ],
    [
      "Interactive",
      "परस्परसंवादी थेट"
    ],
    [
      "interactive",
      "थेट संवादी"
    ],
    [
      "Traditional",
      "पारंपारिक जुना"
    ],
    [
      "traditional",
      "पारंपारिक"
    ],
    [
      "Maharashtra",
      "महाराष्ट्र"
    ],
    [
      "BENEFICIARY",
      "लाभार्थी शेतकरी"
    ],
    [
      "Composition",
      "रचना घटक"
    ],
    [
      "immediately",
      "त्वरीत लगेच"
    ],
    [
      "perspective",
      "दृष्टिकोन"
    ],
    [
      "transaction",
      "व्यवहार"
    ],
    [
      "Narayangaon",
      "नारायणगाव"
    ],
    [
      "Chikalthana",
      "चिकलठाणा"
    ],
    [
      "marketplace",
      "बाजारपेठ"
    ],
    [
      "supermarket",
      "सुपरमार्केट"
    ],
    [
      "Comparative",
      "तुलनात्मक"
    ],
    [
      "comparative",
      "तुलनात्मक"
    ],
    [
      "Immediately",
      "तात्काळ"
    ],
    [
      "transferred",
      "वर्ग झाले"
    ],
    [
      "Transferred",
      "वर्ग झाले"
    ],
    [
      "Progressive",
      "प्रगतिशील"
    ],
    [
      "progressive",
      "प्रगतिशील"
    ],
    [
      "Perishables",
      "नाशवंत शेतमाल"
    ],
    [
      "perishables",
      "नाशवंत शेतमाल"
    ],
    [
      "Temporarily",
      "तात्पुरते"
    ],
    [
      "temporarily",
      "तात्पुरते"
    ],
    [
      "Marathwada",
      "मराठवाडा"
    ],
    [
      "marathwada",
      "मराठवाडा"
    ],
    [
      "Vegetables",
      "भाजीपाला"
    ],
    [
      "Enterprise",
      "संस्थात्मक खरेदीदार"
    ],
    [
      "ENTERPRISE",
      "संस्थात्मक खरेदीदार"
    ],
    [
      "Commercial",
      "व्यावसायिक"
    ],
    [
      "Processors",
      "अन्न प्रक्रियादार"
    ],
    [
      "Processing",
      "प्रक्रिया"
    ],
    [
      "purchasing",
      "खरेदी करत आहे"
    ],
    [
      "Purchasing",
      "खरेदी"
    ],
    [
      "Arbitrator",
      "लवाद मध्यस्थ"
    ],
    [
      "Authorized",
      "अधिकृत"
    ],
    [
      "Settlement",
      "निकाली व्यवहार"
    ],
    [
      "settlement",
      "निकाली व्यवहार"
    ],
    [
      "Collateral",
      "तारण हमी"
    ],
    [
      "Commission",
      "कमिशन आडत"
    ],
    [
      "calculated",
      "हिशोब केलेला"
    ],
    [
      "Calculator",
      "कॅल्क्युलेटर हिशोब"
    ],
    [
      "Dispatched",
      "रवाना झाले"
    ],
    [
      "Atmosphere",
      "नियंत्रित वातावरण"
    ],
    [
      "Controlled",
      "नियंत्रित"
    ],
    [
      "CONTROLLED",
      "नियंत्रित"
    ],
    [
      "controlled",
      "नियंत्रित"
    ],
    [
      "Corrugated",
      "पुठ्ठ्याचे बॉक्स"
    ],
    [
      "Inspection",
      "निरीक्षण पाहणी"
    ],
    [
      "Accredited",
      "मान्यताप्राप्त"
    ],
    [
      "Mismatches",
      "विसंगती तफावत"
    ],
    [
      "mismatches",
      "तफावत"
    ],
    [
      "Grievances",
      "तक्रारी"
    ],
    [
      "Resolution",
      "निवारण तोडगा"
    ],
    [
      "Visualizer",
      "दृश्य आलेख चार्ट"
    ],
    [
      "Projection",
      "भविष्यवेध अंदाज"
    ],
    [
      "projection",
      "अंदाज"
    ],
    [
      "Divergence",
      "दर तफावत"
    ],
    [
      "divergence",
      "तफावत"
    ],
    [
      "Advisories",
      "सल्ले"
    ],
    [
      "Successful",
      "यशस्वी"
    ],
    [
      "Protection",
      "संरक्षण"
    ],
    [
      "Guaranteed",
      "हमी दिलेली"
    ],
    [
      "Electronic",
      "इलेक्ट्रॉनिक"
    ],
    [
      "Percentage",
      "टक्केवारी"
    ],
    [
      "Undertakes",
      "हमी घेतो"
    ],
    [
      "undertakes",
      "हमी घेतो"
    ],
    [
      "Conforming",
      "निकषांनुसार"
    ],
    [
      "conforming",
      "सुसंगत"
    ],
    [
      "Mechanisms",
      "यंत्रणा"
    ],
    [
      "Monitoring",
      "थेट निरीक्षण"
    ],
    [
      "monitoring",
      "निरीक्षण"
    ],
    [
      "Turnaround",
      "पूर्तता वेळ (टर्नअराउंड)"
    ],
    [
      "turnaround",
      "पूर्तता वेळ"
    ],
    [
      "Historical",
      "ऐतिहासिक नोंदी"
    ],
    [
      "historical",
      "ऐतिहासिक"
    ],
    [
      "Facilities",
      "सुविधा केंद्रे"
    ],
    [
      "facilities",
      "सुविधा"
    ],
    [
      "Innovative",
      "नावीन्यपूर्ण आधुनिक"
    ],
    [
      "innovative",
      "नावीन्यपूर्ण"
    ],
    [
      "Supporting",
      "सहाय्यक"
    ],
    [
      "supporting",
      "सहाय्यक"
    ],
    [
      "Calibrated",
      "कॅलिब्रेट अचूक तपासलेले"
    ],
    [
      "calibrated",
      "तपासलेले"
    ],
    [
      "Variations",
      "फरक तफावती"
    ],
    [
      "variations",
      "फरक"
    ],
    [
      "Minimizing",
      "किमान कमी करणे"
    ],
    [
      "minimizing",
      "कमी करणे"
    ],
    [
      "Background",
      "पार्श्वभूमी"
    ],
    [
      "background",
      "पार्श्वभूमी"
    ],
    [
      "Simulating",
      "सिम्युलेशन करत आहे"
    ],
    [
      "simulating",
      "सिम्युलेशन करत आहे"
    ],
    [
      "acceptance",
      "स्वीकृती"
    ],
    [
      "Industrial",
      "औद्योगिक"
    ],
    [
      "Negotiable",
      "वाटाघाटीयोग्य"
    ],
    [
      "NetBanking",
      "नेटबँकिंग"
    ],
    [
      "Perishable",
      "नाशवंत शेतीमाल"
    ],
    [
      "Returnable",
      "परत करण्यायोग्य"
    ],
    [
      "Technology",
      "तंत्रज्ञान"
    ],
    [
      "designated",
      "नियुक्त"
    ],
    [
      "electronic",
      "इलेक्ट्रॉनिक"
    ],
    [
      "individual",
      "वैयक्तिक"
    ],
    [
      "resolution",
      "निवारण"
    ],
    [
      "Pimpalgaon",
      "पिंपळगाव"
    ],
    [
      "Pandharpur",
      "पंढरपूर"
    ],
    [
      "Dhamangaon",
      "धामणगाव"
    ],
    [
      "Hinganghat",
      "हिंगणघाट"
    ],
    [
      "Ventilated",
      "हवेशीर"
    ],
    [
      "ventilated",
      "हवेशीर"
    ],
    [
      "Compliance",
      "अनुपालन"
    ],
    [
      "compliance",
      "अनुपालन"
    ],
    [
      "Collection",
      "संकलन"
    ],
    [
      "guaranteed",
      "हमी दिलेले"
    ],
    [
      "Fulfilment",
      "पूर्तता"
    ],
    [
      "fulfilment",
      "पूर्तता"
    ],
    [
      "Attachment",
      "जोडपत्र"
    ],
    [
      "attachment",
      "जोडपत्र"
    ],
    [
      "enterprise",
      "संस्थात्मक"
    ],
    [
      "dispatched",
      "रवाना"
    ],
    [
      "Dispatches",
      "वाहतूक फेऱ्या"
    ],
    [
      "dispatches",
      "वाहतूक फेऱ्या"
    ],
    [
      "processing",
      "प्रक्रिया"
    ],
    [
      "commercial",
      "व्यावसायिक"
    ],
    [
      "perishable",
      "नाशवंत"
    ],
    [
      "Quarantine",
      "चौकशी स्थगिती"
    ],
    [
      "quarantine",
      "चौकशी स्थगिती"
    ],
    [
      "inspection",
      "तपासणी"
    ],
    [
      "Reactivate",
      "पुन्हा सुरू करा"
    ],
    [
      "reactivate",
      "पुन्हा सुरू करा"
    ],
    [
      "Displayed",
      "प्रदर्शित"
    ],
    [
      "displayed",
      "प्रदर्शित"
    ],
    [
      "Commodity",
      "कृषी शेतीमाल"
    ],
    [
      "Mandarins",
      "संत्री मोसंबी"
    ],
    [
      "harvested",
      "काढणी झालेली"
    ],
    [
      "Wholesale",
      "घाऊक बाजार"
    ],
    [
      "WHOLESALE",
      "घाऊक बाजार"
    ],
    [
      "Corporate",
      "कॉर्पोरेट संस्थात्मक"
    ],
    [
      "Negotiate",
      "वाटाघाटी करा"
    ],
    [
      "Agreement",
      "करार"
    ],
    [
      "Contracts",
      "करार"
    ],
    [
      "Statutory",
      "वैधानिक अधिकृत"
    ],
    [
      "Signatory",
      "स्वाक्षरीकर्ता"
    ],
    [
      "Signature",
      "स्वाक्षरी"
    ],
    [
      "signature",
      "स्वाक्षरी"
    ],
    [
      "Authorize",
      "अधिकृत करा"
    ],
    [
      "Compliant",
      "मानक सुसंगत"
    ],
    [
      "Deposited",
      "जमा केले"
    ],
    [
      "deposited",
      "जमा केले"
    ],
    [
      "Disbursal",
      "रक्कम वितरण"
    ],
    [
      "DISBURSAL",
      "रक्कम वितरण"
    ],
    [
      "disbursed",
      "वितरीत केले"
    ],
    [
      "Financing",
      "वित्तपुरवठा"
    ],
    [
      "financing",
      "वित्तपुरवठा"
    ],
    [
      "Repayment",
      "परतफेड"
    ],
    [
      "Liquidity",
      "तरलता निधी"
    ],
    [
      "Brokerage",
      "दलाली कमिशन"
    ],
    [
      "brokerage",
      "दलाली कमिशन"
    ],
    [
      "Shrinkage",
      "वजन घट नुकसान"
    ],
    [
      "shrinkage",
      "वजन घट नुकसान"
    ],
    [
      "Valuation",
      "एकूण मूल्य"
    ],
    [
      "VALUATION",
      "एकूण मूल्य"
    ],
    [
      "valuation",
      "मूल्यांकन"
    ],
    [
      "Benchmark",
      "बाजार मानक दर"
    ],
    [
      "benchmark",
      "मानक दर"
    ],
    [
      "Arbitrage",
      "किंमत नफा फरक"
    ],
    [
      "arbitrage",
      "किंमत नफा फरक"
    ],
    [
      "Breakeven",
      "किमान ब्रेक-इव्हन दर"
    ],
    [
      "Calculate",
      "हिशोब करा"
    ],
    [
      "Logistics",
      "वाहतूक व पुरवठा साखळी"
    ],
    [
      "logistics",
      "वाहतूक व पुरवठा"
    ],
    [
      "Transport",
      "वाहतूक"
    ],
    [
      "transport",
      "वाहतूक"
    ],
    [
      "Consignor",
      "माल पाठवणारा (शेतकरी)"
    ],
    [
      "Consignee",
      "माल स्वीकारणारा (खरेदीदार)"
    ],
    [
      "Shipments",
      "माल खेपा वहन"
    ],
    [
      "Weighment",
      "वजन तपासणी"
    ],
    [
      "Telemetry",
      "थेट सेन्सर टेलिमेट्री"
    ],
    [
      "TELEMETRY",
      "थेट टेलिमेट्री"
    ],
    [
      "telemetry",
      "टेलिमेट्री"
    ],
    [
      "Satellite",
      "उपग्रह ट्रॅकिंग"
    ],
    [
      "Warehouse",
      "वेअरहाऊस गोदाम"
    ],
    [
      "warehouse",
      "गोदाम"
    ],
    [
      "Packaging",
      "पॅकेजिंग बारदाना"
    ],
    [
      "Tolerance",
      "सहनशीलता मर्यादा"
    ],
    [
      "tolerance",
      "सहनशीलता मर्यादा"
    ],
    [
      "Inspected",
      "पाहणी केलेले"
    ],
    [
      "Certified",
      "प्रमाणित"
    ],
    [
      "Defective",
      "दोषी"
    ],
    [
      "Shortages",
      "तूट"
    ],
    [
      "shortages",
      "तूट"
    ],
    [
      "Deviation",
      "मापदंड फरक विचलन"
    ],
    [
      "Grievance",
      "तक्रार निवारण"
    ],
    [
      "grievance",
      "तक्रार"
    ],
    [
      "Redressal",
      "निवारण मंच"
    ],
    [
      "Complaint",
      "तक्रार"
    ],
    [
      "complaint",
      "तक्रार"
    ],
    [
      "Releasing",
      "रक्कम मुक्त करत आहे"
    ],
    [
      "Analytics",
      "डेटा विश्लेषण"
    ],
    [
      "Available",
      "उपलब्ध"
    ],
    [
      "available",
      "उपलब्ध"
    ],
    [
      "Statement",
      "विवरण पत्रक"
    ],
    [
      "Dashboard",
      "डॅशबोर्ड"
    ],
    [
      "Broadcast",
      "प्रसारित करा"
    ],
    [
      "Emergency",
      "आपत्कालीन"
    ],
    [
      "Important",
      "महत्त्वाचे"
    ],
    [
      "Automated",
      "स्वयंचलित"
    ],
    [
      "Instantly",
      "त्वरीत"
    ],
    [
      "Connected",
      "जोडले गेले"
    ],
    [
      "Protected",
      "संरक्षित"
    ],
    [
      "PROTECTED",
      "संरक्षित"
    ],
    [
      "Guarantee",
      "हमी"
    ],
    [
      "Assurance",
      "खात्री"
    ],
    [
      "Digitally",
      "डिजिटल पद्धतीने"
    ],
    [
      "Encrypted",
      "एनक्रिप्टेड सुरक्षित"
    ],
    [
      "Immutable",
      "अपरिवर्तनीय कायमस्वरूपी"
    ],
    [
      "Timestamp",
      "वेळ नोंद"
    ],
    [
      "Yesterday",
      "काल"
    ],
    [
      "Quarterly",
      "त्रैमासिक"
    ],
    [
      "Locations",
      "ठिकाणे"
    ],
    [
      "Districts",
      "जिल्हे"
    ],
    [
      "Breakdown",
      "सविस्तर तपशीलवार वर्गीकरण"
    ],
    [
      "Checklist",
      "तपासणी यादी"
    ],
    [
      "Readiness",
      "सज्जता"
    ],
    [
      "Milestone",
      "टप्पा उद्दिष्ट"
    ],
    [
      "Receiving",
      "स्वीकारत आहे"
    ],
    [
      "Requested",
      "विनंती केलेली"
    ],
    [
      "Exceeding",
      "मर्यादेपेक्षा जास्त"
    ],
    [
      "exceeding",
      "जास्त"
    ],
    [
      "Protocols",
      "नियम नियमावली"
    ],
    [
      "Mechanism",
      "यंत्रणा"
    ],
    [
      "mechanism",
      "यंत्रणा"
    ],
    [
      "Oversight",
      "देखरेख देखरेख"
    ],
    [
      "oversight",
      "देखरेख"
    ],
    [
      "Supported",
      "समर्थित"
    ],
    [
      "supported",
      "समर्थित"
    ],
    [
      "Remaining",
      "उर्वरित शिल्लक"
    ],
    [
      "remaining",
      "उर्वरित"
    ],
    [
      "Fulfilled",
      "पूर्ण झालेले"
    ],
    [
      "fulfilled",
      "पूर्ण"
    ],
    [
      "Discounts",
      "सूट"
    ],
    [
      "Secondary",
      "दुय्यम"
    ],
    [
      "secondary",
      "दुय्यम"
    ],
    [
      "Samruddhi",
      "समृद्धी महामार्ग"
    ],
    [
      "BIGBASKET",
      "बिगबास्केट"
    ],
    [
      "BigBasket",
      "बिगबास्केट"
    ],
    [
      "CERTIFIED",
      "प्रमाणित"
    ],
    [
      "certified",
      "प्रमाणित"
    ],
    [
      "Completed",
      "पूर्ण झाले"
    ],
    [
      "Dedicated",
      "समर्पित विशेष"
    ],
    [
      "Estimated",
      "अंदाजित"
    ],
    [
      "Immediate",
      "तात्काळ तात्काळ"
    ],
    [
      "immediate",
      "तात्काळ"
    ],
    [
      "Insurance",
      "विमा संरक्षण"
    ],
    [
      "Middleman",
      "मध्यस्थ दलाल"
    ],
    [
      "middleman",
      "मध्यस्थ"
    ],
    [
      "REGULATED",
      "नियमन केलेले"
    ],
    [
      "regulated",
      "नियमन केलेले"
    ],
    [
      "Rameshwar",
      "रामेश्वर"
    ],
    [
      "Reference",
      "संदर्भ क्रमांक"
    ],
    [
      "transfers",
      "हस्तांतरणे"
    ],
    [
      "automated",
      "स्वयंचलित"
    ],
    [
      "commodity",
      "शेतीमाल"
    ],
    [
      "corporate",
      "संस्थात्मक"
    ],
    [
      "digitally",
      "डिजिटल पद्धतीने"
    ],
    [
      "discovery",
      "दर शोध प्रक्रिया"
    ],
    [
      "emergency",
      "आपत्कालीन"
    ],
    [
      "instantly",
      "त्वरीत"
    ],
    [
      "inventory",
      "साठा शिल्लक"
    ],
    [
      "packaging",
      "पॅकेजिंग"
    ],
    [
      "varieties",
      "वाण प्रकार"
    ],
    [
      "Lasalgaon",
      "लासलगाव"
    ],
    [
      "Sangamner",
      "संगमनेर"
    ],
    [
      "Majalgaon",
      "माजलगाव"
    ],
    [
      "Regulated",
      "नियमन केलेले"
    ],
    [
      "icicibank",
      "ICICI बँक"
    ],
    [
      "Purchased",
      "खरेदी केलेले"
    ],
    [
      "purchased",
      "खरेदी केलेले"
    ],
    [
      "districts",
      "जिल्हे"
    ],
    [
      "BENCHMARK",
      "संदर्भ दर"
    ],
    [
      "benchmark",
      "संदर्भ दर"
    ],
    [
      "Scheduled",
      "नियोजित"
    ],
    [
      "scheduled",
      "नियोजित"
    ],
    [
      "SCHEDULED",
      "नियोजित"
    ],
    [
      "Confirmed",
      "निश्चित"
    ],
    [
      "confirmed",
      "निश्चित"
    ],
    [
      "CONFIRMED",
      "निश्चित"
    ],
    [
      "reference",
      "संदर्भ"
    ],
    [
      "breakeven",
      "खर्च वसुली"
    ],
    [
      "wholesale",
      "घाऊक"
    ],
    [
      "Delivered",
      "पोहोचवले"
    ],
    [
      "delivered",
      "पोहोचवले"
    ],
    [
      "Committed",
      "नोंदवले"
    ],
    [
      "committed",
      "नोंदवले"
    ],
    [
      "estimated",
      "अंदाजे"
    ],
    [
      "shipments",
      "माल वाहतूक"
    ],
    [
      "Clearance",
      "निकाली"
    ],
    [
      "clearance",
      "निकाली"
    ],
    [
      "statutory",
      "वैधानिक"
    ],
    [
      "Arbitrate",
      "लवाद चालवा"
    ],
    [
      "arbitrate",
      "लवाद चालवा"
    ],
    [
      "Unsuspend",
      "निलंबन मागे घ्या"
    ],
    [
      "unsuspend",
      "निलंबन मागे घ्या"
    ],
    [
      "authorize",
      "मंजूर करा"
    ],
    [
      "Hydration",
      "डेटा लोड"
    ],
    [
      "hydration",
      "डेटा लोड"
    ],
    [
      "Oilseeds",
      "गळीत धान्य (तेलबिया)"
    ],
    [
      "tomatoes",
      "टोमॅटो"
    ],
    [
      "Tomatoes",
      "टोमॅटो"
    ],
    [
      "Mandarin",
      "संत्री"
    ],
    [
      "Turmeric",
      "हळद"
    ],
    [
      "Alphonso",
      "हापूस आंबा"
    ],
    [
      "Maldandi",
      "मालदांडी"
    ],
    [
      "Thompson",
      "थॉमसन"
    ],
    [
      "Seedless",
      "बिनबियांची"
    ],
    [
      "harvests",
      "काढणी"
    ],
    [
      "Caterers",
      "कॅटरर्स अन्नपुरवठादार"
    ],
    [
      "Catering",
      "कॅटरिंग"
    ],
    [
      "Exchange",
      "कृषी बाजार केंद्र"
    ],
    [
      "Terminal",
      "टर्मिनल मुख्य आवार"
    ],
    [
      "Corridor",
      "महामार्ग कॉरिडॉर"
    ],
    [
      "Procured",
      "खरेदी केलेले"
    ],
    [
      "PROCURED",
      "खरेदी केलेले"
    ],
    [
      "procured",
      "खरेदी केलेले"
    ],
    [
      "Purchase",
      "खरेदी"
    ],
    [
      "purchase",
      "खरेदी"
    ],
    [
      "Contract",
      "खरेदी करार"
    ],
    [
      "contract",
      "करार"
    ],
    [
      "Tribunal",
      "न्यायाधिकरण"
    ],
    [
      "Ratified",
      "मंजूर अधिकृत"
    ],
    [
      "ratified",
      "मंजूर"
    ],
    [
      "Deposits",
      "ठेवी"
    ],
    [
      "deposits",
      "ठेवी"
    ],
    [
      "Advances",
      "आगाऊ रकमा"
    ],
    [
      "Disburse",
      "रक्कम वितरीत करा"
    ],
    [
      "Payments",
      "पेमेंट्स"
    ],
    [
      "Credited",
      "खात्यात जमा झाले"
    ],
    [
      "credited",
      "जमा झाले"
    ],
    [
      "Discount",
      "सूट"
    ],
    [
      "Interest",
      "व्याजदर"
    ],
    [
      "Reserves",
      "राखीव निधी"
    ],
    [
      "reserves",
      "राखीव निधी"
    ],
    [
      "Arhatiya",
      "आडत्या कमिशन"
    ],
    [
      "Dispatch",
      "रवाना करा"
    ],
    [
      "dispatch",
      "रवाना"
    ],
    [
      "Delivery",
      "डिलिव्हरी पोहोच"
    ],
    [
      "DELIVERY",
      "डिलिव्हरी पोहोच"
    ],
    [
      "delivery",
      "डिलिव्हरी"
    ],
    [
      "Distance",
      "अंतर"
    ],
    [
      "Tracking",
      "थेट ट्रॅकिंग"
    ],
    [
      "tracking",
      "ट्रॅकिंग"
    ],
    [
      "Readings",
      "सेन्सर नोंदी"
    ],
    [
      "readings",
      "नोंदी"
    ],
    [
      "Chambers",
      "शीत कक्ष"
    ],
    [
      "chambers",
      "शीत कक्ष"
    ],
    [
      "Humidity",
      "आद्रता"
    ],
    [
      "Capacity",
      "क्षमता"
    ],
    [
      "Hermetic",
      "हवाबंद हर्मेटिक"
    ],
    [
      "Moisture",
      "ओलावा प्रमाण"
    ],
    [
      "moisture",
      "ओलावा प्रमाण"
    ],
    [
      "Verified",
      "सत्यापित पडताळणी झालेले"
    ],
    [
      "verified",
      "सत्यापित"
    ],
    [
      "Spoilage",
      "नासाडी नुकसान"
    ],
    [
      "Shortage",
      "वजन तूट घट"
    ],
    [
      "Disputes",
      "वाद"
    ],
    [
      "Resolved",
      "निवारण झाले"
    ],
    [
      "resolved",
      "निकाली"
    ],
    [
      "Releases",
      "मुक्त रकमा"
    ],
    [
      "Evidence",
      "पुरावा दस्तऐवज"
    ],
    [
      "evidence",
      "पुरावा"
    ],
    [
      "Insights",
      "बाजार विश्लेषण"
    ],
    [
      "insights",
      "विश्लेषण"
    ],
    [
      "Forecast",
      "अंदाज"
    ],
    [
      "forecast",
      "अंदाज"
    ],
    [
      "Arrivals",
      "आवक प्रमाण"
    ],
    [
      "arrivals",
      "आवक"
    ],
    [
      "Advisory",
      "सल्ला मार्गदर्शन"
    ],
    [
      "advisory",
      "सल्ला"
    ],
    [
      "Strategy",
      "खरेदी धोरण"
    ],
    [
      "Velocity",
      "खरेदी गती"
    ],
    [
      "Awaiting",
      "प्रतीक्षेत"
    ],
    [
      "awaiting",
      "प्रतीक्षेत"
    ],
    [
      "Download",
      "डाउनलोड करा"
    ],
    [
      "download",
      "डाउनलोड करा"
    ],
    [
      "Receipts",
      "पावत्या"
    ],
    [
      "receipts",
      "पावत्या"
    ],
    [
      "Settings",
      "सेटिंग्ज"
    ],
    [
      "Overview",
      "विहंगावलोकन"
    ],
    [
      "Previous",
      "मागील"
    ],
    [
      "Messages",
      "संदेश"
    ],
    [
      "Contacts",
      "संपर्क यादी"
    ],
    [
      "Feedback",
      "अभिप्राय"
    ],
    [
      "Language",
      "भाषा"
    ],
    [
      "Distress",
      "संकटातील शेतीमाल"
    ],
    [
      "Critical",
      "महत्त्वाचे"
    ],
    [
      "Required",
      "आवश्यक"
    ],
    [
      "Optional",
      "ऐच्छिक"
    ],
    [
      "Standard",
      "मानक"
    ],
    [
      "Realtime",
      "थेट रीअल-टाईम"
    ],
    [
      "Security",
      "सुरक्षा"
    ],
    [
      "Tomorrow",
      "उद्या"
    ],
    [
      "Location",
      "ठिकाण स्थान"
    ],
    [
      "location",
      "ठिकाण"
    ],
    [
      "District",
      "जिल्हा"
    ],
    [
      "district",
      "जिल्हा"
    ],
    [
      "Regional",
      "प्रादेशिक"
    ],
    [
      "Cheapest",
      "सर्वात स्वस्त"
    ],
    [
      "Kilogram",
      "किलोग्रॅम"
    ],
    [
      "Passbook",
      "पासबुक"
    ],
    [
      "Steppers",
      "टप्पे"
    ],
    [
      "Whenever",
      "जेव्हा केव्हा"
    ],
    [
      "Received",
      "प्राप्त झाले"
    ],
    [
      "received",
      "मिळाले"
    ],
    [
      "Response",
      "प्रतिसाद"
    ],
    [
      "response",
      "प्रतिसाद"
    ],
    [
      "Initiate",
      "सुरू करा"
    ],
    [
      "initiate",
      "सुरू करा"
    ],
    [
      "Assigned",
      "नियुक्त केले"
    ],
    [
      "assigned",
      "नियुक्त"
    ],
    [
      "Withheld",
      "रोखून धरलेले"
    ],
    [
      "withheld",
      "रोखून धरलेले"
    ],
    [
      "Specific",
      "विशिष्ट"
    ],
    [
      "specific",
      "विशिष्ट"
    ],
    [
      "Protocol",
      "नियमावली प्रोटोकॉल"
    ],
    [
      "protocol",
      "नियमावली"
    ],
    [
      "Triggers",
      "ट्रिगर्स सक्रिय"
    ],
    [
      "triggers",
      "सक्रिय करते"
    ],
    [
      "Keywords",
      "शोध शब्द (कीवर्ड्स)"
    ],
    [
      "keywords",
      "कीवर्ड्स"
    ],
    [
      "Position",
      "स्थान स्थिती"
    ],
    [
      "position",
      "स्थिती"
    ],
    [
      "Seasonal",
      "हंगामी"
    ],
    [
      "seasonal",
      "हंगामी"
    ],
    [
      "corridor",
      "कॉरिडॉर"
    ],
    [
      "Facility",
      "सुविधा केंद्र"
    ],
    [
      "Flexible",
      "लवचिक"
    ],
    [
      "flexible",
      "लवचिक"
    ],
    [
      "Strictly",
      "काटेकोरपणे"
    ],
    [
      "strictly",
      "काटेकोरपणे"
    ],
    [
      "Registry",
      "नोंदणी रजिस्टर"
    ],
    [
      "registry",
      "रजिस्टर"
    ],
    [
      "Internet",
      "इंटरनेट"
    ],
    [
      "Executed",
      "अंमलबजावणी पूर्ण"
    ],
    [
      "executed",
      "पूर्ण"
    ],
    [
      "Realized",
      "प्राप्त झालेले नफा"
    ],
    [
      "realized",
      "प्राप्त"
    ],
    [
      "Maximize",
      "कमाल नफा मिळवा"
    ],
    [
      "maximize",
      "कमाल करा"
    ],
    [
      "Directly",
      "थेट थेट"
    ],
    [
      "directly",
      "थेट"
    ],
    [
      "Pressure",
      "हवामान दाब"
    ],
    [
      "pressure",
      "दाब"
    ],
    [
      "Matching",
      "योग्य जुळणी"
    ],
    [
      "matching",
      "जुळणारे"
    ],
    [
      "Vidarbha",
      "विदर्भ"
    ],
    [
      "Khandesh",
      "खानदेश"
    ],
    [
      "Sahyadri",
      "सह्याद्री"
    ],
    [
      "Shivneri",
      "शिवनेरी"
    ],
    [
      "Business",
      "व्यवसाय व्यापार"
    ],
    [
      "CONTRACT",
      "करार"
    ],
    [
      "Concepts",
      "संकल्पना"
    ],
    [
      "Deshmukh",
      "देशमुख"
    ],
    [
      "Division",
      "विभाग"
    ],
    [
      "External",
      "बाह्य इतर"
    ],
    [
      "Holdings",
      "राखून ठेवलेली शिल्लक"
    ],
    [
      "Physical",
      "प्रत्यक्ष प्रत्यक्ष"
    ],
    [
      "physical",
      "प्रत्यक्ष"
    ],
    [
      "Quantity",
      "प्रमाण वजन"
    ],
    [
      "quantity",
      "प्रमाण"
    ],
    [
      "Reliance",
      "रिलायन्स"
    ],
    [
      "Schedule",
      "वेळापत्रक"
    ],
    [
      "schedule",
      "वेळापत्रक"
    ],
    [
      "SCHEDULE",
      "वेळापत्रक"
    ],
    [
      "Polished",
      "पॉलिश केलेले"
    ],
    [
      "polished",
      "पॉलिश केलेले"
    ],
    [
      "Curcumin",
      "करक्युमिन"
    ],
    [
      "curcumin",
      "करक्युमिन"
    ],
    [
      "Services",
      "सेवा"
    ],
    [
      "Simulate",
      "सिम्युलेट करा"
    ],
    [
      "Sourcing",
      "थेट खरेदी प्रक्रिया"
    ],
    [
      "sourcing",
      "खरेदी"
    ],
    [
      "Transfer",
      "हस्तांतरण वर्ग"
    ],
    [
      "capacity",
      "क्षमता"
    ],
    [
      "disabled",
      "अक्षम केलेले"
    ],
    [
      "hermetic",
      "हवाबंद"
    ],
    [
      "tribunal",
      "न्यायाधिकरण"
    ],
    [
      "Malegaon",
      "मालेगाव"
    ],
    [
      "Bhiwapur",
      "भिवापूर"
    ],
    [
      "Gultekdi",
      "गुलटेकडी"
    ],
    [
      "Hadapsar",
      "हडपसर"
    ],
    [
      "Ardhapur",
      "अर्धापूर"
    ],
    [
      "Sambhaji",
      "संभाजीनगर"
    ],
    [
      "Anandrao",
      "आनंदराव"
    ],
    [
      "releases",
      "रक्कम मुक्ती"
    ],
    [
      "Rajapuri",
      "राजापुरी"
    ],
    [
      "Disputed",
      "वादग्रस्त"
    ],
    [
      "disputed",
      "वादग्रस्त"
    ],
    [
      "Farmgate",
      "शेत-शिवार"
    ],
    [
      "farmgate",
      "शेत-शिवार"
    ],
    [
      "Describe",
      "वर्णन करा"
    ],
    [
      "describe",
      "वर्णन करा"
    ],
    [
      "happened",
      "घडले"
    ],
    [
      "overview",
      "आढावा"
    ],
    [
      "terminal",
      "टर्मिनल"
    ],
    [
      "Released",
      "वितरित"
    ],
    [
      "released",
      "वितरित"
    ],
    [
      "Mismatch",
      "तफावत"
    ],
    [
      "mismatch",
      "तफावत"
    ],
    [
      "language",
      "भाषा"
    ],
    [
      "clearing",
      "निपटारा"
    ],
    [
      "Clearing",
      "निपटारा"
    ],
    [
      "seedless",
      "बिनबियांचे"
    ],
    [
      "Screened",
      "चाळलेले"
    ],
    [
      "screened",
      "चाळलेले"
    ],
    [
      "standard",
      "दर्जेदार"
    ],
    [
      "Commerce",
      "व्यापार"
    ],
    [
      "commerce",
      "व्यापार"
    ],
    [
      "EXPECTED",
      "अपेक्षित"
    ],
    [
      "Expected",
      "अपेक्षित"
    ],
    [
      "expected",
      "अपेक्षित"
    ],
    [
      "Incoming",
      "येणारे"
    ],
    [
      "incoming",
      "येणारे"
    ],
    [
      "Shipment",
      "माल खेप"
    ],
    [
      "shipment",
      "माल खेप"
    ],
    [
      "Director",
      "संचालक"
    ],
    [
      "director",
      "संचालक"
    ],
    [
      "positive",
      "सकारात्मक"
    ],
    [
      "Positive",
      "सकारात्मक"
    ],
    [
      "caterers",
      "केटरर्स"
    ],
    [
      "Fallback",
      "पर्यायी"
    ],
    [
      "fallback",
      "पर्यायी"
    ],
    [
      "Sourced",
      "खरेदी पूर्ण"
    ],
    [
      "sourced",
      "खरेदी पूर्ण"
    ],
    [
      "CEILING",
      "कमाल मर्यादा"
    ],
    [
      "ceiling",
      "कमाल मर्यादा"
    ],
    [
      "Packing",
      "पॅकिंग"
    ],
    [
      "packing",
      "पॅकिंग"
    ],
    [
      "Chilled",
      "शीतकरण"
    ],
    [
      "chilled",
      "शीतकरण"
    ],
    [
      "Cleaned",
      "स्वच्छ केलेले"
    ],
    [
      "cleaned",
      "स्वच्छ केलेले"
    ],
    [
      "Plastic",
      "प्लास्टिक"
    ],
    [
      "plastic",
      "प्लास्टिक"
    ],
    [
      "Produce",
      "शेतीमाल"
    ],
    [
      "PRODUCE",
      "शेतीमाल"
    ],
    [
      "produce",
      "शेतीमाल"
    ],
    [
      "Millets",
      "भरड धान्य (मिलेट्स)"
    ],
    [
      "Cereals",
      "तृणधान्ये"
    ],
    [
      "Legumes",
      "शेंगा कडधान्य"
    ],
    [
      "Soybean",
      "सोयाबीन"
    ],
    [
      "soybean",
      "सोयाबीन"
    ],
    [
      "Compost",
      "खत कंपोस्ट"
    ],
    [
      "Harvest",
      "काढणी"
    ],
    [
      "harvest",
      "काढणी"
    ],
    [
      "Sellers",
      "विक्रेते"
    ],
    [
      "Farmers",
      "शेतकरी"
    ],
    [
      "farmers",
      "शेतकरी"
    ],
    [
      "Kitchen",
      "क्लाउड किचन"
    ],
    [
      "Network",
      "नेटवर्क जाळे"
    ],
    [
      "Demands",
      "मागण्या"
    ],
    [
      "Procure",
      "खरेदी करा"
    ],
    [
      "Counter",
      "प्रति-प्रस्ताव"
    ],
    [
      "counter",
      "प्रति-प्रस्ताव"
    ],
    [
      "Binding",
      "बंधनकारक"
    ],
    [
      "Trustee",
      "विश्वस्त"
    ],
    [
      "TRUSTEE",
      "विश्वस्त"
    ],
    [
      "Signoff",
      "मंजुरी स्वाक्षरी"
    ],
    [
      "signoff",
      "मंजुरी स्वाक्षरी"
    ],
    [
      "Deposit",
      "जमा रक्कम"
    ],
    [
      "deposit",
      "जमा"
    ],
    [
      "Advance",
      "आगाऊ अ‍ॅडव्हान्स"
    ],
    [
      "advance",
      "आगाऊ"
    ],
    [
      "Tranche",
      "हप्ता टप्पा"
    ],
    [
      "TRANCHE",
      "हप्ता टप्पा"
    ],
    [
      "tranche",
      "हप्ता"
    ],
    [
      "Balance",
      "उर्वरित शिल्लक"
    ],
    [
      "balance",
      "शिल्लक"
    ],
    [
      "Settled",
      "निकाली पूर्ण"
    ],
    [
      "Payment",
      "पेमेंट"
    ],
    [
      "payment",
      "पेमेंट"
    ],
    [
      "Payable",
      "देय रक्कम"
    ],
    [
      "Pledges",
      "तारण पावत्या"
    ],
    [
      "Lending",
      "कर्ज वाटप"
    ],
    [
      "lending",
      "कर्ज वाटप"
    ],
    [
      "Capital",
      "भांडवल"
    ],
    [
      "capital",
      "भांडवल"
    ],
    [
      "Hedging",
      "किंमत सुरक्षितता (हेजिंग)"
    ],
    [
      "spreads",
      "दर फरक"
    ],
    [
      "Savings",
      "बचत"
    ],
    [
      "SAVINGS",
      "बचत"
    ],
    [
      "savings",
      "बचत"
    ],
    [
      "Average",
      "सरासरी"
    ],
    [
      "Minimum",
      "किमान"
    ],
    [
      "minimum",
      "किमान"
    ],
    [
      "Maximum",
      "कमाल"
    ],
    [
      "maximum",
      "कमाल"
    ],
    [
      "Ceiling",
      "कमाल मर्यादा"
    ],
    [
      "Freight",
      "वाहतूक भाडे"
    ],
    [
      "freight",
      "वाहतूक भाडे"
    ],
    [
      "Haulage",
      "वाहतूक ओढाई"
    ],
    [
      "Transit",
      "वाहतुकीत मार्गावर"
    ],
    [
      "TRANSIT",
      "वाहतुकीत मार्गावर"
    ],
    [
      "transit",
      "वाहतुकीत"
    ],
    [
      "Vehicle",
      "वाहन"
    ],
    [
      "Payload",
      "वहन क्षमता पेलोड"
    ],
    [
      "Highway",
      "महामार्ग"
    ],
    [
      "Storage",
      "शीतगृह साठवणूक"
    ],
    [
      "storage",
      "साठवणूक"
    ],
    [
      "Chamber",
      "शीत कक्ष"
    ],
    [
      "chamber",
      "कक्ष"
    ],
    [
      "Climate",
      "हवामान"
    ],
    [
      "CLIMATE",
      "नियंत्रित हवामान"
    ],
    [
      "Cooling",
      "शीतकरण"
    ],
    [
      "Plastic",
      "प्लॅस्टिक"
    ],
    [
      "Loading",
      "माल चढवणे (लोडिंग)"
    ],
    [
      "Quality",
      "गुणवत्ता प्रत"
    ],
    [
      "Assayed",
      "तपासणी केलेले"
    ],
    [
      "inspect",
      "पाहणी करा"
    ],
    [
      "Spoiled",
      "खराब झालेला"
    ],
    [
      "Damaged",
      "नुकसानग्रस्त"
    ],
    [
      "Missing",
      "गहाळ कमी भरलेले"
    ],
    [
      "missing",
      "कमी"
    ],
    [
      "Dispute",
      "वाद तक्रार"
    ],
    [
      "Release",
      "रक्कम मुक्त करा"
    ],
    [
      "Dossier",
      "तक्रार संचिका (डोसियर)"
    ],
    [
      "Insight",
      "विश्लेषण"
    ],
    [
      "Bullish",
      "तेजी (दर वाढ)"
    ],
    [
      "Bearish",
      "मंदी (दर घट)"
    ],
    [
      "Neutral",
      "स्थिर बाजार"
    ],
    [
      "Arrival",
      "आवक"
    ],
    [
      "arrival",
      "आवक"
    ],
    [
      "Volumes",
      "आवक प्रमाण"
    ],
    [
      "volumes",
      "प्रमाण"
    ],
    [
      "Tonnage",
      "टन भार"
    ],
    [
      "tonnage",
      "टन भार"
    ],
    [
      "Heatmap",
      "आवक हीटमॅप नकाशा"
    ],
    [
      "Indices",
      "बाजार निर्देशांक"
    ],
    [
      "indices",
      "निर्देशांक"
    ],
    [
      "Copilot",
      "एआय खरेदी सल्लागार"
    ],
    [
      "copilot",
      "सल्लागार"
    ],
    [
      "Filters",
      "फिल्टर्स"
    ],
    [
      "Actions",
      "कृती"
    ],
    [
      "Pending",
      "प्रलंबित"
    ],
    [
      "pending",
      "प्रलंबित"
    ],
    [
      "Booking",
      "बुकिंग"
    ],
    [
      "Confirm",
      "निश्चित करा"
    ],
    [
      "confirm",
      "निश्चित करा"
    ],
    [
      "Details",
      "तपशील"
    ],
    [
      "details",
      "तपशील"
    ],
    [
      "Receipt",
      "पावती"
    ],
    [
      "receipt",
      "पावती"
    ],
    [
      "Invoice",
      "बीजक बिल"
    ],
    [
      "Voucher",
      "व्हाउचर पावती"
    ],
    [
      "Summary",
      "सारांश"
    ],
    [
      "summary",
      "सारांश"
    ],
    [
      "Reports",
      "अहवाल"
    ],
    [
      "reports",
      "अहवाल"
    ],
    [
      "History",
      "इतिहास नोंदी"
    ],
    [
      "Profile",
      "प्रोफाइल"
    ],
    [
      "profile",
      "प्रोफाइल"
    ],
    [
      "Showing",
      "दाखवत आहे"
    ],
    [
      "Message",
      "संदेश"
    ],
    [
      "message",
      "संदेश"
    ],
    [
      "Contact",
      "संपर्क"
    ],
    [
      "Explain",
      "स्पष्टीकरण द्या"
    ],
    [
      "Morning",
      "प्रभात सकाळ"
    ],
    [
      "Evening",
      "संध्याकाळ"
    ],
    [
      "Salvage",
      "मदत खरेदी"
    ],
    [
      "Urgency",
      "तातडी"
    ],
    [
      "Warning",
      "सावधानता"
    ],
    [
      "Success",
      "यशस्वी"
    ],
    [
      "Instant",
      "तात्काळ झटपट"
    ],
    [
      "Refresh",
      "ताजे करा"
    ],
    [
      "Offline",
      "ऑफलाइन"
    ],
    [
      "Digital",
      "डिजिटल"
    ],
    [
      "Minutes",
      "मिनिटे"
    ],
    [
      "minutes",
      "मिनिटे"
    ],
    [
      "Seconds",
      "सेकंद"
    ],
    [
      "seconds",
      "सेकंद"
    ],
    [
      "Central",
      "मध्यवर्ती"
    ],
    [
      "Highest",
      "सर्वाधिक"
    ],
    [
      "Nearest",
      "सर्वात जवळचे"
    ],
    [
      "Optimal",
      "उत्कृष्ट योग्य"
    ],
    [
      "Quintal",
      "क्विंटल"
    ],
    [
      "quintal",
      "क्विंटल"
    ],
    [
      "Partial",
      "अंशतः"
    ],
    [
      "Checker",
      "तपासणी साधन"
    ],
    [
      "Channel",
      "वाहिनी चॅनेल"
    ],
    [
      "Banking",
      "बँकिंग"
    ],
    [
      "Account",
      "खाते"
    ],
    [
      "Privacy",
      "गोपनीयता"
    ],
    [
      "Without",
      "शिवाय"
    ],
    [
      "without",
      "शिवाय"
    ],
    [
      "Against",
      "विरोधात"
    ],
    [
      "against",
      "विरुद्ध"
    ],
    [
      "Another",
      "दुसरे"
    ],
    [
      "another",
      "दुसरे"
    ],
    [
      "Explore",
      "एक्सप्लोर करा"
    ],
    [
      "explore",
      "एक्सप्लोर करा"
    ],
    [
      "Receive",
      "स्वीकारा मिळवा"
    ],
    [
      "receive",
      "मिळवा"
    ],
    [
      "replies",
      "उत्तरे"
    ],
    [
      "Replies",
      "उत्तरे"
    ],
    [
      "Request",
      "विनंती"
    ],
    [
      "request",
      "विनंती"
    ],
    [
      "Holding",
      "राखून ठेवलेली रक्कम"
    ],
    [
      "Jointly",
      "संयुक्तपणे"
    ],
    [
      "jointly",
      "संयुक्तपणे"
    ],
    [
      "Partner",
      "भागीदार"
    ],
    [
      "partner",
      "भागीदार"
    ],
    [
      "Weather",
      "हवामान अंदाज"
    ],
    [
      "weather",
      "हवामान"
    ],
    [
      "Complex",
      "संकुल आवार"
    ],
    [
      "complex",
      "संकुल"
    ],
    [
      "Cluster",
      "शेतकरी समूह (क्लस्टर)"
    ],
    [
      "cluster",
      "समूह"
    ],
    [
      "Marking",
      "गुणवत्ता चिन्हांकन"
    ],
    [
      "marking",
      "चिन्हांकन"
    ],
    [
      "Reflect",
      "दर्शवते"
    ],
    [
      "reflect",
      "दर्शवते"
    ],
    [
      "Records",
      "अधिकृत नोंदी"
    ],
    [
      "records",
      "नोंदी"
    ],
    [
      "Remains",
      "उरलेले राहते"
    ],
    [
      "remains",
      "राहते"
    ],
    [
      "Willing",
      "इच्छुक"
    ],
    [
      "willing",
      "इच्छुक"
    ],
    [
      "Premium",
      "प्रीमियम दर्जेदार"
    ],
    [
      "premium",
      "प्रीमियम"
    ],
    [
      "Primary",
      "प्राथमिक"
    ],
    [
      "primary",
      "प्राथमिक"
    ],
    [
      "Padding",
      "पॅडिंग अंतर"
    ],
    [
      "padding",
      "अंतर"
    ],
    [
      "Trained",
      "प्रशिक्षित"
    ],
    [
      "trained",
      "प्रशिक्षित"
    ],
    [
      "Appears",
      "दिसते"
    ],
    [
      "appears",
      "दिसते"
    ],
    [
      "English",
      "English"
    ],
    [
      "Marathi",
      "मराठी"
    ],
    [
      "ACCOUNT",
      "खाते"
    ],
    [
      "AUCTION",
      "लिलाव बोली"
    ],
    [
      "Auction",
      "लिलाव बोली"
    ],
    [
      "auction",
      "लिलाव"
    ],
    [
      "Already",
      "आधीच"
    ],
    [
      "Ambient",
      "सामान्य हवेतील"
    ],
    [
      "account",
      "खाते"
    ],
    [
      "Compare",
      "तुलना करा"
    ],
    [
      "Created",
      "तयार केले"
    ],
    [
      "Current",
      "सध्याचे चालू"
    ],
    [
      "DEPOSIT",
      "जमा करा"
    ],
    [
      "Express",
      "जलद एक्सप्रेस"
    ],
    [
      "Forward",
      "पुढे पाठवा"
    ],
    [
      "forward",
      "पुढे"
    ],
    [
      "Gateway",
      "पेमेंट गेटवे"
    ],
    [
      "Insured",
      "विमा उतरवलेले"
    ],
    [
      "Kishore",
      "किशोर"
    ],
    [
      "locking",
      "लॉक करत आहे"
    ],
    [
      "NETWORK",
      "नेटवर्क"
    ],
    [
      "Permits",
      "परवाने"
    ],
    [
      "REVERSE",
      "उलटी लिलाव प्रक्रिया"
    ],
    [
      "reverse",
      "रिव्हर्स"
    ],
    [
      "Secured",
      "सुरक्षित संरक्षित"
    ],
    [
      "VIRTUAL",
      "व्हर्च्युअल डिजिटल"
    ],
    [
      "climate",
      "हवामान"
    ],
    [
      "instant",
      "तात्काळ"
    ],
    [
      "procure",
      "खरेदी करा"
    ],
    [
      "quality",
      "गुणवत्ता"
    ],
    [
      "salvage",
      "मदत खरेदी"
    ],
    [
      "updated",
      "अद्ययावत केलेले"
    ],
    [
      "variety",
      "वाण"
    ],
    [
      "Manchar",
      "मंचर"
    ],
    [
      "Kalamna",
      "कळमना"
    ],
    [
      "Indapur",
      "इंदापूर"
    ],
    [
      "Pachora",
      "पाचोरा"
    ],
    [
      "Tasgaon",
      "तासगाव"
    ],
    [
      "Sangola",
      "सांगोला"
    ],
    [
      "Phaltan",
      "फलटण"
    ],
    [
      "Vadgaon",
      "वडगाव"
    ],
    [
      "Shiroli",
      "शिरोली"
    ],
    [
      "Shirpur",
      "शिरपूर"
    ],
    [
      "Shahada",
      "शहादा"
    ],
    [
      "Karanja",
      "कारंजा"
    ],
    [
      "Degloor",
      "देगलूर"
    ],
    [
      "Paithan",
      "पैठण"
    ],
    [
      "Alibaug",
      "अलिबाग"
    ],
    [
      "digital",
      "डिजिटल"
    ],
    [
      "DIGITAL",
      "डिजिटल"
    ],
    [
      "trustee",
      "विश्वस्त"
    ],
    [
      "Officer",
      "अधिकारी"
    ],
    [
      "officer",
      "अधिकारी"
    ],
    [
      "Pickups",
      "पिकअप्स"
    ],
    [
      "happens",
      "घडते"
    ],
    [
      "Drivers",
      "चालक"
    ],
    [
      "Village",
      "गाव"
    ],
    [
      "village",
      "गाव"
    ],
    [
      "Command",
      "आदेश"
    ],
    [
      "command",
      "आदेश"
    ],
    [
      "genuine",
      "विश्वासार्ह"
    ],
    [
      "Genuine",
      "विश्वासार्ह"
    ],
    [
      "Bargain",
      "घासाघिस"
    ],
    [
      "bargain",
      "घासाघिस"
    ],
    [
      "highway",
      "महामार्ग"
    ],
    [
      "Surplus",
      "अतिरिक्त"
    ],
    [
      "surplus",
      "अतिरिक्त"
    ],
    [
      "PARTIAL",
      "अंशतः"
    ],
    [
      "Machine",
      "यंत्र"
    ],
    [
      "machine",
      "यंत्र"
    ],
    [
      "loading",
      "लोडिंग"
    ],
    [
      "Selling",
      "विक्री"
    ],
    [
      "selling",
      "विक्री"
    ],
    [
      "OFFERED",
      "दिलेला"
    ],
    [
      "Offered",
      "दिलेला"
    ],
    [
      "offered",
      "दिलेला"
    ],
    [
      "Inspect",
      "तपासा"
    ],
    [
      "Restore",
      "पुनर्संचयित करा"
    ],
    [
      "restore",
      "पुनर्संचयित करा"
    ],
    [
      "Suspend",
      "निलंबित करा"
    ],
    [
      "suspend",
      "निलंबित करा"
    ],
    [
      "Trading",
      "व्यापार"
    ],
    [
      "trading",
      "व्यापार"
    ],
    [
      "De-list",
      "नोंद रद्द करा"
    ],
    [
      "de-list",
      "नोंद रद्द करा"
    ],
    [
      "Re-list",
      "पुन्हा नोंदवा"
    ],
    [
      "re-list",
      "पुन्हा नोंदवा"
    ],
    [
      "Payouts",
      "जमा रकमा"
    ],
    [
      "payouts",
      "जमा रकमा"
    ],
    [
      "release",
      "वितरित करा"
    ],
    [
      "Cleared",
      "मंजूर"
    ],
    [
      "cleared",
      "मंजूर"
    ],
    [
      "Mumbai",
      "मुंबई"
    ],
    [
      "mumbai",
      "मुंबई"
    ],
    [
      "Review",
      "तपासणी करा"
    ],
    [
      "review",
      "तपासणी"
    ],
    [
      "Mature",
      "परिपक्व"
    ],
    [
      "mature",
      "परिपक्व"
    ],
    [
      "MATURE",
      "परिपक्व"
    ],
    [
      "Packed",
      "पॅक केलेले"
    ],
    [
      "packed",
      "पॅक केलेले"
    ],
    [
      "PACKED",
      "पॅक केलेले"
    ],
    [
      "Crates",
      "क्रेट्स"
    ],
    [
      "crates",
      "क्रेट्स"
    ],
    [
      "Origin",
      "उगम"
    ],
    [
      "origin",
      "उगम"
    ],
    [
      "Grains",
      "अन्नधान्ये"
    ],
    [
      "Pulses",
      "कडधान्ये"
    ],
    [
      "pulses",
      "कडधान्ये"
    ],
    [
      "Fruits",
      "फळे"
    ],
    [
      "Spices",
      "मसाले"
    ],
    [
      "Cotton",
      "कापूस"
    ],
    [
      "Tomato",
      "टोमॅटो"
    ],
    [
      "Potato",
      "बटाटा"
    ],
    [
      "Banana",
      "केळी"
    ],
    [
      "Grapes",
      "द्राक्षे"
    ],
    [
      "Orange",
      "संत्री"
    ],
    [
      "Chilli",
      "मिरची"
    ],
    [
      "Bhagwa",
      "भगवा डाळिंब"
    ],
    [
      "Shivam",
      "शिवम"
    ],
    [
      "Hybrid",
      "संकरित"
    ],
    [
      "Curing",
      "क्युरिंग सुकवणे"
    ],
    [
      "Finger",
      "हळद कांडी"
    ],
    [
      "Buyers",
      "खरेदीदार"
    ],
    [
      "buyers",
      "खरेदीदार"
    ],
    [
      "Seller",
      "विक्रेता"
    ],
    [
      "SELLER",
      "विक्रेता"
    ],
    [
      "seller",
      "विक्रेता"
    ],
    [
      "Farmer",
      "शेतकरी"
    ],
    [
      "FARMER",
      "शेतकरी"
    ],
    [
      "farmer",
      "शेतकरी"
    ],
    [
      "Trader",
      "व्यापारी"
    ],
    [
      "Retail",
      "किरकोळ"
    ],
    [
      "Makers",
      "उत्पादक"
    ],
    [
      "Market",
      "बाजारपेठ"
    ],
    [
      "Mandis",
      "बाजार समित्या"
    ],
    [
      "Portal",
      "पोर्टल"
    ],
    [
      "PORTAL",
      "पोर्टल"
    ],
    [
      "Demand",
      "मागणी कोटा"
    ],
    [
      "Quotas",
      "कोटा"
    ],
    [
      "quotas",
      "कोटा"
    ],
    [
      "Buyout",
      "तातडीची खरेदी"
    ],
    [
      "Offers",
      "प्रस्ताव"
    ],
    [
      "Clause",
      "कलम अट"
    ],
    [
      "Escrow",
      "एस्क्रो सुरक्षित ठेव"
    ],
    [
      "ESCROW",
      "एस्क्रो सुरक्षित ठेव"
    ],
    [
      "escrow",
      "एस्क्रो"
    ],
    [
      "Payout",
      "रक्कम वाटप"
    ],
    [
      "payout",
      "वाटप"
    ],
    [
      "Credit",
      "जमा पत"
    ],
    [
      "credit",
      "जमा पत"
    ],
    [
      "Refund",
      "रक्कम परतावा"
    ],
    [
      "refund",
      "परतावा"
    ],
    [
      "Rebate",
      "सूट रिबेट"
    ],
    [
      "rebate",
      "सूट"
    ],
    [
      "Pledge",
      "तारण पावती"
    ],
    [
      "pledge",
      "तारण"
    ],
    [
      "Tenure",
      "कालावधी मुदत"
    ],
    [
      "Liquid",
      "तरल रोकड"
    ],
    [
      "Prices",
      "दर"
    ],
    [
      "prices",
      "दर"
    ],
    [
      "Tariff",
      "दर पत्रक"
    ],
    [
      "Hamali",
      "हमाली तोलाई"
    ],
    [
      "hamali",
      "हमाली"
    ],
    [
      "Broker",
      "दलाल मध्यस्थ"
    ],
    [
      "Spread",
      "दर फरक मार्जिन"
    ],
    [
      "Losses",
      "नुकसान"
    ],
    [
      "losses",
      "नुकसान"
    ],
    [
      "Saving",
      "बचत"
    ],
    [
      "Values",
      "मूल्ये"
    ],
    [
      "Landed",
      "गोदाम पोहोच"
    ],
    [
      "landed",
      "गोदाम पोहोच"
    ],
    [
      "Amount",
      "रक्कम"
    ],
    [
      "AMOUNT",
      "रक्कम"
    ],
    [
      "Hauler",
      "वाहतूकदार ट्रान्सपोर्टर"
    ],
    [
      "Delays",
      "विलंब खोळंबा"
    ],
    [
      "delays",
      "विलंब"
    ],
    [
      "Reefer",
      "शीतगृह रेफ्रिजरेटेड ट्रक"
    ],
    [
      "Driver",
      "चालक"
    ],
    [
      "driver",
      "चालक"
    ],
    [
      "Sealed",
      "सील बंद"
    ],
    [
      "Sensor",
      "आयओटी सेन्सर"
    ],
    [
      "Beacon",
      "जीपीएस बीकन"
    ],
    [
      "Stored",
      "साठवले"
    ],
    [
      "Crates",
      "क्रॅट्स पेट्या"
    ],
    [
      "crates",
      "क्रॅट्स पेट्या"
    ],
    [
      "Inward",
      "आवक माल नोंद"
    ],
    [
      "Pickup",
      "माल उचलणे पिकअप"
    ],
    [
      "pickup",
      "पिकअप"
    ],
    [
      "Grades",
      "प्रतवारी"
    ],
    [
      "Assays",
      "प्रयोगशाळा अहवाल"
    ],
    [
      "assays",
      "तपासणी"
    ],
    [
      "Rotten",
      "सडलेला शेतीमाल"
    ],
    [
      "rotten",
      "सडलेला"
    ],
    [
      "Claims",
      "दावे"
    ],
    [
      "Freeze",
      "रक्कम गोठवा (फ्रीझ)"
    ],
    [
      "Frozen",
      "गोठवलेले"
    ],
    [
      "Ruling",
      "न्यायिक निर्णय"
    ],
    [
      "ruling",
      "निर्णय"
    ],
    [
      "Trends",
      "बाजार प्रवाह कल"
    ],
    [
      "trends",
      "प्रवाह कल"
    ],
    [
      "Inflow",
      "आवक प्रवाह"
    ],
    [
      "Volume",
      "आवक प्रमाण"
    ],
    [
      "Curves",
      "किंमत वक्र"
    ],
    [
      "curves",
      "वक्र"
    ],
    [
      "Search",
      "शोधा"
    ],
    [
      "search",
      "शोधा"
    ],
    [
      "Filter",
      "फिल्टर करा"
    ],
    [
      "filter",
      "फिल्टर"
    ],
    [
      "Action",
      "कृती"
    ],
    [
      "ACTION",
      "कृती"
    ],
    [
      "Status",
      "स्थिती"
    ],
    [
      "STATUS",
      "स्थिती"
    ],
    [
      "status",
      "स्थिती"
    ],
    [
      "Active",
      "सक्रिय"
    ],
    [
      "active",
      "सक्रिय"
    ],
    [
      "Booked",
      "बुक केलेले"
    ],
    [
      "Cancel",
      "रद्द करा"
    ],
    [
      "cancel",
      "रद्द करा"
    ],
    [
      "Submit",
      "सादर करा"
    ],
    [
      "submit",
      "सादर करा"
    ],
    [
      "Delete",
      "हटवा"
    ],
    [
      "Ledger",
      "खातेवही (लेजर)"
    ],
    [
      "Report",
      "अहवाल"
    ],
    [
      "Logout",
      "लॉगआउट"
    ],
    [
      "Select",
      "निवडा"
    ],
    [
      "select",
      "निवडा"
    ],
    [
      "Choose",
      "निवडा"
    ],
    [
      "Create",
      "तयार करा"
    ],
    [
      "Change",
      "बदला"
    ],
    [
      "Switch",
      "बदला"
    ],
    [
      "Urgent",
      "तातडीचे"
    ],
    [
      "Custom",
      "पसंतीचे"
    ],
    [
      "Manual",
      "मॅन्युअल"
    ],
    [
      "Synced",
      "सिंक झाले"
    ],
    [
      "Online",
      "ऑनलाइन"
    ],
    [
      "Number",
      "क्रमांक"
    ],
    [
      "NUMBER",
      "क्रमांक"
    ],
    [
      "Months",
      "महिने"
    ],
    [
      "Origin",
      "उगम मूळ स्थान"
    ],
    [
      "origin",
      "उगम स्थान"
    ],
    [
      "Higher",
      "जास्त"
    ],
    [
      "Lowest",
      "किमान"
    ],
    [
      "Better",
      "अधिक चांगले"
    ],
    [
      "Branch",
      "शाखा"
    ],
    [
      "Holder",
      "खातेधारक"
    ],
    [
      "Wallet",
      "सुरक्षित वॉलेट"
    ],
    [
      "Engine",
      "इंजिन यंत्रणा"
    ],
    [
      "ENGINE",
      "यंत्रणा"
    ],
    [
      "System",
      "प्रणाली"
    ],
    [
      "Policy",
      "धोरण"
    ],
    [
      "Within",
      "च्या आत"
    ],
    [
      "within",
      "च्या आत"
    ],
    [
      "Across",
      "राज्यभरात"
    ],
    [
      "across",
      "भर"
    ],
    [
      "During",
      "दरम्यान"
    ],
    [
      "during",
      "दरम्यान"
    ],
    [
      "Browse",
      "ब्राउज करा"
    ],
    [
      "browse",
      "ब्राउज करा"
    ],
    [
      "Unlock",
      "अनलॉक करा"
    ],
    [
      "unlock",
      "अनलॉक करा"
    ],
    [
      "Mutual",
      "परस्पर संमतीने"
    ],
    [
      "mutual",
      "परस्पर"
    ],
    [
      "Stream",
      "थेट प्रवाह"
    ],
    [
      "stream",
      "प्रवाह"
    ],
    [
      "Attach",
      "जोडा संलग्न करा"
    ],
    [
      "attach",
      "जोडा"
    ],
    [
      "Upload",
      "अपलोड करा"
    ],
    [
      "upload",
      "अपलोड करा"
    ],
    [
      "Filing",
      "दाखल करणे"
    ],
    [
      "filing",
      "दाखल करणे"
    ],
    [
      "Radius",
      "त्रिज्या परिसर"
    ],
    [
      "radius",
      "परिसर"
    ],
    [
      "Marked",
      "चिन्हांकित केलेले"
    ],
    [
      "marked",
      "चिन्हांकित"
    ],
    [
      "Mapped",
      "मॅप केलेले जोडलेले"
    ],
    [
      "mapped",
      "जोडलेले"
    ],
    [
      "Signal",
      "सिग्नल"
    ],
    [
      "signal",
      "सिग्नल"
    ],
    [
      "Bypass",
      "मध्यस्थ वगळा (बायपास)"
    ],
    [
      "bypass",
      "वगळा"
    ],
    [
      "Direct",
      "थेट खरेदी"
    ],
    [
      "direct",
      "थेट"
    ],
    [
      "DIRECT",
      "थेट"
    ],
    [
      "Yellow",
      "पिवळा"
    ],
    [
      "yellow",
      "पिवळा"
    ],
    [
      "Border",
      "सीमा रेषा"
    ],
    [
      "border",
      "सीमा"
    ],
    [
      "Orders",
      "खरेदी ऑर्डर्स"
    ],
    [
      "orders",
      "ऑर्डर्स"
    ],
    [
      "ORDERS",
      "ऑर्डर्स"
    ],
    [
      "Appear",
      "दिसते"
    ],
    [
      "appear",
      "दिसते"
    ],
    [
      "Indian",
      "भारतीय"
    ],
    [
      "Konkan",
      "कोकण"
    ],
    [
      "ACTIVE",
      "सक्रिय"
    ],
    [
      "Accept",
      "स्वीकारा"
    ],
    [
      "accept",
      "स्वीकारा"
    ],
    [
      "Agreed",
      "संमत ठरलेले"
    ],
    [
      "BRANCH",
      "शाखा"
    ],
    [
      "Buffer",
      "राखीव बफर साठा"
    ],
    [
      "Client",
      "ग्राहक खरेदीदार"
    ],
    [
      "client",
      "ग्राहक"
    ],
    [
      "EICHER",
      "आयशर"
    ],
    [
      "Entire",
      "संपूर्ण"
    ],
    [
      "Export",
      "निर्यात दर्जा"
    ],
    [
      "export",
      "निर्यात"
    ],
    [
      "Google",
      "गुगल"
    ],
    [
      "ISSUED",
      "जारी केले"
    ],
    [
      "Jadhav",
      "जाधव"
    ],
    [
      "Locked",
      "सुरक्षित लॉक केलेले"
    ],
    [
      "locked",
      "सुरक्षित लॉक"
    ],
    [
      "Rajesh",
      "राजेश"
    ],
    [
      "Rating",
      "विश्वासार्हता रेटिंग"
    ],
    [
      "rating",
      "रेटिंग"
    ],
    [
      "return",
      "परत"
    ],
    [
      "Selvam",
      "सेल्वम"
    ],
    [
      "Shinde",
      "शिंदे"
    ],
    [
      "Source",
      "उगम खरेदी स्रोत"
    ],
    [
      "Target",
      "लक्षित दर / प्रमाण"
    ],
    [
      "target",
      "लक्षित"
    ],
    [
      "Thorat",
      "थोरात"
    ],
    [
      "VOLUME",
      "आवक प्रमाण"
    ],
    [
      "Weight",
      "वजन"
    ],
    [
      "weight",
      "वजन"
    ],
    [
      "beacon",
      "बीकन"
    ],
    [
      "change",
      "बदला"
    ],
    [
      "demand",
      "मागणी"
    ],
    [
      "diesel",
      "डिझेल"
    ],
    [
      "frozen",
      "गोठवलेले"
    ],
    [
      "higher",
      "जास्त"
    ],
    [
      "linked",
      "जोडलेले"
    ],
    [
      "mandis",
      "बाजार समित्या"
    ],
    [
      "market",
      "बाजारपेठ"
    ],
    [
      "portal",
      "पोर्टल"
    ],
    [
      "report",
      "अहवाल"
    ],
    [
      "sensor",
      "सेन्सर"
    ],
    [
      "tested",
      "तपासणी झालेले"
    ],
    [
      "Junnar",
      "जुन्नर"
    ],
    [
      "Rahata",
      "राहाता"
    ],
    [
      "Rahuri",
      "राहुरी"
    ],
    [
      "Hingna",
      "हिंगणा"
    ],
    [
      "Chopda",
      "चोपडा"
    ],
    [
      "Barshi",
      "बार्शी"
    ],
    [
      "Shirol",
      "शिरोळ"
    ],
    [
      "Kannad",
      "कन्नड"
    ],
    [
      "Basmat",
      "वसमत"
    ],
    [
      "Dharur",
      "धारूर"
    ],
    [
      "Omerga",
      "उमरगा"
    ],
    [
      "Kalamb",
      "कळंब"
    ],
    [
      "Devgad",
      "देवगड"
    ],
    [
      "Kavita",
      "कविता"
    ],
    [
      "Sanjay",
      "संजय"
    ],
    [
      "Sangli",
      "सांगली"
    ],
    [
      "Matrix",
      "तक्ता मॅट्रिक्स"
    ],
    [
      "matrix",
      "मॅट्रिक्स"
    ],
    [
      "Hunter",
      "शोधक साधन"
    ],
    [
      "hunter",
      "शोधक"
    ],
    [
      "logout",
      "बाहेर पडा"
    ],
    [
      "switch",
      "बदला"
    ],
    [
      "Launch",
      "सुरू करा"
    ],
    [
      "launch",
      "सुरू करा"
    ],
    [
      "Fleets",
      "वाहतूक ताफा"
    ],
    [
      "Sector",
      "सेक्टर"
    ],
    [
      "sector",
      "सेक्टर"
    ],
    [
      "chilli",
      "मिरची"
    ],
    [
      "reefer",
      "रीफर"
    ],
    [
      "Global",
      "ग्लोबल"
    ],
    [
      "global",
      "ग्लोबल"
    ],
    [
      "grains",
      "धान्य"
    ],
    [
      "Excess",
      "जास्त"
    ],
    [
      "excess",
      "अतिरिक्त"
    ],
    [
      "Shimla",
      "शिमला"
    ],
    [
      "shimla",
      "शिमला"
    ],
    [
      "unsold",
      "न विकलेला"
    ],
    [
      "Unsold",
      "न विकलेला"
    ],
    [
      "Listen",
      "ऐका"
    ],
    [
      "listen",
      "ऐका"
    ],
    [
      "offers",
      "ऑफर्स"
    ],
    [
      "booked",
      "बुक केलेले"
    ],
    [
      "Trucks",
      "ट्रक्स"
    ],
    [
      "trucks",
      "ट्रक्स"
    ],
    [
      "STEADY",
      "स्थिर"
    ],
    [
      "Steady",
      "स्थिर"
    ],
    [
      "steady",
      "स्थिर"
    ],
    [
      "finger",
      "कांड्या"
    ],
    [
      "Filled",
      "पूर्ण"
    ],
    [
      "filled",
      "पूर्ण"
    ],
    [
      "Season",
      "हंगाम"
    ],
    [
      "season",
      "हंगाम"
    ],
    [
      "strong",
      "जोरदार"
    ],
    [
      "Strong",
      "जोरदार"
    ],
    [
      "Triage",
      "तातडीचा निपटारा"
    ],
    [
      "triage",
      "निपटारा"
    ],
    [
      "Access",
      "प्रवेश"
    ],
    [
      "access",
      "प्रवेश"
    ],
    [
      "Remove",
      "काढून टाका"
    ],
    [
      "remove",
      "काढून टाका"
    ],
    [
      "QUOTA",
      "कोटा"
    ],
    [
      "quota",
      "कोटा"
    ],
    [
      "Gunny",
      "बारदान पोती"
    ],
    [
      "gunny",
      "बारदान"
    ],
    [
      "Hands",
      "घड"
    ],
    [
      "hands",
      "घड"
    ],
    [
      "Bulbs",
      "गाठी"
    ],
    [
      "bulbs",
      "गाठी"
    ],
    [
      "Lined",
      "अस्तरयुक्त"
    ],
    [
      "lined",
      "अस्तरयुक्त"
    ],
    [
      "Crops",
      "पिके"
    ],
    [
      "crops",
      "पिके"
    ],
    [
      "Grain",
      "अन्नधान्य"
    ],
    [
      "grain",
      "धान्य"
    ],
    [
      "Spice",
      "मसाला"
    ],
    [
      "Onion",
      "कांदा"
    ],
    [
      "onion",
      "कांदा"
    ],
    [
      "Mango",
      "आंबा"
    ],
    [
      "Jowar",
      "ज्वारी"
    ],
    [
      "Paddy",
      "भात (धान)"
    ],
    [
      "Hapus",
      "हापूस"
    ],
    [
      "Garwa",
      "गरवा कांदा"
    ],
    [
      "Naine",
      "ग्रँड नैन"
    ],
    [
      "Grand",
      "ग्रँड"
    ],
    [
      "Fresh",
      "ताजा"
    ],
    [
      "Puree",
      "प्युरी गर"
    ],
    [
      "Sauce",
      "सॉस"
    ],
    [
      "Gluts",
      "अतिरिक्त आवक"
    ],
    [
      "gluts",
      "अतिरिक्त आवक"
    ],
    [
      "Buyer",
      "खरेदीदार"
    ],
    [
      "BUYER",
      "खरेदीदार"
    ],
    [
      "buyer",
      "खरेदीदार"
    ],
    [
      "Trade",
      "व्यापार व्यवहार"
    ],
    [
      "Maker",
      "उत्पादक"
    ],
    [
      "Mandi",
      "बाजार समिती"
    ],
    [
      "Quota",
      "कोटा"
    ],
    [
      "Offer",
      "प्रस्ताव ऑफर"
    ],
    [
      "offer",
      "प्रस्ताव"
    ],
    [
      "Legal",
      "कायदेशीर"
    ],
    [
      "Vault",
      "सुरक्षित व्हॉल्ट"
    ],
    [
      "Loans",
      "कर्जे"
    ],
    [
      "loans",
      "कर्जे"
    ],
    [
      "Funds",
      "निधी"
    ],
    [
      "funds",
      "निधी"
    ],
    [
      "Costs",
      "खर्च"
    ],
    [
      "costs",
      "खर्च"
    ],
    [
      "Price",
      "दर किंमत"
    ],
    [
      "PRICE",
      "दर किंमत"
    ],
    [
      "price",
      "दर"
    ],
    [
      "Rates",
      "दर"
    ],
    [
      "rates",
      "दर"
    ],
    [
      "Taxes",
      "कर"
    ],
    [
      "Tolls",
      "टोल कर"
    ],
    [
      "tolls",
      "टोल कर"
    ],
    [
      "Saved",
      "बचत"
    ],
    [
      "saved",
      "बचत"
    ],
    [
      "Value",
      "मूल्य"
    ],
    [
      "value",
      "मूल्य"
    ],
    [
      "Total",
      "एकूण"
    ],
    [
      "TOTAL",
      "एकूण"
    ],
    [
      "total",
      "एकूण"
    ],
    [
      "Modal",
      "सरासरी लिलाव दर"
    ],
    [
      "MODAL",
      "सरासरी दर"
    ],
    [
      "modal",
      "सरासरी दर"
    ],
    [
      "Floor",
      "तळ किमान दर"
    ],
    [
      "Truck",
      "मालवाहू ट्रक"
    ],
    [
      "truck",
      "ट्रक"
    ],
    [
      "Fleet",
      "वाहन ताफा"
    ],
    [
      "fleet",
      "वाहन ताफा"
    ],
    [
      "Cargo",
      "माल कार्गो"
    ],
    [
      "Route",
      "वाहतूक मार्ग"
    ],
    [
      "Gross",
      "स्थूल एकूण वजन"
    ],
    [
      "Slips",
      "पावत्या"
    ],
    [
      "slips",
      "पावत्या"
    ],
    [
      "Track",
      "ट्रॅक करा"
    ],
    [
      "Store",
      "साठवा"
    ],
    [
      "Silos",
      "सायलो"
    ],
    [
      "silos",
      "सायलो"
    ],
    [
      "Solar",
      "सौर ऊर्जा"
    ],
    [
      "Stack",
      "पोत्यांची थप्पी (स्टॅक)"
    ],
    [
      "Slots",
      "स्लॉट्स"
    ],
    [
      "slots",
      "स्लॉट्स"
    ],
    [
      "Space",
      "जागा जागा"
    ],
    [
      "space",
      "जागा"
    ],
    [
      "Boxes",
      "खोके बॉक्सेस"
    ],
    [
      "Crate",
      "क्रॅट"
    ],
    [
      "Gunny",
      "तागाची पोती"
    ],
    [
      "Loose",
      "सुटा माल"
    ],
    [
      "Grade",
      "प्रतवारी"
    ],
    [
      "Assay",
      "गुणवत्ता तपासणी"
    ],
    [
      "Score",
      "गुणवत्ता स्कोअर"
    ],
    [
      "Claim",
      "दावा तक्रार"
    ],
    [
      "Proof",
      "पुरावा"
    ],
    [
      "Trend",
      "कल"
    ],
    [
      "Close",
      "बंद करा"
    ],
    [
      "close",
      "बंद करा"
    ],
    [
      "Print",
      "प्रिंट करा"
    ],
    [
      "print",
      "प्रिंट करा"
    ],
    [
      "Audit",
      "ऑडिट तपासणी"
    ],
    [
      "Table",
      "तक्ता सारणी"
    ],
    [
      "Enter",
      "प्रविष्ट करा"
    ],
    [
      "enter",
      "प्रविष्ट करा"
    ],
    [
      "Phone",
      "फोन नंबर"
    ],
    [
      "Guide",
      "मार्गदर्शक"
    ],
    [
      "Night",
      "रात्र"
    ],
    [
      "Hello",
      "नमस्कार"
    ],
    [
      "Click",
      "क्लिक करा"
    ],
    [
      "Alert",
      "सूचना इशारा"
    ],
    [
      "Today",
      "आज"
    ],
    [
      "today",
      "आज"
    ],
    [
      "Hours",
      "तास"
    ],
    [
      "hours",
      "तास"
    ],
    [
      "Month",
      "महिना"
    ],
    [
      "month",
      "महिना"
    ],
    [
      "State",
      "राज्य"
    ],
    [
      "Quick",
      "झटपट"
    ],
    [
      "Lower",
      "कमी"
    ],
    [
      "Units",
      "एकके"
    ],
    [
      "Lakhs",
      "लाख"
    ],
    [
      "Ratio",
      "प्रमाण गुणोत्तर"
    ],
    [
      "Empty",
      "रिकामे"
    ],
    [
      "Fully",
      "पूर्णपणे"
    ],
    [
      "Ready",
      "सज्ज तयार"
    ],
    [
      "Layer",
      "थर लेयर"
    ],
    [
      "Terms",
      "अटी व शर्ती"
    ],
    [
      "terms",
      "अटी"
    ],
    [
      "Shall",
      "असेल"
    ],
    [
      "shall",
      "असेल"
    ],
    [
      "Under",
      "अंतर्गत"
    ],
    [
      "under",
      "अंतर्गत"
    ],
    [
      "Until",
      "पर्यंत"
    ],
    [
      "until",
      "पर्यंत"
    ],
    [
      "While",
      "दरम्यान"
    ],
    [
      "while",
      "दरम्यान"
    ],
    [
      "Other",
      "इतर"
    ],
    [
      "other",
      "इतर"
    ],
    [
      "Every",
      "प्रत्येक"
    ],
    [
      "every",
      "प्रत्येक"
    ],
    [
      "Party",
      "पक्षकार पक्ष"
    ],
    [
      "party",
      "पक्षकार"
    ],
    [
      "Trial",
      "चाचणी"
    ],
    [
      "trial",
      "चाचणी"
    ],
    [
      "Shelf",
      "टिकवण क्षमता (शेल्फ लाइफ)"
    ],
    [
      "shelf",
      "टिकवण क्षमता"
    ],
    [
      "Point",
      "मुद्दा केंद्र"
    ],
    [
      "point",
      "मुद्दा"
    ],
    [
      "Board",
      "मंडळ बोर्ड"
    ],
    [
      "board",
      "मंडळ"
    ],
    [
      "Marks",
      "खूणा शिक्के"
    ],
    [
      "White",
      "पांढरा"
    ],
    [
      "white",
      "पांढरा"
    ],
    [
      "Color",
      "रंग"
    ],
    [
      "color",
      "रंग"
    ],
    [
      "Style",
      "शैली"
    ],
    [
      "style",
      "शैली"
    ],
    [
      "Event",
      "प्रसंग घटना"
    ],
    [
      "event",
      "घटना"
    ],
    [
      "Cards",
      "कार्ड्स"
    ],
    [
      "Order",
      "ऑर्डर"
    ],
    [
      "order",
      "ऑर्डर"
    ],
    [
      "Match",
      "जुळणारे"
    ],
    [
      "match",
      "जुळणी"
    ],
    [
      "Hindi",
      "हिन्दी"
    ],
    [
      "India",
      "भारत"
    ],
    [
      "MIHAN",
      "मिहान"
    ],
    [
      "Agent",
      "प्रतिनिधी एजंट"
    ],
    [
      "Belts",
      "उत्पादन पट्टे"
    ],
    [
      "belts",
      "पट्टे"
    ],
    [
      "Chain",
      "पुरवठा साखळी"
    ],
    [
      "chain",
      "साखळी"
    ],
    [
      "ENTER",
      "नोंदवा"
    ],
    [
      "Final",
      "अंतिम"
    ],
    [
      "final",
      "अंतिम"
    ],
    [
      "Heavy",
      "अवजड वजनदार"
    ],
    [
      "Index",
      "निर्देशांक"
    ],
    [
      "Issue",
      "तक्रार समस्या"
    ],
    [
      "issue",
      "समस्या"
    ],
    [
      "Kisan",
      "शेतकरी किसान"
    ],
    [
      "Model",
      "मॉडेल नमुना"
    ],
    [
      "Multi",
      "बहुविध"
    ],
    [
      "Nodal",
      "नोडल मुख्य केंद्र"
    ],
    [
      "nodal",
      "नोडल"
    ],
    [
      "Patil",
      "पाटील"
    ],
    [
      "Photo",
      "फोटो छायाचित्र"
    ],
    [
      "Plate",
      "नंबर प्लेट"
    ],
    [
      "plate",
      "नंबर प्लेट"
    ],
    [
      "SMART",
      "स्मार्ट डिजिटल"
    ],
    [
      "Smart",
      "स्मार्ट"
    ],
    [
      "smart",
      "स्मार्ट"
    ],
    [
      "Short",
      "कमी अपुरा"
    ],
    [
      "Speed",
      "वेग गती"
    ],
    [
      "Trail",
      "नोंद ट्रेल"
    ],
    [
      "Trust",
      "विश्वासार्हता"
    ],
    [
      "trust",
      "विश्वास"
    ],
    [
      "assay",
      "गुणवत्ता तपासणी"
    ],
    [
      "based",
      "आधारित"
    ],
    [
      "claim",
      "दावा"
    ],
    [
      "favor",
      "बाजूने"
    ],
    [
      "feeds",
      "थेट अपडेट्स"
    ],
    [
      "fully",
      "पूर्णपणे"
    ],
    [
      "major",
      "प्रमुख मुख्य"
    ],
    [
      "mandi",
      "बाजार समिती"
    ],
    [
      "times",
      "वेळा"
    ],
    [
      "Vashi",
      "वाशी"
    ],
    [
      "Katol",
      "काटोल"
    ],
    [
      "Raver",
      "रावेर"
    ],
    [
      "Karad",
      "कराड"
    ],
    [
      "Sakri",
      "साक्री"
    ],
    [
      "Warud",
      "वरुड"
    ],
    [
      "Ambad",
      "अंबड"
    ],
    [
      "Nagar",
      "अहमदनगर"
    ],
    [
      "Shahu",
      "शाहू"
    ],
    [
      "APMCs",
      "बाजार समित्या"
    ],
    [
      "Euler",
      "ऑयलर"
    ],
    [
      "crate",
      "क्रेट"
    ],
    [
      "ready",
      "सज्ज"
    ],
    [
      "click",
      "क्लिक करा"
    ],
    [
      "Names",
      "नावे"
    ],
    [
      "lower",
      "कमी"
    ],
    [
      "Voice",
      "आवाज"
    ],
    [
      "voice",
      "आवाज"
    ],
    [
      "Green",
      "हिरवी"
    ],
    [
      "green",
      "हिरवी"
    ],
    [
      "grade",
      "प्रत"
    ],
    [
      "Speak",
      "बोला"
    ],
    [
      "speak",
      "बोला"
    ],
    [
      "Press",
      "दाबा"
    ],
    [
      "press",
      "दाबा"
    ],
    [
      "photo",
      "छायाचित्र"
    ],
    [
      "track",
      "मागोवा घ्या"
    ],
    [
      "vault",
      "सुरक्षित तिजोरी"
    ],
    [
      "TODAY",
      "आज"
    ],
    [
      "STORE",
      "साठवा"
    ],
    [
      "store",
      "साठवणूक"
    ],
    [
      "Whole",
      "अख्खी"
    ],
    [
      "whole",
      "अख्खी"
    ],
    [
      "gross",
      "एकूण"
    ],
    [
      "fresh",
      "ताजा"
    ],
    [
      "quick",
      "जलद"
    ],
    [
      "trend",
      "कल"
    ],
    [
      "Brix",
      "ब्रिक्स"
    ],
    [
      "brix",
      "ब्रिक्स"
    ],
    [
      "HDPE",
      "HDPE"
    ],
    [
      "Jute",
      "जूट"
    ],
    [
      "jute",
      "जूट"
    ],
    [
      "Bags",
      "पोती"
    ],
    [
      "bags",
      "पोती"
    ],
    [
      "Skin",
      "साल"
    ],
    [
      "skin",
      "साल"
    ],
    [
      "Agro",
      "कृषी ॲग्रो"
    ],
    [
      "Agri",
      "कृषी"
    ],
    [
      "AGRI",
      "कृषी"
    ],
    [
      "Crop",
      "पीक"
    ],
    [
      "Food",
      "अन्न अन्नप्रक्रिया"
    ],
    [
      "Feed",
      "पशूखाद्य"
    ],
    [
      "Yard",
      "बाजार यार्ड प्रांगण"
    ],
    [
      "Hubs",
      "केंद्रे"
    ],
    [
      "Buys",
      "खरेदी"
    ],
    [
      "Bids",
      "शेतकरी प्रस्ताव"
    ],
    [
      "Deed",
      "करारनामा"
    ],
    [
      "Paid",
      "भरणा केला"
    ],
    [
      "paid",
      "भरणा केला"
    ],
    [
      "Lien",
      "तारण अधिकार"
    ],
    [
      "lien",
      "तारण अधिकार"
    ],
    [
      "Loan",
      "कर्ज"
    ],
    [
      "loan",
      "कर्ज"
    ],
    [
      "Pool",
      "निधी पूल"
    ],
    [
      "Cost",
      "खर्च"
    ],
    [
      "cost",
      "खर्च"
    ],
    [
      "Rate",
      "दर"
    ],
    [
      "RATE",
      "दर"
    ],
    [
      "rate",
      "दर"
    ],
    [
      "Fees",
      "शुल्क"
    ],
    [
      "Cess",
      "सेस कर"
    ],
    [
      "cess",
      "सेस कर"
    ],
    [
      "Toll",
      "टोल"
    ],
    [
      "Loss",
      "नुकसान"
    ],
    [
      "loss",
      "नुकसान"
    ],
    [
      "Save",
      "जतन करा"
    ],
    [
      "Maxi",
      "मॅक्सी"
    ],
    [
      "Mini",
      "मिनी"
    ],
    [
      "Calc",
      "हिशोब"
    ],
    [
      "Axle",
      "ॲक्सल एक्सल"
    ],
    [
      "Road",
      "रस्ता"
    ],
    [
      "Tare",
      "रिकाम्या वाहनाचे वजन (टारे)"
    ],
    [
      "Slip",
      "वजन पावती स्लिप"
    ],
    [
      "slip",
      "पावती स्लिप"
    ],
    [
      "Pass",
      "गेट पास प्रवेशपत्र"
    ],
    [
      "pass",
      "गेट पास"
    ],
    [
      "Gate",
      "प्रवेश द्वार"
    ],
    [
      "gate",
      "प्रवेश द्वार"
    ],
    [
      "Seal",
      "सुरक्षा सील"
    ],
    [
      "Silo",
      "अन्नधान्य सायलो"
    ],
    [
      "silo",
      "सायलो"
    ],
    [
      "Temp",
      "तापमान"
    ],
    [
      "Slot",
      "जागा स्लॉट"
    ],
    [
      "Pack",
      "पॅक करा"
    ],
    [
      "Bags",
      "पोती कट्टे"
    ],
    [
      "Jute",
      "जूट ताग"
    ],
    [
      "Book",
      "बुक करा"
    ],
    [
      "book",
      "बुक करा"
    ],
    [
      "Edit",
      "संपादित करा"
    ],
    [
      "edit",
      "संपादित करा"
    ],
    [
      "View",
      "पहा"
    ],
    [
      "view",
      "पहा"
    ],
    [
      "Copy",
      "कॉपी करा"
    ],
    [
      "Logs",
      "नोंदी"
    ],
    [
      "Grid",
      "ग्रिड मांडणी"
    ],
    [
      "List",
      "यादी"
    ],
    [
      "Show",
      "दाखवा"
    ],
    [
      "show",
      "दाखवा"
    ],
    [
      "Hide",
      "लपवा"
    ],
    [
      "More",
      "अधिक पहा"
    ],
    [
      "Less",
      "कमी पहा"
    ],
    [
      "Next",
      "पुढे"
    ],
    [
      "Prev",
      "मागे"
    ],
    [
      "Post",
      "प्रसारित करा"
    ],
    [
      "Send",
      "पाठवा"
    ],
    [
      "send",
      "पाठवा"
    ],
    [
      "Type",
      "प्रकार / लिहा"
    ],
    [
      "TYPE",
      "प्रकार"
    ],
    [
      "type",
      "लिहा"
    ],
    [
      "Chat",
      "थेट चर्चा चॅट"
    ],
    [
      "chat",
      "चॅट"
    ],
    [
      "Call",
      "कॉल करा"
    ],
    [
      "Help",
      "मदत"
    ],
    [
      "Find",
      "शोधा मिळवा"
    ],
    [
      "Best",
      "सर्वोत्तम"
    ],
    [
      "Good",
      "शुभ"
    ],
    [
      "Info",
      "माहिती"
    ],
    [
      "Auto",
      "स्वयंचलित"
    ],
    [
      "Live",
      "थेट लाइव्ह"
    ],
    [
      "live",
      "थेट"
    ],
    [
      "Real",
      "वास्तविक"
    ],
    [
      "REAL",
      "वास्तविक"
    ],
    [
      "Sync",
      "सिंक करा"
    ],
    [
      "sync",
      "सिंक"
    ],
    [
      "Hash",
      "हॅश कोड"
    ],
    [
      "Code",
      "कोड"
    ],
    [
      "CODE",
      "कोड"
    ],
    [
      "Name",
      "नाव"
    ],
    [
      "NAME",
      "नाव"
    ],
    [
      "Date",
      "दिनांक तारीख"
    ],
    [
      "DATE",
      "तारीख"
    ],
    [
      "Time",
      "वेळ"
    ],
    [
      "TIME",
      "वेळ"
    ],
    [
      "time",
      "वेळ"
    ],
    [
      "Days",
      "दिवस"
    ],
    [
      "days",
      "दिवस"
    ],
    [
      "Hour",
      "तास"
    ],
    [
      "Mins",
      "मिनिटे"
    ],
    [
      "mins",
      "मिनिटे"
    ],
    [
      "Year",
      "वर्ष"
    ],
    [
      "year",
      "वर्ष"
    ],
    [
      "Fast",
      "जलद"
    ],
    [
      "High",
      "उच्च"
    ],
    [
      "Unit",
      "एकक"
    ],
    [
      "unit",
      "एकक"
    ],
    [
      "Zero",
      "शून्य"
    ],
    [
      "zero",
      "शून्य"
    ],
    [
      "Free",
      "मोफत मोफत"
    ],
    [
      "Full",
      "पूर्ण"
    ],
    [
      "Bank",
      "बँक"
    ],
    [
      "Card",
      "कार्ड पत्रक"
    ],
    [
      "Step",
      "टप्पा पायरी"
    ],
    [
      "Your",
      "तुमचे"
    ],
    [
      "your",
      "तुमचे"
    ],
    [
      "From",
      "कडून / येथून"
    ],
    [
      "from",
      "येथून"
    ],
    [
      "With",
      "सह"
    ],
    [
      "with",
      "सह"
    ],
    [
      "Will",
      "होईल"
    ],
    [
      "will",
      "होईल"
    ],
    [
      "Upon",
      "त्यानंतर लगेच"
    ],
    [
      "upon",
      "वर"
    ],
    [
      "This",
      "हे"
    ],
    [
      "this",
      "हे"
    ],
    [
      "Just",
      "फक्त आत्ताच"
    ],
    [
      "just",
      "फक्त"
    ],
    [
      "Hold",
      "राखून ठेवा (होल्ड)"
    ],
    [
      "hold",
      "राखून ठेवा"
    ],
    [
      "Wash",
      "धुलाई क्लिनिंग"
    ],
    [
      "wash",
      "धुलाई"
    ],
    [
      "Life",
      "आयुष्यमान"
    ],
    [
      "life",
      "आयुष्य"
    ],
    [
      "Draw",
      "काढून घेणे"
    ],
    [
      "draw",
      "काढणे"
    ],
    [
      "File",
      "फाइल दाखल करा"
    ],
    [
      "file",
      "फाइल"
    ],
    [
      "Govt",
      "शासकीय अधिकृत"
    ],
    [
      "govt",
      "शासकीय"
    ],
    [
      "Apps",
      "ॲप्स"
    ],
    [
      "apps",
      "ॲप्स"
    ],
    [
      "Gold",
      "सुवर्ण दर्जा (गोल्ड)"
    ],
    [
      "gold",
      "गोल्ड"
    ],
    [
      "Font",
      "फॉन्ट"
    ],
    [
      "font",
      "फॉन्ट"
    ],
    [
      "Lots",
      "लॉट्स"
    ],
    [
      "lots",
      "लॉट्स"
    ],
    [
      "Open",
      "उघडा"
    ],
    [
      "open",
      "उघडा"
    ],
    [
      "Sold",
      "विक्री झाले"
    ],
    [
      "sold",
      "विक्री झाले"
    ],
    [
      "MIDC",
      "एमआयडीसी"
    ],
    [
      "BANK",
      "बँक"
    ],
    [
      "bank",
      "बँक"
    ],
    [
      "Back",
      "मागे"
    ],
    [
      "Base",
      "मूळ आधार"
    ],
    [
      "Bulk",
      "मोठ्या प्रमाणातील (बल्क)"
    ],
    [
      "bulk",
      "घाऊक मोठ्या प्रमाणातील"
    ],
    [
      "Case",
      "प्रकरण"
    ],
    [
      "Cash",
      "रोकड रोख"
    ],
    [
      "Cold",
      "शीतगृह कोल्ड"
    ],
    [
      "cold",
      "शीत"
    ],
    [
      "Cred",
      "क्रेड पत"
    ],
    [
      "Dost",
      "दोस्त पिकअप"
    ],
    [
      "Dual",
      "दुहेरी"
    ],
    [
      "dual",
      "दुहेरी"
    ],
    [
      "FPOs",
      "शेतकरी उत्पादक कंपन्या"
    ],
    [
      "Farm",
      "शेत शिवार"
    ],
    [
      "farm",
      "शेत"
    ],
    [
      "Fuel",
      "इंधन डिझेल"
    ],
    [
      "IFSC",
      "आयएफएससी कोड"
    ],
    [
      "IMPS",
      "आयएमपीएस तात्काळ पे"
    ],
    [
      "Lead",
      "प्रमुख अधिकारी"
    ],
    [
      "Lock",
      "सुरक्षित लॉक करा"
    ],
    [
      "lock",
      "लॉक करा"
    ],
    [
      "Mega",
      "मुख्य भव्य"
    ],
    [
      "Mode",
      "पर्याय पद्धत"
    ],
    [
      "mode",
      "पद्धत"
    ],
    [
      "Navi",
      "नवी"
    ],
    [
      "Near",
      "जवळ"
    ],
    [
      "Orig",
      "मूळ उगम"
    ],
    [
      "Park",
      "पार्क आवार"
    ],
    [
      "ROOM",
      "चर्चा कक्ष"
    ],
    [
      "Risk",
      "जोखीम"
    ],
    [
      "Safe",
      "सुरक्षित"
    ],
    [
      "YONO",
      "योनो"
    ],
    [
      "auto",
      "स्वयंचलित"
    ],
    [
      "best",
      "उत्कृष्ट"
    ],
    [
      "code",
      "कोड"
    ],
    [
      "crop",
      "पीक"
    ],
    [
      "data",
      "डेटा माहिती"
    ],
    [
      "dist",
      "जिल्हा"
    ],
    [
      "eNWR",
      "ई-एनडब्ल्यूआर"
    ],
    [
      "held",
      "राखून ठेवलेले"
    ],
    [
      "info",
      "माहिती"
    ],
    [
      "into",
      "मध्ये"
    ],
    [
      "load",
      "वजन भार"
    ],
    [
      "rata",
      "प्रमाणात"
    ],
    [
      "real",
      "वास्तविक"
    ],
    [
      "term",
      "मुदत"
    ],
    [
      "true",
      "खरे"
    ],
    [
      "yard",
      "बाजार प्रांगण"
    ],
    [
      "Kaij",
      "केज"
    ],
    [
      "Wada",
      "वाडा"
    ],
    [
      "name",
      "नाव"
    ],
    [
      "Peak",
      "उच्चांक शिखर"
    ],
    [
      "peak",
      "उच्चांक"
    ],
    [
      "Side",
      "बाजू"
    ],
    [
      "side",
      "बाजू"
    ],
    [
      "cuts",
      "कपात"
    ],
    [
      "than",
      "पेक्षा"
    ],
    [
      "Role",
      "जबाबदारी"
    ],
    [
      "role",
      "जबाबदारी"
    ],
    [
      "navi",
      "नवी"
    ],
    [
      "next",
      "पुढील"
    ],
    [
      "bids",
      "बोली"
    ],
    [
      "call",
      "कॉल करा"
    ],
    [
      "HOLD",
      "थांबवा"
    ],
    [
      "SELL",
      "विक्री करा"
    ],
    [
      "Sell",
      "विक्री करा"
    ],
    [
      "sell",
      "विक्री करा"
    ],
    [
      "pack",
      "पॅक"
    ],
    [
      "list",
      "नोंदवा"
    ],
    [
      "rise",
      "वाढ"
    ],
    [
      "Rise",
      "वाढ"
    ],
    [
      "SOY",
      "सोयाबीन"
    ],
    [
      "ONI",
      "कांदा"
    ],
    [
      "TOM",
      "टोमॅटो"
    ],
    [
      "Raw",
      "कच्चा"
    ],
    [
      "Dry",
      "कोरडे"
    ],
    [
      "Bio",
      "सेंद्रिय बायो"
    ],
    [
      "Hub",
      "केंद्र हब"
    ],
    [
      "Buy",
      "खरेदी करा"
    ],
    [
      "buy",
      "खरेदी करा"
    ],
    [
      "Bid",
      "बोली दर"
    ],
    [
      "bid",
      "बोली दर"
    ],
    [
      "Pay",
      "पेमेंट करा"
    ],
    [
      "pay",
      "पेमेंट करा"
    ],
    [
      "Fee",
      "शुल्क"
    ],
    [
      "fee",
      "शुल्क"
    ],
    [
      "Tax",
      "कर"
    ],
    [
      "tax",
      "कर"
    ],
    [
      "Avg",
      "सरासरी"
    ],
    [
      "Min",
      "किमान"
    ],
    [
      "Max",
      "कमाल"
    ],
    [
      "Cap",
      "मर्यादा कॅप"
    ],
    [
      "Net",
      "निव्वळ शेतीमाल वजन"
    ],
    [
      "Box",
      "खोके"
    ],
    [
      "box",
      "खोके"
    ],
    [
      "Bag",
      "गोणी पोते"
    ],
    [
      "Lab",
      "प्रयोगशाळा लॅब"
    ],
    [
      "lab",
      "प्रयोगशाळा"
    ],
    [
      "Log",
      "नोंदवही"
    ],
    [
      "All",
      "सर्व"
    ],
    [
      "all",
      "सर्व"
    ],
    [
      "New",
      "नवीन"
    ],
    [
      "new",
      "नवीन"
    ],
    [
      "Add",
      "जोडा"
    ],
    [
      "Top",
      "अव्वल प्रमुख"
    ],
    [
      "Day",
      "दिवस"
    ],
    [
      "day",
      "दिवस"
    ],
    [
      "Hrs",
      "तास"
    ],
    [
      "Low",
      "कमी"
    ],
    [
      "You",
      "तुम्ही"
    ],
    [
      "you",
      "तुम्ही"
    ],
    [
      "For",
      "साठी"
    ],
    [
      "for",
      "साठी"
    ],
    [
      "And",
      "आणि"
    ],
    [
      "and",
      "आणि"
    ],
    [
      "Are",
      "आहेत"
    ],
    [
      "are",
      "आहेत"
    ],
    [
      "Now",
      "आत्ताच"
    ],
    [
      "now",
      "आत्ताच"
    ],
    [
      "Per",
      "प्रति"
    ],
    [
      "per",
      "प्रति"
    ],
    [
      "Has",
      "झाले आहे"
    ],
    [
      "has",
      "आहे"
    ],
    [
      "Any",
      "कोणतेही"
    ],
    [
      "any",
      "कोणतेही"
    ],
    [
      "How",
      "कसे"
    ],
    [
      "how",
      "कसे"
    ],
    [
      "See",
      "पहा"
    ],
    [
      "see",
      "पहा"
    ],
    [
      "Ask",
      "विचारा"
    ],
    [
      "ask",
      "विचारा"
    ],
    [
      "Cut",
      "कपात कट"
    ],
    [
      "cut",
      "कपात"
    ],
    [
      "Key",
      "मुख्य महत्त्वाचे"
    ],
    [
      "key",
      "मुख्य"
    ],
    [
      "App",
      "ॲप"
    ],
    [
      "Web",
      "वेब पोर्टल"
    ],
    [
      "Red",
      "लाल"
    ],
    [
      "red",
      "लाल"
    ],
    [
      "Lot",
      "लॉट"
    ],
    [
      "lot",
      "लॉट"
    ],
    [
      "Out",
      "संपले"
    ],
    [
      "out",
      "बाहेर"
    ],
    [
      "BKC",
      "बीकेसी"
    ],
    [
      "Ace",
      "छोटा हत्ती (एस)"
    ],
    [
      "Act",
      "कायदा अधिनियम"
    ],
    [
      "BAN",
      "प्रतिबंध"
    ],
    [
      "BUY",
      "खरेदी करा"
    ],
    [
      "ERP",
      "ईआरपी प्रणाली"
    ],
    [
      "FPO",
      "शेतकरी कंपनी"
    ],
    [
      "Fix",
      "निश्चित करा"
    ],
    [
      "IoT",
      "आयओटी सेन्सर"
    ],
    [
      "Lic",
      "परवाना लायसन्स"
    ],
    [
      "Ltd",
      "लिमिटेड"
    ],
    [
      "Nex",
      "नेक्स"
    ],
    [
      "POs",
      "खरेदी आदेश"
    ],
    [
      "Pro",
      "प्रो व्यवसायिक"
    ],
    [
      "pro",
      "प्रो"
    ],
    [
      "Pvt",
      "प्रायव्हेट"
    ],
    [
      "Sep",
      "सप्टेंबर"
    ],
    [
      "Tri",
      "त्रिपक्षीय"
    ],
    [
      "Use",
      "वापर उद्देश"
    ],
    [
      "use",
      "वापर"
    ],
    [
      "dry",
      "कोरडे"
    ],
    [
      "hub",
      "केंद्र"
    ],
    [
      "low",
      "कमी"
    ],
    [
      "max",
      "कमाल"
    ],
    [
      "via",
      "द्वारे"
    ],
    [
      "bag",
      "गोणी"
    ],
    [
      "REF",
      "संदर्भ"
    ],
    [
      "due",
      "मुळे"
    ],
    [
      "Due",
      "मुळे"
    ],
    [
      "RH",
      "सापेक्ष आर्द्रता"
    ],
    [
      "JS",
      "जेएस"
    ],
    [
      "No",
      "क्र."
    ],
    [
      "Qt",
      "क्विंटल"
    ],
    [
      "Kg",
      "कि.ग्रॅ."
    ],
    [
      "kg",
      "कि.ग्रॅ."
    ],
    [
      "To",
      "पर्यंत / कडे"
    ],
    [
      "to",
      "पर्यंत"
    ],
    [
      "In",
      "मध्ये"
    ],
    [
      "in",
      "मध्ये"
    ],
    [
      "On",
      "वर"
    ],
    [
      "on",
      "वर"
    ],
    [
      "At",
      "येथे"
    ],
    [
      "at",
      "येथे"
    ],
    [
      "Of",
      "चे / चा / ची"
    ],
    [
      "of",
      "चे"
    ],
    [
      "Or",
      "किंवा"
    ],
    [
      "or",
      "किंवा"
    ],
    [
      "By",
      "द्वारे"
    ],
    [
      "by",
      "द्वारे"
    ],
    [
      "Is",
      "आहे"
    ],
    [
      "is",
      "आहे"
    ],
    [
      "Vs",
      "विरुद्ध तुलनेत"
    ],
    [
      "vs",
      "विरुद्ध"
    ],
    [
      "An",
      "एक"
    ],
    [
      "an",
      "एक"
    ],
    [
      "As",
      "प्रमाणे"
    ],
    [
      "as",
      "प्रमाणे"
    ],
    [
      "If",
      "जर"
    ],
    [
      "if",
      "जर"
    ],
    [
      "AI",
      "कृत्रिम बुद्धिमत्ता"
    ],
    [
      "BB",
      "बीबी"
    ],
    [
      "BY",
      "द्वारे"
    ],
    [
      "EV",
      "इलेक्ट्रिक वाहन"
    ],
    [
      "PM",
      "दुपारी/रात्री"
    ],
    [
      "AM",
      "सकाळी"
    ],
    [
      "PO",
      "खरेदी आदेश"
    ],
    [
      "QA",
      "गुणवत्ता तपासणी"
    ],
    [
      "QC",
      "गुणवत्ता नियंत्रण"
    ],
    [
      "QR",
      "क्युआर कोड"
    ],
    [
      "Re",
      "पुन्हा"
    ],
    [
      "Up",
      "वाढ वर"
    ],
    [
      "up",
      "वर"
    ],
    [
      "be",
      "असेल"
    ],
    [
      "ph",
      "पीएच / शोधा"
    ],
    [
      "am",
      "आहे"
    ],
    [
      "I",
      "मी"
    ],
    [
      "i",
      "मी"
    ],
    [
      "a",
      "एक"
    ],
    [
      "A",
      "अ"
    ]
  ],
  "hi": [
    [
      "insights_search_mandi_ph",
      "मंडी, फसल या जिला खोजें..."
    ],
    [
      "ph_search_dist_mandi",
      "जिला या मंडी यार्ड खोजें..."
    ],
    [
      "Quotas Displayed",
      "कोटा प्रदर्शित"
    ],
    [
      "Recommendation",
      "सिफारिश"
    ],
    [
      "recommendation",
      "सिफारिश"
    ],
    [
      "Specifications",
      "विनिर्देश"
    ],
    [
      "specifications",
      "विनिर्देश"
    ],
    [
      "Intermediaries",
      "मध्यस्थ"
    ],
    [
      "Institutional",
      "संस्थागत"
    ],
    [
      "Manufacturers",
      "निर्माता"
    ],
    [
      "Authorization",
      "प्राधिकरण"
    ],
    [
      "authorization",
      "प्राधिकरण"
    ],
    [
      "Notifications",
      "अधिसूचनाएं"
    ],
    [
      "Cryptographic",
      "क्रिप्टोग्राफिक"
    ],
    [
      "institutional",
      "संस्थागत"
    ],
    [
      "Certification",
      "प्रमाणन"
    ],
    [
      "certification",
      "प्रमाणन"
    ],
    [
      "Active Quotas",
      "सक्रिय कोटा"
    ],
    [
      "Contributions",
      "योगदान"
    ],
    [
      "contributions",
      "योगदान"
    ],
    [
      "Agricultural",
      "कृषि"
    ],
    [
      "agricultural",
      "कृषि"
    ],
    [
      "Consignments",
      "कंसाइनमेंट्स"
    ],
    [
      "Verification",
      "सत्यापन"
    ],
    [
      "Certificates",
      "प्रमाणपत्र"
    ],
    [
      "certificates",
      "प्रमाणपत्र"
    ],
    [
      "Broadcasting",
      "प्रसारण"
    ],
    [
      "Intermediary",
      "मध्यस्थ"
    ],
    [
      "Contribution",
      "योगदान"
    ],
    [
      "Multilingual",
      "बहुभाषी"
    ],
    [
      "multilingual",
      "बहुभाषी"
    ],
    [
      "Successfully",
      "सफलतापूर्वक"
    ],
    [
      "successfully",
      "सफलतापूर्वक"
    ],
    [
      "Commodities",
      "कृषि जिंसें"
    ],
    [
      "Pomegranate",
      "अनार"
    ],
    [
      "Supermarket",
      "सुपरमार्केट"
    ],
    [
      "Marketplace",
      "मंडी बाजार"
    ],
    [
      "Procurement",
      "खरीद"
    ],
    [
      "procurement",
      "खरीद"
    ],
    [
      "Negotiation",
      "मूलभाव बातचीत"
    ],
    [
      "NEGOTIATION",
      "बातचीत"
    ],
    [
      "negotiation",
      "बातचीत"
    ],
    [
      "Arbitration",
      "मध्यस्थता"
    ],
    [
      "Settlements",
      "निपटान"
    ],
    [
      "settlements",
      "निपटान"
    ],
    [
      "Consignment",
      "कंसाइनमेंट (माल खेप)"
    ],
    [
      "Weighbridge",
      "धर्मकांटा"
    ],
    [
      "weighbridge",
      "धर्मकांटा"
    ],
    [
      "Temperature",
      "तापमान"
    ],
    [
      "Forecasting",
      "पूर्वानुमान"
    ],
    [
      "forecasting",
      "पूर्वानुमान"
    ],
    [
      "Recommended",
      "अनुशंसित"
    ],
    [
      "Description",
      "विवरण"
    ],
    [
      "description",
      "विवरण"
    ],
    [
      "Perspective",
      "दृष्टिकोण"
    ],
    [
      "Information",
      "जानकारी"
    ],
    [
      "Destination",
      "गंतव्य"
    ],
    [
      "destination",
      "गंतव्य"
    ],
    [
      "Unallocated",
      "अनावंटित"
    ],
    [
      "Unmonitored",
      "गैर-निगरानी"
    ],
    [
      "Checkpoints",
      "चेकपॉइंट्स"
    ],
    [
      "Interactive",
      "संवादात्मक"
    ],
    [
      "interactive",
      "संवादात्मक"
    ],
    [
      "Traditional",
      "पारंपरिक"
    ],
    [
      "traditional",
      "पारंपरिक"
    ],
    [
      "Maharashtra",
      "महाराष्ट्र"
    ],
    [
      "BENEFICIARY",
      "लाभार्थी"
    ],
    [
      "Composition",
      "संरचना"
    ],
    [
      "immediately",
      "तुरंत"
    ],
    [
      "perspective",
      "दृष्टिकोण"
    ],
    [
      "transaction",
      "लेनदेन"
    ],
    [
      "Narayangaon",
      "नारायणगांव"
    ],
    [
      "Chikalthana",
      "चिकलठाणा"
    ],
    [
      "marketplace",
      "मंडी बाजार"
    ],
    [
      "supermarket",
      "सुपरमार्केट"
    ],
    [
      "Comparative",
      "तुलनात्मक"
    ],
    [
      "comparative",
      "तुलनात्मक"
    ],
    [
      "Navi Mumbai",
      "नवी मुंबई"
    ],
    [
      "navi mumbai",
      "नवी मुंबई"
    ],
    [
      "Immediately",
      "तुरंत"
    ],
    [
      "transferred",
      "स्थानांतरित"
    ],
    [
      "Transferred",
      "स्थानांतरित"
    ],
    [
      "Progressive",
      "प्रगतिशील"
    ],
    [
      "progressive",
      "प्रगतिशील"
    ],
    [
      "Perishables",
      "नाशवान वस्तुएं"
    ],
    [
      "perishables",
      "नाशवान वस्तुएं"
    ],
    [
      "Temporarily",
      "अस्थायी रूप से"
    ],
    [
      "temporarily",
      "अस्थायी रूप से"
    ],
    [
      "Vegetables",
      "सब्जियां"
    ],
    [
      "Enterprise",
      "संस्थागत"
    ],
    [
      "ENTERPRISE",
      "संस्थागत"
    ],
    [
      "Commercial",
      "व्यावसायिक"
    ],
    [
      "Processors",
      "प्रसंस्करणकर्ता"
    ],
    [
      "Processing",
      "प्रसंस्करण"
    ],
    [
      "purchasing",
      "खरीद"
    ],
    [
      "Purchasing",
      "खरीद"
    ],
    [
      "Arbitrator",
      "मध्यस्थ"
    ],
    [
      "Authorized",
      "अधिकृत"
    ],
    [
      "Settlement",
      "निपटान"
    ],
    [
      "settlement",
      "निपटान"
    ],
    [
      "Collateral",
      "संपार्श्विक"
    ],
    [
      "Commission",
      "कमीशन"
    ],
    [
      "calculated",
      "गणना की गई"
    ],
    [
      "Calculator",
      "कैलकुलेटर"
    ],
    [
      "Dispatched",
      "रवाना किया गया"
    ],
    [
      "Atmosphere",
      "वातावरण"
    ],
    [
      "Controlled",
      "नियंत्रित"
    ],
    [
      "CONTROLLED",
      "नियंत्रित"
    ],
    [
      "controlled",
      "नियंत्रित"
    ],
    [
      "Corrugated",
      "नालीदार बॉक्स"
    ],
    [
      "Inspection",
      "निरीक्षण"
    ],
    [
      "Accredited",
      "मान्यता प्राप्त"
    ],
    [
      "Mismatches",
      "विसंगति"
    ],
    [
      "mismatches",
      "विसंगति"
    ],
    [
      "Grievances",
      "शिकायतें"
    ],
    [
      "Resolution",
      "समाधान"
    ],
    [
      "Visualizer",
      "विजुअलाइजर"
    ],
    [
      "Projection",
      "प्रोजेक्शन"
    ],
    [
      "projection",
      "प्रोजेक्शन"
    ],
    [
      "Divergence",
      "अंतर विचलन"
    ],
    [
      "divergence",
      "विचलन"
    ],
    [
      "Advisories",
      "सलाह"
    ],
    [
      "Successful",
      "सफल"
    ],
    [
      "Protection",
      "सुरक्षा"
    ],
    [
      "Guaranteed",
      "गारंटीकृत"
    ],
    [
      "Electronic",
      "इलेक्ट्रॉनिक"
    ],
    [
      "Percentage",
      "प्रतिशत"
    ],
    [
      "Undertakes",
      "वचनबद्ध है"
    ],
    [
      "undertakes",
      "वचनबद्ध"
    ],
    [
      "Conforming",
      "के अनुसार"
    ],
    [
      "conforming",
      "अनुरूप"
    ],
    [
      "Mechanisms",
      "तंत्र"
    ],
    [
      "Monitoring",
      "निगरानी"
    ],
    [
      "monitoring",
      "निगरानी"
    ],
    [
      "Turnaround",
      "टर्नअराउंड समय"
    ],
    [
      "turnaround",
      "समय"
    ],
    [
      "Historical",
      "ऐतिहासिक"
    ],
    [
      "historical",
      "ऐतिहासिक"
    ],
    [
      "Facilities",
      "सुविधाएं"
    ],
    [
      "facilities",
      "सुविधाएं"
    ],
    [
      "Innovative",
      "नवोन्मेषी"
    ],
    [
      "innovative",
      "नवाचारी"
    ],
    [
      "Supporting",
      "सहायक"
    ],
    [
      "supporting",
      "सहायक"
    ],
    [
      "Calibrated",
      "कैलिब्रेटेड"
    ],
    [
      "calibrated",
      "कैलिब्रेटेड"
    ],
    [
      "Variations",
      "भिन्नताएं"
    ],
    [
      "variations",
      "विविधता"
    ],
    [
      "Minimizing",
      "न्यूनतम करना"
    ],
    [
      "minimizing",
      "कम करना"
    ],
    [
      "Background",
      "पृष्ठभूमि"
    ],
    [
      "background",
      "पृष्ठभूमि"
    ],
    [
      "Simulating",
      "सिम्युलेटिंग"
    ],
    [
      "simulating",
      "सिम्युलेटिंग"
    ],
    [
      "acceptance",
      "स्वीकृति"
    ],
    [
      "Industrial",
      "औद्योगिक"
    ],
    [
      "Negotiable",
      "परक्राम्य"
    ],
    [
      "NetBanking",
      "नेटबैंकिंग"
    ],
    [
      "Perishable",
      "जल्दी खराब होने वाला"
    ],
    [
      "Returnable",
      "वापसी योग्य"
    ],
    [
      "Technology",
      "तकनीक"
    ],
    [
      "designated",
      "नामित"
    ],
    [
      "electronic",
      "इलेक्ट्रॉनिक"
    ],
    [
      "individual",
      "व्यक्तिगत"
    ],
    [
      "resolution",
      "समाधान"
    ],
    [
      "Pimpalgaon",
      "पिंपलगांव"
    ],
    [
      "Pandharpur",
      "पंढरपुर"
    ],
    [
      "Dhamangaon",
      "धामणगांव"
    ],
    [
      "Hinganghat",
      "हिंगणघाट"
    ],
    [
      "Marathwada",
      "मराठवाड़ा"
    ],
    [
      "marathwada",
      "मराठवाड़ा"
    ],
    [
      "Ventilated",
      "हवादार"
    ],
    [
      "ventilated",
      "हवादार"
    ],
    [
      "Compliance",
      "अनुपालन"
    ],
    [
      "compliance",
      "अनुपालन"
    ],
    [
      "Collection",
      "संग्रह"
    ],
    [
      "guaranteed",
      "गारंटीकृत"
    ],
    [
      "Fulfilment",
      "आपूर्ति"
    ],
    [
      "fulfilment",
      "आपूर्ति"
    ],
    [
      "Attachment",
      "संलग्नक"
    ],
    [
      "attachment",
      "संलग्नक"
    ],
    [
      "enterprise",
      "उद्यम"
    ],
    [
      "dispatched",
      "प्रेषित"
    ],
    [
      "Dispatches",
      "प्रेषण"
    ],
    [
      "dispatches",
      "प्रेषण"
    ],
    [
      "processing",
      "प्रसंस्करण"
    ],
    [
      "commercial",
      "व्यावसायिक"
    ],
    [
      "perishable",
      "नाशवान"
    ],
    [
      "Quarantine",
      "संगरोध रोक"
    ],
    [
      "quarantine",
      "संगरोध"
    ],
    [
      "inspection",
      "निरीक्षण"
    ],
    [
      "Reactivate",
      "पुनः सक्रिय करें"
    ],
    [
      "reactivate",
      "पुनः सक्रिय करें"
    ],
    [
      "Commodity",
      "कृषि जिंस"
    ],
    [
      "Mandarins",
      "संतरे"
    ],
    [
      "harvested",
      "कटाई की गई"
    ],
    [
      "Wholesale",
      "थोक"
    ],
    [
      "WHOLESALE",
      "थोक"
    ],
    [
      "Corporate",
      "कॉर्पोरेट"
    ],
    [
      "Negotiate",
      "बातचीत करें"
    ],
    [
      "Agreement",
      "समझौता"
    ],
    [
      "Contracts",
      "अनुबंध"
    ],
    [
      "Statutory",
      "सांविधिक"
    ],
    [
      "Signatory",
      "हस्ताक्षरकर्ता"
    ],
    [
      "Signature",
      "हस्ताक्षर"
    ],
    [
      "signature",
      "हस्ताक्षर"
    ],
    [
      "Authorize",
      "अधिकृत करें"
    ],
    [
      "Compliant",
      "अनुरूप"
    ],
    [
      "Deposited",
      "जमा किया"
    ],
    [
      "deposited",
      "जमा किया"
    ],
    [
      "Disbursal",
      "वितरण"
    ],
    [
      "DISBURSAL",
      "वितरण"
    ],
    [
      "disbursed",
      "संवितरित"
    ],
    [
      "Financing",
      "वित्तपोषण"
    ],
    [
      "financing",
      "वित्तपोषण"
    ],
    [
      "Repayment",
      "पुनर्भुगतान"
    ],
    [
      "Liquidity",
      "तरलता"
    ],
    [
      "Brokerage",
      "दलाली आढ़त"
    ],
    [
      "brokerage",
      "दलाली"
    ],
    [
      "Shrinkage",
      "वजन कमी नुकसान"
    ],
    [
      "shrinkage",
      "वजन नुकसान"
    ],
    [
      "Valuation",
      "कुल मूल्यांकन"
    ],
    [
      "VALUATION",
      "कुल मूल्यांकन"
    ],
    [
      "valuation",
      "मूल्यांकन"
    ],
    [
      "Benchmark",
      "मंडी बेंचमार्क"
    ],
    [
      "benchmark",
      "बेंचमार्क"
    ],
    [
      "Arbitrage",
      "आर्बिट्राज अंतर"
    ],
    [
      "arbitrage",
      "आर्बिट्राज"
    ],
    [
      "Breakeven",
      "ब्रेक-इवन"
    ],
    [
      "Calculate",
      "गणना करें"
    ],
    [
      "Logistics",
      "लॉजिस्टिक्स व परिवहन"
    ],
    [
      "logistics",
      "परिवहन"
    ],
    [
      "Transport",
      "परिवहन"
    ],
    [
      "transport",
      "परिवहन"
    ],
    [
      "Consignor",
      "प्रेषक"
    ],
    [
      "Consignee",
      "प्राप्तकर्ता"
    ],
    [
      "Shipments",
      "शिपमेंट्स"
    ],
    [
      "Weighment",
      "वजन माप"
    ],
    [
      "Telemetry",
      "टेलीमेट्री"
    ],
    [
      "TELEMETRY",
      "टेलीमेट्री"
    ],
    [
      "telemetry",
      "टेलीमेट्री"
    ],
    [
      "Satellite",
      "उपग्रह ट्रैकिंग"
    ],
    [
      "Warehouse",
      "गोदाम"
    ],
    [
      "warehouse",
      "गोदाम"
    ],
    [
      "Packaging",
      "पैकेजिंग"
    ],
    [
      "Tolerance",
      "सहनशीलता"
    ],
    [
      "tolerance",
      "सहनशीलता"
    ],
    [
      "Inspected",
      "निरीक्षित"
    ],
    [
      "Certified",
      "प्रमाणित"
    ],
    [
      "Defective",
      "दोषयुक्त"
    ],
    [
      "Shortages",
      "कमी"
    ],
    [
      "shortages",
      "कमी"
    ],
    [
      "Deviation",
      "विचलन"
    ],
    [
      "Grievance",
      "शिकायत निवारण"
    ],
    [
      "grievance",
      "शिकायत"
    ],
    [
      "Redressal",
      "निवारण"
    ],
    [
      "Complaint",
      "शिकायत"
    ],
    [
      "complaint",
      "शिकायत"
    ],
    [
      "Releasing",
      "रिलीज"
    ],
    [
      "Analytics",
      "एनालिटिक्स"
    ],
    [
      "Available",
      "उपलब्ध"
    ],
    [
      "available",
      "उपलब्ध"
    ],
    [
      "Statement",
      "स्टेटमेंट"
    ],
    [
      "Dashboard",
      "डैशबोर्ड"
    ],
    [
      "Broadcast",
      "प्रसारित करें"
    ],
    [
      "Emergency",
      "आपातकालीन"
    ],
    [
      "Important",
      "महत्वपूर्ण"
    ],
    [
      "Automated",
      "स्वचालित"
    ],
    [
      "Instantly",
      "तुरंत"
    ],
    [
      "Connected",
      "कनेक्टेड"
    ],
    [
      "Protected",
      "संरक्षित"
    ],
    [
      "PROTECTED",
      "संरक्षित"
    ],
    [
      "Guarantee",
      "गारंटी"
    ],
    [
      "Assurance",
      "आश्वासन"
    ],
    [
      "Digitally",
      "डिजिटल रूप से"
    ],
    [
      "Encrypted",
      "एन्क्रिप्टेड"
    ],
    [
      "Immutable",
      "अपरिवर्तनीय"
    ],
    [
      "Timestamp",
      "टाइमस्टैम्प"
    ],
    [
      "Yesterday",
      "कल"
    ],
    [
      "Quarterly",
      "त्रैमासिक"
    ],
    [
      "Locations",
      "स्थान"
    ],
    [
      "Districts",
      "जिले"
    ],
    [
      "Breakdown",
      "विस्तृत विवरण"
    ],
    [
      "Checklist",
      "चेकलिस्ट"
    ],
    [
      "Readiness",
      "तत्परता"
    ],
    [
      "Milestone",
      "मील का पत्थर"
    ],
    [
      "Receiving",
      "प्राप्त करना"
    ],
    [
      "Requested",
      "अनुरोधित"
    ],
    [
      "Exceeding",
      "से अधिक"
    ],
    [
      "exceeding",
      "से अधिक"
    ],
    [
      "Protocols",
      "प्रोटोकॉल"
    ],
    [
      "Mechanism",
      "प्रणाली"
    ],
    [
      "mechanism",
      "प्रणाली"
    ],
    [
      "Oversight",
      "निगरानी"
    ],
    [
      "oversight",
      "निगरानी"
    ],
    [
      "Supported",
      "समर्थित"
    ],
    [
      "supported",
      "समर्थित"
    ],
    [
      "Remaining",
      "शेष"
    ],
    [
      "remaining",
      "शेष"
    ],
    [
      "Fulfilled",
      "पूर्ण"
    ],
    [
      "fulfilled",
      "पूरा"
    ],
    [
      "Discounts",
      "छूट"
    ],
    [
      "Secondary",
      "द्वितीयक"
    ],
    [
      "secondary",
      "द्वितीयक"
    ],
    [
      "Samruddhi",
      "समृद्धि एक्सप्रेसवे"
    ],
    [
      "BIGBASKET",
      "बिगबास्केट"
    ],
    [
      "BigBasket",
      "बिगबास्केट"
    ],
    [
      "CERTIFIED",
      "प्रमाणित"
    ],
    [
      "certified",
      "प्रमाणित"
    ],
    [
      "Completed",
      "पूर्ण हुआ"
    ],
    [
      "Dedicated",
      "समर्पित"
    ],
    [
      "Estimated",
      "अनुमानित"
    ],
    [
      "Displayed",
      "प्रदर्शित"
    ],
    [
      "displayed",
      "प्रदर्शित"
    ],
    [
      "Immediate",
      "तत्काल"
    ],
    [
      "immediate",
      "तत्काल"
    ],
    [
      "Insurance",
      "बीमा"
    ],
    [
      "Middleman",
      "बिचौलिया"
    ],
    [
      "middleman",
      "बिचौलिया"
    ],
    [
      "REGULATED",
      "विनियमित"
    ],
    [
      "regulated",
      "विनियमित"
    ],
    [
      "Rameshwar",
      "रामेश्वर"
    ],
    [
      "Reference",
      "संदर्भ"
    ],
    [
      "transfers",
      "स्थानांतरण"
    ],
    [
      "automated",
      "स्वचालित"
    ],
    [
      "commodity",
      "जिंस"
    ],
    [
      "corporate",
      "कॉर्पोरेट"
    ],
    [
      "digitally",
      "डिजिटल रूप से"
    ],
    [
      "discovery",
      "खोज"
    ],
    [
      "emergency",
      "आपातकालीन"
    ],
    [
      "instantly",
      "तुरंत"
    ],
    [
      "inventory",
      "इन्वेंट्री"
    ],
    [
      "packaging",
      "पैकेजिंग"
    ],
    [
      "varieties",
      "किस्में"
    ],
    [
      "Lasalgaon",
      "लासलगांव"
    ],
    [
      "Sangamner",
      "संगमनेर"
    ],
    [
      "Majalgaon",
      "माजलगांव"
    ],
    [
      "Regulated",
      "विनियमित"
    ],
    [
      "icicibank",
      "ICICI बैंक"
    ],
    [
      "Purchased",
      "खरीदा गया"
    ],
    [
      "purchased",
      "खरीदा गया"
    ],
    [
      "districts",
      "जिले"
    ],
    [
      "Scheduled",
      "निर्धारित"
    ],
    [
      "scheduled",
      "निर्धारित"
    ],
    [
      "SCHEDULED",
      "निर्धारित"
    ],
    [
      "BENCHMARK",
      "संदर्भ दर"
    ],
    [
      "benchmark",
      "संदर्भ दर"
    ],
    [
      "Confirmed",
      "पुष्ट"
    ],
    [
      "confirmed",
      "पुष्ट"
    ],
    [
      "CONFIRMED",
      "पुष्ट"
    ],
    [
      "reference",
      "संदर्भ"
    ],
    [
      "breakeven",
      "लागत वसूली"
    ],
    [
      "wholesale",
      "थोक"
    ],
    [
      "Delivered",
      "वितरित"
    ],
    [
      "delivered",
      "वितरित"
    ],
    [
      "Committed",
      "प्रतिबद्ध"
    ],
    [
      "committed",
      "प्रतिबद्ध"
    ],
    [
      "estimated",
      "अनुमानित"
    ],
    [
      "shipments",
      "खेप"
    ],
    [
      "Clearance",
      "निकासी"
    ],
    [
      "clearance",
      "निकासी"
    ],
    [
      "statutory",
      "वैधानिक"
    ],
    [
      "Arbitrate",
      "मध्यस्थता करें"
    ],
    [
      "arbitrate",
      "मध्यस्थता करें"
    ],
    [
      "Unsuspend",
      "निलंबन हटाएं"
    ],
    [
      "unsuspend",
      "निलंबन हटाएं"
    ],
    [
      "authorize",
      "अधिकृत करें"
    ],
    [
      "Hydration",
      "डेटा लोड"
    ],
    [
      "hydration",
      "डेटा लोड"
    ],
    [
      "Oilseeds",
      "तिलहन"
    ],
    [
      "tomatoes",
      "टमाटर"
    ],
    [
      "Tomatoes",
      "टमाटर"
    ],
    [
      "Mandarin",
      "संतरा"
    ],
    [
      "Turmeric",
      "हल्दी"
    ],
    [
      "Alphonso",
      "हापुस आम"
    ],
    [
      "Maldandi",
      "मालदांडी"
    ],
    [
      "Thompson",
      "थॉमसन"
    ],
    [
      "Seedless",
      "बीजरहित"
    ],
    [
      "harvests",
      "फसल कटाई"
    ],
    [
      "Caterers",
      "कैटरर्स"
    ],
    [
      "Catering",
      "कैटरिंग"
    ],
    [
      "Exchange",
      "कृषि विनिमय"
    ],
    [
      "Terminal",
      "टर्मिनल"
    ],
    [
      "Corridor",
      "गलियारा"
    ],
    [
      "Procured",
      "खरीदा गया"
    ],
    [
      "PROCURED",
      "खरीदा गया"
    ],
    [
      "procured",
      "खरीदा गया"
    ],
    [
      "Purchase",
      "खरीद"
    ],
    [
      "purchase",
      "खरीद"
    ],
    [
      "Contract",
      "अनुबंध"
    ],
    [
      "contract",
      "अनुबंध"
    ],
    [
      "Tribunal",
      "न्यायाधिकरण"
    ],
    [
      "Ratified",
      "स्वीकृत"
    ],
    [
      "ratified",
      "स्वीकृत"
    ],
    [
      "Deposits",
      "जमा"
    ],
    [
      "deposits",
      "जमा"
    ],
    [
      "Advances",
      "अग्रिम"
    ],
    [
      "Disburse",
      "संवितरित करें"
    ],
    [
      "Payments",
      "भुगतान"
    ],
    [
      "Credited",
      "क्रेडिट हुआ"
    ],
    [
      "credited",
      "क्रेडिट हुआ"
    ],
    [
      "Discount",
      "छूट"
    ],
    [
      "Interest",
      "ब्याज"
    ],
    [
      "Reserves",
      "आरक्षित निधि"
    ],
    [
      "reserves",
      "आरक्षित निधि"
    ],
    [
      "Arhatiya",
      "आढ़तिया"
    ],
    [
      "Dispatch",
      "रवाना करें"
    ],
    [
      "dispatch",
      "रवाना"
    ],
    [
      "Delivery",
      "डिलीवरी पहुंच"
    ],
    [
      "DELIVERY",
      "डिलीवरी"
    ],
    [
      "delivery",
      "डिलीवरी"
    ],
    [
      "Distance",
      "दूरी"
    ],
    [
      "Tracking",
      "लाइव ट्रैकिंग"
    ],
    [
      "tracking",
      "ट्रैकिंग"
    ],
    [
      "Readings",
      "रीडिंग्स"
    ],
    [
      "readings",
      "रीडिंग्स"
    ],
    [
      "Chambers",
      "कक्ष"
    ],
    [
      "chambers",
      "कक्ष"
    ],
    [
      "Humidity",
      "नमी आर्द्रता"
    ],
    [
      "Capacity",
      "क्षमता"
    ],
    [
      "Hermetic",
      "हवाबंद"
    ],
    [
      "Moisture",
      "नमी"
    ],
    [
      "moisture",
      "नमी"
    ],
    [
      "Verified",
      "सत्यापित"
    ],
    [
      "verified",
      "सत्यापित"
    ],
    [
      "Spoilage",
      "खराबी"
    ],
    [
      "Shortage",
      "कमी"
    ],
    [
      "Disputes",
      "विवाद"
    ],
    [
      "Resolved",
      "हल किया गया"
    ],
    [
      "resolved",
      "हल"
    ],
    [
      "Releases",
      "रिलीज"
    ],
    [
      "Evidence",
      "साक्ष्य सबूत"
    ],
    [
      "evidence",
      "साक्ष्य"
    ],
    [
      "Insights",
      "मंडी अंतर्दृष्टि"
    ],
    [
      "insights",
      "अंतर्दृष्टि"
    ],
    [
      "Forecast",
      "पूर्वानुमान"
    ],
    [
      "forecast",
      "पूर्वानुमान"
    ],
    [
      "Arrivals",
      "आवक"
    ],
    [
      "arrivals",
      "आवक"
    ],
    [
      "Advisory",
      "सलाहकार"
    ],
    [
      "advisory",
      "सलाह"
    ],
    [
      "Strategy",
      "रणनीति"
    ],
    [
      "Velocity",
      "गति वेग"
    ],
    [
      "Awaiting",
      "प्रतीक्षारत"
    ],
    [
      "awaiting",
      "प्रतीक्षारत"
    ],
    [
      "Download",
      "डाउनलोड करें"
    ],
    [
      "download",
      "डाउनलोड करें"
    ],
    [
      "Receipts",
      "रसीदें"
    ],
    [
      "receipts",
      "रसीदें"
    ],
    [
      "Settings",
      "सेटिंग्स"
    ],
    [
      "Overview",
      "अवलोकन"
    ],
    [
      "Previous",
      "पिछला"
    ],
    [
      "Messages",
      "संदेश"
    ],
    [
      "Contacts",
      "संपर्क"
    ],
    [
      "Feedback",
      "प्रतिक्रिया"
    ],
    [
      "Language",
      "भाषा"
    ],
    [
      "Distress",
      "संकटग्रस्त माल"
    ],
    [
      "Critical",
      "गंभीर"
    ],
    [
      "Required",
      "अनिवार्य"
    ],
    [
      "Optional",
      "वैकल्पिक"
    ],
    [
      "Standard",
      "मानक"
    ],
    [
      "Realtime",
      "रियल-टाइम"
    ],
    [
      "Security",
      "सुरक्षा"
    ],
    [
      "Tomorrow",
      "कल"
    ],
    [
      "Location",
      "स्थान"
    ],
    [
      "location",
      "स्थान"
    ],
    [
      "District",
      "जिला"
    ],
    [
      "district",
      "जिला"
    ],
    [
      "Regional",
      "क्षेत्रीय"
    ],
    [
      "Cheapest",
      "सबसे सस्ता"
    ],
    [
      "Kilogram",
      "किलोग्राम"
    ],
    [
      "Passbook",
      "पासबुक"
    ],
    [
      "Steppers",
      "कदम"
    ],
    [
      "Whenever",
      "जब भी"
    ],
    [
      "Received",
      "प्राप्त हुआ"
    ],
    [
      "received",
      "प्राप्त"
    ],
    [
      "Response",
      "प्रतिक्रिया"
    ],
    [
      "response",
      "जवाब"
    ],
    [
      "Initiate",
      "शुरू करें"
    ],
    [
      "initiate",
      "प्रारंभ करें"
    ],
    [
      "Assigned",
      "आवंटित"
    ],
    [
      "assigned",
      "आवंटित"
    ],
    [
      "Withheld",
      "रोका गया"
    ],
    [
      "withheld",
      "रोका गया"
    ],
    [
      "Specific",
      "विशिष्ट"
    ],
    [
      "specific",
      "विशिष्ट"
    ],
    [
      "Protocol",
      "प्रोटोकॉल"
    ],
    [
      "protocol",
      "प्रोटोकॉल"
    ],
    [
      "Triggers",
      "ट्रिगर"
    ],
    [
      "triggers",
      "ट्रिगर"
    ],
    [
      "Keywords",
      "कीवर्ड"
    ],
    [
      "keywords",
      "कीवर्ड"
    ],
    [
      "Position",
      "स्थिति"
    ],
    [
      "position",
      "स्थिति"
    ],
    [
      "Seasonal",
      "मौसमी"
    ],
    [
      "seasonal",
      "मौसमी"
    ],
    [
      "corridor",
      "गलियारा"
    ],
    [
      "Facility",
      "सुविधा"
    ],
    [
      "Flexible",
      "लचीला"
    ],
    [
      "flexible",
      "लचीला"
    ],
    [
      "Strictly",
      "सख्ती से"
    ],
    [
      "strictly",
      "कड़ाई से"
    ],
    [
      "Registry",
      "रजिस्ट्री"
    ],
    [
      "registry",
      "पंजी"
    ],
    [
      "Internet",
      "इंटरनेट"
    ],
    [
      "Executed",
      "निष्पादित"
    ],
    [
      "executed",
      "निष्पादित"
    ],
    [
      "Realized",
      "प्राप्त"
    ],
    [
      "realized",
      "प्राप्त"
    ],
    [
      "Maximize",
      "अधिकतम करें"
    ],
    [
      "maximize",
      "अधिकतम"
    ],
    [
      "Directly",
      "सीधे"
    ],
    [
      "directly",
      "सीधे"
    ],
    [
      "Pressure",
      "दबाव"
    ],
    [
      "pressure",
      "दबाव"
    ],
    [
      "Matching",
      "अनुकूल मिलान"
    ],
    [
      "matching",
      "मिलान"
    ],
    [
      "Vidarbha",
      "विदर्भ"
    ],
    [
      "Khandesh",
      "खानदेश"
    ],
    [
      "Sahyadri",
      "सह्याद्री"
    ],
    [
      "Shivneri",
      "शिवनेरी"
    ],
    [
      "Business",
      "व्यवसाय"
    ],
    [
      "CONTRACT",
      "अनुबंध"
    ],
    [
      "Concepts",
      "संकल्पनाएं"
    ],
    [
      "Deshmukh",
      "देशमुख"
    ],
    [
      "Division",
      "प्रभाग"
    ],
    [
      "External",
      "बाहरी"
    ],
    [
      "Holdings",
      "होल्डिंग्स"
    ],
    [
      "Physical",
      "भौतिक"
    ],
    [
      "physical",
      "भौतिक"
    ],
    [
      "Quantity",
      "मात्रा"
    ],
    [
      "quantity",
      "मात्रा"
    ],
    [
      "Reliance",
      "रिलायंस"
    ],
    [
      "Schedule",
      "समय सारणी"
    ],
    [
      "schedule",
      "समय सारणी"
    ],
    [
      "SCHEDULE",
      "समय सारणी"
    ],
    [
      "Polished",
      "पॉलिश"
    ],
    [
      "polished",
      "पॉलिश"
    ],
    [
      "Curcumin",
      "करक्यूमिन"
    ],
    [
      "curcumin",
      "करक्यूमिन"
    ],
    [
      "Services",
      "सेवाएं"
    ],
    [
      "Simulate",
      "सिम्युलेट करें"
    ],
    [
      "Sourcing",
      "सोर्सिंग खरीद"
    ],
    [
      "sourcing",
      "सोर्सिंग"
    ],
    [
      "Transfer",
      "स्थानांतरण"
    ],
    [
      "capacity",
      "क्षमता"
    ],
    [
      "disabled",
      "अक्षम"
    ],
    [
      "hermetic",
      "हवाबंद"
    ],
    [
      "tribunal",
      "न्यायाधिकरण"
    ],
    [
      "Malegaon",
      "मालेगांव"
    ],
    [
      "Bhiwapur",
      "भिवापुर"
    ],
    [
      "Gultekdi",
      "गुलटेकड़ी"
    ],
    [
      "Hadapsar",
      "हड़पसर"
    ],
    [
      "Ardhapur",
      "अर्धापुर"
    ],
    [
      "Sambhaji",
      "संभाजीनगर"
    ],
    [
      "Anandrao",
      "आनंदराव"
    ],
    [
      "releases",
      "रिलीज"
    ],
    [
      "Rajapuri",
      "राजापुरी"
    ],
    [
      "Disputed",
      "विवादित"
    ],
    [
      "disputed",
      "विवादित"
    ],
    [
      "Farmgate",
      "फार्मगेट"
    ],
    [
      "farmgate",
      "फार्मगेट"
    ],
    [
      "Describe",
      "वर्णन करें"
    ],
    [
      "describe",
      "वर्णन करें"
    ],
    [
      "happened",
      "हुआ"
    ],
    [
      "overview",
      "अवलोकन"
    ],
    [
      "terminal",
      "टर्मिनल"
    ],
    [
      "Released",
      "जारी किया गया"
    ],
    [
      "released",
      "जारी किया गया"
    ],
    [
      "Mismatch",
      "बेमेल"
    ],
    [
      "mismatch",
      "बेमेल"
    ],
    [
      "language",
      "भाषा"
    ],
    [
      "clearing",
      "निकासी"
    ],
    [
      "Clearing",
      "निकासी"
    ],
    [
      "seedless",
      "बीजहीन"
    ],
    [
      "Screened",
      "छांटा गया"
    ],
    [
      "screened",
      "छांटा गया"
    ],
    [
      "standard",
      "मानक"
    ],
    [
      "Commerce",
      "व्यापार"
    ],
    [
      "commerce",
      "व्यापार"
    ],
    [
      "EXPECTED",
      "अपेक्षित"
    ],
    [
      "Expected",
      "अपेक्षित"
    ],
    [
      "expected",
      "अपेक्षित"
    ],
    [
      "Incoming",
      "आने वाले"
    ],
    [
      "incoming",
      "आने वाले"
    ],
    [
      "Shipment",
      "खेप"
    ],
    [
      "shipment",
      "खेप"
    ],
    [
      "Director",
      "निदेशक"
    ],
    [
      "director",
      "निदेशक"
    ],
    [
      "positive",
      "सकारात्मक"
    ],
    [
      "Positive",
      "सकारात्मक"
    ],
    [
      "caterers",
      "कैटरर्स"
    ],
    [
      "Fallback",
      "बैकअप"
    ],
    [
      "fallback",
      "बैकअप"
    ],
    [
      "Packing",
      "पैकिंग"
    ],
    [
      "packing",
      "पैकिंग"
    ],
    [
      "Chilled",
      "चिल्ड"
    ],
    [
      "chilled",
      "चिल्ड"
    ],
    [
      "Cleaned",
      "साफ किया गया"
    ],
    [
      "cleaned",
      "साफ किया गया"
    ],
    [
      "Sourced",
      "प्राप्त"
    ],
    [
      "sourced",
      "प्राप्त"
    ],
    [
      "CEILING",
      "अधिकतम सीमा"
    ],
    [
      "ceiling",
      "अधिकतम सीमा"
    ],
    [
      "Produce",
      "कृषि उपज"
    ],
    [
      "PRODUCE",
      "कृषि उपज"
    ],
    [
      "produce",
      "कृषि उपज"
    ],
    [
      "Millets",
      "मोटे अनाज (मिलेट्स)"
    ],
    [
      "Cereals",
      "अनाज"
    ],
    [
      "Legumes",
      "फलियां"
    ],
    [
      "Soybean",
      "सोयाबीन"
    ],
    [
      "soybean",
      "सोयाबीन"
    ],
    [
      "Compost",
      "खाद कंपोस्ट"
    ],
    [
      "Harvest",
      "कटाई"
    ],
    [
      "harvest",
      "कटाई"
    ],
    [
      "Sellers",
      "विक्रेता"
    ],
    [
      "Farmers",
      "किसान"
    ],
    [
      "farmers",
      "किसान"
    ],
    [
      "Kitchen",
      "किचन"
    ],
    [
      "Network",
      "नेटवर्क"
    ],
    [
      "Demands",
      "मांगें"
    ],
    [
      "Procure",
      "खरीदें"
    ],
    [
      "Counter",
      "काउंटर ऑफर"
    ],
    [
      "counter",
      "काउंटर ऑफर"
    ],
    [
      "Binding",
      "बाध्यकारी"
    ],
    [
      "Trustee",
      "ट्रस्टी"
    ],
    [
      "TRUSTEE",
      "ट्रस्टी"
    ],
    [
      "Signoff",
      "साइनऑफ"
    ],
    [
      "signoff",
      "साइनऑफ"
    ],
    [
      "Deposit",
      "जमा राशि"
    ],
    [
      "deposit",
      "जमा"
    ],
    [
      "Advance",
      "अग्रिम राशि"
    ],
    [
      "advance",
      "अग्रिम"
    ],
    [
      "Tranche",
      "किस्त चरण"
    ],
    [
      "TRANCHE",
      "किस्त"
    ],
    [
      "tranche",
      "किस्त"
    ],
    [
      "Balance",
      "शेष राशि"
    ],
    [
      "balance",
      "शेष"
    ],
    [
      "Settled",
      "निपटान पूर्ण"
    ],
    [
      "Payment",
      "भुगतान"
    ],
    [
      "payment",
      "भुगतान"
    ],
    [
      "Payable",
      "देय"
    ],
    [
      "Pledges",
      "गिरवी"
    ],
    [
      "Lending",
      "उधार"
    ],
    [
      "lending",
      "उधार"
    ],
    [
      "Capital",
      "पूंजी"
    ],
    [
      "capital",
      "पूंजी"
    ],
    [
      "Hedging",
      "हेजिंग"
    ],
    [
      "spreads",
      "अंतर"
    ],
    [
      "Savings",
      "बचत"
    ],
    [
      "SAVINGS",
      "बचत"
    ],
    [
      "savings",
      "बचत"
    ],
    [
      "Average",
      "औसत"
    ],
    [
      "Minimum",
      "न्यूनतम"
    ],
    [
      "minimum",
      "न्यूनतम"
    ],
    [
      "Maximum",
      "अधिकतम"
    ],
    [
      "maximum",
      "अधिकतम"
    ],
    [
      "Ceiling",
      "अधिकतम सीमा"
    ],
    [
      "Freight",
      "भाड़ा"
    ],
    [
      "freight",
      "भाड़ा"
    ],
    [
      "Haulage",
      "ढुलाई"
    ],
    [
      "Transit",
      "मार्ग में (ट्रांजिट)"
    ],
    [
      "TRANSIT",
      "मार्ग में"
    ],
    [
      "transit",
      "ट्रांजिट"
    ],
    [
      "Vehicle",
      "वाहन"
    ],
    [
      "Payload",
      "पेलोड क्षमता"
    ],
    [
      "Highway",
      "राजमार्ग"
    ],
    [
      "Storage",
      "भंडारण"
    ],
    [
      "storage",
      "भंडारण"
    ],
    [
      "Chamber",
      "शीत कक्ष"
    ],
    [
      "chamber",
      "कक्ष"
    ],
    [
      "Climate",
      "जलवायु"
    ],
    [
      "CLIMATE",
      "जलवायु"
    ],
    [
      "Cooling",
      "शीतलन"
    ],
    [
      "Plastic",
      "प्लास्टिक"
    ],
    [
      "Loading",
      "लोडिंग"
    ],
    [
      "Quality",
      "गुणवत्ता"
    ],
    [
      "Assayed",
      "परखा गया"
    ],
    [
      "inspect",
      "निरीक्षण करें"
    ],
    [
      "Spoiled",
      "खराब"
    ],
    [
      "Damaged",
      "क्षतिग्रस्त"
    ],
    [
      "Missing",
      "लापता/कम"
    ],
    [
      "missing",
      "कम"
    ],
    [
      "Dispute",
      "विवाद"
    ],
    [
      "Release",
      "रिलीज करें"
    ],
    [
      "Dossier",
      "दस्तावेज फाइल"
    ],
    [
      "Insight",
      "विश्लेषण"
    ],
    [
      "Bullish",
      "तेजी (बुलिश)"
    ],
    [
      "Bearish",
      "मंदी (बेयरिश)"
    ],
    [
      "Neutral",
      "स्थिर (न्यूट्रल)"
    ],
    [
      "Arrival",
      "आवक"
    ],
    [
      "arrival",
      "आवक"
    ],
    [
      "Volumes",
      "मात्राएं"
    ],
    [
      "volumes",
      "मात्राएं"
    ],
    [
      "Tonnage",
      "टन भार"
    ],
    [
      "tonnage",
      "टन भार"
    ],
    [
      "Heatmap",
      "हीटमैप"
    ],
    [
      "Indices",
      "सूचकांक"
    ],
    [
      "indices",
      "सूचकांक"
    ],
    [
      "Copilot",
      "एआई कोपायलट"
    ],
    [
      "copilot",
      "कोपायलट"
    ],
    [
      "Filters",
      "फ़िल्टर्स"
    ],
    [
      "Actions",
      "कार्रवाई"
    ],
    [
      "Pending",
      "लंबित"
    ],
    [
      "pending",
      "लंबित"
    ],
    [
      "Booking",
      "बुकिंग"
    ],
    [
      "Confirm",
      "पुष्टि करें"
    ],
    [
      "confirm",
      "पुष्टि करें"
    ],
    [
      "Details",
      "विवरण"
    ],
    [
      "details",
      "विवरण"
    ],
    [
      "Receipt",
      "रसीद"
    ],
    [
      "receipt",
      "रसीद"
    ],
    [
      "Invoice",
      "चालान बिल"
    ],
    [
      "Voucher",
      "वाउचर"
    ],
    [
      "Summary",
      "सारांश"
    ],
    [
      "summary",
      "सारांश"
    ],
    [
      "Reports",
      "रिपोर्ट्स"
    ],
    [
      "reports",
      "रिपोर्ट्स"
    ],
    [
      "History",
      "इतिहास"
    ],
    [
      "Profile",
      "प्रोफ़ाइल"
    ],
    [
      "profile",
      "प्रोफ़ाइल"
    ],
    [
      "Showing",
      "दिखा रहा है"
    ],
    [
      "Message",
      "संदेश"
    ],
    [
      "message",
      "संदेश"
    ],
    [
      "Contact",
      "संपर्क"
    ],
    [
      "Explain",
      "समझाएं"
    ],
    [
      "Morning",
      "प्रभात"
    ],
    [
      "Evening",
      "संध्या"
    ],
    [
      "Salvage",
      "साल्वैज"
    ],
    [
      "Urgency",
      "तात्कालिकता"
    ],
    [
      "Warning",
      "चेतावनी"
    ],
    [
      "Success",
      "सफल"
    ],
    [
      "Instant",
      "तत्काल"
    ],
    [
      "Refresh",
      "रिफ्रेश करें"
    ],
    [
      "Offline",
      "ऑफलाइन"
    ],
    [
      "Digital",
      "डिजिटल"
    ],
    [
      "Minutes",
      "मिनट"
    ],
    [
      "minutes",
      "मिनट"
    ],
    [
      "Seconds",
      "सेकंड"
    ],
    [
      "seconds",
      "सेकंड"
    ],
    [
      "Central",
      "केंद्रीय"
    ],
    [
      "Highest",
      "उच्चतम"
    ],
    [
      "Nearest",
      "निकटतम"
    ],
    [
      "Optimal",
      "अनुकूल"
    ],
    [
      "Quintal",
      "क्विंटल"
    ],
    [
      "quintal",
      "क्विंटल"
    ],
    [
      "Partial",
      "आंशिक"
    ],
    [
      "Checker",
      "जांचकर्ता"
    ],
    [
      "Channel",
      "चैनल"
    ],
    [
      "Banking",
      "बैंकिंग"
    ],
    [
      "Account",
      "खाता"
    ],
    [
      "Privacy",
      "गोपनीयता"
    ],
    [
      "Without",
      "के बिना"
    ],
    [
      "without",
      "के बिना"
    ],
    [
      "Against",
      "के विरुद्ध"
    ],
    [
      "against",
      "के खिलाफ"
    ],
    [
      "Another",
      "अन्य"
    ],
    [
      "another",
      "दूसरा"
    ],
    [
      "Explore",
      "अन्वेषण करें"
    ],
    [
      "explore",
      "देखें"
    ],
    [
      "Receive",
      "प्राप्त करें"
    ],
    [
      "receive",
      "प्राप्त करें"
    ],
    [
      "replies",
      "उत्तर"
    ],
    [
      "Replies",
      "जवाब"
    ],
    [
      "Request",
      "अनुरोध"
    ],
    [
      "request",
      "अनुरोध"
    ],
    [
      "Holding",
      "होल्डिंग"
    ],
    [
      "Jointly",
      "संयुक्त रूप से"
    ],
    [
      "jointly",
      "संयुक्त रूप से"
    ],
    [
      "Partner",
      "साझेदार"
    ],
    [
      "partner",
      "साझेदार"
    ],
    [
      "Weather",
      "मौसम"
    ],
    [
      "weather",
      "मौसम"
    ],
    [
      "Complex",
      "परिसर"
    ],
    [
      "complex",
      "परिसर"
    ],
    [
      "Cluster",
      "क्लस्टर समूह"
    ],
    [
      "cluster",
      "क्लस्टर"
    ],
    [
      "Marking",
      "चिह्नित करना"
    ],
    [
      "marking",
      "अंकन"
    ],
    [
      "Reflect",
      "दर्शाता है"
    ],
    [
      "reflect",
      "दर्शाता है"
    ],
    [
      "Records",
      "अभिलेख"
    ],
    [
      "records",
      "रिकॉर्ड"
    ],
    [
      "Remains",
      "रहता है"
    ],
    [
      "remains",
      "बचता है"
    ],
    [
      "Willing",
      "इच्छुक"
    ],
    [
      "willing",
      "सहमत"
    ],
    [
      "Premium",
      "प्रीमियम"
    ],
    [
      "premium",
      "प्रीमियम"
    ],
    [
      "Primary",
      "प्राथमिक"
    ],
    [
      "primary",
      "प्राथमिक"
    ],
    [
      "Padding",
      "पैडिंग"
    ],
    [
      "padding",
      "पैडिंग"
    ],
    [
      "Trained",
      "प्रशिक्षित"
    ],
    [
      "trained",
      "प्रशिक्षित"
    ],
    [
      "Appears",
      "दिखता है"
    ],
    [
      "appears",
      "प्रतीत होता है"
    ],
    [
      "English",
      "English"
    ],
    [
      "Marathi",
      "मराठी"
    ],
    [
      "ACCOUNT",
      "खाता"
    ],
    [
      "AUCTION",
      "नीलामी"
    ],
    [
      "Auction",
      "नीलामी"
    ],
    [
      "auction",
      "नीलामी"
    ],
    [
      "Already",
      "पहले से"
    ],
    [
      "Ambient",
      "परिवेशी"
    ],
    [
      "account",
      "खाता"
    ],
    [
      "Compare",
      "तुलना करें"
    ],
    [
      "Created",
      "निर्मित"
    ],
    [
      "Current",
      "वर्तमान"
    ],
    [
      "DEPOSIT",
      "जमा करें"
    ],
    [
      "Express",
      "एक्सप्रेस"
    ],
    [
      "Forward",
      "आगे भेजें"
    ],
    [
      "forward",
      "आगे"
    ],
    [
      "Gateway",
      "गेटवे"
    ],
    [
      "Insured",
      "बीमित"
    ],
    [
      "Kishore",
      "किशोर"
    ],
    [
      "locking",
      "लॉक करना"
    ],
    [
      "NETWORK",
      "नेटवर्क"
    ],
    [
      "Permits",
      "परमिट"
    ],
    [
      "REVERSE",
      "रिवर्स"
    ],
    [
      "reverse",
      "रिवर्स"
    ],
    [
      "Secured",
      "सुरक्षित"
    ],
    [
      "VIRTUAL",
      "वर्चुअल"
    ],
    [
      "climate",
      "जलवायु"
    ],
    [
      "instant",
      "तत्काल"
    ],
    [
      "procure",
      "खरीदें"
    ],
    [
      "quality",
      "गुणवत्ता"
    ],
    [
      "salvage",
      "साल्वैज"
    ],
    [
      "updated",
      "अपडेटेड"
    ],
    [
      "variety",
      "किस्म"
    ],
    [
      "Manchar",
      "मंचर"
    ],
    [
      "Kalamna",
      "कलमना"
    ],
    [
      "Indapur",
      "इंदापुर"
    ],
    [
      "Pachora",
      "पाचोरा"
    ],
    [
      "Tasgaon",
      "तासगांव"
    ],
    [
      "Sangola",
      "सांगोला"
    ],
    [
      "Phaltan",
      "फलटण"
    ],
    [
      "Vadgaon",
      "वडगांव"
    ],
    [
      "Shiroli",
      "शिरोली"
    ],
    [
      "Shirpur",
      "शिरपुर"
    ],
    [
      "Shahada",
      "शहादा"
    ],
    [
      "Karanja",
      "कारंजा"
    ],
    [
      "Degloor",
      "देगलूर"
    ],
    [
      "Paithan",
      "पैठन"
    ],
    [
      "Alibaug",
      "अलिबाग"
    ],
    [
      "digital",
      "डिजिटल"
    ],
    [
      "DIGITAL",
      "डिजिटल"
    ],
    [
      "trustee",
      "ट्रस्टी"
    ],
    [
      "Officer",
      "अधिकारी"
    ],
    [
      "officer",
      "अधिकारी"
    ],
    [
      "Pickups",
      "पिकअप"
    ],
    [
      "happens",
      "होता है"
    ],
    [
      "Drivers",
      "चालक"
    ],
    [
      "Village",
      "गांव"
    ],
    [
      "village",
      "गांव"
    ],
    [
      "Command",
      "आदेश"
    ],
    [
      "command",
      "आदेश"
    ],
    [
      "genuine",
      "वास्तविक"
    ],
    [
      "Genuine",
      "वास्तविक"
    ],
    [
      "Bargain",
      "मोलभाव"
    ],
    [
      "bargain",
      "मोलभाव"
    ],
    [
      "highway",
      "हाईवे"
    ],
    [
      "Surplus",
      "अतिरिक्त"
    ],
    [
      "surplus",
      "अतिरिक्त"
    ],
    [
      "PARTIAL",
      "आंशिक"
    ],
    [
      "Machine",
      "मशीन"
    ],
    [
      "machine",
      "मशीन"
    ],
    [
      "loading",
      "लोडिंग"
    ],
    [
      "Selling",
      "बिक्री"
    ],
    [
      "selling",
      "बिक्री"
    ],
    [
      "OFFERED",
      "प्रस्तावित"
    ],
    [
      "Offered",
      "प्रस्तावित"
    ],
    [
      "offered",
      "प्रस्तावित"
    ],
    [
      "Inspect",
      "निरीक्षण करें"
    ],
    [
      "Restore",
      "बहाल करें"
    ],
    [
      "restore",
      "बहाल करें"
    ],
    [
      "Suspend",
      "निलंबित करें"
    ],
    [
      "suspend",
      "निलंबित करें"
    ],
    [
      "Trading",
      "व्यापार"
    ],
    [
      "trading",
      "व्यापार"
    ],
    [
      "De-list",
      "सूची से हटाएं"
    ],
    [
      "de-list",
      "सूची से हटाएं"
    ],
    [
      "Re-list",
      "पुनः सूचीबद्ध करें"
    ],
    [
      "re-list",
      "पुनः सूचीबद्ध करें"
    ],
    [
      "Payouts",
      "भुगतान"
    ],
    [
      "payouts",
      "भुगतान"
    ],
    [
      "release",
      "जारी करें"
    ],
    [
      "Cleared",
      "स्वीकृत"
    ],
    [
      "cleared",
      "स्वीकृत"
    ],
    [
      "Mumbai",
      "मुंबई"
    ],
    [
      "mumbai",
      "मुंबई"
    ],
    [
      "Mature",
      "परिपक्व"
    ],
    [
      "mature",
      "परिपक्व"
    ],
    [
      "MATURE",
      "परिपक्व"
    ],
    [
      "Packed",
      "पैक"
    ],
    [
      "packed",
      "पैक"
    ],
    [
      "PACKED",
      "पैक"
    ],
    [
      "Crates",
      "क्रेट्स"
    ],
    [
      "crates",
      "क्रेट्स"
    ],
    [
      "Origin",
      "मूल स्रोत"
    ],
    [
      "origin",
      "स्रोत"
    ],
    [
      "Review",
      "समीक्षा करें"
    ],
    [
      "review",
      "समीक्षा"
    ],
    [
      "Grains",
      "अनाज"
    ],
    [
      "Pulses",
      "दालें"
    ],
    [
      "pulses",
      "दालें"
    ],
    [
      "Fruits",
      "फल"
    ],
    [
      "Spices",
      "मसाले"
    ],
    [
      "Cotton",
      "कपास"
    ],
    [
      "Tomato",
      "टमाटर"
    ],
    [
      "Potato",
      "आलू"
    ],
    [
      "Banana",
      "केला"
    ],
    [
      "Grapes",
      "अंगूर"
    ],
    [
      "Orange",
      "संतरा"
    ],
    [
      "Chilli",
      "मिर्च"
    ],
    [
      "Bhagwa",
      "भगवा अनार"
    ],
    [
      "Shivam",
      "शिवम"
    ],
    [
      "Hybrid",
      "हाइब्रिड"
    ],
    [
      "Curing",
      "क्यूरिंग"
    ],
    [
      "Finger",
      "हल्दी फिंगर"
    ],
    [
      "Buyers",
      "क्रेता"
    ],
    [
      "buyers",
      "क्रेता"
    ],
    [
      "Seller",
      "विक्रेता"
    ],
    [
      "SELLER",
      "विक्रेता"
    ],
    [
      "seller",
      "विक्रेता"
    ],
    [
      "Farmer",
      "किसान"
    ],
    [
      "FARMER",
      "किसान"
    ],
    [
      "farmer",
      "किसान"
    ],
    [
      "Trader",
      "व्यापारी"
    ],
    [
      "Retail",
      "खुदरा"
    ],
    [
      "Makers",
      "निर्माता"
    ],
    [
      "Market",
      "बाजार"
    ],
    [
      "Mandis",
      "मंडियां"
    ],
    [
      "Portal",
      "पोर्टल"
    ],
    [
      "PORTAL",
      "पोर्टल"
    ],
    [
      "Demand",
      "मांग कोटा"
    ],
    [
      "Quotas",
      "कोटा"
    ],
    [
      "quotas",
      "कोटा"
    ],
    [
      "Buyout",
      "बायआउट"
    ],
    [
      "Offers",
      "प्रस्ताव"
    ],
    [
      "Clause",
      "खंड शर्त"
    ],
    [
      "Escrow",
      "एस्क्रो सुरक्षित"
    ],
    [
      "ESCROW",
      "एस्क्रो"
    ],
    [
      "escrow",
      "एस्क्रो"
    ],
    [
      "Payout",
      "भुगतान"
    ],
    [
      "payout",
      "भुगतान"
    ],
    [
      "Credit",
      "क्रेडिट"
    ],
    [
      "credit",
      "क्रेडिट"
    ],
    [
      "Refund",
      "रिफंड"
    ],
    [
      "refund",
      "रिफंड"
    ],
    [
      "Rebate",
      "छूट"
    ],
    [
      "rebate",
      "छूट"
    ],
    [
      "Pledge",
      "गिरवी रसीद"
    ],
    [
      "pledge",
      "गिरवी"
    ],
    [
      "Tenure",
      "अवधि"
    ],
    [
      "Liquid",
      "तरल"
    ],
    [
      "Prices",
      "भाव"
    ],
    [
      "prices",
      "भाव"
    ],
    [
      "Tariff",
      "टैरिफ"
    ],
    [
      "Hamali",
      "हमाली तुलाई"
    ],
    [
      "hamali",
      "हमाली"
    ],
    [
      "Broker",
      "दलाल"
    ],
    [
      "Spread",
      "मार्जिन अंतर"
    ],
    [
      "Losses",
      "नुकसान"
    ],
    [
      "losses",
      "नुकसान"
    ],
    [
      "Saving",
      "बचत"
    ],
    [
      "Values",
      "मान"
    ],
    [
      "Landed",
      "लैंडेड पहुंच"
    ],
    [
      "landed",
      "पहुंच लागत"
    ],
    [
      "Amount",
      "राशि"
    ],
    [
      "AMOUNT",
      "राशि"
    ],
    [
      "Hauler",
      "ट्रांसपोर्टर"
    ],
    [
      "Delays",
      "देरी"
    ],
    [
      "delays",
      "देरी"
    ],
    [
      "Reefer",
      "रीफर वाहन"
    ],
    [
      "Driver",
      "चालक"
    ],
    [
      "driver",
      "चालक"
    ],
    [
      "Sealed",
      "सील बंद"
    ],
    [
      "Sensor",
      "सेंसर"
    ],
    [
      "Beacon",
      "बीकन"
    ],
    [
      "Stored",
      "संग्रहित"
    ],
    [
      "Crates",
      "क्रेट्स"
    ],
    [
      "crates",
      "क्रेट्स"
    ],
    [
      "Inward",
      "आवक"
    ],
    [
      "Pickup",
      "पिकअप"
    ],
    [
      "pickup",
      "पिकअप"
    ],
    [
      "Grades",
      "ग्रेड श्रेणी"
    ],
    [
      "Assays",
      "जांच"
    ],
    [
      "assays",
      "जांच"
    ],
    [
      "Rotten",
      "सड़ा हुआ"
    ],
    [
      "rotten",
      "सड़ा हुआ"
    ],
    [
      "Claims",
      "दावे"
    ],
    [
      "Freeze",
      "फ्रीज करें"
    ],
    [
      "Frozen",
      "फ्रीज"
    ],
    [
      "Ruling",
      "निर्णय"
    ],
    [
      "ruling",
      "निर्णय"
    ],
    [
      "Trends",
      "रुझान ट्रेंड्स"
    ],
    [
      "trends",
      "रुझान"
    ],
    [
      "Inflow",
      "आवक प्रवाह"
    ],
    [
      "Volume",
      "मात्रा आयतन"
    ],
    [
      "Curves",
      "वक्र"
    ],
    [
      "curves",
      "वक्र"
    ],
    [
      "Search",
      "खोजें"
    ],
    [
      "search",
      "खोजें"
    ],
    [
      "Filter",
      "फ़िल्टर करें"
    ],
    [
      "filter",
      "फ़िल्टर"
    ],
    [
      "Action",
      "कार्रवाई"
    ],
    [
      "ACTION",
      "कार्रवाई"
    ],
    [
      "Status",
      "स्थिति"
    ],
    [
      "STATUS",
      "स्थिति"
    ],
    [
      "status",
      "स्थिति"
    ],
    [
      "Active",
      "सक्रिय"
    ],
    [
      "active",
      "सक्रिय"
    ],
    [
      "Booked",
      "बुक किया गया"
    ],
    [
      "Cancel",
      "रद्द करें"
    ],
    [
      "cancel",
      "रद्द करें"
    ],
    [
      "Submit",
      "जमा करें"
    ],
    [
      "submit",
      "जमा करें"
    ],
    [
      "Delete",
      "हटाएं"
    ],
    [
      "Ledger",
      "लेजर बही"
    ],
    [
      "Report",
      "रिपोर्ट"
    ],
    [
      "Logout",
      "लॉगआउट"
    ],
    [
      "Select",
      "चुनें"
    ],
    [
      "select",
      "चुनें"
    ],
    [
      "Choose",
      "चुनें"
    ],
    [
      "Create",
      "बनाएं"
    ],
    [
      "Change",
      "बदलें"
    ],
    [
      "Switch",
      "बदलें"
    ],
    [
      "Urgent",
      "अति आवश्यक"
    ],
    [
      "Custom",
      "कस्टम"
    ],
    [
      "Manual",
      "मैनुअल"
    ],
    [
      "Synced",
      "सिंक हुआ"
    ],
    [
      "Online",
      "ऑनलाइन"
    ],
    [
      "Number",
      "संख्या"
    ],
    [
      "NUMBER",
      "संख्या"
    ],
    [
      "Months",
      "महीने"
    ],
    [
      "Origin",
      "मूल स्थान"
    ],
    [
      "origin",
      "मूल स्थान"
    ],
    [
      "Higher",
      "अधिक"
    ],
    [
      "Lowest",
      "न्यूनतम"
    ],
    [
      "Better",
      "बेहतर"
    ],
    [
      "Branch",
      "शाखा"
    ],
    [
      "Holder",
      "धारक"
    ],
    [
      "Wallet",
      "वॉलेट"
    ],
    [
      "Engine",
      "इंजन प्रणाली"
    ],
    [
      "ENGINE",
      "इंजन"
    ],
    [
      "System",
      "प्रणाली"
    ],
    [
      "Policy",
      "नीति"
    ],
    [
      "Within",
      "के भीतर"
    ],
    [
      "within",
      "के भीतर"
    ],
    [
      "Across",
      "भर में"
    ],
    [
      "across",
      "भर"
    ],
    [
      "During",
      "के दौरान"
    ],
    [
      "during",
      "के दौरान"
    ],
    [
      "Browse",
      "ब्राउज़ करें"
    ],
    [
      "browse",
      "ब्राउज़"
    ],
    [
      "Unlock",
      "अनलॉक करें"
    ],
    [
      "unlock",
      "अनलॉक करें"
    ],
    [
      "Mutual",
      "आपसी"
    ],
    [
      "mutual",
      "आपसी"
    ],
    [
      "Stream",
      "स्ट्रीम"
    ],
    [
      "stream",
      "स्ट्रीम"
    ],
    [
      "Attach",
      "संलग्न करें"
    ],
    [
      "attach",
      "जोड़ें"
    ],
    [
      "Upload",
      "अपलोड करें"
    ],
    [
      "upload",
      "अपलोड करें"
    ],
    [
      "Filing",
      "दाखिल करना"
    ],
    [
      "filing",
      "दाखिल करना"
    ],
    [
      "Radius",
      "दायरा"
    ],
    [
      "radius",
      "दायरा"
    ],
    [
      "Marked",
      "चिह्नित"
    ],
    [
      "marked",
      "चिह्नित"
    ],
    [
      "Mapped",
      "मैप किया गया"
    ],
    [
      "mapped",
      "मैप"
    ],
    [
      "Signal",
      "सिग्नल"
    ],
    [
      "signal",
      "सिग्नल"
    ],
    [
      "Bypass",
      "बायपास करें"
    ],
    [
      "bypass",
      "बायपास"
    ],
    [
      "Direct",
      "सीधे खरीद"
    ],
    [
      "direct",
      "सीधा"
    ],
    [
      "DIRECT",
      "सीधे"
    ],
    [
      "Yellow",
      "पीला"
    ],
    [
      "yellow",
      "पीला"
    ],
    [
      "Border",
      "बॉर्डर"
    ],
    [
      "border",
      "बॉर्डर"
    ],
    [
      "Orders",
      "ऑर्डर्स"
    ],
    [
      "orders",
      "ऑर्डर्स"
    ],
    [
      "ORDERS",
      "ऑर्डर्स"
    ],
    [
      "Appear",
      "दिखता है"
    ],
    [
      "appear",
      "दिखता है"
    ],
    [
      "Indian",
      "भारतीय"
    ],
    [
      "Konkan",
      "कोंकण"
    ],
    [
      "ACTIVE",
      "सक्रिय"
    ],
    [
      "Accept",
      "स्वीकारें"
    ],
    [
      "accept",
      "स्वीकारें"
    ],
    [
      "Agreed",
      "सहमति"
    ],
    [
      "BRANCH",
      "शाखा"
    ],
    [
      "Buffer",
      "बफर स्टॉक"
    ],
    [
      "Client",
      "ग्राहक"
    ],
    [
      "client",
      "ग्राहक"
    ],
    [
      "EICHER",
      "आयशर"
    ],
    [
      "Entire",
      "संपूर्ण"
    ],
    [
      "Export",
      "निर्यात"
    ],
    [
      "export",
      "निर्यात"
    ],
    [
      "Google",
      "गूगल"
    ],
    [
      "ISSUED",
      "जारी किया गया"
    ],
    [
      "Jadhav",
      "जाधव"
    ],
    [
      "Locked",
      "लॉक किया गया"
    ],
    [
      "locked",
      "लॉक"
    ],
    [
      "Rajesh",
      "राजेश"
    ],
    [
      "Rating",
      "रेटिंग"
    ],
    [
      "rating",
      "रेटिंग"
    ],
    [
      "return",
      "वापसी"
    ],
    [
      "Selvam",
      "सेल्वम"
    ],
    [
      "Shinde",
      "शिंदे"
    ],
    [
      "Source",
      "स्रोत"
    ],
    [
      "Target",
      "लक्षित"
    ],
    [
      "target",
      "लक्षित"
    ],
    [
      "Thorat",
      "थोरात"
    ],
    [
      "VOLUME",
      "मात्रा"
    ],
    [
      "Weight",
      "वजन"
    ],
    [
      "weight",
      "वजन"
    ],
    [
      "beacon",
      "बीकन"
    ],
    [
      "change",
      "बदलें"
    ],
    [
      "demand",
      "मांग"
    ],
    [
      "diesel",
      "डीजल"
    ],
    [
      "frozen",
      "फ्रीज"
    ],
    [
      "higher",
      "अधिक"
    ],
    [
      "linked",
      "जुड़ा हुआ"
    ],
    [
      "mandis",
      "मंडियां"
    ],
    [
      "market",
      "बाजार"
    ],
    [
      "portal",
      "पोर्टल"
    ],
    [
      "report",
      "रिपोर्ट"
    ],
    [
      "sensor",
      "सेंसर"
    ],
    [
      "tested",
      "परीक्षित"
    ],
    [
      "Junnar",
      "जुन्नर"
    ],
    [
      "Rahata",
      "राहाता"
    ],
    [
      "Rahuri",
      "राहुरी"
    ],
    [
      "Hingna",
      "हिंगणा"
    ],
    [
      "Chopda",
      "चोपड़ा"
    ],
    [
      "Barshi",
      "बार्शी"
    ],
    [
      "Shirol",
      "शिरोल"
    ],
    [
      "Kannad",
      "कन्नड़"
    ],
    [
      "Basmat",
      "बसमत"
    ],
    [
      "Dharur",
      "धारूर"
    ],
    [
      "Omerga",
      "उमरगा"
    ],
    [
      "Kalamb",
      "कलंब"
    ],
    [
      "Devgad",
      "देवगढ़"
    ],
    [
      "Kavita",
      "कविता"
    ],
    [
      "Sanjay",
      "संजय"
    ],
    [
      "Sangli",
      "सांगली"
    ],
    [
      "Matrix",
      "मैट्रिक्स तालिका"
    ],
    [
      "matrix",
      "मैट्रिक्स"
    ],
    [
      "Hunter",
      "खोजकर्ता"
    ],
    [
      "hunter",
      "खोजकर्ता"
    ],
    [
      "logout",
      "लॉगआउट"
    ],
    [
      "switch",
      "बदलें"
    ],
    [
      "Launch",
      "शुरू करें"
    ],
    [
      "launch",
      "शुरू करें"
    ],
    [
      "Fleets",
      "फ्लीट"
    ],
    [
      "Sector",
      "सेक्टर"
    ],
    [
      "sector",
      "सेक्टर"
    ],
    [
      "chilli",
      "मिर्च"
    ],
    [
      "reefer",
      "रीफर"
    ],
    [
      "Global",
      "ग्लोबल"
    ],
    [
      "global",
      "ग्लोबल"
    ],
    [
      "grains",
      "अनाज"
    ],
    [
      "Excess",
      "अत्यधिक"
    ],
    [
      "excess",
      "अत्यधिक"
    ],
    [
      "Shimla",
      "शिमला"
    ],
    [
      "shimla",
      "शिमला"
    ],
    [
      "unsold",
      "अबिना बिका"
    ],
    [
      "Unsold",
      "अबिना बिका"
    ],
    [
      "Listen",
      "सुनें"
    ],
    [
      "listen",
      "सुनें"
    ],
    [
      "offers",
      "प्रस्ताव"
    ],
    [
      "booked",
      "बुक किया गया"
    ],
    [
      "Trucks",
      "ट्रक"
    ],
    [
      "trucks",
      "ट्रक"
    ],
    [
      "STEADY",
      "स्थिर"
    ],
    [
      "Steady",
      "स्थिर"
    ],
    [
      "steady",
      "स्थिर"
    ],
    [
      "finger",
      "गांठ"
    ],
    [
      "Filled",
      "भरा हुआ"
    ],
    [
      "filled",
      "भरा हुआ"
    ],
    [
      "Season",
      "मौसम"
    ],
    [
      "season",
      "मौसम"
    ],
    [
      "strong",
      "मजबूत"
    ],
    [
      "Strong",
      "मजबूत"
    ],
    [
      "Triage",
      "कार्य प्राथमिकता"
    ],
    [
      "triage",
      "प्राथमिकता"
    ],
    [
      "Access",
      "पहुंच"
    ],
    [
      "access",
      "पहुंच"
    ],
    [
      "Remove",
      "हटाएं"
    ],
    [
      "remove",
      "हटाएं"
    ],
    [
      "Gunny",
      "बोरी"
    ],
    [
      "gunny",
      "बोरी"
    ],
    [
      "Hands",
      "पंजे"
    ],
    [
      "hands",
      "पंजे"
    ],
    [
      "Bulbs",
      "गांठ"
    ],
    [
      "bulbs",
      "गांठ"
    ],
    [
      "Lined",
      "अस्तरयुक्त"
    ],
    [
      "lined",
      "अस्तरयुक्त"
    ],
    [
      "QUOTA",
      "कोटा"
    ],
    [
      "quota",
      "कोटा"
    ],
    [
      "Crops",
      "फसलें"
    ],
    [
      "crops",
      "फसलें"
    ],
    [
      "Grain",
      "अनाज"
    ],
    [
      "grain",
      "अनाज"
    ],
    [
      "Spice",
      "मसाला"
    ],
    [
      "Onion",
      "प्याज"
    ],
    [
      "onion",
      "प्याज"
    ],
    [
      "Mango",
      "आम"
    ],
    [
      "Jowar",
      "ज्वार"
    ],
    [
      "Paddy",
      "धान"
    ],
    [
      "Hapus",
      "हापुस"
    ],
    [
      "Garwa",
      "गरवा प्याज"
    ],
    [
      "Naine",
      "ग्रैंड नैन"
    ],
    [
      "Grand",
      "ग्रैंड"
    ],
    [
      "Fresh",
      "ताजा"
    ],
    [
      "Puree",
      "प्यूरी"
    ],
    [
      "Sauce",
      "सॉस"
    ],
    [
      "Gluts",
      "अत्यधिक आवक"
    ],
    [
      "gluts",
      "अत्यधिक आवक"
    ],
    [
      "Buyer",
      "क्रेता"
    ],
    [
      "BUYER",
      "क्रेता"
    ],
    [
      "buyer",
      "क्रेता"
    ],
    [
      "Trade",
      "व्यापार"
    ],
    [
      "Maker",
      "निर्माता"
    ],
    [
      "Mandi",
      "मंडी"
    ],
    [
      "Quota",
      "कोटा"
    ],
    [
      "Offer",
      "प्रस्ताव"
    ],
    [
      "offer",
      "प्रस्ताव"
    ],
    [
      "Legal",
      "कानूनी"
    ],
    [
      "Vault",
      "वॉल्ट"
    ],
    [
      "Loans",
      "ऋण"
    ],
    [
      "loans",
      "ऋण"
    ],
    [
      "Funds",
      "फंड निधि"
    ],
    [
      "funds",
      "फंड निधि"
    ],
    [
      "Costs",
      "लागत"
    ],
    [
      "costs",
      "लागत"
    ],
    [
      "Price",
      "भाव मूल्य"
    ],
    [
      "PRICE",
      "भाव मूल्य"
    ],
    [
      "price",
      "भाव"
    ],
    [
      "Rates",
      "दर"
    ],
    [
      "rates",
      "दर"
    ],
    [
      "Taxes",
      "कर"
    ],
    [
      "Tolls",
      "टोल टैक्स"
    ],
    [
      "tolls",
      "टोल टैक्स"
    ],
    [
      "Saved",
      "बचत"
    ],
    [
      "saved",
      "बचत"
    ],
    [
      "Value",
      "मूल्य"
    ],
    [
      "value",
      "मूल्य"
    ],
    [
      "Total",
      "कुल"
    ],
    [
      "TOTAL",
      "कुल"
    ],
    [
      "total",
      "कुल"
    ],
    [
      "Modal",
      "मॉडल दर"
    ],
    [
      "MODAL",
      "मॉडल दर"
    ],
    [
      "modal",
      "मॉडल"
    ],
    [
      "Floor",
      "न्यूनतम तल"
    ],
    [
      "Truck",
      "ट्रक"
    ],
    [
      "truck",
      "ट्रक"
    ],
    [
      "Fleet",
      "फ्लीट बेड़ा"
    ],
    [
      "fleet",
      "फ्लीट"
    ],
    [
      "Cargo",
      "कार्गो"
    ],
    [
      "Route",
      "मार्ग"
    ],
    [
      "Gross",
      "सकल वजन"
    ],
    [
      "Slips",
      "पर्चियां"
    ],
    [
      "slips",
      "पर्चियां"
    ],
    [
      "Track",
      "ट्रैक करें"
    ],
    [
      "Store",
      "संग्रहित करें"
    ],
    [
      "Silos",
      "साइलो"
    ],
    [
      "silos",
      "साइलो"
    ],
    [
      "Solar",
      "सौर ऊर्जा"
    ],
    [
      "Stack",
      "चट्टा (स्टैक)"
    ],
    [
      "Slots",
      "स्लॉट्स"
    ],
    [
      "slots",
      "स्लॉट्स"
    ],
    [
      "Space",
      "स्थान"
    ],
    [
      "space",
      "स्थान"
    ],
    [
      "Boxes",
      "डिब्बे"
    ],
    [
      "Crate",
      "क्रेट"
    ],
    [
      "Gunny",
      "सन बोरी"
    ],
    [
      "Loose",
      "खुला माल"
    ],
    [
      "Grade",
      "ग्रेड श्रेणी"
    ],
    [
      "Assay",
      "परख जांच"
    ],
    [
      "Score",
      "स्कोर"
    ],
    [
      "Claim",
      "दावा"
    ],
    [
      "Proof",
      "प्रमाण"
    ],
    [
      "Trend",
      "रुझान"
    ],
    [
      "Close",
      "बंद करें"
    ],
    [
      "close",
      "बंद करें"
    ],
    [
      "Print",
      "प्रिंट करें"
    ],
    [
      "print",
      "प्रिंट करें"
    ],
    [
      "Audit",
      "ऑडिट"
    ],
    [
      "Table",
      "तालिका"
    ],
    [
      "Enter",
      "दर्ज करें"
    ],
    [
      "enter",
      "दर्ज करें"
    ],
    [
      "Phone",
      "फ़ोन नंबर"
    ],
    [
      "Guide",
      "मार्गदर्शिका"
    ],
    [
      "Night",
      "रात्रि"
    ],
    [
      "Hello",
      "नमस्ते"
    ],
    [
      "Click",
      "क्लिक करें"
    ],
    [
      "Alert",
      "अलर्ट"
    ],
    [
      "Today",
      "आज"
    ],
    [
      "today",
      "आज"
    ],
    [
      "Hours",
      "घंटे"
    ],
    [
      "hours",
      "घंटे"
    ],
    [
      "Month",
      "माह"
    ],
    [
      "month",
      "महीना"
    ],
    [
      "State",
      "राज्य"
    ],
    [
      "Quick",
      "त्वरित"
    ],
    [
      "Lower",
      "कम"
    ],
    [
      "Units",
      "इकाइयां"
    ],
    [
      "Lakhs",
      "लाख"
    ],
    [
      "Ratio",
      "अनुपात"
    ],
    [
      "Empty",
      "खाली"
    ],
    [
      "Fully",
      "पूरी तरह से"
    ],
    [
      "Ready",
      "तैयार"
    ],
    [
      "Layer",
      "परत"
    ],
    [
      "Terms",
      "नियम व शर्तें"
    ],
    [
      "terms",
      "शर्तें"
    ],
    [
      "Shall",
      "होगा"
    ],
    [
      "shall",
      "होगा"
    ],
    [
      "Under",
      "के तहत"
    ],
    [
      "under",
      "के अंतर्गत"
    ],
    [
      "Until",
      "तक"
    ],
    [
      "until",
      "तक"
    ],
    [
      "While",
      "जबकि"
    ],
    [
      "while",
      "जबकि"
    ],
    [
      "Other",
      "अन्य"
    ],
    [
      "other",
      "अन्य"
    ],
    [
      "Every",
      "प्रत्येक"
    ],
    [
      "every",
      "हर"
    ],
    [
      "Party",
      "पक्षकार"
    ],
    [
      "party",
      "पक्ष"
    ],
    [
      "Trial",
      "परीक्षण"
    ],
    [
      "trial",
      "ट्रायल"
    ],
    [
      "Shelf",
      "शेल्फ लाइफ"
    ],
    [
      "shelf",
      "शेल्फ लाइफ"
    ],
    [
      "Point",
      "बिंदु"
    ],
    [
      "point",
      "बिंदु"
    ],
    [
      "Board",
      "बोर्ड"
    ],
    [
      "board",
      "बोर्ड"
    ],
    [
      "Marks",
      "अंक"
    ],
    [
      "White",
      "सफेद"
    ],
    [
      "white",
      "सफेद"
    ],
    [
      "Color",
      "रंग"
    ],
    [
      "color",
      "रंग"
    ],
    [
      "Style",
      "शैली"
    ],
    [
      "style",
      "शैली"
    ],
    [
      "Event",
      "घटना"
    ],
    [
      "event",
      "इवेंट"
    ],
    [
      "Cards",
      "कार्ड्स"
    ],
    [
      "Order",
      "ऑर्डर"
    ],
    [
      "order",
      "ऑर्डर"
    ],
    [
      "Match",
      "मिलान"
    ],
    [
      "match",
      "मिलान"
    ],
    [
      "Hindi",
      "हिन्दी"
    ],
    [
      "India",
      "भारत"
    ],
    [
      "MIHAN",
      "मिहान"
    ],
    [
      "Agent",
      "एजेंट"
    ],
    [
      "Belts",
      "क्षेत्र"
    ],
    [
      "belts",
      "क्षेत्र"
    ],
    [
      "Chain",
      "आपूर्ति श्रृंखला"
    ],
    [
      "chain",
      "श्रृंखला"
    ],
    [
      "ENTER",
      "दर्ज करें"
    ],
    [
      "Final",
      "अंतिम"
    ],
    [
      "final",
      "अंतिम"
    ],
    [
      "Heavy",
      "भारी"
    ],
    [
      "Index",
      "सूचकांक"
    ],
    [
      "Issue",
      "मुद्दा/समस्या"
    ],
    [
      "issue",
      "मुद्दा"
    ],
    [
      "Kisan",
      "किसान"
    ],
    [
      "Model",
      "मॉडल"
    ],
    [
      "Multi",
      "मल्टी"
    ],
    [
      "Nodal",
      "नोडल"
    ],
    [
      "nodal",
      "नोडल"
    ],
    [
      "Patil",
      "पाटिल"
    ],
    [
      "Photo",
      "फोटो"
    ],
    [
      "Plate",
      "नंबर प्लेट"
    ],
    [
      "plate",
      "नंबर प्लेट"
    ],
    [
      "SMART",
      "स्मार्ट"
    ],
    [
      "Smart",
      "स्मार्ट"
    ],
    [
      "smart",
      "स्मार्ट"
    ],
    [
      "Short",
      "कम"
    ],
    [
      "Speed",
      "गति"
    ],
    [
      "Trail",
      "ऑडिट ट्रेल"
    ],
    [
      "Trust",
      "विश्वास"
    ],
    [
      "trust",
      "विश्वास"
    ],
    [
      "assay",
      "परख"
    ],
    [
      "based",
      "आधारित"
    ],
    [
      "claim",
      "दावा"
    ],
    [
      "favor",
      "पक्ष में"
    ],
    [
      "feeds",
      "अपडेट्स"
    ],
    [
      "fully",
      "पूरी तरह से"
    ],
    [
      "major",
      "प्रमुख"
    ],
    [
      "mandi",
      "मंडी"
    ],
    [
      "times",
      "बार"
    ],
    [
      "Vashi",
      "वाशी"
    ],
    [
      "Katol",
      "काटोल"
    ],
    [
      "Raver",
      "रावेर"
    ],
    [
      "Karad",
      "कराड"
    ],
    [
      "Sakri",
      "साक्री"
    ],
    [
      "Warud",
      "वरुड"
    ],
    [
      "Ambad",
      "अंबड"
    ],
    [
      "Nagar",
      "अहमदनगर"
    ],
    [
      "Shahu",
      "शाहू"
    ],
    [
      "APMCs",
      "मंडियां"
    ],
    [
      "Euler",
      "ऑयलर"
    ],
    [
      "crate",
      "क्रेट"
    ],
    [
      "ready",
      "तैयार"
    ],
    [
      "click",
      "क्लिक करें"
    ],
    [
      "Names",
      "नाम"
    ],
    [
      "lower",
      "कम"
    ],
    [
      "Voice",
      "आवाज"
    ],
    [
      "voice",
      "आवाज"
    ],
    [
      "Green",
      "हरी"
    ],
    [
      "green",
      "हरी"
    ],
    [
      "grade",
      "ग्रेड"
    ],
    [
      "Speak",
      "बोलें"
    ],
    [
      "speak",
      "बोलें"
    ],
    [
      "Press",
      "दबाएं"
    ],
    [
      "press",
      "दबाएं"
    ],
    [
      "photo",
      "फोटो"
    ],
    [
      "track",
      "ट्रैक करें"
    ],
    [
      "vault",
      "वॉल्ट"
    ],
    [
      "TODAY",
      "आज"
    ],
    [
      "STORE",
      "भंडारण करें"
    ],
    [
      "store",
      "भंडारण"
    ],
    [
      "Whole",
      "साबुत"
    ],
    [
      "whole",
      "साबुत"
    ],
    [
      "gross",
      "सकल"
    ],
    [
      "fresh",
      "ताजा"
    ],
    [
      "quick",
      "त्वरित"
    ],
    [
      "trend",
      "रुझान"
    ],
    [
      "Brix",
      "ब्रिक्स"
    ],
    [
      "brix",
      "ब्रिक्स"
    ],
    [
      "Jute",
      "जूट"
    ],
    [
      "jute",
      "जूट"
    ],
    [
      "Bags",
      "बोरियां"
    ],
    [
      "bags",
      "बोरियां"
    ],
    [
      "Skin",
      "छिलका"
    ],
    [
      "skin",
      "छिलका"
    ],
    [
      "Agro",
      "कृषि एग्रो"
    ],
    [
      "Agri",
      "कृषि"
    ],
    [
      "AGRI",
      "कृषि"
    ],
    [
      "Crop",
      "फसल"
    ],
    [
      "Food",
      "खाद्य"
    ],
    [
      "Feed",
      "पशु आहार"
    ],
    [
      "Yard",
      "मंडी प्रांगण"
    ],
    [
      "Hubs",
      "हब केंद्र"
    ],
    [
      "Buys",
      "खरीद"
    ],
    [
      "Bids",
      "प्रस्ताव"
    ],
    [
      "Deed",
      "विलेख"
    ],
    [
      "Paid",
      "चुकाया गया"
    ],
    [
      "paid",
      "चुकाया"
    ],
    [
      "Lien",
      "ग्रहणाधिकार"
    ],
    [
      "lien",
      "ग्रहणाधिकार"
    ],
    [
      "Loan",
      "ऋण"
    ],
    [
      "loan",
      "ऋण"
    ],
    [
      "Pool",
      "पूल"
    ],
    [
      "Cost",
      "लागत"
    ],
    [
      "cost",
      "लागत"
    ],
    [
      "Rate",
      "दर भाव"
    ],
    [
      "RATE",
      "दर भाव"
    ],
    [
      "rate",
      "दर"
    ],
    [
      "Fees",
      "शुल्क"
    ],
    [
      "Cess",
      "सेस उपकर"
    ],
    [
      "cess",
      "सेस उपकर"
    ],
    [
      "Toll",
      "टोल"
    ],
    [
      "Loss",
      "नुकसान"
    ],
    [
      "loss",
      "नुकसान"
    ],
    [
      "Save",
      "सहेजें"
    ],
    [
      "Maxi",
      "मैक्सी"
    ],
    [
      "Mini",
      "मिनी"
    ],
    [
      "Calc",
      "गणना"
    ],
    [
      "Axle",
      "एक्सल"
    ],
    [
      "Road",
      "सड़क"
    ],
    [
      "Tare",
      "खाली वाहन वजन (टारे)"
    ],
    [
      "Slip",
      "पर्ची रसीद"
    ],
    [
      "slip",
      "पर्ची"
    ],
    [
      "Pass",
      "गेट पास"
    ],
    [
      "pass",
      "गेट पास"
    ],
    [
      "Gate",
      "गेट द्वार"
    ],
    [
      "gate",
      "गेट"
    ],
    [
      "Seal",
      "सुरक्षा सील"
    ],
    [
      "Silo",
      "साइलो"
    ],
    [
      "silo",
      "साइलो"
    ],
    [
      "Temp",
      "तापमान"
    ],
    [
      "Slot",
      "स्लॉट"
    ],
    [
      "Pack",
      "पैक"
    ],
    [
      "Bags",
      "बोरियां"
    ],
    [
      "Jute",
      "जूट"
    ],
    [
      "Book",
      "बुक करें"
    ],
    [
      "book",
      "बुक करें"
    ],
    [
      "Edit",
      "संपादित करें"
    ],
    [
      "edit",
      "संपादित करें"
    ],
    [
      "View",
      "देखें"
    ],
    [
      "view",
      "देखें"
    ],
    [
      "Copy",
      "कॉपी करें"
    ],
    [
      "Logs",
      "लॉग्स"
    ],
    [
      "Grid",
      "ग्रिड"
    ],
    [
      "List",
      "सूची"
    ],
    [
      "Show",
      "दिखाएं"
    ],
    [
      "show",
      "दिखाएं"
    ],
    [
      "Hide",
      "छिपाएं"
    ],
    [
      "More",
      "अधिक देखें"
    ],
    [
      "Less",
      "कम देखें"
    ],
    [
      "Next",
      "आगे"
    ],
    [
      "Prev",
      "पीछे"
    ],
    [
      "Post",
      "पोस्ट करें"
    ],
    [
      "Send",
      "भेजें"
    ],
    [
      "send",
      "भेजें"
    ],
    [
      "Type",
      "प्रकार / लिखें"
    ],
    [
      "TYPE",
      "प्रकार"
    ],
    [
      "type",
      "लिखें"
    ],
    [
      "Chat",
      "चैट"
    ],
    [
      "chat",
      "चैट"
    ],
    [
      "Call",
      "कॉल करें"
    ],
    [
      "Help",
      "मदद"
    ],
    [
      "Find",
      "खोजें"
    ],
    [
      "Best",
      "सर्वोत्तम"
    ],
    [
      "Good",
      "शुभ"
    ],
    [
      "Info",
      "जानकारी"
    ],
    [
      "Auto",
      "स्वचालित"
    ],
    [
      "Live",
      "लाइव"
    ],
    [
      "live",
      "लाइव"
    ],
    [
      "Real",
      "वास्तविक"
    ],
    [
      "REAL",
      "वास्तविक"
    ],
    [
      "Sync",
      "सिंक करें"
    ],
    [
      "sync",
      "सिंक"
    ],
    [
      "Hash",
      "हैश"
    ],
    [
      "Code",
      "कोड"
    ],
    [
      "CODE",
      "कोड"
    ],
    [
      "Name",
      "नाम"
    ],
    [
      "NAME",
      "नाम"
    ],
    [
      "Date",
      "दिनांक तारीख"
    ],
    [
      "DATE",
      "दिनांक"
    ],
    [
      "Time",
      "समय"
    ],
    [
      "TIME",
      "समय"
    ],
    [
      "time",
      "समय"
    ],
    [
      "Days",
      "दिन"
    ],
    [
      "days",
      "दिन"
    ],
    [
      "Hour",
      "घंटा"
    ],
    [
      "Mins",
      "मिनट"
    ],
    [
      "mins",
      "मिनट"
    ],
    [
      "Year",
      "वर्ष"
    ],
    [
      "year",
      "वर्ष"
    ],
    [
      "Fast",
      "तेज"
    ],
    [
      "High",
      "उच्च"
    ],
    [
      "Unit",
      "इकाई"
    ],
    [
      "unit",
      "इकाई"
    ],
    [
      "Zero",
      "शून्य"
    ],
    [
      "zero",
      "शून्य"
    ],
    [
      "Free",
      "मुफ्त"
    ],
    [
      "Full",
      "पूर्ण"
    ],
    [
      "Bank",
      "बैंक"
    ],
    [
      "Card",
      "कार्ड"
    ],
    [
      "Step",
      "चरण"
    ],
    [
      "Your",
      "आपका"
    ],
    [
      "your",
      "आपका"
    ],
    [
      "From",
      "से"
    ],
    [
      "from",
      "से"
    ],
    [
      "With",
      "के साथ"
    ],
    [
      "with",
      "के साथ"
    ],
    [
      "Will",
      "होगा"
    ],
    [
      "will",
      "होगा"
    ],
    [
      "Upon",
      "पर"
    ],
    [
      "upon",
      "पर"
    ],
    [
      "This",
      "यह"
    ],
    [
      "this",
      "यह"
    ],
    [
      "Just",
      "बस"
    ],
    [
      "just",
      "सिर्फ"
    ],
    [
      "Hold",
      "होल्ड रोकें"
    ],
    [
      "hold",
      "होल्ड"
    ],
    [
      "Wash",
      "धुलाई"
    ],
    [
      "wash",
      "धुलाई"
    ],
    [
      "Life",
      "जीवन काल"
    ],
    [
      "life",
      "आयु"
    ],
    [
      "Draw",
      "आहरण"
    ],
    [
      "draw",
      "निकालना"
    ],
    [
      "File",
      "फ़ाइल"
    ],
    [
      "file",
      "फ़ाइल"
    ],
    [
      "Govt",
      "सरकारी"
    ],
    [
      "govt",
      "सरकारी"
    ],
    [
      "Apps",
      "ऐप्स"
    ],
    [
      "apps",
      "ऐप्स"
    ],
    [
      "Gold",
      "स्वर्ण"
    ],
    [
      "gold",
      "स्वर्ण"
    ],
    [
      "Font",
      "फ़ॉन्ट"
    ],
    [
      "font",
      "फ़ॉन्ट"
    ],
    [
      "Lots",
      "लॉट्स"
    ],
    [
      "lots",
      "लॉट्स"
    ],
    [
      "Open",
      "खुला"
    ],
    [
      "open",
      "खोलें"
    ],
    [
      "Sold",
      "बिक चुका"
    ],
    [
      "sold",
      "बिका"
    ],
    [
      "MIDC",
      "एमआईडीसी"
    ],
    [
      "BANK",
      "बैंक"
    ],
    [
      "bank",
      "बैंक"
    ],
    [
      "Back",
      "वापस"
    ],
    [
      "Base",
      "आधार"
    ],
    [
      "Bulk",
      "थोक बल्क"
    ],
    [
      "bulk",
      "थोक"
    ],
    [
      "Case",
      "मामला"
    ],
    [
      "Cash",
      "नकद"
    ],
    [
      "Cold",
      "शीत कोल्ड"
    ],
    [
      "cold",
      "शीत"
    ],
    [
      "Cred",
      "क्रेड"
    ],
    [
      "Dost",
      "दोस्त पिकअप"
    ],
    [
      "Dual",
      "दोहरा"
    ],
    [
      "dual",
      "दोहरा"
    ],
    [
      "FPOs",
      "एफपीओ"
    ],
    [
      "Farm",
      "खेत"
    ],
    [
      "farm",
      "खेत"
    ],
    [
      "Fuel",
      "ईंधन"
    ],
    [
      "IFSC",
      "आईएफएससी कोड"
    ],
    [
      "IMPS",
      "आईएमपीएस"
    ],
    [
      "Lead",
      "प्रमुख"
    ],
    [
      "Lock",
      "लॉक करें"
    ],
    [
      "lock",
      "लॉक करें"
    ],
    [
      "Mega",
      "मुख्य"
    ],
    [
      "Mode",
      "मोड तरीका"
    ],
    [
      "mode",
      "तरीका"
    ],
    [
      "Navi",
      "नवी"
    ],
    [
      "Near",
      "पास"
    ],
    [
      "Orig",
      "मूल"
    ],
    [
      "Park",
      "पार्क"
    ],
    [
      "ROOM",
      "कक्ष"
    ],
    [
      "Risk",
      "जोखिम"
    ],
    [
      "Safe",
      "सुरक्षित"
    ],
    [
      "YONO",
      "योनो"
    ],
    [
      "auto",
      "स्वचालित"
    ],
    [
      "best",
      "सर्वश्रेष्ठ"
    ],
    [
      "code",
      "कोड"
    ],
    [
      "crop",
      "फसल"
    ],
    [
      "data",
      "डेटा"
    ],
    [
      "dist",
      "जिला"
    ],
    [
      "eNWR",
      "ई-एनडब्ल्यूआर"
    ],
    [
      "held",
      "रोका गया"
    ],
    [
      "info",
      "जानकारी"
    ],
    [
      "into",
      "में"
    ],
    [
      "load",
      "लोड"
    ],
    [
      "rata",
      "अनुपात"
    ],
    [
      "real",
      "वास्तविक"
    ],
    [
      "term",
      "अवधि"
    ],
    [
      "true",
      "सत्य"
    ],
    [
      "yard",
      "मंडी प्रांगण"
    ],
    [
      "Kaij",
      "केज"
    ],
    [
      "Wada",
      "वाडा"
    ],
    [
      "name",
      "नाम"
    ],
    [
      "Peak",
      "शीर्ष स्तर"
    ],
    [
      "peak",
      "शीर्ष स्तर"
    ],
    [
      "Side",
      "पक्ष"
    ],
    [
      "side",
      "तरफ"
    ],
    [
      "cuts",
      "कटौती"
    ],
    [
      "than",
      "से"
    ],
    [
      "Role",
      "भूमिका"
    ],
    [
      "role",
      "भूमिका"
    ],
    [
      "navi",
      "नवी"
    ],
    [
      "next",
      "अगले"
    ],
    [
      "bids",
      "बोलियां"
    ],
    [
      "call",
      "कॉल करें"
    ],
    [
      "HOLD",
      "रोकें"
    ],
    [
      "SELL",
      "बेचें"
    ],
    [
      "Sell",
      "बेचें"
    ],
    [
      "sell",
      "बेचें"
    ],
    [
      "pack",
      "पैक"
    ],
    [
      "list",
      "सूचीबद्ध करें"
    ],
    [
      "rise",
      "वृद्धि"
    ],
    [
      "Rise",
      "वृद्धि"
    ],
    [
      "SOY",
      "सोयाबीन"
    ],
    [
      "ONI",
      "प्याज"
    ],
    [
      "TOM",
      "टमाटर"
    ],
    [
      "Raw",
      "कच्चा"
    ],
    [
      "Dry",
      "सूखा"
    ],
    [
      "Bio",
      "जैविक बायो"
    ],
    [
      "Hub",
      "हब केंद्र"
    ],
    [
      "Buy",
      "खरीदें"
    ],
    [
      "buy",
      "खरीदें"
    ],
    [
      "Bid",
      "बोली"
    ],
    [
      "bid",
      "बोली"
    ],
    [
      "Pay",
      "भुगतान करें"
    ],
    [
      "pay",
      "भुगतान करें"
    ],
    [
      "Fee",
      "शुल्क"
    ],
    [
      "fee",
      "शुल्क"
    ],
    [
      "Tax",
      "कर"
    ],
    [
      "tax",
      "कर"
    ],
    [
      "Avg",
      "औसत"
    ],
    [
      "Min",
      "न्यूनतम"
    ],
    [
      "Max",
      "अधिकतम"
    ],
    [
      "Cap",
      "कैप सीमा"
    ],
    [
      "Net",
      "शुद्ध वजन"
    ],
    [
      "Box",
      "बॉक्स"
    ],
    [
      "box",
      "डिब्बा"
    ],
    [
      "Bag",
      "बोरी"
    ],
    [
      "Lab",
      "प्रयोगशाला"
    ],
    [
      "lab",
      "प्रयोगशाला"
    ],
    [
      "Log",
      "लॉग"
    ],
    [
      "All",
      "सभी"
    ],
    [
      "all",
      "सभी"
    ],
    [
      "New",
      "नया"
    ],
    [
      "new",
      "नया"
    ],
    [
      "Add",
      "जोड़ें"
    ],
    [
      "Top",
      "शीर्ष"
    ],
    [
      "Day",
      "दिन"
    ],
    [
      "day",
      "दिन"
    ],
    [
      "Hrs",
      "घंटे"
    ],
    [
      "Low",
      "कम"
    ],
    [
      "You",
      "आप"
    ],
    [
      "you",
      "आप"
    ],
    [
      "For",
      "के लिए"
    ],
    [
      "for",
      "के लिए"
    ],
    [
      "And",
      "और"
    ],
    [
      "and",
      "और"
    ],
    [
      "Are",
      "हैं"
    ],
    [
      "are",
      "हैं"
    ],
    [
      "Now",
      "अभी"
    ],
    [
      "now",
      "अभी"
    ],
    [
      "Per",
      "प्रति"
    ],
    [
      "per",
      "प्रति"
    ],
    [
      "Has",
      "है"
    ],
    [
      "has",
      "है"
    ],
    [
      "Any",
      "कोई भी"
    ],
    [
      "any",
      "कोई"
    ],
    [
      "How",
      "कैसे"
    ],
    [
      "how",
      "कैसे"
    ],
    [
      "See",
      "देखें"
    ],
    [
      "see",
      "देखें"
    ],
    [
      "Ask",
      "पूछें"
    ],
    [
      "ask",
      "पूछें"
    ],
    [
      "Cut",
      "कटौती"
    ],
    [
      "cut",
      "कटौती"
    ],
    [
      "Key",
      "मुख्य"
    ],
    [
      "key",
      "प्रमुख"
    ],
    [
      "App",
      "ऐप"
    ],
    [
      "Web",
      "वेब"
    ],
    [
      "Red",
      "लाल"
    ],
    [
      "red",
      "लाल"
    ],
    [
      "Lot",
      "लॉट"
    ],
    [
      "lot",
      "लॉट"
    ],
    [
      "Out",
      "समाप्त"
    ],
    [
      "out",
      "बाहर"
    ],
    [
      "BKC",
      "बीकेसी"
    ],
    [
      "Ace",
      "छोटा हाथी (एस)"
    ],
    [
      "Act",
      "अधिनियम"
    ],
    [
      "BAN",
      "प्रतिबंध"
    ],
    [
      "BUY",
      "खरीदें"
    ],
    [
      "ERP",
      "ईआरपी"
    ],
    [
      "FPO",
      "एफपीओ"
    ],
    [
      "Fix",
      "तय करें"
    ],
    [
      "IoT",
      "आईओटी"
    ],
    [
      "Lic",
      "लाइसेंस"
    ],
    [
      "Ltd",
      "लिमिटेड"
    ],
    [
      "Nex",
      "नेक्स"
    ],
    [
      "POs",
      "खरीद आदेश"
    ],
    [
      "Pro",
      "प्रो"
    ],
    [
      "pro",
      "प्रो"
    ],
    [
      "Pvt",
      "प्राइवेट"
    ],
    [
      "Sep",
      "सितंबर"
    ],
    [
      "Tri",
      "त्रिपक्षीय"
    ],
    [
      "Use",
      "उपयोग"
    ],
    [
      "use",
      "उपयोग"
    ],
    [
      "dry",
      "सूखा"
    ],
    [
      "hub",
      "हब"
    ],
    [
      "low",
      "कम"
    ],
    [
      "max",
      "अधिकतम"
    ],
    [
      "via",
      "के माध्यम से"
    ],
    [
      "bag",
      "बोरी"
    ],
    [
      "REF",
      "संदर्भ"
    ],
    [
      "due",
      "कारण"
    ],
    [
      "Due",
      "कारण"
    ],
    [
      "RH",
      "सापेक्ष आर्द्रता"
    ],
    [
      "JS",
      "जेएस"
    ],
    [
      "No",
      "सं."
    ],
    [
      "Qt",
      "क्विंटल"
    ],
    [
      "Kg",
      "किग्रा"
    ],
    [
      "kg",
      "किग्रा"
    ],
    [
      "To",
      "तक / को"
    ],
    [
      "to",
      "तक"
    ],
    [
      "In",
      "में"
    ],
    [
      "in",
      "में"
    ],
    [
      "On",
      "पर"
    ],
    [
      "on",
      "पर"
    ],
    [
      "At",
      "पर"
    ],
    [
      "at",
      "पर"
    ],
    [
      "Of",
      "का / के / की"
    ],
    [
      "of",
      "का"
    ],
    [
      "Or",
      "या"
    ],
    [
      "or",
      "या"
    ],
    [
      "By",
      "द्वारा"
    ],
    [
      "by",
      "द्वारा"
    ],
    [
      "Is",
      "है"
    ],
    [
      "is",
      "है"
    ],
    [
      "Vs",
      "बनाम"
    ],
    [
      "vs",
      "बनाम"
    ],
    [
      "An",
      "एक"
    ],
    [
      "an",
      "एक"
    ],
    [
      "As",
      "के रूप में"
    ],
    [
      "as",
      "जैसे"
    ],
    [
      "If",
      "यदि"
    ],
    [
      "if",
      "यदि"
    ],
    [
      "AI",
      "एआई"
    ],
    [
      "BB",
      "बीबी"
    ],
    [
      "BY",
      "द्वारा"
    ],
    [
      "EV",
      "ईवी"
    ],
    [
      "PM",
      "अपराह्न"
    ],
    [
      "AM",
      "पूर्वाह्न"
    ],
    [
      "PO",
      "खरीद आदेश"
    ],
    [
      "QA",
      "गुणवत्ता जांच"
    ],
    [
      "QC",
      "गुणवत्ता नियंत्रण"
    ],
    [
      "QR",
      "क्यूआर कोड"
    ],
    [
      "Re",
      "पुनः"
    ],
    [
      "Up",
      "ऊपर"
    ],
    [
      "up",
      "ऊपर"
    ],
    [
      "be",
      "हो"
    ],
    [
      "ph",
      "खोजें"
    ],
    [
      "am",
      "हूँ"
    ],
    [
      "I",
      "मैं"
    ],
    [
      "i",
      "मैं"
    ],
    [
      "a",
      "एक"
    ],
    [
      "A",
      "ए"
    ]
  ]
};

  const WORD_MAP = { mr: {}, hi: {} };
  const WORD_REGEX = {};

  ['mr', 'hi'].forEach(lang => {
    const list = (typeof WORD_REPLACEMENTS !== 'undefined' && WORD_REPLACEMENTS[lang]) || [];
    const keys = [];
    for (let i = 0; i < list.length; i++) {
      const [w, r] = list[i];
      if (typeof w === 'string') {
        WORD_MAP[lang][w] = r;
        keys.push(escapeRegex(w));
      }
    }
    keys.sort((a, b) => b.length - a.length);
    if (keys.length > 0) {
      WORD_REGEX[lang] = new RegExp('\\b(' + keys.join('|') + ')\\b', 'g');
    }  });

  function tText(text, targetLang) {
    if (!text || typeof text !== 'string') return text;
    const l = targetLang || getLogisticsLanguage();
    if (text.includes('Change Language') || text.includes('भाषा बदल')) {
      return l === 'hi' ? 'भाषा बदलें' : (l === 'mr' ? 'भाषा बदला' : text);
    }
    if (l === 'en') {
      return translateLogisticsToEnglish(text);
    }

    let enText = text;
    if (/[\u0900-\u097F]/.test(text)) {
      enText = translateLogisticsToEnglish(text);
    }

    const trimmed = enText.trim();
    if (PHRASE_MAP[trimmed] && PHRASE_MAP[trimmed][l]) {
      return enText.replace(trimmed, PHRASE_MAP[trimmed][l]);
    }

    let result = enText;
    const sortedKeys = Object.keys(PHRASE_MAP).sort((a, b) => b.length - a.length);
    for (const key of sortedKeys) {
      if (result.includes(key) && PHRASE_MAP[key][l]) {
        result = replaceWordSafe(result, key, PHRASE_MAP[key][l]);
      }
    }

    // Single-pass word regex fallback
    const reg = WORD_REGEX[l];
    if (reg) {
      const map = WORD_MAP[l];
      result = result.replace(reg, (match) => map[match] || match);
    }

    return result;
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
    const l = lang || getLogisticsLanguage();

    const walker = document.createTreeWalker(
      rootNode,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: function (node) {
          if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
          const parent = node.parentElement;
          if (!parent) return NodeFilter.FILTER_REJECT;
          const tag = parent.tagName.toLowerCase();
          if (tag === 'script' || tag === 'style' || tag === 'svg' || tag === 'path' || tag === 'code' || tag === 'pre') {
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
      if (!currentVal || !currentVal.trim()) return;

      // Cache pristine original text directly on this specific text node
      if (textNode.__agxOrigText === undefined) {
        if (/[a-zA-Z]/.test(currentVal)) {
          textNode.__agxOrigText = currentVal;
          if (parent.childNodes.length === 1) {
            parent.setAttribute('data-agx-orig', currentVal);
          }
        } else if (parent.childNodes.length === 1 && parent.getAttribute('data-agx-orig')) {
          textNode.__agxOrigText = parent.getAttribute('data-agx-orig');
        } else {
          const exact = REVERSE_LOGISTICS_MAP[currentVal.trim().toLowerCase()];
          if (exact) {
            textNode.__agxOrigText = currentVal.replace(currentVal.trim(), exact);
          } else {
            textNode.__agxOrigText = currentVal;
          }
        }
      }

      const orig = textNode.__agxOrigText;
      if (l === 'en') {
        if (textNode.nodeValue !== orig) {
          textNode.nodeValue = orig;
        }
        return;
      }

      const translated = tText(orig, l);
      if (translated && textNode.nodeValue !== translated) {
        textNode.nodeValue = translated;
      }
    });

    // Translate Inputs & Textarea placeholders
    const placeholders = rootNode.querySelectorAll ? rootNode.querySelectorAll('input[placeholder], textarea[placeholder]') : [];
    placeholders.forEach(input => {
      let orig = input.getAttribute('data-agx-orig-ph');
      const curPh = input.getAttribute('placeholder') || '';
      if (!orig) {
        if (/[a-zA-Z]/.test(curPh)) {
          orig = curPh;
        } else {
          orig = REVERSE_LOGISTICS_MAP[curPh.trim().toLowerCase()] || curPh;
        }
        if (orig) input.setAttribute('data-agx-orig-ph', orig);
      }
      const newPh = l === 'en' ? orig : tText(orig, l);
      if (input.getAttribute('placeholder') !== newPh) {
        input.setAttribute('placeholder', newPh);
      }
    });

    // Translate Select Options
    const options = rootNode.querySelectorAll ? rootNode.querySelectorAll('select option') : [];
    options.forEach(opt => {
      let orig = opt.getAttribute('data-agx-orig-opt');
      const curOpt = opt.text || '';
      if (!orig) {
        if (/[a-zA-Z]/.test(curOpt)) {
          orig = curOpt;
        } else {
          orig = REVERSE_LOGISTICS_MAP[curOpt.trim().toLowerCase()] || curOpt;
        }
        if (orig) opt.setAttribute('data-agx-orig-opt', orig);
      }
      const newOpt = l === 'en' ? orig : tText(orig, l);
      if (opt.text !== newOpt) {
        opt.text = newOpt;
      }
    });

    // Translate Titles & Tooltips
    const titled = rootNode.querySelectorAll ? rootNode.querySelectorAll('[title]') : [];
    titled.forEach(el => {
      if (el.closest && (el.closest('#language-dropdown-menu') || el.closest('#btn-language-selector'))) return;
      let orig = el.getAttribute('data-agx-orig-title');
      const curTitle = el.getAttribute('title') || '';
      if (!orig) {
        if (/[a-zA-Z]/.test(curTitle)) {
          orig = curTitle;
        } else {
          orig = REVERSE_LOGISTICS_MAP[curTitle.trim().toLowerCase()] || curTitle;
        }
        if (orig) el.setAttribute('data-agx-orig-title', orig);
      }
      const newTitle = l === 'en' ? orig : tText(orig, l);
      if (el.getAttribute('title') !== newTitle) {
        el.setAttribute('title', newTitle);
      }
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

  function setLogisticsLanguage(lang) {
    if (!['en', 'hi', 'mr', 'ta'].includes(lang)) lang = 'en';

    try {
      localStorage.setItem('agrinex_language', lang);
      localStorage.setItem('agrinex_logistics_language', lang);
      localStorage.setItem('agrinex_farmer_language', lang);
      localStorage.setItem('agrinex_buyer_language', lang);
      localStorage.setItem('agrinex_admin_language', lang);
    } catch (e) {}

    // Update Dropdown UI & Checkmarks
    if (typeof document !== 'undefined') {
      const labelEl = document.getElementById('current-language-label');
      if (labelEl) {
        if (lang === 'en') labelEl.innerHTML = '🇬🇧 English';
        else if (lang === 'hi') labelEl.innerHTML = '🇮🇳 हिन्दी';
        else if (lang === 'mr') labelEl.innerHTML = '🚩 मराठी';
        else if (lang === 'ta') labelEl.innerHTML = '🇮🇳 தமிழ்';
      }

      ['en', 'hi', 'mr', 'ta'].forEach(l => {
        const optBtn = document.getElementById(`lang-opt-${l}`);
        if (optBtn && typeof optBtn.querySelector === 'function') {
          const check = optBtn.querySelector('.lang-check');
          if (check) check.style.display = l === lang ? 'inline' : 'none';
          optBtn.style.background = l === lang ? '#eff6ff' : 'transparent';
          optBtn.style.color = l === lang ? '#1d4ed8' : '#0f172a';
        }
      });

      const menu = document.getElementById('language-dropdown-menu');
      if (menu) menu.style.display = 'none';
    }

    // Re-render Dynamic Logistics Tables & Components
    if (typeof window.renderAllBookings === 'function') window.renderAllBookings();
    if (typeof window.renderTelemetryDashboard === 'function') window.renderTelemetryDashboard();
    if (typeof window.renderFleetStatusGrid === 'function') window.renderFleetStatusGrid();
    if (typeof window.renderWarehouseGrid === 'function') window.renderWarehouseGrid();
    if (typeof window.renderActiveTripsTable === 'function') window.renderActiveTripsTable();
    if (typeof window.renderDispatches === 'function') window.renderDispatches();
    if (typeof window.renderDriverConsole === 'function') window.renderDriverConsole();

    // Translate entire DOM tree
    if (typeof document !== 'undefined' && document.body) {
      walkAndTranslateDOM(document.body, lang);
      startDOMObserver();
    }

    // Toast feedback
    const toastMsgs = {
      en: 'Language set to English',
      hi: 'भाषा बदलकर हिन्दी कर दी गई है',
      mr: 'भाषा मराठीमध्ये बदलण्यात आली आहे'
    };
    if (typeof window.showNotificationToast === 'function') {
      window.showNotificationToast(toastMsgs[lang] || toastMsgs.en, 'success');
    }

    // Cross-tab event
    if (typeof window !== 'undefined') {
      try {
        window.dispatchEvent(new CustomEvent('agrinex_language_changed', { detail: { lang: lang } }));
      } catch (e) {}
    }

    try {
      if (typeof BroadcastChannel !== 'undefined') {
        const ch = new BroadcastChannel('agrinex_language_sync');
        ch.postMessage({ lang: lang });
        ch.close();
      }
    } catch (e) {}
  }

  function initLogisticsI18n() {
    const saved = getLogisticsLanguage();
    setLogisticsLanguage(saved);
  }

  // Real-time cross-tab synchronization listeners
  if (typeof BroadcastChannel !== 'undefined') {
    try {
      const syncCh = new BroadcastChannel('agrinex_language_sync');
      syncCh.onmessage = (e) => {
        if (e && e.data && e.data.lang && ['en', 'hi', 'mr', 'ta'].includes(e.data.lang)) {
          if (e.data.lang !== getLogisticsLanguage()) {
            setLogisticsLanguage(e.data.lang);
          }
        }
      };
    } catch (e) {}
  }

  if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
    window.addEventListener('storage', (e) => {
      if (e.key === 'agrinex_language' || e.key === 'agrinex_logistics_language') {
        if (e.newValue && ['en', 'hi', 'mr', 'ta'].includes(e.newValue)) {
          if (e.newValue !== getLogisticsLanguage()) {
            setLogisticsLanguage(e.newValue);
          }
        }
      }
    });
  }

  // Exports
  if (typeof window !== 'undefined') {
    window.AgriNexLogisticsI18n = {
      tText,
      setLogisticsLanguage,
      getLogisticsLanguage,
      toggleLanguageMenu,
      walkAndTranslateDOM
    };

    window.setLogisticsLanguage = setLogisticsLanguage;
    window.getLogisticsLanguage = getLogisticsLanguage;
    window.toggleLanguageMenu = toggleLanguageMenu;
    window.tLogistics = tText;
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
      tText,
      setLogisticsLanguage,
      getLogisticsLanguage,
      walkAndTranslateDOM
    };
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initLogisticsI18n);
    } else {
      initLogisticsI18n();
    }
  }
})();
