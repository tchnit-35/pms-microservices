import React, { useState, useEffect } from "react";

import { Modal, Form, Button, Stack } from "react-bootstrap";

import axios from "axios";
import { useParams } from "react-router-dom";

import "./CreateProject.css";

function CreateProject(props) {
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    project_title: "",
    start_date: "",
    due_date: "",
    description: "",
  });

  const handleCreateProject = () => {
    const projectData = {
      project_title: formData.project_title,
      startDate: new Date(formData.start_date),
      endDate: new Date(formData.due_date),
      description: formData.description,
    };

    axios
      .post("http://localhost:3002/projects/", projectData, {
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

  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        dialogClassName="modal-50w"
        className="update-project-modal"
      >
        <Modal.Header className="custom-modal-header" closeButton>
          <Modal.Title className="custom-modal-title">Create project</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="custom-modal-form">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="the-h">Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="project title"
                name="project_title"
                className="custom-input"
                value={formData.project_title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    project_title: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Stack direction="horizontal" className="date">
              <Form.Group
                className="modify-date-input mb-3  me-4"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="the-h">Start date</Form.Label>

                <Form.Control
                  type="date"
                  className="custom-input"
                  name="start_date"
                  value={formData.start_date}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      start_date: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group
                className="modify-date-input mb-3 mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="the-h">Due Date</Form.Label>
                <Form.Control
                  type="date"
                  className="custom-input"
                  name="due_date"
                  value={formData.due_date}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      due_date: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Stack>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label className="the-h">Project description</Form.Label>
              <Form.Control
                as="textarea"
                className="custom-input"
                rows={3}
                placeholder="project description"
                name="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex align-items-center justify-content-center">
          <Button className="ctm-btn" onClick={handleCreateProject}>
            Create project
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateProject;
