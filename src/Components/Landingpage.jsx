import React, { useState, useEffect,useRef } from "react";
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
import "./Landingpage.css"

const TVChagoApp = () => {

   const packagePrices = {
    'service1': 299,
    'service2': 399,
    'both': 599
  };

  const proceedToPayment = () => {
    // Validation
    if (!username) {
      alert('Please enter your username');
      return;
    }

    setCurrentSection('paymentSection');
  };


  const processPayment = () => {
    // Validation
    if (!fullName || !email || !phone) {
      alert('Please fill in all required billing details');
      return;
    }

    // Simulate payment processing
    setTimeout(() => {
      // Generate order ID
      const newOrderId = 'TVP-' + new Date().getFullYear() + '-' + String(Math.floor(Math.random() * 10000)).padStart(4, '0');
      setOrderId(newOrderId);
      setCurrentSection('successSection');
    }, 3000);
  };

  // Trigger file input click
 

  const [activeAccordion, setActiveAccordion] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState('orderForm');
  const [customerType, setCustomerType] = useState('new');
  const [username, setUsername] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);
  const [notes, setNotes] = useState('');
  const [totalPrice, setTotalPrice] = useState(packagePrices['service1']);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [orderId, setOrderId] = useState('');

 

  
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
    <div
      className="min-vh-100"
      style={{ backgroundColor: darkBg, color: "white" }}
    >
      {/* Navbar */}
      <Navbar
        expand="lg"
        fixed="top"
        className={`transition-all ${isScrolled ? "py-3" : "py-4"}`}
        style={{
          backgroundColor: isScrolled ? `${darkBg}e6` : "transparent",
          backdropFilter: isScrolled ? "blur(10px)" : "none",
        }}
      >
        <Container>
          <Navbar.Brand href="#" className="d-flex align-items-center">
            <div
              style={{
                backgroundColor: "#ffffff", // Light background to highlight dark logo
                padding: "6px",
                borderRadius: "8px", // Rounded corners
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="https://i.postimg.cc/FzW5kPNX/Whats-App-Image-2025-06-12-at-11-59-46-c03b4354-removebg-preview.png" // 🔁 Replace with your actual logo path
                alt="TV Chago Logo"
                height="32" // Adjust size as needed
                style={{ display: "block" }}
              />
            </div>
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0">
            <span className="navbar-toggler-icon  "></span>
          </Navbar.Toggle>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#" className="text-white mx-lg-3">
                Home
              </Nav.Link>
              <Nav.Link href="#packages" className="text-white mx-lg-3">
                Packages
              </Nav.Link>
              <Nav.Link href="#faq" className="text-white mx-lg-3">
                FAQs
              </Nav.Link>
              <Nav.Link href="#contact" className="text-white mx-lg-3">
                Contact
              </Nav.Link>
            </Nav>
            <Link to="/login"
              variant="primary"
              className="ms-lg-3 mt-2 mt-lg-0"
              style={{
                background: `linear-gradient(to right, ${brandPurple}, ${brandCyan})`,
                border: "none",
                borderRadius: "50px",
                padding: "0.5rem 1.5rem",
                color:"white",
                textDecoration:"none"
              }}
            >
               Login
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <section className="position-relative d-flex align-items-center justify-content-center min-vh-100 overflow-hidden">
        <div className="position-absolute w-100 h-100" style={{ zIndex: 0 }}>
          <div
            className="w-100 h-100"
            style={{
              backgroundImage:
                "url(https://i.postimg.cc/wM6gmyNL/eae7bc236980394c5dc2273804d1e995.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "top center",
            }}
          ></div>
          <div
            className="position-absolute w-100 h-100"
            style={{
              background: `linear-gradient(to right, ${darkBg}, rgba(10, 10, 15, 0.8), transparent)`,
            }}
          ></div>
        </div>

        <Container className="position-relative" style={{ zIndex: 1 }}>
          <Row className="align-items-center">
            <Col lg={6} className="text-center text-lg-start mb-5 mb-lg-0">
              <h1
                className="display-4 fw-bold mb-4"
                style={{
                  background: `linear-gradient(to right, ${brandCyan}, ${brandPurple})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Stream Limitlessly with TV Chago
              </h1>
              <p className="lead mb-4" style={{ color: textMuted }}>
                Experience the future of television with our premium 12-month
                subscription packages.
              </p>
              <Button
              href="#packages"
                variant="primary"
                size="lg"
                style={{
                  background: `linear-gradient(to right, ${brandRed}, ${brandPurple})`,
                  border: "none",
                  borderRadius: "50px",
                  padding: "0.75rem 2rem",
                  boxShadow: `0 0 20px rgba(229, 62, 62, 0.7)`,
                }}
              >
                Explore Packages
              </Button>
            </Col>
          </Row>

          <div
            className="position-absolute bottom-0 start-50 translate-middle-x"
            style={{ zIndex: 1 }}
          >
            <a href="#packages" className="text-decoration-none">
              <FaChevronDown
                className="text-info fs-3"
                style={{ animation: "bounce 2s infinite" }}
              />
            </a>
          </div>
        </Container>

        {/* Add CSS animations */}
        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }

          @keyframes backgroundShift {
            0%,
            100% {
              opacity: 1;
            }
            50% {
              opacity: 0.7;
            }
          }

          @keyframes pulse {
            0%,
            100% {
              transform: translate(-50%, -50%) scale(1);
              opacity: 1;
            }
            50% {
              transform: translate(-50%, -50%) scale(1.1);
              opacity: 0.5;
            }
          }

          @keyframes sparkle {
            0%,
            100% {
              transform: scale(1) rotate(0deg);
              opacity: 1;
            }
            50% {
              transform: scale(1.2) rotate(180deg);
              opacity: 0.7;
            }
          }

          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </section>

      {/* Section Divider */}
      <div
        className="position-relative"
        style={{ height: "120px", overflow: "hidden" }}
      >
        {/* Animated wave separator */}
        <div
          className="position-absolute w-100"
          style={{
            bottom: 0,
            height: "60px",
            background: `linear-gradient(45deg, ${brandCyan}, ${brandPurple}, ${brandRed})`,
            clipPath: "polygon(0 50%, 100% 0, 100% 100%, 0 100%)",
          }}
        ></div>

        {/* Floating particles */}
        <div
          className="position-absolute w-100 h-100"
          style={{
            background: `radial-gradient(circle at 20% 20%, ${brandCyan}40 2px, transparent 2px),
                      radial-gradient(circle at 80% 60%, ${brandPurple}40 1px, transparent 1px),
                      radial-gradient(circle at 60% 80%, ${brandRed}40 1.5px, transparent 1.5px)`,
            backgroundSize: "100px 100px, 150px 150px, 120px 120px",
            animation: "float 6s ease-in-out infinite",
          }}
        ></div>

        {/* Central divider line with glow */}
        <div
          className="position-absolute start-50 translate-middle-x"
          style={{
            top: "50%",
            width: "60%",
            height: "2px",
            background: `linear-gradient(to right, transparent, ${brandCyan}, ${brandPurple}, ${brandCyan}, transparent)`,
            boxShadow: `0 0 20px ${brandCyan}80, 0 0 40px ${brandPurple}40`,
          }}
        ></div>
      </div>

      {/* Packages Section */}
      <section
        id="packages"
        className="position-relative py-5"
        style={{
          background: `linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)`,
          marginTop: "-60px",
          paddingTop: "120px",
        }}
      >
        {/* Dynamic background with moving elements */}
        <div
          className="position-absolute w-100 h-100"
          style={{
            zIndex: 0,
            background: `
            radial-gradient(circle at 10% 20%, ${brandCyan}20 0%, transparent 40%), 
            radial-gradient(circle at 90% 80%, ${brandPurple}25 0%, transparent 40%),
            radial-gradient(circle at 70% 30%, ${brandRed}15 0%, transparent 30%),
            linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.02) 50%, transparent 70%)
          `,
            animation: "backgroundShift 8s ease-in-out infinite",
          }}
        ></div>

        {/* Hexagonal pattern overlay */}
        <div
          className="position-absolute w-100 h-100"
          style={{
            zIndex: 0,
            backgroundImage: `
            linear-gradient(60deg, transparent 40%, ${borderColor}15 40%, ${borderColor}15 42%, transparent 42%),
            linear-gradient(120deg, transparent 40%, ${borderColor}10 40%, ${borderColor}10 42%, transparent 42%),
            linear-gradient(0deg, transparent 49%, ${borderColor}08 49%, ${borderColor}08 51%, transparent 51%)
          `,
            backgroundSize: "80px 80px, 80px 80px, 40px 40px",
            opacity: 0.6,
          }}
        ></div>

        {/* Glowing orbs */}
        <div
          className="position-absolute"
          style={{
            top: "20%",
            left: "10%",
            width: "200px",
            height: "200px",
            background: `radial-gradient(circle, ${brandCyan}30 0%, transparent 70%)`,
            borderRadius: "50%",
            filter: "blur(40px)",
            animation: "float 4s ease-in-out infinite",
          }}
        ></div>
        <div
          className="position-absolute"
          style={{
            bottom: "20%",
            right: "15%",
            width: "150px",
            height: "150px",
            background: `radial-gradient(circle, ${brandPurple}25 0%, transparent 70%)`,
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
                    className="px-4 py-2 rounded-pill mb-3 position-relative"
                    style={{
                      background: `linear-gradient(135deg, ${brandCyan}40, ${brandPurple}40)`,
                      border: `2px solid ${brandCyan}60`,
                      backdropFilter: "blur(10px)",
                      boxShadow: `0 0 30px ${brandCyan}50`,
                    }}
                  >
                    <span
                      className="text-white fw-bold position-relative"
                      style={{ zIndex: 2 }}
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
                      border: `1px solid ${brandCyan}30`,
                      animation: "pulse 2s infinite",
                    }}
                  ></div>
                </div>
              </div>
              <h2
                className="display-5 fw-bold mb-4 position-relative"
                style={{
                  background: `linear-gradient(45deg, ${brandCyan}, #ffffff, ${brandPurple})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: `0 0 30px ${brandCyan}50`,
                }}
              >
                Choose Your Package
                {/* Sparkle effects */}
                <span
                  className="position-absolute"
                  style={{
                    top: "-10px",
                    right: "20%",
                    color: brandCyan,
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
                    color: brandPurple,
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
                  color: textMuted,
                  textShadow: `0 0 10px ${brandCyan}30`,
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
                  background: `linear-gradient(135deg, ${cardBg}95, ${borderColor}20)`,
                  backdropFilter: "blur(15px)",
                  transition: "all 0.3s ease",
                  border: `1px solid ${borderColor}40`,
                }}
              >
                <Card.Body className="text-center p-4">
                  <div className="d-flex justify-content-center mb-4">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center position-relative"
                      style={{
                        width: "80px",
                        height: "80px",
                        background: `linear-gradient(135deg, ${brandCyan}30, ${cardBg})`,
                        border: `2px solid ${brandCyan}50`,
                      }}
                    >
                      <FaTv className="text-info fs-3" />
                      <div
                        className="position-absolute"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                          background: `conic-gradient(${brandCyan}30 0deg, transparent 90deg, transparent 270deg, ${brandCyan}30 360deg)`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <h3 className="h3 fw-bold mb-2 text-light">
                    12 Months Service One
                  </h3>
                  <div
                    className="h2 fw-bold mb-2"
                    style={{
                      background: `linear-gradient(to right, ${brandCyan}, ${brandCyan})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    $99.99
                  </div>
                  <p className="text-light mb-4">Premium Entertainment</p>

                  <ListGroup variant="flush" className="mb-4 text-start">
                    <ListGroup.Item className="bg-transparent text-white border-secondary d-flex align-items-center">
                      <FaCheckCircle className="text-info me-3" />
                      <span>200+ Premium Channels</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="bg-transparent text-white border-secondary d-flex align-items-center">
                      <FaCheckCircle className="text-info me-3" />
                      <span>HD Streaming Quality</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="bg-transparent text-white border-secondary d-flex align-items-center">
                      <FaCheckCircle className="text-info me-3" />
                      <span>Watch on 3 Devices</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="bg-transparent text-white border-secondary d-flex align-items-center">
                      <FaCheckCircle className="text-info me-3" />
                      <span>24/7 Customer Support</span>
                    </ListGroup.Item>
                  </ListGroup>

                  <Button
                    variant="primary"
                    className="w-100"
                    style={{
                      background: `linear-gradient(to right, ${brandCyan}, ${brandCyan})`,
                      border: "none",
                      borderRadius: "50px",
                      color: darkBg,
                      fontWeight: "bold",
                      boxShadow: `0 4px 15px ${brandCyan}40`,
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
                  background: `linear-gradient(135deg, ${cardBg}95, ${borderColor}20)`,
                  backdropFilter: "blur(15px)",
                  transition: "all 0.3s ease",
                  border: `1px solid ${borderColor}40`,
                }}
              >
                <Card.Body className="text-center p-4">
                  <div className="d-flex justify-content-center mb-4">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center position-relative"
                      style={{
                        width: "80px",
                        height: "80px",
                        background: `linear-gradient(135deg, ${brandPurple}30, ${cardBg})`,
                        border: `2px solid ${brandPurple}50`,
                      }}
                    >
                      <FaFilm style={{ color: brandPurple }} className="fs-3" />
                      <div
                        className="position-absolute"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "50%",
                          background: `conic-gradient(${brandPurple}30 0deg, transparent 90deg, transparent 270deg, ${brandPurple}30 360deg)`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <h3 className="h3 fw-bold mb-2 text-light">
                    12 Months Service Two
                  </h3>
                  <div
                    className="h2 fw-bold mb-2"
                    style={{
                      background: `linear-gradient(to right, ${brandPurple}, ${brandPurple})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    $119.99
                  </div>
                  <p className="text-light mb-4">Ultimate Entertainment</p>

                  <ListGroup variant="flush" className="mb-4 text-start">
                    <ListGroup.Item className="bg-transparent text-white border-secondary d-flex align-items-center">
                      <FaCheckCircle
                        style={{ color: brandPurple }}
                        className="me-3"
                      />
                      <span>300+ Premium Channels</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="bg-transparent text-white border-secondary d-flex align-items-center">
                      <FaCheckCircle
                        style={{ color: brandPurple }}
                        className="me-3"
                      />
                      <span>4K Streaming Quality</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="bg-transparent text-white border-secondary d-flex align-items-center">
                      <FaCheckCircle
                        style={{ color: brandPurple }}
                        className="me-3"
                      />
                      <span>Watch on 4 Devices</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="bg-transparent text-white border-secondary d-flex align-items-center">
                      <FaCheckCircle
                        style={{ color: brandPurple }}
                        className="me-3"
                      />
                      <span>Premium Movie Library</span>
                    </ListGroup.Item>
                  </ListGroup>

                  <Button
                    variant="primary"
                    className="w-100"
                    style={{
                      background: `linear-gradient(to right, ${brandPurple}, ${brandPurple})`,
                      border: "none",
                      borderRadius: "50px",
                      fontWeight: "bold",
                      boxShadow: `0 4px 15px ${brandPurple}40`,
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
                  background: `linear-gradient(135deg, ${cardBg}95, ${borderColor}20)`,
                  backdropFilter: "blur(15px)",
                  transition: "all 0.3s ease",
                  border: `2px solid ${brandCyan}60`,
                  transform: "scale(1.05)",
                }}
              >
                <div
                  className="position-absolute top-0 end-0 px-3 py-1 rounded-top-end rounded-bottom-start"
                  style={{
                    background: `linear-gradient(to right, ${brandCyan}, ${brandPurple})`,
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
                        background: `linear-gradient(135deg, ${brandCyan}30, ${brandPurple}30)`,
                        border: `2px solid ${brandCyan}70`,
                      }}
                    >
                      <FaCrown
                        style={{
                          background: `linear-gradient(to right, ${brandCyan}, ${brandPurple})`,
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
                          background: `conic-gradient(${brandCyan}40 0deg, ${brandPurple}40 180deg, ${brandCyan}40 360deg)`,
                          animation: "spin 3s linear infinite",
                        }}
                      ></div>
                    </div>
                  </div>
                  <h3 className="h3 fw-bold mb-2 text-light">
                    12 Months Both Combo
                  </h3>
                  <div
                    className="h2 fw-bold mb-2"
                    style={{
                      background: `linear-gradient(to right, ${brandCyan}, ${brandPurple})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    $179.99
                  </div>
                  <p className="text-light mb-4">Ultimate Bundle</p>

                  <ListGroup variant="flush" className="mb-4 text-start">
                    <ListGroup.Item className="bg-transparent text-white border-secondary d-flex align-items-center">
                      <FaCheckCircle
                        style={{
                          background: `linear-gradient(to right, ${brandCyan}, ${brandPurple})`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                        className="me-3"
                      />
                      <span>500+ Premium Channels</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="bg-transparent text-white border-secondary d-flex align-items-center">
                      <FaCheckCircle
                        style={{
                          background: `linear-gradient(to right, ${brandCyan}, ${brandPurple})`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                        className="me-3"
                      />
                      <span>8K Streaming Quality</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="bg-transparent text-white border-secondary d-flex align-items-center">
                      <FaCheckCircle
                        style={{
                          background: `linear-gradient(to right, ${brandCyan}, ${brandPurple})`,
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                        className="me-3"
                      />
                      <span>Watch on 5 Devices</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="bg-transparent text-white border-secondary d-flex align-items-center">
                      <FaCheckCircle
                        style={{
                          background: `linear-gradient(to right, ${brandCyan}, ${brandPurple})`,
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
                      background: `linear-gradient(to right, ${brandCyan}, ${brandPurple})`,
                      border: "none",
                      borderRadius: "50px",
                      fontWeight: "bold",
                      boxShadow: `0 4px 20px rgba(0,255,255,0.4)`,
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


     <div className="container ">

       {/* Order Form */}
              <div className="tv-form-section " style={{ display: currentSection === 'orderForm' ? 'block' : 'none' }} id="orderForm">
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
                        checked={customerType === 'new'}
                        onChange={handleCustomerTypeChange}
                      />
                      <label htmlFor="newCustomer" className="text-black">New Customer</label>
                    </div>
                    <div className="tv-radio-item">
                      <input
                        type="radio"
                        name="customerType"
                        value="existing"
                        id="existingCustomer"
                        checked={customerType === 'existing'}
                        onChange={handleCustomerTypeChange}
                      />
                      <label htmlFor="existingCustomer" className="text-black">Existing Customer</label>
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
                    placeholder={customerType === 'new' ? 'Enter your desired username' : 'Enter your existing username'}
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
                  <div
                    className="tv-file-upload-area"
                    onClick={triggerFileInput}
                  >
                    {uploadedFile ? (
                      <>
                        <i className="fas fa-file-check tv-file-upload-icon" style={{ color: 'var(--tv-success)' }} />
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
                <div className="tv-price-display">
                  <div className="tv-price-label">Total Amount</div>
                  <div className="tv-price-amount">
                    ${totalPrice}
                  </div>
                </div>

                {/* Checkout Button */}
                <button className="tv-checkout-btn" onClick={proceedToPayment}>
                  <i className="fas fa-credit-card me-2" />
                  Proceed to Checkout
                </button>
              </div>

              {/* Payment Section */}
              <div className="tv-payment-section" style={{ display: currentSection === 'paymentSection' ? 'block' : 'none' }} id="paymentSection">
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
              <div className="tv-success-section" style={{ display: currentSection === 'successSection' ? 'block' : 'none' }} id="successSection">
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
                  Our team will process your order and contact you within 24 hours
                  for installation scheduling.
                </p>
              </div>
     </div>

      {/* Features Section */}
      <section className="py-5" style={{ backgroundColor: darkBg }}>
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <h2
                className="display-5 fw-bold mb-3"
                style={{
                  background: `linear-gradient(to right, ${brandCyan}, ${brandPurple})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Why Choose TV Chago
              </h2>
              <p className="lead" style={{ color: textMuted }}>
                Experience the future of television with our cutting-edge
                features.
              </p>
            </Col>
          </Row>

          <Row className="g-4">
            <Col md={6} lg={4}>
              <Card
                className="h-100 border-secondary"
                style={{
                  backgroundColor: `${cardBg}66`,
                  backdropFilter: "blur(5px)",
                  borderColor: borderColor,
                }}
              >
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-center mb-4">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "64px",
                        height: "64px",
                        background: `linear-gradient(to bottom right, ${cardBg}, ${borderColor})`,
                      }}
                    >
                      <FaBolt className="text-info fs-3" />
                    </div>
                  </div>
                  <h3 className="h4 fw-bold mb-3 text-light">
                    Lightning Fast Streaming
                  </h3>
                  <p className="text-light">
                    Experience buffer-free streaming with our optimized network
                    infrastructure, delivering content at unprecedented speeds.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={4}>
              <Card
                className="h-100 border-secondary"
                style={{
                  backgroundColor: `${cardBg}66`,
                  backdropFilter: "blur(5px)",
                  borderColor: borderColor,
                }}
              >
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-center mb-4">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "64px",
                        height: "64px",
                        background: `linear-gradient(to bottom right, ${cardBg}, ${borderColor})`,
                      }}
                    >
                      <FaGlobe
                        style={{ color: brandPurple }}
                        className="fs-3"
                      />
                    </div>
                  </div>
                  <h3 className="h4 fw-bold mb-3 text-light">
                    Global Content Library
                  </h3>
                  <p className="text-light">
                    Access thousands of shows, movies, and live events from
                    around the world, all in one convenient platform.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={4}>
              <Card
                className="h-100 border-secondary"
                style={{
                  backgroundColor: `${cardBg}66`,
                  backdropFilter: "blur(5px)",
                  borderColor: borderColor,
                }}
              >
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-center mb-4">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "64px",
                        height: "64px",
                        background: `linear-gradient(to bottom right, ${cardBg}, ${borderColor})`,
                      }}
                    >
                      <FaMobileAlt className="text-info fs-3" />
                    </div>
                  </div>
                  <h3 className="h4 fw-bold mb-3 text-light">
                    Multi-Device Support
                  </h3>
                  <p className="text-light">
                    Watch your favorite content on any device - from smartphones
                    and tablets to smart TVs and gaming consoles.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={4}>
              <Card
                className="h-100 border-secondary"
                style={{
                  backgroundColor: `${cardBg}66`,
                  backdropFilter: "blur(5px)",
                  borderColor: borderColor,
                }}
              >
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-center mb-4">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "64px",
                        height: "64px",
                        background: `linear-gradient(to bottom right, ${cardBg}, ${borderColor})`,
                      }}
                    >
                      <FaDownload
                        style={{ color: brandPurple }}
                        className="fs-3"
                      />
                    </div>
                  </div>
                  <h3 className="h4 fw-bold mb-3 text-light">
                    Offline Viewing
                  </h3>
                  <p className="text-light">
                    Download your favorite shows and movies to watch offline,
                    perfect for travel or areas with limited connectivity.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={4}>
              <Card
                className="h-100 border-secondary"
                style={{
                  backgroundColor: `${cardBg}66`,
                  backdropFilter: "blur(5px)",
                  borderColor: borderColor,
                }}
              >
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-center mb-4">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "64px",
                        height: "64px",
                        background: `linear-gradient(to bottom right, ${cardBg}, ${borderColor})`,
                      }}
                    >
                      <FaShieldAlt className="text-info fs-3" />
                    </div>
                  </div>
                  <h3 className="h4 fw-bold mb-3 text-light">
                    Secure Streaming
                  </h3>
                  <p className="text-light">
                    Our advanced encryption and security protocols ensure your
                    viewing habits and personal data remain private.
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={4}>
              <Card
                className="h-100 border-secondary"
                style={{
                  backgroundColor: `${cardBg}66`,
                  backdropFilter: "blur(5px)",
                  borderColor: borderColor,
                }}
              >
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-center mb-4">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        width: "64px",
                        height: "64px",
                        background: `linear-gradient(to bottom right, ${cardBg}, ${borderColor})`,
                      }}
                    >
                      <FaHeadset
                        style={{ color: brandPurple }}
                        className="fs-3"
                      />
                    </div>
                  </div>
                  <h3 className="h4 fw-bold mb-3 text-light ">24/7 Support</h3>
                  <p className="text-light">
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
      <section id="faq" className="py-5" style={{ backgroundColor: darkBg }}>
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <h2
                className="display-5 fw-bold mb-3"
                style={{
                  background: `linear-gradient(to right, ${brandCyan}, ${brandPurple})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Frequently Asked Questions
              </h2>
              <p className="lead" style={{ color: textMuted }}>
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
                      borderColor: borderColor,
                      backgroundColor: cardBg,
                      borderRadius: "0.75rem",
                      overflow: "hidden",
                    }}
                  >
                    <Accordion.Header
                      className="text-white"
                      style={{ backgroundColor: cardBg }}
                    >
                      <span className="fw-medium">{faq.question}</span>
                    </Accordion.Header>
                    <Accordion.Body
                      style={{ backgroundColor: darkBg, color: textMuted }}
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

      {/* CTA Section */}
      <section className="py-5 position-relative overflow-hidden">
        <div className="position-absolute w-100 h-100" style={{ zIndex: 0 }}>
          <div
            className="w-100 h-100"
            style={{
              backgroundImage:
                "url(https://i.postimg.cc/K8SHzSyh/8b07855fbe97cfc9bb6de4f9ffee2794.jpg)",
              backgroundSize: "cover",
              backgroundPosition: "top center",
            }}
          ></div>
          <div
            className="position-absolute w-100 h-100"
            style={{
              background: `linear-gradient(to bottom, ${darkBg}, rgba(10, 10, 15, 0.5), ${darkBg})`,
            }}
          ></div>
        </div>

        <Container className="position-relative" style={{ zIndex: 1 }}>
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h2
                className="display-4 fw-bold mb-4"
                style={{
                  background: `linear-gradient(to right, ${brandCyan}, ${brandPurple})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Ready to Transform Your Viewing Experience?
              </h2>
              <p className="lead mb-5" style={{ color: "white" }}>
                Join thousands of satisfied customers who have elevated their
                entertainment with TV Chago.
              </p>

              <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  style={{
                    background: `linear-gradient(to right, ${brandCyan}, ${brandPurple})`,
                    border: "none",
                    borderRadius: "50px",
                    padding: "0.75rem 2rem",
                    boxShadow: `0 0 20px rgba(0, 240, 255, 0.7)`,
                  }}
                >
                  Get Started Now
                </Button>
                <Button
                  variant="outline-light"
                  size="lg"
                  style={{
                    borderColor: brandPurple,
                    borderRadius: "50px",
                    padding: "0.75rem 2rem",
                    boxShadow: `0 0 20px rgba(167, 66, 255, 0.7)`,
                  }}
                >
                  Contact Sales
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="pt-5 pb-4"
        style={{
          backgroundColor: darkBg,
          borderTop: `1px solid ${borderColor}`,
        }}
      >
        <Container>
          <Row className="g-4 mb-5">
            <Col lg={3} md={6}>
              <div
                style={{
                  backgroundColor: "#ffffff", // Light background to show dark logo
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

              <p className="text-light mb-4">
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
                      backgroundColor: cardBg,
                    }}
                  >
                    <FaFacebookF className="text-info" />
                  </div>
                </a>
                <a href="#" className="text-decoration-none">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: cardBg,
                    }}
                  >
                    <FaTwitter style={{ color: brandPurple }} />
                  </div>
                </a>
                <a href="#" className="text-decoration-none">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: cardBg,
                    }}
                  >
                    <FaInstagram className="text-info" />
                  </div>
                </a>
                <a href="#" className="text-decoration-none">
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center"
                    style={{
                      width: "40px",
                      height: "40px",
                      backgroundColor: cardBg,
                    }}
                  >
                    <FaYoutube style={{ color: brandPurple }} />
                  </div>
                </a>
              </div>
            </Col>

            <Col lg={3} md={6}>
              <h4 className="h5 fw-bold mb-4">Quick Links</h4>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-light text-decoration-none hover-text-info"
                  >
                    Home
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#packages"
                    className="text-light text-decoration-none hover-text-info"
                  >
                    Packages
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#faq"
                    className="text-light text-decoration-none hover-text-info"
                  >
                    FAQs
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-light text-decoration-none hover-text-info"
                  >
                    About Us
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-light text-decoration-none hover-text-info"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </Col>

            <Col lg={3} md={6}>
              <h4 className="h5 fw-bold mb-4">Support</h4>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-light text-decoration-none hover-text-purple"
                  >
                    Help Center
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-light text-decoration-none hover-text-purple"
                  >
                    Contact Us
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-light text-decoration-none hover-text-purple"
                  >
                    Live Chat
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-light text-decoration-none hover-text-purple"
                  >
                    Terms of Service
                  </a>
                </li>
                <li className="mb-2">
                  <a
                    href="#"
                    className="text-light text-decoration-none hover-text-purple"
                  >
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </Col>

            <Col lg={3} md={6}>
              <h4 className="h5 fw-bold mb-4">Newsletter</h4>
              <p className="text-light mb-3">
                Subscribe to get updates on new features and promotions.
              </p>
              <Form className="d-flex">
                <Form.Control
                  type="email"
                  placeholder="Your email"
                  className="rounded-start-pill"
                  style={{
                    backgroundColor: cardBg,
                    borderColor: borderColor,
                    color: "white",
                  }}
                />
                <Button
                  variant="primary"
                  className="rounded-end-pill"
                  style={{
                    background: `linear-gradient(to right, ${brandCyan}, ${brandPurple})`,
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
              borderTop: `1px solid ${borderColor}`,
              color: textMuted,
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
