import React, { useEffect, useState, useRef } from "react";
import { Menu, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Header.css";
import { Link } from "react-router-dom";

const user = {
  name: "John Doe",
  email: "john.doe@email.com",
  phone: "+91 9876543210",
  address: "123, Fashion Street, Mumbai",
  role: "Admin",
};

const Header = ({ setSidebarOpen }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const profileCardRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        (!profileCardRef.current ||
          !profileCardRef.current.contains(event.target))
      ) {
        setDropdownOpen(false);
        setShowProfileCard(false);
      }
    };
    if (dropdownOpen || showProfileCard) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen, showProfileCard]);

  const handleSidebarToggle = () => {
    setSidebarOpen((prev) => !prev);
  };

  const handleProfileClick = () => {
    setDropdownOpen((prev) => !prev);
    setShowProfileCard(false);
  };

  const handleProfile = () => {
    setShowProfileCard((prev) => !prev);
  };

  const handleLogout = () => {
    setDropdownOpen(false);
    setShowProfileCard(false);
    navigate("/");
  };

  return (
    <header className="header-container shadow-sm py-4 py-md-3 py-lg-4">
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
                height: isMobile ? 28 : 60,
                width: "auto",
                maxWidth: isMobile ? 100 : 130,
                cursor: "pointer",
              }}
              onClick={() => navigate("/dashboardlayout")}
            />
          </div>

          {/* Empty space for centering on larger screens */}
          <div className="col-md-6 d-none d-md-flex"></div>

          {/* Right: Profile icon with dropdown */}
          <div
            className="col-6 col-md-3 d-flex justify-content-end position-relative"
            ref={dropdownRef}
          >
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
                  left: "auto",
                  minWidth: 140,
                  position: "absolute",
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
                  onClick={() => navigate("/dashboardlayout/setting")}
                  type="button"
                >
                  <LogOut size={16} /> Setting
                </button>
                <Link
                  to="/"
                  onClick={handleLogout}
                  className="dropdown-item d-flex align-items-center gap-2 text-decoration-none"
                >
                  <LogOut size={16} /> Logout
                </Link>

              </div>
            )}
            {/* Profile Card */}
            {showProfileCard && (
              <div
                ref={profileCardRef}
                className="card shadow border-0"
                style={{
                  position: "absolute",
                  top: 70,
                  left: "50%",
                  transform: "translateX(-50%)",
                  minWidth: 260,
                  zIndex: 10000,
                  padding: 0,
                  background: "#fff",
                  borderRadius: 12,
                }}
              >
                <div className="card-body d-flex flex-column align-items-center p-4">
                  {/* Avatar */}
                  <div
                    className="rounded-circle text-white d-flex align-items-center justify-content-center mb-3"
                    style={{
                      width: 64,
                      height: 64,
                      fontSize: 22,
                      backgroundColor: "#d84a33",
                    }}
                  >
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </div>

                  {/* Name & Role */}
                  <div className="fw-bold fs-5 mb-1">{user.name}</div>
                  <div className="text-muted small mb-3">Admin</div>

                  {/* Details */}
                  <div className="w-100 mb-2">
                    <div className="fw-semibold small mb-1">Email:</div>
                    <div className="text-break small">{user.email}</div>
                  </div>
                  <div className="w-100 mb-2">
                    <div className="fw-semibold small mb-1">Phone:</div>
                    <div className="text-break small">{user.phone}</div>
                  </div>
                  <div className="w-100 mb-3">
                    <div className="fw-semibold small mb-1">Address:</div>
                    <div className="text-break small">{user.address}</div>
                  </div>

                  {/* View Profile Button */}
                  {/* <Link to="userprofile">
                    <button
                      className="btn btn-outline-danger btn-sm w-100"
                    >
                      View Profile
                    </button>
                  </Link> */}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
