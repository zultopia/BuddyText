from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class TextSimplificationRequest(BaseModel):
    text: str
    target_level: Optional[str] = "simple"  # simple, intermediate, advanced
    language: Optional[str] = "id"  # Indonesian
    include_examples: Optional[bool] = True
    max_length: Optional[int] = 500

class TextSimplificationResponse(BaseModel):
    original_text: str
    simplified_text: str
    readability_score: Dict[str, float]
    simplification_level: str
    word_count_reduction: int
    processing_time: float

class StepByStepRequest(BaseModel):
    instruction: str
    context: Optional[str] = None
    user_level: Optional[str] = "beginner"  # beginner, intermediate, advanced

class StepByStepResponse(BaseModel):
    original_instruction: str
    steps: List[Dict[str, str]]  # Each step has: step_number, description, example
    estimated_time: Optional[str] = None
    difficulty_level: str

class TutorQuestionRequest(BaseModel):
    question: str
    context: Optional[str] = None
    user_level: Optional[str] = "beginner"

class TutorQuestionResponse(BaseModel):
    question: str
    answer: str
    explanation: str
    examples: List[str]
    related_concepts: List[str]
    confidence_score: float

class EvaluationRequest(BaseModel):
    text: str
    metrics: Optional[List[str]] = ["flesch_kincaid", "dale_chall", "smog"]

class EvaluationResponse(BaseModel):
    text: str
    metrics: Dict[str, float]
    recommendations: List[str]
    grade_level: str
