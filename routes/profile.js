const express = require('express');
const router = express.Router();
const User = require('../models/User.model');
const Request = require('../models/Request');
const { uploader, cloudinary } = require('../config/cloudinary');


const loginCheck = () => {
  return (req, res, next) => {
    if (req.session.user) {
      next();
    } else {
      res.redirect("/login");
    }
  }
}

router.get ('/profile/index', loginCheck(), (req, res) => {
   User.findOne()
 .then(user => {
   console.log('This is the user', user)
    res.render('profile/index', { user })
  })
  .catch(err => {
    console.log(err)
  })
})

router.get('/profile/:id/edit', loginCheck(), (req, res) => {
  User.findById(req.params.id)
  .then(user => {
    console.log('the profile to edit', req.params.id)
    res.render('profile/edit', { user })
  })
  .catch (err => {
    console.log(err)
  })
})

router.post('/profile/:id/edit', loginCheck(), uploader.single('image'), (req, res) => {
  console.log(req.file);
  console.log(req.params.id)
  const { email, firstName, lastName, location } = req.body
  const imagePath = req.file.path
  const imageName = req.file.originalname
  const publicId = req.file.filename
  User.findByIdAndUpdate(req.params.id, {
    email, 
      firstName, 
      lastName,
      location,
      imagePath,
      imageName,
      publicId
  })
  .then(user => {
    console.log('The edited user:', user)
    res.redirect('/profile/index')
  })
  .catch(err => {
    console.log(err)
  })
})


module.exports = router;