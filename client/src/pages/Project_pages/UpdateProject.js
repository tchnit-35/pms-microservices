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
  const [description, setDescription] = useState('');
  const [projectMaster, setProjectMaster] = useState(null);
  const [projectTitle, setProjectTitle] = useState(null);
  const [userPermission, setUserPermssion] = useState(null);
  const [projectDescription, setProjectDescription] = useState(null);
  const [projectStartDate, setProjectStartDate] = useState(null);
  const [projectEndDate, setProjectEndDate] = useState(null);
  const token = localStorage.getItem("token")
  const [startDate, setStartDate] = useState(new Date(projectStartDate).toLocaleDateString('en-US').split('/').reverse());
  const [endDate, setDueDate] = useState(new Date(projectEndDate).toLocaleDateString('en-US').split('/').reverse()); 
  
  useEffect(() => {
    const fetchProject = async () => {
      try {
        // Replace with your actual token
        const response = await axios.get(`http://localhost:3002/projects/${projectId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserPermssion(response.data.permission)
        setProjectMaster(response.data.project_master);
        setProjectTitle(response.data.project_title);
        setProjectDescription(response.data.description);
        setProjectStartDate(response.data.startDate)
        setProjectEndDate(response.data.endDate)
        setStartDate(new Date(projectStartDate).toLocaleDateString('en-US').split('/').reverse())
        setDueDate(new Date(projectEndDate).toLocaleDateString('en-US').split('/').reverse())

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
    const selectedDate = event.target.value; // this will be in the format of yyyy-MM-dd
    const dateParts = selectedDate.split("-"); // split the date string into an array of parts
    const formattedDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]); // create a Date object from the parts
    setStartDate(formattedDate); // set the state value to the formatted date object
  };

  const handleDueDateChange = (event) => {
    const selectedDate = event.target.value; // this will be in the format of yyyy-MM-dd
    const dateParts = selectedDate.split("-"); // split the date string into an array of parts
    const formattedDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]); // create a Date object from the parts
    setDueDate(formattedDate); // set the state value to the formatted date object
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
                disabled={userPermission !== 'admin'}
                onChange={handleTitleChange}
              />
            </Form.Group>

            <Stack direction="horizontal" className="date">
              <div className="the-project-owner me-3 mb-4">
                <span className="the-h mb-2">Owner</span>
                <div className="d-flex align-items-center">
                  <div className="user-image me-1">
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
                  type="text"
                  className="custom-input"
                  placeholder={new Date(projectStartDate).toLocaleDateString('en-US').split('/').reverse()}
                  value={startDate}
                  onFocus={(e) => e.target.type = 'date'} 
                  onBlur={(e) => e.target.type = 'text'}
                  disabled={userPermission !== 'admin'}
                  onChange={handleStartDateChange}
                />
              </Form.Group>
              <Form.Group
                className="modify-date-input mb-3 mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="the-h">Due Date</Form.Label>
                <Form.Control
                  type="text"
                  className="custom-input"
                  placeholder={new Date(projectEndDate).toLocaleDateString('en-US').split('/').reverse()}
                  value={endDate}
                  disabled={userPermission !== 'admin'}
                  onFocus={(e) => e.target.type = 'date'} 
                  onBlur={(e) => e.target.type = 'text'}
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
                disabled={userPermission !== 'admin'}
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