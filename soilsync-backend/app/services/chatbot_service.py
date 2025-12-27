def generate_reply(message: str, language: str):
    message = message.lower()

    if language == "hi":
        return "मैं आपकी खेती से जुड़ी समस्या समझ रहा हूँ।"
    elif language == "mr":
        return "मी तुमच्या शेतीविषयक प्रश्नात मदत करतो."
    
    if "crop" in message:
        return "Crop selection depends on soil type, season, and rainfall."
    if "fertilizer" in message:
        return "Use fertilizer based on soil test results."

    return "I am analyzing your farming query. Please provide more details."
