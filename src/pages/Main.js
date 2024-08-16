import React from "react";

const Main = () => {
    return (
        <div>
            <h1>메인페이지</h1>
            <iframe
                src="/map_data.html"
                width="800"
                height="1000"
                title="index page"
                style={{border: 'none'}}
            />

        </div>
    );
};

export default Main;
