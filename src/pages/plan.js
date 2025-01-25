import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import "./plan.css";

const Plan = () => {
    const [dayPlans, setDayPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [locations, setLocations] = useState([
        "대전 중구 대종로480번길 15",
        "대전 중구 목중로 29",
        "대전광역시 동구 중앙로 215"
    ]);

    const [coordinates, setCoordinates] = useState([]);
    const location = useLocation();
    const planData = location.state?.planData || null; // 초기값 null 설정

    useEffect(() => {
        if (!planData) {
            console.error("여행 계획 데이터를 찾을 수 없습니다.");
            return;
        }

        const fetchData = async () => {
            try {
                const res = await fetch("/chat/message", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ query: "fetch day plans" }),
                });

                if (!res.ok) {
                    throw new Error("데이터를 가져오는 데 실패했습니다.");
                }

                const data = await res.json();
                setDayPlans(data.place || []);
            } catch (error) {
                console.error("데이터를 가져오는 중 오류 발생:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [planData]);

    useEffect(() => {
        if (!window.kakao) {
            console.error('카카오맵 SDK가 로딩되지 않음');
            return;
        }

        const geocoder = new window.kakao.maps.services.Geocoder();

        const fetchCoordinates = async () => {
            const coords = await Promise.all(
                locations.map((address) =>
                    new Promise((resolve) => {
                        geocoder.addressSearch(address, (result, status) => {
                            if (status === window.kakao.maps.services.Status.OK) {
                                resolve({
                                    address,
                                    latitude: result[0].y,
                                    longitude: result[0].x,
                                });
                            } else {
                                console.warn(`Failed to geocode address: ${address}`);
                                resolve(null);
                            }
                        });
                    })
                )
            );
            setCoordinates(coords.filter(coord => coord !== null));
        };

        fetchCoordinates();
    }, [locations]);

    useEffect(() => {
        if (coordinates.length === 0) return;

        const container = document.getElementById('map');
        const options = {
            center: new window.kakao.maps.LatLng(37.5665, 126.9780),
            level: 5,
        };

        const map = new window.kakao.maps.Map(container, options);
        const bounds = new window.kakao.maps.LatLngBounds();

        coordinates.forEach((location) => {
            const markerPosition = new window.kakao.maps.LatLng(location.latitude, location.longitude);
            const marker = new window.kakao.maps.Marker({
                position: markerPosition,
                map: map,
            });

            bounds.extend(markerPosition);
        });

        map.setBounds(bounds);
    }, [coordinates]);

    if (!planData) {
        return <div>여행 계획 데이터를 찾을 수 없습니다.</div>;
    }

    if (loading) {
        return <div>데이터를 불러오는 중...</div>;
    }

    // 데이터를 3개씩 나누기
    const groupedPlans = planData.reduce((result, plan, index) => {
        const groupIndex = Math.floor(index / 3);
        if (!result[groupIndex]) result[groupIndex] = [];
        result[groupIndex].push(plan);
        return result;
    }, []);

    return (
        <div className="plan-container">
            <div className="map-section">
                <div id="map" style={{ width: '100%', height: '100%' }}></div>
            </div>

            <div className="plan-container">
                <div className="ex">
                    <h1>여행 계획</h1>
                    {groupedPlans.map((group, dayIndex) => (
                        <div key={dayIndex} className="day-group">
                            <h2>{dayIndex + 1}일차</h2>
                            {group.map((plan, index) => (
                                <div key={index} className="plan-item">
                                    <h3>{plan.place_name}</h3>
                                    <p>{plan.description}</p>
                                    <p>위치: {plan.location}</p>
                                    <p>예상 소비: {plan.consumption}</p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Plan;
