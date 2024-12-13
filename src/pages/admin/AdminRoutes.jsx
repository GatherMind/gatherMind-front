import React from "react";
import { Routes, Route } from "react-router-dom";
import UserManagement from "./UserManagement";
import AdminDashboard from "./AdminDashboard";
import ContentManagement from "./ContentManagement";
import RoleManagement from "./RoleManagement";
import StudyManagement from "./StudyManagement";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="user-management" element={<UserManagement />} />
      <Route path="content-management" element={<ContentManagement />} />
      <Route path="role-management" element={<RoleManagement />} />
      <Route path="study-management" element={<StudyManagement />} />
    </Routes>
  );
};

export default AdminRoutes;
