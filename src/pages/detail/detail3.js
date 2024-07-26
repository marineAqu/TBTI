import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import "./detail.css";

const RestAPIFetch = () => {
    console.log("detail 3 파일");
    const [category, setCategory] = useState(null);

    useEffect(() => {
        const handleSubmit = async () => {
            try {
                const response = await fetch('/api/localcreator_detail?storeId=1', {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                    }
                });

                const data = await response.json();
                setCategory(data.localcreator.category);
                console.log("카테고리: " + data.localcreator.category);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        handleSubmit();
    }, []);

    return (
        <div>
            <h1>게시판 목록</h1>
            <div>{category} 는 카테고리</div>
        </div>
    );
};

export default RestAPIFetch;

