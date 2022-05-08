//###########################################################################
// 20220508 - Uwe Seefeld-Herkommer
// In src/index.js
//###########################################################################
// Current implementations (without verbs)
// GET "/api/v1/workouts" 
// GET "/api/v1/workouts/:workoutId" 
// POST "/api/v1/workouts" 
// PATCH "/api/v1/workouts/:workoutId" 
// DELETE "/api/v1/workouts/:workoutId"  

// Implementation using verbs 
// GET "/api/v1/getAllWorkouts" 
// GET "/api/v1/getWorkoutById/:workoutId" 
// CREATE "/api/v1/createWorkout" 
// PATCH "/api/v1/updateWorkout/:workoutId" 
// DELETE "/api/v1/deleteWorkout/:workoutId"
//###########################################################################

const express = require("express");
const v1Router = require("./v1/routes"); // Test
const v1WorkoutRouter = require("./v1/routes/workoutRoutes");
const bodyParser = require("body-parser");

const app = express(); 
const PORT = process.env.PORT || 3000; 

//###########################################################################
// For testing purposes
//###########################################################################
//app.get("/", (req, res) => { 
//    res.send("<h2>It's Working!</h2>"); 
//});
//###########################################################################

app.use("/api/v1", v1Router); // Test
app.use(bodyParser.json());
app.use("/api/v1/workouts", v1WorkoutRouter);

app.listen(PORT, () => { 
    console.log(`API is listening on port ${PORT}`); 
});
