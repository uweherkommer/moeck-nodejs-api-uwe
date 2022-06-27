//###########################################################################
// 20220505 - Uwe Seefeld-Herkommer
// In src/controllers/recordController.js
// War im Kurs vergessen worden ??? try...
// 
// We filter all the records that are related to the workout id
// out of the query parameter
//###########################################################################

const recordService = require("../services/recordService");

//###########################################################################

const getRecordForWorkout = (req, res) => {
  const {
    params: { workoutId },
  } = req;
  if (!workoutId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':workoutId' can not be empty - recordConrtoller" },
      });
  }
  try {
    const record = recordService.getRecordForWorkout(workoutId);
    res.send({ status: "OK", data: record });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//##########################################################################

const getRecordForMember = (req, res) => {
  const {
    params: { workoutId },
  } = req;
  if (!workoutId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':workoutId' can not be record empty - recordConrtoller" },
      });
  }
  try {
    const record = recordService.getRecordForMember(workoutId);
    res.send({ status: "OK", data: record });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//##########################################################################

const getAllRecords = (req, res) => {

  const { mode } = req.query;
  const { equipment } = req.query;
  const { length } = req.query;
  const { page } = req.query;
  const { sort } = req.query;
  let filter = "";
  
  switch (false) {
    case typeof mode === 'undefined':
        console.log("_regex1");
        filter = { mode };
        break;
    case typeof equipment === 'undefined':
        console.log("_regex2");
        filter = { equipment };
        break;
    case typeof page === 'undefined':
        console.log("_regex3");
        filter = { page };
        break;
    case typeof length === 'undefined':
        console.log("_regex4");
        filter = { length };
        break;
    case typeof sort === 'undefined':
        //console.log("_regex5");
        filter = { sort };
        break;
  }
  
  //###########################################################################
  
  try {
    // const allWorkouts = workoutService.getAllWorkouts();
    //const allWorkouts = workoutService.getAllWorkouts({ mode });
    const allRecords = recordService.getAllRecords(filter);
    
    res.send({ status: "OK", data: allRecords });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//###########################################################################

const getOneRecord = (req, res) => {
  const {
    params: { recordId },
  } = req;
  if (!recordId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':recordId' can not be empty" },
      });
  }
  try {
    const record = recordService.getOneRecord(recordId);
    res.send({ status: "OK", data: record });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//###########################################################################

const createNewRecord = (req, res) => {
  const { body } = req;
  if (
    !body.name ||
    !body.mode ||
    !body.equipment ||
    !body.exercises ||
    !body.trainerTips
  ) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: {
          error:
            "One of the following keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'",
        },
      });
    return;
  }
  const newWorkout = {
    name: body.name,
    mode: body.mode,
    equipment: body.equipment,
    exercises: body.exercises,
    trainerTips: body.trainerTips,
  };
  try {
    const createdRecord = recordService.createNewRecord(newRecord);
    res.status(201).send({ status: "OK", data: createdRecord });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//###########################################################################

const updateOneRecord = (req, res) => {
  const {
    body,
    params: { recordId },
  } = req;
  if (!recordId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':recordId' can not be empty" },
      });
  }
  try {
    const updatedRecord = recordService.updateOneRecord(recordId, body);
    res.send({ status: "OK", data: updatedRecord });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//###########################################################################

const deleteOneRecord = (req, res) => {
  const {
    params: { recordId },
  } = req;
  if (!recordId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':recordId' can not be empty" },
      });
  }
  try {
    recordService.deleteOneRecord(recordId);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//###########################################################################

module.exports = {
  getRecordForWorkout,
  getRecordForMember,
  getAllRecords,
  getOneRecord,
  createNewRecord,
  updateOneRecord,
  deleteOneRecord
};
