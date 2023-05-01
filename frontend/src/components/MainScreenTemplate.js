import React from "react";
import "./MainScreenTemplate.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const MainScreenTemplate = ({ title, subtitle, children }) => {
  return (
    <div className="mainback">
      <Container>
        <Row>
          <div className="page">
            {title && (
              <>
                <h1 className="title"> {title}</h1>
                <h6 className="subtitle"> {subtitle}</h6>
                <hr />
              </>
            )}
            {children}
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default MainScreenTemplate;
