from fastapi import APIRouter, HTTPException
from app.models.schemas import (
    EvaluationRequest,
    EvaluationResponse
)
from app.services.evaluation_service import EvaluationService

router = APIRouter()

# Initialize service
evaluation_service = EvaluationService()

@router.post("/readability", response_model=EvaluationResponse)
async def evaluate_readability(request: EvaluationRequest):
    """
    Mengevaluasi tingkat keterbacaan teks menggunakan berbagai metrik
    """
    try:
        result = await evaluation_service.evaluate_text(
            text=request.text,
            metrics=request.metrics
        )
        
        return EvaluationResponse(
            text=request.text,
            metrics=result["metrics"],
            recommendations=result["recommendations"],
            grade_level=result["grade_level"]
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error evaluating text: {str(e)}")

@router.get("/health")
async def health_check():
    return {"status": "evaluation service healthy"}
