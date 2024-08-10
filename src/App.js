import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

function App() {
    return (
        <Router>
            <header>
                <Nav />
            </header>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/travel" element={<Travel />} />
                <Route path="/domestic" element={<Domestic />} />
                <Route path="/festival" element={<Festival />} />
                <Route path="/login" element={<Login />} />
                <Route path="/detail/:storeId" element={<Detail />} />
                <Route path="/main" element={<Main />} />
                <Route path="/search" element={<LocalSearch />} />
                {<Route path="/local" element={<Local/>} />}
            </Routes>

            <footer>
                <Fnb />
            </footer>

        </Router>
    );
}

export default App;
