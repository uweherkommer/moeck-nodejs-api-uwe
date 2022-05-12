//###########################################################################
// 20220505 - Uwe Seefeld-Herkommer
// In src/controllers/workoutController.js
//###########################################################################

const workoutService = require("../services/workoutService");

//###########################################################################

const getAllWorkouts = (req, res) => {
//###########################################################################
// Filtering workout
// Receive all workouts that require a barbell: /api/v1/workouts?equipment=barbell
// Get only 5 workouts: /api/v1/workouts?length=5
// When using pagination, receive the second page: /api/v1/workouts?page=2
// Sort the workouts in the response in descending order by their
// creation date: /api/v1/workouts?sort=-createdAt
//
// You can also combine the parameters, to get the last 10 updated workouts
// for example: /api/v1/workouts?sort=-updatedAt&length=10
//###########################################################################
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
    const allWorkouts = workoutService.getAllWorkouts(filter);
    
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
