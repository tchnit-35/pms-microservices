import React, { useState } from "react";

import "./HomePage.css";
import NavigationBar from "../../components/Navbar/Navbar";
import SideMenu from "../../components/Navbar/Sidebar";
import Footer from "../../components/footer/Footer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus, faUser, faX } from "@fortawesome/free-solid-svg-icons";

function HomePage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
        <NavigationBar handleClick={toggleMenu} />
        <SideMenu isOpen={isOpen} />

        <div className="flex-grow-1 the-home-container">
          <div className="part-1 me-5">
            <div className="mb-2">
              <span className="the-title">Inbox</span>
            </div>

            <div className="home-inbox d-flex flex-column">
              <div class="for-line d-flex mb-1">
                <div className=" d-flex align-items-center justify-content-center me-auto">
                  <span className="home-stream me-1">Streams</span>
                  <div className="unread">1</div>
                </div>

                <span className="home-private  me-4">Private</span>

                <span className="home-public">Public</span>
              </div>

              <div className="d-flex align-items center mb-3">
                <div className="mark-read me-3">
                  <FontAwesomeIcon icon={faCheck} className="me-1" />
                  <span>Mark as read</span>
                </div>

                <div className="delete-all">
                  <FontAwesomeIcon icon={faX} className="me-1" />
                  <span>Delete All</span>
                </div>
              </div>

              <div className="messages-box">
                <div className="d-flex">
                  <div className="home-profile-pic me-2">
                    <FontAwesomeIcon icon={faUser} style={{ color: "#FFFFFF" }} size="xl" />
                  </div>

                  <div className="d-flex flex-column me-auto">
                    <span className="home-contact-name">Ashlyn Lee</span>
                    <span className="msg">Hey There! Looking great</span>
                  </div>

                  <div className="d-flex flex-column align-items-center">
                    <span>12:47</span>
                    <div className="unread">1</div>
                  </div>
                </div>
              </div>
              <div className="actual-date-time ms-auto mt-auto">
                <span className="me-2">Monday, 04 jul 2020</span>
                <span>13:50</span>
              </div>
            </div>
          </div>

          <div className="part-2">
            <div className="mb-2">
              <span className="the-title">High Priority Tasks</span>
            </div>
            <div className="home-task">
              <div className="d-flex high-priority-task">
                <span className="the-task me-5">Task_lambda</span>
                <div className="from-project me-auto">
                  <span className="the-project">project_X</span>
                </div>
                <div>
                  <span className="me-3">14 jul</span>
                  <span className="task-state">In Progress</span>
                </div>
              </div>

              <div>
                <div className="home-team-memebers mb-4">
                  <span className="the-title me-auto">Team Memebers</span>
                  <FontAwesomeIcon icon={faPlus} size="xl" />
                </div>

                <div className="d-flex mb-x">
                  <div className="team-member-box me-4">
                    <div className="home-profile-pic me-3">
                      <FontAwesomeIcon icon={faUser} style={{ color: "#FFFFFF" }} size="lg" />
                    </div>

                    <div className="d-flex flex-column">
                      <span className="team-member-name">Ashlyn Lee</span>
                      <span className="team-member-role">Community Manager</span>
                    </div>
                  </div>

                  <div className="team-member-box">
                    <div className="home-profile-pic me-3">
                      <FontAwesomeIcon icon={faUser} style={{ color: "#FFFFFF" }} size="lg" />
                    </div>

                    <div className="d-flex flex-column">
                      <span className="team-member-name">Leanna Yonsi</span>
                      <span className="team-member-role">Sales Manager</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="mb-4">
                    <span className="the-title">Recent</span>
                  </div>
                </div>

                <div className="team-member-box">
                  <div className="d-flex flex-column">
                    <span className="team-member-name">Task_lambda</span>

                    <div className="d-flex align-items-center justify-content-center">
                      <span className="team-member-role me-2">Project</span>
                      <div className="bx">
                        <span className="team-member-role">Project_X</span>
                      </div> 

                    </div>

                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default HomePage;
