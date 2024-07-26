import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./detail.css";

const Detail = () => {
    const { storeId } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/localcreator_detail?storeId=${storeId}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const jsonData = await response.json();
                setData(jsonData);
                console.log('API Response:', jsonData);
            } catch (error) {
                console.error('Error fetching JSON:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [storeId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!data) {
        return <div>No data found</div>;
    }

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
                    {data.contact ? data.contact : '연락처 정보 없음'}
                    <br />
                    {data.website ? <a href={data.website} id="website">{data.website}</a> : '웹사이트 정보 없음'}
                    <br />
                    {data.detailAddress}
                </p>
            </div>
        </div>
    );
};

export default Detail;
