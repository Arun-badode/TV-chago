import React, { useState, useEffect } from 'react';
import {
  Users, UserCheck, Settings, FileText, Activity, LogOut, Inbox, Send,
  ChevronDown, ChevronUp, Home, ShoppingBag, CreditCard, BarChart2, MessageSquare
} from 'lucide-react';

const Sidebar = ({ sidebarOpen }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '' },
    {
      id: 'orders',
      label: 'Orders',
      icon: ShoppingBag,
      children: [
        { id: 'pending-orders', label: 'Pending Orders', icon: Inbox, path: 'orders/pending' },
        { id: 'completed-orders', label: 'Completed Orders', icon: Send, path: 'orders/completed' },
      ],
    },
    { id: 'products', label: 'Products', icon: FileText, path: 'products' },
    { id: 'customers', label: 'Customers', icon: Users, path: 'customers' },
    { id: 'notifications', label: 'notifications', icon: NotificationsSquare, path: 'notifications', notificationCount: 5 },
    {
      id: 'reports',
      label: 'Reports',
      icon: BarChart2,
    },
    { id: 'settings', label: 'Settings', icon: Settings, path: 'settings' },
  ];

  useEffect(() => {
    if (activeSection === 'pending-orders' || activeSection === 'completed-orders' || activeSection === 'returns') {
      setOrdersOpen(true);
    }
    if (activeSection === 'sales' || activeSection === 'inventory') {
      setReportsOpen(true);
    }
  }, [activeSection]);

  const handleNavigation = (id, path) => {
    setActiveSection(id);
  };

  return (
    <div className="sidebar-container" style={{ transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)' }}>
      <div className="sidebar">
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div className="brand">
            <div className="logo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#E86A33" />
                <path d="M2 17L12 22L22 17" stroke="#E86A33" strokeWidth="2" />
                <path d="M2 12L12 17L22 12" stroke="#E86A33" strokeWidth="2" />
              </svg>
            </div>
            <div>
              <h2>AdminSuite</h2>
              <p>Management Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          {menuItems.map(({ id, label, icon: Icon, path, children, notificationCount }) => (
            <React.Fragment key={id}>
              <div 
                className={`nav-item ${activeSection === id ? 'active' : ''}`}
                onClick={() => {
                  if (children && id === 'orders') setOrdersOpen(!ordersOpen);
                  else if (children && id === 'reports') setReportsOpen(!reportsOpen);
                  else handleNavigation(id, path);
                }}
              >
                <Icon size={20} strokeWidth={1.8} />
                <span>{label}</span>
                
                {notificationCount && (
                  <span className="notification-badge">{notificationCount}</span>
                )}
                
                {children && (
                  <span className="chevron">
                    {id === 'orders' ? (ordersOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />) : 
                     id === 'reports' ? (reportsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />) : null}
                  </span>
                )}
              </div>

              {children && ((id === 'orders' && ordersOpen) || (id === 'reports' && reportsOpen)) && (
                <div className="submenu">
                  {children.map(({ id: childId, label: childLabel, icon: ChildIcon, path: childPath }) => (
                    <div
                      key={childId}
                      className={`submenu-item ${activeSection === childId ? 'active' : ''}`}
                      onClick={() => handleNavigation(childId, childPath)}
                    >
                      <ChildIcon size={16} strokeWidth={1.8} />
                      {childLabel}
                    </div>
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Logout */}
        <div className="logout-section">
          <div className="user-profile">
            <div className="avatar">JD</div>
            <div className="user-info">
              <strong>John Doe</strong>
              <span>Admin</span>
            </div>
          </div>
          <button className="logout-button">
            <LogOut size={18} />
          </button>
        </div>
      </div>

      <style jsx>{`
        .sidebar-container {
          position: fixed;
          top: 0;
          left: 0;
          height: 100vh;
          width: 280px;
          z-index: 1000;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .sidebar {
          height: 100%;
          background: linear-gradient(90deg, #fff7c2 0%, #ffe98a 100%);
          box-shadow: 0 0 30px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          padding: 20px 0;
          overflow: hidden;
          border-right: 1px solid rgba(0, 0, 0, 0.05);
        }
        
        .sidebar-header {
          padding: 0 24px 20px;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          margin-bottom: 15px;
        }
        
        .brand {
          display: flex;
          align-items: center;
          gap: 15px;
        }
        
        .logo {
          width: 50px;
          height: 50px;
          background: white;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(232, 106, 51, 0.2);
        }
        
        .logo svg {
          width: 30px;
          height: 30px;
        }
        
        h2 {
          margin: 0;
          font-size: 1.4rem;
          color: #2B2B2B;
          font-weight: 700;
        }
        
        p {
          margin: 3px 0 0;
          font-size: 0.8rem;
          color: #7A6A53;
          font-weight: 500;
        }
        
        .sidebar-nav {
          flex: 1;
          overflow-y: auto;
          padding: 10px 15px;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        
        .nav-item {
          display: flex;
          align-items: center;
          padding: 12px 20px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          color: #5A4D3D;
          font-weight: 500;
          gap: 15px;
          background: rgba(255, 255, 255, 0.4);
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(0, 0, 0, 0.03);
        }
        
        .nav-item:hover {
          background: rgba(255, 255, 255, 0.8);
          transform: translateX(5px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
        }
        
        .nav-item.active {
          background: white;
          color: #E86A33;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(232, 106, 51, 0.25);
        }
        
        .nav-item.active::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 4px;
          background: #E86A33;
          border-radius: 0 4px 4px 0;
        }
        
        .notification-badge {
          position: absolute;
          right: 20px;
          background: #E86A33;
          color: white;
          font-size: 0.7rem;
          font-weight: 600;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .chevron {
          margin-left: auto;
          color: #7A6A53;
        }
        
        .submenu {
          margin-left: 30px;
          margin-top: -5px;
          margin-bottom: 5px;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        
        .submenu-item {
          display: flex;
          align-items: center;
          padding: 10px 20px 10px 35px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #5A4D3D;
          font-size: 0.95rem;
          font-weight: 500;
          gap: 12px;
          background: rgba(255, 255, 255, 0.2);
        }
        
        .submenu-item:hover {
          background: rgba(255, 255, 255, 0.5);
          transform: translateX(3px);
        }
        
        .submenu-item.active {
          background: white;
          color: #E86A33;
          font-weight: 600;
        }
        
        .logout-section {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 15px 20px;
          margin: 15px 15px 0;
          border-top: 1px solid rgba(0, 0, 0, 0.05);
          background: rgba(255, 255, 255, 0.6);
          border-radius: 12px;
        }
        
        .user-profile {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #E86A33, #ff9d6c);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          font-size: 0.9rem;
        }
        
        .user-info {
          display: flex;
          flex-direction: column;
        }
        
        .user-info strong {
          font-size: 0.95rem;
          color: #2B2B2B;
        }
        
        .user-info span {
          font-size: 0.8rem;
          color: #7A6A53;
        }
        
        .logout-button {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(232, 106, 51, 0.1);
          border: none;
          color: #E86A33;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        
        .logout-button:hover {
          background: rgba(232, 106, 51, 0.2);
          transform: rotate(10deg);
        }
        
        /* Scrollbar styling */
        .sidebar-nav::-webkit-scrollbar {
          width: 6px;
        }
        
        .sidebar-nav::-webkit-scrollbar-track {
          background: rgba(255, 247, 194, 0.3);
          border-radius: 10px;
        }
        
        .sidebar-nav::-webkit-scrollbar-thumb {
          background: rgba(232, 106, 51, 0.4);
          border-radius: 10px;
        }
        
        .sidebar-nav::-webkit-scrollbar-thumb:hover {
          background: rgba(232, 106, 51, 0.6);
        }
        
        @media (max-width: 768px) {
          .sidebar-container {
            box-shadow: 0 0 50px rgba(0, 0, 0, 0.2);
          }
        }
      `}</style>
    </div>
  );
};

export default Sidebar;