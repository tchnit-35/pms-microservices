import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";


import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faEnvelope,
  faHouseChimney,
  faGrip,
  faUser,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";

function NavigationBar() {
    return (
      <Navbar
        bg="light"
        expand="lg"
        className="custom-navbar p-4"
        style={{ maxHeight: "30px" }}
      >
        <Container fluid style={{ maxHeight: "30px" }}>
          <Navbar.Brand href="#" className="p-4">
            <FontAwesomeIcon
              icon={faBars}
              style={{ color: "#ffffff" }}
              size="sm"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#action1" className="me-4">
                <FontAwesomeIcon icon={faEnvelope} style={{ color: "#ffffff" }} size="lg"/>
              </Nav.Link>
              <Nav.Link href="#action2" className="me-3">
                <FontAwesomeIcon
                  icon={faHouseChimney}
                  style={{ color: "#ffffff" }}
                  size="lg"
                />
              </Nav.Link>
            </Nav>
            <Form className="d-flex me-3">
              <Form.Control type="search" placeholder="Search" className="custon-imput" aria-label="Search" />
            </Form>
            <Nav.Link href="#action3">
              <FontAwesomeIcon
                icon={faGrip}
                style={{ color: "#ffffff" }}
                size="xl"
                className="me-4"
              />
            </Nav.Link>
            <Nav.Link href="#action4">
            <div className="aid me-4">
            <FontAwesomeIcon
                icon={faQuestion}
                style={{ color: "#12664F" }}
                size="xs"
              />
            </div>
            </Nav.Link>
            <Nav.Link href="#action5">
            <div className="profile">
            <FontAwesomeIcon
                icon={faUser}
                style={{ color: "#ffffff" }}
                size="sm"
              />
            </div>
            </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
  

  export default NavigationBar;