/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tooltip } from "react-tooltip";
import "./ListView.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faFilter,
  faArrowDownShortWide,
  faSortUp,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import ToDoListItems from "./projectListItems/ToDoListItems";
import DoneListItems from "./projectListItems/DoneListItems";
import DoingListItems from "./projectListItems/DoingListItems";
import CreateTask from "./CreateTask";
import { useParams } from "react-router-dom";

function ListView() {
  const [isToDoVisible, setToDoVisible] = useState(false);
  const [isDoingVisible, setDoingVisible] = useState(false);
  const [isDoneVisible, setDoneVisible] = useState(false);
  const [editable, setEditable] = useState(false);
  const { projectId } = useParams();
  const token = localStorage.getItem("token");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        // Replace with your actual token
        const response = await axios.get(`http://localhost:3002/projects/${projectId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEditable(new Date(response.data.endDate) > Date.now());
      } catch (error) {
        console.error(error);
      }
    };
    fetchProject();
  }, [projectId]);

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
  const handleShow = () => {
    setShow(true);
  };

  return (
    <>
      {/*list body*/}

      <div className="unselectable">
        {/*add task, filter, sort*/}

        <div className="d-flex align-items-center actions mb-2">
          {editable ? (
            <div className="add-task me-4" onClick={handleShow}>
              <FontAwesomeIcon icon={faPlus} className="me-1" />
              <span>Add Task</span>
            </div>
          ) : (
            <div className="add-task me-4">
              <FontAwesomeIcon icon={faXmark} className="me-1" />
              <span
                data-tooltip-id="Unauthorized"
                data-tooltip-content="You need admin permission to add Tasks"
              >
                Add Task
              </span>
              <Tooltip id="Unauthorized" className="tooltip" classNameArrow="tooltip-arrow" />
            </div>
          )}

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

        <CreateTask show={show} handleShow={handleShow} handleClose={handleClose} />

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
              style={{ color: "666666", transition: "0.25s" }}
              className=" me-2"
            />

            <span>To do</span>
          </div>

          {isToDoVisible && <ToDoListItems />}

          <div
            className="doing-state d-flex align-items-center mb-4"
            onClick={handleDoingArrowClick}
          >
            <FontAwesomeIcon
              icon={faSortUp}
              rotation={isDoingVisible ? 180 : 90}
              style={{ color: "666666", transition: "0.25s" }}
              className=" me-2"
            />

            <span>Doing</span>
          </div>
          {isDoingVisible && <DoingListItems />}
          <div className="done-state d-flex align-items-center mb-4" onClick={handleDoneArrowClick}>
            <FontAwesomeIcon
              icon={faSortUp}
              rotation={isDoneVisible ? 180 : 90}
              style={{ color: "666666", transition: "0.25s" }}
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
