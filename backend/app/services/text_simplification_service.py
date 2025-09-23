import re
# import textstat
from typing import Dict, Any, Optional
import asyncio
# from transformers import AutoTokenizer, AutoModelForCausalLM
# import torch
import os

class TextSimplificationService:
    def __init__(self):
        self.model_name = "microsoft/DialoGPT-medium"  # Fallback model
        self.tokenizer = None
        self.model = None
        self._load_model()
    
    def _load_model(self):
        """Load LLaMA model atau fallback ke model yang tersedia"""
        try:
            # Untuk demo, kita akan menggunakan prompt engineering dengan model yang tersedia
            # Dalam production, gunakan LLaMA 3 dengan fine-tuning
            print("Loading text simplification model...")
            # Model loading akan diimplementasikan sesuai dengan resources yang tersedia
            pass
        except Exception as e:
            print(f"Error loading model: {e}")
    
    async def simplify_text(
        self, 
        text: str, 
        target_level: str = "simple",
        language: str = "id",
        include_examples: bool = True,
        max_length: int = 500
    ) -> Dict[str, Any]:
        """
        Menyederhanakan teks menggunakan AI model
        """
        try:
            # Preprocessing
            cleaned_text = self._preprocess_text(text)
            
            # Generate simplified text using prompt engineering
            simplified_text = await self._generate_simplified_text(
                cleaned_text, target_level, language, max_length
            )
            
            # Calculate readability metrics
            readability_score = self._calculate_readability(simplified_text)
            
            # Calculate word count reduction
            original_words = len(text.split())
            simplified_words = len(simplified_text.split())
            word_reduction = original_words - simplified_words
            
            return {
                "simplified_text": simplified_text,
                "readability_score": readability_score,
                "word_count_reduction": word_reduction
            }
            
        except Exception as e:
            # Fallback to rule-based simplification
            return await self._fallback_simplification(text, target_level)
    
    def _preprocess_text(self, text: str) -> str:
        """Preprocess text untuk simplification"""
        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text.strip())
        
        # Remove special characters yang tidak perlu
        text = re.sub(r'[^\w\s.,!?;:()-]', '', text)
        
        return text
    
    async def _generate_simplified_text(
        self, 
        text: str, 
        target_level: str, 
        language: str,
        max_length: int
    ) -> str:
        """
        Generate simplified text menggunakan AI model
        Untuk demo, kita akan menggunakan prompt engineering
        """
        
        # Prompt template untuk text simplification
        prompt = self._create_simplification_prompt(text, target_level, language)
        
        # Simulasi AI response (dalam production, gunakan actual model)
        simplified_text = await self._simulate_ai_response(prompt, text)
        
        # Ensure max length
        if len(simplified_text) > max_length:
            sentences = simplified_text.split('. ')
            simplified_text = '. '.join(sentences[:3]) + '.'
        
        return simplified_text
    
    def _create_simplification_prompt(self, text: str, target_level: str, language: str) -> str:
        """Create prompt untuk text simplification"""
        
        level_instructions = {
            "simple": "Gunakan kata-kata yang sangat sederhana, kalimat pendek (maksimal 10 kata), dan struktur yang jelas.",
            "intermediate": "Gunakan kata-kata yang mudah dipahami, kalimat sedang (maksimal 15 kata), dan struktur yang logis.",
            "advanced": "Gunakan kata-kata yang umum, kalimat yang jelas (maksimal 20 kata), dan struktur yang terorganisir."
        }
        
        prompt = f"""
        Sederhanakan teks berikut untuk orang dengan kesulitan belajar atau disabilitas kognitif.
        
        Instruksi: {level_instructions.get(target_level, level_instructions['simple'])}
        Bahasa: {language}
        
        Teks asli: {text}
        
        Teks yang disederhanakan:
        """
        
        return prompt
    
    async def _simulate_ai_response(self, prompt: str, original_text: str) -> str:
        """Simulate AI response untuk demo purposes"""
        
        # Rule-based simplification sebagai fallback
        simplified = self._rule_based_simplification(original_text)
        
        # Add some AI-like improvements
        simplified = self._improve_simplification(simplified)
        
        return simplified
    
    def _rule_based_simplification(self, text: str) -> str:
        """Rule-based text simplification sebagai fallback"""
        
        # Dictionary untuk kata-kata kompleks -> sederhana
        word_replacements = {
            "mengeluarkan": "membuat",
            "peraturan": "aturan",
            "subsidi": "bantuan biaya",
            "triwulan": "3 bulan",
            "berlaku": "mulai digunakan",
            "pemerintah": "pemerintah",
            "mengenai": "tentang",
            "mulai": "dimulai",
            "kedua": "kedua"
        }
        
        # Replace complex words
        simplified_text = text
        for complex_word, simple_word in word_replacements.items():
            simplified_text = simplified_text.replace(complex_word, simple_word)
        
        # Split long sentences
        sentences = simplified_text.split('. ')
        simplified_sentences = []
        
        for sentence in sentences:
            if len(sentence.split()) > 15:  # If sentence too long
                # Split by conjunctions
                parts = re.split(r'\s+(dan|atau|tetapi|namun|karena|sehingga)\s+', sentence)
                simplified_sentences.extend([part.strip() for part in parts if part.strip()])
            else:
                simplified_sentences.append(sentence)
        
        return '. '.join(simplified_sentences)
    
    def _improve_simplification(self, text: str) -> str:
        """Improve simplification dengan additional rules"""
        
        # Ensure sentences end with periods
        if not text.endswith('.'):
            text += '.'
        
        # Remove redundant words
        text = re.sub(r'\b(dan|atau)\s+(dan|atau)\b', r'\1', text)
        
        # Ensure proper spacing
        text = re.sub(r'\s+', ' ', text)
        
        return text.strip()
    
    def _calculate_readability(self, text: str) -> Dict[str, float]:
        """Calculate readability metrics"""
        # Simple readability calculation without external dependencies
        words = len(text.split())
        sentences = len(re.split(r'[.!?]+', text))
        avg_words_per_sentence = words / sentences if sentences > 0 else 0
        
        # Simple scoring based on average words per sentence
        if avg_words_per_sentence <= 10:
            score = 8.0  # Easy
        elif avg_words_per_sentence <= 15:
            score = 6.0  # Medium
        else:
            score = 4.0  # Hard
            
        return {
            "flesch_kincaid": score,
            "flesch_reading_ease": score * 10,
            "dale_chall": score,
            "smog": score
        }
    
    async def _fallback_simplification(self, text: str, target_level: str) -> Dict[str, Any]:
        """Fallback simplification jika AI model gagal"""
        
        simplified_text = self._rule_based_simplification(text)
        readability_score = self._calculate_readability(simplified_text)
        
        original_words = len(text.split())
        simplified_words = len(simplified_text.split())
        word_reduction = original_words - simplified_words
        
        return {
            "simplified_text": simplified_text,
            "readability_score": readability_score,
            "word_count_reduction": word_reduction
        }
