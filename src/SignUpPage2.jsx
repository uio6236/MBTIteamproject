// src/SignUpPage2.jsx
import React, { useState } from 'react';
import './SignUpPage.css';
import logo from './assets/cocofit_logo.jpg';
import { useNavigate } from 'react-router-dom'; // ✅ 추가

const SignUpPage2 = ({ onSubmit }) => {
  const [nickname, setNickname] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const navigate = useNavigate(); // ✅ 추가

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nickname, height, weight });
    navigate('/select-mbti'); // ✅ MBTI 선택 페이지로 이동
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
