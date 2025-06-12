
import React, { useState } from 'react';

export default function Settings() {
      const [emailNotifications, setEmailNotifications] = useState(true);
        const [darkMode, setDarkMode] = useState(false);
  return (
     <div className="card " style={{marginTop:"78px"}}>
            <div className="card-body">
              <h5 className="card-title mb-4">Account Settings</h5>
              <div className="row">
                <div className="col-lg-8">
                  <div className="mb-5">
                    <h6 className="mb-3">Personal Information</h6>
                    <div className="mb-3">
                      <label htmlFor="fullName" className="form-label">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        className="form-control"
                        defaultValue="John Doe"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        defaultValue="john.doe@example.com"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="form-control"
                        defaultValue="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <h6 className="mb-3">Change Password</h6>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        New Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Enter new password"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        className="form-control"
                        placeholder="Confirm new password"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <h6 className="mb-3">Preferences</h6>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <label className="form-label">Email Notifications</label>
                        <p className="text-muted small mb-0">Receive email updates about your account activity</p>
                      </div>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="emailNotifications"
                          checked={emailNotifications}
                          onChange={() => setEmailNotifications(!emailNotifications)}
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <label className="form-label">Dark Mode</label>
                        <p className="text-muted small mb-0">Switch between light and dark theme</p>
                      </div>
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="darkMode"
                          checked={darkMode}
                          onChange={() => setDarkMode(!darkMode)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="d-flex">
                    <button className="btn btn-primary me-2">
                      Save Changes
                    </button>
                    <button className="btn btn-outline-secondary">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
  )
}
