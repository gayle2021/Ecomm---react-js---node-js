import React, { Component } from "react";
import { Card, Button } from "react-bootstrap";
import "./design.css";
import data from "./product_data.json";
export default class Products extends Component {
  constructor(props) {
    super(props);
    this.addtoCart = this.addtoCart.bind(this);
    this.state = { cart: [] };
  }
  addtoCart = (X) => {
    this.setState(
      (previousState) => ({
        cart: [...previousState.cart, X],
      }),
      function () {
        // console.log(value);
      }
    );
  };
  render() {
    const listItems = data.map((item) => (
      <div>
        <Card className="cards">
          <Card.Body>
            <Card.Img className="pro_img" variant="top" src={item.img} />
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>{item.name}</Card.Text>
            <Button
              variant="primary"
              onClick={() => {
                this.addtoCart(item.id);
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
    return <div className="home">{listItems}</div>;
  }
}
