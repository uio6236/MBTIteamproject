// src/MBTIDetailPage.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './SignUpPage.css';

import enfpImg from './assets/enfp.png';
import enfjImg from './assets/enfj.png';
import entjImg from './assets/entj.png';
import entpImg from './assets/entp.png';
import esfjImg from './assets/esfj.png';
import esfpImg from './assets/esfp.png';
import estjImg from './assets/estj.png';
import estpImg from './assets/estp.png';
import infjImg from './assets/infj.png';
import infpImg from './assets/infp.png';
import intjImg from './assets/intj.png';
import intpImg from './assets/intp.png';
import isfjImg from './assets/isfj.png';
import isfpImg from './assets/isfp.png';
import istjImg from './assets/istj.png';
import istpImg from './assets/istp.png';

const MBTI_DETAILS = {
  ENFP: { title: '자유로운 낭만주의자', image: enfpImg },
  ENFJ: { title: '계획에 강한 전략가', image: enfjImg },
  ENTJ: { title: '효율적인 전략가', image: entjImg },
  ENTP: { title: '아이디어 넘치는 도전가', image: entpImg },
  ESFJ: { title: '모두를 챙기는 따뜻한 조율자', image: esfjImg },
  ESFP: { title: '순간을 즐기는 무대의 주인공', image: esfpImg },
  ESTJ: { title: '체계적인 현실주의자', image: estjImg },
  ESTP: { title: '즉흥적이고 에너지 넘치는 행동가', image: estpImg },
  INFJ: { title: '깊은 통찰을 가진 이상주의자', image: infjImg },
  INFP: { title: '꿈을 좇는 감성적 이상가', image: infpImg },
  INTJ: { title: '전략적인 마스터마인드', image: intjImg },
  INTP: { title: '호기심 가득한 논리 탐구자', image: intpImg },
  ISFJ: { title: '조용히 헌신하는 수호자', image: isfjImg },
  ISFP: { title: '감각적이고 자유로운 예술가', image: isfpImg },
  ISTJ: { title: '책임감있는 관리자', image: istjImg },
  ISTP: { title: '냉철하고 유연한 문제 해결사', image: istpImg },
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
