/** @format */

import React, { useState, useEffect } from 'react';
import '../ListItem.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard, faListCheck } from '@fortawesome/free-solid-svg-icons';
const ToDoListItems = () => {
  const { projectId } = useParams();
  const token = localStorage.getItem('token');
  const [taskList, setTaskList] = useState([]);



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
            const project = await axios.get(`http://localhost:3002/projects/${task.projectId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            
            return { ...task, Project: project.data.project_title, projectScope: project.data.endDate };
          })
        );
        const filteredTaskList = await Promise.all(
          updatedTaskList.filter((task) => {
            const startDate = new Date(task.startDate);
            const currentDate = new Date(Date.now());
            return (task.toBeApproved===false &&task.isCompleted ===false&& startDate < currentDate )
            || (task.toBeApproved===true && task.isCompleted ===true&& startDate < currentDate )
            || (task.toBeApproved===true && task.isCompleted ===false&& startDate < currentDate )
          })
        );
        setTaskList(filteredTaskList);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTaskList();
  }, [projectId])
  
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

export default ToDoListItems;
