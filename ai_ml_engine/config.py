"""
AgriNex AI/ML Engine Configuration
Stores official data.gov.in API credentials and endpoint definitions.
"""

import os

# Official data.gov.in API Key provided by user
DATA_GOV_API_KEY = os.environ.get("DATA_GOV_API_KEY", "579b464db66ec23bdd000001d9d2fce205b649d55faad2450db99e9a")

# Official Agmarknet Daily Mandi Prices & Arrivals Resource ID
AGMARKNET_RESOURCE_ID = "9ef84268-d588-465a-a308-a864a43d0070"
DATA_GOV_API_BASE = f"https://api.data.gov.in/resource/{AGMARKNET_RESOURCE_ID}"
