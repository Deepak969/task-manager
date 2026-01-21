import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

const DashboardLayout = ({ children }) => {
  return (
    <div className="nxl-app">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Wrapper */}
      <div className="nxl-main">

        {/* Header */}
        <Header />

        {/* Page Content */}
        <main className="nxl-container">
          <div className="nxl-content">
            {children}
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
