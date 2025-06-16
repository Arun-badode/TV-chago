import React from 'react'
import "./layout.css"
import { Link } from 'react-router-dom'
import { Menu } from 'lucide-react'; // Import the menu icon

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <div>
      <header className="tvp-header">
        <div className="">
        <div className="container-fluid py-3 px-4 text-white rounded">
      <div className="row align-items-center justify-content-between">
        {/* === Logo and Toggle Button === */}
        <div className="col-auto d-flex align-items-center gap-3">
          <button 
            className="btn btn-outline-light btn-sm me-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={18} />
          </button>
          <img
            src="https://i.postimg.cc/8CG6dNYw/Whats-App-Image-2025-06-12-at-11-59-46-c03b4354-removebg-preview.png"
            alt="Logo"
            className="img-fluid"
            style={{ width: '130px', height: '50px', cursor: 'pointer' }}
          />
        </div>

        {/* === Links Right === */}
        <div className="col-auto d-flex align-items-center gap-3">
          <a href="#contact" className="btn btn-outline-light btn-sm">
            <i className="fas fa-phone me-1"></i> Contact Us
          </a>
          <a href="#support" className="btn btn-outline-light btn-sm">
            <i className="fas fa-headset me-1"></i> Support
          </a>
        <Link to="/login">
          <button className="btn btn-outline-light btn-sm">Login</button>
        </Link>
        </div>
      </div>
    </div>
        </div>
      </header>
    </div>
  )
}

export default Navbar