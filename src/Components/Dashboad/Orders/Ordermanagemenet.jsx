import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Calendar,
  User,
  Mail,
  Package,
  FileText,
  Eye,
  Edit3
} from 'lucide-react';

const Ordermanagement = () => {
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      dateTime: '2025-06-15 14:30',
      customerName: 'John Doe',
      email: 'john.doe@example.com',
      username: 'johndoe',
      servicePackage: 'Premium Web Design Package',
      status: 'Pending',
      paymentStatus: 'Paid',
      fileUpload: 'project_requirements.pdf',
      notes: 'Urgent request - needs completion by end of week'
    },
    {
      id: 'ORD-002',
      dateTime: '2025-06-14 09:15',
      customerName: 'Jane Smith',
      email: 'jane.smith@example.com',
      username: 'janesmith',
      servicePackage: 'Standard Logo Design Package',
      status: 'Completed',
      paymentStatus: 'Paid',
      fileUpload: 'logo_brief.docx',
      notes: 'Standard processing - client very satisfied'
    },
    {
      id: 'ORD-003',
      dateTime: '2025-06-13 16:45',
      customerName: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      username: 'bobjohnson',
      servicePackage: 'Mobile App UI Package',
      status: 'Pending',
      paymentStatus: 'Failed',
      fileUpload: 'app_specifications.pdf',
      notes: 'Payment retry needed - contacted customer'
    },
    {
      id: 'ORD-004',
      dateTime: '2025-06-12 11:20',
      customerName: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      username: 'sarahw',
      servicePackage: 'Brand Identity Package',
      status: 'Completed',
      paymentStatus: 'Paid',
      fileUpload: 'brand_guidelines.pdf',
      notes: 'Delivered ahead of schedule'
    },
    {
      id: 'ORD-005',
      dateTime: '2025-06-11 08:30',
      customerName: 'Mike Davis',
      email: 'mike.davis@example.com',
      username: 'mikedavis',
      servicePackage: 'E-commerce Website Package',
      status: 'Pending',
      paymentStatus: 'Paid',
      fileUpload: 'ecommerce_requirements.docx',
      notes: 'Large project - estimated 2 weeks completion'
    },
    {
      id: 'ORD-006',
      dateTime: '2025-06-10 15:45',
      customerName: 'Lisa Chen',
      email: 'lisa.chen@example.com',
      username: 'lisachen',
      servicePackage: 'Social Media Graphics Package',
      status: 'Completed',
      paymentStatus: 'Paid',
      fileUpload: 'social_media_brief.pdf',
      notes: 'Quick turnaround project'
    }
  ]);

  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('');
  const [usernameFilter, setUsernameFilter] = useState('');

  useEffect(() => {
    filterOrders();
  }, [searchTerm, statusFilter, dateFilter, usernameFilter, orders]);

  const filterOrders = () => {
    let filtered = orders;
    
    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.servicePackage.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Status filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }
    
    // Date filter
    if (dateFilter) {
      filtered = filtered.filter(order => order.dateTime.includes(dateFilter));
    }
    
    // Username filter
    if (usernameFilter) {
      filtered = filtered.filter(order => 
        order.username.toLowerCase().includes(usernameFilter.toLowerCase())
      );
    }
    
    setFilteredOrders(filtered);
  };

  const exportToCSV = () => {
    const csvContent = [
      ['Order ID', 'Date/Time', 'Customer Name', 'Email', 'Username', 'Service Package', 'Status', 'Payment Status', 'File Upload', 'Notes'],
      ...filteredOrders.map(order => [
        order.id, 
        order.dateTime, 
        order.customerName, 
        order.email, 
        order.username, 
        order.servicePackage, 
        order.status, 
        order.paymentStatus, 
        order.fileUpload, 
        order.notes
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders_export_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleFileDownload = (fileName) => {
    // Simulate file download
    alert(`Downloading: ${fileName}`);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('All');
    setDateFilter('');
    setUsernameFilter('');
  };

  return (
   <div className="container-fluid min-vh-100 p-4 mt-5">
  <div className="container">
    {/* Header */}
    <div className="mb-4">
      <h1 className="display-4 text-dark mb-2">Orders Management</h1>
      <p className="" style={{fontSize:"15px"}}>Manage and monitor all customer orders</p>
    </div>

    {/* Search and Filter Section */}
    <div className="bg-white rounded shadow-sm p-4 mb-4">
      <div className="row g-4">
        {/* Search Bar */}
        <div className="col-md-4">
          <label className="form-label">
            <i className="bi bi-search me-2"></i>
            Search Orders
          </label>
          <input
            type="text"
            placeholder="Search by customer name, email, username, or order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
          />
        </div>

        {/* Status Filter */}
        <div className="col-md-3">
          <label className="form-label">
            <i className="bi bi-funnel me-2"></i>
            Filter by Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-select"
          >
            <option value="All">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Date Filter */}
        <div className="col-md-3">
          <label className="form-label">
            <i className="bi bi-calendar me-2"></i>
            Filter by Date
          </label>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="form-control"
          />
        </div>

        {/* Username Filter */}
        <div className="col-md-2">
          <label className="form-label">
            <i className="bi bi-person me-2"></i>
            Filter by Username
          </label>
          <input
            type="text"
            placeholder="Enter username..."
            value={usernameFilter}
            onChange={(e) => setUsernameFilter(e.target.value)}
            className="form-control"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="d-flex gap-3 mt-4 pt-4 border-top">
        <button
          onClick={exportToCSV}
          className="btn  text-white"
          style={{ backgroundColor: '#d83631' }} // Bootstrap primary color
        >
          <i className="bi bi-download me-2"></i> Export to CSV
        </button>
        <button
          onClick={clearFilters}
          className="btn btn-secondary text-white"
        >
          Clear Filters
        </button>
        <div className="ms-auto text-muted">
          Showing {filteredOrders.length} of {orders.length} orders
        </div>
      </div>
    </div>

    {/* Orders Table */}
    <div className="bg-white rounded shadow-sm overflow-hidden">
      <div className="table-responsive">
        <table className="table table-striped table-bordered">
          <thead className="bg-light">
            <tr>
              <th>Order ID</th>
              <th>Date/Time</th>
              <th>Customer Details</th>
              <th>Service Package</th>
              <th>Status</th>
              <th>Payment Status</th>
              <th>File Upload</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.dateTime.split(' ')[0]}</td>
                <td>
                  <div>{order.customerName}</div>
                  <div>{order.email}</div>
                  <div>@{order.username}</div>
                </td>
                <td>{order.servicePackage}</td>
                <td>
                  <span
                    className={`badge ${
                      order.status === 'Completed' ? 'bg-success' : 'bg-warning'
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td>
                  <span
                    className={`badge ${
                      order.paymentStatus === 'Paid' ? 'bg-success' : 'bg-danger'
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </td>
                <td>
                    <div className='d-flex align-items-center justify-content-center mt-4'>
                <i class="fa-solid fa-file-arrow-up"></i>
                </div>
                </td>
                <td>{order.notes.length > 50 ? `${order.notes.substring(0, 50)}...` : order.notes}</td>
                <td>
                  <div className="btn-group">
                    <button className="btn btn-primary" onClick={() => alert(`Viewing ${order.id}`)}>
                      View
                    </button>
                    {/* <button className="btn btn-success" onClick={() => alert(`Editing ${order.id}`)}>
                      Edit
                    </button> */}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-5">
          <i className="bi bi-box" style={{ fontSize: "2rem" }}></i>
          <h5>No orders found</h5>
          <p>Try adjusting your search criteria or filters.</p>
        </div>
      )}
    </div>

    {/* Summary Statistics */}
    {/* <div className="mt-4 row">
      <div className="col-md-3">
        <div className="bg-light p-3 rounded">
          <h3>{orders.length}</h3>
          <p>Total Orders</p>
        </div>
      </div>
      <div className="col-md-3">
        <div className="bg-success text-white p-3 rounded">
          <h3>{orders.filter(o => o.status === 'Completed').length}</h3>
          <p>Completed</p>
        </div>
      </div>
      <div className="col-md-3">
        <div className="bg-warning text-dark p-3 rounded">
          <h3>{orders.filter(o => o.status === 'Pending').length}</h3>
          <p>Pending</p>
        </div>
      </div>
      <div className="col-md-3">
        <div className="bg-danger text-white p-3 rounded">
          <h3>{orders.filter(o => o.paymentStatus === 'Failed').length}</h3>
          <p>Failed Payments</p>
        </div>
      </div>
    </div> */}
  </div>
</div>

  );
};

export default Ordermanagement;