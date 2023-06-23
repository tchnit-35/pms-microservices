import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserForm.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { Link } from "react-router-dom";
import axios from "axios";

const UserForm = ({ to, icon, text }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/auth/register", {
        firstname: firstName,
        lastname: lastName,
        email,
        password,
      });

      // Handle the successful registration (e.g., show a success message, redirect to another page)
    } catch (error) {
      // Handle the registration error (e.g., show an error message)
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        {/* First Name Input */}

        <Form.Group className="mb-0" controlId="formBasicEmail">
          <Form.Control
            className="form-Control inp"
            type="text"
            placeholder="Enter your first Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <br />

        {/* Last Name Input */}

        <Form.Group className="mb-0" controlId="formBasicEmail">
          <Form.Control
            className="form-Control"
            type="text"
            placeholder="Enter your last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <br />

        {/* email Input */}

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        {/* Password Input */}

        <Form.Group className="mb-1" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder=" Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {/* Submit button */}

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
