@echo off
chcp 65001 >nul
echo ========================================
echo    PUSH CODE LÊN GITHUB
echo ========================================
echo.

echo Dự án hiện tại: %CD%
echo.

echo Kiểm tra remote hiện tại:
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo.
    echo ❌ Chưa có remote GitHub!
    echo.
    set /p new_url="Nhập URL GitHub repo: "
    echo.
    echo Đang thêm remote...
    git remote add origin "%new_url%"
    echo ✓ Đã thêm remote
) else (
    echo ✓ Đã có remote sẵn
    echo Remote URL:
    git remote get-url origin
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
git commit -m "Update" >nul 2>&1

echo [4/4] Push lên GitHub...
git push origin main --force

if errorlevel 1 (
    echo.
    echo ❌ PUSH THẤT BẠI!
    echo.
    echo Có thể do:
    echo 1. URL GitHub sai
    echo 2. Không có quyền truy cập
    echo 3. Repo không tồn tại
    echo.
    echo Muốn thử lại với URL mới? (y/n)
    set /p retry=
    if /i "%retry%"=="y" (
        git remote remove origin
        set /p new_url="Nhập URL mới: "
        git remote add origin "%new_url%"
        git push origin main --force
    )
) else (
    echo.
    echo ========================================
    echo    ✅ THÀNH CÔNG!
    echo ========================================
    echo.
    echo Code đã được push lên GitHub!
)

echo.
pause