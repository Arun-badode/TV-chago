import React, { useState } from 'react';
import { FaEnvelope, FaSms, FaCheckCircle, FaPaperclip, FaSearch, FaFilter } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Notifications = () => {
  // Sample notification data with order completion notifications
  const [notifications, setNotifications] = useState({
    emails: [
      { 
        id: 1, 
        to: 'customer@example.com', 
        subject: 'Your order ORD-001 has been completed', 
        body: 'Dear customer, your Premium Web Design service has been successfully completed. Thank you for your business!',
        date: '2025-06-15 14:30', 
        status: 'Sent',
        orderId: 'ORD-001',
        type: 'order_completion'
      },
      { 
        id: 2, 
        to: 'admin@example.com', 
        subject: 'Daily Report', 
        body: 'Daily system report for June 15, 2025',
        date: '2025-06-15 09:00', 
        status: 'Sent',
        type: 'system'
      },
    ],
    sms: [
      { 
        id: 1, 
        to: '+1234567890', 
        message: 'Your order ORD-002 is complete. Thank you for choosing our Standard Logo Design service!', 
        date: '2025-06-14 15:45', 
        status: 'Delivered',
        orderId: 'ORD-002',
        type: 'order_completion'
      },
      { 
        id: 2, 
        to: '+9876543210', 
        message: 'System alert: New login detected', 
        date: '2025-06-14 08:30', 
        status: 'Delivered',
        type: 'system'
      },
    ],
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [newEmail, setNewEmail] = useState({
    to: '',
    subject: 'Your order has been completed',
    body: 'Dear customer,\n\nYour [SERVICE_NAME] has been successfully completed. Thank you for your business!\n\nOrder ID: [ORDER_ID]\n\nBest regards,\nThe Service Team',
    orderId: ''
  });
  const [showEmailModal, setShowEmailModal] = useState(false);

  // Filter notifications
  const filteredEmails = notifications.emails.filter(notification => {
    const matchesSearch = notification.subject.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         notification.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (notification.orderId && notification.orderId.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || notification.status === statusFilter;
    const matchesType = typeFilter === 'All' || notification.type === typeFilter.toLowerCase().replace(' ', '_');
    return matchesSearch && matchesStatus && matchesType;
  });

  const filteredSms = notifications.sms.filter(notification => {
    const matchesSearch = notification.message.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         notification.to.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (notification.orderId && notification.orderId.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'All' || notification.status === statusFilter;
    const matchesType = typeFilter === 'All' || notification.type === typeFilter.toLowerCase().replace(' ', '_');
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Sent':
      case 'Delivered':
        return 'bg-success';
      case 'Failed':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  const getTypeBadge = (type) => {
    switch(type) {
      case 'order_completion':
        return 'bg-primary';
      case 'system':
        return 'bg-info text-dark';
      default:
        return 'bg-secondary';
    }
  };

  const viewNotificationDetails = (notification, type) => {
    setSelectedNotification({ ...notification, notificationType: type });
    setShowDetailModal(true);
  };

  const sendNewEmail = () => {
    const newEmailNotification = {
      id: notifications.emails.length + 1,
      to: newEmail.to,
      subject: newEmail.subject,
      body: newEmail.body,
      date: new Date().toISOString(),
      status: 'Pending',
      orderId: newEmail.orderId,
      type: 'order_completion'
    };
    
    setNotifications(prev => ({
      ...prev,
      emails: [newEmailNotification, ...prev.emails]
    }));
    
    setNewEmail({
      to: '',
      subject: 'Your order has been completed',
      body: 'Dear customer,\n\nYour [SERVICE_NAME] has been successfully completed. Thank you for your business!\n\nOrder ID: [ORDER_ID]\n\nBest regards,\nThe Service Team',
      orderId: ''
    });
    setShowEmailModal(false);
  };

  return (
    <div className="container-fluid py-4">
      <div className="row mb-4">
        <div className="col-md-8">
        <h4 className="text-dark mb-2">Notification Center</h4>
          <p className="text-muted mb-0">View and manage all system notifications</p>
        </div>
        <div className="col-md-4 d-flex align-items-center justify-content-end">
          <button 
            className="btn btn-primary"
            onClick={() => setShowEmailModal(true)}
          >
            <FaEnvelope className="me-2" />
            Send Completion Email
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <div className="input-group">
                <span className="input-group-text">
                  <FaSearch />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="input-group">
                <span className="input-group-text">
                  <FaFilter />
                </span>
                <select
                  className="form-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Statuses</option>
                  <option value="Sent">Sent</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
            </div>
            <div className="col-md-3">
              <div className="input-group">
                <span className="input-group-text">
                  <FaFilter />
                </span>
                <select
                  className="form-select"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                >
                  <option value="All">All Types</option>
                  <option value="Order Completion">Order Completion</option>
                  <option value="System">System</option>
                </select>
              </div>
            </div>
            <div className="col-md-2">
              <button 
                className="btn btn-outline-secondary w-100"
                onClick={() => {
                  setSearchTerm('');
                  setStatusFilter('All');
                  setTypeFilter('All');
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Email Notifications */}
        <div className="col-lg-6 mb-4">
          <motion.div 
            className="card h-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="card-header bg-primary text-white d-flex align-items-center">
              <FaEnvelope className="me-2" />
              <h5 className="mb-0">Email Notifications</h5>
              <span className="badge bg-white text-primary ms-auto">
                {filteredEmails.length} notifications
              </span>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Recipient</th>
                      <th>Subject</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmails.length > 0 ? (
                      filteredEmails.map(email => (
                        <motion.tr
                          key={email.id}
                          whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                          className="cursor-pointer"
                          onClick={() => viewNotificationDetails(email, 'email')}
                        >
                          <td>
                            <div>{email.to}</div>
                            {email.orderId && (
                              <small className="text-muted">Order: {email.orderId}</small>
                            )}
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              {email.type === 'order_completion' && (
                                <FaCheckCircle className="text-success me-2" />
                              )}
                              {email.subject}
                            </div>
                          </td>
                          <td>
                            <small className="text-muted">
                              {new Date(email.date).toLocaleString()}
                            </small>
                          </td>
                          <td>
                            <span className={`badge ${getStatusBadge(email.status)}`}>
                              {email.status}
                            </span>
                            <span className={`badge ${getTypeBadge(email.type)} ms-2`}>
                              {email.type === 'order_completion' ? 'Order' : 'System'}
                            </span>
                          </td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center py-4">
                          No email notifications found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>

        {/* SMS Notifications */}
        <div className="col-lg-6 mb-4">
          <motion.div 
            className="card h-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="card-header bg-info text-white d-flex align-items-center">
              <FaSms className="me-2" />
              <h5 className="mb-0">SMS Notifications</h5>
              <span className="badge bg-white text-info ms-auto">
                {filteredSms.length} notifications
              </span>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Recipient</th>
                      <th>Message</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSms.length > 0 ? (
                      filteredSms.map(sms => (
                        <motion.tr
                          key={sms.id}
                          whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
                          className="cursor-pointer"
                          onClick={() => viewNotificationDetails(sms, 'sms')}
                        >
                          <td>
                            <div>{sms.to}</div>
                            {sms.orderId && (
                              <small className="text-muted">Order: {sms.orderId}</small>
                            )}
                          </td>
                          <td>
                            <div className="d-flex align-items-center">
                              {sms.type === 'order_completion' && (
                                <FaCheckCircle className="text-success me-2" />
                              )}
                              <small className="text-truncate d-inline-block" style={{ maxWidth: '150px' }}>
                                {sms.message}
                              </small>
                            </div>
                          </td>
                          <td>
                            <small className="text-muted">
                              {new Date(sms.date).toLocaleString()}
                            </small>
                          </td>
                          <td>
                            <span className={`badge ${getStatusBadge(sms.status)}`}>
                              {sms.status}
                            </span>
                            <span className={`badge ${getTypeBadge(sms.type)} ms-2`}>
                              {sms.type === 'order_completion' ? 'Order' : 'System'}
                            </span>
                          </td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center py-4">
                          No SMS notifications found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Notification Detail Modal */}
      {showDetailModal && selectedNotification && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {selectedNotification.notificationType === 'email' ? (
                    <FaEnvelope className="me-2 text-primary" />
                  ) : (
                    <FaSms className="me-2 text-info" />
                  )}
                  Notification Details
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowDetailModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <h6>Recipient</h6>
                    <p>{selectedNotification.to}</p>
                  </div>
                  <div className="col-md-6">
                    <h6>Date Sent</h6>
                    <p>{new Date(selectedNotification.date).toLocaleString()}</p>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <h6>Status</h6>
                    <span className={`badge ${getStatusBadge(selectedNotification.status)}`}>
                      {selectedNotification.status}
                    </span>
                  </div>
                  <div className="col-md-6">
                    <h6>Type</h6>
                    <span className={`badge ${getTypeBadge(selectedNotification.type)}`}>
                      {selectedNotification.type === 'order_completion' ? 'Order Completion' : 'System'}
                    </span>
                  </div>
                </div>
                {selectedNotification.orderId && (
                  <div className="row mb-3">
                    <div className="col-12">
                      <h6>Related Order</h6>
                      <p>{selectedNotification.orderId}</p>
                    </div>
                  </div>
                )}
                <div className="row">
                  <div className="col-12">
                    <h6>
                      {selectedNotification.notificationType === 'email' ? 'Email Content' : 'SMS Message'}
                    </h6>
                    {selectedNotification.notificationType === 'email' ? (
                      <div className="border p-3 bg-light rounded">
                        <h5>{selectedNotification.subject}</h5>
                        <hr />
                        <pre style={{ whiteSpace: 'pre-wrap' }}>{selectedNotification.body}</pre>
                      </div>
                    ) : (
                      <div className="border p-3 bg-light rounded">
                        <pre style={{ whiteSpace: 'pre-wrap' }}>{selectedNotification.message}</pre>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowDetailModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Send Completion Email Modal */}
      {showEmailModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <FaEnvelope className="me-2 text-primary" />
                  Send Order Completion Email
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowEmailModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Recipient Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={newEmail.to}
                    onChange={(e) => setNewEmail({...newEmail, to: e.target.value})}
                    placeholder="customer@example.com"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Order ID</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newEmail.orderId}
                    onChange={(e) => setNewEmail({...newEmail, orderId: e.target.value})}
                    placeholder="ORD-123"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Subject</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newEmail.subject}
                    onChange={(e) => setNewEmail({...newEmail, subject: e.target.value})}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    rows={8}
                    value={newEmail.body}
                    onChange={(e) => setNewEmail({...newEmail, body: e.target.value})}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowEmailModal(false)}
                >
                  Cancel
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={sendNewEmail}
                >
                  Send Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;