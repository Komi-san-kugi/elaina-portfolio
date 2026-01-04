@echo off
echo ========================================
echo    SAFE PUSH - NO RESET
echo ========================================
echo.

echo [1/4] Checking current status...
git status

echo.
echo [2/4] Adding changes...
git add .

echo [3/4] Committing...
git commit -m "Safe update: %date% %time%"

echo [4/4] Pushing...
git push origin main

echo.
echo ========================================
echo    DONE - NO FILES DELETED!
echo ========================================
pause