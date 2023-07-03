import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faChevronDown,
  faClipboardList,
  faHouse,
  faBell,
  faTag,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

const SideMenu = ({ isOpen }) => {
  const [isProjectOneVisible, setIsProjectOneVisible] = useState(false);
  const [isFutureProjectsVisible, setIsFutureProjectsVisible] = useState(false);
  const [isLegacyProjectsVisible, setIsLegacyProjectsVisible] = useState(false);

  const [currentProjects, setCurrentProjects] = useState([]);
  const [futureProjects, setFutureProjects] = useState([]);
  const [legacyProjects, setLegacyProjects] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    // Fetch current projects from backend
    axios
      .get("http://localhost:3002/projects/current", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setCurrentProjects(response.data));

    // Fetch future projects from backend
    axios
      .get("http://localhost:3002/projects/future", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setFutureProjects(response.data));

    // Fetch legacy projects from backend
    axios
      .get("http://localhost:3002/projects/old", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setLegacyProjects(response.data));
  }, []);

  const handleCurrentProjectsClick = () => {
    setIsProjectOneVisible(!isProjectOneVisible);
  };

  const handleFutureProjectsClick = () => {
    setIsFutureProjectsVisible(!isFutureProjectsVisible);
  };

  const handleLegacyProjectsClick = () => {
    setIsLegacyProjectsVisible(!isLegacyProjectsVisible);
  };

  const Project = ({ icon, color, projectName }) => {
    return (
      <div className="project unselectable current-project-folder">
        <FontAwesomeIcon icon={icon} style={{ color: color }} size="lg" />
        <span className="project-name">{projectName}</span>
      </div>
    );
  };

  return (
    <>
      <div className={`sidemenu ${isOpen ? "sidemenu-open" : "closed"}`}>
        <div className="sb">
          <div className="navigate unselectable">
            <div className="cr">
              <table>
                <tbody>
                  <tr>
                    <td style={{ padding: "3px" }}>
                      <div className="create">
                        <FontAwesomeIcon icon={faPlus} size="2xs" />
                      </div>
                    </td>
                    <td>
                      <span>Create</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="home">
              <table>
                <tbody>
                  <tr>
                    <td style={{ padding: "3px" }}>
                      <FontAwesomeIcon icon={faHouse} />
                    </td>
                    <td>
                      <span>Home</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="my-task">
              <table>
                <tbody>
                  <tr>
                    <td style={{ padding: "3px" }}>
                      <FontAwesomeIcon icon={faTag} />
                    </td>
                    <td>
                      <span>My task</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="inbox">
              <table>
                <tbody>
                  <tr>
                    <td style={{ padding: "3px" }}>
                      <FontAwesomeIcon icon={faBell} />
                    </td>
                    <td>
                      <span>Inbox</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="sidebar-about">
            <span>Projects</span>
          </div>

          <div className="sidebar-content">
            {/*current projects*/}

            <div>
              <div className="folder unselectable" onClick={handleCurrentProjectsClick}>
                <table>
                  <tbody>
                    <tr>
                      <td style={{ padding: "3px" }}>
                        <FontAwesomeIcon icon={faFolder} style={{ color: "#FBE5A2" }} size="sm" />
                      </td>
                      <td style={{ padding: "3px" }}>
                        <span className="current-project">Current projects</span>
                      </td>
                      <td style={{ padding: "3px" }}>
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          rotation={isProjectOneVisible ? 180 : 0}
                          style={{ color: "#DEDEDE" }}
                          size="sm"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {isProjectOneVisible &&
                currentProjects.map((project) => (
                  <Project icon={faClipboardList} color="9DC284" projectName={project.name} />
                ))}
            </div>

            {/*future projects*/}

            <div>
              <div className="folder unselectable" onClick={handleFutureProjectsClick}>
                <table>
                  <tbody>
                    <tr>
                      <td style={{ padding: "3px" }}>
                        <FontAwesomeIcon icon={faFolder} style={{ color: "#CEA8BC" }} size="sm" />
                      </td>
                      <td style={{ padding: "3px" }}>
                        <span className="future-project">Future projects</span>
                      </td>
                      <td style={{ padding: "3px" }}>
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          rotation={isFutureProjectsVisible ? 180 : 0}
                          style={{ color: "#DEDEDE" }}
                          size="sm"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {isFutureProjectsVisible &&
                futureProjects.map((project) => (
                  <Project icon={faClipboardList} color="9DC284" projectName={project.name} />
                ))}
            </div>

            {/*legacy projects*/}

            <div>
              <div className="folder unselectable" onClick={handleLegacyProjectsClick}>
                <table>
                  <tbody>
                    <tr>
                      <td style={{ padding: "3px" }}>
                        <FontAwesomeIcon icon={faFolder} style={{ color: "#DF8C85" }} size="sm" />
                      </td>
                      <td style={{ padding: "3px" }}>
                        <span className="legacy-project">Legacy projects</span>
                      </td>
                      <td style={{ padding: "3px" }}>
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          rotation={isLegacyProjectsVisible ? 180 : 0}
                          style={{ color: "#DEDEDE" }}
                          size="sm"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {isLegacyProjectsVisible &&
                legacyProjects.map((project) => (
                  <Project icon={faClipboardList} color="9DC284" projectName={project.name} />
                ))}
            </div>
          </div>

          <div className="sidebar-about mb-4">
            <span>Streams</span>
          </div>

          <div className="public-stream">
            <span>Public</span>
          </div>

          <div>
            <div className="streams mb-4">
              <span className="contact-name">Ashlyn Lee</span>
              <div className="last-message">
                <span className="me-3">10:15</span>
                <span>Good job here!</span>
              </div>
            </div>
          </div>

          <div className="private-stream">
            <span>Private</span>
          </div>

          <div>
            <div className="streams mb-4">
              <span className="contact-name">Leanna Yonsi</span>
              <div className="last-message">
                <span className="me-3">17:41</span>
                <span className="msg">Check this out. What do you think ?</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
