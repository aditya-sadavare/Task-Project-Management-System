# Render Deployment Guide

## Quick Start - Deploy on Render

### Prerequisites
- Render account (https://render.com)
- GitHub account with your project pushed to a repository
- PostgreSQL database (managed on Render or external)

---

## Option 1: Recommended - Single Container Deployment (Easiest)

This approach runs both backend and frontend in a single container on Render.

### Step 1: Update Frontend API Configuration

Create a `.env.production` file in the `frontend` folder:

```env
VITE_API_URL=/api
```

Or update `frontend/src/services/api.js`:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
```

### Step 2: Deploy on Render

1. Push your code to GitHub
2. Go to [https://dashboard.render.com](https://dashboard.render.com)
3. Click **"New +"** → **"Web Service"**
4. Connect your GitHub repository
5. Configure:
   - **Name**: task-management-app
   - **Environment**: Docker
   - **Branch**: main
   - **Dockerfile Path**: `./Dockerfile`
6. Under **Environment**, add these variables:
   ```
   NODE_ENV=production
   PORT=3000
   DB_HOST=your-pg-host
   DB_PORT=5432
   DB_NAME=task_management_db
   DB_USER=postgres
   DB_PASSWORD=your-password
   JWT_SECRET=your-secret-key
   ```
7. Click **"Create Web Service"**

---

## Option 2: Separate Services (Advanced)

Deploy backend and frontend as separate services on Render.

### Backend Service:
- Use `Dockerfile.backend` or create service with `backend` folder
- Runtime: Node.js

### Frontend Service:
- Use `Dockerfile.frontend` (requires nginx.conf)
- Runtime: Docker
- Set up as Static Site

---

## Step-by-Step Render Deployment

### 1. Create PostgreSQL Database on Render
```bash
1. Go to Render Dashboard → "New +" → "PostgreSQL"
2. Set name: task-management-db
3. Choose Free or Starter tier
4. Copy the Internal Database URL
```

### 2. Set Backend Environment Variables
In Render dashboard for your web service:
```
DB_HOST=dpg-xxx.postgres.render.com
DB_PORT=5432
DB_NAME=task_management_db
DB_USER=postgres
DB_PASSWORD=xxxxxxxxxxxx
JWT_SECRET=your-very-secure-secret-key-here
NODE_ENV=production
```

### 3. Initialize Database Schema
Run the SQL schema on your PostgreSQL:
- See `backend/docs/sql_schema.sql`
- Execute via Render PostgreSQL console or psql

### 4. Update CORS Settings (Optional)
In `backend/app.js`, update CORS if needed:
```javascript
app.use(cors({
  origin: 'https://your-app.onrender.com',
  credentials: true
}));
```

---

## Build Process

The `Dockerfile` does the following:

1. **Stage 1 (Frontend Builder)**:
   - Installs Node dependencies
   - Builds React app with Vite
   - Output: `/app/frontend/dist`

2. **Stage 2 (Backend Runtime)**:
   - Installs production dependencies
   - Copies backend code
   - Copies frontend build to `/app/public`
   - Serves both from Express

---

## File Structure for Deployment

```
.
├── backend/                    # Express backend
│   ├── app.js                 # Updated to serve static files
│   ├── server.js
│   ├── package.json
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   └── config/
├── frontend/                   # React frontend
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
├── Dockerfile                  # Multi-stage build (recommended)
├── Dockerfile.separate         # For separate services
├── .dockerignore               # Docker build optimization
├── nginx.conf                  # For frontend-only nginx setup
├── render.yaml                 # Render configuration (optional)
└── .env.example               # Template for environment variables
```

---

## Troubleshooting

### Port Issues
- Ensure `PORT` env var is set (Render assigns automatically)
- Backend defaults to 3000 in Dockerfile

### Frontend Not Loading
- Check that app.js serves static files correctly
- Verify build path: `static/` should be in public folder
- Ensure `vite.config.js` is correct

### Database Connection Fails
- Verify DB_* environment variables are correct
- Check PostgreSQL is running and accessible
- Ensure schema is initialized

### CORS Errors
- Update `backend/app.js` CORS origin to match frontend URL
- For development: use `*` (change in production)

---

## Production Checklist

- [ ] Database migrations run successfully
- [ ] Environment variables set correctly in Render
- [ ] JWT_SECRET is strong and unique
- [ ] CORS origin matches production domain
- [ ] Frontend API base URL uses `/api` (relative path)
- [ ] Health checks passing
- [ ] Logs show no errors

---

## Redeploy After Changes

```bash
# Push to GitHub
git add .
git commit -m "Update deployment"
git push origin main

# Render auto-deploys on push, or manually redeploy from dashboard
```

---

## Performance Tips

- Use Render's standard tier for production
- Enable caching in nginx.conf for static assets
- Monitor logs in Render dashboard
- Set up uptime alerts

---

## Resources

- [Render Documentation](https://render.com/docs)
- [Docker Multi-Stage Builds](https://docs.docker.com/build/building/multi-stage/)
- [Express Static Files](https://expressjs.com/en/starter/static-files.html)
- [Vite Production Build](https://vitejs.dev/guide/build.html)
