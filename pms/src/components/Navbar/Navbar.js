import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

import Container from "react-bootstrap/Container";
import { Form, InputGroup, FormControl } from "react-bootstrap";
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
  faSearch,
} from "@fortawesome/free-solid-svg-icons";

function NavigationBar({ handleClick }) {
  return (
    <Navbar bg="light" expand="lg" className="custom-navbar p-2" style={{ maxHeight: "70px" }}>
      <Container fluid style={{ maxHeight: "30px" }}>
        <Navbar.Brand className="custom-bars" onClick={handleClick}>
          <FontAwesomeIcon icon={faBars} style={{ color: "#ffffff" }} />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
            <Nav.Link href="#action1" className="me-4">
              <FontAwesomeIcon icon={faEnvelope} style={{ color: "#ffffff" }} size="lg" />
            </Nav.Link>

            <Nav.Link href="#action2" className="me-3">
              <FontAwesomeIcon icon={faHouseChimney} style={{ color: "#ffffff" }} size="lg" />
            </Nav.Link>
          </Nav>

          <Form className="d-flex me-3">
            <InputGroup>
            <InputGroup.Text className="custon-icon">
                <FontAwesomeIcon icon={faSearch} style={{ color: "#b9c0be" }} size="sm" />
              </InputGroup.Text>
              <FormControl type="search" placeholder="Search" className="custon-input" />
            </InputGroup>
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
              <FontAwesomeIcon icon={faQuestion} style={{ color: "#12664F" }} size="xs" />
            </div>
          </Nav.Link>
          <Nav.Link href="#action5">
            <div className="profile">
              <FontAwesomeIcon icon={faUser} style={{ color: "#ffffff" }} size="sm" />
            </div>
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
