import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./SettingsSidebar.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faBell,
  faUser,
  faGear,
} from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

const SettingsSidebar = ({ isOpen }) => {
  const [isProjectOneVisible, setIsProjectOneVisible] = useState(false);
  const [isFutureProjectsVisible, setIsFutureProjectsVisible] = useState(false);
  const [isLegacyProjectsVisible, setIsLegacyProjectsVisible] = useState(false);

  const [currentProjects, setCurrentProjects] = useState([]);
  const [futureProjects, setFutureProjects] = useState([]);
  const [legacyProjects, setLegacyProjects] = useState([]);
  const [publicConversations, setPublicConversations] = useState([]);
  const [privateConversations, setPrivateConversations] = useState([]);

  const token = localStorage.getItem("token");
  console.log(token);

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
  console.log(privateConversations);
  console.log(legacyProjects);

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


  return (
    <>
      <div className={`sidemenu ${isOpen ? "sidemenu-open" : "closed"}`}>
        <div className="sb">

        <div className="sidebar-about">
            <span>Settings</span>
          </div>

          <div className="sidebar-navigate unselectable">
            <div className="home" onClick={moveToHome}>
              <table>
                <tbody>
                  <tr>
                    <td style={{ padding: "4px" }}>
                      <FontAwesomeIcon icon={faHouse} />
                    </td>
                    <td>
                      <span>Home</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="sidebar-profile">
              <table>
                <tbody>
                  <tr>
                    <td style={{ padding: "4px" }}>
                      <FontAwesomeIcon icon={faUser} />
                    </td>
                    <td>
                      <span>Profile</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="Preferences">
              <table>
                <tbody>
                  <tr>
                    <td style={{ padding: "4px" }}>
                      <FontAwesomeIcon icon={faGear} />
                    </td>
                    <td>
                      <span>Preferences</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsSidebar;
