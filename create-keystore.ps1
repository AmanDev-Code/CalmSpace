# PowerShell script to generate a keystore using the JDK that comes with Android Studio

# Find the JDK location that comes with Android Studio
$jdkPath = "$env:ANDROID_SDK_ROOT\jre\bin"
$cmdKeytool = "$jdkPath\keytool.exe"

# Check if keytool exists at that location
if (-not (Test-Path $cmdKeytool)) {
    # Try alternative locations
    $jdkPath = "$env:LOCALAPPDATA\Android\Sdk\jre\bin"
    $cmdKeytool = "$jdkPath\keytool.exe"
    
    if (-not (Test-Path $cmdKeytool)) {
        Write-Host "Cannot find keytool.exe in the Android SDK. Please specify the path to your JDK bin directory:" -ForegroundColor Yellow
        $jdkPath = Read-Host "JDK bin directory path"
        $cmdKeytool = "$jdkPath\keytool.exe"
        
        if (-not (Test-Path $cmdKeytool)) {
            Write-Host "keytool.exe not found at the specified location. Please install JDK or correct the path." -ForegroundColor Red
            exit 1
        }
    }
}

# Create the keystore directory if it doesn't exist
$keystoreDir = "android\app"
if (-not (Test-Path $keystoreDir)) {
    New-Item -ItemType Directory -Path $keystoreDir -Force | Out-Null
}

# Generate the keystore
$keystorePath = "$keystoreDir\calmspace.keystore"
$storepass = "calmspace"
$keypass = "calmspace"
$alias = "calmspace"
$dname = "CN=CalmSpace, OU=Mobile, O=CalmSpace, L=Bangalore, ST=Karnataka, C=IN"

Write-Host "Generating keystore at $keystorePath using $cmdKeytool" -ForegroundColor Cyan

# Run keytool to generate the keystore
& $cmdKeytool -genkeypair -v -keystore $keystorePath -alias $alias -keyalg RSA -keysize 2048 -validity 10000 -storepass $storepass -keypass $keypass -dname $dname

if ($LASTEXITCODE -eq 0) {
    Write-Host "Keystore generated successfully at $keystorePath" -ForegroundColor Green
} else {
    Write-Host "Failed to generate keystore. Error code: $LASTEXITCODE" -ForegroundColor Red
    exit 1
}

# Create/update the signing config in build.gradle
$gradlePath = "android\app\build.gradle"
if (Test-Path $gradlePath) {
    $gradleContent = Get-Content $gradlePath -Raw
    
    # Check if signing config already exists
    if (-not $gradleContent.Contains("signingConfigs")) {
        Write-Host "Adding signing configuration to $gradlePath" -ForegroundColor Cyan
        
        # Find the android { block
        $androidBlockPattern = "android\s*\{"
        $signingConfig = @"

    signingConfigs {
        release {
            storeFile file('calmspace.keystore')
            storePassword 'calmspace'
            keyAlias 'calmspace'
            keyPassword 'calmspace'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
"@
        
        if ($gradleContent -match $androidBlockPattern) {
            $gradleContent = $gradleContent -replace "buildTypes\s*\{", "$signingConfig"
            Set-Content -Path $gradlePath -Value $gradleContent
            Write-Host "Signing configuration added to build.gradle" -ForegroundColor Green
        } else {
            Write-Host "Could not find android { block in build.gradle. Manual configuration required." -ForegroundColor Yellow
        }
    } else {
        Write-Host "Signing configuration already exists in build.gradle" -ForegroundColor Cyan
    }
} else {
    Write-Host "build.gradle not found at $gradlePath" -ForegroundColor Red
}

Write-Host "Keystore setup complete. You can now run build-apk.bat to create the signed APK." -ForegroundColor Green 