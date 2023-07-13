/** @format */

import React, { useState, useEffect } from 'react';
import '../ListItem.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faCircleCheck,
  faCircleNotch,
  faClipboard,
} from '@fortawesome/free-solid-svg-icons';

const DoneListItems = () => {
  const { projectId } = useParams();
  const token = localStorage.getItem('token');
  const [taskList, setTaskList] = useState([]);
  const [userPermission, setUserPermssion] = useState(null);
  const [isChecked, setIsChecked] = useState(true);

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
        setUserPermssion(response.data.permission);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProject();
  }, [projectId]);

  const handleCheckClick = async (task) => {
    const taskId = task._id;
    setIsChecked(!isChecked);
    const response = await axios.put(
      `http://localhost:3003/tasks/${taskId}/approve`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };
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
        console.log(response);
        const updatedTaskList = await Promise.all(
          response.data.map(async (task) => {
            const assignedToUsernames = [];
            if (task.assignedTo.length == 0) {
              assignedToUsernames.push('Not Assigned');
            } else {
              for (const userId of task.assignedTo) {
                const user = await axios.get(
                  `http://localhost:9000/user/search?userId=${userId}`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
                assignedToUsernames.push(
                  user.data.firstname + ' ' + user.data.lastname
                );
              }
            }

            return {
              ...task,
              assignedToUsernames,
              status:"on-track"
            };
          })
        );
        const filteredTaskList = updatedTaskList.filter((task) => {
          return (
            (task.toBeApproved === true &&
              task.isApproved === true &&
              task.isCompleted === true) ||
            (task.toBeApproved === false &&
              task.isApproved === false &&
              task.isCompleted === true)
          );
        }); // filter out tasks that are completed
        setTaskList(filteredTaskList);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTaskList();
  }, [projectId, token]);
  console.log(taskList);
  return (
    <>
      <div className="view-content mb-4">
        {taskList.length > 0 ? (
          taskList.map((task, index) => (
            <div className="list mb-0" key={index}>
              <div className="task-name">
                {userPermission === 'admin' && task.toBeApproved ? (
                  isChecked ? (
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                      bounce
                      style={{
                        color: '#28a745',
                        marginRight: '10px',
                        animationIterationCount: '1',
                      }}
                      onClick={() => {
                        handleCheckClick(task);
                      }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faCircleNotch}
                      style={{ color: '#cccccc', marginRight: '10px' }}
                      onClick={() => {
                        handleCheckClick(task);
                      }}
                    />
                  )
                ) : null}
                <FontAwesomeIcon
                  icon={faClipboard}
                  style={{ color: '#ccccfc', marginRight: '20px' }}
                />

                {task.name}
              </div>
              <div className="assignee">
                <div className="user me-1">
                  <FontAwesomeIcon
                    icon={faUser}
                    style={{ color: '#ffffff' }}
                    size="xs"
                  />
                </div>
                <span style={{ fontStyle: 'capitalize' }}>
                  {task.assignedToUsernames}
                </span>
              </div>
              <div className="due-date">
                {task.startDate} - {task.endDate}
              </div>
              <div className="priority">
                <div className={`the-priority-${task.priority.toLowerCase()}`}>
                  {task.priority}
                </div>
              </div>
              <div className={`the-status-${task.status}`}>
                {task.status}
              </div>
            </div>
          ))
        ) : (
          <div className="none-found">No tasks found.</div>
        )}
      </div>
    </>
  );
};

export default DoneListItems;
