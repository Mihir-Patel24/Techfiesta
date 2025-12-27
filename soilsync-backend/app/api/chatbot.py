from fastapi import APIRouter
from pydantic import BaseModel
from app.services.openai_service import get_ai_response
from app.utils.memory import get_session, add_message
import uuid

router = APIRouter()

class ChatRequest(BaseModel):
    message: str
    language: str = "en"
    session_id: str | None = None

class ChatResponse(BaseModel):
    reply: str
    session_id: str

@router.post("/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    session_id = req.session_id or str(uuid.uuid4())

    session = get_session(session_id)

    add_message(session_id, "user", req.message)

    reply = get_ai_response(session, req.language)

    add_message(session_id, "assistant", reply)

    return {
        "reply": reply,
        "session_id": session_id
    }
