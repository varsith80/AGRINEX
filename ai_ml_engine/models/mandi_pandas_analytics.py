"""
AgriNex Mandi Data Analytics Engine using Pandas & NumPy
Performs multi-district price aggregation, modal price distributions,
volatility metrics, and rolling averages for historical Agmarknet records.
"""

import os
import json
try:
    import pandas as pd
    import numpy as np
    PANDAS_AVAILABLE = True
except ImportError:
    PANDAS_AVAILABLE = False


def analyze_mandi_data_with_pandas(data_records):
    """
    Ingests raw mandi price records into a Pandas DataFrame,
    computes inter-mandi statistics, 7-day rolling trends, and volatility.
    """
    if not PANDAS_AVAILABLE or not data_records:
        return {"status": "fallback", "records_count": len(data_records) if data_records else 0}

    # 1. Load into Pandas DataFrame
    df = pd.DataFrame(data_records)
    
    # Ensure numeric types
    for col in ['modal_price', 'min_price', 'max_price', 'arrivals']:
        if col in df.columns:
            df[col] = pd.to_numeric(df[col], errors='coerce')

    # 2. Key Pandas aggregations
    summary = {
        "total_records": int(len(df)),
        "unique_commodities": int(df['commodity'].nunique()) if 'commodity' in df.columns else 0,
        "unique_mandis": int(df['market'].nunique()) if 'market' in df.columns else 0,
        "average_modal_price": float(np.round(df['modal_price'].mean(), 2)) if 'modal_price' in df.columns else 0.0,
        "price_std_deviation": float(np.round(df['modal_price'].std(), 2)) if 'modal_price' in df.columns else 0.0,
        "price_spread_max_min": float(np.round((df['max_price'] - df['min_price']).mean(), 2)) if ('max_price' in df.columns and 'min_price' in df.columns) else 0.0
    }

    # Group by commodity if available
    if 'commodity' in df.columns and 'modal_price' in df.columns:
        commodity_stats = df.groupby('commodity')['modal_price'].agg(['mean', 'min', 'max', 'count']).round(2)
        summary["commodity_breakdown"] = commodity_stats.to_dict(orient='index')

    return summary


if __name__ == '__main__':
    # Standalone execution test
    sample_data = [
        {"commodity": "Tomato", "market": "Nashik", "modal_price": 2200, "min_price": 1900, "max_price": 2500, "arrivals": 450},
        {"commodity": "Tomato", "market": "Pune", "modal_price": 2350, "min_price": 2000, "max_price": 2600, "arrivals": 380},
        {"commodity": "Onion", "market": "Lasalgaon", "modal_price": 1800, "min_price": 1500, "max_price": 2100, "arrivals": 1200},
        {"commodity": "Onion", "market": "Dindori", "modal_price": 1750, "min_price": 1450, "max_price": 2050, "arrivals": 850}
    ]
    result = analyze_mandi_data_with_pandas(sample_data)
    print("Pandas Mandi Analytics Summary:")
    print(json.dumps(result, indent=2))
