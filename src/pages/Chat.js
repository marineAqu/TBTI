import React, { useState, useRef } from "react";
import PlaceSlider from "./PlaceSlider";
import ReactMarkdown from "react-markdown";
import './main.css';

function Chat() {
    const [input, setInput] = useState(""); // 입력 메시지 상태
    const [messages, setMessages] = useState([]); // 채팅 메시지 상태
    const [places, setPlaces] = useState([]); // 장소 정보 상태
    const chatBoxRef = useRef(null); // 채팅 박스에 대한 참조

    const scrollToBottom = () => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight; // 스크롤을 가장 아래로 이동
        }
    };

    const sendMessage = async () => {
        if (!input) return; // 입력이 없으면 반환

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

            if (!res.ok) {
                throw new Error('네트워크 응답이 좋지 않습니다.');
            }

            let data;
            try {
                data = await res.json(); // 서버 응답을 JSON으로 변환
            } catch (jsonError) {
                console.error("JSON 파싱 오류:", jsonError);
                throw new Error("서버 응답이 올바르지 않습니다.");
            }

            const answer = data.answer; // AI의 응답
            const placesData = data.place; // 장소 데이터

            const aiMessage = { sender: "ai", text: answer };
            setMessages((prevMessages) => [...prevMessages, aiMessage]);
            scrollToBottom(); // 새 메시지가 추가된 후 스크롤

            if (placesData && placesData.length > 0) {
                setPlaces(placesData);
                scrollToBottom(); // 장소가 업데이트된 후 스크롤
            } else {
                setPlaces([]); // 장소 데이터가 없으면 빈 배열로 설정
            }

        } catch (error) {
            console.error("메시지 전송 중 오류 발생:", error);
            const errorMessage = { sender: "ai", text: "서버와의 통신 중 오류가 발생했습니다." };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
            scrollToBottom(); // 오류 발생 시에도 스크롤
        } finally {
            setInput(""); // 입력창 비우기
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (e.shiftKey) {
                setInput((prevInput) => prevInput + "\n"); // Shift+Enter로 줄 바꿈
            } else {
                e.preventDefault();
                sendMessage(); // Enter 키로 메시지 전송
            }
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-name">대화제목</div>

            <div className="chat-box" ref={chatBoxRef}>
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender}`}>
                        {/* Conditionally render ReactMarkdown for AI messages only */}
                        {message.sender === "ai" ? (
                            <ReactMarkdown>{message.text}</ReactMarkdown>
                        ) : (
                            <div>{message.text}</div>
                        )}
                    </div>
                ))}

                {/* 장소 데이터가 있을 경우 PlaceSlider 컴포넌트를 렌더링 */}
                {places.length > 0 && <PlaceSlider places={places}/>}
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
                    style={{resize: 'none'}}
                />
                <button onClick={sendMessage}>
                    <img src={'./image/send.png'} alt="전송" className="send-icon"/>
                </button>
            </div>
        </div>
    );
}

export default Chat;
