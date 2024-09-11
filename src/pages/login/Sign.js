import React, { useState } from "react";
import "./login.css";

const Login = () => {
    const [uid, setUid] = useState(""); // 아이디
    const [user_name, setUserName] = useState(""); // 유저 닉네임
    const [phone, setPhone] = useState(""); // 전화번호
    const [email, setEmail] = useState(""); // 이메일
    const [password, setPassword] = useState(""); // 비밀번호
    const [uidCheck, setUidCheck] = useState(""); // 아이디 중복 확인 결과
    const [userNameCheck, setUserNameCheck] = useState(""); // 닉네임 중복 확인 결과

    const checkUidDuplication = async () => {
        const response = await fetch(`/api/uid_duplication?uid=${uid}`);
        const result = await response.json();
        setUidCheck(result.check);
    };

    const checkUsernameDuplication = async () => {
        const response = await fetch(`/api/user_name_duplication?user_name=${user_name}`);
        const result = await response.json();
        setUserNameCheck(result.check);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            uid, // 아이디
            password, // 패스워드
            user_name, // 유저 닉네임
            phone, // 전화번호
            email, // 이메일
        };

        await fetch('/api/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
    };

    return (
        <div className="sign">
            <div className="signForm">
                <form onSubmit={handleSubmit}>
                    <div className="inputInfo">
                        <div className="name">아이디</div>
                        <div className="name-field">
                            <input
                                type="text"
                                className="text"
                                value={uid}
                                onChange={(e) => setUid(e.target.value)}
                                placeholder="아이디를 입력하세요."
                            />
                            <button type="button" onClick={checkUidDuplication}>중복 확인</button>
                        </div>
                        {uidCheck === "fail" && <div className="error-message">아이디가 중복입니다.</div>}
                        {uidCheck === "ok" && <div className="success-message">사용 가능한 아이디입니다.</div>}
                    </div>

                    <div className="inputInfo">
                        <div className="name">닉네임</div>
                        <div className="name-field">
                            <input
                                type="text"
                                className="text"
                                value={user_name}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="닉네임을 입력하세요."
                            />
                            <button type="button" onClick={checkUsernameDuplication}>중복 확인</button>
                        </div>
                        {userNameCheck === "fail" && <div className="error-message">닉네임이 중복입니다.</div>}
                        {userNameCheck === "ok" && <div className="success-message">사용 가능한 닉네임입니다.</div>}
                    </div>

                    <div className="inputInfo">
                        <div className="name">전화번호</div>
                        <div className="name-field">
                            <input
                                type="text"
                                className="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="전화번호를 입력하세요."
                            />
                        </div>
                    </div>

                    <div className="inputInfo">
                        <div className="name">이메일</div>
                        <div className="name-field">
                            <input
                                type="email"
                                className="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="이메일을 입력하세요."
                            />
                        </div>
                    </div>

                    <div className="inputInfo">
                        <div className="name">비밀번호</div>
                        <div className="name-field">
                            <input
                                type="password"
                                className="text"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="비밀번호를 입력하세요."
                            />
                        </div>
                    </div>

                    <button className="loginButton" type="submit">
                        가입하기
                    </button>
                </form>

                <p className="footer-text">© 2024 TraBTI. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Login;
