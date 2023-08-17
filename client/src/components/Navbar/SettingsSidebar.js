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
