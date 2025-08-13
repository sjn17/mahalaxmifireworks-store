@echo off
echo 🎆 Starting Mahalaxmi Fireworks Store...
echo.

echo 📋 Prerequisites:
echo - Make sure MongoDB is running
echo - Copy server/env.sample to server/.env and update MONGO_URI if needed
echo.

echo 🚀 Starting Server...
start "Server" cmd /k "cd server && npm run dev"

echo ⏳ Waiting for server to start...
timeout /t 5 /nobreak > nul

echo 🌐 Starting Client...
start "Client" cmd /k "cd client && npm run dev"

echo.
echo ✅ Both server and client are starting!
echo 📱 Client will open at: http://localhost:5173
echo 🔌 Server will run at: http://localhost:5000
echo.
echo 💡 To seed the database with sample products, run:
echo    cd server && npm run seed
echo.
pause
