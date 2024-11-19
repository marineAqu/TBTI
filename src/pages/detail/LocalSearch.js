//가게 검색
import React, { useState, useEffect } from 'react';
import "./detail.css";
import { useLocation, useNavigate } from "react-router-dom";

const LocalSearch = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [categories, setCategories] = useState([]); // 카테고리 목록 상태
    const [selectedCategory, setSelectedCategory] = useState(''); // 선택된 카테고리 상태
    const [page, setPage] = useState(1);
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        const fetchData = async () => {
            if (query) {
                try {
                    //const response = await fetch(`/api/search_localcreator?searchInput=${query}`);
                    const response = await fetch(`/api/search_localcreator_modi?searchInput=${query}`);
                    const result = await response.json();
                    setData(result.localcreatorList);

                    // 고유한 카테고리 목록 생성
                    const uniqueCategories = [...new Set(result.localcreatorList.map(store => store.category))];
                    setCategories(uniqueCategories);

                    // 검색어와 선택된 카테고리로 필터링
                    const filtered = result.localcreatorList.filter(store =>
                        store.storeName.includes(query) &&
                        (!selectedCategory || store.category === selectedCategory)
                    );
                    setFilteredData(filtered);
                    setPage(1); // 새로운 검색 시 페이지를 1로 초기화
                } catch (error) {
                    console.error('오류:', error);
                }
            }
        };

        fetchData();
    }, [query, selectedCategory]); // selectedCategory가 변경될 때도 다시 데이터를 필터링하도록 함

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

    const itemsPerPage = 12; // 9개에서 12개로 변경
    const startIndex = (page - 1) * itemsPerPage;
    const displayedData = filteredData.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <div className="container">

            <div className="local-search-container">

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
                    >{category}

                    </button>
                ))}

                </div>
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
                                <img className="image_box" alt="이미지 없음" src={store.img[0]} />
                            ) : (
                                <div className="no-image">이미지 없음</div>
                            )}
                            <div className="name">
                                <p className="storename">{store.storeName}</p>
                                <p className="store">
                                    {store.addressCategory1}
                                    <br />
                                    {store.detailAddress}
                                    <br />
                                    {store.contact}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="no-results">검색 결과가 없습니다.</p>
                )}
            </div>

            {filteredData.length > itemsPerPage && (
                <div className="pagination">
                    {Array.from({ length: totalPages }, (_, index) => (
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
