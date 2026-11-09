// RecommendSports.jsx
import React, { useEffect, useState } from 'react';
import './RecommendSports.css';
import defaultSportImg from './assets/fox.png';
import heartImg from './assets/heart.png';
import TabBar from './TabBar';
import { useNavigate } from 'react-router-dom';
import { auth, db } from './firebase';
import { doc, getDoc, collection, getDocs, query, where, documentId } from 'firebase/firestore';

const imageModules = import.meta.glob('./assets/*.png', { eager: true });
const sportImageSources = {};
Object.entries(imageModules).forEach(([path, module]) => {
  const fileName = path.split('/').pop();
  sportImageSources[fileName] = module.default;
});

const getSportImage = (imageName) => {
  if (!imageName) return defaultSportImg;
  return sportImageSources[imageName] || defaultSportImg;
};

export default function RecommendSports() {
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

        const sportIds = mbtiRecDocSnap.data().recommendedSportIds || [];
        const sportCollectionRef = collection(db, 'allSports');
        let fetchedSports = [];

        const MAX_IN_VALUES = 30;
        for (let i = 0; i < sportIds.length; i += MAX_IN_VALUES) {
          const chunk = sportIds.slice(i, i + MAX_IN_VALUES);
          const q = query(sportCollectionRef, where(documentId(), 'in', chunk));
          const snapshot = await getDocs(q);
          snapshot.forEach((docSnap) => {
            fetchedSports.push({ id: docSnap.id, ...docSnap.data() });
          });
        }

        const orderedSports = sportIds
          .map(id => fetchedSports.find(f => f.id === id))
          .filter(Boolean);

        setRecommendations(orderedSports);
        setCurrentIndex(0);
      } catch (e) {
        console.error('운동 추천 로딩 실패:', e);
        setRecommendations([]);
      }

      setLoading(false);
    };

    fetchUserDataAndRecommendations();
  }, []);

  const handleAnother = () => {
    setCurrentIndex((prev) => (prev + 1) % recommendations.length);
  };

  const currentSport = recommendations[currentIndex];

  if (loading) return <p>추천 정보를 불러오는 중…</p>;

  return (
    <div className="recommend-container">
      <h1>
        <span className="highlight">{userName}</span>님과 같은 <span className="highlight">{userMBTI}</span>에게 추천하는 운동!
      </h1>
      <p className="subtext">몰입할 수 있는 운동으로 에너지 충전!</p>

      {currentSport ? (
        <div className="center-card">
          <h2>{currentSport.title}</h2>
          <img src={getSportImage(currentSport.imageName)} alt={currentSport.title} className="center-image" />
          <div className="hashtag-list">
            {(currentSport.hashtags || []).map((tag, i) => (
              <div key={i} className="hashtag">#{tag}</div>
            ))}
          </div>
          <div className="likes">
            <img src={heartImg} alt="heart" className="heart-icon" />
            <span>+{currentSport.likes || 0}</span>
          </div>
          <div className="button-row">
            <button className="blue-button" onClick={handleAnother}>another</button>
            <button className="blue-button" onClick={() =>
              navigate('/chat', {
                state: { autoQuestion: `${currentSport.title}에 대해 알려줘` }
              })
            }>detail</button>
          </div>
        </div>
      ) : (
        <p>추천 운동이 없습니다.</p>
      )}

      <TabBar />
    </div>
  );
}
