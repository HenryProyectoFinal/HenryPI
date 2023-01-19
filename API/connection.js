const mongoose = require("mongoose");

const MONGO_URI = "mongodb+srv://lucasparra:JaLBrmtlrGM7jvuf@cluster0.2nhu1ot.mongodb.net/test";
const DB = mongoose.connection;

mongoose.set("strictQuery", true);

mongoose.connect(MONGO_URI);

DB.once("open", () => { //Sólo será escuchado la primera vez, luego será ignorado...
  console.log("Database is connected to ", MONGO_URI);
});