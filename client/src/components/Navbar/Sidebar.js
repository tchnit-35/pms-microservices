import React, { useState } from "react";

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
} from "@fortawesome/free-solid-svg-icons";

const SideMenu = ({ isOpen }) => {
  const [isProjectOneVisible, setIsProjectOneVisible] = useState(false);
  const [isFutureProjectsVisible, setIsFutureProjectsVisible] = useState(false);
  const [isLegacyProjectsVisible, setIsLegacyProjectsVisible] = useState(false);

  const handleCurrentProjectsClick = () => {
    setIsProjectOneVisible(!isProjectOneVisible);
  };

  const handleFutureProjectsClick = () => {
    setIsFutureProjectsVisible(!isFutureProjectsVisible);
  };

  const handleLegacyProjectsClick = () => {
    setIsLegacyProjectsVisible(!isLegacyProjectsVisible);
  };

  return (
    <>
      <div className={`sidemenu ${isOpen ? "sidemenu-open" : "closed"}`}>
        <div className="sb">
          <div className="navigate unselectable">
            <div className="home">
              <table>
                <tr>
                  <td style={{ padding: "3px" }}>
                    <FontAwesomeIcon icon={faHouse} />
                  </td>
                  <td>
                    <span>Home</span>
                  </td>
                </tr>
              </table>
            </div>

            <div className="my-task">
              <table>
                <tr>
                  <td style={{ padding: "3px" }}>
                    <FontAwesomeIcon icon={faTag} />
                    </td>
                    <td>
                    <span>My task</span>
                  </td>
                </tr>
              </table>
            </div>

            <div className="inbox">
            <table>
            <tr>
            <td style={{ padding: "3px" }}>
              <FontAwesomeIcon icon={faBell} />
              </td>
              <td>
              <span>Inbox</span>
              </td>
              </tr>
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
                </table>
              </div>
              {isProjectOneVisible && (
                <>
                  <div className="project unselectable">
                    <FontAwesomeIcon icon={faClipboardList} style={{ color: "9DC284" }} size="lg" />
                    <span className="project-name">project_one</span>
                  </div>
                  <div className="project unselectable">
                    <FontAwesomeIcon icon={faClipboardList} style={{ color: "9DC284" }} size="lg" />
                    <span className="project-name">project_two</span>
                  </div>
                </>
              )}
            </div>

            {/*future projects*/}

            <div>
              <div className="folder unselectable" onClick={handleFutureProjectsClick}>
                <table>
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
                </table>
              </div>
              {isFutureProjectsVisible && (
                <div className="project unselectable">
                  <FontAwesomeIcon icon={faClipboardList} style={{ color: "9DC284" }} size="lg" />
                  <span className="project-name">project_X</span>
                </div>
              )}
            </div>

            {/*legacy projects*/}

            <div>
              <div className="folder unselectable" onClick={handleLegacyProjectsClick}>
                <table>
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
                </table>
              </div>
              {isLegacyProjectsVisible && (
                <>
                  <div className="project unselectable">
                    <FontAwesomeIcon icon={faClipboardList} style={{ color: "9DC284" }} size="lg" />
                    <span className="project-name">project_I</span>
                  </div>
                  <div className="project unselectable">
                    <FontAwesomeIcon icon={faClipboardList} style={{ color: "9DC284" }} size="lg" />
                    <span className="project-name">project_II</span>
                  </div>
                </>
              )}
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
