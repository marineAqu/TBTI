import React, { useState } from "react";
import "./main.css";
import Chat from "./Chat";

const Main = () => {

    return (
        <div className="main">
            <iframe
                src="/map_data.html"
                width="400"
                height="600"
                title="index page"
                style={{ border: '2px solid #ccc', overflow: 'hidden'}}
            />

            <Chat />

        </div>
    );
};

export default Main;