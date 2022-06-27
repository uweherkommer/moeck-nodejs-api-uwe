//###########################################################################
// 20220510 - Uwe Seefeld-Herkommer
// In src/v1/routes/memberRoutes.js
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

router.get("/", memberController.getAllMembers);
//router.get("/", cache("2 minutes"), memberController.getAllWorkouts);

//###########################################################################

router.get("/:memberId", memberController.getOneMember);

//###########################################################################
// War im Kurs vergessen worden ??? try... VVV
// We filter all the records that are related to the workout id
// out of the query parameter
//###########################################################################

router.get("/:memberId/records", memberController.getRecordForMember);

//###########################################################################

router.post("/", memberController.createNewMember);

//###########################################################################

router.patch("/:memberId", memberController.updateOneMember);

//###########################################################################

router.delete("/:memberId", memberController.deleteOneMember);

//###########################################################################

module.exports = router;
