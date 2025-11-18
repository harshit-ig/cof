@echo off
echo ========================================
echo Backing up uploads folder from server
echo ========================================
echo.

REM Download uploads folder from server using SCP
REM This will overwrite local files with server files
scp -r root@168.231.78.166:/var/www/cof/backend/uploads/* ./uploads/

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo ✅ Backup completed successfully!
    echo ========================================
) else (
    echo.
    echo ========================================
    echo ❌ Backup failed!
    echo ========================================
    echo.
    echo Make sure:
    echo 1. SSH is configured and you can connect to the server
    echo 2. The server path is correct: /var/www/cof/backend/uploads
    echo 3. You have the necessary permissions
)

pause
