import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Project.css";

import NavigationBar from "../../components/Navbar/Navbar";
import SideMenu from "../../components/Navbar/Sidebar";
import Footer from "../../components/footer/Footer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faPlus } from "@fortawesome/free-solid-svg-icons";

function Project() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeView, setActiveView] = useState("list");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleViewClick = (view) => {
    setActiveView(view);
  };

  const getViewClass = (view) => {
    return activeView === view ? "list active" : "gantt";
  };

  return (
    <>
      <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
        <NavigationBar handleClick={toggleMenu} />
        <SideMenu isOpen={isOpen} />

        <div className="flex-grow-1 the-container">
          {/*project name & share botton*/}

          <div className="d-flex align-items-center heading">
            <p className="p-name me-auto">Project_one</p>
            <div className="share">
              <span className="me-1">Share</span>
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="sm" />
            </div>
          </div>

          {/*Different Views*/}

          <div className="views unselectable">
            <div className="views-container">
              <div
                className={`${getViewClass("overview")} me-4`}
                onClick={() => handleViewClick("overview")}
              >
                Overview
              </div>
              <div
                className={`${getViewClass("list")} me-4`}
                onClick={() => handleViewClick("list")}
              >
                List
              </div>
              <div
                className={`${getViewClass("gantt")} me-4`}
                onClick={() => handleViewClick("gantt")}
              >
                Gantt
              </div>
              <div
                className={`${getViewClass("kanban")} me-4`}
                onClick={() => handleViewClick("kanban")}
              >
                Kanban
              </div>
              <div
                className={`${getViewClass("files")} me-4`}
                onClick={() => handleViewClick("files")}
              >
                Files
              </div>
              <div
                className={`${getViewClass("more")} me-4`}
                onClick={() => handleViewClick("more")}
              >
                More...
              </div>
            </div>

            {/*add task, filter, sort*/}


            <div>
              <div>
                <FontAwesomeIcon icon={faPlus} />
                <span>Add Task</span>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Project;
