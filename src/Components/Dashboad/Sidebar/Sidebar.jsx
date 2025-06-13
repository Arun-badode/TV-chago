import React, { useState, useEffect } from 'react';
import {
    Users, Settings, LogOut, Inbox, Send,
    ChevronDown, ChevronUp, Home, ShoppingBag, MessageSquare,
    Link
} from 'lucide-react';
import "./Sidebar.css"
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ sidebarOpen: parentSidebarOpen, setSidebarOpen: setParentSidebarOpen }) => {
    const [activeSection, setActiveSection] = useState('dashboard');
    const [ordersOpen, setOrdersOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
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
        { id: 'upload', label: 'Order Upload', icon: Users, path: 'dashboardlayout/Upload' },
        { id: 'customers', label: 'Customers', icon: Users, path: 'dashboardlayout/customer' },
        { id: 'notifications', label: 'Notifications', icon: MessageSquare, path: 'dashboardlayout/notification', notificationCount: 5 },
        { id: 'settings', label: 'Settings', icon: Settings, path: 'dashboardlayout/setting' },
    ];

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (activeSection === 'pending-orders' || activeSection === 'completed-orders' || activeSection === 'returns') {
            setOrdersOpen(true);
        }
    }, [activeSection]);

    const handleNavigation = (id, path) => {
        navigate(`/${path}`);
        setActiveSection(id);
        if (isMobile && setParentSidebarOpen) setParentSidebarOpen(false);
    };

    const handleToggleSidebar = () => setIsCollapsed(!isCollapsed);

    return (
        <>
            {/* Sidebar container without toggle button and logo, with lower z-index */}
            <div
                className={`sidebar-container border-end ${isMobile ? (parentSidebarOpen ? 'd-block' : 'd-none') : 'd-block'} ${isCollapsed && !isMobile ? 'collapsed' : ''}`}
                style={{
                    backgroundColor: '#fffef8',
                    width: isMobile ? 220 : isCollapsed ? 60 : 220,
                    position: isMobile ? 'fixed' : 'relative',
                    height: '100vh',
                    zIndex: 100, // Lower z-index so header is above
                    top: isMobile ? 0 : undefined,
                    left: 0,
                    transition: 'width 0.2s',
                    marginTop: '90px', // <-- Added margin top
                }}
            >
                {/* Collapse button for desktop (optional, can remove if not needed) */}
              
                {/* Navigation */}
                <nav className="sidebar-nav">
                    {menuItems.map(({ id, label, icon: Icon, path, children, notificationCount }) => (
                        <React.Fragment key={id}>
                            <div
                                className={`nav-item d-flex align-items-center px-3 py-3 gap-2 mt-3 ${activeSection === id ? 'active' : ''}`}
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    if (children && id === 'orders') setOrdersOpen(!ordersOpen);
                                    else handleNavigation(id, path);
                                }}
                            >
                                <Icon size={20} strokeWidth={1.8} />
                                {!isCollapsed && (
                                    <>
                                        <span className="ms-2">{label}</span>
                                        {notificationCount && (
                                            <span className="notification-badge ms-auto">{notificationCount}</span>
                                        )}
                                        {children && (
                                            <span className="chevron ms-2">
                                                {id === 'orders' ? (ordersOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />) : null}
                                            </span>
                                        )}
                                    </>
                                )}
                            </div>
                            {children && ordersOpen && id === 'orders' && !isCollapsed && (
                                <div
                                    className="submenu ps-4"
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center', // Center children horizontally
                                        gap: 6,
                                        paddingLeft: 0, // Remove extra left padding
                                    }}
                                >
                                    {children.map(({ id: childId, label: childLabel, icon: ChildIcon, path: childPath }) => (
                                        <div
                                            key={childId}
                                            className={`submenu-item d-flex align-items-center py-1 ${activeSection === childId ? 'active' : ''}`}
                                            style={{
                                                cursor: 'pointer',
                                                justifyContent: 'center', // Center icon+label
                                                width: '100%',
                                                textAlign: 'center',
                                            }}
                                            onClick={() => handleNavigation(childId, childPath)}
                                        >
                                            <ChildIcon size={16} strokeWidth={1.8} />
                                            <span className="ms-2">{childLabel}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </nav>
                {/* Logout */}
                <div className="logout-section mt-auto p-3 d-flex align-items-center">
                    <div className="user-profile d-flex align-items-center">
                        <div className="avatar bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: 36, height: 36 }}>JD</div>
                        {!isCollapsed && (
                            <div className="user-info ms-2">
                                <strong>John Doe</strong>
                                <div style={{ fontSize: 12 }}>Admin</div>
                            </div>
                        )}
                    </div>
                    {!isCollapsed && (
                        
                        <button className="logout-button btn btn-link ms-auto"
                            onClick={() => navigate('/login')}
                        >
                            <LogOut size={18} />
                        </button>
                    )}
                </div>
            </div>
            {/* Overlay for mobile */}
            {isMobile && parentSidebarOpen && (
                <div
                    className="position-fixed top-0 start-0 w-100 h-100"
                    style={{ background: 'rgba(0,0,0,0.3)', zIndex: 99 }}
                    onClick={() => setParentSidebarOpen && setParentSidebarOpen(false)}
                />
            )}
        </>
    );
};

export default Sidebar;