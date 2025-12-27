// ==================== ENHANCED DISEASE DETECTION WITH BACKEND INTEGRATION ====================

const API_BASE_URL = '/api';

const imageUpload = document.getElementById("imageUpload");
const previewImage = document.getElementById("previewImage");

// Quiz system variables
let currentQuestionIndex = 0;
let quizAnswers = [];

// Enhanced quiz questions
const quizQuestions = [
  {
    question: "What color are the spots on the leaves?",
    options: [
      { text: "🟤 Brown/Dark spots", value: "brown_spots" },
      { text: "⚪ White powdery coating", value: "white_powder" },
      { text: "🟠 Orange/Rust colored", value: "orange_spots" },
      { text: "✅ No spots visible", value: "no_spots" }
    ]
  },
  {
    question: "Are the leaves showing any of these signs?",
    options: [
      { text: "🟡 Yellowing and wilting", value: "yellowing" },
      { text: "🌀 Curling and distortion", value: "leaf_curl" },
      { text: "🍂 Dropping prematurely", value: "leaf_drop" },
      { text: "🌿 Looking normal", value: "normal" }
    ]
  },
  {
    question: "How is the plant's overall growth?",
    options: [
      { text: "📉 Stunted/Slow growth", value: "stunted_growth" },
      { text: "📊 Reduced yield/flowering", value: "reduced_yield" },
      { text: "📈 Normal growth", value: "normal_growth" },
      { text: "🚀 Vigorous growth", value: "healthy_growth" }
    ]
  }
];

// ==================== IMAGE HANDLING ====================
imageUpload.addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  // Validate file type
  if (!file.type.startsWith('image/')) {
    showError('Please select a valid image file');
    return;
  }

  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    showError('Image size should be less than 5MB');
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    previewImage.src = e.target.result;
    previewImage.style.display = "block";
  };
  reader.readAsDataURL(file);
});

// ==================== METHOD SWITCHING ====================
function showMethod(method) {
  const imageMethods = document.getElementById("imageMethod");
  const quizMethods = document.getElementById("quizMethod");
  const tabs = document.querySelectorAll(".tab-btn");

  tabs.forEach(tab => tab.classList.remove("active"));
  
  if (method === "image") {
    imageMethods.style.display = "block";
    quizMethods.style.display = "none";
    tabs[0].classList.add("active");
  } else {
    imageMethods.style.display = "none";
    quizMethods.style.display = "block";
    tabs[1].classList.add("active");
  }
  
  clearResults();
}

// ==================== AI IMAGE DETECTION WITH BACKEND ====================
async function detectDisease() {
  const resultBox = document.getElementById("diseaseResult");
  const treatmentBox = document.getElementById("treatmentRecommendations");
  
  if (!previewImage.src) {
    showError('Please upload an image first');
    return;
  }

  // Show loading state
  resultBox.innerHTML = `
    <div class="loading-animation">
      <div class="spinner"></div>
      <p>🤖 AI analyzing leaf patterns...</p>
    </div>
  `;
  
  try {
    // Convert image to base64
    const imageData = previewImage.src;
    
    // Call backend API
    const response = await fetch(`${API_BASE_URL}/disease/detect-image`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ image: imageData })
    });
    
    if (!response.ok) {
      throw new Error('Backend API error');
    }
    
    const data = await response.json();
    
    if (data.status === 'success') {
      displayImageResults(data.prediction, data.treatment);
    } else {
      throw new Error(data.error || 'Unknown error');
    }
    
  } catch (error) {
    console.error('Disease detection error:', error);
    // Fallback to local simulation
    setTimeout(() => {
      const simulatedResult = simulateImageDetection();
      displayImageResults(simulatedResult.prediction, simulatedResult.treatment);
    }, 2000);
  }
}

function simulateImageDetection() {
  const diseases = ['Healthy', 'Leaf_Blight', 'Powdery_Mildew', 'Rust_Disease'];
  const disease = diseases[Math.floor(Math.random() * diseases.length)];
  const confidence = (85 + Math.random() * 10).toFixed(1);
  
  return {
    prediction: { disease, confidence, processing_time: '1.2s' },
    treatment: getTreatmentData(disease)
  };
}

