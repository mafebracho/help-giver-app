const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// creating geolocation Schema

// const integerValidator = require('mongoose-integer');

// const GeoSchema = new Schema({
//     type: {
//         type: String,
//         default: "Point"
//     },
//     coordinates: {
//         type: [Number]
//     }
// });

// schema for help request
const helpRequestSchema = new Schema({
  type: String,
  title: String,
  date: String,
  // date: {
  //   type: Date,
  //   default: Date.now
  //   },
  description: String,
  owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
  },
  location: String
//   lat: {
//       type: Number,
//       integer: true
//   },
//   lng: {
//       type: Number,
//       integer: true  
//   },
  //to add the location into the map
  // geometry: GeoSchema,
});

const Request = mongoose.model("Request", helpRequestSchema);
module.exports = Request;