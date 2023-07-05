import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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
  const [activeView, setActiveView] = useState("list");
  const [viewContent, setViewContent] = useState("list");
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState(null);

  useEffect(() => {
    // Fetch project data from backend using projectId
    axios.get(`http://localhost:3002/projects/${projectId}`).then((response) => {
      setProjectData(response.data);
    });
  }, [projectId]);

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
    return activeView === view ? "active" : "";
  };

  if (!projectData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
        <NavigationBar handleClick={toggleMenu} />
        <SideMenu isOpen={isOpen} />

        <div className="flex-grow-1 the-container">
          {/*project name & share botton*/}

          <div className="d-flex align-items-center heading">
            <p className="p-name me-auto">{projectData.name}</p>
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
                onClick={() =>handleViewClick("timeline")}
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

export default Project;