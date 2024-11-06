import { BrowserRouter as Router, Route, Routes, useNavigate, Await } from "react-router-dom";
import "./App.css";
import Enter from "./components/Enter";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import MyPage from "./components/MyPage";
import MyPageAct from "./components/MyPageAct";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Enter />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/act" element={<MyPageAct />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;