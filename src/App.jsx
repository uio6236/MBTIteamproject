import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import IntroPage from './IntroPage';
import LoginPage from './LoginPage';
import SignUpPage1 from './SignUpPage1';
import SignUpPage2 from './SignUpPage2';
import MBTIPage from './MBTIPage';

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
      <Route path="/" element={<IntroPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup/step1" element={<SignUpPage1 onNext={handleNextSignUp} />} />
      <Route path="/signup/step2" element={<SignUpPage2 onSubmit={handleSubmitSignUp} />} />
      <Route path="/select-mbti" element={<MBTIPage onSelect={handleSelectMBTI} />} />
    </Routes>
  );
}

export default App;
