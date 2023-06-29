import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listEventsUser,
  listEventsWithoutAuth,
} from "../../actions/eventActions";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import MainScreenTemplate from "../../components/MainScreenTemplate";

const UserPage = () => {
  const dispatch = useDispatch();

  const eventList = useSelector((state) => state.eventList);
  const { events } = eventList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const eventUserList = useSelector((state) => state.eventUserList);
  const { userEvents } = eventUserList;

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [ageRangeFirstInt, setAgeRangeFirstInt] = useState(null);
  const [ageRangeSecondInt, setAgeRangeSecondInt] = useState(null);

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
      console.log(selectedCategories);
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
    dispatch(listEventsUser());
    dispatch(listEventsWithoutAuth());
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
    <MainScreenTemplate
      title="Events Listed Out"
      subtitle={"For the user: " + userInfo.name}
    >
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
      <Container>
        <Row>
          <Col sm={8}>
            {filteredEvents?.map((event) => (
              <Card
                className="mt-4 mb-2 mr-2"
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
                    <Link to={"/event-preview/" + event._id}>
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
          </Col>
          <Col sm={3}>
            <h2 className="mb-2">Enrolled Events:</h2>
            {userEvents?.map((userEvent) => (
              <Card
                className="mt-4 mb-2 mr-3"
                style={{ width: "18rem", display: "inline-block" }}
                key={userEvent._id}
              >
                <Card.Body>
                  <Card.Title
                    style={{
                      display: "flex",
                      alignSelf: "center",
                    }}
                  >
                    {userEvent.eventName}
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Created Event
                  </Card.Subtitle>

                  {userEvent.category.social_aid_event && (
                    <Badge className="inline-block mr-2" bg="primary">
                      Social Aid Event
                    </Badge>
                  )}

                  {userEvent.category.academic_event && (
                    <Badge className="inline-block mr-2" bg="warning">
                      Academic Event
                    </Badge>
                  )}

                  {userEvent.category.school_based_tournament && (
                    <Badge className="inline-block mr-2" bg="success">
                      School-Based Tournament
                    </Badge>
                  )}

                  {userEvent.category.sport_competition && (
                    <Badge className="inline-block mr-2" bg="secondary">
                      Sport Competition
                    </Badge>
                  )}

                  <p className="eventText mb-1">{userEvent.description}</p>

                  <p className="eventText mb-1">
                    Age Range:{"  "}
                    {userEvent.ageRangeFirstInt} {"-- "}
                    {userEvent.ageRangeSecondInt}
                  </p>

                  <p className="eventText mb-1">
                    Deadline: {"  "}
                    {userEvent.deadline.substring(0, 10)}
                  </p>

                  <footer className="date-recorder text-muted">
                    Created at:{" "}
                    {userEvent.createdAt
                      ? userEvent.createdAt.substring(0, 10)
                      : ""}
                  </footer>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    </MainScreenTemplate>
  );
};

export default UserPage;
