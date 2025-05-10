// src/SignUpPage1.jsx
import React, { useState } from 'react';
import './SignUpPage.css';
import logo from './assets/cocofit_logo.jpg';
import { useNavigate } from 'react-router-dom'

const SignUpPage1 = () => {
const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirm) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
   navigate('/signup/step2');
  };

  return (
    <div className="signup-container">
      <img src={logo} alt="COCOFIT Logo" className="logo" />
      <form onSubmit={handleSubmit}>
        <label>이메일</label>
        <input type="email" value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)} required />

        <label>비밀번호</label>
        <input type="password" value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} required />

        <label>비밀번호 확인</label>
        <input type="password" value={confirm} placeholder="password" onChange={(e) => setConfirm(e.target.value)} required />

        <button type="submit">다음으로</button>
      </form>
    </div>
  );
};

export default SignUpPage1;
