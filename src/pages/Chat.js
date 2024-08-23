import React, { useState } from "react";
import './main.css'; // 스타일링을 위한 CSS 파일을 가져옵니다.

function Chat() {
    const [input, setInput] = useState(""); // 입력 메시지 상태
    const [messages, setMessages] = useState([]); // 채팅 메시지를 담는 배열

    const sendMessage = async () => {
        if (!input) return; // 빈 메시지를 전송하지 않도록 방지

        // 새로운 메시지 객체 생성
        const newMessage = { sender: "user", text: input }; // sender를 'user'로 변경
        setMessages((prevMessages) => [...prevMessages, newMessage]); // 새로운 메시지를 상태에 추가

        try {
            const res = await fetch("/chat/message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ sender: "user", message: input }), // 메시지 JSON으로 변환
            });

            const data = await res.text(); // 응답 텍스트 받기
            const aiMessage = { sender: "ai", text: data }; // AI 응답 객체 생성
            setMessages((prevMessages) => [...prevMessages, aiMessage]); // AI 응답을 상태에 추가
        } catch (error) {
            console.error("메시지 전송 중 오류 발생:", error);
            const errorMessage = { sender: "ai", text: "서버와의 통신 중 오류가 발생했습니다." };
            setMessages((prevMessages) => [...prevMessages, errorMessage]); // 오류 메시지를 상태에 추가
        } finally {
            setInput(""); // 메시지를 전송한 후 입력창 비우기
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            sendMessage(); // Enter 키로 메시지 전송
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-name">대화제목</div>

            <div className="chat-box">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender}`}>
                        {message.text}
                    </div>
                ))}
            </div>

            <div className="input-box">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="AI에게 물어보세요~"
                />
                <button onClick={sendMessage}>
                    <img src={'./image/send.png'} alt="전송" className="send-icon" />
                </button>
            </div>
        </div>
    );
}

export default Chat;
