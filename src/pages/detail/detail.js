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
    const [myNickname, setmyNickname] = useState("로그인 후 이용해주세요.");
    const [rating, setRating] = useState(0); // 별점 상태 추가
    const [detailInfo, setDetailInfo] = useState({}); //상세 정보 저장



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/localcreator_detail?storeId=${storeId}`);
                const result = await response.json();

                // console.log("API Response:", result);
                // console.log(data);


                setData(result.localcreator);

                setDescription(result.localcreator.description.description);
                if(result.username) setmyNickname(result.username+" 님 리뷰를 작성해보세요!");


                const reviewResponse = await fetch(`/api/get_review?storeId=${storeId}`);
                const reviewResult = await reviewResponse.json();
                setReviews(reviewResult.reviewList);

                const infoResponse = await fetch(`/api/get_detail_info?storeId=${storeId}`);
                const infoResult = await infoResponse.json();
                setDetailInfo(infoResult.information); //이 문제였음

                console.log(infoResult); //상세정보


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
        const formData = new FormData();
        formData.append('storeId', storeId);
        formData.append('reviewContent', reviewText.trim());
        formData.append('starPoint', rating);

        if (reviewText.trim() && myNickname !== "로그인 후 이용해주세요.") {
            try {
                const response = await fetch('/api/post_review', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                    },
                    body: formData
                });

                if (!response.ok) {
                    throw new Error('리뷰 제출 실패');
                }

                const reviewResponse = await fetch(`/api/get_review?storeId=${storeId}`);
                const reviewResult = await reviewResponse.json();
                setReviews(reviewResult.reviewList);

            } catch (error) {
                console.error('리뷰 제출 오류:', error);
            }
        }
        else alert("로그인 후 이용해주세요.");
    };

    // const detailInfo = props.detailInfo || {};

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const StarRating = ({ rating, onRatingChange }) => {
        const handleClick = (newRating) => {
            onRatingChange(newRating);
        };

        return (
            <div className="star-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={`star ${star <= rating ? "filled" : ""}`}
                        onClick={() => handleClick(star)}
                    >
                    &#9733;
                </span>
                ))}
            </div>
        );
    };

    const StarRated = ({ rating }) => {
        return (
            <div className="review-stared-rating">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={`stared ${star <= rating ? "filled" : ""}`}
                    >
                    &#9733;
                </span>
                ))}
            </div>
        );
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
                        <button className="arrow-button left" onClick={handlePrevImage}>
                            &#9664;
                        </button>
                        {/*<div className="page-info">*/}
                        {/*    <span>{currentImageIndex + 1} / {data.img ? data.img.length : 1}</span>*/}
                        {/*</div>*/}
                        <button className="arrow-button right" onClick={handleNextImage}>
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
                        {data.reserveLink ? (
                            <a href={data.reserveLink} target="_blank" rel="noopener noreferrer">
                                <button className="naver-button">
                                    <img src="/image/naver.png" alt="네이버예약"/> 네이버 예약하기
                                </button>
                            </a>
                        ) : (
                            <p></p> // 예약 링크가 없을 경우에는 빈 태그 대신, 다른 안내 문구를 넣을 수도 있습니다.
                        )}
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


                    <p className="infoName">상세 정보</p>

                    <ul>
                        {detailInfo.allowsPets === "반려동물 입장 가능" ? (
                            <div>
                                <img src="/image/detail/pet-friendly.png" alt="Pet Friendly"/>
                                <p>반려동물 입장 가능</p>
                            </div>
                        ) : (
                            <div>
                                <img src="/image/detail/no-animals.png" alt="No Pets Allowed"/>
                                <p>반려동물 입장 불가</p>
                            </div>
                        )}

                        {detailInfo.allowsReserve === "예약 가능" ? (
                            <div>
                                <img src="/image/detail/booking.png" alt="Reservation Available"/>
                                <p>예약 가능</p>
                            </div>
                        ) : (
                            <div>
                                <img src="/image/detail/no_booking.png" alt="No Reservation"/>
                                <p>예약 불가</p>
                            </div>
                        )}

                        {detailInfo.hasWifi === "와이파이 이용 가능" ? (
                            <div>
                                <img src="/image/detail/wi-fi.png" alt="Wi-Fi Available"/>
                                <p>와이파이 있음</p>
                            </div>
                        ) : (
                            <div>
                                <img src="/image/detail/no-wifi.png" alt="No Wi-Fi"/>
                                <p>와이파이 없음</p>
                            </div>
                        )}

                        {detailInfo.kidsAvailable === "아이 입장 가능" ? (
                            <div>
                                <img src="/image/detail/kids-zone.png" alt="Kids Allowed"/>
                                <p>키즈존</p>
                            </div>
                        ) : (
                            <div>
                                <img src="/image/detail/no_kids-zone.png" alt="No Kids Allowed"/>
                                <p>노키즈존</p>
                            </div>
                        )}

                        {detailInfo.hasParking === "근처 주차 가능" ? (
                            <div>
                                <img src="/image/detail/parking.png" alt="Parking Available"/>
                                <p>주차 가능</p>
                            </div>
                        ) : (
                            <div>
                                <img src="/image/detail/no-parking.png" alt="No Parking"/>
                                <p>주차 어려움</p>
                            </div>
                        )}

                        {detailInfo.wheelchairAccess === "휠체어 이용 가능" ? (
                            <div>
                                <img src="/image/detail/ramp.png" alt="Wheelchair Access Available"/>
                                <p>휠체어 이용 가능</p>
                            </div>
                        ) : (
                            <div>
                                <img src="/image/detail/no-wheel.png" alt="No Wheelchair Access"/>
                                <p>휠체어 이용 어려움</p>
                            </div>
                        )}
                    </ul>



                    <div className="infoDetails">
                            <p>* 정류장과의 거리: {detailInfo.distanceToStation || "정보 없음"}</p>
                            <p>* 1인당 비용: {detailInfo.perCost || "정보 없음"}</p>
                            <p>* 서비스 옵션: {detailInfo.serviceOptions || "정보 없음"}</p>
                            <p>* {detailInfo.tags || "정보 없음"}</p>
                    </div>

                    <p className="infoName">영업시간</p>
                    <p className="hours">{data.business_hours}</p>


                    <p className="infoName">가게소개</p>

                    <div className="descriptionBox">

                    <div className="description">
                            {description}
                        </div>

                    </div>
                </div>
            )
            }

            {
                activeTab === "review" && (
                    <div className="review">

                        <form className="reviewForm" onSubmit={handleReviewSubmit}>

                            <div className="id-star-div">
                                <span>{myNickname}</span>
                                <StarRating rating={rating} onRatingChange={handleRatingChange}/>
                            </div>

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
                                        <div className="review-header">
                                            <span className="member-name">{review.memberName}</span>
                                            <StarRated className="review-star" rating={review.rate}></StarRated>
                                            <span className="review-date">{review.createAt}</span>
                                        </div>
                                        <span>{review.reviewContent}</span>
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
