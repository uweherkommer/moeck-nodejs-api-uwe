//###########################################################################
// 20220505 - Uwe Seefeld-Herkommer
// In src/database/Workout.js
//###########################################################################

const DB = require("./db.json");

const getAllWorkouts = () => {
  return DB.workouts;
};

module.exports = { getAllWorkouts };
