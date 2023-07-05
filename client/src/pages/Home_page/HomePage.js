import React, { useState, useEffect } from "react";

import "./HomePage.css";
import NavigationBar from "../../components/Navbar/Navbar";
import SideMenu from "../../components/Navbar/Sidebar";
import Footer from "../../components/footer/Footer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus, faUser, faX } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
function HomePage() {
  const [isOpen, setIsOpen] = useState(false);

  const [priorityTasks, setPriorityTasks] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [recentTasks, setRecentTasks] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const token = localStorage.getItem("token");
  useEffect(() => {
    // const interval = setInterval(() => {
    //   setCurrentDateTime(new Date());
    // }, 1000);
    // Fetch tasks from backend
    axios
      .get("http://localhost:3003/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setPriorityTasks(response.data);
      });

    // Fetch co-team-members from backend
    // axios
    //   .get("http://localhost:4040/teams", {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then((response) => setFutureProjects(response.data));

    // Fetch legacy projects from backend
    // axios
    //   .get("http://localhost:3003/tasks/recent", {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   .then((response) => setRecentTasks(response.data));

    // return () => clearInterval(interval);
  }, []);

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
              <span className="the-title p-2">Inbox</span>
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
                <span className="me-2">
                  {currentDateTime.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span>{currentDateTime.toLocaleTimeString("en-US")}</span>
              </div>
            </div>
          </div>

          <div className="part-2">
            <div className="mb-2">
              <span className="the-title p-3">High Priority Tasks</span>
            </div>
            <div className="home-task">
              <div className="d-flex high-priority-task flex-column">
                {priorityTasks.length ? (
                  priorityTasks
                    .sort((a, b) => new Date(a.endDate) - new Date(b.endDate))
                    .slice(0, 3)
                    .map((task) => (
                      <div className="d-flex high-priority-task" key={task._id}>
                        <span className="the-task me-5">{task.name}</span>
                        <div className="from-project me-auto">
                          <span className="the-project">{task.project}</span>
                        </div>
                        <div>
                          <span className="me-3">{task.startDate}</span>
                          <span className="task-state">{task.status}</span>
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="d-flex high-priority-task">
                    <span>No high priority tasks found</span>
                  </div>
                )}
              </div>

              <div>
                <div className="home-team-memebers mb-4">
                  <span className="the-title me-auto">Team Members</span>
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
