import React from "react";
import { register } from "../../actions/organizerActions";
import { useEffect } from "react";
import { useState } from "react";
import MainScreenTemplate from "../../components/MainScreenTemplate";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import ConfirmMessage from "../../components/ConfirmMessage";
import { Container, Row, Form, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const OrganizerRegisterScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const organizerRegister = useSelector((state) => state.organizerRegister);
  const { loading, error, message, organizerInfo } = organizerRegister;

  useEffect(() => {
    const timer = setTimeout(() => {
      if (organizerInfo) {
        navigate("/");
      }
      //adding a timeout because client shoould be able to look at the verification message
    }, 2000); // 2000ms delay (2 seconds)

    return () => clearTimeout(timer); // This will clear the timer when the component unmounts
  }, [navigate, organizerInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(register(name, email, password, confirmpassword));
  };

  return (
    <MainScreenTemplate title="Organizator Register">
      {loading && <Loading />}
      {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {message && <ConfirmMessage variant="danger">{message}</ConfirmMessage>}
      <Form className="ml-2" onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="The event organizer's name and surname"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="The event organizer's email for further communication to student's"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="The password of your account"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Please enter your password again"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Create your account</Button>
      </Form>
    </MainScreenTemplate>
  );
};

export default OrganizerRegisterScreen;
