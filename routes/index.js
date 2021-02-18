const router = require("express").Router();
const User = require("../models/User.model");

const loginCheck = () => {
  return (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.redirect("/login");
    }
  }
}

/* GET home page */
// router.get("/", (req, res, next) => {
//   //const user = req.session.user;
//   res.render("index", { user : req.session.user});
//   // res.render("index");
// });

router.get("/", (req, res, next) => {
  const user = req.session.user
  // const user = {
  //   layout: false
  // }
  // res.render("index", user );
   res.render("index", {user} );
});

router.get("/home", loginCheck(), (req, res) => {
  const user = req.session.user
   res.render("home", {user});
});


module.exports = router;
