//###########################################################################
// 20220505 - Uwe Seefeld-Herkommer
// In src/services/workoutService.js
//###########################################################################

const { v4: uuid } = require("uuid");
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

//###########################################################################newWorkout, // ...newWorkout

const createNewWorkout = (newWorkout) => {  
  const workoutToInsert = {
    newWorkout,
    id: uuid(),
    createdAt: new Date(). toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };
  
  const createdWorkout = Workout.createNewWorkout(workoutToInsert);
  return createdWorkout;
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
