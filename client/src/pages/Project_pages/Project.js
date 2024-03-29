import React, { useEffect, useState, useRef } from "react";
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
  faClone,
  faCloudArrowUp,
  faDownload,
  faTrash,
  faCopy,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";

import ListView from "../../components/List_view/ListView";
import { Process } from "../../components/Timeline_view/Process";

import UpdateProject from "./UpdateProject";
import BoardView from "../../components/bord_view/BoardView";
import Dashboard from "../../components/Dashboard/Dashboard";

function Project(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeView, setActiveView] = useState("list");
  const [viewContent, setViewContent] = useState("list");
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState(null);

  const [show, setShow] = useState(false);

  const token = localStorage.getItem("token");
  const popoverRef = useRef(null);

  useEffect(() => {
   // console.log("activeView", activeView);
  }, [activeView]);

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
      case "board":
        setViewContent("board");
        break;
      case "Files":
        setViewContent("Files");
        break;
      case "dashboard":
        setViewContent("dashboard");
        break;
      default:
        setViewContent("list");
    }
  };

  const getViewClass = (view) => {
    switch (view) {
      case "list":
        return activeView === "list" ? "active grant" : "";
      case "timeline":
        return activeView === "timeline" ? "active grant" : "";
      case "board":
        return activeView === "board" ? "active grant" : "";
      case "dashboard":
        return activeView === "dashboard" ? "active grant" : "";
      default:
        return "";
    }
  };

  if (!projectData) {
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
            <OverlayTrigger
              trigger="click"
              placement="bottom"
              rootClose={true}
              overlay={
                <Popover className="update-popover unselectable" ref={popoverRef}>
                  <Popover.Body className="custom-popover-body">
                    <div className="update-project-btn" onClick={handleShow}>
                      <span className="me-2">Project Details</span>
                      <FontAwesomeIcon icon={faPencil} />
                    </div>
                    <div className="copy-link-btn">
                      <FontAwesomeIcon
                        icon={faCopy}
                        className="me-1"
                        style={{ color: "rgb(18, 18, 18, 0.6)" }}
                      />
                      <span>Copy project link</span>
                    </div>
                    <div className="copy-link-btn">
                      <FontAwesomeIcon
                        icon={faFloppyDisk}
                        className="me-1"
                        style={{ color: "rgb(18, 18, 18, 0.6)" }}
                      />
                      <span>Save as template</span>
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
                      <span className="me-2">Delete Project</span>
                    </div>
                  </Popover.Body>
                </Popover>
              }
            >
              <div className="d-flex align-items-center me-auto">
                <p className="p-name me-1">{projectData.project_title}</p>
                <FontAwesomeIcon icon={faChevronDown} size="xs" className="icon me-auto" />
              </div>
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
              <div
                className={`${getViewClass("board")} me-4`}
                onClick={() => handleViewClick("board")}
              >
                Board
              </div>

              <div className={`${getViewClass("")} me-4`} onClick={() => handleViewClick("")}>
                Files
              </div>
              <div
                className={`${getViewClass("dashboard")} me-4`}
                onClick={() => handleViewClick("dashboard")}
              >
                Dashboard
              </div>
            </div>
          </div>

          {/*deleted css class here "view-content"*/}
          <div className="">
            {/*list body*/}

            {viewContent === "list" && <ListView />}

            {/*Timeline body*/}

            {viewContent === "timeline" && <Process />}

            {/*Board body*/}

            {viewContent === "board" && <BoardView />}

            {viewContent === "dashboard" && <Dashboard /> }

            {!viewContent && <p>No view content selected.</p>}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Project;
