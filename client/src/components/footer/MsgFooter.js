import "./MsgFooter.css";

import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright, faUserPlus, faClone, faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";


function MsgFooter() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [email,setInput] = useState("")
  const token = localStorage.getItem("token");

//   useEffect(()=>{  
//     console.log(token)
//       axios
//       .post(`http://localhost:9000/user/search`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => console.log(response.data));
//   },[])

  
// const handleChange =(value)=>{
//   setInput(value)
// }


  return (
    <>
      <div className="custom-footer">
        <div className="me-auto copy-right">
          <FontAwesomeIcon icon={faCopyright} style={{ color: "#000000" }} size="xs" />
          <span>TaskId v1.0.0</span>
        </div>

        <div className="invite-user" onClick={handleShow}>
          <FontAwesomeIcon
            icon={faUserPlus}
            style={{ color: "#ffffff" }}
            size="xl"
            className="me-1"
          />
          <span>Invite New Member</span>
        </div>

        <Modal show={show} onHide={handleClose} centered dialogClassName="modal-50w">
          <Modal.Header closeButton className="custom-title">
            <Modal.Title className="cf">Invite New colleagues</Modal.Title>
          </Modal.Header>
          <Modal.Body className="custom-modal-body">
            <Form>
              <Form.Group className="modal-invite-user mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value = {email}
                  
                  className="modal-custom-input me-3 mb-2"
                  autoFocus
                />
                <div className="invite-more">
                  <FontAwesomeIcon icon={faPlus} size="2xs" />
                  <span>Add to list</span>
                </div>
              </Form.Group>

              <div class="position-relative">
                <Dropdown className="position-absolute top-0 end-0">
                  <Dropdown.Toggle
                    variant="success"
                    id="dropdown-basic"
                    className="custom-dropdown"
                  >
                    Select Project
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Project 1</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Project 2</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Project 3</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Form>
          </Modal.Body>
          <Modal.Footer className="custom-modal-footer">
            <div className="me-auto copy">
              <FontAwesomeIcon icon={faClone} />
              <span>Copy link</span>
            </div>
            <Button variant="primary" className="custom-modal-btn" onClick={handleClose}>
              Send link
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default MsgFooter;
