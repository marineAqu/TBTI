import React, { useState, useRef, useEffect } from "react";
import './main.css';
import { data } from './data';

function Chat() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const chatBoxRef = useRef(null);
    const cardContainerRef = useRef(null);

    useEffect(() => { // 새 메시지가 추가될 때마다 아래로 이동
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = async () => {
        if (!input) return; // 빈 메시지 보내지 않기

        const newMessage = { sender: "user", text: input };
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        try {
            const res = await fetch("/chat/message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ sender: "user", message: input }),
            });

            const data = await res.text(); // 응답 텍스트 받기
            const aiMessage = { sender: "ai", text: data }; // AI 응답 객체 생성
            setMessages((prevMessages) => [...prevMessages, aiMessage]);
        } catch (error) {
            console.error("메시지 전송 중 오류 발생:", error);
            const errorMessage = { sender: "ai", text: "서버와의 통신 중 오류가 발생했습니다." };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        } finally {
            setInput("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (e.shiftKey) { // shift + enter = 줄 바꿈
                setInput((prevInput) => prevInput + "\n");
            } else {
                e.preventDefault();
                sendMessage(); // enter 키로 메시지 전송
            }
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-name">대화제목</div>

            <div className="chat-box" ref={chatBoxRef}>
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender}`}>
                        {message.text.split('\n').map((line, idx) => (
                            <div key={idx}>{line}</div>
                        ))}
                    </div>
                ))}
            </div>



            <div className="card-section">
                <div className="card-container" ref={cardContainerRef}>
                    {data.place.map((place, index) => (
                        <div key={index} className="card">
                            <div className="placeName">{place.place_name}</div>
                            <div className="location">{place.location}</div>
                            <div className="category">{place.category}</div>
                            <div className="description">{place.description}</div>
                            <div className="descriptionURL">
                                <a href={place.redirection_url} target="_blank" rel="noopener noreferrer">
                                    링크
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="introduce">
                <button className="introduce-button">사용방법1</button>
                <button className="introduce-button">사용방법2</button>
                <button className="introduce-button">사용방법3</button>
            </div>

            <div className="input-box">
                <textarea
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="AI에게 물어보세요~"
                    style={{ resize: 'none' }}
                />
                <button onClick={sendMessage}>
                    <img src={'./image/send.png'} alt="전송" className="send-icon" />
                </button>
            </div>
        </div>
    );
}

export default Chat;
