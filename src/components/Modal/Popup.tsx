import "./Popup.css";
import { useState } from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";

interface ModalProps {
  text: string;
  variant: "primary" | "secondary" | "danger";
}

export const Popup = ({ text, variant }: ModalProps) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant={variant} className="m-2" onClick={handleShow}>
        {text}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{text}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="email">Email</InputGroup.Text>
            <FormControl
              aria-label="Small"
              aria-describedby="email"
              type="email"
            />
          </InputGroup>

          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="password">Password</InputGroup.Text>
            <FormControl
              aria-label="Small"
              aria-describedby="password"
              type='password'
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
