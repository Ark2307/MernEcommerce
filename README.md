# MernEcommerce
## A project to help users buy products online.
### MERN Stack project to learn backend and redux. Frontend SCSS is fairly basic as my intention was to learn backend and API calls.

- Newly implemented login and signup through Auth0.
- User Orders and history
- Products with price filteration and different keywords filter
- Search only by the Full product name.
- Payment implemented through Stripe API
- Images uploaded on cloudinary.{Commented the implementation for now}

# Setup
#### cd to the frontend folder and run the following commands to start the react server at http://localhost:3000 -
- `npm ci`
- `npm start`

#### cd to the server folder and run the following commands to start the node server at http://localhost:8070 -
- `npm ci`
- `mkdir config` to create new folder called config
- `cd config` to go inside the config folder
- `touch database.js` to create a file called the database.js inside config folder

### Copy the following code in database.js
-  const mongoose = require("mongoose");
-  const connectDB = () => {
-   mongoose.connect(process.env.DB_URI, {
-     useUnifiedTopology: true,
-     useNewUrlParser: true,
-    })
-    .then((e) => {
-      console.log(`Mongo DB connected with server ${e.connection.host}`); 
-    });
-};
- module.exports = connectDB;

### Go to the server folder and then run the Script
- `npm run dev`
