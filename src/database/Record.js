//###########################################################################
// 20220505 - Uwe Seefeld-Herkommer
// In src/database/Record.js
// 
// We filter all the records that are related to the workout id
// out of the query parameter
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

const getAllRecords = (filterParams) => {
  try {
    //console.log(filterParams);
    //console.log(filterParams.equipment);
    
    let records = DB.records;
        
    if (filterParams.mode) {
      return DB.records.filter((record) =>
        mrecord.mode.toLowerCase().includes(filterParams.mode)
      );
    }
    if (filterParams.equipment) {        
      return DB.records.filter((record) =>                                
        record.equipment.toString().toLowerCase().includes(filterParams.equipment)
      );
    }
    if (filterParams.length) {
      return DB.records.filter((record) =>
        record.length.toLowerCase().includes(filterParams.length)
      );
    }
    if (filterParams.page) {
      return DB.records.filter((record) =>
        record.page.toLowerCase().includes(filterParams.page)
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
      for (var exKey in DB.records) {
        //console.log("key:"+exKey+", value:"+ DB.workouts[exKey].name.toLowerCase());
        sortArr[exKey] = JSON.stringify(DB.records[exKey]);
      }      
      //####################################################################
      
      records.sort(GetSortOrder("name"));      
      
      return DB.records.filter((record) =>                                
        records.sort(GetSortOrder("name"))
      );
    }
    // Other if-statements will go here for different parameters end
    return records;
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

const getOneRecord = (recordId) => {
  try {
    const record = DB.records.find((record) => record.id === recordId);
    if (!record) {
      throw {
        status: 400,
        message: `Can't find workout with the id '${recordId}'`,
      };
    }
    return record;
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

//###########################################################################
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

module.exports = {
  getRecordForWorkout,
  getAllRecords,
  getOneRecord
};
