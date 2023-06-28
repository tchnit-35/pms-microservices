import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Project.css";

import NavigationBar from "../../components/Navbar/Navbar";
import SideMenu from "../../components/Navbar/Sidebar";
import Footer from "../../components/footer/Footer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

function Project() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
        <NavigationBar handleClick={toggleMenu} />
        <SideMenu isOpen={isOpen} />

        <div className="flex-grow-1 the-container">

        {/*project name & share botton*/}

          <div className="d-flex align-items-center">
            <p className="p-name me-auto">Project_one</p>
            <div className="share">
              <span className="me-1">Share</span>
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} size="sm" />
            </div>
          </div>

          {/*Different Views*/}

        </div>
        <Footer />
      </div>
    </>
  );
}

export default Project;
