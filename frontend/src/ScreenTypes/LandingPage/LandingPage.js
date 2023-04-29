import React from "react";
import "./LandingPage.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

const LandingPage = () => {
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to ConnectHUB</h1>
              <p className="subtitle">A place to discover your potential</p>
              <div className="button-container">
                <Button className="landingbutton" variant="primary" size="lg">
                  Sign Up
                </Button>
                <Button
                  className="landingbutton"
                  variant="outline-primary"
                  size="lg"
                >
                  Log In
                </Button>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
