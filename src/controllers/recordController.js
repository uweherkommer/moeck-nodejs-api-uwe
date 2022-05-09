//###########################################################################
// 20220505 - Uwe Seefeld-Herkommer
// In src/controllers/workoutController.js
// ??? war im Kurs vergessen worden ??? try...
//###########################################################################

const recordService = require("../services/recordService");

//###########################################################################

//const getRecordForWorkout = (workoutId) => {
//  try {
//    const record = recordService.getRecordForWorkout(workoutId);
//    return record;
//  } catch (error) {
//    throw error;
//  }
//};

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

module.exports = { getRecordForWorkout };