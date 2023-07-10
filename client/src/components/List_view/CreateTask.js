import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Stack } from "react-bootstrap";

import axios from "axios";

import "./CreateTask.css";

function CreateTask(props) {
  const { projectId } = useParams();
  const [projectTitle, setProjectTitle] = useState(null);
  const [teamMembers, setTeamMembers] = useState([]);

  const token = localStorage.getItem("token");

  {
    /*fetch project name*/
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectResponse = await axios.get(`http://localhost:3002/projects/${projectId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProjectTitle(projectResponse.data.project_title);
  
        const usersResponse = await axios.get(`http://localhost:3002/projects/${projectId}/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTeamMembers(usersResponse.data);
        console.log("Users:", usersResponse.data);

        
        {/*const fetchName = async () => {
          try {
            const userNameResonese = await axios.get("http://localhodt:9000/user/", {
              headers:{
                Authorization: `Bearer${token}`
              }
            });
            // do something with the response
          } catch (error) {
            console.error(error);
            // handle the error
          }
        };*/}

      } catch (error) {
        console.error(error);
      }
    };
  
    fetchData();
  }, [projectId, token]);

  
  

  const [formData, setFormData] = useState({
    task_name: "",
    start_date: "",
    due_date: "",
    description: "",
  });

  const handleCreatetask = () => {
    const taskData = {
      name: formData.task_name,
      startDate: new Date(formData.start_date),
      endDate: new Date(formData.due_date),
      description: formData.description,
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
        dialogClassName="modal-50w"
        className="update-project-modal"
      >
        <Modal.Header className="custom-modal-header" closeButton>
          <Modal.Title className="custom-modal-title">Create Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="custom-modal-form">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="the-h">Task name</Form.Label>
              <Form.Control
                type="text"
                placeholder="name"
                name="task_title"
                className="custom-input"
                value={formData.task_name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    task_name: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Stack direction="horizontal" className="date">
              <span className="the-h me-auto">{projectTitle}</span>

              <Form.Group
                className="modify-date-input mb-3  me-4"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="the-h" value={formData.start_date}>
                  Start date
                </Form.Label>

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

            <Stack direction="horizontal" gap={3} className="mb-3">
              <Form.Select aria-label="Default select example" className="custom-input">
                <option>Assigned to</option>
                {teamMembers.map((user) => (
                  <option key={user.userId} value={user.userId}>
                    {user.userId}
                  </option>
                ))}
              </Form.Select>

              <Form.Select aria-label="Default select example" className="custom-input">
                <option>Dependencies</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Stack>

            <Stack direction="horizontal" gap={3} className="mb-3">
              <Form.Select aria-label="Default select example" className="custom-input">
                <option>Master task</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>

              <Form.Select aria-label="Default select example" className="custom-input">
                <option>Priority</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Stack>

            <Form.Check
              type="checkbox"
              id="checkbox"
              label="To be Approved"
              className="custom-input custom-checkbox ms-auto"
            />
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex align-items-center justify-content-center">
          <Button className="ctm-btn" onClick={handleCreateAndClose}>
            Create project
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateTask;
