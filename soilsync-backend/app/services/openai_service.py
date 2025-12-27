import os
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

SYSTEM_PROMPT = """
You are SoilSync AI, an agricultural assistant for Indian farmers.
Always respond in English unless the user explicitly asks for Hindi or Marathi.
If the user asks in Hindi, reply in Hindi.
If the user asks in Marathi, reply in Marathi.
Keep responses simple and farmer-friendly.

"""

def get_ai_response(messages: list, language: str):
    language_map = {
        "en": "Reply in English.",
        "hi": "Reply in Hindi.",
        "mr": "Reply in Marathi."
    }

    messages.insert(0, {
        "role": "system",
        "content": SYSTEM_PROMPT + " " + language_map.get(language, "Reply in English.")
    })

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        temperature=0.4
    )

    return response.choices[0].message.content
