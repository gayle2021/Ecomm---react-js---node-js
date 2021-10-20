import React, { useState } from "react";
import Axios from "axios";
import { Table } from "react-bootstrap";
import "./Navbar.css";

function ShowPro() {
  const [productlist, setProductList] = useState([]);

  const getProducts = () => {
    Axios.get("http://localhost:5001/show_products").then((response) => {
      setProductList(response.data);
    });
  };

  var i = 1;

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
            </tr>
          </thead>
          <tbody>
            {productlist.map((val, key) => {
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
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default ShowPro;
