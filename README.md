# 🔧 Rent It — Equipment Rental Platform

A full-stack equipment rental platform built for campus and lab use cases. Equipment owners (employees) can list assets, and users can browse, search, and rent them.

**Live Demo**: [Frontend](https://fdfed-gilt.vercel.app) · [API Docs](https://fdfed.onrender.com/api-docs)

---

## ✨ Features

| Role | Capabilities |
|------|-------------|
| **User** | Browse equipment, search by location, add to cart, rent equipment, view booking history, cancel upcoming rentals |
| **Employee** | List new equipment, view dashboard with revenue analytics, track active rentals |
| **Admin** | View login stats, manage users/employees, view platform-wide statistics and recent bookings |

- 🔐 Cookie-based authentication with role-based access control
- 📊 Provider Dashboard with revenue tracking
- 🛒 Shopping cart with persistent state
- 📅 Smart rental date calculation
- 🔍 Location-based equipment search
- 📖 Swagger API documentation

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite, Redux Toolkit, React Router v6 |
| Backend | Node.js, Express, Mongoose |
| Database | MongoDB (Atlas for production) |
| Deployment | Vercel (Frontend), Render (Backend) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB running locally (or a MongoDB Atlas connection string)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/FDFED.git
cd FDFED-main
```

### 2. Backend Setup
```bash
cd backend
cp .env.example .env     # Edit with your MongoDB URI
npm install
npm run dev              # Starts on http://localhost:8000
```

### 3. Frontend Setup
```bash
cd Frontend
cp .env.example .env     # Edit backend URL if needed
npm install
npm run dev              # Starts on http://localhost:5173
```

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)
| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/rent-it` |
| `PORT` | Server port | `8000` |
| `CORS_ORIGIN` | Comma-separated allowed origins | `https://fdfed-gilt.vercel.app,http://localhost:5173` |

### Frontend (`Frontend/.env`)
| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_BACKEND_URL` | Backend API URL | `http://localhost:8000` |

---

## 📁 Project Structure

```
FDFED-main/
├── backend/
│   ├── config/         # Database connection
│   ├── controllers/    # Route controllers
│   ├── models/         # Mongoose schemas (User, Tour, Booking, Admin)
│   ├── Routes/         # API route modules
│   └── index.js        # Main server + routes
├── Frontend/
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── features/   # Redux slices
│   │   ├── pages/      # Page-level components
│   │   └── shared/     # Shared components (Display cards)
│   ├── vercel.json     # Vercel deployment config
│   └── vite.config.js
└── .gitignore
```

---

## 🌐 Deployment

### Frontend → Vercel
1. Import the `Frontend/` directory on [vercel.com](https://vercel.com)
2. Set environment variable: `VITE_BACKEND_URL` = your Render URL
3. Build command: `npm run build` · Output: `dist`

### Backend → Render
1. Create a Web Service on [render.com](https://render.com)
2. Root directory: `backend`
3. Build command: `npm install` · Start command: `npm start`
4. Set environment variables: `MONGODB_URI`, `CORS_ORIGIN`

---

## 📝 API Documentation

Interactive Swagger docs available at `/api-docs` when the server is running.

---

## 👥 User Roles

| Role | Code | Access |
|------|------|--------|
| User | `2120` | Browse, rent, review equipment |
| Employee | `8180` | List equipment, provider dashboard |
| Admin | `5150` | Full platform management |
