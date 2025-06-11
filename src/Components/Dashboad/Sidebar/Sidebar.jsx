import React, { useState } from 'react';
import {
  Users, UserCheck, Settings, FileText, Activity, LogOut, Inbox, Send
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { FaDollarSign } from 'react-icons/fa';

const Sidebar = ({ activeSection, setActiveSection, sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const [ordersOpen, setOrdersOpen] = useState(false);

  const isMobile = () => window.innerWidth < 992;

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity, path: '' },
    {
      id: 'orders',
      label: 'Orders',
      icon: Users,
      children: [
        { id: 'pending-orders', label: 'Pending Orders', icon: Inbox, path: 'orders/pending' },
        { id: 'completed-orders', label: 'Completed Orders', icon: Send, path: 'orders/completed' },
      ],
    },
    { id: 'uploads', label: 'Uploads', icon: UserCheck, path: 'uploads' },
    { id: 'notifications', label: 'Notifications', icon: FaDollarSign, path: 'notifications' },
    { id: 'customers', label: 'Customers', icon: FileText, path: 'customers' },
    { id: 'settings', label: 'Settings', icon: Settings, path: 'setting' },
  ];

  const handleNavigation = (id, path) => {
    if (isMobile()) setSidebarOpen(false);

    if (id === 'logout') {
      // Add your logout logic here
      // Example: localStorage.clear(); navigate('/login');
      return;
    }

    if (id !== 'chatbot') {
      navigate(path ? `/dashboard/${path}` : '/dashboard');
    } else {
      navigate(path ? `/${path}` : '/chatbot');
    }

    setActiveSection(id);
  };

  return (
    <div
      className="position-fixed top-10 start-0 vh-100 bg-white shadow-sm border-end d-flex flex-column"
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
      <nav className="p-3 flex-grow-1">
        <div className="nav nav-pills flex-column">
          {menuItems.map(({ id, label, icon: Icon, path, children }) => (
            <React.Fragment key={id}>
              <button
                onClick={() => {
                  if (children) setOrdersOpen((open) => !open);
                  else handleNavigation(id, path);
                }}
                className={`nav-link text-start d-flex align-items-center py-3 px-3 mb-1 border-0 ${
                  activeSection === id ? 'active bg-primary text-white' : 'text-dark'
                }`}
                style={{ cursor: 'pointer' }}
              >
                <Icon size={20} className="me-3" />
                {label}
                {children && (
                  <span className="ms-auto">{ordersOpen ? '▲' : '▼'}</span>
                )}
              </button>
              {children && ordersOpen && (
                <div className="ms-4">
                  {children.map(({ id: childId, label: childLabel, icon: ChildIcon, path: childPath }) => (
                    <button
                      key={childId}
                      onClick={() => handleNavigation(childId, childPath)}
                      className={`nav-link text-start d-flex align-items-center py-2 px-3 mb-1 border-0 ${
                        activeSection === childId ? 'active bg-primary text-white' : 'text-dark'
                      }`}
                      style={{ fontSize: '0.95rem', cursor: 'pointer' }}
                    >
                      <ChildIcon size={18} className="me-2" />
                      {childLabel}
                    </button>
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </nav>

      {/* Logout Button */}
      <div className="p-3 mt-auto">
        <button
          className="nav-link text-start d-flex align-items-center py-3 px-3 border-0 text-danger"
          onClick={() => handleNavigation('logout')}
        >
          <LogOut size={20} className="me-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;