"""
AgriNex Supply-Demand Elasticity Model
Quantifies the correlation between daily Mandi arrival volumes (Supply shock)
and the APMC modal price response.
"""

def compute_arrival_elasticity(history_prices, history_arrivals):
    """
    Computes price elasticity with respect to arrival volume changes.
    Elasticity = (% Δ Modal Price) / (% Δ Arrival Volume)
    """
    if len(history_prices) < 2 or len(history_arrivals) < 2:
        return {"elasticity": -0.35, "market_state": "Balanced"}
    
    pct_p = (history_prices[-1] - history_prices[0]) / history_prices[0]
    pct_q = (history_arrivals[-1] - history_arrivals[0]) / history_arrivals[0] if history_arrivals[0] > 0 else 0.01
    
    elasticity = round(pct_p / pct_q, 2) if pct_q != 0 else -0.4
    
    if pct_p > 0 and pct_q <= 0:
        market_state = "Supply Squeeze (High Demand)"
    elif pct_p > 0 and pct_q > 0:
        market_state = "Strong Demand Absorption"
    elif pct_p < 0 and pct_q > 0:
        market_state = "Oversupply Glut"
    else:
        market_state = "Stable Absorption"
        
    return {
        "elasticity": elasticity,
        "market_state": market_state,
        "price_change_7d_pct": round(pct_p * 100, 1),
        "arrival_change_7d_pct": round(pct_q * 100, 1)
    }
