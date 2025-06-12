import React, { useEffect, useState } from 'react';
import { Menu, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import "./Header.css";

const Header = ({ setSidebarOpen }) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleSidebarToggle = () => {
        setSidebarOpen(prev => !prev);
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
                        />
                    </div>

                    {/* Empty space for centering on larger screens */}
                    <div className="col-md-6 d-none d-md-flex"></div>

                    {/* Right: Profile icon */}
                    <div className="col-6 col-md-3 d-flex justify-content-end">
                        <button
                            className="profile-button d-flex align-items-center justify-content-center border-0 bg-transparent p-1"
                            style={{ width: 36, height: 36 }}
                            type="button"
                            onClick={() => navigate('/dashboard/adminprofile')}
                        >
                            <User size={22} className="text-dark" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;