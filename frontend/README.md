# Task & Project Management System - Frontend

A complete React (Vite) frontend for a Task & Project Management System with role-based access control.

## Features

✅ **Authentication**
- Login & Register with JWT tokens
- Token stored in localStorage
- Automatic token attachment to API requests
- Protected routes & role-based access control

✅ **Three User Roles**
1. **User** - Can view and update their assigned tasks
2. **Manager** - Can manage projects, create/update tasks, assign users
3. **Admin** - Can manage users, assign roles, access all features

✅ **User Features**
- Dashboard with task statistics
- View assigned tasks with filters
- Update task status
- Add comments to tasks

✅ **Manager Features**
- Enhanced dashboard with project/task overview
- Create and manage projects
- Create and manage tasks
- Assign tasks to team members
- Monitor project progress

✅ **Admin Features**
- User management interface
- Update user roles
- Full system access

✅ **UI/UX**
- Responsive design (desktop, tablet, mobile)
- Custom CSS (no frameworks)
- Status color-coding (Pending, In Progress, Completed)
- Priority indicators (Low, Medium, High)
- Smooth animations & transitions
- Toast notifications
- Loading states

## Tech Stack

- **Frontend Framework:** React 18.2
- **Build Tool:** Vite 5.0
- **Routing:** React Router DOM 6.20
- **HTTP Client:** Axios 1.6
- **State Management:** Context API
- **Styling:** Custom CSS (100% custom, no framework)

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx              # Top navigation bar
│   ├── Sidebar.jsx             # Side navigation menu
│   ├── ProtectedRoute.jsx      # Route protection wrapper
│   ├── RoleGuard.jsx           # Role-based access control
│   ├── Toast.jsx               # Toast notifications
│   └── *.css                   # Component styles
├── context/
│   └── AuthContext.jsx         # Authentication state management
├── pages/
│   ├── auth/
│   │   ├── Login.jsx           # Login page
│   │   ├── Register.jsx        # Registration page
│   │   └── Auth.css
│   ├── dashboard/
│   │   ├── UserDashboard.jsx   # User dashboard
│   │   ├── ManagerDashboard.jsx# Manager dashboard
│   │   └── Dashboard.css
│   ├── tasks/
│   │   ├── TaskList.jsx        # User's task list
│   │   ├── TaskDetails.jsx     # Task detail page with comments
│   │   ├── CreateTask.jsx      # Create new task
│   │   ├── TasksManager.jsx    # Manager's all tasks view
│   │   └── Tasks.css
│   ├── projects/
│   │   ├── ProjectList.jsx     # Projects list
│   │   ├── CreateProject.jsx   # Create project
│   │   └── Projects.css
│   └── admin/
│       ├── UserManagement.jsx  # Admin user management
│       └── Admin.css
├── services/
│   └── api.js                  # Axios config & interceptors
├── App.jsx                     # Main app routing
├── main.jsx                    # Entry point
├── index.css                   # Global styles
└── App.css                     # App layout styles
```

## Setup Instructions

### Prerequisites
- Node.js 16+ and npm/yarn installed
- Backend running on `http://localhost:5000`

### Installation

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

   The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## Environment Configuration

The frontend is configured to connect to:
- **API Base URL:** `http://localhost:5000/api`

To change this, edit `src/services/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

## API Integration

### Authentication Endpoints
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - New user registration

### Dashboard Endpoints
- `GET /api/dashboard/user` - User dashboard stats
- `GET /api/dashboard/manager` - Manager dashboard stats

### Task Endpoints
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get specific task
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Project Endpoints
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create project

### Comment Endpoints
- `GET /api/comments/:taskId` - Get task comments
- `POST /api/comments` - Add comment

### Admin Endpoints
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/user-role` - Update user role

## Authentication Flow

1. **Login/Register**
   - User submits credentials
   - Backend returns JWT token
   - Token stored in localStorage

2. **API Requests**
   - Axios interceptor automatically adds token to all requests
   - Header: `Authorization: Bearer <token>`

3. **Token Validation**
   - Backend validates token
   - If invalid/expired, user redirected to login
   - Token and auth state cleared from localStorage

## Role-Based Access Control

### User Role
- Dashboard: `/dashboard`
- Task List: `/tasks`
- Task Details: `/task/:id`
- Comments: Can read & add comments

### Manager Role
- All User features +
- Dashboard: `/dashboard` (enhanced)
- Projects: `/projects`, `/create-project`
- All Tasks: `/tasks-manager`
- Create Tasks: `/create-task`
- Can assign tasks to users

### Admin Role
- All Manager features +
- User Management: `/admin/users`
- Can update user roles

## Key Features Explained

### Protected Routes
```jsx
<ProtectedRoute>
  <Component />
</ProtectedRoute>
```
Redirects unauthenticated users to login page.

### Role Guards
```jsx
<RoleGuard allowedRoles={['Manager', 'Admin']}>
  <Component />
</RoleGuard>
```
Restricts component access to specific roles.

### Toast Notifications
```jsx
const { showSuccess, showError } = useToast();
showSuccess('Action completed');
showError('Something went wrong');
```

### Context API for Auth
```jsx
const { user, token, isAuthenticated, login, logout } = useAuth();
if (!isAuthenticated) navigate('/login');
```

## Styling System

All styles use **custom CSS only** (no frameworks):
- **Color Scheme:** Professional blues, greens, reds for status
- **Responsive Grid:** CSS Grid & Flexbox for layouts
- **Animations:** CSS transitions for smooth interactions
- **Variables:** Consistent spacing and sizing

## Status Color Coding

- **Pending:** Gray (#95a5a6)
- **In Progress:** Orange (#f39c12)
- **Completed:** Green (#27ae60)

## Priority Indicators

- **Low:** Green (#27ae60)
- **Medium:** Orange (#f39c12)
- **High:** Red (#e74c3c)

## Troubleshooting

### "Failed to load tasks" error
- Check backend is running on `http://localhost:5000`
- Verify API endpoints are correct in backend

### Login redirects to login page
- Clear browser localStorage: `localStorage.clear()`
- Check JWT token validity on backend
- Verify token is being sent in Authorization header

### CORS errors
- Add CORS headers to backend if needed
- Backend should allow requests from `http://localhost:3000`

### Blank page after login
- Check console for JavaScript errors
- Verify backend response format matches expected structure
- Check that user object has `id`, `name`, `email`, and `role` fields

## Development Tips

1. **Redux DevTools** - Not needed, Context API provides sufficient state management

2. **API Testing** - Use Postman to test backend endpoints first

3. **Form Validation** - Add more validation rules in form components as needed

4. **Error Handling** - Check `handleError` patterns in existing components

5. **Responsive Testing** - Use browser DevTools to test on different screen sizes

## Performance Optimizations

- Lazy loading with React Router
- Axios caching for repeated requests
- Minimal re-renders with Context API
- Optimized CSS with no external frameworks
- Efficient event handlers with debouncing

## Security

- JWT tokens stored in localStorage
- Tokens attached to every API request
- Protected routes prevent unauthorized access
- Role-based access control enforced on frontend
- Backend validation always enforced

## Future Enhancements

- Search and advanced filtering
- Task sorting options
- User avatars and profiles
- Activity logging
- Real-time updates with WebSockets
- Task templates
- Email notifications
- File attachments
- Dark mode theme

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## License

This project is provided as-is for demonstration and learning purposes.

---

**Frontend Ready!** Connect with your Node.js backend and start managing tasks efficiently.
