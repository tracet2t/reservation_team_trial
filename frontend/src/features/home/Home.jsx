// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItem,
  fetchItems,
  updateItem,
} from "../create_todo/CreateTodoSlice";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Badge } from "react-bootstrap";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [editedTask, setEditedTask] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const status = useSelector((state) => state.todos.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchItems());
    }
  }, [status, dispatch]);

  const calculateRemainingDays = (dueDate, isCompleted) => {
    if (isCompleted == 1) return "N/A";
    if (!dueDate) return "N/A";

    const due = new Date(dueDate);
    const now = new Date();
    const timeDiff = due - now;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    return daysDiff > 0 ? daysDiff : "Past due";
  };

  const handleEdit = (task) => {
    setCurrentTask(task);
    setEditedTask({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "", // Format date as YYYY-MM-DD
      priority: task.priority,
    });
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
    if (currentTask) {
      dispatch(updateItem({ ...currentTask, ...editedTask })).then(() => {
        if (status === "succeeded") {
          toast.success("Updated successfully...", { theme: "colored" });
          handleCloseModal();
        }
      });
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteItem(id)).then(() => {
          if (status === "succeeded") {
            toast.success("Deleted successfully...", { theme: "colored" });
          }
        });
      }
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTodos = todos.filter(
    (t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.dueDate && t.dueDate.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <Container>
      <Row>
        <Col md={5}>
          <Form>
            <Form.Group className="mb-3" controlId="search">
              <Form.Control
                type="text"
                placeholder="Search...."
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </Form.Group>
          </Form>
        </Col>
        <Col md={7} className="text-end">
          <Link to="/create-user" className="btn btn-primary">
            Add Category
          </Link>
        </Col>
      </Row>
      <Table striped bordered hover responsive className="align-middle">
        <thead>
          <tr>
            <th>#</th>
            <th className="text-nowrap">Title</th>
            <th className="text-nowrap">Description</th>
            <th className="text-nowrap">Due Date</th>
            <th className="text-nowrap">Priority</th>
            <th className="text-nowrap">Is Completed</th>
            <th className="text-nowrap">Remaining Days</th> {/* New Column */}
            <th className="text-nowrap">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTodos.length > 0 ? (
            filteredTodos.map((t, index) => (
              <tr key={t.id}>
                <td>{index + 1}</td>
                <td className="text-nowrap">{t.title}</td>
                <td className="text-nowrap">{t.description}</td>
                <td className="text-nowrap">
                  {t.dueDate ? t.dueDate.slice(0, 10) : ""}
                </td>
                <td className="text-nowrap">{t.priority}</td>
                <td className="text-nowrap">
                  {t.isCompleted == 1 ? (
                    <Badge bg="success">Complete</Badge>
                  ) : (
                    <Badge bg="warning" text="dark">
                      Not Complete
                    </Badge>
                  )}
                </td>
                <td className="text-nowrap">
                  {calculateRemainingDays(t.dueDate, t.isCompleted)}
                </td>{" "}
                {/* New Data */}
                <td className="text-nowrap">
                  <Button
                    variant="warning"
                    onClick={() => handleEdit(t)}
                    className="me-2"
                  >
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(t.id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">
                <Alert variant="warning">No data found</Alert>
              </td>
            </tr>
          )}
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
                  name="title"
                  value={editedTask.title || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={editedTask.description || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  type="date"
                  name="dueDate"
                  value={editedTask.dueDate || ""}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Priority</Form.Label>
                <Form.Control
                  type="text"
                  name="priority"
                  value={editedTask.priority || ""}
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
