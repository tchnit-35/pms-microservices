import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";

import { Link } from "react-router-dom";

import AuthNavBar from "../components/auth_navbar/AuthNavBar";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faGithub,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";

function Login() {
  return (
    <>
      <AuthNavBar />
      <div className="p-4">
        <Container className="p-4 d-flex flex-column align-items-center custom-container">
          <div className="text-center my-text mb-6">
            <h1 className="txt">You're one click away from less busywork</h1>
          </div>
          <div>
            <Button variant="primary"  className="d-flex align-items-center ctm-btn">
              <div>
                <FontAwesomeIcon icon={faGoogle} size="lg" className="mr-2" />
              </div>
              <span className="flex-grow-1 txt-2">Sign up with your Google work account</span>
            </Button>
            <div className=" vh-100 d-flex justify-content-center align-items-center">
            <p className="alt">OR</p>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Login;
