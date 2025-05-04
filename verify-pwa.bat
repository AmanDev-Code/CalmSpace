@echo off
setlocal

echo Building the application...
call npm run build

echo Starting the preview server...
start /B npm run preview
rem Give the server time to start
timeout /t 5 > nul

echo.
echo Verifying critical PWA files:
call :check_url "http://localhost:4173/manifest.webmanifest" "Manifest file"
call :check_url "http://localhost:4173/.well-known/assetlinks.json" "Asset links file"
call :check_url "http://localhost:4173/pwa-icons/icon-192x192.png" "PWA icon (192x192)"
call :check_url "http://localhost:4173/pwa-icons/icon-512x512.png" "PWA icon (512x512)"
call :check_url "http://localhost:4173/sw.js" "Service worker"

echo.
echo Checking Lighthouse PWA scores requires running Lighthouse in Chrome.
echo You can do this by:
echo 1. Opening Chrome DevTools
echo 2. Going to the Lighthouse tab
echo 3. Selecting 'Progressive Web App' category
echo 4. Clicking 'Generate report'

echo.
echo The preview server is running in the background.
echo Press Ctrl+C to stop and exit...
pause > nul
goto :eof

:check_url
set URL=%~1
set DESCRIPTION=%~2
rem Using PowerShell to check HTTP status code
powershell -command "try { $response = Invoke-WebRequest -Uri '%URL%' -Method Head -UseBasicParsing; if ($response.StatusCode -eq 200) { Write-Host '✅ %DESCRIPTION% is accessible (200 OK)' } else { Write-Host '❌ %DESCRIPTION% returned HTTP ' $response.StatusCode } } catch { Write-Host '❌ %DESCRIPTION% is not accessible - Error: ' $_.Exception.Message }"
goto :eof 