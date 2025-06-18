import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  Download,
  Calendar,
  Package,
  FileText,
  Eye,
  Check,
  X,
  Plus,
  RotateCw,
  CreditCard,
  Banknote,
  Trash2,
} from "lucide-react";

const OrderManagement = () => {
  // State declarations
  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      dateTime: "2025-06-15 14:30",
      customerName: "John Doe",
      email: "john.doe@example.com",
      username: "johndoe",
      orderType: "New",
      service: "1 Service",
      servicePackage: "Premium Web Design",
      status: "Pending",
      paymentStatus: "Paid",
      paymentMethod: "PayPal",
      discount: "10%",
    },
    {
      id: "ORD-002",
      dateTime: "2025-06-14 09:15",
      customerName: "Jane Smith",
      email: "jane.smith@example.com",
      username: "janesmith",
      orderType: "Extension",
      service: "2 Services",
      servicePackage: "Standard Logo Design",
      status: "Completed",
      paymentStatus: "Paid",
      paymentMethod: "Bank Transfer",
      discount: "0%",
    },
    {
      id: "ORD-003",
      dateTime: "2025-06-13 16:45",
      customerName: "Bob Johnson",
      email: "bob.johnson@example.com",
      username: "bobjohnson",
      orderType: "New",
      service: "Both Services",
      servicePackage: "Mobile App UI",
      status: "Pending",
      paymentStatus: "Failed",
      paymentMethod: "PayPal",
      discount: "15%",
    },
    {
      id: "ORD-004",
      dateTime: "2025-06-12 11:20",
      customerName: "Sarah Wilson",
      email: "sarah.wilson@example.com",
      username: "sarahw",
      orderType: "Extension",
      service: "1 Service",
      servicePackage: "Brand Identity",
      status: "Completed",
      paymentStatus: "Paid",
      paymentMethod: "Bank Transfer",
      discount: "5%",
    },
    {
      id: "ORD-005",
      dateTime: "2025-06-11 08:30",
      customerName: "Mike Davis",
      email: "mike.davis@example.com",
      username: "mikedavis",
      orderType: "New",
      service: "2 Services",
      servicePackage: "E-commerce Website",
      status: "Pending",
      paymentStatus: "Paid",
      paymentMethod: "PayPal",
      discount: "0%",
    },
  ]);

  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [orderTypeFilter, setOrderTypeFilter] = useState("All");
  const [serviceFilter, setServiceFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Filter orders based on search and filters
  useEffect(() => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.servicePackage.toLowerCase().includes(searchTerm.toLowerCase())
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
              <option value="Extension">Extension</option>
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
                <th>Customer</th>
                <th>Type</th>
                <th>Service</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Discount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.dateTime.split(" ")[0]}</td>
                  <td>
                    <div className="fw-bold">{order.customerName}</div>
                    <div className="small text-muted">@{order.username}</div>
                    <div className="small">{order.email}</div>
                  </td>
                  <td>
                    <span className={`badge ${getOrderTypeBadge(order.orderType)}`}>
                      {order.orderType === "New" ? (
                        <Plus size={14} className="me-1" />
                      ) : (
                        <RotateCw size={14} className="me-1" />
                      )}
                      {order.orderType}
                    </span>
                  </td>
                  <td>{order.service}</td>
                  <td>
                    <span className={`badge ${getBadgeClass(order.status)}`}>
                      {order.status}
                    </span>
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
                   
                      
                    
                        <>
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => handleStatusChange(order.id, "Completed")}
                            title="Accept Order"
                          >
                            Aceept
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleStatusChange(order.id, "Rejected")}
                            title="Reject Order"
                          >
                           Reject
                          </button>
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
                        </>
                 
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
                    <p><strong>Name:</strong> {selectedOrder.customerName}</p>
                    <p><strong>Email:</strong> {selectedOrder.email}</p>
                    <p><strong>Username:</strong> @{selectedOrder.username}</p>
                  </div>
                  <div className="col-md-6">
                    <h6>Order Information</h6>
                    <hr />
                    <p><strong>Date/Time:</strong> {selectedOrder.dateTime}</p>
                    <p>
                      <strong>Type:</strong>{" "}
                      <span className={`badge ${getOrderTypeBadge(selectedOrder.orderType)}`}>
                        {selectedOrder.orderType}
                      </span>
                    </p>
                    <p><strong>Service:</strong> {selectedOrder.service}</p>
                    <p><strong>Package:</strong> {selectedOrder.servicePackage}</p>
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