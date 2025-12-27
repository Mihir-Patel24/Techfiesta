from gtts import gTTS
import uuid
import os

def convert_text_to_speech(text: str, language: str):
    lang_map = {
        "en": "en",
        "hi": "hi",
        "mr": "mr"
    }

    filename = f"{uuid.uuid4()}.mp3"
    file_path = f"uploads/{filename}"

    tts = gTTS(text=text, lang=lang_map.get(language, "en"))
    tts.save(file_path)

    return file_path
