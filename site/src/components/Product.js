import { Card, Button, Modal, Table } from "react-bootstrap";
import React from "react";
import "./design.css";
import { useState } from "react";
import Axios from "axios";

function Product() {
  const [productlist, setProductList] = useState([]);

  // var car = localStorage.getItem("cart");

  // const getProducts = () => {
  //   Axios.get("http://localhost:5001/show_products").then((response) => {
  //     setProductList(response.data);
  //   });
  // };
  var i = 1;

  // var [cart, setCval] = useState([]);
  var [c, setCartList] = useState([]);

  var addtocart = (item) => {
    // setCval(JSON.stringify(localStorage.getItem("cart")));
    // setCval([...cart, item]);
    // localStorage.setItem("cart", JSON.stringify([...cart, item]));
    Axios.post("http://localhost:5001/user/validToken", {
      token: localStorage.getItem("token"),
    }).then((response) => {
      if (response.data === true) {
        setCartList([...c, item]);
        Axios.post(`http://localhost:5001/addtocart/${item.id}`, {
          name: item.name,
          img_url: item.img_url,
          price: item.price,
        });
      }
    });
  };
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  const showcart = () => {
    Axios.post("http://localhost:5001/user/validToken", {
      token: localStorage.getItem("token"),
    }).then((response) => {
      if (response.data === true) {
        Axios.post("http://localhost:5001/showcart").then((response) => {
          setCartList(response.data);
          // console.log(response.data);
        });
        // setCartList(JSON.parse(car));
        handleShow();
      }
    });
  };

  const RemoveItem = (id) => {
    // var c1 = localStorage.getItem("cart");
    // c1 = JSON.parse(c1);

    // /* eslint-disable-next-line*/
    // var index = (index = c1.findIndex((x) => x.id === e.id));

    // console.log("index = " + index);

    // if (index > -1) {
    //   c1.splice(index, 1);
    //   cart.splice(index, 1);
    // }

    // localStorage.setItem("cart", JSON.stringify(c1));
    // // localStorage.setItem("cart", JSON.stringify(c1));
    // setCval(c1);
    Axios.post("http://localhost:5001/user/validToken", {
      token: localStorage.getItem("token"),
    }).then((response) => {
      if (response.data === true) {
        Axios.delete(`http://localhost:5001/deletecart/${id}`).then(
          (response) => {
            setCartList(
              c.filter((val) => {
                return val.id !== id;
              })
            );
            // console.log(response.data);
          }
        );
      }
    });

    // setCval(JSON.parse([...c1]));
    // setCartList(JSON.parse([...c1]));
  };

  // const ConfirmCart = () => {
  //   // // console.log(c);
  //   Axios.post("http://localhost:5001/addtocart", {
  //     cart: c,
  //   }).then(async (response) => {});
  // };

  const listItems = productlist.map((item) => (
    <div>
      <Card className="cards">
        <Card.Body>
          <Card.Img className="pro_img" variant="top" src={item.img_url} />
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>{item.price}</Card.Text>
          <Button
            variant="primary"
            onClick={() => {
              addtocart(item);
            }}
          >
            Buy now
          </Button>
        </Card.Body>
      </Card>
      <a href={item.url}>
        <img className="img-fluid" src={item.image} alt={item.site} />
        <p>{item.site}</p>
      </a>
    </div>
  ));

  React.useEffect(() => {
    Axios.get("http://localhost:5001/show_products").then((response) => {
      setProductList(response.data);
    });
  }, []);

  return (
    <div className="home">
      <Button id="cart" variant="success" onClick={showcart}>
        Cart
      </Button>
      {listItems}
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="otbl">
            <Table className="tbl" striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {c.map((val, key) => {
                  return (
                    <tr>
                      <td>{i++}</td>
                      <td>
                        <img
                          className="tbl_img"
                          src={val.img_url}
                          alt={val.img_url}
                        />
                      </td>
                      <td> {val.name}</td>
                      <td> {val.price}</td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => {
                            RemoveItem(val.id);
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
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="primary" onClick={ConfirmCart}>
            Confirm Cart
          </Button> */}
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default Product;
