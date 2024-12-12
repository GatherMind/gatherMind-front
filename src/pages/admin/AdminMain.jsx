import React from "react";
import { Route, Routes } from "react-router-dom";

import ResponsiveSidebar from "./../../components/ResponsiveSidebar";
import AdminRoutes from "./AdminRoutes";

const AdminMain = () => {
  return (
    <div className="dashboard-container">
      {/* 공통 사이드바 */}
      <ResponsiveSidebar />

      {/* 공통 레이아웃 */}
      <div className="dashboard-main">
        {/* 헤더 및 공통 UI */}
        <Routes>
          <Route path="/*" element={<AdminRoutes />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminMain;
