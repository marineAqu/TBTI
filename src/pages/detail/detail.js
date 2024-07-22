import React, { useEffect, useState } from "react";

const Detail = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // JSON 파일을 fetch로 불러오기
        fetch("/api/localcreator_detail")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then(jsonData => {
                setData(jsonData);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching JSON:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>상세페이지</h1>
            <div id="best_post">
                {data.map((item, index) => (
                    <p key={index}>{item.title}</p>
                ))}
            </div>
        </div>
    );
};

export default Detail;


// import React from "react";
//
// const Detail = () => {
//     return (
//         <div>
//             <h1>상세페이지</h1>
//         </div>
//     );
// };
//
//
//
//
//     function getJsonOrder(){
//         var strHTML = "";
//         $('#best_post').empty();
//
//         $.getJSON('/js/json/aa.json', function(data){
//             $.each(data, function(key, val){
//                 strHTML += `<p>`+val.title+`</p>`;
//             });
//         });
//     }//function
//
//     getjsonOrder();
//
//
//
// export default Detail;
