import React from "react";
import './main.css';
import { useParams } from "react-router-dom";

const PlaceSlider = ({ places }) => {
    const { storeId } = useParams();


    const handlePlaceClick = (url) => {
        window.open(url, '_blank'); //링크
    };

    return (
        <div className="place-slider">
            <div className="place-slider-container">
                {places.map((place) => (
                    <div
                        key={place.id}
                        className="place-item"
                        onClick={() => handlePlaceClick(place.redirection_url)}
                    >
                        <img
                            src={`http://i-s3-image.s3.ap-northeast-2.amazonaws.com/${place.place_name}_${places.indexOf(place) + 1}.jpg`}
                            alt={place.place_name}
                            className="place-image"
                        />
                        <h3>{place.place_name}</h3>
                        <p>{place.description}</p>
                        <p style={{ margin: '20px 0' }}></p>
                        <p>{place.location}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlaceSlider;
