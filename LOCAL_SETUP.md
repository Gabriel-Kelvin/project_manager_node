# Local Development Setup

## Quick Fix Applied

The frontend API service now automatically detects local development and uses the correct backend URL:
- **Local development** (localhost): `http://localhost:8000`
- **Production/Docker** (VM): `http://3.85.144.221:8010`

## Running Locally

### 1. Start Backend (Terminal 1)

```bash
cd backend_node
npm start
```

Backend will run on **port 8000** (or check your `.env` file for `APP_PORT`).

### 2. Start Frontend (Terminal 2)

```bash
cd frontend
npm start
```

Frontend will automatically detect it's running locally and connect to `http://localhost:8000`.

### 3. Access Application

- **Frontend:** http://localhost:3000 (default React port)
- **Backend API:** http://localhost:8000

## Environment Variables

### Backend (`backend_node/.env`)
```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=your_supabase_anon_public_key_here
APP_HOST=0.0.0.0
APP_PORT=8000  # Local development port
```

### Frontend (Optional - `frontend/.env.local`)
```env
# Optional - only needed if you want to override auto-detection
REACT_APP_API_URL=http://localhost:8000
```

## Troubleshooting

### Frontend can't connect to backend
1. Make sure backend is running on port 8000
2. Check backend terminal for "Server running on http://0.0.0.0:8000"
3. Try restarting the frontend dev server

### Backend running on different port
- Update `APP_PORT` in `backend_node/.env`
- Or set `REACT_APP_API_URL=http://localhost:YOUR_PORT` in `frontend/.env.local`

## Ports Summary

| Environment | Backend Port | Frontend Port |
|------------|--------------|---------------|
| Local Dev  | 8000         | 3000          |
| Docker/VM  | 8010         | 3005          |

