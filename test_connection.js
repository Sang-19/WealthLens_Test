#!/usr/bin/env node
/**
 * Test script to verify frontend-backend connection
 * Run this with: node test_connection.js
 */

const API_BASE_URL = 'http://localhost:8000';

async function testConnection() {
    // Dynamic import for node-fetch
    const { default: fetch } = await import('node-fetch');
    console.log('🧪 Testing WealthLens Frontend-Backend Connection');
    console.log('=' * 50);
    
    // Test 1: Health Check
    console.log('\n1️⃣ Testing Health Check Endpoint...');
    try {
        const healthResponse = await fetch(`${API_BASE_URL}/health`);
        if (healthResponse.ok) {
            const healthData = await healthResponse.json();
            console.log('✅ Health check passed:', healthData);
        } else {
            console.log('❌ Health check failed:', healthResponse.status);
        }
    } catch (error) {
        console.log('❌ Health check error:', error.message);
    }
    
    // Test 2: Test Endpoint
    console.log('\n2️⃣ Testing Test Endpoint...');
    try {
        const testResponse = await fetch(`${API_BASE_URL}/test`);
        if (testResponse.ok) {
            const testData = await testResponse.json();
            console.log('✅ Test endpoint passed:', testData);
        } else {
            console.log('❌ Test endpoint failed:', testResponse.status);
        }
    } catch (error) {
        console.log('❌ Test endpoint error:', error.message);
    }
    
    // Test 3: Query Endpoint
    console.log('\n3️⃣ Testing Query Endpoint...');
    try {
        const queryResponse = await fetch(`${API_BASE_URL}/query`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: 'Hello, can you help me with my finances?',
                deep_search: false
            })
        });
        
        if (queryResponse.ok) {
            const queryData = await queryResponse.json();
            console.log('✅ Query endpoint passed:');
            console.log('   Response:', queryData.answer.answer);
        } else {
            console.log('❌ Query endpoint failed:', queryResponse.status);
        }
    } catch (error) {
        console.log('❌ Query endpoint error:', error.message);
    }
    
    // Test 4: Deep Search Query
    console.log('\n4️⃣ Testing Deep Search Query...');
    try {
        const deepSearchResponse = await fetch(`${API_BASE_URL}/query`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: 'What are the best investment strategies for 2024?',
                deep_search: true
            })
        });
        
        if (deepSearchResponse.ok) {
            const deepSearchData = await deepSearchResponse.json();
            console.log('✅ Deep search query passed:');
            console.log('   Response:', deepSearchData.answer.answer);
        } else {
            console.log('❌ Deep search query failed:', deepSearchResponse.status);
        }
    } catch (error) {
        console.log('❌ Deep search query error:', error.message);
    }
    
    console.log('\n🎉 Connection test completed!');
    console.log('\n📝 Next steps:');
    console.log('1. Start the frontend: cd Frontend && npm start');
    console.log('2. Test the chat functionality in the app');
    console.log('3. Check that messages are sent to and received from the backend');
}

// Run the test
testConnection().catch(console.error);
