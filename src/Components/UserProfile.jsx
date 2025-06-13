import React, { useState } from 'react';

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+91 9876543210",
    address: "123, Fashion Street, Mumbai",
    role: "Customer",
    joined: "January 15, 2023"
  });

  const [editedUser, setEditedUser] = useState({ ...user });

  const handleEdit = () => {
    setIsEditing(true);
    setEditedUser({ ...user });
  };

  const handleSave = () => {
    setUser({ ...editedUser });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser({ ...user });
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditedUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="container my-5 py-5">
      <div className="card shadow-lg border-0 rounded-4" style={{ backgroundColor: '#fffcec' }}>
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-4 text-center">
              <div 
                className="rounded-circle bg-dark text-white d-flex align-items-center justify-content-center mx-auto" 
                style={{ width: 100, height: 100, fontSize: 32 }}
              >
                {(isEditing ? editedUser.name : user.name).split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>
              <h5 className="mt-3 fw-bold">
                {isEditing ? editedUser.name : user.name}
              </h5>
              <p className="text-muted">
                {isEditing ? editedUser.role : user.role}
              </p>
            </div>
            
            <div className="col-md-8">
              <h5 className="fw-semibold mb-4">User Information</h5>
              <div className="row">
                <div className="col-sm-6 mb-3">
                  <strong>Name:</strong>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control mt-1"
                      value={editedUser.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                    />
                  ) : (
                    <div className="text-muted">{user.name}</div>
                  )}
                </div>
                
                <div className="col-sm-6 mb-3">
                  <strong>Role:</strong>
                  {isEditing ? (
                    <select
                      className="form-select mt-1"
                      value={editedUser.role}
                      onChange={(e) => handleInputChange('role', e.target.value)}
                    >
                      <option value="Customer">Customer</option>
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="Staff">Staff</option>
                    </select>
                  ) : (
                    <div className="text-muted">{user.role}</div>
                  )}
                </div>
                
                <div className="col-sm-6 mb-3">
                  <strong>Email:</strong>
                  {isEditing ? (
                    <input
                      type="email"
                      className="form-control mt-1"
                      value={editedUser.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  ) : (
                    <div className="text-muted">{user.email}</div>
                  )}
                </div>
                
                <div className="col-sm-6 mb-3">
                  <strong>Phone:</strong>
                  {isEditing ? (
                    <input
                      type="tel"
                      className="form-control mt-1"
                      value={editedUser.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  ) : (
                    <div className="text-muted">{user.phone}</div>
                  )}
                </div>
                
                <div className="col-sm-6 mb-3">
                  <strong>Address:</strong>
                  {isEditing ? (
                    <textarea
                      className="form-control mt-1"
                      rows="2"
                      value={editedUser.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                    />
                  ) : (
                    <div className="text-muted">{user.address}</div>
                  )}
                </div>
                
                <div className="col-sm-6 mb-3">
                  <strong>Joined:</strong>
                  {isEditing ? (
                    <input
                      type="text"
                      className="form-control mt-1"
                      value={editedUser.joined}
                      onChange={(e) => handleInputChange('joined', e.target.value)}
                      placeholder="e.g., January 15, 2023"
                    />
                  ) : (
                    <div className="text-muted">{user.joined}</div>
                  )}
                </div>
              </div>
              
              <div className="mt-3">
                {isEditing ? (
                  <div>
                    <button 
                      className="btn btn-success me-2"
                      onClick={handleSave}
                    >
                      Save Changes
                    </button>
                    <button 
                      className="btn btn-secondary"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button 
                    className="btn btn-outline-primary"
                    onClick={handleEdit}
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;