import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import "./login.css";

const Login = () => {
    const [username, setUsername] = useState(""); // 아이디 상태
    const [password, setPassword] = useState(""); // 비밀번호 상태
    const [showPassword, setShowPassword] = useState(false); // 비밀번호 보이기 상태
    const [rememberMe, setRememberMe] = useState(false); // 체크박스 상태
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate

    const handleLogin = async () => {
        // 로그인 로직 (예: API 호출) 추가
        // 김도연 작성
        try{
            const formData = new FormData();

            formData.append('uid', username);
            formData.append('password', password);

            const response = await fetch('http://localhost:8080/login_process', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData,
                withCredentials: true,
                credentials: 'include',
            });

            const result = await response.json();

            result.message === "Login successful" ? navigate("/") : alert("아이디 또는 비밀번호가 일치하지 않습니다.");

        }catch (error){
            console.error('로그인 오류:', error);
        }

    };

    const handleCheckboxChange = () => {
        setRememberMe(!rememberMe);
        if (!rememberMe) {
            localStorage.setItem("username", username); // 아이디 저장
        } else {
            localStorage.removeItem("username"); // 아이디 삭제
        }
    };

    const handleSignUp = () => {
        navigate("/sign"); // 회원가입 페이지로 이동
    };

    // 페이지 로드 시 저장된 아이디를 가져오기
    React.useEffect(() => {
        const savedUsername = localStorage.getItem("username");
        if (savedUsername) {
            setUsername(savedUsername);
            setRememberMe(true); // 체크박스 체크
        }
    }, []);

    return (
        <div className="login">

            {/*<div className="image">*/}
            {/*    <img src="/image/busanimg.jpg" alt="login" />*/}
            {/*</div>*/}

            <div className="loginForm">

                <div className="title">로그인</div>

                <div className="form">
                    <div className="input">아이디</div>
                    <div className="input-field">
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="아이디를 입력하세요."
                        />
                    </div>
                </div>

                <div className="form">
                    <div className="input">비밀번호</div>
                    <div className="input-field">
                        <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="비밀번호를 입력하세요."
                        />
                        <img
                            className="icon"
                            alt="icon"
                            src="/image/see.png"
                            onClick={() => setShowPassword(!showPassword)} // 아이콘 클릭 시 비밀번호 보이기
                        />
                    </div>
                </div>

                <div className="text-button">비밀번호 찾기</div>

                <div className="checkbox">
                    <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={handleCheckboxChange} // 체크박스 상태 변경
                    />
                    <div className="checkbox-text">아이디 저장</div>
                </div>

                <button className="loginButton" onClick={handleLogin}>
                    로그인하기
                </button>

                <button className="signButton" onClick={handleSignUp}>
                    <div className="signText">계정이 없으신가요? 회원가입</div>
                    <img className="signGo" alt="sign" src="/image/right-up.png" />
                </button>

                <p className="footer-text">© 2024 TraBTI. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Login;
