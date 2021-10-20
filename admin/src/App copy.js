import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  Button,
  DropdownButton,
  InputGroup,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import "./components/Navbar.css";
import Addp from "./components/Addp";
import Addpic from "./components/Addpic";
import Home from "./components/Home";
import ShowPro from "./components/ShowPro";
import Updatep from "./components/Updatp";

function App() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <div className="App">
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
              <li className="navbar-toggle"></li>
              <ul className="list">
                <hr />
                <li className="ilist">
                  <Link to={"/"} value="false">
                    Dashboard
                  </Link>
                </li>
                <hr />
                <li className="ilist">
                  <Link to={"/add_photo"}> Add Product with Image </Link>
                </li>
                <hr />
                <li className="ilist">
                  <Link to={"/update_product"}> Update Product </Link>
                </li>
                <hr />
                <li className="ilist">
                  <Link to={"/show_product"}> Only List Product </Link>
                </li>
                <hr />
                <li className="ilist">
                  <Link to={"/add_product"}> Add Product without Image </Link>
                </li>

                <hr />
                <li className="ilist">Dashboard</li>
                <hr />

                <hr />
              </ul>
            </ul>
          </nav>
          <div className={sidebar ? "content active" : "content"}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/add_product" component={Addp} />
              <Route exact path="/show_product" component={ShowPro} />
              <Route exact path="/update_product" component={Updatep} />
              <Route exact path="/add_photo" component={Addpic} />
            </Switch>
          </div>
        </Router>
      </div>
    </>
  );
}

export default App;
