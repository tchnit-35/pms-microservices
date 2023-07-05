import React, { useState, useEffect } from 'react';
import "./ListItem.css"
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const ToDoListItems = () => {
  const { projectId } = useParams();
  const token = localStorage.getItem('token');
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const fetchTaskList = async () => {
      try {
        const response = await axios.get(`http://localhost:3003/projects/${projectId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log({tasks:response})
        const updatedTaskList = await Promise.all(
          response.data.map(async (task) => {
            const user = await axios.get(`http://localhost:9000/user/search?userId=${task.assignedTo}`);
            return { ...task, assignedToUsername: user.data.username };
          })
        );
        const filteredTaskList = await Promise.all(
          updatedTaskList.filter(async (task) => {
            const startDate = new Date(task.startDate);
            const currentDate = new Date();
            return startDate > currentDate;
          })
        );
        setTaskList(filteredTaskList);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTaskList();
  }, [projectId, token])
  console.log({todotasks:taskList})
  return (
    <>
      <div className="view-content mb-4">
        {taskList.map((task, index) => (
          <div className="list mb-0" key={index}>
            <div className="task-name">{task.name}</div>
            <div className="assignee">
              <div className="user me-1">
                <FontAwesomeIcon icon={faUser} style={{ color: '#ffffff' }} size="xs" />
              </div>
              <span>{task.assignedTo}</span>
            </div>
            <div className="due-date">{task.startDate} - {task.endDate}</div>
            <div className="priority">
              <div className="the-priority-low">{task.priority}</div>
            </div>
            <div className="status">
              <div className="the-status-ontrack">{task.status}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ToDoListItems;