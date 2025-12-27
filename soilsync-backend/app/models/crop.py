from pydantic import BaseModel

class CropRequest(BaseModel):
    soil_type: str
    season: str
    temperature: float
    rainfall: float

class CropResponse(BaseModel):
    crops: list[str]
    confidence: int
    reason: str
