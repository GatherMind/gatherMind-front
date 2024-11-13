import Header from "./Header";
import { useNavigate } from "react-router-dom";
import FileUpload from "./FileUpload";

const Enter = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="enterWrap">
        <Header />
        <main>
          <div> GATHER MIND에 오신 모든 여러분 환영합니다.</div>

          <FileUpload />
        </main>

        <footer>
          <button onClick={() => navigate("/login")}>GATHER MIND START</button>
        </footer>
      </div>
    </>
  );
};

export default Enter;
