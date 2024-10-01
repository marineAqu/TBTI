import React from "react";
import './main.css';

const PlaceSlider = ({ places }) => {
    const handlePlaceClick = (url) => {
        window.open(url, '_blank'); // redirection URL을 새 탭에서 열기
    };

    return (
        <div className="place-slider">
            <div className="place-slider-container">
                {places.map((place) => (
                    <div
                        key={place.id} // 각 place에 대한 고유한 key
                        className="place-item"
                        onClick={() => handlePlaceClick(place.redirection_url)}
                    >
                        <img
                            src={`https://tbti-s3-image.s3.ap-northeast-2.amazonaws.com/${place.place_name}_1.jpg`}
                            alt={place.place_name}
                            className="place-image"
                        />
                        <h3>{place.place_name}</h3>
                        <p>{place.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlaceSlider;
