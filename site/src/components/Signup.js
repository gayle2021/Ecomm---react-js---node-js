import React from "react";
import { Form, Button, Card } from "react-bootstrap";

function Signup() {
  return (
    <div className="signup">
      <div className="card shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light">
        <div className="card-header bg-transparent border-0 text-center ">
          <h3>Sign up</h3>
        </div>
        <Card.Body>
          <form method="post">
            <Form.Group>
              <Form.Label className="mb-0" style={{ textAlign: "left" }}>
                Your name<span className="text-danger">*</span>
              </Form.Label>
              <br />
              <Form.Control type="text" placeholder="Name" />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label className="mb-0">
                Password<span className="text-danger">*</span>
              </Form.Label>
              <br />

              <Form.Control type="password" />
            </Form.Group>
            <br />

            <br />
            <p className="text-center mb-0">
              <Button className="btn-lg w-100" variant="dark" type="button">
                Login
              </Button>
            </p>
          </form>
        </Card.Body>
      </div>
    </div>
  );
}

export default Signup;
