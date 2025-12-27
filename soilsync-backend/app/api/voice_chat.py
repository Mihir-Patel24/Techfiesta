from fastapi import APIRouter, UploadFile, File, Form
from app.services.speech_to_text import convert_speech_to_text
from app.services.openai_service import get_ai_response
from app.services.text_to_speech import convert_text_to_speech
import shutil
import os

router = APIRouter()

@router.post("/voice-chat")
async def voice_chat(
    audio: UploadFile = File(...),
    language: str = Form("en")
):
    os.makedirs("uploads", exist_ok=True)

    audio_path = f"uploads/{audio.filename}"
    with open(audio_path, "wb") as buffer:
        shutil.copyfileobj(audio.file, buffer)

    # Voice → Text
    user_text = convert_speech_to_text(audio_path, language)

    # Text → AI
    ai_reply = get_ai_response(user_text, language)

    # AI → Voice
    audio_response_path = convert_text_to_speech(ai_reply, language)

    return {
        "user_text": user_text,
        "ai_reply": ai_reply,
        "audio_url": audio_response_path
    }
