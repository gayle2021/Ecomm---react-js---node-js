import { useState } from "react";
import Axios from "axios";
import React from "react";
import { Table, Modal, Form, Button } from "react-bootstrap";
import "./Navbar.css";

function Updatep() {
  const [productlist, setProductList] = useState([]);
  const [product, setProduct] = useState([]);
  var splitTest = function (str) {
    return str.split("\\").pop().split("/").pop();
  };

  const setPath = (filename) => {
    return "https://127.0.0.1:8887/images/" + splitTest(filename);
  };

  const [image, setImage] = useState(null);
  var [ch, setCh] = useState(true);
  const onImageChange = (event) => {
    if (ch === true) {
      setCh(false);
    } else {
      setCh(true);
    }
    console.log(ch && event.target.files);
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const getProducts = () => {
    Axios.get("http://localhost:5001/show_products").then((response) => {
      setProductList(response.data);
    });
  };

  const getData = (id) => {
    handleShow();
    Axios.get(`http://localhost:5001/get/${id}`).then((response) => {
      setProduct(response.data);
    });
  };
  const deletData = (id) => {
    alert("deleting" + id);
    Axios.delete(`http://localhost:5001/delete/${id}`).then((response) => {
      setProductList(
        productlist.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };
  var i = 1;
  const [newName, setNewName] = useState(0);
  const [newPrice, setNewPrice] = useState(0);
  const [newimg_url, setNewImg_url] = useState("");

  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  const updateProductData = (id) => {
    Axios.put(`http://localhost:5001/update/${id}`, {
      img_url: newimg_url,
      name: newName,
      price: newPrice,
    }).then((response) => {
      setProductList(
        productlist.map((val) => {
          return val.id === id
            ? {
                img_url: val.img_url,
                name: val.name,
                price: val.price,
              }
            : val;
        })
      );
    });
  };
  return (
    <>
      {React.useEffect(() => {
        getProducts();
      }, [])}
      <div className="otbl">
        <Table className="tbl" striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {productlist.map((val, key) => {
              return (
                <tr>
                  <td>{i++}</td>
                  <td>
                    <img className="tbl_img" src={val.img_url} alt={val.id} />
                  </td>
                  <td> {val.name}</td>
                  <td> {val.price}</td>
                  <td style={{ justifyContent: "center" }}>
                    <Button
                      variant="success"
                      onClick={() => {
                        getData(val.id);
                      }}
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      type="submit"
                      onClick={() => {
                        deletData(val.id);
                      }}
                    >
                      Delet
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <Modal show={show}>
          <Modal.Header>
            <Modal.Title>Update product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <>
              {product.map((val, key) => {
                return (
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
                          setNewImg_url(setPath(event.target.value));
                        }}
                        required
                      />
                      <br />

                      {/* eslint-disable-next-line*/}
                      <img
                        id="preview"
                        src={ch ? val.img_url : image}
                        onChange={(event) => {
                          onImageChange(event);
                        }}
                        alt="preview image"
                      />
                      <br />
                      <Form.Label className="mb-0">
                        Product name<span className="text-danger">*</span>
                      </Form.Label>
                      <br />
                      <Form.Control
                        type="text"
                        placeholder={val.name}
                        onChange={(event) => {
                          setNewName(event.target.value);
                        }}
                        required
                      />

                      <br />
                      <Form.Label className="mb-0">
                        Product Price<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={val.price}
                        onChange={(event) => {
                          setNewPrice(event.target.value);
                        }}
                        required
                      />
                      <br />
                    </Form.Group>
                    <br />

                    <p className="text-center mb-0">
                      <Button
                        className="btn-lg w-100"
                        variant="success"
                        type="submit"
                        onClick={() => {
                          updateProductData(val.id);
                        }}
                      >
                        Submit
                      </Button>
                    </p>
                  </form>
                );
              })}
            </>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default Updatep;
