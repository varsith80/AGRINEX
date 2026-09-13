"""
AgriNex Inter-APMC Multi-Mandi Price Arbitrage Optimizer
Calculates spatial price differentials across regional APMCs minus freight logistics costs
to discover net profit gain for farmers.
"""

def analyze_mandi_arbitrage(commodity, base_mandi_name, hub_list):
    """
    Evaluates net profit arbitrage opportunities for a commodity across regional mandis.
    """
    if not hub_list:
        return []
    
    base_entry = next((h for h in hub_list if h["mandi"] == base_mandi_name), hub_list[0])
    base_price = base_entry["modal_price"]
    
    opportunities = []
    for hub in hub_list:
        if hub["mandi"] == base_entry["mandi"]:
            continue
        
        mandi_price = hub["modal_price"]
        gross_spread = mandi_price - base_price
        freight_cost = hub.get("freight_qt", 30)
        net_spread = gross_spread - freight_cost
        
        is_viable = net_spread > 0
        roi_pct = round((net_spread / base_price) * 100.0, 1) if base_price > 0 else 0
        
        opportunities.append({
            "target_mandi": hub["mandi"],
            "state": hub["state"],
            "distance_km": hub["distance_km"],
            "mandi_modal_price": mandi_price,
            "gross_spread": gross_spread,
            "freight_cost_qt": freight_cost,
            "net_gain_qt": net_spread,
            "roi_pct": roi_pct,
            "is_viable": is_viable,
            "recommendation": f"Ship to {hub['mandi']} for +₹{net_spread}/Qt net profit" if is_viable else "Local Mandi offers better net realization"
        })
        
    opportunities.sort(key=lambda x: x["net_gain_qt"], reverse=True)
    return opportunities
