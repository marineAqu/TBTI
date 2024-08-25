import React, { useRef, useEffect, useState } from 'react';

const CanvasMap = ({ onRegionClick }) => {
    const canvasRef = useRef(null);
    const [hoveredRegion, setHoveredRegion] = useState(null);

    const regions = {
        '인천': [
            { x: 138, y: 98 },
            { x: 159, y: 59 },
            { x: 204, y: 6 },
            { x: 229, y: 45 },
            { x: 204, y: 102 }
        ],
        '포천': [
            { x: 204, y: 103 },
            { x: 238, y: 44 },
            { x: 284, y: 70 },
            { x: 236, y: 167 }
        ],
        '동두천': [
            { x: 196, y: 99 },
            { x: 182, y: 125 },
            { x: 202, y: 139 },
            { x: 218, y: 132 }
        ],
        '파주': [
            { x: 115, y: 113 },
            { x: 113, y: 190 },
            { x: 170, y: 175 },
            { x: 165, y: 168 },
            { x: 184, y: 102 }

        ],
        '양주': [
            { x: 175, y: 127 },
            { x: 165, y: 195 },
            { x: 184, y: 193 },
            { x: 182, y: 168 },
            { x: 210, y: 164 },
            { x: 210, y: 147 }
        ],
        '의정부': [
            { x: 189, y: 168 },
            { x: 187, y: 189 },
            { x: 205, y: 191 },
            { x: 222, y: 165 }
        ],
        '남양주': [
            { x: 203, y: 193 },
            { x: 225, y: 213 },
            { x: 251, y: 253 },
            { x: 265, y: 206 },
            { x: 258, y: 165 }
        ],
        '가평': [
            { x: 249, y: 165 },
            { x: 305, y: 221 },
            { x: 324, y: 103 },
            { x: 280, y: 98 }
        ],
        '김포': [
            { x: 68, y: 158 },
            { x: 82, y: 230 },
            { x: 104, y: 214 },
            { x: 144, y: 232 },
            { x: 110, y: 200 },
            { x: 102, y: 166 }
        ],
        '고양': [
            { x: 116, y: 194 },
            { x: 159, y: 232 },
            { x: 178, y: 211 },
            { x: 160, y: 208 },
            { x: 170, y: 176 }
        ],
        '구리': [
            { x: 211, y: 214 },
            { x: 211, y: 240 },
            { x: 223, y: 222 },
            { x: 229, y: 221 }
        ],
        '하남': [
            { x: 231, y: 224 },
            { x: 224, y: 266 },
            { x: 249, y: 244 }

        ],
        '양평': [
            { x: 274, y: 212 },
            { x: 255, y: 251 },
            { x: 362, y: 293 },
            { x: 384, y: 238 },
            { x: 316, y: 218 },
            { x: 311, y: 237 }
        ],
        '여주': [
            { x: 272, y: 272 },
            { x: 312, y: 315 },
            { x: 310, y: 349 },
            { x: 353, y: 365 },
            { x: 361, y: 300 }
        ],
        '이천': [
            { x: 279, y: 302 },
            { x: 259, y: 326 },
            { x: 316, y: 399 },
            { x: 334, y: 355 },
            { x: 302, y: 360 },
            { x: 311, y: 320 }
        ],
        '광주': [
            { x: 225, y: 266 },
            { x: 222, y: 304 },
            { x: 260, y: 327 },
            { x: 280, y: 297 },
            { x: 257, y: 246 }
        ],
        '부천': [
            { x: 129, y: 235 },
            { x: 119, y: 250 },
            { x: 139, y: 265 },
            { x: 141, y: 240 }
        ],
        '광명': [
            { x: 145, y: 263 },
            { x: 155, y: 283 },
            { x: 163, y: 267 },
            { x: 156, y: 251 }
        ],
        '안양': [
            { x: 151, y: 285 },
            { x: 164, y: 300 },
            { x: 176, y: 276 },
            { x: 172, y: 267 }
        ],
        '과천': [
            { x: 174, y: 266 },
            { x: 176, y: 282 },
            { x: 195, y: 281 },
            { x: 190, y: 262 }
        ],
        '의왕': [
            { x: 179, y: 287 },
            { x: 163, y: 315 },
            { x: 171, y: 315 },
            { x: 198, y: 282 }
        ],
        '성남': [
            { x: 196, y: 275 },
            { x: 191, y: 295 },
            { x: 216, y: 306 },
            { x: 230, y: 267 },
            { x: 217, y: 262 }
        ],
        '시흥': [
            { x: 117, y: 295 },
            { x: 114, y: 302 },
            { x: 111, y: 306 },
            { x: 158, y: 295 },
            { x: 133, y: 260 }
        ],
        '안산': [
            { x: 147, y: 298 },
            { x: 116, y: 313 },
            { x: 165, y: 320 }
        ],
        '군포': [
            { x: 165, y: 294 },
            { x: 152, y: 313 },
            { x: 163, y: 315 },
            { x: 171, y: 298 }
        ],
        '수원': [
            { x: 188, y: 303 },
            { x: 170, y: 321 },
            { x: 178, y: 340 },
            { x: 210, y: 330 }
        ],
        '용인': [
            { x: 189, y: 300 },
            { x: 208, y: 326 },
            { x: 202, y: 343 },
            { x: 225, y: 388 },
            { x: 285, y: 360 },
            { x: 255, y: 320 },
            { x: 262, y: 326 }
        ],
        '화성': [
            { x: 48, y: 316 },
            { x: 138, y: 402 },
            { x: 188, y: 356 },
            { x: 170, y: 326 }

        ],
        '오산': [
            { x: 190, y: 344 },
            { x: 188, y: 364 },
            { x: 201, y: 367 },
            { x: 209, y: 362 }
        ],
        '평택': [
            { x: 130, y: 406 },
            { x: 164, y: 439 },
            { x: 215, y: 420 },
            { x: 215, y: 363 },
            { x: 178, y: 383 }
        ],
        '안성': [
            { x: 215, y: 388 },
            { x: 218, y: 412 },
            { x: 256, y: 437 },
            { x: 289, y: 409 },
            { x: 289, y: 369 }
        ]

    };

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

        // 지도 이미지 그리기
        const image = new Image();
        image.src = '/image/img.png';
        image.onload = () => {
            ctx.drawImage(image, 0, 0, ctx.canvas.width, ctx.canvas.height);

            // 지역을 그림
            for (const [region, polygon] of Object.entries(regions)) {
                ctx.beginPath();
                ctx.moveTo(polygon[0].x, polygon[0].y);
                polygon.forEach(point => ctx.lineTo(point.x, point.y));
                ctx.closePath();

                // 현재 마우스가 위에 있는 지역인지 확인
                if (region === hoveredRegion) {
                    ctx.fillStyle = 'rgba(131,232,136,0.5)'; // 마우스가 위에 있을 때 색상 (빨간색)
                } else {
                    ctx.fillStyle = 'rgba(255,255,255,0.3)'; // 기본 색상 (파란색)
                }
                ctx.fill();
            }
        };
    };

    const handleCanvasClick = (event) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        for (const [region, polygon] of Object.entries(regions)) {
            if (isPointInPolygon(x, y, polygon)) {
                onRegionClick(region);  // 지역 클릭 시 부모 컴포넌트에 알림
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
        for (const [region, polygon] of Object.entries(regions)) {
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
    }, [hoveredRegion]);

    return (
        <canvas
            ref={canvasRef}
            width={420}
            height={450}
            onClick={handleCanvasClick}
            onMouseMove={handleMouseMove} // 마우스가 움직일 때 발생하는 이벤트 처리
            style={{ border: '1px solid black' }}
        />
    );
};

export default CanvasMap;
