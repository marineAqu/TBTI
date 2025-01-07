import React from "react";
import "./plan.css";

const Plan = () => {
    return (
        <div className="plan-container">
            <div className="map-section">
                <p>지도 넣어주세요</p>
            </div>

            <div className="plan-section">
                <div className="day-plan">
                    <h2>1일차</h2>
                    <div className="location-box">장소 1</div>
                    <div className="location-box">장소 2</div>
                    <div className="location-box">장소 3</div>
                </div>
                <div className="day-plan">
                    <h2>2일차</h2>
                    <div className="location-box">장소 1</div>
                    <div className="location-box">장소 2</div>
                </div>
            </div>
        </div>
    );
};

export default Plan;
