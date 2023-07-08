import React from "react";
import { useNavigate } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import axios from "axios";

const CreateProject = () => {
  const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      const form = e.target;
      const projectName = form.elements.projectName.value;

      if (!projectName) {
        alert("Please fill in all the fields");
        return;
      }

    const projectData = {
      project_title: projectName
    };

    const token = localStorage.getItem("token");
    axios
      .post("http://localhost:3002/projects/", projectData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // handle the response from the backend
        console.log(response.data);
        navigate("/Project"); // redirect the user to the projects page
      })
      .catch((error) => {
        // handle the error
        console.error(error);
      });
  };

  return (
    <section>
      <div className="wave wave1"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>
      <div className="wave wave2"></div>
      <Container className="p-4">
        <Container className="p-4 d-flex flex-column align-items-center">
          <div className="text-center mb-4">
            <h3 className="mb-3">Welcome to Taskid</h3>
            <p>Let's create your first project</p>
          </div>
          <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center justify-content-center">
            <div>
              <Form.Label className="d-flex justify-content-center">
                Name your project name
              </Form.Label>
              <Form.Group className="mb-4" controlId="projectName">
                <Form.Control
                  className=""
                  type="text"
                  name="projectName"
                  placeholder="(Project or Team name)"
                />
              </Form.Group>
              <Form.Text className="text-muted d-flex justify-content-center">
                You can modify the information to suit your liking any time letter.
              </Form.Text>
            </div>
            <div>
              <Button variant="primary mt-3 mb-3" type="submit" className="btn-custom">
                Continue
              </Button>
            </div>
          </form>
        </Container>
      </Container>
    </section>
  );
};

export default CreateProject;
