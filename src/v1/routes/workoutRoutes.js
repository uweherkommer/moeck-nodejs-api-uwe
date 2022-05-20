//###########################################################################
// 20220510 - Uwe Seefeld-Herkommer
// In src/v1/routes/workoutRoutes.js
//###########################################################################
// 20220520 - caching with apicache, or redis
//###########################################################################

const express = require("express");
const router = express.Router(); // Test
const workoutController = require("../../controllers/workoutController");
const recordController = require("../../controllers/recordController");

//const apicache = require("apicache");
//const cache = apicache.middleware;

//###########################################################################
// 20220520 - Custom made middlewares / future comming
//###########################################################################
// const authenticate = require("../../middlewares/authenticate");
// const authorize = require("../../middlewares/authorize");

//###########################################################################

//router.get("/", (req, res) => {
//  res.send("Get all workouts");
//});

router.get("/", workoutController.getAllWorkouts);
//router.get("/", cache("2 minutes"), workoutController.getAllWorkouts);

//###########################################################################

//router.get("/:workoutId", (req, res) => {
//  res.send("Get an existing workout");
//});

router.get("/:workoutId", workoutController.getOneWorkout);

//###########################################################################
// ??? war im Kurs vergessen worden ??? try... VVV
//###########################################################################

router.get("/:workoutId/records", recordController.getRecordForWorkout);

//###########################################################################

//router.post("/", (req, res) => {
//  res.send("Create a new workout");
//});

router.post("/", workoutController.createNewWorkout);
// future comming
// router.post("/", authenticate, authorize, workoutController.createNewWorkout);

//###########################################################################

//router.patch("/:workoutId", (req, res) => {
//  res.send("Update an existing workout");
//});

router.patch("/:workoutId", workoutController.updateOneWorkout);

//###########################################################################

//router.delete("/:workoutId", (req, res) => {
//  res.send("Delete an existing workout");
//});

router.delete("/:workoutId", workoutController.deleteOneWorkout);

//###########################################################################

module.exports = router;
