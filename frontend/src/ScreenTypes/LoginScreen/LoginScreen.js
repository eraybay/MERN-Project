import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ConfirmMessage from "../../components/ConfirmMessage";
import MainScreenTemplate from "../../components/MainScreenTemplate";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../actions/loginActions";
//import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { loginOrganizer } from "../../actions/organizerActions";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [ConfirmMessage, setConfirmMessage] = useState("");

  const dispatch = useDispatch();
  //loading, error, and userInfo variables can now be used inside MyComponent, and the component will re-render whenever these pieces of state change in the Redux store. This is a common pattern for accessing data from the Redux store inside a React component.
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const organizerLogin = useSelector((state) => state.organizerLogin);
  const {
    loading: loadingOrganizer,
    error: errorOrganizer,
    organizerInfo,
  } = organizerLogin;
  //const history = useHistory();
  const navigate = useNavigate();
  //if there is a userInfo present in the local Storgae of the browser, it will direct to user to events by pushing the history stack
  /*useEffect(() => {
    if (userInfo) {
      //history.push("/events");
      navigate("/events");
    }
  }, [navigate, userInfo]);
  useEffect(() => {
    if (organizerInfo) {
      //history.push("/events");
      navigate("/events");
    }
  }, [navigate, organizerInfo]);*/
  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch(loginUser(email, password));
    dispatch(loginOrganizer(email, password));
  };

  return (
    <MainScreenTemplate title="Login Page">
      {/*if loading varibale is true, loading component will be rendered*/}
      {loading && <Loading />}
      {errorMessage && (
        <ErrorMessage variant="danger"> {errorMessage} </ErrorMessage>
      )}
      {ConfirmMessage && (
        <ConfirmMessage variant="danger"> {ConfirmMessage} </ConfirmMessage>
      )}
      <Form className="ml-2" onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            //setting the mail to the useState variable
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            //setting the mail to the useState variable
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </MainScreenTemplate>
  );
};

export default LoginScreen;
