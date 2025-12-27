from fastapi import APIRouter
from app.models.crop import CropRequest, CropResponse
from app.services.crop_service import predict_crop

router = APIRouter(prefix="/crop", tags=["Crop Prediction"])

@router.post("/predict", response_model=CropResponse)
def crop_prediction(request: CropRequest):
    result = predict_crop(request)
    return result
