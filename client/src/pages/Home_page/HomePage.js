/** @format */

import React, { useState, useEffect } from "react";
import "./HomePage.css";
import NavigationBar from "../../components/Navbar/Navbar";
import SideMenu from "../../components/Navbar/Sidebar";
import Footer from "../../components/footer/Footer";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPlus, faUser, faX } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function HomePage() {
  const [isOpen, setIsOpen] = useState(false);

  const [priorityTasks, setPriorityTasks] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [privateMessages, setPrivateMessages] = useState([]);
  const [publicMessages, setPublicMessages] = useState([]);
  const [recentTasks, setRecentTasks] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [currentDateTime, setCurrentDateTime] = useState(moment());

  const handleSelectChange = (event) => {
    setSelectedProject(event.target.value);
  };
  const token = localStorage.getItem("token");
  useEffect(() => {
    //Fetch Private Message
    const fetchMessages = async () => {
      const response = await axios.get("http://localhost:3006/conversations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const publicConvoIds = response.data.public.map((conversation) => conversation[0]._id);
      const privateConvoIds = response.data.private.map((conversation) => conversation[0]._id);

      const privateMessages = await Promise.all(
        privateConvoIds.map(async (privateConvoId) => {
          const msgResponse = await axios.get(
            `http://localhost:3005/conversations/${privateConvoId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          return msgResponse.data.receivedMessages
            .sort((a, b) => {
              return new Date(a.sentAt) - new Date(b.sentAt);
            })
            .slice(0, 5)
            .map(({ conversationId, ...rest }) => rest);
        })
      );

      const publicMessages = await Promise.all(
        publicConvoIds.map(async (publicConvoId) => {
          const msgResponse = await axios.get(
            `http://localhost:3005/conversations/${publicConvoId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          return msgResponse.data.receivedMessages
            .sort((a, b) => {
              return new Date(a.sentAt) - new Date(b.sentAt);
            })
            .slice(0, 5)
            .map(({ conversationId, ...rest }) => rest);
        })
      );

      setPrivateMessages(privateMessages);
      setPublicMessages(publicMessages);
    };
    fetchMessages();
    // Fetch tasks from backend
    axios
      .get("http://localhost:3003/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPriorityTasks(response.data);
      });

    // Fetch co-team-members from backend
    axios
      .get(`http://localhost:3002/projects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setAllProjects(response.data));
    const fetchUserList = async () => {
      if (selectedProject !== "") {
        try {
          const response = await axios.get(
            `http://localhost:3002/projects/${selectedProject}/users`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const userIds = response.data.map((user) => user.userId);
          const users = await Promise.all(
            userIds.map(async (userId) => {
              const userResponse = await axios.get(
                `http://localhost:9000/user/search?userId=${userId}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              return userResponse.data;
            })
          );
          setTeamMembers(users); // Array of user data objects
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchUserList();

    //Fetch recent tasks from backend
    const fetchTaskList = async () => {
      try {
        const response = await axios.get("http://localhost:3003/tasks/recent", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const updatedTaskList = await Promise.all(
          response.data.map(async (task) => {
            const project = await axios.get(`http://localhost:3002/projects/${task.projectId}`, {
              headers: {
                Authorization: "JWT " + token,
              },
            });
            const projectTitle = project.data.project_title;
            return { ...task, projectTitle };
          })
        );
        setRecentTasks(updatedTaskList);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTaskList();
    // const interval = setInterval(() => {
    //   setCurrentDateTime(moment());
    // }, 1000);
    // return () => clearInterval(interval);
  }, [selectedProject]);
  console.log(publicMessages)
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
              <div className="for-line d-flex mb-1">
                <div className=" d-flex align-items-center justify-content-center me-auto">
                  <span className="home-stream me-1">Streams</span>
                </div>
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

              <div className="messages-box" style={{ backgroundColor: "#fff" }}>
                {publicMessages.map((message) => (
                  <div className="d-flex">
                    <div className="home-profile-pic me-2">
                      <FontAwesomeIcon icon={faUser} style={{ color: "#FFFFFF" }} size="xl" />
                    </div>

                    <div className="d-flex flex-column me-auto">
                      <span className="home-contact-name">{message.senderUsername}</span>
                      <span className="msg">{message.message}</span>
                    </div>

                    <div className="d-flex flex-column align-items-center">
                      <span>
                        {message.sentAt
                          ? message.sentAt.toLocaleString("en-US", {
                              hour: "numeric",
                              minute: "numeric",
                            })
                          : ""}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="actual-date-time ms-auto mt-auto">
                <span className="me-2">{currentDateTime.format("MMMM Do YYYY, h:mm:ss a")}</span>
                <span></span>
              </div>
            </div>
          </div>

          <div className="part-2">
            <div className="high-priority-task-title mb-3">
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
                  <div className="d-flex high-priority-task mb-3">
                    <span>No high priority tasks found</span>
                  </div>
                )}
              </div>

              <div>
                <div className="home-team-members mb-4">
                  <span className="the-title me-auto">Team Members</span>
                  <div className="select-box">
                    <select
                      className="select"
                      value={selectedProject}
                      onChange={handleSelectChange}
                    >
                      {allProjects.map((project) => (
                        <option key={project._id} value={project._id}>
                          {project.project_title}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="d-flex mb-x">
                  {teamMembers.length === 0 ? (
                    <div>Oops! Seems Your Alone in this</div>
                  ) : (
                    <div className="d-flex mb-x">
                      {teamMembers.map((member) => (
                        <div className="team-member-box me-4">
                          <div className="home-profile-pic me-3">
                            <FontAwesomeIcon icon={faUser} style={{ color: "#FFFFFF" }} size="lg" />
                          </div>
                          <div className="d-flex flex-column">
                            <span className="team-member-name">
                              {member.firstname + member.lastname}
                            </span>
                            <span className="team-member-role">{member.username}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <div className="recent-div mb-4">
                    <span className="the-title">Recent</span>
                  </div>
                </div>
                {recentTasks &&
                  recentTasks.map((task) => (
                    <div className="team-member-box">
                      <div className="d-flex flex-column">
                        <span className="team-member-name">{task.name}</span>

                        <div className="d-flex align-items-center justify-content-center">
                          <span className="team-member-role me-2">Project</span>
                          <div className="bx">
                            <span className="team-member-role">{task.projectTitle}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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
