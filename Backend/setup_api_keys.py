#!/usr/bin/env python3
"""
API Keys Setup Script for WealthLens Backend
This script helps you configure the required API keys for the full backend.
"""

import os
import sys
from pathlib import Path

def print_header():
    print("🔑 WealthLens Backend API Keys Setup")
    print("=" * 50)

def print_api_requirements():
    print("\n📋 Required API Keys:")
    print("-" * 30)
    print("1. GROQ_API_KEY (Required)")
    print("   - Used for: AI language model (Llama)")
    print("   - Get from: https://console.groq.com/keys")
    print("   - Free tier available")
    print()
    print("2. TAVILY_API_KEY (Required)")
    print("   - Used for: Web search and real-time data")
    print("   - Get from: https://app.tavily.com/")
    print("   - Free tier: 1000 searches/month")
    print()
    print("3. OPENAI_API_KEY (Optional)")
    print("   - Used for: Alternative AI model")
    print("   - Get from: https://platform.openai.com/api-keys")
    print("   - Paid service")

def check_env_file():
    env_file = Path(".env")
    if not env_file.exists():
        print("❌ .env file not found!")
        print("Creating .env file from template...")
        
        env_example = Path(".env.example")
        if env_example.exists():
            import shutil
            shutil.copy(env_example, env_file)
            print("✅ .env file created from .env.example")
        else:
            print("❌ .env.example not found. Please create .env file manually.")
            return False
    else:
        print("✅ .env file found")
    return True

def read_current_keys():
    """Read current API keys from .env file"""
    keys = {}
    try:
        with open(".env", "r") as f:
            for line in f:
                line = line.strip()
                if "=" in line and not line.startswith("#"):
                    key, value = line.split("=", 1)
                    keys[key.strip()] = value.strip()
    except Exception as e:
        print(f"Error reading .env file: {e}")
    return keys

def update_env_file(key, value):
    """Update a specific key in the .env file"""
    try:
        # Read all lines
        with open(".env", "r") as f:
            lines = f.readlines()
        
        # Update the specific key
        updated = False
        for i, line in enumerate(lines):
            if line.strip().startswith(f"{key}="):
                lines[i] = f"{key}={value}\n"
                updated = True
                break
        
        # If key not found, add it
        if not updated:
            lines.append(f"{key}={value}\n")
        
        # Write back to file
        with open(".env", "w") as f:
            f.writelines(lines)
        
        return True
    except Exception as e:
        print(f"Error updating .env file: {e}")
        return False

def setup_groq_key():
    print("\n🤖 Setting up GROQ API Key")
    print("-" * 30)
    print("1. Go to: https://console.groq.com/keys")
    print("2. Sign up/Login (free)")
    print("3. Create a new API key")
    print("4. Copy the key (starts with 'gsk_')")
    print()
    
    current_keys = read_current_keys()
    current_key = current_keys.get("GROQ_API_KEY", "")
    
    if current_key and current_key != "your_groq_api_key_here":
        print(f"Current GROQ key: {current_key[:20]}...")
        choice = input("Do you want to update it? (y/n): ").lower()
        if choice != 'y':
            return True
    
    while True:
        key = input("Enter your GROQ API key: ").strip()
        if not key:
            print("❌ Key cannot be empty!")
            continue
        if not key.startswith("gsk_"):
            print("⚠️  GROQ keys usually start with 'gsk_'. Are you sure this is correct?")
            confirm = input("Continue anyway? (y/n): ").lower()
            if confirm != 'y':
                continue
        
        if update_env_file("GROQ_API_KEY", key):
            print("✅ GROQ API key saved!")
            return True
        else:
            print("❌ Failed to save key. Please try again.")

