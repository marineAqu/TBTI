import React, { useState } from "react";
import './Tbti_test.css';

function TBTITest() {
    // 현재 화면을 관리하는 상태 (초기에는 소개 화면을 표시)
    const [currentStep, setCurrentStep] = useState(-1);
    // 사용자 선택 결과를 저장할 상태
    const [answers, setAnswers] = useState({});

    // 질문 데이터
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
        "A": "자유로운 매",
        "I": "신중한 올빼미",
        "E": "질주하는 치타",
        "U": "고독한 늑대",
        "C": "활기찬 원숭이",
        "S": "체계적인 비버",
        "F": "사교적인 돌고래",
        "P": "충직한 개",
        "D": "호기심 많은 고양이",
        "G": "느긋한 거북이",
        "L": "은밀한 스라소니",
        "B": "신뢰받는 곰",
        "M": "유쾌한 팬더",
        "H": "현명한 코끼리",
        "R": "유연한 여우",
        "T": "협력적인 펭귄",
    };

    // 결과 페이지에서 결과를 보여주는 함수
    const getResult = () => {
        const result = Object.values(answers).join(""); // 사용자가 선택한 답을 이어 붙인 값
        if (result.length === 4) {
            // 결과를 매핑하여 반환
            const resultText = result.split("").map(value => resultMapping[value]).join(", ");
            return `당신의 결과는 ${resultText} 입니다!`;
        } else {
            return "모든 질문을 완료해주세요.";
        }
    };

    // 사용자 선택 처리
    const handleAnswer = (value) => {
        setAnswers((prev) => ({
            ...prev,
            [currentStep]: value,
        }));

        // 다음 질문으로 진행
        if (currentStep < questions.length - 1) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    // 테스트 시작하기
    const startTest = () => {
        setCurrentStep(0); // 첫 번째 질문으로 이동
    };

    // 테스트 다시 시작
    const restartTest = () => {
        setCurrentStep(-1); // 초기 화면으로 이동
        setAnswers({});
    };

    return (
        <div className="tbti-container">
            {/* 배너 영역 */}
            <div className="banner">
                <img className="arrow" alt="left Arrow" src="/image/left-arrow.png" />
                이전으로 돌아가기
            </div>

            {/* 소개 화면 */}
            {currentStep === -1 ? (
                <div className="content-container">
                    <h1 className="main-title">TBTI 테스트</h1>
                    <p className="description">
                        지금 바로 나만의 여행 부캐를 찾아보세요!
                    </p>
                    <div className="start-button-container">
                        <button className="start-button" onClick={startTest}>
                            테스트 시작하기
                        </button>
                    </div>
                </div>
            ) : currentStep < questions.length ? (
                // 질문 표시 화면
                <div className="content-container">
                    <p className="description">{questions[currentStep].question}</p>
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
                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                />
                                {option.text}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                // 결과 페이지 로직
                <div className="content-container">
                    <p className="description">{getResult()}</p>
                    <div className="start-button-container">
                        <button className="start-button" onClick={restartTest}>
                            테스트 다시하기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TBTITest;