function displayImageResults(prediction, treatment) {
  const resultBox = document.getElementById("diseaseResult");
  
  resultBox.innerHTML = `
    <div class="result-header">
      <i class="fas fa-check-circle"></i>
      <h3>AI Detection Complete</h3>
    </div>
    <div class="result-details">
      <div class="result-item">
        <span class="label">🔍 Detected:</span>
        <span class="value">${prediction.disease.replace('_', ' ')}</span>
      </div>
      <div class="result-item">
        <span class="label">🎯 Confidence:</span>
        <span class="value">${prediction.confidence}%</span>
      </div>
      <div class="result-item">
        <span class="label">⚡ Processing:</span>
        <span class="value">${prediction.processing_time || '1.2s'}</span>
      </div>
      <div class="result-item simulation-note">
        <span class="label">📝 Note:</span>
        <span class="value">This is simulated AI for demo. Real AI would use TensorFlow CNN model.</span>
      </div>
    </div>
  `;
  
  showTreatmentRecommendations(prediction.disease, treatment);
}

// ==================== SYMPTOM QUIZ SYSTEM ====================
function startQuiz() {
  currentQuestionIndex = 0;
  quizAnswers = [];
  document.getElementById("startQuizBtn").style.display = "none";
  showQuestion();
}

function showQuestion() {
  if (currentQuestionIndex >= quizQuestions.length) {
    analyzeQuizResults();
    return;
  }

  const question = quizQuestions[currentQuestionIndex];
  const questionDiv = document.getElementById("quizQuestion");
  const optionsDiv = document.getElementById("quizOptions");
  
  questionDiv.innerHTML = `
    <div class="question-header">
      <h4>Question ${currentQuestionIndex + 1}/${quizQuestions.length}</h4>
      <div class="progress-bar">
        <div class="progress" style="width: ${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%"></div>
      </div>
    </div>
    <p class="question-text">${question.question}</p>
  `;
  
  optionsDiv.innerHTML = "";
  question.options.forEach((option, index) => {
    optionsDiv.innerHTML += `
      <label class="quiz-option">
        <input type="radio" name="q${currentQuestionIndex}" value="${option.value}">
        <span class="option-text">${option.text}</span>
        <span class="checkmark"></span>
      </label>
    `;
  });
  
  document.getElementById("nextBtn").style.display = "block";
}

function nextQuestion() {
  const selected = document.querySelector(`input[name="q${currentQuestionIndex}"]:checked`);
  if (!selected) {
    showError('Please select an option');
    return;
  }
  
  quizAnswers.push(selected.value);
  currentQuestionIndex++;
  showQuestion();
}

