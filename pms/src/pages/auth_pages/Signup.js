import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css";

import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";

import google from "../../images/google.png"
import github from "../../images/github.png"
import facebook from "../../images/facebook.png"
import logo from "../../images/logo.png"

import { Link } from "react-router-dom";

import AuthLink from "../../components/auth_links/AuthLink";
import UserForm from "../../components/user_info_form/UserForm";

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
          <img src={logo} alt="logo"  className="logo" />
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
                      to="/Confirm"
                      text="Continue with Google"
                      icon={google}
                      endpoint="/auth/google"
                    />
                    <AuthLink
                      to="/Confirm"
                      text="Continue with Github"
                      icon={github}
                      endpoint="/auth/github"
                    />
                    <AuthLink
                      to="/Confirm"
                      text="Signup with Facebook"
                      icon={facebook}
                      endpoint="/auth/facebook"
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
            <Link to="/Login" className="login-link">Already have an account? Log in</Link>
          </div>
        </Container>
      </div>
    </section>
  );
}

export default Signup;
