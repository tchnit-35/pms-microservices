import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

import axios from "axios";

import "./CreateTask.css";

function CreateTask(props) {
  const { projectId } = useParams();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    task_name: "",
  });

  const handleCreatetask = () => {
    const taskData = {
      name: formData.task_name,
    };

    axios
      .post(`http://localhost:3003/projects/${projectId}`, taskData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        // TODO: handle successful response
      })
      .catch((error) => {
        console.error(error);
        // TODO: handle error
      });
  };

  const handleCreateAndClose = () => {
    handleCreatetask();
    props.handleClose();
  };

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        dialogClassName="modal-40w"
        className="create-task-modal"
      >
        <Modal.Header className="custom-task-modal-header" closeButton>
          <Modal.Title className="custom-modal-title">Create task</Modal.Title>
        </Modal.Header>
        <Modal.Body className="custom-task-modal-body">
          <Form className="custom-task-modal-form">
            <Form.Group className="mb-3 text-center" controlId="exampleForm.ControlInput1">
              <Form.Label className="the-head text-center">Task name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task name "
                className="custom-input"
                name="task_name"
                value={formData.task_name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    task_name: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Button variant="primary" className="ctm-task-btn" onClick={handleCreateAndClose}>
              Create task
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer className="custom-task-modal-footer"></Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateTask;
