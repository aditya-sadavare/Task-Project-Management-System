# Frontend Project Structure - Complete Overview

## 📂 Directory Tree

```
frontend/
│
├── 📄 index.html                    ← Entry HTML file
├── 📄 package.json                  ← Dependencies & scripts
├── 📄 vite.config.js                ← Vite build configuration
├── 📄 .gitignore                    ← Git ignore rules
├── 📄 .env.example                  ← Environment variables template
│
├── 📄 README.md                     ← Full documentation
├── 📄 QUICKSTART.md                 ← Quick start guide (5 min)
├── 📄 IMPLEMENTATION.md             ← Implementation details
│
└── 📁 src/
    │
    ├── 📄 main.jsx                  ← React entry point
    ├── 📄 App.jsx                   ← Main app component with routing
    ├── 📄 index.css                 ← Global styles
    ├── 📄 App.css                   ← App layout styles
    │
    ├── 📁 components/               ← Reusable components
    │   ├── 📄 Navbar.jsx            ← Top navigation bar
    │   ├── 📄 Navbar.css
    │   ├── 📄 Sidebar.jsx           ← Side navigation menu
    │   ├── 📄 Sidebar.css
    │   ├── 📄 ProtectedRoute.jsx    ← Route protection wrapper
    │   ├── 📄 RoleGuard.jsx         ← Role-based access guard
    │   ├── 📄 Toast.jsx             ← Toast notification system
    │   └── 📄 Toast.css
    │
    ├── 📁 context/                  ← Global state management
    │   └── 📄 AuthContext.jsx       ← Authentication context & hooks
    │
    ├── 📁 services/                 ← API & external services
    │   └── 📄 api.js                ← Axios setup with interceptors
    │
    └── 📁 pages/                    ← Page components
        │
        ├── 📁 auth/                 ← Authentication pages
        │   ├── 📄 Login.jsx
        │   ├── 📄 Register.jsx
        │   └── 📄 Auth.css
        │
        ├── 📁 dashboard/            ← Dashboard pages
        │   ├── 📄 UserDashboard.jsx
        │   ├── 📄 ManagerDashboard.jsx
        │   └── 📄 Dashboard.css
        │
        ├── 📁 tasks/                ← Task management pages
        │   ├── 📄 TaskList.jsx           ← User's task list
        │   ├── 📄 TaskDetails.jsx        ← Task detail with comments
        │   ├── 📄 CreateTask.jsx         ← Create task form
        │   ├── 📄 TasksManager.jsx       ← Manager all tasks view
        │   └── 📄 Tasks.css              ← All task styling
        │
        ├── 📁 projects/             ← Project management pages
        │   ├── 📄 ProjectList.jsx
        │   ├── 📄 CreateProject.jsx
        │   └── 📄 Projects.css
        │
        └── 📁 admin/                ← Admin pages
            ├── 📄 UserManagement.jsx
            └── 📄 Admin.css
```

---

## 📊 File Count Summary

```
Total Files: 38
├── Components: 8 files (JSX + CSS)
├── Pages: 18 files (JSX + CSS)
├── Context: 1 file
├── Services: 1 file
├── CSS Files: 8
├── Config Files: 4
└── Documentation: 4 files
```

---

## 🗂️ Component Organization

### Global Components (`src/components/`)
```
Navbar
├── Displays user name & role
├── Logout button
└── Sticky to top

Sidebar
├── Role-based navigation
├── Collapsible on mobile
└── Menu links per role

ProtectedRoute
├── Checks for token
├── Redirects to login if none
└── Shows loading spinner

RoleGuard
├── Checks for specific role
├── Redirects if unauthorized
└── Used with ProtectedRoute

Toast
├── Success, Error, Info, Warning
├── Auto-dismiss by type
└── Positioned top-right
```

### Page Components (`src/pages/`)
```
auth/
├── Login - Login form with validation
└── Register - Registration form with validation

dashboard/
├── UserDashboard - Stats for individual users
└── ManagerDashboard - Stats for managers/admins

tasks/
├── TaskList - User's assigned tasks
├── TaskDetails - Task info + comments
├── CreateTask - Form to create new task
└── TasksManager - All tasks view (manager)

projects/
├── ProjectList - List all projects
└── CreateProject - Form to create project

admin/
└── UserManagement - Admin user role management
```

---

## 🎨 Style Organization

### CSS Files by Feature
```
Global/Layout:
├── src/index.css      - Global reset & body styles
└── src/App.css        - Main app layout (flex, sidebar)

Components:
├── src/components/Navbar.css
├── src/components/Sidebar.css
└── src/components/Toast.css

Pages:
├── src/pages/auth/Auth.css          - Login/Register styling
├── src/pages/dashboard/Dashboard.css - Dashboard cards & layout
├── src/pages/tasks/Tasks.css         - Task cards, tables, forms
├── src/pages/projects/Projects.css   - Project cards, forms
└── src/pages/admin/Admin.css         - Admin table & buttons
```

### CSS Architecture
- **No CSS frameworks** (Tailwind, Bootstrap, Material-UI)
- **100% custom CSS**
- **Flexbox & CSS Grid** for layouts
- **CSS variables** for colors
- **Media queries** for responsiveness
- **Animations/transitions** for smooth UX

---

## 🔌 API Connection Map

```
src/services/api.js
    ↓
    Creates Axios instance with:
    ├── Base URL: http://localhost:5000/api
    ├── Request interceptor (adds JWT token)
    └── Response interceptor (handles 401)
    ↓
    Used by all pages for:
    ├── Authentication (login, register)
    ├── Dashboards (fetch stats)
    ├── Tasks (CRUD operations)
    ├── Projects (CRUD operations)
    ├── Comments (fetch & add)
    └── Users (admin operations)
```

