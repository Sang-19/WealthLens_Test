#!/usr/bin/env python3
"""
Test script for Enhanced Web Search
"""
from enhanced_web_search import enhanced_web_search
import os
from dotenv import load_dotenv

load_dotenv()

def test_enhanced_search():
    """Test the enhanced web search system"""
    print("🧪 Testing Enhanced Web Search System")
    print("=" * 60)
    
    # Test queries
    test_queries = [
        "What are the latest trends in artificial intelligence?",
        "Current stock market conditions 2024",
        "Best investment strategies for beginners",
        "Latest news about cryptocurrency regulations"
    ]
    
    tavily_api_key = os.environ.get("TAVILY_API_KEY")
    if tavily_api_key:
        print("✅ TAVILY_API_KEY found - will use Tavily as primary source")
    else:
        print("⚠️ TAVILY_API_KEY not found - will use fallback search engines")
    
    print()
    
    for i, query in enumerate(test_queries, 1):
        print(f"🔍 Test {i}: {query}")
        print("-" * 40)
        
        try:
            result = enhanced_web_search.comprehensive_search(query, tavily_api_key)
            
            if result["success"]:
                print(f"✅ Search successful!")
                print(f"   Sources: {', '.join(result['sources_used'])}")
                print(f"   Results: {result['total_results']}")
                
                # Show first result
                if result["results"]:
                    first_result = result["results"][0]
                    print(f"   Top result: {first_result['title'][:60]}...")
                
                # Format and show results
                formatted = enhanced_web_search.format_search_results(result)
                print("\n📋 Formatted Results:")
                print(formatted[:500] + "..." if len(formatted) > 500 else formatted)
                
            else:
                print(f"❌ Search failed: {result['message']}")
                
        except Exception as e:
            print(f"❌ Error during search: {e}")
        
        print("\n" + "=" * 60 + "\n")
    
    print("✨ Enhanced web search testing completed!")

if __name__ == "__main__":
    test_enhanced_search()
