import "./Hero.css";
import {Card, Button} from 'react-bootstrap'
import {Popup} from '../Modal/Popup'

export const Hero = () => {
  return (
    <>
      <div className="hero_container d-flex flex-row justify-content-center align-items-center">
        <div className="sub_card">
          <Card style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>Blog</Card.Title>
              <Card.Text>
                Road to enlightment!
              </Card.Text>
              <Popup text='Login' variant="primary" action="login"/>
              <Popup text='Register' variant="danger" action="signup"/>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};
