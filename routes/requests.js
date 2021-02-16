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

router.post('/index', loginCheck(), (req, res) => {
  const { description, location, date } = req.body
  Request.findByIdAndUpdate(req.params.id, {description, location, date})
  .then((request) => {
    console.log('The request to edit:', request)
    res.redirect('requests/index')
  })
  .catch(err => {
    console.log(err)
  })
})


//rendering the view to delete a request
router.get('/requests/:id/delete', loginCheck(), (req, res) => {
  Request.findOneAndDelete({_id : req.params.id})
  .then((request) => {
    console.log('This is the request to delete', request)
    res.redirect('requests/index')
  })
  .catch(err => {
    console.log(err)
  })
})

// view of seeker user with all his/her requests
router.get('/requests/index', loginCheck(), (req, res) => {
  Request.find()
  .then(requests => {
    console.log('List of requests', requests)
    res.render('requests/index', { myRequests: requests })
  })
  .catch(err => {
    console.log(err)
  })
})

// route to post from request form to the seeker view with all his/her requests
router.post('/requests/index',loginCheck(), (req,res) => {
  const { description, location, date } = req.body
    Request.create({description, location, date})
    .then((request) => {
        console.log(request)
      res.render('requests/index', { myRequests: request})
    })
    .catch((err) => {
      console.log(err)
    })
});


module.exports = router;