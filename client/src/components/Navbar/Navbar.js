import React from "react";
import { useNavigate } from "react-router-dom";


import "bootstrap/dist/css/bootstrap.min.css";
import "./Navbar.css";

import Container from "react-bootstrap/Container";
import { Form, InputGroup, FormControl } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";

import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
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
  const [userInfo, setUserInfo] = React.useState(null);
  // Get the JWT token from local storage
    const token = localStorage.getItem("token");
  const handleUserClick = () => setShowUser(!showUser); // function for showing/hiding the popover
  React.useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:9000/user',{
        headers: {
        Authorization: `Bearer ${token}`,
      },});
      setUserInfo(response.data);
      
    };
    fetchData();console.log({user:userInfo})
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
        // Logout successful
        console.log("jwt token:", token);
  
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
          <span style={{color: '#824C71' , fontWeight:'bold'}}>{userInfo.username}</span>
          <span style={{color: '#4A2545',fontWeight:'lighter' }}>{userInfo.email}</span>
        </div>
      ) : (
        <div className="user-name-email">Loading...</div>
      )}
        </div>
        <div className="settings" onClick={() => navigate('/settings')}>
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
            <FontAwesomeIcon icon={faBars} style={{ color: "#ffffff" }} size="sm"/>
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

            <Nav.Link>
              <div className="aid me-4">
                <FontAwesomeIcon icon={faQuestion} style={{ color: "#12664F" }} size="xs" />
              </div>
            </Nav.Link>

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
