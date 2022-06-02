const APP = require("./app");
const dotenv = require("dotenv");

const connectDB = require("./config/database");

// config
dotenv.config({ path: "server/config/config.env" });

// connection to database
connectDB();

APP.listen(process.env.PORT, () => {
  console.log(`Server started at http://localhost:${process.env.PORT}`);
});
