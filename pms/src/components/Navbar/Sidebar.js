import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faChevronDown, faClipboardList } from "@fortawesome/free-solid-svg-icons";

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
          <div className="sidebar-about">
            <span>Projects</span>
          </div>

          <div className="sidebar-content">
            {/*current projects*/}

            <div>
              <div className="folder unselectable" onClick={handleCurrentProjectsClick}>
                <FontAwesomeIcon icon={faFolder} style={{ color: "#FBE5A2" }} size="lg" />
                <span className="current-project">Current Projects</span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  rotation={isProjectOneVisible ? 180 : 0}
                  style={{ color: "#DEDEDE" }}
                  size="sm"
                />
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
                <FontAwesomeIcon icon={faFolder} style={{ color: "#CEA8BC" }} size="lg" />
                <span className="future-project">Future Projects</span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  rotation={isFutureProjectsVisible ? 180 : 0}
                  style={{ color: "#DEDEDE" }}
                  size="sm"
                />
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
                <FontAwesomeIcon icon={faFolder} style={{ color: "#DF8C85" }} size="lg" />
                <span className="legacy-project">Legacy Projects</span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  rotation={isLegacyProjectsVisible ? 180 : 0}
                  style={{ color: "#DEDEDE" }}
                  size="sm"
                />
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

          <div className="sidebar-about">
            <span>Streams</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
