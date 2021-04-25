const express = require("express");
const router = express.Router();

// controllers
const {
  getClients,
  getPageClient,
  postAddClient,
  getClientById,
  updateClientById,
  deleteClientById,
} = require("../controllers/clientControllers");

router.get("/", getClients);
// add client
router.get("/add", getPageClient);
router.post("/add", postAddClient);
// Client by ID
router.get("/:id", getClientById);
router.post("/:id", updateClientById);
router.delete("/:id", deleteClientById);

module.exports = router;
