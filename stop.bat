@echo off
setlocal
pushd "%~dp0"
set "COMPOSE_FILE=Docker-compose.yml"

if not exist "%COMPOSE_FILE%" (
  echo [ERROR] %COMPOSE_FILE% was not found in the repository root.
  goto :failure
)

docker info >nul 2>&1
if errorlevel 1 (
  echo [ERROR] Docker Engine is not running. Start Docker Desktop, then retry stop.bat.
  goto :failure
)

docker compose version >nul 2>&1
if errorlevel 1 (
  echo [ERROR] Docker Compose V2 is unavailable. Update Docker Desktop and retry.
  goto :failure
)

echo [INFO] Stopping and removing the Orchestra AI service containers...
docker compose -f "%COMPOSE_FILE%" down
if errorlevel 1 (
  echo [ERROR] Docker Compose could not stop the services.
  goto :failure
)

echo [OK] Frontend and backend containers are stopped.
echo [OK] Backend files in backend\data are preserved.
popd
pause >nul
endlocal
exit /b 0

:failure
echo.
popd
pause
endlocal
exit /b 1
