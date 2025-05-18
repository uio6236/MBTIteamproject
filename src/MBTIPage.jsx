// src/MBTIPage.jsx
import React from 'react';
import './SignUpPage.css';
import { useNavigate } from 'react-router-dom';
import { auth, db } from './firebase';
import { doc, updateDoc } from 'firebase/firestore';
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
      navigate(`/mbti/${type}`);  // ✅ 저장 후 상세 페이지로 이동
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