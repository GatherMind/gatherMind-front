import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Enter from "./pages/enter";
import Login from "./pages/login";
import Mypage from "./pages/mypage";
import SignUp from "./pages/signup";
import Modify from "./pages/modify";
import CreateMeeting from "./pages/CreateMeeting";
import MeetingInfo from "./pages/MeetingInfo";
import { UserProvider } from "./context/UserContext";
import Header from "./components/Header";
import CreateSchedule from "./pages/CreateSchedule";
import QuestionDetail from "./pages/QuestionDetail";
import QuestionFormPage from "./pages/QuestionFormPage";

function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <div className="app-container">
            <Header />
            <main className="content">
              <Routes>
                <Route path="/" element={<Enter />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/mypage" element={<Mypage />} />
                <Route path="/modify" element={<Modify />} />
                <Route
                  path="/create-meeting/:id"
                  element={<CreateMeeting />}
                ></Route>
                <Route
                  path="/meeting-info/:id"
                  element={<MeetingInfo />}
                ></Route>
                <Route path="/create-schedule" element={<CreateSchedule />}/>
                <Route path="/create-question" element={<QuestionFormPage isModify={false} />}/>
                <Route path="/edit-question/:id" element={<QuestionFormPage isModify={true} />}/>
                <Route path="/question-detail/:id" element={<QuestionDetail />}/>
              </Routes>
            </main>
          </div>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
