const form = document.getElementById('fertilizerForm');
const recText = document.getElementById('recText');

form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const crop = document.getElementById('crop').value;
    const soil = document.getElementById('soil').value;
    const growth = document.getElementById('growth').value;

    if (!crop || !soil || !growth) {
        recText.innerText = "Please fill all fields to get recommendation.";
        return;
    }

    try {
        const response = await fetch('/api/fertilizer/recommend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                crop: crop,
                soil_type: soil,
                growth_stage: growth
            })
        });

        const data = await response.json();
        
        if (data.status === 'success') {
            const rec = data.recommendation;
            recText.innerHTML = `
                <div class="fertilizer-recommendation">
                    <div class="rec-section">
                        <h4>🌿 Fertilizer Application</h4>
                        <p class="rec-main">${rec.fertilizer}</p>
                    </div>
                    <div class="rec-section">
                        <h4>🕰️ Application Method</h4>
                        <p>${rec.application_method}</p>
                    </div>
                    <div class="rec-section">
                        <h4>⚠️ Important Precautions</h4>
                        <p>${rec.precautions}</p>
                    </div>
                </div>
            `;
        } else {
            recText.innerHTML = '<div class="error-message">❌ Error getting recommendation. Please try again.</div>';
        }
    } catch (error) {
        console.error('Error:', error);
        recText.innerHTML = '<div class="error-message">❌ Network error. Please try again.</div>';
    }
});