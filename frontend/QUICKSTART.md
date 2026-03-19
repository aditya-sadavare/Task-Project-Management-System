# Quick Start Guide - Frontend

## 🚀 Get Running in 5 Minutes

### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

### Step 2: Check Backend
Make sure your backend is running:
```bash
# In another terminal, from the backend folder
npm install
npm start
# Backend should be running on http://localhost:5000
```

### Step 3: Start Frontend
```bash
npm run dev
```
✅ Frontend opens at **http://localhost:3000**

---

## 📋 Test the Application

### Option 1: Create New User (Register)
1. Go to "Register" page
2. Enter: Name, Email, Password
3. Click "Register"
4. Auto-redirects to dashboard

### Option 2: Use Existing User (Login)
1. Use credentials from your backend database
2. Click "Login"
3. Redirects based on role:
   - **Admin** → Admin dashboard
   - **Manager** → Manager dashboard
   - **User** → User dashboard

---

## 🎯 What to Try

### As a User
- ✅ Go to "My Tasks" to see your assigned tasks
- ✅ Click on a task to see details
- ✅ Update task status (Pending → In Progress → Completed)
- ✅ Add comments to tasks

### As a Manager
- ✅ Go to "Dashboard" for overview stats
- ✅ Create new projects
- ✅ Create and assign tasks
- ✅ View all tasks in the system
- ✅ Delete tasks if needed

### As an Admin
- ✅ Go to "User Management"
- ✅ Change user roles
- ✅ Access all manager features

---

## 🔧 Troubleshooting

### Frontend won't start?
```bash
# Clear node modules and reinstall
rm -r node_modules
npm install
npm run dev
```

### Getting API errors?
1. Check backend is running: `http://localhost:5000`
2. Check console (F12) for error details
3. Clear browser cache: `Ctrl+Shift+Del`
4. Clear localStorage: Open DevTools → Console → `localStorage.clear()`

### Login not working?
- Check user credentials are correct
- Verify backend has the user in database
- Check backend CORS is allowing localhost:3000

### Tasks not loading?
- Verify backend `/api/tasks` endpoint is working
- Test in Postman with bearer token
- Check token is valid

---

## 📁 File Structure Quick Reference

**Component Files:**
- `src/components/` - Reusable components (Navbar, Sidebar, Toast)
- `src/pages/` - Page components organized by feature

**State Management:**
- `src/context/AuthContext.jsx` - Authentication state

**API Integration:**
- `src/services/api.js` - Axios setup with JWT interceptor

**Styling:**
- All components have `.css` files
- Global styles: `src/index.css`, `src/App.css`

---

## 🎨 Customization

### Change API URL
Edit `src/services/api.js`:
```javascript
const API_BASE_URL = 'http://your-backend:5000/api';
```

### Change Colors
Edit color values in `.css` files:
```css
Primary Blue: #3498db
Success Green: #27ae60
Error Red: #e74c3c
```

### Add New Pages
1. Create component in `src/pages/`
2. Add route in `src/App.jsx`
3. Add sidebar link in `src/components/Sidebar.jsx`

---

## 🔐 Security Notes

✅ JWT tokens stored securely in localStorage  
✅ Tokens sent with every API request  
✅ Expired tokens trigger re-login  
✅ Role-based access control on UI & routes  

---

## 📦 Build for Production

```bash
npm run build
```
Creates optimized `dist/` folder ready to deploy.

Deploy to:
- Netlify
- Vercel
- GitHub Pages
- Your own server

---

## Need Help?

Check these files:
- **Authentication issues?** → `src/context/AuthContext.jsx`
- **API issues?** → `src/services/api.js`
- **Routing issues?** → `src/App.jsx`
- **Component help?** → Look at similar components in `src/pages/`

---

**Happy coding! 🚀**
