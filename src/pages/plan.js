import React, {useEffect, useState} from "react";
import "./plan.css";

const Plan = () => {
    const [locations, setLocations] = useState([
        "대전 중구 대종로480번길 15",
        "대전 중구 목중로 29",
        "대전광역시 동구 중앙로 215"
    ]);

    const [coordinates, setCoordinates] = useState([]);

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
        if (coordinates.length === 0) return;

        const container = document.getElementById('map');
        const options = {
            center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 기본값 (서울 시청)
            level: 5,
        };

        const map = new window.kakao.maps.Map(container, options);
        const bounds = new window.kakao.maps.LatLngBounds();
        const linePath = []; // 폴리라인 경로 저장


        //지도에 마커 표시 및 범위 설정
        coordinates.forEach((location) => {
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

            // TODO: 길찾기 코드 수정 필요, 폴리라인 경로 추가
            //linePath.push(markerPosition);
        });

        //모든 마커가 보이도록 지도 영역 조정
        map.setBounds(bounds);

        const polyline = new window.kakao.maps.Polyline({
            path: linePath,
            strokeWeight: 5,
            strokeColor: '#638fd7',
            strokeOpacity: 0.8,
            strokeStyle: 'solid'
        });

        //TODO: 길찾기 코드 수정 필요
        //polyline.setMap(map);

    }, [coordinates]);

    return (
        <div className="plan-container">
            <div className="map-section">
                <div id="map" style={{width: '100%', height: '100%'}}></div>
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
