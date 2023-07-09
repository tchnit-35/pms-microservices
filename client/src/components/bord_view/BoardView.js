import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDownShortWide,
  faEllipsis,
  faFilter,
  faPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import "./BoardView.css";

function BoardView() {
  return (
    <>
      <div className="unselectable">
        {/*fliter $ sort */}
        <div className="d-flex align-items-center board-actions">
          <div className="board-filter me-4">
            <FontAwesomeIcon
              icon={faFilter}
              size="sm"
              style={{ color: "#545454" }}
              className="me-1"
            />
            <span>Filter</span>
          </div>

          <div className="board-sort ">
            <FontAwesomeIcon
              icon={faArrowDownShortWide}
              size="sm"
              style={{ color: "#545454" }}
              className="me-1"
            />
            <span>Sort</span>
          </div>
        </div>

        {/*bord content*/}
        <div className="board_view">
          {/*board to do*/}
          <div className="board-content me-5">
            <div className="d-flex">
              <span className="me-auto">To do</span>
              <FontAwesomeIcon icon={faPlus} className="board-view-more-action me-2" />
              <FontAwesomeIcon icon={faEllipsis} className="board-view-more-action" />
            </div>

            {/*A task*/}

            <div className="board-task">
              <div className="d-flex">
                <span className="board-taskname me-auto">Task_name</span>
                <FontAwesomeIcon icon={faEllipsis} className="board-view-more-action" />
              </div>

              <div className="priority-statut">
                <div className="board-task-priority me-3">Low</div>
                <div className="board-task-status">off track</div>
              </div>

              <div className="icon-date">
                <div className="board-user me-2">
                  <FontAwesomeIcon icon={faUser} style={{ color: "#FFFFFF" }} size="sm" />
                </div>

                <p className="dates">
                  <span>DD/MM/YYYY</span>--<span>DD/MM/YYYY</span>
                </p>
              </div>
            </div>

            {/*A task*/}

            <div className="board-task mb-2">
              <div className="d-flex">
                <span className="board-taskname me-auto">Task_name</span>
                <FontAwesomeIcon icon={faEllipsis} className="board-view-more-action" />
              </div>

              <div className="priority-statut">
                <div className="board-task-priority me-3">Low</div>
                <div className="board-task-status">off track</div>
              </div>

              <div className="icon-date">
                <div className="board-user me-2">
                  <FontAwesomeIcon icon={faUser} style={{ color: "#FFFFFF" }} size="sm" />
                </div>

                <p className="dates">
                  <span>DD/MM/YYYY</span>--<span>DD/MM/YYYY</span>
                </p>
              </div>
            </div>

            <div className="add-task-container">
              <FontAwesomeIcon
                icon={faPlus}
                size="sm"
                style={{ color: "rgb(18, 18, 18, 0.6)" }}
                className="me-2"
              />
              <span>Add task</span>
            </div>
          </div>

          {/*board doing*/}
          <div className="board-content me-5">
            <div className="d-flex">
              <span className="me-auto">Doing</span>
              <FontAwesomeIcon icon={faPlus} className="board-view-more-action me-2" />
              <FontAwesomeIcon icon={faEllipsis} className="board-view-more-action" />
            </div>

            {/*A task*/}

            <div className="board-task">
              <div className="d-flex">
                <span className="board-taskname me-auto">Task_name</span>
                <FontAwesomeIcon icon={faEllipsis} className="board-view-more-action" />
              </div>

              <div className="priority-statut">
                <div className="board-task-priority me-3">Low</div>
                <div className="board-task-status">off track</div>
              </div>

              <div className="icon-date">
                <div className="board-user me-2">
                  <FontAwesomeIcon icon={faUser} style={{ color: "#FFFFFF" }} size="sm" />
                </div>

                <p className="dates">
                  <span>DD/MM/YYYY</span>--<span>DD/MM/YYYY</span>
                </p>
              </div>
            </div>

            {/*A task*/}

            <div className="board-task mb-2">
              <div className="d-flex">
                <span className="board-taskname me-auto">Task_name</span>
                <FontAwesomeIcon icon={faEllipsis} className="board-view-more-action" />
              </div>

              <div className="priority-statut">
                <div className="board-task-priority me-3">Low</div>
                <div className="board-task-status">off track</div>
              </div>

              <div className="icon-date">
                <div className="board-user me-2">
                  <FontAwesomeIcon icon={faUser} style={{ color: "#FFFFFF" }} size="sm" />
                </div>

                <p className="dates">
                  <span>DD/MM/YYYY</span>--<span>DD/MM/YYYY</span>
                </p>
              </div>
            </div>

            <div className="add-task-container">
              <FontAwesomeIcon
                icon={faPlus}
                size="sm"
                style={{ color: "rgb(18, 18, 18, 0.6)" }}
                className="me-2"
              />
              <span>Add task</span>
            </div>
          </div>

          {/*board done*/}
          <div className="board-content me-5">
            <div className="d-flex">
              <span className="me-auto">Done</span>
              <FontAwesomeIcon icon={faPlus} className="board-view-more-action me-2" />
              <FontAwesomeIcon icon={faEllipsis} className="board-view-more-action" />
            </div>

            <div className="board-content me-5">
              {/*when no task*/}

              <div className="No-task-container">
                <div className="add-task-container">
                  <FontAwesomeIcon
                    icon={faPlus}
                    size="sm"
                    style={{ color: "rgb(18, 18, 18, 0.6)" }}
                    className="me-2"
                  />
                  <span>Add task</span>
                </div>
              </div>


            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BoardView;
