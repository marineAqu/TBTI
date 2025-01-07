import React from "react";
import "./login.css";

const Mypage = () => {
    return (
        <div className="mypage-container">
            <h1 className="mypage-title">마이페이지</h1>

            {/* Profile Section */}
            <div className="profile-section">
                <img
                    // src="https://via.placeholder.com/100"
                    alt="프로필 사진"
                    className="profile-image"
                />
                <div className="profile-info">
                    <h2>홍길동</h2>
                    <p>email@example.com</p>
                </div>
            </div>

            {/* My Information Section */}
            <div className="info-section">
                <h3>내 정보</h3>
                <p>가입일: 2023-01-01</p>
                <p>멤버십: 일반 회원</p>
            </div>

            {/* Links Section */}
            <div className="links-section">
                <h3>유용한 링크</h3>
                <ul className="links-list">
                    <li><a href="/settings" className="link-item">설정</a></li>
                    <li><a href="/orders" className="link-item">주문 내역</a></li>
                    <li><a href="/help" className="link-item">고객 지원</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Mypage;
