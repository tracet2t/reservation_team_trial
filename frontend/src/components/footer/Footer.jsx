// eslint-disable-next-line no-unused-vars
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import facebookLogo from "./images/face.png";
import linked from "./images/Link.png";
import whatsapp from "./images/whatsapp.png";
import youtube from "./images/Youtube.png";
import "./Footer.css";

const Footer = () => {
  return (
    <div
      className="bg-dark bg-gradient text-white mt-5"
      style={{ minHeight: "150px" }}
    >
      <Container>
        <Row className="pt-4 d-flex justify-content-between">
          <Col sm={12} md={3} className="mb-3">
            <h1 className="pb-2" style={{ fontSize: "1.1rem" }}>
              ABOUT US
            </h1>
            <hr width="60px" style={{ marginTop: "15px" }} />
            <p
              style={{
                fontSize: "0.9rem",
                textAlign: "justify",
                fontWeight: "400",
              }}
            >
              Energetic, hardworking, innovative and ambitious person with a
              great passion for the software engineering field.
            </p>
          </Col>
          <Col sm={12} md={3} className="mb-3">
            <h1 className="pb-2" style={{ fontSize: "1.1rem" }}>
              PROJECTS
            </h1>
            <hr width="60px" style={{ marginTop: "-8px" }} />
            <p
              style={{
                fontSize: "0.9rem",
                textAlign: "justify",
                fontWeight: "400",
              }}
            >
              Pharmacy Management System
            </p>
            <p
              style={{
                fontSize: "0.9rem",
                textAlign: "justify",
                fontWeight: "400",
              }}
            >
              Web Base Of The Particular Institution
            </p>
            <p
              style={{
                fontSize: "0.9rem",
                textAlign: "justify",
                fontWeight: "400",
              }}
            >
              Sri Lankan NIC Calculator
            </p>
          </Col>
          <Col sm={12} md={3} className="mb-3">
            <h1 className="pb-2" style={{ fontSize: "1.1rem" }}>
              SOCIAL MEDIA
            </h1>
            <hr width="60px" style={{ marginTop: "-8px" }} />
            <div>
              <a
                href="https://www.facebook.com/mohammed.asky.9"
                style={{ marginRight: "5px" }}
              >
                <img src={facebookLogo} alt="Facebook" width="30px" />
              </a>
              <a
                href="https://www.linkedin.com/in/asky-mohammed-02742921b/"
                style={{ marginRight: "5px" }}
              >
                <img src={linked} alt="LinkedIn" width="30px" />
              </a>
              <a href="https://wa.me/" style={{ marginRight: "5px" }}>
                <img src={whatsapp} alt="WhatsApp" width="30px" />
              </a>
              <a
                href="https://www.youtube.com/channel/UC5YJmG0NFNyZaZsvyGcQAWQ"
                style={{ marginRight: "5px" }}
              >
                <img src={youtube} alt="YouTube" width="30px" />
              </a>
            </div>
          </Col>
        </Row>
        <hr />
        <div
          className="pb-3"
          style={{
            fontSize: "0.9rem",
            textAlign: "justify",
            fontWeight: "300",
          }}
        >
          Created By <span className="name">Asky AM</span> | &#169; 2022 All
          rights reserved.
        </div>
      </Container>
    </div>
  );
};

export default Footer;
