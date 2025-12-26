function predictCrop() {
  const resultBox = document.getElementById("cropResult");

  const crops = ["Rice 🌾", "Wheat 🌿", "Maize 🌽", "Cotton 🌱", "Soybean 🌾"];
  const randomCrop = crops[Math.floor(Math.random() * crops.length)];

  resultBox.innerHTML = `
    ✅ Recommended Crop:<br><br>
    <span style="font-size:20px">${randomCrop}</span>
  `;
}
