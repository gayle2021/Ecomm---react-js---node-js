import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Form, Button, Card } from "react-bootstrap";
import Navbar from "./components/Navbar";

function App() {
  const [show, setShow] = useState(false);

  const show1 = () => {
    // Axios.post("http://localhost:5001/show").then((response) => {
    //   console.log(response.data[0].isLogin);
    //   if (response.data[0].isLogin === 0) {
    //     setShow(false);
    //   } else {
    //     setShow(true);
    //   }
    // });
    // const loggedinuser = localStorage.getItem("user");
    // if (loggedinuser !== null) {
    //   if (loggedinuser.length > 0) {
    //     setShow(true);
    //   } else {
    //     setShow(false);
    //   }
    // } else {
    //   setShow(false);
    // }
  };

  const [ch, setch] = useState(false);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      Axios.post("http://localhost:5001/deletcart");
      // console.log("This will run every 15 second!");
      if (!localStorage.getItem("LoginTime")) {
        // console.log("can't find local storage data");
        window.location.href = "http://localhost:3000";
      }
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const login = async () => {
    // Axios.post("http://localhost:5001/login", {

    Axios.post("http://localhost:5001/user/generateToken", {
      name: name,
      password: password,
    }).then(async (response) => {
      var min = 60;
      var atTime = new Date().getTime();
      var LoginTime = localStorage.getItem("LoginTime");
      if (LoginTime == null) {
        localStorage.setItem("LoginTime", atTime);
        localStorage.setItem("token", response.data);
      } else {
        // if (atTime - LoginTime > hours * 60 * 60 * 1000) {

        if (atTime - LoginTime > min * 60 * 1000) {
          localStorage.clear();
          // localStorage.setItem("LoginTime", atTime);
          // localStorage.setItem("token", response.data);
        }
      }

      await Axios.post("http://localhost:5001/user/validateToken", {
        name: name,
        password: password,
        token: localStorage.getItem("token"),
      }).then((response) => {
        if (response.data.length > 0) {
          // Axios.post("http://localhost:5001/setshow", { isLogin: true });
          // setShow(true);
          // show1();
          // if (!localStorage.getItem("user")) {
          //   localStorage.setItem("user", response.data[0].name);
          //   localStorage.setItem("cart", []);
          // }
          // show1();
          if (response.data) {
            setShow(true);
          } else {
            setShow(false);
          }
        } else {
          alert("Wrong id / password");
          setShow(false);
          // show1();
        }
        // setShow(true);
      });
    });
  };
  const signup = () => {
    Axios.post("http://localhost:5001/signup", {
      name: name,
      password: password,
    }).then((response) => {
      if (response.data !== "") {
        console.log("SETSHOW : TRUE");
        setShow(true);
      }
    });
  };

  const register = (e) => {
    e.preventDefault();
    console.log("SETCH : TRUE");
    setch(true);
  };
  const log_in = (e) => {
    e.preventDefault();
    console.log("SETCH : FALSE");
    setch(false);
  };
  useEffect(() => {
    show1();
  }, []);

  return (
    <div className="App">
      {show ? (
        <Navbar></Navbar>
      ) : (
        <div>
          <div className={ch ? "loginhide" : "login"}>
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
                <br />
                <br />
                {/* eslint-disable-next-line*/}
                <a href="#" onClick={register}>
                  Don't have account?
                </a>
              </Card.Body>
            </div>
          </div>
          <div className={ch ? "signup" : "signuphide"}>
            <div className="card shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light">
              <div className="card-header bg-transparent border-0 text-center ">
                <h3>Sign up</h3>
              </div>
              <Card.Body>
                <form method="post">
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
                      onClick={signup}
                    >
                      Signup
                    </Button>
                  </p>
                </form>
                <br />
                <br />
                {/* eslint-disable-next-line*/}
                <a href="#" onClick={log_in}>
                  Already have an account?
                </a>
              </Card.Body>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