---

## 🔐 Security Flow

```
1. Login/Register
   ↓
2. Backend returns JWT token
   ↓
3. Store in localStorage
   ↓
4. Axios interceptor adds to headers
   ↓
5. Backend validates token
   ↓
6. If valid: Grant access
   If invalid: Return 401
   ↓
7. 401 triggers: Clear token + redirect to login
```

---

## 🚦 Authentication & Authorization

```
AuthContext.jsx
├── State: user, token, loading
├── Methods: login(), logout(), register()
├── Helpers: hasRole(), hasAnyRole()
└── Persists to localStorage

Protected Routes:
├── ProtectedRoute
│   └── Checks: token exists
│   └── Redirects: to /login if missing
│
└── RoleGuard
    └── Checks: user has allowed role
    └── Redirects: to /dashboard if denied
```

---

## 📱 Responsive Design

### Breakpoints
```
Desktop (default styles)
├── Sidebar: 260px width
├── Layout: Flexbox, full width
└── Components: Grid layouts

Tablet (max-width: 768px)
├── Sidebar: Collapsed to 70px
├── Cards: Single column on small
├── Tables: Responsive behavior

Mobile (< 480px)
├── Navbar: Vertical layout
├── Sidebar: Icon-only mode
├── Forms: Single column
└── Tables: Stacked/scrollable
```

---

## 🎯 Project vs User vs Manager vs Admin Views

```
Public Pages:
├── /login     - Login form
└── /register  - Registration form

User Pages:
├── /dashboard         - User stats
│   ├── Total tasks
│   ├── Completed
│   └── Pending
├── /tasks            - My assigned tasks
│   └── /task/:id     - Task details + comments
└── Sidebar shows: Dashboard, My Tasks

Manager Pages (all User + these):
├── /dashboard        - Manager stats
│   ├── Total projects
│   ├── Total tasks
│   ├── Completed
│   └── Pending
├── /projects        - All projects
│   └── /create-project
├── /tasks-manager   - All tasks view (table)
│   └── /task/:id
├── /create-task     - Create new task
└── Sidebar shows: Dashboard, Projects, All Tasks, New Project, New Task

Admin Pages (all Manager + these):
├── /admin/users      - User management
│   └── Change roles
└── Sidebar shows: All manager items + User Management
```

---

## 🎨 Color Palette

```
Primary Colors:
├── #3498db - Primary Blue (buttons, links)
├── #667eea - Purple (gradients)
└── #764ba2 - Dark Purple (gradients)

Status Colors:
├── #27ae60 - Success/Completed (green)
├── #f39c12 - Warning/In Progress (orange)
└── #95a5a6 - Pending (gray)

Severity Colors:
├── #e74c3c - Error/High Priority (red)
├── #f39c12 - Medium Priority (orange)
└── #27ae60 - Low Priority (green)

Neutral Colors:
├── #2c3e50 - Dark Blue-Gray (text, backgrounds)
├── #34495e - Medium Blue-Gray (sidebar)
├── #ecf0f1 - Light Gray (borders, disabled)
└── #ffffff - White (backgrounds)
```

---

## 📋 Dependencies Explained

### Runtime Dependencies
```json
{
  "react": "18.2.0"              - UI library
  "react-dom": "18.2.0"          - DOM rendering
  "react-router-dom": "6.20.0"   - Client-side routing
  "axios": "1.6.2"               - HTTP client for API calls
}
```

### DevDependencies
```json
{
  "vite": "5.0.8"                     - Build tool
  "@vitejs/plugin-react": "4.2.1"     - React support in Vite
  "@types/react": "18.2.37"           - React TypeScript types
  "@types/react-dom": "18.2.15"       - React DOM TypeScript types
}
```

---

## 🏃 Scripts Available

```json
{
  "dev"     : "vite"              - Start dev server (localhost:3000)
  "build"   : "vite build"        - Build for production
  "preview" : "vite preview"      - Preview production build
}
```

---

## 🗝️ Key Concepts

### Context API
- Global state for auth (user, token)
- Custom hook: `useAuth()`
- No Redux needed

### Protected Routes
- Wrapper component checks for token
- Redirects to login if missing
- Prevents unauthorized access

### Role Guards
- Wrapper component checks user role
- Restricts UI based on permissions
- Combined with ProtectedRoute

### Axios Interceptors
- Request: Add JWT to headers
- Response: Handle 401 errors
- Auto logout & redirect

### Toast Notifications
- Custom component (not external library)
- 4 types: success, error, info, warning
- Auto-dismiss with manual close option

---

## ✅ Standards & Best Practices

```
Code Organization:
├── Modular components
├── Separated concerns (components, pages, services)
├── Consistent naming conventions
└── Reusable utilities

Styling:
├── Custom CSS only
├── No frameworks used
├── Consistent color scheme
├── Responsive design built-in
└── BEM-like class naming

Security:
├── JWT token storage
├── Protected routes
├── Role-based access
├── Secure API requests
└── Automatic logout on token expiration

Performance:
├── Lazy loading with React Router
├── Efficient rendering
├── Minimal dependencies
└── Optimized CSS
```

---

## 🚀 Ready to Start?

1. **Install:** `npm install`
2. **Start:** `npm run dev`
3. **Build:** `npm run build`
4. **Push:** `git add . && git commit -m "Add React frontend"`

**Your complete Task Management frontend is ready to use! 🎉**
