const imageUpload = document.getElementById("imageUpload");
const previewImage = document.getElementById("previewImage");

imageUpload.addEventListener("change", function () {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    previewImage.src = e.target.result;
    previewImage.style.display = "block";
  };
  reader.readAsDataURL(file);
});

function detectDisease() {
  const resultBox = document.getElementById("diseaseResult");

  const diseases = [
    "Leaf Blight 🦠",
    "Powdery Mildew 🍂",
    "Rust Disease 🍁",
    "Healthy Crop 🌿"
  ];

  const randomDisease =
    diseases[Math.floor(Math.random() * diseases.length)];

  resultBox.innerHTML = `
    ✅ Detected:<br><br>
    <strong>${randomDisease}</strong><br><br>
    💡 Recommended Action:<br>
    Use appropriate fungicide and remove affected leaves
  `;
}
