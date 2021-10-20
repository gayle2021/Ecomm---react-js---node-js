import React, { Component } from "react";
import "./design.css";
import { Form, Card, Button } from "react-bootstrap";

export default class Contact extends Component {
  render() {
    return (
      <>
        <div className="card shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light">
          <div className="card-header bg-transparent border-0 text-center ">
            <h3>Contact us</h3>
          </div>
          <Card.Body>
            <form>
              <Form.Group>
                <Form.Label className="mb-0">
                  Your name<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control type="text" placeholder="Name" />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Label className="mb-0"></Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Label className="mb-0">
                  Your contact number (Optional)
                </Form.Label>
                <Form.Control type="text" placeholder="contact" />
              </Form.Group>
              <br />
              <Form.Group>
                <Form.Label className="mb-0">
                  Message<span className="text-danger">*</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Leave a message here"
                />
              </Form.Group>
              <br />
              <p className="text-center mb-0">
                <Button className="btn-lg w-100" variant="dark" type="submit">
                  Submit
                </Button>
              </p>
            </form>
          </Card.Body>
        </div>
      </>
    );
  }
}
