const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
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

//rendering the view to post a new request
router.get('/requests/new', loginCheck(), (req, res) => {
  res.render('requests/new')
})


// view of seeker user with all his/her requests, rendered after requests/new
router.get('/requests/index', loginCheck(), (req, res) => {
  Request.find({owner: req.session.user._id})
  .then(request => {
    console.log(req.session.user._id)
    console.log('List of requests', request)
    res.render('requests/index', { request })
  })
  .catch(err => {
    console.log(err)
  })
})

// route to post from request form to the seeker view with all his/her requests
router.post('/requests/index', (req,res) => {
  const { title, description, location, date } = req.body
    Request.create({
      title,
      description, 
      location, 
      date,
      owner: req.session.user._id})
    .then((request) => {
        console.log('This is the newly created request', request)
      res.redirect('/requests/index')
    })
    .catch((err) => {
      console.log(err)
    })
});

//rendering the view to edit a posted request
router.get('/requests/:id/edit', loginCheck(), (req, res) => {
  Request.findById(req.params.id)
  .then(request => {
    res.render('requests/edit', { request })
  })
  .catch (err => {
    console.log(err)
  })
})

// post changes in edit back to the seeker view with all requests
router.post('/requests/:id/edit', loginCheck(), (req, res) => {
  const { description, location, date } = req.body
  const query = {_id: req.params.id}
  if (req.session.user.role !== 'admin') {
    query.owner = req.session.user._id
  }
  Request.findOneAndUpdate(query, {
    description, 
      location, 
      date,
      owner: req.session.user._id
  })
  .then((request) => {
    console.log('The request to edit:', request)
    res.redirect('/requests/index')
  })
  .catch(err => {
    console.log(err)
  })
})

//rendering the view to delete a request
router.get('/requests/:id/delete', loginCheck(), (req, res) => {
  const query = {_id: req.params.id}
  if (req.session.user.role !== 'admin') {
    query.owner = req.session.user._id
  }
  Request.findOneAndDelete(query)
  .then((request) => {
    console.log('This is the request to delete', request)
    res.redirect('/requests/index')
  })
  .catch(err => {
    console.log(err)
  })
})
module.exports = router;