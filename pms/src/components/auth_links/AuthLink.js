import "bootstrap/dist/css/bootstrap.min.css";

import Button from "react-bootstrap/esm/Button";

import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AuthLink = ({ to, icon, text }) => {
  return (
    <div>
      <Link to={to} className="strip">
        <Button
          variant="light"
          size="lg"
          className="form-control auth-btn d-flex align-items-center mb-4"
        >
          <FontAwesomeIcon icon={icon} size="sm" className="mr-2" />
          <span className="flex-grow-1">{text}</span>
        </Button>
      </Link>
    </div>
  );
};

export default AuthLink;
