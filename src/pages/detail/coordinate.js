//지역 좌표 찍는 코드
import React, { useRef, useEffect } from 'react';

const CanvasMap = () => {
    const canvasRef = useRef(null);

    const handleCanvasClick = (event) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // 클릭된 좌표를 콘솔에 출력합니다.
        console.log(`Clicked at: (${x}, ${y})`);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const image = new Image();
        image.src = '/image/map/gyeong-gi.png';  // 이미지 경로 지정
        image.onload = () => {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            width={520}
            height={470}
            onClick={handleCanvasClick}
            style={{ border: '1px solid black' }}
        />
    );
};

export default CanvasMap;
