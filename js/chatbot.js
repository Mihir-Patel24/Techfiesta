// -------------------- GLOBAL VARIABLES --------------------
let recognition = null;

// -------------------- SEND MESSAGE --------------------
function sendMessage() {
  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");
  const langSelect = document.getElementById("languageSelect");

  if (!input || !chatBox || !langSelect) return;
  if (input.value.trim() === "") return;

  const userText = input.value;
  const lang = langSelect.value;

  // Show user message
  chatBox.innerHTML += `<div class="user-msg">${userText}</div>`;

  // Language-based bot reply
  let reply = "I am analyzing your query...";
  if (lang === "hi-IN") reply = "मैं आपके प्रश्न का विश्लेषण कर रहा हूँ...";
  if (lang === "mr-IN") reply = "मी तुमचा प्रश्न विश्लेषित करत आहे...";

  // Show bot message
  chatBox.innerHTML += `<div class="bot-msg">${reply}</div>`;

  // Speak reply
  speak(reply);

  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
}

// -------------------- START VOICE INPUT --------------------
function startVoice() {
  if (!("webkitSpeechRecognition" in window)) {
    alert("Voice recognition works best in Google Chrome");
    return;
  }

  const lang = document.getElementById("languageSelect").value;

  recognition = new webkitSpeechRecognition();
  recognition.lang = lang;
  recognition.continuous = false;
  recognition.interimResults = false;

  recognition.start();

  recognition.onstart = () => {
    console.log("Voice recognition started");
  };

  recognition.onresult = (event) => {
    document.getElementById("userInput").value =
      event.results[0][0].transcript;
  };

  recognition.onerror = (event) => {
    console.error("Voice recognition error:", event.error);
    alert("Microphone permission denied or error occurred");
  };
}

// -------------------- SPEAK TEXT --------------------
function speak(text) {
  const lang = document.getElementById("languageSelect").value;

  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel(); // stop previous speech

  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = lang;
  window.speechSynthesis.speak(speech);
}

// -------------------- VOICE-ONLY MODE --------------------
function startVoiceOnlyMode() {
  const lang = document.getElementById("languageSelect").value;

  let greeting = "How can I help you?";
  if (lang === "hi-IN") greeting = "मैं आपकी कैसे मदद कर सकता हूँ?";
  if (lang === "mr-IN") greeting = "मी तुमची कशी मदत करू शकतो?";

  speak(greeting);

  setTimeout(() => {
    startVoice();
  }, 2500);
}



