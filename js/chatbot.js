// ==================== ENHANCED AI CHATBOT WITH BACKEND INTEGRATION ====================

const API_BASE_URL = '/api';

let recognition = null;
let isListening = false;
let conversationHistory = [];

// Enhanced farming knowledge with more comprehensive responses
const farmingKnowledge = {
  "disease": {
    keywords: ["disease", "infection", "spots", "fungus", "pest", "bug", "sick", "problem", "leaf", "blight"],
    responses: {
      "en-IN": "I can help identify crop diseases! 🔬 Upload a leaf image for AI analysis or take our symptom quiz. I'll provide treatment recommendations with organic alternatives.",
      "hi-IN": "मैं फसल रोगों की पहचान में मदद कर सकता हूं! 🔬 AI विश्लेषण के लिए पत्ते की तस्वीर अपलोड करें या हमारी लक्षण प्रश्नोत्तरी लें।",
      "mr-IN": "मी पीक रोगांची ओळख करण्यात मदत करू शकतो! 🔬 AI विश्लेषणासाठी पानाचा फोटो अपलोड करा किंवा आमची लक्षण प्रश्नमंजुषा घ्या."
    }
  },
  "fertilizer": {
    keywords: ["fertilizer", "nutrients", "npk", "organic", "compost", "manure", "growth", "feed"],
    responses: {
      "en-IN": "For optimal crop nutrition 🌱 I recommend balanced NPK fertilizers. Organic options include vermicompost, cow dung, and neem cake. What's your crop type?",
      "hi-IN": "इष्टतम फसल पोषण के लिए 🌱 मैं संतुलित NPK उर्वरकों की सिफारिश करता हूं। जैविक विकल्पों में वर्मीकंपोस्ट, गोबर और नीम खली शामिल हैं।",
      "mr-IN": "इष्टतम पीक पोषणासाठी 🌱 मी संतुलित NPK खतांची शिफारस करतो. सेंद्रिय पर्यायांमध्ये व्हर्मीकंपोस्ट, शेण आणि कडूलिंबाची खल समाविष्ट आहे."
    }
  },
  "weather": {
    keywords: ["weather", "rain", "temperature", "humidity", "climate", "season", "forecast"],
    responses: {
      "en-IN": "Weather greatly impacts farming! 🌦️ I provide real-time weather data, forecasts, and farming advice. Which location do you need weather for?",
      "hi-IN": "मौसम खेती को बहुत प्रभावित करता है! 🌦️ मैं वास्तविक समय मौसम डेटा, पूर्वानुमान और कृषि सलाह प्रदान करता हूं।",
      "mr-IN": "हवामान शेतीवर मोठा परिणाम करते! 🌦️ मी रिअल-टाइम हवामान डेटा, अंदाज आणि शेती सल्ला प्रदान करतो."
    }
  },
  "crop": {
    keywords: ["crop", "plant", "grow", "seed", "harvest", "yield", "farming", "cultivation"],
    responses: {
      "en-IN": "I can guide you through crop selection, planting schedules, and best practices! 🌾 Consider your soil type, climate, and market demand. What crop interests you?",
      "hi-IN": "मैं फसल चयन, रोपण कार्यक्रम और सर्वोत्तम प्रथाओं के माध्यम से आपका मार्गदर्शन कर सकता हूं! 🌾 अपनी मिट्टी, जलवायु और बाजार की मांग पर विचार करें।",
      "mr-IN": "मी पीक निवड, लागवड वेळापत्रक आणि सर्वोत्तम पद्धतींद्वारे तुमचे मार्गदर्शन करू शकतो! 🌾 तुमची माती, हवामान आणि बाजारातील मागणी विचारात घ्या."
    }
  }
};

