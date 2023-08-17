/** @format */

import React, { useState, useEffect } from 'react';
import '../ListItem.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClipboard } from '@fortawesome/free-solid-svg-icons';
const ToDoListItems = () => {
  const { projectId } = useParams();
  const token = localStorage.getItem('token');
  const [taskList, setTaskList] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckClick = async (task) => {
    const taskId = task._id;
    setIsChecked(!isChecked);
    const response = await axios.put(`http://localhost:3003/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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

            if (task.assignedTo.length === 0) {
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
              status: 'on-track',
            };
          })
        );
        console.log(updatedTaskList);
        const filteredTaskList = await Promise.all(
          updatedTaskList.filter((task) => {
            const startDate = new Date(task.startDate).getTime();
            const current = new Date().toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
            });;
            const currentDate = new Date(current).getTime()
            return (startDate > currentDate);
          })
        );
        setTaskList(filteredTaskList);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTaskList();
  }, [projectId, token]);

  return (
    <>
      <div className="view-content mb-4">
        {taskList.length > 0 ? (
          taskList.map((task, index) => (
            <div className="list mb-0" key={index}>
              <div className="task-name">
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
                <span>{task.assignedToUsernames}</span>
              </div>
              <div className="due-date">
                {task.startDate} - {task.endDate}
              </div>
              <div className="priority">
                <div className={`the-priority-${task.priority.toLowerCase()}`}>
                  {task.priority}
                </div>
              </div>
              <div className={`the-status-${task.status}`}>{task.status}</div>
            </div>
          ))
        ) : (
          <div className="none-found">No tasks found.</div>
        )}
      </div>
    </>
  );
};

export default ToDoListItems;
