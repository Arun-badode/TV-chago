import React from 'react';

const Notifications = () => {
  const notifications = {
    emails: [
      { id: 1, to: 'user@example.com', subject: 'Welcome!', date: '2025-06-13', status: 'Sent' },
      { id: 2, to: 'admin@example.com', subject: 'Daily Report', date: '2025-06-12', status: 'Sent' },
    ],
    sms: [
      { id: 1, to: '+1234567890', message: 'Your OTP is 123456', date: '2025-06-13', status: 'Sent' },
      { id: 2, to: '+9876543210', message: 'Order shipped!', date: '2025-06-12', status: 'Delivered' },
    ],
  };

  return (
    <div
     style={{
      marginTop: '80px'
    }}
    >
      <h2 className="mb-4">Notifications</h2>
      <div className="row">
        {/* Email Logs */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>Email Logs</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>To</th>
                      <th>Subject</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notifications.emails.map(email => (
                      <tr key={email.id}>
                        <td><small>{email.to}</small></td>
                        <td><small>{email.subject}</small></td>
                        <td><small>{email.date}</small></td>
                        <td><span className="badge bg-success">{email.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* SMS Logs */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h5>SMS Logs</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>To</th>
                      <th>Message</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notifications.sms.map(sms => (
                      <tr key={sms.id}>
                        <td><small>{sms.to}</small></td>
                        <td><small>{sms.message}</small></td>
                        <td><small>{sms.date}</small></td>
                        <td><span className="badge bg-success">{sms.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
