import React, { useState, useRef, useCallback } from 'react';
import "./Notifications.css"

const Notifications = () => {
  const fileInputRef = useRef(null);


  // Sample notifications data
  const notifications = [
    { id: 'notif-1', type: 'upload', message: 'Your file "Summer Collection - Blue Dress.jpg" has been uploaded successfully', timestamp: '2025-06-12T10:30:00', read: false },
    { id: 'notif-2', type: 'system', message: 'System maintenance scheduled for June 15, 2025 at 02:00 AM UTC', timestamp: '2025-06-11T16:45:00', read: false },
    { id: 'notif-3', type: 'alert', message: 'Storage space is running low. Consider upgrading your plan or deleting unused files.', timestamp: '2025-06-10T09:15:00', read: false },
    { id: 'notif-4', type: 'share', message: 'John Smith shared a folder "Summer Campaign 2025" with you', timestamp: '2025-06-09T14:20:00', read: true },
    { id: 'notif-5', type: 'comment', message: 'Sarah Johnson commented on your file "Marketing Campaign Brief.docx"', timestamp: '2025-06-08T11:05:00', read: true },
  ];

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
      
      <div className="py-4"
      style={{marginTop: '78px'}}>
        {/* Navigation */}
      <div className="row">
  <div className="col-12">
    <div className="card shadow-sm border-0">
      <div className="card-header d-flex justify-content-between align-items-center bg-white border-bottom">
        <h5 className="mb-0 fw-bold">🔔 Notifications</h5>
        <div className="btn-group" role="group">
          <button type="button" className="btn btn-outline-primary btn-sm">
            <i className="fas fa-envelope-open-text me-1"></i> Mark all as read
          </button>
          <button type="button" className="btn btn-outline-danger btn-sm">
            <i className="fas fa-trash me-1"></i> Clear all
          </button>
        </div>
      </div>

      <div className="card-body p-0">
        {notifications.length === 0 ? (
          <div className="text-center py-5">
            <i className="fas fa-bell fa-3x text-muted mb-3"></i>
            <h5 className="text-muted">No notifications</h5>
            <p className="text-muted">You're all caught up! Check back later for updates.</p>
          </div>
        ) : (
          <div className="list-group list-group-flush">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`list-group-item d-flex justify-content-between align-items-start ${
                  notification.read ? '' : 'bg-light'
                }`}
              >
                <div className="d-flex align-items-start w-100">
                  <div className={`me-3 fs-5 text-${getNotificationColor(notification.type)}`}>
                    <i className={`fas ${getNotificationIcon(notification.type)}`}></i>
                  </div>
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between align-items-start">
                      <p className={`mb-1 ${notification.read ? 'text-muted' : 'fw-semibold'}`}>
                        {notification.message}
                      </p>
                      <small className="text-muted">{formatNotificationTime(notification.timestamp)}</small>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <span
                        className={`badge text-white ${
                          notification.type === 'upload' ? 'bg-success' :
                          notification.type === 'system' ? 'bg-primary' :
                          notification.type === 'alert' ? 'bg-warning text-dark' :
                          notification.type === 'share' ? 'bg-info' :
                          'bg-secondary'
                        }`}
                      >
                        {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                      </span>
                      <div className="btn-group btn-group-sm" role="group">
                        {!notification.read && (
                          <button className="btn btn-outline-primary">
                            <i className="fas fa-check me-1"></i> Read
                          </button>
                        )}
                        <button className="btn btn-outline-danger">
                          <i className="fas fa-trash-alt me-1"></i> Delete
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

      </div>
    </>
  );
};

export default Notifications;