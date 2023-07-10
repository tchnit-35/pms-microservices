/** @format */

import './Footer.css';

import React, { useEffect, useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCopyright,
  faUserPlus,
  faClone,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function Footer() {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const [email, setInput] = useState('');
  const [invitedList, setInvitedList] = useState([]);
  const [results, setResults] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [selectedProject,setSelectedProject] = useState('')
  const token = localStorage.getItem('token');

  const handleProjectSelect = (project) => {
    setSelectedProject(project);
  };

  const handleChange = async (value) => {
    setInput(value);
    const response = await axios.get(
      `http://localhost:9000/user/search?email=${value}`
    );
    setResults(response.data); // <--- set the search results
  };
  const handleAddUser = (user) => {
    setInvitedList([...invitedList, user.username]);
    setInput(''); // <--- clear the search bar
    setResults([]); // <--- clear the search results
  };

    useEffect(() => {
      axios
        .get(`http://localhost:3002/projects`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const projects = response.data.filter((project) => {
            return project.permission === "admin";
          });
          setAllProjects(projects);
        });  
    }, [token]);
    const handleClose = () => {
      axios.post(`http://localhost:3002/projects/${selectedProject}/invite`, {
        usernames: invitedList,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
      setShow(false);
    };
  return (
    <>
      <div className="custom-footer">
        <div className="me-auto copy-right">
          <FontAwesomeIcon
            icon={faCopyright}
            style={{ color: '#000000' }}
            size="xs"
          />
          <span>TaskId v1.0.0</span>
        </div>

        <div className="invite-user" onClick={handleShow}>
          <FontAwesomeIcon
            icon={faUserPlus}
            style={{ color: '#ffffff' }}
            size="xl"
            className="me-1"
          />
          <span>Invite New Member</span>
        </div>

        <Modal
          show={show}
          onHide={handleClose}
          centered
          dialogClassName="modal-50w">
          <Modal.Header closeButton className="custom-title">
            <Modal.Title className="cf">Invite New colleagues</Modal.Title>
          </Modal.Header>
          <Modal.Body className="custom-modal-body">
            <Form>
              <Form.Group
                className="modal-invite-user mb-3"
                controlId="exampleForm.ControlInput1">
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(event) => handleChange(event.target.value)}
                  className="modal-custom-input me-3 mb-2"
                  autoFocus
                />
                {results.map((user) => (
                  <div onClick={() => handleAddUser(user)}>{user.email}</div>
                ))}
                <div className="invite-more">
                  <FontAwesomeIcon icon={faPlus} size="2xs" />
                  <span>Add to list</span>
                </div>
              </Form.Group>

              <div className="position-relative">
                <Dropdown className="position-absolute top-0 end-0">
                  <Dropdown.Toggle
                    variant="success"
                    id="dropdown-basic"
                    className="custom-dropdown">
                    Select Project
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {allProjects.map((project) => (
                      <Dropdown.Item
                        key={project._id}
                        onClick={() => handleProjectSelect(project._id)}>
                        {project.project_title}
                      </Dropdown.Item>
                    ))}
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
            <Button
              variant="primary"
              className="custom-modal-btn"
              onClick={handleClose}>
              Send link
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default Footer;
