import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {
  Button,
  Card,
  Form,
  DropdownButton,
  InputGroup,
  FormControl,
  Dropdown,
} from "react-bootstrap";
import Axios from "axios";
import "./components/Navbar.css";
import Addp from "./components/Addp";
import Addpic from "./components/Addpic";
import Home from "./components/Home";
import ShowPro from "./components/ShowPro";
import Updatep from "./components/Updatp";

function App() {
  const [show, setShow] = useState(false);

  const show1 = () => {
    // Axios.post("http://localhost:5001/getshowadmin").then((response) => {
    //   console.log(response.data[0].isLogin);
    //   if (response.data[0].isLogin === 0) {
    //     setShow(false);
    //   } else {
    //     setShow(true);
    //   }
    // });
    const loggedinuser = localStorage.getItem("user");

    console.log(loggedinuser);

    // console.log(user);
    // if (user   === localStorage.getItem("user")) {

    if (loggedinuser !== null) {
      if (loggedinuser.length > 0) {
        setShow(true);
      } else {
        setShow(false);
      }
    } else {
      setShow(false);
    }

    // console.log(IsLogin);
    // if (IsLogin === true) {
    //   console.log("in if");
    //   setShow(true);
    // } else {
    //   console.log("in elese");
    //   setShow(false);
    // }
  };

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    Axios.post("http://localhost:5001/admin_login", {
      name: name,
      password: password,
    }).then((response) => {
      if (response.data.length > 0) {
        // setIsLogin(true);
        if (!localStorage.getItem("user")) {
          localStorage.setItem("user", response.data[0].name);
        }
        // setUser(response.data[0].name);
        // setIsLogin(true);
        // setShow(true);
        show1();
      } else {
        alert("wrong id / Password");
        show1();
      }
    });
  };

  // React.useEffect(() => {
  //   const loggedInUser = localStorage.getItem("user");
  //   // console.log("loggedin user " + loggedInUser);
  //   if (loggedInUser) {
  //     // const foundUser = JSON.parse(loggedInUser);
  //     // console.log("found user " + foundUser);
  //     // setUser(foundUser);
  //     setUser(loggedInUser);
  //     setIsLogin(true);
  //   }
  // }, []);

  const logout = () => {
    // Axios.post("http://localhost:5001/showadmin", { isLogin: false });
    // setIsLogin(false);
    localStorage.clear();

    window.location.href = "http://localhost:3001";
    show1();
  };

  React.useEffect(() => {
    show1();
  }, []);

  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  return (
    <>
      <div className="App">
        {show ? (
          <div className="normal">
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
                    <Button
                      variant="primary"
                      className="sbtn"
                      id="button-addon2"
                    >
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
                    <Dropdown.Item href="#" onClick={logout}>
                      Log out
                    </Dropdown.Item>
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
                      <Link to={"/add_product"}>
                        Add Product without Image{" "}
                      </Link>
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
        ) : (
          <div className="login">
            <div className="card shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light">
              <div className="card-header bg-transparent border-0 text-center ">
                <h3>Log in</h3>
              </div>
              <Card.Body>
                <form method="post">
                  {/* action="http://localhost:5001/login" */}
                  <Form.Group>
                    <Form.Label className="mb-0" style={{ textAlign: "left" }}>
                      Your name<span className="text-danger">*</span>
                    </Form.Label>
                    <br />
                    <Form.Control
                      type="text"
                      placeholder="Name"
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                    />
                  </Form.Group>
                  <br />
                  <Form.Group>
                    <Form.Label className="mb-0">
                      Password<span className="text-danger">*</span>
                    </Form.Label>
                    <br />

                    <Form.Control
                      type="password"
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                    />
                  </Form.Group>
                  <br />

                  <br />
                  <p className="text-center mb-0">
                    <Button
                      className="btn-lg w-100"
                      variant="dark"
                      type="button"
                      onClick={login}
                    >
                      Login
                    </Button>
                  </p>
                </form>
              </Card.Body>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
