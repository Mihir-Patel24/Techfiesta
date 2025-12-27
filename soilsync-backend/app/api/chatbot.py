from fastapi import APIRouter
from pydantic import BaseModel
from app.services.openai_service import get_ai_response

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    language: str

class ChatResponse(BaseModel):
    reply: str

@router.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    reply = get_ai_response(req.message, req.language)
    return {"reply": reply}
