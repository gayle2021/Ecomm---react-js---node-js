import { useState } from "react";
import Axios from "axios";
import React from "react";
import { Card, Form, Button } from "react-bootstrap";
import "./Navbar.css";

function Addp() {
  const [img_url, setImg_url] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);

  const [productlist, setProductList] = useState([]);

  const addProduct = () => {
    Axios.post("http://localhost:5001/add_products", {
      img_url: img_url,
      name: name,
      price: price,
    }).then(() => {
      setProductList([
        ...productlist,
        {
          img_url: img_url,
          name: name,
          price: price,
        },
      ]);
    });
  };

  return (
    <>
      <div className="add card shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light">
        <div className="card-header bg-transparent border-0 text-center ">
          <h3>Add Your Product here</h3>
        </div>
        <Card.Body>
          <form>
            <Form.Group>
              <Form.Label className="mb-0">
                Product img_url<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Image URL"
                onChange={(event) => {
                  setImg_url(event.target.value);
                }}
              />
              <br />
              <Form.Label className="mb-0">
                Product Name<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
              <br />
              <Form.Label className="mb-0">
                Product Price<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Price"
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
              <br />
            </Form.Group>
            <br />

            <p className="text-center mb-0">
              <Button
                className="btn-lg w-100"
                variant="success"
                type="submit"
                onClick={addProduct}
              >
                Submit
              </Button>
            </p>
          </form>
        </Card.Body>
      </div>
    </>
  );
}

export default Addp;
