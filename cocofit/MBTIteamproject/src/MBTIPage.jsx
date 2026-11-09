// src/MBTIPage.jsx
import React from 'react';
import './SignUpPage.css';
import { useNavigate } from 'react-router-dom';
import { auth, db } from './firebase';
import { doc, updateDoc } from 'firebase/firestore';

import enfpImg from './assets/enfp.png';
import entpImg from './assets/entp.png';
import estpImg from './assets/estp.png';
import entjImg from './assets/entj.png';
import esfjImg from './assets/esfj.png';
import estjImg from './assets/estj.png';
import esfpImg from './assets/esfp.png';
import enfjImg from './assets/enfj.png';
import infpImg from './assets/infp.png';
import intpImg from './assets/intp.png';
import istpImg from './assets/istp.png';
import intjImg from './assets/intj.png';
import isfjImg from './assets/isfj.png';
import istjImg from './assets/istj.png';
import isfpImg from './assets/isfp.png';
import infjImg from './assets/infj.png';

import circleImg from './assets/circle.jpg';

const MBTI_TYPES = [
  'ENFJ', 'ENFP', 'ENTJ', 'ENTP',
  'ESFJ', 'ESFP', 'ESTJ', 'ESTP',
  'INFJ', 'INFP', 'INTJ', 'INTP',
  'ISFJ', 'ISFP', 'ISTJ', 'ISTP'
];

// 이미지 매핑 객체
const MBTI_IMAGES = {
  ENFP: enfpImg,
  ENTP: entpImg,
  ENTJ: entjImg,
  ENFJ: enfjImg,
  ESTP: estpImg,
  ESTJ: estjImg,
  ESFP: esfpImg,
  ESFJ: esfjImg,
  INFP: infpImg,
  INTP: intpImg,
  INTJ: intjImg,
  INFJ: infjImg,
  ISTP: istpImg,
  ISTJ: istjImg,
  ISFP: isfpImg,
  ISFJ: isfjImg
};

const MBTIPage = () => {
  const navigate = useNavigate();

  const handleSelect = async (type) => {
    const user = auth.currentUser;

    if (!user) {
      alert('로그인이 필요합니다.');
      return;
    }

    try {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, { mbti: type });
      alert(`${type}로 저장되었습니다!`);
      navigate(`/mbti/${type}`); // ✅ 저장 후 상세 페이지로 이동
    } catch (error) {
      console.error('MBTI 저장 실패:', error);
      alert('MBTI 저장 실패: ' + error.message);
    }
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
