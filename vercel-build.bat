@echo off
setlocal

echo Starting custom Vercel build process...

:: Run the normal build process
echo Running npm build...
call npm run build

:: Create the .well-known directory in the output folder
echo Ensuring .well-known directory exists in output...
if not exist "dist\.well-known" mkdir "dist\.well-known"

:: Copy the assetlinks.json file from public
echo Copying assetlinks.json to output directory...
copy /Y "public\.well-known\assetlinks.json" "dist\.well-known\"

:: Verify the file exists in the output directory
if exist "dist\.well-known\assetlinks.json" (
  echo ✅ Successfully copied assetlinks.json to dist/.well-known/
  echo Content of dist/.well-known/assetlinks.json:
  type "dist\.well-known\assetlinks.json"
) else (
  echo ❌ Failed to copy assetlinks.json to dist/.well-known/
  echo Creating file manually...
  
  :: If the file copy failed, create it manually with the correct content
  (
    echo [
    echo   {
    echo     "relation": ["delegate_permission/common.handle_all_urls"],
    echo     "target": {
    echo       "namespace": "android_app",
    echo       "package_name": "com.calmspace.haven",
    echo       "sha256_cert_fingerprints": [
    echo         "59:77:CC:93:3B:B4:A4:CD:0F:C3:D9:C5:99:E7:F2:51:B8:04:CE:F0:55:2E:43:EA:5D:E0:35:14:E4:41:07:E3"
    echo       ]
    echo     }
    echo   }
    echo ]
  ) > "dist\.well-known\assetlinks.json"

  echo Manually created assetlinks.json in dist/.well-known/
)

:: Copy the manifest file if it exists
if exist "public\manifest.webmanifest" (
  echo Copying manifest.webmanifest to output directory...
  copy /Y "public\manifest.webmanifest" "dist\"
  echo ✅ Successfully copied manifest.webmanifest to dist/
) else (
  echo ❌ manifest.webmanifest not found in public directory
)

:: Make sure verify pages are copied
if exist "public\verify-technical-files.html" (
  echo Copying verify-technical-files.html to output directory...
  copy /Y "public\verify-technical-files.html" "dist\"
  echo ✅ Successfully copied verify-technical-files.html to dist/
)

if exist "public\check-assetlinks.html" (
  echo Copying check-assetlinks.html to output directory...
  copy /Y "public\check-assetlinks.html" "dist\"
  echo ✅ Successfully copied check-assetlinks.html to dist/
)

echo Custom build process completed! 