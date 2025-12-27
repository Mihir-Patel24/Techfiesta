# Simple in-memory session storage (hackathon friendly)

chat_sessions = {}

def get_session(session_id: str):
    if session_id not in chat_sessions:
        chat_sessions[session_id] = []
    return chat_sessions[session_id]

def add_message(session_id: str, role: str, content: str):
    chat_sessions[session_id].append({
        "role": role,
        "content": content
    })

    # keep last 6 messages only
    chat_sessions[session_id] = chat_sessions[session_id][-6:]
