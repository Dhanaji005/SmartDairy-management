@echo off
echo ==============================================
echo  Starting Smart Dairy Management - Frontend
echo ==============================================
cd /d "%~dp0frontend"
call npm.cmd run dev
pause
