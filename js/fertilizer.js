const form = document.getElementById('fertilizerForm');
const recText = document.getElementById('recText');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    const crop = document.getElementById('crop').value;
    const soil = document.getElementById('soil').value;
    const growth = document.getElementById('growth').value;

    let recommendation = '';

    // Basic dynamic recommendations (can be expanded)
    if(crop && soil && growth) {
        if(crop === 'wheat') {
            if(growth === 'initial') recommendation = "Apply 20kg/acre of nitrogen-rich fertilizer.";
            else if(growth === 'vegetative') recommendation = "Use 15kg/acre of urea.";
            else if(growth === 'flowering') recommendation = "Use 10kg/acre of phosphorus and potassium mix.";
            else recommendation = "Harvest-ready, no fertilizer required.";
        } else if(crop === 'rice') {
            if(growth === 'initial') recommendation = "Apply 25kg/acre of NPK 10:26:26.";
            else if(growth === 'vegetative') recommendation = "Top dress with urea 15kg/acre.";
            else if(growth === 'flowering') recommendation = "Apply 10kg/acre of potash.";
            else recommendation = "Harvest stage, ensure water drainage.";
        } else if(crop === 'maize') {
            recommendation = "Apply 20kg/acre NPK and monitor growth closely.";
        } else if(crop === 'vegetables') {
            recommendation = "Use compost + balanced NPK fertilizer as per soil test.";
        } else {
            recommendation = "Consult local agricultural officer for best results.";
        }

        recText.innerText = recommendation;
    } else {
        recText.innerText = "Please fill all fields to get recommendation.";
    }
});