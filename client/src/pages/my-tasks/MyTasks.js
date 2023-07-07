import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./MyTasks.css";
import ListView from "../../components/List_view/ListView";
import { Process } from "../../components/Timeline_view/Process";

import NavigationBar from "../../components/Navbar/Navbar";
import SideMenu from "../../components/Navbar/Sidebar";
import Footer from "../../components/footer/Footer";

import { OverlayTrigger, Popover } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faArrowUpRightFromSquare,
  faClone,
  faCloudArrowUp,
  faDownload,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

function MyTasks() {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(false);
  const popoverRef = useRef(null);
  const [activeView, setActiveView] = useState("list");
  const [viewContent, setViewContent] = useState("list");

  const handleViewClick = (view) => {
    setActiveView(view);
    switch (view) {
      case "list":
        setViewContent("list");
        break;
      case "timeline":
        setViewContent("timeline");
        break;
      default:
        //console.log("Unknown view selected:", view);
        setViewContent("list");
    }
    //console.log("viewContent:", viewContent);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const getViewClass = (view) => {
    return activeView === view ? "active" : "";
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
        <NavigationBar handleClick={toggleMenu} />
        <SideMenu isOpen={isOpen} />

        <div className="flex-grow-1 Mytask-container">
          <div className="heading">
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={
                <Popover className="update-popover unselectable" ref={popoverRef}>
                  <Popover.Body className="custom-popover-body">
                    <div className="update-project-btn" onClick={handleShow}>
                      <span className="me-2">Add task via email</span>
                      <FontAwesomeIcon icon={faPlus} />
                    </div>
                    <div className="duplicate">
                      <FontAwesomeIcon
                        icon={faClone}
                        className="me-1"
                        style={{ color: "rgb(18, 18, 18, 0.6)" }}
                      />
                      <span>Duplicate</span>
                    </div>
                    <div className="copy-link-btn">
                      <FontAwesomeIcon
                        icon={faCloudArrowUp}
                        className="me-1"
                        style={{ color: "rgb(18, 18, 18, 0.6)" }}
                      />
                      <span>Import</span>
                    </div>
                    <div className="duplicate">
                      <FontAwesomeIcon
                        icon={faDownload}
                        className="me-1"
                        style={{ color: "rgb(18, 18, 18, 0.6)" }}
                      />
                      <span>Export</span>
                    </div>
                    <div className="copy-link-btn">
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="me-1"
                        style={{ color: "rgb(18, 18, 18, 0.6)" }}
                      />
                      <span className="me-2">Delete Task</span>
                    </div>
                  </Popover.Body>
                </Popover>
              }
            >
              <div className="d-flex align-items-center me-auto">
                <p className="p-name me-1">My Tasks</p>
                <FontAwesomeIcon icon={faChevronDown} size="xs" className="icon me-auto" />
              </div>
            </OverlayTrigger>

            <div className="share">
              <span className="me-1">Share</span>
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="sm" />
            </div>
          </div>

           {/*Different Views*/}

           <div className="views mb-2 unselectable">
            <div className="views-container">
              <div
                className={`${getViewClass("list")} me-4`}
                onClick={() => handleViewClick("list")}
              >
                List
              </div>
              <div
                className={`${getViewClass("timeline")} me-4`}
                onClick={() => handleViewClick("timeline")}
              >
                Timeline
              </div>
            </div>
          </div>

          <div className="view-content">
            {/*list body*/}

            {viewContent === "list" && <ListView />}

            {/*Timeline body*/}

            {viewContent === "timeline" && <Process />}

            {!viewContent && <p>No view content selected.</p>}
          </div>


        </div>

        <Footer />
      </div>
    </>
  );
}

export default MyTasks;
