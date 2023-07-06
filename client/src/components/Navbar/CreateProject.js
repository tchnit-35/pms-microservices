import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import "../List_view/CreateTask.css"

function CreateProject(props) {
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        dialogClassName="modal-40w"
        className="create-task-modal"
      >
        <Modal.Header className="custom-task-modal-header" closeButton>
          <Modal.Title className="custom-modal-title">Create Project</Modal.Title>
        </Modal.Header>
        <Modal.Body className="custom-task-modal-body">
          <Form className="custom-task-modal-form">
            <Form.Group className="mb-3 text-center" controlId="exampleForm.ControlInput1">
              <Form.Label className="the-head text-center">Project title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Project name "
                className="custom-input"
              />
            </Form.Group>

            <Button variant="primary" className="ctm-task-btn" onClick={props.handleClose}>
            Create Project
          </Button>

          </Form>
          
        </Modal.Body>
        <Modal.Footer className="custom-task-modal-footer">
          
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateProject;
