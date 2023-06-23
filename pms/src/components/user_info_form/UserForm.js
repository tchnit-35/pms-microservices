import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";  
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserForm.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import axios from "axios";

const UserForm = ({ to, icon, text }) => {
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/auth/register", {
        firstname: firstName,
        lastname: lastName,
        email,
        password,
      });

      // Handle the successful registration (e.g., show a success message, redirect to another page)

      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');

      history.push("/Confirm");
      console.log("Registration successful");
      console.log(response.data);

    } catch (error) {

      // Handle the registration error (e.g., show an error message)
      console.log("Registration error:", error.message);
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        {/* First Name Input */}

        <Form.Group className="mb-0" controlId="formBasicFirstName">
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

        <Form.Group className="mb-0" controlId="formBasicLastName">
          <Form.Control
            className="form-Control"
            type="text"
            placeholder="Enter your surname"
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

        
          <Button variant="primary" type="submit" className="form-control mt-3 mb-4 btn-custom">
            Sign up
          </Button>
        
      </Form>
    </div>
  );
};

export default UserForm;
