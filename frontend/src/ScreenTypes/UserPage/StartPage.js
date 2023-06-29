import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listEventsWithoutAuth } from "../../actions/eventActions";
import { Badge, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./StartPage.css";

const StartPage = () => {
  const dispatch = useDispatch();

  const eventList = useSelector((state) => state.eventList);
  const { events } = eventList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const organizerLogin = useSelector((state) => state.organizerLogin);
  const { organizerInfo } = organizerLogin;

  useEffect(() => {
    dispatch(listEventsWithoutAuth());
  }, [dispatch]);

  return (
    <div className="divv">
      {events?.map((event) => (
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
              {event.eventName}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Created Event
            </Card.Subtitle>

            {event.category.social_aid_event && (
              <Badge className="inline-block mr-2" bg="primary">
                Social Aid Event
              </Badge>
            )}

            {event.category.academic_event && (
              <Badge className="inline-block mr-2" bg="warning">
                Academic Event
              </Badge>
            )}

            {event.category.school_based_tournament && (
              <Badge className="inline-block mr-2" bg="success">
                School-Based Tournament
              </Badge>
            )}

            {event.category.sport_competition && (
              <Badge className="inline-block mr-2" bg="secondary">
                Sport Competition
              </Badge>
            )}

            <p className="eventText">{event.description}</p>

            <Link className="mb-3" style={{ width: "100%", display: "block" }}>
              View More
            </Link>

            <Button className="mr-4">
              <Link
                to={
                  userInfo
                    ? "/user-events"
                    : organizerInfo
                    ? "/events"
                    : "/landing"
                }
              >
                Enroll to the Event
              </Link>
            </Button>

            <footer className="date-recorder text-muted">
              Created at:{" "}
              {event.createdAt ? event.createdAt.substring(0, 10) : ""}
            </footer>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default StartPage;
