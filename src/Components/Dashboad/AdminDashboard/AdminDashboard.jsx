import React, { useState, useEffect } from "react";
import { Table, Form, Button, Modal, Dropdown } from "react-bootstrap";
import {
  Download,
  Search,
  FileEarmarkArrowDown,
  Pencil,
  ThreeDotsVertical,
  Eye,
  Trash,
} from "react-bootstrap-icons";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminDashboard = () => {
  // Sample orders data
  const initialOrders = [
    {
      id: 1,
      dateTime: "2023-05-15 10:30",
      customerName: "John Doe",
      email: "john@example.com",
      username: "johndoe",
      servicePackage: "1 Services",
      status: "Completed",
      paymentStatus: "Paid",
      fileUrl: "/files/order1.pdf",
      price: 99.99,
      notes: "Urgent delivery requested",
    },
    {
      id: 2,
      dateTime: "2023-05-16 14:45",
      customerName: "Jane Smith",
      email: "jane@example.com",
      username: "janesmith",
      servicePackage: "2 Sevices",
      status: "Pending",
      paymentStatus: "Paid",
      fileUrl: "/files/order2.pdf",
      price: 49.99,
      notes: "",
    },
    {
      id: 3,
      dateTime: "2023-05-17 09:15",
      customerName: "Robert Johnson",
      email: "robert@example.com",
      username: "robj",
      servicePackage: "Both Services",
      status: "Cancelled",
      paymentStatus: "Failed",
      fileUrl: "/files/order3.pdf",
      price: 79.99,
      notes: "Payment retry needed",
    },
    {
      id: 4,
      dateTime: "2023-05-18 11:20",
      customerName: "Sarah Williams",
      email: "sarah@example.com",
      username: "sarahw",
      servicePackage: "1 Services",
      status: "Completed",
      paymentStatus: "Paid",
      fileUrl: "/files/order4.pdf",
      price: 99.99,
      notes: "Special instructions",
    },
    {
      id: 5,
      dateTime: "2023-05-19 15:30",
      customerName: "Michael Brown",
      email: "michael@example.com",
      username: "michaelb",
      servicePackage: "Both Services",
      status: "Completed",
      paymentStatus: "Paid",
      fileUrl: "/files/order5.pdf",
      price: 79.99,
      notes: "",
    },
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [filteredOrders, setFilteredOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [editPrice, setEditPrice] = useState("");
  const [editNotes, setEditNotes] = useState("");

  // Calculate summary counts
  const totalOrders = orders.length;
  const completedOrders = orders.filter(
    (order) => order.status === "Completed"
  ).length;
  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;
  const cancelledOrders = orders.filter(
    (order) => order.status === "Cancelled"
  ).length;

  // Prepare data for charts
  const servicePackageData = orders.reduce((acc, order) => {
    acc[order.servicePackage] = (acc[order.servicePackage] || 0) + 1;
    return acc;
  }, {});

  const statusData = {
    Completed: completedOrders,
    Pending: pendingOrders,
    Cancelled: cancelledOrders,
  };

  const paymentStatusData = orders.reduce((acc, order) => {
    acc[order.paymentStatus] = (acc[order.paymentStatus] || 0) + 1;
    return acc;
  }, {});

  // Bar chart options
  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Orders by Service Package",
      },
    },
  };

  // Pie chart options
  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Orders by Status",
      },
    },
  };

  // Chart data
  const servicePackageChartData = {
    labels: Object.keys(servicePackageData),
    datasets: [
      {
        label: "Number of Orders",
        data: Object.values(servicePackageData),
        backgroundColor: [
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 99, 132, 0.5)",
          "rgba(75, 192, 192, 0.5)",
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const statusChartData = {
    labels: Object.keys(statusData),
    datasets: [
      {
        label: "Number of Orders",
        data: Object.values(statusData),
        backgroundColor: [
          "rgba(75, 192, 192, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(255, 99, 132, 0.5)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const paymentStatusChartData = {
    labels: Object.keys(paymentStatusData),
    datasets: [
      {
        label: "Number of Orders",
        data: Object.values(paymentStatusData),
        backgroundColor: ["rgba(75, 192, 192, 0.5)", "rgba(255, 99, 132, 0.5)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  // Filter orders based on search and filters
  useEffect(() => {
    let result = orders;

    if (searchTerm) {
      result = result.filter(
        (order) =>
          order.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "All") {
      result = result.filter((order) => order.status === statusFilter);
    }

    if (dateFilter) {
      result = result.filter((order) => order.dateTime.startsWith(dateFilter));
    }

    setFilteredOrders(result);
  }, [searchTerm, statusFilter, dateFilter, orders]);

  const handleViewClick = (order) => {
    setCurrentOrder(order);
    setShowViewModal(true);
  };

  const handleEditClick = (order) => {
    setCurrentOrder(order);
    setEditPrice(order.price);
    setEditNotes(order.notes);
    setShowEditModal(true);
  };

  const handleDeleteClick = (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      const updatedOrders = orders.filter((order) => order.id !== orderId);
      setOrders(updatedOrders);
    }
  };

  const handleSaveChanges = () => {
    const updatedOrders = orders.map((order) =>
      order.id === currentOrder.id
        ? { ...order, price: parseFloat(editPrice), notes: editNotes }
        : order
    );

    setOrders(updatedOrders);
    setShowEditModal(false);
  };

  const exportToCSV = () => {
    const headers = [
      "Order ID",
      "Date/Time",
      "Customer Name",
      "Email",
      "Username",
      "Service Package",
      "Status",
      "Payment Status",
      "Price",
      "Notes",
    ].join(",");

    const csvContent = filteredOrders
      .map((order) =>
        [
          order.id,
          `"${order.dateTime}"`,
          `"${order.customerName}"`,
          `"${order.email}"`,
          `"${order.username}"`,
          `"${order.servicePackage}"`,
          `"${order.status}"`,
          `"${order.paymentStatus}"`,
          order.price,
          `"${order.notes}"`,
        ].join(",")
      )
      .join("\n");

    const csv = `${headers}\n${csvContent}`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "orders_export.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container-fluid py-4">
      {/* Summary Cards */}
      <div className="row">
        <div className="col-md-3 mb-3">
          <div className="card shadow-lg">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>Total Orders</h5>
                  <h3>{totalOrders}</h3>
                </div>
                <div
                  className="text-white p-3 rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    backgroundColor: "#d84a33",
                    width: "50px",
                    height: "50px",
                  }}
                >
                  <i
                    className="fas fa-users fa-lg"
                    style={{ fontSize: "1.25rem" }}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow-lg">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>Completed</h5>
                  <h3>{completedOrders}</h3>
                </div>
                <div
                  className="text-white p-3 rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    backgroundColor: "#d84a33",
                    width: "50px",
                    height: "50px",
                  }}
                >
                  <i
                    className="fa-solid fa-check"
                    style={{ fontSize: "1.25rem" }}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow-lg">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>Pending</h5>
                  <h3>{pendingOrders}</h3>
                </div>
                <div
                  className="text-white p-3 rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    backgroundColor: "#d84a33",
                    width: "50px",
                    height: "50px",
                  }}
                >
                  <i
                    className="fa-solid fa-hourglass-half"
                    style={{ fontSize: "1.25rem" }}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-3 mb-3">
          <div className="card shadow-lg">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>Cancelled</h5>
                  <h3>{cancelledOrders}</h3>
                </div>
                <div
                  className="text-white p-3 rounded-circle d-flex align-items-center justify-content-center"
                  style={{
                    backgroundColor: "#d84a33",
                    width: "50px",
                    height: "50px",
                  }}
                >
                  <i
                    className="fa-solid fa-ban"
                    style={{ fontSize: "1.25rem" }}
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-4 mb-3">
              <Form.Group>
                <Form.Label>Search</Form.Label>
                <div className="input-group">
                  <Form.Control
                    type="text"
                    placeholder="Search by username, name or email"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button variant="outline-secondary">
                    <Search />
                  </Button>
                </div>
              </Form.Group>
            </div>

            <div className="col-md-3 mb-3">
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="All">All Statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </Form.Select>
              </Form.Group>
            </div>

            <div className="col-md-3 mb-3">
              <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
              </Form.Group>
            </div>

            <div className="col-md-2 d-flex align-items-end mb-3">
              <Button variant="primary" onClick={exportToCSV} className="w-100">
                <FileEarmarkArrowDown className="me-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr style={{ textWrap: "nowrap", textAlign: "center" }}>
                  <th>Order ID</th>
                  <th>Date/Time</th>
                  <th>Customer Name</th>
                  <th>Email</th>
                  <th>Username</th>
                  <th>Service Package</th>
                  <th>Status</th>
                  <th>Payment Status</th>
                  <th>Price</th>
                  <th>File</th>
                  <th>Notes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.dateTime}</td>
                      <td>{order.customerName}</td>
                      <td>{order.email}</td>
                      <td>{order.username}</td>
                      <td>{order.servicePackage}</td>
                      <td>
                        <span
                          className={`badge ${
                            order.status === "Completed"
                              ? "bg-success"
                              : order.status === "Pending"
                              ? "bg-warning"
                              : "bg-danger"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            order.paymentStatus === "Paid"
                              ? "bg-success"
                              : "bg-danger"
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td>${order.price.toFixed(2)}</td>
                      <td>
                        <Button
                          variant="link"
                          size="sm"
                          href={order.fileUrl}
                          download
                        >
                          <Download />
                        </Button>
                      </td>
                      <td
                        className="text-truncate"
                        style={{ maxWidth: "150px" }}
                        title={order.notes}
                      >
                        {order.notes}
                      </td>
                      <td>
                        <div className="d-flex">
                          <Button
                            variant="link"
                            size="sm"
                            onClick={() => handleViewClick(order)}
                            className="me-1"
                          >
                            <Eye />
                          </Button>
                          <Dropdown>
                            <Dropdown.Toggle variant="link" id="dropdown-actions">
                              <ThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                              <Dropdown.Item
                                onClick={() => handleEditClick(order)}
                              >
                                <Pencil className="me-2" />
                                Edit
                              </Dropdown.Item>
                              <Dropdown.Item
                                onClick={() => handleDeleteClick(order.id)}
                                className="text-danger"
                              >
                                <Trash className="me-2" />
                                Delete
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="12" className="text-center">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="row mb-4">
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body" style={{ height: "400px" }}>
              <Bar options={barOptions} data={servicePackageChartData} />
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body d-flex align-items-center justify-content-center" style={{ height: "400px" }}>
              <Pie options={pieOptions} data={statusChartData} />
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div
              className="card-body d-flex align-items-center justify-content-center"
              style={{ height: "400px" }}
            >
              <Bar
                options={{
                  ...barOptions,
                  plugins: {
                    ...barOptions.plugins,
                    title: {
                      ...barOptions.plugins.title,
                      text: "Orders by Payment Status",
                    },
                  },
                }}
                data={paymentStatusChartData}
              />
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div
              className="card-body d-flex align-items-center justify-content-center"
              style={{ height: "400px" }}
            >
              <Pie
                options={{
                  ...pieOptions,
                  plugins: {
                    ...pieOptions.plugins,
                    title: {
                      ...pieOptions.plugins.title,
                      text: "Orders by Service Package",
                    },
                  },
                }}
                data={servicePackageChartData}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Order #{currentOrder?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* View Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Order Details #{currentOrder?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentOrder && (
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <h6>Customer Information</h6>
                  <hr className="mt-1 mb-2" />
                  <p>
                    <strong>Name:</strong> {currentOrder.customerName}
                  </p>
                  <p>
                    <strong>Username:</strong> {currentOrder.username}
                  </p>
                  <p>
                    <strong>Email:</strong> {currentOrder.email}
                  </p>
                </div>

                <div className="mb-3">
                  <h6>Order Information</h6>
                  <hr className="mt-1 mb-2" />
                  <p>
                    <strong>Date/Time:</strong> {currentOrder.dateTime}
                  </p>
                  <p>
                    <strong>Service Package:</strong> {currentOrder.servicePackage}
                  </p>
                  <p>
                    <strong>Price:</strong> ${currentOrder.price.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-3">
                  <h6>Status Information</h6>
                  <hr className="mt-1 mb-2" />
                  <p>
                    <strong>Order Status:</strong>{" "}
                    <span
                      className={`badge ${
                        currentOrder.status === "Completed"
                          ? "bg-success"
                          : currentOrder.status === "Pending"
                          ? "bg-warning"
                          : "bg-danger"
                      }`}
                    >
                      {currentOrder.status}
                    </span>
                  </p>
                  <p>
                    <strong>Payment Status:</strong>{" "}
                    <span
                      className={`badge ${
                        currentOrder.paymentStatus === "Paid"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {currentOrder.paymentStatus}
                    </span>
                  </p>
                </div>

                <div className="mb-3">
                  <h6>File & Notes</h6>
                  <hr className="mt-1 mb-2" />
                  <p>
                    <strong>File:</strong>{" "}
                    <Button
                      variant="link"
                      size="sm"
                      href={currentOrder.fileUrl}
                      download
                      className="p-0"
                    >
                      <Download className="me-1" />
                      Download
                    </Button>
                  </p>
                  <p>
                    <strong>Notes:</strong>
                  </p>
                  <div className="border p-2 rounded bg-light">
                    {currentOrder.notes || "No notes available"}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => {
            setShowViewModal(false);
            handleEditClick(currentOrder);
          }}>
            Edit Order
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminDashboard;