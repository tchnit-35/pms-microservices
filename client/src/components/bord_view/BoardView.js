/** @format */

import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Tooltip } from 'react-tooltip';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowDownShortWide,
  faEllipsis,
  faFilter,
  faPlus,
  faUser,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';

import './BoardView.css';
import { useParams } from 'react-router-dom';

function BoardView() {
  const [ToDoList, setTodoList] = useState([]);
  const [DoingList, setDoingList] = useState([]);
  const [DoneList, setDoneList] = useState([]);
  const token = localStorage.getItem('token');
  const { projectId } = useParams();
  const [editable, setEditable] = useState(false);
  const [userPermission, setUserPermission] = useState('');
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    const fetchProject = async () => {
      try {
        // Replace with your actual token
        const response = await axios.get(
          `http://localhost:3002/projects/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserPermission(response.data.permission);
        setEditable(new Date(response.data.endDate) > Date.now());
      } catch (error) {
        console.error(error);
      }
    };
    fetchProject();
  }, [projectId, token]);

  useEffect(() => {
    const fetchTaskList = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3003/projects/${projectId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const updatedTaskList = await Promise.all(
          response.data.map(async (task) => {
            const user = await axios.get(
              `http://localhost:9000/user/search?userId=${task.assignedTo}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (user === null) {
              return {
                ...task,
                assignedToUsername:
                  user.data.firstname + ' ' + user.data.lastname,
              };
            } else {
              return {
                ...task,
                assignedToUsername: 'Not Assigned',
              };
            }
          })
        );

        setTodoList(
          updatedTaskList.filter((task) => {
            const startDate = new Date(task.startDate);
            const currentDate = new Date(Date.now);
            return startDate > currentDate;
          })
        );
        setDoingList(
          updatedTaskList.filter((task) => {
            const startDate = new Date(task.startDate);
            const endDate = new Date(task.endDate);
            const currentDate = new Date(Date.now());
            return (
              (task.toBeApproved === false &&
                task.isCompleted === false &&
                startDate <= currentDate) ||
              (task.toBeApproved === true &&
                task.isCompleted === true &&
                startDate <= currentDate) ||
              (task.toBeApproved === true &&
                task.isCompleted === false &&
                startDate <= currentDate)
            );
          })
        );
        setDoneList(
          updatedTaskList.filter((task) => {
            return (
              (task.toBeApproved === true &&
                task.isApproved === true &&
                task.isCompleted === true) ||
              (task.toBeApproved === false &&
                task.isApproved === false &&
                task.isCompleted === true)
            );
          })
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchTaskList();
  }, [projectId, token]);

  return (
    <>
      <div className="unselectable">
        {/*fliter $ sort */}
        <div className="d-flex align-items-center board-actions">
          <div className="board-filter me-4">
            <FontAwesomeIcon
              icon={faFilter}
              size="sm"
              style={{ color: '#545454' }}
              className="me-1"
            />
            <span>Filter</span>
          </div>

          <div className="board-sort ">
            <FontAwesomeIcon
              icon={faArrowDownShortWide}
              size="sm"
              style={{ color: '#545454' }}
              className="me-1"
            />
            <span>Sort</span>
          </div>
        </div>

        {/*bord content*/}
        <div className="board_view">
          {/*board to do*/}
          <div className="board-content me-5">
            <div className="d-flex">
              <span className="me-auto">To do</span>
              <FontAwesomeIcon
                icon={faPlus}
                className="board-view-more-action me-2"
              />
              <FontAwesomeIcon
                icon={faEllipsis}
                className="board-view-more-action"
              />
            </div>

            {/*A task*/}
            {ToDoList.length > 0 ? (
              ToDoList.map((task) => {
                return (
                  <div className="board-task">
                    <div className="d-flex">
                      <span className="board-taskname me-auto">
                        {task.name}
                      </span>
                      <FontAwesomeIcon
                        icon={faEllipsis}
                        className="board-view-more-action"
                      />
                    </div>

                    <div className="priority-statut">
                      <div className="board-task-priority me-3">
                        {task.priority}
                      </div>
                      <div className="board-task-status">{task.status}</div>
                    </div>

                    <div className="icon-date">
                      <div className="board-user me-2">
                        <FontAwesomeIcon
                          icon={faUser}
                          style={{ color: '#FFFFFF' }}
                          size="sm"
                        />
                      </div>

                      <p className="dates">
                        <span>{task.startDate}</span>--
                        <span>{task.endDate}</span>
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <span>No Task Found</span>
            )}

            {editable && userPermission == 'admin' ? (
              <div className="add-task-container" onClick={handleShow}>
                <FontAwesomeIcon icon={faPlus} className="me-1" />
                <span>Add Task</span>
              </div>
            ) : (
              <div className="add-task-container me-4">
                <FontAwesomeIcon icon={faXmark} className="me-1" />
                {editable ? (
                  <span
                    data-tooltip-id="Unauthorized"
                    data-tooltip-content="You need admin permission to add Tasks">
                    Add Task
                  </span>
                ) : (
                  <span
                    data-tooltip-id="Unauthorized"
                    data-tooltip-content="Project is not more Editable">
                    Add Task
                  </span>
                )}

                <Tooltip
                  id="Unauthorized"
                  className="tooltip"
                  classNameArrow="tooltip-arrow"
                />
              </div>
            )}
          </div>

          {/*board doing*/}
          <div className="board-content me-5">
            <div className="d-flex">
              <span className="me-auto">Doing</span>
              <FontAwesomeIcon
                icon={faPlus}
                className="board-view-more-action me-2"
              />
              <FontAwesomeIcon
                icon={faEllipsis}
                className="board-view-more-action"
              />
            </div>

            {/*A task*/}

            {DoingList.length > 0 ? (
              DoingList.map((task) => {
                return (
                  <div className="board-task">
                    <div className="d-flex">
                      <span className="board-taskname me-auto">
                        {task.name}
                      </span>
                      <FontAwesomeIcon
                        icon={faEllipsis}
                        className="board-view-more-action"
                      />
                    </div>

                    <div className="priority-statut">
                      <div className="board-task-priority me-3">
                        {task.priority}
                      </div>
                      <div className="board-task-status">{task.status}</div>
                    </div>

                    <div className="icon-date">
                      <div className="board-user me-2">
                        <FontAwesomeIcon
                          icon={faUser}
                          style={{ color: '#FFFFFF' }}
                          size="sm"
                        />
                      </div>

                      <p className="dates">
                        <span>{task.startDate}</span>--
                        <span>{task.endDate}</span>
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <span>No Task Found</span>
            )}

            {editable && userPermission == 'admin' ? (
              <div className="add-task-container" onClick={handleShow}>
                <FontAwesomeIcon icon={faPlus} className="me-1" />
                <span>Add Task</span>
              </div>
            ) : (
              <div className="add-task-container">
                <FontAwesomeIcon icon={faXmark} className="me-1" />
                {editable ? (
                  <span
                    data-tooltip-id="Unauthorized"
                    data-tooltip-content="You need admin permission to add Tasks">
                    Add Task
                  </span>
                ) : (
                  <span
                    data-tooltip-id="Unauthorized"
                    data-tooltip-content="Project is not more Editable">
                    Add Task
                  </span>
                )}

                <Tooltip
                  id="Unauthorized"
                  className="tooltip"
                  classNameArrow="tooltip-arrow"
                />
              </div>
            )}
          </div>

          {/*board done*/}
          <div className="board-content me-5">
            <div className="d-flex">
              <span className="me-auto">Done</span>
              <FontAwesomeIcon
                icon={faPlus}
                className="board-view-more-action me-2"
              />
              <FontAwesomeIcon
                icon={faEllipsis}
                className="board-view-more-action"
              />
            </div>

            <div className="board-content me-5">
              {DoneList.length > 0 ? (
                DoneList.map((task) => {
                  return (
                    <div className="board-task">
                      <div className="d-flex">
                        <span className="board-taskname me-auto">
                          {task.name}
                        </span>
                        <FontAwesomeIcon
                          icon={faEllipsis}
                          className="board-view-more-action"
                        />
                      </div>

                      <div className="priority-statut">
                        <div className="board-task-priority me-3">
                          {task.priority}
                        </div>
                        <div className="board-task-status">{task.status}</div>
                      </div>

                      <div className="icon-date">
                        <div className="board-user me-2">
                          <FontAwesomeIcon
                            icon={faUser}
                            style={{ color: '#FFFFFF' }}
                            size="sm"
                          />
                        </div>

                        <p className="dates">
                          <span>{task.startDate}</span>--
                          <span>{task.endDate}</span>
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <span>No Task Found</span>
              )}

              {editable && userPermission == 'admin' ? (
                <div className="add-task-container" onClick={handleShow}>
                  <FontAwesomeIcon icon={faPlus} className="me-1" />
                  <span>Add Task</span>
                </div>
              ) : (
                <div className="add-task-container">
                  <FontAwesomeIcon icon={faXmark} className="me-1" />
                  {editable ? (
                    <span
                      data-tooltip-id="Unauthorized"
                      data-tooltip-content="You need admin permission to add Tasks">
                      Add Task
                    </span>
                  ) : (
                    <span
                      data-tooltip-id="Unauthorized"
                      data-tooltip-content="Project is not more Editable">
                      Add Task
                    </span>
                  )}

                  <Tooltip
                    id="Unauthorized"
                    className="tooltip"
                    classNameArrow="tooltip-arrow"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BoardView;
