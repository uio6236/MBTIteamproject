// src/MBTIDetailPage.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './SignUpPage.css';

import ENFPImg from './assets/ENFP.jpg';
import ENFJImg from './assets/ENFJ.jpg';
import ENTJImg from './assets/ENTJ.png';
import ENTPImg from './assets/ENTP.jpg';
import ESFJImg from './assets/ESFJ.jpg';
import ESFPImg from './assets/ESFP.png';
import ESTJImg from './assets/ESTJ.jpg';
import ESTPImg from './assets/ESTP.jpg';
import INFJImg from './assets/INFJ.jpg';
import INFPImg from './assets/INFP.png';
import INTJImg from './assets/INTJ.jpg';
import INTPImg from './assets/INTP.jpg';
import ISFJImg from './assets/ISFJ.jpg';
import ISFPImg from './assets/ISFP.jpg';
import ISTJImg from './assets/ISTJ.jpg';
import ISTPImg from './assets/ISTP.jpg';

const MBTI_DETAILS = {
  ENFP: { title: '자유로운 낭만주의자', image: ENFPImg },
  ENFJ: { title: '계획에 강한 전략가', image: ENFJImg },
  ENTJ: { title: '효율적인 전략가', image: ENTJImg },
  ENTP: { title: '아이디어 넘치는 도전가', image: ENTPImg },
  ESFJ: { title: '모두를 챙기는 따뜻한 조율자', image: ESFJImg },
  ESFP: { title: '순간을 즐기는 무대의 주인공', image: ESFPImg },
  ESTJ: { title: '체계적인 현실주의자', image: ESTJImg },
  ESTP: { title: '즉흥적이고 에너지 넘치는 행동가', image: ESTPImg },
  INFJ: { title: '깊은 통찰을 가진 이상주의자', image: INFJImg },
  INFP: { title: '꿈을 좆는 감성적 이상가', image: INFPImg },
  INTJ: { title: '전략적인 마스터마인드', image: INTJImg },
  INTP: { title: '호기심 가득한 논리 탐구자', image: INTPImg },
  ISFJ: { title: '조용히 헌신하는 수호자', image: ISFJImg },
  ISFP: { title: '감각적이고 자유로운 예술가', image: ISFPImg },
  ISTJ: { title: '책임감있는 관리자', image: ISTJImg },
  ISTP: { title: '냉철하고 유연한 문제 해결사', image: ISTPImg },
};

const MBTIDetailPage = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const mbti = MBTI_DETAILS[type];

  if (!mbti) {
    return <p>존재하지 않는 MBTI 유형입니다.</p>;
  }

  const handleNext = () => {
    navigate('/recommend-sports');
  };

  return (
    <div className="signup-container" style={{ textAlign: 'center' }} onClick={handleNext}>
      <h2>당신은</h2>
      <h3 style={{ color: 'green' }}>{mbti.title}</h3>
      <img src={mbti.image} alt={type} className="mbti-icon" />
      <p style={{ marginTop: '10px', fontWeight: 'bold' }}>{type}</p>
      <p style={{ marginTop: '20px', color: 'gray' }}>화면을 터치해서 다음으로 이동</p>
    </div>
  );
};

export default MBTIDetailPage;
