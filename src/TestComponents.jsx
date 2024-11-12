import React from "react";
import Loading from "./components/Feedback/Loading"; // 예시로 Loading 컴포넌트
import Error from "./components/Feedback/Error";

const TestComponents = () => (
  <div>
    <Loading />
    {/* 필요하면 다른 컴포넌트 추가 */}
    <Error message={"test"} />
  </div>
);

export default TestComponents; // 기본 내보내기 추가
