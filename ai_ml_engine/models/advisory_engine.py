"""
AgriNex AI Advisory Engine
Synthesizes ML Forecasts, Elasticity analysis, and Mandi Arbitrage to generate
plain-language farmer recommendations.
"""

def generate_farmer_advisory(record, forecast_data, arbitrage_data, elasticity_data):
    """
    Generates actionable farmer advisory.
    """
    crop = record["commodity"]
    mandi = record["market"]
    curr_p = record["modal_price"]
    pct_7d = forecast_data["pct_change_7d"]
    signal = forecast_data["signal"]
    best_arb = arbitrage_data[0] if arbitrage_data and arbitrage_data[0]["is_viable"] else None
    
    if pct_7d >= 6.0:
        verdict = "HOLD / DELAY HARVEST"
        rationale = f"AI models project {crop} prices to rise +{pct_7d}% over the next 5–7 days due to tightening APMC arrivals ({elasticity_data['market_state']})."
    elif pct_7d <= -4.0:
        verdict = "SELL IMMEDIATELY"
        rationale = f"Heavy regional arrivals anticipated. Liquidate current harvest lots within 48 hours to lock in the ₹{curr_p}/Qt peak."
    elif best_arb:
        verdict = f"ARBITRAGE: SHIP TO {best_arb['target_mandi'].upper()}"
        rationale = f"Inter-mandi arbitrage shows +₹{best_arb['net_gain_qt']}/Qt higher net realization at {best_arb['target_mandi']} after deducting ₹{best_arb['freight_cost_qt']}/Qt logistics cost."
    else:
        verdict = "SELL LOCALLY AT APMC"
        rationale = f"Stable market equilibrium at {mandi}. Spot rates are holding steady with consistent institutional buyer demand."
        
    return {
        "verdict": verdict,
        "rationale": rationale,
        "confidence": forecast_data["confidence_pct"],
        "optimal_action_window": "Next 2–4 Days" if "HOLD" in verdict else "Immediate (24–48h)"
    }
