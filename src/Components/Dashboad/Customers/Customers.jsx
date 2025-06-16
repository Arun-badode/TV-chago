import React, { useState, useEffect } from "react";
import * as echarts from "echarts";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Download } from "lucide-react";

const Customers = () => {
  const [activeTab, setActiveTab] = useState("customers");
  const [statusFilter, setStatusFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCustomer, setNewCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    status: "active",
  });

  // Customer data
  const [customers, setCustomers] = useState([
    {
      id: 1,
      name: "Emma Wilson",
      email: "emma.wilson@example.com",
      phone: "+1 (555) 123-4567",
      status: "active",
    },
    {
      id: 2,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      phone: "+1 (555) 234-5678",
      orders: 5,
      status: "active",
    },
    {
      id: 3,
      name: "Sophia Davis",
      email: "sophia.davis@example.com",
      phone: "+1 (555) 345-6789",
      orders: 12,
      status: "active",
    },
    {
      id: 4,
      name: "James Johnson",
      email: "james.johnson@example.com",
      phone: "+1 (555) 456-7890",
      orders: 3,
      status: "inactive",
    },
    {
      id: 5,
      name: "Olivia Smith",
      email: "olivia.smith@example.com",
      phone: "+1 (555) 567-8901",
      orders: 7,
      status: "active",
    },
    {
      id: 6,
      name: "William Taylor",
      email: "william.taylor@example.com",
      phone: "+1 (555) 678-9012",
      orders: 0,
      status: "inactive",
    },
    {
      id: 7,
      name: "Ava Anderson",
      email: "ava.anderson@example.com",
      phone: "+1 (555) 789-0123",
      orders: 4,
      status: "active",
    },
    {
      id: 8,
      name: "Ethan Martinez",
      email: "ethan.martinez@example.com",
      phone: "+1 (555) 890-1234",
      status: "inactive",
    },
  ]);

  // Orders data
  const [orders, setOrders] = useState([
    {
      id: "ORD001",
      customerName: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      service: "12 Months Service One",
      status: "Completed",
      paymentStatus: "Paid",
      date: "2025-06-13",
      orders: 8,
    },
    {
      id: "ORD002",
      customerName: "Jane Smith",
      email: "jane@example.com",
      phone: "9876543210",
      service: "12 Months Service Two",
      status: "Pending",
      paymentStatus: "Unpaid",
      date: "2025-06-12",
      orders: 1,
    },
     {
      id: "ORD002",
      customerName: "Jane Smith",
      email: "jane@example.com",
      phone: "9876543210",
      service: "12 Months Service Two",
      status: "Pending",
      paymentStatus: "Unpaid",
      date: "2025-06-12",
      orders: 1,
    },
     {
      id: "ORD002",
      customerName: "Jane Smith",
      email: "jane@example.com",
      phone: "9876543210",
      service: "12 Months Service Two",
      status: "Pending",
      paymentStatus: "Unpaid",
      date: "2025-06-12",
      orders: 1,
    },
     {
      id: "ORD002",
      customerName: "Jane Smith",
      email: "jane@example.com",
      phone: "9876543210",
      service: "12 Months Service Two",
      status: "Pending",
      paymentStatus: "Unpaid",
      date: "2025-06-12",
      orders: 1,
    },
     {
      id: "ORD002",
      customerName: "Jane Smith",
      email: "jane@example.com",
      phone: "9876543210",
      service: "12 Months Service Two",
      status: "Pending",
      paymentStatus: "Unpaid",
      date: "2025-06-12",
      orders: 1,
    },
     {
      id: "ORD002",
      customerName: "Jane Smith",
      email: "jane@example.com",
      phone: "9876543210",
      service: "12 Months Service Two",
      status: "Pending",
      paymentStatus: "Unpaid",
      date: "2025-06-12",
      orders: 1,
    },
     {
      id: "ORD002",
      customerName: "Jane Smith",
      email: "jane@example.com",
      phone: "9876543210",
      service: "12 Months Service Two",
      status: "Pending",
      paymentStatus: "Unpaid",
      date: "2025-06-12",
      orders: 1,
    },
     {
      id: "ORD002",
      customerName: "Jane Smith",
      email: "jane@example.com",
      phone: "9876543210",
      service: "12 Months Service Two",
      status: "Pending",
      paymentStatus: "Unpaid",
      date: "2025-06-12",
      orders: 1,
    },

  ]);

  const filteredCustomers =
    statusFilter === "all"
      ? customers
      : customers.filter((customer) => customer.status === statusFilter);

  const handleAddCustomer = () => {
    if (!newCustomer.name || !newCustomer.email || !newCustomer.phone) {
      return;
    }

    const customer = {
      id: customers.length + 1,
      ...newCustomer,
      orders: 0,
    };

    setCustomers([...customers, customer]);
    setIsAddModalOpen(false);
    setNewCustomer({
      name: "",
      email: "",
      phone: "",
      status: "active",
    });
  };

  // CSV Export function
  const exportToExcel = () => {
    const csvContent = [
      [
        "Order ID",
        "Customer Name",
        "Email",
        "Phone",
        "Service",
        "Status",
        "Payment Status",
        "Orders",
        "Date",
      ],
      ...orders.map((order) => [
        order.id,
        order.customerName,
        order.email,
        order.phone,
        order.service,
        order.status,
        order.paymentStatus,
        order.orders,
        order.date,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "orders_export.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (activeTab === "customers") {
      const chartDom = document.getElementById("customer-chart");
      if (chartDom) {
        const myChart = echarts.init(chartDom);
        const option = {
          animation: false,
          title: {
            text: "Customer Growth",
            left: "center",
            textStyle: {
              color: darkMode ? "#fff" : "#333",
            },
          },
          tooltip: {
            trigger: "axis",
          },
          xAxis: {
            type: "category",
            data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            axisLine: {
              lineStyle: {
                color: darkMode ? "#666" : "#ccc",
              },
            },
            axisLabel: {
              color: darkMode ? "#fff" : "#666",
            },
          },
          yAxis: {
            type: "value",
            axisLine: {
              lineStyle: {
                color: darkMode ? "#666" : "#ccc",
              },
            },
            axisLabel: {
              color: darkMode ? "#fff" : "#666",
            },
            splitLine: {
              lineStyle: {
                color: darkMode ? "#444" : "#eee",
              },
            },
          },
          series: [
            {
              name: "New Customers",
              type: "line",
              data: [42, 51, 60, 65, 70, 82],
              color: "#dc3545",
            },
            {
              name: "Active Customers",
              type: "line",
              data: [120, 145, 150, 178, 190, 212],
              color: "#28a745",
            },
          ],
          backgroundColor: darkMode ? "#222" : "#fff",
        };
        myChart.setOption(option);

        return () => {
          myChart.dispose();
        };
      }
    }
  }, [activeTab, darkMode]);

  return (
    <div
      className={`container-fluid p-0 ${darkMode ? "bg-dark text-light" : ""}`}
    >
      <main className="p-3 p-md-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Customers</h2>
          <div className="btn-group">
          </div>
        </div>

       
          <>
            {/* Stats Cards */}
            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-3 mb-4">
              <div className="col">
                <div
                  className={`card h-100 ${
                    darkMode ? "bg-secondary text-white" : ""
                  }`}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className={darkMode ? "text-light" : "text-muted"}>
                          Total Customers
                        </h6>
                        <h3 className="mb-1">428</h3>
                        <small className="text-success">
                          <i className="fas fa-arrow-up me-1"></i>
                          +5.7% from last month
                        </small>
                      </div>
                      <div
                        className="text-white p-3 rounded-circle"
                        style={{ backgroundColor: "#d84a33" }}
                      >
                        <i className="fas fa-users fa-lg"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col">
                <div
                  className={`card h-100 ${
                    darkMode ? "bg-secondary text-white" : ""
                  }`}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className={darkMode ? "text-light" : "text-muted"}>
                          Active Customers
                        </h6>
                        <h3 className="mb-1">382</h3>
                        <small className="text-success">
                          <i className="fas fa-arrow-up me-1"></i>
                          +3.2% from last month
                        </small>
                      </div>
                      <div
                        className="text-white p-3 rounded-circle"
                        style={{ backgroundColor: "#d84a33" }}
                      >
                        <i className="fas fa-user-check fa-lg"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col">
                <div
                  className={`card h-100 ${
                    darkMode ? "bg-secondary text-white" : ""
                  }`}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className={darkMode ? "text-light" : "text-muted"}>
                          New Customers
                        </h6>
                        <h3 className="mb-1">46</h3>
                        <small className="text-success">
                          <i className="fas fa-arrow-up me-1"></i>
                          +12.5% from last month
                        </small>
                      </div>
                      <div
                        className="text-white p-3 rounded-circle"
                        style={{ backgroundColor: "#d84a33" }}
                      >
                        <i className="fas fa-user-plus fa-lg"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col">
                <div
                  className={`card h-100 ${
                    darkMode ? "bg-secondary text-white" : ""
                  }`}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className={darkMode ? "text-light" : "text-muted"}>
                          Retention Rate
                        </h6>
                        <h3 className="mb-1">89.2%</h3>
                        <small className="text-success">
                          <i className="fas fa-arrow-up me-1"></i>
                          +1.8% from last month
                        </small>
                      </div>
                      <div
                        className="text-white p-3 rounded-circle"
                        style={{ backgroundColor: "#d84a33" }}
                      >
                        <i className="fas fa-chart-line fa-lg"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div
              className={`card mb-4 ${
                darkMode ? "bg-secondary text-white" : ""
              }`}
            >
              <div className="card-body">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3">
                  <h5
                    className={`card-title mb-3 mb-md-0 ${
                      darkMode ? "text-white" : ""
                    }`}
                  >
                    Customer Analytics
                  </h5>
                  <div className="btn-group">
                    <button
                      className={`btn ${darkMode ? "btn-dark" : "btn-danger"}`}
                    >
                      Weekly
                    </button>
                    <button
                      className={`btn ${
                        darkMode ? "btn-dark" : "btn-outline-secondary"
                      }`}
                    >
                      Monthly
                    </button>
                    <button
                      className={`btn ${
                        darkMode ? "btn-dark" : "btn-outline-secondary"
                      }`}
                    >
                      Yearly
                    </button>
                  </div>
                </div>
                <div
                  id="customer-chart"
                  style={{ height: "300px", minHeight: "300px" }}
                ></div>
              </div>
            </div>

            {/* Customer Table */}
            <div
              className={`card ${darkMode ? "bg-secondary text-white" : ""}`}
            >
              <>
            {/* Orders Export Card */}
           

            {/* Orders Table */}
            <div className={`card ${darkMode ? "bg-secondary text-white" : ""}`}>
              <div className="card-body">
                <h5 className={`card-title mb-4 ${darkMode ? "text-white" : ""}`}>
                  Order List
                </h5>
                <div className="table-responsive">
                  <table
                    className={`table ${
                      darkMode ? "table-dark" : ""
                    } table-bordered table-striped`}
                  >
                    <thead className={darkMode ? "table-secondary" : "table-light"}>
                      <tr style={{textAlign: "center"}}>
                        <th>Order ID</th>
                        <th>Customer Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Service</th>
                        <th>Orders</th>
                        <th>Payment Status</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order.id}>
                          <td>{order.id}</td>
                          <td>{order.customerName}</td>
                          <td>{order.email}</td>
                          <td>{order.phone}</td>
                          <td>{order.service}</td>
                          <td>{order.orders}</td>
                          <td>
                            <span
                              className={`badge ${
                                order.paymentStatus === "Paid"
                                  ? "bg-success"
                                  : "bg-warning"
                              }`}
                            >
                              {order.paymentStatus}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`badge ${
                                order.status === "Completed"
                                  ? "bg-success"
                                  : "bg-warning"
                              }`}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td>{order.date}</td>
                          <td>
                            
                            <button className="btn btn-sm btn-outline-danger">
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
            </div>
          </>
       
      </main>
    </div>
  );
};

export default Customers;