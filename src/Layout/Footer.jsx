import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer id='contact' className="bg-dark text-light pt-5 pb-3">
      <Container>
        <Row className="gy-4">
          {/* Brand */}
          <Col md={3}>
            <img
              src="https://i.ibb.co/hQXHbxq/Whats-App-Image-2025-06-12-at-11-36-54-4b11e3ec.jpg"
              alt="CHAGO TV Logo"
              height="40"
              width="90"

              className="d-inline-block align-top"
            />
            <p className='terxt-white-50'>Your one-stop destination for trendy and high-quality fashion products.</p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="social-icon"><FaFacebookF /></a>
              <a href="#" className="social-icon"><FaTwitter /></a>
              <a href="#" className="social-icon"><FaInstagram /></a>
              <a href="#" className="social-icon"><FaPinterestP /></a>
            </div>

          </Col>

          {/* Shop */}
          <Col md={3}>
            <h6 className="fw-bold">Shop</h6>
            <ul className="list-unstyled">
              <li>Men</li>
              <li>Women</li>
              <li>Kids</li>
              <li>Accessories</li>
              <li>New Arrivals</li>
            </ul>
          </Col>

          {/* Help */}
          <Col md={3}>
            <h6 className="fw-bold">Help</h6>
            <ul className="list-unstyled">
              <li>Customer Service</li>
              <li>My Account</li>
              <li>Find a Store</li>
              <li>Size Guide</li>
              <li>FAQs</li>
            </ul>
          </Col>

          {/* Contact */}
          <Col md={3}>
            <h6 className="fw-bold">Contact</h6>
           <p className="mb-1 text-white">
  <FaMapMarkerAlt className="me-2" style={{ color: '#d84a33' }} />
  123 Fashion Street, New York, NY 10001
</p>
<p className="mb-1 text-white">
  <FaPhoneAlt className="me-2" style={{ color: '#d84a33' }} />
  +1 (555) 123-4567
</p>
<p className="mb-3 text-white">
  <FaEnvelope className="me-2" style={{ color: '#d84a33' }} />
  info@fashionhub.com
</p>



            <h6 className="fw-bold">We Accept</h6>
            <div className="d-flex gap-2">
              <img src="https://img.icons8.com/color/36/visa.png" alt="Visa" />
              <img src="https://img.icons8.com/color/36/mastercard.png" alt="Mastercard" />
              <img src="https://img.icons8.com/color/36/amex.png" alt="Amex" />
              <img src="https://img.icons8.com/color/36/paypal.png" alt="PayPal" />
            </div>
          </Col>
        </Row>

        <hr className="border-secondary my-4" />
        <div className="text-center small text-muted">
          © 2025 FASHIONHUB. All rights reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
