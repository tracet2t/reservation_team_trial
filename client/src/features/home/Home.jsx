// eslint-disable-next-line no-unused-vars
import React from "react";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

const Home = () => {
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
            <th>Title</th>
            <th>Description </th>
            <th>Due Date</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
};

export default Home;
