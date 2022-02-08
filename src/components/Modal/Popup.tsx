import "./Popup.css";
import { useState, useEffect } from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import axios from "axios";
import { Alert } from "react-bootstrap";

interface ModalProps {
  text: string;
  variant: "primary" | "secondary" | "danger";
  action: "signup" | "login";
}

export const Popup = ({ text, variant, action }: ModalProps) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [alert, showAlert] = useState(false);
  const [alertText, changeText]=useState(' ')

  const handleClose = () => setShow(false);
  const handleShow = () => {setShow(true); showAlert(false)};


  // Axios Api

  const handleClick = () => {
    const data = {
      email,
      password,
    };
    if (action == "signup") {
    
      axios
        .post("http://localhost:8000/user/register", data)
        .then((response) => {
          changeText(response.data[0].msg)
          showAlert(true)
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else
    {
      axios
      .post("http://localhost:8000/user/login", data)
      .then((response) => {

        changeText(response.data[0].msg)
        showAlert(true)
        if (response.data[0].msg == 'success'){
          localStorage.setItem('token', response.data[0].token)
          
        }
        
      })
      .catch((error) => {
        console.log(error);
      });
       
    }
  };
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
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>

          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text id="password">Password</InputGroup.Text>
            <FormControl
              aria-label="Small"
              aria-describedby="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Alert id="alert" show={alert} variant="danger">{alertText}</Alert>

          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            value={action}
            id="action_button"
            variant="primary"
            onClick={handleClick}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
