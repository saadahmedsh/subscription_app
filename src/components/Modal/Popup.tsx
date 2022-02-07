import "./Popup.css";
import { useState } from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import axios from 'axios'


const handleClick =  () =>
{
  
  const action=document.getElementById('action_button')?.getAttribute('value')
  if (action == 'signup')
  {
    const email=document.getElementById('email')?.getAttribute('value')
    const password=document.getElementById('password')?.getAttribute('value')

    const data={
      email,password
    }

    console.log(data)
    
    axios.post('http://localhost:8000/user/register', data)
    .then(response => console.log(response)  )
    .catch(error => {
      console.log(error)
    });

  }

}

interface ModalProps {
  text: string;
  variant: "primary" | "secondary" | "danger";
  action:"signup" | "login"
}

export const Popup = ({ text, variant, action }: ModalProps) => {
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
          <InputGroup size="sm" className="mb-3" >
            <InputGroup.Text  id="email">Email</InputGroup.Text>
            <FormControl
              aria-label="Small"
              aria-describedby="email"
              type="email"
            />
          </InputGroup>

          <InputGroup size="sm" className="mb-3" >
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
          <Button value={action} id='action_button' variant="primary" onClick={handleClick}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
