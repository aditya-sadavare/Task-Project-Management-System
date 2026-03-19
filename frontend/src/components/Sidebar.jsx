import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const { hasRole, hasAnyRole } = useAuth();
  const location = useLocation();

  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  const isActive = (path) => location.pathname === path;

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {/* Common Navigation */}
        <div className="nav-section">
          <p className="nav-title">Main</p>
          <Link 
            to="/dashboard" 
            className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
          >
            📊 Dashboard
          </Link>
        </div>

        {/* User Navigation */}
        {hasRole('User') && (
          <div className="nav-section">
            <p className="nav-title">My Tasks</p>
            <Link 
              to="/tasks" 
              className={`nav-link ${isActive('/tasks') ? 'active' : ''}`}
            >
              ✓ My Tasks
            </Link>
          </div>
        )}

        {/* Manager Navigation */}
        {(hasRole('Manager') || hasRole('Admin')) && (
          <div className="nav-section">
            <p className="nav-title">Management</p>
            <Link 
              to="/projects" 
              className={`nav-link ${isActive('/projects') ? 'active' : ''}`}
            >
              📁 Projects
            </Link>
            <Link 
              to="/tasks-manager" 
              className={`nav-link ${isActive('/tasks-manager') ? 'active' : ''}`}
            >
              ✓ All Tasks
            </Link>
            <Link 
              to="/create-project" 
              className={`nav-link ${isActive('/create-project') ? 'active' : ''}`}
            >
              ➕ New Project
            </Link>
            <Link 
              to="/create-task" 
              className={`nav-link ${isActive('/create-task') ? 'active' : ''}`}
            >
              ➕ New Task
            </Link>
          </div>
        )}

        {/* Admin Navigation */}
        {hasRole('Admin') && (
          <div className="nav-section">
            <p className="nav-title">Admin</p>
            <Link 
              to="/admin/users" 
              className={`nav-link ${isActive('/admin/users') ? 'active' : ''}`}
            >
              👥 User Management
            </Link>
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
