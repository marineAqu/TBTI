import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './main.css';

const Domestic = () => {
    // tbtiType 상태 정의
    const [tbtiType, setTbtiType] = useState(null);
    const navigate = useNavigate(); // navigate 훅 사용

    // 컴포넌트가 처음 렌더링될 때마다 최신 데이터 요청
    useEffect(() => {
        const fetchTbtiStatus = async () => {
            try {
                const res = await fetch("/api/tbti_status");
                if (res.ok) {
                    const data = await res.json();
                    console.log("TBTI 상태 데이터:", data); // 데이터를 콘솔에 출력
                    console.log(data.tbtiType)
                    setTbtiType(data.tbtiType || null); // TBTI 타입 설정
                } else {
                    console.error("TBTI 상태 가져오기 실패:", res.status);
                }
            } catch (error) {
                console.error("에러 발생:", error);
            }
        };

        fetchTbtiStatus(); // 데이터 fetch 호출
    }, []); // 빈 배열을 전달하면 컴포넌트가 처음 렌더링될 때만 호출됨

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

    const result = tbtiType ? resultMapping[tbtiType] : null;

    return (
        <div>
            {result ? (
                <div className="animal_result">
                    <h1>당신은 {result.name} 입니다</h1>
                    <p>{result.description}</p>
                    <img src={result.img} alt={result.name} />
                    <div className="buttons">
                        {/* 채팅으로 돌아가기 버튼 */}
                        <button onClick={() => navigate('/')}>채팅으로 돌아가기</button>
                        {/* 다시 테스트하기 버튼 */}
                        <button onClick={() => navigate('/tbti-test')}>다시 테스트하기</button>
                    </div>
                </div>
            ) : (
                <p>당신의 TBTI 결과를 불러오는 중입니다...</p>
            )}
        </div>
    );
};

export default Domestic;
