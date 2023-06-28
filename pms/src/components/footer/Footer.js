import "./Footer.css"

import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright, faUserPlus } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <>
        <div className="custom-footer"> 
        <div className="me-auto copy-right">
        <FontAwesomeIcon icon={faCopyright} style={{color: "#ffffff"}} size="xs" />
        <span>TaskId v1.0.0</span>
        </div>

        <div className="invite-user">
            <FontAwesomeIcon icon={faUserPlus} style={{color: "#ffffff"}} size="xl" className="me-1" />
            <span>Invite New User</span>
        </div>
        </div>
    </>
  );
}

export default Footer;
