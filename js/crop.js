async function predictCrop() {
  const resultBox = document.getElementById("cropResult");
  
  // Get form values if they exist
  const soilType = document.getElementById('soilType')?.value || 'loamy';
  const climate = document.getElementById('climate')?.value || 'subtropical';
  const water = document.getElementById('water')?.value || 'medium';
  const season = document.getElementById('season')?.value || 'kharif';

  try {
    const response = await fetch('/api/crop/recommend', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        soil_type: soilType,
        climate: climate,
        water_availability: water,
        season: season
      })
    });

    const data = await response.json();
    
    if (data.status === 'success') {
      const rec = data.recommendation;
      resultBox.innerHTML = `
        <div class="crop-recommendation-result">
          <div class="primary-recommendation">
            <h3>🎆 Best Crop for Your Conditions</h3>
            <div class="primary-crop">🌱 ${rec.primary_choice}</div>
          </div>
          
          <div class="alternative-crops">
            <h4>🌿 Alternative Options</h4>
            <div class="crop-list">${rec.recommended_crops.slice(1).join(' • ')}</div>
          </div>
          
          <div class="recommendation-details">
            <div class="reasoning">
              <h4>📊 Why This Recommendation?</h4>
              <p>${rec.reasoning}</p>
            </div>
            
            <div class="tips">
              <h4>💡 Additional Tips</h4>
              <p>${rec.additional_tips}</p>
            </div>
          </div>
        </div>
      `;
    } else {
      resultBox.innerHTML = '<div class="error-message">❌ Error getting recommendation. Please try again.</div>';
    }
  } catch (error) {
    console.error('Error:', error);
    resultBox.innerHTML = '<div class="error-message">❌ Network error. Please try again.</div>';
  }
}
