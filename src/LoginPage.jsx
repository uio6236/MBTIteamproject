import React, { useState } from 'react';
import './LoginPage.css';
import logo from './assets/cocofit_logo.jpg';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from './firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('로그인 성공!');
      navigate('/recommend-sports');  // 성공 시 메인 페이지로 이동 (경로는 필요에 맞게 수정)
    } catch (error) {
      alert(`로그인 실패: ${error.message}`);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert('구글 로그인 성공!');
      navigate('/recommend-sports');  // 성공 시 메인 페이지로 이동 (경로는 필요에 맞게 수정)
    } catch (error) {
      alert(`구글 로그인 실패: ${error.message}`);
    }
  };

  return (
    <div className="login-container">
      <img src={logo} alt="COCOFIT Logo" className="login-logo" />

      <div className="input-group">
        <label>이메일</label>
        <input
          type="email"
          placeholder="email@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>비밀번호</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="login-button" onClick={handleLogin}>로그인</button>

      <div className="divider">
        <hr />
        <span>or</span>
        <hr />
      </div>

      <button className="google-button" onClick={handleGoogleLogin}>
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
