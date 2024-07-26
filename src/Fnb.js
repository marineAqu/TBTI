import React from "react";
import {Link} from "react-router-dom";

import "./nav.css";

export const Fnb = () => {
    return (
        <div className="FNB">

            <div className="content">

                <p className="footer-text">© 2024 TraBTI. All rights reserved.</p>

                {/*<Link to="/">*/}
                    <img className="icon" alt="Git icon" src="/image/github.png"/>
                {/*</Link>*/}
            </div>
        </div>
    );
};
