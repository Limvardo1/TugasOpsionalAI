import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="login-box">
        <h2>Login</h2>
        <p>Masuk sebagai</p>
        <div className="login-options">
          <button className="btn user-btn" onClick={() => navigate('/login/user')}>
            Mahasiswa
          </button>
          <button className="btn admin-btn" onClick={() => navigate('/login/admin')}>
            Dosen / Pegawai
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
