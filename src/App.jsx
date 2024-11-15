import Main from "./components/Main.jsx";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
  BrowserRouter,
} from "react-router-dom";
import Mystudy from "./components/Mystudy.jsx";
import Groupid from "./components/Groupid.jsx";
import Header from "./components/Header.jsx";
import "../src/css/App.css";
import Login from "./components/Login.jsx";
import React, { useEffect, useState } from "react";
import MakeGroup from "./components/GroupInfo.jsx";

import Footer from "./components/Footer.jsx";

function App() {
  const [loginResult, setLoginresult] = useState(null);

  return (
    <BrowserRouter>
      <Header setLoginresult={setLoginresult} />
      <div className="container">
        <div className="content">
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="main" element={<Main />}></Route>
            <Route path="main/makegroup" element={<MakeGroup />}></Route>
            <Route path="main/appointment/:id" element={<Mystudy />}></Route>
            <Route path="main/group/:id" element={<Groupid />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Routes>
        </div>
      </div>
      {/* <Footer/> */}
    </BrowserRouter>
  );
}

export default App;
