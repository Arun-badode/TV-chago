import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <Container className="text-center">
        {/* <img
          src="https://i.ibb.co/351BPH3s/image-1-1.png"
          alt="CHAGO TV Logo"
          height="50"
          className="mb-2"
        /> */}
        <p className="mb-1 ">Your one-stop destination for trendy fashion products.</p>
        <p className="small mb-0">© 2025 FASHIONHUB. All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;
