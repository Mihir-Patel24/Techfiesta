// ==================== MULTILINGUAL SUPPORT SYSTEM ====================

const translations = {
  "en-IN": {
    // Common UI elements
    "analyzing": "Analyzing...",
    "loading": "Loading...",
    "error": "Error occurred",
    "success": "Success",
    "upload_image": "Upload Image",
    "start_quiz": "Start Quiz",
    "next_question": "Next Question",
    "treatment_recommendations": "Treatment Recommendations",
    
    // Disease detection
    "disease_detected": "Disease Detected",
    "confidence": "Confidence",
    "symptoms_match": "Symptoms Match",
    "immediate_treatment": "Immediate Treatment",
    "fertilizer_recommendation": "Fertilizer Recommendation",
    "prevention_tips": "Prevention Tips",
    "weather_consideration": "Weather Consideration",
    
    // Common farming terms
    "healthy_crop": "Healthy Crop",
    "leaf_blight": "Leaf Blight",
    "powdery_mildew": "Powdery Mildew",
    "rust_disease": "Rust Disease",
    
    // Voice messages
    "voice_mode_activated": "Voice mode activated. How can I help you with farming?",
    "listening": "Listening...",
    "speak_question": "Speak your question",
    "stop_listening": "Stop listening"
  },
  
  "hi-IN": {
    // Common UI elements
    "analyzing": "विश्लेषण कर रहे हैं...",
    "loading": "लोड हो रहा है...",
    "error": "त्रुटि हुई",
    "success": "सफलता",
    "upload_image": "छवि अपलोड करें",
    "start_quiz": "प्रश्नोत्तरी शुरू करें",
    "next_question": "अगला प्रश्न",
    "treatment_recommendations": "उपचार सुझाव",
    
    // Disease detection
    "disease_detected": "बीमारी की पहचान",
    "confidence": "विश्वसनीयता",
    "symptoms_match": "लक्षण मेल",
    "immediate_treatment": "तत्काल उपचार",
    "fertilizer_recommendation": "खाद की सिफारिश",
    "prevention_tips": "बचाव के तरीके",
    "weather_consideration": "मौसम संबंधी सावधानी",
    
    // Common farming terms
    "healthy_crop": "स्वस्थ फसल",
    "leaf_blight": "पत्ती झुलसा रोग",
    "powdery_mildew": "चूर्णी फफूंदी",
    "rust_disease": "रतुआ रोग",
    
    // Voice messages
    "voice_mode_activated": "आवाज मोड सक्रिय। खेती में मैं आपकी कैसे मदद कर सकता हूं?",
    "listening": "सुन रहे हैं...",
    "speak_question": "अपना प्रश्न बोलें",
    "stop_listening": "सुनना बंद करें"
  },
  
  "mr-IN": {
    // Common UI elements
    "analyzing": "विश्लेषण करत आहे...",
    "loading": "लोड होत आहे...",
    "error": "त्रुटी झाली",
    "success": "यश",
    "upload_image": "प्रतिमा अपलोड करा",
    "start_quiz": "प्रश्नमंजुषा सुरू करा",
    "next_question": "पुढील प्रश्न",
    "treatment_recommendations": "उपचार शिफारसी",
    
    // Disease detection
    "disease_detected": "आजाराची ओळख",
    "confidence": "विश्वसनीयता",
    "symptoms_match": "लक्षणे जुळतात",
    "immediate_treatment": "तात्काळ उपचार",
    "fertilizer_recommendation": "खताची शिफारस",
    "prevention_tips": "प्रतिबंधक उपाय",
    "weather_consideration": "हवामान संबंधी सावधगिरी",
    
    // Common farming terms
    "healthy_crop": "निरोगी पीक",
    "leaf_blight": "पान जळजळीत रोग",
    "powdery_mildew": "पांढरी बुरशी",
    "rust_disease": "गंजा रोग",
    
    // Voice messages
    "voice_mode_activated": "आवाज मोड सक्रिय. शेतीत मी तुमची कशी मदत करू शकतो?",
    "listening": "ऐकत आहे...",
    "speak_question": "तुमचा प्रश्न बोला",
    "stop_listening": "ऐकणे थांबवा"
  }
};

// ==================== TRANSLATION FUNCTIONS ====================

function translate(key, lang = null) {
  if (!lang) {
    const langSelect = document.getElementById("languageSelect");
    lang = langSelect ? langSelect.value : "en-IN";
  }
  
  return translations[lang] && translations[lang][key] 
    ? translations[lang][key] 
    : translations["en-IN"][key] || key;
}

function updatePageLanguage() {
  const lang = document.getElementById("languageSelect").value;
  
  // Update all elements with data-translate attribute
  document.querySelectorAll("[data-translate]").forEach(element => {
    const key = element.getAttribute("data-translate");
    element.textContent = translate(key, lang);
  });
  
  // Update placeholders
  document.querySelectorAll("[data-translate-placeholder]").forEach(element => {
    const key = element.getAttribute("data-translate-placeholder");
    element.placeholder = translate(key, lang);
  });
}

