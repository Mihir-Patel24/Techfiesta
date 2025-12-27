def predict_crop(data):
    soil = data.soil_type.lower()
    season = data.season.lower()
    temp = data.temperature
    rain = data.rainfall

    crops = []
    confidence = 70
    reason = ""

    if season == "kharif":
        if rain > 150:
            crops = ["Rice", "Sugarcane"]
            confidence = 90
            reason = "High rainfall during Kharif season favors water-intensive crops."
        else:
            crops = ["Cotton", "Maize"]
            reason = "Moderate rainfall suitable for cotton and maize."

    elif season == "rabi":
        if temp < 25:
            crops = ["Wheat", "Barley"]
            confidence = 85
            reason = "Cool temperature during Rabi supports wheat growth."
        else:
            crops = ["Mustard"]
            reason = "Warmer conditions favor oilseed crops."

    elif season == "zaid":
        crops = ["Watermelon", "Cucumber"]
        reason = "Zaid crops grow well in hot summer conditions."

    else:
        crops = ["Millets"]
        reason = "Default recommendation based on climate resilience."

    return {
        "crops": crops,
        "confidence": confidence,
        "reason": reason
    }
