import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import { Nav } from "./Nav";
import { Fnb } from "./Fnb";

import Travel from "./pages/Travel";
import Domestic from "./pages/Domestic";
import Festival from "./pages/Festival";
import Login from "./pages/login/Login";
import Detail2 from "./pages/detail/detail2";

function App() {
    return (
        <Router>
            <header>
                <Nav />
            </header>
            <Routes>
                <Route path="/travel" element={<Travel />} />
                <Route path="/domestic" element={<Domestic />} />
                <Route path="/festival" element={<Festival />} />
                <Route path="/login" element={<Login />} />
                <Route path="/detail/:storeId" element={<Detail2 />} />
            </Routes>

            <footer>
                <Fnb />
            </footer>

        </Router>
    );
}

export default App;
