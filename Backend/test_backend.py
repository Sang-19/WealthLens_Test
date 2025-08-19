#!/usr/bin/env python3
"""
Simple test script to verify the WealthLens backend is working
"""
import requests
import json
import time

def test_backend():
    """Test the backend endpoints"""
    base_url = "http://localhost:8000"
    
    print("🧪 Testing WealthLens Backend")
    print("=" * 40)
    
    # Test 1: Health endpoint
    print("1. Testing health endpoint...")
    try:
        response = requests.get(f"{base_url}/health", timeout=5)
        if response.status_code == 200:
            print("✅ Health endpoint working")
            print(f"   Response: {response.json()}")
        else:
            print(f"❌ Health endpoint failed: {response.status_code}")
    except Exception as e:
        print(f"❌ Health endpoint error: {e}")
    
    print()
    
    # Test 2: Query endpoint
    print("2. Testing query endpoint...")
    try:
        test_data = {
            "query": "What is a Roth IRA?",
            "deep_search": False
        }
        
        response = requests.post(
            f"{base_url}/query",
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Query endpoint working")
            print(f"   Response preview: {result['answer']['answer'][:100]}...")
        else:
            print(f"❌ Query endpoint failed: {response.status_code}")
            print(f"   Error: {response.text}")
    except Exception as e:
        print(f"❌ Query endpoint error: {e}")
    
    print()
    print("=" * 40)
    print("✨ Backend test completed!")

if __name__ == "__main__":
    test_backend()
