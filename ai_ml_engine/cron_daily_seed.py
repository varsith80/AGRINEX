"""
AgriNex Automated Daily Mandi Ingestion & ML Seeding Cron
Can be scheduled via Windows Task Scheduler or cron daemon to run every morning at 06:00 AM.
"""

import time
from pipeline import run_pipeline

if __name__ == "__main__":
    print("[Cron Scheduler] Executing daily AgriNex AI/ML Mandi Data Seed...")
    payload = run_pipeline()
    print(f"[Cron Scheduler] Completed at {payload['metadata']['generated_at']}. Live market insights updated.")
