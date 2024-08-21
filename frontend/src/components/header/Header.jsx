// eslint-disable-next-line no-unused-vars
import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import Logo from "./m-logo.png";

const Header = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="shadow mb-3">
      <Container>
        <Navbar.Brand href="#">
          <img
            src={Logo}
            alt="Logo"
            width="45"
            height="35"
            className="d-inline-block align-top"
          />
          <span className="text-light fw-bold font-monospace">E-education</span>
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Item>
              <Nav.Link className="text-light fw-bold font-monospace">
                <i className="fa fa-user-circle-o" aria-hidden="true"></i> A. M.
                Asky
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
