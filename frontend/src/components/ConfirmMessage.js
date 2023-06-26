import React from "react";
import { Alert } from "react-bootstrap";

const ConfirmMessage = ({ variant = "success", children }) => {
  return (
    <Alert variant="success" style={{ fontSize: 20 }}>
      <strong>{children}</strong>
    </Alert>
  );
};

export default ConfirmMessage;
