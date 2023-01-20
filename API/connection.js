require("dotenv").config();
const mongoose = require("mongoose");
const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.imxmqtn.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
const DB = mongoose.connection;

mongoose.set("strictQuery", true);

mongoose.connect(MONGO_URI);

DB.once("open", () => {
  console.log("Database is connected to ", MONGO_URI);
});