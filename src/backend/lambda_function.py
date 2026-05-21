import json
import os
import urllib.request
from datetime import datetime, timedelta

EIA_API_KEY = os.environ.get("EIA_API_KEY")
EIA_BASE_URL = "https://api.eia.gov/v2/petroleum/pri/gnd/data/"
AREAS = ["NUS", "R10", "R20", "R30", "R40", "R50"]

def build_eia_url(weeks: int) -> str:
    start_date = (datetime.now - timedelta(weeks=weeks)).strftime("%Y-%m-%d")

    params = [
        f"api_key={EIA_API_KEY}",
        "frequency=weekly",
        "data[0]=value",
        "facets[product][]=EPMO",
        "sort[0][column]=period",
        "sort[0][direction]=desc",
        f"start={start_date}",
        "length=5000",
    ]

    for area in AREAS:
        params.append(f"facets[duoarea][]={area}")
    
    return f"{EIA_BASE_URL}?{'&'.join(params)}"

def lambda_handler(event, context):
    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET,OPTIONS",
        "Content-Type": "application/json"
    }

    if event.get("requestContext", {}).get("http", {}).get("method") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}
    
    try:
        query_params = event.get("queryStringParameters") or {}
        weeks = int(query_params.get("weeks", 52))
        weeks = max(4, min(weeks, 260))

        url = build_eia_url(weeks)

        with urllib.request.urlopen(url) as response:
            raw = json.loads(response.read().decode())

        data = raw.get("response", {}).get("data", [])

        return {
            "statusCode": 200,
            "headers": cors_headers,
            "body": json.dumps(data),
        }
    
    except Exception as e:
        return{
            "statusCode": 500,
            "headers": cors_headers,
            "body": json.dumps({"error": str(e)})
        }