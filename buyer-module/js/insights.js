/**
 * AgriNex Buyer Module - Market Insights & Institutional Intelligence Engine
 * Comprehensive APMC Mandi Price Analytics, Predictive Forecasting & Arbitrage Tracking (Maharashtra)
 */

(function () {
  'use strict';

  // Comprehensive Maharashtra Commodity Analytics & Trend Matrix
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
      history: {
        "7D": {
          labels: ["08 Sep", "09 Sep", "10 Sep", "11 Sep", "12 Sep", "13 Sep", "14 Sep (Today)", "16 Sep (AI)", "18 Sep (AI)", "20 Sep (AI)"],
          historical: [1720, 1750, 1760, 1800, 1820, 1840, 1850, null, null, null],
          forecast: [null, null, null, null, null, null, 1850, 1890, 1940, 1980],
          mandiMin: [1350, 1380, 1390, 1400, 1420, 1400, 1400, null, null, null],
          mandiMax: [2000, 2050, 2080, 2100, 2120, 2140, 2150, null, null, null]
        },
        "1M": {
          labels: ["15 Aug", "22 Aug", "29 Aug", "05 Sep", "12 Sep", "14 Sep (Today)", "21 Sep (AI)", "28 Sep (AI)"],
          historical: [1540, 1610, 1680, 1740, 1820, 1850, null, null],
          forecast: [null, null, null, null, null, 1850, 1920, 2010],
          mandiMin: [1200, 1250, 1300, 1350, 1420, 1400, null, null],
          mandiMax: [1820, 1900, 1980, 2050, 2120, 2150, null, null]
        },
        "3M": {
          labels: ["Jun", "Jul", "Aug", "Sep (Current)", "Oct (AI)", "Nov (AI)"],
          historical: [1380, 1490, 1650, 1850, null, null],
          forecast: [null, null, null, 1850, 2050, 2200],
          mandiMin: [1100, 1180, 1280, 1400, null, null],
          mandiMax: [1620, 1750, 1940, 2150, null, null]
        },
        "1Y": {
          labels: ["Oct 25", "Dec 25", "Feb 26", "Apr 26", "Jun 26", "Aug 26", "Sep 26 (Now)"],
          historical: [1950, 2300, 1600, 1350, 1420, 1680, 1850],
          forecast: [null, null, null, null, null, null, 1850],
          mandiMin: [1500, 1800, 1200, 1050, 1150, 1300, 1400],
          mandiMax: [2400, 2800, 1950, 1600, 1700, 1980, 2150]
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
      recommendation: "Peak harvest arrivals from Junnar and Otur clusters. High bargaining power for bulk processing and retail packing. Counter-bid at ₹ 1,150-1,180/Qt.",
      history: {
        "7D": {
          labels: ["08 Sep", "09 Sep", "10 Sep", "11 Sep", "12 Sep", "13 Sep", "14 Sep (Today)", "16 Sep (AI)", "18 Sep (AI)", "20 Sep (AI)"],
          historical: [1350, 1320, 1280, 1250, 1220, 1210, 1200, null, null, null],
          forecast: [null, null, null, null, null, null, 1200, 1170, 1140, 1120],
          mandiMin: [1000, 980, 950, 920, 900, 900, 900, null, null, null],
          mandiMax: [1600, 1550, 1500, 1480, 1460, 1450, 1450, null, null, null]
        },
        "1M": {
          labels: ["15 Aug", "22 Aug", "29 Aug", "05 Sep", "12 Sep", "14 Sep (Today)", "21 Sep (AI)", "28 Sep (AI)"],
          historical: [1800, 1650, 1480, 1340, 1220, 1200, null, null],
          forecast: [null, null, null, null, null, 1200, 1150, 1120],
          mandiMin: [1300, 1200, 1050, 950, 900, 900, null, null],
          mandiMax: [2200, 1980, 1750, 1550, 1460, 1450, null, null]
        },
        "3M": {
          labels: ["Jun", "Jul", "Aug", "Sep (Current)", "Oct (AI)", "Nov (AI)"],
          historical: [2400, 3100, 1850, 1200, null, null],
          forecast: [null, null, null, 1200, 1100, 1300],
          mandiMin: [1700, 2200, 1300, 900, null, null],
          mandiMax: [3000, 3800, 2250, 1450, null, null]
        },
        "1Y": {
          labels: ["Oct 25", "Dec 25", "Feb 26", "Apr 26", "Jun 26", "Aug 26", "Sep 26 (Now)"],
          historical: [1400, 1100, 950, 1300, 2400, 1850, 1200],
          forecast: [null, null, null, null, null, null, 1200],
          mandiMin: [950, 750, 650, 900, 1700, 1300, 900],
          mandiMax: [1800, 1400, 1200, 1650, 3000, 2250, 1450]
        }
      }
    },
    banana: {
      key: "banana",
      name: "Grand Naine Banana (Jalgaon G9)",
      emoji: "🍌",
      hub: "Jalgaon & Raver Mandi",
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
      history: {
        "7D": {
          labels: ["08 Sep", "09 Sep", "10 Sep", "11 Sep", "12 Sep", "13 Sep", "14 Sep (Today)", "16 Sep (AI)", "18 Sep (AI)", "20 Sep (AI)"],
          historical: [1360, 1370, 1380, 1385, 1390, 1395, 1400, null, null, null],
          forecast: [null, null, null, null, null, null, 1400, 1415, 1430, 1445],
          mandiMin: [1050, 1060, 1080, 1090, 1100, 1100, 1100, null, null, null],
          mandiMax: [1600, 1620, 1620, 1630, 1640, 1650, 1650, null, null, null]
        },
        "1M": {
          labels: ["15 Aug", "22 Aug", "29 Aug", "05 Sep", "12 Sep", "14 Sep (Today)", "21 Sep (AI)", "28 Sep (AI)"],
          historical: [1300, 1320, 1350, 1370, 1390, 1400, null, null],
          forecast: [null, null, null, null, null, 1400, 1430, 1460],
          mandiMin: [1000, 1020, 1050, 1070, 1100, 1100, null, null],
          mandiMax: [1540, 1560, 1590, 1610, 1640, 1650, null, null]
        },
        "3M": {
          labels: ["Jun", "Jul", "Aug", "Sep (Current)", "Oct (AI)", "Nov (AI)"],
          historical: [1220, 1280, 1340, 1400, null, null],
          forecast: [null, null, null, 1400, 1480, 1550],
          mandiMin: [950, 1000, 1040, 1100, null, null],
          mandiMax: [1450, 1500, 1580, 1650, null, null]
        },
        "1Y": {
          labels: ["Oct 25", "Dec 25", "Feb 26", "Apr 26", "Jun 26", "Aug 26", "Sep 26 (Now)"],
          historical: [1450, 1520, 1380, 1180, 1220, 1340, 1400],
          forecast: [null, null, null, null, null, null, 1400],
          mandiMin: [1150, 1200, 1080, 920, 950, 1040, 1100],
          mandiMax: [1700, 1780, 1620, 1400, 1450, 1580, 1650]
        }
      }
    },
    soybean: {
      key: "soybean",
      name: "Yellow Soybean (Latur JS-335)",
      emoji: "🌱",
      hub: "Latur Mega APMC Silos",
      currentModalQt: 4200,
      currentMinQt: 3850,
      currentMaxQt: 4750,
      farmGateQt: 4200,
      terminalVashiQt: 4750,
      arbitragePct: 11.6,
      trendPct: "+1.8%",
      trendDir: "up",
      arrivalsQt: 7800,
      arrivalsChange: "+15.0% New Crop",
      sentiment: "Bullish Storage Opportunity",
      sentimentScore: 79,
      recommendation: "New harvest arrivals entering Marathwada yards. Recommended to book Latur WDRA Hermetic Silos and avail e-NWR 70% credit pledge.",
      history: {
        "7D": {
          labels: ["08 Sep", "09 Sep", "10 Sep", "11 Sep", "12 Sep", "13 Sep", "14 Sep (Today)", "16 Sep (AI)", "18 Sep (AI)", "20 Sep (AI)"],
          historical: [4120, 4140, 4150, 4170, 4190, 4200, 4200, null, null, null],
          forecast: [null, null, null, null, null, null, 4200, 4240, 4280, 4320],
          mandiMin: [3800, 3800, 3820, 3840, 3850, 3850, 3850, null, null, null],
          mandiMax: [4650, 4680, 4700, 4720, 4740, 4750, 4750, null, null, null]
        },
        "1M": {
          labels: ["15 Aug", "22 Aug", "29 Aug", "05 Sep", "12 Sep", "14 Sep (Today)", "21 Sep (AI)", "28 Sep (AI)"],
          historical: [4050, 4080, 4110, 4150, 4190, 4200, null, null],
          forecast: [null, null, null, null, null, 4200, 4270, 4350],
          mandiMin: [3750, 3780, 3800, 3820, 3850, 3850, null, null],
          mandiMax: [4550, 4600, 4650, 4700, 4740, 4750, null, null]
        },
        "3M": {
          labels: ["Jun", "Jul", "Aug", "Sep (Current)", "Oct (AI)", "Nov (AI)"],
          historical: [4400, 4250, 4100, 4200, null, null],
          forecast: [null, null, null, 4200, 4380, 4520],
          mandiMin: [4000, 3900, 3780, 3850, null, null],
          mandiMax: [4900, 4750, 4600, 4750, null, null]
        },
        "1Y": {
          labels: ["Oct 25", "Dec 25", "Feb 26", "Apr 26", "Jun 26", "Aug 26", "Sep 26 (Now)"],
          historical: [4800, 5100, 4900, 4600, 4400, 4100, 4200],
          forecast: [null, null, null, null, null, null, 4200],
          mandiMin: [4300, 4600, 4400, 4150, 4000, 3780, 3850],
          mandiMax: [5300, 5600, 5350, 5050, 4900, 4600, 4750]
        }
      }
    },
    orange: {
      key: "orange",
      name: "Nagpur Mandarin Orange (Katol)",
      emoji: "🍊",
      hub: "Katol & Kalamna Mandi (Nagpur)",
      currentModalQt: 3800,
      currentMinQt: 3100,
      currentMaxQt: 4400,
      farmGateQt: 3800,
      terminalVashiQt: 4400,
      arbitragePct: 13.6,
      trendPct: "+5.6%",
      trendDir: "up",
      arrivalsQt: 2800,
      arrivalsChange: "Seasonal Start",
      sentiment: "Early Season Premium",
      sentimentScore: 84,
      recommendation: "Early Ambia bahar crop arriving. High demand in Tier 1 retail. Lock direct farmer contracts with Katol citrus growers.",
      history: {
        "7D": {
          labels: ["08 Sep", "09 Sep", "10 Sep", "11 Sep", "12 Sep", "13 Sep", "14 Sep (Today)", "16 Sep (AI)", "18 Sep (AI)", "20 Sep (AI)"],
          historical: [3600, 3640, 3680, 3720, 3760, 3790, 3800, null, null, null],
          forecast: [null, null, null, null, null, null, 3800, 3870, 3950, 4020],
          mandiMin: [2900, 2950, 3000, 3050, 3080, 3100, 3100, null, null, null],
          mandiMax: [4150, 4200, 4250, 4300, 4350, 4390, 4400, null, null, null]
        },
        "1M": {
          labels: ["15 Aug", "22 Aug", "29 Aug", "05 Sep", "12 Sep", "14 Sep (Today)", "21 Sep (AI)", "28 Sep (AI)"],
          historical: [3300, 3420, 3540, 3680, 3780, 3800, null, null],
          forecast: [null, null, null, null, null, 3800, 3920, 4100],
          mandiMin: [2700, 2800, 2900, 3000, 3080, 3100, null, null],
          mandiMax: [3800, 3950, 4100, 4280, 4380, 4400, null, null]
        },
        "3M": {
          labels: ["Jun", "Jul", "Aug", "Sep (Current)", "Oct (AI)", "Nov (AI)"],
          historical: [2800, 3050, 3400, 3800, null, null],
          forecast: [null, null, null, 3800, 4150, 4500],
          mandiMin: [2300, 2500, 2800, 3100, null, null],
          mandiMax: [3300, 3600, 4000, 4400, null, null]
        },
        "1Y": {
          labels: ["Oct 25", "Dec 25", "Feb 26", "Apr 26", "Jun 26", "Aug 26", "Sep 26 (Now)"],
          historical: [4200, 4600, 3800, 3100, 2800, 3400, 3800],
          forecast: [null, null, null, null, null, null, 3800],
          mandiMin: [3400, 3800, 3100, 2500, 2300, 2800, 3100],
          mandiMax: [4800, 5300, 4400, 3600, 3300, 4000, 4400]
        }
      }
    },
    turmeric: {
      key: "turmeric",
      name: "Sangli Rajapuri Turmeric",
      emoji: "🌿",
      hub: "Sangli APMC Spice Terminal",
      currentModalQt: 13500,
      currentMinQt: 11800,
      currentMaxQt: 15200,
      farmGateQt: 13500,
      terminalVashiQt: 15200,
      arbitragePct: 11.2,
      trendPct: "+7.4%",
      trendDir: "up",
      arrivalsQt: 1450,
      arrivalsChange: "High Curcumin Demand",
      sentiment: "Strong Export Rally",
      sentimentScore: 88,
      recommendation: "High curcumin content (3.8%+) batches traded actively. Institutional pharma and spice buyers securing forward tranches.",
      history: {
        "7D": {
          labels: ["08 Sep", "09 Sep", "10 Sep", "11 Sep", "12 Sep", "13 Sep", "14 Sep (Today)", "16 Sep (AI)", "18 Sep (AI)", "20 Sep (AI)"],
          historical: [12800, 12950, 13100, 13250, 13400, 13480, 13500, null, null, null],
          forecast: [null, null, null, null, null, null, 13500, 13750, 14050, 14300],
          mandiMin: [11200, 11350, 11500, 11600, 11750, 11800, 11800, null, null, null],
          mandiMax: [14400, 14600, 14750, 14900, 15100, 15180, 15200, null, null, null]
        },
        "1M": {
          labels: ["15 Aug", "22 Aug", "29 Aug", "05 Sep", "12 Sep", "14 Sep (Today)", "21 Sep (AI)", "28 Sep (AI)"],
          historical: [12100, 12350, 12700, 13100, 13450, 13500, null, null],
          forecast: [null, null, null, null, null, 13500, 13900, 14450],
          mandiMin: [10600, 10800, 11100, 11500, 11750, 11800, null, null],
          mandiMax: [13600, 13900, 14300, 14750, 15150, 15200, null, null]
        },
        "3M": {
          labels: ["Jun", "Jul", "Aug", "Sep (Current)", "Oct (AI)", "Nov (AI)"],
          historical: [11200, 11800, 12600, 13500, null, null],
          forecast: [null, null, null, 13500, 14600, 15800],
          mandiMin: [9800, 10300, 11000, 11800, null, null],
          mandiMax: [12600, 13300, 14200, 15200, null, null]
        },
        "1Y": {
          labels: ["Oct 25", "Dec 25", "Feb 26", "Apr 26", "Jun 26", "Aug 26", "Sep 26 (Now)"],
          historical: [13000, 14200, 13600, 11900, 11200, 12600, 13500],
          forecast: [null, null, null, null, null, null, 13500],
          mandiMin: [11400, 12500, 11900, 10400, 9800, 11000, 11800],
          mandiMax: [14600, 15900, 15200, 13400, 12600, 14200, 15200]
        }
      }
    },
    pomegranate: {
      key: "pomegranate",
      name: "Bhagwa Pomegranate (Solapur Export)",
      emoji: "🍎",
      hub: "Solapur & Pandharpur APMC",
      currentModalQt: 8800,
      currentMinQt: 7200,
      currentMaxQt: 10200,
      farmGateQt: 8800,
      terminalVashiQt: 10200,
      arbitragePct: 13.7,
      trendPct: "+3.5%",
      trendDir: "up",
      arrivalsQt: 1850,
      arrivalsChange: "Export Packing Active",
      sentiment: "Bullish Quality Demand",
      sentimentScore: 81,
      recommendation: "Calibrated 250g+ fruit available with direct Cold-Chain dispatch. Fast booking suggested to avoid APMC agent fee.",
      history: {
        "7D": {
          labels: ["08 Sep", "09 Sep", "10 Sep", "11 Sep", "12 Sep", "13 Sep", "14 Sep (Today)", "16 Sep (AI)", "18 Sep (AI)", "20 Sep (AI)"],
          historical: [8450, 8520, 8600, 8680, 8740, 8790, 8800, null, null, null],
          forecast: [null, null, null, null, null, null, 8800, 8920, 9080, 9220],
          mandiMin: [6900, 7000, 7050, 7120, 7180, 7200, 7200, null, null, null],
          mandiMax: [9800, 9900, 9980, 10050, 10140, 10190, 10200, null, null, null]
        },
        "1M": {
          labels: ["15 Aug", "22 Aug", "29 Aug", "05 Sep", "12 Sep", "14 Sep (Today)", "21 Sep (AI)", "28 Sep (AI)"],
          historical: [7900, 8100, 8320, 8550, 8750, 8800, null, null],
          forecast: [null, null, null, null, null, 8800, 9050, 9350],
          mandiMin: [6400, 6600, 6800, 7000, 7180, 7200, null, null],
          mandiMax: [9200, 9450, 9700, 9950, 10150, 10200, null, null]
        },
        "3M": {
          labels: ["Jun", "Jul", "Aug", "Sep (Current)", "Oct (AI)", "Nov (AI)"],
          historical: [7200, 7600, 8200, 8800, null, null],
          forecast: [null, null, null, 8800, 9400, 9950],
          mandiMin: [5900, 6200, 6700, 7200, null, null],
          mandiMax: [8400, 8900, 9550, 10200, null, null]
        },
        "1Y": {
          labels: ["Oct 25", "Dec 25", "Feb 26", "Apr 26", "Jun 26", "Aug 26", "Sep 26 (Now)"],
          historical: [9200, 9900, 8800, 7600, 7200, 8200, 8800],
          forecast: [null, null, null, null, null, null, 8800],
          mandiMin: [7500, 8100, 7200, 6200, 5900, 6700, 7200],
          mandiMax: [10600, 11400, 10200, 8800, 8400, 9550, 10200]
        }
      }
    },
    cotton: {
      key: "cotton",
      name: "Raw Cotton (Vidarbha Long Staple)",
      emoji: "☁️",
      hub: "Amravati APMC Cotton Yard",
      currentModalQt: 7200,
      currentMinQt: 6500,
      currentMaxQt: 7850,
      farmGateQt: 7200,
      terminalVashiQt: 7850,
      arbitragePct: 8.3,
      trendPct: "+1.2%",
      trendDir: "up",
      arrivalsQt: 3600,
      arrivalsChange: "New Arrivals Started",
      sentiment: "Stable Ginning Demand",
      sentimentScore: 74,
      recommendation: "Moisture levels under 8.2% and ginning outturn > 34%. Sourcing directly from Amravati/Yavatmal FPOs avoids commission agents.",
      history: {
        "7D": {
          labels: ["08 Sep", "09 Sep", "10 Sep", "11 Sep", "12 Sep", "13 Sep", "14 Sep (Today)", "16 Sep (AI)", "18 Sep (AI)", "20 Sep (AI)"],
          historical: [7100, 7120, 7150, 7160, 7180, 7200, 7200, null, null, null],
          forecast: [null, null, null, null, null, null, 7200, 7240, 7280, 7320],
          mandiMin: [6400, 6420, 6450, 6460, 6480, 6500, 6500, null, null, null],
          mandiMax: [7720, 7750, 7780, 7800, 7820, 7850, 7850, null, null, null]
        },
        "1M": {
          labels: ["15 Aug", "22 Aug", "29 Aug", "05 Sep", "12 Sep", "14 Sep (Today)", "21 Sep (AI)", "28 Sep (AI)"],
          historical: [6950, 7020, 7080, 7140, 7180, 7200, null, null],
          forecast: [null, null, null, null, null, 7200, 7260, 7340],
          mandiMin: [6300, 6350, 6400, 6450, 6480, 6500, null, null],
          mandiMax: [7600, 7680, 7740, 7800, 7840, 7850, null, null]
        },
        "3M": {
          labels: ["Jun", "Jul", "Aug", "Sep (Current)", "Oct (AI)", "Nov (AI)"],
          historical: [7400, 7250, 7050, 7200, null, null],
          forecast: [null, null, null, 7200, 7380, 7550],
          mandiMin: [6700, 6550, 6380, 6500, null, null],
          mandiMax: [8050, 7900, 7700, 7850, null, null]
        },
        "1Y": {
          labels: ["Oct 25", "Dec 25", "Feb 26", "Apr 26", "Jun 26", "Aug 26", "Sep 26 (Now)"],
          historical: [7600, 8100, 7800, 7500, 7400, 7050, 7200],
          forecast: [null, null, null, null, null, null, 7200],
          mandiMin: [6900, 7300, 7050, 6800, 6700, 6380, 6500],
          mandiMax: [8300, 8800, 8500, 8150, 8050, 7700, 7850]
        }
      }
    }
  };

  // Comprehensive Maharashtra APMC Mandis Real-Time Benchmark Table Data
  const MAHARASHTRA_MANDIS_TABLE = [
    {
      crop: "Red Onion (Garwa Export)",
      cropKey: "onion",
      emoji: "🧅",
      mandi: "Lasalgaon APMC",
      district: "Nashik",
      arrivalsQt: 6850,
      arrivalsKg: 685000,
      minPriceQt: 1400,
      modalPriceQt: 1850,
      maxPriceQt: 2150,
      farmGateQt: 1800,
      savingsQt: 350,
      savingsPct: 16.3,
      trend: "up",
      trendText: "+4.8%"
    },
    {
      crop: "Hybrid Tomato (Shivam / Roma)",
      cropKey: "tomato",
      emoji: "🍅",
      mandi: "Narayangaon APMC",
      district: "Pune",
      arrivalsQt: 5400,
      arrivalsKg: 540000,
      minPriceQt: 900,
      modalPriceQt: 1200,
      maxPriceQt: 1450,
      farmGateQt: 1200,
      savingsQt: 250,
      savingsPct: 17.2,
      trend: "down",
      trendText: "-3.2%"
    },
    {
      crop: "Grand Naine Banana (G9)",
      cropKey: "banana",
      emoji: "🍌",
      mandi: "Raver Mandi Yard",
      district: "Jalgaon",
      arrivalsQt: 4200,
      arrivalsKg: 420000,
      minPriceQt: 1100,
      modalPriceQt: 1400,
      maxPriceQt: 1650,
      farmGateQt: 1400,
      savingsQt: 280,
      savingsPct: 16.7,
      trend: "up",
      trendText: "+2.1%"
    },
    {
      crop: "Yellow Soybean (JS 335)",
      cropKey: "soybean",
      emoji: "🌱",
      mandi: "Latur Mega Silos",
      district: "Latur",
      arrivalsQt: 7800,
      arrivalsKg: 780000,
      minPriceQt: 3850,
      modalPriceQt: 4200,
      maxPriceQt: 4750,
      farmGateQt: 4200,
      savingsQt: 550,
      savingsPct: 11.6,
      trend: "up",
      trendText: "+1.8%"
    },
    {
      crop: "Nagpur Mandarin (Santra)",
      cropKey: "orange",
      emoji: "🍊",
      mandi: "Katol Yard",
      district: "Nagpur",
      arrivalsQt: 2800,
      arrivalsKg: 280000,
      minPriceQt: 3100,
      modalPriceQt: 3800,
      maxPriceQt: 4400,
      farmGateQt: 3800,
      savingsQt: 600,
      savingsPct: 13.6,
      trend: "up",
      trendText: "+5.6%"
    },
    {
      crop: "Rajapuri Turmeric Finger",
      cropKey: "turmeric",
      emoji: "🌿",
      mandi: "Sangli Spice Terminal",
      district: "Sangli",
      arrivalsQt: 1450,
      arrivalsKg: 145000,
      minPriceQt: 11800,
      modalPriceQt: 13500,
      maxPriceQt: 15200,
      farmGateQt: 13500,
      savingsQt: 1700,
      savingsPct: 11.2,
      trend: "up",
      trendText: "+7.4%"
    },
    {
      crop: "Bhagwa Pomegranate",
      cropKey: "pomegranate",
      emoji: "🍎",
      mandi: "Pandharpur Yard",
      district: "Solapur",
      arrivalsQt: 1850,
      arrivalsKg: 185000,
      minPriceQt: 7200,
      modalPriceQt: 8800,
      maxPriceQt: 10200,
      farmGateQt: 8800,
      savingsQt: 1400,
      savingsPct: 13.7,
      trend: "up",
      trendText: "+3.5%"
    },
    {
      crop: "Raw Cotton (Long Staple)",
      cropKey: "cotton",
      emoji: "☁️",
      mandi: "Amravati Cotton Yard",
      district: "Amravati",
      arrivalsQt: 3600,
      arrivalsKg: 360000,
      minPriceQt: 6500,
      modalPriceQt: 7200,
      maxPriceQt: 7850,
      farmGateQt: 7200,
      savingsQt: 650,
      savingsPct: 8.3,
      trend: "up",
      trendText: "+1.2%"
    },
    {
      crop: "Table Grapes (Thompson)",
      cropKey: "onion",
      emoji: "🍇",
      mandi: "Pimpalgaon Baswant",
      district: "Nashik",
      arrivalsQt: 2100,
      arrivalsKg: 210000,
      minPriceQt: 4500,
      modalPriceQt: 5800,
      maxPriceQt: 6900,
      farmGateQt: 5800,
      savingsQt: 1100,
      savingsPct: 15.9,
      trend: "up",
      trendText: "+4.0%"
    },
    {
      crop: "Jwala Green Chilli",
      cropKey: "tomato",
      emoji: "🌶️",
      mandi: "Kolhapur Shahu Market",
      district: "Kolhapur",
      arrivalsQt: 1650,
      arrivalsKg: 165000,
      minPriceQt: 3200,
      modalPriceQt: 4200,
      maxPriceQt: 4900,
      farmGateQt: 4200,
      savingsQt: 700,
      savingsPct: 14.3,
      trend: "up",
      trendText: "+6.1%"
    },
    {
      crop: "Maldandi Shalu Jowar",
      cropKey: "soybean",
      emoji: "🌾",
      mandi: "Solapur APMC Yard",
      district: "Solapur",
      arrivalsQt: 2900,
      arrivalsKg: 290000,
      minPriceQt: 2800,
      modalPriceQt: 3400,
      maxPriceQt: 3950,
      farmGateQt: 3400,
      savingsQt: 550,
      savingsPct: 13.9,
      trend: "up",
      trendText: "+2.5%"
    },
    {
      crop: "Alphonso / Hapus Mango",
      cropKey: "orange",
      emoji: "🥭",
      mandi: "Ratnagiri Mandi Yard",
      district: "Ratnagiri",
      arrivalsQt: 1200,
      arrivalsKg: 120000,
      minPriceQt: 14000,
      modalPriceQt: 18500,
      maxPriceQt: 22000,
      farmGateQt: 18500,
      savingsQt: 3500,
      savingsPct: 15.9,
      trend: "up",
      trendText: "+8.2%"
    }
  ];

  // State
  let activeCommodity = "onion";
  let activeTimeframe = "7D";
  let activePriceUnit = "qt"; // 'qt' or 'kg'
  let priceChartInstance = null;
  let tableSearchQuery = "";
  let tableDistrictFilter = "all";

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

  // Render Commodity Selector Chips
  function renderProduceSelectorChips() {
    const container = document.getElementById("insight-produce-chips");
    if (!container) return;

    const list = Object.values(COMMODITY_INSIGHTS);
    container.innerHTML = list.map(c => `
      <div class="produce-chip ${c.key === activeCommodity ? 'active' : ''}" onclick="selectInsightCommodity('${c.key}')">
        <span style="font-size: 1.4rem; line-height: 1;">${c.emoji}</span>
        <div>
          <strong style="font-size: 0.85rem; color: #0f172a; display: block; white-space: nowrap;">${c.name.split('(')[0].trim()}</strong>
          <span style="font-size: 0.72rem; color: #64748b;">${c.hub.split('(')[0].trim()}</span>
        </div>
        <span class="badge ${c.trendDir === 'up' ? 'badge-grade-green' : 'badge-grade-blue'}" style="font-size: 0.7rem; font-weight: 800; margin-left: 4px;">
          ${c.trendPct}
        </span>
      </div>
    `).join("");
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
    document.querySelectorAll(".insight-tf-btn").forEach(btn => {
      if (btn.getAttribute("data-tf") === tf) {
        btn.classList.add("active");
        btn.style.background = "#0c5a36";
        btn.style.color = "#ffffff";
      } else {
        btn.classList.remove("active");
        btn.style.background = "transparent";
        btn.style.color = "#475569";
      }
    });
    renderInsightChart();
  }

  function setInsightPriceUnit(unit) {
    activePriceUnit = unit;
    const btnQt = document.getElementById("insight-unit-qt");
    const btnKg = document.getElementById("insight-unit-kg");

    if (unit === "qt") {
      if (btnQt) { btnQt.classList.add("active"); btnQt.style.background = "#0c5a36"; btnQt.style.color = "#fff"; }
      if (btnKg) { btnKg.classList.remove("active"); btnKg.style.background = "transparent"; btnKg.style.color = "#475569"; }
    } else {
      if (btnKg) { btnKg.classList.add("active"); btnKg.style.background = "#0c5a36"; btnKg.style.color = "#fff"; }
      if (btnQt) { btnQt.classList.remove("active"); btnQt.style.background = "transparent"; btnQt.style.color = "#475569"; }
    }

    renderInsightChart();
    renderInsightSummaryCards();
    renderMaharashtraMandisTable();
  }

  // Render High-DPI Chart.js Interactive Graph
  function renderInsightChart() {
    const canvas = document.getElementById("buyer-insight-chart");
    if (!canvas) return;

    if (typeof Chart === "undefined") {
      console.warn("Chart.js not loaded yet. Waiting...");
      setTimeout(renderInsightChart, 200);
      return;
    }

    const commodity = COMMODITY_INSIGHTS[activeCommodity];
    if (!commodity || !commodity.history || !commodity.history[activeTimeframe]) return;

    const dataObj = commodity.history[activeTimeframe];
    const multiplier = activePriceUnit === "kg" ? 0.01 : 1;
    const unitLabel = activePriceUnit === "kg" ? "₹ /kg" : "₹ /Qt";

    const histData = dataObj.historical.map(v => v !== null ? (v * multiplier) : null);
    const foreData = dataObj.forecast.map(v => v !== null ? (v * multiplier) : null);
    const minData = (dataObj.mandiMin || []).map(v => v !== null ? (v * multiplier) : null);
    const maxData = (dataObj.mandiMax || []).map(v => v !== null ? (v * multiplier) : null);

    if (priceChartInstance) {
      priceChartInstance.destroy();
    }

    const ctx = canvas.getContext("2d");
    const gradientFill = ctx.createLinearGradient(0, 0, 0, 300);
    gradientFill.addColorStop(0, "rgba(12, 90, 54, 0.22)");
    gradientFill.addColorStop(1, "rgba(12, 90, 54, 0.00)");

    priceChartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: dataObj.labels,
        datasets: [
          {
            label: `Mandi Modal Price (${unitLabel})`,
            data: histData,
            borderColor: "#0c5a36",
            backgroundColor: gradientFill,
            borderWidth: 3,
            fill: true,
            tension: 0.35,
            pointRadius: 4,
            pointBackgroundColor: "#0c5a36",
            pointHoverRadius: 6
          },
          {
            label: `AI 7-Day Forward Forecast (${unitLabel})`,
            data: foreData,
            borderColor: "#2563eb",
            backgroundColor: "transparent",
            borderWidth: 2.5,
            borderDash: [6, 6],
            fill: false,
            tension: 0.35,
            pointRadius: 4,
            pointBackgroundColor: "#2563eb",
            pointHoverRadius: 6
          },
          {
            label: `Mandi Ceiling / Max (${unitLabel})`,
            data: maxData,
            borderColor: "rgba(239, 68, 68, 0.4)",
            borderWidth: 1.5,
            borderDash: [3, 3],
            fill: false,
            tension: 0.3,
            pointRadius: 0
          },
          {
            label: `Mandi Floor / Min (${unitLabel})`,
            data: minData,
            borderColor: "rgba(16, 185, 129, 0.4)",
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
          mode: "index",
          intersect: false
        },
        plugins: {
          legend: {
            position: "top",
            labels: {
              usePointStyle: true,
              boxWidth: 8,
              font: {
                family: "'Plus Jakarta Sans', sans-serif",
                size: 12,
                weight: '600'
              },
              color: "#334155"
            }
          },
          tooltip: {
            backgroundColor: "#0f172a",
            titleFont: { family: "'Plus Jakarta Sans'", size: 13, weight: '700' },
            bodyFont: { family: "'Plus Jakarta Sans'", size: 12 },
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              label: function (ctx) {
                if (ctx.raw === null || ctx.raw === undefined) return null;
                const formatted = activePriceUnit === "kg" ? `₹ ${parseFloat(ctx.raw).toFixed(2)} /kg` : `₹ ${Math.round(ctx.raw).toLocaleString('en-IN')} /Qt`;
                return `${ctx.dataset.label.split('(')[0]}: ${formatted}`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: { color: "#f1f5f9" },
            ticks: {
              font: { family: "'Plus Jakarta Sans'", size: 11, weight: '600' },
              color: "#64748b"
            }
          },
          y: {
            grid: { color: "#f1f5f9" },
            ticks: {
              font: { family: "'Plus Jakarta Sans'", size: 11, weight: '600' },
              color: "#64748b",
              callback: function (val) {
                return activePriceUnit === "kg" ? `₹${val.toFixed(1)}` : `₹${val}`;
              }
            }
          }
        }
      }
    });

    // Update Chart Top Header Info
    const titleEl = document.getElementById("insight-chart-title");
    const subEl = document.getElementById("insight-chart-sub");
    if (titleEl) titleEl.textContent = `${commodity.emoji} ${commodity.name} • Mandi Rate Trends & AI Projection`;
    if (subEl) subEl.textContent = `Primary Hub: ${commodity.hub} • 24h Modal: ${formatInsightPrice(commodity.currentModalQt)}`;
  }

  // Render Top KPI & Summary Cards
  function renderInsightSummaryCards() {
    const commodity = COMMODITY_INSIGHTS[activeCommodity];
    if (!commodity) return;

    const modalEl = document.getElementById("kpi-insight-modal");
    const spreadEl = document.getElementById("kpi-insight-spread");
    const arrivalsEl = document.getElementById("kpi-insight-arrivals");
    const sentimentEl = document.getElementById("kpi-insight-sentiment");

    if (modalEl) modalEl.innerHTML = `${formatInsightPrice(commodity.currentModalQt)} <span style="font-size:0.75rem; color:${commodity.trendDir === 'up' ? '#166534' : '#991b1b'}; font-weight:700;">(${commodity.trendPct})</span>`;
    if (spreadEl) spreadEl.innerHTML = `+${commodity.arbitragePct}% <span style="font-size:0.74rem; color:#166534; font-weight:600;">(Save ₹ ${(commodity.terminalVashiQt - commodity.farmGateQt).toLocaleString('en-IN')}/Qt)</span>`;
    if (arrivalsEl) arrivalsEl.innerHTML = `${commodity.arrivalsQt.toLocaleString('en-IN')} Qt <span style="font-size:0.74rem; color:#64748b;">(${commodity.arrivalsChange})</span>`;
    if (sentimentEl) sentimentEl.innerHTML = `${commodity.sentiment} <span style="font-size:0.74rem; color:#0c5a36; font-weight:700;">(${commodity.sentimentScore}/100)</span>`;
  }

  // Render Left Column: Supply Inflow & Belts Heatmap
  function renderSupplyInflowHeatmap() {
    const container = document.getElementById("supply-inflow-container");
    if (!container) return;

    const belts = [
      { name: "Nashik Onion & Grape Belt", mandi: "Lasalgaon & Pimpalgaon", crop: "Red Onion, Grapes", volume: "8,950 Qt", pct: 88, status: "Surge Arrival", color: "#166534" },
      { name: "Pune Junnar Tomato Corridor", mandi: "Narayangaon & Manchar", crop: "Hybrid Tomato, Cabbage", volume: "6,200 Qt", pct: 78, status: "Heavy Supply", color: "#0c5a36" },
      { name: "Khandesh Banana Belt", mandi: "Raver & Jalgaon APMC", crop: "Grand Naine Banana", volume: "4,600 Qt", pct: 70, status: "Steady Inflow", color: "#0284c7" },
      { name: "Marathwada Oilseed Cluster", mandi: "Latur Mega Silos", crop: "Soybean, Pulses, Jowar", volume: "9,400 Qt", pct: 92, status: "Storage Peak", color: "#7c3aed" },
      { name: "Vidarbha Citrus & Cotton", mandi: "Katol, Amravati, Kalamna", crop: "Nagpur Orange, Raw Cotton", volume: "5,800 Qt", pct: 65, status: "Fresh Harvest", color: "#ea580c" }
    ];

    container.innerHTML = belts.map(b => `
      <div style="margin-bottom: 14px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px 14px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <div>
            <strong style="font-size: 0.88rem; color: #0f172a;">${b.name}</strong>
            <span style="font-size: 0.74rem; color: #64748b; display: block;">📍 ${b.mandi} • ${b.crop}</span>
          </div>
          <div style="text-align: right;">
            <strong style="font-size: 0.9rem; color: ${b.color};">${b.volume}</strong>
            <span style="font-size: 0.7rem; color: #166534; font-weight: 700; background: #e8f5ed; padding: 1px 6px; border-radius: 4px; display: inline-block;">${b.status}</span>
          </div>
        </div>
        <div style="background: #e2e8f0; height: 6px; border-radius: 999px; overflow: hidden;">
          <div style="width: ${b.pct}%; height: 100%; background: ${b.color}; border-radius: 999px;"></div>
        </div>
      </div>
    `).join("");
  }

  // Render Right Column: AI Procurement & Arbitrage Advisory
  function renderAiProcurementAdvisories() {
    const container = document.getElementById("ai-advisory-container");
    if (!container) return;

    const commodity = COMMODITY_INSIGHTS[activeCommodity];

    container.innerHTML = `
      <div style="background: #f0fdf4; border: 1.5px solid #bbf7d0; border-radius: 12px; padding: 16px; margin-bottom: 14px;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
          <span style="font-size: 1.2rem;">🤖</span>
          <strong style="color: #065f46; font-size: 0.95rem;">AI Procurement Action Plan: ${commodity.name}</strong>
        </div>
        <p style="font-size: 0.82rem; color: #166534; line-height: 1.5; margin: 0 0 12px 0;">
          ${commodity.recommendation}
        </p>
        <div style="display: flex; gap: 8px; flex-wrap: wrap;">
          <button class="btn btn-primary btn-sm" onclick="switchView('view-marketplace')" style="background: #0c5a36; border-color: #0c5a36; font-weight: 700;">
            Browse Verified ${commodity.name.split('(')[0]} Lots &rarr;
          </button>
          <button class="btn btn-outline btn-sm" onclick="openPostDemandModal()" style="font-size: 0.76rem;">
            Post Bulk Demand Quota
          </button>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.8rem;">
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px;">
          <span style="color: #64748b; font-size: 0.72rem; display: block; text-transform: uppercase;">Direct Sourcing Spread</span>
          <strong style="font-size: 1.05rem; color: #0c5a36;">Save ₹ ${(commodity.terminalVashiQt - commodity.farmGateQt).toLocaleString('en-IN')} /Qt</strong>
          <div style="font-size: 0.7rem; color: #64748b; margin-top: 2px;">vs Vashi APMC middleman rate</div>
        </div>
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px;">
          <span style="color: #64748b; font-size: 0.72rem; display: block; text-transform: uppercase;">Optimal Sourcing Window</span>
          <strong style="font-size: 1.05rem; color: #1e3a8a;">Next 3–5 Days</strong>
          <div style="font-size: 0.7rem; color: #64748b; margin-top: 2px;">Before festive demand uptick</div>
        </div>
      </div>
    `;
  }

  // Render Maharashtra Mandis Real-Time Table
  function renderMaharashtraMandisTable() {
    const tbody = document.getElementById("insights-mandis-tbody");
    if (!tbody) return;

    const filtered = MAHARASHTRA_MANDIS_TABLE.filter(item => {
      if (tableDistrictFilter !== "all" && item.district !== tableDistrictFilter) return false;
      if (tableSearchQuery) {
        const text = `${item.crop} ${item.mandi} ${item.district}`.toLowerCase();
        if (!text.includes(tableSearchQuery)) return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 30px; color:#64748b;">No mandis match your search filter.</td></tr>`;
      return;
    }

    tbody.innerHTML = filtered.map(item => `
      <tr style="border-bottom: 1px solid #f1f5f9; transition: background 0.15s ease;">
        <td style="padding: 12px 14px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 1.3rem;">${item.emoji}</span>
            <div>
              <strong style="color: #0f172a; font-size: 0.88rem;">${item.crop}</strong>
              <div style="font-size: 0.72rem; color: #64748b;">📍 ${item.mandi} (${item.district}, MH)</div>
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
          <div style="font-weight: 800; color: #166534; font-size: 0.88rem;">+${item.savingsPct}% Spread</div>
          <span style="font-size: 0.72rem; color: #64748b;">(Save ${formatInsightPrice(item.savingsQt)})</span>
        </td>
        <td style="padding: 12px 14px; text-align: right;">
          <div style="display: flex; gap: 6px; justify-content: flex-end;">
            <button class="btn btn-outline btn-sm" onclick="selectInsightCommodity('${item.cropKey}'); window.scrollTo({top: 0, behavior: 'smooth'});" style="font-size: 0.72rem; padding: 4px 8px;" title="View AI Chart">
              📈 Chart
            </button>
            <button class="btn btn-primary btn-sm" onclick="switchView('view-marketplace')" style="font-size: 0.72rem; padding: 4px 8px; background: #0c5a36;" title="Buy from Farmers">
              Direct Buy
            </button>
          </div>
        </td>
      </tr>
    `).join("");
  }

  function formatInsightPrice(priceQt) {
    if (activePriceUnit === "kg") {
      const kg = (priceQt / 100).toFixed(2);
      return `₹ ${kg} /kg`;
    }
    return `₹ ${priceQt.toLocaleString('en-IN')} /Qt`;
  }

  function handleMandiTableSearch(val) {
    tableSearchQuery = (val || "").trim().toLowerCase();
    renderMaharashtraMandisTable();
  }

  function filterMandiDistrict(dist) {
    tableDistrictFilter = dist;
    renderMaharashtraMandisTable();
  }

  function triggerMandiSync() {
    const icon = document.getElementById("mandi-sync-icon");
    if (icon) icon.style.animation = "spin 1s linear infinite";

    showToast("Connecting to e-NAM & Maharashtra APMC Mandi Servers...", "info");

    setTimeout(() => {
      if (icon) icon.style.animation = "none";
      updateLiveTimestamp();
      renderProduceSelectorChips();
      renderInsightChart();
      renderInsightSummaryCards();
      renderMaharashtraMandisTable();
      showToast("✓ Mandi arrival volumes & live auction benchmarks synchronized!", "success");
    }, 900);
  }

  function updateLiveTimestamp() {
    const el = document.getElementById("mandi-live-timestamp");
    if (el) {
      const now = new Date();
      el.textContent = `Synced: Today at ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • e-NAM & APMC Live`;
    }
  }

  // Export to window
  window.initBuyerMarketInsights = initBuyerMarketInsights;
  window.selectInsightCommodity = selectInsightCommodity;
  window.setInsightTimeframe = setInsightTimeframe;
  window.setInsightPriceUnit = setInsightPriceUnit;
  window.handleMandiTableSearch = handleMandiTableSearch;
  window.filterMandiDistrict = filterMandiDistrict;
  window.triggerMandiSync = triggerMandiSync;

})();
