import MainScreenTemplate from "../../components/MainScreenTemplate";
import React from "react";
import { useState } from "react";
import { createEvent } from "../../actions/eventActions";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import { Form, Button } from "react-bootstrap";
import ConfirmMessage from "../../components/ConfirmMessage";
import "./CreateEventPage.css";
import { useNavigate } from "react-router-dom";

const CreateEventPage = () => {
  const [eventName, seteventName] = useState("");
  const [description, setdescription] = useState("");
  const [ageRange, setageRange] = useState("");
  const [deadline, setdeadline] = useState("");
  const [category, setcategory] = useState("");

  const eventCreate = useSelector((state) => state.eventCreate);
  const { loading, error, success } = eventCreate;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const resetHandler = () => {
    seteventName("");
    setdescription("");
    setageRange("");
    setdeadline("");
    setcategory("");
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch(createEvent(eventName, description, ageRange, deadline, category));
    resetHandler();
  };

  return (
    <MainScreenTemplate title="Create Event">
      {loading && <Loading />}
      {error && <ErrorMessage variant="danger"> {error} </ErrorMessage>}
      {success && <ConfirmMessage variant="danger"> {success} </ConfirmMessage>}

      <Form className="ml-2" onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Event Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter "
            value={eventName}
            //setting the mail to the useState variable
            onChange={(e) => seteventName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="long-text"
            placeholder="Enter "
            value={description}
            //setting the mail to the useState variable
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
          Submit
        </Button>
      </Form>
    </MainScreenTemplate>
  );
};

export default CreateEventPage;
