@echo off
chcp 65001 >nul
echo ========================================
echo    PUSH CODE LÊN GITHUB
echo ========================================
echo.

echo Dự án hiện tại: %CD%
echo.

echo Kiểm tra remote hiện tại:
git remote get-url origin 2>nul
if errorlevel 1 (
    echo.
    echo ❌ Chưa có remote GitHub!
    echo.
    set /p repo_url="Nhập URL GitHub repo (vd: https://github.com/username/repo.git): "
    echo.
    echo Đang thêm remote...
    git remote add origin "%repo_url%"
    echo ✓ Đã thêm remote: %repo_url%
) else (
    echo ✓ Đã có remote sẵn
)

echo.
echo ========================================
echo    BẮT ĐẦU PUSH
echo ========================================
echo.

echo [1/4] Sửa lỗi Git...
git rebase --abort >nul 2>&1
git merge --abort >nul 2>&1

echo [2/4] Thêm tất cả thay đổi...
git add .

echo [3/4] Commit...
git commit -m "Update: %date% %time%" >nul 2>&1

echo [4/4] Push lên GitHub...
git push origin main --force

if errorlevel 1 (
    echo.
    echo ❌ PUSH THẤT BẠI!
    echo Kiểm tra lại URL và quyền truy cập
    pause
    exit
)

echo.
echo ========================================
echo    ✅ THÀNH CÔNG!
echo ========================================
echo.
echo Code đã được push lên GitHub!
echo.
pause