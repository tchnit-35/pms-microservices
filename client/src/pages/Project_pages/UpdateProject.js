import "./UpdateProject.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { Stack } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function UpdateProject(props) {
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleClose}
        dialogClassName="modal-50w"
        className="update-project-modal"
      >
        <Modal.Header className="custom-modal-header" closeButton>
          <Modal.Title className="custom-modal-title">Project details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="custom-modal-form">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="the-h">Title</Form.Label>
              <Form.Control type="text" placeholder="" className="custom-input" />
            </Form.Group>

            <Stack direction="horizontal" className="date">
              <div className="the-project-owner mb-4">
                <span className="the-h mb-2">Owner</span>
                <div className="d-flex align-items-center">
                  <div className="user-image me-2">
                    <FontAwesomeIcon icon={faUser} style={{ color: "#FFFFFF" }} />
                  </div>
                  <span className="the-user-name">User_name</span>
                </div>
              </div>

              <Form.Group
                className="modify-date-input mb-3 mx-auto me-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="the-h">Start date</Form.Label>
                <Form.Control type="date" placeholder="" className="custom-input" />
              </Form.Group>
              <Form.Group
                className="modify-date-input mb-3 mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className="the-h">Due Date</Form.Label>
                <Form.Control type="date" placeholder="" className="custom-input" />
              </Form.Group>
            </Stack>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label className="the-h">Project description</Form.Label>
              <Form.Control as="textarea" className="custom-input" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex align-items-center justify-content-center">
          <Button variant="primary" className="ctm-btn" onClick={props.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UpdateProject;
