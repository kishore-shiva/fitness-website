# Prem Rishi Fitness - Personal Trainer Website

A professional fitness trainer website built with React (frontend) and FastAPI (backend), featuring a contact form with email notifications.

## Tech Stack

- **Frontend**: React 19, Tailwind CSS, Shadcn UI, Framer Motion
- **Backend**: FastAPI, MongoDB, Resend (email)
- **Database**: MongoDB

---

## Prerequisites

- Node.js (v18+)
- Python (v3.11+)
- MongoDB (local or cloud instance)
- Yarn (recommended) or npm

---

## Project Structure

```
/app
├── frontend/          # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── App.js         # Main app
│   │   └── index.css      # Global styles
│   ├── package.json
│   └── .env
├── backend/           # FastAPI backend
│   ├── server.py      # Main server
│   ├── requirements.txt
│   └── .env
└── README.md
```

---

## Backend Setup

### 1. Navigate to backend directory
```bash
cd backend
```

### 2. Create virtual environment (recommended)
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install dependencies
```bash
pip install -r requirements.txt
```

### 4. Configure environment variables

Create a `.env` file in the `/backend` directory:

```env
# Database (Required)
MONGO_URL=mongodb://localhost:27017
DB_NAME=premrishi_fitness

# CORS (Required)
CORS_ORIGINS=http://localhost:3000,https://yourdomain.com

# Email Configuration (Optional - for contact form notifications)
RESEND_API_KEY=re_your_api_key_here
SENDER_EMAIL=onboarding@resend.dev
TRAINER_EMAIL=your-email@example.com
```

### 5. Run the backend server
```bash
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

The backend will be available at: `http://localhost:8001`

### Backend API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/` | Health check |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/submissions` | Get all submissions (admin) |

---

## Frontend Setup

### 1. Navigate to frontend directory
```bash
cd frontend
```

### 2. Install dependencies

Using Yarn (recommended):
```bash
yarn install
```

Or using npm:
```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the `/frontend` directory:

```env
# Backend API URL (Required)
REACT_APP_BACKEND_URL=http://localhost:8001

# WebSocket port for development (Optional)
WDS_SOCKET_PORT=443
```

### 4. Run the frontend development server

Using Yarn:
```bash
yarn start
```

Or using npm:
```bash
npm start
```

The frontend will be available at: `http://localhost:3000`

---

## Environment Variables Reference

### Backend (`/backend/.env`)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `MONGO_URL` | ✅ Yes | MongoDB connection string | `mongodb://localhost:27017` |
| `DB_NAME` | ✅ Yes | Database name | `premrishi_fitness` |
| `CORS_ORIGINS` | ✅ Yes | Allowed origins (comma-separated) | `http://localhost:3000` |
| `RESEND_API_KEY` | ❌ No | Resend API key for emails | `re_xxxxxxxxx` |
| `SENDER_EMAIL` | ❌ No | Email sender address | `onboarding@resend.dev` |
| `TRAINER_EMAIL` | ❌ No | Email to receive notifications | `trainer@email.com` |

### Frontend (`/frontend/.env`)

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `REACT_APP_BACKEND_URL` | ✅ Yes | Backend API URL | `http://localhost:8001` |
| `WDS_SOCKET_PORT` | ❌ No | WebSocket port for hot reload | `443` |

---

## Email Setup (Optional)

To enable email notifications when users submit the contact form:

### 1. Create a Resend account
- Go to [resend.com](https://resend.com) and sign up
- Navigate to Dashboard → API Keys → Create API Key
- Copy the API key (starts with `re_`)

### 2. Configure environment variables
Add to `/backend/.env`:
```env
RESEND_API_KEY=re_your_actual_api_key
SENDER_EMAIL=onboarding@resend.dev
TRAINER_EMAIL=your-email@example.com
```

### 3. Restart the backend server
```bash
# Stop the server (Ctrl+C) and restart
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

> **Note**: In Resend's free tier/testing mode, emails can only be sent to verified email addresses. For production, verify your domain.

---

## Running Both Services

### Option 1: Two Terminal Windows

**Terminal 1 (Backend):**
```bash
cd backend
source venv/bin/activate  # If using virtualenv
uvicorn server:app --host 0.0.0.0 --port 8001 --reload
```

**Terminal 2 (Frontend):**
```bash
cd frontend
yarn start
```

### Option 2: Using a Process Manager (Production)

For production, consider using:
- **PM2** for Node.js
- **Supervisor** or **systemd** for Python
- **Docker Compose** for containerized deployment

---

## Production Build

### Frontend
```bash
cd frontend
yarn build
```

This creates an optimized build in the `/frontend/build` folder.

### Backend
For production, use Gunicorn with Uvicorn workers:
```bash
pip install gunicorn
gunicorn server:app -w 4 -k uvicorn.workers.UvicornWorker -b 0.0.0.0:8001
```

---

## Customization

### Replacing Stock Images
Update the image URLs in these files:
- `/frontend/src/components/Hero.jsx` - Hero background
- `/frontend/src/components/Services.jsx` - Service card images
- `/frontend/src/components/About.jsx` - Trainer portrait

### Updating Contact Information
Edit `/frontend/src/components/Contact.jsx`:
- Email address
- Instagram handle
- Phone number

### Changing Colors
Edit `/frontend/tailwind.config.js` and `/frontend/src/index.css`:
- Primary color: `#DC2626` (red)
- Background: `#09090B` (dark)
- Foreground: `#FAFAFA` (white)

---

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod --dbpath /path/to/data`
- Check the `MONGO_URL` in `.env`

### CORS Errors
- Verify `CORS_ORIGINS` includes your frontend URL
- Restart the backend after changing `.env`

### Frontend Can't Connect to Backend
- Check `REACT_APP_BACKEND_URL` in frontend `.env`
- Ensure backend is running on the correct port
- Restart frontend after changing `.env`

### Email Not Sending
- Verify `RESEND_API_KEY` is correct
- Check `TRAINER_EMAIL` is set
- In testing mode, emails only go to verified addresses

---

## License

MIT License - Feel free to use and modify for your projects.
