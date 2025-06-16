import React, { useState, useRef } from 'react';
import "./Landingpage.css";

const Landingpage = () => {
  // Package pricing
  const packagePrices = {
    'service1': 299,
    'service2': 399,
    'both': 599
  };

  // State management
  const [selectedPackage, setSelectedPackage] = useState('service1');
  const [customerType, setCustomerType] = useState('new');
  const [totalPrice, setTotalPrice] = useState(packagePrices['service1']);
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [currentSection, setCurrentSection] = useState('orderForm');
  const [orderId, setOrderId] = useState('');

  const fileInputRef = useRef(null);

  // Handle package selection
  const handlePackageChange = (e) => {
    const value = e.target.value;
    setSelectedPackage(value);
    setTotalPrice(packagePrices[value]);
  };

  // Handle customer type change
  const handleCustomerTypeChange = (e) => {
    setCustomerType(e.target.value);
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  // Proceed to payment
  const proceedToPayment = () => {
    // Validation
    if (!username) {
      alert('Please enter your username');
      return;
    }

    setCurrentSection('paymentSection');
  };

  // Process payment
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
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <div className="position-relative mt-5 p-4 d-flex align-items-center justify-content-center overflow-hidden"
      >

        {/* Background with gradient overlay */}
        {/* <div
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{
            backgroundColor: '#0f172a', // Dark blue background
            backgroundImage: 'url(https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 1
          }}
        >
          <div
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 2 }}
          ></div>
        </div> */}

        {/* Animated background elements */}
        <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden" style={{ zIndex: 3 }}>
          <div
            className="position-absolute rounded-circle"
            style={{
top: '25%' ,
              left: '25%',
              width: '24rem',
              height: '24rem',
              background: '#d84a33', // Your brand color
              mixBlendMode: 'screen',
              filter: 'blur(40px)',
              opacity: 0.2,
              animation: 'pulse 3s ease-in-out infinite'
            }}
          ></div>
          <div
            className="position-absolute rounded-circle"
            style={{
top: '25%' ,
              right: '25%',
              width: '24rem',
              height: '24rem',
              background: '#1e40af', // Blue accent
              mixBlendMode: 'screen',
              filter: 'blur(40px)',
              opacity: 0.2,
              animation: 'pulse 3s ease-in-out infinite 2s'
            }}
          ></div>
        </div>

        {/* Hero Content */}
        <div className="position-relative text-center text-white px-4" style={{ marginTop: 0, zIndex: 10, maxWidth: '60rem' }}>
          <div className="mb-5">
            <h1 className="display-1 fw-bold mb-3 text-dark" >
              Premium TV Packages
            </h1>
            <h2 className="display-4 fw-light text-dark-50 mb-4" style={{ opacity: 0.9 }}>
              Unlimited Entertainment
            </h2>
          </div>

          <p className="fs-4 mb-5 text-dark" style={{ opacity: 0.8, maxWidth: '40rem', margin: '0 auto', lineHeight: 1.6 }}>
            Experience crystal-clear HD channels, premium sports, and on-demand content
            with our exclusive TV packages. Subscribe now for the ultimate viewing experience.
          </p>

          <div className="d-flex flex-column align-items-center gap-4">

            {/* <button
        onClick={() => setCurrentSection('orderForm')}
        className="btn btn-lg px-5 py-3 fs-5 fw-semibold rounded-pill shadow-lg"
        style={{
          background: '#d84a33', // Your brand color
          border: 'none',
          color: 'white',
          transition: 'all 0.3s ease',
          transform: 'scale(1)'
        }}
        onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
      >
        Order Your Package Now
      </button> */}

            <div className="d-flex justify-content-center mt-4 mb-4 gap-4 small" style={{ color: 'black', opacity: 0.75 }}>
              <div className="d-flex align-items-center gap-2">
                <i className="fas fa-hd me-1"></i>
                <span>HD Channels</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <i className="fas fa-shield-alt me-1"></i>
                <span>Secure Payment</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <i className="fas fa-headset me-1"></i>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}

      </div>

      {/* Hero Section */}
      <section className="tv-hero-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="text-center mb-5">
                <h1 className="tv-hero-title">Order Your  <span style={{color:"red"}}> TV Package</span></h1>
                <p className="tv-hero-subtitle">
                  Choose from our premium TV service packages and get instant access
                  to unlimited entertainment
                </p>
              </div>

              {/* Package Selection */}
              <div className="row mb-4">
                <div className="col-lg-4 mb-3">
                  <div className="tv-package-card">
                    <input
                      type="radio"
                      name="package"
                      value="service1"
                      id="service1"
                      className="tv-package-radio"
                      checked={selectedPackage === 'service1'}
                      onChange={handlePackageChange}
                    />
                    <label htmlFor="service1" className="w-100 cursor-pointer">
                      <div className="tv-package-title">12 Months Service 1</div>
                      <div className="tv-package-price">$299</div>
                      <ul className="tv-package-features">
                        <li>100+ HD Channels</li>
                        <li>24/7 Customer Support</li>
                        <li>Free Installation</li>
                        <li>Mobile App Access</li>
                      </ul>
                    </label>
                  </div>
                </div>
                <div className="col-lg-4 mb-3">
                  <div className="tv-package-card">
                    <input
                      type="radio"
                      name="package"
                      value="service2"
                      id="service2"
                      className="tv-package-radio"
                      checked={selectedPackage === 'service2'}
                      onChange={handlePackageChange}
                    />
                    <label htmlFor="service2" className="w-100 cursor-pointer">
                      <div className="tv-package-title">12 Months Service 2</div>
                      <div className="tv-package-price">$399</div>
                      <ul className="tv-package-features">
                        <li>200+ HD Channels</li>
                        <li>Premium Sports Package</li>
                        <li>DVR Recording</li>
                        <li>Multiple Device Access</li>
                      </ul>
                    </label>
                  </div>
                </div>
                <div className="col-lg-4 mb-3">
                  <div className="tv-package-card">
                    <input
                      type="radio"
                      name="package"
                      value="both"
                      id="both"
                      className="tv-package-radio"
                      checked={selectedPackage === 'both'}
                      onChange={handlePackageChange}
                    />
                    <label htmlFor="both" className="w-100 cursor-pointer">
                      <div className="tv-package-title">
                        12 Months Both Services
                      </div>
                      <div className="tv-package-price">$599</div>
                      <ul className="tv-package-features">
                        <li>300+ HD Channels</li>
                        <li>All Premium Content</li>
                        <li>Advanced DVR</li>
                        <li>Unlimited Devices</li>
                      </ul>
                    </label>
                  </div>
                </div>
              </div>

              {/* Order Form */}
              <div className="tv-form-section" style={{ display: currentSection === 'orderForm' ? 'block' : 'none' }} id="orderForm">
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
                      <label htmlFor="newCustomer">New Customer</label>
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landingpage;