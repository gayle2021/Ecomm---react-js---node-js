import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  Button,
  DropdownButton,
  InputGroup,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import "./Navbar.css";
import Addpro from "./Addpro";
import Home from "./Home";
import Updatep from "./Updatp";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <Router>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <Button
              variant="secondary"
              className="menubtn"
              id="button-addon2"
              onClick={showSidebar}
            >
              <i className="fa fa-bars"></i>
            </Button>
            <InputGroup className="search mb-3">
              <FormControl className="sbox" placeholder="Search" />
              <Button variant="primary" className="sbtn" id="button-addon2">
                <i className="fa fa-search"></i>
              </Button>
            </InputGroup>
            <DropdownButton
              className="search2"
              variant="secondary"
              title={<i className="fa fa-user"></i>}
              align="end"
            >
              <Dropdown.Item href="#">Setting</Dropdown.Item>
              <Dropdown.Item href="#">Activity log</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href="#">Log out</Dropdown.Item>
            </DropdownButton>
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items">
            <li className="navbar-toggle">Admin Panel</li>
            <ul className="list">
              <hr />
              <li className="ilist">
                <Link to={"/"}> Dashboard </Link>
              </li>
              <hr />
              <li className="ilist">
                <Link to={"/add_product"}> Add Product </Link>
              </li>
              <hr />
              <li className="ilist">
                <Link to={"/update_product"}> update Product </Link>
              </li>
              <hr />
              <li className="ilist">
                <Link to={"/add_phpto"}> Add_photo </Link>
              </li>
              <hr />
              <li className="ilist">Dashboard</li>
              <hr />
              <li className="ilist">Dashboard</li>
              <hr />
              <li className="ilist">Dashboard</li>
              <hr />
              <li className="ilist">Dashboard</li>
              <hr />
            </ul>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/add_product" component={Addpro} />
          <Route exact path="/update_product" component={Updatep} />
        </Switch>
      </Router>
    </>
  );
}

export default Navbar;
