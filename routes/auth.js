const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcrypt");

router.get("/signup", (req, res, next) => {
    res.render("signup");
});

router.get("/login", (req, res, next) => {
  res.render("login");
});

router.post("/signup", (req, res) => {
  const  { email, password } = req.body;
  console.log(email, password)
  if (password.length < 8) {
    return res.render("signup", { message: "Your password must be at least 8 chararters long" });
  }
  if (email === "") {
    return res.render("signup", { message: "Email field cannot be empty" });
  }
  User.findOne({email: email})
  .then(userFromDB => {
    if (userFromDB !== null) {
      res.render("signup", { message: "Email already registered" })
    } else {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(password, salt)
      User.create({ email: email, password: hash })
      .then(userFromDB => {
        console.log(userFromDB);
        res.redirect("/");
      })
    }
  })
  .catch(err => {
    console.log(err);
  })
})

router.post("/login", (req, res) => {
  // console.log(req.body.email);
  const { email, password } = req.body;
  User.findOne({ email: email })
  .then(userFromDB => {
    if (userFromDB === null) {
      return res.render("login", { message: "Invalid credentials" });
    }
    if (bcrypt.compareSync(password, userFromDB.password)) {
      req.session.user = userFromDB;
      res.redirect("/home");
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
