import React, { useState, useEffect } from 'react';
import {
    Users, UserCheck, Settings, FileText, Activity, LogOut, Inbox, Send,
    ChevronDown, ChevronUp, Home, ShoppingBag, CreditCard, BarChart2, MessageSquare, Menu
} from 'lucide-react';
import "./Sidebar.css";
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [ordersOpen, setOrdersOpen] = useState(false);
    const [reportsOpen, setReportsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const navigate = useNavigate();

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: Home, path: 'dashboardlayout' },
        {
            id: 'orders',
            label: 'Orders',
            icon: ShoppingBag,
            children: [
                { id: 'pending-orders', label: 'Pending Orders', icon: Inbox, path: 'dashboardlayout/orders/pending' },
                { id: 'completed-orders', label: 'Completed Orders', icon: Send, path: 'dashboardlayout/orders/completed' },
            ],
        },
        { id: 'upload', label: 'Upload', icon: Users, path: 'dashboardlayout/Upload' },
        { id: 'customers', label: 'Customers', icon: Users, path: 'dashboardlayout/customer' },
        { id: 'notifications', label: 'Notifications', icon: MessageSquare, path: 'dashboardlayout/notification', notificationCount: 5 },
        { id: 'settings', label: 'Settings', icon: Settings, path: 'dashboardlayout/setting' },
    ];

const Sidebar = ({ sidebarOpen }) => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [ordersOpen, setOrdersOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);
const navigate= useNavigate();
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
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setSidebarOpen(true);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [setSidebarOpen]);

    const handleNavigation = (id, path) => {
        navigate(`/${path}`);
        setActiveSection(id);
        if (isMobile) setSidebarOpen(false);
    };

    const handleToggleSection = (id) => {
        if (id === 'orders') setOrdersOpen(!ordersOpen);
        if (id === 'reports') setReportsOpen(!reportsOpen);
    };

    return (
        <>
            {/* Header (Mobile Only) */}
            {isMobile && (
                <div className="mobile-header d-flex align-items-center justify-content-between px-3 py-2 shadow-sm bg-white">
                    <img
                        src="https://i.postimg.cc/8CG6dNYw/Whats-App-Image-2025-06-12-at-11-59-46-c03b4354-removebg-preview.png"
                        alt="Logo"
                        height="36"
                    />
                    <button className="btn p-1" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <Menu size={24} />
                    </button>
                </div>
            )}

            <div
                className={`sidebar-container ${sidebarOpen ? 'open' : ''}`}
                style={{
                    transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
                    transition: 'transform 0.3s ease-in-out',
                }}
            >
                <div className="sidebar">
                    {/* Logo (Desktop) */}
                    {!isMobile && (
                        <div className="sidebar-header p-3">
                            <img
                                src="https://i.postimg.cc/8CG6dNYw/Whats-App-Image-2025-06-12-at-11-59-46-c03b4354-removebg-preview.png"
                                alt="Logo"
                                height="40"
                                width="90"
                            />
                        </div>
                    )}

                    {/* Navigation */}
                    <nav className="sidebar-nav">
                        {menuItems.map(({ id, label, icon: Icon, path, children, notificationCount }) => (
                            <React.Fragment key={id}>
                                <div
                                    className={`nav-item ${activeSection === id ? 'active' : ''}`}
                                    onClick={() => {
                                        if (children) {
                                            handleToggleSection(id);
                                        } else {
                                            handleNavigation(id, path);
                                        }
                                    }}
                                >
                                    <Icon size={20} strokeWidth={1.8} />
                                    {!isMobile && <span>{label}</span>}
                                    {notificationCount && !isMobile && (
                                        <span className="notification-badge">{notificationCount}</span>
                                    )}
                                    {children && !isMobile && (
                                        <span className="chevron">
                                            {(id === 'orders' && ordersOpen) || (id === 'reports' && reportsOpen)
                                                ? <ChevronUp size={16} />
                                                : <ChevronDown size={16} />}
                                        </span>
                                    )}
                                </div>

                                {children && !isMobile && (
                                    (id === 'orders' && ordersOpen) || (id === 'reports' && reportsOpen)
                                ) && (
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

                    {/* Logout (Hide on Mobile) */}
                    {!isMobile && (
                        <div className="logout-section mt-auto">
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
                    )}
                </div>
            </div>
        </>
    );
};

export default Sidebar;
