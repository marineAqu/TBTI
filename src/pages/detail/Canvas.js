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
                    {x: 304, y: 23},
                    {x: 296, y: 49},
                    {x: 306, y: 78},
                    {x: 303, y: 96},
                    {x: 332, y: 129},
                    {x: 345, y: 117},
                    {x: 342, y: 47},
                    {x: 305, y: 23}
                ],
                '노원구': [
                    {x: 342, y: 47},
                    {x: 344, y: 118},
                    {x: 332, y: 131},
                    {x: 354, y: 156},
                    {x: 403, y: 145},
                    {x: 408, y: 119},
                    {x: 389, y: 105},
                    {x: 391, y: 46},
                    {x: 360, y: 39},
                    {x: 343, y: 47}
                ],
                '강북구': [
                    {x: 271, y: 121},
                    {x: 266, y: 89},
                    {x: 280, y: 57},
                    {x: 295, y: 50},
                    {x: 309, y: 72},
                    {x: 302, y: 91},
                    {x: 342, y: 143},
                    {x: 323, y: 163},
                    {x: 313, y: 162},
                    {x: 313, y: 162},
                    {x: 303, y: 155},
                    {x: 288, y: 138}
                ],
                '성북구': [
                    {x: 269, y: 121},
                    {x: 260, y: 125},
                    {x: 274, y: 169},
                    {x: 264, y: 179},
                    {x: 288, y: 194},
                    {x: 310, y: 210},
                    {x: 362, y: 167},
                    {x: 341, y: 145},
                    {x: 311, y: 159}

                ],
                '종로구': [
                    {x: 259 , y: 127},
                    {x: 232, y: 139},
                    {x: 249, y: 222},
                    {x: 311, y: 221},
                    {x: 311, y: 209},
                    {x: 267, y: 183}
                ],
                '은평구': [
                    {x: 161, y: 191},
                    {x: 182, y: 212},
                    {x: 188, y: 210},
                    {x: 190, y: 202},
                    {x: 196, y: 199},
                    {x: 202, y: 202},
                    {x: 216, y: 190},
                    {x: 236, y: 168},
                    {x: 236, y: 141},
                    {x: 249, y: 132},
                    {x: 247, y: 100},
                    {x: 232, y: 87},
                    {x: 199, y: 112},
                    {x: 183, y: 180},
                    {x: 179, y: 193}
                ],
                '동대문구': [
                    {x: 359, y: 167},
                    {x: 312, y: 216},
                    {x: 331, y: 217},
                    {x: 360, y: 236},
                    {x: 369, y: 222}
                ],
                '중랑구': [
                    {x: 354, y: 156},
                    {x: 409, y: 149},
                    {x: 408, y: 200},
                    {x: 395, y: 218},
                    {x: 372, y: 221},
                    {x: 361, y: 189}
                ],
                '서대문구': [
                    {x: 185, y: 214},
                    {x: 193, y: 197},
                    {x: 212, y: 197},
                    {x: 232, y: 170},
                    {x: 241, y: 212},
                    {x: 255, y: 235},
                    {x: 213, y: 246},
                    {x: 210, y: 230}
                ],
                '중구': [
                    {x: 256, y: 227},
                    {x: 255, y: 237},
                    {x: 252, y: 247},
                    {x: 295, y: 257},
                    {x: 316, y: 233},
                    {x: 311, y: 224}
                ],
                '마포구': [
                    {x: 140, y: 214},
                    {x: 158, y: 207},
                    {x: 161, y: 192},
                    {x: 215, y: 244},
                    {x: 244, y: 245},
                    {x: 237, y: 269},
                    {x: 181, y: 252}
                ],
                '용산구': [
                    {x: 238, y: 268},
                    {x: 251, y: 252},
                    {x: 301, y: 274},
                    {x: 269, y: 312},
                    {x: 244, y: 301}

                ],
                '성동구': [
                    {x: 303, y: 274},
                    {x: 297, y: 263},
                    {x: 329, y: 222},
                    {x: 347, y: 238},
                    {x: 364, y: 238},
                    {x: 348, y: 280},
                    {x: 317, y: 268}
                ],
                '광진구': [
                    {x: 348, y: 283},
                    {x: 372, y: 227},
                    {x: 392, y: 224},
                    {x: 404, y: 243},
                    {x: 382, y: 282}
                ],
                '강서구': [
                    {x: 82, y: 168},
                    {x: 41, y: 243},
                    {x: 103, y: 269},
                    {x: 108, y: 257},
                    {x: 121, y: 287},
                    {x: 140, y: 284},
                    {x: 144, y: 257},
                    {x: 157, y: 256},
                    {x: 160, y: 248}
                ],
                '양천구': [
                    {x: 106, y: 259},
                    {x: 100, y: 316},
                    {x: 152, y: 316},
                    {x: 166, y: 262},
                    {x: 147, y: 259},
                    {x: 141, y: 282},
                    {x: 120, y: 286}
                ],
                '영등포구': [
                    {x: 161, y: 254},
                    {x: 170, y: 280},
                    {x: 163, y: 299},
                    {x: 172, y: 313},
                    {x: 184, y: 346},
                    {x: 203, y: 332},
                    {x: 210, y: 307},
                    {x: 232, y: 303},
                    {x: 228, y: 280}
                ],
                '구로구': [
                    {x: 101, y: 315},
                    {x: 88, y: 333},
                    {x: 97, y: 348},
                    {x: 93, y: 364},
                    {x: 124, y: 368},
                    {x: 149, y: 341},
                    {x: 179, y: 359},
                    {x: 173, y: 316},
                    {x: 160, y: 302},
                    {x: 152, y: 324},
                    {x: 139, y: 314},
                    {x: 115, y: 324}
                ],
                '금천구': [
                    {x: 154, y: 348},
                    {x: 171, y: 400},
                    {x: 188, y: 427},
                    {x: 208, y: 407},
                    {x: 199, y: 394},
                    {x: 192, y: 360},
                    {x: 170, y: 360}
                ],
                '동작구': [
                    {x: 187, y: 346},
                    {x: 202, y: 333},
                    {x: 231, y: 306},
                    {x: 267, y: 323},
                    {x: 270, y: 363},
                    {x: 254, y: 364},
                    {x: 245, y: 337},
                    {x: 217, y: 338}
                ],
                '관악구': [
                    {x: 185, y: 354},
                    {x: 196, y: 388},
                    {x: 212, y: 403},
                    {x: 223, y: 424},
                    {x: 246, y: 423},
                    {x: 272, y: 391},
                    {x: 268, y: 361},
                    {x: 252, y: 367},
                    {x: 247, y: 344}
                ],
                '서초구': [
                    {x: 272, y: 327},
                    {x: 274, y: 387},
                    {x: 318, y: 384},
                    {x: 343, y: 435},
                    {x: 388, y: 399},
                    {x: 377, y: 371},
                    {x: 339, y: 377},
                    {x: 304, y: 299}
                ],
                '강남구': [
                    {x: 303, y: 296},
                    {x: 338, y: 372},
                    {x: 367, y: 367},
                    {x: 377, y: 367},
                    {x: 388, y: 392},
                    {x: 416, y: 380},
                    {x: 400, y: 344},
                    {x: 364, y: 328},
                    {x: 360, y: 301},
                    {x: 315, y: 279}
                ],
                '송파구': [
                    {x: 358, y: 302},
                    {x: 361, y: 324},
                    {x: 396, y: 337},
                    {x: 419, y: 381},
                    {x: 458, y: 326},
                    {x: 437, y: 307},
                    {x: 437, y: 317},
                    {x: 417, y: 292},
                    {x: 415, y: 272}
                ],
                '강동구': [
                    {x: 414, y: 242},
                    {x: 408, y: 270},
                    {x: 417, y: 270},
                    {x: 414, y: 288},
                    {x: 437, y: 299},
                    {x: 457, y: 265},
                    {x: 480, y: 264},
                    {x: 467, y: 210},
                    {x: 446, y: 228},
                    {x: 429, y: 226}
                ]
            },
            imagePath: '/image/map/seoul.png'
        },
            '강원도': {
                regionData: {
                    '고성군': [
                        {x: 250, y: 86},
                        {x: 269, y: 67},
                        {x: 270, y: 30},
                        {x: 290, y: 36},
                        {x: 300, y: 68},
                        {x: 336, y: 125},
                        {x: 302, y: 134},
                        {x: 301, y: 124},
                        {x: 291, y: 126},
                        {x: 275, y: 118},
                        {x: 272, y: 102}
                    ],
                    '속초시': [
                        {x: 298, y: 137},
                        {x: 336, y: 127},
                        {x: 341, y: 141},
                        {x: 308, y: 151}
                    ],
                    '양양군': [
                        {x: 295, y: 160},
                        {x: 342, y: 143},
                        {x: 352, y: 163},
                        {x: 363, y: 166},
                        {x: 376, y: 180},
                        {x: 371, y: 186},
                        {x: 386, y: 204},
                        {x: 338, y: 219},
                        {x: 312, y: 214},
                        {x: 309, y: 199},
                        {x: 315, y: 197},
                        {x: 315, y: 175},
                        {x: 297, y: 171}
                    ],
                    '강릉시': [
                        {x: 334, y: 221},
                        {x: 384, y: 204},
                        {x: 416, y: 250},
                        {x: 433, y: 253},
                        {x: 437, y: 272},
                        {x: 448, y: 281},
                        {x: 440, y: 294},
                        {x: 411, y: 296},
                        {x: 405, y: 293},
                        {x: 396, y: 294},
                        {x: 394, y: 304},
                        {x: 386, y: 306},
                        {x: 381, y: 301},
                        {x: 346, y: 296},
                        {x: 360, y: 289},
                        {x: 370, y: 284},
                        {x: 374, y: 270},
                        {x:371, y: 252},
                        {x: 362, y: 246},
                        {x: 342, y: 240}
                    ],
                    '동해시': [
                        {x: 420, y: 299},
                        {x: 439, y: 297},
                        {x: 442, y: 286},
                        {x: 452, y: 284},
                        {x: 466, y: 315},
                        {x: 434, y: 328},
                        {x: 422, y: 321}
                    ],
                    '삼척시': [
                        {x: 466, y: 316},
                        {x: 472, y: 328},
                        {x: 477, y: 329},
                        {x: 515, y: 393},
                        {x: 486, y: 412},
                        {x: 486, y: 422},
                        {x: 474, y: 424},
                        {x: 469, y: 415},
                        {x: 459, y: 416},
                        {x: 454, y: 396},
                        {x: 440, y: 395},
                        {x: 431, y: 379},
                        {x: 434, y: 355},
                        {x: 419, y: 358},
                        {x: 416, y: 368},
                        {x: 413, y: 379},
                        {x: 402, y: 369},
                        {x:405, y: 327},
                        {x: 422, y: 323},
                        {x: 434, y: 329}
                    ],
                    '인제군': [
                        {x: 228, y: 101},
                        {x: 249, y: 89},
                        {x: 269, y: 105},
                        {x: 276, y: 121},
                        {x: 288, y: 127},
                        {x: 300, y: 123},
                        {x: 302, y: 137},
                        {x: 300, y: 142},
                        {x: 306, y: 153},
                        {x: 297, y: 161},
                        {x: 298, y: 172},
                        {x: 309, y: 172},
                        {x: 314, y: 197},
                        {x: 309, y: 200},
                        {x: 309, y: 216},
                        {x: 297, y: 220},
                        {x: 286, y: 230},
                        {x: 273, y: 222},
                        {x:242, y: 219},
                        {x: 213, y: 204},
                        {x: 205, y: 204},
                        {x: 205, y: 194},
                        {x: 230, y: 180},
                        {x: 224, y: 154},
                        {x: 230, y: 129},
                        {x: 237, y: 124},
                        {x: 237, y: 109}
                    ],
                    '양구군': [
                        {x: 163, y: 106},
                        {x: 164, y: 102},
                        {x:178, y: 97},
                        {x: 225, y: 102},
                        {x: 234, y: 108},
                        {x: 236, y: 123},
                        {x: 228, y: 127},
                        {x: 221, y: 152},
                        {x: 230, y: 175},
                        {x: 212, y: 186},
                        {x: 192, y: 185},
                        {x: 185, y: 175},
                        {x: 185, y: 166},
                        {x: 177, y: 155},
                        {x: 179, y: 139},
                        {x: 170, y: 134}
                    ],
                    '화천군': [
                        {x: 77, y: 163},
                        {x: 93, y: 158},
                        {x: 93, y: 142},
                        {x: 100, y: 142},
                        {x: 117, y: 120},
                        {x: 120, y: 102},
                        {x: 154, y: 99},
                        {x: 171, y: 124},
                        {x: 167, y: 136},
                        {x: 175, y: 139},
                        {x: 176, y: 155},
                        {x: 184, y: 173},
                        {x: 174, y: 173},
                        {x: 172, y: 186},
                        {x: 154, y: 186},
                        {x: 154, y: 180},
                        {x: 133, y: 180},
                        {x: 114, y: 169},
                        {x: 101, y: 194},
                        {x: 85, y: 188}
                    ],
                    '철원군': [
                        {x: 9, y: 100},
                        {x: 117, y: 100},
                        {x: 113, y: 111},
                        {x: 117, y: 118},
                        {x: 93, y: 140},
                        {x: 93, y: 154},
                        {x: 58, y: 164},
                        {x: 42, y: 157},
                        {x: 46, y: 146},
                        {x: 43, y: 145},
                        {x: 36, y: 152},
                        {x: 26, y: 149},
                        {x: 15, y: 133},
                        {x: 7, y: 129}
                    ],
                    '춘천시': [
                        {x: 98, y: 192},
                        {x: 108, y: 180},
                        {x: 112, y: 169},
                        {x: 116, y: 174},
                        {x: 161, y: 187},
                        {x: 173, y: 185},
                        {x: 173, y: 177},
                        {x: 186, y: 177},
                        {x: 191, y: 184},
                        {x: 211, y: 186},
                        {x: 204, y: 193},
                        {x: 202, y: 217},
                        {x: 193, y: 231},
                        {x: 181, y: 227},
                        {x: 168, y: 230},
                        {x: 172, y: 250},
                        {x: 144, y: 254},
                        {x: 127, y: 270},
                        {x: 114, y: 260},
                        {x:105, y: 260},
                        {x: 96, y: 254},
                        {x: 101, y: 250},
                        {x: 96, y: 230},
                        {x: 117, y: 214},
                        {x: 114, y: 201}
                    ],
                    '홍천군': [
                        {x: 104, y: 262},
                        {x: 114, y: 259},
                        {x: 128, y: 273},
                        {x: 141, y: 256},
                        {x: 165, y: 256},
                        {x: 175, y: 249},
                        {x: 167, y: 230},
                        {x: 178, y: 228},
                        {x: 190, y: 235},
                        {x: 205, y: 204},
                        {x: 218, y: 212},
                        {x: 240, y: 216},
                        {x: 251, y: 232},
                        {x:270, y: 221},
                        {x: 280, y: 229},
                        {x: 314, y: 215},
                        {x: 333, y: 221},
                        {x: 337, y: 233},
                        {x: 325, y: 240},
                        {x: 322, y: 250},
                        {x: 303, y: 260},
                        {x: 276, y: 268},
                        {x: 266, y: 282},
                        {x: 240, y: 270},
                        {x: 213, y: 284},
                        {x: 204, y: 280},
                        {x: 169, y: 297},
                        {x: 113, y: 283},
                        {x: 103, y: 277}
                    ],
                    '원주시': [
                        {x: 1588, y: 329},
                        {x: 169, y: 331},
                        {x: 177, y: 338},
                        {x: 187, y: 316},
                        {x: 192, y: 326},
                        {x: 226, y: 334},
                        {x: 226, y: 345},
                        {x: 218, y: 350},
                        {x: 217, y: 358},
                        {x: 229, y: 364},
                        {x: 232, y: 369},
                        {x: 252, y: 366},
                        {x: 256, y: 379},
                        {x: 217, y: 393},
                        {x: 213, y: 380},
                        {x: 194, y: 380},
                        {x: 197, y:393},
                        {x: 154, y: 399},
                        {x: 157, y: 337}
                    ],
                    '횡성군': [
                        {x: 168, y: 300},
                        {x: 201, y: 280},
                        {x: 209, y: 286},
                        {x: 234, y: 270},
                        {x: 266, y: 284},
                        {x: 272, y: 305},
                        {x: 263, y: 318},
                        {x: 265, y: 318},
                        {x: 265, y: 334},
                        {x: 250, y:340},
                        {x: 248, y: 350},
                        {x: 234, y: 364},
                        {x: 219, y: 356},
                        {x: 228, y: 332},
                        {x: 190, y: 316},
                        {x: 178, y: 338},
                        {x: 160, y: 328},
                        {x: 151, y: 318}
                    ],
                    '평창군': [
                        {x: 265, y: 279},
                        {x: 322, y: 253},
                        {x: 337, y: 234},
                        {x: 349, y: 244},
                        {x: 367, y: 248},
                        {x: 371, y:281},
                        {x: 343, y: 296},
                        {x: 333, y: 318},
                        {x: 320, y: 328},
                        {x: 338, y: 364},
                        {x: 336, y: 368},
                        {x: 314, y: 365},
                        {x: 309, y: 355},
                        {x: 291, y: 364},
                        {x: 267, y: 337},
                        {x: 261, y: 324},
                        {x: 272, y: 310}
                    ],
                    '영월군': [
                        {x: 232, y: 364},
                        {x: 238, y: 358},
                        {x: 245, y: 353},
                        {x: 246, y: 344},
                        {x: 271, y: 340},
                        {x: 287, y: 361},
                        {x: 306, y: 356},
                        {x: 311, y: 364},
                        {x: 335, y: 369},
                        {x: 350, y: 389},
                        {x: 377, y: 388},
                        {x: 402, y: 396},
                        {x: 413, y:418},
                        {x: 397, y: 422},
                        {x: 392, y: 414},
                        {x: 382, y: 417},
                        {x: 381, y: 428},
                        {x: 354, y: 424},
                        {x: 330, y: 414},
                        {x: 322, y: 409},
                        {x: 304, y: 410},
                        {x: 296, y: 402},
                        {x: 270, y: 403},
                        {x: 278, y: 387},
                        {x: 255, y: 379},
                        {x: 252, y: 367},
                        {x: 233, y: 369}
                    ],
                    '정선군': [
                        {x: 344, y: 295},
                        {x: 384, y: 306},
                        {x: 392, y: 304},
                        {x: 395, y: 294},
                        {x: 404, y: 294},
                        {x: 419, y: 302},
                        {x: 421, y: 321},
                        {x: 403, y: 327},
                        {x: 402, y: 372},
                        {x: 411, y: 380},
                        {x: 407, y: 398},
                        {x: 378, y: 386},
                        {x: 362, y: 393},
                        {x: 337, y: 380},
                        {x: 336, y: 370},
                        {x: 341, y: 361},
                        {x: 326, y: 350},
                        {x: 326, y: 337},
                        {x: 320, y: 330},
                        {x: 335, y: 316}
                    ],
                    '태백시': [
                        {x: 405, y: 397},
                        {x: 414, y: 393},
                        {x: 413, y: 378},
                        {x: 416, y: 364},
                        {x: 433, y: 353},
                        {x: 434, y: 370},
                        {x: 431, y: 377},
                        {x: 437, y: 393},
                        {x: 453, y: 397},
                        {x: 459, y: 412},
                        {x: 440, y: 418},
                        {x: 419, y: 414},
                        {x: 416, y: 421},
                        {x: 405, y: 409}
                    ]
            },
            imagePath: '/image/map/gangwon.png'

        }
    };
    // 현재 query에 해당하는 지역 데이터를 가져옵니다.
    const currentRegionData = regions[query] || regions['강원도']; // 기본값 설정
    console.log('Current Region Data:', currentRegionData);


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
