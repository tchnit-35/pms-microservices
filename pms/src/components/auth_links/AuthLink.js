import "bootstrap/dist/css/bootstrap.min.css";
import "./AuthLink.css";
import Button from "react-bootstrap/esm/Button";
import axios from 'axios';

const AuthLink = ({ icon, text, endpoint }) => {
  const handleAuth = () => {
    axios
      .get(`http://localhost:4000${endpoint}`, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          // If the response is a redirect to the authentication page,
          // redirect the user to that page
          if (response.data.redirect) {
            window.location.href = response.data.redirect;
          }
        } else {
          throw new Error("Authentication failed.");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <Button
        variant="light"
        size="lg"
        className="form-control auth-btn d-flex align-items-center mb-4"
        onClick={handleAuth}
      >
        <img src={icon} alt={`${text} Icon`} className="mr-2 custom-icon" />
        <span className="flex-grow-1">{text}</span>
      </Button>
    </div>
  );
};

export default AuthLink;
