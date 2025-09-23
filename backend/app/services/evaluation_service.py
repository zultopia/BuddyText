from typing import Dict, Any, List, Optional
# import textstat
import re

class EvaluationService:
    def __init__(self):
        # Simple metrics functions without external dependencies
        self.metrics_functions = {
            "flesch_kincaid": self._simple_flesch_kincaid,
            "flesch_reading_ease": self._simple_flesch_reading_ease,
            "dale_chall": self._simple_dale_chall,
            "smog": self._simple_smog,
            "ari": self._simple_ari,
            "coleman_liau": self._simple_coleman_liau
        }
    
    def _simple_flesch_kincaid(self, text: str) -> float:
        """Simple Flesch-Kincaid calculation"""
        words = len(text.split())
        sentences = len(re.split(r'[.!?]+', text))
        avg_words_per_sentence = words / sentences if sentences > 0 else 0
        return max(0, 0.39 * avg_words_per_sentence + 11.8)
    
    def _simple_flesch_reading_ease(self, text: str) -> float:
        """Simple Flesch Reading Ease calculation"""
        words = len(text.split())
        sentences = len(re.split(r'[.!?]+', text))
        avg_words_per_sentence = words / sentences if sentences > 0 else 0
        return max(0, 206.835 - 1.015 * avg_words_per_sentence)
    
    def _simple_dale_chall(self, text: str) -> float:
        """Simple Dale-Chall calculation"""
        words = len(text.split())
        sentences = len(re.split(r'[.!?]+', text))
        avg_words_per_sentence = words / sentences if sentences > 0 else 0
        return max(0, 0.1579 * avg_words_per_sentence + 0.0496)
    
    def _simple_smog(self, text: str) -> float:
        """Simple SMOG calculation"""
        sentences = len(re.split(r'[.!?]+', text))
        return max(0, 1.043 * (sentences ** 0.5) + 3.1291)
    
    def _simple_ari(self, text: str) -> float:
        """Simple ARI calculation"""
        words = len(text.split())
        sentences = len(re.split(r'[.!?]+', text))
        avg_words_per_sentence = words / sentences if sentences > 0 else 0
        return max(0, 0.5 * avg_words_per_sentence + 4.71)
    
    def _simple_coleman_liau(self, text: str) -> float:
        """Simple Coleman-Liau calculation"""
        words = len(text.split())
        sentences = len(re.split(r'[.!?]+', text))
        avg_words_per_sentence = words / sentences if sentences > 0 else 0
        return max(0, 0.0588 * avg_words_per_sentence - 0.296)
    
    async def evaluate_text(
        self, 
        text: str, 
        metrics: Optional[List[str]] = None
    ) -> Dict[str, Any]:
        """
        Evaluate text readability menggunakan berbagai metrik
        """
        try:
            if metrics is None:
                metrics = ["flesch_kincaid", "dale_chall", "smog"]
            
            # Calculate metrics
            calculated_metrics = {}
            for metric in metrics:
                if metric in self.metrics_functions:
                    try:
                        calculated_metrics[metric] = self.metrics_functions[metric](text)
                    except:
                        calculated_metrics[metric] = 0.0
            
            # Determine grade level
            grade_level = self._determine_grade_level(calculated_metrics)
            
            # Generate recommendations
            recommendations = self._generate_recommendations(calculated_metrics, text)
            
            return {
                "metrics": calculated_metrics,
                "grade_level": grade_level,
                "recommendations": recommendations
            }
            
        except Exception as e:
            return await self._fallback_evaluation(text)
    
    def _determine_grade_level(self, metrics: Dict[str, float]) -> str:
        """Determine grade level berdasarkan metrics"""
        
        # Use Flesch-Kincaid as primary metric
        fk_score = metrics.get("flesch_kincaid", 0)
        
        if fk_score <= 6:
            return "SD (Sekolah Dasar)"
        elif fk_score <= 9:
            return "SMP (Sekolah Menengah Pertama)"
        elif fk_score <= 12:
            return "SMA (Sekolah Menengah Atas)"
        else:
            return "Perguruan Tinggi"
    
    def _generate_recommendations(self, metrics: Dict[str, float], text: str) -> List[str]:
        """Generate recommendations untuk meningkatkan readability"""
        
        recommendations = []
        
        # Check sentence length
        sentences = re.split(r'[.!?]+', text)
        avg_sentence_length = sum(len(s.split()) for s in sentences) / len(sentences) if sentences else 0
        
        if avg_sentence_length > 20:
            recommendations.append("Gunakan kalimat yang lebih pendek (maksimal 15 kata)")
        
        # Check word complexity
        words = text.split()
        complex_words = [word for word in words if len(word) > 8]
        complex_ratio = len(complex_words) / len(words) if words else 0
        
        if complex_ratio > 0.3:
            recommendations.append("Gunakan kata-kata yang lebih sederhana")
        
        # Check Flesch-Kincaid score
        fk_score = metrics.get("flesch_kincaid", 0)
        if fk_score > 12:
            recommendations.append("Teks terlalu sulit untuk pembaca umum")
        elif fk_score < 6:
            recommendations.append("Teks sudah cukup sederhana")
        
        # Check Dale-Chall score
        dc_score = metrics.get("dale_chall", 0)
        if dc_score > 9:
            recommendations.append("Gunakan lebih banyak kata-kata yang familiar")
        
        # General recommendations
        if not recommendations:
            recommendations.append("Teks sudah memiliki tingkat keterbacaan yang baik")
        
        return recommendations
    
    async def _fallback_evaluation(self, text: str) -> Dict[str, Any]:
        """Fallback evaluation jika terjadi error"""
        
        return {
            "metrics": {
                "flesch_kincaid": 0.0,
                "flesch_reading_ease": 0.0,
                "dale_chall": 0.0,
                "smog": 0.0
            },
            "grade_level": "Tidak dapat ditentukan",
            "recommendations": ["Teks tidak dapat dievaluasi karena masalah teknis"]
        }
    
    def calculate_word_complexity(self, text: str) -> Dict[str, Any]:
        """Calculate word complexity metrics"""
        
        words = text.split()
        total_words = len(words)
        
        # Count words by length
        short_words = len([w for w in words if len(w) <= 4])
        medium_words = len([w for w in words if 5 <= len(w) <= 8])
        long_words = len([w for w in words if len(w) > 8])
        
        # Count syllables (approximation)
        total_syllables = sum(self._count_syllables(word) for word in words)
        
        return {
            "total_words": total_words,
            "short_words": short_words,
            "medium_words": medium_words,
            "long_words": long_words,
            "total_syllables": total_syllables,
            "avg_syllables_per_word": total_syllables / total_words if total_words > 0 else 0,
            "complexity_ratio": long_words / total_words if total_words > 0 else 0
        }
    
    def _count_syllables(self, word: str) -> int:
        """Count syllables in a word (approximation)"""
        
        word = word.lower()
        vowels = "aeiou"
        syllable_count = 0
        prev_was_vowel = False
        
        for char in word:
            if char in vowels:
                if not prev_was_vowel:
                    syllable_count += 1
                prev_was_vowel = True
            else:
                prev_was_vowel = False
        
        # Handle silent 'e'
        if word.endswith('e') and syllable_count > 1:
            syllable_count -= 1
        
        return max(1, syllable_count)
    
    def get_readability_interpretation(self, score: float, metric: str) -> str:
        """Get interpretation of readability score"""
        
        interpretations = {
            "flesch_kincaid": {
                "very_easy": (0, 6),
                "easy": (6, 9),
                "standard": (9, 12),
                "difficult": (12, 16),
                "very_difficult": (16, 20)
            },
            "flesch_reading_ease": {
                "very_easy": (90, 100),
                "easy": (80, 90),
                "fairly_easy": (70, 80),
                "standard": (60, 70),
                "fairly_difficult": (50, 60),
                "difficult": (30, 50),
                "very_difficult": (0, 30)
            }
        }
        
        if metric not in interpretations:
            return "Tidak dapat diinterpretasikan"
        
        for level, (min_score, max_score) in interpretations[metric].items():
            if min_score <= score < max_score:
                return level.replace("_", " ").title()
        
        return "Tidak dapat dikategorikan"
