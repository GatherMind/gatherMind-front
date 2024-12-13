import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

// Context를 사용할 커스텀 Hook
export const useSidebar = () => {
  return useContext(SidebarContext);
};

// Provider 컴포넌트
export const SidebarProvider = ({ children }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSideBarOpen((prev) => !prev);
  };

  const handleSidebarClose = () => {
    setIsSideBarOpen(false);
  };

  return (
    <SidebarContext.Provider
      value={{ isSideBarOpen, toggleSidebar, handleSidebarClose }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
