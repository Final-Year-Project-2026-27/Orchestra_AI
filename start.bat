@echo off
setlocal
pushd "%~dp0"
set "COMPOSE_FILE=Docker-compose.yml"

if not exist "%COMPOSE_FILE%" (
  echo [ERROR] %COMPOSE_FILE% was not found in the repository root.
  goto :failure
)

if not exist ".env" (
  echo [ERROR] Root .env file is missing.
  echo Add GEMINI_API_KEY and TAVILY_API_KEY to .env, then retry.
  goto :failure
)

findstr /R /C:"^[ ]*GEMINI_API_KEY[ ]*=" ".env" >nul
if errorlevel 1 (
  echo [ERROR] GEMINI_API_KEY is missing from the root .env file.
  goto :failure
)
findstr /R /C:"^[ ]*TAVILY_API_KEY[ ]*=" ".env" >nul
if errorlevel 1 (
  echo [ERROR] TAVILY_API_KEY is missing from the root .env file.
  goto :failure
)

docker info >nul 2>&1
if errorlevel 1 (
  echo [ERROR] Docker Engine is not running. Start Docker Desktop, wait until it is ready, then retry.
  goto :failure
)

docker compose version >nul 2>&1
if errorlevel 1 (
  echo [ERROR] Docker Compose V2 is unavailable. Update Docker Desktop and retry.
  goto :failure
)

echo [INFO] Creating any missing containers and starting both services...
docker compose -f "%COMPOSE_FILE%" up --build --detach backend frontend
if errorlevel 1 (
  echo [ERROR] Docker Compose could not build or start the services.
  goto :failure
)

start "Orchestra AI - BACKEND" cmd /k "docker compose -f ""%COMPOSE_FILE%"" logs --tail 100 --follow backend"
start "Orchestra AI - FRONTEND" cmd /k "docker compose -f ""%COMPOSE_FILE%"" logs --tail 100 --follow frontend"
start "" "http://localhost:3000"

echo.
echo [READY] Frontend: http://localhost:3000
echo [READY] Backend:  http://localhost:8000/health
echo Separate backend and frontend log windows are open.
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

