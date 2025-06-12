import React, { useState, useRef, useCallback } from 'react';

const App = () => {
  const [activeTab, setActiveTab] = useState('uploads');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [showUploadProgress, setShowUploadProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // Sample uploads data
  const uploads = [
    { id: 'IMG-1001', name: 'Summer Collection - Blue Dress.jpg', type: 'image', size: '2.4 MB', date: '2025-06-10', category: 'Apparel', tags: ['summer', 'dress', 'women'] },
    { id: 'IMG-1002', name: 'Casual Denim Jacket.jpg', type: 'image', size: '1.8 MB', date: '2025-06-09', category: 'Apparel', tags: ['jacket', 'denim', 'casual'] },
    { id: 'IMG-1003', name: 'Leather Handbag - Brown.jpg', type: 'image', size: '3.1 MB', date: '2025-06-08', category: 'Accessories', tags: ['handbag', 'leather', 'brown'] },
    { id: 'DOC-1001', name: 'Product Specifications.pdf', type: 'document', size: '1.2 MB', date: '2025-06-07', category: 'Documents', tags: ['specifications', 'product'] },
    { id: 'IMG-1004', name: 'Summer Hat Collection.jpg', type: 'image', size: '2.7 MB', date: '2025-06-06', category: 'Accessories', tags: ['hat', 'summer', 'accessories'] },
    { id: 'IMG-1005', name: 'Floral Print Dress.jpg', type: 'image', size: '2.2 MB', date: '2025-06-05', category: 'Apparel', tags: ['dress', 'floral', 'women'] },
    { id: 'VID-1001', name: 'Product Showcase.mp4', type: 'video', size: '24.5 MB', date: '2025-06-04', category: 'Marketing', tags: ['video', 'showcase', 'marketing'] },
    { id: 'IMG-1006', name: 'Mens Casual Shirt.jpg', type: 'image', size: '1.9 MB', date: '2025-06-03', category: 'Apparel', tags: ['shirt', 'casual', 'men'] },
    { id: 'IMG-1007', name: 'Designer Sunglasses.jpg', type: 'image', size: '2.3 MB', date: '2025-06-02', category: 'Accessories', tags: ['sunglasses', 'designer', 'summer'] },
    { id: 'DOC-1002', name: 'Marketing Campaign Brief.docx', type: 'document', size: '0.8 MB', date: '2025-06-01', category: 'Documents', tags: ['marketing', 'campaign', 'brief'] },
  ];

  // Sample notifications data
  const notifications = [
    { id: 'notif-1', type: 'upload', message: 'Your file "Summer Collection - Blue Dress.jpg" has been uploaded successfully', timestamp: '2025-06-12T10:30:00', read: false },
    { id: 'notif-2', type: 'system', message: 'System maintenance scheduled for June 15, 2025 at 02:00 AM UTC', timestamp: '2025-06-11T16:45:00', read: false },
    { id: 'notif-3', type: 'alert', message: 'Storage space is running low. Consider upgrading your plan or deleting unused files.', timestamp: '2025-06-10T09:15:00', read: false },
    { id: 'notif-4', type: 'share', message: 'John Smith shared a folder "Summer Campaign 2025" with you', timestamp: '2025-06-09T14:20:00', read: true },
    { id: 'notif-5', type: 'comment', message: 'Sarah Johnson commented on your file "Marketing Campaign Brief.docx"', timestamp: '2025-06-08T11:05:00', read: true },
  ];

  // Filter uploads based on type, category, date, and search query
  const filteredUploads = uploads.filter(upload => {
    const matchesType = typeFilter === 'all' || upload.type === typeFilter;
    const matchesCategory = categoryFilter === 'all' || upload.category === categoryFilter;
    const matchesSearch = upload.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      upload.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesCategory && matchesSearch;
  });

  // Handle select all
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(filteredUploads.map(upload => upload.id));
    }
    setSelectAll(!selectAll);
  };

  // Handle select file
  const handleSelectFile = (fileId) => {
    if (selectedFiles.includes(fileId)) {
      setSelectedFiles(selectedFiles.filter(id => id !== fileId));
      setSelectAll(false);
    } else {
      setSelectedFiles([...selectedFiles, fileId]);
      if (selectedFiles.length + 1 === filteredUploads.length) {
        setSelectAll(true);
      }
    }
  };

  // Handle file upload
  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle file selection
  const handleFileSelection = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      simulateUpload();
    }
  };

  // Simulate upload progress
  const simulateUpload = () => {
    setShowUploadProgress(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setShowUploadProgress(false);
          }, 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  // Handle drag events
  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      simulateUpload();
    }
  }, []);

  // Get file icon based on type
  const getFileIcon = (type) => {
    switch (type) {
      case 'image':
        return 'fa-image';
      case 'document':
        return 'fa-file-alt';
      case 'video':
        return 'fa-video';
      default:
        return 'fa-file';
    }
  };

  // Get file type color
  const getFileTypeColor = (type) => {
    switch (type) {
      case 'image':
        return 'bg-primary text-white';
      case 'document':
        return 'bg-success text-white';
      case 'video':
        return 'bg-info text-white';
      default:
        return 'bg-secondary text-white';
    }
  };

  // Get notification icon based on type
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'upload':
        return 'fa-upload';
      case 'system':
        return 'fa-cog';
      case 'alert':
        return 'fa-exclamation-triangle';
      case 'share':
        return 'fa-share-alt';
      case 'comment':
        return 'fa-comment';
      default:
        return 'fa-bell';
    }
  };

  // Get notification color based on type
  const getNotificationColor = (type) => {
    switch (type) {
      case 'upload':
        return 'text-success';
      case 'system':
        return 'text-primary';
      case 'alert':
        return 'text-warning';
      case 'share':
        return 'text-info';
      case 'comment':
        return 'text-secondary';
      default:
        return 'text-muted';
    }
  };

  // Format notification timestamp
  const formatNotificationTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `${diffInMinutes} min ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else if (diffInHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  // Count unread notifications
  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet" />
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
      
      <div className="container-fluid py-4">
        {/* Navigation Tabs */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h1 className="h3 mb-0">
                <span className="text-success fw-bold">FASHION</span>
                <span className="text-dark fw-bold">HUB</span>
              </h1>
              <div className="input-group" style={{ maxWidth: '300px' }}>
                <span className="input-group-text">
                  <i className="fas fa-search"></i>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder={activeTab === 'notifications' ? "Search notifications..." : "Search uploads..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <ul className="nav nav-pills">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === 'uploads' ? 'active' : ''}`}
                  onClick={() => setActiveTab('uploads')}
                >
                  <i className="fas fa-upload me-2"></i>
                  Uploads
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link position-relative ${activeTab === 'notifications' ? 'active' : ''}`}
                  onClick={() => setActiveTab('notifications')}
                >
                  <i className="fas fa-bell me-2"></i>
                  Notifications
                  {unreadCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {unreadCount}
                    </span>
                  )}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Notifications Content */}
        {activeTab === 'notifications' && (
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">All Notifications</h5>
                  <div className="btn-group" role="group">
                    <button type="button" className="btn btn-outline-secondary btn-sm">
                      Mark all as read
                    </button>
                    <button type="button" className="btn btn-outline-secondary btn-sm">
                      Clear all
                    </button>
                  </div>
                </div>
                <div className="card-body p-0">
                  {notifications.length === 0 ? (
                    <div className="text-center py-5">
                      <i className="fas fa-bell fa-3x text-muted mb-3"></i>
                      <h5 className="text-muted">No notifications</h5>
                      <p className="text-muted">You're all caught up! Check back later for new updates.</p>
                    </div>
                  ) : (
                    <div className="list-group list-group-flush">
                      {notifications.map((notification) => (
                        <div key={notification.id} className={`list-group-item ${notification.read ? '' : 'bg-light'}`}>
                          <div className="d-flex align-items-start">
                            <div className={`me-3 ${getNotificationColor(notification.type)}`}>
                              <i className={`fas ${getNotificationIcon(notification.type)} fa-lg`}></i>
                            </div>
                            <div className="flex-grow-1">
                              <div className="d-flex justify-content-between align-items-start">
                                <p className={`mb-1 ${notification.read ? 'text-muted' : 'fw-semibold'}`}>
                                  {notification.message}
                                </p>
                                <small className="text-muted">{formatNotificationTime(notification.timestamp)}</small>
                              </div>
                              <div className="d-flex justify-content-between align-items-center mt-2">
                                <span className={`badge ${
                                  notification.type === 'upload' ? 'bg-success' :
                                  notification.type === 'system' ? 'bg-primary' :
                                  notification.type === 'alert' ? 'bg-warning' :
                                  notification.type === 'share' ? 'bg-info' :
                                  'bg-secondary'
                                }`}>
                                  {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                                </span>
                                <div className="btn-group" role="group">
                                  {!notification.read && (
                                    <button className="btn btn-sm btn-outline-primary">
                                      Mark as read
                                    </button>
                                  )}
                                  <button className="btn btn-sm btn-outline-danger">
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Uploads Content */}
        {activeTab === 'uploads' && (
          <>
            {/* Upload Area */}
            <div className="row mb-4">
              <div className="col-12">
                <div
                  className={`card ${isDragging ? 'border-success bg-light' : ''}`}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                >
                  <div className="card-body text-center py-5">
                    <input
                      type="file"
                      ref={fileInputRef}
                      multiple
                      className="d-none"
                      onChange={handleFileSelection}
                    />
                    <i className={`fas fa-cloud-upload-alt fa-4x mb-3 ${isDragging ? 'text-success' : 'text-muted'}`}></i>
                    <h5 className="mb-2">Drag and drop files here</h5>
                    <p className="text-muted mb-3">or</p>
                    <button
                      onClick={handleFileUpload}
                      className="btn btn-success"
                    >
                      Browse Files
                    </button>
                    <p className="text-muted small mt-3">Supported formats: JPG, PNG, GIF, PDF, DOCX, MP4 (Max 50MB)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Upload Progress */}
            {showUploadProgress && (
              <div className="row mb-4">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <div className="d-flex align-items-center">
                          <i className="fas fa-file-image text-primary me-3"></i>
                          <div>
                            <h6 className="mb-0">Uploading files...</h6>
                            <small className="text-muted">{uploadProgress}% complete</small>
                          </div>
                        </div>
                        <button className="btn btn-sm btn-outline-secondary">
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                      <div className="progress">
                        <div
                          className="progress-bar bg-success"
                          role="progressbar"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Filters and Actions */}
            <div className="row mb-4">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row g-3 align-items-center">
                      <div className="col-sm-6 col-lg-3">
                        <select
                          className="form-select"
                          value={typeFilter}
                          onChange={(e) => setTypeFilter(e.target.value)}
                        >
                          <option value="all">All Types</option>
                          <option value="image">Images</option>
                          <option value="document">Documents</option>
                          <option value="video">Videos</option>
                        </select>
                      </div>
                      <div className="col-sm-6 col-lg-3">
                        <select
                          className="form-select"
                          value={categoryFilter}
                          onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                          <option value="all">All Categories</option>
                          <option value="Apparel">Apparel</option>
                          <option value="Accessories">Accessories</option>
                          <option value="Documents">Documents</option>
                          <option value="Marketing">Marketing</option>
                        </select>
                      </div>
                      <div className="col-sm-6 col-lg-3">
                        <div className="btn-group w-100" role="group">
                          <button
                            type="button"
                            className={`btn ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => setViewMode('grid')}
                          >
                            <i className="fas fa-th-large"></i>
                          </button>
                          <button
                            type="button"
                            className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => setViewMode('list')}
                          >
                            <i className="fas fa-list"></i>
                          </button>
                        </div>
                      </div>
                      <div className="col-sm-6 col-lg-3">
                        <button
                          onClick={handleFileUpload}
                          className="btn btn-success w-100"
                        >
                          <i className="fas fa-upload me-2"></i>
                          Upload
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Batch Actions */}
            {selectedFiles.length > 0 && (
              <div className="row mb-4">
                <div className="col-12">
                  <div className="alert alert-info d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{selectedFiles.length}</strong> {selectedFiles.length === 1 ? 'file' : 'files'} selected
                    </div>
                    <div className="btn-group" role="group">
                      <button className="btn btn-sm btn-outline-danger">
                        <i className="fas fa-trash-alt me-1"></i>
                        Delete
                      </button>
                      <button className="btn btn-sm btn-outline-primary">
                        <i className="fas fa-download me-1"></i>
                        Download
                      </button>
                      <button className="btn btn-sm btn-outline-secondary">
                        <i className="fas fa-tag me-1"></i>
                        Add Tags
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Grid View */}
            {viewMode === 'grid' && (
              <div className="row g-4">
                {filteredUploads.map((upload) => (
                  <div key={upload.id} className="col-sm-6 col-md-4 col-lg-3">
                    <div className="card h-100">
                      <div className="position-relative">
                        <div className="position-absolute top-0 start-0 p-2">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={selectedFiles.includes(upload.id)}
                            onChange={() => handleSelectFile(upload.id)}
                          />
                        </div>
                        {upload.type === 'image' ? (
                          <img
                            src={`https://via.placeholder.com/400x300/f8f9fa/6c757d?text=${encodeURIComponent(upload.name.split('.')[0])}`}
                            className="card-img-top"
                            alt={upload.name}
                            style={{ height: '200px', objectFit: 'cover' }}
                          />
                        ) : (
                          <div className="card-img-top d-flex flex-column align-items-center justify-content-center bg-light" style={{ height: '200px' }}>
                            <i className={`fas ${getFileIcon(upload.type)} fa-3x text-muted mb-2`}></i>
                            <span className="text-muted small">{upload.type.toUpperCase()}</span>
                          </div>
                        )}
                        <div className="position-absolute top-0 end-0 p-2">
                          <div className="btn-group-vertical" role="group">
                            <button className="btn btn-sm btn-light">
                              <i className="fas fa-eye"></i>
                            </button>
                            <button className="btn btn-sm btn-light">
                              <i className="fas fa-download"></i>
                            </button>
                            <button className="btn btn-sm btn-light text-danger">
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="card-title text-truncate" title={upload.name}>{upload.name}</h6>
                          <span className={`badge ${getFileTypeColor(upload.type)}`}>
                            {upload.type}
                          </span>
                        </div>
                        <p className="card-text small text-muted">
                          {upload.size} • {new Date(upload.date).toLocaleDateString()}
                        </p>
                        <div className="d-flex flex-wrap gap-1">
                          {upload.tags.map((tag, index) => (
                            <span key={index} className="badge bg-light text-dark">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* List View */}
            {viewMode === 'list' && (
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="table-responsive">
                      <table className="table table-hover mb-0">
                        <thead className="table-light">
                          <tr>
                            <th>
                              <input
                                type="checkbox"
                                className="form-check-input"
                                checked={selectAll}
                                onChange={handleSelectAll}
                              />
                            </th>
                            <th>File Name</th>
                            <th>Type</th>
                            <th>Category</th>
                            <th>Size</th>
                            <th>Date</th>
                            <th>Tags</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredUploads.map((upload) => (
                            <tr key={upload.id}>
                              <td>
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  checked={selectedFiles.includes(upload.id)}
                                  onChange={() => handleSelectFile(upload.id)}
                                />
                              </td>
                              <td>
                                <div className="d-flex align-items-center">
                                  <div className="me-3">
                                    {upload.type === 'image' ? (
                                      <img
                                        src={`https://via.placeholder.com/40x40/f8f9fa/6c757d?text=${upload.name.charAt(0)}`}
                                        className="rounded"
                                        alt={upload.name}
                                        width="40"
                                        height="40"
                                      />
                                    ) : (
                                      <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                        <i className={`fas ${getFileIcon(upload.type)} text-muted`}></i>
                                      </div>
                                    )}
                                  </div>
                                  <span className="fw-medium">{upload.name}</span>
                                </div>
                              </td>
                              <td>
                                <span className={`badge ${getFileTypeColor(upload.type)}`}>
                                  {upload.type}
                                </span>
                              </td>
                              <td>{upload.category}</td>
                              <td className="text-muted">{upload.size}</td>
                              <td className="text-muted">{new Date(upload.date).toLocaleDateString()}</td>
                              <td>
                                <div className="d-flex flex-wrap gap-1">
                                  {upload.tags.map((tag, index) => (
                                    <span key={index} className="badge bg-light text-dark">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </td>
                              <td>
                                <div className="btn-group" role="group">
                                  <button className="btn btn-sm btn-outline-primary">
                                    <i className="fas fa-eye"></i>
                                  </button>
                                  <button className="btn btn-sm btn-outline-success">
                                    <i className="fas fa-download"></i>
                                  </button>
                                  <button className="btn btn-sm btn-outline-danger">
                                    <i className="fas fa-trash-alt"></i>
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Pagination */}
            <div className="row mt-4">
              <div className="col-12">
                <nav>
                  <ul className="pagination justify-content-center">
                    <li className="page-item">
                      <button className="page-link">
                        <i className="fas fa-chevron-left"></i>
                      </button>
                    </li>
                    <li className="page-item active">
                      <button className="page-link">1</button>
                    </li>
                    <li className="page-item">
                      <button className="page-link">2</button>
                    </li>
                    <li className="page-item">
                      <button className="page-link">
                        <i className="fas fa-chevron-right"></i>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default App;