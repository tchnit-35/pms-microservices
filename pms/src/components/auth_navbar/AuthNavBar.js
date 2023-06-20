import "bootstrap/dist/css/bootstrap.min.css";
import "./AuthNavBar.css"

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function AuthNavBar() {
  return (
    <Navbar expand="lg" className="custom-nav">
      <Container>
        <Navbar.Brand href="#">TaskAID</Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default AuthNavBar;