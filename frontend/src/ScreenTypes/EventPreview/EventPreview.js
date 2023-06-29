import React, { useEffect } from "react";
import MainScreenTemplate from "../../components/MainScreenTemplate";
import { useState } from "react";
import { updateEvent } from "../../actions/eventActions";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import ConfirmMessage from "../../components/ConfirmMessage";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Card,
  Container,
  Row,
  Col,
  Table,
} from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import { enrollEvent } from "../../actions/eventActions";

const EventPreview = () => {
  const [eventName, seteventName] = useState();
  const [description, setdescription] = useState();
  const [ageRange, setageRange] = useState();
  const [deadline, setdeadline] = useState();
  const [category, setcategory] = useState();
  const [date, setdate] = useState("");
  const [ageRangeFirstInt, setAgeRangeFirstInt] = useState();
  const [ageRangeSecondInt, setAgeRangeSecondInt] = useState();
  const [enrolledUsers, setEnrolledUsers] = useState([]);

  const eventUpdate = useSelector((state) => state.eventUpdate);
  const { loading, error, success } = eventUpdate;

  const eventEnroll = useSelector((state) => state.eventEnroll);
  const {
    loading: enrollLoading,
    error: enrollError,
    success: enrollSuccess,
  } = eventEnroll;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const organizerLogin = useSelector((state) => state.organizerLogin);
  const { organizerInfo } = organizerLogin;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  //console.log(id);

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get("/api/events/" + id);

      seteventName(data.eventName);
      setdescription(data.description);
      setageRange(data.ageRange);
      setdeadline(data.deadline);
      setcategory(data.category);
      setAgeRangeFirstInt(data.ageRangeFirstInt);
      setAgeRangeSecondInt(data.ageRangeSecondInt);
      setEnrolledUsers(data.enrolledUsers);
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
  const enrollHandler = () => {
    dispatch(enrollEvent(id));
    navigate("/user-events");
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
    <MainScreenTemplate
      title="Event Preview"
      subtitle={"Event Name" + eventName}
    >
      {organizerInfo && (
        <>
          <Card>
            <Card.Header>Edit your Event</Card.Header>
            <Card.Body>
              <Form onSubmit={updateHandler}>
                {loading && <Loading />}
                {error && (
                  <ErrorMessage variant="danger"> {error} </ErrorMessage>
                )}
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
          <div>
            <h3>Enrolled Students</h3>
            {enrolledUsers.length === 0 ? (
              <p>no students have enrolled yet</p>
            ) : (
              <Table striped bordered responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Description</th>
                    <th>Adress Line</th>
                    <th>District</th>
                    <th>Province</th>
                  </tr>
                </thead>
                <tbody>
                  {enrolledUsers.map((user) => (
                    <tr key={user.id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.age}</td>
                      <td>
                        {user.adress_line_1}
                        {user.adress_line_2}
                      </td>
                      <td>{user.district}</td>
                      <td>{user.province}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </>
      )}

      {userInfo && (
        <Container>
          <Row>
            <Col>
              <Card>
                <Card.Header>Preview of the Event</Card.Header>
                <Card.Body>
                  {enrollLoading && <Loading />}
                  {enrollError && (
                    <ErrorMessage variant="danger">
                      {" "}
                      {enrollError}{" "}
                    </ErrorMessage>
                  )}
                  {enrollSuccess && (
                    <ConfirmMessage variant="danger">
                      {" "}
                      {enrollSuccess}{" "}
                    </ConfirmMessage>
                  )}
                  <Form.Group>
                    <Form.Label>Event Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={eventName}
                      disabled
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="textarea"
                      placeholder={description}
                      disabled
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="block">Age Range</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder={ageRangeFirstInt}
                      disabled
                    />
                    <Form.Control
                      type="text"
                      placeholder={ageRangeSecondInt}
                      disabled
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Deadline</Form.Label>
                    <Form.Control type="text" placeholder={deadline} disabled />
                  </Form.Group>
                  <Button variant="primary" onClick={enrollHandler}>
                    Enrollllll
                  </Button>
                </Card.Body>

                <Card.Footer className="text-muted">
                  Enrolled on - {date.substring(0, 10)}
                </Card.Footer>
              </Card>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      )}
    </MainScreenTemplate>
  );
};

export default EventPreview;
