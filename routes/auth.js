const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcrypt");

router.get("/signup", (req, res, next) => {
    res.render("signup");
});

router.get("/login", (req, res, next) => {
  res.render("login")
});

router.post("/signup", (req, res) => {
  const  { username, email, password } = req.body;
  console.log(username, email, password)
  if (password.length < 8) {
    return res.render("signup", { message: "Your password must be at least 8 chararters long" });
  }
  if (email === "") {
    return res.render("signup", { message: "Email field cannot be empty" });
  }
  if (username === "") {
    return res.render("signup", { message: "Username field cannot be empty" });
  }
  User.findOne({email: email})
  .then(userFromDB => {
    if (userFromDB !== null) {
      res.render("signup", { message: "Email already registered" })
    } else {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(password, salt)
      User.create({ username: username, email: email, password: hash })
      .then(userFromDB => {
        console.log(userFromDB);
        res.redirect("/home");
      })
    }
  })
  .catch(err => {
    console.log(err);
  })
})

router.post('/home', /*"/login",*/ (req, res) => {
  // console.log(req.body.email);
  const { username, password } = req.body;
  User.findOne({ username: username })
  .then(userFromDB => {
    if (userFromDB === null) {
      return res.render("login", { message: "Invalid credentials" });
    }
    if (bcrypt.compareSync(password, userFromDB.password)) {
      req.session.user = userFromDB;
      console.log(userFromDB);
         res.render("home.hbs", { userFromDB });
    } else {
      res.render("login", { message: "Invalid credentials" });
    }
  })
})

router.get("/logout", (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  })
})

module.exports = router;
