import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaSms } from 'react-icons/fa';

const Notifications = () => {
  const notifications = {
    emails: [
      { id: 1, to: 'user@example.com', subject: 'Welcome!', date: '2025-06-13', status: 'Sent' },
      { id: 2, to: 'admin@example.com', subject: 'Daily Report', date: '2025-06-12', status: 'Sent' },
      { id: 3, to: 'support@example.com', subject: 'Your ticket has been resolved', date: '2025-06-11', status: 'Sent' },
    ],
    sms: [
      { id: 1, to: '+1234567890', message: 'Your OTP is 123456', date: '2025-06-13', status: 'Sent' },
      { id: 2, to: '+9876543210', message: 'Order shipped! Tracking #12345', date: '2025-06-12', status: 'Delivered' },
      { id: 3, to: '+1122334455', message: 'Appointment reminder for tomorrow', date: '2025-06-11', status: 'Failed' },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const cardHover = {
    scale: 1.02,
    boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
    transition: {
      duration: 0.3
    }
  };

  const rowHover = {
    backgroundColor: "rgba(248, 249, 250, 0.8)",
    transition: {
      duration: 0.2
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Sent':
        return 'bg-primary';
      case 'Delivered':
        return 'bg-success';
      case 'Failed':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
<<<<<<< HEAD
      
=======
        marginTop: '10px',
>>>>>>> 3a024ec2d939168f61efd18bb0148fbd069e7cb1
        padding: '20px'
      }}
    >
      <h2 className="mb-4 d-flex align-items-center">
        <FaEnvelope className="me-2 text-primary" />
        <FaSms className="me-2 text-info" />
        Notification Logs
      </h2>
      
      <motion.div 
        className="row"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Email Logs */}
        <motion.div 
          className="col-md-6 mb-4"
          variants={itemVariants}
        >
          <motion.div 
            className="card border-primary h-100"
            whileHover={cardHover}
          >
            <div className="card-header bg-primary text-white d-flex align-items-center">
              <FaEnvelope className="me-2" />
              <h5 className="mb-0">Email Logs</h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>To</th>
                      <th>Subject</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notifications.emails.map(email => (
                      <motion.tr 
                        key={email.id}
                        whileHover={rowHover}
                      >
                        <td><small className="text-muted">{email.to}</small></td>
                        <td><small>{email.subject}</small></td>
                        <td><small className="text-muted">{email.date}</small></td>
                        <td>
                          <span className={`badge ${getStatusBadge(email.status)}`}>
                            {email.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card-footer text-muted small">
              Showing {notifications.emails.length} recent emails
            </div>
          </motion.div>
        </motion.div>

        {/* SMS Logs */}
        <motion.div 
          className="col-md-6 mb-4"
          variants={itemVariants}
        >
          <motion.div 
            className="card border-info h-100"
            whileHover={cardHover}
          >
            <div className="card-header bg-info text-white d-flex align-items-center">
              <FaSms className="me-2" />
              <h5 className="mb-0">SMS Logs</h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>To</th>
                      <th>Message</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notifications.sms.map(sms => (
                      <motion.tr 
                        key={sms.id}
                        whileHover={rowHover}
                      >
                        <td><small className="text-muted">{sms.to}</small></td>
                        <td>
                          <small className="d-block text-truncate" style={{maxWidth: '150px'}}>
                            {sms.message}
                          </small>
                        </td>
                        <td><small className="text-muted">{sms.date}</small></td>
                        <td>
                          <span className={`badge ${getStatusBadge(sms.status)}`}>
                            {sms.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card-footer text-muted small">
              Showing {notifications.sms.length} recent SMS
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Notifications;