import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import './main.css';

function Chat() {
    const [input, setInput] = useState(""); // 입력 메시지 상태
    const [messages, setMessages] = useState([
        { sender: "ai", text: "안녕하세요. TBTI입니다😊" },
    ]); // 초기 AI 메시지
    const [places, setPlaces] = useState([]); // 장소 정보 상태
    const [loading, setLoading] = useState(false); // 로딩 상태
    const [showTBTIButton, setShowTBTIButton] = useState(true); // TBTI 버튼 표시 여부
    const [showCreatorButton, setShowCreatorButton] = useState(true); // 로컬 크리에이터 버튼 표시 여부
    const [showMapButton, setShowMapButton] = useState(true); // 지도 검색 버튼 표시 여부
    const [userStartedChat, setUserStartedChat] = useState(false); // 유저가 대화를 시작했는지 여부
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

        setUserStartedChat(true); // 유저가 대화를 시작했음을 기록

        const newMessage = { sender: "user", text: input };
        setMessages((prevMessages) => [...prevMessages, newMessage]);

        // 로딩 시작
        setLoading(true);
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "ai", text: "⏳ AI가 응답 중입니다..." } // 로딩 애니메이션으로 "..." 표시
        ]);

        // '사용방법'을 입력한 경우 버튼들 다시 보이도록 설정
        if (input === "사용방법") {
            setShowTBTIButton(true);
            setShowCreatorButton(true);
            setShowMapButton(true);
            setUserStartedChat(false); // 사용방법 입력 시 대화 시작 플래그를 초기화
        }

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

            // 로딩 메시지를 AI 응답으로 대체
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages];
                updatedMessages.pop(); // 마지막 "..." 메시지 제거
                updatedMessages.push({ sender: "ai", text: answer }); // AI 응답 추가
                return updatedMessages;
            });

            if (placesData && placesData.length > 0) {
                setPlaces(placesData);
            } else {
                setPlaces([]); // 장소 데이터가 없으면 빈 배열로 설정
            }

        } catch (error) {
            console.error("메시지 전송 중 오류 발생:", error);
            const errorMessage = { sender: "ai", text: "서버와의 통신 중 오류가 발생했습니다." };
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
        setUserStartedChat(true); // 유저가 대화를 시작했음을 기록

        // user 쪽 메시지 추가
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "user", text: buttonText }
        ]);

        // AI 쪽 메시지 생성
        let responseMessage = "";
        switch (buttonText) {
            case "TBTI 테스트":
                responseMessage = "'TBTI 테스트 시작' 을 입력하여 당신의 여행 유형을 알아보세요.\n 4가지 질문으로 이루어져 있으며 AI가 당신의 여행 유형에 맞춰 여행지를 추천해드립니다. ";
                setShowTBTIButton(false); // TBTI 버튼 숨기기
                break;
            case "로컬 크리에이터 찾기":
                responseMessage = "상단의 검색바에서 원하는 로컬 크리에이터를 찾아 정보를 얻어보세요.";
                setShowCreatorButton(false); // 로컬 크리에이터 버튼 숨기기
                break;
            case "지도 검색":
                responseMessage = "왼쪽 지도에서 원하는 지역을 클릭하여 더 많은 로컬크리에이터를 찾을 수 있습니다.";
                setShowMapButton(false); // 지도 검색 버튼 숨기기
                break;
            default:
                responseMessage = "잘못된 요청입니다.";
                break;
        }

        // AI 응답 추가
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: "ai", text: responseMessage }
        ]);
    };

    return (
        <div className="chat-container">
            <div className="main-header">
                <img
                    className="main-arrow"
                    alt="left Arrow"
                    src="/image/left-arrow.png"
                    onClick={() => alert("로그인 상태에서만 이전 대화 기록을 확인할 수 있습니다.")}
                />
                {/* 클릭 시 스크롤 맨 위로 이동 */}
                <div className="chat-name" onClick={scrollToTop}>TBTI</div>
                <img className="main-home" alt="home" src="/image/home.png"/>
            </div>

            <div className="chat-box" ref={chatBoxRef}>
                {/* 기존 메시지 렌더링 */}
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender}`}>
                        {message.sender === "ai" ? (
                            <ReactMarkdown>{message.text}</ReactMarkdown>
                        ) : (
                            <div>{message.text}</div>
                        )}
                    </div>
                ))}

                {/* 유저가 대화를 시작하지 않았거나 '사용방법'을 입력했을 경우 버튼 그룹을 표시 */}
                {!userStartedChat && (
                    <div className="button-group">
                        {showTBTIButton && (
                            <button className="button" onClick={() => handleButtonClick("TBTI 테스트")}>TBTI 테스트</button>
                        )}
                        {showCreatorButton && (
                            <button className="button" onClick={() => handleButtonClick("로컬 크리에이터 찾기")}>로컬 크리에이터 찾기</button>
                        )}
                        {showMapButton && (
                            <button className="button" onClick={() => handleButtonClick("지도 검색")}>지도 검색</button>
                        )}
                    </div>
                )}
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
