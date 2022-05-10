//###########################################################################
// 20220505 - Uwe Seefeld-Herkommer
// In src/controllers/workoutController.js
//###########################################################################

const workoutService = require("../services/workoutService");

//###########################################################################

const getAllWorkouts = (req, res) => {
  //####################################
  // Filtering workout
  //####################################
  const { mode } = req.query;
  const { equipment } = req.query;
  const { length } = req.query;
  const { page } = req.query;
  const { sort } = req.query;
  let filter = "";
  
  console.log(mode);
  console.log(equipment);
  
  switch (true) {
    case regex1.test(req.query):
        console.log("regex1");
        break;
    case regex2.test(req.query):
        console.log("regex2");
        break;
    case regex3.test(req.query):
        console.log("regex3");
        break;
  }
  
  var regex1 = /a/,
    regex2 = /b/,
    regex3 = /c/,
    samplestring = 'b';  

  switch (true) {
    case regex1.test(samplestring):
        console.log("regex1");
        break;
    case regex2.test(samplestring):
        console.log("regex2");
        break;
    case regex3.test(samplestring):
        console.log("regex3");
        break;
  }
  
  switch(/req.query/) {
  case "mode":
    filter = { mode };
    break;
  case { equipment }:
    filter = { equipment };
    break;
  case { length }:
    filter = { length };
    break;
  case { page }:
    filter = { page };
    break;
  case { sort }:
    filter = { sort };
    break;
  default:
    // code block
  } 
  
  try {
    // const allWorkouts = workoutService.getAllWorkouts();
    const allWorkouts = workoutService.getAllWorkouts({ mode });
    //const allWorkouts = workoutService.getAllWorkouts(filter);
    
    res.send({ status: "OK", data: allWorkouts });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//###########################################################################

const getOneWorkout = (req, res) => {
  const {
    params: { workoutId },
  } = req;
  if (!workoutId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':workoutId' can not be empty" },
      });
  }
  try {
    const workout = workoutService.getOneWorkout(workoutId);
    res.send({ status: "OK", data: workout });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//###########################################################################

const createNewWorkout = (req, res) => {
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
    const createdWorkout = workoutService.createNewWorkout(newWorkout);
    res.status(201).send({ status: "OK", data: createdWorkout });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//###########################################################################

const updateOneWorkout = (req, res) => {
  const {
    body,
    params: { workoutId },
  } = req;
  if (!workoutId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':workoutId' can not be empty" },
      });
  }
  try {
    const updatedWorkout = workoutService.updateOneWorkout(workoutId, body);
    res.send({ status: "OK", data: updatedWorkout });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//###########################################################################

const deleteOneWorkout = (req, res) => {
  const {
    params: { workoutId },
  } = req;
  if (!workoutId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':workoutId' can not be empty" },
      });
  }
  try {
    workoutService.deleteOneWorkout(workoutId);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//###########################################################################

module.exports = {
  getAllWorkouts,
  getOneWorkout,
  createNewWorkout,
  updateOneWorkout,
  deleteOneWorkout,
};
