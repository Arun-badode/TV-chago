import React, { useState, useEffect } from 'react';
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

    useEffect(() => {
        // Expand orders if a child route is active
        if (activeSection === 'pending-orders' || activeSection === 'completed-orders') {
            setOrdersOpen(true);
        }
    }, [activeSection]);

    const handleNavigation = (id, path) => {
        if (isMobile()) setSidebarOpen(false);
        if (id === 'logout') {
            // Example logout logic
            // localStorage.clear();
            // navigate('/login');
            return;
        }
        setActiveSection(id);
        if (path) navigate(`/${path}`);
    };

    return (
        <div
            className="position-fixed top-0 start-0 vh-100 shadow-sm border-end d-flex flex-column animate-slide-in"
            style={{
                width: '280px',
                transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
                transition: 'transform 0.3s ease-in-out',
                zIndex: 1050,
                backgroundColor: '#fffdf7',
                borderTopRightRadius: '15px',
                borderBottomRightRadius: '15px',
            }}
        >
            {/* Sidebar Header */}
            <div className="d-flex align-items-center justify-content-between p-3">
                <h5 className="fw-bold m-0 text-dark">Menu</h5>
                <button className="btn-close d-lg-none" onClick={() => setSidebarOpen(false)} />
            </div>

            {/* Navigation */}
            <nav className="px-3 flex-grow-1 overflow-auto">
                <div className="nav nav-pills flex-column">
                    {menuItems.map(({ id, label, icon: Icon, path, children }) => (
                        <React.Fragment key={id}>
                            <button
                                onClick={() => {
                                    if (children) setOrdersOpen((open) => !open);
                                    else handleNavigation(id, path);
                                }}
                                className={`nav-link text-start d-flex align-items-center py-3 px-3 mb-1 border-0 rounded ${activeSection === id ? 'text-dark' : 'text-dark'
                                    }`}
                                style={{
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    background: 'linear-gradient(90deg, #fff7c2 0%, #ffe98a 100%)'
                                }}
                            >
                                <Icon size={20} className="me-3" />
                                {label}
                                {children && (
                                    <span className="ms-auto">{ordersOpen ? '' : ''}</span>
                                )}
                            </button>

                            {children && ordersOpen && (
                                <div className="ms-4">
                                    {children.map(({ id: childId, label: childLabel, icon: ChildIcon, path: childPath }) => (
                                        <button
                                            key={childId}
                                            onClick={() => handleNavigation(childId, childPath)}
                                            className={`nav-link text-start d-flex align-items-center py-2 px-3 mb-1 border-0 rounded ${activeSection === childId ? 'bg-primary text-white' : 'text-dark'
                                                }`}
                                            style={{
                                                fontSize: '0.95rem',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                                background: 'linear-gradient(90deg, #fff7c2 0%, #ffe98a 100%)'
                                            }}
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

            {/* Logout */}
            <div className="p-3 mt-auto">
                <button
                    className="nav-link text-start d-flex align-items-center py-3 px-3 border-0 text-danger rounded"
                    onClick={() => handleNavigation('logout')}
                >
                    <LogOut size={20} className="me-3" />
                    Logout
                </button>
            </div>

            {/* Animation Keyframes */}
            <style>{`
        .animate-slide-in {
          animation: slideIn 0.5s ease-out;
        }

        @keyframes slideIn {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .nav-link:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }
      `}</style>
        </div>
    );
};

export default Sidebar;
