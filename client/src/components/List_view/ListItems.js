import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./ListItem.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const ListItems = ()  => {

    
  return (
    <>
      <div className="view-content mb-4">

        {/*task to be done*/}

        {/*1*/}
        <div className="list mb-0">
          <div className="task-name">To do task_one</div>
          <div className="assignee">
            <div className="user me-1">
              <FontAwesomeIcon icon={faUser} style={{ color: "#ffffff" }} size="xs" />
            </div>
            <span>J. Lemogo</span>
          </div>
          <div className="due-date">Jun 29 - Jul 3</div>
          <div className="priority">
            <div className="the-priority-low">Low</div>
          </div>
          <div className="status">
            <div className="the-status-ontrack">on track</div>
          </div>
        </div>

        {/*2*/}
        <div className="list mb-0">
          <div className="task-name">To do task_two</div>
          <div className="assignee">
            <div className="user me-1">
              <FontAwesomeIcon icon={faUser} style={{ color: "#ffffff" }} size="xs" />
            </div>
            <span>J. Lemogo</span>
          </div>
          <div className="due-date">Today - 3 Jul</div>
          <div className="priority">
            <div className="the-priority-medium">Medium</div>
          </div>
          <div className="status">
            <div className="the-status-atrisk">At risk</div>
          </div>
        </div>

        {/*3*/}
        <div className="list mb-0">
          <div className="task-name">To do task_three</div>
          <div className="assignee">
            <div className="user me-1">
              <FontAwesomeIcon icon={faUser} style={{ color: "#ffffff" }} size="xs" />
            </div>
            <span>J. Lemogo</span>
          </div>
          <div className="due-date">Today - 3 Jul</div>
          <div className="priority">
            <div className="the-priority-high">High</div>
          </div>
          <div className="status">
            <div className="the-status-offtrack">Off track</div>
          </div>
        </div>

      </div>
    </>
  );
};

export default ListItems;
