import React, { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const CanvasMap = ({ onRegionClick }) => {
    const canvasRef = useRef(null);
    const [hoveredRegion, setHoveredRegion] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('query');  // URL 쿼리에서 지역명을 가져옴

    const regions = {
        '경기도': {
            regionData: {
                '연천군': [
                    {x: 255, y: 7},
                    {x: 169, y: 107},
                    {x: 245, y: 108},
                    {x: 278, y: 42},
                ],
                '포천시': [
                    {x: 284, y: 53},
                    {x: 259, y: 117},
                    {x: 307, y: 169},
                    {x: 356, y: 83}
                ],
                '동두천시': [
                    {x: 243, y: 107},
                    {x: 230, y: 133},
                    {x: 260, y: 142},
                    {x: 270, y: 130}
                ],
                '파주시': [
                    {x: 146, y: 116},
                    {x: 137, y: 193},
                    {x: 207, y: 183},
                    {x: 212, y: 108}

                ],
                '양주시': [
                    {x: 218, y: 129},
                    {x: 212, y: 174},
                    {x: 253, y: 173},
                    {x: 260, y: 148}
                ],
                '의정부시': [
                    {x: 231, y: 182},
                    {x: 236, y: 202},
                    {x: 255, y: 199},
                    {x: 267, y: 181}
                ],
                '남양주시': [
                    {x: 273, y: 182},
                    {x: 256, y: 203},
                    {x: 313, y: 255},
                    {x: 337, y: 218}
                ],
                '가평군': [
                    {x: 357, y: 89},
                    {x: 309, y: 169},
                    {x: 363, y: 223},
                    {x: 403, y: 135}
                ],
                '김포시': [
                    {x: 93, y: 173},
                    {x: 107, y: 239},
                    {x: 135, y: 192}
                ],
                '고양시': [
                    {x: 141, y: 204},
                    {x: 187, y: 241},
                    {x: 208, y: 189}
                ],
                '구리시': [
                    {x: 260, y: 219},
                    {x: 260, y: 245},
                    {x: 278, y: 237}
                ],
                '하남시': [
                    {x: 278, y: 238},
                    {x: 272, y: 269},
                    {x: 312, y: 259}

                ],
                '양평군': [
                    {x: 335, y: 219},
                    {x: 316, y: 257},
                    {x: 346, y: 285},
                    {x: 449, y: 300},
                    {x: 456, y: 239}
                ],
                '여주시': [
                    {x: 346, y: 290},
                    {x: 386, y: 325},
                    {x: 379, y: 367},
                    {x: 427, y: 375},
                    {x: 446, y: 313}
                ],
                '이천시': [
                    {x: 358, y: 314},
                    {x: 386, y: 331},
                    {x: 375, y: 367},
                    {x: 413, y: 384},
                    {x: 392, y: 413},
                    {x: 323, y: 358}
                ],
                '광주시': [
                    {x: 282, y: 271},
                    {x: 279, y: 317},
                    {x: 323, y: 330},
                    {x: 352, y: 306},
                    {x: 330, y: 259}
                ],
                '부천시': [
                    {x: 167, y: 248},
                    {x: 159, y: 262},
                    {x: 180, y: 276}
                ],
                '광명시': [
                    {x: 192, y: 269},
                    {x: 179, y: 277},
                    {x: 191, y: 293},
                    {x: 202, y: 285}
                ],
                '안양시': [
                    {x: 208, y: 281},
                    {x: 195, y: 294},
                    {x: 198, y: 304},
                    {x: 221, y: 293}
                ],
                '과천시': [
                    {x: 228, y: 275},
                    {x: 218, y: 281},
                    {x: 224, y: 296},
                    {x: 238, y: 287}
                ],
                '의왕시': [
                    {x: 226, y: 295},
                    {x: 210, y: 325},
                    {x: 217, y: 327},
                    {x: 241, y: 298}
                ],
                '성남시': [
                    {x: 265, y: 274},
                    {x: 241, y: 286},
                    {x: 235, y: 302},
                    {x: 264, y: 315},
                    {x: 283, y: 288}
                ],
                '시흥시': [
                    {x: 162, y: 280},
                    {x: 138, y: 315},
                    {x: 145, y: 324},
                    {x: 187, y: 297}
                ],
                '안산시': [
                    {x: 197, y: 308},
                    {x: 150, y: 325},
                    {x: 186, y: 335}
                ],
                '군포시': [
                    {x: 206, y: 302},
                    {x: 191, y: 321},
                    {x: 209, y: 327},
                    {x: 217, y: 312}
                ],
                '수원시': [
                    {x: 235, y: 313},
                    {x: 209, y: 328},
                    {x: 231, y: 351},
                    {x: 252, y: 336}
                ],
                '용인시': [
                    {x: 282, y: 317},
                    {x: 250, y: 352},
                    {x: 275, y: 366},
                    {x: 270, y: 397},
                    {x: 303, y: 380},
                    {x: 333, y: 393},
                    {x: 350, y: 380}
                ],
                '화성시': [
                    {x: 172, y: 338},
                    {x: 155, y: 417},
                    {x: 223, y: 401},
                    {x: 229, y: 355}

                ],
                '오산시': [
                    {x: 237, y: 362},
                    {x: 229, y: 369},
                    {x: 240, y: 384},
                    {x: 257, y: 377}
                ],
                '평택시': [
                    {x: 169, y: 424},
                    {x: 204, y: 459},
                    {x: 269, y: 430},
                    {x: 237, y: 382}
                ],
                '안성시': [
                    {x: 267, y: 397},
                    {x: 270, y: 439},
                    {x: 310, y: 463},
                    {x: 373, y: 400}
                ]
            },
            imagePath: '/image/map/gyeong-gi.png'
        },

        '서울특별시': {
            regionData: {
                '도봉구': [
                    {x: 138, y: 98},
                    {x: 159, y: 59},
                    {x: 204, y: 6},
                    {x: 229, y: 45},
                    {x: 204, y: 102}
                ],
                '노원구': [
                    {x: 204, y: 103},
                    {x: 238, y: 44},
                    {x: 284, y: 70},
                    {x: 236, y: 167}
                ],
                '강북구': [
                    {x: 196, y: 99},
                    {x: 182, y: 125},
                    {x: 202, y: 139},
                    {x: 218, y: 132}
                ],
                '성북구': [
                    {x: 115, y: 113},
                    {x: 113, y: 190},
                    {x: 170, y: 175},
                    {x: 165, y: 168},
                    {x: 184, y: 102}

                ],
                '종로구': [
                    {x: 175, y: 127},
                    {x: 165, y: 195},
                    {x: 184, y: 193},
                    {x: 182, y: 168},
                    {x: 210, y: 164},
                    {x: 210, y: 147}
                ],
                '은평구': [
                    {x: 189, y: 168},
                    {x: 187, y: 189},
                    {x: 205, y: 191},
                    {x: 222, y: 165}
                ],
                '동대문구': [
                    {x: 203, y: 193},
                    {x: 225, y: 213},
                    {x: 251, y: 253},
                    {x: 265, y: 206},
                    {x: 258, y: 165}
                ],
                '중랑구': [
                    {x: 249, y: 165},
                    {x: 305, y: 221},
                    {x: 324, y: 103},
                    {x: 280, y: 98}
                ],
                '서대문구': [
                    {x: 68, y: 158},
                    {x: 82, y: 230},
                    {x: 104, y: 214},
                    {x: 144, y: 232},
                    {x: 110, y: 200},
                    {x: 102, y: 166}
                ],
                '중구': [
                    {x: 116, y: 194},
                    {x: 159, y: 232},
                    {x: 178, y: 211},
                    {x: 160, y: 208},
                    {x: 170, y: 176}
                ],
                '마포구': [
                    {x: 211, y: 214},
                    {x: 211, y: 240},
                    {x: 223, y: 222},
                    {x: 229, y: 221}
                ],
                '용산구': [
                    {x: 231, y: 224},
                    {x: 224, y: 266},
                    {x: 249, y: 244}

                ],
                '성동구': [
                    {x: 274, y: 212},
                    {x: 255, y: 251},
                    {x: 362, y: 293},
                    {x: 384, y: 238},
                    {x: 316, y: 218},
                    {x: 311, y: 237}
                ],
                '광진구': [
                    {x: 272, y: 272},
                    {x: 312, y: 315},
                    {x: 310, y: 349},
                    {x: 353, y: 365},
                    {x: 361, y: 300}
                ],
                '강서구': [
                    {x: 279, y: 302},
                    {x: 259, y: 326},
                    {x: 316, y: 399},
                    {x: 334, y: 355},
                    {x: 302, y: 360},
                    {x: 311, y: 320}
                ],
                '양천구': [
                    {x: 225, y: 266},
                    {x: 222, y: 304},
                    {x: 260, y: 327},
                    {x: 280, y: 297},
                    {x: 257, y: 246}
                ],
                '영등포구': [
                    {x: 129, y: 235},
                    {x: 119, y: 250},
                    {x: 139, y: 265},
                    {x: 141, y: 240}
                ],
                '구로구': [
                    {x: 145, y: 263},
                    {x: 155, y: 283},
                    {x: 163, y: 267},
                    {x: 156, y: 251}
                ],
                '금천구': [
                    {x: 151, y: 285},
                    {x: 164, y: 300},
                    {x: 176, y: 276},
                    {x: 172, y: 267}
                ],
                '동작구': [
                    {x: 174, y: 266},
                    {x: 176, y: 282},
                    {x: 195, y: 281},
                    {x: 190, y: 262}
                ],
                '관악구': [
                    {x: 179, y: 287},
                    {x: 163, y: 315},
                    {x: 171, y: 315},
                    {x: 198, y: 282}
                ],
                '서초구': [
                    {x: 196, y: 275},
                    {x: 191, y: 295},
                    {x: 216, y: 306},
                    {x: 230, y: 267},
                    {x: 217, y: 262}
                ],
                '강남구': [
                    {x: 117, y: 295},
                    {x: 114, y: 302},
                    {x: 111, y: 306},
                    {x: 158, y: 295},
                    {x: 133, y: 260}
                ],
                '송파구': [
                    {x: 147, y: 298},
                    {x: 116, y: 313},
                    {x: 165, y: 320}
                ],
                '강동구': [
                    {x: 165, y: 294},
                    {x: 152, y: 313},
                    {x: 163, y: 315},
                    {x: 171, y: 298}
                ]
            },
            imagePath: '/image/map/seoul.png'
        }
    };

    // 현재 query에 해당하는 지역 데이터를 가져옵니다.
    const currentRegionData = regions[query] || regions['경기도']; // 기본값은 경기도로 설정

    const isPointInPolygon = (x, y, polygon) => {
        let inside = false;
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
            const xi = polygon[i].x, yi = polygon[i].y;
            const xj = polygon[j].x, yj = polygon[j].y;

            const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
        }
        return inside;
    };

    const drawRegions = (ctx) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        const image = new Image();
        image.src = currentRegionData.imagePath;
        image.onload = () => {
            ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);

            for (const [region, polygon] of Object.entries(currentRegionData.regionData)) {
                ctx.beginPath();
                ctx.moveTo(polygon[0].x, polygon[0].y);
                polygon.forEach(point => ctx.lineTo(point.x, point.y));
                ctx.closePath();

                ctx.fillStyle = region === hoveredRegion ? 'rgba(131,232,136,0.5)' : 'rgba(255,255,255,0.3)';
                ctx.fill();
            }
        };
    };

    const handleCanvasClick = (event) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        for (const [region, polygon] of Object.entries(currentRegionData.regionData)) {
            if (isPointInPolygon(x, y, polygon)) {
                // 지역 클릭 시 onRegionClick 함수 호출
                if (onRegionClick) {
                    onRegionClick(region);
                }
                // 네비게이션도 계속 진행
                navigate(`/local?query=${region}`);
                break;
            }
        }
    };

    const handleMouseMove = (event) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        let foundRegion = null;
        for (const [region, polygon] of Object.entries(currentRegionData.regionData)) {
            if (isPointInPolygon(x, y, polygon)) {
                foundRegion = region;
                break;
            }
        }

        if (foundRegion !== hoveredRegion) {
            setHoveredRegion(foundRegion);
        }
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        drawRegions(ctx);  // 마우스가 움직일 때마다 다시 그리기
    }, [hoveredRegion, currentRegionData]);

    return (
        <canvas
            ref={canvasRef}
            width={520}
            height={470}
            onClick={handleCanvasClick}
            onMouseMove={handleMouseMove} // 마우스가 움직일 때 발생하는 이벤트 처리
            style={{border: '1px solid black'}}
        />
    );
};


export default CanvasMap;