def setup_tavily_key():
    print("\n🔍 Setting up TAVILY API Key")
    print("-" * 30)
    print("1. Go to: https://app.tavily.com/")
    print("2. Sign up/Login (free)")
    print("3. Go to API Keys section")
    print("4. Copy your API key (starts with 'tvly-')")
    print()
    
    current_keys = read_current_keys()
    current_key = current_keys.get("TAVILY_API_KEY", "")
    
    if current_key and current_key != "your_tavily_api_key_here":
        print(f"Current TAVILY key: {current_key[:20]}...")
        choice = input("Do you want to update it? (y/n): ").lower()
        if choice != 'y':
            return True
    
    while True:
        key = input("Enter your TAVILY API key: ").strip()
        if not key:
            print("❌ Key cannot be empty!")
            continue
        if not key.startswith("tvly-"):
            print("⚠️  TAVILY keys usually start with 'tvly-'. Are you sure this is correct?")
            confirm = input("Continue anyway? (y/n): ").lower()
            if confirm != 'y':
                continue
        
        if update_env_file("TAVILY_API_KEY", key):
            print("✅ TAVILY API key saved!")
            return True
        else:
            print("❌ Failed to save key. Please try again.")

def setup_openai_key():
    print("\n🧠 Setting up OpenAI API Key (Optional)")
    print("-" * 30)
    print("This is optional. You can skip this if you only want to use GROQ.")
    
    choice = input("Do you want to set up OpenAI API key? (y/n): ").lower()
    if choice != 'y':
        print("⏭️  Skipping OpenAI setup")
        return True
    
    print("1. Go to: https://platform.openai.com/api-keys")
    print("2. Sign up/Login (requires payment)")
    print("3. Create a new API key")
    print("4. Copy the key (starts with 'sk-')")
    print()
    
    while True:
        key = input("Enter your OpenAI API key (or press Enter to skip): ").strip()
        if not key:
            print("⏭️  Skipping OpenAI setup")
            return True
        
        if not key.startswith("sk-"):
            print("⚠️  OpenAI keys usually start with 'sk-'. Are you sure this is correct?")
            confirm = input("Continue anyway? (y/n): ").lower()
            if confirm != 'y':
                continue
        
        if update_env_file("OPENAI_API_KEY", key):
            print("✅ OpenAI API key saved!")
            return True
        else:
            print("❌ Failed to save key. Please try again.")

def test_api_keys():
    print("\n🧪 Testing API Keys")
    print("-" * 30)
    
    try:
        from dotenv import load_dotenv
        load_dotenv()
        
        groq_key = os.environ.get("GROQ_API_KEY")
        tavily_key = os.environ.get("TAVILY_API_KEY")
        
        if not groq_key or groq_key == "your_groq_api_key_here":
            print("❌ GROQ API key not set properly")
            return False
        else:
            print(f"✅ GROQ API key: {groq_key[:20]}...")
        
        if not tavily_key or tavily_key == "your_tavily_api_key_here":
            print("❌ TAVILY API key not set properly")
            return False
        else:
            print(f"✅ TAVILY API key: {tavily_key[:20]}...")
        
        print("✅ All required API keys are configured!")
        return True
        
    except Exception as e:
        print(f"❌ Error testing API keys: {e}")
        return False

def main():
    print_header()
    print_api_requirements()
    
    if not check_env_file():
        sys.exit(1)
    
    print("\n🚀 Let's set up your API keys!")
    print("You can get these for free from the respective websites.")
    
    # Setup required keys
    if not setup_groq_key():
        print("❌ Failed to setup GROQ key")
        sys.exit(1)
    
    if not setup_tavily_key():
        print("❌ Failed to setup TAVILY key")
        sys.exit(1)
    
    # Setup optional key
    setup_openai_key()
    
    # Test the keys
    if test_api_keys():
        print("\n🎉 API Keys Setup Complete!")
        print("=" * 50)
        print("✅ Your backend is now ready to run with full AI capabilities!")
        print()
        print("📝 Next steps:")
        print("1. Run: python run.py")
        print("2. Test at: http://localhost:8000/health")
        print("3. Use the chat feature in your frontend")
        print()
        print("🔧 The full backend includes:")
        print("• Advanced AI responses using Llama models")
        print("• Real-time web search capabilities")
        print("• Deep research mode")
        print("• Financial data integration")
        print("• Knowledge base retrieval")
    else:
        print("\n❌ API Keys setup incomplete. Please check your keys and try again.")
        sys.exit(1)

if __name__ == "__main__":
    main()
