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
    const [tbtiType, setTbtiType] = useState(null); // TBTI 타입 상태

    useEffect(() => {
        const fetchTbtiStatus = async () => {
            try {
                const res = await fetch("/api/tbti_status");
                if (res.ok) {
                    const data = await res.json();
                    console.log("TBTI 상태 데이터:", data); // 데이터를 콘솔에 출력
                    setTbtiType(data.tbtitype || null); // TBTI 타입 설정
                } else {
                    console.error("TBTI 상태 가져오기 실패:", res.status);
                }
            } catch (error) {
                console.error("에러 발생:", error);
            }
        };

        // 비동기적으로 데이터를 처리하되, 동기적인 흐름처럼 기다리게 함
        (async () => {
            await fetchTbtiStatus(); // fetchTbtiStatus 함수 비동기 호출
            console.log("TBTI 타입:", tbtiType); // tbtiType 값이 잘 설정되었는지 확인
        })();
    }, []);




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

        // 로딩 시작
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
                body: JSON.stringify({ sender: "user", message: input }),
            });

            console.log("응답 상태:", res.status); // 상태 코드 출력

            if (!res.ok) {
                throw new Error("네트워크 응답이 좋지 않습니다.");
            }

            const data = await res.json(); // 서버 응답을 JSON으로 변환
            console.log("응답 데이터:", data); // 응답 데이터 출력

            const answer = data.answer;
            const placesData = data.place;

            // 로딩 메시지를 AI 응답으로 대체
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages];
                updatedMessages.pop(); // 마지막 "..." 메시지 제거
                updatedMessages.push({ sender: "ai", text: answer });
                return updatedMessages;
            });

            if (placesData && placesData.length > 0) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { sender: "ai", type: "place", placesData: placesData }
                ]);
            }

        } catch (error) {
            console.error("에러 발생:", error); // 에러 출력
            setMessages((prevMessages) => {
                const updatedMessages = [...prevMessages];
                updatedMessages.pop(); // "..." 메시지 제거
                updatedMessages.push({ sender: "ai", text: "서버와의 통신 중 오류가 발생했습니다." });
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

            <div className="TBTI_TEST">
                {tbtiType && (
                    <p>당신의 여행 유형은 <b>{tbtiType}</b>입니다.</p>
                )}
            </div>

            {/*<div className="TBTI_TEST">*/}
            {/*    {tbtiType ? (*/}
            {/*        <>*/}
            {/*            <p>당신의 여행 유형은 <b>{tbtiType}</b>입니다.</p>*/}
            {/*            <button onClick={() => navigate('/tbti-test')}>tbti 테스트 다시하기</button>*/}
            {/*        </>*/}
            {/*    ) : (*/}
            {/*        <div onClick={() => navigate('/tbti-test')}>*/}
            {/*            TBTI 테스트 해보기*/}
            {/*        </div>*/}
            {/*    )}*/}

            {/*</div>*/}

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
