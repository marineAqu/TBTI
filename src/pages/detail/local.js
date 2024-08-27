//지역검색페이지
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import "./detail.css";
import CanvasMap from './Canvas';

const LocalSearch = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [regionName, setRegionName] = useState("");
    const [regionIntro, setRegionIntro] = useState("");
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [page, setPage] = useState(1);
    const [viewMode, setViewMode] = useState('info');
    const [showDescription, setShowDescription] = useState(false); // 소개글 표시 상태 추가

    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search).get('query');

    const regions = ["강원특별자치도", "대전광역시", "전라남도", "부산광역시", "서울특별시", "인천광역시", "광주광역시", "경상북도", "대구광역시", "제주특별자치도", "충청남도", "충청북도", "경상남도", "경기도", "전북특별자치도", "세종특별자치시", "울산광역시"];

    useEffect(() => {
        const fetchData = async () => {
            if (query) {
                try {
                    const addCategory = regions.indexOf(query);
                    let response = null;

                    console.log("addcategory: "+addCategory);
                    if(addCategory === -1){
                        response = await fetch(`/api/search_add2region?region=${query}`);
                    }
                    else{
                        response = await fetch(`/api/search_region?addCategory=${addCategory + 1}`);
                    }


                    const result = await response.json();

                    setData(result.localList);
                    setRegionName(query);
                    setRegionIntro(result.domInt || "소개 정보 없음");

                    const uniqueCategories = [...new Set(result.localList.map(store => store.category))];
                    setCategories(uniqueCategories);

                    setFilteredData(result.localList);
                    setPage(1);
                } catch (error) {
                    console.error('데이터 가져오기 오류:', error);
                    alert('데이터를 가져오는 데 문제가 발생했습니다.');
                }
            }
        };

        fetchData();
    }, [query]);

    useEffect(() => {
        if (selectedCategory) {
            const filtered = data.filter(store => store.category === selectedCategory);
            setFilteredData(filtered);
        } else {
            setFilteredData(data);
        }
        setPage(1);
    }, [selectedCategory, data]);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setPage(1);
    };

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleBoxClick = (storeId) => {
        navigate(`/detail/${storeId}`);
    };

    const handleViewModeChange = () => {
        setViewMode((prevMode) => (prevMode === 'map' ? 'info' : 'map'));
        if (viewMode === 'map') {
            setViewMode('default');
            setShowDescription(false); // '지도 보기 해제'를 누르면 소개글을 표시
        } else {
            setViewMode('map');
            setShowDescription(true); // '지도 보기'를 누르면 소개글을 숨김
        }
    };

    const handleRegionClick = (region) => {
        setRegionName(region); // 클릭된 지역 이름을 설정
        // 필요한 경우 해당 지역에 대해 추가 데이터를 가져오는 로직을 작성
    };


    const itemsPerPage = 9;
    const startIndex = (page - 1) * itemsPerPage;
    const displayedData = filteredData.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <div className={`container ${viewMode === 'map' ? 'map-active' : ''}`}>

            <div className="region-container">
                <div className="region">
                    <h1>{regionName}</h1>
                    <p>{regionIntro}</p>
                </div>

                <div className="view-toggle">
                    <button onClick={handleViewModeChange}>
                        {viewMode === 'map' ? '지도 보기 해제' : '지도 보기'}
                    </button>
                </div>

                {showDescription && (
                    <div className="bubble">
                        각 지역을 선택하면 해당 지역의 가게들만 보입니다.
                    </div>
                )}



            </div>

            <div className={`map-container ${viewMode === 'map' ? 'visible' : ''}`}>
                {viewMode === 'map' && (
                    <CanvasMap onRegionClick={handleRegionClick}/> // CanvasMap 컴포넌트를 삽입
                )}
            </div>


            {/*<div className={`map-container ${viewMode === 'map' ? 'visible' : ''}`}>*/}
            {/*    {viewMode === 'map' && (*/}
            {/*        <img src={'/image/img.png'} alt="경기도 지도" style={{width: '100%', height: '450px'}}/>*/}
            {/*    )}*/}

            {/*</div>*/}

            <div className="category-buttons">
                <button
                    className={selectedCategory === '' ? 'active' : ''}
                    onClick={() => handleCategoryChange('')}
                >
                    전체
                </button>

                {categories.map((category) => (
                    <button
                        key={category}
                        className={selectedCategory === category ? 'active' : ''}
                        onClick={() => handleCategoryChange(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="grid-container">
                {displayedData.length > 0 ? (
                    displayedData.map((store) => (
                        <div
                            className="box"
                            key={store.storeId}
                            onClick={() => handleBoxClick(store.storeId)}
                        >
                            {store.img && store.img.length > 0 ? (
                                <img className="image_box" alt="이미지 없음" src={store.img[0]}/>
                            ) : (
                                <div className="no-image">이미지 없음</div>
                            )}
                            <div className="name">
                                <p className="storename">{store.storeName}</p>
                                <p className="store">
                                    {store.addressCategory1}
                                    <br/>
                                    {store.detailAddress}
                                    <br/>
                                    {store.contact}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-results">검색 결과가 없습니다.</p>
                )}
            </div>

            {totalPages > 1 && (
                <div className="pagination">
                    {Array.from({length: totalPages}, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={page === index + 1 ? 'active' : ''}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LocalSearch;
