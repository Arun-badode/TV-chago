import React, { useState } from "react";
import { Button, Card, Form, Row, Col } from "react-bootstrap";

const Settings = () => {
  const [servicePricing, setServicePricing] = useState({
    service1: 100,
    service2: 200,
    both: 250,
  });

  const [adminUsers, setAdminUsers] = useState(["User 1", "User 2"]);
  const [smsEmailTemplate, setSmsEmailTemplate] = useState({
    sms: "Default SMS template",
    email: "Default Email template",
  });

  const handleServicePricingChange = (e, service) => {
    setServicePricing({ ...servicePricing, [service]: e.target.value });
  };

  const handleAdminUserChange = (e, index) => {
    const updatedUsers = [...adminUsers];
    updatedUsers[index] = e.target.value;
    setAdminUsers(updatedUsers);
  };

  const handleTemplateChange = (e, type) => {
    setSmsEmailTemplate({ ...smsEmailTemplate, [type]: e.target.value });
  };

  const handleSaveChanges = () => {
    alert("Changes saved successfully!");
    // You can add API calls or state management actions here
  };

  return (
    <div className="container-flud py-5 ">
      <h2 className="mb-4">Settings Panel</h2>

      {/* Pricing Section */}
      <Card className="mb-4">
        <Card.Header>Change Pricing for Services</Card.Header>
        <Card.Body>
          <Row>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Service 1 Pricing</Form.Label>
                <Form.Control
                  type="number"
                  value={servicePricing.service1}
                  onChange={(e) => handleServicePricingChange(e, "service1")}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Service 2 Pricing</Form.Label>
                <Form.Control
                  type="number"
                  value={servicePricing.service2}
                  onChange={(e) => handleServicePricingChange(e, "service2")}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Both Services Pricing</Form.Label>
                <Form.Control
                  type="number"
                  value={servicePricing.both}
                  onChange={(e) => handleServicePricingChange(e, "both")}
                />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Admin Users Section */}
      <Card className="mb-4">
        <Card.Header>Manage Admin Users</Card.Header>
        <Card.Body>
          {adminUsers.map((user, index) => (
            <Row key={index} className="mb-3">
              <Col md={8}>
                <Form.Group>
                  <Form.Label>Admin User {index + 1}</Form.Label>
                  <Form.Control
                    type="text"
                    value={user}
                    onChange={(e) => handleAdminUserChange(e, index)}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Button
                  variant="danger"
                  onClick={() => {
                    const updatedUsers = adminUsers.filter((_, i) => i !== index);
                    setAdminUsers(updatedUsers);
                  }}
                  style={{ marginTop: "30px" }}
                >
                  Delete
                </Button>
              </Col>
            </Row>
          ))}
          <Button
            variant="danger"
            onClick={() => setAdminUsers([...adminUsers, "New Admin User"])}
          >
            Add Admin User
          </Button>
        </Card.Body>
      </Card>

      {/* SMS/Email Templates Section */}
      <Card className="mb-4">
        <Card.Header>Edit SMS / Email Templates</Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>SMS Template</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={smsEmailTemplate.sms}
                  onChange={(e) => handleTemplateChange(e, "sms")}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Email Template</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={smsEmailTemplate.email}
                  onChange={(e) => handleTemplateChange(e, "email")}
                />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Save Changes Button */}
      <Button variant="primary" onClick={handleSaveChanges}>
        Save Changes
      </Button>
    </div>
  );
};

export default Settings;
