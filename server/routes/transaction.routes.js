const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transaction.controller");

router.post("/user-transactions", auth, transactionController.userTransactions);
router.post("/new-transaction", auth, transactionController.newTransaction);

module.exports = router;
