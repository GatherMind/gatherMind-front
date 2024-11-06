import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import CreateStudy from "./pages/CreateStudy";

import { UserProvider } from "./context/UserContext";
import StudyInfo from "./pages/StudyInfo";

function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <div className="app-container">
            <main className="content">
              <Routes>
                <Route
                  path="/create-study/:id"
                  element={<CreateStudy />}
                ></Route>
                <Route path="/study-info/:id" element={<StudyInfo />}></Route>
              </Routes>
            </main>
          </div>
        </Router>
      </UserProvider>
    </>
  );
}

export default App;
