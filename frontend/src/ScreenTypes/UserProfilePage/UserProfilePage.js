import React, { useEffect } from "react";
import MainScreenTemplate from "../../components/MainScreenTemplate";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage";
import Loading from "../../components/Loading";
import ConfirmMessage from "../../components/ConfirmMessage";
import { Col, Container, Row, Form } from "react-bootstrap";
import { update } from "../../actions/loginActions";
import e from "cors";

const UserProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [district, setDistrict] = useState("");
  const [province, setProvince] = useState("");
  const [adress_line_1, setAdress_line_1] = useState("");
  const [adress_line_2, setAdress_line_2] = useState("");
  const [description, setDescription] = useState("");

  const userUpdate = useSelector((state) => state.userUpdate);
  const { loading, error, success } = userUpdate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setDistrict(userInfo.district);
    setProvince(userInfo.province);
    setAdress_line_1(userInfo.adress_line_1);
    setAdress_line_2(userInfo.adress_line_2);
    setDescription(userInfo.description);
  }, [userInfo]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      update(
        name,
        email,
        district,
        province,
        adress_line_1,
        adress_line_2,
        description
      )
    );
  };

  return (
    <MainScreenTemplate title="Edit Profile">
      <Row className="profileContainer">
        <Col md={6}>
          <Form onSubmit={submitHandler}>
            {loading && <Loading />}
            {error && <ErrorMessage variant="danger"> {error} </ErrorMessage>}
            {success && (
              <ConfirmMessage variant="success">
                Updated Successfully
              </ConfirmMessage>
            )}
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
              <Form.Label>Description</Form.Label>
              <Form.Control
                value={description}
                type="text"
                placeholder="A brief describtion for your applications"
                onChange={(e) => setDescription(e.target.value)}
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
                    />
                  </Col>
                  <Col>
                    <Form.Label>District</Form.Label>
                    <Form.Control
                      type="text"
                      label="District"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <Form.Label>Province</Form.Label>
                    <Form.Control
                      type="text"
                      label="Province"
                      onChange={(e) => setProvince(e.target.value)}
                    />
                  </Col>
                </Row>
              </Container>
            </Form.Group>
            <Button type="submit" varient="primary">
              Update
            </Button>
          </Form>
        </Col>
      </Row>
    </MainScreenTemplate>
  );
};

export default UserProfilePage;
