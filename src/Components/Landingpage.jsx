import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  ListGroup,
  Accordion,
  Navbar,
  Nav,
} from "react-bootstrap";
import {
  FaTv,
  FaFilm,
  FaCrown,
  FaCheckCircle,
  FaHeadset,
  FaShieldAlt,
  FaDownload,
  FaMobileAlt,
  FaGlobe,
  FaBolt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "./Landingpage.css";

const TVChagoApp = () => {
  const [expanded, setExpanded] = useState(false);

  // Service prices in GBP
  const servicePrices = {
    service1: 60,
    service2: 60,
    both: 100,
  };

  // State for service quantities
  const [quantities, setQuantities] = useState({
    service1: 0,
    service2: 0,
    both: 0,
  });

  // State for username inputs
  const [usernameInputs, setUsernameInputs] = useState({
    service1: [],
    service2: [],
    both: [],
  });

  // State for username types (new/extend)
  const [usernameTypes, setUsernameTypes] = useState({
    service1: [],
    service2: [],
    both: [],
  });

  // State for form data
  const [formData, setFormData] = useState({
    paymentMethod: "",
    bankName: "",
    fullName: "",
    email: "",
    phone: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
  });

  // Calculate total price
  const calculateTotal = () => {
    return (
      quantities.service1 * servicePrices.service1 +
      quantities.service2 * servicePrices.service2 +
      quantities.both * servicePrices.both
    ).toFixed(2);
  };

  // Handle quantity change
  const handleQuantityChange = (service, value) => {
    const newQuantities = { ...quantities, [service]: parseInt(value) };
    setQuantities(newQuantities);

    // Create empty username inputs based on quantity
    const newUsernameInputs = { ...usernameInputs };
    newUsernameInputs[service] = Array(parseInt(value)).fill("");
    setUsernameInputs(newUsernameInputs);

    // Initialize username types
    const newUsernameTypes = { ...usernameTypes };
    newUsernameTypes[service] = Array(parseInt(value)).fill("new");
    setUsernameTypes(newUsernameTypes);
  };

  // Handle username change
  const handleUsernameChange = (service, index, value) => {
    const newUsernameInputs = { ...usernameInputs };
    newUsernameInputs[service][index] = value;
    setUsernameInputs(newUsernameInputs);
  };

  // Handle username type change
  const handleUsernameTypeChange = (service, index, value) => {
    const newUsernameTypes = { ...usernameTypes };
    newUsernameTypes[service][index] = value;
    setUsernameTypes(newUsernameTypes);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert("Please fill in all required fields");
      return;
    }
    
    if (formData.paymentMethod === "bank" && !formData.bankName) {
      alert("Please provide the bank name for bank transfer");
      return;
    }
    
    if (formData.paymentMethod === "paypal") {
      if (!formData.cardNumber || !formData.cardExpiry || !formData.cardCvc) {
        alert("Please fill in all payment details");
        return;
      }
    }
    
    // Validate usernames
    let usernameError = false;
    Object.keys(usernameInputs).forEach(service => {
      usernameInputs[service].forEach((username, index) => {
        if (!username) {
          usernameError = true;
        }
      });
    });
    
    if (usernameError) {
      alert("Please fill in all username fields");
      return;
    }
    
    // Prepare order data
    const orderData = {
      services: {
        service1: {
          quantity: quantities.service1,
          accounts: usernameInputs.service1.map((username, index) => ({
            username,
            type: usernameTypes.service1[index],
            service: "service1"
          })),
          price: servicePrices.service1,
          total: (quantities.service1 * servicePrices.service1).toFixed(2),
        },
        service2: {
          quantity: quantities.service2,
          accounts: usernameInputs.service2.map((username, index) => ({
            username,
            type: usernameTypes.service2[index],
            service: "service2"
          })),
          price: servicePrices.service2,
          total: (quantities.service2 * servicePrices.service2).toFixed(2),
        },
        both: {
          quantity: quantities.both,
          accounts: usernameInputs.both.map((username, index) => ({
            username,
            type: usernameTypes.both[index],
            service: "both"
          })),
          price: servicePrices.both,
          total: (quantities.both * servicePrices.both).toFixed(2),
        },
      },
      total: calculateTotal(),
      paymentMethod: formData.paymentMethod,
      bankName: formData.bankName,
      customerInfo: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
      },
    };

    // Here you would typically send this data to your backend
    console.log("Order Data:", orderData);
    
    // For demo purposes, just show an alert
    alert(`Order submitted successfully! Total: £${calculateTotal()}`);
  };

  return (
    <div className="min-h-screen bg-white text-dark font-sans">
      <Navbar
  expand="lg"
  expanded={expanded}
  fixed="top" // Add this to make navbar fixed at top
  className="py-2 shadow-sm border"
  style={{ 
    backgroundColor: "#f2e8d9",
    zIndex: 1030 // Ensure navbar stays above other content
  }}
>
  <Container>
    <div className="d-flex align-items-center">
      {/* Logo Image */}
      <div
        style={{
          padding: "6px 12px",
          borderRadius: "8px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="me-3"
      >
        <img
          src="https://i.postimg.cc/v8JXJ4N8/Whats-App-Image-2025-06-12-at-11-59-46-c03b4354-removebg-preview.png"
          alt="TV Chago Logo"
          height="40"
          style={{ display: "block" }}
        />
      </div>
    </div>
    <Navbar.Toggle 
      aria-controls="basic-navbar-nav" 
      onClick={() => setExpanded(expanded ? false : true)}
      className="border-0"
    >
      {expanded ? (
        <FaTimes style={{ color: "#e64a19" }} />
      ) : (
        <FaBars style={{ color: "#e64a19" }} />
      )}
    </Navbar.Toggle>
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto align-items-lg-center">
        <Button
          href="/login"
          className="ms-lg-3 mt-2 mt-lg-0"
          style={{
            background: "linear-gradient(to right, #e64a19, #ff7043)",
            border: "none",
            fontWeight: "bold",
          }}
          onClick={() => setExpanded(false)}
        >
          Get Started
        </Button>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
      {/* Hero Section */}
      <section
        className="position-relative d-flex align-items-center justify-content-center overflow-hidden "
        style={{ backgroundColor: "#fffaf2" , marginTop:"120px"}}
      >
        <div className="container mx-auto px-4 z-1 text-center">
          <h1 className="display-4 fw-bold mb-4" style={{ color: "#e64a19" }}>
            TV Chago Premium Services
          </h1>
          <p className="fs-4 mb-5" style={{ color: "#5c5c5c" }}>
            Select your services and quantities below
          </p>
        </div>
      </section>

      {/* Services Selection Section */}
      <section className="py-1" style={{ backgroundColor: "#fffaf2" }}>
        <Container>
          <Row className="g-4">
            {/* Service 1 */}
            <Col md={4}>
              <Card className="h-100 border-0 shadow-lg">
                <Card.Body className="text-center p-4">
                  <div className="d-flex justify-content-center mb-4">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "80px",
                        height: "80px",
                        background: "rgba(255, 107, 71, 0.1)",
                        border: "2px solid rgba(255, 107, 71, 0.5)",
                      }}
                    >
                      <FaTv style={{ color: "#FF6B47" }} className="fs-3" />
                    </div>
                  </div>
                  <h3 className="h4 fw-bold mb-3">Service One</h3>
                  <div className="h2 fw-bold mb-3" style={{ color: "#FF6B47" }}>
                    £{servicePrices.service1}
                    <small className="text-muted d-block">for 12 months</small>
                  </div>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Select
                      value={quantities.service1}
                      onChange={(e) => handleQuantityChange("service1", e.target.value)}
                    >
                      {[...Array(11).keys()].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "account" : "accounts"}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  {quantities.service1 > 0 && (
                    <div className="mb-3">
                      <Form.Label>Account Details</Form.Label>
                      {[...Array(quantities.service1)].map((_, index) => (
                        <div key={index} className="mb-3 p-3 border rounded">
                          <Form.Group className="mb-2">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter username"
                              value={usernameInputs.service1[index] || ""}
                              onChange={(e) =>
                                handleUsernameChange("service1", index, e.target.value)
                              }
                              required
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Account Type</Form.Label>
                            <div>
                              <Form.Check
                                inline
                                type="radio"
                                label="New Account"
                                name={`service1-type-${index}`}
                                value="new"
                                checked={usernameTypes.service1[index] === "new"}
                                onChange={() => handleUsernameTypeChange("service1", index, "new")}
                              />
                              <Form.Check
                                inline
                                type="radio"
                                label="Extend Existing"
                                name={`service1-type-${index}`}
                                value="extend"
                                checked={usernameTypes.service1[index] === "extend"}
                                onChange={() => handleUsernameTypeChange("service1", index, "extend")}
                              />
                            </div>
                          </Form.Group>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="fw-bold mt-3">
                    Subtotal: £{(quantities.service1 * servicePrices.service1).toFixed(2)}
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Service 2 */}
            <Col md={4}>
              <Card className="h-100 border-0 shadow-lg">
                <Card.Body className="text-center p-4">
                  <div className="d-flex justify-content-center mb-4">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "80px",
                        height: "80px",
                        background: "rgba(232, 168, 124, 0.1)",
                        border: "2px solid rgba(232, 168, 124, 0.5)",
                      }}
                    >
                      <FaFilm style={{ color: "#E8A87C" }} className="fs-3" />
                    </div>
                  </div>
                  <h3 className="h4 fw-bold mb-3">Service Two</h3>
                  <div className="h2 fw-bold mb-3" style={{ color: "#E8A87C" }}>
                    £{servicePrices.service2}
                    <small className="text-muted d-block">for 12 months</small>
                  </div>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Select
                      value={quantities.service2}
                      onChange={(e) => handleQuantityChange("service2", e.target.value)}
                    >
                      {[...Array(11).keys()].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "account" : "accounts"}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  {quantities.service2 > 0 && (
                    <div className="mb-3">
                      <Form.Label>Account Details</Form.Label>
                      {[...Array(quantities.service2)].map((_, index) => (
                        <div key={index} className="mb-3 p-3 border rounded">
                          <Form.Group className="mb-2">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter username"
                              value={usernameInputs.service2[index] || ""}
                              onChange={(e) =>
                                handleUsernameChange("service2", index, e.target.value)
                              }
                              required
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Account Type</Form.Label>
                            <div>
                              <Form.Check
                                inline
                                type="radio"
                                label="New Account"
                                name={`service2-type-${index}`}
                                value="new"
                                checked={usernameTypes.service2[index] === "new"}
                                onChange={() => handleUsernameTypeChange("service2", index, "new")}
                              />
                              <Form.Check
                                inline
                                type="radio"
                                label="Extend Existing"
                                name={`service2-type-${index}`}
                                value="extend"
                                checked={usernameTypes.service2[index] === "extend"}
                                onChange={() => handleUsernameTypeChange("service2", index, "extend")}
                              />
                            </div>
                          </Form.Group>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="fw-bold mt-3">
                    Subtotal: £{(quantities.service2 * servicePrices.service2).toFixed(2)}
                  </div>
                </Card.Body>
              </Card>
            </Col>

            {/* Both Services */}
            <Col md={4}>
              <Card className="h-100 border-0 shadow-lg position-relative">
                <div
                  className="position-absolute top-0 end-0 px-3 py-1 rounded-top-end rounded-bottom-start"
                  style={{
                    background: "linear-gradient(to right, #FF6B47, #E8A87C)",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "0.875rem",
                  }}
                >
                  BEST VALUE
                </div>
                <Card.Body className="text-center p-4">
                  <div className="d-flex justify-content-center mb-4">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "80px",
                        height: "80px",
                        background: "rgba(255, 107, 71, 0.2)",
                        border: "2px solid rgba(255, 107, 71, 0.7)",
                      }}
                    >
                      <FaCrown
                        style={{
                          background: "linear-gradient(to right, #FF6B47, #E8A87C)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                        className="fs-3"
                      />
                    </div>
                  </div>
                  <h3 className="h4 fw-bold mb-3">Both Services</h3>
                  <div
                    className="h2 fw-bold mb-3"
                    style={{
                      background: "linear-gradient(to right, #FF6B47, #E8A87C)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    £{servicePrices.both}
                    <small className="text-muted d-block">for 12 months</small>
                  </div>
                  
                  <Form.Group className="mb-3">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Select
                      value={quantities.both}
                      onChange={(e) => handleQuantityChange("both", e.target.value)}
                    >
                      {[...Array(11).keys()].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? "account" : "accounts"}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  {quantities.both > 0 && (
                    <div className="mb-3">
                      <Form.Label>Account Details</Form.Label>
                      {[...Array(quantities.both)].map((_, index) => (
                        <div key={index} className="mb-3 p-3 border rounded">
                          <Form.Group className="mb-2">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="Enter username"
                              value={usernameInputs.both[index] || ""}
                              onChange={(e) =>
                                handleUsernameChange("both", index, e.target.value)
                              }
                              required
                            />
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Account Type</Form.Label>
                            <div>
                              <Form.Check
                                inline
                                type="radio"
                                label="New Account"
                                name={`both-type-${index}`}
                                value="new"
                                checked={usernameTypes.both[index] === "new"}
                                onChange={() => handleUsernameTypeChange("both", index, "new")}
                              />
                              <Form.Check
                                inline
                                type="radio"
                                label="Extend Existing"
                                name={`both-type-${index}`}
                                value="extend"
                                checked={usernameTypes.both[index] === "extend"}
                                onChange={() => handleUsernameTypeChange("both", index, "extend")}
                              />
                            </div>
                          </Form.Group>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="fw-bold mt-3">
                    Subtotal: £{(quantities.both * servicePrices.both).toFixed(2)}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Order Summary and Payment */}
          <Row className="mt-5">
            <Col lg={{ span: 8, offset: 2 }}>
              <Card className="border-0 shadow-lg">
                <Card.Body className="p-4">
                  <h3 className="fw-bold mb-4 text-center">Order Summary</h3>
                  
                  <div className="mb-4">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Service One ({quantities.service1} accounts):</span>
                      <span>£{(quantities.service1 * servicePrices.service1).toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Service Two ({quantities.service2} accounts):</span>
                      <span>£{(quantities.service2 * servicePrices.service2).toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Both Services ({quantities.both} accounts):</span>
                      <span>£{(quantities.both * servicePrices.both).toFixed(2)}</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between fw-bold fs-5">
                      <span>Total:</span>
                      <span>£{calculateTotal()}</span>
                    </div>
                  </div>

                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                      <Form.Label>Payment Method</Form.Label>
                      <div>
                        <Form.Check
                          inline
                          type="radio"
                          label="PayPal"
                          name="paymentMethod"
                          value="paypal"
                          checked={formData.paymentMethod === "paypal"}
                          onChange={handleInputChange}
                        />
                        <Form.Check
                          inline
                          type="radio"
                          label="Bank Transfer"
                          name="paymentMethod"
                          value="bank"
                          checked={formData.paymentMethod === "bank"}
                          onChange={handleInputChange}
                        />
                      </div>
                    </Form.Group>

                    {formData.paymentMethod === "bank" && (
                      <Form.Group className="mb-3">
                        <Form.Label>Bank Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="bankName"
                          value={formData.bankName}
                          onChange={handleInputChange}
                          placeholder="Which bank will the transfer come from?"
                          required
                        />
                        <Form.Text className="text-muted">
                          After submitting, you'll receive bank details for the transfer.
                        </Form.Text>
                      </Form.Group>
                    )}

                    {formData.paymentMethod === "paypal" && (
                      <>
                        <h5 className="mt-4 mb-3">Payment Details</h5>
                        <Form.Group className="mb-3">
                          <Form.Label>Card Number</Form.Label>
                          <Form.Control
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            placeholder="1234 5678 9012 3456"
                            required
                          />
                        </Form.Group>
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>Expiry Date</Form.Label>
                              <Form.Control
                                type="text"
                                name="cardExpiry"
                                value={formData.cardExpiry}
                                onChange={handleInputChange}
                                placeholder="MM/YY"
                                required
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>CVC</Form.Label>
                              <Form.Control
                                type="text"
                                name="cardCvc"
                                value={formData.cardCvc}
                                onChange={handleInputChange}
                                placeholder="123"
                                required
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                      </>
                    )}

                    <h5 className="mt-4 mb-3">Customer Information</h5>
                    <Form.Group className="mb-3">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </Form.Group>

                    <Button
                      type="submit"
                      className="w-100 py-3 mt-4"
                      style={{
                        background: "linear-gradient(to right, #e64a19, #ff7043)",
                        border: "none",
                        fontWeight: "bold",
                      }}
                    >
                      {formData.paymentMethod === "paypal"
                        ? "Proceed to Payment"
                        : "Submit Order"}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default TVChagoApp;