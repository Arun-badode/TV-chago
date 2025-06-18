import React, { useState, useEffect } from "react";
import { Table, Form, Button, Modal, Dropdown, Badge, Alert } from "react-bootstrap";
import {
  Download,
  Search,
  FileEarmarkArrowDown,
  Pencil,
  ThreeDotsVertical,
  Eye,
  Trash,
  PlusCircle,
  ArrowRepeat,
  Gear,
  CheckCircle,
  XCircle,
  PeopleFill,
  CheckCircleFill,
  HourglassSplit,
  XCircleFill,
  PlusCircleFill,

} from "react-bootstrap-icons";
import { Bar, Pie } from "react-chartjs-2";
import { FaArrowUp } from "react-icons/fa";
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
  // Sample orders data with enhanced information
  const initialOrders = [
    {
      id: 1,
      dateTime: "2023-05-15 10:30",
      customerName: "John Doe",
      email: "john@example.com",
      username: "johndoe",
      orderType: "new",
      service: "Instagram Growth",
      quantity: 1000,
      servicePackage: "1 Services",
      status: "Completed",
      paymentStatus: "Paid",
      fileUrl: "/files/order1.pdf",
      price: 99.99,
      notes: "Urgent delivery requested",
      completedDate: "2023-05-16",
    },
    {
      id: 2,
      dateTime: "2023-05-16 14:45",
      customerName: "Jane Smith",
      email: "jane@example.com",
      username: "janesmith",
      orderType: "extended",
      service: "YouTube Subscribers",
      quantity: 5000,
      servicePackage: "2 Services",
      status: "Pending",
      paymentStatus: "Paid",
      fileUrl: "/files/order2.pdf",
      price: 199.99,
      notes: "",
    },
    {
      id: 3,
      dateTime: "2023-05-17 09:15",
      customerName: "Robert Johnson",
      email: "robert@example.com",
      username: "robj",
      orderType: "new",
      service: "Both Services",
      quantity: 2000,
      servicePackage: "Both Services",
      status: "Cancelled",
      paymentStatus: "Failed",
      fileUrl: "/files/order3.pdf",
      price: 299.99,
      notes: "Payment retry needed",
    },
    {
      id: 4,
      dateTime: "2023-05-18 11:20",
      customerName: "Sarah Williams",
      email: "sarah@example.com",
      username: "sarahw",
      orderType: "extended",
      service: "Instagram Growth",
      quantity: 3000,
      servicePackage: "1 Services",
      status: "Completed",
      paymentStatus: "Paid",
      fileUrl: "/files/order4.pdf",
      price: 249.99,
      notes: "Special instructions",
      completedDate: "2023-05-19",
    },
    {
      id: 5,
      dateTime: "2023-05-19 15:30",
      customerName: "Michael Brown",
      email: "michael@example.com",
      username: "michaelb",
      orderType: "new",
      service: "YouTube Views",
      quantity: 10000,
      servicePackage: "Both Services",
      status: "Completed",
      paymentStatus: "Paid",
      fileUrl: "/files/order5.pdf",
      price: 399.99,
      notes: "",
      completedDate: "2023-05-20",
    },
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [filteredOrders, setFilteredOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("");
  const [orderTypeFilter, setOrderTypeFilter] = useState("All");
  const [serviceFilter, setServiceFilter] = useState("All");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [editPrice, setEditPrice] = useState("");
  const [editNotes, setEditNotes] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editPaymentStatus, setEditPaymentStatus] = useState("");
  const [autoDeleteDays, setAutoDeleteDays] = useState(30);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Settings for auto-delete
  const [settings, setSettings] = useState({
    autoDeleteEnabled: false,
    autoDeleteDays: 30,
    deleteCompletedOnly: true,
  });

  // Calculate summary counts
  const totalOrders = orders.length;
  const completedOrders = orders.filter((order) => order.status === "Completed").length;
  const pendingOrders = orders.filter((order) => order.status === "Pending").length;
  const cancelledOrders = orders.filter((order) => order.status === "Cancelled").length;
  const newOrders = orders.filter((order) => order.orderType === "new").length;
  const extendedOrders = orders.filter((order) => order.orderType === "extended").length;

  // Get unique services for filter dropdown
  const uniqueServices = [...new Set(orders.map((order) => order.service))];

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

  const orderTypeData = {
    New: newOrders,
    extended: extendedOrders,
  };

  const paymentStatusData = orders.reduce((acc, order) => {
    acc[order.paymentStatus] = (acc[order.paymentStatus] || 0) + 1;
    return acc;
  }, {});

  // Chart options and data
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
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

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
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

  const orderTypeChartData = {
    labels: Object.keys(orderTypeData),
    datasets: [
      {
        label: "Number of Orders",
        data: Object.values(orderTypeData),
        backgroundColor: ["rgba(54, 162, 235, 0.5)", "rgba(255, 159, 64, 0.5)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 159, 64, 1)"],
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

    if (orderTypeFilter !== "All") {
      result = result.filter((order) => order.orderType === orderTypeFilter.toLowerCase());
    }

    if (serviceFilter !== "All") {
      result = result.filter((order) => order.service === serviceFilter);
    }

    setFilteredOrders(result);
  }, [searchTerm, statusFilter, dateFilter, orderTypeFilter, serviceFilter, orders]);

  // Auto-delete old completed orders based on settings
  useEffect(() => {
    if (settings.autoDeleteEnabled) {
      const today = new Date();
      const thresholdDate = new Date();
      thresholdDate.setDate(today.getDate() - settings.autoDeleteDays);

      const ordersToDelete = orders.filter(order => {
        if (order.status !== "Completed") return false;
        if (!order.completedDate) return false;
        
        const completedDate = new Date(order.completedDate);
        return completedDate < thresholdDate;
      });

      if (ordersToDelete.length > 0) {
        const orderIdsToDelete = ordersToDelete.map(order => order.id);
        const updatedOrders = orders.filter(order => !orderIdsToDelete.includes(order.id));
        setOrders(updatedOrders);
      }
    }
  }, [settings, orders]);

  const handleViewClick = (order) => {
    setCurrentOrder(order);
    setShowViewModal(true);
  };

  const handleEditClick = (order) => {
    setCurrentOrder(order);
    setEditPrice(order.price);
    setEditNotes(order.notes);
    setEditStatus(order.status);
    setEditPaymentStatus(order.paymentStatus);
    setShowEditModal(true);
  };

  const handleDeleteClick = (orderId) => {
    setCurrentOrder(orders.find(order => order.id === orderId));
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    const updatedOrders = orders.filter((order) => order.id !== currentOrder.id);
    setOrders(updatedOrders);
    setShowDeleteConfirm(false);
  };

  const handleSaveChanges = () => {
    const updatedOrders = orders.map((order) =>
      order.id === currentOrder.id
        ? { 
            ...order, 
            price: parseFloat(editPrice), 
            notes: editNotes,
            status: editStatus,
            paymentStatus: editPaymentStatus,
            ...(editStatus === "Completed" && !order.completedDate ? { completedDate: new Date().toISOString().split('T')[0] } : {})
          }
        : order
    );

    setOrders(updatedOrders);
    setShowEditModal(false);
  };

  const handleSettingsSave = () => {
    // Save settings to localStorage or backend
    localStorage.setItem('dashboardSettings', JSON.stringify(settings));
    setShowSettingsModal(false);
  };

  const exportToCSV = () => {
    const headers = [
      "Order ID",
      "Date/Time",
      "Customer Name",
      "Email",
      "Username",
      "Order Type",
      "Service",
      "Quantity",
      "Service Package",
      "Status",
      "Payment Status",
      "Price",
      "Notes",
      "Completed Date"
    ].join(",");

    const csvContent = filteredOrders
      .map((order) =>
        [
          order.id,
          `"${order.dateTime}"`,
          `"${order.customerName}"`,
          `"${order.email}"`,
          `"${order.username}"`,
          `"${order.orderType}"`,
          `"${order.service}"`,
          order.quantity,
          `"${order.servicePackage}"`,
          `"${order.status}"`,
          `"${order.paymentStatus}"`,
          order.price,
          `"${order.notes}"`,
          `"${order.completedDate || ''}"`,
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
  {[
     { 
    title: "Total Orders", 
    value: totalOrders, 
    icon: <PeopleFill />,
    trend: "+28.8%" 
  },
  { 
    title: "Completed", 
    value: completedOrders, 
    icon: <CheckCircleFill />,
    trend: "+20.8%" 
  },
  { 
    title: "Pending", 
    value: pendingOrders, 
    icon: <HourglassSplit />,
    trend: "+10.8%" 
  },
  { 
    title: "Cancelled", 
    value: cancelledOrders, 
    icon: <XCircleFill />,
    trend: "+5.8%" 
  },
  { 
    title: "New Orders", 
    value: newOrders, 
    icon: <PlusCircleFill />,
    trend: "+15.2%" 
  },
  { 
    title: "extendeds", 
    value: extendedOrders, 
    icon: <ArrowRepeat />,
    trend: "+8.5%" 
  },
  ].map((stat, index) => (
    <div className="col-lg-4 col-md-6 mb-3 d-flex"
key={index}>
      <div className="card shadow-lg w-100">
        <div className="card-body d-flex justify-content-between align-items-center px-3 py-2">
          <div className="pe-3">
            <h6 className="mb-1">{stat.title}</h6>
            <h3 className="mb-1">{stat.value}</h3>
            <small className="text-success">
              <i className="fas fa-arrow-up me-1"></i>
              {stat.trend} from last month
            </small>
          </div>
          <div
            className="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: "52px", height: "52px", minWidth: "52px" }}
          >
            {typeof stat.icon === "string" ? (
              <i className={`fa-solid fa-${stat.icon}`} style={{ fontSize: "1.3rem" }}></i>
            ) : (
              React.cloneElement(stat.icon, { style: { fontSize: "1.3rem" } })
            )}
          </div>
        </div>
      </div>
    </div>
  ))}
</div>



      {/* Search and Filter Section */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-3 mb-3">
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

            <div className="col-md-2 mb-3">
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

            <div className="col-md-2 mb-3">
              <Form.Group>
                <Form.Label>Order Type</Form.Label>
                <Form.Select
                  value={orderTypeFilter}
                  onChange={(e) => setOrderTypeFilter(e.target.value)}
                >
                  <option value="All">All Types</option>
                  <option value="New">New</option>
                  <option value="extended">extended</option>
                </Form.Select>
              </Form.Group>
            </div>

            <div className="col-md-2 mb-3">
              <Form.Group>
                <Form.Label>Service</Form.Label>
                <Form.Select
                  value={serviceFilter}
                  onChange={(e) => setServiceFilter(e.target.value)}
                >
                  <option value="All">All Services</option>
                  {uniqueServices.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>

            <div className="col-md-2 mb-3">
              <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                />
              </Form.Group>
            </div>

            <div className="col-md-1 d-flex align-items-end mb-3">
              <Button variant="primary" onClick={exportToCSV} className="w-100">
                <FileEarmarkArrowDown className="me-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="card mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Orders Management</h5>
          <Button 
            variant="outline-secondary" 
            size="sm" 
            onClick={() => setShowSettingsModal(true)}
          >
            <Gear className="me-1" /> Settings
          </Button>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <Table striped bordered hover responsive>
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th>Order ID</th>
                  <th>Date/Time</th>
                  <th>Customer</th>
                  <th>Username</th>
                  <th>Type</th>
                  <th>Service</th>
                  <th>Quantity</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Price</th>
                  <th>File</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.dateTime}</td>
                      <td>
                        <div>{order.customerName}</div>
                        <small className="text-muted">{order.email}</small>
                      </td>
                      <td>{order.username}</td>
                      <td>
                        <Badge
                          bg={order.orderType === "new" ? "primary" : "info"}
                          className="d-flex align-items-center justify-content-center"
                        >
                          {order.orderType === "new" ? (
                            <>
                              <PlusCircle className="me-1" />
                              New
                            </>
                          ) : (
                            <>
                              <ArrowRepeat className="me-1" />
                              extended
                            </>
                          )}
                        </Badge>
                      </td>
                      <td>{order.service}</td>
                      <td>{order.quantity.toLocaleString()}</td>
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
                      <td className="text-center">
                        <Button
                          variant="otline-primary"
                          size="sm"
                          href={order.fileUrl}
                          download
                          className="p-0"
                        >
                          <Download />
                        </Button>
                      </td>
                      <td>
                        <div className="d-flex justify-content-center">
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleViewClick(order)}
                            className="me-1 bg-danger text-light "
                          >
                            <Eye  size={16}/>
                          </Button>
                          <Dropdown>
                            <Dropdown.Toggle
                              variant="outline-danger"
                              id="dropdown-actions"
                              className="p-1 bg-danger text-light"
                            >
                              <ThreeDotsVertical />
                            </Dropdown.Toggle>
                            <Dropdown.Menu align="end">
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
        <div className="col-lg-6 mb-4">
          <div className="card h-100">
            <div className="card-body" style={{ minHeight: "400px" }}>
              <Bar options={barOptions} data={servicePackageChartData} />
            </div>
          </div>
        </div>
        <div className="col-lg-6 mb-4">
          <div className="card h-100">
            <div className="card-body" style={{ minHeight: "400px" }}>
              <Pie options={pieOptions} data={statusChartData} />
            </div>
          </div>
        </div>
        <div className="col-lg-6 mb-4">
          <div className="card h-100">
            <div className="card-body" style={{ minHeight: "400px" }}>
              <Bar
                options={{
                  ...barOptions,
                  plugins: {
                    ...barOptions.plugins,
                    title: {
                      ...barOptions.plugins.title,
                      text: "Orders by Order Type",
                    },
                  },
                }}
                data={orderTypeChartData}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-6 mb-4">
          <div className="card h-100">
            <div className="card-body" style={{ minHeight: "400px" }}>
              <Pie
                options={{
                  ...pieOptions,
                  plugins: {
                    ...pieOptions.plugins,
                    title: {
                      ...pieOptions.plugins.title,
                      text: "Orders by Payment Status",
                    },
                  },
                }}
                data={paymentStatusChartData}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Order #{currentOrder?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label>Payment Status</Form.Label>
                  <Form.Select
                    value={editPaymentStatus}
                    onChange={(e) => setEditPaymentStatus(e.target.value)}
                  >
                    <option value="Paid">Paid</option>
                    <option value="Failed">Failed</option>
                    <option value="Pending">Pending</option>
                    <option value="Refunded">Refunded</option>
                  </Form.Select>
                </Form.Group>

                {editStatus === "Completed" && (
                  <Form.Group className="mb-3">
                    <Form.Label>Completed Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={currentOrder?.completedDate || new Date().toISOString().split('T')[0]}
                      onChange={(e) => {
                        setCurrentOrder({
                          ...currentOrder,
                          completedDate: e.target.value
                        });
                      }}
                    />
                  </Form.Group>
                )}
              </div>
            </div>

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
                    <strong>Order Type:</strong>{" "}
                    <Badge
                      bg={currentOrder.orderType === "new" ? "primary" : "info"}
                    >
                      {currentOrder.orderType === "new" ? "New" : "extended"}
                    </Badge>
                  </p>
                  <p>
                    <strong>Service:</strong> {currentOrder.service}
                  </p>
                  <p>
                    <strong>Quantity:</strong>{" "}
                    {currentOrder.quantity.toLocaleString()}
                  </p>
                  <p>
                    <strong>Service Package:</strong>{" "}
                    {currentOrder.servicePackage}
                  </p>
                  <p>
                    <strong>Price:</strong> ${currentOrder.price.toFixed(2)}
                  </p>
                  {currentOrder.completedDate && (
                    <p>
                      <strong>Completed Date:</strong> {currentOrder.completedDate}
                    </p>
                  )}
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
          <Button
            variant="primary"
            onClick={() => {
              setShowViewModal(false);
              handleEditClick(currentOrder);
            }}
          >
            Edit Order
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirm} onHide={() => setShowDeleteConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete order #{currentOrder?.id} for {currentOrder?.customerName}?
          <div className="mt-3">
            <Alert variant="warning">
              This action cannot be undone. All data related to this order will be permanently deleted.
            </Alert>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete Order
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Settings Modal */}
      <Modal show={showSettingsModal} onHide={() => setShowSettingsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Dashboard Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Check
                type="switch"
                id="auto-delete-switch"
                label="Enable Auto-Delete"
                checked={settings.autoDeleteEnabled}
                onChange={(e) => setSettings({
                  ...settings,
                  autoDeleteEnabled: e.target.checked
                })}
              />
              <Form.Text className="text-muted">
                Automatically delete old completed orders
              </Form.Text>
            </Form.Group>

            {settings.autoDeleteEnabled && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Delete After (Days)</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    value={settings.autoDeleteDays}
                    onChange={(e) => setSettings({
                      ...settings,
                      autoDeleteDays: parseInt(e.target.value) || 30
                    })}
                  />
                  <Form.Text className="text-muted">
                    Orders will be deleted after this many days
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="switch"
                    id="completed-only-switch"
                    label="Delete Completed Orders Only"
                    checked={settings.deleteCompletedOnly}
                    onChange={(e) => setSettings({
                      ...settings,
                      deleteCompletedOnly: e.target.checked
                    })}
                  />
                  <Form.Text className="text-muted">
                    Only delete orders with Completed status
                  </Form.Text>
                </Form.Group>
              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSettingsModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSettingsSave}>
            Save Settings
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminDashboard;