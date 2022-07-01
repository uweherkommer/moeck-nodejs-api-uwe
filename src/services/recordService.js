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

const getOneRecord = (recordId) => {
  try {
    const record = Record.getOneRecord(recordId);
    return record;
  } catch (error) {
    throw error;
  }
};

//###########################################################################

const createNewRecord = (newRecord) => {
  const recordToInsert = {
    ...newRecord,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),    
  };
  try {
    const createdRecord = Record.createNewRecord(recordToInsert);
    return createdRecord;
  } catch (error) {
    throw error;
  }
};

//###########################################################################

module.exports = {
  getRecordForWorkout,
  getAllRecords,
  getOneRecord,
  createNewRecord
};
