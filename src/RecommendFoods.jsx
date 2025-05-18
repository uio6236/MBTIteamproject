import React, { useEffect, useState } from 'react';
import './RecommendSports.css';
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import chickenImg from './assets/chicken.png';
import packerelImg from './assets/packerel.png';
import gullSoupImg from './assets/gullsoup.png';
import brown_riceImg from './assets/brown_rice.png';
import heartImg from './assets/heart.png';
import TabBar from './TabBar';

// MBTI별 추천 식단 데이터
const mbtiFoodRecommendations = {
  INFP: [
    {
      title: '닭백숙',
      description: '고단백 식품으로 유명한 닭백숙은 면역력 향상과 피로 회복에 효과적이에요. 포만감이 높고 지방은 적어 다이어트 식단으로도 적합합니다.',
      image: chickenImg,
    },
    {
      title: '고등어구이',
      description: '오메가-3 지방산이 풍부한 고등어는 심혈관 건강에 도움을 주고, 뇌 기능 향상에도 효과적입니다. 담백한 맛이 특징이에요.',
      image: packerelImg,
    },
    {
      title: '굴국밥',
      description: '철분과 아연이 풍부한 굴은 면역력 강화와 혈액순환에 좋아요. 따뜻한 국밥으로 속을 편안하게 채워줍니다.',
      image: gullSoupImg,
    },
    {
      title: '현미밥',
      description: '식이섬유가 풍부하고 포만감이 오래가는 현미는 혈당 조절에 도움을 주고, 장 건강에도 좋아요.',
      image: brown_riceImg,
    },
  ],
};

export default function RecommendFoods() {
  const [userName, setUserName] = useState('');
  const [userMBTI, setUserMBTI] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setUserName(data.nickname);
          setUserMBTI(data.mbti); // mbti 필드가 있으면 가져옴
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  const foods = mbtiFoodRecommendations[userMBTI] || [];

  if (loading) {
    return <p>사용자 정보를 불러오는 중...</p>;
  }

  return (
    <div className="recommend-container">
      <h1>
        <span className="highlight">{userName}</span>님을 위한 식단 추천
      </h1>
      <p className="subtext">
        균형 잡힌 식단으로 건강도, 기분도 챙겨보세요 :)
      </p>

      <div className="sports-list">
        {foods.map((food) => (
          <div key={food.title} className="sport-card">
            <img src={food.image} alt={food.title} className="sport-img" />
            <div className="sport-info">
              <h3>{food.title}</h3>
              <p>{food.description}</p>
            </div>
            <img src={heartImg} alt="heart" className="heart-icon" />
          </div>
        ))}
      </div>

      <TabBar />
    </div>
  );
}