// ==================== SOILSYNC FEATURE TEST SCRIPT ====================

async function testAllFeatures() {
    console.log('🧪 Testing SoilSync Features...');
    
    const results = {
        backend: false,
        disease: false,
        weather: false,
        chatbot: false,
        voice: false
    };
    
    // Test 1: Backend Connection
    try {
        const response = await fetch('http://localhost:5000/api/chatbot/query', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: 'test', language: 'en-IN' })
        });
        results.backend = response.ok;
        console.log('✅ Backend:', results.backend ? 'Connected' : 'Failed');
    } catch (e) {
        console.log('❌ Backend: Not running');
    }
    
    // Test 2: Disease Detection
    try {
        const response = await fetch('http://localhost:5000/api/disease/detect-symptoms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ symptoms: ['brown_spots', 'yellowing'] })
        });
        results.disease = response.ok;
        console.log('✅ Disease Detection:', results.disease ? 'Working' : 'Failed');
    } catch (e) {
        console.log('❌ Disease Detection: Failed');
    }
    
    // Test 3: Weather Service
    try {
        const response = await fetch('http://localhost:5000/api/weather/current', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ city: 'Mumbai' })
        });
        results.weather = response.ok;
        console.log('✅ Weather Service:', results.weather ? 'Working' : 'Failed');
    } catch (e) {
        console.log('❌ Weather Service: Failed');
    }
    
    // Test 4: Voice Recognition
    results.voice = 'webkitSpeechRecognition' in window && 'speechSynthesis' in window;
    console.log('✅ Voice Features:', results.voice ? 'Supported' : 'Not Supported');
    
    // Summary
    const working = Object.values(results).filter(Boolean).length;
    const total = Object.keys(results).length;
    
    console.log(`\n📊 Test Results: ${working}/${total} features working`);
    
    if (working === total) {
        console.log('🎉 All features are working perfectly!');
    } else {
        console.log('⚠️ Some features need attention');
    }
    
    return results;
}

// Auto-run test when page loads
if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
        setTimeout(testAllFeatures, 2000);
    });
}

// Export for manual testing
if (typeof module !== 'undefined') {
    module.exports = { testAllFeatures };
}