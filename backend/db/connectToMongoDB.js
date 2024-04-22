// import dotenv from "dotenv";
import "dotenv/config"; //import .env file
import mongoose from "mongoose";
// dotenv.config();

const connectToMongoDB = () => {
  mongoose
    .connect(process.env.MONGO_DB_URI)
    .then(() => {
      console.log("Database Connected Successfully");
    })
    .catch((err) => {
      "Database Connection Failed: " + err;
    });
};

export default connectToMongoDB;
