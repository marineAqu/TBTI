import React, { useState, useEffect } from 'react';
import "./detail.css";
import {useParams} from "react-router-dom";

const LocalSearch = () => {
    // const { storeId } = useParams();
    // const [data, setData] = useState([]);
    //
    // // 컴포넌트가 마운트될 때 API 호출을 합니다.
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch('/api/search_localcreator?searchInput=브레드');
    //             const data = await response.json();
    //             console.log('길이: '+ result.localcreaterList.length);
    //             setData(result.localcreatorList[0]);
    //             console.log('응답 데이터:', result);
    //         } catch (error) {
    //             console.error('오류:', error);
    //         }
    //     };
    //
    //     fetchData();
    // }, [storeId]);

    return (
        <div className="container">
            <div className="area">
                <div className="heading">api addressCategory1</div>
                <div className="paragraph">api 지역 한 줄 소개</div>
            </div>

            <div className="category">
                <div className="cate">전체</div>
                <div className="cate">카페</div>
                <div className="cate">음식점</div>
                <div className="cate">과일</div>
                <div className="cate">숙소</div>
            </div>

            <div className="group">

                <div className="box">
                    <img className="image_box" alt="img"/>

                    <div className="name">
                        <p className="storename" id="storename">
                            api 가게 이름
                        </p>

                        <p className="store" id="intro">
                            주소 api
                            <br/>
                            웹사이트
                            <br/>
                            연락처
                        </p>
                    </div>

                </div>

            </div>

        </div>
    );
};

export default LocalSearch;
