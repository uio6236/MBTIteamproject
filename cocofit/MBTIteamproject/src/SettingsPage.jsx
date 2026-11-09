import React, { useEffect, useState } from 'react';
import './SettingsPage.css';
import { auth, db } from './firebase';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { deleteUser, signOut } from 'firebase/auth'; // signOut 추가
import { useNavigate } from 'react-router-dom';

// 이미지 자동 매핑
const imageModules = import.meta.glob('./assets/*.png', { eager: true });
const mbtiImageSources = {};
Object.entries(imageModules).forEach(([path, module]) => {
  const fileName = path.split('/').pop(); // ex) 'enfj.png'
  mbtiImageSources[fileName] = module.default;
});

export default function SettingsPage() {
  const [userName, setUserName] = useState('사용자');
  const [userMBTI, setUserMBTI] = useState('');
  const [profileImg, setProfileImg] = useState(mbtiImageSources['fox.png']);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate('/login'); // 사용자가 없으면 로그인 페이지로 리다이렉트
        return;
      };

      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const nickname = data.nickname || '사용자';
          const mbti = data.mbti || '';
          setUserName(nickname);
          setUserMBTI(mbti);

          const imgKey = `${mbti?.toLowerCase()}.png`;
          setProfileImg(mbtiImageSources[imgKey] || mbtiImageSources['fox.png']);
        }
      } catch (err) {
        console.error('유저 정보 로딩 실패:', err);
      }
    };

    fetchUser();
  }, [navigate]);

  // 닉네임 변경
  const handleNicknameChange = async () => {
    const newNickname = prompt('새로운 닉네임을 입력하세요:', userName);
    if (newNickname && newNickname.trim() !== '' && newNickname !== userName) {
      try {
        const user = auth.currentUser;
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, { nickname: newNickname });
        setUserName(newNickname);
        alert('닉네임이 성공적으로 변경되었습니다.');
      } catch (error) {
        alert('닉네임 변경에 실패했습니다.');
        console.error('닉네임 변경 실패:', error);
      }
    }
  };

  // MBTI 변경
  const handleMbtiChange = () => {
    if (window.confirm('MBTI를 변경하시겠습니까? MBTI 선택 페이지로 이동합니다.')) {
      navigate('/select-mbti');
    }
  };

  // 계정 탈퇴
  const handleAccountDeletion = async () => {
    if (window.confirm('정말로 계정을 탈퇴하시겠습니까? 모든 정보가 영구적으로 즉시 삭제됩니다.')) {
      try {
        const user = auth.currentUser;
        if (user) {
          const userDocRef = doc(db, 'users', user.uid);
          await deleteDoc(userDocRef);
          await deleteUser(user);
          alert('계정이 성공적으로 삭제되었습니다.');
          navigate('/login'); // 로그인 페이지로 이동
        }
      } catch (error) {
        console.error('계정 탈퇴 실패:', error);
        if (error.code === 'auth/requires-recent-login') {
          alert('계정 탈퇴는 보안을 위해 최근 로그인이 필요합니다. 다시 로그인한 후 시도해주세요.');
        } else {
          alert(`계정 탈퇴에 실패했습니다: ${error.message}`);
        }
      }
    }
  };

  // 고객 문의
  const handleCustomerInquiry = () => {
    alert('문의는 받지 않습니다.');
  };

  const handleCompanyPR = () => {
    alert('응애');
  };

  // 로그아웃 핸들러
  const handleLogout = async () => {
    if (window.confirm('로그아웃 하시겠습니까?')) {
      try {
        await signOut(auth);
        alert('로그아웃 되었습니다.');
        navigate('/login');
      } catch (error) {
        alert('로그아웃에 실패했습니다.');
        console.error('로그아웃 실패:', error);
      }
    }
  };

 

  return (
    <div className="settings-container">
      <h2 className="settings-title">설정</h2>
      <div className="settings-profile">
        <img src={profileImg} alt="프로필" className="profile-img" />
        <p className="profile-name">{userName}님</p>
        {userMBTI && <p className="profile-mbti">MBTI: {userMBTI}</p>}
      </div>

      <div className="settings-list">
        <div className="settings-item" onClick={handleNicknameChange}>
          <p className="item-title">닉네임 변경</p>
          <p className="item-desc"> 닉네임은 30일마다 한 번씩 변경 가능해요.</p>
        </div>
        <div className="settings-item" onClick={handleMbtiChange}>
          <p className="item-title">MBTI 변경</p>
          <p className="item-desc">MBTI는 30일마다 한 번씩 변경 가능해요.</p>
        </div>
        <div className="settings-item" onClick={handleAccountDeletion}>
          <p className="item-title">계정 탈퇴</p>
          <p className="item-desc">계정에 있는 모든 정보가 사라져요.</p>
        </div>
        <div className="settings-item" onClick={handleCustomerInquiry}>
          <p className="item-title">고객 문의</p>
          <p className="item-desc">하지마세요ㅠ</p>
        </div>
        <div className="settings-item">
          <p className="item-title">앱 버전</p>
          <p className="item-desc">1.1.0</p>
        </div>
        <div className="settings-item" onClick={handleCompanyPR}>
          <p className="item-title">회사 소개</p>
          <p className="item-desc">건강한 i들</p>
        </div>
        <div className="settings-item" onClick={handleLogout}>
          <p className="item-title">로그아웃</p>
          <p className="item-desc">로그인 페이지로 이동합니다.</p>
        </div>
      </div>
    </div>
  );
}