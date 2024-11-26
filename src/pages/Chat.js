import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom"; // useNavigate 가져오기
import PlaceSlider from "./PlaceSlider"; // PlaceSlider 컴포넌트 가져오기
import './main.css';

function Chat() {
    const [input, setInput] = useState(""); // 입력 메시지 상태
    const [messages, setMessages] = useState([
        {sender: "ai", text: "안녕하세요. TBTI입니다😊"},
    ]); // 초기 AI 메시지
    const [loading, setLoading] = useState(false); // 로딩 상태
    const chatBoxRef = useRef(null); // 채팅 박스에 대한 참조
    const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅


    const [userId, setUserId] = useState(null);
    const [tbtiType, setTbtiType] = useState(null);

    useEffect(() => {
        if (tbtiType) {
            console.log("TBTI 타입이 설정되었습니다:", tbtiType);
        }
        const fetchTbtiStatus = async () => {
            try {
                const res = await fetch("/api/tbti_status");
                if (res.ok) {
                    const data = await res.json();
                    console.log("TBTI 상태 데이터:", data);

                    // 상태로 설정
                    setUserId(data.uid);
                    setTbtiType(data.tbtiType);
                } else {
                    console.error("TBTI 상태 가져오기 실패:", res.status);
                }
            } catch (error) {
                console.error("에러 발생:", error);
            }
        };

        fetchTbtiStatus();
    }, [tbtiType]); // 의존성 배열 비어 있음 → 컴포넌트 마운트 시 한 번만 실행



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

        const newMessage = { sender: "user", text: input };
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        setLoading(true);
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "ai", text: "⏳ AI가 응답 중입니다..." }
        ]);

        try {
            const res = await fetch("/chat/message", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId, // 상태로부터 가져온 userId
                    tbtiType, // 상태로부터 가져온 tbtiType
                    message: input
                }),
            });

            console.log("응답 상태:", res.status);
            console.log("전송 데이터:", { userId, tbtiType, message: input });

            if (!res.ok) {
                throw new Error("네트워크 응답이 좋지 않습니다.");
            }

            const data = await res.json();
            console.log("응답 데이터:", data);

            const answer = data.answer;
            const placesData = data.place;

            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages];
                updatedMessages.pop();
                updatedMessages.push({ sender: "ai", text: answer });
                return updatedMessages;
            });

            if (placesData && placesData.length > 0) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { sender: "ai", type: "place", placesData }
                ]);
            }
        } catch (error) {
            console.error("에러 발생:", error);
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages];
                updatedMessages.pop();
                updatedMessages.push({ sender: "ai", text: "서버와의 통신 중 오류가 발생했습니다." });
                return updatedMessages;
            });
        } finally {
            setLoading(false);
            setInput("");
        }
    };


    const handleRestartTest = () => {
        setTbtiType(""); // tbtiType 초기화
        navigate('/tbti-test'); // '/tbti-test'로 이동
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


            <div className="TBTI_TEST">
                {tbtiType ? (
                    <>
                        <p>당신의 여행 유형은 <b>{tbtiType}</b>입니다.</p>
                        <p className="restart" onClick={handleRestartTest}>
                            tbti 테스트 다시하기
                        </p>                    </>
                ) : (
                    <div className="return_tbti"
                         onClick={() => navigate('/tbti-test')}>
                        TBTI 테스트 해보기
                    </div>
                )}

            </div>

            <div className="chat-box" ref={chatBoxRef}>
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender}`}>
                        {message.type === "place" ? (
                            <PlaceSlider places={message.placesData}/> // 여러 장소를 슬라이더로 전달
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


