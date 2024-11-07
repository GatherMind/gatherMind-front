import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Enter from "./components/Enter";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Mypage from "./components/Mypage";
import MypageAct from "./components/MypageAct";
import Goodbye from "./components/Goodbye";
import EditProfile from "./components/EditProfile";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Enter />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/mypage/act" element={<MypageAct />} />
          <Route path="/goodbye" element={<Goodbye />} />
          <Route path="/editprofile" element={<EditProfile />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
