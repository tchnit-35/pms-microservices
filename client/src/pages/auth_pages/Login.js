import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";

import google from "../../images/google.png";
import github from "../../images/github.png";
import facebook from "../../images/facebook.png";
import logo from "../../images/logo.png";

import axios from "axios";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

import AuthLink from "../../components/auth_links/AuthLink";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled in

    if (!email) {
      setEmailError("Please enter an email address");
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Please enter your password");
    } else {
      setPasswordError("");
    }

    if (email && password) {
      try {
        const response = await axios.post("http://localhost:4000/auth/login", {
          email,
          password,
        });

        // Handle the successful login
        const userId = response.data.userId;
        document.cookie = `userId=${userId}; path=/HomePage`;

        setEmail("");
        setPassword("");

       // console.log("Login successful");
        //console.log(response.data);

        localStorage.setItem("token", response.data.token);

        navigate("/HomePage");
      } catch (error) {
        // Handle the registration error
        console.log("Registration error:", error.message);
        setError("Email or password is incorrect");
      }
    }
  };

  return (
    <section>
      <div className="wave wave1"></div> <div className="wave wave2"></div>
      <div className="wave wave3"></div>
      <div className="wave wave2"></div>
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <Container className="my-container p-4">
          <div className="text-center mb-4">
            <img src={logo} alt="logo" className="logo" />
          </div>
          <div className="mb-2">
            <Row>
              <Col className="d-flex align-items-center my-col">
                <Form onSubmit={handleSubmit}>
                  {/*email field*/}

                  <Form.Group className="" controlId="formBasicEmail">
                    <Form.Control
                      type="email"
                      placeholder="Enter your email"
                      className="inp"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  {/* email Error */}
                  {EmailError && (
                    <p className="error-msg mb-1">
                      <FontAwesomeIcon icon={faCircleExclamation} /> {EmailError}
                    </p>
                  )}

                  <br />

                  {/*password field*/}

                  <Form.Group className="mb-1" controlId="formBasicPassword">
                    <Form.Control
                      type="password"
                      placeholder=" Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  {/* Password Error */}

                  {PasswordError && (
                    <p className="error-msg mb-1">
                      <FontAwesomeIcon icon={faCircleExclamation} /> {PasswordError}
                    </p>
                  )}

                  <Button
                    variant="primary"
                    type="submit"
                    className="form-control mt-3 mb-3 btn-custom"
                  >
                    Sign In 
                  </Button>

                  {/* Error */}

                  {error && (
                    <p className="error-msg2 text-center">
                      <FontAwesomeIcon icon={faCircleExclamation} /> {error}
                    </p>
                  )}
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
            <Link to="/Signup" className="signup-link">
              Don't have an account? sign up
            </Link>
          </div>
        </Container>
      </div>
    </section>
  );
}

export default Login;
