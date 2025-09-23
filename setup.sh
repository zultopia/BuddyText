#!/bin/bash

# BuddyText Setup Script
# This script sets up the development environment for BuddyText

echo "🚀 Setting up BuddyText Development Environment..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16 or higher."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Setup Backend
echo "📦 Setting up backend..."
cd backend

# Create virtual environment
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating .env file..."
    cp env.example .env
    echo "⚠️  Please update .env file with your configuration"
fi

# Create necessary directories
mkdir -p logs
mkdir -p models
mkdir -p data

echo "✅ Backend setup complete"

# Setup Frontend
echo "📦 Setting up frontend..."
cd ../frontend

# Install dependencies
echo "Installing Node.js dependencies..."
npm install

# Create .env.local file if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "Creating .env.local file..."
    cp env.example .env.local
    echo "⚠️  Please update .env.local file with your configuration"
fi

echo "✅ Frontend setup complete"

# Create startup scripts
echo "📝 Creating startup scripts..."

# Backend startup script
cat > ../start-backend.sh << 'EOF'
#!/bin/bash
cd backend
source venv/bin/activate
python main.py
EOF

# Frontend startup script
cat > ../start-frontend.sh << 'EOF'
#!/bin/bash
cd frontend
npm start
EOF

# Make scripts executable
chmod +x ../start-backend.sh
chmod +x ../start-frontend.sh

echo "✅ Startup scripts created"

echo ""
echo "🎉 Setup complete!"
echo ""
echo "To start the application:"
echo "1. Start backend: ./start-backend.sh"
echo "2. Start frontend: ./start-frontend.sh"
echo ""
echo "The application will be available at:"
echo "- Frontend: http://localhost:3000"
echo "- Backend API: http://localhost:8000"
echo "- API Documentation: http://localhost:8000/docs"
echo ""
echo "Happy coding! 🚀"
