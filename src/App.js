import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import { UserProvider } from "./context/UserContext";
import CreateSchedule from "./pages/CreateSchedule";
import QuestionDetail from "./pages/QuestionDetail";
import QuestionFormPage from "./pages/QuestionFormPage";
import StudyInfo from "./pages/StudyInfo";
import StudyFormPage from "./pages/StudyFormPage";

function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
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
