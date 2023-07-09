import React from "react";
import "./Dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

function Dashboard() {
  return (
    <>
      <div className="dashboard-container">
        <div className="box-overview">
        
          <div className="info-box">
            <span className="task-filter">completed tasks</span>
            <span className="number-of-task">0</span>
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
            <span className="number-of-task">1</span>
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
            <span className="number-of-task">2</span>
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
            <span className="number-of-task">3</span>
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
