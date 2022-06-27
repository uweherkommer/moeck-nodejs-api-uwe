//###########################################################################
// 20220505 - Uwe Seefeld-Herkommer
// In src/services/memberService.js
// 
// We filter all the records that are related to the workout id
// out of the query parameter
//###########################################################################

const Member = require("../database/Member");

//###########################################################################

const getAllMembers = (filterParams) => {
  try {
    // Filtering member
    // const allMembers = Member.getAllMembers();
    //console.log("memberService ");
    //console.log(filterParams);
    const allMembers = Member.getAllMembers(filterParams);
    return allMembers;
  } catch (error) {
    throw error;
  }
};

//###########################################################################

const getRecordForMember = (memberId) => {
  try {
    const member = Member.getRecordForMember(memberId);
    return member;
  } catch (error) {
    throw error;
  }
};

//###########################################################################

module.exports = {
  getRecordForMember,
  getAllMembers
};
