//###########################################################################
// 20220505 - Uwe Seefeld-Herkommer
// In src/services/workoutService.js
//###########################################################################

const Workout = require("../database/Workout");

//###########################################################################

const getAllWorkouts = () => {
  // *** ADD ***
  const allWorkouts = Workout.getAllWorkouts();
  // *** ADD ***
  return allWorkouts;
};

//###########################################################################

const getOneWorkout = () => {
  return;
};

//###########################################################################

const createNewWorkout = () => {
  return;
};

//###########################################################################

const updateOneWorkout = () => {
  return;
};

//###########################################################################

const deleteOneWorkout = () => {
  return;
};

//###########################################################################

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
