import React from "react";
import MainScreenTemplate from "../../components/MainScreenTemplate";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

const MyEventsAdmin = () => {
  return (
    <div>
      <MainScreenTemplate title="Events Published">
        <Button className="create-button" variant="primary" size="lg">
          <Link to="/create event">Create an Event</Link>
        </Button>
        <Card className="mt-5" style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Card Subtitle
            </Card.Subtitle>
            <Card.Text className="eventText">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.{" "}
              <a style={{ color: "primary" }} href="/">
                View More
              </a>
            </Card.Text>

            <Card.Link href="#">
              <Button>
                <Link>Edit the Event</Link>
              </Button>
            </Card.Link>
            <Card.Link href="#">
              <Button variant="danger">
                <Link>Delete</Link>
              </Button>
            </Card.Link>
          </Card.Body>
        </Card>
      </MainScreenTemplate>
    </div>
  );
};

export default MyEventsAdmin;
