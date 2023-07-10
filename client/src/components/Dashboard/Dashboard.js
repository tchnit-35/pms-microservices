import React,{useState,useEffect} from "react";
import "./Dashboard.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

function Dashboard() {
  const   [taskCount,setTaskCount] = useState(0)
  const   [incompleteTaskCount,setIncompleteTaskCount] = useState(0)
  const   [completeTaskCount,setCompleteTaskCount] = useState(0)
  const   [overdueTaskCount,setOverdueTaskCount] = useState(0)
  const token = localStorage.getItem('token')
  const {projectId} = useParams()

  useEffect(()=>{
    const fetchCount = async()=>{
        try {
          const response = await axios.get(
            `http://localhost:3003/projects/${projectId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
            console.log(response.data.length)
          const completeTaskList = await Promise.all(
            response.data.filter((task) => {
              return task.isCompleted===true 
            })
          );
          const incompleteTaskList = await Promise.all(
            response.data.filter((task) => {
              return task.isCompleted===false
            })
          );
          const overdueTaskList = await Promise.all(
            response.data.filter((task) => {
              return (task.toBeApproved===false&&task.isApproved===false&&task.isCompleted===false&& new Date(task.endDate)< new Date(Date.now()))
              ||(task.toBeApproved===true&&task.isApproved===false&&task.isCompleted===true&& new Date(task.endDate)<new Date(Date.now()))
            })
          );
          setCompleteTaskCount(completeTaskList.length)
          setOverdueTaskCount(overdueTaskList.length)
          setIncompleteTaskCount(incompleteTaskList.length)
          setTaskCount(response.data.length)

      } catch (error) {
          console.error(error);
        }
    }
    fetchCount()
  },[projectId,token])

  return (
    <>
      <div className="dashboard-container">
        <div className="box-overview">
        
          <div className="info-box">
            <span className="task-filter">completed tasks</span>
            <span className="number-of-task">{completeTaskCount}</span>
            <div className="filter">
              <FontAwesomeIcon
                icon={faFilter}
                size="2xs"
                
                style={{ color: "rgb(18, 18, 18, 0.6)" }}
              />
              <span className="dashboard-filter">Filter</span>
            </div>
          </div>

          <div className="info-box">
            <span>Incomplete tasks</span>
            <span className="number-of-task">{incompleteTaskCount}</span>
            <div className="filter">
              <FontAwesomeIcon
                icon={faFilter}
                size="2xs"
                
                style={{ color: "rgb(18, 18, 18, 0.6)" }}
              />
              <span className="dashboard-filter">Filter</span>
            </div>
          </div>

          <div className="info-box">
            <span className="task-filter">Overdue tasks</span>
            <span className="number-of-task">{overdueTaskCount}</span>
            <div className="filter">
              <FontAwesomeIcon
                icon={faFilter}
                size="2xs"
                
                style={{ color: "rgb(18, 18, 18, 0.6)" }}
              />
              <span className="dashboard-filter">Filter</span>
            </div>
          </div>

          <div className="info-box">
            <span className="task-filter">Total tasks</span>
            <span className="number-of-task">{taskCount}</span>
            <div className="filter">
              <FontAwesomeIcon
                icon={faFilter}
                size="2xs"
                
                style={{ color: "rgb(18, 18, 18, 0.6)" }}
              />
              <span className="dashboard-filter">Filter</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
