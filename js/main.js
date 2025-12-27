// ==================== SOILSYNC MAIN HOMEPAGE FUNCTIONALITY ====================

document.addEventListener('DOMContentLoaded', function() {
    initializeHomepage();
});

function initializeHomepage() {
    setupLanguageSupport();
    setupQuickActions();
    setupFAB();
    setupAnimations();
}

// ==================== LANGUAGE SUPPORT ====================
function setupLanguageSupport() {
    const languageSelect = document.getElementById('languageSelect');
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            updatePageLanguage(this.value);
        });
    }
}

function updatePageLanguage(lang) {
    const translations = {
        'en-IN': {
            'hero-title': 'Empowering Indian Farmers with AI Intelligence',
            'hero-desc': '🌾 Crop disease detection • 🌦️ Weather intelligence • 💬 Multilingual support • 🏦 Government schemes'
        },
        'hi-IN': {
            'hero-title': 'AI बुद्धिमत्ता के साथ भारतीय किसानों को सशक्त बनाना',
            'hero-desc': '🌾 फसल रोग का पता लगाना • 🌦️ मौसम की जानकारी • 💬 बहुभाषी सहायता • 🏦 सरकारी योजनाएं'
        },
        'mr-IN': {
            'hero-title': 'AI बुद्धिमत्तेसह भारतीय शेतकऱ्यांना सक्षम करणे',
            'hero-desc': '🌾 पीक रोग शोध • 🌦️ हवामान माहिती • 💬 बहुभाषिक समर्थन • 🏦 सरकारी योजना'
        }
    };
    
    // Update text content based on language
    const heroTitle = document.querySelector('.hero h1');
    const heroDesc = document.querySelector('.hero p');
    
    if (heroTitle && translations[lang]) {
        heroTitle.innerHTML = translations[lang]['hero-title'];
    }
    if (heroDesc && translations[lang]) {
        heroDesc.innerHTML = translations[lang]['hero-desc'];
    }
}

// ==================== QUICK ACTIONS ====================
function setupQuickActions() {
    // Voice Assistant
    window.openVoiceAssistant = function() {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance('Opening AI voice assistant');
            speechSynthesis.speak(utterance);
        }
        window.location.href = 'pages/chatbot.html';
    };
    
    // Camera for disease detection
    window.openCamera = function() {
        window.location.href = 'pages/disease.html';
    };
    
    // Weather
    window.getWeather = function() {
        window.location.href = 'pages/weather.html';
    };
    
    // Emergency help
    window.openEmergency = function() {
        showEmergencyModal();
    };
}

function showEmergencyModal() {
    const modal = document.createElement('div');
    modal.className = 'emergency-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>🚨 Emergency Agricultural Support</h3>
            <div class="emergency-options">
                <a href="tel:1800-180-1551" class="emergency-btn">
                    <i class="fas fa-phone"></i>
                    Kisan Call Center<br>
                    <small>1800-180-1551</small>
                </a>
                <a href="pages/chatbot.html" class="emergency-btn">
                    <i class="fas fa-robot"></i>
                    AI Assistant<br>
                    <small>Instant Help</small>
                </a>
                <a href="pages/disease.html" class="emergency-btn">
                    <i class="fas fa-camera"></i>
                    Disease Detection<br>
                    <small>Quick Scan</small>
                </a>
            </div>
            <button onclick="closeEmergencyModal()" class="close-btn">Close</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    window.closeEmergencyModal = function() {
        modal.remove();
    };
}

// ==================== FLOATING ACTION BUTTON ====================
function setupFAB() {
    window.toggleFAB = function() {
        const fabOptions = document.getElementById('fabOptions');
        const fabMain = document.querySelector('.fab-main i');
        
        if (fabOptions.style.display === 'flex') {
            fabOptions.style.display = 'none';
            fabMain.style.transform = 'rotate(0deg)';
        } else {
            fabOptions.style.display = 'flex';
            fabMain.style.transform = 'rotate(45deg)';
        }
    };
}

// ==================== ANIMATIONS ====================
function setupAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe service cards
    document.querySelectorAll('.service-card').forEach(card => {
        observer.observe(card);
    });
    
    // Observe stats
    document.querySelectorAll('.stat-item').forEach(stat => {
        observer.observe(stat);
    });
    
    // Add floating animation to hero cards
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.5}s`;
    });
}

// ==================== UTILITY FUNCTIONS ====================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}-circle"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 4000);
}

// ==================== SERVICE WORKER FOR PWA ====================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}