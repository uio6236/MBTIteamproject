// src/ChatBot.jsx
import React, { useState, useEffect } from "react";
import "./ChatBot.css";

const ChatBot = () => {
  const [mbti, setMbti] = useState("ISFJ");
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState([]);

  // ✅ Flask 서버 주소
  const API_URL = "http://localhost:5000";

  const sendQuestion = async () => {
    const userMessage = { role: "user", content: question || "(질문 없이 시작)" };
    setChat((prev) => [...prev, userMessage]);
    setQuestion("");

    try {
      const res = await fetch(`${API_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, mbti }),
      });

      if (!res.ok) {
        throw new Error("서버 응답 실패");
      }

      const data = await res.json();
      const botMessage = { role: "bot", content: data.answer };
      setChat((prev) => [...prev, botMessage]);
    } catch (error) {
      setChat((prev) => [
        ...prev,
        { role: "bot", content: "❌ 서버 오류: 챗봇 응답 실패. Flask 서버가 켜져 있는지 확인하세요." },
      ]);
    }
  };

  useEffect(() => {
    // 페이지 로딩 시 기본 안내 메시지 요청
    (async () => {
      try {
        const res = await fetch(`${API_URL}/ask`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: "", mbti: "ISFJ" }),
        });

        if (!res.ok) {
          throw new Error("초기 응답 실패");
        }

        const data = await res.json();
        setChat([{ role: "bot", content: data.answer }]);
      } catch (error) {
        setChat([{ role: "bot", content: "❌ 챗봇 초기 로딩 실패. Flask 서버를 실행 중인지 확인하세요." }]);
      }
    })();
  }, []);

  const handleKey = (e) => {
    if (e.key === "Enter") sendQuestion();
  };

  return (
    <div className="chat-container">
      <h2>MBTI별 FIT 건강 CHATBOT🌿</h2>
      <label>당신의 MBTI는?</label>
      <select value={mbti} onChange={(e) => setMbti(e.target.value)}>
        {["ISFJ", "ENFP", "INTJ", "ENTP", "INFJ", "INFP", "ESTJ", "ESFP"].map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <div className="chat-box">
        {chat.map((msg, index) => (
          <p key={index}>
            <strong>{msg.role === "user" ? "당신" : "챗봇"}:</strong> {msg.content}
          </p>
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
        <button onClick={sendQuestion}>보내기</button>
      </div>
    </div>
  );
};

export default ChatBot;
