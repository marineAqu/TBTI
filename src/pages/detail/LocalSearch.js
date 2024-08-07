import React, { useState, useEffect } from 'react';
import "./detail.css";
import { useLocation, useNavigate } from "react-router-dom";

const LocalSearch = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [page, setPage] = useState(1);
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        const fetchData = async () => {
            if (query) {
                try {
                    const response = await fetch(`/api/search_localcreator?searchInput=${query}`);
                    const result = await response.json();
                    setData(result.localcreatorList);

                    // 검색어로 가게 이름 필터링
                    const filtered = result.localcreatorList.filter(store =>
                        store.storeName.includes(query)
                    );
                    setFilteredData(filtered);
                    setPage(1); // 새로운 검색 시 페이지를 1로 초기화
                } catch (error) {
                    console.error('오류:', error);
                }
            }
        };

        fetchData();
    }, [query]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
    };

    const handleBoxClick = (storeId) => {
        navigate(`/detail/${storeId}`);
    };

    const itemsPerPage = 9;
    const startIndex = (page - 1) * itemsPerPage;
    const displayedData = filteredData.slice(startIndex, startIndex + itemsPerPage);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <div className="container">
            {/*{query && (*/}
            {/*    <div className="search-result-text">*/}
            {/*        "{query}" 을/를 검색한 결과입니다.*/}
            {/*    </div>*/}
            {/*)}*/}
            <div className="grid-container">
                {displayedData.length > 0 ? (
                    displayedData.map((store) => (
                        <div
                            className="box"
                            key={store.storeId}
                            onClick={() => handleBoxClick(store.storeId)}
                        >
                            {store.img && store.img.length > 0 ? (
                                <img className="image_box" alt="img" src={store.img[0]} />
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
                    <p className="no-results">검색 결과가 없습니다.</p>)}
            </div>
            {filteredData.length > 0 && (
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
