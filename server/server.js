const APP = require("./app");
const dotenv = require("dotenv");

const connectDB = require("./config/database");

// uncaught Errors handled here{eg : clg(youtube)}
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down server due to unhandled exception`);

  process.exit(1);
});

// config
dotenv.config({ path: "server/config/config.env" });

// connection to database
connectDB();

const SERVER = APP.listen(process.env.PORT, () => {
  console.log(`Server started at http://localhost:${process.env.PORT}`);
});

// there are some errors from env that are not handled thus ,
// unhandled promise rejection is done

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  // console.log(err);
  console.log("Shutting down the server due to unhandled promise rejection");

  SERVER.close(() => {
    process.exit(1);
  });
});
