# Portfolio Backend - Django

## Setup Instructions

### 1. Create Virtual Environment
```bash
python -m venv venv
venv\Scripts\activate
```

### 2. Install Dependencies
```bash
pip install -r requirements.txt
```

### 3. Create Django Project
```bash
django-admin startproject portfolio_backend .
```

### 4. Create Django App
```bash
python manage.py startapp api
```

### 5. Run Migrations
```bash
python manage.py migrate
```

### 6. Create Superuser
```bash
python manage.py createsuperuser
```

### 7. Run Server
```bash
python manage.py runserver
```

Server will run on http://localhost:8000
Admin panel: http://localhost:8000/admin
API: http://localhost:8000/api/

## Project Structure
- `portfolio_backend/` - Main Django project settings
- `api/` - Django app for API endpoints
  - `models.py` - Database models (User, Project)
  - `serializers.py` - DRF serializers
  - `views.py` - API views
  - `urls.py` - URL routing
  - `authentication.py` - Custom authentication
