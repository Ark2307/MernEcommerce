const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then((e) => {
      console.log(`Mongo DB connected with server ${e.connection.host}`);
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = connectDB;
