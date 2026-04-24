var mongoose = require("mongoose");
var LeadSchema = mongoose.Schema({
  fullname: String,
  course: String,
  mode: String,
});

var LeadModel = mongoose.model("lead", LeadSchema);
module.exports = LeadModel;
