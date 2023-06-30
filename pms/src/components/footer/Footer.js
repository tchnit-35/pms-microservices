import "./Footer.css";

import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from 'react-bootstrap/Form';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright, faUserPlus } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="custom-footer">
        <div className="me-auto copy-right">
          <FontAwesomeIcon icon={faCopyright} style={{ color: "#ffffff" }} size="xs" />
          <span>TaskId v1.0.0</span>
        </div>

        <div className="invite-user" onClick={handleShow}>
          <FontAwesomeIcon
            icon={faUserPlus}
            style={{ color: "#ffffff" }}
            size="xl"
            className="me-1"
          />
          <span>Invite New User</span>
        </div>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Invite New colleagues</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Invite 
          </Button>
        </Modal.Footer>
      </Modal>
      </div>
    </>
  );
}

export default Footer;
