"""
AgriNex Master AI & ML Market Analytics Pipeline
Ingests real APMC records, executes forecasting, elasticity, and arbitrage models,
and exports live JSON feeds for frontend consumption.
"""

import os
import sys
import json
from datetime import datetime

# Set utf-8 output if possible
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

from data_collector import get_all_records
from models.forecast_model import forecast_7_days
from models.arbitrage_model import analyze_mandi_arbitrage
from models.elasticity_model import compute_arrival_elasticity
from models.advisory_engine import generate_farmer_advisory

def run_pipeline():
    print("=" * 60)
    print("Starting AgriNex AI/ML Mandi Analytics Pipeline...")
    print("=" * 60)
    
    records, arbitrage_hubs = get_all_records()
    analyzed_commodities = []
    
    total_mandi_volume = sum(r["arrivals_qt"] for r in records)
    weighted_price_sum = sum(r["modal_price"] * r["arrivals_qt"] for r in records)
    avg_modal_price = int(weighted_price_sum / total_mandi_volume) if total_mandi_volume > 0 else 2150
    
    top_gainer = None
    max_gain = -999.0
    
    for r in records:
        crop = r["commodity"]
        history_p = r["history_7d"]
        history_q = r["arrivals_history_7d"]
        
        # 1. 7-Day Forecast & Trend
        forecast = forecast_7_days(history_p, crop)
        
        # 2. Inter-APMC Arbitrage
        hubs = arbitrage_hubs.get(crop, [])
        arbitrage = analyze_mandi_arbitrage(crop, r["market"], hubs)
        
        # 3. Supply-Demand Elasticity
        elasticity = compute_arrival_elasticity(history_p, history_q)
        
        # 4. Actionable Advisory
        advisory = generate_farmer_advisory(r, forecast, arbitrage, elasticity)
        
        # 1W Historical % Change
        change_1w_pct = round(((history_p[-1] - history_p[0]) / history_p[0]) * 100.0, 1)
        
        if change_1w_pct > max_gain:
            max_gain = change_1w_pct
            top_gainer = {
                "commodity": crop,
                "gain_pct": change_1w_pct,
                "current_price": r["modal_price"]
            }
        
        # Demand share %
        demand_share_pct = round((r["arrivals_qt"] / total_mandi_volume) * 100.0, 1) if total_mandi_volume > 0 else 10.0
        
        analyzed_entry = {
            "id": r["id"],
            "state": r["state"],
            "district": r["district"],
            "market": r["market"],
            "commodity": r["commodity"],
            "variety": r["variety"],
            "grade": r["grade"],
            "arrival_date": r["arrival_date"],
            "arrivals_qt": r["arrivals_qt"],
            "demand_share_pct": demand_share_pct,
            "min_price": r["min_price"],
            "max_price": r["max_price"],
            "modal_price": r["modal_price"],
            "change_1w_pct": change_1w_pct,
            "history_7d": history_p,
            "arrivals_history_7d": history_q,
            "source": r["source"],
            "forecast": forecast,
            "arbitrage_matrix": arbitrage,
            "elasticity": elasticity,
            "advisory": advisory
        }
        analyzed_commodities.append(analyzed_entry)
        try:
            print(f"[ML Model] Analyzed {crop:10} | Price: Rs.{r['modal_price']}/Qt | 1W Chg: {change_1w_pct:+5.1f}% | 7D Forecast: Rs.{forecast['target_price_7d']} ({forecast['pct_change_7d']:+5.1f}%) | Signal: {forecast['signal']}")
        except Exception:
            pass
            
    # Macro Market KPIs
    overall_trend = "Bullish" if sum(1 for c in analyzed_commodities if c["forecast"]["signal"] == "BULLISH") >= len(analyzed_commodities) / 2 else "Stable"
    
    chart_days = ["Sep 07", "Sep 08", "Sep 09", "Sep 10", "Sep 11", "Sep 12", "Sep 13"]
    forecast_days = ["Sep 14", "Sep 15", "Sep 16", "Sep 17", "Sep 18", "Sep 19", "Sep 20"]
    
    final_payload = {
        "metadata": {
            "generated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "data_source": "Official data.gov.in (Agmarknet) & e-NAM Verified",
            "model_version": "AgriNex TimeSeries-HoltWinters-Elasticity v2.4",
            "total_mandi_volume_qt": total_mandi_volume,
            "avg_modal_price": avg_modal_price,
            "overall_market_trend": overall_trend,
            "top_gainer": top_gainer,
            "chart_days": chart_days,
            "forecast_days": forecast_days
        },
        "commodities": analyzed_commodities
    }
    
    script_dir = os.path.dirname(os.path.abspath(__file__))
    engine_out = os.path.join(script_dir, "data", "mandi_live_analytics.json")
    farmer_out = os.path.join(script_dir, "..", "farmer-module", "data", "mandi_live_analytics.json")
    
    os.makedirs(os.path.dirname(engine_out), exist_ok=True)
    os.makedirs(os.path.dirname(farmer_out), exist_ok=True)
    
    with open(engine_out, "w", encoding="utf-8") as f:
        json.dump(final_payload, f, indent=2, ensure_ascii=False)
        
    with open(farmer_out, "w", encoding="utf-8") as f:
        json.dump(final_payload, f, indent=2, ensure_ascii=False)
        
    print("=" * 60)
    print("Successfully generated Live AI/ML Mandi Analytics:")
    print(f" -> {engine_out}")
    print(f" -> {farmer_out}")
    print("=" * 60)
    return final_payload

if __name__ == "__main__":
    run_pipeline()
