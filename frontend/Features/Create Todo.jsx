// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Forms-pana.svg";
import { addItem } from "./CreateTodoSlice";
import { toast } from "react-toastify";

const CreateUser = () => {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleDueDateChange = (e) => setDueDate(e.target.value);
  const handlePriorityChange = (e) => setPriority(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);

  const validateForm = () => {
    const newErrors = {};
    if (!title) newErrors.title = "Title is required";
    if (!dueDate) newErrors.dueDate = "Due date is required";
    if (!priority) newErrors.priority = "Priority is required";
    if (!description) newErrors.description = "Description is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const userData = {
        title,
        dueDate,
        priority,
        description,
      };
  
      try {
        // eslint-disable-next-line no-unused-vars
        const resultAction = await dispatch(addItem(userData)).unwrap(); // Unwrap to handle the resolved or rejected action
        toast.success("User created successfully!");
        // Reset the form fields after submission
        setTitle("");
        setDueDate("");
        setPriority("");
        setDescription("");
        setErrors({});
        // Redirect to home page after a short delay
        setTimeout(() => {
          navigate("/");
        }, 1000); // Adjust the delay as needed
      } catch (error) {
        toast.error(error); // Display the error returned by the thunk
      }
    }
  };
  

  return (
    <Container>
      <Row>
        <Col>
          <p className="h5 fw-bold">Add User</p>
        </Col>
        <Col className="text-end">
          <div className="col text-end">
            <Link to="/" className="btn btn-success">
              <i className="fa fa-chevron-circle-left" aria-hidden="true"></i>{" "}
              Back
            </Link>
          </div>
        </Col>
      </Row>

      <hr />

      <Row>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                xs={12}
                md={6}
                className="mb-3"
                controlId="formGridTitle"
              >
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter title"
                  value={title}
                  onChange={handleTitleChange}
                  isInvalid={!!errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} xs={12} md={6} controlId="formGridDueDate">
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  type="date"
                  value={dueDate}
                  onChange={handleDueDateChange}
                  isInvalid={!!errors.dueDate}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.dueDate}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group
                as={Col}
                controlId="formGridPriority"
                className="mb-3"
              >
                <Form.Label>Priority (optional)</Form.Label>
                <Form.Select
                  value={priority}
                  onChange={handlePriorityChange}
                  isInvalid={!!errors.priority}
                >
                  <option value="">Select Priority</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  {errors.priority}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} xs={12} controlId="formGridDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Enter description"
                  value={description}
                  onChange={handleDescriptionChange}
                  isInvalid={!!errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <button type="submit" className="btn btn-primary">
              Create User
            </button>
          </Form>
        </Col>

        <Col className="text-center p-3 d-none d-md-block">
          <img src={Logo} alt="" className="img-fluid rounded" width="500px" />
        </Col>
      </Row>
    </Container>
  );
};

export default CreateUser;
