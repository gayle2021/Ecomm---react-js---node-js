const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
let cookieParser = require("cookie-parser");

dotenv.config();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "ecomm",
});

app.post("/add_products", (req, res) => {
  const img_url = req.body.img_url;
  const name = req.body.name;
  const price = req.body.price;
  db.query(
    "INSERT INTO products (img_url, name, price) VALUES (?,?,?)",
    [img_url, name, price],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.post("/login", (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  db.query(
    "select name from users where name = ? AND pwd = ?",
    [name, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// app.post("/show", (req, res) => {
//   // var isLogin = req.body.isLogin;
//   // db.query(
//   //   "UPDATE `state` SET `isLogin`=? WHERE 1",
//   //   [isLogin],
//   //   (err, result) => {
//   //     if (err) {
//   //       console.log(err);
//   //     }
//   //   }
//   // );
//   db.query("SELECT `isLogin` FROM `state` WHERE 1", (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

// app.post("/setshow", (req, res) => {
//   var isLogin = req.body.isLogin;
//   db.query(
//     "UPDATE `state` SET `isLogin`=? WHERE 1",
//     [isLogin],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       }
//     }
//   );
// });

// app.post("/showadmin", (req, res) => {
//   var isLogin = req.body.isLogin;
//   db.query(
//     "UPDATE `adminstate` SET `isLogin`=? WHERE 1",
//     [isLogin],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       }
//     }
//   );
//   db.query("SELECT `isLogin` FROM `adminstate` WHERE 1", (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

// app.post("/getshowadmin", (req, res) => {
//   db.query("SELECT `isLogin` FROM `adminstate` WHERE 1", (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

app.post("/signup", (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  db.query(
    "insert into users( name, pwd) VALUES (?,?)",
    [name, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/admin_login", (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  db.query(
    "select name from admin where name = ? AND pwd = ?",
    [name, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// app.post("/addtocart", (req, res) => {
//   const cart = req.body.cart;
//   const user = name;
//   // console.log(cart[0].img_url);
//   for (var i = 0; i < cart.length; i++) {
//     db.query(
//       "INSERT INTO `cart`(`name`,`img_url`, `price`, `timestamp`, `user`) VALUES (?,?,?,UNIX_TIMESTAMP(NOW()),?)",
//       [cart[i].name, cart[i].img_url, cart[i].price, user],
//       (err, result) => {
//         if (err) {
//           console.log(err);
//         } else {
//           if ((i = cart.length - 1)) {
//             console.log(i + " record inserted");
//           }
//           // res.send(result);
//         }
//       }
//     );
//   }
// });

app.post("/showcart", (req, res) => {
  const user = name;
  db.query("select * from cart where user = ?", [user], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/deletecart/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM cart WHERE id =" + id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.post("/addtocart/:id", (req, res) => {
  const id = req.params.id;
  const img_url = req.body.img_url;
  const nm = req.body.name;
  const price = req.body.price;
  const user = name;
  // console.log(id + " " + img_url + " " + nm + " " + price + " " + user);

  db.query(
    "INSERT INTO `cart`(`name`,`img_url`, `price`, `timestamp`, `user`) VALUES (?,?,?,UNIX_TIMESTAMP(NOW()),?)",
    [nm, img_url, price, user],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.post("/deletcart", (req, res) => {
  db.query(
    "DELETE FROM cart WHERE timestamp < (UNIX_TIMESTAMP(NOW()) - 86400)",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/show_products", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const img_url = req.body.img_url;
  const name = req.body.name;
  const price = req.body.price;

  db.query(
    "UPDATE `products` SET `img_url`=?,`name`=?,`price`=? WHERE id =" + id,
    [img_url, name, price],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/get/:id", (req, res) => {
  const id = req.params.id;

  db.query("SELECT * FROM `products` WHERE id = " + id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM products WHERE id =" + id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/user/generateToken", (req, res) => {
  global.name = req.body.name;
  const password = req.body.password;

  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {
    userName: name,
    userPassword: password,
  };

  const token = jwt.sign(data, jwtSecretKey, {
    expiresIn: "1h",
  });

  // res.setHeader("TOKEN_HEADER_KEY", token);
  // res.cookie("token", token, { httpOnly: true });

  res.send(token);
});

app.post("/user/validateToken", (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  const token = req.body.token;
  // console.log(token);
  // console.log("=================");
  // let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    // const token = req.headers["token_header_key"];
    // console.log(req.headers);
    const verified = jwt.verify(token, jwtSecretKey);
    if (verified) {
      return db.query(
        "select name from users where name = ? AND pwd = ?",
        [name, password],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.send(result);
          }
        }
      );
      // return res.send("Successfully Verified");
    } else {
      return res.status(401).send(error);
    }
  } catch (error) {
    return res.status(401).send(error);
  }
});

app.post("/user/validToken", (req, res) => {
  const token = req.body.token;

  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  try {
    const verified = jwt.verify(token, jwtSecretKey);
    // console.log(verified);
    if (verified) {
      return res.status(200).send(true);
    } else {
      return res.status(401).send(error);
    }
  } catch (error) {
    return res.status(401).send(error);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
