const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const port = process.env.PORT || 5000;

// connecting to database

require('dotenv').config();
const db = process.env.DB_CONNECT;

mongoose.connect(db, {
  useNewUrlParser: true,
})
.then(() => console.log('MongoDB connection established.'))
.catch((error) => console.error("MongoDB connection failed:", error.message));

// middleware

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set up routes

app.use("/users", require("./routes/userRouter"));

// Running the server

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});