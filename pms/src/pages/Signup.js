import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";

import {
  faGoogle,
  faGithub,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

import { Link } from "react-router-dom";

import AuthLink from "../components/auth_links/AuthLink";

function BasicExample() {
  return (
    <section>
      <div className="wave wave1"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>
      <div className="wave wave2"></div>
      <div className="min-vh-100 d-flex justify-content-center align-items-center">
        <Container className="my-container">
          <div className="text-center">
            <h3 className="mb-4">TaskAID</h3>
            <p>sign up to continue</p>
          </div>
        </Container>
      </div>
    </section>
  );
}

export default BasicExample;
