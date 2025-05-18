// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import IntroPage from './IntroPage';
import LoginPage from './LoginPage';
import SignUpPage1 from './SignUpPage1';
import SignUpPage2 from './SignUpPage2';
import MBTIPage from './MBTIPage';
import MBTIDetailPage from './MBTIDetailPage';
import RecommendSports from './RecommendSports';
import RecommendFoods from './RecommendFoods';
import Layout from './Layout'; // 공통 TabBar 포함하는 Layout 컴포넌트

function App() {
  const [formData, setFormData] = useState({});

  const handleNextSignUp = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleSubmitSignUp = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleSelectMBTI = (mbti) => {
    const finalData = { ...formData, mbti };
    console.log('최종 회원가입 정보:', finalData);
  };

  return (
    <Routes>
      {/* TabBar 없는 페이지들 */}
      <Route path="/" element={<IntroPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup/step1" element={<SignUpPage1 onNext={handleNextSignUp} />} />
      <Route path="/signup/step2" element={<SignUpPage2 onSubmit={handleSubmitSignUp} />} />
      <Route path="/select-mbti" element={<MBTIPage onSelect={handleSelectMBTI} />} />
      <Route path="/mbti/:type" element={<MBTIDetailPage />} />

      {/* TabBar 포함되는 페이지들 */}
      <Route element={<Layout />}>
        <Route path="/recommend-sports" element={<RecommendSports />} />
        <Route path="/recommend-foods" element={<RecommendFoods />} />
      </Route>
    </Routes>
  );
}

export default App;
