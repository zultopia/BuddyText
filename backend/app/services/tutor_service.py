from typing import Dict, Any, List, Optional
import asyncio
import re

class TutorService:
    def __init__(self):
        self.knowledge_base = {
            "asuransi": {
                "definition": "Asuransi adalah perlindungan finansial yang memberikan bantuan saat terjadi hal buruk",
                "simple_explanation": "Asuransi seperti payung saat hujan. Anda bayar sedikit setiap bulan, tapi jika terjadi kecelakaan atau sakit, asuransi akan membantu membayar biayanya.",
                "examples": [
                    "Asuransi kesehatan: membantu bayar biaya rumah sakit",
                    "Asuransi mobil: membantu bayar kerusakan mobil",
                    "Asuransi jiwa: memberikan uang untuk keluarga jika terjadi hal buruk"
                ],
                "related_concepts": ["perlindungan", "premi", "klaim", "polis"]
            },
            "subsidi": {
                "definition": "Subsidi adalah bantuan uang dari pemerintah untuk mengurangi biaya",
                "simple_explanation": "Subsidi seperti diskon dari pemerintah. Pemerintah membantu membayar sebagian biaya supaya masyarakat tidak perlu bayar mahal.",
                "examples": [
                    "Subsidi BBM: pemerintah membantu bayar sebagian harga bensin",
                    "Subsidi listrik: pemerintah membantu bayar sebagian tagihan listrik",
                    "Subsidi pendidikan: pemerintah membantu bayar biaya sekolah"
                ],
                "related_concepts": ["bantuan", "pemerintah", "biaya", "diskon"]
            },
            "investasi": {
                "definition": "Investasi adalah menanam uang untuk mendapat keuntungan di masa depan",
                "simple_explanation": "Investasi seperti menanam pohon. Anda tanam uang sekarang, tunggu beberapa tahun, lalu dapat hasil yang lebih banyak.",
                "examples": [
                    "Deposito: simpan uang di bank dengan bunga",
                    "Saham: beli bagian kecil dari perusahaan",
                    "Emas: beli emas untuk dijual lagi nanti"
                ],
                "related_concepts": ["keuntungan", "saham", "deposito", "emas"]
            }
        }
    
    async def answer_question(
        self, 
        question: str, 
        context: Optional[str] = None,
        user_level: str = "beginner"
    ) -> Dict[str, Any]:
        """
        Menjawab pertanyaan pengguna dengan penjelasan sederhana
        """
        try:
            # Extract key terms from question
            key_terms = self._extract_key_terms(question)
            
            # Find relevant knowledge
            knowledge = self._find_relevant_knowledge(key_terms)
            
            # Generate answer
            answer = await self._generate_answer(question, knowledge, user_level)
            
            # Generate explanation
            explanation = self._generate_explanation(knowledge, user_level)
            
            # Get examples
            examples = knowledge.get("examples", [])
            
            # Get related concepts
            related_concepts = knowledge.get("related_concepts", [])
            
            # Calculate confidence score
            confidence_score = self._calculate_confidence(key_terms, knowledge)
            
            return {
                "answer": answer,
                "explanation": explanation,
                "examples": examples,
                "related_concepts": related_concepts,
                "confidence_score": confidence_score
            }
            
        except Exception as e:
            return await self._fallback_answer(question, user_level)
    
    def _extract_key_terms(self, question: str) -> List[str]:
        """Extract key terms dari pertanyaan"""
        
        # Common question patterns
        question_patterns = [
            r"apa maksud (.+?)\?",
            r"apa itu (.+?)\?",
            r"jelaskan (.+?)\?",
            r"definisi (.+?)\?",
            r"pengertian (.+?)\?"
        ]
        
        key_terms = []
        question_lower = question.lower()
        
        for pattern in question_patterns:
            matches = re.findall(pattern, question_lower)
            key_terms.extend(matches)
        
        # If no pattern matches, try to extract nouns
        if not key_terms:
            words = question_lower.split()
            # Simple heuristic: words that might be concepts
            key_terms = [word for word in words if len(word) > 4 and word not in ["apa", "itu", "maksud", "jelaskan"]]
        
        return key_terms
    
    def _find_relevant_knowledge(self, key_terms: List[str]) -> Dict[str, Any]:
        """Find relevant knowledge berdasarkan key terms"""
        
        for term in key_terms:
            term_clean = term.strip().lower()
            if term_clean in self.knowledge_base:
                return self.knowledge_base[term_clean]
        
        # If no exact match, try partial matching
        for term in key_terms:
            term_clean = term.strip().lower()
            for concept, knowledge in self.knowledge_base.items():
                if term_clean in concept or concept in term_clean:
                    return knowledge
        
        # Return default knowledge
        return {
            "definition": "Konsep yang Anda tanyakan belum tersedia dalam database kami",
            "simple_explanation": "Maaf, saya belum bisa menjelaskan konsep ini. Silakan coba dengan kata kunci yang berbeda.",
            "examples": [],
            "related_concepts": []
        }
    
    async def _generate_answer(self, question: str, knowledge: Dict[str, Any], user_level: str) -> str:
        """Generate answer berdasarkan knowledge dan user level"""
        
        definition = knowledge.get("definition", "")
        simple_explanation = knowledge.get("simple_explanation", "")
        
        if user_level == "beginner":
            return f"{definition}\n\n{simple_explanation}"
        else:
            return definition
    
    def _generate_explanation(self, knowledge: Dict[str, Any], user_level: str) -> str:
        """Generate detailed explanation"""
        
        simple_explanation = knowledge.get("simple_explanation", "")
        
        if user_level == "beginner":
            return f"Penjelasan sederhana:\n{simple_explanation}"
        else:
            return simple_explanation
    
    def _calculate_confidence(self, key_terms: List[str], knowledge: Dict[str, Any]) -> float:
        """Calculate confidence score untuk jawaban"""
        
        if not key_terms:
            return 0.3
        
        # Check if we have exact match
        for term in key_terms:
            term_clean = term.strip().lower()
            if term_clean in self.knowledge_base:
                return 0.9
        
        # Check if we have partial match
        for term in key_terms:
            term_clean = term.strip().lower()
            for concept in self.knowledge_base.keys():
                if term_clean in concept or concept in term_clean:
                    return 0.7
        
        # No match found
        return 0.2
    
    async def _fallback_answer(self, question: str, user_level: str) -> Dict[str, Any]:
        """Fallback answer jika terjadi error"""
        
        return {
            "answer": "Maaf, saya mengalami kesalahan dalam memproses pertanyaan Anda. Silakan coba lagi dengan kata kunci yang berbeda.",
            "explanation": "Sistem sedang mengalami masalah teknis. Coba lagi nanti atau gunakan kata kunci yang lebih spesifik.",
            "examples": [],
            "related_concepts": [],
            "confidence_score": 0.1
        }
    
    def add_knowledge(self, concept: str, knowledge: Dict[str, Any]):
        """Add new knowledge to the knowledge base"""
        
        self.knowledge_base[concept.lower()] = knowledge
    
    def get_available_concepts(self) -> List[str]:
        """Get list of available concepts"""
        
        return list(self.knowledge_base.keys())
