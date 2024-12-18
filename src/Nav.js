import React, {useState, useRef, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./nav.css";

export const Nav = () => {
    const [searchInput, setSearchInput] = useState("");
    const [filteredRegions, setFilteredRegions] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef(null);
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태 관리

    const regions = [
        "강원특별자치도", "대전광역시", "전라남도", "부산광역시", "서울특별시", "인천광역시",
        "광주광역시", "경상북도", "대구광역시", "제주특별자치도", "충청남도", "충청북도",
        "경상남도", "경기도", "전북특별자치도", "세종특별자치시", "울산광역시"
    ];

    useEffect(() => {
        // 로그인 상태 확인
        const checkLoginStatus = async () => {
            try {
                const response = await fetch('/api/check_login_status');
                const result = await response.json();
                setIsLoggedIn(result.login);

                console.log(isLoggedIn);
            } catch (error) {
                console.error('로그인 상태 확인 오류:', error);
            }
        };

        checkLoginStatus();


    }, []);

    const handleSearch = () => {
        if (searchInput.trim()) {
            const path = regions.includes(searchInput.trim())
                ? `/local?query=${searchInput}`
                : `/search?query=${searchInput}`;
            navigate(path);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (selectedIndex >= 0 && selectedIndex < filteredRegions.length) {
                handleRegionClick(filteredRegions[selectedIndex]);
            } else {
                handleSearch();
            }
        } else if (e.key === 'ArrowDown') {
            setSelectedIndex((prevIndex) =>
                prevIndex < filteredRegions.length - 1 ? prevIndex + 1 : prevIndex
            );
        } else if (e.key === 'ArrowUp') {
            setSelectedIndex((prevIndex) =>
                prevIndex > 0 ? prevIndex - 1 : 0
            );
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchInput(value);

        if (value.trim()) {
            const filtered = regions.filter(region =>
                region.includes(value.trim())
            );
            setFilteredRegions(filtered);
            setSelectedIndex(-1); // 입력 변경 시 선택 인덱스 초기화
        } else {
            setFilteredRegions([]);
        }
    };

    const handleRegionClick = (region) => {
        setSearchInput(region);
        setFilteredRegions([]);
        navigate(`/local?query=${region}`);
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/logout', { method: 'POST' });
            setIsLoggedIn(false);
            window.location.reload(); // 페이지 새로 고침
        } catch (error) {
            console.error('로그아웃 오류:', error);
        }
    };


    return (
        <div className="GNB">
            <div className="LOGO">
                <Link to="/">
                    <img className="logo" alt="logo" src="/image/tbtilogo.jpg"/>
                </Link>
            </div>

            <div className="frame">
                <Link to="/travel" className="text-wrapper">여행 분야</Link>
                <Link to="/domestic" className="text-wrapper">국내 지역</Link>
                <Link to="/festival" className="text-wrapper">지역 축제</Link>

            </div>

            <div className="nav_login">
                {isLoggedIn === true ? (
                    <button onClick={handleLogout} className="text-wrapper-btn">로그아웃</button>
                ) : (
                    <Link to="/login" className="text-wrapper">로그인</Link>
                )}
            </div>

            <div className="group">
                <div className="overlap-group">
                    <input
                        type="text"
                        value={searchInput}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        placeholder="당신의 여행에 로컬을 더하다"
                        ref={inputRef}
                    />
                    <img
                        className="loupe"
                        alt="loupe"
                        src="/image/loupe.png"
                        onClick={handleSearch}
                        style={{cursor: 'pointer'}}
                    />
                </div>
                {filteredRegions.length > 0 && (
                    <div className="suggestions">
                        {filteredRegions.map((region, index) => (
                            <div
                                key={index}
                                className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
                                onClick={() => handleRegionClick(region)}
                                onMouseEnter={() => setSelectedIndex(index)} // 마우스 호버 시 선택 인덱스 업데이트
                            >
                                {region}
                            </div>
                        ))}
                    </div>
                )}

            </div>


        </div>
    );
};