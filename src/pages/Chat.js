import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import PlaceSlider from "./PlaceSlider"; // PlaceSlider 컴포넌트 가져오기
import './main.css';

function Chat() {
    const [input, setInput] = useState(""); // 입력 메시지 상태
    const [messages, setMessages] = useState([
        {sender: "ai", text: "안녕하세요. TBTI입니다😊"},
    ]); // 초기 AI 메시지
    const [loading, setLoading] = useState(false); // 로딩 상태
    const chatBoxRef = useRef(null); // 채팅 박스에 대한 참조

    const scrollToBottom = () => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight; // 스크롤을 가장 아래로 이동
        }
    };

    const scrollToTop = () => {
        if (chatBoxRef.current) {
            chatBoxRef.current.scrollTo({
                top: 0,
                behavior: "smooth", // 부드러운 스크롤
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!input) return; // 입력이 없으면 반환

        const newMessage = {sender: "user", text: input};
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        // 로딩 시작
        setLoading(true);
        setMessages((prevMessages) => [
            ...prevMessages,
            {sender: "ai", text: "⏳ AI가 응답 중입니다..."} // 로딩 애니메이션으로 "..." 표시
        ]);

        try {
            const res = await fetch("/chat/message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({sender: "user", message: input}),
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

            // 로딩 메시지를 AI 응답으로 대체
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages];
                updatedMessages.pop(); // 마지막 "..." 메시지 제거
                updatedMessages.push({sender: "ai", text: answer}); // AI 응답 추가
                return updatedMessages;
            });

            // 장소 데이터가 있을 경우, 각각을 새로운 메시지로 추가
            if (placesData && placesData.length > 0) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    {sender: "ai", type: "place", placesData: placesData} // 여러 장소 데이터 메시지 추가
                ]);
            }

        } catch (error) {
            console.error("메시지 전송 중 오류 발생:", error);
            const errorMessage = {sender: "ai", text: "서버와의 통신 중 오류가 발생했습니다."};
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages];
                updatedMessages.pop(); // "..." 메시지 제거
                updatedMessages.push(errorMessage);
                return updatedMessages;
            });
        } finally {
            setLoading(false); // 로딩 종료
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

    const handleButtonClick = (buttonText) => {
        // user 쪽 메시지 추가
        setMessages((prevMessages) => [
            ...prevMessages,
            {sender: "user", text: buttonText}
        ]);

        // AI 쪽 메시지 생성
        let responseMessage = "";
        switch (buttonText) {
            case "로컬 크리에이터란?":
                responseMessage = "정부의 지역 활성화 프로젝트로, 지역의 지역환경과 문화적 자산을 소재로 사업적 가치를 창출하도록 하는 지역 개발 정책입니다.";
                break;
            case "지도 검색":
                responseMessage = "왼쪽 지도에서 클릭하여 원하는 지역 별 로컬 크리에이터를 찾을 수 있습니다. 상점을 검색하고 싶다면 검색창에 로컬 크리에이터 명을 입력해주세요.";
                break;
            default:
                responseMessage = "잘못된 요청입니다.";
                break;
        }

        // AI 응답 추가
        setMessages((prevMessages) => [
            ...prevMessages,
            {sender: "ai", text: responseMessage}
        ]);
    };

    return (
        <div className="chat-container">
            <div className="main-header">
                <div className="chat-name" onClick={scrollToTop}>TBTI</div>
            </div>

            <div className="chat-box" ref={chatBoxRef}>
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender}`}>
                        {message.type === "place" ? (
                            <PlaceSlider places={message.placesData} /> // 여러 장소를 슬라이더로 전달
                        ) : message.sender === "ai" ? (
                            <ReactMarkdown>{message.text}</ReactMarkdown>
                        ) : (
                            <div>{message.text}</div>
                        )}
                    </div>
                ))}
            </div>

            <div className="button-group">
                <button className="button" onClick={() => handleButtonClick("로컬 크리에이터란?")}>로컬 크리에이터란?</button>
                <button className="button" onClick={() => handleButtonClick("지도 검색")}>지도 검색</button>
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
