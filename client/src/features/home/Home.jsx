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
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, fetchItems } from "../create_todo/CreateTodoSlice";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [editedTask, setEditedTask] = useState({});
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.todos);
  const status = useSelector((state) => state.todos.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchItems());
    }
  }, [status, dispatch]);

  const handleEdit = (task) => {
    setCurrentTask(task);
    setEditedTask({ ...task });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentTask(null);
  };

  const handleDelete = (id) => {
    console.log("delete id", id)
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask({ ...editedTask, [name]: value });
  };

  const handleSaveChanges = () => {
    // Implement saving changes logic here
    handleCloseModal();
  };

  return (
    <Container>
      <Row>
        <Col md={5}>
          <Form>
            <Form.Group className="mb-3" controlId="search">
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
          {todos.map((t, index) => (
            <tr key={t.id}>
              <td>{++index}</td>
              <td className="text-nowrap">{t.title}</td>
              <td className="text-nowrap">{t.description}</td>
              <td className="text-nowrap">{t.dueDate}</td>
              <td className="text-nowrap">{t.priority}</td>
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
          ))}
        </tbody>
      </Table>

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
