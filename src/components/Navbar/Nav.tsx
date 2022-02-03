import "./Nav.css";
import { Navbar, Container } from "react-bootstrap";

export const Nav = () => {
  return (
    <>
      <Navbar bg="dark">
        <Container>
          <Navbar.Brand href="#home" className="text-white">Home</Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
};
