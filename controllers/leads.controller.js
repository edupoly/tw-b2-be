var LeadModel = require("../model/lead.model");

function addNewLead(req, res) {
  console.log(req.body);
  var newLead = new LeadModel(req.body);
  newLead.save().then(() => {
    res.send("Ipoindi");
  });
}
var getAllLeads = (req, res) => {
  LeadModel.find().then((data) => {
    res.send(data);
  });
};
const getLeadById = (req, res) => {
  LeadModel.findById(req.params.id).then((data) => {
    res.send(data);
  });
  // LeadModel.find({ _id: req.params.id }).then((data) => {
  //   res.send(data);
  // });
};

const deleteLeadById = (req, res) => {
  console.log("delete request for ", req.params.id);
  LeadModel.findByIdAndDelete(req.params.id).then((data) => {
    res.send({ msg: "delete ipoindi" });
    //   res.json("delete ipoindi");
  });
};
module.exports = { addNewLead, getAllLeads, getLeadById, deleteLeadById };
