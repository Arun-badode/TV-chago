import React, { useState, useRef, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Uploads = () => {
  const [activeTab, setActiveTab] = useState('uploads');
  const [viewMode, setViewMode] = useState('grid');
//   const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [showUploadProgress, setShowUploadProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
//   const [showNotifications, setShowNotifications] = useState(false);

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
    { id: 'IMG-1008', name: 'White Sneakers.jpg', type: 'image', size: '2.1 MB', date: '2025-05-31', category: 'Footwear', tags: ['sneakers', 'white', 'casual'] },
    { id: 'IMG-1009', name: 'Evening Gown - Black.jpg', type: 'image', size: '3.4 MB', date: '2025-05-30', category: 'Apparel', tags: ['gown', 'evening', 'formal'] },
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

  // Handle tab change
//   const handleTabChange = (tab: string) => {
//     setActiveTab(tab);
//     if (tab === 'notifications') {
//       setShowNotifications(true);
//     } else {
//       setShowNotifications(false);
//     }
//   };

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
//   const handleSelectFile = (fileId: string) => {
//     if (selectedFiles.includes(fileId)) {
//       setSelectedFiles(selectedFiles.filter(id => id !== fileId));
//       setSelectAll(false);
//     } else {
//       setSelectedFiles([...selectedFiles, fileId]);
//       if (selectedFiles.length + 1 === filteredUploads.length) {
//         setSelectAll(true);
//       }
//     }
//   };

  // Handle file upload
  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

//   // Handle file selection
//   const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = event.target.files;
//     if (files && files.length > 0) {
//       simulateUpload();
//     }
//   };

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

//   // Handle drag events
//   const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(true);
//   }, []);

//   const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);
//   }, []);

//   const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//   }, []);

//   const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);
//     const files = e.dataTransfer.files;
//     if (files && files.length > 0) {
//       simulateUpload();
//     }
//   }, []);

//   // Get file icon based on type
//   const getFileIcon = (type: string) => {
//     switch (type) {
//       case 'image':
//         return 'fa-image';
//       case 'document':
//         return 'fa-file-alt';
//       case 'video':
//         return 'fa-video';
//       default:
//         return 'fa-file';
//     }
//   };

//   // Get file type color
//   const getFileTypeColor = (type: string) => {
//     switch (type) {
//       case 'image':
//         return 'bg-primary text-white';
//       case 'document':
//         return 'bg-success text-white';
//       case 'video':
//         return 'bg-purple text-white';
//       default:
//         return 'bg-secondary text-white';
//     }
//   };

//   // Get notification icon based on type
//   const getNotificationIcon = (type: string) => {
//     switch (type) {
//       case 'upload':
//         return 'fa-upload';
//       case 'system':
//         return 'fa-cog';
//       case 'alert':
//         return 'fa-exclamation-triangle';
//       case 'share':
//         return 'fa-share-alt';
//       case 'comment':
//         return 'fa-comment';
//       default:
//         return 'fa-bell';
//     }
//   };

//   // Get notification color based on type
//   const getNotificationColor = (type: string) => {
//     switch (type) {
//       case 'upload':
//         return 'text-success';
//       case 'system':
//         return 'text-primary';
//       case 'alert':
//         return 'text-warning';
//       case 'share':
//         return 'text-purple';
//       case 'comment':
//         return 'text-indigo';
//       default:
//         return 'text-secondary';
//     }
//   };

//   // Format notification timestamp
//   const formatNotificationTime = (timestamp: string) => {
//     const date = new Date(timestamp);
//     const now = new Date();
//     const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
//     if (diffInHours < 1) {
//       const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
//       return `${diffInMinutes} min ago`;
//     } else if (diffInHours < 24) {
//       return `${diffInHours} hours ago`;
//     } else if (diffInHours < 48) {
//       return 'Yesterday';
//     } else {
//       return date.toLocaleDateString();
//     }
//   };

//   // Mark notification as read
//   const markAsRead = (id: string) => {
//     console.log(`Marking notification ${id} as read`);
//   };

//   // Delete notification
//   const deleteNotification = (id: string) => {
//     console.log(`Deleting notification ${id}`);
//   };

  // Count unread notifications
  const unreadCount = notifications.filter(notification => !notification.read).length;

  return (
    <div className="container-fluid p-0">
      {/* Notifications Content */}
      {activeTab === 'notifications' && (
        <div className="p-4">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h2 className="h5 mb-0">All Notifications</h2>
              <div className="d-flex align-items-center">
                <button className="btn btn-sm btn-link text-secondary me-2">
                  Mark all as read
                </button>
                <span className="text-muted me-2">|</span>
                <button className="btn btn-sm btn-link text-secondary">
                  Clear all
                </button>
              </div>
            </div>
            <div className="list-group list-group-flush">
              {notifications.length === 0 ? (
                <div className="text-center p-5">
                  <div className="mb-3">
                    <i className="fas fa-bell fa-3x text-muted"></i>
                  </div>
                  <h3 className="h5 mb-1">No notifications</h3>
                  <p className="text-muted">You're all caught up! Check back later for new updates.</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div key={notification.id} className={`list-group-item ${notification.read ? '' : 'bg-light'}`}>
                    <div className="d-flex align-items-start">
                      <div className={`flex-shrink-0 rounded-circle d-flex align-items-center justify-content-center ${notification.read ? 'bg-light' : 'bg-info'} p-2 ${getNotificationColor(notification.type)}`}>
                        <i className={`fas ${getNotificationIcon(notification.type)}`}></i>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <div className="d-flex justify-content-between">
                          <p className={`mb-1 ${notification.read ? '' : 'fw-bold'}`}>
                            {notification.message}
                          </p>
                          <small className="text-muted">{formatNotificationTime(notification.timestamp)}</small>
                        </div>
                        <div className="d-flex justify-content-between mt-2">
                          <div>
                            <span className={`badge ${notification.type === 'upload' ? 'bg-success' :
                              notification.type === 'system' ? 'bg-primary' :
                                notification.type === 'alert' ? 'bg-warning' :
                                  notification.type === 'share' ? 'bg-purple' :
                                    'bg-indigo'}`}>
                              {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                            </span>
                          </div>
                          <div>
                            {!notification.read && (
                              <button
                                onClick={() => markAsRead(notification.id)}
                                className="btn btn-sm btn-link text-primary me-2"
                              >
                                Mark as read
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="btn btn-sm btn-link text-danger"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
            {/* Pagination */}
            <div className="card-footer d-flex justify-content-between align-items-center">
              <div className="d-none d-sm-block">
                <p className="mb-0 text-muted">
                  Showing <span className="fw-bold">1</span> to <span className="fw-bold">{notifications.length}</span> of <span className="fw-bold">{notifications.length}</span> results
                </p>
              </div>
              <nav aria-label="Page navigation">
                <ul className="pagination pagination-sm mb-0">
                  <li className="page-item">
                    <button className="page-link">
                      <span aria-hidden="true">&laquo;</span>
                    </button>
                  </li>
                  <li className="page-item active">
                    <button className="page-link">1</button>
                  </li>
                  <li className="page-item">
                    <button className="page-link">
                      <span aria-hidden="true">&raquo;</span>
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Uploads Content */}
      {activeTab === 'uploads' && (
        <div className="p-4">
          {/* Upload Area */}
          <div
            className={`mb-4 border rounded p-5 text-center ${isDragging ? 'border-success bg-success bg-opacity-10' : 'border-dashed bg-white'}`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              multiple
              className="d-none"
              onChange={handleFileSelection}
            />
            <div className="d-flex flex-column align-items-center justify-content-center">
              <i className={`fas fa-cloud-upload-alt fa-3x mb-3 ${isDragging ? 'text-success' : 'text-muted'}`}></i>
              <h3 className="h5 mb-2">Drag and drop files here</h3>
              <p className="text-muted mb-3">or</p>
              <button
                onClick={handleFileUpload}
                className="btn btn-success"
              >
                Browse Files
              </button>
              <p className="text-muted mt-3 small">Supported formats: JPG, PNG, GIF, PDF, DOCX, MP4 (Max 50MB)</p>
            </div>
          </div>

          {/* Upload Progress */}
          {showUploadProgress && (
            <div className="card mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="d-flex align-items-center">
                    <i className="fas fa-file-image text-primary me-3"></i>
                    <div>
                      <h4 className="h6 mb-0">Uploading files...</h4>
                      <small className="text-muted">{uploadProgress}% complete</small>
                    </div>
                  </div>
                  <button className="btn btn-sm btn-link text-muted">
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          {/* Filters and Actions */}
          <div className="card mb-4">
            <div className="card-body">
              <div className="d-flex flex-wrap justify-content-between align-items-center">
                <div className="d-flex flex-wrap align-items-center mb-2 mb-md-0">
                  <div className="dropdown me-2 mb-2">
                    <button
                      className="btn btn-outline-secondary dropdown-toggle"
                      type="button"
                      id="typeFilterDropdown"
                      data-bs-toggle="dropdown"
                    >
                      File Type: {typeFilter === 'all' ? 'All' : typeFilter}
                    </button>
                    <ul className="dropdown-menu">
                      <li><button className="dropdown-item" onClick={() => setTypeFilter('all')}>All Types</button></li>
                      <li><button className="dropdown-item" onClick={() => setTypeFilter('image')}>Images</button></li>
                      <li><button className="dropdown-item" onClick={() => setTypeFilter('document')}>Documents</button></li>
                      <li><button className="dropdown-item" onClick={() => setTypeFilter('video')}>Videos</button></li>
                    </ul>
                  </div>
                  <div className="dropdown me-2 mb-2">
                    <button
                      className="btn btn-outline-secondary dropdown-toggle"
                      type="button"
                      id="categoryFilterDropdown"
                      data-bs-toggle="dropdown"
                    >
                      Category: {categoryFilter === 'all' ? 'All' : categoryFilter}
                    </button>
                    <ul className="dropdown-menu">
                      <li><button className="dropdown-item" onClick={() => setCategoryFilter('all')}>All Categories</button></li>
                      <li><button className="dropdown-item" onClick={() => setCategoryFilter('Apparel')}>Apparel</button></li>
                      <li><button className="dropdown-item" onClick={() => setCategoryFilter('Accessories')}>Accessories</button></li>
                      <li><button className="dropdown-item" onClick={() => setCategoryFilter('Footwear')}>Footwear</button></li>
                      <li><button className="dropdown-item" onClick={() => setCategoryFilter('Documents')}>Documents</button></li>
                      <li><button className="dropdown-item" onClick={() => setCategoryFilter('Marketing')}>Marketing</button></li>
                    </ul>
                  </div>
                  <div className="dropdown me-2 mb-2">
                    <button
                      className="btn btn-outline-secondary dropdown-toggle"
                      type="button"
                      id="dateFilterDropdown"
                      data-bs-toggle="dropdown"
                    >
                      Date: {dateFilter === 'all' ? 'All Time' : dateFilter}
                    </button>
                    <ul className="dropdown-menu">
                      <li><button className="dropdown-item" onClick={() => setDateFilter('all')}>All Time</button></li>
                      <li><button className="dropdown-item" onClick={() => setDateFilter('today')}>Today</button></li>
                      <li><button className="dropdown-item" onClick={() => setDateFilter('yesterday')}>Yesterday</button></li>
                      <li><button className="dropdown-item" onClick={() => setDateFilter('thisWeek')}>This Week</button></li>
                      <li><button className="dropdown-item" onClick={() => setDateFilter('thisMonth')}>This Month</button></li>
                      <li><button className="dropdown-item" onClick={() => setDateFilter('custom')}>Custom Range</button></li>
                    </ul>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <div className="btn-group me-2">
                    <button
                      className={`btn btn-sm ${viewMode === 'grid' ? 'btn-secondary' : 'btn-outline-secondary'}`}
                      onClick={() => setViewMode('grid')}
                    >
                      <i className="fas fa-th-large"></i>
                    </button>
                    <button
                      className={`btn btn-sm ${viewMode === 'list' ? 'btn-secondary' : 'btn-outline-secondary'}`}
                      onClick={() => setViewMode('list')}
                    >
                      <i className="fas fa-list"></i>
                    </button>
                  </div>
                  <div className="dropdown me-2">
                    <button
                      className="btn btn-sm btn-outline-secondary dropdown-toggle"
                      type="button"
                      id="sortDropdown"
                      data-bs-toggle="dropdown"
                    >
                      <i className="fas fa-sort-amount-down me-1"></i>
                      Sort
                    </button>
                    <ul className="dropdown-menu">
                      <li><button className="dropdown-item">Name (A-Z)</button></li>
                      <li><button className="dropdown-item">Name (Z-A)</button></li>
                      <li><button className="dropdown-item">Date (Newest)</button></li>
                      <li><button className="dropdown-item">Date (Oldest)</button></li>
                      <li><button className="dropdown-item">Size (Largest)</button></li>
                      <li><button className="dropdown-item">Size (Smallest)</button></li>
                    </ul>
                  </div>
                  <button
                    className="btn btn-sm btn-success"
                    onClick={handleFileUpload}
                  >
                    <i className="fas fa-upload me-1"></i>
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Batch Actions (visible when files are selected) */}
          {selectedFiles.length > 0 && (
            <div className="card mb-4">
              <div className="card-body py-2">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <span className="me-3">
                      {selectedFiles.length} {selectedFiles.length === 1 ? 'file' : 'files'} selected
                    </span>
                    <button className="btn btn-sm btn-link text-danger me-2">
                      <i className="fas fa-trash-alt me-1"></i>
                      Delete
                    </button>
                    <span className="text-muted me-2">|</span>
                    <button className="btn btn-sm btn-link text-secondary me-2">
                      <i className="fas fa-download me-1"></i>
                      Download
                    </button>
                    <span className="text-muted me-2">|</span>
                    <button className="btn btn-sm btn-link text-secondary">
                      <i className="fas fa-tag me-1"></i>
                      Add Tags
                    </button>
                  </div>
                  <div className="dropdown">
                    <button
                      className="btn btn-sm btn-outline-secondary dropdown-toggle"
                      type="button"
                      id="moveDropdown"
                      data-bs-toggle="dropdown"
                    >
                      Move to Category
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li><button className="dropdown-item">Apparel</button></li>
                      <li><button className="dropdown-item">Accessories</button></li>
                      <li><button className="dropdown-item">Footwear</button></li>
                      <li><button className="dropdown-item">Documents</button></li>
                      <li><button className="dropdown-item">Marketing</button></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Grid View */}
          {viewMode === 'grid' && (
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
              {filteredUploads.map((upload) => (
                <div key={upload.id} className="col">
                  <div className="card h-100">
                    <div className="position-relative">
                      <div className="position-absolute top-0 start-0 p-2">
                        <input
                          type="checkbox"
                          checked={selectedFiles.includes(upload.id)}
                          onChange={() => handleSelectFile(upload.id)}
                          className="form-check-input"
                        />
                      </div>
                      {upload.type === 'image' ? (
                        <div className="ratio ratio-4x3 bg-light">
                          <img
                            src={`https://readdy.ai/api/search-image?query=Professional%20product%20photography%20of%20a%20$%7Bupload.name.split%28.%29%5B0%5D%7D%20on%20a%20clean%20white%20background%2C%20high%20resolution%20commercial%20product%20image%20with%20soft%20shadows%2C%20studio%20lighting%2C%20minimalist%20style%2C%20fashion%20catalog%20quality&width=400&height=300&seq=${upload.id}&orientation=landscape`}
                            alt={upload.name}
                            className="img-fluid object-fit-cover"
                          />
                        </div>
                      ) : (
                        <div className="ratio ratio-4x3 bg-light d-flex flex-column align-items-center justify-content-center">
                          <i className={`fas ${getFileIcon(upload.type)} fa-3x text-muted mb-2`}></i>
                          <span className="text-muted small">{upload.type.toUpperCase()}</span>
                        </div>
                      )}
                      <div className="position-absolute top-0 end-0 p-2 opacity-0 hover-opacity-100" style={{ transition: 'opacity 0.2s' }}>
                        <div className="btn-group btn-group-sm">
                          <button className="btn btn-light">
                            <i className="fas fa-eye"></i>
                          </button>
                          <button className="btn btn-light">
                            <i className="fas fa-download"></i>
                          </button>
                          <button className="btn btn-light text-danger">
                            <i className="fas fa-trash-alt"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="d-flex justify-content-between">
                        <div className="flex-grow-1 me-2">
                          <h5 className="card-title text-truncate mb-1" title={upload.name}>
                            {upload.name}
                          </h5>
                          <small className="text-muted">
                            {upload.size} • {new Date(upload.date).toLocaleDateString()}
                          </small>
                        </div>
                        <span className={`badge ${getFileTypeColor(upload.type)}`}>
                          {upload.type}
                        </span>
                      </div>
                      <div className="mt-3">
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
                </div>
              ))}
            </div>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <div className="card">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th width="40">
                        <input
                          type="checkbox"
                          checked={selectAll}
                          onChange={handleSelectAll}
                          className="form-check-input"
                        />
                      </th>
                      <th>File Name</th>
                      <th>Type</th>
                      <th>Category</th>
                      <th>Size</th>
                      <th>Date Uploaded</th>
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
                            checked={selectedFiles.includes(upload.id)}
                            onChange={() => handleSelectFile(upload.id)}
                            className="form-check-input"
                          />
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div className="flex-shrink-0 me-2">
                              {upload.type === 'image' ? (
                                <img
                                  src={`https://readdy.ai/api/search-image?query=Professional%20product%20photography%20of%20a%20$%7Bupload.name.split%28.%29%5B0%5D%7D%20on%20a%20clean%20white%20background%2C%20high%20resolution%20commercial%20product%20image%20with%20soft%20shadows%2C%20studio%20lighting%2C%20minimalist%20style%2C%20fashion%20catalog%20quality&width=100&height=100&seq=${upload.id}&orientation=squarish`}
                                  alt={upload.name}
                                  className="rounded"
                                  width="40"
                                  height="40"
                                />
                              ) : (
                                <div className="bg-light rounded d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                                  <i className={`fas ${getFileIcon(upload.type)} text-muted`}></i>
                                </div>
                              )}
                            </div>
                            <div className="flex-grow-1">
                              {upload.name}
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${getFileTypeColor(upload.type)}`}>
                            {upload.type}
                          </span>
                        </td>
                        <td>{upload.category}</td>
                        <td>{upload.size}</td>
                        <td>{new Date(upload.date).toLocaleDateString()}</td>
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
                          <div className="btn-group btn-group-sm">
                            <button className="btn btn-link text-primary">
                              <i className="fas fa-eye"></i>
                            </button>
                            <button className="btn btn-link text-success">
                              <i className="fas fa-download"></i>
                            </button>
                            <button className="btn btn-link text-danger">
                              <i className="fas fa-trash-alt"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination */}
              <div className="card-footer d-flex justify-content-between align-items-center">
                <div className="d-none d-sm-block">
                  <p className="mb-0 text-muted">
                    Showing <span className="fw-bold">1</span> to <span className="fw-bold">{filteredUploads.length}</span> of <span className="fw-bold">{uploads.length}</span> results
                  </p>
                </div>
                <nav aria-label="Page navigation">
                  <ul className="pagination pagination-sm mb-0">
                    <li className="page-item">
                      <button className="page-link">
                        <span aria-hidden="true">&laquo;</span>
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
                        <span aria-hidden="true">&raquo;</span>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Uploads;