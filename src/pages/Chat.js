import React, { useState, useRef } from "react";
import PlaceSlider from "./PlaceSlider"; // PlaceSlider 컴포넌트 추가
import './main.css';

function Chat() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [places, setPlaces] = useState([]); // 장소 정보를 저장할 상태 추가
    const chatBoxRef = useRef(null);

    const sendMessage = async () => {
        if (!input) return; // 빈 메시지를 전송하지 않도록 방지

        // 새로운 메시지 객체 생성
        const newMessage = { sender: "user", text: input };
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        console.log("보낸 메시지:", newMessage); // 사용자가 보낸 메시지 콘솔에 출력


        try { //서버에 메시지 전송
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

            const data = await res.json(); // AI의 응답 텍스트 받기
            // const text = await res.text();
            // const data = JSON.parse(text);
            console.log(data)


            const answer = data.answer; //ai 답변
            const placesData = data.place; // 장소 데이터 저장

            console.log(answer)
            console.log(placesData)

            //ai 응답 메시지를 메시지 배열에 추가
            const aiMessage = { sender: "ai", text: answer };
            setMessages((prevMessages) => [...prevMessages, aiMessage]);

            // place가 null 일 때,
            if (placesData && placesData.length > 0) {
                setPlaces(placesData);
            } else {
                setPlaces([]); // 장소가 없을 경우 빈 배열로 설정
            }

        } catch (error) {
            console.error("메시지 전송 중 오류 발생:", error);
            const errorMessage = { sender: "ai", text: "서버와의 통신 중 오류가 발생했습니다." };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        } finally {
            setInput(""); // 메시지를 전송한 후 입력창 비우기
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            if (e.shiftKey) {
                setInput((prevInput) => prevInput + "\n");
            } else {
                e.preventDefault();
                sendMessage();
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

                {/* 장소가 있을 경우 PlaceSlider 컴포넌트 렌더링 */}
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
