import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserForm.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

const UserForm = ({ to, icon, text }) => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [FirstNameError, setFirstNameError] = useState("");
  const [LastNameError, setLastNameError] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const [error, setError] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled in
    if (!firstName) {
      setFirstNameError("Please enter your first name");
    } else {
      setFirstNameError("");
    }

    if (!lastName) {
      setLastNameError("Please enter your last name");
    } else {
      setLastNameError("");
    }

    if (!email) {
      setEmailError("Please enter an email address");
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Please enter a password");
    } else {
      setPasswordError("");
    }

    if (firstName && lastName && email && password) {
      try {
        const response = await axios.post("http://localhost:4000/auth/register", {
          firstname: firstName,
          lastname: lastName,
          email,
          password,
        });

        // Handle the successful registration

        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");

        navigate("/LoginAfterRegister");
        
      } catch (error) {

        // Handle the registration error
        console.log("Registration error:", error.message);
        setError("This user already exist");
      }
    }
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>

       {/* Error */}

       {error && (
                    <p className="error-msg2 text-center mb-2">
                      <FontAwesomeIcon icon={faCircleExclamation} /> {error}
                    </p>
                  )}

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

        {/* First Name Error */}
        {FirstNameError && (
          <p className="error-msg">
            <FontAwesomeIcon icon={faCircleExclamation} /> {FirstNameError}
          </p>
        )}

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

        {/* Last Name Error */}
        {LastNameError && (
          <p className="error-msg">
            <FontAwesomeIcon icon={faCircleExclamation} /> {LastNameError}
          </p>
        )}

        <br className="break" />

        {/* email Input */}

        <Form.Group className="" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        {/* email Error */}
        {EmailError && (
        <p className="error-msg">
        <FontAwesomeIcon icon={faCircleExclamation} /> {EmailError}
        </p>
        )}

        <br />

        {/* Password Input */}

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

        {/* Submit button */}

        <Button variant="primary" type="submit" className="form-control mt-3 mb-4 btn-custom">
          Sign up
        </Button>
      </Form>
    </div>
  );
};

export default UserForm;
