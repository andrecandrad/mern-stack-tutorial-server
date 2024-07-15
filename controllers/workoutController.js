const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

//get all workouts
const getAllWorkouts = async (req, res) => {
  const workourts = await Workout.find({}).sort({ createdAt: -1 });

  res.status(200).json(workourts);
};

//get a single workout
const getSingleWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ msg: "This is not a valid Id!" });
    return;
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    res.status(404).json({ msg: "No such workout" });
  }

  res.status(200).json(workout);
};

//creates a new workourt
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  try {
    const workout = await Workout.create({ title, load, reps });

    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//deletes a workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ msg: "This is not a valid Id!" });
    return;
  }

  const workout = await Workout.findOneAndDelete({ _id: id });

  if (!workout) {
    res.status(404).json({ msg: "No such workout" });
  }

  res.status(200).json(workout);
};

///updates a workout
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ msg: "This is not a valid Id!" });
    return;
  }

  const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!workout) {
    res.status(404).json({ msg: "No such workout" });
  }

  res.status(200).json(workout);
};

module.exports = {
  createWorkout,
  getAllWorkouts,
  getSingleWorkout,
  deleteWorkout,
  updateWorkout,
};
