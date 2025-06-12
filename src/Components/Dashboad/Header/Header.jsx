import React, { useEffect, useState, useRef } from 'react';
import { Menu, User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import "./Header.css";

const Header = ({ setSidebarOpen }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        if (dropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [dropdownOpen]);

    const handleSidebarToggle = () => {
        setSidebarOpen(prev => !prev);
    };

    const handleProfileClick = () => {
        setDropdownOpen((prev) => !prev);
    };

    const handleProfile = () => {
        setDropdownOpen(false);
        navigate('/dashboard/adminprofile');
    };

    const handleLogout = () => {
        setDropdownOpen(false);
        // Add your logout logic here
        navigate('/')
    };

    return (
        <header className="header-container bg-white shadow-sm py-4 py-md-3 py-lg-4">
            <div className="container-fluid px-3 px-md-4">
                <div className="row align-items-center gx-0">
                    {/* Left: Logo and mobile menu button */}
                    <div className="col-6 col-md-3 d-flex align-items-center">
                        <button
                            className="btn btn-outline-secondary d-md-none me-2 p-1"
                            style={{ width: 36, height: 36 }}
                            onClick={handleSidebarToggle}
                            aria-label="Toggle sidebar"
                        >
                            <Menu size={22} className="text-dark" />
                        </button>
                        <img
                            src="https://i.postimg.cc/8CG6dNYw/Whats-App-Image-2025-06-12-at-11-59-46-c03b4354-removebg-preview.png"
                            alt="Logo"
                            className="img-fluid"
                            style={{
                                height: isMobile ? 28 : 36,
                                width: 'auto',
                                maxWidth: isMobile ? 100 : 130,
                            }}
                            onClick={() => navigate('/dashboardlayout')}
                            style={{ 
                                height: isMobile ? 28 : 36,
                                width: 'auto',
                                maxWidth: isMobile ? 100 : 130,
                                cursor: 'pointer'
                            }}
                        />
                    </div>

                    {/* Empty space for centering on larger screens */}
                    <div className="col-md-6 d-none d-md-flex"></div>

                    {/* Right: Profile icon with dropdown */}
                    <div className="col-6 col-md-3 d-flex justify-content-end position-relative" ref={dropdownRef}>
                        <button
                            className="profile-button d-flex align-items-center justify-content-center border-0 bg-transparent p-1"
                            style={{ width: 36, height: 36 }}
                            type="button"
                            onClick={handleProfileClick}
                        >
                            <User size={22} className="text-dark" />
                        </button>
                        {dropdownOpen && (
                            <div
                                className="dropdown-menu show mt-2"
                                style={{
                                    right: 0,
                                    left: 'auto',
                                    minWidth: 140,
                                    position: 'absolute',
                                    zIndex: 9999,
                                }}
                            >
                                <button
                                    className="dropdown-item d-flex align-items-center gap-2"
                                    onClick={handleProfile}
                                    type="button"
                                >
                                    <User size={16} /> Profile
                                </button>
                                  <button
                                    className="dropdown-item d-flex align-items-center gap-2"
                                    onClick={() => navigate('/dashboardlayout/setting')}
                                    
                                    type="button"
                                >
                                    <LogOut size={16} /> Setting
                                </button>
                                <button
                                    className="dropdown-item d-flex align-items-center gap-2"
                                    onClick={handleLogout}
                                    type="button"
                                >
                                    <LogOut size={16} /> Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;