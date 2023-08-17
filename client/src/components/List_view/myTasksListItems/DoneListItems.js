/** @format */

import React, { useState, useEffect } from 'react';
import '../ListItem.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faCircleNotch,
  faClipboard,
  faListCheck,
} from '@fortawesome/free-solid-svg-icons';

const DoneListItems = () => {
  const { projectId } = useParams();
  const token = localStorage.getItem('token');
  const [taskList, setTaskList] = useState([]);
  const [isChecked, setIsChecked] = useState(true);

  const handleCheckClick = async (task) => {
    const taskId = task._id;
    if (new Date(task.projectScope) > new Date(Date.now())) {
      setIsChecked(!isChecked);
      const response = await axios.put(
        `http://localhost:3003/tasks/${taskId}/complete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    }
  };
  useEffect(() => {
    const fetchTaskList = async () => {
      try {
        const response = await axios.get(`http://localhost:3003/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const updatedTaskList = await Promise.all(
          response.data.map(async (task) => {
            const project = await axios.get(
              `http://localhost:3002/projects/${task.projectId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            return {
              ...task,
              Project: project.data.project_title,
              projectScope: project.data.endDate,
            };
          })
        );
        const filteredTaskList = updatedTaskList.filter((task) => {
          const startDate = new Date(task.startDate);
          const current = new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
          });
          const currentDate = new Date(current).getTime()
          return (
            (task.toBeApproved === true &&
              task.isApproved === true &&
              task.isCompleted === true&&
              startDate <= currentDate) ||
            (task.toBeApproved === false &&
              task.isApproved === false &&
              task.isCompleted === true&&
              startDate <= currentDate)
          );
        }); // filter out tasks that are completed
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
                {isChecked ? (
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
                )}
                <FontAwesomeIcon
                  icon={faClipboard}
                  style={{ color: '#ccccfc', marginRight: '20px' }}
                />

                {task.name}
              </div>
              <div className="assignee">
                <div className=" me-1">
                  <FontAwesomeIcon
                    icon={faListCheck}
                    style={{ color: '#89e1a8' }}
                  />
                </div>
                <span style={{ color: '#da4da1', fontWeight: 'bold' }}>
                  {task.Project}
                </span>
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

export default DoneListItems;
