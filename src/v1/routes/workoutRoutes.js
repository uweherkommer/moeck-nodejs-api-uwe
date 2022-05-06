//###########################################################################
// 20220505 - Uwe Seefeld-Herkommer
// In src/v1/routes/workoutRoutes.js
//###########################################################################

const express = require("express");
const router = express.Router(); // Test
const workoutController = require("../../controllers/workoutController");

//###########################################################################

//router.get("/", (req, res) => {
//  res.send("Get all workouts");
//});
router.get("/", workoutController.getAllWorkouts);

//###########################################################################

//router.get("/:workoutId", (req, res) => {
//  res.send("Get an existing workout");
//});
router.get("/:workoutId", workoutController.getOneWorkout);

//###########################################################################

//router.post("/", (req, res) => {
//  res.send("Create a new workout");
//});
router.post("/", workoutController.createNewWorkout);

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
