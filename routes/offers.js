const router = require("express").Router();
const User = require("../models/User.model");
const Request = require('../models/Request');

const loginCheck = () => {
  return (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.redirect("/login");
    }
  }
}

// renders the requests cards view

router.get("/offers/index", loginCheck(), (req, res) => {
  Request.find({owner: req.session.user._id})
  .then(requests => {
    console.log(req.session.user._id)
    console.log("List of requests", requests)
    res.render("offers/index", { requests })
  })
  .catch(err => {
    console.log(err)
  })
})

// renders singe card view

router.get("/offers/detailedView/:id", loginCheck(), (req, res) => {
  console.log(req.params);
  Request.findById(req.params.id)
  .then(request => {
    res.render('offers/detailedView.hbs', { request })
  })
  .catch (err => {
    console.log(err)
  })
})

module.exports = router;
