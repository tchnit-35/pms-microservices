import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Settings.css";

import NavigationBar from "../../components/Navbar/Navbar";
import SettingsSidebar from "../../components/Navbar/SettingsSidebar";
import Footer from "../../components/footer/Footer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Stack } from "react-bootstrap";

function Settings() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <NavigationBar handleClick={toggleMenu} />
      <SettingsSidebar isOpen={isOpen} />

      <div className="flex-grow-1 settings-container">
        <div className="head mb-4">
          <span>Profile Details</span>
        </div>
        <div className="the-user-detail mb-5">
          <div className="setting-user-img me-4">
            <FontAwesomeIcon icon={faUser} style={{ color: "#FFFFFF" }} size="2xl" />
          </div>
          <div className="user-name-email">
            <span className="user-name mb-3">User Name</span>
            <span className="user-email">useremail@example.com</span>
          </div>
        </div>
        <div>
          <Form className="the-form">
            <Stack direction="horizontal" className="mb-5">
              <Form.Group controlId="formBasicEmail" className="me-5 xxx">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" className="form-custom-input" />
              </Form.Group>

              <Form.Group  controlId="formBasicEmail" className="me-5 xxx">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" className="form-custom-input"/>
              </Form.Group>
            </Stack>

            <Stack direction="horizontal" className="mb-5">
              <Form.Group controlId="formBasicEmail" className="me-5 xxx">
                <Form.Label className="me-4">Company</Form.Label>
                <Form.Control type="text" className="form-custom-input"/>
              </Form.Group>

              <Form.Group  controlId="formBasicEmail" className="me-5 xxx">
                <Form.Label>Job title</Form.Label>
                <Form.Control type="text" className="form-custom-input"/>
              </Form.Group>
            </Stack>
            <Stack direction="horizontal" className="mb-5">
              <Form.Group controlId="formBasicEmail" className="me-5 xxx">
                <Form.Label className="me-4">Country of residence</Form.Label>
                <Form.Control type="text" className="form-custom-input"/>
              </Form.Group>

              <Form.Group  controlId="formBasicEmail" className="me-5 xxx">
                <Form.Label>Phone number</Form.Label>
                <Form.Control type="text" className="form-custom-input"/>
              </Form.Group>
            </Stack>

            <Button variant="primary" type="submit" className="me-auto">
              Submit
            </Button>
          </Form>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Settings;
