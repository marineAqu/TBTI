import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./detail.css";

const RestAPIFetch = () => {
    const [data, setData] = useState([]);
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/localcreator_detail?storeId=2');
                const result = await response.json();
                setData(result.localcreator);
                console.log('응답 데이터:', result);
            } catch (error) {
                console.error('오류:', error);
            }
        };
        fetchData();
    }, []);


    return (
        <div>
            <h1>게시판 목록</h1>
            <div>스토어 ID: {data.storeId}</div>
            <div>스토어 이름: {data.storeName}</div>
            <div>상세 주소: {data.detailAddress}</div>
            <div>카테고리: {data.category}</div>
            <div>연락처: {data.contact ? data.contact : 'N/A'}</div>
            <div>웹사이트: {data.website ? data.website : 'N/A'}</div>
            <div>주소 카테고리 1: {data.addressCategory1}</div>
            <div>주소 카테고리 2: {data.addressCategory2}</div>
            <div>평점: {data.rating}</div>
            <div>숨겨진 카테고리: {data.hiddenCategory}</div>
        </div>
    );
}

export default RestAPIFetch;

