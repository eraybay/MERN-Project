import React, { useEffect } from "react";
import MainScreenTemplate from "../../components/MainScreenTemplate";
import { useState } from "react";
import { updateEvent } from "../../actions/eventActions";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import ConfirmMessage from "../../components/ConfirmMessage";
import { useNavigate } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";

const EventPreview = () => {
  const [eventName, seteventName] = useState();
  const [description, setdescription] = useState();
  const [ageRange, setageRange] = useState();
  const [deadline, setdeadline] = useState();
  const [category, setcategory] = useState();
  const [date, setdate] = useState("");

  const eventUpdate = useSelector((state) => state.eventUpdate);
  const { loading, error, success, updatedEvent } = eventUpdate;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get("/api/events/" + id);

      seteventName(data.eventName);
      setdescription(data.description);
      setageRange(data.ageRange);
      setdeadline(data.deadline);
      setcategory(data.category);
    };
    fetching();
  }, [id]);

  const resetHandler = () => {
    seteventName("");
    setdescription("");
    setageRange("");
    setdeadline("");
    setcategory("");
  };
  const updateHandler = (e) => {
    e.preventDefault();

    dispatch(
      updateEvent(id, eventName, description, ageRange, deadline, category)
    );
    if (!eventName || !description || !ageRange || !deadline || !category)
      return;

    resetHandler();
    navigate("/events");
  };

  return (
    <MainScreenTemplate title="Event Preview" subtitle="Event Name ">
      <Card>
        <Card.Header>Edit your Event</Card.Header>
        <Card.Body>
          <Form onSubmit={updateHandler}>
            {loading && <Loading />}
            {error && <ErrorMessage variant="danger"> {error} </ErrorMessage>}
            {success && (
              <ConfirmMessage variant="danger"> {success} </ConfirmMessage>
            )}
            <Form.Group>
              <Form.Label>Event Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the Event"
                value={eventName}
                onChange={(e) => seteventName(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the description of the event"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="block">Age Range</Form.Label>
              <Form.Select
                className="mb-3 form-label"
                onChange={(e) => setageRange(e.target.value)}
              >
                <option value="11-13">11-13</option>
                <option value="13-15">13-15</option>
                <option value="15-17">15-17</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Deadline</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Deadline"
                value={deadline}
                //setting the mail to the useState variable
                onChange={(e) => setdeadline(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Category"
                value={category}
                //setting the mail to the useState variable
                onChange={(e) => setcategory(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Update Note
            </Button>
            <Button
              className="mx-2"
              variant="danger"
              //onClick={() => deleteHandler(match.params.id)}
            >
              Delete Note
            </Button>
          </Form>
        </Card.Body>

        <Card.Footer className="text-muted">
          Updated on - {date.substring(0, 10)}
        </Card.Footer>
      </Card>
    </MainScreenTemplate>
  );
};

export default EventPreview;
