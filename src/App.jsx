import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import { UserProvider } from "./context/UserContext";

import Enter from "./components/Enter";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Mypage from "./components/MyPage";
import Goodbye from "./components/Goodbye";
import EditProfile from "./components/EditProfile";
import Serious from "./components/Serious";

import CreateSchedule from "./pages/CreateSchedule";
import QuestionDetail from "./pages/QuestionDetail";
import QuestionFormPage from "./pages/QuestionFormPage";
import StudyInfo from "./pages/StudyInfo";
import StudyFormPage from "./pages/StudyFormPage";
import JoinedStudy from "./components/JoinedStudy";
import WrittenQuestion from "./components/WrittenQuestion";
import WrittenAnswer from "./components/WrittenAnswer";

function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Enter />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/mypage/joined-study" element={<JoinedStudy />} />
            <Route path="/mypage/written-question" element={<WrittenQuestion />} />
            <Route path="/mypage/written-answer" element={<WrittenAnswer />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/goodbye" element={<Goodbye />} />
            <Route path="/serious" element={<Serious />} />

            <Route path="/create-schedule" element={<CreateSchedule />} />
            <Route
              path="/create-question"
              element={<QuestionFormPage isModify={false} />}
            />
            <Route
              path="/edit-question/:id"
              element={<QuestionFormPage isModify={true} />}
            />
            <Route path="/question-detail/:id" element={<QuestionDetail />} />

            {/* create study  */}
            <Route
              path="/create-study/:memberId"
              element={<StudyFormPage mode="create" />}
            />
            {/* edit study */}
            <Route
              path="/edit-study/:studyId"
              element={<StudyFormPage mode="edit" />}
            />
            {/* study info page */}
            <Route path="/study-info/:studyId" element={<StudyInfo />} />
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
