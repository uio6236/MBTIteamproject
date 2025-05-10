import React from 'react';
import './LoginPage.css';
import logo from './assets/cocofit_logo.jpg'; // 로고 파일 경로는 맞게 수정해줘
import {useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <img src={logo} alt="COCOFIT Logo" className="login-logo" />

      <div className="input-group">
        <label>이메일</label>
        <input type="email" placeholder="email@domain.com" />
      </div>

      <div className="input-group">
        <label>비밀번호</label>
        <input type="password" placeholder="Password" />
      </div>

      <button className="login-button">로그인</button>

      <div className="divider">
        <hr />
        <span>or</span>
        <hr />
      </div>

      <button className="google-button">
        <img
          src="https://developers.google.com/identity/images/g-logo.png"
          alt="Google"
        />
        <span>Continue with Google</span>
      </button>

      <p className="signup-text">
        Coco가 처음이신가요?{' '}
        <span className="signup-link" onClick={() => navigate('/signup/step1')}>
          간단 회원가입 하기!
        </span>
      </p>
    </div>
  );
};

export default LoginPage;
