import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { listEvents, listEventsOrganizer } from "../../actions/eventActions";
import MainScreenTemplate from "../../components/MainScreenTemplate";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import ConfirmMessage from "../../components/ConfirmMessage";
import { deleteEvent } from "../../actions/eventActions";
import { Container, Form } from "react-bootstrap";
import "./MyEventsAdmin.css";

const MyEventsAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [ageRangeFirstInt, setAgeRangeFirstInt] = useState(null);
  const [ageRangeSecondInt, setAgeRangeSecondInt] = useState(null);

  const eventList = useSelector((state) => state.eventList);
  const { loading, error, events } = eventList;

  const organizerLogin = useSelector((state) => state.organizerLogin);
  const { organizerInfo } = organizerLogin;

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

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleAgeRangeChange = (firstInt, secondInt) => {
    if (firstInt > secondInt) {
      window.alert("Please enter a proper age range");
    }
    setAgeRangeFirstInt(firstInt);
    setAgeRangeSecondInt(secondInt);
  };

  useEffect(() => {
    dispatch(listEventsOrganizer());
  }, [dispatch]);

  useEffect(() => {
    const filterEvents = () => {
      if (
        selectedCategories.length > 0 ||
        (ageRangeFirstInt && ageRangeSecondInt)
      ) {
        const filtered = events.filter((event) => {
          const matchesCategory =
            selectedCategories.length === 0 ||
            selectedCategories.some((category) => event.category[category]);

          const matchesAgeRange =
            (!ageRangeFirstInt || event.ageRangeFirstInt >= ageRangeFirstInt) &&
            (!ageRangeSecondInt ||
              event.ageRangeSecondInt <= ageRangeSecondInt);

          return matchesCategory && matchesAgeRange;
        });
        setFilteredEvents(filtered);
      } else {
        setFilteredEvents(events);
      }
    };

    filterEvents();
  }, [events, selectedCategories, ageRangeFirstInt, ageRangeSecondInt]);

  return (
    <div>
      <MainScreenTemplate
        title="Events Published"
        subtitle={"by " + organizerInfo.name}
      >
        <Button className="create-button mb-3" variant="primary" size="lg">
          <Link to="/create-event">Create an Event</Link>
        </Button>

        <h4>Sort By:</h4>
        <hr className="hrr"></hr>

        <Form.Check
          inline
          label="Social Aid Event"
          checked={selectedCategories.includes("social_aid_event")}
          onChange={() => handleCategoryChange("social_aid_event")}
        />
        <Form.Check
          inline
          label="Academic Event"
          checked={selectedCategories.includes("academic_event")}
          onChange={() => handleCategoryChange("academic_event")}
        />
        <Form.Check
          inline
          label="School Based Tournament"
          checked={selectedCategories.includes("school_based_tournament")}
          onChange={() => handleCategoryChange("school_based_tournament")}
        />
        <Form.Check
          inline
          label="Sport Competition"
          checked={selectedCategories.includes("sport_competition")}
          onChange={() => handleCategoryChange("sport_competition")}
        />
        <Container className="ml-3 cont">
          <Form.Label className="block blocksss">Age Range</Form.Label>
          <Form.Select
            inline
            className="mb-3 form-label"
            onChange={(e) =>
              handleAgeRangeChange(Number(e.target.value), ageRangeSecondInt)
            }
          >
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
          </Form.Select>
          ---
          <Form.Select
            inline
            className="mb-3 form-label"
            onChange={(e) =>
              handleAgeRangeChange(ageRangeFirstInt, Number(e.target.value))
            }
          >
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
          </Form.Select>
        </Container>

        {loading && <Loading />}
        {error && <ErrorMessage variant="danger"> {error} </ErrorMessage>}
        {loadingDelete && <Loading />}
        {errorDelete && (
          <ErrorMessage variant="danger"> {errorDelete} </ErrorMessage>
        )}
        {deletedMessage && (
          <ConfirmMessage variant="danger"> {deletedMessage} </ConfirmMessage>
        )}

        {filteredEvents?.map((event) => (
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
                Created at:{" "}
                {event.createdAt ? event.createdAt.substring(0, 10) : ""}
              </footer>
            </Card.Body>
          </Card>
        ))}
      </MainScreenTemplate>
    </div>
  );
};

export default MyEventsAdmin;
