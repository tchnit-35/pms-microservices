import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css";

import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/esm/Button';

import {Link} from 'react-router-dom';

function Confirm () {
    return(
        <section>
      <div className="wave wave1"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>
      <div className="wave wave2"></div>
      <Container className='p-5'>
                <Container className='d-flex flex-column  p-4 my-container2'>
                    <div className='text-center'>
                        <h3 className='mb-4'>TaskAID</h3>
                        <p>we'll use your details from ****** to create your account</p>
                    </div>
                    <div>
                        <h6>email</h6>
                        <p>.....email here.....</p>
                        <h6>Full Name</h6>
                        <p>.....full name here.....</p>
                    </div>
                    <div>
                        <Link to="/CreateWorkspace">
                        <Button variant="primary mt-3 mb-3" type="submit" className="form-control btn-custom">
                            Confirm your account
                        </Button>
                        </Link>
                    </div>
                </Container>
            </Container>
    </section>
    );
}
export default Confirm;