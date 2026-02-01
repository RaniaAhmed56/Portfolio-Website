# Futuristic Portfolio Website Design

A modern, futuristic portfolio website with Django backend and React frontend. Featuring real-time project management, image galleries, and secure authentication.



## 🚀 Features

- ✨ Stunning futuristic UI with smooth animations
- 🔐 Secure authentication (signup/signin with JWT tokens)
- 📸 Multi-image project galleries with navigation
- 🎨 Dynamic project management (CRUD operations)
- 🌐 Real-time database synchronization
- 📱 Responsive design
- ⚡ Fast performance with Vite

---

## 🛠️ Tech Stack

### Frontend
- **React** with TypeScript
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **motion/react** - Animations
- **Lucide React** - Icons
- **React Router** - Navigation

### Backend
- **Django 4.2** - Web framework
- **Django REST Framework** - API
- **SQLite** - Database
- **CORS** - Cross-origin support

---

## 📋 Prerequisites

- Node.js (v16+)
- Python 3.8+
- npm or yarn

---

## 🔧 Installation & Setup

### Frontend Setup

```bash
cd "Futuristic Portfolio Website Design"
npm install
```

### Backend Setup

```bash
cd "Futuristic Portfolio Website Design/django_backend"
pip install -r requirements.txt
python manage.py migrate
```

---

## ▶️ Running the Project

### Start Django Backend
```bash
cd django_backend
python manage.py runserver
# Backend runs on http://localhost:8000
```

### Start React Frontend
```bash
npm run dev
# Frontend runs on http://localhost:5173
```

---

## 📡 API Endpoints

### Authentication
- `POST /api/signup/` - Create new user account
- `POST /api/signin/` - Login and get JWT token

### Projects (Public)
- `GET /api/projects/` - Get all projects

### Projects (Authenticated)
- `POST /api/projects/` - Create new project
- `PUT /api/projects/{id}/` - Update project
- `DELETE /api/projects/{id}/` - Delete project

### Images
- `POST /api/upload/` - Upload and convert image to base64

---

## 🔑 Authentication

The API uses Bearer token authentication:

```
Authorization: Bearer <your_jwt_token>
```

---

## 📁 Project Structure

```
Futuristic Portfolio Website Design/
├── src/
│   ├── app/
│   │   ├── pages/          # Page components
│   │   ├── components/     # UI components
│   │   └── routes.tsx      # Routing setup
│   ├── lib/                # Utilities & API config
│   ├── contexts/           # React contexts
│   └── styles/             # CSS & themes
├── public/                 # Static assets
├── django_backend/         # Django API
│   ├── api/
│   │   ├── views.py       # API endpoints
│   │   ├── models.py      # Database models
│   │   └── serializers.py # Data serialization
│   └── manage.py
├── package.json
└── vite.config.ts
```

---

## 🌐 Environment Configuration

Frontend API base URL: `http://localhost:8000/api`

Backend CORS allowed origins: `http://localhost:5173`

---

## 🎨 Feature Highlights

### Image Management
- Upload images as base64 data URLs
- Support for multiple images per project
- Image navigation with keyboard arrows and UI buttons
- Image preview with fallback

### Project Management
- Create, read, update, delete projects
- Store project metadata (links, descriptions)
- Real-time synchronization with backend

### Authentication
- Secure signup with email validation
- Signin with email and password
- JWT token-based sessions
- Protected routes and endpoints

---

## 🐛 Troubleshooting

### Images not displaying
- Check browser console for errors
- Ensure images are uploaded as valid base64 data URLs
- Verify ImageWithFallback component is loading

### API connection issues
- Confirm Django backend is running on `localhost:8000`
- Check CORS settings in Django
- Verify frontend API base URL is correct

### Database errors
- Run migrations: `python manage.py migrate`
- Check database file exists in django_backend/

---

## 📄 License

This project is based on the Figma design.

---

## 👤 Author

Portfolio Website by **Rania Ahmed**

---

## 🤝 Support

For issues or questions, check the troubleshooting section above.

---

**Last Updated:** February 2026
