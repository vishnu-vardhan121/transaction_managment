const express = require("express");
const db = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRouts = require("./routes/userRouts");
const transactionRouts = require("./routes/transactionRouts");

const app = express();
const PORT = process.env.PORT || 5000; // Default to 5000 if not set in .env file
const MONGO_URI = process.env.MONGO_URI;
//KU1OtFg7dApdap7Y

app.use(cors());
app.use(express.json());

app.use("/auth", userRouts);
app.use("/api", transactionRouts);

db.connect(MONGO_URI)
  .then(() => {
    console.log("mongoDb connected");
  })
  .catch((err) => {
    console.log("database not connected :", err);
  });

app.listen(5000, () => {
  console.log("server running in port 5000");
});
