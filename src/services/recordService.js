//###########################################################################
// 20220505 - Uwe Seefeld-Herkommer
// In src/services/recordService.js
// 
// We filter all the records that are related to the workout id
// out of the query parameter
//###########################################################################

const Record = require("../database/Record");

//###########################################################################

const getAllRecords = (filterParams) => {
  try {
    // Filtering member
    // const allMembers = Member.getAllMembers();
    //console.log("memberService ");
    //console.log(filterParams);
    const allRecords = Record.getAllRecords(filterParams);
    return allRecords;
  } catch (error) {
    throw error;
  }
};

//###########################################################################

const getRecordForWorkout = (workoutId) => {
  try {
    const record = Record.getRecordForWorkout(workoutId);
    return record;
  } catch (error) {
    throw error;
  }
};

//###########################################################################

module.exports = {
  getRecordForWorkout,
  getAllRecords
};
