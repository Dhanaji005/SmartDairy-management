@echo off
echo ==============================================
echo  Starting Smart Dairy Management - Backend
echo ==============================================

:: Load environment variables from root .env if it exists
if exist "%~dp0.env" (
    echo [INFO] Loading environment variables from .env...
    for /f "usebackq eol=# tokens=1* delims==" %%i in ("%~dp0.env") do (
        set "%%i=%%j"
    )
)

cd /d "%~dp0backend"

if defined SPRING_PROFILES_ACTIVE (
    echo [INFO] Active Spring Profile: %SPRING_PROFILES_ACTIVE%
    if exist mvnw.cmd (
        call mvnw.cmd spring-boot:run -Dspring-boot.run.profiles=%SPRING_PROFILES_ACTIVE%
    ) else (
        call mvn spring-boot:run -Dspring-boot.run.profiles=%SPRING_PROFILES_ACTIVE%
    )
) else (
    if exist mvnw.cmd (
        call mvnw.cmd spring-boot:run
    ) else (
        call mvn spring-boot:run
    )
)
pause
