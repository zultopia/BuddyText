from typing import Dict, Any, List, Optional
import re
import asyncio

class StepByStepService:
    def __init__(self):
        self.step_templates = {
            "form": self._create_form_steps,
            "registration": self._create_registration_steps,
            "payment": self._create_payment_steps,
            "general": self._create_general_steps
        }
    
    async def create_guide(
        self, 
        instruction: str, 
        context: Optional[str] = None,
        user_level: str = "beginner"
    ) -> Dict[str, Any]:
        """
        Membuat panduan step-by-step dari instruksi kompleks
        """
        try:
            # Detect instruction type
            instruction_type = self._detect_instruction_type(instruction, context)
            
            # Create steps based on type
            steps = await self._create_steps(instruction, instruction_type, user_level)
            
            # Estimate time
            estimated_time = self._estimate_time(steps, user_level)
            
            return {
                "steps": steps,
                "estimated_time": estimated_time
            }
            
        except Exception as e:
            # Fallback to general steps
            return await self._create_fallback_guide(instruction, user_level)
    
    def _detect_instruction_type(self, instruction: str, context: Optional[str] = None) -> str:
        """Detect jenis instruksi berdasarkan keywords"""
        
        instruction_lower = instruction.lower()
        context_lower = (context or "").lower()
        combined_text = f"{instruction_lower} {context_lower}"
        
        if any(word in combined_text for word in ["formulir", "form", "mengisi", "isi"]):
            return "form"
        elif any(word in combined_text for word in ["daftar", "registrasi", "register", "pendaftaran"]):
            return "registration"
        elif any(word in combined_text for word in ["bayar", "pembayaran", "payment", "transfer"]):
            return "payment"
        else:
            return "general"
    
    async def _create_steps(
        self, 
        instruction: str, 
        instruction_type: str, 
        user_level: str
    ) -> List[Dict[str, str]]:
        """Create steps berdasarkan jenis instruksi"""
        
        if instruction_type in self.step_templates:
            return self.step_templates[instruction_type](instruction, user_level)
        else:
            return self._create_general_steps(instruction, user_level)
    
    def _create_form_steps(self, instruction: str, user_level: str) -> List[Dict[str, str]]:
        """Create steps untuk mengisi formulir"""
        
        steps = [
            {
                "step_number": "1",
                "description": "Baca semua instruksi dengan teliti",
                "example": "Lihat bagian atas formulir untuk petunjuk khusus"
            },
            {
                "step_number": "2", 
                "description": "Siapkan dokumen yang diperlukan",
                "example": "KTP, kartu keluarga, atau dokumen pendukung lainnya"
            },
            {
                "step_number": "3",
                "description": "Isi bagian identitas diri",
                "example": "Nama lengkap, tanggal lahir, alamat"
            },
            {
                "step_number": "4",
                "description": "Isi informasi tambahan yang diminta",
                "example": "Nomor telepon, email, pekerjaan"
            },
            {
                "step_number": "5",
                "description": "Periksa kembali semua data yang sudah diisi",
                "example": "Pastikan tidak ada kesalahan penulisan"
            },
            {
                "step_number": "6",
                "description": "Tandatangani atau centang kotak persetujuan",
                "example": "Baca syarat dan ketentuan sebelum menyetujui"
            },
            {
                "step_number": "7",
                "description": "Klik tombol kirim atau submit",
                "example": "Tunggu konfirmasi bahwa formulir berhasil dikirim"
            }
        ]
        
        return self._adjust_steps_for_level(steps, user_level)
    
    def _create_registration_steps(self, instruction: str, user_level: str) -> List[Dict[str, str]]:
        """Create steps untuk pendaftaran"""
        
        steps = [
            {
                "step_number": "1",
                "description": "Kunjungi halaman pendaftaran",
                "example": "Buka website atau aplikasi yang dimaksud"
            },
            {
                "step_number": "2",
                "description": "Klik tombol 'Daftar' atau 'Register'",
                "example": "Biasanya ada di pojok kanan atas halaman"
            },
            {
                "step_number": "3",
                "description": "Isi informasi akun",
                "example": "Email, password, nama lengkap"
            },
            {
                "step_number": "4",
                "description": "Verifikasi email atau nomor telepon",
                "example": "Cek email atau SMS untuk kode verifikasi"
            },
            {
                "step_number": "5",
                "description": "Lengkapi profil pengguna",
                "example": "Upload foto profil, isi informasi tambahan"
            },
            {
                "step_number": "6",
                "description": "Konfirmasi pendaftaran",
                "example": "Klik link konfirmasi di email"
            }
        ]
        
        return self._adjust_steps_for_level(steps, user_level)
    
    def _create_payment_steps(self, instruction: str, user_level: str) -> List[Dict[str, str]]:
        """Create steps untuk pembayaran"""
        
        steps = [
            {
                "step_number": "1",
                "description": "Pilih metode pembayaran",
                "example": "Transfer bank, kartu kredit, atau e-wallet"
            },
            {
                "step_number": "2",
                "description": "Masukkan jumlah yang akan dibayar",
                "example": "Pastikan jumlah sudah benar"
            },
            {
                "step_number": "3",
                "description": "Isi informasi pembayaran",
                "example": "Nomor rekening, nama pemilik rekening"
            },
            {
                "step_number": "4",
                "description": "Periksa detail pembayaran",
                "example": "Pastikan semua informasi sudah benar"
            },
            {
                "step_number": "5",
                "description": "Konfirmasi pembayaran",
                "example": "Klik tombol 'Bayar' atau 'Konfirmasi'"
            },
            {
                "step_number": "6",
                "description": "Simpan bukti pembayaran",
                "example": "Screenshot atau download receipt"
            }
        ]
        
        return self._adjust_steps_for_level(steps, user_level)
    
    def _create_general_steps(self, instruction: str, user_level: str) -> List[Dict[str, str]]:
        """Create steps untuk instruksi umum"""
        
        # Split instruction into logical parts
        sentences = re.split(r'[.!?]+', instruction)
        sentences = [s.strip() for s in sentences if s.strip()]
        
        steps = []
        for i, sentence in enumerate(sentences[:6], 1):  # Max 6 steps
            # Simplify the sentence
            simplified = self._simplify_sentence(sentence)
            
            steps.append({
                "step_number": str(i),
                "description": simplified,
                "example": f"Contoh: {self._create_example_for_sentence(sentence)}"
            })
        
        return self._adjust_steps_for_level(steps, user_level)
    
    def _simplify_sentence(self, sentence: str) -> str:
        """Simplify a single sentence"""
        
        # Remove complex words
        replacements = {
            "menggunakan": "pakai",
            "melakukan": "lakukan",
            "mengikuti": "ikuti",
            "memastikan": "pastikan",
            "melengkapi": "lengkapi",
            "menyelesaikan": "selesaikan"
        }
        
        simplified = sentence
        for complex_word, simple_word in replacements.items():
            simplified = simplified.replace(complex_word, simple_word)
        
        return simplified
    
    def _create_example_for_sentence(self, sentence: str) -> str:
        """Create example for a sentence"""
        
        if "klik" in sentence.lower():
            return "Klik tombol yang berwarna biru"
        elif "isi" in sentence.lower():
            return "Tulis nama Anda di kotak kosong"
        elif "pilih" in sentence.lower():
            return "Pilih opsi yang sesuai dengan kebutuhan Anda"
        else:
            return "Ikuti petunjuk yang ada di layar"
    
    def _adjust_steps_for_level(self, steps: List[Dict[str, str]], user_level: str) -> List[Dict[str, str]]:
        """Adjust steps berdasarkan level pengguna"""
        
        if user_level == "beginner":
            # Add more detailed explanations
            for step in steps:
                step["description"] = f"Langkah {step['step_number']}: {step['description']}"
                step["example"] = f"💡 {step['example']}"
        
        elif user_level == "advanced":
            # Make steps more concise
            for step in steps:
                step["description"] = step["description"]
                step["example"] = step["example"]
        
        return steps
    
    def _estimate_time(self, steps: List[Dict[str, str]], user_level: str) -> str:
        """Estimate waktu yang dibutuhkan"""
        
        base_time = len(steps) * 2  # 2 minutes per step
        
        if user_level == "beginner":
            estimated_minutes = base_time * 1.5
        elif user_level == "advanced":
            estimated_minutes = base_time * 0.7
        else:
            estimated_minutes = base_time
        
        if estimated_minutes < 60:
            return f"Perkiraan waktu: {int(estimated_minutes)} menit"
        else:
            hours = int(estimated_minutes // 60)
            minutes = int(estimated_minutes % 60)
            return f"Perkiraan waktu: {hours} jam {minutes} menit"
    
    async def _create_fallback_guide(self, instruction: str, user_level: str) -> Dict[str, Any]:
        """Fallback guide jika terjadi error"""
        
        steps = [
            {
                "step_number": "1",
                "description": "Baca instruksi dengan teliti",
                "example": "Pastikan Anda memahami semua bagian"
            },
            {
                "step_number": "2",
                "description": "Siapkan semua yang diperlukan",
                "example": "Dokumen, informasi, atau alat yang dibutuhkan"
            },
            {
                "step_number": "3",
                "description": "Ikuti langkah-langkah satu per satu",
                "example": "Jangan terburu-buru, lakukan dengan hati-hati"
            },
            {
                "step_number": "4",
                "description": "Periksa hasil setiap langkah",
                "example": "Pastikan setiap langkah sudah benar"
            },
            {
                "step_number": "5",
                "description": "Selesaikan sampai akhir",
                "example": "Ikuti semua langkah sampai selesai"
            }
        ]
        
        return {
            "steps": self._adjust_steps_for_level(steps, user_level),
            "estimated_time": "Perkiraan waktu: 10-15 menit"
        }
