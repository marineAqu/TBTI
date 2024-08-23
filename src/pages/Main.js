import React, { useState } from "react";
import "./main.css";
import Chat from "./Chat";

const Main = () => {

    return (
        <div className="main">
            <iframe
                src="/map_data.html"
                width="600"
                height="800"
                title="index page"
                style={{ border: '2px solid #ccc', overflow: 'hidden'}}
            />

            <Chat />
        </div>
    );
};

export default Main;


{/*<div className="chat-container">*/}
{/*    <div className="chat-name">*/}
{/*        대화제목*/}
{/*    </div>*/}

{/*    <div className="chat-box">*/}
{/*        {messages.map((message, index) => (*/}
{/*            <div key={index} className={`message ${message.sender}`}>*/}
{/*                {message.text}*/}
{/*            </div>*/}
{/*        ))}*/}
{/*    </div>*/}

{/*    <div className="question-button">*/}
{/*        /!* 여기에 버튼을 추가할 수 있습니다 *!/*/}
{/*    </div>*/}

{/*    <div className="input-box">*/}
{/*        <input*/}
{/*            type="text"*/}
{/*            value={input}*/}
{/*            onChange={(e) => setInput(e.target.value)}*/}
{/*            onKeyDown={handleKeyDown}*/}
{/*            placeholder="AI에게 물어보세요~"*/}
{/*        />*/}

{/*        <button onClick={sendMessage}>*/}
{/*            <img src={'./image/send.png'} alt="전송" className="send-icon" />*/}
{/*        </button>*/}

{/*    </div>*/}
{/*</div>*/}