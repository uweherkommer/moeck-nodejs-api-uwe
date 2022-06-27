//###########################################################################
// 20220505 - Uwe Seefeld-Herkommer
// In src/v1/routes/index.js
//###########################################################################

const express = require("express");
const router = express.Router();

router.route("/").get((req, res) => {
  res.send(`<h2>Only for testing! Hello from ${req.baseUrl}</h2>`);
});

module.exports = router;
