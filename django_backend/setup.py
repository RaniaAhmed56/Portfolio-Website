"""
Setup script to quickly set up the Django project
Run this first before everything else
"""
import os
import sys
import subprocess

def setup_django():
    """Setup Django project structure"""
    
    # Check if django-admin is available
    try:
        subprocess.run([sys.executable, '-m', 'django', '--version'], 
                      capture_output=True, check=True)
    except subprocess.CalledProcessError:
        print("Django not installed. Install dependencies first:")
        print("pip install -r requirements.txt")
        return False
    
    # Create Django project if it doesn't exist
    if not os.path.exists('portfolio_backend'):
        print("Creating Django project...")
        subprocess.run([sys.executable, '-m', 'django', 'startproject', 
                       'portfolio_backend', '.'], check=True)
    
    # Create API app if it doesn't exist
    if not os.path.exists('api'):
        print("Creating API app...")
        subprocess.run([sys.executable, 'manage.py', 'startapp', 'api'], 
                      check=True)
    
    print("✅ Django setup complete!")
    print("\nNext steps:")
    print("1. Update portfolio_backend/settings.py with the provided configuration")
    print("2. Run migrations: python manage.py migrate")
    print("3. Create superuser: python manage.py createsuperuser")
    print("4. Run server: python manage.py runserver")

if __name__ == '__main__':
    setup_django()
