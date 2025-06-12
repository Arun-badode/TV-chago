import React from 'react';
import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap';

const CustomNavbar = () => {
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
        <div className="d-lg-none d-flex align-items-center gap-3">
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="link"
              className="text-dark p-0 border-0 shadow-none"
            >
              <i className="bi bi-person fs-5 text-dark"></i>
            </Dropdown.Toggle>
            <Dropdown.Menu
              style={{ backgroundColor: '#fefae0', minWidth: '160px' }}
            >
              <Dropdown.Item href="/profile">My Profile</Dropdown.Item>
              <Dropdown.Item href="/login">Login</Dropdown.Item>
              <Dropdown.Item href="/logout">Logout</Dropdown.Item>
            </Dropdown.Menu>
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
          <div className="d-none d-lg-flex align-items-center gap-4">
            <Dropdown align="end">
              <Dropdown.Toggle
                variant="link"
                className="text-dark p-0 border-0 shadow-none"
              >
                <i className="bi bi-person fs-5 text-dark"></i>
              </Dropdown.Toggle>

              <Dropdown.Menu
                style={{ backgroundColor: '#fefae0', minWidth: '160px' }}
              >
                <Dropdown.Item href="/profile">My Profile</Dropdown.Item>
                <Dropdown.Item href="/login">Login</Dropdown.Item>
                
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
