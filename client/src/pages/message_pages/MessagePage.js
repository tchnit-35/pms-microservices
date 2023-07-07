import React, { useState } from "react";

import "./MessagePage.css";
import Form from "react-bootstrap/Form";

import NavigationBar from "../../components/Navbar/Navbar";
import SideMenu from "../../components/Navbar/Sidebar";
import Footer from "../../components/footer/Footer";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsis,
  faPenToSquare,
  faPeopleGroup,
  faPerson,
  faFaceSmile,
  faLink,
  faPaperPlane,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

function MessagePage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="d-flex flex-column" style={{ minHeight: "100vh" }}>
        <NavigationBar handleClick={toggleMenu} />
        <SideMenu isOpen={isOpen} />

        <div className="flex-grow-1 inbox-container">
          <div className="first-part">
            <div className="about-chats">
              <span className="chats me-auto">Chats</span>
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="me-3 new-chat"
                style={{ color: "rgb(18, 18, 18, 0.7)" }}
              />
              <FontAwesomeIcon
                icon={faEllipsis}
                className="filter-chats"
                style={{ color: "rgb(18, 18, 18, 0.8)" }}
              />
            </div>

            {/*team message*/}
            <div>
              <div className="a-team-message">
                <table className="me-auto">
                  <tbody>
                    <tr>
                      <td>
                        <FontAwesomeIcon
                          icon={faPeopleGroup}
                          className="me-3"
                          style={{ color: "rgb(18, 18, 18, 0.7)" }}
                          size="lg"
                        />
                      </td>
                      <td>
                        <div>
                          <span className="group-name">Project_name chat</span>
                          <div className="message-container">
                            <span className="sender me">user_name</span>
                            <span className="sender me-1">:</span>
                            <span className="grp-message">Hey Everyone</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="msg-time">
                  <span>12:47</span>
                </div>
              </div>
              <div className="seperator"></div>
            </div>

            {/*Private message*/}
            <div>
              <div className="a-private-message">
                <table className="me-auto">
                  <tbody>
                    <tr>
                      <td className="icon-position">
                        <FontAwesomeIcon
                          icon={faPerson}
                          className="me-4"
                          style={{ color: "rgb(18, 18, 18, 0.7)" }}
                          size="lg"
                        />
                      </td>
                      <td>
                        <div>
                          <span className="sender-name">User_name</span>
                          <div className="message-container">
                            <span className="grp-message">Fine Play</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="msg-time">
                  <span>16:03</span>
                </div>
              </div>
              <div className="seperator"></div>
            </div>
          </div>

          <div className="second-part">
            <div className="messages-box">
              <div className="the-date-box mx-auto">
                <span className="the-date">Yesterday</span>
              </div>

              <div className="your-msg me-auto">
                <div className="ctn">
                  <div className="the-user-pic me-2">
                    <FontAwesomeIcon icon={faUser} style={{ color: "#FFFFFF" }} size="xs" />
                  </div>
                  <div className="the-msg me-auto">
                    <span className="the-usernName">User_name</span>
                    <span className="message">Done here. Check it out </span>
                  </div>
                  <div className="the-time">
                    <span>12:47</span>
                  </div>
                </div>
              </div>

              <div className="my-msg ms-auto">
                <div className="the-msg me-auto">
                  <span className="message">Fine Play. </span>
                </div>
                <div className="the-time mx-auto">
                  <span>12:52</span>
                </div>
              </div>
            </div>

            <div className="text-area">
              <FontAwesomeIcon
                icon={faFaceSmile}
                style={{ color: "rgb(18, 18, 18, 0.4)" }}
                className="me-4"
              />
              <FontAwesomeIcon
                icon={faLink}
                style={{ color: "rgb(18, 18, 18, 0.4)" }}
                className="me-4"
              />

              <Form.Control
                type="text"
                placeholder="Type a Message"
                className="ctm-message-input"
              />

              <FontAwesomeIcon icon={faPaperPlane} />
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default MessagePage;
