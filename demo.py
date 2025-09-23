import asyncio
import requests
import json
from typing import Dict, Any

class BuddyTextDemo:
    def __init__(self, base_url: str = "http://localhost:8000"):
        self.base_url = base_url
        self.session = requests.Session()
    
    def test_text_simplification(self):
        """Test text simplification functionality"""
        print("🧪 Testing Text Simplification...")
        
        test_cases = [
            {
                "text": "Pemerintah mengeluarkan peraturan mengenai subsidi energi yang berlaku mulai triwulan kedua.",
                "expected_keywords": ["pemerintah", "aturan", "bantuan", "energi"]
            },
            {
                "text": "Investasi dalam portofolio yang terdiversifikasi dapat mengurangi risiko kehilangan modal secara signifikan.",
                "expected_keywords": ["investasi", "portofolio", "risiko", "modal"]
            },
            {
                "text": "Proses verifikasi identitas melalui sistem biometrik memerlukan persetujuan eksplisit dari pengguna.",
                "expected_keywords": ["verifikasi", "identitas", "biometrik", "persetujuan"]
            }
        ]
        
        for i, test_case in enumerate(test_cases, 1):
            print(f"\n📝 Test Case {i}:")
            print(f"Original: {test_case['text']}")
            
            try:
                response = self.session.post(
                    f"{self.base_url}/api/simplify/text",
                    json={
                        "text": test_case["text"],
                        "target_level": "simple",
                        "include_examples": True
                    }
                )
                
                if response.status_code == 200:
                    result = response.json()
                    print(f"✅ Simplified: {result['simplified_text']}")
                    print(f"📊 Word reduction: {result['word_count_reduction']}")
                    print(f"⏱️ Processing time: {result['processing_time']:.2f}s")
                else:
                    print(f"❌ Error: {response.status_code} - {response.text}")
                    
            except Exception as e:
                print(f"❌ Exception: {str(e)}")
    
    def test_step_by_step_guide(self):
        """Test step-by-step guide functionality"""
        print("\n🧪 Testing Step-by-Step Guide...")
        
        test_cases = [
            {
                "instruction": "Cara mengisi formulir pendaftaran online",
                "context": "Formulir untuk mendaftar ke universitas"
            },
            {
                "instruction": "Prosedur pembayaran tagihan listrik",
                "context": "Menggunakan aplikasi mobile banking"
            },
            {
                "instruction": "Cara membuat akun email baru",
                "context": "Untuk keperluan pekerjaan"
            }
        ]
        
        for i, test_case in enumerate(test_cases, 1):
            print(f"\n📋 Test Case {i}:")
            print(f"Instruction: {test_case['instruction']}")
            print(f"Context: {test_case['context']}")
            
            try:
                response = self.session.post(
                    f"{self.base_url}/api/simplify/steps",
                    json={
                        "instruction": test_case["instruction"],
                        "context": test_case["context"],
                        "user_level": "beginner"
                    }
                )
                
                if response.status_code == 200:
                    result = response.json()
                    print(f"✅ Steps created: {len(result['steps'])} steps")
                    print(f"⏱️ Estimated time: {result.get('estimated_time', 'N/A')}")
                    
                    for step in result['steps'][:3]:  # Show first 3 steps
                        print(f"  {step['step_number']}. {step['description']}")
                        if step.get('example'):
                            print(f"     💡 {step['example']}")
                else:
                    print(f"❌ Error: {response.status_code} - {response.text}")
                    
            except Exception as e:
                print(f"❌ Exception: {str(e)}")
    
    def test_tutor_qa(self):
        """Test tutor Q&A functionality"""
        print("\n🧪 Testing Tutor Q&A...")
        
        test_questions = [
            "Apa maksud asuransi?",
            "Jelaskan tentang subsidi energi",
            "Apa itu investasi?",
            "Bagaimana cara mengisi formulir online?",
            "Apa perbedaan antara tabungan dan investasi?"
        ]
        
        for i, question in enumerate(test_questions, 1):
            print(f"\n❓ Question {i}: {question}")
            
            try:
                response = self.session.post(
                    f"{self.base_url}/api/tutor/ask",
                    json={
                        "question": question,
                        "user_level": "beginner"
                    }
                )
                
                if response.status_code == 200:
                    result = response.json()
                    print(f"✅ Answer: {result['answer'][:100]}...")
                    print(f"📚 Examples: {len(result['examples'])} examples")
                    print(f"🔗 Related concepts: {', '.join(result['related_concepts'])}")
                    print(f"🎯 Confidence: {result['confidence_score']:.2f}")
                else:
                    print(f"❌ Error: {response.status_code} - {response.text}")
                    
            except Exception as e:
                print(f"❌ Exception: {str(e)}")
    
    def test_readability_evaluation(self):
        """Test readability evaluation functionality"""
        print("\n🧪 Testing Readability Evaluation...")
        
        test_texts = [
            "Pemerintah mengeluarkan peraturan mengenai subsidi energi yang berlaku mulai triwulan kedua.",
            "Pemerintah membuat aturan baru tentang bantuan biaya energi. Aturan ini mulai berlaku bulan April.",
            "Aturan baru tentang bantuan energi mulai April."
        ]
        
        for i, text in enumerate(test_texts, 1):
            print(f"\n📊 Test Text {i}: {text}")
            
            try:
                response = self.session.post(
                    f"{self.base_url}/api/evaluate/readability",
                    json={
                        "text": text,
                        "metrics": ["flesch_kincaid", "dale_chall", "smog"]
                    }
                )
                
                if response.status_code == 200:
                    result = response.json()
                    print(f"✅ Grade level: {result['grade_level']}")
                    print(f"📈 Metrics: {result['metrics']}")
                    print(f"💡 Recommendations: {len(result['recommendations'])} suggestions")
                else:
                    print(f"❌ Error: {response.status_code} - {response.text}")
                    
            except Exception as e:
                print(f"❌ Exception: {str(e)}")
    
    def test_api_health(self):
        """Test API health endpoints"""
        print("🏥 Testing API Health...")
        
        endpoints = [
            "/",
            "/health",
            "/api/simplify/health",
            "/api/tutor/health",
            "/api/evaluate/health"
        ]
        
        for endpoint in endpoints:
            try:
                response = self.session.get(f"{self.base_url}{endpoint}")
                if response.status_code == 200:
                    print(f"✅ {endpoint}: OK")
                else:
                    print(f"❌ {endpoint}: {response.status_code}")
            except Exception as e:
                print(f"❌ {endpoint}: {str(e)}")
    
    def run_all_tests(self):
        """Run all tests"""
        print("🚀 Starting BuddyText Demo Tests...")
        print("=" * 50)
        
        # Test API health first
        self.test_api_health()
        
        # Run feature tests
        self.test_text_simplification()
        self.test_step_by_step_guide()
        self.test_tutor_qa()
        self.test_readability_evaluation()
        
        print("\n" + "=" * 50)
        print("🎉 Demo tests completed!")
        print("\nTo run the full application:")
        print("1. Start backend: ./start-backend.sh")
        print("2. Start frontend: ./start-frontend.sh")
        print("3. Visit: http://localhost:3000")

def main():
    demo = BuddyTextDemo()
    demo.run_all_tests()

if __name__ == "__main__":
    main()
