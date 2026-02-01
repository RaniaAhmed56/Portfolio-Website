@echo off
REM Quick start script for Django backend setup

echo ========================================
echo Portfolio Backend - Django Setup
echo ========================================

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed or not in PATH
    pause
    exit /b 1
)

REM Create virtual environment
if not exist venv (
    echo.
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo.
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies
echo.
echo Installing dependencies...
pip install -r requirements.txt

REM Run migrations
echo.
echo Running migrations...
python manage.py migrate

REM Create superuser (optional)
echo.
echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo To create a superuser, run:
echo     python manage.py createsuperuser
echo.
echo To start the development server, run:
echo     python manage.py runserver
echo.
echo API will be available at: http://localhost:8000/api/
echo Admin panel: http://localhost:8000/admin/
echo.
pause
