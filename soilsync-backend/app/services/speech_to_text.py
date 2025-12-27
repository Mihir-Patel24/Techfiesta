import speech_recognition as sr

def convert_speech_to_text(audio_path: str, language: str):
    recognizer = sr.Recognizer()

    lang_map = {
        "en": "en-IN",
        "hi": "hi-IN",
        "mr": "mr-IN"
    }

    with sr.AudioFile(audio_path) as source:
        audio = recognizer.record(source)

    return recognizer.recognize_google(
        audio,
        language=lang_map.get(language, "en-IN")
    )
