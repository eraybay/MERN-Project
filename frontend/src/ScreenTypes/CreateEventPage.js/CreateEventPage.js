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
  const [ageRangeFirstInt, setAgeRangeFirstInt] = useState(null);
  const [ageRangeSecondInt, setAgeRangeSecondInt] = useState(null);
  const [socialAidEvent, setSocialAidEvent] = useState(false);
  const [academicEvent, setAcademicEvent] = useState(false);
  const [schoolBasedTournament, setSchoolBasedTournament] = useState(false);
  const [sportCompetition, setSportCompetition] = useState(false);

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
    const category = {
      social_aid_event: socialAidEvent,
      academic_event: academicEvent,
      school_based_tournament: schoolBasedTournament,
      sport_competition: sportCompetition,
    };
    dispatch(
      createEvent(
        eventName,
        description,
        ageRange,
        deadline,
        category,
        ageRangeFirstInt,
        ageRangeSecondInt
      )
    );
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
            as="textarea"
            rows={3}
            placeholder="Enter the description of the event"
            value={description}
            //setting the mail to the useState variable
            onChange={(e) => setdescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label className="block">Age Range</Form.Label>
          <Form.Select
            className="mb-3 form-label"
            onChange={(e) => setAgeRangeFirstInt(e.target.value)}
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
            className="mb-3 form-label"
            onChange={(e) => setAgeRangeSecondInt(e.target.value)}
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
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Deadline</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter Deadline"
            value={deadline}
            //setting the mail to the useState variable
            onChange={(e) => setdeadline(e.target.value)}
          />
        </Form.Group>
        <Form.Check
          inline
          label="Social Aid Event"
          checked={socialAidEvent}
          onChange={(e) => setSocialAidEvent(e.target.checked)}
        />
        <Form.Check
          inline
          label="Academic Event"
          checked={academicEvent}
          onChange={(e) => setAcademicEvent(e.target.checked)}
        />
        <Form.Check
          inline
          label="School Based Tournament"
          checked={schoolBasedTournament}
          onChange={(e) => setSchoolBasedTournament(e.target.checked)}
        />
        <Form.Check
          inline
          label="Sport Competition"
          checked={sportCompetition}
          onChange={(e) => setSportCompetition(e.target.checked)}
        />
        <Button className="block mt-3" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </MainScreenTemplate>
  );
};

export default CreateEventPage;
