@echo off
echo ==============================================
echo  Starting Smart Dairy Management - Backend
echo ==============================================
cd /d "%~dp0backend"
if exist mvnw.cmd (
    call mvnw.cmd spring-boot:run
) else (
    call mvn spring-boot:run
)
pause
