from pydantic import BaseModel

class ChatRequest(BaseModel):
    message: str
    language: str = "en"

class ChatResponse(BaseModel):
    reply: str