// ==================== ENHANCED MESSAGE HANDLING ====================
async function sendMessage() {
  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");
  const langSelect = document.getElementById("languageSelect");

  if (!input || !chatBox || !langSelect) return;
  if (input.value.trim() === "") return;

  const userText = input.value;
  const lang = langSelect.value;

  // Add user message to chat
  addMessageToChat(userText, 'user');
  
  // Add to conversation history
  conversationHistory.push({ role: 'user', message: userText, timestamp: new Date() });

  // Show typing indicator
  const typingId = addTypingIndicator();
  
  try {
    // Call backend API for intelligent response
    const response = await fetch(`${API_BASE_URL}/chatbot/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        query: userText, 
        language: lang,
        context: { history: conversationHistory.slice(-5) } // Last 5 messages for context
      })
    });
    
    if (!response.ok) {
      throw new Error('Backend API error');
    }
    
    const data = await response.json();
    
    removeTypingIndicator(typingId);
    
    if (data.status === 'success') {
      const botResponse = data.response.text;
      addMessageToChat(botResponse, 'bot');
      
      // Add suggestions if available
      if (data.response.suggestions && data.response.suggestions.length > 0) {
        addSuggestionsToChat(data.response.suggestions);
      }
      
      // Speak response
      speak(botResponse);
      
      // Add to conversation history
      conversationHistory.push({ role: 'bot', message: botResponse, timestamp: new Date() });
    } else {
      throw new Error(data.error || 'Unknown error');
    }
    
  } catch (error) {
    console.error('Chatbot API error:', error);
    removeTypingIndicator(typingId);
    
    // Fallback to local AI response
    const fallbackResponse = generateLocalAIResponse(userText, lang);
    addMessageToChat(fallbackResponse.text, 'bot');
    
    if (fallbackResponse.suggestions) {
      addSuggestionsToChat(fallbackResponse.suggestions);
    }
    
    speak(fallbackResponse.text);
  }

  input.value = "";
}

function addMessageToChat(message, sender) {
  const chatBox = document.getElementById("chatBox");
  const messageDiv = document.createElement('div');
  messageDiv.className = sender === 'user' ? 'user-msg' : 'bot-msg';
  
  // Add timestamp
  const timestamp = new Date().toLocaleTimeString('en-IN', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
  
  messageDiv.innerHTML = `
    <div class="message-content">${message}</div>
    <div class="message-time">${timestamp}</div>
  `;
  
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function addTypingIndicator() {
  const chatBox = document.getElementById("chatBox");
  const typingDiv = document.createElement('div');
  const typingId = 'typing-' + Date.now();
  
  typingDiv.id = typingId;
  typingDiv.className = 'bot-msg typing';
  typingDiv.innerHTML = `
    <div class="typing-animation">
      <span></span><span></span><span></span>
    </div>
    <div class="typing-text">🤖 AI is thinking...</div>
  `;
  
  chatBox.appendChild(typingDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
  
  return typingId;
}

function removeTypingIndicator(typingId) {
  const typingElement = document.getElementById(typingId);
  if (typingElement) {
    typingElement.remove();
  }
}

function addSuggestionsToChat(suggestions) {
  const chatBox = document.getElementById("chatBox");
  const suggestionsDiv = document.createElement('div');
  suggestionsDiv.className = 'suggestions-container';
  
  let suggestionsHTML = '<div class="suggestions-title">💡 Quick Actions:</div><div class="suggestions-buttons">';
  
  suggestions.forEach(suggestion => {
    suggestionsHTML += `<button class="suggestion-btn" onclick="handleSuggestion('${suggestion}')">${suggestion}</button>`;
  });
  
  suggestionsHTML += '</div>';
  suggestionsDiv.innerHTML = suggestionsHTML;
  
  chatBox.appendChild(suggestionsDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function handleSuggestion(suggestion) {
  document.getElementById("userInput").value = suggestion;
  sendMessage();
}

// ==================== LOCAL AI RESPONSE GENERATION ====================
function generateLocalAIResponse(userText, lang) {
  const queryLower = userText.toLowerCase();
  
  // Find the best matching category
  let bestMatch = "general";
  let maxMatches = 0;
  
  Object.keys(farmingKnowledge).forEach(category => {
    const keywords = farmingKnowledge[category].keywords;
    let matches = 0;
    
    keywords.forEach(keyword => {
      if (queryLower.includes(keyword)) {
        matches++;
      }
    });
    
    if (matches > maxMatches) {
      maxMatches = matches;
      bestMatch = category;
    }
  });
  
  // Get response in appropriate language
  let response;
  let suggestions = [];
  
  if (bestMatch !== "general" && farmingKnowledge[bestMatch]) {
    response = farmingKnowledge[bestMatch].responses[lang] || 
              farmingKnowledge[bestMatch].responses["en-IN"];
    
    // Add context-specific suggestions
    if (bestMatch === "disease") {
      suggestions = ["Upload leaf image", "Take symptom quiz", "Get treatment advice"];
    } else if (bestMatch === "weather") {
      suggestions = ["Current weather", "5-day forecast", "Farming advice"];
    } else if (bestMatch === "fertilizer") {
      suggestions = ["NPK recommendations", "Organic options", "Application timing"];
    }
  } else {
    // General response
    const generalResponses = {
      "en-IN": "I'm your AI farming assistant! 🌱 I can help with crop diseases, weather forecasts, fertilizer advice, and farming guidance. What would you like to know?",
      "hi-IN": "मैं आपका AI कृषि सहायक हूं! 🌱 मैं फसल रोगों, मौसम पूर्वानुमान, उर्वरक सलाह और कृषि मार्गदर्शन में मदद कर सकता हूं।",
      "mr-IN": "मी तुमचा AI शेती सहाय्यक आहे! 🌱 मी पीक रोग, हवामान अंदाज, खत सल्ला आणि शेती मार्गदर्शनात मदत करू शकतो."
    };
    
    response = generalResponses[lang] || generalResponses["en-IN"];
    suggestions = ["Disease detection", "Weather forecast", "Fertilizer advice", "Crop guidance"];
  }
  
  return { text: response, suggestions };
}

// ==================== ENHANCED VOICE FEATURES ====================
function startVoice() {
  if (!("webkitSpeechRecognition" in window)) {
    showNotification('Voice recognition works best in Google Chrome', 'warning');
    return;
  }

  if (isListening) {
    stopVoice();
    return;
  }

  const lang = document.getElementById("languageSelect").value;
  const micBtn = document.querySelector('button[onclick="startVoice()"]');

  recognition = new webkitSpeechRecognition();
  recognition.lang = lang;
  recognition.continuous = false;
  recognition.interimResults = true;

  recognition.start();
  isListening = true;
  micBtn.innerHTML = '<i class="fas fa-stop"></i>';
  micBtn.classList.add('listening');
  micBtn.title = "Stop listening";

  recognition.onstart = () => {
    console.log("Voice recognition started");
    document.getElementById("userInput").placeholder = "🎤 Listening...";
    showNotification('Listening... Speak now!', 'info');
  };

  recognition.onresult = (event) => {
    let transcript = "";
    for (let i = event.resultIndex; i < event.results.length; i++) {
      transcript += event.results[i][0].transcript;
    }
    document.getElementById("userInput").value = transcript;
  };

  recognition.onend = () => {
    stopVoice();
    // Auto-send if we have text
    const input = document.getElementById("userInput");
    if (input.value.trim()) {
      setTimeout(() => sendMessage(), 500);
    }
  };

  recognition.onerror = (event) => {
    console.error("Voice recognition error:", event.error);
    stopVoice();
    showNotification('Voice recognition error. Please try again.', 'error');
  };
}

function stopVoice() {
  if (recognition) {
    recognition.stop();
  }
  isListening = false;
  const micBtn = document.querySelector('button[onclick="startVoice()"]');
  micBtn.innerHTML = '<i class="fas fa-microphone"></i>';
  micBtn.classList.remove('listening');
  micBtn.title = "Speak your question";
  document.getElementById("userInput").placeholder = "Type or speak your question...";
}

// ==================== TEXT-TO-SPEECH ====================
function speak(text) {
  const lang = document.getElementById("languageSelect").value;

  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  // Clean text for speech (remove HTML and emojis)
  const cleanText = text.replace(/<[^>]*>/g, '').replace(/[🌱🔬🌦️🌾💡🤖]/g, '');
  
  const speech = new SpeechSynthesisUtterance(cleanText);
  speech.lang = lang;
  speech.rate = 0.9;
  speech.pitch = 1;
  speech.volume = 0.8;
  
  window.speechSynthesis.speak(speech);
}

// ==================== VOICE-ONLY MODE ====================
function startVoiceOnlyMode() {
  const lang = document.getElementById("languageSelect").value;
  const chatBox = document.getElementById("chatBox");

  let greeting = "Voice-only mode activated! 🎧 How can I help you with farming today?";
  if (lang === "hi-IN") greeting = "आवाज-मात्र मोड सक्रिय! 🎧 आज मैं खेती में आपकी कैसे मदद कर सकता हूं?";
  if (lang === "mr-IN") greeting = "आवाज-फक्त मोड सक्रिय! 🎧 आज मी शेतीत तुमची कशी मदत करू शकतो?";

  addMessageToChat(greeting, 'bot');
  speak(greeting);

  setTimeout(() => {
    startVoice();
  }, 3000);
}

// ==================== UTILITY FUNCTIONS ====================
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  
  const icons = {
    'info': 'fas fa-info-circle',
    'success': 'fas fa-check-circle',
    'warning': 'fas fa-exclamation-triangle',
    'error': 'fas fa-times-circle'
  };
  
  notification.innerHTML = `
    <i class="${icons[type]}"></i>
    <span>${message}</span>
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.remove();
  }, 4000);
}

