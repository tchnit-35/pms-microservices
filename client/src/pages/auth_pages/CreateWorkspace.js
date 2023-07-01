import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";


import { Link } from "react-router-dom";

function CreateWorkspace() {
  return (
    <section>
      <div className="wave wave1"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>
      <div className="wave wave2"></div>
      <Container className='p-4'>
                <Container className='p-4 d-flex flex-column align-items-center'>
                    <div className='text-center mb-4'>
                        <h3 className='mb-3'>Wellcome to Taskid</h3>
                        <p>Let's create your first project</p>
                    </div>
                    <div>
                        <Form.Label>Name your project name</Form.Label>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control className="" type="text" placeholder="(Project or Team name)" />
                        </Form.Group>
                        <Form.Label>Who's on your team</Form.Label>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control className="" type="text" placeholder="Enter the emails of your team mates" />
                            <Form.Text className="text-muted">
                                Invite your team mates so they can see what you are working on.
                            </Form.Text>
                        </Form.Group>
                    </div>
                    <div>
                        <Link to="/Project">
                        <Button variant="primary mt-3 mb-3" type="submit" className="btn-custom">
                            Create your Workspace
                        </Button>
                        </Link>

                    </div>

                </Container>
            </Container>
    </section>
  );
}

export default CreateWorkspace;
