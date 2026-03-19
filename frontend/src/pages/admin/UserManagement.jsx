import React, { useState, useEffect } from 'react';
import api, { showErrorToast, showSuccessToast } from '../../services/api';
import './Admin.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editingRole, setEditingRole] = useState('');
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/users');
      setUsers(response.data);
    } catch (error) {
      showErrorToast(error.response?.data?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleEditRole = (user) => {
    setEditingId(user.id);
    setEditingRole(user.role);
  };

  const handleSaveRole = async (userId) => {
    setUpdating(true);
    try {
      await api.put('/admin/user-role', {
        userId,
        role: editingRole,
      });
      setUsers(prev => 
        prev.map(u => 
          u.id === userId ? { ...u, role: editingRole } : u
        )
      );
      showSuccessToast('User role updated');
      setEditingId(null);
    } catch (error) {
      showErrorToast(error.response?.data?.message || 'Failed to update role');
    } finally {
      setUpdating(false);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingRole('');
  };

  if (loading) {
    return (
      <div className="admin-container">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <h1>User Management</h1>

      {users.length === 0 ? (
        <div className="empty-state">
          <p>No users found</p>
        </div>
      ) : (
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name || 'N/A'}</td>
                  <td>{user.email}</td>
                  <td>
                    {editingId === user.id ? (
                      <select 
                        value={editingRole}
                        onChange={(e) => setEditingRole(e.target.value)}
                        disabled={updating}
                      >
                        <option>User</option>
                        <option>Manager</option>
                        <option>Admin</option>
                      </select>
                    ) : (
                      <span className={`role-badge role-${user.role?.toLowerCase()}`}>
                        {user.role}
                      </span>
                    )}
                  </td>
                  <td>
                    {editingId === user.id ? (
                      <div className="action-buttons-inline">
                        <button 
                          className="btn-save"
                          onClick={() => handleSaveRole(user.id)}
                          disabled={updating}
                        >
                          {updating ? 'Saving...' : 'Save'}
                        </button>
                        <button 
                          className="btn-cancel"
                          onClick={handleCancel}
                          disabled={updating}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button 
                        className="btn-edit"
                        onClick={() => handleEditRole(user)}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
