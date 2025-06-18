import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

 const handleLogin = (e) => {
  e.preventDefault();

  if (username === 'admin@gmail.com' && password === 'admin@123') {
    toast.success('Login Successful!', {
      position: 'top-right',
      autoClose: 2000,
    });

    // Delay navigation slightly so user sees the toast
    setTimeout(() => {
      navigate('/dashboardlayout');
    }, 2000);
  } else {
    toast.error('Invalid username or password', {
      position: 'top-right',
      autoClose: 3000,
    });
  }
};


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

            <form id="loginForm" onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="loginUsername">Username</label>
                <input
                  type="text"
                  id="loginUsername"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                />
              </div>

              <div className="form-group">
                <label htmlFor="loginPassword">Password</label>
                <input
                  type="password"
                  id="loginPassword"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>

              <button type="submit" className="login-btn" id="loginBtn">
                <span id="loginBtnText">Login</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default LoginPage;
