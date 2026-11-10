// Welcome.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome to Akhil's Trendszz</h1>
      <p className="welcome-subtitle">Where Trends meet Style ✨</p>
      <button className="welcome-button" onClick={() => navigate('/signup')}>
        Get Started
      </button>
      <p className="welcome-login-link" onClick={() => navigate('/login')}>
        Already have an account? Login
      </p>
    </div>
  );
};

export default Welcome;
