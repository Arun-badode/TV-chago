import React, { useState, useEffect } from "react";
import {  Search,  Filter,  Download,  Calendar,  Package,  FileText,  Eye,  Check,  X,  Plus,  RotateCw,  CreditCard,  Banknote, Trash2,} from "lucide-react";
import axios from "axios";
import API_URL from "../../../utils/BaseUrl";

const OrderManagement = () => {
  // State declarations
  // const [orders, setOrders] = useState([
  //   {
  //     id: "ORD-001",
  //     dateTime: "2025-06-15 14:30",
  //     customerName: "John Doe",
  //     email: "john.doe@example.com",
  //     username: "johndoe",
  //     orderType: "New",
  //     service: "1 Service",
  //     servicePackage: "Premium Web Design",
  //     status: "Pending",
  //     paymentStatus: "Paid",
  //     paymentMethod: "PayPal",
  //     discount: "10%",
  //   },
  //   {
  //     id: "ORD-002",
  //     dateTime: "2025-06-14 09:15",
  //     customerName: "Jane Smith",
  //     email: "jane.smith@example.com",
  //     username: "janesmith",
  //     orderType: "Extended",
  //     service: "2 Services",
  //     servicePackage: "Standard Logo Design",
  //     status: "Completed",
  //     paymentStatus: "Paid",
  //     paymentMethod: "Bank Transfer",
  //     discount: "0%",
  //   },
  //   {
  //     id: "ORD-003",
  //     dateTime: "2025-06-13 16:45",
  //     customerName: "Bob Johnson",
  //     email: "bob.johnson@example.com",
  //     username: "bobjohnson",
  //     orderType: "New",
  //     service: "Both Services",
  //     servicePackage: "Mobile App UI",
  //     status: "Pending",
  //     paymentStatus: "Failed",
  //     paymentMethod: "PayPal",
  //     discount: "15%",
  //   },
  //   {
  //     id: "ORD-004",
  //     dateTime: "2025-06-12 11:20",
  //     customerName: "Sarah Wilson",
  //     email: "sarah.wilson@example.com",
  //     username: "sarahw",
  //     orderType: "Extended",
  //     service: "1 Service",
  //     servicePackage: "Brand Identity",
  //     status: "Completed",
  //     paymentStatus: "Paid",
  //     paymentMethod: "Bank Transfer",
  //     discount: "5%",
  //   },
   
  // ]);
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [orderTypeFilter, setOrderTypeFilter] = useState("All");
  const [serviceFilter, setServiceFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

    // ✅ Fetch all orders
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/orders`);
      console.log('✅ Orders fetched successfully:', response.data);
      setOrders(response.data);
    } catch (error) {
      console.error('❌ Error fetching orders:', error);
    }
  };

  // Load orders when component mounts
  useEffect(() => {
    fetchOrders();
  }, []);
  // Filter orders based on search and filters
  useEffect(() => {
    let filtered = orders;
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order?.customerInfo?.fullName?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
          order?.customerInfo?.email?.toLowerCase()?.includes(searchTerm.toLowerCase()) 
      );
    }

    if (statusFilter !== "All") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    if (dateFilter) {
      filtered = filtered.filter((order) =>
        order.dateTime.includes(dateFilter)
      );
    }

    if (orderTypeFilter !== "All") {
      filtered = filtered.filter((order) => order.orderType === orderTypeFilter);
    }

    if (serviceFilter !== "All") {
      filtered = filtered.filter((order) => order.service === serviceFilter);
    }

    setFilteredOrders(filtered);
  }, [searchTerm, statusFilter, dateFilter, orderTypeFilter, serviceFilter, orders]);

  // Export to CSV function
  const exportToCSV = () => {
    const csvContent = [
      [
        "Order ID",
        "Date/Time",
        "Customer Name",
        "Email",
        "Username",
        "Order Type",
        "Service",
        "Status",
        "Payment Status",
        "Payment Method",
        "Discount",
      ],
      ...filteredOrders.map((order) => [
        order.id,
        order.dateTime,
        order.customerName,
        order.email,
        order.username,
        order.orderType,
        order.service,
        order.status,
        order.paymentStatus,
        order.paymentMethod,
        order.discount,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders_export_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setDateFilter("");
    setOrderTypeFilter("All");
    setServiceFilter("All");
  };

  const handleView = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleDelete = (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      setOrders((prev) => prev.filter((order) => order.id !== orderId));
    }
  };

  const getBadgeClass = (status) => {
    switch (status) {
      case "Completed":
        return "bg-success";
      case "Pending":
        return "bg-warning text-dark";
      case "Rejected":
        return "bg-danger";
      case "Failed":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  const getOrderTypeBadge = (type) => {
    return type === "New" ? "bg-primary" : "bg-info text-dark";
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case "PayPal":
        return <CreditCard size={16} className="me-1" />;
      case "Bank Transfer":
        return <Banknote size={16} className="me-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="container-fluid min-vh-100 p-4">
      {/* Header */}
      <div className="mb-4">
        <h4 className="text-dark mb-2">Orders Management</h4>
        <p className="" style={{ fontSize: "15px" }}>
          Manage and monitor all customer orders
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded shadow-sm p-4 mb-4">
        <div className="row g-3">
          {/* Search Bar */}
          <div className="col-md-3">
            <label className="form-label">
              <Search size={16} className="me-2" />
              Search Orders
            </label>
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-control"
            />
          </div>

          {/* Status Filter */}
          <div className="col-md-2">
            <label className="form-label">
              <Filter size={16} className="me-2" />
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-select"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>

          {/* Order Type Filter */}
          <div className="col-md-2">
            <label className="form-label">
              <Package size={16} className="me-2" />
              Order Type
            </label>
            <select
              value={orderTypeFilter}
              onChange={(e) => setOrderTypeFilter(e.target.value)}
              className="form-select"
            >
              <option value="All">All Types</option>
              <option value="New">New</option>
              <option value="Extended">Extended</option>
            </select>
          </div>

          {/* Service Filter */}
          <div className="col-md-2">
            <label className="form-label">
              <FileText size={16} className="me-2" />
              Service
            </label>
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="form-select"
            >
              <option value="All">All Services</option>
              <option value="1 Service">1 Service</option>
              <option value="2 Services">2 Services</option>
              <option value="Both Services">Both Services</option>
            </select>
          </div>

          {/* Date Filter */}
          <div className="col-md-2">
            <label className="form-label">
              <Calendar size={16} className="me-2" />
              Date
            </label>
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="form-control"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="d-flex gap-3 mt-4 pt-4 border-top">
          <button
            onClick={exportToCSV}
            className="btn text-white"
            style={{ backgroundColor: "#d83631" }}
          >
            <Download size={16} className="me-2" /> Export CSV
          </button>
          <button
            onClick={clearFilters}
            className="btn btn-secondary text-white"
          >
            Clear Filters
          </button>
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
                <th>Customer Name</th>
                <th>Customer Email</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Discount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order,index) => (
                <tr key={order.id}>
                  <td>{index+1}</td>
               <td>{new Date(order.createdAt).toLocaleDateString('en-GB')}</td>
                  <td>
                   
                    <div >{order.customerInfo.fullName}</div>
                  </td>
                   <td>
                    <div>{order.customerInfo.email}</div>
                  </td>
                 
                  <td>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className={`form-select form-select-sm ${getBadgeClass(order.status)} text-white`}
                      style={{
                        backgroundColor: getBadgeClass(order.status).includes('bg-') ? 
                          getBadgeClass(order.status).replace('bg-', 'var(--bs-') + ')' : '',
                        border: 'none',
                        width: '120px'
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      
                    </select>
                  </td>
                  <td>
                    <div className="d-flex align-items-center">
                      <span className={`badge ${order.paymentStatus === "Paid" ? "bg-success" : "bg-danger"}`}>
                        {order.paymentStatus}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className={`badge ${order.discount !== "0%" ? "bg-success" : "bg-secondary"}`}>
                      {order.discount}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex gap-2">

<button className="btn btn-success">Accept</button>
<button className="btn btn-danger">Reject</button>

                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => handleView(order)}
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(order.id)}
                        title="Delete Order"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredOrders.length === 0 && (
            <div className="text-center py-5">
              <div className="text-muted mb-3">
                <Package size={48} />
              </div>
              <h5>No orders found</h5>
              <p>Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </div>
      </div>
      <div className="ms-auto text-muted text-end py-2">
        Showing {filteredOrders.length} of {orders.length} orders
      </div>

      {/* Order Details Modal */}
      {showModal && selectedOrder && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Order Details - {selectedOrder.id}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6">
                    <h6>Customer Information</h6>
                    <hr />
                    <p><strong>Name:</strong> {selectedOrder.customerInfo.fullName}</p>
                    <p><strong>Email:</strong> {selectedOrder.customerInfo.email}</p>
                    <p><strong>Username:</strong> @{selectedOrder.customerInfo.phone}</p>
                  </div>
                  <div className="col-md-6">
                    <h6>Order Information</h6>
                    <hr />
                    <p><strong>Date/Time:</strong>{new Date(selectedOrder.createdAt).toLocaleDateString('en-GB')}</p>
                  {Object.keys(selectedOrder.services).map((serviceKey) => {
  const service = selectedOrder.services[serviceKey];

  // Only show if quantity > 0
  if (service.quantity > 0) {
    return (
      <div key={serviceKey} style={{ marginBottom: '15px' }}>
        <p><strong>Service:</strong> {serviceKey}</p>
        <p><strong>Quantity:</strong> {service.quantity}</p>
        <p><strong>Price:</strong> £{service.price}</p>
        <p><strong>Total:</strong> £{service.total}</p>

        {/* Loop through all usernames for this service */}
        {service.accounts.map((account, idx) => (
          <div key={idx} style={{ marginLeft: '20px', marginBottom: '10px' }}>
            <p><strong>Username:</strong> {account.username}</p>
            <p><strong>Type:</strong> {account.type}</p>
          </div>
        ))}
      </div>
    );
  }
  return null;
})}

                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <h6>Payment Details</h6>
                    <hr />
                    <p>
                      <strong>Status:</strong>{" "}
                      <span className={`badge ${getBadgeClass(selectedOrder.status)}`}>
                        {selectedOrder.status}
                      </span>
                    </p>
                    <p>
                      <strong>Payment:</strong>{" "}
                      <span className={`badge ${selectedOrder.paymentStatus === "Paid" ? "bg-success" : "bg-danger"}`}>
                        {selectedOrder.paymentStatus}
                      </span>
                    </p>
                    <p>
                      <strong>Method:</strong>{" "}
                      {getPaymentMethodIcon(selectedOrder.paymentMethod)}
                      {selectedOrder.paymentMethod}
                    </p>
                    <p><strong>Discount:</strong> {selectedOrder.discount}</p>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
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