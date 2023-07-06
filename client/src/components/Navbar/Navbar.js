import React from "react";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

import Container from "react-bootstrap/Container";
import {
  Form,
  InputGroup,
  FormControl,
  PopoverBody,
  Overlay,
  PopoverHeader,
} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faBell,
  faUser,
  faQuestion,
  faSearch,
  faArrowUpRightFromSquare,
  faGear,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

function NavigationBar({ handleClick }) {
  const navigate = useNavigate();
  const [showUser, setShowUser] = React.useState(false); // state for showing/hiding the popover
  const [showNotif, setShowNotif] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState(null);
  const [notif,setNotif] = React.useState(null)
  // Get the JWT token from local storage
  const token = localStorage.getItem("token");

  const handleUserClick = () => setShowUser(!showUser); // function for showing/hiding the popover
  const handleNotifClick = () => setShowNotif(!showNotif);

  React.useEffect(() => {

    // const fetchNotif = async () => {
    //   const response = await axios.get("http://localhost:9091/notifications", {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   });
      
    //   setUserInfo(response.data);
    // };
    // fetchNotif();

    const fetchData = async () => {
      const response = await axios.get("http://localhost:9000/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setUserInfo(response.data);
    };
    fetchData();
  }, []);
  const handleLogout = () => {
    //GET request to obtain user information

    // Make a GET request to the backend logout route
    axios
      .get("http://localhost:4000/auth/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        
  
        // Delete the token from local storage
        localStorage.removeItem("token");

        navigate("/");
      })
      .catch((error) => {
        // Logout failed
        console.log(error);
      });
  };

  const popover = (
    <Popover id="popover-user-info" className="custom-popover">
      <Popover.Body>
        <div className="mb-4">
          <h6 className="acc">ACCOUNT</h6>
        </div>
        <div className="user-info mb-4">
          <div className="profile-pic me-2">
            <FontAwesomeIcon icon={faUser} style={{ color: "#ffffff" }} size="xl" />
          </div>
          {userInfo ? (
            <div className="user-name-email">
              <span style={{ color: "#824C71", fontWeight: "bold" }}>{userInfo.username}</span>
              <span style={{ color: "#4A2545", fontWeight: "light" }}>{userInfo.email}</span>
            </div>
          ) : (
            <div className="user-name-email">Loading...</div>
          )}
        </div>
        <div className="settings" onClick={() => navigate("/settings")}>
          <span>Settings</span>
          <FontAwesomeIcon icon={faGear} />
        </div>
        <div className="logout" onClick={handleLogout}>
          <span>Logout</span>
          <FontAwesomeIcon icon={faArrowRightFromBracket} />
        </div>
      </Popover.Body>
    </Popover>
  );

  const notifPopover = (
    <Popover id="popover-notification" className="custom-notif-popover unselectable">
      <PopoverHeader className="custom-poper-head">Notifications</PopoverHeader>
      <PopoverBody className="custom-popover-body">

      {/*invitation notifiction*/}

        <div className="invitation-to-project mb-2">
          <div className="invite-msg me-2">
            <p>
              <span className="inviter">@User_name </span> has invited you to{" "}
              <span className="project-invited">project_name</span>
            </p>
          </div>
          <div className="accpet-refuse-btn">
            <div className="refuse-invitation me-2">
              <span>Delete</span>
            </div>

            <div className="accept-invitation">
              <span>Accept</span>
            </div>
          </div>
        </div>

        {/*task notification*/}
{/* {notif && notif.map((notif)=>( 
        <div className="task-notification mb-2">
          <div className="task-msg">
            <p className="t-msg">
              {notif.content}
            </p>
          </div>
        </div>
        ))
       
} */}
      </PopoverBody>
    </Popover>
  );

  return (
    <>
      <Navbar
        bg="light"
        expand="lg"
        className="custom-navbar p-2 sticky-top"
        style={{ maxHeight: "70px" }}
      >
        <Container fluid style={{ maxHeight: "30px" }}>
          <Navbar.Brand className="custom-bars" onClick={handleClick}>
            <FontAwesomeIcon icon={faBars} style={{ color: "#ffffff" }} size="sm" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />

          <Navbar.Collapse>
            <Form className="d-flex mx-auto">
              <InputGroup>
                <InputGroup.Text className="custon-icon">
                  <FontAwesomeIcon icon={faSearch} style={{ color: "#b9c0be" }} size="sm" />
                </InputGroup.Text>
                <FormControl type="search" placeholder="Search" className="custon-input" />
              </InputGroup>
            </Form>

            <OverlayTrigger
              trigger="click"
              placement="bottom"
              show={showNotif}
              overlay={notifPopover}
              rootClose
              onHide={() => setShowNotif(false)}
            >
              <Nav.Link onClick={handleNotifClick}>
                <div className="aid me-4">
                  <FontAwesomeIcon icon={faBell} style={{ color: "#ffF" }} size="lg" />
                </div>
              </Nav.Link>
            </OverlayTrigger>

            <OverlayTrigger
              trigger="click"
              placement="bottom"
              show={showUser}
              overlay={popover}
              rootClose
              onHide={() => setShowUser(false)}
            >
              <Nav.Link onClick={handleUserClick}>
                <div className="profile">
                  <FontAwesomeIcon icon={faUser} style={{ color: "#ffffff" }} size="sm" />
                </div>
              </Nav.Link>
            </OverlayTrigger>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;
