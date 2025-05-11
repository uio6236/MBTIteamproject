// src/MBTIPage.jsx
import React from 'react';
import './SignUpPage.css';
// import logo from './assets/cocofit_logo.jpg';

// 개별 MBTI 이미지 import
import ENFPImg from './assets/ENFP.jpg';
import ENTPImg from './assets/ENTP.jpg';
import ESTPImg from './assets/ESTP.jpg';
import ENTJImg from './assets/ENTJ.png';
import ESFJImg from './assets/ESFJ.jpg';
import ESTJImg from './assets/ESTJ.jpg';
import ESFPImg from './assets/ESFP.png';
import ENFJImg from './assets/ENFJ.jpg';
import INFPImg from './assets/INFP.png';
import INTPImg from './assets/INTP.jpg';
import ISTPImg from './assets/ISTP.jpg';
import INTJImg from './assets/INTJ.jpg';
import ISFJImg from './assets/ISFJ.jpg';
import ISTJImg from './assets/ISTJ.jpg';
import ISFPImg from './assets/ISFP.jpg';
import INFJImg from './assets/INFJ.jpg';


import circleImg from './assets/circle.jpg';

import { useNavigate } from 'react-router-dom';

const MBTI_TYPES = [
  'ENFJ', 'ENFP', 'ENTJ', 'ENTP',
  'ESFJ', 'ESFP', 'ESTJ', 'ESTP',
  'INFJ', 'INFP', 'INTJ', 'INTP',
  'ISFJ', 'ISFP', 'ISTJ', 'ISTP'
];

// 이미지 매핑 객체
const MBTI_IMAGES = {
  ENFP: ENFPImg,
  ENTP: ENTPImg,
  ENTJ: ENTJImg,
  ENFJ: ENFJImg,
  ESTP: ESTPImg,
  ESTJ: ESTJImg,
  ESFP: ESFPImg,
  ESFJ: ESFJImg,
  INFP: INFPImg,
  INTP: INTPImg,
  INTJ: INTJImg,
  INFJ: INFJImg,
  ISTP: ISTPImg,
  ISTJ: ISTJImg,
  ISFP: ISFPImg,
  ISFJ: ISFJImg

  // 나머지는 circleImg로 대체됨
};

const MBTIPage = ({ onSelect }) => {
  const navigate = useNavigate();

  const handleSelect = (type) => {
    onSelect(type);
    navigate(`/mbti/${type}`); // 상세 페이지로 이동
  };

  return (
    <div className="signup-container">
      <h2>
        당신의 <span className="mbti">mbti</span>를<br />선택해주세요.
      </h2>
      <div className="mbti-grid">
        {MBTI_TYPES.map((type) => (
          <div key={type} className="mbti-option" onClick={() => handleSelect(type)}>
            <img
              src={MBTI_IMAGES[type] || circleImg}
              alt={type}
              className="mbti-icon"
            />
            <div>{type}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MBTIPage;
