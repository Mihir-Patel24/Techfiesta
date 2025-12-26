const btn = document.getElementById("getSubsidy");
const result = document.getElementById("result");

btn.addEventListener("click", () => {
    const crop = document.getElementById("crop").value;
    const category = document.getElementById("category").value;
    const land = document.getElementById("land").value;

    if (!crop || !category || !land) {
        alert("Please fill all details");
        return;
    }

    let subsidies = [];

    if (crop === "wheat") {
        subsidies.push("50% subsidy on certified wheat seeds");
    }

    if (category === "small") {
        subsidies.push("PM-KISAN income support scheme");
    }

    if (land >= 5) {
        subsidies.push("Machinery & equipment subsidy");
    }

    subsidies.push("Soil testing & irrigation assistance available");

    result.innerHTML = subsidies.map(item => `
        <div class="subsidy-card">
            <h3>Eligible Subsidy</h3>
            <p>${item}</p>
        </div>
    `).join("");
});