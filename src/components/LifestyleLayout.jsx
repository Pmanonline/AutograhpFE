import React from "react";
import { Outlet } from "react-router-dom";
import LifeStyleNav from "../components/LifeStyleNav";

const LifestyleLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <LifeStyleNav />

      {/* Main content area */}
      <div className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </div>
    </div>
  );
};

export default LifestyleLayout;
