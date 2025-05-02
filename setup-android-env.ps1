# PowerShell script to set up Android environment variables
# Run this after installing Android Studio and SDK

# Detect Android SDK location (common paths)
$possiblePaths = @(
    "$env:LOCALAPPDATA\Android\Sdk",
    "C:\Android\Sdk",
    "$env:USERPROFILE\AppData\Local\Android\Sdk"
)

$sdkPath = $null
foreach ($path in $possiblePaths) {
    if (Test-Path $path) {
        $sdkPath = $path
        break
    }
}

if ($null -eq $sdkPath) {
    Write-Host "Android SDK not found in common locations." -ForegroundColor Red
    $sdkPath = Read-Host "Please enter the full path to your Android SDK location"
    
    if (-not (Test-Path $sdkPath)) {
        Write-Host "The specified path does not exist. Exiting." -ForegroundColor Red
        exit 1
    }
}

# Set environment variables
[System.Environment]::SetEnvironmentVariable("ANDROID_SDK_ROOT", $sdkPath, [System.EnvironmentVariableTarget]::User)
[System.Environment]::SetEnvironmentVariable("ANDROID_HOME", $sdkPath, [System.EnvironmentVariableTarget]::User)

# Add SDK tools to PATH
$toolsPaths = @(
    "$sdkPath\tools",
    "$sdkPath\tools\bin",
    "$sdkPath\platform-tools"
)

$currentPath = [System.Environment]::GetEnvironmentVariable("PATH", [System.EnvironmentVariableTarget]::User)
foreach ($toolPath in $toolsPaths) {
    if (-not $currentPath.Contains($toolPath)) {
        $currentPath = "$currentPath;$toolPath"
    }
}
[System.Environment]::SetEnvironmentVariable("PATH", $currentPath, [System.EnvironmentVariableTarget]::User)

# Create local.properties file
$localPropertiesPath = "android\local.properties"
$escaped = $sdkPath -replace "\\", "\\"
Set-Content -Path $localPropertiesPath -Value "sdk.dir=$escaped"

Write-Host "Android environment variables set up successfully!" -ForegroundColor Green
Write-Host "ANDROID_SDK_ROOT = $sdkPath" -ForegroundColor Cyan
Write-Host "Local properties file created at $localPropertiesPath" -ForegroundColor Cyan
Write-Host "Please restart your terminal for changes to take effect." -ForegroundColor Yellow 