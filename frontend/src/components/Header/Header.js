import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../actions/loginActions";
import { logoutOrganizer } from "../../actions/organizerActions";

// Link is used to provide a faster transitions between pages without ever refreshing the main page*/
function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const organizerLogin = useSelector((state) => state.organizerLogin);
  const { organizerInfo } = organizerLogin;

  const LogOut = () => {
    userInfo
      ? dispatch(logoutUser())
      : organizerInfo
      ? dispatch(logoutOrganizer())
      : navigate("/");
  };
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand
          style={{ fontSize: "20px" }}
          className="fs-1!important"
          href="#"
        >
          <Link to="/">ConnectHUB</Link>
        </Navbar.Brand>
        {userInfo || organizerInfo ? (
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link>
              <Link
                to={userInfo ? "/user-events" : organizerInfo ? "/events" : ""}
              >
                {userInfo
                  ? "Event List"
                  : organizerInfo
                  ? "Events Published"
                  : ""}
              </Link>
            </Nav.Link>
            <NavDropdown
              title={
                userInfo
                  ? userInfo.name
                  : organizerInfo
                  ? organizerInfo.name
                  : ""
              }
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item>
                <Link to="/profile">My Profile</Link>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={LogOut}>Log Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        ) : (
          <Nav>
            <Nav.Link>
              <Link to="/login">Login</Link>
            </Nav.Link>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
}

export default Header;
