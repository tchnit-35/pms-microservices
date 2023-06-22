import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";

import google from "../images/google.png";
import github from "../images/github.png";
import facebook from "../images/facebook.png";

import { Link } from "react-router-dom";

import AuthLink from "../components/auth_links/AuthLink";

function BasicExample() {
  return (
    <section>
      <div className="wave wave1"></div> <div className="wave wave2"></div>
      <div className="wave wave3"></div>
      <div className="wave wave2"></div>
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <Container className="my-container p-4">
          <div className="text-center mb-4">
            <h3 className="mb-2">TaskAID</h3>
            <p>log into continue</p>
          </div>
          <div className="mb-2">
            <Row>
              <Col className="d-flex align-items-center my-col">
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="email" placeholder="Enter your email" className="inp" />
                  </Form.Group>
                  <Form.Group className="mb-1" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder=" Enter your password" />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    className="form-control mt-3 mb-4 btn-custom"
                  >
                    Sign up
                  </Button>
                </Form>
              </Col>
              <Col className="d-flex justify-content-center align-items-center my-col2">
                <Stack className="d-flex justify-content-center align-items-center">
                  <div>
                    <AuthLink to="/" icon={google} text="Continue with Google" className="auth" />
                    <AuthLink to="/" icon={github} text="Continue with Github" />
                    <AuthLink to="/" icon={facebook} text="Signup with Facebook" />
                  </div>
                </Stack>
              </Col>
            </Row>
          </div>
          <div style={{ borderBottom: "1px solid #ccc", marginBottom: "1rem" }}></div>
          <div className="d-flex justify-content-center">
            <Link to="/Signup" className="signup-link">Don't have an account? sign up</Link>
          </div>
        </Container>
      </div>
    </section>
  );
}

export default BasicExample;
