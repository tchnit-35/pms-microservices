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

const DoingListItems = () => {
  const { projectId } = useParams();
  const token = localStorage.getItem('token');
  const [taskList, setTaskList] = useState([]);
  const [userPermission, setUserPermssion] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

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
            if (user===null) {
              return {
                ...task,
                assignedToUsername:
                  user.data.firstname + ' ' + user.data.lastname,
              };
            }
            else {
              return {
                ...task,
                assignedToUsername:
                'Not Assigned' ,
              };
            }
             
          })
        );
        const filteredTaskList = await Promise.all(
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
                <span>{task.assignedToUsername}</span>
              </div>
              <div className="due-date">
                {task.startDate} - {task.endDate}
              </div>
              <div className="priority">
                <div className="the-priority-low">{task.priority}</div>
              </div>
              <div className="status">
                <div className="the-status-ontrack">{task.status}</div>
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

export default DoingListItems;
