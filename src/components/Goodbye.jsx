import React from "react";
import Header from "./Header";

const Goodbye = () => {
  return (
    <div className="goodbye-container">
      <header>
        <Header />
      </header>
      <main>
        <div>
          <h1>
            짧다면 짧은 시간, 길다면 긴 시간 Gather Mind와 함께해줘서 감사했습니다 :)
            다음에 다시 만나요!
          </h1>
        </div>
      </main>
    </div>
  );
};

export default Goodbye;
