import Header from "./Header";
import { useNavigate } from "react-router-dom";
import "./enter.css";
import Footer from "./Footer";

const Enter = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="enterWrap">
        <Header />
        <main>
          <div className="welcome"> GATHER MIND에 오신 모든 여러분 환영합니다.</div>
          <button onClick={() => navigate("/login")}>GATHER MIND START</button>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default Enter;
