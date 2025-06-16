import React, { useState } from 'react';
import { Search, Filter, Eye, Download } from 'lucide-react';

const OrderManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [dateFilter, setDateFilter] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showOrderModal, setShowOrderModal] = useState(false);

    const [orders, setOrders] = useState([
        {
            id: 'ORD001',
            customerName: 'John Doe',
            email: 'john@example.com',
            phone: '1234567890',
            service: '12 Months Service Two',
            amount: 120,
            status: 'Pending',
            paymentStatus: 'Paid',
            date: '2025-06-13',
            decision: null
        },
        {
            id: 'ORD002',
            customerName: 'Jane Smith',
            email: 'jane@example.com',
            phone: '9876543210',
            service: '12 Months Service One',
            amount: 500,
            status: 'In Process',
            paymentStatus: 'Unpaid',
            date: '2025-06-12',
            decision: null
        }
    ]);

    const filteredOrders = orders.filter(order =>
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter === '' || order.status === statusFilter) &&
        (dateFilter === '' || order.date === dateFilter)
    );

    const updateOrderStatus = (id, newStatus) => {
        setOrders(prev =>
            prev.map(order =>
                order.id === id ? { ...order, status: newStatus } : order
            )
        );
    };

    const handleDecision = (id, decision) => {
        setOrders(prev =>
            prev.map(order =>
                order.id === id ? { ...order, decision } : order
            )
        );
    };

    const getPaymentBadge = (status) => {
        return status === 'Paid' ? 'badge bg-success' : 'badge bg-warning text-dark';
    };


    return (


        <div style={{ marginTop: '80px' }}>
            <h2 className="mb-4">Orders Management</h2>

            {/* Filters */}
            <div className="card mb-4">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="input-group">
                                <span className="input-group-text"><Search size={16} /></span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search orders..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <select
                                className="form-select"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="">All Status</option>
                                <option value="Pending">Pending</option>
                                <option value="In Process">In Process</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                        <div className="col-md-3">
                            <input
                                type="date"
                                className="form-control"
                                value={dateFilter}
                                onChange={(e) => setDateFilter(e.target.value)}
                            />
                        </div>
                      
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="card">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover">
                            <thead className="table-white">
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Contact</th>
                                    <th>Service</th>

                                    <th>Status</th>

                                    <th>Date</th>
                                    <th>Decision</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.length === 0 ? (
                                    <tr>
                                        <td colSpan="10" className="text-center">No orders found</td>
                                    </tr>
                                ) : (
                                    filteredOrders.map(order => (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.customerName}</td>
                                            <td>
                                                <small>{order.email}<br />{order.phone}</small>
                                            </td>
                                            <td>{order.service}</td>

                                            <td>
                                                <select
                                                    className="form-select form-select-sm"
                                                    value={order.status}
                                                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="In Process">In Process</option>
                                                    <option value="Completed">Completed</option>
                                                </select>
                                            </td>

                                            <td>{order.date}</td>
                                            <td>
                                                {order.decision ? (
                                                    <span className={`badge ${order.decision === 'Accepted' ? 'bg-success' : 'bg-danger'}`}>
                                                        {order.decision}
                                                    </span>
                                                ) : (
                                                    <>
                                                        <button
                                                            className="btn btn-sm btn-success me-1"
                                                            onClick={() => handleDecision(order.id, 'Accepted')}
                                                        >
                                                            Accept
                                                        </button>
                                                        <button
                                                            className="btn btn-sm btn-danger"
                                                            onClick={() => handleDecision(order.id, 'Rejected')}
                                                        >
                                                            Reject
                                                        </button>
                                                    </>
                                                )}
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-sm btn-outline-primary me-1"
                                                    onClick={() => {
                                                        setSelectedOrder(order);
                                                        setShowOrderModal(true);
                                                    }}
                                                >
                                                    <Eye size={14} />
                                                </button>

                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {showOrderModal && selectedOrder && (
                <div className="modal show fade d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Order Details - {selectedOrder.orderId}</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowOrderModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Customer:</strong> {selectedOrder.customer}</p>
                                <p><strong>Contact:</strong> {selectedOrder.contact}</p>
                                <p><strong>Service:</strong> {selectedOrder.service}</p>
                                <p><strong>Status:</strong> {selectedOrder.status}</p>
                                <p><strong>Date:</strong> {selectedOrder.date}</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" onClick={() => setShowOrderModal(false)}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default OrderManagement;
