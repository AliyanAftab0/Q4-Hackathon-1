import requests
import json

# Test the /ask endpoint
url = "http://localhost:8000/ask"
data = {
    "query": "What is ROS?",
    "selected_text": None
}

try:
    response = requests.post(url, json=data)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")
