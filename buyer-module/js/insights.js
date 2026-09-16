/**
 * AgriNex Buyer Module - Market Insights & Institutional Intelligence Engine
 * Comprehensive APMC Mandi Price Analytics, Predictive Forecasting & Arbitrage Tracking (Maharashtra)
 */

(function () {
  'use strict';

  // Comprehensive Maharashtra Commodity Analytics & Trend Matrix (All 28 Crops)
  const COMMODITY_INSIGHTS = {
    onion: {
      key: "onion",
      name: "Red Onion (Lasalgaon Garwa)",
      emoji: "🧅",
      hub: "Lasalgaon APMC (Nashik)",
      currentModalQt: 1850,
      currentMinQt: 1400,
      currentMaxQt: 2150,
      farmGateQt: 1800,
      terminalVashiQt: 2150,
      arbitragePct: 16.3,
      trendPct: "+4.8%",
      trendDir: "up",
      arrivalsQt: 6850,
      arrivalsChange: "+12.4% vs last week",
      sentiment: "Bullish (Export Demand Peak)",
      sentimentScore: 82,
      recommendation: "High institutional procurement velocity. Lock 35% advance escrow on Lasalgaon Grade A lots before post-monsoon export quota surge.",
      districtHubs: [
        {
                "district": "Nashik",
                "mandi": "Lasalgaon APMC",
                "modalQt": 1850,
                "minQt": 1400,
                "maxQt": 2150,
                "arrivalsQt": 6850,
                "factor": 1
        },
        {
                "district": "Ahmednagar",
                "mandi": "Rahuri APMC",
                "modalQt": 1820,
                "minQt": 1380,
                "maxQt": 2100,
                "arrivalsQt": 4200,
                "factor": 0.984
        },
        {
                "district": "Solapur",
                "mandi": "Solapur APMC Yard",
                "modalQt": 1790,
                "minQt": 1350,
                "maxQt": 2080,
                "arrivalsQt": 5100,
                "factor": 0.967
        },
        {
                "district": "Pune",
                "mandi": "Manchar APMC",
                "modalQt": 1860,
                "minQt": 1420,
                "maxQt": 2160,
                "arrivalsQt": 3600,
                "factor": 1.005
        },
        {
                "district": "Dhule",
                "mandi": "Dhule Market Yard",
                "modalQt": 1810,
                "minQt": 1360,
                "maxQt": 2090,
                "arrivalsQt": 2800,
                "factor": 0.978
        },
        {
                "district": "Jalgaon",
                "mandi": "Jalgaon Red Onion APMC",
                "modalQt": 1817,
                "minQt": 1375,
                "maxQt": 2111,
                "arrivalsQt": 4200,
                "factor": 0.982
        },
        {
                "district": "Latur",
                "mandi": "Latur Red Onion APMC",
                "modalQt": 1841,
                "minQt": 1393,
                "maxQt": 2139,
                "arrivalsQt": 6400,
                "factor": 0.995
        },
        {
                "district": "Nagpur",
                "mandi": "Nagpur Red Onion APMC",
                "modalQt": 1883,
                "minQt": 1425,
                "maxQt": 2189,
                "arrivalsQt": 4900,
                "factor": 1.018
        },
        {
                "district": "Sangli",
                "mandi": "Sangli Red Onion APMC",
                "modalQt": 1835,
                "minQt": 1389,
                "maxQt": 2133,
                "arrivalsQt": 3600,
                "factor": 0.992
        },
        {
                "district": "Amravati",
                "mandi": "Amravati Red Onion APMC",
                "modalQt": 1839,
                "minQt": 1392,
                "maxQt": 2137,
                "arrivalsQt": 3800,
                "factor": 0.994
        },
        {
                "district": "Akola",
                "mandi": "Akola Red Onion APMC",
                "modalQt": 1833,
                "minQt": 1387,
                "maxQt": 2131,
                "arrivalsQt": 4100,
                "factor": 0.991
        },
        {
                "district": "Nanded",
                "mandi": "Nanded Red Onion APMC",
                "modalQt": 1844,
                "minQt": 1396,
                "maxQt": 2144,
                "arrivalsQt": 3200,
                "factor": 0.997
        },
        {
                "district": "Satara",
                "mandi": "Satara Red Onion APMC",
                "modalQt": 1872,
                "minQt": 1417,
                "maxQt": 2176,
                "arrivalsQt": 2800,
                "factor": 1.012
        },
        {
                "district": "Kolhapur",
                "mandi": "Kolhapur Red Onion APMC",
                "modalQt": 1891,
                "minQt": 1431,
                "maxQt": 2197,
                "arrivalsQt": 3300,
                "factor": 1.022
        },
        {
                "district": "Nandurbar",
                "mandi": "Nandurbar Red Onion APMC",
                "modalQt": 1809,
                "minQt": 1369,
                "maxQt": 2103,
                "arrivalsQt": 2900,
                "factor": 0.978
        },
        {
                "district": "Beed",
                "mandi": "Beed Red Onion APMC",
                "modalQt": 1824,
                "minQt": 1380,
                "maxQt": 2120,
                "arrivalsQt": 2400,
                "factor": 0.986
        },
        {
                "district": "Washim",
                "mandi": "Washim Red Onion APMC",
                "modalQt": 1837,
                "minQt": 1390,
                "maxQt": 2135,
                "arrivalsQt": 2300,
                "factor": 0.993
        },
        {
                "district": "Palghar",
                "mandi": "Palghar Red Onion APMC",
                "modalQt": 1878,
                "minQt": 1421,
                "maxQt": 2182,
                "arrivalsQt": 2100,
                "factor": 1.015
        },
        {
                "district": "Dharashiv",
                "mandi": "Dharashiv Red Onion APMC",
                "modalQt": 1830,
                "minQt": 1385,
                "maxQt": 2126,
                "arrivalsQt": 2200,
                "factor": 0.989
        },
        {
                "district": "Chhatrapati Sambhajinagar",
                "mandi": "Chhatrapati Sambhajinagar Red Onion APMC",
                "modalQt": 1861,
                "minQt": 1408,
                "maxQt": 2163,
                "arrivalsQt": 3400,
                "factor": 1.006
        },
        {
                "district": "Hingoli",
                "mandi": "Hingoli Red Onion APMC",
                "modalQt": 1832,
                "minQt": 1386,
                "maxQt": 2129,
                "arrivalsQt": 1900,
                "factor": 0.99
        },
        {
                "district": "Wardha",
                "mandi": "Wardha Red Onion APMC",
                "modalQt": 1843,
                "minQt": 1394,
                "maxQt": 2141,
                "arrivalsQt": 2400,
                "factor": 0.996
        },
        {
                "district": "Ratnagiri",
                "mandi": "Ratnagiri Red Onion APMC",
                "modalQt": 1933,
                "minQt": 1463,
                "maxQt": 2247,
                "arrivalsQt": 1800,
                "factor": 1.045
        },
        {
                "district": "Sindhudurg",
                "mandi": "Sindhudurg Red Onion APMC",
                "modalQt": 1939,
                "minQt": 1467,
                "maxQt": 2253,
                "arrivalsQt": 1600,
                "factor": 1.048
        },
        {
                "district": "Raigad",
                "mandi": "Raigad Red Onion APMC",
                "modalQt": 1915,
                "minQt": 1449,
                "maxQt": 2225,
                "arrivalsQt": 2700,
                "factor": 1.035
        },
        {
                "district": "Yavatmal",
                "mandi": "Yavatmal Red Onion APMC",
                "modalQt": 1826,
                "minQt": 1382,
                "maxQt": 2122,
                "arrivalsQt": 3300,
                "factor": 0.987
        },
        {
                "district": "Buldhana",
                "mandi": "Buldhana Red Onion APMC",
                "modalQt": 1837,
                "minQt": 1390,
                "maxQt": 2135,
                "arrivalsQt": 3100,
                "factor": 0.993
        },
        {
                "district": "Bhandara",
                "mandi": "Bhandara Red Onion APMC",
                "modalQt": 1820,
                "minQt": 1378,
                "maxQt": 2116,
                "arrivalsQt": 2600,
                "factor": 0.984
        },
        {
                "district": "Jalna",
                "mandi": "Jalna Red Onion APMC",
                "modalQt": 1843,
                "minQt": 1394,
                "maxQt": 2141,
                "arrivalsQt": 3200,
                "factor": 0.996
        },
        {
                "district": "Parbhani",
                "mandi": "Parbhani Red Onion APMC",
                "modalQt": 1833,
                "minQt": 1387,
                "maxQt": 2131,
                "arrivalsQt": 2500,
                "factor": 0.991
        }
],
      history: {
        "7D": {
                "labels": [
                        "08 Sep",
                        "09 Sep",
                        "10 Sep",
                        "11 Sep",
                        "12 Sep",
                        "13 Sep",
                        "14 Sep (Today)",
                        "16 Sep (AI)",
                        "18 Sep (AI)",
                        "20 Sep (AI)"
                ],
                "historical": [
                        1721,
                        1758,
                        1776,
                        1813,
                        1832,
                        1841,
                        1850,
                        null,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        1850,
                        1887,
                        1943,
                        1980
                ],
                "mandiMin": [
                        1330,
                        1344,
                        1358,
                        1372,
                        1386,
                        1400,
                        1400,
                        null,
                        null,
                        null
                ],
                "mandiMax": [
                        2000,
                        2043,
                        2086,
                        2107,
                        2129,
                        2150,
                        2150,
                        null,
                        null,
                        null
                ]
        },
        "1M": {
                "labels": [
                        "15 Aug",
                        "22 Aug",
                        "29 Aug",
                        "05 Sep",
                        "12 Sep",
                        "14 Sep (Today)",
                        "21 Sep (AI)",
                        "28 Sep (AI)"
                ],
                "historical": [
                        1573,
                        1628,
                        1684,
                        1758,
                        1813,
                        1850,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        1850,
                        1924,
                        1998
                ],
                "mandiMin": [
                        1190,
                        1232,
                        1288,
                        1344,
                        1400,
                        1400,
                        null,
                        null
                ],
                "mandiMax": [
                        1828,
                        1892,
                        1978,
                        2064,
                        2150,
                        2150,
                        null,
                        null
                ]
        },
        "3M": {
                "labels": [
                        "Jun 26",
                        "Jul 26",
                        "Aug 26",
                        "Sep 26 (Now)",
                        "Oct 26 (AI)",
                        "Nov 26 (AI)"
                ],
                "historical": [
                        1480,
                        1591,
                        1702,
                        1850,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        1850,
                        1961,
                        2072
                ],
                "mandiMin": [
                        1120,
                        1204,
                        1288,
                        1400,
                        null,
                        null
                ],
                "mandiMax": [
                        1720,
                        1849,
                        1978,
                        2150,
                        null,
                        null
                ]
        },
        "1Y": {
                "labels": [
                        "Oct 25",
                        "Dec 25",
                        "Feb 26",
                        "Apr 26",
                        "Jun 26",
                        "Aug 26",
                        "Sep 26 (Now)"
                ],
                "historical": [
                        1943,
                        2220,
                        1573,
                        1388,
                        1480,
                        1665,
                        1850
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        1850
                ],
                "mandiMin": [
                        1470,
                        1680,
                        1190,
                        1050,
                        1120,
                        1260,
                        1400
                ],
                "mandiMax": [
                        2258,
                        2580,
                        1828,
                        1613,
                        1720,
                        1935,
                        2150
                ]
        }
}
    },
    tomato: {
      key: "tomato",
      name: "Hybrid Tomato (Narayangaon / Junnar)",
      emoji: "🍅",
      hub: "Narayangaon APMC (Pune)",
      currentModalQt: 1200,
      currentMinQt: 900,
      currentMaxQt: 1450,
      farmGateQt: 1200,
      terminalVashiQt: 1450,
      arbitragePct: 17.2,
      trendPct: "-3.2%",
      trendDir: "down",
      arrivalsQt: 5400,
      arrivalsChange: "+28.0% Heavy Inflow",
      sentiment: "Buyer's Market (Excess Supply)",
      sentimentScore: 64,
      recommendation: "Peak harvest arrivals from Junnar and Otur clusters. High bargaining power for bulk processing and retail packing. Counter-bid at ₹ 11.50-11.80/kg.",
      districtHubs: [
        {
                "district": "Pune",
                "mandi": "Narayangaon APMC",
                "modalQt": 1200,
                "minQt": 900,
                "maxQt": 1450,
                "arrivalsQt": 5400,
                "factor": 1
        },
        {
                "district": "Nashik",
                "mandi": "Pimpalgaon APMC",
                "modalQt": 1180,
                "minQt": 880,
                "maxQt": 1420,
                "arrivalsQt": 3800,
                "factor": 0.983
        },
        {
                "district": "Satara",
                "mandi": "Karad APMC",
                "modalQt": 1220,
                "minQt": 920,
                "maxQt": 1480,
                "arrivalsQt": 2400,
                "factor": 1.016
        },
        {
                "district": "Ahmednagar",
                "mandi": "Sangamner APMC",
                "modalQt": 1190,
                "minQt": 890,
                "maxQt": 1430,
                "arrivalsQt": 3100,
                "factor": 0.991
        },
        {
                "district": "Jalgaon",
                "mandi": "Jalgaon Hybrid Tomato APMC",
                "modalQt": 1178,
                "minQt": 884,
                "maxQt": 1424,
                "arrivalsQt": 4200,
                "factor": 0.982
        },
        {
                "district": "Latur",
                "mandi": "Latur Hybrid Tomato APMC",
                "modalQt": 1194,
                "minQt": 896,
                "maxQt": 1443,
                "arrivalsQt": 6400,
                "factor": 0.995
        },
        {
                "district": "Nagpur",
                "mandi": "Nagpur Hybrid Tomato APMC",
                "modalQt": 1222,
                "minQt": 916,
                "maxQt": 1476,
                "arrivalsQt": 4900,
                "factor": 1.018
        },
        {
                "district": "Sangli",
                "mandi": "Sangli Hybrid Tomato APMC",
                "modalQt": 1190,
                "minQt": 893,
                "maxQt": 1438,
                "arrivalsQt": 3600,
                "factor": 0.992
        },
        {
                "district": "Solapur",
                "mandi": "Solapur Hybrid Tomato APMC",
                "modalQt": 1207,
                "minQt": 905,
                "maxQt": 1459,
                "arrivalsQt": 4500,
                "factor": 1.006
        },
        {
                "district": "Amravati",
                "mandi": "Amravati Hybrid Tomato APMC",
                "modalQt": 1193,
                "minQt": 895,
                "maxQt": 1441,
                "arrivalsQt": 3800,
                "factor": 0.994
        },
        {
                "district": "Akola",
                "mandi": "Akola Hybrid Tomato APMC",
                "modalQt": 1189,
                "minQt": 892,
                "maxQt": 1437,
                "arrivalsQt": 4100,
                "factor": 0.991
        },
        {
                "district": "Nanded",
                "mandi": "Nanded Hybrid Tomato APMC",
                "modalQt": 1196,
                "minQt": 897,
                "maxQt": 1446,
                "arrivalsQt": 3200,
                "factor": 0.997
        },
        {
                "district": "Kolhapur",
                "mandi": "Kolhapur Hybrid Tomato APMC",
                "modalQt": 1226,
                "minQt": 920,
                "maxQt": 1482,
                "arrivalsQt": 3300,
                "factor": 1.022
        },
        {
                "district": "Dhule",
                "mandi": "Dhule Hybrid Tomato APMC",
                "modalQt": 1177,
                "minQt": 883,
                "maxQt": 1422,
                "arrivalsQt": 3500,
                "factor": 0.981
        },
        {
                "district": "Nandurbar",
                "mandi": "Nandurbar Hybrid Tomato APMC",
                "modalQt": 1174,
                "minQt": 880,
                "maxQt": 1418,
                "arrivalsQt": 2900,
                "factor": 0.978
        },
        {
                "district": "Beed",
                "mandi": "Beed Hybrid Tomato APMC",
                "modalQt": 1183,
                "minQt": 887,
                "maxQt": 1430,
                "arrivalsQt": 2400,
                "factor": 0.986
        },
        {
                "district": "Washim",
                "mandi": "Washim Hybrid Tomato APMC",
                "modalQt": 1192,
                "minQt": 894,
                "maxQt": 1440,
                "arrivalsQt": 2300,
                "factor": 0.993
        },
        {
                "district": "Palghar",
                "mandi": "Palghar Hybrid Tomato APMC",
                "modalQt": 1218,
                "minQt": 913,
                "maxQt": 1472,
                "arrivalsQt": 2100,
                "factor": 1.015
        },
        {
                "district": "Dharashiv",
                "mandi": "Dharashiv Hybrid Tomato APMC",
                "modalQt": 1187,
                "minQt": 890,
                "maxQt": 1434,
                "arrivalsQt": 2200,
                "factor": 0.989
        },
        {
                "district": "Chhatrapati Sambhajinagar",
                "mandi": "Chhatrapati Sambhajinagar Hybrid Tomato APMC",
                "modalQt": 1207,
                "minQt": 905,
                "maxQt": 1459,
                "arrivalsQt": 3400,
                "factor": 1.006
        },
        {
                "district": "Hingoli",
                "mandi": "Hingoli Hybrid Tomato APMC",
                "modalQt": 1188,
                "minQt": 891,
                "maxQt": 1436,
                "arrivalsQt": 1900,
                "factor": 0.99
        },
        {
                "district": "Wardha",
                "mandi": "Wardha Hybrid Tomato APMC",
                "modalQt": 1195,
                "minQt": 896,
                "maxQt": 1444,
                "arrivalsQt": 2400,
                "factor": 0.996
        },
        {
                "district": "Ratnagiri",
                "mandi": "Ratnagiri Hybrid Tomato APMC",
                "modalQt": 1254,
                "minQt": 940,
                "maxQt": 1515,
                "arrivalsQt": 1800,
                "factor": 1.045
        },
        {
                "district": "Sindhudurg",
                "mandi": "Sindhudurg Hybrid Tomato APMC",
                "modalQt": 1258,
                "minQt": 943,
                "maxQt": 1520,
                "arrivalsQt": 1600,
                "factor": 1.048
        },
        {
                "district": "Raigad",
                "mandi": "Raigad Hybrid Tomato APMC",
                "modalQt": 1242,
                "minQt": 931,
                "maxQt": 1501,
                "arrivalsQt": 2700,
                "factor": 1.035
        },
        {
                "district": "Yavatmal",
                "mandi": "Yavatmal Hybrid Tomato APMC",
                "modalQt": 1184,
                "minQt": 888,
                "maxQt": 1431,
                "arrivalsQt": 3300,
                "factor": 0.987
        },
        {
                "district": "Buldhana",
                "mandi": "Buldhana Hybrid Tomato APMC",
                "modalQt": 1192,
                "minQt": 894,
                "maxQt": 1440,
                "arrivalsQt": 3100,
                "factor": 0.993
        },
        {
                "district": "Bhandara",
                "mandi": "Bhandara Hybrid Tomato APMC",
                "modalQt": 1181,
                "minQt": 886,
                "maxQt": 1427,
                "arrivalsQt": 2600,
                "factor": 0.984
        },
        {
                "district": "Jalna",
                "mandi": "Jalna Hybrid Tomato APMC",
                "modalQt": 1195,
                "minQt": 896,
                "maxQt": 1444,
                "arrivalsQt": 3200,
                "factor": 0.996
        },
        {
                "district": "Parbhani",
                "mandi": "Parbhani Hybrid Tomato APMC",
                "modalQt": 1189,
                "minQt": 892,
                "maxQt": 1437,
                "arrivalsQt": 2500,
                "factor": 0.991
        }
],
      history: {
        "7D": {
                "labels": [
                        "08 Sep",
                        "09 Sep",
                        "10 Sep",
                        "11 Sep",
                        "12 Sep",
                        "13 Sep",
                        "14 Sep (Today)",
                        "16 Sep (AI)",
                        "18 Sep (AI)",
                        "20 Sep (AI)"
                ],
                "historical": [
                        1116,
                        1140,
                        1152,
                        1176,
                        1188,
                        1194,
                        1200,
                        null,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        1200,
                        1224,
                        1260,
                        1284
                ],
                "mandiMin": [
                        855,
                        864,
                        873,
                        882,
                        891,
                        900,
                        900,
                        null,
                        null,
                        null
                ],
                "mandiMax": [
                        1349,
                        1378,
                        1407,
                        1421,
                        1436,
                        1450,
                        1450,
                        null,
                        null,
                        null
                ]
        },
        "1M": {
                "labels": [
                        "15 Aug",
                        "22 Aug",
                        "29 Aug",
                        "05 Sep",
                        "12 Sep",
                        "14 Sep (Today)",
                        "21 Sep (AI)",
                        "28 Sep (AI)"
                ],
                "historical": [
                        1020,
                        1056,
                        1092,
                        1140,
                        1176,
                        1200,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        1200,
                        1248,
                        1296
                ],
                "mandiMin": [
                        765,
                        792,
                        828,
                        864,
                        900,
                        900,
                        null,
                        null
                ],
                "mandiMax": [
                        1233,
                        1276,
                        1334,
                        1392,
                        1450,
                        1450,
                        null,
                        null
                ]
        },
        "3M": {
                "labels": [
                        "Jun 26",
                        "Jul 26",
                        "Aug 26",
                        "Sep 26 (Now)",
                        "Oct 26 (AI)",
                        "Nov 26 (AI)"
                ],
                "historical": [
                        960,
                        1032,
                        1104,
                        1200,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        1200,
                        1272,
                        1344
                ],
                "mandiMin": [
                        720,
                        774,
                        828,
                        900,
                        null,
                        null
                ],
                "mandiMax": [
                        1160,
                        1247,
                        1334,
                        1450,
                        null,
                        null
                ]
        },
        "1Y": {
                "labels": [
                        "Oct 25",
                        "Dec 25",
                        "Feb 26",
                        "Apr 26",
                        "Jun 26",
                        "Aug 26",
                        "Sep 26 (Now)"
                ],
                "historical": [
                        1260,
                        1440,
                        1020,
                        900,
                        960,
                        1080,
                        1200
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        1200
                ],
                "mandiMin": [
                        945,
                        1080,
                        765,
                        675,
                        720,
                        810,
                        900
                ],
                "mandiMax": [
                        1523,
                        1740,
                        1233,
                        1088,
                        1160,
                        1305,
                        1450
                ]
        }
}
    },
    banana: {
      key: "banana",
      name: "Grand Naine Banana (Jalgaon G9)",
      emoji: "🍌",
      hub: "Raver & Jalgaon APMC",
      currentModalQt: 1400,
      currentMinQt: 1100,
      currentMaxQt: 1650,
      farmGateQt: 1400,
      terminalVashiQt: 1680,
      arbitragePct: 16.7,
      trendPct: "+2.1%",
      trendDir: "up",
      arrivalsQt: 4200,
      arrivalsChange: "+6.5% Consistent",
      sentiment: "Steady Institutional Off-take",
      sentimentScore: 76,
      recommendation: "Export and supermarket grade bunches available with calibrated ripening reefer fleet. Fast haulage to Mumbai/Pune recommended.",
      districtHubs: [
        {
                "district": "Jalgaon",
                "mandi": "Raver APMC Yard",
                "modalQt": 1400,
                "minQt": 1100,
                "maxQt": 1650,
                "arrivalsQt": 4200,
                "factor": 1
        },
        {
                "district": "Nanded",
                "mandi": "Ardhapur APMC",
                "modalQt": 1380,
                "minQt": 1080,
                "maxQt": 1620,
                "arrivalsQt": 2600,
                "factor": 0.985
        },
        {
                "district": "Solapur",
                "mandi": "Pandharpur APMC",
                "modalQt": 1420,
                "minQt": 1120,
                "maxQt": 1680,
                "arrivalsQt": 3100,
                "factor": 1.014
        },
        {
                "district": "Pune",
                "mandi": "Indapur APMC",
                "modalQt": 1450,
                "minQt": 1150,
                "maxQt": 1700,
                "arrivalsQt": 1900,
                "factor": 1.035
        },
        {
                "district": "Nashik",
                "mandi": "Nashik Grand Naine Banana APMC",
                "modalQt": 1400,
                "minQt": 1100,
                "maxQt": 1650,
                "arrivalsQt": 6850,
                "factor": 1
        },
        {
                "district": "Latur",
                "mandi": "Latur Grand Naine Banana APMC",
                "modalQt": 1393,
                "minQt": 1095,
                "maxQt": 1642,
                "arrivalsQt": 6400,
                "factor": 0.995
        },
        {
                "district": "Nagpur",
                "mandi": "Nagpur Grand Naine Banana APMC",
                "modalQt": 1425,
                "minQt": 1120,
                "maxQt": 1680,
                "arrivalsQt": 4900,
                "factor": 1.018
        },
        {
                "district": "Sangli",
                "mandi": "Sangli Grand Naine Banana APMC",
                "modalQt": 1389,
                "minQt": 1091,
                "maxQt": 1637,
                "arrivalsQt": 3600,
                "factor": 0.992
        },
        {
                "district": "Ahmednagar",
                "mandi": "Ahmednagar Grand Naine Banana APMC",
                "modalQt": 1382,
                "minQt": 1086,
                "maxQt": 1629,
                "arrivalsQt": 5100,
                "factor": 0.987
        },
        {
                "district": "Amravati",
                "mandi": "Amravati Grand Naine Banana APMC",
                "modalQt": 1392,
                "minQt": 1093,
                "maxQt": 1640,
                "arrivalsQt": 3800,
                "factor": 0.994
        },
        {
                "district": "Akola",
                "mandi": "Akola Grand Naine Banana APMC",
                "modalQt": 1387,
                "minQt": 1090,
                "maxQt": 1635,
                "arrivalsQt": 4100,
                "factor": 0.991
        },
        {
                "district": "Satara",
                "mandi": "Satara Grand Naine Banana APMC",
                "modalQt": 1417,
                "minQt": 1113,
                "maxQt": 1670,
                "arrivalsQt": 2800,
                "factor": 1.012
        },
        {
                "district": "Kolhapur",
                "mandi": "Kolhapur Grand Naine Banana APMC",
                "modalQt": 1431,
                "minQt": 1124,
                "maxQt": 1686,
                "arrivalsQt": 3300,
                "factor": 1.022
        },
        {
                "district": "Dhule",
                "mandi": "Dhule Grand Naine Banana APMC",
                "modalQt": 1373,
                "minQt": 1079,
                "maxQt": 1619,
                "arrivalsQt": 3500,
                "factor": 0.981
        },
        {
                "district": "Nandurbar",
                "mandi": "Nandurbar Grand Naine Banana APMC",
                "modalQt": 1369,
                "minQt": 1076,
                "maxQt": 1614,
                "arrivalsQt": 2900,
                "factor": 0.978
        },
        {
                "district": "Beed",
                "mandi": "Beed Grand Naine Banana APMC",
                "modalQt": 1380,
                "minQt": 1085,
                "maxQt": 1627,
                "arrivalsQt": 2400,
                "factor": 0.986
        },
        {
                "district": "Washim",
                "mandi": "Washim Grand Naine Banana APMC",
                "modalQt": 1390,
                "minQt": 1092,
                "maxQt": 1638,
                "arrivalsQt": 2300,
                "factor": 0.993
        },
        {
                "district": "Palghar",
                "mandi": "Palghar Grand Naine Banana APMC",
                "modalQt": 1421,
                "minQt": 1117,
                "maxQt": 1675,
                "arrivalsQt": 2100,
                "factor": 1.015
        },
        {
                "district": "Dharashiv",
                "mandi": "Dharashiv Grand Naine Banana APMC",
                "modalQt": 1385,
                "minQt": 1088,
                "maxQt": 1632,
                "arrivalsQt": 2200,
                "factor": 0.989
        },
        {
                "district": "Chhatrapati Sambhajinagar",
                "mandi": "Chhatrapati Sambhajinagar Grand Naine Banana APMC",
                "modalQt": 1408,
                "minQt": 1107,
                "maxQt": 1660,
                "arrivalsQt": 3400,
                "factor": 1.006
        },
        {
                "district": "Hingoli",
                "mandi": "Hingoli Grand Naine Banana APMC",
                "modalQt": 1386,
                "minQt": 1089,
                "maxQt": 1634,
                "arrivalsQt": 1900,
                "factor": 0.99
        },
        {
                "district": "Wardha",
                "mandi": "Wardha Grand Naine Banana APMC",
                "modalQt": 1394,
                "minQt": 1096,
                "maxQt": 1643,
                "arrivalsQt": 2400,
                "factor": 0.996
        },
        {
                "district": "Ratnagiri",
                "mandi": "Ratnagiri Grand Naine Banana APMC",
                "modalQt": 1463,
                "minQt": 1150,
                "maxQt": 1724,
                "arrivalsQt": 1800,
                "factor": 1.045
        },
        {
                "district": "Sindhudurg",
                "mandi": "Sindhudurg Grand Naine Banana APMC",
                "modalQt": 1467,
                "minQt": 1153,
                "maxQt": 1729,
                "arrivalsQt": 1600,
                "factor": 1.048
        },
        {
                "district": "Raigad",
                "mandi": "Raigad Grand Naine Banana APMC",
                "modalQt": 1449,
                "minQt": 1139,
                "maxQt": 1708,
                "arrivalsQt": 2700,
                "factor": 1.035
        },
        {
                "district": "Yavatmal",
                "mandi": "Yavatmal Grand Naine Banana APMC",
                "modalQt": 1382,
                "minQt": 1086,
                "maxQt": 1629,
                "arrivalsQt": 3300,
                "factor": 0.987
        },
        {
                "district": "Buldhana",
                "mandi": "Buldhana Grand Naine Banana APMC",
                "modalQt": 1390,
                "minQt": 1092,
                "maxQt": 1638,
                "arrivalsQt": 3100,
                "factor": 0.993
        },
        {
                "district": "Bhandara",
                "mandi": "Bhandara Grand Naine Banana APMC",
                "modalQt": 1378,
                "minQt": 1082,
                "maxQt": 1624,
                "arrivalsQt": 2600,
                "factor": 0.984
        },
        {
                "district": "Jalna",
                "mandi": "Jalna Grand Naine Banana APMC",
                "modalQt": 1394,
                "minQt": 1096,
                "maxQt": 1643,
                "arrivalsQt": 3200,
                "factor": 0.996
        },
        {
                "district": "Parbhani",
                "mandi": "Parbhani Grand Naine Banana APMC",
                "modalQt": 1387,
                "minQt": 1090,
                "maxQt": 1635,
                "arrivalsQt": 2500,
                "factor": 0.991
        }
],
      history: {
        "7D": {
                "labels": [
                        "08 Sep",
                        "09 Sep",
                        "10 Sep",
                        "11 Sep",
                        "12 Sep",
                        "13 Sep",
                        "14 Sep (Today)",
                        "16 Sep (AI)",
                        "18 Sep (AI)",
                        "20 Sep (AI)"
                ],
                "historical": [
                        1302,
                        1330,
                        1344,
                        1372,
                        1386,
                        1393,
                        1400,
                        null,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        1400,
                        1428,
                        1470,
                        1498
                ],
                "mandiMin": [
                        1045,
                        1056,
                        1067,
                        1078,
                        1089,
                        1100,
                        1100,
                        null,
                        null,
                        null
                ],
                "mandiMax": [
                        1535,
                        1568,
                        1601,
                        1617,
                        1634,
                        1650,
                        1650,
                        null,
                        null,
                        null
                ]
        },
        "1M": {
                "labels": [
                        "15 Aug",
                        "22 Aug",
                        "29 Aug",
                        "05 Sep",
                        "12 Sep",
                        "14 Sep (Today)",
                        "21 Sep (AI)",
                        "28 Sep (AI)"
                ],
                "historical": [
                        1190,
                        1232,
                        1274,
                        1330,
                        1372,
                        1400,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        1400,
                        1456,
                        1512
                ],
                "mandiMin": [
                        935,
                        968,
                        1012,
                        1056,
                        1100,
                        1100,
                        null,
                        null
                ],
                "mandiMax": [
                        1403,
                        1452,
                        1518,
                        1584,
                        1650,
                        1650,
                        null,
                        null
                ]
        },
        "3M": {
                "labels": [
                        "Jun 26",
                        "Jul 26",
                        "Aug 26",
                        "Sep 26 (Now)",
                        "Oct 26 (AI)",
                        "Nov 26 (AI)"
                ],
                "historical": [
                        1120,
                        1204,
                        1288,
                        1400,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        1400,
                        1484,
                        1568
                ],
                "mandiMin": [
                        880,
                        946,
                        1012,
                        1100,
                        null,
                        null
                ],
                "mandiMax": [
                        1320,
                        1419,
                        1518,
                        1650,
                        null,
                        null
                ]
        },
        "1Y": {
                "labels": [
                        "Oct 25",
                        "Dec 25",
                        "Feb 26",
                        "Apr 26",
                        "Jun 26",
                        "Aug 26",
                        "Sep 26 (Now)"
                ],
                "historical": [
                        1470,
                        1680,
                        1190,
                        1050,
                        1120,
                        1260,
                        1400
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        1400
                ],
                "mandiMin": [
                        1155,
                        1320,
                        935,
                        825,
                        880,
                        990,
                        1100
                ],
                "mandiMax": [
                        1733,
                        1980,
                        1403,
                        1238,
                        1320,
                        1485,
                        1650
                ]
        }
}
    },
    soybean: {
      key: "soybean",
      name: "Yellow Soybean (Latur JS 335)",
      emoji: "🌱",
      hub: "Latur APMC Mega Silos",
      currentModalQt: 4600,
      currentMinQt: 4100,
      currentMaxQt: 4950,
      farmGateQt: 4550,
      terminalVashiQt: 5200,
      arbitragePct: 12.5,
      trendPct: "+1.8%",
      trendDir: "up",
      arrivalsQt: 9400,
      arrivalsChange: "+15.0% Post-Monsoon",
      sentiment: "Bullish Crusher Demand",
      sentimentScore: 79,
      recommendation: "High solvent extraction demand. Procure moisture-certified Grade A lots directly from Latur and Nanded silos with quality lab reports.",
      districtHubs: [
        {
                "district": "Latur",
                "mandi": "Latur Mega Silos APMC",
                "modalQt": 4600,
                "minQt": 4100,
                "maxQt": 4950,
                "arrivalsQt": 9400,
                "factor": 1
        },
        {
                "district": "Nanded",
                "mandi": "Nanded APMC Yard",
                "modalQt": 4580,
                "minQt": 4080,
                "maxQt": 4920,
                "arrivalsQt": 5200,
                "factor": 0.995
        },
        {
                "district": "Washim",
                "mandi": "Washim APMC",
                "modalQt": 4620,
                "minQt": 4120,
                "maxQt": 4980,
                "arrivalsQt": 4100,
                "factor": 1.004
        },
        {
                "district": "Akola",
                "mandi": "Akola APMC",
                "modalQt": 4590,
                "minQt": 4090,
                "maxQt": 4940,
                "arrivalsQt": 4800,
                "factor": 0.997
        },
        {
                "district": "Amravati",
                "mandi": "Amravati APMC Yard",
                "modalQt": 4610,
                "minQt": 4110,
                "maxQt": 4960,
                "arrivalsQt": 5600,
                "factor": 1.002
        },
        {
                "district": "Nashik",
                "mandi": "Nashik Yellow Soybean APMC",
                "modalQt": 4600,
                "minQt": 4100,
                "maxQt": 4950,
                "arrivalsQt": 6850,
                "factor": 1
        },
        {
                "district": "Pune",
                "mandi": "Pune Yellow Soybean APMC",
                "modalQt": 4715,
                "minQt": 4203,
                "maxQt": 5074,
                "arrivalsQt": 5400,
                "factor": 1.025
        },
        {
                "district": "Jalgaon",
                "mandi": "Jalgaon Yellow Soybean APMC",
                "modalQt": 4517,
                "minQt": 4026,
                "maxQt": 4861,
                "arrivalsQt": 4200,
                "factor": 0.982
        },
        {
                "district": "Nagpur",
                "mandi": "Nagpur Yellow Soybean APMC",
                "modalQt": 4683,
                "minQt": 4174,
                "maxQt": 5039,
                "arrivalsQt": 4900,
                "factor": 1.018
        },
        {
                "district": "Sangli",
                "mandi": "Sangli Yellow Soybean APMC",
                "modalQt": 4563,
                "minQt": 4067,
                "maxQt": 4910,
                "arrivalsQt": 3600,
                "factor": 0.992
        },
        {
                "district": "Solapur",
                "mandi": "Solapur Yellow Soybean APMC",
                "modalQt": 4628,
                "minQt": 4125,
                "maxQt": 4980,
                "arrivalsQt": 4500,
                "factor": 1.006
        },
        {
                "district": "Ahmednagar",
                "mandi": "Ahmednagar Yellow Soybean APMC",
                "modalQt": 4540,
                "minQt": 4047,
                "maxQt": 4886,
                "arrivalsQt": 5100,
                "factor": 0.987
        },
        {
                "district": "Satara",
                "mandi": "Satara Yellow Soybean APMC",
                "modalQt": 4655,
                "minQt": 4149,
                "maxQt": 5009,
                "arrivalsQt": 2800,
                "factor": 1.012
        },
        {
                "district": "Kolhapur",
                "mandi": "Kolhapur Yellow Soybean APMC",
                "modalQt": 4701,
                "minQt": 4190,
                "maxQt": 5059,
                "arrivalsQt": 3300,
                "factor": 1.022
        },
        {
                "district": "Dhule",
                "mandi": "Dhule Yellow Soybean APMC",
                "modalQt": 4513,
                "minQt": 4022,
                "maxQt": 4856,
                "arrivalsQt": 3500,
                "factor": 0.981
        },
        {
                "district": "Nandurbar",
                "mandi": "Nandurbar Yellow Soybean APMC",
                "modalQt": 4499,
                "minQt": 4010,
                "maxQt": 4841,
                "arrivalsQt": 2900,
                "factor": 0.978
        },
        {
                "district": "Beed",
                "mandi": "Beed Yellow Soybean APMC",
                "modalQt": 4536,
                "minQt": 4043,
                "maxQt": 4881,
                "arrivalsQt": 2400,
                "factor": 0.986
        },
        {
                "district": "Palghar",
                "mandi": "Palghar Yellow Soybean APMC",
                "modalQt": 4669,
                "minQt": 4162,
                "maxQt": 5024,
                "arrivalsQt": 2100,
                "factor": 1.015
        },
        {
                "district": "Dharashiv",
                "mandi": "Dharashiv Yellow Soybean APMC",
                "modalQt": 4549,
                "minQt": 4055,
                "maxQt": 4896,
                "arrivalsQt": 2200,
                "factor": 0.989
        },
        {
                "district": "Chhatrapati Sambhajinagar",
                "mandi": "Chhatrapati Sambhajinagar Yellow Soybean APMC",
                "modalQt": 4628,
                "minQt": 4125,
                "maxQt": 4980,
                "arrivalsQt": 3400,
                "factor": 1.006
        },
        {
                "district": "Hingoli",
                "mandi": "Hingoli Yellow Soybean APMC",
                "modalQt": 4554,
                "minQt": 4059,
                "maxQt": 4901,
                "arrivalsQt": 1900,
                "factor": 0.99
        },
        {
                "district": "Wardha",
                "mandi": "Wardha Yellow Soybean APMC",
                "modalQt": 4582,
                "minQt": 4084,
                "maxQt": 4930,
                "arrivalsQt": 2400,
                "factor": 0.996
        },
        {
                "district": "Ratnagiri",
                "mandi": "Ratnagiri Yellow Soybean APMC",
                "modalQt": 4807,
                "minQt": 4285,
                "maxQt": 5173,
                "arrivalsQt": 1800,
                "factor": 1.045
        },
        {
                "district": "Sindhudurg",
                "mandi": "Sindhudurg Yellow Soybean APMC",
                "modalQt": 4821,
                "minQt": 4297,
                "maxQt": 5188,
                "arrivalsQt": 1600,
                "factor": 1.048
        },
        {
                "district": "Raigad",
                "mandi": "Raigad Yellow Soybean APMC",
                "modalQt": 4761,
                "minQt": 4244,
                "maxQt": 5123,
                "arrivalsQt": 2700,
                "factor": 1.035
        },
        {
                "district": "Yavatmal",
                "mandi": "Yavatmal Yellow Soybean APMC",
                "modalQt": 4540,
                "minQt": 4047,
                "maxQt": 4886,
                "arrivalsQt": 3300,
                "factor": 0.987
        },
        {
                "district": "Buldhana",
                "mandi": "Buldhana Yellow Soybean APMC",
                "modalQt": 4568,
                "minQt": 4071,
                "maxQt": 4915,
                "arrivalsQt": 3100,
                "factor": 0.993
        },
        {
                "district": "Bhandara",
                "mandi": "Bhandara Yellow Soybean APMC",
                "modalQt": 4526,
                "minQt": 4034,
                "maxQt": 4871,
                "arrivalsQt": 2600,
                "factor": 0.984
        },
        {
                "district": "Jalna",
                "mandi": "Jalna Yellow Soybean APMC",
                "modalQt": 4582,
                "minQt": 4084,
                "maxQt": 4930,
                "arrivalsQt": 3200,
                "factor": 0.996
        },
        {
                "district": "Parbhani",
                "mandi": "Parbhani Yellow Soybean APMC",
                "modalQt": 4559,
                "minQt": 4063,
                "maxQt": 4905,
                "arrivalsQt": 2500,
                "factor": 0.991
        }
],
      history: {
        "7D": {
                "labels": [
                        "08 Sep",
                        "09 Sep",
                        "10 Sep",
                        "11 Sep",
                        "12 Sep",
                        "13 Sep",
                        "14 Sep (Today)",
                        "16 Sep (AI)",
                        "18 Sep (AI)",
                        "20 Sep (AI)"
                ],
                "historical": [
                        4278,
                        4370,
                        4416,
                        4508,
                        4554,
                        4577,
                        4600,
                        null,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        4600,
                        4692,
                        4830,
                        4922
                ],
                "mandiMin": [
                        3895,
                        3936,
                        3977,
                        4018,
                        4059,
                        4100,
                        4100,
                        null,
                        null,
                        null
                ],
                "mandiMax": [
                        4604,
                        4703,
                        4802,
                        4851,
                        4901,
                        4950,
                        4950,
                        null,
                        null,
                        null
                ]
        },
        "1M": {
                "labels": [
                        "15 Aug",
                        "22 Aug",
                        "29 Aug",
                        "05 Sep",
                        "12 Sep",
                        "14 Sep (Today)",
                        "21 Sep (AI)",
                        "28 Sep (AI)"
                ],
                "historical": [
                        3910,
                        4048,
                        4186,
                        4370,
                        4508,
                        4600,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        4600,
                        4784,
                        4968
                ],
                "mandiMin": [
                        3485,
                        3608,
                        3772,
                        3936,
                        4100,
                        4100,
                        null,
                        null
                ],
                "mandiMax": [
                        4208,
                        4356,
                        4554,
                        4752,
                        4950,
                        4950,
                        null,
                        null
                ]
        },
        "3M": {
                "labels": [
                        "Jun 26",
                        "Jul 26",
                        "Aug 26",
                        "Sep 26 (Now)",
                        "Oct 26 (AI)",
                        "Nov 26 (AI)"
                ],
                "historical": [
                        3680,
                        3956,
                        4232,
                        4600,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        4600,
                        4876,
                        5152
                ],
                "mandiMin": [
                        3280,
                        3526,
                        3772,
                        4100,
                        null,
                        null
                ],
                "mandiMax": [
                        3960,
                        4257,
                        4554,
                        4950,
                        null,
                        null
                ]
        },
        "1Y": {
                "labels": [
                        "Oct 25",
                        "Dec 25",
                        "Feb 26",
                        "Apr 26",
                        "Jun 26",
                        "Aug 26",
                        "Sep 26 (Now)"
                ],
                "historical": [
                        4830,
                        5520,
                        3910,
                        3450,
                        3680,
                        4140,
                        4600
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        4600
                ],
                "mandiMin": [
                        4305,
                        4920,
                        3485,
                        3075,
                        3280,
                        3690,
                        4100
                ],
                "mandiMax": [
                        5198,
                        5940,
                        4208,
                        3713,
                        3960,
                        4455,
                        4950
                ]
        }
}
    },
    orange: {
      key: "orange",
      name: "Nagpur Orange (Santra GI)",
      emoji: "🍊",
      hub: "Katol & Amravati APMC",
      currentModalQt: 3200,
      currentMinQt: 2600,
      currentMaxQt: 3800,
      farmGateQt: 3100,
      terminalVashiQt: 3900,
      arbitragePct: 20.5,
      trendPct: "+5.4%",
      trendDir: "up",
      arrivalsQt: 5800,
      arrivalsChange: "+8.2% Seasonal Peak",
      sentiment: "Strong Juice Processor Buying",
      sentimentScore: 84,
      recommendation: "Ambika and Nagpur mandarin harvest at peak Brix sweetness. Ideal for beverage manufacturers and retail chains.",
      districtHubs: [
        {
                "district": "Nagpur",
                "mandi": "Kalamna APMC Market",
                "modalQt": 3200,
                "minQt": 2600,
                "maxQt": 3800,
                "arrivalsQt": 5800,
                "factor": 1
        },
        {
                "district": "Amravati",
                "mandi": "Warud Orange APMC",
                "modalQt": 3150,
                "minQt": 2550,
                "maxQt": 3750,
                "arrivalsQt": 4300,
                "factor": 0.984
        },
        {
                "district": "Chhatrapati Sambhajinagar",
                "mandi": "Paithan Citrus Yard",
                "modalQt": 3250,
                "minQt": 2650,
                "maxQt": 3850,
                "arrivalsQt": 2100,
                "factor": 1.015
        },
        {
                "district": "Nashik",
                "mandi": "Nashik Nagpur Orange APMC",
                "modalQt": 3200,
                "minQt": 2600,
                "maxQt": 3800,
                "arrivalsQt": 6850,
                "factor": 1
        },
        {
                "district": "Pune",
                "mandi": "Pune Nagpur Orange APMC",
                "modalQt": 3280,
                "minQt": 2665,
                "maxQt": 3895,
                "arrivalsQt": 5400,
                "factor": 1.025
        },
        {
                "district": "Jalgaon",
                "mandi": "Jalgaon Nagpur Orange APMC",
                "modalQt": 3142,
                "minQt": 2553,
                "maxQt": 3732,
                "arrivalsQt": 4200,
                "factor": 0.982
        },
        {
                "district": "Latur",
                "mandi": "Latur Nagpur Orange APMC",
                "modalQt": 3184,
                "minQt": 2587,
                "maxQt": 3781,
                "arrivalsQt": 6400,
                "factor": 0.995
        },
        {
                "district": "Sangli",
                "mandi": "Sangli Nagpur Orange APMC",
                "modalQt": 3174,
                "minQt": 2579,
                "maxQt": 3770,
                "arrivalsQt": 3600,
                "factor": 0.992
        },
        {
                "district": "Solapur",
                "mandi": "Solapur Nagpur Orange APMC",
                "modalQt": 3219,
                "minQt": 2616,
                "maxQt": 3823,
                "arrivalsQt": 4500,
                "factor": 1.006
        },
        {
                "district": "Ahmednagar",
                "mandi": "Ahmednagar Nagpur Orange APMC",
                "modalQt": 3158,
                "minQt": 2566,
                "maxQt": 3751,
                "arrivalsQt": 5100,
                "factor": 0.987
        },
        {
                "district": "Akola",
                "mandi": "Akola Nagpur Orange APMC",
                "modalQt": 3171,
                "minQt": 2577,
                "maxQt": 3766,
                "arrivalsQt": 4100,
                "factor": 0.991
        },
        {
                "district": "Nanded",
                "mandi": "Nanded Nagpur Orange APMC",
                "modalQt": 3190,
                "minQt": 2592,
                "maxQt": 3789,
                "arrivalsQt": 3200,
                "factor": 0.997
        },
        {
                "district": "Satara",
                "mandi": "Satara Nagpur Orange APMC",
                "modalQt": 3238,
                "minQt": 2631,
                "maxQt": 3846,
                "arrivalsQt": 2800,
                "factor": 1.012
        },
        {
                "district": "Kolhapur",
                "mandi": "Kolhapur Nagpur Orange APMC",
                "modalQt": 3270,
                "minQt": 2657,
                "maxQt": 3884,
                "arrivalsQt": 3300,
                "factor": 1.022
        },
        {
                "district": "Dhule",
                "mandi": "Dhule Nagpur Orange APMC",
                "modalQt": 3139,
                "minQt": 2551,
                "maxQt": 3728,
                "arrivalsQt": 3500,
                "factor": 0.981
        },
        {
                "district": "Nandurbar",
                "mandi": "Nandurbar Nagpur Orange APMC",
                "modalQt": 3130,
                "minQt": 2543,
                "maxQt": 3716,
                "arrivalsQt": 2900,
                "factor": 0.978
        },
        {
                "district": "Beed",
                "mandi": "Beed Nagpur Orange APMC",
                "modalQt": 3155,
                "minQt": 2564,
                "maxQt": 3747,
                "arrivalsQt": 2400,
                "factor": 0.986
        },
        {
                "district": "Washim",
                "mandi": "Washim Nagpur Orange APMC",
                "modalQt": 3178,
                "minQt": 2582,
                "maxQt": 3773,
                "arrivalsQt": 2300,
                "factor": 0.993
        },
        {
                "district": "Palghar",
                "mandi": "Palghar Nagpur Orange APMC",
                "modalQt": 3248,
                "minQt": 2639,
                "maxQt": 3857,
                "arrivalsQt": 2100,
                "factor": 1.015
        },
        {
                "district": "Dharashiv",
                "mandi": "Dharashiv Nagpur Orange APMC",
                "modalQt": 3165,
                "minQt": 2571,
                "maxQt": 3758,
                "arrivalsQt": 2200,
                "factor": 0.989
        },
        {
                "district": "Hingoli",
                "mandi": "Hingoli Nagpur Orange APMC",
                "modalQt": 3168,
                "minQt": 2574,
                "maxQt": 3762,
                "arrivalsQt": 1900,
                "factor": 0.99
        },
        {
                "district": "Wardha",
                "mandi": "Wardha Nagpur Orange APMC",
                "modalQt": 3187,
                "minQt": 2590,
                "maxQt": 3785,
                "arrivalsQt": 2400,
                "factor": 0.996
        },
        {
                "district": "Ratnagiri",
                "mandi": "Ratnagiri Nagpur Orange APMC",
                "modalQt": 3344,
                "minQt": 2717,
                "maxQt": 3971,
                "arrivalsQt": 1800,
                "factor": 1.045
        },
        {
                "district": "Sindhudurg",
                "mandi": "Sindhudurg Nagpur Orange APMC",
                "modalQt": 3354,
                "minQt": 2725,
                "maxQt": 3982,
                "arrivalsQt": 1600,
                "factor": 1.048
        },
        {
                "district": "Raigad",
                "mandi": "Raigad Nagpur Orange APMC",
                "modalQt": 3312,
                "minQt": 2691,
                "maxQt": 3933,
                "arrivalsQt": 2700,
                "factor": 1.035
        },
        {
                "district": "Yavatmal",
                "mandi": "Yavatmal Nagpur Orange APMC",
                "modalQt": 3158,
                "minQt": 2566,
                "maxQt": 3751,
                "arrivalsQt": 3300,
                "factor": 0.987
        },
        {
                "district": "Buldhana",
                "mandi": "Buldhana Nagpur Orange APMC",
                "modalQt": 3178,
                "minQt": 2582,
                "maxQt": 3773,
                "arrivalsQt": 3100,
                "factor": 0.993
        },
        {
                "district": "Bhandara",
                "mandi": "Bhandara Nagpur Orange APMC",
                "modalQt": 3149,
                "minQt": 2558,
                "maxQt": 3739,
                "arrivalsQt": 2600,
                "factor": 0.984
        },
        {
                "district": "Jalna",
                "mandi": "Jalna Nagpur Orange APMC",
                "modalQt": 3187,
                "minQt": 2590,
                "maxQt": 3785,
                "arrivalsQt": 3200,
                "factor": 0.996
        },
        {
                "district": "Parbhani",
                "mandi": "Parbhani Nagpur Orange APMC",
                "modalQt": 3171,
                "minQt": 2577,
                "maxQt": 3766,
                "arrivalsQt": 2500,
                "factor": 0.991
        }
],
      history: {
        "7D": {
                "labels": [
                        "08 Sep",
                        "09 Sep",
                        "10 Sep",
                        "11 Sep",
                        "12 Sep",
                        "13 Sep",
                        "14 Sep (Today)",
                        "16 Sep (AI)",
                        "18 Sep (AI)",
                        "20 Sep (AI)"
                ],
                "historical": [
                        2976,
                        3040,
                        3072,
                        3136,
                        3168,
                        3184,
                        3200,
                        null,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        3200,
                        3264,
                        3360,
                        3424
                ],
                "mandiMin": [
                        2470,
                        2496,
                        2522,
                        2548,
                        2574,
                        2600,
                        2600,
                        null,
                        null,
                        null
                ],
                "mandiMax": [
                        3534,
                        3610,
                        3686,
                        3724,
                        3762,
                        3800,
                        3800,
                        null,
                        null,
                        null
                ]
        },
        "1M": {
                "labels": [
                        "15 Aug",
                        "22 Aug",
                        "29 Aug",
                        "05 Sep",
                        "12 Sep",
                        "14 Sep (Today)",
                        "21 Sep (AI)",
                        "28 Sep (AI)"
                ],
                "historical": [
                        2720,
                        2816,
                        2912,
                        3040,
                        3136,
                        3200,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        3200,
                        3328,
                        3456
                ],
                "mandiMin": [
                        2210,
                        2288,
                        2392,
                        2496,
                        2600,
                        2600,
                        null,
                        null
                ],
                "mandiMax": [
                        3230,
                        3344,
                        3496,
                        3648,
                        3800,
                        3800,
                        null,
                        null
                ]
        },
        "3M": {
                "labels": [
                        "Jun 26",
                        "Jul 26",
                        "Aug 26",
                        "Sep 26 (Now)",
                        "Oct 26 (AI)",
                        "Nov 26 (AI)"
                ],
                "historical": [
                        2560,
                        2752,
                        2944,
                        3200,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        3200,
                        3392,
                        3584
                ],
                "mandiMin": [
                        2080,
                        2236,
                        2392,
                        2600,
                        null,
                        null
                ],
                "mandiMax": [
                        3040,
                        3268,
                        3496,
                        3800,
                        null,
                        null
                ]
        },
        "1Y": {
                "labels": [
                        "Oct 25",
                        "Dec 25",
                        "Feb 26",
                        "Apr 26",
                        "Jun 26",
                        "Aug 26",
                        "Sep 26 (Now)"
                ],
                "historical": [
                        3360,
                        3840,
                        2720,
                        2400,
                        2560,
                        2880,
                        3200
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        3200
                ],
                "mandiMin": [
                        2730,
                        3120,
                        2210,
                        1950,
                        2080,
                        2340,
                        2600
                ],
                "mandiMax": [
                        3990,
                        4560,
                        3230,
                        2850,
                        3040,
                        3420,
                        3800
                ]
        }
}
    },
    turmeric: {
      key: "turmeric",
      name: "Sangli Rajapuri Turmeric",
      emoji: "🟡",
      hub: "Sangli Spices APMC",
      currentModalQt: 14200,
      currentMinQt: 12500,
      currentMaxQt: 16000,
      farmGateQt: 13900,
      terminalVashiQt: 16800,
      arbitragePct: 17.3,
      trendPct: "+8.5%",
      trendDir: "up",
      arrivalsQt: 2100,
      arrivalsChange: "+4.1% Tight Supply",
      sentiment: "Extremely Bullish (Pharma & Export)",
      sentimentScore: 91,
      recommendation: "Curcumin >4.5% premium quality in Sangli and Hingoli. High global export demand; lock long-term supply contracts immediately.",
      districtHubs: [
        {
                "district": "Sangli",
                "mandi": "Sangli Spices APMC",
                "modalQt": 14200,
                "minQt": 12500,
                "maxQt": 16000,
                "arrivalsQt": 2100,
                "factor": 1
        },
        {
                "district": "Hingoli",
                "mandi": "Basmat Turmeric APMC",
                "modalQt": 14100,
                "minQt": 12400,
                "maxQt": 15900,
                "arrivalsQt": 3400,
                "factor": 0.993
        },
        {
                "district": "Nanded",
                "mandi": "Nanded Spices Yard",
                "modalQt": 14250,
                "minQt": 12550,
                "maxQt": 16100,
                "arrivalsQt": 1800,
                "factor": 1.003
        },
        {
                "district": "Nashik",
                "mandi": "Nashik Sangli Rajapuri Turmeric APMC",
                "modalQt": 14200,
                "minQt": 12500,
                "maxQt": 16000,
                "arrivalsQt": 6850,
                "factor": 1
        },
        {
                "district": "Pune",
                "mandi": "Pune Sangli Rajapuri Turmeric APMC",
                "modalQt": 14555,
                "minQt": 12812,
                "maxQt": 16400,
                "arrivalsQt": 5400,
                "factor": 1.025
        },
        {
                "district": "Jalgaon",
                "mandi": "Jalgaon Sangli Rajapuri Turmeric APMC",
                "modalQt": 13944,
                "minQt": 12275,
                "maxQt": 15712,
                "arrivalsQt": 4200,
                "factor": 0.982
        },
        {
                "district": "Latur",
                "mandi": "Latur Sangli Rajapuri Turmeric APMC",
                "modalQt": 14129,
                "minQt": 12438,
                "maxQt": 15920,
                "arrivalsQt": 6400,
                "factor": 0.995
        },
        {
                "district": "Nagpur",
                "mandi": "Nagpur Sangli Rajapuri Turmeric APMC",
                "modalQt": 14456,
                "minQt": 12725,
                "maxQt": 16288,
                "arrivalsQt": 4900,
                "factor": 1.018
        },
        {
                "district": "Solapur",
                "mandi": "Solapur Sangli Rajapuri Turmeric APMC",
                "modalQt": 14285,
                "minQt": 12575,
                "maxQt": 16096,
                "arrivalsQt": 4500,
                "factor": 1.006
        },
        {
                "district": "Ahmednagar",
                "mandi": "Ahmednagar Sangli Rajapuri Turmeric APMC",
                "modalQt": 14015,
                "minQt": 12338,
                "maxQt": 15792,
                "arrivalsQt": 5100,
                "factor": 0.987
        },
        {
                "district": "Amravati",
                "mandi": "Amravati Sangli Rajapuri Turmeric APMC",
                "modalQt": 14115,
                "minQt": 12425,
                "maxQt": 15904,
                "arrivalsQt": 3800,
                "factor": 0.994
        },
        {
                "district": "Akola",
                "mandi": "Akola Sangli Rajapuri Turmeric APMC",
                "modalQt": 14072,
                "minQt": 12388,
                "maxQt": 15856,
                "arrivalsQt": 4100,
                "factor": 0.991
        },
        {
                "district": "Satara",
                "mandi": "Satara Sangli Rajapuri Turmeric APMC",
                "modalQt": 14370,
                "minQt": 12650,
                "maxQt": 16192,
                "arrivalsQt": 2800,
                "factor": 1.012
        },
        {
                "district": "Kolhapur",
                "mandi": "Kolhapur Sangli Rajapuri Turmeric APMC",
                "modalQt": 14512,
                "minQt": 12775,
                "maxQt": 16352,
                "arrivalsQt": 3300,
                "factor": 1.022
        },
        {
                "district": "Dhule",
                "mandi": "Dhule Sangli Rajapuri Turmeric APMC",
                "modalQt": 13930,
                "minQt": 12263,
                "maxQt": 15696,
                "arrivalsQt": 3500,
                "factor": 0.981
        },
        {
                "district": "Nandurbar",
                "mandi": "Nandurbar Sangli Rajapuri Turmeric APMC",
                "modalQt": 13888,
                "minQt": 12225,
                "maxQt": 15648,
                "arrivalsQt": 2900,
                "factor": 0.978
        },
        {
                "district": "Beed",
                "mandi": "Beed Sangli Rajapuri Turmeric APMC",
                "modalQt": 14001,
                "minQt": 12325,
                "maxQt": 15776,
                "arrivalsQt": 2400,
                "factor": 0.986
        },
        {
                "district": "Washim",
                "mandi": "Washim Sangli Rajapuri Turmeric APMC",
                "modalQt": 14101,
                "minQt": 12413,
                "maxQt": 15888,
                "arrivalsQt": 2300,
                "factor": 0.993
        },
        {
                "district": "Palghar",
                "mandi": "Palghar Sangli Rajapuri Turmeric APMC",
                "modalQt": 14413,
                "minQt": 12687,
                "maxQt": 16240,
                "arrivalsQt": 2100,
                "factor": 1.015
        },
        {
                "district": "Dharashiv",
                "mandi": "Dharashiv Sangli Rajapuri Turmeric APMC",
                "modalQt": 14044,
                "minQt": 12363,
                "maxQt": 15824,
                "arrivalsQt": 2200,
                "factor": 0.989
        },
        {
                "district": "Chhatrapati Sambhajinagar",
                "mandi": "Chhatrapati Sambhajinagar Sangli Rajapuri Turmeric APMC",
                "modalQt": 14285,
                "minQt": 12575,
                "maxQt": 16096,
                "arrivalsQt": 3400,
                "factor": 1.006
        },
        {
                "district": "Wardha",
                "mandi": "Wardha Sangli Rajapuri Turmeric APMC",
                "modalQt": 14143,
                "minQt": 12450,
                "maxQt": 15936,
                "arrivalsQt": 2400,
                "factor": 0.996
        },
        {
                "district": "Ratnagiri",
                "mandi": "Ratnagiri Sangli Rajapuri Turmeric APMC",
                "modalQt": 14839,
                "minQt": 13063,
                "maxQt": 16720,
                "arrivalsQt": 1800,
                "factor": 1.045
        },
        {
                "district": "Sindhudurg",
                "mandi": "Sindhudurg Sangli Rajapuri Turmeric APMC",
                "modalQt": 14882,
                "minQt": 13100,
                "maxQt": 16768,
                "arrivalsQt": 1600,
                "factor": 1.048
        },
        {
                "district": "Raigad",
                "mandi": "Raigad Sangli Rajapuri Turmeric APMC",
                "modalQt": 14697,
                "minQt": 12937,
                "maxQt": 16560,
                "arrivalsQt": 2700,
                "factor": 1.035
        },
        {
                "district": "Yavatmal",
                "mandi": "Yavatmal Sangli Rajapuri Turmeric APMC",
                "modalQt": 14015,
                "minQt": 12338,
                "maxQt": 15792,
                "arrivalsQt": 3300,
                "factor": 0.987
        },
        {
                "district": "Buldhana",
                "mandi": "Buldhana Sangli Rajapuri Turmeric APMC",
                "modalQt": 14101,
                "minQt": 12413,
                "maxQt": 15888,
                "arrivalsQt": 3100,
                "factor": 0.993
        },
        {
                "district": "Bhandara",
                "mandi": "Bhandara Sangli Rajapuri Turmeric APMC",
                "modalQt": 13973,
                "minQt": 12300,
                "maxQt": 15744,
                "arrivalsQt": 2600,
                "factor": 0.984
        },
        {
                "district": "Jalna",
                "mandi": "Jalna Sangli Rajapuri Turmeric APMC",
                "modalQt": 14143,
                "minQt": 12450,
                "maxQt": 15936,
                "arrivalsQt": 3200,
                "factor": 0.996
        },
        {
                "district": "Parbhani",
                "mandi": "Parbhani Sangli Rajapuri Turmeric APMC",
                "modalQt": 14072,
                "minQt": 12388,
                "maxQt": 15856,
                "arrivalsQt": 2500,
                "factor": 0.991
        }
],
      history: {
        "7D": {
                "labels": [
                        "08 Sep",
                        "09 Sep",
                        "10 Sep",
                        "11 Sep",
                        "12 Sep",
                        "13 Sep",
                        "14 Sep (Today)",
                        "16 Sep (AI)",
                        "18 Sep (AI)",
                        "20 Sep (AI)"
                ],
                "historical": [
                        13206,
                        13490,
                        13632,
                        13916,
                        14058,
                        14129,
                        14200,
                        null,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        14200,
                        14484,
                        14910,
                        15194
                ],
                "mandiMin": [
                        11875,
                        12000,
                        12125,
                        12250,
                        12375,
                        12500,
                        12500,
                        null,
                        null,
                        null
                ],
                "mandiMax": [
                        14880,
                        15200,
                        15520,
                        15680,
                        15840,
                        16000,
                        16000,
                        null,
                        null,
                        null
                ]
        },
        "1M": {
                "labels": [
                        "15 Aug",
                        "22 Aug",
                        "29 Aug",
                        "05 Sep",
                        "12 Sep",
                        "14 Sep (Today)",
                        "21 Sep (AI)",
                        "28 Sep (AI)"
                ],
                "historical": [
                        12070,
                        12496,
                        12922,
                        13490,
                        13916,
                        14200,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        14200,
                        14768,
                        15336
                ],
                "mandiMin": [
                        10625,
                        11000,
                        11500,
                        12000,
                        12500,
                        12500,
                        null,
                        null
                ],
                "mandiMax": [
                        13600,
                        14080,
                        14720,
                        15360,
                        16000,
                        16000,
                        null,
                        null
                ]
        },
        "3M": {
                "labels": [
                        "Jun 26",
                        "Jul 26",
                        "Aug 26",
                        "Sep 26 (Now)",
                        "Oct 26 (AI)",
                        "Nov 26 (AI)"
                ],
                "historical": [
                        11360,
                        12212,
                        13064,
                        14200,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        14200,
                        15052,
                        15904
                ],
                "mandiMin": [
                        10000,
                        10750,
                        11500,
                        12500,
                        null,
                        null
                ],
                "mandiMax": [
                        12800,
                        13760,
                        14720,
                        16000,
                        null,
                        null
                ]
        },
        "1Y": {
                "labels": [
                        "Oct 25",
                        "Dec 25",
                        "Feb 26",
                        "Apr 26",
                        "Jun 26",
                        "Aug 26",
                        "Sep 26 (Now)"
                ],
                "historical": [
                        14910,
                        17040,
                        12070,
                        10650,
                        11360,
                        12780,
                        14200
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        14200
                ],
                "mandiMin": [
                        13125,
                        15000,
                        10625,
                        9375,
                        10000,
                        11250,
                        12500
                ],
                "mandiMax": [
                        16800,
                        19200,
                        13600,
                        12000,
                        12800,
                        14400,
                        16000
                ]
        }
}
    },
    pomegranate: {
      key: "pomegranate",
      name: "Bhagwa Pomegranate (Solapur GI)",
      emoji: "🔴",
      hub: "Solapur APMC Market Yard",
      currentModalQt: 9500,
      currentMinQt: 8000,
      currentMaxQt: 11500,
      farmGateQt: 9200,
      terminalVashiQt: 11800,
      arbitragePct: 22,
      trendPct: "+3.6%",
      trendDir: "up",
      arrivalsQt: 3400,
      arrivalsChange: "+9.8% Export Demand",
      sentiment: "High Middle-East Export Demand",
      sentimentScore: 88,
      recommendation: "Deep red aril fruit size 250g+ available in Solapur & Sangola clusters. Premium price realized in EU and Gulf markets.",
      districtHubs: [
        {
                "district": "Solapur",
                "mandi": "Sangola APMC Yard",
                "modalQt": 9500,
                "minQt": 8000,
                "maxQt": 11500,
                "arrivalsQt": 3400,
                "factor": 1
        },
        {
                "district": "Nashik",
                "mandi": "Satana APMC",
                "modalQt": 9400,
                "minQt": 7900,
                "maxQt": 11400,
                "arrivalsQt": 2800,
                "factor": 0.989
        },
        {
                "district": "Ahmednagar",
                "mandi": "Rahata APMC",
                "modalQt": 9600,
                "minQt": 8100,
                "maxQt": 11600,
                "arrivalsQt": 2200,
                "factor": 1.01
        },
        {
                "district": "Pune",
                "mandi": "Indapur Pomegranate Yard",
                "modalQt": 9550,
                "minQt": 8050,
                "maxQt": 11550,
                "arrivalsQt": 1900,
                "factor": 1.005
        },
        {
                "district": "Jalgaon",
                "mandi": "Jalgaon Bhagwa Pomegranate APMC",
                "modalQt": 9329,
                "minQt": 7856,
                "maxQt": 11293,
                "arrivalsQt": 4200,
                "factor": 0.982
        },
        {
                "district": "Latur",
                "mandi": "Latur Bhagwa Pomegranate APMC",
                "modalQt": 9453,
                "minQt": 7960,
                "maxQt": 11443,
                "arrivalsQt": 6400,
                "factor": 0.995
        },
        {
                "district": "Nagpur",
                "mandi": "Nagpur Bhagwa Pomegranate APMC",
                "modalQt": 9671,
                "minQt": 8144,
                "maxQt": 11707,
                "arrivalsQt": 4900,
                "factor": 1.018
        },
        {
                "district": "Sangli",
                "mandi": "Sangli Bhagwa Pomegranate APMC",
                "modalQt": 9424,
                "minQt": 7936,
                "maxQt": 11408,
                "arrivalsQt": 3600,
                "factor": 0.992
        },
        {
                "district": "Amravati",
                "mandi": "Amravati Bhagwa Pomegranate APMC",
                "modalQt": 9443,
                "minQt": 7952,
                "maxQt": 11431,
                "arrivalsQt": 3800,
                "factor": 0.994
        },
        {
                "district": "Akola",
                "mandi": "Akola Bhagwa Pomegranate APMC",
                "modalQt": 9415,
                "minQt": 7928,
                "maxQt": 11397,
                "arrivalsQt": 4100,
                "factor": 0.991
        },
        {
                "district": "Nanded",
                "mandi": "Nanded Bhagwa Pomegranate APMC",
                "modalQt": 9472,
                "minQt": 7976,
                "maxQt": 11466,
                "arrivalsQt": 3200,
                "factor": 0.997
        },
        {
                "district": "Satara",
                "mandi": "Satara Bhagwa Pomegranate APMC",
                "modalQt": 9614,
                "minQt": 8096,
                "maxQt": 11638,
                "arrivalsQt": 2800,
                "factor": 1.012
        },
        {
                "district": "Kolhapur",
                "mandi": "Kolhapur Bhagwa Pomegranate APMC",
                "modalQt": 9709,
                "minQt": 8176,
                "maxQt": 11753,
                "arrivalsQt": 3300,
                "factor": 1.022
        },
        {
                "district": "Dhule",
                "mandi": "Dhule Bhagwa Pomegranate APMC",
                "modalQt": 9320,
                "minQt": 7848,
                "maxQt": 11282,
                "arrivalsQt": 3500,
                "factor": 0.981
        },
        {
                "district": "Nandurbar",
                "mandi": "Nandurbar Bhagwa Pomegranate APMC",
                "modalQt": 9291,
                "minQt": 7824,
                "maxQt": 11247,
                "arrivalsQt": 2900,
                "factor": 0.978
        },
        {
                "district": "Beed",
                "mandi": "Beed Bhagwa Pomegranate APMC",
                "modalQt": 9367,
                "minQt": 7888,
                "maxQt": 11339,
                "arrivalsQt": 2400,
                "factor": 0.986
        },
        {
                "district": "Washim",
                "mandi": "Washim Bhagwa Pomegranate APMC",
                "modalQt": 9434,
                "minQt": 7944,
                "maxQt": 11420,
                "arrivalsQt": 2300,
                "factor": 0.993
        },
        {
                "district": "Palghar",
                "mandi": "Palghar Bhagwa Pomegranate APMC",
                "modalQt": 9642,
                "minQt": 8120,
                "maxQt": 11672,
                "arrivalsQt": 2100,
                "factor": 1.015
        },
        {
                "district": "Dharashiv",
                "mandi": "Dharashiv Bhagwa Pomegranate APMC",
                "modalQt": 9396,
                "minQt": 7912,
                "maxQt": 11374,
                "arrivalsQt": 2200,
                "factor": 0.989
        },
        {
                "district": "Chhatrapati Sambhajinagar",
                "mandi": "Chhatrapati Sambhajinagar Bhagwa Pomegranate APMC",
                "modalQt": 9557,
                "minQt": 8048,
                "maxQt": 11569,
                "arrivalsQt": 3400,
                "factor": 1.006
        },
        {
                "district": "Hingoli",
                "mandi": "Hingoli Bhagwa Pomegranate APMC",
                "modalQt": 9405,
                "minQt": 7920,
                "maxQt": 11385,
                "arrivalsQt": 1900,
                "factor": 0.99
        },
        {
                "district": "Wardha",
                "mandi": "Wardha Bhagwa Pomegranate APMC",
                "modalQt": 9462,
                "minQt": 7968,
                "maxQt": 11454,
                "arrivalsQt": 2400,
                "factor": 0.996
        },
        {
                "district": "Ratnagiri",
                "mandi": "Ratnagiri Bhagwa Pomegranate APMC",
                "modalQt": 9928,
                "minQt": 8360,
                "maxQt": 12018,
                "arrivalsQt": 1800,
                "factor": 1.045
        },
        {
                "district": "Sindhudurg",
                "mandi": "Sindhudurg Bhagwa Pomegranate APMC",
                "modalQt": 9956,
                "minQt": 8384,
                "maxQt": 12052,
                "arrivalsQt": 1600,
                "factor": 1.048
        },
        {
                "district": "Raigad",
                "mandi": "Raigad Bhagwa Pomegranate APMC",
                "modalQt": 9833,
                "minQt": 8280,
                "maxQt": 11902,
                "arrivalsQt": 2700,
                "factor": 1.035
        },
        {
                "district": "Yavatmal",
                "mandi": "Yavatmal Bhagwa Pomegranate APMC",
                "modalQt": 9377,
                "minQt": 7896,
                "maxQt": 11351,
                "arrivalsQt": 3300,
                "factor": 0.987
        },
        {
                "district": "Buldhana",
                "mandi": "Buldhana Bhagwa Pomegranate APMC",
                "modalQt": 9434,
                "minQt": 7944,
                "maxQt": 11420,
                "arrivalsQt": 3100,
                "factor": 0.993
        },
        {
                "district": "Bhandara",
                "mandi": "Bhandara Bhagwa Pomegranate APMC",
                "modalQt": 9348,
                "minQt": 7872,
                "maxQt": 11316,
                "arrivalsQt": 2600,
                "factor": 0.984
        },
        {
                "district": "Jalna",
                "mandi": "Jalna Bhagwa Pomegranate APMC",
                "modalQt": 9462,
                "minQt": 7968,
                "maxQt": 11454,
                "arrivalsQt": 3200,
                "factor": 0.996
        },
        {
                "district": "Parbhani",
                "mandi": "Parbhani Bhagwa Pomegranate APMC",
                "modalQt": 9415,
                "minQt": 7928,
                "maxQt": 11397,
                "arrivalsQt": 2500,
                "factor": 0.991
        }
],
      history: {
        "7D": {
                "labels": [
                        "08 Sep",
                        "09 Sep",
                        "10 Sep",
                        "11 Sep",
                        "12 Sep",
                        "13 Sep",
                        "14 Sep (Today)",
                        "16 Sep (AI)",
                        "18 Sep (AI)",
                        "20 Sep (AI)"
                ],
                "historical": [
                        8835,
                        9025,
                        9120,
                        9310,
                        9405,
                        9453,
                        9500,
                        null,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        9500,
                        9690,
                        9975,
                        10165
                ],
                "mandiMin": [
                        7600,
                        7680,
                        7760,
                        7840,
                        7920,
                        8000,
                        8000,
                        null,
                        null,
                        null
                ],
                "mandiMax": [
                        10695,
                        10925,
                        11155,
                        11270,
                        11385,
                        11500,
                        11500,
                        null,
                        null,
                        null
                ]
        },
        "1M": {
                "labels": [
                        "15 Aug",
                        "22 Aug",
                        "29 Aug",
                        "05 Sep",
                        "12 Sep",
                        "14 Sep (Today)",
                        "21 Sep (AI)",
                        "28 Sep (AI)"
                ],
                "historical": [
                        8075,
                        8360,
                        8645,
                        9025,
                        9310,
                        9500,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        9500,
                        9880,
                        10260
                ],
                "mandiMin": [
                        6800,
                        7040,
                        7360,
                        7680,
                        8000,
                        8000,
                        null,
                        null
                ],
                "mandiMax": [
                        9775,
                        10120,
                        10580,
                        11040,
                        11500,
                        11500,
                        null,
                        null
                ]
        },
        "3M": {
                "labels": [
                        "Jun 26",
                        "Jul 26",
                        "Aug 26",
                        "Sep 26 (Now)",
                        "Oct 26 (AI)",
                        "Nov 26 (AI)"
                ],
                "historical": [
                        7600,
                        8170,
                        8740,
                        9500,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        9500,
                        10070,
                        10640
                ],
                "mandiMin": [
                        6400,
                        6880,
                        7360,
                        8000,
                        null,
                        null
                ],
                "mandiMax": [
                        9200,
                        9890,
                        10580,
                        11500,
                        null,
                        null
                ]
        },
        "1Y": {
                "labels": [
                        "Oct 25",
                        "Dec 25",
                        "Feb 26",
                        "Apr 26",
                        "Jun 26",
                        "Aug 26",
                        "Sep 26 (Now)"
                ],
                "historical": [
                        9975,
                        11400,
                        8075,
                        7125,
                        7600,
                        8550,
                        9500
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        9500
                ],
                "mandiMin": [
                        8400,
                        9600,
                        6800,
                        6000,
                        6400,
                        7200,
                        8000
                ],
                "mandiMax": [
                        12075,
                        13800,
                        9775,
                        8625,
                        9200,
                        10350,
                        11500
                ]
        }
}
    },
    cotton: {
      key: "cotton",
      name: "Vidarbha Raw Cotton (Long Staple)",
      emoji: "☁️",
      hub: "Yavatmal & Amravati APMC",
      currentModalQt: 7100,
      currentMinQt: 6400,
      currentMaxQt: 7600,
      farmGateQt: 7000,
      terminalVashiQt: 7900,
      arbitragePct: 11.4,
      trendPct: "+1.2%",
      trendDir: "up",
      arrivalsQt: 7800,
      arrivalsChange: "+18.2% Harvest Surge",
      sentiment: "Textile Mill Buying Active",
      sentimentScore: 75,
      recommendation: "Staple length 29.5mm+ Shankar-6 equivalent available across Yavatmal spinning ginning hubs.",
      districtHubs: [
        {
                "district": "Yavatmal",
                "mandi": "Yavatmal APMC Yard",
                "modalQt": 7100,
                "minQt": 6400,
                "maxQt": 7600,
                "arrivalsQt": 7800,
                "factor": 1
        },
        {
                "district": "Amravati",
                "mandi": "Dhamangaon APMC",
                "modalQt": 7050,
                "minQt": 6350,
                "maxQt": 7550,
                "arrivalsQt": 6100,
                "factor": 0.993
        },
        {
                "district": "Wardha",
                "mandi": "Hinganghat Cotton APMC",
                "modalQt": 7120,
                "minQt": 6420,
                "maxQt": 7620,
                "arrivalsQt": 5400,
                "factor": 1.002
        },
        {
                "district": "Jalna",
                "mandi": "Partur APMC",
                "modalQt": 7080,
                "minQt": 6380,
                "maxQt": 7580,
                "arrivalsQt": 3900,
                "factor": 0.997
        },
        {
                "district": "Nashik",
                "mandi": "Nashik Vidarbha Raw Cotton APMC",
                "modalQt": 7100,
                "minQt": 6400,
                "maxQt": 7600,
                "arrivalsQt": 6850,
                "factor": 1
        },
        {
                "district": "Pune",
                "mandi": "Pune Vidarbha Raw Cotton APMC",
                "modalQt": 7277,
                "minQt": 6560,
                "maxQt": 7790,
                "arrivalsQt": 5400,
                "factor": 1.025
        },
        {
                "district": "Jalgaon",
                "mandi": "Jalgaon Vidarbha Raw Cotton APMC",
                "modalQt": 6972,
                "minQt": 6285,
                "maxQt": 7463,
                "arrivalsQt": 4200,
                "factor": 0.982
        },
        {
                "district": "Latur",
                "mandi": "Latur Vidarbha Raw Cotton APMC",
                "modalQt": 7065,
                "minQt": 6368,
                "maxQt": 7562,
                "arrivalsQt": 6400,
                "factor": 0.995
        },
        {
                "district": "Nagpur",
                "mandi": "Nagpur Vidarbha Raw Cotton APMC",
                "modalQt": 7228,
                "minQt": 6515,
                "maxQt": 7737,
                "arrivalsQt": 4900,
                "factor": 1.018
        },
        {
                "district": "Sangli",
                "mandi": "Sangli Vidarbha Raw Cotton APMC",
                "modalQt": 7043,
                "minQt": 6349,
                "maxQt": 7539,
                "arrivalsQt": 3600,
                "factor": 0.992
        },
        {
                "district": "Solapur",
                "mandi": "Solapur Vidarbha Raw Cotton APMC",
                "modalQt": 7143,
                "minQt": 6438,
                "maxQt": 7646,
                "arrivalsQt": 4500,
                "factor": 1.006
        },
        {
                "district": "Ahmednagar",
                "mandi": "Ahmednagar Vidarbha Raw Cotton APMC",
                "modalQt": 7008,
                "minQt": 6317,
                "maxQt": 7501,
                "arrivalsQt": 5100,
                "factor": 0.987
        },
        {
                "district": "Akola",
                "mandi": "Akola Vidarbha Raw Cotton APMC",
                "modalQt": 7036,
                "minQt": 6342,
                "maxQt": 7532,
                "arrivalsQt": 4100,
                "factor": 0.991
        },
        {
                "district": "Nanded",
                "mandi": "Nanded Vidarbha Raw Cotton APMC",
                "modalQt": 7079,
                "minQt": 6381,
                "maxQt": 7577,
                "arrivalsQt": 3200,
                "factor": 0.997
        },
        {
                "district": "Satara",
                "mandi": "Satara Vidarbha Raw Cotton APMC",
                "modalQt": 7185,
                "minQt": 6477,
                "maxQt": 7691,
                "arrivalsQt": 2800,
                "factor": 1.012
        },
        {
                "district": "Kolhapur",
                "mandi": "Kolhapur Vidarbha Raw Cotton APMC",
                "modalQt": 7256,
                "minQt": 6541,
                "maxQt": 7767,
                "arrivalsQt": 3300,
                "factor": 1.022
        },
        {
                "district": "Dhule",
                "mandi": "Dhule Vidarbha Raw Cotton APMC",
                "modalQt": 6965,
                "minQt": 6278,
                "maxQt": 7456,
                "arrivalsQt": 3500,
                "factor": 0.981
        },
        {
                "district": "Nandurbar",
                "mandi": "Nandurbar Vidarbha Raw Cotton APMC",
                "modalQt": 6944,
                "minQt": 6259,
                "maxQt": 7433,
                "arrivalsQt": 2900,
                "factor": 0.978
        },
        {
                "district": "Beed",
                "mandi": "Beed Vidarbha Raw Cotton APMC",
                "modalQt": 7001,
                "minQt": 6310,
                "maxQt": 7494,
                "arrivalsQt": 2400,
                "factor": 0.986
        },
        {
                "district": "Washim",
                "mandi": "Washim Vidarbha Raw Cotton APMC",
                "modalQt": 7050,
                "minQt": 6355,
                "maxQt": 7547,
                "arrivalsQt": 2300,
                "factor": 0.993
        },
        {
                "district": "Palghar",
                "mandi": "Palghar Vidarbha Raw Cotton APMC",
                "modalQt": 7206,
                "minQt": 6496,
                "maxQt": 7714,
                "arrivalsQt": 2100,
                "factor": 1.015
        },
        {
                "district": "Dharashiv",
                "mandi": "Dharashiv Vidarbha Raw Cotton APMC",
                "modalQt": 7022,
                "minQt": 6330,
                "maxQt": 7516,
                "arrivalsQt": 2200,
                "factor": 0.989
        },
        {
                "district": "Chhatrapati Sambhajinagar",
                "mandi": "Chhatrapati Sambhajinagar Vidarbha Raw Cotton APMC",
                "modalQt": 7143,
                "minQt": 6438,
                "maxQt": 7646,
                "arrivalsQt": 3400,
                "factor": 1.006
        },
        {
                "district": "Hingoli",
                "mandi": "Hingoli Vidarbha Raw Cotton APMC",
                "modalQt": 7029,
                "minQt": 6336,
                "maxQt": 7524,
                "arrivalsQt": 1900,
                "factor": 0.99
        },
        {
                "district": "Ratnagiri",
                "mandi": "Ratnagiri Vidarbha Raw Cotton APMC",
                "modalQt": 7419,
                "minQt": 6688,
                "maxQt": 7942,
                "arrivalsQt": 1800,
                "factor": 1.045
        },
        {
                "district": "Sindhudurg",
                "mandi": "Sindhudurg Vidarbha Raw Cotton APMC",
                "modalQt": 7441,
                "minQt": 6707,
                "maxQt": 7965,
                "arrivalsQt": 1600,
                "factor": 1.048
        },
        {
                "district": "Raigad",
                "mandi": "Raigad Vidarbha Raw Cotton APMC",
                "modalQt": 7348,
                "minQt": 6624,
                "maxQt": 7866,
                "arrivalsQt": 2700,
                "factor": 1.035
        },
        {
                "district": "Buldhana",
                "mandi": "Buldhana Vidarbha Raw Cotton APMC",
                "modalQt": 7050,
                "minQt": 6355,
                "maxQt": 7547,
                "arrivalsQt": 3100,
                "factor": 0.993
        },
        {
                "district": "Bhandara",
                "mandi": "Bhandara Vidarbha Raw Cotton APMC",
                "modalQt": 6986,
                "minQt": 6298,
                "maxQt": 7478,
                "arrivalsQt": 2600,
                "factor": 0.984
        },
        {
                "district": "Parbhani",
                "mandi": "Parbhani Vidarbha Raw Cotton APMC",
                "modalQt": 7036,
                "minQt": 6342,
                "maxQt": 7532,
                "arrivalsQt": 2500,
                "factor": 0.991
        }
],
      history: {
        "7D": {
                "labels": [
                        "08 Sep",
                        "09 Sep",
                        "10 Sep",
                        "11 Sep",
                        "12 Sep",
                        "13 Sep",
                        "14 Sep (Today)",
                        "16 Sep (AI)",
                        "18 Sep (AI)",
                        "20 Sep (AI)"
                ],
                "historical": [
                        6603,
                        6745,
                        6816,
                        6958,
                        7029,
                        7065,
                        7100,
                        null,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        7100,
                        7242,
                        7455,
                        7597
                ],
                "mandiMin": [
                        6080,
                        6144,
                        6208,
                        6272,
                        6336,
                        6400,
                        6400,
                        null,
                        null,
                        null
                ],
                "mandiMax": [
                        7068,
                        7220,
                        7372,
                        7448,
                        7524,
                        7600,
                        7600,
                        null,
                        null,
                        null
                ]
        },
        "1M": {
                "labels": [
                        "15 Aug",
                        "22 Aug",
                        "29 Aug",
                        "05 Sep",
                        "12 Sep",
                        "14 Sep (Today)",
                        "21 Sep (AI)",
                        "28 Sep (AI)"
                ],
                "historical": [
                        6035,
                        6248,
                        6461,
                        6745,
                        6958,
                        7100,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        7100,
                        7384,
                        7668
                ],
                "mandiMin": [
                        5440,
                        5632,
                        5888,
                        6144,
                        6400,
                        6400,
                        null,
                        null
                ],
                "mandiMax": [
                        6460,
                        6688,
                        6992,
                        7296,
                        7600,
                        7600,
                        null,
                        null
                ]
        },
        "3M": {
                "labels": [
                        "Jun 26",
                        "Jul 26",
                        "Aug 26",
                        "Sep 26 (Now)",
                        "Oct 26 (AI)",
                        "Nov 26 (AI)"
                ],
                "historical": [
                        5680,
                        6106,
                        6532,
                        7100,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        7100,
                        7526,
                        7952
                ],
                "mandiMin": [
                        5120,
                        5504,
                        5888,
                        6400,
                        null,
                        null
                ],
                "mandiMax": [
                        6080,
                        6536,
                        6992,
                        7600,
                        null,
                        null
                ]
        },
        "1Y": {
                "labels": [
                        "Oct 25",
                        "Dec 25",
                        "Feb 26",
                        "Apr 26",
                        "Jun 26",
                        "Aug 26",
                        "Sep 26 (Now)"
                ],
                "historical": [
                        7455,
                        8520,
                        6035,
                        5325,
                        5680,
                        6390,
                        7100
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        7100
                ],
                "mandiMin": [
                        6720,
                        7680,
                        5440,
                        4800,
                        5120,
                        5760,
                        6400
                ],
                "mandiMax": [
                        7980,
                        9120,
                        6460,
                        5700,
                        6080,
                        6840,
                        7600
                ]
        }
}
    },
    maize: {
      key: "maize",
      name: "Yellow Maize (Malegaon Hybrid)",
      emoji: "🌽",
      hub: "Malegaon APMC Yard",
      currentModalQt: 2200,
      currentMinQt: 1950,
      currentMaxQt: 2400,
      farmGateQt: 2150,
      terminalVashiQt: 2500,
      arbitragePct: 14,
      trendPct: "+2.5%",
      trendDir: "up",
      arrivalsQt: 6200,
      arrivalsChange: "+11.0% Feed Demand",
      sentiment: "Poultry Feed & Starch Demand",
      sentimentScore: 77,
      recommendation: "High moisture-controlled feed grade maize available across Nashik and Khandesh hubs.",
      districtHubs: [
        {
                "district": "Nashik",
                "mandi": "Malegaon APMC Yard",
                "modalQt": 2200,
                "minQt": 1950,
                "maxQt": 2400,
                "arrivalsQt": 6200,
                "factor": 1
        },
        {
                "district": "Jalgaon",
                "mandi": "Chalisgaon APMC",
                "modalQt": 2180,
                "minQt": 1930,
                "maxQt": 2380,
                "arrivalsQt": 4100,
                "factor": 0.991
        },
        {
                "district": "Chhatrapati Sambhajinagar",
                "mandi": "Kannad APMC",
                "modalQt": 2220,
                "minQt": 1970,
                "maxQt": 2420,
                "arrivalsQt": 3500,
                "factor": 1.009
        },
        {
                "district": "Pune",
                "mandi": "Pune Yellow Maize APMC",
                "modalQt": 2255,
                "minQt": 1999,
                "maxQt": 2460,
                "arrivalsQt": 5400,
                "factor": 1.025
        },
        {
                "district": "Latur",
                "mandi": "Latur Yellow Maize APMC",
                "modalQt": 2189,
                "minQt": 1940,
                "maxQt": 2388,
                "arrivalsQt": 6400,
                "factor": 0.995
        },
        {
                "district": "Nagpur",
                "mandi": "Nagpur Yellow Maize APMC",
                "modalQt": 2240,
                "minQt": 1985,
                "maxQt": 2443,
                "arrivalsQt": 4900,
                "factor": 1.018
        },
        {
                "district": "Sangli",
                "mandi": "Sangli Yellow Maize APMC",
                "modalQt": 2182,
                "minQt": 1934,
                "maxQt": 2381,
                "arrivalsQt": 3600,
                "factor": 0.992
        },
        {
                "district": "Solapur",
                "mandi": "Solapur Yellow Maize APMC",
                "modalQt": 2213,
                "minQt": 1962,
                "maxQt": 2414,
                "arrivalsQt": 4500,
                "factor": 1.006
        },
        {
                "district": "Ahmednagar",
                "mandi": "Ahmednagar Yellow Maize APMC",
                "modalQt": 2171,
                "minQt": 1925,
                "maxQt": 2369,
                "arrivalsQt": 5100,
                "factor": 0.987
        },
        {
                "district": "Amravati",
                "mandi": "Amravati Yellow Maize APMC",
                "modalQt": 2187,
                "minQt": 1938,
                "maxQt": 2386,
                "arrivalsQt": 3800,
                "factor": 0.994
        },
        {
                "district": "Akola",
                "mandi": "Akola Yellow Maize APMC",
                "modalQt": 2180,
                "minQt": 1932,
                "maxQt": 2378,
                "arrivalsQt": 4100,
                "factor": 0.991
        },
        {
                "district": "Nanded",
                "mandi": "Nanded Yellow Maize APMC",
                "modalQt": 2193,
                "minQt": 1944,
                "maxQt": 2393,
                "arrivalsQt": 3200,
                "factor": 0.997
        },
        {
                "district": "Satara",
                "mandi": "Satara Yellow Maize APMC",
                "modalQt": 2226,
                "minQt": 1973,
                "maxQt": 2429,
                "arrivalsQt": 2800,
                "factor": 1.012
        },
        {
                "district": "Kolhapur",
                "mandi": "Kolhapur Yellow Maize APMC",
                "modalQt": 2248,
                "minQt": 1993,
                "maxQt": 2453,
                "arrivalsQt": 3300,
                "factor": 1.022
        },
        {
                "district": "Dhule",
                "mandi": "Dhule Yellow Maize APMC",
                "modalQt": 2158,
                "minQt": 1913,
                "maxQt": 2354,
                "arrivalsQt": 3500,
                "factor": 0.981
        },
        {
                "district": "Nandurbar",
                "mandi": "Nandurbar Yellow Maize APMC",
                "modalQt": 2152,
                "minQt": 1907,
                "maxQt": 2347,
                "arrivalsQt": 2900,
                "factor": 0.978
        },
        {
                "district": "Beed",
                "mandi": "Beed Yellow Maize APMC",
                "modalQt": 2169,
                "minQt": 1923,
                "maxQt": 2366,
                "arrivalsQt": 2400,
                "factor": 0.986
        },
        {
                "district": "Washim",
                "mandi": "Washim Yellow Maize APMC",
                "modalQt": 2185,
                "minQt": 1936,
                "maxQt": 2383,
                "arrivalsQt": 2300,
                "factor": 0.993
        },
        {
                "district": "Palghar",
                "mandi": "Palghar Yellow Maize APMC",
                "modalQt": 2233,
                "minQt": 1979,
                "maxQt": 2436,
                "arrivalsQt": 2100,
                "factor": 1.015
        },
        {
                "district": "Dharashiv",
                "mandi": "Dharashiv Yellow Maize APMC",
                "modalQt": 2176,
                "minQt": 1929,
                "maxQt": 2374,
                "arrivalsQt": 2200,
                "factor": 0.989
        },
        {
                "district": "Hingoli",
                "mandi": "Hingoli Yellow Maize APMC",
                "modalQt": 2178,
                "minQt": 1931,
                "maxQt": 2376,
                "arrivalsQt": 1900,
                "factor": 0.99
        },
        {
                "district": "Wardha",
                "mandi": "Wardha Yellow Maize APMC",
                "modalQt": 2191,
                "minQt": 1942,
                "maxQt": 2390,
                "arrivalsQt": 2400,
                "factor": 0.996
        },
        {
                "district": "Ratnagiri",
                "mandi": "Ratnagiri Yellow Maize APMC",
                "modalQt": 2299,
                "minQt": 2038,
                "maxQt": 2508,
                "arrivalsQt": 1800,
                "factor": 1.045
        },
        {
                "district": "Sindhudurg",
                "mandi": "Sindhudurg Yellow Maize APMC",
                "modalQt": 2306,
                "minQt": 2044,
                "maxQt": 2515,
                "arrivalsQt": 1600,
                "factor": 1.048
        },
        {
                "district": "Raigad",
                "mandi": "Raigad Yellow Maize APMC",
                "modalQt": 2277,
                "minQt": 2018,
                "maxQt": 2484,
                "arrivalsQt": 2700,
                "factor": 1.035
        },
        {
                "district": "Yavatmal",
                "mandi": "Yavatmal Yellow Maize APMC",
                "modalQt": 2171,
                "minQt": 1925,
                "maxQt": 2369,
                "arrivalsQt": 3300,
                "factor": 0.987
        },
        {
                "district": "Buldhana",
                "mandi": "Buldhana Yellow Maize APMC",
                "modalQt": 2185,
                "minQt": 1936,
                "maxQt": 2383,
                "arrivalsQt": 3100,
                "factor": 0.993
        },
        {
                "district": "Bhandara",
                "mandi": "Bhandara Yellow Maize APMC",
                "modalQt": 2165,
                "minQt": 1919,
                "maxQt": 2362,
                "arrivalsQt": 2600,
                "factor": 0.984
        },
        {
                "district": "Jalna",
                "mandi": "Jalna Yellow Maize APMC",
                "modalQt": 2191,
                "minQt": 1942,
                "maxQt": 2390,
                "arrivalsQt": 3200,
                "factor": 0.996
        },
        {
                "district": "Parbhani",
                "mandi": "Parbhani Yellow Maize APMC",
                "modalQt": 2180,
                "minQt": 1932,
                "maxQt": 2378,
                "arrivalsQt": 2500,
                "factor": 0.991
        }
],
      history: {
        "7D": {
                "labels": [
                        "08 Sep",
                        "09 Sep",
                        "10 Sep",
                        "11 Sep",
                        "12 Sep",
                        "13 Sep",
                        "14 Sep (Today)",
                        "16 Sep (AI)",
                        "18 Sep (AI)",
                        "20 Sep (AI)"
                ],
                "historical": [
                        2046,
                        2090,
                        2112,
                        2156,
                        2178,
                        2189,
                        2200,
                        null,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        2200,
                        2244,
                        2310,
                        2354
                ],
                "mandiMin": [
                        1853,
                        1872,
                        1892,
                        1911,
                        1931,
                        1950,
                        1950,
                        null,
                        null,
                        null
                ],
                "mandiMax": [
                        2232,
                        2280,
                        2328,
                        2352,
                        2376,
                        2400,
                        2400,
                        null,
                        null,
                        null
                ]
        },
        "1M": {
                "labels": [
                        "15 Aug",
                        "22 Aug",
                        "29 Aug",
                        "05 Sep",
                        "12 Sep",
                        "14 Sep (Today)",
                        "21 Sep (AI)",
                        "28 Sep (AI)"
                ],
                "historical": [
                        1870,
                        1936,
                        2002,
                        2090,
                        2156,
                        2200,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        2200,
                        2288,
                        2376
                ],
                "mandiMin": [
                        1658,
                        1716,
                        1794,
                        1872,
                        1950,
                        1950,
                        null,
                        null
                ],
                "mandiMax": [
                        2040,
                        2112,
                        2208,
                        2304,
                        2400,
                        2400,
                        null,
                        null
                ]
        },
        "3M": {
                "labels": [
                        "Jun 26",
                        "Jul 26",
                        "Aug 26",
                        "Sep 26 (Now)",
                        "Oct 26 (AI)",
                        "Nov 26 (AI)"
                ],
                "historical": [
                        1760,
                        1892,
                        2024,
                        2200,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        2200,
                        2332,
                        2464
                ],
                "mandiMin": [
                        1560,
                        1677,
                        1794,
                        1950,
                        null,
                        null
                ],
                "mandiMax": [
                        1920,
                        2064,
                        2208,
                        2400,
                        null,
                        null
                ]
        },
        "1Y": {
                "labels": [
                        "Oct 25",
                        "Dec 25",
                        "Feb 26",
                        "Apr 26",
                        "Jun 26",
                        "Aug 26",
                        "Sep 26 (Now)"
                ],
                "historical": [
                        2310,
                        2640,
                        1870,
                        1650,
                        1760,
                        1980,
                        2200
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        2200
                ],
                "mandiMin": [
                        2048,
                        2340,
                        1658,
                        1463,
                        1560,
                        1755,
                        1950
                ],
                "mandiMax": [
                        2520,
                        2880,
                        2040,
                        1800,
                        1920,
                        2160,
                        2400
                ]
        }
}
    },
    safflower: {
      key: "safflower",
      name: "Safflower Seeds (Kardi High-Oil)",
      emoji: "🌼",
      hub: "Solapur APMC Market Yard",
      currentModalQt: 5600,
      currentMinQt: 5100,
      currentMaxQt: 6000,
      farmGateQt: 5500,
      terminalVashiQt: 6300,
      arbitragePct: 12.7,
      trendPct: "+1.9%",
      trendDir: "up",
      arrivalsQt: 1800,
      arrivalsChange: "+5.2% Oil Mills",
      sentiment: "Steady Cold-Press Demand",
      sentimentScore: 74,
      recommendation: "High linoleic oil content seeds available in Solapur & Dharashiv APMCs.",
      districtHubs: [
        {
                "district": "Solapur",
                "mandi": "Barshi APMC Yard",
                "modalQt": 5600,
                "minQt": 5100,
                "maxQt": 6000,
                "arrivalsQt": 1800,
                "factor": 1
        },
        {
                "district": "Dharashiv",
                "mandi": "Dharashiv APMC",
                "modalQt": 5550,
                "minQt": 5050,
                "maxQt": 5950,
                "arrivalsQt": 1400,
                "factor": 0.991
        },
        {
                "district": "Latur",
                "mandi": "Ausa APMC",
                "modalQt": 5620,
                "minQt": 5120,
                "maxQt": 6020,
                "arrivalsQt": 1200,
                "factor": 1.003
        },
        {
                "district": "Nashik",
                "mandi": "Nashik Safflower Seeds APMC",
                "modalQt": 5600,
                "minQt": 5100,
                "maxQt": 6000,
                "arrivalsQt": 6850,
                "factor": 1
        },
        {
                "district": "Pune",
                "mandi": "Pune Safflower Seeds APMC",
                "modalQt": 5740,
                "minQt": 5228,
                "maxQt": 6150,
                "arrivalsQt": 5400,
                "factor": 1.025
        },
        {
                "district": "Jalgaon",
                "mandi": "Jalgaon Safflower Seeds APMC",
                "modalQt": 5499,
                "minQt": 5008,
                "maxQt": 5892,
                "arrivalsQt": 4200,
                "factor": 0.982
        },
        {
                "district": "Nagpur",
                "mandi": "Nagpur Safflower Seeds APMC",
                "modalQt": 5701,
                "minQt": 5192,
                "maxQt": 6108,
                "arrivalsQt": 4900,
                "factor": 1.018
        },
        {
                "district": "Sangli",
                "mandi": "Sangli Safflower Seeds APMC",
                "modalQt": 5555,
                "minQt": 5059,
                "maxQt": 5952,
                "arrivalsQt": 3600,
                "factor": 0.992
        },
        {
                "district": "Ahmednagar",
                "mandi": "Ahmednagar Safflower Seeds APMC",
                "modalQt": 5527,
                "minQt": 5034,
                "maxQt": 5922,
                "arrivalsQt": 5100,
                "factor": 0.987
        },
        {
                "district": "Amravati",
                "mandi": "Amravati Safflower Seeds APMC",
                "modalQt": 5566,
                "minQt": 5069,
                "maxQt": 5964,
                "arrivalsQt": 3800,
                "factor": 0.994
        },
        {
                "district": "Akola",
                "mandi": "Akola Safflower Seeds APMC",
                "modalQt": 5550,
                "minQt": 5054,
                "maxQt": 5946,
                "arrivalsQt": 4100,
                "factor": 0.991
        },
        {
                "district": "Nanded",
                "mandi": "Nanded Safflower Seeds APMC",
                "modalQt": 5583,
                "minQt": 5085,
                "maxQt": 5982,
                "arrivalsQt": 3200,
                "factor": 0.997
        },
        {
                "district": "Satara",
                "mandi": "Satara Safflower Seeds APMC",
                "modalQt": 5667,
                "minQt": 5161,
                "maxQt": 6072,
                "arrivalsQt": 2800,
                "factor": 1.012
        },
        {
                "district": "Kolhapur",
                "mandi": "Kolhapur Safflower Seeds APMC",
                "modalQt": 5723,
                "minQt": 5212,
                "maxQt": 6132,
                "arrivalsQt": 3300,
                "factor": 1.022
        },
        {
                "district": "Dhule",
                "mandi": "Dhule Safflower Seeds APMC",
                "modalQt": 5494,
                "minQt": 5003,
                "maxQt": 5886,
                "arrivalsQt": 3500,
                "factor": 0.981
        },
        {
                "district": "Nandurbar",
                "mandi": "Nandurbar Safflower Seeds APMC",
                "modalQt": 5477,
                "minQt": 4988,
                "maxQt": 5868,
                "arrivalsQt": 2900,
                "factor": 0.978
        },
        {
                "district": "Beed",
                "mandi": "Beed Safflower Seeds APMC",
                "modalQt": 5522,
                "minQt": 5029,
                "maxQt": 5916,
                "arrivalsQt": 2400,
                "factor": 0.986
        },
        {
                "district": "Washim",
                "mandi": "Washim Safflower Seeds APMC",
                "modalQt": 5561,
                "minQt": 5064,
                "maxQt": 5958,
                "arrivalsQt": 2300,
                "factor": 0.993
        },
        {
                "district": "Palghar",
                "mandi": "Palghar Safflower Seeds APMC",
                "modalQt": 5684,
                "minQt": 5176,
                "maxQt": 6090,
                "arrivalsQt": 2100,
                "factor": 1.015
        },
        {
                "district": "Chhatrapati Sambhajinagar",
                "mandi": "Chhatrapati Sambhajinagar Safflower Seeds APMC",
                "modalQt": 5634,
                "minQt": 5131,
                "maxQt": 6036,
                "arrivalsQt": 3400,
                "factor": 1.006
        },
        {
                "district": "Hingoli",
                "mandi": "Hingoli Safflower Seeds APMC",
                "modalQt": 5544,
                "minQt": 5049,
                "maxQt": 5940,
                "arrivalsQt": 1900,
                "factor": 0.99
        },
        {
                "district": "Wardha",
                "mandi": "Wardha Safflower Seeds APMC",
                "modalQt": 5578,
                "minQt": 5080,
                "maxQt": 5976,
                "arrivalsQt": 2400,
                "factor": 0.996
        },
        {
                "district": "Ratnagiri",
                "mandi": "Ratnagiri Safflower Seeds APMC",
                "modalQt": 5852,
                "minQt": 5330,
                "maxQt": 6270,
                "arrivalsQt": 1800,
                "factor": 1.045
        },
        {
                "district": "Sindhudurg",
                "mandi": "Sindhudurg Safflower Seeds APMC",
                "modalQt": 5869,
                "minQt": 5345,
                "maxQt": 6288,
                "arrivalsQt": 1600,
                "factor": 1.048
        },
        {
                "district": "Raigad",
                "mandi": "Raigad Safflower Seeds APMC",
                "modalQt": 5796,
                "minQt": 5279,
                "maxQt": 6210,
                "arrivalsQt": 2700,
                "factor": 1.035
        },
        {
                "district": "Yavatmal",
                "mandi": "Yavatmal Safflower Seeds APMC",
                "modalQt": 5527,
                "minQt": 5034,
                "maxQt": 5922,
                "arrivalsQt": 3300,
                "factor": 0.987
        },
        {
                "district": "Buldhana",
                "mandi": "Buldhana Safflower Seeds APMC",
                "modalQt": 5561,
                "minQt": 5064,
                "maxQt": 5958,
                "arrivalsQt": 3100,
                "factor": 0.993
        },
        {
                "district": "Bhandara",
                "mandi": "Bhandara Safflower Seeds APMC",
                "modalQt": 5510,
                "minQt": 5018,
                "maxQt": 5904,
                "arrivalsQt": 2600,
                "factor": 0.984
        },
        {
                "district": "Jalna",
                "mandi": "Jalna Safflower Seeds APMC",
                "modalQt": 5578,
                "minQt": 5080,
                "maxQt": 5976,
                "arrivalsQt": 3200,
                "factor": 0.996
        },
        {
                "district": "Parbhani",
                "mandi": "Parbhani Safflower Seeds APMC",
                "modalQt": 5550,
                "minQt": 5054,
                "maxQt": 5946,
                "arrivalsQt": 2500,
                "factor": 0.991
        }
],
      history: {
        "7D": {
                "labels": [
                        "08 Sep",
                        "09 Sep",
                        "10 Sep",
                        "11 Sep",
                        "12 Sep",
                        "13 Sep",
                        "14 Sep (Today)",
                        "16 Sep (AI)",
                        "18 Sep (AI)",
                        "20 Sep (AI)"
                ],
                "historical": [
                        5208,
                        5320,
                        5376,
                        5488,
                        5544,
                        5572,
                        5600,
                        null,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        5600,
                        5712,
                        5880,
                        5992
                ],
                "mandiMin": [
                        4845,
                        4896,
                        4947,
                        4998,
                        5049,
                        5100,
                        5100,
                        null,
                        null,
                        null
                ],
                "mandiMax": [
                        5580,
                        5700,
                        5820,
                        5880,
                        5940,
                        6000,
                        6000,
                        null,
                        null,
                        null
                ]
        },
        "1M": {
                "labels": [
                        "15 Aug",
                        "22 Aug",
                        "29 Aug",
                        "05 Sep",
                        "12 Sep",
                        "14 Sep (Today)",
                        "21 Sep (AI)",
                        "28 Sep (AI)"
                ],
                "historical": [
                        4760,
                        4928,
                        5096,
                        5320,
                        5488,
                        5600,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        5600,
                        5824,
                        6048
                ],
                "mandiMin": [
                        4335,
                        4488,
                        4692,
                        4896,
                        5100,
                        5100,
                        null,
                        null
                ],
                "mandiMax": [
                        5100,
                        5280,
                        5520,
                        5760,
                        6000,
                        6000,
                        null,
                        null
                ]
        },
        "3M": {
                "labels": [
                        "Jun 26",
                        "Jul 26",
                        "Aug 26",
                        "Sep 26 (Now)",
                        "Oct 26 (AI)",
                        "Nov 26 (AI)"
                ],
                "historical": [
                        4480,
                        4816,
                        5152,
                        5600,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        5600,
                        5936,
                        6272
                ],
                "mandiMin": [
                        4080,
                        4386,
                        4692,
                        5100,
                        null,
                        null
                ],
                "mandiMax": [
                        4800,
                        5160,
                        5520,
                        6000,
                        null,
                        null
                ]
        },
        "1Y": {
                "labels": [
                        "Oct 25",
                        "Dec 25",
                        "Feb 26",
                        "Apr 26",
                        "Jun 26",
                        "Aug 26",
                        "Sep 26 (Now)"
                ],
                "historical": [
                        5880,
                        6720,
                        4760,
                        4200,
                        4480,
                        5040,
                        5600
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        5600
                ],
                "mandiMin": [
                        5355,
                        6120,
                        4335,
                        3825,
                        4080,
                        4590,
                        5100
                ],
                "mandiMax": [
                        6300,
                        7200,
                        5100,
                        4500,
                        4800,
                        5400,
                        6000
                ]
        }
}
    },
    sesame: {
      key: "sesame",
      name: "White Sesame (Til Export Grade)",
      emoji: "⚪",
      hub: "Dhule APMC Yard",
      currentModalQt: 13500,
      currentMinQt: 12000,
      currentMaxQt: 14800,
      farmGateQt: 13200,
      terminalVashiQt: 15500,
      arbitragePct: 14.8,
      trendPct: "+6.2%",
      trendDir: "up",
      arrivalsQt: 1200,
      arrivalsChange: "+3.5% Premium",
      sentiment: "Bullish Export Demand",
      sentimentScore: 89,
      recommendation: "Natural white 99.5% purity sesame available in Dhule & Jalgaon hubs for confectionery & oil extraction.",
      districtHubs: [
        {
                "district": "Dhule",
                "mandi": "Shirpur APMC",
                "modalQt": 13500,
                "minQt": 12000,
                "maxQt": 14800,
                "arrivalsQt": 1200,
                "factor": 1
        },
        {
                "district": "Jalgaon",
                "mandi": "Chopda APMC",
                "modalQt": 13450,
                "minQt": 11950,
                "maxQt": 14750,
                "arrivalsQt": 950,
                "factor": 0.996
        },
        {
                "district": "Nandurbar",
                "mandi": "Shahada APMC",
                "modalQt": 13550,
                "minQt": 12050,
                "maxQt": 14850,
                "arrivalsQt": 800,
                "factor": 1.003
        },
        {
                "district": "Nashik",
                "mandi": "Nashik White Sesame APMC",
                "modalQt": 13500,
                "minQt": 12000,
                "maxQt": 14800,
                "arrivalsQt": 6850,
                "factor": 1
        },
        {
                "district": "Pune",
                "mandi": "Pune White Sesame APMC",
                "modalQt": 13837,
                "minQt": 12300,
                "maxQt": 15170,
                "arrivalsQt": 5400,
                "factor": 1.025
        },
        {
                "district": "Latur",
                "mandi": "Latur White Sesame APMC",
                "modalQt": 13433,
                "minQt": 11940,
                "maxQt": 14726,
                "arrivalsQt": 6400,
                "factor": 0.995
        },
        {
                "district": "Nagpur",
                "mandi": "Nagpur White Sesame APMC",
                "modalQt": 13743,
                "minQt": 12216,
                "maxQt": 15066,
                "arrivalsQt": 4900,
                "factor": 1.018
        },
        {
                "district": "Sangli",
                "mandi": "Sangli White Sesame APMC",
                "modalQt": 13392,
                "minQt": 11904,
                "maxQt": 14682,
                "arrivalsQt": 3600,
                "factor": 0.992
        },
        {
                "district": "Solapur",
                "mandi": "Solapur White Sesame APMC",
                "modalQt": 13581,
                "minQt": 12072,
                "maxQt": 14889,
                "arrivalsQt": 4500,
                "factor": 1.006
        },
        {
                "district": "Ahmednagar",
                "mandi": "Ahmednagar White Sesame APMC",
                "modalQt": 13325,
                "minQt": 11844,
                "maxQt": 14608,
                "arrivalsQt": 5100,
                "factor": 0.987
        },
        {
                "district": "Amravati",
                "mandi": "Amravati White Sesame APMC",
                "modalQt": 13419,
                "minQt": 11928,
                "maxQt": 14711,
                "arrivalsQt": 3800,
                "factor": 0.994
        },
        {
                "district": "Akola",
                "mandi": "Akola White Sesame APMC",
                "modalQt": 13379,
                "minQt": 11892,
                "maxQt": 14667,
                "arrivalsQt": 4100,
                "factor": 0.991
        },
        {
                "district": "Nanded",
                "mandi": "Nanded White Sesame APMC",
                "modalQt": 13460,
                "minQt": 11964,
                "maxQt": 14756,
                "arrivalsQt": 3200,
                "factor": 0.997
        },
        {
                "district": "Satara",
                "mandi": "Satara White Sesame APMC",
                "modalQt": 13662,
                "minQt": 12144,
                "maxQt": 14978,
                "arrivalsQt": 2800,
                "factor": 1.012
        },
        {
                "district": "Kolhapur",
                "mandi": "Kolhapur White Sesame APMC",
                "modalQt": 13797,
                "minQt": 12264,
                "maxQt": 15126,
                "arrivalsQt": 3300,
                "factor": 1.022
        },
        {
                "district": "Beed",
                "mandi": "Beed White Sesame APMC",
                "modalQt": 13311,
                "minQt": 11832,
                "maxQt": 14593,
                "arrivalsQt": 2400,
                "factor": 0.986
        },
        {
                "district": "Washim",
                "mandi": "Washim White Sesame APMC",
                "modalQt": 13406,
                "minQt": 11916,
                "maxQt": 14696,
                "arrivalsQt": 2300,
                "factor": 0.993
        },
        {
                "district": "Palghar",
                "mandi": "Palghar White Sesame APMC",
                "modalQt": 13702,
                "minQt": 12180,
                "maxQt": 15022,
                "arrivalsQt": 2100,
                "factor": 1.015
        },
        {
                "district": "Dharashiv",
                "mandi": "Dharashiv White Sesame APMC",
                "modalQt": 13352,
                "minQt": 11868,
                "maxQt": 14637,
                "arrivalsQt": 2200,
                "factor": 0.989
        },
        {
                "district": "Chhatrapati Sambhajinagar",
                "mandi": "Chhatrapati Sambhajinagar White Sesame APMC",
                "modalQt": 13581,
                "minQt": 12072,
                "maxQt": 14889,
                "arrivalsQt": 3400,
                "factor": 1.006
        },
        {
                "district": "Hingoli",
                "mandi": "Hingoli White Sesame APMC",
                "modalQt": 13365,
                "minQt": 11880,
                "maxQt": 14652,
                "arrivalsQt": 1900,
                "factor": 0.99
        },
        {
                "district": "Wardha",
                "mandi": "Wardha White Sesame APMC",
                "modalQt": 13446,
                "minQt": 11952,
                "maxQt": 14741,
                "arrivalsQt": 2400,
                "factor": 0.996
        },
        {
                "district": "Ratnagiri",
                "mandi": "Ratnagiri White Sesame APMC",
                "modalQt": 14107,
                "minQt": 12540,
                "maxQt": 15466,
                "arrivalsQt": 1800,
                "factor": 1.045
        },
        {
                "district": "Sindhudurg",
                "mandi": "Sindhudurg White Sesame APMC",
                "modalQt": 14148,
                "minQt": 12576,
                "maxQt": 15510,
                "arrivalsQt": 1600,
                "factor": 1.048
        },
        {
                "district": "Raigad",
                "mandi": "Raigad White Sesame APMC",
                "modalQt": 13972,
                "minQt": 12420,
                "maxQt": 15318,
                "arrivalsQt": 2700,
                "factor": 1.035
        },
        {
                "district": "Yavatmal",
                "mandi": "Yavatmal White Sesame APMC",
                "modalQt": 13325,
                "minQt": 11844,
                "maxQt": 14608,
                "arrivalsQt": 3300,
                "factor": 0.987
        },
        {
                "district": "Buldhana",
                "mandi": "Buldhana White Sesame APMC",
                "modalQt": 13406,
                "minQt": 11916,
                "maxQt": 14696,
                "arrivalsQt": 3100,
                "factor": 0.993
        },
        {
                "district": "Bhandara",
                "mandi": "Bhandara White Sesame APMC",
                "modalQt": 13284,
                "minQt": 11808,
                "maxQt": 14563,
                "arrivalsQt": 2600,
                "factor": 0.984
        },
        {
                "district": "Jalna",
                "mandi": "Jalna White Sesame APMC",
                "modalQt": 13446,
                "minQt": 11952,
                "maxQt": 14741,
                "arrivalsQt": 3200,
                "factor": 0.996
        },
        {
                "district": "Parbhani",
                "mandi": "Parbhani White Sesame APMC",
                "modalQt": 13379,
                "minQt": 11892,
                "maxQt": 14667,
                "arrivalsQt": 2500,
                "factor": 0.991
        }
],
      history: {
        "7D": {
                "labels": [
                        "08 Sep",
                        "09 Sep",
                        "10 Sep",
                        "11 Sep",
                        "12 Sep",
                        "13 Sep",
                        "14 Sep (Today)",
                        "16 Sep (AI)",
                        "18 Sep (AI)",
                        "20 Sep (AI)"
                ],
                "historical": [
                        12555,
                        12825,
                        12960,
                        13230,
                        13365,
                        13433,
                        13500,
                        null,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        13500,
                        13770,
                        14175,
                        14445
                ],
                "mandiMin": [
                        11400,
                        11520,
                        11640,
                        11760,
                        11880,
                        12000,
                        12000,
                        null,
                        null,
                        null
                ],
                "mandiMax": [
                        13764,
                        14060,
                        14356,
                        14504,
                        14652,
                        14800,
                        14800,
                        null,
                        null,
                        null
                ]
        },
        "1M": {
                "labels": [
                        "15 Aug",
                        "22 Aug",
                        "29 Aug",
                        "05 Sep",
                        "12 Sep",
                        "14 Sep (Today)",
                        "21 Sep (AI)",
                        "28 Sep (AI)"
                ],
                "historical": [
                        11475,
                        11880,
                        12285,
                        12825,
                        13230,
                        13500,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        13500,
                        14040,
                        14580
                ],
                "mandiMin": [
                        10200,
                        10560,
                        11040,
                        11520,
                        12000,
                        12000,
                        null,
                        null
                ],
                "mandiMax": [
                        12580,
                        13024,
                        13616,
                        14208,
                        14800,
                        14800,
                        null,
                        null
                ]
        },
        "3M": {
                "labels": [
                        "Jun 26",
                        "Jul 26",
                        "Aug 26",
                        "Sep 26 (Now)",
                        "Oct 26 (AI)",
                        "Nov 26 (AI)"
                ],
                "historical": [
                        10800,
                        11610,
                        12420,
                        13500,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        13500,
                        14310,
                        15120
                ],
                "mandiMin": [
                        9600,
                        10320,
                        11040,
                        12000,
                        null,
                        null
                ],
                "mandiMax": [
                        11840,
                        12728,
                        13616,
                        14800,
                        null,
                        null
                ]
        },
        "1Y": {
                "labels": [
                        "Oct 25",
                        "Dec 25",
                        "Feb 26",
                        "Apr 26",
                        "Jun 26",
                        "Aug 26",
                        "Sep 26 (Now)"
                ],
                "historical": [
                        14175,
                        16200,
                        11475,
                        10125,
                        10800,
                        12150,
                        13500
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        13500
                ],
                "mandiMin": [
                        12600,
                        14400,
                        10200,
                        9000,
                        9600,
                        10800,
                        12000
                ],
                "mandiMax": [
                        15540,
                        17760,
                        12580,
                        11100,
                        11840,
                        13320,
                        14800
                ]
        }
}
    },
    chilli: {
      key: "chilli",
      name: "Dry Red Chilli (Nandurbar Teja)",
      emoji: "🌶️",
      hub: "Nandurbar Chilli Yard",
      currentModalQt: 18000,
      currentMinQt: 16000,
      currentMaxQt: 20500,
      farmGateQt: 17600,
      terminalVashiQt: 21000,
      arbitragePct: 16.2,
      trendPct: "+7.1%",
      trendDir: "up",
      arrivalsQt: 2400,
      arrivalsChange: "+7.8% Spice Mills",
      sentiment: "High Pungency Premium",
      sentimentScore: 87,
      recommendation: "High SHU capsaicin Teja and Guntur varieties in Nandurbar market yard.",
      districtHubs: [
        {
                "district": "Nandurbar",
                "mandi": "Nandurbar Chilli Yard",
                "modalQt": 18000,
                "minQt": 16000,
                "maxQt": 20500,
                "arrivalsQt": 2400,
                "factor": 1
        },
        {
                "district": "Nagpur",
                "mandi": "Bhiwapur Chilli APMC",
                "modalQt": 17900,
                "minQt": 15900,
                "maxQt": 20400,
                "arrivalsQt": 1900,
                "factor": 0.994
        },
        {
                "district": "Solapur",
                "mandi": "Karmala APMC",
                "modalQt": 18100,
                "minQt": 16100,
                "maxQt": 20600,
                "arrivalsQt": 1100,
                "factor": 1.005
        },
        {
                "district": "Nashik",
                "mandi": "Nashik Dry Red Chilli APMC",
                "modalQt": 18000,
                "minQt": 16000,
                "maxQt": 20500,
                "arrivalsQt": 6850,
                "factor": 1
        },
        {
                "district": "Pune",
                "mandi": "Pune Dry Red Chilli APMC",
                "modalQt": 18450,
                "minQt": 16400,
                "maxQt": 21012,
                "arrivalsQt": 5400,
                "factor": 1.025
        },
        {
                "district": "Jalgaon",
                "mandi": "Jalgaon Dry Red Chilli APMC",
                "modalQt": 17676,
                "minQt": 15712,
                "maxQt": 20131,
                "arrivalsQt": 4200,
                "factor": 0.982
        },
        {
                "district": "Latur",
                "mandi": "Latur Dry Red Chilli APMC",
                "modalQt": 17910,
                "minQt": 15920,
                "maxQt": 20398,
                "arrivalsQt": 6400,
                "factor": 0.995
        },
        {
                "district": "Sangli",
                "mandi": "Sangli Dry Red Chilli APMC",
                "modalQt": 17856,
                "minQt": 15872,
                "maxQt": 20336,
                "arrivalsQt": 3600,
                "factor": 0.992
        },
        {
                "district": "Ahmednagar",
                "mandi": "Ahmednagar Dry Red Chilli APMC",
                "modalQt": 17766,
                "minQt": 15792,
                "maxQt": 20234,
                "arrivalsQt": 5100,
                "factor": 0.987
        },
        {
                "district": "Amravati",
                "mandi": "Amravati Dry Red Chilli APMC",
                "modalQt": 17892,
                "minQt": 15904,
                "maxQt": 20377,
                "arrivalsQt": 3800,
                "factor": 0.994
        },
        {
                "district": "Akola",
                "mandi": "Akola Dry Red Chilli APMC",
                "modalQt": 17838,
                "minQt": 15856,
                "maxQt": 20316,
                "arrivalsQt": 4100,
                "factor": 0.991
        },
        {
                "district": "Nanded",
                "mandi": "Nanded Dry Red Chilli APMC",
                "modalQt": 17946,
                "minQt": 15952,
                "maxQt": 20439,
                "arrivalsQt": 3200,
                "factor": 0.997
        },
        {
                "district": "Satara",
                "mandi": "Satara Dry Red Chilli APMC",
                "modalQt": 18216,
                "minQt": 16192,
                "maxQt": 20746,
                "arrivalsQt": 2800,
                "factor": 1.012
        },
        {
                "district": "Kolhapur",
                "mandi": "Kolhapur Dry Red Chilli APMC",
                "modalQt": 18396,
                "minQt": 16352,
                "maxQt": 20951,
                "arrivalsQt": 3300,
                "factor": 1.022
        },
        {
                "district": "Dhule",
                "mandi": "Dhule Dry Red Chilli APMC",
                "modalQt": 17658,
                "minQt": 15696,
                "maxQt": 20111,
                "arrivalsQt": 3500,
                "factor": 0.981
        },
        {
                "district": "Beed",
                "mandi": "Beed Dry Red Chilli APMC",
                "modalQt": 17748,
                "minQt": 15776,
                "maxQt": 20213,
                "arrivalsQt": 2400,
                "factor": 0.986
        },
        {
                "district": "Washim",
                "mandi": "Washim Dry Red Chilli APMC",
                "modalQt": 17874,
                "minQt": 15888,
                "maxQt": 20357,
                "arrivalsQt": 2300,
                "factor": 0.993
        },
        {
                "district": "Palghar",
                "mandi": "Palghar Dry Red Chilli APMC",
                "modalQt": 18270,
                "minQt": 16240,
                "maxQt": 20807,
                "arrivalsQt": 2100,
                "factor": 1.015
        },
        {
                "district": "Dharashiv",
                "mandi": "Dharashiv Dry Red Chilli APMC",
                "modalQt": 17802,
                "minQt": 15824,
                "maxQt": 20275,
                "arrivalsQt": 2200,
                "factor": 0.989
        },
        {
                "district": "Chhatrapati Sambhajinagar",
                "mandi": "Chhatrapati Sambhajinagar Dry Red Chilli APMC",
                "modalQt": 18108,
                "minQt": 16096,
                "maxQt": 20623,
                "arrivalsQt": 3400,
                "factor": 1.006
        },
        {
                "district": "Hingoli",
                "mandi": "Hingoli Dry Red Chilli APMC",
                "modalQt": 17820,
                "minQt": 15840,
                "maxQt": 20295,
                "arrivalsQt": 1900,
                "factor": 0.99
        },
        {
                "district": "Wardha",
                "mandi": "Wardha Dry Red Chilli APMC",
                "modalQt": 17928,
                "minQt": 15936,
                "maxQt": 20418,
                "arrivalsQt": 2400,
                "factor": 0.996
        },
        {
                "district": "Ratnagiri",
                "mandi": "Ratnagiri Dry Red Chilli APMC",
                "modalQt": 18810,
                "minQt": 16720,
                "maxQt": 21423,
                "arrivalsQt": 1800,
                "factor": 1.045
        },
        {
                "district": "Sindhudurg",
                "mandi": "Sindhudurg Dry Red Chilli APMC",
                "modalQt": 18864,
                "minQt": 16768,
                "maxQt": 21484,
                "arrivalsQt": 1600,
                "factor": 1.048
        },
        {
                "district": "Raigad",
                "mandi": "Raigad Dry Red Chilli APMC",
                "modalQt": 18630,
                "minQt": 16560,
                "maxQt": 21218,
                "arrivalsQt": 2700,
                "factor": 1.035
        },
        {
                "district": "Yavatmal",
                "mandi": "Yavatmal Dry Red Chilli APMC",
                "modalQt": 17766,
                "minQt": 15792,
                "maxQt": 20234,
                "arrivalsQt": 3300,
                "factor": 0.987
        },
        {
                "district": "Buldhana",
                "mandi": "Buldhana Dry Red Chilli APMC",
                "modalQt": 17874,
                "minQt": 15888,
                "maxQt": 20357,
                "arrivalsQt": 3100,
                "factor": 0.993
        },
        {
                "district": "Bhandara",
                "mandi": "Bhandara Dry Red Chilli APMC",
                "modalQt": 17712,
                "minQt": 15744,
                "maxQt": 20172,
                "arrivalsQt": 2600,
                "factor": 0.984
        },
        {
                "district": "Jalna",
                "mandi": "Jalna Dry Red Chilli APMC",
                "modalQt": 17928,
                "minQt": 15936,
                "maxQt": 20418,
                "arrivalsQt": 3200,
                "factor": 0.996
        },
        {
                "district": "Parbhani",
                "mandi": "Parbhani Dry Red Chilli APMC",
                "modalQt": 17838,
                "minQt": 15856,
                "maxQt": 20316,
                "arrivalsQt": 2500,
                "factor": 0.991
        }
],
      history: {
        "7D": {
                "labels": [
                        "08 Sep",
                        "09 Sep",
                        "10 Sep",
                        "11 Sep",
                        "12 Sep",
                        "13 Sep",
                        "14 Sep (Today)",
                        "16 Sep (AI)",
                        "18 Sep (AI)",
                        "20 Sep (AI)"
                ],
                "historical": [
                        16740,
                        17100,
                        17280,
                        17640,
                        17820,
                        17910,
                        18000,
                        null,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        18000,
                        18360,
                        18900,
                        19260
                ],
                "mandiMin": [
                        15200,
                        15360,
                        15520,
                        15680,
                        15840,
                        16000,
                        16000,
                        null,
                        null,
                        null
                ],
                "mandiMax": [
                        19065,
                        19475,
                        19885,
                        20090,
                        20295,
                        20500,
                        20500,
                        null,
                        null,
                        null
                ]
        },
        "1M": {
                "labels": [
                        "15 Aug",
                        "22 Aug",
                        "29 Aug",
                        "05 Sep",
                        "12 Sep",
                        "14 Sep (Today)",
                        "21 Sep (AI)",
                        "28 Sep (AI)"
                ],
                "historical": [
                        15300,
                        15840,
                        16380,
                        17100,
                        17640,
                        18000,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        18000,
                        18720,
                        19440
                ],
                "mandiMin": [
                        13600,
                        14080,
                        14720,
                        15360,
                        16000,
                        16000,
                        null,
                        null
                ],
                "mandiMax": [
                        17425,
                        18040,
                        18860,
                        19680,
                        20500,
                        20500,
                        null,
                        null
                ]
        },
        "3M": {
                "labels": [
                        "Jun 26",
                        "Jul 26",
                        "Aug 26",
                        "Sep 26 (Now)",
                        "Oct 26 (AI)",
                        "Nov 26 (AI)"
                ],
                "historical": [
                        14400,
                        15480,
                        16560,
                        18000,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        18000,
                        19080,
                        20160
                ],
                "mandiMin": [
                        12800,
                        13760,
                        14720,
                        16000,
                        null,
                        null
                ],
                "mandiMax": [
                        16400,
                        17630,
                        18860,
                        20500,
                        null,
                        null
                ]
        },
        "1Y": {
                "labels": [
                        "Oct 25",
                        "Dec 25",
                        "Feb 26",
                        "Apr 26",
                        "Jun 26",
                        "Aug 26",
                        "Sep 26 (Now)"
                ],
                "historical": [
                        18900,
                        21600,
                        15300,
                        13500,
                        14400,
                        16200,
                        18000
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        18000
                ],
                "mandiMin": [
                        16800,
                        19200,
                        13600,
                        12000,
                        12800,
                        14400,
                        16000
                ],
                "mandiMax": [
                        21525,
                        24600,
                        17425,
                        15375,
                        16400,
                        18450,
                        20500
                ]
        }
}
    },
    guava: {
      key: "guava",
      name: "Sweet Guava (Rahata L-49)",
      emoji: "🍈",
      hub: "Rahata APMC Market",
      currentModalQt: 3200,
      currentMinQt: 2700,
      currentMaxQt: 3600,
      farmGateQt: 3100,
      terminalVashiQt: 3750,
      arbitragePct: 17.3,
      trendPct: "+3.0%",
      trendDir: "up",
      arrivalsQt: 2900,
      arrivalsChange: "+14.0% Fresh Harvest",
      sentiment: "Retail & Pulp Processing Demand",
      sentimentScore: 78,
      recommendation: "Fresh Sardar L-49 table guava harvested daily in Ahmednagar belt.",
      districtHubs: [
        {
                "district": "Ahmednagar",
                "mandi": "Rahata APMC Market",
                "modalQt": 3200,
                "minQt": 2700,
                "maxQt": 3600,
                "arrivalsQt": 2900,
                "factor": 1
        },
        {
                "district": "Pune",
                "mandi": "Purandar Guava APMC",
                "modalQt": 3250,
                "minQt": 2750,
                "maxQt": 3650,
                "arrivalsQt": 2100,
                "factor": 1.015
        },
        {
                "district": "Solapur",
                "mandi": "Solapur City APMC",
                "modalQt": 3180,
                "minQt": 2680,
                "maxQt": 3580,
                "arrivalsQt": 1500,
                "factor": 0.993
        },
        {
                "district": "Nashik",
                "mandi": "Nashik Sweet Guava APMC",
                "modalQt": 3200,
                "minQt": 2700,
                "maxQt": 3600,
                "arrivalsQt": 6850,
                "factor": 1
        },
        {
                "district": "Jalgaon",
                "mandi": "Jalgaon Sweet Guava APMC",
                "modalQt": 3142,
                "minQt": 2651,
                "maxQt": 3535,
                "arrivalsQt": 4200,
                "factor": 0.982
        },
        {
                "district": "Latur",
                "mandi": "Latur Sweet Guava APMC",
                "modalQt": 3184,
                "minQt": 2687,
                "maxQt": 3582,
                "arrivalsQt": 6400,
                "factor": 0.995
        },
        {
                "district": "Nagpur",
                "mandi": "Nagpur Sweet Guava APMC",
                "modalQt": 3258,
                "minQt": 2749,
                "maxQt": 3665,
                "arrivalsQt": 4900,
                "factor": 1.018
        },
        {
                "district": "Sangli",
                "mandi": "Sangli Sweet Guava APMC",
                "modalQt": 3174,
                "minQt": 2678,
                "maxQt": 3571,
                "arrivalsQt": 3600,
                "factor": 0.992
        },
        {
                "district": "Amravati",
                "mandi": "Amravati Sweet Guava APMC",
                "modalQt": 3181,
                "minQt": 2684,
                "maxQt": 3578,
                "arrivalsQt": 3800,
                "factor": 0.994
        },
        {
                "district": "Akola",
                "mandi": "Akola Sweet Guava APMC",
                "modalQt": 3171,
                "minQt": 2676,
                "maxQt": 3568,
                "arrivalsQt": 4100,
                "factor": 0.991
        },
        {
                "district": "Nanded",
                "mandi": "Nanded Sweet Guava APMC",
                "modalQt": 3190,
                "minQt": 2692,
                "maxQt": 3589,
                "arrivalsQt": 3200,
                "factor": 0.997
        },
        {
                "district": "Satara",
                "mandi": "Satara Sweet Guava APMC",
                "modalQt": 3238,
                "minQt": 2732,
                "maxQt": 3643,
                "arrivalsQt": 2800,
                "factor": 1.012
        },
        {
                "district": "Kolhapur",
                "mandi": "Kolhapur Sweet Guava APMC",
                "modalQt": 3270,
                "minQt": 2759,
                "maxQt": 3679,
                "arrivalsQt": 3300,
                "factor": 1.022
        },
        {
                "district": "Dhule",
                "mandi": "Dhule Sweet Guava APMC",
                "modalQt": 3139,
                "minQt": 2649,
                "maxQt": 3532,
                "arrivalsQt": 3500,
                "factor": 0.981
        },
        {
                "district": "Nandurbar",
                "mandi": "Nandurbar Sweet Guava APMC",
                "modalQt": 3130,
                "minQt": 2641,
                "maxQt": 3521,
                "arrivalsQt": 2900,
                "factor": 0.978
        },
        {
                "district": "Beed",
                "mandi": "Beed Sweet Guava APMC",
                "modalQt": 3155,
                "minQt": 2662,
                "maxQt": 3550,
                "arrivalsQt": 2400,
                "factor": 0.986
        },
        {
                "district": "Washim",
                "mandi": "Washim Sweet Guava APMC",
                "modalQt": 3178,
                "minQt": 2681,
                "maxQt": 3575,
                "arrivalsQt": 2300,
                "factor": 0.993
        },
        {
                "district": "Palghar",
                "mandi": "Palghar Sweet Guava APMC",
                "modalQt": 3248,
                "minQt": 2740,
                "maxQt": 3654,
                "arrivalsQt": 2100,
                "factor": 1.015
        },
        {
                "district": "Dharashiv",
                "mandi": "Dharashiv Sweet Guava APMC",
                "modalQt": 3165,
                "minQt": 2670,
                "maxQt": 3560,
                "arrivalsQt": 2200,
                "factor": 0.989
        },
        {
                "district": "Chhatrapati Sambhajinagar",
                "mandi": "Chhatrapati Sambhajinagar Sweet Guava APMC",
                "modalQt": 3219,
                "minQt": 2716,
                "maxQt": 3622,
                "arrivalsQt": 3400,
                "factor": 1.006
        },
        {
                "district": "Hingoli",
                "mandi": "Hingoli Sweet Guava APMC",
                "modalQt": 3168,
                "minQt": 2673,
                "maxQt": 3564,
                "arrivalsQt": 1900,
                "factor": 0.99
        },
        {
                "district": "Wardha",
                "mandi": "Wardha Sweet Guava APMC",
                "modalQt": 3187,
                "minQt": 2689,
                "maxQt": 3586,
                "arrivalsQt": 2400,
                "factor": 0.996
        },
        {
                "district": "Ratnagiri",
                "mandi": "Ratnagiri Sweet Guava APMC",
                "modalQt": 3344,
                "minQt": 2822,
                "maxQt": 3762,
                "arrivalsQt": 1800,
                "factor": 1.045
        },
        {
                "district": "Sindhudurg",
                "mandi": "Sindhudurg Sweet Guava APMC",
                "modalQt": 3354,
                "minQt": 2830,
                "maxQt": 3773,
                "arrivalsQt": 1600,
                "factor": 1.048
        },
        {
                "district": "Raigad",
                "mandi": "Raigad Sweet Guava APMC",
                "modalQt": 3312,
                "minQt": 2795,
                "maxQt": 3726,
                "arrivalsQt": 2700,
                "factor": 1.035
        },
        {
                "district": "Yavatmal",
                "mandi": "Yavatmal Sweet Guava APMC",
                "modalQt": 3158,
                "minQt": 2665,
                "maxQt": 3553,
                "arrivalsQt": 3300,
                "factor": 0.987
        },
        {
                "district": "Buldhana",
                "mandi": "Buldhana Sweet Guava APMC",
                "modalQt": 3178,
                "minQt": 2681,
                "maxQt": 3575,
                "arrivalsQt": 3100,
                "factor": 0.993
        },
        {
                "district": "Bhandara",
                "mandi": "Bhandara Sweet Guava APMC",
                "modalQt": 3149,
                "minQt": 2657,
                "maxQt": 3542,
                "arrivalsQt": 2600,
                "factor": 0.984
        },
        {
                "district": "Jalna",
                "mandi": "Jalna Sweet Guava APMC",
                "modalQt": 3187,
                "minQt": 2689,
                "maxQt": 3586,
                "arrivalsQt": 3200,
                "factor": 0.996
        },
        {
                "district": "Parbhani",
                "mandi": "Parbhani Sweet Guava APMC",
                "modalQt": 3171,
                "minQt": 2676,
                "maxQt": 3568,
                "arrivalsQt": 2500,
                "factor": 0.991
        }
],
      history: {
        "7D": {
                "labels": [
                        "08 Sep",
                        "09 Sep",
                        "10 Sep",
                        "11 Sep",
                        "12 Sep",
                        "13 Sep",
                        "14 Sep (Today)",
                        "16 Sep (AI)",
                        "18 Sep (AI)",
                        "20 Sep (AI)"
                ],
                "historical": [
                        2976,
                        3040,
                        3072,
                        3136,
                        3168,
                        3184,
                        3200,
                        null,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        3200,
                        3264,
                        3360,
                        3424
                ],
                "mandiMin": [
                        2565,
                        2592,
                        2619,
                        2646,
                        2673,
                        2700,
                        2700,
                        null,
                        null,
                        null
                ],
                "mandiMax": [
                        3348,
                        3420,
                        3492,
                        3528,
                        3564,
                        3600,
                        3600,
                        null,
                        null,
                        null
                ]
        },
        "1M": {
                "labels": [
                        "15 Aug",
                        "22 Aug",
                        "29 Aug",
                        "05 Sep",
                        "12 Sep",
                        "14 Sep (Today)",
                        "21 Sep (AI)",
                        "28 Sep (AI)"
                ],
                "historical": [
                        2720,
                        2816,
                        2912,
                        3040,
                        3136,
                        3200,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        3200,
                        3328,
                        3456
                ],
                "mandiMin": [
                        2295,
                        2376,
                        2484,
                        2592,
                        2700,
                        2700,
                        null,
                        null
                ],
                "mandiMax": [
                        3060,
                        3168,
                        3312,
                        3456,
                        3600,
                        3600,
                        null,
                        null
                ]
        },
        "3M": {
                "labels": [
                        "Jun 26",
                        "Jul 26",
                        "Aug 26",
                        "Sep 26 (Now)",
                        "Oct 26 (AI)",
                        "Nov 26 (AI)"
                ],
                "historical": [
                        2560,
                        2752,
                        2944,
                        3200,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        3200,
                        3392,
                        3584
                ],
                "mandiMin": [
                        2160,
                        2322,
                        2484,
                        2700,
                        null,
                        null
                ],
                "mandiMax": [
                        2880,
                        3096,
                        3312,
                        3600,
                        null,
                        null
                ]
        },
        "1Y": {
                "labels": [
                        "Oct 25",
                        "Dec 25",
                        "Feb 26",
                        "Apr 26",
                        "Jun 26",
                        "Aug 26",
                        "Sep 26 (Now)"
                ],
                "historical": [
                        3360,
                        3840,
                        2720,
                        2400,
                        2560,
                        2880,
                        3200
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        3200
                ],
                "mandiMin": [
                        2835,
                        3240,
                        2295,
                        2025,
                        2160,
                        2430,
                        2700
                ],
                "mandiMax": [
                        3780,
                        4320,
                        3060,
                        2700,
                        2880,
                        3240,
                        3600
                ]
        }
}
    },
    wheat: {
      key: "wheat",
      name: "Lokwan Golden Wheat (Sharbati)",
      emoji: "🌾",
      hub: "Akola & Washim APMC",
      currentModalQt: 2800,
      currentMinQt: 2500,
      currentMaxQt: 3100,
      farmGateQt: 2750,
      terminalVashiQt: 3150,
      arbitragePct: 12.7,
      trendPct: "+1.5%",
      trendDir: "up",
      arrivalsQt: 8500,
      arrivalsChange: "+6.0% Roller Mills",
      sentiment: "Atta Mill Procurement High",
      sentimentScore: 81,
      recommendation: "High protein, lustrous Lokwan wheat grains for flour mills and retail brand packing.",
      districtHubs: [
        {
                "district": "Akola",
                "mandi": "Akola Grain APMC",
                "modalQt": 2800,
                "minQt": 2500,
                "maxQt": 3100,
                "arrivalsQt": 8500,
                "factor": 1
        },
        {
                "district": "Washim",
                "mandi": "Karanja APMC",
                "modalQt": 2780,
                "minQt": 2480,
                "maxQt": 3080,
                "arrivalsQt": 5400,
                "factor": 0.993
        },
        {
                "district": "Buldhana",
                "mandi": "Khamgaon APMC",
                "modalQt": 2810,
                "minQt": 2510,
                "maxQt": 3110,
                "arrivalsQt": 4800,
                "factor": 1.003
        },
        {
                "district": "Nashik",
                "mandi": "Nashik Lokwan Golden Wheat APMC",
                "modalQt": 2800,
                "minQt": 2500,
                "maxQt": 3100,
                "arrivalsQt": 6850,
                "factor": 1
        },
        {
                "district": "Pune",
                "mandi": "Pune Lokwan Golden Wheat APMC",
                "modalQt": 2870,
                "minQt": 2563,
                "maxQt": 3177,
                "arrivalsQt": 5400,
                "factor": 1.025
        },
        {
                "district": "Jalgaon",
                "mandi": "Jalgaon Lokwan Golden Wheat APMC",
                "modalQt": 2750,
                "minQt": 2455,
                "maxQt": 3044,
                "arrivalsQt": 4200,
                "factor": 0.982
        },
        {
                "district": "Latur",
                "mandi": "Latur Lokwan Golden Wheat APMC",
                "modalQt": 2786,
                "minQt": 2488,
                "maxQt": 3085,
                "arrivalsQt": 6400,
                "factor": 0.995
        },
        {
                "district": "Nagpur",
                "mandi": "Nagpur Lokwan Golden Wheat APMC",
                "modalQt": 2850,
                "minQt": 2545,
                "maxQt": 3156,
                "arrivalsQt": 4900,
                "factor": 1.018
        },
        {
                "district": "Sangli",
                "mandi": "Sangli Lokwan Golden Wheat APMC",
                "modalQt": 2778,
                "minQt": 2480,
                "maxQt": 3075,
                "arrivalsQt": 3600,
                "factor": 0.992
        },
        {
                "district": "Solapur",
                "mandi": "Solapur Lokwan Golden Wheat APMC",
                "modalQt": 2817,
                "minQt": 2515,
                "maxQt": 3119,
                "arrivalsQt": 4500,
                "factor": 1.006
        },
        {
                "district": "Ahmednagar",
                "mandi": "Ahmednagar Lokwan Golden Wheat APMC",
                "modalQt": 2764,
                "minQt": 2468,
                "maxQt": 3060,
                "arrivalsQt": 5100,
                "factor": 0.987
        },
        {
                "district": "Amravati",
                "mandi": "Amravati Lokwan Golden Wheat APMC",
                "modalQt": 2783,
                "minQt": 2485,
                "maxQt": 3081,
                "arrivalsQt": 3800,
                "factor": 0.994
        },
        {
                "district": "Nanded",
                "mandi": "Nanded Lokwan Golden Wheat APMC",
                "modalQt": 2792,
                "minQt": 2493,
                "maxQt": 3091,
                "arrivalsQt": 3200,
                "factor": 0.997
        },
        {
                "district": "Satara",
                "mandi": "Satara Lokwan Golden Wheat APMC",
                "modalQt": 2834,
                "minQt": 2530,
                "maxQt": 3137,
                "arrivalsQt": 2800,
                "factor": 1.012
        },
        {
                "district": "Kolhapur",
                "mandi": "Kolhapur Lokwan Golden Wheat APMC",
                "modalQt": 2862,
                "minQt": 2555,
                "maxQt": 3168,
                "arrivalsQt": 3300,
                "factor": 1.022
        },
        {
                "district": "Dhule",
                "mandi": "Dhule Lokwan Golden Wheat APMC",
                "modalQt": 2747,
                "minQt": 2453,
                "maxQt": 3041,
                "arrivalsQt": 3500,
                "factor": 0.981
        },
        {
                "district": "Nandurbar",
                "mandi": "Nandurbar Lokwan Golden Wheat APMC",
                "modalQt": 2738,
                "minQt": 2445,
                "maxQt": 3032,
                "arrivalsQt": 2900,
                "factor": 0.978
        },
        {
                "district": "Beed",
                "mandi": "Beed Lokwan Golden Wheat APMC",
                "modalQt": 2761,
                "minQt": 2465,
                "maxQt": 3057,
                "arrivalsQt": 2400,
                "factor": 0.986
        },
        {
                "district": "Palghar",
                "mandi": "Palghar Lokwan Golden Wheat APMC",
                "modalQt": 2842,
                "minQt": 2537,
                "maxQt": 3146,
                "arrivalsQt": 2100,
                "factor": 1.015
        },
        {
                "district": "Dharashiv",
                "mandi": "Dharashiv Lokwan Golden Wheat APMC",
                "modalQt": 2769,
                "minQt": 2473,
                "maxQt": 3066,
                "arrivalsQt": 2200,
                "factor": 0.989
        },
        {
                "district": "Chhatrapati Sambhajinagar",
                "mandi": "Chhatrapati Sambhajinagar Lokwan Golden Wheat APMC",
                "modalQt": 2817,
                "minQt": 2515,
                "maxQt": 3119,
                "arrivalsQt": 3400,
                "factor": 1.006
        },
        {
                "district": "Hingoli",
                "mandi": "Hingoli Lokwan Golden Wheat APMC",
                "modalQt": 2772,
                "minQt": 2475,
                "maxQt": 3069,
                "arrivalsQt": 1900,
                "factor": 0.99
        },
        {
                "district": "Wardha",
                "mandi": "Wardha Lokwan Golden Wheat APMC",
                "modalQt": 2789,
                "minQt": 2490,
                "maxQt": 3088,
                "arrivalsQt": 2400,
                "factor": 0.996
        },
        {
                "district": "Ratnagiri",
                "mandi": "Ratnagiri Lokwan Golden Wheat APMC",
                "modalQt": 2926,
                "minQt": 2613,
                "maxQt": 3240,
                "arrivalsQt": 1800,
                "factor": 1.045
        },
        {
                "district": "Sindhudurg",
                "mandi": "Sindhudurg Lokwan Golden Wheat APMC",
                "modalQt": 2934,
                "minQt": 2620,
                "maxQt": 3249,
                "arrivalsQt": 1600,
                "factor": 1.048
        },
        {
                "district": "Raigad",
                "mandi": "Raigad Lokwan Golden Wheat APMC",
                "modalQt": 2898,
                "minQt": 2588,
                "maxQt": 3208,
                "arrivalsQt": 2700,
                "factor": 1.035
        },
        {
                "district": "Yavatmal",
                "mandi": "Yavatmal Lokwan Golden Wheat APMC",
                "modalQt": 2764,
                "minQt": 2468,
                "maxQt": 3060,
                "arrivalsQt": 3300,
                "factor": 0.987
        },
        {
                "district": "Bhandara",
                "mandi": "Bhandara Lokwan Golden Wheat APMC",
                "modalQt": 2755,
                "minQt": 2460,
                "maxQt": 3050,
                "arrivalsQt": 2600,
                "factor": 0.984
        },
        {
                "district": "Jalna",
                "mandi": "Jalna Lokwan Golden Wheat APMC",
                "modalQt": 2789,
                "minQt": 2490,
                "maxQt": 3088,
                "arrivalsQt": 3200,
                "factor": 0.996
        },
        {
                "district": "Parbhani",
                "mandi": "Parbhani Lokwan Golden Wheat APMC",
                "modalQt": 2775,
                "minQt": 2478,
                "maxQt": 3072,
                "arrivalsQt": 2500,
                "factor": 0.991
        }
],
      history: {
        "7D": {
                "labels": [
                        "08 Sep",
                        "09 Sep",
                        "10 Sep",
                        "11 Sep",
                        "12 Sep",
                        "13 Sep",
                        "14 Sep (Today)",
                        "16 Sep (AI)",
                        "18 Sep (AI)",
                        "20 Sep (AI)"
                ],
                "historical": [
                        2604,
                        2660,
                        2688,
                        2744,
                        2772,
                        2786,
                        2800,
                        null,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        2800,
                        2856,
                        2940,
                        2996
                ],
                "mandiMin": [
                        2375,
                        2400,
                        2425,
                        2450,
                        2475,
                        2500,
                        2500,
                        null,
                        null,
                        null
                ],
                "mandiMax": [
                        2883,
                        2945,
                        3007,
                        3038,
                        3069,
                        3100,
                        3100,
                        null,
                        null,
                        null
                ]
        },
        "1M": {
                "labels": [
                        "15 Aug",
                        "22 Aug",
                        "29 Aug",
                        "05 Sep",
                        "12 Sep",
                        "14 Sep (Today)",
                        "21 Sep (AI)",
                        "28 Sep (AI)"
                ],
                "historical": [
                        2380,
                        2464,
                        2548,
                        2660,
                        2744,
                        2800,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        2800,
                        2912,
                        3024
                ],
                "mandiMin": [
                        2125,
                        2200,
                        2300,
                        2400,
                        2500,
                        2500,
                        null,
                        null
                ],
                "mandiMax": [
                        2635,
                        2728,
                        2852,
                        2976,
                        3100,
                        3100,
                        null,
                        null
                ]
        },
        "3M": {
                "labels": [
                        "Jun 26",
                        "Jul 26",
                        "Aug 26",
                        "Sep 26 (Now)",
                        "Oct 26 (AI)",
                        "Nov 26 (AI)"
                ],
                "historical": [
                        2240,
                        2408,
                        2576,
                        2800,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        2800,
                        2968,
                        3136
                ],
                "mandiMin": [
                        2000,
                        2150,
                        2300,
                        2500,
                        null,
                        null
                ],
                "mandiMax": [
                        2480,
                        2666,
                        2852,
                        3100,
                        null,
                        null
                ]
        },
        "1Y": {
                "labels": [
                        "Oct 25",
                        "Dec 25",
                        "Feb 26",
                        "Apr 26",
                        "Jun 26",
                        "Aug 26",
                        "Sep 26 (Now)"
                ],
                "historical": [
                        2940,
                        3360,
                        2380,
                        2100,
                        2240,
                        2520,
                        2800
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        2800
                ],
                "mandiMin": [
                        2625,
                        3000,
                        2125,
                        1875,
                        2000,
                        2250,
                        2500
                ],
                "mandiMax": [
                        3255,
                        3720,
                        2635,
                        2325,
                        2480,
                        2790,
                        3100
                ]
        }
}
    },
    rice: {
      key: "rice",
      name: "Wada Kolam Rice (Palghar GI)",
      emoji: "🍚",
      hub: "Palghar & Wada APMC",
      currentModalQt: 4500,
      currentMinQt: 4000,
      currentMaxQt: 5100,
      farmGateQt: 4400,
      terminalVashiQt: 5200,
      arbitragePct: 15.4,
      trendPct: "+3.8%",
      trendDir: "up",
      arrivalsQt: 3100,
      arrivalsChange: "+4.2% Premium Grain",
      sentiment: "High Aromatic Demand",
      sentimentScore: 85,
      recommendation: "Aromatic non-basmati Wada Kolam paddy available directly from coastal Maharashtra farmers.",
      districtHubs: [
        {
                "district": "Palghar",
                "mandi": "Wada Paddy APMC",
                "modalQt": 4500,
                "minQt": 4000,
                "maxQt": 5100,
                "arrivalsQt": 3100,
                "factor": 1
        },
        {
                "district": "Thane",
                "mandi": "Shahapur APMC",
                "modalQt": 4480,
                "minQt": 3980,
                "maxQt": 5080,
                "arrivalsQt": 2200,
                "factor": 0.995
        },
        {
                "district": "Bhandara",
                "mandi": "Bhandara Rice APMC",
                "modalQt": 4520,
                "minQt": 4020,
                "maxQt": 5120,
                "arrivalsQt": 4600,
                "factor": 1.004
        },
        {
                "district": "Nashik",
                "mandi": "Nashik Wada Kolam Rice APMC",
                "modalQt": 4500,
                "minQt": 4000,
                "maxQt": 5100,
                "arrivalsQt": 6850,
                "factor": 1
        },
        {
                "district": "Pune",
                "mandi": "Pune Wada Kolam Rice APMC",
                "modalQt": 4613,
                "minQt": 4100,
                "maxQt": 5228,
                "arrivalsQt": 5400,
                "factor": 1.025
        },
        {
                "district": "Jalgaon",
                "mandi": "Jalgaon Wada Kolam Rice APMC",
                "modalQt": 4419,
                "minQt": 3928,
                "maxQt": 5008,
                "arrivalsQt": 4200,
                "factor": 0.982
        },
        {
                "district": "Latur",
                "mandi": "Latur Wada Kolam Rice APMC",
                "modalQt": 4478,
                "minQt": 3980,
                "maxQt": 5075,
                "arrivalsQt": 6400,
                "factor": 0.995
        },
        {
                "district": "Nagpur",
                "mandi": "Nagpur Wada Kolam Rice APMC",
                "modalQt": 4581,
                "minQt": 4072,
                "maxQt": 5192,
                "arrivalsQt": 4900,
                "factor": 1.018
        },
        {
                "district": "Sangli",
                "mandi": "Sangli Wada Kolam Rice APMC",
                "modalQt": 4464,
                "minQt": 3968,
                "maxQt": 5059,
                "arrivalsQt": 3600,
                "factor": 0.992
        },
        {
                "district": "Solapur",
                "mandi": "Solapur Wada Kolam Rice APMC",
                "modalQt": 4527,
                "minQt": 4024,
                "maxQt": 5131,
                "arrivalsQt": 4500,
                "factor": 1.006
        },
        {
                "district": "Ahmednagar",
                "mandi": "Ahmednagar Wada Kolam Rice APMC",
                "modalQt": 4442,
                "minQt": 3948,
                "maxQt": 5034,
                "arrivalsQt": 5100,
                "factor": 0.987
        },
        {
                "district": "Amravati",
                "mandi": "Amravati Wada Kolam Rice APMC",
                "modalQt": 4473,
                "minQt": 3976,
                "maxQt": 5069,
                "arrivalsQt": 3800,
                "factor": 0.994
        },
        {
                "district": "Akola",
                "mandi": "Akola Wada Kolam Rice APMC",
                "modalQt": 4460,
                "minQt": 3964,
                "maxQt": 5054,
                "arrivalsQt": 4100,
                "factor": 0.991
        },
        {
                "district": "Nanded",
                "mandi": "Nanded Wada Kolam Rice APMC",
                "modalQt": 4487,
                "minQt": 3988,
                "maxQt": 5085,
                "arrivalsQt": 3200,
                "factor": 0.997
        },
        {
                "district": "Satara",
                "mandi": "Satara Wada Kolam Rice APMC",
                "modalQt": 4554,
                "minQt": 4048,
                "maxQt": 5161,
                "arrivalsQt": 2800,
                "factor": 1.012
        },
        {
                "district": "Kolhapur",
                "mandi": "Kolhapur Wada Kolam Rice APMC",
                "modalQt": 4599,
                "minQt": 4088,
                "maxQt": 5212,
                "arrivalsQt": 3300,
                "factor": 1.022
        },
        {
                "district": "Dhule",
                "mandi": "Dhule Wada Kolam Rice APMC",
                "modalQt": 4415,
                "minQt": 3924,
                "maxQt": 5003,
                "arrivalsQt": 3500,
                "factor": 0.981
        },
        {
                "district": "Nandurbar",
                "mandi": "Nandurbar Wada Kolam Rice APMC",
                "modalQt": 4401,
                "minQt": 3912,
                "maxQt": 4988,
                "arrivalsQt": 2900,
                "factor": 0.978
        },
        {
                "district": "Beed",
                "mandi": "Beed Wada Kolam Rice APMC",
                "modalQt": 4437,
                "minQt": 3944,
                "maxQt": 5029,
                "arrivalsQt": 2400,
                "factor": 0.986
        },
        {
                "district": "Washim",
                "mandi": "Washim Wada Kolam Rice APMC",
                "modalQt": 4469,
                "minQt": 3972,
                "maxQt": 5064,
                "arrivalsQt": 2300,
                "factor": 0.993
        },
        {
                "district": "Dharashiv",
                "mandi": "Dharashiv Wada Kolam Rice APMC",
                "modalQt": 4451,
                "minQt": 3956,
                "maxQt": 5044,
                "arrivalsQt": 2200,
                "factor": 0.989
        },
        {
                "district": "Chhatrapati Sambhajinagar",
                "mandi": "Chhatrapati Sambhajinagar Wada Kolam Rice APMC",
                "modalQt": 4527,
                "minQt": 4024,
                "maxQt": 5131,
                "arrivalsQt": 3400,
                "factor": 1.006
        },
        {
                "district": "Hingoli",
                "mandi": "Hingoli Wada Kolam Rice APMC",
                "modalQt": 4455,
                "minQt": 3960,
                "maxQt": 5049,
                "arrivalsQt": 1900,
                "factor": 0.99
        },
        {
                "district": "Wardha",
                "mandi": "Wardha Wada Kolam Rice APMC",
                "modalQt": 4482,
                "minQt": 3984,
                "maxQt": 5080,
                "arrivalsQt": 2400,
                "factor": 0.996
        },
        {
                "district": "Ratnagiri",
                "mandi": "Ratnagiri Wada Kolam Rice APMC",
                "modalQt": 4703,
                "minQt": 4180,
                "maxQt": 5330,
                "arrivalsQt": 1800,
                "factor": 1.045
        },
        {
                "district": "Sindhudurg",
                "mandi": "Sindhudurg Wada Kolam Rice APMC",
                "modalQt": 4716,
                "minQt": 4192,
                "maxQt": 5345,
                "arrivalsQt": 1600,
                "factor": 1.048
        },
        {
                "district": "Raigad",
                "mandi": "Raigad Wada Kolam Rice APMC",
                "modalQt": 4658,
                "minQt": 4140,
                "maxQt": 5279,
                "arrivalsQt": 2700,
                "factor": 1.035
        },
        {
                "district": "Yavatmal",
                "mandi": "Yavatmal Wada Kolam Rice APMC",
                "modalQt": 4442,
                "minQt": 3948,
                "maxQt": 5034,
                "arrivalsQt": 3300,
                "factor": 0.987
        },
        {
                "district": "Buldhana",
                "mandi": "Buldhana Wada Kolam Rice APMC",
                "modalQt": 4469,
                "minQt": 3972,
                "maxQt": 5064,
                "arrivalsQt": 3100,
                "factor": 0.993
        },
        {
                "district": "Jalna",
                "mandi": "Jalna Wada Kolam Rice APMC",
                "modalQt": 4482,
                "minQt": 3984,
                "maxQt": 5080,
                "arrivalsQt": 3200,
                "factor": 0.996
        },
        {
                "district": "Parbhani",
                "mandi": "Parbhani Wada Kolam Rice APMC",
                "modalQt": 4460,
                "minQt": 3964,
                "maxQt": 5054,
                "arrivalsQt": 2500,
                "factor": 0.991
        }
],
      history: {
        "7D": {
                "labels": [
                        "08 Sep",
                        "09 Sep",
                        "10 Sep",
                        "11 Sep",
                        "12 Sep",
                        "13 Sep",
                        "14 Sep (Today)",
                        "16 Sep (AI)",
                        "18 Sep (AI)",
                        "20 Sep (AI)"
                ],
                "historical": [
                        4185,
                        4275,
                        4320,
                        4410,
                        4455,
                        4478,
                        4500,
                        null,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        4500,
                        4590,
                        4725,
                        4815
                ],
                "mandiMin": [
                        3800,
                        3840,
                        3880,
                        3920,
                        3960,
                        4000,
                        4000,
                        null,
                        null,
                        null
                ],
                "mandiMax": [
                        4743,
                        4845,
                        4947,
                        4998,
                        5049,
                        5100,
                        5100,
                        null,
                        null,
                        null
                ]
        },
        "1M": {
                "labels": [
                        "15 Aug",
                        "22 Aug",
                        "29 Aug",
                        "05 Sep",
                        "12 Sep",
                        "14 Sep (Today)",
                        "21 Sep (AI)",
                        "28 Sep (AI)"
                ],
                "historical": [
                        3825,
                        3960,
                        4095,
                        4275,
                        4410,
                        4500,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        4500,
                        4680,
                        4860
                ],
                "mandiMin": [
                        3400,
                        3520,
                        3680,
                        3840,
                        4000,
                        4000,
                        null,
                        null
                ],
                "mandiMax": [
                        4335,
                        4488,
                        4692,
                        4896,
                        5100,
                        5100,
                        null,
                        null
                ]
        },
        "3M": {
                "labels": [
                        "Jun 26",
                        "Jul 26",
                        "Aug 26",
                        "Sep 26 (Now)",
                        "Oct 26 (AI)",
                        "Nov 26 (AI)"
                ],
                "historical": [
                        3600,
                        3870,
                        4140,
                        4500,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        4500,
                        4770,
                        5040
                ],
                "mandiMin": [
                        3200,
                        3440,
                        3680,
                        4000,
                        null,
                        null
                ],
                "mandiMax": [
                        4080,
                        4386,
                        4692,
                        5100,
                        null,
                        null
                ]
        },
        "1Y": {
                "labels": [
                        "Oct 25",
                        "Dec 25",
                        "Feb 26",
                        "Apr 26",
                        "Jun 26",
                        "Aug 26",
                        "Sep 26 (Now)"
                ],
                "historical": [
                        4725,
                        5400,
                        3825,
                        3375,
                        3600,
                        4050,
                        4500
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        4500
                ],
                "mandiMin": [
                        4200,
                        4800,
                        3400,
                        3000,
                        3200,
                        3600,
                        4000
                ],
                "mandiMax": [
                        5355,
                        6120,
                        4335,
                        3825,
                        4080,
                        4590,
                        5100
                ]
        }
}
    },
    jowar: {
      key: "jowar",
      name: "Maldandi Jowar (Solapur Sorghum)",
      emoji: "🌾",
      hub: "Solapur & Barshi APMC",
      currentModalQt: 3400,
      currentMinQt: 3000,
      currentMaxQt: 3800,
      farmGateQt: 3300,
      terminalVashiQt: 3900,
      arbitragePct: 15.4,
      trendPct: "+2.0%",
      trendDir: "up",
      arrivalsQt: 4100,
      arrivalsChange: "+8.5% Health Food",
      sentiment: "Millet & Superfood Demand",
      sentimentScore: 83,
      recommendation: "Maldandi M35-1 white lustrous grain high in fiber, ideal for FMCG superfood brands.",
      districtHubs: [
        {
                "district": "Solapur",
                "mandi": "Barshi APMC Market",
                "modalQt": 3400,
                "minQt": 3000,
                "maxQt": 3800,
                "arrivalsQt": 4100,
                "factor": 1
        },
        {
                "district": "Dharashiv",
                "mandi": "Omerga APMC",
                "modalQt": 3380,
                "minQt": 2980,
                "maxQt": 3780,
                "arrivalsQt": 2900,
                "factor": 0.994
        },
        {
                "district": "Ahmednagar",
                "mandi": "Shevgaon APMC",
                "modalQt": 3420,
                "minQt": 3020,
                "maxQt": 3820,
                "arrivalsQt": 2300,
                "factor": 1.005
        },
        {
                "district": "Nashik",
                "mandi": "Nashik Maldandi Jowar APMC",
                "modalQt": 3400,
                "minQt": 3000,
                "maxQt": 3800,
                "arrivalsQt": 6850,
                "factor": 1
        },
        {
                "district": "Pune",
                "mandi": "Pune Maldandi Jowar APMC",
                "modalQt": 3485,
                "minQt": 3075,
                "maxQt": 3895,
                "arrivalsQt": 5400,
                "factor": 1.025
        },
        {
                "district": "Jalgaon",
                "mandi": "Jalgaon Maldandi Jowar APMC",
                "modalQt": 3339,
                "minQt": 2946,
                "maxQt": 3732,
                "arrivalsQt": 4200,
                "factor": 0.982
        },
        {
                "district": "Latur",
                "mandi": "Latur Maldandi Jowar APMC",
                "modalQt": 3383,
                "minQt": 2985,
                "maxQt": 3781,
                "arrivalsQt": 6400,
                "factor": 0.995
        },
        {
                "district": "Nagpur",
                "mandi": "Nagpur Maldandi Jowar APMC",
                "modalQt": 3461,
                "minQt": 3054,
                "maxQt": 3868,
                "arrivalsQt": 4900,
                "factor": 1.018
        },
        {
                "district": "Sangli",
                "mandi": "Sangli Maldandi Jowar APMC",
                "modalQt": 3373,
                "minQt": 2976,
                "maxQt": 3770,
                "arrivalsQt": 3600,
                "factor": 0.992
        },
        {
                "district": "Amravati",
                "mandi": "Amravati Maldandi Jowar APMC",
                "modalQt": 3380,
                "minQt": 2982,
                "maxQt": 3777,
                "arrivalsQt": 3800,
                "factor": 0.994
        },
        {
                "district": "Akola",
                "mandi": "Akola Maldandi Jowar APMC",
                "modalQt": 3369,
                "minQt": 2973,
                "maxQt": 3766,
                "arrivalsQt": 4100,
                "factor": 0.991
        },
        {
                "district": "Nanded",
                "mandi": "Nanded Maldandi Jowar APMC",
                "modalQt": 3390,
                "minQt": 2991,
                "maxQt": 3789,
                "arrivalsQt": 3200,
                "factor": 0.997
        },
        {
                "district": "Satara",
                "mandi": "Satara Maldandi Jowar APMC",
                "modalQt": 3441,
                "minQt": 3036,
                "maxQt": 3846,
                "arrivalsQt": 2800,
                "factor": 1.012
        },
        {
                "district": "Kolhapur",
                "mandi": "Kolhapur Maldandi Jowar APMC",
                "modalQt": 3475,
                "minQt": 3066,
                "maxQt": 3884,
                "arrivalsQt": 3300,
                "factor": 1.022
        },
        {
                "district": "Dhule",
                "mandi": "Dhule Maldandi Jowar APMC",
                "modalQt": 3335,
                "minQt": 2943,
                "maxQt": 3728,
                "arrivalsQt": 3500,
                "factor": 0.981
        },
        {
                "district": "Nandurbar",
                "mandi": "Nandurbar Maldandi Jowar APMC",
                "modalQt": 3325,
                "minQt": 2934,
                "maxQt": 3716,
                "arrivalsQt": 2900,
                "factor": 0.978
        },
        {
                "district": "Beed",
                "mandi": "Beed Maldandi Jowar APMC",
                "modalQt": 3352,
                "minQt": 2958,
                "maxQt": 3747,
                "arrivalsQt": 2400,
                "factor": 0.986
        },
        {
                "district": "Washim",
                "mandi": "Washim Maldandi Jowar APMC",
                "modalQt": 3376,
                "minQt": 2979,
                "maxQt": 3773,
                "arrivalsQt": 2300,
                "factor": 0.993
        },
        {
                "district": "Palghar",
                "mandi": "Palghar Maldandi Jowar APMC",
                "modalQt": 3451,
                "minQt": 3045,
                "maxQt": 3857,
                "arrivalsQt": 2100,
                "factor": 1.015
        },
        {
                "district": "Chhatrapati Sambhajinagar",
                "mandi": "Chhatrapati Sambhajinagar Maldandi Jowar APMC",
                "modalQt": 3420,
                "minQt": 3018,
                "maxQt": 3823,
                "arrivalsQt": 3400,
                "factor": 1.006
        },
        {
                "district": "Hingoli",
                "mandi": "Hingoli Maldandi Jowar APMC",
                "modalQt": 3366,
                "minQt": 2970,
                "maxQt": 3762,
                "arrivalsQt": 1900,
                "factor": 0.99
        },
        {
                "district": "Wardha",
                "mandi": "Wardha Maldandi Jowar APMC",
                "modalQt": 3386,
                "minQt": 2988,
                "maxQt": 3785,
                "arrivalsQt": 2400,
                "factor": 0.996
        },
        {
                "district": "Ratnagiri",
                "mandi": "Ratnagiri Maldandi Jowar APMC",
                "modalQt": 3553,
                "minQt": 3135,
                "maxQt": 3971,
                "arrivalsQt": 1800,
                "factor": 1.045
        },
        {
                "district": "Sindhudurg",
                "mandi": "Sindhudurg Maldandi Jowar APMC",
                "modalQt": 3563,
                "minQt": 3144,
                "maxQt": 3982,
                "arrivalsQt": 1600,
                "factor": 1.048
        },
        {
                "district": "Raigad",
                "mandi": "Raigad Maldandi Jowar APMC",
                "modalQt": 3519,
                "minQt": 3105,
                "maxQt": 3933,
                "arrivalsQt": 2700,
                "factor": 1.035
        },
        {
                "district": "Yavatmal",
                "mandi": "Yavatmal Maldandi Jowar APMC",
                "modalQt": 3356,
                "minQt": 2961,
                "maxQt": 3751,
                "arrivalsQt": 3300,
                "factor": 0.987
        },
        {
                "district": "Buldhana",
                "mandi": "Buldhana Maldandi Jowar APMC",
                "modalQt": 3376,
                "minQt": 2979,
                "maxQt": 3773,
                "arrivalsQt": 3100,
                "factor": 0.993
        },
        {
                "district": "Bhandara",
                "mandi": "Bhandara Maldandi Jowar APMC",
                "modalQt": 3346,
                "minQt": 2952,
                "maxQt": 3739,
                "arrivalsQt": 2600,
                "factor": 0.984
        },
        {
                "district": "Jalna",
                "mandi": "Jalna Maldandi Jowar APMC",
                "modalQt": 3386,
                "minQt": 2988,
                "maxQt": 3785,
                "arrivalsQt": 3200,
                "factor": 0.996
        },
        {
                "district": "Parbhani",
                "mandi": "Parbhani Maldandi Jowar APMC",
                "modalQt": 3369,
                "minQt": 2973,
                "maxQt": 3766,
                "arrivalsQt": 2500,
                "factor": 0.991
        }
],
      history: {
        "7D": {
                "labels": [
                        "08 Sep",
                        "09 Sep",
                        "10 Sep",
                        "11 Sep",
                        "12 Sep",
                        "13 Sep",
                        "14 Sep (Today)",
                        "16 Sep (AI)",
                        "18 Sep (AI)",
                        "20 Sep (AI)"
                ],
                "historical": [
                        3162,
                        3230,
                        3264,
                        3332,
                        3366,
                        3383,
                        3400,
                        null,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        3400,
                        3468,
                        3570,
                        3638
                ],
                "mandiMin": [
                        2850,
                        2880,
                        2910,
                        2940,
                        2970,
                        3000,
                        3000,
                        null,
                        null,
                        null
                ],
                "mandiMax": [
                        3534,
                        3610,
                        3686,
                        3724,
                        3762,
                        3800,
                        3800,
                        null,
                        null,
                        null
                ]
        },
        "1M": {
                "labels": [
                        "15 Aug",
                        "22 Aug",
                        "29 Aug",
                        "05 Sep",
                        "12 Sep",
                        "14 Sep (Today)",
                        "21 Sep (AI)",
                        "28 Sep (AI)"
                ],
                "historical": [
                        2890,
                        2992,
                        3094,
                        3230,
                        3332,
                        3400,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        3400,
                        3536,
                        3672
                ],
                "mandiMin": [
                        2550,
                        2640,
                        2760,
                        2880,
                        3000,
                        3000,
                        null,
                        null
                ],
                "mandiMax": [
                        3230,
                        3344,
                        3496,
                        3648,
                        3800,
                        3800,
                        null,
                        null
                ]
        },
        "3M": {
                "labels": [
                        "Jun 26",
                        "Jul 26",
                        "Aug 26",
                        "Sep 26 (Now)",
                        "Oct 26 (AI)",
                        "Nov 26 (AI)"
                ],
                "historical": [
                        2720,
                        2924,
                        3128,
                        3400,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        3400,
                        3604,
                        3808
                ],
                "mandiMin": [
                        2400,
                        2580,
                        2760,
                        3000,
                        null,
                        null
                ],
                "mandiMax": [
                        3040,
                        3268,
                        3496,
                        3800,
                        null,
                        null
                ]
        },
        "1Y": {
                "labels": [
                        "Oct 25",
                        "Dec 25",
                        "Feb 26",
                        "Apr 26",
                        "Jun 26",
                        "Aug 26",
                        "Sep 26 (Now)"
                ],
                "historical": [
                        3570,
                        4080,
                        2890,
                        2550,
                        2720,
                        3060,
                        3400
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        3400
                ],
                "mandiMin": [
                        3150,
                        3600,
                        2550,
                        2250,
                        2400,
                        2700,
                        3000
                ],
                "mandiMax": [
                        3990,
                        4560,
                        3230,
                        2850,
                        3040,
                        3420,
                        3800
                ]
        }
}
    },
    bajra: {
      key: "bajra",
      name: "Pearl Millet (Dhule Hybrid Bajra)",
      emoji: "🥣",
      hub: "Dhule & Malegaon APMC",
      currentModalQt: 2100,
      currentMinQt: 1850,
      currentMaxQt: 2350,
      farmGateQt: 2050,
      terminalVashiQt: 2450,
      arbitragePct: 16.3,
      trendPct: "+1.1%",
      trendDir: "up",
      arrivalsQt: 5300,
      arrivalsChange: "+10.2% Steady",
      sentiment: "Steady Feed & Food Demand",
      sentimentScore: 73,
      recommendation: "Cleaned hybrid bajra grain available across North Maharashtra hubs.",
      districtHubs: [
        {
                "district": "Dhule",
                "mandi": "Sakri APMC Yard",
                "modalQt": 2100,
                "minQt": 1850,
                "maxQt": 2350,
                "arrivalsQt": 5300,
                "factor": 1
        },
        {
                "district": "Nashik",
                "mandi": "Yeola APMC",
                "modalQt": 2080,
                "minQt": 1830,
                "maxQt": 2330,
                "arrivalsQt": 3800,
                "factor": 0.99
        },
        {
                "district": "Ahmednagar",
                "mandi": "Kopargaon APMC",
                "modalQt": 2120,
                "minQt": 1870,
                "maxQt": 2370,
                "arrivalsQt": 3100,
                "factor": 1.009
        },
        {
                "district": "Pune",
                "mandi": "Pune Pearl Millet APMC",
                "modalQt": 2153,
                "minQt": 1896,
                "maxQt": 2409,
                "arrivalsQt": 5400,
                "factor": 1.025
        },
        {
                "district": "Jalgaon",
                "mandi": "Jalgaon Pearl Millet APMC",
                "modalQt": 2062,
                "minQt": 1817,
                "maxQt": 2308,
                "arrivalsQt": 4200,
                "factor": 0.982
        },
        {
                "district": "Latur",
                "mandi": "Latur Pearl Millet APMC",
                "modalQt": 2090,
                "minQt": 1841,
                "maxQt": 2338,
                "arrivalsQt": 6400,
                "factor": 0.995
        },
        {
                "district": "Nagpur",
                "mandi": "Nagpur Pearl Millet APMC",
                "modalQt": 2138,
                "minQt": 1883,
                "maxQt": 2392,
                "arrivalsQt": 4900,
                "factor": 1.018
        },
        {
                "district": "Sangli",
                "mandi": "Sangli Pearl Millet APMC",
                "modalQt": 2083,
                "minQt": 1835,
                "maxQt": 2331,
                "arrivalsQt": 3600,
                "factor": 0.992
        },
        {
                "district": "Solapur",
                "mandi": "Solapur Pearl Millet APMC",
                "modalQt": 2113,
                "minQt": 1861,
                "maxQt": 2364,
                "arrivalsQt": 4500,
                "factor": 1.006
        },
        {
                "district": "Amravati",
                "mandi": "Amravati Pearl Millet APMC",
                "modalQt": 2087,
                "minQt": 1839,
                "maxQt": 2336,
                "arrivalsQt": 3800,
                "factor": 0.994
        },
        {
                "district": "Akola",
                "mandi": "Akola Pearl Millet APMC",
                "modalQt": 2081,
                "minQt": 1833,
                "maxQt": 2329,
                "arrivalsQt": 4100,
                "factor": 0.991
        },
        {
                "district": "Nanded",
                "mandi": "Nanded Pearl Millet APMC",
                "modalQt": 2094,
                "minQt": 1844,
                "maxQt": 2343,
                "arrivalsQt": 3200,
                "factor": 0.997
        },
        {
                "district": "Satara",
                "mandi": "Satara Pearl Millet APMC",
                "modalQt": 2125,
                "minQt": 1872,
                "maxQt": 2378,
                "arrivalsQt": 2800,
                "factor": 1.012
        },
        {
                "district": "Kolhapur",
                "mandi": "Kolhapur Pearl Millet APMC",
                "modalQt": 2146,
                "minQt": 1891,
                "maxQt": 2402,
                "arrivalsQt": 3300,
                "factor": 1.022
        },
        {
                "district": "Nandurbar",
                "mandi": "Nandurbar Pearl Millet APMC",
                "modalQt": 2054,
                "minQt": 1809,
                "maxQt": 2298,
                "arrivalsQt": 2900,
                "factor": 0.978
        },
        {
                "district": "Beed",
                "mandi": "Beed Pearl Millet APMC",
                "modalQt": 2071,
                "minQt": 1824,
                "maxQt": 2317,
                "arrivalsQt": 2400,
                "factor": 0.986
        },
        {
                "district": "Washim",
                "mandi": "Washim Pearl Millet APMC",
                "modalQt": 2085,
                "minQt": 1837,
                "maxQt": 2334,
                "arrivalsQt": 2300,
                "factor": 0.993
        },
        {
                "district": "Palghar",
                "mandi": "Palghar Pearl Millet APMC",
                "modalQt": 2132,
                "minQt": 1878,
                "maxQt": 2385,
                "arrivalsQt": 2100,
                "factor": 1.015
        },
        {
                "district": "Dharashiv",
                "mandi": "Dharashiv Pearl Millet APMC",
                "modalQt": 2077,
                "minQt": 1830,
                "maxQt": 2324,
                "arrivalsQt": 2200,
                "factor": 0.989
        },
        {
                "district": "Chhatrapati Sambhajinagar",
                "mandi": "Chhatrapati Sambhajinagar Pearl Millet APMC",
                "modalQt": 2113,
                "minQt": 1861,
                "maxQt": 2364,
                "arrivalsQt": 3400,
                "factor": 1.006
        },
        {
                "district": "Hingoli",
                "mandi": "Hingoli Pearl Millet APMC",
                "modalQt": 2079,
                "minQt": 1832,
                "maxQt": 2327,
                "arrivalsQt": 1900,
                "factor": 0.99
        },
        {
                "district": "Wardha",
                "mandi": "Wardha Pearl Millet APMC",
                "modalQt": 2092,
                "minQt": 1843,
                "maxQt": 2341,
                "arrivalsQt": 2400,
                "factor": 0.996
        },
        {
                "district": "Ratnagiri",
                "mandi": "Ratnagiri Pearl Millet APMC",
                "modalQt": 2195,
                "minQt": 1933,
                "maxQt": 2456,
                "arrivalsQt": 1800,
                "factor": 1.045
        },
        {
                "district": "Sindhudurg",
                "mandi": "Sindhudurg Pearl Millet APMC",
                "modalQt": 2201,
                "minQt": 1939,
                "maxQt": 2463,
                "arrivalsQt": 1600,
                "factor": 1.048
        },
        {
                "district": "Raigad",
                "mandi": "Raigad Pearl Millet APMC",
                "modalQt": 2174,
                "minQt": 1915,
                "maxQt": 2432,
                "arrivalsQt": 2700,
                "factor": 1.035
        },
        {
                "district": "Yavatmal",
                "mandi": "Yavatmal Pearl Millet APMC",
                "modalQt": 2073,
                "minQt": 1826,
                "maxQt": 2319,
                "arrivalsQt": 3300,
                "factor": 0.987
        },
        {
                "district": "Buldhana",
                "mandi": "Buldhana Pearl Millet APMC",
                "modalQt": 2085,
                "minQt": 1837,
                "maxQt": 2334,
                "arrivalsQt": 3100,
                "factor": 0.993
        },
        {
                "district": "Bhandara",
                "mandi": "Bhandara Pearl Millet APMC",
                "modalQt": 2066,
                "minQt": 1820,
                "maxQt": 2312,
                "arrivalsQt": 2600,
                "factor": 0.984
        },
        {
                "district": "Jalna",
                "mandi": "Jalna Pearl Millet APMC",
                "modalQt": 2092,
                "minQt": 1843,
                "maxQt": 2341,
                "arrivalsQt": 3200,
                "factor": 0.996
        },
        {
                "district": "Parbhani",
                "mandi": "Parbhani Pearl Millet APMC",
                "modalQt": 2081,
                "minQt": 1833,
                "maxQt": 2329,
                "arrivalsQt": 2500,
                "factor": 0.991
        }
],
      history: {
        "7D": {
                "labels": [
                        "08 Sep",
                        "09 Sep",
                        "10 Sep",
                        "11 Sep",
                        "12 Sep",
                        "13 Sep",
                        "14 Sep (Today)",
                        "16 Sep (AI)",
                        "18 Sep (AI)",
                        "20 Sep (AI)"
                ],
                "historical": [
                        1953,
                        1995,
                        2016,
                        2058,
                        2079,
                        2090,
                        2100,
                        null,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        2100,
                        2142,
                        2205,
                        2247
                ],
                "mandiMin": [
                        1758,
                        1776,
                        1795,
                        1813,
                        1832,
                        1850,
                        1850,
                        null,
                        null,
                        null
                ],
                "mandiMax": [
                        2186,
                        2233,
                        2280,
                        2303,
                        2327,
                        2350,
                        2350,
                        null,
                        null,
                        null
                ]
        },
        "1M": {
                "labels": [
                        "15 Aug",
                        "22 Aug",
                        "29 Aug",
                        "05 Sep",
                        "12 Sep",
                        "14 Sep (Today)",
                        "21 Sep (AI)",
                        "28 Sep (AI)"
                ],
                "historical": [
                        1785,
                        1848,
                        1911,
                        1995,
                        2058,
                        2100,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        2100,
                        2184,
                        2268
                ],
                "mandiMin": [
                        1573,
                        1628,
                        1702,
                        1776,
                        1850,
                        1850,
                        null,
                        null
                ],
                "mandiMax": [
                        1998,
                        2068,
                        2162,
                        2256,
                        2350,
                        2350,
                        null,
                        null
                ]
        },
        "3M": {
                "labels": [
                        "Jun 26",
                        "Jul 26",
                        "Aug 26",
                        "Sep 26 (Now)",
                        "Oct 26 (AI)",
                        "Nov 26 (AI)"
                ],
                "historical": [
                        1680,
                        1806,
                        1932,
                        2100,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        2100,
                        2226,
                        2352
                ],
                "mandiMin": [
                        1480,
                        1591,
                        1702,
                        1850,
                        null,
                        null
                ],
                "mandiMax": [
                        1880,
                        2021,
                        2162,
                        2350,
                        null,
                        null
                ]
        },
        "1Y": {
                "labels": [
                        "Oct 25",
                        "Dec 25",
                        "Feb 26",
                        "Apr 26",
                        "Jun 26",
                        "Aug 26",
                        "Sep 26 (Now)"
                ],
                "historical": [
                        2205,
                        2520,
                        1785,
                        1575,
                        1680,
                        1890,
                        2100
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        2100
                ],
                "mandiMin": [
                        1943,
                        2220,
                        1573,
                        1388,
                        1480,
                        1665,
                        1850
                ],
                "mandiMax": [
                        2468,
                        2820,
                        1998,
                        1763,
                        1880,
                        2115,
                        2350
                ]
        }
}
    },
    tur: {
      key: "tur",
      name: "Latur Red Tur (Arhar Dal)",
      emoji: "🫘",
      hub: "Latur Pulses APMC",
      currentModalQt: 9200,
      currentMinQt: 8400,
      currentMaxQt: 10100,
      farmGateQt: 9000,
      terminalVashiQt: 10600,
      arbitragePct: 15.1,
      trendPct: "+4.2%",
      trendDir: "up",
      arrivalsQt: 6700,
      arrivalsChange: "+5.5% Pulse Mills",
      sentiment: "Bullish Dal Mill Off-take",
      sentimentScore: 86,
      recommendation: "Marathwada bold red tur with high milling recovery rate; lock advance escrow for mills.",
      districtHubs: [
        {
                "district": "Latur",
                "mandi": "Latur Pulses APMC",
                "modalQt": 9200,
                "minQt": 8400,
                "maxQt": 10100,
                "arrivalsQt": 6700,
                "factor": 1
        },
        {
                "district": "Nanded",
                "mandi": "Mukhed APMC",
                "modalQt": 9150,
                "minQt": 8350,
                "maxQt": 10050,
                "arrivalsQt": 4300,
                "factor": 0.994
        },
        {
                "district": "Akola",
                "mandi": "Akola Pulses APMC",
                "modalQt": 9250,
                "minQt": 8450,
                "maxQt": 10150,
                "arrivalsQt": 5100,
                "factor": 1.005
        },
        {
                "district": "Nashik",
                "mandi": "Nashik Latur Red Tur APMC",
                "modalQt": 9200,
                "minQt": 8400,
                "maxQt": 10100,
                "arrivalsQt": 6850,
                "factor": 1
        },
        {
                "district": "Pune",
                "mandi": "Pune Latur Red Tur APMC",
                "modalQt": 9430,
                "minQt": 8610,
                "maxQt": 10353,
                "arrivalsQt": 5400,
                "factor": 1.025
        },
        {
                "district": "Jalgaon",
                "mandi": "Jalgaon Latur Red Tur APMC",
                "modalQt": 9034,
                "minQt": 8249,
                "maxQt": 9918,
                "arrivalsQt": 4200,
                "factor": 0.982
        },
        {
                "district": "Nagpur",
                "mandi": "Nagpur Latur Red Tur APMC",
                "modalQt": 9366,
                "minQt": 8551,
                "maxQt": 10282,
                "arrivalsQt": 4900,
                "factor": 1.018
        },
        {
                "district": "Sangli",
                "mandi": "Sangli Latur Red Tur APMC",
                "modalQt": 9126,
                "minQt": 8333,
                "maxQt": 10019,
                "arrivalsQt": 3600,
                "factor": 0.992
        },
        {
                "district": "Solapur",
                "mandi": "Solapur Latur Red Tur APMC",
                "modalQt": 9255,
                "minQt": 8450,
                "maxQt": 10161,
                "arrivalsQt": 4500,
                "factor": 1.006
        },
        {
                "district": "Ahmednagar",
                "mandi": "Ahmednagar Latur Red Tur APMC",
                "modalQt": 9080,
                "minQt": 8291,
                "maxQt": 9969,
                "arrivalsQt": 5100,
                "factor": 0.987
        },
        {
                "district": "Amravati",
                "mandi": "Amravati Latur Red Tur APMC",
                "modalQt": 9145,
                "minQt": 8350,
                "maxQt": 10039,
                "arrivalsQt": 3800,
                "factor": 0.994
        },
        {
                "district": "Satara",
                "mandi": "Satara Latur Red Tur APMC",
                "modalQt": 9310,
                "minQt": 8501,
                "maxQt": 10221,
                "arrivalsQt": 2800,
                "factor": 1.012
        },
        {
                "district": "Kolhapur",
                "mandi": "Kolhapur Latur Red Tur APMC",
                "modalQt": 9402,
                "minQt": 8585,
                "maxQt": 10322,
                "arrivalsQt": 3300,
                "factor": 1.022
        },
        {
                "district": "Dhule",
                "mandi": "Dhule Latur Red Tur APMC",
                "modalQt": 9025,
                "minQt": 8240,
                "maxQt": 9908,
                "arrivalsQt": 3500,
                "factor": 0.981
        },
        {
                "district": "Nandurbar",
                "mandi": "Nandurbar Latur Red Tur APMC",
                "modalQt": 8998,
                "minQt": 8215,
                "maxQt": 9878,
                "arrivalsQt": 2900,
                "factor": 0.978
        },
        {
                "district": "Beed",
                "mandi": "Beed Latur Red Tur APMC",
                "modalQt": 9071,
                "minQt": 8282,
                "maxQt": 9959,
                "arrivalsQt": 2400,
                "factor": 0.986
        },
        {
                "district": "Washim",
                "mandi": "Washim Latur Red Tur APMC",
                "modalQt": 9136,
                "minQt": 8341,
                "maxQt": 10029,
                "arrivalsQt": 2300,
                "factor": 0.993
        },
        {
                "district": "Palghar",
                "mandi": "Palghar Latur Red Tur APMC",
                "modalQt": 9338,
                "minQt": 8526,
                "maxQt": 10251,
                "arrivalsQt": 2100,
                "factor": 1.015
        },
        {
                "district": "Dharashiv",
                "mandi": "Dharashiv Latur Red Tur APMC",
                "modalQt": 9099,
                "minQt": 8308,
                "maxQt": 9989,
                "arrivalsQt": 2200,
                "factor": 0.989
        },
        {
                "district": "Chhatrapati Sambhajinagar",
                "mandi": "Chhatrapati Sambhajinagar Latur Red Tur APMC",
                "modalQt": 9255,
                "minQt": 8450,
                "maxQt": 10161,
                "arrivalsQt": 3400,
                "factor": 1.006
        },
        {
                "district": "Hingoli",
                "mandi": "Hingoli Latur Red Tur APMC",
                "modalQt": 9108,
                "minQt": 8316,
                "maxQt": 9999,
                "arrivalsQt": 1900,
                "factor": 0.99
        },
        {
                "district": "Wardha",
                "mandi": "Wardha Latur Red Tur APMC",
                "modalQt": 9163,
                "minQt": 8366,
                "maxQt": 10060,
                "arrivalsQt": 2400,
                "factor": 0.996
        },
        {
                "district": "Ratnagiri",
                "mandi": "Ratnagiri Latur Red Tur APMC",
                "modalQt": 9614,
                "minQt": 8778,
                "maxQt": 10555,
                "arrivalsQt": 1800,
                "factor": 1.045
        },
        {
                "district": "Sindhudurg",
                "mandi": "Sindhudurg Latur Red Tur APMC",
                "modalQt": 9642,
                "minQt": 8803,
                "maxQt": 10585,
                "arrivalsQt": 1600,
                "factor": 1.048
        },
        {
                "district": "Raigad",
                "mandi": "Raigad Latur Red Tur APMC",
                "modalQt": 9522,
                "minQt": 8694,
                "maxQt": 10454,
                "arrivalsQt": 2700,
                "factor": 1.035
        },
        {
                "district": "Yavatmal",
                "mandi": "Yavatmal Latur Red Tur APMC",
                "modalQt": 9080,
                "minQt": 8291,
                "maxQt": 9969,
                "arrivalsQt": 3300,
                "factor": 0.987
        },
        {
                "district": "Buldhana",
                "mandi": "Buldhana Latur Red Tur APMC",
                "modalQt": 9136,
                "minQt": 8341,
                "maxQt": 10029,
                "arrivalsQt": 3100,
                "factor": 0.993
        },
        {
                "district": "Bhandara",
                "mandi": "Bhandara Latur Red Tur APMC",
                "modalQt": 9053,
                "minQt": 8266,
                "maxQt": 9938,
                "arrivalsQt": 2600,
                "factor": 0.984
        },
        {
                "district": "Jalna",
                "mandi": "Jalna Latur Red Tur APMC",
                "modalQt": 9163,
                "minQt": 8366,
                "maxQt": 10060,
                "arrivalsQt": 3200,
                "factor": 0.996
        },
        {
                "district": "Parbhani",
                "mandi": "Parbhani Latur Red Tur APMC",
                "modalQt": 9117,
                "minQt": 8324,
                "maxQt": 10009,
                "arrivalsQt": 2500,
                "factor": 0.991
        }
],
      history: {
        "7D": {
                "labels": [
                        "08 Sep",
                        "09 Sep",
                        "10 Sep",
                        "11 Sep",
                        "12 Sep",
                        "13 Sep",
                        "14 Sep (Today)",
                        "16 Sep (AI)",
                        "18 Sep (AI)",
                        "20 Sep (AI)"
                ],
                "historical": [
                        8556,
                        8740,
                        8832,
                        9016,
                        9108,
                        9154,
                        9200,
                        null,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        9200,
                        9384,
                        9660,
                        9844
                ],
                "mandiMin": [
                        7980,
                        8064,
                        8148,
                        8232,
                        8316,
                        8400,
                        8400,
                        null,
                        null,
                        null
                ],
                "mandiMax": [
                        9393,
                        9595,
                        9797,
                        9898,
                        9999,
                        10100,
                        10100,
                        null,
                        null,
                        null
                ]
        },
        "1M": {
                "labels": [
                        "15 Aug",
                        "22 Aug",
                        "29 Aug",
                        "05 Sep",
                        "12 Sep",
                        "14 Sep (Today)",
                        "21 Sep (AI)",
                        "28 Sep (AI)"
                ],
                "historical": [
                        7820,
                        8096,
                        8372,
                        8740,
                        9016,
                        9200,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        9200,
                        9568,
                        9936
                ],
                "mandiMin": [
                        7140,
                        7392,
                        7728,
                        8064,
                        8400,
                        8400,
                        null,
                        null
                ],
                "mandiMax": [
                        8585,
                        8888,
                        9292,
                        9696,
                        10100,
                        10100,
                        null,
                        null
                ]
        },
        "3M": {
                "labels": [
                        "Jun 26",
                        "Jul 26",
                        "Aug 26",
                        "Sep 26 (Now)",
                        "Oct 26 (AI)",
                        "Nov 26 (AI)"
                ],
                "historical": [
                        7360,
                        7912,
                        8464,
                        9200,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        9200,
                        9752,
                        10304
                ],
                "mandiMin": [
                        6720,
                        7224,
                        7728,
                        8400,
                        null,
                        null
                ],
                "mandiMax": [
                        8080,
                        8686,
                        9292,
                        10100,
                        null,
                        null
                ]
        },
        "1Y": {
                "labels": [
                        "Oct 25",
                        "Dec 25",
                        "Feb 26",
                        "Apr 26",
                        "Jun 26",
                        "Aug 26",
                        "Sep 26 (Now)"
                ],
                "historical": [
                        9660,
                        11040,
                        7820,
                        6900,
                        7360,
                        8280,
                        9200
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        9200
                ],
                "mandiMin": [
                        8820,
                        10080,
                        7140,
                        6300,
                        6720,
                        7560,
                        8400
                ],
                "mandiMax": [
                        10605,
                        12120,
                        8585,
                        7575,
                        8080,
                        9090,
                        10100
                ]
        }
}
    },
    chana: {
      key: "chana",
      name: "Desi Chana (Akola Bengal Gram)",
      emoji: "🫘",
      hub: "Akola & Khamgaon APMC",
      currentModalQt: 5400,
      currentMinQt: 4900,
      currentMaxQt: 5900,
      farmGateQt: 5300,
      terminalVashiQt: 6100,
      arbitragePct: 13.1,
      trendPct: "+2.8%",
      trendDir: "up",
      arrivalsQt: 8100,
      arrivalsChange: "+12.0% Active",
      sentiment: "Strong Besan Processor Buying",
      sentimentScore: 80,
      recommendation: "High protein Vijay and Digvijay varieties in Vidarbha pulses market yards.",
      districtHubs: [
        {
                "district": "Akola",
                "mandi": "Khamgaon APMC",
                "modalQt": 5400,
                "minQt": 4900,
                "maxQt": 5900,
                "arrivalsQt": 8100,
                "factor": 1
        },
        {
                "district": "Latur",
                "mandi": "Udgir APMC",
                "modalQt": 5380,
                "minQt": 4880,
                "maxQt": 5880,
                "arrivalsQt": 5900,
                "factor": 0.996
        },
        {
                "district": "Amravati",
                "mandi": "Chandur APMC",
                "modalQt": 5420,
                "minQt": 4920,
                "maxQt": 5920,
                "arrivalsQt": 4600,
                "factor": 1.003
        },
        {
                "district": "Nashik",
                "mandi": "Nashik Desi Chana APMC",
                "modalQt": 5400,
                "minQt": 4900,
                "maxQt": 5900,
                "arrivalsQt": 6850,
                "factor": 1
        },
        {
                "district": "Pune",
                "mandi": "Pune Desi Chana APMC",
                "modalQt": 5535,
                "minQt": 5023,
                "maxQt": 6047,
                "arrivalsQt": 5400,
                "factor": 1.025
        },
        {
                "district": "Jalgaon",
                "mandi": "Jalgaon Desi Chana APMC",
                "modalQt": 5303,
                "minQt": 4812,
                "maxQt": 5794,
                "arrivalsQt": 4200,
                "factor": 0.982
        },
        {
                "district": "Nagpur",
                "mandi": "Nagpur Desi Chana APMC",
                "modalQt": 5497,
                "minQt": 4988,
                "maxQt": 6006,
                "arrivalsQt": 4900,
                "factor": 1.018
        },
        {
                "district": "Sangli",
                "mandi": "Sangli Desi Chana APMC",
                "modalQt": 5357,
                "minQt": 4861,
                "maxQt": 5853,
                "arrivalsQt": 3600,
                "factor": 0.992
        },
        {
                "district": "Solapur",
                "mandi": "Solapur Desi Chana APMC",
                "modalQt": 5432,
                "minQt": 4929,
                "maxQt": 5935,
                "arrivalsQt": 4500,
                "factor": 1.006
        },
        {
                "district": "Ahmednagar",
                "mandi": "Ahmednagar Desi Chana APMC",
                "modalQt": 5330,
                "minQt": 4836,
                "maxQt": 5823,
                "arrivalsQt": 5100,
                "factor": 0.987
        },
        {
                "district": "Nanded",
                "mandi": "Nanded Desi Chana APMC",
                "modalQt": 5384,
                "minQt": 4885,
                "maxQt": 5882,
                "arrivalsQt": 3200,
                "factor": 0.997
        },
        {
                "district": "Satara",
                "mandi": "Satara Desi Chana APMC",
                "modalQt": 5465,
                "minQt": 4959,
                "maxQt": 5971,
                "arrivalsQt": 2800,
                "factor": 1.012
        },
        {
                "district": "Kolhapur",
                "mandi": "Kolhapur Desi Chana APMC",
                "modalQt": 5519,
                "minQt": 5008,
                "maxQt": 6030,
                "arrivalsQt": 3300,
                "factor": 1.022
        },
        {
                "district": "Dhule",
                "mandi": "Dhule Desi Chana APMC",
                "modalQt": 5297,
                "minQt": 4807,
                "maxQt": 5788,
                "arrivalsQt": 3500,
                "factor": 0.981
        },
        {
                "district": "Nandurbar",
                "mandi": "Nandurbar Desi Chana APMC",
                "modalQt": 5281,
                "minQt": 4792,
                "maxQt": 5770,
                "arrivalsQt": 2900,
                "factor": 0.978
        },
        {
                "district": "Beed",
                "mandi": "Beed Desi Chana APMC",
                "modalQt": 5324,
                "minQt": 4831,
                "maxQt": 5817,
                "arrivalsQt": 2400,
                "factor": 0.986
        },
        {
                "district": "Washim",
                "mandi": "Washim Desi Chana APMC",
                "modalQt": 5362,
                "minQt": 4866,
                "maxQt": 5859,
                "arrivalsQt": 2300,
                "factor": 0.993
        },
        {
                "district": "Palghar",
                "mandi": "Palghar Desi Chana APMC",
                "modalQt": 5481,
                "minQt": 4973,
                "maxQt": 5988,
                "arrivalsQt": 2100,
                "factor": 1.015
        },
        {
                "district": "Dharashiv",
                "mandi": "Dharashiv Desi Chana APMC",
                "modalQt": 5341,
                "minQt": 4846,
                "maxQt": 5835,
                "arrivalsQt": 2200,
                "factor": 0.989
        },
        {
                "district": "Chhatrapati Sambhajinagar",
                "mandi": "Chhatrapati Sambhajinagar Desi Chana APMC",
                "modalQt": 5432,
                "minQt": 4929,
                "maxQt": 5935,
                "arrivalsQt": 3400,
                "factor": 1.006
        },
        {
                "district": "Hingoli",
                "mandi": "Hingoli Desi Chana APMC",
                "modalQt": 5346,
                "minQt": 4851,
                "maxQt": 5841,
                "arrivalsQt": 1900,
                "factor": 0.99
        },
        {
                "district": "Wardha",
                "mandi": "Wardha Desi Chana APMC",
                "modalQt": 5378,
                "minQt": 4880,
                "maxQt": 5876,
                "arrivalsQt": 2400,
                "factor": 0.996
        },
        {
                "district": "Ratnagiri",
                "mandi": "Ratnagiri Desi Chana APMC",
                "modalQt": 5643,
                "minQt": 5121,
                "maxQt": 6166,
                "arrivalsQt": 1800,
                "factor": 1.045
        },
        {
                "district": "Sindhudurg",
                "mandi": "Sindhudurg Desi Chana APMC",
                "modalQt": 5659,
                "minQt": 5135,
                "maxQt": 6183,
                "arrivalsQt": 1600,
                "factor": 1.048
        },
        {
                "district": "Raigad",
                "mandi": "Raigad Desi Chana APMC",
                "modalQt": 5589,
                "minQt": 5072,
                "maxQt": 6106,
                "arrivalsQt": 2700,
                "factor": 1.035
        },
        {
                "district": "Yavatmal",
                "mandi": "Yavatmal Desi Chana APMC",
                "modalQt": 5330,
                "minQt": 4836,
                "maxQt": 5823,
                "arrivalsQt": 3300,
                "factor": 0.987
        },
        {
                "district": "Buldhana",
                "mandi": "Buldhana Desi Chana APMC",
                "modalQt": 5362,
                "minQt": 4866,
                "maxQt": 5859,
                "arrivalsQt": 3100,
                "factor": 0.993
        },
        {
                "district": "Bhandara",
                "mandi": "Bhandara Desi Chana APMC",
                "modalQt": 5314,
                "minQt": 4822,
                "maxQt": 5806,
                "arrivalsQt": 2600,
                "factor": 0.984
        },
        {
                "district": "Jalna",
                "mandi": "Jalna Desi Chana APMC",
                "modalQt": 5378,
                "minQt": 4880,
                "maxQt": 5876,
                "arrivalsQt": 3200,
                "factor": 0.996
        },
        {
                "district": "Parbhani",
                "mandi": "Parbhani Desi Chana APMC",
                "modalQt": 5351,
                "minQt": 4856,
                "maxQt": 5847,
                "arrivalsQt": 2500,
                "factor": 0.991
        }
],
      history: {
        "7D": {
                "labels": [
                        "08 Sep",
                        "09 Sep",
                        "10 Sep",
                        "11 Sep",
                        "12 Sep",
                        "13 Sep",
                        "14 Sep (Today)",
                        "16 Sep (AI)",
                        "18 Sep (AI)",
                        "20 Sep (AI)"
                ],
                "historical": [
                        5022,
                        5130,
                        5184,
                        5292,
                        5346,
                        5373,
                        5400,
                        null,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        5400,
                        5508,
                        5670,
                        5778
                ],
                "mandiMin": [
                        4655,
                        4704,
                        4753,
                        4802,
                        4851,
                        4900,
                        4900,
                        null,
                        null,
                        null
                ],
                "mandiMax": [
                        5487,
                        5605,
                        5723,
                        5782,
                        5841,
                        5900,
                        5900,
                        null,
                        null,
                        null
                ]
        },
        "1M": {
                "labels": [
                        "15 Aug",
                        "22 Aug",
                        "29 Aug",
                        "05 Sep",
                        "12 Sep",
                        "14 Sep (Today)",
                        "21 Sep (AI)",
                        "28 Sep (AI)"
                ],
                "historical": [
                        4590,
                        4752,
                        4914,
                        5130,
                        5292,
                        5400,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        5400,
                        5616,
                        5832
                ],
                "mandiMin": [
                        4165,
                        4312,
                        4508,
                        4704,
                        4900,
                        4900,
                        null,
                        null
                ],
                "mandiMax": [
                        5015,
                        5192,
                        5428,
                        5664,
                        5900,
                        5900,
                        null,
                        null
                ]
        },
        "3M": {
                "labels": [
                        "Jun 26",
                        "Jul 26",
                        "Aug 26",
                        "Sep 26 (Now)",
                        "Oct 26 (AI)",
                        "Nov 26 (AI)"
                ],
                "historical": [
                        4320,
                        4644,
                        4968,
                        5400,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        5400,
                        5724,
                        6048
                ],
                "mandiMin": [
                        3920,
                        4214,
                        4508,
                        4900,
                        null,
                        null
                ],
                "mandiMax": [
                        4720,
                        5074,
                        5428,
                        5900,
                        null,
                        null
                ]
        },
        "1Y": {
                "labels": [
                        "Oct 25",
                        "Dec 25",
                        "Feb 26",
                        "Apr 26",
                        "Jun 26",
                        "Aug 26",
                        "Sep 26 (Now)"
                ],
                "historical": [
                        5670,
                        6480,
                        4590,
                        4050,
                        4320,
                        4860,
                        5400
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        5400
                ],
                "mandiMin": [
                        5145,
                        5880,
                        4165,
                        3675,
                        3920,
                        4410,
                        4900
                ],
                "mandiMax": [
                        6195,
                        7080,
                        5015,
                        4425,
                        4720,
                        5310,
                        5900
                ]
        }
}
    },
    mung: {
      key: "mung",
      name: "Green Mung Bean (Jalgaon Shiny)",
      emoji: "🟢",
      hub: "Jalgaon & Jalna APMC",
      currentModalQt: 7800,
      currentMinQt: 7000,
      currentMaxQt: 8500,
      farmGateQt: 7650,
      terminalVashiQt: 8800,
      arbitragePct: 13.1,
      trendPct: "+3.5%",
      trendDir: "up",
      arrivalsQt: 3800,
      arrivalsChange: "+7.1% Peak",
      sentiment: "Sprout & Dal Mill Demand",
      sentimentScore: 82,
      recommendation: "Bold shiny green mung beans harvested across Khandesh and Marathwada.",
      districtHubs: [
        {
                "district": "Jalgaon",
                "mandi": "Pachora APMC",
                "modalQt": 7800,
                "minQt": 7000,
                "maxQt": 8500,
                "arrivalsQt": 3800,
                "factor": 1
        },
        {
                "district": "Jalna",
                "mandi": "Ambad APMC",
                "modalQt": 7750,
                "minQt": 6950,
                "maxQt": 8450,
                "arrivalsQt": 2700,
                "factor": 0.993
        },
        {
                "district": "Beed",
                "mandi": "Majalgaon APMC",
                "modalQt": 7820,
                "minQt": 7020,
                "maxQt": 8520,
                "arrivalsQt": 2100,
                "factor": 1.002
        },
        {
                "district": "Nashik",
                "mandi": "Nashik Green Mung Bean APMC",
                "modalQt": 7800,
                "minQt": 7000,
                "maxQt": 8500,
                "arrivalsQt": 6850,
                "factor": 1
        },
        {
                "district": "Pune",
                "mandi": "Pune Green Mung Bean APMC",
                "modalQt": 7995,
                "minQt": 7175,
                "maxQt": 8713,
                "arrivalsQt": 5400,
                "factor": 1.025
        },
        {
                "district": "Latur",
                "mandi": "Latur Green Mung Bean APMC",
                "modalQt": 7761,
                "minQt": 6965,
                "maxQt": 8458,
                "arrivalsQt": 6400,
                "factor": 0.995
        },
        {
                "district": "Nagpur",
                "mandi": "Nagpur Green Mung Bean APMC",
                "modalQt": 7940,
                "minQt": 7126,
                "maxQt": 8653,
                "arrivalsQt": 4900,
                "factor": 1.018
        },
        {
                "district": "Sangli",
                "mandi": "Sangli Green Mung Bean APMC",
                "modalQt": 7738,
                "minQt": 6944,
                "maxQt": 8432,
                "arrivalsQt": 3600,
                "factor": 0.992
        },
        {
                "district": "Solapur",
                "mandi": "Solapur Green Mung Bean APMC",
                "modalQt": 7847,
                "minQt": 7042,
                "maxQt": 8551,
                "arrivalsQt": 4500,
                "factor": 1.006
        },
        {
                "district": "Ahmednagar",
                "mandi": "Ahmednagar Green Mung Bean APMC",
                "modalQt": 7699,
                "minQt": 6909,
                "maxQt": 8390,
                "arrivalsQt": 5100,
                "factor": 0.987
        },
        {
                "district": "Amravati",
                "mandi": "Amravati Green Mung Bean APMC",
                "modalQt": 7753,
                "minQt": 6958,
                "maxQt": 8449,
                "arrivalsQt": 3800,
                "factor": 0.994
        },
        {
                "district": "Akola",
                "mandi": "Akola Green Mung Bean APMC",
                "modalQt": 7730,
                "minQt": 6937,
                "maxQt": 8424,
                "arrivalsQt": 4100,
                "factor": 0.991
        },
        {
                "district": "Nanded",
                "mandi": "Nanded Green Mung Bean APMC",
                "modalQt": 7777,
                "minQt": 6979,
                "maxQt": 8475,
                "arrivalsQt": 3200,
                "factor": 0.997
        },
        {
                "district": "Satara",
                "mandi": "Satara Green Mung Bean APMC",
                "modalQt": 7894,
                "minQt": 7084,
                "maxQt": 8602,
                "arrivalsQt": 2800,
                "factor": 1.012
        },
        {
                "district": "Kolhapur",
                "mandi": "Kolhapur Green Mung Bean APMC",
                "modalQt": 7972,
                "minQt": 7154,
                "maxQt": 8687,
                "arrivalsQt": 3300,
                "factor": 1.022
        },
        {
                "district": "Dhule",
                "mandi": "Dhule Green Mung Bean APMC",
                "modalQt": 7652,
                "minQt": 6867,
                "maxQt": 8339,
                "arrivalsQt": 3500,
                "factor": 0.981
        },
        {
                "district": "Nandurbar",
                "mandi": "Nandurbar Green Mung Bean APMC",
                "modalQt": 7628,
                "minQt": 6846,
                "maxQt": 8313,
                "arrivalsQt": 2900,
                "factor": 0.978
        },
        {
                "district": "Washim",
                "mandi": "Washim Green Mung Bean APMC",
                "modalQt": 7745,
                "minQt": 6951,
                "maxQt": 8441,
                "arrivalsQt": 2300,
                "factor": 0.993
        },
        {
                "district": "Palghar",
                "mandi": "Palghar Green Mung Bean APMC",
                "modalQt": 7917,
                "minQt": 7105,
                "maxQt": 8628,
                "arrivalsQt": 2100,
                "factor": 1.015
        },
        {
                "district": "Dharashiv",
                "mandi": "Dharashiv Green Mung Bean APMC",
                "modalQt": 7714,
                "minQt": 6923,
                "maxQt": 8407,
                "arrivalsQt": 2200,
                "factor": 0.989
        },
        {
                "district": "Chhatrapati Sambhajinagar",
                "mandi": "Chhatrapati Sambhajinagar Green Mung Bean APMC",
                "modalQt": 7847,
                "minQt": 7042,
                "maxQt": 8551,
                "arrivalsQt": 3400,
                "factor": 1.006
        },
        {
                "district": "Hingoli",
                "mandi": "Hingoli Green Mung Bean APMC",
                "modalQt": 7722,
                "minQt": 6930,
                "maxQt": 8415,
                "arrivalsQt": 1900,
                "factor": 0.99
        },
        {
                "district": "Wardha",
                "mandi": "Wardha Green Mung Bean APMC",
                "modalQt": 7769,
                "minQt": 6972,
                "maxQt": 8466,
                "arrivalsQt": 2400,
                "factor": 0.996
        },
        {
                "district": "Ratnagiri",
                "mandi": "Ratnagiri Green Mung Bean APMC",
                "modalQt": 8151,
                "minQt": 7315,
                "maxQt": 8883,
                "arrivalsQt": 1800,
                "factor": 1.045
        },
        {
                "district": "Sindhudurg",
                "mandi": "Sindhudurg Green Mung Bean APMC",
                "modalQt": 8174,
                "minQt": 7336,
                "maxQt": 8908,
                "arrivalsQt": 1600,
                "factor": 1.048
        },
        {
                "district": "Raigad",
                "mandi": "Raigad Green Mung Bean APMC",
                "modalQt": 8073,
                "minQt": 7245,
                "maxQt": 8798,
                "arrivalsQt": 2700,
                "factor": 1.035
        },
        {
                "district": "Yavatmal",
                "mandi": "Yavatmal Green Mung Bean APMC",
                "modalQt": 7699,
                "minQt": 6909,
                "maxQt": 8390,
                "arrivalsQt": 3300,
                "factor": 0.987
        },
        {
                "district": "Buldhana",
                "mandi": "Buldhana Green Mung Bean APMC",
                "modalQt": 7745,
                "minQt": 6951,
                "maxQt": 8441,
                "arrivalsQt": 3100,
                "factor": 0.993
        },
        {
                "district": "Bhandara",
                "mandi": "Bhandara Green Mung Bean APMC",
                "modalQt": 7675,
                "minQt": 6888,
                "maxQt": 8364,
                "arrivalsQt": 2600,
                "factor": 0.984
        },
        {
                "district": "Parbhani",
                "mandi": "Parbhani Green Mung Bean APMC",
                "modalQt": 7730,
                "minQt": 6937,
                "maxQt": 8424,
                "arrivalsQt": 2500,
                "factor": 0.991
        }
],
      history: {
        "7D": {
                "labels": [
                        "08 Sep",
                        "09 Sep",
                        "10 Sep",
                        "11 Sep",
                        "12 Sep",
                        "13 Sep",
                        "14 Sep (Today)",
                        "16 Sep (AI)",
                        "18 Sep (AI)",
                        "20 Sep (AI)"
                ],
                "historical": [
                        7254,
                        7410,
                        7488,
                        7644,
                        7722,
                        7761,
                        7800,
                        null,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        7800,
                        7956,
                        8190,
                        8346
                ],
                "mandiMin": [
                        6650,
                        6720,
                        6790,
                        6860,
                        6930,
                        7000,
                        7000,
                        null,
                        null,
                        null
                ],
                "mandiMax": [
                        7905,
                        8075,
                        8245,
                        8330,
                        8415,
                        8500,
                        8500,
                        null,
                        null,
                        null
                ]
        },
        "1M": {
                "labels": [
                        "15 Aug",
                        "22 Aug",
                        "29 Aug",
                        "05 Sep",
                        "12 Sep",
                        "14 Sep (Today)",
                        "21 Sep (AI)",
                        "28 Sep (AI)"
                ],
                "historical": [
                        6630,
                        6864,
                        7098,
                        7410,
                        7644,
                        7800,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        7800,
                        8112,
                        8424
                ],
                "mandiMin": [
                        5950,
                        6160,
                        6440,
                        6720,
                        7000,
                        7000,
                        null,
                        null
                ],
                "mandiMax": [
                        7225,
                        7480,
                        7820,
                        8160,
                        8500,
                        8500,
                        null,
                        null
                ]
        },
        "3M": {
                "labels": [
                        "Jun 26",
                        "Jul 26",
                        "Aug 26",
                        "Sep 26 (Now)",
                        "Oct 26 (AI)",
                        "Nov 26 (AI)"
                ],
                "historical": [
                        6240,
                        6708,
                        7176,
                        7800,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        7800,
                        8268,
                        8736
                ],
                "mandiMin": [
                        5600,
                        6020,
                        6440,
                        7000,
                        null,
                        null
                ],
                "mandiMax": [
                        6800,
                        7310,
                        7820,
                        8500,
                        null,
                        null
                ]
        },
        "1Y": {
                "labels": [
                        "Oct 25",
                        "Dec 25",
                        "Feb 26",
                        "Apr 26",
                        "Jun 26",
                        "Aug 26",
                        "Sep 26 (Now)"
                ],
                "historical": [
                        8190,
                        9360,
                        6630,
                        5850,
                        6240,
                        7020,
                        7800
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        7800
                ],
                "mandiMin": [
                        7350,
                        8400,
                        5950,
                        5250,
                        5600,
                        6300,
                        7000
                ],
                "mandiMax": [
                        8925,
                        10200,
                        7225,
                        6375,
                        6800,
                        7650,
                        8500
                ]
        }
}
    },
    urad: {
      key: "urad",
      name: "Black Urad Dal (Nanded Black Gram)",
      emoji: "🖤",
      hub: "Nanded & Latur APMC",
      currentModalQt: 8100,
      currentMinQt: 7300,
      currentMaxQt: 8900,
      farmGateQt: 7950,
      terminalVashiQt: 9200,
      arbitragePct: 13.6,
      trendPct: "+2.9%",
      trendDir: "up",
      arrivalsQt: 3500,
      arrivalsChange: "+6.4% Steady",
      sentiment: "Papad & FMCG Brand Buying",
      sentimentScore: 81,
      recommendation: "High gluten index black urad suitable for papad manufacturers and dal processors.",
      districtHubs: [
        {
                "district": "Nanded",
                "mandi": "Degloor APMC",
                "modalQt": 8100,
                "minQt": 7300,
                "maxQt": 8900,
                "arrivalsQt": 3500,
                "factor": 1
        },
        {
                "district": "Latur",
                "mandi": "Latur Grain Yard",
                "modalQt": 8050,
                "minQt": 7250,
                "maxQt": 8850,
                "arrivalsQt": 3100,
                "factor": 0.993
        },
        {
                "district": "Parbhani",
                "mandi": "Parbhani APMC",
                "modalQt": 8120,
                "minQt": 7320,
                "maxQt": 8920,
                "arrivalsQt": 2400,
                "factor": 1.002
        },
        {
                "district": "Nashik",
                "mandi": "Nashik Black Urad Dal APMC",
                "modalQt": 8100,
                "minQt": 7300,
                "maxQt": 8900,
                "arrivalsQt": 6850,
                "factor": 1
        },
        {
                "district": "Pune",
                "mandi": "Pune Black Urad Dal APMC",
                "modalQt": 8303,
                "minQt": 7482,
                "maxQt": 9123,
                "arrivalsQt": 5400,
                "factor": 1.025
        },
        {
                "district": "Jalgaon",
                "mandi": "Jalgaon Black Urad Dal APMC",
                "modalQt": 7954,
                "minQt": 7169,
                "maxQt": 8740,
                "arrivalsQt": 4200,
                "factor": 0.982
        },
        {
                "district": "Nagpur",
                "mandi": "Nagpur Black Urad Dal APMC",
                "modalQt": 8246,
                "minQt": 7431,
                "maxQt": 9060,
                "arrivalsQt": 4900,
                "factor": 1.018
        },
        {
                "district": "Sangli",
                "mandi": "Sangli Black Urad Dal APMC",
                "modalQt": 8035,
                "minQt": 7242,
                "maxQt": 8829,
                "arrivalsQt": 3600,
                "factor": 0.992
        },
        {
                "district": "Solapur",
                "mandi": "Solapur Black Urad Dal APMC",
                "modalQt": 8149,
                "minQt": 7344,
                "maxQt": 8953,
                "arrivalsQt": 4500,
                "factor": 1.006
        },
        {
                "district": "Ahmednagar",
                "mandi": "Ahmednagar Black Urad Dal APMC",
                "modalQt": 7995,
                "minQt": 7205,
                "maxQt": 8784,
                "arrivalsQt": 5100,
                "factor": 0.987
        },
        {
                "district": "Amravati",
                "mandi": "Amravati Black Urad Dal APMC",
                "modalQt": 8051,
                "minQt": 7256,
                "maxQt": 8847,
                "arrivalsQt": 3800,
                "factor": 0.994
        },
        {
                "district": "Akola",
                "mandi": "Akola Black Urad Dal APMC",
                "modalQt": 8027,
                "minQt": 7234,
                "maxQt": 8820,
                "arrivalsQt": 4100,
                "factor": 0.991
        },
        {
                "district": "Satara",
                "mandi": "Satara Black Urad Dal APMC",
                "modalQt": 8197,
                "minQt": 7388,
                "maxQt": 9007,
                "arrivalsQt": 2800,
                "factor": 1.012
        },
        {
                "district": "Kolhapur",
                "mandi": "Kolhapur Black Urad Dal APMC",
                "modalQt": 8278,
                "minQt": 7461,
                "maxQt": 9096,
                "arrivalsQt": 3300,
                "factor": 1.022
        },
        {
                "district": "Dhule",
                "mandi": "Dhule Black Urad Dal APMC",
                "modalQt": 7946,
                "minQt": 7161,
                "maxQt": 8731,
                "arrivalsQt": 3500,
                "factor": 0.981
        },
        {
                "district": "Nandurbar",
                "mandi": "Nandurbar Black Urad Dal APMC",
                "modalQt": 7922,
                "minQt": 7139,
                "maxQt": 8704,
                "arrivalsQt": 2900,
                "factor": 0.978
        },
        {
                "district": "Beed",
                "mandi": "Beed Black Urad Dal APMC",
                "modalQt": 7987,
                "minQt": 7198,
                "maxQt": 8775,
                "arrivalsQt": 2400,
                "factor": 0.986
        },
        {
                "district": "Washim",
                "mandi": "Washim Black Urad Dal APMC",
                "modalQt": 8043,
                "minQt": 7249,
                "maxQt": 8838,
                "arrivalsQt": 2300,
                "factor": 0.993
        },
        {
                "district": "Palghar",
                "mandi": "Palghar Black Urad Dal APMC",
                "modalQt": 8222,
                "minQt": 7409,
                "maxQt": 9034,
                "arrivalsQt": 2100,
                "factor": 1.015
        },
        {
                "district": "Dharashiv",
                "mandi": "Dharashiv Black Urad Dal APMC",
                "modalQt": 8011,
                "minQt": 7220,
                "maxQt": 8802,
                "arrivalsQt": 2200,
                "factor": 0.989
        },
        {
                "district": "Chhatrapati Sambhajinagar",
                "mandi": "Chhatrapati Sambhajinagar Black Urad Dal APMC",
                "modalQt": 8149,
                "minQt": 7344,
                "maxQt": 8953,
                "arrivalsQt": 3400,
                "factor": 1.006
        },
        {
                "district": "Hingoli",
                "mandi": "Hingoli Black Urad Dal APMC",
                "modalQt": 8019,
                "minQt": 7227,
                "maxQt": 8811,
                "arrivalsQt": 1900,
                "factor": 0.99
        },
        {
                "district": "Wardha",
                "mandi": "Wardha Black Urad Dal APMC",
                "modalQt": 8068,
                "minQt": 7271,
                "maxQt": 8864,
                "arrivalsQt": 2400,
                "factor": 0.996
        },
        {
                "district": "Ratnagiri",
                "mandi": "Ratnagiri Black Urad Dal APMC",
                "modalQt": 8465,
                "minQt": 7628,
                "maxQt": 9301,
                "arrivalsQt": 1800,
                "factor": 1.045
        },
        {
                "district": "Sindhudurg",
                "mandi": "Sindhudurg Black Urad Dal APMC",
                "modalQt": 8489,
                "minQt": 7650,
                "maxQt": 9327,
                "arrivalsQt": 1600,
                "factor": 1.048
        },
        {
                "district": "Raigad",
                "mandi": "Raigad Black Urad Dal APMC",
                "modalQt": 8384,
                "minQt": 7555,
                "maxQt": 9212,
                "arrivalsQt": 2700,
                "factor": 1.035
        },
        {
                "district": "Yavatmal",
                "mandi": "Yavatmal Black Urad Dal APMC",
                "modalQt": 7995,
                "minQt": 7205,
                "maxQt": 8784,
                "arrivalsQt": 3300,
                "factor": 0.987
        },
        {
                "district": "Buldhana",
                "mandi": "Buldhana Black Urad Dal APMC",
                "modalQt": 8043,
                "minQt": 7249,
                "maxQt": 8838,
                "arrivalsQt": 3100,
                "factor": 0.993
        },
        {
                "district": "Bhandara",
                "mandi": "Bhandara Black Urad Dal APMC",
                "modalQt": 7970,
                "minQt": 7183,
                "maxQt": 8758,
                "arrivalsQt": 2600,
                "factor": 0.984
        },
        {
                "district": "Jalna",
                "mandi": "Jalna Black Urad Dal APMC",
                "modalQt": 8068,
                "minQt": 7271,
                "maxQt": 8864,
                "arrivalsQt": 3200,
                "factor": 0.996
        }
],
      history: {
        "7D": {
                "labels": [
                        "08 Sep",
                        "09 Sep",
                        "10 Sep",
                        "11 Sep",
                        "12 Sep",
                        "13 Sep",
                        "14 Sep (Today)",
                        "16 Sep (AI)",
                        "18 Sep (AI)",
                        "20 Sep (AI)"
                ],
                "historical": [
                        7533,
                        7695,
                        7776,
                        7938,
                        8019,
                        8060,
                        8100,
                        null,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        8100,
                        8262,
                        8505,
                        8667
                ],
                "mandiMin": [
                        6935,
                        7008,
                        7081,
                        7154,
                        7227,
                        7300,
                        7300,
                        null,
                        null,
                        null
                ],
                "mandiMax": [
                        8277,
                        8455,
                        8633,
                        8722,
                        8811,
                        8900,
                        8900,
                        null,
                        null,
                        null
                ]
        },
        "1M": {
                "labels": [
                        "15 Aug",
                        "22 Aug",
                        "29 Aug",
                        "05 Sep",
                        "12 Sep",
                        "14 Sep (Today)",
                        "21 Sep (AI)",
                        "28 Sep (AI)"
                ],
                "historical": [
                        6885,
                        7128,
                        7371,
                        7695,
                        7938,
                        8100,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        8100,
                        8424,
                        8748
                ],
                "mandiMin": [
                        6205,
                        6424,
                        6716,
                        7008,
                        7300,
                        7300,
                        null,
                        null
                ],
                "mandiMax": [
                        7565,
                        7832,
                        8188,
                        8544,
                        8900,
                        8900,
                        null,
                        null
                ]
        },
        "3M": {
                "labels": [
                        "Jun 26",
                        "Jul 26",
                        "Aug 26",
                        "Sep 26 (Now)",
                        "Oct 26 (AI)",
                        "Nov 26 (AI)"
                ],
                "historical": [
                        6480,
                        6966,
                        7452,
                        8100,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        8100,
                        8586,
                        9072
                ],
                "mandiMin": [
                        5840,
                        6278,
                        6716,
                        7300,
                        null,
                        null
                ],
                "mandiMax": [
                        7120,
                        7654,
                        8188,
                        8900,
                        null,
                        null
                ]
        },
        "1Y": {
                "labels": [
                        "Oct 25",
                        "Dec 25",
                        "Feb 26",
                        "Apr 26",
                        "Jun 26",
                        "Aug 26",
                        "Sep 26 (Now)"
                ],
                "historical": [
                        8505,
                        9720,
                        6885,
                        6075,
                        6480,
                        7290,
                        8100
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        8100
                ],
                "mandiMin": [
                        7665,
                        8760,
                        6205,
                        5475,
                        5840,
                        6570,
                        7300
                ],
                "mandiMax": [
                        9345,
                        10680,
                        7565,
                        6675,
                        7120,
                        8010,
                        8900
                ]
        }
}
    },
    groundnut: {
      key: "groundnut",
      name: "Kolhapur Bold Groundnut",
      emoji: "🥜",
      hub: "Kolhapur & Sangli APMC",
      currentModalQt: 6800,
      currentMinQt: 6100,
      currentMaxQt: 7400,
      farmGateQt: 6650,
      terminalVashiQt: 7700,
      arbitragePct: 13.6,
      trendPct: "+3.1%",
      trendDir: "up",
      arrivalsQt: 4200,
      arrivalsChange: "+8.9% Oil Mills",
      sentiment: "High Oil Content Demand",
      sentimentScore: 83,
      recommendation: "48%+ oil content bold groundnuts harvested in South Maharashtra river belts.",
      districtHubs: [
        {
                "district": "Kolhapur",
                "mandi": "Vadgaon APMC",
                "modalQt": 6800,
                "minQt": 6100,
                "maxQt": 7400,
                "arrivalsQt": 4200,
                "factor": 1
        },
        {
                "district": "Sangli",
                "mandi": "Tasgaon APMC",
                "modalQt": 6780,
                "minQt": 6080,
                "maxQt": 7380,
                "arrivalsQt": 3400,
                "factor": 0.997
        },
        {
                "district": "Satara",
                "mandi": "Phaltan APMC",
                "modalQt": 6820,
                "minQt": 6120,
                "maxQt": 7420,
                "arrivalsQt": 2800,
                "factor": 1.003
        },
        {
                "district": "Nashik",
                "mandi": "Nashik Kolhapur Bold Groundnut APMC",
                "modalQt": 6800,
                "minQt": 6100,
                "maxQt": 7400,
                "arrivalsQt": 6850,
                "factor": 1
        },
        {
                "district": "Pune",
                "mandi": "Pune Kolhapur Bold Groundnut APMC",
                "modalQt": 6970,
                "minQt": 6252,
                "maxQt": 7585,
                "arrivalsQt": 5400,
                "factor": 1.025
        },
        {
                "district": "Jalgaon",
                "mandi": "Jalgaon Kolhapur Bold Groundnut APMC",
                "modalQt": 6678,
                "minQt": 5990,
                "maxQt": 7267,
                "arrivalsQt": 4200,
                "factor": 0.982
        },
        {
                "district": "Latur",
                "mandi": "Latur Kolhapur Bold Groundnut APMC",
                "modalQt": 6766,
                "minQt": 6070,
                "maxQt": 7363,
                "arrivalsQt": 6400,
                "factor": 0.995
        },
        {
                "district": "Nagpur",
                "mandi": "Nagpur Kolhapur Bold Groundnut APMC",
                "modalQt": 6922,
                "minQt": 6210,
                "maxQt": 7533,
                "arrivalsQt": 4900,
                "factor": 1.018
        },
        {
                "district": "Solapur",
                "mandi": "Solapur Kolhapur Bold Groundnut APMC",
                "modalQt": 6841,
                "minQt": 6137,
                "maxQt": 7444,
                "arrivalsQt": 4500,
                "factor": 1.006
        },
        {
                "district": "Ahmednagar",
                "mandi": "Ahmednagar Kolhapur Bold Groundnut APMC",
                "modalQt": 6712,
                "minQt": 6021,
                "maxQt": 7304,
                "arrivalsQt": 5100,
                "factor": 0.987
        },
        {
                "district": "Amravati",
                "mandi": "Amravati Kolhapur Bold Groundnut APMC",
                "modalQt": 6759,
                "minQt": 6063,
                "maxQt": 7356,
                "arrivalsQt": 3800,
                "factor": 0.994
        },
        {
                "district": "Akola",
                "mandi": "Akola Kolhapur Bold Groundnut APMC",
                "modalQt": 6739,
                "minQt": 6045,
                "maxQt": 7333,
                "arrivalsQt": 4100,
                "factor": 0.991
        },
        {
                "district": "Nanded",
                "mandi": "Nanded Kolhapur Bold Groundnut APMC",
                "modalQt": 6780,
                "minQt": 6082,
                "maxQt": 7378,
                "arrivalsQt": 3200,
                "factor": 0.997
        },
        {
                "district": "Dhule",
                "mandi": "Dhule Kolhapur Bold Groundnut APMC",
                "modalQt": 6671,
                "minQt": 5984,
                "maxQt": 7259,
                "arrivalsQt": 3500,
                "factor": 0.981
        },
        {
                "district": "Nandurbar",
                "mandi": "Nandurbar Kolhapur Bold Groundnut APMC",
                "modalQt": 6650,
                "minQt": 5966,
                "maxQt": 7237,
                "arrivalsQt": 2900,
                "factor": 0.978
        },
        {
                "district": "Beed",
                "mandi": "Beed Kolhapur Bold Groundnut APMC",
                "modalQt": 6705,
                "minQt": 6015,
                "maxQt": 7296,
                "arrivalsQt": 2400,
                "factor": 0.986
        },
        {
                "district": "Washim",
                "mandi": "Washim Kolhapur Bold Groundnut APMC",
                "modalQt": 6752,
                "minQt": 6057,
                "maxQt": 7348,
                "arrivalsQt": 2300,
                "factor": 0.993
        },
        {
                "district": "Palghar",
                "mandi": "Palghar Kolhapur Bold Groundnut APMC",
                "modalQt": 6902,
                "minQt": 6191,
                "maxQt": 7511,
                "arrivalsQt": 2100,
                "factor": 1.015
        },
        {
                "district": "Dharashiv",
                "mandi": "Dharashiv Kolhapur Bold Groundnut APMC",
                "modalQt": 6725,
                "minQt": 6033,
                "maxQt": 7319,
                "arrivalsQt": 2200,
                "factor": 0.989
        },
        {
                "district": "Chhatrapati Sambhajinagar",
                "mandi": "Chhatrapati Sambhajinagar Kolhapur Bold Groundnut APMC",
                "modalQt": 6841,
                "minQt": 6137,
                "maxQt": 7444,
                "arrivalsQt": 3400,
                "factor": 1.006
        },
        {
                "district": "Hingoli",
                "mandi": "Hingoli Kolhapur Bold Groundnut APMC",
                "modalQt": 6732,
                "minQt": 6039,
                "maxQt": 7326,
                "arrivalsQt": 1900,
                "factor": 0.99
        },
        {
                "district": "Wardha",
                "mandi": "Wardha Kolhapur Bold Groundnut APMC",
                "modalQt": 6773,
                "minQt": 6076,
                "maxQt": 7370,
                "arrivalsQt": 2400,
                "factor": 0.996
        },
        {
                "district": "Ratnagiri",
                "mandi": "Ratnagiri Kolhapur Bold Groundnut APMC",
                "modalQt": 7106,
                "minQt": 6375,
                "maxQt": 7733,
                "arrivalsQt": 1800,
                "factor": 1.045
        },
        {
                "district": "Sindhudurg",
                "mandi": "Sindhudurg Kolhapur Bold Groundnut APMC",
                "modalQt": 7126,
                "minQt": 6393,
                "maxQt": 7755,
                "arrivalsQt": 1600,
                "factor": 1.048
        },
        {
                "district": "Raigad",
                "mandi": "Raigad Kolhapur Bold Groundnut APMC",
                "modalQt": 7038,
                "minQt": 6313,
                "maxQt": 7659,
                "arrivalsQt": 2700,
                "factor": 1.035
        },
        {
                "district": "Yavatmal",
                "mandi": "Yavatmal Kolhapur Bold Groundnut APMC",
                "modalQt": 6712,
                "minQt": 6021,
                "maxQt": 7304,
                "arrivalsQt": 3300,
                "factor": 0.987
        },
        {
                "district": "Buldhana",
                "mandi": "Buldhana Kolhapur Bold Groundnut APMC",
                "modalQt": 6752,
                "minQt": 6057,
                "maxQt": 7348,
                "arrivalsQt": 3100,
                "factor": 0.993
        },
        {
                "district": "Bhandara",
                "mandi": "Bhandara Kolhapur Bold Groundnut APMC",
                "modalQt": 6691,
                "minQt": 6002,
                "maxQt": 7282,
                "arrivalsQt": 2600,
                "factor": 0.984
        },
        {
                "district": "Jalna",
                "mandi": "Jalna Kolhapur Bold Groundnut APMC",
                "modalQt": 6773,
                "minQt": 6076,
                "maxQt": 7370,
                "arrivalsQt": 3200,
                "factor": 0.996
        },
        {
                "district": "Parbhani",
                "mandi": "Parbhani Kolhapur Bold Groundnut APMC",
                "modalQt": 6739,
                "minQt": 6045,
                "maxQt": 7333,
                "arrivalsQt": 2500,
                "factor": 0.991
        }
],
      history: {
        "7D": {
                "labels": [
                        "08 Sep",
                        "09 Sep",
                        "10 Sep",
                        "11 Sep",
                        "12 Sep",
                        "13 Sep",
                        "14 Sep (Today)",
                        "16 Sep (AI)",
                        "18 Sep (AI)",
                        "20 Sep (AI)"
                ],
                "historical": [
                        6324,
                        6460,
                        6528,
                        6664,
                        6732,
                        6766,
                        6800,
                        null,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        6800,
                        6936,
                        7140,
                        7276
                ],
                "mandiMin": [
                        5795,
                        5856,
                        5917,
                        5978,
                        6039,
                        6100,
                        6100,
                        null,
                        null,
                        null
                ],
                "mandiMax": [
                        6882,
                        7030,
                        7178,
                        7252,
                        7326,
                        7400,
                        7400,
                        null,
                        null,
                        null
                ]
        },
        "1M": {
                "labels": [
                        "15 Aug",
                        "22 Aug",
                        "29 Aug",
                        "05 Sep",
                        "12 Sep",
                        "14 Sep (Today)",
                        "21 Sep (AI)",
                        "28 Sep (AI)"
                ],
                "historical": [
                        5780,
                        5984,
                        6188,
                        6460,
                        6664,
                        6800,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        6800,
                        7072,
                        7344
                ],
                "mandiMin": [
                        5185,
                        5368,
                        5612,
                        5856,
                        6100,
                        6100,
                        null,
                        null
                ],
                "mandiMax": [
                        6290,
                        6512,
                        6808,
                        7104,
                        7400,
                        7400,
                        null,
                        null
                ]
        },
        "3M": {
                "labels": [
                        "Jun 26",
                        "Jul 26",
                        "Aug 26",
                        "Sep 26 (Now)",
                        "Oct 26 (AI)",
                        "Nov 26 (AI)"
                ],
                "historical": [
                        5440,
                        5848,
                        6256,
                        6800,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        6800,
                        7208,
                        7616
                ],
                "mandiMin": [
                        4880,
                        5246,
                        5612,
                        6100,
                        null,
                        null
                ],
                "mandiMax": [
                        5920,
                        6364,
                        6808,
                        7400,
                        null,
                        null
                ]
        },
        "1Y": {
                "labels": [
                        "Oct 25",
                        "Dec 25",
                        "Feb 26",
                        "Apr 26",
                        "Jun 26",
                        "Aug 26",
                        "Sep 26 (Now)"
                ],
                "historical": [
                        7140,
                        8160,
                        5780,
                        5100,
                        5440,
                        6120,
                        6800
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        6800
                ],
                "mandiMin": [
                        6405,
                        7320,
                        5185,
                        4575,
                        4880,
                        5490,
                        6100
                ],
                "mandiMax": [
                        7770,
                        8880,
                        6290,
                        5550,
                        5920,
                        6660,
                        7400
                ]
        }
}
    },
    sunflower: {
      key: "sunflower",
      name: "Beed Sunflower Seeds",
      emoji: "🌻",
      hub: "Beed & Dharashiv APMC",
      currentModalQt: 5100,
      currentMinQt: 4600,
      currentMaxQt: 5550,
      farmGateQt: 5000,
      terminalVashiQt: 5800,
      arbitragePct: 13.8,
      trendPct: "+1.7%",
      trendDir: "up",
      arrivalsQt: 2100,
      arrivalsChange: "+4.5% Oil Extraction",
      sentiment: "Refined Oil Processor Demand",
      sentimentScore: 76,
      recommendation: "High oil yield sunflower seed lots available in Marathwada APMC yards.",
      districtHubs: [
        {
                "district": "Beed",
                "mandi": "Kaij APMC Yard",
                "modalQt": 5100,
                "minQt": 4600,
                "maxQt": 5550,
                "arrivalsQt": 2100,
                "factor": 1
        },
        {
                "district": "Dharashiv",
                "mandi": "Kalamb APMC",
                "modalQt": 5080,
                "minQt": 4580,
                "maxQt": 5530,
                "arrivalsQt": 1700,
                "factor": 0.996
        },
        {
                "district": "Latur",
                "mandi": "Nilanga APMC",
                "modalQt": 5120,
                "minQt": 4620,
                "maxQt": 5570,
                "arrivalsQt": 1500,
                "factor": 1.003
        },
        {
                "district": "Nashik",
                "mandi": "Nashik Beed Sunflower Seeds APMC",
                "modalQt": 5100,
                "minQt": 4600,
                "maxQt": 5550,
                "arrivalsQt": 6850,
                "factor": 1
        },
        {
                "district": "Pune",
                "mandi": "Pune Beed Sunflower Seeds APMC",
                "modalQt": 5228,
                "minQt": 4715,
                "maxQt": 5689,
                "arrivalsQt": 5400,
                "factor": 1.025
        },
        {
                "district": "Jalgaon",
                "mandi": "Jalgaon Beed Sunflower Seeds APMC",
                "modalQt": 5008,
                "minQt": 4517,
                "maxQt": 5450,
                "arrivalsQt": 4200,
                "factor": 0.982
        },
        {
                "district": "Nagpur",
                "mandi": "Nagpur Beed Sunflower Seeds APMC",
                "modalQt": 5192,
                "minQt": 4683,
                "maxQt": 5650,
                "arrivalsQt": 4900,
                "factor": 1.018
        },
        {
                "district": "Sangli",
                "mandi": "Sangli Beed Sunflower Seeds APMC",
                "modalQt": 5059,
                "minQt": 4563,
                "maxQt": 5506,
                "arrivalsQt": 3600,
                "factor": 0.992
        },
        {
                "district": "Solapur",
                "mandi": "Solapur Beed Sunflower Seeds APMC",
                "modalQt": 5131,
                "minQt": 4628,
                "maxQt": 5583,
                "arrivalsQt": 4500,
                "factor": 1.006
        },
        {
                "district": "Ahmednagar",
                "mandi": "Ahmednagar Beed Sunflower Seeds APMC",
                "modalQt": 5034,
                "minQt": 4540,
                "maxQt": 5478,
                "arrivalsQt": 5100,
                "factor": 0.987
        },
        {
                "district": "Amravati",
                "mandi": "Amravati Beed Sunflower Seeds APMC",
                "modalQt": 5069,
                "minQt": 4572,
                "maxQt": 5517,
                "arrivalsQt": 3800,
                "factor": 0.994
        },
        {
                "district": "Akola",
                "mandi": "Akola Beed Sunflower Seeds APMC",
                "modalQt": 5054,
                "minQt": 4559,
                "maxQt": 5500,
                "arrivalsQt": 4100,
                "factor": 0.991
        },
        {
                "district": "Nanded",
                "mandi": "Nanded Beed Sunflower Seeds APMC",
                "modalQt": 5085,
                "minQt": 4586,
                "maxQt": 5533,
                "arrivalsQt": 3200,
                "factor": 0.997
        },
        {
                "district": "Satara",
                "mandi": "Satara Beed Sunflower Seeds APMC",
                "modalQt": 5161,
                "minQt": 4655,
                "maxQt": 5617,
                "arrivalsQt": 2800,
                "factor": 1.012
        },
        {
                "district": "Kolhapur",
                "mandi": "Kolhapur Beed Sunflower Seeds APMC",
                "modalQt": 5212,
                "minQt": 4701,
                "maxQt": 5672,
                "arrivalsQt": 3300,
                "factor": 1.022
        },
        {
                "district": "Dhule",
                "mandi": "Dhule Beed Sunflower Seeds APMC",
                "modalQt": 5003,
                "minQt": 4513,
                "maxQt": 5445,
                "arrivalsQt": 3500,
                "factor": 0.981
        },
        {
                "district": "Nandurbar",
                "mandi": "Nandurbar Beed Sunflower Seeds APMC",
                "modalQt": 4988,
                "minQt": 4499,
                "maxQt": 5428,
                "arrivalsQt": 2900,
                "factor": 0.978
        },
        {
                "district": "Washim",
                "mandi": "Washim Beed Sunflower Seeds APMC",
                "modalQt": 5064,
                "minQt": 4568,
                "maxQt": 5511,
                "arrivalsQt": 2300,
                "factor": 0.993
        },
        {
                "district": "Palghar",
                "mandi": "Palghar Beed Sunflower Seeds APMC",
                "modalQt": 5176,
                "minQt": 4669,
                "maxQt": 5633,
                "arrivalsQt": 2100,
                "factor": 1.015
        },
        {
                "district": "Chhatrapati Sambhajinagar",
                "mandi": "Chhatrapati Sambhajinagar Beed Sunflower Seeds APMC",
                "modalQt": 5131,
                "minQt": 4628,
                "maxQt": 5583,
                "arrivalsQt": 3400,
                "factor": 1.006
        },
        {
                "district": "Hingoli",
                "mandi": "Hingoli Beed Sunflower Seeds APMC",
                "modalQt": 5049,
                "minQt": 4554,
                "maxQt": 5495,
                "arrivalsQt": 1900,
                "factor": 0.99
        },
        {
                "district": "Wardha",
                "mandi": "Wardha Beed Sunflower Seeds APMC",
                "modalQt": 5080,
                "minQt": 4582,
                "maxQt": 5528,
                "arrivalsQt": 2400,
                "factor": 0.996
        },
        {
                "district": "Ratnagiri",
                "mandi": "Ratnagiri Beed Sunflower Seeds APMC",
                "modalQt": 5330,
                "minQt": 4807,
                "maxQt": 5800,
                "arrivalsQt": 1800,
                "factor": 1.045
        },
        {
                "district": "Sindhudurg",
                "mandi": "Sindhudurg Beed Sunflower Seeds APMC",
                "modalQt": 5345,
                "minQt": 4821,
                "maxQt": 5816,
                "arrivalsQt": 1600,
                "factor": 1.048
        },
        {
                "district": "Raigad",
                "mandi": "Raigad Beed Sunflower Seeds APMC",
                "modalQt": 5279,
                "minQt": 4761,
                "maxQt": 5744,
                "arrivalsQt": 2700,
                "factor": 1.035
        },
        {
                "district": "Yavatmal",
                "mandi": "Yavatmal Beed Sunflower Seeds APMC",
                "modalQt": 5034,
                "minQt": 4540,
                "maxQt": 5478,
                "arrivalsQt": 3300,
                "factor": 0.987
        },
        {
                "district": "Buldhana",
                "mandi": "Buldhana Beed Sunflower Seeds APMC",
                "modalQt": 5064,
                "minQt": 4568,
                "maxQt": 5511,
                "arrivalsQt": 3100,
                "factor": 0.993
        },
        {
                "district": "Bhandara",
                "mandi": "Bhandara Beed Sunflower Seeds APMC",
                "modalQt": 5018,
                "minQt": 4526,
                "maxQt": 5461,
                "arrivalsQt": 2600,
                "factor": 0.984
        },
        {
                "district": "Jalna",
                "mandi": "Jalna Beed Sunflower Seeds APMC",
                "modalQt": 5080,
                "minQt": 4582,
                "maxQt": 5528,
                "arrivalsQt": 3200,
                "factor": 0.996
        },
        {
                "district": "Parbhani",
                "mandi": "Parbhani Beed Sunflower Seeds APMC",
                "modalQt": 5054,
                "minQt": 4559,
                "maxQt": 5500,
                "arrivalsQt": 2500,
                "factor": 0.991
        }
],
      history: {
        "7D": {
                "labels": [
                        "08 Sep",
                        "09 Sep",
                        "10 Sep",
                        "11 Sep",
                        "12 Sep",
                        "13 Sep",
                        "14 Sep (Today)",
                        "16 Sep (AI)",
                        "18 Sep (AI)",
                        "20 Sep (AI)"
                ],
                "historical": [
                        4743,
                        4845,
                        4896,
                        4998,
                        5049,
                        5075,
                        5100,
                        null,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        5100,
                        5202,
                        5355,
                        5457
                ],
                "mandiMin": [
                        4370,
                        4416,
                        4462,
                        4508,
                        4554,
                        4600,
                        4600,
                        null,
                        null,
                        null
                ],
                "mandiMax": [
                        5162,
                        5273,
                        5384,
                        5439,
                        5495,
                        5550,
                        5550,
                        null,
                        null,
                        null
                ]
        },
        "1M": {
                "labels": [
                        "15 Aug",
                        "22 Aug",
                        "29 Aug",
                        "05 Sep",
                        "12 Sep",
                        "14 Sep (Today)",
                        "21 Sep (AI)",
                        "28 Sep (AI)"
                ],
                "historical": [
                        4335,
                        4488,
                        4641,
                        4845,
                        4998,
                        5100,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        5100,
                        5304,
                        5508
                ],
                "mandiMin": [
                        3910,
                        4048,
                        4232,
                        4416,
                        4600,
                        4600,
                        null,
                        null
                ],
                "mandiMax": [
                        4718,
                        4884,
                        5106,
                        5328,
                        5550,
                        5550,
                        null,
                        null
                ]
        },
        "3M": {
                "labels": [
                        "Jun 26",
                        "Jul 26",
                        "Aug 26",
                        "Sep 26 (Now)",
                        "Oct 26 (AI)",
                        "Nov 26 (AI)"
                ],
                "historical": [
                        4080,
                        4386,
                        4692,
                        5100,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        5100,
                        5406,
                        5712
                ],
                "mandiMin": [
                        3680,
                        3956,
                        4232,
                        4600,
                        null,
                        null
                ],
                "mandiMax": [
                        4440,
                        4773,
                        5106,
                        5550,
                        null,
                        null
                ]
        },
        "1Y": {
                "labels": [
                        "Oct 25",
                        "Dec 25",
                        "Feb 26",
                        "Apr 26",
                        "Jun 26",
                        "Aug 26",
                        "Sep 26 (Now)"
                ],
                "historical": [
                        5355,
                        6120,
                        4335,
                        3825,
                        4080,
                        4590,
                        5100
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        5100
                ],
                "mandiMin": [
                        4830,
                        5520,
                        3910,
                        3450,
                        3680,
                        4140,
                        4600
                ],
                "mandiMax": [
                        5828,
                        6660,
                        4718,
                        4163,
                        4440,
                        4995,
                        5550
                ]
        }
}
    },
    sugarcane: {
      key: "sugarcane",
      name: "Kolhapur Co 86032 Sugarcane",
      emoji: "🎋",
      hub: "Kolhapur & Karad APMC",
      currentModalQt: 3400,
      currentMinQt: 3100,
      currentMaxQt: 3700,
      farmGateQt: 3300,
      terminalVashiQt: 3850,
      arbitragePct: 14.3,
      trendPct: "+2.0%",
      trendDir: "up",
      arrivalsQt: 12500,
      arrivalsChange: "+22.0% Crushing Season",
      sentiment: "Sugar Factory & Jaggery High",
      sentimentScore: 85,
      recommendation: "High sucrose recovery sugarcane for jaggery (gur) units and ethanol distilleries.",
      districtHubs: [
        {
                "district": "Kolhapur",
                "mandi": "Shirol APMC",
                "modalQt": 3400,
                "minQt": 3100,
                "maxQt": 3700,
                "arrivalsQt": 12500,
                "factor": 1
        },
        {
                "district": "Sangli",
                "mandi": "Walwa APMC",
                "modalQt": 3380,
                "minQt": 3080,
                "maxQt": 3680,
                "arrivalsQt": 9800,
                "factor": 0.994
        },
        {
                "district": "Satara",
                "mandi": "Karad Sugarcane Hub",
                "modalQt": 3420,
                "minQt": 3120,
                "maxQt": 3720,
                "arrivalsQt": 8400,
                "factor": 1.005
        },
        {
                "district": "Nashik",
                "mandi": "Nashik Kolhapur Co 86032 Sugarcane APMC",
                "modalQt": 3400,
                "minQt": 3100,
                "maxQt": 3700,
                "arrivalsQt": 6850,
                "factor": 1
        },
        {
                "district": "Pune",
                "mandi": "Pune Kolhapur Co 86032 Sugarcane APMC",
                "modalQt": 3485,
                "minQt": 3177,
                "maxQt": 3792,
                "arrivalsQt": 5400,
                "factor": 1.025
        },
        {
                "district": "Jalgaon",
                "mandi": "Jalgaon Kolhapur Co 86032 Sugarcane APMC",
                "modalQt": 3339,
                "minQt": 3044,
                "maxQt": 3633,
                "arrivalsQt": 4200,
                "factor": 0.982
        },
        {
                "district": "Latur",
                "mandi": "Latur Kolhapur Co 86032 Sugarcane APMC",
                "modalQt": 3383,
                "minQt": 3085,
                "maxQt": 3682,
                "arrivalsQt": 6400,
                "factor": 0.995
        },
        {
                "district": "Nagpur",
                "mandi": "Nagpur Kolhapur Co 86032 Sugarcane APMC",
                "modalQt": 3461,
                "minQt": 3156,
                "maxQt": 3767,
                "arrivalsQt": 4900,
                "factor": 1.018
        },
        {
                "district": "Solapur",
                "mandi": "Solapur Kolhapur Co 86032 Sugarcane APMC",
                "modalQt": 3420,
                "minQt": 3119,
                "maxQt": 3722,
                "arrivalsQt": 4500,
                "factor": 1.006
        },
        {
                "district": "Ahmednagar",
                "mandi": "Ahmednagar Kolhapur Co 86032 Sugarcane APMC",
                "modalQt": 3356,
                "minQt": 3060,
                "maxQt": 3652,
                "arrivalsQt": 5100,
                "factor": 0.987
        },
        {
                "district": "Amravati",
                "mandi": "Amravati Kolhapur Co 86032 Sugarcane APMC",
                "modalQt": 3380,
                "minQt": 3081,
                "maxQt": 3678,
                "arrivalsQt": 3800,
                "factor": 0.994
        },
        {
                "district": "Akola",
                "mandi": "Akola Kolhapur Co 86032 Sugarcane APMC",
                "modalQt": 3369,
                "minQt": 3072,
                "maxQt": 3667,
                "arrivalsQt": 4100,
                "factor": 0.991
        },
        {
                "district": "Nanded",
                "mandi": "Nanded Kolhapur Co 86032 Sugarcane APMC",
                "modalQt": 3390,
                "minQt": 3091,
                "maxQt": 3689,
                "arrivalsQt": 3200,
                "factor": 0.997
        },
        {
                "district": "Dhule",
                "mandi": "Dhule Kolhapur Co 86032 Sugarcane APMC",
                "modalQt": 3335,
                "minQt": 3041,
                "maxQt": 3630,
                "arrivalsQt": 3500,
                "factor": 0.981
        },
        {
                "district": "Nandurbar",
                "mandi": "Nandurbar Kolhapur Co 86032 Sugarcane APMC",
                "modalQt": 3325,
                "minQt": 3032,
                "maxQt": 3619,
                "arrivalsQt": 2900,
                "factor": 0.978
        },
        {
                "district": "Beed",
                "mandi": "Beed Kolhapur Co 86032 Sugarcane APMC",
                "modalQt": 3352,
                "minQt": 3057,
                "maxQt": 3648,
                "arrivalsQt": 2400,
                "factor": 0.986
        },
        {
                "district": "Washim",
                "mandi": "Washim Kolhapur Co 86032 Sugarcane APMC",
                "modalQt": 3376,
                "minQt": 3078,
                "maxQt": 3674,
                "arrivalsQt": 2300,
                "factor": 0.993
        },
        {
                "district": "Palghar",
                "mandi": "Palghar Kolhapur Co 86032 Sugarcane APMC",
                "modalQt": 3451,
                "minQt": 3146,
                "maxQt": 3755,
                "arrivalsQt": 2100,
                "factor": 1.015
        },
        {
                "district": "Dharashiv",
                "mandi": "Dharashiv Kolhapur Co 86032 Sugarcane APMC",
                "modalQt": 3363,
                "minQt": 3066,
                "maxQt": 3659,
                "arrivalsQt": 2200,
                "factor": 0.989
        },
        {
                "district": "Chhatrapati Sambhajinagar",
                "mandi": "Chhatrapati Sambhajinagar Kolhapur Co 86032 Sugarcane APMC",
                "modalQt": 3420,
                "minQt": 3119,
                "maxQt": 3722,
                "arrivalsQt": 3400,
                "factor": 1.006
        },
        {
                "district": "Hingoli",
                "mandi": "Hingoli Kolhapur Co 86032 Sugarcane APMC",
                "modalQt": 3366,
                "minQt": 3069,
                "maxQt": 3663,
                "arrivalsQt": 1900,
                "factor": 0.99
        },
        {
                "district": "Wardha",
                "mandi": "Wardha Kolhapur Co 86032 Sugarcane APMC",
                "modalQt": 3386,
                "minQt": 3088,
                "maxQt": 3685,
                "arrivalsQt": 2400,
                "factor": 0.996
        },
        {
                "district": "Ratnagiri",
                "mandi": "Ratnagiri Kolhapur Co 86032 Sugarcane APMC",
                "modalQt": 3553,
                "minQt": 3240,
                "maxQt": 3866,
                "arrivalsQt": 1800,
                "factor": 1.045
        },
        {
                "district": "Sindhudurg",
                "mandi": "Sindhudurg Kolhapur Co 86032 Sugarcane APMC",
                "modalQt": 3563,
                "minQt": 3249,
                "maxQt": 3878,
                "arrivalsQt": 1600,
                "factor": 1.048
        },
        {
                "district": "Raigad",
                "mandi": "Raigad Kolhapur Co 86032 Sugarcane APMC",
                "modalQt": 3519,
                "minQt": 3208,
                "maxQt": 3829,
                "arrivalsQt": 2700,
                "factor": 1.035
        },
        {
                "district": "Yavatmal",
                "mandi": "Yavatmal Kolhapur Co 86032 Sugarcane APMC",
                "modalQt": 3356,
                "minQt": 3060,
                "maxQt": 3652,
                "arrivalsQt": 3300,
                "factor": 0.987
        },
        {
                "district": "Buldhana",
                "mandi": "Buldhana Kolhapur Co 86032 Sugarcane APMC",
                "modalQt": 3376,
                "minQt": 3078,
                "maxQt": 3674,
                "arrivalsQt": 3100,
                "factor": 0.993
        },
        {
                "district": "Bhandara",
                "mandi": "Bhandara Kolhapur Co 86032 Sugarcane APMC",
                "modalQt": 3346,
                "minQt": 3050,
                "maxQt": 3641,
                "arrivalsQt": 2600,
                "factor": 0.984
        },
        {
                "district": "Jalna",
                "mandi": "Jalna Kolhapur Co 86032 Sugarcane APMC",
                "modalQt": 3386,
                "minQt": 3088,
                "maxQt": 3685,
                "arrivalsQt": 3200,
                "factor": 0.996
        },
        {
                "district": "Parbhani",
                "mandi": "Parbhani Kolhapur Co 86032 Sugarcane APMC",
                "modalQt": 3369,
                "minQt": 3072,
                "maxQt": 3667,
                "arrivalsQt": 2500,
                "factor": 0.991
        }
],
      history: {
        "7D": {
                "labels": [
                        "08 Sep",
                        "09 Sep",
                        "10 Sep",
                        "11 Sep",
                        "12 Sep",
                        "13 Sep",
                        "14 Sep (Today)",
                        "16 Sep (AI)",
                        "18 Sep (AI)",
                        "20 Sep (AI)"
                ],
                "historical": [
                        3162,
                        3230,
                        3264,
                        3332,
                        3366,
                        3383,
                        3400,
                        null,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        3400,
                        3468,
                        3570,
                        3638
                ],
                "mandiMin": [
                        2945,
                        2976,
                        3007,
                        3038,
                        3069,
                        3100,
                        3100,
                        null,
                        null,
                        null
                ],
                "mandiMax": [
                        3441,
                        3515,
                        3589,
                        3626,
                        3663,
                        3700,
                        3700,
                        null,
                        null,
                        null
                ]
        },
        "1M": {
                "labels": [
                        "15 Aug",
                        "22 Aug",
                        "29 Aug",
                        "05 Sep",
                        "12 Sep",
                        "14 Sep (Today)",
                        "21 Sep (AI)",
                        "28 Sep (AI)"
                ],
                "historical": [
                        2890,
                        2992,
                        3094,
                        3230,
                        3332,
                        3400,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        3400,
                        3536,
                        3672
                ],
                "mandiMin": [
                        2635,
                        2728,
                        2852,
                        2976,
                        3100,
                        3100,
                        null,
                        null
                ],
                "mandiMax": [
                        3145,
                        3256,
                        3404,
                        3552,
                        3700,
                        3700,
                        null,
                        null
                ]
        },
        "3M": {
                "labels": [
                        "Jun 26",
                        "Jul 26",
                        "Aug 26",
                        "Sep 26 (Now)",
                        "Oct 26 (AI)",
                        "Nov 26 (AI)"
                ],
                "historical": [
                        2720,
                        2924,
                        3128,
                        3400,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        3400,
                        3604,
                        3808
                ],
                "mandiMin": [
                        2480,
                        2666,
                        2852,
                        3100,
                        null,
                        null
                ],
                "mandiMax": [
                        2960,
                        3182,
                        3404,
                        3700,
                        null,
                        null
                ]
        },
        "1Y": {
                "labels": [
                        "Oct 25",
                        "Dec 25",
                        "Feb 26",
                        "Apr 26",
                        "Jun 26",
                        "Aug 26",
                        "Sep 26 (Now)"
                ],
                "historical": [
                        3570,
                        4080,
                        2890,
                        2550,
                        2720,
                        3060,
                        3400
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        3400
                ],
                "mandiMin": [
                        3255,
                        3720,
                        2635,
                        2325,
                        2480,
                        2790,
                        3100
                ],
                "mandiMax": [
                        3885,
                        4440,
                        3145,
                        2775,
                        2960,
                        3330,
                        3700
                ]
        }
}
    },
    grapes: {
      key: "grapes",
      name: "Nashik Thompson Seedless Grapes",
      emoji: "🍇",
      hub: "Pimpalgaon & Nashik APMC",
      currentModalQt: 8500,
      currentMinQt: 7200,
      currentMaxQt: 10200,
      farmGateQt: 8200,
      terminalVashiQt: 10800,
      arbitragePct: 24.1,
      trendPct: "+6.8%",
      trendDir: "up",
      arrivalsQt: 4600,
      arrivalsChange: "+16.5% Export Peak",
      sentiment: "EU & Gulf Export Surge",
      sentimentScore: 92,
      recommendation: "18mm+ berry size MRL compliant grapes with cold chain reefer access.",
      districtHubs: [
        {
                "district": "Nashik",
                "mandi": "Pimpalgaon Baswant APMC",
                "modalQt": 8500,
                "minQt": 7200,
                "maxQt": 10200,
                "arrivalsQt": 4600,
                "factor": 1
        },
        {
                "district": "Sangli",
                "mandi": "Tasgaon Grape Yard",
                "modalQt": 8450,
                "minQt": 7150,
                "maxQt": 10150,
                "arrivalsQt": 3900,
                "factor": 0.994
        },
        {
                "district": "Solapur",
                "mandi": "Pandharpur APMC",
                "modalQt": 8550,
                "minQt": 7250,
                "maxQt": 10250,
                "arrivalsQt": 2700,
                "factor": 1.005
        },
        {
                "district": "Pune",
                "mandi": "Pune Nashik Thompson Seedless Grapes APMC",
                "modalQt": 8713,
                "minQt": 7380,
                "maxQt": 10455,
                "arrivalsQt": 5400,
                "factor": 1.025
        },
        {
                "district": "Jalgaon",
                "mandi": "Jalgaon Nashik Thompson Seedless Grapes APMC",
                "modalQt": 8347,
                "minQt": 7070,
                "maxQt": 10016,
                "arrivalsQt": 4200,
                "factor": 0.982
        },
        {
                "district": "Latur",
                "mandi": "Latur Nashik Thompson Seedless Grapes APMC",
                "modalQt": 8458,
                "minQt": 7164,
                "maxQt": 10149,
                "arrivalsQt": 6400,
                "factor": 0.995
        },
        {
                "district": "Nagpur",
                "mandi": "Nagpur Nashik Thompson Seedless Grapes APMC",
                "modalQt": 8653,
                "minQt": 7330,
                "maxQt": 10384,
                "arrivalsQt": 4900,
                "factor": 1.018
        },
        {
                "district": "Ahmednagar",
                "mandi": "Ahmednagar Nashik Thompson Seedless Grapes APMC",
                "modalQt": 8390,
                "minQt": 7106,
                "maxQt": 10067,
                "arrivalsQt": 5100,
                "factor": 0.987
        },
        {
                "district": "Amravati",
                "mandi": "Amravati Nashik Thompson Seedless Grapes APMC",
                "modalQt": 8449,
                "minQt": 7157,
                "maxQt": 10139,
                "arrivalsQt": 3800,
                "factor": 0.994
        },
        {
                "district": "Akola",
                "mandi": "Akola Nashik Thompson Seedless Grapes APMC",
                "modalQt": 8424,
                "minQt": 7135,
                "maxQt": 10108,
                "arrivalsQt": 4100,
                "factor": 0.991
        },
        {
                "district": "Nanded",
                "mandi": "Nanded Nashik Thompson Seedless Grapes APMC",
                "modalQt": 8475,
                "minQt": 7178,
                "maxQt": 10169,
                "arrivalsQt": 3200,
                "factor": 0.997
        },
        {
                "district": "Satara",
                "mandi": "Satara Nashik Thompson Seedless Grapes APMC",
                "modalQt": 8602,
                "minQt": 7286,
                "maxQt": 10322,
                "arrivalsQt": 2800,
                "factor": 1.012
        },
        {
                "district": "Kolhapur",
                "mandi": "Kolhapur Nashik Thompson Seedless Grapes APMC",
                "modalQt": 8687,
                "minQt": 7358,
                "maxQt": 10424,
                "arrivalsQt": 3300,
                "factor": 1.022
        },
        {
                "district": "Dhule",
                "mandi": "Dhule Nashik Thompson Seedless Grapes APMC",
                "modalQt": 8339,
                "minQt": 7063,
                "maxQt": 10006,
                "arrivalsQt": 3500,
                "factor": 0.981
        },
        {
                "district": "Nandurbar",
                "mandi": "Nandurbar Nashik Thompson Seedless Grapes APMC",
                "modalQt": 8313,
                "minQt": 7042,
                "maxQt": 9976,
                "arrivalsQt": 2900,
                "factor": 0.978
        },
        {
                "district": "Beed",
                "mandi": "Beed Nashik Thompson Seedless Grapes APMC",
                "modalQt": 8381,
                "minQt": 7099,
                "maxQt": 10057,
                "arrivalsQt": 2400,
                "factor": 0.986
        },
        {
                "district": "Washim",
                "mandi": "Washim Nashik Thompson Seedless Grapes APMC",
                "modalQt": 8441,
                "minQt": 7150,
                "maxQt": 10129,
                "arrivalsQt": 2300,
                "factor": 0.993
        },
        {
                "district": "Palghar",
                "mandi": "Palghar Nashik Thompson Seedless Grapes APMC",
                "modalQt": 8628,
                "minQt": 7308,
                "maxQt": 10353,
                "arrivalsQt": 2100,
                "factor": 1.015
        },
        {
                "district": "Dharashiv",
                "mandi": "Dharashiv Nashik Thompson Seedless Grapes APMC",
                "modalQt": 8407,
                "minQt": 7121,
                "maxQt": 10088,
                "arrivalsQt": 2200,
                "factor": 0.989
        },
        {
                "district": "Chhatrapati Sambhajinagar",
                "mandi": "Chhatrapati Sambhajinagar Nashik Thompson Seedless Grapes APMC",
                "modalQt": 8551,
                "minQt": 7243,
                "maxQt": 10261,
                "arrivalsQt": 3400,
                "factor": 1.006
        },
        {
                "district": "Hingoli",
                "mandi": "Hingoli Nashik Thompson Seedless Grapes APMC",
                "modalQt": 8415,
                "minQt": 7128,
                "maxQt": 10098,
                "arrivalsQt": 1900,
                "factor": 0.99
        },
        {
                "district": "Wardha",
                "mandi": "Wardha Nashik Thompson Seedless Grapes APMC",
                "modalQt": 8466,
                "minQt": 7171,
                "maxQt": 10159,
                "arrivalsQt": 2400,
                "factor": 0.996
        },
        {
                "district": "Ratnagiri",
                "mandi": "Ratnagiri Nashik Thompson Seedless Grapes APMC",
                "modalQt": 8883,
                "minQt": 7524,
                "maxQt": 10659,
                "arrivalsQt": 1800,
                "factor": 1.045
        },
        {
                "district": "Sindhudurg",
                "mandi": "Sindhudurg Nashik Thompson Seedless Grapes APMC",
                "modalQt": 8908,
                "minQt": 7546,
                "maxQt": 10690,
                "arrivalsQt": 1600,
                "factor": 1.048
        },
        {
                "district": "Raigad",
                "mandi": "Raigad Nashik Thompson Seedless Grapes APMC",
                "modalQt": 8798,
                "minQt": 7452,
                "maxQt": 10557,
                "arrivalsQt": 2700,
                "factor": 1.035
        },
        {
                "district": "Yavatmal",
                "mandi": "Yavatmal Nashik Thompson Seedless Grapes APMC",
                "modalQt": 8390,
                "minQt": 7106,
                "maxQt": 10067,
                "arrivalsQt": 3300,
                "factor": 0.987
        },
        {
                "district": "Buldhana",
                "mandi": "Buldhana Nashik Thompson Seedless Grapes APMC",
                "modalQt": 8441,
                "minQt": 7150,
                "maxQt": 10129,
                "arrivalsQt": 3100,
                "factor": 0.993
        },
        {
                "district": "Bhandara",
                "mandi": "Bhandara Nashik Thompson Seedless Grapes APMC",
                "modalQt": 8364,
                "minQt": 7085,
                "maxQt": 10037,
                "arrivalsQt": 2600,
                "factor": 0.984
        },
        {
                "district": "Jalna",
                "mandi": "Jalna Nashik Thompson Seedless Grapes APMC",
                "modalQt": 8466,
                "minQt": 7171,
                "maxQt": 10159,
                "arrivalsQt": 3200,
                "factor": 0.996
        },
        {
                "district": "Parbhani",
                "mandi": "Parbhani Nashik Thompson Seedless Grapes APMC",
                "modalQt": 8424,
                "minQt": 7135,
                "maxQt": 10108,
                "arrivalsQt": 2500,
                "factor": 0.991
        }
],
      history: {
        "7D": {
                "labels": [
                        "08 Sep",
                        "09 Sep",
                        "10 Sep",
                        "11 Sep",
                        "12 Sep",
                        "13 Sep",
                        "14 Sep (Today)",
                        "16 Sep (AI)",
                        "18 Sep (AI)",
                        "20 Sep (AI)"
                ],
                "historical": [
                        7905,
                        8075,
                        8160,
                        8330,
                        8415,
                        8458,
                        8500,
                        null,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        8500,
                        8670,
                        8925,
                        9095
                ],
                "mandiMin": [
                        6840,
                        6912,
                        6984,
                        7056,
                        7128,
                        7200,
                        7200,
                        null,
                        null,
                        null
                ],
                "mandiMax": [
                        9486,
                        9690,
                        9894,
                        9996,
                        10098,
                        10200,
                        10200,
                        null,
                        null,
                        null
                ]
        },
        "1M": {
                "labels": [
                        "15 Aug",
                        "22 Aug",
                        "29 Aug",
                        "05 Sep",
                        "12 Sep",
                        "14 Sep (Today)",
                        "21 Sep (AI)",
                        "28 Sep (AI)"
                ],
                "historical": [
                        7225,
                        7480,
                        7735,
                        8075,
                        8330,
                        8500,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        8500,
                        8840,
                        9180
                ],
                "mandiMin": [
                        6120,
                        6336,
                        6624,
                        6912,
                        7200,
                        7200,
                        null,
                        null
                ],
                "mandiMax": [
                        8670,
                        8976,
                        9384,
                        9792,
                        10200,
                        10200,
                        null,
                        null
                ]
        },
        "3M": {
                "labels": [
                        "Jun 26",
                        "Jul 26",
                        "Aug 26",
                        "Sep 26 (Now)",
                        "Oct 26 (AI)",
                        "Nov 26 (AI)"
                ],
                "historical": [
                        6800,
                        7310,
                        7820,
                        8500,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        8500,
                        9010,
                        9520
                ],
                "mandiMin": [
                        5760,
                        6192,
                        6624,
                        7200,
                        null,
                        null
                ],
                "mandiMax": [
                        8160,
                        8772,
                        9384,
                        10200,
                        null,
                        null
                ]
        },
        "1Y": {
                "labels": [
                        "Oct 25",
                        "Dec 25",
                        "Feb 26",
                        "Apr 26",
                        "Jun 26",
                        "Aug 26",
                        "Sep 26 (Now)"
                ],
                "historical": [
                        8925,
                        10200,
                        7225,
                        6375,
                        6800,
                        7650,
                        8500
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        8500
                ],
                "mandiMin": [
                        7560,
                        8640,
                        6120,
                        5400,
                        5760,
                        6480,
                        7200
                ],
                "mandiMax": [
                        10710,
                        12240,
                        8670,
                        7650,
                        8160,
                        9180,
                        10200
                ]
        }
}
    },
    mosambi: {
      key: "mosambi",
      name: "Jalna Sweet Lime (Mosambi)",
      emoji: "🍋",
      hub: "Jalna & Aurangabad APMC",
      currentModalQt: 3800,
      currentMinQt: 3200,
      currentMaxQt: 4400,
      farmGateQt: 3700,
      terminalVashiQt: 4600,
      arbitragePct: 19.6,
      trendPct: "+4.0%",
      trendDir: "up",
      arrivalsQt: 5200,
      arrivalsChange: "+11.2% Juice Demand",
      sentiment: "Beverage Industry Buying High",
      sentimentScore: 84,
      recommendation: "High juice yield sweet limes from Marathwada citrus orchards.",
      districtHubs: [
        {
                "district": "Jalna",
                "mandi": "Ghansawangi APMC",
                "modalQt": 3800,
                "minQt": 3200,
                "maxQt": 4400,
                "arrivalsQt": 5200,
                "factor": 1
        },
        {
                "district": "Chhatrapati Sambhajinagar",
                "mandi": "Paithan Citrus APMC",
                "modalQt": 3750,
                "minQt": 3150,
                "maxQt": 4350,
                "arrivalsQt": 3600,
                "factor": 0.986
        },
        {
                "district": "Nanded",
                "mandi": "Bhokar APMC",
                "modalQt": 3820,
                "minQt": 3220,
                "maxQt": 4420,
                "arrivalsQt": 2800,
                "factor": 1.005
        },
        {
                "district": "Nashik",
                "mandi": "Nashik Jalna Sweet Lime APMC",
                "modalQt": 3800,
                "minQt": 3200,
                "maxQt": 4400,
                "arrivalsQt": 6850,
                "factor": 1
        },
        {
                "district": "Pune",
                "mandi": "Pune Jalna Sweet Lime APMC",
                "modalQt": 3895,
                "minQt": 3280,
                "maxQt": 4510,
                "arrivalsQt": 5400,
                "factor": 1.025
        },
        {
                "district": "Jalgaon",
                "mandi": "Jalgaon Jalna Sweet Lime APMC",
                "modalQt": 3732,
                "minQt": 3142,
                "maxQt": 4321,
                "arrivalsQt": 4200,
                "factor": 0.982
        },
        {
                "district": "Latur",
                "mandi": "Latur Jalna Sweet Lime APMC",
                "modalQt": 3781,
                "minQt": 3184,
                "maxQt": 4378,
                "arrivalsQt": 6400,
                "factor": 0.995
        },
        {
                "district": "Nagpur",
                "mandi": "Nagpur Jalna Sweet Lime APMC",
                "modalQt": 3868,
                "minQt": 3258,
                "maxQt": 4479,
                "arrivalsQt": 4900,
                "factor": 1.018
        },
        {
                "district": "Sangli",
                "mandi": "Sangli Jalna Sweet Lime APMC",
                "modalQt": 3770,
                "minQt": 3174,
                "maxQt": 4365,
                "arrivalsQt": 3600,
                "factor": 0.992
        },
        {
                "district": "Solapur",
                "mandi": "Solapur Jalna Sweet Lime APMC",
                "modalQt": 3823,
                "minQt": 3219,
                "maxQt": 4426,
                "arrivalsQt": 4500,
                "factor": 1.006
        },
        {
                "district": "Ahmednagar",
                "mandi": "Ahmednagar Jalna Sweet Lime APMC",
                "modalQt": 3751,
                "minQt": 3158,
                "maxQt": 4343,
                "arrivalsQt": 5100,
                "factor": 0.987
        },
        {
                "district": "Amravati",
                "mandi": "Amravati Jalna Sweet Lime APMC",
                "modalQt": 3777,
                "minQt": 3181,
                "maxQt": 4374,
                "arrivalsQt": 3800,
                "factor": 0.994
        },
        {
                "district": "Akola",
                "mandi": "Akola Jalna Sweet Lime APMC",
                "modalQt": 3766,
                "minQt": 3171,
                "maxQt": 4360,
                "arrivalsQt": 4100,
                "factor": 0.991
        },
        {
                "district": "Satara",
                "mandi": "Satara Jalna Sweet Lime APMC",
                "modalQt": 3846,
                "minQt": 3238,
                "maxQt": 4453,
                "arrivalsQt": 2800,
                "factor": 1.012
        },
        {
                "district": "Kolhapur",
                "mandi": "Kolhapur Jalna Sweet Lime APMC",
                "modalQt": 3884,
                "minQt": 3270,
                "maxQt": 4497,
                "arrivalsQt": 3300,
                "factor": 1.022
        },
        {
                "district": "Dhule",
                "mandi": "Dhule Jalna Sweet Lime APMC",
                "modalQt": 3728,
                "minQt": 3139,
                "maxQt": 4316,
                "arrivalsQt": 3500,
                "factor": 0.981
        },
        {
                "district": "Nandurbar",
                "mandi": "Nandurbar Jalna Sweet Lime APMC",
                "modalQt": 3716,
                "minQt": 3130,
                "maxQt": 4303,
                "arrivalsQt": 2900,
                "factor": 0.978
        },
        {
                "district": "Beed",
                "mandi": "Beed Jalna Sweet Lime APMC",
                "modalQt": 3747,
                "minQt": 3155,
                "maxQt": 4338,
                "arrivalsQt": 2400,
                "factor": 0.986
        },
        {
                "district": "Washim",
                "mandi": "Washim Jalna Sweet Lime APMC",
                "modalQt": 3773,
                "minQt": 3178,
                "maxQt": 4369,
                "arrivalsQt": 2300,
                "factor": 0.993
        },
        {
                "district": "Palghar",
                "mandi": "Palghar Jalna Sweet Lime APMC",
                "modalQt": 3857,
                "minQt": 3248,
                "maxQt": 4466,
                "arrivalsQt": 2100,
                "factor": 1.015
        },
        {
                "district": "Dharashiv",
                "mandi": "Dharashiv Jalna Sweet Lime APMC",
                "modalQt": 3758,
                "minQt": 3165,
                "maxQt": 4352,
                "arrivalsQt": 2200,
                "factor": 0.989
        },
        {
                "district": "Hingoli",
                "mandi": "Hingoli Jalna Sweet Lime APMC",
                "modalQt": 3762,
                "minQt": 3168,
                "maxQt": 4356,
                "arrivalsQt": 1900,
                "factor": 0.99
        },
        {
                "district": "Wardha",
                "mandi": "Wardha Jalna Sweet Lime APMC",
                "modalQt": 3785,
                "minQt": 3187,
                "maxQt": 4382,
                "arrivalsQt": 2400,
                "factor": 0.996
        },
        {
                "district": "Ratnagiri",
                "mandi": "Ratnagiri Jalna Sweet Lime APMC",
                "modalQt": 3971,
                "minQt": 3344,
                "maxQt": 4598,
                "arrivalsQt": 1800,
                "factor": 1.045
        },
        {
                "district": "Sindhudurg",
                "mandi": "Sindhudurg Jalna Sweet Lime APMC",
                "modalQt": 3982,
                "minQt": 3354,
                "maxQt": 4611,
                "arrivalsQt": 1600,
                "factor": 1.048
        },
        {
                "district": "Raigad",
                "mandi": "Raigad Jalna Sweet Lime APMC",
                "modalQt": 3933,
                "minQt": 3312,
                "maxQt": 4554,
                "arrivalsQt": 2700,
                "factor": 1.035
        },
        {
                "district": "Yavatmal",
                "mandi": "Yavatmal Jalna Sweet Lime APMC",
                "modalQt": 3751,
                "minQt": 3158,
                "maxQt": 4343,
                "arrivalsQt": 3300,
                "factor": 0.987
        },
        {
                "district": "Buldhana",
                "mandi": "Buldhana Jalna Sweet Lime APMC",
                "modalQt": 3773,
                "minQt": 3178,
                "maxQt": 4369,
                "arrivalsQt": 3100,
                "factor": 0.993
        },
        {
                "district": "Bhandara",
                "mandi": "Bhandara Jalna Sweet Lime APMC",
                "modalQt": 3739,
                "minQt": 3149,
                "maxQt": 4330,
                "arrivalsQt": 2600,
                "factor": 0.984
        },
        {
                "district": "Parbhani",
                "mandi": "Parbhani Jalna Sweet Lime APMC",
                "modalQt": 3766,
                "minQt": 3171,
                "maxQt": 4360,
                "arrivalsQt": 2500,
                "factor": 0.991
        }
],
      history: {
        "7D": {
                "labels": [
                        "08 Sep",
                        "09 Sep",
                        "10 Sep",
                        "11 Sep",
                        "12 Sep",
                        "13 Sep",
                        "14 Sep (Today)",
                        "16 Sep (AI)",
                        "18 Sep (AI)",
                        "20 Sep (AI)"
                ],
                "historical": [
                        3534,
                        3610,
                        3648,
                        3724,
                        3762,
                        3781,
                        3800,
                        null,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        3800,
                        3876,
                        3990,
                        4066
                ],
                "mandiMin": [
                        3040,
                        3072,
                        3104,
                        3136,
                        3168,
                        3200,
                        3200,
                        null,
                        null,
                        null
                ],
                "mandiMax": [
                        4092,
                        4180,
                        4268,
                        4312,
                        4356,
                        4400,
                        4400,
                        null,
                        null,
                        null
                ]
        },
        "1M": {
                "labels": [
                        "15 Aug",
                        "22 Aug",
                        "29 Aug",
                        "05 Sep",
                        "12 Sep",
                        "14 Sep (Today)",
                        "21 Sep (AI)",
                        "28 Sep (AI)"
                ],
                "historical": [
                        3230,
                        3344,
                        3458,
                        3610,
                        3724,
                        3800,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        3800,
                        3952,
                        4104
                ],
                "mandiMin": [
                        2720,
                        2816,
                        2944,
                        3072,
                        3200,
                        3200,
                        null,
                        null
                ],
                "mandiMax": [
                        3740,
                        3872,
                        4048,
                        4224,
                        4400,
                        4400,
                        null,
                        null
                ]
        },
        "3M": {
                "labels": [
                        "Jun 26",
                        "Jul 26",
                        "Aug 26",
                        "Sep 26 (Now)",
                        "Oct 26 (AI)",
                        "Nov 26 (AI)"
                ],
                "historical": [
                        3040,
                        3268,
                        3496,
                        3800,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        3800,
                        4028,
                        4256
                ],
                "mandiMin": [
                        2560,
                        2752,
                        2944,
                        3200,
                        null,
                        null
                ],
                "mandiMax": [
                        3520,
                        3784,
                        4048,
                        4400,
                        null,
                        null
                ]
        },
        "1Y": {
                "labels": [
                        "Oct 25",
                        "Dec 25",
                        "Feb 26",
                        "Apr 26",
                        "Jun 26",
                        "Aug 26",
                        "Sep 26 (Now)"
                ],
                "historical": [
                        3990,
                        4560,
                        3230,
                        2850,
                        3040,
                        3420,
                        3800
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        3800
                ],
                "mandiMin": [
                        3360,
                        3840,
                        2720,
                        2400,
                        2560,
                        2880,
                        3200
                ],
                "mandiMax": [
                        4620,
                        5280,
                        3740,
                        3300,
                        3520,
                        3960,
                        4400
                ]
        }
}
    },
    sitaphal: {
      key: "sitaphal",
      name: "Beed Balanagar Custard Apple",
      emoji: "🍈",
      hub: "Beed & Dharashiv APMC",
      currentModalQt: 4200,
      currentMinQt: 3500,
      currentMaxQt: 4900,
      farmGateQt: 4050,
      terminalVashiQt: 5100,
      arbitragePct: 20.6,
      trendPct: "+5.1%",
      trendDir: "up",
      arrivalsQt: 2800,
      arrivalsChange: "+18.0% Seasonal",
      sentiment: "Ice Cream & Pulp Industry Peak",
      sentimentScore: 87,
      recommendation: "Balanagar extra sweet custard apples harvested daily for dairy & dessert processors.",
      districtHubs: [
        {
                "district": "Beed",
                "mandi": "Dharur APMC",
                "modalQt": 4200,
                "minQt": 3500,
                "maxQt": 4900,
                "arrivalsQt": 2800,
                "factor": 1
        },
        {
                "district": "Dharashiv",
                "mandi": "Tuljapur APMC",
                "modalQt": 4150,
                "minQt": 3450,
                "maxQt": 4850,
                "arrivalsQt": 2200,
                "factor": 0.988
        },
        {
                "district": "Solapur",
                "mandi": "Barshi Sitaphal Yard",
                "modalQt": 4250,
                "minQt": 3550,
                "maxQt": 4950,
                "arrivalsQt": 1900,
                "factor": 1.011
        },
        {
                "district": "Nashik",
                "mandi": "Nashik Beed Balanagar Custard Apple APMC",
                "modalQt": 4200,
                "minQt": 3500,
                "maxQt": 4900,
                "arrivalsQt": 6850,
                "factor": 1
        },
        {
                "district": "Pune",
                "mandi": "Pune Beed Balanagar Custard Apple APMC",
                "modalQt": 4305,
                "minQt": 3587,
                "maxQt": 5023,
                "arrivalsQt": 5400,
                "factor": 1.025
        },
        {
                "district": "Jalgaon",
                "mandi": "Jalgaon Beed Balanagar Custard Apple APMC",
                "modalQt": 4124,
                "minQt": 3437,
                "maxQt": 4812,
                "arrivalsQt": 4200,
                "factor": 0.982
        },
        {
                "district": "Latur",
                "mandi": "Latur Beed Balanagar Custard Apple APMC",
                "modalQt": 4179,
                "minQt": 3483,
                "maxQt": 4876,
                "arrivalsQt": 6400,
                "factor": 0.995
        },
        {
                "district": "Nagpur",
                "mandi": "Nagpur Beed Balanagar Custard Apple APMC",
                "modalQt": 4276,
                "minQt": 3563,
                "maxQt": 4988,
                "arrivalsQt": 4900,
                "factor": 1.018
        },
        {
                "district": "Sangli",
                "mandi": "Sangli Beed Balanagar Custard Apple APMC",
                "modalQt": 4166,
                "minQt": 3472,
                "maxQt": 4861,
                "arrivalsQt": 3600,
                "factor": 0.992
        },
        {
                "district": "Ahmednagar",
                "mandi": "Ahmednagar Beed Balanagar Custard Apple APMC",
                "modalQt": 4145,
                "minQt": 3455,
                "maxQt": 4836,
                "arrivalsQt": 5100,
                "factor": 0.987
        },
        {
                "district": "Amravati",
                "mandi": "Amravati Beed Balanagar Custard Apple APMC",
                "modalQt": 4175,
                "minQt": 3479,
                "maxQt": 4871,
                "arrivalsQt": 3800,
                "factor": 0.994
        },
        {
                "district": "Akola",
                "mandi": "Akola Beed Balanagar Custard Apple APMC",
                "modalQt": 4162,
                "minQt": 3469,
                "maxQt": 4856,
                "arrivalsQt": 4100,
                "factor": 0.991
        },
        {
                "district": "Nanded",
                "mandi": "Nanded Beed Balanagar Custard Apple APMC",
                "modalQt": 4187,
                "minQt": 3490,
                "maxQt": 4885,
                "arrivalsQt": 3200,
                "factor": 0.997
        },
        {
                "district": "Satara",
                "mandi": "Satara Beed Balanagar Custard Apple APMC",
                "modalQt": 4250,
                "minQt": 3542,
                "maxQt": 4959,
                "arrivalsQt": 2800,
                "factor": 1.012
        },
        {
                "district": "Kolhapur",
                "mandi": "Kolhapur Beed Balanagar Custard Apple APMC",
                "modalQt": 4292,
                "minQt": 3577,
                "maxQt": 5008,
                "arrivalsQt": 3300,
                "factor": 1.022
        },
        {
                "district": "Dhule",
                "mandi": "Dhule Beed Balanagar Custard Apple APMC",
                "modalQt": 4120,
                "minQt": 3434,
                "maxQt": 4807,
                "arrivalsQt": 3500,
                "factor": 0.981
        },
        {
                "district": "Nandurbar",
                "mandi": "Nandurbar Beed Balanagar Custard Apple APMC",
                "modalQt": 4108,
                "minQt": 3423,
                "maxQt": 4792,
                "arrivalsQt": 2900,
                "factor": 0.978
        },
        {
                "district": "Washim",
                "mandi": "Washim Beed Balanagar Custard Apple APMC",
                "modalQt": 4171,
                "minQt": 3476,
                "maxQt": 4866,
                "arrivalsQt": 2300,
                "factor": 0.993
        },
        {
                "district": "Palghar",
                "mandi": "Palghar Beed Balanagar Custard Apple APMC",
                "modalQt": 4263,
                "minQt": 3552,
                "maxQt": 4973,
                "arrivalsQt": 2100,
                "factor": 1.015
        },
        {
                "district": "Chhatrapati Sambhajinagar",
                "mandi": "Chhatrapati Sambhajinagar Beed Balanagar Custard Apple APMC",
                "modalQt": 4225,
                "minQt": 3521,
                "maxQt": 4929,
                "arrivalsQt": 3400,
                "factor": 1.006
        },
        {
                "district": "Hingoli",
                "mandi": "Hingoli Beed Balanagar Custard Apple APMC",
                "modalQt": 4158,
                "minQt": 3465,
                "maxQt": 4851,
                "arrivalsQt": 1900,
                "factor": 0.99
        },
        {
                "district": "Wardha",
                "mandi": "Wardha Beed Balanagar Custard Apple APMC",
                "modalQt": 4183,
                "minQt": 3486,
                "maxQt": 4880,
                "arrivalsQt": 2400,
                "factor": 0.996
        },
        {
                "district": "Ratnagiri",
                "mandi": "Ratnagiri Beed Balanagar Custard Apple APMC",
                "modalQt": 4389,
                "minQt": 3657,
                "maxQt": 5121,
                "arrivalsQt": 1800,
                "factor": 1.045
        },
        {
                "district": "Sindhudurg",
                "mandi": "Sindhudurg Beed Balanagar Custard Apple APMC",
                "modalQt": 4402,
                "minQt": 3668,
                "maxQt": 5135,
                "arrivalsQt": 1600,
                "factor": 1.048
        },
        {
                "district": "Raigad",
                "mandi": "Raigad Beed Balanagar Custard Apple APMC",
                "modalQt": 4347,
                "minQt": 3622,
                "maxQt": 5072,
                "arrivalsQt": 2700,
                "factor": 1.035
        },
        {
                "district": "Yavatmal",
                "mandi": "Yavatmal Beed Balanagar Custard Apple APMC",
                "modalQt": 4145,
                "minQt": 3455,
                "maxQt": 4836,
                "arrivalsQt": 3300,
                "factor": 0.987
        },
        {
                "district": "Buldhana",
                "mandi": "Buldhana Beed Balanagar Custard Apple APMC",
                "modalQt": 4171,
                "minQt": 3476,
                "maxQt": 4866,
                "arrivalsQt": 3100,
                "factor": 0.993
        },
        {
                "district": "Bhandara",
                "mandi": "Bhandara Beed Balanagar Custard Apple APMC",
                "modalQt": 4133,
                "minQt": 3444,
                "maxQt": 4822,
                "arrivalsQt": 2600,
                "factor": 0.984
        },
        {
                "district": "Jalna",
                "mandi": "Jalna Beed Balanagar Custard Apple APMC",
                "modalQt": 4183,
                "minQt": 3486,
                "maxQt": 4880,
                "arrivalsQt": 3200,
                "factor": 0.996
        },
        {
                "district": "Parbhani",
                "mandi": "Parbhani Beed Balanagar Custard Apple APMC",
                "modalQt": 4162,
                "minQt": 3469,
                "maxQt": 4856,
                "arrivalsQt": 2500,
                "factor": 0.991
        }
],
      history: {
        "7D": {
                "labels": [
                        "08 Sep",
                        "09 Sep",
                        "10 Sep",
                        "11 Sep",
                        "12 Sep",
                        "13 Sep",
                        "14 Sep (Today)",
                        "16 Sep (AI)",
                        "18 Sep (AI)",
                        "20 Sep (AI)"
                ],
                "historical": [
                        3906,
                        3990,
                        4032,
                        4116,
                        4158,
                        4179,
                        4200,
                        null,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        4200,
                        4284,
                        4410,
                        4494
                ],
                "mandiMin": [
                        3325,
                        3360,
                        3395,
                        3430,
                        3465,
                        3500,
                        3500,
                        null,
                        null,
                        null
                ],
                "mandiMax": [
                        4557,
                        4655,
                        4753,
                        4802,
                        4851,
                        4900,
                        4900,
                        null,
                        null,
                        null
                ]
        },
        "1M": {
                "labels": [
                        "15 Aug",
                        "22 Aug",
                        "29 Aug",
                        "05 Sep",
                        "12 Sep",
                        "14 Sep (Today)",
                        "21 Sep (AI)",
                        "28 Sep (AI)"
                ],
                "historical": [
                        3570,
                        3696,
                        3822,
                        3990,
                        4116,
                        4200,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        4200,
                        4368,
                        4536
                ],
                "mandiMin": [
                        2975,
                        3080,
                        3220,
                        3360,
                        3500,
                        3500,
                        null,
                        null
                ],
                "mandiMax": [
                        4165,
                        4312,
                        4508,
                        4704,
                        4900,
                        4900,
                        null,
                        null
                ]
        },
        "3M": {
                "labels": [
                        "Jun 26",
                        "Jul 26",
                        "Aug 26",
                        "Sep 26 (Now)",
                        "Oct 26 (AI)",
                        "Nov 26 (AI)"
                ],
                "historical": [
                        3360,
                        3612,
                        3864,
                        4200,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        4200,
                        4452,
                        4704
                ],
                "mandiMin": [
                        2800,
                        3010,
                        3220,
                        3500,
                        null,
                        null
                ],
                "mandiMax": [
                        3920,
                        4214,
                        4508,
                        4900,
                        null,
                        null
                ]
        },
        "1Y": {
                "labels": [
                        "Oct 25",
                        "Dec 25",
                        "Feb 26",
                        "Apr 26",
                        "Jun 26",
                        "Aug 26",
                        "Sep 26 (Now)"
                ],
                "historical": [
                        4410,
                        5040,
                        3570,
                        3150,
                        3360,
                        3780,
                        4200
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        4200
                ],
                "mandiMin": [
                        3675,
                        4200,
                        2975,
                        2625,
                        2800,
                        3150,
                        3500
                ],
                "mandiMax": [
                        5145,
                        5880,
                        4165,
                        3675,
                        3920,
                        4410,
                        4900
                ]
        }
}
    },
    mango: {
      key: "mango",
      name: "Ratnagiri Alphonso (Hapus GI)",
      emoji: "🥭",
      hub: "Ratnagiri & Devgad APMC",
      currentModalQt: 18500,
      currentMinQt: 15000,
      currentMaxQt: 22000,
      farmGateQt: 18000,
      terminalVashiQt: 24000,
      arbitragePct: 25,
      trendPct: "+9.2%",
      trendDir: "up",
      arrivalsQt: 1900,
      arrivalsChange: "+8.0% GI Premium",
      sentiment: "Global Premium Export Peak",
      sentimentScore: 96,
      recommendation: "100% authentic Konkan GI tagged Alphonso mangoes with QR traceability tags.",
      districtHubs: [
        {
                "district": "Ratnagiri",
                "mandi": "Ratnagiri Mango APMC",
                "modalQt": 18500,
                "minQt": 15000,
                "maxQt": 22000,
                "arrivalsQt": 1900,
                "factor": 1
        },
        {
                "district": "Sindhudurg",
                "mandi": "Devgad Hapus Yard",
                "modalQt": 18800,
                "minQt": 15300,
                "maxQt": 22300,
                "arrivalsQt": 2400,
                "factor": 1.016
        },
        {
                "district": "Raigad",
                "mandi": "Alibaug APMC",
                "modalQt": 18200,
                "minQt": 14700,
                "maxQt": 21700,
                "arrivalsQt": 1100,
                "factor": 0.983
        },
        {
                "district": "Nashik",
                "mandi": "Nashik Ratnagiri Alphonso APMC",
                "modalQt": 18500,
                "minQt": 15000,
                "maxQt": 22000,
                "arrivalsQt": 6850,
                "factor": 1
        },
        {
                "district": "Pune",
                "mandi": "Pune Ratnagiri Alphonso APMC",
                "modalQt": 18963,
                "minQt": 15375,
                "maxQt": 22550,
                "arrivalsQt": 5400,
                "factor": 1.025
        },
        {
                "district": "Jalgaon",
                "mandi": "Jalgaon Ratnagiri Alphonso APMC",
                "modalQt": 18167,
                "minQt": 14730,
                "maxQt": 21604,
                "arrivalsQt": 4200,
                "factor": 0.982
        },
        {
                "district": "Latur",
                "mandi": "Latur Ratnagiri Alphonso APMC",
                "modalQt": 18408,
                "minQt": 14925,
                "maxQt": 21890,
                "arrivalsQt": 6400,
                "factor": 0.995
        },
        {
                "district": "Nagpur",
                "mandi": "Nagpur Ratnagiri Alphonso APMC",
                "modalQt": 18833,
                "minQt": 15270,
                "maxQt": 22396,
                "arrivalsQt": 4900,
                "factor": 1.018
        },
        {
                "district": "Sangli",
                "mandi": "Sangli Ratnagiri Alphonso APMC",
                "modalQt": 18352,
                "minQt": 14880,
                "maxQt": 21824,
                "arrivalsQt": 3600,
                "factor": 0.992
        },
        {
                "district": "Solapur",
                "mandi": "Solapur Ratnagiri Alphonso APMC",
                "modalQt": 18611,
                "minQt": 15090,
                "maxQt": 22132,
                "arrivalsQt": 4500,
                "factor": 1.006
        },
        {
                "district": "Ahmednagar",
                "mandi": "Ahmednagar Ratnagiri Alphonso APMC",
                "modalQt": 18260,
                "minQt": 14805,
                "maxQt": 21714,
                "arrivalsQt": 5100,
                "factor": 0.987
        },
        {
                "district": "Amravati",
                "mandi": "Amravati Ratnagiri Alphonso APMC",
                "modalQt": 18389,
                "minQt": 14910,
                "maxQt": 21868,
                "arrivalsQt": 3800,
                "factor": 0.994
        },
        {
                "district": "Akola",
                "mandi": "Akola Ratnagiri Alphonso APMC",
                "modalQt": 18334,
                "minQt": 14865,
                "maxQt": 21802,
                "arrivalsQt": 4100,
                "factor": 0.991
        },
        {
                "district": "Nanded",
                "mandi": "Nanded Ratnagiri Alphonso APMC",
                "modalQt": 18445,
                "minQt": 14955,
                "maxQt": 21934,
                "arrivalsQt": 3200,
                "factor": 0.997
        },
        {
                "district": "Satara",
                "mandi": "Satara Ratnagiri Alphonso APMC",
                "modalQt": 18722,
                "minQt": 15180,
                "maxQt": 22264,
                "arrivalsQt": 2800,
                "factor": 1.012
        },
        {
                "district": "Kolhapur",
                "mandi": "Kolhapur Ratnagiri Alphonso APMC",
                "modalQt": 18907,
                "minQt": 15330,
                "maxQt": 22484,
                "arrivalsQt": 3300,
                "factor": 1.022
        },
        {
                "district": "Dhule",
                "mandi": "Dhule Ratnagiri Alphonso APMC",
                "modalQt": 18149,
                "minQt": 14715,
                "maxQt": 21582,
                "arrivalsQt": 3500,
                "factor": 0.981
        },
        {
                "district": "Nandurbar",
                "mandi": "Nandurbar Ratnagiri Alphonso APMC",
                "modalQt": 18093,
                "minQt": 14670,
                "maxQt": 21516,
                "arrivalsQt": 2900,
                "factor": 0.978
        },
        {
                "district": "Beed",
                "mandi": "Beed Ratnagiri Alphonso APMC",
                "modalQt": 18241,
                "minQt": 14790,
                "maxQt": 21692,
                "arrivalsQt": 2400,
                "factor": 0.986
        },
        {
                "district": "Washim",
                "mandi": "Washim Ratnagiri Alphonso APMC",
                "modalQt": 18371,
                "minQt": 14895,
                "maxQt": 21846,
                "arrivalsQt": 2300,
                "factor": 0.993
        },
        {
                "district": "Palghar",
                "mandi": "Palghar Ratnagiri Alphonso APMC",
                "modalQt": 18778,
                "minQt": 15225,
                "maxQt": 22330,
                "arrivalsQt": 2100,
                "factor": 1.015
        },
        {
                "district": "Dharashiv",
                "mandi": "Dharashiv Ratnagiri Alphonso APMC",
                "modalQt": 18297,
                "minQt": 14835,
                "maxQt": 21758,
                "arrivalsQt": 2200,
                "factor": 0.989
        },
        {
                "district": "Chhatrapati Sambhajinagar",
                "mandi": "Chhatrapati Sambhajinagar Ratnagiri Alphonso APMC",
                "modalQt": 18611,
                "minQt": 15090,
                "maxQt": 22132,
                "arrivalsQt": 3400,
                "factor": 1.006
        },
        {
                "district": "Hingoli",
                "mandi": "Hingoli Ratnagiri Alphonso APMC",
                "modalQt": 18315,
                "minQt": 14850,
                "maxQt": 21780,
                "arrivalsQt": 1900,
                "factor": 0.99
        },
        {
                "district": "Wardha",
                "mandi": "Wardha Ratnagiri Alphonso APMC",
                "modalQt": 18426,
                "minQt": 14940,
                "maxQt": 21912,
                "arrivalsQt": 2400,
                "factor": 0.996
        },
        {
                "district": "Yavatmal",
                "mandi": "Yavatmal Ratnagiri Alphonso APMC",
                "modalQt": 18260,
                "minQt": 14805,
                "maxQt": 21714,
                "arrivalsQt": 3300,
                "factor": 0.987
        },
        {
                "district": "Buldhana",
                "mandi": "Buldhana Ratnagiri Alphonso APMC",
                "modalQt": 18371,
                "minQt": 14895,
                "maxQt": 21846,
                "arrivalsQt": 3100,
                "factor": 0.993
        },
        {
                "district": "Bhandara",
                "mandi": "Bhandara Ratnagiri Alphonso APMC",
                "modalQt": 18204,
                "minQt": 14760,
                "maxQt": 21648,
                "arrivalsQt": 2600,
                "factor": 0.984
        },
        {
                "district": "Jalna",
                "mandi": "Jalna Ratnagiri Alphonso APMC",
                "modalQt": 18426,
                "minQt": 14940,
                "maxQt": 21912,
                "arrivalsQt": 3200,
                "factor": 0.996
        },
        {
                "district": "Parbhani",
                "mandi": "Parbhani Ratnagiri Alphonso APMC",
                "modalQt": 18334,
                "minQt": 14865,
                "maxQt": 21802,
                "arrivalsQt": 2500,
                "factor": 0.991
        }
],
      history: {
        "7D": {
                "labels": [
                        "08 Sep",
                        "09 Sep",
                        "10 Sep",
                        "11 Sep",
                        "12 Sep",
                        "13 Sep",
                        "14 Sep (Today)",
                        "16 Sep (AI)",
                        "18 Sep (AI)",
                        "20 Sep (AI)"
                ],
                "historical": [
                        17205,
                        17575,
                        17760,
                        18130,
                        18315,
                        18408,
                        18500,
                        null,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        18500,
                        18870,
                        19425,
                        19795
                ],
                "mandiMin": [
                        14250,
                        14400,
                        14550,
                        14700,
                        14850,
                        15000,
                        15000,
                        null,
                        null,
                        null
                ],
                "mandiMax": [
                        20460,
                        20900,
                        21340,
                        21560,
                        21780,
                        22000,
                        22000,
                        null,
                        null,
                        null
                ]
        },
        "1M": {
                "labels": [
                        "15 Aug",
                        "22 Aug",
                        "29 Aug",
                        "05 Sep",
                        "12 Sep",
                        "14 Sep (Today)",
                        "21 Sep (AI)",
                        "28 Sep (AI)"
                ],
                "historical": [
                        15725,
                        16280,
                        16835,
                        17575,
                        18130,
                        18500,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        18500,
                        19240,
                        19980
                ],
                "mandiMin": [
                        12750,
                        13200,
                        13800,
                        14400,
                        15000,
                        15000,
                        null,
                        null
                ],
                "mandiMax": [
                        18700,
                        19360,
                        20240,
                        21120,
                        22000,
                        22000,
                        null,
                        null
                ]
        },
        "3M": {
                "labels": [
                        "Jun 26",
                        "Jul 26",
                        "Aug 26",
                        "Sep 26 (Now)",
                        "Oct 26 (AI)",
                        "Nov 26 (AI)"
                ],
                "historical": [
                        14800,
                        15910,
                        17020,
                        18500,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        18500,
                        19610,
                        20720
                ],
                "mandiMin": [
                        12000,
                        12900,
                        13800,
                        15000,
                        null,
                        null
                ],
                "mandiMax": [
                        17600,
                        18920,
                        20240,
                        22000,
                        null,
                        null
                ]
        },
        "1Y": {
                "labels": [
                        "Oct 25",
                        "Dec 25",
                        "Feb 26",
                        "Apr 26",
                        "Jun 26",
                        "Aug 26",
                        "Sep 26 (Now)"
                ],
                "historical": [
                        19425,
                        22200,
                        15725,
                        13875,
                        14800,
                        16650,
                        18500
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        18500
                ],
                "mandiMin": [
                        15750,
                        18000,
                        12750,
                        11250,
                        12000,
                        13500,
                        15000
                ],
                "mandiMax": [
                        23100,
                        26400,
                        18700,
                        16500,
                        17600,
                        19800,
                        22000
                ]
        }
}
    },
    potato: {
      key: "potato",
      name: "Grade A Potato (Manchar Jyoti)",
      emoji: "🥔",
      hub: "Manchar APMC (Pune)",
      currentModalQt: 1600,
      currentMinQt: 1300,
      currentMaxQt: 1850,
      farmGateQt: 1550,
      terminalVashiQt: 1900,
      arbitragePct: 18.4,
      trendPct: "+2.4%",
      trendDir: "up",
      arrivalsQt: 6100,
      arrivalsChange: "+14.2% Cold Storage",
      sentiment: "Bullish Processing Buying",
      sentimentScore: 81,
      recommendation: "High dry matter Jyoti potatoes from Khed and Manchar cold stores. Ideal for chip processors and wholesale markets.",
      districtHubs: [
        {
                "district": "Pune",
                "mandi": "Manchar Potato APMC",
                "modalQt": 1600,
                "minQt": 1300,
                "maxQt": 1850,
                "arrivalsQt": 6100,
                "factor": 1
        },
        {
                "district": "Satara",
                "mandi": "Wai APMC",
                "modalQt": 1580,
                "minQt": 1280,
                "maxQt": 1830,
                "arrivalsQt": 3900,
                "factor": 0.987
        },
        {
                "district": "Nashik",
                "mandi": "Sinnar APMC",
                "modalQt": 1620,
                "minQt": 1320,
                "maxQt": 1870,
                "arrivalsQt": 4200,
                "factor": 1.012
        },
        {
                "district": "Ahmednagar",
                "mandi": "Parner APMC",
                "modalQt": 1590,
                "minQt": 1290,
                "maxQt": 1840,
                "arrivalsQt": 2800,
                "factor": 0.993
        },
        {
                "district": "Jalgaon",
                "mandi": "Jalgaon Grade A Potato APMC",
                "modalQt": 1571,
                "minQt": 1277,
                "maxQt": 1817,
                "arrivalsQt": 4200,
                "factor": 0.982
        },
        {
                "district": "Latur",
                "mandi": "Latur Grade A Potato APMC",
                "modalQt": 1592,
                "minQt": 1294,
                "maxQt": 1841,
                "arrivalsQt": 6400,
                "factor": 0.995
        },
        {
                "district": "Nagpur",
                "mandi": "Nagpur Grade A Potato APMC",
                "modalQt": 1629,
                "minQt": 1323,
                "maxQt": 1883,
                "arrivalsQt": 4900,
                "factor": 1.018
        },
        {
                "district": "Sangli",
                "mandi": "Sangli Grade A Potato APMC",
                "modalQt": 1587,
                "minQt": 1290,
                "maxQt": 1835,
                "arrivalsQt": 3600,
                "factor": 0.992
        },
        {
                "district": "Solapur",
                "mandi": "Solapur Grade A Potato APMC",
                "modalQt": 1610,
                "minQt": 1308,
                "maxQt": 1861,
                "arrivalsQt": 4500,
                "factor": 1.006
        },
        {
                "district": "Amravati",
                "mandi": "Amravati Grade A Potato APMC",
                "modalQt": 1590,
                "minQt": 1292,
                "maxQt": 1839,
                "arrivalsQt": 3800,
                "factor": 0.994
        },
        {
                "district": "Akola",
                "mandi": "Akola Grade A Potato APMC",
                "modalQt": 1586,
                "minQt": 1288,
                "maxQt": 1833,
                "arrivalsQt": 4100,
                "factor": 0.991
        },
        {
                "district": "Nanded",
                "mandi": "Nanded Grade A Potato APMC",
                "modalQt": 1595,
                "minQt": 1296,
                "maxQt": 1844,
                "arrivalsQt": 3200,
                "factor": 0.997
        },
        {
                "district": "Kolhapur",
                "mandi": "Kolhapur Grade A Potato APMC",
                "modalQt": 1635,
                "minQt": 1329,
                "maxQt": 1891,
                "arrivalsQt": 3300,
                "factor": 1.022
        },
        {
                "district": "Dhule",
                "mandi": "Dhule Grade A Potato APMC",
                "modalQt": 1570,
                "minQt": 1275,
                "maxQt": 1815,
                "arrivalsQt": 3500,
                "factor": 0.981
        },
        {
                "district": "Nandurbar",
                "mandi": "Nandurbar Grade A Potato APMC",
                "modalQt": 1565,
                "minQt": 1271,
                "maxQt": 1809,
                "arrivalsQt": 2900,
                "factor": 0.978
        },
        {
                "district": "Beed",
                "mandi": "Beed Grade A Potato APMC",
                "modalQt": 1578,
                "minQt": 1282,
                "maxQt": 1824,
                "arrivalsQt": 2400,
                "factor": 0.986
        },
        {
                "district": "Washim",
                "mandi": "Washim Grade A Potato APMC",
                "modalQt": 1589,
                "minQt": 1291,
                "maxQt": 1837,
                "arrivalsQt": 2300,
                "factor": 0.993
        },
        {
                "district": "Palghar",
                "mandi": "Palghar Grade A Potato APMC",
                "modalQt": 1624,
                "minQt": 1319,
                "maxQt": 1878,
                "arrivalsQt": 2100,
                "factor": 1.015
        },
        {
                "district": "Dharashiv",
                "mandi": "Dharashiv Grade A Potato APMC",
                "modalQt": 1582,
                "minQt": 1286,
                "maxQt": 1830,
                "arrivalsQt": 2200,
                "factor": 0.989
        },
        {
                "district": "Chhatrapati Sambhajinagar",
                "mandi": "Chhatrapati Sambhajinagar Grade A Potato APMC",
                "modalQt": 1610,
                "minQt": 1308,
                "maxQt": 1861,
                "arrivalsQt": 3400,
                "factor": 1.006
        },
        {
                "district": "Hingoli",
                "mandi": "Hingoli Grade A Potato APMC",
                "modalQt": 1584,
                "minQt": 1287,
                "maxQt": 1832,
                "arrivalsQt": 1900,
                "factor": 0.99
        },
        {
                "district": "Wardha",
                "mandi": "Wardha Grade A Potato APMC",
                "modalQt": 1594,
                "minQt": 1295,
                "maxQt": 1843,
                "arrivalsQt": 2400,
                "factor": 0.996
        },
        {
                "district": "Ratnagiri",
                "mandi": "Ratnagiri Grade A Potato APMC",
                "modalQt": 1672,
                "minQt": 1359,
                "maxQt": 1933,
                "arrivalsQt": 1800,
                "factor": 1.045
        },
        {
                "district": "Sindhudurg",
                "mandi": "Sindhudurg Grade A Potato APMC",
                "modalQt": 1677,
                "minQt": 1362,
                "maxQt": 1939,
                "arrivalsQt": 1600,
                "factor": 1.048
        },
        {
                "district": "Raigad",
                "mandi": "Raigad Grade A Potato APMC",
                "modalQt": 1656,
                "minQt": 1346,
                "maxQt": 1915,
                "arrivalsQt": 2700,
                "factor": 1.035
        },
        {
                "district": "Yavatmal",
                "mandi": "Yavatmal Grade A Potato APMC",
                "modalQt": 1579,
                "minQt": 1283,
                "maxQt": 1826,
                "arrivalsQt": 3300,
                "factor": 0.987
        },
        {
                "district": "Buldhana",
                "mandi": "Buldhana Grade A Potato APMC",
                "modalQt": 1589,
                "minQt": 1291,
                "maxQt": 1837,
                "arrivalsQt": 3100,
                "factor": 0.993
        },
        {
                "district": "Bhandara",
                "mandi": "Bhandara Grade A Potato APMC",
                "modalQt": 1574,
                "minQt": 1279,
                "maxQt": 1820,
                "arrivalsQt": 2600,
                "factor": 0.984
        },
        {
                "district": "Jalna",
                "mandi": "Jalna Grade A Potato APMC",
                "modalQt": 1594,
                "minQt": 1295,
                "maxQt": 1843,
                "arrivalsQt": 3200,
                "factor": 0.996
        },
        {
                "district": "Parbhani",
                "mandi": "Parbhani Grade A Potato APMC",
                "modalQt": 1586,
                "minQt": 1288,
                "maxQt": 1833,
                "arrivalsQt": 2500,
                "factor": 0.991
        }
],
      history: {
        "7D": {
                "labels": [
                        "08 Sep",
                        "09 Sep",
                        "10 Sep",
                        "11 Sep",
                        "12 Sep",
                        "13 Sep",
                        "14 Sep (Today)",
                        "16 Sep (AI)",
                        "18 Sep (AI)",
                        "20 Sep (AI)"
                ],
                "historical": [
                        1488,
                        1520,
                        1536,
                        1568,
                        1584,
                        1592,
                        1600,
                        null,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        1600,
                        1632,
                        1680,
                        1712
                ],
                "mandiMin": [
                        1235,
                        1248,
                        1261,
                        1274,
                        1287,
                        1300,
                        1300,
                        null,
                        null,
                        null
                ],
                "mandiMax": [
                        1721,
                        1758,
                        1795,
                        1813,
                        1832,
                        1850,
                        1850,
                        null,
                        null,
                        null
                ]
        },
        "1M": {
                "labels": [
                        "15 Aug",
                        "22 Aug",
                        "29 Aug",
                        "05 Sep",
                        "12 Sep",
                        "14 Sep (Today)",
                        "21 Sep (AI)",
                        "28 Sep (AI)"
                ],
                "historical": [
                        1360,
                        1408,
                        1456,
                        1520,
                        1568,
                        1600,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        1600,
                        1664,
                        1728
                ],
                "mandiMin": [
                        1105,
                        1144,
                        1196,
                        1248,
                        1300,
                        1300,
                        null,
                        null
                ],
                "mandiMax": [
                        1573,
                        1628,
                        1702,
                        1776,
                        1850,
                        1850,
                        null,
                        null
                ]
        },
        "3M": {
                "labels": [
                        "Jun 26",
                        "Jul 26",
                        "Aug 26",
                        "Sep 26 (Now)",
                        "Oct 26 (AI)",
                        "Nov 26 (AI)"
                ],
                "historical": [
                        1280,
                        1376,
                        1472,
                        1600,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        1600,
                        1696,
                        1792
                ],
                "mandiMin": [
                        1040,
                        1118,
                        1196,
                        1300,
                        null,
                        null
                ],
                "mandiMax": [
                        1480,
                        1591,
                        1702,
                        1850,
                        null,
                        null
                ]
        },
        "1Y": {
                "labels": [
                        "Oct 25",
                        "Dec 25",
                        "Feb 26",
                        "Apr 26",
                        "Jun 26",
                        "Aug 26",
                        "Sep 26 (Now)"
                ],
                "historical": [
                        1680,
                        1920,
                        1360,
                        1200,
                        1280,
                        1440,
                        1600
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        1600
                ],
                "mandiMin": [
                        1365,
                        1560,
                        1105,
                        975,
                        1040,
                        1170,
                        1300
                ],
                "mandiMax": [
                        1943,
                        2220,
                        1573,
                        1388,
                        1480,
                        1665,
                        1850
                ]
        }
}
    },
    brinjal: {
      key: "brinjal",
      name: "Purple Brinjal (Baingan / Eggplant)",
      emoji: "🍆",
      hub: "Rahuri APMC (Ahmednagar)",
      currentModalQt: 2200,
      currentMinQt: 1800,
      currentMaxQt: 2600,
      farmGateQt: 2150,
      terminalVashiQt: 2650,
      arbitragePct: 18.9,
      trendPct: "+3.1%",
      trendDir: "up",
      arrivalsQt: 3200,
      arrivalsChange: "+9.0% Harvest",
      sentiment: "Steady Retail Off-take",
      sentimentScore: 77,
      recommendation: "Freshly harvested shiny purple long brinjals in Ahmednagar and Pune belts. High demand for urban retail supply chains.",
      districtHubs: [
        {
                "district": "Ahmednagar",
                "mandi": "Rahuri APMC Market",
                "modalQt": 2200,
                "minQt": 1800,
                "maxQt": 2600,
                "arrivalsQt": 3200,
                "factor": 1
        },
        {
                "district": "Pune",
                "mandi": "Khed APMC Yard",
                "modalQt": 2230,
                "minQt": 1830,
                "maxQt": 2630,
                "arrivalsQt": 2700,
                "factor": 1.013
        },
        {
                "district": "Solapur",
                "mandi": "Mohol APMC",
                "modalQt": 2180,
                "minQt": 1780,
                "maxQt": 2580,
                "arrivalsQt": 1900,
                "factor": 0.991
        },
        {
                "district": "Nashik",
                "mandi": "Pimpalgaon APMC",
                "modalQt": 2210,
                "minQt": 1810,
                "maxQt": 2610,
                "arrivalsQt": 2400,
                "factor": 1.004
        },
        {
                "district": "Jalgaon",
                "mandi": "Jalgaon Purple Brinjal APMC",
                "modalQt": 2160,
                "minQt": 1768,
                "maxQt": 2553,
                "arrivalsQt": 4200,
                "factor": 0.982
        },
        {
                "district": "Latur",
                "mandi": "Latur Purple Brinjal APMC",
                "modalQt": 2189,
                "minQt": 1791,
                "maxQt": 2587,
                "arrivalsQt": 6400,
                "factor": 0.995
        },
        {
                "district": "Nagpur",
                "mandi": "Nagpur Purple Brinjal APMC",
                "modalQt": 2240,
                "minQt": 1832,
                "maxQt": 2647,
                "arrivalsQt": 4900,
                "factor": 1.018
        },
        {
                "district": "Sangli",
                "mandi": "Sangli Purple Brinjal APMC",
                "modalQt": 2182,
                "minQt": 1786,
                "maxQt": 2579,
                "arrivalsQt": 3600,
                "factor": 0.992
        },
        {
                "district": "Amravati",
                "mandi": "Amravati Purple Brinjal APMC",
                "modalQt": 2187,
                "minQt": 1789,
                "maxQt": 2584,
                "arrivalsQt": 3800,
                "factor": 0.994
        },
        {
                "district": "Akola",
                "mandi": "Akola Purple Brinjal APMC",
                "modalQt": 2180,
                "minQt": 1784,
                "maxQt": 2577,
                "arrivalsQt": 4100,
                "factor": 0.991
        },
        {
                "district": "Nanded",
                "mandi": "Nanded Purple Brinjal APMC",
                "modalQt": 2193,
                "minQt": 1795,
                "maxQt": 2592,
                "arrivalsQt": 3200,
                "factor": 0.997
        },
        {
                "district": "Satara",
                "mandi": "Satara Purple Brinjal APMC",
                "modalQt": 2226,
                "minQt": 1822,
                "maxQt": 2631,
                "arrivalsQt": 2800,
                "factor": 1.012
        },
        {
                "district": "Kolhapur",
                "mandi": "Kolhapur Purple Brinjal APMC",
                "modalQt": 2248,
                "minQt": 1840,
                "maxQt": 2657,
                "arrivalsQt": 3300,
                "factor": 1.022
        },
        {
                "district": "Dhule",
                "mandi": "Dhule Purple Brinjal APMC",
                "modalQt": 2158,
                "minQt": 1766,
                "maxQt": 2551,
                "arrivalsQt": 3500,
                "factor": 0.981
        },
        {
                "district": "Nandurbar",
                "mandi": "Nandurbar Purple Brinjal APMC",
                "modalQt": 2152,
                "minQt": 1760,
                "maxQt": 2543,
                "arrivalsQt": 2900,
                "factor": 0.978
        },
        {
                "district": "Beed",
                "mandi": "Beed Purple Brinjal APMC",
                "modalQt": 2169,
                "minQt": 1775,
                "maxQt": 2564,
                "arrivalsQt": 2400,
                "factor": 0.986
        },
        {
                "district": "Washim",
                "mandi": "Washim Purple Brinjal APMC",
                "modalQt": 2185,
                "minQt": 1787,
                "maxQt": 2582,
                "arrivalsQt": 2300,
                "factor": 0.993
        },
        {
                "district": "Palghar",
                "mandi": "Palghar Purple Brinjal APMC",
                "modalQt": 2233,
                "minQt": 1827,
                "maxQt": 2639,
                "arrivalsQt": 2100,
                "factor": 1.015
        },
        {
                "district": "Dharashiv",
                "mandi": "Dharashiv Purple Brinjal APMC",
                "modalQt": 2176,
                "minQt": 1780,
                "maxQt": 2571,
                "arrivalsQt": 2200,
                "factor": 0.989
        },
        {
                "district": "Chhatrapati Sambhajinagar",
                "mandi": "Chhatrapati Sambhajinagar Purple Brinjal APMC",
                "modalQt": 2213,
                "minQt": 1811,
                "maxQt": 2616,
                "arrivalsQt": 3400,
                "factor": 1.006
        },
        {
                "district": "Hingoli",
                "mandi": "Hingoli Purple Brinjal APMC",
                "modalQt": 2178,
                "minQt": 1782,
                "maxQt": 2574,
                "arrivalsQt": 1900,
                "factor": 0.99
        },
        {
                "district": "Wardha",
                "mandi": "Wardha Purple Brinjal APMC",
                "modalQt": 2191,
                "minQt": 1793,
                "maxQt": 2590,
                "arrivalsQt": 2400,
                "factor": 0.996
        },
        {
                "district": "Ratnagiri",
                "mandi": "Ratnagiri Purple Brinjal APMC",
                "modalQt": 2299,
                "minQt": 1881,
                "maxQt": 2717,
                "arrivalsQt": 1800,
                "factor": 1.045
        },
        {
                "district": "Sindhudurg",
                "mandi": "Sindhudurg Purple Brinjal APMC",
                "modalQt": 2306,
                "minQt": 1886,
                "maxQt": 2725,
                "arrivalsQt": 1600,
                "factor": 1.048
        },
        {
                "district": "Raigad",
                "mandi": "Raigad Purple Brinjal APMC",
                "modalQt": 2277,
                "minQt": 1863,
                "maxQt": 2691,
                "arrivalsQt": 2700,
                "factor": 1.035
        },
        {
                "district": "Yavatmal",
                "mandi": "Yavatmal Purple Brinjal APMC",
                "modalQt": 2171,
                "minQt": 1777,
                "maxQt": 2566,
                "arrivalsQt": 3300,
                "factor": 0.987
        },
        {
                "district": "Buldhana",
                "mandi": "Buldhana Purple Brinjal APMC",
                "modalQt": 2185,
                "minQt": 1787,
                "maxQt": 2582,
                "arrivalsQt": 3100,
                "factor": 0.993
        },
        {
                "district": "Bhandara",
                "mandi": "Bhandara Purple Brinjal APMC",
                "modalQt": 2165,
                "minQt": 1771,
                "maxQt": 2558,
                "arrivalsQt": 2600,
                "factor": 0.984
        },
        {
                "district": "Jalna",
                "mandi": "Jalna Purple Brinjal APMC",
                "modalQt": 2191,
                "minQt": 1793,
                "maxQt": 2590,
                "arrivalsQt": 3200,
                "factor": 0.996
        },
        {
                "district": "Parbhani",
                "mandi": "Parbhani Purple Brinjal APMC",
                "modalQt": 2180,
                "minQt": 1784,
                "maxQt": 2577,
                "arrivalsQt": 2500,
                "factor": 0.991
        }
],
      history: {
        "7D": {
                "labels": [
                        "08 Sep",
                        "09 Sep",
                        "10 Sep",
                        "11 Sep",
                        "12 Sep",
                        "13 Sep",
                        "14 Sep (Today)",
                        "16 Sep (AI)",
                        "18 Sep (AI)",
                        "20 Sep (AI)"
                ],
                "historical": [
                        2046,
                        2090,
                        2112,
                        2156,
                        2178,
                        2189,
                        2200,
                        null,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        2200,
                        2244,
                        2310,
                        2354
                ],
                "mandiMin": [
                        1710,
                        1728,
                        1746,
                        1764,
                        1782,
                        1800,
                        1800,
                        null,
                        null,
                        null
                ],
                "mandiMax": [
                        2418,
                        2470,
                        2522,
                        2548,
                        2574,
                        2600,
                        2600,
                        null,
                        null,
                        null
                ]
        },
        "1M": {
                "labels": [
                        "15 Aug",
                        "22 Aug",
                        "29 Aug",
                        "05 Sep",
                        "12 Sep",
                        "14 Sep (Today)",
                        "21 Sep (AI)",
                        "28 Sep (AI)"
                ],
                "historical": [
                        1870,
                        1936,
                        2002,
                        2090,
                        2156,
                        2200,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        2200,
                        2288,
                        2376
                ],
                "mandiMin": [
                        1530,
                        1584,
                        1656,
                        1728,
                        1800,
                        1800,
                        null,
                        null
                ],
                "mandiMax": [
                        2210,
                        2288,
                        2392,
                        2496,
                        2600,
                        2600,
                        null,
                        null
                ]
        },
        "3M": {
                "labels": [
                        "Jun 26",
                        "Jul 26",
                        "Aug 26",
                        "Sep 26 (Now)",
                        "Oct 26 (AI)",
                        "Nov 26 (AI)"
                ],
                "historical": [
                        1760,
                        1892,
                        2024,
                        2200,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        2200,
                        2332,
                        2464
                ],
                "mandiMin": [
                        1440,
                        1548,
                        1656,
                        1800,
                        null,
                        null
                ],
                "mandiMax": [
                        2080,
                        2236,
                        2392,
                        2600,
                        null,
                        null
                ]
        },
        "1Y": {
                "labels": [
                        "Oct 25",
                        "Dec 25",
                        "Feb 26",
                        "Apr 26",
                        "Jun 26",
                        "Aug 26",
                        "Sep 26 (Now)"
                ],
                "historical": [
                        2310,
                        2640,
                        1870,
                        1650,
                        1760,
                        1980,
                        2200
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        2200
                ],
                "mandiMin": [
                        1890,
                        2160,
                        1530,
                        1350,
                        1440,
                        1620,
                        1800
                ],
                "mandiMax": [
                        2730,
                        3120,
                        2210,
                        1950,
                        2080,
                        2340,
                        2600
                ]
        }
}
    },
    green_chilli: {
      key: "green_chilli",
      name: "Fresh Green Chilli (G4 High-Pungency)",
      emoji: "🌶️",
      hub: "Nandurbar APMC",
      currentModalQt: 4200,
      currentMinQt: 3600,
      currentMaxQt: 4800,
      farmGateQt: 4100,
      terminalVashiQt: 4900,
      arbitragePct: 16.3,
      trendPct: "+5.0%",
      trendDir: "up",
      arrivalsQt: 2900,
      arrivalsChange: "+11.5% Peak",
      sentiment: "Strong FMCG & Pickle Demand",
      sentimentScore: 85,
      recommendation: "G4 variety fresh green chillies with deep green skin and high capsaicin content harvested in Nandurbar and Solapur.",
      districtHubs: [
        {
                "district": "Nandurbar",
                "mandi": "Nandurbar APMC Yard",
                "modalQt": 4200,
                "minQt": 3600,
                "maxQt": 4800,
                "arrivalsQt": 2900,
                "factor": 1
        },
        {
                "district": "Nagpur",
                "mandi": "Kalamna APMC",
                "modalQt": 4180,
                "minQt": 3580,
                "maxQt": 4780,
                "arrivalsQt": 2300,
                "factor": 0.995
        },
        {
                "district": "Solapur",
                "mandi": "Solapur Spices Yard",
                "modalQt": 4240,
                "minQt": 3640,
                "maxQt": 4840,
                "arrivalsQt": 1800,
                "factor": 1.009
        },
        {
                "district": "Pune",
                "mandi": "Manchar Green Yard",
                "modalQt": 4220,
                "minQt": 3620,
                "maxQt": 4820,
                "arrivalsQt": 1500,
                "factor": 1.004
        },
        {
                "district": "Nashik",
                "mandi": "Nashik Fresh Green Chilli APMC",
                "modalQt": 4200,
                "minQt": 3600,
                "maxQt": 4800,
                "arrivalsQt": 6850,
                "factor": 1
        },
        {
                "district": "Jalgaon",
                "mandi": "Jalgaon Fresh Green Chilli APMC",
                "modalQt": 4124,
                "minQt": 3535,
                "maxQt": 4714,
                "arrivalsQt": 4200,
                "factor": 0.982
        },
        {
                "district": "Latur",
                "mandi": "Latur Fresh Green Chilli APMC",
                "modalQt": 4179,
                "minQt": 3582,
                "maxQt": 4776,
                "arrivalsQt": 6400,
                "factor": 0.995
        },
        {
                "district": "Sangli",
                "mandi": "Sangli Fresh Green Chilli APMC",
                "modalQt": 4166,
                "minQt": 3571,
                "maxQt": 4762,
                "arrivalsQt": 3600,
                "factor": 0.992
        },
        {
                "district": "Ahmednagar",
                "mandi": "Ahmednagar Fresh Green Chilli APMC",
                "modalQt": 4145,
                "minQt": 3553,
                "maxQt": 4738,
                "arrivalsQt": 5100,
                "factor": 0.987
        },
        {
                "district": "Amravati",
                "mandi": "Amravati Fresh Green Chilli APMC",
                "modalQt": 4175,
                "minQt": 3578,
                "maxQt": 4771,
                "arrivalsQt": 3800,
                "factor": 0.994
        },
        {
                "district": "Akola",
                "mandi": "Akola Fresh Green Chilli APMC",
                "modalQt": 4162,
                "minQt": 3568,
                "maxQt": 4757,
                "arrivalsQt": 4100,
                "factor": 0.991
        },
        {
                "district": "Nanded",
                "mandi": "Nanded Fresh Green Chilli APMC",
                "modalQt": 4187,
                "minQt": 3589,
                "maxQt": 4786,
                "arrivalsQt": 3200,
                "factor": 0.997
        },
        {
                "district": "Satara",
                "mandi": "Satara Fresh Green Chilli APMC",
                "modalQt": 4250,
                "minQt": 3643,
                "maxQt": 4858,
                "arrivalsQt": 2800,
                "factor": 1.012
        },
        {
                "district": "Kolhapur",
                "mandi": "Kolhapur Fresh Green Chilli APMC",
                "modalQt": 4292,
                "minQt": 3679,
                "maxQt": 4906,
                "arrivalsQt": 3300,
                "factor": 1.022
        },
        {
                "district": "Dhule",
                "mandi": "Dhule Fresh Green Chilli APMC",
                "modalQt": 4120,
                "minQt": 3532,
                "maxQt": 4709,
                "arrivalsQt": 3500,
                "factor": 0.981
        },
        {
                "district": "Beed",
                "mandi": "Beed Fresh Green Chilli APMC",
                "modalQt": 4141,
                "minQt": 3550,
                "maxQt": 4733,
                "arrivalsQt": 2400,
                "factor": 0.986
        },
        {
                "district": "Washim",
                "mandi": "Washim Fresh Green Chilli APMC",
                "modalQt": 4171,
                "minQt": 3575,
                "maxQt": 4766,
                "arrivalsQt": 2300,
                "factor": 0.993
        },
        {
                "district": "Palghar",
                "mandi": "Palghar Fresh Green Chilli APMC",
                "modalQt": 4263,
                "minQt": 3654,
                "maxQt": 4872,
                "arrivalsQt": 2100,
                "factor": 1.015
        },
        {
                "district": "Dharashiv",
                "mandi": "Dharashiv Fresh Green Chilli APMC",
                "modalQt": 4154,
                "minQt": 3560,
                "maxQt": 4747,
                "arrivalsQt": 2200,
                "factor": 0.989
        },
        {
                "district": "Chhatrapati Sambhajinagar",
                "mandi": "Chhatrapati Sambhajinagar Fresh Green Chilli APMC",
                "modalQt": 4225,
                "minQt": 3622,
                "maxQt": 4829,
                "arrivalsQt": 3400,
                "factor": 1.006
        },
        {
                "district": "Hingoli",
                "mandi": "Hingoli Fresh Green Chilli APMC",
                "modalQt": 4158,
                "minQt": 3564,
                "maxQt": 4752,
                "arrivalsQt": 1900,
                "factor": 0.99
        },
        {
                "district": "Wardha",
                "mandi": "Wardha Fresh Green Chilli APMC",
                "modalQt": 4183,
                "minQt": 3586,
                "maxQt": 4781,
                "arrivalsQt": 2400,
                "factor": 0.996
        },
        {
                "district": "Ratnagiri",
                "mandi": "Ratnagiri Fresh Green Chilli APMC",
                "modalQt": 4389,
                "minQt": 3762,
                "maxQt": 5016,
                "arrivalsQt": 1800,
                "factor": 1.045
        },
        {
                "district": "Sindhudurg",
                "mandi": "Sindhudurg Fresh Green Chilli APMC",
                "modalQt": 4402,
                "minQt": 3773,
                "maxQt": 5030,
                "arrivalsQt": 1600,
                "factor": 1.048
        },
        {
                "district": "Raigad",
                "mandi": "Raigad Fresh Green Chilli APMC",
                "modalQt": 4347,
                "minQt": 3726,
                "maxQt": 4968,
                "arrivalsQt": 2700,
                "factor": 1.035
        },
        {
                "district": "Yavatmal",
                "mandi": "Yavatmal Fresh Green Chilli APMC",
                "modalQt": 4145,
                "minQt": 3553,
                "maxQt": 4738,
                "arrivalsQt": 3300,
                "factor": 0.987
        },
        {
                "district": "Buldhana",
                "mandi": "Buldhana Fresh Green Chilli APMC",
                "modalQt": 4171,
                "minQt": 3575,
                "maxQt": 4766,
                "arrivalsQt": 3100,
                "factor": 0.993
        },
        {
                "district": "Bhandara",
                "mandi": "Bhandara Fresh Green Chilli APMC",
                "modalQt": 4133,
                "minQt": 3542,
                "maxQt": 4723,
                "arrivalsQt": 2600,
                "factor": 0.984
        },
        {
                "district": "Jalna",
                "mandi": "Jalna Fresh Green Chilli APMC",
                "modalQt": 4183,
                "minQt": 3586,
                "maxQt": 4781,
                "arrivalsQt": 3200,
                "factor": 0.996
        },
        {
                "district": "Parbhani",
                "mandi": "Parbhani Fresh Green Chilli APMC",
                "modalQt": 4162,
                "minQt": 3568,
                "maxQt": 4757,
                "arrivalsQt": 2500,
                "factor": 0.991
        }
],
      history: {
        "7D": {
                "labels": [
                        "08 Sep",
                        "09 Sep",
                        "10 Sep",
                        "11 Sep",
                        "12 Sep",
                        "13 Sep",
                        "14 Sep (Today)",
                        "16 Sep (AI)",
                        "18 Sep (AI)",
                        "20 Sep (AI)"
                ],
                "historical": [
                        3906,
                        3990,
                        4032,
                        4116,
                        4158,
                        4179,
                        4200,
                        null,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        4200,
                        4284,
                        4410,
                        4494
                ],
                "mandiMin": [
                        3420,
                        3456,
                        3492,
                        3528,
                        3564,
                        3600,
                        3600,
                        null,
                        null,
                        null
                ],
                "mandiMax": [
                        4464,
                        4560,
                        4656,
                        4704,
                        4752,
                        4800,
                        4800,
                        null,
                        null,
                        null
                ]
        },
        "1M": {
                "labels": [
                        "15 Aug",
                        "22 Aug",
                        "29 Aug",
                        "05 Sep",
                        "12 Sep",
                        "14 Sep (Today)",
                        "21 Sep (AI)",
                        "28 Sep (AI)"
                ],
                "historical": [
                        3570,
                        3696,
                        3822,
                        3990,
                        4116,
                        4200,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        4200,
                        4368,
                        4536
                ],
                "mandiMin": [
                        3060,
                        3168,
                        3312,
                        3456,
                        3600,
                        3600,
                        null,
                        null
                ],
                "mandiMax": [
                        4080,
                        4224,
                        4416,
                        4608,
                        4800,
                        4800,
                        null,
                        null
                ]
        },
        "3M": {
                "labels": [
                        "Jun 26",
                        "Jul 26",
                        "Aug 26",
                        "Sep 26 (Now)",
                        "Oct 26 (AI)",
                        "Nov 26 (AI)"
                ],
                "historical": [
                        3360,
                        3612,
                        3864,
                        4200,
                        null,
                        null
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        4200,
                        4452,
                        4704
                ],
                "mandiMin": [
                        2880,
                        3096,
                        3312,
                        3600,
                        null,
                        null
                ],
                "mandiMax": [
                        3840,
                        4128,
                        4416,
                        4800,
                        null,
                        null
                ]
        },
        "1Y": {
                "labels": [
                        "Oct 25",
                        "Dec 25",
                        "Feb 26",
                        "Apr 26",
                        "Jun 26",
                        "Aug 26",
                        "Sep 26 (Now)"
                ],
                "historical": [
                        4410,
                        5040,
                        3570,
                        3150,
                        3360,
                        3780,
                        4200
                ],
                "forecast": [
                        null,
                        null,
                        null,
                        null,
                        null,
                        null,
                        4200
                ],
                "mandiMin": [
                        3780,
                        4320,
                        3060,
                        2700,
                        2880,
                        3240,
                        3600
                ],
                "mandiMax": [
                        5040,
                        5760,
                        4080,
                        3600,
                        3840,
                        4320,
                        4800
                ]
        }
}
    }
  };

  // Category Lookup Mapping
  const CROP_CATEGORIES = {
    onion: "vegetables",
    tomato: "vegetables",
    banana: "fruits",
    soybean: "spices",
    orange: "fruits",
    turmeric: "spices",
    pomegranate: "fruits",
    cotton: "spices",
    maize: "grains",
    safflower: "spices",
    sesame: "spices",
    chilli: "spices",
    guava: "fruits",
    wheat: "grains",
    rice: "grains",
    jowar: "grains",
    bajra: "grains",
    tur: "pulses",
    chana: "pulses",
    mung: "pulses",
    urad: "pulses",
    groundnut: "spices",
    sunflower: "spices",
    sugarcane: "spices",
    grapes: "fruits",
    mosambi: "fruits",
    sitaphal: "fruits",
    mango: "fruits",
    potato: "vegetables",
    brinjal: "vegetables",
    green_chilli: "vegetables"
  };

  // Comprehensive Multi-District APMC Mandis Real-Time Benchmark Table Data
  const MAHARASHTRA_MANDIS_TABLE = [];
  Object.values(COMMODITY_INSIGHTS).forEach(c => {
    const hubs = (c.districtHubs && c.districtHubs.length > 0) ? c.districtHubs : [{
      district: c.hub.includes('(') ? c.hub.split('(')[1].replace(')', '').trim() : 'Nashik',
      mandi: c.hub.split('(')[0].trim(),
      modalQt: c.currentModalQt,
      minQt: c.currentMinQt,
      maxQt: c.currentMaxQt,
      arrivalsQt: c.arrivalsQt
    }];

    hubs.forEach(h => {
      MAHARASHTRA_MANDIS_TABLE.push({
        crop: c.name.split('(')[0].trim(),
        cropKey: c.key,
        emoji: c.emoji,
        mandi: h.mandi,
        district: h.district,
        arrivalsQt: h.arrivalsQt,
        arrivalsKg: h.arrivalsQt * 100,
        minPriceQt: h.minQt,
        modalPriceQt: h.modalQt,
        maxPriceQt: h.maxQt,
        farmGateQt: c.farmGateQt,
        savingsQt: c.terminalVashiQt - c.farmGateQt,
        savingsPct: c.arbitragePct,
        trend: c.trendDir,
        trendText: c.trendPct
      });
    });
  });

  // State
  let activeCommodity = 'onion';
  let activeTimeframe = '7D';
  let activePriceUnit = 'kg'; // default 'kg'
  let activeCategory = 'all';
  let priceChartInstance = null;
  let tableSearchQuery = '';
  let tableDistrictFilter = 'all';
  let tableVisibleCount = 5;
  let districtMatrixSearchQuery = '';

  // Initialize View
  function initBuyerMarketInsights() {
    renderProduceSelectorChips();
    renderInsightChart();
    renderInsightSummaryCards();
    renderSupplyInflowHeatmap();
    renderAiProcurementAdvisories();
    renderMaharashtraMandisTable();
    updateLiveTimestamp();
  }

  // Category Filtering Handler
  function selectInsightCategory(catKey) {
    activeCategory = catKey;
    document.querySelectorAll('.insight-cat-tab').forEach(tab => {
      const c = tab.getAttribute('data-cat');
      if (c === catKey) {
        tab.classList.add('active');
        tab.style.background = '#0c5a36';
        tab.style.color = '#ffffff';
        tab.style.borderColor = '#0c5a36';
      } else {
        tab.classList.remove('active');
        tab.style.background = '#f8fafc';
        tab.style.color = '#475569';
        tab.style.borderColor = '#cbd5e1';
      }
    });

    let list = Object.values(COMMODITY_INSIGHTS);
    if (activeCategory !== 'all') {
      list = list.filter(c => (CROP_CATEGORIES[c.key] || 'vegetables') === activeCategory);
    }

    if (list.length > 0 && !list.some(c => c.key === activeCommodity)) {
      selectInsightCommodity(list[0].key);
    } else {
      renderProduceSelectorChips();
    }
  }

  // Render Commodity Selector Chips
  function renderProduceSelectorChips() {
    const container = document.getElementById('insight-produce-chips');
    if (!container) return;

    let list = Object.values(COMMODITY_INSIGHTS);
    if (activeCategory !== 'all') {
      list = list.filter(c => (CROP_CATEGORIES[c.key] || 'vegetables') === activeCategory);
    }

    container.innerHTML = list.map(c => {
      const cleanCropName = c.name.replace(/\(.*?\)/g, '').trim();
      const cleanHubName = c.hub.replace(/\(.*?\)/g, '').trim();
      const translatedCrop = window.tCrop ? window.tCrop(cleanCropName) : cleanCropName;
      const translatedHub = window.tLocation ? window.tLocation(cleanHubName) : cleanHubName;

      return `
        <div class="produce-chip ${c.key === activeCommodity ? 'active' : ''}" onclick="selectInsightCommodity('${c.key}')">
          <span style="font-size: 1.4rem; line-height: 1;">${c.emoji}</span>
          <div>
            <strong style="font-size: 0.85rem; color: #0f172a; display: block; white-space: nowrap;">${translatedCrop}</strong>
            <span style="font-size: 0.72rem; color: #64748b;">${translatedHub}</span>
          </div>
          <span class="badge ${c.trendDir === 'up' ? 'badge-grade-green' : 'badge-grade-blue'}" style="font-size: 0.7rem; font-weight: 800; margin-left: 4px;">
            ${c.trendPct}
          </span>
        </div>
      `;
    }).join('');
  }

  function selectInsightCommodity(key) {
    if (!COMMODITY_INSIGHTS[key]) return;
    activeCommodity = key;
    renderProduceSelectorChips();
    renderInsightChart();
    renderInsightSummaryCards();
    renderAiProcurementAdvisories();
  }

  function setInsightTimeframe(tf) {
    activeTimeframe = tf;
    document.querySelectorAll('.insight-tf-btn').forEach(btn => {
      if (btn.getAttribute('data-tf') === tf) {
        btn.classList.add('active');
        btn.style.background = '#0c5a36';
        btn.style.color = '#ffffff';
      } else {
        btn.classList.remove('active');
        btn.style.background = 'transparent';
        btn.style.color = '#475569';
      }
    });
    renderInsightChart();
  }

  function setInsightPriceUnit(unit) {
    activePriceUnit = unit;
    const btnQt = document.getElementById('insight-unit-qt');
    const btnKg = document.getElementById('insight-unit-kg');

    if (unit === 'qt') {
      if (btnQt) { btnQt.classList.add('active'); btnQt.style.background = '#0c5a36'; btnQt.style.color = '#fff'; }
      if (btnKg) { btnKg.classList.remove('active'); btnKg.style.background = 'transparent'; btnKg.style.color = '#475569'; }
    } else {
      if (btnKg) { btnKg.classList.add('active'); btnKg.style.background = '#0c5a36'; btnKg.style.color = '#fff'; }
      if (btnQt) { btnQt.classList.remove('active'); btnQt.style.background = 'transparent'; btnQt.style.color = '#475569'; }
    }

    renderInsightChart();
    renderInsightSummaryCards();
    renderMaharashtraMandisTable();
  }

  // Render High-DPI Chart.js Interactive Graph
  function renderInsightChart() {
    const canvas = document.getElementById('buyer-insight-chart');
    if (!canvas) return;

    if (typeof Chart === 'undefined') {
      console.warn('Chart.js not loaded yet. Waiting...');
      setTimeout(renderInsightChart, 200);
      return;
    }

    const commodity = COMMODITY_INSIGHTS[activeCommodity];
    if (!commodity || !commodity.history || !commodity.history[activeTimeframe]) return;

    const dataObj = commodity.history[activeTimeframe];
    const multiplier = activePriceUnit === 'kg' ? 0.01 : 1;
    const unitLabel = activePriceUnit === 'kg' ? '₹ /kg' : '₹ /Qt';

    const histData = dataObj.historical.map(v => v !== null ? (v * multiplier) : null);
    const foreData = dataObj.forecast.map(v => v !== null ? (v * multiplier) : null);
    const minData = (dataObj.mandiMin || []).map(v => v !== null ? (v * multiplier) : null);
    const maxData = (dataObj.mandiMax || []).map(v => v !== null ? (v * multiplier) : null);

    if (priceChartInstance) {
      priceChartInstance.destroy();
    }

    if (!canvas || typeof canvas.getContext !== 'function') return;

    const ctx = canvas.getContext('2d');
    const gradientFill = ctx.createLinearGradient(0, 0, 0, 300);
    gradientFill.addColorStop(0, 'rgba(12, 90, 54, 0.22)');
    gradientFill.addColorStop(1, 'rgba(12, 90, 54, 0.00)');

    const lblModal = window.t ? window.t('insights_legend_modal', 'Mandi Modal Price') : 'Mandi Modal Price';
    const lblForecast = window.t ? window.t('insights_legend_forecast', 'AI Forward Forecast') : 'AI Forward Forecast';
    const lblCeiling = window.t ? window.t('insights_legend_ceiling', 'Mandi Ceiling') : 'Mandi Ceiling';
    const lblFloor = window.t ? window.t('insights_legend_floor', 'Mandi Floor') : 'Mandi Floor';

    priceChartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: dataObj.labels,
        datasets: [
          {
            label: `${lblModal} (${unitLabel})`,
            data: histData,
            borderColor: '#0c5a36',
            backgroundColor: gradientFill,
            borderWidth: 3,
            fill: true,
            tension: 0.35,
            pointRadius: 4,
            pointBackgroundColor: '#0c5a36',
            pointHoverRadius: 6
          },
          {
            label: `${lblForecast} (${unitLabel})`,
            data: foreData,
            borderColor: '#2563eb',
            backgroundColor: 'transparent',
            borderWidth: 2.5,
            borderDash: [6, 6],
            fill: false,
            tension: 0.35,
            pointRadius: 4,
            pointBackgroundColor: '#2563eb',
            pointHoverRadius: 6
          },
          {
            label: `${lblCeiling} (${unitLabel})`,
            data: maxData,
            borderColor: 'rgba(239, 68, 68, 0.4)',
            borderWidth: 1.5,
            borderDash: [3, 3],
            fill: false,
            tension: 0.3,
            pointRadius: 0
          },
          {
            label: `${lblFloor} (${unitLabel})`,
            data: minData,
            borderColor: 'rgba(16, 185, 129, 0.4)',
            borderWidth: 1.5,
            borderDash: [3, 3],
            fill: false,
            tension: 0.3,
            pointRadius: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              usePointStyle: true,
              boxWidth: 8,
              font: {
                family: "'Plus Jakarta Sans', sans-serif",
                size: 12,
                weight: '600'
              },
              color: '#334155'
            }
          },
          tooltip: {
            backgroundColor: '#0f172a',
            titleFont: { family: "'Plus Jakarta Sans'", size: 13, weight: '700' },
            bodyFont: { family: "'Plus Jakarta Sans'", size: 12 },
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              label: function (ctx) {
                if (ctx.raw === null || ctx.raw === undefined) return null;
                const formatted = activePriceUnit === 'kg' ? `₹ ${parseFloat(ctx.raw).toFixed(2)} /kg` : `₹ ${Math.round(ctx.raw).toLocaleString('en-IN')} /Qt`;
                return `${ctx.dataset.label.split('(')[0]}: ${formatted}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { color: '#f1f5f9' },
            ticks: {
              font: { family: "'Plus Jakarta Sans'", size: 11, weight: '600' },
              color: '#64748b'
            }
          },
          y: {
            grid: { color: '#f1f5f9' },
            ticks: {
              font: { family: "'Plus Jakarta Sans'", size: 11, weight: '600' },
              color: '#64748b',
              callback: function (val) {
                return activePriceUnit === 'kg' ? `₹${val.toFixed(1)}` : `₹${val}`;
              }
            }
          }
        }
      }
    });

    // Update Chart Top Header Info
    const titleEl = document.getElementById('insight-chart-title');
    const subEl = document.getElementById('insight-chart-sub');
    const transCrop = window.tCrop ? window.tCrop(commodity.name) : commodity.name;
    const transHub = window.tLocation ? window.tLocation(commodity.hub) : commodity.hub;
    const transTrends = window.tText ? window.tText('Mandi Rate Trends & AI Projection') : 'Mandi Rate Trends & AI Projection';
    const transPrimaryHub = window.t ? (window.getBuyerLanguage && window.getBuyerLanguage() === 'mr' ? 'मुख्य केंद्र' : window.getBuyerLanguage && window.getBuyerLanguage() === 'hi' ? 'प्रमुख मंडी' : 'Primary Hub') : 'Primary Hub';
    const transModal = window.t ? (window.getBuyerLanguage && window.getBuyerLanguage() === 'mr' ? '२४ तास सरासरी' : window.getBuyerLanguage && window.getBuyerLanguage() === 'hi' ? '24 घंटे मॉडल' : '24h Modal') : '24h Modal';

    if (titleEl) titleEl.textContent = `${commodity.emoji} ${transCrop} • ${transTrends}`;
    if (subEl) subEl.textContent = `${transPrimaryHub}: ${transHub} • ${transModal}: ${formatInsightPrice(commodity.currentModalQt)}`;
  }

  // Render Top KPI & Summary Cards
  function renderInsightSummaryCards() {
    const commodity = COMMODITY_INSIGHTS[activeCommodity];
    if (!commodity) return;

    const modalEl = document.getElementById('kpi-insight-modal');
    const spreadEl = document.getElementById('kpi-insight-spread');
    const arrivalsEl = document.getElementById('kpi-insight-arrivals');
    const sentimentEl = document.getElementById('kpi-insight-sentiment');
    const spreadSub = document.getElementById('kpi-spread-subtext');
    const arrivalsSub = document.getElementById('kpi-arrivals-subtext');
    const sentimentSub = document.getElementById('kpi-sentiment-subtext');

    const savingsVal = ((commodity.terminalVashiQt - commodity.farmGateQt) / 100).toFixed(2);
    const transVsLastWeek = window.t ? window.t('vs_last_week', 'vs last week') : 'vs last week';
    const transSentiment = window.tText ? window.tText(commodity.sentiment) : commodity.sentiment;

    let transSpreadSub = `Save ₹ ${savingsVal}/kg vs Vashi Middlemen`;
    let transArrivalsSub = `${commodity.arrivalsChange}`;
    let transSentimentSub = `Index: ${commodity.sentimentScore}/100 • Export Peak`;

    if (window.getBuyerLanguage && window.getBuyerLanguage() === 'mr') {
      transSpreadSub = `वाशी दलालांच्या तुलनेत ₹ ${savingsVal}/किलो बचत`;
      transArrivalsSub = `${commodity.arrivalsChange.replace('vs last week', 'मागील आठवड्यापेक्षा')}`;
      transSentimentSub = `निर्देशांक: ${commodity.sentimentScore}/१०० • निर्यात उच्चांक`;
    } else if (window.getBuyerLanguage && window.getBuyerLanguage() === 'hi') {
      transSpreadSub = `वाशी बिचौलियों की तुलना में ₹ ${savingsVal}/किग्रा बचत`;
      transArrivalsSub = `${commodity.arrivalsChange.replace('vs last week', 'पिछले सप्ताह की तुलना में')}`;
      transSentimentSub = `इंडेक्स: ${commodity.sentimentScore}/100 • निर्यात पीक`;
    }

    if (modalEl) modalEl.innerHTML = `${formatInsightPrice(commodity.currentModalQt)}`;
    const trendSpan = document.getElementById('kpi-modal-trend-pct');
    if (trendSpan) {
      trendSpan.textContent = `▲ ${commodity.trendPct}`;
      trendSpan.style.color = commodity.trendDir === 'up' ? '#166534' : '#991b1b';
    }

    if (spreadEl) spreadEl.textContent = `+${commodity.arbitragePct}%`;
    if (spreadSub) spreadSub.textContent = transSpreadSub;

    if (arrivalsEl) arrivalsEl.textContent = `${commodity.arrivalsQt.toLocaleString('en-IN')} Qt`;
    if (arrivalsSub) arrivalsSub.textContent = transArrivalsSub;

    if (sentimentEl) sentimentEl.textContent = transSentiment;
    if (sentimentSub) sentimentSub.textContent = transSentimentSub;
  }

  // Render Left Column: Supply Inflow & Belts Heatmap
  function renderSupplyInflowHeatmap() {
    const container = document.getElementById('insight-producing-belts') || document.getElementById('supply-inflow-container');
    if (!container) return;

    const belts = [
      { name: 'Nashik Onion & Grape Belt', mandi: 'Lasalgaon & Pimpalgaon', crop: 'Red Onion, Grapes', volume: '8,950 Qt', pct: 88, status: 'Surge Arrival', color: '#166534' },
      { name: 'Pune Junnar Tomato Corridor', mandi: 'Narayangaon & Manchar', crop: 'Hybrid Tomato, Cabbage', volume: '6,200 Qt', pct: 78, status: 'Heavy Supply', color: '#0c5a36' },
      { name: 'Khandesh Banana Belt', mandi: 'Raver & Jalgaon APMC', crop: 'Grand Naine Banana', volume: '4,600 Qt', pct: 70, status: 'Steady Inflow', color: '#0284c7' },
      { name: 'Marathwada Oilseed Cluster', mandi: 'Latur Mega Silos', crop: 'Soybean, Pulses, Jowar', volume: '9,400 Qt', pct: 92, status: 'Storage Peak', color: '#7c3aed' },
      { name: 'Vidarbha Citrus & Cotton', mandi: 'Katol, Amravati, Kalamna', crop: 'Nagpur Orange, Raw Cotton', volume: '5,800 Qt', pct: 65, status: 'Fresh Harvest', color: '#ea580c' }
    ];

    container.innerHTML = belts.map(b => {
      const transName = window.tLocation ? window.tLocation(b.name) : b.name;
      const transMandi = window.tLocation ? window.tLocation(b.mandi) : b.mandi;
      const transCrop = window.tCrop ? window.tCrop(b.crop) : b.crop;
      const transStatus = window.tText ? window.tText(b.status) : b.status;

      return `
        <div style="margin-bottom: 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px 14px;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <div>
              <strong style="font-size: 0.88rem; color: #0f172a;">${transName}</strong>
              <span style="font-size: 0.74rem; color: #64748b; display: block;">📍 ${transMandi} • ${transCrop}</span>
            </div>
            <div style="text-align: right;">
              <strong style="font-size: 0.9rem; color: ${b.color};">${b.volume}</strong>
              <span style="font-size: 0.7rem; color: #166534; font-weight: 700; background: #e8f5ed; padding: 1px 6px; border-radius: 4px; display: inline-block;">${transStatus}</span>
            </div>
          </div>
          <div style="background: #e2e8f0; height: 6px; border-radius: 999px; overflow: hidden;">
            <div style="width: ${b.pct}%; height: 100%; background: ${b.color}; border-radius: 999px;"></div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Render Right Column: AI Procurement & Arbitrage Advisory
  function renderAiProcurementAdvisories() {
    const container = document.getElementById('insight-ai-advisory') || document.getElementById('ai-advisory-container');
    if (!container) return;

    const commodity = COMMODITY_INSIGHTS[activeCommodity];
    if (!commodity) return;

    const transCropName = window.tCrop ? window.tCrop(commodity.name) : commodity.name;
    const cleanShortCrop = window.tCrop ? window.tCrop(commodity.name.replace(/\(.*?\)/g, '').trim()) : commodity.name.split('(')[0];
    const isMr = window.getBuyerLanguage && window.getBuyerLanguage() === 'mr';
    const isHi = window.getBuyerLanguage && window.getBuyerLanguage() === 'hi';

    const transPlanTitle = isMr ? 'AI खरेदी कृती आराखडा:' : isHi ? 'AI खरीद कार्य योजना:' : 'AI Procurement Action Plan:';
    const transBrowseBtn = isMr ? `प्रमाणित ${cleanShortCrop} लॉट्स पहा →` : isHi ? `प्रमाणित ${cleanShortCrop} लॉट्स देखें →` : `Browse Verified ${cleanShortCrop} Lots &rarr;`;
    const transMatrixBtn = isMr ? `🗺️ ${cleanShortCrop} साठी सर्व जिल्ह्यांमधील दर` : isHi ? `🗺️ ${cleanShortCrop} के लिए सभी जिलों के भाव` : `🗺️ All District Rates for ${cleanShortCrop}`;
    const transSpreadTitle = isMr ? 'थेट खरेदीतील नफा/बचत' : isHi ? 'सीधी खरीद बचत' : 'Direct Sourcing Spread';
    const transSpreadSub = isMr ? 'वाशी बाजार समिती दलालांच्या दरापेक्षा' : isHi ? 'वाशी मंडी दलालों के भाव से' : 'vs Vashi APMC middleman rate';
    const transWindow = isMr ? 'खरेदीसाठी सर्वोत्तम कालावधी' : isHi ? 'खरीद का सही समय' : 'Optimal Sourcing Window';
    const transWindowVal = isMr ? 'पुढील ३–५ दिवस' : isHi ? 'अगले 3–5 दिन' : 'Next 3–5 Days';
    const transWindowSub = isMr ? 'सणासुदीच्या मागणीपूर्वी' : isHi ? 'त्योहारी मांग से पहले' : 'Before festive demand uptick';

    const savingsVal = ((commodity.terminalVashiQt - commodity.farmGateQt) / 100).toFixed(2);

    container.innerHTML = `
      <div style="background: #f0fdf4; border: 1.5px solid #bbf7d0; border-radius: 12px; padding: 16px; margin-bottom: 14px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <span style="font-size: 1.2rem;">🤖</span>
          <strong style="color: #065f46; font-size: 0.95rem;">${transPlanTitle} ${transCropName}</strong>
        </div>
        <p style="font-size: 0.82rem; color: #166534; line-height: 1.5; margin: 0 0 12px 0;">
          ${commodity.recommendation}
        </p>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="btn btn-primary btn-sm" onclick="switchView('view-verified-produce')" style="background: #0c5a36; border-color: #0c5a36; font-weight: 700;">
            ${transBrowseBtn}
          </button>
          <button class="btn btn-outline btn-sm" onclick="openDistrictMatrixModal('${commodity.key}')" style="font-size: 0.76rem; border-color: #0c5a36; color: #0c5a36;">
            ${transMatrixBtn}
          </button>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.8rem;">
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px;">
          <span style="color: #64748b; font-size: 0.72rem; display: block; text-transform: uppercase;">${transSpreadTitle}</span>
          <strong style="font-size: 1.05rem; color: #0c5a36;">Save ₹ ${savingsVal} /kg</strong>
          <div style="font-size: 0.7rem; color: #64748b; margin-top: 2px;">${transSpreadSub}</div>
        </div>
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px;">
          <span style="color: #64748b; font-size: 0.72rem; display: block; text-transform: uppercase;">${transWindow}</span>
          <strong style="font-size: 1.05rem; color: #1e3a8a;">${transWindowVal}</strong>
          <div style="font-size: 0.7rem; color: #64748b; margin-top: 2px;">${transWindowSub}</div>
        </div>
      </div>
    `;
  }

  // Render Maharashtra Mandis Real-Time Table with 5-by-5 Pagination
  function renderMaharashtraMandisTable() {
    const tbody = document.getElementById('insights-mandis-tbody') || document.getElementById('maharashtra-mandis-tbody');
    if (!tbody) return;

    const filtered = MAHARASHTRA_MANDIS_TABLE.filter(item => {
      if (tableDistrictFilter !== 'all' && item.district.toLowerCase() !== tableDistrictFilter.toLowerCase()) return false;
      if (tableSearchQuery) {
        const text = `${item.crop} ${item.mandi} ${item.district}`.toLowerCase();
        if (!text.includes(tableSearchQuery)) return false;
      }
      return true;
    });

    const paginationContainer = document.getElementById('insights-table-pagination');
    const isMr = window.getBuyerLanguage && window.getBuyerLanguage() === 'mr';
    const isHi = window.getBuyerLanguage && window.getBuyerLanguage() === 'hi';

    if (filtered.length === 0) {
      const emptyMsg = isMr ? `निवडलेल्या निकषांनुसार बाजार समित्या आढळल्या नाहीत.` : isHi ? `कोई मंडी नहीं मिली।` : `No APMC mandis found.`;
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 30px; color:#64748b;">${emptyMsg}</td></tr>`;
      if (paginationContainer) paginationContainer.style.display = 'none';
      return;
    }

    const visibleItems = filtered.slice(0, tableVisibleCount);
    const btnDistricts = window.t ? window.t('btn_districts', '🗺️ Districts') : '🗺️ Districts';
    const btnChart = window.t ? window.t('btn_chart', '📈 Chart') : '📈 Chart';
    const btnDirectBuy = window.t ? window.t('btn_direct_buy', 'Direct Buy') : 'Direct Buy';
    const transSpread = isMr ? 'नफा' : isHi ? 'बचत' : 'Spread';
    const transSave = isMr ? 'बचत' : isHi ? 'बचत' : 'Save';

    tbody.innerHTML = visibleItems.map(item => {
      const transCrop = window.tCrop ? window.tCrop(item.crop) : item.crop;
      const transMandi = window.tLocation ? window.tLocation(item.mandi) : item.mandi;
      const transDistrict = window.tLocation ? window.tLocation(item.district) : item.district;

      return `
        <tr style="border-bottom: 1px solid #f1f5f9; transition: background 0.15s ease;">
          <td style="padding: 12px 14px;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 1.3rem;">${item.emoji}</span>
              <div>
                <strong style="color: #0f172a; font-size: 0.88rem;">${transCrop}</strong>
                <div style="font-size: 0.72rem; color: #64748b;">📍 ${transMandi} (${transDistrict}, MH)</div>
              </div>
            </div>
          </td>
          <td style="padding: 12px 14px;">
            <strong style="color: #0f172a; font-size: 0.88rem;">${item.arrivalsQt.toLocaleString('en-IN')} Qt</strong>
            <div style="font-size: 0.7rem; color: #64748b;">(${item.arrivalsKg.toLocaleString('en-IN')} kg)</div>
          </td>
          <td style="padding: 12px 14px; font-size: 0.82rem; color: #64748b;">
            ${formatInsightPrice(item.minPriceQt)}
          </td>
          <td style="padding: 12px 14px;">
            <strong style="font-size: 0.95rem; color: #0c5a36;">${formatInsightPrice(item.modalPriceQt)}</strong>
            <span class="badge ${item.trend === 'up' ? 'badge-grade-green' : 'badge-grade-blue'}" style="font-size: 0.68rem; font-weight: 800; margin-left: 4px;">
              ${item.trendText}
            </span>
          </td>
          <td style="padding: 12px 14px; font-size: 0.82rem; color: #64748b;">
            ${formatInsightPrice(item.maxPriceQt)}
          </td>
          <td style="padding: 12px 14px;">
            <div style="font-weight: 800; color: #166534; font-size: 0.88rem;">+${item.savingsPct}% ${transSpread}</div>
            <span style="font-size: 0.72rem; color: #64748b;">(${transSave} ${formatInsightPrice(item.savingsQt)})</span>
          </td>
          <td style="padding: 12px 14px; text-align: right;">
            <div style="display: flex; gap: 6px; justify-content: flex-end;">
              <button class="btn btn-outline btn-sm" onclick="openDistrictMatrixModal('${item.cropKey}')" style="font-size: 0.72rem; padding: 4px 8px; border-color: #0c5a36; color: #0c5a36;" title="View All District Rates">
                ${btnDistricts}
              </button>
              <button class="btn btn-outline btn-sm" onclick="selectInsightCommodity('${item.cropKey}'); window.scrollTo({top: 0, behavior: 'smooth'});" style="font-size: 0.72rem; padding: 4px 8px;" title="View AI Chart">
                ${btnChart}
              </button>
              <button class="btn btn-primary btn-sm" onclick="switchView('view-verified-produce')" style="font-size: 0.72rem; padding: 4px 8px; background: #0c5a36;" title="Buy from Farmers">
                ${btnDirectBuy}
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    if (paginationContainer) {
      paginationContainer.style.display = 'flex';
      paginationContainer.style.alignItems = 'center';
      paginationContainer.style.gap = '10px';

      const btnMoreText = window.t ? window.t('btn_show_more_crops', 'Show More Crops (+5)') : 'Show More Crops (+5)';
      const btnLessText = window.t ? window.t('btn_show_less', '▲ Show Less (-5)') : '▲ Show Less (-5)';
      const transShowing = isMr ? `दर्शवित आहे: ${filtered.length} पैकी ${visibleItems.length}` : isHi ? `प्रदर्शित: ${filtered.length} में से ${visibleItems.length}` : `Showing ${visibleItems.length} of ${filtered.length}`;
      const transAllEntries = isMr ? `✓ सर्व ${filtered.length} बाजार समिती नोंदी दर्शवित आहे` : isHi ? `✓ सभी ${filtered.length} मंडी प्रविष्टियां प्रदर्शित` : `✓ Showing all ${filtered.length} APMC entries`;

      let buttonsHtml = '';
      if (tableVisibleCount < filtered.length) {
        buttonsHtml += `
          <button class="btn btn-outline" onclick="showMoreMandis()" style="font-weight: 700; font-size: 0.85rem; padding: 8px 20px; border-color: #0c5a36; color: #0c5a36; display: flex; align-items: center; gap: 8px; border-radius: 8px;">
            <span>${btnMoreText}</span>
            <span style="background: #e8f5ed; color: #0c5a36; font-size: 0.75rem; padding: 2px 8px; border-radius: 999px;">${transShowing}</span>
          </button>
        `;
      } else {
        buttonsHtml += `
          <span style="font-size: 0.8rem; color: #64748b; font-weight: 600;">${transAllEntries}</span>
        `;
      }

      if (tableVisibleCount > 5) {
        buttonsHtml += `
          <button class="btn btn-outline" onclick="showLessMandis()" style="font-weight: 700; font-size: 0.85rem; padding: 8px 18px; border-color: #cbd5e1; color: #475569; display: flex; align-items: center; gap: 6px; border-radius: 8px; background: #ffffff;">
            <span>${btnLessText}</span>
          </button>
        `;
      }

      paginationContainer.innerHTML = buttonsHtml;
    }
  }

  // Open District Price Comparison Matrix Modal
  function openDistrictMatrixModal(cropKey) {
    const modal = document.getElementById('modal-district-crop-matrix');
    if (!modal) return;

    const targetKey = cropKey || activeCommodity;
    const commodity = COMMODITY_INSIGHTS[targetKey];
    if (!commodity) return;

    const isMr = window.getBuyerLanguage && window.getBuyerLanguage() === 'mr';
    const isHi = window.getBuyerLanguage && window.getBuyerLanguage() === 'hi';

    const transCropName = window.tCrop ? window.tCrop(commodity.name) : commodity.name;
    const cleanCropName = window.tCrop ? window.tCrop(commodity.name.replace(/\(.*?\)/g, '').trim()) : commodity.name.split('(')[0];

    const emojiEl = document.getElementById('district-matrix-emoji');
    const titleEl = document.getElementById('district-matrix-title');
    const subEl = document.getElementById('district-matrix-subtitle');
    const tbody = document.getElementById('district-matrix-tbody');
    const countEl = document.getElementById('district-matrix-count');

    if (emojiEl) emojiEl.textContent = commodity.emoji;
    if (titleEl) titleEl.textContent = isMr ? `सर्व महाराष्ट्र जिल्ह्यांमधील बाजार समिती दर तक्ता: ${transCropName}` : isHi ? `सभी महाराष्ट्र जिलों की मंडी दर तालिका: ${transCropName}` : `All Maharashtra Districts APMC Price Matrix: ${commodity.name}`;
    if (subEl) subEl.textContent = isMr ? `${cleanCropName} साठी सर्व उत्पादक जिल्ह्यांमधील थेट बाजार भाव आणि आवक प्रमाण` : isHi ? `${cleanCropName} के लिए सभी उत्पादक जिलों के लाइव मंडी भाव और आवक मात्रा` : `Live APMC benchmark rates & arrival volumes across all producing districts for ${commodity.name.split('(')[0]}`;

    const hubs = commodity.districtHubs || [];
    if (countEl) countEl.textContent = isMr ? `${hubs.length} जिल्हे उपलब्ध` : isHi ? `${hubs.length} जिले उपलब्ध` : `${hubs.length} Districts Available`;

    tbody.innerHTML = hubs.map(h => {
      const kgPrice = (h.modalQt / 100).toFixed(2);
      const minKg = (h.minQt / 100).toFixed(2);
      const maxKg = (h.maxQt / 100).toFixed(2);
      const savingsKg = ((commodity.terminalVashiQt - commodity.farmGateQt) / 100).toFixed(2);
      const transDist = window.tLocation ? window.tLocation(h.district) : h.district;
      const transMandi = window.tLocation ? window.tLocation(h.mandi) : h.mandi;
      const transDistrictLabel = isMr ? `📍 ${transDist} जिल्हा` : isHi ? `📍 ${transDist} जिला` : `📍 ${h.district} District`;
      const transProcureBtn = isMr ? 'लॉट खरेदी करा' : isHi ? 'लॉट खरीदें' : 'Procure Lot';
      const transSaveText = isMr ? `बचत ₹ ${savingsKg}/किलो` : isHi ? `बचत ₹ ${savingsKg}/किग्रा` : `Save ₹ ${savingsKg}/kg`;

      return `
        <tr style="border-bottom: 1px solid #f1f5f9;">
          <td style="padding: 12px 14px;">
            <strong style="color: #0f172a; font-size: 0.9rem;">${transDistrictLabel}</strong>
            <div style="font-size: 0.74rem; color: #64748b;">${transMandi}</div>
          </td>
          <td style="padding: 12px 14px;">
            <strong style="font-size: 1.05rem; color: #0c5a36;">₹ ${kgPrice} /kg</strong>
          </td>
          <td style="padding: 12px 14px; font-weight: 700; color: #1e293b;">
            ₹ ${h.modalQt.toLocaleString('en-IN')} /Qt
          </td>
          <td style="padding: 12px 14px; font-size: 0.78rem; color: #64748b;">
            ₹ ${minKg} – ₹ ${maxKg} /kg
          </td>
          <td style="padding: 12px 14px; font-weight: 700; color: #0f172a;">
            ${h.arrivalsQt.toLocaleString('en-IN')} Qt
          </td>
          <td style="padding: 12px 14px;">
            <span class="badge badge-grade-green" style="font-size: 0.72rem;">+${commodity.arbitragePct}% (${transSaveText})</span>
          </td>
          <td style="padding: 12px 14px; text-align: right;">
            <button class="btn btn-primary btn-sm" onclick="closeDistrictMatrixModal(); switchView('view-verified-produce');" style="font-size: 0.72rem; padding: 4px 10px; background: #0c5a36;">
              ${transProcureBtn}
            </button>
          </td>
        </tr>
      `;
    }).join('');

    modal.style.display = 'flex';
  }

  function openCurrentDistrictMatrixModal() {
    openDistrictMatrixModal(activeCommodity);
  }

  function closeDistrictMatrixModal() {
    const modal = document.getElementById('modal-district-crop-matrix');
    if (modal) modal.style.display = 'none';
  }

  function filterDistrictMatrixSearch(query) {
    const q = (query || '').trim().toLowerCase();
    const rows = document.querySelectorAll('#district-matrix-tbody tr');
    rows.forEach(r => {
      const text = r.textContent.toLowerCase();
      r.style.display = text.includes(q) ? '' : 'none';
    });
  }

  function showMoreMandis() {
    tableVisibleCount += 5;
    renderMaharashtraMandisTable();
  }

  function showLessMandis() {
    tableVisibleCount = Math.max(5, tableVisibleCount - 5);
    renderMaharashtraMandisTable();
  }

  function resetMandisTableCount() {
    tableVisibleCount = 5;
    renderMaharashtraMandisTable();
  }

  function formatInsightPrice(priceQt) {
    if (activePriceUnit === 'kg') {
      const kg = (priceQt / 100).toFixed(2);
      return `₹ ${kg} /kg`;
    }
    return `₹ ${priceQt.toLocaleString('en-IN')} /Qt`;
  }

  function handleMandiTableSearch(val) {
    tableSearchQuery = (val || '').trim().toLowerCase();
    tableVisibleCount = 5;
    renderMaharashtraMandisTable();
  }

  function filterMandiDistrict(dist) {
    tableDistrictFilter = dist;
    tableVisibleCount = 5;
    renderMaharashtraMandisTable();
  }

  function triggerMandiSync() {
    const icon = document.getElementById('mandi-sync-icon');
    if (icon) icon.style.animation = 'spin 1s linear infinite';
    const msgConnecting = (window.getBuyerLanguage && window.getBuyerLanguage() === 'mr') ? 'ई-नाम व महाराष्ट्र बाजार समिती सर्व्हर्सशी जोडणी करत आहे...' : (window.getBuyerLanguage && window.getBuyerLanguage() === 'hi') ? 'ई-नाम एवं महाराष्ट्र मंडी सर्वर से कनेक्ट हो रहा है...' : 'Connecting to e-NAM & Maharashtra APMC Mandi Servers...';
    const msgSuccess = (window.getBuyerLanguage && window.getBuyerLanguage() === 'mr') ? '✓ बाजार समिती थेट लिलाव दर आणि आवक अद्ययावत झाली आहे!' : (window.getBuyerLanguage && window.getBuyerLanguage() === 'hi') ? '✓ मंडी भाव और आवक डेटा सिंक हो गया है!' : '✓ Mandi arrival volumes & live auction benchmarks synchronized!';
    
    if (typeof showToast === 'function') showToast(msgConnecting, 'info');
    setTimeout(() => {
      if (icon) icon.style.animation = 'none';
      updateLiveTimestamp();
      renderProduceSelectorChips();
      renderInsightChart();
      renderInsightSummaryCards();
      renderMaharashtraMandisTable();
      if (typeof showToast === 'function') showToast(msgSuccess, 'success');
    }, 900);
  }

  function updateLiveTimestamp() {
    const el = document.getElementById('mandi-live-timestamp');
    if (el) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const lang = (window.getBuyerLanguage && window.getBuyerLanguage()) || 'en';
      if (lang === 'mr') {
        el.textContent = `सिंक झाले: आज ${timeStr} • ई-नाम व बाजार समिती थेट`;
      } else if (lang === 'hi') {
        el.textContent = `सिंक हुआ: आज ${timeStr} • ई-नाम व मंडी लाइव`;
      } else {
        el.textContent = `Synced: Today at ${timeStr} • e-NAM & APMC Live`;
      }
    }
  }
  // Export to window
  window.initBuyerMarketInsights = initBuyerMarketInsights;
  window.selectInsightCommodity = selectInsightCommodity;
  window.selectInsightCategory = selectInsightCategory;
  window.setInsightTimeframe = setInsightTimeframe;
  window.setInsightPriceUnit = setInsightPriceUnit;
  window.handleMandiTableSearch = handleMandiTableSearch;
  window.filterMandiDistrict = filterMandiDistrict;
  window.showMoreMandis = showMoreMandis;
  window.showLessMandis = showLessMandis;
  window.resetMandisTableCount = resetMandisTableCount;
  window.triggerMandiSync = triggerMandiSync;
  window.renderProduceSelectorChips = renderProduceSelectorChips;
  window.renderMaharashtraMandisTable = renderMaharashtraMandisTable;
  window.openDistrictMatrixModal = openDistrictMatrixModal;
  window.openCurrentDistrictMatrixModal = openCurrentDistrictMatrixModal;
  window.closeDistrictMatrixModal = closeDistrictMatrixModal;
  window.filterDistrictMatrixSearch = filterDistrictMatrixSearch;
})();
