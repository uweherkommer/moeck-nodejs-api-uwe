//###########################################################################
// 20220505 - Uwe Seefeld-Herkommer
// In src/controllers/recordController.js
// War im Kurs vergessen worden ??? try...
// 
// We filter all the records that are related to the workout id
// out of the query parameter
//###########################################################################

const memberService = require("../services/memberService");

//###########################################################################

const getAllMembers = (req, res) => {
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
    const allMembers = memberService.getAllMembers(filter);
    
    res.send({ status: "OK", data: allMembers });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//###########################################################################

const getRecordForMember = (req, res) => {
  const {
    params: { memberId },
  } = req;
  if (!memberId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':memberId' can not be empty - memberConrtoller" },
      });
  }
  try {
    const member = memberService.getRecordForMember(memberId);
    res.send({ status: "OK", data: member });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//###########################################################################

const getMemberForWorkout = (req, res) => {
  const {
    params: { workoutId },
  } = req;
  if (!workoutId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':workoutId' can not be empty - memberConrtoller" },
      });
  }
  try {
    const member = memberService.getMemberForWorkout(workoutId);
    res.send({ status: "OK", data: member });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//##########################################################################

const getOneMember = (req, res) => {
  const {
    params: { memberId },
  } = req;
  if (!memberId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':memberId' can not be empty" },
      });
  }
  try {
    const member = memberService.getOneMember(memberId);
    res.send({ status: "OK", data: member });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//###########################################################################

const createNewMember = (req, res) => {
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
            "One of the following member keys is missing or is empty in request body: 'name', 'mode', 'equipment', 'exercises', 'trainerTips'",
        },
      });
    return;
  }
  const newMember = {
    name: body.name,
    mode: body.mode,
    equipment: body.equipment,
    exercises: body.exercises,
    trainerTips: body.trainerTips,
  };
  try {
    const createdMember = memberService.createNewMember(newMember);
    res.status(201).send({ status: "OK", data: createdMember });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//###########################################################################

const updateOneMember = (req, res) => {
  const {
    body,
    params: { memberId },
  } = req;
  if (!memberId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':memberId' can not be empty" },
      });
  }
  try {
    const updatedMember = memberService.updateOneMember(memberId, body);
    res.send({ status: "OK", data: updatedMember });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//###########################################################################

const deleteOneMember = (req, res) => {
  const {
    params: { memberId },
  } = req;
  if (!memberId) {
    res
      .status(400)
      .send({
        status: "FAILED",
        data: { error: "Parameter ':memberId' can not be empty" },
      });
  }
  try {
    memberService.deleteOneMember(memberId);
    res.status(204).send({ status: "OK" });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

//###########################################################################

module.exports = {
  getRecordForMember,
  getMemberForWorkout,
  getAllMembers,
  getOneMember,
  createNewMember,
  updateOneMember,
  deleteOneMember
};
