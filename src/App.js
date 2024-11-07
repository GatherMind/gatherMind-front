import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import { UserProvider } from "./context/UserContext";
import StudyInfo from "./pages/StudyInfo";
import StudyFormPage from "./pages/StudyFormPage";

function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
            <Route
              path="/create-study/:memberId"
              element={<StudyFormPage mode="create" />}
            />
            <Route
              path="/edit-study/:studyId"
              element={<StudyFormPage mode="edit" />}
            />
            <Route path="/study-info/:studyId" element={<StudyInfo />} />
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
