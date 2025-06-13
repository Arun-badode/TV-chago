import React, { useState, useRef, useEffect } from 'react';
import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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

  const renderProfileCard = () => (
    <div
      ref={profileCardRef}
      className="card border-0 shadow-lg"
      style={{
        position: 'absolute',
        top: 60,
        left: '50%',
        transform: 'translateX(-50%)',
        minWidth: 280,
        zIndex: 1050,
        backgroundColor: '#fff',
        borderRadius: '12px',
      }}
    >
      <div className="card-body p-4 d-flex flex-column align-items-center text-center">
        <div
          className="rounded-circle text-white d-flex align-items-center justify-content-center mb-2"
          style={{
            width: 56,
            height: 56,
            fontSize: 24,
            backgroundColor: '#d84a33',
          }}
        >
          {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
        </div>

        <h5 className="mb-1 fw-semibold">{user.name}</h5>
        <p className="text-muted mb-3 small">{user.role}</p>
        <div className="text-start w-100 mb-2">
          <strong>Email:</strong>
          <div className="text-muted small">{user.email}</div>
        </div>
        <div className="text-start w-100 mb-2">
          <strong>Phone:</strong>
          <div className="text-muted small">{user.phone}</div>
        </div>
        <div className="text-start w-100 mb-3">
          <strong>Address:</strong>
          <div className="text-muted small">{user.address}</div>
        </div>
        {/* <button className="profile1-button rounded-2">
          View Profile
        </button> */}



      </div>
    </div>
  );

  return (
    <Navbar
      expand="lg"
      className="fixed-top shadow-sm py-3"
      style={{ backgroundColor: '#fffcec' }}
    >
      <Container className="d-flex justify-content-between align-items-center">
        {/* Brand Logo */}
        <Navbar.Brand href="#" className="d-flex align-items-center">
          <Link to="/">
            <img
              src="https://i.postimg.cc/8CG6dNYw/Whats-App-Image-2025-06-12-at-11-59-46-c03b4354-removebg-preview.png"
              alt="Logo"
              height="40"
              width="90"
            />
          </Link>
        </Navbar.Brand>

        {/* Mobile profile dropdown */}
        <div className="d-lg-none d-flex align-items-center position-relative">
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="link"
              className="text-dark p-0 border-0 shadow-none"
              id="dropdown-profile-mobile"
            >
              <i className="bi bi-person fs-5"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ backgroundColor: '#fefae0' }}>
              <Dropdown.Item onClick={() => setShowProfileCard(prev => !prev)}>
                My Profile
              </Dropdown.Item>
              <Dropdown.Item href="/login">Login</Dropdown.Item>
              <Dropdown.Item href="/logout">Logout</Dropdown.Item>
            </Dropdown.Menu>

            {showProfileCard && renderProfileCard()}
          </Dropdown>
          <Navbar.Toggle />
        </div>

        {/* Desktop and nav links */}
        <Navbar.Collapse id="navbar-nav" className="justify-content-between">
          <Nav className="gap-4 mx-auto">
            <Nav.Link href="#home" className="text-dark fw-semibold">Home</Nav.Link>
            <Nav.Link href="#allproduct" className="text-dark fw-semibold">Shop</Nav.Link>
            <Nav.Link href="#blog" className="text-dark fw-semibold">Blog</Nav.Link>
            <Nav.Link href="#allproduct" className="text-dark fw-semibold">All Products</Nav.Link>
            <Nav.Link href="#contact" className="text-dark fw-semibold">Contact</Nav.Link>
          </Nav>

          {/* Desktop Profile dropdown */}
          <div className="d-none d-lg-flex align-items-center position-relative">
            <Dropdown align="end">
              <Dropdown.Toggle
                variant="link"
                className="text-dark p-0 border-0 shadow-none"
                id="dropdown-profile-desktop"
              >
                <i className="bi bi-person fs-5"></i>
              </Dropdown.Toggle>
              <Dropdown.Menu style={{ backgroundColor: '#fefae0' }}>
                <Dropdown.Item onClick={() => setShowProfileCard(prev => !prev)}>
                  My Profile
                </Dropdown.Item>
                <Dropdown.Item href="/login">Login</Dropdown.Item>
              </Dropdown.Menu>
              {showProfileCard && renderProfileCard()}
            </Dropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
