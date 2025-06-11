import React from 'react';
import { Container, Navbar, Nav, NavDropdown, Dropdown } from 'react-bootstrap';


const CustomNavbar = () => {
  return (
    <Navbar expand="lg" className="fixed-top py-3 shadow-lg" style={{ backgroundColor: '#fefae0' }}>
      <Container className="d-flex justify-content-between align-items-center">
        {/* Brand Logo */}
        <Navbar.Brand href="#" className="d-flex align-items-center">
          <span className="fw-bold me-0" style={{ color: '#9acd32' }}>FASHION</span>
          <span className="fw-bold text-dark">HUB</span>
        </Navbar.Brand>

        {/* Toggle for mobile */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* Navigation Links */}
        <Navbar.Collapse id="navbar-nav" className="justify-content-center">
          <Nav className="gap-4">
            <Nav.Link href="#" className="text-dark">Home</Nav.Link>
            <Nav.Link href="#" className="text-dark">Shop</Nav.Link>
            <Nav.Link href="#" className="text-dark">Blog</Nav.Link>
             <Nav.Link href="#" className="text-dark">All Products</Nav.Link>
      
     
            <Nav.Link href="#" className="text-dark">Contact</Nav.Link>
          </Nav>
        </Navbar.Collapse>

        {/* Icons */}
        <div className="d-none d-lg-flex align-items-center gap-4">
          <i className="bi bi-search fs-5 text-dark"></i>

          {/* Profile Dropdown */}
          <Dropdown align="end">
            <Dropdown.Toggle variant="link" className="text-dark p-0 border-0 shadow-none">
              <i className="bi bi-person fs-5 text-dark"></i>
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ backgroundColor: '#fefae0', minWidth: '160px' }}>
              <Dropdown.Item href="/profile">My Profile</Dropdown.Item>
              <Dropdown.Item href="/login">Login</Dropdown.Item>
              <Dropdown.Item href="/logout">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
