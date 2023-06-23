import "bootstrap/dist/css/bootstrap.min.css";
import "./LandingPage.css";
import { Link } from "react-router-dom";

import Container from "react-bootstrap/esm/Container";
import logo from "../images/logo.png"

function LandingPage() {
  return (
    <section className="bg">
      <Container className="d-flex min-vh-100 justify-content-center align-items-center">
        <div className="content p-6 d-flex flex-column align-items-center">
        <img src={logo} alt="logo"  className="logo mb-5" />
          <p className="text-center mb-5 my-text">Have your tasks, team and tools together at one place</p>
          <div>
          <span className="u-t">New User</span>
          <Link className="ctm-link" to="/Signup">Signup</Link>
          </div>
          <div>
          <span className="u-t">Old user</span>
          <Link className="ctm-link" to="/Login">Login</Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default LandingPage;
