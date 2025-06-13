import React, { useState, useRef } from 'react';
import './Order.css';
import { useNavigate } from 'react-router-dom';

const Ordertrack = () => {
  const [step, setStep] = useState(1);
  const [order, setOrder] = useState({
    fullName: '',
    email: '',
    mobile: '',
    address: '',
    requirements: '',
    file: null,
  });
  const [payment, setPayment] = useState({
    method: 'card',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
    saveCard: false,
  });
  const fileInputRef = useRef();

  const handleOrderChange = (e) => {
    const { id, value, files } = e.target;
    if (id === 'fileUploadUnique') {
      setOrder((prev) => ({ ...prev, file: files[0] }));
    } else {
      setOrder((prev) => ({ ...prev, [id.replace('Unique', '')]: value }));
    }
  };

  const handlePaymentChange = (e) => {
    const { id, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setPayment((prev) => ({ ...prev, [id.replace('Unique', '')]: checked }));
    } else {
      setPayment((prev) => ({ ...prev, [id.replace('Unique', '')]: value }));
    }
  };

  const canProceed =
    order.fullName.trim() !== '' &&
    order.email.trim() !== '' &&
    order.mobile.trim() !== '';

  const canCompletePayment =
    payment.method === 'card'
      ? payment.cardName.trim() !== '' &&
      payment.cardNumber.trim() !== '' &&
      payment.cardExpiry.trim() !== '' &&
      payment.cardCVV.trim() !== ''
      : true;

  const handlePaymentMethod = (method) => {
    setPayment((prev) => ({ ...prev, method }));
  };

  const handleFileUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleReturnHome = () => {
    window.location.href = '/';
  };

  const navigate = useNavigate();


  return (
    <div className="order-track-container mt-5">
      <div className="py-4 py-md-5">
        <div className="order-form-card-unique mx-auto">
          <div className="mb-3">

            <button className="custom-back-button btn" onClick={() => navigate(-1)}>
              ← Back
            </button>

          </div>

          {/* Stepper */}
          <div className="order-stepper-unique mb-4">
            <div
              className={`order-step-unique${step === 1 ? ' order-step-active-unique' : ''}`}
              id="step1Unique"
            >
              <div className="order-step-circle-unique">1</div>
              <div className="fw-semibold mt-2 mt-md-4">Order Details</div>
            </div>
            <div
              className={`order-step-unique${step === 2 ? ' order-step-active-unique' : ''}`}
              id="step2Unique"
            >
              <div className="order-step-circle-unique">2</div>
              <div className="fw-semibold mt-2">Payment</div>
            </div>
            <div
              className={`order-step-unique${step === 3 ? ' order-step-active-unique' : ''}`}
              id="step3Unique"
            >
              <div className="order-step-circle-unique">3</div>
              <div className="fw-semibold mt-2">Confirmation</div>
            </div>
          </div>

          {/* Step 1: Order Details */}
          <form id="orderFormUnique" onSubmit={e => e.preventDefault()}>
            {step === 1 && (
              <div id="orderDetailsTabUnique" className="container p-3 p-md-4 shadow rounded bg-white">
                <div className="mb-4">
                  <div className="bg-danger bg-opacity-10 rounded-3 p-3 mb-3">
                    <span className="fw-semibold text-danger">Selected Service</span>
                    <div className="fw-bold fs-5 mt-1">Mobile App Development</div>
                  </div>

                  <h5 className="mb-3">Personal Information</h5>
                  <div className="row g-3">
                    <div className="col-12 col-md-6">
                      <label htmlFor="fullNameUnique" className="form-label">Full Name *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="fullNameUnique"
                        value={order.fullName}
                        onChange={handleOrderChange}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label htmlFor="emailUnique" className="form-label">Email Address *</label>
                      <input
                        type="email"
                        className="form-control"
                        id="emailUnique"
                        value={order.email}
                        onChange={handleOrderChange}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label htmlFor="mobileUnique" className="form-label">Mobile Number *</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="mobileUnique"
                        value={order.mobile}
                        onChange={handleOrderChange}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6">
                      <label htmlFor="addressUnique" className="form-label">Address *</label>
                      <input
                        type="text"
                        className="form-control"
                        id="addressUnique"
                        value={order.address || ''}
                        onChange={handleOrderChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h5>Service Details</h5>
                  <label htmlFor="requirementsUnique" className="form-label">Special Requirements</label>
                  <textarea
                    className="form-control"
                    id="requirementsUnique"
                    rows={3}
                    placeholder="Please provide any specific requirements or details about your project"
                    value={order.requirements}
                    onChange={handleOrderChange}
                  />
                </div>

                <div className="mb-4">
                  <h5>File Upload</h5>
                  <div className="border rounded-3 p-3 p-md-4 text-center bg-light" style={{ borderStyle: 'dashed' }}>
                    <label
                      className="d-block"
                      htmlFor="fileUploadUnique"
                      style={{ cursor: 'pointer' }}
                      onClick={handleFileUploadClick}
                    >
                      <div className="mb-2">
                        <svg width={32} height={32} fill="#dc3545" viewBox="0 0 24 24">
                          <path d="M19 15v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-4H2l10-9 10 9h-3zm-7 4h4v-4h-4v4z" />
                        </svg>
                      </div>
                      <div className="mb-1 fw-semibold">Drag and drop files here, or click to browse</div>
                      <small className="text-muted">Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB)</small>
                    </label>
                    <input
                      type="file"
                      id="fileUploadUnique"
                      className="d-none"
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      ref={fileInputRef}
                      onChange={handleOrderChange}
                    />
                    {order.file && (
                      <div className="mt-2 text-danger">Selected: {order.file.name}</div>
                    )}
                  </div>
                </div>

                <div className="d-flex justify-content-between">
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-3 px-md-4"
                    id="backBtnUnique1"
                    disabled
                  >
                    &larr; Back
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger px-3 px-md-4"
                    id="proceedBtnUnique"
                    disabled={!canProceed}
                    onClick={() => setStep(2)}
                  >
                    Proceed to Payment →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div id="paymentTabUnique" className="container p-3 p-md-4 shadow rounded bg-white">
                <h4 className="mb-4">Payment</h4>
                <div className="row">
                  {/* Order Summary */}
                  <div className="col-12 col-md-5 mb-4 mb-md-0">
                    <div className="bg-light rounded-3 p-3 border">
                      <div className="fw-semibold mb-3">Order Summary</div>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Service</span>
                        <span className="fw-semibold">Website Development</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Service Fee</span>
                        <span>$999.00</span>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <span>Tax</span>
                        <span>$99.90</span>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-between fw-bold fs-6">
                        <span>Total</span>
                        <span>$1,098.90</span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="col-12 col-md-7">
                    <div className="mb-3 fw-semibold">Payment Method</div>
                    <div className="btn-group w-100 mb-3" role="group">
                      <button
                        type="button"
                        className={`btn btn-outline-danger payment-method-btn-unique${payment.method === 'card' ? ' active' : ''}`}
                        data-method="card"
                        onClick={() => handlePaymentMethod('card')}
                      >
                        Credit Card
                      </button>
                      <button
                        type="button"
                        className={`btn btn-outline-danger payment-method-btn-unique${payment.method === 'paypal' ? ' active' : ''}`}
                        data-method="paypal"
                        onClick={() => handlePaymentMethod('paypal')}
                      >
                        PayPal
                      </button>
                      <button
                        type="button"
                        className={`btn btn-outline-danger payment-method-btn-unique${payment.method === 'bank' ? ' active' : ''}`}
                        data-method="bank"
                        onClick={() => handlePaymentMethod('bank')}
                      >
                        Bank Transfer
                      </button>
                    </div>

                    {/* Credit Card Fields */}
                    {payment.method === 'card' && (
                      <div id="creditCardFieldsUnique">
                        <div className="mb-3">
                          <label className="form-label">Name on Card</label>
                          <input
                            type="text"
                            className="form-control"
                            id="cardNameUnique"
                            value={payment.cardName}
                            onChange={handlePaymentChange}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Card Number</label>
                          <input
                            type="text"
                            className="form-control"
                            id="cardNumberUnique"
                            maxLength={19}
                            placeholder="1234 5678 9012 3456"
                            value={payment.cardNumber}
                            onChange={handlePaymentChange}
                            required
                          />
                        </div>
                        <div className="row g-3">
                          <div className="col-12 col-md-6">
                            <label className="form-label">Expiry Date</label>
                            <input
                              type="text"
                              className="form-control"
                              id="cardExpiryUnique"
                              placeholder="MM/YY"
                              maxLength={5}
                              value={payment.cardExpiry}
                              onChange={handlePaymentChange}
                              required
                            />
                          </div>
                          <div className="col-12 col-md-6">
                            <label className="form-label">CVV</label>
                            <input
                              type="text"
                              className="form-control"
                              id="cardCVVUnique"
                              maxLength={4}
                              value={payment.cardCVV}
                              onChange={handlePaymentChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="form-check mt-3">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="saveCardUnique"
                            checked={payment.saveCard}
                            onChange={handlePaymentChange}
                          />
                          <label className="form-check-label" htmlFor="saveCardUnique">
                            Save card for future payments
                          </label>
                        </div>
                        <div className="text-muted mt-3" style={{ fontSize: "0.95em" }}>
                          <svg
                            width={18}
                            height={18}
                            fill="#dc3545"
                            viewBox="0 0 24 24"
                            style={{ verticalAlign: "middle", marginRight: "5px" }}
                          >
                            <path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm1 15h-2v-2h2zm0-4h-2V7h2z" />
                          </svg>
                          Secure payment processed with 256 bit SSL encryption
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Buttons */}
                <div className="d-flex justify-content-between mt-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-3 px-md-4"
                    id="backBtnUnique2"
                    onClick={() => setStep(1)}
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger px-3 px-md-4"
                    id="completePaymentBtnUnique"
                    disabled={!canCompletePayment}
                    onClick={() => setStep(3)}
                  >
                    Complete Payment →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {step === 3 && (
              <div id="confirmationTabUnique" className="container p-3 p-md-4 shadow rounded bg-white">
                <div className="text-center mb-4">
                  <div
                    className="rounded-circle bg-danger bg-opacity-10 d-inline-flex align-items-center justify-content-center mb-3"
                    style={{ width: 64, height: 64 }}
                  >
                    <svg width={40} height={40} fill="#dc3545" viewBox="0 0 24 24">
                      <path d="M20.285 6.709l-11.025 11.025-5.025-5.025 1.414-1.414 3.611 3.611 9.611-9.611z" />
                    </svg>
                  </div>
                  <h4 className="fw-bold text-danger">Payment Successful!</h4>
                  <div className="text-muted mb-2">
                    Your order has been placed successfully. You will receive a
                    confirmation email shortly.
                  </div>
                </div>
                <div className="bg-light rounded-3 p-3 mb-4 border">
                  <div className="fw-semibold mb-2">Order Details</div>
                  <div className="row">
                    <div className="col-12 col-md-6 mb-3 mb-md-0">
                      <div>
                        <span className="text-muted">Order ID</span>
                        <br />
                        <span className="fw-semibold">#ORD-2025-06-11-001</span>
                      </div>
                      <div className="mt-2">
                        <span className="text-muted">Service</span>
                        <br />
                        <span className="fw-semibold">Mobile App Development</span>
                      </div>
                      <div className="mt-2">
                        <span className="text-muted">Payment Method</span>
                        <br />
                        <span className="fw-semibold">
                          {payment.method === 'card'
                            ? `Credit Card (**** ${payment.cardNumber.slice(-4)})`
                            : payment.method === 'paypal'
                              ? 'PayPal'
                              : 'Bank Transfer'}
                        </span>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div>
                        <span className="text-muted">Date</span>
                        <br />
                        <span className="fw-semibold">June 11, 2025</span>
                      </div>
                      <div className="mt-2">
                        <span className="text-muted">Amount</span>
                        <br />
                        <span className="fw-semibold">$1,098.90</span>
                      </div>
                      <div className="mt-2">
                        <span className="text-muted">Status</span>
                        <br />
                        <span className="fw-semibold text-danger">Paid</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <div className="fw-semibold mb-2">What's Next?</div>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <span className="fw-semibold">Email Confirmation</span>
                      <br />
                      <span className="text-muted">
                        A detailed confirmation has been sent to your email address.
                      </span>
                    </li>
                    <li className="mb-2">
                      <span className="fw-semibold">Service Assignment</span>
                      <br />
                      <span className="text-muted">
                        Our team will review your order and assign the best professional
                        for your service.
                      </span>
                    </li>
                    <li>
                      <span className="fw-semibold">Status Updates</span>
                      <br />
                      <span className="text-muted">
                        You will receive email and SMS notifications about your order
                        status.
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="d-flex justify-content-center gap-2 flex-wrap">
                  <button type="button" className="btn btn-outline-danger px-3 px-md-4">
                    Track Order
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-3 px-md-4"
                    id="returnHomeBtnUnique"
                    onClick={handleReturnHome}
                  >
                    Return to Homepage
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Ordertrack;