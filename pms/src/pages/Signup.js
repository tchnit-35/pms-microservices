import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css";

import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";

import {
  faGoogle,
  faGithub,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

import { Link } from "react-router-dom";

import AuthLink from "../components/auth_links/AuthLink";
import UserForm from "../components/user_info_form/UserForm";

function Signup() {
  return (
    <section>
      <div className="wave wave1"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>
      <div className="wave wave2"></div>
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <Container className="my-container p-4">
          <div className="text-center mb-4">
            <h3 className="mb-2">TaskAID</h3>
            <p>sign up to continue</p>
          </div>
          <div className="mb-2">
            <Row>
              <Col className="d-flex align-items-center my-col">

              <UserForm />
              
              </Col>
              <Col className="d-flex justify-content-center align-items-center my-col2">
                <Stack className="d-flex justify-content-center align-items-center">
                  <div>
                    <AuthLink
                      to="/"
                      icon={faGoogle}
                      text="Continue with Google"
                      className="auth"
                    />
                    <AuthLink
                      to="/"
                      icon={faGithub}
                      text="Continue with Github"
                    />
                    <AuthLink
                      to="/"
                      icon={faFacebook}
                      text="Signup with Facebook"
                    />
                  </div>
                </Stack>
              </Col>
            </Row>
          </div>
          <div
            style={{ borderBottom: "1px solid #ccc", marginBottom: "1rem" }}
          ></div>
          <div className="d-flex justify-content-center">
            <Link to="/Login">Already have an account? Log in</Link>
          </div>
        </Container>
      </div>
    </section>
  );
}

export default Signup;
