const express = require("express");

const {
  createWorkout,
  getAllWorkouts,
  getSingleWorkout,
} = require("../controllers/workoutController");

const router = express.Router();

router.get("/", getAllWorkouts);

router.get("/:id", getSingleWorkout);

router.post("/", createWorkout);

router.delete("/:id", (req, res) => {
  res.json({
    msg: "DELETE a workout",
  });
});

router.patch("/:id", (req, res) => {
  res.json({
    msg: "UPDATE a workout",
  });
});

module.exports = router;
