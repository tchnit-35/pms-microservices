/** @format */

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Stack } from 'react-bootstrap';

import axios from 'axios';

import './CreateTask.css';

function CreateTask(props) {
  const { projectId } = useParams();
  const [projectTitle, setProjectTitle] = useState(null);
  const [teamMemberId, setTeamMemberId] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [assignedList, setAssignedList] = useState([]);
  const [dependencyList, setDpendencyList] = useState([]);
  const [projectTasks, setProjectTasks] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectResponse = await axios.get(
          `http://localhost:3002/projects/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProjectTitle(projectResponse.data.project_title);

        //fetch user id
        const usersResponse = await axios.get(
          `http://localhost:3002/projects/${projectId}/allUsers`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTeamMemberId(usersResponse.data);
        console.log('User id:', usersResponse);

        // Fetch user name for each team member
        const fetchName = async (userId) => {
          try {
            const userNameResponse = await axios.get(
              `http://localhost:9000/user/`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            console.log('User name:', userNameResponse.data.username);
            return userNameResponse.data;
          } catch (error) {
            console.error(error);
            // handle the error
            return null;
          }
        };

        const teamMemberNames = await Promise.all(
          usersResponse.data.map(async (user) => {
            const name = await fetchName(user.userId);
            return { ...user, name };
          })
        );
        setTeamMembers(teamMemberNames);

        const projectTasksResponse = await axios.get(
          `http://localhost:3003/projects/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(projectTasksResponse);
        setProjectTasks(projectTasksResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [projectId, token]);

  const [formData, setFormData] = useState({
    task_name: '',
    start_date: '',
    due_date: '',
    description: '',
    priority: 'Low',
    masterTaskId: '',
    toBeApproved: false,
    assignedTo: [],
    dependencies: [],
  });

  const handleCreatetask = () => {
    const taskData = {
      name: formData.task_name,
      startDate: new Date(formData.start_date),
      endDate: new Date(formData.due_date),
      description: formData.description,
      priority: formData.priority,
      masterTaskId: formData.masterTaskId,
      toBeApproved: formData.toBeApproved,
      usernames: formData.assignedTo,
      dependencies: formData.description,
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

  const handleSelectChange = (event) => {
    const selectedUsername = event.target.value;
    const selectedUser = teamMembers.find(user => user.name.username === selectedUsername);
  
    setAssignedList([...assignedList, selectedUser]);
    const selectedUserIds = assignedList.map(user => user.userId);
    const selectedUsernames = assignedList.map(user => user.name.username);
    setFormData({
      ...formData,
      assignedTo: [...formData.assignedTo, {userId: selectedUser.userId, username: selectedUser.name.username}],
    });
    setTeamMembers(teamMembers.filter(user => user.name.username !== selectedUsername));
  };

  const handleTaskSelectChange = (event) => {
    const selectedTaskId = event.target.value;
    const selectedTask = projectTasks.find(task => task._id === selectedTaskId);
  
    setDpendencyList([...dependencyList, selectedTask]);
    const selectedTaskIds = dependencyList.map(task => task._id);
    setFormData({
      ...formData,
      dependencies: selectedTaskIds,
    });
  };
  const filteredProjectTasks = projectTasks.filter(task => task.endDate <= formData.startDate);
  
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        dialogClassName="modal-50w"
        className="update-project-modal">
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
              <span className="the-h me-auto">Project: {projectTitle}</span>

              <Form.Group
                className="modify-date-input mb-3  me-4"
                controlId="exampleForm.ControlInput1">
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
                    controlId="exampleForm.ControlInput1">
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

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1">
              <Form.Label className="the-h">Task description</Form.Label>
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
              <div className="d-flex flex-column">
                <Form.Select
                  aria-label="Default select example"
                  className="custom-input"
                  name="assigned_to"
                  value={formData.assignedTo}
                  onChange={handleSelectChange}>
                  <option value={{}}>Select User</option>
                  {teamMembers.map((user) => (
                    <option key={user.userId} value={user.name.username}>
                      {user.name ? user.name.username : ''}
                    </option>
                  ))}
                </Form.Select>
                <div className="d-flex flex-column create-task-selection">
                  {assignedList.map((user) => (
                    <div key={user.userId}>{user.name.username}</div>
                  ))}
                </div>
              </div>
              <div className="d-flex flex-column">
                <Form.Select
                  aria-label="Default select example"
                  className="custom-input"
                  name="dependencies"
                  value={formData.dependencies}
                  onChange={handleTaskSelectChange}>
                  <option>Dependencies</option>
                  {filteredProjectTasks.map((task) => (
                    <option key={task._id} value={task._id}>
                      {task.name}
                    </option>
                  ))}
                </Form.Select>
                <div>
                  {dependencyList.map((task) => (
                    <div key={task._id}>{task.name}</div>
                  ))}
                </div>
              </div>
            </Stack>

            <Stack direction="horizontal" gap={3} className="mb-3">
              <Form.Select
                aria-label="Default select example"
                className="custom-input"
                name="master_task"
                value={formData.masterTaskId}>
                <option>Master task</option>
                {projectTasks.map((task) => (
                  <option key={task._id} value={task._id}>
                    {task.name}
                  </option>
                ))}
              </Form.Select>

              <Form.Select
                aria-label="Default select example"
                className="custom-input"
                name="priority"
                value={formData.priority}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </Form.Select>
            </Stack>

            <Form.Check
              type="checkbox"
              id="checkbox"
              label="To be Approved"
              className="custom-input custom-checkbox ms-auto"
              name="to_be_approved"
              value={formData.toBeApproved}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex align-items-center justify-content-center">
          <Button className="ctm-btn" onClick={handleCreateAndClose}>
            Create Task
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateTask;
