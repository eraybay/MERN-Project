import React, { useEffect } from "react";
import { useState } from "react";
import MainScreenTemplate from "../../components/MainScreenTemplate";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import { Container, Row, Form, Button, Col } from "react-bootstrap";
import ConfirmMessage from "../../components/ConfirmMessage";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/registerActions";

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [adress_line_1, setAdress_line_1] = useState("");
  const [adress_line_2, setAdress_line_2] = useState("");
  const [description, setDescription] = useState("");
  const [pic, setPic] = useState(
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  );
  const [picmessage, setPicMessage] = useState(null);
  const [confirmpassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, message } = userRegister;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (userInfo) {
        navigate("/");
      }
      //adding a timeout because client shoould be able to look at the verification message
    }, 2000); // 2000ms delay (2 seconds)

    return () => clearTimeout(timer); // This will clear the timer when the component unmounts
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(
      register(
        name,
        pic,
        email,
        password,
        adress_line_1,
        adress_line_2,
        district,
        province,
        description,
        confirmpassword
      )
    );
  };

  return (
    <MainScreenTemplate title="Register">
      {loading && <Loading />}
      {error && <ErrorMessage variant="danger"> {error} </ErrorMessage>}
      {errorMessage && (
        <ErrorMessage variant="danger"> {errorMessage} </ErrorMessage>
      )}
      {message && <ConfirmMessage variant="danger"> {message} </ConfirmMessage>}

      <Form className="ml-2" onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="name"
            placeholder="Name and Surname"
            value={name}
            //setting the mail to the useState variable
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter your email"
            value={email}
            //setting the mail to the useState variable
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            //setting the mail to the useState variable
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmpassword}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        {picmessage && (
          <ErrorMessage variant="danger"> {picmessage} </ErrorMessage>
        )}

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            value={description}
            type="text"
            placeholder="A brief describtion for your applications"
            onChange={(e) => setDescription(e.target.value)}
            custom
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Adress</Form.Label>
          <Container>
            <Row>
              <Col>
                <Form.Label>Adress Line 1</Form.Label>
                <Form.Control
                  type="text"
                  label="Adress line 1"
                  value={adress_line_1}
                  onChange={(e) => setAdress_line_1(e.target.value)}
                  custom
                />
              </Col>
            </Row>
            <Row className="mt-2">
              <Col xs={6}>
                <Form.Label>Adress Line 2</Form.Label>
                <Form.Control
                  type="text"
                  label="Adress line 2"
                  value={adress_line_2}
                  onChange={(e) => setAdress_line_2(e.target.value)}
                  custom
                />
              </Col>
              <Col>
                <Form.Label>District</Form.Label>
                <Form.Control
                  type="text"
                  label="District"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  custom
                />
              </Col>
              <Col>
                <Form.Label>Province</Form.Label>
                <Form.Control
                  type="text"
                  label="Province"
                  onChange={(e) => setProvince(e.target.value)}
                  custom
                />
              </Col>
            </Row>
          </Container>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </MainScreenTemplate>
  );
};
export default RegisterScreen;
