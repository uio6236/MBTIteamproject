// src/RecommendSports.jsx
import React, { useEffect, useState } from 'react';
import './RecommendSports.css';
import yogaImg   from './assets/yoga.png';
import pilatesImg   from './assets/pilates.png';
import swimmingImg  from './assets/swimming.png';
import balletImg    from './assets/ballet.png';
import heartImg     from './assets/heart.png';

import TabBar from "./TabBar";

// Firebase import
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

const mbtiRecommendations = {
  INFP: [
    {
      title: '요가',
      description: '호흡과 명상을 기반으로 하는 운동인 요가는 근육의 유연성과 가동범위를 늘려줄 뿐만 아니라 신경의 안정과 스트레스 감소에도 효과적이에요.',
      image: yogaImg,
    },
    {
      title: '필라테스',
      description: '정적인 근력 운동인 필라테스는 코어의 안정성과 유연성을 동시에 요구하며 몸의 깊은 곳의 근육을 기를 수 있는 운동입니다.',
      image: pilatesImg,
    },
    {
      title: '수영',
      description: '물속에서의 고요함과 릴렉스를 느껴보세요! 수영은 부상의 위험이 적으며 여러 부위의 근육을 동시에 자극하는 전신 유산소 운동이에요.',
      image: swimmingImg,
    },
    {
      title: '발레',
      description: '우아해 보이는 예술 중 하나인 발레는 자세 교정, 유연성, 집중력 모두 갖춘 운동. 고도의 몸의 표현과 지세변화뿐만 아니라 감성까지 자극합니다.',
      image: balletImg,
    },
  ],
  };

export default function RecommendSports() {
  const [userMBTI, setUserMBTI]         = useState('');
  const [recommendations, setRecs]      = useState([]);
  const [loading, setLoading]           = useState(true);

  useEffect(() => {
    const fetchMBTI = async () => {
      const user = auth.currentUser;
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const docRef  = doc(db, 'users', user.uid);
        const snap    = await getDoc(docRef);
        if (snap.exists()) {
          const data = snap.data();
          const mbti = data.mbti;
          setUserMBTI(mbti);
          setRecs(mbtiRecommendations[mbti] || []);
        }
      } catch (e) {
        console.error('MBTI 로드 실패', e);
      }
      setLoading(false);
    };

    fetchMBTI();
  }, []);

  if (loading) {
    return <p>로딩 중…</p>;
  }

  return (
    <div className="recommend-container">
      <h1>
        {userMBTI
          ? <><span className="highlight">{userMBTI}</span> 타입에게 추천하는 운동!</>
          : '추천 운동을 불러올 수 없습니다.'}
      </h1>

      <p className="subtext">
        {userMBTI
          ? `${userMBTI} 분들은 주로 이런 운동을 좋아하십니다 :)`
          : '로그인 상태를 확인해 주세요.'}
      </p>

      <div className="sports-list">
        {recommendations.map((sport) => (
          <div key={sport.title} className="sport-card">
            <img src={sport.image} alt={sport.title} className="sport-img" />
            <div className="sport-info">
              <h3>{sport.title}</h3>
              <p>{sport.description}</p>
            </div>
            <img src={heartImg} alt="heart" className="heart-icon" />
          </div>
        ))}
      </div>

      <TabBar />
    </div>
  );
}