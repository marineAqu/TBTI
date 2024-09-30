import React from "react";
import {Link} from "react-router-dom";

import "./nav.css";

export const Fnb = () => {
    return (
        <div className="FNB">

            <div className="content">

                <p className="footer-text">© 2024 TraBTI. All rights reserved.</p>

                <a href="https://github.com/marineAqu/TBTI" target="_blank" rel="noopener noreferrer">
                    <img className="icon" alt="Git icon" src="/image/github.png"/>
                </a>
            </div>
        </div>
    );
};
