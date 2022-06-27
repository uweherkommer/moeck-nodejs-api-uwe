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
const memberController = require("../../controllers/memberController");

//const apicache = require("apicache");
//const cache = apicache.middleware;

//###########################################################################
// 20220520 - Custom made middlewares / future comming
//###########################################################################
// const authenticate = require("../../middlewares/authenticate");
// const authorize = require("../../middlewares/authorize");

//###########################################################################

router.get("/", recordController.getAllRecords);
//router.get("/", cache("2 minutes"), recordController.getAllWorkouts);

//###########################################################################

router.get("/:recordId", recordController.getOneRecord);

//###########################################################################
// War im Kurs vergessen worden ??? try... VVV
// We filter all the records that are related to the workout id
// out of the query parameter
//###########################################################################

router.get("/:recordId/members", recordController.getRecordForMember);

//###########################################################################

router.post("/", recordController.createNewRecord);
// future comming
// router.post("/", authenticate, authorize, workoutController.createNewWorkout);

//###########################################################################

router.patch("/:recordId", recordController.updateOneRecord);

//###########################################################################

router.delete("/:recordId", recordController.deleteOneRecord);

//###########################################################################

module.exports = router;
