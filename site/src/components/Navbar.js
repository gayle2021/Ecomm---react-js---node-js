import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";

import "./design.css";
export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Islogin: true,
    };
  }
  render() {
    const logout = () => {
      // Axios.post("http://localhost:5001/setshow", { isLogin: false });
      localStorage.clear();

      this.setState({ Islogin: false });
      window.location.href = "http://localhost:3000";
    };
    return (
      <Router>
        <div>
          <h1 className="logo">Ecomm</h1>
          <ul className="nav">
            <li className="navlink">
              <Link to={"/"}> Home </Link>
            </li>
            <li className="navlink">
              <Link to={"/about"}> About </Link>
            </li>
            <li className="navlink">
              <Link to={"/contact"}> Contact </Link>
            </li>
            <li className="navlink">
              {/* eslint-disable-next-line*/}
              <a style={{ color: "white", cursor: "pointer" }} onClick={logout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/contact" component={Contact} />
          <Route path="/about" component={About} />
        </Switch>
      </Router>
    );
  }
}
