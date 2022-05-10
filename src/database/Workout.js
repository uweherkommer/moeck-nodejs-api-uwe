//###########################################################################
// 20220508 - Uwe Seefeld-Herkommer
// In src/database/Workout.js
//###########################################################################
// In src/database/Workout.js

const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

//###########################################################################

let doppelt1 = function (num) {
   return num * 2;
}

let doppelt2 = (num) => { return num * 2 }

let doppelt3 = num => num * 2;

//###########################################################################

const getAllWorkouts = (filterParams) => {
  try {
    //console.log(filterParams);
    //console.log(filterParams.equipment);
    
    let workouts = DB.workouts;
        
    // Other if-statements will go here for different parameters start
    if (filterParams.mode) {
      return DB.workouts.filter((workout) =>
        workout.mode.toLowerCase().includes(filterParams.mode)
      );
    }
    if (filterParams.equipment) {
      //DB.workouts.equipment.forEach(function(item, index, array) {
      //  console.log(item, index);
      //});      
      return DB.workouts.filter((workout) =>                                
        workout.equipment.toString().toLowerCase().includes(filterParams.equipment)
      );
    }
    if (filterParams.length) {
      return DB.workouts.filter((workout) =>
        workout.length.toLowerCase().includes(filterParams.length)
      );
    }
    if (filterParams.page) {
      return DB.workouts.filter((workout) =>
        workout.page.toLowerCase().includes(filterParams.page)
      );
    }
    if (filterParams.sort) {
      return DB.workouts.filter((workout) =>
        workout.sort.toLowerCase().includes(filterParams.sort)
      );
    }
    // Other if-statements will go here for different parameters end
    return workouts;
  } catch (error) {
    throw { status: 500, message: error };
  }
};

//###########################################################################

const getOneWorkout = (workoutId) => {
  try {
    const workout = DB.workouts.find((workout) => workout.id === workoutId);
    if (!workout) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`,
      };
    }
    return workout;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

//###########################################################################

const createNewWorkout = (newWorkout) => {
  try {
    const isAlreadyAdded =
      DB.workouts.findIndex((workout) => workout.name === newWorkout.name) > -1;
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Workout with the name '${newWorkout.name}' already exists`,
      };
    }
    DB.workouts.push(newWorkout);
    saveToDatabase(DB);
    return newWorkout;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

//###########################################################################

const updateOneWorkout = (workoutId, changes) => {
  try {
    const isAlreadyAdded =
      DB.workouts.findIndex((workout) => workout.name === changes.name) > -1;
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Workout with the name '${changes.name}' already exists`,
      };
    }
    const indexForUpdate = DB.workouts.findIndex(
      (workout) => workout.id === workoutId
    );
    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`,
      };
    }
    const updatedWorkout = {
      ...DB.workouts[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };
    DB.workouts[indexForUpdate] = updatedWorkout;
    saveToDatabase(DB);
    return updatedWorkout;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

//###########################################################################

const deleteOneWorkout = (workoutId) => {
  try {
    const indexForDeletion = DB.workouts.findIndex(
      (workout) => workout.id === workoutId
    );
    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`,
      };
    }
    DB.workouts.splice(indexForDeletion, 1);
    saveToDatabase(DB);
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

//###########################################################################

module.exports = {
  getAllWorkouts,
  createNewWorkout,
  getOneWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
