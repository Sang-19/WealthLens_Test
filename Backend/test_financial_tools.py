#!/usr/bin/env python3
"""
Test script for Enhanced Financial Tools
"""
from enhanced_financial_tools import enhanced_financial_tools

def test_financial_tools():
    """Test the enhanced financial tools"""
    print("🧪 Testing Enhanced Financial Tools")
    print("=" * 50)
    
    # Test 1: Indian Stock (RELIANCE)
    print("\n1. Testing Indian Stock (RELIANCE)...")
    result = enhanced_financial_tools.get_indian_stock_price("RELIANCE")
    if result["success"]:
        print("✅ Success!")
        print(enhanced_financial_tools.format_stock_response(result))
    else:
        print(f"❌ Failed: {result['message']}")
    
    # Test 2: Global Stock (AAPL)
    print("\n2. Testing Global Stock (AAPL)...")
    result = enhanced_financial_tools.get_global_stock_price("AAPL")
    if result["success"]:
        print("✅ Success!")
        print(enhanced_financial_tools.format_stock_response(result))
    else:
        print(f"❌ Failed: {result['message']}")
    
    # Test 3: Market Indices
    print("\n3. Testing Market Indices...")
    result = enhanced_financial_tools.get_market_indices()
    if result["success"]:
        print("✅ Success!")
        print(f"Fetched {len(result['data'])} indices")
        for name, data in list(result['data'].items())[:3]:  # Show first 3
            print(f"  {name}: {data.get('current_price', 'N/A')}")
    else:
        print(f"❌ Failed: {result['message']}")
    
    # Test 4: Crypto (Bitcoin)
    print("\n4. Testing Crypto (Bitcoin)...")
    result = enhanced_financial_tools.get_crypto_price("BTC")
    if result["success"]:
        print("✅ Success!")
        print(enhanced_financial_tools.format_stock_response(result))
    else:
        print(f"❌ Failed: {result['message']}")
    
    print("\n" + "=" * 50)
    print("✨ Financial tools test completed!")

if __name__ == "__main__":
    test_financial_tools()
