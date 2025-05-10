// src/MBTIPage.jsx
import React from 'react';
import './SignUpPage.css';
import logo from './assets/cocofit_logo.jpg';
import circleImage from './assets/circle.jpg';
import { useNavigate } from 'react-router-dom';

const MBTI_TYPES = [
  'ENFJ', 'ENFP', 'ENTJ', 'ENTP',
  'ESFJ', 'ESFP', 'ESTJ', 'ESTP',
  'INFJ', 'INFP', 'INTJ', 'INTP',
  'ISFJ', 'ISFP', 'ISTJ'
];

const MBTIPage = ({ onSelect }) => {
  const navigate = useNavigate();

  const handleSelect = (type) => {
    onSelect(type); // ✅ App에서 mbti 저장
    navigate('/'); // 예: 완료 후 Intro 페이지로 이동
  };

  return (
    <div className="signup-container">
      <img src={logo} alt="COCOFIT Logo" className="logo" />
      <h2>
        당신의 <span className="mbti">mbti</span>를<br />선택해주세요.
      </h2>
      <div className="mbti-grid">
        {MBTI_TYPES.map((type) => (
          <div key={type} className="mbti-option" onClick={() => handleSelect(type)}>
            <img src={circleImage} alt={type} className="mbti-icon" />
            <div>{type}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MBTIPage;
