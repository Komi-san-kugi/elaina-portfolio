@echo off
chcp 65001 >nul
cls
echo ========================================
echo    🐳 KOMI PORTFOLIO - DOCKER AUTO RUN
echo ========================================
echo.

echo [1/4] 🛑 Dừng container cũ (nếu có)...
docker stop komi-portfolio 2>nul
docker rm komi-portfolio 2>nul

echo [2/4] 🔨 Build Docker image...
docker build -t komi-portfolio .
if errorlevel 1 (
    echo ❌ Build thất bại!
    pause
    exit /b 1
)

echo [3/4] 🚀 Chạy container...
docker run -d -p 8080:80 --name komi-portfolio --restart unless-stopped komi-portfolio
if errorlevel 1 (
    echo ❌ Chạy container thất bại!
    pause
    exit /b 1
)

echo [4/4] ✅ Hoàn thành!
echo.
echo ========================================
echo    🌐 WEBSITE ĐÃ CHẠY!
echo ========================================
echo.
echo 🔗 Truy cập: http://localhost:8080
echo 📊 Kiểm tra: docker ps
echo 🛑 Dừng: docker stop komi-portfolio
echo.
pause