import React from "react";
import './main.css';
// import { useParams } from "react-router-dom";

const PlaceSlider = ({ places }) => {
    // const { storeId } = useParams(); // URL 파라미터에서 storeId 추출

    const handlePlaceClick = (url) => {
        window.open(url, '_blank'); // redirection URL을 새 탭에서 열기
    };

    return (
        <div className="place-slider">
            <div className="place-slider-container">
                {places.map((place) => {
                    // redirection URL에서 storeId 추출
                    const extractedStoreId = place.redirection_url.split('/').pop(); // URL의 마지막 부분을 가져옴

                    return (
                        <div
                            key={place.id} // 각 place에 대한 고유한 key
                            className="place-item"
                            onClick={() => handlePlaceClick(place.redirection_url)}
                        >
                            <img
                                src={`https://tbti-s3-image.s3.ap-northeast-2.amazonaws.com/${place.place_name}_1.jpg`} // 추출한 storeId를 사용하여 이미지 URL 생성
                                alt={place.place_name}
                                className="place-image"
                            />
                            <h3>{place.place_name}</h3>
                            <p>{place.description}</p>
                            {/*<p style={{ margin: '20px 0' }}></p>*/}
                            {/*<p>{place.location}</p>*/}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PlaceSlider;
