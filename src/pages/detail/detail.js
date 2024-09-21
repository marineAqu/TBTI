import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./detail.css";

const Detail = () => {
    const { storeId } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [description, setDescription] = useState("");
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [reviews, setReviews] = useState([]);
    const [activeTab, setActiveTab] = useState("info");
    const [errorMessage, setErrorMessage] = useState(null); // 오류 메시지 상태

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/localcreator_detail?storeId=${storeId}`);
                const result = await response.json();
                setData(result.localcreator);
                setDescription(result.localcreator.description.description);
            } catch (error) {
                console.error('오류:', error);
                setErrorMessage('데이터를 가져오는 데 실패했습니다.'); // 오류 메시지 설정
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

    const handleBackNavigation = () => {
        navigate(-1);
    };


    const handleReviewChange = (e) => {
        setReviewText(e.target.value);
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (reviewText.trim()) {
            try {
                const response = await fetch('/api/post_review', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        storeId: storeId,
                        review: reviewText.trim(),
                    }),
                });

                if (!response.ok) {
                    throw new Error('리뷰 제출에 실패했습니다.');
                }

                setReviews([...reviews, reviewText.trim()]);
                setReviewText("");
            } catch (error) {
                console.error('리뷰 제출 오류:', error);
            }
        }
    };

    return (
        <div className="detailPage">
            <div className="header">
                <img className="arrow" alt="left Arrow" src="/image/left-arrow.png" />
                <div className="before" onClick={handleBackNavigation}>
                    이전으로
                </div>
            </div>

            <div className="imageContainer">
                <div className="imgBox">
                    <img src={data.img && data.img[currentImageIndex] ? data.img[currentImageIndex] : ''} alt="Detail" className="image" />
                    <div className="arrowBox">
                        <button className="arrow-button" onClick={handlePrevImage}>
                            &#9664;
                        </button>
                        <div className="page-info">
                            <span>{currentImageIndex + 1} / {data.img ? data.img.length : 1}</span>
                        </div>
                        <button className="arrow-button" onClick={handleNextImage}>
                            &#9654;
                        </button>
                    </div>
                </div>

                <div className="storeInfo">
                    <div className="Category">
                        [{data.category}]
                    </div>

                    <div className="storeName">
                        {data.storeName}
                    </div>

                    <div className="contactInfo">
                        <p className="detailAddress">{data.detailAddress}</p>
                        <p className="rating">평점 : {data.rating}</p>
                    </div>

                    <div className="reservation">

                        <button className="naver-button">
                            <img src="/image/naver.png" alt="네이버예약"/> 네이버 예약하기
                        </button>

                    </div>

                </div>
            </div>

            {errorMessage && <p className="error">{errorMessage}</p>} {/* 오류 메시지 표시 */}

            <div className="tabButtons">
                <button
                    className={`tabButton ${activeTab === "info" ? "active" : ""}`}
                    onClick={() => setActiveTab("info")}
                >
                    상세정보
                </button>
                <button
                    className={`tabButton ${activeTab === "review" ? "active" : ""}`}
                    onClick={() => setActiveTab("review")}
                >
                    리뷰
                </button>
            </div>

            {activeTab === "info" && (
                <div className="infoContent">

                    <p className="infoName">영업시간</p>
                    <p className="hours">{data.business_hours}</p>

                    <p className="infoName">가게소개</p>

                    <div className="descriptionBox">

                        <div className="description">
                            {description}
                        </div>

                    </div>
                </div>
            )}

            {activeTab === "review" && (
                <div className="review">
                    <form className="reviewForm" onSubmit={handleReviewSubmit}>
                        <textarea
                            className="reviewInput"
                            value={reviewText}
                            onChange={handleReviewChange}
                            placeholder="리뷰를 작성하세요"
                            rows="2"
                        />

                    </form>

                    <button type="submit" className="submitReviewButton">리뷰 작성</button>

                    <div className="reviewList">
                        {reviews.length > 0 ? (
                            reviews.map((review, index) => (
                                <div key={index} className="reviewItem">
                                    {review}
                                </div>
                            ))
                        ) : (
                            <p className="noReviews">아직 작성된 리뷰가 없습니다.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Detail;