// ==================== LANGUAGE CHANGE HANDLER ====================
document.addEventListener("DOMContentLoaded", function() {
  const languageSelect = document.getElementById("languageSelect");
  if (languageSelect) {
    languageSelect.addEventListener("change", updatePageLanguage);
    updatePageLanguage(); // Initial update
  }
});

// ==================== WEATHER-AWARE MESSAGING ====================
function getWeatherAwareMessage(lang, weatherCondition = "normal") {
  const weatherMessages = {
    "en-IN": {
      "rainy": "⛈️ Rainy weather detected. Avoid spraying pesticides. Focus on drainage and fungal disease prevention.",
      "hot": "🌡️ High temperature alert. Increase watering frequency and provide shade for sensitive crops.",
      "humid": "💧 High humidity conditions. Monitor for fungal diseases and ensure good air circulation.",
      "normal": "🌤️ Weather conditions are favorable for farming activities."
    },
    "hi-IN": {
      "rainy": "⛈️ बारिश का मौसम। कीटनाशक का छिड़काव न करें। जल निकासी और फंगल रोग की रोकथाम पर ध्यान दें।",
      "hot": "🌡️ उच्च तापमान चेतावनी। पानी देने की आवृत्ति बढ़ाएं और संवेदनशील फसलों को छाया प्रदान करें।",
      "humid": "💧 उच्च आर्द्रता की स्थिति। फंगल रोगों की निगरानी करें और अच्छी हवा का संचार सुनिश्चित करें।",
      "normal": "🌤️ मौसम की स्थिति खेती की गतिविधियों के लिए अनुकूल है।"
    },
    "mr-IN": {
      "rainy": "⛈️ पावसाळी हवामान आढळले. कीटकनाशकांची फवारणी टाळा. पाणी निचरा आणि बुरशीजन्य रोग प्रतिबंधावर लक्ष द्या.",
      "hot": "🌡️ उच्च तापमान इशारा. पाणी देण्याची वारंवारता वाढवा आणि संवेदनशील पिकांना सावली द्या.",
      "humid": "💧 उच्च आर्द्रता परिस्थिती. बुरशीजन्य रोगांचे निरीक्षण करा आणि चांगली हवा फिरवणे सुनिश्चित करा.",
      "normal": "🌤️ हवामान परिस्थिती शेती कामांसाठी अनुकूल आहे."
    }
  };
  
  return weatherMessages[lang][weatherCondition] || weatherMessages["en-IN"][weatherCondition];
}

// ==================== REGION-SPECIFIC RECOMMENDATIONS ====================
function getRegionalRecommendations(lang, region = "general") {
  const regionalData = {
    "en-IN": {
      "maharashtra": "🏞️ Maharashtra region: Focus on cotton, sugarcane, and soybean. Monsoon-dependent farming. Use drip irrigation during dry spells.",
      "punjab": "🌾 Punjab region: Wheat-rice rotation system. Monitor for stem borer in rice and aphids in wheat. Use integrated pest management.",
      "karnataka": "☕ Karnataka region: Coffee, spices, and millets. Shade management important for coffee. Organic farming practices recommended.",
      "general": "🇮🇳 General India: Adapt farming practices to local climate and soil conditions. Consult local agricultural extension officers."
    },
    "hi-IN": {
      "maharashtra": "🏞️ महाराष्ट्र क्षेत्र: कपास, गन्ना और सोयाबीन पर ध्यान दें। मानसून पर निर्भर खेती। सूखे के दौरान ड्रिप सिंचाई का उपयोग करें।",
      "punjab": "🌾 पंजाब क्षेत्र: गेहूं-चावल रोटेशन सिस्टम। चावल में तना छेदक और गेहूं में माहू की निगरानी करें।",
      "karnataka": "☕ कर्नाटक क्षेत्र: कॉफी, मसाले और बाजरा। कॉफी के लिए छाया प्रबंधन महत्वपूर्ण। जैविक खेती की सिफारिश।",
      "general": "🇮🇳 सामान्य भारत: स्थानीय जलवायु और मिट्टी की स्थिति के अनुसार खेती के तरीकों को अपनाएं।"
    },
    "mr-IN": {
      "maharashtra": "🏞️ महाराष्ट्र प्रदेश: कापूस, ऊस आणि सोयाबीनवर लक्ष द्या. पावसावर अवलंबून शेती. कोरड्या काळात ठिबक सिंचनाचा वापर करा.",
      "punjab": "🌾 पंजाब प्रदेश: गहू-तांदूळ रोटेशन सिस्टम. तांदूळात खोड छेदक आणि गहूंमध्ये माशीचे निरीक्षण करा.",
      "karnataka": "☕ कर्नाटक प्रदेश: कॉफी, मसाले आणि बाजरी. कॉफीसाठी सावली व्यवस्थापन महत्वाचे. सेंद्रिय शेतीची शिफारस.",
      "general": "🇮🇳 सामान्य भारत: स्थानिक हवामान आणि मातीच्या परिस्थितीनुसार शेती पद्धती स्वीकारा."
    }
  };
  
  return regionalData[lang][region] || regionalData["en-IN"][region];
}