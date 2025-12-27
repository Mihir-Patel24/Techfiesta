// -------------------- GLOBAL VARIABLES --------------------
let recognition = null;
let sessionId = null;
// -------------------- SEND MESSAGE --------------------
async function sendMessage() {
  const input = document.getElementById("userInput");
  const chatBox = document.getElementById("chatBox");

  if (!input.value.trim()) return;

  chatBox.innerHTML += `<div class="user-msg">${input.value}</div>`;

  const response = await fetch("http://127.0.0.1:8000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: input.value,
      language: "hi", // en / hi / mr
      session_id: sessionId
    })
  });

  const data = await response.json();
  sessionId = data.session_id;

  chatBox.innerHTML += `<div class="bot-msg">${data.reply}</div>`;
  input.value = "";
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



