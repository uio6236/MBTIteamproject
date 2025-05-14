import React, { useState } from 'react';
import './SignUpPage.css';
import logo from './assets/cocofit_logo.jpg';
import { auth, db } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useLocation, useNavigate } from 'react-router-dom';

const SignUpPage2 = ({ onSubmit }) => {
  const [nickname, setNickname] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { email, password } = location.state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ 1. Firebase Authentication 계정 생성
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // ✅ 2. Firestore에 추가 정보 저장
      await setDoc(doc(db, 'users', uid), {
        email: email,
        nickname: nickname,
        height: height,
        weight: weight,
        createdAt: new Date(),
      });

      alert('회원가입 성공! MBTI 선택으로 이동합니다.');
      navigate('/select-mbti');
    } catch (error) {
      console.error('회원가입 실패', error);
      alert('회원가입 실패: ' + error.message);
    }
  };

  return (
    <div className="signup-container">
      <img src={logo} alt="COCOFIT Logo" className="logo" />
      <form onSubmit={handleSubmit}>
        <label>닉네임</label>
        <input type="text" placeholder="완두콩 3세" value={nickname} onChange={(e) => setNickname(e.target.value)} required />

        <label>키</label>
        <input type="number" placeholder="cm" value={height} onChange={(e) => setHeight(e.target.value)} required />

        <label>몸무게</label>
        <input type="number" placeholder="kg" value={weight} onChange={(e) => setWeight(e.target.value)} required />

        <button type="submit">다음으로</button>
      </form>
    </div>
  );
};

export default SignUpPage2;
