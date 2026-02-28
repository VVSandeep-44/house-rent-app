# House Rent App

A full-stack house rental platform with role-based access for **Admin**, **Owner**, and **Renter**.

## Features

- Authentication with JWT (Login/Register)
- Role-based dashboards:
  - **Admin**: pending owner approvals, owner profiles, renter profiles, search by name/email/phone/city
  - **Owner**: profile (view/edit + profile photo), add property, view properties, manage booking requests
  - **Renter**: profile (view/edit + profile photo), browse properties, create bookings, view booking status
- Owner approval flow with profile completeness validation
- Responsive dashboard UI with side navigation

## Tech Stack

- **Frontend**: React + Vite + Bootstrap + Axios
- **Backend**: Node.js + Express + MongoDB (Mongoose)
- **Auth**: JWT + bcrypt

## Project Structure

```text
house-rent-app/
├─ backend/
├─ frontend/
├─ Screenshots/
└─ README.md
```

## Prerequisites

- Node.js (v18+ recommended)
- npm
- MongoDB connection string (local or Atlas)

## Environment Variables

### Backend (`backend/.env`)

Use `backend/.env.example` as reference:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### Frontend (`frontend/.env`)

Use `frontend/.env.example` as reference:

```env
VITE_API_URL=http://localhost:5000/api
```

## Installation

From project root:

```bash
# backend deps
cd backend
npm install

# frontend deps
cd ../frontend
npm install
```

## Run Locally

Open two terminals.

### Terminal 1: Backend

```bash
cd backend
npm run dev
```

Backend runs on: `http://localhost:5000`

### Terminal 2: Frontend

```bash
cd frontend
npm run dev
```

Frontend runs on: `http://localhost:5173` (or Vite-assigned port)

## Demo Flow

1. Register an **Owner** and fill owner profile.
2. Login as **Admin** and approve owner from Pending Approvals.
3. Login as **Owner** and add properties.
4. Register/Login as **Renter**, browse properties, and create bookings.
5. Owner approves/rejects renter booking requests.

## Screenshots

### Landing Page

![Landing Page](Screenshots/Landing%20Page.png)

### Login Page

![Login Page](Screenshots/Login%20Page.png)

### Register Page

![Register Page](Screenshots/Register%20Page.png)

### Admin Dashboard

![Admin Dashboard](Screenshots/Admin%20Dashboard.png)

### Owner Dashboard

![Owner Dashboard](Screenshots/Owner%20Dashboard.png)

### Renter Dashboard

![Renter Dashboard](Screenshots/Renter%20Dashboard.png)

## Available Scripts

### Backend

- `npm run dev` – start backend with nodemon
- `npm start` – start backend with node

### Frontend

- `npm run dev` – start Vite dev server
- `npm run build` – production build
- `npm run lint` – run ESLint
- `npm run preview` – preview production build

## Notes

- Profile photos are currently stored as image data in profile payloads for quick implementation.
- For production, move image storage to cloud/object storage (S3, Cloudinary, Azure Blob, etc.).
