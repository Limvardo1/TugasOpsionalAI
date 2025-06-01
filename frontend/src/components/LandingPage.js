import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    if (role === 'admin') {
      navigate('/login/admin');
    } else if (role === 'user') {
      navigate('/login/user');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to the Quiz Application</h1>
      <p style={styles.subtitle}>Please select your role to continue:</p>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => handleRoleSelection('admin')}>
          Dosen (Admin)
        </button>
        <button style={styles.button} onClick={() => handleRoleSelection('user')}>
          Mahasiswa (User)
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f6fa',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  title: {
    fontSize: '3rem',
    marginBottom: '1rem',
    color: '#2f3640',
  },
  subtitle: {
    fontSize: '1.5rem',
    marginBottom: '2rem',
    color: '#718093',
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',
  },
  button: {
    padding: '15px 30px',
    fontSize: '1.2rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#273c75',
    color: '#f5f6fa',
    transition: 'background-color 0.3s ease',
  },
};

export default LandingPage;
