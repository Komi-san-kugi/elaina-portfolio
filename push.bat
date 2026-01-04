@echo off
echo ========================================
echo    KOMI PORTFOLIO PUSH
echo ========================================
echo.

echo Fixing Git issues...
git rebase --abort >nul 2>&1
git merge --abort >nul 2>&1
git reset --hard HEAD >nul 2>&1

echo Adding changes...
git add .

echo Committing...
git commit -m "Update"

echo Pushing...
git push origin main --force

echo.
echo ========================================
echo    DONE!
echo ========================================
pause