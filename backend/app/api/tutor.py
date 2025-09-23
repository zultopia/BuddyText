from fastapi import APIRouter, HTTPException
from app.models.schemas import (
    TutorQuestionRequest,
    TutorQuestionResponse
)
from app.services.tutor_service import TutorService
import time

router = APIRouter()

# Initialize service
tutor_service = TutorService()

@router.post("/ask", response_model=TutorQuestionResponse)
async def ask_tutor(request: TutorQuestionRequest):
    """
    Bertanya kepada AI tutor untuk mendapatkan penjelasan sederhana
    """
    try:
        result = await tutor_service.answer_question(
            question=request.question,
            context=request.context,
            user_level=request.user_level
        )
        
        return TutorQuestionResponse(
            question=request.question,
            answer=result["answer"],
            explanation=result["explanation"],
            examples=result["examples"],
            related_concepts=result["related_concepts"],
            confidence_score=result["confidence_score"]
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error answering question: {str(e)}")

@router.get("/health")
async def health_check():
    return {"status": "tutor service healthy"}
