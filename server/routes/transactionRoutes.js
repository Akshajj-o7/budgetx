const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const transactionController = require("../controllers/transactionController");

router.post("/", auth, transactionController.addTransaction);
router.get("/", auth, transactionController.getTransactions);

module.exports = router;