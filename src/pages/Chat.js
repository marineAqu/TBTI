import React, { useState, useRef } from "react";
import PlaceSlider from "./PlaceSlider";
import './main.css';

function Chat() {
    const [input, setInput] = useState(""); // 입력된 메시지를 관리하는 상태
    const [messages, setMessages] = useState([]); // 채팅 메시지들을 관리하는 상태
    const [places, setPlaces] = useState([]); // 장소 정보를 저장하는 상태
    const chatBoxRef = useRef(null); // 채팅 박스에 대한 참조

    const sendMessage = async () => {
        if (!input) return; // 입력된 메시지가 없으면 전송하지 않음

        const newMessage = { sender: "user", text: input };
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        console.log("보낸 메시지:", newMessage);

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
                data = await res.json(); // 서버 응답을 JSON 형식으로 파싱
            } catch (jsonError) {
                console.error("JSON 파싱 오류:", jsonError);
                throw new Error("서버 응답이 올바르지 않습니다.");
            }

            console.log(data); // 파싱된 데이터를 콘솔에 출력

            const answer = data.answer; // AI 응답 메시지
            const placesData = data.place; // 장소 데이터

            console.log(answer); // AI 응답 메시지를 콘솔에 출력
            console.log(placesData); // 장소 데이터를 콘솔에 출력

            // AI 응답 메시지를 메시지 배열에 추가
            const aiMessage = { sender: "ai", text: answer };
            setMessages((prevMessages) => [...prevMessages, aiMessage]);

            // 장소 데이터가 존재할 경우에만 상태 업데이트
            if (placesData && placesData.length > 0) {
                setPlaces(placesData);
            } else {
                setPlaces([]); // 장소 데이터가 없으면 빈 배열로 설정
            }

            // 장소 데이터가 없고 AI 응답 메시지만 있을 경우
            // if (!placesData || placesData.length === 0) {
            //     setMessages((prevMessages) => [
            //         ...prevMessages,
            //         { sender: "ai", text: "장소 정보가 없습니다." },
            //     ]);
            // }

        } catch (error) {
            console.error("메시지 전송 중 오류 발생:", error);
            const errorMessage = { sender: "ai", text: "서버와의 통신 중 오류가 발생했습니다." };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        } finally {
            setInput(""); // 메시지를 전송한 후 입력창을 비움
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (e.shiftKey) {
                setInput((prevInput) => prevInput + "\n"); // Shift+Enter는 줄 바꿈 처리
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
                        {message.text.split('\n').map((line, idx) => (
                            <div key={idx}>{line}</div>
                        ))}
                    </div>
                ))}

                {/* 장소 데이터가 있을 경우 PlaceSlider 컴포넌트를 렌더링 */}
                {places.length > 0 && <PlaceSlider places={places} />}
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
