const btn = document.getElementById("getSubsidy");
const result = document.getElementById("result");

btn.addEventListener("click", async () => {
    const crop = document.getElementById("crop").value;
    const category = document.getElementById("category").value;
    const land = document.getElementById("land").value;

    if (!crop || !category || !land) {
        alert("Please fill all details");
        return;
    }

    try {
        const response = await fetch('/api/subsidy/find', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                crop: crop,
                category: category,
                land_size: land
            })
        });

        const data = await response.json();
        
        if (data.status === 'success') {
            result.innerHTML = `
                <div class="subsidies-header">
                    <h3>🎯 Found ${data.total_schemes} Eligible Subsidies</h3>
                </div>
                ${data.subsidies.map(item => `
                    <div class="subsidy-card">
                        <div class="subsidy-icon">✅</div>
                        <div class="subsidy-content">
                            <h4>Government Scheme</h4>
                            <p>${item}</p>
                        </div>
                    </div>
                `).join("")}
            `;
        } else {
            result.innerHTML = '<div class="error-card">❌ Error fetching subsidies. Please try again.</div>';
        }
    } catch (error) {
        console.error('Error:', error);
        result.innerHTML = '<div class="error-card">❌ Network error. Please try again.</div>';
    }
});