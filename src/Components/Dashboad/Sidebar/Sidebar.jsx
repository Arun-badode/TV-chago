import React from 'react';
import {
  Users, UserCheck, Settings, Plus, BarChart3,
  FileText, Bot, Activity
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FaDollarSign } from 'react-icons/fa';

const Sidebar = ({ activeSection, setActiveSection, sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  const isMobile = () => window.innerWidth < 992;

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity, path: '' },
    { id: 'orders', label: 'Orders', icon: Users, path: 'orders' },
    { id: 'uploads', label: 'Uploads', icon: UserCheck, path: 'uploads' },
    { id: 'notifications', label: 'Notifications', icon: FaDollarSign, path: 'notifications' },
    { id: 'customers', label: 'Customers', icon: FileText, path: 'customers' },
     { id: 'settings', label: 'Settings', icon: FileText, path: 'setting' },
  ];

  const handleNavigation = (id, path) => {
    // Always close the sidebar on mobile
    if (isMobile()) setSidebarOpen(false);

    if (id !== 'chatbot') {
      navigate(path ? `/dashboard/${path}` : '/dashboard');
    } else {
      navigate(path ? `/${path}` : '/chatbot');
    }

    setActiveSection(id);
  };

  return (
    <div
      className="position-fixed top-10 start-0 vh-100 bg-white shadow-sm border-end"
      style={{
        width: '280px',
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s ease-in-out',
        zIndex: 1050,
      }}
    >
      {/* Sidebar Header */}
      <div className="d-flex align-items-center justify-content-between p-3">
        <div className="d-flex align-items-center">
          {/* Optional branding */}
        </div>
        <button className="btn-close d-lg-none" onClick={() => setSidebarOpen(false)} />
      </div>

      {/* Navigation */}
      <nav className="p-3">
        <div className="nav nav-pills flex-column">
          {menuItems.map(({ id, label, icon: Icon, path }) => (
            <button
              key={id}
              onClick={() => handleNavigation(id, path)}
              className={`nav-link text-start d-flex align-items-center py-3 px-3 mb-1 border-0 ${
                activeSection === id ? 'active bg-primary text-white' : 'text-dark'
              }`}
            >
              <Icon size={20} className="me-3" />
              {label}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
