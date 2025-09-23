# BuddyText - LLaMA Cognitive-Friendly Tutor

## Deskripsi Proyek
AI tutor yang membantu orang dengan disabilitas kognitif (disleksia, autism spectrum, intellectual disability, atau kesulitan belajar) untuk memahami teks kompleks dengan cara menyederhanakan, merangkum, dan memberikan penjelasan step-by-step.

## Fitur Utama
- **Text Simplification**: Menyederhanakan artikel berita, dokumen resmi, dan instruksi kompleks
- **Step-by-step Guidance**: Memecah instruksi menjadi langkah-langkah kecil yang mudah diikuti
- **Conversational Tutor**: Sistem Q&A untuk menjelaskan kata-kata atau konsep yang sulit
- **Multimodal Support**: Text-to-Speech dan visual aids untuk mendukung pembelajaran

## Struktur Proyek
```
BuddyText/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── models/         # Data models
│   │   ├── services/       # Business logic
│   │   ├── api/           # API endpoints
│   │   └── utils/         # Utility functions
│   ├── requirements.txt
│   └── main.py
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API services
│   │   ├── utils/         # Frontend utilities
│   │   └── App.js
│   └── package.json
├── data/                  # Datasets dan training data
├── models/                # Pre-trained models
└── README.md
```

## Setup dan Instalasi

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python main.py
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

## Teknologi yang Digunakan
- **Backend**: FastAPI, Python, LLaMA/Transformers
- **Frontend**: React, Styled Components, Framer Motion
- **AI Model**: LLaMA 3 dengan fine-tuning untuk text simplification
- **Evaluation**: Flesch-Kincaid, Dale-Chall readability metrics

## Dataset
- Simple English Wikipedia
- PWKP (Parallel Wikipedia Simplification Corpus)
- ASSET dataset
- Custom Indonesian simplification corpus

## Demo Scenarios
1. **Text Simplification**: Input dokumen kompleks → Output bahasa sederhana
2. **Step-by-step Guidance**: Instruksi formulir → Langkah-langkah terstruktur
3. **Q&A Tutor**: Pertanyaan tentang kata sulit → Penjelasan sederhana dengan contoh

## Kontribusi
Silakan buat issue atau pull request untuk berkontribusi pada proyek ini.

## Lisensi
MIT License
