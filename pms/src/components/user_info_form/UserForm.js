import "bootstrap/dist/css/bootstrap.min.css";
import "./UserForm.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { Link } from "react-router-dom";

const UserForm = ({ to, icon, text }) => {
  return (
    <div>
      <Form>
        <Form.Group className="mb-0" controlId="formBasicEmail">
          <Form.Control
            className="form-Control inp"
            type="text"
            placeholder="Enter your first Name"
          />
        </Form.Group>
        <br />
        <Form.Group className="mb-0" controlId="formBasicEmail">
          <Form.Control className="form-Control" type="text" placeholder="Enter your last Name" />
        </Form.Group>
        <br />
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="email" placeholder="Enter your email" />
        </Form.Group>
        <Form.Group className="mb-1" controlId="formBasicPassword">
          <Form.Control type="password" placeholder=" Enter your password" />
        </Form.Group>
        <Link to="/CreateWorkspace">
          <Button variant="primary" type="submit" className="form-control mt-3 mb-4 btn-custom">
            Sign up
          </Button>
        </Link>
      </Form>
    </div>
  );
};

export default UserForm;
