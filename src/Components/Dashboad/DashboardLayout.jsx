import React, { useEffect, useState } from 'react';
import Header from '../Dashboad/Header/Header';
import Sidebar from '../Dashboad/Sidebar/Sidebar';
import { Outlet, useLocation } from 'react-router-dom';

const DashboardLayout = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState('admindashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const path = location.pathname.split('/')[2]; // Get the route like 'allusers'
    setActiveSection(path || 'admindashboard');
  }, [location]);

  return (
    <div className="d-flex flex-column vh-100 overflow-hidden">
      {/* Header */}
      <Header setSidebarOpen={setSidebarOpen} />

      {/* Main layout */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <Sidebar
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main content area */}
        <main
          className="flex-grow-1 overflow-auto"
          style={{
            transition: 'margin-left 0.3s ease',
            marginLeft: sidebarOpen ? '250px' : '60px', // Adjust to match your sidebar width
          }}
        >
          <div className="p-3">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
