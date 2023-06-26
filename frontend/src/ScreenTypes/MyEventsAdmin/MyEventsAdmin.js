import React from "react";
import MainScreenTemplate from "../../components/MainScreenTemplate";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import "./MyEventsAdmin.css";
import Badge from "react-bootstrap/Badge";
import { useEffect, useState } from "react";
import { listEvents } from "../../actions/eventActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import ConfirmMessage from "../../components/ConfirmMessage";
import { deleteEvent } from "../../actions/eventActions";

const MyEventsAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const eventList = useSelector((state) => state.eventList);
  const { loading, error, events } = eventList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const eventCreate = useSelector((state) => state.eventCreate);
  const { created } = eventCreate;

  const eventUpdate = useSelector((state) => state.eventUpdate);
  const { updated } = eventUpdate;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { success } = userUpdate;

  const eventDelete = useSelector((state) => state.eventDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    deleted,
    deletedMessage,
  } = eventDelete;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteEvent(id));
    }
  };

  useEffect(() => {
    dispatch(listEvents());
    //if ((userInfo = null)) {
    //  navigate("/");
    //}
    if (created) {
      //çalışmıo
      navigate("/events");
    }
  }, [dispatch, created, navigate, updated, userInfo, deleted, success]);

  return (
    <div>
      <MainScreenTemplate
        title="Events Published"
        subtitle={"by " + userInfo.name}
      >
        <Button className="create-button" variant="primary" size="lg">
          <Link to="/create-event">Create an Event</Link>
        </Button>
        {/*rendering the events files to the event poage using map function of js*/}
        {loading && <Loading />}
        {error && <ErrorMessage variant="danger"> {error} </ErrorMessage>}
        {loadingDelete && <Loading />}
        {errorDelete && (
          <ErrorMessage variant="danger"> {errorDelete} </ErrorMessage>
        )}
        {deletedMessage && (
          <ConfirmMessage variant="danger"> {deletedMessage} </ConfirmMessage>
        )}
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
              <h6>
                <Badge>{event.category}</Badge>
              </h6>

              <p className="eventText">{event.description}</p>

              <Link
                className="mb-3"
                style={{ width: "100%", display: "block" }}
              >
                View More
              </Link>

              <Button className="mr-4">
                <Link to={"/event-preview/" + event._id}>Edit the Event</Link>
              </Button>

              <Button variant="danger" onClick={() => deleteHandler(event._id)}>
                Delete
              </Button>

              <footer className="date-recorder text-muted">
                Created at: {event.createdAt.substring(0, 10)}
              </footer>
            </Card.Body>
          </Card>
        ))}
      </MainScreenTemplate>
    </div>
  );
};

export default MyEventsAdmin;
