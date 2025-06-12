import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: '#fffcec'
,
      }}
    >
      <div
        className="position-relative bg-white bg-opacity-25 shadow p-4 pt-5 rounded-4"
        style={{
          maxWidth: '380px',
          width: '100%',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.2)',
        }}
      >
        {/* Avatar Icon */}
        <div
          className="position-absolute top-0 start-50 translate-middle rounded-circle d-flex justify-content-center align-items-center "
          style={{
            width: '80px',
            height: '80px',
            backgroundColor: '#d84a33',
            border: '4px solid white',
            
          }}
        >
          <i className="bi bi-person text-white fs-1"></i>
        </div>

        {/* Form Fields */}
        <Form className="mt-5">
          <Form.Group className="mb-3">
            <div className="d-flex align-items-center bg-white rounded px-3">
              <i className="bi bi-person-fill text-secondary me-2"></i>
              <Form.Control
                type="email"
                placeholder="Email ID"
                className="border-0 shadow-none bg-transparent"
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <div className="d-flex align-items-center bg-white rounded px-3">
              <i className="bi bi-lock-fill text-secondary me-2"></i>
              <Form.Control
                type="password"
                placeholder="Password"
                className="border-0 shadow-none bg-transparent"
              />
            </div>
          </Form.Group>

          <div className="d-flex justify-content-between align-items-center mb-2">
            <Form.Check
              type="checkbox"
              label={<span className="small text-dark">Remember me</span>}
            />
            <a href="#" className="small text-muted text-decoration-none">
              Forgot Password?
            </a>
          </div>
<Link to='/dashboardlayout'>
          <button
            className="w-100 rounded-pill border-0 mt-3"
            style={{
              background: '#d84a33',
              color: 'white',
              padding: '10px 0',
              letterSpacing: '1px',
            }}
          >
            LOGIN
          </button>
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
