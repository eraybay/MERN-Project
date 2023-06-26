import React from "react";
import "./LandingPage.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  {
    /*useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo) {
      history.pushState("/myNotes");
    }
  }, [history]);*/
  }
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to ConnectHUB</h1>
              <p className="subtitle">A place to discover your potential</p>
              <div className="button-container">
                <Link to="/register">
                  <Button className="landingbutton" variant="primary" size="lg">
                    Sign Up
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    className="landingbutton"
                    variant="outline-primary"
                    size="lg"
                  >
                    Sign in
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
