import React from "react";
import MainScreenTemplate from "../../components/MainScreenTemplate";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "./MyEventsAdmin.css";
import Badge from "react-bootstrap/Badge";
import { useEffect, useState } from "react";
import axios from "axios";

const MyEventsAdmin = () => {
  const [events, setEvents] = useState([]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete?")) {
    }
  };

  const fetchEvents = async () => {
    const { data } = await axios.get("http://localhost:5000/events");

    setEvents(data);
    console.log("MyEventsAdmin rendered");
  };

  console.log(events);

  useEffect(() => {
    fetchEvents();
  }, []);
  return (
    <div>
      <MainScreenTemplate title="Events Published" subtitle="by Eray Baydemir">
        <Button className="create-button" variant="primary" size="lg">
          <Link to="/create event">Create an Event</Link>
        </Button>
        {/*rendering the events files to the event poage using map function of js*/}
        {events.map((event) => (
          <Card
            className="mt-4 mb-2 mr-3"
            style={{ width: "22rem", display: "inline-block" }}
            key={event._id}
          >
            <Card.Body>
              <Card.Title
                style={{
                  display: "flex",
                  alignSelf: "center",
                }}
              >
                {event.title}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Created Event
              </Card.Subtitle>
              <h6>
                <Badge>{event.category}</Badge>
              </h6>

              <p className="eventText">{event.content}</p>

              <Link
                className="mb-3"
                style={{ width: "100%", display: "block" }}
              >
                View More
              </Link>

              <Button className="mr-4">
                <Link to={"/event-edit/" + event._id}>Edit the Event</Link>
              </Button>

              <Button variant="danger" onClick={() => deleteHandler(event._id)}>
                Delete
              </Button>

              <footer className="date-recorder text-muted">
                Created on - date
              </footer>
            </Card.Body>
          </Card>
        ))}
      </MainScreenTemplate>
    </div>
  );
};

export default MyEventsAdmin;
