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
    const [reviewText, setReviewText] = useState(""); // 리뷰 입력 상태
    const [reviews, setReviews] = useState([]); // 리뷰 목록 상태

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/localcreator_detail?storeId=${storeId}`);
                const result = await response.json();
                setData(result.localcreator);
                setDescription(result.localcreator.description.description);
                // 기존 리뷰를 로드할 수도 있습니다.
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

    const handleReservationClick = () => { //예약하기 버튼 링크 연결
        window.open("https://map.naver.com/p/entry/place/1705838287?c=15.00,0,0,0,dh", "_blank");
    };

    const truncatedDescription = description.length > 60
        ? description.substring(0, 60) + "..."
        : description;

    const handleReviewChange = (e) => {
        setReviewText(e.target.value);
    };

    const handleReviewSubmit = async (e) => { //리뷰 api
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

                const result = await response.json();

                // 리뷰 목록 업데이트
                setReviews([...reviews, reviewText.trim()]);
                setReviewText(""); // 입력 필드 초기화
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
                    <img src={data.img ? data.img[currentImageIndex] : ''} alt="Detail" className="image" />
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
                        </div>
                        {description.length > 60 && (
                            <button className="show-more-button" onClick={handleShowMore}>
                                {showMore ? '접기' : '더보기'}
                            </button>
                        )}
                    </div>

                    <div className="reservation">
                        <button className="reservation-button" onClick={handleReservationClick}>
                            예약하기
                        </button>
                    </div>

                    <div className="review">
                        <form className="reviewForm" onSubmit={handleReviewSubmit}>
                            <textarea
                                className="reviewInput"
                                value={reviewText}
                                onChange={handleReviewChange}
                                placeholder="리뷰를 작성하세요"
                                rows="2"


                            />
                            <button type="submit" className="submitReviewButton">리뷰 작성</button>
                        </form>

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
                </div>
            </div>
        </div>
    );
};

export default Detail;
