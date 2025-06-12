import React, { useState } from 'react';

const PendingOrders = () => {
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');

  // Sample orders data (only pending orders)
  const orders = [
    { id: 'ORD-7892', customer: 'James Johnson', date: '2025-06-07', products: 'Leather Jacket, Denim Jeans', amount: '$229.99', status: 'Pending' },
    { id: 'ORD-7886', customer: 'Liam Wilson', date: '2025-06-01', products: 'Sports Shoes, Gym Shorts', amount: '$99.99', status: 'Pending' },
    { id: 'ORD-7901', customer: 'Sarah Davis', date: '2025-06-05', products: 'Summer Dress, Sandals', amount: '$149.99', status: 'Pending' },
    { id: 'ORD-7895', customer: 'Michael Chen', date: '2025-06-03', products: 'Business Suit, Tie', amount: '$399.99', status: 'Pending' }
  ];

  // Filter orders based on search query
  const filteredOrders = orders.filter(order => {
    return order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.products.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortField === 'date') {
      return sortDirection === 'asc'
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortField === 'amount') {
      const aAmount = parseFloat(a.amount.replace('$', ''));
      const bAmount = parseFloat(b.amount.replace('$', ''));
      return sortDirection === 'asc' ? aAmount - bAmount : bAmount - aAmount;
    } else {
      const aValue = a[sortField].toString();
      const bValue = b[sortField].toString();
      return sortDirection === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
  });

  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(sortedOrders.map(order => order.id));
    }
    setSelectAll(!selectAll);
  };

  // Handle select order
  const handleSelectOrder = (orderId) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
      setSelectAll(false);
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
      if (selectedOrders.length + 1 === sortedOrders.length) {
        setSelectAll(true);
      }
    }
  };

  // Handle view order details
  const handleViewOrderDetails = (order) => {
    setCurrentOrder(order);
    setShowOrderDetails(true);
  };

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-warning text-dark';
      case 'Processing':
        return 'bg-info text-white';
      case 'Completed':
        return 'bg-success text-white';
      case 'Cancelled':
        return 'bg-danger text-white';
      default:
        return 'bg-secondary text-white';
    }
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f8f9fa', minHeight: '100vh',marginTop: '78px' }}>
      {/* Bootstrap CSS */}
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" 
        rel="stylesheet" 
      />
      <link 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
        rel="stylesheet" 
      />
      
      <div className="container-fluid p-4">
        {/* Page Header */}
        <div className="row mb-4">
          <div className="col">
            <h1 className="h2 mb-2">Pending Orders</h1>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="#" style={{ textDecoration: 'none', color: '#0d6efd' }}>Dashboard</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">Pending Orders</li>
              </ol>
            </nav>
          </div>
          <div className="col-auto">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '250px' }}
              />
              <button className="btn btn-outline-secondary" type="button">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="card shadow-sm">
          <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
            <h5 className="mb-0">Pending Orders ({sortedOrders.length})</h5>
            <div>
              <button className="btn btn-outline-secondary me-2">
                <i className="fas fa-file-export me-2"></i>Export
              </button>
              <button className="btn btn-primary">
                <i className="fas fa-plus me-2"></i>Add New Order
              </button>
            </div>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: '50px' }}>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={selectAll}
                          onChange={handleSelectAll}
                        />
                      </div>
                    </th>
                    <th 
                      onClick={() => handleSort('id')} 
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                      Order ID 
                      {sortField === 'id' && (
                        <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'} ms-1`}></i>
                      )}
                    </th>
                    <th 
                      onClick={() => handleSort('customer')} 
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                      Customer 
                      {sortField === 'customer' && (
                        <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'} ms-1`}></i>
                      )}
                    </th>
                    <th 
                      onClick={() => handleSort('date')} 
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                      Date 
                      {sortField === 'date' && (
                        <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'} ms-1`}></i>
                      )}
                    </th>
                    <th 
                      onClick={() => handleSort('products')} 
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                      Products 
                      {sortField === 'products' && (
                        <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'} ms-1`}></i>
                      )}
                    </th>
                    <th 
                      onClick={() => handleSort('amount')} 
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                      Amount 
                      {sortField === 'amount' && (
                        <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'} ms-1`}></i>
                      )}
                    </th>
                    <th 
                      onClick={() => handleSort('status')} 
                      style={{ cursor: 'pointer', userSelect: 'none' }}
                    >
                      Status 
                      {sortField === 'status' && (
                        <i className={`fas fa-sort-${sortDirection === 'asc' ? 'up' : 'down'} ms-1`}></i>
                      )}
                    </th>
                    <th style={{ width: '150px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedOrders.map((order) => (
                    <tr key={order.id}>
                      <td>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={selectedOrders.includes(order.id)}
                            onChange={() => handleSelectOrder(order.id)}
                          />
                        </div>
                      </td>
                      <td>
                        <span className="fw-medium">{order.id}</span>
                      </td>
                      <td>{order.customer}</td>
                      <td>{new Date(order.date).toLocaleDateString()}</td>
                      <td>
                        <span className="text-muted">{order.products}</span>
                      </td>
                      <td>
                        <span className="fw-medium">{order.amount}</span>
                      </td>
                      <td>
                        <span className={`badge ${getStatusBadgeColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex gap-1">
                          <button
                            onClick={() => handleViewOrderDetails(order)}
                            className="btn btn-sm btn-outline-primary"
                            title="View Details"
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-success"
                            title="Edit Order"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <div className="dropdown">
                            <button 
                              className="btn btn-sm btn-outline-secondary dropdown-toggle" 
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="fas fa-ellipsis-v"></i>
                            </button>
                            <ul className="dropdown-menu">
                              <li>
                                <a className="dropdown-item" href="#">
                                  <i className="fas fa-print me-2"></i>Print Order
                                </a>
                              </li>
                              <li>
                                <a className="dropdown-item" href="#">
                                  <i className="fas fa-download me-2"></i>Download Invoice
                                </a>
                              </li>
                              <li><hr className="dropdown-divider" /></li>
                              <li>
                                <a className="dropdown-item text-danger" href="#">
                                  <i className="fas fa-trash-alt me-2"></i>Delete Order
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="card-footer bg-white">
            <nav aria-label="Page navigation">
              <ul className="pagination justify-content-center mb-0">
                <li className="page-item disabled">
                  <a className="page-link" href="#" tabIndex={-1}>Previous</a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="#">1</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">2</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">3</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Order Details Modal */}
        {showOrderDetails && (
          <div 
            className="modal fade show d-block" 
            tabIndex={-1} 
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          >
            <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Order Details</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowOrderDetails(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      <h4>Order {currentOrder?.id}</h4>
                      <p className="text-muted mb-0">
                        Placed on {new Date(currentOrder?.date).toLocaleDateString()} at {new Date(currentOrder?.date).toLocaleTimeString()}
                      </p>
                    </div>
                    <span className={`badge ${getStatusBadgeColor(currentOrder?.status)}`}>
                      {currentOrder?.status}
                    </span>
                  </div>

                  <div className="row mb-4">
                    <div className="col-md-6">
                      <div className="card mb-3">
                        <div className="card-body">
                          <h6 className="card-subtitle mb-2 text-muted">Customer Information</h6>
                          <p className="card-text mb-1 fw-medium">{currentOrder?.customer}</p>
                          <p className="card-text text-muted mb-1">
                            <i className="fas fa-envelope me-2"></i>customer@example.com
                          </p>
                          <p className="card-text text-muted">
                            <i className="fas fa-phone me-2"></i>+1 (555) 123-4567
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="card mb-3">
                        <div className="card-body">
                          <h6 className="card-subtitle mb-2 text-muted">Shipping Address</h6>
                          <p className="card-text mb-1 fw-medium">{currentOrder?.customer}</p>
                          <p className="card-text text-muted mb-1">123 Fashion Street</p>
                          <p className="card-text text-muted mb-1">New York, NY 10001</p>
                          <p className="card-text text-muted">United States</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h6 className="mb-3">Order Items</h6>
                  <div className="table-responsive mb-4">
                    <table className="table">
                      <thead className="table-light">
                        <tr>
                          <th>Product</th>
                          <th>Price</th>
                          <th>Quantity</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentOrder?.products.split(', ').map((product, index) => (
                          <tr key={index}>
                            <td>
                              <div className="d-flex align-items-center">
                                <div className="bg-light rounded p-2 me-3">
                                  <i className="fas fa-tshirt text-muted"></i>
                                </div>
                                <div>
                                  <p className="mb-0">{product}</p>
                                  <small className="text-muted">SKU: PRD-{10000 + index}</small>
                                </div>
                              </div>
                            </td>
                            <td>${(49.99 + index * 10).toFixed(2)}</td>
                            <td>1</td>
                            <td>${(49.99 + index * 10).toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <h6 className="mb-3">Payment Information</h6>
                      <div className="card mb-3">
                        <div className="card-body">
                          <div className="d-flex align-items-center mb-2">
                            <i className="fas fa-credit-card text-muted me-2"></i>
                            <span>Credit Card (ending in 4242)</span>
                          </div>
                          <p className="text-muted mb-0">
                            Transaction ID: TXN-{Math.floor(Math.random() * 1000000)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <h6 className="mb-3">Order Summary</h6>
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted">Subtotal</span>
                            <span>${parseFloat(currentOrder?.amount.replace('$', '')).toFixed(2)}</span>
                          </div>
                          <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted">Shipping</span>
                            <span>$0.00</span>
                          </div>
                          <div className="d-flex justify-content-between mb-2">
                            <span className="text-muted">Tax</span>
                            <span>${(parseFloat(currentOrder?.amount.replace('$', '')) * 0.08).toFixed(2)}</span>
                          </div>
                          <div className="d-flex justify-content-between pt-2 border-top">
                            <span className="fw-bold">Total</span>
                            <span className="fw-bold">
                              ${(parseFloat(currentOrder?.amount.replace('$', '')) * 1.08).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowOrderDetails(false)}
                  >
                    Close
                  </button>
                  <button type="button" className="btn btn-success">
                    <i className="fas fa-check me-2"></i>Approve Order
                  </button>
                  <button type="button" className="btn btn-primary">
                    <i className="fas fa-edit me-2"></i>Update Status
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Bootstrap JS */}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/js/bootstrap.bundle.min.js"></script>
    </div>
  );
};

export default PendingOrders;