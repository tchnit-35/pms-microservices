import React, { useState } from "react";

import "./ListView.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faFilter,
  faArrowDownShortWide,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";

import ToDoListItems from "./myTasksListItems/ToDoListItems";
import DoneListItems from "./myTasksListItems/DoneListItems";
import DoingListItems from "./myTasksListItems/DoingListItems";


function ListView() {
  const [isToDoVisible, setToDoVisible] = useState(false);
  const [isDoingVisible, setDoingVisible] = useState(false);
  const [isDoneVisible, setDoneVisible] = useState(false);

  const [show, setShow] = useState(false);

  const handleToDoArrowClick = () => {
    setToDoVisible(!isToDoVisible);
  };
  const handleDoneArrowClick = () => {
    setDoneVisible(!isDoneVisible);
  };
  const handleDoingArrowClick = () => {
    setDoingVisible(!isDoingVisible);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/*list body*/}

      <div className="unselectable">
        {/*add task, filter, sort*/}

        <div className="d-flex align-items-center actions mb-2">  

          <div className="filter me-4">
            <FontAwesomeIcon
              icon={faFilter}
              size="sm"
              style={{ color: "#545454" }}
              className="me-1"
            />
            <span>Filter</span>
          </div>

          <div className="sort ">
            <FontAwesomeIcon
              icon={faArrowDownShortWide}
              size="sm"
              style={{ color: "#545454" }}
              className="me-1"
            />
            <span>Sort</span>
          </div>
        </div>
        

        {/*view content*/}

        <div className="view-content">
          {/*headers*/}

          <div className="headers">
            <div className="task-name">Task name</div>
            <div className="assignee">Assignee</div>
            <div className="time-frame">Time frame</div>
            <div className="priority">Priority</div>
            <div className="status">Status</div>
          </div>

          {/*task to be done*/}
          <div className="state d-flex align-items-center mb-4" onClick={handleToDoArrowClick}>
            
              <FontAwesomeIcon
                icon={faSortUp}
                rotation={isToDoVisible ? 180 : 90}
                style={{ color: "666666",transition:"0.25s" }}
                className=" me-2"
              />
    
            <span>To do</span>
          </div>

          {isToDoVisible && <ToDoListItems />}

          <div className="doing-state d-flex align-items-center mb-4" onClick={handleDoingArrowClick}>
              <FontAwesomeIcon
                icon={faSortUp}
                rotation={isDoingVisible ? 180 : 90}
                style={{ color: "666666",transition:"0.25s" }}
                className=" me-2"
              />

            <span>Doing</span>
          </div>
          {isDoingVisible && <DoingListItems />}
          <div className="done-state d-flex align-items-center mb-4" onClick={handleDoneArrowClick}>
              <FontAwesomeIcon
                icon={faSortUp}
                rotation={isDoneVisible ? 180 : 90}
                style={{ color: "666666",transition:"0.25s" }}
                className=" me-2"
              />
            <span>Done</span>
          </div>
          {isDoneVisible && <DoneListItems />}
        </div>
      </div>
    </>
  );
}

export default ListView;
