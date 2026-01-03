import React from "react";
import Dashboard from "../components/Dashboard";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";

const DashboardPage = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="flex-1 lg:ml-0">
        <TopBar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <main className="p-6">
          <Dashboard />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
