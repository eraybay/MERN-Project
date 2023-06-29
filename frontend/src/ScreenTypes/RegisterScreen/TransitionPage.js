import React from "react";
import MainScreenTemplate from "../../components/MainScreenTemplate";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./TransitionPage.css";

const TransitionPage = () => {
  return (
    <MainScreenTemplate title="Select your Profile Type">
      <Container className="aa justify-content-center">
        <Button className="inline-block" variant="primary" size="lg">
          <Link to="/register/userRegister">Create a User Profile </Link>
        </Button>
        <Button className="inline-block" variant="primary" size="lg">
          <Link to="/register/organizerRegister">
            Create a Organizer Profile{" "}
          </Link>
        </Button>
      </Container>
    </MainScreenTemplate>
  );
};

export default TransitionPage;
