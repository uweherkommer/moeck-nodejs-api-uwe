//###########################################################################
// 20220508 - Uwe Seefeld-Herkommer
// In src/database/Member.js
//###########################################################################
// Endpoints and filtering, sorting & pagination
//
// controllers/memberController.js -> services/memberService.js -> database/Member.js
// 
// localhost:3000/api/v1/members
// querystring
//###########################################################################

const DB = require("./db.json");
const { saveToDatabase } = require("./utils");
const sortJson = require('sort-json');
const JSONu = require('json');
const options = { ignoreCase: true, reverse: true, depth: 1};

//###########################################################################

const getAllMembers = (filterParams) => {
  try {
    //console.log(filterParams);
    //console.log(filterParams.equipment);
    
    let members = DB.members;
        
    if (filterParams.mode) {
      return DB.members.filter((member) =>
        member.mode.toLowerCase().includes(filterParams.mode)
      );
    }
    if (filterParams.equipment) {        
      return DB.members.filter((member) =>                                
        member.equipment.toString().toLowerCase().includes(filterParams.equipment)
      );
    }
    if (filterParams.length) {
      return DB.members.filter((member) =>
        member.length.toLowerCase().includes(filterParams.length)
      );
    }
    if (filterParams.page) {
      return DB.members.filter((member) =>
        member.page.toLowerCase().includes(filterParams.page)
      );
    }
    //#######################################################################
    if (filterParams.sort) {       
      //#####################################################################
      //console.log(filterParams.sort + workouts[0].name);
      //console.log(filterParams.sort + workouts[6].name);
      //console.log(workouts.length);
      // for stringify json - javascript array
      //####################################################################
      let sortArr = [];
      for (var exKey in DB.members) {
        //console.log("key:"+exKey+", value:"+ DB.workouts[exKey].name.toLowerCase());
        sortArr[exKey] = JSON.stringify(DB.members[exKey]);
      }      
      //####################################################################
      
      members.sort(GetSortOrder("name"));      
      
      return DB.members.filter((member) =>                                
        members.sort(GetSortOrder("name"))
      );
    }
    // Other if-statements will go here for different parameters end
    return members;
  }
  catch (error) {
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
//###########################################################################

const getOneMember = (memberId) => {
  try {
    const member = DB.members.find((member) => member.id === memberId);
    if (!member) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${memberId}'`,
      };
    }
    return member;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

//###########################################################################
//###########################################################################

const createNewMember = (newMember) => {
  try {
    const isAlreadyAdded =
      DB.members.findIndex((member) => member.name === newMember.name) > -1;
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Member with the name '${newMember.name}' already exists`,
      };
    }
    DB.members.push(newMember);
    //##########################
    saveToDatabase(DB);
    //##########################
    return newMember;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

//###########################################################################
//###########################################################################

const updateOneMember = (memberId, changes) => {
  try {
    const isAlreadyAdded =
      DB.members.findIndex((workout) => workout.name === changes.name) > -1;
    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Workout with the name '${changes.name}' already exists`,
      };
    }
    const indexForUpdate = DB.members.findIndex(
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
//###########################################################################

const deleteOneMember = (memberId) => {
  try {
    const indexForDeletion = DB.members.findIndex(
      (workout) => workout.id === workoutId
    );
    if (indexForDeletion === -1) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${workoutId}'`,
      };
    }
    DB.members.splice(indexForDeletion, 1);
    saveToDatabase(DB);
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

//###########################################################################
//###########################################################################

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
//###########################################################################

module.exports = {
  getAllMembers,
  createNewMember,
  getOneMember,
  updateOneMember,
  deleteOneMember,
};