function clearChat() {
  const chatBox = document.getElementById("chatBox");
  chatBox.innerHTML = '<div class="bot-msg">Hello! 👋 I\'m your AI farming assistant. How can I help you today?</div>';
  conversationHistory = [];
}

// ==================== KEYBOARD SHORTCUTS ====================
document.getElementById("userInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
});

// ==================== INITIALIZATION ====================
document.addEventListener("DOMContentLoaded", function() {
  const chatBox = document.getElementById("chatBox");
  const welcomeMsg = "Welcome to SoilSync AI! 🌱 I'm here to help with all your farming needs. Ask me about crop diseases, weather, fertilizers, or any farming question!";
  
  addMessageToChat(welcomeMsg, 'bot');
  
  // Add enhanced CSS for new features
  if (!document.querySelector('.chatbot-enhanced-styles')) {
    const style = document.createElement('style');
    style.className = 'chatbot-enhanced-styles';
    style.textContent = `
      .message-time {
        font-size: 0.7rem;
        color: #888;
        text-align: right;
        margin-top: 5px;
      }
      
      .typing-animation {
        display: inline-flex;
        gap: 3px;
      }
      
      .typing-animation span {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #4caf50;
        animation: typing 1.4s infinite;
      }
      
      .typing-animation span:nth-child(2) { animation-delay: 0.2s; }
      .typing-animation span:nth-child(3) { animation-delay: 0.4s; }
      
      @keyframes typing {
        0%, 60%, 100% { transform: translateY(0); }
        30% { transform: translateY(-10px); }
      }
      
      .suggestions-container {
        margin: 10px 0;
        padding: 15px;
        background: #f8f9fa;
        border-radius: 12px;
        border-left: 4px solid #4caf50;
      }
      
      .suggestions-title {
        font-weight: 600;
        margin-bottom: 10px;
        color: #2d3748;
      }
      
      .suggestions-buttons {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      
      .suggestion-btn {
        background: #4caf50;
        color: white;
        border: none;
        padding: 6px 12px;
        border-radius: 15px;
        font-size: 0.8rem;
        cursor: pointer;
        transition: all 0.3s;
      }
      
      .suggestion-btn:hover {
        background: #2e7d32;
        transform: translateY(-1px);
      }
      
      .listening {
        background: #e53e3e !important;
        animation: pulse 1s infinite;
      }
      
      @keyframes pulse {
        0% { box-shadow: 0 0 0 0 rgba(229, 62, 62, 0.7); }
        70% { box-shadow: 0 0 0 10px rgba(229, 62, 62, 0); }
        100% { box-shadow: 0 0 0 0 rgba(229, 62, 62, 0); }
      }
      
      .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 12px 16px;
        border-radius: 8px;
        color: white;
        z-index: 1000;
        animation: slideIn 0.3s ease;
      }
      
      .notification.info { background: #2196f3; }
      .notification.success { background: #4caf50; }
      .notification.warning { background: #ff9800; }
      .notification.error { background: #f44336; }
    `;
    document.head.appendChild(style);
  }
});
