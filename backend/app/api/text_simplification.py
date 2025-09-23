from fastapi import APIRouter, HTTPException
from app.models.schemas import (
    TextSimplificationRequest, 
    TextSimplificationResponse,
    StepByStepRequest,
    StepByStepResponse
)
from app.services.text_simplification_service import TextSimplificationService
from app.services.step_by_step_service import StepByStepService
import time

router = APIRouter()

# Initialize services
simplification_service = TextSimplificationService()
step_by_step_service = StepByStepService()

@router.post("/text", response_model=TextSimplificationResponse)
async def simplify_text(request: TextSimplificationRequest):
    """
    Menyederhanakan teks kompleks menjadi bahasa yang lebih mudah dipahami
    """
    try:
        start_time = time.time()
        
        # Process text simplification
        result = await simplification_service.simplify_text(
            text=request.text,
            target_level=request.target_level,
            language=request.language,
            include_examples=request.include_examples,
            max_length=request.max_length
        )
        
        processing_time = time.time() - start_time
        
        return TextSimplificationResponse(
            original_text=request.text,
            simplified_text=result["simplified_text"],
            readability_score=result["readability_score"],
            simplification_level=request.target_level,
            word_count_reduction=result["word_count_reduction"],
            processing_time=processing_time
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error simplifying text: {str(e)}")

@router.post("/steps", response_model=StepByStepResponse)
async def create_step_by_step_guide(request: StepByStepRequest):
    """
    Membuat panduan step-by-step dari instruksi kompleks
    """
    try:
        result = await step_by_step_service.create_guide(
            instruction=request.instruction,
            context=request.context,
            user_level=request.user_level
        )
        
        return StepByStepResponse(
            original_instruction=request.instruction,
            steps=result["steps"],
            estimated_time=result.get("estimated_time"),
            difficulty_level=request.user_level
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating step-by-step guide: {str(e)}")

@router.get("/health")
async def health_check():
    return {"status": "text-simplification service healthy"}
