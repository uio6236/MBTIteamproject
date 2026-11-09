// src/ChatBot.jsx
import React, { useState, useEffect, useRef } from "react";
import "./ChatBot.css";
import { auth, db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useLocation } from "react-router-dom";
import botAvatar from './assets/bot.png';

import enfpImg from './assets/enfp.png';
import entpImg from './assets/entp.png';
import estpImg from './assets/estp.png';
import entjImg from './assets/entj.png';
import esfjImg from './assets/esfj.png';
import estjImg from './assets/estj.png';
import esfpImg from './assets/esfp.png';
import enfjImg from './assets/enfj.png';
import infpImg from './assets/infp.png';
import intpImg from './assets/intp.png';
import istpImg from './assets/istp.png';
import intjImg from './assets/intj.png';
import isfjImg from './assets/isfj.png';
import istjImg from './assets/istj.png';
import isfpImg from './assets/isfp.png';
import infjImg from './assets/infj.png';

const MBTI_IMAGES = {
  ENFP: enfpImg,
  ENTP: entpImg,
  ENTJ: entjImg,
  ENFJ: enfjImg,
  ESTP: estpImg,
  ESTJ: estjImg,
  ESFP: esfpImg,
  ESFJ: esfjImg,
  INFP: infpImg,
  INTP: intpImg,
  INTJ: intjImg,
  INFJ: infjImg,
  ISTP: istpImg,
  ISTJ: istjImg,
  ISFP: isfpImg,
  ISFJ: isfjImg
};

const ChatBot = () => {
  const location = useLocation();
  const [mbti, setMbti] = useState("ISFJ");
  const [nickname, setNickname] = useState("회원");
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(true);
  const chatBoxRef = useRef(null);
  const API_URL = "http://localhost:5000";

  const userAvatar = MBTI_IMAGES[mbti] || "./assets/default-user.png";

  useEffect(() => {
    const fetchUser = async () => {
      const user = auth?.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setMbti(data.mbti || "ISFJ");
          setNickname(data.nickname || "회원");
        }
      }
      setLoading(false);
    };
    if (auth && db) fetchUser();
    else setLoading(false);
  }, []);

  useEffect(() => {
    if (!mbti) return;
    (async () => {
      try {
        const res = await fetch(`${API_URL}/ask`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: "", mbti })
        });
        const data = await res.json();
        setChat([{ role: "bot", content: data.answer }]);
      } catch (error) {
        setChat([{ role: "bot", content: "❌ 챗봇 초기 로딩 실패. Flask 서버 확인!" }]);
      }
    })();
  }, [mbti]);

  useEffect(() => {
    const q = location.state?.autoQuestion;
    if (q) {
      setQuestion("");
      sendQuestion(q);
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chat]);

  const sendQuestion = async (customQ = null) => {
    if (!mbti) return;
    const finalQ = customQ ?? question;
    if (!finalQ.trim()) return;

    const userMessage = { role: "user", content: finalQ };
    setChat((prev) => [...prev, userMessage]);
    setQuestion("");

    try {
      const res = await fetch(`${API_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: finalQ, mbti })
      });
      const data = await res.json();
      const botMessage = { role: "bot", content: data.answer };
      setChat((prev) => [...prev, botMessage]);
    } catch (error) {
      setChat((prev) => [...prev, { role: "bot", content: "❌ 서버 오류. Flask 실행 확인" }]);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") sendQuestion();
  };

  if (loading) return <p>유저 정보를 불러오는 중...</p>;

  return (
    <div className="chat-container">
      <div className="chat-header-center">
        <span className="mbti-type">{mbti}</span>인 <span className="user-nickname">{nickname}</span>님의<br />
        소박한<br />
        <span style={{ fontWeight: "bold", color: "#2196f3" }}>코코 트레이닝 센터</span>
      </div>
      <div className="chat-box" ref={chatBoxRef}>
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`chat-bubble-row ${msg.role === "user" ? "user-row" : "bot-row"}`}
          >
            {msg.role === "bot" && (
              <img src={botAvatar} className="chat-avatar" alt="챗봇" />
            )}
            <div className={`chat-bubble ${msg.role}`}>
              {msg.content}
            </div>
            {msg.role === "user" && (
              <img src={userAvatar} className="chat-avatar" alt="유저" />
            )}
          </div>
        ))}
      </div>
      <div className="input-row">
        <input
          type="text"
          value={question}
          placeholder="건강 관련 질문을 입력하세요"
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKey}
        />
        <button onClick={() => sendQuestion()}>전송</button>
      </div>
    </div>
  );
};

export default ChatBot;
