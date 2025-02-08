import React, {useEffect, useState} from "react";
import { useLocation } from "react-router-dom";
import "./plan.css";

const Plan = () => {
    const [dayPlans, setDayPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    /*const [locations, setLocations] = useState([
        "대전 중구 대종로480번길 15",
        "대전 중구 목중로 29",
        "대전광역시 동구 중앙로 215"
    ]);*/
    const [locations, setLocations] = useState([]);

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

        //주소에서 좌표로 변환
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
        const locationsModi = groupedPlans.flatMap(group => group.map(plan => plan.location));
        setLocations(locationsModi);

        if (coordinates.length === 0) return;

        const container = document.getElementById('map');
        const options = {
            center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 기본값 (서울 시청)
            level: 5,
        };

        const map = new window.kakao.maps.Map(container, options);
        const bounds = new window.kakao.maps.LatLngBounds();

        const drawRoute = (start, end) => {
            const directionsURL = `https://apis-navi.kakaomobility.com/v1/directions?origin=${start.longitude},${start.latitude}&destination=${end.longitude},${end.latitude}&waypoints=&priority=RECOMMEND&car_fuel=GASOLINE&car_hipass=false&alternatives=false&road_details=false`;

            fetch(directionsURL, {
                headers: {
                    "Authorization": "KakaoAK "+process.env.REACT_APP_KAKAO_AUTHORIZATION_KEY
                }
            })
                .then(response => response.json())
                .then(data => {
                    if (data.routes && data.routes[0].sections) {
                        const linePath = [];
                        data.routes[0].sections[0].roads.forEach(router => {
                            router.vertexes.forEach((vertex, index) => {
                                if (index % 2 === 0) {
                                    linePath.push(new window.kakao.maps.LatLng(router.vertexes[index + 1], router.vertexes[index]));
                                }
                            });
                        });

                        const polyline = new window.kakao.maps.Polyline({
                            path: linePath,
                            strokeWeight: 3,
                            strokeColor: '#638fd7',
                            strokeOpacity: 0.8,
                            strokeStyle: 'solid'
                        });

                        polyline.setMap(map);
                    }
                })
                .catch(error => console.error('Error fetching route:', error));
        };

        //지도에 마커 표시 및 범위 설정
        coordinates.forEach((location, index) => {
            const markerPosition = new window.kakao.maps.LatLng(location.latitude, location.longitude);
            const marker = new window.kakao.maps.Marker({
                position: markerPosition,
                map: map,
            });

            const infowindow = new window.kakao.maps.InfoWindow({
                content: `<div style="padding:5px;">${location.address}</div>`,
            });

            window.kakao.maps.event.addListener(marker, 'mouseover', () => {
                infowindow.open(map, marker);
            });

            window.kakao.maps.event.addListener(marker, 'mouseout', () => {
                infowindow.close();
            });

            //마커 위치를 LatLngBounds에 포함
            bounds.extend(markerPosition);

            if (index < coordinates.length - 1) {
                drawRoute(location, coordinates[index + 1]);
            }
        });

        //모든 마커가 보이도록 지도 영역 조정
        map.setBounds(bounds);
    }, [groupedPlans, coordinates]);

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
