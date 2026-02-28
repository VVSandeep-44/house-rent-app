# 🏠 Dwell-In – Role-Based House Rental Platform

Dwell-In is a full-stack rental management platform developed as part of an internship assignment to demonstrate practical full-stack development skills using the MERN stack.

The system implements secure authentication, role-based access control, structured approval workflows, and a complete booking lifecycle with a clean and responsive UI.

---

## 🎯 Project Objective

The objective of this project was to build a structured house rental platform supporting three user roles:

- **Admin**
- **Owner**
- **Renter**

The application enforces proper access control, input validation, and booking management while maintaining a professional user interface.

---

## 🚀 Tech Stack

### Frontend
- React (Vite)
- Bootstrap
- Framer Motion
- Axios

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcrypt (password hashing)

---

## 👥 User Roles & Features

### 🛡 Admin
- View pending owner registrations
- Approve owner accounts
- Access owner and renter profiles
- Enforce platform-level governance

### 🏢 Owner
- Add and manage property listings
- View incoming booking requests
- Approve or reject bookings
- Access owner profile

### 🏘 Renter
- Browse available properties
- Create booking requests
- View booking status (Pending / Approved / Rejected)
- Access renter profile

---

## 🔐 Authentication & Security

- JWT-based authentication
- Protected frontend routes
- Middleware-based backend authorization
- Role-based access control (Admin / Owner / Renter)
- Password hashing using bcrypt
- Backend validation for:
  - Name format (alphabet-only, minimum length)
  - Email format
  - Password length (8–12 characters)

Sensitive routes are protected and restricted based on role permissions.

---

## 📅 Booking Workflow

1. Owner registers.
2. Admin approves owner account.
3. Owner adds property listings.
4. Renter browses available properties.
5. Renter submits booking request.
6. Owner approves or rejects request.
7. Booking status updates accordingly.

This ensures a complete end-to-end booking lifecycle implementation.

---

## 🎨 UI Highlights

- Smooth page transitions using Framer Motion
- Glass-inspired authentication design
- Custom role selection dropdown
- Animated interactions and hover effects
- Responsive layout with consistent theme
- Structured dashboard sections

---

## 🏗 Architecture Overview

### Frontend
- Role-based routing
- ProtectedRoute wrapper for dashboard access
- Centralized API service using Axios
- Modular component structure

### Backend
- Express route separation
- Controller-based logic
- Middleware for authentication & authorization
- MongoDB collections:
  - Users
  - Properties
  - Bookings

---

## 📂 Project Structure

house-rent-app/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   └── config/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   ├── services/
│   └── assets/
│
└── README.md

---

## ⚙️ Installation & Setup

### Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB (local or Atlas)

---

### 1️⃣ Clone Repository

git clone https://github.com/VVSandeep-44/house-rent-app.git

---

### 2️⃣ Backend Setup

cd backend  
npm install  
npm run dev  

Backend runs on:  
http://localhost:5000

---

### 3️⃣ Frontend Setup

cd frontend  
npm install  
npm run dev  

Frontend runs on:  
http://localhost:5173

---

## 🔑 Environment Variables

### Backend (`backend/.env`)

PORT=5000  
MONGO_URI=your_mongodb_connection_string  
JWT_SECRET=your_jwt_secret  

### Frontend (`frontend/.env`)

VITE_API_URL=http://localhost:5000/api  

---

## 🧪 Demo Flow

1. Register an **Owner** account.
2. Login as **Admin** and approve the owner.
3. Login as **Owner** and add properties.
4. Register/Login as **Renter** and book a property.
5. Owner approves or rejects booking.
6. Renter sees updated booking status.

---

## 🔮 Future Enhancements

- Email verification system
- Property image uploads
- Advanced search and filtering
- Payment integration
- Cloud-based image storage

---

## 📌 Conclusion

Dwell-In demonstrates:

- Structured full-stack architecture
- Role-based access control
- Secure authentication practices
- Input validation on frontend and backend
- Clean UI with responsive design
- Proper separation of concerns

This project reflects practical implementation of MERN stack concepts in a real-world rental management scenario.