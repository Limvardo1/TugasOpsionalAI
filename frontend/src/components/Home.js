import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Welcome to the Quiz Management System</h1>
      <div className="navigation-buttons">
        <button onClick={() => navigate('/login')}>Login</button>
        <button onClick={() => navigate('/dashboard')}>Dashboard</button>
        <button onClick={() => navigate('/admin')}>Admin Panel</button>
        <button onClick={() => navigate('/quiz')}>Take Quiz</button>
      </div>
    </div>
  );
};

export default Home;
