import React, { useState, useEffect, useRef } from "react";
import "./ChatBot.css";
import { auth, db } from './firebase';   // 로그인/Firestore 연결(없으면 이 부분 제외)
import { doc, getDoc } from 'firebase/firestore';
//import botAvatar from './assets/bot.png';    // 챗봇 이미지 파일 (없으면 emoji 사용)
//import userAvatar from './assets/user.png';  // 유저 이미지 파일 (없으면 emoji 사용)

const ChatBot = () => {
  const [mbti, setMbti] = useState("ISFJ");
  const [nickname, setNickname] = useState("회원");
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(true);
  const chatBoxRef = useRef(null);
  const API_URL = "http://localhost:5000";

  // 유저 닉네임/MBTI Firestore에서 불러오기
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

  // mbti 준비된 후 챗봇 초기 메시지 요청
  useEffect(() => {
    if (!mbti) return;
    (async () => {
      try {
        const res = await fetch(`${API_URL}/ask`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question: "", mbti }),
        });
        if (!res.ok) throw new Error("초기 응답 실패");
        const data = await res.json();
        setChat([{ role: "bot", content: data.answer }]);
      } catch (error) {
        setChat([{ role: "bot", content: "❌ 챗봇 초기 로딩 실패. Flask 서버를 실행 중인지 확인하세요." }]);
      }
    })();
  }, [mbti]);

  // 채팅 스크롤 자동 이동
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chat]);

  const sendQuestion = async () => {
    if (!mbti) return;
    if (!question.trim()) return;
    const userMessage = { role: "user", content: question };
    setChat((prev) => [...prev, userMessage]);
    setQuestion("");

    try {
      const res = await fetch(`${API_URL}/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, mbti }),
      });
      if (!res.ok) throw new Error("서버 응답 실패");
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

  const handleKey = (e) => {
    if (e.key === "Enter") sendQuestion();
  };

  if (loading) return <p>유저 정보를 불러오는 중...</p>;

  return (
    <div className="chat-container">
      {/* 중앙 헤더 */}
      <div className="chat-header-center">
        <span className="mbti-type">{mbti}</span>인 <span className="user-nickname">{nickname}</span>님의<br/>
        소박한<br/>
        <span style={{ fontWeight: "bold", color: "#2196f3" }}>코코 트레이닝 센터</span>
      </div>
      <div className="chat-box" ref={chatBoxRef}>
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`chat-bubble-row ${msg.role === "user" ? "user-row" : "bot-row"}`}
          >
            {msg.role === "bot" && (
              <div className="chat-avatar" style={{background:"#e3e3e3", display:"flex",alignItems:"center",justifyContent:"center",fontSize:"26px",fontWeight:"bold",width:"36px",height:"36px",borderRadius:"50%"}}>🤖</div>
            )}
            <div className={`chat-bubble ${msg.role}`}>
              {msg.content}
            </div>
            {msg.role === "user" && (
              <div className="chat-avatar" style={{background:"#e3e3e3", display:"flex",alignItems:"center",justifyContent:"center",fontSize:"26px",fontWeight:"bold",width:"36px",height:"36px",borderRadius:"50%"}}>🧑</div>
            )}
          {/* 이미지로 바뀌면 위에 지우고 사용
            {msg.role === "bot" && (
              <img src={botAvatar} className="chat-avatar" alt="챗봇" onError={e=>e.target.style.display='none'} />
            )}
            <div className={`chat-bubble ${msg.role}`}>
              {msg.content}
            </div>
            {msg.role === "user" && (
              <img src={userAvatar} className="chat-avatar" alt="유저" onError={e=>e.target.style.display='none'} />
            )}*/}
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
        <button onClick={sendQuestion}>전송</button>
      </div>
    </div>
  );
};

export default ChatBot;
