import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./nav.css";

export const Nav = () => {
    const [searchInput, setSearchInput] = useState("");
    const [addressCategory1, setAddressCategory1] = useState(""); // 새로운 상태 추가
    const [searchType, setSearchType] = useState("search"); // 검색 타입 상태 추가
    const navigate = useNavigate();

    const handleSearch = () => {
        if (searchInput.trim()) {
            const path = searchType === "search"
                ? `/search?query=${searchInput}`
                : `/search?query=${addressCategory1}`;
            navigate(path);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="GNB">

            <div className="LOGO">
                <Link to="/main">
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
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="검색어를 입력하세요"
                    />
                    <img
                        className="loupe"
                        alt="loupe"
                        src="/image/loupe.png"
                        onClick={handleSearch}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
                {/*<select*/}
                {/*    value={searchType}*/}
                {/*    onChange={(e) => setSearchType(e.target.value)}*/}
                {/*    className="search-type-selector"*/}
                {/*>*/}
                {/*    <option value="search">검색</option>*/}
                {/*    <option value="local">지역 검색</option>*/}
                {/*</select>*/}
            </div>

            <div className="div-wrapper">
                <Link to="/login" className="text-wrapper">로그인</Link>
            </div>

        </div>
    );
};
