import './UpdateProject.css'
import React, { useState, useEffect } from 'react';
import { Modal, Form, Button, Stack } from 'react-bootstrap';
import axios from 'axios';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function UpdateProject(props) {

  const { projectId } = useParams();
  const [project_title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setDueDate] = useState("");
  const [description, setDescription] = useState('');
  const [projectMaster, setProjectMaster] = useState(null);
  const [projectTitle, setProjectTitle] = useState(null);
  const [projectDescription, setProjectDescription] = useState(null);
  const [projectStartDate, setProjectStartDate] = useState(null);
  const [projectEndDate, setProjectEndDate] = useState(null);
  const token = localStorage.getItem("token")

  
  useEffect(() => {
    const fetchProject = async () => {
      try {
        // Replace with your actual token
        const response = await axios.get(`http://localhost:3002/projects/${projectId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProjectMaster(response.data.project_master);
        setProjectTitle(response.data.project_title);
        setProjectDescription(response.data.description);
        setProjectStartDate(response.data.startDate)
        setStartDate(new Date(projectStartDate).toLocaleDateString('en-US').split('/').reverse().join('-'))
        setProjectEndDate(response.data.endDate)

      } catch (error) {
        console.error(error);
      }
    };
    fetchProject();
  }, [projectId]);

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.patch(`http://localhost:3002/projects/${projectId}`, {
        project_title,
        startDate,
        endDate,
        description,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      props.handleClose();
    } catch (error) {
      console.error(error);
    }
  };
 
  console.log(startDate)
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        dialogClassName="modal-50w"
        className="update-project-modal"
      >
        <Modal.Header className="custom-modal-header" closeButton>
          <Modal.Title className="custom-modal-title">Project details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="custom-modal-form">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="the-h">Title</Form.Label>
              <Form.Control
                type="text"
                placeholder={projectTitle}
                className="custom-input"
                value={project_title}
                onChange={handleTitleChange}
              />
            </Form.Group>

            <Stack direction="horizontal" className="date">
              <div className="the-project-owner mb-4">
                <span className="the-h mb-2">Owner</span>
                <div className="d-flex align-items-center">
                  <div className="user-image me-2">
                    <FontAwesomeIcon icon={faUser} style={{ color: '#FFFFFF' }} />
                  </div>
                  <span className="the-user-name">{projectMaster}</span>
                </div>
              </div>

              <Form.Group
                className="modify-date-input mb-3 mx-auto me-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="the-h">Start date</Form.Label>
                <Form.Control
                  type="date"
                  className="custom-input"
                  placeholder="yyyy-MM-dd"
                  value={startDate}
                  onChange={handleStartDateChange}
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
                  value={endDate}
                  onChange={handleDueDateChange}
                />
              </Form.Group>
            </Stack>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label className="the-h">Project description</Form.Label>
              <Form.Control
                as="textarea"
                className="custom-input"
                rows={3}
                placeholder={projectDescription}
                value={description}
                onChange={handleDescriptionChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex align-items-center justify-content-center">
          <Button variant="primary" className="ctm-btn" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateProject;