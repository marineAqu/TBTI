import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./detail.css";

const Detail = () => {
    const { storeId } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [description, setDescription] = useState("");
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/localcreator_detail?storeId=${storeId}`);
                const result = await response.json();
                setData(result.localcreator);
                setDescription(result.localcreator.description.description);
            } catch (error) {
                console.error('오류:', error);
            }
        };

        fetchData();
    }, [storeId]);

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : data.img.length - 1));
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex < data.img.length - 1 ? prevIndex + 1 : 0));
    };

    const handleShowMore = () => {
        setShowMore(!showMore);
    };

    const handleBackNavigation = () => {
        navigate(-1);
    };

    const truncatedDescription = description.length > 60
        ? description.substring(0, 60) + "..."
        : description;

    return (

        <div className="detailPage">
            <div className="header">
                <img className="arrow" alt="left Arrow" src="/image/left-arrow.png"/>
                <div className="before" onClick={handleBackNavigation}>
                    이전으로
                </div>
            </div>

            <div className="imageContainer">

                <div className="imgBox">
                    <img src={data.img ? data.img[currentImageIndex] : ''} alt="Detail" className="image"/>
                    <div className="arrowBox">
                        <button className="arrow-button" onClick={handlePrevImage}>
                            &#9664; {/* 좌측 화살표 문자 */}
                        </button>
                        <div className="page-info">
                            <span>{currentImageIndex + 1} / {data.img ? data.img.length : 1}</span> {/* 페이지 번호 */}
                        </div>
                        <button className="arrow-button" onClick={handleNextImage}>
                            &#9654; {/* 우측 화살표 문자 */}
                        </button>
                    </div>
                </div>

                <div className="storeInfo">
                    <div className="storeName">
                        [{data.category}] {data.storeName}
                    </div>
                    <div className="contactInfo">
                        <p className="detailAddress">{data.detailAddress}</p>
                        <p className="hours">{data.business_hours}</p>
                        <p className="rating">평점 : {data.rating}</p>
                    </div>
                    <div className="descriptionBox">
                        <div className={`description ${showMore ? 'show-more' : 'show-less'}`}>
                            {showMore ? description : truncatedDescription}
                            {description.length > 60 && (
                                <button className="show-more-button" onClick={handleShowMore}>
                                    {showMore ? '접기' : '더보기'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default Detail;
