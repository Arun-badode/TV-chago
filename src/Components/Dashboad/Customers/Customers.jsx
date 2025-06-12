import React, { useState } from 'react';
import * as echarts from 'echarts';

const Customers = () => {
    const [activeTab, setActiveTab] = useState('customers');
    const [statusFilter, setStatusFilter] = useState('all');
    const [darkMode, setDarkMode] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newCustomer, setNewCustomer] = useState({
        name: '',
        email: '',
        phone: '',
        status: 'active'
    });

    const handleAddCustomer = () => {
        if (!newCustomer.name || !newCustomer.email || !newCustomer.phone) {
            return;
        }

        const customer = {
            id: customers.length + 1,
            ...newCustomer,
            orders: 0
        };

        customers.push(customer);
        setIsAddModalOpen(false);
        setNewCustomer({
            name: '',
            email: '',
            phone: '',
            status: 'active'
        });
    };

    // Customer data
    const customers = [
        { id: 1, name: 'Emma Wilson', email: 'emma.wilson@example.com', phone: '+1 (555) 123-4567', orders: 8, status: 'active' },
        { id: 2, name: 'Michael Brown', email: 'michael.brown@example.com', phone: '+1 (555) 234-5678', orders: 5, status: 'active' },
        { id: 3, name: 'Sophia Davis', email: 'sophia.davis@example.com', phone: '+1 (555) 345-6789', orders: 12, status: 'active' },
        { id: 4, name: 'James Johnson', email: 'james.johnson@example.com', phone: '+1 (555) 456-7890', orders: 3, status: 'inactive' },
        { id: 5, name: 'Olivia Smith', email: 'olivia.smith@example.com', phone: '+1 (555) 567-8901', orders: 7, status: 'active' },
        { id: 6, name: 'William Taylor', email: 'william.taylor@example.com', phone: '+1 (555) 678-9012', orders: 0, status: 'inactive' },
        { id: 7, name: 'Ava Anderson', email: 'ava.anderson@example.com', phone: '+1 (555) 789-0123', orders: 4, status: 'active' },
        { id: 8, name: 'Ethan Martinez', email: 'ethan.martinez@example.com', phone: '+1 (555) 890-1234', orders: 1, status: 'inactive' },
    ];

    const filteredCustomers = statusFilter === 'all'
        ? customers
        : customers.filter(customer => customer.status === statusFilter);

    React.useEffect(() => {
        if (activeTab === 'customers') {
            const chartDom = document.getElementById('customer-chart');
            if (chartDom) {
                const myChart = echarts.init(chartDom);
                const option = {
                    animation: false,
                    title: {
                        text: 'Customer Growth',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    xAxis: {
                        type: 'category',
                        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: 'New Customers',
                            type: 'line',
                            data: [42, 51, 60, 65, 70, 82],
                            color: '#9d65c9'
                        },
                        {
                            name: 'Active Customers',
                            type: 'line',
                            data: [120, 145, 150, 178, 190, 212],
                            color: '#2ECC71'
                        }
                    ]
                };
                myChart.setOption(option);

                return () => {
                    myChart.dispose();
                };
            }
        }
    }, [activeTab]);

    return (
        <div className="container-fluid p-0">
            <main className="p-4">
                {activeTab === 'customers' ? (
                    <>
                        {/* Stats Cards */}
                        <div className="row mb-4">
                            <div className="col-md-3 mb-3">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h6 className="text-muted">Total Customers</h6>
                                                <h3 className="mb-1">428</h3>
                                                <small className="text-success">
                                                    <i className="fas fa-arrow-up mr-1"></i>
                                                    +5.7% from last month
                                                </small>
                                            </div>
                                            <div className="bg-purple-500 text-white p-3 rounded-circle">
                                                <i className="fas fa-users"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h6 className="text-muted">Active Customers</h6>
                                                <h3 className="mb-1">382</h3>
                                                <small className="text-success">
                                                    <i className="fas fa-arrow-up mr-1"></i>
                                                    +3.2% from last month
                                                </small>
                                            </div>
                                            <div className="bg-success text-white p-3 rounded-circle">
                                                <i className="fas fa-user-check"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h6 className="text-muted">New Customers</h6>
                                                <h3 className="mb-1">46</h3>
                                                <small className="text-success">
                                                    <i className="fas fa-arrow-up mr-1"></i>
                                                    +12.5% from last month
                                                </small>
                                            </div>
                                            <div className="bg-primary text-white p-3 rounded-circle">
                                                <i className="fas fa-user-plus"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 mb-3">
                                <div className="card h-100">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h6 className="text-muted">Retention Rate</h6>
                                                <h3 className="mb-1">89.2%</h3>
                                                <small className="text-success">
                                                    <i className="fas fa-arrow-up mr-1"></i>
                                                    +1.8% from last month
                                                </small>
                                            </div>
                                            <div className="bg-warning text-white p-3 rounded-circle">
                                                <i className="fas fa-chart-line"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Chart */}
                        <div className="card mb-4">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h5 className="card-title mb-0">Customer Analytics</h5>
                                    <div className="btn-group">
                                        <button className="btn btn-success">Weekly</button>
                                        <button className="btn btn-outline-secondary">Monthly</button>
                                        <button className="btn btn-outline-secondary">Yearly</button>
                                    </div>
                                </div>
                                <div id="customer-chart" style={{ height: '400px' }}></div>
                            </div>
                        </div>

                        {/* Customer Table */}
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h5 className="card-title mb-0">Customer List</h5>
                                    <div className="d-flex">
                                        <select
                                            className="form-select me-2"
                                            value={statusFilter}
                                            onChange={(e) => setStatusFilter(e.target.value)}
                                        >
                                            <option value="all">All Status</option>
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                        <button
                                            onClick={() => setIsAddModalOpen(true)}
                                            className="btn btn-success"
                                        >
                                            <i className="fas fa-plus me-2"></i>
                                            Add Customer
                                        </button>
                                    </div>
                                </div>

                                {/* Add Customer Modal */}
                                {isAddModalOpen && (
                                    <div className="modal show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title">Add New Customer</h5>
                                                    <button
                                                        type="button"
                                                        className="btn-close"
                                                        onClick={() => setIsAddModalOpen(false)}
                                                    ></button>
                                                </div>
                                                <div className="modal-body">
                                                    <div className="mb-3">
                                                        <label htmlFor="customerName" className="form-label">
                                                            Full Name
                                                        </label>
                                                        <input
                                                            id="customerName"
                                                            type="text"
                                                            className="form-control"
                                                            value={newCustomer.name}
                                                            onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                                                            placeholder="Enter customer name"
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="customerEmail" className="form-label">
                                                            Email Address
                                                        </label>
                                                        <input
                                                            id="customerEmail"
                                                            type="email"
                                                            className="form-control"
                                                            value={newCustomer.email}
                                                            onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
                                                            placeholder="Enter email address"
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="customerPhone" className="form-label">
                                                            Phone Number
                                                        </label>
                                                        <input
                                                            id="customerPhone"
                                                            type="tel"
                                                            className="form-control"
                                                            value={newCustomer.phone}
                                                            onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
                                                            placeholder="Enter phone number"
                                                        />
                                                    </div>
                                                    <div className="mb-3">
                                                        <label htmlFor="customerStatus" className="form-label">
                                                            Status
                                                        </label>
                                                        <select
                                                            id="customerStatus"
                                                            className="form-select"
                                                            value={newCustomer.status}
                                                            onChange={(e) => setNewCustomer({ ...newCustomer, status: e.target.value })}
                                                        >
                                                            <option value="active">Active</option>
                                                            <option value="inactive">Inactive</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="modal-footer">
                                                    <button
                                                        type="button"
                                                        className="btn btn-secondary"
                                                        onClick={() => setIsAddModalOpen(false)}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-primary"
                                                        onClick={handleAddCustomer}
                                                    >
                                                        Add Customer
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead className="table-light">
                                            <tr>
                                                <th>Customer Name</th>
                                                <th>Email</th>
                                                <th>Phone</th>
                                                <th>Orders</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredCustomers.map(customer => (
                        <tr key={customer.id}>
                          <td>
                            <div className="d-flex align-items-center">
                              <div className="rounded-circle bg-light d-flex align-items-center justify-content-center me-3" style={{ width: '40px', height: '40px' }}>
                                {customer.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div className="fw-bold">{customer.name}</div>
                              </div>
                            </div>
                          </td>
                          <td>{customer.email}</td>
                          <td>{customer.phone}</td>
                          <td>{customer.orders}</td>
                          <td>
                            <span className={badge ${customer.status === 'active' ? 'bg-success' : 'bg-secondary'}}>
                              {customer.status === 'active' ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex">
                              <button className="btn btn-sm btn-outline-primary me-2">
                                <i className="fas fa-edit"></i>
                              </button>
                              <button className="btn btn-sm btn-outline-danger">
                                <i className="fas fa-trash"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <div className="text-muted">
                                    Showing <span className="fw-bold">1</span> to <span className="fw-bold">8</span> of <span className="fw-bold">428</span> results
                                </div>
                                <nav>
                                    <ul className="pagination pagination-sm mb-0">
                                        <li className="page-item">
                                            <button className="page-link">Previous</button>
                                        </li>
                                        <li className="page-item active">
                                            <button className="page-link">1</button>
                                        </li>
                                        <li className="page-item">
                                            <button className="page-link">2</button>
                                        </li>
                                        <li className="page-item">
                                            <button className="page-link">3</button>
                                        </li>
                                        <li className="page-item">
                                            <button className="page-link">Next</button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
            </>
            ) : (
            <div className="card">
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
        )}
        </main>
    </div >
  );
};

export default Customers;