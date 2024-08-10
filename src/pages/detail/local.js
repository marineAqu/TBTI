import React, { useState, useEffect } from 'react';
import "./detail.css";
import { useLocation, useNavigate } from "react-router-dom";

const LocalSearch = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [page, setPage] = useState(1);
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search).get('query'); // 지역 필터링 쿼리 파라미터

    const regions = ["강원특별자치도", "대전광역시", "전라남도", "부산광역시", "서울특별시", "인천광역시", "광주광역시", "경상북도", "대구광역시", "제주특별자치도", "충청남도", "충청북도", "경상남도", "경기도", "전북특별자치도", "세종특별자치시", "울산광역시"];


    useEffect(() => {
        const fetchData = async () => {
            if (query) {
                try {
                    const addCategory = regions.indexOf(query);

                    // API 요청 URL 점검: addressCategory1 쿼리 파라미터 사용
                    const response = await fetch(`/api/search_region?addCategory=${addCategory+1}`);
                    const result = await response.json();

                    // 서버에서 받은 데이터로 상태 설정
                    setData(result.localList);

                    // 검색어로 지역 이름 필터링
                    /*const filtered = result.localcreatorList.filter(store =>
                        store.addressCategory1.includes(query)
                    );*/
                    setFilteredData(result.localList);
                    setPage(1); // 새로운 검색 시 페이지를 1로 초기화
                } catch (error) {
                    console.error('데이터 가져오기 오류:', error);
                    // 에러 처리: 사용자에게 메시지 표시
                    alert('데이터를 가져오는 데 문제가 발생했습니다.');
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
            {totalPages > 1 && (
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
