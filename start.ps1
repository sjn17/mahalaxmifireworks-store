Write-Host "🎆 Starting Mahalaxmi Fireworks Store..." -ForegroundColor Green
Write-Host ""

Write-Host "📋 Prerequisites:" -ForegroundColor Yellow
Write-Host "- Make sure MongoDB is running"
Write-Host "- Copy server/env.sample to server/.env and update MONGO_URI if needed"
Write-Host ""

Write-Host "🚀 Starting Server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd server; npm run dev" -WindowStyle Normal

Write-Host "⏳ Waiting for server to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

Write-Host "🌐 Starting Client..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd client; npm run dev" -WindowStyle Normal

Write-Host ""
Write-Host "✅ Both server and client are starting!" -ForegroundColor Green
Write-Host "📱 Client will open at: http://localhost:5173" -ForegroundColor White
Write-Host "🔌 Server will run at: http://localhost:5000" -ForegroundColor White
Write-Host ""
Write-Host "💡 To seed the database with sample products, run:" -ForegroundColor Yellow
Write-Host "   cd server; npm run seed"
Write-Host ""
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
