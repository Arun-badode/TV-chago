import React, { useState } from "react";
import { Button, Card, Form, InputGroup, Table, Alert } from "react-bootstrap";
import { FaSave, FaBox, FaHome, FaClock, FaPercentage } from "react-icons/fa";

const Settings = () => {
  const [settings, setSettings] = useState({
    requireFileUpload: false,
    askForAddress: false,
    autoDeleteEnabled: false,
    autoDeleteDays: 30,
    defaultDiscount: 0
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleSettingChange = (name, value) => {
    setSettings({
      ...settings,
      [name]: value
    });
  };

  const handleSaveSettings = () => {
    console.log("Saving settings:", settings);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
<>
    <h4 className="text-dark mt-3">Settings</h4>
    <Card className="shadow-sm mt-4">
      <Card.Header className="bg-light">
        <h5 className="mb-0">System Settings</h5>
      </Card.Header>
      <Card.Body>
        {showSuccess && (
          <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
            Settings saved successfully!
          </Alert>
        )}

        <Form.Group className="mb-3">
          <Form.Check
            type="switch"
            id="require-file-upload"
            label={
              <>
                <FaBox className="me-2" />
                Require file upload?
              </>
            }
            checked={settings.requireFileUpload}
            onChange={(e) => handleSettingChange("requireFileUpload", e.target.checked)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            type="switch"
            id="ask-for-address"
            label={
              <>
                <FaHome className="me-2" />
                Ask for address?
              </>
            }
            checked={settings.askForAddress}
            onChange={(e) => handleSettingChange("askForAddress", e.target.checked)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <div className="d-flex align-items-center mb-2">
            <Form.Check
              type="switch"
              id="auto-delete-enabled"
              label={
                <>
                  <FaClock className="me-2" />
                  Auto-delete completed orders
                </>
              }
              checked={settings.autoDeleteEnabled}
              onChange={(e) => handleSettingChange("autoDeleteEnabled", e.target.checked)}
              className="me-2"
            />
          </div>
          {settings.autoDeleteEnabled && (
            <InputGroup>
              <Form.Control
                type="number"
                min="1"
                value={settings.autoDeleteDays}
                onChange={(e) => handleSettingChange("autoDeleteDays", parseInt(e.target.value) || 0)}
              />
              <InputGroup.Text>days after completion</InputGroup.Text>
            </InputGroup>
          )}
        </Form.Group>

        <Form.Group className="mb-4">
          <InputGroup>
            <InputGroup.Text>
              <FaPercentage className="me-2" />
              Default staff discount
            </InputGroup.Text>
            <Form.Control
              type="number"
              min="0"
              max="100"
              value={settings.defaultDiscount}
              onChange={(e) => handleSettingChange("defaultDiscount", Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
            />
            <InputGroup.Text>%</InputGroup.Text>
          </InputGroup>
        </Form.Group>

        <Table striped bordered hover className="mb-4">
          <tbody>
            <tr>
              <td><FaBox /> Require file upload</td>
              <td>{settings.requireFileUpload ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td><FaHome /> Ask for address</td>
              <td>{settings.askForAddress ? "Yes" : "No"}</td>
            </tr>
            <tr>
              <td><FaClock /> Auto-delete orders</td>
              <td>
                {settings.autoDeleteEnabled 
                  ? `After ${settings.autoDeleteDays} days` 
                  : "Disabled"}
              </td>
            </tr>
            <tr>
              <td><FaPercentage /> Default staff discount</td>
              <td>{settings.defaultDiscount}%</td>
            </tr>
          </tbody>
        </Table>

        <div className="text-center">
          <Button 
            variant="primary" 
            onClick={handleSaveSettings}
            className="px-5"
          >
            <FaSave className="me-2" /> Save Settings
          </Button>
        </div>
      </Card.Body>
    </Card>
    </>
  );
};

export default Settings;