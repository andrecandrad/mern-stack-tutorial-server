require("dotenv").config();
const { PORT, MONG_URI } = process.env;

const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");

// express app
const app = express();

// middlewares
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/workouts", workoutRoutes);

// connect to database
mongoose
  .connect(MONG_URI)
  .then(() => {
    // listen for request
    app.listen(PORT, () => {
      console.log(`Connected to database & listening on port ${PORT}.`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
