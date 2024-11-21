import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import { AuthProvider } from "./context/AuthContext";

import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Mypage from "./components/MyPage";
import Goodbye from "./components/Goodbye";
import EditProfile from "./components/EditProfile";
import Serious from "./components/Serious";
import Header from "./components/Header.jsx";

import CreateSchedule from "./pages/CreateSchedule";
import QuestionDetail from "./pages/QuestionDetail";
import QuestionFormPage from "./pages/QuestionFormPage";
import StudyInfo from "./pages/StudyInfo";
import StudyFormPage from "./pages/StudyFormPage";
import JoinedStudy from "./components/JoinedStudy";
import WrittenQuestion from "./components/WrittenQuestion";
import WrittenAnswer from "./components/WrittenAnswer";
import Main from "./components/Main.jsx";
import { useState } from "react";
import PrivateRoute from "./components/PrivateRoute.jsx";
import MakeGroup from "./components/GroupInfo.jsx";
import Groupid from "./components/Groupid";

function App() {
  const [loginResult, setLoginresult] = useState(null);

  function handleLoginStatus(e) {
    setLoginresult(e);
  }

  return (
    <AuthProvider>
      <Router>
        <div className="container">
          <Header loginResult={loginResult} />
          <div className="content">
            <Routes>
              <Route
                path="/"
                element={<Main handleLoginStatus={handleLoginStatus} />}
              ></Route>
              <Route path="main/makegroup" element={<MakeGroup />}></Route>
              <Route path="main/group/:id" element={<Groupid />}></Route>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              {/* <Route path="/mypage" element={<Mypage />} />
              <Route path="/mypage/joined-study" element={<JoinedStudy />} />
              <Route
                path="/mypage/written-question"
                element={<WrittenQuestion />}
              />
              <Route
                path="/mypage/written-answer"
                element={<WrittenAnswer />}
              />{" "} */}
              <Route path="/editprofile" element={<EditProfile />} />
              <Route path="/goodbye" element={<Goodbye />} />
              <Route path="/serious" element={<Serious />} />
              {/* 비로그인 시 로그인 페이지로 이동 */}
              <Route element={<PrivateRoute />}>
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/mypage/joined-study" element={<JoinedStudy />} />
                <Route
                  path="/mypage/written-question"
                  element={<WrittenQuestion />}
                />
                <Route
                  path="/mypage/written-answer"
                  element={<WrittenAnswer />}
                />{" "}
                <Route path="/editprofile" element={<EditProfile />} />
                {/* create study  */}
                <Route
                  path="/create-study"
                  element={<StudyFormPage mode="create" />}
                />
                {/* edit study */}
                <Route
                  path="/edit-study/:studyId"
                  element={<StudyFormPage mode="edit" />}
                />
              </Route>
              {/* study info page */}
              <Route path="/study-info/:studyId" element={<StudyInfo />} />
              {/* <Route path="/" element={<Enter />} /> */}
              {/* schedule */}
              <Route
                path="/create-schedule"
                element={<CreateSchedule isModify={false} />}
              />
              <Route
                path="/edit-schedule/:id"
                element={<CreateSchedule isModify={true} />}
              />
              {/* question */}
              <Route
                path="/create-question"
                element={<QuestionFormPage isModify={false} />}
              />
              <Route
                path="/edit-question/:id"
                element={<QuestionFormPage isModify={true} />}
              />
              <Route path="/question-detail/:id" element={<QuestionDetail />} />
            </Routes>
          </div>
        </div>
        {/* <Footer/> */}
      </Router>
    </AuthProvider>
  );
}

export default App;
