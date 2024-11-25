import React, { useState, useEffect } from "react";
import axios from "axios";
import './Tbti_test.css';

function TBTITest() {
    const [currentStep, setCurrentStep] = useState(-1); // 현재 단계
    const [answers, setAnswers] = useState({}); // 사용자의 답변
    const [userStatus, setUserStatus] = useState(null); // 로그인 상태 확인
    const [error, setError] = useState(null); // 에러 메시지
    const [resultData, setResultData] = useState(null); // 최종 결과 상태


    useEffect(() => {
        axios.get("api/tbti_status", { withCredentials: true })
            .then((response) => {
                setUserStatus(response.data); // { login: true/false }
            })
            .catch((err) => {
                setError("로그인 상태 확인 중 오류가 발생했습니다.");
            });
    }, []);

    const questions = [
        {
            question: "여행 중 어떤 활동을 선호하나요?",
            options: [
                { text: "활동적, 모험적인 경험", value: "A", img: "/image/test/camping.png" },
                { text: "차분하게 휴식과 여유", value: "C", img: "/image/test/coffee.png" },
            ],
        },
        {
            question: "혼자 여행하는 것과 함께 여행하는 것 중 어느 쪽을 선호하나요?",
            options: [
                { text: "혼자", value: "I", img: "/image/test/tour-guide.png" },
                { text: "친구나 가족과 함께", value: "S", img: "/image/test/friends.png" },
            ],
        },
        {
            question: "여행 시 이동수단으로 무엇을 선호하시나요?",
            options: [
                { text: "대중교통", value: "E", img: "/image/test/public-transport.png" },
                { text: "자차", value: "F", img: "/image/test/car.png" },
            ],
        },
        {
            question: "여행 중 즉흥적으로 일정을 바꾸는 걸 선호하나요?",
            options: [
                { text: "즉흥적인 변화가 좋아요", value: "U", img: "/image/test/clock.png" },
                { text: "미리 계획한 대로 진행하고 싶어요", value: "P", img: "/image/test/task.png" },
            ],
        },
    ];

    // 동물 결과
    const resultMapping = {
        "AIEU": {
            name: "자유로운 매 (Hawk)",
            description: "혼자서도 활동적으로 새로운 곳을 탐험하며, 즉흥적으로 일정을 바꾸는 자유로운 여행자.",
            img: "/image/card/Hawk.png"
        },
        "AIEP": {
            name: "신중한 올빼미 (Owl)",
            description: "계획적으로 혼자만의 여정을 즐기며, 조용히 여행지를 탐구하는 신중한 여행자.",
            img: "/image/card/Owl.png"
        },
        "AIFU": {
            name: "질주하는 치타 (Cheetah)",
            description: "자차로 빠르게 이동하며, 모험적이고 즉흥적인 여행을 즐기는 역동적인 여행자.",
            img: "/image/card/Cheetah.png"
        },
        "AIFP": {
            name: "고독한 늑대 (Wolf)",
            description: "자차를 이용해 혼자 여행하며, 계획적으로 새로운 장소를 찾아가는 독립적인 여행자.",
            img: "/image/card/Wolf.png"
        },
        "ASEU": {
            name: "활기찬 원숭이 (Monkey)",
            description: "친구나 가족과 함께 활발하게 움직이며, 대중교통을 이용해 즉흥적으로 새로운 경험을 즐기는 여행자.",
            img: "/image/card/Monkey.png"
        },
        "ASEP": {
            name: "체계적인 비버 (Beaver)",
            description: "친구나 가족과 함께하며, 대중교통을 이용해 세심하게 계획된 일정을 즐기는 여행자.",
            img: "/image/card/Beaver.png"
        },
        "ASFU": {
            name: "사교적인 돌고래 (Dolphin)",
            description: "가족이나 친구들과 활동적으로 자차를 이용해 유연하게 이동하며, 즉흥적으로 주변과 어울리는 사교적인 여행자.",
            img: "/image/card/Dolphin.png"
        },
        "ASFP": {
            name: "충직한 개 (Dog)",
            description: "자차로 가족이나 친구들과 함께 여행하며, 철저히 계획된 일정을 따르는 믿음직한 여행자.",
            img: "/image/card/Dog.png"
        },
        "CIEU": {
            name: "호기심 많은 고양이 (Cat)",
            description: "혼자서 대중교통을 이용하며, 여유로운 일정 속에서 즉흥적인 순간을 즐기는 여행자.",
            img: "/image/card/Cat.png"
        },
        "CIEP": {
            name: "느긋한 거북이 (Turtle)",
            description: "혼자 대중교통을 이용하며, 차분하고 세심하게 계획된 여정을 즐기는 느긋한 여행자.",
            img: "/image/card/Turtle.png"
        },
        "CIFU": {
            name: "은밀한 스라소니 (Lynx)",
            description: "자차로 혼자만의 시간을 즐기며, 즉흥적인 감각으로 여행지를 탐색하는 차분한 여행자.",
            img: "/image/card/Lynx.png"
        },
        "CIFP": {
            name: "신뢰받는 곰 (Bear)",
            description: "자차를 이용해 혼자 여행하며, 안정감 있는 계획으로 여유로운 여행을 즐기는 독립적인 여행자.",
            img: "/image/card/Bear.png"
        },
        "CSEU": {
            name: "유쾌한 팬더 (Panda)",
            description: "친구나 가족과 함께 대중교통으로 이동하며, 느긋하고 즉흥적으로 여정을 즐기는 유쾌한 여행자.",
            img: "/image/card/Panda.png"
        },
        "CSEP": {
            name: "현명한 코끼리 (Elephant)",
            description: "친구나 가족과 함께 대중교통을 이용하며, 계획적이고 차분하게 여행을 즐기는 믿음직한 여행자.",
            img: "/image/card/Elephant.png"
        },
        "CSFU": {
            name: "유연한 여우 (Fox)",
            description: "자차를 이용해 가족이나 친구들과 함께하며, 즉흥적으로 변화를 즐기는 영리한 여행자.",
            img: "/image/card/Fox.png"
        },
        "CSFP": {
            name: "협력적인 펭귄 (Penguin)",
            description: "자차를 이용해 친구나 가족과 함께하며, 체계적이고 협력적으로 여행을 계획하는 차분한 여행자.",
            img: "/image/card/Penguin.png"
        },
    };

    const getResult = () => {
        const result = Object.values(answers).join(""); // 사용자 답변 조합

        if (result.length !== 4) {
            setError("모든 질문에 답변을 완료해주세요.");
            return null;
        }

        const resultData = resultMapping[result]; // 결과 매핑 데이터 가져오기

        if (resultData) {
            axios.post("api/save_tbti", { tbtitype: result })
                .then(() => {
                    console.log("TBTI 결과 저장 성공");
                })
                .catch((err) => {
                    console.error("TBTI 결과 저장 중 오류:", err);
                    setError(`TBTI 결과 저장 중 오류가 발생했습니다.`);
                });


            return resultData; // 이름, 설명, 이미지 포함된 결과 데이터 반환
        } else {
            setError("결과를 찾을 수 없습니다.");
            return {
                name: "결과를 찾을 수 없습니다.",
                description: "해당 조합에 맞는 결과가 없습니다.",
            };
        }
    };



    const handleAnswer = (value) => {
        // 답변 저장
        setAnswers((prev) => {
            const updatedAnswers = { ...prev, [currentStep]: value }; // 현재 단계의 답변 저장

            // 마지막 질문인지 확인
            if (currentStep === questions.length - 1) {
                console.log("All questions answered!");
                const result = calculateResult(updatedAnswers); // 결과 계산
                setResultData(result); // 결과 저장
            } else {
                setCurrentStep((prevStep) => prevStep + 1); // 다음 단계로 이동
            }

            return updatedAnswers; // 상태 업데이트
        });
    };

// calculateResult 함수 내에서 콘솔 출력 추가
    const calculateResult = async (answers) => {
        const result = Object.values(answers).join(""); // 사용자 답변 조합
        const resultData = resultMapping[result]; // 결과 매핑 데이터 가져오기
        console.log("Mapped Result Data:", resultData); // 매핑된 데이터 확인

        if (result.length === 4 && resultData) {
            try {
                console.log("Sending Data to API:", { tbtitype: result });

                const response = await fetch("api/save_tbti", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json", // JSON 형식으로 데이터 전송
                    },
                    body: JSON.stringify({ tbtitype: result }), // 결과 데이터 JSON으로 변환
                });

                if (!response.ok) {
                    // 서버의 응답이 실패한 경우
                    const errorText = await response.text();
                    console.error("Error response from server:", errorText);
                    setError("TBTI 결과 저장 중 오류가 발생했습니다.");
                } else {
                    console.log("TBTI 결과 저장 성공");
                }
            } catch (error) {
                console.error("Request failed", error);
                setError("TBTI 결과 저장 중 오류가 발생했습니다.");
            }

            return resultData; // 이름, 설명, 이미지 포함된 결과 데이터 반환
        } else {
            return {
                name: "결과를 찾을 수 없습니다.",
                description: "모든 질문에 답변을 완료해주세요.",
            };
        }
    };


    const startTest = () => {
        setCurrentStep(0);
    };

    const restartTest = () => {
        setCurrentStep(-1);
        setAnswers({});
        setError(null);
    };

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (userStatus?.login === false) {
        return <div className="login-warning">로그인이 필요합니다. 로그인 후 다시 시도해주세요.</div>;
    }

    return (
        <div className="tbti-container">
            {/* 상단 배너 */}
            <div className="banner">
                <img className="arrow" alt="left Arrow" src="/image/left-arrow.png" />
                이전으로 돌아가기
            </div>

            {/* 초기 화면 */}
            {currentStep === -1 ? (
                <div className="content-container">
                    <h1 className="main-title">TBTI 테스트</h1>
                    <p className="tbti_description">지금 바로 나만의 여행 부캐를 찾아보세요!</p>
                    <div className="start-button-container">
                        <button className="start-button" onClick={startTest}>
                            테스트 시작하기
                        </button>
                    </div>
                </div>
            ) : currentStep < questions.length ? (
                // 질문 화면
                <div className="content-container">
                    <p className="tbti_description">{questions[currentStep].question}</p>
                    <div className="start-button-container">
                        {questions[currentStep].options.map((option, index) => (
                            <button
                                key={index}
                                className="start-button"
                                onClick={() => handleAnswer(option.value)}
                            >
                                <img
                                    src={option.img}
                                    alt={option.text}
                                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                />
                                {option.text}
                            </button>
                        ))}
                    </div>
                </div>
            ) : resultData ? (
                // 결과 화면
                <div className="result-container">
                    <h1 className="result-title">{resultData.name}</h1>
                    <img
                        className="result-image"
                        src={resultData.img}
                        alt={resultData.name}
                        style={{ width: "200px", height: "200px", objectFit: "cover" }}
                    />
                    <p className="result-description">{resultData.description}</p>
                    <button className="restart-button" onClick={restartTest}>
                        테스트 다시하기
                    </button>
                </div>
            ) : (
                // 오류 화면
                <p>결과를 불러오는 데 문제가 발생했습니다.</p>
            )}
        </div>
    );


}

export default TBTITest;
