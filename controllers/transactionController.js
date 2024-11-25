const Transaction = require("../models/transactionModel");
const User = require("../models/userModel");

async function addTransaction(req, res) {
  try {
    const { amount, transaction_type, user } = req.body;
    const transaction = new Transaction({ amount, transaction_type, user });
    const saveTran = await transaction.save();
    res
      .status(201)
      .json({ message: "transaction done successfully", data: saveTran });
  } catch (err) {
    console.log(err);
  }
}

async function get_AllTransactions(req, res) {
  try {
    const { userId } = req.query;

    const userExist = await User.findById(userId);

    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }
    const transactions = await Transaction.find({ user: userId });

    if (!transactions) {
      return res
        .status(404)
        .json({ message: "No transactions found for this user" });
    }
    res.status(200).json({
      message: "Transactions of user",
      transactions: transactions,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function updateTransaction(req, res) {
  try {
    const { transaction_id } = req.params;
    const { status } = req.body;
    const transaction = await Transaction.findById(transaction_id);
    if (!transaction) {
      return res.status(404).json({ message: "No transaction found" });
    }

    transaction.status = status;
    await transaction.save();
    res.status(200).json({
      message: "Update successfully",
      status: "COMPLETED",
      transaction: transaction,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function get_transaction(req, res) {
  try {
    const { transaction_id } = req.params;
    const transaction = await Transaction.findById(transaction_id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ transaction: transaction });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error", error: err });
  }
}

module.exports = {
  addTransaction,
  get_AllTransactions,
  updateTransaction,
  get_transaction,
};
