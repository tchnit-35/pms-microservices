import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Project.css";

import NavigationBar from "../../components/Navbar/Navbar";
import SideMenu from "../../components/Navbar/Sidebar";
import Footer from "../../components/footer/Footer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

import ListView from "../../components/List_view/ListView";
import { Process } from "../../components/Timeline_view/Process";

function Project() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeView, setActiveView] = useState("grant");
  const [viewContent, setViewContent] = useState("list");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
        console.log("Unknown view selected:", view);
        setViewContent("list");
    }
    console.log("viewContent:", viewContent);
  };

  const getViewClass = (view) => {
    return activeView === view ? "grant active" : "revoke";
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

          <div className="views mb-2 unselectable">
            <div className="views-container">
              <div
                className={`${getViewClass("overview")} me-4`}
                onClick={() => handleViewClick("overview")}
              >
                Overview
              </div>
              <div
                className={`${getViewClass("grant")} me-4`}
                onClick={() => handleViewClick("grant")}
              >
                List
              </div>
              <div
                className={`${getViewClass("revoke")} me-4`}
                onClick={() => handleViewClick("revoke")}
              >
                Timeline
              </div>
              <div
                className={`${getViewClass("kanban")} me-4`}
                onClick={() => handleViewClick("kanban")}
              >
                Board
              </div>
              <div
                className={`${getViewClass("dashbord")} me-4`}
                onClick={() => handleViewClick("dashbord")}
              >
                Dashboard
              </div>
              <div
                className={`${getViewClass("files")} me-4`}
                onClick={() => handleViewClick("files")}
              >
                Files
              </div>
              <div
                className={`${getViewClass("teams")} me-4`}
                onClick={() => handleViewClick("teams")}
              >
                Teams
              </div>
            </div>
          </div>

          <div className="view-content">

            {/*list body*/}

            {viewContent === "list" && <ListView />}

            {/*Timeline body*/}

            {viewContent === "timeLine" && <Process />}

            {!viewContent && <p>No view content selected.</p>}

            

          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Project;
