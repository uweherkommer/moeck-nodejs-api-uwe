//###########################################################################
// 20220505 - Uwe Seefeld-Herkommer
// In src/database/Record.js
// 
// We filter all the records that are related to the workout id
// out of the query parameter
//###########################################################################

const DB = require("./db.json");

//###########################################################################

const getRecordForWorkout = (workoutId) => {
  try {
    const record = DB.records.filter((record) => record.workout === workoutId);
    if (!record) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`,
      };
    }
    return record;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

//###########################################################################

module.exports = { getRecordForWorkout };
