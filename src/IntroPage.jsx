import React from 'react';
import './IntroPage.css';
import logo from './assets/cocofit_logo.jpg';
import { useNavigate } from 'react-router-dom';

const IntroPage = () => {
  const navigate = useNavigate();

  return (
    <div className="intro-container">
      <img src={logo} 
      alt="COCOFIT Logo" 
      className="logo"
      onClick={() => navigate('/login')}
      style={{ cursor: 'pointer' }}
      />
    </div>
  );
};

export default IntroPage;
