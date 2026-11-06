import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./sidebar";
import { TopBar } from "./top-bar";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= 1024
  );
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.innerWidth >= 1024) {
      setSidebarOpen(true);
    } else {
      setSidebarOpen(false);
    }
  }, [pathname]);

  return (
    <div className="flex h-dvh bg-[#F0F4F8] dark:bg-gray-900 overflow-hidden">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />

      <div
        className={`flex-1 flex flex-col min-w-0 w-full overflow-x-hidden transition-[margin-left] duration-300 ${
          collapsed ? "shell:ml-17" : "shell:ml-64"
        }`}
      >
        <TopBar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative p-4 shell:p-6 bg-[#F0F4F8] dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AppLayout;