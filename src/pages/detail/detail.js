import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./detail.css";

const Detail = () => {
    const { storeId } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/localcreator_detail?storeId=${storeId}`);
                const result = await response.json();
                setData(result.localcreator);
                console.log('응답 데이터:', result);
            } catch (error) {
                console.error('오류:', error);
            }
        };
        fetchData();
    }, [storeId]);

    return (
        <div className="detailPage">
            <div className="div">
                <div className="Imgex">
                    <div className="overlap-wrapper">
                        <div className="overlap-2">
                            <div className="rectangle" />
                            <div className="text-wrapper-2">1/2</div>
                        </div>
                    </div>
                </div>

                <div className="overlap-group-wrapper">
                    <div className="overlap-group-2">
                        <img className="arrow" alt="left Arrow" src="/image/left-arrow.png" />
                        <div className="text-wrapper-3">{data.addressCategory1}</div>
                    </div>
                </div>

                <div className="text-wrapper-4" id="storeId">
                    [{data.category}] {data.storeName}
                </div>

                <img className="link" alt="link" src="/image/link.png" id="website" />

                <p className="element-https" id="contact">
                    {data.contact}
                    <br />
                    {data.website}
                    <br />
                    {data.detailAddress}
                </p>
            </div>
        </div>
    );
};

export default Detail;
