// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const Home = () => {
  const [task, setNewTask] = useState([
    {
      Title: "Demo Title",
      Description: "Demo Description",
      Due_Date: "2024-10-20",
      Priority: "High",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [editedTask, setEditedTask] = useState({});

  const handleEdit = (task) => {
    setCurrentTask(task);
    setEditedTask({ ...task });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentTask(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleSaveChanges = () => {
    setNewTask(
      task.map((t) => (t.Title === currentTask.Title ? editedTask : t))
    );
    handleCloseModal();
  };

  return (
    <Container>
      <Row>
        <Col md={5}>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control type="text" placeholder="Search...." />
            </Form.Group>
          </Form>
        </Col>
        <Col md={7} className="text-end">
          <Link to="/create-user" className="btn btn-primary">
            Add Category
          </Link>
        </Col>
      </Row>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th className="text-nowrap">Title</th>
            <th className="text-nowrap">Description</th>
            <th className="text-nowrap">Due Date</th>
            <th className="text-nowrap">Priority</th>
            <th className="text-nowrap">Action</th>
          </tr>
        </thead>
        <tbody>
          {task.map((t, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td className="text-nowrap">{t.Title}</td>
              <td className="text-nowrap">{t.Description}</td>
              <td className="text-nowrap">{t.Due_Date}</td>
              <td className="text-nowrap">{t.Priority}</td>
              <td className="text-nowrap">
                <Button
                  variant="warning"
                  onClick={() => handleEdit(t)}
                  className="me-2"
                >
                  Edit
                </Button>
                {/* eslint-disable-next-line no-undef */}
                <Button variant="danger" onClick={() => handleDelete(index)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal Component */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentTask && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="Title"
                  value={editedTask.Title || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="Description"
                  value={editedTask.Description || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  type="date"
                  name="Due_Date"
                  value={editedTask.Due_Date || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Priority</Form.Label>
                <Form.Control
                  type="text"
                  name="Priority"
                  value={editedTask.Priority || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Home;
