document.getElementById("cropForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const resultCard = document.getElementById("resultCard");
  const cropResult = document.getElementById("cropResult");

  // Show loading state
  resultCard.style.display = "block";
  cropResult.innerText = "🔍 Analyzing farm conditions...";

  // Collect form values (MATCHES backend schema)
  const payload = {
    soil_type: document.getElementById("soil_type").value,
    season: document.getElementById("season").value,
    temperature: Number(document.getElementById("temperature").value),
    rainfall: Number(document.getElementById("rainfall").value)
  };

  try {
    const response = await fetch("http://127.0.0.1:8000/crop/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error("Prediction failed");
    }

    const data = await response.json();

    cropResult.innerHTML = `
      🌱 <strong>Recommended Crop:</strong><br>
      <span style="font-size:1.2em">${data.crops}</span>
    `;

  } catch (error) {
    console.error(error);
    cropResult.innerText = "❌ Unable to get prediction. Please try again.";
  }
});