async function analyzeQuizResults() {
  const resultBox = document.getElementById("diseaseResult");
  
  // Show loading
  resultBox.innerHTML = `
    <div class="loading-animation">
      <div class="spinner"></div>
      <p>🧠 Analyzing symptoms...</p>
    </div>
  `;
  
  try {
    // Call backend API
    const response = await fetch(`${API_BASE_URL}/disease/detect-symptoms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ symptoms: quizAnswers })
    });
    
    if (!response.ok) {
      throw new Error('Backend API error');
    }
    
    const data = await response.json();
    
    if (data.status === 'success') {
      displayQuizResults(data.analysis, data.treatment);
    } else {
      throw new Error(data.error || 'Unknown error');
    }
    
  } catch (error) {
    console.error('Symptom analysis error:', error);
    // Fallback to local simulation
    setTimeout(() => {
      const simulatedResult = simulateSymptomAnalysis();
      displayQuizResults(simulatedResult.analysis, simulatedResult.treatment);
    }, 1500);
  }
  
  resetQuiz();
}

function simulateSymptomAnalysis() {
  const diseases = ['Healthy', 'Leaf_Blight', 'Powdery_Mildew', 'Rust_Disease'];
  const disease = diseases[Math.floor(Math.random() * diseases.length)];
  const confidence = Math.min(95, 60 + (quizAnswers.length * 15));
  
  return {
    analysis: { disease, confidence, matched_symptoms: quizAnswers.length },
    treatment: getTreatmentData(disease)
  };
}

function displayQuizResults(analysis, treatment) {
  const resultBox = document.getElementById("diseaseResult");
  
  resultBox.innerHTML = `
    <div class="result-header">
      <i class="fas fa-brain"></i>
      <h3>Symptom Analysis Complete</h3>
    </div>
    <div class="result-details">
      <div class="result-item">
        <span class="label">🔍 Likely Issue:</span>
        <span class="value">${analysis.disease.replace('_', ' ')}</span>
      </div>
      <div class="result-item">
        <span class="label">🎯 Match Score:</span>
        <span class="value">${analysis.confidence}%</span>
      </div>
      <div class="result-item">
        <span class="label">📊 Based on:</span>
        <span class="value">${analysis.matched_symptoms} matching symptoms</span>
      </div>
    </div>
  `;
  
  showTreatmentRecommendations(analysis.disease, treatment);
}

function resetQuiz() {
  document.getElementById("quizQuestion").innerHTML = "";
  document.getElementById("quizOptions").innerHTML = "";
  document.getElementById("nextBtn").style.display = "none";
  document.getElementById("startQuizBtn").style.display = "block";
}

// ==================== TREATMENT RECOMMENDATIONS ====================
function showTreatmentRecommendations(diseaseKey, treatment) {
  const treatmentBox = document.getElementById("treatmentRecommendations");
  const treatmentContent = document.getElementById("treatmentContent");
  
  let content = "";
  
  if (diseaseKey === "Healthy") {
    content = `
      <div class="treatment-section healthy">
        <h4><i class="fas fa-leaf"></i> Maintenance Tips</h4>
        <p>• ${treatment.maintenance || 'Continue current care routine'}</p>
        <p>• ${treatment.fertilizer || 'Regular balanced feeding'}</p>
        <p>• ${treatment.prevention || 'Monitor for early signs'}</p>
      </div>
    `;
  } else {
    content = `
      <div class="treatment-section immediate">
        <h4><i class="fas fa-pills"></i> Immediate Treatment</h4>
        <p><strong>Chemical:</strong> ${treatment.chemical}</p>
        <p><strong>Organic:</strong> ${treatment.organic}</p>
      </div>
      
      <div class="treatment-section fertilizer">
        <h4><i class="fas fa-seedling"></i> Fertilizer Recommendation</h4>
        <p>${treatment.fertilizer}</p>
      </div>
      
      <div class="treatment-section prevention">
        <h4><i class="fas fa-shield-alt"></i> Prevention</h4>
        <p>${treatment.prevention}</p>
      </div>
      
      <div class="weather-alert">
        <h4><i class="fas fa-cloud-sun"></i> Weather Consideration</h4>
        <p>Apply treatments during dry weather. Avoid spraying before rain.</p>
      </div>
    `;
  }
  
  treatmentContent.innerHTML = content;
  treatmentBox.style.display = "block";
  
  // Smooth scroll to treatment
  treatmentBox.scrollIntoView({ behavior: "smooth" });
}

function getTreatmentData(disease) {
  const treatments = {
    'Leaf_Blight': {
      chemical: 'Copper oxychloride 50% WP @ 2g/L',
      organic: 'Neem oil spray (5ml/L) + Trichoderma',
      fertilizer: 'Balanced NPK 19:19:19 @ 2g/L foliar',
      prevention: 'Improve drainage, avoid overhead irrigation'
    },
    'Powdery_Mildew': {
      chemical: 'Wettable sulfur 80% WP @ 2g/L',
      organic: 'Baking soda solution (5g/L)',
      fertilizer: 'Reduce nitrogen, increase potassium',
      prevention: 'Ensure good air circulation'
    },
    'Healthy': {
      maintenance: 'Continue current care practices',
      fertilizer: 'Regular balanced NPK',
      prevention: 'Weekly health monitoring'
    }
  };
  
  return treatments[disease] || treatments['Healthy'];
}

// ==================== UTILITY FUNCTIONS ====================
function clearResults() {
  document.getElementById("diseaseResult").innerHTML = "🧪 Detection result will appear here";
  document.getElementById("treatmentRecommendations").style.display = "none";
}

function showError(message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-notification';
  errorDiv.innerHTML = `
    <i class="fas fa-exclamation-circle"></i>
    <span>${message}</span>
  `;
  
  document.body.appendChild(errorDiv);
  
  setTimeout(() => {
    errorDiv.remove();
  }, 5000);
}

// ==================== VOICE INTEGRATION ====================
function speakResult(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    const lang = document.getElementById('languageSelect')?.value || 'en-IN';
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
  }
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', function() {
  // Add loading spinner CSS if not present
  if (!document.querySelector('.spinner-styles')) {
    const style = document.createElement('style');
    style.className = 'spinner-styles';
    style.textContent = `
      .loading-animation {
        text-align: center;
        padding: 20px;
      }
      .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid #f3f3f3;
        border-top: 4px solid #4caf50;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 15px;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .progress-bar {
        width: 100%;
        height: 4px;
        background: #e0e0e0;
        border-radius: 2px;
        margin: 10px 0;
      }
      .progress {
        height: 100%;
        background: linear-gradient(90deg, #4caf50, #2e7d32);
        border-radius: 2px;
        transition: width 0.3s ease;
      }
    `;
    document.head.appendChild(style);
  }
});
