import React, { useState, useEffect } from 'react';
import {
    Users, UserCheck, Settings, FileText, Activity, LogOut, Inbox, Send,
    ChevronDown, ChevronUp, Home, ShoppingBag, CreditCard, BarChart2, MessageSquare
} from 'lucide-react';
import "./Sidebar.css"
import { useNavigate } from 'react-router-dom';


const Sidebar = ({ sidebarOpen }) => {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [ordersOpen, setOrdersOpen] = useState(false);
    const [reportsOpen, setReportsOpen] = useState(false);
    const navigate = useNavigate();
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home, path: 'dashboardlayout' },
        {
            id: 'orders',
            label: 'Orders',
            icon: ShoppingBag,
            children: [
                { id: 'pending-orders', label: 'Pending Orders', icon: Inbox, path: 'dashboardlayout/pendingorder' },
                { id: 'completed-orders', label: 'Completed Orders', icon: Send, path: 'dashboardlayout/completedorder' },
            ],
        },
        { id: 'upload', label: 'Upload', icon: Users, path: 'dashboardlayout/Upload' },
        { id: 'customers', label: 'Customers', icon: Users, path: 'dashboardlayout/customer' },
        { id: 'notifications', label: 'Notifications', icon: MessageSquare, path: 'dashboardlayout/notification', notificationCount: 5 },
        { id: 'settings', label: 'Settings', icon: Settings, path: 'dashboardlayout/setting' },
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

        navigate(`/${path}`);

        setActiveSection(id);

    };

    return (
        <div className="sidebar-container" style={{ transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)' }}>
            <div className="sidebar">
                {/* Sidebar Header */}
                <div className="sidebar-header">
                    <div className="brand">
                        <img
                            src="https://i.postimg.cc/8CG6dNYw/Whats-App-Image-2025-06-12-at-11-59-46-c03b4354-removebg-preview.png"
                            alt="CHAGO TV Logo"
                            height="40"
                            width="90"

                            className="d-inline-block mt-3"
                        />
                        {/* <div className="logo">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#E86A33" />
                <path d="M2 17L12 22L22 17" stroke="#E86A33" strokeWidth="2" />
                <path d="M2 12L12 17L22 12" stroke="#E86A33" strokeWidth="2" />
              </svg>
            </div>
            <div>
              <h2>AdminSuite</h2>
              <p>Management Dashboard</p>
            </div> */}
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
        </div>
    );
};

export default Sidebar;