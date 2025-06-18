import React, { useState } from "react";
import { Card, Table, Button, Modal, Form, InputGroup, Alert } from "react-bootstrap";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

const TvChagoServices = () => {
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Service One",
      price: 60,
      duration: "12 months",
      description: "",
      quantity: 0
    },
    {
      id: 2,
      name: "Service Two",
      price: 60,
      duration: "12 months",
      description: "",
      quantity: 0
    },
    {
      id: 3,
      name: "Both Services",
      price: 100,
      duration: "12 months",
      description: "",
      quantity: 0
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [currentService, setCurrentService] = useState({
    name: "",
    price: 0,
    duration: "",
    description: ""
  });

  const handleEditService = (service) => {
    setCurrentService(service);
    setShowEditModal(true);
  };

  const handleAddService = () => {
    setCurrentService({
      name: "",
      price: 0,
      duration: "",
      description: ""
    });
    setShowAddModal(true);
  };

  const handleDeleteService = (id) => {
    if (window.confirm("Are you sure you want to delete this service?")) {
      setServices(services.filter(service => service.id !== id));
      setAlertMessage("Service deleted successfully!");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const handleSaveService = () => {
    if (!currentService.name || !currentService.price || !currentService.duration) {
      setAlertMessage("Please fill in all required fields");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    if (showEditModal) {
      setServices(services.map(service => 
        service.id === currentService.id ? currentService : service
      ));
      setShowEditModal(false);
      setAlertMessage("Service updated successfully!");
    } else {
      const newId = Math.max(...services.map(s => s.id), 0) + 1;
      setServices([...services, { ...currentService, id: newId, quantity: 0 }]);
      setShowAddModal(false);
      setAlertMessage("Service added successfully!");
    }
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentService({
      ...currentService,
      [name]: name === "price" ? parseFloat(value) || 0 : value
    });
  };

  const calculateSubtotal = (price, quantity) => {
    return (price * quantity).toFixed(2);
  };

  return (
    <div className="container py-4">
      {showAlert && (
        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible className="mb-4">
          {alertMessage}
        </Alert>
      )}

      <Card className="shadow-sm">
        <Card.Header className="bg-light d-flex justify-content-between align-items-center">
          <div>
            <h3>TV Chago Premium Services</h3>
            <p className="mb-0">Manage your services below</p>
          </div>
          <Button variant="primary" onClick={handleAddService}>
            <FaPlus className="me-1" /> Add Service
          </Button>
        </Card.Header>

        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Service</th>
                <th>Price</th>
                <th>Duration</th>
              
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map(service => (
                <tr key={service.id}>
                  <td>{service.name}</td>
                  <td>£{service.price.toFixed(2)}</td>
                  <td>{service.duration}</td>
                 
                  
                  <td>
                    <div className="d-flex gap-2">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleEditService(service)}
                        className="bg-danger text-light"
                        title="Edit"
                      >
                        <FaEdit />
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDeleteService(service.id)}
                        className="text-light bg-danger"
                        title="Delete"
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Add Service Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Service Name*</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={currentService.name}
                onChange={handleInputChange}
                placeholder="Enter service name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price*</Form.Label>
              <InputGroup>
                <InputGroup.Text>£</InputGroup.Text>
                <Form.Control
                  type="number"
                  name="price"
                  min="0"
                  step="0.01"
                  value={currentService.price}
                  onChange={handleInputChange}
                  placeholder="Enter price"
                  required
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Duration*</Form.Label>
              <Form.Control
                type="text"
                name="duration"
                value={currentService.duration}
                onChange={handleInputChange}
                placeholder="e.g. 12 months"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={currentService.description}
                onChange={handleInputChange}
                placeholder="Service description (optional)"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveService}>
            Add Service
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Service Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Service</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Service Name*</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={currentService.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price*</Form.Label>
              <InputGroup>
                <InputGroup.Text>£</InputGroup.Text>
                <Form.Control
                  type="number"
                  name="price"
                  min="0"
                  step="0.01"
                  value={currentService.price}
                  onChange={handleInputChange}
                  required
                />
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Duration*</Form.Label>
              <Form.Control
                type="text"
                name="duration"
                value={currentService.duration}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={currentService.description}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveService}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TvChagoServices;