import React, { useState } from "react";

import "./ListView.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faFilter,
  faArrowDownShortWide,
  faSortUp,
} from "@fortawesome/free-solid-svg-icons";

import ListItems from "./ListItems";

function ListView() {
  const [isToDoVisible, setToDoVisible] = useState(false);

  const handleArrowClick = () => {
    setToDoVisible(!isToDoVisible);
  };

  return (
    <>
      {/*list body*/}

      <div className="unselectable">
        {/*add task, filter, sort*/}

        <div className="d-flex align-items-center actions mb-2">
          <div className="add-task me-4">
            <FontAwesomeIcon icon={faPlus} className="me-1" />
            <span>Add Task</span>
          </div>

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
          <div className="state d-flex align-items-center" onClick={handleArrowClick}>
            <FontAwesomeIcon
              icon={faSortUp}
              rotation={isToDoVisible ? 180 : 90}
              style={{ color: "rgb(0, 0, 0, 0.3)" }}
              className=" me-2"
            />

            <span>TO DO</span>
          </div>

          {isToDoVisible && <ListItems />}

          <div className="doing-state">
            <FontAwesomeIcon
              icon={faSortUp}
              rotation={90}
              style={{ color: "rgb(0, 0, 0, 0.3)" }}
              className=" me-2"
            />
            <span>DOING</span>
          </div>

          <div className="done-state d-flex align-items-center">
            <FontAwesomeIcon
              icon={faSortUp}
              rotation={90}
              style={{ color: "rgb(0, 0, 0, 0.3)" }}
              className=" me-2"
            />

            <span>DONE</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListView;
