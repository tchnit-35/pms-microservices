import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Sidebar.css";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPeopleGroup,
  faFolder,
  faChevronDown,
  faClipboardList,
  faHouse,
  faMessage,
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
  const [publicConversations, setPublicConversations] = useState([]);
  const [privateConversations, setPrivateConversations] = useState([]);

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

    //Fetch Conversations from backend
    axios
      .get("http://localhost:3006/conversations/recent", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { publicConversations, privateConversations } = response.data;

        setPublicConversations(publicConversations);
        setPrivateConversations(privateConversations);
      });
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
  function isEmptyObject(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  const navigate = useNavigate();

  function moveToHome() {
    navigate("/HomePage");
  }
  //console.log(privateConversations)
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

            <div className="home" onClick={moveToHome}>
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
                      <FontAwesomeIcon icon={faMessage} />
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
              {isProjectOneVisible && (
                <>
                  {currentProjects.length === 0 ? (
                    <span className="project-name">No Current project found</span>
                  ) : (
                    <ul style={{ listStyle: "none" }}>
                      {currentProjects.map((project) => (
                        <li key={project._id}>
                          <FontAwesomeIcon
                            icon={faClipboardList}
                            style={{ color: "#9DC284" }}
                            size="sm"
                          />
                          <Link
                            to={`/Project/${project._id}`}
                            style={{ marginLeft: "10px", textDecoration: "none" }}
                            className="project-name"
                          >
                            {project.project_title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
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
              {isFutureProjectsVisible && (
                <>
                  {futureProjects.length === 0 ? (
                    <span className="project-name">No Future project found</span>
                  ) : (
                    <ul style={{ listStyle: "none" }}>
                      {futureProjects.map((project) => (
                        <li key={project._id}>
                          <FontAwesomeIcon
                            icon={faClipboardList}
                            style={{ color: "#9DC284" }}
                            size="sm"
                          />
                          <Link
                            to={`/Project/${project._id}`}
                            style={{ marginLeft: "10px", textDecoration: "none" }}
                            className="project-name"
                          >
                            {project.project_title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
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
              {isLegacyProjectsVisible && (
                <>
                  {legacyProjects.length === 0 ? (
                    <span style={{ marginLeft: "10px" }} className="project-name">
                      No Legacy project found
                    </span>
                  ) : (
                    <ul style={{ listStyle: "none" }}>
                      {legacyProjects.map((project) => (
                        <li key={project._id}>
                          <FontAwesomeIcon
                            icon={faClipboardList}
                            style={{ color: "#9DC284" }}
                            size="sm"
                          />
                          <Link
                            to={`/Project/${project._id}`}
                            style={{ marginLeft: "10px", textDecoration: "none" }}
                            className="project-name"
                          >
                            {project.project_title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="sidebar-about mb-4">
            <span>Streams</span>
          </div>
          <>
            <div className="public-stream">
              <span>Public</span>
            </div>

            <div>
            {publicConversations.map(
  (conversation) =>
    !isEmptyObject(conversation) && (
      <div className="streams mb-4" key={conversation._id}>
        <Link className="contact-name" to={`/conversations/${conversation._id}`}>
        <FontAwesomeIcon icon={faPeopleGroup} size='sm' style={{marginRight:"10px"}}/>
          {conversation.topic}
        </Link>
        <div className="last-message">
          {conversation.message || conversation.time ? (
            <>
              {conversation.time && (
                <span className="me-3">{conversation.time}</span>
              )}
              {conversation.message ? (
                <span className="message">
                  {conversation.message.length > 20
                    ? conversation.message.substring(0, 17) + "..."
                    : conversation.message}
                </span>
              ) : (
                <span>No message sent yet</span>
              )}
            </>
          ) : (
            <span>No message sent yet</span>
          )}
        </div>
      </div>
    )
)}
            </div>

            <div className="private-stream">
              <span>Private</span>
            </div>

            <div>
            {privateConversations.map(
  (conversation) =>
    !isEmptyObject(conversation) && (
      <div className="streams mb-4" key={conversation._id}>
        <Link className="contact-name" to={`/conversations/${conversation._id}`}>
        <FontAwesomeIcon icon={faPeopleGroup} size='sm' style={{marginRight:"10px"}}/>
          {conversation.topic}
        </Link>
        <div className="last-message">
          {conversation.message || conversation.time ? (
            <>
              {conversation.time && (
                <span className="me-3">{conversation.time}</span>
              )}
              {conversation.message ? (
                <span className="message">
                  {conversation.message.length > 20
                    ? conversation.message.substring(0, 17) + "..."
                    : conversation.message}
                </span>
              ) : (
                <span>No message sent yet</span>
              )}
            </>
          ) : (
            <span>No message sent yet</span>
          )}
        </div>
      </div>
    )
)}
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
