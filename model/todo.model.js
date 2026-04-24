var mongoose = require("mongoose");
var TodoSchema = mongoose.Schema({
  title: String,
  status: Boolean,
  timeStamp: Date,
});

var TodoModel = mongoose.model("Todo", TodoSchema);
module.exports = TodoModel;
