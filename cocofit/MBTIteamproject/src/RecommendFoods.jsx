import React, { useEffect, useState } from 'react';
import './RecommendSports.css';
import defaultFoodImg from './assets/fox.png';
import heartImg from './assets/heart.png';
import TabBar from './TabBar';
import { useNavigate } from 'react-router-dom';
import { auth, db } from './firebase';
import { doc, getDoc, collection, getDocs, query, where, documentId } from 'firebase/firestore';

// 이미지 자동 import
const imageModules = import.meta.glob('./assets/*.png', { eager: true });
const foodImageSources = {};
Object.entries(imageModules).forEach(([path, module]) => {
  const fileName = path.split('/').pop();
  foodImageSources[fileName] = module.default;
});

const getFoodImage = (imageName) => {
  if (!imageName) return defaultFoodImg;
  return foodImageSources[imageName] || defaultFoodImg;
};

export default function RecommendFoods() {
  const navigate = useNavigate();
  const [userMBTI, setUserMBTI] = useState('');
  const [userName, setUserName] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDataAndRecommendations = async () => {
      setLoading(true);
      const user = auth.currentUser;

      if (!user) {
        setUserName('방문자');
        setUserMBTI('');
        setRecommendations([]);
        setLoading(false);
        return;
      }

      try {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
          setUserName('사용자');
          setRecommendations([]);
          setLoading(false);
          return;
        }

        const userData = userDocSnap.data();
        const mbti = userData.mbti || '';
        setUserMBTI(mbti);
        setUserName(userData.nickname || '사용자');

        if (!mbti) {
          setRecommendations([]);
          setLoading(false);
          return;
        }

        const mbtiRecDocRef = doc(db, 'mbtiRecommendations', mbti);
        const mbtiRecDocSnap = await getDoc(mbtiRecDocRef);

        if (!mbtiRecDocSnap.exists()) {
          setRecommendations([]);
          setLoading(false);
          return;
        }

        const foodIds = mbtiRecDocSnap.data().recommendedFoodIds || [];
        const foodCollectionRef = collection(db, 'allFoods');
        let fetchedFoods = [];

        const MAX_IN_VALUES = 30;
        for (let i = 0; i < foodIds.length; i += MAX_IN_VALUES) {
          const chunk = foodIds.slice(i, i + MAX_IN_VALUES);
          const q = query(foodCollectionRef, where(documentId(), 'in', chunk));
          const snapshot = await getDocs(q);
          snapshot.forEach((docSnap) => {
            fetchedFoods.push({ id: docSnap.id, ...docSnap.data() });
          });
        }

        const orderedFoods = foodIds
          .map(id => fetchedFoods.find(f => f.id === id))
          .filter(Boolean);

        setRecommendations(orderedFoods);
        setCurrentIndex(0);
      } catch (e) {
        console.error('음식 추천 로딩 실패:', e);
        setRecommendations([]);
      }

      setLoading(false);
    };

    fetchUserDataAndRecommendations();
  }, []);

  const handleAnother = () => {
    setCurrentIndex((prev) => (prev + 1) % recommendations.length);
  };

  const currentFood = recommendations[currentIndex];

  if (loading) return <p>추천 정보를 불러오는 중…</p>;

  return (
    <div className="recommend-container">
      <h1>
        <span className="highlight">{userName}</span>님과 같은 <span className="highlight">{userMBTI}</span>에게 추천하는 식단!
      </h1>
      <p className="subtext">부담 없이 즐길 수 있는 영양 가득한 식단을 준비했어요 :)<br />소소하지만 확실한 건강을 함께 챙겨볼까요?</p>

      {currentFood ? (
        <div className="center-card">
          <h2>{currentFood.title}</h2>
          <img src={getFoodImage(currentFood.imageName)} alt={currentFood.title} className="center-image" />
          <div className="hashtag-list">
            {(currentFood.hashtags || []).map((tag, i) => (
              <div key={i} className="hashtag">#{tag}</div>
            ))}
          </div>
          <div className="likes">
            <img src={heartImg} alt="heart" className="heart-icon" />
            <span>+{currentFood.likes || 0}</span>
          </div>
          <div className="button-row">
            <button className="blue-button" onClick={handleAnother}>another</button>
            <button className="blue-button" onClick={() =>
              navigate('/chat', {
                state: { autoQuestion: `${currentFood.title}에 대해 알려줘` }
              })
            }>detail</button>
          </div>
        </div>
      ) : (
        <p>추천 음식이 없습니다.</p>
      )}

      <TabBar />
    </div>
  );
}
