import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import './App.css';
import { Nav } from "./Nav";
import { Fnb } from "./Fnb";

import Travel from "./pages/Travel";
import Domestic from "./pages/Domestic";
import Festival from "./pages/Festival";
import Login from "./pages/login/Login";
import Detail from "./pages/detail/detail";
import Main from "./pages/Main";
import LocalSearch from "./pages/detail/LocalSearch";
import Local from "./pages/detail/local";
import Sign from "./pages/login/Sign";
import TBTITest from "./pages/Tbti_test";
import Plan from "./pages/plan";
import Mypage from "./pages/login/Mypage";

function App() {
    const location = useLocation();  // 현재 경로 가져오기
    const excludeNav = ["/login", "/sign"];  // Nav가 보이지 않을 경로
    const excludeFnb = ["/login", "/sign", "/tbti-test"]; // Fnb가 보이지 않을 경로

    return (
        <div>
            {!excludeNav.includes(location.pathname) && (
                <header>
                    <Nav/>
                </header>
            )}
            <main>
                <Routes>
                    <Route path="/" element={<Main/>}/>
                    <Route path="/travel" element={<Travel/>}/>
                    <Route path="/domestic" element={<Domestic/>}/>
                    <Route path="/festival" element={<Festival/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/detail/:storeId" element={<Detail/>}/>
                    <Route path="/search" element={<LocalSearch/>}/>
                    <Route path="/local" element={<Local/>}/>
                    <Route path="/sign" element={<Sign/>}/>
                    <Route path="/tbti-test" element={<TBTITest />} />
                    <Route path="/plan" element={<Plan />} />
                    <Route path="/mypage" element={<Mypage />} />


                </Routes>
            </main>

            {!excludeFnb.includes(location.pathname) && (
                <footer>
                    <Fnb/>
                </footer>
            )}
        </div>
    );
}

export default App;
