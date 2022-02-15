const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transaction.controller");

router.post("/user-transactions", auth, transactionController.userTransactions);
router.post("/last-transactions", auth, transactionController.lastTransactions);
router.post("/new-transaction", auth, transactionController.newTransaction);
router.post(
  "/delete-transaction",
  auth,
  transactionController.deleteTransaction
);
router.post("/edit-transaction", auth, transactionController.editTransaction);

module.exports = router;
