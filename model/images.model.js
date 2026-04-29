var mongoose = require("mongoose");

var imagesSchema = mongoose.Schema({
  imageUrl: String,
  filename: String,
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

var imagesModel = mongoose.model("Image", imagesSchema);
module.exports = imagesModel;
