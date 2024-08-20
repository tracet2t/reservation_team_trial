// eslint-disable-next-line no-unused-vars
import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
// import Logo from "./Forms-pana.svg";

const CreateUser = () => {
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
          <Form>
            <Row className="mb-3">
              <Form.Group
                as={Col}
                xs={12}
                md={6}
                className="mb-3"
                controlId="formGridTitle"
              >
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title" />
              </Form.Group>

              <Form.Group as={Col} xs={12} md={6} controlId="formGridDueDate">
                <Form.Label>Due Date</Form.Label>
                <Form.Control type="date" />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridPriority" className="mb-3">
                <Form.Label>Priority (optional)</Form.Label>
                <Form.Select>
                  <option value="">Select Priority</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} xs={12} controlId="formGridDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Enter description"
                />
              </Form.Group>
            </Row>
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