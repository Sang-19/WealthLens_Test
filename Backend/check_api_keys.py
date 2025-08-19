#!/usr/bin/env python3
"""
Check if API keys in .env are valid by making minimal test requests
"""
import os
import sys
import requests
from dotenv import load_dotenv

def check_groq_api_key():
    """Test if the Groq API key is valid"""
    print("🔍 Testing Groq API key...")
    
    api_key = os.environ.get("GROQ_API_KEY")
    if not api_key:
        print("❌ GROQ_API_KEY not found in environment variables")
        return False
    
    try:
        headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
        
        # Making a minimal models list request to validate the key
        response = requests.get(
            "https://api.groq.com/v1/models",
            headers=headers,
            timeout=10
        )
        
        if response.status_code == 200:
            models = response.json().get("data", [])
            print(f"✅ Groq API key is valid! Found {len(models)} available models")
            return True
        else:
            print(f"❌ Groq API key validation failed with status code: {response.status_code}")
            print(f"Error: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Error testing Groq API key: {e}")
        return False

def check_tavily_api_key():
    """Test if the Tavily API key is valid"""
    print("\n🔍 Testing Tavily API key...")
    
    api_key = os.environ.get("TAVILY_API_KEY")
    if not api_key:
        print("❌ TAVILY_API_KEY not found in environment variables")
        return False
    
    try:
        # Simple search to validate the key
        data = {
            "api_key": api_key,
            "query": "What is the current year?",
            "search_depth": "basic",
            "max_results": 1
        }
        
        response = requests.post(
            "https://api.tavily.com/search",
            json=data,
            timeout=15
        )
        
        if response.status_code == 200:
            print("✅ Tavily API key is valid!")
            return True
        else:
            print(f"❌ Tavily API key validation failed with status code: {response.status_code}")
            print(f"Error: {response.text}")
            return False
            
    except Exception as e:
        print(f"❌ Error testing Tavily API key: {e}")
        return False

def main():
    """Main function to check all API keys"""
    print("🔐 WealthLens API Key Validation")
    print("=" * 50)
    
    # Load environment variables
    load_dotenv()
    print("📝 Loaded environment variables from .env file")
    
    # Check Groq API key
    groq_valid = check_groq_api_key()
    
    # Check Tavily API key
    tavily_valid = check_tavily_api_key()
    
    # Summary
    print("\n" + "=" * 50)
    print("📊 Validation Summary:")
    print(f"- Groq API Key: {'✅ Valid' if groq_valid else '❌ Invalid'}")
    print(f"- Tavily API Key: {'✅ Valid' if tavily_valid else '❌ Invalid'}")
    
    if groq_valid and tavily_valid:
        print("\n✨ All API keys are valid! You're ready to run the WealthLens backend.")
        return 0
    else:
        print("\n❗ Some API keys are invalid or missing. Please check your .env file.")
        return 1

if __name__ == "__main__":
    sys.exit(main())
