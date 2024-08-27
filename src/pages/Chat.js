import React, { useState, useRef, useEffect } from "react";
import './main.css';

function Chat() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([]);
    const [places, setPlaces] = useState([]); // 여행지 데이터 상태
    const [itinerary, setItinerary] = useState(""); // 여행 일정 상태
    const [reservationMessage, setReservationMessage] = useState(""); // 예약 메시지 상태
    const chatBoxRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8001`);
                const result = await response.json();

                // 응답 처리
                const responseData = JSON.parse(result.response); // JSON 문자열을 객체로 변환

                // 각 경우에 따라 상태 업데이트
                if (responseData.answer) {
                    // 여행지 추천일 경우
                    if (responseData.place) {
                        setPlaces(responseData.place);
                    } else {
                        setItinerary(responseData.answer);
                    }
                } else {
                    // 예약 리다이렉션일 경우
                    setReservationMessage(responseData.answer);
                    setPlaces(responseData.place);
                }

            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, []); // 컴포넌트가 마운트될 때 한 번 실행

    useEffect(() => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = async () => {
        if (!input) return;

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

            const data = await res.text();
            const aiMessage = { sender: "ai", text: data };
            setMessages((prevMessages) => [...prevMessages, aiMessage]);
        } catch (error) {
            console.error("Error sending message:", error);
            const errorMessage = { sender: "ai", text: "서버와의 통신 중 오류가 발생했습니다." };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        } finally {
            setInput("");
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
            </div>

            {/* 여행지 추천 또는 여행 일정 또는 예약 출력 섹션 */}
            <div className="card-section">
                <div className="card-container">
                    {/* 여행지 추천일 경우 */}
                    {places.length > 0 && !itinerary && !reservationMessage && (
                        places.map((place, index) => (
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
                        ))
                    )}

                    {/* 여행 일정일 경우 */}
                    {itinerary && (
                        <div className="itinerary">
                            <h3>여행 일정:</h3>
                            <div dangerouslySetInnerHTML={{ __html: itinerary }} />
                        </div>
                    )}

                    {/* 예약 리다이렉션일 경우 */}
                    {reservationMessage && (
                        <div className="reservation">
                            <p>{reservationMessage}</p>
                            {places.map((place, index) => (
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
                    )}
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
