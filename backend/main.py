from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import os
from dotenv import load_dotenv

from app.api.text_simplification import router as simplification_router
from app.api.tutor import router as tutor_router
from app.api.evaluation import router as evaluation_router

# Load environment variables
load_dotenv()

app = FastAPI(
    title="BuddyText API",
    description="LLaMA Cognitive-Friendly Tutor API",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(simplification_router, prefix="/api/simplify", tags=["text-simplification"])
app.include_router(tutor_router, prefix="/api/tutor", tags=["tutor"])
app.include_router(evaluation_router, prefix="/api/evaluate", tags=["evaluation"])

@app.get("/")
async def root():
    return {
        "message": "BuddyText API - LLaMA Cognitive-Friendly Tutor",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )
