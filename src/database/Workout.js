//###########################################################################
// 20220508 - Uwe Seefeld-Herkommer
// In src/database/Workout.js
//###########################################################################
// In src/database/Workout.js
//###########################################################################
// !!! filtering, sorting & pagination !!!
// controllers/workoutController.js -> services/workoutService.js -> database/Workout.js
// !!!
// localhost:3000/api/v1/workouts?mode=amrap
// localhost:3000/api/v1/workouts?mode=for%20time
// localhost:3000/api/v1/workouts??equipment=barbell
// localhost:3000/api/v1/workouts?length=5
// localhost:3000/api/v1/workouts?page=2
// localhost:3000/api/v1/workouts?sort=name
// localhost:3000/api/v1/workouts?sort=-updatedAt&length=10
// !!! Stand 20220520 - Use data caching for performance improvements
//###########################################################################

const DB = require("./db.json");
const { saveToDatabase } = require("./utils");
const sortJson = require('sort-json');
const JSONu = require('json');
const options = { ignoreCase: true, reverse: true, depth: 1};

//###########################################################################

let doppelt1 = function (num) {
   return num * 2;
}
//----Y
let doppelt2 = (num) => { return num * 2 }
//----Y
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
//###########################################################################
    if (filterParams.sort) {       
      //#####################################################################
      //console.log(filterParams.sort + workouts[0].name);
      //console.log(filterParams.sort + workouts[6].name);
      //console.log(workouts.length);
      // for stringify json - javascript array
      //####################################################################
      let sortArr = [];
      for (var exKey in DB.workouts) {
        //console.log("key:"+exKey+", value:"+ DB.workouts[exKey].name.toLowerCase());
        sortArr[exKey] = JSON.stringify(DB.workouts[exKey]);
      }      
      //####################################################################
      
      workouts.sort(GetSortOrder("name"));      
      
      return DB.workouts.filter((workout) =>                                
        workouts.sort(GetSortOrder("name"))
      );
    }
//###########################################################################
    // Other if-statements will go here for different parameters end
    return workouts;
  } catch (error) {
    throw { status: 500, message: error };
  }
};
//###########################################################################
// sorting
//###########################################################################
function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }
}

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
//const bodyString = JSON.stringify(sortObject(DB.workouts));
//###########################################################################
function sortObject(unordered, sortArrays = false) {
    if (!unordered || typeof unordered !== 'object') {
        return unordered;
    }

    if (Array.isArray(unordered)) {
        const newArr = unordered.map((item) => sortObject(item, sortArrays));
        if (sortArrays) {
        newArr.sort();
        }
        return newArr;
    }

    const ordered = {};
    Object.keys(unordered)
        .sort()
        .forEach((key) => {
        ordered[key] = sortObject(unordered[key], sortArrays);
        });
    return ordered;
}
//###########################################################################

module.exports = {
  getAllWorkouts,
  createNewWorkout,
  getOneWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
