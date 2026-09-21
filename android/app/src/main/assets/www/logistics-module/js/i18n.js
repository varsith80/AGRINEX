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
  const PHRASE_MAP = {    "AgriNex - Logistics Dashboard | Direct Trade · Better Tomorrow": { hi: "एग्रीनेक्स - लॉजिस्टिक्स डैशबोर्ड | सीधा व्यापार · बेहतर कल", mr: "अ‍ॅग्रीनेक्स - वाहतूक डॅशबोर्ड | थेट व्यापार · चांगले भविष्य" },
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

  function tText(text, targetLang) {
    if (!text || typeof text !== 'string') return text;
    const l = targetLang || getLogisticsLanguage();
    if (l === 'en') {
      return translateLogisticsToEnglish(text);
    }

    let enText = text;
    if (/[\u0900-\u097F]/.test(text)) {
      enText = translateLogisticsToEnglish(text);
    }

    const trimmed = enText.trim();

    // 1. Direct whole phrase lookup
    if (PHRASE_MAP[trimmed] && PHRASE_MAP[trimmed][l]) {
      const translated = PHRASE_MAP[trimmed][l];
      return enText.replace(trimmed, translated);
    }

    let result = enText;

    // 2. Safe substitution for matching phrases (longest first with word boundaries for single words)
    const sortedKeys = Object.keys(PHRASE_MAP).sort((a, b) => b.length - a.length);
    for (const key of sortedKeys) {
      if (result.includes(key) && PHRASE_MAP[key][l]) {
        result = replaceWordSafe(result, key, PHRASE_MAP[key][l]);
      }
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
