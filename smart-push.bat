@echo off
chcp 65001 >nul
echo ========================================
echo    PUSH CODE LÊN GITHUB THÔNG MINH
echo ========================================
echo.

for %%I in (.) do set "PROJECT_NAME=%%~nxI"
echo Dự án: %PROJECT_NAME%
echo Vị trí: %CD%
echo.

echo Đang kiểm tra remote hiện tại...
git remote -v 2>nul
if errorlevel 1 (
    echo Chưa có Git repository!
    echo Đang khởi tạo Git...
    git init
    git branch -M main
)

echo.
echo URL remote hiện tại:
git remote get-url origin 2>nul
if errorlevel 1 (
    echo Chưa có remote nào
) else (
    echo Đã có remote sẵn
)

echo.
echo ========================================
echo    THIẾT LẬP REMOTE
echo ========================================
echo.
echo 1. Giữ remote hiện tại (nếu có)
echo 2. Nhập URL GitHub mới
echo 3. Tự động tạo từ tên dự án
echo.
set /p choice="Chọn tùy chọn (1/2/3): "

if "%choice%"=="2" (
    echo.
    set /p repo_url="Nhập URL GitHub repo: "
    echo Đang set remote thành: !repo_url!
    git remote remove origin 2>nul
    git remote add origin !repo_url!
) else if "%choice%"=="3" (
    echo.
    set /p username="Nhập tên GitHub của bạn: "
    set "auto_url=https://github.com/!username!/!PROJECT_NAME!.git"
    echo URL tự động tạo: !auto_url!
    set /p confirm="Dùng URL này không? (y/n): "
    if /i "!confirm!"=="y" (
        git remote remove origin 2>nul
        git remote add origin !auto_url!
    )
)

echo.
echo ========================================
echo    ĐANG PUSH LÊN GITHUB
echo ========================================
echo.

echo URL cuối cùng:
git remote get-url origin

echo.
echo Đang sửa lỗi Git...
git rebase --abort >nul 2>&1
git merge --abort >nul 2>&1
git reset --hard HEAD >nul 2>&1

echo Đang thêm thay đổi...
git add .

echo Đang commit...
git commit -m "Cập nhật: %date% %time%"

echo Đang push...
git push origin main --force

echo.
echo ========================================
echo    THÀNH CÔNG!
echo ========================================
echo.
echo Code của bạn đã lên GitHub!
echo Lần sau có thể chọn số 1 để giữ remote này.
echo.
pause