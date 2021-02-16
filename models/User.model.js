const { Schema, model } = require("mongoose");
// Creating the User
const userSchema = new Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  email: String,
  googleID: String,
  firstName: String,
  lastName: String,
  imagePath: String,
  imageName: String,
  language: String,
  location: String, 
  role: {
    type: String,
     enum: ['user', 'giver', 'seeker', 'admin'],
     default: 'user'
   }
  //  reviews: [
  //   {
  //     user: {
  //       type: String
        
  //     },
  //     comments: String
  //   }
  //  ]
});
const User = model("User", userSchema);
module.exports = User;