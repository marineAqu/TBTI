import React, { useState } from "react";
import "./main.css";
import Chat from "./Chat";

const Main = () => {

    return (
        <div className="main">
            <iframe
                src="/map_data.html"
                title="index page"
                style={{
                    width: '600px',
                    height: 'auto',
                    border: 'none',
                    marginLeft: '10px'
                }}
            />

            <div style={{marginLeft: '-100px'}}> {/* 간격을 줄이기 위한 margin-left 설정 */}
                <Chat/>
            </div>

        </div>
    );
};

export default Main;