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
// 0. Evolution
// We'll also need a record router to catch the specific requests for the records,
// but we don't need it right now. This could be a great chance for you to implement
// the CRUD operations for the records with their own routes and train a bit.
// controllers/recordController.js
// # Create records controller 
// touch src/controllers/recordController.js 
// # Create records service 
// touch src/services/recordService.js 
// # Create records database methods 
// touch src/database/Record.js
//###########################################################################
// 1. Evolution
// CRUD endpoints for the records as well, because records should be
// added, updated or deleted
// We'll also need a record router to catch the specific requests for the records,
// but we don't need it right now. This could be a great chance for you to
// implement the CRUD operations for the records with their own routes
// and train a bit.
//###########################################################################
// 2. Evolution
//"records": [ ... {
//      "id": "ad75d475-ac57-44f4-a02a-8f6def58ff56",
//      "workout": "4a3d9aaa-608c-49a7-a004-66305ad4ab50",
//      "record": "160 reps",
//      "memberId": "11817fb1-03a1-4b4a-8d27-854ac893cf41",
//      "member": "/members/:memberId"
//    },
//  ]
// Of course, this only works if we can handle requests to "/members/:memberId"
// This sounds like a great training opportunity for you to implement this situation!
// This has the huge advantage that we don't have to nest deeper
// our existing endpoint.
//###########################################################################
// 20220520 - caching with apicache, or redis
// !!!!!!!!!  check if you need a cache, if not - no cache
// A few things you have to be aware of when using a cache:
// - you always have to make sure that the data inside the cache
// is up to date because you don't want to serve outdated data
// - while the first request is being processed and the cache is
// about to be filled and more requests are coming in, you have
// to decide if you delay those other requests and serve the data
// from the cache or if they also receive data straight from the
// database like the first request
// - it's another component inside your infrastructure if you're
// choosing a distributed cache like Redis (so you have to ask
// yourself if it really makes sense to use it)
//###########################################################################

const express = require("express");
const v1Router = require("./v1/routes"); // Test

//##########################################################################
// routes for workouts, members, records
//##########################################################################

const v1WorkoutRouter = require("./v1/routes/workoutRoutes");
const v1MemberRouter = require("./v1/routes/memberRoutes");
const v1RecordRouter = require("./v1/routes/recordRoutes");

const bodyParser = require("body-parser");

const apicache = require("apicache");
const cache = apicache.middleware;

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
app.use(cache("2 minutes"));

//###########################################################################
// For workouts
//###########################################################################
app.use("/api/v1/workouts", v1WorkoutRouter);

//###########################################################################
// For members
//###########################################################################
app.use("/api/v1/members", v1MemberRouter);

//###########################################################################
// For records
//###########################################################################
app.use("/api/v1/records", v1RecordRouter);

//###########################################################################

app.listen(PORT, () => { 
    console.log(`API is listening on port ${PORT}`); 
});
