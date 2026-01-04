@echo off
echo ========================================
echo    KHOI PHUC CODE BI XOA
echo ========================================
echo.

echo [1/3] Checking Git reflog for lost commits...
echo Recent commits:
git reflog --oneline -10

echo.
echo [2/3] Looking for your code in Git history...
git log --oneline --all -10

echo.
echo [3/3] Trying to recover...
echo.
echo MANUAL RECOVERY OPTIONS:
echo 1. Find your commit hash above
echo 2. Run: git reset --hard [COMMIT_HASH]
echo 3. Or: git cherry-pick [COMMIT_HASH]
echo.
echo Example:
echo git reset --hard HEAD@{1}
echo.

set /p choice="Enter commit hash to recover (or press Enter to skip): "
if not "%choice%"=="" (
    echo Recovering to: %choice%
    git reset --hard %choice%
    echo Done! Check your files.
)

echo.
echo ========================================
echo    RECOVERY COMPLETE
echo ========================================
pause