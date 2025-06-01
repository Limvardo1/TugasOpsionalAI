import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard-container">
      <h1>Admin Dashboard</h1>
      <button className="btn-go-panel" onClick={() => navigate('/admin')}>
        Go to Admin Panel
      </button>
    </div>
  );
};

export default AdminDashboard;
