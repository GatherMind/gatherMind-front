import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Mypage from "./pages/MyPage";
import Goodbye from "./pages/Goodbye";
import Serious from "./pages/Serious";
import Header from "./components/Header.jsx";

import CreateSchedule from "./pages/CreateSchedule";
import QuestionDetail from "./pages/QuestionDetail";
import QuestionFormPage from "./pages/QuestionFormPage";
import StudyInfo from "./pages/StudyInfo";
import StudyFormPage from "./pages/StudyFormPage";
import JoinedStudy from "./pages/JoinedStudy";
import WrittenQuestion from "./pages/WrittenQuestion";
import WrittenAnswer from "./pages/WrittenAnswer";

import { SidebarProvider } from "./context/SidebarContext";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Groupid from "./components/Groupid";
import Dashboard from "./pages/Dashboard.jsx";
import Main from "./pages/Main.jsx";
import AdminMain from "./pages/admin/AdminMain";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="container">
          <Header />
          <div className="content">
            <Routes>
              <Route path="/" element={<Main />}></Route>
              <Route path="main/group/:id" element={<Groupid />}></Route>
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/goodbye" element={<Goodbye />} />
              <Route path="/serious" element={<Serious />} />
              {/* admin page */}
              {/* 
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/user-management" element={<UserManagement />} />
              <Route path="/admin/*" element={<AdminMain />} /> */}

              <Route
                path="/admin/*"
                element={
                  <SidebarProvider>
                    <AdminMain />
                  </SidebarProvider>
                }
              />
              {/* <Route path="/content-management" element={<ContentManagement />} />
        <Route path="/role-management" element={<RoleManagement />} /> */}

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
                <Route
                  path="/create-schedule"
                  element={<CreateSchedule isModify={false} />}
                />
                <Route
                  path="/create-question"
                  element={<QuestionFormPage isModify={false} />}
                />
                {/* schedule */}
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
                <Route path="/study-info/:studyId" element={<StudyInfo />} />
                <Route
                  path="/question-detail/:id"
                  element={<QuestionDetail />}
                />
              </Route>
              {/* PrivateRoute end */}
            </Routes>
          </div>
        </div>
        {/* <Footer/> */}
      </Router>
    </AuthProvider>
  );
}

export default App;
