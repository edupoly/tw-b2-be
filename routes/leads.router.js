var router = require("express").Router();
const {
  addNewLead,
  getAllLeads,
  getLeadById,
  deleteLeadById,
} = require("../controllers/leads.controller");

router
  .post("/addlead", addNewLead)
  .get("/", getAllLeads)
  .get("/:id", getLeadById)
  .delete("/:id", deleteLeadById);

module.exports = router;
