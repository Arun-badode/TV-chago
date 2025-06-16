import React, { useState } from 'react';

const Settings = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [admin, setAdmin] = useState({
    name: 'John Admin',
    email: 'admin@example.com',
    contact: '1234567890',
    password: 'admin@123',
  });

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    // ✅ You can connect this to your backend here
    console.log('Updated Admin Profile:', admin);
  };

  return (
    <div style={{ marginTop: '80px' }}>
      <h2 className="mb-4">Profile Settings</h2>
      <div className="card">
        <div className="card-header">
          <h5>Admin Profile</h5>
        </div>
        <div className="card-body">

          {/* Name */}
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={admin.name}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={admin.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          {/* Contact */}
          <div className="mb-3">
            <label className="form-label">Contact</label>
            <input
              type="text"
              className="form-control"
              name="contact"
              value={admin.contact}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={admin.password}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          {/* Buttons */}
          {isEditing ? (
            <button className="btn btn-primary" onClick={handleSave}>
              Save
            </button>
          ) : (
            <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
