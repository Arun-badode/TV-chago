import React, { useState, useEffect, useRef } from "react";
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Button,
  Card,
  Accordion,
  Form,
  ListGroup,
  Badge,
} from "react-bootstrap";
import {
  FaChevronDown,
  FaChevronUp,
  FaTv,
  FaFilm,
  FaCrown,
  FaBolt,
  FaGlobe,
  FaMobileAlt,
  FaDownload,
  FaShieldAlt,
  FaHeadset,
  FaPaperPlane,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaCheckCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Landingpage.css";

const TVChagoApp = () => {
  const packagePrices = {
    service1: 299,
    service2: 399,
    both: 599,
  };

  const proceedToPayment = () => {
    // Validation
    if (!username) {
      alert("Please enter your username");
      return;
    }

    setCurrentSection("paymentSection");
  };

  const processPayment = () => {
    // Validation
    if (!fullName || !email || !phone) {
      alert("Please fill in all required billing details");
      return;
    }

    // Simulate payment processing
    setTimeout(() => {
      // Generate order ID
      const newOrderId =
        "TVP-" +
        new Date().getFullYear() +
        "-" +
        String(Math.floor(Math.random() * 10000)).padStart(4, "0");
      setOrderId(newOrderId);
      setCurrentSection("successSection");
    }, 3000);
  };

  // Trigger file input click

  const [activeAccordion, setActiveAccordion] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState("orderForm");
  const [customerType, setCustomerType] = useState("new");
  const [username, setUsername] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [notes, setNotes] = useState("");
  const [totalPrice, setTotalPrice] = useState(packagePrices["service1"]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [orderId, setOrderId] = useState("");

  const handleCustomerTypeChange = (e) => {
    setCustomerType(e.target.value);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  // Color variables
  const brandRed = "#E53E3E";
  const brandPurple = "#A742FF";
  const brandCyan = "#00F0FF";
  const darkBg = "#0A0A0F";
  const cardBg = "#121218";
  const borderColor = "#2A2A35";
  const textMuted = "#9CA3AF";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  const faqs = [
    {
      question: "How does TV Chago subscription work?",
      answer:
        "TV Chago provides seamless 12-month access to premium channels and content. Once you purchase a package, you'll receive login credentials to access our platform on up to 5 devices simultaneously.",
    },
    {
      question: "Can I watch TV Chago on multiple devices?",
      answer:
        "Yes! Your TV Chago subscription allows you to stream on up to 5 devices simultaneously, including smart TVs, smartphones, tablets, and computers.",
    },
    {
      question: "What happens after my 12-month subscription ends?",
      answer:
        "You'll receive a notification before your subscription expires with options to renew. We offer special loyalty discounts for returning customers.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "We offer a 7-day free trial for new customers to experience our service before committing to a full subscription. No credit card required for the trial period.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-dark font-sans">
      {/* Navbar */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled ? "py-3 shadow-lg" : "py-1"
        }`}
        style={{
          backdropFilter: isScrolled ? "blur(10px)" : "blur(5px)",
          backgroundColor: isScrolled
            ? "rgba(61, 52, 42, 0.95)"
            : "rgba(61, 52, 42, 0.85)",
          borderBottom: "1px solid rgba(212, 137, 74, 0.2)",
        }}
      >
        <div className="container mx-auto px-4 d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            {/* Logo Image */}
            <div
              style={{
                backgroundColor: "#f5f2ed",
                padding: "6px 12px",
                borderRadius: "8px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="me-3"
            >
              <img
                src="https://i.postimg.cc/FzW5kPNX/Whats-App-Image-2025-06-12-at-11-59-46-c03b4354-removebg-preview.png"
                alt="TV Chago Logo"
                height="32"
                style={{ display: "block" }}
              />
            </div>
          </div>

          <div className="d-none d-md-flex gap-4">
            <a
              href="#"
              className="text-decoration-none hover-text"
              style={{
                color: "#f5f2ed",
                "--hover-color": "#d4894a",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#d4894a")}
              onMouseLeave={(e) => (e.target.style.color = "#f5f2ed")}
            >
              Home
            </a>
            <a
              href="#packages"
              className="text-decoration-none hover-text"
              style={{
                color: "#f5f2ed",
                "--hover-color": "#d4894a",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#d4894a")}
              onMouseLeave={(e) => (e.target.style.color = "#f5f2ed")}
            >
              Packages
            </a>
            <a
              href="#faq"
              className="text-decoration-none hover-text"
              style={{
                color: "#f5f2ed",
                "--hover-color": "#d4894a",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#d4894a")}
              onMouseLeave={(e) => (e.target.style.color = "#f5f2ed")}
            >
              FAQs
            </a>
            <a
              href="#contact"
              className="text-decoration-none hover-text"
              style={{
                color: "#f5f2ed",
                "--hover-color": "#d4894a",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#d4894a")}
              onMouseLeave={(e) => (e.target.style.color = "#f5f2ed")}
            >
              Contact
            </a>
          </div>

          <div className="d-none d-md-block">
            <a href="/login" className="text-decoration-none">
              <button
                className="btn px-4 py-2 rounded-pill text-white font-medium"
                style={{
                  background: "linear-gradient(to right, #d4894a, #8b4513)",
                  border: "none",
                  transition: "all 0.3s",
                  boxShadow: "0 4px 15px rgba(212, 137, 74, 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow =
                    "0 6px 20px rgba(212, 137, 74, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow =
                    "0 4px 15px rgba(212, 137, 74, 0.3)";
                }}
              >
                Sign In
              </button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="d-md-none">
            <button
              className="btn p-2"
              data-bs-toggle="collapse"
              data-bs-target="#mobileMenu"
              aria-expanded="false"
              aria-controls="mobileMenu"
            >
              <i
                className="fas fa-bars text-2xl"
                style={{ color: "#f5f2ed" }}
              ></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu Collapse */}
        <div className="collapse container-fluid" id="mobileMenu">
          <div className="d-flex flex-column gap-3 p-4">
            <a
              href="#"
              className="text-decoration-none"
              style={{
                color: "#f5f2ed",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#d4894a")}
              onMouseLeave={(e) => (e.target.style.color = "#f5f2ed")}
            >
              Home
            </a>
            <a
              href="#packages"
              className="text-decoration-none"
              style={{
                color: "#f5f2ed",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#d4894a")}
              onMouseLeave={(e) => (e.target.style.color = "#f5f2ed")}
            >
              Packages
            </a>
            <a
              href="#faq"
              className="text-decoration-none"
              style={{
                color: "#f5f2ed",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#d4894a")}
              onMouseLeave={(e) => (e.target.style.color = "#f5f2ed")}
            >
              FAQs
            </a>
            <a
              href="#contact"
              className="text-decoration-none"
              style={{
                color: "#f5f2ed",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "#d4894a")}
              onMouseLeave={(e) => (e.target.style.color = "#f5f2ed")}
            >
              Contact
            </a>
            <a href="/login" className="text-decoration-none mt-2">
              <button
                className="btn w-100 py-2 rounded-pill text-white font-medium"
                style={{
                  background: "linear-gradient(to right, #d4894a, #8b4513)",
                  border: "none",
                  transition: "all 0.3s",
                  boxShadow: "0 4px 15px rgba(212, 137, 74, 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow =
                    "0 6px 20px rgba(212, 137, 74, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow =
                    "0 4px 15px rgba(212, 137, 74, 0.3)";
                }}
              >
                Sign In
              </button>
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {/* Hero Section */}
      <section
        className="position-relative min-vh-100 d-flex align-items-center justify-content-center overflow-hidden"
        style={{ backgroundColor: "#fffaf2" }}
      >
        <div className="position-absolute top-0 start-0 w-100 h-100 z-0">
          <img
            src="https://readdy.ai/api/search-image?query=elegant%20abstract%20shapes%20with%20soft%20cream%20and%20beige%20tones%2C%20gentle%20flowing%20curves%20and%20organic%20forms%2C%20minimalist%20composition%20with%20warm%20light%2C%20subtle%20texture%20pattern%2C%20high%20end%20luxury%20feel%2C%20perfect%20for%20website%20background&width=1440&height=800&seq=hero4&orientation=landscape"
            alt="Abstract Background"
            className="w-100 h-100 object-cover object-top"
            style={{ opacity: 0.4 }}
          />
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              background:
                "linear-gradient(to right, rgba(255,250,242,0.9), rgba(255,250,242,0.8))",
            }}
          ></div>
        </div>
        <div className="container mx-auto px-4 z-1 d-flex flex-column flex-md-row align-items-center">
          <div className="col-md-6 text-center text-md-start mb-5 mb-md-0">
            <h1 className="display-4 fw-bold mb-4" style={{ color: "#e64a19" }}>
              Premium TV Experience with TV Chago
            </h1>
            <p className="fs-4 mb-4" style={{ color: "#5c5c5c" }}>
              Discover a world of unlimited entertainment with our premium
              streaming service.
            </p>
            <button
              
              className="btn px-5 py-3 rounded-pill text-white fs-5 fw-medium "
              style={{
                background: "linear-gradient(to right, #e64a19, #ff7043)",
                transition: "all 0.3s",
                boxShadow: "none",
              }}
            >
              <a href="#orderForm " className="text-decoration-none text-light">
              Order Now
              </a>
            </button>
          </div>
          <div className="col-md-6 d-flex justify-content-center">
            <img
              src="https://readdy.ai/api/search-image?query=modern%20minimalist%20smart%20TV%20display%20floating%20in%20warm%20cream%20colored%20environment%2C%20elegant%20product%20showcase%20with%20soft%20shadows%2C%20premium%20lifestyle%20setup%2C%20high%20end%20photography%20style%2C%20perfect%20balance%20of%20light%20and%20shadow&width=600&height=500&seq=hero5&orientation=squarish"
              alt="TV Display"
              className="w-100 h-auto rounded-3 shadow-lg"
              style={{ maxWidth: "600px" }}
            />
          </div>
        </div>
        <div className="position-absolute bottom-0 start-50 translate-middle-x z-1 mb-4">
          <a href="#packages" className="animate-bounce text-decoration-none">
            <i
              className="fas fa-chevron-down fs-3"
              style={{ color: "#e64a19", transition: "color 0.3s" }}
            ></i>
          </a>
        </div>
      </section>

      {/* Packages Section */}
      <section
        id="packages"
        className="position-relative py-5"
        style={{
          backgroundColor: "#fffaf2",
          marginTop: "-60px",
          paddingTop: "120px",
        }}
      >
 
        <div
          className="position-absolute"
          style={{
            bottom: "20%",
            right: "15%",
            width: "150px",
            height: "150px",
            background: `radial-gradient(circle, #E8A87C 25%, transparent 70%)`,
            borderRadius: "50%",
            filter: "blur(30px)",
            animation: "float 5s ease-in-out infinite reverse",
          }}
        ></div>

        <Container className="position-relative py-5" style={{ zIndex: 1 }}>
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              {/* Animated section indicator */}
              <div className="mb-4 position-relative">
                <div className="d-inline-block position-relative">
                  <div
                    className="px-4 py-2 rounded-pill mb-1 position-relative"
                    style={{
                      background: `linear-gradient(135deg, rgba(255, 107, 71, 0.4), rgba(232, 168, 124, 0.4))`,
                      border: `2px solid rgba(255, 107, 71, 0.6)`,
                      backdropFilter: "blur(10px)",
                      boxShadow: `0 0 30px rgba(255, 107, 71, 0.5)`,
                    }}
                  >
                    <span
                      className="fw-bold position-relative "
                      style={{ zIndex: 2, color: "#FF6B47" }}
                    >
                      🎬 STREAMING PACKAGES 🎬
                    </span>
                  </div>
                  {/* Pulsing ring effect */}
                  <div
                    className="position-absolute top-50 start-50 translate-middle rounded-pill"
                    style={{
                      width: "120%",
                      height: "120%",
                      border: `1px solid rgba(255, 107, 71, 0.3)`,
                      animation: "pulse 2s infinite",
                    }}
                  ></div>
                </div>
              </div>

              <h2
                className="display-5 fw-bold mb-4 position-relative"
                style={{
                  background: `linear-gradient(45deg, #FF6B47, #E8A87C, #D4926F)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text", // For other browsers
                  color: "transparent", // Fallback for browsers that don't support gradient text
                }}
              >
                Choose Your Package
                {/* Sparkle effects */}
                <span
                  className="position-absolute"
                  style={{
                    top: "-10px",
                    right: "20%",
                    color: "#FF6B47",
                    fontSize: "1rem",
                    animation: "sparkle 1.5s infinite",
                  }}
                >
                  ✨
                </span>
                <span
                  className="position-absolute"
                  style={{
                    bottom: "-5px",
                    left: "15%",
                    color: "#E8A87C",
                    fontSize: "0.8rem",
                    animation: "sparkle 1.8s infinite 0.5s",
                  }}
                >
                  ⭐
                </span>
              </h2>
              <p
                className="lead position-relative"
                style={{
                  color: "#8B6B47",
                  textShadow: `0 0 10px rgba(255, 107, 71, 0.3)`,
                }}
              >
                Select the perfect streaming package that fits your
                entertainment needs.
              </p>
            </Col>
          </Row>

          <Row className="g-4">
            {/* Package 1 */}
            <Col md={4}>
              <Card
                className="h-100 border-0 shadow-lg"
                style={{
                  background: `linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 107, 71, 0.1))`,
                  backdropFilter: "blur(15px)",
                  transition: "all 0.3s ease",
                  border: `1px solid rgba(255, 107, 71, 0.2)`,
                }}
              >
                <Card.Body className="text-center p-4">
                  <div className="d-flex justify-content-center mb-4">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center position-relative"
                      style={{
                        width: "80px",
                        height: "80px",
                        background: `linear-gradient(135deg, rgba(255, 107, 71, 0.3), rgba(255, 255, 255, 0.8))`,
                        border: `2px solid rgba(255, 107, 71, 0.5)`,
                      }}
                    >
                      <FaTv style={{ color: "#FF6B47" }} className="fs-3" />
                      <div
                        className="position-absolute"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                          background: `conic-gradient(rgba(255, 107, 71, 0.3) 0deg, transparent 90deg, transparent 270deg, rgba(255, 107, 71, 0.3) 360deg)`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <h3 className="h3 fw-bold mb-2" style={{ color: "#8B6B47" }}>
                    12 Months Service One
                  </h3>
                  <div
                    className="h2 fw-bold mb-2"
                    style={{
                      color: "#FF6B47",
                    }}
                  >
                    $99.99
                  </div>
                  <p style={{ color: "#8B6B47" }} className="mb-4">
                    Premium Entertainment
                  </p>

                  <ListGroup variant="flush" className="mb-4 text-start">
                    <ListGroup.Item
                      className="bg-transparent border-0 d-flex align-items-center"
                      style={{ color: "#8B6B47" }}
                    >
                      <FaCheckCircle
                        style={{ color: "#FF6B47" }}
                        className="me-3"
                      />
                      <span>200+ Premium Channels</span>
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="bg-transparent border-0 d-flex align-items-center"
                      style={{ color: "#8B6B47" }}
                    >
                      <FaCheckCircle
                        style={{ color: "#FF6B47" }}
                        className="me-3"
                      />
                      <span>HD Streaming Quality</span>
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="bg-transparent border-0 d-flex align-items-center"
                      style={{ color: "#8B6B47" }}
                    >
                      <FaCheckCircle
                        style={{ color: "#FF6B47" }}
                        className="me-3"
                      />
                      <span>Watch on 3 Devices</span>
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="bg-transparent border-0 d-flex align-items-center"
                      style={{ color: "#8B6B47" }}
                    >
                      <FaCheckCircle
                        style={{ color: "#FF6B47" }}
                        className="me-3"
                      />
                      <span>24/7 Customer Support</span>
                    </ListGroup.Item>
                  </ListGroup>

                  <Button
                    variant="primary"
                    className="w-100"
                    style={{
                      background: `linear-gradient(to right, #FF6B47, #E8A87C)`,
                      border: "none",
                      borderRadius: "50px",
                      color: "white",
                      fontWeight: "bold",
                      boxShadow: `0 4px 15px rgba(255, 107, 71, 0.4)`,
                    }}
                  >
                    Choose Plan
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            {/* Package 2 */}
            <Col md={4}>
              <Card
                className="h-100 border-0 shadow-lg"
                style={{
                  background: `linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(232, 168, 124, 0.1))`,
                  backdropFilter: "blur(15px)",
                  transition: "all 0.3s ease",
                  border: `1px solid rgba(232, 168, 124, 0.3)`,
                }}
              >
                <Card.Body className="text-center p-4">
                  <div className="d-flex justify-content-center mb-4">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center position-relative"
                      style={{
                        width: "80px",
                        height: "80px",
                        background: `linear-gradient(135deg, rgba(232, 168, 124, 0.3), rgba(255, 255, 255, 0.8))`,
                        border: `2px solid rgba(232, 168, 124, 0.5)`,
                      }}
                    >
                      <FaFilm style={{ color: "#E8A87C" }} className="fs-3" />
                      <div
                        className="position-absolute"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                          background: `conic-gradient(rgba(232, 168, 124, 0.3) 0deg, transparent 90deg, transparent 270deg, rgba(232, 168, 124, 0.3) 360deg)`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <h3 className="h3 fw-bold mb-2" style={{ color: "#8B6B47" }}>
                    12 Months Service Two
                  </h3>
                  <div
                    className="h2 fw-bold mb-2"
                    style={{
                      color: "#E8A87C",
                    }}
                  >
                    $119.99
                  </div>
                  <p style={{ color: "#8B6B47" }} className="mb-4">
                    Ultimate Entertainment
                  </p>

                  <ListGroup variant="flush" className="mb-4 text-start">
                    <ListGroup.Item
                      className="bg-transparent border-0 d-flex align-items-center"
                      style={{ color: "#8B6B47" }}
                    >
                      <FaCheckCircle
                        style={{ color: "#E8A87C" }}
                        className="me-3"
                      />
                      <span>300+ Premium Channels</span>
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="bg-transparent border-0 d-flex align-items-center"
                      style={{ color: "#8B6B47" }}
                    >
                      <FaCheckCircle
                        style={{ color: "#E8A87C" }}
                        className="me-3"
                      />
                      <span>4K Streaming Quality</span>
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="bg-transparent border-0 d-flex align-items-center"
                      style={{ color: "#8B6B47" }}
                    >
                      <FaCheckCircle
                        style={{ color: "#E8A87C" }}
                        className="me-3"
                      />
                      <span>Watch on 4 Devices</span>
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="bg-transparent border-0 d-flex align-items-center"
                      style={{ color: "#8B6B47" }}
                    >
                      <FaCheckCircle
                        style={{ color: "#E8A87C" }}
                        className="me-3"
                      />
                      <span>Premium Movie Library</span>
                    </ListGroup.Item>
                  </ListGroup>

                  <Button
                    variant="primary"
                    className="w-100"
                    style={{
                      background: `linear-gradient(to right, #E8A87C, #D4926F)`,
                      border: "none",
                      borderRadius: "50px",
                      color: "white",
                      fontWeight: "bold",
                      boxShadow: `0 4px 15px rgba(232, 168, 124, 0.4)`,
                    }}
                  >
                    Choose Plan
                  </Button>
                </Card.Body>
              </Card>
            </Col>

            {/* Package 3 */}
            <Col md={4}>
              <Card
                className="h-100 border-0 shadow-lg position-relative"
                style={{
                  background: `linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 107, 71, 0.15))`,
                  backdropFilter: "blur(15px)",
                  transition: "all 0.3s ease",
                  border: `2px solid rgba(255, 107, 71, 0.6)`,
                  transform: "scale(1.05)",
                }}
              >
                <div
                  className="position-absolute top-0 end-0 px-3 py-1 rounded-top-end rounded-bottom-start"
                  style={{
                    background: `linear-gradient(to right, #FF6B47, #E8A87C)`,
                    color: "white",
                    fontWeight: "bold",
                    fontSize: "0.875rem",
                    boxShadow: `0 2px 10px rgba(0,0,0,0.3)`,
                  }}
                >
                  BEST VALUE
                </div>
                <Card.Body className="text-center p-4">
                  <div className="d-flex justify-content-center mb-4">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center position-relative"
                      style={{
                        width: "80px",
                        height: "80px",
                        background: `linear-gradient(135deg, rgba(255, 107, 71, 0.3), rgba(232, 168, 124, 0.3))`,
                        border: `2px solid rgba(255, 107, 71, 0.7)`,
                      }}
                    >
                      <FaCrown
                        style={{
                          background: `linear-gradient(to right, #FF6B47, #E8A87C)`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                        className="fs-3"
                      />
                      <div
                        className="position-absolute"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                          background: `conic-gradient(rgba(255, 107, 71, 0.4) 0deg, rgba(232, 168, 124, 0.4) 180deg, rgba(255, 107, 71, 0.4) 360deg)`,
                          animation: "spin 3s linear infinite",
                        }}
                      ></div>
                    </div>
                  </div>
                  <h3 className="h3 fw-bold mb-2" style={{ color: "#8B6B47" }}>
                    12 Months Both Combo
                  </h3>
                  <div
                    className="h2 fw-bold mb-2"
                    style={{
                      background: `linear-gradient(to right, #FF6B47, #E8A87C)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text", // For other browsers
                      color: "transparent", // Fallback for browsers that don't support gradient text
                    }}
                  >
                    $179.99
                  </div>
                  <p style={{ color: "#8B6B47" }} className="mb-4">
                    Ultimate Bundle
                  </p>

                  <ListGroup variant="flush" className="mb-4 text-start">
                    <ListGroup.Item
                      className="bg-transparent border-0 d-flex align-items-center"
                      style={{ color: "#8B6B47" }}
                    >
                      <FaCheckCircle
                        style={{
                          background: `linear-gradient(to right, #FF6B47, #E8A87C)`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                        className="me-3"
                      />
                      <span>500+ Premium Channels</span>
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="bg-transparent border-0 d-flex align-items-center"
                      style={{ color: "#8B6B47" }}
                    >
                      <FaCheckCircle
                        style={{
                          background: `linear-gradient(to right, #FF6B47, #E8A87C)`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                        className="me-3"
                      />
                      <span>8K Streaming Quality</span>
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="bg-transparent border-0 d-flex align-items-center"
                      style={{ color: "#8B6B47" }}
                    >
                      <FaCheckCircle
                        style={{
                          background: `linear-gradient(to right, #FF6B47, #E8A87C)`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                        className="me-3"
                      />
                      <span>Watch on 5 Devices</span>
                    </ListGroup.Item>
                    <ListGroup.Item
                      className="bg-transparent border-0 d-flex align-items-center"
                      style={{ color: "#8B6B47" }}
                    >
                      <FaCheckCircle
                        style={{
                          background: `linear-gradient(to right, #FF6B47, #E8A87C)`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                        className="me-3"
                      />
                      <span>Premium Movie & Sports</span>
                    </ListGroup.Item>
                  </ListGroup>

                  <Button
                    variant="primary"
                    className="w-100"
                    style={{
                      background: `linear-gradient(to right, #FF6B47, #E8A87C)`,
                      border: "none",
                      borderRadius: "50px",
                      fontWeight: "bold",
                      boxShadow: `0 4px 20px rgba(255, 107, 71, 0.4)`,
                      color: "white",
                    }}
                  >
                    Choose Plan
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>




      <div id="orderForm" className="container ">
        {/* Order Form */}
        
        <div
          className="tv-form-section "
          style={{ display: currentSection === "orderForm" ? "block" : "none" }}
          id="orderForm"
        >
          <h2 className="tv-form-title">Complete Your Order</h2>

          {/* Customer Type */}
          <div className="tv-customer-type-wrapper">
            <label className="tv-customer-type-label">Customer Type</label>
            <div className="tv-radio-group">
              <div className="tv-radio-item">
                <input
                  type="radio"
                  name="customerType"
                  value="new"
                  id="newCustomer"
                  checked={customerType === "new"}
                  onChange={handleCustomerTypeChange}
                />
                <label htmlFor="newCustomer">New Customer</label>
              </div>
              <div className="tv-radio-item">
                <input
                  type="radio"
                  name="customerType"
                  value="existing"
                  id="existingCustomer"
                  checked={customerType === "existing"}
                  onChange={handleCustomerTypeChange}
                />
                <label htmlFor="existingCustomer">Existing Customer</label>
              </div>
            </div>
          </div>

          {/* Username Input */}
          <div className="tv-input-group">
            <label className="tv-input-label" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              className="form-control tv-form-control"
              id="username"
              placeholder={
                customerType === "new"
                  ? "Enter your desired username"
                  : "Enter your existing username"
              }
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <small className="text-muted">
              For new customers: choose your desired username. For existing
              customers: enter your current username.
            </small>
          </div>

          {/* File Upload */}
          <div className="tv-input-group">
            <label className="tv-input-label">File Upload (Optional)</label>
            <div className="tv-file-upload-area" onClick={triggerFileInput}>
              {uploadedFile ? (
                <>
                  <i
                    className="fas fa-file-check tv-file-upload-icon"
                    style={{ color: "var(--tv-success)" }}
                  />
                  <p className="mb-0">File uploaded: {uploadedFile.name}</p>
                  <small className="text-muted">Click to change file</small>
                </>
              ) : (
                <>
                  <i className="fas fa-cloud-upload-alt tv-file-upload-icon" />
                  <p className="mb-0">
                    Click to upload ID proof or special documents
                  </p>
                  <small className="text-muted">Max file size: 10MB</small>
                </>
              )}
            </div>
            <input
              type="file"
              id="fileUpload"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={handleFileUpload}
            />
          </div>

          {/* Notes */}
          <div className="tv-input-group">
            <label className="tv-input-label" htmlFor="notes">
              Additional Notes (Optional)
            </label>
            <textarea
              className="form-control tv-form-control"
              id="notes"
              rows={4}
              placeholder="Any special requests or additional information..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          {/* Price Display */}
          <div
            className="tv-price-display"
            style={{ backgroundColor: "rgba(61, 52, 42, 0.85)" }}
          >
            <div className="tv-price-label">Total Amount</div>
            <div className="tv-price-amount">${totalPrice}</div>
          </div>

          {/* Checkout Button */}
          <button className="tv-checkout-btn" onClick={proceedToPayment}>
            <i className="fas fa-credit-card me-2" />
            Proceed to Checkout
          </button>
        </div>
        

        {/* Payment Section */}
        <div
          className="tv-payment-section"
          style={{
            display: currentSection === "paymentSection" ? "block" : "none",
          }}
          id="paymentSection"
        >
          <h2 className="tv-payment-title">Payment Details</h2>
          <div className="tv-billing-grid">
            <div className="tv-input-group">
              <label className="tv-input-label" htmlFor="fullName">
                Full Name
              </label>
              <input
                type="text"
                className="form-control tv-form-control"
                id="fullName"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="tv-input-group">
              <label className="tv-input-label" htmlFor="email">
                Email Address
              </label>
              <input
                type="email"
                className="form-control tv-form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="tv-input-group">
              <label className="tv-input-label" htmlFor="phone">
                Phone Number
              </label>
              <input
                type="tel"
                className="form-control tv-form-control"
                id="phone"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="tv-input-group">
              <label className="tv-input-label" htmlFor="address">
                Address
              </label>
              <input
                type="text"
                className="form-control tv-form-control"
                id="address"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>
          <div className="text-center">
            <p className="mb-3">
              <i className="fas fa-lock me-2" />
              Secure payment powered by Stripe &amp; PayPal
            </p>
            <button className="tv-payment-btn" onClick={processPayment}>
              <i className="fas fa-shield-alt me-2" />
              Confirm Payment
            </button>
          </div>
        </div>

        {/* Success Section */}
        <div
          className="tv-success-section"
          style={{
            display: currentSection === "successSection" ? "block" : "none",
          }}
          id="successSection"
        >
          <i className="fas fa-check-circle tv-success-icon" />
          <h2 className="tv-success-title">Order Completed Successfully!</h2>
          <p className="mb-3">
            Thank you for your order. We've sent confirmation details to your
            email and SMS.
          </p>
          <div className="tv-order-id">
            Order ID: <span>#{orderId}</span>
          </div>
          <p className="mt-3">
            Our team will process your order and contact you within 24 hours for
            installation scheduling.
          </p>
        </div>
      </div>
      

      {/* Features Section */}
      <section className="py-5" style={{ backgroundColor: "#fffaf2" }}>
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <h2
                className="display-5 fw-bold mb-3"
                style={{
                  background: `linear-gradient(to right, #FF6B47, #E8A87C, #D4926F)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text", // For other browsers
                  color: "transparent", // Fallback for browsers that don't support gradient text
                }}
              >
                Why Choose TV Chago
              </h2>
              <p className="lead" style={{ color: "#8B6B47" }}>
                Experience the future of television with our cutting-edge
                features.
              </p>
            </Col>
          </Row>

          <Row className="g-4">
            <Col md={6} lg={4}>
              <Card
                className="h-100 border-0 shadow-lg"
                style={{
                  backgroundColor: `rgba(255, 255, 255, 0.9)`,
                  backdropFilter: "blur(10px)",
                  border: `1px solid rgba(255, 107, 71, 0.2)`,
                  transition: "all 0.3s ease",
                }}
              >
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-center mb-4">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "64px",
                        height: "64px",
                        background: `linear-gradient(to bottom right, rgba(255, 107, 71, 0.1), rgba(255, 107, 71, 0.2))`,
                        border: `2px solid rgba(255, 107, 71, 0.3)`,
                      }}
                    >
                      <FaBolt style={{ color: "#FF6B47" }} className="fs-3" />
                    </div>
                  </div>
                  <h3 className="h4 fw-bold mb-3" style={{ color: "#8B6B47" }}>
                    Lightning Fast Streaming
                  </h3>
                  <p style={{ color: "#8B6B47" }}>
                    Experience buffer-free streaming with our optimized network
                    infrastructure, delivering content at unprecedented speeds.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={4}>
              <Card
                className="h-100 border-0 shadow-lg"
                style={{
                  backgroundColor: `rgba(255, 255, 255, 0.9)`,
                  backdropFilter: "blur(10px)",
                  border: `1px solid rgba(232, 168, 124, 0.2)`,
                  transition: "all 0.3s ease",
                }}
              >
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-center mb-4">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "64px",
                        height: "64px",
                        background: `linear-gradient(to bottom right, rgba(232, 168, 124, 0.1), rgba(232, 168, 124, 0.2))`,
                        border: `2px solid rgba(232, 168, 124, 0.3)`,
                      }}
                    >
                      <FaGlobe style={{ color: "#E8A87C" }} className="fs-3" />
                    </div>
                  </div>
                  <h3 className="h4 fw-bold mb-3" style={{ color: "#8B6B47" }}>
                    Global Content Library
                  </h3>
                  <p style={{ color: "#8B6B47" }}>
                    Access thousands of shows, movies, and live events from
                    around the world, all in one convenient platform.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={4}>
              <Card
                className="h-100 border-0 shadow-lg"
                style={{
                  backgroundColor: `rgba(255, 255, 255, 0.9)`,
                  backdropFilter: "blur(10px)",
                  border: `1px solid rgba(255, 107, 71, 0.2)`,
                  transition: "all 0.3s ease",
                }}
              >
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-center mb-4">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "64px",
                        height: "64px",
                        background: `linear-gradient(to bottom right, rgba(255, 107, 71, 0.1), rgba(255, 107, 71, 0.2))`,
                        border: `2px solid rgba(255, 107, 71, 0.3)`,
                      }}
                    >
                      <FaMobileAlt
                        style={{ color: "#FF6B47" }}
                        className="fs-3"
                      />
                    </div>
                  </div>
                  <h3 className="h4 fw-bold mb-3" style={{ color: "#8B6B47" }}>
                    Multi-Device Support
                  </h3>
                  <p style={{ color: "#8B6B47" }}>
                    Watch your favorite content on any device - from smartphones
                    and tablets to smart TVs and gaming consoles.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={4}>
              <Card
                className="h-100 border-0 shadow-lg"
                style={{
                  backgroundColor: `rgba(255, 255, 255, 0.9)`,
                  backdropFilter: "blur(10px)",
                  border: `1px solid rgba(212, 146, 111, 0.2)`,
                  transition: "all 0.3s ease",
                }}
              >
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-center mb-4">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "64px",
                        height: "64px",
                        background: `linear-gradient(to bottom right, rgba(212, 146, 111, 0.1), rgba(212, 146, 111, 0.2))`,
                        border: `2px solid rgba(212, 146, 111, 0.3)`,
                      }}
                    >
                      <FaDownload
                        style={{ color: "#D4926F" }}
                        className="fs-3"
                      />
                    </div>
                  </div>
                  <h3 className="h4 fw-bold mb-3" style={{ color: "#8B6B47" }}>
                    Offline Viewing
                  </h3>
                  <p style={{ color: "#8B6B47" }}>
                    Download your favorite shows and movies to watch offline,
                    perfect for travel or areas with limited connectivity.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={4}>
              <Card
                className="h-100 border-0 shadow-lg"
                style={{
                  backgroundColor: `rgba(255, 255, 255, 0.9)`,
                  backdropFilter: "blur(10px)",
                  border: `1px solid rgba(232, 168, 124, 0.2)`,
                  transition: "all 0.3s ease",
                }}
              >
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-center mb-4">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "64px",
                        height: "64px",
                        background: `linear-gradient(to bottom right, rgba(232, 168, 124, 0.1), rgba(232, 168, 124, 0.2))`,
                        border: `2px solid rgba(232, 168, 124, 0.3)`,
                      }}
                    >
                      <FaShieldAlt
                        style={{ color: "#E8A87C" }}
                        className="fs-3"
                      />
                    </div>
                  </div>
                  <h3 className="h4 fw-bold mb-3" style={{ color: "#8B6B47" }}>
                    Secure Streaming
                  </h3>
                  <p style={{ color: "#8B6B47" }}>
                    Our advanced encryption and security protocols ensure your
                    viewing habits and personal data remain private.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={4}>
              <Card
                className="h-100 border-0 shadow-lg"
                style={{
                  backgroundColor: `rgba(255, 255, 255, 0.9)`,
                  backdropFilter: "blur(10px)",
                  border: `1px solid rgba(255, 107, 71, 0.2)`,
                  transition: "all 0.3s ease",
                }}
              >
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-center mb-4">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "64px",
                        height: "64px",
                        background: `linear-gradient(to bottom right, rgba(255, 107, 71, 0.1), rgba(255, 107, 71, 0.2))`,
                        border: `2px solid rgba(255, 107, 71, 0.3)`,
                      }}
                    >
                      <FaHeadset
                        style={{ color: "#FF6B47" }}
                        className="fs-3"
                      />
                    </div>
                  </div>
                  <h3 className="h4 fw-bold mb-3" style={{ color: "#8B6B47" }}>
                    24/7 Support
                  </h3>
                  <p style={{ color: "#8B6B47" }}>
                    Our dedicated support team is available around the clock to
                    assist with any questions or technical issues.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-5" style={{ backgroundColor: "#f5f2ed" }}>
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <h2
                className="display-5 fw-bold mb-3"
                style={{
                  background: `linear-gradient(to right, #d4894a, #8b4513)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text", // For other browsers
                  color: "transparent", // Fallback for browsers that don't support gradient text
                }}
              >
                Frequently Asked Questions
              </h2>
              <p className="lead" style={{ color: "#6b5b47" }}>
                Find answers to common questions about TV Chago subscriptions.
              </p>
            </Col>
          </Row>

          <Row className="justify-content-center">
            <Col lg={8}>
              <Accordion
                activeKey={activeAccordion}
                onSelect={(e) => setActiveAccordion(e)}
              >
                {faqs.map((faq, index) => (
                  <Accordion.Item
                    eventKey={index.toString()}
                    key={index}
                    className="mb-3"
                    style={{
                      borderColor: "#e6ddd4",
                      backgroundColor: "#faf8f5",
                      borderRadius: "0.75rem",
                      overflow: "hidden",
                      boxShadow: "0 2px 8px rgba(139, 69, 19, 0.08)",
                    }}
                  >
                    <Accordion.Header
                      className="fw-medium"
                      style={{
                        backgroundColor: "#faf8f5",
                        color: "#4a3e2a",
                      }}
                    >
                      <span className="fw-medium" style={{ color: "#4a3e2a" }}>
                        {faq.question}
                      </span>
                    </Accordion.Header>
                    <Accordion.Body
                      style={{
                        backgroundColor: "#f5f2ed",
                        color: "#6b5b47",
                        borderTop: "1px solid #e6ddd4",
                      }}
                    >
                      {faq.answer}
                    </Accordion.Body>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="pt-5 pb-4"
        style={{
          backgroundColor: "#2a251f",
          borderTop: `1px solid #4a3e2a`,
        }}
      >
        <Container>
          <Row className="g-4 mb-5">
            <Col lg={3} md={6}>
              <div
                style={{
                  backgroundColor: "#f5f2ed", // Light cream background to show dark logo
                  padding: "8px",
                  borderRadius: "8px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="mb-4"
              >
                <img
                  src="https://i.postimg.cc/FzW5kPNX/Whats-App-Image-2025-06-12-at-11-59-46-c03b4354-removebg-preview.png" // 🔁 Replace with your actual logo path
                  alt="TV Chago Logo"
                  height="36" // Adjust as needed
                  style={{ display: "block" }}
                />
              </div>

              <p style={{ color: "#b8a894" }} className="mb-4">
                The future of television is here. Experience premium
                entertainment like never before.
              </p>
              <div className="d-flex gap-3">
                <a href="#" className="text-decoration-none">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#3d342a",
                      border: "1px solid #4a3e2a",
                    }}
                  >
                    <FaFacebookF style={{ color: "#d4894a" }} />
                  </div>
                </a>
                <a href="#" className="text-decoration-none">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#3d342a",
                      border: "1px solid #4a3e2a",
                    }}
                  >
                    <FaTwitter style={{ color: "#8b4513" }} />
                  </div>
                </a>
                <a href="#" className="text-decoration-none">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#3d342a",
                      border: "1px solid #4a3e2a",
                    }}
                  >
                    <FaInstagram style={{ color: "#d4894a" }} />
                  </div>
                </a>
                <a href="#" className="text-decoration-none">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: "#3d342a",
                      border: "1px solid #4a3e2a",
                    }}
                  >
                    <FaYoutube style={{ color: "#8b4513" }} />
                  </div>
                </a>
              </div>
            </Col>

            <Col lg={3} md={6}>
              <h4 className="h5 fw-bold mb-4" style={{ color: "#f5f2ed" }}>
                Quick Links
              </h4>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-decoration-none"
                    style={{
                      color: "#b8a894",
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#d4894a")}
                    onMouseLeave={(e) => (e.target.style.color = "#b8a894")}
                  >
                    Home
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#packages"
                    className="text-decoration-none"
                    style={{
                      color: "#b8a894",
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#d4894a")}
                    onMouseLeave={(e) => (e.target.style.color = "#b8a894")}
                  >
                    Packages
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#faq"
                    className="text-decoration-none"
                    style={{
                      color: "#b8a894",
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#d4894a")}
                    onMouseLeave={(e) => (e.target.style.color = "#b8a894")}
                  >
                    FAQs
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-decoration-none"
                    style={{
                      color: "#b8a894",
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#d4894a")}
                    onMouseLeave={(e) => (e.target.style.color = "#b8a894")}
                  >
                    About Us
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-decoration-none"
                    style={{
                      color: "#b8a894",
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#d4894a")}
                    onMouseLeave={(e) => (e.target.style.color = "#b8a894")}
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </Col>

            <Col lg={3} md={6}>
              <h4 className="h5 fw-bold mb-4" style={{ color: "#f5f2ed" }}>
                Support
              </h4>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-decoration-none"
                    style={{
                      color: "#b8a894",
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#8b4513")}
                    onMouseLeave={(e) => (e.target.style.color = "#b8a894")}
                  >
                    Help Center
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-decoration-none"
                    style={{
                      color: "#b8a894",
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#8b4513")}
                    onMouseLeave={(e) => (e.target.style.color = "#b8a894")}
                  >
                    Contact Us
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-decoration-none"
                    style={{
                      color: "#b8a894",
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#8b4513")}
                    onMouseLeave={(e) => (e.target.style.color = "#b8a894")}
                  >
                    Live Chat
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-decoration-none"
                    style={{
                      color: "#b8a894",
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#8b4513")}
                    onMouseLeave={(e) => (e.target.style.color = "#b8a894")}
                  >
                    Terms of Service
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-decoration-none"
                    style={{
                      color: "#b8a894",
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#8b4513")}
                    onMouseLeave={(e) => (e.target.style.color = "#b8a894")}
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </Col>

            <Col lg={3} md={6}>
              <h4 className="h5 fw-bold mb-4" style={{ color: "#f5f2ed" }}>
                Newsletter
              </h4>
              <p style={{ color: "#b8a894" }} className="mb-3">
                Subscribe to get updates on new features and promotions.
              </p>
              <Form className="d-flex">
                <Form.Control
                  type="email"
                  placeholder="Your email"
                  className="rounded-start-pill"
                  style={{
                    backgroundColor: "#3d342a",
                    borderColor: "#4a3e2a",
                    color: "#f5f2ed",
                  }}
                />
                <Button
                  variant="primary"
                  className="rounded-end-pill"
                  style={{
                    background: `linear-gradient(to right, #d4894a, #8b4513)`,
                    border: "none",
                  }}
                >
                  <FaPaperPlane />
                </Button>
              </Form>
            </Col>
          </Row>

          <div
            className="pt-4 text-center"
            style={{
              borderTop: `1px solid #4a3e2a`,
              color: "#8a7b68",
            }}
          >
            <p className="mb-0">© 2025 TV Chago. All rights reserved.</p>
          </div>
        </Container>
      </footer>

      {/* Custom CSS for animations */}
      <style>
        {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
            40% {transform: translateY(-20px);}
            60% {transform: translateY(-10px);}
          }
          .hover-text-info:hover {
            color: ${brandCyan} !important;
          }
          .hover-text-purple:hover {
            color: ${brandPurple} !important;
          }
        `}
      </style>
    </div>
  );
};

export default TVChagoApp;
