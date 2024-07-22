import React from "react";
import {Link} from "react-router-dom";
import "./nav.css";

export const Nav = () => {
    return (
        <div className="GNB">

            <div className="LOGO">

                <Link to="/detail">
                <img className="logo" alt="logo" src="/image/logo.png" />
                </Link>

            </div>

            <div className="frame">
                <Link to="/travel" className="text-wrapper">여행 분야</Link>
                <Link to="/domestic" className="text-wrapper">국내 지역</Link>
                <Link to="/festival" className="text-wrapper">지역 축제</Link>
            </div>

            <div className="group">
                <div className="overlap-group">
                    <img className="loupe" alt="loupe" src="/image/loupe.png" />
                </div>
            </div>

            <div className="div-wrapper">
                <Link to="/login" className="text-wrapper">로그인</Link>
            </div>

        </div>
    );
};
