const mongoose = require("mongoose");

const TransactionSchema = mongoose.mongoose.Schema(
  {
    amount: { type: Number, require: true },
    transaction_type: {
      type: String,
      enum: ["DEPOSIT", "WITHDRAWAL"],
      require: true,
    },
    user: { type: String, ref: "User" },
    status: {
      type: String,
      enum: ["PENDING", "COMPLETED", "FAILED"],
      default: "PENDING",
    },
  },
  { timestamps: { createdAt: "created_on", updatedAt: "updated_on" } }
);

const Transactrion = mongoose.model("Transaction", TransactionSchema);

module.exports = Transactrion;
