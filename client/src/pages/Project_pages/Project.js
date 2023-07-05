import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Project.css";

import { OverlayTrigger, Popover } from "react-bootstrap";

import NavigationBar from "../../components/Navbar/Navbar";
import SideMenu from "../../components/Navbar/Sidebar";
import Footer from "../../components/footer/Footer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faArrowUpRightFromSquare,
  faPencil,
  faCopy,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";

import ListView from "../../components/List_view/ListView";
import { Process } from "../../components/Timeline_view/Process";

import UpdateProject from "./UpdateProject";

function Project(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeView, setActiveView] = useState("list");
  const [viewContent, setViewContent] = useState("list");
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [show, setShow] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch project data from backend using projectId
    axios
      .get(`http://localhost:3002/projects/${projectId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((response) => {
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
        //console.log("Unknown view selected:", view);
        setViewContent("list");
    }
    //console.log("viewContent:", viewContent);
  };

  const getViewClass = (view) => {
    return activeView === view ? "active" : "";
  };

  if (!projectData) {
    console.log("projectData is null, returning loading message");
    return <div>Loading...</div>;
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
        <NavigationBar handleClick={toggleMenu} />
        <SideMenu isOpen={isOpen} />

        <div className="flex-grow-1 the-container">
          {/*project name & share botton*/}

          <div className="heading">
            <p className="p-name me-1">{projectData.singleProject.project_title}</p>

            <OverlayTrigger
              trigger="click"
              placement="bottom"
              overlay={
                <Popover className="update-popover unselectable">
                  <Popover.Body className="custom-popover-body">
                    <div className="update-project-btn" onClick={handleShow}>
                      <span className="me-2">Update Project</span>
                      <FontAwesomeIcon icon={faPencil} />
                    </div>
                    <div className="copy-link-btn">
                    <FontAwesomeIcon icon={faCopy} className="me-1" style={{color: "rgb(18, 18, 18, 0.6)"}}/>
                      <span>Copy project link</span>
                    </div>
                    <div className="copy-link-btn">
                    <FontAwesomeIcon icon={faFloppyDisk} className="me-1" style={{color: "rgb(18, 18, 18, 0.6)"}}/>
                      <span>Save layout as templat</span>
                    </div>
                    <div className="duplicate">
                      <span>Duplicate</span>
                    </div>
                    <div className="copy-link-btn">
                      <span>Import</span>
                    </div>
                    <div className="duplicate">
                      <span>Export</span>
                    </div>
                    <div className="copy-link-btn">
                      <span className="me-2">Delete Project</span>
                      
                    </div>
                  </Popover.Body>
                </Popover>
              }
            >
              <FontAwesomeIcon icon={faChevronDown} size="xs" className="icon me-auto" />
            </OverlayTrigger>

            <div className="share">
              <span className="me-1">Share</span>
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="sm" />
            </div>
          </div>

          <UpdateProject show={show} handleShow={handleShow} handleClose={handleClose} />

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

export default Project;
