from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.chatbot import router as chat_router
from app.api.voice_chat import router as voice_router

app = FastAPI(title="SoilSync AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(chat_router, prefix="/api")
app.include_router(voice_router, prefix="/api")
