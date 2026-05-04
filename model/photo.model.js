var mongoose = require("mongoose");
var photoSchema = mongoose.Schema({
  photoUrl: String,
  username: String,
  timeStamp: {
    type: Date,
    default: Date.now(),
  },
  isPublic:true
});
var PhotoModel = mongoose.model("photo", photoSchema);
module.exports = PhotoModel;
