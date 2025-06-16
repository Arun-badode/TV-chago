import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <div className='container-fluid login-wrapper'>
      <div className="row vh-100">
        
        {/* Left Side Image */}
        <div className="col-md-6 d-none d-md-flex align-items-center justify-content-center image-section">
          <img src="https://i.ibb.co/Qjxysmcz/Tv-Package.jpg" alt="TV Package" className="img-fluid" />
        </div>

        {/* Right Side Login Form */}
        <div className="col-md-6 d-flex align-items-center justify-content-center form-section">
          <div className="login-box">
            <div className="login-header">
              <h1>🔐 Login</h1>
              <p>Access your TV Package System</p>
            </div>

            <form id="loginForm">
              <div className="form-group">
                <label htmlFor="loginUsername">Username</label>
                <input
                  type="text"
                  id="loginUsername"
                  required
                  placeholder="Enter your username"
                />
              </div>

              <div className="form-group">
                <label htmlFor="loginPassword">Password</label>
                <input
                  type="password"
                  id="loginPassword"
                  required
                  placeholder="Enter your password"
                />
              </div>

              <Link to="/dashboardlayout">
                <button type="submit" className="login-btn" id="loginBtn">
                  <span id="loginBtnText">Login</span>
                  <span id="loginLoader" className="loading" style={{ display: "none" }} />
                </button>
              </Link>
            </form>
          </div>
        </div>

      </div>
    </div>
  )
}

export default LoginPage;
