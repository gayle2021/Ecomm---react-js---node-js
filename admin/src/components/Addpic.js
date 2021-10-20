import { useState } from "react";
import Axios from "axios";
import React from "react";
import { Card, Form, Button } from "react-bootstrap";
import "./Navbar.css";

function Addpic() {
  const [img_url, setImg_url] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  /* eslint-disable-next-line*/
  const [state, updateState] = useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  var splitTest = function (str) {
    return str.split("\\").pop().split("/").pop();
  };
  const [productlist, setProductList] = useState([]);

  const setPath = (filename) => {
    return "https://127.0.0.1:8887/images/" + splitTest(filename);
  };

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
      forceUpdate();
    });
  };
  const [image, setImage] = useState(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
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
                Product Image<span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="file"
                id="fileInput"
                onChange={(event) => {
                  onImageChange(event);
                  setImg_url(setPath(event.target.value));
                }}
              />
              <br />
              {/* eslint-disable-next-line*/}
              <img id="preview" src={image} alt="preview of photo" />
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

export default Addpic;
