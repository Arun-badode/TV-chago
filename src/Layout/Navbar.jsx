import React, { useState, useRef, useEffect } from 'react';
import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap';

const user = {
  name: "John Doe",
  email: "john.doe@email.com",
  phone: "+91 9876543210",
  address: "123, Fashion Street, Mumbai",
  role: "Customer",
};

const CustomNavbar = () => {
  const [showProfileCard, setShowProfileCard] = useState(false);
  const profileCardRef = useRef(null);

  // Close card on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileCardRef.current &&
        !profileCardRef.current.contains(event.target)
      ) {
        setShowProfileCard(false);
      }
    };
    if (showProfileCard) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfileCard]);

  return (
    <Navbar
      expand="lg"
      className="fixed-top py-3 shadow-lg"
      style={{
        backgroundColor: ' #fffcec',
      }}
    >
      <Container className="d-flex justify-content-between align-items-center">
        {/* Brand Logo */}
        <Navbar.Brand href="#" className="d-flex align-items-center">
          <img
            src="https://i.postimg.cc/8CG6dNYw/Whats-App-Image-2025-06-12-at-11-59-46-c03b4354-removebg-preview.png"
            alt="CHAGO TV Logo"
            height="40"
            width="90"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>

        {/* Profile icon (small screens only) */}
        <div className="d-lg-none d-flex align-items-center gap-3" style={{ position: 'relative' }}>
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="link"
              className="text-dark p-0 border-0 shadow-none"
              id="dropdown-profile-mobile"
            >
              <i className="bi bi-person fs-5 text-dark"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu
              style={{ backgroundColor: '#fefae0', minWidth: '160px' }}
            >
              <Dropdown.Item
                href="#"
                onClick={e => {
                  e.preventDefault();
                  setShowProfileCard(prev => !prev);
                }}
              >
                My Profile
              </Dropdown.Item>
              <Dropdown.Item href="/login">Login</Dropdown.Item>
              <Dropdown.Item href="/logout">Logout</Dropdown.Item>
            </Dropdown.Menu>
            {/* Profile Card for mobile */}
            {showProfileCard && (
              <div
                ref={profileCardRef}
                className="card shadow border-0"
                style={{
                  position: 'absolute',
                  top: 60,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  minWidth: 260,
                  zIndex: 1050,
                  padding: 0,
                  background: '#fff',
                }}
              >
                <div className="card-body d-flex flex-column align-items-center p-3">
                  <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center mb-2" style={{ width: 56, height: 56, fontSize: 24 }}>
                    {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                  <div className="fw-bold mb-1">{user.name}</div>
                  <div className="text-muted small mb-1">{user.role}</div>
                  <div className="w-100 mb-1">
                    <span className="fw-semibold">Email:</span>
                    <div className="text-break small">{user.email}</div>
                  </div>
                  <div className="w-100 mb-1">
                    <span className="fw-semibold">Phone:</span>
                    <div className="text-break small">{user.phone}</div>
                  </div>
                  <div className="w-100 mb-2">
                    <span className="fw-semibold">Address:</span>
                    <div className="text-break small">{user.address}</div>
                  </div>
                  <a href="/profile" className="btn btn-sm btn-primary w-100">
                    View Profile
                  </a>
                </div>
              </div>
            )}
          </Dropdown>
          {/* Toggle button */}
          <Navbar.Toggle aria-controls="navbar-nav" />
        </div>

        {/* Collapsible nav links */}
        <Navbar.Collapse id="navbar-nav" className="justify-content-between">
          <Nav className="gap-3 mx-auto">
            <Nav.Link href="#home" className="text-dark">
              Hoome
            </Nav.Link>
            <Nav.Link href="#allproduct" className="text-dark">
              Shop
            </Nav.Link>
            <Nav.Link href="#blog" className="text-dark">
              Blog
            </Nav.Link>
            <Nav.Link href="#allproduct" className="text-dark">
              All Products
            </Nav.Link>
            <Nav.Link href="#contact" className="text-dark">
              Contact
            </Nav.Link>
          </Nav>

          {/* Profile icon (large screens only) */}
          <div className="d-none d-lg-flex align-items-center gap-4" style={{ position: 'relative' }}>
            <Dropdown align="end">
              <Dropdown.Toggle
                variant="link"
                className="text-dark p-0 border-0 shadow-none"
                id="dropdown-profile-desktop"
              >
                <i className="bi bi-person fs-5 text-dark"></i>
              </Dropdown.Toggle>

              <Dropdown.Menu
                style={{ backgroundColor: '#fefae0', minWidth: '160px' }}
              >
                <Dropdown.Item
                  href="#"
                  onClick={e => {
                    e.preventDefault();
                    setShowProfileCard(prev => !prev);
                  }}
                >
                  My Profile
                </Dropdown.Item>
                <Dropdown.Item href="/login">Login</Dropdown.Item>
              </Dropdown.Menu>
              {/* Profile Card for desktop */}
              {showProfileCard && (
                <div
                  ref={profileCardRef}
                  className="card shadow border-0"
                  style={{
                    position: 'absolute',
                    top: 60,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    minWidth: 260,
                    zIndex: 1050,
                    padding: 0,
                    background: '#fff',
                  }}
                >
                  <div className="card-body d-flex flex-column align-items-center p-3">
                    <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center mb-2" style={{ width: 56, height: 56, fontSize: 24 }}>
                      {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </div>
                    <div className="fw-bold mb-1">{user.name}</div>
                    <div className="text-muted small mb-1">{user.role}</div>
                    <div className="w-100 mb-1">
                      <span className="fw-semibold">Email:</span>
                      <div className="text-break small">{user.email}</div>
                    </div>
                    <div className="w-100 mb-1">
                      <span className="fw-semibold">Phone:</span>
                      <div className="text-break small">{user.phone}</div>
                    </div>
                    <div className="w-100 mb-2">
                      <span className="fw-semibold">Address:</span>
                      <div className="text-break small">{user.address}</div>
                    </div>
                  
                  </div>
                </div>
              )}
            </Dropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
