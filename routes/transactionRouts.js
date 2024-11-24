const express = require("express");
const transactionRouts = require("../controllers/transactionController");

const router = express.Router();

router.post("/transactions", transactionRouts.addTransaction);
router.get("/transactions", transactionRouts.get_AllTransactions);
router.put("/transactions/:transaction_id", transactionRouts.updateTransaction);
router.get("/transactions/:transaction_id", transactionRouts.get_transaction);
module.exports = router;
