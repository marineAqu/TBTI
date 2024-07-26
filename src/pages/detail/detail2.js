import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./detail.css";

const RestAPIFetch = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
             fetch('/api/localcreator_detail?storeId=1')
             // fetch('https://koreanjson.com/posts')
            .then((response) => response.json())
            .then(data => {console.log(data); setData(data);})
            .catch(error => console.error('data to be an array.', error));
    }, []);

    return (
        <div>
            <h1>게시판 목록</h1>
            {data && data.length > 0 ? (
                data.map((item, index) => (
                <div>
                    {item.category}
                    {/*{item.title}*/}
                </div>
                ))
            ):(
                <p>No data available</p>
            )}
        </div>
    );
}

export default RestAPIFetch;

