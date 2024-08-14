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
                console.log('응답 데이터:', result);
                console.log('DescriptionEntity: ' + result.localcreator.description.description);
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
        navigate(-1); // 이전 페이지로 이동합니다.
    };

    // 60자까지만 표시하고, 더보기 버튼 클릭 시 전체 내용 표시
    const truncatedDescription = description.length > 60
        ? description.substring(0, 60) + "..."
        : description;

    return (
        <div className="detailPage">
            <div className="div">
                <div className="Imgex">
                    <div className="overlap-2">
                        <img src={data.img ? data.img[currentImageIndex] : ''} alt="Detail" className="image"/>
                    </div>
                    <div className="overlap-wrapper">
                        <div className="text-wrapper-2">
                            <button onClick={handlePrevImage} className="arrow-button">◀</button>
                            {data.img ? `${currentImageIndex + 1}/${data.img.length}` : ' 0/0 '}
                            <button onClick={handleNextImage} className="arrow-button">▶</button>
                        </div>
                    </div>
                </div>

                <div className="overlap-group-wrapper">
                    <div className="overlap-group-2">
                        <img className="arrow" alt="left Arrow" src="/image/left-arrow.png"/>
                        <div className="text-wrapper-3" onClick={handleBackNavigation}>
                            이전으로
                        </div>
                    </div>
                </div>

                <div className="text-wrapper-4" id="storeId">
                    [{data.category}] {data.storeName}
                </div>

                {/*<img className="link" alt="link" src="/image/link.png" id="website"/>*/}

                <p className="element-https" id="contact">
                    <p>{data.detailAddress}</p>
                    <p>{data.business_hours}</p>
                    <p>평점 : {data.rating}</p>


                    <div className="description_box">
                    <div className={`description ${showMore ? 'show-more' : 'show-less'}`}>
                        {showMore ? description : truncatedDescription}
                        {description.length > 60 && (
                            <button className="show-more-button" onClick={handleShowMore}>
                                {showMore ? '접기' : '더보기'}
                            </button>
                        )}
                    </div>
                </div>
            </p>

                {/*<div className="review">*/}
                {/*    <div className="reviewContent">*/}
                {/*        리뷰 작성 칸입니다*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export default Detail;
